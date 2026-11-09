# DeEdp-2oa8w: Ahmed Gaber, a reel about hooks (31.4 s, one continuous take)

Frames are in `DeEdp-2oa8w-frames/`:
- 1 fps: `sheet-1fps.jpg`, `s1/`
- first 3 s at 30 fps: `first3s-30fps.jpg`, `h30/`
- 12 fps strips: `f12/`
- close-ups: `thumb-zoom.png`, `overlay-crop.png`

Phrase timings come from `silencedetect` (−30 dB, 0.12 s), accurate to about ±0.3 s.

**Main finding:** the reel does not teach a list of hook types. It recommends someone else's video and gives a PDF summary by DM to anyone who comments and follows. That is why it has 844 comments on 1.1k likes. The actual teaching is in the PDF, not in the reel.

## 0. What he teaches

### Rules he says out loud
| # | Rule | Quote |
|---|---|---|
| R1 | The hook decides whether a video spreads | «الهوك هو اللي بيحدد اذا كان الفيديو هينتشر او لأ!» |
| R2 | Lists of 20-30 ready-made hooks no longer work | «…ما عادش ينفع» |
| R3 | Every kind of content has its own hook | «لأن كل محتوى له الهوك بتاعه» |
| R4 | Learn to build your own hook for your field | «هيعلمك ازاي تعمل الهوك الخاص بيك…» |
| R5 | Study hooks across many fields | caption |

### The lesson inside the overlaid YouTube thumbnail ("I Studied 1,000 Hooks…", 20:07; the channel is not visible)
- **Before, 358 views:** a cluttered frame with no text and no clear subject.
- **After, 1.6M views:** one clean subject (a drink), a text line that contradicts what you expect ("this coffee should NOT taste good…", with NOT in red), a cyan arrow from the text to the subject, and one odd detail flagged (○ → !).
- **Rule:** one subject + contradicting text + an arrow tying the text to the visual + one curious detail.

### How his own first 3 s use it
- He speaks on frame 1 with a superlative: «أفضل فيديو أنا اتفرجت عليه» (0-1.97 s).
- He pauses 0.31 s, then says the topic word: «في موضوع الهوكات ده» (2.28-3.34 s).
- The 358 → 1.6M card carries the hook for anyone watching muted.
- From 3.5 s, the contrarian claim (R2) holds the next 7 s.

