# DcqiQesO_R9: Kallaway, "The Ultimate Scriptwriting Format For Short Form Content"

- 21,951 likes / **24,202 comments (ratio 1.10)**.
- 1080x1920, **25 fps**, 38.8 s, -14.2 LUFS, LRA 3.3.
- **8 hard cuts:** 3.00, 5.72, 9.64, 19.40, 21.60, 29.60, 32.24, 36.12.
- Frames: `DcqiQesO_R9-frames/` (`sheet1fps_*`, `hook30_*`, `cut_<t>.jpg`, `strips_A/B/C`, `full_*`). Word timings are ±0.15 s.

## 1. The framework (the core lesson)
VO: "First, you start with the hook, then you go into the lock-in zone. Very underrated two to three sentences that come right after the hook that nobody talks about. Then body block one, re-hook one, body block two, re-hook two, optional body block three, optional closing, and a CTA with an aligned lead magnet… comment 'scripts' and I will send you a tactical doc…"

| # | Section | Card colour | Definition |
|---|---|---|---|
| 1 | Hook | red | (see the Triple Hook reel DZZ-Lj6uwM5: context + lean + contrarian snapback) |
| 2 | Lock-in zone | yellow | 2-3 sentences right after the hook "that nobody talks about" |
| 3 | Body block 1 | purple | name only |
| 4 | Rehook 1 | red | name only |
| 5 | Body block 2 | purple | name only |
| 6 | Rehook 2 | red | name only |
| 7 | (Optional) Body block 3 | cyan | name only |
| 8 | (Optional) Closing | white | name only |
| 9 | CTA with an aligned lead magnet | green | name only |

- **He defines only the lock-in zone.** The other 8 are names only, and that gap is what the comment sells.
- **Colour meaning:** red = hook and rehooks (a rehook is a mini-hook), purple = body, green = CTA.

**Working rules for our team (inference, not his words):**
- **Hook:** context + lean in one sentence, 1-3 s.
- **Lock-in:** 2-3 sentences, 3-5 s: a snapback, proof or the exact payoff promise. No greeting.
- **Body block:** one idea, one proof, one picture, 5-8 s.
- **Rehook:** one line of 1-2 s that reopens curiosity, marked by a cut.
- **CTA:** one keyword + a free asset on the same topic, 5-9 s.

**How his own reel follows it:**
| Section | Time |
|---|---|
| Hook (voice, title card and caption say the same thing) | 0-3.0 |
| Lock-in (cut to his face at 5.72 for "nobody talks about") | 3.0-9.64 |
| Body (the list, about 1 row per second) | 9.64-19.4 |
| Rehook 1, face: "If you don't know how to write scripts, just follow this." | 19.4 |
| Body 2, proof: "billions of views", profile scroll, thumbnail wall | 21.6-29.6 |
| Rehook 2 + CTA | 29.6 |
| Lead magnet: 5 doc pages | 32.24-38.8 |

He skips the optional sections. The CTA starts at 76 % of the runtime.

## 2. Hook frames (at 30 fps)
- **Layout:** split screen. Near-black top 73 % with a faint dot grid; webcam panel at the bottom 27 % (about 940 px wide from y 1400, rounded top corners).
- **f0:** a dim "Video Script" card is already there at 30 % opacity. The screen is never empty.
- **f1-7:** the card fades up with a soft glow.
- **f1-16:** the title types on a red bar that grows with the text.
- **f4-20:** coloured bars draw in top to bottom, each wiping left to right, 1 f stagger.
- **f11:** the caption switches to an italic serif for the key phrase.
- **f20-67:** the graphic holds; his hand gestures carry the energy.
- **f68:** the card disappears with no fade.
- **f70-89:** a thumbnail wall pops in one tile every 2-3 f (scale 90 % → 100 % + fade).

## 3. Shot grammar
- **Two layouts:**
  - **SPLIT** (graphic top, webcam bottom, caption at y ≈ 1285) carries information: runs of 2.7, 9.8, 8.0 and 3.9 s.
  - **FACE** (a ~2.2x punch-in crop of the same take, caption on the chest) carries an opinion, a permission line or the ask: runs of 3.9, 2.2, 2.6 and 2.7 s, never longer.
- **Every SPLIT → FACE switch is a rehook.** Cuts land on commas and breaths. Hard cuts only, locked camera.
- **One persistent card keeps its progress across cuts.** Each row turns into a coloured bar with a 0.2 s wipe on the spoken word, and the placeholder area shrinks as rows fill: a visible progress bar.
- **Every return to SPLIT retypes the title** (about a 0.5 s "new chapter" beat).
- **Body 2:**
  - pills slide in from the left, one per spoken item;
  - his profile auto-scrolls;
  - a conveyor push (collage off left, card in from the right, joined by a white line);
  - a red pulse on the card header on "script".
- **CTA:** the keyword «"Scripts"» stays pinned while the next words cycle underneath; 5 doc pages pop in staggered, the last with a yellow highlighter stroke.
- **Ending:** "…way better" loops straight back into "This is the…".
- **Captions:** 1-3 words, white bold sans about 44 px, hard swaps.
- **Sound:** voice only, about 3.6 words per second, breaths of 0.22 s or less. No music bed (the gaps sit at -38 to -41 dB) and no SFX.

