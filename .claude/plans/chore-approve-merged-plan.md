---
title: Record the code owner's approval on the merged chore/agentic-guardrails plan
branch: chore/approve-merged-plan
author: claude-opus-5 for Gaurav Khurana
risk: low
status: approved
approved_by: udzialmeansshare
---

## Goal

Commit the code owner's own edit to `.claude/plans/chore-agentic-guardrails.md`, which records
retroactively that he approved the plan behind the already-merged PR #15. Housekeeping only: it
leaves the plan archive honest about what was approved and by whom.

## Context

Gaurav edited that file by hand in the working tree during the `fix/guardrails-hardening` session,
flipping its frontmatter from draft to approved in his own name. PR #15 had already merged, so the
edit changes no behaviour and gates nothing — it only backfills the record.

The edit could not ride along on `fix/guardrails-hardening`: `checkFileAgainstPlan` exempts only a
branch's own plan file, so an eleventh file in that diff would have failed the Scope check with
"is not in the Scope of .claude/plans/fix-guardrails-hardening.md" and muddied a PR whose whole
subject is tightening these rules. Hence a separate branch cut from `origin/main`.

This plan is `status: draft` and its `approved_by` is deliberately empty. The agent that wrote it
cannot fill either in; both are the code owner's to set, and the hooks block an agent from trying.

## Approach

Branch from `origin/main`, carry the existing working-tree edit across untouched, and commit it
together with this plan. Nothing is rewritten: the frontmatter change is exactly as Gaurav typed
it, and the agent's role is limited to staging and committing it.

Rejected: amending the `fix/guardrails-hardening` plan's Scope to admit the file. An agent widening
the Scope of an already-approved plan is precisely the move the guardrails exist to prevent, and
under the new rules an edit to an approved plan invalidates its label until the approver re-adds it.

## Scope

- `.claude/plans/chore-agentic-guardrails.md` — the code owner's frontmatter edit, committed verbatim
- `.claude/plans/chore-approve-merged-plan.md` — this plan

## Out of scope

- The frontmatter's content or wording. It is the code owner's text and is committed as written.
- Any guardrail file, workflow, hook or site content. None is touched on this branch.
- Anything belonging to PR #16, which stays at its approved ten files.

## Steps

1. Branch `chore/approve-merged-plan` from `origin/main`, upstream unset so a bare push cannot
   target `main`.
2. Write this plan and leave it `status: draft` for the code owner.
3. Stage only the two files in Scope and commit with a `chore:` message.
4. Stop. Gaurav reviews, approves, and decides whether this is worth a PR of its own or should
   simply ride along the next housekeeping change.

## Risks

- **Approval recorded after the fact.** The file now claims an approval that was typed well after
  PR #15 merged, so the archive reads tidier than the history actually was. Mitigation: this plan
  and its commit message both say plainly that the approval is retroactive.
- **A plan file flipping to approved is exactly the pattern the hardening work distrusts.** Here it
  is safe only because a human authored the edit and it gates nothing already merged. Mitigation:
  the diff is two lines and the code owner reviews it.
- **Low practical risk otherwise**: no code, config or content changes, so nothing can break at
  build or deploy time.

## Verification

- `git diff --cached` shows exactly two files and, for the pre-existing one, only the two
  frontmatter lines the code owner edited.
- `BASE_SHA=origin/main HEAD_SHA=HEAD node .claude/guardrails/check-pr.mjs` reports both files
  inside Scope, no protected path touched, and no problem other than the plan awaiting approval.
- No typecheck or build run: this branch changes no code, config or site content, so neither would
  tell us anything.

## Rollback

Delete the branch, or revert the single commit. Nothing is pushed, merged or deployed by this plan,
and the file's previous state is in `origin/main`, so recovery is `git switch main` and nothing else.
