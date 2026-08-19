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
		const css = ".aRchv_root{flex-direction:column;gap:12px;display:flex}.aRchv_heading{color:var(--dsw-alias-label-primary);font-size:14px;font-weight:500;line-height:20px}.aRchv_toolbar{box-sizing:border-box;flex-wrap:wrap;align-items:center;gap:8px 12px;min-height:32px;display:flex}.aRchv_selectAll{color:var(--dsw-alias-label-secondary);cursor:pointer;align-items:center;gap:6px;font-size:13px;line-height:18px;display:inline-flex}.aRchv_selectAll input{cursor:pointer;accent-color:var(--dsw-accent-strong);width:14px;height:14px}.aRchv_count{color:var(--dsw-alias-label-tertiary);flex:1;min-width:max-content;font-size:12px;line-height:18px}.aRchv_list{flex-direction:column;gap:2px;max-height:min(480px,60vh);display:flex;overflow:auto}.aRchv_row{box-sizing:border-box;cursor:pointer;height:34px;color:var(--dsw-alias-label-primary);user-select:none;border-radius:8px;align-items:center;gap:8px;padding:0 8px;display:flex}.aRchv_row:hover{background:var(--dsw-alias-interactive-bg-hover)}.aRchv_rowSelected{background:var(--dsw-alias-interactive-bg-hover);box-shadow:inset 3px 0 0 var(--dsw-accent-strong);outline:1px solid var(--dsw-alias-border-l2);outline-offset:-1px}.aRchv_subagentRow{padding-left:20px;border-left:2px solid var(--dsw-alias-border-l2);margin-left:9px;border-radius:0 8px 8px 0}.aRchv_check{width:16px;height:20px;color:var(--dsw-alias-label-tertiary);flex:none;justify-content:center;align-items:center;display:inline-flex}.aRchv_checkCurrent{width:auto;height:auto;flex:none;justify-content:flex-start;align-items:center;display:inline-flex}.aRchv_checkbox{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);width:14px;height:14px;border-radius:4px;justify-content:center;align-items:center;display:inline-flex}.aRchv_checkboxChecked{background:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-primary);color:var(--dsw-alias-label-primary-inverted)}.aRchv_title{text-overflow:ellipsis;white-space:nowrap;min-width:0;flex:1;font-size:13px;line-height:18px;overflow:hidden}.aRchv_time{color:var(--dsw-alias-label-tertiary);flex:none;font-size:12px;line-height:17px}.aRchv_current{color:var(--dsw-alias-label-tertiary);cursor:not-allowed}.aRchv_currentBadge{color:var(--dsw-alias-label-tertiary);border:1px solid var(--dsw-alias-border-l2);border-radius:6px;padding:1px 6px;font-size:11px;line-height:16px;white-space:nowrap}.aRchv_subagentBadge{color:var(--dsw-accent-strong);border:1px solid var(--dsw-accent-strong);border-radius:6px;padding:1px 6px;font-size:11px;line-height:16px;white-space:nowrap;flex:none}.aRchv_subagentToggle{cursor:pointer;color:var(--dsw-alias-label-tertiary);background:0 0;border:none;border-radius:50%;width:20px;height:20px;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex;transition:transform .15s var(--ds-ease-in-out)}.aRchv_subagentToggle:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.aRchv_subagentToggleOpen{transform:rotate(90deg)}.aRchv_empty{color:var(--dsw-alias-label-tertiary);padding:18px 8px;font-size:13px;line-height:18px}.aRchv_error{color:var(--dsw-alias-state-error-primary);margin-top:4px;font-size:12px;line-height:18px}.aRchv_notice{color:var(--dsw-alias-state-success-primary,var(--dsw-alias-label-secondary));margin-top:4px;font-size:12px;line-height:18px}.aRchv_hint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}.aRchv_chevron{cursor:pointer;color:var(--dsw-alias-label-tertiary);background:0 0;border:none;border-radius:50%;width:20px;height:20px;flex:none;justify-content:center;align-items:center;padding:0;display:inline-flex;transition:transform .15s var(--ds-ease-in-out)}.aRchv_chevron:hover{background:var(--dsw-alias-interactive-bg-hover)}.aRchv_chevronOpen{transform:rotate(90deg)}.aRchv_details{border-left:2px solid var(--dsw-alias-border-l2);margin:2px 0 6px 7px;padding:8px 10px 10px 12px;border-radius:0 8px 8px 0;background:var(--dsw-alias-bg-layer-1)}.aRchv_detailBody{flex-direction:column;gap:8px;display:flex}.aRchv_detailGrid{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px 18px;display:grid}.aRchv_detailItem{justify-content:space-between;align-items:center;gap:12px;font-size:12px;line-height:18px;display:flex}.aRchv_detailLabel{color:var(--dsw-alias-label-tertiary);flex:none;font-size:12px;line-height:18px}.aRchv_detailSection{color:var(--dsw-alias-label-secondary);margin-top:4px;font-size:12px;font-weight:500;line-height:18px}.aRchv_chips{flex-wrap:wrap;gap:4px;display:flex}.aRchv_chip{color:var(--dsw-alias-label-secondary);background:var(--dsw-alias-interactive-bg-hover);border-radius:6px;padding:2px 8px;font-size:11px;line-height:16px}.aRchv_fetchList{flex-direction:column;gap:2px;display:flex}.aRchv_fetchRow{color:var(--dsw-alias-label-secondary);align-items:baseline;gap:8px;font-size:12px;line-height:18px;display:flex}.aRchv_fetchTool{color:var(--dsw-alias-label-primary);flex:none;font-size:11px;line-height:16px}.aRchv_fetchQuery{text-overflow:ellipsis;white-space:nowrap;min-width:0;overflow:hidden}.aRchv_lineageRow{color:var(--dsw-alias-label-secondary);justify-content:space-between;align-items:center;gap:12px;font-size:12px;line-height:18px;display:flex}.aRchv_fileFooter{box-sizing:border-box;align-items:center;gap:10px;min-height:28px;display:flex}.aRchv_tabs{box-sizing:border-box;gap:2px;border-bottom:1px solid var(--dsw-alias-border-l2);display:flex}.aRchv_tab{cursor:pointer;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-bottom:2px solid transparent;border-radius:8px 8px 0 0;padding:6px 12px;font-size:13px;line-height:18px;transition:color .15s var(--ds-ease-in-out),border-color .15s var(--ds-ease-in-out)}.aRchv_tab:hover{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-interactive-bg-hover)}.aRchv_tabActive{color:var(--dsw-accent-strong);border-bottom-color:var(--dsw-accent-strong)}.aRchv_tabActive:hover{color:var(--dsw-accent-strong);background:0 0}.aRchv_viewBar{box-sizing:border-box;align-items:center;gap:12px;min-height:28px;display:flex}.aRchv_viewSwitch{box-sizing:border-box;gap:2px;background:var(--dsw-alias-interactive-bg-hover);border-radius:8px;padding:2px;display:inline-flex}.aRchv_viewSwitchItem{cursor:pointer;color:var(--dsw-alias-label-secondary);background:0 0;border:none;border-radius:6px;padding:3px 10px;font-size:12px;line-height:18px}.aRchv_viewSwitchItem:hover{color:var(--dsw-alias-label-primary)}.aRchv_viewSwitchItemActive{color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);box-shadow:0 1px 2px rgba(0,0,0,.12)}.aRchv_groupHeader{box-sizing:border-box;align-items:center;gap:8px;min-height:28px;margin-top:6px;padding:0 8px;display:flex}.aRchv_groupHeader:first-child{margin-top:0}.aRchv_groupTitle{color:var(--dsw-alias-label-secondary);flex:1;font-size:12px;font-weight:500;line-height:18px}.aRchv_groupCount{color:var(--dsw-alias-label-tertiary);flex:none;font-size:11px;line-height:16px}.aRchv_search{box-sizing:border-box;color:var(--dsw-alias-label-primary);background:var(--dsw-alias-bg-layer-1);border:1px solid var(--dsw-alias-border-l2);border-radius:8px;padding:4px 10px;flex:1;min-width:120px;font-size:13px;line-height:18px;outline:none}.aRchv_search:focus{border-color:var(--dsw-accent-strong)}.aRchv_search::placeholder{color:var(--dsw-alias-label-tertiary)}";
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
			"empty": "aRchv_empty", "error": "aRchv_error", "notice": "aRchv_notice", "hint": "aRchv_hint", "chevron": "aRchv_chevron",
			"chevronOpen": "aRchv_chevronOpen", "details": "aRchv_details", "detailBody": "aRchv_detailBody",
			"detailGrid": "aRchv_detailGrid", "detailItem": "aRchv_detailItem", "detailLabel": "aRchv_detailLabel",
			"detailSection": "aRchv_detailSection", "chips": "aRchv_chips", "chip": "aRchv_chip",
			"fetchList": "aRchv_fetchList", "fetchRow": "aRchv_fetchRow", "fetchTool": "aRchv_fetchTool",
			"fetchQuery": "aRchv_fetchQuery", "lineageRow": "aRchv_lineageRow", "fileFooter": "aRchv_fileFooter",
			"tabs": "aRchv_tabs", "tab": "aRchv_tab", "tabActive": "aRchv_tabActive",
			"viewBar": "aRchv_viewBar", "viewSwitch": "aRchv_viewSwitch", "viewSwitchItem": "aRchv_viewSwitchItem", "viewSwitchItemActive": "aRchv_viewSwitchItemActive",
			"search": "aRchv_search",
			"groupHeader": "aRchv_groupHeader", "groupTitle": "aRchv_groupTitle", "groupCount": "aRchv_groupCount",
			"subagentBadge": "aRchv_subagentBadge", "subagentRow": "aRchv_subagentRow",
			"subagentToggle": "aRchv_subagentToggle", "subagentToggleOpen": "aRchv_subagentToggleOpen"
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
			"searchPlaceholder": "搜索会话…",
			"group.ungrouped": "未分组",
			"group.sessions": "{n} 个会话",
			"batchResult": "成功 {ok} 项，失败 {fail} 项",
			"archiveConfirm": "确认将 {n} 个会话移动到归档？它们将从所有对话中隐藏，但记录不会删除。",
			"openFolder": "打开记录文件夹",
			"openFolderHint": "在文件管理器中打开所选会话的记录文件夹",
			"confirm": "确认删除 {n} 个会话？",
			"confirmNote": "会话记录将被永久删除，此操作不可恢复。",
			"deleteCascade": "删除其下子对话（子代理）",
			"deleteFiles": "删除所有下载文件/产出文件",
			"deleteDetail": "详情",
			"deleteDetailHint": "点详情可查看并勾选具体删除项",
			"deleteDetailSubagents": "将删除的子对话",
			"deleteDetailFiles": "将删除的下载/产出文件",
			"deleteDetailFilesNote": "不会显示修改文件信息，只显示下载/产出文件",
			"deleteDetailNone": "无",
			"current": "当前会话",
			"currentHint": "当前打开的会话不能删除，请先切换到其他会话",
			"subagent": "子代理",
			"subagentExpand": "展开子代理",
			"subagentCollapse": "收起子代理",
			"details": "详情",
			"detailsLoading": "正在加载详情…",
			"activity": "活动统计",
			"loading": "正在加载…",
			"retry": "重试",
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
			"fileDeleteConfirm": "确认删除选中的 {n} 个文件？文件将被永久删除，此操作不可恢复。",
			"fileDeleteDone": "已删除 {n} 个文件",
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
			"searchPlaceholder": "Search sessions…",
			"group.ungrouped": "Ungrouped",
			"group.sessions": "{n} sessions",
			"batchResult": "{ok} succeeded, {fail} failed",
			"archiveConfirm": "Move {n} session(s) to archive? They will be hidden from all conversations, but their records are kept.",
			"openFolder": "Open record folder",
			"openFolderHint": "Open the selected session's record folder in your file manager",
			"confirm": "Delete {n} session(s)?",
			"confirmNote": "Session logs will be permanently removed. This cannot be undone.",
			"deleteCascade": "Delete their sub-conversations (subagents)",
			"deleteFiles": "Delete all downloaded/produced files",
			"deleteDetail": "Details",
			"deleteDetailHint": "Open details to view and select specific items",
			"deleteDetailSubagents": "Sub-conversations to delete",
			"deleteDetailFiles": "Downloaded/produced files to delete",
			"deleteDetailFilesNote": "Only downloaded/produced files are listed (edit/write info is not shown)",
			"deleteDetailNone": "None",
			"current": "Current",
			"currentHint": "The current session cannot be deleted. Switch to another session first.",
			"subagent": "subagent",
			"subagentExpand": "Expand subagents",
			"subagentCollapse": "Collapse subagents",
			"details": "Details",
			"detailsLoading": "Loading details…",
			"activity": "Activity",
			"loading": "Loading…",
			"retry": "Retry",
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
			"fileDeleteConfirm": "Delete {n} selected file(s)? Files will be permanently removed. This cannot be undone.",
			"fileDeleteDone": "Deleted {n} file(s)",
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
		/** Default request timeout; a hung fetch otherwise leaves the row "loading" forever. */
		const API_TIMEOUT_MS = 15e3;
		/** Upper bound for the per-session detail cache (LRU eviction). */
		const DETAILS_CACHE_LIMIT = 50;
		async function api(method, payload, options) {
			const controller = new AbortController();
			// m8: 超时覆盖到响应体读取完成——timer 在 fetch resolve 后不清除，
			// 而是等 response.json() 解析完再 clear，避免响应头到达但 body 挂起
			// 时无限等待（loading 卡住）。
			const timer = setTimeout(() => controller.abort(), options?.timeoutMs ?? API_TIMEOUT_MS);
			let response;
			try {
				response = await fetch(`/archived/api/${method}`, {
					method: "POST",
					headers: { "content-type": "application/json" },
					body: JSON.stringify(payload ?? {}),
					signal: controller.signal
				});
			} catch (error) {
				clearTimeout(timer);
				if (error !== null && typeof error === "object" && error.name === "AbortError") {
					throw new Error(`archived API ${method} timed out`);
				}
				throw error;
			}
			let body;
			try {
				body = await response.json();
			} catch (error) {
				clearTimeout(timer);
				if (error !== null && typeof error === "object" && error.name === "AbortError") {
					throw new Error(`archived API ${method} timed out`);
				}
				throw new Error(`archived API ${method} returned a non-JSON response (${response.status})`);
			}
			clearTimeout(timer);
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
		/** Resolve the best display title: durable title projection, summary title, display title, then a short id.
		 * m7: session 缺失（如孤儿归档条目）时兜底返回 shortId，避免渲染空标题行。 */
		function sessionTitleOf(s, fallbackId) {
			if (s === void 0) return typeof fallbackId === "string" && fallbackId !== "" ? shortId(fallbackId) : "";
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
		/** 行组件（memo）：props 全部为基本类型/稳定引用，父组件重渲染时未变化的行跳过，
		 * 避免会话高频更新（agent 运行中）导致整个列表反复重建 DOM（打开卡顿优化）。 */
		const SessionRow = (0, react.memo)(function SessionRow(props) {
			const { row, isSelected, isExpanded, hasKids, kidsOpen, depth, timeText, showSubagentBadge,
				currentText, currentHintText, subagentText, detailsLabel, subagentExpandLabel, subagentCollapseLabel,
				onKeyDown, onMouseDown, onMouseEnter, onToggleKids, onToggleDetails } = props;
			return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
				children: [(0, react_jsx_runtime.jsxs)("div", {
					className: `${pcss.row}${isSelected ? ` ${pcss.rowSelected}` : ""}${row.current ? ` ${pcss.current}` : ""}${row.subagent ? ` ${pcss.subagentRow}` : ""}`,
					// 多级缩进：孙级及更深子代理逐层加深，与父级子代理区分层级
					style: row.subagent && depth > 1 ? { paddingLeft: 20 + (depth - 1) * 16 } : void 0,
					"aria-selected": isSelected,
					title: row.current ? currentHintText : void 0,
					tabIndex: row.current ? -1 : 0, // m12: 行可聚焦支持键盘选择
					onKeyDown: row.current ? void 0 : (event) => onKeyDown(row.id, event),
					onMouseDown: row.current ? void 0 : (event) => onMouseDown(row.id, event),
					onMouseEnter: row.current ? void 0 : () => onMouseEnter(row.id),
					children: [
						hasKids && (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: `${pcss.subagentToggle}${kidsOpen ? ` ${pcss.subagentToggleOpen}` : ""}`,
							"aria-label": kidsOpen ? subagentCollapseLabel : subagentExpandLabel,
							"aria-expanded": kidsOpen,
							onMouseDown: (e) => e.stopPropagation(),
							onClick: (e) => {
								e.stopPropagation();
								onToggleKids(row.id);
							},
							children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFill14, {})
						}),
						(0, react_jsx_runtime.jsx)("span", {
							className: row.current ? `${pcss.check} ${pcss.checkCurrent}` : pcss.check,
							children: row.current ? (0, react_jsx_runtime.jsx)("span", { className: pcss.currentBadge, children: currentText }) : (0, react_jsx_runtime.jsx)("span", {
								className: `${pcss.checkbox}${isSelected ? ` ${pcss.checkboxChecked}` : ""}`,
								children: isSelected && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconCheckOutline16, { size: 12 })
							})
						}),
						(0, react_jsx_runtime.jsx)("span", { className: pcss.title, title: row.title, children: row.title }),
						timeText !== void 0 && (0, react_jsx_runtime.jsx)("span", { className: pcss.time, title: new Date(row.updatedAt).toLocaleString(), children: timeText }),
						showSubagentBadge && (0, react_jsx_runtime.jsx)("span", { className: pcss.subagentBadge, children: subagentText }),
						(0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: `${pcss.chevron}${isExpanded ? ` ${pcss.chevronOpen}` : ""}`,
							"aria-label": detailsLabel,
							"aria-expanded": isExpanded,
							onMouseDown: (e) => e.stopPropagation(),
							onClick: (e) => {
								e.stopPropagation();
								onToggleDetails(row);
							},
							children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFill14, {})
						})
					]
				}, row.id)]
			});
		});
		function ArchivedSessionsSection({ useSessions, useWorkspaces, refresh, t }) {
			// 拆开订阅：byId 引用变化才触发重渲染（会话集合更新），
			// current/phase 单独订阅，避免 store 顶层对象抖动时全量重渲染（打开卡顿优化）
			const sessionsById = useSessions((s) => s?.byId);
			const sessionCurrent = useSessions((s) => s?.current);
			const sessionPhase = useSessions((s) => s?.phase);
			const sessions = { byId: sessionsById, current: sessionCurrent, phase: sessionPhase };
			const workspaceState = useWorkspaces((s) => s);
			const archivedIds = workspaceState?.archivedSessionIds ?? [];
			const workspaceItems = workspaceState?.items ?? [];
			const byId = sessions?.byId ?? {};
			const current = sessions?.current;
			// H1: arrival/loading/error lifecycle from the official stores
			const listPhase = sessions?.phase;
			const workspacesState = workspaceState?.state;
			const baselinesReady = workspaceState?.baselinesReady;
			const workspaceError = workspaceState?.error;
			// m11: 60s ticker 驱动相对时间标签自动刷新（cleanup 防止 interval 泄漏）
			const [, setTick] = (0, react.useState)(0);
			(0, react.useEffect)(() => {
				const timer = setInterval(() => setTick((t) => t + 1), 60e3);
				return () => clearInterval(timer);
			}, []);
			const now = Date.now();
			const [tab, setTab] = (0, react.useState)("all");
			// 默认按工作区分组（更贴近"会话归属哪个项目"的使用习惯）
			const [viewMode, setViewMode] = (0, react.useState)("workspace");
			const [searchQuery, setSearchQuery] = (0, react.useState)("");
			const [expandedParents, setExpandedParents] = (0, react.useState)(() => new Set());
			const toggleSubagents = (0, react.useCallback)((id) => {
				setExpandedParents((prev) => {
					const next = new Set(prev);
					if (next.has(id)) next.delete(id);
					else next.add(id);
					return next;
				});
			}, []);
			const archivedSet = (0, react.useMemo)(() => new Set(archivedIds), [archivedIds]);
			/** id 归一化工具：byId 的 key 与 parentId 的格式可能不一致（有的带
			 * `session-` 前缀、有的是纯 uuid）。所有归属匹配统一经 normId 双向
			 * 归一，避免子代理被误判为孤儿。 */
			const normId = (id) => (typeof id === "string" && id.startsWith("session-") ? id.slice("session-".length) : id);
			const allRows = (0, react.useMemo)(() => {
				const sortRows = (rows) => rows.sort((a, b) => {
					// 当前会话置顶；无当前会话时按最近更新排序
					if (a.current !== b.current) return a.current ? -1 : 1;
					return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
				});
				if (tab === "archived") {
					return sortRows([...archivedIds].map((id) => ({
						id,
						title: sessionTitleOf(byId[id], id),
						updatedAt: byId[id]?.updatedAt,
						current: id === current,
						subagent: byId[id]?.origin === "subagent",
						parentId: byId[id]?.parentId
					})));
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
				return sortRows(all);
			}, [tab, archivedIds, archivedSet, byId, current]);
			/** O(1) lookups for parent/subagent attribution (H2: replaces O(N²) scans).
			 * idSet/rowById 同时登记原始 id 与 normId 变体，parentId 无论带不带
			 * `session-` 前缀都能命中父行。 */
			const rowIndex = (0, react.useMemo)(() => {
				const idSet = new Set();
				const rowById = new Map();
				for (const row of allRows) {
					idSet.add(row.id);
					idSet.add(normId(row.id));
					rowById.set(row.id, row);
					rowById.set(normId(row.id), row);
				}
				return { idSet, rowById };
			}, [allRows]);
			/** Map from parent session id → number of direct subagent children (for the expand/collapse affordance). */
			const subagentCounts = (0, react.useMemo)(() => {
				const counts = new Map();
				for (const [id, s] of Object.entries(byId)) {
					if (s.origin !== "subagent" || s.parentId === void 0) continue;
					const pid = normId(s.parentId);
					counts.set(pid, (counts.get(pid) ?? 0) + 1);
				}
				return counts;
			}, [byId]);
			/** Title/id local filter (search box). Subagents whose parent is filtered out still show when their own title matches. */
			const filteredRows = (0, react.useMemo)(() => {
				const q = searchQuery.trim().toLowerCase();
				if (q === "") return allRows;
				return allRows.filter((row) => row.title.toLowerCase().includes(q) || row.id.toLowerCase().includes(q));
			}, [allRows, searchQuery]);
			/** 行深度（树结构决定，与展开状态无关）：顶层 0，子代理逐层 +1。
			 * 渲染时按深度叠加缩进，孙级子代理与父级子代理在视觉上区分层级。 */
			const depthOf = (0, react.useMemo)(() => {
				const childrenOf = new Map();
				for (const row of filteredRows) {
					if (!row.subagent || row.parentId === void 0) continue;
					const parentKey = normId(row.parentId);
					if (!rowIndex.idSet.has(parentKey)) continue;
					const list = childrenOf.get(parentKey) ?? [];
					list.push(row.id);
					childrenOf.set(parentKey, list);
				}
				const depth = new Map();
				const visited = new Set();
				const walk = (id, d) => {
					if (visited.has(id)) return; // 防环（损坏数据）
					visited.add(id);
					depth.set(id, d);
					for (const kid of childrenOf.get(normId(id)) ?? []) walk(kid, d + 1);
				};
				for (const row of filteredRows) {
					if (!row.subagent || row.parentId === void 0 || !rowIndex.idSet.has(normId(row.parentId))) walk(row.id, 0);
				}
				return depth;
			}, [filteredRows, rowIndex]);
			/** Flatten rows into display order: top-level sessions first, then each
			 * row's subagent children indented right beneath it. A subagent whose
			 * parent is absent (deleted/archived/not listed) surfaces as a
			 * top-level row itself. */
			const displayRows = (0, react.useMemo)(() => {
				const childrenOf = new Map();
				const tops = [];
				for (const row of filteredRows) {
					const parentKey = row.parentId === void 0 ? void 0 : normId(row.parentId);
					if (!row.subagent || parentKey === void 0 || !rowIndex.idSet.has(parentKey)) {
						tops.push(row);
					} else {
						const list = childrenOf.get(parentKey) ?? [];
						list.push(row);
						childrenOf.set(parentKey, list);
					}
				}
				const result = [];
				// 递归挂子代：展开的节点继续深入，子代理的子代理（孙级）也能显示
				const append = (row) => {
					result.push(row);
					const kids = childrenOf.get(normId(row.id));
					if (kids !== void 0 && expandedParents.has(row.id)) {
						for (const kid of kids.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))) append(kid);
					}
				};
				for (const top of tops) append(top);
				return result;
			}, [filteredRows, expandedParents, rowIndex]);
			/** Grouped rows for the workspace view: each workspace's accounted
			 * sessions, then a trailing ungrouped bucket. Subagents travel with
			 * their parent: a subagent is placed right after its parent row
			 * inside the same group (parent lookup is workspace-independent, so
			 * ungrouped parents carry their subagents into the ungrouped bucket).
			 * A subagent whose parent is absent surfaces as a top-level row and
			 * is bucketed like any other top-level session. */
			const groups = (0, react.useMemo)(() => {
				if (tab !== "all" || viewMode !== "workspace") return [];
				const childrenOf = new Map();
				for (const row of filteredRows) {
					if (!row.subagent || row.parentId === void 0) continue;
					const parentKey = normId(row.parentId);
					if (!rowIndex.idSet.has(parentKey)) continue;
					const list = childrenOf.get(parentKey) ?? [];
					list.push(row);
					childrenOf.set(parentKey, list);
				}
				/** 归属判定与展开状态无关：子代理永远跟随父会话。
				 * m15: visited 防环——损坏数据（parentId 成环）时不至于无限递归。 */
				const lineageOf = (id) => {
					const ids = [];
					const visited = new Set();
					const walk = (nodeId) => {
						if (visited.has(nodeId)) return;
						visited.add(nodeId);
						ids.push(nodeId);
						const kids = childrenOf.get(normId(nodeId));
						if (kids !== void 0) for (const kid of kids) walk(kid.id);
					};
					walk(id);
					return ids;
				};
				const attachKids = (rows) => {
					const result = [];
					// 递归挂子代：孙级子代理在父级展开时逐层显示
					const append = (row) => {
						result.push(row);
						const kids = childrenOf.get(normId(row.id));
						if (kids !== void 0 && expandedParents.has(row.id)) {
							for (const kid of kids.sort((a, b) => (b.updatedAt ?? 0) - (a.updatedAt ?? 0))) append(kid);
						}
					};
					for (const row of rows) append(row);
					return result;
				};
				const byWorkspace = workspaceItems.map((ws) => {
					const tops = (ws.sessionIds ?? []).map((id) => rowIndex.rowById.get(id) ?? rowIndex.rowById.get(normId(id))).filter((row) => row !== void 0);
					// 组内排序：当前会话置顶，其余按最近更新降序（与单列表一致）
					tops.sort((a, b) => {
						if (a.current !== b.current) return a.current ? -1 : 1;
						return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
					});
					return {
						key: ws.workspaceId,
						label: ws.title,
						rows: attachKids(tops),
						allIds: tops.flatMap((top) => lineageOf(top.id))
					};
				}).filter((group) => group.rows.length > 0);
				const accounted = new Set(byWorkspace.flatMap((group) => group.allIds));
				/** 未分组 = 顶层会话 + 父缺失的孤儿 subagent（与 flat 视图的顶层判定
				 * 一致：`!row.subagent || row.parentId === void 0 || !rowIndex.idSet.has(normId(row.parentId))`），
				 * 且不归属任何工作区；已归档的由上层过滤。M5: 修复前孤儿 subagent
				 * 在 workspace 视图下完全不可见。 */
				const ungrouped = filteredRows.filter((row) => !accounted.has(row.id) && (!row.subagent || row.parentId === void 0 || !rowIndex.idSet.has(normId(row.parentId))));
				// 未分组同样置顶当前会话
				ungrouped.sort((a, b) => {
					if (a.current !== b.current) return a.current ? -1 : 1;
					return (b.updatedAt ?? 0) - (a.updatedAt ?? 0);
				});
				const result = [...byWorkspace];
				if (ungrouped.length > 0) result.push({ key: "__ungrouped__", label: t("group.ungrouped"), rows: attachKids(ungrouped) });
				return result;
			}, [tab, viewMode, workspaceItems, filteredRows, expandedParents, t, rowIndex]);
			const rows = viewMode === "workspace" && tab === "all" ? groups.flatMap((group) => group.rows) : displayRows;
			/** H1: show "loading…" instead of a misleading empty state while the baseline is still arriving. */
			const loading = (listPhase === "pending" || workspacesState === "loading") && rows.length === 0;
			const selectableIds = (0, react.useMemo)(() => rows.filter((row) => !row.current).map((row) => row.id), [rows]);
			const [selected, setSelected] = (0, react.useState)(() => new Set());
			/** M4: 批量操作分批执行（每批 20 个、批间串行），避免全选上千会话时
			 * 上千并发 fetch 打爆浏览器连接池与 host 端请求队列。 */
			const BATCH_SIZE = 20;
			const runBatch = async (method, targets, extra) => {
				const results = [];
				for (let i = 0; i < targets.length; i += BATCH_SIZE) {
					const chunk = targets.slice(i, i + BATCH_SIZE);
					// 每批内部并行（host 端 mutation 已串行化，安全），批间 await
					const settled = await Promise.allSettled(chunk.map((id) => api(method, { sessionId: id, ...(extra ?? {}) })));
					results.push(...settled);
				}
				const okCount = results.filter((r) => r.status === "fulfilled").length;
				const failCount = results.length - okCount;
				if (failCount > 0) {
					const firstFail = results.find((r) => r.status === "rejected");
					const detail = firstFail && firstFail.reason instanceof Error ? firstFail.reason.message : "";
					throw new Error(t("batchResult").replace("{ok}", String(okCount)).replace("{fail}", String(failCount)) + (detail ? `：${detail}` : ""));
				}
				return okCount;
			};
			const [dragMode, setDragMode] = (0, react.useState)(null);
			const [deleting, setDeleting] = (0, react.useState)(false);
			const [error, setError] = (0, react.useState)(null);
			const [confirmOpen, setConfirmOpen] = (0, react.useState)(false);
			// 细粒度删除：详情面板里勾选的子代理 / 文件（默认都不勾选）
			const [deleteSubagentIds, setDeleteSubagentIds] = (0, react.useState)(() => new Set());
			const [deleteFilePaths, setDeleteFilePaths] = (0, react.useState)(() => new Set());
			const [allDeleteSubagentIds, setAllDeleteSubagentIds] = (0, react.useState)(() => new Set());
			const [allDeleteFilePaths, setAllDeleteFilePaths] = (0, react.useState)(() => new Set());
			const [allDeleteDirs, setAllDeleteDirs] = (0, react.useState)(() => new Set());
			// 浏览器端路径 dirname（client bundle 无 node path）
			const dirOf = (p) => {
				const idx = Math.max(p.lastIndexOf("\\"), p.lastIndexOf("/"));
				return idx > 0 ? p.slice(0, idx) : p;
			};
			const baseName = (p) => {
				const idx = Math.max(p.lastIndexOf("\\"), p.lastIndexOf("/"));
				return idx >= 0 ? p.slice(idx + 1) : p;
			};
			const [subagentDetailOpen, setSubagentDetailOpen] = (0, react.useState)(false);
			const [filesDetailOpen, setFilesDetailOpen] = (0, react.useState)(false);
			const [detailLoading, setDetailLoading] = (0, react.useState)(false);
			// 全选复选框半选态（部分勾选时显示 indeterminate）
			const subagentAllRef = (0, react.useRef)(null);
			const filesAllRef = (0, react.useRef)(null);
			(0, react.useEffect)(() => {
				if (subagentAllRef.current !== null) {
					subagentAllRef.current.indeterminate = deleteSubagentIds.size > 0 && deleteSubagentIds.size < allDeleteSubagentIds.size;
				}
			}, [deleteSubagentIds, allDeleteSubagentIds]);
			(0, react.useEffect)(() => {
				if (filesAllRef.current !== null) {
					filesAllRef.current.indeterminate = deleteFilePaths.size > 0 && deleteFilePaths.size < allDeleteFilePaths.size;
				}
			}, [deleteFilePaths, allDeleteFilePaths]);
			const [expandedId, setExpandedId] = (0, react.useState)(null);
			const [detailsCache, setDetailsCache] = (0, react.useState)(() => new Map());
			const [detailsBusyIds, setDetailsBusyIds] = (0, react.useState)(() => new Set());
			const [detailsError, setDetailsError] = (0, react.useState)(null);
			const [selectedFiles, setSelectedFiles] = (0, react.useState)(() => new Set());
			const [fileDeleting, setFileDeleting] = (0, react.useState)(false);
			// 详情面板：产出文件夹展开状态（key = 相对文件夹路径）
			const [expandedFileDirs, setExpandedFileDirs] = (0, react.useState)(() => new Set());
			// 详情面板：显示完整文件路径开关（默认关闭，只显示文件名）
			const [showFilePaths, setShowFilePaths] = (0, react.useState)(false);
			const switchTab = (0, react.useCallback)((next) => {
				setTab(next);
				setSelected(new Set());
				setExpandedId(null);
				setDetailsError(null);
				setSelectedFiles(new Set()); // m10: 切 tab 清文件选择残留
			}, []);
			(0, react.useEffect)(() => {
				if (dragMode === null) return;
				const end = () => setDragMode(null);
				// m13: 鼠标移出窗口释放（blur）或离开页面时兜底清理，防止 dragMode 卡住
				const onBlur = () => setDragMode(null);
				const onVisibility = () => { if (document.visibilityState === "hidden") setDragMode(null); };
				window.addEventListener("mouseup", end);
				window.addEventListener("blur", onBlur);
				document.addEventListener("visibilitychange", onVisibility);
				return () => {
					window.removeEventListener("mouseup", end);
					window.removeEventListener("blur", onBlur);
					document.removeEventListener("visibilitychange", onVisibility);
				};
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
			/** m12: 键盘选择——行聚焦时 Enter/Space 切换选择（跳过按钮/输入框等交互元素）。 */
			const onRowKeyDown = (0, react.useCallback)((id, event) => {
				const target = event.target;
				if (target !== null && typeof target === "object" && (target.tagName === "BUTTON" || target.tagName === "INPUT")) return;
				if (event.key !== "Enter" && event.key !== " ") return;
				event.preventDefault();
				const mode = !selected.has(id);
				applyRow(id, mode);
			}, [selected, applyRow]);
			/** Id of the most recently requested detail row; stale responses are dropped (M7 race guard). */
			const latestDetailsRequest = (0, react.useRef)(null);
			const toggleDetails = (0, react.useCallback)((row) => {
				if (expandedId === row.id) {
					setExpandedId(null);
					return;
				}
				setExpandedId(row.id);
				// 切换展开行时清空文件选择，避免把上一行的选中文件带过来误删
				setSelectedFiles(new Set());
				setDetailsError(null);
				if (detailsCache.has(row.id)) {
					// LRU touch：把命中的条目移到最近使用位置
					setDetailsCache((prev) => {
						if (!prev.has(row.id)) return prev;
						const next = new Map(prev);
						const value = next.get(row.id);
						next.delete(row.id);
						next.set(row.id, value);
						return next;
					});
					return;
				}
				const targetId = row.id;
				latestDetailsRequest.current = targetId;
				setDetailsBusyIds((prev) => new Set(prev).add(targetId));
				api("details", { sessionId: targetId }).then((value) => {
					if (latestDetailsRequest.current !== targetId) return; // 过期响应丢弃，不写缓存不报错
					setDetailsCache((prev) => {
						const next = new Map(prev);
						next.delete(targetId);
						next.set(targetId, value);
						// LRU 上限：淘汰最旧条目（Map 按插入序迭代）
						while (next.size > DETAILS_CACHE_LIMIT) {
							const oldest = next.keys().next().value;
							if (oldest === void 0 || oldest === targetId) break;
							next.delete(oldest);
						}
						return next;
					});
				}).catch((reason) => {
					if (latestDetailsRequest.current !== targetId) return;
					setDetailsError(reason instanceof Error ? reason.message : String(reason));
				}).finally(() => {
					setDetailsBusyIds((prev) => {
						const next = new Set(prev);
						next.delete(targetId);
						return next;
					});
				});
			}, [expandedId, detailsCache]);
			const selectedCount = selectableIds.filter((id) => selected.has(id)).length;
			const allSelected = selectableIds.length > 0 && selectableIds.every((id) => selected.has(id));
			const toggleAll = () => {
				setSelected(allSelected ? new Set() : new Set(selectableIds));
			};
			/** 打开删除确认：收集选中会话的所有后代子代理（含孙级，来自 byId 树）
			 * 与全部下载/产出文件（逐个拉详情），供详情面板细粒度勾选。默认都不勾选。 */
			const openDeleteConfirm = async () => {
				setConfirmOpen(true);
				setSubagentDetailOpen(false);
				setFilesDetailOpen(false);
				const targets = selectableIds.filter((id) => selected.has(id));
				// 子代理树（递归）——比较双方都经 normId：byId 的 key 与 parentId
				// 可能一个带 session- 前缀一个是纯 uuid，单向比较会漏掉子代理
				const kids = new Set();
				const findKids = (id) => {
					const target = normId(id);
					for (const [sid, s] of Object.entries(byId)) {
						if (s.origin === "subagent" && normId(s.parentId) === target && !kids.has(sid)) {
							kids.add(sid);
							findKids(sid);
						}
					}
				};
				for (const id of targets) findKids(id);
				const kidsSet = new Set(kids);
				setAllDeleteSubagentIds(kidsSet);
				setDeleteSubagentIds(new Set());
				// 文件列表：选中会话 + 全部后代子代理（详情面板里勾选子代理后，
				// 其产出文件也应出现在可勾选列表中）
				setDetailLoading(true);
				try {
					const files = new Set();
					const fileTargets = [...targets, ...kidsSet];
					for (const id of fileTargets) {
						try {
							const d = await api("details", { sessionId: id });
							for (const f of d?.files ?? []) files.add(f.path);
						} catch {
							// 单个会话详情失败不影响其他
						}
					}
					const filesSet = new Set(files);
					setAllDeleteFilePaths(filesSet);
					setDeleteFilePaths(new Set());
					// 推导产出文件夹（文件的直接父目录去重）——文件夹也能勾选删除。
					// 安全规则：工作区根目录绝不作为可删文件夹（AI 直接在工作区根下
					// 生成的文件只删文件本身）；只有工作区根以下的子文件夹才可整删。
					const wsRoots = new Set((workspaceItems ?? []).map((ws) => ws.path).map((p) => (typeof p === "string" ? p.replace(/[\\/]+$/, "") : "")));
					const dirs = new Set();
					for (const fp of filesSet) {
						const d = dirOf(fp);
						if (d === "" || d === fp || d.endsWith(":")) continue;
						const dNorm = d.replace(/[\\/]+$/, "");
						if (wsRoots.has(dNorm) || wsRoots.size === 0) continue;
						dirs.add(d);
					}
					setAllDeleteDirs(dirs);
				} finally {
					setDetailLoading(false);
				}
			};
			const confirmDelete = async () => {
				if (deleting || selectedCount === 0) return;
				const targets = selectableIds.filter((id) => selected.has(id));
				setDeleting(true);
				setError(null);
				try {
					await runBatch("delete", targets, { subagentIds: [...deleteSubagentIds], filePaths: [...deleteFilePaths] });
					setSelected(new Set());
					setConfirmOpen(false);
					// s3: 清理被删会话的详情缓存，避免残留过期数据
					setDetailsCache((prev) => {
						const next = new Map(prev);
						for (const id of targets) next.delete(id);
						return next;
					});
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
					await runBatch("archive", targets);
					setSelected(new Set());
					setArchiveConfirmOpen(false);
					// s3: 归档后详情缓存同样失效（列表归属已变）
					setDetailsCache((prev) => {
						const next = new Map(prev);
						for (const id of targets) next.delete(id);
						return next;
					});
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
					await runBatch("unarchive", targets);
					setSelected(new Set());
					// s3: 移出归档后同样失效缓存
					setDetailsCache((prev) => {
						const next = new Map(prev);
						for (const id of targets) next.delete(id);
						return next;
					});
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
				setSelectedFiles(new Set()); // m10: 切视图清文件选择残留
			}, []);
			const toggleFile = (path) => {
				setSelectedFiles((prev) => {
					const next = new Set(prev);
					if (next.has(path)) next.delete(path);
					else next.add(path);
					return next;
				});
			};
			// 文件夹勾选：全选/取消文件夹内所有文件
			const toggleFolderFiles = (flist) => {
				setSelectedFiles((prev) => {
					const next = new Set(prev);
					const paths = flist.map((f) => f.path);
					const allSelected = paths.every((p) => next.has(p));
					for (const p of paths) {
						if (allSelected) next.delete(p);
						else next.add(p);
					}
					return next;
				});
			};
			// m9: 文件删除带确认弹窗（与会话删除一致），避免误点永久删除产出文件
			const [fileConfirmOpen, setFileConfirmOpen] = (0, react.useState)(false);
			const [pendingFileDeleteRow, setPendingFileDeleteRow] = (0, react.useState)(null);
			// 删除文件成功提示（3 秒后自动消失）
			const [fileNotice, setFileNotice] = (0, react.useState)(null);
			const noticeTimer = (0, react.useRef)(null);
			const flashFileNotice = (text) => {
				if (noticeTimer.current !== null) window.clearTimeout(noticeTimer.current);
				setFileNotice(text);
				noticeTimer.current = window.setTimeout(() => {
					setFileNotice(null);
					noticeTimer.current = null;
				}, 3000);
			};
			const requestFileDelete = (row) => {
				setPendingFileDeleteRow(row);
				setFileConfirmOpen(true);
			};
			const doDeleteSelectedFiles = async () => {
				const row = pendingFileDeleteRow;
				setFileConfirmOpen(false);
				setPendingFileDeleteRow(null);
				if (row === null || row === void 0) return;
				// 只删除当前展开行详情里列出的文件，防止误删其它行残留的选中项
				const current = detailsCache.get(row.id);
				const known = new Set((current?.files ?? []).map((file) => file.path));
				const targets = [...selectedFiles].filter((path) => known.has(path));
				if (targets.length === 0 || fileDeleting) return;
				setFileDeleting(true);
				setError(null);
				try {
					// m9: 并行删除 + 汇总失败（不再因单个失败中断全部）；M6: 传 sessionId
					// 让 host 端校验 path 确属该会话产出文件
					const results = await Promise.allSettled(targets.map((path) => api("delete-file", { path, sessionId: row.id })));
					const failed = results.filter((r) => r.status === "rejected");
					if (failed.length > 0) {
						const detail = failed[0].reason instanceof Error ? failed[0].reason.message : "";
						throw new Error(t("batchResult").replace("{ok}", String(targets.length - failed.length)).replace("{fail}", String(failed.length)) + (detail ? `：${detail}` : ""));
					}
					setSelectedFiles(new Set());
					const value = await api("details", { sessionId: row.id });
					// host 端 files 列表来自会话事件记录（write/edit 的 file_path），
					// 删除物理文件后记录仍在——本地剔除已删路径，避免"文件已删但列表还在"
					const removed = new Set(targets);
					const nextValue = {
						...value,
						files: (value.files ?? []).filter((file) => !removed.has(file.path))
					};
					setDetailsCache((prev) => {
						const next = new Map(prev);
						next.set(row.id, nextValue);
						return next;
					});
					flashFileNotice(t("fileDeleteDone").replace("{n}", String(targets.length)));
				} catch (reason) {
					setError(reason instanceof Error ? reason.message : String(reason));
				} finally {
					setFileDeleting(false);
				}
			};
			const renderDetails = (row, data) => {
				const loading = data === void 0 && detailsBusyIds.has(row.id);
				const failed = data === void 0 && detailsError !== null;
				const subagents = data?.lineage?.subagents ?? [];
				// s4: 客户端再截断一道（与服务端 MAX_FILES=200 对齐，双保险）
				const files = (data?.files ?? []).slice(0, 200);
				const stats = data?.stats;
				const toolNames = stats && typeof stats.toolCounts === "object" && stats.toolCounts !== null ? Object.keys(stats.toolCounts) : [];
				const fetchList = stats?.fetches ?? [];
				const fileSelectedCount = files.filter((file) => selectedFiles.has(file.path)).length;
				const statRows = stats === void 0 ? [] : [
					[ t("turns"), stats.turns ],
					[ t("steps"), stats.steps ],
					[ t("userMessages"), stats.userMessages ],
					[ t("assistantMessages"), stats.assistantMessages ],
					[ t("toolCalls"), stats.toolCalls ],
					[ t("attachments"), stats.attachments ]
				];
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
								statRows.length > 0 && (0, react_jsx_runtime.jsx)("div", {
									className: pcss.detailSection,
									children: t("activity")
								}),
								statRows.length > 0 && (0, react_jsx_runtime.jsxs)("div", {
									className: pcss.detailGrid,
									children: statRows.map(([label, value]) => (0, react_jsx_runtime.jsxs)("div", { className: pcss.detailItem, children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.detailLabel, children: label }), (0, react_jsx_runtime.jsx)("span", { children: value })] }, label))
								}),
								toolNames.length > 0 && (0, react_jsx_runtime.jsx)("div", {
									className: pcss.detailSection,
									children: t("tools")
								}),
								toolNames.length > 0 && (0, react_jsx_runtime.jsx)("div", {
									className: pcss.chips,
									children: toolNames.slice(0, 12).map((name) => (0, react_jsx_runtime.jsxs)("span", { className: pcss.chip, children: [`${name} ×${stats.toolCounts[name]}`] }, name))
								}),
								(0, react_jsx_runtime.jsx)("div", { className: pcss.detailSection, children: t("fetches") }),
								fetchList.length === 0 ? (0, react_jsx_runtime.jsx)("div", { className: pcss.hint, children: t("noFetches") }) : (0, react_jsx_runtime.jsx)("div", {
									className: pcss.fetchList,
									children: fetchList.map((fetch) => (0, react_jsx_runtime.jsxs)("div", {
										className: pcss.fetchRow,
										children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.fetchTool, children: fetch.tool }), fetch.query !== void 0 && (0, react_jsx_runtime.jsx)("span", { className: pcss.fetchQuery, title: fetch.query, children: fetch.query })]
									}, `${fetch.tool}:${fetch.query ?? ""}`))
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									style: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
									children: [(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 12, fontWeight: 500, color: "var(--dsw-alias-label-secondary)", lineHeight: "18px" }, children: t("files") }), (0, react_jsx_runtime.jsxs)("label", {
										style: { display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--dsw-alias-label-tertiary)", cursor: "pointer", lineHeight: "18px", marginTop: 2 },
										children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: showFilePaths, onChange: (e) => setShowFilePaths(e.target.checked), style: { cursor: "pointer", margin: 0 } }), "显示路径"]
									})]
								}),
								files.length === 0 ? (0, react_jsx_runtime.jsx)("div", { className: pcss.hint, children: t("noFiles") }) : (() => {
									// 文件分组：工作区根下的直接文件平铺；子文件夹里的文件归入文件夹节点
									// （文件夹可展开查看内部文件）；文件/文件夹多时整体滚动显示
									const wsRoots = (workspaceItems ?? []).map((ws) => ws.path).filter((p) => typeof p === "string").map((p) => p.replace(/[\\/]+$/, ""));
									const groups = new Map();
									const groupFullDirs = new Map();
									const directFiles = [];
									for (const file of files) {
										let root = "";
										for (const r of wsRoots) {
											if (file.path.startsWith(r + "\\") || file.path.startsWith(r + "/")) {
												root = r;
												break;
											}
										}
										if (root === "") {
											// 匹配不到工作区根（文件在注册工作区之外）：兜底显示文件名，
											// 绝不直接显示完整路径
											directFiles.push({ ...file, relName: baseName(file.path) });
											continue;
										}
										const rel = file.path.slice(root.length + 1);
										const sepIdx = Math.max(rel.lastIndexOf("\\"), rel.lastIndexOf("/"));
										if (sepIdx > 0) {
											const folder = rel.slice(0, sepIdx);
											// 记录文件夹完整路径（显示路径开关开启时与文件一致显示完整路径）
											const list = groups.get(folder) ?? [];
											list.push({ ...file, relName: rel.slice(sepIdx + 1) });
											groups.set(folder, list);
											groupFullDirs.set(folder, root + sep + folder);
										} else {
											directFiles.push({ ...file, relName: rel });
										}
									}
									return (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
										children: [
											(0, react_jsx_runtime.jsx)("div", {
												style: { maxHeight: 240, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 },
												children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [[...groups.entries()].map(([folder, flist]) => (0, react_jsx_runtime.jsxs)("div", {
													key: folder,
													style: { display: "contents" },
													children: [
														(0, react_jsx_runtime.jsxs)("label", {
															// 与文件行完全同款：label.selectAll（同高同样式，杜绝间距差异）
															className: pcss.selectAll,
															children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: flist.every((f) => selectedFiles.has(f.path)), onChange: () => toggleFolderFiles(flist), title: t("selectAll") }), (0, react_jsx_runtime.jsx)("button", {
																type: "button",
																"aria-expanded": expandedFileDirs.has(folder),
																"aria-label": expandedFileDirs.has(folder) ? t("subagentCollapse") : t("subagentExpand"),
																style: { border: "none", background: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", flex: "none" },
																onClick: (e) => { e.stopPropagation(); setExpandedFileDirs((prev) => { const next = new Set(prev); if (next.has(folder)) next.delete(folder); else next.add(folder); return next; }); },
																children: (0, react_jsx_runtime.jsx)("span", { style: { display: "inline-flex", transform: expandedFileDirs.has(folder) ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }, children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFill14, {}) })
															}), (0, react_jsx_runtime.jsx)("span", { className: pcss.title, title: showFilePaths ? (groupFullDirs.get(folder) ?? folder) : baseName(folder), style: showFilePaths ? { whiteSpace: "normal", wordBreak: "break-all", textOverflow: "clip" } : void 0, children: `📁 ${showFilePaths ? (groupFullDirs.get(folder) ?? folder) : baseName(folder)}（${flist.length}）` })]
														}),
														expandedFileDirs.has(folder) && (0, react_jsx_runtime.jsx)("div", {
															style: { display: "flex", flexDirection: "column", gap: 2, paddingLeft: 24 },
															children: flist.map((f) => (0, react_jsx_runtime.jsxs)("label", {
																className: pcss.selectAll,
																children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: selectedFiles.has(f.path), onChange: () => toggleFile(f.path) }), (0, react_jsx_runtime.jsx)("span", { className: pcss.title, title: f.path, style: showFilePaths ? { whiteSpace: "normal", wordBreak: "break-all", textOverflow: "clip" } : void 0, children: showFilePaths ? f.path : f.relName })]
															}, f.path))
														})
													]
												})), directFiles.map((f) => (0, react_jsx_runtime.jsxs)("label", {
													className: pcss.selectAll,
													children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: selectedFiles.has(f.path), onChange: () => toggleFile(f.path) }), (0, react_jsx_runtime.jsx)("span", { className: pcss.title, title: f.path, style: showFilePaths ? { whiteSpace: "normal", wordBreak: "break-all", textOverflow: "clip" } : void 0, children: showFilePaths ? f.path : (f.relName ?? f.path) })]
												}, f.path))] })
											}),
											(0, react_jsx_runtime.jsx)("div", {
												className: pcss.fileFooter,
												children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
													variant: "outline",
													disabled: fileSelectedCount === 0 || fileDeleting,
													onClick: () => requestFileDelete(row), // m9: 先弹确认再删除
													children: fileDeleting ? t("fileDeleting") : `${t("fileDelete")}（${fileSelectedCount}）`
												})
											})
										]
									});
								})(),
								(0, react_jsx_runtime.jsx)("div", { className: pcss.detailSection, children: t("lineage") }),
								// 关联对话区只显示子代理个数（父会话/分叉会话不在详情里列出）
								(0, react_jsx_runtime.jsxs)("div", { className: pcss.lineageRow, children: [(0, react_jsx_runtime.jsx)("span", { className: pcss.detailLabel, children: t("subagent") }), (0, react_jsx_runtime.jsx)("span", { children: `（${subagents.length}）` })] })
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
						children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
							children: [
								(0, react_jsx_runtime.jsx)("input", {
									type: "search",
									className: pcss.search,
									value: searchQuery,
									placeholder: t("searchPlaceholder"),
									onChange: (e) => setSearchQuery(e.target.value)
								}),
								(0, react_jsx_runtime.jsxs)("div", {
									className: pcss.viewSwitch,
									role: "group",
									children: [
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: `${pcss.viewSwitchItem}${viewMode === "workspace" ? ` ${pcss.viewSwitchItemActive}` : ""}`,
									"aria-pressed": viewMode === "workspace",
									onClick: () => switchViewMode("workspace"),
									children: t("view.workspace")
								}),
								(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: `${pcss.viewSwitchItem}${viewMode === "flat" ? ` ${pcss.viewSwitchItemActive}` : ""}`,
									"aria-pressed": viewMode === "flat",
									onClick: () => switchViewMode("flat"),
									children: t("view.flat")
								})
							]
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
								onClick: () => void openDeleteConfirm(),
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
					fileNotice !== null && (0, react_jsx_runtime.jsx)("div", { className: pcss.notice, role: "status", children: fileNotice }),
					workspaceError !== null && workspaceError !== void 0 && (0, react_jsx_runtime.jsx)("div", {
						className: pcss.error,
						role: "alert",
						children: [String(workspaceError.message ?? workspaceError), " ", (0, react_jsx_runtime.jsx)("button", {
							key: "retry",
							type: "button",
							onClick: () => void refresh(),
							children: t("retry")
						})]
					}),
					rows.length === 0 ? (0, react_jsx_runtime.jsx)("div", { className: pcss.empty, children: loading ? t("loading") : t(tab === "all" ? "emptyAll" : "emptyArchived") }) : (viewMode === "workspace" && tab === "all" ? (0, react_jsx_runtime.jsx)("div", {
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
											(0, react_jsx_runtime.jsx)(SessionRow, {
												row,
												isSelected,
												isExpanded,
												hasKids: (subagentCounts.get(normId(row.id)) ?? 0) > 0,
												kidsOpen: expandedParents.has(row.id),
												depth: depthOf.get(row.id) ?? 1,
												timeText: row.updatedAt !== void 0 && Number.isFinite(row.updatedAt) ? timeLabel(row.updatedAt, now, t) : void 0,
												showSubagentBadge: row.subagent,
												currentText: t("current"),
												currentHintText: t("currentHint"),
												subagentText: t("subagent"),
												detailsLabel: t("details"),
												subagentExpandLabel: t("subagentExpand"),
												subagentCollapseLabel: t("subagentCollapse"),
												onKeyDown: onRowKeyDown,
												onMouseDown: onRowMouseDown,
												onMouseEnter: onRowMouseEnter,
												onToggleKids: toggleSubagents,
												onToggleDetails: toggleDetails
											}),
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
									(0, react_jsx_runtime.jsx)(SessionRow, {
										row,
										isSelected,
										isExpanded,
										hasKids: (subagentCounts.get(normId(row.id)) ?? 0) > 0,
										kidsOpen: expandedParents.has(row.id),
										depth: depthOf.get(row.id) ?? 1,
										timeText: row.updatedAt !== void 0 && Number.isFinite(row.updatedAt) ? timeLabel(row.updatedAt, now, t) : void 0,
										showSubagentBadge: row.subagent,
										currentText: t("current"),
										currentHintText: t("currentHint"),
										subagentText: t("subagent"),
										detailsLabel: t("details"),
										subagentExpandLabel: t("subagentExpand"),
										subagentCollapseLabel: t("subagentCollapse"),
										onKeyDown: onRowKeyDown,
										onMouseDown: onRowMouseDown,
										onMouseEnter: onRowMouseEnter,
										onToggleKids: toggleSubagents,
										onToggleDetails: toggleDetails
									}),
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
						children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
							children: [(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-tertiary)", marginTop: -8 }, children: t("confirmNote") }), (0, react_jsx_runtime.jsxs)("div", {
								style: { display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-start", paddingTop: 8 },
								children: [(0, react_jsx_runtime.jsxs)("label", {
									style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--dsw-alias-label-secondary)", cursor: "pointer" },
									children: [(0, react_jsx_runtime.jsx)("input", { ref: subagentAllRef, type: "checkbox", checked: deleteSubagentIds.size > 0, disabled: deleting, onChange: (e) => setDeleteSubagentIds(e.target.checked ? new Set(allDeleteSubagentIds) : new Set()) }), t("deleteCascade"), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": t("deleteDetail"),
										title: t("deleteDetail"),
										style: { border: "none", background: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", color: "var(--dsw-alias-label-tertiary)", transform: subagentDetailOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s ease" },
										onClick: () => setSubagentDetailOpen((v) => !v),
										children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFill14, {})
									})]
								}), subagentDetailOpen && (() => {
									// 只显示子代理（选中会话之外的代理）：所有后代（含孙级）都列出
									const kidIds = [...allDeleteSubagentIds];
									const rows = [];
									if (kidIds.length === 0) {
										rows.push((0, react_jsx_runtime.jsx)("div", { key: "__none__", style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)" }, children: t("deleteDetailNone") }));
									} else {
										for (const sid of kidIds) {
											rows.push((0, react_jsx_runtime.jsxs)("label", {
												key: sid,
												style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--dsw-alias-label-secondary)", cursor: "pointer", wordBreak: "break-all" },
												children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: deleteSubagentIds.has(sid), disabled: deleting, onChange: (e) => setDeleteSubagentIds((prev) => { const next = new Set(prev); if (e.target.checked) next.add(sid); else next.delete(sid); return next; }) }), byId[sid]?.title ?? shortId(sid)]
											}));
										}
									}
									return (0, react_jsx_runtime.jsxs)("div", {
										style: { width: "100%", display: "flex", flexDirection: "column", gap: 4, paddingLeft: 8, borderLeft: "2px solid var(--dsw-alias-border-l2)" },
										children: [(0, react_jsx_runtime.jsxs)("div", {
											style: { display: "flex", alignItems: "center", gap: 6, marginTop: 2 },
											children: [(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-primary)", fontWeight: 500 }, children: t("deleteDetailSubagents") }), kidIds.length > 0 && (0, react_jsx_runtime.jsx)("span", { style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)" }, children: `（${kidIds.length}）` })]
										}), (0, react_jsx_runtime.jsx)("div", {
											style: { maxHeight: 240, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 },
											children: rows
										})]
									});
								})(), (0, react_jsx_runtime.jsxs)("label", {
									style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--dsw-alias-label-secondary)", cursor: "pointer" },
									children: [(0, react_jsx_runtime.jsx)("input", { ref: filesAllRef, type: "checkbox", checked: deleteFilePaths.size > 0, disabled: deleting, onChange: (e) => setDeleteFilePaths(e.target.checked ? new Set([...allDeleteFilePaths, ...allDeleteDirs]) : new Set()) }), t("deleteFiles"), (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": t("deleteDetail"),
										title: t("deleteDetail"),
										style: { border: "none", background: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", color: "var(--dsw-alias-label-tertiary)", transform: filesDetailOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s ease" },
										onClick: () => setFilesDetailOpen((v) => !v),
										children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFill14, {})
									})]
								}), filesDetailOpen && (0, react_jsx_runtime.jsxs)("div", {
									style: { width: "100%", display: "flex", flexDirection: "column", gap: 4, paddingLeft: 8, borderLeft: "2px solid var(--dsw-alias-border-l2)" },
									children: [(0, react_jsx_runtime.jsxs)("div", {
										style: { display: "flex", alignItems: "center", gap: 10, marginTop: 2 },
										children: [(0, react_jsx_runtime.jsx)("div", { style: { fontSize: 12, color: "var(--dsw-alias-label-primary)", fontWeight: 500, lineHeight: "18px" }, children: t("deleteDetailFiles") }), (0, react_jsx_runtime.jsxs)("label", {
											style: { display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--dsw-alias-label-tertiary)", cursor: "pointer", lineHeight: "18px", marginTop: 2 },
											children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: showFilePaths, onChange: (e) => setShowFilePaths(e.target.checked), style: { cursor: "pointer", margin: 0 } }), "显示路径"]
										})]
									}), (0, react_jsx_runtime.jsx)("div", { style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)", marginBottom: 2 }, children: t("deleteDetailFilesNote") }), [...allDeleteDirs].length === 0 && [...allDeleteFilePaths].length === 0 ? (0, react_jsx_runtime.jsx)("div", { style: { fontSize: 11, color: "var(--dsw-alias-label-tertiary)" }, children: detailLoading ? t("loading") : t("deleteDetailNone") }) : (() => {
										// 树形分组：文件归入其父目录（文件夹节点可展开查看内部文件）
										const fileGroups = new Map();
										const directFiles = [];
										for (const fp of [...allDeleteFilePaths]) {
											const parent = dirOf(fp);
											if (allDeleteDirs.has(parent)) {
												const list = fileGroups.get(parent) ?? [];
												list.push(fp);
												fileGroups.set(parent, list);
											} else {
												directFiles.push(fp);
											}
										}
										return (0, react_jsx_runtime.jsx)("div", {
											style: { maxHeight: 240, minHeight: 0, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 },
											children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [[...allDeleteDirs].map((dir) => (0, react_jsx_runtime.jsxs)("div", {
												key: dir,
												style: { display: "contents" },
												children: [
													(0, react_jsx_runtime.jsxs)("label", {
														// 与文件行完全同款：label.selectAll
														className: pcss.selectAll,
														children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: deleteFilePaths.has(dir), disabled: deleting, onChange: (e) => setDeleteFilePaths((prev) => { const next = new Set(prev); if (e.target.checked) next.add(dir); else next.delete(dir); return next; }) }), (0, react_jsx_runtime.jsx)("button", {
															type: "button",
															"aria-expanded": expandedFileDirs.has(dir),
															"aria-label": expandedFileDirs.has(dir) ? t("subagentCollapse") : t("subagentExpand"),
															style: { border: "none", background: "none", padding: 0, cursor: "pointer", display: "inline-flex", alignItems: "center", flex: "none" },
															onClick: (e) => { e.stopPropagation(); setExpandedFileDirs((prev) => { const next = new Set(prev); if (next.has(dir)) next.delete(dir); else next.add(dir); return next; }); },
															children: (0, react_jsx_runtime.jsx)("span", { style: { display: "inline-flex", transform: expandedFileDirs.has(dir) ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s ease" }, children: (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconTriangleRightFill14, {}) })
														}), (0, react_jsx_runtime.jsx)("span", { className: pcss.title, title: showFilePaths ? dir : baseName(dir), style: showFilePaths ? { whiteSpace: "normal", wordBreak: "break-all", textOverflow: "clip" } : void 0, children: `📁 ${showFilePaths ? dir : baseName(dir)}（${fileGroups.get(dir)?.length ?? 0}）` })]
													}),
													expandedFileDirs.has(dir) && (0, react_jsx_runtime.jsx)("div", {
														style: { display: "flex", flexDirection: "column", gap: 2, paddingLeft: 22 },
														children: (fileGroups.get(dir) ?? []).map((fp) => (0, react_jsx_runtime.jsxs)("label", {
															key: fp,
															style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--dsw-alias-label-secondary)", cursor: "pointer", wordBreak: "break-all" },
															children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: deleteFilePaths.has(fp), disabled: deleting, onChange: (e) => setDeleteFilePaths((prev) => { const next = new Set(prev); if (e.target.checked) next.add(fp); else next.delete(fp); return next; }) }), showFilePaths ? fp : baseName(fp)]
														}))
													})
												]
											})), directFiles.map((fp) => (0, react_jsx_runtime.jsxs)("label", {
												key: fp,
												style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--dsw-alias-label-secondary)", cursor: "pointer", wordBreak: "break-all" },
												children: [(0, react_jsx_runtime.jsx)("input", { type: "checkbox", checked: deleteFilePaths.has(fp), disabled: deleting, onChange: (e) => setDeleteFilePaths((prev) => { const next = new Set(prev); if (e.target.checked) next.add(fp); else next.delete(fp); return next; }) }), showFilePaths ? fp : baseName(fp)]
											}))] })
										});
									})()]
								})]
							})]
						}),
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
					}),
					// m9: 文件删除确认弹窗
					(0, react_jsx_runtime.jsxs)(_deepseek_ai_dsh_client_ui_primitives.Modal, {
						open: fileConfirmOpen,
						onClose: () => { if (!fileDeleting) setFileConfirmOpen(false); },
						closeLabel: t("close"),
						title: t("fileDelete"),
						description: t("fileDeleteConfirm").replace("{n}", String(pendingFileDeleteRow !== null && pendingFileDeleteRow !== void 0 ? [...selectedFiles].filter((path) => (detailsCache.get(pendingFileDeleteRow.id)?.files ?? []).some((file) => file.path === path)).length : 0)),
						footer: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [(0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: fileDeleting,
							onClick: () => setFileConfirmOpen(false),
							children: t("cancel")
						}), (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Button, {
							variant: "outline",
							disabled: fileDeleting,
							onClick: () => void doDeleteSelectedFiles(),
							children: fileDeleting ? t("fileDeleting") : t("fileDelete")
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
