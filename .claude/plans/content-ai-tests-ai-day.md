---
title: Add unlisted /ai-tests-ai/day/ on-the-day page for the AutomationSTAR 2026 tutorial
branch: content/ai-tests-ai-day
author: claude-opus-5-5 for Gaurav
risk: low
status: approved
approved_by: udzialMeansShare
---

## Goal

Give attendees of Gaurav's AutomationSTAR 2026 tutorial ("Poison Kills Poison: AI Tests AI",
Antwerp, 4 November 2026, 09:00 CET) one phone-friendly page at
`https://gauravkhurana.com/ai-tests-ai/day/`, opened from a QR code on a slide, with everything they
need during the session: the three ways to run the labs, the files, copy-paste commands for their OS,
the 9 step READMEs and where to get help. Like `/ai-tests-ai/`, the page is unlisted: not indexed, not
in the sitemap or site search, and linked only from `/ai-tests-ai/` (which it links back to).
On `/ai-tests-ai/` itself, tell people that the day will mostly use Path B (Codespaces), so they set up
both, and show Gaurav's Codespaces setup video next to the two path cards.

## Context

- Brief supplied by Gaurav in chat on 2026-10-25 (full page copy, components and checks). The copy and
  every command are used exactly as written; only formatting is adapted to the site.
- The sibling page exists: `src/pages/ai-tests-ai.tsx` + `src/pages/ai-tests-ai.module.css` (plan
  `.claude/plans/content-ai-tests-ai.md`, merged in PR 22/23). It uses `@theme/Layout`, a `<Head>` with
  exact title, description, OG tags and `noindex, nofollow`, a hero (`.hero`, `.kicker`, `.heroSub`),
  two path cards with a Recommended-style accent border and badge, and external links in a new tab.
- Routing: `docusaurus.config.ts` has `trailingSlash: true`; a file at `src/pages/ai-tests-ai/day.tsx`
  is served at `/ai-tests-ai/day/` and coexists with `src/pages/ai-tests-ai.tsx` (`/ai-tests-ai/`).
- Sitemap: `@docusaurus/plugin-sitemap` drops routes whose head has a robots `noindex` meta (verified
  for the sibling page), so no config change.
- Search: `docusaurus-lunr-search` only indexes `article .markdown`; a TSX page that does not render
  that is never indexed. `@theme/Tabs` and `@theme/CodeBlock` do not render it.
- Feeds only cover blog posts.
- Components available without config changes: `@theme/CodeBlock` (built-in copy and word-wrap
  buttons) and `@theme/Tabs` / `@theme/TabItem` (`groupId` remembers the visitor's choice in
  `localStorage` and syncs all tab sets on the page).
- Prism: `docusaurus.config.ts` sets no `additionalLanguages`, so `powershell` and `bat` blocks get no
  syntax colours (plain text). Copy is unaffected. Adding languages would need a high-risk config
  change, so it is out of scope.
- `.github/copilot-instructions.md`: only h1 and h2 headings (no h3), no emojis.

## Approach

- New page `src/pages/ai-tests-ai/day.tsx` with a small CSS module `src/pages/ai-tests-ai/day.module.css`.
  It imports the sibling's `../ai-tests-ai.module.css` for the shared hero, section, path-card and
  badge styles, so the two pages look the same; the new module only adds what is new.
- `<Head>`: exact title `On the day · Poison Kills Poison: AI Tests AI`, the brief's meta description,
  `og:title` / `og:description`, `<meta name="robots" content="noindex, nofollow">`.
