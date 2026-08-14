/**
 * dsh-archived-sessions — host half.
 *
 * Self-contained Archived Sessions manager. Exposes a fenced JSON API under
 * /archived/api/* that the client Settings section calls:
 *   details { sessionId } → per-session detail snapshot
 *   delete  { sessionId } → permanently delete a session
 *
 * Detail reading is LENIENT: it prefers the strict persistence inspect, but
 * falls back to the raw artifact so a session written by a newer plugin
 * (unknown event types such as agent-teams/*) still renders counts, tool
 * usage, lineage, and cross-session recall instead of failing.
 *
 * Deletion reuses the host primitives when present (`workspaceRegistry.deleteSession`,
 * `agentLoop.disposeAgent`, `sessionPersistence.remove`) and degrades gracefully
 * on a stock Harness where they do not exist yet.
 */
import z from "schemastery";
import { decodeStorageRecord } from "@deepseek-ai/dsh-session";
import { readdir, realpath, stat, rm } from "node:fs/promises";
import { join, resolve, sep, dirname } from "node:path";
import { spawn } from "node:child_process";
import { homedir } from "node:os";

const name = "dsh-archived-sessions";
const inject = ["webServer", "sessions", "sessionPersistence", "workspaceRegistry", "agents"];
/** Empty configuration schema: this plugin owns no loader config. */
const Config = z.object({});

const FETCH_TOOL_RE = /search|fetch|download|browse/i;

// -- session storage layout (mirrors dsh-session-persistence-jsonl) ----------
/** Filesystem-safe session directory key derived from the project cwd. */
function projectKey(cwd) {
	if (cwd.length === 0) throw new Error("cannot encode an empty project path");
	let readable = "";
	let separatorRun = false;
	for (let i = 0; i < cwd.length; i++) {
		const code = cwd.charCodeAt(i);
		const ch = String.fromCharCode(code);
		if (ch === "/" || ch === "\\" || ch === ":") {
			if (!separatorRun) readable += "-";
			separatorRun = true;
		} else if (ch !== "~" && /^[A-Za-z0-9._-]$/.test(ch)) {
			readable += ch;
			separatorRun = false;
		} else {
			readable += "~" + code.toString(16).toUpperCase().padStart(4, "0");
			separatorRun = false;
		}
	}
	return `--${(readable.replace(/^-+/, "") || "root").slice(0, 251)}--`;
}
/** Filesystem-safe segment encoding for a session id. */
function encodeSegment(raw) {
	if (raw.length === 0) throw new Error("cannot encode an empty path segment");
	if (raw === ".") return "~002E";
	if (raw === "..") return "~002E~002E";
	let out = "";
	for (let i = 0; i < raw.length; i++) {
		const code = raw.charCodeAt(i);
		const ch = String.fromCharCode(code);
		if (ch !== "~" && /^[A-Za-z0-9._-]$/.test(ch)) out += ch;
		else out += "~" + code.toString(16).toUpperCase().padStart(4, "0");
	}
	return out;
}
/** The DSH home directory (matches `dshHomePath('sessions')`). */
function dshHome() {
	const raw = process.env.DSH_HOME;
	// 空白 DSH_HOME 视为未设置（与官方 resolveDshHome 一致）；~ 前缀按用户主目录展开；结果归一为绝对路径
	const configured = raw !== void 0 && raw.trim().length > 0 ? raw.trim() : void 0;
	let base = configured ?? join(homedir(), ".dsh");
	if (base === "~") base = homedir();
	else if (base.startsWith("~/") || base.startsWith("~\\")) base = join(homedir(), base.slice(2));
	return resolve(base);
}
/** Session root directory (`{DSH_HOME}/sessions`). */
function sessionsRoot() {
	return join(dshHome(), "sessions");
}
/** Resolve a session's storage directory from its header (project key + encoded id). */
function sessionDirFor(meta) {
	const cwd = typeof meta?.cwd === "string" && meta.cwd !== "" ? meta.cwd : void 0;
	if (cwd === void 0) return void 0;
	return join(sessionsRoot(), projectKey(cwd), encodeSegment(meta.id));
}
/** Open a directory in the OS file manager (cross-platform, fire-and-forget). */
function openInFileManager(dir) {
	const command = process.platform === "win32" ? "explorer" : process.platform === "darwin" ? "open" : "xdg-open";
	return new Promise((resolveOpen, rejectOpen) => {
		const child = spawn(command, [dir], {
			detached: true,
			stdio: "ignore",
			...(process.platform === "win32" ? { shell: false } : {})
		});
		// 以 'error' 与 'spawn' 竞速：命令缺失/启动失败时如实上报，而不是无条件成功
		let settled = false;
		child.once("error", (error) => {
			if (settled) return;
			settled = true;
			rejectOpen(error);
		});
		child.once("spawn", () => {
			if (settled) return;
			settled = true;
			resolveOpen();
		});
		child.unref();
	});
}
/** Locate a session header by id (live sessions first, then persisted meta). */
async function findSessionMeta(ctx, sessionId) {
	const live = ctx.get("sessions")?.get(sessionId);
	if (live !== void 0) return live.header;
	const persistence = ctx.get("sessionPersistence");
	if (persistence !== void 0 && typeof persistence.list === "function") {
		for (const meta of await persistence.list()) if (meta.id === sessionId) return meta;
	}
	return void 0;
}

