# 03. Visual style

## The owner's direction (2026-11-06)
«عاوز نفس ستايل الرسم ده … مش عاوز صور تبان إنها AI generated … فيها نويز وجرين وحركات زي رور بالظبط
… نتايج شكلها حقيقي وفيها روح مش سلوب.»
In short: ROAR's look and motion, grain and noise, real-looking, with soul, never AI slop.

## ROAR (roar.agency.sa, refs 01-06): what the look is made of
A Saudi creative agency that speaks Gulf dialect to business owners about the same services we sell.
- **Ground:** beige paper with visible texture, or flat deep maroon. One accent colour only.
- **People:** realistic Saudi characters (thobe, red shemagh, agal), often with a maroon bar over the
  eyes as an anonymising signature. Placed as cut-outs on the paper with a soft contact shadow.
- **Props:** oversized real objects as metaphors: megaphones yelling at a man, a road map with pins
  for the brand journey, a magnifying glass over a dashboard, a man carrying a desk on his back, a
  chess king for decisions, a plant growing the word «اسم».
- **Collage devices:** torn paper edges, a split frame (man on one side, a designer on the other),
  stacked product cards, a starburst behind the key object, a receipt, folders, paper notes dropping in.
- **Type:** Arabic display face with long kashida strokes, word by word in sync with the voice. Text
  sometimes sits on paper scraps.
- **Rhythm:** a new visual every 1-2 s. 1-frame colour-invert flash on beats. Objects drop in with a
  rotation settle and a small overshoot. Smear-slam words.
