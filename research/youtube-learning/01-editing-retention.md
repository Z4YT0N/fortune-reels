# YouTube learning 01: editing, pacing and retention for Reels / TikTok (2026-11-06)

Goal: pull concrete, engine-ready editing rules for an automated Arabic (Gulf) reel engine built on HyperFrames
(HTML/GSAP rendered to video), collage and motion-graphics style, mostly voice-over, not talking heads.

## How this was researched, and the limits

- vidIQ ran out of credits after 2 searches, so candidates were found by scraping YouTube search result pages,
  and the two missing videos were checked against their downloaded thumbnails.
- Transcripts: YouTube's caption endpoint returned HTTP 429 (rate limit) for this IP all session. Transcripts
  were read from YouTube's own "Show transcript" panel through `agent-browser`. That worked for **4 videos only**.
  Panels for the other candidates stayed empty after 3 tries.
- So this file studies **4 videos in depth**, not the 6-8 asked for. The candidates that were found but could
  not be read are listed at the end. Nothing below is taken from a video whose transcript was not read.
- View counts are as shown on YouTube on 2026-11-06.

## The two unmatched videos from the earlier pass

- **(b) "INSTAGRAM REELS TUTORIAL", blonde woman, phone with a reels grid: FOUND.**
  *INSTAGRAM REELS TUTORIAL 2026 | How to Create 20 Reels in 1 hour*, Modern Millie,
  https://www.youtube.com/watch?v=1FfxkrCoTOw (379,814 views; uploaded about 3 years ago and retitled "2026").
  The thumbnail matches all three cues. **The transcript could not be read** (panel empty, captions endpoint 429),
  so no rules are taken from it.
- **(a) "TUTORIAL", "10.1K -> 15.2M", "Mom I just won an OSCAR", man pointing: NOT FOUND.**
  Searches for the thumbnail text, the Ke Huy Quan "Mom, I just won an Oscar" clip, viral-edit recreation
  tutorials and "15M views edit tutorial" were checked against about 20 thumbnails (Joseph | Video Editing,
  The Nicks Edit, Calen Chan, FANCY, AI-pocalypse, Videotrix and others). None matched.
  **Substitutes:** videos 2 and 3 below. Both are step-by-step recreations of a viral speech-over-visuals reel
  (an emotional quote laid over cut-up footage), which is what (a) most likely teaches.

---

## 1. Viral minimal reels built by an AI (motion-graphics style)

- Title: How to Edit VIRAL Minimal Instagram Reels Using Opus 5.5! (New Style in 2026)
- Channel: Joseph | Video Editing
- URL: https://www.youtube.com/watch?v=g9xoKm5DEeU
- Views: 171,005 (published 5 days before this note; strong early velocity)

This one is closest to our engine: an AI agent plans and builds a minimal motion-graphics reel in code (Remotion)
from a voice track.

- **Two fonts per caption.** A plain sans (Inter) for most words plus a serif italic (Playfair Italic) for the key
  word. Each line is **5 words or fewer**. The 1-2 most important words go **bold and centred**, and the rest sit
  above or below them, smaller.
- **Ten scene types**, all on one shared look (paper texture, dark or white background, one blue accent):
  B-roll with text; painting with text plus a quick camera slide-in; a **line that draws and leads into text**,
  with the camera tracking the line; a line leading into illustrations (zigzag for "phases"); text-only scene with
  big quotation marks; centred illustration with text around it; side illustration with text on the other side
  (for "two things at once"); an object call-out; and a graph scene (glowing thin grid, a ball riding the line,
  camera following it).
- **B-roll treatment:** light paper texture, darkened edges, slightly blurred edges so the eye goes to the focal
  point, and text laid over it that describes the scene.
- **A-roll vs visual rule** (the core pacing rule): when the speaker *announces* a new item, stay on the speaker or
  a plain caption. When he *describes* it, *show* it. Example: "up and up and up" became a graph line that climbs one
  step on every spoken "up".
- **Literal visual sync:** a long flat line for "slow and steady"; a spiral illustration for "spirals"; a cycling
  circle of options for "maybe I'll be a clown or a firefighter".
- **End on a text-only quote scene** (quotation marks) carrying the thesis line.
- **Silence removal:** a word-level transcript at millisecond precision, every silence cut, **30 ms padding** kept.
- **Plan before build.** The agent produces a plan document (script on one side, a suggested scene type per line on
  the other). A human picks a scene per line, and only then is anything built. Left alone, the AI "is not creative
  enough" at planning.
