# 12. Kinetic type engine: skills acquired (2026-11-07)

The owner asked whether the reel 006 test was really the result of the text-motion study. He then said:
«اعمل كل الحاجات دي واكتسب كل المهارات دي وسجلها».

This file records what the engine can now do, how each move is done in code, and the traps found on the way.
Reference template: `reels/006-gallery-continuity/test.tpl`. Its header names the move used for every line.

## What the references actually do (12 fps strips, 2026-11-07)
- **ROAR (ref 01, 4-8 s).**
  - The type is SMALL, bold and dark grey. It sits right above the object it talks about, word by word.
  - Each word blurs in (about 8 px blur, a few px of rise, opacity) over about 3 frames at 12 fps.
  - The art comes from the OBJECT growing under the words: the shop builds up while «يعرف يكبر اللي بنيته» accumulates.
  - A cursor persists through the reel.
  - Exits blur out together with the scene. There is no push-out.
- **jordans.archivess (ref 16, 0-4 s).** Each word is first a hand scribble («HoW»), then snaps to clean type on a 1-frame colour flash (a yellow frame).
  - Dashed guides and a redaction slab («how daow» → slab → «how do you»).
  - A signature scribble draws «communicate», which is then typed small.
  - Light leaks and starbursts finish the shot.
- **Lesson:** the type is part of the world. It is anchored to a subject, passes behind it, and reacts to it. Big moves are rare and land on events.

## Moves now in the engine (all Arabic-safe)
| Move | How (GSAP inside HyperFrames) | Used on |
|---|---|---|
| ROAR blur-in | `blurIn`: opacity 0, y 14, blur 8 → 0 in 0.32 s power2.out, on the word's spoken frame | connectors («يفتحه من جواله»، «حجمه»، «اللي عندك») |
| Hand to type | `snap`: green marker scribble over the word's box for 4 f, then 1 f green flash of its paper, then the clean word | «صور» |
| Two-tone ink | `inkIn`: rise in grey #a3a5a7, darken to ink 0.3 s later | «معرض» |
| Kashida stretch | clip-path reveal of a long-tatweel copy, starting from the short word's width, stretched until the next word | «ويستنى» → «ويستنـــــى» |
| Arabic typewriter | `typeOn`: ONE string grows letter by letter (`TL.set textContent`), so the joins re-form; ≤ 14 chars/s, ends on the voice | dimension pill, search bar |
| Smear slam | 3 f: x 240 → -8, scaleX 1.4, skew -10°, blur 9 px; then a 0.3 s settle | «٣٤» on the impact, «ويطلع» |
| Zoom-out reveal | the word starts at 2.6-3.4× and pulls back to rest in 0.28 s expo.out | «عميلك» |
| Stacked overshoot | `over`: +7-9 % in 0.22 s power2.out, then a 50/50 settle starting 2 f earlier | «كبيرة» |
| Highlight wipe | green box scaleX 0 → 1 in 4 f, AFTER the word lands | «ميجا»، «جواله»، «ويطلع»، «يخفف» |
| Selection box + block cursor | dashed box with 4 green handles; cursor blinks at 0.4 s | the frame label |
| Object carries text | a tag drops with the prop, then hangs on a drawn string and swings | «حجمه ٣٤ ميجا» on the weight |
| Feather fall | sine sway (x ±30, rot ±4-9°), blur 12 → 0 focus pull, then the highlight | «يخفف» |
| Continuous life | `live`: every group scales 1 → 1.025-1.05 (sine) for its whole time on screen; nothing freezes | all groups |
| Tracked carrier | a div keyed to the phone bezel bbox, measured every 0.1 s with numpy on the film | notification, search bar |
| **Depth: text behind the subject** | `engine/tools/matte.py` (rembg u2net_human_seg) writes the subject as a VP9 WebM with alpha. It goes ABOVE the "behind" text layer (`#behind` < `#fgWrap` < `#front`), so the man occludes the word | «عميلك» huge behind the man |
| **Real motion blur** | render at `--fps 120`, then `tmix=frames=2` + `select=not(mod(n,4))` to 30 fps: a 180° shutter from real sub-frames, not CSS blur | the whole film |

