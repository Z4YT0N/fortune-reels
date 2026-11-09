---
name: reel-script
description: Write a Fortune Code educational reel script (35-45 s Gulf Arabic voice-over) with three scored hooks, verified facts, a comment-keyword CTA and a loop, plus the on-screen text. Use at stage 2 of the reel engine or whenever a reel script is asked for.
---

# Reel script

Adapted from the team's `fortune-code-reel-script` skill (itself from Jake Schincariol's MIT
ig-reel skill). In this folder, this file and `rules/script.md` are authoritative.

## Before writing
1. Read `memory/REELS_LOG.md`: never repeat a topic. Read `memory/EVIDENCE.md` for what works.
2. Read `rules/script.md` and `rules/facts.md`.
3. Pick the Fortune Code service the reel sells: custom websites, e-commerce (custom, never
   Salla/Zid), ERP/CRM systems, mobile apps, AI integration, موظفك الذكي, automation.
4. If the topic is thin, ask ONE batched question: the concept, the everyday thing the viewer
   already used that relies on it, the service it connects to.

## Shape (35-45 s, ~80-105 words before speed-up)
HOOK 0-3 s -> ONE ANALOGY <= 8 s -> NAME IT («وهذا اللي نسميه ...») -> PROOF (numbers become
full-screen counters) -> TWIST at 60-70% («بس في شي أغلب الناس ما يعرفونه») -> FORTUNE CODE (one
sentence) + ASK (comment keyword) -> LOOP (echo the hook).

## Hooks: three formulas, scored
Write three hooks from DIFFERENT formulas (EVIDENCE.md lists them). Score each 0-100 on
FRONTLOAD (key word in the first three words), SPECIFICITY (number, name, object), STAKES (why it
matters to the viewer), ADDRESS (speaks to one person), BREVITY (<= 8 words, < 3 s). Show the table,
pick one, say why in one line. Under 50 = rewrite. Dealbreakers: greeting, «في هذا الفيديو»,
«استنى لا تسكرول», a vague promise.

## Timing (run it in code, do not eyeball)
Count words per beat at 2.3 words/s and stack timecodes. Fix: hook > 3 s; total outside 35-45 s;
analogy > 8 s; two beats in a row with nothing concrete; no loop. If the take runs long the voice
can be sped up to 1.12x, but write to length first.

## Humanize pass
Remove em dashes, ellipsis characters, invisible Unicode, «ليس فقط... بل», adjective triads,
one-word rhetorical lines, stock phrases, anything nobody would say out loud. Read it as speech.

## Output (into the reel folder once scaffolded, or into the chat first)
1. Hooks table + pick.
2. `script.txt`: ONE paragraph for TTS, numbers as Arabic words (2024 -> ألفين وأربعة وعشرين,
   53% -> ثلاثة وخمسين بالمية), English terms in English.
3. On-screen narration (digits as digits), in BRIEF.md.
4. Sources: every number with its opened URL; new ones appended to `memory/FACTS_BANK.md`.
5. Flags: any CTA promise, any `{{رقم}}` left.
6. Receipt:
```
SCRIPT READY
hook:     formula <n>, scored <x>
length:   ~<s> s, <w> words
keyword:  <word>  (promise: <what the team must do>)
sources:  <n> verified
```

## Script rules from the owner's 8 references (2026-11-07, MANDATORY)
Full source: `knowledge/content-engine/13-reel-craft-8-refs.md` (+ `research/refs-2026-11/batch-2026-11-07/analysis-*.md`).
- **Skeleton:** hook (1-3 s) → lock-in (2-3 sentences) → body 1 → rehook 1 → body 2 → rehook 2 → optional body 3 / closing → CTA with an aligned lead magnet.
- **Triple hook:** context in audio + visual + text before f25, then a lean (proof, pain or shock), then a contrarian snapback.
- **Rhythm:** never 3 long lines in a row. Lines of 5 words or fewer are open loops («خلنا نشوف.»، «بس فيه مشكلة.»), and each lands on a cut or graphic change.
- **Visual hook:** one subject + a contradicting text line + an arrow to the subject + one curious detail.
- **Opening:** speech and a composed frame at f0, no greeting.
- **Framework:** name it, and nest it in threes.
- **Pace:** Gulf VO at 2.6-3.0 words/s, a new visual about every 2.4 s.
- **Comment-keyword CTA:** one keyword everywhere and a free asset on the same topic. Only promise it once the DM automation exists.
