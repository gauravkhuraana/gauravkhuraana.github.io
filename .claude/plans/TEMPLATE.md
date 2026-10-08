---
title: <one-line summary of the change>
branch: <type>/<topic>            # must match the git branch; file name is the branch with "/" -> "-"
author: <agent or person who wrote the plan, e.g. claude-opus-5-5 for Gaurav>
risk: low                          # low | medium | high (high is required for .github/, package*.json, docusaurus.config.ts, sidebars.ts, plugins/, scripts/, .claude/skills|agents/)
status: draft                      # draft | approved — only a human code owner sets "approved"
approved_by:                       # GitHub handle of the approver, filled by the approver
---

<!--
How to use
1. Copy this file to .claude/plans/<branch-with-slashes-as-dashes>.md (e.g. feat/new-course -> feat-new-course.md).
2. Fill every section. HTML comments do not count; each section needs real content.
3. Stop. A code owner reviews, then sets status: approved and approved_by.
4. Only files matched by the Scope list can be edited, locally (hooks) and in CI.
5. Need a file that is not in Scope? Stop and ask for the plan to be amended and re-approved.
-->

## Goal

<!-- What outcome do we want, and for whom? One short paragraph. -->

## Context

<!-- Why now? Link the issue, conversation, analytics or bug. What exists today (with file paths)? -->

## Approach

<!-- The chosen design in a few bullets, and the alternatives you rejected with one line each on why. -->

## Scope

<!--
Every file or folder this change may touch, one per bullet, path in backticks, then why.
Globs are allowed (`docs/AI/**`), catch-alls are not (`**`). Include files you will create or delete.
Example:
- `docs/AI/new-page.md` — new page
- `src/components/VideoCta/**` — tweak CTA layout
-->

## Out of scope

<!-- Things a reviewer might expect but this PR deliberately does not do. -->

## Steps

<!-- Ordered, checkable steps. Each should be small enough to review on its own. -->
1.

## Risks

<!-- What could break (SEO, links, build, layout, data, security) and how each risk is mitigated. -->

## Verification

<!-- Exact commands and observable checks. e.g. npm run typecheck, npm run build, page X renders Y at mobile width. -->

## Rollback

<!-- How to undo if this is wrong in production: revert the squash commit, redirect, flag, etc. -->
