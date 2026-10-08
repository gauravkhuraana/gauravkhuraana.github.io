#!/usr/bin/env node
// PreToolUse hook for Bash | PowerShell.
// Blocks commands that would bypass the PR flow, rewrite history, deploy, change
// repository settings, approve plans, or tamper with guardrail files via the shell.
// This is defence in depth: branch rulesets and CI are the final gate.

import { readFileSync } from 'node:fs';
import { DEFAULT_BRANCHES, currentBranch, repoRoot } from '../guardrails/lib.mjs';

const block = (msg) => {
  process.stderr.write(`[guardrails] BLOCKED: ${msg}\n`);
  process.exit(2);
};

let input;
try {
  input = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  block('could not parse hook input; refusing to run an unverified command');
}
const cmd = String(input.tool_input?.command ?? '');
if (!cmd.trim()) process.exit(0);

const root = repoRoot(input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd());
const branch = currentBranch(root);
const onDefault = DEFAULT_BRANCHES.includes(branch);
const defaults = DEFAULT_BRANCHES.join('|');

// [pattern, reason]
const RULES = [
  // --- PR-only flow ---
  [new RegExp(`\\bgit\\b[^;&|]*\\bpush\\b[^;&|]*(?:\\s|:|/)(?:${defaults})(?:\\s|$|[;&|])`, 'i'), `pushing to ${DEFAULT_BRANCHES.join('/')} is not allowed; push your branch and open a PR`],
  [/\bgit\b[^;&|]*\bpush\b[^;&|]*(?:\s--force\b|\s-f\b|\s--force-with-lease\b|\s\+\S)/i, 'force-push is not allowed'],
  [/\bgit\b[^;&|]*\bpush\b[^;&|]*\s--(?:delete|mirror|all)\b/i, 'deleting or mirroring remote refs is not allowed'],
  [/--no-verify\b|commit\.gpgsign\s*=\s*false|--no-gpg-sign\b/i, 'skipping hooks or signing is not allowed'],
  [/\bgh\s+pr\s+merge\b/i, 'agents never merge PRs; a code owner merges after approval'],
  [/\bgh\s+pr\s+review\b[^;&|]*--approve\b/i, 'agents cannot approve PRs'],
  [/\bgh\s+pr\s+(?:edit|create)\b[^;&|]*--(?:add-label|label)\b[^;&|]*\b(?:guardrails-change|large-change)\b/i, 'only humans apply the guardrails-change / large-change labels'],
  [/\bgh\s+(?:repo\s+(?:edit|delete|rename|archive)|secret|variable|ruleset|auth\s+(?:login|token|refresh))\b/i, 'changing repository settings, secrets or auth is not allowed'],
  [/\bgh\s+api\b[^;&|]*(?:-X\s*|--method\s+)(?:POST|PUT|PATCH|DELETE)\b/i, 'mutating GitHub API calls are not allowed; ask a human'],
  [/\bgh\s+api\b[^;&|]*\b(?:rulesets|protection|collaborators|hooks|actions\/secrets)\b/i, 'repository protection and secrets are managed by humans'],
  [/\bgh\s+workflow\s+(?:run|enable|disable)\b|\bgh\s+release\s+(?:create|delete|edit)\b/i, 'running workflows or cutting releases is not allowed'],
  // --- deploys bypass the PR entirely ---
  [/\b(?:npm|pnpm|yarn)\s+(?:run\s+)?deploy\b|\bdocusaurus\s+deploy\b|\bgh-pages\b|\bnpm\s+publish\b/i, 'deploys happen only from main via GitHub Actions'],
  // --- destructive history / working-tree operations ---
  [/\bgit\s+reset\s+--hard\b/i, 'git reset --hard discards work; ask a human'],
  [/\bgit\s+clean\s+-[a-z]*f/i, 'git clean -f deletes untracked files; ask a human'],
  [/\bgit\s+(?:filter-branch|filter-repo|update-ref\s+-d|reflog\s+expire)\b/i, 'history rewriting is not allowed'],
  [new RegExp(`\\bgit\\s+branch\\s+-[dD]\\s+(?:${defaults})\\b`, 'i'), 'deleting the default branch is not allowed'],
  [/\bgit\s+config\b[^;&|]*\b(?:core\.hooksPath|user\.(?:name|email))\b/i, 'changing git identity or hooks is not allowed'],
  [/\brm\s+-[a-z]*r[a-z]*f?\s+(?:\/|~|\.|\*|"?\$CLAUDE_PROJECT_DIR"?)(?:\s|$)|\bRemove-Item\b[^;&|]*-Recurse[^;&|]*\s(?:\.|\*|\\|\/)(?:\s|$)/i, 'recursive delete of the repo root is not allowed'],
  // --- plan approval and guardrail files via the shell ---
  [/status\s*:\s*["']?approved|approved_by[ \t]*:[ \t]*[^\s#'"]/i, 'agents cannot approve plans'],
  [/(?:\.claude[\\/](?:settings\.json|hooks|guardrails)|\.github[\\/](?:CODEOWNERS|workflows|rulesets)|CLAUDE\.md)[^;&|]*?(?:>|\bsed\s+-i|Set-Content|Add-Content|Out-File|Remove-Item|\bmv\b|\bcp\b|\brm\b|Move-Item|Copy-Item)|(?:>|\bsed\s+-i|Set-Content|Add-Content|Out-File|Remove-Item|\bmv\b|\bcp\b|\brm\b|Move-Item|Copy-Item)[^;&|]*?(?:\.claude[\\/](?:settings\.json|hooks|guardrails)|\.github[\\/](?:CODEOWNERS|workflows|rulesets)|CLAUDE\.md)/i, 'guardrail files may only be changed by a human'],
  // --- secrets ---
  [/(?:^|[\s"'\/\\])\.env(?:\.[\w.-]+)?(?:["'\s]|$)/i, 'reading or writing .env files is not allowed'],
];

for (const [re, reason] of RULES) {
  if (re.test(cmd)) block(reason);
}

// Commits and bare pushes on the default branch.
if (onDefault && /\bgit\s+(?:commit|merge|rebase|cherry-pick|revert|am)\b/i.test(cmd)) {
  block(`you are on "${branch}". Create a branch first: git switch -c <type>/<topic>`);
}
if (onDefault && /\bgit\s+push\b/i.test(cmd)) block(`you are on "${branch}"; pushing from it is not allowed`);

process.exit(0);
