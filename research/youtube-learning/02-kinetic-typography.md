# 02 — Kinetic typography, text transitions and motion craft (YouTube study)

Studied 2026-11-06. Ten tutorials read from their transcripts (paraphrased, no long quotes). The After
Effects techniques are translated into rules for HyperFrames (HTML + GSAP, rendered frame by frame).
Read alongside `rules/text-motion.md`. This file adds to it and flags where the two disagree.

Method note: vidIQ ran out of credits after four searches. The rest of the search ran on YouTube's
own results page, and transcripts came from the public caption tracks. View counts are as of
2026-11-06.

Frame maths used below: 1 s = 24 f / 30 f / 60 f. 2 f at 30 fps = 67 ms.

### Converting After Effects influence to cubic-bezier
An AE keyframe at 0 speed with outgoing influence `a` and incoming influence `b` maps to
`cubic-bezier(a, 0, 1-b, 1)`.
- Easy Ease (F9) = 33.33 % / 33.33 % → `cubic-bezier(0.33, 0, 0.67, 1)`. That is almost
  `sine.inOut`, the "default" look that every source here calls plain.
- Pro symmetric ease, 70-80 % on both sides → `cubic-bezier(0.75, 0, 0.25, 1)`, close to `expo.inOut`.
- Pro "animate on" (fast start, long settle; outgoing influence near 0 with velocity, incoming 85-95 %)
  → `cubic-bezier(0.16, 1, 0.3, 1)` = `expo.out`. This is already our word-enter default.

---

## 1. The LAST graph editor tutorial you'll ever need
- Channel: Jake In Motion (Jake Bartlett)
- URL: https://www.youtube.com/watch?v=7pOCtlrrE3Y
- Views: 324,084

- Timing (where the keyframes sit) and spacing (how the in-between frames are spread) are separate
  controls. Same keyframes plus different easing gives a different feel. In code, the duration stays
  and the ease curve changes.
- Easy Ease is where most people stop. Pulling both influence handles far out (shift-drag to keep
  them flat) gives much stronger spacing, and the result reads as "snappy" instead of "plain".
- For things that animate ON, you rarely need to ease out of the start. Pull only the incoming
  handle (ease into the rest) so the element moves fast first and then has a long settle.
  Code: `expo.out` / `power4.out`, not `power2.inOut`.
- When a move must ease out of the start too (a scene-wide scale that carries the text), use a
  symmetric strong ease on that one layer and give everything synced to it the SAME curve.
  Code: one shared timeline label and one shared ease for the scene push and its text.
- Select all similar keyframes and drag one handle to change them all at once. That gives
  consistency across layers. Code: define ease tokens once (`EASE_ENTER`, `EASE_SCENE`) and never
  hand-tune per element.
- Overshoots and bounces are easier in the value graph. Rotation overshoot = value passes the
  target and returns. Back off the overshoot on the later keyframes when the timings differ.
- Rove across time keeps continuous motion: the speed never touches 0 between keyframes, so the
  object never "parks". Code: a camera drift is one long tween across the whole beat, not chained
  tweens that each ease to 0.
- The speed graph works for every property, including paths. The value graph is better for
  separated X/Y bounces.

## 2. Text Animators in After Effects (30 Days of AE, day 26)
- Channel: School of Motion (Joey Korenman)
- URL: https://www.youtube.com/watch?v=b1_p2qQf_Ts
- Views: 594,894

- Default text animators look bad for three reasons: one letter at a time, no overlap, no easing.
  The fix is always overlap plus easing.
- Square shape = strictly sequential. Ramp Down/Up = letters overlap, so several are in motion at
  once. Code: the per-word duration must be clearly longer than the stagger (see rule 5).
- Ease High = ease into the final state; Ease Low = ease out of the start. For fly-ins he sets
  Ease High 100, Ease Low 0 → shoot out, settle in = `expo.out` per unit.
- Overshoot by STACKING animators. Animator 1 brings the text past its rest; animator 2, offset by
  about 2 frames, pulls it back by a small relative amount. A third, offset again, can bounce once more.
- With both eases at 100 % the settle goes "funky". He uses 50 / 50 for the settle move.
- The gap between stacked animators sets the hang time: more delay = longer hang at the overshoot.
- Offset sweep from -100 to 0 over 1 s (24 f at his frame rate) for a whole word.
- Fix the anchor point once (per-letter anchor to the middle) in a non-animated "anchor fix"
  animator. Every animator after it inherits it. Code: set `transform-origin: 50% 55%` on word
  spans once, before any tween.
