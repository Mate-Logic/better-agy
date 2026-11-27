# Context Meter

Medí cuánto contexto lleva ocupado tu sesión desde `transcript.jsonl`, con barra de progreso y alertas automáticas inline por `PostInvocation` al superar el 50% (amarillo desde 65%, rojo desde 85%).

## Uso

```text
/context
```

## Instalación rápida

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- context-meter
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="context-meter"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```