// -- browser-trust fence (loopback + same-origin markers) --------------------
function header(headers, name) {
	const value = headers[name];
	return typeof value === "string" ? value : void 0;
}
function parseAuthority(authority) {
	try {
		return new URL(`http://${authority}`);
	} catch {
		return;
	}
}
function isLoopbackHostname(hostname) {
	if (hostname === "localhost" || hostname === "[::1]") return true;
	const parts = hostname.split(".");
	return parts.length === 4 && parts[0] === "127" && parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255);
}
function isTrustedApiRequest(request) {
	const host = header(request.headers, "host");
	if (host === void 0) return false;
	const hostUrl = parseAuthority(host);
	if (hostUrl === void 0) return false;
	if (!isLoopbackHostname(hostUrl.hostname)) return false;
	if (header(request.headers, "sec-fetch-site") === "cross-site") return false;
	const origin = header(request.headers, "origin");
	if (origin === void 0) return true;
	try {
		return new URL(origin).host === hostUrl.host;
	} catch {
		return false;
	}
}

// -- HTTP helpers ------------------------------------------------------------
const MAX_JSON_BODY_BYTES = 1024 * 1024;
async function readJsonBody(req) {
	const chunks = [];
	let total = 0;
	for await (const chunk of req) {
		const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(String(chunk));
		total += buffer.length;
		if (total > MAX_JSON_BODY_BYTES) {
			const error = new Error("request body too large");
			error.status = 413;
			error.code = "body-too-large";
			throw error;
		}
		chunks.push(buffer);
	}
	const raw = Buffer.concat(chunks).toString("utf8");
	if (raw.trim() === "") return {};
	try {
		return JSON.parse(raw);
	} catch {
		const error = new Error("invalid JSON body");
		error.status = 400;
		error.code = "bad-json";
		throw error;
	}
}
function writeJson(res, status, body) {
	res.writeHead(status, { "content-type": "application/json" });
	res.end(JSON.stringify(body));
}
function writeOk(res, value) {
	writeJson(res, 200, { ok: true, value });
}
function writeFail(res, message, status = 500, code = "internal") {
	writeJson(res, status, { ok: false, error: { code, message } });
}

/** Inspect leniently: strict read first, raw-artifact fallback that skips unknown records. */
async function lenientInspect(persistence, sessionId, signal) {
	try {
		return await persistence.inspect(sessionId, signal);
	} catch (error) {
		if (typeof persistence.readRaw !== "function") throw error;
		const raw = await persistence.readRaw(sessionId, signal);
		if (raw === void 0) throw error;
		const events = [];
		for (const line of raw.content.split("\n")) {
			if (line.trim() === "") continue;
			try {
				const decoded = decodeStorageRecord(JSON.parse(line));
				if (Array.isArray(decoded)) events.push(...decoded);
				else events.push(decoded);
			} catch {
				// torn tail / unreadable record — skip
			}
		}
		return { meta: raw.meta, events };
	}
}

