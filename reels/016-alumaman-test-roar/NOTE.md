# 016 Alum Aman test reel (ROAR, generated video): pitch sample for «ألمنيوم نظم أمان»

Their brand reel (their name and logo allowed; no FortuneCode logo or contact). Palette teal #0199a2 / #017a82 / #01b8c3,
ink #1d1d1d, near-black and raw concrete grounds, no gold, no beige. Font Thmanyah (Serif Display for hero/stress words,
Sans for labels). Facts only from `lib/business.js` (BRIEF "Allowed facts").

## Hooks considered (light Gulf, eastern-region friendly)
1. «شباكك يدخل عليك حر الأحساء، وغبارها؟» — concrete, local, names both pains in one picture. **PICKED.**
2. «ركبت شبابيك جديدة… وأول صيف رجع الغبار؟» — good story hook but slower, needs a second clause to land.
3. «الفني اختفى، والشباك صار يصفّر؟» — sharp, but it opens on the installer, not on the house; weaker for a homeowner who has not bought yet.

## Script (script.txt, 79 words)
شباكك يدخل عليك حر الأحساء، وغبارها؟ تعرف السالفة: فني رخيص، ركب وراح. فتحة صغيرة، وسيليكون ما يصمد، والموعد اللي وعدك فيه؟ تأخر. في ألمنيوم نظم أمان، كل شي مكتوب بالعقد. موعد التركيب، مكتوب، ونلتزم فيه. ضمان مكتوب: عشر سنين على الألمنيوم، خمس سنين على الصبغ، وسنتين على الاكسسوارات. وصيانة مجانية مدى الحياة، نضبط المفصلات والسحابات بدون تكلفة. وجودة تستاهل: زجاج مزدوج، سيليكون الماني، وربل يتحمل الشمس. نصنع بالأحساء، ونركب في المنطقة الشرقية. تبني بيتك او ترممه؟ احجز معاينة مجانية.

ROAR beats: hook (1) → usual story / pain picture (2) → turn «في ألمنيوم نظم أمان» (3) → the 4 guarantees as objects (4) →
made in Al-Ahsa + portfolio (5) → qualifier + CTA «احجز معاينة مجانية» (6). Refrain «مكتوب» ×3 ties the turn to the first two guarantees.
Brand names (Guardian, WACKER, EPDM) are on screen only; the voice says «زجاج مزدوج، سيليكون الماني، وربل».

## Voice
Clone hKxOF1e0PGHjtctJDcOl, eleven_v3, stability 0.5, plain Gulf, no tashkeel (`tts.py`, same settings as `engine/tools/vo.py` take B).
- T1 41.4 s: STT diffs spelling/punctuation only (سليكون, شيء, الإكسسوارات, أو). Brand «ألمنيوم نظم أمان» heard right, «وربل» heard right.
- T2 39.4 s: «وربل» heard «وريبِل». Rejected.
- T3 40.2 s: «أمان» heard «عمان» (brand name wrong). Rejected.
- T4 (T1 text with `speed: 1.2`): eleven_v3 ignored the speed (44.2 s), «وربل» heard «وريبول». Rejected.
- **Picked T1, time-stretched ×1.25 (atempo, pitch kept) → 33.1 s, 2.4 words/s.** STT of the stretched file: spelling-only diffs.
  ×1.30 was tried first: STT heard «فن» for «فني» and «الفصيلات» for «المفصلات», so it was rejected.
- Accent UNVERIFIED until the owner listens.

## Transition map (each beat causes the next; thread = the same Saudi homeowner + his window)
1. 0.0 K0 → S1: the man shields his eyes at an old yellowed sliding window, sand drifting in. Paper scrap «شباكك يدخل عليك / حر الأحساء، / وغبارها؟» is already dropping on frame 0 (kashida on «حـر», teal underline on «وغبارها؟»). The camera whip-pans down the frame to the corner.
2. 2.6 the whip carries the scrap off; a note «تعرف السالفة: / فني رخيص،» drops, «ركب… وراح.» pops and the note is yanked off-frame ("he left").
3. 4.95 K1 macro: the cracked silicone and the gap; tags «فتحة صغيرة» / «سيليكون ما يصمد» with drawn arrows to the crack, sand pours through.
4. 6.75 S2: the sand stream swells into a dust storm that swallows the frame; a calendar sheet «موعد التركيب / اللي وعدك فيه؟» drops and is stamped «تأخر»; the storm blows it away.
5. 8.62 one invert flash: the dust settles into the dark showroom studio (K2), the same man holding the contract. Brand «في / ألمنيوم / نظم أمان» smears in beside him, then «كل شي / مكتـوب / بالعقد.».
6. S3: he lays the contract on the concrete pedestal (K3). «موعد التركيب، مكتوب، ونلتزم فيه.»; the real date stamp presses and a teal imprint «مكتوب في العقد ✓» is left on the paper.
7. S4: the camera pulls back into the dark and slides to a receipt printer (K4); our receipt rises out of it line by line: ضمان مكتوب / ١٠ سنوات على الألمنيوم / ٥ سنوات على الصبغ / سنتان على الإكسسوارات.
8. The receipt is torn off as the camera rises (cut on motion, S4→S5) to a slim dark window: a technician's screwdriver on the hinge (K5). «صيانة مجـانية / مدى الحياة», tags «المفصلات» «والسحابات» with an arrow to the hinge, stamp «بدون تكلفة».
9. S6: the hand leaves, the camera pulls back to three pedestals (K6): double glass, a cut aluminium profile, silicone + EPDM. Teal starburst pops behind «جودة / تستاهل»; tags drop on strings: «زجاج مزدوج · Guardian 6 mm», «سيليكون ألماني · WACKER», «ربل EPDM · يتحمل الحر والشمس».
10. S7: the camera pushes into the glass pane and comes out in the evening majlis (K7): the same man by a new slim-frame window. Over the push, a fast montage of real Alum Aman photos drops as taped prints (showroom with their sign first), strip «نصنع بالأحساء، ونركب في الشرقية» + «الأحساء · الدمام · الخبر»; the prints blur away.
11. Before/after: a torn sheet of the K0 old window slides over the left half («قبل»), «تبني بيتك / او ترممه؟», the sheet rips off to the new window («مع أمان»).
12. CTA pill «احجز معاينة مجانية» rises, is pressed, and grows into the dark end card: logo, «احجز معاينة مجانية», «ضمان مكتوب حتى ١٠ سنوات», alumaman.com, WhatsApp +966 56 634 3386, Instagram @nozomaman.

