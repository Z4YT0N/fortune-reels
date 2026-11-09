# Text motion and text transitions

How professional motion designers move type, adapted for Arabic RTL reels. Sources: frame-by-frame
study at 12 fps of the owner's references (2026-11-06; roar.agency.sa, kayn, rit2raj_das,
ammar_studio, getripping), howseen-ai/claude-motion-design, iart-ai/kinetic-typography-skills,
GSAP SplitText docs. `motion.md` still rules pace, safe areas and captions; this file covers how
the words themselves move.

## Arabic first (hard rules)
- Never split Arabic into per-letter elements. Each letter has 4 shapes and the joins break. Animate by
  word or line, or use one of the three Arabic-safe letter moves below.
- Letter-level moves that keep the joins:
  1. Typewriter by growing ONE string (letters connect as they arrive). Seen in ammar_studio.
  2. Mask or clip-path wipe over the unsplit word. RTL means the wipe runs right to left.
  3. GSAP `splitArabicText` helper (zero-width joiners). Test it before use.
- Word order and stagger run right to left. A line that slides in comes from the right edge of the reading direction.
- Kashida (tatweel ـ) is our signature move. Stretch a word's connecting stroke, or grow a stroke from
  the word's baseline, to underline or emphasise. Seen in ROAR, «لا تقول». Latin type cannot do this.
- Line height at least 1.35 for reveals so descenders and dots are not clipped by the mask.
- Same digit system in one reel; never mix ١٤٠ and 140 in one frame.

## Timing defaults (30 fps; frames in brackets)
| Move | Duration | Ease |
|---|---|---|
| Word enter | 0.25-0.45 s (8-13 f) | expo.out / cubic-bezier(0.16, 1, 0.3, 1) |
| Word stagger without voice | 60-80 ms | ease-out spacing |
| Line stagger | 80-100 ms | |
| Exit | 0.15-0.25 s, faster than the enter | power2.in, accelerate out |
| Blur-in (premium focus pull) | blur 10-12 px to 0 in 0.4-0.7 s, with opacity | expo.out |
| Smear slam | 2-3 f, horizontal motion blur only on the slam | |
| Typewriter | about 12-15 chars/s, never slower than the voice | linear steps |
| Highlight box | wipe 3-4 f behind the word, starts after the word lands | expo.out |

- With a voice-over, the voice is the clock. A word lands on its own spoken frame, never before.
- At least 0.7 s readable hold per caption chunk, max 17 chars/s.
- Never linear motion except typewriter steps. Springs damping ≥ 0.72, one small overshoot at most.
- One thing moves at a time. While a word lands, the camera does not jump.
- Text that must be read is never motion-blurred. Blur only the slam frames.

## Entrance library (pick 2-3 per reel, not all)
1. Masked rise: word rises from its own line mask (translateY 105% → 0), 55 ms word stagger, tiny rotation.
2. Kicker to punch (kayn): small grey kicker line on top, then the punch line word by word. Each word
   enters lighter and smaller and settles to full size and colour in about 0.3 s.
3. Zoom-out reveal (ammar): first words fill the frame huge, then the whole block pulls back fast
   (about 0.25 s) to its final size while the next line types in the accent colour.
4. Type-on with mixed scale (rit2raj): big condensed keyword plus tiny connector words beside it in
   another weight, an editorial layout. Key formula letters can be 3D objects.
5. Smear slam (ROAR): word arrives from the side with 2 frames of horizontal smear, on a beat.
6. Highlight box (getripping): after a keyword lands, a solid Fortune Green box wipes in behind it
   and the word flips to Fortune Black.
7. Blur-in focus pull: for serious and premium lines.
8. Kashida stretch: the word lands, then its tatweel stroke grows to underline the next idea.

## Designer-tool language (jordans.archivess "Visual Test 01", 511k likes, made in After Effects)
This one fits a software company best: the tools of design become the motion.
- Hand to type: a word is first a hand-drawn scribble (1-3 f), then snaps to clean type on a 1-frame colour flash.
- Construction marks: dashed baselines and guides, a selection bounding box with handles around a
  phrase, a blinking block cursor «|» after the last word. The camera slides along the line as it types.
- Annotation layer: hand-drawn underline, circle or arrow drawn ON the word in sync with the voice
  (stroke draw-on, 4-6 f), then it fades.
- Two-tone typing: a new word arrives light grey and darkens to ink as the next one comes. One
  word can flip to white or the accent to carry the stress.
