# 016: Alum Aman test reel, ROAR style (made to win the client)

Owner Mahmoud (FortuneCode), 2026-11-08: «اعمل ريل تجريبي كدا بستايل رور ويكون متعوب عليه جامد عاوز ابهرهم».

This is a pitch sample. FortuneCode shows it to the client **«ألمنيوم نظم أمان» (Nozom Aman Aluminum)**, an aluminium factory and installer in Al-Ahsa that makes windows, doors, curtain walls and skylights.
- The reel is THEIR brand reel. Their name and logo ARE allowed here.
- The FortuneCode "no client names" rule does not apply inside their own reel.
- Do NOT put FortuneCode's contact details or logo in it.
- It must be the best reel we have made: cinematic, real, with soul. «مش سلوب».

## Read first (mandatory)
1. `C:/Users/Mahmoud/.claude/skills/fortune-content-engine/SKILL.md` and its `references/rules.md` and `references/roar-reel.md`.
   - These are the engine rules.
   - The FortuneCode-specific rules do NOT carry over: no-names, FortuneCode facts and contact, Zain/Plex fonts, green palette, the «انطباع» CTA.
   - Everything else does carry over: motion, voice, SFX, QA, continuity, safe zone, no fabricated facts, Arabic through files.
2. `content/2026-11-first10/ROAR-STYLE.md` and the frames `research/refs-2026-11/sheets/txt-roar.jpg` and `txt-roar5.jpg`.
3. The best existing example, to copy its structure: `reels/015-nov16-roar/`. That means `gen/run_vid.py`, `shots.json`, `film.py`, `roar.tpl`, `beats.js`, `build.py`, `mix.py`, `NOTE.md`. Also `reels/013-nov09-roar/NOTE.md`.
4. The client brand:
   - `E:/fortune projects/almanyum-aman/PRODUCT.md` (personality, anti-references);
   - `lib/business.js` (facts);
   - `app/globals.css` (tokens).
   - Read only. Do not edit that repo.

## Brand: Alum Aman (replaces Fortune's palette for this reel)
- **Colours:**
  - teal `#0199a2` is the ONE accent, with deep `#017a82` and soft `#01b8c3`;
  - ink `#1d1d1d` and near-black grounds;
  - textured light concrete or grey paper is fine;
  - NO gold anywhere (their explicit anti-reference), no beige.
- **Font:** Thmanyah only, in `E:/fortune projects/almanyum-aman/public/font/thmanyah/` (thmanyahsans, thmanyahserifdisplay, thmanyahseriftext; otf and woff2).
  - Use serif display for hero and stress words and sans for labels.
  - Measure every line. Arabic joins must stay intact (whole-word nodes).
- **Logo:** `public/images/logos/logo.png`, `logo-text-cyan.png`, `icon-only.png`, and `public/images/alumaman/logo.png`. Check which one reads on dark.
- **Personality:** Bold • Cinematic • Local. Premium architectural studio, the "evening showroom walkthrough".
- **Anti-references:**
  - discount or urgency badges;
  - stock family photos;
  - generic icons;
  - isometric or 3D blobs;
  - dreamlike AI heroes.
  - The look must stay PHOTOREAL and grounded. Flow AI video is approved by our owner for ROAR scenes, but keep it real-world and physically believable.

## Real material (use it)
`E:/fortune projects/almanyum-aman/public/images/`:
- `alumaman/` (`windows.jpg`, `doors.jpg`, `curtain-wall.jpg`, `skylight.jpg`, `hero-villa*`, `house*`, `sky-frames/`);
- `single-project/`, `project/`, `about/`, `win/` (13 webp).

How to use it:
- LOOK at each one. Some are AI or Gemini-made (for example `Gemini_Generated_Image_*`); skip those as "real".
- Use real photos as Flow reference images, so the keyframes show their real product language: slim dark frames, villa facades, curtain walls.
- ROAR reels end with a real portfolio montage. Use a fast montage of REAL Alum Aman project photos near the end (cut-outs on the ground, push-ins, 4–6 frames).

## Allowed facts ONLY (from `lib/business.js`, owner-given)
- Warranty, written with the contract:
  - 10 years on the aluminium;
  - 5 years on the paint finish;
  - 2 years on the accessories.
  - Never write "10 years on product and installation". Say «ضمان مكتوب حتى ١٠ سنوات» or the three tiers.
- The 4 guarantees:
  1. «التزام تام بموعد التركيب» (the date is written in the contract);
  2. the written warranty;
  3. «صيانة مجانية مدى الحياة» (adjusting hinges, handles and slides at no cost);
  4. «جودة تستاهل».
- **Materials:**
  - Guardian double glass, 6 mm (American specs), U-Value 2.5 or 1.9 depending on the reflective layers;
  - German WACKER silicone;
  - EPDM rubber that resists heat and sun, with brushes and drainage slots that seal out dust and water;
  - Italian and European accessories.
- They manufacture in Al-Ahsa and install across the Eastern Province (الأحساء، الدمام، الخبر…).
- **CTA:** «احجز معاينة مجانية» (free site inspection).
- **Contact on the end card:**
  - `alumaman.com`;
  - WhatsApp `+966 56 634 3386`;
  - Instagram `@nozomaman`.
