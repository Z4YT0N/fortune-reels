<!DOCTYPE html>
<html lang="ar" data-resolution="portrait">
  <!-- 009 / Nov 9: «هل لازم الموقع الفخم يكون بطيء؟» in the 008 showreel vocabulary.
       Thread objects: a balance SCALE (left pan = the premium site, right pan = speed) and the cursor.
       B1 hook: «الفخم» kashida stretch, «بطيء؟» slow kashida, «لا.» redaction slab stamped by the cursor.
       B2 weights drop on the left pan (CSS 3D cube / photo / motion badge), label pills with leader lines, beam sinks per drop.
       B3 speech bubble + segmented toggle (فخم | سريع): the knob is dragged to سريع and springs back.
       B4 twist: selection box lifts the luxury off the pan, the pan stays down; a tangled scribble draws on = «ما انضبط»,
          it drags the pan out of frame and pulls the dark world up (ext.js).
       Scale angle, pan positions, counters and kashida are BAKED per frame as TL.set (seek-safe). build.py fills __D__ and WORDS. -->
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920">
    <title>Nov 9 premium reel</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/MotionPathPlugin.min.js"></script>
    <style>
      @font-face { font-family: "ZainL"; src: url("assets/fonts/zain-mob-long.ttf") format("truetype"); }
      @font-face { font-family: "InterX"; src: url("assets/fonts/inter-lat-700.woff2") format("woff2"); font-weight: 700; }
      @font-face { font-family: "PlexA"; src: url("assets/fonts/IBMPlexSansArabic-Medium.ttf") format("truetype"); font-weight: 500; }
      @font-face { font-family: "PlexA"; src: url("assets/fonts/IBMPlexSansArabic-SemiBold.ttf") format("truetype"); font-weight: 600; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #F0F1F2; }
      #main { position: relative; width: 1080px; height: 1920px; overflow: hidden; font-family: "ZainL", sans-serif; color: #121416; }
      .abs { position: absolute; }
      .ar { direction: rtl; white-space: nowrap; line-height: 1.3; }
      .px { font-family: "PlexA", sans-serif; font-weight: 600; }
      #world { position: absolute; inset: 0; background: #F0F1F2; overflow: hidden; z-index: 0; transform-origin: 540px 900px; }
      .lab { position: absolute; font-family: "PlexA", sans-serif; font-weight: 600; font-size: 24px; white-space: nowrap; }
      .pill { position: absolute; border-radius: 999px; direction: rtl; white-space: nowrap; line-height: 1.25; display: flex; align-items: center; justify-content: center; }
      .pan { position: absolute; left: 0; top: 0; width: 300px; height: 230px; transform-origin: 150px 0px; }
      .cube { position: absolute; width: 96px; height: 96px; transform-style: preserve-3d; }
      .face { position: absolute; width: 96px; height: 96px; border-radius: 14px; border: 4px solid #121416; }
      .ripple { position: absolute; width: 120px; height: 120px; margin: -60px 0 0 -60px; border-radius: 50%; border: 5px solid #00DB33; opacity: 0; }
      #cur { position: absolute; left: 0; top: 0; z-index: 50; width: 58px; height: 80px; transform-origin: 0 0; }
      .grain { position: absolute; inset: 0; width: 1080px; height: 1920px; mix-blend-mode: soft-light; opacity: 0; z-index: 60; pointer-events: none; }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="__D__" data-width="1080" data-height="1920">
      <div id="stage" class="clip" data-start="0" data-duration="__D__" data-track-index="1" style="position:absolute;inset:0">
        <div id="world"></div>
        <svg id="cur" viewBox="-4 -4 40 52"><path d="M0 0 L0 38 L10 29 L17 45 L24 42 L17 26 L30 26 Z" fill="#F0F1F2" stroke="#121416" stroke-width="3" stroke-linejoin="round"/></svg>
        <img class="grain" src="assets/img/grain0.png"><img class="grain" src="assets/img/grain1.png"><img class="grain" src="assets/img/grain2.png">
        <img class="grain" src="assets/img/grain3.png"><img class="grain" src="assets/img/grain4.png"><img class="grain" src="assets/img/grain5.png">
      </div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const WORDS = /*WORDS*/[];
      const D = __D__, FPS = 30, F = 1 / FPS, TAU = Math.PI * 2;
      const V = i => WORDS[i][1], W = i => WORDS[i][2];
      const K = "#121416", G = "#00DB33", DG = "#006A39", L = "#F0F1F2", GREY = "#8B9096";
      const AR = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
      const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
      const lerp = (a, b, p) => a + (b - a) * p;
      const ramp = (t, a, b) => clamp((t - a) / (b - a));
      const expoOut = p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));
      const inOut = p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
      const el = (tag, cls, parent, css = {}, html = "") => { const e = document.createElement(tag); if (cls) e.className = cls; Object.assign(e.style, css); if (html) e.innerHTML = html; parent.appendChild(e); return e; };
      const frames = (a, b, fn) => { for (let f = Math.max(0, Math.round(a * FPS)); f <= Math.round(b * FPS); f++) fn(f * F, f); };
      const at = t => Math.max(0, t - 0.0004);
      // damped spring step (zeta 0.75 -> ~3 % overshoot)
      const spring = (dt, w = 13, z = 0.75) => { if (dt <= 0) return 0; const wd = w * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w * dt) * (Math.cos(wd * dt) + z / Math.sqrt(1 - z * z) * Math.sin(wd * dt)); };

      async function build() {
        await document.fonts.load('100px "ZainL"'); await document.fonts.load('700 20px "InterX"'); await document.fonts.load('500 40px "PlexA"'); await document.fonts.load('600 40px "PlexA"'); await document.fonts.ready;
        await Promise.all(Array.from(document.images).map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
        const TL = gsap.timeline({ paused: true });
        const stage = document.getElementById("stage"), world = document.getElementById("world"), cur = document.getElementById("cur");
        const PF = '"PlexA", sans-serif';
        const measure = (html, size, fam = "ZainL") => { const s = el("span", "ar", document.body, { position: "absolute", left: "-5000px", top: "0", fontSize: size + "px", fontFamily: fam }, html); const r = s.getBoundingClientRect().width; s.remove(); return r; };
        const fit = (e, maxW) => { const w = e.getBoundingClientRect().width; if (w > maxW) e.style.fontSize = (parseFloat(e.style.fontSize) * maxW / w) + "px"; };
        const ctr = (e, cx, cy) => { const r = e.getBoundingClientRect(); e.style.left = (cx - r.width / 2) + "px"; e.style.top = (cy - r.height / 2) + "px"; };
        // entrance moves (hidden state is set at build time; only TL.to out of it)
        const blurIn = (e, t, d = 0.45) => { gsap.set(e, { opacity: 0, y: 18, filter: "blur(10px)" }); TL.to(e, { opacity: 1, y: 0, filter: "blur(0px)", duration: d, ease: "expo.out" }, t); };
        const popIn = (e, t, rot = 0) => { gsap.set(e, { opacity: 0, scale: 0, rotation: rot * 2.5 }); TL.set(e, { opacity: 1 }, t); TL.to(e, { scale: 1, rotation: rot, duration: 0.55, ease: "back.out(1.6)" }, t); };
        const zoomOut = (e, t, s = 2.6) => { gsap.set(e, { opacity: 0, scale: s, filter: "blur(10px)" }); TL.set(e, { opacity: 1 }, t); TL.to(e, { scale: 1, filter: "blur(0px)", duration: 0.5, ease: "expo.out" }, t); };
        const slamIn = (e, t) => { gsap.set(e, { opacity: 0 }); TL.set(e, { opacity: 1, x: 260, scaleX: 1.35, skewX: -12, filter: "blur(9px)" }, t - 2 * F); TL.to(e, { x: 0, scaleX: 1, skewX: 0, filter: "blur(0px)", duration: 0.5, ease: "expo.out" }, t); };
        const inkIn = (e, t, to = K) => { gsap.set(e, { opacity: 0, y: 30, color: "#B4B9BE" }); TL.to(e, { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" }, t); TL.to(e, { color: to, duration: 0.3 }, t + 0.22); };
        const curveIn = (e, t, dx = 900, dy = -500, rot = 20) => { gsap.set(e, { x: dx, y: dy, rotation: rot, opacity: 0 }); TL.set(e, { opacity: 1 }, t - 0.36); TL.to(e, { motionPath: { path: [{ x: dx * 0.4, y: dy * 0.5 - 80 }, { x: 0, y: 0 }], curviness: 1.4 }, rotation: 0, duration: 0.55, ease: "expo.out" }, t - 0.36); };
        const exitUp = (els, t) => TL.to(els, { y: -140, opacity: 0, filter: "blur(10px)", duration: 0.38, ease: "power2.in", stagger: 0.03 }, t);
        const ripple = (x, y, t, col = G) => { const r = el("div", "ripple", stage, { left: x + "px", top: y + "px", borderColor: col, zIndex: 49 }); TL.fromTo(r, { opacity: 1, scale: 0.25 }, { opacity: 0, scale: 1.5, duration: 0.5, ease: "expo.out", immediateRender: false }, t); };
        const press = t => { TL.to(cur, { scale: 0.78, duration: 0.06, ease: "power2.out" }, t - 0.06); TL.to(cur, { scale: 1, duration: 0.25, ease: "back.out(2)" }, t); };
        const curTo = (x, y, t, d = 0.5, ease = "power3.inOut") => TL.to(cur, { x, y, duration: d, ease }, t);

        // ── corner credits, both worlds
        const labels = (parent, col) => {
          const box = el("div", "", parent, { position: "absolute", inset: "0", color: col });
          [["fortunecode.org", 60, 232, "l"], ["٢٠٢٦", 60, 1404, "l"], ["فورتشن كود", 960, 1404, "r"]].forEach(([s, x, y, a]) => {
            const l = el("div", "lab", box, { top: y + "px" }, s);
            if (a === "l") l.style.left = x + "px"; else l.style.right = (1080 - x) + "px";
          });
          return box;
        };
        const labW = labels(world, "#9AA0A6");

        // ═══ the SCALE (thread object) ═══
        const PX = 510, PY = 830, HL = 300;
        const post = el("div", "abs", world, { left: (PX - 11) + "px", top: PY + "px", width: "22px", height: (1388 - PY) + "px", background: K, borderRadius: "11px", zIndex: 2 });
        const base = el("div", "abs", world, { left: (PX - 150) + "px", top: "1376px", width: "300px", height: "40px", background: K, borderRadius: "20px 20px 10px 10px", zIndex: 2 });
        const beam = el("div", "abs", world, { left: (PX - 330) + "px", top: (PY - 10) + "px", width: "660px", height: "20px", background: K, borderRadius: "10px", zIndex: 4 });
        const cap = el("div", "abs", world, { left: (PX - 26) + "px", top: (PY - 26) + "px", width: "52px", height: "52px", background: G, border: "8px solid #121416", borderRadius: "50%", zIndex: 5 });
        const mkPan = () => {
          const p = el("div", "pan", world, { zIndex: 6 });
          el("div", "", p, { position: "absolute", left: "0", top: "0", width: "300px", height: "212px" }, `<svg width="300" height="212" viewBox="0 0 300 212"><path d="M150 4 L14 206 M150 4 L286 206" stroke="#121416" stroke-width="4" fill="none"/><circle cx="150" cy="6" r="8" fill="#121416"/></svg>`);
          el("div", "abs", p, { left: "0", top: "200px", width: "300px", height: "26px", background: K, borderRadius: "6px 6px 40px 40px" });
          const items = el("div", "abs", p, { left: "0", top: "0", width: "300px", height: "200px" });
          p._items = items; return p;
        };
        const panL = mkPan(), panR = mkPan();
        // left pan: the premium site (dark card with a hero photo + green button)
        const site = el("div", "abs", panL._items, { left: "14px", top: "22px", width: "272px", height: "178px", borderRadius: "22px", background: K, overflow: "hidden", boxShadow: "0 14px 30px rgba(18,20,22,0.25)" });
        const siteImg = el("img", "", site, { position: "absolute", left: "10px", top: "26px", width: "252px", height: "100px", borderRadius: "14px", objectFit: "cover" }); siteImg.src = "assets/img/t1.jpg";
        [0, 1, 2].forEach(k => el("div", "abs", site, { left: (14 + k * 14) + "px", top: "9px", width: "8px", height: "8px", borderRadius: "50%", background: "#3A3E43" }));
        el("div", "abs", site, { right: "12px", top: "136px", width: "110px", height: "14px", borderRadius: "7px", background: "#3A3E43" });
        el("div", "abs", site, { left: "12px", top: "134px", width: "84px", height: "32px", borderRadius: "16px", background: G });
        // weights that drop in B2
        const cubeBox = el("div", "abs", panL._items, { left: "26px", top: "-104px", width: "96px", height: "96px", perspective: "600px" });
        const cube = el("div", "cube", cubeBox);
        [["rotateY(0deg)", G], ["rotateY(90deg)", "#00B82B"], ["rotateY(180deg)", G], ["rotateY(-90deg)", "#00B82B"], ["rotateX(90deg)", "#5CF07C"], ["rotateX(-90deg)", DG]].forEach(([tr, c]) => el("div", "face", cube, { background: c, transform: `${tr} translateZ(48px)` }));
        gsap.set(cube, { rotationX: -22, rotationY: 30 });
        TL.to(cube, { rotationY: 30 + 360 * 4, duration: D, ease: "none" }, 0);
        const photo = el("div", "abs", panL._items, { left: "120px", top: "-128px", width: "128px", height: "128px", borderRadius: "26px", overflow: "hidden", border: "6px solid #F0F1F2", boxShadow: "0 12px 26px rgba(18,20,22,0.3)", transform: "rotate(7deg)" }, `<img src="assets/img/t2.jpg" style="width:100%;height:100%;object-fit:cover;display:block">`);
        const motion = el("div", "abs", panL._items, { left: "196px", top: "-98px", width: "94px", height: "94px", borderRadius: "26px", background: K, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 12px 26px rgba(18,20,22,0.3)" },
          `<svg viewBox="0 0 60 60" width="56" height="56"><path d="M20 14 L48 30 L20 46 Z" fill="#00DB33"/></svg>`);
        const lux = [cubeBox, photo, motion];
        // tangled scribble (B4), hidden until drawn
        let sd = "M 150 150", seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
        for (let k = 0; k < 26; k++) sd += ` Q ${(40 + rnd() * 220).toFixed(0)} ${(30 + rnd() * 170).toFixed(0)} ${(50 + rnd() * 200).toFixed(0)} ${(50 + rnd() * 150).toFixed(0)}`;
        const scrib = el("div", "abs", panL._items, { left: "0", top: "0", width: "300px", height: "200px" }, `<svg width="300" height="200" viewBox="0 0 300 200" overflow="visible"><path id="scr" d="${sd}" fill="none" stroke="#121416" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
        const scr = scrib.querySelector("path"); const SL = scr.getTotalLength();
        gsap.set(scr, { strokeDasharray: SL, strokeDashoffset: SL }); gsap.set(scrib, { opacity: 0 });
        // right pan: speed (lightning badge)
        const bolt = el("div", "abs", panR._items, { left: "80px", top: "60px", width: "140px", height: "140px", borderRadius: "50%", background: K, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 14px 30px rgba(18,20,22,0.25)" },
          `<svg viewBox="0 0 60 60" width="84" height="84"><path d="M34 4 L12 34 H28 L24 56 L48 24 H32 Z" fill="#00DB33" stroke="#00DB33" stroke-width="2" stroke-linejoin="round"/></svg>`);

        // beam angle (deg, negative = left pan down): sum of spring steps; "i" = instant (hidden reset)
        const EV = [];
        let evDirty = false;
        const ev = (t, to, w = 13, mode = "") => { EV.push({ t, to, w, mode }); evDirty = true; };
        const thetaAt = t => { if (evDirty) { EV.sort((a, b) => a.t - b.t); evDirty = false; } let th = -6, prev = -6; for (const e of EV) { const d = e.to - prev; if (t >= e.t) th += e.mode === "i" ? d : d * spring(t - e.t, e.w); prev = e.to; } return th; };
        const placeScale = (t) => {
          const th = thetaAt(t), r = th * Math.PI / 180, vel = thetaAt(t) - thetaAt(t - 0.08);
          const sw = clamp(-vel * 1.6, -9, 9);
          TL.set(beam, { rotation: th }, at(t));
          [[panL, -1], [panR, 1]].forEach(([p, s]) => TL.set(p, { x: PX + s * HL * Math.cos(r) - 150, y: PY + s * HL * Math.sin(r) + (s < 0 ? panDrop(t) : 0), rotation: sw + (s < 0 ? panDrop(t) * 0.02 : 0) }, at(t)));
        };

        // the tangled pan snaps off and falls (PLUNGE..RESET), set in B4 / ext.js
        let PLUNGE = 1e9, RESET = 1e9;
        const panDrop = t => (t >= PLUNGE && t < RESET) ? 1700 * Math.pow(ramp(t, PLUNGE, PLUNGE + 0.55), 2.2) : 0;

        // ═══ B1 hook «الموقع الفخم لازم يكون بطيء؟ لا.» ═══
        const h1 = el("div", "abs ar px", world, { right: "120px", top: "262px", fontSize: "60px", color: GREY }, "الموقع");
        const h2 = el("div", "abs ar", world, { right: "120px", top: "296px", fontSize: "220px", color: K, transformOrigin: "100% 60%" }, "الفخم");
        const h3 = el("div", "abs ar px", world, { right: "124px", top: "596px", fontSize: "54px", color: K }, "لازم يكون");
        const h4 = el("div", "abs ar", world, { left: "110px", top: "585px", fontSize: "150px", color: GREY, transformOrigin: "0% 60%" }, "بطيء؟");
        // kashida counts that keep each word inside its own column (الفخم: x >= 430, بطيء: x <= 410)
        const kmax = (pre, post, size, maxW) => { let n = 0; while (n < 12 && measure(pre + "ـ".repeat(n + 1) + post, size) <= maxW) n++; return n; };
        const NK2 = Math.min(6, kmax("الفخ", "م", 220, 640)), NK4 = Math.min(6, kmax("بط", "يء؟", 150, 300));
        gsap.set(h1, { x: 90, opacity: 0.35 }); TL.to(h1, { x: 0, opacity: 1, duration: 0.45, ease: "expo.out" }, 0);
        gsap.set(h2, { opacity: 0, scale: 2.2, filter: "blur(12px)" }); TL.set(h2, { opacity: 1 }, V(1) - 0.12); TL.to(h2, { scale: 1, filter: "blur(0px)", duration: 0.5, ease: "expo.out" }, V(1) - 0.12);
        // luxury stretch: «الفخم» grows its kashida as it lands
        let lk = -1;
        frames(V(1) + 0.1, V(4), (t) => { const n = Math.round(NK2 * expoOut(ramp(t, V(1) + 0.1, V(2) + 0.2))); if (n !== lk) { TL.set(h2, { textContent: n ? "الفخ" + "ـ".repeat(n) + "م" : "الفخم" }, at(t)); lk = n; } });
        inkIn(h3, V(2) - 0.08);
        // «بطيء؟» lands and keeps stretching slowly (slow = a long tail)
        gsap.set(h4, { opacity: 0, y: -60 }); TL.to(h4, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }, V(4) - 0.06);
        let lb = -1;
        frames(V(4) + 0.15, V(5) + 0.1, (t) => { const n = Math.round(NK4 * Math.pow(ramp(t, V(4) + 0.15, V(5) + 0.1), 1.3)); if (n !== lb) { TL.set(h4, { textContent: n ? "بط" + "ـ".repeat(n) + "يء؟" : "بطيء؟" }, at(t)); lb = n; } });
        // «لا.» : the cursor stamps a green slab over «بطيء؟»
        const slab = el("div", "abs", world, { left: "90px", top: "604px", width: "340px", height: "196px", borderRadius: "28px", background: G, zIndex: 7, clipPath: "inset(0 0 0 100% round 28px)" });
        const no = el("div", "abs ar", slab, { left: "0", width: "100%", top: "-24px", textAlign: "center", fontSize: "200px", color: K }, "لا.");
        gsap.set(no, { scale: 1.6, opacity: 0 });
        gsap.set(cur, { x: 1100, y: 1500 });
        curTo(300, 760, V(5) - 0.55, 0.5);
        press(V(5)); ripple(300, 740, V(5));
        TL.to(slab, { clipPath: "inset(0 0 0 0% round 28px)", duration: 0.2, ease: "expo.out" }, V(5) + 0.02);
        TL.to(no, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2)" }, V(5) + 0.06);
        TL.to(slab, { rotation: -4, duration: 0.4, ease: "back.out(2)" }, V(5) + 0.1);
        curTo(1000, 1250, V(5) + 0.3, 0.6, "power2.inOut");
        exitUp([h1, h2, h3], V(6) - 0.1);
        TL.to([slab, h4], { y: -160, opacity: 0, filter: "blur(10px)", duration: 0.38, ease: "power2.in" }, V(6) + 0.3);

        // ═══ B2 «ثري دي، صور كبيرة، وحركة في كل مكان.» : weights drop on the left pan ═══
        ev(V(4), -14, 6);           // «بطيء» : the site sinks slowly
        const drops = [[cubeBox, V(6) - 0.1, -18], [photo, V(8) - 0.1, -22], [motion, V(10) - 0.1, -26]];
        drops.forEach(([e, t, th]) => { gsap.set(e, { y: -1100, opacity: 0 }); TL.set(e, { opacity: 1 }, t - 0.3); TL.to(e, { y: 0, duration: 0.3, ease: "power2.in" }, t - 0.3); ev(t, th, 14); });
        // each weight lands, then its label leaves it and travels up on a curve to the right column
        const IR = [[74, -56], [184, -64], [243, -51]];
        const tags = [["ثري دي،", V(6), 330], ["صور كبيرة،", V(8), 430], ["وحركة", V(10), 530]].map(([s, t, y], k) => {
          const p = el("div", "pill px", world, { fontSize: "54px", background: k === 2 ? G : K, color: k === 2 ? K : L, padding: "4px 38px 12px", zIndex: 8 }, s);
          const r = p.getBoundingClientRect(); p.style.left = (960 - r.width) + "px"; p.style.top = (y - r.height / 2) + "px";
          const th = thetaAt(t + 0.3) * Math.PI / 180, hx = PX - HL * Math.cos(th) - 150, hy = PY - HL * Math.sin(th);
          const dx = hx + IR[k][0] - (960 - r.width / 2), dy = hy + IR[k][1] - y;
          gsap.set(p, { x: dx, y: dy, scale: 0.2, opacity: 0 });
          TL.set(p, { opacity: 1 }, t);
          TL.to(p, { motionPath: { path: [{ x: dx * 0.45, y: dy * 0.2 - 120 }, { x: 0, y: 0 }], curviness: 1.4 }, scale: 1, rotation: k === 1 ? -3 : 3, duration: 0.55, ease: "expo.out" }, t);
          return p;
        });
        // «في كل مكان» : motion trails sweep across the frame
        const trails = [];
        for (let k = 0; k < 4; k++) {
          const y0 = 300 + k * 90;
          const s = el("div", "abs", world, { left: "0", top: "0", width: "1080px", height: "1920px", zIndex: 3 }, `<svg width="1080" height="1920"><path d="M -40 ${y0} C 260 ${y0 - 120}, 520 ${y0 + 150}, 1120 ${y0 - 40}" fill="none" stroke="${k % 2 ? K : G}" stroke-width="${10 - k}" stroke-linecap="round"/></svg>`);
          const pth = s.querySelector("path"), ll = pth.getTotalLength();
          gsap.set(pth, { strokeDasharray: `${ll * 0.28} ${ll * 1.4}`, strokeDashoffset: ll * 0.28 });
          TL.to(pth, { strokeDashoffset: -ll * 1.05, duration: 0.7, ease: "power2.inOut" }, V(11) + k * 0.12);
          trails.push(s);
        }
        const kul = el("div", "abs ar", world, { left: "110px", top: "300px", fontSize: "130px", color: K, display: "flex", gap: "22px", alignItems: "baseline" });
        const kfi = el("span", "px", kul, { fontSize: "50px", color: GREY }, "في"), kkl = el("span", "", kul, {}, "كل"), kmk = el("span", "", kul, { color: K }, "مكان.");
        fit(kul, 470);
        blurIn(kfi, V(11)); blurIn(kkl, V(12)); slamIn(kmk, V(13));
        exitUp([kul, ...tags], V(14) - 0.2);
        // the motion badge bounces on «في كل مكان» (it is "everywhere")
        TL.to(motion, { y: -26, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 3 }, V(11));

        // ═══ B3 «يقولون لك: لازم تختار، يا فخم يا سريع.» : the toggle that cannot have both ═══
        const bub = el("div", "abs ar px", world, { right: "132px", top: "262px", fontSize: "50px", color: K, background: "#DCDFE2", borderRadius: "40px 40px 8px 40px", padding: "6px 36px 14px" }, "يقولون لك:");
        const tkh = el("div", "abs ar", world, { right: "120px", top: "330px", fontSize: "160px", color: K }, "لازم تختار،");
        fit(tkh, 820);
        popIn(bub, V(14) - 0.05, -3);
        gsap.set(tkh, { opacity: 0, scale: 0.6, y: 40, transformOrigin: "100% 60%" }); TL.to(tkh, { opacity: 1, scale: 1, y: 0, duration: 0.55, ease: "back.out(1.5)" }, V(16) - 0.05);
        const tog = el("div", "abs", world, { left: "180px", top: "588px", width: "720px", height: "124px", borderRadius: "62px", background: K, zIndex: 8 });
        const knob = el("div", "abs", tog, { left: "368px", top: "10px", width: "342px", height: "104px", borderRadius: "52px", background: G });
        const segF = el("div", "abs ar px", tog, { left: "360px", width: "360px", top: "14px", textAlign: "center", fontSize: "60px", color: K }, "فخم");
        const segS = el("div", "abs ar px", tog, { left: "0", width: "360px", top: "14px", textAlign: "center", fontSize: "60px", color: L }, "سريع");
        gsap.set(tog, { opacity: 0, scaleX: 0.3 }); TL.to(tog, { opacity: 1, scaleX: 1, duration: 0.5, ease: "expo.out" }, V(17) - 0.05);
        gsap.set(knob, { x: 0, opacity: 0 }); gsap.set([segF, segS], { color: GREY });
        // «فخم» : the cursor clicks فخم, knob lands, the site sinks deeper
        curTo(720, 680, V(19) - 0.5, 0.45); press(V(19)); ripple(720, 660, V(19));
        TL.to(knob, { opacity: 1, duration: 0.15 }, V(19)); TL.fromTo(knob, { scaleX: 0.6 }, { scaleX: 1, duration: 0.45, ease: "back.out(1.6)", immediateRender: false }, V(19));
        TL.to(segF, { color: K, duration: 0.15 }, V(19) + 0.05);
        ev(V(19) + 0.05, -28, 12);
        // «سريع» : drag the knob to سريع, the beam tries to lift, everything springs back
        TL.to(cur, { x: 360, y: 680, duration: 0.4, ease: "power2.inOut" }, V(21) - 0.15);
        TL.to(knob, { x: -230, duration: 0.4, ease: "power2.inOut" }, V(21) - 0.15);
        TL.to(segS, { color: L, duration: 0.15 }, V(21)); TL.to(segF, { color: GREY, duration: 0.15 }, V(21));
        ev(V(21) + 0.05, -18, 10);
        TL.to(knob, { x: 0, duration: 0.45, ease: "back.out(1.6)" }, V(21) + 0.3);
        TL.to(segS, { color: GREY, duration: 0.15 }, V(21) + 0.35); TL.to(segF, { color: K, duration: 0.15 }, V(21) + 0.35);
        ev(V(21) + 0.32, -26, 12);
        TL.to(cur, { x: 640, y: 760, duration: 0.45, ease: "power2.out" }, V(21) + 0.3);
        exitUp([bub, tkh, tog], V(22) - 0.25);

        // ═══ B4 «بس الفخامة مو هي اللي تبطئ.» : lift the luxury off, the pan stays down ═══
        const bs = el("div", "abs ar px", world, { right: "120px", top: "262px", fontSize: "60px", color: GREY }, "بس");
        const fkh = el("div", "abs ar", world, { right: "120px", top: "300px", fontSize: "200px", color: K }, "الفخامة");
        const mhi = el("div", "abs ar px", world, { right: "124px", top: "586px", fontSize: "56px", color: K, display: "flex", gap: "16px" });
        const mhW = ["مو", "هي", "اللي", "تبطئ."].map(s => el("span", "", mhi, { display: "inline-block", position: "relative" }, s));
        const strike = el("div", "abs", mhW[3], { left: "-6px", right: "-6px", top: "54%", height: "8px", borderRadius: "4px", background: G, transformOrigin: "100% 50%" });
        gsap.set(strike, { scaleX: 0 });
        blurIn(bs, V(22) - 0.05); zoomOut(fkh, V(23) - 0.05, 2.4);
        mhW.forEach((w, k) => inkIn(w, V(24 + k) - 0.06));
        TL.to(strike, { scaleX: 1, duration: 0.22, ease: "expo.out" }, W(27) - 0.05);
        // selection box around the three luxury weights, the cursor lifts them
        const sel = el("div", "abs", world, { left: "0", top: "0", width: "300px", height: "170px", border: "5px dashed #00DB33", borderRadius: "30px", zIndex: 9 });
        [[-10, -10], [-10, null], [null, -10], [null, null]].forEach(([l, tp]) => el("div", "abs", sel, { width: "18px", height: "18px", background: G, borderRadius: "4px", left: l === null ? "auto" : l + "px", right: l === null ? "-10px" : "auto", top: tp === null ? "auto" : tp + "px", bottom: tp === null ? "-10px" : "auto" }));
        const selTag = el("div", "pill px", sel, { left: "0", top: "-62px", fontSize: "30px", background: G, color: K, padding: "2px 22px 6px", position: "absolute" }, "الفخامة");
        gsap.set(sel, { opacity: 0, scale: 1.15 });
        const LIFT = V(23) + 0.15, LIFTY = -150;
        // where the stack sits at LIFT (pan follows the scale, measured from the baked angle)
        const thL = thetaAt(LIFT) * Math.PI / 180, plx = PX - HL * Math.cos(thL) - 150, ply = PY - HL * Math.sin(thL);
        TL.set(sel, { x: plx, y: ply - 140, opacity: 1 }, LIFT - 0.15); TL.to(sel, { scale: 1, duration: 0.3, ease: "back.out(1.6)" }, LIFT - 0.15);
        curTo(plx + 250, ply - 20, LIFT - 0.55, 0.42);
        press(LIFT - 0.1);
        TL.to(lux, { y: LIFTY, duration: 0.7, ease: "power3.inOut" }, LIFT);
        TL.to(sel, { y: ply - 140 + LIFTY, duration: 0.7, ease: "power3.inOut" }, LIFT);
        TL.to(cur, { y: ply - 20 + LIFTY, duration: 0.7, ease: "power3.inOut" }, LIFT);
        // hold them up, gentle float (the pan does NOT rise: the luxury was never the weight)
        TL.to(lux, { y: LIFTY - 18, duration: 1.6, ease: "sine.inOut" }, LIFT + 0.7);
        TL.to(sel, { y: ply - 140 + LIFTY - 18, duration: 1.6, ease: "sine.inOut" }, LIFT + 0.7);
        ev(LIFT + 0.2, -24, 9); ev(LIFT + 0.6, -26, 9);   // a tiny hopeful twitch, then it stays down

        // ═══ «اللي يبطئ هو الشغل اللي ما انضبط.» : the tangle on the pan ═══
        exitUp([bs, fkh, mhi], V(28) - 0.3);
        TL.to(sel, { opacity: 0, duration: 0.3 }, V(28) - 0.1);
        const ly = el("div", "abs ar px", world, { right: "120px", top: "262px", fontSize: "56px", color: GREY, display: "flex", gap: "16px" });
        ["اللي", "يبطئ", "هو"].forEach((s, k) => blurIn(el("span", "", ly, { display: "inline-block", color: k === 1 ? K : GREY }, s), V(28 + k) - 0.04, 0.4));
        const shg = el("div", "abs ar", world, { right: "120px", top: "310px", fontSize: "190px", color: K }, "الشغل");
        slamIn(shg, V(31));
        const lma = el("div", "abs ar px", world, { right: "124px", top: "600px", fontSize: "56px", color: GREY }, "اللي ما");
        blurIn(lma, V(32) - 0.04, 0.4);
        // «انضبط.» lands crooked, with misaligned designer guides
        const nzb = el("div", "abs ar", world, { left: "100px", top: "540px", fontSize: "170px", color: K, transformOrigin: "50% 60%" }, "انضبط.");
        const g1 = el("div", "abs", world, { left: "70px", top: "748px", width: "500px", height: "0", borderTop: "4px dashed #00DB33" });
        const g2 = el("div", "abs", world, { left: "100px", top: "570px", width: "470px", height: "0", borderTop: "4px dashed #8B9096", transform: "rotate(-7deg)", transformOrigin: "0 0" });
        gsap.set([g1, g2], { scaleX: 0, transformOrigin: "0% 50%" });
        gsap.set(nzb, { opacity: 0, y: -80, rotation: 0 });
        TL.to(nzb, { opacity: 1, y: 0, rotation: -7, duration: 0.5, ease: "back.out(1.5)" }, V(34) - 0.08);
        TL.to(g2, { scaleX: 1, duration: 0.35, ease: "expo.out" }, V(34) + 0.12); TL.to(g1, { scaleX: 1, duration: 0.35, ease: "expo.out" }, V(34) + 0.2);
        // the scribble draws on the empty pan while the luxury still floats above
        TL.set(scrib, { opacity: 1 }, V(29) - 0.1);
        TL.to(scr, { strokeDashoffset: 0, duration: W(34) - V(29), ease: "power1.inOut" }, V(29) - 0.1);
        TL.to(lux, { y: LIFTY - 140, x: -60, opacity: 0, scale: 0.7, duration: 0.6, ease: "power2.in" }, V(29));
        TL.to(cur, { x: 980, y: 1300, duration: 0.6, ease: "power2.inOut" }, V(29));
        // the tangle drags the pan down and out of frame; the dark world rises behind it (ext.js)
        PLUNGE = W(34) + 0.1;
        ev(PLUNGE - 0.12, -32, 16);          // the tangle tugs once
        ev(PLUNGE + 0.05, 16, 8);            // the string snaps: the pan falls, the beam swings right
        TL.to([ly, shg, lma, nzb, g1, g2], { y: -200, opacity: 0, filter: "blur(10px)", duration: 0.38, ease: "power2.in", stagger: 0.02 }, PLUNGE + 0.05);
        TL.to(world, { y: -18, duration: W(34) - V(22), ease: "sine.inOut" }, V(22));

        /*EXT*/
        frames(0, D, placeScale);
        // grain, every 2 frames
        const grains = Array.from(document.querySelectorAll(".grain"));
        for (let f = 0; f < D * FPS; f += 2) grains.forEach((g, i) => TL.set(g, { opacity: i === (f / 2) % 6 ? 0.42 : 0 }, f * F));
        TL.set({}, {}, D);
        window.__timelines["main"] = TL; TL.seek(0);
      }
      window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {};
      window.__hf.buildReady["main"] = build();
    </script>
  </body>
</html>
