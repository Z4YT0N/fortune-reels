# Effects library: every text move we have built, by name

Owner, 2026-11-10, after asking how the waving «معرض صور» opening of reel 008 was made: «انا عاوز افكتات كتير زي دي تتسجل في الاسكيل».
So every good text effect from reels 001–018 and the 007 style lab is now a named move in code.

- **Code:** `engine/kinetic/kinetic.js` (moves `K.*`, 28) and `engine/kinetic/fx.js` (moves `X.*`, 32). A scaffolded collage reel gets both in `lib/`.
  - `const K = Kinetic.create(TL, { words: WORDS }); const X = Kinetic.fx(TL, K);`
  - Standalone (no kinetic.js moves needed): `const X = KineticFx.create(TL, { stage, front });`
- **See them:** `engine/kinetic/gallery/gallery.mp4`: all 61 slots, about 2.2 s each, name and source under each. Contact sheet: `engine/kinetic/gallery/contact-sheet.jpg`. Rebuild: `cd engine/kinetic/gallery && python build.py && npx --yes hyperframes@0.9.20 render --output gallery.mp4 && python sheet.py`.
- **Rules the moves keep:** hidden state at build time; frame-baked loops are `TL.set` per frame through `frames()`; Arabic whole words only. The only slicing is VISUAL (flagWarp strips, sliceGlitch bands): each strip holds the full phrase and only clips it.
- `t` = when the move lands (use `V(i)` = word i's spoken frame). Colours are the brand variables (`C.ink`, `C.dark`, `C.paper`, ...).

## warp / distort
| Move | Call | What it looks like | Use it for | Source | Owner |
|---|---|---|---|---|---|
| **X.flagWarp** | `flagWarp(parent, "معرض صور", {t, cx, cy, size:200, strips:128, reveal:[0,0.4], w0:400, wBig:850, wHold:470, exitAt:2.06, exit})` | The phrase pops small, balloons to full width with its ends bowed (left up, right down), a wave runs through it like a flag in wind, settles, then shrinks away up-right. 128 vertical strips of the whole phrase. | The hook / opening phrase; a name or product you want remembered. | 008 showreel.tpl:110-148 | The opening he asked about («زي دي») |
| **X.sliceGlitch** | `sliceGlitch(parent, "صور", {cx, cy, size:430, maxW, cuts, out}, t)` | The word arrives in 3 horizontal bands that jump sideways for 3 frames, then lock; `out` jitters again and flies the bands apart. | A hard cut, a glitch, "something is broken", a fast beat change. | 007 stomp.tpl:79-84, 168-170, 279-286 | |
| **X.unfold** | `unfold(el, t)` | A giant word or number opens out of a flat line (scaleY 0.02 → 1, back overshoot). | A big number reveal (٣٤), a size. | 007 optious/index.html:173-176 | |
| **X.kashGrow** | `kashGrow(el, "ويستن", "ى،", a, b, {n, maxW, pow:0.85, under})` | ONE string grows its tatweel frame by frame, so the word stretches long; `under` = an ink underline that grows with it like a progress bar. | Waiting, slowness, luxury («الفخم»), "it drags" («يبطئ»), «صلحنا» one by one. | 008 showreel.tpl:321-336; 008 ext.js:259-264; 009 showreel.tpl:159-171; 010 ext.js:91-116 | «يبطئ» callback to «ويستنى» |
| K.kash | `kash(shortGrp, longGrp, t, d)` | The short word rises, then its long-tatweel twin grows out of it (clip). | Same family as kashGrow, but one clean reveal. | kinetic.js:239 (006, 018) | |

## travel / paths
| Move | Call | What it looks like | Use it for | Source | Owner |
|---|---|---|---|---|---|
| K.fly | `fly(el, t, [start, ...waypoints], d, rot)` | A whole word rides a curve in from off-screen. | Any arrival; words that come "from" somewhere. | kinetic.js:176 | «كلمات طايرة من برا الشاشة على باث منحني» |
| K.flyOut | `flyOut(el, t, [waypoints])` | Exits on a curve, faster, blurred. | Exit with the motion. | kinetic.js:182 | |
| K.feather | `feather(el, t, {from, path, d})` | Zigzag fall with rotation swings and a focus pull. | Relief, lightness («يخفف»). | kinetic.js:229 | «يخفف» نازلة زجزاج زي الريشة |
| **X.spinIn / spinOut** | `spinIn(el, t, d=0.2)`, `spinOut(el, t, d=0.14)` | The word turns in like a dial (rotation 50 → 0, blur), or out (-45). | Swapping words in one spot (a ring, a badge, a phone screen). | 007 campfire.tpl:79-81 | |
| **X.whipOut** | `whipOut(el, t, {dir:-1, trail:{parent, x, y, w}})` | A small wind-up, then the word whips off with skew, stretch and blur, leaving a thin ink line that retracts. | "He leaves" («ويطلع»), a fast exit. | 007 campfire.tpl:284-298 | |
| **X.giantSweep** | `giantSweep(parent, "ويطلع", t, {cy, w:1450, col, panel})` | A giant word slides across the frame dragging the next scene's colour behind it: the word IS the wipe. | Scene change on a strong word. | 007 stomp.tpl:250-263 (optious 239-252 same idea) | |
| **X.drum** | `drum(parent, ["عميلك","يفتحه","من","جواله"], {cx, cy, size}, times)` | Words sit on the faces of a 3D drum; each word rolls the drum one face, the front word is solid, the rest outlines. | A fast list of 3–5 words in one spot. | 007 stomp.tpl:178-212 | |
| **X.strikeFall** | `strikeFall(el, t, {path, rot, col})` | An ink bar strikes the old value out, then it falls away on a zigzag, turning and fading. | Before → after (٣٤ ميجا → ١٤٠ كيلو). | 008 ext.js:165-181; 009 ext.js:104-107; 011 ext.js:124-129 | |
| **X.orbit** | `orbit(tiles, a, b, {cx, cy, rx:370, ry:195, tilt:-10, speed, to:{x,y,t}})` | Tiles (photos) fly in onto a tilted ellipse around the phrase and orbit with depth; `to` sucks them into a point. | "All the photos are still there"; a gallery, many items around one idea. | 008 showreel.tpl:150-183 | |

## stack / echo
| Move | Call | What it looks like | Use it for | Source | Owner |
|---|---|---|---|---|---|
| K.echoStack | `echoStack(tok, t, n, gap, green)` | Outline copies stacked above collapse into the word. | A word that "gathers" («صور»). | kinetic.js:187 | «صور» متكررة بتتجمع |
| K.rows | `rows(behind, word, y0, n, size, a, b, cls)` | Marquee rows of the outline word slide in opposite directions (behind the subject with the matte). | A feeling that fills the frame (waiting, relief). | kinetic.js:215 | |
| **X.echoRings** | `echoRings(parent, "ويستنى", {cx, cy, size, rings:3}, t, tScroll)` | Outline copies step OUT of the solid word ring by ring; on `tScroll` the stack scrolls up one row and the word re-slams. | Repetition: the second «ويستنى», "again and again". | 007 stomp.tpl:221-248 (campfire 242-282 same idea) | |
| **X.wordGrid** | `wordGrid(parent, "صور", {box:{row, words, times}, rows:15, size:50}, t, tOut)` | A page-filling grid of one small word pops in from the centre; one row is an ink box where the phrase types in right to left; `tOut` rains the grid down. | "So many photos"; quantity; a phrase that must stand out of a crowd. | 007 campfire.tpl:109-158 | |
| **X.popIn + shoulder + dropAway** | `pill(parent, text, {size, bg, col, cx, cy, rot, border})`, `popIn(el, t, rot)`, `shoulder(big, [others], t)`, `dropAway(els, t)` | Pill tags pop in (hard back overshoot), the big one shoulders the others aside and squashes, then all drop like weights. | Listing attributes («في موقع» «شركة» «كبيرة»), then "here comes the weight". | 008 showreel.tpl:185-202; 011 showreel.tpl:148-165 | |
| (carrier) X.outlineWord | `outlineWord(parent, text, size, stroke, fill, sw)` | A clean OUTER outline of joined Arabic (stroke layer + fill layer), no inner join lines. | Outline words on a flat ground. | 007 campfire.tpl:70-76 | |

## number / counter
| Move | Call | What it looks like | Use it for | Source | Owner |
|---|---|---|---|---|---|
| **X.countRoll** | `countRoll(el, from, to, a, b, {fmt, ease})` | The number rolls on the voice (expo.out), Arabic digits by default (`X.AR`). | Every spoken number. | 008 showreel.tpl:225-229; 009 ext.js:43,52; 011 showreel.tpl:106 | counter 4 → 34 |
| **X.unitSlam** | `unitSlam(num, unit, t)` | The unit («ميجا») slams down from 2.2×, the number bloats tall and settles elastic. | The moment a size lands. | 008 showreel.tpl:230-232; 012 showreel.tpl:144-145 | «ميجا» slam + number bloat |
| K.slam | `slam(tok, t, dir)` | Smear slam from the side in 3 frames. | Hard numbers and hard words. | kinetic.js:118 | |
| K.zoomOut | `zoomOut(el, t, {s, y, d})` | The word fills the frame and pulls back. | A result, a brand name; the counter zoom-out (008 «١٤٠»). | kinetic.js:252 | |
| **X.getHeavy / getLight** | `getHeavy(card, a, hit, {k, shadow, dip})`, `getLight(card, t, {shadow, until})` | Heavy: the card swells while the number grows, then drops and flattens on the hit, shadow spreads, labels dip. Light: the card lifts and floats. | Weight (slow, big file) vs relief (fast, small). | 008 showreel.tpl:233-240; 008 ext.js:190-192 | the card that gets heavy |
| **X.hangTag** | `hangTag(parent, {x,y}, "٣٤", "ميجا", {size, bg, col}, kicks, a, b)` | A weight tag hangs on a string and swings as a damped pendulum; every kick `[t, amp]` adds a swing. | A number that weighs something down. | 012 showreel.tpl:123-149, 276-277 | |

## stamp / impact
| Move | Call | What it looks like | Use it for | Source | Owner |
|---|---|---|---|---|---|
| K.stamp | `stamp(scrap, "بس.", {left, top}, t, {s, r})` | A bordered word presses down, the carrier squashes. | A verdict on paper. | kinetic.js:254 | |
| **X.stomp** | `stomp(el, t, dy=-620)` + `shake(world, t+3F, {cam:16})` | The word falls stretched tall, lands squashed wide, springs back; the world kicks. | Heavy words («ثقيل؟», «حمل», «أقل»). | 007 stomp.tpl:68-77 | |
| **X.slab** | `slab(parent, box, "لا.", t, {size, rot})` | An ink slab wipes over the word it answers and a big word lands on it. | The answer to a hook question («بطيء؟ لا.»). | 009 showreel.tpl:172-181 | |
| **X.shake** | `shake(el, t, {cam:amp})` / `{kind:"wobble"}` / `{kind:"no"}` | Camera kick / a stuck word trembling / a button refusing. | Impact; frozen page («تتحرك.»); "not allowed". | 007 stomp.tpl:73-77; 011 showreel.tpl:312-313; 010 showreel.tpl:172 | |
| K.jolt | `jolt(els, t)` | Everything on screen kicks on a hit in the picture. | Impact in the film. | kinetic.js:265 | «words jolt on a hit» |
| K.trailsDrop | `trailsDrop(el, t, {...})` | Drops with ghost copies, squashes, swings on its string. | A tag or sheet arriving. | kinetic.js:205 | |
| K.over | `over(el, t, k, d)` | Two-tween overshoot. | Stress on a word already there. | kinetic.js:124 | |
| **X.flood** | `flood(parent, x, y, t, {word, pop, col, r})` | A disc pops open with its word, then floods the whole frame: the next colour. | Colour change into a new beat. | 007 campfire.tpl:99-107 | |
| **X.panelPush** | `panelPush(parent, col, t, {word, push:[els]})` | The next colour panel pushes up from below carrying its word; the old word is shoved out the top. | Fast word-to-word beats (one word per panel). | 007 stomp.tpl:96-102 | |
| K.swallow | `swallow(els, t)` | A camera dive swallows the words. | A dive in the film. | kinetic.js:267 | |

## UI-carrier (search bar, toast, card, button)
| Move | Call | What it looks like | Use it for | Source | Owner |
|---|---|---|---|---|---|
| K.typeOn | `typeOn(el, "str", t0, tEnd)` | One growing string. | Typed text in a pill. | kinetic.js:126 | |
| K.blink | `blink(el, a, b)` | Blinking caret. | With typeOn. | kinetic.js:163 | |
| **X.searchBar** | `searchBar(parent, {left, top, w, h}, [[word, t0, t1]...], {t, size, until})` | A dark bar with an ink magnifier; the query types itself word by word on the voice, caret blinking. Same carrier for a URL bar or a comment field. | Searching («دور على…»), the CTA keyword («انطباع»). | 008 ext.js:15-39; 009 ext.js:205-221; 010 ext.js:172-186 | the search-bar typeOn with a caret |
| **X.toast** | `toast(parent, box, [[word, t]...], {key, until})` | A UI toast drops from the top; its words light up on the voice, the key word gets an ink chip, the last pops, the timer bar runs. | A tip, an advice line («لا تدور على صور أقل.»). | 008 showreel.tpl:359-375 | the toast drop |
| **X.clipCard** | `cc = clipCard(parent, {rect, rad, col, from}); cc.open(t); cc.expand(t); cc.swipe(t)` | A dark card pops out of a point; it swells into a whole new world; later the world shrinks back to a card and is flicked away. Content goes in `cc.layer`. | Entering a "file" or a "dark world" of numbers, then leaving it. | 008 showreel.tpl:204-211, 248-252, 343-357; 009 ext.js:166-175 | |
| **X.click** | `click(parent, x, y, t, {rings:{l,t,w,h,rad}, col})` | A ripple at the click, plus three rounded rings bursting off the clicked card. | Every cursor click (with K.cursor). | 008 showreel.tpl:241-246, 294-295 | |
| K.selBox + K.cursor | `selBox(el, t, tOff)`, `cursor(parent, x, y, t, tClick, pressEl)` | Dashed selection box with handles; a cursor that glides in and clicks. | Design-tool language; the CTA. | kinetic.js:142, 151 | |
| **X.circleWipe** | `circleWipe(parent, x, y, t, {col})` | The colour grows from the click point over everything. | The button wipe into the end card. | 008 ext.js:288-290; 010 ext.js:152-153 | the button wipe |
| **X.credits** | `credits(parent, items, col, t)` | Four small corner labels (site, topic, year, brand), showreel style. | A frame for showreel-style reels. | 008 showreel.tpl:98-107 | the corner credit labels |

## reveal / mask
| Move | Call | What it looks like | Use it for | Source | Owner |
|---|---|---|---|---|---|
| K.rise | `rise(tok, t)` | Masked rise. | Default word entrance. | kinetic.js:114 | |
| K.inkIn | `inkIn(tok, t)` | Masked rise in grey, then the ink colour. | Two-tone print, first word. | kinetic.js:115 | |
| K.blurIn | `blurIn(tok, t)` | Blur + rise + fade. | Connectors. | kinetic.js:116 | |
| **X.wipeIn** | `wipeIn(tok, t, d=0.42)` | A soft right-to-left wipe with a small drift (reading order). | Quiet connector lines, premium/minimal beats. | 007 minimal.tpl:120-124 | |
| K.snap | `snap(parent, tok, t, flashEl)` | Marker scribble 4 frames, ink flash, clean word. | Hand to type. | kinetic.js:167 | |
| K.hl | `hl(tok, t)` | Ink highlight wipe behind a word. | The key word of a line. | kinetic.js:117 | |
| **X.under / X.circle** | `under(tok, t, d)`, `circle(tok, t, d)` | A hand-drawn ink underline or circle draws around the word. | Pointing at the important word. | 006 template.tpl:202-224, 248 | |
| K.mark / K.strike | `mark(parent, x, y, w, h, d, t)`, `strike(tok, t)` | Marker arrows / strike-through. | Point at the picture; cross out. | kinetic.js:131, 140 | |
| K.kashIn | `kashIn(tok, t)` | A long-tatweel word revealed right to left. | A long word. | kinetic.js:250 | |
| **X.guides + crooked** | `guides(parent, [{x,y,w,rot,col}], t)`, `crooked(el, t, rot=-7)` | The word lands tilted and dashed designer guides draw in, showing it is off. | "Not done right" («انضبط»), the work that wasn't finished. | 009 showreel.tpl:286-293; 006 template.tpl:249 | |
| **X.eyeBlink** | `eyeBlink(parent, t)` | Two dark lids close over the frame and open: a real blink. | «قبل ما ترمش», instant speed. | 008 ext.js:234-240 | «ترمش» with a real blink |
| **X.neon** | `neon(parent, ["صور","أقل."], {cx, cy, size}, times, hum)` | Words as neon tubes: an unlit outline, then each flickers on, then hums. | A closing line, a sign, a night scene. | 007 campfire.tpl:320-338 | |

## idle / breathing
| Move | Call | What it looks like | Use it for | Source | Owner |
|---|---|---|---|---|---|
| K.live | `live(el, a, b, k)` | The group keeps breathing. | Everything that stays on screen. | kinetic.js:165 | «every group keeps breathing» |
| X.getLight `{until}` | see above | Lifts, then floats on a sine. | A light object at rest (008 «يخفف» float). | 008 ext.js:51, 190-192 | |
| K.out | `out(els, t, to, d)` | Plain exit. | Clearing a beat. | kinetic.js:268 | |
| K.grain | `grain(D)` | Film grain on twos. | Always, whole film. | kinetic.js:270 | |

## Same as another move (not ported twice)
- 008/009/010/011 `slamIn`, `curveIn`, `blurIn`, `zoomOut`, `exitUp`, `popIn` variants = K.slam, K.fly, K.blurIn, K.zoomOut, K.out, X.popIn.
- «بس.» stamp (008 ext.js:172, 189) = X.pill + X.popIn. The 010 rubber stamp «أمثلة» (ext.js:64-68) = K.stamp.
- 009 «ثقيل؟» heavy drop (ext.js:200-203) and 011 «حمل» (showreel.tpl:199-202) = X.stomp.
- The «يخفف» hero (008 ext.js:40-52): ghost trails on a motion path = K.fly + K.trails, then the feather float = X.getLight / K.live.
- The «ترمش» beat = K.zoomOut + X.eyeBlink. The counter zoom-out (008 ext.js:183) = K.zoomOut + X.countRoll.
- 009/010 comment field and 010/012 URL bar = X.searchBar. The 009/011 dark-world flick = X.clipCard.swipe.
- 012 "Still loading…" sticker slap = K.fly + K.squash. 012 string snap + tag fall = X.strikeFall on the tag.
- Wes title-card step (wes/index.html:71) and Novella letter-board (novella.tpl:164-168) = K.hide + K.showAt with a 2-frame fade.
- Optious pop (optious:75-78) = X.popIn. Optious «أقل» drop off the baseline (269-270) = X.stomp with a small dy.
- 006 `cascade`, `pushOut`, `punch` = K.rise staggered, K.out, K.over.

## Skipped (and why)
- Props that are not text: the 009 balance scale and kettlebell, the 009/011 stopwatch, 100 visitor dots, 011 chart bars cut/press, 010 scan line with flags and the flag-to-check board, the phone button morphing into a progress bar, padlock. They are scene-specific; copy them from the reel file if a reel needs the same prop.
- Camera/shot tools: Wes whip pan (needs an SVG filter per shot), Max ink-box tower + camera roll, Optious homography street sign, zoom-through into the ink of a digit, pixel-block shatter, glitch colour edges, campfire floating crosses and speed lines, Minimal faded ghost word. Possible later additions; not core text moves.
- 001–005 templates: older engine, no move that is not already above.

## Pick a move per beat (cheat sheet)
| Beat | First choice | Also good |
|---|---|---|
| Hook / opening phrase | X.flagWarp | X.sliceGlitch, X.wordGrid, X.drum |
| A question | X.slab (to answer it) | K.slam on the question word, X.guides+crooked |
| Weight, slow, heavy | X.getHeavy, X.stomp | X.hangTag, X.kashGrow, X.dropAway |
| Waiting | X.kashGrow (+under) | X.echoRings, K.rows, K.blink |
| A number | X.countRoll + X.unitSlam | X.unfold, K.zoomOut, X.hangTag |
| Before → after | X.strikeFall → K.zoomOut | K.strike, X.getHeavy → X.getLight |
| Relief, light, fast | X.getLight, K.feather | X.eyeBlink («قبل ما ترمش»), X.whipOut |
| Speed | X.whipOut, X.giantSweep | X.panelPush, K.slam |
| A list of attributes | X.popIn + X.shoulder | X.drum, X.wordGrid box row |
| Scene change | X.flood, X.giantSweep, X.clipCard.expand | X.panelPush, X.circleWipe, K.swallow |
| Advice / the lesson | X.toast | X.neon, X.wipeIn |
| Search / "find someone" | X.searchBar | K.typeOn + K.blink |
| CTA | X.searchBar (keyword) + X.click + X.circleWipe | K.selBox + K.cursor, K.hl |
| Pointing at one word | K.hl | X.under / X.circle, K.mark |
| Everything that stays | K.live | X.getLight {until} |
