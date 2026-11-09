# One FortuneCode post per format (owner, 2026-11-07: «اعمل لفورتشن كود بوست من كل نوع»)

There are 19 formats from `research/posts-carousels-2026/CATALOGUE.md`. Format 20 (textures) is accents only, so it gets no post of its own.

**Formats split across 4 parallel agents.** Each agent works ONLY in its own folders: `posts/2026-11-formats/NN-<slug>/`.
- Single image: 1080x1350 PNG.
- Carousel: 3-6 slides, 1080x1350 each, plus a `contact-sheet.png`.

## Identity: must match our feed
- Read `research/own-instagram/IDENTITY.md` and `grid.jpg`.
- **Font (owner, final 2026-11-07): IBM Plex Sans Arabic for ALL static posts and carousels; Zain mob-long is for reels only.**
- Base:
  - near-black #121416, with #00DB33 used as a GREEN GLOW, never flat neon blocks everywhere;
  - real devices in a dark room;
  - FortuneCode logo top centre (flat);
  - thin rounded outline frame;
  - footer row: globe «www.fortunecode.org» + WhatsApp «01030608763».
- Reuse the approved v2 kit in `posts/2026-11-test/v2/`:
  - `common.css`, `footer.js`, `assets/` (logo, fonts), `render.sh`, `slice.py`;
  - `gen/` images (laptops, phones, keyboard, gallery photos);
  - `screens/`.
  Read `post.html` and `carousel.html` there first, then copy what you need into your folder.
- **Arabic font:** Zain mob-long ONLY (`reels/007-style-lab/shared/zain-mob-long.ttf`), the owner's decision. Latin, URLs and numbers inside Latin go in IBM Plex Sans Arabic Medium (as v2 did).
  - Zain draws long word tails, so keep body lines short.
  - `dir=rtl`; `<bdi>` for mixed text; Arabic-Indic digits for Arabic numbers, consistently.
- A format may change layout, but it must still read as FortuneCode. Format looks from the references (e.g. the X card, Notes app, yellow statement post) are translated into our dark-green palette.

## Content rules (owner rules, hard)
- **Light Gulf Arabic** for sales copy; MSA is fine for titles.
- **Never fabricate** numbers, reviews, quotes or client results. Only use:
  - the gallery case: 34 MB → 140 KB, same photos and quality (client unnamed);
  - `fortune-reels/memory/FACTS_BANK.md` facts (cite the source in small text on the slide):
    - Google: 53 % of mobile visitors leave if a page takes over 3 s;
    - Deloitte for Google: 0.1 s faster → +8.4 % retail conversions;
    - first impression in about 50 ms;
    - Google mobile-first indexing.
  - Starting prices (owner-approved, SAR): website / store from 5,600; system / platform from 18,800; app from 12,000; AI employee from 2,500; automation from 3,750. Larger work = «حسب النطاق».
  - Services: websites, stores, systems / ERP / CRM, apps, AI, automation, cybersecurity.
  - "+200 clients" appears on our own feed, so it may be reused.
- **Testimonials:** no verified client quote exists. Build the design with an OBVIOUS placeholder «[رأي عميل حقيقي — بانتظار موافقة العميل]» and say so.
- **Approved CTA keyword:** «انطباع» (the team sends a free first-impression review of the commenter's site). Use it as the comment CTA where a CTA fits. Alternatives: «احفظ البوست», or «راسلنا واتساب».
- Never name a client or competitor. Logos of clients only if already on our feed.

## Images
- **Free via Flow** (Nano Banana Pro) through the lock wrapper ONLY, because the 4 agents share one Flow browser:
  `bash E:/Library/01-Workspace/Fortune/fortune-reels/vendor/flow-locked.sh flow_agent_generate '{"project_id":"12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36","kind":"image","prompt":"...","aspect":"3:4","download_dir":"<abs folder>/gen"}'`
- MAX 3 new images per agent. Reuse existing images first:
  - `posts/2026-11-test/v2/gen`, `posts/2026-11-test/gen` + `cut`;
  - `research/flow-images`, `reels/007-style-lab/*/assets`.
- Prompts in English, photoreal: dark room, green #00DB33 rim and ambient light, no text on screens. Build screen content in HTML and composite it.

## Render and check
- agent-browser: `open file:///...`, viewport 1080 1350, screenshot.
- NEVER pipe the command that opens a session; use a unique `--session <slug>` per agent and close it after.
- Read every PNG you render. At least 2 iterations per piece.
- Check: Arabic joins intact, nothing clipped, text inside 80 px margins, footer visible, no English leftovers in Arabic copy.

## Report
- Return for each piece:
  - path(s);
  - the copy;
  - a 1-line caption;
  - honest weak points.
- If the Write tool refuses a file, write it via Bash / python.
