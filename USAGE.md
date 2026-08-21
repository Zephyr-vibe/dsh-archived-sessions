# dsh-archived-sessions 使用手册（v0.1.5）

> 安装方法见 README（方式一 tarball / 方式二让智能体安装）。本文只讲**怎么用**。

## 中文

### 会话列表

- **双标签**：所有对话 / 归档会话
- **视图**：默认按工作区（无归属会话归入「未分组」），可切换单列表
- **搜索框**：按标题或 ID 实时过滤
- **行操作**：勾选（可拖动批量勾选）/ 全选 / 展开详情 / 展开子代理（箭头）
- 当前打开的会话带「当前」徽标，不可删除

### 详情面板（点行右侧箭头展开）

- **基本信息**：占用空间、最后更新、活动统计（轮次 / 步骤 / 消息数 / 工具调用分布 / fetch 记录）
- **关联对话**：只显示子代理个数
- **下载/产出文件**：
  - 树形显示：文件夹可展开查看内部文件，文件多时列表内滚动
  - **显示路径开关**：默认只显示文件名，打开后实时切换完整路径
  - **文件夹勾选** = 全选内部文件；单个文件可独立勾选
- **删除选中文件**：带确认弹窗；删除后自动清理空父目录

### 删除会话（勾选后点「删除选中」）

确认弹窗包含：

```
确认删除 N 个会话？
会话记录将被永久删除，此操作不可恢复。
☐ 删除其下子对话（子代理）      ← 勾选 = 级联删所有后代子代理（含孙级）
☐ 删除所有下载文件/产出文件    ← 勾选 = 删除文件
```

- 两个选项**默认都不勾选**——只删会话本身
- 点选项右侧箭头可展开查看详情：
  - 子代理区：只显示子代理（含孙级等全部后代）+ 个数，可逐个勾选
  - 文件区：文件夹/文件树，可勾选文件夹（整删，含递归）或单个文件
- 删除后自动清理空父目录（直到非空或工作区根）

### 归档

- 勾选后「归档」= 隐藏记录（**不删除**），可随时移出归档
- 归档页有独立的批量删除入口

### 注意事项

1. **删除不可恢复**：会话记录/文件删除后无法找回
2. **工作区根目录绝不删除**：即使勾选了文件/文件夹，根本身受保护；根下直接文件只删文件本身
3. **文件列表是历史记录**：显示该会话产出过的文件；已物理删除的文件不再显示
4. **默认不勾选**：删除弹窗两个选项默认关闭，按需手动勾选
5. **API 仅本机**：`--host 0.0.0.0` 启动时插件不可用（403）
6. **运行中的会话**删除会被拒绝（409），先停止会话
7. 当前会话（UI 打开的那个）不可删除

---

## English

> For installation, see README (Option 1 tarball / Option 2 let an agent install it). This document covers **usage only**.

### Session list

- **Two tabs**: All conversations / Archived
- **View**: by workspace by default (unassigned sessions fall into "Ungrouped"); switchable to a flat list
- **Search box**: filter by title or id in real time
- **Row actions**: checkbox (drag to multi-select) / select-all / expand details / expand subagents (arrow)
- The currently open session shows a "Current" badge and cannot be deleted

### Detail panel (click the chevron on a row)

- **Basics**: size on disk, last update, activity stats (turns / steps / messages / tool-call distribution / fetches)
- **Related conversations**: shows only the subagent count
- **Downloaded/produced files**:
  - Tree view: folders expand to show inner files; the list scrolls when long
  - **"Show paths" toggle**: filenames by default, full paths in real time
  - **Folder checkbox** = select all inner files; individual files can be checked separately
- **Delete selected files**: confirmation dialog; empty parent directories are pruned automatically

### Deleting sessions (select rows, then "Delete selected")

The confirmation dialog contains:

```
Confirm deleting N session(s)?
Session logs will be permanently removed. This cannot be undone.
☐ Delete their sub-conversations (subagents)      <- cascades to ALL descendant subagents (incl. grandchildren)
☐ Delete all downloaded/produced files            <- deletes files
```

- Both options are **unchecked by default** — only the session itself is removed
- Click the arrow next to an option to inspect:
  - Subagents: only subagents (all descendants incl. grandchildren) with a count; check each individually
  - Files: folder/file tree; check a folder (whole removal, recursive) or single files
- Empty parent directories are pruned after deletion (up to the first non-empty dir or the workspace root)

### Archive

- Select rows and "Archive" = hide the records (**no deletion**); unarchive anytime
- The Archived tab has its own batch-delete entry

### Notes

1. **Deletion is irreversible**: session logs/files cannot be recovered
2. **Workspace roots are never deleted**: even with files/folders selected, the root itself is protected; files directly under the root are removed as files only
3. **The file list is history**: it reflects files produced by the session; physically deleted files no longer appear
4. **Nothing is checked by default** in the delete dialog — opt in deliberately
5. **Loopback-only API**: starting the web app with `--host 0.0.0.0` makes the plugin unavailable (403)
6. **Running sessions** are refused on delete (409) — stop them first
7. The session currently open in the UI cannot be deleted
