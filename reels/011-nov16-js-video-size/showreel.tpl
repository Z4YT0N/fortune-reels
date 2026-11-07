<!DOCTYPE html>
<html lang="ar" data-resolution="portrait">
  <!-- Reel 011 (Nov 16): JS 2.2 MB -> 1.2 MB, background video 2 MB -> 613 KB. Showreel vocabulary from 008
       (pills, file card + counter, cursor thread, card that swells into the dark world, swipe-away), new ideas:
       a phone standing on a SCALE (needle + sinking platform) carries the weight, ghost (dashed) files nobody sees,
       file cards with growing bars, a stopwatch ring born from the phone's spinner, 100 visitors of which 53 leave,
       a vertical bar chart whose bars are CUT (JS chunk falls off) and SQUASHED (video), and a progress bar that races.
       Moves per line: pills pop + shoulder | connector blurIn + tag with drawn arrow | «حمل» drop with squash |
       file clone flies on a curve + card RTL wipe + typewriter title + counter + «ميجا» slam | smear slam «وش» + highlight
       wipe | push-through lines | jiggle «تتحرك» (micro-gag: taps do nothing) | circle wipe into dark | two-tone ink |
       zoom-out reveal | cut line + falling chunk | squash bar | swipe away | feather float «اخف» | comment field typing | end panel.
       Hidden state is set at BUILD time (gsap.set); the timeline only tweens out of it. build.py fills __D__ and WORDS. -->
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920">
    <title>Nov 16 JS and video size reel</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/MotionPathPlugin.min.js"></script>
    <style>
      @font-face { font-family: "ZainL"; src: url("assets/fonts/zain-mob-long.ttf") format("truetype"); }
      @font-face { font-family: "InterX"; src: url("assets/fonts/inter-lat-700.woff2") format("woff2"); font-weight: 700; }
      @font-face { font-family: "InterX"; src: url("assets/fonts/inter-lat-800.woff2") format("woff2"); font-weight: 800; }
      @font-face { font-family: "PlexA"; src: url("assets/fonts/IBMPlexSansArabic-Medium.ttf") format("truetype"); font-weight: 500; }
      @font-face { font-family: "PlexA"; src: url("assets/fonts/IBMPlexSansArabic-SemiBold.ttf") format("truetype"); font-weight: 600; }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #F0F1F2; }
      #main { position: relative; width: 1080px; height: 1920px; overflow: hidden; font-family: "ZainL", sans-serif; color: #121416; }
      .abs { position: absolute; }
      .ar { direction: rtl; white-space: nowrap; line-height: 1.3; }
      .px { font-family: "PlexA", sans-serif; font-weight: 600; }
      #world { position: absolute; inset: 0; background: #F0F1F2; overflow: hidden; z-index: 0; }
      #cam { position: absolute; inset: 0; transform-origin: 540px 900px; }
      .lab { position: absolute; font-family: "PlexA", sans-serif; font-weight: 600; font-size: 24px; white-space: nowrap; }
      .pill { position: absolute; border-radius: 999px; direction: rtl; white-space: nowrap; line-height: 1.25; display: flex; align-items: center; justify-content: center; }
      #ph { position: absolute; left: 130px; top: 560px; width: 300px; height: 600px; border-radius: 50px; background: #1E2124; border: 2px solid #3A3E43; padding: 12px;
            box-shadow: 0 40px 70px rgba(18,20,22,0.30), inset 0 0 0 2px #2A2E32; }
      #scr { position: relative; width: 100%; height: 100%; border-radius: 40px; background: #F0F1F2; overflow: hidden; }
      .notch { position: absolute; left: 50%; top: 12px; width: 86px; height: 24px; margin-left: -43px; border-radius: 14px; background: #121416; z-index: 3; }
      .skl { position: absolute; background: #D9DCDF; border-radius: 10px; }
      .file { position: absolute; width: 120px; height: 150px; }
      .file .body { position: absolute; inset: 0; border-radius: 18px 44px 18px 18px; }
      .file .lbl { position: absolute; left: 0; right: 0; bottom: 18px; text-align: center; font-family: "InterX"; font-weight: 800; font-size: 40px; letter-spacing: 1px; }
      .card { position: absolute; border-radius: 40px; background: #121416; overflow: hidden; box-shadow: 0 30px 60px rgba(18,20,22,0.30), 0 6px 14px rgba(18,20,22,0.2); }
      .track { position: absolute; border-radius: 12px; background: #2E3237; overflow: hidden; }
      .fillb { position: absolute; right: 0; top: 0; bottom: 0; width: 100%; border-radius: 12px; background: #00DB33; transform-origin: 100% 50%; }
      #darkWrap { position: absolute; inset: 0; z-index: 10; }
      #dark { position: absolute; inset: 0; background: #121416; overflow: hidden; clip-path: circle(0px at 274px 760px); }
      .ripple { position: absolute; width: 120px; height: 120px; margin: -60px 0 0 -60px; border-radius: 50%; border: 5px solid #00DB33; opacity: 0; }
      #cur { position: absolute; left: 0; top: 0; z-index: 50; width: 58px; height: 80px; transform-origin: 0 0; }
      .grain { position: absolute; inset: 0; width: 1080px; height: 1920px; mix-blend-mode: soft-light; opacity: 0; z-index: 60; pointer-events: none; }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="__D__" data-width="1080" data-height="1920">
      <div id="stage" class="clip" data-start="0" data-duration="__D__" data-track-index="1" style="position:absolute;inset:0">
        <div id="world"><div id="cam"></div></div>
        <div id="darkWrap"><div id="dark"></div></div>
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
      const K = "#121416", G = "#00DB33", DG = "#006A39", L = "#F0F1F2", GREY = "#8B9096", DK2 = "#1E2124";
      const AR = n => String(n).replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]).replace(".", "٫");
      const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
      const lerp = (a, b, p) => a + (b - a) * p;
      const ramp = (t, a, b) => clamp((t - a) / (b - a));
      const expoOut = p => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));
      const inOut = p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);
      const hash = n => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
      const el = (tag, cls, parent, css = {}, html = "") => { const e = document.createElement(tag); if (cls) e.className = cls; Object.assign(e.style, css); if (html) e.innerHTML = html; parent.appendChild(e); return e; };
      const frames = (a, b, fn) => { for (let f = Math.max(0, Math.round(a * FPS)); f <= Math.round(b * FPS); f++) fn(f * F, f); };
      const at = t => Math.max(0, t - 0.0004);

      async function build() {
        await document.fonts.load('100px "ZainL"'); await document.fonts.load('800 20px "InterX"'); await document.fonts.load('500 40px "PlexA"'); await document.fonts.load('600 40px "PlexA"'); await document.fonts.ready;
        await Promise.all(Array.from(document.images).map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
        const TL = gsap.timeline({ paused: true });
        const stage = document.getElementById("stage"), world = document.getElementById("world"), cam = document.getElementById("cam");
        const dark = document.getElementById("dark"), darkWrap = document.getElementById("darkWrap"), cur = document.getElementById("cur");
        const PF = '"PlexA", sans-serif';
        const measure = (html, size, fam = "ZainL") => { const s = el("span", "ar", document.body, { position: "absolute", left: "-5000px", top: "0", fontSize: size + "px", fontFamily: fam, fontWeight: fam === "ZainL" ? "400" : "600" }, html); const r = s.getBoundingClientRect().width; s.remove(); return r; };
        const fit = (e, maxW) => { const w = e.getBoundingClientRect().width; if (w > maxW) e.style.fontSize = (parseFloat(e.style.fontSize) * maxW / w) + "px"; };
        const ctr = (e, cx, cy) => { const r = e.getBoundingClientRect(); e.style.left = (cx - r.width / 2) + "px"; e.style.top = (cy - r.height / 2) + "px"; };
        // move library (each hides its element at BUILD time, then only tweens out of that state)
        const blurIn = (e, t, d = 0.36) => { gsap.set(e, { opacity: 0, y: 16, filter: "blur(8px)" }); TL.to(e, { opacity: 1, y: 0, filter: "blur(0px)", duration: d, ease: "power3.out" }, t); };
        const zoomOut = (e, t, s = 2.6) => { gsap.set(e, { opacity: 0, scale: s, filter: "blur(10px)" }); TL.set(e, { opacity: 1 }, t); TL.to(e, { scale: 1, filter: "blur(0px)", duration: 0.34, ease: "expo.out" }, t); };
        const popIn = (e, t, rot = 0) => { gsap.set(e, { opacity: 0, scale: 0.3, rotation: rot * 2.5 }); TL.set(e, { opacity: 1 }, t); TL.to(e, { scale: 1, rotation: rot, duration: 0.5, ease: "back.out(1.7)" }, t); };
        const slamIn = (e, t) => { gsap.set(e, { opacity: 0 }); TL.set(e, { opacity: 1, x: 240, scaleX: 1.4, skewX: -12, filter: "blur(9px)" }, t - 3 * F); TL.to(e, { x: 0, scaleX: 1, skewX: 0, filter: "blur(0px)", duration: 0.3, ease: "expo.out" }, t); };
        const riseIn = (e, t, d = 0.42) => { gsap.set(e, { opacity: 0, y: 70 }); TL.to(e, { opacity: 1, y: 0, duration: d, ease: "expo.out" }, t); };
        const exitUp = (els, t) => TL.to(els, { y: "-=120", opacity: 0, filter: "blur(8px)", duration: 0.32, ease: "power2.in", stagger: 0.025 }, t);
        // two-tone ink: words arrive grey and turn light on their spoken frame
        const inkLine = (parent, ids, css, col = L, hl = []) => {
          const l = el("div", "abs ar", parent, Object.assign({ display: "flex", gap: "16px", fontFamily: PF, fontWeight: "600", color: "#4A4F55" }, css));
          const ws = ids.map(i => el("span", "", l, { display: "inline-block", borderRadius: "16px", padding: "0 10px 6px", margin: "0 -10px" }, WORDS[i][0]));
          ws.forEach((w, k) => TL.to(w, { color: hl.includes(ids[k]) ? G : col, duration: 0.12 }, V(ids[k])));
          return { l, ws };
        };
        // Arabic typewriter: ONE string grows, letters stay joined
        const typeOn = (e, s, t0, t1) => { let lq = null; frames(t0, t1, (t) => { const n = Math.max(1, Math.round(s.length * ramp(t, t0, t1))); const v = s.slice(0, n); if (v !== lq) { TL.set(e, { textContent: v }, at(t)); lq = v; } }); };
        const counter = (e, a, b, t0, t1, fmt) => { let lc = null; frames(t0, t1, (t) => { const v = fmt(lerp(a, b, expoOut(ramp(t, t0, t1)))); if (v !== lc) { TL.set(e, { textContent: v }, at(t)); lc = v; } }); TL.set(e, { textContent: fmt(b) }, t1 + F); };
        const one = v => AR((Math.round(v * 10) / 10).toFixed(1)).replace("٫٠", "");

        // corner credits in both worlds (inside the safe zone)
        const labels = (parent, col) => {
          const box = el("div", "", parent, { position: "absolute", inset: "0", color: col });
          [["fortunecode.org", 60, 232, "l"], ["سرعة المواقع", 960, 232, "r"], ["٢٠٢٦", 60, 1404, "l"], ["فورتشن كود", 960, 1404, "r"]].forEach(([s, x, y, a]) => {
            const l = el("div", "lab", box, { top: y + "px" }, s);
            if (a === "l") l.style.left = x + "px"; else l.style.right = (1080 - x) + "px";
          });
          return box;
        };
        labels(world, K);

        // ═══ the scale: phone on a platform, dial with needle (persistent thread with the cursor) ═══
        const scaleG = el("div", "abs", cam, { left: "0", top: "0", width: "1080px", height: "1920px" });
        const sink = el("div", "abs", scaleG, { left: "0", top: "0", width: "1080px", height: "1920px" });
        const ph = el("div", "", sink); ph.id = "ph";
        const scr = el("div", "", ph); scr.id = "scr"; el("div", "notch", scr);
        el("div", "skl", scr, { left: "18px", right: "18px", top: "48px", height: "24px", borderRadius: "12px" });
        const hero = el("div", "skl", scr, { left: "18px", right: "18px", top: "88px", height: "196px", borderRadius: "22px", background: "#CDD1D5", overflow: "hidden" });
        const play = el("div", "abs", hero, { left: "50%", top: "50%", width: "64px", height: "64px", margin: "-32px 0 0 -32px" }, `<svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="30" fill="#F0F1F2" fill-opacity="0.65"/><path d="M26 20 L46 32 L26 44 Z" fill="#8B9096"/></svg>`);
        const spin = el("div", "abs", hero, { left: "50%", top: "50%", width: "90px", height: "90px", margin: "-45px 0 0 -45px" }, `<svg viewBox="0 0 120 120" width="90" height="90"><circle cx="60" cy="60" r="46" fill="none" stroke="#121416" stroke-opacity="0.12" stroke-width="12"/><circle cx="60" cy="60" r="46" fill="none" stroke="#00DB33" stroke-width="12" stroke-linecap="round" stroke-dasharray="90 400"/></svg>`);
        gsap.set(spin, { opacity: 0, scale: 0.4 });
        const lines = [[300, "84%"], [330, "62%"], [360, "74%"]].map(([y, w]) => el("div", "skl", scr, { right: "18px", top: y + "px", width: w, height: "16px", borderRadius: "8px" }));
        const blocks = [0, 1].map(c => el("div", "skl", scr, { left: (18 + c * 128) + "px", top: "396px", width: "116px", height: "112px", borderRadius: "16px" }));
        const ptrack = el("div", "abs", scr, { left: "22px", right: "22px", bottom: "34px", height: "12px", borderRadius: "6px", background: "#D3D6D9", overflow: "hidden" });
        const pfill = el("div", "abs", ptrack, { right: "0", top: "0", bottom: "0", width: "100%", background: G, borderRadius: "6px", transformOrigin: "100% 50%" });
        gsap.set(pfill, { scaleX: 0 });
        el("div", "abs", sink, { left: "70px", top: "1166px", width: "420px", height: "30px", borderRadius: "15px", background: K, boxShadow: "0 14px 24px rgba(18,20,22,0.25)" });
        el("div", "abs", scaleG, { left: "255px", top: "1190px", width: "50px", height: "52px", background: "#3A3E43" });
        el("div", "abs", scaleG, { left: "130px", top: "1236px", width: "300px", height: "170px" },
          `<svg viewBox="0 0 300 170" width="300" height="170"><path d="M20 160 A130 130 0 0 1 280 160 Z" fill="#E4E6E8"/><path d="M28 160 A122 122 0 0 1 272 160" fill="none" stroke="#C9CDD1" stroke-width="16"/><path d="M236 74 A122 122 0 0 1 272 160" fill="none" stroke="#121416" stroke-width="16"/>` +
          [0, 1, 2, 3, 4, 5, 6].map(k => { const a = Math.PI * (1 - k / 6); return `<line x1="${150 + Math.cos(a) * 92}" y1="${160 - Math.sin(a) * 92}" x2="${150 + Math.cos(a) * 104}" y2="${160 - Math.sin(a) * 104}" stroke="#8B9096" stroke-width="5" stroke-linecap="round"/>`; }).join("") + `</svg>`);
        const needle = el("div", "abs", scaleG, { left: "276px", top: "1294px", width: "8px", height: "104px", borderRadius: "4px", background: K, transformOrigin: "50% 100%" });
        el("div", "abs", scaleG, { left: "264px", top: "1382px", width: "32px", height: "32px", borderRadius: "50%", background: G, boxShadow: "inset 0 0 0 5px #121416" });
        gsap.set(needle, { rotation: -68 });

        // camera: one slow drift per beat, never stops
        TL.fromTo(cam, { scale: 1 }, { scale: 1.03, duration: 9.0, ease: "sine.inOut", immediateRender: false }, 0);

        // ═══ B1 hook: «موقع شركة كبيرة،» pills (frame 0 already carries «موقع») ═══
        const pill = (txt, size, bg, col, cx, cy, rot, border, parent = cam) => {
          const p = el("div", "pill", parent, { fontSize: size + "px", background: bg, color: col, padding: `${size * 0.02}px ${size * 0.42}px ${size * 0.12}px`, zIndex: 8 }, txt);
          if (border) p.style.boxShadow = `inset 0 0 0 4px ${K}`;
          ctr(p, cx, cy); p._rot = rot; return p;
        };
        const p1 = pill("موقع", 128, K, L, 738, 420, -4);
        const p2 = pill("شركة", 100, G, K, 420, 430, 7);
        const p3 = pill("كبيرة،", 140, L, K, 640, 600, -2, true);
        gsap.set(p1, { rotation: -4 });
        TL.fromTo(p1, { scale: 1.06 }, { scale: 1, duration: 0.5, ease: "power2.out", immediateRender: false }, 0);
        popIn(p2, V(1), 7); popIn(p3, V(2), -2);
        TL.to(p1, { x: 24, y: -22, rotation: -8, duration: 0.4, ease: "back.out(1.6)" }, V(2) + 0.05);
        TL.to(p2, { x: -30, y: -18, rotation: 11, duration: 0.4, ease: "back.out(1.6)" }, V(2) + 0.05);
        TL.to(p3, { scaleX: 1.07, scaleY: 0.92, duration: 0.08, ease: "power2.out" }, V(2) + 0.14); TL.to(p3, { scaleX: 1, scaleY: 1, duration: 0.4, ease: "back.out(2)" }, V(2) + 0.22);
        // the needle already trembles on the heavy side
        TL.to(needle, { rotation: -40, duration: 0.6, ease: "back.out(1.6)" }, 0.2);
        // pills fly out together on a curve (one move), the phone line arrives
        [[p1, 0, 320, -620, 18], [p2, 0.02, -260, -560, -16], [p3, 0.04, 360, -700, 10]].forEach(([p, dl, x, y, r]) => TL.to(p, { x: `+=${x}`, y: `+=${y}`, rotation: r, opacity: 0, duration: 0.4, ease: "power2.in" }, V(3) - 0.12 + dl));

        // ═══ B1b «كان يحط على جوالك» connector + tag with a drawn arrow to the phone ═══
        const con = el("div", "abs ar px", world, { right: "120px", top: "600px", fontSize: "54px", color: GREY }, "كان يحط على");
        blurIn(con, V(3));
        const tag = el("div", "pill", world, { fontSize: "112px", background: K, color: L, padding: "0 44px 12px" }, "جوالك");
        fit(tag, 380);
        const tagR = (() => { const r = tag.getBoundingClientRect(); tag.style.left = (960 - r.width) + "px"; tag.style.top = "690px"; return tag.getBoundingClientRect(); })();
        gsap.set(tag, { x: 600, rotation: 10, opacity: 0 }); TL.set(tag, { opacity: 1 }, V(6) - 0.2);
        TL.to(tag, { motionPath: { path: [{ x: 260, y: -60 }, { x: 0, y: 0 }], curviness: 1.4 }, rotation: -3, duration: 0.42, ease: "power3.out" }, V(6) - 0.2);
        const arrow = el("div", "abs", world, { left: "448px", top: (690 + tagR.height / 2 - 20) + "px", width: (tagR.left - 448 - 18) + "px", height: "40px" },
          `<svg width="100%" height="40" viewBox="0 0 200 40" preserveAspectRatio="none"><path d="M196 20 H14" stroke="#121416" stroke-width="7" stroke-linecap="round"/></svg>`);
        const ahead = el("div", "abs", world, { left: "440px", top: (690 + tagR.height / 2 - 22) + "px", width: "44px", height: "44px" }, `<svg viewBox="0 0 44 44" width="44" height="44"><path d="M30 6 L8 22 L30 38" fill="none" stroke="#121416" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
        gsap.set(arrow, { scaleX: 0, transformOrigin: "100% 50%" }); gsap.set(ahead, { opacity: 0, x: 40 });
        TL.to(arrow, { scaleX: 1, duration: 0.22, ease: "power3.out" }, V(6) + 0.18);
        TL.to(ahead, { opacity: 1, x: 0, duration: 0.2, ease: "power3.out" }, V(6) + 0.3);
        gsap.set(ph, { transformOrigin: "50% 100%" });
        TL.fromTo(ph, { scale: 1 }, { scale: 1.03, duration: 0.14, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false }, V(6) + 0.3);

        // ═══ B1c «حمل ما تشوفه.» ghost files drop onto the phone; it sinks, the needle swings ═══
        const mkFile = (parent, x, y, kind, ghost) => {
          const f = el("div", "file", parent, { left: x + "px", top: y + "px" });
          const b = el("div", "body", f, ghost ? { border: "5px dashed #121416", background: "rgba(240,241,242,0.35)" } : { background: K, boxShadow: "0 16px 30px rgba(18,20,22,0.3)" });
          if (kind === "js") el("div", "lbl", f, { color: ghost ? K : G }, "JS");
          else el("div", "abs", f, { left: "34px", top: "44px", width: "54px", height: "62px" }, `<svg viewBox="0 0 54 62" width="54" height="62"><path d="M6 4 L50 31 L6 58 Z" fill="${ghost ? "none" : G}" stroke="${ghost ? K : G}" stroke-width="6" stroke-linejoin="round"/></svg>`);
          return f;
        };
        const gJ = mkFile(sink, 152, 410, "js", true), gV = mkFile(sink, 292, 410, "mp4", true);
        const sJ = mkFile(sink, 152, 410, "js", false), sV = mkFile(sink, 292, 410, "mp4", false);
        gsap.set([sJ, sV], { opacity: 0 }); gsap.set(gJ, { rotation: -6 }); gsap.set(gV, { rotation: 5 });
        [[gJ, 0], [gV, 0.1]].forEach(([g, dl]) => { gsap.set(g, { y: -300, opacity: 0 }); TL.to(g, { opacity: 1, duration: 0.12 }, V(7) - 0.28 + dl); TL.to(g, { y: 0, duration: 0.3, ease: "power2.in" }, V(7) - 0.28 + dl); });
        TL.to(sink, { y: 26, duration: 0.1, ease: "power2.out" }, V(7) + 0.04); TL.to(sink, { y: 20, duration: 0.4, ease: "back.out(2)" }, V(7) + 0.14);
        TL.to(ph, { scaleY: 0.96, duration: 0.08 }, V(7) + 0.04); TL.to(ph, { scaleY: 1, duration: 0.35, ease: "back.out(2.4)" }, V(7) + 0.12);
        TL.to(needle, { rotation: 58, duration: 0.6, ease: "back.out(1.8)" }, V(7) + 0.04);
        const haml = el("div", "abs ar", world, { right: "120px", top: "830px", fontSize: "250px", color: K, transformOrigin: "100% 100%" }, "حمل"); fit(haml, 450);
        gsap.set(haml, { y: -260, opacity: 0 }); TL.to(haml, { opacity: 1, duration: 0.1 }, V(7) - 0.2);
        TL.to(haml, { y: 0, duration: 0.24, ease: "power2.in" }, V(7) - 0.2);
        TL.to(haml, { scaleY: 0.86, scaleX: 1.06, duration: 0.07 }, V(7) + 0.04); TL.to(haml, { scaleY: 1, scaleX: 1, duration: 0.36, ease: "back.out(2.4)" }, V(7) + 0.11);
        const tshf = el("div", "abs ar px", world, { right: "124px", top: "1050px", fontSize: "56px", color: K, display: "flex", alignItems: "center", gap: "16px" },
          `<svg viewBox="0 0 64 44" width="64" height="44"><path d="M4 22 Q32 -6 60 22 Q32 50 4 22 Z" fill="none" stroke="#121416" stroke-width="5"/><circle cx="32" cy="22" r="8" fill="#121416"/><path d="M8 40 L56 4" stroke="#00DB33" stroke-width="6" stroke-linecap="round"/></svg><span>ما تشوفه.</span>`);
        blurIn(tshf, V(8));
        // the ghosts breathe (invisible weight)
        [gJ, gV].forEach((g, k) => TL.to(g, { opacity: 0.55, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 1 }, V(9) + k * 0.1));

        // ═══ cursor (the recurring thread) ═══
        gsap.set(cur, { x: 1100, y: 1560 });
        const ripple = (x, y, t, col = G) => { const r = el("div", "ripple", stage, { left: x + "px", top: y + "px", borderColor: col, zIndex: 49 }); TL.fromTo(r, { opacity: 1, scale: 0.25 }, { opacity: 0, scale: 1.5, duration: 0.45, ease: "expo.out", immediateRender: false }, t); };
        const press = t => { TL.to(cur, { scale: 0.78, duration: 0.06, ease: "power2.out" }, t - 0.06); TL.to(cur, { scale: 1, duration: 0.25, ease: "back.out(2)" }, t); };
        const camPos = (e, t) => { TL.seek(t); const r = e.getBoundingClientRect(); TL.seek(0); return r; };

        // ═══ B2 «ملف الجافاسكربت لحاله، فوق الاثنين ميجا.» click the ghost -> it is revealed and a clone flies into a card ═══
        exitUp([con, tag, arrow, ahead, haml, tshf], V(10) - 0.3);
        const mkCard = (top, latin, unit) => {
          const c = el("div", "card", world, { left: "470px", top: top + "px", width: "490px", height: "300px", zIndex: 6 });
          const t = el("div", "abs ar px", c, { right: "36px", top: "26px", fontSize: "42px", color: L }, "");
          el("div", "abs", c, { right: "36px", top: "84px", fontFamily: '"InterX"', fontWeight: "700", fontSize: "26px", color: GREY, direction: "ltr" }, latin);
          const row = el("div", "abs ar", c, { right: "36px", top: "112px", display: "flex", alignItems: "baseline", gap: "18px" });
          const num = el("div", "", row, { fontSize: "124px", color: G, lineHeight: "1.1" }, "٠");
          const un = el("div", "", row, { fontSize: "76px", color: L, lineHeight: "1.1", transformOrigin: "100% 70%" }, unit);
          const tr = el("div", "track", c, { left: "36px", right: "36px", top: "250px", height: "20px" });
          const fl = el("div", "fillb", tr); gsap.set(fl, { scaleX: 0 }); gsap.set(num, { opacity: 0 }); gsap.set(un, { opacity: 0, scale: 2.2 });
          gsap.set(c, { clipPath: "inset(0px 0px 0px 100% round 40px)" });
          return { c, t, num, un, fl };
        };
        const clones = [];
        const flyClone = (g, kind, t0, tx, ty) => {
          const f = mkFile(world, 0, 0, kind, false); f.style.zIndex = 7;
          const r = camPos(g, t0); gsap.set(f, { x: r.left, y: r.top, opacity: 0, rotation: g === gJ ? -6 : 5 });
          TL.set(f, { opacity: 1 }, t0);
          clones.push(f);
          TL.to(f, { motionPath: { path: [{ x: (r.left + tx) / 2 + 40, y: Math.min(r.top, ty) - 220 }, { x: tx, y: ty }], curviness: 1.4 }, rotation: 0, scale: 0.8, duration: 0.5, ease: "power3.inOut" }, t0);
          return f;
        };
        const reveal = (g, s, t) => { TL.to(s, { opacity: 1, duration: 0.16 }, t); TL.to(g, { opacity: 0, duration: 0.16 }, t); TL.fromTo(s, { scale: 1.12 }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, t); gsap.set(s, { rotation: g === gJ ? -6 : 5 }); };
        // card J
        const cJ = mkCard(470, "JavaScript", "ميجا");
        const CK1 = V(10) + 0.02;
        { const r = camPos(gJ, CK1); TL.to(cur, { x: r.left + 70, y: r.top + 90, duration: 0.5, ease: "power3.out" }, CK1 - 0.52); press(CK1); ripple(r.left + 60, r.top + 75, CK1); }
        reveal(gJ, sJ, CK1 + 0.02);
        flyClone(gJ, "js", CK1 + 0.04, 470 + 2, 470 + 2);
        TL.to(cJ.c, { clipPath: "inset(0px 0px 0px 0% round 40px)", duration: 0.5, ease: "expo.inOut" }, CK1 + 0.2);
        typeOn(cJ.t, "ملف الجافاسكربت", V(10) + 0.3, W(11));
        const lhl = el("div", "pill", cJ.c, { right: "40px", top: "136px", fontSize: "72px", background: G, color: K, padding: "0 30px 10px" }, "لحاله،");
        popIn(lhl, V(12), -4);
        TL.to(lhl, { x: -260, y: -30, rotation: -14, opacity: 0, duration: 0.32, ease: "power2.in" }, V(13) - 0.12);
        TL.set(cJ.num, { opacity: 1 }, V(13));
        counter(cJ.num, 0, 2.2, V(13), W(14), one);
        TL.to(cJ.fl, { scaleX: 1, duration: W(14) - V(13) + 0.1, ease: "expo.out" }, V(13));
        TL.to(cJ.un, { opacity: 1, scale: 1, duration: 0.22, ease: "power4.out" }, V(15));
        TL.fromTo(cJ.num, { scaleX: 1.2, scaleY: 1.28 }, { scaleX: 1, scaleY: 1, duration: 0.55, ease: "elastic.out(1, 0.5)", immediateRender: false }, V(15) + 0.03);
        TL.to(cur, { x: 700, y: 820, duration: 0.5, ease: "power2.inOut" }, CK1 + 0.5);

        // ═══ B3 «وفيديو الخلفية، اثنين ميجا بعد.» ═══
        const cV = mkCard(810, "background video · MP4", "ميجا");
        const CK2 = V(16) + 0.02;
        { const r = camPos(gV, CK2); TL.to(cur, { x: r.left + 70, y: r.top + 90, duration: 0.45, ease: "power3.inOut" }, CK2 - 0.47); press(CK2); ripple(r.left + 60, r.top + 75, CK2); }
        reveal(gV, sV, CK2 + 0.02);
        flyClone(gV, "mp4", CK2 + 0.04, 470 + 2, 810 + 2);
        TL.to(cV.c, { clipPath: "inset(0px 0px 0px 0% round 40px)", duration: 0.5, ease: "expo.inOut" }, CK2 + 0.2);
        typeOn(cV.t, "فيديو الخلفية", V(16) + 0.2, W(17));
        TL.set(cV.num, { opacity: 1 }, V(18));
        counter(cV.num, 0, 2, V(18), W(18) + 0.04, one);
        TL.to(cV.fl, { scaleX: 2 / 2.2, duration: 0.4, ease: "expo.out" }, V(18));
        TL.to(cV.un, { opacity: 1, scale: 1, duration: 0.22, ease: "power4.out" }, V(19));
        TL.fromTo(cV.num, { scaleX: 1.2, scaleY: 1.28 }, { scaleX: 1, scaleY: 1, duration: 0.55, ease: "elastic.out(1, 0.5)", immediateRender: false }, V(19) + 0.03);
        const bad = el("div", "pill px", cV.c, { left: "16px", top: "150px", fontSize: "42px", background: L, color: K, padding: "2px 24px 8px" }, "بعد.");
        popIn(bad, V(20), 4);
        TL.to(needle, { rotation: 64, duration: 0.3, ease: "back.out(2)" }, V(19)); TL.to(needle, { rotation: 58, duration: 0.5, ease: "sine.inOut" }, V(19) + 0.3);
        TL.to(cur, { x: 1000, y: 1300, duration: 0.6, ease: "power2.inOut" }, CK2 + 0.5);

        // ═══ B4 «وش يعني هذا؟» smear slam + highlight wipe ═══
        const q = el("div", "abs ar", world, { right: "120px", top: "272px", fontSize: "130px", color: K, display: "flex", alignItems: "center", gap: "26px", zIndex: 6 });
        const qW = el("span", "", q, { display: "inline-block" }, "وش"), qY = el("span", "", q, { display: "inline-block" }, "يعني");
        const qH = el("span", "", q, { display: "inline-block", position: "relative", padding: "0 22px 10px" });
        const qBox = el("span", "abs", qH, { left: "0", right: "0", top: "14%", bottom: "8%", background: G, borderRadius: "24px", transformOrigin: "100% 50%" }); el("span", "", qH, { position: "relative" }, "هذا؟");
        fit(q, 820);
        gsap.set(qBox, { scaleX: 0 });
        slamIn(qW, V(21)); blurIn(qY, V(22), 0.3); blurIn(qH, V(23), 0.3);
        TL.to(qBox, { scaleX: 1, duration: 0.16, ease: "expo.out" }, V(23) + 0.06);
        // scene change as one move: cards + question leave right on a curve
        const OUT4 = V(24) - 0.12;
        [[cJ.c, 0], [cV.c, 0.04]].forEach(([c, dl]) => TL.to(c, { motionPath: { path: [{ x: 120, y: -60 }, { x: 900, y: 200 }], curviness: 1.3 }, rotation: 16, duration: 0.4, ease: "power3.in" }, OUT4 + dl));
        TL.to(clones, { x: "+=900", y: "+=200", rotation: 16, opacity: 0, duration: 0.4, ease: "power3.in" }, OUT4);
        exitUp([q], OUT4);
        // camera pushes in on the phone for the whole beat (scale about x=300 == scale about 540 plus x shift 240*(s-1))
        TL.to(cam, { scale: 1.1, x: 24, duration: 12.3 - OUT4, ease: "sine.inOut" }, OUT4);

        // «جوالك لازم ينزل كل هذا،» right column; the files slide down INTO the screen (downloading)
        const b4a = el("div", "abs ar px", world, { right: "120px", top: "470px", fontSize: "58px", color: GREY }, "جوالك لازم");
        riseIn(b4a, V(24));
        const nzl = el("div", "abs ar", world, { right: "120px", top: "520px", fontSize: "230px", color: G, transformOrigin: "100% 50%" }, "ينزل"); fit(nzl, 430);
        const dl = el("div", "abs", world, { right: "130px", top: "860px", width: "90px", height: "100px" }, `<svg viewBox="0 0 90 100" width="90" height="100"><path d="M45 8 V70 M18 46 L45 74 L72 46" fill="none" stroke="#121416" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 92 H80" stroke="#121416" stroke-width="10" stroke-linecap="round"/></svg>`);
        zoomOut(nzl, V(26), 2.4); popIn(dl, V(26) + 0.2);
        TL.to(dl, { y: 14, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 3 }, V(26) + 0.5);
        const klh = el("div", "abs ar px", world, { right: "240px", top: "880px", fontSize: "58px", color: K }, "كل هذا،");
        blurIn(klh, V(27));
        [[sJ, 0], [sV, 0.12]].forEach(([s, d]) => { TL.to(s, { y: 200, scale: 0.6, duration: 0.42, ease: "power2.in" }, V(27) + d); TL.set(s, { opacity: 0 }, V(27) + d + 0.4); });
        TL.to(spin, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, V(26));
        TL.to(play, { opacity: 0, duration: 0.2 }, V(26));
        TL.to(spin, { rotation: 360 * 3.6, duration: 12.36 - V(26), ease: "none" }, V(26));
        TL.to(pfill, { scaleX: 0.06, duration: 12.3 - V(26), ease: "power1.out" }, V(26) + 0.2);
        // «قبل ما الصفحة تتحرك.» push-through; the page is frozen, impatient taps do nothing
        exitUp([b4a, nzl, dl, klh], V(29) - 0.3);
        const qbl = el("div", "abs ar px", world, { right: "120px", top: "560px", fontSize: "58px", color: GREY }, "قبل ما الصفحة");
        riseIn(qbl, V(29));
        const ttr = el("div", "abs ar", world, { right: "120px", top: "620px", fontSize: "200px", color: K, transformOrigin: "50% 80%" }, "تتحرك."); fit(ttr, 440);
        riseIn(ttr, V(32) - 0.06, 0.4);
        [0, 1, 2, 3].forEach(k => TL.to(ttr, { rotation: k % 2 ? 3 : -3, x: k % 2 ? 8 : -8, duration: 0.07, ease: "sine.inOut" }, V(32) + 0.36 + k * 0.07));
        TL.to(ttr, { rotation: 0, x: 0, duration: 0.12 }, V(32) + 0.64);
        const TAP = V(31);
        { const r = camPos(blocks[0], TAP); const tx = r.left + 60, ty = r.top + 40;
          TL.to(cur, { x: tx, y: ty, duration: 0.45, ease: "power3.inOut" }, V(28)); press(TAP); ripple(tx, ty, TAP, K); press(TAP + 0.3); ripple(tx, ty, TAP + 0.3, K); }
        TL.to(cur, { x: 1100, y: 1500, duration: 0.45, ease: "power2.in" }, 12.0);

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
