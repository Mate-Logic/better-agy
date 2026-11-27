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

## Instalación

```bash
git clone --depth 1 https://github.com/Mate-Logic/betterantigravity /tmp/betterantigravity
agy plugin install /tmp/betterantigravity/plugins/commit
```

## Uso

```text
/commit
```
