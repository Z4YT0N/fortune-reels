# fortune-reels: Fortune Code's reel engine

One place where Fortune Code reels are researched, written, voiced, built in 2.5D, checked and
delivered, and where every lesson from the owner is kept so it is never repeated.

Owner: Mahmoud (FortuneCode). Reply to him in short Egyptian Arabic. Code, docs and commits in
English. The reels themselves speak light Gulf (Saudi) Arabic.

**Entry point for any content (reels, carousels, posts, stories, LinkedIn, delivery, Drive):** the global skill `~/.claude/skills/fortune-content-engine/` (invoke it first; hard rules in its `references/rules.md`). Knowledge base: `knowledge/content-engine/README.md`. Current default reel = ROAR look + Flow AI-video scenes (`knowledge/content-engine/14-roar-ai-video-pipeline.md`).

## Memory: read before any work (loaded below)
@memory/LESSONS.md
@memory/DECISIONS.md
@memory/REELS_LOG.md

Also read when relevant: `memory/EVIDENCE.md` (what goes viral for us), `memory/FACTS_BANK.md`
(verified numbers and rejected claims).

**Never forget:** whenever the owner reacts to a reel, gives a rule, approves a choice or shares
results, run the `reel-lesson` skill in that same turn. A lesson that only lives in the chat is lost.

## Delivery gate (mandatory)
Before ANY reel goes to the owner, fill `rules/owner-checklist.md` into the reel's NOTE.md with evidence for every line. One FAIL = no delivery. Add every new owner instruction to that checklist in the same turn.

## Rules (authoritative, in this order)
1. `memory/LESSONS.md` and `memory/DECISIONS.md` (the owner's own words)
2. `rules/brand.md`, `rules/script.md`, `rules/facts.md`, `rules/motion.md`, `rules/text-motion.md`,
   `rules/voice-and-sound.md`, `rules/quality-gates.md`, `rules/tech.md`
3. Craft references: `.claude/skills/motionmaxxing`, `.claude/skills/gsap-*`, the global
   `hyperframes*` skills. They decide HOW, never against 1-2.

## Pipeline
A reel is delivered only after render + `qa.py` pass, including `safezone_check` with 0 violations `motion_check` PASS and `overlap_check` PASS, AND `rules/owner-checklist.md` is filled into the reel's NOTE.md with every line PASS or N/A.
Start every reel with the `reel-engine` skill (or `/new-reel <topic>`). Stages: recall -> facts ->
script -> scaffold -> voice -> storyboard -> captions -> build -> sound -> render + QA -> deliver ->
learn.

| skill | job |
|---|---|
| `reel-engine` | the pipeline, stage by stage |
| `reel-script` | hooks, script, TTS paragraph |
| `reel-build` | captions + 2.5D HyperFrames composition |
| `reel-audio` | voice takes, speed, SFX, mix |
| `reel-qa` | render, qa.py, look at frames, NOTE.md |
| `reel-lesson` | write feedback into memory and rules |
| `reel-caption` | post caption |
| `reel-viral-research` | what hooks work now |

| agent | job |
|---|---|
| `reel-researcher` | verified facts with opened URLs |
| `reel-scriptwriter` | Gulf Arabic script from facts |
| `reel-director` | SHOTS.md + cues.json from script and timings |
| `reel-critic` | independent review of a render before delivery |

Commands: `/new-reel`, `/lesson`, `/reel-status`, `/reel-research`.

## Tools (run from this folder; `<reel>` = folder under reels/ or its number, e.g. 002)
```bash
python engine/tools/new_reel.py <slug> "<title>"     # scaffold reels/NNN-<slug>/
python engine/tools/vo.py <reel> takes A B           # ElevenLabs takes + word timings
python engine/tools/vo.py <reel> pick B 1.12         # chosen take, sped up
python engine/tools/vo.py <reel> words               # word indexes for captions.json
python engine/tools/captions.py <reel>               # template.tpl + captions.json -> index.html
python engine/tools/models.py search|fetch|link|list # 3dicons 3D models
python engine/tools/sfx.py <reel> gen|mix            # effects + final mix.mp3
cd reels/<reel> && npm run check && npm run render   # HyperFrames 0.8.152
python engine/tools/qa.py <reel>                     # gates + contact sheet; includes the HARD safe-zone gate (safezone_check.py) and tick_check
python engine/tools/safezone_check.py <reel>         # safe zone x 60-960 / y 230-1440 for text + data-key visuals (must pass before delivery)
python engine/tools/motion_check.py <reel>           # smooth motion: <= 2 motion events at once, pieces rest >= 0.6 s (must pass before delivery)
python engine/tools/overlap_check.py <reel>          # text over photos/phones/faces (> 5 %) or clipped text (> 0.3 s) fails (must pass before delivery)
python engine/tools/deliver.py <reel>                # copy to Desktop, mark delivered
```

## Layout
| path | what |
|---|---|
| `rules/` | the rules every reel follows |
| `knowledge/content-engine/` | the content-engine knowledge base: decisions, references, style, voices, tools, open items (start at its README) |
| `memory/` | lessons, decisions, reels log, evidence, facts bank |
| `engine/lib/` | stage3d.js (2.5D stage + timeline helpers), captions.js, brand-models.js |
| `engine/template/template.tpl` | starter composition copied into each new reel |
| `engine/tools/` | the Python tools above |
| `engine/examples/` | the Page Speed reel's full build: the quality bar |
| `assets/brand/` | logo, logo mark, fonts |
| `assets/models/` | 3dicons FBX models (git-ignored; `models.py fetch` restores) |
| `assets/sfx/`, `assets/sfx-library/` | generated effects; stock packs (git-ignored) |
| `reels/NNN-slug/` | one self-contained HyperFrames project per reel |
| `research/` | viral research notes and reference frames |

## Working rules
- Arabic never goes through shell arguments; write it into a UTF-8 file.
- The owner sees one sample before any batch. Nothing is posted publicly by this engine.
- Never fabricate numbers. Never ship an unheard voice setting. Flag every CTA promise.
- Delete what is not used; git history is the archive. Commit each finished reel and every engine
  or rule change (`git add -A && git commit`), message in English.
- Other places with relevant history: `E:\Library\01-Workspace\Fortune\fortune-promo` (older reels,
  tools, SFX packs), `C:\Users\Mahmoud\Desktop\FortuneCode Asset Library` (every website asset:
  portfolio images, logos, 3D), brand PDF `E:\Library\01-Workspace\Fortune\WhatSaas\Fortune Code - Brand Guidlines V.2.2.pdf`.
