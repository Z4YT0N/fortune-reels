# 013 — Nov 9, 8 PM, Instagram: «الموقع الفخم لازم يكون بطيء؟» (ROAR style)

Replaces the showreel-style attempt in `reels/009-nov09-premium-slow/`. Final: `nov09-roar.mp4` (27.30 s).

## Script (script.txt, take B3)
الموقع الفخم لازم يكون بطيء؟ لا. يقولون لك: لازم تختار، يا فخم يا سريع. بس الفخامة مو هي اللي تبطئ موقعك. اللي يبطئه الشغل اللي ما انضبط. وجوجل تقول: بعد ثلاث ثواني، ثلاثه وخمسين بالميه من زوار الجوال يطلعون. معرض صور كان اربعه وثلاثين ميجا، وصار ميه واربعين كيلو. نفس الفخامة، ونفس الجودة، ويفتح على طول. يعني تقدر تكون فخم، وسريع. موقعك ثقيل؟ اكتب انطباع بالتعليقات.

- The 2 MB → 613 KB video line (owner: «613» was said wrong) is REMOVED from the voice and the screen.
- Voice: ElevenLabs clone hKxOF1e0PGHjtctJDcOl, eleven_v3, plain Gulf text, no tashkeel. 3 takes, all STT-checked (scribe_v1, `audio/stt-B*.txt` + `.diff.txt`):
  - B1: STT heard «اللي منضبط» (the «ما» swallowed: meaning flips). Rejected.
  - B2: «معرض الصور», «أنضبط». OK but less clean.
  - **B3 picked**: only differences are punctuation, «تبطأ» spelling, and digits for the numbers (53 %, 34, 140 all heard right). 26.24 s at 1.0x, 2.52 words/s.

## Picture: one continuous Flow film (owner update 2026-11-07, ROAR-STYLE.md "UPDATE")
Keyframes (Flow Nano Banana Pro, project 12f3c7f0, `gen/K*/`), the man from `ref-man.png` (reel 005) as reference:
K0 gold frame on a marble pedestal + green starburst + hourglass on grey paper → K1 torn split, stopwatch on green | frame on grey → K2 frame dragged by chained iron weights and cables, magnifier → K3 dark set, Saudi man waiting in a green velvet armchair, hourglass → K4 the armchair empty, sand run out → K5 frame back on the pedestal, receipt printing, feather → K6 the man happy in the armchair beside frame + stopwatch, starburst.

Shots (Omni frames-to-video, 5 s, Ki first frame → Ki+1 last frame), retimed by `make_bg.py` into `assets/video/bg.mp4`:
| shot | media | reel time | speed |
|---|---|---|---|
| S1 K0→K1 | aff85103 | 0.00–5.45 | 0.92 |
| S2 K1→K2 | 0752271c (first try e5e3157e failed, code 4) | 5.45–9.80 | 1.15 |
| S3 K2→K3 | fbdde43d (clip 0–3.2 s) | 9.80–12.60 | 1.14 |
| S4 K3→K4 | ff3ac6af (clip 1.4–4.4 s) | 12.60–14.90 | 1.30 |
| S5 K4→K5 | fa9e15d3 (first submit errored on the response read) | 14.90–18.45 | 1.41 |
| S6 K5→K6 | 9b59cc8d, last frame held under the end card | 18.45–23.75 | 0.94 |

## Transition map (each beat causes the next)
1. Hook on a taped paper scrap over the starburst; «بطيء؟» stretches (kashida) → the paper starts to tear.
2. «لا.»: 1-frame invert flash, a green stamp slams; the tear opens into the split.
3. Split: green half = stopwatch «يا سريع», grey half = gold frame «يا فخم». The grey paper closes over the green half → camera onto the frame.
4. «بس الفخامة مو هي اللي تبطئ موقعك» above the frame; weights + cables drop onto it; the cause tag «اللي يبطئه: الشغل اللي ما انضبط» hangs between the weights.
5. The weights yank frame, tags and paper down → the dark world opens under them: the man waiting, «جوجل تقول:» chip, «بعد ٣ ثواني» counts 1→3, «٥٣٪ من زوار الجوال» counts up, source on screen.
6. He stands and walks out; «يطلعون» leaves with him; a flashlight beam wipes the dark into paper and the frame rises back on its pedestal.
7. The pedestal prints a receipt; our overlay receipt prints the lines: معرض صور / قبل ٣٤ ميجا (struck) / بعد ١٤٠ كيلو / نفس الفخامة ✓ / ونفس الجودة ✓.
8. The receipt is torn off upward; «ويفتح على طول» smears in (kashida on «طول»); the man slides back in happy, starburst pops; «فخم،» and «وسريع» return as the two tags of beat 3, now side by side.
9. A dark torn sheet rises from below and covers everything: «موقعك ثقيل؟», comment bar «اكتب انطباع بالتعليقات», logo, www.fortunecode.org, +20 10 98066484.
Thread objects: the gold frame (beats 1–8) and the same man (5–8).