- Sections in brief order, each an `h2` with an `id` for the jump-to menu:
  1. Hero: kicker, h1, sub line, intro, then the small "Not set up yet?" link to `/ai-tests-ai/`
     (Docusaurus `Link`) and the jump-to menu (anchor links: Three ways `#three-ways`, Files `#files`,
     Common commands `#commands`, Steps `#steps`, Stuck? `#stuck`).
  2. Three way cards (CSS grid, three columns, one column under 996px; deliberately wider than the
     sibling's 768px two-card breakpoint because three columns are too narrow at tablet width), card 1 with the accent border
     and a **Recommended** badge; button links as in the brief; the "Not sure? Use Codespaces." line.
  3. Comparison table "Which one is for me?".
  4. Small callout "Two rules that prevent most problems".
  5. "Way 1", "Way 2", "Way 3" sections as ordered lists (Way 1 includes the `check_setup.py` block
     and its bullet notes).
  6. Files table (file, purpose, link).
  7. Common commands: intro line, then one sub-block per brief subsection. Sub-block titles are
     styled paragraphs, not h3 (heading rule). OS-specific commands sit in `Tabs` with
     `groupId="os"`, default `windows`, labels `Windows (PowerShell)` and `Mac · Linux · Codespaces`.
     "Both tabs" commands are shown once, outside the tabs. Every command is its own `CodeBlock`
     (`language` `powershell`, `bash` or `bat` as in the brief). The tip about Ctrl+/ closes the section.
  8. Steps table with Part 1 / Part 2 group rows (`colSpan`), one README link per row.
  9. Highlighted "Stuck?" box (same treatment as the sibling's CTA box), contact links, closing line.
- Commands are stored as `String.raw` template constants so backslashes are copied exactly. None of
  them contains `${` or a backtick, so nothing is interpolated and no template ends early
  (`$($_.OwningProcess)`, `$_` and `$(lsof ...)` are literal). The expected commands are listed in the
  Appendix and checked character for character in Verification.
- Section headings use `<Heading as="h2" id="...">` from `@theme/Heading` (as the sibling does), so
  jump-to links get the sticky-navbar scroll offset and the anchors are registered for Docusaurus's
  broken-anchor check.
- All external links (GitHub, Codespaces, Groq, GitHub settings, LinkedIn) use
  `target="_blank" rel="noopener noreferrer"`. `/ai-tests-ai/` and `/connect/` use `Link` so the build
  checks them. The brief's `gauravkhurana.com/connect` is rendered as the in-site `/connect/` link.
- Tables sit in a wrapper with `overflow-x: auto`, so a wide table scrolls inside itself and the page
  never scrolls sideways on a phone.
- Stuck? point 3 contains the placeholder `[HOSTED_BOT_URL]`. Default: leave point 3 out until Gaurav
  gives the hosted bot URL (the brief allows this). If he gives it before implementation, include it
  with the real URL.
- Sibling page edit: in `src/pages/ai-tests-ai.tsx`, add a slim banner directly under the hero:
  "It's tutorial day? Go to the on-the-day page →" linking to `/ai-tests-ai/day/` via `Link`, plus a
  `.dayBanner` style in `src/pages/ai-tests-ai.module.css`. Update the header comment in
  `ai-tests-ai.tsx` ("Keep it unlinked...") to say it links only to `/ai-tests-ai/day/`, and add a
  comment at the top of `ai-tests-ai.module.css` that `ai-tests-ai/day.tsx` also uses its classes.
  `day.tsx` gets a matching header comment (unlisted, linked only from `/ai-tests-ai/`). Nothing else
  on that page changes, apart from the Path B changes below.
- Sibling page, Path B on the day (requested by Gaurav in chat, 2026-10-25): on the day the tutorial
  will mostly use Path B (Codespaces), so the page tells people to set up both, with B as the one used
  on the day and A as the backup. Copy changes in the "Set up both paths" section of
  `src/pages/ai-tests-ai.tsx`:
  - Intro paragraph becomes: "Set up both before the day. On the day we will mostly use Path B
    (Codespaces), and Path A on your laptop is your backup."
  - Path B badge "Backup" becomes "On the day" and Path B gets the accent border
    (`pathCardRecommended`); Path A badge "Main" becomes "Backup" (`badgeBackup` style) and loses the
    accent border. Card order (A, then B) and card bullets stay as they are.
  - Note under the cards becomes: "If your work laptop blocks installs, Path B alone is enough. It
    only needs a browser."
  - Directly under the note, embed Gaurav's Codespaces setup video
    (`https://youtu.be/02J7Apgxek0`, YouTube title "Setup For Conference Via CodeSpaces - Option B")
    with the existing `@site/src/components/YouTubeEmbed` (`videoId="02J7Apgxek0"`, as used on
    `src/pages/about.tsx`): it shows a thumbnail and only loads the `youtube-nocookie.com` player on
    click. A one-line caption above it: "Watch: setting up Path B in Codespaces, step by step." A small
    wrapper style limits its width to the section.
  - The day page already recommends Codespaces, so the two pages now agree.
- No emojis. The ▶ character in the copy is kept (it is a play symbol, not an emoji, and is the label
  people see in VS Code).
- Rejected: an MDX page — renders inside `article .markdown`, so lunr would index it.
- Rejected: duplicating "Both tabs" commands inside each tab — doubles the copy buttons with no gain.
- Rejected: adding Prism `powershell` / `batch` languages — needs `docusaurus.config.ts` (high risk)
  for colours only.

## Scope

- `src/pages/ai-tests-ai/day.tsx` — new unlisted on-the-day page
- `src/pages/ai-tests-ai/day.module.css` — styles for the new components (three-card grid, tables,
  jump-to menu, callout, Stuck? box, command sub-blocks)
- `src/pages/ai-tests-ai.tsx` — add the banner under the hero linking to `/ai-tests-ai/day/`; make
  Path B the on-the-day path (copy and badges) and embed the Codespaces setup video
- `src/pages/ai-tests-ai.module.css` — banner style and video wrapper style
- `.claude/plans/content-ai-tests-ai-day.md` — this plan

## Out of scope

- Any link to `/ai-tests-ai/day/` from navbar, footer, homepage, blog, docs, `/links` or any page other
  than `/ai-tests-ai/`.
- Prism language additions or any `docusaurus.config.ts` change (including the site-wide
  `robots: index, follow` tag noted in the sibling plan's Risks).
- Changes to the shopkart-ai-tutorial-v2 repository, or making it public (Gaurav's pre-event check).
- A QR code image.

## Steps

1. Create `src/pages/ai-tests-ai/day.module.css` (three-card grid stacking under 996px, table wrapper,
   jump-to menu, callout, Stuck? box, command sub-block spacing), using `--ifm-*` variables so light
   and dark both work.
2. Create `src/pages/ai-tests-ai/day.tsx`: `Layout` + `Head`, command constants, and all sections in
   brief order with the copy verbatim.
3. Add the banner to `src/pages/ai-tests-ai.tsx` under the hero and update its header comment; add
   the banner style and the "shared with day.tsx" comment to `src/pages/ai-tests-ai.module.css`.
4. In `src/pages/ai-tests-ai.tsx`, apply the Path B copy and badge changes and add the
   `YouTubeEmbed` video under the note, with its wrapper style in `src/pages/ai-tests-ai.module.css`.
5. Run `npm run typecheck` and `npm run build`; fix errors and broken-link warnings.
6. Check the built output (see Verification): noindex, title, sitemap, search index, inbound links.
7. Run `npm run serve`, open `/ai-tests-ai/day/` and `/ai-tests-ai/`, check desktop and 375px, light
   and dark, tab switching and persistence, copy buttons, links and the video.
8. Open the PR with the `open-pr` skill.

## Risks

- **A command is copied wrong** (lost backslash, quote or `$`): the worst failure for attendees.
  Mitigated by `String.raw` constants and a browser check that reads every code block's text and
  compares it to the brief's commands character for character.
- **Duplicate robots meta**: the site-wide `index, follow` tag also appears; search engines apply the
  stricter `noindex, nofollow` (same as the sibling page).
- **Page leaks into sitemap, search or other pages**: checked in built output; if the sitemap or
  search check fails, stop and propose an amendment.
- **Phone layout**: cards stack, tables scroll inside their wrapper, the long PowerShell port command
  scrolls inside its code block (word-wrap button available). Checked at 375px.
- **Tabs on first load**: server HTML shows the Windows tab; a visitor who chose Mac sees it switch on
  hydration. Acceptable.
- **Placeholder shipped by mistake**: `[HOSTED_BOT_URL]` is not rendered unless a real URL is given;
  Verification greps for it.
- **Sibling page change**: one banner only; its existing checks (noindex, sitemap) are re-run.
- **Mixed message about which path to use**: attendees who already set up only Path A may worry.
  The copy keeps "set up both" and calls A the backup, not wrong; the day page's "Not sure? Use
  Codespaces" line matches.
- **Video embed**: `YouTubeEmbed` is already used on `/about/`; it loads only a thumbnail from
  `i.ytimg.com` until clicked, then the privacy-enhanced `youtube-nocookie.com` player, so no extra
  cookies or page weight on load.
- **Shared CSS coupling**: `day.tsx` uses the sibling's `.hero`, `.kicker`, `.heroSub`, `.section`,
  `.pathGrid`, `.pathCard`, `.badge` and `.cta` classes, so a later edit there changes both pages.
  Mitigated by a comment at the top of `ai-tests-ai.module.css` naming `day.tsx`.

## Verification

Shell commands below are POSIX; run them in Git Bash on Windows.

- `npm run typecheck` passes.
- `npm run build` passes with no new broken-link or broken-anchor warnings.
- `grep -c 'noindex, nofollow' build/ai-tests-ai/day/index.html` returns at least 1, and so does
  `grep -c 'noindex, nofollow' build/ai-tests-ai/index.html` (sibling unchanged).
- `grep -o '<title[^>]*>[^<]*</title>' build/ai-tests-ai/day/index.html` shows exactly
  `On the day · Poison Kills Poison: AI Tests AI` (the `·` may be an entity).
- `grep -c 'ai-tests-ai' build/sitemap.xml` returns 0 (covers both the new page and the sibling).
- `grep -l 'ai-tests-ai' build/search-doc*.json build/lunr-index*.json` returns nothing.
- `grep -rl --include=*.html 'ai-tests-ai/day' build | grep -v '^build/ai-tests-ai/'` returns nothing
  (linked only from `/ai-tests-ai/` and itself). This checks rendered HTML pages, which is where links
  appear; route names inside JS bundles are not links and are not checked.
- `grep -c 'HOSTED_BOT_URL' build/ai-tests-ai/day/index.html` returns 0.
- `grep -c 'ai-tests-ai/day/' build/ai-tests-ai/index.html` returns at least 1 (banner present).
- In the browser at `http://localhost:3000/ai-tests-ai/day/` (`npm run serve`):
  - navbar and footer present; three cards side by side on desktop, stacked at 375px; card 1 shows
    Recommended; no horizontal page scroll at 375px; light and dark readable.
  - every jump-to link scrolls to its section.
  - tabs default to Windows; choosing Mac switches every tab set and is kept after reload.
  - every code block has a copy button; a script collects each `pre code` element's `textContent`
    (all tab panels, in page order, de-duplicated) and compares the list to the Appendix exactly:
    same count, same order, every character equal (backslashes, quotes and `$` intact).
  - every external link has `target="_blank"`; each URL in the brief returns a page (Codespaces,
    notebook, both command files, 9 step READMEs, TROUBLESHOOTING.md, plant_bug_README.md, solutions,
    README, console.groq.com/keys, github.com/settings/codespaces, LinkedIn); `/connect/` and
    `/ai-tests-ai/` resolve. GitHub links will 404 while the repo is private; report which.
- At `/ai-tests-ai/`: the banner sits directly under the hero and links to `/ai-tests-ai/day/`.
- At `/ai-tests-ai/`: Path B shows the "On the day" badge and accent border, Path A shows "Backup";
  the intro and note read as in Approach; the video thumbnail appears directly under the note, plays
  `02J7Apgxek0` on click, and fits the screen at 375px.
- `grep -c '02J7Apgxek0' build/ai-tests-ai/index.html` returns at least 1.

## Rollback

Before the event: revert the squash commit; the new page, its CSS and the banner are self-contained.
After the QR code has been shown (4 November 2026), do not delete the page: keep it, or replace it with
a redirect, which needs its own plan because it touches `docusaurus.config.ts`.

## Appendix: expected commands

Copied from Gaurav's brief (2026-10-25), one command per line, in page order. Every code block on the
page must match one line exactly.

```text
python check_setup.py
cd C:\Users\YourName\Downloads\shopkart-ai-tutorial-v2
cd ~/Downloads/shopkart-ai-tutorial-v2
.venv\Scripts\Activate.ps1
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
.venv\Scripts\activate.bat
source .venv/bin/activate
cd build\step5_agent
uvicorn app:app --reload
cd build/step5_agent
cd ..\..
cd ../..
python checkpoint.py step3
python plant_bug.py liar
python plant_bug.py off
pytest evaluate -v
python -m http.server 8080 --directory evaluate
Get-NetTCPConnection -LocalPort 8000 -State Listen -ErrorAction SilentlyContinue | ForEach-Object { Get-CimInstance Win32_Process -Filter "ParentProcessId=$($_.OwningProcess)" | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }; Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }
kill $(lsof -ti :8000) 2>/dev/null
deactivate
```

`python check_setup.py` appears twice (Way 1 and "Am I ready?") and `uvicorn app:app --reload` twice
(Windows and Mac tabs); the de-duplicated list above is what the script compares.
