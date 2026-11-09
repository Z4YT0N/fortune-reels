<!DOCTYPE html>
<html lang="ar" data-resolution="portrait">
  <!-- Reel 016, Alum Aman test reel (ROAR): pitch sample for «ألمنيوم نظم أمان».
       Picture = Flow Omni film assets/video/bg.mp4 (K0..K7 chained, retimed to the voice).
       This page is ONLY the type/overlay layer: ROAR small word-by-word type above the objects, scraps, tags, the
       contract stamp, the warranty receipt, the teal starburst, the real-photo montage, the split tear, one invert flash, end card.
       Hidden state is set at build time; time-based motion is baked as TL.set per frame. build.py fills __D__ + WORDS. -->
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920">
    <title>Alum Aman test reel ROAR</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/MotionPathPlugin.min.js"></script>
    <style>
      @font-face { font-family: "ThSerif"; src: url("assets/fonts/thmanyahserifdisplay-Black.otf") format("opentype"); font-weight: 900; }
      @font-face { font-family: "ThSerif"; src: url("assets/fonts/thmanyahserifdisplay-Bold.otf") format("opentype"); font-weight: 700; }
      @font-face { font-family: "ThSans"; src: url("assets/fonts/thmanyahsans-Medium.otf") format("opentype"); font-weight: 500; }
      @font-face { font-family: "ThSans"; src: url("assets/fonts/thmanyahsans-Bold.otf") format("opentype"); font-weight: 700; }
      @font-face { font-family: "ThSans"; src: url("assets/fonts/thmanyahsans-Black.otf") format("opentype"); font-weight: 900; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #1d1d1d; }
      #main { position: relative; width: 1080px; height: 1920px; overflow: hidden; font-family: "ThSerif", serif; font-weight: 900; color: #1d1d1d; }
      #inv { position: absolute; inset: 0; }
      #bgWrap { position: absolute; inset: 0; overflow: hidden; transform-origin: 50% 45%; }
      #bgWrap video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      #stage { position: absolute; inset: 0; }
      .abs { position: absolute; }
      .ar { direction: rtl; white-space: nowrap; line-height: 1.35; }
      .sans { font-family: "ThSans", sans-serif; font-weight: 700; }
      .lat { font-family: "ThSans", sans-serif; font-weight: 700; direction: ltr; }
      .scrap { position: absolute; background: #F2F3F3 url("assets/img/paper.jpg") center/cover; color: #121416;
               box-shadow: 0 3px 3px rgba(10,12,12,.30), 0 6px 18px rgba(10,12,12,.22), 0 14px 30px rgba(10,12,12,.12); }
      .tape { position: absolute; width: 120px; height: 38px; background: rgba(226,228,222,.78); box-shadow: 0 1px 2px rgba(0,0,0,.15); }
      .pill { position: absolute; border-radius: 999px; direction: rtl; white-space: nowrap; display: flex; align-items: center; gap: 14px; }
      .grain { position: absolute; inset: 0; width: 1080px; height: 1920px; mix-blend-mode: soft-light; opacity: 0; pointer-events: none; }
      svg.draw { position: absolute; left: 0; top: 0; overflow: visible; pointer-events: none; }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="__D__" data-width="1080" data-height="1920">
      <div id="inv">
        <div id="bgWrap"><video id="bg" src="assets/video/bg.mp4" data-start="0" data-duration="__D__" data-media-start="0" data-track-index="0" muted playsinline></video></div>
        <div id="stage" class="clip" data-start="0" data-duration="__D__" data-track-index="1"></div>
      </div>
      <div id="grains" style="position:absolute;inset:0;pointer-events:none">
        <img class="grain" src="assets/img/grain0.png" alt=""><img class="grain" src="assets/img/grain1.png" alt=""><img class="grain" src="assets/img/grain2.png" alt="">
        <img class="grain" src="assets/img/grain3.png" alt=""><img class="grain" src="assets/img/grain4.png" alt=""><img class="grain" src="assets/img/grain5.png" alt="">
      </div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const WORDS = /*WORDS*/[];
      const POS = /*POS*/{};
      const D = __D__, FPS = 30, F = 1 / FPS;
      const V = i => WORDS[i][1], W = i => WORDS[i][2];
      const K = "#1d1d1d", G = "#0199a2", DG = "#017a82", SG = "#01b8c3", L = "#F2F4F4", GREY = "#6B7076";
      const AR = s => String(s).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]).replace(".", "٫");
      const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
      const lerp = (a, b, p) => a + (b - a) * p;
      const ramp = (t, a, b) => clamp((t - a) / (b - a));
      const expoOut = p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));
      const el = (tag, cls, parent, css = {}, html = "") => { const e = document.createElement(tag); if (cls) e.className = cls; Object.assign(e.style, css); if (html) e.innerHTML = html; parent.appendChild(e); return e; };
      const frames = (a, b, fn) => { for (let f = Math.max(0, Math.round(a * FPS)); f <= Math.round(b * FPS); f++) fn(f * F, f); };
      const at = t => Math.max(0, t - 0.0004);

      async function build() {
        await document.fonts.load('900 100px "ThSerif"'); await document.fonts.load('700 100px "ThSerif"'); await document.fonts.load('700 40px "ThSans"'); await document.fonts.load('500 40px "ThSans"'); await document.fonts.load('900 40px "ThSans"'); await document.fonts.ready;
        await Promise.all(Array.from(document.images).map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
        const TL = gsap.timeline({ paused: true });
        const S = document.getElementById("stage"), bgWrap = document.getElementById("bgWrap"), inv = document.getElementById("inv");
        const measure = (html, size, fam = "ThSerif") => { const s = el("span", "ar", document.body, { position: "absolute", left: "-5000px", top: "0", fontSize: size + "px", fontFamily: fam, fontWeight: fam === "ThSerif" ? 900 : 700 }, html); const r = s.getBoundingClientRect().width; s.remove(); return r; };
        const fit = (e, maxW) => { const w = e.getBoundingClientRect().width; if (w > maxW) e.style.fontSize = (parseFloat(e.style.fontSize) * maxW / w) + "px"; };
        // ── shared moves ──
        const blurIn = (e, t, d = 0.32) => { gsap.set(e, { opacity: 0, y: 14, filter: "blur(8px)" }); TL.to(e, { opacity: 1, y: 0, filter: "blur(0px)", duration: d, ease: "expo.out" }, t); };
        const blurOut = (e, t, d = 0.38) => TL.to(e, { opacity: 0, filter: "blur(10px)", scale: 0.96, duration: d, ease: "power2.in" }, t);
        const drop = (e, t, rot, fromY = -900, d = 0.6) => { gsap.set(e, { y: fromY, rotation: rot * 3, opacity: 1 }); TL.to(e, { y: 0, rotation: rot, duration: d, ease: "back.out(1.4)" }, t); };
        const live = (e, t0, t1, s = 1.03) => TL.fromTo(e, { scale: 1 }, { scale: s, duration: Math.max(0.3, t1 - t0), ease: "none", immediateRender: false }, t0);
        const scrap = (x, y, w, h, rot, tapes = 1) => { const s = el("div", "scrap", S, { left: x + "px", top: y + "px", width: w + "px", height: h + "px", clipPath: tornClip(w, h, x + y) }); const wrap = el("div", "abs", S, { left: "0", top: "0", width: "1080px", height: "1920px", pointerEvents: "none" }); s.remove(); wrap.appendChild(s); if (tapes) { el("div", "tape", wrap, { left: (x + w / 2 - 60) + "px", top: (y - 16) + "px", transform: `rotate(${-rot * 2 - 4}deg)` }); } wrap._s = s; wrap.style.transformOrigin = `${x + w / 2}px ${y}px`; return wrap; };
        function tornClip(w, h, seed) { let r = seed * 9301 % 233280; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280; const p = []; const n = 14;
          for (let i = 0; i <= n; i++) p.push(`${(i / n * 100).toFixed(1)}% ${(rnd() * 3).toFixed(1)}%`);
          for (let i = 0; i <= n; i++) p.push(`${(100 - rnd() * 2).toFixed(1)}% ${(i / n * 100).toFixed(1)}%`);
          for (let i = n; i >= 0; i--) p.push(`${(i / n * 100).toFixed(1)}% ${(100 - rnd() * 4).toFixed(1)}%`);
          for (let i = n; i >= 0; i--) p.push(`${(rnd() * 2).toFixed(1)}% ${(i / n * 100).toFixed(1)}%`);
          return `polygon(${p.join(",")})`; }
        const word = (parent, txt, css) => el("div", "abs ar", parent, css, txt);
        const line = (x1, y1, x2, y2, t, col = G, wdt = 7) => { const sv = document.createElementNS("http://www.w3.org/2000/svg", "svg"); sv.setAttribute("class", "draw"); sv.setAttribute("width", "1080"); sv.setAttribute("height", "1920"); S.appendChild(sv);
          const mx = (x1 + x2) / 2 + (y2 - y1) * 0.18, my = (y1 + y2) / 2 - (x2 - x1) * 0.18;
          const p = document.createElementNS("http://www.w3.org/2000/svg", "path"); p.setAttribute("d", `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`); p.setAttribute("fill", "none"); p.setAttribute("stroke", col); p.setAttribute("stroke-width", wdt); p.setAttribute("stroke-linecap", "round"); sv.appendChild(p);
          const len = p.getTotalLength(); gsap.set(p, { strokeDasharray: len, strokeDashoffset: len }); TL.to(p, { strokeDashoffset: 0, duration: 0.32, ease: "power2.out" }, t);
          const ang = Math.atan2(y2 - my, x2 - mx), hd = document.createElementNS("http://www.w3.org/2000/svg", "path"), a1 = ang + 2.6, a2 = ang - 2.6;
          hd.setAttribute("d", `M${x2 + 30 * Math.cos(a1)} ${y2 + 30 * Math.sin(a1)} L${x2} ${y2} L${x2 + 30 * Math.cos(a2)} ${y2 + 30 * Math.sin(a2)}`); hd.setAttribute("fill", "none"); hd.setAttribute("stroke", col); hd.setAttribute("stroke-width", wdt); hd.setAttribute("stroke-linecap", "round"); hd.setAttribute("stroke-linejoin", "round"); sv.appendChild(hd);
          gsap.set(hd, { opacity: 0 }); TL.set(hd, { opacity: 1 }, t + 0.3); return sv; };
        // kashida stretch: one string grows tatweels after a given letter prefix
        const kash = (e, pre, post, t0, t1, n) => { let lk = -1; frames(t0, t1, t => { const k = Math.round(n * expoOut(ramp(t, t0, t1))); if (k !== lk) { TL.set(e, { textContent: pre + "ـ".repeat(k) + post }, at(t)); lk = k; } }); };
        
        /*BEATS*/

        // grain, every 2 frames
        const grains = Array.from(document.querySelectorAll(".grain"));
        for (let f = 0; f < D * FPS; f += 2) grains.forEach((g, i) => TL.set(g, { opacity: i === (f / 2) % 6 ? 0.45 : 0 }, f * F));
        TL.set({}, {}, D);
        window.__timelines["main"] = TL; TL.seek(0);
      }
      window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {};
      window.__hf.buildReady["main"] = build();
    </script>
  </body>
</html>
