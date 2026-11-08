# 07. Sound

## Owner's SFX pack (2026-11-06)
Source: the owner's Google Drive zip (`1isCf7jMDyy21_T2DAWIvaUHFwbzRVIF_`). It has 114 files (112 mp3, 2 wav),
108 unique after duplicates. Extracted to `assets/sfx-library/owner-pack-2026-11/` (git-ignored like the
rest of `assets/sfx-library/`). Use it first.
Contents by family:
- pops and bubbles (plop, sharp pop, soft UI pop, multi pop, marimba bloop);
- clicks (mouse, iPad, button, confirm tap, keyboard typing);
- swooshes and whooshes (several, plus a quick double swish and a whoosh arrow start);
- UI and notifications (iPhone message sent, notification pluck, bright notification, error, acceptance);
- sci-fi (sci-fi sfx 1, 2, 4, 7, 13), glitch transitions, processing-data sequence;
- shine and sparkle, flip card, rope creak, sonar ping, flowing water;
- one "Clash Royale king cry" meme sound, one gorilla, a TikTok drop click;
- one music track: "nightfall future bass".

## How sound is used (from references and rules)
- An effect on every cut, impact, pop and counter: 30-40 cues in a 45 s reel.
- Place each SFX by its measured peak (argmax of the waveform), not by the file start (howseen skill).
- Keystroke sounds follow the exact rhythm of the typing animation.
- Music: low under the voice ("in the back of the mind"), ducked about 9 dB, or -24 dB as a bed.
  Ask the owner before adding music.
- Targets: about -14 LUFS integrated, true peak <= -1 dBFS, no dead air at the end.
- Premium/minimal films use fewer, softer hits. Remove anything loud or out of place.
- Find the music drop by band energy, never by an auto beat grid, and put the drop on the key visual moment.

## From the editing study (2026-11-06, Joseph | Video Editing, sound design; The Nicks Edit)
- A whoosh on every move, its peak on the fastest frame. Clicks on text, a highlighter sound on line draws, data sounds on charts, and one click per hard cut.
- Plan risers and hits from the script: a riser (about -10 dB) peaks on the payoff, and a hit lands on the realisation line.
- Music: the drop lands on the strongest line. The music runs 2-4 s after the last line. End on a line that loops back to the hook.
- Second pass still to study (transcripts were blocked): Logan Smith, Learn By Leo, 2× Kallaway, Herman Huang, "why reels die" ×2, Inside The Edit (B-roll), and Modern Millie's "20 reels in 1 hour" (https://www.youtube.com/watch?v=1FfxkrCoTOw). The list is in 01-editing-retention.md. Use the yt-dlp audio + ElevenLabs STT method.
