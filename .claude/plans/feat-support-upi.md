---
title: Add UPI support (reusable SupportBox) and show it on /support, docs, blog posts, /courses and /practice
branch: feat/support-upi
author: claude-opus-5-5 for Gaurav
risk: high
status: approved
approved_by: udzialmeansshare
---

## Goal

Make it easy for readers to support the site, especially Indian readers who prefer UPI to Ko-fi.
A single reusable `<SupportBox />` (UPI QR + copyable UPI ID + mobile UPI deep links, plus Ko-fi and
optional GitHub Sponsors) appears on a rewritten `/support` page and, in a light compact form, at the
end of every doc page, every full blog post, `/courses` and `/practice`. The navbar and footer point
to `/support` instead of straight to Ko-fi. The floating Ko-fi button (`FloatingActions`) deliberately
stays a direct Ko-fi link in this PR.

## Context

Requested by Gaurav in chat (2026-10-12, "Improve Support My Work"). What exists today:

- `src/pages/support.mdx` — Ko-fi only (`<KofiSupport variant="widget" />`), description says "through Ko-fi".
- `src/components/KofiSupport.tsx` — Ko-fi button/widget, hard-codes the Ko-fi URL.
- `src/theme/DocItem/Content/index.tsx` and `src/theme/BlogPostItem/Content/index.tsx` — already
  **wrapped** swizzles that append `<SubscriptionForm />` and support `hide_subscription` front matter;
  the blog one already checks `isBlogPostPage`.
- `docusaurus.config.ts` — navbar item "☕ Buy Me a Coffee" → Ko-fi (line ~524); footer "Support"
  column first item → Ko-fi (line ~617).
- Analytics is **Umami** (`src/utils/analytics.ts`, `src/components/AnalyticsEventTracker.tsx`), not
  gtag/GA. The global tracker already turns `data-analytics-event/label/location` attributes into
  Umami events (`cta_location` param).
- Practice sites (`/test-automation-play`, `/bug-hunt-challenge`, `/practise-api`, `/SQLInjection`)
  are **not in this repo**; they are separate GitHub Pages repos served under the same domain.
- Legal pages (`privacy.tsx`, `terms.tsx`, `cookies.tsx`, `affiliate-disclosure.tsx`) are TSX pages,
  not docs/blog, so the compact box never renders on them.

## Approach

- **One config source:** `src/data/support.ts` exports `UPI_ID`, `UPI_NAME`, `QR_IMAGE`, `KOFI_URL`,
  optional `GITHUB_SPONSORS_URL`, the amounts `[99, 249, 499]`, and a `buildUpiLink(amount?)` helper
  (`upi://pay?pa=…&pn=…&cu=INR[&am=…]&tn=Support%20gauravkhurana.com`). TypeScript, to match the repo.
- **`src/components/SupportBox/`** (`index.tsx` + `styles.module.css`), props `variant: 'full' | 'compact'`
  and `location: string` (for analytics).
  - Headings: compact "Found this useful? Chai's on you ☕"; full "Support my work". One line on what
    support pays for (free practice sites hosting, free courses, videos).
  - UPI block: QR `<img>` with alt text; UPI ID in `<code>` + Copy button (`navigator.clipboard`,
    fallback to selecting the text) with an `aria-live` "Copied!" state for ~2s.
  - Amount buttons ₹99/₹249/₹499/Any amount shown only on touch devices via
    `@media (hover: none) and (pointer: coarse)`; desktop shows "Scan with any UPI app" under the QR.
    Pure CSS, so no SSR/hydration mismatch.
  - International block: Ko-fi button, plus GitHub Sponsors button only when the URL is set.
  - Compact: single row (QR ~96px left, text + actions right), max ~220px tall on desktop, soft border
    using Infima variables, no shadow/animation so it does not read as an ad. On touch devices the QR
    sits behind a "Show QR" toggle (the amount buttons are the main path there). Stacks at 360px.
  - Colours only from Infima/`custom.css` variables, so light and dark both work.
- **Placement in docs/blog:** add `<SupportBox variant="compact" />` to the **existing** wrapped
  `DocItem/Content` and `BlogPostItem/Content` swizzles, just before the newsletter form, gated on
  `hide_support` front matter (and `isBlogPostPage` for blog, which hides it on list and tag pages).
  *Deviation from the brief:* the brief asked to swizzle `DocItem/Footer` and `BlogPostItem/Footer`.
  Rejected because we already wrap the Content components with the same gating logic; a second pair of
  swizzles would add two files and split end-of-post logic across places. Placement is the same
  (end of the article body). Easy to switch if you prefer the Footer.
