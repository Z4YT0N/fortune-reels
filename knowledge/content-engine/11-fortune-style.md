# 11. Fortune style: the house look (owner pick 2026-11-07)

The owner saw 4 directions (`research/style-bible-2026-11/styles-ABCD.jpg`) and picked **B + C**: «2 , 3 حلوين فشخ».
- **B:** riso collage: halftone black-and-white photo cut-outs, mis-registered green riso ink, torn paper, tape.
- **C:** a black-and-white documentary photo, with green designer marker on top: circle, arrow, dashed selection box with handles, cursor.

## The fixed prompt block
`research/style-bible-2026-11/bible.txt`. Paste it into EVERY still or video prompt.
- Style references for Gemini stills: `B.png` + `C.png` (`--ref`). The man in C is the recurring character.
- Green #00DB33 goes ONLY on the one object that matters in the moment, plus the marker marks. Everything else is black, grey and paper.
- The top quarter of the frame stays calm for type. No text inside generated images.

## Pipeline that worked (reel 006 test, 2026-11-07)
1. **Keyframes:** Gemini stills K0..Kn with the bible + refs (`research/style-bible-2026-11/K*.png`), one per beat boundary.
2. **Upload to Flow** (dedicated Brave on CDP 9333) with agent-browser:
   - Hook `HTMLInputElement.prototype.click` so the hidden file input is kept in the DOM, then click "Upload media".
   - `agent-browser upload "#fcFile" K0.jpg ...`, then click "I agree" on the rights dialog.
3. **Generate in Flow's agent panel** (default video model set to Omni 1.2 Flash):
   - Attach Ki and Ki+1 as ingredients.
   - Prompt: "frames-to-video, Ki as FIRST frame, Ki+1 as LAST frame, one continuous move, no cut…", then click Approve.
   - Omni 1.2 frames-to-video at 720p costs 12 credits for 4 s and 15 for 5 s.
   - If you send a new message before approving, the old request is superseded and the agent re-asks for both.
4. **Download** the clips via `flow_video_status` (it returns signed URLs) with curl. Retime each to the voice and concat to `bg.mp4` at 1080x1920 / 30 fps.
   - Chained end/start frames make the film continuous: no slides.
5. **HyperFrames** adds only the type, grain and sound (`reels/006-gallery-continuity/test.tpl`).
   - Type sits on small paper scraps.
   - The text column scrolls up beat by beat; it never clears and rebuilds.

The vendored google-flow-mcp protocol already has start_end_frames, but its tool exposes no frame or upload parameters. Use the UI route above.
