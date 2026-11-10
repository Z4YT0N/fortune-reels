/* fx.js: the second kinetic library, every distinct text effect of the past reels as a named, reusable move.
 * Load it AFTER kinetic.js. Two ways in:
 *   const K = Kinetic.create(TL, { words: WORDS });  const X = Kinetic.fx(TL, K);        // inside a collage reel (shares K's colours)
 *   const X = KineticFx.create(TL, { stage, front });                                      // standalone (resolves the colours itself)
 * Sources: reels 001-012 and the 007 style lab (each move names its source file:line). Behaviour is the source's; hard-coded
 * text, positions, sizes and colours are parameters. Colours come from the brand CSS variables (--ink, --ink-deep, --paper,
 * --dark, --on-ink; fonts --font-hero, --font-label). Catalogue: fortune-content-engine references/effects-library.md.
 *
 * Rules (same as kinetic.js):
 *  1. Hidden state is set at BUILD time (gsap.set inside each move); reveals go through TL.to / TL.fromTo(immediateRender:false) / TL.set.
 *  2. Frame-baked loops (warp, orbit, counters, kashida, pendulum) are TL.set per frame through frames(): seek-safe, no onUpdate.
 *  3. Arabic is whole words only. A word's letters are never split in the DOM. The one exception is VISUAL slicing of a whole
 *     rendered phrase (flagWarp strips, sliceGlitch bands): every strip holds the complete phrase text and only clips it.
 *     Growing strings (searchBar, kashGrow) are ONE string that grows, so the joins re-form.
 */
