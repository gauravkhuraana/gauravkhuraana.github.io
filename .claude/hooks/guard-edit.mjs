#!/usr/bin/env node
// PreToolUse hook for Edit | Write | MultiEdit | NotebookEdit.
// Enforces "plan first, human approves, stay in scope" before any file in the repo changes.
// Exit 2 blocks the tool call and shows stderr to Claude; exit 0 allows it.

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import {
  DEFAULT_BRANCHES, PLANS_DIR, PLAN_TEMPLATE, PROTECTED_HARD, SECRET_PATHS,
  checkFileAgainstPlan, currentBranch, loadPlan, matchesAny, parsePlan,
  planPathForBranch, relToRepo, repoRoot,
} from '../guardrails/lib.mjs';

const block = (msg) => {
  process.stderr.write(`[guardrails] BLOCKED: ${msg}\n`);
  process.exit(2);
};

let input;
try {
  input = JSON.parse(readFileSync(0, 'utf8'));
} catch {
  block('could not parse hook input; refusing to allow an unverified edit');
}

const toolInput = input.tool_input ?? {};
const target = toolInput.file_path ?? toolInput.notebook_path;
if (!target) process.exit(0);

const root = repoRoot(input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd());
const rel = relToRepo(target, root);
if (rel === null) process.exit(0); // outside the repo (scratchpad, memory, etc.)

if (matchesAny(rel, PROTECTED_HARD)) {
  block(`${rel} is guardrail infrastructure. Only a human may change it (PR labelled "guardrails-change").`);
}
if (matchesAny(rel, SECRET_PATHS)) block(`${rel} is a secrets file.`);

const newText = [toolInput.content, toolInput.new_string, toolInput.new_source,
  ...(toolInput.edits ?? []).map((e) => e.new_string)].filter(Boolean).join('\n');

// ---- Plan files: the agent may draft and revise, but never approve. ----
if (rel.startsWith(`${PLANS_DIR}/`)) {
  if (rel === PLAN_TEMPLATE) block('the plan template is maintained by humans.');
  const abs = path.join(root, rel);
  if (existsSync(abs) && parsePlan(readFileSync(abs, 'utf8')).frontmatter.status === 'approved') {
    block(`${rel} is approved and locked. Ask a human to set "status: draft" before revising it.`);
  }
  if (/^\s*status\s*:\s*["']?approved/im.test(newText) || /^\s*approved_by[ \t]*:[ \t]*[^\s#]/im.test(newText)) {
    block('agents cannot approve plans. Leave "status: draft" and ask the code owner to review and approve.');
  }
  process.exit(0);
}

// ---- Everything else needs a branch, an approved plan, and scope. ----
const branch = currentBranch(root);
if (!branch || branch === 'HEAD') block('detached HEAD. Create a working branch first.');
if (DEFAULT_BRANCHES.includes(branch)) {
  block(`you are on "${branch}". Create a branch (e.g. git switch -c feat/<topic>) and write a plan first.`);
}

const planPath = planPathForBranch(branch);
const plan = loadPlan(root, planPath);
if (!plan) {
  block(`no plan for branch "${branch}". Use the work-plan skill to create ${planPath} from ${PLAN_TEMPLATE}, then stop and ask for approval.`);
}
if (plan.errors.length) block(`plan ${planPath} is incomplete:\n  - ${plan.errors.join('\n  - ')}`);
if (plan.frontmatter.status !== 'approved') {
  block(`plan ${planPath} is "${plan.frontmatter.status}". Stop and ask the code owner to review and approve it before editing files.`);
}

const reason = checkFileAgainstPlan(rel, plan);
if (reason) block(reason);
process.exit(0);
