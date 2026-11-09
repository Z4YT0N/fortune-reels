/* kinetic.js: the collage-reel kinetic type library (reel-006 style, the owner's "ROAR").
 * Extracted from reels/018-alumaman-collage/reel.tpl (and 006 test.tpl where 018 lacks a move); behaviour is identical.
 * Every colour and font comes from CSS variables set by the brand (build.py writes them on :root):
 *   --ink (the one accent), --ink-deep, --ink-soft, --paper, --dark (text / dark ground), --on-ink (text on an ink chip),
 *   --font-hero, --font-label, --font-latin, --hero-weight, --label-weight, --label-weight-m.
 * Needs GSAP 3.14 + MotionPathPlugin on the page. Docs: engine/kinetic/README.md.
 *
 * Rules the library enforces or assumes:
 *  1. Hidden state is set at BUILD time (gsap.set inside each move). Reveals happen only through TL.to / TL.fromTo with
 *     immediateRender:false, so no word ever flashes before its entrance (owner 2026-11-07).
 *  2. Arabic is whole words only: a token is one whole word (joins intact). Never split letters, never textPath.
 *     grp() rejects a token that looks like a split fragment (wholeWord()). typeOn grows ONE string, so joins re-form.
 *  3. A word lands on its own spoken frame, never before: V(i) = word start - 1 frame.
 */
