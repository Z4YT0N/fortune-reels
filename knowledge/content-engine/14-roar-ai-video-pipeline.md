# 14. ROAR reel with Flow AI-video scenes (pipeline, 2026-11-07/08)

Mirror of the global skill reference `~/.claude/skills/fortune-content-engine/references/roar-reel.md`. The full style spec is `content/2026-11-first10/ROAR-STYLE.md`. Keep both copies in sync: edit the skill first, then copy it here.


**Owner, 2026-11-07:**
- «اعمل باقي الريلز بستايل روور مش ستايل الشو ريل».
- «متنساش انك تجنريت المشاهد كلها… اعتمد عالفيديو جنريشن علشان بيدي واقعية أكثر زي ما عملنا في أول ريل بالظبط».

**Full spec:** `content/2026-11-first10/ROAR-STYLE.md`.

**Look at these frames first:**
- `research/refs-2026-11/sheets/txt-roar.jpg`;
- `research/refs-2026-11/sheets/txt-roar5.jpg`.

**Working examples to copy:**
- `reels/013-nov09-roar/`;
- `reels/014-nov14-roar/`;
- `reels/015-nov16-roar/` (the cleanest: `gen/run_vid.py`, `shots.json`, `film.py`, `roar.tpl`, `beats.js`, `build.py`, `mix.py`, `NOTE.md`).

## The look (ROAR in Fortune colours)
- **Ground:** textured light-grey paper #F0F1F2, OR a flat dark #121416 or deep-green #006A39 ground. One accent, #00DB33. No beige, no maroon.
- **Cast:** a real Saudi/Gulf man (thobe, shemagh) as the business owner.
  - It is always the SAME man. Upload `assets/cut/man-happy.png` (reels 005/006) as the Flow reference.
- **Props:** oversized real props used as metaphors:
  - a concrete pedestal, a receipt printer, a magnifier, a padlock, a scale, a stopwatch, weights and chains;
  - a crate, a film reel, shears, a feather, a velvet armchair, a hourglass.
- **Finish:** photoreal, not illustration, not glossy AI.
- **Collage devices on the overlay layer:**
  - a green starburst behind the hero;
  - a torn split frame;
  - paper notes and receipts that drop in with rotation and overshoot;
  - tape and a stamp;
  - a 1-frame INVERT flash on a beat (`filter: invert(1)` on the stage);
  - a flashlight-beam wipe.
- **Type:**
  - small to medium and bold, sitting RIGHT ABOVE the object it talks about;
  - word by word on the spoken frame (blurIn ~3 frames or a 2-frame smear);
  - kashida on the stress word.
- **Avoid** (the showreel look): flat UI cards and pills on a plain ground, orbiting tiles, a 3D phone mock as the hero. A phone may appear only in a person's hand.

## Pipeline
1. **Script and voice first.**
   - Write `script.txt`, then make 3 takes with `engine/tools/vo.py`.
   - Run STT on each take, diff it, and pick one. Set D = VO + about 1.3–2 s.
2. **Transition map** in `NOTE.md`: beat by beat, how each object causes the next, plus the thread object.
3. **Keyframes K0..Kn**, one per beat boundary. Generate them with `vendor/flow-direct/fd.mjs gen` (free images, parallel; the media ID is the file name). Use the MCP below only to upload LOCAL reference photos:
   - Use Flow Nano Banana Pro (free) and make 2 candidates each. Pick by eye from a contact sheet.
   - Example call:
     ```
     bash vendor/flow-locked.sh flow_agent_generate '{"project_id":"12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36","kind":"image","prompt":"...","aspect":"9:16","download_dir":"<abs>/gen/K0"}'
     ```
   - Write the prompt in a file and build the JSON in Python. Do not hand-quote Arabic or long prompts.
4. **Shots S1..Sn:** submit all shots in ONE `fd.mjs gen` call (`att` = [Ki, Ki+1] media IDs, `maxCredits` 16, `--par 4`; prompt pattern in `vendor/flow-direct/README.md`). It is about 2 min per shot, in parallel. MCP fallback: Flow Omni frames-to-video, 5 s, 720p, `start_image_id` = Ki, `end_image_id` = Ki+1, `max_credits` 16, `wait:false`.
   - Add this suffix to every shot prompt: "One continuous camera move, no cut, no scene change, keep the exact look, colours, paper texture and lighting of the two frames; real photographic studio footage, natural physics, no text, no letters, no morphing faces."
   - Submit all shots in parallel (3 slots). Then poll `flow_video_status` and download with `flow_download_media`.
   - Look at a strip of each shot (12 frames) before using it.
   - **Budget:** about 6 shots × 12–16 credits. Never go over 120 credits per reel without reporting it. Report the credits used.
5. **Background film:** `film.py` reads `shots.json` (file, in, out, target seconds), retimes and concats, and holds the last frame to D.
   - Output: `assets/video/bg.mp4`, 1080x1920, 30 fps, `-g 30`.
6. **Overlay:**
   - `roar.tpl` + `beats.js` hold the positions (`pos` in `shots.json`), placed from gridded frames of bg.mp4.
   - `build.py` fills `__D__` and WORDS into `index.html`.
   - Use frame-baked `TL.set` and `window.__timelines["main"]`.
7. **Sound:**
   - `mix.py` places the VO plus about 50–60 SFX cues: paper, tape, impact, print, whoosh, snip, flash.
   - Use the owner pack `assets/sfx-library/owner-pack-2026-11/` first. Generate new ones with ElevenLabs SFX if needed.
   - Run loudnorm to -14 LUFS, true peak ≤ -1 dBTP. Output: `audio/mix.mp3`.
8. **Render:**
   ```
   npx hyperframes render -f 60 -q standard -o renders/v60.mp4
   ffmpeg -i renders/v60.mp4 -i audio/mix.mp3 -filter_complex "[0:v]tmix=frames=2:weights='1 1',select='not(mod(n\,2))',setpts=N/30/TB[v]" -map "[v]" -map 1:a -r 30 -c:v libx264 -crf 18 -pix_fmt yuv420p -g 30 -c:a aac -b:a 192k -shortest -movflags +faststart final.mp4
   ```
9. **QA:**
   - Run `engine/tools/safezone_check.py` and `overlap_check.py`. Both check only the type layer, not the video.
   - Check stills: serve the folder (`python -m http.server <port>`), then in agent-browser run `eval "window.__timelines.main.seek(t)"` and take a `screenshot`.
   - Check: no text over faces, Arabic joins intact, the contact details, no client names.
   - Write `NOTE.md`: script, takes, keyframe and shot media IDs, transition map, checklist with PASS/FAIL, weak points.

## Known traps
- **HyperFrames 0.9.20:** do NOT use `--start`, because it stalls. Render the full reel.
- **Flow:**
  - Flow sometimes attaches the wrong first frame (015 S2). Trim it and cut on motion, and say so in the weak points.
  - Sometimes frames-to-video cannot find the frames, or a job fails with code 4. Resubmit once. If it fails again, use image-to-video from Ki and cut on motion, or a reverse playback (014).
  - A dissolve is a fallback, not a chain. Name it as a weak point.
- **Text:**
  - Dropped text must leave the frame: y 1800 plus autoAlpha 0. A hidden element must start with `autoAlpha 0`.
  - Never span a tween all the way to D by mistake.
- **SFX paths are relative.** After moving or copying a reel folder, fix the `../../assets/sfx-library/` paths.
- **Kling credits are 0** and the Gemini monthly cap was reached (2026-11-07), so Flow is the generator.