- **NOT confirmed** (do NOT use them):
  - the years of experience (17 vs 15), the "425 homes / 500 projects" counts;
  - the Google rating 4.8 / 32 reviews;
  - the 15 % showroom discount (also an anti-reference: no discounts).
- Invent nothing else. No temperatures as claims about their product, no "% cooler".
  - A dramatic but true scene fact is fine: Al-Ahsa summer heat, dust storms, sun.
  - Any number in the voice must come from the list above.

## Story direction (refine it, but keep the logic)
- **Audience:** a homeowner in Al-Ahsa (30–55) building or renovating a villa. It is a 20-year purchase, decided with family or a contractor.
- **Pain:**
  - windows that let in the heat, dust and noise;
  - water leaks;
  - a fitter who disappears after installing;
  - a promised date that slips.
- **Suggested arc, in the ROAR 7-beat formula** (`knowledge/content-engine/10-script-patterns.md`):
  1. Hook (Gulf): for example «شباكك يدخل عليك حر الأحساء وغبارها؟».
  2. The usual story: a cheap fitter, a bad seal, a gap.
  3. The turn.
  4. Their 4 guarantees, each a ROAR object:
     - a contract with the installation date stamped (schedule);
     - a giant warranty receipt printing 10 / 5 / 2 (warranty);
     - a technician's hand tightening a hinge at no cost (maintenance);
     - Guardian glass, WACKER silicone and an EPDM seal as oversized hero props on concrete pedestals (quality).
  5. The real portfolio montage.
  6. CTA «احجز معاينة مجانية».
- **Write 3 hooks** in light Gulf (Saudi, eastern-region-friendly) and pick the strongest. Length 25–35 s, pace 2.6–3.0 words/s, triple hook before 0.8 s.
- **Characters:** a real Saudi homeowner in thobe and shemagh as the persistent thread. He may stand in his villa majlis by a big window. A family can be implied but not shown (no stock-family look).
- **Props:**
  - an oversized aluminium window profile cut-section;
  - a sun or heat shimmer behind the old window;
  - a dust storm hitting glass;
  - a thermometer as a prop only (no claim);
  - a calendar or contract;
  - a receipt printer;
  - concrete pedestals;
  - a teal starburst;
  - a split frame between the old leaky window and the Alum Aman window.

## Picture (Flow AI video, chained), as in reels 013–015
- **Order of work:**
  1. Transition map in `NOTE.md` first: each beat causes the next, and the thread object is named.
  2. Keyframes K0..Kn: Flow Nano Banana Pro (free). Make 2+ candidates each and pick by eye from a contact sheet. Use real photos as references.
  3. Shots: Omni frames-to-video, 5 s, 720p, Ki → Ki+1, `wait:false`. Run them in parallel through `vendor/flow-locked.sh` (3 slots; keep 3 Flow tabs open with `node vendor/open-flow-tabs.mjs 3`).
- **Budget:** up to 160 Flow credits for this pitch reel (≈ 8–10 shots). Check the quote each time and report the total.
- **Quality bar:**
  - look at a 12-frame strip of EVERY shot;
  - re-roll bad physics, morphing faces or text artifacts;
  - name honest weak points.
- Then `film.py` → `assets/video/bg.mp4`, then the HyperFrames ROAR type and overlay layer:
  - small word-by-word type placed right above the object, kashida on the stress word;
  - teal starburst, receipts, a stamp, tape, a 1-frame invert flash, a flashlight wipe, a split tear.
- **Optional:** a short AI music bed is NOT wanted. Use SFX only, a designed hit on every event (~2/s), -14 LUFS.

## Voice
- ElevenLabs clone `hKxOF1e0PGHjtctJDcOl`, `eleven_v3`, plain Gulf, no tashkeel, stability 0.5. Tool: `engine/tools/vo.py`.
- Make 3 takes, STT-check and diff each, and pick one.
- Speak numbers colloquially: «عشر سنين», «خمس سنين», «سنتين».
- Ear-test any hard word: «جارديان», «واكر», EPDM. Prefer that the screen carries the brand names and the voice says «زجاج مزدوج», «سيليكون ألماني».

## Render, QA, delivery
- **Render:** 60 fps render, then the tmix pass (`references/roar-reel.md`). Do not use `--start`.
- **QA:**
  - `engine/tools/safezone_check.py` and `overlap_check.py`;
  - no text over faces;
  - check the stills by eye (at least 8 key moments) and run 2 fix iterations.
- **NOTE.md** must include: the script, the takes, the media IDs, the transition map, the checklist PASS/FAIL, the credits, and the weak points.
- **Final:** `reels/016-alumaman-test-roar/alumaman-test-roar.mp4`, 1080x1920, 30 fps.
- **Delivery:**
  - Copy it to `C:/Users/Mahmoud/Desktop/alumaman/`.
  - Send it to the OWNER ONLY: `bash engine/tools/wa_deliver.sh <mp4> <caption.txt>` (media + document, to 201020901614). Never send anything to the client.
  - The caption file (Arabic): "Test reel for ألمنيوم نظم أمان (pitch sample)", plus the suggested Instagram caption for their account.
- **Report back (short, English is fine):**
  - the paths;
  - the script;
  - the hooks considered;
  - the credits;
  - what was sent (message IDs);
  - honest weak points;
  - any wording that needs the owner's OK.