- Build once, reuse for 100 titles: the animation is independent of the text. Code: one
  `enterWords(el, opts)` function, never per-reel hand keyframes.

## 3. Creatively Using Text Animators in After Effects
- Channel: School of Motion (Kyle Hamrick)
- URL: https://www.youtube.com/watch?v=plbsdkRhy8g
- Views: 1,095,831

- A text animator is a procedural effector over vector shapes. The range selector is a shape
  (square, ramp, triangle, round, smooth) pushed through the line by Offset.
- Ramp shapes plus an animated Offset are "how you get really smooth text transitions": the next
  unit starts before the previous one finishes.
- Ease High / Ease Low turn the ramp into an S-curve. That is the per-unit ease.
- Randomize Order + seed: a fixed share of units (he uses 30 %) picked at random gets a colour.
  Code: seeded PRNG, never `Math.random()` (frame-exact renders must be deterministic).
- Wiggly selector: wiggles per second 0.5 for calm drift; correlation 85-90 % makes the units move
  as a group, 0 % makes them independent. He prefers wiggles/s = 0 and animating the phase by hand
  for control.
- Path travel: Easy Ease, then make it "fast start, fast finish, slower in the middle" for energy.
  Code: `cubic-bezier(0.2, 0.8, 0.8, 0.2)`-style curve for a stroke that draws along a path.
- Arrow into place: push off-screen, overshoot slightly, then ease in over a few frames.
- Anchor-point grouping (character / word / line / all) and grouping alignment decide where scale
  and rotation pivot. Wrong pivot = wrong motion.
- "Echo" plus a self set-matte gives growing bubble rings from one layer. A time-offset copy of a
  layer, matted by itself, is a cheap trail effect. Code: render the same SVG twice, 0.5 s apart,
  with a mask.

## 4. Text Animators are an After Effects superpower (AE Genius)
- Channel: Jake In Motion (Jake Bartlett)
- URL: https://www.youtube.com/watch?v=NclmWZa4c_8
- Views: 81,201

- His reusable base animator: Scale 0 %, shape Ramp Up, Ease Low 100 %, Offset from -100 % to
  +100 % over 30 frames (1 s at 30 fps for the whole line).
- Range End sets how many units move at once. At 100 % the ramp is as wide as the line (very
  overlapped, slow cascade). 50 % or 25 % = tighter, quicker cascade.
- In and out from one animator: duplicate the range selector, flip Ramp Up → Ramp Down, shift its
  keyframes later. The exit mirrors the enter.
- Then he shortens both sweeps for the final piece: the first full-line sweep was too slow. The final
  enter is well under 1 s for a 2-word title.
- Based On: characters vs words. Anchor grouping by word = each word scales from its own centre.
  For Arabic we always use words or lines (see text-motion.md).
- Layer extra properties on the same range (rotation, position rise) so they all share one
  cascade. Code: tween several properties in one `from()` with one stagger.

## 5. The Text Animation Tool
- Channel: ECAbrams (Evan Abrams)
- URL: https://www.youtube.com/watch?v=o1h97XYUByo
- Views: 1,114,265

- For lyric videos and kinetic type: Based On = Words, Units = Index (not percentage). Then each
  index step is one word, and you place one keyframe per word on its spoken frame.
- Squeeze the gap for short words ("to" takes less time to say). Timing follows speech, not even spacing.
- Smoothness 0 = words pop (boink); Smoothness 100 = each word animates over the window.
- Ease Low +100 = fast then slow (his preferred). Ease High -100 behaves like Ease Low +100.
- Scale + opacity together for the on-state. The animation stays identical when you swap the font
  or the property, so you can retime first and restyle later.
- Anchor grouping per word, grouping alignment -100 = words grow from their corner instead of the
  centre. Code: `transform-origin` at the reading-start corner. In RTL that is the RIGHT edge.

## 6. Ultimate Text Morph Animation in After Effects
- Channel: Ben Marriott
- URL: https://www.youtube.com/watch?v=5mu8Iku7xMA
- Views: 571,464

- The morph is only a cross-dissolve hidden by blur and an alpha threshold. Word A opacity
  100 → 0 and word B 0 → 100 over 2 s (F9 eased). Gaussian blur on an adjustment layer goes
  0 → 100 → 0 px, peaking at the midpoint.
- "Levels" on the ALPHA channel crunches the blur back into hard blobs. Leave a small gap between
  the black and white inputs, or the edges turn pixel-blocky.
- Adding Turbulent Displace (size 50, amount 0 → 50 → 0, evolution 0 → 180°) makes parts of word A
  start moving before the dissolve. That sells the "liquid" illusion.
