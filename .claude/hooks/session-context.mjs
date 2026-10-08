#!/usr/bin/env node
// SessionStart / UserPromptSubmit hook. Prints the current guardrail state so the
// agent always knows which branch it is on, which plan governs it, and whether it
// may edit yet. Stdout is added to Claude's context. Never blocks.

import { readFileSync } from 'node:fs';
import {
  DEFAULT_BRANCHES, currentBranch, loadPlan, planPathForBranch, repoRoot,
} from '../guardrails/lib.mjs';

let input = {};
try { input = JSON.parse(readFileSync(0, 'utf8')); } catch { /* optional */ }

const root = repoRoot(input.cwd || process.env.CLAUDE_PROJECT_DIR || process.cwd());
const branch = currentBranch(root);
const lines = ['[guardrails] Agentic work rules are active (see CLAUDE.md).'];

if (DEFAULT_BRANCHES.includes(branch)) {
  lines.push(`Branch: ${branch} (default). Edits are blocked. Create a branch, then write a plan with the work-plan skill.`);
} else {
  const planPath = planPathForBranch(branch);
  const plan = loadPlan(root, planPath);
  if (!plan) {
    lines.push(`Branch: ${branch}. No plan yet at ${planPath}. Write one with the work-plan skill, then stop for approval.`);
  } else if (plan.errors.length) {
    lines.push(`Branch: ${branch}. Plan ${planPath} is incomplete: ${plan.errors.join('; ')}.`);
  } else if (plan.frontmatter.status !== 'approved') {
    lines.push(`Branch: ${branch}. Plan ${planPath} is awaiting human approval. Do not edit files outside .claude/plans/.`);
  } else {
    lines.push(`Branch: ${branch}. Plan ${planPath} approved by ${plan.frontmatter.approved_by} (risk: ${plan.frontmatter.risk}).`);
    lines.push(`In scope: ${plan.scope.join(', ')}`);
  }
}

process.stdout.write(`${lines.join('\n')}\n`);
