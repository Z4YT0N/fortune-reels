# Content engine: knowledge base

**Entry point:** the global skill `~/.claude/skills/fortune-content-engine/` (SKILL.md + references/). It is invoked for every FortuneCode content task and points here. The hard rules live in its `references/rules.md`.

Everything learned while designing Fortune Code's automatic content engine (sessions of
2026-11-05 and 2026-11-06). This is the raw material for the skills we will build later: a
monthly planner, a reel producer, a post/carousel producer, a trial-reels lab and a publisher.

**Two kinds of file.** The `rules/` folder holds the short, binding rules every reel follows.
This folder holds the reasoning, the decisions, the reference catalogue and the open items behind
them. When the two disagree, the owner's latest decision wins. Update both.

| File | What is in it |
|---|---|
| [01-engine-decisions.md](01-engine-decisions.md) | What the engine is, owner decisions, the 8 stages, the monthly cycle, approvals, where it runs |
| [02-trial-reels-and-growth.md](02-trial-reels-and-growth.md) | Instagram Trial Reels: the method, the API, our test design |
| [03-visual-style.md](03-visual-style.md) | The look: ROAR collage, designer-tool language, anti-slop recipe, the still test |
| [04-references-catalogue.md](04-references-catalogue.md) | All 28 reference reels: what each one teaches, with timings |
| [05-script-hooks-packaging.md](05-script-hooks-packaging.md) | Hooks, loops, packaging system, script structure, the November plan as the bar |
| [06-voice.md](06-voice.md) | ElevenLabs Gulf voices: roster, ROAR-like matches, settings, risks |
| [07-sound.md](07-sound.md) | SFX library, music, mixing targets |
| [08-tools-apis-skills.md](08-tools-apis-skills.md) | APIs and models (what works, what does not), GitHub skills, sites, courses |
| [09-open-items.md](09-open-items.md) | Pending owner decisions and blocked items |
| [10-script-patterns.md](10-script-patterns.md) | How every reference writes its script: the ROAR 7-beat formula, the xx call-and-response, other devices, pace |
| [11-fortune-style.md](11-fortune-style.md) | Fortune house style notes |
| [12-kinetic-type-engine.md](12-kinetic-type-engine.md) | Kinetic type engine: depth matte, motion blur, moves |
| [13-reel-craft-8-refs.md](13-reel-craft-8-refs.md) | Reel craft learned from the owner's 8 references |
| [14-roar-ai-video-pipeline.md](14-roar-ai-video-pipeline.md) | LEGACY (photoreal ROAR, rejected looks): ROAR look + Flow frames-to-video shots + HyperFrames type layer, traps |
| [15-delivery-and-storage.md](15-delivery-and-storage.md) | WhatsApp media + document, Desktop copy, Google Drive upload (CDP drag-drop) |
| [17-collage-reel.md](17-collage-reel.md) | THE reel style since 2026-11-08 (reel 006 v6 look + kinetic type, brand profiles, 2 owner gates). Example: reels/018 |
| [16-production-log.md](16-production-log.md) | Every finished piece: date, platform, folder, owner verdict, credits |
| [18-effects-library.md](18-effects-library.md) | Every text move by name (K.* kinetic.js + X.* fx.js): call, look, when to use, source; cheat sheet per beat. Gallery: engine/kinetic/gallery/ |

Binding rules that came out of this research:
- [`../../rules/text-motion.md`](../../rules/text-motion.md): text motion, Arabic-safe animation, transitions, anti-slop
- [`../../rules/motion.md`](../../rules/motion.md): eye-trace cutting, frame within a frame (added sections)
- [`../../rules/script.md`](../../rules/script.md): the 3 loops, the triple hook (added sections)

Raw research: [`../../research/refs-2026-11/`](../../research/refs-2026-11/)
- `refs-table.md`: metadata of every reference
- `transcripts.md`: voice-over transcripts
- `sheets/`: contact sheets and 12 fps strips
- `videos/`: the reels themselves (git-ignored)
- `style-test/`: the first Gemini still and its graded version
- `skill-docs/`: SKILL.md texts read from GitHub
- `november-plan-extracted.txt`: the employee's November plan as text

Also: [`../../research/2026-11-06-reel-craft-videos.md`](../../research/2026-11-06-reel-craft-videos.md), 25 rules from 7 YouTube tutorials.
