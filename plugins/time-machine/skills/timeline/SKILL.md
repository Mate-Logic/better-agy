---
name: timeline
description: >-
  Time Machine git snapshot history adapted from betterclaude.dev (/timeline).
  Use when the user runs /timeline, wants to view turn snapshots, undo/redo
  working tree changes, or roll back files to an earlier turn (including shell changes).
---

# Time Machine (`/timeline`)

Every turn that modifies files in a git repository is automatically snapshotted into an isolated git index (`refs/time-machine/...`) without touching your staging area, HEAD, branches, or `.gitignore`d files.

Always pass `--session <conversation-id>` and `--cwd <workspace-path>` when invoking `timeline.mjs`. On Windows PowerShell use `$HOME/.gemini/config/plugins/time-machine/scripts/timeline.mjs`.

## Commands

- **List snapshots** (`/timeline` or `/timeline list`):
  ```bash
  node ~/.gemini/config/plugins/time-machine/scripts/timeline.mjs list --session "<conversation-id>" --cwd "<workspace>"
  ```
- **Preview changes before jumping** (`/timeline diff <n>`):
  ```bash
  node ~/.gemini/config/plugins/time-machine/scripts/timeline.mjs diff <n> --session "<conversation-id>" --cwd "<workspace>"
  ```
- **Jump to state `#n`** (`/timeline <n>`):
  ```bash
  node ~/.gemini/config/plugins/time-machine/scripts/timeline.mjs go <n> --session "<conversation-id>" --cwd "<workspace>"
  ```
- **Undo** (`/timeline undo`):
  ```bash
  node ~/.gemini/config/plugins/time-machine/scripts/timeline.mjs undo --session "<conversation-id>" --cwd "<workspace>"
  ```
- **Redo** (`/timeline redo`):
  ```bash
  node ~/.gemini/config/plugins/time-machine/scripts/timeline.mjs redo --session "<conversation-id>" --cwd "<workspace>"
  ```
- **Prune old snapshots** (`/timeline prune [days]`):
  ```bash
  node ~/.gemini/config/plugins/time-machine/scripts/timeline.mjs prune 7 --session "<conversation-id>" --cwd "<workspace>"
  ```

Note: Any unsaved changes in the working tree are automatically saved as a snapshot (`your changes, kept before a jump`) before jumping, so jumps are always undoable.
