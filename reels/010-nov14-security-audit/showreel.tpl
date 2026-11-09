<!DOCTYPE html>
<html lang="ar" data-resolution="portrait">
  <!-- Reel 010 (Nov 14): "we audited a site before launch and fixed 14 issues". Showreel vocabulary from 008, new moves:
       B1 a browser window tilts in while a green scan line sweeps it; every row it passes raises a flag, a heavy counter rolls to ١٤ |
       B2 the flags sink, the skeleton polishes itself, design-tool tags «شكله جاهز» «والزر جاهز» | B3 the cursor clicks the launch
       button, a padlock drops on it with a hanging tag «ما نطلق شي», the flags come back, «نفحصه» zooms out |
       B4 (ext.js) the last scan line splits open into the light report: «الفحص؟» + one category card at a time on curves |
       B5 «أمثلة» stamp | B6 the report folds into the 14-flag board, flags flip green one by one, «صلحنا» stretches by kashida |
       B7 the board folds into the locked button, the shackle springs, «انفتح», click, green wipe | B8 end: comment field types «انطباع».
       Time-driven motion (scan, counters, kashida, typing) is BAKED as TL.set per frame (seek-safe). build.py fills __D__ and WORDS. -->
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920">
    <title>Nov 14 audit reel</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/MotionPathPlugin.min.js"></script>
    <style>
      @font-face { font-family: "ZainL"; src: url("assets/fonts/zain-mob-long.ttf") format("truetype"); }
      @font-face { font-family: "InterX"; src: url("assets/fonts/inter-lat-700.woff2") format("woff2"); font-weight: 700; }
      @font-face { font-family: "InterX"; src: url("assets/fonts/inter-lat-800.woff2") format("woff2"); font-weight: 800; }
      @font-face { font-family: "PlexA"; src: url("assets/fonts/IBMPlexSansArabic-Medium.ttf") format("truetype"); font-weight: 500; }
      @font-face { font-family: "PlexA"; src: url("assets/fonts/IBMPlexSansArabic-SemiBold.ttf") format("truetype"); font-weight: 600; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #121416; }
      #main { position: relative; width: 1080px; height: 1920px; overflow: hidden; font-family: "ZainL", sans-serif; color: #F0F1F2; }
      .abs { position: absolute; }
      .ar { direction: rtl; white-space: nowrap; line-height: 1.3; }
      #world { position: absolute; inset: 0; background: #121416; overflow: hidden; z-index: 0; }
      .lab { position: absolute; font-family: "PlexA", sans-serif; font-weight: 600; font-size: 24px; white-space: nowrap; }
      .pill { position: absolute; border-radius: 999px; direction: rtl; white-space: nowrap; line-height: 1.25; display: flex; align-items: center; justify-content: center; gap: 18px; }
      .flag { position: absolute; width: 58px; height: 58px; border-radius: 16px; background: #F0F1F2; display: flex; align-items: center; justify-content: center;
              font-family: "InterX", sans-serif; font-weight: 800; font-size: 36px; color: #121416; box-shadow: 0 10px 22px rgba(0,0,0,0.45); }
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
      const D = __D__, FPS = 30, F = 1 / FPS;
      const V = i => WORDS[i][1], W = i => WORDS[i][2];
      const K = "#121416", G = "#00DB33", DG = "#006A39", L = "#F0F1F2", GREY = "#8B9096", DIM = "#5E6369";
      const PF = '"PlexA", sans-serif';
      const AR = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
      const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
      const lerp = (a, b, p) => a + (b - a) * p;
      const ramp = (t, a, b) => clamp((t - a) / (b - a));
      const expoOut = p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));
      const inOut = p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
      const el = (tag, cls, parent, css = {}, html = "") => { const e = document.createElement(tag); if (cls) e.className = cls; Object.assign(e.style, css); if (html) e.innerHTML = html; parent.appendChild(e); return e; };
      const frames = (a, b, fn) => { for (let f = Math.max(0, Math.round(a * FPS)); f <= Math.round(b * FPS); f++) fn(f * F, f); };
      const at = t => Math.max(0, t - 0.0004);
      const CHECK = `<svg viewBox="0 0 40 40" width="70%" height="70%"><path d="M9 21 L17 29 L31 12" fill="none" stroke="#121416" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

      async function build() {
        await document.fonts.load('100px "ZainL"'); await document.fonts.load('800 20px "InterX"'); await document.fonts.load('500 40px "PlexA"'); await document.fonts.load('600 40px "PlexA"'); await document.fonts.ready;
        await Promise.all(Array.from(document.images).map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
        const TL = gsap.timeline({ paused: true });
        const stage = document.getElementById("stage"), world = document.getElementById("world"), cur = document.getElementById("cur");
        const measure = (html, size, fam = "ZainL") => { const s = el("span", "ar", document.body, { position: "absolute", left: "-5000px", top: "0", fontSize: size + "px", fontFamily: fam }, html); const r = s.getBoundingClientRect().width; s.remove(); return r; };
        const fit = (e, maxW) => { const w = e.getBoundingClientRect().width; if (w > maxW) e.style.fontSize = (parseFloat(e.style.fontSize) * maxW / w) + "px"; };
        const ctr = (e, cx, cy) => { const r = e.getBoundingClientRect(); e.style.left = (cx - r.width / 2) + "px"; e.style.top = (cy - r.height / 2) + "px"; };
        const clip = (t, r, b, l, rad) => `inset(${t}px ${r}px ${b}px ${l}px round ${rad}px)`;
        const blurIn = (e, t, d = 0.34) => { gsap.set(e, { opacity: 0, y: 14, filter: "blur(8px)" }); TL.to(e, { opacity: 1, y: 0, filter: "blur(0px)", duration: d, ease: "power3.out" }, t); };
        const zoomOut = (e, t, s = 2.8) => { gsap.set(e, { opacity: 0, scale: s, filter: "blur(10px)" }); TL.set(e, { opacity: 1 }, t); TL.to(e, { scale: 1, filter: "blur(0px)", duration: 0.32, ease: "expo.out" }, t); };
        const popIn = (e, t, rot = 0) => { gsap.set(e, { opacity: 0, scale: 0, rotation: rot * 2.5 }); TL.set(e, { opacity: 1 }, t); TL.to(e, { scale: 1, rotation: rot, duration: 0.5, ease: "back.out(2.4)" }, t); };
        const slamIn = (e, t) => { gsap.set(e, { opacity: 0 }); TL.set(e, { opacity: 1, x: 240, scaleX: 1.4, skewX: -12, filter: "blur(9px)" }, t - 3 * F); TL.to(e, { x: 0, scaleX: 1, skewX: 0, filter: "blur(0px)", duration: 0.3, ease: "expo.out" }, t); };
        const exitUp = (els, t) => TL.to(els, { y: -120, opacity: 0, filter: "blur(10px)", duration: 0.3, ease: "power2.in", stagger: 0.03 }, t);
        const ink = (spans, i0) => spans.forEach((s, k) => TL.to(s, { color: s._on || L, duration: 0.12 }, V(i0 + k)));
        const hl = (s, t, bg = G, col = K) => { TL.to(s, { backgroundColor: bg, color: col, duration: 0.12 }, t); TL.fromTo(s, { scale: 1.25 }, { scale: 1, duration: 0.4, ease: "back.out(3)", immediateRender: false }, t); };
        const ripple = (x, y, t, col = G) => { const r = el("div", "ripple", stage, { left: x + "px", top: y + "px", borderColor: col, zIndex: 49 }); TL.fromTo(r, { opacity: 1, scale: 0.25 }, { opacity: 0, scale: 1.5, duration: 0.45, ease: "expo.out", immediateRender: false }, t); };
        const press = t => { TL.to(cur, { scale: 0.78, duration: 0.06, ease: "power2.out" }, t - 0.06); TL.to(cur, { scale: 1, duration: 0.25, ease: "back.out(3)" }, t); };
        const labels = (parent, col) => {
          const box = el("div", "", parent, { position: "absolute", inset: "0", color: col });
          [["fortunecode.org", 60, 232, "l"], ["فحص قبل الإطلاق", 960, 232, "r"], ["٢٠٢٦", 60, 1396, "l"], ["فورتشن كود", 960, 1396, "r"]].forEach(([s, x, y, a]) => {
            const l = el("div", "lab", box, { top: y + "px" }, s);
            if (a === "l") l.style.left = x + "px"; else l.style.right = (1080 - x) + "px";
          });
          return box;
        };
        labels(world, DIM);
        gsap.set(cur, { x: 1100, y: 1560 });

        // ═══ B1 the browser window tilts in, the scan line raises 14 flags, the counter rolls to ١٤ ═══
        const WX = 120, WY = 600;
        const win = el("div", "abs", world, { left: WX + "px", top: WY + "px", width: "840px", height: "660px", borderRadius: "40px", background: "#1B1E21", boxShadow: "inset 0 0 0 3px #2E3237, 0 50px 90px rgba(0,0,0,0.55)", overflow: "hidden", zIndex: 4 });
        [34, 62, 90].forEach(x => el("div", "abs", win, { left: x + "px", top: "33px", width: "18px", height: "18px", borderRadius: "50%", background: "#3A3E43" }));
        const url = el("div", "abs", win, { left: "130px", right: "30px", top: "18px", height: "48px", borderRadius: "24px", background: K, overflow: "hidden" });
        const urlT = el("div", "abs ar", url, { right: "24px", top: "3px", fontFamily: PF, fontWeight: "600", fontSize: "28px", color: GREY, lineHeight: "40px" }, "");
        const blocks = [
          [680, 112, 120, 36, 10, "#2E3237", G], [40, 122, 70, 16, 8, "#2A2E32", "#3A3E43"], [130, 122, 70, 16, 8, "#2A2E32", "#3A3E43"], [220, 122, 70, 16, 8, "#2A2E32", "#3A3E43"],
          [280, 196, 520, 44, 12, "#2E3237", L], [420, 258, 380, 44, 12, "#2E3237", L], [340, 324, 460, 20, 10, "#25292D", GREY],
          [40, 196, 220, 170, 24, "#25292D", DG], [40, 395, 240, 85, 20, "#232629", "#2E3237"], [300, 395, 240, 85, 20, "#232629", "#2E3237"], [560, 395, 240, 85, 20, "#232629", "#2E3237"]
        ].map(([l, t, w, h, r, c, c2]) => { const b = el("div", "abs", win, { left: l + "px", top: t + "px", width: w + "px", height: h + "px", borderRadius: r + "px", background: c }); b._c2 = c2; return b; });
        const btn = el("div", "abs", win, { left: "210px", top: "510px", width: "420px", height: "120px", borderRadius: "60px", background: "#2E3237", display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", direction: "rtl" });
        const btnT = el("div", "ar", btn, { fontFamily: PF, fontWeight: "600", fontSize: "56px", color: K, lineHeight: "1.2" }, "إطلاق");
        const btnA = el("div", "", btn, {}, `<svg viewBox="0 0 40 40" width="46" height="46"><path d="M30 20 H10 M18 11 L9 20 L18 29" fill="none" stroke="#121416" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
        gsap.set([btnT, btnA], { opacity: 0, scale: 0.6 });
        // scan line (baked per frame) + flags it raises
        const scanBand = el("div", "abs", win, { left: "0", right: "0", top: "0", height: "90px", background: "rgba(0,219,51,0.10)", zIndex: 6 });
        const scan = el("div", "abs", win, { left: "0", right: "0", top: "0", height: "5px", background: G, zIndex: 7, boxShadow: "0 0 18px rgba(0,219,51,0.7)" });
        const FL = [[330, 42], [90, 42], [740, 130], [75, 130], [255, 130], [420, 218], [600, 280], [480, 334], [150, 280], [160, 437], [420, 437], [680, 437], [320, 570], [540, 570]];
        const flags = FL.map(([x, y], k) => { const f = el("div", "flag", win, { left: (x - 29) + "px", top: (y - 29) + "px", zIndex: 8 }, "!"); f._y = y; f._r = (k % 2 ? 1 : -1) * (4 + (k * 7) % 9); gsap.set(f, { scale: 0, opacity: 0, rotation: f._r * 3 }); return f; });
        const S0 = 0.1, S1 = 2.35, SY0 = 20, SY1 = 660;
        const scanY = t => lerp(SY0, SY1, inOut(ramp(t, S0, S1)) * 0.25 + ramp(t, S0, S1) * 0.75);
        const popT = flags.map(f => { let t = S0; while (t < S1 && scanY(t) < f._y) t += F; return t; });
        flags.forEach((f, k) => { TL.set(f, { opacity: 1 }, popT[k]); TL.to(f, { scale: 1, rotation: f._r, duration: 0.4, ease: "back.out(2.6)" }, popT[k]); });
        gsap.set([scan, scanBand], { y: SY0 }); gsap.set(scanBand, { y: SY0 - 90 });
        frames(S0, S1, t => { const y = scanY(t); TL.set(scan, { y }, at(t)); TL.set(scanBand, { y: y - 90 }, at(t)); });
        TL.to([scan, scanBand], { opacity: 0, duration: 0.2 }, S1);
        // window enters (already on screen at frame 0)
        gsap.set(win, { transformPerspective: 1800, rotationX: 34, rotationY: -14, y: 240, scale: 0.9 });
        TL.to(win, { rotationX: 0, rotationY: 0, y: 0, scale: 1, duration: 0.7, ease: "expo.out" }, 0);
        // URL bar types «موقع قبل إطلاقه» with the voice (one growing string)
        let lu = null;
        frames(V(1), W(3) + 0.1, t => { let s = ""; for (let i = 1; i <= 3; i++) { if (t < V(i)) break; const w = WORDS[i][0].replace("،", ""), p = ramp(t, V(i), V(i) + 0.25); s += (s ? " " : "") + w.slice(0, Math.max(1, Math.round(w.length * p))); } if (s !== lu) { TL.set(urlT, { textContent: s }, at(t)); lu = s; } });
        TL.to(urlT, { color: L, duration: 0.2 }, V(3));
        // «فحصنا» flies in from the right edge, visible from frame 0
        const fhs = el("div", "abs ar", world, { right: "120px", top: "262px", fontSize: "230px", color: G, zIndex: 5, transformOrigin: "100% 60%" }, "فحصنا"); fit(fhs, 470);
        gsap.set(fhs, { x: 90, y: 10, rotation: 7, scale: 1.08 });
        TL.to(fhs, { x: 0, y: 0, rotation: 0, scale: 1, duration: 0.5, ease: "expo.out" }, 0);
        // heavy counter = flags raised
        const cnt = el("div", "abs", world, { left: "120px", top: "270px", width: "330px", height: "300px", zIndex: 5, transformOrigin: "0% 0%" });
        const cN = el("div", "abs ar", cnt, { left: "0", top: "0", fontSize: "220px", color: L, direction: "ltr", transformOrigin: "30% 70%" }, "٠");
        const cL = el("div", "abs ar", cnt, { left: "6px", top: "236px", fontFamily: PF, fontWeight: "600", fontSize: "46px", color: GREY }, "مشكلة");
        gsap.set(cN, { opacity: 0, scale: 0.5 }); TL.to(cN, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.4)" }, popT[0]);
        let lc = "٠";
        frames(popT[0], S1 + 0.1, t => { const n = popT.filter(p => p <= t + 1e-4).length; const s = AR(n); if (s !== lc) { TL.set(cN, { textContent: s }, at(t)); lc = s; } });
        const T14 = Math.max(...popT);
        TL.fromTo(cN, { scaleX: 1.2, scaleY: 1.32, color: G }, { scaleX: 1, scaleY: 1, duration: 0.6, ease: "elastic.out(1, 0.45)", immediateRender: false }, T14 + 0.02);
        blurIn(cL, V(6));
        TL.to(win, { y: 14, duration: 0.07, ease: "power2.out" }, T14 + 0.02); TL.to(win, { y: 0, duration: 0.35, ease: "back.out(3)" }, T14 + 0.09);

        // ═══ B2 «الموقع شكله جاهز، والزر جاهز.» flags sink, the skeleton polishes, design-tool tags ═══
        const B2 = V(7) - 0.06;
        flags.forEach((f, k) => TL.to(f, { scale: 0, rotation: 0, duration: 0.22, ease: "power2.in" }, B2 + k * 0.018));
        exitUp([fhs], B2);
        // the counter shrinks into a chip on the window corner (it is still there)
        TL.to(cnt, { scale: 0.34, x: 6, y: 250, opacity: 0.55, duration: 0.45, ease: "expo.inOut" }, B2 + 0.04);
        TL.to(cL, { opacity: 0, duration: 0.15 }, B2);
        blocks.forEach((b, k) => TL.to(b, { backgroundColor: b._c2, duration: 0.3, ease: "power2.out" }, V(8) + k * 0.03));
        TL.to(win, { scale: 1.03, duration: V(12) - V(7), ease: "sine.inOut" }, V(7));
        const tag = (parts, bg, col, cx, cy, rot) => {
          const p = el("div", "pill", world, { background: bg, color: col, padding: "0 40px 10px", zIndex: 9, boxShadow: "0 18px 40px rgba(0,0,0,0.45)" });
          parts.forEach(([s, z]) => el("span", "", p, z ? { fontSize: "92px" } : { fontFamily: PF, fontWeight: "600", fontSize: "44px", paddingTop: "10px", opacity: 0.75 }, s));
          ctr(p, cx, cy); return p;
        };
        const tg1 = tag([["شكله", 0], ["جاهز،", 1]], L, K, 690, 548, -4);
        const tg2 = tag([["والزر", 0], ["جاهز.", 1]], G, K, 610, 1316, 3);
        popIn(tg1, V(8) - 0.08, -4); popIn(tg2, V(10) - 0.05, 3);
        TL.to(btn, { backgroundColor: G, duration: 0.25 }, V(10));
        TL.to([btnT, btnA], { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2.6)", stagger: 0.05 }, V(10) + 0.05);
        // the cursor arrives and hovers the button
        const BX = WX + 210 + 250, BY = WY + 510 + 70;
        TL.to(cur, { x: BX + 40, y: BY + 40, duration: 0.6, ease: "power3.out" }, V(10) - 0.2);
        TL.to(cur, { x: BX, y: BY, duration: 0.4, ease: "power2.inOut" }, V(11));

        // ═══ B3 «بس احنا ما نطلق شي قبل ما نفحصه.» click -> padlock drops -> flags were there all along ═══
        const CL1 = V(12);
        press(CL1); ripple(BX, BY, CL1);
        TL.to(btn, { scale: 0.93, duration: 0.06 }, CL1 - 0.06); TL.to(btn, { scale: 1, duration: 0.2, ease: "back.out(3)" }, CL1);
        TL.to(btn, { keyframes: [{ x: -14, duration: 0.05 }, { x: 12, duration: 0.05 }, { x: -8, duration: 0.05 }, { x: 0, duration: 0.06 }] }, CL1 + 0.12);
        TL.to(btn, { backgroundColor: "#2E3237", duration: 0.2 }, CL1 + 0.2);
        TL.to([btnT, btnA], { opacity: 0, duration: 0.15 }, CL1 + 0.25);
        [[tg1, 0, -16], [tg2, 0.05, 14]].forEach(([p, dl, r]) => { TL.to(p, { y: 900, rotation: r, duration: 0.5, ease: "power2.in" }, CL1 + 0.1 + dl); TL.set(p, { autoAlpha: 0 }, CL1 + 0.62 + dl); });
        TL.to(cur, { x: 900, y: 1350, duration: 0.45, ease: "power2.inOut" }, CL1 + 0.2);
        // padlock (light body, dark keyhole) + hanging tag
        const LKX = 540, LKY = 1100;
        const mkLock = (parent, z) => {
          const lk = el("div", "abs", parent, { left: (LKX - 80) + "px", top: (LKY - 110) + "px", width: "160px", height: "200px", zIndex: z });
          const sh = el("div", "abs", lk, { left: "28px", top: "0", width: "104px", height: "120px", borderRadius: "52px 52px 0 0", border: "18px solid #F0F1F2", borderBottom: "none", transformOrigin: "86px 120px" });
          const body = el("div", "abs", lk, { left: "0", top: "84px", width: "160px", height: "116px", borderRadius: "30px", background: L, boxShadow: "0 24px 40px rgba(0,0,0,0.5)" },
            `<svg viewBox="0 0 160 116" width="160" height="116"><circle cx="80" cy="50" r="15" fill="#121416"/><rect x="73" y="54" width="14" height="34" rx="6" fill="#121416"/></svg>`);
          return { lk, sh, body };
        };
        const lock1 = mkLock(world, 12);
        gsap.set(lock1.lk, { y: -1300, rotation: -8 });
        const LD = V(13) - 0.12;
        TL.to(lock1.lk, { y: 0, rotation: 0, duration: 0.5, ease: "bounce.out" }, LD);
        TL.to(win, { y: 18, duration: 0.07, ease: "power2.out" }, LD + 0.18); TL.to(win, { y: 0, duration: 0.35, ease: "back.out(3)" }, LD + 0.25);
        const hang = el("div", "abs", world, { left: (LKX + 44) + "px", top: (LKY + 40) + "px", width: "330px", height: "190px", zIndex: 11, transformOrigin: "8px 8px" });
        el("div", "abs", hang, { left: "6px", top: "6px", width: "4px", height: "70px", background: L, borderRadius: "2px", transform: "rotate(-30deg)", transformOrigin: "2px 0" });
        const htag = el("div", "abs ar", hang, { left: "36px", top: "58px", padding: "6px 30px 14px", borderRadius: "22px", background: L, color: K, fontFamily: PF, fontWeight: "600", fontSize: "44px", display: "flex", gap: "12px", boxShadow: "0 16px 30px rgba(0,0,0,0.45)" });
        const hW = [14, 15, 16].map(i => { const s = el("span", "", htag, { color: "#B4B9BE" }, WORDS[i][0]); s._on = K; return s; });
        gsap.set(hang, { rotation: -70, opacity: 0 }); TL.set(hang, { opacity: 1 }, LD + 0.2);
        TL.to(hang, { rotation: 8, duration: 0.5, ease: "back.out(2)" }, LD + 0.2); TL.to(hang, { rotation: -3, duration: 1.2, ease: "sine.inOut" }, LD + 0.7);
        ink(hW, 14);
        // the flags were there all along
        flags.forEach((f, k) => { TL.to(f, { scale: 1, rotation: f._r, duration: 0.36, ease: "back.out(2.6)" }, V(17) + k * 0.03); });
        TL.to(cnt, { scale: 0.42, opacity: 1, duration: 0.3, ease: "back.out(2)" }, V(17));
        const qbl = el("div", "abs ar", world, { right: "120px", top: "280px", fontFamily: PF, fontWeight: "600", fontSize: "60px", color: GREY, zIndex: 5 }, "قبل ما");
        const nfh = el("div", "abs ar", world, { right: "112px", top: "330px", fontSize: "230px", color: G, zIndex: 5, transformOrigin: "100% 50%" }, "نفحصه."); fit(nfh, 560);
        blurIn(qbl, V(17)); zoomOut(nfh, V(19), 2.6);

        /*EXT*/
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
