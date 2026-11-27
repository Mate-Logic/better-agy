# After

Encolá prompts de seguimiento con `/after` para que se ejecuten automáticamente apenas termine el turno actual (mediante un hook `Stop`).

## Comandos

- `/after <tarea>` — Agrega una tarea a la cola de la sesión.
- `/after list` (o `/after`) — Muestra las tareas en cola.
- `/after remove <n>` — Elimina una tarea por índice.
- `/after clear` — Vacía la cola.

## Instalación rápida

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- after
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="after"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```