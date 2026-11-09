// Injected by overlap_check.py. Seeks the composition every 0.1 s and reports:
//  - overlaps: a visible text glyph (.tk .w) whose box overlaps a visible [data-key] image (photo, phone,
//    face, cut-out) by more than 5 % of the glyph box;
//  - clips: a text glyph at full opacity, not in transit, whose box is cut by its mask (or by the canvas)
//    so that less than 85 % of it shows. overlap_check.py fails only runs longer than 0.3 s.
(async () => {
  const main = document.querySelector('#main');
  const tl = window.__timelines && window.__timelines.main;
  if (!tl) return JSON.stringify({ error: 'no window.__timelines.main' });
  const D = parseFloat(main.dataset.duration);
  const step = 0.1;
  const effO = (el) => { let o = 1; for (let e = el; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none') return 0; o *= parseFloat(cs.opacity); } return o; };
  const inTransit = (el, set) => { for (let e = el; e && e !== main; e = e.parentElement) { if (e.dataset && e.dataset.transit === '1') return true; if (set.has(e)) return true; } return false; };
  const area = (r) => Math.max(0, r.right - r.left) * Math.max(0, r.bottom - r.top);
  const inter = (a, b) => ({ left: Math.max(a.left, b.left), top: Math.max(a.top, b.top), right: Math.min(a.right, b.right), bottom: Math.min(a.bottom, b.bottom) });
  const overlaps = [], clips = [];
  let samples = 0;
  for (let t = 0; t <= D - 0.05; t += step) {
    const tt = Math.round(t * 100) / 100;
    tl.seek(tt, false); window.dispatchEvent(new Event('hf-seek'));
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    samples++;
    const transit = window.__qaTransit ? window.__qaTransit(tt) : new Set();
    const mr = main.getBoundingClientRect();
    const canvas = { left: mr.left, top: mr.top, right: mr.left + 1080, bottom: mr.top + 1920 };
    const keys = [...document.querySelectorAll('[data-key]')].filter((k) => effO(k) >= 0.5 && !inTransit(k, transit)).map((k) => [k, k.getBoundingClientRect()]);
    document.querySelectorAll('.tk .w').forEach((w) => {
      if (!w.textContent.trim()) return;
      const o = effO(w);
      if (o < 0.5) return;
      const full = w.getBoundingClientRect(), m = w.parentElement.getBoundingClientRect();
      const vis = inter(inter(full, m), canvas);
      if (area(vis) < 16) return;
      const label = (w.closest('.blk') ? w.closest('.blk').id : '') + '«' + w.textContent + '»';
      const moving = inTransit(w, transit);
      if (!moving) {
        for (const [k, kr] of keys) {
          const a = area(inter(vis, kr)) / area(vis);
          if (a > 0.05) overlaps.push({ t: tt, text: label, key: k.dataset.key, pct: Math.round(a * 100) });
        }
        const frac = area(vis) / Math.max(1, area(full));
        if (o >= 0.99 && frac < 0.85) clips.push({ t: tt, text: label, shown: Math.round(frac * 100) });
      }
    });
  }
  return JSON.stringify({ samples, overlaps, clips });
})()
