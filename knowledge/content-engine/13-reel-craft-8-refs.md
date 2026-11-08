# 13. Reel craft from the owner's 8 references (2026-11-07)

The owner sent 8 reels and asked: «اتعلم كل الحاجات دي بأعمق تعلم».

Method:
- Each reel was downloaded with yt-dlp, its voice transcribed with ElevenLabs STT, and its cuts detected with scdet.
- A dedicated agent studied each one frame by frame: 1 fps sheets, the hook at 25-30 fps, 12-24 fps strips around every cut and move.
- Full analyses are in `research/refs-2026-11/batch-2026-11-07/analysis-<id>.md`; frames are in `<id>-frames/`.

| Id | Creator | Topic | Engagement | Analysis |
|---|---|---|---|---|
| DZZ-Lj6uwM5 | Kallaway | Triple Hook Method | 19.8k likes / 10.6k comments | triple hook, split teacher layout, chapter card, formula cascade |
| DcqiQesO_R9 | Kallaway | Script format | 22k / 24k | hook → lock-in → body/rehook ×2 → CTA + lead magnet |
| De0mgVbtXE- | Gin Lee | Script rhythm | 8.1k | long-short-long-short sentences |
| DeEdp-2oa8w | Ahmed Gaber | Hooks (Egyptian) | 1.1k / 844 | the before/after thumbnail rule, single-take selfie |
| DdECqvttfl6 | عبدالله فؤاد | 31 content types | 2k / 1.3k | list over one take, a prop motivates every swap |
| DeKKSdXIGnf | Graphic Designer | Arabic fonts | 5.2k / 2.9k | text cut on the bar, footage cuts between bars, kashida justification |
| DbqEke7oewm | Sankalp Pandey | 3D black-bar effect | 78.6k | frame-break pop-out |
| DdO_RRLsvZg | Marcel Grau | 7 named aesthetics | 24k comments | pop-on-twos collages, dither / receipt / phosphor recipes |

## A. Script rules (all mandatory from now on)
1. **Skeleton** (Kallaway):
   - hook (1-3 s): context + lean;
   - lock-in (2-3 sentences, 3-5 s): snapback, proof or the exact payoff, no greeting;
   - body 1 → rehook 1 → body 2 → rehook 2 (a rehook is a 1-2 s mini-hook, marked by a cut or layout switch);
   - optional body 3 / closing;
   - CTA with an aligned lead magnet.
