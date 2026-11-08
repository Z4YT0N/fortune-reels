# 09. Open items (as of 2026-11-06)

## Waiting on the owner
1. Which voices he likes from `assets/voice-samples-2026-11/` (and whether r01 Abdullah is ROAR's voice).
2. Enable Veo on the Google project behind the Gemini key (or say no to Veo).
3. Kling / Higgsfield credit, for characters that really move, or start with stills + camera motion.
4. Style split: designer-tool language as the base + ROAR collage for character scenes. Approve or change.
5. Content mix: 50 % reach / 30 % trust / 20 % sales.
6. Trial lab: 3 trials a day to start. Approve idea + script once, then variants go without approval.
7. Graduation: `MANUAL` for 2 months.
8. Feedback on the style still (`research/refs-2026-11/style-test/cmp1.jpg`).
9. In-system publishing SQL (`_wt-publish`, `20261105_content_publishing.sql`) and the account reconnections.
10. The employee's role confirmed (works on the engine's plan).

## Next build steps (in order)
1. 5-second motion test of the still: on-twos collage, word-by-word Arabic, 1-frame flash, SFX from the owner's pack.
2. 20-second text-motion test showing the moves in `rules/text-motion.md`.
3. Sample: the Taj reel, about 30 s, with 3 hooks for trial.
4. After approval: the skills (planner, producer, trial lab, publisher), the Task Scheduler routine, and the WhatsApp approval flow.

## Known traps
- Instagram downloads sometimes need a login (ref 23).
- `python -I` hides the user site-packages (numpy, Pillow). Use plain `python` for our own scripts.
- Veo IDs change; re-check with the models list before assuming access.
- Do not use the Pinterest references (`fortunecode-posts-v5`).
- ROAR voice: the owner says it is AI and approved a clone (`hKxOF1e0PGHjtctJDcOl`). See 06-voice.md.

## Research blockers (2026-11-06)
- vidIQ has no credits; every call is refused. Top it up, or the agents fall back to YouTube pages + `youtube-transcript-api`.
- YouTube rate-limited caption fetching (429) after about 8 videos from this IP. Retry later.
- The queue of 10 videos to study when the block lifts is at the end of `research/youtube-learning/04-arabic-b2b-scripts-and-growth.md` (Saudi channel «أربعة», Hormozi on leads, Ben B2B…).
- The Arabic B2B lane is thin: one strong Arabic video and two weak ones.

## From reel 004 (2026-11-06)
- First full ROAR-style reel delivered on WhatsApp: `reels/004-gallery-weight` (31.9 s; Desktop: `fortunecode-reel-004-gallery-weight.mp4`). Waiting for the owner's verdict on: look, motion, the clone voice/accent, and the CTA «اطلب فحص مجاني لموقعك».
- The client is not named (standing decision: no client names/logos), although the November plan names Taj. Confirm whether naming Taj is approved.
- The Flow MCP needs a dedicated browser profile signed in once (see 08) before the daily routine can run unattended.
- Loudness: `sfx.py mix` came out at -11.3 LUFS. Normalise with loudnorm (-14) before the final mux. Add this to `sfx.py`.
- Loop SSIM 0.816 (warn): the end rain of prints needs a closer match to frame 0.

## Lesson (owner, 2026-11-06): use the footage sites he gave
Reel 004 used only Google Flow clips + Gemini stills. It did NOT use the real-footage sources he sent:
pexels.com, destockd.com, archival-footage.com, Mixkit, and Envato through the Tafeil API (project memory `tafeil-stock-api`).
Rule for every reel: build a sourcing list BEFORE generating anything. Order:
1. our real screens / client sites;
2. real stock or archive B-roll (Pexels, destockd, archival-footage, Mixkit, Envato via Tafeil);
3. Gemini stills;
4. Flow clips only for shots nothing real can give.
Log the source of every shot in the reel's NOTE.md.

## Waiting on the owner (first10 batch, as of 2026-11-08)
Do not publish these claims until he says OK. Move each one to "decided" with the date and his words.
1. The CTA promise «انطباع أول مجاني» (the free first-impression review). Who on the team answers the comments?
2. IG carousel slide 7: the ownership wording.
3. LinkedIn carousel: the "handoff note" slide, and "a test link per milestone".
4. LinkedIn video: "Opens instantly".
5. LinkedIn Nov 11 static: "'Done' is what both sides signed".
6. Reel 014: the English words «الفورم» and «هيدرز» in the voice.
7. Reel 015: the «٤٫٢ ميجا» sum on the download pill. It is derived; our data does not say it.
8. The 613 line: keep the rephrase «نزل لأقل من ثلث حجمه» or say «ستمية وثلطعش» (test clip sent).
9. Red flags versus brand colours in the security pieces.
10. The phone number: confirm +20 10 98066484 as permanent for all content (01030608763 retired).
11. The voice accent on all three ROAR reels: unverified until he listens.

## Next (after the OKs)
- A daily automation routine: Task Scheduler with headless Claude, Trial Reels with 3 hooks, WhatsApp approval.
- Automate the «انطباع» comment and DM reply.
- The rest of the November plan (Nov 17–30), in ROAR style with AI-video scenes.
