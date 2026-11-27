---
name: tokens
description: >-
  Token Meter adapted from betterclaude.dev. Use when the user asks for /tokens,
  token usage for the current turn, or total session token statistics.
---

# Token Meter (`/tokens`)

Displays input, output, and cache-read tokens for the latest turn and the entire session. Also runs automatically after invocations via `PostInvocation` using inline `user_markdown` (0 tokens sent to the model). On Windows PowerShell use `$HOME/.gemini/config/plugins/token-meter/scripts/tokens.mjs`.

```bash
node ~/.gemini/config/plugins/token-meter/scripts/tokens.mjs "<transcript-path>"
```
