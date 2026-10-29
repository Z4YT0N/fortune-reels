---
name: reel-lesson
description: Record what the owner said about a reel (praise, rejection, a new rule, a result like views) so the engine never repeats a mistake - updates memory/LESSONS.md, the matching rule file, DECISIONS.md or REELS_LOG.md. Use every time the owner reacts to a reel, gives a rule, or shares numbers.
---

# Reel lesson (the engine's memory)

The engine improves only through this. Run it in the same turn as the owner's reaction.

1. Classify what he said:
   - a correction or rejection -> LESSONS.md + the rule file it changes
   - an approval of a choice ("keep this voice", "yes music") -> DECISIONS.md (move from open questions)
   - results (views, comments, chats) -> REELS_LOG.md row
   - a new fact source -> FACTS_BANK.md
2. LESSONS.md entry: `- **YYYY-MM-DD** <his words, quoted in Arabic when short> -> <the rule it became>. (<file changed>)`
   Absolute dates only. Append; never rewrite earlier lessons. If a lesson reverses an earlier one,
   say so in the new entry and fix the rule file.
3. Edit the rule file (`rules/*.md`) so the next build follows it without reading history. If the
   lesson is mechanical (a check a script can do), add it to `engine/tools/qa.py` or the engine lib.
4. Praise counts too: when he likes something, record WHAT he liked so it gets repeated.
5. Tell him in one line what was saved and where.

Keep LESSONS.md under ~150 lines: when it grows, merge old lessons that are fully encoded in rule
files into one line each ("encoded in rules/motion.md"), never delete their dates.
