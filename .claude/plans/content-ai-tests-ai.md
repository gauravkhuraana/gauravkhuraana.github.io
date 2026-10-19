---
title: Add unlisted /ai-tests-ai setup page for the AutomationSTAR 2026 tutorial
branch: content/ai-tests-ai
author: claude-opus-5-5 for Gaurav
risk: low
status: approved
approved_by: udzialmeansshare
---

## Goal

Give attendees of Gaurav's AutomationSTAR 2026 hands-on tutorial ("Poison Kills Poison: AI Tests AI",
Antwerp, 4 November 2026) one page at `https://gauravkhurana.com/ai-tests-ai/` that walks them through
laptop setup the week before. The page is unlisted: reachable only by direct link, not indexed, not in
the sitemap or site search, and not linked from navigation, footer, blog or feeds.

## Context

- Brief supplied by Gaurav in chat on 2026-10-19 (full page copy, components and checks). The copy is
  used as written; only formatting is adapted to the site.
- Existing standalone pages live in `src/pages/` as TSX + CSS module (e.g. `src/pages/courses.tsx`,
  `src/pages/courses.module.css`) using `@theme/Layout`, so the page gets the normal navbar and footer.
- `docusaurus.config.ts` has `trailingSlash: true`, so the page is served at `/ai-tests-ai/`.
- Sitemap: `@docusaurus/plugin-sitemap` (3.10) already drops any route whose Helmet head has a robots
  `noindex` meta (`isNoIndexMetaRoute` in `node_modules/@docusaurus/plugin-sitemap/lib/head.js`), so no
  config change is needed.
- Site search: `docusaurus-lunr-search` only indexes pages that contain `article .markdown`
  (`node_modules/docusaurus-lunr-search/src/html-to-doc.js`). A TSX page that does not render that
  structure is never indexed, so no `excludeRoutes` config change is needed.
- RSS/Atom feeds only cover blog posts, so a page in `src/pages/` never appears there.
- Link targets on the page (all from the brief):
  - External, new tab: `https://github.com/gauravkhuraana/shopkart-ai-tutorial-v2`,
    `https://github.com/gauravkhuraana/shopkart-ai-tutorial-v2/blob/main/PRE_CONFERENCE.md`,
    `https://github.com/gauravkhuraana/shopkart-ai-tutorial-v2/blob/main/TROUBLESHOOTING.md`,
    `https://console.groq.com/keys`, `https://www.linkedin.com/in/gauravkhuraana/`,
    `https://www.youtube.com/@Udzial?sub_confirmation=1`.
  - Internal, via `Link`: `/connect/` (`src/pages/connect.mdx`), `/docs/AI/sdet-ai-roadmap/`
    (`docs/AI/sdet-ai-roadmap.mdx`), `/docs/AI/agentic-ai/` (`docs/AI/agentic-ai.mdx`),
    `/docs/AI/prompt-library/` (`docs/AI/prompt-library.mdx`), `/courses/` (`src/pages/courses.tsx`),
    `/practice/` (`src/pages/practice.mdx`), `/newsletter/` (`src/pages/newsletter.tsx`).
  - Email is shown as obfuscated text only (`gaurav [dot] khuraana [at] gmail [dot] com`), no `mailto:`.

## Approach

- New React page `src/pages/ai-tests-ai.tsx` with a page-specific CSS module, built from Infima
  classes and site CSS variables so it follows light/dark theme.
