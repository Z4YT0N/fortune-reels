# DdO_RRLsvZg: Marcel Grau, "seven aesthetics you have already saved a hundred times"

- 1080x1920, 24 fps, 242 frames (10.08 s). 24.2k comments, driven by a comment-gated prompt giveaway.
- Caption: "works from any photo of a person… the full prompt lands in your DMs", #nanobanana. The cards are Gemini outputs.
- VO: "Datamosh, blob tracking, flashlight, receipt ticket, CRT, 1-bit dither, pink phosphor. Comment your favorite one and I'll send them to you."
- Frames: `DdO_RRLsvZg-frames/` (`strip-fNNN.jpg` = 24 numbered frames each; `full-fNNN.jpg` keyframes).

## 1. Format
- **Base shot:** one talking-head take. Dark teal-grey grade, black-and-white framed photos behind him, black "MG" cap, podcast mic.
- **Seven bursts of about 1 s each:**
  1. A white bold label lands on the cut.
  2. 5-6 stills HARD-POP one every 2 frames into an overlapping collage.
  3. The collage holds, then a hard cut to the next look.
- **Not used:** no tweens, no motion inside the cards, no per-card SFX.
- **CTA:** 2.5 s of word-by-word captions BEHIND his head, using a person matte.
- **Density:** 41 images in 7.6 s.

## 2. Edit rhythm (frame-exact)
| # | Aesthetic | Frames | Label | Card pops at | Cards | Hold |
|---|---|---|---|---|---|---|
| 1 | Datamosh | 0-23 | left, y ≈ 52 % | 4,6,8,10,12,14 | 6 | 9 f |
| 2 | Blob Tracking | 24-47 | centre, y ≈ 41 % | 28…38 | 6 | 9 f |
| 3 | Flash Light | 48-74 | left, y ≈ 68 % | 53…63 | 6 | 11 f |
| 4 | Receipt ticket | 75-101 | rotated 90° clockwise, right edge | 79…87 | 5 | 14 f |
| 5 | CRT | 102-128 | huge (~2.5x), centre | 106…116 | 6 | 12 f |
| 6 | 1-bit dither | 129-155 | small (~0.6x), right | 134…144 | 6 | 11 f |
| 7 | pink phosphor | 156-182 | lowercase, 2 tight lines, left | 160…170 | 6 | 12 f |
| CTA | | 183-241 | word by word, top, behind the head | | | |

**Inside each burst:**
- The label shows alone for about 4 f while he points at the empty space where the cards will land.
- Cards are 25-45 % of frame width, unrotated, with no border or shadow. The stack grows from beside the face down over the chest. The label stays the top layer.

**Label type:**
- Neo-grotesk bold, white, tracking about −2 %, soft shadow.
- Only position, size, rotation and case change from beat to beat.

**CTA:**
- New, wider centred framing with a slow push-in.
- "FAVOURITE" dips to about 40 % opacity with a glow for 4 f.
- The cap covers the bottom of the words (a person matte over the text).

## 3. The seven looks, with recipes for our stack

**01 Datamosh:** block-displaced faces, pixel-sort streaks, pasted UI rectangles.
- **Real datamosh on video:**
  - encode `-c:v mpeg4 -q:v 3 -g 9999 -bf 0` to `.avi`;
  - drop every I-frame after the first: in the `movi` `00dc` chunks, a VOP whose 2 bits after `00 00 01 B6` are `00` is an I-frame (tomato.py style).
- **Cheap smear:** `fps=8,minterpolate=fps=24:mi_mode=mci:mc_mode=obmc:me_mode=bidir:vsbmc=1:scd=none` across a cut.
- **Stills (numpy):** roll 16-px blocks, smear rows, sort pixels by luminance on bright spans.

**02 Blob tracking:** thin white/red boxes on salient blobs, tiny mono labels, lines joining the centres.
- **OpenCV:**
  - grey → blur 9 → Otsu threshold or frame difference → open 5x5 → `connectedComponentsWithStats`;
  - keep the top 8-14 blobs with area between 400 and 60000;
  - draw a 1-px rect, a coordinate label, and lines to the 2 nearest centres;
  - stabilise by lerping 0.5 toward the previous frame's match.
- **Alternatives:** `goodFeaturesToTrack` + `calcOpticalFlowPyrLK`, or HyperFrames divs + SVG lines.

