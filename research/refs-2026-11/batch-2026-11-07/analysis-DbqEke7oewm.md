# DbqEke7oewm: Sankalp Pandey (@thetwofaced_), "3D black bar effect"

- 78,622 likes / 187 comments; edited by @rudra14__.
- 1080x1920, 30 fps, 39.73 s.
- Hard cuts (s): 1.333, 2.233, 4.4, 8.5, 12.233, 14.367, 17.133, 18.4, 20.6, 25.667, 27.0, 28.167, 29.0, 30.0, 31.1, 34.833, 36.233, 37.733.
- Frames: `DbqEke7oewm-frames/` (`sheet_1fps`, `hook_0-3s_30fps`, `hook_bars_close_f9-20`, segment strips (their times restart at 0), `full_1.0s` / `full_3.9s`, After Effects grabs `ae_*`).

## 1. What the effect really is
**A 2D frame break, NOT parallax, depth map or camera projection.**
1. A hero object (tennis ball with a passport photo, pickleball with a sticky note, blue retro phone) flies toward an overhead camera and grows fast.
2. During the throw, two black solids slide in from top and bottom and close the frame to a thin horizontal band.
3. The hero is a separate cut-out ABOVE the bars and much taller than the band, so it overhangs onto the black.
4. Covering the frame edge makes the brain read it as in front of the screen. Hero growing while the bars move inward adds depth.
5. A second pop-out element: cut-out HANDS grip the band from above and below, fingers over the black.

He swaps the real ball for a clean, rotoscoped fake one (the real one is blurred and hidden by his hand). The swap happens at about f12, while the bars move, which hides it.

**Geometry:**
| Shot | Band (y) | Band height | Hero | Hero : band | Overhang top / bottom |
|---|---|---|---|---|---|
| Tennis | 730-1165 | 435 px (22.7 %) | about 590 px | 1.36x | about 120 / 40 px |
| Pickleball | 760-1010 | 250 px (13 %) | about 555 px | 2.2x | about 170 / 135 px |

- Band centre y ≈ 885-950.
- Hero ≈ 55 % of the frame width.
- Bars are pure black with hard edges.

**Timing:**
- Bars go from full frame to the band in about 6 f (f9-15): hard expo-out. Peak speed about 8000 px/s about 2 f in, 0 by about f26.
- The background window also shrinks a little and tilts a few degrees.
- The hero's scale-up is ease-in toward the camera until the bars land.

## 2. His After Effects recipe
1. Overhead 4K shot of a throw at the lens.
2. Mask the real ball → Subtract → Content-Aware Fill for a clean background.
3. Shoot the ball on a stick with the photo taped on → Roto Brush cut-out.
4. Layers, top to bottom: Null (position/scale) → fake ball → photo card → footage → fill.
5. Two black solids with keyframed Position ("Black Bars Slide") between the ball and the background.

## 3. Rebuild in our stack
**Assets:**
- **Clean background:** a Gemini edit "remove the object, fill naturally", or one clean frame on a locked camera.
- **Hero PNG:** Gemini on #00FF00 → `chroma.py`, or rembg `birefnet-general`. Make it at about 2x its display size and check edges at 200 %.
- **Hands PNGs** the same way; the wrist cut hides inside the band.
- **Sticky note** as an HTML div, so its text can animate.
- **Optional depth variant:** Depth Anything V2.

**HyperFrames (1080x1920, 30 fps):**
- z-order: background 1 / bars 2 / hands 3 / hero 4 / note 5 / text 6.

```js
const F = n => n / 30;
tl.fromTo('#hero', {scale: 0.22, y: 420, rotation: -12}, {scale: 1, y: 0, rotation: 3, duration: F(15), ease: 'power3.in'}, 0);
tl.to('#hero', {filter: 'blur(6px)', duration: F(5)}, F(8)).to('#hero', {filter: 'blur(0px)', duration: F(4)}, F(13));
tl.to('#hero', {scale: 1.06, duration: F(4), ease: 'power2.out'}, F(15)).to('#hero', {scale: 1, rotation: 0, duration: F(8)}, F(19));
tl.to('#plate', {clipPath: 'inset(39.6% 0% 47.4% 0%)', duration: F(20), ease: 'expo.out'}, F(9));  // band 760..1010
tl.fromTo('#plate', {scale: 1, rotation: 0}, {scale: 0.94, rotation: -1.5, duration: F(8)}, F(9)).to('#plate', {rotation: 0, duration: F(10)}, F(17));
tl.fromTo('#handT', {y: -260, opacity: 0}, {y: 0, opacity: 1, duration: F(9), ease: 'back.out(1.6)'}, F(30));
```

