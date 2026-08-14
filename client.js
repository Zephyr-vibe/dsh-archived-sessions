window.__ModuleLoader__.load({
	id: "dsh-archived-sessions",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		//#region css
		const css = ".aRchv_root{flex-direction:column;gap:12px;display:flex}.aRchv_heading{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:20px}.aRchv_toolbar{box-sizing:border-box;flex-wrap:wrap;align-items:center;gap:8px 12px;min-height:32px;display:flex}.aRchv_selectAll{color:var(--dsw-alias-label-secondary);cursor:pointer;align-items:center;gap:6px;font-size:13px;line-height:18px;display:inline-flex}.aRchv_selectAll input{cursor:pointer;accent-color:var(--dsw-accent-strong);width:14px;height:14px}.aRchv_count{color:var(--dsw-alias-label-tertiary);flex:1;min-width:max-content;font-size:12px;line-height:18px}.aRchv_list{flex-direction:column;gap:2px;max-height:min(480px,60vh);display:flex;overflow:auto}.aRchv_row{box-sizing:border-box;cursor:pointer;height:34px;color:var(--dsw-alias-label-primary);user-select:none;border-radius:8px;align-items:center;gap:8px;padding:0 8px;display:flex}.aRchv_row:hover,.aRchv_rowSelected{background:var(--dsw-alias-interactive-bg-hover)}.aRchv_subagentRow{padding-left:26px;border-left:2px solid var(--dsw-alias-border-l2);margin-left:9px;border-radius:0 8px 8px 0}.aRchv_check{width:16px;height:20px;color:var(--dsw-alias-label-tertiary);flex:none;justify-content:center;align-items:center;display:inline-flex}.aRchv_checkCurrent{width:auto;height:auto;flex:none;justify-content:flex-start;align-items:center;display:inline-flex}.aRchv_checkbox{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);width:14px;height:14px;border-radius:4px;justify-content:center;align-items:center;display:inline-flex}.aRchv_checkboxChecked{background:var(--dsw-accent-strong);border-color:var(--dsw-accent-strong);color:#fff}.aRchv_title{text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1;font-size:13px;line-height:18px;overflow:hidden}.aRchv_time{color:var(--dsw-alias-label-tertiary);flex:none;font-size:12px;line-height:17px}.aRchv_current{color:var(--dsw-alias-label-tertiary);cursor:not-allowed}.aRchv_currentBadge{color:var(--dsw-alias-label-tertiary);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;padding:1px 6px;font-size:11px;line-height:16px;white-space:nowrap}.aRchv_subagentBadge{color:var(--dsw-accent-strong);border:1px solid var(--dsw-accent-strong);border-radius:6px;padding:1px 6px;font-size:11px;line-height:16px;white-space:nowrap;flex:none}.aRchv_empty{color:var(--dsw-alias-label-tertiary);padding:18px 8px;font-size:13px;line-height:18px}.aRchv_error{color:var(--dsw-alias-state-error-primary);margin-top:4px;font-size:12px;line-height:18px}.aRchv_hint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.aRchv_chevron{cursor:pointer;color:var(--dsw-alias-label-tertiary);background:0 0;border:none;border-radius:50%;width:20px;height:20px;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex;transition:transform .15s var(--ds-ease-in-out)}.aRchv_chevron:hover{background:var(--dsw-alias-interactive-bg-hover)}.aRchv_chevronOpen{transform:rotate(90deg)}.aRchv_details{border-left:2px solid var(--dsw-alias-border-l2);margin:2px 0 6px 7px;padding:8px 10px 10px 12px;border-radius:0 8px 8px 0;background:var(--dsw-alias-bg-layer-1)}.aRchv_detailBody{flex-direction:column;gap:8px;display:flex}.aRchv_detailGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 18px;display:grid}.aRchv_detailItem{justify-content:space-between;align-items:center;gap:12px;font-size:12px;line-height:18px;display:flex}.aRchv_detailLabel{color:var(--dsw-alias-label-tertiary);flex:none;font-size:12px;line-height:18px}.aRchv_detailSection{color:var(--dsw-alias-label-secondary);margin-top:4px;font-size:12px;font-weight:500;line-height:18px}.aRchv_chips{flex-wrap:wrap;gap:4px;display:flex}.aRchv_chip{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover);border-radius:6px;padding:2px 8px;font-size:11px;line-height:16px}.aRchv_fetchList{flex-direction:column;gap:2px;display:flex}.aRchv_fetchRow{color:var(--dsw-alias-label-secondary);align-items:baseline;gap:8px;font-size:12px;line-height:18px;display:flex}.aRchv_fetchTool{color:var(--dsw-alias-label-primary);flex:none;font-size:11px;line-height:16px}.aRchv_fetchQuery{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.aRchv_lineageRow{color:var(--dsw-alias-label-secondary);justify-content:space-between;align-items:center;gap:12px;font-size:12px;line-height:18px;display:flex}.aRchv_fileFooter{box-sizing:border-box;align-items:center;gap:10px;min-height:28px;display:flex}.aRchv_tabs{box-sizing:border-box;gap:2px;border-bottom:1px solid var(--dsw-alias-border-l2);display:flex}.aRchv_tab{cursor:pointer;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-bottom:2px solid transparent;border-radius:8px 8px 0 0;padding:6px 12px;font-size:13px;line-height:18px;transition:color .15s var(--ds-ease-in-out),border-color .15s var(--ds-ease-in-out)}.aRchv_tab:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.aRchv_tabActive{color:var(--dsw-accent-strong);border-bottom-color:var(--dsw-accent-strong)}.aRchv_tabActive:hover{color:var(--dsw-accent-strong);background:0 0}.aRchv_viewBar{box-sizing:border-box;align-items:center;gap:12px;min-height:28px;display:flex}.aRchv_viewSwitch{box-sizing:border-box;gap:2px;background:var(--dsw-alias-interactive-bg-hover);border-radius:8px;padding:2px;display:inline-flex}.aRchv_viewSwitchItem{cursor:pointer;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-radius:6px;padding:3px 10px;font-size:12px;line-height:18px}.aRchv_viewSwitchItem:hover{color:var(--dsw-alias-label-primary)}.aRchv_viewSwitchItemActive{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);box-shadow:0 1px 2px rgba(0,0,0,.12)}.aRchv_groupHeader{box-sizing:border-box;align-items:center;gap:8px;min-height:28px;margin-top:6px;padding:0 8px;display:flex}.aRchv_groupHeader:first-child{margin-top:0}.aRchv_groupTitle{color:var(--dsw-alias-label-secondary);flex:1;font-size:12px;font-weight:500;line-height:18px}.aRchv_groupCount{color:var(--dsw-alias-label-tertiary);flex:none;font-size:11px;line-height:16px}";
		const tagId = "dsh-archived-sessions/ArchivedSessions.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-archived-sessions";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		const pcss = {
			"root": "aRchv_root", "heading": "aRchv_heading", "toolbar": "aRchv_toolbar", "selectAll": "aRchv_selectAll",
			"count": "aRchv_count", "list": "aRchv_list", "row": "aRchv_row", "rowSelected": "aRchv_rowSelected",
			"check": "aRchv_check", "checkCurrent": "aRchv_checkCurrent", "checkbox": "aRchv_checkbox", "checkboxChecked": "aRchv_checkboxChecked",
			"title": "aRchv_title", "time": "aRchv_time", "current": "aRchv_current", "currentBadge": "aRchv_currentBadge",
			"empty": "aRchv_empty", "error": "aRchv_error", "hint": "aRchv_hint", "chevron": "aRchv_chevron",
			"chevronOpen": "aRchv_chevronOpen", "details": "aRchv_details", "detailBody": "aRchv_detailBody",
			"detailGrid": "aRchv_detailGrid", "detailItem": "aRchv_detailItem", "detailLabel": "aRchv_detailLabel",
			"detailSection": "aRchv_detailSection", "chips": "aRchv_chips", "chip": "aRchv_chip",
			"fetchList": "aRchv_fetchList", "fetchRow": "aRchv_fetchRow", "fetchTool": "aRchv_fetchTool",
			"fetchQuery": "aRchv_fetchQuery", "lineageRow": "aRchv_lineageRow", "fileFooter": "aRchv_fileFooter",
			"tabs": "aRchv_tabs", "tab": "aRchv_tab", "tabActive": "aRchv_tabActive",
			"viewBar": "aRchv_viewBar", "viewSwitch": "aRchv_viewSwitch", "viewSwitchItem": "aRchv_viewSwitchItem", "viewSwitchItemActive": "aRchv_viewSwitchItemActive",
			"groupHeader": "aRchv_groupHeader", "groupTitle": "aRchv_groupTitle", "groupCount": "aRchv_groupCount",
			"subagentBadge": "aRchv_subagentBadge", "subagentRow": "aRchv_subagentRow"
		};
		//#endregion
		//#region locales
		const zh = {
			"nav": "会话管理",
			"title": "会话管理",
			"tab.all": "所有对话",
			"tab.archived": "归档会话",
			"empty": "没有可显示的会话",
			"emptyAll": "没有未归档的对话",
			"emptyArchived": "没有归档的会话",
			"selectAll": "全选",
			"selected": "已选 {n} 项",
			"delete": "删除选中",
			"deleting": "正在删除…",
			"archive": "移动到归档",
			"archiving": "正在归档…",
			"unarchive": "移出归档",
			"unarchiving": "正在移出…",
			"view.workspace": "按工作区",
			"view.flat": "单列表",
			"group.ungrouped": "未分组",
			"group.sessions": "{n} 个会话",
			"archiveConfirm": "确认将 {n} 个会话移动到归档？它们将从所有对话中隐藏，但记录不会删除。",
			"openFolder": "打开记录文件夹",
			"openFolderHint": "在文件管理器中打开所选会话的记录文件夹",
			"confirm": "确认删除 {n} 个会话？会话记录将被永久删除，此操作不可恢复。",
			"current": "当前会话",
			"currentHint": "当前打开的会话不能删除，请先切换到其他会话",
			"subagent": "子代理",
			"details": "详情",
			"detailsLoading": "正在加载详情…",
			"size": "占用空间",
			"updated": "最后更新",
			"turns": "轮次",
			"steps": "步骤",
			"userMessages": "用户消息",
			"assistantMessages": "回复消息",
			"toolCalls": "工具调用",
			"attachments": "附件",
			"tools": "工具使用",
			"fetches": "网络获取 / 下载",
			"noFetches": "无网络获取记录",
			"lineage": "关联对话",
			"parent": "父会话",
			"children": "子会话（分叉）",
			"subagents": "子代理会话",
			"recalledBy": "被其他对话查看/召回",
			"noRecalls": "暂无其他对话查看过本对话",
			"files": "下载 / 产出文件",
			"noFiles": "该对话没有产出文件",
			"fileDelete": "删除选中文件",
			"fileDeleting": "正在删除文件…",
			"count": "{n} 个",
			"none": "无",
			"na": "—",
			"time.now": "刚刚",
			"time.minutes": "{n}分钟",
			"time.hours": "{n}小时",
			"time.days": "{n}天",
			"time.months": "{n}个月",
			"time.years": "{n}年",
			"close": "关闭",
			"cancel": "取消"
		};
		const en = {
			"nav": "Session manager",
			"title": "Session manager",
			"tab.all": "All conversations",
			"tab.archived": "Archived",
			"empty": "No sessions to show",
			"emptyAll": "No active conversations",
			"emptyArchived": "No archived sessions",
			"selectAll": "Select all",
			"selected": "{n} selected",
			"delete": "Delete selected",
			"deleting": "Deleting…",
			"archive": "Archive",
			"archiving": "Archiving…",
			"unarchive": "Unarchive",
			"unarchiving": "Unarchiving…",
			"view.workspace": "By workspace",
			"view.flat": "Flat list",
			"group.ungrouped": "Ungrouped",
			"group.sessions": "{n} sessions",
			"archiveConfirm": "Move {n} session(s) to archive? They will be hidden from all conversations, but their records are kept.",
			"openFolder": "Open record folder",
			"openFolderHint": "Open the selected session's record folder in your file manager",
			"confirm": "Delete {n} session(s)? Session logs will be permanently removed. This cannot be undone.",
			"current": "Current",
			"currentHint": "The current session cannot be deleted. Switch to another session first.",
			"subagent": "subagent",
			"details": "Details",
			"detailsLoading": "Loading details…",
			"size": "Size on disk",
			"updated": "Last updated",
			"turns": "Turns",
			"steps": "Steps",
			"userMessages": "User messages",
			"assistantMessages": "Replies",
			"toolCalls": "Tool calls",
			"attachments": "Attachments",
			"tools": "Tool usage",
			"fetches": "Web fetches / downloads",
			"noFetches": "No web fetches",
			"lineage": "Related conversations",
			"parent": "Parent",
			"children": "Children (forks)",
			"subagents": "Subagent sessions",
			"recalledBy": "Viewed / recalled by",
			"noRecalls": "No other conversations recalled this one",
			"files": "Downloads / produced files",
			"noFiles": "This conversation produced no files",
			"fileDelete": "Delete selected files",
			"fileDeleting": "Deleting files…",
			"count": "{n}",
			"none": "None",
			"na": "—",
			"time.now": "now",
			"time.minutes": "{n}min",
			"time.hours": "{n}h",
			"time.days": "{n}d",
			"time.months": "{n}mo",
			"time.years": "{n}y",
			"close": "Close",
			"cancel": "Cancel"
		};
		//#endregion
		const NS = "archived-sessions";
		const inject = ["slots", "locale", "sessions", "workspaces"];
		async function api(method, payload) {
			const response = await fetch(`/archived/api/${method}`, {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(payload ?? {})
			});
			let body;
			try {
				body = await response.json();
			} catch {
				throw new Error(`archived API ${method} returned a non-JSON response (${response.status})`);
			}
			if (body === null || typeof body !== "object" || body.ok !== true) {
				throw new Error((body && body.error && body.error.message) || `archived API ${method} failed (${response.status})`);
			}
			return body.value;
		}
		function formatBytes(bytes) {
			if (!Number.isFinite(bytes) || bytes < 0) return "0 B";
			if (bytes < 1024) return `${bytes} B`;
			const units = ["KB", "MB", "GB", "TB"];
			let value = bytes;
			let unit = -1;
			do {
				value /= 1024;
				unit++;
			} while (value >= 1024 && unit < units.length - 1);
			return `${value >= 100 ? Math.round(value) : Math.round(value * 10) / 10} ${units[unit]}`;
		}
		function shortId(id) {
			return id.length > 20 ? `${id.slice(0, 10)}…${id.slice(-4)}` : id;
		}
		/** Resolve the best display title: durable title projection, summary title, display title, then a short id. */
		function sessionTitleOf(s) {
			if (s === void 0) return "";
			const projected = s.projectionValues && typeof s.projectionValues === "object" ? s.projectionValues.title : void 0;
			if (typeof projected === "string" && projected !== "") return projected;
			if (typeof s.title === "string" && s.title !== "") return s.title;
			if (typeof s.displayTitle === "string" && s.displayTitle !== "") return s.displayTitle;
			return shortId(s.id);
		}
		function relativeTime(updatedAt, now) {
			const diff = Math.max(0, now - updatedAt);
			const minute = 60 * 1e3;
			const hour = 60 * minute;
			const day = 24 * hour;
			if (diff < minute) return { unit: "now", n: 0 };
			if (diff < hour) return { unit: "minutes", n: Math.floor(diff / minute) };
			if (diff < day) return { unit: "hours", n: Math.floor(diff / hour) };
			if (diff < 30 * day) return { unit: "days", n: Math.floor(diff / day) };
			if (diff < 365 * day) return { unit: "months", n: Math.floor(diff / (30 * day)) };
			return { unit: "years", n: Math.floor(diff / (365 * day)) };
		}
		function timeLabel(updatedAt, now, t) {
			const { unit, n } = relativeTime(updatedAt, now);
			if (unit === "now") return t("time.now");
			return t(`time.${unit}`).replace("{n}", String(n));
		}
		function ArchivedSessionsSection({ useSessions, useWorkspaces, refresh, t }) {
			const sessions = useSessions((s) => s);
			const workspaceState = useWorkspaces((s) => s);
			const archivedIds = workspaceState?.archivedSessionIds ?? [];
			const workspaceItems = workspaceState?.items ?? [];
			const byId = sessions?.byId ?? {};
			const current = sessions?.current;
			const now = Date.now();
			const [tab, setTab] = (0, react.useState)("all");
			const [viewMode, setViewMode] = (0, react.useState)("flat");
			const archivedSet = (0, react.useMemo)(() => new Set(archivedIds), [archivedIds]);
			const allRows = (0, react.useMemo)(() => {
				if (tab === "archived") {
					return [...archivedIds].map((id) => ({
						id,
						title: sessionTitleOf(byId[id]),
						updatedAt: byId[id]?.updatedAt,
						current: id === current,
						subagent: byId[id]?.origin === "subagent",
						parentId: byId[id]?.parentId
					})).sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
				}
				const all = [];
				for (const [id, s] of Object.entries(byId)) {
					if (archivedSet.has(id)) continue;
					if (s.blank) continue;
					all.push({
						id,
						title: sessionTitleOf(s),
						updatedAt: s.updatedAt,
						current: id === current,
						subagent: s.origin === "subagent",
						parentId: s.parentId
					});
				}
				return all.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0));
			}, [tab, archivedIds, archivedSet, byId, current]);
			/** Flatten rows into display order: top-level sessions first, then each
			 * row's subagent children indented right beneath it. A subagent whose
			 * parent is absent (deleted/archived/not listed) surfaces as a
			 * top-level row itself. */
			const displayRows = (0, react.useMemo)(() => {
				const childrenOf = new Map();
				const tops = [];
				for (const row of allRows) {
					if (!row.subagent || row.parentId === void 0 || !allRows.some((r) => r.id === row.parentId)) {
						tops.push(row);
					} else {
						const list = childrenOf.get(row.parentId) ?? [];
						list.push(row);
						childrenOf.set(row.parentId, list);
					}
				}
				const result = [];
				for (const top of tops) {
					result.push(top);
					const kids = childrenOf.get(top.id);
					if (kids !== void 0) {
						for (const kid of kids.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))) result.push(kid);
					}
				}
				return result;
			}, [allRows]);
			/** Grouped rows for the workspace view: each workspace's accounted sessions, then a trailing ungrouped bucket. */
			const groups = (0, react.useMemo)(() => {
				if (tab !== "all" || viewMode !== "workspace") return [];
				const byWorkspace = workspaceItems.map((ws) => ({
					key: ws.workspaceId,
					label: ws.title,
					rows: (ws.sessionIds ?? []).map((id) => allRows.find((row) => row.id === id)).filter((row) => row !== void 0)
				})).filter((group) => group.rows.length > 0);
				const accounted = new Set(byWorkspace.flatMap((group) => group.rows.map((row) => row.id)));
				const ungrouped = allRows.filter((row) => !accounted.has(row.id));
				const result = [...byWorkspace];
				if (ungrouped.length > 0) result.push({ key: "__ungrouped__", label: t("group.ungrouped"), rows: ungrouped });
				return result;
			}, [tab, viewMode, workspaceItems, allRows, t]);
			const rows = viewMode === "workspace" && tab === "all" ? groups.flatMap((group) => group.rows) : displayRows;
			const selectableIds = (0, react.useMemo)(() => rows.filter((row) => !row.current).map((row) => row.id), [rows]);
			const [selected, setSelected] = (0, react.useState)(() => new Set());
			const [dragMode, setDragMode] = (0, react.useState)(null);
			const [deleting, setDeleting] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const [confirmOpen, setConfirmOpen] = (0, react.useState)(false);
			const [expandedId, setExpandedId] = (0, react.useState)(null);
			const [detailsCache, setDetailsCache] = (0, react.useState)(() => new Map());
			const [detailsBusyIds, setDetailsBusyIds] = (0, react.useState)(() => new Set());
			const [detailsError, setDetailsError] = (0, react.useState)(null);
			const [selectedFiles, setSelectedFiles] = (0, react.useState)(() => new Set());
			const [fileDeleting, setFileDeleting] = (0, react.useState)(false);
			const switchTab = (0, react.useCallback)((next) => {
				setTab(next);
				setSelected(new Set());
				setExpandedId(null);
				setDetailsError(null);
			}, []);
			(0, react.useEffect)(() => {
				if (dragMode === null) return;
				const end = () => setDragMode(null);
				window.addEventListener("mouseup", end);
				return () => window.removeEventListener("mouseup", end);
			}, [dragMode]);
			const applyRow = (0, react.useCallback)((id, mode) => {
				setSelected((prev) => {
					const next = new Set(prev);
					if (mode) next.add(id);
					else next.delete(id);
					return next;
				});
			}, []);
			const onRowMouseDown = (0, react.useCallback)((id, event) => {
				event.preventDefault();
				const mode = !selected.has(id);
				applyRow(id, mode);
				setDragMode(mode);
			}, [selected, applyRow]);
			const onRowMouseEnter = (0, react.useCallback)((id) => {
				if (dragMode !== null) applyRow(id, dragMode);
			}, [dragMode, applyRow]);
			const toggleDetails = (0, react.useCallback)((row) => {
				if (expandedId === row.id) {
					setExpandedId(null);
					return;
				}
				setExpandedId(row.id);
				// 切换展开行时清空文件选择，避免把上一行的选中文件带过来误删
				setSelectedFiles(new Set());
				setDetailsError(null);
				if (detailsCache.has(row.id)) return;
				setDetailsBusyIds((prev) => new Set(prev).add(row.id));
				api("details", { sessionId: row.id }).then((value) => {
					setDetailsCache((prev) => {
						const next = new Map(prev);
						next.set(row.id, value);
						return next;
					});
				}).catch((reason) => {
					setDetailsError(reason instanceof Error ? reason.message : String(reason));
				}).finally(() => {
					setDetailsBusyIds((prev) => {
						const next = new Set(prev);
						next.delete(row.id);
						return next;
					});
				});
			}, [expandedId, detailsCache]);
			const selectedCount = selectableIds.filter((id) => selected.has(id)).length;
			const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selected.has(id));
			const toggleAll = () => {
				setSelected(allSelected ? new Set() : new Set(selectableIds));
			};
			const confirmDelete = async () => {
				if (deleting || selectedCount === 0) return;
				const targets = selectableIds.filter((id) => selected.has(id));
				setDeleting(true);
				setError(null);
				try {
					for (const id of targets) await api("delete", { sessionId: id });
					setSelected(new Set());
					setConfirmOpen(false);
					await refresh();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setDeleting(false);
				}
			};
			const openSelectedFolder = async () => {
				setError(null);
				const targets = selectableIds.filter((id) => selected.has(id));
				const sessionId = targets.length > 0 ? targets[0] : (current !== void 0 && byId[current] !== void 0 ? current : void 0);
				if (sessionId === void 0) return;
				try {
					await api("open-folder", { sessionId });
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				}
			};
			const [archiving, setArchiving] = (0, react.useState)(false);
			const [archiveConfirmOpen, setArchiveConfirmOpen] = (0, react.useState)(false);
			const archiveSelected = async () => {
				if (archiving || selectedCount === 0) return;
				const targets = selectableIds.filter((id) => selected.has(id));
				setArchiving(true);
				setError(null);
				try {
					for (const id of targets) await api("archive", { sessionId: id });
					setSelected(new Set());
					setArchiveConfirmOpen(false);
					await refresh();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setArchiving(false);
				}
			};
			const unarchiveSelected = async () => {
				if (archiving || selectedCount === 0) return;
				const targets = selectableIds.filter((id) => selected.has(id));
				setArchiving(true);
				setError(null);
				try {
					for (const id of targets) await api("unarchive", { sessionId: id });
					setSelected(new Set());
					await refresh();
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setArchiving(false);
				}
			};
			const switchViewMode = (0, react.useCallback)((mode) => {
				setViewMode(mode);
				setSelected(new Set());
				setExpandedId(null);
				setDetailsError(null);
			}, []);
			const toggleFile = (path) => {
				setSelectedFiles((prev) => {
					const next = new Set(prev);
					if (next.has(path)) next.delete(path);
					else next.add(path);
					return next;
				});
			};
			const deleteSelectedFiles = async (row) => {
				// 只删除当前展开行详情里列出的文件，防止误删其它行残留的选中项
				const current = detailsCache.get(row.id);
				const known = new Set((current?.files ?? []).map((file) => file.path));
				const targets = [...selectedFiles].filter((path) => known.has(path));
				if (targets.length === 0 || fileDeleting) return;
				setFileDeleting(true);
				setError(null);
				try {
					for (const path of targets) await api("delete-file", { path });
					setSelectedFiles(new Set());
					const value = await api("details", { sessionId: row.id });
					setDetailsCache((prev) => {
						const next = new Map(prev);
						next.set(row.id, value);
						return next;
					});
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setFileDeleting(false);
				}
			};
			const renderDetails = (row, data) => {
				const loading = data === void 0 && detailsBusyIds.has(row.id);
				const failed = data === void 0 && detailsError !== null;
				const parent = data?.lineage?.parentSessionId ?? null;
				const children = data?.lineage?.children ?? [];
				const files = data?.files ?? [];
				const childTitles = children.map((id) => byId[id]?.title ?? shortId(id));
				const fileSelectedCount = files.filter((file) => selectedFiles.has(file.path)).length;
				return (0, react_jsx_runtime.jsxs)("div", {
					className: pcss.details,
					children: [
						loading && (0, react_jsx_runtime.jsx)("div", { className: pcss.hint, children: t("detailsLoading") }),
						failed && (0, react_jsx_runtime.jsx)("div", { className: pcss.error, role: "alert", children: detailsError }),
						data !== void 0 && (0, react_jsx_runtime.jsxs)("div", {
							className: pcss.detailBody,
							children: [
								(0, react_jsx_runtime.jsxs)("div", {
									className: pcss.detailGrid,
									children: [
										(0, react_jsx_runtime.jsxs)("div", { className: pcss.detailItem, children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.detailLabel, children: t("size") }), (0, react_jsx_runtime.jsx)("span", { children: data.sizeBytes === null ? t("na") : formatBytes(data.sizeBytes) })] }),
										(0, react_jsx_runtime.jsxs)("div", { className: pcss.detailItem, children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.detailLabel, children: t("updated") }), (0, react_jsx_runtime.jsx)("span", { children: data.updatedAt ? timeLabel(data.updatedAt, now, t) : t("na") })] })
									]
								}),
								(0, react_jsx_runtime.jsx)("div", { className: pcss.detailSection, children: t("files") }),
								files.length === 0 ? (0, react_jsx_runtime.jsx)("div", { className: pcss.hint, children: t("noFiles") }) : (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
									children: [
										(0, react_jsx_runtime.jsx)("div", {
											className: pcss.fetchList,
											children: files.map((file) => (0, react_jsx_runtime.jsxs)("label", {
												className: pcss.selectAll,
												children: [(0, react_jsx_runtime.jsx)("input", {
													type: "checkbox",
													checked: selectedFiles.has(file.path),
													onChange: () => toggleFile(file.path)
												}), (0, react_jsx_runtime.jsx)("span", {
													className: pcss.title,
													title: file.path,
													children: file.path
												})]
											}, file.path))
										}),
										(0, react_jsx_runtime.jsx)("div", {
											className: pcss.fileFooter,
											children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
												variant: "outline",
												disabled: fileSelectedCount === 0 || fileDeleting,
												onClick: () => void deleteSelectedFiles(row),
												children: fileDeleting ? t("fileDeleting") : `${t("fileDelete")}（${fileSelectedCount}）`
											})
										})
									]
								}),
								(0, react_jsx_runtime.jsx)("div", { className: pcss.detailSection, children: t("lineage") }),
								(0, react_jsx_runtime.jsxs)("div", { className: pcss.lineageRow, children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.detailLabel, children: t("parent") }), (0, react_jsx_runtime.jsx)("span", { children: parent === null ? t("none") : byId[parent]?.title ?? shortId(parent) })] }),
								(0, react_jsx_runtime.jsxs)("div", { className: pcss.lineageRow, children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.detailLabel, children: t("children") }), (0, react_jsx_runtime.jsx)("span", { children: children.length === 0 ? t("none") : childTitles.join("、") })] })
							]
						})
					]
				});
			};
			return (0, react_jsx_runtime.jsxs)("div", {
				className: pcss.root,
				children: [
					(0, react_jsx_runtime.jsx)("div", { className: pcss.heading, children: t("title") }),
					(0, react_jsx_runtime.jsxs)("div", {
						className: pcss.tabs,
						role: "tablist",
						children: [
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								role: "tab",
								"aria-selected": tab === "all",
								className: `${pcss.tab}${tab === "all" ? ` ${pcss.tabActive}` : ""}`,
								onClick: () => switchTab("all"),
								children: t("tab.all")
							}),
							(0, react_jsx_runtime.jsx)("button", {
								type: "button",
								role: "tab",
								"aria-selected": tab === "archived",
								className: `${pcss.tab}${tab === "archived" ? ` ${pcss.tabActive}` : ""}`,
								onClick: () => switchTab("archived"),
								children: t("tab.archived")
							})
						]
					}),
					tab === "all" && (0, react_jsx_runtime.jsx)("div", {
						className: pcss.viewBar,
						children: (0, react_jsx_runtime.jsxs)("div", {
							className: pcss.viewSwitch,
							role: "group",
							children: [
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: `${pcss.viewSwitchItem}${viewMode === "flat" ? ` ${pcss.viewSwitchItemActive}` : ""}`,
									"aria-pressed": viewMode === "flat",
									onClick: () => switchViewMode("flat"),
									children: t("view.flat")
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: `${pcss.viewSwitchItem}${viewMode === "workspace" ? ` ${pcss.viewSwitchItemActive}` : ""}`,
									"aria-pressed": viewMode === "workspace",
									onClick: () => switchViewMode("workspace"),
									children: t("view.workspace")
								})
							]
						})
					}),
					(0, react_jsx_runtime.jsxs)("div", {
						className: pcss.toolbar,
						children: [
							(0, react_jsx_runtime.jsxs)("label", {
								className: pcss.selectAll,
								children: [(0, react_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: allSelected,
									onChange: toggleAll,
									disabled: selectableIds.length === 0
								}), (0, react_jsx_runtime.jsx)("span", { children: t("selectAll") })]
							}),
							(0, react_jsx_runtime.jsx)("span", { className: pcss.count, children: t("selected").replace("{n}", String(selectedCount)) }),
							tab === "all" && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								disabled: selectedCount === 0 || archiving,
								onClick: () => setArchiveConfirmOpen(true),
								children: archiving ? t("archiving") : t("archive")
							}),
							tab === "archived" && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								disabled: selectedCount === 0 || archiving,
								onClick: () => void unarchiveSelected(),
								children: archiving ? t("unarchiving") : t("unarchive")
							}),
							(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								disabled: selectedCount === 0 || deleting,
								onClick: () => setConfirmOpen(true),
								children: deleting ? t("deleting") : t("delete")
							}),
							(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
								variant: "outline",
								disabled: rows.length === 0,
								title: t("openFolderHint"),
								onClick: () => void openSelectedFolder(),
								children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
									children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconFolderOpenOutline16, { size: 14 }), " ", t("openFolder")]
								})
							})
						]
					}),
					error !== null && (0, react_jsx_runtime.jsx)("div", { className: pcss.error, role: "alert", children: error }),
					rows.length === 0 ? (0, react_jsx_runtime.jsx)("div", { className: pcss.empty, children: t(tab === "all" ? "emptyAll" : "emptyArchived") }) : (viewMode === "workspace" && tab === "all" ? (0, react_jsx_runtime.jsx)("div", {
						className: pcss.list,
						children: groups.map((group) => (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
							children: [
								(0, react_jsx_runtime.jsxs)("div", {
									className: pcss.groupHeader,
									children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.groupTitle, children: group.label }), (0, react_jsx_runtime.jsx)("span", { className: pcss.groupCount, children: t("group.sessions").replace("{n}", String(group.rows.length)) })]
								}),
								group.rows.map((row) => {
									const isSelected = selected.has(row.id);
									const isExpanded = expandedId === row.id;
									const data = isExpanded ? detailsCache.get(row.id) : void 0;
									return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
										children: [
											(0, react_jsx_runtime.jsxs)("div", {
												className: `${pcss.row}${isSelected ? ` ${pcss.rowSelected}` : ""}${row.current ? ` ${pcss.current}` : ""}${row.subagent ? ` ${pcss.subagentRow}` : ""}`,
												"aria-selected": isSelected,
												title: row.current ? t("currentHint") : void 0,
												onMouseDown: row.current ? void 0 : (event) => onRowMouseDown(row.id, event),
												onMouseEnter: row.current ? void 0 : () => onRowMouseEnter(row.id),
												children: [
													(0, react_jsx_runtime.jsx)("span", {
														className: row.current ? `${pcss.check} ${pcss.checkCurrent}` : pcss.check,
														children: row.current ? (0, react_jsx_runtime.jsx)("span", { className: pcss.currentBadge, children: t("current") }) : (0, react_jsx_runtime.jsx)("span", {
															className: `${pcss.checkbox}${isSelected ? ` ${pcss.checkboxChecked}` : ""}`,
															children: isSelected && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, { size: 12 })
														})
													}),
													(0, react_jsx_runtime.jsx)("span", { className: pcss.title, children: row.title }),
													row.updatedAt !== void 0 && (0, react_jsx_runtime.jsx)("span", { className: pcss.time, children: timeLabel(row.updatedAt, now, t) }),
													row.subagent && (0, react_jsx_runtime.jsx)("span", { className: pcss.subagentBadge, children: t("subagent") }),
													(0, react_jsx_runtime.jsx)("button", {
														type: "button",
														className: `${pcss.chevron}${isExpanded ? ` ${pcss.chevronOpen}` : ""}`,
														"aria-label": t("details"),
														"aria-expanded": isExpanded,
														onMouseDown: (e) => e.stopPropagation(),
														onClick: (e) => {
															e.stopPropagation();
															toggleDetails(row);
														},
														children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFill14, {})
													})
												]
											}, row.id),
											isExpanded && renderDetails(row, data)
										]
									}, row.id);
								})
							]
						}, group.key))
					}) : (0, react_jsx_runtime.jsx)("div", {
						className: pcss.list,
						children: rows.map((row) => {
							const isSelected = selected.has(row.id);
							const isExpanded = expandedId === row.id;
							const data = isExpanded ? detailsCache.get(row.id) : void 0;
							return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
								children: [
									(0, react_jsx_runtime.jsxs)("div", {
										className: `${pcss.row}${isSelected ? ` ${pcss.rowSelected}` : ""}${row.current ? ` ${pcss.current}` : ""}${row.subagent ? ` ${pcss.subagentRow}` : ""}`,
										"aria-selected": isSelected,
										title: row.current ? t("currentHint") : void 0,
										onMouseDown: row.current ? void 0 : (event) => onRowMouseDown(row.id, event),
										onMouseEnter: row.current ? void 0 : () => onRowMouseEnter(row.id),
										children: [
											(0, react_jsx_runtime.jsx)("span", {
												className: row.current ? `${pcss.check} ${pcss.checkCurrent}` : pcss.check,
												children: row.current ? (0, react_jsx_runtime.jsx)("span", { className: pcss.currentBadge, children: t("current") }) : (0, react_jsx_runtime.jsx)("span", {
													className: `${pcss.checkbox}${isSelected ? ` ${pcss.checkboxChecked}` : ""}`,
													children: isSelected && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, { size: 12 })
												})
											}),
											(0, react_jsx_runtime.jsx)("span", { className: pcss.title, children: row.title }),
											row.updatedAt !== void 0 && (0, react_jsx_runtime.jsx)("span", { className: pcss.time, children: timeLabel(row.updatedAt, now, t) }),
											row.subagent && (0, react_jsx_runtime.jsx)("span", { className: pcss.subagentBadge, children: t("subagent") }),
											(0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: `${pcss.chevron}${isExpanded ? ` ${pcss.chevronOpen}` : ""}`,
												"aria-label": t("details"),
												"aria-expanded": isExpanded,
												onMouseDown: (e) => e.stopPropagation(),
												onClick: (e) => {
													e.stopPropagation();
													toggleDetails(row);
												},
												children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFill14, {})
											})
										]
									}, row.id),
									isExpanded && renderDetails(row, data)
								]
							}, row.id);
						})
					})),
					(0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: confirmOpen,
						onClose: () => { if (!deleting) setConfirmOpen(false); },
						closeLabel: t("close"),
						title: t("delete"),
						description: t("confirm").replace("{n}", String(selectedCount)),
						footer: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: deleting,
							onClick: () => setConfirmOpen(false),
							children: t("cancel")
						}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: deleting,
							onClick: confirmDelete,
							children: deleting ? t("deleting") : t("delete")
						})] })
					}),
					(0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: archiveConfirmOpen,
						onClose: () => { if (!archiving) setArchiveConfirmOpen(false); },
						closeLabel: t("close"),
						title: t("archive"),
						description: t("archiveConfirm").replace("{n}", String(selectedCount)),
						footer: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: archiving,
							onClick: () => setArchiveConfirmOpen(false),
							children: t("cancel")
						}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: archiving,
							onClick: archiveSelected,
							children: archiving ? t("archiving") : t("archive")
						})] })
					})
				]
			});
		}
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-archived-sessions: dictionaries");
			const t = ctx.locale.bind(NS);
			ctx.slots.inject("settings.section", () => ctx.slots.register({
				name: "settings.section",
				id: "archived-sessions",
				order: 200,
				label: () => t("nav"),
				locale: NS,
				inject: () => ({
					refresh: async () => {
						await ctx.sessions.refresh();
						await ctx.workspaces.refresh();
					}
				})
			}, ArchivedSessionsSection));
		}
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
