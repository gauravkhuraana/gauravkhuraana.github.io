# Agentic work guardrails

Every change by an AI agent (and every human PR) follows the same path:

```
branch ─▶ plan (draft) ─▶ human approves plan ─▶ edits within Scope ─▶ PR ─▶ CI gates ─▶ code owner approves ─▶ squash merge ─▶ deploy
```

The layers are independent, so if one fails the next still holds.

| Layer | Where | What it stops |
|---|---|---|
| Agent permissions | `.claude/settings.json` → `permissions` | Editing guardrail files or `.env`, force-push, push to main, `gh pr merge`, `npm run deploy`, bypass-permissions mode. Pushes and PR creation always ask. |
| Edit hook | `.claude/hooks/guard-edit.mjs` | Edits on `main`, edits with no plan or an unapproved plan, edits outside the plan's Scope, sensitive paths without `risk: high`, agents approving plans |
| Shell hook | `.claude/hooks/guard-shell.mjs` | The same through Bash/PowerShell, plus history rewrites, mutating `gh api` calls, repo settings, releases, deploys |
| Session context | `.claude/hooks/session-context.mjs` | The agent "forgetting" the state: it is told the branch, plan and approval status at start |
| Plan | `.claude/plans/<branch>.md` | Unreviewed intent. Nine required sections and a machine-readable Scope |
| PR plan check | `.github/workflows/pr-plan-check.yml` | PRs without an approved plan, scope creep, guardrail changes without the `guardrails-change` label, more than 60 files or 1,500 lines without `large-change`, PR body not linking the plan |
| PR CI | `.github/workflows/pr-ci.yml` | Broken typecheck, SEO, build or feeds; leaked secrets (gitleaks); vulnerable dependencies |
| Code owners | `.github/CODEOWNERS` | Merging without @udzialMeansShare's review |
| Ruleset | `.github/rulesets/main-protection.json` | Direct pushes, force-pushes and deletion of `main`; merging without approval, without resolved threads, or with stale approvals; no bypass for anyone |

The hooks and CI share one rules file, `.claude/guardrails/lib.mjs`, so local behaviour and CI can't drift apart.

## Daily flow

1. Ask the agent for the work. It creates a branch and writes `.claude/plans/<branch>.md` (`work-plan` skill), then stops.
2. Review the plan. Pay most attention to **Scope** (this is what the agent can touch) and **Risks**. To approve, edit the frontmatter yourself:
   ```yaml
   status: approved
   approved_by: udzialMeansShare
   ```
3. The agent does the work, verifies it and opens a draft PR (`open-pr` skill).
4. CI runs. @udzialMeansShare reviews the diff against the plan and approves. Squash-merge.

To change scope mid-way: set `status: draft`, let the agent amend the plan, then re-approve.

## Who can change what

| | Agent | Human |
|---|---|---|
| `.claude/plans/<branch>.md` while `draft` | yes | yes |
| `status: approved`, `approved_by` | **no** | yes |
| Files in an approved plan's Scope | yes | yes |
| Guardrail files: `.claude/settings.json`, `hooks/`, `guardrails/`, `plans/TEMPLATE.md`, `.github/CODEOWNERS`, `workflows/`, `rulesets/`, `CLAUDE.md` | **no** | yes, in a PR with the `guardrails-change` label and a `risk: high` plan |
| Merge, approve, labels, repo settings, deploy | **no** | yes |

## One-time GitHub setup (repo owner)

These are repository settings, so files alone can't apply them.

1. Give @udzialMeansShare **Write** access (Settings → Collaborators). GitHub ignores CODEOWNERS entries for accounts without write access.
2. Create the labels:
   ```bash
   gh label create guardrails-change --color B60205 --description "Human-confirmed change to guardrail files"
   ```
   ```bash
   gh label create large-change --color FBCA04 --description "Human-approved oversized PR"
   ```
3. After this PR merges and the checks have run once, apply the ruleset:
   ```bash
   gh api -X POST repos/gauravkhuraana/gauravkhuraana.github.io/rulesets --input .github/rulesets/main-protection.json
   ```
4. Settings → Environments → `github-pages`: add @udzialMeansShare as a required reviewer, so every deploy needs a click.
5. Settings → Actions → General: set Workflow permissions to **Read repository contents**, and turn off "Allow GitHub Actions to create and approve pull requests".

**Emergency unlock:** Settings → Rules → `main-protection` → Enforcement: Disabled. Turn it back on afterwards.

## Known limits

- Hooks only apply to Claude Code sessions in this repo. Other tools, such as Copilot agent, are held by CI, CODEOWNERS and the ruleset only.
- Shell checks use pattern matching. A determined agent could write files with `node -e`. The CI scope check and human review catch this before `main`.
- `settings.local.json` is personal and untracked. Its `allow` rules can't override the `deny` rules here.
