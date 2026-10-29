# Motion and editing rules

Owner rules first; the craft references (`.claude/skills/motionmaxxing`, `.claude/skills/gsap-*`,
the global `hyperframes*` skills) fill in HOW. Where motionmaxxing contradicts an owner rule
(it bans "stat slides", the owner wants full-screen counters), the owner rule wins.

## Pace
- Nothing is held longer than 2.5 s. Every 1.5-2.5 s: a cut, a scale change, a camera move or a
  new environment. qa.py fails a frozen picture over 2.5 s.
- Frame 1 already moves (camera push, object turning in, something entering). A near-static first
  second is not a hook: the owner rejected the first pilot for exactly this.
- The hook caption is on screen from frame 1. No intro, no logo sting, no silence at the start.
- Transitions: zoom-through, match-cuts (the last object of shot N becomes the first of N+1), one
  whip-pan per world change. Cut on motion, never on rest.
- Alternate extreme close-ups, full-screen type/numbers and mid shots of UI or objects.

## Worlds
- A (Fortune Black) is home. B (Forest, full-bleed) for a proof/number beat. C (Light Gray) for
  ONE scene, usually the analogy. World changes are fast (0.12-0.2 s) and land on a cut.

## Character and object animation (owner rejected stiff motion on 2026-10-16)
- Anticipation before every key action; squash and stretch on impacts, jumps, pops; slow in /
  slow out; arcs for thrown props; follow-through and overlap; secondary action (float, breathing).
- Weight on landings. Figures and props are centred in their stage (measure, do not guess).
- Arrival decelerates (most travel in the first 4-8 frames); exits accelerate. One visible
  spring/bounce per beat at most. Nothing grows from zero scale; arrive from oversize or off-frame.

## Micro-gags
- 2-3 brand-safe micro-gags per reel (the bell tapped three times and nobody comes; loading stuck
  at 99%; a giant picture squashing the computer). They carry the rewatch.

## Numbers
- Key numbers are full-screen counters (Inter 800, ~330 px, unit in green), counting to the exact
  value. They replace the composition for their beat; captions still run below.

## Loop and end
- No end card, no end silence. Logo small and flat at the top during the CTA.
- The last frame matches the first frame's composition so the replay is seamless (qa.py SSIM).

## Captions
- Light Gray, one Fortune Green highlight word per chunk, max 2 lines, ~6 words a line, 78 px,
  word by word in sync with the voice.
- Reserved zone y 1180-1440; no UI or object enters it (cards end at y <= 1140). A Fortune Black
  0-85% scrim sits behind the captions.

## Platform safe area (Instagram + TikTok UI)
- All text and key visuals between y 230 and y 1440.
- Keep the right ~120 px free of anything that must be read (like/comment buttons); captions run
  x 60-1020 and stay centred.
