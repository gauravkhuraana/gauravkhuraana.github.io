---
title: Add /about/ page with talks, hackathon and contest wins, recognition and certifications
branch: content/about-achievements
author: claude-opus-5-5 for Gaurav
risk: low
status: draft
approved_by:
---

## Goal

Give visitors, event organisers and recruiters one page at `https://gauravkhurana.com/about/` that
shows who Gaurav is and the proof behind it: conference talks, hackathon and contest wins, industry and
Microsoft recognition, podcast and channel appearances, and certifications. Each item has a visual
(certificate, badge, speaker card or video thumbnail) and, where one exists, a link to the source.

## Context

- Requested by Gaurav in chat on 2026-10-19. References for the general idea (not to be copied):
  testingtitbits.com `/about-me/`, `/contest-wins/`, `/mytalks/`, `/guest-blogs-software-testing-rahul-parwal/`.
  The useful patterns are a stats row, wins grouped by type with a visual plus a placement label, and
  talk cards with a thumbnail that links out.
- No about page exists today: `src/pages/` has no `about.*`, and `docusaurus.config.ts` has no `/about`
  route. Existing standalone pages are TSX plus a CSS module using `@theme/Layout` and `@theme/Heading`
  (for example `src/pages/courses.tsx`, `src/pages/courses.module.css`), with page data kept in
  `src/data/*.ts` (for example `src/data/socialProof.ts`).
- Sources of facts (only these are used; nothing is invented):
  - The LinkedIn profile export (PDF supplied in chat): Senior Test Consultant at Microsoft (now Sr Consultant
    App Dev, Sep 2026), 15+ years in testing, "Tester of the Year 2022", TestMu AI Spartan since Aug
    2023, Topmate mentor since Jan 2023, MS Software Systems at BITS Pilani, certifications (ISTQB,
    Azure AI Fundamentals, Azure Developer Associate, Microsoft Global Hackathon 2023), honours (ABCD,
    Techie of the Week, SEE Spotlight Employee Excellence), 99tests: 101 bugs, level 9, 3 contests won.
  - Certificates in Gaurav's local certificates folder (supplied for this task):
    - ATA AI Test Hackathon 2026: 1st place (team win).
    - The Test Chat "So You Think You Can Hack?" AI hackathon, 18–19 Jul 2026: joint winner (three-way tie).
    - UiPath AI-Driven No-Code Automation Hackathon (UiPath x The Test Tribe), 26–27 Apr 2025: winner,
      Mobile Automation Challenge (team "The Autopilot Gang").
    - Microsoft AI Odyssey: one of the top 5 completions from GDC and part of the top 11.
    - askui Test Innovation Challenge 2022: 2nd place.
    - ACCELQ Automation Hackathon 2.0, 13–14 Nov 2021: 1st place (powered by The Test Tribe).
    - ACCELQ Automation Hackathon, 1–2 May 2021: 3rd place, team "TTT Believers" (organised by The Test Tribe).
    - BrowserStack Testathon, Noida, 26 Jul 2025: 1st place, team "Thinkers" (winner announcement image;
      place and team confirmed by Gaurav in chat on 2026-10-19).
    - Cignithon (Cigniti x The Test Tribe): 1st prize, team "Believers", project Cometa.Rocks.
    - Moolympics #2 "Experimenting with selectors && beliefs" (Moolya), Feb 2021: 2nd place.
    - The Test Chat "So You Think You Can Test?" (TestProject x Bugasura), 17 Oct 2021: 1st runner-up.
    - MCAPS Q4 Skills Challenge: Skills Champion (Microsoft badge).
    - Salesforce Testing Guy podcast: thank-you trophy for the guest appearance.
    - CP-SAT Selenium Summit 2021, 6 Feb 2021: speaker ("Super cool daily chores with Selenium").
    - TestMu Conf 2026 speaker card.
  - Conference pages (checked 2026-10-19):
    - TestMu Conf 2026: "You Can't assertEquals an Agent: A Tester's Guide to Agentic Quality", 20 Aug
      2026, 60-minute talk with a live demo.
    - Automation Guild 2026: "A Playwright Visual Regression Runner: 39 lines of TypeScript", 13 Feb 2026.
    - BrowserStack Breakpoint 2026 (12–14 May 2026, virtual): listed as a speaker. Title confirmed by
      Gaurav: "Prompt Injection is the new SQL injection".
    - ATA AI Test Fest 2026: listed as a speaker. Title confirmed by Gaurav: "From Flaky to Bulletproof:
      Teaching AI to Smell Bad Test Patterns". No date on the page, so none is shown.
  - Confirmed by Gaurav in chat (2026-10-19): Tester of the Year 2022 was awarded by The Test Chat, a
    testing community. Co-winners are not named; team results say "team win".
  - Already on the site: "Poison Kills Poison: AI Tests AI" tutorial at AutomationSTAR 2026, Antwerp,
    4 Nov 2026 (`src/pages/ai-tests-ai.tsx`).
  - YouTube playlist `PLUlzmYT8n_5uW9rA866zOjYi8Ibn2AQHc` ("Testing Careers Podcast — Gaurav Khurana",
    talks and collaborations; IDs from the playlist RSS feed), including TestFlix 2024 "Principles of
    Responsible AI" (`suYhl_8N_8Y`), Selenium Summit 21 (`qh4iPNKgRCg`), SelectorsHub User Story #5
    (`invpTNsKZ3A`), The Test Chat "TTC Turns 3" (`kiJUM2cfHGQ`), the Testing Roundtable and its part 2
    (`eNgLr-ge4Ow`, `QVWVQjISTn0`), the Testing Ethics podcast parts 1 and 2 (`yWe7qcKdqeI`, `VlFdPIxcPB4`),
    Four for Fore chapter 3 (`MG3BN9JgWkg`) and "Unlock the Secrets to Community Involvement" (`pO0FuOxX29w`).
    The IDs are re-checked against `https://www.youtube.com/watch?v=<id>` titles while the data file is built.