## Traps (each cost a round with the owner)
- **Flash before an entrance.** Never `TL.set` a word visible before its tween. Put it in its hidden state at build time, then only `TL.to` out of it.
- **One move for everything = no craft.** Pick a different move per carrier and write the choice in the template header.
- **Captions.** Text in one fixed spot reads as subtitles. Give every line a carrier in its shot.
- **IDM.** An `<audio>` tag in the page makes the render browser fetch an mp3 from localhost, and the owner's Internet Download Manager pops up a download. Keep audio OUT of the page and mux it with ffmpeg after the render.
- **Matte quality.** rembg is clean once the subject is a clear figure. Frames where he is still emerging from torn paper are mush, so start the fg layer at 5.4 s, not earlier. Preview over navy before use.
- **Sparse keyframes in the film** make HyperFrames seek-freeze. Encode bg.mp4 with `-g 30 -keyint_min 30`.
- **Size:** a word behind the subject must still fit the safe width (x 60-960). 330 px «عميلك» ran off the left edge, so it is now 250 px.

## Still to build (honest gaps)
- `splitArabicText` per-glyph motion: untested.
- Text that the camera dives INTO to change scene (zoom-through a letter).
- Word-to-word morph in the Fortune style (the goo morph exists in reel 005's template).
- Beat-synced type: hits land on SFX peaks, not only on word starts.
- A separate read-only judge agent that scores each line /10 against the references.

## Correction (owner 2026-11-07): the first YouTube study was transcript-only
«انت متأكد انك اتعلمت من اليوتيوب كويس؟». No. `research/youtube-learning/01-05` were built from the CAPTION TEXT of tutorials. That gives principles (easing, overlap, timing) but no motion vocabulary. From now on, every motion study downloads the video and LOOKS at it: a 60-frame contact sheet per video, plus 12 fps strips on the moves that matter.

## Visual study, pass 5 (`research/youtube-learning/visual/`, sheets `sheet-<id>.jpg`)
| Video | Views | Moves seen |
|---|---|---|
| iwIy0enG6uU Max Miedinger | 714k | Words set at 90°/180° while the camera rolls to read them; words stacked into buildings in perspective; text on arcs; one continuous camera travelling between word clusters |
| tOX9hLmBxho Campfire | 836k | Echo stacks (NEW ×7, HUSTLE ×6 with one letter lit); a word grid with one line boxed; huge outline word behind small solid type; dot-matrix letters; letters scatter and gather; text framed inside a door |
| QuhVqLVzpA8 Stomp | 247k | Outline echoes (×3); a giant word slides through the frame; horizontal slice glitch; vertical side-label beside a word; a word wrapped on a 3D cylinder; diagonal wipes |
| TDC7eVrkduY Optious | 67k | Marquee rows of repeated text; letters dropping out of a word («begi n ning»); zoom-through into giant italic letters as a transition; text tracked onto a real billboard |
| hszNZTElIzE showreel | 133k | Warped/bent word (flag bend); scattered letters assembling; UI cards and cursor |
| ehxNODhMYQc Arabic kinetic | 1.6k | Words fly in diagonally from off-screen with motion blur; words on arcs; heavy weight contrast; stacked lines |

## Pass 5 moves added (Arabic-safe: whole words only, never split letters)
- **`fly`**: a word rides a curved path in from off-screen (GSAP MotionPathPlugin, curviness 1.25-1.6, rotation settles to 0). Used on the pill words, «كبيرة», and «يفتحه من جواله».
- **`echoStack`**: outline copies stacked above the word collapse down into it, alternating green and ink. Used on «صور».
  - The clones must live on the stage, NOT inside a paper scrap: the scrap's clip-path cuts them.
- **`trails` + squash**: three ghost copies lag 2 f apart on a fall, then scaleY 0.82 / scaleX 1.08 on the impact with a back.out settle. Used on the weight tag.
- **`rows`**: rows of repeated outline words slide in opposite directions, placed on the BEHIND layer so the man occludes them. Used on «ويستنى» ("waiting forever").
- **Curved exit**: «ويطلع» leaves on a motion path with -28° rotation, following the man's turn.
- **Zigzag fall**: «يخفف» comes from off-screen top along a 5-point zigzag path, with rotation swings like the feather and a blur-to-sharp pull.

## Traps
- **SVG `<textPath>` with Arabic** rendered broken (text missing or misplaced) in the HyperFrames browser. Move whole-word HTML elements along paths instead.
- Bash heredocs with long JS edits failed twice on Windows Git Bash. Write the patch to a .py file with the Write tool, then run it.
