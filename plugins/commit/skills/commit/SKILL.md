---
name: commit
description: >-
  Split the current git changes into Conventional Commits, one per logical
  group, on the current branch, then optionally push or move them to a new
  branch. Use when the user types /commit or asks to commit their changes.
---

# Commit

Turn the working tree into clean Conventional Commits.

## 1. Look before you ask

Run `git status --porcelain`, `git diff`, `git diff --staged` and `git log -n 10 --oneline`.

- If there is nothing to commit, say so in one line and stop.
- If a merge, rebase or cherry-pick is in progress, say so and stop.
- Note the current branch and whether it has an upstream.

## 2. Ask how to commit

Ask the user to pick one option, and wait for the answer:

1. Commit + push (Recommended)
2. Commit only
3. Commit on a new branch

If the user already said what they want (for example "/commit only"), skip the question.

## 3. Group the changes

Split the changes into logical groups: one feature, one fix, one refactor, one docs change. Files that change for the same reason belong together. Keep the number of commits small; one commit is fine when everything is one change.

Never stage files that look like secrets: `.env*` (except `.env.example`), `*.pem`, `*.key`, `id_rsa*`, `credentials*.json`, files containing obvious API keys or tokens. If one is modified, leave it unstaged and mention it at the end.

## 4. Write the messages

Follow the repository's own style if `git log` shows one. Otherwise use Conventional Commits:

```text
<type>(<optional scope>): <summary in the imperative, lowercase, no period>

<optional body: why the change was made, wrapped at 72 columns>
```

Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `test`, `build`, `ci`, `chore`, `style`. Use `!` after the type for breaking changes.

Do not add AI attribution, `Co-Authored-By` lines, emojis or signatures.

## 5. Commit

For each group, stage only its files (`git add -- <paths>`, or `git add -p` style partial staging when one file holds two changes) and commit.

- Option 3: first create and switch to a branch named `<type>/<short-kebab-summary>` with `git switch -c`.
- Options 1 and 3: then push. If the branch has no upstream, use `git push -u origin <branch>`.

Never amend existing commits, rebase, force-push or pass `--no-verify`. If a hook fails, show its output, fix the cause if it is clear, and commit again.

## 6. Report

One line per commit: the message and its short hash, then where it was pushed, if it was. Mention any file you left out on purpose.