- Works best when both words have a similar length. Otherwise the extra letters just fade in.
- Finishing: posterize time to 12 fps "so it feels less digital", a 4 px Gaussian soften, a lens blur
  driven by fractal noise (max 6 px), curves with blue shadows, and 6 % noise on top.
- Code: SVG filter chain on a wrapper: `feGaussianBlur` (stdDeviation animated) →
  `feTurbulence` + `feDisplacementMap` (scale 0 → 50 → 0) → `feComponentTransfer` alpha
  `type="linear" slope≈20 intercept≈-9` (the Levels crunch). Animate two stacked spans' opacity
  underneath. Arabic-safe, because nothing is split.

## 7. This Animation Technique Works Every Time (match cuts)
- Channel: Ben Marriott
- URL: https://www.youtube.com/watch?v=ythBGTLjot8
- Views: 499,687
- (Auto-captions are fragmentary, so these notes are thinner.)

- Match cut = something matches across the cut: shape, composition, subject or MOTION.
- Even a plain cut gains energy if both shots share one continuous move. Scale shot A from 100 to
  about 105 % into the cut, accelerating into it, then continue the move in shot B and ease out.
- The motion that crosses the cut does not need to be the same speed, but it must keep the same
  direction (left-to-right swing continues left-to-right).
- Rotation and 3D rotation work the same way as scale.
- Add secondary motion after the cut, as if the new scene reacts to the transition.
- Be subtle. Heavy transitions everywhere tire the eye. Use them where the story needs a lift.
- Code: shot A `scale 1 → 1.05, ease power2.in`, last 8-12 f; shot B `scale 1.05 → 1, ease
  power2.out`, first 8-12 f, so the speed peaks on the cut frame.

## 8. The #1 Skill All Animators Need (anticipation)
- Channel: Ben Marriott
- URL: https://www.youtube.com/watch?v=LcWJKYbYvi8
- Views: 335,958

- Anticipation = a small move in the opposite direction before the main move. He calls it the most
  important principle for motion design, not only character animation.
- Proof with three hold keyframes, 4 frames apart (start, a frame slightly BEHIND the start, end):
  the motion reads as a slingshot. With the middle frame halfway along, it reads as dull.
- Anticipation directs the eye. Among many still squares, the one that winds up first is the one
  the viewer catches from its first frame.
- Recipe: copy the first keyframe a little earlier, nudge it opposite, then smooth the curves in the
  value graph. No sharp corners unless you want a deliberate snap.
- Strong wind-up: the anticipation can take about 3 × as long as the main move. Angle the handles so
  it keeps creeping while it hangs instead of freezing.
- For small, fast moves, one keyframe handle bump (a tiny dip) is enough. No extra keyframe is needed.
- Anticipation can sit on another property: rotate opposite before a slide, squash before a scale-up,
  or deform the path.
- Smoothness comes from the run-up, not from frame rate or graph tricks.

## 9. 12 Principles of Animation (Official Full Series)
- Channel: AlanBeckerTutorials
- URL: https://www.youtube.com/watch?v=uDqjIdI4bF4
- Views: 16,116,428

- Squash and stretch must keep the volume: longer means narrower. Stretch peaks just before
  impact, not for the whole fall. Code: `scaleX = 1/scaleY`.
- Multiple levels of anticipation (a wind-up for the wind-up) add power on hero moments.
- Staging: one clear main action. Do not let two elements compete. Let one action finish before
  the next starts. Insert pauses when the viewer must process something.
- On-screen text should stay up for as long as it takes to read it aloud three times.
- Follow-through / overlap / drag: the tip of an appendage catches up last and overshoots furthest
  when the body stops. Elbow leads, then forearm, then hand. Offsetting parts makes motion graceful.
- Drag amount says mass: little drag = stiff (antenna), lots = light (feather).
- Slow in / slow out: only machines move at constant speed.
- Pose to pose: keys first, then extremes, then breakdowns. In code: block the key states and
  timing first, ease and overlap second.

## 10. ARABIC KINETIC TYPOGRAPHY TUTORIAL (template walkthrough)
- Channel: Farid Malki
- URL: https://www.youtube.com/watch?v=9wb4i7BOP4A
- Views: 2,343
- Weak source: it is a walkthrough of an Arabic template pack, not a technique lesson. No Arabic
  tutorial with real technique turned up on YouTube or the web.

- Font picks for display Arabic: Adobe Fonts "Scholar Sans Arabic" (Extra Bold / Black) for modern
  punch; a Kufi (DIN Next Kufi-style) for a more traditional tone.