/** Count image content blocks inside a message's content array. */
function countImages(data) {
	if (!Array.isArray(data?.content)) return 0;
	let count = 0;
	for (const block of data.content) if (block?.type === "image") count++;
	return count;
}

/** Build the per-session detail snapshot. */
async function buildDetails(ctx, sessionId) {
	const sessions = ctx.get("sessions");
	const persistence = ctx.get("sessionPersistence");
	const live = sessions?.get(sessionId);
	let meta;
	let events;
	if (live !== void 0) {
		meta = live.header;
		events = [...live.events];
	} else {
		if (persistence === void 0) throw new Error("session persistence is not available");
		const inspected = await lenientInspect(persistence, sessionId);
		meta = inspected.meta;
		events = inspected.events;
	}
	let sizeBytes = null;
	if (persistence !== void 0 && typeof persistence.artifactInfo === "function") {
		const artifact = await persistence.artifactInfo(sessionId);
		sizeBytes = artifact?.sizeBytes ?? null;
	}
	let lastTime = typeof meta?.createdAt === "number" ? meta.createdAt : 0;
	const fileSet = new Map();
	for (const event of events) {
		if (typeof event.time === "number" && event.time > lastTime) lastTime = event.time;
		if (event.type !== "tool/call") continue;
		const data = event.data;
		const toolName = typeof data?.name === "string" ? data.name : "";
		if (toolName !== "write" && toolName !== "edit") continue;
		let args;
		try {
			args = typeof data.arguments === "string" ? JSON.parse(data.arguments) : data.arguments;
		} catch {
			continue;
		}
		const filePath = typeof args?.file_path === "string" ? args.file_path : void 0;
		if (filePath === void 0 || filePath === "") continue;
		if (!fileSet.has(filePath)) fileSet.set(filePath, toolName);
	}
	const files = [...fileSet.entries()].map(([path, tool]) => ({ path, tool }));
	const lineage = {
		parentSessionId: typeof meta?.parentSession === "string" ? meta.parentSession : null,
		children: []
	};
	if (persistence !== void 0) {
		for (const h of await persistence.list()) {
			if (h.parentSession !== sessionId) continue;
			if (h.origin === "subagent") continue;
			lineage.children.push(h.id);
		}
	}
	for (const session of sessions?.list() ?? []) {
		if (session.header.parentSession === sessionId && session.header.origin !== "subagent") {
			lineage.children.push(session.id);
		}
	}
	return {
		sessionId,
		sizeBytes,
		createdAt: typeof meta?.createdAt === "number" ? meta.createdAt : null,
		updatedAt: lastTime || null,
		files,
		lineage
	};
}

// -- registry 状态变更串行队列 ----------------------------------------------
// workspaceRegistry 的 requireState+setState 是读-改-写原语，官方核心经内部
// enqueueOperation 串行化；插件自己的 unarchive/fallback-delete 也走本队列，
// 避免与并发归档/取消归档请求交错时丢失更新。
let mutationTail = Promise.resolve();
function enqueueMutation(operation) {
	const result = mutationTail.then(() => operation());
	mutationTail = result.then(() => {}, () => {});
	return result;
}

/** Delete ONE session only (no subagent cascade): detach workspace accounting,
 * drop the archive-set entry through the public state primitives, and remove
 * the persisted artifact via its physical location. Subagent children are
 * intentionally LEFT ALONE — they surface as top-level rows afterwards unless
 * the user explicitly selected them for deletion. */
