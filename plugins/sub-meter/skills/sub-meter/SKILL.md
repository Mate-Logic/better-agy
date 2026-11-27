---
name: sub-meter
description: >
  Sub Meter adapted from betterclaude.dev. Use when the user runs /sub-meter, asks
  to turn the plan usage meter on or off, or asks how much of their 5-hour or
  weekly quota is left.
---

# Sub Meter

Sub Meter draws the plan usage in agy's status line: one window at a time
(5 hours, then weekly, every 8 seconds) as a 10-cell bar, the percentage used
and the time until it resets. The bar takes the model's colour, turns yellow
from 75% and red from 90%.

## Turn it on

Run the setup script that ships with this plugin, with the Python 3 on this
machine (`python3` on Linux and macOS, `python` or `py` on Windows):

```bash
python3 <this plugin's directory>/scripts/setup.py
```

It copies `statusline.py` to `~/.gemini/antigravity-cli/sub-meter/` and sets
`statusLine` in `~/.gemini/antigravity-cli/settings.json`, after backing the file
up to `settings.json.bak`. When another status line is already set it stops and
says so: ask the user before running it again with `--force`.

- `/sub-meter off`: run the script with `--remove`.
- Tell the user to open a new agy session to see the meter.

## When nothing shows

The meter only draws when agy hands the status line a `quota` reading (signed in
with a plan). With an API key there is nothing to show, and the line stays empty.
