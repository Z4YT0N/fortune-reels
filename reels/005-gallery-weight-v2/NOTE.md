# Reel 005: Heavy gallery v2 (34 ميقا -> 140 كيلو), rebuilt from scratch

Why v2: the owner said v1's text was flat, the pronunciation was wrong in places, there were no moving ROAR
cut-outs, the images looked AI-made, and the footage sites he gave were not used.

## Sourcing list (real first)
| # | Shot | Source |
|---|---|---|
| 1 | Gallery prints in S1/S3/S6 | REAL: fortunecode.org/portfolio, captured with agent-browser (iPhone 16 Pro, 3x). Masar + Wajhat cards only; the Taj card is excluded (client not named) |
| 2 | Phone screen loading slow (S2) / fast (S8) | REAL: the same portfolio page as the phone screenshot (`assets/img/r-phone.jpg`) |
| 3 | Hands tapping, waiting (S2) | REAL: Mixkit 34091 "hands of a man in a suit doing a waiting gesture" (free licence) |
| 4 | Hand scrolling a phone (S5, «وين يطلع الزاير») | REAL: Mixkit 41165 "man answering a WhatsApp" |
| 5 | Man smiling at his phone (S8 payoff) | REAL: Mixkit 8778 "Arab man smiles while using mobile app" |
| 6 | Confused man at night (S9 «وما تدري ليش») | REAL: Mixkit 8843 "confused man in dark room stares at laptop" |
| 7 | Saudi businessman, 3 poses (wait / frustrated / happy) | Gemini 3 Pro Image on #00FF00, keyed with `engine/tools/key_cutout.py --grain --trim` |
| 8 | Iron weight, hourglass, magnifier, feather | Gemini on #00FF00, keyed the same way |
| 9 | Google Flow clips | NONE: Brave's remote-debugging approval lapsed, so Flow could not be reached from this session |

Pexels was blocked by Cloudflare in headless mode, so I used Mixkit (assets.mixkit.co direct MP4s).
Tafeil/Envato needs the owner's logged-in Brave, which had the same lapsed approval.

## Voice
- Script with full tashkeel and Gulf readings (`script-tashkeel.txt`); final case endings are sukun, not MSA tanween.
- Numbers are spelled «أربعة وثلاثين ميقا», «مية وأربعين كيلو».
- Pronunciation dictionary `djvkzVRsTDEzOOW3d7FN` with aliases for فورتشن كود / ميقا / كيلو.
- Generated sentence by sentence (`engine/tools/vo_sentences.py`), so one bad line can be redone with `--only N`.
- Takes:
  - A = eleven_v3 + tashkeel (line 11 regenerated after STT heard «مليار»);
  - B2 = eleven_multilingual_v2 + tashkeel + dictionary, speed 1.12, gap 0.16 s → USED (40.7 s);
  - C = eleven_v3 plain (control). It had errors: «الألقام», MSA «فحصًا مجانيًا», a truncated «مبطي».
- STT (scribe_v1) of A and B2 matches the script word for word. STT cannot check harakat or accent; the owner must listen.
- `audio/voice-takes-A-B-C.mp3` holds A, then B2, then C, with 1.5 s gaps.

## Build
HyperFrames 0.8.152, `template.tpl` → `build.py` → `index.html`.
- Font: the owner's Zain mob-long only, with Inter for Latin only.
- Text engine:
  - masked rise (2 f stagger, 10 f overlapping tweens);
  - green highlight boxes with a colour flip;
  - kashida tail reveal (clip-path, right to left);
  - selection box with handles, blinking cursor, dashed guides;
  - hand-drawn underline, circle and strike;
  - smear slam (3 f stretch + blur, then a 2-tween overshoot);
  - push-through exits; shared word «وش» across 3 questions and «نفس» across 2 lines;
  - liquid morph «٣٤ ميقا» → «١٤٠ كيلو» (SVG blur + alpha clamp + displacement);
  - anticipation + overshoot on hero words;
  - line auto-fit for the long tails.