- **Train on references.** 20 reference reels, about 130 screenshot pieces sorted into the 10 scene types on a board,
  and 225 extracted animations with key-frame sheets. Videos teach animation logic and timing; the board teaches
  design.
- **Expect the first render to be 60-70% done.** His six revision notes are a useful QA checklist: weak text on the
  first scene, a rough cut between two animations, a heavy texture that did not move with the animation, a bad cut
  at 0:24, a scene that needed more screen time, missing quote marks on the end card.
- **Sound pass last:** cinematic music bed, **clicks on text**, **highlighter sound on graph draws**, whooshes on
  transitions. Time spent: about 2 h total (15 min cut and plan doc, 15 min human planning, 60 min build, 10 min
  revisions, 15 min sound).

## 2. Cinematic motivational speech edit (substitute for "a")

- Title: How to Edit Viral Cinematic Motivational Edits Step-by-Step! (Complete Masterclass)
- Channel: Joseph | Video Editing
- URL: https://www.youtube.com/watch?v=R21yXIcRz7k
- Views: 129,782

- **Three layers make the edit:** a story from speaker clips, footage that *shows* what is said (a speaker says
  "discipline", the footage shows someone training), and sound design that puts the viewer inside the scene.
- **Story assembly:** pick one topic with plenty of quotes and plenty of footage. Pull clips from 3 speakers, each
  pass looking for clips that *complement* the earlier ones. Fit everything into **under 60 s**.
- **Cut to the music's energy map.** Place a spoken clip when the track gets intense and leave the quiet parts
  empty. Trim clips so each one ends before the music dips. **Hard-cut the track into a more intense section on the
  strongest line** so the beat drop lands on it.
- **Loop the ending:** close on a line the speaker said just *before* the hook line, so the end leads back into
  the start.
- **Fast-cut sequence spec:** clips **2 frames** long with **2-frame gaps**. Fill the gaps with "mystery" shots
  (black hole, Earth, an eye), all **circles aligned to the same centre**, so the cuts match shape to shape.
  Use the **invert** effect on some of them and plain on others. A second sequence uses **3 frames on, 3 off**.
- **Word-bank flash:** about 20 screenshots of one keyword ("control") in different articles, each aligned so the
  word sits at the same spot, cut at 2 frames each. Only the keyword stays still and everything around it flickers.
  Works well with a fast click on every frame.
- **One unifying grade on everything:** black and white (saturation at 0) plus an edge-only layer (Gaussian blur 50,
  noise 35 in mono, chromatic aberration) masked with an inverted ellipse at feather 200. It makes mixed stock look
  like one film.
- **Repetition = new visual + bigger text.** Each time the speaker repeats "do a little bit more", show a new clip
  and make the word larger, with a **bass drop on each repetition** over a riser.
- **Climax section:** cut on every beat, black frames during silences, the hardest clips last in a "hyper fast" run,
  and a recurring base shot (Earth) to come back to.
- **Text:** stacked word-by-word blocks, each word timed to when it is spoken, mixed sizes and two families (clean
  plus condensed), **difference blend mode** over footage. Key words get an opacity on/off "glitch".
- **Sound recipe:** **one click per cut** (cut a click track and align each click to a cut), a **riser under each
  build with its peak on the section change**, riser volume about **-10 dB**, a **heartbeat fading in from silence to
  0 dB** under a build, a **bass hit on a realisation line**, a riser layered under the hit so the energy carries
  into the next line, and **medium reverb** on diegetic one-shots (an alarm clock).

## 3. Motivational speech reel, "Bumblebee" edit (substitute for "a")

- Title: How to Edit a Viral Motivational Speech Reel in Premiere Pro (Bumblebee Edit)
- Channel: The Nicks Edit
- URL: https://www.youtube.com/watch?v=y_0Ph71wz8U
- Views: 19,005 (4 months old; included as a close format match, not for its reach)

- **Line up the beat drop with the most powerful line of the speech.** After the speech ends, **let the music run on
  alone** for a few seconds before the end. Its creator calls this the timing that makes a speech edit feel
  "emotionally satisfying".
- **Caption pair:** Helvetica Bold for the line plus an elegant script (Edwardian Script) for the one highlighted
  word, centred, larger, **line spacing tightened so they nearly overlap** into one block.
  **Difference blend mode** makes the text react to what is behind it.
