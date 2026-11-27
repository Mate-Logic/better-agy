# Time Machine

Cada turno que modifica archivos en un repo git genera un snapshot automático en una ref aislada (`refs/time-machine/...`) sin tocar tu staging area, `HEAD`, ramas ni archivos ignorados. Cada salto se puede deshacer.

## Comandos

- `/timeline` o `/timeline list` — Lista los snapshots por turno
- `/timeline diff <n>` — Muestra qué cambiaría antes de saltar
- `/timeline <n>` — Vuelve el working tree al estado `#n`
- `/timeline undo` / `/timeline redo` — Deshace o rehace saltos
- `/timeline prune [días]` — Limpia snapshots viejos

## Instalación rápida

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- time-machine
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="time-machine"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```