**Numbers to keep:**
- **Bars:** start about 9 f into the throw, 18-22 f, expo.out; about 75 % of the travel in 6 f.
- **Band:** 13 % of the height (badge look) or 22 % (the scene stays readable).
- **Hero:** 1.35-2.2x the band height, more overhang on top.
- **Hero entry:** 15 f power3.in, then a 4 f overshoot to 1.06.
- **Hide cuts and swaps** at about f12, while the bars move.

## 4. Hook (0-4.4 s)
| Frames | What happens | VO |
|---|---|---|
| f0-8 | overhead desk, the throw starts on f0 | |
| f9-15 | ball swells with blur, bars close, background tilts, fake ball swaps in; "This" handwrite-on with an arrow | "Here's how you can make this," |
| 1.333 | cut: blue retro phone swings in, bars close, handwritten "this" / "Phone Calls" | "this," |
| 2.233 | cut: paddle flicks the ball; the note builds "3D" → "black" → "bar" → "EFFECT" word by word (bold grotesk mixed with script) | |
| f90-132 | cut-out hands rise and grip the band | "…black bar effect for your next video." |

**Why it works:**
- The finished effect is on screen by 0.3 s.
- Three variations prove it is a reusable technique, not a one-off.
- The title is written ON the object, not as a caption.
- The black frame isolates the saturated hero.
- "Save now, refer later" drives saves.

## 5. The rest of the reel
- **Two worlds:** warm, dark real footage for the "wow"; white grid paper (a "designer notebook") for the "how".
- **Screen recordings as rounded cards** (about 40 px radius, soft shadow) with a handwritten numbered checklist under them. One screenshot holds the whole recipe, so people save it.
- **Three label styles,** each landing on its spoken word:
  - handwritten tag on a white box;
  - white bold on a red box (key noun);
  - small handwritten sub-tag.
- **Other devices:**
  - hand-drawn curved arrows;
  - red "selected layer" outlines (design-tool language);
  - type mixing heavy grotesk, outlined text and handwriting.
- **Effects:**
  - black-and-white halftone → colour when the object becomes the hero;
  - a white bloom flash;
  - a fake camera REC overlay with a green "RAW" tag for raw footage;
  - a dashed tracking box with a cursor.
- **Motion graphics:**
  - a sideways motion-blur swipe and a one-line scrolling ticker;
  - connector lines with dot ends linking the 3 examples;
  - social proof: eye icon + real thumbnails with real view counts (425K / 11.8M / 2.1M) + "TILL NOW".
- **Close:** a recap replays the hook shots, then a black end card "Save / this / Reel" with a bookmark icon that draws on.
- **Sound:** voice-over over a continuous music bed (no gaps at −40 dB), mean −16.1 dB. Hard cuts except one swipe.

## 6. For FortuneCode
**The idea:** the product becomes a physical hero popping out of the band over real Saudi business footage: a phone running a client app, a printed ZATCA invoice with a QR, a price card, a laptop showing a site.

**Brand:**
- Bars #121416.
- Key-noun boxes #00DB33 with #121416 text; secondary boxes #006A39 with #F0F1F2 text; arrows #F0F1F2.
- The "how" world is #F0F1F2 grid paper with #00DB33 selection boxes.
- Whole-word Arabic only. Swipes and tickers move left → right.

**Reel ideas (Gulf VO, «هذا… وهذا… وهذا» hook):**
1. Three heroes: an app on a phone over a Riyadh street, an invoice with a QR over a shop counter, a site on a laptop over an office. The note builds «موقعك / يبيع / وأنت / نايم».
2. Before/after: the band shows paper ledgers and WhatsApp chaos; the hero is the new system on a phone («القديم» / «الجديد»).
3. A price badge «يبدأ من ٥٬٦٠٠ ريال» over a band of a site scrolling (approved prices only).
4. A client's hands grip the band.
5. A grid-paper tutorial reel with numbered Arabic steps.

End with «احفظ الريل» and a bookmark icon.

**Fit with style Y:** the band frame and the centred hero are symmetric by nature. A good "chapter" device inside the green world.
