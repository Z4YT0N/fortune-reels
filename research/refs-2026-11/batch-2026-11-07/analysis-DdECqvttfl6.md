# DdECqvttfl6: «31 نوع محتوى يستحق التجربة» (عبدالله فؤاد)

- 25.57 s, 30 fps, 0 hard cuts.
- 2,064 likes / 1,287 comments: comments equal 62 % of likes, so the CTA works.
- Caption: «علق برقم 31 وراح ارسلك ملف يشرح كل نوع».
- Frames: `DdECqvttfl6-frames/`. Timings come from frame-exact `scdet` / `signalstats` passes on the source. Ignore the `strip12_*` numbering.

## 1. Format and why it performs
- **One live talking-head take:**
  - a dim room with warm orange practicals and a curtain;
  - his right hand holds a lav mic with a fuzzy windscreen;
  - his left hand riffles an A4 stack toward the lens like a flip-book.
- **Three overlay layers:**
  1. A fixed header «31 نوع محتوى يستحق التجربة» (orange box #FD6B1D, white bold about 72 px), with an always-on CTA strip under it: «اكتب في التعليقات (31) وراح ارسلك شرح كل نوع» (white box, black 34 px).
  2. A two-column numbered list. The right column holds 1-15 and the left 16-31. Numbers are visible from frame 0; labels pop in one by one.
  3. A phone-shaped example clip (about 198x430) that swaps to a new example on every item: 31 examples in 25 s.
- **The voice-over only reads the item names.** No intro and no outro.

Why it works:
- The empty 31-slot grid at frame 0 is the hook: it opens a loop the viewer wants to close.
- There is too much for one watch: a new item lands every 0.83 s on average, each with a real example. People rewatch, pause and screenshot.
- The full list holds only 0.40 s before the loop, which pushes a rewatch or a "31" comment.
- The keyword "31" is also the title and the CTA. Commenting costs 2 characters, and the reward is a file. Every comment is a ranking signal and opens a DM thread.
- The CTA is on screen for the whole reel.
- It earns saves (reference material).
- The first item lands at 0.23 s.

## 2. Hook (0-3 s)
- **Frames 0-6:** fully black and white (SATAVG ≈ 4). The header, CTA and empty grid are already there.
- **Frame 7 (0.233 s):** item 1 «ياب (Yap)» and its first clip arrive, and colour starts returning. It ramps roughly linearly over about 1.8 s (saturation 5 → 15).
- **Item 2 at 0.567 s:** only 0.33 s after item 1, so the fast tempo is set immediately.
- **Then** item 3 at 1.60, item 4 at 2.23, item 5 at 2.90.

## 3. Continuity with zero cuts
- One locked or lightly handheld take, and the creator never leaves frame. Every change happens in the overlays.
- **31 inset swaps + 31 label reveals.** Each is an instant one-frame switch with no transition.
- **The paper riffle motivates each swap:** a sheet lifts as the clip swaps (about 20.7 s). It reads as "he turned the page", not as an edit. This is the key trick.
- The inset is fixed to the screen, not tracked (x 434-632, y 1065-1495). The moving paper under it sells it.
- **The list only grows,** so it works as a progress bar.
- **Audio never breaks:** voice-over plus a music bed at −14.1 LUFS, LRA 1.9, with no silence over 0.25 s.
- **Clean loop seam:** the full list jumps back to the empty grey grid, which reads as a reset.

## 4. Arabic typography
- A humanist Arabic sans (looks like IBM Plex Sans Arabic). Bold for the header and numbers, regular about 26-28 px for labels, white with no shadow. Rows sit 50 px apart. Western digits.
- Labels pop as whole strings on a single frame, within 1 f of the inset swap and on the spoken word. They never exit. Joins stay intact.
- **Its mistakes, to avoid:**
  - «16.» shows as «.16» (a Latin period mirrored in right-to-left text);
  - broken parentheses «ياب( Yap )»;
  - number glued to the label «.8شاشة»;
  - spelling slips («تقيم» on screen vs «تقييم» spoken);
  - the inset hides label ends.

## 5. The 31 items
The pop times, in order:

| # | Label | Pop (s) |
|---|---|---|
| 1 | Yap | 0.23 |
| 2 | التحدث امام الكاميرا | 0.57 |
| 3 | Ranking | 1.60 |
| 4 | بودكاست | 2.23 |
| 5 | رد على التعليقات | 2.90 |
| 6 | ياب مع اللابتوب | 3.77 |
| 7 | Text+B-roll | 4.83 |
| 8 | Split Screen | 5.63 |
| 9 | Cinematic | 6.43 |
| 10 | Voice Over | 7.37 |
| 11 | Green Screen | 8.30 |
| 12 | Reaction | 9.07 |
| 13 | Breakdown | 9.67 |
| 14 | Whiteboard | 10.30 |
| 15 | Comparison | 11.10 |
| 16 | مقابلات الشارع | 11.77 |
| 17 | Listicle | 12.83 |
| 18 | Storytelling | 13.57 |
| 19 | Carousel | 14.33 |
| 20 | كاروسيل بملاحظات آيفون | 14.87 |
| 21 | Q&A | 16.10 |
| 22 | Social Proof | 16.93 |
| 23 | مشكلة وحل | 17.93 |
| 24 | أخطاء شائعة | 18.57 |
| 25 | Interview Clips | 19.53 |
| 26 | Personal Lesson | 20.70 |
| 27 | Personal Story | 21.60 |
| 28 | سلسلة فيديوهات | 22.53 |
| 29 | Challenge | 23.60 |
| 30 | Day in the Life | 24.63 |
| 31 | Before/After | 25.17 |

- The full list holds 0.4 s.
- Gaps average 0.83 s (range 0.23-1.23 s) and follow the voice-over, not a fixed grid.
- The examples are mostly other creators' English reels. Don't copy that.

## 6. Rebuild in our stack
| # | Technique | How |
|---|---|---|
| T1 | Empty grid at frame 0 | HyperFrames right-to-left two-column CSS grid; numbers inside `<bdi>`; labels start hidden |
| T2 | Label pops on the voice-over | `TL.set(label, {visibility: "visible"}, t_n)` with `t_n` from the ElevenLabs alignment, 1 f before the word; whole phrases only; Zain |
| T3 | Black-and-white to colour on beat 1 | CSS `filter: saturate(0 → 1)` over 1.8 s from beat 1, or the ffmpeg `hue=s=` expression |
| T4 | Inset swaps on each beat | preloaded muted videos, opacity flip on the beat frame; enlarge to about 300x650; OUR portfolio screen recordings only |
| T5 | Real prop motivates each swap | one take of a repeated hand action (phone swipe, catalogue flick); align swaps to its peaks. Flow fallback: a locked desk shot with warm practicals and continuous flicking, chained start/end frames |
| T6 | List only grows | never remove; newest row at 1.0 opacity, older ones at 0.85 |
| T7 | Fixed header + always-on CTA | static divs; keyword in bold |
| T8 | Short end hold to drive loops | about 0.4 s after the last item; no outro |
| T9 | One loud audio bed | `loudnorm I=-14:LRA=2`; light bed about −24 LUFS; Gulf voice-over, no tashkeel |
| T10 | Text clear of the inset | inset in the centre gap; labels capped with `max-width` |

## 7. For FortuneCode
1. **Same format with our own content:** «٢٥ ميزة لازم تكون في موقع شركتك», «٣١ نوع موقع وتطبيق نقدر نبنيه لك», «٢٠ خطأ يطفّش العميل من موقعك». The inset shows our real client work, so every item is also proof.
2. **The number is the comment keyword:** «اكتب ٢٥ وأرسل لك PDF». The PDF ends with a WhatsApp CTA; the reply goes out through an auto-reply. Only promise this once the automation exists.
3. **The presenter swipes a real phone,** and each swipe swaps the inset (type lives in the scene).
4. **On beat 1, the header box flips #121416 → #00DB33.** No generic saturation ramp, no gradients.
5. **Colours:**
   - header #00DB33 box with #121416 text;
   - CTA strip #F0F1F2 with the keyword in bold #006A39;
   - labels #F0F1F2 on the dark video;
   - Zain, numbers in `<bdi>`.
6. **Fix its flaws:** number direction, spelling, labels clear of the inset, a bigger inset. Titles in MSA; voice-over and CTA in light Gulf.
7. **Tempo:** two items inside 0.6 s, about 0.8 s per item, 26 s or less in total, end hold 0.5 s or less.
