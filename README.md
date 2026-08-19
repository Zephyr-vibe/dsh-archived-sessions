# dsh-archived-sessions

A DSH web plugin: a **Session Manager** in Settings — manage every conversation on this machine in one place.

> **中文版见 [README_Chinese.md](./README_Chinese.md)。**

> **This branch (`fix/security-contract-review-fixes`): a security-contract review fix.** It makes `delete-file` require a `sessionId` for produced-file ownership checks, routes deletion through the fenced `locate()` + `rm` path, switches disk-usage to the official API, and fixes client-side batch/selection edge-case bugs. All feature content below is identical to `main` (v0.1.2) and is not repeated here.

## What this branch changes (relative to `main` / v0.1.2, commit `6c9d3a2`)

- **Server-side security hardening**
  - `delete-file` `sessionId` is now **required**: enforced both at the route and inside `deleteFile`, rejecting with 400 when missing (prevents deleting arbitrary workspace files through the loopback API using only the workspace fence), plus a length cap (>200 rejected).
  - Deletion is unified through the official `locate(meta)` → `dirname` → recursive `rm` path, dropping the string-arg `persistence.remove` (the jsonl backend has no such primitive); the fence check remains — the directory must stay strictly inside the sessions root, so a recursive `rm` can never be aimed at the whole library or higher.
  - Removed the dead `agentLoop.disposeAgent` branch (root context cannot reach the creator-held `AgentHandle.dispose`) to match the official "skip dispose and delete when unreachable" behavior.
- **Disk usage (M1)**: the jsonl backend lacks the `artifactInfo` primitive, so size is now computed via `locate()` + `stat` on the log file; it auto-switches to `artifactInfo` when a future backend provides it.
- **Client fixes (H2/H3/H4)**
  - Batch operations no longer abort wholesale on partial failure: succeeded targets leave the selection/details cache, failed ones stay selected for precise retry, with a `N ok / M fail` notice.
  - On search-filter change, the selection is clipped to the currently visible subset, avoiding the "select-all → filter → batch acts only on the visible subset" semantics split.
  - Collapsing details clears the error; loading rows no longer show another row's stale error.

## Features

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

Zero configuration — no setup and no core patches required. The plugin works out of the box on a stock Harness.

- **Zero config**: session record directories are derived automatically from the official DSH layout (`$DSH_HOME/sessions/<project-key>/<session-id>/`), so the plugin works on an unmodified Harness — no core patches required.
- **Archive / unarchive**: works on stock Harness, using the same registry state primitives the official `archiveSession` is built on.
- **Delete**: the plugin detaches workspace accounting, removes the archive-set entry, and deletes the session directory via its physical location (resolved from `sessionPersistence.locate`, fence-checked to stay inside the sessions root). Deletion is deliberately **non-cascading**: subagents, forks, and files are untouched unless explicitly selected. Live running sessions are rejected with a friendly message (409); open-but-idle sessions on a stock Harness ask you to switch away or restart first (same limitation as the official sidebar delete, since there is no public "dispose agent" API).
- **Disk usage (size on disk)**: shown in the detail panel, computed from the session's stored log file via `sessionPersistence.locate` + `stat` (with `artifactInfo` used automatically when a future backend provides it).
- **Open record folder**: opens the directory with the OS file manager (`explorer` / `open` / `xdg-open`), cross-platform.
- **Loopback-bound API**: the plugin's JSON API only trusts loopback requests (127.0.0.1 / localhost / ::1). Starting the web app with `--host 0.0.0.0` or a LAN address makes the Session Manager unavailable (all requests are refused with 403).
- **Delete current session**: the UI disables deleting the currently open session, and DSH's host side exposes no public "current session" API, so the API itself cannot reject it. Any local process that can reach the loopback API could delete it directly (same behavior as the official delete endpoint) — the running-session 409 guard still applies.
- **Concurrent archive/unarchive**: the plugin serializes its own archive-set mutations, and deletion cleans up orphaned archive entries, but an extreme race between the plugin queue and the core `archiveSession` queue (same-millisecond archive + unarchive/delete interleaving) can still lose an update; the UI recovers on the next refresh.
- Only official public APIs are used (`workspaceRegistry`, `sessionPersistence`, the `agents`/`sessions` services, and its own fenced HTTP routes) — no modification of DSH core files.
- **Delete-file ownership check**: the file must be listed in the session's produced files (`details.files`) — `sessionId` is required for `delete-file` and the path is rejected otherwise (403), so the API cannot delete arbitrary files inside a workspace even from a local process that can reach the loopback API.

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
