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
import { join, resolve, sep, dirname, relative, isAbsolute } from "node:path";
import { spawn } from "node:child_process";
import { homedir } from "node:os";

const name = "dsh-archived-sessions";
// agentLoop 是可选能力（缺失时删除走 409 降级），故意不进 inject：
// cordis 的 inject 是必需依赖声明（缺失会阻塞插件启动），而 ctx.get
// 本身是无需声明的宽容读取，正适合这种"有则用、无则降级"的场景。
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
	// m18: 统一按 "~" 前缀展开（覆盖 "~"、"~/"、"~\"、"~foo" 全部形态，与官方 resolveDshHome 语义对齐）
	if (base === "~") base = homedir();
	else if (base.startsWith("~/") || base.startsWith("~\\")) base = join(homedir(), base.slice(2));
	else if (base.startsWith("~")) base = join(homedir(), base.slice(1));
	return resolve(base);
}
/** Session root directory (`{DSH_HOME}/sessions`). */
function sessionsRoot() {
	return join(dshHome(), "sessions");
}
/** Resolve a session's storage directory from its header (project key + encoded id).
 * m6: 无 cwd 会话落在官方 `_no-cwd` 布局（与 dsh-session-persistence-jsonl 的
 * projectDir 对齐），open-folder 对这类会话不再报"没有关联的工作目录"。 */
function sessionDirFor(meta) {
	const cwd = typeof meta?.cwd === "string" && meta.cwd !== "" ? meta.cwd : void 0;
	if (cwd === void 0) return join(sessionsRoot(), "_no-cwd", encodeSegment(meta.id));
	return join(sessionsRoot(), projectKey(cwd), encodeSegment(meta.id));
}
/** Open a directory in the OS file manager (cross-platform, fire-and-forget).
 * s7: 简单节流——同一目录 500ms 内重复打开只放行一次，避免狂点按钮弹出多个窗口。 */
