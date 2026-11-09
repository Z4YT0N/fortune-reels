# DeKKSdXIGnf: "Graphic Designer" (@mekhlafii.psd), Arabic font showcase

- 5,241 likes / 2,924 comments (56 %, extremely high).
- Caption: «لايك واكتب "خطوط" في الكومنت وحرسلك الرابط دايركت».
- 18.13 s, 30 fps. Music only (no VO, no SFX).
- Hard cuts at 3.133 (f94), 8.900 (f267), 14.333 (f430): 4 shots.
- Frames: `DeKKSdXIGnf-frames/` (`sheet-1fps`, `hook-01..04` for f0-95, `strip6-*`, `swaps`, `cta`, `full-*`).

## Idea
Calm, warm golden-hour stock of Japanese streets, cyclists and a river bridge. One pink type sample dead centre changes font EVERY BAR (74 f, 2.467 s, about 97 BPM), with a small Latin name label under it. It ends on a "comment for the link" card. Nothing slides, fades or scales: every text change is an instant cut on the beat.

## Fonts shown
| # | Sample | Label | Style | On (s) |
|---|---|---|---|---|
| 0 | «خطـــوط / جـميـلـــة / لازم تجربها» | — | light monoline modern naskh, stretched kashida | f5 |
| 1 | «ستابر» | SETABR DISPLAY | heavy geometric display kufi, wide flats, sharp diagonals | 3.133 |
| 2 | «طلال» | TALAL | thin monoline condensed kufi, tall looped ascenders | 5.700 |
| 3 | «سوبر / ماريو» | YR MARIO ARABIC | chunky playful block display | 8.167 (stays through the cut) |
| 4 | «SKEWRON» | SKEWROM | condensed tall Latin 70s retro | 10.633 |
| 5 | «زيان» | ZIAN | bold rounded, naskh/ruqaa flavour, high contrast | 13.100 (stays through the cut) |
| CTA | «اكتب اي كومنت / وحرسلها لك» + ♥ (f488) | — | medium rounded Arabic sans | 15.567 |

**Look:**
- All one flat baby pink (about #FBB2CA). No box, outline, shadow, glow or mockup.
- Centred, about 47-52 % down, about 40-50 % of the width. Each font is sized for equal visual weight.
- Label: small letter-spaced Latin caps (Poppins/Montserrat-like) about 20 px below the sample.
- The handle and logo «مخلافي» jump between 3 positions with no animation: centred over the hook → top corners during the showcase → centred over the CTA. A bookend instead of an outro.

## Hook (frame-exact)
| Frame | What happens |
|---|---|
| f0-4 | empty high-angle road, a cyclist far away |
| f5 | «خطـــوط» |
| f15 | «جـميـلـــة» |
| f24 | «لازم» |
| f34 | «تجربها» joins it |
| f43 | logo + handle |
| f50-88 | the cyclist rides THROUGH the text |
| f91 | all text off the frame he leaves |
| f91-93 | 3 empty frames (a breath) |
| f94 | hard cut, the first font is already on |

- **Timing:** a word every about 9.5 f (half a beat), landing 2-3 f BEFORE the audio hits, so the text anticipates the beat.
- **Layout:** lines 1-2 are justified to equal width with kashida; line 3 keeps its natural width.

## Editing rule
Text changes land ON the bar; footage cuts land BETWEEN bars (offset about 0.7-1.2 s). They change together only at f94. Something new arrives every 1.2-2.5 s without feeling choppy.

## Rebuild in HyperFrames
- **`tl.set` on a BPM grid:** `BAR = 74/30`. Word pops with `tl.set(el, {autoAlpha: 1}, F(n))`.
- **Lines:** each word in its own span inside a right-to-left `white-space: nowrap` line. Use `autoAlpha`, never `display`, so the layout never jumps.
- **Kashida justification:** type real tatweel characters; measure with `getBoundingClientRect()` and add tatweels until the line widths match. Never tatweel after ا د ذ ر ز و. Don't rely on CSS `text-justify: kashida`.
- **Samples stacked in one spot,** each with its own `font-size`, swapped on the bar.
- **Footage on its own track,** cut half a bar off the text changes.
- **A person crosses the text**, which clears when they leave. Stronger: matte the person above the word.
- **Logo:** 3 `tl.set` positions.
- **Heart:** a 1 f set, or scale 0.6 → 1 over 4 f with back.out(3).
- **Grade:** warm, low contrast, so one flat text colour reads everywhere.

## Mixed-voice type for Zain
- **Already owned:** `assets/brand/fonts/zain/`. Stress word = Zain mob-long 500 / Black / ExtraBold; connectors = Zain ExtraLight / Light. Zain is SIL OFL on Google Fonts.
- **Outside fonts (free OFL; the owner must approve, since his rule is Zain only):**
  - IBM Plex Sans Arabic Thin, Readex Pro 200, Alexandria 100-200 (light);
  - Lalezar (≈ Mario), Marhey 700, Reem Kufi (≈ Talal), Lemonada / Aref Ruqaa (≈ Zian);
  - Big Shoulders / Bebas (≈ Skewron).
- **Avoid** Setabr, Talal, YR Mario, Skewron and Zian until their licences are checked.
- **His file** `alfont_com_zain-mob-long500.ttf` came from alfont.com: confirm it is OFL Zain before paid client use.

## Comment mechanics
- A keyword gate in the caption, with a softer "any comment" ask on screen.
- Font names are visible, but the links are held back, so commenting is the shortcut.
- Friendly dialect and a heart.
- Short and loopable; only designers comment, so the comments are a list of leads.

## For FortuneCode
- **The resource-pack format:** «5 أقسام لازم تكون في موقع متجرك», one item per bar over Saudi golden-hour street footage. Ends «اكتب "موقع" وأرسل لك الرابط» via an auto DM/WhatsApp reply.
- Text on the bar, footage cuts between bars.
- One flat brand colour on a film grade (#00DB33 on dark, or #F0F1F2).
- A kashida-justified hook in Zain.
- A person crossing the hook text.
- Logo bookend.
- **Conflict with our checklist:** "type lives in the scene and moves". If we copy it, add one layer of life: a person in front of the word, or a 4 f scale on each swap.
