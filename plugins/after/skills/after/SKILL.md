---
name: after
description: >-
  Prompt queue adapted from betterclaude.dev (/after). Use when the user asks to
  queue a follow-up task with /after, list queued tasks, remove one, or clear the queue.
---

# After (`/after`)

Queue follow-up tasks so they automatically run once the current turn finishes (handled by the `Stop` hook in this plugin).

Always pass `--session <current-conversation-id>` when calling `after.mjs`. On Windows PowerShell use `$HOME/.gemini/config/plugins/after/scripts/after.mjs` (or `%USERPROFILE%\.gemini\config\plugins\after\scripts\after.mjs` in cmd).

## Commands

- **Queue a task** (`/after <task>`):
  ```bash
  node ~/.gemini/config/plugins/after/scripts/after.mjs add "<task>" --session "<conversation-id>"
  ```
- **List queued tasks** (`/after list` or `/after`):
  ```bash
  node ~/.gemini/config/plugins/after/scripts/after.mjs list --session "<conversation-id>"
  ```
- **Remove a task** (`/after remove <n>`):
  ```bash
  node ~/.gemini/config/plugins/after/scripts/after.mjs remove <n> --session "<conversation-id>"
  ```
- **Clear the queue** (`/after clear`):
  ```bash
  node ~/.gemini/config/plugins/after/scripts/after.mjs clear --session "<conversation-id>"
  ```

After queuing a task, briefly confirm it is queued (do not execute it immediately if the user only asked to queue it after other work, or let the `Stop` hook trigger it on turn completion).
