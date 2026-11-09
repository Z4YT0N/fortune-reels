# {{NNN}}: {{TITLE}} (collage reel, brand `{{BRAND}}`)

Scaffolded {{DATE}} by `engine/tools/new_collage_reel.py`. Style = reel 006 v6 / reel 018 (the owner's "ROAR"): a black-and-white halftone documentary cut-out collage on paper, ONE riso ink accent (the brand `ink`), hand-drawn marker marks, a continuous AI film underneath, the kinetic type library on top.

**Watch first:** `reels/006-gallery-continuity/renders/test-v6.mp4` and `reels/018-alumaman-collage/alumaman-collage.mp4`.

## Read
1. `C:/Users/Mahmoud/.claude/skills/fortune-content-engine/references/collage-reel.md` and `references/rules.md` (§6 voice, §10 the post-016 gate).
2. `.claude/skills/reel-style-fortune-collage/SKILL.md` (the pipeline and the motion table).
3. `engine/kinetic/README.md` (every move, its parameters, the owner's words) and `brands/README.md`.
4. `brand.json` in this folder: colours, fonts, contact, CTA, voice, **allowed facts, banned words, required phrases, never**.

## Story
- Logline (one line):
- Subject:
- Allowed facts used (copy them exactly from `brand.json`):
- Three Gulf hooks, and the pick:
  1.
  2.
  3.
- Transition map (each beat CAUSES the next; one world, one character, one continuous action):
  | Beat | Picture (keyframe) | Line | Move | Exit |
  |---|---|---|---|---|

## Hard limits
- **Voice:** brand voice (`tts.py`), plain Gulf, no tashkeel, 3 takes, STT + word durations, about 2.0-2.3 words/s (55-65 words for about 30 s), **no stretch above x1.05**.
- **Picture:** `node vendor/flow-direct/fd.mjs gen gen/jobs.keys.json --par 3` (images are free); shots `gen/jobs.shots.json` (15 credits per 5 s shot, max 3 parallel). Budget: at most 100 credits. No hex codes or any text in a prompt.
- **Text:** one named move per spoken line, changing every beat; text appears only when the picture shows that thing; whole Arabic words only; hidden state at build time.
- **Lint:** `python engine/tools/brand_lint.py reels/{{NNN}}-{{SLUG}}` must PASS before each gate.

## GATE 1, the checkpoint: STOP before spending video credits
Send the owner (`wa_deliver.sh`, plus `wa_send.py … document` for the mp3) and wait for his OK:
- the script and the chosen take (`audio/vo-<take>.mp3`);
- the keyframe contact sheet (`keys/contact-sheet.jpg`);
- the transition map;
- the planned move per line.

## After his OK
Shots -> `film.py` -> `matte.py` (rows behind the subject) -> `make_cues.py` + `mix.py` -> `build.py` -> render 120 fps + tmix -> QA (strips, safezone, overlap, watch it all with sound) -> `NOTE.md`.

## GATE 2
Send the final to the owner (media plus document) and wait for his verdict. Keep `-v1` copies when he asks for changes. Never send to the client.