## 4. Rebuild in our stack
- **Visual:**
  - One persistent card as a HyperFrames component with a rows-filled state.
  - Flat brand colours per section type.
  - First frame: GSAP from opacity 0.3, never 0.
  - Dot grid at about 4 % (a glow needs the owner's OK).
  - Split screen: ffmpeg overlay, webcam about 940x516 at (70,1404).
  - FACE shots: crop one wide 4K/Flow take at about 2.2x.
  - Proof wall: REAL portfolio screenshots via agent-browser, GSAP stagger 0.08 with scale 0.9 → 1.
  - Profile scroll: tall screenshot in a phone mask, `y` tween over 0.7 s.
  - Conveyor push: 0.35 s power3.inOut, mirrored for RTL.
  - Pills: in RTL the tab sits on the left edge and the pill slides in from the right.
  - Real lead-magnet pages with a highlighter rectangle.
- **Edit:**
  - Layout switch on every rehook.
  - Cut on commas and breaths using ElevenLabs word timings.
  - Plain concat, no transitions.
  - A loop ending.
  - In list sections, change something every 1-1.5 s.
- **Text:**
  - Zain bold about 52 px, whole words only.
  - Emphasis = Zain ExtraBold vs Light plus the brand highlight bar (no serif; Zain only).
  - Arabic title reveal word by word (opacity + y, 0.06 s stagger) with the highlight bar growing from the right.
  - Titles in MSA, voice in light Gulf.
  - Pinned keyword; keyword shown three ways (voice, caption, title).
- **Sound:** `loudnorm I=-14:LRA=4`. Arabic at 2.6-2.9 words per second, ElevenLabs speed about 1.1, trim gaps over 0.25 s.

## 5. Why comments beat likes, and the ethical copy
**Why:**
- The reel names every section but explains only one, so the doc is the only way to finish the lesson.
- The reel is still useful on its own.
- A believable asset: 5 real pages, a highlighter stroke, "3-5 things per section".
- The magnet is the second half of the same topic.
- One keyword, shown three ways; both "script" and "scripts" accepted.
- The ask takes 24 % of the runtime, right after the proof.
- The "nobody talks about" teaser early builds insider desire.
- Each comment boosts reach and opens a DM (a lead).

**Ethics for FortuneCode:**
- Deliver exactly what was promised, at once and free, with no call gate.
- The reel teaches the real fix even for people who never comment.
- Verified numbers only; clients named only with permission.
- Keyword «فحص».
- A keyword-to-DM tool is needed (ManyChat or Meta Graph API). It is not in our stack yet.
- Client WhatsApp follow-up from the MAIN number, never fc-system.

## 6. Sample 35 s Gulf script (the slow-site story on this skeleton)
Persistent object: a phone health card with the rows الصور / السرعة / الجوال / جوجل. Numbers marked [تحقق] must be verified.

| Section | Time | VO | Picture |
|---|---|---|---|
| HOOK | 0-3 | «موقع شركتك يطرد العملاء… قبل لا يشوفون أي شي.» | SPLIT; phone at 30 % on f0; load bar stalls at 12 %; red badge «34 MB» |
| LOCK-IN | 3-7 | «والمشكلة مو في التصميم… ولا في الاستضافة. المشكلة في صفحة وحدة: المعرض. وبوريك كيف نزلناها من ٣٤ ميغا لـ١٤٠ كيلوبايت.» | FACE at 3.0 for the snapback, SPLIT at 5.0; «الصور» row turns red |
| BODY 1 | 7-14 | «فحصنا موقع عميل، صفحة المعرض لحالها ٣٤ ميغا [تحقق]. على جوال عادي تنتظر أكثر من عشر ثواني [تحقق]. وجوجل نفسه يقول: أكثر من نص الزوار يطلعون إذا الصفحة تأخرت أكثر من ٣ ثواني.» | real slow-page screenshot, stopwatch 0 → 10, Google pill |
| REHOOK 1 | 14-16 | «طيب وش سوينا؟ ولا سطر تصميم جديد.» | FACE, «ولا سطر» pinned |
| BODY 2 | 16-24 | «حوّلنا الصور لـWebP، صغّرناها على مقاس الجوال، وخليناها تتحمّل بس لما العميل يوصلها. والنتيجة؟ المعرض صار ١٤٠ كيلوبايت.» | rows turn green on the words; counter 34 MB → 140 KB in 0.8 s, then a pulse |
| REHOOK 2 | 24-26 | «يعني أخف بأكثر من ٢٠٠ مرة… وبنفس الصور بالضبط.» | FACE (34,000/140 ≈ 243) |
| BODY 3 | 26-29 | «وجوجل يحسب سرعة موقعك في ترتيبك… يعني البطء يخسرك مرتين.» | RTL push to a search-result mock |
| CTA | 29-35 | «تبغى تعرف وش اللي مثقّل موقعك؟ اكتب "فحص" في التعليقات… ونرسل لك فحص مجاني لموقعك: أثقل ٣ أشياء فيه، وكيف تنحل.» | FACE with «فحص» pinned, then SPLIT: title «اطلب فحص مجاني لموقعك», 3 real audit pages, loop to the hook |

## 7. Summary
1. Hook → lock-in → body 1 → rehook 1 → body 2 → rehook 2 → optional body 3 → optional closing → CTA with an aligned lead magnet.
2. Only the lock-in is defined; the gap sells the comment.
3. Two layouts: SPLIT for information, FACE for rehooks and the ask.
4. One colour-coded card fills across cuts as a progress bar.
5. Voice only at -14 LUFS, a loop ending, 8 hard cuts.
6. Comments come from an open loop, a reel useful on its own, a real asset on screen, one keyword shown three ways, and a magnet on the same topic.
