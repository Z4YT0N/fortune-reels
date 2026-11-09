// Injected by motion_check.py. Seeks the composition every frame and asks the page how many
// separate motion events run at once (window.__qaMotion) and which pieces rest < 0.6 s between moves.
(async () => {
  const main = document.querySelector('#main');
  const tl = window.__timelines && window.__timelines.main;
  if (!tl || !window.__qaMotion) return JSON.stringify({ error: 'no __timelines.main or __qaMotion' });
  const D = parseFloat(main.dataset.duration);
  const hist = {}, over = [];
  let samples = 0;
  for (let f = 0; f / 30 <= D - 0.05; f++) {
    const t = f / 30;
    tl.seek(t, false); window.dispatchEvent(new Event('hf-seek'));
    const r = window.__qaMotion(t);
    hist[r.n] = (hist[r.n] || 0) + 1; samples++;
    if (r.n > 2) over.push(t.toFixed(2) + ' ' + r.units.join(','));
  }
  return JSON.stringify({ samples, hist, over, holds: window.__qaHolds ? window.__qaHolds() : [] });
})()