- Arabic motion styles in the pack: fade-on main title plus subtitle, a looping "snake" word path,
  and a squeeze/turn of a word inside a container. All animate whole words. None split letters,
  which is consistent with our hard rule.
- Main text + small subtext (URL / handle) is the standard Arabic title pair. It matches our
  kicker → punch pattern, reversed in size.

---

## Code-ready rules (max 25)

1. **Ease tokens, not Easy Ease.** Never `power1/sine.inOut` on text (= AE Easy Ease 33 %,
   `cubic-bezier(.33,0,.67,1)`). Enter = `expo.out` `cubic-bezier(.16,1,.3,1)`. Scene push =
   `cubic-bezier(.75,0,.25,1)` (≈ 75 % influence both sides). [Jake graph editor]
2. **Animate-on eases only into rest.** Fast start, long settle. Do not ease out of the off-state.
   [Jake graph editor; SoM Joey Ease High 100 / Low 0]
3. **One ease per synced group.** Elements riding the same scene move share the same curve and the
   same start frame. Define them once as constants. [Jake graph editor]
4. **Overlap is mandatory.** Per-word duration ≥ 3 × the stagger, so 3+ words are in motion at once.
   At 30 fps: stagger 2 f (67 ms), word duration 8-12 f. Never word-after-word with zero overlap.
   [SoM Joey; Kyle Hamrick ramp shapes]
5. **Range-width cascade formula.** Word i of n (RTL order), global progress u 0→1, range width r
   (0.25-0.5): `p_i = ease(clamp((u*(1+r) - i/n) / r, 0, 1))`. Smaller r = tighter cascade.
   Whole-line sweep 18-24 f for 2-4 words. [Jake text animators: offset -100→100 in 30 f, End 25-50 %]
6. **Overshoot by two stacked tweens, not one elastic.** Tween A to about 4-8 % past rest
   (`expo.out`, 8-10 f), tween B starts 2 f before A ends and settles back with `sine.inOut`
   (≈ 50/50 ease), 6-8 f. More gap = longer hang. One overshoot only. [SoM Joey bounce]
7. **Exits mirror enters.** Same cascade with the ramp flipped, starting with the first-read word,
   accelerate out (`power2.in` / `expo.in`), about 60 % of the enter duration. [Jake text animators]
8. **Anticipation on hero moves.** Before a big slide or scale, a counter-move of 5-15 % of the
   travel. Big wind-ups can last up to 3 × the main move (e.g. 9 f wind-up, 3-4 f slam at 30 fps).
   Small fast moves: `back.in(1.2)` on exit or a one-handle dip is enough. [Ben Marriott anticipation]
9. **Anticipation can live on another property.** Rotate -3° to -5° against the direction before a
   slide; squash scaleY 0.92 / scaleX 1.08 before a scale-up. [Ben Marriott anticipation]
10. **Squash keeps volume.** `scaleX = 1 / scaleY`. Stretch only in the last 2-3 f before impact,
    then squash 2 f, then settle 4-6 f. [Alan Becker]
11. **Follow-through order.** For a card that carries text: card lands first, the text lands
    2-3 f later, and the accent or underline lands 2-3 f after that, overshooting furthest.
    [Alan Becker overlap/drag; Jake graph editor]
12. **Camera drift never parks.** Background or camera drift is one tween across the whole beat
    (or eased with non-zero end velocity). Chained tweens that each ease to 0 make a visible
    stop-start. [Jake graph editor, rove across time]
13. **Voice-synced words by index.** One keyframe per word at its spoken frame (from the
    timestamps). Short function words get less time. Never spread words evenly over a phrase.
    [ECAbrams]
14. **Pivot is set once, before animating.** Word spans `transform-origin` at the vertical centre for
    scale and rotation, and at the RIGHT edge (reading start) for grow-from-corner moves in RTL.
    [SoM Joey anchor fix; ECAbrams grouping alignment]
15. **Deterministic randomness.** Random highlight sets (e.g. 30 % of words) and wiggles use a
    seeded PRNG keyed to the reel ID. Calm drift: 0.5 cycles/s, 85-90 % correlation so words move
    as a group. [Kyle Hamrick]
16. **Blob morph between two words (Arabic-safe).** Stack word A and B. Over 1.2-2 s cross opacity
    (eased), blur 0 → 40-100 px → 0 peaking mid-way, alpha threshold
    (`feComponentTransfer` linear slope ≈ 20, intercept ≈ -9), and `feDisplacementMap` scale
    0 → 50 → 0 with turbulence seed drift. Use only on words of similar width. [Ben Marriott text morph]
