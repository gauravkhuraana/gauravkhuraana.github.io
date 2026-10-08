# CLAUDE.md

Docusaurus 3 site for gauravkhurana.in. Content, tone and component rules are in
`.github/copilot-instructions.md` (local file); follow them when it exists.

# How agentic work happens here

These rules are enforced by hooks (`.claude/hooks/`), CI (`.github/workflows/pr-*.yml`) and the
`main-protection` ruleset. A block is the system working, not something to route around.

1. **Branch first.** Never work on `main`. Use `git switch -c <type>/<topic>` from `origin/main`,
   then `git branch --unset-upstream` so a bare `git push` cannot target `main`.
   Types: `feat`, `fix`, `content`, `docs`, `chore`.
2. **Plan before you touch anything.** Use the `work-plan` skill to write
   `.claude/plans/<branch-with-slashes-as-dashes>.md` from `.claude/plans/TEMPLATE.md`.
   Fill every section. List every file you will touch in **Scope**.
3. **Stop for approval.** Leave `status: draft`. Ask the code owner (@udzialMeansShare) to review.
   They approve twice: `status: approved` / `approved_by` in the file (unlocks local edits) and the
   `plan-approved` label on the PR (the only approval CI trusts). Never write either yourself or
   apply that label; the hooks block it, and trying is a policy breach.
4. **Stay in scope.** You can only edit files listed in the plan's Scope. If you need another file,
   stop, explain why, and ask for the plan to be amended and re-approved. Do not edit files through
   the shell to get around the edit hook.
5. **Verify.** Run what the plan's Verification section says (at least `npm run typecheck` and
   `npm run build` for code or config changes) and report results honestly.
6. **PR only.** Use the `open-pr` skill. Never push to `main`, force-push, merge, approve, add the
   `guardrails-change` / `large-change` / `plan-approved` labels, run deploys, or change repository settings.
7. **Guardrail files are human-only:** `.claude/settings.json`, `.claude/hooks/`, `.claude/guardrails/`,
   `.claude/plans/TEMPLATE.md`, `.github/CODEOWNERS`, `.github/workflows/`, `.github/rulesets/`, `CLAUDE.md`.

When blocked, quote the `[guardrails]` message to the user and wait. See `.claude/README.md` for the full design.
