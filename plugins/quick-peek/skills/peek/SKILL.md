---
name: peek
description: >-
  Quick Peek adapted from betterclaude.dev (/peek). Use when the user asks to
  quickly preview a file or folder, or open/reveal a path in their system file manager.
---

# Quick Peek (`/peek`)

Preview files and directories with metadata and line numbers, or reveal any path in your system file manager (Explorer on Windows, Finder on macOS, `xdg-open` on Linux). On Windows PowerShell use `$HOME/.gemini/config/plugins/quick-peek/scripts/peek.mjs`.

## Usage

- **Preview a file or folder** (`/peek <path>`):
  ```bash
  node ~/.gemini/config/plugins/quick-peek/scripts/peek.mjs "<path>"
  ```
- **Reveal in file manager** (`/peek <path> --open`):
  ```bash
  node ~/.gemini/config/plugins/quick-peek/scripts/peek.mjs "<path>" --open
  ```
