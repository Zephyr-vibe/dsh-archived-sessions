# dsh-archived-sessions

<div align="center">

[English](README.md) | [中文](README.zh.md)

</div>

A DSH web plugin: a **Session Manager** in Settings — manage every conversation on this machine in one place.

## Features

- **Two tabs**: **All conversations** (non-archived) and **Archived**
- **View modes**: **flat list** or **grouped by workspace** (sessions without a workspace fall back to "Ungrouped")
- Browse conversations by title + relative time, newest first
- **Search box**: filter the session list by title or id in real time
- Checkbox / drag-to-select / select-all / batch **archive** (records kept) / batch **delete** (permanent, with a confirmation modal)
- **Unarchive** from the Archived tab (move back to All conversations)
- **Open record folder** button: opens the selected session's record directory in your OS file manager — cross-platform via `explorer` / `open` / `xdg-open`
- Expand each row for details (collapsed by default): size on disk, last update, activity stats (turns, steps, messages, tool-call distribution, fetch history), produced/downloaded files, parent and child (fork) sessions
- **Subagent sessions** are shown nested under their parent conversation (indented, with a "subagent" badge); when the parent is deleted or missing they surface as top-level rows
- **Deleting a parent session does NOT cascade**: subagent children, forks, and downloaded/produced files are kept unless you explicitly select them — nothing is lost accidentally
- The currently open session shows a **Current** badge and **cannot be deleted**

## Screenshots

<div align="center">
  <img src="docs/归档.png" width="48%" alt="Archived view" />
  <img src="docs/子智能体.jpg" width="48%" alt="Subagent nesting" />
  <p>Archived view / Subagent sessions nested under their parent</p>
</div>

<div align="center">
  <img src="docs/删除.jpg" width="48%" alt="Batch delete confirmation" />
  <img src="docs/详细.png" width="48%" alt="Detail panel" />
  <p>Batch delete confirmation / Detail panel with activity stats</p>
</div>

## Install

### Option 1: Direct tarball install

```sh
dsh plugin --profile web add https://codeload.github.com/Zephyr-vibe/dsh-archived-sessions/tar.gz/refs/heads/main
```

If pnpm blocks build scripts, append `--ignore-scripts`:

```sh
dsh plugin --profile web add https://codeload.github.com/Zephyr-vibe/dsh-archived-sessions/tar.gz/refs/heads/main --ignore-scripts
```

### Option 2: Let an agent install it

Tell your DSH agent:

```text
帮我把这个项目安装为插件：https://github.com/Zephyr-vibe/dsh-archived-sessions
```

The agent downloads the repo, places it into the profile's `node_modules`, and registers it in `dsh.profile.bundles`.

After installing, restart the web app — the Session Manager appears in Settings automatically.

## Compatibility

- **Zero config**: session directories are auto-detected from the official DSH layout (`$DSH_HOME/sessions/<project-key>/<session-id>/`) — no core patches
- **Archive / unarchive**: built on the same `registry` state primitives as the official `archiveSession`
- **Non-cascading delete**: only the selected session is removed; subagents, forks and files are kept; running sessions are rejected (409)
- **Loopback-only API** (127.0.0.1 / localhost / ::1); official public APIs only (`workspaceRegistry`, `sessionPersistence`)

## Changelog

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
