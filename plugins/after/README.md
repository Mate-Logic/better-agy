# After

Queue follow-up prompts with `/after` so they run automatically as soon as the current turn finishes (via a `Stop` hook).

## Commands

- `/after <task>` — Add a follow-up task to the session queue.
- `/after list` (or `/after`) — Show queued tasks.
- `/after remove <n>` — Remove a queued task by index.
- `/after clear` — Clear the queue.

## Quick install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- after
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="after"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```