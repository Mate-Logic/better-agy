# Token Meter

Shows input, output, and cache-read tokens for the latest turn and the entire session. Runs automatically after invocations via `PostInvocation` using inline `user_markdown` with zero extra context cost.

## Use

```text
/tokens
```

## Quick install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- token-meter
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="token-meter"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```