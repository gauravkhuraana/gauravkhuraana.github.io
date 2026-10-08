#!/usr/bin/env node
// PreToolUse hook for Bash | PowerShell.
// Blocks commands that would bypass the PR flow, rewrite history, deploy, change
// repository settings, approve plans, or tamper with guardrail files via the shell.
// This is defence in depth: branch rulesets and CI are the final gate.

import { readFileSync } from 'node:fs';
import { DEFAULT_BRANCHES, PLAN_APPROVED_LABEL, currentBranch, repoRoot } from '../guardrails/lib.mjs';

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
const raw = String(input.tool_input?.command ?? '');
if (!raw.trim()) process.exit(0);

// Drop redirects that never write a real file (2>&1, >/dev/null, 2>$null, >nul) so
// read-only commands that mention guardrail paths are not mistaken for writes.
const cmd = raw.replace(/\d?>&\d|\d?>>?\s*(?:\/dev\/null|\$null|nul)(?=\s|$|[;&|)])/gi, ' ');

const root = repoRoot(input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd());
const branch = currentBranch(root);
const onDefault = DEFAULT_BRANCHES.includes(branch);
const defaults = DEFAULT_BRANCHES.join('|');

const GUARD = String.raw`(?:\.claude[\\/](?:settings\.json|hooks|guardrails|plans[\\/]TEMPLATE\.md)|\.github[\\/](?:CODEOWNERS|workflows|rulesets)|CLAUDE\.md)`;
// Operations that change or remove the path wherever it appears in the command.
const MUTATE = String.raw`(?:>|\bsed\s+-i|\btee\b|Set-Content|Add-Content|Out-File|Remove-Item|Move-Item|Rename-Item|\bmv\b|\brm\b|\bchmod\b|\btruncate\b)`;
const GUARD_RE = new RegExp(GUARD, 'i');

// [pattern, reason]
const RULES = [
  // --- PR-only flow ---
  [new RegExp(`\\bgit\\b[^;&|]*\\bpush\\b[^;&|]*(?:\\s|:|/)(?:${defaults})(?:\\s|$|[;&|])`, 'i'), `pushing to ${DEFAULT_BRANCHES.join('/')} is not allowed; push your branch and open a PR`],
  [/\bgit\b[^;&|]*\bpush\b[^;&|]*(?:\s--force\b|\s-f\b|\s--force-with-lease\b|\s\+\S)/i, 'force-push is not allowed'],
  [/\bgit\b[^;&|]*\bpush\b[^;&|]*\s--(?:delete|mirror|all)\b/i, 'deleting or mirroring remote refs is not allowed'],
  [/--no-verify\b|commit\.gpgsign\s*=\s*false|--no-gpg-sign\b/i, 'skipping hooks or signing is not allowed'],
  [/\bgh\s+pr\s+merge\b/i, 'agents never merge PRs; a code owner merges after approval'],
  [/\bgh\s+pr\s+review\b[^;&|]*--approve\b/i, 'agents cannot approve PRs'],
  [new RegExp(`\\bgh\\s+(?:pr|issue)\\s+(?:edit|create)\\b[^;&|]*--(?:add-label|label)\\b[^;&|]*\\b(?:guardrails-change|large-change|${PLAN_APPROVED_LABEL})\\b`, 'i'), 'only humans apply the guardrails-change, large-change and plan-approved labels'],
  [/\bgh\s+(?:label|repo\s+(?:edit|delete|rename|archive)|secret|variable|auth\s+(?:login|token|refresh))\b/i, 'changing labels, repository settings, secrets or auth is not allowed'],
  // gh api is read-only unless it sets a method or sends fields/input (which defaults to POST).
  [/\bgh\s+api\b[^;&|]*(?:-X\s*|--method[\s=]+)(?:POST|PUT|PATCH|DELETE)\b/i, 'mutating GitHub API calls are not allowed; ask a human'],
  [/\bgh\s+api\b[^;&|]*\s(?:-f|-F|--field|--raw-field|--input)(?:\s|=)/i, 'gh api with fields or input sends a write request; ask a human'],
  [/\bgh\s+api\b[^;&|]*actions\/secrets/i, 'secrets are managed by humans'],
  [/\bgh\s+workflow\s+(?:run|enable|disable)\b|\bgh\s+run\s+(?:rerun|cancel|delete)\b|\bgh\s+release\s+(?:create|delete|edit)\b/i, 'running workflows or cutting releases is not allowed'],
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
  [new RegExp(`${GUARD}[^;&|]*?${MUTATE}|${MUTATE}[^;&|]*?${GUARD}`, 'i'), 'guardrail files may only be changed by a human'],
  // Any checkout/restore that names a guardrail path writes it, with or without a "--".
  [/\bgit\s+(?:checkout|restore)\b[^;&|]*(?:\.claude|\.github|CLAUDE\.md)/i, 'restoring guardrail files from another revision is a human action'],
  // --- secrets ---
  [/(?:^|[\s"'\/\\])\.env(?:\.[\w.-]+)?(?:["'\s]|$)/i, 'reading or writing .env files is not allowed'],
];

for (const [re, reason] of RULES) {
  if (re.test(cmd)) block(reason);
}
// Copying FROM a guardrail file is fine; copying ONTO one is not. Options may appear
// anywhere (`cp a b -f`, `cp -t dir a`), so the destination cannot be found positionally
// by a regex. Compare operands instead: every operand after the first is a destination,
// and -t/--target-directory makes all of them destinations.
function copiesOntoGuardFile(text) {
  for (const seg of text.split(/[;&|]+/)) {
    const m = /\b(?:cp|Copy-Item)\b(.*)/is.exec(seg);
    if (!m) continue;
    const tokens = m[1].trim().split(/\s+/).filter(Boolean)
      .map((t) => t.replace(/^["']+|["']+$/g, ''));
    const inlineTargets = tokens
      .filter((t) => /^--(?:target-directory|Destination)=/i.test(t))
      .map((t) => t.slice(t.indexOf('=') + 1));
    const dirFlag = tokens.some((t) => /^(?:-t|--target-directory|-Destination)$/i.test(t));
    const operands = tokens.filter((t) => !t.startsWith('-'));
    const dests = dirFlag ? operands : operands.slice(1);
    if ([...dests, ...inlineTargets].some((t) => GUARD_RE.test(t))) return true;
  }
  return false;
}
if (copiesOntoGuardFile(cmd)) block('guardrail files may only be changed by a human');
// Commits and bare pushes on the default branch.
if (onDefault && /\bgit\s+(?:commit|merge|rebase|cherry-pick|revert|am)\b/i.test(cmd)) {
  block(`you are on "${branch}". Create a branch first: git switch -c <type>/<topic>`);
}
if (onDefault && /\bgit\s+push\b/i.test(cmd)) block(`you are on "${branch}"; pushing from it is not allowed`);

process.exit(0);
