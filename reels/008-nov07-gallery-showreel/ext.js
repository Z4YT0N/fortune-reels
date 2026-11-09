        // ═════════════ 008 extension: words 22..84 (Nov 7 reel) ═════════════
        // Moves per line: B8 search bar typeOn + «يخفف» fly+trails | B9 result card -> expand, «الأرقام» zoom-out, digit rows |
        // B10 question cards fly on curves, inkIn words, hl key word | B11 tiles fly into grid, selBox hops, badges, pills pop |
        // B12 same file card, old size struck + zigzag fall, counter 0->140 zoom-out, «بس.» stamp, card floats (lighter) |
        // B13 phone tilt-in, tap = instant load, «ترمش» + real blink | B14 «يبطئ» kashida, bar -> green button, click, green wipe, end panel.
        const PF = '"PlexA", sans-serif';
        const stage = document.getElementById("stage");
        const ctr = (e, cx, cy) => { const r = e.getBoundingClientRect(); e.style.left = (cx - r.width / 2) + "px"; e.style.top = (cy - r.height / 2) + "px"; };
        const blurIn = (e, t, d = 0.32) => { gsap.set(e, { opacity: 0, y: 14, filter: "blur(8px)" }); TL.to(e, { opacity: 1, y: 0, filter: "blur(0px)", duration: d, ease: "power3.out" }, t); };
        const zoomOut = (e, t, s = 2.8) => { gsap.set(e, { opacity: 0, scale: s, filter: "blur(10px)" }); TL.set(e, { opacity: 1 }, t); TL.to(e, { scale: 1, filter: "blur(0px)", duration: 0.3, ease: "expo.out" }, t); };
        const popIn = (e, t, rot = 0) => { gsap.set(e, { opacity: 0, scale: 0, rotation: rot * 2.5 }); TL.set(e, { opacity: 1 }, t); TL.to(e, { scale: 1, rotation: rot, duration: 0.5, ease: "back.out(2.4)" }, t); };
        const slamIn = (e, t) => { gsap.set(e, { opacity: 0 }); TL.set(e, { opacity: 1, x: 240, scaleX: 1.4, skewX: -12, filter: "blur(9px)" }, t - 3 * F); TL.to(e, { x: 0, scaleX: 1, skewX: 0, filter: "blur(0px)", duration: 0.3, ease: "expo.out" }, t); };
        const exitUp = (els, t) => TL.to(els, { y: -120, opacity: 0, filter: "blur(10px)", duration: 0.28, ease: "power2.in", stagger: 0.03 }, t);

        // ═══ B8 the toast becomes a search bar: «دور على أحد يعرف يخفف اللي عندك.» ═══
        const B8 = V(22) - 0.06;
        TL.to(tw[0], { motionPath: { path: [{ x: 50, y: -110 }, { x: 160, y: 1000 }], curviness: 1.4 }, rotation: -48, duration: 0.62, ease: "power2.in" }, B8);
        TL.to(tw[4], { motionPath: { path: [{ x: -60, y: -90 }, { x: -220, y: 1000 }], curviness: 1.4 }, rotation: 52, duration: 0.62, ease: "power2.in" }, B8 + 0.04);
        TL.to(tw.slice(1, 4), { opacity: 0, y: -26, filter: "blur(8px)", duration: 0.18, ease: "power2.in", stagger: 0.02 }, B8);
        TL.to(tbar, { opacity: 0, duration: 0.15 }, B8);
        TL.to(toast, { top: 520, height: 150, duration: 0.45, ease: "expo.inOut" }, B8);
        TL.to(ticon, { top: 15, duration: 0.45, ease: "expo.inOut" }, B8);
        const mk = ticon.querySelector("img");
        const mag = el("div", "abs", ticon, { inset: "0", display: "flex", alignItems: "center", justifyContent: "center" },
          `<svg viewBox="0 0 64 64" width="66" height="66"><circle cx="27" cy="27" r="17" fill="none" stroke="#121416" stroke-width="7"/><path d="M40 40 L56 56" stroke="#121416" stroke-width="8" stroke-linecap="round"/></svg>`);
        gsap.set(mag, { opacity: 0, scale: 0.3, rotation: -90 });
        TL.to(mk, { opacity: 0, scale: 0.3, duration: 0.16 }, B8); TL.to(mag, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2.4)" }, B8 + 0.12);
        const qBox = el("div", "abs", toast, { right: "180px", top: "36px", display: "flex", alignItems: "center", gap: "8px", direction: "rtl" });
        const qT = el("div", "ar", qBox, { fontFamily: PF, fontWeight: "600", fontSize: "44px", color: L, lineHeight: "78px" }, "");
        const caret = el("div", "", qBox, { width: "5px", height: "58px", background: G, borderRadius: "3px" });
        gsap.set(caret, { opacity: 0 });
        let lq = null;
        frames(V(22), 11.45, (t) => {
          let s = "";
          for (let i = 22; i <= 28; i++) { if (t < V(i)) break; const w = WORDS[i][0], p = ramp(t, V(i), V(i) + Math.min(0.3, W(i) - V(i))); s += (s ? " " : "") + w.slice(0, Math.max(1, Math.round(w.length * p))); }
          if (s !== lq) { TL.set(qT, { textContent: s }, at(t)); lq = s; }
        });
        for (let t = V(22), k = 0; t < 12.2; t += 0.2, k++) TL.set(caret, { opacity: k % 2 ? 0 : 1 }, t);
        TL.set(caret, { opacity: 0 }, 12.2);
        // «يخفف» flies in on a curve from off-screen with 3 ghost trails, then floats like a feather
        const mkHero = (op) => { const e = el("div", "abs ar", world, { fontSize: "300px", color: G, zIndex: 22, opacity: op }, "يخفف"); ctr(e, 540, 920); return e; };
        const hero = mkHero(1), ghosts = [0.32, 0.18, 0.08].map(o => mkHero(o));
        [hero, ...ghosts].forEach((e, k) => {
          gsap.set(e, { x: -1000, y: 620, rotation: -34, autoAlpha: 0 });
          const t0 = V(26) - 0.34 + k * 2 * F;
          TL.set(e, { autoAlpha: 1 }, t0);
          TL.to(e, { motionPath: { path: [{ x: -520, y: 60 }, { x: 0, y: 0 }], curviness: 1.5 }, rotation: 0, duration: 0.4, ease: "power3.out" }, t0);
          if (k) TL.set(e, { autoAlpha: 0 }, V(26) + 0.12);
        });
        TL.to(hero, { scaleY: 0.86, scaleX: 1.08, duration: 0.06 }, V(26) + 0.06); TL.to(hero, { scaleY: 1, scaleX: 1, duration: 0.35, ease: "back.out(3)" }, V(26) + 0.12);
        TL.to(hero, { y: -46, rotation: 4, duration: 0.7, ease: "sine.inOut" }, V(26) + 0.45);
        TL.to(hero, { motionPath: { path: [{ x: 160, y: -260 }, { x: 900, y: -700 }], curviness: 1.3 }, rotation: 24, duration: 0.45, ease: "power3.in" }, 11.2);
        // cursor clicks into the bar
        TL.to(cur, { x: 640, y: 640, duration: 0.4, ease: "power3.inOut" }, B8 - 0.1);
        press(B8 + 0.32); ripple(stage, 640, 640, B8 + 0.32, L);

        // ═══ B9 the result card «في فورتشن كود،» -> click -> it becomes the dark world «نبدا من الأرقام.» ═══
        const dw2 = el("div", "", stage, { position: "absolute", inset: "0", zIndex: 12 });
        const dark2 = el("div", "", dw2, { position: "absolute", inset: "0", background: K, overflow: "hidden", clipPath: "inset(910px 540px 1010px 540px round 44px)" });
        const R9 = { l: 100, t: 760, r: 980, b: 1070 };
        TL.set(dw2, { filter: "drop-shadow(0 34px 44px rgba(18,20,22,0.42))" }, V(29) - 0.1);
        TL.to(dark2, { clipPath: clip(R9.t, 1080 - R9.r, 1920 - R9.b, R9.l, 46), duration: 0.42, ease: "back.out(1.5)" }, V(29) - 0.08);
        const rc = el("div", "", dark2, { position: "absolute", inset: "0" });
        const rIcon = el("div", "abs", rc, { right: "150px", top: "830px", width: "150px", height: "150px", borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center" },
          `<img src="assets/brand/mark.svg" style="width:92px;height:87px;filter:brightness(0)">`);
        const rTitle = el("div", "abs ar", rc, { right: "336px", top: "790px", fontSize: "116px", color: L }, "فورتشن كود"); fit(rTitle, 500);
        const rUrl = el("div", "abs", rc, { right: "336px", top: "960px", fontFamily: PF, fontWeight: "500", fontSize: "36px", color: GREY, direction: "ltr" }, "fortunecode.org");
        popIn(rIcon, V(29) + 0.1, -10); blurIn(rTitle, V(30)); blurIn(rUrl, V(31));
        const CLICK3 = 12.42;
        TL.to(cur, { x: 520, y: 950, duration: 0.5, ease: "power3.inOut" }, CLICK3 - 0.55);
        press(CLICK3); ripple(stage, 520, 950, CLICK3);
        const EXP2 = CLICK3 + 0.06;
        TL.to(dark2, { clipPath: clip(0, 0, 0, 0, 0), duration: 0.4, ease: "expo.inOut" }, EXP2);
        TL.to([rIcon, rTitle, rUrl], { opacity: 0, scale: 0.6, filter: "blur(8px)", duration: 0.2, ease: "power2.in", stagger: 0.03 }, EXP2);
        TL.set(dw2, { filter: "none" }, EXP2 + 0.4);
        const labD2 = labels(dark2, "#5E6369"); gsap.set(labD2, { opacity: 0 }); TL.to(labD2, { opacity: 1, duration: 0.3 }, EXP2 + 0.3);
        TL.to(cur, { x: 1000, y: 1480, duration: 0.5, ease: "power2.inOut" }, EXP2 + 0.1);
        // digit rows on the behind layer (facts only: 34, 140, 53%, 3 s, 0.1 s)
        const rows = [960, 1150, 1340].map((y, k) => { const r = el("div", "abs ar", dark2, { left: "-600px", top: y + "px", fontSize: "150px", color: "transparent", WebkitTextStroke: "2px #2C3035", zIndex: 0 },
          ["٣٤ ميجا · ١٤٠ كيلو · ٥٣٪ · ٣ ثواني · ", "٠٫١ ثانية · ٣٤ · ١٤٠ · ٥٣٪ · ", "١٤٠ كيلو · ٣ ثواني · ٣٤ ميجا · "][k].repeat(3)); gsap.set(r, { opacity: 0 }); return r; });
        rows.forEach((r, k) => { TL.to(r, { opacity: 1, duration: 0.4 }, V(34)); TL.fromTo(r, { x: k % 2 ? -260 : 0 }, { x: k % 2 ? 0 : -260, duration: V(46) - V(34), ease: "none", immediateRender: false }, V(34)); });
        const nbd = el("div", "abs ar", dark2, { right: "120px", top: "430px", fontFamily: PF, fontWeight: "600", fontSize: "64px", color: GREY }, "نبدا من");
        const arq = el("div", "abs ar", dark2, { right: "110px", top: "500px", fontSize: "250px", color: G, transformOrigin: "100% 0%" }, "الأرقام."); fit(arq, 860);
        blurIn(nbd, V(32)); zoomOut(arq, V(34));

        // ═══ B10 three questions arrive as cards on curves ═══
        TL.to(nbd, { opacity: 0, duration: 0.2 }, V(35) - 0.3);
        TL.to(arq, { scale: 0.42, y: -230, duration: 0.45, ease: "expo.inOut" }, V(35) - 0.35);
        const icons = [
          `<svg viewBox="0 0 100 100" width="92" height="92"><path d="M14 72 A38 38 0 1 1 86 72" fill="none" stroke="#121416" stroke-width="10" stroke-linecap="round"/><path d="M50 64 L27 44" stroke="#121416" stroke-width="10" stroke-linecap="round"/><circle cx="50" cy="64" r="8" fill="#121416"/></svg>`,
          `<svg viewBox="0 0 100 100" width="92" height="92"><path d="M44 16 H18 V84 H44" fill="none" stroke="#121416" stroke-width="10" stroke-linejoin="round"/><path d="M42 50 H86 M70 33 L87 50 L70 67" fill="none" stroke="#121416" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
          `<svg viewBox="0 0 100 100" width="92" height="92"><path d="M8 50 Q50 10 92 50 Q50 90 8 50 Z" fill="none" stroke="#121416" stroke-width="9" stroke-linejoin="round"/><circle cx="50" cy="50" r="14" fill="#121416"/></svg>`];
        const QS = [[35, 38, 37, 560, 1], [39, 41, 40, 810, -1], [42, 45, 45, 1060, 1]];
        const cards = QS.map(([a, b, key, top, side], n) => {
          const c = el("div", "abs", dark2, { left: "100px", top: top + "px", width: "880px", height: "210px", borderRadius: "48px", background: L, display: "flex", alignItems: "center", gap: "30px", padding: "0 34px 0 40px", direction: "rtl", zIndex: 3, boxShadow: "0 24px 50px rgba(0,0,0,0.45)" });
          const txt = el("div", "ar", c, { flex: "1", display: "flex", gap: "22px", fontSize: "86px", color: K, alignItems: "center" });
          const ws = []; for (let i = a; i <= b; i++) ws.push(el("span", "", txt, { display: "inline-block", color: "#B4B9BE", borderRadius: "20px", padding: "0 12px 10px", margin: "0 -12px" }, WORDS[i][0]));
          fit(txt, 640);
          const ic = el("div", "", c, { width: "150px", height: "150px", flex: "0 0 150px", borderRadius: "38px", background: G, display: "flex", alignItems: "center", justifyContent: "center" }, icons[n]);
          const kr = ws[key - a].getBoundingClientRect();
          gsap.set(c, { x: side * 1300, y: 160, rotation: side * 22 });
          const t0 = V(a) - 0.42;
          TL.to(c, { motionPath: { path: [{ x: side * 520, y: -140 }, { x: 0, y: 0 }], curviness: 1.4 }, rotation: 0, duration: 0.46, ease: "power3.out" }, t0);
          TL.fromTo(ic, { rotation: -side * 40, scale: 0.6 }, { rotation: 0, scale: 1, duration: 0.5, ease: "back.out(2.6)", immediateRender: false }, t0 + 0.28);
          ws.forEach((w, k) => TL.to(w, { color: K, duration: 0.12 }, V(a + k)));
          TL.to(ws[key - a], { backgroundColor: G, duration: 0.12 }, V(key) + 0.06);
          TL.fromTo(ws[key - a], { scale: 1.25 }, { scale: 1, duration: 0.4, ease: "back.out(3)", immediateRender: false }, V(key) + 0.06);
          // the cursor points at each key word
          const cx = kr.left + kr.width * 0.5, cy = kr.top + kr.height * 0.8;
          TL.to(cur, { x: cx, y: cy, duration: 0.35, ease: "power3.inOut" }, V(key) - 0.3);
          press(V(key) + 0.04);
          c._ws = ws; return c;
        });
        cards.forEach((c, n) => { if (n < 2) TL.to(c, { opacity: 0.55, scale: 0.97, duration: 0.3 }, V(QS[n + 1][0]) - 0.1); });

        // ═══ B11 «اشتغلنا على كل صورة في المعرض. نفس الصور، ونفس الجودة.» ═══
        cards.forEach((c, n) => TL.to(c, { motionPath: { path: [{ x: 120, y: -60 }, { x: -1400, y: 240 }], curviness: 1.3 }, rotation: -24, opacity: 0.9, duration: 0.45, ease: "power3.in" }, V(46) - 0.32 + n * 0.05));
        exitUp([arq], V(46) - 0.3);
        rows.forEach(r => TL.to(r, { opacity: 0.35, duration: 0.4 }, V(46)));
        TL.to(cur, { x: 1080, y: 1500, duration: 0.4, ease: "power2.in" }, V(46) - 0.3);
        const ish = el("div", "abs ar", dark2, { right: "120px", top: "262px", fontSize: "190px", color: L }, "اشتغلنا");
        blurIn(ish, V(46), 0.36);
        const sub = el("div", "abs ar", dark2, { right: "122px", top: "516px", fontFamily: PF, fontWeight: "600", fontSize: "56px", display: "flex", gap: "16px" });
        gsap.set(sub, { opacity: 0 }); TL.set(sub, { opacity: 1 }, V(47) - 0.1);
        const subW = [47, 48, 49, 50, 51].map(i => el("span", "", sub, { color: "#3A3E43" }, WORDS[i][0]));
        subW.forEach((w, k) => TL.to(w, { color: (k === 1 || k === 2) ? G : L, duration: 0.12 }, V(47 + k)));
        const grid = [], badges = [];
        for (let k = 0; k < 8; k++) {
          const col = 3 - (k % 4), row = Math.floor(k / 4), gx = 110 + col * 220, gy = 640 + row * 220;
          const tl = el("div", "tile", dark2, { width: "200px", height: "200px", borderRadius: "40px", borderColor: "#2A2E32", zIndex: 4 }, `<img src="assets/img/t${k + 1}.jpg">`);
          gsap.set(tl, { x: gx + (k % 2 ? -1200 : 1200), y: gy + 900, rotation: (k % 2 ? -1 : 1) * 40 });
          TL.to(tl, { motionPath: { path: [{ x: gx + (k % 2 ? -380 : 380), y: gy - 260 }, { x: gx, y: gy }], curviness: 1.3 }, rotation: 0, duration: 0.5, ease: "power3.out" }, V(46) + 0.08 + k * 0.045);
          tl._x = gx; tl._y = gy; grid.push(tl);
          const bd = el("div", "abs", dark2, { left: (gx + 136) + "px", top: (gy + 136) + "px", width: "58px", height: "58px", borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 6 },
            `<svg viewBox="0 0 40 40" width="34" height="34"><path d="M9 21 L17 29 L31 12" fill="none" stroke="#121416" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
          gsap.set(bd, { scale: 0, opacity: 0 }); badges.push(bd);
        }
        // selection box with 4 handles hops tile to tile on «كل صورة في المعرض»
        const sel = el("div", "abs", dark2, { left: "0", top: "0", width: "220px", height: "220px", border: "5px dashed #00DB33", borderRadius: "46px", zIndex: 5 });
        [[-9, -9], [-9, null], [null, -9], [null, null]].forEach(([l, tp]) => el("div", "abs", sel, { width: "18px", height: "18px", background: G, borderRadius: "4px", left: l === null ? "auto" : l + "px", right: l === null ? "-9px" : "auto", top: tp === null ? "auto" : tp + "px", bottom: tp === null ? "-9px" : "auto" }));
        gsap.set(sel, { opacity: 0 });
        const H0 = V(48), HS = (W(51) + 0.1 - V(48)) / 8;
        for (let k = 0; k < 8; k++) {
          const t = H0 + k * HS;
          TL.set(sel, { x: grid[k]._x - 10, y: grid[k]._y - 10, opacity: 1 }, t);
          TL.fromTo(sel, { scale: 1.12 }, { scale: 1, duration: HS * 0.9, ease: "back.out(3)", immediateRender: false }, t);
          TL.set(badges[k], { opacity: 1 }, t + HS * 0.6); TL.to(badges[k], { scale: 1, duration: 0.3, ease: "back.out(3)" }, t + HS * 0.6);
        }
        TL.to(sel, { opacity: 0, duration: 0.15 }, H0 + 8 * HS);
        const pS = el("div", "pill", dark2, { fontSize: "92px", background: L, color: K, padding: "0 46px 12px", zIndex: 7 }, "نفس الصور،"); ctr(pS, 600, 1236);
        const pQ = el("div", "pill", dark2, { fontSize: "96px", background: G, color: K, padding: "0 50px 12px", zIndex: 7 }, "ونفس الجودة."); ctr(pQ, 500, 1362);
        popIn(pS, V(52), -4); popIn(pQ, V(54), 3);
        grid.forEach((g, k) => TL.fromTo(g, { scale: 1.08 }, { scale: 1, duration: 0.35, ease: "back.out(3)", immediateRender: false }, V(53) + k * 0.025));
        TL.to(pQ, { scaleX: 1.08, scaleY: 0.9, duration: 0.07 }, V(55)); TL.to(pQ, { scaleX: 1, scaleY: 1, duration: 0.35, ease: "back.out(3)" }, V(55) + 0.07);

        // ═══ B12 the same file card, now light: «والحجم صار ميه واربعين كيلو بس.» ═══
        const B12 = V(56) - 0.1;
        [[ish, 0, -14], [sub, 0.03, 8], [pS, 0.06, -18], [pQ, 0.09, 14]].forEach(([e, dl, r]) => { TL.to(e, { y: 1800, rotation: r, duration: 0.5, ease: "power2.in" }, B12 + dl); TL.set(e, { autoAlpha: 0 }, B12 + dl + 0.5); });
        TL.to(badges, { scale: 0, duration: 0.15, stagger: 0.01 }, B12);
        const cardB = el("div", "abs", dark2, { left: "150px", top: "690px", width: "780px", height: "440px", borderRadius: "46px", background: "#1E2124", boxShadow: "inset 0 0 0 3px #3A3E43, 0 40px 80px rgba(0,0,0,0.6)", zIndex: 8 });
        const bIcon = el("div", "abs", cardB, { right: "56px", top: "46px", width: "122px", height: "122px", borderRadius: "30px", background: G, overflow: "hidden" });
        [[2, -12, 24, 26], [3, 8, 40, 30], [4, -2, 30, 44]].forEach(([n, r, x, y]) => el("img", "", bIcon, { position: "absolute", left: x + "px", top: y + "px", width: "58px", height: "58px", borderRadius: "12px", border: "3px solid #F0F1F2", objectFit: "cover", transform: `rotate(${r}deg)` }).src = `assets/img/t${n}.jpg`);
        el("div", "abs ar", cardB, { right: "206px", top: "30px", fontSize: "70px", color: L }, "معرض صور");
        el("div", "abs ar", cardB, { right: "206px", top: "122px", fontFamily: PF, fontWeight: "500", fontSize: "40px", color: GREY }, "الحجم");
        const old = el("div", "abs ar", cardB, { right: "56px", top: "200px", fontSize: "130px", color: GREY }, "٣٤ ميجا");
        const strike = el("div", "abs", old, { left: "-10px", right: "-10px", top: "52%", height: "12px", borderRadius: "6px", background: G, transformOrigin: "100% 50%" });
        gsap.set(strike, { scaleX: 0 });
        const nw = el("div", "abs ar", cardB, { right: "56px", top: "170px", display: "flex", alignItems: "baseline", gap: "26px", transformOrigin: "100% 60%" });
        const nNum = el("div", "", nw, { fontSize: "210px", color: G, lineHeight: "1.05" }, "٠");
        const nK = el("div", "", nw, { fontSize: "112px", color: L, lineHeight: "1.05" }, "كيلو");
        gsap.set(nK, { opacity: 0, scale: 2.2, transformOrigin: "100% 70%" });
        const bs = el("div", "pill", cardB, { left: "-30px", top: "350px", fontSize: "112px", background: G, color: K, padding: "0 44px 12px" }, "بس.");
        gsap.set(cardB, { scale: 0.25, opacity: 0, rotation: -6 });
        TL.set(cardB, { opacity: 1 }, B12 + 0.12); TL.to(cardB, { scale: 1, rotation: 0, duration: 0.48, ease: "back.out(1.6)" }, B12 + 0.12);
        // tiles are sucked into the card icon
        grid.forEach((g, k) => TL.to(g, { x: 713, y: 697, scale: 0.25, rotation: 20, duration: 0.32, ease: "power3.in" }, B12 + 0.05 + k * 0.025));
        grid.forEach((g, k) => TL.set(g, { opacity: 0 }, B12 + 0.38 + k * 0.025));
        TL.fromTo(bIcon, { scale: 1.25 }, { scale: 1, duration: 0.4, ease: "back.out(3)", immediateRender: false }, B12 + 0.5);
        gsap.set(old, { opacity: 0 }); TL.to(old, { opacity: 1, duration: 0.2 }, B12 + 0.3);
        TL.to(strike, { scaleX: 1, duration: 0.2, ease: "power3.out" }, V(57));
        TL.to(old, { motionPath: { path: [{ x: -60, y: 120 }, { x: 40, y: 320 }, { x: -80, y: 620 }, { x: 30, y: 1100 }], curviness: 1.2 }, rotation: 28, opacity: 0.6, duration: 0.65, ease: "power2.in" }, V(57) + 0.24);
        gsap.set(nNum, { opacity: 0 });
        zoomOut(nNum, V(58), 3);
        let ln = "٠";
        frames(V(58), W(59), (t) => { const p = t < V(59) ? 100 * expoOut(ramp(t, V(58), W(58))) : lerp(100, 140, expoOut(ramp(t, V(59), W(59)))); const s = AR(Math.round(p)); if (s !== ln) { TL.set(nNum, { textContent: s }, at(t)); ln = s; } });
        TL.set(nNum, { textContent: "١٤٠" }, W(59));
        TL.to(nK, { opacity: 1, scale: 1, duration: 0.22, ease: "power4.out" }, V(60));
        TL.fromTo(nNum, { scaleX: 1.15, scaleY: 1.25 }, { scaleX: 1, scaleY: 1, duration: 0.55, ease: "elastic.out(1, 0.45)", immediateRender: false }, V(60) + 0.03);
        popIn(bs, V(61), -8);
        // the card gets light: it lifts and floats
        TL.to(cardB, { y: -70, rotation: 2, boxShadow: "inset 0 0 0 3px #3A3E43, 0 90px 120px rgba(0,0,0,0.35)", duration: 0.7, ease: "back.out(1.6)" }, V(60) + 0.08);
        TL.to(cardB, { y: -94, rotation: -1, duration: 0.6, ease: "sine.inOut" }, V(60) + 0.8);

        // ═══ B13 «والمعرض يفتح قبل ما ترمش.» the phone opens it instantly ═══
        const PH2 = V(62) - 0.12;
        const ph2 = el("div", "", dark2, { position: "absolute", left: "70px", top: "430px", width: "450px", height: "930px", borderRadius: "70px", background: "#1E2124", border: "2px solid #3A3E43", padding: "16px", boxShadow: "0 50px 90px rgba(0,0,0,0.55), inset 0 0 0 2px #2A2E32", zIndex: 9 });
        const sc2 = el("div", "", ph2, { position: "relative", width: "100%", height: "100%", borderRadius: "56px", background: L, overflow: "hidden" });
        el("div", "notch", sc2);
        el("div", "abs ar", sc2, { right: "28px", top: "72px", fontSize: "34px", color: K }, "معرض صور");
        const chip2 = el("div", "abs ar", sc2, { left: "22px", top: "74px", fontSize: "28px", color: K, background: G, borderRadius: "999px", padding: "0 18px 4px" }, "١٤٠ كيلو");
        const sk2 = [];
        for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) {
          const s = el("div", "sk", sc2, { left: (24 + c * 196) + "px", top: (150 + r * 190) + "px", width: "176px", height: "176px" });
          const im = el("img", "", s, { width: "100%", height: "100%", objectFit: "cover", display: "block" }); im.src = `assets/img/t${r * 2 + c + 1}.jpg`;
          gsap.set(im, { opacity: 0, scale: 1.3 }); sk2.push(im);
        }
        const btn2 = el("div", "", sc2, { position: "absolute", left: "40px", width: "336px", top: "740px", height: "110px", borderRadius: "999px", background: G, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" });
        const btn2T = el("div", "ar", btn2, { fontSize: "62px", color: K }, "افتح");
        const pct2 = el("div", "abs ar", sc2, { left: "0", width: "100%", textAlign: "center", top: "694px", fontFamily: PF, fontWeight: "600", fontSize: "34px", color: K }, "١٠٠٪");
        gsap.set(pct2, { opacity: 0 }); gsap.set(chip2, { opacity: 0 });
        gsap.set(ph2, { transformPerspective: 1900, rotationX: 68, rotationY: -38, rotationZ: 8, y: 1100, autoAlpha: 0 }); TL.set(ph2, { autoAlpha: 1 }, PH2);
        TL.to(ph2, { rotationX: 6, rotationY: 18, rotationZ: -2, y: 0, duration: 0.6, ease: "back.out(1.25)" }, PH2);
        TL.to(ph2, { rotationX: 2, rotationY: 8, rotationZ: 0, duration: V(67) - PH2 - 0.6, ease: "sine.inOut" }, PH2 + 0.6);
        // the light card flies into the phone and becomes its size chip
        TL.to(cardB, { motionPath: { path: [{ x: -100, y: -260 }, { x: -390, y: -390 }], curviness: 1.3 }, scale: 0.12, rotation: -10, duration: 0.45, ease: "power2.inOut" }, PH2 - 0.04);
        TL.set(cardB, { opacity: 0 }, PH2 + 0.42);
        TL.set(chip2, { opacity: 1 }, PH2 + 0.42); TL.fromTo(chip2, { scale: 1.5 }, { scale: 1, duration: 0.35, ease: "back.out(3)", immediateRender: false }, PH2 + 0.42);
        TL.to(rows, { opacity: 0.12, duration: 0.3 }, PH2);
        const CLICK4 = V(63) + 0.02;
        TL.seek(CLICK4); const b2r = btn2.getBoundingClientRect(); TL.seek(0);
        const b2x = b2r.left + b2r.width * 0.55, b2y = b2r.top + b2r.height * 0.5;
        TL.to(cur, { x: b2x, y: b2y, duration: 0.42, ease: "power3.inOut" }, CLICK4 - 0.45);
        press(CLICK4); ripple(stage, b2x, b2y, CLICK4);
        TL.to(btn2T, { opacity: 0, scale: 0.6, duration: 0.1 }, CLICK4 + 0.04);
        TL.to(btn2, { top: 770, height: 18, duration: 0.18, ease: "expo.out" }, CLICK4 + 0.04);
        TL.to(pct2, { opacity: 1, duration: 0.1 }, CLICK4 + 0.1);
        sk2.forEach((im, k) => TL.to(im, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, CLICK4 + 0.06 + k * 0.03));
        TL.to(cur, { x: 300, y: 1500, duration: 0.5, ease: "power2.inOut" }, CLICK4 + 0.3);
        const yft = el("div", "abs ar", dark2, { right: "100px", top: "450px", fontSize: "176px", color: L, zIndex: 10 }, "يفتح"); fit(yft, 400);
        const qbl = el("div", "abs ar", dark2, { right: "104px", top: "720px", fontFamily: PF, fontWeight: "600", fontSize: "62px", color: GREY, zIndex: 10 }, "قبل ما");
        const trm = el("div", "abs ar", dark2, { right: "96px", top: "790px", fontSize: "180px", color: G, zIndex: 10, transformOrigin: "100% 50%" }, "ترمش."); fit(trm, 410);
        slamIn(yft, V(63));
        blurIn(qbl, V(64)); zoomOut(trm, V(66), 2.6);
        // a real blink
        const lidT = el("div", "abs", stage, { left: "0", top: "0", width: "1080px", height: "980px", background: "#050607", zIndex: 45 });
        const lidB = el("div", "abs", stage, { left: "0", top: "940px", width: "1080px", height: "980px", background: "#050607", zIndex: 45 });
        gsap.set(lidT, { y: -1000 }); gsap.set(lidB, { y: 1000 });
        const BL = V(66) + 0.3;
        TL.to(lidT, { y: 0, duration: 0.1, ease: "power2.in" }, BL); TL.to(lidB, { y: 0, duration: 0.1, ease: "power2.in" }, BL);
        TL.to(lidT, { y: -1000, duration: 0.16, ease: "power2.out" }, BL + 0.14); TL.to(lidB, { y: 1000, duration: 0.16, ease: "power2.out" }, BL + 0.14);

        // ═══ B14 «إذا موقعك يبطئ وما تدري ليش،» -> «اطلب فحص مجاني لموقعك،» ═══
        TL.to(ph2, { motionPath: { path: [{ x: -80, y: -60 }, { x: -260, y: 1500 }], curviness: 1.2 }, rotationZ: -26, duration: 0.55, ease: "power2.in" }, V(67) - 0.2);
        exitUp([yft, qbl, trm], V(67) - 0.2);
        const iza = el("div", "abs ar", dark2, { right: "120px", top: "330px", fontFamily: PF, fontWeight: "600", fontSize: "62px", color: GREY, zIndex: 10 }, "إذا");
        const mwq = el("div", "abs ar", dark2, { right: "112px", top: "390px", fontSize: "210px", color: L, zIndex: 10 }, "موقعك");
        blurIn(iza, V(67));
        gsap.set(mwq, { x: 1100, y: -200, rotation: 24, opacity: 0 }); TL.set(mwq, { opacity: 1 }, V(68) - 0.3);
        TL.to(mwq, { motionPath: { path: [{ x: 420, y: -260 }, { x: 0, y: 0 }], curviness: 1.4 }, rotation: 0, duration: 0.36, ease: "power3.out" }, V(68) - 0.3);
        // browser bar carrier with a crawling bar
        const bar = el("div", "abs", dark2, { left: "120px", top: "700px", width: "840px", height: "110px", borderRadius: "999px", background: "#1E2124", boxShadow: "inset 0 0 0 3px #3A3E43", zIndex: 10, overflow: "hidden" });
        const bSpin = el("div", "abs", bar, { left: "26px", top: "23px", width: "64px", height: "64px" }, `<svg viewBox="0 0 120 120" width="64" height="64"><circle cx="60" cy="60" r="44" fill="none" stroke="#F0F1F2" stroke-opacity="0.15" stroke-width="14"/><circle cx="60" cy="60" r="44" fill="none" stroke="#00DB33" stroke-width="14" stroke-linecap="round" stroke-dasharray="80 400"/></svg>`);
        const bTrack = el("div", "abs", bar, { left: "120px", right: "44px", top: "47px", height: "16px", borderRadius: "8px", background: "#2E3237" });
        const bFill = el("div", "abs", bTrack, { right: "0", top: "0", bottom: "0", width: "100%", borderRadius: "8px", background: G, transformOrigin: "100% 50%" });
        gsap.set(bFill, { scaleX: 0 }); gsap.set(bar, { scaleX: 0.2, opacity: 0 });
        TL.to(bar, { opacity: 1, scaleX: 1, duration: 0.4, ease: "back.out(1.8)" }, V(68) + 0.12);
        TL.to(bSpin, { rotation: 360 * 3, duration: V(73) - V(68), ease: "none" }, V(68) + 0.12);
        TL.to(bFill, { scaleX: 0.12, duration: V(73) - V(68), ease: "power1.out" }, V(68) + 0.3);
        // «يبطئ» stretches by kashida (callback to «ويستنى»)
        const ybt = el("div", "abs ar", dark2, { right: "120px", top: "830px", fontSize: "170px", color: GREY, zIndex: 10 }, "يبطئ");
        gsap.set(ybt, { opacity: 0, scale: 0.4, transformOrigin: "100% 60%" });
        TL.to(ybt, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, V(69));
        let lb = -1;
        frames(V(69) + 0.15, V(70) + 0.1, (t) => { const n = Math.round(9 * ramp(t, V(69) + 0.15, V(70) + 0.1)); if (n !== lb) { TL.set(ybt, { textContent: n ? "يبط" + "ـ".repeat(n) + "ئ" : "يبطئ" }, at(t)); lb = n; } });
        const tdr = el("div", "abs ar", dark2, { right: "122px", top: "1084px", fontFamily: PF, fontWeight: "600", fontSize: "66px", display: "flex", gap: "18px", zIndex: 10 });
        const tdW = [70, 71, 72].map(i => el("span", "", tdr, { color: L, display: "inline-block" }, WORDS[i][0]));
        tdW.forEach((w, k) => blurIn(w, V(70 + k), 0.28));
        const qm = el("div", "abs ar", dark2, { left: "150px", top: "950px", fontSize: "280px", color: G, zIndex: 10 }, "؟");
        gsap.set(qm, { y: -900, rotation: -30, opacity: 0 }); TL.set(qm, { opacity: 1 }, V(72) - 0.3);
        TL.to(qm, { y: 0, rotation: 8, duration: 0.42, ease: "bounce.out" }, V(72) - 0.3);
        // the bar becomes the green button
        const B14b = V(73) - 0.08;
        TL.to([iza, mwq, ybt, tdr, qm], { y: -160, opacity: 0, filter: "blur(10px)", duration: 0.28, ease: "power2.in", stagger: 0.025 }, B14b);
        TL.to([bSpin, bTrack], { opacity: 0, duration: 0.12 }, B14b);
        TL.to(bar, { top: 850, height: 210, backgroundColor: G, boxShadow: "inset 0 0 0 0px #3A3E43", duration: 0.42, ease: "expo.inOut" }, B14b);
        const atl = el("div", "abs ar", dark2, { right: "130px", top: "690px", fontFamily: PF, fontWeight: "600", fontSize: "70px", color: L, zIndex: 11 }, "اطلب");
        blurIn(atl, V(73));
        const bTx = el("div", "abs ar", dark2, { left: "120px", width: "840px", top: "862px", height: "190px", display: "flex", justifyContent: "center", alignItems: "center", gap: "30px", fontFamily: PF, fontWeight: "600", fontSize: "112px", color: K, zIndex: 11 });
        const fhs = el("span", "", bTx, { display: "inline-block" }, "فحص"), mjn = el("span", "", bTx, { display: "inline-block" }, "مجاني");
        popIn(fhs, V(74)); popIn(mjn, V(75), -3);
        const lmw = el("div", "abs ar", dark2, { right: "130px", top: "1110px", fontFamily: PF, fontWeight: "600", fontSize: "60px", color: GREY, zIndex: 11 }, "لموقعك،");
        blurIn(lmw, V(76));
        const CLICK5 = W(76) + 0.12;
        TL.to(cur, { x: 600, y: 990, duration: 0.5, ease: "power3.inOut" }, CLICK5 - 0.55);
        press(CLICK5); ripple(stage, 600, 990, CLICK5, L);
        TL.to(bar, { scale: 0.94, duration: 0.06 }, CLICK5 - 0.06); TL.to(bar, { scale: 1, duration: 0.2, ease: "back.out(3)" }, CLICK5);
        TL.to(bTx, { scale: 0.94, duration: 0.06 }, CLICK5 - 0.06); TL.to(bTx, { scale: 1, duration: 0.2, ease: "back.out(3)" }, CLICK5);
        // green wipe from the click, then the end panel rises
        const wipe = el("div", "abs", stage, { inset: "0", background: G, zIndex: 40, clipPath: "circle(0px at 600px 990px)" });
        TL.to(wipe, { clipPath: "circle(2300px at 600px 990px)", duration: 0.42, ease: "expo.in" }, CLICK5 + 0.06);
        const end = el("div", "abs", stage, { left: "0", top: "0", width: "1080px", height: "1920px", background: K, zIndex: 41, borderRadius: "80px 80px 0 0", overflow: "hidden" });
        gsap.set(end, { y: 1920 });
        const ENDT = V(77) - 0.12;
        TL.to(end, { y: 0, borderRadius: "0px 0px 0 0", duration: 0.5, ease: "expo.out" }, ENDT);
        TL.to(cur, { x: 1120, y: 1700, duration: 0.4, ease: "power2.in" }, ENDT);
        const logo = el("img", "abs", end, { left: "330px", top: "330px", width: "420px" }); logo.src = "assets/brand/logo-white.svg";
        blurIn(logo, ENDT + 0.25, 0.4);
        const line = (ids, top, size, gid = []) => {
          const l = el("div", "abs ar", end, { left: "0", width: "1080px", top: top + "px", display: "flex", justifyContent: "center", gap: "24px", fontFamily: PF, fontWeight: "600", fontSize: size + "px", color: L });
          return ids.map(i => { const s = el("span", "", l, { display: "inline-block", color: gid.includes(i) ? G : L, borderRadius: "22px", padding: "0 16px 6px", margin: "0 -16px" }, WORDS[i][0]); blurIn(s, V(i)); return s; });
        };
        line([77, 78, 79], 580, 104, [78, 79]);
        line([80, 81], 740, 104);
        const l3 = line([82, 83, 84], 900, 112);
        TL.to(l3[2], { backgroundColor: G, color: K, duration: 0.12 }, V(84) + 0.3);
        TL.fromTo(l3[2], { scale: 1.3 }, { scale: 1, duration: 0.4, ease: "back.out(3)", immediateRender: false }, V(84) + 0.3);
        const foot = el("div", "abs", end, { left: "0", width: "1080px", top: "1290px", display: "flex", justifyContent: "center", gap: "60px", fontFamily: PF, fontWeight: "500", fontSize: "40px", color: GREY, direction: "ltr" },
          "<span>www.fortunecode.org</span><span>+20 10 98066484</span>");
        blurIn(foot, V(84) + 0.5, 0.4);
        TL.to(end.children, { scale: 1.03, duration: D - V(84), ease: "sine.inOut" }, V(84) + 0.6);
