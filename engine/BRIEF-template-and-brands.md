# Brief: collage-reel template + brand profiles (owner OK 2026-11-09: «اعملهم»)

## Goal
A new collage reel (the reel-006 style) should start from ONE command with brand files, not from copying reel 018 by hand. That copying took more than an hour per reel and caused bugs.

## Read first
- `reels/018-alumaman-collage/`: `reel.tpl`, `build.py`, `film.py`, `make_cues.py`, `mix.py`, `sfxgen.py`, `tts.py`, `stt.py`, `qa_strips.py`, `onset.py`, `warp.py`, `NOTE.md`.
  - This is the latest and best working reel, and the owner approved this style.
- `reels/006-gallery-continuity/test.tpl` and `build_test.py`: the original kinetic functions.
- `C:/Users/Mahmoud/.claude/skills/fortune-content-engine/references/collage-reel.md` (with the brand table) and `references/rules.md`.
- The client brand source: `E:/fortune projects/almanyum-aman/lib/business.js`, `app/globals.css`, `public/font/thmanyah/`, `public/images/logos/` (read only).

## Build
1. **`engine/kinetic/kinetic.js`:** ONE shared library of the kinetic type moves. Extract them from 018 `reel.tpl` (and 006 where 018 lacks one), keeping behaviour identical:
   - fly on a curve, echoStack, rows (behind layer), trails with squash, zigzag feather fall, slam, typeOn, kash stretch, selBox plus cursor, stamp, blurIn, inkIn, snap, hl, over, zoom-out, live.
   - The library also holds the build-time hidden-state helpers and the Arabic-safe whole-word rules.
   - Colours and fonts come from CSS variables (`--ink`, `--ink-deep`, `--paper`, `--dark`, `--font-hero`, `--font-label`), never hard-coded.
2. **`brands/<id>.json`:** create `brands/fortune.json` and `brands/alumaman.json`. Each holds:
   - `name_ar`, `name_en`;
   - `colors` {ink, ink_deep, ink_soft, paper, dark};
   - `fonts` {hero {family, files[]}, label {family, files[]}, latin};
   - `logo` {on_dark, on_light}, as absolute paths or paths copied into `brands/<id>/`;
   - `contact[]` (end-card lines, in order);
   - `cta`;
   - `voice` {voice_id, model, stability};
   - `allowed_facts[]` (each fact with its exact numbers);
   - `banned_words` {«شباك»: «نافذة», …};
   - `required_phrases[]` (for example «نصنع في مصنعنا بالأحساء» for alumaman);
   - `never[]` (for example no gold, no beige; for fortune, no client names).

   Copy the font and logo files into `brands/<id>/` so the repo is self-contained. FortuneCode values (from rules.md):
   - ink #00DB33, deep #006A39, paper #F0F1F2, dark #121416;
   - fonts: Zain mob-long (`reels/008-nov07-gallery-showreel/assets/fonts/zain-mob-long.ttf`) for hero, IBM Plex Sans Arabic for labels;
   - logo: `reels/008-nov07-gallery-showreel/assets/brand/`;
   - contact: www.fortunecode.org and +20 10 98066484;
   - CTA: «اكتب انطباع بالتعليقات»;
   - allowed facts: rules.md §3.
3. **`engine/tools/new_collage_reel.py <slug> --brand <id> [--title "..."]`:** creates `reels/NNN-<slug>/` (the next free number) with:
   - a `reel.tpl` skeleton that loads `engine/kinetic/kinetic.js` and the brand CSS variables and fonts, with a commented example beat per move;
   - `build.py` (fills `__D__`, WORDS and brand tokens), `film.py`, `make_cues.py`, `mix.py`, `sfxgen.py`, `tts.py` / `stt.py` (using the brand voice), `qa_strips.py`, `hyperframes.json`, `package.json` (hyperframes 0.9.20), copied or generalised from 018;
   - `BRIEF.md` and `NOTE.md` skeletons, with the two owner gates and the checkpoint written in;
   - `gen/jobs.keys.json` and `gen/jobs.shots.json` templates for `vendor/flow-direct/fd.mjs`, with the style suffix built from the brand.
4. **`engine/tools/brand_lint.py <reel_dir>`:**
   - Fails on any banned word in `script.txt`, the captions, or the text inside `reel.tpl` / `index.html`.
   - Fails on any number in the script or the on-screen text that is not in `allowed_facts`. Spoken number words are a WARNING only.
   - Fails if a required phrase is missing.
   - Prints a clear report.
5. **Test:** run `new_collage_reel.py test-template --brand alumaman` and `--brand fortune`.
   - `build.py` must produce `index.html`, `npx hyperframes@0.9.20 check` must pass (or its equivalent), and one still must be rendered and LOOKED at.
   - Run `brand_lint.py` on `reels/018-alumaman-collage` and report the result.
   - Then delete only the test reel folders you created, using git clean on those exact paths. Do NOT touch 018 or any other reel.
6. **Docs:**
   - Write `engine/kinetic/README.md`, listing each move, its parameters, and the owner's description of it.
   - Write `brands/README.md`, with the schema and how to add a client in 5 minutes.
7. **Commit** in fortune-reels with a clear message. Do not push. The orchestrator pushes.

## Rules
- Do not modify reels 006 or 018.
- Arabic text goes through UTF-8 files only.
- Never print API keys.
- Do not spend Flow credits; this task needs none.
- Report the files created, the test results (including the still path), the lint output for 018, and anything not finished.
