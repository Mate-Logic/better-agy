# better-antigravity

[English](README.md) · **Español**

Plugins gratis y open source para [Antigravity CLI](https://antigravity.google/product/antigravity-cli) (`agy`), y el sitio que los muestra. Hecho por [MateLogic](https://mate-logic.tech/).

> **Créditos:** este proyecto es un homenaje a [better-claude](https://betterclaude.dev/), de [Miguel Ángel Durán (@midudev)](https://github.com/midudev) ([código](https://github.com/midudev/better-claude), MIT). La idea, la instalación con un solo prompt y el diseño de la página vienen de su trabajo.

## Plugins

| Plugin | Qué hace |
| --- | --- |
| [`sub-meter`](plugins/sub-meter/README.es.md) | El uso de tu plan en la status line de agy: la ventana de 5 horas y la semanal como una barra, con el tiempo hasta el reinicio. Necesita Python 3. |
| [`commit`](plugins/commit/README.es.md) | `/commit` divide tus cambios en Conventional Commits y después hace push, solo commit o los pasa a una rama nueva. |
| [`review`](plugins/review/README.es.md) | `/review` lee tu diff buscando bugs reales, cada uno con archivo, línea y el caso que lo rompe. |
| [`handoff`](plugins/handoff/README.es.md) | `/handoff` anota en `.agents/handoff.md` cómo quedó la sesión, para que la próxima retome con un solo prompt. |
| [`time-machine`](plugins/time-machine/README.es.md) | Snapshots automáticos de git por turno. Usá `/timeline` para ver el historial, diffs y deshacer/rehacer seguro. |
| [`after`](plugins/after/README.es.md) | `/after` encola prompts de seguimiento para que se ejecuten automáticamente al terminar el turno actual. |
| [`think-hard`](plugins/think-hard/README.es.md) | Empezá un prompt con `+` para máximo rigor analítico y verificación de casos borde. |
| [`fast-turn`](plugins/fast-turn/README.es.md) | Empezá un prompt con `_` para un turno ultra rápido y conciso con el mínimo de herramientas. |
| [`context-meter`](plugins/context-meter/README.es.md) | `/context` muestra el uso de la ventana de contexto y avisa inline cuándo conviene `/compact`. |
| [`token-meter`](plugins/token-meter/README.es.md) | `/tokens` y medidor inline automático por turno y sesión sin gastar contexto extra. |
| [`narrator`](plugins/narrator/README.es.md) | `/narrator` lee en voz alta un resumen al terminar cada turno con el TTS gratuito de tu sistema. |
| [`quick-peek`](plugins/quick-peek/README.es.md) | `/peek` previsualiza archivos y carpetas con números de línea o los abre en tu explorador. |
| [`image-preview`](plugins/image-preview/README.es.md) | `/preview` renderiza imágenes inline en Ghostty/Kitty o las abre en el visor del sistema. |

### Instalación rápida y tutorial (Linux, macOS y Windows)

**Requisitos:** [Antigravity CLI (`agy`)](https://antigravity.google/product/antigravity-cli), `git`, **Node.js 18+** (necesario para los plugins con hooks y scripts) y **Python 3** para Sub Meter.

#### Linux / macOS

```bash
# Instalar los 13 plugins
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash

# O instalar solo algunos
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- commit review time-machine
```

#### Windows (PowerShell)

```powershell
# Instalar los 13 plugins
irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex

# O instalar solo algunos
$env:PLUGINS="commit review time-machine"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```

#### O instalá directo desde `agy` (cualquier sistema operativo)

Abrí el sitio, elegí los plugins, tocá **Copiar prompt de instalación** y pegalo en `agy`.

#### Verificar y empezar a usar

1. Comprobá que quedaron instalados y activos:
   ```bash
   agy plugin list
   ```
2. Abrí una **sesión nueva** de `agy` para que cargue las skills y hooks.
3. Probalos directo en el chat:
   - `/commit` — Divide tus cambios en Conventional Commits
   - `/review` — Code review enfocada en bugs reales
   - `/handoff` — Guarda el estado de la sesión para retomar después
   - `/timeline` — Historial de snapshots por turno y `/timeline undo`
   - `/after <tarea>` — Encola tareas de seguimiento automáticamente
   - `+ <prompt>` / `_ <prompt>` — Modo análisis profundo o modo ultra rápido
   - `/context` y `/tokens` — Medidores de ventana de contexto y tokens
   - `/sub-meter` — Uso del plan (5 horas y semanal) en la status line; el instalador lo deja activo
   - `/narrator on` — Resúmenes hablados al terminar cada turno (Windows SAPI, macOS `say`, Linux `spd-say`/`espeak-ng`)
   - `/peek <ruta>` y `/preview <imagen>` — Previsualización de archivos/carpetas e imágenes (`--open` abre Explorer/Finder/explorador)

#### Actualizar o desinstalar

- **Actualizar:** volvé a correr el comando de instalación rápida (`agy plugin install` reemplaza por la última versión).
- **Desinstalar:** `agy plugin uninstall <nombre>` (ej. `agy plugin uninstall narrator`).

### Agregar un plugin

1. Creá `plugins/<nombre>/` con un `plugin.json`, un `README.md` (y opcionalmente `README.es.md`) y sus componentes (`skills/<skill>/SKILL.md`, `agents/`, `rules/`, `mcp_config.json`, `hooks.json`). Mirá [Build plugins](https://antigravity.google/docs/build-plugins).
2. Validalo: `agy plugin validate --strict plugins/<nombre>`.
3. Opcional: agregá una demo de terminal en `src/components/demos/<nombre>.astro`, registrala en `src/components/Home.astro`, y sumá su descripción en español en `src/i18n/ui.ts` (`pluginCopy.es`).

## Sitio

Hecho con [Astro](https://astro.build). Inglés en `/`, español en `/es/`; los textos están en `src/i18n/ui.ts`.

| Comando | Acción |
| --- | --- |
| `bun install` | Instala las dependencias |
| `bun run dev` | Servidor de desarrollo en `localhost:4321` |
| `bun run build` | Compila en `./dist/` |

## Legal

better-antigravity es un proyecto de la comunidad sin fines de lucro: no genera ingresos y no está afiliado, respaldado ni patrocinado por Google LLC. Google, Google Antigravity, Antigravity CLI, Gemini y el logo de Antigravity son marcas registradas de Google LLC; el logo del sitio solo indica con qué producto funcionan estos plugins. La Licencia MIT cubre solo el código de este proyecto y no otorga derechos sobre las marcas de Google. Los plugins se ofrecen tal cual, sin garantía. Código bajo la [Licencia MIT](LICENSE).
