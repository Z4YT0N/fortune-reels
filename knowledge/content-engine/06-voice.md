# 06. Voice

## Owner direction (2026-11-06)
Gulf voice-over, varied across ElevenLabs' Gulf Arabic voices, men AND women. He wants a voice like
ROAR's. He says ROAR's voice is AI, not a person.

## Samples generated (waiting for his picks)
Folder: `assets/voice-samples-2026-11/`. Every sample says the same Gulf line (`line.txt`, about Taj
34 MB → 140 KB). Settings: `eleven_v3`, stability 0.5, no audio tag (the owner's earlier pick,
`rules/voice-and-sound.md`). `ALL-voices-in-order.mp3` plays them back to back: f01-f07, m01-m07, then r01-r04.

| Code | Voice ID | Name | Label |
|---|---|---|---|
| m01 | KfYUTAF49N2CPU3iKuMi | Abdulrahman | current voice, Najdi ads |
| m02 | rpGHcNQJvO8dFNNFNj1v | Fahad | Saudi, warm, confident |
| m03 | 5HAezIQAaoSgJypcI0NP | Mansour | Saudi, natural, expressive (ad) |
| m04 | DANw8bnAVbjDEHwZIoYa | Ghawi | Gulf, professional, dynamic |
| m05 | cFUFIbKkO2iZFwS8cRnY | Nasser AlJubaily | authentic Saudi |
| m06 | kr4VZw8MSZMHE0y2m40n | Hasawi | conversational, energetic |
| m07 | aLv8a8fbjjLsORNUDQ1J | Bandar | young, warm |
| f01 | gVzwmdZzRgBrNjXaTmi5 | Layan | Saudi, professional |
| f02 | VjxKp6w1MCufETfW5zFM | Nouf | Saudi, commercial & documentary |
| f03 | ulJ49j1YlxrYnPoj5o12 | Lama | Gulf, soft |
| f04 | isQLuoVuANx6FjDxyasX | Noura | Gulf, soft and polished |
| f05 | 4uJbyDJGijiDphW2T3vP | Jumana | Hijazi, warm (ad) |
| f06 | FZeLZd39ejvLgzR2gY0t | Nora S | Saudi, natural, calm |
| f07 | 9xjgPVEwVEUuUxRAxKc9 | Joud | Saudi, gentle |
| r01 | pCKbQ4EPGE06zpEPGNvS | Abdullah, Professional and Energetic | closest to ROAR (top match on ROAR 01, 5th on 02); 111k uses |
| r02 | fkqevZRU7Xj52dY1CTkq | Hijazi, Professional and Expressive | 2nd on ROAR 01, top on 02 |
| r03 | 3vR1KVyyNDhdkucpugQI | Saad | Saudi, matched on ROAR 01 |
| r04 | UZbXudn9g5q7bjznYXcC | Ahmed, Natural & Clear | Gulf, matched on ROAR 01 |
| r00 | n/a | ROAR original, first 20 s of ref 01 | for comparison only, not for use |

