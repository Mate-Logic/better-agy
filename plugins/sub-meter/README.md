# Sub Meter

Your plan usage in agy's status line, always at the bottom right: the **5-hour** window and the **weekly** one take turns every 8 seconds, as a bar with the time until that window resets.

```text
                                                   5h ━━━━━━──── 58% · 2h 10m
```

The bar takes the colour of the model you are on (blue for Gemini, orange for Claude, green for GPT) and turns yellow from 75% and red from 90%. It only shows the quota of the model family in use, so switching models switches the meter.

## Install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- sub-meter
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="sub-meter"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```

The installer turns the meter on for you. It needs **Python 3**. If another status line is already set it leaves it alone and tells you; then run `/sub-meter` in agy, or the setup script with `--force`.

## Use

```text
/sub-meter        turn it on
/sub-meter off    turn it off
```

## How it works

agy runs the command in `statusLine` (`~/.gemini/antigravity-cli/settings.json`) and hands it the session as JSON on stdin, `quota` included: each window with its `remaining_fraction` and `reset_in_seconds`. [`scripts/statusline.py`](scripts/statusline.py) picks the windows of the model in use, rotates through them and right-aligns the bar. [`scripts/setup.py`](scripts/setup.py) copies it to `~/.gemini/antigravity-cli/sub-meter/` and points `statusLine` at it, backing `settings.json` up first.

With an API key, or before the first reading, there is no quota and the line stays empty.

Adapted from [sub-meter](https://github.com/midudev/better-claude/tree/main/plugins/sub-meter) by midudev (MIT).
