# Quick Peek

Previsualizá archivos y carpetas con metadatos y números de línea, o abrí cualquier ruta directamente en tu explorador de archivos (Explorer en Windows, Finder en macOS, `xdg-open` en Linux).

## Uso

```text
/peek src/site.ts
/peek plugins --open
```

## Instalación rápida

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- quick-peek
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="quick-peek"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```