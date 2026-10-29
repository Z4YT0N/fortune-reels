<!DOCTYPE html>
<html lang="ar" data-resolution="portrait">
  <!-- Reel starter. tools/captions.py fills __TITLE__, __D__, __SPEED__ and the CAPS array and writes
       index.html. Edit THIS file, never index.html. Replace the demo shots with the reel's storyboard. -->
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920">
    <title>__TITLE__</title>
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
      /* never put dir="rtl" on <html>: it renders a blank video. RTL goes on the text containers. */
      #main { position: relative; width: 100%; height: 100%; overflow: hidden; font-family: "Plex Arabic", sans-serif; color: #F0F1F2; }
      .clip { position: absolute; inset: 0; }
      #bg { position: absolute; inset: 0; background: #121416; }
      #curve { position: absolute; right: -380px; top: -260px; width: 1100px; opacity: 0.07; }
      #gl { position: absolute; left: 0; top: 0; width: 1080px; height: 1920px; }
      .big { position: absolute; left: 0; width: 1080px; text-align: center; font-family: "Inter", sans-serif; font-weight: 800; letter-spacing: -0.045em; opacity: 0; white-space: nowrap; direction: ltr; }
      .num { top: 330px; font-size: 330px; line-height: 1; color: #F0F1F2; }
      .num small { font-size: 0.45em; color: #00DB33; letter-spacing: -0.02em; }
      #comment { position: absolute; left: 140px; width: 800px; top: 760px; height: 150px; border-radius: 36px; background: #1c2023; border: 2px solid rgba(240, 241, 242, 0.12); display: flex; align-items: center; gap: 26px; padding: 0 34px; direction: rtl; opacity: 0; box-shadow: 0 30px 60px rgba(0, 0, 0, 0.45); }
      #comment .av { width: 84px; height: 84px; border-radius: 50%; background: linear-gradient(135deg, #00DB33, #006A39); flex: none; }
      #comment .who { font-size: 30px; color: #BBBDBF; font-weight: 500; }
      #comment .txt { font-size: 60px; font-weight: 700; color: #F0F1F2; line-height: 1.1; }
      #logo { position: absolute; left: 50%; top: 120px; width: 300px; margin-left: -150px; opacity: 0; }
      /* caption zone: y 1180-1440, nothing else enters it; the scrim keeps it readable over UI */
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
        <div id="bg"><img id="curve" src="assets/brand/mark.svg" alt=""></div>
        <canvas id="gl" width="1080" height="1920"></canvas>
        <div id="nHero" class="big num">0<small>%</small></div>
        <div id="comment"><div class="av"></div><div><div class="who">@client</div><div class="txt">كلمة</div></div></div>
        <img id="logo" src="assets/brand/logo-white.png" alt="">
        <div id="scrim"></div>
        <div id="cap"></div>
      </div>
      <!-- the composition plays ONE mixed track: voice + effects (+ bed) from tools/sfx.py mix -->
      <audio id="mix" src="assets/audio/mix.mp3" data-start="0" data-duration="__D__" data-track-index="2" data-volume="1"></audio>
    </div>

    <script type="module">
      import { createStage, helpers, hash } from "./lib/stage3d.js";
      import { mountCaptions } from "./lib/captions.js";
      const CAPS = /*CAPS*/[];
      const D = __D__, SPEED = __SPEED__;
      const $ = (q) => document.querySelector(q);
      window.__timelines = window.__timelines || {};

      async function build() {
        await document.fonts.ready;
        await Promise.all(["700 40px \"Plex Arabic\"", "800 40px Inter", "700 40px Inter"].map((f) => document.fonts.load(f, "كلمة 10,000%")));

        // every model the reel uses must be listed here (files in assets/models/<name>.fbx)
        const S = await createStage({ canvas: $("#gl"), models: ["clock", "chat", "tick"] });
        const tl = gsap.timeline({ paused: true, onUpdate: () => S.draw(tl.time()) });
        tl.to({}, { duration: D }, 0);
        const H = helpers(tl, S, { speed: SPEED, bgEl: $("#bg") });
        const { at, T, world, show, hide, big, count, shake } = H;

        // ── cast ──
        const hero = S.inst("clock", { x: 540, y: 640, s: 5.2, o: 1, float: 10 });
        const chat = S.inst("chat", { x: 760, y: 470, s: 2.6, z: 1 });
        const tick = S.inst("tick", { x: 540, y: 540, s: 3.2, z: 1 });

        // ── shots (times = ORIGINAL voice-over seconds from audio/vo.json) ──
        // HOOK 0-~2.5: frame 1 already moves (camera push + hero turning in), caption already on screen
        tl.fromTo(hero.st, { ry: 0.9, s: 4.4 }, { ry: 0, s: 5.2, duration: T(0.7), ease: "back.out(1.7)", immediateRender: true }, 0);
        tl.fromTo(S.cam, { z: S.CZ + 3 }, { z: S.CZ, duration: T(1.0), ease: "power2.out", immediateRender: true }, 0);
        shake(hero, 0.35);
        hide(hero, 2.4, { s: 8 }, T(0.2));
        // PROOF: a full-screen counter
        count("#nHero", 2.6, 1.0, 0, 53, (v) => Math.round(v) + "<small>%</small>");
        big("#nHero", 2.6, 4.2);
        // CTA + LOOP: comment card with the keyword, logo small and flat at the top, then back to frame 1
        const tc = Math.max(4.4, D * SPEED - 3.2);
        tl.fromTo("#comment", { opacity: 0, y: 120 }, { opacity: 1, y: 0, duration: T(0.4), ease: "back.out(1.6)", immediateRender: false }, at(tc));
        tl.to("#logo", { opacity: 1, duration: T(0.3) }, at(tc));
        show(chat, tc + 0.2, { s: 0.5 }, { s: 2.6 }, T(0.4));
        show(tick, tc + 1.0, { s: 0.4, rz: -0.6 }, { s: 3.2, rz: 0 }, T(0.4));
        const tl0 = D * SPEED - 1.1;
        [chat, tick].forEach((b) => hide(b, tl0, {}, T(0.15)));
        tl.to(["#comment", "#logo"], { opacity: 0, duration: T(0.15) }, at(tl0));
        show(hero, tl0 + 0.1, { x: 540, y: 640, s: 3, rz: 0, ry: 0.9, z: 0 }, { s: 5.2, ry: 0 }, T(0.5));
        tl.set(hero.st, { rz: 0, ry: 0, s: 5.2, x: 540, y: 640, float: 10 }, D - 0.05); // last frame = first frame

        mountCaptions(tl, CAPS, $("#cap"));
        window.addEventListener("hf-seek", () => S.draw(tl.time()));
        window.__timelines["main"] = tl; tl.seek(0); S.draw(0);
      }
      window.__hf = window.__hf || {};
      window.__hf.buildReady = window.__hf.buildReady || {};
      window.__hf.buildReady["main-3d"] = build();
    </script>
  </body>
</html>