async function deleteSessionSingle(ctx, sessionId) {
	const registry = ctx.get("workspaceRegistry");
	const persistence = ctx.get("sessionPersistence");
	for (const ws of registry?.list() ?? []) {
		if (ws.sessionIds.includes(sessionId)) await ws.detachSession(sessionId);
	}
	if (registry !== void 0 && typeof registry.requireState === "function" && typeof registry.setState === "function") {
		await enqueueMutation(async () => {
			const state = registry.requireState();
			if (state.archivedSessionIds.includes(sessionId)) {
				await registry.setState({
					...state,
					archivedSessionIds: state.archivedSessionIds.filter((id) => id !== sessionId)
				});
			}
		});
	}
	if (persistence !== void 0 && typeof persistence.remove === "function") {
		await persistence.remove(sessionId);
	} else if (persistence !== void 0 && typeof persistence.locate === "function") {
		// No remove primitive: locate the artifact and delete its directory.
		const meta = await findSessionMeta(ctx, sessionId);
		if (meta !== void 0) {
			const location = persistence.locate(meta);
			if (location !== void 0 && typeof location.path === "string") {
				const dir = dirname(location.path);
				if (dir !== void 0 && dir !== "" && dir !== dirname(dir)) {
					await rm(dir, { recursive: true, force: true });
				}
			}
		}
	}
}

/** Permanently delete one session (live-agent teardown + single-session removal). */
async function deleteSession(ctx, sessionId) {
	const agents = ctx.get("agents");
	const agent = agents?.get(sessionId);
	if (agent !== void 0 && agent.status === "running") {
		const error = new Error("会话正在运行，无法删除；请先停止该会话");
		error.status = 409;
		error.code = "session-busy";
		throw error;
	}
	if (agent !== void 0) {
		const loop = ctx.get("agentLoop");
		if (loop === void 0 || typeof loop.disposeAgent !== "function") {
			const error = new Error("该会话仍处于打开状态，且当前 Harness 版本不支持在插件中关闭它；请先重启 Harness 或切换到其他会话再删除");
			error.status = 409;
			error.code = "session-open";
			throw error;
		}
		await loop.disposeAgent(sessionId);
	}
	// 永远走"只删自己"路径：registry.deleteSession（补丁版）会级联删除
	// subagent 子会话，而本插件按设计不级联——除非用户显式勾选子代理。
	await deleteSessionSingle(ctx, sessionId);
	return { sessionId };
}

/** Delete one file, but only when it resolves strictly INSIDE a registered
 * workspace root (never the root itself — a recursive rm on the root would
 * erase the whole project directory). */
async function deleteFile(ctx, path) {
	const resolved = resolve(path);
	let target = resolved;
	try {
		// 解析符号链接/大小写别名：目标若存在则以真实路径做围栏校验（工作区内指向外部的链接会被拒绝）
		target = await realpath(resolved);
	} catch {
		// 目标可能已被删除（最后一次同步前）：保留 resolve 结果，围栏校验仍然生效
	}
	const registry = ctx.get("workspaceRegistry");
	const roots = (registry?.list() ?? []).map((ws) => ws.path);
	let allowed = false;
	for (const root of roots) {
		const rootResolved = resolve(root);
		if (target.startsWith(rootResolved + sep) && target !== rootResolved) {
			allowed = true;
			break;
		}
	}
	if (!allowed) {
		const error = new Error("只能删除工作区内的文件");
		error.status = 403;
		error.code = "outside-workspace";
		throw error;
	}
	await rm(target, { recursive: true, force: true });
	return { path: target, deleted: true };
}

/** Open a session's record folder in the OS file manager. */
async function openSessionFolder(ctx, sessionId) {
	const meta = await findSessionMeta(ctx, sessionId);
	if (meta === void 0) {
		const error = new Error("找不到该会话的记录目录（会话不存在）");
		error.status = 404;
		error.code = "session-not-found";
		throw error;
	}
	const dir = sessionDirFor(meta);
	if (dir === void 0) {
		const error = new Error("该会话没有关联的工作目录，无法定位记录文件夹");
		error.status = 404;
		error.code = "no-cwd";
		throw error;
	}
	await openInFileManager(dir);
	return { sessionId, path: dir, opened: true };
}

