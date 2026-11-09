# 03. Collage, texture and anti-slop: what YouTube teaches

Studied 2026-11-06 for the ROAR-style reels (beige paper, one maroon accent, cut-out people with contact
shadows, oversized props, torn paper, starbursts, drop-ins with a rotation settle, on-twos, grain, 1-frame
flashes, kinetic Arabic type). It adds to `knowledge/content-engine/03-visual-style.md` and does not repeat it.

**Method.** vidIQ had no credits left (every call was refused), so I searched with yt-dlp and pulled
captions with youtube-transcript-api. View counts come from yt-dlp on 2026-11-06. Every point below is
paraphrased from the transcripts. The AE values assume a 24 fps comp unless a note says otherwise.
Pixel values belong to the tutorial's comp size; scale them by `ourWidth / theirWidth`.

**Not found:** a breakdown of a real agency reel in this style. The searches returned showreels and CapCut
"viral edit" videos with no technique in them. The ROAR breakdown therefore still comes from our own frame
study (refs 01-06).

---

## 1. Easy Paper Cutout Stop Motion Look (After Effects)
Ben Marriott · https://www.youtube.com/watch?v=nwpYl04Cczo · 308k views
- **Cut edges that change every few frames:** Wiggle Paths, size about 20, detail 0, wiggles/sec **0**.
  The randomness is driven by an expression on the random seed: `posterizeTime(6); time*50 + index*100`.
  The effect is a "new piece of paper cut" every 4 frames (6 changes per second at 24 fps).
- `+ index*100` gives every layer its own seed. Without it, all the pieces wobble in sync and look fake.
- **Only the starbursts and spikes re-cut their edges.** Pieces that are "the same paper" (a face, a body)
  keep their outline and only shift. A real stop-motion animator nudges pieces between shots.
- **Position boil:** `posterizeTime(6); wiggle(6,2)`, i.e. at most 2 px, 6 times a second. Small
  details such as pupils get 1 px.
- **Rotation boil:** wiggle amplitude 1°. Big pieces whose edges sit far from the anchor point get 0.3°,
  because rotation moves the outer edge further.
- **Three stacked drop shadows** (his best value for realistic paper lift):
  - 30% opacity, distance 3, softness 10 (tight and dark);
  - 25%, distance 6, softness 50;
  - 10%, distance 10, softness 50.
  All three share one direction (≈125°), linked by expression.
- **Bevel Alpha edge highlight:** edge thickness 1 px, light intensity 0.2, light angle = shadow
  direction + 180°. The paper edge catches the light.
- **Paper texture:** grade the texture to about 50% grey, then use the **Overlay** blend. It is
  matted to each layer (Set Matte) and parented to it, so the texture moves with its own piece.
- Use two different paper scans and alternate them across layers. Each layer's texture is offset so no
  two pieces show the same grain.
- **Texture on very pale layers:** add contrast. On very dark layers: switch to **Screen** and use
  curves, so the white fibres show through.
- **Colour cycling:** burst colours cycle through the palette with a 4-frame offset between bursts.
  Because this is busy, he reduces the edge wiggle.

## 2. Create an Instant Hand-drawn Look (After Effects)
Ben Marriott · https://www.youtube.com/watch?v=pJvtTKn2ko0 · 344k views
- Two ingredients remove the "digital sheen": **frame rate** and **boil**.
- **Frame rate:** an adjustment layer over everything with Posterize Time at **12 fps**, i.e. on twos
  in a 24 fps comp.
- **Boil:** Turbulent Displace with amount **4** (later cut to **2**, because 4 felt too strong). The
  seed expression is `time*4`, so the pattern changes every 6 frames. Raise it to 6-8 for a nervous
  look, or lower it to 2 for a calmer one.
- **Second, small-scale displace for pencil/edge grit:** amount **30**, size **2**, complexity 2.
  It uses the same seed animation.
- **Roughen Edges on thin lines:** border 2, edge sharpness 5.
- Finish with a looping paper texture on **Screen**.
- The whole stack sits on one adjustment layer, so it can be copied over a whole project.

## 3. How To Make A Collage Animation (After Effects)
Mapal · https://www.youtube.com/watch?v=RdX3yzQDyG4 · 502k views
- 1080 comp at 24 fps.
- **Edge roughness on shapes:** Turbulent Displace amount **30**, size **2**. The seed is
  `posterizeTime(3); random(1000)` (a new pattern 3 times a second).
