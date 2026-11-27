# Narrator

Narración por voz automática al terminar cada turno usando el TTS gratuito del sistema (Windows SAPI por PowerShell, `say` en macOS, `spd-say`/`espeak-ng` en Linux, o un comando propio). Se calla automáticamente cuando enviás un nuevo prompt.

## Comandos

- `/narrator` — Activa o desactiva
- `/narrator on` / `/narrator off` — Enciende o apaga
- `/narrator stop` — Silencia la lectura actual
- `/narrator again` — Repite el último resumen leído
- `/narrator read` — Lee en voz alta la última respuesta completa
- `/narrator voices` — Lista las voces disponibles del sistema
- `/narrator test [voz]` — Reproduce una muestra corta
- `/narrator status` — Muestra la configuración actual
- `/narrator set <clave> <valor>` — Configura `voice`, `lang`, `speed`, `speakCommand` o `maxChars`

## Instalación rápida

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- narrator
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="narrator"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```