---
title: Add Jev series videos 3 (Ollama) and 4 (Microsoft Decision-1) to AI Models & Concepts
branch: content/ai-models-jev-videos
author: claude-opus-5-5 for Gaurav
risk: low
status: draft
approved_by:
---

## Goal

Readers of https://gauravkhurana.com/docs/AI/ai-models-concepts see the full decision-model series in
order: the two existing Jev videos (1, 2), then the new Ollama video as video 3 and the Microsoft
Decision-1 video as video 4, each with a short summary in the page's existing style.

## Context

Requested by Gaurav in chat on 2026-10-12.

- Video 3: https://www.youtube.com/watch?v=_9U4DBDfJ8Q, "Run Jev-Style Decision Models Locally with
  Ollama (Free)". Covers installing Ollama, pulling a local decision model, `ollama serve`, calling it
  from a Postman collection and from code, and using confidence scores to triage flaky tests. Zero cost,
  no API key.
- Video 4: https://www.youtube.com/watch?v=1eIPVi-3FZQ, "Microsoft Decision-1 vs Jev: Which Decision
  Model to Use?". Deploys Decision-1 in Microsoft Foundry, playground demo with JSON input and scores,
  then the same test-failure triage through Decision-1 and GPT-5.2 in code ($10 vs $1,100 per million
  triages in the demo, ~85 ms latency). Also available on OpenRouter.

Today `docs/AI/ai-models-concepts.mdx` has one `## Decision Models: Jev` section with two `###` videos
(`uxME5BHvtRI`, `qL5ytieGdhs`). The new videos' YouTube descriptions already link to anchors on this page:
`#decision-models-jev` (video 3) and `#what-is-jev-system-1-ai-explained` (video 4). Those anchors must
not change. Only `src/data/siteLinks.ts` references the page URL, and it is unaffected.

## Approach

- Append two `###` subsections after the existing two in `## Decision Models: Jev`, in order 3 then 4,
  each with a 1–2 sentence summary and a `<YouTubeEmbed>` using the video's YouTube title, matching the
  existing pattern.
- Keep existing heading text unchanged (no `1.`–`4.` prefixes), because adding numbers would change the
  `#what-is-jev-system-1-ai-explained` anchor that video 4's description links to. Order on the page
  gives the 3/4 sequence.
- **Deliberate exception to the "h1/h2 only, no h3" rule** in `.github/copilot-instructions.md`: the page
  already uses `###` for its two videos, and a published anchor (`#what-is-jev-system-1-ai-explained`) is
  an h3. New videos follow the same `###` pattern for consistency. Converting the page to h2 is out of scope.
- Broaden the section intro by one sentence: decision models can also run free locally (Ollama) and
  Microsoft now has its own (Decision-1 in Foundry).
- Frontmatter: add `ollama`, `microsoft-decision-1`, `microsoft-foundry` to `keywords`
  (`decision-models` already exists). Replace `description` with (150 chars):
  "New AI models explained for testers: Jev and Microsoft Decision-1 decision models vs LLMs, running them free with Ollama, and QA use cases with demos."
- Key Takeaways: add one bullet: "**Decision models can be cheap or free.** Run them locally with Ollama at
  no cost, and in the Decision-1 demo a million test-failure triages cost about $10 vs $1,100 with GPT-5.2"
  (both claims from the videos' descriptions; Decision-1 description also states output tokens aren't charged).
- Rejected: a new `##` section for Decision-1. It is the same series and the user asked for "video 4"
  of this list; one section keeps the TOC tidy.

## Scope

- `docs/AI/ai-models-concepts.mdx` — add videos 3 and 4, intro sentence, frontmatter keywords/description, one takeaway bullet
- `.claude/plans/content-ai-models-jev-videos.md` — this plan

## Out of scope

- Renaming or numbering existing headings, changing the TOC entry (still one section).
- Cross-linking from `docs/AI/microsoft-foundry.mdx` (could be a follow-up).
- OG image, sidebar, `src/data/siteLinks.ts`.
- The unrelated untracked `.claude/plans/content-video-series-indexing.md` (left as is).

## Steps

1. Update frontmatter `description` and `keywords` in `docs/AI/ai-models-concepts.mdx`.
2. Add one sentence to the `## Decision Models: Jev` intro.
3. Add `### Run Jev-Style Decision Models Locally with Ollama` + summary + `<YouTubeEmbed videoId="_9U4DBDfJ8Q"
   title="Run Jev-Style Decision Models Locally with Ollama (Free)" />`.
4. Add `### Microsoft Decision-1 vs Jev: Which Decision Model to Use?` + summary + `<YouTubeEmbed videoId="1eIPVi-3FZQ"
   title="Microsoft Decision-1 vs Jev: Which Decision Model to Use?" />` (exact YouTube titles).
5. Add the cost bullet to Key Takeaways.
6. Verify, then open a PR with the `open-pr` skill.

## Risks

- Anchor drift breaking links in the YouTube descriptions: mitigated by not touching existing headings;
  checked in the built HTML.
- MDX parse errors (e.g. `$` or `<` in text): content is plain prose; `npm run build` catches it.
- Factual errors in summaries: summaries only restate claims from the videos' own descriptions.

## Verification

- `npm run typecheck` passes.
- `npm run build` succeeds with no new broken-link or MDX warnings for this page.
- Anchors still exist:
  `grep -oE 'id="(decision-models-jev|what-is-jev-system-1-ai-explained)"' build/docs/AI/ai-models-concepts/index.html`
  prints both ids.
- Embed order: `grep -oE 'uxME5BHvtRI|qL5ytieGdhs|_9U4DBDfJ8Q|1eIPVi-3FZQ' build/docs/AI/ai-models-concepts/index.html | uniq`
  prints the four ids in that order.
- The page's Table of Contents still lists exactly one section (`Decision Models: Jev`), since no `##` is added.

## Rollback

Revert the squash commit; the change is confined to one MDX page.
