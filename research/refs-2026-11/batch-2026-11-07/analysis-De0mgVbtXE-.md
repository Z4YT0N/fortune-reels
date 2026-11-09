# De0mgVbtXE-: Gin Lee (@ginyboi, "Video Editor (400K+)"), "How should creators write their script?"

- 1080x1920, 29.97 fps, 29.53 s, 8,102 likes.
- 8 hard cuts: 1.902, 3.570, 6.673, 9.243, 14.481, 16.850, 24.725, 28.896.
- Frames: `De0mgVbtXE--frames/` (`contact_*`, `hook_s0..2`, `strip_<sec>` (yellow label = centiseconds), `full_*`, `spectrum.png`).

## 1. The method: sentence RHYTHM
- **Diagnosis:** "most of your videos sound so boring because they don't have rhythm". All-long sentences give a flat read.
- **Rule:** "Add short sentences between, with no more than five words", giving a long-short-long-short pattern.

His worked example:
| Before (all long) | After |
|---|---|
| Is it possible to study for 24 hours in a public library? | same (L12) |
| — | **Let's find out** (S3) |
| I first have to find a local library that opens for 24 hours. | same (L13) |
| So I searched on google maps to find one near my house | same (L12) |
| — | **But there was a problem** (S5) |
| But the problem was all the libraries closed at 10pm. | All the libraries around me closed at 10pm. (rewritten) |

**Beyond the rule:**
- The short lines are OPEN LOOPS (a promise, then a turn), never filler.
- Pull the twist out of a long line into its own short line; the long line keeps only the plain fact.
- Long lines stay long. Add short lines; don't chop everything.
- Prove it by ear: play the "after" read, then «See? It sounds much better».

**His reel follows it:** word counts 16 L, 6 S, 15 L, **4 S**, 10 L, 15 L, **3 S**, demo, **1 S**… Each short line is a section hinge, spoken right before a cut.

## 2. Hook (f0-90)
| Frame / time | What happens |
|---|---|
| f0 | Static medium close-up, already mid-gesture; caption box "The reason why" |
| **f10 (0.33 s)** | Credential "Video Editor (400K+)" hard-cuts on in the headroom: serif about 110 px, with a hand-drawn loop arrow at his face |
| f17 | caption "most of your videos" |
| f41 | caption "sound so boring" |
| **f57 (1.9 s), cut** | Cut mid-sentence to a bored listener (headphones, chevron panels, hand on chin). The credential goes; the caption carries over the cut |
| f65 | caption "is because they don't / have 'rhythm'." |
| 3.44-3.57 s | 130 ms of silence, then a cut to the document |

Why it works: pain aimed at "your videos", the cause in one word, authority shown without spending speech on it, and the first pattern break at 1.9 s shows the AUDIENCE, not the speaker.

## 3. Shot list
| # | Time | Picture | Text and motion |
|---|---|---|---|
| 1 | 0-1.9 | A-roll MCU, locked | credential 0.33-1.9; 3-4-word captions hard-swap on the word |
| 2 | 1.9-3.57 | bored-listener cutaway | caption swap at 2.17 |
| 3 | 3.57-6.67 | #424242 field, white document card in the top third | red arrow pops at 4.68 pointing at the text block |
| 4 | 6.67-9.24 | A-roll jump reframe | "So do this instead:" |
| 5 | 9.24-14.48 | document | see below |
| 6 | 14.48-16.85 | A-roll, tighter | "Take a look:" pointing at the lens |
| 7 | 16.85-24.72 | real Final Cut timeline crop on black | see below |
| 8 | 24.72-28.9 | A-roll | "See? It sounds much better"; @kallaway profile card pops 26.3-28.1 |
| 9 | 28.9-29.53 | A-roll | "God bless you", loops to frame 0 |

