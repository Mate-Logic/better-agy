# Think Hard (+)

Empezá cualquier prompt con `+` para activar máximo rigor analítico en ese turno mediante un hook `PreInvocation`: análisis de casos borde, verificación contra código real, alternativas y doble chequeo antes de responder.

## Uso

```text
+ revisá si esta migración puede hacer deadlock bajo escrituras concurrentes
```

## Instalación rápida

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- think-hard
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="think-hard"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```