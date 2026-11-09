// Injected by safezone_check.py. Seeks the composition and returns every text glyph box and every
// [data-key] box that is visible (effective opacity >= 0.5), not in transit, and outside the safe zone.
(async () => {
  const Z = { x0: 60, x1: 960, y0: 230, y1: 1440 };
  const TOL = 4; // px of tolerance for anti-aliasing / boil jitter
  const main = document.querySelector('#main');
  const tl = window.__timelines && window.__timelines.main;
  if (!tl) return JSON.stringify({ error: 'no window.__timelines.main' });
  const D = parseFloat(main.dataset.duration);
  const step = parseFloat(window.__szStep || 0.2);
  const effOpacity = (el) => { let o = 1; for (let e = el; e && e !== document.body; e = e.parentElement) { const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.display === 'none') return 0; o *= parseFloat(cs.opacity); } return o; };
  const inTransit = (el, set) => { for (let e = el; e && e !== main; e = e.parentElement) { if (e.dataset && e.dataset.transit === '1') return true; if (set.has(e)) return true; } return false; };
  const label = (el) => (el.id ? '#' + el.id : '') + (el.dataset.key ? '[' + el.dataset.key + ']' : '') + (el.classList.contains('w') ? '«' + el.textContent + '»' : '');
  const out = [], times = [];
  for (let t = 0; t <= D - 0.05; t += step) {
    const tt = Math.round(t * 100) / 100;
    tl.seek(tt, false); window.dispatchEvent(new Event('hf-seek'));
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    const transit = window.__qaTransit ? window.__qaTransit(tt) : new Set();
    const mr = main.getBoundingClientRect();
    const cands = [];
    document.querySelectorAll('.tk .w').forEach((w) => {
      // clip the glyph box to its mask: a word risen out of / not yet into its mask is not on screen
      const r = w.getBoundingClientRect(), m = w.parentElement.getBoundingClientRect();
      const x0 = Math.max(r.left, m.left), y0 = Math.max(r.top, m.top), x1 = Math.min(r.right, m.right), y1 = Math.min(r.bottom, m.bottom);
      if (x1 - x0 < 4 || y1 - y0 < 4 || !w.textContent.trim()) return;
      cands.push([w, { left: x0, top: y0, right: x1, bottom: y1 }]);
    });
    document.querySelectorAll('[data-key]').forEach((el) => cands.push([el, el.getBoundingClientRect()]));
    for (const [el, r0] of cands) {
      if (effOpacity(el) < 0.5 || inTransit(el, transit)) continue;
      const r = { x0: r0.left - mr.left, y0: r0.top - mr.top, x1: r0.right - mr.left, y1: r0.bottom - mr.top };
      if (r.x1 < 0 || r.x0 > 1080 || r.y1 < 0 || r.y0 > 1920) continue; // fully off-canvas = not shown
      const edges = [];
      if (r.x0 < Z.x0 - TOL) edges.push('left'); if (r.x1 > Z.x1 + TOL) edges.push('right');
      if (r.y0 < Z.y0 - TOL) edges.push('top'); if (r.y1 > Z.y1 + TOL) edges.push('bottom');
      if (edges.length) out.push({ t: tt, el: label(el), box: [r.x0, r.y0, r.x1, r.y1].map((v) => Math.round(v)), edges });
    }
    times.push(tt);
  }
  return JSON.stringify({ samples: times.length, violations: out });
})()