**Shot 5 (document):**
- 9.3-10.0: line spacing eases open and the card grows about 13 %.
- About 10.1: the two short lines fade in (about 6 f).
- 10.5: the old last line crossfades into the rewrite.
- 10.61: two red outline boxes pop on.
- 12.6-14.45: one full-width red box steps line by line on the spoken "long, short, long, short" (12.60, 12.85, 13.26, 13.65, 13.98), each step a hard jump.

**Shot 7 (timeline):** the playhead sweeps at a constant speed over two long clips (top lane) and two short clips (lower lane), showing the long-short shape. Comic captions with SHORT LINES IN RED, long lines white.

**Audio:** voice only, no SFX transients. The only silences (130 / 170 ms) come right before cuts to the document, so cut on the breath.

## 4. Style
- **A-roll:** dim night room, concrete ceiling, blinds; soft warm low-contrast key light; black mic with a red LED.
- **Captions:** Garamond-style serif, white about 46 px, box #231E20 at 75-80 %, centred at y ≈ 70 %.
- **Documents:** #424242 field, white card, Comic Sans (deliberately unpolished), red outline boxes, chunky arrow.
- **Motion:** almost none. Only three tweens (line spacing, line fade, playhead); everything else is hard on/off. The craft is TIMING.

## 5. Rebuild in our stack
1. **Credential at 0.33 s:** Zain 110 px #F0F1F2 + SVG arrow drawn with dashoffset; `tl.set` on and off at 0.33 / 1.9. Verified numbers only.
2. **Bored-listener cutaway at 1.9 s:**
   - Gemini start frame: Saudi owner, hand on chin, a bland site on the laptop, beige panel wall.
   - Flow animates it for 2 s.
   - Cut in mid-sentence, caption held over the cut.
3. **Boxed hard-swap captions:**
   - `textContent` set per chunk from ElevenLabs word times;
   - Zain 52-56 px, right-to-left, box rgba(18,20,22,.8);
   - 2-4 whole words per chunk.
4. **Document explainer:**
   - card #F0F1F2 on #121416, Zain;
   - insert beat: `marginBottom` tween over 0.6 s, then whole lines fade in over 0.2 s;
   - rewrite: crossfade two stacked lines;
   - highlight: `outline: 4px solid #00DB33`;
   - rhythm sweep: one box hard-set per spoken beat.
5. **Timeline + playhead:**
   - long clips #006A39 with #00DB33 waveform, short clips on a lower lane;
   - linear playhead;
   - short-line captions #00DB33, long ones #F0F1F2;
   - real look: `gdigrab` our own editor.
6. **Profile card → client card** (logo, project, one verified number).
7. **Cut on the breath:** `silencedetect=n=-40dB:d=0.12`, cut 1-2 f after `silence_end`.

**New gate rule:** every spoken line of 5 words or fewer coincides with a cut or a graphic state change.

## 6. FortuneCode
**Take:**
1. **Rhythm rule in every Gulf VO script, short lines as open loops:**
   - «تبي موقعك يجيب لك عملاء من قوقل بدون ما تدفع إعلانات كل شهر؟»
   - «خلنا نشوف.»
   - «أول شي سوّينا صفحة لكل خدمة…»
   - «بس فيه مشكلة.»
   - «الموقع كان بطيء…»
2. **Before/after on the real artefact** (a client's hero copy, homepage, WhatsApp reply), then play the "after" («شفت الفرق؟»).
3. **Credential at 0.33 s.**
4. **Bored-visitor cutaway before 2 s.**
5. **Colour code:** short lines green, long lines light grey.

**Avoid:**
- Comic Sans and typos.
- Red as the accent (red only for the "wrong/before" state).
- Crediting another creator / a religious sign-off as the end; end on a result + one CTA.
- Two caption fonts (Zain only).
- Flat hard-cut cards as they are. Owner rule: one continuous film, type in the scene, so put the document on a laptop or phone in the scene with a persistent cursor.
- Captions at 70 % height (they clash with the Reels UI).