## Picture (Flow, project 12f3c7f0)
Keyframes (Nano Banana Pro, free; 2 candidates each, picked by eye from `gen/sheet-*.jpg`). Man = generated portrait 71ca1dcc (uploaded as `assets/real/man-ref.png`, media 90f6f364) used as reference for K0/K2/K7; real Alum Aman product renders `win/2.webp` (d9bd2eb4) and `win/5.webp` (580bc170) used as references for K5/K7.
| key | media | what |
|---|---|---|
| K0 | 8bda9275 | man shielding his eyes at the old yellowed window, sand |
| K1 | 95b892cd | macro: cracked silicone, gap, sand, thermometer |
| K2 | 4777f388 | same man, dark studio, contract folder, pedestal |
| K3 | 0599b4c5 | contract + date stamp on the pedestal |
| K4 | b3a47eb5 | receipt printer on a pedestal |
| K5 | a75ad934 | technician's screwdriver on a slim window hinge |
| K6 | b94303cc | three pedestals: double glass, profile cut-section, silicone + EPDM |
| K7 | 0dafe01e | same man, evening majlis, new slim-frame window |

Shots (Omni frames-to-video, 5 s, 720p): S1 14f4473d, S2 a1b74389, S3 eaba4267, S4 c5eacd43, S5 4d292f8e, S6 bea19b05, S7 5cddf873 (re-roll).
- S1–S4 went through the Flow MCP UI (several picker timeouts, resubmitted). S5, S6 and the S7 re-roll went through `vendor/flow-direct/fd.mjs` (orchestrator's RPC tool).
- S7 first take 861ad539 (MCP) started from the wrong pedestal frame (Flow attached the other K6 candidate): discarded, re-rolled.
- S4 ended on the OTHER K4 candidate (round pedestal, not K4's square one): used 0–1.9 s (stamp + pull into the dark) and 1.9–5 s (printer printing) from S4 itself, then cut on motion to S5 at 1.7 s. So the S4→S5 join is a cut on motion, not a true chain.
- `film.py` + `shots.json` retime and concat to `assets/video/bg.mp4`; K7 is held under the end card from 30.4 s.

## Real photos in the montage (from `E:/fortune projects/almanyum-aman/public/images/`)
showroom `alumaman/about-img.png` (their real storefront with the sign), `alumaman/curtain-wall.jpg`, `alumaman/doors.jpg`, `win/5.webp`, `alumaman/skylight.jpg`, `alumaman/windows.jpg`. Skipped as AI/stock: `Gemini_Generated_Image_*`, `house*`, `hero-villa*`, `project/*`, `about/*` team portraits, `blog/*`.

## Sound
`mix.py`: VO + 80 SFX cues on visual events (owner pack, 006 pack, 015 print/flash, new ElevenLabs SFX `sfxgen.py`: sand, storm, screw, glass, stamp). No music bed. Mix -14.0 LUFS, peak -3.0 dBFS. `tick_check`: mix 0.061 vs voice-only 0.050 (no loop).

## Render
`python build.py` → `npx hyperframes render -f 60 -q standard -o renders/v60.mp4` → tmix pass + mux → `alumaman-test-roar.mp4` (35.01 s, 1080x1920, 30 fps, 60 MB). Desktop: `C:/Users/Mahmoud/Desktop/alumaman/2026-11-08-alumaman-test-roar.mp4`.

## Owner checklist
- Safe zone: PASS, `safezone_check` 0 violating samples over 175 (first run failed on the montage prints at their drop scale and on the sweep-out; prints were shrunk, the push-in clipped inside a frame, the exit changed to a blur-out).
- No text over faces: PASS by eye (`snap/keys-final.jpg`, `snap/st1..3.jpg`). The calendar and the brand block were moved after the first stills put them over his head (calendar now above him, brand in the left column).
- Text never over photos/cut-outs, never clipped: PASS, `overlap_check` 0 spans over 350 samples. (The check cannot see the video layer; positions placed from gridded bg frames, `snap/grid*.jpg`.)
- 9:16 1080x1920 30 fps, frame 1 moves and carries the hook (man in the glare + scrap dropping with «شباكك يدخل عليك»): PASS.
- Nothing held > 2.5 s, no black frames: PASS (blackdetect / freezedetect on the final: none). K7 is a held frame 30.4–31.4 s under live overlays and the camera push, then the end card.
- Smooth motion: PARTIAL, same as 015: no `motion_check` hook in this engine. Entrances 0.3–0.5 s expo/back(1.2), exits 0.3–0.4 s, 1 invert flash, 2 smear slams (brand lines). Overshoot back.out(1.2) on drops (a little over the 3 % rule on paper scraps).
- One continuous film: PASS except two joins: S4→S5 is a cut on motion (camera rising, receipt tearing away) and S6 has a quick in-shot morph from the window to the pedestals. Map above.
- Look: ROAR (real Saudi man, real props as metaphors on concrete pedestals, teal starburst, receipt, stamp, tape, torn split, invert flash), generated video, photoreal. PASS. Owner judges "AI-glossy".
- Brand: teal #0199a2/#017a82/#01b8c3, ink #1d1d1d, concrete, no gold, no beige: PASS (the old window in the hook is yellowed white on purpose: it is the "bad" window). Logo flat (`logos/logo.png`, reads on dark).
- Font: Thmanyah only (Serif Display Black for hero/stress words, Sans for labels and Latin): PASS.
- Arabic joins intact (whole-word nodes; kashida grows inside one string): PASS by eye on stills.
- Voice: plain Gulf, no tashkeel. Accent UNVERIFIED until the owner listens. Voice is T1 time-stretched ×1.25.
- Numbers only from the allowed list (10/5/2 warranty, Guardian 6 mm): PASS. No experience years, no project counts, no rating, no discount, no temperatures.
- FortuneCode logo/contact absent; their contact on the end card (alumaman.com, +966 56 634 3386, @nozomaman), CTA «احجز معاينة مجانية»: PASS.
- SFX on events, no loop, no music, -14 LUFS: PASS.
- Delivery: WhatsApp fc-system → owner only, sent once each: media (CRF 27 preview, 10.5 MB) 3EB0C6BEEC8D3A333000D2, document (CRF 21 copy, same name, 35 MB, because the original is over 40 MB) 3EB0F06FA63ADDD1EFCC21. Same steps as `wa_deliver.sh`, run by hand so the message IDs were visible (the script greps them out).

## Credits
- Flow images: about 18 (free).
- Flow video: 8 Omni shots generated. flow-direct summary (exact): S5 15, S6 15, S7 re-roll 15 = 45. MCP route (quote not printed, capped at 16 each): S1, S2, S3, S4, S7 first take (discarded) ≈ 75. **Total ≈ 120 credits** (≤ 125), under the 160 budget. Account balance is shared with other agents, so the balance delta is not mine alone.
- ElevenLabs: 4 TTS takes, 6 STT checks, 5 SFX generations (one more refused: 0.4 s below the minimum, nothing charged).

## Weak points (honest)
- The "real portfolio" montage: only the showroom photo (`about-img.png`, their sign) is clearly their own. `curtain-wall.jpg`, `doors.jpg`, `skylight.jpg`, `windows.jpg` look like stock (UK houses, a garden); `win/5` is a product render. Owner should confirm or send real project photos; then the montage is a 5-minute swap.
- S4→S5 is a cut on motion, not a chain (Flow attached the other K4 candidate as S4's last frame). The receipt tears off across the cut, but for a few frames a square pedestal edge is visible where the round one was.
- S6 changes from the hinge to the pedestals with a short in-shot morph (Flow's interpolation), about 0.4 s.
- The voice is stretched ×1.25 to hit 35 s; listen for pace.
- The montage prints and the before/after tear are fast (≈0.45 s per print); some viewers will not read the city line.
- «تستاهل» kashida touches the starburst edge; dark on teal reads, the tips sit on the dark ground.
- The man is a generated (not real) Saudi homeowner; the hook window/dust is generated too.

## Wording that needs the owner's OK
- «كل شي مكتوب بالعقد» (the brief says the installation date and the warranty are written with the contract; "everything" is a slight generalisation).
- «ونركب في المنطقة الشرقية» / screen «الأحساء · الدمام · الخبر» (from business.js area_served + brief).
- «ربل EPDM يتحمل الحر والشمس» (brief: EPDM that resists heat and sun).
- Caption mentions «المسكات» (handles) from the maintenance fact; the voice says hinges and slides only.
