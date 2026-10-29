<!DOCTYPE html>
<html lang="ar" data-resolution="portrait">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920">
    <title>FortuneCode — 3 seconds (Page Speed)</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script type="importmap">{ "imports": { "three": "https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js", "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.181.2/examples/jsm/" } }</script>
    <style>
      @font-face { font-family: "Plex Arabic"; font-weight: 500; src: url("assets/fonts/plex-ar-500.woff2") format("woff2"); unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF, U+200C-200F; }
      @font-face { font-family: "Plex Arabic"; font-weight: 700; src: url("assets/fonts/plex-ar-700.woff2") format("woff2"); unicode-range: U+0600-06FF, U+0750-077F, U+FB50-FDFF, U+FE70-FEFF, U+200C-200F; }
      @font-face { font-family: "Plex Arabic"; font-weight: 700; src: url("assets/fonts/plex-lat-700.woff2") format("woff2"); unicode-range: U+0000-00FF, U+2000-206F; }
      @font-face { font-family: "Inter"; font-weight: 700; src: url("assets/fonts/inter-lat-700.woff2") format("woff2"); }
      @font-face { font-family: "Inter"; font-weight: 800; src: url("assets/fonts/inter-lat-800.woff2") format("woff2"); }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: #121416; }
      #main { position: relative; width: 100%; height: 100%; overflow: hidden; font-family: "Plex Arabic", sans-serif; color: #F0F1F2; }
      .clip { position: absolute; inset: 0; }
      #bg { position: absolute; inset: 0; background: #121416; }
      #curve { position: absolute; right: -380px; top: -260px; width: 1100px; opacity: 0.07; }
      #gl { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
      .big { position: absolute; left: 0; width: 1080px; text-align: center; font-family: "Inter", sans-serif; font-weight: 800; letter-spacing: -0.045em; opacity: 0; white-space: nowrap; direction: ltr; }
      #bigBack { top: 150px; font-size: 900px; line-height: 1; color: #00DB33; }
      .num { top: 330px; font-size: 330px; line-height: 1; color: #F0F1F2; }
      .num small { font-size: 0.45em; color: #00DB33; letter-spacing: -0.02em; }
      #ps { top: 420px; font-size: 210px; line-height: 0.95; color: #F0F1F2; }
      #ps b { display: block; color: #00DB33; }
      #ui { position: absolute; inset: 0; }
      #comment { position: absolute; left: 140px; width: 800px; top: 760px; height: 150px; border-radius: 36px; background: #1c2023; border: 2px solid rgba(240, 241, 242, 0.12); display: flex; align-items: center; gap: 26px; padding: 0 34px; direction: rtl; opacity: 0; box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45); }
      #comment .av { width: 84px; height: 84px; border-radius: 50%; background: linear-gradient(135deg, #00DB33, #006A39); flex: none; }
      #comment .who { font-size: 30px; color: #BBBDBF; font-weight: 500; }
      #comment .txt { font-size: 60px; font-weight: 700; color: #F0F1F2; line-height: 1.1; }
      #comment .heart { margin-right: auto; width: 56px; height: 56px; }
      #strike { position: absolute; left: 330px; top: 620px; width: 420px; height: 12px; border-radius: 6px; background: #BBBDBF; transform-origin: right center; transform: rotate(-24deg) scaleX(0); }
      #logo { position: absolute; left: 50%; top: 120px; width: 300px; margin-left: -150px; opacity: 0; }
      #scrim { position: absolute; left: 0; right: 0; top: 1090px; height: 420px; background: linear-gradient(to bottom, rgba(18, 20, 22, 0), rgba(18, 20, 22, 0.85) 45%, rgba(18, 20, 22, 0.85) 80%, rgba(18, 20, 22, 0)); }
      #cap { position: absolute; left: 60px; width: 960px; top: 1180px; height: 260px; direction: rtl; }
      .chunk { position: absolute; inset: 0; display: flex; flex-wrap: wrap; justify-content: center; align-content: center; text-align: center; font-size: 78px; font-weight: 700; line-height: 1.3; opacity: 0; color: #F0F1F2; }
      .chunk span { display: inline-block; margin: 0 0.12em; opacity: 0; }
      .chunk .hl { color: #00DB33; }
      .en { font-family: "Inter", sans-serif; font-weight: 800; letter-spacing: -0.02em; }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="__D__" data-width="1080" data-height="1920">
      <div id="stage" class="clip" data-start="0" data-duration="__D__" data-track-index="0">
        <div id="bg"><img id="curve" src="assets/img/mark.svg" alt=""></div>
        <div id="bigBack" class="big">3</div>
        <canvas id="gl" width="1080" height="1920"></canvas>
        <div id="n10k" class="big num">0<small>+</small></div>
        <div id="n53" class="big num">0<small>%</small></div>
        <div id="n01" class="big num">1.0<small>s</small></div>
        <div id="n84" class="big num"><small>+</small>0.0<small>%</small></div>
        <div id="ps" class="big">Page<b>Speed</b></div>
        <div id="ui">
          <div id="strike"></div>
          <div id="comment"><div class="av"></div><div><div class="who">@client</div><div class="txt">سرعة</div></div>
            <svg class="heart" viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-9.6-9.2C1 8.6 3 5 6.6 5c2 0 3.6 1.1 4.4 2.6C11.8 6.1 13.4 5 15.4 5 19 5 21 8.6 19.6 11.8 17.5 16.4 12 21 12 21z" fill="#00DB33" /></svg></div>
        </div>
        <img id="logo" src="assets/img/logo-white.png" alt="">
        <div id="scrim"></div>
        <div id="cap"></div>
      </div>
      <audio id="mix" src="assets/audio/mix.mp3" data-start="0" data-duration="__D__" data-track-index="2" data-volume="1"></audio>
    </div>

    <script type="module">
      import * as THREE from "three";
      import { FBXLoader } from "three/addons/loaders/FBXLoader.js";
      import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
      import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
      import { recolor, brandMaterial } from "./lib/brand-models.js";
      const CAPS = /*CAPS*/[];
      const D = __D__, SP = 1.12, T = (s) => s / SP; // times below are in the original (unsped) voice-over seconds
      window.__timelines = window.__timelines || {};
      const $ = (q) => document.querySelector(q);

      // per-model colour fixes: kind of each part by its original colour -> brand kind
      const SWAP = (map) => (mat) => { const hsl = {}; mat.color.getHSL(hsl); const k = hsl.s > 0.3 && hsl.l > 0.15 && hsl.l < 0.85 ? "green" : hsl.l > 0.55 ? "light" : "dark"; return map[k] ?? k; };
      const FIX = {
        flash: () => "green", puzzle: () => "green", chat: SWAP({ dark: "light" }), picture: SWAP({ dark: "light", light: "green" }),
        boy: SWAP({ dark: "green" }), dollar: SWAP({ dark: "green" }), target: SWAP({ dark: "green" }), "trash-can": SWAP({ dark: "light" }),
        zoom: SWAP({ green: "light", light: "green" }), setting: () => "light", computer: SWAP({}), mobile: SWAP({}),
      };

      async function build() {
        await document.fonts.ready;
        await Promise.all(["700 40px \"Plex Arabic\"", "800 40px Inter", "700 40px Inter"].map((f) => document.fonts.load(f, "سرعة 10,000%")));
        const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

        // ── renderer: 1 unit = 100 px on z = 0 ──
        const FOV = 35, CZ = 9.6 / Math.tan((FOV / 2) * Math.PI / 180);
        const renderer = new THREE.WebGLRenderer({ canvas: $("#gl"), antialias: true, alpha: true, preserveDrawingBuffer: true });
        renderer.setSize(1080, 1920, false); renderer.setPixelRatio(1);
        renderer.outputColorSpace = THREE.SRGBColorSpace; renderer.toneMapping = THREE.NeutralToneMapping;
        renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        const scene = new THREE.Scene();
        scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture; scene.environmentIntensity = 0.55;
        const camera = new THREE.PerspectiveCamera(FOV, 1080 / 1920, 0.1, 400);
        const key = new THREE.DirectionalLight(0xffffff, 1.7); key.position.set(-6, 10, 14); key.castShadow = true;
        key.shadow.mapSize.set(2048, 2048); Object.assign(key.shadow.camera, { left: -12, right: 12, top: 14, bottom: -14, near: 1, far: 60 }); scene.add(key);
        const rim = new THREE.DirectionalLight(0x00DB33, 1.4); rim.position.set(8, 3, -6); scene.add(rim);
        const back = new THREE.DirectionalLight(0xffffff, 0.6); back.position.set(-4, -2, -8); scene.add(back);
        const X = (px) => (px - 540) / 100, Y = (py) => (960 - py) / 100;

        // ── models: load, recolour, normalise to 1 unit ──
        const loader = new FBXLoader(), TPL = {};
        const NEED = ["clock", "boy", "bell", "tea-cup", "mobile", "flash", "zoom", "chart", "bag", "credit-card", "computer", "picture", "puzzle", "setting", "rocket", "chat", "tick"];
        await Promise.all(NEED.map(async (n) => {
          const obj = await loader.loadAsync(`assets/models/${n}.fbx`);
          recolor(obj, FIX[n]);
          const box = new THREE.Box3().setFromObject(obj), size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
          const wrap = new THREE.Group(); obj.position.sub(c); wrap.add(obj); wrap.scale.setScalar(1 / Math.max(size.x, size.y, size.z));
          TPL[n] = { obj: wrap, size: size.clone().divideScalar(Math.max(size.x, size.y, size.z)) };
        }));
        const insts = [];
        /** a placed copy of a model; st is what the timeline animates (x/y in px, z in units, s in units) */
        const inst = (name, st) => {
          const g = TPL[name].obj.clone(true);
          g.traverse((m) => { if (m.isMesh) m.material = Array.isArray(m.material) ? m.material.map((x) => x.clone()) : m.material.clone(); });
          const holder = new THREE.Group(); holder.add(g); scene.add(holder);
          const it = { g: holder, name, st: Object.assign({ x: 540, y: 700, z: 0, s: 3, sx: 1, sy: 1, rx: 0, ry: 0, rz: 0, o: 0, float: 0, spin: 0, ph: insts.length }, st) };
          insts.push(it); return it;
        };
        const setOpacity = (obj, o) => obj.traverse((m) => { if (!m.isMesh) return; (Array.isArray(m.material) ? m.material : [m.material]).forEach((mt) => { mt.transparent = o < 0.999; mt.opacity = o; mt.depthWrite = o > 0.5; }); });

        // floor that catches shadows (only visible as shadow)
        const floor = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.ShadowMaterial({ opacity: 0.35 }));
        floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true; scene.add(floor);
        const FL = { y: 1000 };

        // a simple counter slab for the restaurant analogy
        const counter = new THREE.Mesh(new RoundedBoxGeometry(6.2, 1.5, 2.2, 6, 0.2), brandMaterial("dark")); counter.castShadow = counter.receiveShadow = true; scene.add(counter);
        const counter2 = new THREE.Mesh(new RoundedBoxGeometry(6.2, 1.5, 2.2, 6, 0.2), brandMaterial("green")); counter2.castShadow = true; scene.add(counter2);
        const CT = { x: 470, y: 900, o: 0 }, CT2 = { x: 1500, y: 900, o: 0 };

        // ── live screen textures (phone loading page, fast page on the computer) ──
        const mkBoard = (w, h) => { const c = document.createElement("canvas"); c.width = w; c.height = h; const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8; return { c, g: c.getContext("2d"), t }; };
        const rr = (g, x, y, w, h, r) => { g.beginPath(); g.roundRect(x, y, w, h, r); };
        const phoneScr = mkBoard(600, 1240);
        const drawPhone = (p, spin) => {
          const g = phoneScr.g; g.fillStyle = "#F0F1F2"; g.fillRect(0, 0, 600, 1240);
          g.fillStyle = "#dfe1e3"; rr(g, 40, 90, 520, 56, 28); g.fill();
          g.fillStyle = "#BBBDBF"; g.font = '600 26px Inter'; g.fillText("yourstore.com", 80, 128);
          // skeleton page, still loading
          g.fillStyle = "#e3e5e7"; rr(g, 40, 190, 520, 300, 28); g.fill();
          [[40, 530, 380], [40, 580, 300], [40, 630, 440]].forEach(([x, y, w]) => { rr(g, x, y, w, 26, 13); g.fill(); });
          rr(g, 40, 700, 250, 250, 24); g.fill(); rr(g, 310, 700, 250, 250, 24); g.fill();
          // spinner
          g.save(); g.translate(300, 340); g.rotate(spin); g.strokeStyle = "#BBBDBF"; g.lineWidth = 14; g.lineCap = "round"; g.beginPath(); g.arc(0, 0, 56, 0, Math.PI * 1.4); g.stroke(); g.restore();
          // progress bar + percent
          g.fillStyle = "#dfe1e3"; rr(g, 40, 1040, 520, 26, 13); g.fill();
          g.fillStyle = "#00DB33"; rr(g, 40, 1040, Math.max(26, 520 * p), 26, 13); g.fill();
          g.fillStyle = "#121416"; g.font = '800 64px Inter'; g.textAlign = "center"; g.fillText(Math.round(p * 100) + "%", 300, 1160); g.textAlign = "left";
          phoneScr.t.needsUpdate = true;
        };
        const pcScr = mkBoard(1280, 800);
        const drawPc = (p) => {
          const g = pcScr.g; g.fillStyle = "#121416"; g.fillRect(0, 0, 1280, 800);
          g.globalAlpha = Math.min(1, p * 1.5);
          g.fillStyle = "#1c2023"; g.fillRect(0, 0, 1280, 90);
          g.fillStyle = "#00DB33"; rr(g, 60, 28, 130, 34, 17); g.fill();
          g.fillStyle = "#F0F1F2"; g.font = '800 92px Inter'; g.fillText("Fast.", 80, 270);
          g.fillStyle = "#BBBDBF"; [[80, 320, 620], [80, 370, 520]].forEach(([x, y, w]) => { rr(g, x, y, w, 24, 12); g.fill(); });
          g.fillStyle = "#00DB33"; rr(g, 80, 440, 300, 90, 45); g.fill();
          g.fillStyle = "#006A39"; rr(g, 760, 150, 440, 560, 40); g.fill();
          g.globalAlpha = 1; pcScr.t.needsUpdate = true;
        };
        const screenPlane = (tex, w, h) => { const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false, transparent: true })); return m; };

        // ── cast ──
        const clock = inst("clock", { x: 520, y: 640, s: 5.2, o: 1, float: 10 });
        const boys = Array.from({ length: 6 }, (_, i) => inst("boy", { x: 230 + (i % 3) * 230, y: 860 + Math.floor(i / 3) * 200, s: 1.7, z: Math.floor(i / 3) * 1.2 }));
        const cust = inst("boy", { x: 260, y: 700, s: 2.6, z: 1.5 });
        const bell = inst("bell", { x: 620, y: 760, s: 1.6, z: 1.6 });
        const tea = inst("tea-cup", { x: 340, y: 790, s: 1.4, z: 1.4 });
        const phone = inst("mobile", { x: 520, y: 640, s: 7.2 });
        { const sz = TPL.mobile.size; const p = screenPlane(phoneScr.t, sz.x * 0.86 * 1, sz.y * 0.92); p.position.z = sz.z / 2 + 0.004; phone.g.add(p); }
        const flash = inst("flash", { x: 540, y: 600, s: 3, z: -30 });
        const zoom = inst("zoom", { x: 300, y: 560, s: 3.4, z: 3 });
        const crowd = Array.from({ length: 10 }, (_, i) => inst("boy", { x: 180 + (i % 5) * 180, y: 900 + Math.floor(i / 5) * 170, s: 1.35, z: Math.floor(i / 5) * 1 }));
        const chart = inst("chart", { x: 520, y: 640, s: 4.6 });
        const bag = inst("bag", { x: 380, y: 860, s: 2.6, z: 1 });
        const card = inst("credit-card", { x: 720, y: 820, s: 2.2, z: 1.6, rz: -0.3 });
        const pc = inst("computer", { x: 520, y: 660, s: 6.2 });
        { const sz = TPL.computer.size; const p = screenPlane(pcScr.t, sz.x * 0.86, sz.x * 0.86 * 0.56); p.position.set(0, sz.y * 0.13, sz.z / 2 + 0.004); pc.g.add(p); }
        const pics = [inst("picture", { x: 420, y: -300, s: 3.2, z: 1.5, rz: 0.2 }), inst("picture", { x: 660, y: -300, s: 2.4, z: 2.2, rz: -0.25 })];
        const puzz = Array.from({ length: 5 }, (_, i) => inst("puzzle", { x: 300 + i * 120, y: -200, s: 1.3, z: 1.5 + (i % 2) * 0.6, rz: hash(i) * 2 }));
        const wifi = inst("setting", { x: 540, y: 620, s: 3.6, z: 0.5 });
        const rocket = inst("rocket", { x: 900, y: 1500, s: 3.2, z: 2, rz: -0.6 });
        const chat = inst("chat", { x: 760, y: 470, s: 2.6, z: 1 });
        const tick = inst("tick", { x: 540, y: 540, s: 3.2, z: 1 });

        // ── animated state ──
        const cam = { x: 0, y: 0, z: CZ, rx: 0, ry: 0, rz: 0 };
        const W = { bg: "#121416" }, P = { p: 0.08, spin: 0 }, PC = { p: 0 };
        const tl = gsap.timeline({ paused: true, onUpdate: () => draw() });
        tl.to({}, { duration: D }, 0);
        const at = (s) => T(s);
        const world = (t, color, d = 0.18) => tl.to(W, { bg: color, duration: d, ease: "none" }, at(t));
        const show = (it, t, from, to, d = 0.5, ease = "back.out(1.6)") => tl.fromTo(it.st, Object.assign({ o: 0 }, from), Object.assign({ o: 1, duration: d, ease, immediateRender: false }, to), at(t));
        const hide = (it, t, to = {}, d = 0.3, ease = "power2.in") => tl.to(it.st, Object.assign({ o: 0, duration: d, ease }, to), at(t));
        const big = (sel, t0, t1) => { tl.fromTo(sel, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(2)", immediateRender: false }, at(t0)); tl.to(sel, { opacity: 0, scale: 1.15, duration: 0.2, ease: "power2.in" }, at(t1)); };
        const count = (sel, t0, d, from, to, fmt) => { const o = { v: from }, el = $(sel); el.innerHTML = fmt(from); tl.fromTo(o, { v: from }, { v: to, duration: T(d), ease: "power2.out", immediateRender: false, onUpdate: () => { el.innerHTML = fmt(o.v); } }, at(t0)); };

        // S1 HOOK 0-1.0: the clock is on screen from frame 1, alarm ringing, a giant 3 behind it
        tl.set("#bigBack", { opacity: 0.16 }, 0);
        tl.fromTo(clock.st, { ry: 0.9, s: 4.4 }, { ry: 0, s: 5.2, duration: T(0.7), ease: "back.out(1.7)", immediateRender: true }, 0);
        tl.to(clock.st, { rz: 0.09, duration: 0.05, yoyo: true, repeat: 11, ease: "none" }, at(0.35));
        tl.fromTo(cam, { z: CZ + 3 }, { z: CZ, duration: T(1.0), ease: "power2.out", immediateRender: true }, 0);
        // S2 1.09-2.6: half your customers walk out
        tl.to(clock.st, { y: 380, s: 3.0, duration: T(0.45), ease: "power3.inOut" }, at(1.0));
        tl.to("#bigBack", { opacity: 0, duration: T(0.3) }, at(1.0));
        boys.forEach((b, i) => show(b, 1.1 + i * 0.05, { y: b.st.y + 120, s: 0.6 }, { y: b.st.y, s: 1.7 }, T(0.4)));
        [1, 3, 5].forEach((i, k) => { tl.to(boys[i].st, { x: 1500, ry: -1.2, rz: -0.2, duration: T(0.45), ease: "power3.in" }, at(1.88 + k * 0.08)); });
        tl.to(boys[3].st, { rz: Math.PI * 2, duration: T(0.45) }, at(1.96)); // micro-gag: one spins out
        [0, 2, 4].forEach((i) => tl.to(boys[i].st, { ry: 0.5, duration: T(0.3), yoyo: true, repeat: 1 }, at(2.1)));
        [clock, ...boys].forEach((b) => hide(b, 2.55, {}, T(0.15)));

        // S3 WORLD C 2.6-10.0: the restaurant
        world(2.6, "#F0F1F2");
        tl.set(CT, { o: 1 }, at(2.62)); tl.fromTo(CT, { y: 1250 }, { y: 900, duration: T(0.45), ease: "power3.out", immediateRender: false }, at(2.62));
        show(cust, 2.75, { x: -100 }, { x: 260 }, T(0.5), "power3.out");
        show(tea, 2.95, { s: 0.3 }, { s: 1.4 }, T(0.35));
        show(bell, 3.05, { s: 0.3 }, { s: 1.6 }, T(0.35));
        // 3.86: close on the bell, he taps it (micro-gag: tap tap tap, nobody)
        tl.to(cam, { x: 0.9, y: -1.0, z: CZ - 13, duration: T(0.5), ease: "power3.inOut" }, at(3.8));
        [4.35, 4.6, 4.85].forEach((t) => { tl.to(bell.st, { sy: 0.78, duration: 0.07, yoyo: true, repeat: 1, ease: "power2.out" }, at(t)); });
        // 5.09: pull back, the cashier side is empty
        tl.to(cam, { x: 2.2, y: 0, z: CZ - 4, ry: 0.12, duration: T(0.6), ease: "power3.inOut" }, at(5.05));
        tl.to(cust.st, { ry: 0.6, duration: T(0.4), yoyo: true, repeat: 1 }, at(5.6));
        // 6.5: how long would you wait? the clock drops in, a counter ticks
        tl.to(cam, { x: 0, y: 0, z: CZ - 1, ry: 0, duration: T(0.4), ease: "power3.inOut" }, at(6.45));
        show(clock, 6.5, { x: 820, y: 330, s: 0.5, z: 2 }, { s: 2.2 }, T(0.35));
        tl.to(clock.st, { rz: 0.08, duration: 0.05, yoyo: true, repeat: 15, ease: "none" }, at(7.0));
        tl.to(cust.st, { float: 6, duration: 0.1 }, at(6.5));
        // 8.48: he leaves for the place next door (whip to the right)
        tl.to(cust.st, { ry: -1.4, duration: T(0.25) }, at(8.45));
        tl.to(cust.st, { x: 1200, duration: T(0.7), ease: "power2.in" }, at(8.65));
        tl.set(CT2, { o: 1 }, at(8.5));
        tl.to(cam, { x: 7.0, duration: T(0.7), ease: "power3.inOut" }, at(8.9));
        tl.to(CT2, { x: 1250, duration: 0.01 }, at(8.5));
        [cust, tea, bell, clock].forEach((b) => hide(b, 9.9, {}, 0.12));
        tl.set(CT, { o: 0 }, at(9.95)); tl.set(CT2, { o: 0 }, at(9.95));

        // S4 WORLD A 10.0-11.5: your site is the same
        world(10.0, "#121416", 0.12);
        tl.set(cam, { x: 0, y: 0, z: CZ, ry: 0 }, at(10.0));
        show(phone, 10.0, { y: 1100, rx: 0.6, ry: -0.5 }, { y: 640, rx: 0, ry: -0.18 }, T(0.5), "power3.out");
        tl.to(P, { spin: 40, duration: T(16), ease: "none" }, at(10.0));
        tl.to(phone.st, { ry: 0.18, duration: T(1.5), ease: "sine.inOut" }, at(10.4));
        // S5 11.57-13.5: "Page Speed" full-screen type, a bolt flies through the camera
        hide(phone, 11.5, { s: 9 }, T(0.2));
        tl.fromTo("#ps", { opacity: 0, scale: 1.4 }, { opacity: 1, scale: 1, duration: T(0.3), ease: "power3.out", immediateRender: false }, at(12.7));
        tl.to("#ps", { opacity: 0, scale: 0.8, duration: T(0.2) }, at(14.0));
        show(flash, 11.6, { z: -40, rz: 0.3 }, { z: -6, rz: 0 }, T(0.6), "power2.out");
        tl.to(flash.st, { z: CZ + 2, duration: T(0.45), ease: "power3.in" }, at(13.3)); // zoom-through
        // S6 14.1-16.3: the page loads... and stalls at 99% (micro-gag)
        show(phone, 14.1, { s: 3, ry: 0.8 }, { s: 7.2, ry: -0.15 }, T(0.45), "back.out(1.4)");
        tl.fromTo(P, { p: 0.12 }, { p: 0.99, duration: T(1.5), ease: "power3.out", immediateRender: false }, at(14.3));
        tl.to(phone.st, { rz: 0.03, duration: 0.06, yoyo: true, repeat: 5 }, at(15.7));
        hide(phone, 16.25, { y: 1100 }, T(0.2));

        // S7 WORLD B 16.4-19.1: Google looked at 10,000+ sites
        world(16.35, "#006A39");
        show(zoom, 16.45, { x: -100, ry: 0.6 }, { x: 330, ry: 0 }, T(0.4), "power3.out");
        tl.to(zoom.st, { x: 760, y: 700, duration: T(1.4), ease: "sine.inOut" }, at(16.9));
        count("#n10k", 17.85, 1.0, 0, 10000, (v) => Math.round(v).toLocaleString("en-US") + "<small>+</small>");
        big("#n10k", 17.85, 19.05);
        tl.to(zoom.st, { y: 900, s: 2.2, duration: T(0.3) }, at(17.85));
        hide(zoom, 19.0, {}, T(0.15));
        // S8 19.1-22.0: 53% (full-screen counter), mobile visitors
        world(19.1, "#121416");
        count("#n53", 19.2, 1.2, 0, 53, (v) => Math.round(v) + "<small>%</small>");
        big("#n53", 19.12, 20.85);
        crowd.forEach((b, i) => show(b, 20.9 + i * 0.04, { y: b.st.y + 140, s: 0.5 }, { y: b.st.y - 260, s: 1.35 }, T(0.35)));
        tl.to(cam, { z: CZ - 2, duration: T(1.2), ease: "sine.inOut" }, at(20.9));
        // 22.08: they leave: 5 of 10 drop out of frame
        [0, 2, 4, 6, 8].forEach((i, k) => { tl.to(crowd[i].st, { y: 2400, rz: (k % 2 ? 1 : -1) * 0.8, duration: T(0.5), ease: "power3.in" }, at(22.1 + k * 0.06)); tl.set(crowd[i].st, { o: 0 }, at(22.75 + k * 0.06)); });
        show(clock, 23.5, { x: 540, y: 380, s: 0.5, z: 1, rz: 0 }, { s: 2.6 }, T(0.35));
        tl.to(clock.st, { rz: 0.1, duration: 0.05, yoyo: true, repeat: 9 }, at(24.0));
        [1, 3, 5, 7, 9].forEach((i) => hide(crowd[i], 24.95, {}, 0.12)); hide(clock, 24.95, {}, 0.12);
        tl.to(cam, { z: CZ, duration: 0.1 }, at(25.0));

        // S9 25.1-29.0: a second study, Deloitte: 0.1 s faster
        show(chart, 25.12, { y: 900, s: 1, ry: -0.8 }, { y: 640, s: 4.6, ry: -0.25 }, T(0.5));
        tl.to(chart.st, { ry: 0.3, duration: T(2.2), ease: "sine.inOut" }, at(25.6));
        hide(chart, 27.4, { s: 6 }, T(0.15));
        count("#n01", 27.45, 0.6, 1.0, 0.1, (v) => v.toFixed(1) + "<small>s</small>");
        big("#n01", 27.4, 29.2);
        // S10 29.28-33.0: buying up 8.4%
        show(bag, 29.3, { y: 1100, s: 0.8 }, { y: 760, s: 2.6 }, T(0.4));
        show(card, 29.6, { x: 1100, rz: -1 }, { x: 720, rz: -0.3 }, T(0.4));
        tl.to(bag.st, { y: 700, duration: T(0.25), yoyo: true, repeat: 1, ease: "power2.out" }, at(30.0));
        hide(bag, 30.75, { y: 1300 }, T(0.2)); hide(card, 30.75, { x: 1200 }, T(0.2));
        count("#n84", 30.8, 1.2, 0, 8.4, (v) => "<small>+</small>" + v.toFixed(1) + "<small>%</small>");
        big("#n84", 30.8, 32.95);

        // S11 TWIST 33.0-35.5: what most people miss (spot on the computer)
        show(pc, 33.05, { y: 900, s: 3.5, ry: -0.6 }, { y: 660, s: 6.2, ry: -0.2 }, T(0.5), "power3.out");
        tl.to(cam, { z: CZ - 3, ry: -0.06, duration: T(2.3), ease: "sine.inOut" }, at(33.1));
        tl.to(pc.st, { ry: 0.15, duration: T(2.3), ease: "sine.inOut" }, at(33.3));
        // S12 35.47-39.4: heavy: giant pictures slam down (micro-gag), plugins rain
        tl.to(cam, { z: CZ, ry: 0, duration: T(0.35) }, at(35.45));
        tl.to(pc.st, { sy: 0.9, y: 700, duration: T(0.3), ease: "power2.out" }, at(36.6));
        pics.forEach((p, k) => { tl.set(p.st, { o: 1 }, at(37.6 + k * 0.25)); tl.to(p.st, { y: 470 - k * 30, duration: T(0.32), ease: "power4.in" }, at(37.6 + k * 0.25)); });
        tl.to(pc.st, { sy: 0.72, y: 760, duration: 0.08, ease: "power4.out" }, at(37.95));
        tl.to(pc.st, { sy: 0.82, duration: 0.25, ease: "elastic.out(1, 0.4)" }, at(38.05));
        puzz.forEach((p, k) => { tl.set(p.st, { o: 1 }, at(38.5 + k * 0.1)); tl.to(p.st, { y: 400 + hash(k + 3) * 120, rz: p.st.rz + 1.5, duration: T(0.4), ease: "bounce.out" }, at(38.5 + k * 0.1)); });
        // S13 39.97-41.4: not the hosting (Dark Gray, struck through)
        [pc, ...pics, ...puzz].forEach((b) => hide(b, 39.85, { y: "+=40" }, T(0.15)));
        show(wifi, 39.95, { s: 1 }, { s: 3.6 }, T(0.35));
        tl.to("#strike", { scaleX: 1, rotate: -24, duration: T(0.3), ease: "power3.out" }, at(40.7));
        hide(wifi, 41.35, {}, T(0.15)); tl.to("#strike", { opacity: 0, duration: T(0.15) }, at(41.35));
        // S14 41.44-44.9: Fortune Code builds light sites from line one
        show(pc, 41.45, { y: 760, sy: 0.82, s: 6.2 }, { y: 660, sy: 1 }, T(0.45), "back.out(2)");
        tl.fromTo(PC, { p: 0 }, { p: 1, duration: T(0.35), ease: "power2.out", immediateRender: false }, at(42.6));
        show(rocket, 43.4, { x: 200, y: 1500 }, { x: 900, y: -400 }, T(0.9), "power2.in");
        tl.to("#logo", { opacity: 1, duration: T(0.3) }, at(41.5));
        tl.to(cam, { z: CZ - 2.5, duration: T(3.2), ease: "sine.inOut" }, at(41.6));
        hide(pc, 45.15, { y: 400 }, T(0.25));
        // S15 CTA 45.31-49.4: comment the keyword
        tl.to(cam, { z: CZ, duration: 0.1 }, at(45.2));
        tl.fromTo("#comment", { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: T(0.4), ease: "back.out(1.6)", immediateRender: false }, at(45.4));
        show(chat, 45.6, { s: 0.5 }, { s: 2.6 }, T(0.4));
        tl.to("#comment .heart", { scale: 1.4, duration: T(0.15), yoyo: true, repeat: 1 }, at(46.3));
        tl.to("#comment", { y: 140, duration: T(0.4), ease: "power2.inOut" }, at(46.9));
        show(tick, 47.0, { s: 0.4, rz: -0.6 }, { s: 3.2, rz: 0 }, T(0.4));
        hide(chat, 49.3, {}, T(0.15)); hide(tick, 49.3, {}, T(0.15));
        tl.to("#comment", { opacity: 0, duration: T(0.15) }, at(49.3)); tl.to("#logo", { opacity: 0, duration: T(0.2) }, at(49.35));
        // S16 LOOP 49.5-end: back to the first frame (clock, big 3)
        tl.to("#bigBack", { opacity: 0.16, duration: T(0.3) }, at(49.55));
        show(clock, 49.5, { x: 520, y: 640, s: 3, rz: 0, ry: 0.9, z: 0 }, { s: 5.2, ry: 0 }, T(0.5));
        tl.to(clock.st, { rz: 0.09, duration: 0.05, yoyo: true, repeat: 9, ease: "none" }, at(50.1));
        tl.set(clock.st, { rz: 0, ry: 0, s: 5.2, x: 520, y: 640, float: 10 }, D - 0.05);

        function draw() {
          const t = tl.time();
          $("#bg").style.background = W.bg;
          camera.position.set(cam.x, cam.y, cam.z); camera.rotation.set(cam.rx, cam.ry, cam.rz);
          floor.position.y = Y(FL.y);
          counter.position.set(X(CT.x), Y(CT.y), 0); counter.visible = CT.o > 0.01;
          counter2.position.set(X(CT2.x), Y(CT2.y), 0); counter2.visible = CT2.o > 0.01;
          insts.forEach((it) => {
            const s = it.st, g = it.g;
            g.visible = s.o > 0.01; if (!g.visible) return;
            const fl = s.float ? Math.sin(t * 1.7 + s.ph) * s.float : 0;
            g.position.set(X(s.x), Y(s.y + fl), s.z);
            g.rotation.set(s.rx, s.ry + Math.sin(t * 0.9 + s.ph) * 0.06, s.rz);
            g.scale.set(s.s * s.sx, s.s * s.sy, s.s);
            setOpacity(g, Math.min(1, s.o));
          });
          drawPhone(P.p, P.spin); drawPc(PC.p);
          renderer.render(scene, camera);
        }

        // ── captions ──
        const capEl = $("#cap");
        CAPS.forEach((c, i) => {
          const div = document.createElement("div"); div.className = "chunk"; capEl.appendChild(div);
          c.w.forEach(([w, s, hl]) => {
            const sp = document.createElement("span");
            if (/^[A-Za-z0-9.,%"]+[،.:]?$/.test(w) && /[A-Za-z0-9]/.test(w)) sp.classList.add("en");
            sp.textContent = w; if (hl) sp.classList.add("hl"); div.appendChild(sp);
            tl.fromTo(sp, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out", immediateRender: false }, Math.max(0, s - 0.04));
          });
          tl.set(div, { opacity: 1 }, Math.max(0, c.w[0][1] - 0.04));
          if (i < CAPS.length - 1) tl.to(div, { opacity: 0, duration: 0.1 }, c.end - 0.08);
        });
        tl.set(capEl.querySelector(".chunk span"), { opacity: 1, y: 0 }, 0);

        window.addEventListener("hf-seek", draw);
        window.__timelines["main"] = tl; tl.seek(0); draw();
      }
      window.__hf = window.__hf || {};
      window.__hf.buildReady = window.__hf.buildReady || {};
      window.__hf.buildReady["main-3d"] = build();
    </script>
  </body>
</html>