let lastOpenedDir = "";
let lastOpenedAt = 0;
function openInFileManager(dir) {
	const now = Date.now();
	if (dir === lastOpenedDir && now - lastOpenedAt < 500) {
		return Promise.resolve({ throttled: true });
	}
	lastOpenedDir = dir;
	lastOpenedAt = now;
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
/** Whitelist of archived API methods; anything else is a 404. */
const ARCHIVED_API_METHODS = new Set(["details", "delete", "delete-file", "open-folder", "archive", "unarchive"]);
const MAX_JSON_BODY_BYTES = 1024 * 1024;
async function readJsonBody(req) {
	// m16: 非 JSON content-type 直接 415（允许缺失——无 body 的调用方不强制）
	const contentType = header(req.headers, "content-type");
	if (contentType !== void 0 && !/^application\/json\b/i.test(contentType.trim())) {
		const error = new Error("content-type must be application/json");
		error.status = 415;
		error.code = "unsupported-media-type";
		throw error;
	}
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
		if (raw === void 0) {
			// 会话不存在：inspect/readRaw 双双找不到，转成明确 404（原始错误无 status 会落到 500）
			const notFound = new Error("找不到该会话的记录（会话不存在）");
			notFound.status = 404;
			notFound.code = "session-not-found";
			throw notFound;
		}
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

// M8: 详情响应上限——fetches 只保留前 50 条、files 只保留前 200 条，
// 防止单会话数万次 fetch/write 时详情 JSON 膨胀到数十 MB 卡死浏览器。
const MAX_FETCHES = 50;
const MAX_FILES = 200;

/** 解析 shell 命令字符串中创建的产出文件路径（相对路径基于会话 cwd 绝对化）。
 * DSH 只在 `write`/`edit` 工具的 file_path 上记录产出；用 pwsh/bash 的
 * Set-Content / Add-Content / Out-File / New-Item 或 `>` / `>>` 重定向创建的文件
 * 不在 write/edit 事件里，导致详情/删除的文件列表漏掉。这里做保守解析——只认
 * 明确的文件写入命令与重定向，提取路径经 stat 存在性校验后才纳入。 */
function extractShellFilePaths(command, cwd) {
	const found = new Set();
	if (typeof command !== "string" || command.trim() === "") return [];
	// 1) 写入/新建命令 + 带引号的 -Path "X" / 'X'
	const quotedCmdRe = /(?:Set-Content|Add-Content|Out-File|New-Item)\b[^;|&\r\n]*?-Path\s*["']([^"']+)["']/gi;
	// 2) 写入命令 + 直接跟的路径（无引号，命令后第一个 token；-Option/残留 token
	//    会被 buildDetails 的 stat+isFile 兜底过滤掉）。
	const bareCmdRe = /(?:Set-Content|Add-Content|Out-File|New-Item)\s+([^\s"';&|<>]+)/gi;
	// 3) 重定向：> path / >> path（跳过 > $null / > /dev/null 之类）
	const redirectRe = />{1,2}\s*("?)([^"'"\r\n;|&]+?)\1(?=\s*(?:;|\r\n|$|&))/g;
	for (const re of [quotedCmdRe, bareCmdRe, redirectRe]) {
		let m;
		while ((m = re.exec(command)) !== null) {
			const raw = m[1] !== void 0 && m[1] !== "" && m[2] === void 0 ? m[1] : m[2];
			if (typeof raw !== "string") continue;
			const trimmed = raw.trim();
			if (trimmed === "" || trimmed === ">" || trimmed === ">>") continue;
			// 跳过明显的非产出目标（$变量 / null / dev-null）
			if (trimmed === "$null" || /\/dev\/null$/.test(trimmed) || /^\$/.test(trimmed)) continue;
			const resolved = isAbsolute(trimmed) ? trimmed : resolve(cwd || ".", trimmed);
			found.add(resolved);
		}
	}
	return [...found];
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
		if (inspected.meta === void 0) {
			// 会话不存在：明确 404（persistence.inspect 抛的原始错误无 status，会落到 500）
			const error = new Error("找不到该会话的记录（会话不存在）");
			error.status = 404;
			error.code = "session-not-found";
			throw error;
		}
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
	const stats = {
		turns: 0,
		steps: 0,
		userMessages: 0,
		assistantMessages: 0,
		toolCalls: 0,
		attachments: 0,
		toolCounts: {},
		fetches: []
	};
	const turnSeen = new Set();
	const stepSeen = new Set();
	for (const event of events) {
		if (typeof event.time === "number" && event.time > lastTime) lastTime = event.time;
		const data = event.data;
		switch (event.type) {
			case "turn/start":
				if (typeof data?.turn === "number") turnSeen.add(data.turn);
				break;
			case "step/start":
				if (typeof data?.step === "number") stepSeen.add(data.step);
				break;
			case "user/message":
				stats.userMessages++;
				if (Array.isArray(data?.content)) for (const block of data.content) if (block?.type === "image") stats.attachments++;
				break;
			case "assistant/message":
				stats.assistantMessages++;
				break;
			case "tool/call":
				stats.toolCalls++;
				{
					const name = typeof data?.name === "string" ? data.name : "tool";
					stats.toolCounts[name] = (stats.toolCounts[name] ?? 0) + 1;
					if (FETCH_TOOL_RE.test(name)) {
						let query;
						try {
							const args = typeof data.arguments === "string" ? JSON.parse(data.arguments) : data.arguments;
							query = typeof args?.query === "string" ? args.query : typeof args?.url === "string" ? args.url : typeof args?.q === "string" ? args.q : void 0;
						} catch {
							query = void 0;
						}
						stats.fetches.push({
							tool: name,
							...query === void 0 || query === "" ? {} : { query }
						});
					}
				}
				break;
		}
		if (event.type === "tool/call") {
			const toolName = typeof data?.name === "string" ? data.name : "";
			if (toolName === "write" || toolName === "edit") {
				let args;
				try {
					args = typeof data.arguments === "string" ? JSON.parse(data.arguments) : data.arguments;
				} catch {
					continue;
				}
				const filePath = typeof args?.file_path === "string" ? args.file_path : void 0;
				if (filePath === void 0 || filePath === "") continue;
				if (!fileSet.has(filePath)) fileSet.set(filePath, toolName);
			} else if (toolName === "pwsh" || toolName === "bash") {
				// 用 shell 命令写入/新建的文件不在 write/edit 事件里——解析命令字符串补上。
				// 绝对化基准用会话 cwd（live.header.cwd / persistence meta.cwd）。
				let command = void 0;
				if (typeof data?.arguments === "string") {
					try {
						const parsed = JSON.parse(data.arguments);
						command = typeof parsed?.command === "string" ? parsed.command : void 0;
					} catch {
						command = void 0;
					}
				} else if (data?.arguments !== null && typeof data.arguments === "object") {
					command = typeof data.arguments.command === "string" ? data.arguments.command : void 0;
				}
				if (typeof command !== "string" || command === "") continue;
				for (const p of extractShellFilePaths(command, meta?.cwd)) {
					if (!fileSet.has(p)) fileSet.set(p, toolName);
				}
			}
		}
	}
	stats.turns = turnSeen.size;
	// NOTE: step 去重依赖"step 编号全局递增"这一约定（真实会话 1..N 连续）。
	// 若未来 step 编号改为按 turn 重置，去重会低估步数——届时改为统计
	// step/start 事件条数即可。
	stats.steps = stepSeen.size;
	// M8: 截断响应体积——fetches 保留前 MAX_FETCHES 条（客户端渲染时同样截断），
	// files 保留前 MAX_FILES 条；统计计数不受影响（toolCounts 仍是全量）。
	if (stats.fetches.length > MAX_FETCHES) stats.fetches = stats.fetches.slice(0, MAX_FETCHES);
	// files 列表来自事件记录（write/edit 的 file_path），是历史快照——物理删除后
	// 记录仍在，会让详情面板/删除弹窗重复列出已删文件。这里 stat 过滤掉磁盘上
	// 已不存在的路径（只检查前 MAX_FILES*2 个，避免大会话全量 stat 变慢）。
	const fileEntries = [...fileSet.entries()].slice(0, MAX_FILES * 2);
	// s8: 只保留"存在且是普通文件"的路径——排除 New-Item 建的目录、以及已物理删除
	// 的文件（历史快照中残留的 write/edit 记录仍在），避免目录被当产出文件列出。
	const fileExists = await Promise.all(fileEntries.map(([p]) => stat(p).then((info) => info.isFile()).catch(() => false)));
	const files = fileEntries.filter((_, i) => fileExists[i]).map(([path, tool]) => ({ path, tool })).slice(0, MAX_FILES);
	const lineage = {
		parentSessionId: typeof meta?.parentSession === "string" ? meta.parentSession : null,
		children: []
	};
	// M1: children 用 Set 去重——live 子会话同时命中 persistence.list() 与
	// sessions.list() 两个来源时会重复出现；m2: list() 加 typeof 守卫，
	// 换非 jsonl backend（无 list 方法）时不至于 500。
	// children = 分叉子会话（非 subagent）；subagents = 子代理（origin === "subagent"）
	const childrenSet = new Set();
	const subagentSet = new Set();
	if (persistence !== void 0 && typeof persistence.list === "function") {
		for (const h of await persistence.list()) {
			if (h.parentSession !== sessionId) continue;
			if (h.origin === "subagent") {
				subagentSet.add(h.id);
				continue;
			}
			childrenSet.add(h.id);
		}
	}
	for (const session of sessions?.list() ?? []) {
		if (session.header.parentSession !== sessionId) continue;
		if (session.header.origin === "subagent") {
			subagentSet.add(session.id);
			continue;
		}
		childrenSet.add(session.id);
	}
	lineage.children = [...childrenSet];
	lineage.subagents = [...subagentSet];
	return {
		sessionId,
		cwd: typeof meta?.cwd === "string" ? meta.cwd : null,
		sizeBytes,
		createdAt: typeof meta?.createdAt === "number" ? meta.createdAt : null,
		updatedAt: lastTime || null,
		files,
		stats,
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

/** 向上清理空父目录（直到非空或到工作区根），避免删除文件后残留空文件夹。
 * stopSet = 工作区根集合（含真实路径）：清到根即停，根目录本身绝不删除。
 * 注意边界只认 stopSet——删除目标是工作区文件，不在 sessionsRoot 下。 */
async function pruneEmptyDirs(dir, stopSet) {
	let current = dirname(dir);
	for (;;) {
		if (stopSet.has(current)) break;
		let empty = false;
		try {
			const entries = await readdir(current);
			empty = entries.length === 0;
		} catch {
			break;
		}
		if (!empty) break;
		try {
			await rm(current, { force: true, maxRetries: 3 });
		} catch {
			break;
		}
		current = dirname(current);
	}
}

/** Delete ONE session only (no subagent cascade): detach workspace accounting,
 * drop the archive-set entry through the public state primitives, and remove
 * the persisted artifact via its physical location. Subagent children are
 * intentionally LEFT ALONE — they surface as top-level rows afterwards unless
 * the user explicitly selected them for deletion.
 * File-removal modes:
 * - `filePaths` (non-empty array): delete only those files, then remove the
 *   record log, keeping every other file in the session directory.
 * - `deleteFiles === false`: remove the record log only, keep all files.
 * - otherwise (default): remove the whole session directory (log + files). */
async function deleteSessionSingle(ctx, sessionId, options = {}) {
	const { deleteFiles = true, filePaths } = options;
	const registry = ctx.get("workspaceRegistry");
	const persistence = ctx.get("sessionPersistence");
	const sessions = ctx.get("sessions");
	// m1: 会话不存在时明确 404，而不是静默"成功"（用户会误以为已删除）。
	// 运行中会话由调用方（deleteSession）先 409 拦截，这里只处理已停止的。
	const meta = await findSessionMeta(ctx, sessionId);
	if (meta === void 0) {
		const error = new Error("找不到该会话的记录（会话不存在）");
		error.status = 404;
		error.code = "session-not-found";
		throw error;
	}
	// M2: detach 是 best-effort——单个 workspace 的 detachSession 失败（例如其
	// requireState/setState 持久化异常）不应阻塞整个删除，记录后继续。
	for (const ws of registry?.list() ?? []) {
		if (!ws.sessionIds.includes(sessionId)) continue;
		try {
			await ws.detachSession(sessionId);
		} catch (error) {
			console.error(`[dsh-archived-sessions] detachSession failed for workspace "${ws.path}":`, error);
		}
	}
	if (registry !== void 0 && typeof registry.requireState === "function" && typeof registry.setState === "function") {
		await enqueueMutation(async () => {
			// M3: 队列内读取最新 state（不基于外部缓存的旧快照计算写回）。
			// 该会话在归档集中时，顺带清理指向已不存在会话的孤儿归档条目
			// （并发 archive/unarchive/delete 跨队列交错可能残留此类条目）。
			const state = registry.requireState();
			if (!state.archivedSessionIds.includes(sessionId)) return;
			const existing = new Set();
			for (const s of sessions?.list() ?? []) existing.add(s.id);
			if (persistence !== void 0 && typeof persistence.list === "function") {
				for (const h of await persistence.list()) existing.add(h.id);
			}
			const archivedSessionIds = state.archivedSessionIds.filter((id) => id !== sessionId && existing.has(id));
			await registry.setState({ ...state, archivedSessionIds });
		});
	}
	// M13: 统一解析会话记录目录（所有分支最终都要清理它；仅当严格位于
	// sessionsRoot 内才可删——第三方/损坏 backend 可能把会话目录指到库根或更上层）。
	let sessionDirPath = void 0;
	const location = persistence !== void 0 && typeof persistence.locate === "function" ? persistence.locate(meta) : void 0;
	if (location !== void 0 && typeof location.path === "string") {
		const dir = dirname(location.path);
		const root = sessionsRoot();
		const rel = relative(root, dir);
		const insideRoot = dir !== "" && rel !== "" && rel !== "." && !rel.startsWith("..") && !isAbsolute(rel);
		if (insideRoot && dir !== dirname(dir)) sessionDirPath = dir;
	}
	/** 删记录 log 文件（仅当会话目录可定位；路径异常时退回官方 remove）。 */
	const removeLog = async () => {
		if (sessionDirPath !== void 0 && location !== void 0 && typeof location.path === "string") {
			await rm(location.path, { force: true, maxRetries: 3 });
			return;
		}
		if (persistence !== void 0 && typeof persistence.remove === "function") {
			await persistence.remove(sessionId);
		}
	};
	if (Array.isArray(filePaths) && filePaths.length > 0) {
		// 细粒度文件删除：删勾选的文件/文件夹（产生的目录也删），然后删记录 log。
		// 注意：details.files 是工作区产出文件（write/edit 的 file_path），
		// 不在会话目录里——围栏校验用工作区根（与 deleteFile 一致），而非会话目录。
		const root = sessionsRoot();
		const workspaceRoots = (registry?.list() ?? []).map((ws) => ws.path);
		const rootResolvedSet = new Set();
		for (const wroot of workspaceRoots) {
			let rr = resolve(wroot);
			try {
				rr = await realpath(rr);
			} catch {
				// 工作区根可能已被移动/删除：保留 resolve 结果
			}
			rootResolvedSet.add(rr.replace(/[\\/]+$/, ""));
		}
		for (const p of filePaths) {
			const resolved = resolve(p);
			// 校验目标在某个工作区内（防越界删除任意路径）
			let allowed = false;
			let matchedRoot = "";
			for (const wroot of workspaceRoots) {
				let rootResolved = resolve(wroot);
				try {
					rootResolved = await realpath(rootResolved);
				} catch {
					// 工作区根可能已被移动/删除：保留 resolve 结果
				}
				rootResolved = rootResolved.replace(/[\\/]+$/, "");
				if (rootResolved !== "" && resolved.startsWith(rootResolved + sep) && resolved !== rootResolved) {
					allowed = true;
					matchedRoot = rootResolved;
					break;
				}
			}
			if (!allowed) continue;
			// 文件或文件夹都删（文件夹递归；删除后清理空父目录）
			try {
				const info = await stat(resolved);
				await rm(resolved, { force: true, maxRetries: 3, recursive: info.isDirectory() });
				await pruneEmptyDirs(resolved, rootResolvedSet);
			} catch {
				// 目标不存在（已删/未落地）：忽略
			}
		}
		await removeLog();
	} else if (deleteFiles === false) {
		// 只删记录 log（保留工作区产出文件——它们不在会话目录里）
		await removeLog();
	} else {
		// 默认：整体删除会话目录（log + 目录内的一切）
		if (sessionDirPath !== void 0) {
			await rm(sessionDirPath, { recursive: true, force: true });
		} else if (persistence !== void 0 && typeof persistence.remove === "function") {
			await persistence.remove(sessionId);
		}
	}
	// M13: 所有分支最终都清理会话目录——filePaths / deleteFiles=false 之前只删
	// log 文件、目录残留为空壳；在 log 删除后统一删目录（工作区产出文件不在会话
	// 目录里，删目录不影响它们）。
	if (sessionDirPath !== void 0 && (Array.isArray(filePaths) && filePaths.length > 0 || deleteFiles === false)) {
		await rm(sessionDirPath, { recursive: true, force: true });
	}
	return { sessionId, dir: sessionDirPath };
}

/** 递归收集 sessionId 的所有后代子代理会话 id（含孙级及更深）。 */
async function collectDescendants(ctx, sessionId) {
	const persistence = ctx.get("sessionPersistence");
	const sessions = ctx.get("sessions");
	const childrenOf = async (id) => {
		const kids = new Set();
		if (persistence !== void 0 && typeof persistence.list === "function") {
			for (const h of await persistence.list()) {
				if (h.parentSession === id) kids.add(h.id);
			}
		}
		for (const s of sessions?.list() ?? []) {
			if (s.header.parentSession === id) kids.add(s.id);
		}
		return kids;
	};
	const result = [];
	const seen = new Set([sessionId]);
	const stack = [sessionId];
	while (stack.length > 0) {
		const id = stack.pop();
		for (const kid of await childrenOf(id)) {
			if (seen.has(kid)) continue;
			seen.add(kid);
			result.push(kid);
			stack.push(kid);
		}
	}
	return result;
}

/** Permanently delete one session (live-agent teardown + single-session removal).
 * M7 note: DSH host 端没有公开的"当前会话"API（sessions store 的 current 是
 * 浏览器端概念，host 侧 services 无对等物；agents 的 selection.current 是 agent
 * 内部状态），因此 host 端无法可靠拒绝删除"当前打开的会话"。保护策略：运行中
 * 会话 409 拒绝（下方）+ 客户端禁选 current 行 + README 说明本机进程可通过
 * 直接调用 API 删除当前会话的风险（与官方 deleteSession 行为一致）。 */
async function deleteSession(ctx, sessionId, options = {}) {
	const { cascade = false, deleteFiles = true, subagentIds, filePaths } = options;
	const agents = ctx.get("agents");
	const agent = agents?.get(sessionId);
	if (agent !== void 0 && agent.status === "running") {
		const error = new Error("会话正在运行，无法删除；请先停止该会话");
		error.status = 409;
		error.code = "session-busy";
		throw error;
	}
	if (agent !== void 0) {
		// Best-effort teardown, matching the official deleteSession handler:
		// dispose the agent when the primitive is reachable. agentLoop sits
		// behind an isolate realm on preset-mounted deployments and is usually
		// NOT resolvable from this root context — that must not block deletion
		// (the official handler skips dispose in exactly that case and still
		// deletes). Live-session flush is done below for ALL targets up front,
		// so the agent-branch flush is not repeated here.
		const loop = ctx.get("agentLoop");
		if (loop !== void 0 && typeof loop.disposeAgent === "function") {
			try {
				await loop.disposeAgent(sessionId);
			} catch {
				// dispose failure is non-fatal; continue with removal
			}
		}
	}
	// 永远走"只删自己"路径：registry.deleteSession（补丁版）会级联删除
	// subagent 子会话，而本插件默认不级联——除非用户显式勾选（cascade 或 subagentIds）。
	// subagentIds 为详情面板细粒度勾选的子代理集合；cascade=true 为全选后代。
	const descendants = Array.isArray(subagentIds) && subagentIds.length > 0 ? subagentIds : (cascade ? await collectDescendants(ctx, sessionId) : []);
	const allIds = [sessionId, ...descendants];
	// M12: 删文件前先 flush 全部 live 目标——保证每个待删会话的日志在物理删除
	// 前已完整落盘。顺序至关重要：flush 必须发生在磁盘清理之前（否则 detach 时
	// persistence 的 retire 尾部 flush 会在已删除的目录上重建日志，让会话"复活"）。
	const sessions = ctx.get("sessions");
	for (const id of allIds) {
		const live = sessions?.get(id);
		if (live !== void 0 && typeof sessions.flush === "function") {
			try {
				await sessions.flush(live);
			} catch {
				// flush failure is non-fatal: the artifact removal below wins
			}
		}
	}
	const removed = [];
	for (const descendant of descendants) {
		// 子代理的文件删除沿用主会话选项；指定了 filePaths 时子代理只删记录（保留文件）
		removed.push(await deleteSessionSingle(ctx, descendant, { deleteFiles: Array.isArray(filePaths) && filePaths.length > 0 ? false : deleteFiles }));
	}
	removed.push(await deleteSessionSingle(ctx, sessionId, { deleteFiles, filePaths }));
	// M12: 删除持久化后，把仍挂在 sessions store 里的 live 会话摘除。rc.8 起官方
	// workspaceRegistry.deleteSession 与 sessionPersistence.remove 均已移除，只做
	// detach + 磁盘清理会漏掉 live session：客户端刷新后它依旧出现在列表里，且因
	// 工作区已 detach 而落入"未分组"（重启后才会消失）。SessionStore 的
	// liveEntryFor + detachEntered 是公开原语——detachEntered 移除 store 条目并广播
	// session/disposed，persistence 顺带清理内存状态；此时该会话已无 pending 事件，
	// retire 的尾部 flush 是 no-op，不会重建已删除的日志。
	await detachLiveSessions(ctx, allIds);
	// M13: detach 广播 session/disposed 会触发 jsonl persistence 的 retire 尾部
	// flush；若该会话在删文件后仍有 pending 写入（flush 失败/竞态），materialize/
	// append 会自动 mkdir 重建会话目录。等 retire 落定后重删一次目录，保证删除后
	// 不残留空文件夹（用户反馈 0.1.6 之前"文件没了但文件夹还在"）。
	await cleanUpRetiredDirs(ctx, removed);
	return { sessionId };
}

/** 删除后兜底清理：等待 persistence 对该会话的 retire（尾部 flush）完成，
 * 再删除可能被重建的会话目录。retire 完成后该会话不再有任何写者，重删幂等。 */
async function cleanUpRetiredDirs(ctx, entries) {
	const persistence = ctx.get("sessionPersistence");
	const coordinator = persistence?.coordinator;
	for (const { sessionId, dir } of entries) {
		if (dir === void 0) continue;
		const retirement = coordinator?.retirements?.get(sessionId);
		if (retirement !== void 0) {
			try {
				await retirement;
			} catch {
				// retire 失败（尾部 flush 异常）不阻塞目录清理
			}
		}
		try {
			await rm(dir, { recursive: true, force: true });
		} catch {
			// 幂等：目录可能已在前序步骤被删除
		}
	}
}

/** 从 sessions store 摘除已删除的 live 会话（删除持久化之后的收尾步骤）。 */
async function detachLiveSessions(ctx, ids) {
	const sessions = ctx.get("sessions");
	if (sessions === void 0) return;
	for (const id of ids) {
		const live = sessions.get(id);
		if (live === void 0) continue;
		if (typeof sessions.liveEntryFor !== "function" || typeof sessions.detachEntered !== "function") {
			// 换用更老的 SessionStore 形态（无 liveEntryFor 原语）时跳过——
			// 避免删除被阻塞，残留 live 会话仍会在下次启动被清除。
			continue;
		}
		try {
			const entry = sessions.liveEntryFor(live);
			sessions.detachEntered(entry);
		} catch (error) {
			console.error(`[dsh-archived-sessions] failed to detach live session "${id}":`, error);
		}
	}
}

/** Delete one file, but only when it resolves strictly INSIDE a registered
 * workspace root (never the root itself — a recursive rm on the root would
 * erase the whole project directory).
 *
 * M6: 只允许删除普通文件（lstat 拒绝目录，rm 非递归）；带 sessionId 时额外
 * 校验 path 必须属于该会话 buildDetails.files 的产出文件列表（防同源脚本
 * 删除工作区任意文件）。m3: 工作区根也经 realpath，避免符号链接/大小写
 * 别名导致合法删除被误拒。m4: 尾部分隔符规范化，避免 `root + sep` 双分隔符。 */
async function deleteFile(ctx, path, sessionId) {
	const resolved = resolve(path);
	let target = resolved;
	try {
		// 解析符号链接/大小写别名：目标若存在则以真实路径做围栏校验（工作区内指向外部的链接会被拒绝）
		target = await realpath(resolved);
	} catch {
		// 目标可能已被删除（最后一次同步前）：保留 resolve 结果，围栏校验仍然生效
	}
	// M6: 只允许删除普通文件——目录走递归 rm 会误删整棵目录树
	try {
		const info = await stat(target);
		if (info.isDirectory()) {
			const error = new Error("只能删除文件，不能删除目录");
			error.status = 403;
			error.code = "not-a-file";
			throw error;
		}
	} catch (error) {
		if (error?.code === "not-a-file") throw error;
		// 目标不存在（最后一次同步前已删）：继续围栏校验，rm force 幂等
	}
	// M6: 归属校验——带 sessionId 时 path 必须是该会话产出文件列表之一
	if (typeof sessionId === "string" && sessionId !== "") {
		const details = await buildDetails(ctx, sessionId);
		const known = new Set();
		for (const file of details?.files ?? []) known.add(file.path);
		if (!known.has(path)) {
			const error = new Error("只能删除该会话产出文件列表中的文件");
			error.status = 403;
			error.code = "not-produced-file";
			throw error;
		}
	}
	const registry = ctx.get("workspaceRegistry");
	const roots = (registry?.list() ?? []).map((ws) => ws.path);
	const rootResolvedSet = new Set();
	let allowed = false;
	for (const root of roots) {
		let rootResolved = resolve(root);
		try {
			// m3: 根也解析真实路径，与 target（已 realpath）在同一坐标系比较
			rootResolved = await realpath(rootResolved);
		} catch {
			// 工作区根可能已被移动/删除：保留 resolve 结果
		}
		// m4: 去掉尾部重复分隔符（`C:\` 与 `C:\\` 均归一为 `C:\`）
		rootResolved = rootResolved.replace(/[\\/]+$/, "");
		if (rootResolved === "") continue;
		rootResolvedSet.add(rootResolved);
		if (target.startsWith(rootResolved + sep) && target !== rootResolved) {
			allowed = true;
		}
	}
	if (!allowed) {
		const error = new Error("只能删除工作区内的文件");
		error.status = 403;
		error.code = "outside-workspace";
		throw error;
	}
	await rm(target, { recursive: false, force: true });
	// 与 delete 的 filePaths 分支保持一致：删完向上清理空父目录（直到非空或工作区根）
	await pruneEmptyDirs(target, rootResolvedSet);
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
	// M10: 目录不存在时给友好错误，避免操作系统弹原生错误框
	try {
		await stat(dir);
	} catch {
		const error = new Error("会话记录文件夹不存在（可能已被删除）");
		error.status = 404;
		error.code = "folder-not-found";
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
	// 会话不存在时给明确 404（官方 archiveSession 对不存在会话抛无 status 的错误，会落到 500）
	const meta = await findSessionMeta(ctx, sessionId);
	if (meta === void 0) {
		const error = new Error("找不到该会话的记录（会话不存在）");
		error.status = 404;
		error.code = "session-not-found";
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
* M3 note: 插件 mutationTail 队列与官方 archiveSession 的 enqueueOperation 是
* 两套独立队列，极端并发（同一毫秒内 archive 与 unarchive/delete 交错）仍可能
* 丢失更新；删除操作已顺带清理孤儿归档条目自愈，残余窗口见 README 并发说明。
*/
async function unarchiveSession(ctx, sessionId) {
	const registry = ctx.get("workspaceRegistry");
	if (registry === void 0 || typeof registry.requireState !== "function" || typeof registry.setState !== "function") {
		const error = new Error("当前 Harness 版本不支持取消归档（缺少 workspaceRegistry 状态原语）");
		error.status = 501;
		error.code = "unsupported";
		throw error;
	}
	// 会话不存在时给明确 404，与 archive/delete/details 语义一致
	const meta = await findSessionMeta(ctx, sessionId);
	if (meta === void 0) {
		const error = new Error("找不到该会话的记录（会话不存在）");
		error.status = 404;
		error.code = "session-not-found";
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
			// 方法白名单：未知 method 优先返回 404，而不是落到参数校验的 400
			if (!ARCHIVED_API_METHODS.has(method)) {
				writeJson(res, 404, { ok: false, error: { code: "not-found", message: `unknown archived API method "${method}"` } });
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
					// M6: 归属校验需要 sessionId——由客户端从详情 files 列表发起时必带
					const ownerSessionId = typeof payload.sessionId === "string" ? payload.sessionId : "";
					writeOk(res, await deleteFile(ctx, path, ownerSessionId));
					return;
				}
				const sessionId = typeof payload.sessionId === "string" ? payload.sessionId : "";
				if (sessionId === "" || sessionId.length > 200) {
					// m17: sessionId 限长，防超长字符串参与全量 list 比对浪费资源
					writeJson(res, 400, { ok: false, error: { code: "bad-request", message: sessionId === "" ? "sessionId is required" : "sessionId is too long" } });
					return;
				}
				if (method === "details") {
					// NOTE: do NOT pass req.signal — the node http IncomingMessage
					// signal auto-aborts the moment the body is fully read, which
					// would abort every persistence read with "This operation was
					// aborted". Detail reads are bounded enough to run uncancelled.
					writeOk(res, await buildDetails(ctx, sessionId));
				} else if (method === "delete") {
					// subagentIds/filePaths: 详情面板细粒度勾选；cascade/deleteFiles 为全选快捷方式
					writeOk(res, await deleteSession(ctx, sessionId, {
						cascade: payload.cascade === true,
						deleteFiles: payload.deleteFiles !== false,
						subagentIds: Array.isArray(payload.subagentIds) ? payload.subagentIds.filter((id) => typeof id === "string") : void 0,
						filePaths: Array.isArray(payload.filePaths) ? payload.filePaths.filter((p) => typeof p === "string") : void 0
					}));
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
