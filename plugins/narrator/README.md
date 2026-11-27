# Narrator

Automatic voice narration after each completed turn using your system's free TTS (Windows SAPI via PowerShell, macOS `say`, Linux `spd-say`/`espeak-ng`, or a custom command). Stops speaking automatically when you send a new prompt.

## Commands

- `/narrator` — Toggle on/off
- `/narrator on` / `/narrator off` — Enable or disable
- `/narrator stop` — Silence current speech
- `/narrator again` — Repeat the last spoken summary
- `/narrator read` — Read the full last answer aloud
- `/narrator voices` — List available system voices
- `/narrator test [voice]` — Play a short voice sample
- `/narrator status` — Show current settings
- `/narrator set <key> <value>` — Configure `voice`, `lang`, `speed`, `speakCommand`, or `maxChars`

## Quick install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- narrator
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="narrator"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```