## How the ROAR match was found
ElevenLabs `POST /v1/similar-voices` (form: `audio_file`, `top_k`) on 30 s of ROAR audio.
- Refs 01 and 02 both returned Abdullah (`pCKbQ4EPGE06zpEPGNvS`) and Hijazi (`fkqevZRU7Xj52dY1CTkq`) near the top.
- Ref 05 returned non-Arabic voices, because music and SFX dominate its first 30 s. Use clean voice sections.
- The matches carry an "MSA" accent label, but these voices speak whatever dialect the script is written in.
First assessment (superseded by the owner's decision below): use the library voice rather than clone
ROAR's ad audio.

## Full Gulf/Saudi roster found
92 voices in total. Raw search results: `assets/voice-samples-2026-11/search/` (s-*.json, sim0*.json). Re-run:
`GET /v1/shared-voices?language=ar&search=<saudi|gulf|khaleeji|najdi|emirati|kuwaiti>&page_size=60`.
Also strong: Abu Salem (Kuwaiti, 40k uses), Ali (calm Saudi narrator), Saud (deep formal), Sultan
(Gulf), Salma (Gulf female, serene), Amira, Hanan, Latifa, Samira (Gulf female narrators), Khalifa
and Yousuf (Emirati), Maryam (Kuwaiti female).

## Rules (also in `rules/voice-and-sound.md`)
- I cannot hear audio. STT checks words, not accent. Never ship an unheard voice setting. Say the accent is unverified until the owner listens.
- `eleven_v3` WITH an audio tag drifted to an Egyptian accent once (2026-10-15). No tags without a listening test.
- Shared voices can be used for TTS directly by ID. If a voice is refused, add it to the library with
  `POST /v1/voices/add/{public_owner_id}/{voice_id}`. `engine/tools/voice_samples.py` does this
  automatically.
- Variety: rotate voices across reels, but keep one voice per series so the series has an identity.

## Speech-to-text (for learning from references)
ElevenLabs `POST /v1/speech-to-text` (`model_id=scribe_v1`, optional `language_code=ara`) works well
on Arabic dialects and English, with word timestamps. The key is read from
`E:\Library\01-Workspace\Fortune\reel-studio\.env` (`ELEVENLABS_API_KEY`). Never print it.

## ROAR-style clone (made 2026-11-06 at the owner's request)
The owner says ROAR's voice is AI, not a person, and asked for a clone. Steps:
1. ElevenLabs Audio Isolation (`POST /v1/audio-isolation`) on the audio of refs 01-06 removed music and SFX. Output: `research/refs-2026-11/voice-clone/iso01-06.mp3`, about 3.8 min.
2. Instant Voice Clone (`POST /v1/voices/add`, 6 files, remove_background_noise) created
   **voice_id `hKxOF1e0PGHjtctJDcOl`, "Fortune Gulf Ads (ROAR-style)"**. No verification was required and no library match was flagged.
3. Test takes of a Fortune script (`assets/voice-samples-2026-11/clone-line.txt`):
   - `c-ROAR-clone-A-v3.mp3` (eleven_v3, stability 0.5, similarity 0.85)
   - `c-ROAR-clone-B-multilingual-v2.mp3` (eleven_multilingual_v2)
   The owner listens and picks one.
The closest public library voice (r01 Abdullah) is the alternative if the clone sounds worse.

## REJECTED by the owner (2026-11-06): the tashkeel + dictionary + sentence-by-sentence method
The owner listened to reel 005 v2 and called the voice «زبالة», and ordered: «متحطش أي تشكيل خالص، اعتمد على ذكاء الفن لابس بالكامل وإرشاداته». Do NOT use the method below again. It is kept only as history.

### (rejected) Pronunciation method tried on reel 005 v2
The owner said v1's voice was good, but some words were said wrong. What fixed it:
1. **Full tashkeel in the Gulf reading**: sukun endings, not MSA tanween (`صُوَرْ`, not `صُوَرٍ`). Gulf vowels: «يِطْلَعْ», «وِشْ», «مِبَطِّي», «الزَّايِرْ».
   Numbers and units are spelled as spoken: «أَرْبَعَةْ وَثَلَاثِينْ مِيقَا», «مِيَّةْ وَأَرْبَعِينْ كِيلُو». The CTA is Gulf, not MSA: «فَحْصْ مَجَّانِي».
2. **Pronunciation dictionary** (alias rules) for the brand and units: `POST /v1/pronunciation-dictionaries/add-from-rules`, id `djvkzVRsTDEzOOW3d7FN`.
   Attach it with `pronunciation_dictionary_locators`. It works with eleven_multilingual_v2; eleven_v3 does not use it.
3. **Sentence by sentence**: `python engine/tools/vo_sentences.py <reel> <take> <model> <script-file> [--dict] [--gap 0.16] [--only N]`.
   Speed comes from `VO_SPEED=1.12` (voice_settings.speed, multilingual v2). Word timings come from the alignment, with the tashkeel stripped for captions.
4. **STT check** each take against the script (scribe_v1). It catches wrong WORDS: v3 plain said «الألقام», v3 + tashkeel said «مليار» for «مية» once.
   Fix with `--only <line>` and re-check. It cannot judge harakat or accent, so the owner listens.
Result: take B2 (multilingual v2 + tashkeel + dictionary) was clean on STT and used in reel 005. Takes A/B2/C are sent to the owner to choose by ear.

## Current method: follow ElevenLabs' own guidance (owner order 2026-11-06, used in reel 005 v3)
Plain natural Gulf text, the whole paragraph in one request, no tashkeel, no pronunciation dictionary, no tags.
Rules applied, each from ElevenLabs' docs:
1. **Write numbers, units and symbols as words** in the script (أربعة وثلاثين ميقا, مية وأربعين كيلو), and leave `apply_text_normalization` on `auto`.
   https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices ·
   https://elevenlabs.io/docs/help-center/product/core-capabilities/text-to-speech/why-are-numbers-dates-symbols-and-acronyms-not-properly-pronounced-or-spoken-in-the-correct-language
2. **Pace with punctuation only.** Commas, full stops and question marks shape the pauses. eleven_v3 does not support SSML `<break>`, so never send SSML.
   https://elevenlabs.io/docs/help-center/product/core-capabilities/text-to-speech/how-can-i-add-pauses · https://elevenlabs.io/blog/ssml-tags-explained
3. **One request for the whole paragraph** (444 characters; the docs advise splitting only long text, around 800-900+ characters, and then passing previous/next text). Splitting into sentences broke the prosody.
   https://elevenlabs.io/docs/resources/troubleshooting · https://elevenlabs.io/docs/overview/capabilities/text-to-speech
4. **Settings from the docs' starting point:** stability 0.5. On multilingual v2, similarity 0.75 and style 0 (style can make it unstable). No speed change.
   https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices · https://elevenlabs.io/docs/resources/troubleshooting
5. **No audio tags.** Tags are for directed emotion. We already saw `[excited]`/`[confident]` push this voice to an Egyptian accent, so the clean text alone carries the read.
   https://elevenlabs.io/blog/v3-audiotags
6. **Several takes, pick by ear.** The docs advise generating several takes and choosing; we make one with eleven_v3 and one with eleven_multilingual_v2, same text and voice.
   https://elevenlabs.io/docs/overview/capabilities/text-to-speech/best-practices
7. **Write the script in the dialect you want spoken** (Gulf words: وش، يبطي، خل، الزاير). The model reads the text as written, with no respelling tricks.
Result in reel 005 v3:
- V3 (eleven_v3, 34.0 s) and ML (eleven_multilingual_v2, 35.4 s), clone `hKxOF1e0PGHjtctJDcOl`.
- Both match the script word for word on STT; STT writes the brand in Latin and «ميجا» for ميقا, which is normal.
- V3 is in the reel. Both were sent to the owner to judge by ear.