- `<Head>` sets: exact browser title `Get ready · Poison Kills Poison: AI Tests AI` (overriding the
  site's title suffix), the brief's meta description, `og:title`/`og:description`, and
  `<meta name="robots" content="noindex, nofollow">`.
- Sections in brief order: hero; "What we'll do together"; two path cards (CSS grid, two columns,
  one column under 768px, card A marked "Recommended"); Path A as an ordered list plus the Path B
  paragraph, Ollama note and a button to `PRE_CONFERENCE.md`; highlighted CTA box (LinkedIn, /connect,
  obfuscated email text, troubleshooting link); "Your week" checklist rendered as a plain visual list
  with empty check boxes (not interactive inputs); card grid of 7 links with intro and closing line.
- Headings: one h1 (page title) and h2 for each section, per `.github/copilot-instructions.md`
  (no h3). Hero kicker and "Get ready before the tutorial" are styled paragraphs, not headings.
- External links (GitHub, Groq, LinkedIn, YouTube) use `target="_blank" rel="noopener noreferrer"`.
  Links to this site (`/connect/`, `/docs/AI/...`, `/courses/`, `/practice/`, `/newsletter/`) use
  Docusaurus `Link` with relative paths so they stay in-site and are checked by the build's broken-link
  detection.
- No emojis.
- The page must not render an `<article>` containing an element with class `markdown` (including
  borrowing Infima's `markdown` typography class), because that is what lunr search indexes.
- Rejected: an MDX page (`src/pages/ai-tests-ai.mdx`) — MDX pages render inside `article .markdown`
  and would be picked up by lunr search, forcing a `docusaurus.config.ts` change (high risk).
- Rejected: adding the route to `sitemap.ignorePatterns` / lunr `excludeRoutes` in
  `docusaurus.config.ts` — not needed (see Context) and would raise this to high risk.
- Rejected: `Disallow: /ai-tests-ai/` in `robots.txt` — it would stop crawlers from reading the
  noindex tag and would publicly list the URL.

## Scope

- `src/pages/ai-tests-ai.tsx` — new unlisted page
- `src/pages/ai-tests-ai.module.css` — styles for the new page (path cards, steps, CTA box, checklist, card grid)
- `.claude/plans/content-ai-tests-ai.md` — this plan

## Out of scope

- Any link to the page from navbar, footer, homepage, blog, docs, `/links` or other pages.
- YouTube playlist cards (the brief marks them optional, pending playlist URLs from Gaurav).
- Removing the site-wide `robots: index, follow` head tag in `docusaurus.config.ts` (see Risks).
- Changes to the shopkart-ai-tutorial-v2 repository.

## Steps

1. Create `src/pages/ai-tests-ai.module.css` with classes for hero, path-card grid (stacks below
   768px), numbered steps, CTA box, checklist and link-card grid, using `--ifm-*` variables.
2. Create `src/pages/ai-tests-ai.tsx`: `Layout` + `Head` (title, description, OG tags, robots
   noindex/nofollow) and all sections with the brief's copy verbatim.
3. Run `npm run typecheck` and `npm run build`; fix any errors or broken-link warnings.
4. Check the built output: `build/ai-tests-ai/index.html` exists and contains the noindex meta and the
   exact title; `build/sitemap.xml` has no `ai-tests-ai`; the lunr search index files in `build/` have
   no `ai-tests-ai`; no other built HTML page links to `/ai-tests-ai`.
5. Run `npm run serve`, open `http://localhost:3000/ai-tests-ai/` and check it at desktop and 375px
   widths, in light and dark mode.
6. Open the PR with the `open-pr` skill.

## Risks

- **Duplicate robots meta.** `docusaurus.config.ts` injects a site-wide raw `<meta name="robots"
  content="index, follow">` that Helmet cannot override, so this page will carry both tags. Google and
  Bing apply the most restrictive directive, so `noindex, nofollow` wins. If Gaurav wants a single
  clean tag, that needs a separate high-risk plan to move the global tag into `themeConfig.metadata`.
- **Page leaks into sitemap or search.** Mitigated by the build-output checks in Step 4; if either
  check fails, stop and propose a plan amendment for `docusaurus.config.ts`.
- **Broken links.** Internal links are checked by the Docusaurus build (`onBrokenLinks`); external
  links are checked by hand in Verification.
- **Layout on phones.** Path cards and link grid must stack; checked at 375px.
- **Exact title.** Helmet's last `<title>` wins; checked in built HTML.

## Verification

Shell commands below are POSIX; run them in Git Bash on Windows.

- `npm run typecheck` passes.
- `npm run build` passes with no new broken-link warnings.
- `grep -c 'noindex, nofollow' build/ai-tests-ai/index.html` returns at least 1, and the same grep on
  `build/index.html` returns 0 (noindex is on this page only).
- `grep -c 'ai-tests-ai' build/sitemap.xml` returns 0.
- `grep -l 'ai-tests-ai' build/search-doc*.json build/lunr-index*.json` returns nothing, and the
  build log's lunr "indexed N documents" count is unchanged from a build of `main`.
- `grep -rl --include=*.html 'ai-tests-ai' build | grep -v '^build/ai-tests-ai/'` returns nothing
  (not linked from any other page).
- `grep -o '<title[^>]*>[^<]*</title>' build/ai-tests-ai/index.html` shows exactly
  `Get ready · Poison Kills Poison: AI Tests AI` (the `·` may appear as `&middot;` or `&#183;`).
- In the browser at `http://localhost:3000/ai-tests-ai/` (`npm run serve`): page renders with navbar and footer; path cards side by side on
  desktop and stacked at 375px; light and dark modes readable; external links open in a new tab.
- Each external link returns a page (GitHub repo, PRE_CONFERENCE.md, TROUBLESHOOTING.md,
  console.groq.com/keys, LinkedIn, YouTube) and each internal link resolves.

## Rollback

Before the event: revert the squash commit; the page and its CSS are self-contained and nothing else
references them. After the link has gone out to attendees (and after 4 November 2026), do not simply
delete the page: keep it, or replace it with a redirect to a relevant page (a redirect needs its own
plan because it touches `docusaurus.config.ts`).
