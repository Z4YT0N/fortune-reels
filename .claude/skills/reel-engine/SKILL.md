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
