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

## Install（安装）

### 方式一：直接 tarball 安装

Option 1: Direct tarball install.

```sh
dsh plugin --profile web add https://codeload.github.com/Zephyr-vibe/dsh-archived-sessions/tar.gz/refs/heads/main
```

如果 pnpm 拦截构建脚本，在命令末尾加 `--ignore-scripts`：

If pnpm blocks build scripts, append `--ignore-scripts`:

```sh
dsh plugin --profile web add https://codeload.github.com/Zephyr-vibe/dsh-archived-sessions/tar.gz/refs/heads/main --ignore-scripts
```

### 方式二：让 agent 安装

Option 2: Let an agent install it — tell your DSH agent:

```text
帮我把这个项目安装为插件：https://github.com/Zephyr-vibe/dsh-archived-sessions
```

The agent downloads the repo, places it into the profile's `node_modules`, and registers it in `dsh.profile.bundles`.

agent 会下载项目、放入 profile 的 `node_modules` 并注册到 `dsh.profile.bundles`。

安装后重启 web 端，即可在「设置」中看到「会话管理」入口。

After installing, restart the web app — the Session Manager appears in Settings automatically.

## Compatibility（兼容性 / 零配置）

Zero configuration — no setup and no core patches required. The plugin works out of the box on a stock Harness.

零配置：无需任何设置，纯净 Harness 开箱即用。

- **Zero config**: session record directories are derived automatically from the official DSH layout (`$DSH_HOME/sessions/<project-key>/<session-id>/`), so the plugin works on an unmodified Harness — no core patches required.
- **Archive / unarchive**: works on stock Harness, using the same registry state primitives the official `archiveSession` is built on.
- **Delete**: the plugin detaches workspace accounting, removes the archive-set entry, and deletes the session directory via its physical location (resolved from `sessionPersistence.locate`, fence-checked to stay inside the sessions root). Deletion is deliberately **non-cascading**: subagents, forks, and files are untouched unless explicitly selected. Live running sessions are rejected with a friendly message (409); open-but-idle sessions on a stock Harness ask you to switch away or restart first (same limitation as the official sidebar delete, since there is no public "dispose agent" API).
- **Disk usage (size on disk)**: shown in the detail panel, computed from the session's stored log file via `sessionPersistence.locate` + `stat` (with `artifactInfo` used automatically when a future backend provides it).
- **Open record folder**: opens the directory with the OS file manager (`explorer` / `open` / `xdg-open`), cross-platform.
- **Loopback-bound API**: the plugin's JSON API only trusts loopback requests (127.0.0.1 / localhost / ::1). Starting the web app with `--host 0.0.0.0` or a LAN address makes the Session Manager unavailable (all requests are refused with 403).（API 仅信任本机回环请求：用 `--host 0.0.0.0` 或局域网地址启动 web 端时，「会话管理」不可用，所有请求返回 403。）
- **Delete current session**: the UI disables deleting the currently open session, and DSH's host side exposes no public "current session" API, so the API itself cannot reject it. Any local process that can reach the loopback API could delete it directly (same behavior as the official delete endpoint) — the running-session 409 guard still applies.（UI 禁止删除当前会话；DSH host 端无公开的「当前会话」API，因此接口本身无法拒绝。任何可访问本机 API 的本地进程仍可直接删除当前会话——与官方删除接口行为一致；运行中会话的 409 保护仍然生效。）
- **Concurrent archive/unarchive**: the plugin serializes its own archive-set mutations, and deletion cleans up orphaned archive entries, but an extreme race between the plugin queue and the core `archiveSession` queue (same-millisecond archive + unarchive/delete interleaving) can still lose an update; the UI recovers on the next refresh.（插件自身对归档集变更做了串行化，删除也会清理孤儿归档条目；但插件队列与核心 `archiveSession` 队列之间极端并发（同一毫秒内归档与取消归档/删除交错）仍可能丢失一次更新，刷新后 UI 自动恢复。）
- Only official public APIs are used (`workspaceRegistry`, `sessionPersistence`, the `agents`/`sessions` services, and its own fenced HTTP routes) — no modification of DSH core files.
- **Delete-file ownership check**: the file must be listed in the session's produced files (`details.files`) — `sessionId` is required for `delete-file` and the path is rejected otherwise (403), so the API cannot delete arbitrary files inside a workspace even from a local process that can reach the loopback API.

## Changelog（更新日志）

### 0.1.2

- **Search box**: filter the session list by title or id in real time
- **Activity stats** in the detail panel: turns, steps, user/assistant messages, tool-call distribution and fetch history
- **Safer file deletion**: only files produced by the session can be deleted (directories rejected), with a confirmation dialog and all-settled error summary
- Batch operations now run in **batches of 20** — selecting hundreds of sessions no longer floods the browser
- Orphan subagent sessions (parent deleted) are visible again in the workspace view
- Detail lineage no longer lists the same subagent twice; a failing workspace no longer blocks an entire delete
- Relative timestamps refresh automatically; keyboard (Tab + Enter/Space) selection; drag-select no longer sticks after releasing outside the window
- Open-record-folder now works for sessions without a working directory (`_no-cwd` layout); deleting a missing session returns 404
- Detail responses are bounded (files ≤ 200, fetches ≤ 50) so huge sessions stay snappy
- README documents the loopback-only API and current-session delete limitation

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
