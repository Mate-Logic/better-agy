# Token Meter

Muestra los tokens de entrada, salida y caché del último turno y el total de la sesión. Corre automáticamente tras cada invocación por `PostInvocation` usando `user_markdown` inline, sin gastar contexto extra.

## Uso

```text
/tokens
```

## Instalación rápida

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- token-meter
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="token-meter"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```