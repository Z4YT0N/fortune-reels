# 011 Nov 16 reel: JS 2.2 MB -> 1.2 MB, background video 2 MB -> 613 KB

Final: `nov16-js-video-size.mp4` (30.18 s, 1080x1920, 30 fps, -14.3 LUFS, true peak -3.4 dBFS).
Voice: clone hKxOF1e0PGHjtctJDcOl, eleven_v3, take B2 at 1.0x (B1 rejected: STT heard «مفقع» for «مثقل»). STT diffs of B2 are spelling only (JavaScript/Google/digits); one real drift: voice says «اكتبوا», screen says «اكتب».
Build: `python build.py` (showreel.tpl + ext.js + audio/words.json -> index.html), `python mix.py` (69 cues), `npx hyperframes render -f 60 -q standard -o renders/v60.mp4`, then the BRIEF tmix motion-blur pass.

## Transition map
1. Pills «موقع شركة كبيرة،» (frame 0 carries «موقع») fly out -> connector + «جوالك» tag with an arrow drawn to the phone on the scale.
2. Ghost (dashed) files drop on the phone -> scale sinks, needle swings («حمل ما تشوفه»).
3. Cursor clicks each ghost -> it turns solid, a clone flies on a curve into a card that wipes open (title types, counter + «ميجا» slam, bar grows).
4. «وش يعني هذا؟» smear slam + highlight -> cards leave right, camera pushes on the phone; files slide INTO the screen («ينزل»), the page freezes and taps do nothing («تتحرك»).
5. The phone's spinner opens a circle wipe into the dark world and grows into a stopwatch ring (0 -> 3 s) with the Google line.
6. The ring parks top-left, 100 visitors appear, 53 leave, «٥٣٪» rolls, source line on screen.
7. Visitors leave -> vertical bars: JS bar selected, cut at 1.2 by the cursor, the 1 MB chunk falls; the video bar is pressed down by the cursor to 613 KB. Ghost outlines + struck labels keep "before".
8. The dark world is grabbed and swiped away -> the phone on the scale again, now light: platform springs up, needle swings back, progress bar races to 100 %, «اخف».
9. Question with a needle twitch on «مثقل» -> scale drops away, comment field types «انطباع», send click -> end panel (logo, CTA, www.fortunecode.org, +20 10 98066484).

## Owner checklist
- Safe zone: PASS by eye on stills (`snap/sheetB-D.jpg`); corner labels and top-band text moved after a collision was found. safezone_check / motion_check / overlap_check NOT run (they need the 005 template's .tk/.w + __qaMotion hooks, which 008's engine does not have either).
- No text over faces: N/A (no people).
- Text never over phones/photos: PASS on stills (right column vs phone left column).
- 9:16 1080x1920 30 fps, frame 1 moves and carries the hook: PASS.
- Nothing held > 2.5 s, no black frames: PASS (freezedetect, blackdetect empty).
- Smooth motion: PARTIAL. Follows 008's vocabulary (back.out up to ~2 on pops), not the stricter ≤3 % overshoot rule.
- One continuous film: PASS (map above; thread = cursor + scale/phone, open and close on the same scale).
- Look: flat motion-graphics like 008 (no collage/footage); brand colours only; logo flat. PASS for the 008 style.
- Font: Zain hero + Plex connectors/UI, Inter for Latin. PASS.
- Arabic joins: PASS (typewriter grows one string; no per-letter split).
- Voice: plain Gulf, no tashkeel; accent unverified until the owner listens.
- Numbers: on screen exact (٢٫٢ / ١٫٢ ميجا, ٢ ميجا / ٦١٣ كيلو, ٣ ثواني, ٥٣٪); spoken: «فوق الاثنين ميجا», «اثنين ميجا», «شلنا منه ميجا كاملة», «ستميه وتلطعش كيلو», «اكثر من نص». PASS.
- SFX on events (69 cues / 30 s), no loop, no music, -14 LUFS: PASS (tick_check not run).
- Client not named: PASS. CTA «اكتب انطباع بالتعليقات»: PASS. New number on end card: PASS.
