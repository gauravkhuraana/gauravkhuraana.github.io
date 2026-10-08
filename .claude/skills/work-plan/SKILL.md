---
name: work-plan
description: Write the reviewable plan that must exist and be human-approved before any file in this repo changes. Use at the start of every task that will modify the repo (content, code, config), when a guardrails hook says "no plan for branch", or when the user asks to plan, scope or propose a change.
---

# Write a work plan

Every change in this repo starts with a plan in `.claude/plans/` that a human approves. The edit
hook blocks all other edits until then, and CI checks the PR against the plan.

## Steps

1. **Branch.** If on `main`, run:
   `git fetch origin && git switch -c <type>/<topic> origin/main && git branch --unset-upstream`
2. **Research read-only.** Read the files involved, check how similar things were done before, and
   note exact paths. Do not edit anything yet.
3. **Create the plan.** Copy `.claude/plans/TEMPLATE.md` to `.claude/plans/<branch>.md`, with `/`
   replaced by `-` (e.g. `content/gh600-ep4` → `content-gh600-ep4.md`). Fill it in:
   - `branch`: the exact git branch. `author`: you, and who you are working for.
   - `risk`: `high` if Scope touches `.github/`, `package*.json`, `docusaurus.config.ts`,
     `sidebars.ts`, `plugins/`, `scripts/`, `.claude/skills/` or `.claude/agents/`; `medium` for
     shared components, redirects or anything affecting many pages; else `low`.
   - `status: draft` and empty `approved_by`. **Never set these yourself.**
   - **Scope**: one bullet per file or tight glob, path in backticks, then a reason. Include new and
     deleted files. Prefer exact files over folders. No `**` catch-alls.
   - **Steps**: numbered, small, in order. **Verification**: real commands and observable checks.
   - **Risks** and **Rollback**: specific to this change, not boilerplate.
4. **Self-review.** Run the `plan-reviewer` subagent on the plan and fix what it finds.
5. **Stop and hand off.** Tell the user the plan path, give a 3–5 line summary (goal, files, risk),
   and ask the code owner to review and set `status: approved` and `approved_by: <handle>`.
   Mention that CI also needs them to add the `plan-approved` label on the PR, after the
   plan's final version is pushed (re-add it if the plan changes).
   End your turn. Do not start the work in the same turn.

## After approval

- Re-read the plan; it is now locked. Work through the Steps in order.
- If you need a file outside Scope, stop and ask for an amendment. A human sets `status: draft`,
  you edit, and the human re-approves.
- When done, use the `open-pr` skill.
