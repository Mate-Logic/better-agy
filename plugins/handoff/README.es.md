# Handoff

Las sesiones largas terminan: se llena el contexto, se termina el día, otra persona toma el trabajo. Escribí `/handoff` y el agente anota cómo quedó todo en `.agents/handoff.md`:

- **Goal**: para qué es este trabajo.
- **Done**: qué cambió, con los archivos.
- **State**: qué funciona, qué está roto y qué quedó a medias.
- **Next**: los próximos pasos, en orden.
- **Gotchas**: lo que se probó y no funcionó, y las decisiones ya tomadas.

En una sesión nueva, decí `continue from the handoff` (o «seguí desde el handoff») y el agente lee la nota, la compara con el repositorio y sigue.

## Instalación rápida

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- handoff
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="handoff"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```
## Uso

```text
/handoff
seguí desde el handoff
```
