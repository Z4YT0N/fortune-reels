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
