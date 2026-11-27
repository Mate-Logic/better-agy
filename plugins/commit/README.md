# Commit

Type `/commit` and the agent turns your working tree into [Conventional Commits](https://www.conventionalcommits.org/), one per logical group of changes, on the branch you are on.

Before it touches anything it asks how you want it done:

1. **Commit + push** (recommended)
2. **Commit only**
3. **Commit on a new branch**, named after what changed

## What it never does

- Stage files that look like secrets (`.env`, keys, credentials, tokens).
- Add AI attribution or `Co-Authored-By` lines.
- Amend, rebase, force-push or skip your hooks (`--no-verify`).

## Install

```bash
git clone --depth 1 https://github.com/Mate-Logic/betterantigravity /tmp/betterantigravity
agy plugin install /tmp/betterantigravity/plugins/commit
```

## Use

```text
/commit
```
