# Handoff

Las sesiones largas terminan: se llena el contexto, se termina el día, otra persona toma el trabajo. Escribí `/handoff` y el agente anota cómo quedó todo en `.agents/handoff.md`:

- **Goal**: para qué es este trabajo.
- **Done**: qué cambió, con los archivos.
- **State**: qué funciona, qué está roto y qué quedó a medias.
- **Next**: los próximos pasos, en orden.
- **Gotchas**: lo que se probó y no funcionó, y las decisiones ya tomadas.

En una sesión nueva, decí `continue from the handoff` (o «seguí desde el handoff») y el agente lee la nota, la compara con el repositorio y sigue.

## Instalación

```bash
git clone --depth 1 https://github.com/Mate-Logic/betterantigravity /tmp/betterantigravity
agy plugin install /tmp/betterantigravity/plugins/handoff
```

## Uso

```text
/handoff
seguí desde el handoff
```