- **Word-by-word reveal** synced to the voice, with the whole line **sliding slightly left to right** while it types
  in, so it is never static.
- **Highlighted-word flicker:** opacity 100 -> 0 -> 25-50 -> 0 -> 100 over a few frames, then it holds.
- **Image flicker sequence:** 4-5 cut-out PNGs of the subject, **one every 10 frames** (about 3 per second at
  30 fps), like stop motion.
- **Motion recipe for cut-outs:** motion blur on (shutter angle 180). The image enters from below, eases to centre
  and leaves downward. The curve is **fast, slow in the middle, fast out**. Rotation goes from **-20 to +20 degrees**,
  fastest in the middle. Next scene enters from the top and leaves left. **Text copies the image's exit motion
  (position only, no rotation)** so they leave as one unit.
- **Half-frame placement:** group text and image, scale up and park the group on one half of the frame.
- **Closing scene:** speaker audio only (video removed), inverted cut-out at **50% opacity** behind the text, and
  text switched back to **normal blend** so the final line is clean and readable. The last line reveals word by word.
  End card: "edited by" credit.

## 4. Sound design for short-form (three stages)

- Title: Master Viral Sound Design for Short-Form Content! (The Ultimate Guide)
- Channel: Joseph | Video Editing
- URL: https://www.youtube.com/watch?v=HqPDRa7i97s
- Views: 108,149

- **Principle:** editing turns words into visuals; sound design brings those visuals to life. Every on-screen action
  gets a matching sound. He names missing sound design as the most common reason an edit "feels like something is
  missing".
- **Stage 1, motion = whooshes.** Every pop-up, slide-in, slide-out and zoom gets a whoosh. **Align the whoosh's
  peak to the frame with the most motion blur** (the fastest point of the animation). Short whoosh for small moves,
  longer one for zooms. When two moves overlap, use a small whoosh with a bigger one layered under it.
- **Stage 2, texture = clicks and objects** (he says this stage makes the biggest difference):
  - text pop-ups -> click (double click for two words);
  - glows -> **digital click or bell**;
  - a rectangle or line drawing on -> **highlighter / marker** sound;
  - lists or numbers flicking through, rising charts -> **"data" sounds**;
  - on-screen mouse / keyboard / pencil -> the literal sound;
  - a build of three such shots -> layer them so they **stack up in intensity**.
- **Stage 3, risers and hits.** First decide where anticipation should build and where it should release. A riser
  peaks at the end of a build (cover its rough peak with a click). A hit lands on the payoff or punchline (he uses an
  explosion as comic release). A riser also **teases into the next section**.
- **Five-type checklist:** texture sounds, whooshes, risers and hits, meme sounds (sparingly, for humour), digital
  sounds for minimal animations.

---

## Found but not studied (transcript unavailable this session)

These are strong candidates for a second pass once captions can be fetched again (vidIQ credits or a different IP):