- Key line: *paper doesn't move fast*. Collage motion should mostly be slow and papery. Speed is the
  exception.
- **Per-object drift:** `posterizeTime(12); wiggle(1,10)` on position, which gives a slow 10 px float
  stepped on twos.
- **Hand-placed object moves:** keyframes every **12 frames** (½ s). Each one has a small rotation, a
  scale change and a reposition. This is the "animator nudged it" look.
- **Opacity flicker** for a paper scrap appearing: values alternate every frame, 100 → 70 → 20 → … and
  then settle.
- **Camera shake:** a transform effect on a null or adjustment layer with
  `posterizeTime(12); wiggle(2,2)` and scale **101%** to hide the edges.
- **Grain layer:**
  - a solid at #808080 (50% grey);
  - Add Grain with the **Kodak Vision 500T** preset;
  - Tint to make it monochrome;
  - blend mode **Linear Light** at about **70%** opacity;
  - placed under the posterize layer, so the grain also steps on twos.
- Scanned texture (a notebook dot grid) on **Darker Color**, placed under the shake transform so it moves
  with the camera.
- Last step: Lumetri with a little more contrast and slightly lifted shadows.
- Text and shapes use a near-black **#202020** (not pure black), plus one strong accent. This matches
  our one-maroon rule.

## 4. How To Make A Mixed Media Collage Animation (After Effects)
Mapal · https://www.youtube.com/watch?v=NXRR6H8pI_U · 102k views
- **The process starts with a mood board** of photos, fonts and the artist's own scanned brush strokes.
  The hand-made assets are what make it feel personal.
- **Contact shadow under a cut-out:** a black ellipse under the object with a heavy box blur and
  lowered opacity. It is a separate layer, not a drop-shadow effect.
- **Depth separation:** box blur of about **6** (iterations 6) on the background only.
- Global stack:
  - an adjustment layer with Posterize Time **12**;
  - a "shake" adjustment layer with transform scale **102%** and `wiggle(1,10)`.
- **Textures:** 4K scans scaled down. One is set to **Multiply**, one to **Add**, and a paint texture is
  set to **Overlay** at reduced opacity. All of them sit *below* the posterize layer, so they step too.
- **Grain:** a #808080 solid with Add Grain, preset **Kodak Vision 800T**, then Tint. Tint is needed
  because the raw grain carries a purple-green cast.
- He adds a little Lumetri warmth to match photo pieces taken from different sources. Every cut-out
  needs the same white balance.

## 5. 5 Ways of Adding Texture (After Effects)
Mapal · https://www.youtube.com/watch?v=HLnkW1zI8mA · 292k views
- **Two Turbulent Displace instances:**
  1. size 8, for a gentle wobble;
  2. amount **30**, size **2**, for a pencil-sketch edge.
  The seed is `posterizeTime(6); random(3)`. A small random range is enough.
- **Displacement Map** driven by a photocopy-texture layer, so the text picks up the grain of the paper.
- **Camera Lens Blur with a blur map:** blur plus noise inside a mask gives a smeary, printed look.
- **Roughen Edges** for brush-stroke reveals: complexity 2 for soft edges, about 5 for rough ones. The
  "photocopy" and "rusty" presets are also useful.
- **Looping texture comp:** 10 scan frames, one frame each, time-remapped with `loopOut()`, slowed and
  posterized to 6.
- **Camera shake:** `posterizeTime(6); wiggle(15,3)`.
- **Colour:** Tritone or Tint plus curves for a mono or duotone grade. The Posterize effect (colour
  levels, not time) cuts colour fidelity for a print look.
- **Rule:** match texture to tone. Heavy grunge does not suit corporate content, and grunge at 60 fps
  looks wrong.

## 6. Create Documentary Style Collage Animation (After Effects)
ilkin · https://www.youtube.com/watch?v=_gttJPivVyM · 46.5k views
- The scene is built from **flat photos only** (a hand catching a plane). Depth comes from small 3D
  tilts.
  - Reaching hand: X-rotation **−19° → 0°** over 1 s, eased so speed peaks just before the catch.
- **Impact reaction:** the buildings shift outward and come back. Each one is offset by **1 frame**,
  so the reaction does not look mechanical.
  - Impact lines: Zig Zag size 18, 4 ridges, corner points, then Trim Paths draw-on and off; 5-6 copies.
