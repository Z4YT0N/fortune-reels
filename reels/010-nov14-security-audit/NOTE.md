# 010 Nov 14 reel: security audit before launch (14 issues found and fixed)

Final: `nov14-security-audit.mp4` (1080x1920, 30 fps, 28.22 s, -14.2 LUFS, TP -1.8 dBTP). Engine copied from 008
(`showreel.tpl` + `ext.js`, `build.py`, `mix.py`); stills via `snap.sh` + `sheet.py` (agent-browser session r010).

## Voice
- `script.txt`, 67 words, plain Gulf, no tashkeel. Clone hKxOF1e0PGHjtctJDcOl, eleven_v3 (vo.py take B, run twice -> B1, B2).
- STT (scribe_v1, `stt.py`): B1 misheard «تفضح» as «تظبح» -> rejected. B2 differs only by normalisation (digits 14, Latin form/headers, إحنا, مجانًا) -> used at 1.1x (26.92 s, 2.5 words/s).
- Accent UNVERIFIED until the owner listens. Credits: ElevenLabs 2 takes x ~420 chars + 2 STT. Flow 0, Gemini 0.

## Transition map
B1 window tilts in, scan line raises 14 flags, counter rolls to ١٤ -> B2 flags sink, counter shrinks to a chip, skeleton polishes, tags «شكله جاهز» «والزر جاهز» -> B3 cursor clicks the button, padlock drops with tag «ما نطلق شي», flags return, «نفحصه» -> B4 a scan line splits open into the light report «الفحص؟», category cards on a conveyor -> B5 «أمثلة» stamp -> B6 the report folds into the 14-flag board, flags flip green, «صلحنا» kashida, counter ١→١٤ -> B7 the board folds into the locked button, shackle springs, «انفتح», click, green wipe -> B8 end panel, comment field types «انطباع», reply bubble, url + phone.
Thread objects: cursor (all beats), launch button + padlock (B2-B3, B7), the ١٤ counter (B1-B3, B6).

## Owner checklist (BRIEF.md rules + rules/owner-checklist.md)
- PASS no client name or logo anywhere (stills b/c sheets, final-sheet.jpg).
- PASS facts: only "14 issues found and fixed"; categories framed on screen as «أمثلة مما يغطيه الفحص» + stamp «أمثلة» + voice «هذي أمثلة من اللي نراجعه».
- PASS contact www.fortunecode.org + +20 10 98066484 on the end card; CTA «اكتب انطباع بالتعليقات».
- PASS brand colours only (#121416, #00DB33, #006A39, #F0F1F2 + greys). Note: the requested "red flags" became light flags with «!» that flip green, to keep the brand-only rule.
- PASS fonts: Zain for hero words/numbers, Plex for UI, labels, cards, CTA.
- PASS frame 1 moves and carries «فحصنا» + window + scan line (snap c_0).
- PASS type lives in carriers (URL bar, tags, hanging tag, category cards, stamp, pills, comment field, bubble); position changes per beat.
- PASS hidden states set at build (gsap.set), no TL.set shows text before its tween.
- PASS SFX on visual events (65 cues / 28 s), no music bed, -14.2 LUFS, TP -1.8.
- PASS motion blur pass (60 fps render -> tmix -> 30 fps).
- PARTIAL safe zone: checked by eye on stills with the zone drawn (snap/*-sheet.jpg). «فحصنا» enters from beyond x 960 during its first 0.5 s (transit). qa.py / safezone_check / motion_check / overlap_check were NOT run: they need the older template hooks (`.tk .w`, `__qaMotion`) that the 008 engine does not have.
- N/A ROAR collage look (the 008 showreel style is the approved bar for first10).
