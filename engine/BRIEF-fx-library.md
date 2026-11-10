# Brief: text-effects library from every past reel (owner 2026-11-10)

## Owner words
- He asked how the opening text effect of the first showreel was made. That is reel 008, «معرض صور», where the phrase waves like a flag.
- Then he said: «انا عاوز افكتات كتير زي دي تتسجل في الاسكيل».
- Goal: every good text effect we have ever built becomes a named, reusable move. Each move is documented in the skill so any future reel can call it.

## Already in the library (do NOT re-port)
`engine/kinetic/kinetic.js` with its `README.md`:
- fly, flyOut, echoStack, rows, trailsDrop, feather, slam, typeOn;
- kash, kashIn, selBox, cursor, stamp;
- blurIn, inkIn, snap, hl, over, zoomOut, live;
- rise, mark, strike, blink, jolt, swallow, out, grain.

## Sources to mine (read only; never modify a reel)
- `reels/008-nov07-gallery-showreel/showreel.tpl` and `ext.js`. Known effects:
  - B1 **flagWarp**: 128 strips, `warpAt` and `stripAt` (bow, wave, phase);
  - the pills that pop and then shoulder each other aside, then drop like weights;
  - the counter roll 4 → 34 (Arabic digits);
  - «ميجا» slam plus the number bloat (elastic);
  - the card that gets heavy;
  - the search-bar typeOn with a blinking caret;
  - the hero word with ghost trails on a motion path, plus a feather float;
  - the struck-out old size with a zigzag fall;
  - the counter zoom-out;
  - the «بس.» stamp;
  - «ترمش» with a real blink;
  - the «يبطئ» kashida;
  - the button wipe;
  - the corner credit labels;
  - the toast drop.
- `reels/009-nov09-premium-slow/`, `010-nov14-security-audit/`, `011-nov16-js-video-size/`, `012-li-nov12-gallery-motion/`: `showreel.tpl` and `ext.js` (showreel-style variants).
- `reels/007-style-lab/*/`: the campfire, minimal, novella, showreel, stomp, max, optious and wes styles. Read the `.tpl` file, or `index.html` when there is no `.tpl`.
- `reels/001`–`006` `template.tpl` (006 `test.tpl` was already mined; look only for what is missing).

## Build
1. **`engine/kinetic/fx.js`:** a second library loaded after `kinetic.js`. Use it as `const X = Kinetic.fx(TL, K)`, or as a standalone `KineticFx.create(TL, opts)`; choose whichever is cleaner and document it.
   - Port each DISTINCT effect not already in the library as a named function. Keep its behaviour identical to the source.
   - Generalise hard-coded text, positions, sizes and colours into parameters. Colours come from the CSS variables (`--ink`, `--ink-deep`, `--paper`, `--dark`, `--font-hero`, `--font-label`).
   - Keep the library rules:
     - hidden state is set at build time;
     - frame-baked loops use `TL.set` per frame through a `frames()` helper;
     - Arabic is whole words only.
     - The only exception is flagWarp-style strip slicing, which clips the whole rendered phrase visually and never splits letters in the DOM text.
   - Aim for 15–30 good moves. Skip trivial duplicates, but note them in the catalogue as "same as X".
2. **Gallery:** `engine/kinetic/gallery/`, a HyperFrames composition (`hyperframes@0.9.20`, 1080×1920, 30 fps).
   - Play every move, old and new, one after another. Each move gets about 2–3 s on screen with a small label of its name.
   - Use Fortune brand variables from `brands/fortune.json` and the Zain/Plex fonts copied in `brands/fortune/`.
   - Render it to `engine/kinetic/gallery/gallery.mp4`. The `.gitignore` ignores mp4 files, which is fine.
   - Make a contact sheet: one frame at the peak of each move.
   - LOOK at the contact sheet yourself, and fix anything broken (an empty frame, wrong font, overflow, letters split).
3. **Catalogue:** `C:/Users/Mahmoud/.claude/skills/fortune-content-engine/references/effects-library.md`. One row per move, old and new:
   - the name;
   - the call signature;
   - a short "what it looks like";
   - when to use it (which beat or emotion: weight, relief, speed, a number, a question, a CTA);
   - its source (`reel file:line`);
   - the owner's words if any.
   - Group the rows by family: warp/distort, travel/paths, stack/echo, number/counter, stamp/impact, UI-carrier (search bar, toast, card, button), reveal/mask, idle/breathing.
   - End with a "pick a move per beat" cheat sheet.
4. **Docs:**
   - Update `engine/kinetic/README.md` to mention `fx.js` and link the catalogue.
   - Add a line to the skill `SKILL.md` §1 defaults and to `references/collage-reel.md` step 6: pick moves from `references/effects-library.md`, and see the gallery.
   - Mirror the changed skill files into the repo at `skills/fortune-content-engine/`, and copy `effects-library.md` to `knowledge/content-engine/18-effects-library.md`. Add an index line to `knowledge/content-engine/README.md`.
5. **Scaffold:** make `engine/tools/new_collage_reel.py` also copy `fx.js` into `<reel>/lib/`, and load it in the template `reel.tpl`. Test that a scaffolded reel's `npx hyperframes@0.9.20 check` still passes. Delete that test reel afterwards with git clean on its exact path only.
6. **Commit** in fortune-reels with a clear message. Do not push.

## Rules
- Do not modify any existing reel folder.
- Arabic goes through UTF-8 files only.
- Spend no Flow or ElevenLabs credits.
- Never print API keys.
- Report:
  - the list of moves added, with their sources;
  - the gallery mp4 and contact-sheet paths;
  - what you looked at, and what you fixed;
  - anything skipped and why.
