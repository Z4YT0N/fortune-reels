# Hard rules (every piece, every platform)

Each rule comes from an owner rejection or decision. The date and his words are given where known.

## 1. Names and identity
- **Never name a client.** This means no Taj, no Ambatt, no Malahi, nobody, and no client logos.
  Say «موقع شركة كبيرة», «منصة شركة», «متجر», «مصنع», «موقع قبل إطلاقه».
  Owner, 2026-11-07: «متذكرش اسامي حد».
- Any plan item such as "client logo reveal" becomes OUR logo.
- **Brand:**
  - dark #121416;
  - accent green #00DB33 (one accent only);
  - deep green #006A39;
  - light #F0F1F2;
  - no beige paper.
  - Logo files: `reels/008-nov07-gallery-showreel/assets/brand/logo-white.svg` and `mark.svg`.

## 2. Language
- **Instagram** (hooks, body copy, voice): light Gulf Arabic. Owner, 2026-11-07: «الهوكس خليجي».
- **LinkedIn:** English.
- **Website** SEO titles and H1s stay MSA (not content-engine work).
- Arabic text always goes through UTF-8 files, never shell arguments.

## 3. Allowed facts only (never invent numbers, quotes, reviews or results)
- **Gallery:** 34 MB → 140 KB, same photos, same quality.
- **Security audit before launch:** 14 issues found and fixed.
  - Use generic categories only, framed as "examples of what a review covers", never "these were the 14".
  - The categories: access permissions, form input validation, security headers, exposed keys or config, dependency updates, rate limiting, error messages that leak info.
- **Performance:**
  - JavaScript 2.2 MB → 1.2 MB;
  - background video 2 MB → 613 KB.
- **`memory/FACTS_BANK.md`** (cite the source in small text on screen):
  - Google: 53 % of mobile visitors leave after 3 s;
  - Deloitte for Google: 0.1 s faster → +8.4 % retail conversions;
  - first impression ≈ 50 ms.
- **Method, 6 steps:** understand → quote and timeline → design → build and test → launch → support. Scope, price and timeline are fixed in the contract.
- **Derived numbers** (sums, percentages) need his OK before publishing. Example: «٤٫٢ ميجا» = JS + video, still waiting.

## 4. Contact and CTA
- Every end card and footer shows `www.fortunecode.org` and `+20 10 98066484`.
  - This is the NEW number (owner, 2026-11-07).
  - Never use 01030608763.
- **Comment CTA keyword «انطباع»:** the team sends the commenter a free first-impression review of their site.
  - Instagram: «اكتب انطباع بالتعليقات».
  - LinkedIn: "Comment 'review' and we'll send a first-impression review of your site", or DM.

## 5. Fonts
- **Statics, carousels and stories:** IBM Plex Sans Arabic ONLY (`posts/2026-11-artdirection/assets/IBMPlexSansArabic-*.ttf`).
- **Reels and motion:**
  - Zain mob-long (`reels/008-nov07-gallery-showreel/assets/fonts/zain-mob-long.ttf`) for hero and stress words only. Kashida stretch on the stress word.
  - Plex for connectors, labels, UI, buttons, sources, the CTA and the URL. Inter for Latin text.
- **Zain tails are very long:**
  - at most 2–3 Zain words per line;
  - measure every line and `fit()` it;
  - long lines and button text go in Plex.
  - Zain tails broke the «فحص مجاني» button and the end lines in reel 008.

## 6. Voice (reels)
- **Settings:** clone `hKxOF1e0PGHjtctJDcOl`, `eleven_v3`, stability 0.5, plain Gulf text, NO tashkeel (owner: tashkeel voice = «زبالة»). Tool: `engine/tools/vo.py`. It loads its own key; never print keys.
- **Numbers:**
  - Spell numbers as people say them: «اربعه وثلاثين ميجا», «ميه واربعين كيلو», «اربعتعش مشكلة». He rejected «اربعتون».
  - Never use a vague «وشوي».
- **A passing STT result does NOT prove a number sounds right.**
  - «ستميه وتلطعش» passed STT, but the owner heard it as wrong (2026-11-07).
  - Test each hard number as short isolated clips (2–4 spellings) and send him the clip.
  - Prefer a true rephrase in the voice while the screen shows the exact number. Example: «نزل لأقل من ثلث حجمه» with ٦١٣ كيلو on screen (613/2000 = 31 %).
- **Every take:**
  - Run STT (`scribe_v1`) and diff it against the script.
  - Reject any take where a word that flips the meaning was swallowed. Example: «اللي ما انضبط» heard as «اللي منضبط».
- **The accent stays "unverified" until he listens.** Say that in the report.

## 7. Reel motion (all styles)
- **One continuous film.** Each beat CAUSES the next. No slides, no clearing to empty and rebuilding (owner: «كأنه سلايدات»).
- **Type lives in the scene,** on a carrier: a tag, note, receipt, phone UI, strip or stamp.
  - Text travels on curves from off-screen.
  - Never fade text in place like captions.
- **No flash of text:** hidden state is set at build time, with frame-baked `TL.set`.
- **Persistent thread object:** the same man, prop or cursor across the reel.
- **Safe zone:** x 60–960, y 230–1440. No text over faces.
- **Format:** 1080x1920, 30 fps, 25–35 s, triple hook before 0.8 s.
- **SFX:** a designed hit on every drop, flash, tear and print (about 2/s). No loops or ticking beds. Mix to -14 LUFS.
- **Never put `<audio>` in the HyperFrames page.** Mux the audio afterwards.

## 8. Statics, carousels and stories
- **Art direction, not stacked text** (owner: «ضعيفة جدًا… مجرد نصوص متراصة»).
  - ONE visual metaphor per piece, image-led.
  - At most 12 words on the hero.
  - Type lives in the picture.
- **Images:**
  - Flow images through `vendor/flow-direct/fd.mjs` (free, parallel; the google-flow MCP is the fallback). No Gemini API since 2026-11-09;
  - photoreal, dark room, green #00DB33 rim light, no text in the image;
  - at most 4 new images per piece; reuse existing images first.
- **Margins:** 80 px.
- **Check:** read every PNG. Arabic joins intact, nothing clipped, no client names, the new number.

## 9. Delivery and safety
- **WhatsApp:**
  - to the owner ONLY (201020901614), from the fc-system line;
  - never to clients or staff;
  - media first, then the document (`references/delivery.md`).
- **Publishing:** nothing goes public without him.
- **Code:** vet external code before running it.
- **Secrets:** never print secrets.

## 10. Gate after reel 016 was rejected (owner, 2026-11-08: «لقطات ai ملهاش علاقة ببعض… Text ملوش أي علاقة… النطق بايظ… رخيصة»)
- **Voice:**
  - Never time-stretch the voice above ×1.08. Cut words instead: about 2.3 words/s, so 60–70 words for 30 s.
  - STT passing does not prove the speech sounds good.
- **One world, one story:**
  - one location, one character, one continuous action;
  - each shot is the next moment of the SAME scene;
  - no montage of unrelated AI sets or "props on pedestals";
  - write a one-line logline first.
- **Text appears only when the picture shows that exact thing.**
- **Sample before credits:** send the owner a storyboard plus 3 keyframe stills plus a 10-second voice sample, and wait for his OK before generating video.
- **Before sending:** watch the whole reel with sound yourself. A subagent's PASS checklist is never the quality verdict.
