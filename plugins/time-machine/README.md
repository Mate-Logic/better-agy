# Time Machine

Every turn that modifies files in a git repository is automatically snapshotted into an isolated git ref (`refs/time-machine/...`) without touching your staging area, `HEAD`, branches, or `.gitignore`d files. Jumps are always undoable.

## Commands

- `/timeline` or `/timeline list` — List turn snapshots
- `/timeline diff <n>` — Preview changes before jumping
- `/timeline <n>` — Jump working tree to state `#n`
- `/timeline undo` / `/timeline redo` — Step backward or forward
- `/timeline prune [days]` — Clean up old snapshots

## Quick install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- time-machine
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="time-machine"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```