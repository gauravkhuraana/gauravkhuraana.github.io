#!/usr/bin/env node
// CI gate for every pull request (human or agent). Run by .github/workflows/pr-plan-check.yml.
//
// Fails the PR when:
//   - there is no plan for the branch, or the plan is incomplete or not approved
//   - any changed file is outside the plan's Scope (scope creep)
//   - a sensitive path changes without a risk: high plan
//   - guardrail infrastructure changes without the human-applied "guardrails-change" label
//   - the diff is larger than the limits without the "large-change" label
//   - the PR description does not link the plan
//
// Env: BASE_SHA, HEAD_SHA, HEAD_REF, PR_BODY, PR_LABELS (JSON array of names), GITHUB_STEP_SUMMARY
// Local dry run: BASE_SHA=origin/main HEAD_SHA=HEAD node .claude/guardrails/check-pr.mjs

import { appendFileSync } from 'node:fs';
import {
  PLANS_DIR, PLAN_TEMPLATE, PROTECTED_HARD, checkFileAgainstPlan, currentBranch, git,
  loadPlan, matchesAny, planPathForBranch, repoRoot,
} from './lib.mjs';

const MAX_FILES = 60;
const MAX_LINES = 1500;

const root = repoRoot();
const base = process.env.BASE_SHA || 'origin/main';
const head = process.env.HEAD_SHA || 'HEAD';
const branch = process.env.HEAD_REF || currentBranch(root);
const body = process.env.PR_BODY ?? null;
let labels = [];
try { labels = JSON.parse(process.env.PR_LABELS || '[]'); } catch { /* none */ }

const errors = [];
const notes = [];

const range = `${base}...${head}`;
const changed = git(['diff', '--name-only', '--no-renames', range], root).split('\n').filter(Boolean);
const numstat = git(['diff', '--numstat', '--no-renames', range], root).split('\n').filter(Boolean);
const changedLines = numstat.reduce((sum, l) => {
  const [a, d] = l.split('\t');
  return sum + (Number(a) || 0) + (Number(d) || 0);
}, 0);
notes.push(`Branch \`${branch}\`: ${changed.length} files, ${changedLines} lines changed.`);

// ---- locate the plan ----
let planPath = planPathForBranch(branch);
let plan = loadPlan(root, planPath);
if (!plan) {
  const candidates = changed.filter((f) => f.startsWith(`${PLANS_DIR}/`) && f.endsWith('.md') && f !== PLAN_TEMPLATE);
  if (candidates.length === 1) {
    planPath = candidates[0];
    plan = loadPlan(root, planPath);
  }
}

if (!plan) {
  errors.push(`No plan found. Expected \`${planPath}\` (copy \`${PLAN_TEMPLATE}\`).`);
} else {
  notes.push(`Plan: \`${planPath}\` — status **${plan.frontmatter.status}**, risk **${plan.frontmatter.risk}**, approved by ${plan.frontmatter.approved_by || '—'}.`);
  for (const e of plan.errors) errors.push(`Plan: ${e}`);
  if (plan.frontmatter.status !== 'approved') errors.push('Plan is not approved. A code owner must set `status: approved` and `approved_by`.');

  for (const f of changed) {
    const reason = checkFileAgainstPlan(f, plan);
    if (reason) errors.push(`Scope: ${reason}`);
  }
}

// ---- guardrail infrastructure ----
const infra = changed.filter((f) => matchesAny(f, PROTECTED_HARD));
if (infra.length) {
  notes.push(`Guardrail files changed: ${infra.map((f) => `\`${f}\``).join(', ')}`);
  if (!labels.includes('guardrails-change')) {
    errors.push('Guardrail files changed. A maintainer must add the `guardrails-change` label to confirm this is intentional.');
  }
  if (plan && plan.frontmatter.risk !== 'high') errors.push('Guardrail changes require a `risk: high` plan.');
}

// ---- size ----
if ((changed.length > MAX_FILES || changedLines > MAX_LINES) && !labels.includes('large-change')) {
  errors.push(`Diff is large (${changed.length} files / ${changedLines} lines; limits ${MAX_FILES} / ${MAX_LINES}). Split the PR or have a maintainer add the \`large-change\` label.`);
}

// ---- PR description links the plan ----
if (body !== null && plan) {
  const file = planPath.split('/').pop();
  if (!body.includes(file)) errors.push(`PR description must link the plan (\`${planPath}\`).`);
}

// ---- report ----
const summary = [
  '## Plan & scope check',
  '',
  ...notes.map((n) => `- ${n}`),
  '',
  errors.length ? `### ${errors.length} problem(s)` : '### All plan and scope checks passed',
  ...errors.map((e) => `- ${e}`),
  '',
].join('\n');

if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
console.log(summary);
for (const e of errors) console.log(`::error::${e.replace(/`/g, '')}`);
process.exit(errors.length ? 1 : 0);
