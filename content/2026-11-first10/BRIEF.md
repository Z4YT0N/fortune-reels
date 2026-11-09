# First 10 days of the November plan (Nov 7–16), all platforms

The owner said on 2026-11-07: «كمل محتوى الـ١٠ أيام الأوائل على كل المنصات». The plan is `research/refs-2026-11/november-plan-extracted.txt`. Read your rows in it.

The Nov 7 reel is DONE and is the quality bar: `reels/008-nov07-gallery-showreel/` (template `showreel.tpl` + `ext.js`, `build.py`, `mix.py`, final `nov07-gallery-showreel.mp4`). Read it before building anything that moves.

## Hard owner rules (each one exists because the owner rejected the version without it)
1. **No client names anywhere**: no Taj, no Ambatt, no Malahi, no logos of clients. Say «موقع شركة كبيرة», «منصة شركة», «موقع قبل إطلاقه». The plan's "Taj logo reveal" is replaced by our own logo.
2. **Hooks in light Gulf Arabic** for Instagram (reels, carousels, stories). Body copy: light Gulf too. LinkedIn is English.
3. **Never fabricate numbers, quotes or results.** Allowed facts only:
   - Gallery: 34 MB → 140 KB, same photos and same quality.
   - Security audit before launch: 14 issues found and fixed. Use generic categories only; no invented specifics. Allowed generic categories: access permissions, form input validation, security headers, exposed keys or config, dependency updates, rate limiting, error messages that leak info. Say "examples of what a review covers", NOT "these were the 14".
   - Performance: JavaScript 2.2 MB → 1.2 MB; a background video 2 MB → 613 KB.
   - `memory/FACTS_BANK.md`: Google 53 % leave after 3 s on mobile; Deloitte for Google 0.1 s faster → +8.4 % retail conversions; ~50 ms first impression. Cite the source in small text.
   - Our method, 6 steps: understand → quote and timeline → design → build and test → launch → support. Scope, price and timeline are fixed in the contract.
4. **Contact on every end card or footer:** `www.fortunecode.org` and `+20 10 98066484`. This is the NEW number; do NOT use 01030608763.
5. **Comment CTA keyword «انطباع»** (approved): the team sends a free first-impression review of the commenter's site. Where a CTA fits on Instagram: «اكتب انطباع بالتعليقات». On LinkedIn: "Comment 'review' and we'll send a first-impression review of your site", or DM.
6. **Identity** (`research/own-instagram/IDENTITY.md`):
   - dark #121416;
   - green #00DB33 as accent and glow;
   - light #F0F1F2;
   - FortuneCode logo `reels/008-nov07-gallery-showreel/assets/brand/logo-white.svg` (mark: `mark.svg`, green).
   No beige paper look.
7. **Fonts:**
   - Static posts, carousels and stories use IBM Plex Sans Arabic ONLY: `posts/2026-11-artdirection/assets/IBMPlexSansArabic-*.ttf`.
   - Reels and motion use Zain mob-long (`reels/008-nov07-gallery-showreel/assets/fonts/zain-mob-long.ttf`) for hero and stress words, and Plex for connectors, labels, UI, buttons and sources.
   - Zain draws very long tails. Never put more than 2–3 Zain words on one line; measure and `fit()` every line. Button text and long lines go in Plex.
8. **Art direction, not stacked text** (owner: «ضعيفة جدًا… مجرد نصوص متراصة»).
   - Each static piece = ONE visual metaphor, image-led, ≤ 12 words on the hero, with type that lives in the picture.
   - Example: `posts/2026-11-artdirection/` (`make.py`, `p1-p3`).
   - Images: Flow Nano Banana Pro (free) via `bash vendor/flow-locked.sh flow_agent_generate '{"project_id":"12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36","kind":"image","prompt":"...","aspect":"3:4","download_dir":"<abs folder>"}'` (the lock wrapper is mandatory because several agents share one Flow browser).
   - Max 4 new images per agent. Reuse images in `posts/2026-11-artdirection/`, `posts/2026-11-test/v2/gen`, `reels/007-style-lab/*/assets` first.
   - Prompt style: photoreal, dark room, green #00DB33 rim light, no text in images.
