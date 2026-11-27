# Fast Turn (_)

Empezá cualquier prompt con `_` para un turno ultra rápido y conciso con el mínimo de llamadas a herramientas mediante un hook `PreInvocation` (adaptado de `use-haiku` de better-claude).

## Uso

```text
_ qué puerto usa el servidor de desarrollo?
```

## Instalación rápida

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- fast-turn
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="fast-turn"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```