## 1. Visual format
- **Shot:** a selfie close-up from a slightly low angle, with 0 cuts, no zoom and only handheld drift.
- **Foreground:** a blurred dark laptop edge covers the right 15 % of the frame.
- **Background:** a white ceiling with Ramadan khayamiya and hanging stars.
- **Gestures replace cuts:** his hand enters every 2-4 s, as an open palm while he explains and an index finger when he points at the lens (about 16-18 s and 26-29 s).
- **The only graphic:** a static YouTube card at x 345-1225, y 1675-2290 (the y 65-89 % band, which is UNDER Instagram's buttons).
  - It never animates (SSIM between 0 s and 30 s is 0.973).
  - Its red progress bar is about 2/3 full, as proof he actually watched it.
- **No captions and no music.** Voice only, with RMS −16.9 dB and peak −0.95 dB.
- **About 2.7 words per second;** the longest pause is 0.48 s.
- **Ending:** it cuts off mid-word («الخاص») and loops back to the start.

**How attention holds with 0 cuts:** dense speech, the proof card that never leaves, hand gestures as cuts, an open loop paid off outside the reel, and a short running time.

## 2. Segments
| Time (s) | Spoken | Motion |
|---|---|---|
| 0.00-1.97 | أفضل فيديو أنا اتفرجت عليه | hand rises, eyebrows up |
| 2.28-3.34 | في موضوع الهوكات ده | hand toward the lens |
| 3.50-10.88 | موضوع إن حد يحط لك 20 أو 30 هوك… ما عادش ينفع | dismissive waves |
| 11.36-13.61 | لأن كل محتوى له الهوك بتاعه | nod |
| 13.76-19.72 | الراجل ده هيعلمك ازاي تعمل الهوك الخاص بيك اللي ينفع مع المجال… | index finger, then palm toward the viewer |
| 19.97-25.05 | علشان كده انا ما سبتكش ولخصت… في ملف PDF | hand forward, flat hand |
| 25.20-31.37 | لو انت مهتم بالتسويق اعمل اي comment… ابعت لك الملف على الخاص | points at the lens, hard stop |

**Structure:**
1. Authority claim
2. Contrarian claim
3. Promise
4. "I did the work for you"
5. Who it's for
6. Comment-for-DM call to action

## 3. Techniques and how to rebuild them in our stack
1. **Start on frame 1.** Trim to the speech onset (`silencedetect`). The first frame is fully composed, with no fade-in.
2. **Superlative claim of authority:** superlative + own experience, then a ~0.3 s pause, then the topic word.
3. **Proof card on screen the whole time.**
   - A HyperFrames div at y 62-80 %, above Instagram's UI.
   - Zain mob-long numbers at 140-180 px: «٣٤ ميجا» in red, then «١٤٠ كيلو» in green.
   - At most one whole-word pulse (scale 1 → 1.04) when the voice says it.
   - Use `<bdi>` for mixed Arabic and Latin text.
4. **Our own evidence:** a DevTools Network panel or PageSpeed screenshot (`agent-browser screenshot`). Keep the progress bar as the trust cue.
5. **Contrarian claim at 3-11 s:** «اللي يقولك X… خلاص ما عاد يمشي».
6. **Gestures instead of cuts.** For Flow, prompt: "selfie MCU, right hand enters from bottom every few seconds, index finger on key phrase, handheld micro-drift, no cuts", chained with start/end frames.
7. **Foreground object plus a real background:** a laptop edge on the right, in a Saudi office or majlis.
8. **Pay off the open loop outside the reel:** «علّق "سرعة" وأرسل لك فحص مجاني». Only once the DM automation is confirmed working.
9. **Name who it's for before the call to action.**
10. **Voice only:** loudnorm −14, no music bed.
11. **Seamless loop:** the last frame and last phrase flow into the first.

**Don't copy:** the card under Instagram's buttons, having no Arabic text, and borrowed English material.

## 4. Five Gulf hooks for the slow-site reel (34 MB → 140 KB)
1. **Before/after card plus a negated text line**
   - Voice: «هالمعرض كان ٣٤ ميجا… وصار ١٤٠ كيلو. نفس الصور.»
   - Visual: the phone is stuck on a spinner with a red «٣٤ ميجا» tag. At 1.6 s it swaps to a green «١٤٠ كيلو» and the page snaps in.
   - Top line: «نفس الصور… مو نفس الموقع», with «مو» in red.
2. **Contrarian**
   - Voice: «اللي يقولك "صوّر منتجاتك بأعلى دقة وحطها في الموقع"… قاعد يطيّر عملاءك.»
   - Visual: presenter with a finger raised on «يطيّر»; a card shows 34.2 MB.
3. **Superlative authority, specific to the field**
   - Voice: «أبطأ موقع شركة شفته هالسنة… السبب صورة وحدة.»
   - Visual: a screen recording of the gallery loading tile by tile with a «٠٠:٠٨» stopwatch. A red circle lands on the huge image.
4. **"You" plus an open loop**
   - Voice: «إذا عميلك فتح معرض أعمالك من جواله وطلع… هذا اللي صار له.»
   - Visual: point-of-view phone with a spinner. At 2.5 s the thumb swipes the app away.
5. **Split screen and money lost**
   - Voice: «موقعك ياخذ ٣٤ ميجا من باقة كل عميل… وأنت تدفع إعلانات عشان يدخله.»
   - Visual: top half stuck at 30 %, bottom half instant. A tag drops in: «إعلانك ← صفحة ما فتحت».

Verify the real 34 MB → 140 KB numbers before publishing.
