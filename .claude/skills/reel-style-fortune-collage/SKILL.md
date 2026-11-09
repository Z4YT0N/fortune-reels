---
name: reel-style-fortune-collage
description: House style #1 for Fortune Code reels, the "Fortune collage" (owner pick 2026-11-07, directions B+C). It is a continuous AI film of black-and-white halftone documentary cut-outs on paper with green riso ink and green designer-marker marks, chained in Google Flow from Gemini keyframes, with kinetic Arabic type that lives in the scene, a depth matte, real motion blur and full sound design. Use when a reel should be made in this style, or to remake/extend reel 006.
---

# Style #1: Fortune collage (continuous film + type in the scene)

Everything below was learned on 2026-11-07 across 7 owner review rounds of reel 006 (`reels/006-gallery-continuity`).
Every rule exists because the owner rejected the version without it. Owner rules in `rules/` still win.

## 0. What the owner rejected, so it never comes back
| Owner words | Rule |
|---|---|
| «شكله رخيص… كأنه سلايدات ورا بعض مش فيديو واحد كونتينوس» | One continuous film. Each beat CAUSES the next; never clear to empty paper and rebuild. One hero per beat; a thread object persists. |
| «ممكن جزء كامل من الفيديو تعمله بال ai… ستايل جينيريشن لنفسنا يكون مميز» | AI may carry whole segments. Our own fixed style bible makes everything look like one brand. |
| «التكست كله في مكان واحد… كأنه كابشنز عادي» | Every line has a CARRIER in its shot and reacts to the picture. |
| «مبتستخدمش اي حاجه من اللي اتعلمتها» + words flash before animating | One named move per carrier from the library (§5). Build-time hidden state; never show a word before its tween. |
| «مفيش برضو اي sfx خالص يعتبر» | A designed hit on every visual event, about 2 per second of action. No loops, no ticking beds. |
| «النصوص مبتمشيش في باث موجه متعرجج ولا بتيجي من برا الشاشه… اتعلمت من اليوتيوب كويس؟» | Text TRAVELS: curved paths from off-screen, echoes, rows, trails, zigzag falls. Study motion by LOOKING at frames, never from transcripts. |
| «اربعتون وثلاثون ميقا» | Numbers spelled colloquially: «اربعه وثلاثين ميجا», «ميه واربعين كيلو». |

## 1. Style bible (fixed)
- Prompt block: `research/style-bible-2026-11/bible.txt`. Paste it into EVERY still and video prompt.
- Refs for Gemini: `research/style-bible-2026-11/B.png` (riso collage) + `C.png` (documentary photo + green marker; his man is the recurring character).
- Look:
  - real black-and-white documentary photos (Tri-X grain) printed as halftone cut-outs on paper #F0F1F2;
  - torn edges and tape;
  - green #00DB33 riso ink slightly mis-registered (deep green #006A39 for shadows);
  - hand-drawn green marker marks (circle, arrow, dashed selection box with handles, cursor).
- Green goes ONLY on the one object that matters in the moment. The top quarter stays calm for type. No text inside images.

## 2. Picture pipeline (continuous AI film)
1. **Transition map first.** Write how each beat causes the next.
   Example: selection box → the weight slams the pile → its green ink bursts and the paper peels to reveal the man with a spinner → he turns away, the camera dives into the phone, the gallery loads, a feather lands where the weight was.
2. **Keyframes K0..Kn** (one per beat boundary): `node ~/.claude/skills/gemini-image/scripts/gen.mjs --prompt Kx.txt --out Kx.png --ref B.png --ref C.png --aspect 9:16 --size 2K`. Look at them side by side before spending Flow credits.
3. **Upload to Flow.** Use the dedicated Brave: `vendor/start-flow-brave.cmd`, CDP 9333, profile already signed in.
   - Connect: `agent-browser --session fl --cdp 9333`. Never `connect` (it launched a new browser).
   - Hook the hidden file input: eval `HTMLInputElement.prototype.click` → keep the input in the DOM with id `fcFile`.
   - Click "Upload media", then `agent-browser upload "#fcFile" K0.jpg ...`, then click "I agree".
4. **Generate in Flow's agent panel.** Set the video default model to Omni 1.2 Flash, then for each shot:
   - attach Ki and Ki+1 as ingredients;
   - prompt: "frames-to-video, Ki FIRST frame, Ki+1 LAST frame, one continuous move, no cut, keep the exact look…";
   - click the NEW Approve radio.
   - Cost: 12 credits for 4 s, 15 for 5 s, at 720p.
   - Sending a new message before approving supersedes the old quote.
5. **Download** via `flow_video_status` (signed URLs) + curl with a browser User-Agent.
6. **Retime to the voice and concat** to `assets/video/bg.mp4`: `trim` + `setpts=(PTS-STARTPTS)/speed`, 1080x1920, 30 fps, `-g 30 -keyint_min 30`. Sparse keyframes freeze HyperFrames seeks.
7. **Measure the film for the type layer:**
   - gridded stills with `ffmpeg … drawgrid`;
   - track moving carriers (the phone bezel) with a numpy dark-pixel bbox every 0.1 s, keyed into a `#ph` div.

