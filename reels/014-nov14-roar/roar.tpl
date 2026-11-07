<!DOCTYPE html>
<html lang="ar" data-resolution="portrait">
  <!-- 014 Nov 14 security audit, ROAR style. Paper ground, real cut-outs (Flow on chroma green, keyed), a magnifier whose lens
       carries a flashlight beam, a padlock on the launch laptop, 14 hidden marks that the beam finds, example notes, green checks,
       the padlock springs open, invert flash, the launch button swells into the end ground.
       Threads: magnifier (B1, B4-B6, B9), padlock (B3-B8), counter note (B1-B7), laptop on the pedestal (B1-B8).
       Time-dependent motion is frame-baked as TL.set (seek-safe). build.py fills __D__ and WORDS. No <audio>. -->
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920">
    <title>Nov 14 security reel ROAR</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/MotionPathPlugin.min.js"></script>
    <style>
      @font-face { font-family: "ZainL"; src: url("assets/fonts/zain-mob-long.ttf") format("truetype"); }
      @font-face { font-family: "InterX"; src: url("assets/fonts/inter-lat-700.woff2") format("woff2"); font-weight: 700; }
      @font-face { font-family: "PlexA"; src: url("assets/fonts/IBMPlexSansArabic-Medium.ttf") format("truetype"); font-weight: 500; }
      @font-face { font-family: "PlexA"; src: url("assets/fonts/IBMPlexSansArabic-SemiBold.ttf") format("truetype"); font-weight: 600; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #121416; }
      #main { position: relative; width: 1080px; height: 1920px; overflow: hidden; font-family: "ZainL", sans-serif; color: #121416; }
      .abs { position: absolute; }
      .ar { direction: rtl; white-space: nowrap; line-height: 1.3; }
      .pl { font-family: "PlexA", sans-serif; font-weight: 600; }
      #cam { position: absolute; inset: 0; transform-origin: 600px 900px; }
      #paper { position: absolute; inset: -60px; background: #F0F1F2 url("assets/img/paper.jpg") center / cover; }
      .cut { position: absolute; display: block; }
      .shd { filter: drop-shadow(-3px 3px 4px rgba(18,20,22,0.30)) drop-shadow(-6px 6px 18px rgba(18,20,22,0.25)) drop-shadow(-10px 10px 22px rgba(18,20,22,0.10)); }
      .contact { position: absolute; border-radius: 50%; background: radial-gradient(closest-side, rgba(18,20,22,0.38), rgba(18,20,22,0)); }
      #night { position: absolute; inset: 0; pointer-events: none; }
      .note { position: absolute; background: url("assets/cut/note.png") center / 100% 100% no-repeat; }
      .tape { position: absolute; height: 46px; background: rgba(240,241,242,0.72); box-shadow: 0 1px 2px rgba(18,20,22,0.15);
              clip-path: polygon(0 8%, 4% 0, 9% 10%, 14% 0, 100% 0, 97% 12%, 100% 30%, 96% 50%, 100% 72%, 97% 88%, 100% 100%, 0 100%, 3% 80%, 0 60%, 4% 40%, 0 22%); }
      .gtape { background: rgba(0,219,51,0.80); }
      .stamp { position: absolute; border: 9px solid #00DB33; color: #00DB33; border-radius: 22px; padding: 0 34px 10px; mix-blend-mode: multiply; }
      .grain { position: absolute; inset: 0; width: 1080px; height: 1920px; mix-blend-mode: soft-light; opacity: 0; pointer-events: none; z-index: 90; }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="__D__" data-width="1080" data-height="1920">
      <video id="bg" src="assets/video/bg.mp4" data-start="0" data-duration="__VD__" data-media-start="0" data-track-index="0" muted playsinline style="position:absolute;inset:0;width:1080px;height:1920px;object-fit:cover"></video>
      <div id="stage" class="clip" data-start="0" data-duration="__D__" data-track-index="1" style="position:absolute;inset:0;z-index:1">
        <div id="cam"></div>
        <div id="night"></div>
        <div id="top" class="abs" style="inset:0"></div>
        <img class="grain" src="assets/img/grain0.png"><img class="grain" src="assets/img/grain1.png"><img class="grain" src="assets/img/grain2.png">
        <img class="grain" src="assets/img/grain3.png"><img class="grain" src="assets/img/grain4.png"><img class="grain" src="assets/img/grain5.png">
      </div>
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const WORDS = /*WORDS*/[];
      const D = __D__, FPS = 30, F = 1 / FPS;
      const V = i => WORDS[i][1], W = i => WORDS[i][2];
      const K = "#121416", G = "#00DB33", DG = "#006A39", L = "#F0F1F2";
      const AR = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
      const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
      const lerp = (a, b, p) => a + (b - a) * p;
      const ramp = (t, a, b) => clamp((t - a) / (b - a));
      const inOut = p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
      const expoOut = p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));
      const el = (tag, cls, parent, css = {}, html = "") => { const e = document.createElement(tag); if (cls) e.className = cls; Object.assign(e.style, css); if (html) e.innerHTML = html; parent.appendChild(e); return e; };
      const frames = (a, b, fn) => { for (let f = Math.max(0, Math.round(a * FPS)); f <= Math.round(b * FPS); f++) fn(f * F, f); };
      const at = t => Math.max(0, t - 0.0004);
      const SCR = { l: 0.105, t: 0.075, r: 0.895, b: 0.80 };   // laptop screen inside laptop.png (measured)

      async function build() {
        await document.fonts.load('100px "ZainL"'); await document.fonts.load('600 40px "PlexA"'); await document.fonts.load('700 20px "InterX"'); await document.fonts.ready;
        const TL = gsap.timeline({ paused: true });
        const stage = document.getElementById("stage"), cam = document.getElementById("cam"), night = document.getElementById("night"), top = document.getElementById("top");
        const img = (src, parent, cls = "cut shd") => { const i = el("img", cls, parent); i.src = src; return i; };
        const srcs = ["prop-magnifier", "note"];
        const I = {};
        srcs.forEach(s => I[s] = img(`assets/cut/${s}.png`, cam));
        await Promise.all(Object.values(I).map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
        const ratio = i => i.naturalWidth / i.naturalHeight;
        const box = (i, cx, bottom, h) => { const w = h * ratio(i); Object.assign(i.style, { left: (cx - w / 2) + "px", top: (bottom - h) + "px", width: w + "px", height: h + "px" }); return { l: cx - w / 2, t: bottom - h, w, h, cx, cy: bottom - h / 2 }; };
        const measure = (html, size, fam = "ZainL") => { const s = el("span", "ar", document.body, { position: "absolute", left: "-5000px", top: "0", fontSize: size + "px", fontFamily: fam }, html); const r = s.getBoundingClientRect().width; s.remove(); return r; };
        const fit = (e, maxW) => { const w = e.getBoundingClientRect().width; if (w > maxW) e.style.fontSize = (parseFloat(e.style.fontSize) * maxW / w) + "px"; };
        const ctr = (e, cx, cy) => { const r = e.getBoundingClientRect(); e.style.left = (cx - r.width / 2) + "px"; e.style.top = (cy - r.height / 2) + "px"; };
        const blurIn = (e, t, d = 0.3, y = 18) => { gsap.set(e, { opacity: 0, y, filter: "blur(10px)" }); TL.to(e, { opacity: 1, y: 0, filter: "blur(0px)", duration: d, ease: "power3.out" }, t); };
        const blurOut = (els, t) => TL.to(els, { opacity: 0, filter: "blur(12px)", scale: 1.04, duration: 0.38, ease: "power2.in", stagger: 0.03 }, t);
        const dropIn = (e, t, rot = 3, dy = -900) => { gsap.set(e, { y: dy, rotation: rot * 4, opacity: 0 }); TL.set(e, { opacity: 1 }, t); TL.to(e, { y: 0, rotation: rot, duration: 0.55, ease: "back.out(1.25)" }, t); };
        const slamIn = (e, t) => { gsap.set(e, { opacity: 0 }); TL.set(e, { opacity: 1, x: 220, scaleX: 1.35, skewX: -12, filter: "blur(9px)" }, t - 3 * F); TL.to(e, { x: 0, scaleX: 1, skewX: 0, filter: "blur(0px)", duration: 0.32, ease: "expo.out" }, t); };

        // ═══ picture = generated film bg.mp4 (S1..S6); the overlay knows where the button sits (measured on K1/K6) ═══
        const BTN = { cx: __BX__, cy: __BY__, w: __BW__, h: __BH__ };
        const MAG = I["prop-magnifier"], MH = 820, MW = MH * ratio(MAG);
        Object.assign(MAG.style, { left: "0px", top: "0px", width: MW + "px", height: MH + "px", zIndex: 30 });
        top.appendChild(MAG); gsap.set(MAG, { x: 1400, y: 1500 });
        const LX = 0.594 * MW, LY = 0.223 * MH;
        const setMag = (t, x, y, rot = -8) => TL.set(MAG, { x: x - LX, y: y - LY, rotation: rot, transformOrigin: `${LX}px ${LY}px` }, at(t));
        I["note"].style.display = "none";
        const order = Array.from({ length: 14 }, (_, n) => [1.62 + n * 0.075, n]);
        // hook text on the dark: «فحصنا» + «موقع قبل إطلاقه»
        const h1 = el("div", "abs ar", top, { right: "460px", top: "240px", fontSize: "170px", color: L }, "فحصنا"); fit(h1, 480);
        const h2 = el("div", "abs ar pl", top, { right: "460px", top: "470px", fontSize: "46px", color: K, background: L, padding: "2px 24px 10px", borderRadius: "10px", transform: "rotate(-2deg)" }, "موقع قبل إطلاقه");
        gsap.set(h1, { opacity: 1, y: 0, filter: "blur(0px)", scale: 0.9 }); TL.to(h1, { scale: 1, duration: 0.6, ease: "expo.out" }, 0);
        TL.fromTo(h1, { x: 60 }, { x: 0, duration: 0.5, ease: "expo.out", immediateRender: true }, 0);
        dropIn(h2, V(1) - 0.05, -2, -300);
        // the counter note (thread): drops on «ولقينا», counts the marks the light finds
        const cn = el("div", "note", top, { left: "610px", top: "250px", width: "320px", height: "300px", zIndex: 20, filter: "drop-shadow(-4px 6px 8px rgba(0,0,0,0.35))" });
        el("div", "tape gtape", cn, { left: "110px", top: "-18px", width: "110px" });
        const cnN = el("div", "abs ar", cn, { left: "0", width: "100%", textAlign: "center", top: "6px", fontSize: "170px", color: K, lineHeight: "1.2" }, "٠");
        const cnL = el("div", "abs ar pl", cn, { left: "0", width: "100%", textAlign: "center", top: "208px", fontSize: "44px", color: K }, "مشكلة");
        dropIn(cn, V(4) - 0.1, 5, -700);
        order.forEach(([t0], n) => TL.set(cnN, { textContent: AR(n + 1) }, Math.max(t0, V(4) + 0.3) + n * 0.001));
        TL.set(cnN, { textContent: "١٤" }, V(5) + 0.35);
        TL.fromTo(cnN, { scale: 1.3 }, { scale: 1, duration: 0.4, ease: "back.out(2.5)", immediateRender: false }, V(5) + 0.35);

        // ═══ B2 2.97 lights on: the owner is proud, the site «شكله جاهز», «والزر جاهز» ═══
        blurOut([h1, h2], 2.7);
        TL.to(cn, { y: -60, opacity: 0, filter: "drop-shadow(-4px 6px 8px rgba(0,0,0,0.35)) blur(10px)", duration: 0.38, ease: "power2.in" }, 2.85);
        const b2a = el("div", "abs ar pl", top, { right: "120px", top: "245px", fontSize: "46px", color: K }, "الموقع");
        const b2b = el("div", "abs ar", top, { right: "120px", top: "290px", fontSize: "170px", color: K }, "شكله جاهز"); fit(b2b, 600);
        const b2c = el("div", "abs ar pl", top, { right: "150px", top: "560px", fontSize: "48px", color: K, background: L, padding: "0 22px 8px", borderRadius: "10px", boxShadow: "0 6px 14px rgba(18,20,22,0.18)" }, "والزر جاهز");
        const arrow = el("div", "abs", top, { left: "0", top: "0", width: "1080px", height: "1920px" },
          `<svg width="1080" height="1920"><path id="arw" d="M 800 650 C 840 720, ${BTN.cx + 40} ${BTN.cy - 120}, ${BTN.cx + 10} ${BTN.cy - 40}" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round"/><path d="M ${BTN.cx - 14} ${BTN.cy - 66} L ${BTN.cx + 8} ${BTN.cy - 36} L ${BTN.cx + 36} ${BTN.cy - 58}" fill="none" stroke="${K}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
        const arw = arrow.querySelector("#arw"), aL = arw.getTotalLength(); arw.style.strokeDasharray = aL; arw.style.strokeDashoffset = aL;
        const arh = arrow.querySelectorAll("path")[1]; gsap.set(arh, { opacity: 0 });
        blurIn(b2a, V(7), 0.3); blurIn(b2b, V(8) - 0.04, 0.35);
        dropIn(b2c, V(10) - 0.05, -3, -260);
        TL.to(arw, { strokeDashoffset: 0, duration: 0.4, ease: "power2.out" }, V(11) - 0.15); TL.set(arh, { opacity: 1 }, V(11) + 0.25);

        // ═══ B3 «بس احنا ما نطلق شي قبل ما نفحصه»: the padlock drops onto the laptop ═══
        const LD = V(15) - 0.05;   // lands on «نطلق»
        TL.set(stage, { filter: "blur(4px)" }, V(12)); TL.set(stage, { filter: "none" }, V(12) + F);
        blurOut([b2a, b2b, b2c, arrow], V(12));
        const b3a = el("div", "abs ar", top, { right: "120px", top: "330px", fontSize: "180px", color: K }, "ما نطلق");
        const KW = measure("نطلـــــــق", 180) - measure("نطلق", 180);
        const b3b = el("div", "note", top, { left: "0", top: "0", width: "430px", height: "150px", display: "flex", alignItems: "center", justifyContent: "center" });
        el("div", "ar pl", b3b, { fontSize: "46px", color: K }, "قبل ما نفحصه");
        el("div", "tape", b3b, { left: "-20px", top: "-14px", width: "100px", transform: "rotate(-24deg)" });
        b3b.style.left = "500px"; b3b.style.top = "590px";
        blurIn(b3a, V(13), 0.28);
        let lk3 = -1;
        frames(LD, LD + 0.5, (t) => { const n = Math.round(7 * expoOut(ramp(t, LD, LD + 0.45))); if (n !== lk3) { TL.set(b3a, { textContent: "ما نطل" + "ـ".repeat(n) + "ق" }, at(t)); lk3 = n; } });
        TL.to(b3a, { y: 8, duration: 0.07 }, LD); TL.to(b3a, { y: 0, duration: 0.3, ease: "back.out(3)" }, LD + 0.07);
        dropIn(b3b, V(17) - 0.05, -4, -500);

        // ═══ B4 «وش يشمل الفحص؟»: the lights go down again, the magnifier returns ═══
        const B4 = V(20) - 0.15;
        blurOut([b3a, b3b], B4 - 0.2);
        const STK = [700, 610];                                       // the example notes land here
        // the lights go down: a flashlight darkness closes on the padlock, the film cuts to the dark beam shot (S4) under it
        const setNight = (t, x, y, r, al) => TL.set(night, { backgroundImage: `radial-gradient(circle ${r.toFixed(1)}px at ${x}px ${y}px, rgba(18,20,22,0) 0, rgba(18,20,22,0) ${(r * 0.78).toFixed(1)}px, rgba(18,20,22,${al.toFixed(3)}) ${r.toFixed(1)}px)` }, at(t));
        frames(6.9, 7.95, (t) => { const q = inOut(ramp(t, 6.9, 7.55)); setNight(t, lerp(740, 700, q), lerp(1000, 920, q), lerp(1700, 280, q), 0.96 * (1 - ramp(t, 7.65, 7.95))); });
        TL.set(night, { backgroundImage: "none" }, 7.97);
        const q4 = el("div", "abs ar", top, { left: "0", top: "0", fontSize: "150px", color: L }, "وش يشمل الفحص؟"); fit(q4, 820); ctr(q4, 540, 345);
        slamIn(q4, V(20));

        // ═══ B5 the example notes drop one on another (labelled «أمثلة») ═══
        const CATS = [["صلاحيات الدخول", 23], ["مدخلات الفورم", 25], ["هيدرز الحماية", 27], ["مفاتيح مكشوفة", 29], ["مكتبات قديمة", 31], ["رسايل خطأ تفضح", 33]];
        const stack = el("div", "abs", top, { inset: "0", zIndex: 10 });
        const notes = [];
        CATS.forEach(([txt, wi], k) => {
          const n = el("div", "note", stack, { left: (STK[0] - 260) + "px", top: (STK[1] - 170) + "px", width: "520px", height: "340px", filter: "drop-shadow(-5px 8px 10px rgba(0,0,0,0.45))" });
          el("div", "tape", n, { left: (k % 2 ? 320 : 70) + "px", top: "-18px", width: "140px", transform: `rotate(${k % 2 ? 8 : -6}deg)` });
          el("div", "abs ar pl", n, { right: "44px", top: "34px", fontSize: "32px", color: DG }, "أمثلة");
          el("div", "abs ar pl", n, { left: "44px", top: "34px", fontSize: "30px", color: "#5E6369" }, AR(k + 1) + " من ٦");
          const tx = el("div", "abs ar", n, { left: "0", top: "0", fontSize: "104px", color: K }, txt);
          fit(tx, 440); ctr(tx, 260, 185);
          const rot = [-4, 3, -2, 5, -5, 2][k];
          dropIn(n, V(wi) - 0.12, rot, -1300);
          if (k) TL.to(notes[k - 1], { x: (k % 2 ? -1 : 1) * 14, y: 10, duration: 0.25, ease: "power2.out" }, V(wi) + 0.3);
          if (k) TL.set(Array.from(notes[k - 1].children).filter(c => !c.classList.contains("tape")), { opacity: 0 }, V(wi) + 0.3);
          notes.push(n);
        });
        // «تفضح أكثر من اللازم»: the last note's text gets a green marker
        const hl = el("div", "abs", notes[5], { left: "50px", top: "250px", width: "420px", height: "14px", background: G, borderRadius: "8px", transformOrigin: "100% 50%" });
        gsap.set(hl, { scaleX: 0 }); TL.to(hl, { scaleX: 1, duration: 0.5, ease: "power2.out" }, V(35));

        // ═══ B6 «هذي أمثلة من اللي نراجعه»: the stamp ═══
        const st = el("div", "stamp ar", stack, { fontSize: "84px", lineHeight: "1.25" }, "أمثلة"); ctr(st, STK[0] + 110, STK[1] + 165);
        gsap.set(st, { opacity: 0, rotation: -12 });
        TL.set(st, { opacity: 1, scale: 2.4, filter: "blur(6px)" }, V(40) - 3 * F);
        TL.to(st, { scale: 1, filter: "blur(0px)", duration: 0.22, ease: "power4.out" }, V(40));
        TL.to(stack, { y: 10, duration: 0.06 }, V(40) + 0.12); TL.to(stack, { y: 0, duration: 0.3, ease: "back.out(3)" }, V(40) + 0.18);
        const b6 = el("div", "abs ar pl", top, { left: "0", top: "0", fontSize: "52px", color: L }, "من اللي نراجعه"); ctr(b6, 680, 845);
        blurIn(b6, V(41), 0.3);

        // ═══ B7 «صلحنا الاربعتعش، وحدة وحدة»: lights on, the notes slide away, the 14 flags get green checks ═══
        const B7 = V(44) - 0.1;
        blurOut([q4, b6], B7 - 0.3);
        TL.to(stack, { x: -1300, rotation: -10, duration: 0.45, ease: "power3.in" }, B7); TL.set(stack, { autoAlpha: 0 }, B7 + 0.5);
        const b7 = el("div", "abs ar", top, { right: "460px", top: "260px", fontSize: "160px", color: K }, "صلحنا");
        blurIn(b7, V(44), 0.3);
        let lk7 = -1;
        frames(V(44) + 0.15, V(44) + 0.6, (t) => { const n = Math.round(2 * expoOut(ramp(t, V(44) + 0.15, V(44) + 0.55))); if (n !== lk7) { TL.set(b7, { textContent: "صلحـ" + "ـ".repeat(n) + "نا" }, at(t)); lk7 = n; } });
        TL.fromTo(cn, { opacity: 1, y: -700, rotation: 18, filter: "drop-shadow(-4px 6px 8px rgba(0,0,0,0.35)) blur(0px)", scale: 1 }, { y: 0, rotation: 5, duration: 0.55, ease: "back.out(1.25)", immediateRender: false }, B7 + 0.1);
        TL.set(cnN, { textContent: "٠", color: DG }, B7); TL.set(cnL, { textContent: "من ١٤" }, B7);
        const C0 = V(45), C1 = W(47) - 0.1;
        for (let k = 0; k < 14; k++) TL.set(cnN, { textContent: AR(k + 1) }, C0 + k * (C1 - C0) / 14);
        TL.fromTo(cnN, { scale: 1.3 }, { scale: 1, duration: 0.4, ease: "back.out(2.5)", immediateRender: false }, C1);

        // ═══ B8 «وبعدها بس، انفتح زر الإطلاق»: the padlock springs open, invert flash, the button launches ═══
        const OP = V(50);
        blurOut([b7], V(48)); TL.to(cn, { opacity: 0, filter: "drop-shadow(-4px 6px 8px rgba(0,0,0,0.35)) blur(12px)", duration: 0.38, ease: "power2.in" }, V(48));
        const b8 = el("div", "abs ar", top, { right: "120px", top: "300px", fontSize: "190px", color: K }, "انفتح");
        slamIn(b8, OP);
        const b8b = el("div", "abs ar pl", top, { right: "150px", top: "560px", fontSize: "52px", color: K, background: L, padding: "0 22px 8px", borderRadius: "10px", boxShadow: "0 6px 14px rgba(18,20,22,0.18)" }, "زر الإطلاق");
        dropIn(b8b, V(51) - 0.05, 3, -300);
        // the button is pressed and swells into the end ground
        const PR = 21.0;
        const endG = el("div", "abs", stage, { inset: "0", background: G, zIndex: 40 });
        stage.insertBefore(endG, document.querySelector(".grain"));
        const bR = { l: BTN.cx - BTN.w / 2, t: BTN.cy - BTN.h / 2, r: BTN.cx + BTN.w / 2, b: BTN.cy + BTN.h / 2 }, btnH = BTN.h;
        gsap.set(endG, { clipPath: `inset(${bR.t}px ${1080 - bR.r}px ${1920 - bR.b}px ${bR.l}px round 10px)` });
        gsap.set(endG, { opacity: 0 }); TL.set(endG, { opacity: 1 }, PR + 0.15);
        TL.to(endG, { clipPath: "inset(0px 0px 0px 0px round 0px)", backgroundColor: DG, duration: 0.45, ease: "expo.inOut" }, PR + 0.15);
        TL.set([b8, b8b], { opacity: 0 }, PR + 0.6);

        // ═══ B9 end: «عندك موقع قريب ينطلق؟», the CTA note, the magnifier over «انطباع» ═══
        const endC = el("div", "abs", endG, { inset: "0" });
        const lg = el("img", "abs", endC, { left: "390px", top: "250px", width: "300px" }); lg.src = "assets/brand/logo-white.svg";
        const e1 = el("div", "abs ar", endC, { right: "150px", top: "380px", fontSize: "160px", color: L }, "عندك موقع"); fit(e1, 720);
        const e2 = el("div", "abs ar pl", endC, { right: "150px", top: "610px", fontSize: "60px", color: L }, "قريب ينطلق؟");
        blurIn(lg, PR + 0.55, 0.4); blurIn(e1, V(53) + 0.05, 0.3); blurIn(e2, V(55), 0.3);
        const cta = el("div", "note", endC, { left: "150px", top: "760px", width: "780px", height: "420px", filter: "drop-shadow(-5px 8px 10px rgba(0,0,0,0.4))" });
        el("div", "tape", cta, { left: "320px", top: "-20px", width: "150px", transform: "rotate(-4deg)" });
        const c1 = el("div", "abs ar pl", cta, { left: "0", top: "0", fontSize: "52px", color: K }, "اكتب"); ctr(c1, 390, 80);
        const c2 = el("div", "abs ar", cta, { left: "0", top: "0", fontSize: "170px", color: K }, "انطباع"); ctr(c2, 390, 215);
        const c3 = el("div", "abs ar pl", cta, { left: "0", top: "0", fontSize: "52px", color: K }, "بالتعليقات"); ctr(c3, 390, 350);
        const cHL = el("div", "abs", cta, { left: "0", top: "0", width: (c2.getBoundingClientRect().width + 40) + "px", height: "26px", background: G, borderRadius: "10px", transformOrigin: "100% 50%" });
        ctr(cHL, 390, 290); cta.insertBefore(cHL, c2); gsap.set(cHL, { scaleX: 0 });
        dropIn(cta, V(57) - 0.12, -2, -1300);
        TL.to(cHL, { scaleX: 1, duration: 0.4, ease: "power2.out" }, V(58) + 0.05);
        TL.fromTo(c2, { scale: 1.15 }, { scale: 1, duration: 0.45, ease: "back.out(2.5)", immediateRender: false }, V(58));
        const e3 = el("div", "abs ar pl", endC, { left: "0", top: "0", fontSize: "44px", color: L }, "ونرسل لك انطباع أول عن موقعك مجانًا"); ctr(e3, 540, 1240);
        blurIn(e3, V(60), 0.3);
        const e4 = el("div", "abs pl", endC, { left: "0", top: "0", fontSize: "37px", color: L, fontFamily: '"InterX", "PlexA", sans-serif', direction: "ltr" }, "www.fortunecode.org  ·  +20 10 98066484"); ctr(e4, 540, 1350);
        blurIn(e4, V(62), 0.35);
        // the magnifier comes back and rests its lens over «انطباع»
        MAG.style.zIndex = 50; top.style.zIndex = 50;
                stage.insertBefore(top, document.querySelector(".grain"));
        const MS = 0.72;
        frames(V(58) - 0.4, D, (t) => { const q = expoOut(ramp(t, V(58) - 0.4, V(58) + 0.5)), q2 = inOut(ramp(t, V(59), V(60) + 0.2)); const wob = Math.sin(t * 1.4) * 10;
          const x = lerp(lerp(1450, 560, q), 150, q2), y = lerp(1500, 975, q) + wob;
          TL.set(MAG, { x: x - LX, y: y - LY, rotation: lerp(-18, 72, q2), scale: MS, transformOrigin: `${LX}px ${LY}px` }, at(t)); });
        // camera: slow eased push, one drift per beat, never static
        const camK = [[0, 1.0, 0, 0], [2.97, 1.04, 0, 0], [7.0, 1.08, -10, -20], [B4 + 0.6, 1.0, 0, 0], [16.9, 1.07, 10, -10], [B7 + 0.4, 1.0, 0, 0], [21.1, 1.06, 0, -20]];
        for (let k = 0; k < camK.length - 1; k++) { const [t0, s0, x0, y0] = camK[k], [t1, s1, x1, y1] = camK[k + 1];
          if (k === 2 || k === 4) { TL.to(cam, { scale: s1, x: x1, y: y1, duration: 0.5, ease: "power2.inOut" }, t1 - 0.5); continue; }
          TL.fromTo(cam, { scale: s0, x: x0, y: y0 }, { scale: s1, x: x1, y: y1, duration: t1 - t0, ease: "sine.inOut", immediateRender: k === 0 }, t0); }
        TL.fromTo(endC, { scale: 1 }, { scale: 1.025, duration: D - PR, ease: "sine.inOut", transformOrigin: "540px 900px", immediateRender: false }, PR);

        // grain, every 2 frames
        const grains = Array.from(document.querySelectorAll(".grain"));
        for (let f = 0; f < D * FPS; f += 2) grains.forEach((g, i) => TL.set(g, { opacity: i === (f / 2) % 6 ? 0.15 : 0 }, f * F));
        TL.set({}, {}, D);
        window.__timelines["main"] = TL; TL.seek(0);
      }
      window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {};
      window.__hf.buildReady["main"] = build();
    </script>
  </body>
</html>