## Approach

- One new React page, `src/pages/about.tsx`, with a CSS module, served at `/about/`
  (`trailingSlash: true`). All entries live in a typed data file, `src/data/achievements.ts`, so adding
  a win or talk later means adding one object. No component changes elsewhere.
- Sections, each an h2 under a single h1 (no h3, per `.github/copilot-instructions.md`):
  1. Hero: name, role, a two-line bio from the profile, the existing photo
     `static/img/gauravkhurana-optimized.webp`, and buttons to `/connect/` and Topmate.
  2. Stats row: 15+ years in testing, number of hackathon and contest wins, number of talks. The counts
     are computed from the data file so they cannot drift.
  3. Speaking: talk cards, newest first, showing the event, title, date, format (talk, tutorial,
     workshop, training) and a link to the event page or recording.
  4. Hackathon and contest wins: cards with a certificate image, a placement badge ("1st place",
     "Winner", "2nd place", "1st runner-up"), the event, the organiser and the date.
  5. Recognition: Tester of the Year 2022 (The Test Chat), Microsoft honours (SEE, ABCD, Techie of the Week, Skills
     Champion, AI Odyssey), the Salesforce Testing Guy podcast trophy and the 99tests beta tester record.
  6. On other channels: one featured talk (TestFlix 2024, `suYhl_8N_8Y`) embedded with the existing
     `src/components/YouTubeEmbed.tsx` plus a "Watch on YouTube" button, as the site's YouTube rule
     requires. The remaining podcast and collaboration videos are shown as thumbnail cards
     (`https://i.ytimg.com/vi/<id>/hqdefault.jpg`; the CSP `img-src https:` allows these) that link to
     YouTube in a new tab, followed by a link to the full playlist. This is a deliberate exception to the
     "always embed" rule for the secondary videos, because ten or more iframes would make the page heavy.
     The code owner signs off on it by approving this plan.
  7. Certifications: a compact list (ISTQB, Azure AI Fundamentals AI-900, Azure Developer Associate).
  8. Closing CTA: invite people to ask about a talk, workshop or mentoring through `/connect/`.
- Images: selected certificates are resized to a maximum width of 1200 px and converted to WebP
  (using `sharp`, already in `node_modules`, run from the scratchpad, not added as a script), then saved
  as `static/img/achievements/<slug>.webp`. They are shown with `loading="lazy"`, a fixed aspect ratio
  and descriptive `alt` text.
- Responsive card grid: 3 columns on desktop, 2 on tablet, 1 under 600 px. Built from site CSS
  variables so light and dark themes both work. No emojis.
- SEO: the `<Layout>` title is "About Gaurav Khurana: talks, wins and recognition". `<Head>` sets a meta
  description, `<meta name="keywords">`, and `og:image` to the absolute PNG
  `https://gauravkhurana.com/img/gauravkhurana.png`, because LinkedIn does not render WebP OG images.
  `src/pages/memes.tsx` uses the same pattern.
- Discoverability: one entry, `{title: 'About Gaurav', href: '/about/'}`, is added to the "Start Here"
  group in `src/data/siteLinks.ts`, so the page shows on `/links/`. The navbar and footer follow in a
  separate plan.
- All earlier open facts are now confirmed (see Context). Co-winners are never named; team results
  show the team name and a "Team win" label. Any detail with no source (for example, a date that is
  not given) is left out rather than guessed.
