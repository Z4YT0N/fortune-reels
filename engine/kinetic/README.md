# engine/kinetic: the collage-reel kinetic type library

`kinetic.js` holds every type move of the collage reel (reel 006 v6 and reel 018, the owner's "ROAR"). It is extracted from `reels/018-alumaman-collage/reel.tpl`, plus `kashIn` from `reels/006-gallery-continuity/test.tpl`. The behaviour is the same as in those reels.

- **Start a reel:** `python engine/tools/new_collage_reel.py <slug> --brand <id>`. The scaffold copies this file to `<reel>/lib/kinetic.js`, so a later engine change never breaks an old reel. `python build.py --sync` refreshes the copy.
- **Colours and fonts** come from CSS variables that `build.py` writes from `brand.json`:
  - colours: `--ink` (the one accent), `--ink-deep`, `--ink-soft`, `--paper`, `--dark` (text), `--on-ink` (text on an ink chip or highlight);
  - fonts: `--font-hero`, `--font-label`, `--font-latin`;
  - weights: `--hero-weight`, `--label-weight`, `--label-weight-m`.
  - Nothing in the library is hard-coded to a brand.
- **Needs:** GSAP 3.14 with MotionPathPlugin. The library injects its own base CSS (`.el .ln .tk .m .w .sans .sansm .lat .box .scrap .tape .chip svg.mk .echo .echoG .echoL .grain`).
- **Use:** `const K = Kinetic.create(TL, { words: WORDS })` inside `build()`, after the fonts load. Then destructure the moves you need.

## Rules built in
1. **Hidden state at build time.** Each move hides its target with `gsap.set` when the page builds. It reveals the target only with `TL.to` or `TL.fromTo(..., { immediateRender: false })`. No word ever flashes before its entrance (owner, 2026-11-07).
   - Helpers: `hide(el, state)` (build time) and `showAt(el, t)` (a frame-baked reveal).
2. **Arabic is whole words only.**
   - `grp()` and `rows()` call `wholeWord()`. It throws on a token that is a single Arabic letter or that starts or ends with tatweel, ZWJ or ZWNJ.
   - `words(str)` splits on spaces only.
   - `typeOn` grows ONE string, so the letter joins re-form.
   - Never split letters and never use `textPath`.
3. **A word lands on its own spoken frame:** `V(i)` = word i start minus 1 frame.
   - `W(i)` is the start and `E(i)` is the end, both on the voice clock from `audio/vo.json`.
   - `has(i)` is false while the voice is not in yet.
4. **Contact lines:** `ltrIsolate(str)` wraps Latin runs (URL, phone, @handle) in `<bdi dir="ltr" class="lat">`. Bidi can then never reorder the number or the handle inside the RTL page (018 fix).

## Carriers (where text lives; owner: «التكست كله في مكان واحد… كأنه كابشنز» was rejected)
| Helper | What |
|---|---|
| `grp(parent, x, y, [[text, {s, f:"sans"/"sansm", col, hl}]...], {cls, style, w, right, r, origin})` | A group of whole-word tokens. Returns `{e, toks:[{tk, w, m, text}]}`. `cls:"scrap"` puts it on a torn paper scrap. |
| `line(parent, x, y, "str", tokenOpts, groupOpts)` | `grp` from a plain string. |
| `scrap(parent, {left, top, w, h})` | A torn paper scrap (an object that carries text: a contract, a tag, a strip). |
| `tape(parent, x, y, rot)` | A masking-tape strip on a scrap. |
| `chip(parent, {left, top, w, h}, size)` | An ink pill or button. Returns `{e, t}`; put text in `t`. |
| `fit(group, maxW)` | Shrinks a group until it fits. **Zain's tails are long: fit every Zain line, 2–3 words a line at most.** |

## Moves
| Move | Call (defaults) | What it does | Owner's words / origin |
|---|---|---|---|
| **fly** on a curve | `fly(el, t, [{x,y} start, ...waypoints], d=0.7, rot=0)` | A whole word or group rides a curved path in from off-screen and rests at 0,0. Its rotation unwinds to 0. | «كلمات طايرة من برا الشاشة على باث منحني» (006 «يفتحه من جواله», 018 «والغبار» riding the dust) |
| **flyOut** | `flyOut(el, t, [waypoints], d=0.42, rot=14, blur=6)` | Exits on a curve with the motion, faster than the entrance, with blur. | «ويطلع» بتطير مع اللفة; 018 «والغبار» blown out with the dust |
| **echoStack** | `echoStack(tok, t, n=5, gap=0.9, green)` | Outline copies stacked above the word collapse down into it. `green` alternates ink outlines. 018 used `3, 0.32` so it does not cover the line above. | «صور» متكررة بتتجمع |
| **rows** (behind layer) | `rows(parent=behind, word, y0, n, size, a, b, cls)` | Marquee rows of the outline word slide in opposite directions from a to b. Put them in `#behind` with the `fg-man.webm` depth matte so they pass BEHIND the man. | صفوف «ويستنى» ورا الراجل; 018 «ترتاح» |
| **trails** with squash | `trailsDrop(el, t, {y:-620, rot:10, toRot:-7, d:0.3, n:3, sy:0.84, sx:1.07, swing:true})` | The element drops with 3 ghost copies, squashes on landing, then swings on its string. `trails(el, n)` gives the raw ghosts and `squash(el, t)` the raw squash. | تاج بيقع بأشباح وبيتضغط (006 tag, 018 warranty tag, 018 night sheet) |
| **zigzag feather** fall | `feather(el, t, {from:{x:240,y:-560}, path, d:0.9})` | Falls from off-screen top on a zigzag path. The rotation swings 10/-10/7/-2/0 and the blur pulls focus 10 → 0. | «يخفف» نازلة زجزاج زي الريشة; 018 «وصيانة مجانية» |
| **slam** | `slam(tok, t, dir=1)` | A smear slam: x 240, scaleX 1.4, skew, blur 9, into place in 3 frames, then settles. For numbers and hard words. | 006 «٣٤», 018 ١٠/٥/٢ |
| **typeOn** | `typeOn(el, "str", t0, tEnd)` | An Arabic typewriter: ONE growing string, at most 14 characters a second, finished by tEnd. Pair it with `blink` for a caret. | 006 search bar, 018 dimension pill «العيب بالنافذة» |
| **kash** stretch | `kash(shortGrp, longGrp, t, d=0.75)` | The short word rises. Its long-tatweel twin (`تستـــــاهل`) then grows out of it: a clip from the short width to full. `kashIn(tok, t)` is the 006 one-word reveal. | 006 «ويستنى», 018 «تستاهل» |
| **selBox** + cursor | `selBox(el, t, tOff, col=dark)`, `cursor(parent, x, y, t, tClick, pressEl)` | A dashed selection box with four ink handles, plus a mouse cursor that glides in and clicks. `pressEl` dips on the click and overshoots. Do not put a selBox inside a `.scrap`: the torn clip-path hides it. | design-tool language; 018 CTA «احجز معاينة مجانية» |
| **stamp** | `stamp(parentScrap, "word", {left, top}, t, {s:74, r:-8})` | A bordered ink word presses down (scale 2.4 → 1). The carrier squashes, then the stamp overshoots. | 018 «المكتوب» on the contract scrap |
| **blurIn** | `blurIn(tok, t)` | Blur 8 px, a 14 px rise and opacity over 0.32 s, word by word on the voice. For connectors. | ROAR ref 01 word entrance |
| **inkIn** | `inkIn(tok, t)` | A masked rise in grey that turns to the dark ink (two-tone print). | 006 / 018 hook label first word |
| **snap** | `snap(parent, tok, t, flashEl)` | A marker scribble draws for 4 frames, then 1 frame of ink flash on `flashEl`, then the clean word is there. | hand to type (jordans.archivess ref 16); 006 «صور», 018 «النافذة» |
| **hl** | `hl(tok, t, flip=--on-ink)` | An ink highlight wipe behind the word (the token needs `hl: 1`). The text flips to `flip`. | 018 «بالأحساء», «الشمس», «مجانية» |
| **over** | `over(el, t, k=0.07, d=0.22)` | Overshoot as two stacked tweens: +k past rest, then a settle starting 2 frames before the first ends. | 006 «كبيرة» |
| **zoom-out** | `zoomOut(el, t, {s:3, y:160, d:0.28})` | The word fills the frame and pulls back to rest in 0.28 s. | 006 «عميلك», 018 brand name and «ترتاح» |
| **live** | `live(el, a, b, k=0.035)` | The group keeps breathing (scale 1 → 1+k) while it is on screen. It never freezes after its entrance. | «every group keeps breathing» (006 pass 4) |
| others | `rise(tok, t)`, `mark(parent, x, y, w, h, pathD, t, dur, col)`, `strike(tok, t)`, `blink(el, a, b)`, `jolt(els, t)`, `swallow(els, t)`, `out(els, t, to, d)`, `grain(D)` | Masked rise; marker arrows and circles; a marker strike-through; a blinking caret; the impact jolt («words jolt on a hit»); the camera dive swallowing a beat; a plain exit; film grain on twos. | 018 |

**The rule above the moves:** give every spoken line ONE named move, and change the move every beat. Text appears only when the picture shows that thing. Words react to the picture: they jolt on an impact, get swallowed by a dive, and exit with the motion.
