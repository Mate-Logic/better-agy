---
name: review
description: >-
  Review the current diff (or a branch, path or commit range) for real
  correctness and security bugs, reporting each with file, line, severity and
  a concrete failure scenario. Use when the user types /review or asks for a
  code review of their changes.
---

# Review

Find the bugs in a change before someone else does.

## 1. Pick what to review

- If the user gave a path, a ref or a range, review exactly that.
- Else, if `git status --porcelain` shows changes, review `git diff HEAD` (staged and unstaged) plus untracked files.
- Else, find the base branch (`main`, then `master`) and review `git diff <base>...HEAD`.

Say in one line what you are reviewing.

## 2. Read for bugs

Read the diff, then read enough of the surrounding code to know how the changed code is called. Look for:

- Logic errors: wrong conditions, off-by-one, inverted checks, missed cases, wrong defaults.
- Broken contracts: callers that now get a different type, shape or error than before.
- Concurrency and async mistakes: missing `await`, races, unhandled rejections.
- Resource and state leaks: unclosed handles, listeners never removed, stale caches.
- Security: injection, missing auth or validation, secrets in code or logs, unsafe deserialization.
- Data loss: destructive migrations, overwrites without checks.

Skip formatting, naming and style preferences. Only report what you can tie to a concrete failure.

## 3. Verify

For every candidate finding, re-read the code and try to prove it wrong. Drop it if the failure cannot actually happen.

## 4. Report

List findings most severe first:

```text
● high  path/to/file.ts:42
  <one sentence: what is wrong>
  breaks when: <concrete input or state → wrong result>
```

Severities: `high` (crash, data loss, security), `medium` (wrong result in a real case), `low` (edge case).

If nothing survives, say "No bugs found" and what you checked. Do not edit files unless the user asks you to fix a finding.
