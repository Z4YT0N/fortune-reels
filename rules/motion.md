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

## Eye-trace cutting (liveairprod, owner reference 2026-11-06)
- At the cut, the next shot's point of focus starts exactly where the viewer's eye was at the end of the
  previous shot. Move the gaze inside the shot (a moving object, a word), then cut from there.
- Before every cut, check: where is the eye in the last frame? Where is the focus in the next first frame? They must match.

## Frame within a frame (visualsby_ashraf, owner reference 2026-11-06)
- Put the subject inside a frame in the shot: a picture frame, a mirror, a door, a screen, foreground
  leaves or objects (soft blurred foreground). It reads as cinematic and stands out in the feed.
- In collage scenes, place the character inside a laptop screen, phone, photo print or window cut-out
  instead of floating on the paper. Change the angle often: top-down, low, through objects.
- Captions in the same reel: ONE Arabic word at a time, big display Arabic face, yellow or white, centred
  low. Key phrases are assembled letter-block by letter-block. Use the Arabic-safe methods in text-motion.md.

## From the editing study (2026-11-06, research/youtube-learning/01-editing-retention.md)
- Plan before you build: every script line gets a scene type and an asset, approved before rendering.
- A new point is a plain caption, and the visual shows what it describes. Nouns and numbers trigger their visual on the exact spoken word.
- Captions are at most 5 words. 1-2 key words are bold, centred and in the second font; the rest are smaller around them. Reveal word by word with a slow drift.
- Cut silences with the word timestamps, keeping 30 ms of padding.
- Flash bursts of 2-3 frames as accents at builds, aligned to a fixed centre. A "keyword flash" holds one term in place while 10-20 screens change behind it.

## Smooth motion (owner 2026-11-06: «متكهرب أوي، الحركة صعبة جامد ومش smooth»). These override the on-twos and boil rules above.
- **Camera:** full frame rate, no shake. One slow eased drift per beat (scale 1.00 → 1.03), never stop-start.
- **Frame rate of elements:** people, the weight, prints, phones and ALL text move at full frame rate. Stepped motion is only for tiny paper scraps, if used at all.
- **Boil:** none on text or people. On scraps at most ±0.5 px / ±0.3°, a new value every 6-8 frames.
- **Enforced, not just written:** `engine/tools/motion_check.py` (inside qa.py) fails the reel on > 2 simultaneous motion events or a < 0.6 s hold. Helpers clamp durations (exitTo 0.38-0.45 s, slideIn >= 0.55 s), so a call site cannot sneak a harsh value in.
- **Scene changes as one move:** every piece of a scene leaves at the same instant with the same tween, together with its text; the next scene arrives as one group once that exit has finished. A line that must stay readable (e.g. the last word) leaves with the scene, not before it.
- **No ornaments on top:** no shake/yoyo, no blur hits, no back.out above 1.15, no 4-8 frame "pops". A check mark or a clip cut-in is an opacity fade, not a scale pop.
- **Timing:**
  - entrances 0.5-0.7 s, `expo.out` / `cubic-bezier(.16,1,.3,1)`;
  - exits 0.35-0.45 s, with a fade;
  - overshoot max 2-3 % (`back.out(1.1-1.2)`);
  - drop-ins fall about 160 px, not from off-screen.
- **One thing at a time:** at most 2 elements move together. A finished element holds (slow drift only) about 0.6 s before the next move. A scene leaves completely before the next scene's hero arrives.
- **Hits:** at most 2 smear slams per reel and 1 single-frame flash/invert per reel. No blur flashes; use a soft squash instead.
- **Morph / transitions:** 0.6-0.8 s.
