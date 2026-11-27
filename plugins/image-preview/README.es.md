# Image Preview

Inspeccioná metadatos de imágenes, renderizá PNGs inline en terminales Ghostty o Kitty (con Kitty Graphics Protocol), o abrí cualquier imagen en el visor del sistema (Windows, macOS o Linux).

## Uso

```text
/preview ruta/a/imagen.png
/preview ruta/a/imagen.png --open
```

## Instalación rápida

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- image-preview
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="image-preview"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```