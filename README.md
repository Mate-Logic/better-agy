# better-antigravity

**English** · [Español](README.es.md)

Free, open-source plugins for [Antigravity CLI](https://antigravity.google/product/antigravity-cli) (`agy`), and the site that shows them off. Made by [MateLogic](https://mate-logic.tech/).

> **Credits:** this project is a tribute to [better-claude](https://betterclaude.dev/) by [Miguel Ángel Durán (@midudev)](https://github.com/midudev) ([source](https://github.com/midudev/better-claude), MIT). The idea, the one-prompt install and the page's layout come from his work.

## Plugins

| Plugin | What it does |
| --- | --- |
| [`sub-meter`](plugins/sub-meter) | Your plan usage in agy's status line: the 5-hour and weekly windows as a bar, with the time until each resets. Needs Python 3. |
| [`commit`](plugins/commit) | `/commit` splits your changes into Conventional Commits, then pushes, commits only or moves them to a new branch. |
| [`review`](plugins/review) | `/review` reads your diff for real bugs, each with file, line and the input that breaks it. |
| [`handoff`](plugins/handoff) | `/handoff` writes where the session stands to `.agents/handoff.md`, so the next one picks up in one prompt. |
| [`time-machine`](plugins/time-machine) | Automatic git snapshots per turn. Use `/timeline` to inspect history, diff states, and undo/redo safely. |
| [`after`](plugins/after) | `/after` queues follow-up prompts to run automatically when the current turn finishes. |
| [`think-hard`](plugins/think-hard) | Prefix any prompt with `+` for deep analytical rigor and edge-case verification. |
| [`fast-turn`](plugins/fast-turn) | Prefix any prompt with `_` for an ultra-fast, concise turn with minimal tool calls. |
| [`context-meter`](plugins/context-meter) | `/context` shows context window usage and alerts inline when it's time to `/compact`. |
| [`token-meter`](plugins/token-meter) | `/tokens` and automatic inline token usage (turn + session total) with zero context cost. |
| [`narrator`](plugins/narrator) | `/narrator` speaks summaries after each turn using your system's free TTS. |
| [`quick-peek`](plugins/quick-peek) | `/peek` previews files/folders with line numbers or opens them in your file manager. |
| [`image-preview`](plugins/image-preview) | `/preview` renders images inline in Ghostty/Kitty or opens them in your system viewer. |

### Quick install (Linux, macOS & Windows)

**Requirements:** [Antigravity CLI (`agy`)](https://antigravity.google/product/antigravity-cli), `git`, **Node.js 18+** (needed for hook/script plugins) and **Python 3** for Sub Meter.

#### Linux / macOS

```bash
# Install all 13 plugins
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash

# Or install only specific plugins
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- commit review time-machine
```

#### Windows (PowerShell)

```powershell
# Install all 13 plugins
irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex

# Or install only specific plugins
$env:PLUGINS="commit review time-machine"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```

#### Or install from inside `agy` (any OS)

Open the site, pick the plugins you want, click **Copy install prompt**, and paste it directly into `agy`.

#### Verify & use

1. Check installed plugins:
   ```bash
   agy plugin list
   ```
2. Open a **new** `agy` session so the new skills and hooks are loaded.
3. Try them right away:
   - `/commit` — Split changes into Conventional Commits
   - `/review` — Strict bug-first diff review
   - `/handoff` — Save session state for the next session
   - `/timeline` — Inspect git turn snapshots and `/timeline undo`
   - `/after <task>` — Queue follow-up tasks automatically
   - `+ <prompt>` / `_ <prompt>` — Deep reasoning mode or ultra-fast concise mode
   - `/context` & `/tokens` — Context window and token usage meters
   - `/sub-meter` — Plan usage (5-hour and weekly) in the status line; the installer turns it on
   - `/narrator on` — Spoken turn summaries (Windows SAPI, macOS `say`, Linux `spd-say`/`espeak-ng`)
   - `/peek <path>` & `/preview <image>` — File/folder and image previews (`--open` opens Explorer/Finder/file manager)

#### Updating or uninstalling

- **Update:** re-run the quick install command — `agy plugin install` overwrites the existing plugin with the latest version.
- **Uninstall:** `agy plugin uninstall <plugin-name>` (e.g. `agy plugin uninstall narrator`).

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

better-antigravity is a non-commercial community project: it makes no money and is not affiliated with, endorsed by or sponsored by Google LLC. Google, Google Antigravity, Antigravity CLI, Gemini and the Antigravity logo are trademarks of Google LLC; the logo on the site only says which product these plugins work with. The MIT License covers this project's code only and grants no rights to Google's trademarks. Plugins are provided as is, without warranty: install and run them at your own risk. Code under the [MIT License](LICENSE).
