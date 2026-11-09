# {{NNN}} {{TITLE}} (collage reel, brand `{{BRAND}}`)

**Final:** `{{SLUG}}.mp4` (not made yet).

## Gates
- [ ] `brand_lint.py` PASS (script, captions, on-screen text)
- [ ] **GATE 1 (checkpoint):** script + chosen take + keyframe contact sheet + transition map + move per line sent to the owner. His words and date:
- [ ] Video credits spent only after GATE 1 (shots, credits, verdict per shot below)
- [ ] QA: entrance strips (20 fps), safezone, overlap, whole reel watched with sound
- [ ] **GATE 2:** final sent to the owner (media + document). His verdict and date:

## Script (N words), voice take
- Take picked and why (duration, words/s, STT diffs, words that flip meaning):
- Accent: unverified until the owner listens.

## Picture (Flow, fd.mjs)
| Shot | Media | Keys | Credits | Verdict (12 fps strip) | Used (`film.py`) |
|---|---|---|---|---|---|

## Type (reel.tpl; one move per line)
| Line | Move |
|---|---|

## Sound (`make_cues.py` -> `cues.json`, `mix.py`)
- Cues per second, hero hits, the bed story, loudness (target -14 LUFS, TP -1.5):

## QA run
- Strips, safezone, overlap, what was fixed:

## Weak points (honest)
1.

## Rebuild
```
python film.py                    # shots -> assets/video/bg.mp4
python ../../engine/tools/matte.py assets/video/bg.mp4 <start> <dur> assets/video/fg-man.webm
python make_cues.py && python mix.py
python build.py && npx --yes hyperframes@0.9.20 check && npx --yes hyperframes@0.9.20 render --fps 120 --output renders/final-120.mp4
ffmpeg -i renders/final-120.mp4 -i assets/audio/mix.wav -filter_complex "[0:v]tmix=frames=2:weights='1 1',select='not(mod(n\,4))',setpts=N/30/TB[v]" -map "[v]" -map 1:a -r 30 -c:v libx264 -crf 16 -c:a aac -b:a 256k {{SLUG}}.mp4
python ../../engine/tools/brand_lint.py .
```