- Collage engine:
  - pieces and camera stepped on twos (12 fps), seeded boil ±2 px / ±1°;
  - drop-ins back.out(1.6) settling at ±1-4°;
  - 3 drop shadows + a contact ellipse; torn scraps; tape;
  - grain tiles every 2 f;
  - 1-frame blur hits and a single 1-frame invert on «كيلو».
- Mix: 66 cues from the owner's SFX pack, then loudnorm → -14.4 LUFS / TP -1.5.

## QA and delivery (2026-11-06)
- qa.py: 1080x1920 at 30 fps, 40.83 s. -14.2 LUFS integrated, true peak -1.0 dBFS. No black frames, nothing held longer than 2.5 s, no dead air at the end.
- Loop is a WARN: first vs last frame SSIM 0.653. The film does not loop back.
- Audio fix: sfx.py mix is clipped to the voice length. I added 2 end cues, ran loudnorm, remuxed, and trimmed to 40.83 s.
- Desktop copy: `C:/Users/Mahmoud/Desktop/fortunecode-reel-005-gallery-weight-v2.mp4`.
- WhatsApp copy: `renders/gallery-weight-v2-wa.mp4` (13 MB).
- Sent from fc-system: video `3EB04760772766A34F9EFD`, voice takes A/B2/C `3EB046E8D3AB9C810F9C9D` (both PENDING at send).

## v3 (2026-11-06): the owner rejected v2's voice and mix
His words: «الصوت زبالة… متحطش أي تشكيل خالص، اعتمد على ذكاء الفن لابس بالكامل وإرشاداته» and «الموسيقى… زحمة… وفيه صوت تكات بطول الفيديو».

- **Voice:** plain Gulf text in `script-v3.txt`: no tashkeel, no dictionary, numbers as words, one 444-character request, stability 0.5, no tags (rules + URLs in knowledge/content-engine/06-voice.md).
  - Takes: V3 (eleven_v3, 34.0 s), used in the reel; ML (eleven_multilingual_v2, 35.4 s).
  - Both match the script word for word on STT.
- **Tick source:** `owner-pack-2026-11/text-sound-4-30218.mp3`, a 16.6 s typing loop with a periodic peak of 0.898 at 0.31 s. It was cued 7 times.
  `ui-processing-data-sequence…mp3` (12 s ticking progress loop) was cued twice. Together they covered most of the film.
- **Mix:** from 66 cues to 18, on real hits only:
  - weight slam ×2, cuts, man drop, «ويطلع», slab, «يخفف», dark world, gauge, notes, grid, forest, morph, 140 lands, payoff, CTA note, stamp;
  - no loops, no music bed.
- **Regularity check** (`engine/tools/tick_check.py`): v2 final had a periodic peak of 0.196 at 0.31 s; v3 final 0.048 (same as the voice alone, 0.049).
- **Re-sync:** S1 exits and the real-clip start times are now relative to word timings (build.py fills them). D = voice end + 0.45 s.
- **QA (v3 final):** 1080x1920, 30 fps, 34.50 s; -14.1 LUFS; true peak -4.5 dBFS; no black frames; no frames held; no dead air. Loop WARN (SSIM 0.656).
- **Desktop:** `C:/Users/Mahmoud/Desktop/fortunecode-reel-005-gallery-weight-v3.mp4`.
- **WhatsApp (fc-system):** video `3EB08CA0F1250B3540C289`, takes V3+ML `3EB0AF4E5C5556D53E0D96`.

## v4 (2026-11-06): safe zone, Gulf footage, smooth motion
Owner feedback on v3: (1) text and elements ignored the safe zones; (2) the non-Gulf Mixkit people (orange hoodie, dark room) must go; (3) the motion was «متكهرب أوي… مش smooth».