## Owner checklist
- Safe zone: PASS — `safezone_check` 0 violating samples over 137 samples (renders/qa/safezone.json). The film's own picture (pedestals, the man's feet) extends below y 1440; it is the background, not text or data.
- No text over faces: PASS — the man's face is only on screen in beats 5, 6, 8; text sits in the top band (y 230–560) above his head (stills snap/key5.jpg at 12.4 s and 22.9 s).
- Text never overlaps cut-outs / clipped: PASS — `overlap_check` 0 spans over 273 samples. (The check cannot see the video layer; the type bands were placed from gridded frames of bg.mp4, snap/grid.jpg.)
- 9:16 1080×1920 30 fps, frame 1 moves and carries the hook («الموقع» + frame + starburst, push-in): PASS (qa format).
- Nothing held > 2.5 s, no black frames: PASS (qa held-frames, black-frames).
- Smooth motion: PASS — `motion_check` 0 frames with > 2 events, 0 short holds (818 frames). Entrances 0.45–0.55 s, exits 0.4 s, 1 invert flash, 1 smear slam.
- One continuous film, not slides: PASS — one chained Flow film; transition map above; 4 fps strip snap/strip4fps.jpg has no empty or rebuilt frames.
- ROAR collage look: PASS — real-looking objects and a Saudi man on textured paper / dark ground, starburst, torn split, tape scraps, receipt, invert flash.
- Nothing AI-glossy: PARTIAL — Flow film (owner asked for generated video); matte prompts + grain overlay. Owner to judge.
- People look Gulf/Saudi: PASS (thobe, shemagh, agal).
- Brand colours only: PASS (#121416, #00DB33, #006A39, #F0F1F2 + the gold frame/marble props). Logo flat (logo-white.svg).
- Font: Zain mob-long for hero/stress words, IBM Plex for connectors/labels/receipt, Inter for the URL and number: PASS.
- Craft: size hierarchy (hero 2–3× connectors), kashida reveals («بطيء؟», «طول»), highlight boxes («١٤٠ كيلو», «انطباع»), strike-through, shared-word return («فخم» / «سريع» from beat 3 to beat 8), text on scraps and tape, a printing receipt: PASS.
- Arabic joins intact: PASS (whole words, no letter split; stills checked).
- Voice: plain Gulf, no tashkeel: PASS. Accent UNVERIFIED until the owner listens.
- «مبطئ / يبطئ» spelling rule: PASS («تبطئ», «يبطئه»).
- SFX on real hits only: PASS — 49 cues in 27.3 s, `tick_check` peak 0.062 (fail ≥ 0.12). No music bed.
- Loudness: PASS — -14.4 LUFS, true peak -2.8 dBFS, no end silence.
- Script: triple hook (moving frame + question text + «لا» snap within 2.2 s), one service (websites) × one buyer situation (premium site owner): PASS.
- Numbers from facts only: PASS — 34 MB → 140 KB (BRIEF), Google 53 % / 3 s with source on screen (FACTS_BANK). No client names.
- CTA «اكتب انطباع بالتعليقات» + www.fortunecode.org + +20 10 98066484: PASS.
- Delivery: WhatsApp from fc-system to the owner only (media + document), Desktop copy: see REELS_LOG.
- Length: 27.3 s (asked 25–30). qa.py WARNs "target 35-50" and "no loop"; both accepted for this brief.

## Credits
- Flow: 8 images (free). Video: 6 delivered shots × 15 = 90 credits; plus S2 first try (failed, code 4) and S5 first submit (response read error) — up to 120 if both were charged.
- ElevenLabs: 3 TTS takes (~390 chars each) + 3 STT calls. Gemini: 0.
