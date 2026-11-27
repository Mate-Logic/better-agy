#!/usr/bin/env bash
set -euo pipefail

REPO_URL="${BETTERANTIGRAVITY_REPO:-https://github.com/Mate-Logic/betterantigravity.git}"
BRANCH="${BETTERANTIGRAVITY_BRANCH:-main}"

if ! command -v agy >/dev/null 2>&1; then
  echo "Error: 'agy' (Antigravity CLI) not found in PATH." >&2
  echo "Install it first: https://antigravity.google/product/antigravity-cli" >&2
  exit 1
fi

TMPDIR_CLONE=""
cleanup() {
  if [ -n "${TMPDIR_CLONE}" ] && [ -d "${TMPDIR_CLONE}" ]; then
    rm -rf "${TMPDIR_CLONE}"
  fi
}
trap cleanup EXIT

# Use local plugins/ directory if running from a local clone, otherwise shallow-clone.
SCRIPT_DIR=""
if [ -n "${BASH_SOURCE[0]:-}" ] && [ -f "${BASH_SOURCE[0]}" ]; then
  SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
fi

if [ -n "${SCRIPT_DIR}" ] && [ -d "${SCRIPT_DIR}/plugins" ] && [ -f "${SCRIPT_DIR}/plugins/commit/plugin.json" ]; then
  PLUGINS_DIR="${SCRIPT_DIR}/plugins"
else
  if ! command -v git >/dev/null 2>&1; then
    echo "Error: 'git' is required to clone better-antigravity." >&2
    exit 1
  fi
  TMPDIR_CLONE="$(mktemp -d)"
  echo "Cloning better-antigravity..."
  git clone --depth 1 --branch "${BRANCH}" --quiet "${REPO_URL}" "${TMPDIR_CLONE}"
  PLUGINS_DIR="${TMPDIR_CLONE}/plugins"
fi

# Determine which plugins to install.
SELECTED=()
if [ "$#" -gt 0 ]; then
  for arg in "$@"; do
    case "$arg" in
      --all|-a)
        SELECTED=()
        for d in "${PLUGINS_DIR}"/*; do
          [ -f "$d/plugin.json" ] && SELECTED+=("$(basename "$d")")
        done
        ;;
      --list|-l)
        for d in "${PLUGINS_DIR}"/*; do
          [ -f "$d/plugin.json" ] && basename "$d"
        done
        exit 0
        ;;
      --help|-h)
        echo "Usage: install.sh [plugin1 plugin2 ...] | [--all] [--list]"
        echo "Installs all better-antigravity plugins when no names are given."
        exit 0
        ;;
      *)
        SELECTED+=("$arg")
        ;;
    esac
  done
else
  for d in "${PLUGINS_DIR}"/*; do
    [ -f "$d/plugin.json" ] && SELECTED+=("$(basename "$d")")
  done
fi

if [ "${#SELECTED[@]}" -eq 0 ]; then
  echo "No plugins found to install." >&2
  exit 1
fi

INSTALLED=0
FAILED=0
for name in "${SELECTED[@]}"; do
  target="${PLUGINS_DIR}/${name}"
  if [ ! -f "${target}/plugin.json" ]; then
    echo "x Unknown plugin: ${name}" >&2
    FAILED=$((FAILED + 1))
    continue
  fi
  echo "-> Installing ${name}..."
  if agy plugin install "${target}"; then
    INSTALLED=$((INSTALLED + 1))
    # Sub Meter lives in agy's status line: point settings.json at it.
    if [ "${name}" = "sub-meter" ]; then
      if command -v python3 >/dev/null 2>&1; then
        python3 "${target}/scripts/setup.py" || echo "! Sub Meter: run /sub-meter in agy to turn it on." >&2
      else
        echo "! Sub Meter needs Python 3 to draw the status line." >&2
      fi
    fi
  else
    echo "x Failed to install ${name}" >&2
    FAILED=$((FAILED + 1))
  fi
done

echo ""
echo "Done: ${INSTALLED} installed, ${FAILED} failed."
echo "New Antigravity CLI sessions will pick up the installed plugins automatically."
if [ "${FAILED}" -gt 0 ]; then
  exit 1
fi
