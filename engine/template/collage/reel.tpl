<!DOCTYPE html>
<html lang="ar" data-resolution="portrait">
  <!-- Collage reel {{NNN}}-{{SLUG}} ({{TITLE}}), brand: {{BRAND}}. Scaffolded by engine/tools/new_collage_reel.py from engine/template/collage/.
       Style = reel 006 v6 / reel 018 (the owner's "ROAR"): halftone collage film underneath (assets/video/bg.mp4), kinetic type on top.
       Edit THIS file, never index.html. build.py fills __D__, WORDS (audio/vo.json) and the brand tokens (brand.json) and writes index.html.
       The moves live in lib/kinetic.js (a copy of engine/kinetic/kinetic.js; README there). Colours and fonts are CSS variables from the brand.
       Rules: ONE named move per spoken line, changing every beat; text appears only when the picture shows that thing; words react to the
       picture (jolt on a hit, swallowed by a dive, exit with the motion); hidden state at build time; Arabic whole words only.
       Write the line -> move map here before you animate (one line each):
         «...»   move ... -->
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=1080, height=1920">
    <title>{{TITLE}}</title>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/gsap.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.14.2/dist/MotionPathPlugin.min.js"></script>
    <script src="lib/kinetic.js"></script>
    <style>
      /*BRAND_CSS*/
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1080px; height: 1920px; overflow: hidden; background: var(--paper); }
      #main { position: relative; width: 100%; height: 100%; overflow: hidden; font-family: var(--font-hero), serif; font-weight: var(--hero-weight); color: var(--dark); }
      #bgWrap { position: absolute; inset: 0; }
      #bgWrap video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
      #stage { position: absolute; inset: 0; }
    </style>
  </head>
  <body>
    <div id="main" data-composition-id="main" data-start="0" data-duration="__D__" data-width="1080" data-height="1920">
      <div id="bgWrap"><video id="bg" src="assets/video/bg.mp4" data-start="0" data-duration="__D__" data-media-start="0" data-track-index="0" muted playsinline></video></div>
      <div id="stage" class="clip" data-start="0" data-duration="__D__" data-track-index="1">
        <div id="behind" style="position:absolute;inset:0"></div>
        <!-- depth matte for rows BEHIND the subject: python ../../engine/tools/matte.py assets/video/bg.mp4 <start> <dur> assets/video/fg-man.webm, then:
        <div id="fgWrap" style="position:absolute;inset:0;opacity:0"><video id="fg" src="assets/video/fg-man.webm" data-start="START" data-duration="DUR" data-media-start="0" data-track-index="3" muted playsinline style="position:absolute;inset:0;width:100%;height:100%"></video></div> -->
        <div id="front" style="position:absolute;inset:0"></div>
        <div id="end" style="position:absolute;inset:0"></div>
        <img class="grain" src="assets/img/grain0.png" alt=""><img class="grain" src="assets/img/grain1.png" alt=""><img class="grain" src="assets/img/grain2.png" alt="">
        <img class="grain" src="assets/img/grain3.png" alt=""><img class="grain" src="assets/img/grain4.png" alt=""><img class="grain" src="assets/img/grain5.png" alt="">
      </div>
      <!-- no <audio>: the mix is muxed after the render (IDM trap, owner 2026-11-07). -->
    </div>
    <script>
      const D = __D__;
      const WORDS = /*WORDS*/[];
      const BRAND = /*BRAND*/{};
      window.__timelines = window.__timelines || {};
      const TL = gsap.timeline({ paused: true });

      async function build() {
        gsap.registerPlugin(MotionPathPlugin);
        await document.fonts.ready;
        await Promise.all(["--font-hero", "--font-label"].map((v) => document.fonts.load(`80px ${getComputedStyle(document.documentElement).getPropertyValue(v).trim()}`, BRAND.name_ar)));
        TL.to({}, { duration: D }, 0);
        const K = Kinetic.create(TL, { words: WORDS });
        const { F, C, W, E, V, has, grp, line, scrap, tape, chip, fit, rise, inkIn, blurIn, hl, slam, over, typeOn, mark, strike, selBox, cursor, blink, live, snap,
                fly, flyOut, echoStack, trails, squash, trailsDrop, rows, feather, kash, kashIn, zoomOut, stamp, jolt, swallow, out, grain } = K;
        const front = document.getElementById("front"), behind = document.getElementById("behind"), endL = document.getElementById("end");
        // a word's time, or a fallback while the voice is not in yet (audio/vo.json missing)
        const at = (i, fb) => (has(i) ? V(i) : fb);

        // ═══ DEMO BEAT (brand only; replace with the reel's beats): the brand name as a design-tool frame label ═══
        // paper scrap wipes in on frame 0, two-tone ink on the first word, marker snap + echo stack on the last, selection box + cursor click
        const name = BRAND.name_ar.split(/\s+/);
        const lab = grp(null, 0, 0, name.map((t, k) => [t, { s: k === name.length - 1 ? 124 : 104, col: k === name.length - 1 ? C.ink : undefined }]), { cls: "scrap", origin: "100% 100%", style: { padding: "6px 36px 20px" }, right: 130 });
        lab.e.style.top = "236px";
        fit(lab, 820);
        gsap.set(lab.e, { clipPath: "inset(0% 0% 0% 100%)" });
        TL.to(lab.e, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.28, ease: "expo.out" }, 0);
        if (name.length > 1) inkIn(lab.toks[0], 0.02);
        const last = lab.toks[lab.toks.length - 1];
        snap(lab.e, last, at(0, 0.45), lab.e);
        echoStack(last, at(0, 0.45) - 0.2, 3, 0.32, true);
        live(lab.e, 0.3, 2.35, 0.03);
        // (selBox goes on an unclipped carrier such as a chip: the scrap's torn clip-path would hide its handles)
        const cur = cursor(front, 760, 360, at(1, 1.0), at(2, 1.7)); // pass the label as pressEl to dip it on the click (end its live() first)
        flyOut(lab.e, 2.4, [{ x: 120, y: 40 }, { x: 520, y: 180 }, { x: 1100, y: 420 }]);
        out([cur], 2.4, { x: 300, y: 200 }, 0.3);

        // ═══ END CARD (brand.json: logo, CTA, contact in order) ═══
        // On a dark night sheet use BRAND.logo_on_dark and C.paper for the contact lines; on paper use logo_on_light and C.dark.
        const END = Math.max(2.8, D - 4.0), ON_DARK = false; // the closing lines hold at least 2 s
        const logo = document.createElement("img"); logo.src = ON_DARK ? BRAND.logo_on_dark : BRAND.logo_on_light;
        Object.assign(logo.style, { position: "absolute", left: "260px", top: "300px", width: "560px" }); endL.appendChild(logo);
        gsap.set(logo, { opacity: 0, y: 20, filter: "blur(8px)" });
        TL.to(logo, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "power2.out" }, END);
        live(logo, END + 0.4, D, 0.025);
        const cta = chip(endL, { left: 200, top: 760, w: 680, h: 130 }, 64); cta.e.style.borderRadius = "18px"; cta.t.textContent = BRAND.cta;
        gsap.set(cta.e, { opacity: 0, scaleX: 0.08, scaleY: 0.6, y: 420, transformOrigin: "50% 50%" });
        TL.to(cta.e, { opacity: 1, y: 0, scaleX: 1, scaleY: 1, duration: 0.34, ease: "expo.out" }, END + 0.3);
        gsap.set(cta.t, { opacity: 0, filter: "blur(8px)" }); TL.to(cta.t, { opacity: 1, filter: "blur(0px)", duration: 0.25 }, END + 0.45);
        selBox(cta.e, END + 0.8, D, ON_DARK ? C.paper : C.dark);
        cursor(endL, 760, 870, END + 0.7, END + 1.2, cta.e);
        live(cta.e, END + 1.6, D, 0.02);
        BRAND.contact.forEach((txt, k) => {
          const e = document.createElement("div"); e.className = "sans"; e.dir = "rtl";
          Object.assign(e.style, { position: "absolute", left: "0", top: (950 + k * 64) + "px", width: "1080px", textAlign: "center", fontSize: "46px", color: ON_DARK ? C.paper : C.dark, whiteSpace: "nowrap" });
          e.innerHTML = K.ltrIsolate(txt); endL.appendChild(e);
          gsap.set(e, { opacity: 0, y: 14, filter: "blur(8px)" });
          TL.to(e, { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.32, ease: "power2.out" }, END + 1.4 + k * 0.12);
        });

        /* ═══ EXAMPLE BEATS: one per move, lifted from reel 018 (word indices i are audio/vo.json positions). Copy, adapt, delete the rest. ═══

        // fly on a curve: a whole word rides in from off-screen left (pts = start offset, then waypoints; rests at 0,0)
        const dust = grp(null, 0, 0, [["والغبار", { s: 112 }], ["داخل؟", { s: 150, col: C.ink }]], { right: 150, origin: "100% 50%" }); dust.e.style.top = "430px";
        fly(dust.toks[0].tk, V(2) - 0.12, [{ x: -900, y: 420 }, { x: -420, y: 260 }, { x: -120, y: 60 }], 0.55, -18);
        // echoStack: outline copies collapse into the word (3 copies, tight gap, ink outlines alternate)
        gsap.set(dust.toks[1].tk, { opacity: 0 }); TL.set(dust.toks[1].tk, { opacity: 1 }, V(3) + 0.12);
        echoStack(dust.toks[1], V(3) - 0.2, 3, 0.32, true);
        // exit with the motion (blown out right with the dust)
        flyOut(dust.e, W(4) - 0.12, [{ x: 120, y: 40 }, { x: 520, y: 180 }, { x: 1100, y: 420 }]);

        // blurIn connectors + marker strike through the stress word
        const not = grp(null, 0, 0, [["العيب", { s: 72, f: "sans" }], ["مو", { s: 72, f: "sans" }], ["بالغبار،", { s: 96 }]], { right: 120 }); not.e.style.top = "450px";
        [4, 5, 6].forEach((wi, k) => blurIn(not.toks[k], V(wi))); strike(not.toks[2], E(6) - 0.15);

        // typeOn in an ink pill (one growing string, joins intact) + block caret
        const pill = chip(null, { left: 330, top: 520, w: 420, h: 96 }, 60);
        gsap.set(pill.e, { opacity: 0, scaleX: 0.15 }); TL.to(pill.e, { opacity: 1, scaleX: 1, duration: 0.26, ease: "expo.out" }, V(7) - 0.12);
        typeOn(pill.t, "العيب بالنافذة", V(7), E(8) - 0.1);

        // zoom-out reveal, jolted by an impact in the picture
        const brand = grp(null, 0, 0, [["ألمنيوم", { s: 116 }], ["نظم", { s: 116 }], ["أمان،", { s: 116, col: C.ink }]], { right: 205, origin: "50% 60%" }); brand.e.style.top = "236px";
        zoomOut(brand.e, V(10)); jolt([brand.e], 4.71);

        // hl: ink highlight wipe behind a word (token needs hl: 1), text flips to --on-ink
        const made = grp(null, 0, 0, [["نصنع", { s: 58, f: "sans" }], ["في", { s: 58, f: "sans" }], ["مصنعنا", { s: 84 }], ["بالأحساء،", { s: 84, hl: 1 }]], { right: 200 }); made.e.style.top = "430px";
        fly(made.e, V(13) - 0.1, [{ x: 760, y: -260 }, { x: 300, y: 70 }], 0.55, 16); hl(made.toks[3], E(16) - 0.15);

        // stamp on a taped paper scrap (object carries text)
        const con = scrap(null, { left: 110, top: 1110, w: 640, h: 270 }); tape(con, 210, -14, -4);
        stamp(con, "المكتوب", { left: 26, top: 118 }, V(20));

        // the camera dive swallows the beat
        swallow([brand.e, made.e, con], 10.6);

        // kash stretch: the long-tatweel twin grows out of the short word
        const qs = grp(null, 0, 0, [["تستاهل:", { s: 120, col: C.ink }]], { right: 430 }), ql = grp(null, 0, 0, [["تستـــــاهل:", { s: 120, col: C.ink }]], { right: 430 });
        qs.e.style.top = ql.e.style.top = "236px"; kash(qs, ql, V(23));

        // marker arrow to a thing in the picture, label rises at its end
        mark(null, 560, 640, 110, 140, "M100 14 C70 30 40 60 18 120 M18 120 L14 84 M18 120 L48 100", V(24) - 0.1, 0.25);

        // trails with squash: a tag drops on a string with 3 ghosts, squashes, swings; numbers slam in
        const tag = scrap(null, { left: 515, top: 262, w: 430, h: 500 }); trailsDrop(tag, V(32) - 0.28);
        const n10 = grp(tag, 0, 150, [["١٠", { s: 104, hl: 1 }]], { right: 34 }); slam(n10.toks[0], V(34)); hl(n10.toks[0], V(34) + 0.18);

        // zigzag feather fall onto a doodle
        const mt = grp(null, 0, 0, [["وصيانة", { s: 98 }], ["مجانية", { s: 98, hl: 1 }]], { right: 140, origin: "70% 0%" }); mt.e.style.top = "470px";
        feather(mt.e, V(44) - 0.2);

        // rows BEHIND the subject (needs #fgWrap matte above) + the solid word in front
        TL.to("#fgWrap", { opacity: 1, duration: 0.15, ease: "none" }, 23.05);
        rows(behind, "ترتاح", 860, 5, 130, V(48) - 0.1, 25.4, ["echoG", "echo"]);

        // selBox + cursor click on a CTA chip
        const c2 = chip(endL, { left: 200, top: 665, w: 680, h: 130 }, 70); c2.t.textContent = BRAND.cta;
        selBox(c2.e, V(57), D, C.paper); cursor(endL, 760, 775, V(57) - 0.2, V(58), c2.e);

        // live: everything on screen keeps breathing until it leaves
        live(mt.e, V(45) + 0.6, 23.2, 0.03);
        */

        grain(D, 0.5);
        window.__timelines["main"] = TL; TL.seek(0);
      }
      window.__hf = window.__hf || {}; window.__hf.buildReady = window.__hf.buildReady || {};
      window.__hf.buildReady["main"] = build();
    </script>
  </body>
</html>
