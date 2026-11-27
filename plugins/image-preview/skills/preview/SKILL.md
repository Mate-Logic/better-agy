---
name: preview
description: >-
  Image Preview adapted from betterclaude.dev (/preview). Use when the user asks to
  preview an image file inline in Ghostty/Kitty, inspect image metadata, or open an image in the system viewer.
---

# Image Preview (`/preview`)

Inspect image metadata, render PNGs inline in Ghostty/Kitty via the Kitty Graphics Protocol, or open any image in your system viewer (Windows Photos/default app, macOS Preview, or Linux `xdg-open`). On Windows PowerShell use `$HOME/.gemini/config/plugins/image-preview/scripts/preview.mjs`.

## Usage

- **Preview image / metadata** (`/preview <image-path>`):
  ```bash
  node ~/.gemini/config/plugins/image-preview/scripts/preview.mjs "<image-path>"
  ```
- **Open in system image viewer** (`/preview <image-path> --open`):
  ```bash
  node ~/.gemini/config/plugins/image-preview/scripts/preview.mjs "<image-path>" --open
  ```
