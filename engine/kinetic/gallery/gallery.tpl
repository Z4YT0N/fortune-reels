<!DOCTYPE html>
<html lang="ar" data-resolution="portrait">
  <!-- Kinetic move gallery: every move of engine/kinetic/kinetic.js (K.*) and fx.js (X.*), one after another, ~2.2 s each with its name.
       Edit THIS file and slots.json; build.py writes index.html (brand CSS, schedule) and copies the libraries, fonts and grain.
       Render: python build.py && npx --yes hyperframes@0.9.20 render --output gallery.mp4 ; contact sheet: python sheet.py -->
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920">
    <title>Kinetic gallery</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/MotionPathPlugin.min.js"></script>
    <script src="lib/kinetic.js"></script>
    <script src="lib/fx.js"></script>
    <style>
      /*BRAND_CSS*/
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: var(--paper); }
      #main { position: relative; width: 100%; height: 100%; overflow: hidden; font-family: var(--font-hero), serif; font-weight: var(--hero-weight); color: var(--dark); background: var(--paper); }
      #stage { position: absolute; inset: 0; }
      .slot { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; overflow: hidden; background: var(--paper); }
      .tag { position: absolute; left: 0; width: 1080px; top: 1600px; text-align: center; z-index: 90; direction: ltr; }
      .tag b { display: inline-block; font-family: var(--font-latin), sans-serif; font-weight: 700; font-size: 46px; color: var(--paper); background: var(--dark); border-radius: 999px; padding: 10px 40px 14px; }
      .tag i { display: block; margin-top: 18px; font-style: normal; font-family: var(--font-latin), sans-serif; font-weight: 700; font-size: 26px; color: #6B7076; }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="__D__" data-width="1080" data-height="1920">
      <div id="stage" class="clip" data-start="0" data-duration="__D__" data-track-index="1">
        <img class="grain" src="assets/img/grain0.png" alt=""><img class="grain" src="assets/img/grain1.png" alt=""><img class="grain" src="assets/img/grain2.png" alt="">
        <img class="grain" src="assets/img/grain3.png" alt=""><img class="grain" src="assets/img/grain4.png" alt=""><img class="grain" src="assets/img/grain5.png" alt="">
      </div>
    </div>
    <script>
      const D = __D__;
      const SLOTS = /*SLOTS*/[];
      window.__timelines = window.__timelines || {};
      const TL = gsap.timeline({ paused: true });

      // ── one demo per move: (s = slot element, t = slot start, K = kinetic moves, X = fx moves) ──
      const centre = (g) => { const w = g.e.getBoundingClientRect().width; g.e.style.right = "auto"; g.e.style.left = (540 - w / 2) + "px"; return g; };
      const panel = (s, col) => { const p = document.createElement("div"); Object.assign(p.style, { position: "absolute", inset: "0", background: col }); s.appendChild(p); return p; };
      const box = (s, css) => { const b = document.createElement("div"); Object.assign(b.style, { position: "absolute" }, css); s.appendChild(b); return b; };
      const txt = (parent, text, css, cls = "") => { const e = document.createElement("div"); e.className = cls; e.dir = "rtl"; Object.assign(e.style, { position: "absolute", whiteSpace: "nowrap", lineHeight: "1.3" }, css); e.textContent = text; parent.appendChild(e); return e; };
      const DEMOS = {
        // ═════ old: kinetic.js ═════
        rise(s, t, K) { const g = centre(K.grp(s, 0, 760, [["نبدا", { s: 120 }], ["من", { s: 120 }], ["الأرقام.", { s: 150, col: K.C.ink }]])); K.fit(g, 900); centre(g); g.toks.forEach((tk, k) => K.rise(tk, t + 0.3 + k * 0.16)); },
        inkIn(s, t, K) { const g = K.grp(s, 0, 740, [["اشتغلنا", { s: 150 }], ["على", { s: 84, f: "sans" }], ["كل", { s: 84, f: "sans" }], ["صورة", { s: 150 }]]); K.fit(g, 900); centre(g); g.toks.forEach((tk, k) => K.inkIn(tk, t + 0.25 + k * 0.18)); },
        blurIn(s, t, K) { const g = centre(K.line(s, 0, 800, "لا تدور على صور أقل.", { s: 84, f: "sans" })); g.toks.forEach((tk, k) => K.blurIn(tk, t + 0.25 + k * 0.17)); },
        snap(s, t, K) { const g = K.grp(s, 0, 700, [["صور", { s: 260, col: K.C.ink }]], { cls: "scrap", style: { padding: "6px 60px 30px" } }); centre(g); K.snap(s, g.toks[0], t + 0.35, g.e); },
        hl(s, t, K) { const g = K.grp(s, 0, 760, [["نفس", { s: 120 }], ["الصور،", { s: 120 }], ["ونفس", { s: 120 }], ["الجودة.", { s: 130, hl: 1 }]]); K.fit(g, 920); centre(g); g.toks.forEach((tk, k) => K.rise(tk, t + 0.2 + k * 0.12)); K.hl(g.toks[3], t + 1.05); },
        mark(s, t, K) { const g = K.grp(s, 0, 960, [["جواله،", { s: 170 }]]); centre(g); K.rise(g.toks[0], t + 0.2); K.mark(s, 380, 640, 180, 300, "M170 14 C120 40 60 120 40 280 M40 280 L22 226 M40 280 L84 244", t + 0.7, 0.35); },
        strike(s, t, K) { const g = K.grp(s, 0, 780, [["صور", { s: 150 }], ["أقل.", { s: 170 }]]); centre(g); g.toks.forEach((tk, k) => K.rise(tk, t + 0.2 + k * 0.2)); K.strike(g.toks[1], t + 1.0, 0.25); },
        kashIn(s, t, K) { const g = K.grp(s, 0, 760, [["ويستنـــــــى،", { s: 160 }]]); K.fit(g, 900); centre(g); K.kashIn(g.toks[0], t + 0.25, 0.75); },
        kash(s, t, K) { const b = K.grp(s, 0, 760, [["ويستنـــــــى،", { s: 160, col: K.C.ink }]], { right: 0 }); K.fit(b, 900); const R = 540 - b.e.getBoundingClientRect().width / 2; b.e.style.right = R + "px";
          const a = K.grp(s, 0, 760, [["ويستنى،", { s: parseFloat(b.toks[0].tk.style.fontSize), col: K.C.ink }]], { right: R }); K.kash(a, b, t + 0.25, 0.75); },
        fly(s, t, K) { const g = K.grp(s, 0, 760, [["يفتحه", { s: 150 }], ["من", { s: 90, f: "sans" }], ["جواله،", { s: 150, col: K.C.ink }]]); K.fit(g, 900); centre(g);
          K.fly(g.toks[0].tk, t + 0.2, [{ x: 900, y: -420 }, { x: 420, y: -260 }, { x: 120, y: -60 }], 0.6, 18); K.fly(g.toks[1].tk, t + 0.45, [{ x: 0, y: 700 }, { x: 80, y: 300 }], 0.5, -10); K.fly(g.toks[2].tk, t + 0.65, [{ x: -900, y: 420 }, { x: -420, y: 260 }, { x: -120, y: 60 }], 0.6, -18); },
        flyOut(s, t, K) { const g = K.grp(s, 0, 760, [["ويطلع", { s: 170 }], ["مع", { s: 90, f: "sans" }], ["اللفة.", { s: 170, col: K.C.ink }]]); K.fit(g, 900); centre(g); K.flyOut(g.e, t + 0.9, [{ x: 120, y: 40 }, { x: 520, y: 180 }, { x: 1100, y: 420 }]); },
        feather(s, t, K) { const g = centre(K.grp(s, 0, 800, [["يخفف", { s: 220, col: K.C.ink }]], { origin: "70% 0%" })); K.feather(g.e, t + 0.15); },
        echoStack(s, t, K) { const g = centre(K.grp(s, 0, 860, [["صور", { s: 260, col: K.C.ink }]])); gsap.set(g.toks[0].tk, { opacity: 0 }); TL.set(g.toks[0].tk, { opacity: 1 }, t + 0.5); K.echoStack(g.toks[0], t + 0.15, 5, 0.9, true); },
        rows(s, t, K) { K.rows(s, "ويستنى", 420, 7, 150, t + 0.05, t + 2.2, ["echoG", "echo"]); const g = centre(K.grp(s, 0, 800, [["ويستنى", { s: 200 }]])); K.zoomOut(g.e, t + 0.4); },
        slam(s, t, K) { const g = K.grp(s, 0, 720, [["٣٤", { s: 300, col: K.C.ink }], ["ميجا", { s: 170 }]]); centre(g); K.slam(g.toks[0], t + 0.35); K.slam(g.toks[1], t + 0.75, -1); },
        zoomOut(s, t, K) { const g = K.grp(s, 0, 780, [["عميلك", { s: 220 }]], { origin: "50% 60%" }); K.fit(g, 760); centre(g); K.zoomOut(g.e, t + 0.3); },
        stamp(s, t, K) { const sc = K.scrap(s, { left: 160, top: 640, w: 760, h: 420 }); K.tape(sc, 300, -14, -4); const g = K.grp(sc, 0, 50, [["والحجم", { s: 70, f: "sans" }], ["١٤٠", { s: 110, col: K.C.inkDeep }], ["كيلو", { s: 110 }]], { right: 50 }); K.stamp(sc, "بس.", { left: 70, top: 230 }, t + 0.7, { s: 110 }); },
        jolt(s, t, K) { const g = K.grp(s, 0, 640, [["والصور", { s: 150 }], ["تطيح", { s: 150, col: K.C.ink }]]); K.fit(g, 900); centre(g); const b = box(s, { left: "240px", top: "1050px", width: "600px", height: "260px", borderRadius: "30px", background: K.C.dark });
          gsap.set(b, { y: -1500 }); TL.to(b, { y: 0, duration: 0.3, ease: "power3.in" }, t + 0.8); K.squash(b, t + 1.1); K.jolt([g.e], t + 1.1); },
        swallow(s, t, K) { const a = centre(K.grp(s, 0, 560, [["معرض", { s: 150 }]])), b = centre(K.grp(s, 0, 820, [["صور", { s: 200, col: K.C.ink }]])), c = centre(K.line(s, 0, 1140, "في موقع شركة", { s: 80, f: "sans" })); K.swallow([a.e, b.e, c.e], t + 1.2); },
        out(s, t, K) { const g = K.grp(s, 0, 760, [["خلاص", { s: 170 }], ["انتهى.", { s: 170, col: K.C.ink }]]); K.fit(g, 820); centre(g); K.out(g.toks.map((x) => x.tk), t + 1.0, { y: -120, filter: "blur(10px)" }, 0.28); },
        trailsDrop(s, t, K) { const sc = K.scrap(s, { left: 300, top: 560, w: 480, h: 420 }); const g = K.grp(sc, 0, 120, [["١٤٠", { s: 150, col: K.C.inkDeep }], ["كيلو", { s: 110 }]], { right: 60 }); K.trailsDrop(sc, t + 0.25); },
        over(s, t, K) { const c = K.chip(s, { left: 250, top: 780, w: 580, h: 190 }, 120); c.t.textContent = "كبيرة،"; K.over(c.e, t + 0.5, 0.12); K.over(c.e, t + 1.3, 0.08); },
        typeOn(s, t, K) { const c = K.chip(s, { left: 190, top: 790, w: 700, h: 150 }, 84); K.typeOn(c.t, "فحص مجاني لموقعك", t + 0.25, t + 1.4); },
        blink(s, t, K) { const b = box(s, { left: "120px", top: "800px", width: "840px", height: "150px", borderRadius: "75px", background: K.C.dark }); const c = box(b, { right: "80px", top: "30px", width: "20px", height: "90px", background: K.C.ink }); K.blink(c, t + 0.1, t + 1.9, 0.4); },
        selBox(s, t, K) { const c = K.chip(s, { left: 160, top: 800, w: 760, h: 150 }, 66); c.t.textContent = "اكتب انطباع بالتعليقات"; K.selBox(c.e, t + 0.9, t + 2.1); K.cursor(s, 760, 900, t + 0.3, t + 1.2, c.e); },
        live(s, t, K) { const g = K.grp(s, 0, 760, [["فورتشن", { s: 180 }], ["كود", { s: 180, col: K.C.ink }]], { origin: "50% 60%" }); K.fit(g, 800); centre(g); K.live(g.e, t, t + 1.0, 0.07); TL.to(g.e, { scale: 1, duration: 0.9, ease: "sine.inOut" }, t + 1.0); },
        grain(s, t, K) { const g = centre(K.grp(s, 0, 760, [["حبيبات", { s: 170 }], ["الفيلم", { s: 170, col: K.C.ink }]])); },

        // ═════ new: fx.js ═════
        wipeIn(s, t, K, X) { const g = centre(K.line(s, 0, 800, "لا تدور على صور", { s: 96, f: "sans" })); g.toks.forEach((tk, k) => X.wipeIn(tk, t + 0.25 + k * 0.22)); },
        marker(s, t, K, X) { const g = K.grp(s, 0, 760, [["نبدا", { s: 120 }], ["من", { s: 120 }], ["الأرقام.", { s: 160 }]]); K.fit(g, 860); centre(g); X.circle(g.toks[2], t + 0.3, 0.5); X.under(g.toks[0], t + 1.1, 0.45); },
        guides(s, t, K, X) { const e = txt(s, "انضبط.", { left: "220px", top: "700px", fontSize: "200px" }); X.crooked(e, t + 0.4, -7);
          X.guides(s, [{ x: 150, y: 1010, w: 760, col: K.C.ink }, { x: 190, y: 770, w: 700, rot: -7, col: "#8B9096" }], t + 0.75); },
        eyeBlink(s, t, K, X) { const g = centre(K.grp(s, 0, 760, [["قبل", { s: 90, f: "sans" }], ["ما", { s: 90, f: "sans" }], ["ترمش.", { s: 200, col: K.C.ink }]])); K.zoomOut(g.e, t + 0.25); X.eyeBlink(s, t + 1.0); },
        neon(s, t, K, X) { panel(s, K.C.dark); X.neon(s, ["صور", "أقل."], { cy: 880, size: 170 }, [t + 0.7, t + 1.1], t + 2.0); },
        flagWarp(s, t, K, X) { X.flagWarp(s, "معرض صور", { t: t + 0.05, cy: 860 }); },
        sliceGlitch(s, t, K, X) { X.sliceGlitch(s, "صور", { cy: 880, maxW: 760, out: t + 1.8 }, t + 0.3); },
        unfold(s, t, K, X) { const n = X.word(s, "٣٤", 560, K.C.dark, 540, 820); X.unfold(n, t + 0.3); const p = X.pill(s, "ميجا", { size: 120, bg: K.C.ink, cx: 540, cy: 1260, rot: -4 }); X.popIn(p, t + 0.9); },
        kashGrow(s, t, K, X) { const e = txt(s, "ويستنى،", { right: "120px", top: "720px", fontSize: "150px" }); const u = box(s, { right: "120px", top: "925px", height: "12px", width: "0px", background: K.C.ink, borderRadius: "6px" });
          gsap.set(e, { opacity: 0, scale: 0.4, y: 30, transformOrigin: "100% 60%" }); TL.to(e, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(2)" }, t + 0.1); X.kashGrow(e, "ويستن", "ى،", t + 0.6, t + 2.1, { maxW: 840, under: u, size: 150 }); },
        spin(s, t, K, X) { const r = box(s, { left: "340px", top: "660px", width: "400px", height: "400px", borderRadius: "50%", border: `8px solid ${K.C.dark}` }); const a = X.word(s, "عميلك", 110, K.C.dark, 540, 850), b = X.word(s, "يفتحه", 110, K.C.ink, 540, 850);
          X.spinIn(a, t + 0.2); X.spinOut(a, t + 1.0); X.spinIn(b, t + 1.05); },
        whipOut(s, t, K, X) { const w = X.word(s, "ويطلع.", 200, K.C.ink, 540, 835); X.popIn(w, t + 0.2, -3, 0.45); X.whipOut(w, t + 1.1, { trail: { parent: s, x: 140, y: 835, w: 760 } }); },
        giantSweep(s, t, K, X) { panel(s, K.C.dark); X.word(s, "ويستنى", 150, K.C.paper, 540, 835); X.giantSweep(s, "ويطلع", t + 0.5, { panel: K.C.paper, cy: 835 }); },
        drum(s, t, K, X) { X.drum(s, ["عميلك", "يفتحه", "من", "جواله"], { cy: 880 }, [t + 0.2, t + 0.8, t + 1.4, t + 2.0]); },
        strikeFall(s, t, K, X) { const o = txt(s, "٣٤ ميجا", { right: "200px", top: "620px", fontSize: "150px", color: "#8B9096" }); X.strikeFall(o, t + 0.4);
          const n = X.word(s, "١٤٠ كيلو", 190, K.C.ink, 540, 1000); K.zoomOut(n, t + 0.95); },
        orbit(s, t, K, X) { X.word(s, "معرض صور", 160, K.C.dark, 540, 862).style.zIndex = 5; const cols = [K.C.ink, K.C.inkDeep, K.C.dark, "#8B9096", K.C.inkSoft, K.C.dark, K.C.ink, K.C.inkDeep];
          const tiles = cols.map((c) => box(s, { left: "0", top: "0", width: "172px", height: "172px", borderRadius: "38px", background: c, border: `6px solid ${K.C.paper}`, boxShadow: "0 16px 34px rgba(18,20,22,0.22)" }));
          X.orbit(tiles, t, t + 2.5, { to: { x: 540, y: 862, t: t + 2.05 } }); },
        echoRings(s, t, K, X) { panel(s, K.C.dark); X.echoRings(s, "ويستنى", { cy: 860 }, t + 0.2, t + 1.3); },
        wordGrid(s, t, K, X) { X.wordGrid(s, "صور", { box: { row: 7, words: ["معرض", "صور", "في", "موقع", "شركة", "كبيرة،"] } }, t + 0.15, t + 2.05); },
        pills(s, t, K, X) { const p1 = X.pill(s, "في موقع", { size: 66, bg: K.C.paper, border: 1, cx: 690, cy: 760, rot: 6 }), p2 = X.pill(s, "شركة", { size: 74, bg: K.C.dark, col: K.C.paper, cx: 330, cy: 780, rot: -7 }), p3 = X.pill(s, "كبيرة،", { size: 124, bg: K.C.ink, cx: 560, cy: 900, rot: -3 });
          X.popIn(p1, t + 0.2); X.popIn(p2, t + 0.45); X.popIn(p3, t + 0.75); X.shoulder(p3, [p1, p2], t + 0.75); X.dropAway([p1, p2, p3], t + 1.75); },
        countRoll(s, t, K, X) { const c = box(s, { left: "190px", top: "640px", width: "700px", height: "420px", borderRadius: "46px", background: K.C.dark });
          txt(c, "حجمه", { right: "60px", top: "40px", fontSize: "60px", color: "#8B9096" }); const row = box(c, { right: "60px", top: "130px", display: "flex", alignItems: "baseline", gap: "26px", direction: "rtl" });
          const n = txt(row, "٤", { position: "relative", fontSize: "190px", color: K.C.ink, lineHeight: "1.05" }); txt(row, "ميجا", { position: "relative", fontSize: "100px", color: K.C.paper, lineHeight: "1.05" }); X.countRoll(n, 4, 34, t + 0.3, t + 1.3); },
        unitSlam(s, t, K, X) { const row = box(s, { left: "0", width: "1080px", top: "720px", display: "flex", justifyContent: "center", alignItems: "baseline", gap: "30px", direction: "rtl" });
          const n = txt(row, "٣٤", { position: "relative", fontSize: "260px", color: K.C.ink, lineHeight: "1.05", transformOrigin: "50% 80%" }), u = txt(row, "ميجا", { position: "relative", fontSize: "150px", lineHeight: "1.05" }); X.unitSlam(n, u, t + 0.55); },
        heavy(s, t, K, X) { const sh = box(s, { left: "190px", top: "700px", width: "700px", height: "360px", borderRadius: "46px", boxShadow: "0 40px 70px rgba(18,20,22,0.35)" }), c = box(s, { left: "190px", top: "700px", width: "700px", height: "360px", borderRadius: "46px", background: K.C.dark });
          txt(c, "معرض صور", { right: "60px", top: "30px", fontSize: "70px", color: K.C.paper }); txt(c, "٣٤ ميجا", { right: "60px", top: "150px", fontSize: "140px", color: K.C.ink }); const cr = X.credits(s, null, K.C.dark, t); X.getHeavy(c, t + 0.2, t + 1.45, { shadow: sh, dip: cr }); },
        light(s, t, K, X) { const c = box(s, { left: "190px", top: "760px", width: "700px", height: "360px", borderRadius: "46px", background: K.C.dark, boxShadow: "0 40px 80px rgba(0,0,0,0.6)" });
          txt(c, "معرض صور", { right: "60px", top: "30px", fontSize: "70px", color: K.C.paper }); txt(c, "١٤٠ كيلو", { right: "60px", top: "150px", fontSize: "140px", color: K.C.ink }); X.getLight(c, t + 0.4, { shadow: "0 90px 120px rgba(0,0,0,0.35)", until: t + 2.4 }); },
        hangTag(s, t, K, X) { box(s, { left: "160px", top: "540px", width: "760px", height: "24px", borderRadius: "12px", background: K.C.dark }); const h = X.hangTag(s, { x: 540, y: 560 }, "٠", "ميجا", { size: 150 }, [[t + 0.05, 26], [t + 0.75, -10], [t + 1.6, 8]], t, t + 2.6);
          X.countRoll(h.n, 0, 34, t + 0.15, t + 0.65); X.unitSlam(h.n, h.u, t + 0.75); },
        stomp(s, t, K, X) { const w = box(s, { inset: "0" }); const e = X.word(w, "أقل", X.fitSize("أقل", 700, 420), K.C.dark, 540, 860, { origin: "50% 85%" }); X.stomp(e, t + 0.4); X.shake(w, t + 0.4 + 3 / 30, { cam: 16 }); },
        slab(s, t, K, X) { const e = txt(s, "بطيء؟", { left: "0px", top: "720px", fontSize: X.fitSize("بطيء؟", 560, 170) + "px", color: "#8B9096" }); e.style.left = (540 - e.getBoundingClientRect().width / 2) + "px"; gsap.set(e, { opacity: 0, y: -60 }); TL.to(e, { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.4)" }, t + 0.15);
          const r = e.getBoundingClientRect(); X.slab(s, { left: r.left - 30, top: r.top + 10, w: r.width + 60, h: r.height - 10 }, "لا.", t + 1.0, { size: 220 }); },
        shake(s, t, K, X) { const e = X.word(s, "تتحرك.", 220, K.C.dark, 540, 720, { origin: "50% 80%" }); X.shake(e, t + 0.45, { kind: "wobble" }); X.shake(e, t + 1.25, { kind: "wobble" });
          const c = K.chip(s, { left: 310, top: 1000, w: 460, h: 130 }, 66); c.t.textContent = "إطلاق"; X.shake(c.e, t + 0.95, { kind: "no" }); },
        flood(s, t, K, X) { const f = X.flood(s, 540, 835, t + 1.05, { word: "معرض", pop: t + 0.15, col: K.C.ink, size: 120 }); TL.to(f.word, { opacity: 0, duration: 0.1 }, t + 1.0); const w = X.word(s, "صور", 300, K.C.dark, 540, 835); w.style.zIndex = 9; X.popIn(w, t + 1.3, 0, 0.45); },
        panelPush(s, t, K, X) { panel(s, K.C.ink); const a = X.word(s, "معرض", 400, K.C.dark, 540, 835); X.panelPush(s, K.C.paper, t + 0.9, { word: "صور", push: [a] }); },
        searchBar(s, t, K, X) { X.searchBar(s, { left: 80, top: 780, w: 920, h: 150 }, [["دور", t + 0.5, t + 0.75], ["على", t + 0.8, t + 0.95], ["أحد", t + 1.0, t + 1.2], ["يعرف", t + 1.25, t + 1.5], ["يخفف", t + 1.55, t + 1.85]], { t: t + 0.1, until: t + 2.4 }); },
        toast(s, t, K, X) { X.toast(s, { left: 80, top: 800, w: 920, h: 210 }, [["لا", t + 0.5], ["تدور", t + 0.68], ["على", t + 0.86], ["صور", t + 1.04], ["أقل.", t + 1.3]], { key: 3, until: t + 2.4 }); },
        clipCard(s, t, K, X) { const cc = X.clipCard(s, { rect: { l: 190, t: 700, r: 890, b: 1060 } });
          txt(cc.layer, "معرض صور", { right: "250px", top: "740px", fontSize: "80px", color: K.C.paper }); txt(cc.layer, "٣٤ ميجا", { right: "250px", top: "860px", fontSize: "110px", color: K.C.ink });
          const big = X.word(cc.layer, "عميلك", 240, K.C.paper, 540, 860); gsap.set(big, { opacity: 0 }); cc.open(t + 0.2); X.click(s, 690, 985, t + 0.85, { rings: { l: 190, t: 700, w: 700, h: 360, rad: 46 } }); cc.expand(t + 1.15); TL.to(big, { opacity: 1, duration: 0.2 }, t + 1.45); cc.swipe(t + 1.95); },
        click(s, t, K, X) { const c = K.chip(s, { left: 240, top: 820, w: 600, h: 150 }, 80); c.t.textContent = "يفتحه"; K.cursor(s, 600, 900, t + 0.2, t + 0.85, c.e); X.click(s, 600, 900, t + 0.85, { rings: { l: 240, t: 820, w: 600, h: 150, rad: 10 } }); },
        circleWipe(s, t, K, X) { const c = K.chip(s, { left: 200, top: 820, w: 680, h: 150 }, 70); c.t.textContent = "اطلب فحص مجاني"; K.cursor(s, 600, 900, t + 0.2, t + 0.8, c.e); X.click(s, 600, 900, t + 0.8); X.circleWipe(s, 600, 900, t + 0.86); },
        credits(s, t, K, X) { X.credits(s, null, K.C.dark, t + 0.1); const g = centre(K.grp(s, 0, 760, [["سرعة", { s: 200, col: K.C.ink }]])); K.zoomOut(g.e, t + 0.3); },
      };

      async function build() {
        gsap.registerPlugin(MotionPathPlugin);
        await document.fonts.ready;
        await Promise.all(["--font-hero", "--font-label", "--font-latin"].map((v) => document.fonts.load(`80px ${getComputedStyle(document.documentElement).getPropertyValue(v).trim()}`, "معرض صور ٣٤ abc")));
        TL.to({}, { duration: D }, 0);
        const stage = document.getElementById("stage"), slots = [];
        SLOTS.forEach((sl, i) => {
          const s = document.createElement("div"); s.className = "slot"; s.style.zIndex = 1; stage.insertBefore(s, stage.querySelector(".grain"));
          const K = Kinetic.create(TL, { stage: s, front: s, behind: s }), X = Kinetic.fx(TL, K, { stage: s, front: s });
          DEMOS[sl.id](s, sl.start, K, X);
          const tag = document.createElement("div"); tag.className = "tag"; tag.innerHTML = `<b>${sl.name}</b><i>${String(i + 1).padStart(2, "0")}/${SLOTS.length} · ${sl.fam} · ${sl.src}</i>`; s.appendChild(tag);
          slots.push([s, sl]);
        });
        slots.forEach(([s, sl]) => { gsap.set(s, { autoAlpha: 0 }); TL.set(s, { autoAlpha: 1 }, sl.start); TL.set(s, { autoAlpha: 0 }, sl.start + sl.dur); });
        Kinetic.create(TL, { stage, front: stage }).grain(D, 0.5);
        window.__timelines["main"] = TL; TL.seek(0);
      }
      window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {};
      window.__hf.buildReady["main"] = build();
    </script>
  </body>
</html>