(function () {
  "use strict";
  const CSS = `
    .el { position: absolute; direction: rtl; will-change: transform; }
    .ln { display: flex; flex-direction: row; justify-content: flex-start; align-items: baseline; white-space: nowrap; }
    .tk { position: relative; display: inline-block; margin: 0 0.06em; }
    .m { display: inline-block; overflow: hidden; padding: 0.12em 0.14em 0.30em; margin: -0.12em -0.14em -0.30em; vertical-align: bottom; }
    .w { display: inline-block; line-height: 1.2; }
    .sans { font-family: var(--font-label), sans-serif; font-weight: var(--label-weight, 700); }
    .sansm { font-family: var(--font-label), sans-serif; font-weight: var(--label-weight-m, 500); }
    .lat { font-family: var(--font-latin, var(--font-label)), sans-serif; unicode-bidi: isolate; direction: ltr; }
    .box { position: absolute; left: -0.12em; right: -0.12em; top: 0.18em; bottom: 0.02em; background: var(--ink); transform: scaleX(0); transform-origin: right center; z-index: -1; }
    .scrap { background: var(--paper); box-shadow: 2px 3px 8px rgba(0,0,0,0.28), 6px 10px 26px rgba(0,0,0,0.16);
             clip-path: polygon(0 5%, 8% 0, 22% 4%, 38% 0, 55% 4%, 72% 0, 88% 4%, 100% 0, 98% 50%, 100% 96%, 84% 100%, 64% 96%, 44% 100%, 24% 96%, 6% 100%, 0 95%, 2% 50%); }
    .tape { position: absolute; width: 130px; height: 40px; background: rgba(214,216,212,0.88); box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
    .chip { background: var(--ink); color: var(--on-ink); border-radius: 10px; padding: 4px 24px 12px; }
    svg.mk { position: absolute; overflow: visible; }
    svg.mk path { fill: none; stroke: var(--ink); stroke-width: 11; stroke-linecap: round; stroke-linejoin: round; stroke-dasharray: 1; stroke-dashoffset: 1; }
    .echo .w { color: transparent; -webkit-text-stroke: 4px var(--dark); }
    .echoG .w { color: transparent; -webkit-text-stroke: 5px var(--ink); }
    .echoL .w { color: transparent; -webkit-text-stroke: 4px var(--paper); }
    .grain { position: absolute; inset: 0; width: 1080px; height: 1920px; mix-blend-mode: soft-light; opacity: 0; z-index: 30; }
  `;
  function injectCss() {
    if (document.getElementById("kinetic-css")) return;
    const s = document.createElement("style"); s.id = "kinetic-css"; s.textContent = CSS;
    document.head.insertBefore(s, document.head.firstChild); // first, so the reel's own <style> can override
  }
  injectCss();

  // ── Arabic-safe whole-word rules ──
  const AR = /[؀-ۿ]/, AR_LETTER = /^[ء-ي]$/;
  const JOINERS = /^[ـ‌‍]|[ـ‌‍]$/; // a token may not start or end with tatweel / ZWJ / ZWNJ
  function wholeWord(text) {
    const t = String(text).replace(/[ً-ْ]/g, "");
    if (JOINERS.test(t)) throw new Error(`kinetic: token «${text}» starts or ends with a joiner: Arabic is whole words only`);
    if (AR_LETTER.test(t)) throw new Error(`kinetic: token «${text}» is a single Arabic letter: never split a word into letters`);
    return text;
  }
  // split a line into whole-word tokens (spaces only; punctuation stays on its word)
  function words(str) { return String(str).trim().split(/\s+/).filter(Boolean); }
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // contact lines: Latin runs (URL, phone, @handle) are isolated LTR so bidi never reorders them inside the RTL page
  function ltrIsolate(str) {
    return esc(str).replace(/[A-Za-z0-9+@][A-Za-z0-9+@.\/:_\- ]*[A-Za-z0-9]|[A-Za-z0-9]/g, (m) => `<bdi dir="ltr" class="lat">${m}</bdi>`);
  }
  const cssVar = (n, fb) => (getComputedStyle(document.documentElement).getPropertyValue(n).trim() || fb);

  /** create(TL, {stage, front, behind, words}) -> the move set bound to one timeline. Call it inside build(), after fonts load. */
  function create(TL, opt = {}) {
    injectCss();
    const F = 1 / 30;
    const stage = opt.stage || document.getElementById("stage");
    const front = opt.front || document.getElementById("front") || stage;
    const behind = opt.behind || document.getElementById("behind") || stage;
    const WORDS = opt.words || [];
    // resolved colours (GSAP cannot tween var()); class styles keep using the variables
    const C = { ink: cssVar("--ink", "#00DB33"), inkDeep: cssVar("--ink-deep", "#006A39"), inkSoft: cssVar("--ink-soft", "#5CF07E"),
                paper: cssVar("--paper", "#F0F1F2"), dark: cssVar("--dark", "#121416"), onInk: cssVar("--on-ink", "#121416"), grey: "#a3a5a7" };
    const W = (i) => WORDS[i][1];          // word i start (voice clock)
    const E = (i) => WORDS[i][2];          // word i end
    const V = (i) => W(i) - 0.03;          // a word lands on its own spoken frame, never before
    const has = (i) => i >= 0 && i < WORDS.length;

    // ── build-time hidden-state helpers ──
    function hide(el, state) { gsap.set(el, Object.assign({ opacity: 0 }, state || {})); return el; }      // at build time only
    function showAt(el, a) { TL.set(el, { opacity: 1 }, a); return el; }                                    // frame-baked reveal

    // ── carriers ──
    // grp: a group of whole-word tokens. tokens = [[text, {s: size, f: "sans"|"sansm", col, hl}], ...]. opt: cls, style, w, right, r, origin
    function grp(parent, x, y, tokens, o2 = {}) {
      const e = document.createElement("div"); e.className = "el " + (o2.cls || ""); Object.assign(e.style, { left: x + "px", top: y + "px" }, o2.style || {});
      if (o2.w) e.style.width = o2.w + "px";
      const L = document.createElement("div"); L.className = "ln"; e.appendChild(L);
      const toks = tokens.map(([text, o]) => {
        wholeWord(text);
        const tk = document.createElement("span"); tk.className = "tk " + (o.f || ""); tk.style.fontSize = (o.s || 80) + "px"; if (o.col) tk.style.color = o.col;
        if (o.hl !== undefined) { const bx = document.createElement("span"); bx.className = "box"; tk.appendChild(bx); }
        const m = document.createElement("span"); m.className = "m"; const w = document.createElement("span"); w.className = "w"; w.textContent = text;
        m.appendChild(w); tk.appendChild(m); L.appendChild(tk); return { tk, w, m, o, text };
      });
      (parent || front).appendChild(e);
      if (o2.right !== undefined) { e.style.left = "auto"; e.style.right = o2.right + "px"; }
      gsap.set(e, { rotation: o2.r || 0, transformOrigin: o2.origin || "50% 50%" });
      return { e, toks };
    }
    // line: grp from a plain string (whole words), every token the same style
    function line(parent, x, y, str, o = {}, o2 = {}) { return grp(parent, x, y, words(str).map((t) => [t, Object.assign({}, o)]), o2); }
    function scrap(parent, box) { const s = document.createElement("div"); s.className = "el scrap"; Object.assign(s.style, { left: box.left + "px", top: box.top + "px", width: box.w + "px", height: box.h + "px" }); (parent || front).appendChild(s); return s; }
    function tape(parent, x, y, r) { const t = document.createElement("div"); t.className = "tape"; Object.assign(t.style, { left: x + "px", top: y + "px" }); gsap.set(t, { rotation: r }); parent.appendChild(t); return t; }
    function chip(parent, box, size = 60) {
      const c = document.createElement("div"); c.className = "el chip sans";
      Object.assign(c.style, { left: box.left + "px", top: box.top + "px", width: box.w + "px", height: box.h + "px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: size + "px", direction: "rtl" });
      const t = document.createElement("span"); t.style.whiteSpace = "nowrap"; c.appendChild(t); (parent || front).appendChild(c); return { e: c, t };
    }
    // fit: shrink a group's font sizes until it fits maxW (Zain tails are long: measure every hero line)
    function fit(g, maxW) { const w = g.e.getBoundingClientRect().width; if (w <= maxW) return 1; const k = maxW / w; g.toks.forEach((t) => { t.tk.style.fontSize = (parseFloat(t.tk.style.fontSize) * k).toFixed(1) + "px"; }); return k; }

    // ── entrances (each sets its hidden start state at build time) ──
    function rise(t, a, d = 0.36) { gsap.set(t.w, { yPercent: 118 }); TL.to(t.w, { yPercent: 0, duration: d, ease: "expo.out" }, a); }
    function inkIn(t, a) { gsap.set(t.tk, { color: C.grey }); gsap.set(t.w, { yPercent: 118 }); TL.to(t.w, { yPercent: 0, duration: 0.3, ease: "expo.out" }, a); TL.to(t.tk, { color: C.dark, duration: 0.25, ease: "sine.out" }, a + 0.3); }
    function blurIn(t, a) { gsap.set(t.tk, { opacity: 0, y: 14, filter: "blur(8px)" }); TL.to(t.tk, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.32, ease: "power2.out" }, a); }
    function hl(t, a, flip = C.onInk) { TL.fromTo(t.tk.querySelector(".box"), { scaleX: 0 }, { scaleX: 1, duration: 4 * F, ease: "expo.out", immediateRender: false }, a); if (flip) TL.to(t.tk, { color: flip, duration: 2 * F }, a + 2 * F); }
    function slam(t, a, dir = 1) {
      gsap.set(t.tk, { opacity: 0 });
      TL.fromTo(t.tk, { x: 240 * dir, scaleX: 1.4, skewX: -10 * dir, filter: "blur(9px)", opacity: 1 }, { x: -8 * dir, scaleX: 1, skewX: 0, filter: "blur(0px)", opacity: 1, duration: 3 * F, ease: "power3.out", immediateRender: false }, a);
      TL.to(t.tk, { x: 0, duration: 0.3, ease: "sine.inOut" }, a + 3 * F);
    }
    // overshoot = two stacked tweens: +k past rest, then a settle starting 2 f before the first ends
    function over(el, a, k = 0.07, d = 0.22) { TL.to(el, { scale: 1 + k, duration: d, ease: "power2.out" }, a); TL.to(el, { scale: 1, duration: 0.3, ease: "sine.inOut" }, a + d - 2 * F); }
    // Arabic typewriter: ONE string grows, so the joins re-form naturally; finishes by tEnd
    function typeOn(el, str, t0, tEnd) {
      el.textContent = ""; const ch = [...str]; const step = Math.min(1 / 14, (tEnd - t0) / ch.length);
      for (let k = 1; k <= ch.length; k++) TL.set(el, { textContent: ch.slice(0, k).join("") }, t0 + (k - 1) * step);
    }
    // marker stroke (arrow, circle, strike): path d in a w x h box drawn over dur
    function mark(parent, x, y, w, h, d, a, dur = 0.5, col) {
      const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); s.setAttribute("class", "mk"); s.setAttribute("viewBox", `0 0 ${w} ${h}`);
      Object.assign(s.style, { left: x + "px", top: y + "px", width: w + "px", height: h + "px" });
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path"); p.setAttribute("d", d); p.setAttribute("pathLength", "1"); if (col) p.style.stroke = col; s.appendChild(p);
      (parent || front).appendChild(s);
      TL.fromTo(p, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: dur, ease: "power2.inOut", immediateRender: false }, a);
      return s;
    }
    // strike through a token with a marker (draws during the word's end)
    function strike(tok, a, dur = 0.2) { const r = tok.tk.getBoundingClientRect(), fr = front.getBoundingClientRect(); return mark(front, r.left - fr.left - 10, r.top - fr.top + r.height * 0.42, r.width + 20, 40, `M${r.width + 14} 22 C${r.width * 0.7} 8 ${r.width * 0.35} 34 6 18`, a, dur); }
    // selection box with four handles around an element (design-tool language)
    function selBox(el, a, aOff, col = C.dark) {
      const s = document.createElement("div"); Object.assign(s.style, { position: "absolute", left: "-14px", right: "-14px", top: "-10px", bottom: "-6px", border: `4px dashed ${col}`, opacity: 0, pointerEvents: "none" });
      [["-13px", "-13px", "auto", "auto"], ["auto", "-13px", "-13px", "auto"], ["-13px", "auto", "auto", "-13px"], ["auto", "auto", "-13px", "-13px"]].forEach(([l, tp, r, b]) => { const h = document.createElement("i"); Object.assign(h.style, { position: "absolute", width: "20px", height: "20px", background: C.ink, border: `4px solid ${col}`, left: l, top: tp, right: r, bottom: b }); s.appendChild(h); });
      el.appendChild(s);
      TL.fromTo(s, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.3, ease: "expo.out", immediateRender: false }, a);
      TL.to(s, { opacity: 0, duration: 0.2, ease: "power2.in" }, aOff);
      return s;
    }
    // mouse cursor: glides in from (dx, dy), clicks at tClick (press 3 f, release); pressEl (optional) dips and overshoots with the click
    function cursor(parent, x, y, a, tClick, pressEl, from = { x: 160, y: 240 }) {
      const s = document.createElementNS("http://www.w3.org/2000/svg", "svg"); Object.assign(s.style, { position: "absolute", left: x + "px", top: y + "px", width: "64px", height: "80px", overflow: "visible" });
      s.innerHTML = `<path d="M4 4 L4 64 L20 50 L32 76 L42 71 L30 46 L52 46 Z" fill="${C.dark}" stroke="${C.paper}" stroke-width="4" stroke-linejoin="round"/>`; (parent || front).appendChild(s);
      gsap.set(s, { opacity: 0, x: from.x, y: from.y });
      TL.to(s, { opacity: 1, x: 0, y: 0, duration: 0.4, ease: "power3.out" }, a);
      if (tClick !== undefined) {
        TL.to(s, { scale: 0.82, duration: 3 * F, transformOrigin: "0 0" }, tClick); TL.to(s, { scale: 1, duration: 0.2 }, tClick + 3 * F);
        if (pressEl) { TL.to(pressEl, { scale: 0.94, duration: 3 * F, ease: "power2.out" }, tClick); over(pressEl, tClick + 3 * F, 0.06); }
      }
      return s;
    }
    // block cursor / caret that blinks from a to b
    function blink(el, a, b, period = 0.4) { for (let t = a; t < b; t += period) { TL.set(el, { opacity: 1 }, t); TL.set(el, { opacity: 0 }, t + period / 2); } }
    // continuous life: a group keeps breathing while it is on screen (never freezes after its entrance)
    function live(el, a, b, k = 0.035) { TL.fromTo(el, { scale: 1 }, { scale: 1 + k, duration: Math.max(0.3, b - a), ease: "sine.inOut", immediateRender: false }, a); }
    // hand to type: a marker scribble draws for 4 f, 1 f ink flash on flashEl, then the clean word is there
    function snap(parent, tok, a, flashEl) {
      const r = tok.tk.getBoundingClientRect(), pr = parent.getBoundingClientRect();
      const sc = mark(parent, r.left - pr.left, r.top - pr.top + r.height * 0.15, r.width, r.height * 0.7,
        `M${r.width * 0.95} ${r.height * 0.45} C${r.width * 0.75} ${r.height * 0.05} ${r.width * 0.6} ${r.height * 0.7} ${r.width * 0.45} ${r.height * 0.3} S${r.width * 0.2} ${r.height * 0.6} ${r.width * 0.05} ${r.height * 0.25}`, a, 4 * F);
      gsap.set(tok.w, { opacity: 0 });
      TL.set(sc, { opacity: 0 }, a + 5 * F); TL.set(tok.w, { opacity: 1 }, a + 5 * F);
      if (flashEl) { TL.set(flashEl, { backgroundColor: C.ink }, a + 5 * F); TL.set(flashEl, { backgroundColor: C.paper }, a + 6 * F); }
    }
    // fly: a whole word or group rides a curved path in from off-screen; pts = offsets from its rest position (first = start)
    function fly(el, a, pts, d = 0.7, rot = 0) {
      gsap.set(el, { opacity: 0 });
      TL.set(el, { opacity: 1 }, a);
      TL.fromTo(el, { x: pts[0].x, y: pts[0].y, rotation: rot }, { motionPath: { path: pts.slice(1).concat([{ x: 0, y: 0 }]), curviness: 1.25, fromCurrent: true }, rotation: 0, duration: d, ease: "power3.out", immediateRender: false }, a);
    }
    // flyOut: exits on a curve with the motion (exits are faster than entrances)
    function flyOut(el, a, pts, d = 0.42, rot = 14, blur = 6) {
      TL.to(el, { motionPath: { path: pts, curviness: 1.2 }, rotation: rot, filter: `blur(${blur}px)`, duration: d, ease: "power3.in" }, a);
      TL.set(el, { opacity: 0 }, a + d + 0.02);
    }
    // echo stack: outline copies stacked above collapse down into the solid word (green=true alternates ink outlines)
    function echoStack(tok, a, n = 5, gap = 0.9, green) {
      const r = tok.tk.getBoundingClientRect(), sr = stage.getBoundingClientRect(); const cl = [];
      for (let k = 1; k <= n; k++) {
        const c = document.createElement("div"); c.className = "el " + (green && k % 2 ? "echoG" : "echo");
        Object.assign(c.style, { left: (r.left - sr.left) + "px", top: (r.top - sr.top) + "px", width: r.width + "px", fontSize: tok.tk.style.fontSize, lineHeight: "1.2", textAlign: "center" });
        if (tok.tk.classList.contains("sans")) c.classList.add("sans");
        const w = document.createElement("span"); w.className = "w"; w.textContent = tok.text; c.appendChild(w); front.appendChild(c); cl.push(c);
        gsap.set(c, { opacity: 0, y: -k * gap * r.height });
        TL.set(c, { opacity: Math.max(0.2, 1 - k * 0.15) }, a);
        TL.to(c, { y: 0, opacity: 0, duration: 0.42, ease: "power3.in" }, a + 0.05 + k * 2 * F);
      }
      return cl;
    }
    // ghost trails: lagging copies inserted behind el (animate them yourself, or use trailsDrop)
    function trails(el, n = 3) { const o = []; for (let k = 1; k <= n; k++) { const c = el.cloneNode(true); c.style.opacity = 0; el.parentNode.insertBefore(c, el); o.push([c, k]); } return o; }
    // squash on impact: flatten 3 f, spring back
    function squash(el, a, sy = 0.84, sx = 1.07) { TL.to(el, { scaleY: sy, scaleX: sx, duration: 3 * F, ease: "power2.out" }, a); TL.to(el, { scaleY: 1, scaleX: 1, duration: 0.35, ease: "back.out(2)" }, a + 3 * F); }
    // trails with squash: el drops from y0 with n ghost copies, squashes on landing, then swings (the warranty tag / the night sheet)
    function trailsDrop(el, a, o = {}) {
      const y0 = o.y ?? -620, r0 = o.rot ?? 10, r1 = o.toRot ?? -7, d = o.d ?? 0.3, n = o.n ?? 3, org = o.origin || "47% 0%";
      gsap.set(el, { opacity: 0, y: y0, rotation: r0, transformOrigin: org });
      TL.set(el, { opacity: 1 }, a);
      TL.to(el, { y: 0, rotation: r1, duration: d, ease: "power3.in" }, a);
      trails(el, n).forEach(([c, k]) => { gsap.set(c, { y: y0, rotation: r0, transformOrigin: org }); TL.set(c, { opacity: (o.ghost ?? 0.35) - k * 0.09 }, a); TL.to(c, { y: 0, rotation: r1, duration: d, ease: "power3.in" }, a + k * 2 * F); TL.set(c, { opacity: 0 }, a + d + k * 2 * F); });
      squash(el, a + d, o.sy ?? 0.84, o.sx ?? 1.07);
      if (o.swing !== false) { TL.to(el, { rotation: 3, duration: 0.5, ease: "sine.inOut" }, a + d + 0.1); TL.to(el, { rotation: -2, duration: 0.7, ease: "sine.inOut" }, a + d + 0.6); TL.to(el, { rotation: 1, duration: 1.0, ease: "sine.inOut" }, a + d + 1.3); }
    }
    // marquee rows: repeated outline word rows sliding in opposite directions from a to b (parent = behind for depth)
    function rows(parent, word, y0, n, size, a, b, cls) {
      wholeWord(word); const els = [];
      for (let k = 0; k < n; k++) {
        const row = document.createElement("div"); row.className = "el " + (cls ? cls[k % cls.length] : (k % 2 ? "echo" : "echoG"));
        Object.assign(row.style, { left: "-400px", top: (y0 + k * size * 1.05) + "px", width: "1900px", whiteSpace: "nowrap", fontSize: size + "px", direction: "rtl" });
        const sp = document.createElement("span"); sp.className = "w"; sp.style.lineHeight = "1"; sp.textContent = (word + "   ").repeat(8); row.appendChild(sp);
        (parent || behind).appendChild(row); els.push(row);
        gsap.set(row, { opacity: 0, x: k % 2 ? -200 : 200 });
        TL.to(row, { opacity: 1, duration: 0.25 }, a + k * 2 * F);
        TL.to(row, { x: k % 2 ? 200 : -200, duration: b - a, ease: "none" }, a);
      }
      return els;
    }
    // zigzag feather fall from off-screen top (sine sway, rotation swings, blur-in focus pull)
    function feather(el, a, o = {}) {
      const from = o.from || { x: 240, y: -560 }, d = o.d ?? 0.9;
      const path = o.path || [{ x: -160, y: -420 }, { x: 140, y: -270 }, { x: -110, y: -130 }, { x: 50, y: -40 }, { x: 0, y: 0 }];
      gsap.set(el, { opacity: 0, filter: "blur(10px)" });
      TL.set(el, { opacity: 1 }, a);
      TL.fromTo(el, { x: from.x, y: from.y }, { motionPath: { path, curviness: 1.6, fromCurrent: true }, duration: d, ease: "sine.out", immediateRender: false }, a);
      [[0, 10], [0.25, -10], [0.5, 7], [0.72, -2], [0.92, 0]].forEach(([t, r]) => TL.to(el, { rotation: r, duration: 0.27, ease: "sine.inOut" }, a + t * d / 0.9));
      TL.to(el, { filter: "blur(0px)", duration: 0.6, ease: "expo.out" }, a);
    }
    // kash stretch (018): a short word is replaced by its long-tatweel twin, which grows out of it (clip from the short width)
    function kash(short, long, a, d = 0.75, rise0 = true) {
      const shortW = short.toks[0].tk.getBoundingClientRect().width, longW = long.toks[0].tk.getBoundingClientRect().width;
      const startPct = Math.max(0, 100 - (shortW / longW) * 100);
      if (rise0) { gsap.set(short.toks[0].w, { yPercent: 118 }); TL.to(short.toks[0].w, { yPercent: 0, duration: 0.3, ease: "expo.out" }, a); }
      const t1 = a + (rise0 ? 0.3 : 0);
      gsap.set(long.toks[0].w, { clipPath: "inset(-30% 0% -40% 100%)" });
      TL.set(long.toks[0].w, { clipPath: `inset(-30% 0% -40% ${startPct.toFixed(1)}%)` }, t1);
      TL.set(short.e, { opacity: 0 }, t1);
      TL.to(long.toks[0].w, { clipPath: "inset(-30% 0% -40% 0%)", duration: d, ease: "sine.inOut" }, t1);
    }
    // kashIn (006): one long-tatweel word revealed right to left
    function kashIn(t, a, d = 0.75) { gsap.set(t.w, { clipPath: "inset(-20% 0% -30% 100%)" }); TL.to(t.w, { clipPath: "inset(-20% 0% -30% 0%)", duration: d, ease: "expo.inOut" }, a); }
    // zoom-out reveal: the word fills the frame and pulls back to rest in 0.28 s
    function zoomOut(el, a, o = {}) { gsap.set(el, { opacity: 0 }); TL.fromTo(el, { scale: o.s ?? 3.0, y: o.y ?? 160, opacity: 1 }, { scale: 1, y: 0, opacity: 1, duration: o.d ?? 0.28, ease: "expo.out", immediateRender: false }, a); }
    // stamp: a bordered word presses down (scale 2.4 -> 1, power4.in), the carrier squashes, then overshoot
    function stamp(parent, text, pos, a, o = {}) {
      const s = document.createElement("div"); s.className = "el";
      Object.assign(s.style, { left: pos.left + "px", top: pos.top + "px", border: `7px solid ${C.ink}`, borderRadius: "14px", color: C.ink, fontFamily: "var(--font-hero)", fontWeight: "var(--hero-weight)", fontSize: (o.s || 74) + "px", lineHeight: "1.15", padding: "0 26px 10px", direction: "rtl" });
      s.textContent = wholeWord(text); parent.appendChild(s);
      gsap.set(s, { opacity: 0, scale: 2.4, rotation: -14 });
      TL.to(s, { opacity: 1, scale: 1, rotation: o.r ?? -8, duration: 0.13, ease: "power4.in" }, a - 0.1);
      if (o.squash !== false) { TL.to(parent, { scaleY: 0.9, scaleX: 1.05, duration: 3 * F, ease: "power2.out" }, a + 0.03); TL.to(parent, { scaleY: 1, scaleX: 1, duration: 0.35, ease: "back.out(2)" }, a + 0.13); }
      over(s, a + 0.12, 0.08);
      return s;
    }
    // impact jolt: everything on screen reacts to a hit in the picture
    function jolt(els, t, y = 18, r = -1.5) { TL.to(els, { y, rotation: r, duration: 0.08, ease: "power2.out" }, t); TL.to(els, { y: 0, rotation: 0, duration: 0.5, ease: "back.out(1.6)" }, t + 0.08); }
    // the camera dive swallows a beat: every element rushes toward the lens
    function swallow(els, t) { els.forEach((e, k) => TL.to(e, { scale: 2.2, opacity: 0, filter: "blur(10px)", x: (k % 2 ? -1 : 1) * 160, duration: 0.3, ease: "power3.in" }, t - 0.12 + k * F)); }
    function out(els, a, to, d = 0.25) { els.forEach((e) => TL.to(e, Object.assign({ opacity: 0, duration: d, ease: "power2.in" }, to), a)); }
    // film grain: 6 tiles flicker on twos over the whole timeline
    function grain(D, op = 0.5) { const g = Array.from(document.querySelectorAll(".grain")); for (let f = 0; f < D * 30; f += 2) g.forEach((el, i) => TL.set(el, { opacity: i === (f / 2) % 6 ? op : 0 }, f * F)); }

    return { F, C, W, E, V, has, words, wholeWord, ltrIsolate, hide, showAt,
             grp, line, scrap, tape, chip, fit,
             rise, inkIn, blurIn, hl, slam, over, typeOn, mark, strike, selBox, cursor, blink, live, snap,
             fly, flyOut, echoStack, trails, squash, trailsDrop, rows, feather, kash, kashIn, zoomOut, stamp, jolt, swallow, out, grain };
  }

  window.Kinetic = { create, wholeWord, words, ltrIsolate, css: CSS, version: "1.0.0" };
})();
