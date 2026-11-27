---
name: context
description: >-
  Context Meter adapted from betterclaude.dev. Use when the user asks for /context,
  context window fill percentage, or whether it is time to /compact.
---

# Context Meter (`/context`)

Shows the current session's context window fill bar, exact token count vs model limit, and whether it's time to `/compact` or open a fresh session. The `PostInvocation` hook also automatically warns inline when context exceeds 50% (yellow at ≥65%, red at ≥85%).

Run with the current conversation's transcript path (on Windows PowerShell use `$HOME/.gemini/config/plugins/context-meter/scripts/context.mjs`):

```bash
node ~/.gemini/config/plugins/context-meter/scripts/context.mjs "<transcript-path>"
```