- Scale jump on the cut: one huge word, cut, the whole sentence tiny in the centre. Contrast is the hook.
- Redaction slab: a solid bar wipes over a word to censor it or switch it, then reveals the new word.
- Ink-blot transition: objects melt into black blots that become the next shape.
- Letter assembly at the end: scattered letters float and gather into the word (LOVE) with drawn
  orbits. Arabic version: scatter whole words, or the dots (النقاط) and harakat, which then land on
  their letters to complete the word. That keeps the joins and only Arabic can do it.
- Texture: grain, vignette, light-leak sweeps, 1-frame colour frames on hits. Use sparingly and
  inside the brand palette.

## Text transitions (between phrases)
- Push-through: the old line exits up inside its mask while the new one rises into the same mask. Continuous, no fade.
- Shared word: one word of line A stays, moves and scales into line B's position. The rest exits.
- Zoom-through: the camera dives into a letter's counter or a dot and lands in the next scene (match cut).
- Invert flash: 1-frame colour inversion on a strong beat (ROAR). Max 2 per reel.
- Backspace and retype: type, delete, type the contrasting word («مصمم» ← «بيزنس أونر»). For myth/reality beats.
- Object carries text: the paper note, card or sticker carries the line in and drops with a rotation
  settle (overshoot about 5 frames).
- Exits leave in the direction the next element enters, so the cut reads as one motion.
- Never: crossfade between two lines, fade to black between phrases, or all words at once with one fade.

## QA for text
- Strip 12 frames around every text entrance (`ffmpeg -ss <t-0.1> -i out.mp4 -vf "scale=320:-1,tile=12x1"`).
  Check: joins intact, no clipped dots, no word before its voice, no frame where two lines overlap.
- Phone check at 360 px wide: every caption readable.
- Kicker ≥ 40 px, punch ≥ 78 px on 1080×1920. Everything inside the safe area in `motion.md`.

## Where to learn more
- howseen-ai/claude-motion-design (MIT): seek(t) engine, masked word rise, springs, critique loop.
  Read-only reference; we render with HyperFrames.
- iart-ai/kinetic-typography-skills: reveal recipes (mask, blur-in, wipe, SplitText, variable font).
- GSAP SplitText docs and the `splitArabicText` helper: https://gsap.com/docs/v3/HelperFunctions/helpers/splitArabicText
- Ideas only (port, do not run live): Kinetics (kinetics.colorion.co), CSS Text Effects
  (text-effects.colorion.co), raivcoo.com (filter references by style).
- Book: Khajavi, "Kinetic Behaviors", in *Arabic Script in Motion* (Palgrave, 2019).
- School of Motion's free "Text Animators in After Effects" (30 Days of After Effects series). Its
  principles carry over, even though we work in code.

## More references (2026-11-06)
- whocoralarya_ (motion designer intro): the text types into an AI chat box over a real landscape.
  New words are orange and turn dark. The box grows with a small 3D tilt spring as lines are added.
  A cursor clicks send, and the camera dives into the button to change scene. Then cream type on a
  grid, scattered glyphs «/ < *» drifting around the line, and a gradient horizon for the outro.
- sam.john.creates: kinetic captions over a talking head, with a design-tool UI (timeline,
  keyframes) used as B-roll.
- oddfellowstv × Figma "design is not dead": pixel-mosaic and grid transitions, shapes that
  tile and morph. The bar for "designed, not generated".

## Not looking AI-made (owner rule 2026-11-06: «حقيقي وفيه روح مش سلوب»)
- Grain on everything: film grain weighted to the midtones, paper fibre texture, soft vignette. Use
  `engine/tools/grade_still.py` (still frames).
- Matte grade: lifted blacks, softer highlights, slightly desaturated. No HDR, no glossy skin, no glow.
- Collage elements move "on twos" (12 fps steps) with tiny position boil. That reads as handmade.
  Camera and type stay at full frame rate.
- Real footage beats generated footage whenever it exists. Use our own screens and sites first, then
  archive and stock: destockd.com, archival-footage.com, pexels.com (kewin.wav reference).
- Generated stills: prompt for a real editorial photoshoot (50 mm, Portra 400, pores, fabric
  wrinkles, imperfect light). One accent colour only. No text inside generated images.