| Video | Channel | Views | Topic |
|---|---|---|---|
| [How to get retention SO HIGH your shorts always go viral](https://www.youtube.com/watch?v=IPW-MF8Kp0I) | Logan Smith | 370K | retention / pacing |
| [How to edit SO good your viewers get addicted to your videos](https://www.youtube.com/watch?v=sLgHqZSe2o0) | Learn By Leo | 6.0M | retention editing |
| [18 Psychology Tricks to Get Viewers Addicted to Your Videos](https://www.youtube.com/watch?v=g_6TIu7zHDw) | Kallaway | 261K | pattern interrupts / psychology |
| [Give me 15 mins, and I'll make your hooks impossible to skip](https://www.youtube.com/watch?v=2byPP_9F0-Q) | Kallaway | 1.15M | hooks |
| [3 Sound Design Secrets That Feel Like CHEATING](https://www.youtube.com/watch?v=tzfzkTAQsnE) | Herman Huang | 1.07M | sound design |
| [Why some Instagram Reels explode (and most don't)](https://www.youtube.com/watch?v=s8602PzsUtE) | Modern Millie | 41K | why reels get no views |
| [Why 90% Of Instagram Reels Die At 200 Views](https://www.youtube.com/watch?v=LaC_nxv9N8Q) | Ryan Sterling | 22K | why reels get no views |
| [How Pro Editors Use B-Roll](https://www.youtube.com/watch?v=9jRZIqPQHm8) | Inside The Edit | 38K | B-roll density |
| [INSTAGRAM REELS TUTORIAL 2026](https://www.youtube.com/watch?v=1FfxkrCoTOw) | Modern Millie | 380K | thumbnail (b) |

---

## Rules to adopt for our engine

Max 20, de-duplicated. Video numbers refer to the sections above. Numbers come from the transcripts; they are
starting values to test against our own retention data, not proven optima.

1. **Plan, then build.** For every script line, the engine first outputs a scene plan (line -> scene type -> asset),
   and a person or a strict rule approves it before rendering. Do not let generation choose scenes freely. (1)
2. **Fixed scene library on one shared look.** Ship about 8-10 scene types (caption-only, B-roll + text, line-draw
   into text, line into icons, quote card, centred illustration, side illustration, object call-out, graph). Every
   type uses the same background texture, edge treatment and **one accent colour**. (1)
3. **Announce = plain, describe = show.** A new point or list item opens on a plain caption or the presenter
   element. The description that follows gets the visual scene. (1)
4. **Literal sync:** every concrete noun or number in the voice-over drives the visual at the moment it is spoken
   (a number counts up on the number; "grows" = a line climbing on each beat word). (1, 2)
5. **Caption block = at most 5 words.** One or two key words bold and centred in a second family (for Arabic: a
   display or calligraphic face against a clean sans, like IBM Plex Sans Arabic). Remaining words smaller above or
   below. Tight line spacing so the block reads as one unit. (1, 3, 2)
6. **Word-by-word reveal timed to the voice**, with a slow 1-axis drift on the whole line while it reveals. Never a
   static text block. (3, 2)
7. **Silence removal:** cut every pause from the voice-over using word timestamps, keeping **30 ms padding**. (1)
8. **Cut to the music's energy map.** Put voice lines on the loud sections and let quiet sections breathe. Make the
   **beat drop land on the strongest line**, and let music run **2-4 s alone after the last line**. (2, 3)
9. **Loop the ending:** the last line or visual leads back into the first frame, so the reel replays cleanly. (2)
10. **Repetition escalates:** when a word or idea repeats, swap the visual and scale the text up each time, with a
    bass hit on each repeat over one rising bed. (2)
11. **Fast-flash bursts as pattern interrupts:** 2-3 frame clips with equal gaps for 1-2 s at a build or a climax,
    shapes aligned to a fixed centre (match on shape). Use these sparingly, as accents; at least 2 s of calmer
    shots between bursts. (2)
12. **Keyword flash:** for a key term, flash about 10-20 frames where only that term stays locked in place while its
    surroundings change (screenshots, UI, documents), 2 frames each, with a fast click. Strong fit for software
    topics (the same word across many app screens). (2)
13. **Cut-out motion preset:** motion blur on; ease-in-out position (fast, slow, fast); rotation -20 to +20 degrees;
    exit direction changes scene to scene (bottom, top, left). Text uses the image's exit motion without the
    rotation. (3)
14. **Image flicker strip:** 4-5 cut-outs of one subject at **10 frames each** to show variety (several apps, several
    clients, several screens). (3)
15. **One unifying grade over all stock and screenshots** (shared texture, edge darkening or blur, one colour
    treatment) so mixed sources read as one film. Texture must move with the animation, not sit still. (2, 1)
16. **Sound: whoosh on every move, peak on the fastest frame.** Small whoosh for small moves; layer a bigger one for
    zooms or double moves. (4, 2)
17. **Sound: texture map.** Text in -> click; glow -> digital click or bell; line or box draws -> highlighter;
    numbers, lists, charts -> data sound; UI action on screen -> real mouse or keyboard sound. One click per hard cut
    in fast sequences. (4, 1, 2)
18. **Sound: risers and hits by plan.** Mark builds and payoffs in the script. Riser (about -10 dB) peaks on the
    section change or payoff; a hit lands on the realisation line; a riser under the hit carries the energy into the
    next line. Optional heartbeat fading in under a tense build. (4, 2)
19. **End on a clean, readable thesis card:** a quote-style text scene, normal blend (no difference mode), the
    background visual faded to about 50% opacity, the line revealed word by word, then the brand or CTA. (1, 3)
20. **QA pass before publishing:** check every cut between scenes for roughness, any text that reads badly on its
    frame, textures that do not move with the motion, and scenes that leave the screen before the idea lands.
    Expect the first render to be about 60-70% done. (1)
