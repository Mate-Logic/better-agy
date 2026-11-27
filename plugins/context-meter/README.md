# Context Meter

Track your session's context window fill percentage from `transcript.jsonl`, with a progress bar and automatic inline alerts via `PostInvocation` when context passes 50% (yellow at 65%, red at 85%).

## Use

```text
/context
```

## Quick install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- context-meter
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="context-meter"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```