## Colour contrast for on-screen type (shogentle, owner reference 2026-11-06)
- The eye lands on the strongest contrast first. A coloured word works only when it contrasts with the
  shot (yellow on blue sky). When colour fights the shot, use white (Light Gray #F0F1F2 for us).
- Stacked block lines with the size following the stress (big «DEAD SHOT», small «looks like a»). In
  Arabic, the stressed word is bigger and bolder, and the connectors are small.

## Refinements from the YouTube study (2026-11-06, research/youtube-learning/02-kinetic-typography.md)
These override the lines above where they differ.
- **Overlap is required.** Each word's tween lasts at least 3× the stagger. At 30 fps: stagger 2 f, word tween 8-12 f, so 3+ words move at once. Strict one-after-another is the amateur look.
- **Easing conversion.** AE influence out `a` / in `b` = `cubic-bezier(a, 0, 1-b, 1)`. The default Easy Ease (33 %) is plain; never use it. Use 75/75 for scene moves, expo.out for entrances.
- **Cascade formula** for a line: word progress = `clamp((u*(1+r) - i/n)/r, 0, 1)`. `u` = line progress 0→1, `i` = word index in READING order (RTL), `n` = word count, `r` = range 0.25-0.5. Sweep over 18-24 f.
- **Overshoot = two stacked tweens.** The first goes 4-8 % past the rest position. The second starts 2 f before the first ends and settles with a 50/50 ease.
- **Anticipation** before big moves: a counter-move of 5-15 % of the distance, or 3-5° of opposite rotation before a slide. Hero exits use back.in(1.2-1.5). Small exits keep power2.in.
- **Text morph is allowed:** cross-fade two stacked words under blur 0 → 40-100 px → 0, alpha clamp (`feComponentTransfer`, slope ≈ 20) and `feDisplacementMap` (0 → 50 → 0). Only for words of similar width. Arabic-safe, because the words are never split. The morph segment may drop to 12 fps. A PLAIN crossfade stays banned.
- **Motion match across a cut:** shot A scales 1 → 1.05 with power2.in over its last 8-12 f. Shot B scales 1.05 → 1 with power2.out, same direction. A small reaction 3-6 f after the cut.
- **Camera drift never stops inside a beat:** one tween across the beat, never chained tweens that each ease to zero.
- **No voice-over:** hold text long enough to read it aloud 3 times. With voice-over, the 0.7 s minimum stands.

## Two hard lessons (owner 2026-11-07, reel 006 test)
- **No flash before an entrance.** He saw words "render twice": plain for a frame, gone, then animated. The cause was `TL.set(word, {opacity:1, yPercent:0}, a - 1f)` before a clip-path reveal.
  - Put every word in its hidden pre-entrance state at BUILD time (`gsap.set`: clip inset 100 %, yPercent 115, opacity 0).
  - Only ever `TL.to` out of that state.
  - Never use a `TL.set` that shows a word before its tween.
  - Proof: a 20 fps strip around every entrance.
- **Use the library, one move per carrier.** «مبتستخدمش اي حاجه من اللي اتعلمتها». Plain masked rise on everything is a FAIL. Each line gets a named move from this file:
  - two-tone ink;
  - kashida tail;
  - Arabic typewriter (one growing string);
  - smear slam;
  - zoom-out reveal;
  - stacked overshoot;
  - highlight wipe after the landing;
  - selection box and cursor;
  - object carries text;
  - blur-in focus pull.
  The template's header comment lists which move each line uses (`reels/006-gallery-continuity/test.tpl`).

## Type pairing in reels (owner 2026-11-07: «ندمج الاتنين… ibm مع زين بشكل فني»)
Two voices. Never one font for everything.
- **Zain mob-long = the HERO voice.** Stress words, numbers and emotional words («صور», «٣٤ ميجا», «ويستنى», «يخفف»).
  - Large, often with the kashida as a design move (the stretch, the tail reveal, the underline from the tail).
  - One or two words per beat.
- **IBM Plex Sans Arabic = the CONNECTOR / INFO voice.**
  - Small connector words (في، من، على، اللي);
  - labels and UI (pill, tag, notification, search bar, dimension readouts, source lines);
  - Latin, URLs, numbers inside UI.
  - Weights: Light/Regular for connectors, SemiBold for labels.
- **Contrast is the art:** a huge Zain word next to a tiny Plex connector in the same line (the "mixed voice" move of the 2026 minimal trend, translated to Arabic).
  - Plex takes the jobs where Zain's long tails hurt: small sizes, multi-line text, UI.
- Static posts and carousels use IBM Plex for everything, with Bold headlines (see `research/own-instagram/IDENTITY.md`).
