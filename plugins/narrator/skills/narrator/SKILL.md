---
name: narrator
description: >-
  Voice narrator adapted from betterclaude.dev (/narrator). Use when the user runs
  /narrator (on, off, stop, again, read, voices, test, status, set) to have the agent
  speak summaries of completed turns out loud using system TTS.
---

# Narrator (`/narrator`)

Controls the automatic voice narrator that reads a spoken summary after each completed turn (and stops automatically when a new prompt is sent).

## Commands

Run `node ~/.gemini/config/plugins/narrator/scripts/narrator.mjs <subcommand>` (on Windows PowerShell use `$HOME/.gemini/config/plugins/narrator/scripts/narrator.mjs`):

- `/narrator` — Toggle on/off (`toggle`)
- `/narrator on` / `/narrator off` — Turn on or off
- `/narrator stop` — Silence current speech immediately (keeps narrator enabled)
- `/narrator again` — Repeat the last spoken summary
- `/narrator read` — Read the entire last answer as plain speech (even if narrator is off)
- `/narrator voices` — List available system TTS voices (Windows SAPI, macOS `say`, or Linux `spd-say`/`espeak-ng`)
- `/narrator test [voice]` — Speak a short sample with the configured or specified voice
- `/narrator status` — Show current settings
- `/narrator set <key> <value>` — Configure `voice`, `lang` (e.g. `es`, `en`), `speed` (0.5–2.0, default `1.3`), `speakCommand` (custom TTS binary), or `maxChars` (default `360`).
