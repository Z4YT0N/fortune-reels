// shared helpers for wide carousel pages (N x 1080) and single posts
const W = 1080, S = (i, x) => (i - 1) * W + x;
const stage = document.getElementById('stage'), M = document.getElementById('mk');
function el(html, z = 10) { const d = document.createElement('div'); d.innerHTML = html.trim(); const n = d.firstChild; if (!n.style.zIndex) n.style.zIndex = z; stage.appendChild(n); return n; }
const P = (d, cls = 'mk', st = '') => M.insertAdjacentHTML('beforeend', `<path class="${cls}" d="${d}" style="${st}"/>`);
function arrowHead(x, y, ang, len = 40, st = '') { const a = ang * Math.PI / 180, s = .55;
  P(`M${x - len * Math.cos(a - s)},${y - len * Math.sin(a - s)} L${x},${y} L${x - len * Math.cos(a + s)},${y - len * Math.sin(a + s)}`, 'mk', st); }
function ct(i, top, html, size, st = '', cls = '') { return el(`<div class="t ${cls}" style="left:${S(i, 540)}px; top:${top}px; font-size:${size}px; ${st}">${html}</div>`, 30); }
function rt(i, right, top, html, size, st = '', cls = '') { return el(`<div class="t ${cls}" style="left:auto; right:${PAGE_W - S(i, 1080 - right)}px; transform:none; text-align:right; top:${top}px; font-size:${size}px; ${st}">${html}</div>`, 30); }
function glow(cx, cy, r, a = 1) { el(`<div class="glow" style="left:${cx - r}px; top:${cy - r}px; width:${2 * r}px; height:${2 * r}px; opacity:${a}"></div>`, 1); }
function device(src, nw, quad, left, top, width, z = 5, st = '', mask = 'dev') {
  const k = width / nw;
  el(`<img class="${mask}" src="${src}" style="left:${left}px; top:${top}px; width:${width}px; ${st}">`, z);
  return quad.map(([x, y]) => [left + x * k, top + y * k]);
}
function onScreen(node, w, h, Q, z = 6) { node.style.transform = quadTransform(w, h, Q); node.style.transformOrigin = '0 0'; node.style.zIndex = z; stage.appendChild(node); return node; }
function screen(w, h, html, bg = '#fff', st = '') { const d = document.createElement('div'); d.className = 'abs scr'; d.style.cssText = `left:0; top:0; width:${w}px; height:${h}px; background:${bg}; overflow:hidden; ${st}`; d.innerHTML = html; return d; }
function cursor(x, y, z = 45) { return el(`<svg class="abs" style="left:${x}px; top:${y}px" width="50" height="68" viewBox="0 0 22 30"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 17 L20 17 Z" fill="#fff" stroke="#121416" stroke-width="1.6" stroke-linejoin="round"/></svg>`, z); }
function brand(i, opt = {}) {
  el(`<div class="frame" style="left:${S(i, 40)}px; top:40px; width:1000px; height:1140px"></div>`, 50);
  el(`<img class="logo" src="assets/logo-en-h-primary-white.svg" style="left:${S(i, 540)}px; top:82px; transform:translateX(-50%)">`, 50);
  foot(S(i, 66), 1208, 948);
}
const SAVE_ICON = '<svg width="28" height="38" viewBox="0 0 30 40"><path d="M3 3 H27 V37 L15 27 L3 37 Z" fill="none" stroke="#00DB33" stroke-width="4" stroke-linejoin="round"/></svg>';
function ring(r, pad = 50, padY = 40, st = '') { // hand-drawn ellipse around a DOMRect
  const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2, rx = r.width / 2 + pad, ry = r.height / 2 + padY;
  P(`M${cx + rx * .9},${cy - ry * .7} C ${cx + rx * 1.15},${cy + ry * .9} ${cx - rx * .3},${cy + ry * 1.15} ${cx - rx},${cy + ry * .2} C ${cx - rx * 1.2},${cy - ry * .8} ${cx + rx * .1},${cy - ry * 1.2} ${cx + rx * .95},${cy - ry * .45}`, 'mk', st);
}
const SVGDEFS = '<defs><filter id="rough"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3"/></filter></defs>';
