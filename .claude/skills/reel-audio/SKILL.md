---
name: reel-audio
description: Voice-over takes (ElevenLabs, Abdulrahman), speed-up, sound-effect cues and the final mix for a Fortune Code reel. Use at stages 4 and 8 of the reel engine or for any voice/SFX/music change.
---

# Reel audio

Rules: `rules/voice-and-sound.md`. Tools read the ElevenLabs key themselves; never print it.

## Voice
```bash
python engine/tools/vo.py <reel> takes A B        # A = multilingual_v2, B = v3 no tag (owner's pick), C = v3 + Najdi tag
python engine/tools/vo.py <reel> pick B 1.12      # writes assets/audio/vo.mp3 sped up + audio/vo.json
```
- Report each take's length and words/s. Send the MP3s to the owner (SendUserFile) when the
  setting is new or the script style changed; otherwise use B and still flag the accent as unheard.
- Pick a speed that lands the reel at 40-48 s; stay within 1.0-1.15.
- After a pick, re-run `captions.py` (timings changed) and re-check every shot time.

## Effects
- Write `cues.json` from SHOTS.md: `[[orig_seconds, "name", volume], ...]`. One cue per cut, impact,
  pop, counter, whip. 0.3-0.6 volume, never over the voice.
- Names: `engine/tools/sfx_library.json` (generated, shared in `assets/sfx/`), or a stock file path
  under `assets/sfx-library/` (`motionix/Pop/...`, `saas/...`, `vint/...`). New sound: add a name +
  English prompt + seconds to the library JSON, then `sfx.py <reel> gen`.
```bash
python engine/tools/sfx.py <reel> gen
python engine/tools/sfx.py <reel> mix   # -> assets/audio/mix.mp3, the reel's only audio track
```
- Optional bed: `"bed": {"file": "sfx-library/...", "volume": 0.08}` in reel.json, only with the
  owner's yes (open question in memory/DECISIONS.md).
- QA checks loudness (~-14 LUFS) and end silence after render.
