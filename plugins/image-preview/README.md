# Image Preview

Inspect image metadata, render PNGs inline in Ghostty or Kitty terminals (via the Kitty Graphics Protocol), or open any image in your system viewer (Windows, macOS, or Linux).

## Use

```text
/preview path/to/image.png
/preview path/to/image.png --open
```

## Quick install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- image-preview
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="image-preview"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```