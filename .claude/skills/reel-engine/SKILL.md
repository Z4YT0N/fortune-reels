---
name: reel-engine
description: The end-to-end Fortune Code reel pipeline in this folder - topic to delivered 1080x1920 MP4 (script, voice, storyboard, 2.5D HyperFrames build, sound, QA, delivery, lessons). Use for any request to make, remake, fix or continue a reel here.
---

# Reel engine: topic -> delivered reel

Read `CLAUDE.md` first (it loads the memory). Work the stages in order; each stage ends with a
file in the reel folder, so a later session can resume from the files alone.

| # | stage | output | skill / agent |
|---|---|---|---|
| 0 | Recall | read memory/LESSONS.md, DECISIONS.md, REELS_LOG.md (topic not used), EVIDENCE.md | - |
| 1 | Topic + facts | BRIEF.md: topic, service it sells, keyword; FACTS_BANK rows with opened URLs | `reel-research` agent, rules/facts.md |
| 2 | Script | script.txt (VO, numbers as words) + hooks table + on-screen text, in BRIEF.md | `reel-script` skill, `reel-scriptwriter` agent |
| 3 | Scaffold | `python engine/tools/new_reel.py <slug> "<title>"` | - |
| 4 | Voice | `vo.py <reel> takes A B`; send both mp3 to the owner; `vo.py <reel> pick <X> [speed]` | `reel-audio` skill |
| 5 | Storyboard | SHOTS.md: one row per 1.5-2.5 s, times in ORIGINAL VO seconds (`vo.py <reel> words`), world, models, motion, micro-gags, SFX | `reel-director` agent |
| 6 | Captions | captions.json (merge digits, chunks, highlight words) -> `captions.py <reel>` | `reel-build` skill |
| 7 | Build | template.tpl shots from SHOTS.md; `npm run check`; snapshots of every beat | `reel-build` skill + gsap/hyperframes/motionmaxxing references |
| 8 | Sound | cues.json -> `sfx.py <reel> gen` -> `sfx.py <reel> mix` | `reel-audio` skill |
| 9 | Render + QA | `npm run render`; `qa.py <reel>`; look at sheet + stills; fix; NOTE.md | `reel-qa` skill, `reel-critic` agent |
| 10 | Deliver | `deliver.py <reel>`; SendUserFile the MP4; Arabic delivery message; REELS_LOG row | rules/quality-gates.md |
| 11 | Learn | every owner reaction -> memory/LESSONS.md (+ rule file edit) | `reel-lesson` skill |

## Non-negotiables while running it
- Owner sees ONE sample before any batch or new pipeline.
- Arabic only through files, never shell arguments.
- No fabricated numbers. No unheard voice setting shipped. No CTA promise the owner has not seen.
- Never post anything publicly. Delivery = the file on the Desktop + sent to the owner.
- The reel folder is self-contained (lib copied at scaffold). Engine changes go in `engine/` and
  only reach NEW reels; if an old reel needs the fix, copy it in deliberately.
- When the engine itself improves (a new helper, a fixed trap), update `engine/`, the relevant rule
  file and LESSONS.md in the same step.

## Resuming
`reel.json.status` says where a reel stopped (script, voice, build, render, delivered). Read the
reel's BRIEF.md, SHOTS.md and NOTE.md before touching it.

## House styles (variety across the feed)
Each style is its own skill with its full pipeline and owner rules:
- `reel-style-fortune-collage`: style #1, a continuous AI film of halftone documentary collage with green marker, and kinetic type in the scene (2026-11-07).
- Style #2: being learned (see `research/style-2-candidates/`).
Rotate styles across the month; keep one style per series.
- Formats and devices learned from the owner's 8 reference reels (teaching layout, chapter card + green cascade, frame-break hero, single-take list, music-grid edit, pop-on-twos, dither/receipt looks): `knowledge/content-engine/13-reel-craft-8-refs.md`.

## Owner's reel style rotation (decided 2026-11-07)
Rotate these 4 house styles across the month; keep one style per series.
1. **Fortune collage:** skill `reel-style-fortune-collage`, reference `reels/006-gallery-continuity`.
2. **Novella tabletop:** top-down knolled green felt + hands + deadpan centred portraits; text lives on objects. Reference `reels/007-style-lab/novella`.
3. **Product showreel:** warped flag word, orbiting thumbnails, cursor + file card, 3D phone, UI toast. Reference `reels/007-style-lab/showreel`.
4. **Optious:** marquee rows, zoom-through into a giant number/word, street-sign match, black/white + green. Reference `reels/007-style-lab/optious`.

Not chosen: minimal, Campfire, Stomp, Max Miedinger, Wes Anderson. Each lab folder has its weak-point list; fix those before the first full reel in that style.
- **Posts and carousels:**
  - Identity rules: `research/own-instagram/IDENTITY.md` (dark #121416 + green glow, Zain mob-long, logo top, footer).
  - Format catalogue (20 formats with example boards): `research/posts-carousels-2026/CATALOGUE.md` + `overview.jpg`.
  - Approved test: `posts/2026-11-test/v2/`.
