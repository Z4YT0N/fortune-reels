# 018: Alum Aman reel in the reel-006 style (Fortune collage + kinetic type)

Owner Mahmoud, 2026-11-08: «انا عاوز فيديو زي بتاع روور بالظبط زي اللي عملناه لفورتشن اول واحد».

His exact reference is reel 006 v6. **Watch it first**: `reels/006-gallery-continuity/renders/test-v6.mp4` (also v7). Extract frames at 12 fps around every word entrance and LOOK at them.

What he loves, in his words:
- «كلمات طايرة من برا الشاشة على باث منحني»: whole words fly in from off-screen on curved paths.
- «صور» متكررة بتتجمع: echoStack, outline copies collapsing into the word.
- «تاج بيقع بأشباح وبيتضغط»: a tag drops with ghost trails and a squash on impact.
- «صفوف «ويستنى» ورا الراجل»: marquee rows of outline words BEHIND the man (depth matte).
- «ويطلع» بتطير مع اللفة: a word exits on the camera's spin.
- «يخفف» نازلة زجزاج زي الريشة: a zigzag fall like a feather.

## Rejected before you (do not repeat)
- **Reel 016:** photoreal AI scenes on concrete pedestals, labels pasted over unrelated shots, and a voice stretched ×1.25. Verdict: «شخاخ… رخيصة».
- **A photoreal one-room storyboard:** «مش عاوز كدا».
- So: NO photoreal pedestal look, and NO plain captions.
- The style IS 006: a black-and-white halftone documentary cut-out collage on paper, one riso ink accent, hand-drawn marker marks, a continuous AI film underneath, and the 006 kinetic type library on top.

## Read (mandatory, in this order)
1. `.claude/skills/reel-style-fortune-collage/SKILL.md`: the whole pipeline and the motion library table. This is THE spec.
2. `reels/006-gallery-continuity/`:
   - `NOTE.md`, `test.tpl` (the template; copy its kinetic-type functions), `build_test.py`, `cues.json`, `make_textures.py`;
   - `research/style-bible-2026-11/bible.txt` and `B.png` / `C.png`.
3. `knowledge/content-engine/12-kinetic-type-engine.md` and `rules/text-motion.md`.
4. `C:/Users/Mahmoud/.claude/skills/fortune-content-engine/references/rules.md`, especially §6 (voice) and §10 (the post-016 gate).
5. **Client brand (read only):**
   - `E:/fortune projects/almanyum-aman/PRODUCT.md`;
   - `lib/business.js` (facts);
   - `public/images/logos/`;
   - fonts `public/font/thmanyah/`.

## Brand swap (006 → Alum Aman)
- **Ink:** 006's green #00DB33 becomes their teal **#0199a2**, with deep #017a82 for shadows and soft #01b8c3. Paper stays light #F0F1F2-ish grey with grain. Dark is #1d1d1d. No gold, no beige.
- **Fonts:** Zain becomes **Thmanyah Serif Display** for hero and stress words (kashida is fine if the font supports it; otherwise use stretch/scale). Plex becomes **Thmanyah Sans** for labels.
- **Name, logo, contact (their reel):** «ألمنيوم نظم أمان», logo on dark, alumaman.com, WhatsApp +966 56 634 3386, @nozomaman. No FortuneCode logo or contact.

## Story (write it in 006's continuity logic: each beat CAUSES the next)
- Subject: their windows, doors and aluminium facades for villas in Al-Ahsa.
- Allowed facts ONLY (`lib/business.js`):
  - **Warranty, written:** 10 years aluminium, 5 years paint, 2 years accessories.
  - **4 guarantees:** the installation date in the contract; the written warranty; «صيانة مجانية مدى الحياة»; «جودة تستاهل».
  - **Materials:** Guardian double glass, German silicone, EPDM rubber that resists heat and sun.
  - **Where:** they manufacture in Al-Ahsa and install in the Eastern Province.
  - **CTA:** «احجز معاينة مجانية».
- Unconfirmed, do NOT use: the years, the project counts, the rating, discounts.
- **Halftone collage world, suggested** (improve it, keep it continuous):
  1. A dust storm hits an old window cut-out; dust (halftone, teal ink) blows through the gap.
  2. A selection box and dimension pill on the window opening (the measure).
  3. A new slim black aluminium frame slams into the opening, with the iron-weight style impact from 006.
  4. The storm now bounces off the glass.
  5. A warranty tag hangs off the frame and drops with ghosts: 10 / 5 / 2.
  6. The same Saudi man (use 006's man reference `reels/006-gallery-continuity/assets` or `assets/cut/man-happy.png` style) relaxes inside.
  7. The CTA.
- **Hook, Gulf:** for example «شباكك يدخل عليك الغبار؟». Write 3 hooks and pick one.

## Hard limits
- **Voice:**
  - Clone `hKxOF1e0PGHjtctJDcOl`, eleven_v3, plain Gulf, no tashkeel.
  - About 2.3 words/s: **60–65 words max for about 28–30 s.**
  - **NO time-stretch above ×1.05.** If it is long, cut words.
  - Make 3 takes. Check them with STT AND word durations. Reject anything garbled.
- **Picture generation: use `node vendor/flow-direct/fd.mjs gen jobs.json --par 3`** (read `vendor/flow-direct/README.md`).
  - Images are free. Frames-to-video costs 15 per 5 s shot.
  - Max 3 parallel (Flow has a concurrent limit).
  - To use LOCAL references (B.png, C.png, the man), upload them once with the Flow MCP: `bash vendor/flow-locked.sh flow_upload_images '{...}'`, one call at a time. Then attach by media ID.
- **Budget:** at most 100 Flow credits.
- **Text:**
  - EVERY spoken line gets one named 006 move, and the moves change every beat.
  - Text appears only when the picture shows that thing.
  - Arabic is whole words only (never split letters, never `textPath`).
  - Hidden state is set at build time.

## CHECKPOINT: stop and report before spending video credits
After the script, the voice takes and the keyframes K0..Kn (free images), STOP and return:
- the script and the chosen take path;
- a keyframe contact sheet path;
- the transition map;
- the planned type move per line.

The orchestrator reviews it and tells you to continue. Do NOT generate video before that.

## After approval (when resumed)
- Shots go through fd.mjs.
- Build `bg.mp4`, the type layer copied from 006 `test.tpl`, the depth matte for the rows behind the man, and SFX about 2/s at -14 LUFS.
- Render: 60 or 120 fps plus tmix.
- QA:
  - stills at every word entrance (strip at 20 fps to prove no flash);
  - safezone and overlap checks;
  - watch the whole reel yourself with the audio, by sampling frames at 12 fps around every cut.
- Write `NOTE.md`.
- Do NOT send it on WhatsApp. The orchestrator reviews and sends.
- Final: `reels/018-alumaman-collage/alumaman-collage.mp4`.