17. **Morph finishing.** On the morph segment only: 4 px soften, 6 % noise, optional step to 12 fps.
    [Ben Marriott text morph]
18. **Motion match across a cut.** Shot A scales 1 → 1.05 with `power2.in` over the last 8-12 f,
    shot B scales 1.05 → 1 with `power2.out` over the first 8-12 f, same direction. Rotation works
    the same way. Max 1-2 per reel. [Ben Marriott match cuts]
19. **Secondary reaction after a transition.** 3-6 f after the cut, one element in the new scene
    gives a small reaction (a 2-4 % scale pulse or a settle). [Ben Marriott match cuts]
20. **Path draws: fast-slow-fast.** Strokes and arrows that travel along a path use a curve that is
    fast at both ends and slower in the middle. Arrows overshoot slightly into place over 4-6 f.
    [Kyle Hamrick]
21. **Block first, polish second.** Write the key states and timings with hold or linear tweens, check
    the reel reads at a glance, then add eases, overlap and overshoot. [Alan Becker pose-to-pose; Ben
    Marriott 3-frame demo]
22. **One main action on screen.** While a punch word animates, nothing else starts. Insert a 6-12 f
    pause after a dense line before the next move. [Alan Becker staging]
23. **Silent-text hold = 3 × read time.** With no voice-over, a caption stays up at least 3 × its
    read-aloud time (≈ 0.25 s per Arabic word → a 4-word line ≥ 3 s). [Alan Becker staging]
24. **Reuse a single text-animator function.** One `animateWords(el, {range, ease, overshoot,
    exit})` for every title. Restyle fonts and colours freely without retiming.
    [SoM Joey; ECAbrams; Jake text animators]
25. **Arabic title pair.** Display Arabic in a heavy modern sans (Scholar Sans Arabic Black-class)
    or a Kufi for tradition. Whole-word motion only. Main line plus a small secondary line.
    [Farid Malki]

---

## Contradictions and tensions with `rules/text-motion.md`

1. **Caption hold.** text-motion.md: at least 0.7 s readable hold, max 17 chars/s. Alan Becker:
   keep text up long enough to read it aloud three times. With a voice-over our rule stands (the
   voice is the clock). For silent or text-only reels, 0.7 s is far too short. Proposal: keep 0.7 s
   as the floor with voice, and use rule 23 without voice.
2. **Frame rate of type.** text-motion.md: collage moves on twos, but camera and type stay at full
   frame rate. Ben Marriott posterizes the text MORPH itself to 12 fps to make it feel less digital.
   Proposal: allow 12 fps steps only inside a blob-morph segment. Readable type stays at full rate.
3. **"Never crossfade between two lines."** The pro text morph IS a crossfade, hidden under
   blur + alpha threshold + displacement. Proposal: keep the ban on a plain crossfade, and allow it as
   the base layer of a blob morph (rule 16).
4. **Exit ease.** text-motion.md: exit `power2.in`, accelerate out. Ben Marriott and Alan Becker:
   hero exits read better with anticipation (a small counter-move first). Proposal: `power2.in` for
   normal exits, `back.in(1.2-1.5)` for hero exits.
5. **Word stagger units.** text-motion.md: 60-80 ms word stagger. That matches 2 f at 30 fps. But the
   file says nothing about overlap. The sources agree that the stagger only looks smooth when each
   word's own duration is ≥ 3 × the stagger (rule 4). A 60 ms stagger with a 100 ms tween reads as the
   amateur "one at a time" look. This is a missing rule, not a direct contradiction.
6. **Springs vs stacked overshoot.** text-motion.md: springs with damping ≥ 0.72, one small overshoot
   at most. Joey's stacked-tween overshoot gives explicit control of the hang time. That is compatible
   (one overshoot), only a different implementation. Use stacked tweens when the hang must be timed
   to a beat.

## Sources
- https://www.youtube.com/watch?v=7pOCtlrrE3Y
- https://www.youtube.com/watch?v=b1_p2qQf_Ts
- https://www.youtube.com/watch?v=plbsdkRhy8g
- https://www.youtube.com/watch?v=NclmWZa4c_8
- https://www.youtube.com/watch?v=o1h97XYUByo
- https://www.youtube.com/watch?v=5mu8Iku7xMA
- https://www.youtube.com/watch?v=ythBGTLjot8
- https://www.youtube.com/watch?v=LcWJKYbYvi8
- https://www.youtube.com/watch?v=uDqjIdI4bF4
- https://www.youtube.com/watch?v=9wb4i7BOP4A
- School of Motion article for tutorial 2: https://www.schoolofmotion.com/blog/text-animators-after-effects
