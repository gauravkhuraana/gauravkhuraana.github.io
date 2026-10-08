---
title: Harden guardrails — authenticated plan approval, trusted checker, fewer false positives
branch: fix/guardrails-hardening
author: claude-opus-5-5 for Gaurav Khurana
risk: high
status: approved
approved_by: udzialmeansshare
---

## Goal

Close the three gaps Codex found in the review of PR #15. Also fix two false positives in the shell hook that blocked read-only commands. Then a plan's approval can't be faked, a PR can't weaken the check that judges it, and agents aren't blocked from harmless reads.

## Context

PR #15 merged the first version of the guardrails. Codex review comments on it:
- **P1** (`check-pr.mjs:60`): `status: approved` / `approved_by` are just text in the PR, so anyone opening a PR can fill them in.
- **P2** (`pr-plan-check.yml:29`): the workflow runs `check-pr.mjs` from the PR checkout, so a PR can replace the checker with one that always passes.
- **P2** (`lib.mjs:25`): `.claude/plans/TEMPLATE.md` is missing from CI's protected paths.

In this session the shell hook wrongly blocked two read-only commands: `ls CLAUDE.md 2>&1` (the redirect looked like a write) and `gh api .../rulesets` with no write flag. It also blocked `cp` *from* a guardrail file. Separately, `main-protection` has not been applied, so PR #15 merged with "Plan & scope" failing.

## Approach

- **Authenticated approval**: CI accepts a plan only when an account in `PLAN_APPROVERS` (udzialMeansShare) has added the `plan-approved` label on GitHub. It reads the label event from the GitHub API and checks who added it. The label must have been added after the plan's last commit; if the plan changes, the approver removes and re-adds the label. The frontmatter `approved_by` must also be an approver. If the API call fails, the check fails.
- **Trusted checker**: `pr-plan-check.yml` switches to `pull_request_target`, so GitHub runs the base branch's copy of the workflow. The checker script also comes from the base commit (sparse checkout into `trusted/`). The PR head is checked out into `pr/` only as data: git diff/log and reading the plan, never executed. The token is read-only.
- **Template**: add `.claude/plans/TEMPLATE.md` to `PROTECTED_HARD`.
- **Shell hook**: ignore redirects that write nothing (`2>&1`, `>/dev/null`, `2>$null`). Block `gh api` only when it writes (`-X`, or `-f`/`-F`/`--input`). Allow `cp` from a guardrail file but block copying onto one. Also block `gh label`, `gh run rerun`, applying the `plan-approved` label, and `git checkout <rev> -- .claude/...`.

Rejected: requiring signed approval commits (an agent on the same machine may have access to the signing key); a comment-based `/approve-plan` (harder to audit than a label event).

## Scope

- `.claude/guardrails/lib.mjs` — approvers list, label name, isApprover, template protected
- `.claude/guardrails/check-pr.mjs` — authenticated label approval via GitHub API
- `.claude/hooks/guard-shell.mjs` — false-positive fixes, extra blocks
- `.github/workflows/pr-plan-check.yml` — pull_request_target, trusted checker
- `.claude/plans/fix-guardrails-hardening.md` — this plan
- `.claude/README.md` — approval flow and setup steps
- `.claude/skills/work-plan/SKILL.md` — mention the plan-approved label
- `.claude/skills/open-pr/SKILL.md` — mention the plan-approved label
- `.github/pull_request_template.md` — approval checkbox wording
- `CLAUDE.md` — approval rule wording

## Out of scope

- Applying the ruleset, creating labels, changing Actions or environment settings. A human does these (listed in the README).
- `pr-ci.yml`, `settings.json`, `guard-edit.mjs`: no change needed.

## Steps

1. Branch `fix/guardrails-hardening` from `origin/main` with no upstream.
2. Stage the edited files outside the repo; Gaurav copies them in, because the hooks block agents from guardrail files.
3. Test in a throwaway repo:
   - The shell hook allows and blocks the right commands.
   - The checker without a token: it notes the approval label isn't verified.
   - The checker with a token: a failed API call fails the check.
   - Mocked label events: no label, wrong person, valid, plan changed after the label, and label removed.
4. Gaurav reviews this plan, approves it, pushes, and opens the PR.
5. Merge, then do the GitHub setup.

## Risks

- **This PR won't get a "Plan & scope" check at all.** Main's workflow listens for `pull_request`, while this PR's new version listens for `pull_request_target`, so neither copy runs. Mitigation: review it by hand. From the next PR on, the trusted version runs.
- **`pull_request_target` runs with base-repo context.** Mitigation: the token is read-only, no secrets are used, PR code is never executed, and `persist-credentials: false`.
- **Commit dates can be forged** to make a plan edit look older than the label. Mitigation: the label's own timestamp can't be forged, and the code owner reviews the final diff.
- **More API calls**: one paged events call per run, well under rate limits.

## Verification

- `bash test2.sh` passes in a scratch repo:
  - Allowed: `ls CLAUDE.md 2>&1`, a read-only `gh api`, `cp` from a hook file.
  - Blocked: `echo > CLAUDE.md`, `cp` onto a hook, `gh api -f`, `gh label create`, `gh pr edit --add-label plan-approved`.
- Mock-API run of `check-pr.mjs`:
  - Fails for no label, a non-approver, and a removed label.
  - Fails when the plan changed after the label.
  - Passes the approval step for udzialMeansShare labelling after the last plan change.
- After merging, the next PR shows "Plan & scope" with a note on who added the label.

## Rollback

Revert the squash commit through a PR. If `pull_request_target` misbehaves, temporarily remove "Plan & scope" from the ruleset's required checks; it's a repo setting.
