---
name: fortune-content-engine
description: FortuneCode's automatic content engine (محرك الكونتنت). Give it ANY input (a topic, a fact, a project result, a client brief, a link, a voice note's text) and it produces the full content pack in our identity. That pack is a collage reel in the reel-006 style (the owner's "ROAR"), an Instagram carousel, a LinkedIn post or carousel, stories, and captions, delivered to the owner on WhatsApp, Desktop and Drive. Use it for ANY FortuneCode or client marketing content: reels, carousels, posts, stories, LinkedIn, captions, hooks, the monthly plan, delivery, or Drive upload. Also use it when the owner writes «كمل المحتوى», «اعمل ريل», «كاروسيل», «بوست», «ستوري», «لينكدإن», «خطة الشهر», «ابعتهولي», «ارفع على الدرايف», «اعمل محتوى عن…», «ريل لعميل…». It holds every owner rule learned so far. Read it before writing a script or rendering anything.
---

# FortuneCode content engine

The owner is Mahmoud, who owns FortuneCode. Reply to him in short Egyptian Arabic.

**Workspace:** `E:/Library/01-Workspace/Fortune/fortune-reels/`. All paths below are relative to it unless absolute.

Every rule here exists because the owner rejected a version that broke it. When a rule here disagrees with an older file, the newest owner decision wins. Then update both places (see §5).

## 0. Load order (every time)
1. Read `references/rules.md`: the hard rules, including §10, the gate written after reel 016 was rejected.
2. Read the reference for each piece you will make:
   - Reel: `references/collage-reel.md`. This is THE reel style.
   - Carousel, static post or story: `references/statics.md`.
   - Delivery and Drive: `references/delivery.md`.
3. Read the knowledge base index: `knowledge/content-engine/README.md` (01–16). Read the month plan if one exists (`research/refs-2026-11/november-plan-extracted.txt`).
4. Read the open owner OKs in `knowledge/content-engine/09-open-items.md`. Never publish a claim that is still waiting for his OK; flag it instead.
5. **For a client** (not FortuneCode), read the client repo:
   - brand tokens, fonts, logo;
   - the facts file (for example `lib/business.js`);
   - `PRODUCT.md`.
   - The client's own name and contact go in THEIR content.
   - FortuneCode's "no client names" rule covers only FortuneCode's own content.

## 1. Current defaults (as of 2026-11-09)
- **Reel style:** the collage reel, i.e. the reel-006 v6 look and kinetic type library, with brand-swappable ink and fonts. Full working example: `reels/018-alumaman-collage/`. The photoreal "ROAR pedestal" pipeline (`references/roar-reel.md`) is LEGACY; use it only if the owner asks for it.
- **Images and video:**
  - `node vendor/flow-direct/fd.mjs gen jobs.json --par 3` (Flow over RPC, no UI). Images are free; a 5 s frames-to-video costs 15 credits.
  - The UI fallback is the `google-flow` MCP.
  - No Gemini API: it was deleted on 2026-11-09.
  - Local reference photos are uploaded once with the MCP (`flow_upload_images`), then attached by media ID.
- **Voice:** ElevenLabs clone `hKxOF1e0PGHjtctJDcOl`, eleven_v3, plain Gulf text, no tashkeel, no stretch above ×1.05.
- **Languages:**
  - Instagram: light Gulf Arabic.
  - LinkedIn: English.
- **Delivery:**
  - WhatsApp, media and document, to the owner ONLY.
  - A Desktop copy in `C:/Users/Mahmoud/Desktop/<batch>/`.
  - Drive. Nothing is published publicly.

## 2. PACK MODE: any input in, the full content out
When the owner gives any input («اعمل محتوى عن…», a project, a number, a brief):

1. **Extract:**
   - the one core idea;
   - the allowed facts (rules.md §3, or the client's facts file);
   - the audience;
   - the CTA.
   - Unverified numbers do not go in.
2. **Plan the pack** (one idea, every format, each format doing its own job):

   | Piece | Platform | Spec |
   |---|---|---|
   | Collage reel | IG + TikTok | 25–32 s, 3 hooks, `references/collage-reel.md` |
   | Carousel | IG | 6–8 slides, one visual metaphor, Gulf, `references/statics.md` |
   | Post or carousel | LinkedIn | English, a 1-line hook, the proof, the method, a CTA |
   | Stories | IG | 3 frames: a question or poll, the proof, the CTA |
   | Captions | all | copy-ready, the comment keyword, up to 5 hashtags |

3. **Gate 1, one message to the owner:**
   - the reel's keyframe sheet, voice and script;
   - the carousel and post drafts (contact sheets);
   - the captions.
   - Spend no video credits before his OK.
4. **Produce** in parallel: one subagent per piece, with its own folder, and the brief pointing at this skill. The reel follows collage-reel.md steps 5–9.
5. **My own review before sending:** watch the reel frames and every cut myself, and read every PNG. A subagent's PASS is never the verdict.
6. **Gate 2, deliver:**
   - WhatsApp media and document for each piece, a Desktop batch folder, and Drive (`engine/tools/gd_upload_batch.py`).
   - Log it in `knowledge/content-engine/16-production-log.md`.
7. **Report** in short Egyptian Arabic:
   - the paths;
   - what was sent;
   - the credits;
   - the honest weak points;
   - what needs his ear or OK.

## 3. Single-piece workflow
Use the same steps as pack mode, restricted to one piece. The reel ALWAYS passes through Gate 1 (keyframes plus voice) before any video credits.

## 4. Parallel work and limits
- fd.mjs runs at most `--par 3`, because Flow returns `PUBLIC_ERROR_CONCURRENT_LIMIT_REACHED` above that.
  - `PER_MODEL_DAILY_QUOTA_REACHED` means no more images today.
  - `UNUSUAL_ACTIVITY` means stop and do not loop; fall back to the MCP UI.
- **Subagents:**
  - Write a brief file first: owner words, rejected looks, allowed facts, a checkpoint.
  - Resume the same agent for revisions (it keeps its context).
- **WhatsApp:** at most about 7 fast sends, then pause. The fc-system line was logged out once.

## 5. Keep it growing (mandatory)
After each owner reply about content:
- **A new rule or correction:** record it in three places:
  - `references/rules.md` (or the brand table in `collage-reel.md`);
  - the matching `knowledge/content-engine/*.md`;
  - a feedback memory in `C:/Users/Mahmoud/.claude/projects/e--Library-01-Workspace-Fortune-fortune-next/memory/`, with **Why** and **How to apply**.
- **A finished piece or verdict:** `knowledge/content-engine/16-production-log.md`.
- **A resolved OK:** move it in `09-open-items.md` from waiting to decided, with the date and his words.
- **A technical trap:** `knowledge/content-engine/15-delivery-and-storage.md` or `vendor/flow-direct/README.md`.
