// Shared guardrail logic used by the local Claude Code hooks (.claude/hooks/*)
// and by CI (.claude/guardrails/check-pr.mjs). No dependencies: Node 18+ only.
//
// Changing this file changes the rules for every agent and every PR, so it is
// itself protected: only a human can edit it (see PROTECTED_HARD below).

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

export const PLANS_DIR = '.claude/plans';
export const PLAN_TEMPLATE = `${PLANS_DIR}/TEMPLATE.md`;
export const DEFAULT_BRANCHES = ['main', 'master'];

// Guardrail infrastructure. Agents may never edit these; a human changes them
// in a PR that carries the `guardrails-change` label and a risk: high plan.
export const PROTECTED_HARD = [
  '.claude/settings.json',
  '.claude/hooks/**',
  '.claude/guardrails/**',
  '.github/CODEOWNERS',
  '.github/workflows/**',
  '.github/rulesets/**',
  'CLAUDE.md',
];

// Sensitive but legitimate agent targets. Allowed only when the plan is risk: high.
export const PROTECTED_HIGH_RISK = [
  '.github/**',
  '.claude/skills/**',
  '.claude/agents/**',
  'package.json',
  'package-lock.json',
  'docusaurus.config.ts',
  'sidebars.ts',
  'plugins/**',
  'scripts/**',
];

// Never readable or writable by an agent.
export const SECRET_PATHS = ['.env', '.env.*', '**/.env', '**/.env.*', '**/*.pem', '**/*.key'];

export const REQUIRED_FRONTMATTER = ['title', 'branch', 'author', 'risk', 'status'];
export const RISK_LEVELS = ['low', 'medium', 'high'];
export const STATUSES = ['draft', 'approved'];
export const REQUIRED_SECTIONS = [
  'Goal',
  'Context',
  'Approach',
  'Scope',
  'Out of scope',
  'Steps',
  'Risks',
  'Verification',
  'Rollback',
];
const MIN_SECTION_CHARS = 20;

// ---------- git ----------

export function git(args, cwd) {
  return execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
}

export function repoRoot(cwd = process.cwd()) {
  try {
    return path.resolve(git(['rev-parse', '--show-toplevel'], cwd));
  } catch {
    return path.resolve(cwd);
  }
}

export function currentBranch(cwd = process.cwd()) {
  try {
    return git(['rev-parse', '--abbrev-ref', 'HEAD'], cwd);
  } catch {
    return '';
  }
}

// ---------- paths & globs ----------

export const toPosix = (p) => p.replace(/\\/g, '/');

/** Repo-relative POSIX path, or null when the file is outside the repo. */
export function relToRepo(file, root) {
  const rel = toPosix(path.relative(root, path.resolve(root, file)));
  if (!rel || rel.startsWith('../') || path.isAbsolute(rel)) return null;
  return rel;
}

export function globToRegExp(glob) {
  let re = '';
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i];
    if (c === '*') {
      if (glob[i + 1] === '*') {
        // `**/` matches zero or more directories; a trailing `**` matches everything below.
        if (glob[i + 2] === '/') { re += '(?:.*/)?'; i += 2; } else { re += '.*'; i += 1; }
      } else {
        re += '[^/]*';
      }
    } else if (c === '?') {
      re += '[^/]';
    } else {
      re += c.replace(/[.+^${}()|[\]\\]/g, '\\$&');
    }
  }
  return new RegExp(`^${re}$`, process.platform === 'win32' ? 'i' : '');
}

export function matchesAny(rel, globs) {
  return globs.some((g) => {
    const glob = toPosix(g).replace(/^\.\//, '').replace(/\/$/, '/**');
    return globToRegExp(glob).test(rel);
  });
}

// ---------- plans ----------

export function branchSlug(branch) {
  return branch.replace(/[^A-Za-z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
}

export function planPathForBranch(branch) {
  return `${PLANS_DIR}/${branchSlug(branch)}.md`;
}

const stripComments = (s) => s.replace(/<!--[\s\S]*?-->/g, '');

export function parsePlan(text) {
  const frontmatter = {};
  let body = text.replace(/^﻿/, '');
  const fm = body.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (fm) {
    for (const line of fm[1].split(/\r?\n/)) {
      const m = line.match(/^([A-Za-z_][\w-]*)\s*:\s*(.*)$/);
      if (m) frontmatter[m[1].toLowerCase()] = m[2].replace(/(?:^|\s+)#.*$/, '').replace(/^["']|["']$/g, '').trim();
    }
    body = body.slice(fm[0].length);
  }

  const sections = {};
  let current = null;
  for (const line of body.split(/\r?\n/)) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) { current = h[1].trim(); sections[current] = ''; continue; }
    if (current) sections[current] += `${line}\n`;
  }

  // Scope entries: the first `backticked` token on each bullet of the Scope section.
  const scope = [];
  for (const line of stripComments(sections.Scope || '').split(/\r?\n/)) {
    const m = line.match(/^\s*[-*]\s+(?:\[[ xX]\]\s+)?`([^`]+)`/);
    if (m) scope.push(toPosix(m[1].trim()).replace(/^\.\//, ''));
  }

  return { frontmatter, sections, scope };
}

export function validatePlan(plan) {
  const errors = [];
  const fm = plan.frontmatter;
  for (const key of REQUIRED_FRONTMATTER) {
    if (!fm[key]) errors.push(`frontmatter: "${key}" is missing or empty`);
  }
  if (fm.risk && !RISK_LEVELS.includes(fm.risk)) errors.push(`frontmatter: risk must be one of ${RISK_LEVELS.join(', ')}`);
  if (fm.status && !STATUSES.includes(fm.status)) errors.push(`frontmatter: status must be one of ${STATUSES.join(', ')}`);
  if (fm.status === 'approved' && !fm.approved_by) errors.push('frontmatter: approved plans need "approved_by"');

  for (const name of REQUIRED_SECTIONS) {
    const content = stripComments(plan.sections[name] ?? '').trim();
    if (plan.sections[name] === undefined) errors.push(`section "## ${name}" is missing`);
    else if (content.length < MIN_SECTION_CHARS || /^(tbd|todo|n\/a)\.?$/i.test(content)) {
      errors.push(`section "## ${name}" is empty or a placeholder`);
    }
  }
  if (plan.scope.length === 0) errors.push('section "## Scope" lists no files (use bullets like - `docs/foo.md` — why)');
  if (plan.scope.some((g) => g === '**' || g === '*' || g === '**/*')) {
    errors.push('Scope may not be a catch-all glob; list the files or folders you will touch');
  }
  return errors;
}

export function loadPlan(root, relPlanPath) {
  const abs = path.join(root, relPlanPath);
  if (!existsSync(abs)) return null;
  const plan = parsePlan(readFileSync(abs, 'utf8'));
  return { ...plan, path: relPlanPath, errors: validatePlan(plan) };
}

/**
 * Decide whether `rel` (repo-relative) may be changed under `plan`.
 * Returns null when allowed, otherwise a human-readable reason.
 */
export function checkFileAgainstPlan(rel, plan) {
  if (rel === plan.path) return null;
  if (matchesAny(rel, SECRET_PATHS)) return `${rel} is a secrets file and may not be changed`;
  if (!matchesAny(rel, plan.scope)) {
    return `${rel} is not in the Scope of ${plan.path}. Ask a human to amend and re-approve the plan.`;
  }
  if (matchesAny(rel, PROTECTED_HIGH_RISK) && plan.frontmatter.risk !== 'high') {
    return `${rel} is a sensitive path; the plan must be "risk: high" to touch it`;
  }
  return null;
}
