# Review

Escribí `/review` y el agente lee tus cambios como un revisor exigente. Busca bugs que de verdad rompan algo, no cuestiones de estilo.

- Si tenés cambios sin commitear, revisa esos.
- Si el working tree está limpio, revisa la rama contra su base (`main` o `master`).
- `/review <ruta o ref>` lo limita a un archivo, una carpeta o un rango de commits.

Cada hallazgo trae su archivo y línea, qué tan grave es y el caso concreto que lo rompe. No edita nada salvo que le pidas que arregle un hallazgo.

## Instalación

```bash
git clone --depth 1 https://github.com/Mate-Logic/betterantigravity /tmp/betterantigravity
agy plugin install /tmp/betterantigravity/plugins/review
```

## Uso

```text
/review
/review src/api
/review main..HEAD
```
