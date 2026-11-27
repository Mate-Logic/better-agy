#!/usr/bin/env python3
"""Turn Sub Meter on: copy statusline.py next to agy's settings and point statusLine at it.

  python3 setup.py           install (keeps a status line that is not Sub Meter's)
  python3 setup.py --force   install, replacing any status line already set
  python3 setup.py --remove  remove Sub Meter's status line

settings.json is backed up to settings.json.bak before it changes.
"""
import json
import shutil
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
AGY_DIR = Path.home() / ".gemini" / "antigravity-cli"
SETTINGS = AGY_DIR / "settings.json"
TARGET = AGY_DIR / "sub-meter" / "statusline.py"
MARK = "sub-meter"


def load() -> dict:
    if not SETTINGS.exists():
        return {}
    try:
        return json.loads(SETTINGS.read_text(encoding="utf-8") or "{}")
    except json.JSONDecodeError as err:
        sys.exit(f"x {SETTINGS} is not valid JSON ({err}). Fix it and run this again.")


def save(data: dict) -> None:
    AGY_DIR.mkdir(parents=True, exist_ok=True)
    if SETTINGS.exists():
        shutil.copyfile(SETTINGS, SETTINGS.with_name("settings.json.bak"))
    SETTINGS.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")


def ours(line) -> bool:
    return isinstance(line, dict) and MARK in str(line.get("command", ""))


def main() -> None:
    args = set(sys.argv[1:])
    data = load()
    current = data.get("statusLine")

    if "--remove" in args:
        if ours(current):
            del data["statusLine"]
            save(data)
            print("Sub Meter removed from the status line.")
        else:
            print("Sub Meter is not the status line; nothing to remove.")
        return

    if current and not ours(current) and "--force" not in args:
        print(f"! There is already a status line: {current.get('command', current)}")
        print("  Run this again with --force to replace it (settings.json is backed up first).")
        return

    TARGET.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(HERE / "statusline.py", TARGET)
    python = Path(sys.executable).as_posix() if sys.executable else "python3"
    data["statusLine"] = {
        "type": "command",
        "command": f'"{python}" "{TARGET.as_posix()}"',
        "stack_with_default": True,
    }
    save(data)
    print(f"Sub Meter is on: {TARGET}")
    print("Open a new agy session to see it at the bottom right.")


if __name__ == "__main__":
    main()