- **Safe zone (new HARD gate `engine/tools/safezone_check.py`, inside qa.py).** Before: 380 violating samples in 47 element spans (`renders/qa/safezone-baseline.txt`). After: 0 over 173 samples every 0.2 s. Proof: `renders/qa/safezone.json`, `renders/qa/safezone-sheet.jpg`.
- **Footage.** Mixkit 41165, 8778 and 8843 replaced by `assets/video/gulf-cafe.mp4` (S5), `gulf-happy.mp4` (S8), `gulf-wait.mp4` (S9): Gulf men in thobe and shemagh, Google Flow Omni clips made for reel 004 and reused (0 new credits; two new Flow calls failed with "Failed to fetch" before generating, nothing charged). Mixkit 34091 stays: hands and cuffs only, no face.
- **Smooth motion, pass 1 (v4 render):** camera at full fps with one 1.00 -> 1.03 eased drift per beat; boil only on paper scraps (±0.5 px / ±0.3°, every 7 f); drop-ins 0.6 s back.out(1.15) with a short 160 px fall; slams cut to 2 («٣٤», «ويطلع»); blur hits removed; one invert on «كيلو».
- **Smooth motion, pass 2 (render `gallery-weight-v5-final.mp4`, delivered as v4).** Measuring pass 1 showed it was not enough: up to 8 elements moving at once, 26 % of samples with more than 2, and many call sites still asking for 0.18-0.3 s exits, back.out(1.6-2.4) pops, a yoyo shake, 4-8 frame scale pops on check marks.
  - New HARD gate `engine/tools/motion_check.py` (inside qa.py): at most 2 motion events on any frame; pieces rest >= 0.6 s between moves.
  - Helpers now clamp: exitTo 0.38-0.45 s, slideIn >= 0.55 s, pushOut finishes inside 0.45 s.
  - Every scene leaves as ONE move (all pieces + its text, same instant, same tween); the next scene arrives as one group after that.
  - Removed: man's wobble, hourglass flip, «تخفف» shake, mag drift, H2/H10/H13 punches, 2nd crush + burst bump, check-mark pops (now fades), café clip slide (now a fade cut-in).
  - Text no longer crosses text: «معرض صور…» leaves while «ميقا» is said, so «عميلك» rises on a clear top; the forest/morph arrive only after the grid has left.
  - Result: 0 frames with > 2 events, 0 short holds over 1033 frames (1 moving: 649, 2 moving: 303, 0: 81).
  - Strips: `snap/v5m/strip-1-hook.jpg` (4.0-5.3 s), `strip-2-notes.jpg` (16.6-17.7 s), `strip-3-cta.jpg` (31.0-32.1 s); `renders/qa/s6-s7-transition.jpg`.
- **QA (`qa.py 005 renders/gallery-weight-v5-final.mp4`):** 1080x1920 @ 30 fps, 34.45 s, -14.4 LUFS, TP -2.1 dBFS, no end silence, no black or held frames, loop WARN (SSIM 0.718), safezone PASS 0, motion PASS 0, tick PASS 0.048.

