# Review

Type `/review` and the agent reads your changes like a strict reviewer. It looks for bugs that would actually break something, not for style.

- With uncommitted changes, it reviews those.
- With a clean tree, it reviews the branch against its base (`main` or `master`).
- `/review <path or ref>` narrows it to a file, a folder or a commit range.

Every finding comes with its file and line, how severe it is and the concrete input that breaks it. It does not edit anything unless you ask it to fix a finding.

## Install

```bash
git clone --depth 1 https://github.com/Mate-Logic/betterantigravity /tmp/betterantigravity
agy plugin install /tmp/betterantigravity/plugins/review
```

## Use

```text
/review
/review src/api
/review main..HEAD
```
