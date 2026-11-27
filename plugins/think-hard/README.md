# Think Hard (+)

Prefix any prompt with `+` to activate deep analytical rigor for that turn via a `PreInvocation` hook: edge-case analysis, assumption verification against actual code/output, alternative evaluation, and a final double-check.

## Use

```text
+ check if this migration can deadlock under concurrent writes
```

## Quick install

**Linux / macOS:**

```bash
curl -fsSL https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.sh | bash -s -- think-hard
```

**Windows (PowerShell):**

```powershell
$env:PLUGINS="think-hard"; irm https://raw.githubusercontent.com/Mate-Logic/better-agy/main/install.ps1 | iex
```