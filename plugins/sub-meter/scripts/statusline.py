#!/usr/bin/env python3
import json
import re
import sys
import time

RESET = "\033[0m"
DIM = "\033[2m"

# Model signature colors (256-color ANSI)
COLOR_CLAUDE = "\033[38;5;208m"    # Naranja Claude
COLOR_GPT = "\033[38;5;78m"        # Verde GPT
COLOR_GEMINI = "\033[38;5;75m"     # Azul Gemini / Neon / Flash
COLOR_ARGON = "\033[38;5;141m"     # Violeta Argon
COLOR_CARBON = "\033[38;5;45m"     # Turquesa Carbon
COLOR_HYDROGEN = "\033[38;5;117m"  # Celeste Hydrogen

# Threshold colors (same as sub-meter: >=75% warning, >=90% error)
COLOR_WARN = "\033[33m"
COLOR_ERR = "\033[31m"

CELLS = 10
ROTATE_SECONDS = 8
ANSI_RE = re.compile(r"\033\[[0-9;]*m")

CLAUDE_GPT_MODELS = ("claude", "opus", "sonnet", "haiku", "fable", "gpt", "oss", "openai")
GEMINI_MODELS = ("gemini", "neon", "argon", "carbon", "hydrogen", "orchestrator", "flash", "pro")


def visible_len(text: str) -> int:
    return len(ANSI_RE.sub("", text))


def model_color(model_text: str) -> str:
    m = model_text.lower()
    if any(k in m for k in ("claude", "opus", "sonnet", "haiku", "fable")):
        return COLOR_CLAUDE
    if any(k in m for k in ("gpt", "oss", "openai")):
        return COLOR_GPT
    if "argon" in m:
        return COLOR_ARGON
    if "carbon" in m:
        return COLOR_CARBON
    if "hydrogen" in m:
        return COLOR_HYDROGEN
    return COLOR_GEMINI


def bar_color(pct: float, base_color: str) -> str:
    if pct >= 90:
        return COLOR_ERR
    if pct >= 75:
        return COLOR_WARN
    return base_color


def fmt_until(seconds) -> str:
    if not isinstance(seconds, (int, float)) or seconds <= 0:
        return ""
    minutes = max(1, int(round(seconds / 60)))
    if minutes < 60:
        return f"{minutes}m"
    hours = minutes // 60
    if hours < 24:
        return f"{hours}h {minutes % 60}m"
    return f"{hours // 24}d {hours % 24}h"


def window_label(key: str) -> str:
    low = key.lower()
    if any(t in low for t in ("5h", "five", "hour", "session", "sliding")):
        return "5h"
    if any(t in low for t in ("week", "7d", "seven")):
        return "week"
    if any(t in low for t in ("day", "24h", "daily")):
        return "24h"
    return key


def window_sort_key(key: str) -> tuple:
    low = key.lower()
    if any(t in low for t in ("5h", "five", "hour", "session", "sliding")):
        return (0, key)
    if any(t in low for t in ("day", "24h", "daily")):
        return (1, key)
    if any(t in low for t in ("week", "7d", "seven")):
        return (2, key)
    return (3, key)


def filter_quotas(quota: dict, model_text: str) -> list:
    items = [
        (k, v)
        for k, v in quota.items()
        if isinstance(v, dict) and isinstance(v.get("remaining_fraction"), (int, float))
    ]
    if not items:
        return []

    m = model_text.lower()

    def pick(tokens):
        return [(k, v) for k, v in items if any(t in k.lower() for t in tokens)]

    matched = []
    if any(k in m for k in CLAUDE_GPT_MODELS):
        matched = pick(("claude", "gpt", "anthropic", "openai", "opus", "sonnet"))
    elif any(k in m for k in GEMINI_MODELS):
        matched = pick(("gemini", "neon", "argon", "carbon", "hydrogen"))

    result = matched if matched else items
    result.sort(key=lambda kv: window_sort_key(kv[0]))
    return result


def main() -> None:
    try:
        raw = sys.stdin.read()
        data = json.loads(raw) if raw.strip() else {}
    except Exception:
        data = {}

    width = data.get("terminal_width") or 100
    model = data.get("model") or {}
    model_text = f"{model.get('id', '')} {model.get('display_name', '')}".strip()

    quota = data.get("quota") or {}
    if not isinstance(quota, dict):
        return

    windows = filter_quotas(quota, model_text)
    if not windows:
        return

    # Rotate 1 window at a time every 8s, identical to sub-meter
    idx = int(time.time() // ROTATE_SECONDS) % len(windows)
    key, info = windows[idx]

    reset_secs = info.get("reset_in_seconds")
    rem = info.get("remaining_fraction", 1.0)
    pct = max(0.0, min(100.0, (1.0 - rem) * 100.0))

    filled = int(round((pct / 100.0) * CELLS))
    empty = CELLS - filled

    base_col = model_color(model_text)
    col = bar_color(pct, base_col)

    label = window_label(key)
    meter = f"{DIM}{label} {RESET}{col}{'━' * filled}{RESET}{DIM}{'─' * empty}{RESET} {round(pct)}%"
    until = fmt_until(reset_secs)
    if until:
        meter += f"{DIM} · {until}{RESET}"

    pad = max(0, width - visible_len(meter))
    print(f"{' ' * pad}{meter}")


if __name__ == "__main__":
    main()
