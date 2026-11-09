# Owner checklist: the delivery gate

**Why this file exists.** On 2026-11-06 the owner said every instruction he gives is never ALL followed: «ليه دائماً لازم تسيب حاجة». The rules were spread over many files, and nothing forced a final check against all of them. This file is that check.

**How to use it.** Before ANY reel goes to the owner (WhatsApp, Desktop, anywhere):
1. Go through every line below.
2. Write a `## Owner checklist` section in the reel's `NOTE.md`. Each line says PASS, FAIL or N/A, with evidence: a tool output, a still path, or a measured number.
3. One FAIL means no delivery. Fix it first.
4. New owner instructions are added HERE in the same turn they are given, as well as in memory.

## Platform and layout
- [ ] **Safe zone:** every text node and every key visual (faces, numbers, stamp, logo, product) inside x 60-960, y 230-1440 on 1080×1920. The right ~120 px stays free (buttons), the top 230 px free, and everything below y 1440 free. Proof: `safezone_check` passes with 0 violations, plus `qa/safezone-sheet.jpg`.
- [ ] No text over faces.
- [ ] Text never overlaps photos, phones, faces or cut-outs, and is never left half-revealed or clipped on screen (owner 2026-11-06). Proof: `overlap_check` PASS (> 5 % overlap with any data-key image, or < 85 % of a glyph shown for > 0.3 s, fails), plus a still at the moment each hero word is said.
- [ ] 9:16, 1080×1920, 30 fps. Frame 1 already moves and already carries the hook. No near-static first second.
- [ ] Nothing held longer than 2.5 s. No black frames, no dead frames between lines.
- [ ] **Motion is smooth, not "electrified"** (owner 2026-11-06; details in rules/motion.md, "Smooth motion"). Specifically:
  - camera at full fps, eased, continuous, one drift per beat, no shake;
  - exits 0.35-0.45 s;
  - no boil on text or people;
  - entrances 0.5-0.7 s with expo-out;
  - overshoot ≤ 3 %;
  - no more than 2 elements moving at once, and finished elements hold at least 0.6 s;
  - max 2 smear slams and 1 flash per reel.
  Proof: 12-frame strips at the 3 busiest moments.
- [ ] **One continuous film, not slides** (owner 2026-11-07: «كأنه سلايدات ورا بعض مش فيديو واحد كونتينوس»). Specifically:
  - Every beat change is MOTIVATED by something in the previous beat. An object travels, transforms, wipes or reveals the next beat; this is ROAR's flashlight beam wiping into maroon and the receipt printing from the pedestal.
  - Never clear to empty paper and rebuild.
  - At least one persistent thread object runs through the reel (ROAR's cursor, xx's teal paper).
  - One hero object per beat, big. No piling of 4-6 pieces and then holding.
  - The whole frame never sits static for more than 1 s. A finished piece may hold; the camera or the hero keeps living.
  - The layout changes beat to beat (not "headline top, object middle" every time).
  Proof: the transition map in NOTE.md (beat N becomes N+1 by X), plus a 4 fps strip of the full reel with no empty or rebuilt frames.

## Look (owner rules 2026-11-06)
- [ ] ROAR-style collage on paper: real cut-outs with soft drop-ins, shadows, scraps and tape. Not flat images in frames. Motion stays smooth (see the line above); stepping and boil only as a light accent on small scraps.
- [ ] Nothing looks AI-glossy. Real footage first (own screens, Pexels/Mixkit/destockd/archival/Envato via Tafeil), then Gemini cut-outs, then Flow. The source of every shot is logged.
- [ ] People in footage look Gulf/Saudi. No mismatched stock people.
- [ ] Brand colours only: #121416, #00DB33, #006A39, #F0F1F2. Logo flat, never 3D.

## Text (rules/text-motion.md)
- [ ] Font: the owner's Zain mob-long only (`assets/brand/fonts/zain/alfont_com_zain-mob-long500.ttf`), with Inter only for Latin glyphs.
- [ ] Craft visibly used:
  - overlapping cascades;
  - size hierarchy (hero 2-3× connectors);
  - highlight boxes;
  - built-in tail (kashida) reveal;
  - a shared-word or morph transition;
  - designer-tool marks;
  - text on scraps or tape;
  - anticipation and overshoot.
  Never plain black words appearing one after another.
- [ ] Arabic joins intact (never per-letter split). Dots not clipped.

## Voice and sound
- [ ] Voice: plain Gulf text, NO tashkeel, NO pronunciation dictionary. Follow ElevenLabs' official guidance (`knowledge/content-engine/06-voice.md`).
- [ ] Say plainly that the accent is unverified until the owner listens.
- [ ] Gulf vocabulary (وش، مو، تبي، يسوي…). Not Egyptian. Write «مبطئ / يبطئ / مبطئه» (not «مبطي / يبطي»): the owner says «مبطي» is not Saudi (2026-11-06).
- [ ] No continuous tick or loop. SFX only on real hits (about 15-20 per 35 s). Proof: `tick_check` regularity ≈ the voice-only baseline.
- [ ] No music bed unless the owner approved one.
- [ ] -14 LUFS, true peak ≤ -1 dBFS, no silence at the end.

## Script and facts
- [ ] ROAR 7-beat structure (or the approved format) + triple hook.
- [ ] One service × one buyer situation.
- [ ] Every number comes from FACTS. No client named without written approval.
- [ ] CTA: «اطلب فحص مجاني لموقعك» (proposed fixed CTA, pending owner confirmation).

## Delivery
- [ ] Owner checklist section filled in NOTE.md, every line PASS or N/A.
- [ ] Desktop copy + WhatsApp from fc-system only (never the main number, never clients).
- [ ] Credits used (Flow / Gemini / ElevenLabs) reported.

## Type lives in the scene (owner 2026-11-07)
- [ ] **No caption-like text.** Owner: «التكست كله في مكان واحد… كأنه كابشنز عادي مش من ضمن التصميم». Each line belongs to an object in its shot:
  - a design-tool label, a tag on the prop, a strip across the person, a notification or search bar on the phone, a marker arrow to the subject;
  - its position changes beat by beat;
  - it reacts to the picture (impact jolt, swallowed by the transition, whips out with the motion).
  Proof: key stills, one per beat, each with a different text position and carrier.
