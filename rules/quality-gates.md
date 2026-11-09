# Quality gates (a reel is not delivered until all of these hold)

## Measured (engine/tools/qa.py, quote the numbers in the reel's NOTE.md)
1. 1080x1920 at 30 fps; length 30-60 s.
2. Audio present; loudness about -14 LUFS, true peak <= -1 dBFS; no dead air in the last 1.5 s.
3. No black frames (an invalid colour once produced black transition frames).
4. No picture frozen longer than 2.5 s.
5. Loop: first vs last frame SSIM >= 0.85.

## By eye (look at renders/qa/sheet.jpg AND full-size stills; say what you looked at)
6. Frame 1: moving, hook caption visible, readable in one glance.
7. Every caption: inside y 1180-1440, scrim behind it, one green word, Arabic joined and correct,
   nothing overlapping it.
8. No green on green; only palette colours; World C used once.
9. Objects centred and fully in frame; nothing cut by the edge by accident; no stray object left
   on screen after its beat (dropped figures must leave AND go transparent).
10. Every key action: render a 0.2-0.3 s strip (snapshot at 0.05 s steps) and check anticipation,
    squash and follow-through.
11. CTA: keyword card readable, logo small and flat at the top, no end card.
12. Hold the reel against `memory/LESSONS.md`: every lesson that applies is visibly respected.

## Delivery message to the owner (Arabic, short)
- What the reel is (hook, idea), the file path, the length.
- Sources for every number.
- Flags: accent unverified until he listens; any CTA promise; anything skipped or not checked.
- One line: what to change if he wants changes (a time or a scene).

## Safe zone: HARD gate (owner 2026-11-06)
- `python engine/tools/safezone_check.py <reel> [--sheet render.mp4]` runs inside `qa.py` and FAILs the reel on any violation.
- Every text glyph and every element marked `data-key` (faces, people cut-outs, numbers, stamp, logo, screens, product) must sit inside x 60-960, y 230-1440 at every 0.2 s.
- Elements in transit (a moving piece segment, or a running text tween) or below 0.5 opacity are skipped. Background paper and decoration may bleed.
- Proof: `renders/qa/safezone.json` + `renders/qa/safezone-sheet.jpg` (green zone, red outside).

## Smooth-motion gate (HARD, owner 2026-11-06)
- `python engine/tools/motion_check.py <reel>` runs inside `qa.py` and FAILs the reel when, on any frame, more than 2 motion events run at once, or a collage piece rests less than 0.6 s between two moves.
- A motion event is one text line, or one piece, or several pieces that start the same move within 2 frames (a scene leaving as one move counts once). Squash/nudge accents (<= 5 %) and opacity-only fades are not moves.
- The composition must expose `window.__qaMotion(time)` and `window.__qaHolds()` (copy them from `reels/005-gallery-weight-v2/template.tpl`).
- Proof: `renders/qa/motion.json` + 12-frame strips at the 3 busiest moments.
- The template must mark key pieces with `data-key`; new reels copy this from reel 005.
- No regular SFX tick: `tick_check.py` strongest periodic onset peak < 0.12, also in `qa.py`. The voice alone is ~0.05; the rejected v2 mix was 0.196.

## Text overlap / clip gate (HARD, owner 2026-11-06)
- `python engine/tools/overlap_check.py <reel>` runs inside `qa.py`, sampled every 0.1 s, skipping anything in transit.
- FAIL: a visible text glyph overlaps a visible `data-key` image (photo, phone, face, cut-out) by more than 5 % of the glyph box.
- FAIL: a text glyph at full opacity is clipped by its mask or the canvas (less than 85 % shown) for longer than 0.3 s.
- Give a caption its own space (a scrap above or below the photo group); never park it on a photo's edge. Proof: `renders/qa/overlap.json`.
