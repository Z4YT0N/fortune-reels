# Collage reel: THE reel style (owner's "ROAR" = reel 006 v6), since 2026-11-08

The owner's words: «انا عاوز فيديو زي بتاع روور بالظبط زي اللي عملناه لفورتشن اول واحد». Asked which one, he picked **reel 006 v6**:
«الكلام بيتحرك فعلاً: كلمات طايرة من برا الشاشة على باث منحني، «صور» متكررة بتتجمع، تاج بيقع بأشباح وبيتضغط، صفوف «ويستنى» ورا الراجل، «ويطلع» بتطير مع اللفة، و«يخفف» نازلة زجزاج زي الريشة».

The first full reel in this style is **reel 018** (Alum Aman). The owner approved its checkpoint: «حلو فشخ».

**Copy its folder structure for every new reel:** `reels/018-alumaman-collage/`
- `script.txt`, `tts.py`, `stt.py`;
- `keys/` with the keyframes and contact sheet;
- `gen/` for fd.mjs jobs;
- `film.py`, which builds bg.mp4;
- `reel.tpl` with the 006 kinetic functions, and `build.py`;
- `make_cues.py`, `mix.py`, `sfxgen.py`;
- `qa_strips.py`;
- `NOTE.md`, which holds the full record and the rebuild commands.

**Rejected, never again:**
- the photoreal "props on concrete pedestals" look (reels 013–016);
- photoreal one-room storyboards;
- plain captions;
- a voice stretched above ×1.05.

## Start every reel with the scaffold (since 2026-11-09)
```
python engine/tools/new_collage_reel.py <slug> --brand fortune|alumaman|<client>
```
- It creates `reels/NNN-<slug>/` from `engine/template/collage/`:
  - `reel.tpl` on the shared library `engine/kinetic/kinetic.js` (every 006/018 move; README in `engine/kinetic/`), with brand CSS variables and fonts;
  - `build.py`, `film.py`, `make_cues.py`, `mix.py`, `sfxgen.py`, `tts.py` / `stt.py` (brand voice), `qa_strips.py`;
  - `BRIEF.md` and `NOTE.md` with both gates;
  - `gen/jobs.*.json` for fd.mjs, with the brand style suffix.
- Brand profiles live in `brands/<id>.json` (with fonts and logos in `brands/<id>/`). They hold colours, fonts, the logo, contact, the CTA, the voice, `allowed_facts`, `banned_words`, `required_phrases` and `never`.
  - A new client takes about 5 minutes (`brands/README.md`).
- **Before Gate 1 and before sending:** run `python engine/tools/brand_lint.py reels/NNN-<slug>`. It fails on banned words, numbers outside `allowed_facts`, and missing required phrases.
- **Local photos** (client projects): `node vendor/flow-direct/fd.mjs upload <img...>` returns media IDs to attach. No MCP is needed.

## The look
- A black-and-white halftone documentary cut-out collage on light paper with grain, with torn edges and tape.
- ONE riso ink accent, slightly mis-registered.
- Hand-drawn marker marks in the ink colour: circles, arrows, a dashed selection box with handles, a block cursor, impact strokes.
- A continuous AI film underneath. Each shot causes the next, and the same character and object run through every shot.
- Style references:
  - `reels/006-gallery-continuity/renders/test-v6.mp4`;
  - `research/style-bible-2026-11/bible.txt` plus `B.png` / `C.png`;
  - `.claude/skills/reel-style-fortune-collage/SKILL.md` (the full pipeline and the motion-library table).

## Brand profiles (swap these, keep everything else)
| Brand | Ink | Shadow | Paper / dark | Hero font | Label font | End card |
|---|---|---|---|---|---|---|
| FortuneCode | #00DB33 | #006A39 | #F0F1F2 / #121416 | Zain mob-long (2–3 words a line, fit()) | IBM Plex Sans Arabic | logo, www.fortunecode.org, +20 10 98066484, CTA «اكتب انطباع بالتعليقات» |
| Alum Aman (client) | #0199a2 | #017a82 | grey paper / #1d1d1d | Thmanyah Serif Display | Thmanyah Sans | logo, alumaman.com, WhatsApp +966 56 634 3386, @nozomaman, CTA «احجز معاينة مجانية» |

- **Alum Aman wording:** «نافذة», not «شباك»; and «نصنع في مصنعنا بالأحساء».
- **A new client:** read their repo's brand tokens, fonts, logo and facts file first. Never use gold or beige unless it is their brand.

## Pipeline, with two owner gates
1. **Story:**
   - One logline, then a transition map in which each beat causes the next.
   - Write 3 Gulf hooks and pick one.
   - Allowed facts only.
2. **Voice:**
   - Clone `hKxOF1e0PGHjtctJDcOl`, eleven_v3, plain text, 3 takes.
   - STT plus word durations. About 2.0–2.3 words/s, so 55–65 words for 30 s. NO stretch above ×1.05.
3. **Keyframes K0..Kn:** free images through `node vendor/flow-direct/fd.mjs gen jobs.json --par 3`.
   - Reference images go in by media ID.
   - Every prompt says: halftone collage, paper, one ink, "objects keep their shape", and no hex codes or words in the prompt (the model paints them into the picture).
4. **GATE 1, the checkpoint:** send the owner the keyframe contact sheet, the voice mp3 and the script (`wa_deliver.sh` plus `wa_send.py … document` for the mp3). Spend NO video credits before his OK.
5. **Shots:** one fd.mjs gen call, `att` = [Ki, Ki+1], 5 s, 720p, maxCredits 16, `--par 3`. That is about 75 credits for 5 shots.
   - Make a 12 fps strip of every shot. Throw away or trim faces that change, melting or morphing objects, painted text, and dissolves. Keep only the clean part and cover joins with a paper tear or a camera dive.
6. **Type layer:** port the real functions from 006 `test.tpl` / 018 `reel.tpl`.
   - One NAMED move per line, changing every beat: fly on a curve, echoStack, trails with squash, rows behind the subject (depth matte), zigzag feather fall, slam, typeOn, kash stretch, selBox plus cursor, stamp.
   - Words react to the picture: they jolt on an impact, get swallowed by a dive, and exit with the motion.
   - Hidden state is set at build time. Arabic is whole words only.
7. **Sound:**
   - About 2 cues per second, each on a real event. Use the owner pack first, then ElevenLabs SFX.
   - The ambience tells the story (for example, the storm is harsh, then muffled after the window).
   - Duck under the voice. -14 LUFS, TP -1.5. No music bed.
8. **Render:** 120 fps, then tmix down to 30 fps (motion blur).
9. **QA:**
   - safezone and overlap checks;
   - 20 fps entrance strips;
   - **I watch the whole reel myself** (2–3 fps sheets plus every cut) before sending;
   - flag anything that needs his ear.
10. **GATE 2:** send to the owner (media plus document) and wait for his verdict. Keep `-v1` copies when he asks for changes.
