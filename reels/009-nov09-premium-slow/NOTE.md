# 009 — Nov 9, 8 PM, Instagram: «هل لازم الموقع الفخم يكون بطيء؟»

Engine copied from 008 (showreel.tpl + ext.js, build.py, mix.py). Voice: take B1 (eleven_v3, clone hKxOF1e0PGHjtctJDcOl), trimmed 0.2 s, atempo 1.08 → 28.42 s; D = 30.22 s. Take B2 kept in audio/. Both STT-clean (scribe_v1, files audio/*.stt.txt), every number read right.

## Hooks
| Hook | Formula | Score |
|---|---|---|
| «الموقع الفخم لازم يكون بطيء؟ لا.» | myth question + contrarian snapback | 82 (picked: key word first, one-word «لا» snap) |
| «يقولون لك: يا فخم يا سريع.» | "they say" myth | 66 |
| «ثري دي، صور، حركة… وموقعك يفتح على طول؟» | list + surprise | 58 |

## Transition map (one film)
1. Hook text over the SCALE (thread object): left pan = premium site, right = speed bolt. «الفخم» kashida stretch, «بطيء؟» slow kashida, cursor stamps green «لا.» slab.
2. Weights (CSS 3D cube, photo, motion badge) drop on the left pan, beam sinks per drop; each label leaves its weight on a curve to the right column. Trails sweep on «في كل مكان».
3. Bubble «يقولون لك:» + segmented toggle فخم|سريع; cursor drags to سريع, knob springs back.
4. Selection box lifts the luxury off — the pan stays down. A tangle draws on the pan = «الشغل اللي ما انضبط» (crooked word + misaligned guides). The tangle snaps the string, the pan falls, the camera follows it down into the dark world.
5. Dark: «Google تقول:» tag, stopwatch the cursor starts (0→3), ٥٣٪ counter, 100 visitor dots, 53 leave. Source on screen: Google / DoubleClick، ٢٠١٦.
6. A kettlebell «معرض صور ٣٤ ميجا» crashes in and knocks B5 out; cursor clicks it, it morphs into a green chip «١٤٠ كيلو» that floats up and parks.
7. Video card on a curve, cursor plays it, «٢ ميجا» struck → «٦١٣ كيلو».
8. Cursor flicks the dark world away: the same scale, now balanced. «نفس الفخامة، ونفس الجودة» , «على طول.» smear slam + bolt zap.
9. «موقعك ثقيل؟» drops heavy (beam dips), comment bar types «انطباع», send → end panel (logo, CTA, www.fortunecode.org, +20 10 98066484).

## Owner checklist
- Safe zone: custom DOM probe every 0.25 s — only hits are mid-entrance (zoom/slam/fall/knock-out) and full-width centred footer containers. PASS (not the engine's safezone_check: this template has no .tk/.w glyph classes).
- 1080×1920, 30 fps final with tmix motion blur; frame 0 carries «الموقع» + the scale. PASS.
- No client names/logos; facts only from BRIEF (34 MB→140 KB, 2 MB→613 KB, Google 53 %/3 s with source). PASS.
- Fonts: Zain mob-long hero, IBM Plex connectors/UI/buttons. PASS.
- Voice: plain Gulf, no tashkeel, numbers spoken («اربعه وثلاثين ميجا», «ميه واربعين كيلو», «اثنين ميجا لستميه وتلطعش كيلو», «ثلاثه وخمسين بالميه»). Accent UNVERIFIED until the owner listens.
- SFX 79 cues on visual events, no bed; tick_check peak 0.058 (VO alone 0.074). Mix −14.2 LUFS, true peak −3.4 dBFS. PASS.
- CTA «اكتب انطباع بالتعليقات» + new number. PASS.
- Credits: ElevenLabs 2 TTS takes + 2 STT calls. No Flow/Gemini images (reused 008 photos t1, t2, t5).
