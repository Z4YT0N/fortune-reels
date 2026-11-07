# 015 Nov 16 reel (ROAR, generated video): JS 2.2 MB -> 1.2 MB, background video 2 MB -> 613 KB

Final: `nov16-js-video-roar.mp4` (31.04 s, 1080x1920, 30 fps, 60 fps render + tmix motion blur, -14.3 LUFS, true peak -3.6 dBTP).
Replaces the showreel-style 011 for Nov 16. Client not named anywhere.

## Pipeline (owner update 2026-11-07: scenes are AI video, as in 006)
- Keyframes K0..K5: Flow Nano Banana Pro, 2 candidates each, picked by eye (`gen/K*/`, sheets `gen/sheet-*.jpg`).
  Man = reference upload of `assets/cut/man-happy.png` (Flow media 2965b410…), so K0/K1/K2/K5 are the same man as reels 005/006.
  Picks: K0 b0cf0b73, K1 4edbf4aa, K2 ef523bda, K3 32ff5348, K4 249cb366, K5 ec80f745.
- Shots S1..S5: Flow Omni frames-to-video, 5 s, 720p, Ki first / Ki+1 last (`gen/shots-flow.json`, `gen/run_vid.py`).
  Media: S1 2be18f8b, S2 036f7942, S3 a6a025c2, S4 ff8ad456, S5 aecaab98.
- `film.py` + `shots.json` retime and concat to `assets/video/bg.mp4` (-g 30). S2 starts on a K0-like frame (Flow attached the wrong first frame), so it is trimmed from 1.3 s: the S1->S2 join is a cut on motion, not a true chain.
- Type/overlay layer: `roar.tpl` + `beats.js` (POS from `shots.json`), `build.py` -> `index.html`. No `<audio>` in the page.
- Sound: `mix.py` (54 cues, VO + SFX, loudnorm -14 + 0.7 dB), new SFX from ElevenLabs in `assets/sfx/` (print, snip, flash, creak).
- Render: `npx hyperframes render -f 60 -q standard -o renders/v60.mp4`, then the BRIEF tmix pass.

## Voice
- Owner said «ستميه وتلطعش كيلو» was read wrong. Tested 4 short clips (`audio/numtest/`, `audio/vo-n1..n4`):
  - n1 «ستمية وثلاث عشر كيلو»: STT «613», word durations normal.
  - n2 «ستمية وثلطعش كيلو»: STT «613», «وثلطعش» 0.60 s.
  - n3 «ستمية وثلاثة عشر كيلو»: STT heard «وإن فيديو», «عشر» lasted 0.06 s (swallowed). Rejected.
  - n4 rephrase «والفيديو، نزل لاقل من ثلث حجمه»: STT exact. CHOSEN (613/2000 = 30.7 %, under a third; screen shows exact ٦١٣ كيلو).
  - Owner clip `audio/number-line-613.mp3` (n4 then n2) sent on WhatsApp: 3EB0883E24007D8275E7CC.
- Full takes T1/T2/T3 (clone hKxOF1e0PGHjtctJDcOl, eleven_v3, stability 0.5, plain Gulf, no tashkeel). T2 picked: STT diffs are spelling only (JavaScript/Google/digits/hamza). T1 heard «كأنه خطأ» for «كان يحط»; T3 heard «وفيه جو» for «وفيديو». Accent unverified until the owner listens.

## Transition map (each beat causes the next)
1. K0 hook: the man bent under a crate + film reel, scrap «موقع شركة / كبيرة،» taped in on frame 0; «جوالك» tag with an arrow drawn to his phone; «حمل ما تشوفه» above the load, kashida stretches as he sinks (S1 orbit to the front).
2. Hanging tags swing onto the crate (JavaScript ٢٫٢ ميجا, counter rolls) and the reel (فيديو الخلفية ٢ ميجا); S1 -> S2 cut on motion as the camera dives along the crate.
3. «وش يعني هذا؟» slam; the tags drop away and S2 tilts down to the phone: «جوالك» rides in, download pill «ينزّل ٤٫٢ ميجا» stalls at 6 %; strip «قبل ما الصفحة تتحرك.» drops.
4. S3: a flashlight beam sweeps, the light goes out and the phone's loading ring becomes a stopwatch on a concrete pedestal (dark). «قوقل تقول:» «+٣ ثواني» «على الجوال», then «٥٣٪ من الزوار يطلعون» + source.
5. Invert flash on «فاشتغلنا»: S4 lights come up (flare), green starburst, shears cut the crate in half on the scale; the receipt prints JS ٢٫٢ -> ١٫٢ ميجا, video ٢ ميجا -> ٦١٣ كيلو, stamp «أقل من الثلث».
6. The receipt tears off as S5 pulls back: the pedestal sinks, the same man stands up light with his phone, a feather; «نفس الموقع، بس اخف».
7. Question note «تبي تعرف / وش اللي / مثقل موقعك؟» drops beside him; comment bar types «اكتب انطباع», send -> the dark end card grows out of the bar (logo, CTA, www.fortunecode.org, +20 10 98066484).
Thread: the same man + the crate/film reel from frame 0 to the cut, the phone throughout.

## Owner checklist
- Safe zone: PASS, `safezone_check`: 0 violating samples over 155.
- No text over faces: PASS by eye (`snap/keys-final.jpg`, `snap/final-4fps.jpg`); «اخف» and the question note sit left of his head.
- Text never over phones/cut-outs, never clipped: PASS, `overlap_check`: 0 spans. (The whole picture is video, so tags/scraps sit on the paper or the crate by design.)
- 9:16 1080x1920 30 fps, frame 1 moves and carries the hook: PASS (`snap/v_check.jpg`, scrap dropping + man sinking at 0.0 s).
- Nothing held > 2.5 s, no black frames: PASS (blackdetect/freezedetect empty on the final).
- Smooth motion: NOT MEASURED by `motion_check` (this engine has no `__qaMotion` hook, same as 011/008). By eye: entrances 0.3-0.6 s expo/back, 2 smear slams, 1 invert flash. Overshoot follows 008 (back.out up to 1.7), not the ≤3 % rule. PARTIAL.
- One continuous film: PASS except the S1->S2 join (cut on motion, see Pipeline). Map above.
- Look: ROAR (paper studio, real Saudi man, real props as metaphors, starburst, receipt, notes, tape, invert flash), generated video, brand colours only, logo flat. PASS.
- Font: Zain mob-long for hero/stress words, Plex for labels/UI, Inter for Latin. PASS.
- Arabic joins intact (whole words, one growing string for kashida/typeOn): PASS.
- Voice: plain Gulf, no tashkeel, no dictionary. Accent unverified until the owner listens.
- Numbers: on screen exact (٢٫٢ / ١٫٢ ميجا, ٢ ميجا / ٦١٣ كيلو, +٣ ثواني, ٥٣٪ with source); spoken «فوق الاثنين ميجا», «اثنين ميجا», «شلنا منه ميجا كاملة», «نزل لاقل من ثلث حجمه», «اكثر من نص». PASS. «٤٫٢ ميجا» on the download pill = 2.2 + 2 (sum of the two allowed facts).
- SFX on events (54 cues / 31 s), no loop: PASS, `tick_check` mix 0.069 vs voice-only 0.076. No music bed. -14.3 LUFS, TP -3.6. PASS.
- Client not named, CTA «اكتب انطباع بالتعليقات», new number on end card: PASS.
- Credits: Flow 5 Omni videos (≤16 each, about 75), 12 images free; ElevenLabs 4 number clips + 3 full takes + 7 STT + 4 SFX; Gemini 1 call refused (monthly spend cap, 429, nothing generated).