9. **Reels (motion):**
   - One continuous film, where each beat causes the next. No slides.
   - Type lives in the scene (carriers: cards, pills, phone UI, bars, toasts).
   - Text travels on curves from off-screen, never fades in place in one spot like captions.
   - Hidden state is set at build time (no flash).
   - A designed SFX on every visual event (~2/s), mixed to -14 LUFS.
   - No `<audio>` in the page; mux the audio afterwards.
   - Safe zone x 60–960, y 230–1440.
   - Rules: `rules/owner-checklist.md`, `rules/text-motion.md`, `.claude/skills/reel-script/SKILL.md` (triple hook before 0.8 s, long/short rhythm, 2.6–3.0 words/s, 25–35 s).
10. **Voice for reels:**
   - ElevenLabs clone `hKxOF1e0PGHjtctJDcOl`, model `eleven_v3`, plain Gulf text, NO tashkeel.
   - Numbers are spelled as said, in plain colloquial words (the owner rejected «اربعتون» and wants «اربعه وثلاثين ميجا»).
     - Exact numbers always appear ON SCREEN.
     - In the voice, use simple exact spoken forms: «اربعتعش مشكلة», «ستميه وتلطعش كيلو».
     - For decimals, the voice may say the exact on-screen relation instead, e.g. «قرب النص».
     - Never use a vague «وشوي».
   - Tool: `engine/tools/vo.py` (takes / pick / words). The key comes from the tool's own secret loader; never print keys.
   - Check every take with STT and fix any misread number.
11. **Delivery (owner rule):** every finished piece goes to the owner on WhatsApp TWICE, as media and as a document, with ONE command per file:
    `bash E:/Library/01-Workspace/Fortune/fortune-reels/engine/tools/wa_deliver.sh <file> <caption.txt>`
    - Write the caption file in Arabic: what it is, its date and platform, plus the suggested post caption.
    - A carousel: `wa_deliver.sh contact-sheet.jpg cap.txt` (the sheet as media + document), then the slides as one ZIP document: `python engine/tools/wa_send.py slides.zip cap.txt 201020901614 document`.
    - Also copy finals to `C:/Users/Mahmoud/Desktop/first10/`.
    - Send ONLY to 201020901614 (the owner). Never to anyone else. Nothing is published publicly.
12. Arabic text goes through files, never shell arguments. Never print API keys. Do not touch other agents' folders.

## Render and check
- Static: agent-browser `--session <unique>`, `set viewport 1080 1350` (stories 1080 1920), `open file:///...`, `wait --load networkidle`, `screenshot`, then `close`. On Windows never pipe the command that opens a session; redirect to a file.
- Read every PNG you produce. Do at least 2 iterations. Check:
  - Arabic joins are intact;
  - nothing is clipped;
  - 80 px margins;
  - no client names;
  - the new number.
- HyperFrames:
  - `npx hyperframes render -f 60 -q standard -o renders/v60.mp4`, then motion blur:
    `ffmpeg -i renders/v60.mp4 -i audio/mix.mp3 -filter_complex "[0:v]tmix=frames=2:weights='1 1',select='not(mod(n\,2))',setpts=N/30/TB[v]" -map "[v]" -map 1:a -r 30 -c:v libx264 -crf 18 -pix_fmt yuv420p -g 30 -c:a aac -b:a 192k -shortest -movflags +faststart final.mp4`
  - Check stills first by serving the folder (`python -m http.server <port>`). In agent-browser: `eval "window.__timelines.main.seek(t)"`, then `screenshot`.
  - Do NOT use `--start` with hyperframes 0.9.20 (it stalls).

## Report back (short)
- Paths.
- The copy and the caption.
- What was sent.
- Honest weak points.
- Any claim that needs the owner's OK.