- Deliberately not used: `luminary award_gk_2024.jpg` and `5yearsAtMicrosoft.png` (photos or internal
  Microsoft material), `lordOfThePings.png` (internal fun award), and participation-only or course-completion
  certificates (TAU, LinkedIn Learning, webinars). They add noise rather than proof.
- Rejected alternatives:
  - Four separate pages, like the reference site. That is more navigation to maintain, and a single page
    with anchored sections serves the "send one link to an organiser" case better.
  - An MDX page. Structured cards and computed stats are cleaner in TSX with a data file.
  - Embedding YouTube iframes. That is heavy, and thumbnails with links match the reference pattern.

## Scope

- `src/pages/about.tsx`: the new page
- `src/pages/about.module.css`: page styles (hero, stats, card grids, badges)
- `src/data/siteLinks.ts`: add one `/about/` entry to the "Start Here" group
- `src/data/achievements.ts`: typed data for talks, wins, recognition, appearances and certifications
- `static/img/achievements/*.webp`: new optimised certificate, badge and speaker-card images (about 15 files)
- `.claude/plans/content-about-achievements.md`: this plan

## Out of scope

- Adding `/about/` to the navbar or footer. That needs `docusaurus.config.ts`, which is a high-risk
  change, so it goes in a separate follow-up plan once the page content is signed off.
- Linking to the page from the homepage, `/connect/` or blog author pages. The only inbound link is the
  `/links/` entry.
- Changes to `src/pages/ai-tests-ai.tsx` or any existing page.
- Hosting the original PDFs, or any certificate that is participation-only.

## Steps

1. Convert the selected certificates in the local certificates folder to WebP (max width
   1200 px, quality 80) in `static/img/achievements/`, using a sharp script kept in the scratchpad.
2. Write `src/data/achievements.ts` with types (`Talk`, `Win`, `Recognition`, `Appearance`,
   `Certification`) and entries taken only from the Context sources. Unconfirmed facts are omitted.
3. Write `src/pages/about.tsx`: Layout, the SEO head (title, description, keywords, PNG og:image), the hero,
   the featured `YouTubeEmbed`, stats computed from the data, and the
   section components rendering the data arrays.
4. Write `src/pages/about.module.css`: responsive grid, cards and badges, using theme CSS variables.
5. Add the `/about/` entry to the "Start Here" group in `src/data/siteLinks.ts`.
6. Run the checks in Verification, fix any issues, then open the PR with the `open-pr` skill.

## Risks

- Inaccurate claims on a public profile page. Mitigation: every entry traces to a certificate, the
  profile PDF or an event page listed in Context; unconfirmed items are left out; Gaurav reviews the
  rendered page before merge.
- Showing other people's names or faces. Mitigation: no group photos; co-winner names are never shown
  (Gaurav chose "team win"); the certificate images chosen show only his name or team results already
  published by the organisers.
- Page weight. Mitigation: WebP at no more than 1200 px, lazy loading, thumbnails instead of iframes.
  Target: each image under 200 KB and under 2 MB in total.
- Broken external links. Mitigation: external URLs come from the pages checked in Context; internal
  links use `Link`, so `onBrokenLinks: 'throw'` catches them at build time.
- Route clash. Mitigation: `/about/` does not exist today (checked `src/pages/`, `docs/` and the config).

## Verification

- `npm run typecheck` passes.
- `npm run build` passes, with no broken-link errors.
- Run the dev server, open `/about/`, and check:
  - Every section renders, the counts in the stats row match the data, and all images load with no
    console errors.
  - At 375 px wide the layout is one column with no horizontal scroll; at desktop width it is three columns.
  - Dark mode keeps text and cards readable.
  - There is exactly one h1, no h3, and no emojis.
- `Get-ChildItem static/img/achievements/*.webp | Measure-Object Length -Sum -Maximum`: the sum is
  under 2 MB and the maximum is under 200 KB.
- `Test-Path build/about/index.html` is True after the build.
- `Select-String -Path src/pages/about.tsx -Pattern 'as="h3"|<h3'` returns nothing.
- `(Select-String -Path build/about/index.html -Pattern '<h1' -AllMatches).Matches.Count` is 1.
- `/links/` lists the "About Gaurav" entry, and it opens `/about/`.
- For every YouTube ID in `src/data/achievements.ts`, the `https://i.ytimg.com/vi/<id>/hqdefault.jpg`
  thumbnail loads (not the grey placeholder), and the card title matches the video title on YouTube.
- Screenshots (desktop and mobile) are attached to the PR for Gaurav's review.

## Rollback

Revert the squash commit. The page and its images are new, self-contained files, and the only inbound link is the `siteLinks.ts` entry in the same commit, so reverting removes `/about/`
with no side effects.
