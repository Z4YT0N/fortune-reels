# 018 Alum Aman reel, reel-006 style (halftone collage + teal ink + 006 kinetic type)

**Final:** `alumaman-collage.mp4`.
- 30.28 s, 1080x1920, 30 fps.
- Rendered at 120 fps, then tmix to 30 fps (real motion blur).
- AAC 256k; -14.3 LUFS, true peak -1.4 dBFS.

Owner approved the checkpoint 2026-11-08 («حلو فشخ»): script, voice W1, K0–K5 and the transition map.
NOT sent on WhatsApp; the orchestrator reviews and sends.

## v2 (owner 2026-11-08): wording changes
- «الشباك» → «النافذة» («سكرت النافذة،», «العيب بالنافذة.»); «نصنع بالأحساء» → «نصنع في مصنعنا بالأحساء».
- Applied in script.txt, the voice, the on-screen label, the dimension pill, the made-in label, `wa-cap.txt` (hashtag #نوافذ_ألمنيوم) and this note.
- No «شباك» is left in the text layer; the only mention is the template's changelog comment.
- Voice: X1 27.76 s, X2 27.60 s, X3 29.12 s (same clone and settings). **Picked X3**: no stretch, 2.03 words/s, «النافذة» 0.60 s, «بالنافذة» 0.75 s, «مصنعنا» 0.40 s, all heard right by STT.
  - X2 rejected: the hook question was read as a statement («داخل.»).
  - All three takes STT-read «في ألمنيوم» as «فيه ألمنيوم» (spelling of a Gulf «في»; W1 did not). Ear-check it.
- Re-anchoring (`warp.py`): old-clock times are mapped through the word starts (old word i → new i, or i+2 after «نصنع»). This covers `film.py` segments, `make_cues.py` cues, the template's absolute times (`T()`) and the word indices (+2 from 14).
  - Slam: IMPACT pinned to 4.71 (S2 impact frame at 4.707), on «ألمنيوم» (4.68).
  - Matte re-cut at 23.45 s for 2.55 s.
  - Segment speeds: S1 ×0.54 / ×1.23, S2 ×1.16 / ×0.49, S3 ×2.02 / ×0.54, S4 ×0.64, S5 ×0.68.
- Fit fixes: the made-in label moved 50 px left (it rested at x 999); the «داخل؟» echo stack tightened (3 copies) so it no longer hides «النافذة».
- v1 kept as `alumaman-collage-v1.mp4` (with `script-v1.txt`, `reel-v1.tpl`, `film-v1.py`, `make_cues-v1.py`, `audio/vo-v1.json`).

## Script (59 words), voice X3 (v2)
سكرت النافذة، والغبار داخل؟ العيب مو بالغبار، العيب بالنافذة. في ألمنيوم نظم أمان، نصنع في مصنعنا بالأحساء، ونركب بالشرقية، بالموعد المكتوب بالعقد. جودة تستاهل: زجاج مزدوج جارديان، سيليكون الماني، ومطاط يتحمل الشمس. وضمان مكتوب: عشر سنين على الألمنيوم، خمس على الصبغ، وسنتين على الاكسسوارات. وصيانة مجانية مدى الحياة. ترتاح انت، والغبار برا. تبني بيتك او ترممه؟ احجز معاينة مجانية.

- Voice: clone hKxOF1e0PGHjtctJDcOl, eleven_v3, stability 0.5, plain text, no tashkeel.
- 29.12 s, no time-stretch (v1 W1: 28.64 s).
- STT diffs are spelling and hamza only.
- «وربل» was cut: all three takes of the first script said "ribble".
- Takes and STT: `audio/`. Accent unverified until the owner listens.

## Picture (Flow, fd.mjs, project 12f3c7f0)
Keyframes K0–K5 (free Nano Banana Pro): see `keys/contact-sheet.jpg` and `keys/picks.txt`.

| Shot | Media | Keys | Credits | Verdict (12 fps strip `shots/Sx-strip.jpg`) | Used (`film.py`) |
|---|---|---|---|---|---|
| S1 | 75af3ae7 | K0→K1 | 15 | At src 0.58 the man's face swaps to another face as he leaves (morph). | src 0–0.5 (×0.5), then a cut to src 1.04, after he has gone. The cut is hidden by the gust and «والغبار» flying in. |
| S2 | 764fa740 | K1→K2 | 15 | Clean: the frame drops and slams, debris bursts, then it settles. | src 0.98–5.03. Impact (src 1.58) lands on «ألمنيوم» at 4.75. |
| S3 | 57c6ad00 | K2→K3 | 15 | Clean: a push, then a paper-tear cut into the macro. | Dive ×2, macro ×0.54. |
| S4 | 85da2401 | K3→K4 | 15 | The model handwrote "#0199a2" (the hex from my prompt) on src 0–2.2. | src 2.25–5.03 only. A re-roll without the hex returned no media twice; nothing was charged. |
| S5 | eb30dc8c | K4→K5 | 15 | Clean to src 2.85, then a double-exposure dissolve. | src 0–2.85. The night comes as a torn K5 paper sheet dropped by the type layer, with the bg cut to K5 under it. |

- Credits: 75 of 100. All 5 shots were charged 15 each; the two S4 re-roll attempts were not charged.
- Images were free; the daily image quota was hit while re-rolling K4.
- Lesson: never put a hex code (or any text) in a video prompt; Omni writes it into the picture.

## Type (reel.tpl; functions ported from 006 test.tpl; one move per line; the header lists them)
| Line | Move |
|---|---|
| hook label | paper wipe, `inkIn`, `snap` |
| «والغبار» | `fly` along the dust |
| «داخل؟» | `echoStack` |
| «بالغبار» | `blurIn` + marker strike |
| dimension pill | `typeOn` + caret |
| S1 label | knocked off by the falling frame |
| brand | zoom-out, jolted by the slam |
| two labels | `fly` + `hl` |
| contract scrap | stamp «المكتوب» (`over` + squash) |
| «تستاهل» | `kash` stretch |
| macro callouts | paper scraps with marker arrows |
| «ومطاط يتحمل الشمس» | bounces off the glass |
| warranty tag | `trails` + squash on the drop; ١٠/٥/٢ `slam` + `hl` + `typeOn` labels |
| «وصيانة مجانية» | zigzag feather fall onto the screwdriver doodle |
| «ترتاح» | `rows` behind the man (depth matte `assets/video/fg-man.webm`) + zoom-out |
| «والغبار» / «برا.» | «والغبار» curves out through the window; «برا.» lands on the glass |
| night | sheet drop |
| question strip | push-through |
| CTA | grows out of the window outline; `selBox` + cursor click |
| contact | isolated LTR runs |

Exits leave with the motion: blown out with the dust, knocked off, swallowed by the dive, dropped.

## Sound (`make_cues.py` → `cues.json`, `mix.py`, effects in `assets/sfx/` from `sfxgen.py` + owner pack)
- 65 cues, about 2.1 per second, each peak-aligned to its measured event.
- Hero hits bypass the duck: frame_slam + iron_impact at 4.75, the stamp at 9.10, the night sheet at 25.40.
- Storm bed (story in sound):
  - full and harsh until the slam (4.70);
  - then double low-passed at 420 Hz, quieter;
  - fades out 24.6–27.2 into a soft wind settle.
  - Stem check: high-band share 0.79 before the slam, 0.09 after.
- Ducked under the voice (sidechain). Loudnorm -14 / TP -1.5. tick_check peak 0.088 (clean). No music, no loops.

## QA run
- Entrance strips at 20 fps: `renders/qa/strip-*.jpg`, 22 entrances.
- Cut strips at 12 fps: `snap/cuts.jpg`. Full sheets: `snap/final-a.jpg`, `snap/final-b.jpg`.
- Safezone: FAIL by the tool's rule, on 14 single samples (13 spans), all words in flight; log `renders/sz.log`.
  - These are entrances from off-screen (fly, bounce, feather fall) and exits (the label knocked off, the dive).
  - Nothing at rest is outside x 60–960 / y 230–1440.
- Overlap: 0 text-over-image. The 10 "clipped" spans are the build-time hidden states before each word's entrance; each ends exactly at that word's entrance time.
- Fixed in the polish passes:
  - the tag never left the screen;
  - callout paper scraps were visible from frame 0 (blank paper);
  - macro labels were unreadable on the photo and on the black sill (now on paper scraps);
  - the brand zoom-out piled the words on each other (now one group);
  - the stamp covered «بالموعد»;
  - the end-card contacts collided with the window;
  - the WhatsApp number and @handle were reordered by bidi (now isolated LTR);
  - the third tag label was cut off by the drop;
  - right-edge safezone anchors;
  - overlaps between the maintenance, rest and tag lines;
  - the «ترتاح» rows ran on into the night dimming.

## Weak points (honest)
1. **S4 and S5 are slow.** Their clean parts are short, so the room pull-back runs at about ×0.7. The 24 fps source frames repeat (a slight "on twos" step). The tmix blur hides some of it, but not all.
2. **The window's shape changes.** K2 is a two-pane window; K4 and K5 are a single tall pane. The dive into the macro hides it, but a careful viewer may notice.
3. **The S1 man cut at 1.0 s is a jump cut:** the man vanishes, covered only by the gust and the flying word. There is also a paper reframe pop at about 2.9 s inside S1.
4. **«داخل؟»'s echo stack overlaps the hook label** above it for about 0.4 s. It is busy but readable.
5. **The «ترتاح» rows** cross the window and the wall as well as passing behind the man. The depth works (the matte is clean), but the frame is dense for about 1.3 s.
6. **I cannot listen.** The mix was checked by meters, stems, peak timing and a waveform, not by ear: the generated SFX character (storm, slam, coffee pour, screwdriver) is unverified. The coffee pour plays under «ترتاح», though the man only holds the cup.
7. **Tape colour:** the masking tape in the AI picture is tan, which edges toward the beige the brand avoids.
8. **The voice accent** is still unverified until the owner listens.

## Rebuild
```
python film.py              # shots -> assets/video/bg.mp4
python ../../engine/tools/matte.py assets/video/bg.mp4 22.9 2.5 assets/video/fg-man.webm
python make_cues.py && python mix.py 30.28
python build.py && npx --yes hyperframes@0.8.152 render --fps 120 --output renders/final-120.mp4
ffmpeg -i renders/final-120.mp4 -i assets/audio/mix.wav -filter_complex "[0:v]tmix=frames=2:weights='1 1',select='not(mod(n\,4))',setpts=N/30/TB[v]" -map "[v]" -map 1:a -r 30 ... alumaman-collage.mp4
```
