# Carousels, static posts, stories

**Working examples:**
- Carousels: `content/2026-11-first10/carousels/` (`five-questions`, `six-steps`, `audit-14`). The shared kit is `carousels/_kit/`: Plex fonts, `base.css`, `kit.js`, `logo.svg`, `mark.svg`, `render.sh`, `slice.py`.
- Statics: `content/2026-11-first10/statics/` (`make.py`, `li-1108-gallery.html`, `li-1111-scope.html`).
- Stories: `content/2026-11-first10/stories/`.
- Older art-direction bar: `posts/2026-11-artdirection/` (p1–p3).

## Sizes
- Instagram carousel and LinkedIn static: 1080x1350.
- Story: 1080x1920.
- LinkedIn carousel: 1080x1350 slides, delivered as PNGs plus a zip.

## How to build
1. **Concept first.** Pick ONE visual metaphor per piece: an image-led hero with at most 12 words and type that lives in the picture.
2. **Images:**
   - Reuse first: `posts/2026-11-artdirection/`, `posts/2026-11-test/v2/gen`, `reels/007-style-lab/*/assets`, the reel keyframes `reels/01*/gen/K*`.
   - If you need a new one, use Flow Nano Banana Pro through `vendor/flow-locked.sh` (aspect 3:4 or 9:16). At most 4 new images.
3. **Layout:**
   - HTML with Plex only and 80 px margins. Keep the brand colours.
   - Footer: `www.fortunecode.org` and `+20 10 98066484`.
4. **A carousel is one panorama** (`carousel.html`, saved as `_pano.png`), sliced into slides with `slice.py`, so objects can cross slide edges.
5. **Render:** `bash content/2026-11-first10/render.sh <dir> <w> <h> name...`. It runs agent-browser: viewport, open, `wait --load networkidle`, wait 700, screenshot.
   - Never pipe the command that opens the session.
6. **Check:**
   - Read every PNG.
   - Do at least 2 iterations.
   - Look for: Arabic joins intact, nothing clipped, no client names, the new number.
7. **Contact sheet:** `contact-sheet.jpg` for WhatsApp, plus `slides.zip` and `caption.txt`.

## Copy
- **Instagram:** a Gulf hook, a short Gulf body, and the CTA «اكتب انطباع بالتعليقات».
- **LinkedIn:** English, plain and specific. No hype words.
- **Facts:** only the allowed facts (rules.md §3).
- **Claims waiting for the owner's OK** (from first10, 2026-11-07):
  - IG carousel slide 7: the ownership wording;
  - the LinkedIn "handoff note" slide;
  - "a test link per milestone";
  - "Opens instantly";
  - "'Done' is what both sides signed".
