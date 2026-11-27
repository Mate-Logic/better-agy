# Quick Peek

Preview files and directories with metadata and line numbers, or reveal any path directly in your system file manager (Explorer on Windows, Finder on macOS, `xdg-open` on Linux).

## Use

```text
/peek src/site.ts
/peek plugins --open
```

## Quick install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- quick-peek
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="quick-peek"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```