2. **Triple hook:** CONTEXT immediately, said in audio, shown in visuals and written in text (all three before frame 25). Then a LEAN (proof/stat, pain/benefit, or something shocking). Then a CONTRARIAN SNAPBACK that reverses the lean.
3. **Rhythm** (Gin Lee): never three long lines in a row. Put a line of 5 words or fewer between long ones. Short lines are OPEN LOOPS («خلنا نشوف.»، «بس فيه مشكلة.»), and the twist gets its own short line. Every short line lands on a cut or graphic state change (this is a gate).
4. **Visual hook rule** (from the thumbnail in Ahmed Gaber's reel): ONE subject + a text line that contradicts expectation + an arrow tying the text to the subject + one curious detail.
5. **Start on frame 1:** speech and a fully composed frame at f0. No fade-in, no greeting.
6. **Name the framework** («طريقة …») and nest everything in threes.
7. **Pace for Gulf VO:** 2.6-3.0 words/s; a new visual every ≈ 2.4 s (every ≈ 0.6 s in the first 4 s); 35-75 s.
8. **Comment-keyword CTA:**
   - ONE keyword everywhere: voice, caption and title, the biggest text in the video;
   - a free, concrete asset on the same topic (speed audit, checklist PDF);
   - the reel still teaches the real fix for people who never comment;
   - deliver at once;
   - only promise it once the DM/WhatsApp automation exists;
   - client follow-up from the main number, never fc-system.
9. **List format** (31 types / fonts / 7 aesthetics): the promised count is the hook (an empty grid at f0), the items fill on the voice, and the full list holds only ~0.4 s before the loop.

## B. Visual and edit devices
- **Teacher layout:** SPLIT (graphic on top, rounded talking-head card at the bottom with the head breaking out) for information; FULL punch-ins (~2.2x crop of the same take, ≤ 3-4 s) for takeaways, rehooks and the ask.
- **Persistent progress object:** a chapter card whose next bar sharpens (blur → sharp + light sweep), or one card whose rows fill across cuts. The FORMULA CASCADE (all bars turn #00DB33 about 3 f apart) is our signature payoff.
- **Two background modes:** concept #121416, evidence #F0F1F2 (a ~6 f switch).
- **Diagrams for every claim:** a self-drawing graph (axes 8 f, curves 80 f, eased out), a dot-field audience, sonar pulses, a branching story arc, a physical analogy (falcon/dhow instead of the fishing hook).
- **Proof inside device mockups:** a feed swipe inside the phone, a 2×2 grid where the losers blur out, a live view counter, a profile/client card. Real screens only.
- **Annotations:** pen ellipses and swooshes drawn in 6-8 f on real screens; a whip slide in 6 f with horizontal blur (in Arabic the new card enters from the left).
- **Frame break / black bars** (Sankalp):
  - bars close the frame to a band (13-23 % of the height) in 18-22 f, expo.out;
  - a cut-out hero 1.35-2.2x the band height overhangs it;
  - optional cut-out hands grip the band;
  - hide swaps at about f12, while the bars move;
  - the hero = the product made physical (an app on a phone, a ZATCA invoice, a price card).
- **Single take, no cuts** (عبدالله فؤاد / Ahmed Gaber): every change happens in overlays, and a real prop action (paper riffle, phone swipe, gesture) motivates each swap so it reads as continuous.
- **Music-grid editing** (fonts reel): text changes ON the bar, footage cuts BETWEEN bars; a person crossing the text clears it as they leave.
- **Pop-on-twos collage** (Marcel): a label alone for 4 f, then 5-6 cards hard-pop every 2 f, then a 9-14 f hold, then a hard cut. In style Y, cards pop in MIRRORED pairs.
- **Captions:** 1-3 whole words, hard swaps on the word with no bounce, Zain. Only the CTA keyword is stacked and oversized. Keep them inside the safe zone (not at 70 % height under the Instagram UI).
- **Text behind the speaker** (CTA in Marcel's reel): a person matte over the text (we have `matte.py`).

## C. Looks we can make deterministically (recipes in `analysis-DdO_RRLsvZg.md`)
- **USE:**
  - 1-bit Bayer dither in #121416/#00DB33 (ffmpeg `paletteuse=dither=bayer`), stable on video, a signature look;
  - an Arabic ZATCA receipt-ticket card (HyperFrames, print-out `steps(24)`);
  - clean blob tracking over real screens (OpenCV);
  - P1 green phosphor (exactly #00DB33) for code beats.
- **AVOID:** datamosh (reads as a broken product), flash-light silhouettes, cyan CRT, glow on backgrounds.

## D. Sound
- Voice-led at -14 LUFS. No music bed in the teaching reels (Kallaway, Gin Lee, Ahmed); a light bed in list/showcase reels.
- SFX are sparse in the teaching reels (≈ 1 per 9 s, on graphic events, never on captions). Our designed-SFX density (style #1) suits cinematic story reels, not talking-head teaching.
- Cut on breaths: `silencedetect=n=-40dB:d=0.12`, cut 1-2 f after `silence_end`.

## E. Mistakes seen in the references, never to copy
- Text under the Instagram buttons.
- Mirrored periods and parentheses in right-to-left text («.16»); use `<bdi>`.
- Typos on screen.
- A CTA keyword that differs between card and voice.
- Comic Sans.
- Red as the main accent.
- Borrowed English material / other creators' reels as examples.
- 134 s length for a cold Gulf audience.

## F. FortuneCode formats unlocked
1. **Teaching reel** (split + chapter card + cascade): «٣ أشياء لازم يسويها موقعك في أول ٣ ثواني»; CTA «اكتب "فحص"».
2. **List reel over one take** with our own client work in the inset: «٢٥ ميزة لازم تكون في موقع شركتك»; CTA «اكتب ٢٥».
3. **Frame-break product hero:** «هذا… وهذا… وهذا», with an app, an invoice and a site popping out of bands over Riyadh footage.
4. **Rhythm-rewrite reel:** a client's hero copy rewritten on screen, then the "after" played («شفت الفرق؟»).
5. **Resource pack on the music grid:** «5 أقسام لازم تكون في موقع متجرك».
6. **Style Y (green Wes Anderson world)** + chapter cards + pop-in-mirrored-pairs + a dither poster as the house look for the series.