(function () {
  "use strict";
  const CSS = `
    .fx-full { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
    .fx-abs { position: absolute; }
    .fx-wd { position: absolute; left: 0; top: 0; white-space: nowrap; direction: rtl; line-height: 1.3; font-family: var(--font-hero), sans-serif; font-weight: var(--hero-weight, 500); }
    .fx-lb { font-family: var(--font-label), sans-serif; font-weight: var(--label-weight, 600); }
    .fx-strip { position: absolute; top: 0; overflow: hidden; transform-origin: 50% 50%; }
    .fx-wtxt { position: absolute; top: 0; text-align: center; direction: rtl; white-space: nowrap; font-family: var(--font-hero), sans-serif; font-weight: var(--hero-weight, 500); }
    .fx-pill { position: absolute; border-radius: 999px; direction: rtl; white-space: nowrap; line-height: 1.25; display: flex; align-items: center; justify-content: center; font-family: var(--font-hero), sans-serif; }
    .fx-ol { position: relative; display: inline-block; white-space: nowrap; direction: rtl; line-height: 1.25; }
    .fx-ol .s, .fx-ol .f { display: inline-block; }
    .fx-ol .f { position: absolute; left: 0; top: 0; }
    .fx-ring { position: absolute; border: 4px solid var(--dark); border-radius: 48px; opacity: 0; pointer-events: none; }
    .fx-ripple { position: absolute; width: 120px; height: 120px; margin: -60px 0 0 -60px; border-radius: 50%; border: 5px solid var(--ink); opacity: 0; pointer-events: none; }
    .fx-lab { position: absolute; font-family: var(--font-label), sans-serif; font-weight: var(--label-weight, 600); font-size: 24px; white-space: nowrap; direction: rtl; }
    .fx-draw { position: absolute; overflow: visible; pointer-events: none; opacity: 0; }
    .fx-draw path { fill: none; stroke: var(--ink); stroke-width: 11; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 1; }
    .fx-guide { position: absolute; height: 0; border-top: 4px dashed var(--ink); }
    .fx-tag { position: absolute; top: 52px; border-radius: 34px; white-space: nowrap; display: flex; align-items: baseline; justify-content: center; direction: rtl; font-family: var(--font-hero), sans-serif; }
  `;
  function injectCss() {
    if (document.getElementById("kinetic-fx-css")) return;
    const s = document.createElement("style"); s.id = "kinetic-fx-css"; s.textContent = CSS;
    const k = document.getElementById("kinetic-css");
    if (k && k.nextSibling) document.head.insertBefore(s, k.nextSibling); else document.head.insertBefore(s, document.head.firstChild);
  }
  const cssVar = (n, fb) => (getComputedStyle(document.documentElement).getPropertyValue(n).trim() || fb);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const words = (s) => String(s).trim().split(/\s+/).filter(Boolean);
  const AR = (n) => String(n).replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[d]).replace(".", "٫");   // Arabic-Indic digits, Arabic decimal mark

  /** fx(TL, K, {stage, front}) -> the effect set bound to one timeline. K (from Kinetic.create) is optional. */
  function fx(TL, K, opt = {}) {
    injectCss();
    const F = 1 / 30, FPS = 30, TAU = Math.PI * 2;
    const stage = opt.stage || document.getElementById("stage") || document.body;
    const front = opt.front || document.getElementById("front") || stage;
    const C = (K && K.C) || { ink: cssVar("--ink", "#00DB33"), inkDeep: cssVar("--ink-deep", "#006A39"), inkSoft: cssVar("--ink-soft", "#5CF07E"),
                              paper: cssVar("--paper", "#F0F1F2"), dark: cssVar("--dark", "#121416"), onInk: cssVar("--on-ink", "#121416"), grey: "#a3a5a7" };
    const GREY = "#8B9096";
    const wholeWord = (K && K.wholeWord) || (window.Kinetic && window.Kinetic.wholeWord) || ((x) => x);
    const checkWords = (s) => { words(s).forEach((w) => wholeWord(w)); return s; };

    // ── maths + baking helpers (as in reels 008-011) ──
    const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
    const lerp = (a, b, p) => a + (b - a) * p;
    const ramp = (t, a, b) => clamp((t - a) / (b - a));
    const expoOut = (p) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));
    const inOut = (p) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
    const inCubic = (p) => p * p * p;
    const backOut = (p, s = 1.7) => 1 + (s + 1) * Math.pow(p - 1, 3) + s * Math.pow(p - 1, 2);
    const bump = (t, a, d) => { const p = ramp(t, a, a + d); return p <= 0 || p >= 1 ? 0 : Math.sin(Math.PI * p); };
    const frames = (a, b, fn) => { for (let f = Math.max(0, Math.round(a * FPS)); f <= Math.round(b * FPS); f++) fn(f * F, f); };
    const at = (t) => Math.max(0, t - 0.0004);
    let seed = 7; const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };

    function el(tag, cls, parent, css = {}, html = "") { const e = document.createElement(tag); if (cls) e.className = cls; Object.assign(e.style, css); if (html) e.innerHTML = html; (parent || front).appendChild(e); return e; }
    function measure(html, size, fam = "var(--font-hero)") {
      const s = el("span", "", document.body, { position: "absolute", left: "-5000px", top: "0", fontSize: size + "px", fontFamily: fam, whiteSpace: "nowrap", direction: "rtl", lineHeight: "1.3" }, html);
      const w = s.getBoundingClientRect().width; s.remove(); return w;
    }
    const fitSize = (text, maxW, maxS = 900, fam) => Math.min(maxS, Math.floor(100 * maxW / measure(esc(text), 100, fam)));
    // a whole word centred on (x, y) of its parent
    function word(parent, text, size, color, x, y, extra = {}) {
      const e = el("div", "fx-wd", parent, { fontSize: size + "px", color, left: x + "px", top: y + "px" }); e.textContent = checkWords(text);
      if (extra.stroke) e.style.webkitTextStroke = extra.stroke;
      gsap.set(e, { xPercent: -50, yPercent: -50, transformOrigin: extra.origin || "50% 50%" }); return e;
    }
    const ctr = (e, cx, cy) => { const r = e.getBoundingClientRect(); e.style.left = (cx - r.width / 2) + "px"; e.style.top = (cy - r.height / 2) + "px"; };   // as 008-011: frame coordinates

    // ═════════════ carriers ═════════════
    // pill tag (008 showreel.tpl:186-191): a rounded chip centred at (cx, cy), tilted rot (popIn reveals it)
    function pill(parent, text, o = {}) {
      const size = o.size ?? 74;
      const p = el("div", "fx-pill" + (o.label ? " fx-lb" : ""), parent, { fontSize: size + "px", background: o.bg ?? C.paper, color: o.col ?? C.dark, padding: `${size * 0.02}px ${size * 0.42}px ${size * 0.12}px`, zIndex: o.z ?? 8 });
      p.textContent = checkWords(text);
      if (o.border) p.style.boxShadow = `inset 0 0 0 4px ${C.dark}`;
      ctr(p, o.cx ?? 540, o.cy ?? 960); p._rot = o.rot ?? 0; return p;
    }
    // clean outline word (007 campfire.tpl:70-76): thick stroke layer + a fill layer on top in the ground colour, so joined Arabic
    // shows only its OUTER contour (plain -webkit-text-stroke also draws the inner joins)
    function outlineWord(parent, text, size, stroke = C.dark, fill = C.paper, sw = 3) {
      const o = el("span", "fx-ol fx-wd", parent, { fontSize: size + "px", position: "relative", left: "auto", top: "auto" });
      const s = el("span", "s", o, { color: stroke, webkitTextStroke: (sw * 2) + "px " + stroke }); s.textContent = checkWords(text);
      const f = el("span", "f", o, { color: fill }); f.textContent = text;
      return { o, s, f };
    }

    // ═════════════ warp / distort ═════════════
    // flagWarp (008 showreel.tpl:110-148): the WHOLE rendered phrase is cut into vertical strips; each strip is scaled and shifted
    // per frame (bow, wave, phase) so the phrase waves like a flag. Letters are never split: every strip carries the full phrase.
    // phrase: string or [words]; o: {t, cx, cy, size=200, strips=128, col, reveal:[s per word], w0=400, wBig=850, wHold=470, exitAt=2.06, exit=true, until}
    function flagWarp(parent, phrase, o = {}) {
      const ws = Array.isArray(phrase) ? phrase : words(phrase); ws.forEach((w) => wholeWord(w));
      const FS = o.size ?? 200, HP = Math.round(FS * 1.55), NS = o.strips ?? 128, t0 = o.t ?? 0;
      const rev = o.reveal || ws.map((_, k) => (k ? 0.4 : 0));
      const html = ws.map((w, k) => `<span style="opacity:var(--o${k})">${esc(w)}</span>`).join(" ");
      const w0 = Math.ceil(measure(html, FS)) + 60, cx = o.cx ?? 540, cy = o.cy ?? 860;
      const warp = el("div", "", parent, { position: "absolute", left: (cx - w0 / 2) + "px", top: (cy - HP / 2) + "px", width: w0 + "px", height: HP + "px", transformOrigin: "50% 50%", color: o.col ?? C.dark, zIndex: o.z ?? 5 });
      ws.forEach((_, k) => warp.style.setProperty(`--o${k}`, rev[k] <= 0 ? "1" : "0"));
      const sw = w0 / NS, strips = [];
      for (let i = 0; i < NS; i++) {
        const s = el("div", "fx-strip", warp, { left: (i * sw) + "px", width: (sw + 1.2) + "px", height: HP + "px" });
        s._u = (i + 0.5) / NS; strips.push(s);
        el("div", "fx-wtxt", s, { left: (-i * sw) + "px", width: w0 + "px", height: HP + "px", fontSize: FS + "px", lineHeight: HP + "px" }, html);
      }
      const sS = (o.w0 ?? 400) / w0, sB = (o.wBig ?? 850) / w0, sH = (o.wHold ?? 470) / w0, X = o.exitAt ?? 2.06, ex = o.exit !== false;
      const warpAt = (t) => {
        let S, bow = 0, wav = 0, x = 0, y = 0, op = 1;
        if (t < 0.45) S = sS * (1 + 0.16 * bump(t, 0, 0.22) + 0.12 * bump(t, 0.4, 0.2));
        else if (t < 0.72) { const p = ramp(t, 0.45, 0.72); S = lerp(sS, sB, backOut(p, 1.4)); bow = expoOut(p); wav = 0.15 * p; }
        else if (t < 1.2) { S = sB * (1 + 0.02 * Math.sin((t - 0.72) * 9)); bow = 1 - 0.45 * ramp(t, 0.72, 1.2); wav = lerp(0.15, 0.7, ramp(t, 0.72, 0.95)); }
        else if (t < 1.6) { const p = inOut(ramp(t, 1.2, 1.6)); S = lerp(sB, sH, p); bow = 0.55 * (1 - p); wav = lerp(0.7, 0.06, p); }
        else { S = sH; wav = 0.06; }
        if (ex && t >= X) { const p = inOut(ramp(t, X, X + 0.28)); S = lerp(sH, o.exitS ?? 0.28, p); x = lerp(0, 40, p); y = lerp(0, -95, p); op = t > X + 0.24 ? 0 : 1; }
        return { S, bow, wav, ph: t * 1.25, x, y, op };
      };
      // ends balloon (left end up, right end down), the middle pinches, a wave runs through
      const stripAt = (u, s) => {
        const c = 2 * u - 1, e = Math.pow(Math.abs(c), 1.05), w = 2 * Math.PI * (u * 1.15 - s.ph);
        const sy = (1 + s.bow * 3.6 * e) * (1 - 0.42 * s.bow * (1 - e)) + s.wav * 0.6 * Math.cos(w);
        const ty = (-s.bow * c * 0.4 + s.wav * 0.24 * Math.sin(w)) * HP;
        return { sy: Math.max(0.2, sy), ty };
      };
      gsap.set(warp, { opacity: 0, scale: warpAt(0).S });
      ws.forEach((_, k) => { if (rev[k] > 0) TL.set(warp, { [`--o${k}`]: 1 }, t0 + rev[k]); });
      let last = null;
      frames(t0, t0 + (ex ? X + 0.34 : (o.until ?? t0 + 2.4) - t0), (t) => {
        const s = warpAt(t - t0); TL.set(warp, { scale: s.S, x: s.x, y: s.y, opacity: s.op }, at(t));
        const flat = s.bow < 0.002 && s.wav < 0.002;
        if (flat && last === "flat") return;
        strips.forEach((st) => { const v = stripAt(st._u, s); TL.set(st, { y: v.ty, scaleY: v.sy }, at(t)); });
        last = flat ? "flat" : "w";
      });
      return { e: warp, strips };
    }

    // sliceGlitch (007 stomp.tpl:79-84, 144-170, 279-286): the word is built once per horizontal band (each band a full-frame wrapper
    // clipped to its strip); the bands jitter sideways on single frames as it arrives, and (o.out) jitter then fly apart.
    // o: {cx, cy, size=430, maxW, cuts:[y...], col, arrive:[[dx per band]...frames], out}
    function sliceGlitch(parent, text, o, t) {
      checkWords(text);
      let size = o.size ?? 430; if (o.maxW) size = Math.min(size, fitSize(text, o.maxW, size));
      const cx = o.cx ?? 540, cy = o.cy ?? 960;
      const cuts = o.cuts || [cy - Math.round(size * 0.116), cy + Math.round(size * 0.093)], ys = [0, ...cuts, 1920];
      const wraps = ys.slice(0, -1).map((y0, i) => el("div", "fx-full", parent, { clipPath: `inset(${y0}px -3000px ${1920 - ys[i + 1]}px -3000px)` }));
      const ws = wraps.map((w) => word(w, text, size, o.col ?? C.dark, cx, cy));
      const jitter = (a, fr) => fr.forEach((offs, f) => wraps.forEach((w, i) => TL.set(w, { x: offs[i % offs.length] || 0 }, a + f * F)));
      gsap.set(ws, { opacity: 0 }); TL.set(ws, { opacity: 1 }, t);
      jitter(t, o.arrive || [[-170, 130, -90], [90, -80, 150], [-40, 30, -25], [0, 0, 0]]);
      if (o.out !== undefined) {
        jitter(o.out - 0.16, [[-90, 70, -40], [40, -120, 80], [0, 0, 0], [-60, 35, 120], [25, -70, -30], [0, 0, 0]]);
        wraps.forEach((w, i) => TL.to(w, { x: i % 2 ? 1400 : -1400, duration: 4 * F, ease: "power3.in" }, o.out + i * F));
      }
      return { wraps, ws };
    }

    // unfold (007 optious/index.html:173-176): a giant word (or number) opens from a flat line: scaleY 0.02 -> 1 with a back overshoot
    function unfold(e, t) {
      gsap.set(e, { scaleY: 0.02, scaleX: 2.2, opacity: 0 });
      TL.set(e, { opacity: 1 }, t);
      TL.to(e, { scaleX: 1, duration: 0.3, ease: "expo.out" }, t);
      TL.to(e, { scaleY: 1, duration: 0.34, ease: "back.out(1.4)" }, t + 0.04);
    }

    // kashGrow (008 showreel.tpl:321-336 «ويستنى»; 008 ext.js:259-264 «يبطئ»; 009 showreel.tpl:159-171 «الفخم» «بطيء؟»; 010 ext.js:91-116 «صلحنا»):
    // ONE string grows its tatweel frame by frame (pre + ـ*n + post), so the word stretches while the joins stay intact.
    // n: o.n, or as many as fit in o.maxW. o.under: an element whose width follows the stretch (the progress-bar underline).
    function kashGrow(e, pre, post, a, b, o = {}) {
      wholeWord(pre + post);
      const size = o.size ?? (parseFloat(e.style.fontSize) || 140), fam = getComputedStyle(e).fontFamily;
      let N = o.n;
      if (N === undefined) { const maxW = o.maxW ?? 900; N = 0; while (N < (o.cap ?? 24) && measure(esc(pre + "ـ".repeat(N + 1) + post), size, fam) <= maxW) N++; }
      e.textContent = pre + post;
      const w1 = measure(esc(pre + post), size, fam), kw = (measure(esc(pre + "ـ".repeat(20) + post), size, fam) - measure(esc(pre + "ـ" + post), size, fam)) / 19;
      if (o.under) gsap.set(o.under, { width: 0 });
      let lk = -1;
      frames(a, b, (t) => {
        const p = ramp(t, a, b), n = Math.round(N * Math.pow(p, o.pow ?? 0.85));
        if (n !== lk) { TL.set(e, { textContent: n ? pre + "ـ".repeat(n) + post : pre + post }, at(t)); lk = n; }
        if (o.under) TL.set(o.under, { width: ((w1 + n * kw) * p) + "px" }, at(t));
      });
      return N;
    }

    // ═════════════ travel / paths ═════════════
    // spin (007 campfire.tpl:79-81): a word spins in (rotation 50 -> 0, blur, scale 0.7) or out (-45) like a dial
    function spinIn(e, t, d = 0.2) { gsap.set(e, { opacity: 0 }); TL.fromTo(e, { rotation: 50, scale: 0.7, filter: "blur(10px)", opacity: 0 }, { rotation: 0, scale: 1, filter: "blur(0px)", opacity: 1, duration: d, ease: "power3.out", immediateRender: false }, t); }
    function spinOut(e, t, d = 0.14) { TL.to(e, { rotation: -45, scale: 0.8, filter: "blur(10px)", opacity: 0, duration: d, ease: "power2.in" }, t); }

    // whipOut (007 campfire.tpl:284-298 «ويطلع»): a tiny wind-up, then the word whips off with skew, stretch and blur, leaving a thin
    // ink line that draws behind it and retracts. o: {dir=-1 (left), trail:{parent, x, y, w}}
    function whipOut(e, t, o = {}) {
      const dir = o.dir ?? -1;
      TL.to(e, { x: -dir * 30, duration: 0.1, ease: "sine.out" }, t - 0.1);
      TL.to(e, { x: dir * 1100, rotation: dir * 14, skewX: -dir * 28, scaleX: 1.6, filter: "blur(14px)", duration: 0.26, ease: "power3.in" }, t);
      let tr = null;
      if (o.trail) {
        const q = o.trail;
        tr = el("div", "", q.parent || front, { position: "absolute", left: q.x + "px", top: (q.y - 2) + "px", width: q.w + "px", height: "4px", background: o.col ?? C.ink, zIndex: 12 });
        gsap.set(tr, { scaleX: 0, transformOrigin: dir < 0 ? "100% 50%" : "0% 50%" });
        TL.to(tr, { scaleX: 1, duration: 0.22, ease: "power3.in" }, t + 0.04);
        TL.to(tr, { scaleX: 0, transformOrigin: dir < 0 ? "0% 50%" : "100% 50%", duration: 0.3, ease: "power2.inOut" }, t + 0.28);
      }
      return tr;
    }

    // giantSweep (007 stomp.tpl:250-263 «ويطلع»; optious 239-252): a giant word slides across the frame, dragging a panel of the next
    // colour behind it, so the word itself is the wipe to the next scene. o: {cy, w=1450, col, panel}
    function giantSweep(parent, text, t, o = {}) {
      const size = fitSize(text, o.w ?? 1450, 900), gw = measure(esc(text), size);
      const g = el("div", "fx-full", parent, { zIndex: o.z ?? 20 });
      const w = word(g, text, size, o.col ?? C.ink, 540, o.cy ?? 835);
      const panel = el("div", "", g, { position: "absolute", left: (540 + gw / 2 + 30) + "px", top: "0", width: "4000px", height: "1920px", background: o.panel ?? C.paper });
      gsap.set(g, { x: 540 + gw / 2 + 60 });
      TL.to(g, { x: 170, duration: 6 * F, ease: "expo.out" }, t - 3 * F);
      TL.to(g, { x: -150, duration: 0.4, ease: "none" }, t + 3 * F);
      TL.to(g, { x: -(600 + gw / 2), duration: 6 * F, ease: "expo.in" }, t + 3 * F + 0.4);
      return { g, word: w, panel };
    }

    // drum (007 stomp.tpl:178-212): whole words on the faces of a 3D drum; each new word rolls the drum one face (rotationX 40,
    // back.out) and the solid fill passes to the face in front; the others stay as outlines. times[k] = when word k is in front.
    function drum(parent, list, o, times) {
      list.forEach(checkWords);
      const cx = o.cx ?? 540, cy = o.cy ?? 835, col = o.col ?? C.dark;
      const dSize = o.size ?? Math.min(...list.map((t) => fitSize(t, o.maxW ?? 800, 340)));
      const persp = el("div", "fx-full", parent, { perspective: "1600px", perspectiveOrigin: `${cx}px ${cy}px` });
      const dr = el("div", "", persp, { position: "absolute", left: cx + "px", top: cy + "px", width: "0", height: "0", transformStyle: "preserve-3d" });
      const TH = 40, R = Math.round((dSize * 0.62) / Math.tan((TH / 2) * Math.PI / 180));
      const faces = list.map((t, i) => {
        const h = el("div", "", dr, { position: "absolute", left: "0", top: "0", width: "0", height: "0", transform: `rotateX(${-i * TH}deg) translateZ(${R}px)`, backfaceVisibility: "hidden" });
        return word(h, t, dSize, i ? "transparent" : col, 0, 0, { stroke: `5px ${col}` });
      });
      gsap.set(dr, { z: -R }); gsap.set(persp, { opacity: 0 }); TL.set(persp, { opacity: 1 }, times[0]);
      TL.fromTo(faces[0], { scale: 1.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 3 * F, ease: "power3.out", immediateRender: false }, times[0]);
      gsap.set(faces.slice(1), { opacity: 0 }); if (times[1] !== undefined) TL.set(faces.slice(1), { opacity: 1 }, times[1] - 3 * F);
      for (let i = 1; i < list.length; i++) {
        const a = times[i] - 2 * F;
        TL.to(dr, { rotationX: i * TH, duration: 6 * F, ease: "back.out(1.6)" }, a);
        TL.to(faces[i - 1], { color: "transparent", duration: 2 * F, ease: "none" }, a);
        TL.to(faces[i], { color: col, duration: 2 * F, ease: "none" }, a + 2 * F);
      }
      return { persp, drum: dr, faces };
    }

    // strikeFall (008 ext.js:165-181 old size; 009 ext.js:104-107; 011 ext.js:124-129): an ink bar strikes the old value out
    // (scaleX from the right), then the value falls away on a zigzag path, turning and fading. e must be positioned.
    function strikeFall(e, t, o = {}) {
      if (getComputedStyle(e).position === "static") e.style.position = "relative";
      const s = el("div", "", e, { position: "absolute", left: "-10px", right: "-10px", top: "52%", height: (o.h ?? 12) + "px", borderRadius: "6px", background: o.col ?? C.ink, transformOrigin: "100% 50%" });
      gsap.set(s, { scaleX: 0 });
      TL.to(s, { scaleX: 1, duration: 0.2, ease: "power3.out" }, t);
      TL.to(e, { motionPath: { path: o.path || [{ x: -60, y: 120 }, { x: 40, y: 320 }, { x: -80, y: 620 }, { x: 30, y: 1100 }], curviness: 1.2 }, rotation: o.rot ?? 28, opacity: 0.6, duration: 0.65, ease: "power2.in" }, t + 0.24);
      TL.set(e, { opacity: 0 }, t + 0.9);
      return s;
    }

    // orbit (008 showreel.tpl:150-183): tiles fly in from outside onto a tilted ellipse around the phrase and keep orbiting, with
    // depth (scale, z order, tilt) baked per frame; o.to {x, y, t} sucks them into a point (the card icon). els: absolute, left/top 0.
    function orbit(els, a, b, o = {}) {
      const n = els.length, cx = o.cx ?? 540, cy = o.cy ?? 862, rx = o.rx ?? 370, ry = o.ry ?? 195, tilt = (o.tilt ?? -10) * Math.PI / 180, sp = o.speed ?? 0.95;
      const half = (els[0].offsetWidth || 172) / 2, z = o.z || [3, 4, 7];
      els.forEach((e) => gsap.set(e, { opacity: 0 }));
      const posAt = (i, tt) => {
        const tau = tt - a, base = i * TAU / n + 0.4;
        const pA = expoOut(ramp(tau, i * 0.05, 0.83 + i * 0.05));
        if (pA <= 0) return { o: 0 };
        const ang = base + tau * sp + 2.4 * (1 - pA), rf = lerp(3.1, 1, pA);
        const ex = Math.cos(ang) * rx * rf, ey = Math.sin(ang) * ry * rf;
        let px = cx + ex * Math.cos(tilt) - ey * Math.sin(tilt), py = cy + ex * Math.sin(tilt) + ey * Math.cos(tilt);
        const d = (Math.sin(ang) + 1) / 2; let s = 0.7 + 0.4 * d;
        let q = 0;
        if (o.to) { q = inCubic(ramp(tt, o.to.t + i * 0.025, o.to.t + 0.3 + i * 0.025)); px = lerp(px, o.to.x, q); py = lerp(py, o.to.y, q); s *= lerp(1, 0.32, q); }
        return { x: px - half, y: py - half, s, rot: 9 * Math.cos(ang), z: d > 0.62 ? z[2] : d < 0.38 ? z[0] : z[1], o: q >= 1 ? 0 : 1 };
      };
      frames(a, b, (t) => els.forEach((e, i) => { const s = posAt(i, t); if (s.o) TL.set(e, { x: s.x, y: s.y, scale: s.s, rotation: s.rot, zIndex: s.z, opacity: 1 }, at(t)); else TL.set(e, { opacity: 0 }, at(t)); }));
      TL.set(els, { opacity: 0 }, b + F);
    }

    // ═════════════ stack / echo ═════════════
    // popIn (008 showreel.tpl:195, ext.js:11; 010 tpl:76): scale 0 -> 1 with a hard back overshoot, rotation unwinds to rot
    function popIn(e, t, rot = e._rot ?? 0, d = 0.55) { gsap.set(e, { opacity: 0, scale: 0, rotation: rot * 2.5 }); TL.set(e, { opacity: 1 }, t); TL.to(e, { scale: 1, rotation: rot, duration: d, ease: "back.out(2.4)" }, t); }
    // shoulder (008 showreel.tpl:197-200; 011 tpl:159-161): the big tag lands and shoulders the others aside, squashing once
    function shoulder(big, others, t) {
      const br = big.getBoundingClientRect(), bc = br.left + br.width / 2;
      others.forEach((p, k) => { const r = p.getBoundingClientRect(), s = r.left + r.width / 2 > bc ? 1 : -1;
        TL.to(p, { x: 40 * s, y: k % 2 ? -20 : -26, rotation: (p._rot ?? 0) + 4 * s, duration: 0.4, ease: "back.out(2)" }, t + 0.05); });
      TL.to(big, { scaleX: 1.08, scaleY: 0.9, duration: 0.08, ease: "power2.out" }, t + 0.12); TL.to(big, { scaleX: 1, scaleY: 1, duration: 0.4, ease: "back.out(3)" }, t + 0.2);
    }
    // dropAway (008 showreel.tpl:201-202, ext.js:158; 010 tpl:175): the tags drop like weights, each with its own spin
    function dropAway(els, t, o = {}) { els.forEach((p, k) => { TL.to(p, { y: o.y ?? 820, rotation: (k % 2 ? -1 : 1) * (14 + (k * 7) % 10), duration: 0.5, ease: "power2.in" }, t + k * 0.05); TL.set(p, { autoAlpha: 0 }, t + k * 0.05 + 0.5); }); }

    // echoRings (007 stomp.tpl:221-248 «ويستنى» ×2; campfire 242-282): outline copies step OUT of the solid word ring by ring
    // (waiting fills the frame); on tScroll the whole stack scrolls up one row and the solid word re-slams.
    // o: {cx, cy, size, top=230, h=1210, col, rings=3}
    function echoRings(parent, text, o, t, tScroll) {
      checkWords(text);
      const size = o.size ?? fitSize(text, 780, 300), rowH = Math.round(size * 1.05), cx = o.cx ?? 540, cy = o.cy ?? 835, top = o.top ?? 230, col = o.col ?? C.ink;
      const box = el("div", "", parent, { position: "absolute", left: "0", top: top + "px", width: "1080px", height: (o.h ?? 1210) + "px", overflow: "hidden" });
      const stack = el("div", "", box, { position: "absolute", left: "0", top: "0", width: "1080px", height: "100%" });
      const lc = cy - top, rows = [];
      for (let k = -4; k <= 5; k++) { const r = word(stack, text, size, "transparent", cx, lc + k * rowH, { stroke: `4px ${col}` }); gsap.set(r, { opacity: 0 }); rows.push([r, k]); }
      const solid = word(box, text, size, col, cx, lc);
      gsap.set(solid, { opacity: 0 });
      TL.fromTo(solid, { scale: 1.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 3 * F, ease: "power3.out", immediateRender: false }, t);
      rows.forEach(([r, k]) => {
        const ring = Math.abs(k); if (ring === 0 || ring > (o.rings ?? 3) || k === 4) return;
        const a = t + 0.24 + (ring - 1) * 0.13;
        TL.set(r, { opacity: 1 }, a);
        TL.fromTo(r, { y: -k * rowH }, { y: 0, duration: 5 * F, ease: "expo.out", immediateRender: false }, a);
      });
      if (tScroll !== undefined) {
        rows.forEach(([r, k]) => { if (k === 4 || k === 5 || k === 0) TL.set(r, { opacity: 1 }, tScroll - 3 * F); });
        TL.to(stack, { y: -rowH, duration: 6 * F, ease: "expo.inOut" }, tScroll - 3 * F);
        TL.fromTo(solid, { scale: 1.3 }, { scale: 1, duration: 4 * F, ease: "power3.out", immediateRender: false }, tScroll + 2 * F);
        TL.to(stack, { y: -rowH * 1.6, duration: 0.75, ease: "none" }, tScroll + 3 * F);
      }
      return { box, stack, solid, rows };
    }

    // wordGrid (007 campfire.tpl:109-158): a grid of one small repeated word; rows drift in alternate directions; the tokens pop in
    // radially from (cx, cy); one row is a boxed phrase that types in right to left; tOut rains the grid down and out.
    // o: {left=60, top=250, w=900, h=1170, pitch=78, rows=15, per=10, size=50, gap=34, cx, cy, col, box:{row, words, times, size}}
    function wordGrid(parent, w, o, t, tOut) {
      wholeWord(w);
      const L = o.left ?? 60, T = o.top ?? 250, PITCH = o.pitch ?? 78, ROWS = o.rows ?? 15, cx = o.cx ?? 540, cy = o.cy ?? 835, col = o.col ?? C.dark;
      const grid = el("div", "", parent, { position: "absolute", left: L + "px", top: T + "px", width: (o.w ?? 900) + "px", height: (o.h ?? 1170) + "px", overflow: "hidden", zIndex: 3 });
      const toks = [];
      for (let r = 0; r < ROWS; r++) {
        if (o.box && r === o.box.row) continue;
        const row = el("div", "", grid, { position: "absolute", left: "0", right: "0", top: (r * PITCH) + "px", height: PITCH + "px", display: "flex", justifyContent: "center", alignItems: "center", gap: (o.gap ?? 34) + "px", direction: "rtl", whiteSpace: "nowrap" });
        for (let k = 0; k < (o.per ?? 10); k++) { const s = el("span", "fx-wd", row, { position: "relative", left: "auto", top: "auto", fontSize: (o.size ?? 50) + "px", color: col, lineHeight: "1.25", display: "inline-block" }); s.textContent = w; toks.push(s); }
        gsap.set(row, { x: (r % 2 ? 1 : -1) * 30 }); TL.to(row, { x: (r % 2 ? -1 : 1) * 30, duration: o.drift ?? 1.6, ease: "none" }, t);
      }
      toks.forEach((s) => {
        const b = s.getBoundingClientRect(), d = Math.hypot(b.left + b.width / 2 - cx, b.top + b.height / 2 - cy);
        gsap.set(s, { opacity: 0, y: 14 }); TL.to(s, { opacity: 1, y: 0, duration: 0.08, ease: "power2.out" }, t + d / 2600 + rnd() * 0.04);
        if (tOut !== undefined) TL.to(s, { y: 60 + rnd() * 70, scaleY: 2.6, opacity: 0, filter: "blur(2px)", duration: 0.16, ease: "power2.in" }, tOut - 0.06 + rnd() * 0.14);
      });
      let boxed = null;
      if (o.box) {
        const by = T + o.box.row * PITCH + PITCH / 2;
        const ga = el("div", "", parent, { position: "absolute", left: cx + "px", top: by + "px", width: "0", height: "0", zIndex: 6 });
        const bx = el("div", "", ga, { position: "absolute", background: C.dark, height: "86px", top: "-43px" });
        const ln = el("div", "", ga, { position: "absolute", display: "flex", flexDirection: "row", direction: "rtl", gap: "20px", alignItems: "center", whiteSpace: "nowrap" });
        const bw = o.box.words.map((x, i) => { wholeWord(x); const s = el("span", "fx-wd", ln, { position: "relative", left: "auto", top: "auto", fontSize: (o.box.size ?? 56) + "px", color: C.ink, lineHeight: "1.25", display: "inline-block" }); s.textContent = x; return s; });
        const lb = ln.getBoundingClientRect(); gsap.set(ln, { x: -lb.width / 2, y: -lb.height / 2 });
        const boxW = lb.width + 70; Object.assign(bx.style, { left: (-boxW / 2) + "px", width: boxW + "px" });
        gsap.set(bx, { scaleX: 0, transformOrigin: "100% 50%" }); TL.to(bx, { scaleX: 1, duration: 0.22, ease: "expo.out" }, t + 0.1);
        const times = o.box.times || bw.map((_, i) => t + 0.2 + i * 0.16);
        bw.forEach((s, i) => { gsap.set(s, { clipPath: "inset(-30% 0% -30% 100%)" }); TL.to(s, { clipPath: "inset(-30% 0% -30% 0%)", duration: 0.09, ease: "power2.out" }, times[i]); });
        const lastT = times[times.length - 1];
        TL.to(bx, { scaleY: 1.32, duration: 0.12, ease: "power2.out" }, lastT); TL.to(bx, { scaleY: 1, duration: 0.3, ease: "sine.inOut" }, lastT + 0.1);
        TL.fromTo(bw[bw.length - 1], { scale: 1.25 }, { scale: 1, duration: 0.3, ease: "back.out(2)", immediateRender: false }, lastT);
        if (tOut !== undefined) {
          bw.slice().reverse().forEach((s, i) => TL.to(s, { clipPath: "inset(-30% 100% -30% 0%)", duration: 0.06, ease: "none" }, tOut + i * 0.012));
          TL.to(bx, { scaleY: 0.05, duration: 0.08, ease: "power3.in" }, tOut + 0.02);
          TL.to(ga, { x: -820, duration: 0.17, ease: "power3.in" }, tOut + 0.1);
          TL.set(ga, { opacity: 0 }, tOut + 0.3);
        }
        boxed = { ga, box: bx, words: bw };
      }
      return { grid, toks, boxed };
    }

    // ═════════════ number / counter ═════════════
    // countRoll (008 showreel.tpl:225-229; 009 ext.js:43,52; 011 tpl:106): the number rolls from -> to on the voice (expo.out),
    // baked per frame, in Arabic digits by default. o: {fmt(v) -> string, ease}
    function countRoll(e, from, to, a, b, o = {}) {
      const fmt = o.fmt || ((v) => AR(Math.round(v))), ease = o.ease || expoOut;
      e.textContent = fmt(from); let lc = fmt(from);
      frames(a, b, (t) => { const v = fmt(lerp(from, to, ease(ramp(t, a, b)))); if (v !== lc) { TL.set(e, { textContent: v }, at(t)); lc = v; } });
      TL.set(e, { textContent: fmt(to) }, b + F);
    }
    // unitSlam (008 showreel.tpl:221, 230-232; 011 tpl:253-254; 012 tpl:144-145): the unit («ميجا») slams down from 2.2x and the
    // number bloats (stretched taller, then elastic settle), like the "2025" bloat of the showreel reference
    function unitSlam(num, unit, t, o = {}) {
      gsap.set(unit, { opacity: 0, scale: o.from ?? 2.2, transformOrigin: o.origin ?? "100% 70%" });
      TL.to(unit, { opacity: 1, scale: 1, duration: 0.22, ease: "power4.out" }, t);
      TL.fromTo(num, { scaleX: 1.22, scaleY: 1.32 }, { scaleX: 1, scaleY: 1, duration: 0.6, ease: "elastic.out(1, 0.45)", immediateRender: false }, t + 0.03);
    }
    // getHeavy (008 showreel.tpl:233-240): the card swells while the number grows, then the weight lands: it drops, flattens wide and
    // bounces, its shadow spreads, neighbours (o.dip) dip with it. getLight (008 ext.js:190-192; 011 ext.js:186-189): the light card
    // lifts on a back ease and keeps floating.
    function getHeavy(e, a, hit, o = {}) {
      TL.to(e, { scale: 1.04, duration: 0.35, ease: "back.out(2)" }, a);
      TL.to(e, { scale: o.k ?? 1.1, duration: Math.max(0.2, hit - a - 0.35), ease: "sine.inOut" }, a + 0.35);
      TL.to(e, { y: 46, scaleY: 1.02, scaleX: 1.16, duration: 0.09, ease: "power3.in" }, hit);
      TL.to(e, { y: 30, scaleY: 1.1, scaleX: 1.1, duration: 0.3, ease: "back.out(2.5)" }, hit + 0.09);
      if (o.shadow) { TL.to(o.shadow, { scale: 1.06, duration: Math.max(0.2, hit - a), ease: "sine.inOut" }, a); TL.to(o.shadow, { y: 40, scaleX: 1.14, opacity: 0.7, duration: 0.12, ease: "power3.in" }, hit); }
      if (o.dip) { TL.to(o.dip, { y: 8, duration: 0.06, ease: "power2.out" }, hit + 0.06); TL.to(o.dip, { y: 0, duration: 0.35, ease: "back.out(3)" }, hit + 0.12); }
    }
    function getLight(e, t, o = {}) {
      TL.to(e, Object.assign({ y: -70, rotation: 2, duration: 0.7, ease: "back.out(1.6)" }, o.shadow ? { boxShadow: o.shadow } : {}), t);
      TL.to(e, { y: -94, rotation: -1, duration: 0.6, ease: "sine.inOut" }, t + 0.72);
      if (o.until) TL.to(e, { y: -70, rotation: 1, duration: Math.max(0.3, o.until - t - 1.32), ease: "sine.inOut" }, t + 1.32);
    }

    // ═════════════ stamp / impact ═════════════
    // stomp (007 stomp.tpl:68-72; same weight as 009 «ثقيل؟» and 011 «حمل»): the word falls stretched tall, lands squashed wide,
    // springs back. Pair with shake(world, t + 3F, {cam: 16}).
    function stomp(e, t, dy = -620) {
      gsap.set(e, { opacity: 0 });
      TL.fromTo(e, { opacity: 1, y: dy, scaleY: 1.4, scaleX: 0.85 }, { y: 0, scaleY: 0.8, scaleX: 1.14, duration: 3 * F, ease: "power2.in", immediateRender: false }, t);
      TL.to(e, { scaleY: 1, scaleX: 1, duration: 6 * F, ease: "back.out(3)" }, t + 3 * F);
    }
    // slab (009 showreel.tpl:172-181 «لا.»): an ink slab wipes over the word it answers (right to left) and a big word lands on it
    // o: {size=200, rot=-4, col, bg}
    function slab(parent, box, text, t, o = {}) {
      const s = el("div", "", parent, { position: "absolute", left: box.left + "px", top: box.top + "px", width: box.w + "px", height: box.h + "px", borderRadius: "28px", background: o.bg ?? C.ink, zIndex: o.z ?? 7, clipPath: "inset(0 0 0 100% round 28px)" });
      const no = el("div", "fx-wd", s, { position: "absolute", left: "0", width: "100%", top: (o.dy ?? -24) + "px", textAlign: "center", fontSize: (o.size ?? 200) + "px", color: o.col ?? C.dark });
      no.textContent = checkWords(text);
      gsap.set(no, { scale: 1.6, opacity: 0 });
      TL.to(s, { clipPath: "inset(0 0 0 0% round 28px)", duration: 0.2, ease: "expo.out" }, t + 0.02);
      TL.to(no, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, t + 0.06);
      TL.to(s, { rotation: o.rot ?? -4, duration: 0.4, ease: "back.out(2)" }, t + 0.1);
      return { s, no };
    }
    // shake: {cam: amp} = the whole world kicks for 4 frames on an impact (007 stomp.tpl:73-77);
    // {kind: "wobble"} = the stuck word trembles (011 tpl:312-313 «تتحرك.»); {kind: "no"} = a button refuses (010 tpl:172)
    function shake(e, t, o = {}) {
      if (o.cam !== undefined || (!o.kind)) {
        const amp = o.cam ?? 14;
        TL.to(e, { x: amp, y: -amp * 0.7, duration: F, ease: "none" }, t);
        TL.to(e, { x: -amp * 0.6, y: amp * 0.5, duration: F, ease: "none" }, t + F);
        TL.to(e, { x: 0, y: 0, duration: 2 * F, ease: "sine.out" }, t + 2 * F);
      } else if (o.kind === "wobble") {
        [0, 1, 2, 3].forEach((k) => TL.to(e, { rotation: k % 2 ? 3 : -3, x: k % 2 ? 8 : -8, duration: 0.07, ease: "sine.inOut" }, t + k * 0.07));
        TL.to(e, { rotation: 0, x: 0, duration: 0.12 }, t + 0.28);
      } else {
        TL.to(e, { keyframes: [{ x: -14, duration: 0.05 }, { x: 12, duration: 0.05 }, { x: -8, duration: 0.05 }, { x: 0, duration: 0.06 }] }, t);
      }
    }
    // flood (007 campfire.tpl:99-107): a disc pops open (with its word), then floods the frame on t: the next scene's colour.
    // circleWipe (008 ext.js:288-290; 010 ext.js:152-153): after a click, the colour grows from the click point over everything.
    function flood(parent, x, y, t, o = {}) {
      const r = o.r ?? 160, col = o.col ?? C.ink;
      const panel = el("div", "fx-full", parent, { background: col, zIndex: o.z ?? 4 });
      gsap.set(panel, { opacity: 0 });
      const disc = el("div", "", parent, { position: "absolute", left: (x - r) + "px", top: (y - r) + "px", width: 2 * r + "px", height: 2 * r + "px", borderRadius: "50%", background: col, zIndex: (o.z ?? 4) + 1 });
      gsap.set(disc, { scale: 0 });
      TL.to(disc, { scale: 1, duration: 0.3, ease: "back.out(1.6)" }, o.pop ?? t - 0.45);
      let w = null;
      if (o.word) { w = word(parent, o.word, o.size ?? 110, o.wordCol ?? C.dark, x, y); w.style.zIndex = (o.z ?? 4) + 2; gsap.set(w, { opacity: 0 }); TL.fromTo(w, { opacity: 0, yPercent: -10 }, { opacity: 1, yPercent: -50, duration: 0.22, ease: "expo.out", immediateRender: false }, (o.pop ?? t - 0.45) + 0.06); }
      TL.to(disc, { scale: 8.2, duration: 0.24, ease: "expo.in" }, t - 0.06);
      TL.set(panel, { opacity: 1 }, t + 0.18); TL.set(disc, { opacity: 0 }, t + 0.19);
      return { disc, panel, word: w };
    }
    function circleWipe(parent, x, y, t, o = {}) {
      const w = el("div", "fx-full", parent, { background: o.col ?? C.ink, zIndex: o.z ?? 40, clipPath: `circle(0px at ${x}px ${y}px)` });
      TL.to(w, { clipPath: `circle(2300px at ${x}px ${y}px)`, duration: o.d ?? 0.42, ease: "expo.in" }, t);
      return w;
    }
    // panelPush (007 stomp.tpl:96-102): the next colour panel pushes up from below carrying its word; what was on screen (o.push)
    // is shoved out of the top in the same 5 frames. o: {word, size, cx, cy, wordCol, push:[els]}
    function panelPush(parent, col, t, o = {}) {
      const p = el("div", "fx-full", parent, { background: col, zIndex: o.z ?? 6 });
      gsap.set(p, { yPercent: 100 });
      let w = null;
      if (o.word) { w = word(p, o.word, o.size ?? fitSize(o.word, 640, 600), o.wordCol ?? C.dark, o.cx ?? 540, o.cy ?? 835); TL.fromTo(w, { scale: 1.25 }, { scale: 1, duration: 5 * F, ease: "back.out(2)", immediateRender: false }, t + F); }
      TL.to(p, { yPercent: 0, duration: 5 * F, ease: "expo.out" }, t - 3 * F);
      if (o.push) TL.to(o.push, { y: -1500, duration: 5 * F, ease: "expo.out" }, t - 3 * F);
      return { panel: p, word: w };
    }

    // ═════════════ UI carriers ═════════════
    // searchBar (008 ext.js:15-39; 009 ext.js:205-221 comment bar; 010 tpl:124-126 URL bar, ext.js:172-186 comment field):
    // a dark bar with an ink magnifier; the query types itself word by word on the voice as ONE growing string, ink caret blinking.
    // items: [[word, tStart, tEnd], ...]; o: {t (bar enters), size=44, until (caret off), icon:false}
    function searchBar(parent, box, items, o = {}) {
      items.forEach(([w]) => wholeWord(w));
      const h = box.h ?? 150, bar = el("div", "", parent, { position: "absolute", left: box.left + "px", top: box.top + "px", width: box.w + "px", height: h + "px", borderRadius: "999px", background: o.bg ?? C.dark, zIndex: o.z ?? 10, boxShadow: "0 30px 60px rgba(18,20,22,0.30)" });
      const ic = (h - 30);
      const icon = el("div", "", bar, { position: "absolute", right: "15px", top: "15px", width: ic + "px", height: ic + "px", borderRadius: "50%", background: C.ink, display: "flex", alignItems: "center", justifyContent: "center" },
        `<svg viewBox="0 0 64 64" width="${ic * 0.55}" height="${ic * 0.55}"><circle cx="27" cy="27" r="17" fill="none" stroke="${C.dark}" stroke-width="7"/><path d="M40 40 L56 56" stroke="${C.dark}" stroke-width="8" stroke-linecap="round"/></svg>`);
      const q = el("div", "", bar, { position: "absolute", right: (ic + 45) + "px", top: "0", height: h + "px", display: "flex", alignItems: "center", gap: "8px", direction: "rtl" });
      const qT = el("div", "fx-lb", q, { fontSize: (o.size ?? 44) + "px", color: C.paper, whiteSpace: "nowrap", lineHeight: "1.4" });
      const caret = el("div", "", q, { width: "5px", height: ((o.size ?? 44) * 1.3) + "px", background: C.ink, borderRadius: "3px" });
      const t0 = o.t ?? items[0][1] - 0.5, until = o.until ?? items[items.length - 1][2] + 0.8;
      gsap.set(bar, { opacity: 0, scaleX: 0.2 }); TL.to(bar, { opacity: 1, scaleX: 1, duration: 0.4, ease: "back.out(1.8)" }, t0);
      gsap.set(icon, { scale: 0.3, rotation: -90 }); TL.to(icon, { scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2.4)" }, t0 + 0.12);
      let lq = null;
      frames(items[0][1], items[items.length - 1][2] + 0.05, (t) => {
        let s = "";
        for (const [w, a, b] of items) { if (t < a) break; const p = ramp(t, a, a + Math.min(0.3, b - a)); s += (s ? " " : "") + w.slice(0, Math.max(1, Math.round(w.length * p))); }
        if (s !== lq) { TL.set(qT, { textContent: s }, at(t)); lq = s; }
      });
      gsap.set(caret, { opacity: 0 });
      for (let t = items[0][1] - 0.2, k = 0; t < until; t += 0.2, k++) TL.set(caret, { opacity: k % 2 ? 0 : 1 }, t);
      TL.set(caret, { opacity: 0 }, until);
      return { bar, icon, text: qT, caret };
    }

    // toast (008 showreel.tpl:359-375): a UI toast drops in from the top; its words light up on the voice, the key word gets an ink
    // chip, the last word pops, the timer bar runs down. items: [[word, t]]; o: {key, size=88, until, icon (html)}
    function toast(parent, box, items, o = {}) {
      items.forEach(([w]) => wholeWord(w));
      const h = box.h ?? 210, t0 = items[0][1];
      const tt = el("div", "", parent, { position: "absolute", left: box.left + "px", top: box.top + "px", width: box.w + "px", height: h + "px", borderRadius: "60px", background: C.dark, zIndex: o.z ?? 20, boxShadow: "0 30px 60px rgba(18,20,22,0.30), 0 6px 14px rgba(18,20,22,0.2)", direction: "rtl" });
      const ti = el("div", "", tt, { position: "absolute", right: "34px", top: ((h - 120) / 2) + "px", width: "120px", height: "120px", borderRadius: "50%", background: C.ink, display: "flex", alignItems: "center", justifyContent: "center" },
        o.icon || `<svg viewBox="0 0 40 40" width="70" height="70"><path d="M9 21 L17 29 L31 12" fill="none" stroke="${C.dark}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
      const line = el("div", "fx-wd", tt, { position: "absolute", left: "auto", right: "182px", top: ((h - (o.size ?? 88) * 1.3) / 2 - 6) + "px", fontSize: (o.size ?? 88) + "px", color: "#5E6369", display: "flex", gap: "20px", alignItems: "center" });
      const tw = items.map(([w]) => el("span", "", line, { display: "inline-block", borderRadius: "22px", padding: "0 10px 8px", margin: "0 -10px" }, esc(w)));
      { const r = line.getBoundingClientRect(), max = box.w - 230; if (r.width > max) line.style.fontSize = ((o.size ?? 88) * max / r.width) + "px"; }
      const bar = el("div", "", tt, { position: "absolute", left: "60px", right: "60px", bottom: "22px", height: "6px", borderRadius: "3px", background: C.ink, transformOrigin: "0 50%" });
      gsap.set(tt, { y: -1400, rotation: -5 });
      TL.to(tt, { y: 0, rotation: 0, duration: 0.6, ease: "back.out(1.4)" }, t0 - 0.12);
      TL.fromTo(bar, { scaleX: 1 }, { scaleX: 0.5, duration: (o.until ?? t0 + 2) - t0, ease: "none", immediateRender: false }, t0);
      items.forEach(([, t], k) => TL.to(tw[k], { color: C.paper, duration: 0.14 }, t));
      if (o.key !== undefined) { const kt = items[o.key][1]; TL.to(tw[o.key], { backgroundColor: C.ink, color: C.dark, duration: 0.16 }, kt); TL.fromTo(tw[o.key], { scale: 1.3 }, { scale: 1, duration: 0.4, ease: "back.out(3)", immediateRender: false }, kt); }
      const lt = items[items.length - 1][1], lk = tw.length - 1;
      if (o.key !== lk) TL.fromTo(tw[lk], { scale: 1.35, y: -10 }, { scale: 1, y: 0, duration: 0.45, ease: "back.out(3)", immediateRender: false }, lt);
      TL.to(tt, { scale: 1.03, duration: 0.12, ease: "power2.out" }, lt); TL.to(tt, { scale: 1, duration: 0.4, ease: "back.out(2)" }, lt + 0.12);
      TL.to(ti, { rotation: 360, duration: 0.6, ease: "back.out(1.6)" }, t0);
      return { e: tt, icon: ti, words: tw, bar };
    }

    // clipCard (008 showreel.tpl:42, 204-211, 248-252, 343-357; 009 ext.js:166-175; 011 ext.js:159-174): a full-frame layer seen
    // through a clip-path. open(t): a card pops out of a point; expand(t): the card swells into the whole frame (a new world);
    // swipe(t): the world shrinks back to a card and is flicked off-screen. Put content in .layer in full-frame coordinates.
    // o: {rect:{l,t,r,b}, rad=46, col, from:{x,y}}
    function clipCard(parent, o = {}) {
      const R = o.rect || { l: 190, t: 700, r: 890, b: 1060 }, rad = o.rad ?? 46, fx0 = (o.from || {}).x ?? (R.l + R.r) / 2, fy0 = (o.from || {}).y ?? (R.t + R.b) / 2;
      const clip = (t, r, b, l, rr) => `inset(${t}px ${r}px ${b}px ${l}px round ${rr}px)`;
      const wrap = el("div", "fx-full", parent, { zIndex: o.z ?? 10 });
      const shadow = el("div", "", wrap, { position: "absolute", left: R.l + "px", top: R.t + "px", width: (R.r - R.l) + "px", height: (R.b - R.t) + "px", borderRadius: rad + "px", boxShadow: "0 40px 70px rgba(18,20,22,0.35), 0 8px 18px rgba(18,20,22,0.25)" });
      const layer = el("div", "fx-full", wrap, { background: o.col ?? C.dark, overflow: "hidden", clipPath: clip(fy0, 1080 - fx0, 1920 - fy0, fx0, 44) });
      gsap.set(shadow, { opacity: 0, scale: 0.2 });
      const CARD = clip(R.t, 1080 - R.r, 1920 - R.b, R.l, rad);
      return {
        wrap, layer, shadow,
        open(t) { TL.to(layer, { clipPath: CARD, duration: 0.42, ease: "back.out(1.5)" }, t); TL.to(shadow, { opacity: 1, scale: 1, duration: 0.42, ease: "back.out(1.5)" }, t); },
        expand(t) { TL.to(layer, { clipPath: clip(0, 0, 0, 0, 0), duration: 0.38, ease: "expo.inOut" }, t); TL.to(shadow, { opacity: 0, duration: 0.2 }, t + 0.2); },
        swipe(t) {
          TL.set(wrap, { filter: "drop-shadow(0 40px 50px rgba(18,20,22,0.45))" }, t);
          TL.to(layer, { clipPath: clip(96, 60, 96, 60, 70), scale: 0.95, duration: 0.24, ease: "power2.out", transformOrigin: "540px 960px" }, t);
          TL.to(layer, { x: -1500, y: 160, rotation: -17, duration: 0.42, ease: "power3.in" }, t + 0.3);
          TL.set(wrap, { opacity: 0 }, t + 0.74);
        },
      };
    }

    // click (008 showreel.tpl:241-246, 294-295; 010 ext.js:140-143): a ripple ring at the click point; o.rings {l, t, w, h, rad}
    // adds three rounded rings that burst off the clicked card (the "Create" button rings)
    function click(parent, x, y, t, o = {}) {
      const r = el("div", "fx-ripple", parent, { left: x + "px", top: y + "px", borderColor: o.col ?? C.ink, zIndex: 49 });
      TL.fromTo(r, { opacity: 1, scale: 0.25 }, { opacity: 0, scale: 1.5, duration: 0.45, ease: "expo.out", immediateRender: false }, t);
      const rings = [];
      if (o.rings) for (let k = 0; k < 3; k++) {
        const q = o.rings, g = el("div", "fx-ring", parent, { left: q.l + "px", top: q.t + "px", width: q.w + "px", height: q.h + "px", borderRadius: (q.rad ?? 48) + "px", borderColor: o.ringCol ?? C.dark, zIndex: 9 });
        TL.fromTo(g, { opacity: 0.85, scaleX: 1, scaleY: 1 }, { opacity: 0, scaleX: 1.12 + k * 0.06, scaleY: 1.3 + k * 0.14, duration: 0.55, ease: "expo.out", immediateRender: false }, t + k * 0.07);
        rings.push(g);
      }
      return { ripple: r, rings };
    }

    // hangTag (012 showreel.tpl:123-149, 252-277): a weight tag hangs on a string from a pivot and swings as a damped pendulum; every
    // kick [t, amp°] adds a swing, baked per frame. Returns {g, str, tag, n, u}; pair with countRoll / unitSlam on n / u.
    // o: {size=150, bg, col (number), ucol (unit)}; kicks: [[t, amp]...]
    function hangTag(parent, pivot, big, unit, o, kicks, a, b) {
      const size = o.size ?? 150;
      const g = el("div", "", parent, { position: "absolute", left: pivot.x + "px", top: pivot.y + "px", width: "0", height: "0", zIndex: o.z ?? 6 });
      const str = el("div", "", g, { position: "absolute", left: "-3px", top: "0", width: "6px", height: "60px", background: C.dark, borderRadius: "3px" });
      const tag = el("div", "fx-tag", g, { background: o.bg ?? C.dark, padding: `${size * 0.1}px ${size * 0.34}px ${size * 0.16}px`, gap: `${size * 0.16}px`, boxShadow: "0 24px 40px rgba(18,20,22,0.28)" });
      el("div", "", tag, { position: "absolute", left: "50%", top: "14px", width: "26px", height: "26px", marginLeft: "-13px", borderRadius: "50%", background: C.paper, boxShadow: `inset 0 0 0 5px ${C.dark}` });
      const n = el("span", "", tag, { fontSize: size + "px", color: o.col ?? C.ink, lineHeight: "1.05", display: "inline-block", transformOrigin: "50% 80%", marginTop: size * 0.18 + "px" }, esc(big));
      const u = el("span", "", tag, { fontSize: size * 0.62 + "px", color: o.ucol ?? C.paper, lineHeight: "1.05", display: "inline-block", transformOrigin: "0% 80%" }, esc(checkWords(unit)));
      const r = tag.getBoundingClientRect(); tag.style.left = (-r.width / 2) + "px";
      const pend = (t) => kicks.reduce((s, [t0, amp]) => (t < t0 ? s : s + amp * Math.exp(-3.1 * (t - t0)) * Math.sin(6.6 * (t - t0) + (amp > 0 ? Math.PI / 2 : 0))), 0);
      gsap.set(g, { opacity: 0 }); TL.set(g, { opacity: 1 }, a);
      frames(a, b, (t) => TL.set(g, { rotation: pend(t) }, at(t)));
      return { g, str, tag, n, u };
    }

    // credits (008 showreel.tpl:98-107; 009-011): four small corner labels in the label font (the showreel's PRODUCER / @handle
    // credits), inside the safe zone. items: [[text, x, y, "l"|"r"]...]
    function credits(parent, items, col = C.dark, t = 0) {
      const box = el("div", "fx-full", parent, { color: col });
      (items || [["fortunecode.org", 60, 232, "l"], ["سرعة المواقع", 960, 232, "r"], ["٢٠٢٦", 60, 1404, "l"], ["فورتشن كود", 960, 1404, "r"]]).forEach(([s, x, y, al]) => {
        const l = el("div", "fx-lab", box, { top: y + "px" }); l.textContent = s;
        if (al === "l") { l.style.left = x + "px"; l.style.direction = "ltr"; } else l.style.right = (1080 - x) + "px";
      });
      gsap.set(box, { opacity: 0 }); TL.to(box, { opacity: 1, duration: 0.3 }, t);
      return box;
    }

    // ═════════════ reveal / mask ═════════════
    // wipeIn (007 minimal.tpl:120-124): a light connector word is wiped in right to left (reading order) with a small drift.
    // tok = a kinetic grp token ({w}) or any element.
    function wipeIn(tok, t, d = 0.42) { const w = tok.w || tok; gsap.set(w, { clipPath: "inset(-30% 0% -40% 100%)", x: 14 }); TL.to(w, { clipPath: "inset(-30% 0% -40% 0%)", x: 0, duration: d, ease: "power3.out" }, t); }

    // marker (006 template.tpl:202-224, 248; 007 minimal.tpl:268-276): a hand-drawn ink underline or circle draws around a token
    function markDraw(tok, kind, t, d = 0.55) {
      const host = tok.tk || tok;
      if (getComputedStyle(host).position === "static") host.style.position = "relative";
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"); svg.setAttribute("class", "fx-draw"); svg.setAttribute("viewBox", "0 0 100 40"); svg.setAttribute("preserveAspectRatio", "none");
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path"); p.setAttribute("pathLength", "1");
      p.setAttribute("d", kind === "circle" ? "M60 3 C25 0 3 9 4 21 C5 33 35 39 62 37 C88 35 99 26 96 15 C93 6 76 2 52 4" : "M98 30 C80 36 55 33 35 35 C22 36 10 33 2 37");
      svg.appendChild(p); host.appendChild(svg);
      if (kind === "circle") Object.assign(svg.style, { left: "-18%", width: "136%", top: "-8%", height: "1.36em" });
      else Object.assign(svg.style, { left: "-4%", width: "108%", top: "88%", height: "0.42em" });
      TL.set(svg, { opacity: 1 }, t);
      TL.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: d, ease: "power2.inOut", immediateRender: false }, t);
      return svg;
    }
    const under = (tok, t, d) => markDraw(tok, "under", t, d);
    const circle = (tok, t, d) => markDraw(tok, "circle", t, d);

    // guides (006 template.tpl:249; 009 showreel.tpl:286-293 «انضبط.»): designer guide lines draw in (dashed, staggered 3 f);
    // crooked: the word lands tilted, so the guides show it is off. specs: [{x, y, w, rot, col, origin}]
    function guides(parent, specs, t) {
      return specs.map((g, k) => {
        const e = el("div", "fx-guide", parent, { left: g.x + "px", top: g.y + "px", width: g.w + "px", borderTopColor: g.col ?? C.ink, zIndex: 4 });
        gsap.set(e, { rotation: g.rot ?? 0, scaleX: 0, transformOrigin: g.origin ?? "0% 50%" });
        TL.to(e, { scaleX: 1, duration: 0.35, ease: "expo.out" }, t + k * 0.08);
        return e;
      });
    }
    function crooked(e, t, rot = -7) { gsap.set(e, { opacity: 0, y: -80, rotation: 0 }); TL.to(e, { opacity: 1, y: 0, rotation: rot, duration: 0.5, ease: "back.out(1.5)" }, t - 0.08); }

    // eyeBlink (008 ext.js:234-240 «ترمش»): two dark lids close over the frame and open again: a real blink on the word
    function eyeBlink(parent, t, o = {}) {
      const col = o.col ?? "#050607";
      const lt = el("div", "", parent, { position: "absolute", left: "0", top: "0", width: "1080px", height: "980px", background: col, zIndex: o.z ?? 45 });
      const lb = el("div", "", parent, { position: "absolute", left: "0", top: "940px", width: "1080px", height: "980px", background: col, zIndex: o.z ?? 45 });
      gsap.set(lt, { y: -1000 }); gsap.set(lb, { y: 1000 });
      TL.to([lt, lb], { y: 0, duration: 0.1, ease: "power2.in" }, t);
      TL.to(lt, { y: -1000, duration: 0.16, ease: "power2.out" }, t + 0.14); TL.to(lb, { y: 1000, duration: 0.16, ease: "power2.out" }, t + 0.14);
      return [lt, lb];
    }

    // neon (007 campfire.tpl:320-338 «صور أقل.»): words as neon tubes: an unlit ink-deep outline first, then each word flickers on
    // (frame patterns) on its time; hum = a later time where the tubes dip. o: {cx, cy, size=128, gap=48}
    function neon(parent, list, o, times, hum) {
      list.forEach(checkWords);
      const g = el("div", "", parent, { position: "absolute", left: (o.cx ?? 540) + "px", top: (o.cy ?? 860) + "px", width: "0", height: "0", zIndex: o.z ?? 14 });
      const ln = el("div", "", g, { position: "absolute", display: "flex", flexDirection: "row", direction: "rtl", gap: (o.gap ?? 48) + "px", alignItems: "center", whiteSpace: "nowrap" });
      const tube = list.map((w) => {
        const h = el("span", "fx-wd", ln, { position: "relative", left: "auto", top: "auto", display: "inline-block", fontSize: (o.size ?? 128) + "px", lineHeight: "1.25" });
        const off = el("span", "", h, { color: "transparent", webkitTextStroke: "3px " + C.inkDeep, display: "inline-block" }); off.textContent = w;
        const on = el("span", "", h, { position: "absolute", left: "0", top: "0", color: "transparent", webkitTextStroke: "5px " + C.ink, display: "inline-block", filter: `drop-shadow(0 0 6px ${C.ink}) drop-shadow(0 0 22px ${C.ink})` }); on.textContent = w;
        gsap.set(h, { opacity: 0 }); gsap.set(on, { opacity: 0 });
        return { h, on };
      });
      const r = ln.getBoundingClientRect(); gsap.set(ln, { x: -r.width / 2, y: -r.height / 2 });
      TL.to(tube.map((x) => x.h), { opacity: 1, duration: 0.25, stagger: 0.08, ease: "none" }, o.tube ?? times[0] - 0.45);
      const flick = (target, a, pat) => pat.forEach(([dt, v]) => TL.set(target, { opacity: v }, a + dt));
      const PAT = [[[0, 1], [2 * F, 0.15], [3 * F, 1], [5 * F, 0.3], [7 * F, 1]], [[0, 1], [F, 0.2], [3 * F, 1], [4 * F, 0.4], [6 * F, 1]]];
      tube.forEach((x, k) => flick(x.on, times[k], PAT[k % 2]));
      if (hum !== undefined) flick(tube.map((x) => x.on), hum, [[0, 0.75], [F, 1], [5 * F, 0.85], [6 * F, 1]]);
      return { g, tube };
    }

    return { F, C, AR, frames, measure, fitSize, word, ctr, pill, outlineWord,
             flagWarp, sliceGlitch, unfold, kashGrow,
             spinIn, spinOut, whipOut, giantSweep, drum, strikeFall, orbit,
             popIn, shoulder, dropAway, echoRings, wordGrid,
             countRoll, unitSlam, getHeavy, getLight,
             stomp, slab, shake, flood, circleWipe, panelPush,
             searchBar, toast, clipCard, click, hangTag, credits,
             wipeIn, under, circle, guides, crooked, eyeBlink, neon };
  }

  window.KineticFx = { create: (TL, opt) => fx(TL, null, opt), css: CSS, AR, version: "1.0.0" };
  if (window.Kinetic) window.Kinetic.fx = (TL, K, opt) => fx(TL, K, opt);
  else window.Kinetic = { fx: (TL, K, opt) => fx(TL, K, opt) };
})();
