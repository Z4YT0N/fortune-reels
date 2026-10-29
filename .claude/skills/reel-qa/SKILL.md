---
name: reel-qa
description: Render and quality-check a Fortune Code reel before delivery - qa.py gates, contact sheet and stills reviewed by eye against the rules and lessons, NOTE.md written, fixes made. Use at stage 9 of the reel engine or whenever a render is judged.
---

# Reel QA

A reel is never "done" on a claim. It is done when the numbers pass and the frames were looked at.

```bash
cd reels/<reel> && npm run render                   # renders/<slug>.mp4
cd ../.. && python engine/tools/qa.py <reel>        # PASS/WARN/FAIL + renders/qa/sheet.jpg, first.png, last.png
```

1. Fix every FAIL (black frames, frozen > 2.5 s, end silence, wrong format, no audio). Re-render.
2. Read `renders/qa/sheet.jpg` (one frame a second) with the Read tool. Then read full-size stills
   for the hook, every world change, every counter, every micro-gag and the CTA.
3. Walk `rules/quality-gates.md` items 6-12 and `memory/LESSONS.md` line by line.
4. For a second opinion, run the `reel-critic` agent on the reel folder; fix what it finds or
   write why not.
5. Write NOTE.md: qa.py lines verbatim, which frames you looked at, what you fixed, what is still
   flagged (accent unheard, CTA promise, anything not checked).
6. Only then `python engine/tools/deliver.py <reel>`.

Never say "verified" for something you did not look at. If a check was skipped, the delivery
message says so.
