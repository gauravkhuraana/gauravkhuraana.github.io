---
title: Flatten AI video series and add GH-600 episode 4
branch: copilot/fix-video-series-indexing
author: Copilot for Gaurav
risk: medium
status: approved
approved_by: udzialmeansshare
---

## Goal

Present non-flat multi-video series as flat, numbered lists and add the fourth GH-600 episode, while leaving already-flat and standalone video pages unchanged.

## Context

Issue #18 asks for consistent video indexing across pages with video series. A site-wide inventory of `docs/` found the non-flat series examples in `docs/AI/azure-ai-900.mdx`, `docs/AI/microsoft-foundry.mdx`, and `docs/AI/agentic-ai.mdx`. `docs/AI/gh-600-agentic-ai.mdx` already has a flat numbered video series but only three episodes; the requested fourth video is YouTube ID `7LUF091F_yo`. `docs/AI/github-copilot.mdx` is the stated ideal and will remain unchanged. Other video pages are either already flat, such as the single-level video lists in `docs/AI/ai-browser-automation.mdx` and `docs/Automation/automation-basics-series.mdx`, or contain standalone videos rather than series, so they do not need restructuring.

## Approach

- Present videos on Azure AI-900, Microsoft Foundry, and Agentic AI as numbered, peer episodes under a single Video Series heading, updating table-of-contents links to match.
- Add the requested video as GH-600 episode 4 in the existing flat series, using the video's source title.
- Leave GitHub Copilot and other already-flat or standalone video pages unchanged.
- Avoid changing the shared embed component or site-wide structure; page-level content is sufficient.

Retaining topic-group headings was rejected because it would not provide the requested single-level episode list. Applying numbering to already-flat or standalone videos was rejected because the issue explicitly says to leave those unchanged. The site-wide inventory keeps the edits limited to non-flat series pages while ensuring other video-bearing pages are considered.

## Scope

- `docs/AI/azure-ai-900.mdx` — flatten and number the video series and align its table of contents.
- `docs/AI/microsoft-foundry.mdx` — flatten and number the video series and align its table of contents.
- `docs/AI/agentic-ai.mdx` — gather the existing grouped videos into one flat, numbered series and align its table of contents.
- `docs/AI/gh-600-agentic-ai.mdx` — add the fourth numbered episode using the supplied YouTube video.

## Out of scope

- Changing GitHub Copilot or other video pages that already meet the requested structure or contain only standalone videos.
- Restructuring non-series videos or pages outside the documentation content.
- Changing `docs/AI/ai-browser-automation.mdx` or `docs/Automation/automation-basics-series.mdx`; each already groups peer videos under one video section without additional topic nesting, so the issue's exception for already-flat pages applies.
- Changing video embed components, navigation configuration, or global styles.

## Steps

1. Convert the Azure AI-900, Microsoft Foundry, and Agentic AI video content to flat, numbered series and update their table of contents.
2. Add GH-600 episode 4 with video ID `7LUF091F_yo` as a peer to the existing episodes.
3. Review the site-wide inventory findings and rendered Markdown structure; verify video numbering and internal links.

## Risks

- Replacing topical heading structure can invalidate existing table-of-contents anchors; update the links alongside the headings and inspect the generated pages for matching heading IDs.
- Reordering or omitting an embed could associate the wrong episode title and video; retain each existing title/video pair and verify the resulting count.
- Moving videos across topic sections may make surrounding explanatory copy misleading; retain the copy with its episode or adjust only what is needed to preserve clarity.

## Verification

- Run `npm run typecheck`.
- Run `npm run build`.
- Inspect the four changed MDX files to confirm each series has peer episode headings, numbering is sequential, and GH-600 includes episode 4 with the requested video ID.
- Inspect the built HTML under `build/docs/AI/` and confirm the updated table-of-contents links target IDs present on the corresponding page.

## Rollback

Revert the change commit to restore the original page content and remove the added episode.