- **Proof:** a portfolio montage of real work (polaroids, phone mock-ups, tiles).
- **CTA:** «عبي النموذج الآن» + logo + «وخلي ROAR …». Ends on beige with the logo.
- Text overlay ends in a clear offer, e.g. «نبني الهوية والتغليف وكل تطبيق يحتاجه البراند».
Our version: Fortune colours (Black #121416, Green #00DB33, Dark Green #006A39, Light Gray
#F0F1F2), the same collage logic and Saudi characters, but our own devices so we do not look like a copy.

## Designer-tool language (jordans.archivess, ref 16, 511k likes, made in After Effects)
Proposed as Fortune's visual base, because the tools of design become the motion:
hand-drawn scribble that snaps to clean type, dashed guides and baselines, a selection bounding
box with handles, a blinking block cursor, hand-drawn underlines and circles on words, two-tone
typing (grey → ink), scale jumps on cuts, redaction slabs, ink-blot transitions, letters gathering
into a word. The Arabic version of the last one scatters the DOTS and harakat, which land on their letters.
Proposed split: designer-tool language as the base; the ROAR collage for scenes with characters.
Not yet approved.

## Other visual references
| Ref | What to take |
|---|---|
| 07 xxagency.sa | Paper cut-out collage, chat-bubble questions «فيديو برودكشن؟», podium with medals, hands holding products |
| 08 kayn | Black-and-white 3D surreal objects (veiled statue, silver badge, Coke can in ice), white/black alternation, red glow, word-by-word |
| 09 rit2raj_das | Monochrome tint (periwinkle), cut-out photos, condensed caps keyword + small italic connectors, rings and floating objects |
| 10 tenbolabs | Flat vector + 3D, one purple, a story told with simple icons |
| 15 / 00 getripping | 3D tactile UI cards on beige, bar-chart race, day counter |
| 17 whocoralarya_ | Chat box typing over a real landscape, cream type on a grid, gradient horizon |
| 20 oddfellowstv × Figma | Pixel mosaic, grids, shapes that tile and morph: the bar for "designed, not generated" |
| 28 visualsby_ashraf | Frame within a frame (mirror, picture frame, foreground leaves) |

## Anti-slop recipe (how it must NOT look AI-made)
1. **Real first.** Our own screens, sites and projects come first, then real archive and stock footage
   (destockd.com, archival-footage.com, pexels.com). Generated images only where nothing real exists.
2. **Generated stills are prompted as a real editorial photoshoot:** full-frame camera, 50 mm, f/4,
   Kodak Portra 400 look, skin pores, small asymmetries, real fabric wrinkles, imperfect light, matte
   muted colours, soft contrast. Ban: HDR, glossy plastic skin, glow, perfect symmetry, teal-orange.
   One accent colour. NO text inside generated images (type is added in motion).
3. **Grade every frame** with `engine/tools/grade_still.py`:
   - lifted blacks (0.04), highlights compressed (×0.92), saturation ×0.86, slight warm paper tint;
   - low-frequency paper blotches;
   - film grain weighted to the midtones (amplitude 0.09, softened 0.6 px);
   - soft vignette.
   It needs numpy and Pillow; run it with plain `python`, not `python -I`.
4. **Motion texture:** collage elements animate on twos (12 fps steps) with a tiny position boil.
   Camera and type stay at full frame rate. 1-frame colour frames on hits, used sparingly.
5. **Character consistency:** reuse the same generated character as a reference image across shots.

## First still test (2026-11-06)
`research/refs-2026-11/style-test/`:
- `p1.txt`: the prompt;
- `t1.png` and `t2.png`: Gemini `gemini-3-pro-image-preview`, 9:16 2K, with ROAR frame `ref-roar-b.png` as style reference;
- `t1-graded.jpg`: after grading;
- `cmp1.jpg`: raw vs graded side by side.

The scene is a Saudi businessman with his hand on his forehead, a laptop showing a loading spinner,
a giant brass hourglass, gallery photos held with green tape, on grey paper. t1 is closer to ROAR,
t2 to a real photoshoot. My judgement: skin and fabric read real, but it is still an ad photo. The
"soul" comes from the motion (on-twos collage, word-by-word type, flashes), which still needs a
5-second motion test. The owner has not given feedback on it yet.

## Safe zones (Instagram + TikTok), consolidated
- ref 11 (bhavinipanjwanii): main hook near the top; eyes in the upper third; caption in the middle of the lower half;
  nothing in the right strip (buttons) or the bottom strip (caption and username).
- `rules/motion.md`: all text and key visuals between y 230 and 1440 on 1080×1920, right ~120 px
  free, captions x 60-1020.
- The Volume TikTok fix (project memory): x 80-900, y 200-1400.

## Collage craft, from the YouTube study (2026-11-06, research/youtube-learning/03-collage-texture-anti-slop.md)
Sources: Ben Marriott, Mapal, ilkin, Motion Caddy, Curious Refuge. These are the code-ready values; they override the vaguer lines above.
- **Three boil clocks, all seeded per layer** (`seed + index*100`, never Math.random):
  - starbursts and paper scraps get new cut edges every 4-6 f (SVG `feTurbulence` seed swap);
  - every piece shifts ±2 px and rotates ±1° (±0.3° for big pieces) at 12 fps;
  - the camera shakes ±2 px at scale 1.02, at 12 fps.
  People's cut-out outlines are never re-cut.
- **Frame rate decision (default, reversible):** in collage scenes, pieces AND camera step at 12 fps, as in all four After Effects tutorials. Only type slams and text reveals run at full frame rate.
- **Lighting a cut-out:** three drop shadows with one shared light direction:
  - 30 % opacity, 3 px distance, softness 10;
  - 25 %, 6 px, 50;
  - 10 %, 10 px, 50.
  Add a 1 px edge highlight at 20 % on the side away from the shadow. The contact shadow under people is a separate blurred ellipse that fades in over 3-4 f.
- **Paper texture** is masked onto each piece and moves with it (overlay with the scan graded to about 50 % grey, or screen on dark pieces). Alternate at least 2 scans, each with its own offset.
- **Grain layer:** mono noise around 50 % grey, soft-light at 0.5-0.7 opacity, regenerated every 2 f by cycling 6-8 pre-rendered tiles.
- **Drop-in:** −120 % → 0 in 0.35 s with back.out(1.6). Rotation ±8-12° settles at ±1-2°, never exactly 0. Stepped at 12 fps. On landing, the neighbouring pieces nudge outward, each 1 f after the last.
- **Hit frame:** exactly 1 f of 3-4 px blur or a colour invert, max 3-4 per 10 s. Paper scraps appear with an opacity flicker 1 → .7 → .2 → .7 → 1, one frame each.
- **Torn edge:** a jagged `clip-path` generated once per shot (not per frame), plus a 2-6 px white fibre strip underneath.
- **Halftone and print** (Ben Marriott) for an editorial print look on photos, sparingly.
- **AI stills:**
  - Prompt with the device or lens, f-stop, ISO, "raw, unedited", natural light, subtle lens artifacts, a candid moment and a specific location.
  - Better: have Gemini describe a REAL reference photo, then edit that description.
  - Finishing pass to add to `grade_still.py`: scanner echo 15-20 % offset 2-3 px, dust-and-scratches clean-up, 0.8 px blur on the background, clarity slightly down.
- **Gap:** no breakdown of a real agency reel in this style was found. ROAR's own reels (refs 01-06) stay the reference.

## Cut-out pipeline that worked (reel 005, 2026-11-06)
1. **Prompt the green first.** Gemini ignored "#00FF00" when the anti-slop "matte muted colours" line came first, and gave grey/blue backgrounds with cloth.
   Fix: start the prompt with a CHROMA-KEY PLATE paragraph ("saturated pure green #00FF00 across the whole frame, no cloth/floor/gradient/shadow; the grade applies ONLY to the subject").
   Then the subject, then the photo look. For pose variants of one person, pass the first good image as `--ref` ("the SAME man…").
   `node ~/.claude/skills/gemini-image/scripts/gen.mjs --prompt p.txt --out raw.png --ref ref.png --aspect 9:16 --size 2K`
2. **Key** with `python engine/tools/key_cutout.py raw.png cut.png --grain --trim`. It keys by green dominance (works on muddy greens), keeps the largest region, erodes and feathers the edge, suppresses spill, and applies the house grain/desaturation to the subject.
   Look at a sheet on paper colour before use. Glass objects keep a slight green tint inside.
3. **Animate** as stop-motion: pose swaps (wait → frustrated → happy) instead of generated video. Pieces and camera stepped at 12 fps with seeded boil, drop-ins back.out(1.6), 3 drop shadows via CSS `filter: drop-shadow(...)` ×3 on the PNG, plus a contact-shadow ellipse.
4. **Real footage goes in prints** (white mat + tape), never full-screen: Mixkit direct MP4s `https://assets.mixkit.co/videos/<id>/<id>-720.mp4`. Mixkit search pages need `curl -L`. Pexels is blocked by Cloudflare for headless browsers.