- **1-frame impact blur:** Compound Blur goes 0 → **4** exactly on the hit frame, then back to 0.
- **Push and recoil:** a null holds the group. On impact it goes to Z **−521** and X-rotation **26°**,
  then back to 0 about 1 s later. After that comes a small forward "resist" and a pull down.
- **Contact shadow must not pop:** when the hand releases the object, a black, feathered, inverted
  elliptical mask fades the old shadow over a few frames.
- **Global finish:**
  - vignette from a dark-blue feathered solid at low opacity;
  - Lumetri curves;
  - Noise **4%**;
  - Posterize Time **12**.
- **Texture overlays jitter on every frame:** random keyframes for position, scale and rotation are
  converted to **hold keyframes** and looped with `loopOut()`.
- **Travelling shadow:** an exposure dip from 0 to **−1.05** over about 3 s on the approaching object,
  then on the buildings and background, offset a little each.

## 7. Instant Halftone Print Effect (After Effects)
Ben Marriott · https://www.youtube.com/watch?v=XjAZ3jlfpdc · 344k views
- **Dot grid:** a black solid with CC Ball Action, grid spacing **4**, ball size **12**. For bigger dots:
  spacing 6, ball 24.
- **Dot size from the image:** Camera Lens Blur on the dot layer, using the image's inverted luminance as
  the blur map, radius **6**. Levels then crushes the blacks, so blurred dots become bigger dots.
- **Prepare the source:** curves to darken the shadows, plus Gaussian blur **5-8 px**, so outlines do
  not survive as crisp lines between the dots.
- **"Printed and scanned" jitter:** `wiggle(12,3)` on the dot grid, under Posterize Time **12**.
- **Restore pure whites:** a duplicate of the source, desaturated, levels pushed until it reads white,
  blend **Screen**.
- Finish with looping paper textures for a newsprint feel.

## 8. Paper Tear Tutorial: How To Create The Perfect Tear
Motion Caddy · https://www.youtube.com/watch?v=GfRV0w9B-TQ · 261k views
- **Tear line:** a hand-drawn jagged path on a white solid, used as a track matte.
  - Roughen Edges at **4K**: border **50**, edge sharpness **5**, scale **200**, complexity **10**.
  - Scale the solid to 103% so only the tear line is rough, not the frame edges.
- **The two halves** use the same matte, one normal and one inverted.
  - The bottom half peels away with Page Turn, back opacity 100, about 2 s.
  - The back of the page is a clean, text-free version.
- **The white fibre edge sells the tear.** A duplicate white solid under the page, with its mask nudged
  a few px, shows a white strip along the tear.
  - Vary its thickness: thicker and thinner points along the line.
  - Paint the back side with a thinner, even strip.
- **Shadows at 4K:**
  - top page: distance **50**, softness **75**;
  - peeling half: distance **225**, softness **250**, aimed in a different direction.

## 9. How to Create the Most Realistic AI Images Possible
Curious Refuge · https://www.youtube.com/watch?v=gEHe1-1futI · 81.7k views
- They tested 9 AI-vs-real photo trios on Gemini. It picked the AI image only 2 times out of 9. The
  workflow uses **Nano Banana Pro**, which is our Gemini 3 Pro Image.
- **Generic prompts give a waxy, plastic look.** Name the camera or lens, f-stop, ISO and whether there
  is grain, then the composition.
  - Odd tip they could not explain: writing the f-stop between `$` signs gave more realistic results.
- **Structured prompt fields:**
  - device (e.g. "iPhone 16 Pro, 1×, f/2");
  - "raw, unedited";
  - natural window light, soft shadows, realistic highlights;
  - **subtle lens artifacts**;
  - subject, outfit, pose;
  - a very specific location.
- **Ask for candid moments:** someone half-turned, digging in a bag. Candid incidents read as real.
- **Re-prompting:** give a *real* reference photo to Gemini, ask it to write the prompt for that photo,
  then edit the subject.
  - This beats uploading the photo as a reference, which copies it too literally.
- **Generate many and pick:** about 4 per run, with the expectation of several rounds.
- **Photoshop finishing pass:**
  - duplicate layer at **20%** opacity, offset a few px (a scanner echo), then merge;
  - one light streak with a soft brush (hardness 0, flow 50), blend **Linear Dodge** at low opacity;
  - Dust & Scratches radius **2-3**, threshold **40** (refines the AI edge mush).
- **Depth of field:** Gaussian blur **0.8**, masked onto the background only.
- **Film overlay** (scratches, light leak) on **Screen** at low opacity.

