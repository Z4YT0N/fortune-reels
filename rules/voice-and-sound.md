# Voice and sound

## Voice-over
- Voice: Abdulrahman, ElevenLabs `KfYUTAF49N2CPU3iKuMi` ("Energetic Najdi Saudi Ads").
- Owner's current pick: take **B** = `eleven_v3`, stability 0.5, NO audio tag (picked 2026-10-27
  and again 2026-10-29).
- Accent risk: `eleven_v3` WITH an audio tag (`[excited]`, `[confident]`) drifted to an Egyptian
  accent on 2026-10-15. Never add a tag without a fresh listening test.
- I cannot hear audio, and speech-to-text checks words, not accent. So: generate takes
  (`vo.py takes A B`), send them to the owner, let him pick, and say plainly on every delivery
  that the accent is unverified until he has listened. Never ship an unheard voice setting.
- Script text for TTS: one paragraph, numbers written as Arabic words, English terms in English.
- Speed-up: `vo.py pick B 1.12` (ffmpeg atempo) when the take runs long. Keep 1.0-1.15; above
  that the voice sounds rushed. Every timeline time in the template is in ORIGINAL VO seconds and
  is divided by the speed (`at()`).

## Sound design
- One mixed track per reel (`assets/audio/mix.mp3` from `sfx.py mix`): voice + effects (+ bed).
- An effect on every cut, impact, pop and counter (30-40 cues in a 45 s reel worked). Effects
  sit under the voice (volume 0.3-0.6).
- Library: generated effects in `assets/sfx/` (prompts in `engine/tools/sfx_library.json`), plus
  stock packs in `assets/sfx-library/` (motionix, saas, vint). More packs:
  `E:\Library\01-Workspace\Fortune\fortune-promo\sfx-pack\` (office, action-hits, footsteps, vintage).
- Music bed is optional and quiet (-24 dB under the voice). Ask the owner before adding music.
- Targets (qa.py): about -14 LUFS integrated, true peak <= -1 dBFS, no dead air at the end.