- **`/support` rewrite (`support.mdx`):** thank-you line → `<SupportBox variant="full" location="support-page" />`
  → "What your support keeps free" (links to `/practice`, `/courses`, YouTube, `/docs/Mentorship/…`) →
  "Can't pay? Help in other ways" (existing share/star/subscribe/newsletter list kept). Description
  and keywords mention UPI. One h1 plus h2 sections only (the current h3s go, per
  `.github/copilot-instructions.md`); the `KofiSupport` import is removed. `hide_support: true` is added
  as requested but is only a marker: `src/pages` pages never render the doc/blog swizzles.
- **`/courses` and `/practice`:** compact box near the bottom. On `/practice`, the existing
  "buying me a coffee" Ko-fi link in the community note is changed to `/support`.
- **Navbar/footer:** navbar item keeps label "☕ Buy Me a Coffee" and its `navbar-kofi-link` class
  (styling unchanged), becomes `to: '/support'`; footer Support column first item becomes
  "☕ Support (UPI / Ko-fi)" → `/support`. The Resources column's existing "Support My Work" →
  `/support` link is kept on purpose (different column, different intent).
- **Emoji exception:** `.github/copilot-instructions.md` says to avoid emojis in navigation. The
  navbar/footer labels and the "Chai's on you ☕" heading use ☕ because Gaurav asked for those exact
  labels; the emoji is decorative text next to a readable label. Approver: confirm or ask to drop it.
- **Tracking:** Umami already exists, so no new tool. Add a rule to `AnalyticsEventTracker.tsx` so
  same-origin `/support/` links emit `support_cta_click` (as `ko-fi.com` links do today), so navbar,
  footer and `/practice` link clicks stay tracked after they stop pointing at Ko-fi. Box events via the
  existing tracker attributes / `trackEvent`: `support_upi_copy`, `support_upi_amount_click` (label = amount), `support_cta_click`
  (Ko-fi, existing name kept so history stays continuous), `support_sponsors_click`. Location values
  (snake_case like existing ones): `blog_post`, `doc_page`, `support_page`, `courses_page`,
  `practice_page`; navbar/footer clicks report their page path, as the tracker does today. The param is the tracker's existing
  `cta_location` (rather than a new `location` key) so all support events are comparable.
- **`.github/FUNDING.yml`** for this repo with `ko_fi`, `custom: ["https://gauravkhurana.com/support/"]`
  and a commented `github:` line.
- **Practice sites:** not in this repo → no change here; listed for Gaurav (see Out of scope).

## Scope

- `src/data/support.ts` — new; single source for UPI/Ko-fi/Sponsors config and UPI link builder
- `src/components/SupportBox/index.tsx` — new; the component
- `src/components/SupportBox/styles.module.css` — new; component styles (light/dark, 360px)
- `static/img/support/upi-qr.png` — QR image Gaurav adds; listed so it can be committed with this PR
- `src/pages/support.mdx` — rewrite order, meta description, `hide_support: true`
- `src/theme/DocItem/Content/index.tsx` — render compact box at end of docs, honour `hide_support`
- `src/theme/BlogPostItem/Content/index.tsx` — render compact box on full post pages only, honour `hide_support`
- `src/components/AnalyticsEventTracker.tsx` — track same-origin `/support/` link clicks as `support_cta_click`
- `src/pages/courses.tsx` — compact box near the bottom
- `src/pages/practice.mdx` — compact box near the bottom; Ko-fi link in community note → `/support`
- `docusaurus.config.ts` — navbar Ko-fi item → `/support`; footer Support column first link only
- `.github/FUNDING.yml` — new; GitHub sponsor button config

## Out of scope

- Algolia, analytics setup (`src/utils/analytics.ts`, Umami script), newsletter form, legal pages — untouched.
- `src/components/KofiSupport.tsx`, `FloatingActions.tsx` (floating Ko-fi button) and the Ko-fi
  entry on `/links` (`src/data/siteLinks.ts`) — left as is; can follow up if you want them to use
  `src/data/support.ts` too.
- CSP in `docusaurus.config.ts` — not changed (`upi://` anchors are navigations, not CSP-governed;
  the QR is same-origin).