## Owner checklist (v4 delivery, 2026-11-06)
Platform and layout
- PASS Safe zone: safezone_check 0 violating samples / 173 (before: 380 / 47 spans). `renders/qa/safezone-sheet.jpg`.
- PASS No text over faces: «جواله»'s tail touched the top of the man's shemagh in S2, so the man group was lowered and the man scaled 390 -> 360 px (clear gap, `renders/qa/s2-face.jpg` was the before). Rechecked on the safe-zone sheet (1 fps) and the 3 strips: captions sit above the man (S2), beside the clip frames (S8/S9), beside the CTA man.
- PASS 9:16 1080x1920 30 fps; frame 1 moves (weight already falling, impact at 0.26 s) and carries the hook word «معرض».
- PASS Nothing held > 2.5 s; no black frames; no dead frames (qa.py).
- PASS Motion smooth: motion_check 0 frames > 2 events, 0 holds < 0.6 s; camera full fps, one eased drift per beat, no shake; exits 0.38-0.45 s (clamped in exitTo/pushOut); no boil on text or people; entrances 0.55-0.6 s expo.out / back.out(1.15) (≈ 2-3 % overshoot); 2 smear slams («٣٤», «ويطلع»), 1 invert («كيلو»). Strips listed above.
Look
- PASS ROAR-style paper collage: cut-outs with shadows, torn scraps, tape; boil only on scraps.
- PASS (owner to judge) Nothing AI-glossy: real portfolio captures + Mixkit hands first; the man / weight / props are Gemini cut-outs on paper; the 3 Gulf clips are Google Flow Omni (reel 004), framed as desaturated polaroids. Source of every shot is logged above. These clips are AI video: if the owner reads them as AI, they are the first thing to replace (Tafeil/Envato needs his logged-in Brave).
- PASS People look Gulf/Saudi: thobe + shemagh in every shot with a face; the non-Gulf Mixkit clips are gone; hands clip shows cuffs only.
- PASS Brand colours only (#121416, #00DB33, #006A39, #F0F1F2); logo flat.
Text
- PASS Font: the reel's `assets/fonts/zain-mob-long.ttf` is byte-identical to `assets/brand/fonts/zain/alfont_com_zain-mob-long500.ttf` (md5 94838dc67ca21d2809e8ddb7a4a46cd8); Inter only for Latin.
- PASS Craft: overlapping cascades, hero 2-3× connectors, highlight boxes, kashida reveal (H6, H8, H17), shared word «وش» across 3 questions + «نفس», liquid morph ٣٤ ميقا -> ١٤٠ كيلو, selection box/guides/cursor, text on scraps, anticipation via soft punch.
- PASS Arabic joins intact (word-level tokens, never per-letter); dots not clipped (mask padding; checked on the sheet).
Voice and sound
- PASS Voice: plain Gulf text (`script-v3.txt`), no tashkeel, no dictionary, ElevenLabs guidance (06-voice.md); take V3 eleven_v3.
- PASS Accent stated as UNVERIFIED until the owner listens (STT matches the script word for word; STT cannot judge accent).
- PASS Gulf vocabulary: وش، يستنى، ويطلع، تدور، يخفف، مبطئ، الزاير، ترمش، خل (v5: «مبطئ» replaces «مبطي»).
- PASS No tick/loop: tick_check 0.048 (voice alone 0.049); 18 hit-only cues.
- PASS No music bed.
- PASS -14.4 LUFS, TP -2.1 dBFS, no end silence.
Script and facts
- PASS ROAR 7 beats + triple hook (falling weight + «معرض صور» on frame 1 + the spoken line).
- PASS One service (website performance) × one buyer situation (heavy gallery on a company site).
- PASS Numbers from FACTS / the approved November plan (34 MB -> 140 KB); no client named, the Taj card excluded.
- PASS CTA «اطلب فحص مجاني لموقعك» (still pending the owner's confirmation as the fixed CTA).
Delivery
- PASS This section filled, every line PASS.
- PASS Desktop: `C:/Users/Mahmoud/Desktop/fortunecode-reel-005-gallery-weight-v4.mp4` (= `renders/gallery-weight-v5-final.mp4`). WhatsApp from fc-system only, to the owner: `renders/gallery-weight-v4-wa.mp4` (crf 25, 11.6 MB), message `3EB0ED46AFDC738AB9ECE6` (PENDING at send), caption «نسخة معدّلة: كل الكلام والعناصر جوه منطقة الأمان».
- PASS Credits: Flow 0 (2 failed calls, not charged), Gemini 0 new, ElevenLabs 0 new for v4 (voice V3 reused).

## v5 (2026-11-06): «مبطئ» instead of «مبطي»
Owner: «مبطي دي مش سعودي، خليها مبطئ عادي».
- Script `script-v5.txt` (from script-v3.txt): «مبطي» -> «مبطئ» (وش اللي مبطئ الصفحة؟), «يبطي» -> «يبطئ», «مبطيه» -> «مبطئه». `grep بطي` = 0 in the script and the template.
- Voice: same settings as v3/v4 (plain text, no tashkeel, one paragraph, eleven_v3, clone hKxOF1e0PGHjtctJDcOl, stability 0.5, `vo.py takes B`). Three takes:
  - V5 (30.96 s): STT heard «مبطئ» for «مبطئه» -> rejected;
  - V5b (33.76 s): STT heard «يفتح» for «يفتحه» -> rejected;
  - V5c (34.32 s): STT differs only by normalisation (digits, Latin «Fortune Code», ميجا/ميقا, الزائر/الزاير) -> USED (`vo.py pick V5c 1.0`). Files: `audio/vo-V5c.*`, `audio/stt-V5c.json(.diff.txt)`.
- Re-sync: words and clip windows come from `audio/vo.json` via build.py; cues re-anchored to the new word times (`cues-v4.json` kept as the old set); mix loudnormed to -14.5 LUFS, padded to D = 34.77 s. Three holds that the faster lines shortened were fixed (S3 exit W(22)-0.24, mag +0.17, feather2 +0.07).
- QA (`renders/gallery-weight-v5b-final.mp4`): 1080x1920 @ 30 fps, 34.69 s, -14.5 LUFS, TP -2.1 dBFS, no end silence / black / held frames, loop WARN 0.718, safezone PASS 0 / 174, motion PASS 0 frames > 2 events, 0 short holds / 1042, tick PASS 0.065 (voice alone 0.073). On-screen check: `renders/qa/mubti-check.jpg`.
- The owner checklist above still holds line by line for v5 (same visuals; voice/vocabulary lines re-checked here).
- Delivered: Desktop `C:/Users/Mahmoud/Desktop/fortunecode-reel-005-gallery-weight-v5.mp4`; WhatsApp (fc-system, owner only) `renders/gallery-weight-v5-wa.mp4`, message `3EB034115510E348B6BB59` (PENDING at send), caption «نسخة معدّلة: مبطئ بدل مبطي». Credits: ElevenLabs 3 takes × ~444 characters + 3 STT checks; Flow 0; Gemini 0.

## v6 (2026-11-06): «والمعرض يفتح قبل ما ترمش» gets its own space
Owner screenshot (~25-26 s): only «والمعرض يفـ» showed; the line sat on the polaroid's bottom edge and the phone, and it was small.
Cause: the line was at y 1240 under higher-z pieces (vHappy bottom 1320, phone2 bottom 1248), auto-fit shrank it to one 820 px line, and «ترمش» only rose on its word.
- Layout: H14 moved ABOVE the photo/phone group (x 60, y 275, 900 wide) on a white torn scrap with tape, two lines: «والمعرض يفتح» 100 px / «قبل ما ترمش» 90 px + «ترمش» 150 px. vHappy y 560 -> 650, phone2 y 660 -> 760 (both inside the zone).
- Reveal: the whole line cascades in at the start of the sentence (W(62)); «ترمش» turns brand green (#006A39) when it is said. Full line on screen ~25.4-27.29 s (> 0.8 s before the exit). The circle/box was dropped: on the long-tailed «ترمش» it landed off-canvas.
- New HARD gate `engine/tools/overlap_check.py` (in qa.py): text glyph over a data-key image > 5 %, or a glyph at full opacity clipped below 85 % for > 0.3 s, fails. On v5 it found 5 spans (the three H14 words over vHappy for 1.3 s, «جواله،» over the man, «اللي» over the magnifier); all fixed (man y 612, magnifier 290 px at 630,845).
- Owner checklist: new line "Text never overlaps photos, phones, faces or cut-outs, and is never left half-revealed or clipped": PASS, overlap_check 0 spans / 348 samples; stills `renders/qa/s8-v6.jpg` (25.9 s and 27.2 s, the «ترمش» moment). Every other line as in v4/v5 (same visuals elsewhere, re-gated).
- QA (`renders/gallery-weight-v6-final.mp4`): 1080x1920 @ 30 fps, 34.69 s, -14.5 LUFS, TP -2.1 dBFS, no end silence / black / held frames, loop WARN 0.718, safezone PASS 0 / 174, overlap PASS 0 / 348, motion PASS 0 frames > 2 events, 0 short holds / 1042, tick PASS 0.065.
- Delivered: Desktop `C:/Users/Mahmoud/Desktop/fortunecode-reel-005-gallery-weight-v6.mp4`; WhatsApp (fc-system, owner only) `renders/gallery-weight-v6-wa.mp4`, message `3EB09AAD76F184665097A4` (PENDING at send), caption «نسخة معدّلة: سطر "والمعرض يفتح قبل ما ترمش" واضح ومش فوق الصور». Credits: none.
