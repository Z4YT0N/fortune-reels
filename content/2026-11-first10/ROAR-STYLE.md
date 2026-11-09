# ROAR style for Fortune reels (owner, 2026-11-07: «اعمل باقي الريلز بستايل روور مش ستايل الشو ريل»)

## Reference
ROAR (roar.agency.sa). Look at these frames FIRST:
- `research/refs-2026-11/sheets/txt-roar.jpg`: ref 01, stores. Product cards on a concrete pedestal, a starburst behind them, a receipt printing, a flashlight sweep, an invert flash.
- `research/refs-2026-11/sheets/txt-roar5.jpg`: ref 05. A split frame with two real Saudi men on armchairs, a torn edge between them, a kashida headline, a 1-frame invert flash, a flat colour ground with a keyboard and earphones in the corners, a paper note dropping with «بصمم بالـAI».
- `research/refs-2026-11/style-test/ref-roar-a.png`, `ref-roar-b.png`.
- Notes: `knowledge/content-engine/03-visual-style.md` (ROAR section) and `knowledge/content-engine/12-kinetic-type-engine.md` (ROAR row).

## What makes it ROAR (translated to Fortune colours)
- **Ground:**
  - textured paper in light grey #F0F1F2, with real paper grain (generate one paper texture with Flow, or reuse `reels/006-gallery-continuity` textures);
  - OR a flat deep ground: dark #121416 or deep green #006A39, which replace ROAR's maroon;
  - one accent: green #00DB33.
  - No beige.
- **Real people and real objects as cut-outs** sitting on the ground with a soft contact shadow:
  - realistic Saudi/Gulf characters (thobe, shemagh) as the business owner;
  - oversized real props as METAPHORS: a concrete pedestal, a receipt printing out, a magnifying glass, a heavy padlock, a scale, a stopwatch, a laptop or phone, folders, paper notes, a chess king, a megaphone.
  - Photoreal, NOT illustration, NOT glossy AI.
  - Make them in Flow Nano Banana Pro (free) on a chroma-green #00FF00 plate, then key them out (`~/.claude/skills/gemini-image/scripts/chroma.py`, or rembg via `engine/tools/matte.py`'s approach).
  - Start the prompt with the CHROMA-KEY PLATE paragraph (see `03-visual-style.md` "Cut-out pipeline").
  - LOOK at every cut-out before using it.
  - Max about 8 new images per reel; use the lock wrapper `vendor/flow-locked.sh` (shared browser).
- **Collage devices:**
  - a green starburst behind the hero object;
  - a split frame with a torn paper edge;
  - paper notes and receipts dropping in with rotation and overshoot (about 5 frames);
  - tape;
  - a 1-frame INVERT flash on a beat (CSS `filter: invert(1)` on the stage for 1–2 frames);
  - a flashlight beam that wipes into the next ground colour (the beat transition).
- **Type:**
  - SMALL to medium, bold, dark #121416 on paper (light on dark grounds);
  - placed RIGHT ABOVE the object it talks about;
  - word by word on the spoken frame (`blurIn` ~3 frames, or a 2-frame horizontal smear);
  - kashida stretch on the stress word;
  - Zain mob-long for hero and stress words, IBM Plex for small connectors and labels.
  - The art is the OBJECT growing under the words: the scene builds up while the sentence accumulates.
- **Motion:**
  - collage objects drop in with a soft overshoot, a shadow, slight rotation;
  - the camera keeps living (slow push);
  - every beat change is caused by an object (beam wipe, receipt printing the next scene, a note covering the frame, a split tear);
  - a persistent thread object, e.g. a cursor or the same character, runs through the reel;
  - exits blur out together with the scene, never pushed out;
  - motion blur via 60 fps + tmix (BRIEF).
- **Sound:**
  - a designed hit on every drop, flash, tear and print (paper, tape, impact, print, whoosh), about 2 per second;
  - -14 LUFS;
  - no music bed.
- **Avoid** (the showreel look the owner moved away from): flat UI cards and pills on a plain background, orbiting app tiles, a 3D phone mock as the main hero. A phone may appear only as a real held object in a person's hand.

## Engine
Copy the HyperFrames structure of `reels/008-nov07-gallery-showreel/` (`build.py` fills `__D__` + WORDS, frame-baked `TL.set`, no `<audio>`, `mix.py` → `audio/mix.mp3`). Replace the visuals completely with image layers (`<img>` cut-outs, the paper ground) animated with GSAP.

## UPDATE (owner, 2026-11-07): the scenes are AI VIDEO, not hand-animated cut-outs
His words: «متنساش انك تجنريت المشاهد كلها… اعتمد عالفيديو جنريشن علشان بيدي واقعية أكثر زي ما عملنا في أول ريل بالظبط».

- The picture layer is generated VIDEO, as in reel 006 (`reels/006-gallery-continuity/`, `NOTE.md`, the transition map + Flow shots s1–s3). Pipeline: `.claude/skills/reel-style-fortune-collage/SKILL.md` §2.
  1. Write a transition map in which each shot causes the next.
  2. Make ROAR-look keyframes K0..Kn with Flow images: real Saudi people, real props on textured grey paper or a flat dark/green ground, in Fortune colours.
  3. Generate each shot as Flow video (Omni, 4–5 s, 12–15 credits) with Ki as the FIRST frame and Ki+1 as the LAST frame, so the shots chain into ONE continuous film.
  4. Download, retime to the voice, and concat to `assets/video/bg.mp4` (1080x1920, 30 fps, `-g 30`).
  5. Put the HyperFrames type layer ON TOP: ROAR small word-by-word type above the objects, starburst/notes/receipt overlays, invert flash, depth matte where useful (`engine/tools/matte.py`).
- Flow tools: `vendor/flow-locked.sh` (shared lock) with `flow_agent_generate` (kind video / image; read vendor docs and the patched MCP notes), `flow_video_status`, `flow_download_media`.
- Project `12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36`. Budget about 6 shots × 15 credits per reel; check the credit quote before each shot. Never exceed 120 credits per reel without reporting.
- If frames-to-video fails, use image-to-video from Ki and cut on motion.
- Hand-animated cut-outs are only OVERLAYS now.