- **Practice sites are not in this repo.** The `gk-support-strip` footer must be added in their own
  repos: `gauravkhuraana/test-automation-play`, `gauravkhuraana/practise-api`,
  `gauravkhuraana/SQLInjection`, and the bug-hunt-challenge repo (not in the public repo list; may be
  private or named differently). Stopped here as instructed.
- Adding `FUNDING.yml` to other repos — Gaurav does that himself (list in hand-off).
- `hide_support` on legal pages — they are TSX pages without front matter and never render the box.

## Steps

1. Create `src/data/support.ts` with the config and `buildUpiLink()`. Use the UPI ID Gaurav supplies.
2. Build `src/components/SupportBox/index.tsx` + `styles.module.css` (full + compact, copy button,
   touch-only amount buttons, Show QR toggle, Ko-fi/Sponsors, analytics attributes).
3. Rewrite `src/pages/support.mdx` in the new order with updated description/keywords; one h1 and
   h2 sections only; remove the `KofiSupport` import.
4. Add the compact box to `src/theme/DocItem/Content/index.tsx` and
   `src/theme/BlogPostItem/Content/index.tsx` with `hide_support` gating.
5. Add the compact box to `src/pages/courses.tsx` and `src/pages/practice.mdx`; repoint the
   practice community-note Ko-fi link to `/support`.
6. Update navbar item and footer Support column in `docusaurus.config.ts`; add the `/support/` rule
   to `src/components/AnalyticsEventTracker.tsx`.
7. Create `.github/FUNDING.yml`.
8. Run verification; fix anything it finds within Scope.

## Risks

- **Shared swizzles affect every doc and post** — box is gated by `hide_support` and
  `isBlogPostPage`; checked on a doc, a post, the blog list and a tag page.
- **QR file missing at build time** — Docusaurus does not fail on a missing `<img>` in JSX, but the
  page would show alt text. Mitigation: I won't open the PR until `static/img/support/upi-qr.png` exists.
- **Wrong UPI ID = money to the wrong person** — UPI ID only from Gaurav in chat, defined in one file,
  and the generated `upi://` link is shown in the PR description for him to check.
- **Losing Ko-fi click tracking from navbar/footer** — covered by the new `/support/` tracker rule.
- **QR encodes a different UPI ID than the config** — Gaurav supplies the PNG separately; verification
  decodes it and compares `pa=` with `UPI_ID`.
- **Touch detection** — `(hover: none) and (pointer: coarse)` hides UPI buttons on touch laptops in
  some modes; QR + copy still work there.
- **Broken links** — `onBrokenLinks: 'throw'` catches any wrong internal link in the `/support` rewrite.
- **Ad-like feel / layout shift** — static height, no animation, no sticky/overlay positioning.

## Verification

- `npm run typecheck` passes.
- `npm run build` passes with no broken-link errors.
- Serve the build (`npm run serve -- --port 3111`, the `site-serve` entry in `.claude/launch.json`), then in light and dark mode at desktop width and at
  360px (touch emulation):
  - `/support/` — order is thank-you → full box → "What your support keeps free" → "Can't pay?"; no
    compact box.
  - one doc (e.g. `/docs/intro/`) and one full blog post — compact box at the end, ≤220px tall on desktop.
  - `/blog/` list and a `/blog/tags/…` page — no box.
  - `/courses/` and `/practice/` — compact box near the bottom.
  - Copy button shows "Copied!" and clipboard contains the UPI ID; amount buttons only at touch
    emulation; each `href` matches the expected `upi://pay?…` string; "Any amount" has no `am`.
  - Navbar "☕ Buy Me a Coffee" and footer "☕ Support (UPI / Ko-fi)" go to `/support/`.
  - No horizontal scroll at 360px; no console errors.
  - Umami events: with the Umami script loaded (or `window.umami.track` stubbed in the console), click
    Copy, an amount button, Ko-fi and the navbar link; confirm `support_upi_copy`,
    `support_upi_amount_click`, `support_cta_click` fire with the expected `cta_location`.
- QR check (Gaurav, at review): scan `static/img/support/upi-qr.png` with a phone or decoder and
  confirm `pa=` equals `UPI_ID` in `src/data/support.ts`.
- Screenshots for Gaurav: `/support/`, a doc, a blog post, `/courses/`, `/practice/`, each at desktop
  (1280px) and 360px, in light and dark.

## Rollback

Revert the squash commit on `main`. All changes are additive or confined to the files above;
no URLs change, so no redirects are needed.
