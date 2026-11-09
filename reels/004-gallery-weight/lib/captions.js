// Word-by-word Arabic captions in the reserved zone (y 1180-1440). CAPS comes from tools/captions.py:
// [{ w: [[word, startSec, isHighlight], ...], end: sec }, ...] with times already on the sped-up audio.
export function mountCaptions(tl, CAPS, el) {
  CAPS.forEach((c, i) => {
    const div = document.createElement("div"); div.className = "chunk"; el.appendChild(div);
    c.w.forEach(([w, s, hl]) => {
      const sp = document.createElement("span");
      // Latin words and digits use Inter; Arabic punctuation may trail them
      if (/^[A-Za-z0-9.,%+"]+[،.:]?$/.test(w) && /[A-Za-z0-9]/.test(w)) sp.classList.add("en");
      sp.textContent = w; if (hl) sp.classList.add("hl"); div.appendChild(sp);
      tl.fromTo(sp, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out", immediateRender: false }, Math.max(0, s - 0.04));
    });
    tl.set(div, { opacity: 1 }, Math.max(0, c.w[0][1] - 0.04));
    if (i < CAPS.length - 1) tl.to(div, { opacity: 0, duration: 0.1 }, c.end - 0.08);
  });
  // the hook caption is on screen from frame 1
  const first = el.querySelector(".chunk span");
  if (first) tl.set(first, { opacity: 1, y: 0 }, 0);
}
