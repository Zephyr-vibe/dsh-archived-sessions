# dsh-archived-sessions 项目交接文档（给新 AI 接手）

## 中文

### 项目概况

DSH Web 插件：设置页的「会话管理」。双端结构：

- **host 端**：`lib/index.js`（Node ESM，插件主逻辑：HTTP API、删除/归档、详情构建）
- **client 端**：`lib/client.js`（浏览器 bundle，设置页 UI）

### 代码位置

> 路径说明：以下用占位符 `<DSH 安装目录>`、`<发布目录>` 表示，**请按实际环境替换**——不要照抄任何人的本机路径。

| 用途 | 路径 |
|---|---|
| 运行版（web 实际加载） | `<DSH 安装目录>\.dsh\profiles\web\node_modules\dsh-archived-sessions\` |
| 发布快照（发布用，必须与运行版一致） | `<发布目录>\plugin-release\dsh-archived-sessions\`（原作者使用自定义发布目录，接手时按自己的目录组织） |

**双端必须保持 SHA-256 逐字节一致**——每次改代码后把运行版文件复制到发布快照。

### 生效机制（重要）

- **client.js 改动**：浏览器刷新页面即生效（bundle URL 带内容哈希 rev）
- **index.js（host）改动**：必须**重启 web** 才生效
  - 重启命令：`& "<DSH 安装目录>\deps\restart-dsh.ps1"`（后台跑，等 HTTP 200）
  - ⚠️ 用户可能在跑其他东西，**重启前先询问**，不要擅自重启

### 架构与关键实现

**host（index.js）**

- `apply(ctx)`：注册 `/archived/api/*` 路由（loopback 围栏 + POST + 方法白名单 `ARCHIVED_API_METHODS`）
- API：`details`（详情+统计+lineage）、`delete`（支持 subagentIds/filePaths 细粒度）、`delete-file`、`open-folder`、`archive`、`unarchive`
- `buildDetails`：从会话事件构建统计与文件列表；**files 列表做 stat 过滤**（已物理删除的文件不显示）；lineage 含 `children`（分叉）和 `subagents`（子代理）
- `deleteSession(ctx, id, { cascade, deleteFiles, subagentIds, filePaths })`：
  - 子代理删除：显式 `subagentIds` > `cascade`（collectDescendants 递归收集全部后代）
  - 文件删除：`filePaths` 指定时逐个删（**工作区围栏校验** + 只删普通文件）+ 删记录 log；`deleteFiles:false` 只删记录；默认删整个会话目录
  - 文件/文件夹删除后 `pruneEmptyDirs` **向上清理空目录**（边界 = 工作区根集合，根绝不删）
- `deleteFile`（详情面板单文件删除）：围栏（工作区根 realpath）+ 归属校验（sessionId 的产出文件列表）+ 删除后清理空目录
- `collectDescendants`：迭代式 DFS 收集后代（persistence.list + sessions.list 双源、Set 去重、seen 防环）
- 状态码约定：404 session-not-found / 400 校验错误 / 403 越界与非法目标 / 405 非 POST / 409 运行中 / 501 缺原语
- 注册的路由经 `ctx.effect` 清理（无监听器泄漏）

**client（client.js）**

- `ArchivedSessionsSection`：主组件（useSessions 拆订阅 byId/current/phase 防重渲染）
- `SessionRow`：memo 行组件（props 全基本类型/稳定引用，性能优化）
- `normId`：id 归一化（剥离 `session-` 前缀）——**byId 的 key 与 parentId 格式可能不一致**，所有归属匹配必须双向 normId
- `openDeleteConfirm`：打开删除弹窗时收集选中会话的**全部后代子代理**（递归）+ 全部文件（含子代理产出），推导可删文件夹（**排除工作区根**）
- 删除弹窗：两行确认 + 子代理区（只显示子代理+个数，细粒度勾选）+ 文件区（树形文件夹+显示路径开关+滚动）
- 详情面板文件区：树形分组（工作区根下直接文件平铺 / 子文件夹归组）、滚动、显示路径开关、文件夹勾选=全选内部文件
- 路径工具：`dirOf`（父目录）、`baseName`（文件名）——client 无 node path，需自实现

### 版本与发布流程

1. 改代码 → node --check 语法验证（`<DSH 安装目录>\deps\node\node.exe --check`）
2. 同步运行版 → 发布快照（lib\index.js、lib\client.js、README.md、package.json、LICENSE、cordis.patch.yml、docs\ 图片）
3. 升版本：package.json `version`（运行版+快照）+ README changelog（中英两区）
4. 校验：SHA-256 一致性 + `npm pack --dry-run`（确认打包内容）
5. 用户用 GitHub Desktop 推送到 `Zephyr-vibe/dsh-archived-sessions`，打 tag `v0.1.x`
6. README 中英切换：单文件锚点方案（`[中文](#中文) | [English](#english)`），中文在前

### 测试方法

- **API 层**：`Invoke-WebRequest` 直连 `http://127.0.0.1:8080/archived/api/*`（POST + JSON body），验证状态码与响应
- **删除行为**：用临时测试会话/文件，删除后文件系统复核（文件没了、空目录清了、根还在）
- **UI 层**：生成测试素材（子代理链 + 分层文件夹），浏览器手动验证
- 已有测试报告可作参考（原作者存于自己的工作目录，接手时重新生成即可）

### 常见坑（务必注意）

1. **id 格式混用**：`session-` 前缀 vs 纯 uuid——任何 parentId 比较都要 `normId` 双向
2. **files 是事件记录**：不是磁盘扫描；删除后要 stat 过滤，且删除弹窗重新拉详情时才一致
3. **工作区根保护**：文件夹删除/空目录清理的边界都是工作区根集合，根绝不删
4. **pruneEmptyDirs 边界**：只认工作区根集合（stopSet），不要用 sessionsRoot（工作区文件不在会话目录下）
5. **pnpm 注意**：插件本体在 profile 的 node_modules（非 .pnpm）；若改官方核心包才需要同步 .pnpm 副本
6. **不要擅自重启 web**：先询问用户
7. **删除弹窗默认不勾选**：用户明确要求两个选项默认关闭
8. **emoji/间距**：文件夹行必须用 `label.selectAll` 同款组件（历史教训：自定义样式导致行高/间距差异）

### 遗留事项

- steps 统计依赖"step 编号全局递增"约定（有注释），若官方改按 turn 重置需改为事件计数
- 全选复选框已支持 indeterminate 半选态（部分勾选显示横线）
- 发布快照中 `USAGE.md`、`HANDOFF.md` 是独立文档（README 未引用）

---

## English

### Overview

A DSH web plugin: the "Session Manager" in Settings. Two parts:

- **host**: `lib/index.js` (Node ESM — HTTP API, delete/archive logic, details builder)
- **client**: `lib/client.js` (browser bundle — Settings UI)

### Code locations

> Path note: placeholders `<DSH install dir>`, `<release dir>` below must be replaced with **your actual environment** — never copy anyone's local paths verbatim.

| Purpose | Path |
|---|---|
| Live copy (what web actually loads) | `<DSH install dir>\.dsh\profiles\web\node_modules\dsh-archived-sessions\` |
| Release snapshot (publish source; must match live byte-for-byte) | `<release dir>\plugin-release\dsh-archived-sessions\` (the original author kept a custom release directory; organize yours as you see fit) |

**Keep both ends SHA-256 identical** — copy changed files from live to the snapshot after every edit.

### How changes take effect (important)

- **client.js edits**: a browser refresh is enough (bundle URL carries a content-hash rev)
- **index.js (host) edits**: a **web restart** is required
  - Restart: `& "<DSH install dir>\deps\restart-dsh.ps1"` (run in background; wait for HTTP 200)
  - ⚠️ The user may be running other things — **ask before restarting**, never restart unilaterally

### Architecture & key implementations

**host (index.js)**

- `apply(ctx)`: registers `/archived/api/*` (loopback fence + POST-only + method whitelist `ARCHIVED_API_METHODS`)
- APIs: `details` (stats+lineage), `delete` (supports fine-grained `subagentIds`/`filePaths`), `delete-file`, `open-folder`, `archive`, `unarchive`
- `buildDetails`: builds stats and the file list from session events; **file list is stat-filtered** (physically deleted files are hidden); lineage has `children` (forks) and `subagents`
- `deleteSession(ctx, id, { cascade, deleteFiles, subagentIds, filePaths })`:
  - Subagent removal: explicit `subagentIds` > `cascade` (`collectDescendants` gathers all descendants recursively)
  - File removal: with `filePaths`, each file is removed (workspace-root fence + plain-file check) then the record log; `deleteFiles:false` removes the log only; default removes the whole session directory
  - After file/folder removal, `pruneEmptyDirs` walks up removing empty parents (boundary = workspace-root set; roots are never deleted)
- `deleteFile` (single-file delete in the detail panel): fence (realpath workspace roots) + ownership check (must be in the session's produced-file list) + empty-dir pruning
- `collectDescendants`: iterative DFS (persistence.list + sessions.list, Set dedupe, seen anti-cycle)
- Status codes: 404 session-not-found / 400 validation / 403 out-of-fence / 405 non-POST / 409 running / 501 missing primitive
- Routes are cleaned up via `ctx.effect` (no listener leaks)

**client (client.js)**

- `ArchivedSessionsSection`: main component (splits useSessions into byId/current/phase subscriptions to avoid re-render storms)
- `SessionRow`: memoized row component (primitive/stable props — performance)
- `normId`: id normalization (strips the `session-` prefix) — **byId keys and parentId formats may differ; every parent match must go through normId on both sides**
- `openDeleteConfirm`: on opening the delete dialog, collects ALL descendant subagents (recursive) plus all files (including subagent outputs), and derives deletable folders (**workspace roots excluded**)
- Delete dialog: two-line confirm + subagent section (subagents only, with count, fine-grained checkboxes) + file section (tree folders + show-paths toggle + scrolling)
- Detail-panel file area: tree grouping (files directly under workspace roots are flat; sub-folder files group under folders), scrolling, show-paths toggle, folder checkbox = select all inner files
- Path helpers: `dirOf` (parent dir), `baseName` (filename) — no node path in the client bundle; implement manually

### Versioning & release flow

1. Edit → `node --check` syntax validation (`<DSH install dir>\deps\node\node.exe --check`)
2. Sync live → release snapshot (lib\index.js, lib\client.js, README.md, package.json, LICENSE, cordis.patch.yml, docs\ images)
3. Bump version: package.json `version` (both ends) + README changelog (Chinese & English sections)
4. Verify: SHA-256 equality + `npm pack --dry-run` (confirm package contents)
5. The user pushes via GitHub Desktop to `Zephyr-vibe/dsh-archived-sessions` and tags `v0.1.x`
6. README language switch: single-file anchors (`[中文](#中文) | [English](#english)`), Chinese first

### Testing

- **API layer**: `Invoke-WebRequest` against `http://127.0.0.1:8080/archived/api/*` (POST + JSON body), assert status codes/bodies
- **Deletion behavior**: use throwaway test sessions/files, then verify on the filesystem (file gone, empty dirs pruned, roots intact)
- **UI layer**: generate test fixtures (subagent chains + layered folders), verify manually in the browser
- A previous test report exists (stored in the author's own workspace; regenerate one when you take over)

### Common pitfalls (read carefully)

1. **Mixed id formats**: `session-` prefixed vs bare uuid — any parentId comparison needs `normId` on both sides
2. **files are event records**, not a disk scan: stat-filter after deletion; only then do the detail panel and delete dialog agree on re-fetch
3. **Workspace-root protection**: both folder deletion and empty-dir pruning stop at the workspace-root set; roots are never deleted
4. **pruneEmptyDirs boundary**: use only the workspace-root set (stopSet), never sessionsRoot (workspace files live outside the session tree)
5. **pnpm caveat**: the plugin itself lives in the profile's node_modules (not .pnpm); only official core packages need .pnpm mirror syncing
6. **Never restart the web app without asking** the user first
7. **Delete-dialog defaults**: both options must stay unchecked by default (explicit user requirement)
8. **emoji/spacing**: folder rows must reuse the `label.selectAll` component (past lesson: custom styles caused row-height/spacing drift)

### Open items

- steps counting relies on "step numbers are globally increasing" (commented in code); if the official format resets per turn, switch to counting step/start events
- Select-all checkboxes support the indeterminate half-state
- `USAGE.md` (user guide) and this handoff doc are standalone; the README does not link them
