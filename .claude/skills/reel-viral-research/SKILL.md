---
name: reel-viral-research
description: Study viral reference reels or competitor accounts for Fortune Code - rank by outlier multiple (views / the account's median), name each hook formula, and turn the top formulas into Fortune Code hooks; log findings in memory/EVIDENCE.md. Use monthly, when the owner shares reference videos, or before a batch of new reels.
---

# Viral research

Adapted from the team's `fortune-code-viral-research` skill (Jake Schincariol's MIT ig-viral).
It looks; it does not write scripts or post.

## The one idea
Raw views are not evidence. Rank by outlier multiple = views / that account's recent median.
> 3x is a signal; < 1.5x teaches nothing. Prefer accounts within ~10x of Fortune Code's size.

## Inputs
- **Uploaded videos:** ffmpeg audio (16 kHz mono) + a 6x2 frame grid; transcribe (ElevenLabs
  speech-to-text, or sherpa-onnx whisper-small offline); one table row per video: hook verbatim
  (first 3 s), length, analogy, twist, ending/ask, words/s, cuts/s, visual style.
- **Accounts:** 6-12 (4 direct Gulf software/tech explainers, 4 adjacent, 2-4 outsized for format
  only). The vidIQ connector (Instagram/TikTok outlier search, profile reels) gives views and
  medians without browsing; otherwise read in the owner's browser with `agent-browser`, at human
  speed, ~a dozen reels per account. Never log in for him, never scrape, never follow/like/comment.
- Copy the formula, never the video.

## Report
1. Formulas over-indexing in the top third, with counts. 2. What the top third share structurally
(hook length, first-frame motion, payoff, where the ask sits). 3. Hooks fitting no formula.
State the sample size and confidence plainly.

## Turn it into reels
For the top three formulas write a Fortune Code hook tied to a real service and hand it to
`reel-script`. Append findings (date, sample, formulas, new formulas) to `memory/EVIDENCE.md`.
