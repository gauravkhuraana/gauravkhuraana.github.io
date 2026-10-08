---
name: open-pr
description: Verify, commit, push a work branch and open a pull request that passes this repo's plan, scope and CI gates. Use when work under an approved plan is finished, or when the user asks to open, raise or create a PR.
---

# Open a pull request

## Preconditions

- You are on a work branch, not `main`, and `.claude/plans/<branch>.md` is `status: approved`.
- Run the local gate and fix every error before pushing:
  `BASE_SHA=origin/main HEAD_SHA=HEAD node .claude/guardrails/check-pr.mjs`
  (PowerShell: `$env:BASE_SHA='origin/main'; node .claude/guardrails/check-pr.mjs`).
  The PR-body check is skipped locally.
- Run the plan's Verification commands. For code or config changes, at least
  `npm run typecheck` and `npm run build`.

## Steps

1. `git status` and `git diff --stat origin/main...` — confirm every file is in the plan's Scope.
2. Commit with a conventional message (`feat:`, `fix:`, `content:`, `docs:`, `chore:`). Never use
   `--no-verify` or `--amend` on pushed commits.
3. `git push -u origin <branch>` (the user is asked to confirm the push).
4. `gh pr create --base main --draft` with a body that follows `.github/pull_request_template.md`:
   - First line: `Plan: .claude/plans/<file>.md`. CI fails without it.
   - Fill Plan, Scope, Success criteria and Rollback from the plan; paste the verification output.
   - Tick "Opened by an AI agent".
5. Report the PR URL and remind the user that @udzialMeansShare must add the `plan-approved`
   label (CI verifies who added it) and review. If guardrail files changed, a maintainer must
   also add the `guardrails-change` label.

## Never

Merge, approve, add `guardrails-change` / `large-change` / `plan-approved` labels, re-run or edit workflows, or push to `main`.