**03 Flash light:** a glowing white silhouette in an underexposed night scene.
- Matte (rembg / RVM) → darken the background → blur the mask (sigma 8 + 40) → screen it over.

**04 Receipt ticket:** thermal paper with a mono header, barcode, dithered photo, totals and torn edges.
- **HyperFrames:**
  - photo: grayscale → 280 px → `convert("1")` → nearest ×3;
  - card: 380 px wide, #F0F1F2 + noise, Plex Mono / Plex Sans Arabic;
  - zig-zag `clip-path`, barcode via `repeating-linear-gradient`;
  - print animation: `clipPath inset(0 0 100% 0)` → `inset(0)` with `steps(24)`.

**05 CRT:** monochrome on black, scanlines, displaced bands, glow.
- ffmpeg: `geq` scanlines and band displacement → `colorchannelmixer` (brand green: `rr=0:gg=0.86:bb=0.2`) → blur screen → `rgbashift` → noise → vignette.
- `drawtext` needs `fontfile=` on this machine, or ffmpeg segfaults.

**06 1-bit dither:** pure two-tone with 2-3 px Bayer dots.
- ffmpeg: palette `color=c=0x121416` + `color=c=0x00DB33` → `paletteuse=dither=bayer:bayer_scale=2` → scale up with `flags=neighbor`.
- Bayer is stable on video. Floyd-Steinberg boils from frame to frame, so keep it for stills.

**07 Pink phosphor:** single-hue magenta duotone, glow, vertical streaks.
- `lutrgb` duotone → `gblur 18` screen at 0.7 → `avgblur sizeY=60` lighten for the streaks.
- **Brand version: P1 terminal green.** `r='clip((val-150)*2.2,0,255)':g='val':b='clip((val-170)*2,0,255)'` gives exactly #00DB33.

**Whole format in HyperFrames:**
- Layers: footage < cards (JSON layout) < label < person matte (CTA only).
- `tl.set` pops only: `t0 + (4 + 2i)/24`, no tweens.
- Flow/Omni only for source footage; apply every look in post (AI video drifts).
- Gemini is the fastest way to make the cards.

## 4. Fit for FortuneCode and the "Wes Anderson symmetric all-green" series (Y)
- **1-bit dither in #121416/#00DB33: USE as a signature look.** Ownable, stable, reads as "code". For the Y series, a softer #006A39/#F0F1F2 version, as flat posters.
- **Receipt ticket: USE.** An Arabic simplified tax invoice with a ZATCA QR, SAR prices and «شكرًا لتعاملكم معنا» sells POS/ERP work, and tickets and stamps are pure Anderson. Centred and symmetric.
- **Blob tracking: clean version only**, over dashboards, warehouses or aluminium profiles, with one green accent. In Y, only as tidy symmetric diagram callouts.
- **Green phosphor: sparingly** (code beats, transitions), low bloom.
- **CRT: rare and green**, as a "legacy vs new system" beat.
- **Flash light: AVOID** (eerie, off-topic for B2B).
- **Datamosh: AVOID** (reads as a broken product, cheap fast, kills symmetry). At most a 2-6 f cut accent.
- **Anderson version of the format:** keep the pop-on-twos rhythm, but pop cards in MIRRORED left/right pairs of the same size, then one centred card last. Pale field, centred label.

## 5. Ten-line summary
1. A 10.1 s talking head with seven 1 s collage bursts and a 2.5 s CTA: 41 stills.
2. Each burst: label alone for 4 f, 5-6 cards hard-popping every 2 f, a 9-14 f hold, then a hard cut.
3. No tweens and no pop SFX. The density and the 12-pops-per-second rhythm carry it.
4. The label changes per beat (position, size, a 90° rotation, a lowercase two-line set).
5. The CTA runs word by word behind the speaker via a person matte, with a flash-dip on the key word.
6. Every look can be made deterministically with ffmpeg, numpy or OpenCV; Gemini covers the stills.
7. Keepers: 1-bit dither in brand green, the Arabic ZATCA receipt, clean blob tracking, green phosphor.
8. For Y: dither, receipt and tidy diagrams, popping in mirrored pairs.
9. Avoid datamosh and flash light; keep CRT and glow rare.
10. Steal the format: a "name-the-thing" listicle hook plus a comment-gated giveaway (n8n/WhatsApp), built as one HyperFrames timeline of `tl.set` pops.
