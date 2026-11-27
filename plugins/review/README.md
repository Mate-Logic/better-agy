# Review

Type `/review` and the agent reads your changes like a strict reviewer. It looks for bugs that would actually break something, not for style.

- With uncommitted changes, it reviews those.
- With a clean tree, it reviews the branch against its base (`main` or `master`).
- `/review <path or ref>` narrows it to a file, a folder or a commit range.

Every finding comes with its file and line, how severe it is and the concrete input that breaks it. It does not edit anything unless you ask it to fix a finding.

## Quick install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.sh | bash -s -- review
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="review"; irm https://raw.githubusercontent.com/Mate-Logic/betterantigravity/main/install.ps1 | iex
```
## Use

```text
/review
/review src/api
/review main..HEAD
```
