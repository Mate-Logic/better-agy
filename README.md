# better-antigravity

**English** · [Español](README.es.md)

Free, open-source plugins for [Antigravity CLI](https://antigravity.google/product/antigravity-cli) (`agy`), and the site that shows them off. Made by [MateLogic](https://mate-logic.tech/).

> **Credits:** this project is a tribute to [better-claude](https://betterclaude.dev/) by [Miguel Ángel Durán (@midudev)](https://github.com/midudev) ([source](https://github.com/midudev/better-claude), MIT). The idea, the one-prompt install and the page's layout come from his work.

## Plugins

| Plugin | What it does |
| --- | --- |
| [`commit`](plugins/commit) | `/commit` splits your changes into Conventional Commits, then pushes, commits only or moves them to a new branch. |
| [`review`](plugins/review) | `/review` reads your diff for real bugs, each with file, line and the input that breaks it. |
| [`handoff`](plugins/handoff) | `/handoff` writes where the session stands to `.agents/handoff.md`, so the next one picks up in one prompt. |

### Install

Open the site, pick plugins and paste the copied prompt into `agy`. Or by hand:

```bash
git clone --depth 1 https://github.com/Mate-Logic/betterantigravity /tmp/betterantigravity
agy plugin install /tmp/betterantigravity/plugins/commit
agy plugin list
```

### Add a plugin

1. Create `plugins/<name>/` with a `plugin.json`, a `README.md` and its components (`skills/<skill>/SKILL.md`, `agents/`, `rules/`, `mcp_config.json`, `hooks.json`). See [Build plugins](https://antigravity.google/docs/build-plugins).
2. Validate it: `agy plugin validate --strict plugins/<name>`.
3. Optionally add a terminal demo at `src/components/demos/<name>.astro` and register it in `src/components/Home.astro`, add its Spanish description to `pluginCopy.es` in `src/i18n/ui.ts`; set its position in `ORDER` in `src/site.ts`.

The site reads `plugins/` at build time: the docs panel renders each README and the source panel lists every file.

## Site

Built with [Astro](https://astro.build). English at `/`, Spanish at `/es/`; the copy lives in `src/i18n/ui.ts`.

| Command | Action |
| --- | --- |
| `bun install` | Install dependencies |
| `bun run dev` | Dev server at `localhost:4321` |
| `bun run build` | Build to `./dist/` |
| `bun run preview` | Preview the build |

Repository URL, domain and credits live in `src/site.ts`.

## Legal

Not affiliated with, endorsed by or sponsored by Google LLC. Antigravity and Gemini are trademarks of Google LLC. Plugins are provided as is, without warranty: install and run them at your own risk. Code under the [MIT License](LICENSE).
