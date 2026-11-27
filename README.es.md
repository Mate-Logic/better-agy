# better-antigravity

[English](README.md) · **Español**

Plugins gratis y open source para [Antigravity CLI](https://antigravity.google/product/antigravity-cli) (`agy`), y el sitio que los muestra. Hecho por [MateLogic](https://mate-logic.tech/).

> **Créditos:** este proyecto es un homenaje a [better-claude](https://betterclaude.dev/), de [Miguel Ángel Durán (@midudev)](https://github.com/midudev) ([código](https://github.com/midudev/better-claude), MIT). La idea, la instalación con un solo prompt y el diseño de la página vienen de su trabajo.

## Plugins

| Plugin | Qué hace |
| --- | --- |
| [`commit`](plugins/commit/README.es.md) | `/commit` divide tus cambios en Conventional Commits y después hace push, solo commit o los pasa a una rama nueva. |
| [`review`](plugins/review/README.es.md) | `/review` lee tu diff buscando bugs reales, cada uno con archivo, línea y el caso que lo rompe. |
| [`handoff`](plugins/handoff/README.es.md) | `/handoff` anota en `.agents/handoff.md` cómo quedó la sesión, para que la próxima retome con un solo prompt. |

### Instalación

Abrí el sitio, elegí los plugins y pegá el prompt copiado en `agy`. O a mano:

```bash
git clone --depth 1 https://github.com/Mate-Logic/betterantigravity /tmp/betterantigravity
agy plugin install /tmp/betterantigravity/plugins/commit
agy plugin list
```

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

Sin afiliación, respaldo ni patrocinio de Google LLC. Antigravity y Gemini son marcas registradas de Google LLC. Los plugins se ofrecen tal cual, sin garantía. Código bajo la [Licencia MIT](LICENSE).