/** Archive one session into the registry-global archive set. */
async function archiveSession(ctx, sessionId) {
	const registry = ctx.get("workspaceRegistry");
	if (registry === void 0 || typeof registry.archiveSession !== "function") {
		const error = new Error("当前 Harness 版本不支持归档会话（缺少 workspaceRegistry.archiveSession）");
		error.status = 501;
		error.code = "unsupported";
		throw error;
	}
	await registry.archiveSession(sessionId);
	return { sessionId, archived: true };
}

/**
* Unarchive one session back into the active list. Uses the same public
* registry primitives the official archiveSession is built on
* (`requireState` + `setState`), so it works on a stock Harness without
* any core patch. The read-modify-write runs inside the plugin's serialized
* mutation queue so concurrent archive/unarchive requests cannot lose updates.
*/
async function unarchiveSession(ctx, sessionId) {
	const registry = ctx.get("workspaceRegistry");
	if (registry === void 0 || typeof registry.requireState !== "function" || typeof registry.setState !== "function") {
		const error = new Error("当前 Harness 版本不支持取消归档（缺少 workspaceRegistry 状态原语）");
		error.status = 501;
		error.code = "unsupported";
		throw error;
	}
	await enqueueMutation(async () => {
		const state = registry.requireState();
		if (!state.archivedSessionIds.includes(sessionId)) return;
		await registry.setState({
			...state,
			archivedSessionIds: state.archivedSessionIds.filter((id) => id !== sessionId)
		});
	});
	return { sessionId, archived: false };
}

function apply(ctx) {
	ctx.effect(() => ctx.get("webServer")?.register({
		kind: "prefix",
		path: "/archived/api",
		handler: async (req, res) => {
			if (!isTrustedApiRequest(req)) {
				writeJson(res, 403, { ok: false, error: { code: "forbidden", message: "forbidden" } });
				return;
			}
			if (req.method !== "POST") {
				writeJson(res, 405, { ok: false, error: { code: "method-error", message: "method not allowed" } });
				return;
			}
			const pathname = new URL(req.url ?? "/", "http://dsh.internal").pathname;
			const method = pathname.startsWith("/archived/api/") ? pathname.slice("/archived/api/".length) : void 0;
			if (method === void 0 || method.includes("/") || method === "") {
				writeJson(res, 404, { ok: false, error: { code: "not-found", message: "unknown archived API method" } });
				return;
			}
			try {
				const payload = await readJsonBody(req);
				if (method === "delete-file") {
					const path = typeof payload.path === "string" ? payload.path : "";
					if (path === "") {
						writeJson(res, 400, { ok: false, error: { code: "bad-request", message: "path is required" } });
						return;
					}
					writeOk(res, await deleteFile(ctx, path));
					return;
				}
				const sessionId = typeof payload.sessionId === "string" ? payload.sessionId : "";
				if (sessionId === "") {
					writeJson(res, 400, { ok: false, error: { code: "bad-request", message: "sessionId is required" } });
					return;
				}
				if (method === "details") {
					// NOTE: do NOT pass req.signal — the node http IncomingMessage
					// signal auto-aborts the moment the body is fully read, which
					// would abort every persistence read with "This operation was
					// aborted". Detail reads are bounded enough to run uncancelled.
					writeOk(res, await buildDetails(ctx, sessionId));
				} else if (method === "delete") {
					writeOk(res, await deleteSession(ctx, sessionId));
				} else if (method === "open-folder") {
					writeOk(res, await openSessionFolder(ctx, sessionId));
				} else if (method === "archive") {
					writeOk(res, await archiveSession(ctx, sessionId));
				} else if (method === "unarchive") {
					writeOk(res, await unarchiveSession(ctx, sessionId));
				} else {
					writeJson(res, 404, { ok: false, error: { code: "not-found", message: `unknown archived API method "${method}"` } });
				}
			} catch (error) {
				writeFail(res, error instanceof Error ? error.message : String(error), typeof error?.status === "number" ? error.status : 500, typeof error?.code === "string" ? error.code : "internal");
			}
		}
	}), "dsh-archived-sessions: /archived/api routes");
}

export { Config, apply, inject, name };
