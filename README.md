# dsh-archived-sessions

A DSH web plugin: a **Session Manager** in Settings — manage every conversation on this machine in one place.

一个 DSH Web 插件：在「设置」中提供**会话管理**，统一管理本机上的所有对话。

## Features（功能）

### English

- **Two tabs**: **All conversations** (non-archived) and **Archived**
- **View modes**: **flat list** or **grouped by workspace** (sessions without a workspace fall back to "Ungrouped")
- Browse conversations by title + relative time, newest first
- Checkbox / drag-to-select / select-all / batch **archive** (records kept) / batch **delete** (permanent, with a confirmation modal)
- **Unarchive** from the Archived tab (move back to All conversations)
- **Open record folder** button: opens the selected session's record directory in your OS file manager — cross-platform via `explorer` / `open` / `xdg-open`
- Expand each row for details (collapsed by default): size on disk, last update, produced/downloaded files, parent and child (fork) sessions
- **Subagent sessions** are shown nested under their parent conversation (indented, with a "subagent" badge); when the parent is deleted or missing they surface as top-level rows
- **Deleting a parent session does NOT cascade**: subagent children, forks, and downloaded/produced files are kept unless you explicitly select them — nothing is lost accidentally
- The currently open session shows a **Current** badge and **cannot be deleted**

### 中文

- **双标签页**：**所有对话**（未归档）与**归档会话**
- **视图切换**：**单列表**或**按工作区分组**（无工作区归属的会话兜底归入「未分组」）
- 按标题 + 相对时间浏览对话，最近的排在最前
- 勾选 / 拖动批量勾选 / 全选 / 批量**归档**（记录保留）/ 批量**删除**（永久删除，带确认弹窗）
- 归档页支持**移出归档**（回到所有对话）
- **打开记录文件夹**按钮：在系统文件管理器中打开所选会话的记录目录，跨平台（`explorer` / `open` / `xdg-open`）
- 每行可展开详情（默认收起）：占用空间、最后更新、产出/下载文件、父会话与子会话（分叉）
- **子代理会话**嵌套显示在父会话下方（缩进 + 「子代理」徽标）；父会话被删除或缺失时自动浮出为顶层行
- **删除父会话不会级联**：子代理、分叉、下载/产出文件均保留，除非你显式勾选它们——避免误删
- 当前打开的会话显示「当前会话」徽标，且**不可删除**

## Install

### Via npm registry

```sh
dsh plugin --profile web add dsh-archived-sessions@<version>
```

### Directly from GitHub

```sh
dsh plugin --profile web add github:Zephyr-vibe/dsh-archived-sessions
```

安装后重启 web 端，即可在「设置」中看到「会话管理」入口。

After installing, restart the web app — the Session Manager appears in Settings automatically.

## Compatibility（兼容性 / 零配置）

Zero configuration — no setup and no core patches required. The plugin works out of the box on a stock Harness.

零配置：无需任何设置，纯净 Harness 开箱即用。

- **Zero config**: session record directories are derived automatically from the official DSH layout (`$DSH_HOME/sessions/<project-key>/<session-id>/`), so the plugin works on an unmodified Harness — no core patches required.
- **Archive / unarchive**: works on stock Harness, using the same registry state primitives the official `archiveSession` is built on.
- **Delete**: the plugin detaches workspace accounting, removes the archive-set entry, and deletes the session directory via its physical location. On Harness builds that already provide `workspaceRegistry.deleteSession` / `sessionPersistence.remove`, it uses those instead. Deletion is deliberately **non-cascading**: subagents, forks, and files are untouched unless explicitly selected. Live running sessions are rejected with a friendly message (409); open-but-idle sessions on a stock Harness ask you to switch away or restart first (same limitation as the official sidebar delete, since there is no public "dispose agent" API).
- **Open record folder**: opens the directory with the OS file manager (`explorer` / `open` / `xdg-open`), cross-platform.
- Only official public APIs are used (`workspaceRegistry`, `sessionPersistence`, the `agents`/`sessions` services, and its own fenced HTTP routes) — no modification of DSH core files.

## Changelog（更新日志）

### 0.1.1

- Subagent sessions are now **collapsed by default** and expand on click (expand/collapse arrow on the parent row)
- Subagents follow their parent into the correct **workspace group** (no longer dumped into "Ungrouped")
- Deleting a parent session is now **non-cascading**: subagents, forks, and files are kept unless explicitly selected
- Open-record-folder button; batch archive / unarchive / delete with confirmation; current-session protection
- **Zero config** on stock Harness — official APIs only, no core patches

### 0.1.0

- Initial release: two tabs (All conversations / Archived), flat / by-workspace views, batch archive & delete, detail expansion, subagent nesting

## License

MIT — © 2026 Zephyr-vibe