### Also read (short, lower authority)
- **Dave, "How I Make AI Images Look Less Like AI"**
  (https://www.youtube.com/watch?v=yBjcHl7-gh8, 1.3k views):
  - an "amateur snapshot" suffix: old phone camera, JPEG artifacts, slight motion blur, blown
    highlights, muted colours, digital noise, candid moment, soft focus, low dynamic range, washed out;
  - Camera Raw: texture +100, clarity about +46, grain 100, saturation down;
  - paper scan on **Linear Dodge** at 10-15%;
  - removes the "orange polished" AI cast. Too lo-fi for ROAR, but the direction is right.
- **Andrew Ahi, "Editing Digital Photos Like Film"**
  (https://www.youtube.com/watch?v=hWdwDhEhAiA, 10.5k views), Lightroom values for a film look:
  - highlights down, clarity **−20**, texture **−5**, vibrance about 25;
  - faded curve with lifted blacks and shadows;
  - sharpening down to **20**, grain **35** ("people overkill grain"), light vignette.

---

## What this adds to 03-visual-style.md
- The current recipe has on-twos plus a small boil. These videos split the boil into **three separate
  clocks**:
  - edge re-cut every 4-6 frames, only on non-character shapes;
  - position/rotation nudge on 12 or 6 fps;
  - camera shake on 12 fps.
- **Lighting a cut-out** is three stacked shadows plus a 1 px edge highlight, not one soft shadow.
  A separate blurred ellipse is the *contact* shadow.
- **Texture moves with its own piece.** Each piece is matted with its own offset, plus a global grain
  layer above.
- **Grain is a stepped layer:** 50% grey, Linear Light, about 70%, posterized with the scene. Our
  `grade_still.py` grain is static on stills, so in motion it must be regenerated on the 12 fps clock.
- **Conflict to decide:** the current doc keeps camera and type at full frame rate. All four AE
  tutorials posterize *everything*, camera included. ROAR's slams look full-rate, so keep type smears at
  full rate and step the camera.
- **AI side:** re-prompting from a real photo, plus a scanner-echo / dust-and-scratches finishing
  pass. Both are missing from our recipe.

## Code-ready rules (HyperFrames: HTML + GSAP, Gemini stills)
Assumes a 30 fps render. Here "on twos" = hold 2 frames (15 fps). For the 12 fps tutorial feel, render at
24 fps, or hold 2-3 frames alternately at 30 fps.

1. **Frame clock.** Collage pieces never read `time` directly. They use
   `const step = Math.floor(frame / HOLD) * HOLD`, with HOLD = 2 for pieces and 4-5 for edge re-cuts.
   Drive GSAP from a paused timeline, `tl.seek(step / fps)` per piece group. The alternative is
   `ease: "steps(n)"` with n = duration × 12.
2. **Seeded random, never Math.random.** Use `rand(seed + layerIndex*100 + step)` (mulberry32), so every
   layer differs and renders are deterministic.
3. **Position boil:** ±2 px (±1 px for small details) at 12 fps, as a per-piece `translate`.
4. **Rotation boil:** ±1° for pieces under 300 px, ±0.3° for big pieces. Pivot = `transform-origin` at
   the piece's centre of mass.
5. **Slow drift:** at most ±10 px over ~1 s, stepped. Paper does not move fast. Speed is for hits only.
6. **Edge re-cut (starbursts, scraps only, never people):** one inline SVG filter per piece:
   `feTurbulence type=fractalNoise baseFrequency≈0.04 numOctaves=2` →
   `feDisplacementMap scale≈6-10`. Swap the `seed` attribute every 4-6 frames.
7. **Fine paper-fibre edge:** a second turbulence with `baseFrequency≈0.6`, `scale≈2-3`, on the same seed
   clock. This is the "amount 30, size 2" look.
8. **Global boil (optional):** displacement `scale≈2-4` on a whole-scene SVG filter, seed every 6
   frames. Off on Arabic type, because it breaks the dots and kashida.
9. **Lifted cut-out lighting**, scaled for 1080 wide, with the light at about 125°:
   ```css
   filter: drop-shadow(2px 2px 5px rgb(0 0 0 / .30))
           drop-shadow(4px 4px 25px rgb(0 0 0 / .25))
           drop-shadow(6px 6px 25px rgb(0 0 0 / .10));
   ```
   Every piece uses the same shadow direction.
10. **Edge highlight:** a 1 px, 20%-white inner edge on the side facing the light. Use an SVG
    `feMorphology erode=1`, offset (−1, −1), composite *out*, at 0.2 opacity.
11. **Contact shadow** under every standing person or prop: a separate black ellipse,
    `filter: blur(18-30px)`, opacity 0.25-0.4, squashed (`scaleY .25`).
    - Its scale and opacity follow the object's height. During a drop-in it starts at 0.4 scale and 0.1
      opacity and grows as the object lands.
    - Never cut it in one frame: fade it over 3-4 frames.
12. **Drop-in settle:**
    - y from −120% to 0 over 0.35 s with a `back.out(1.6)` overshoot;
    - rotation from ±8-12° to ±1-2°, never 0, because real paper lands crooked;
    - stepped at 12 fps.
    On the landing frame, nudge the 1-2 neighbouring pieces 4-8 px outward and back, each 1 frame later
    than the last.
13. **Hit frame:** exactly 1 frame of `filter: blur(3-4px)` or a colour-invert flash, then cut back.
    At most one per beat and 3-4 per 10 s.
14. **Paper-scrap appear flicker:** opacity steps 1 → .7 → .2 → .7 → 1, one frame each, then hold.
15. **Per-piece paper texture:** each cut-out gets a child `div` with the paper scan, `mix-blend-mode:
    overlay` (scan pre-graded to about 50% grey), masked to the piece by `mask-image` (the cut-out PNG
    alpha).
    - The texture moves with the piece and has its own background-position offset.
    - Keep at least two scans and alternate them across pieces.
16. **Dark pieces** (thobe shadows, maroon slabs) use the scan on `screen` at 0.25-0.4, so the fibres
    show light. Pale pieces use overlay with the contrast of the scan raised.
17. **Global grain layer:**
    - a canvas of mono noise centred on 50% grey;
    - `mix-blend-mode: soft-light` (the closest CSS has to Linear Light at 70%), opacity 0.5-0.7;
    - regenerated every 2 frames, with a small set of 6-8 pre-rendered tiles cycled by the seeded index;
    - grain cell 1-1.5 px at 1080 (blur 0.6 px, as in grade_still).
18. **Texture jitter overlay:** a scanned dust/scratch layer on `multiply` (or `screen` for light
    specks) at 0.15-0.3. A new random position, scale (1.0-1.1) and rotation (±2°) every frame, as in
    ilkin's hold-keyframe trick.
19. **Camera shake:** the stage wrapper gets a seeded ±2 px wiggle, scale 1.02 to hide edges, stepped at
    12 fps. Type sits *outside* this wrapper.
20. **Halftone device** (for props and photos on paper):
    - a canvas grid of 6-8 px cells at 1080, dot radius ∝ (1 − luminance);
    - blur the source 3-4 px first and crush the blacks;
    - jitter the grid ±1.5 px at 12 fps;
    - force pure white where luminance > 0.92.
21. **Torn edge:** a jagged SVG `clip-path` polygon (40-80 points, random amplitude 6-18 px),
    regenerated per *shot*, not per frame.
    - Under it, a 2-6 px variable-width **white fibre strip** (the same polygon offset outward) carries
      the "real tear".
    - The strip has its own drop shadow, larger and softer than the page's.
22. **Colour discipline:** near-black #202020-class ink for type and lines, beige ground, one maroon
    accent. Each photo cut-out is first matched to a shared white balance (warm paper tint) before it
    goes on the page.
23. **Gemini still prompt add-on:**
    - name the device or lens, the f-stop and the ISO;
    - "raw, unedited, natural window light, soft shadows, realistic highlights, subtle lens artifacts,
      candid mid-action moment";
    - one very specific location.
    Better still, ask Gemini to describe a *real* reference photo first and edit that prompt. Generate
    4+ and pick.
24. **Still finishing pass** (add to `grade_still.py`):
    - scanner echo: the same image at 15-20% opacity, offset 2-3 px;
    - dust & scratches (median radius 2-3 on edges with contrast above about 40/255);
    - Gaussian 0.8 px on the background only;
    - optional faint light streak (add blend, ≤10%).
    Clarity goes *down* slightly (−20 film look), not up.
25. **Restraint check before render:** grain visible but not noticed at phone size (about Lightroom
    35, not 100). Boil visible only when you look for it. One texture family per reel. If a frame reads
    "filter", halve every opacity.
