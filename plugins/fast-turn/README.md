# Fast Turn (_)

Prefix any prompt with `_` to trigger an ultra-fast, concise turn with minimal tool calls via a `PreInvocation` hook (adapted from `use-haiku` in better-claude).

## Use

```text
_ what port does the dev server use?
```

## Quick install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- fast-turn
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="fast-turn"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```