## 3. Depth and finish
- **Text behind the subject:**
  - `python engine/tools/matte.py assets/video/bg.mp4 <start> <dur> assets/video/fg-man.webm` (rembg, VP9 alpha).
  - Layer order: `#behind` text < `#fgWrap` video < `#front` text.
  - Start the fg only where the matte is clean (preview RGBA over navy first).
- **Real motion blur:** `hyperframes render --fps 120`, then
  `ffmpeg -i v120.mp4 -i mix.mp3 -filter_complex "[0:v]tmix=frames=2:weights='1 1',select='not(mod(n\,4))',setpts=N/30/TB" -r 30 …`.
  It takes about 24 min per 12 s; iterate with `--quality draft` at 30 fps.
- **No `<audio>` in the page.** The owner's IDM grabs the localhost mp3. Mux the audio after the render.
- **Grain:** 6 tiles cycled every 2 f, soft-light at 0.55.

## 4. Type carriers (each line lives in its shot)
- Design-tool frame label on a paper scrap over the selection box.
- Dimension pill on the box edge.
- Tag hanging off the prop on a drawn string.
- Marker-written word with an arrow drawn to the subject.
- Paper strip across the person.
- Huge word BEHIND the person (depth matte).
- Push notification and search bar tracked onto the phone.
- Words above the subject that fall like its prop.
- Position and scale change every beat.
- Type REACTS: it jolts on the impact, the transition swallows it, and it leaves with the motion.

## 5. Motion library (Arabic-safe: whole words or one growing string, never split letters)
| Function | Move | Source |
|---|---|---|
| `fly` | whole word rides a MotionPath curve in from off-screen, rotation settles | Arabic kinetic + Max Miedinger (visual study) |
| `echoStack` | outline copies stacked above collapse into the word; clones on the STAGE, outside clip-paths | Campfire NEW ×7 |
| `rows` | marquee rows of outline words sliding opposite ways, on the behind layer | Campfire / Optious |
| `trails` + squash | 3 ghost copies 2 f apart on a fall; scaleY .82 / scaleX 1.08 on impact, back.out settle | smear stylised |
| curved exit / zigzag fall | MotionPath out with rotation; 5-point zigzag with rotation swings and blur pull | feather |
| `snap` | marker scribble 4 f → 1 f green flash → clean word | jordans.archivess |
| `blurIn` | blur 8 px + 14 px rise + opacity in 0.32 s, on the spoken frame | ROAR 12 fps study |
| `inkIn` | rise grey → ink | designer two-tone |
| `kash` / stretch | clip reveal; a long-tatweel copy grows from the short word's width | Arabic only |
| `typeOn` | ONE string grows letter by letter (joins re-form), ≤ 14 chars/s | Arabic typewriter |
| `slam` | 3 f smear (x 240, scaleX 1.4, skew, blur 9 px) then a 0.3 s settle | ROAR |
| zoom-out | starts at 2.6-3.4×, pulls back in 0.28 s expo.out | ammar |
| `over` | +7-12 % then a 50/50 settle, as two stacked tweens | YouTube study |
| `hl` | green box wipes in 4 f AFTER the word lands | getripping |
| `selBox` + cursor | dashed box with 4 green handles; block cursor blinks at 0.4 s | design tools |
| `live` | every group keeps scaling 1 → 1.03-1.05 while on screen | never freeze |

Hard rules:
- Set every word's hidden state with `gsap.set` at build time. Only ever `TL.to` out of it.
- Never use SVG `<textPath>` for Arabic (it renders broken). Move whole words along paths instead.
- Write in the template header which move each line uses.
- Strip every entrance at 20 fps to prove there is no flash.

## 6. Sound design
- `cues.json` holds `[t, name|library path, volume]`, about 2 cues per second of action, each on a real event:
  - paper in, reveal, impact (iron + glass), slam, tear, marker, tape, stretch;
  - notification, whip, feather, highlight.
- Missing sounds: add to `engine/tools/sfx_library.json` → `python engine/tools/sfx.py <reel> gen` (ElevenLabs).
- Mix with `sfx.py mix`, then trim, fade at the next word's start, and `loudnorm I=-14 TP=-1.5`.
- No loops, no typing beds.

## 7. Voice
- Clone `hKxOF1e0PGHjtctJDcOl`, eleven_v3, plain Gulf text, no tashkeel, one request.
- Numbers spelled colloquially: «اربعه»، «ميه».
- Make 3 takes and pick by STT plus word durations. The owner has the final ear.

## 8. Gates before delivery
- `rules/owner-checklist.md`, every line with evidence: continuity, type lives in the scene, safe zone, overlap, motion, tick, LUFS.
- Key stills (one per beat) and entrance strips.
- Desktop copy + WhatsApp from fc-system only (`engine/tools/wa_send.py`).

## Files
- Template: `reels/006-gallery-continuity/test.tpl` (+ `build_test.py`).
- Knowledge:
  - `knowledge/content-engine/11-fortune-style.md`
  - `knowledge/content-engine/12-kinetic-type-engine.md`
  - `research/youtube-learning/visual/`

## Type pairing (owner 2026-11-07)
Zain mob-long for hero and stress words (kashida moves); IBM Plex Sans Arabic for connectors, labels, UI, sources and Latin. Full rule: `rules/text-motion.md` → "Type pairing in reels".
