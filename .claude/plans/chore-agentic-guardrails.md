---
title: Guardrails for agentic work — plan-first, PR-only, code-owner approval
branch: chore/agentic-guardrails
author: claude-opus-5-5 for Gaurav Khurana
risk: high
status: approved
approved_by: udzialmeansshare
---

## Goal

Make AI-agent changes to this repo safe and reviewable. No agent can change files until a plan is written and a human approves it. Every change reaches `main` only through a PR that @udzialMeansShare approves as code owner. CI blocks anything outside the approved plan.

## Context

Today `main` is unprotected: `deploy.yml` publishes on every push to `main`, and `npm run deploy` can push straight to `gh-pages`. `.claude/` was gitignored, so no shared agent settings existed, only a personal `settings.local.json` that allows broad commands such as `Remove-Item *`. There is no CODEOWNERS file and no PR checks. The only PR check today is the rubric in `.github/pull_request_template.md`.

## Approach

Controls are layered so each layer still holds if the one above it fails:
- **Agent layer (local)**: `.claude/settings.json` adds deny rules, blocks bypass-permissions mode, and wires up hooks. `guard-edit.mjs` blocks edits on `main`, edits without an approved plan, edits outside the plan's Scope, and any agent edit to guardrail files. `guard-shell.mjs` blocks pushes to main, force-push, `--no-verify`, `gh pr merge`, deploys, mutating `gh api` calls and plan self-approval.
- **Plan layer**: `.claude/plans/<branch>.md` uses a fixed template with nine required sections and a machine-readable Scope. Only a human can set `status: approved`.
- **PR layer (CI)**: `pr-plan-check.yml` runs the same rules (shared `lib.mjs`). It also checks diff size, the `guardrails-change` label and that the PR body links the plan. `pr-ci.yml` runs typecheck, SEO, build and feed checks, plus a gitleaks secret scan and dependency review.
- **Repo layer**: CODEOWNERS plus a `main-protection` ruleset (JSON in repo, applied by a human). It requires a PR, code-owner approval and last-push approval, dismisses stale approvals, requires all checks, blocks force-push and deletion, and has no bypass actors.

Rejected alternatives: husky pre-push hooks (adds a dependency and is easy to skip with `--no-verify`); a plan approved only by a PR comment (not machine-checkable offline); a separate plan-only PR before every change (too heavy for a one-person site, but still allowed).

## Scope

- `.claude/settings.json` — shared agent permissions and hooks
- `.claude/hooks/**` — guard-edit, guard-shell, session-context hooks
- `.claude/guardrails/**` — shared rules library and CI checker
- `.claude/plans/**` — plan template and this plan
- `.claude/skills/**` — work-plan and open-pr skills
- `.claude/agents/**` — read-only plan-reviewer subagent
- `.claude/README.md` — how the controls fit together
- `CLAUDE.md` — agent workflow rules (imports copilot instructions)
- `.github/CODEOWNERS` — @udzialMeansShare owns everything
- `.github/workflows/pr-plan-check.yml` — plan and scope gate
- `.github/workflows/pr-ci.yml` — build, secret scan, dependency review
- `.github/rulesets/**` — main-protection ruleset JSON
- `.github/pull_request_template.md` — add plan link and agent disclosure
- `.gitignore` — stop ignoring `.claude/`; keep local-only files ignored

## Out of scope

- Applying the ruleset to GitHub and setting environment reviewers. These are repo settings and a human runs them (commands in `.claude/README.md`).
- Any change to site content, `deploy.yml` or dependencies.
- Removing entries from the personal `.claude/settings.local.json`. Deny rules already take precedence over its allows.

## Steps

1. Create branch `chore/agentic-guardrails` from `origin/main` with no upstream, so a bare `git push` cannot hit `main`.
2. Add `lib.mjs`, the hooks, `settings.json` and the plan template.
3. Stage the human-only files (CODEOWNERS, workflows, ruleset, CLAUDE.md, skills, agents, README) and have Gaurav copy them in. The hooks, now live, block the agent from writing them.
4. Unit-test hooks with sample payloads; dry-run `check-pr.mjs` against `origin/main`.
5. Gaurav reviews this plan, sets `status: approved`, commits, pushes, opens a PR and adds the `guardrails-change` label.
6. @udzialMeansShare approves; squash-merge; apply the ruleset with `gh api`.

## Risks

- **Locking ourselves out**: a ruleset with no bypass actors means admins also need a PR. Mitigation: ruleset JSON can be set to `evaluate` or deleted in the GitHub UI by the owner.
- **False-positive blocks** from shell regexes (e.g. a branch named `feat/main`). Mitigation: messages explain the reason; a human can run the command themselves.
- **Hook bypass by shell writes** (e.g. `node -e` writing a file). Mitigation: CI scope check and code-owner review catch it before `main`.
- **Gitleaks / dependency-review flakiness** blocks merges. Mitigation: pinned versions; failures are visible in the job log.
- **Codeowner without write access**: CODEOWNERS is ignored for users without write permission. Mitigation: confirm @udzialMeansShare is a collaborator with Write.

## Verification

- `echo '<payload>' | node .claude/hooks/guard-edit.mjs` returns exit 2 for: main branch, missing plan, draft plan, out-of-scope file, protected file, and agent writing `status: approved`. It returns exit 0 for an in-scope file on an approved plan.
- `guard-shell.mjs` blocks `git push origin main`, `git push --force`, `gh pr merge 1`, `npm run deploy`, `git commit --no-verify` and allows `git push -u origin chore/agentic-guardrails`.
- `BASE_SHA=origin/main node .claude/guardrails/check-pr.mjs` passes once this plan is approved.
- On the PR: both workflows run and the `guardrails-gate` job is green.

## Rollback

Revert the squash commit on `main` through a PR. To unblock urgently, the repo owner sets the `main-protection` ruleset to Disabled in Settings → Rules. Agents can be fully stopped by deleting `.claude/settings.json` hooks locally, or by revoking the Claude GitHub app.
