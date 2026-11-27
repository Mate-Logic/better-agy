# Commit

Escribí `/commit` y el agente convierte tu working tree en [Conventional Commits](https://www.conventionalcommits.org/es/), uno por cada grupo lógico de cambios, en la rama en la que estás.

Antes de tocar nada te pregunta cómo querés hacerlo:

1. **Commit + push** (recomendado)
2. **Solo commit**
3. **Commit en una rama nueva**, con un nombre según lo que cambió

## Lo que nunca hace

- Agregar al stage archivos que parecen secretos (`.env`, claves, credenciales, tokens).
- Agregar firma de IA o líneas `Co-Authored-By`.
- Hacer amend, rebase, force-push ni saltear tus hooks (`--no-verify`).

## Instalación rápida

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- commit
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="commit"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```
## Uso

```text
/commit
```
