<!DOCTYPE html>
<html lang="ar" data-resolution="portrait">
  <!-- Reel 013, Nov 9: «الموقع الفخم لازم يكون بطيء؟» in ROAR style.
       Picture layer = ONE continuous Google Flow film (Omni frames-to-video, K0->K1->...->K6 chained), retimed to the voice in
       assets/video/bg.mp4. This page adds only the ROAR type and paper overlays (scraps, tags, receipt, stamp), the invert flash,
       grain and the end card. Motion is frame-baked into a paused GSAP timeline (seek-safe). build.py fills __D__ and WORDS. -->
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920">
    <title>Nov 9 premium vs slow</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <style>
      @font-face { font-family: "ZainL"; src: url("assets/fonts/zain-mob-long.ttf") format("truetype"); }
      @font-face { font-family: "InterX"; src: url("assets/fonts/inter-lat-700.woff2") format("woff2"); font-weight: 700; }
      @font-face { font-family: "InterX"; src: url("assets/fonts/inter-lat-800.woff2") format("woff2"); font-weight: 800; }
      @font-face { font-family: "PlexA"; src: url("assets/fonts/IBMPlexSansArabic-Medium.ttf") format("truetype"); font-weight: 500; }
      @font-face { font-family: "PlexA"; src: url("assets/fonts/IBMPlexSansArabic-SemiBold.ttf") format("truetype"); font-weight: 600; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #F0F1F2; }
      #main { position: relative; width: 1080px; height: 1920px; overflow: hidden; font-family: "ZainL", sans-serif; color: #121416; }
      #all { position: absolute; inset: 0; }
      #bgWrap { position: absolute; inset: 0; transform-origin: 540px 900px; }
      #bgWrap video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      #stage { position: absolute; inset: 0; }
      .abs { position: absolute; }
      .ar { direction: rtl; white-space: nowrap; line-height: 1.3; }
      .pl { font-family: "PlexA", sans-serif; font-weight: 600; }
      .lat { font-family: "InterX", sans-serif; font-weight: 800; direction: ltr; }
      .scrap { position: absolute; background: #F0F1F2 url("assets/img/paper.jpg") center/cover; direction: rtl; white-space: nowrap;
               filter: drop-shadow(0 3px 3px rgba(18,20,22,0.30)) drop-shadow(0 8px 14px rgba(18,20,22,0.22));
               display: flex; align-items: center; justify-content: center; }
      .scrap > .in { clip-path: none; }
      .torn { clip-path: polygon(0 6%, 9% 0, 23% 5%, 37% 1%, 54% 5%, 71% 0, 87% 5%, 100% 1%, 99% 50%, 100% 95%, 85% 100%, 66% 95%, 45% 100%, 25% 95%, 7% 100%, 0 94%, 1% 50%); }
      .tape { position: absolute; width: 130px; height: 40px; background: rgba(240,241,242,0.78); box-shadow: 0 1px 3px rgba(18,20,22,0.18); z-index: 3; }
      .w { display: inline-block; }
      #cardWrap { position: absolute; inset: 0; z-index: 40; }
      #card { position: absolute; left: 0; right: 0; top: 0; height: 1920px; background: #121416; }
      .grain { position: absolute; inset: 0; width: 1080px; height: 1920px; mix-blend-mode: soft-light; opacity: 0; z-index: 60; pointer-events: none; }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="__D__" data-width="1080" data-height="1920">
      <div id="all">
        <div id="bgWrap"><video id="bg" src="assets/video/bg.mp4" data-start="0" data-duration="__D__" data-media-start="0" data-track-index="0" muted playsinline></video></div>
        <div id="stage" class="clip" data-start="0" data-duration="__D__" data-track-index="1"></div>
      </div>
      <img class="grain" src="assets/img/grain0.png" alt=""><img class="grain" src="assets/img/grain1.png" alt=""><img class="grain" src="assets/img/grain2.png" alt="">
      <img class="grain" src="assets/img/grain3.png" alt=""><img class="grain" src="assets/img/grain4.png" alt=""><img class="grain" src="assets/img/grain5.png" alt="">
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const WORDS = /*WORDS*/[];
      const D = __D__, FPS = 30, F = 1 / FPS;
      const V = i => WORDS[i][1], E = i => WORDS[i][2];
      const K = "#121416", G = "#00DB33", DG = "#006A39", L = "#F0F1F2";
      const AR = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
      const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
      const lerp = (a, b, p) => a + (b - a) * p;
      const ramp = (t, a, b) => clamp((t - a) / (b - a));
      const expoOut = p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));
      const el = (tag, cls, parent, css = {}, html = "") => { const e = document.createElement(tag); if (cls) e.className = cls; Object.assign(e.style, css); if (html) e.innerHTML = html; parent.appendChild(e); return e; };
      const frames = (a, b, fn) => { for (let f = Math.max(0, Math.round(a * FPS)); f <= Math.round(b * FPS); f++) fn(f * F, f); };
      const at = t => Math.max(0, t - 0.0004);

      async function build() {
        await document.fonts.load('100px "ZainL"'); await document.fonts.load('800 20px "InterX"'); await document.fonts.load('600 40px "PlexA"'); await document.fonts.ready;
        await Promise.all(Array.from(document.images).map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
        const TL = gsap.timeline({ paused: true });
        const stage = document.getElementById("stage"), all = document.getElementById("all"), bgWrap = document.getElementById("bgWrap");
        const fit = (e, maxW) => { const w = e.getBoundingClientRect().width; if (w > maxW) e.style.fontSize = (parseFloat(getComputedStyle(e).fontSize) * maxW / w) + "px"; };

        // a paper scrap carrying words; words = [[text, wordIndex|null, {font, size, col, hl}]]
        // cx/cy = centre of the scrap. Returns {s, ws}
        const scrap = (cx, cy, rot, words, o = {}) => {
          const s = el("div", "scrap" + (o.torn === false ? "" : " torn"), stage, { padding: o.pad || "14px 34px 26px", zIndex: o.z || 10, gap: (o.gap || 18) + "px", background: o.bg || undefined });
          if (o.bg) s.style.backgroundImage = o.bgImg || "none";
          const ws = words.map(([txt, wi, f = {}]) => el("span", "w " + (f.pl ? "pl" : "") + (f.lat ? " lat" : ""), s, { fontSize: (f.size || 84) + "px", color: f.col || o.col || K, lineHeight: f.lh || 1.25 }, txt));
          const r = s.getBoundingClientRect(); s.style.left = (cx - r.width / 2) + "px"; s.style.top = (cy - r.height / 2) + "px";
          if (o.tape !== false) { const tp = el("div", "tape", s, { left: (r.width / 2 - 65 + (o.tapeX || 0)) + "px", top: "-16px", transform: `rotate(${o.tapeR || -4}deg)` }); }
          s._rot = rot; s._ws = ws; s._words = words;
          gsap.set(s, { opacity: 0, rotation: rot });
          ws.forEach((w, k) => { if (words[k][1] !== null && words[k][1] !== undefined) gsap.set(w, { opacity: 0 }); });
          return s;
        };
        // drop a scrap in from off-screen on a curve (0.55 s, overshoot < 3 %)
        const dropIn = (s, t, from = "top", dur = 0.55) => {
          const r = s.getBoundingClientRect();
          const off = { top: { x: 60, y: -(r.top + r.height + 80) }, left: { x: -(r.left + r.width + 60), y: -120 }, right: { x: 1080 - r.left + 60, y: -120 }, bottom: { x: -40, y: 1920 - r.top + 60 } }[from];
          TL.set(s, { opacity: 1 }, t);
          TL.fromTo(s, { x: off.x, y: off.y, rotation: s._rot + (from === "left" ? -14 : 14) }, { x: 0, duration: dur, ease: "power3.out", immediateRender: false }, t);
          TL.fromTo(s, { y: off.y }, { y: 0, duration: dur, ease: "back.out(1.15)", immediateRender: false }, t);
          TL.to(s, { rotation: s._rot, duration: dur + 0.1, ease: "back.out(1.3)" }, t);
        };
        // reveal a word (blurIn, 3 frames)
        const wIn = (w, t) => { TL.fromTo(w, { opacity: 0, filter: "blur(10px)", scale: 1.12 }, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 0.12, ease: "power2.out", immediateRender: false }, t); };
        const wordsIn = s => s._ws.forEach((w, k) => { const i = s._words[k][1]; if (i !== null && i !== undefined) wIn(w, Math.max(0.001, V(i) - 0.03)); });
        // exit: blur out together with the scene (0.4 s)
        const out = (e, t, dx = 0, dy = -30) => TL.to(e, { opacity: 0, filter: "blur(14px)", x: "+=" + dx, y: "+=" + dy, scale: 0.94, duration: 0.4, ease: "power2.in" }, t);
        // kashida stretch on a word element: base = word with a tatweel slot, n tatweels over [a,b]
        const kash = (w, pre, post, n, a, b) => { let lk = -1; frames(a, b, t => { const k = Math.round(n * expoOut(ramp(t, a, b))); if (k !== lk) { TL.set(w, { textContent: pre + "ـ".repeat(k) + post }, at(t)); lk = k; } }); };
        // camera: slow living push on the film
        TL.fromTo(bgWrap, { scale: 1.0 }, { scale: 1.035, duration: D, ease: "none", immediateRender: true }, 0);

        /*BEATS*/

        // grain, every 2 frames
        const grains = Array.from(document.querySelectorAll(".grain"));
        for (let f = 0; f < D * FPS; f += 2) grains.forEach((g, i) => TL.set(g, { opacity: i === (f / 2) % 6 ? 0.38 : 0 }, f * F));
        TL.set({}, {}, D);
        // QA hooks for engine/tools/motion_check.py: one motion event = one overlay piece (a scrap, the receipt, the card) moving
        const MOVE = ["x", "y", "scale", "scaleX", "scaleY", "rotation", "filter", "height"];
        const unitOf = (e) => { while (e && e.parentElement && e.parentElement !== stage && e.parentElement.id !== "cardWrap" && e.parentElement.id !== "card") e = e.parentElement; return e; };
        const moves = () => { const out = []; TL.getChildren(true, true, false).forEach((tw) => {
          const s0 = tw.startTime(), e0 = s0 + tw.totalDuration(); if (e0 - s0 <= 2 * F) return;
          const ks = Object.keys(tw.vars).filter((k) => MOVE.includes(k)); if (!ks.length) return;
          const small = ks.every((k) => (k === "scale" || k === "scaleX" || k === "scaleY") && Math.abs((+tw.vars[k] || 1) - 1) <= 0.05);
          if (small) return;
          (tw.targets() || []).forEach((el) => { if (!el || el.nodeType !== 1 || el.id === "bgWrap" || el.id === "all") return; const u = unitOf(el); if (u && !(u.id === "card" && tw.vars.scale)) out.push([u, s0, e0, u === el]); }); }); return out; };
        const MV = moves(); const uid = new Map(); let un = 0; const idOf = (u) => { if (!uid.has(u)) uid.set(u, "u" + (un++)); return uid.get(u); };
        window.__qaMotion = (time) => {
          const starts = {}; MV.forEach(([u, s0, e0]) => { if (time >= s0 && time < e0) { const k = idOf(u); starts[k] = Math.min(starts[k] ?? 1e9, s0); } });
          const ss = Object.values(starts).sort((a, b) => a - b); let n = 0, last = -1e9; for (const v of ss) { if (v - last > 2 * F + 1e-6) n++; last = v; }
          return { n, units: Object.entries(starts).map(([k, v]) => k + "@" + v.toFixed(2)) };
        };
        window.__qaHolds = () => { const by = new Map(); MV.forEach(([u, s0, e0, whole]) => { if (!whole) return; const k = idOf(u); if (!by.has(k)) by.set(k, []); by.get(k).push([s0, e0]); });
          const out = []; by.forEach((mv, k) => { mv.sort((a, b) => a[0] - b[0]); let end = mv[0][1]; for (let i = 1; i < mv.length; i++) { const gap = mv[i][0] - end; if (gap > 0.001 && gap < 0.6) out.push(k + " " + end.toFixed(2) + "->" + mv[i][0].toFixed(2)); end = Math.max(end, mv[i][1]); } }); return out; };
        window.__timelines["main"] = TL; TL.seek(0);
      }
      window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {};
      window.__hf.buildReady["main"] = build();
    </script>
  </body>
</html>
