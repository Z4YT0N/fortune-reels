# Style lab: one ~9.7 s segment per style (owner: «اعمل جزء الفيديو بكل ستايل منهم… بكل دقة وتفاصيل وصبر وعمق»)

Every style uses the SAME voice and words, so the owner can compare styles fairly.

## Shared inputs (`reels/007-style-lab/shared/`)
- `vo.mp3`: Gulf Arabic voice-over, 9.73 s.
- `words.json`: `[word, start_s, end_s]` per word (22 words):
  - 0.00 معرض · 0.40 صور · 0.67 في · 0.80 موقع · 1.18 شركة · 1.51 كبيرة،
  - 2.06 حجمه · 2.44 اربعه · 2.76 وثلاثين · 3.20 ميجا.
  - 3.73 عميلك · 4.12 يفتحه · 4.53 من · 4.69 جواله،
  - 5.28 ويستنى، · 6.19 ويستنى، · 7.15 ويطلع.
  - 7.87 لا · 7.97 تدور · 8.36 على · 8.54 صور · 8.80 أقل.
  - Meaning: "A photo gallery on a big company's website, 34 MB. Your client opens it on his phone, waits, waits, and leaves. Don't look for fewer photos."
  - On screen, «٣٤ ميجا» may be shown in Arabic-Indic digits.
- `zain-mob-long.ttf`: the ONLY Arabic font allowed (the owner's rule). Inter or a neutral sans only for Latin, if any. Do not use the other Zain family files.
- `grain0-5.png`: soft-light grain tiles.

## Hard rules (the owner rejected every one of these before)
1. **One continuous piece**: every change is motivated by the previous one. Never clear to an empty frame and rebuild like slides.
2. **Type lives in the design** and moves with craft. It is not subtitles in a fixed spot. Use the style's own text vocabulary.
3. **Arabic letters never split.** Animate whole words, or grow ONE string. Never SVG `<textPath>` for Arabic (it renders broken). Right-to-left: stagger and reading order go right to left; `direction: rtl`.
4. **No flash before an entrance**: set each word's hidden state at build time (`gsap.set`), then only `TL.to` out of it.
5. **Safe zone** on 1080x1920: all text and key visuals inside x 60-960, y 230-1440.
6. **NO `<audio>` element in the page** (the owner's download manager grabs it). Render silent, then mux with ffmpeg:
   `ffmpeg -i video.mp4 -i mix.mp3 -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest out.mp4`
7. **Brand colours:** #121416 black, #00DB33 green, #006A39 deep green, #F0F1F2 light. A style may add ONE neutral (paper, beige) if the look needs it. No gradients or glows on backgrounds unless the style truly requires it.
8. **Nothing AI-glossy.** Grain or real texture is welcome.
9. **SFX:** a designed hit on real visual events only (~1-2 per second of action). No loops, no ticking. The voice stays clear. Final mix about -14 LUFS (`loudnorm=I=-14:TP=-1.5`).
   - Sources:
     - `assets/sfx-library/owner-pack-2026-11/`, `assets/sfx-library/motionix/`, `assets/sfx-library/vint/`
     - `reels/006-gallery-continuity/assets/sfx/` (incl. iron_impact, paper_tear, marker, ink_splash, tape_strip, stretch, feather, paper_slide).

## Tools
- **HyperFrames 0.8.152** (HTML + GSAP rendered to video).
  - Reference composition: `reels/006-gallery-continuity/test.tpl` + `build_test.py`.
  - `hyperframes.json` / `package.json` patterns are in the same folder.
  - Root: `<div id="main" data-composition-id="main" data-start="0" data-duration="D" data-width="1080" data-height="1920">`. Timed clips need `class="clip" data-start data-duration data-track-index`.
  - One paused GSAP timeline in `window.__timelines["main"]`; build async with `window.__hf.buildReady["main"] = build()`.
  - GSAP CDN: `https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js` (+ `MotionPathPlugin.min.js`).
  - Render: `npx --yes hyperframes@0.8.152 render --quality draft --workers 2 --output renders/x.mp4`. Use draft for checks and `--workers 2` for the final (the machine is shared).
- **Images:** `node ~/.claude/skills/gemini-image/scripts/gen.mjs --prompt p.txt --out x.png [--ref r.png] --aspect 9:16 --size 2K`. Write prompts to a file. For a transparent cut-out, prompt a flat #00FF00 background, then `python ~/.claude/skills/gemini-image/scripts/chroma.py raw.png out.png`.
- **Real footage:** Mixkit direct MP4 `https://assets.mixkit.co/videos/<id>/<id>-720.mp4` (free licence).
- **ffmpeg** for grading, dither, etc. **rembg** (python) for mattes; see `engine/tools/matte.py`.
- **If the Write tool refuses a file, write it via Bash** (python or a heredoc).

## Method (be patient and deep)
1. **Study:** look closely at the reference frames for the style (`research/youtube-learning/boards/<name>.jpg`, plus the source video in `research/youtube-learning/visual/` or `reel-styles-2026/` at 12 fps).
2. **Map the beats:** write a short beat map (which visual on which words, how each beat causes the next).
3. **Make assets.**
4. **Build** the composition in YOUR folder `reels/007-style-lab/<style>/`.
5. **Check:** draft render → 12 fps strips around every entrance and transition → look → fix. At least 2 iterations.
6. **Final render** (`--workers 2`), then the SFX mix and mux to `reels/007-style-lab/<style>/<style>-final.mp4`.
7. **Make** `reels/007-style-lab/<style>/keys.jpg` (6 key frames side by side).
8. **Reply** with:
   - the final path;
   - what makes it faithful to the reference style;
   - a beat map;
   - honest weak points.
