# 014 Nov 14 reel, ROAR style: security audit before launch (14 issues found and fixed)

Voice, words and script reused from `reels/010-nov14-security-audit/` (take B2 at 1.1x, 26.92 s, STT checked there).
Picture = generated video (Flow Omni frames-to-video, chained keyframes) per the owner's 2026-11-07 update; HyperFrames
type/overlay layer on top; end card in HyperFrames.

## Transition map (each shot causes the next)
| shot | voice | K start -> K end | what happens |
|---|---|---|---|
| S1 | 0.00-5.09 «فحصنا… لقينا ١٤… شكله جاهز والزر جاهز» | K0 -> K1 | dark studio; the magnifier's beam sweeps the laptop on the concrete pedestal and finds paper flags; the magnifier slides out, the lights come on: the owner stands proud beside the laptop with the green launch button |
| S2 | 5.09-7.20 «بس احنا ما نطلق شي قبل ما نفحصه» | K1 -> K2 | a giant padlock drops onto the laptop; the owner flinches, hand on chin |
| S3 | 7.20-12.0 «وش يشمل الفحص؟…» | K2 -> K3 | the lights go down, the magnifier returns, its beam reveals the flags taped all over the pedestal |
| S4 | 12.0-16.95 examples + «هذي أمثلة» | K3 -> K4 | slow push in under the beam; example notes (overlay) drop in the dark upper third, stamp «أمثلة» |
| S5 | 16.95-19.15 «صلحنا الاربعتعش وحدة وحدة» | K4 -> K5 | the lights come on; green tape lands on each flag; the counter overlay counts to ١٤ |
| S6 | 19.15-21.3 «وبعدها بس انفتح زر الإطلاق» | K5 -> K6 | the padlock springs open and falls; the screen glows green; the owner raises his fist; invert flash on «انفتح» |
| end | 21.3-28.2 | HyperFrames | the green screen swells into the deep-green end ground; CTA note «اكتب انطباع بالتعليقات», logo, url, phone |

Threads: the laptop on the pedestal (S1-S6), the owner (S1-S2, S5-S6), the magnifier (S1, S3-S4, end overlay), the padlock (S2-S6), the counter note overlay (S1, S5).

## What was actually built (2026-11-07)
- Final: `nov14-security-roar.mp4` (1080x1920, 30 fps, 28.22 s, -14.3 LUFS, peak -2.6 dBFS, 0 black frames). Stills: `snap/final-sheet.jpg`.
- Keyframes (Flow Nano Banana Pro, refs = the chroma plates in `assets/cut/gen/`): K0 820dc6be, K1 56e521fe, K2 1d50fb1b, K3 667bc5cc, K4 c6c05937, K5 178980dd, K6 e5e3157e (`flow/K*.png`, ids in `flow/ids.json`).
- Shots (Flow Omni 1.2 Flash, frames-to-video, 720p): S1 K0->K1 7b096d37 (5 s), S2 K1->K2 81144cb5 (4 s), S4 K3->K4 55c61ec8 (5 s), S5 K4->K5 70a1f38f (4 s), S6 K5->K6 bcb11ab3 (5 s).
- S3 (K2->K3) was never generated: Flow's ingredient picker matches images by caption and the captions are truncated with a broken character (and two K2 candidates share one caption); uploaded copies were not found by name either. Bridge instead: the overlay closes a flashlight darkness on the padlock (6.9-7.55 s) and the film cuts to S4 under it; S4 then plays forward (7.6-12.6) and reversed (12.6-16.78).
- `assemble.py` retimes to the voice (S2 impact at 5.53 s vs «نطلق» 5.59; S6 shackle opens 20.04 vs «انفتح» 20.17) and desaturates the warm "lights switching on" frames (S1 2.7-3.75, S5 start) so the paper stays grey, never beige.
- Overlay `roar.tpl` (build.py -> index.html): hook «فحصنا» + tag, counter note ٠->١٤, «الموقع / شكله جاهز», «والزر جاهز» tag with a drawn arrow to the button, «ما نطلـــق» kashida + scrap «قبل ما نفحصه», «وش يشمل الفحص؟», six example notes labelled «أمثلة» + «N من ٦» dropping one on another, marker under «تفضح», stamp «أمثلة» + «من اللي نراجعه», «صلحـنا» + counter ٠->١٤ «من ١٤» (synced to the green tape in the film), «انفتح» slam + 1-frame invert, «زر الإطلاق», the green screen swells into the deep-green end card: logo, «عندك موقع / قريب ينطلق؟», CTA note «اكتب انطباع بالتعليقات» with the magnifier, «ونرسل لك انطباع أول عن موقعك مجانًا», www.fortunecode.org · +20 10 98066484.
- Credits: Flow images free (8 plates + 7x2 keyframes); Flow video 5 shots ≈ 69 credits (5 s = 15, 4 s = 12); ElevenLabs 0 (voice reused from 010).

## Owner checklist (rules/owner-checklist.md + BRIEF.md)
- PASS safe zone (own probe, `renders/sz.js`, every 0.2 s, every visible text box): no resting text outside x 60-960 / y 230-1440; the only hits are in-transit frames (notes dropping from above, the two slams, one exit scale). Repo `safezone_check`/`overlap_check`/`motion_check` NOT run: they need the `.tk .w` text hooks this engine lacks (same as 010).
- PASS no text over faces: type lives in the empty upper third; example notes sit right of the man's head (x ≥ 440); checked on `snap/final-sheet.jpg`.
- PASS 9:16 1080x1920 30 fps; frame 1 moves (beam already sweeping) and carries «فحصنا».
- PASS nothing held > 2.5 s; film moves throughout; 0 black frames (blackdetect).
- PARTIAL smooth motion: entrances 0.3-0.55 s, exits 0.38 s, 2 smear slams («وش يشمل الفحص؟», «انفتح») + stamp, 1 invert flash. Not measured by motion_check.
- PASS one continuous film: transition map above; each shot is frames-to-video from the previous shot's last keyframe; the S2->S4 join is hidden by the flashlight darkness.
- PASS ROAR look: real Saudi owner, concrete pedestal, padlock, magnifier, paper notes, tape, stamp, invert flash, grey paper / dark ground / deep green. Generated photoreal (Flow), not illustration.
- PASS brand colours (#121416, #00DB33, #006A39, #F0F1F2); logo flat. Warm frames desaturated.
- PASS fonts: Zain mob-long hero words, Plex labels/tags/CTA/url, Inter for Latin.
- PASS Arabic joins intact (whole-word nodes), checked on stills.
- PASS voice: reused 010 take B2 (plain Gulf, no tashkeel, STT-checked in 010). Accent UNVERIFIED until the owner listens.
- PASS SFX on events: 56 hit cues over 28 s, no loop, no music bed, -14.3 LUFS.
- PASS facts: only "14 issues found and fixed"; categories shown as «أمثلة» + voice «هذي أمثلة من اللي نراجعه». No client name or logo.
- PASS contact www.fortunecode.org + +20 10 98066484, CTA «اكتب انطباع بالتعليقات».
