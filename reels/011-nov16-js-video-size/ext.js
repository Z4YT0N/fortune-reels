        // ═════════════ 011 extension: words 33..74 ═════════════
        // B5 spinner -> circle wipe into the dark world, the spinner grows into a stopwatch ring (0 -> 3 s), Google line in two-tone ink |
        // B5b ring parks top-left, 100 visitors, 53 leave, «٥٣٪» rolls, source line | B6 vertical bars: JS bar cut at 1.2 (1 MB chunk falls),
        // video bar squashed to 613 KB under the cursor, ghost outlines keep the "before" | B7 the dark world is swiped away: the phone
        // on the scale is light again, the progress bar races to 100 % | B8 question with the needle twitch, comment field types «انطباع», end panel.

        // hide the B4 words before the dark world leaves (they would be under it)
        TL.set([qbl, ttr], { opacity: 0 }, 12.9);

        // ═══ B5 the dark world opens from the phone's spinner ═══
        const SPR = camPos(spin, 12.2), scx = SPR.left + SPR.width / 2, scy = SPR.top + SPR.height / 2;
        gsap.set(dark, { clipPath: `circle(0px at ${scx}px ${scy}px)` });
        TL.to(dark, { clipPath: `circle(2300px at ${scx}px ${scy}px)`, duration: 0.45, ease: "power3.in" }, 12.18);
        labels(dark, "#5E6369");
        const RC = [510, 790], RR = 230, CIRC = TAU * RR;
        const ringG = el("div", "abs", dark, { left: (RC[0] - 270) + "px", top: (RC[1] - 270) + "px", width: "540px", height: "540px" });
        el("div", "abs", ringG, { left: "238px", top: "-26px", width: "64px", height: "34px", borderRadius: "10px", background: "#2E3237" });
        ringG.insertAdjacentHTML("beforeend", `<svg viewBox="0 0 540 540" width="540" height="540" style="position:absolute;left:0;top:0"><circle cx="270" cy="270" r="${RR}" fill="none" stroke="#2A2E32" stroke-width="30"/><circle id="rp" cx="270" cy="270" r="${RR}" fill="none" stroke="#00DB33" stroke-width="30" stroke-linecap="round" stroke-dasharray="${CIRC} ${CIRC}" stroke-dashoffset="${CIRC}" transform="rotate(-90 270 270)"/></svg>`);
        const rp = ringG.querySelector("#rp");
        const sec = el("div", "abs ar", ringG, { left: "0", width: "540px", top: "92px", textAlign: "center", fontSize: "290px", color: L, lineHeight: "1.2", transformOrigin: "50% 60%" }, "٠");
        const secL = el("div", "abs ar px", ringG, { left: "0", width: "540px", top: "366px", textAlign: "center", fontSize: "50px", color: GREY }, "ثواني");
        gsap.set(ringG, { x: scx - RC[0], y: scy - RC[1], scale: 0.17 });
        TL.to(ringG, { x: 0, y: 0, scale: 1, duration: 0.6, ease: "expo.out" }, 12.3);
        TL.to(rp, { attr: { "stroke-dashoffset": 0 }, duration: V(40) + 0.1 - 12.75, ease: "none" }, 12.75);
        [[13.3, "١"], [13.92, "٢"], [V(40), "٣"]].forEach(([t, s]) => { TL.set(sec, { textContent: s }, t); TL.fromTo(sec, { scale: 1.16 }, { scale: 1, duration: 0.35, ease: "back.out(2)", immediateRender: false }, t); });
        TL.to(sec, { color: G, duration: 0.15 }, V(40));
        // «وقوقل تقول:» quote pill slides in on a curve; the condition in two-tone ink
        const gq = el("div", "pill px", dark, { fontSize: "46px", background: DK2, color: L, padding: "6px 34px 12px", gap: "14px", boxShadow: "inset 0 0 0 3px #3A3E43" }, `<span style="font-family:ZainL;font-size:76px;color:#00DB33;line-height:0.6;margin-top:22px">"</span><span>قوقل تقول:</span>`);
        { const r = gq.getBoundingClientRect(); gq.style.left = (960 - r.width) + "px"; gq.style.top = "292px"; }
        gsap.set(gq, { x: 700, rotation: 8 });
        TL.to(gq, { motionPath: { path: [{ x: 300, y: -50 }, { x: 0, y: 0 }], curviness: 1.4 }, rotation: -2, duration: 0.45, ease: "power3.out" }, V(33) - 0.12);
        const cond = inkLine(dark, [35, 36, 37, 38, 39], { right: "120px", top: "404px", fontSize: "54px" });
        gsap.set(cond.l, { opacity: 0 }); TL.set(cond.l, { opacity: 1 }, V(35) - 0.05);
        const onM = el("div", "pill px", dark, { fontSize: "46px", background: L, color: K, padding: "4px 32px 10px", gap: "12px" },
          `<svg viewBox="0 0 30 48" width="26" height="42"><rect x="3" y="3" width="24" height="42" rx="6" fill="none" stroke="#121416" stroke-width="5"/></svg><span>على الجوال،</span>`);
        ctr(onM, RC[0], 1110); popIn(onM, V(42), -3);
        const src = el("div", "abs ar px", dark, { left: "0", width: "1020px", textAlign: "center", top: "1372px", fontSize: "26px", fontWeight: "500", color: GREY }, "المصدر: Google / DoubleClick، ٢٠١٦");
        blurIn(src, 13.0, 0.4);

        // ═══ B5b «اكثر من نص الزوار يطلعون.» the ring parks, 100 visitors, 53 leave ═══
        const OUT5 = V(44) - 0.2;
        exitUp([gq, cond.l, onM], OUT5);
        TL.to(ringG, { x: -330, y: -420, scale: 0.36, duration: 0.5, ease: "expo.inOut" }, OUT5);
        const pctB = el("div", "abs ar", dark, { right: "120px", top: "272px", fontSize: "230px", color: G, display: "flex", alignItems: "baseline", transformOrigin: "100% 50%" });
        const pctN = el("span", "", pctB, {}, "٠٪");
        zoomOut(pctB, V(44) + 0.05, 2.2);
        counter(pctN, 0, 53, V(44) + 0.05, W(46) + 0.1, v => AR(Math.round(v)) + "٪");
        const who = inkLine(dark, [44, 45, 46, 47, 48], { right: "120px", top: "578px", fontSize: "54px" }, L, [46]);
        gsap.set(who.l, { opacity: 0 }); TL.set(who.l, { opacity: 1 }, V(44) - 0.05);
        const people = [], GX = 210, GY = 690, P = 62;
        for (let k = 0; k < 100; k++) {
          const c = k % 10, r = Math.floor(k / 10);
          const p = el("div", "abs", dark, { left: (GX + c * P) + "px", top: (GY + r * P) + "px", width: "44px", height: "52px" },
            `<div style="position:absolute;left:12px;top:0;width:20px;height:20px;border-radius:50%;background:currentColor"></div><div style="position:absolute;left:2px;top:24px;width:40px;height:26px;border-radius:20px 20px 6px 6px;background:currentColor"></div>`);
          p.style.color = L; gsap.set(p, { opacity: 0, y: 30 }); p._r = hash(k + 3); people.push(p);
        }
        TL.to(people, { opacity: 1, y: 0, duration: 0.4, ease: "expo.out", stagger: { each: 0.004, from: "start" } }, V(45));
        const leave = people.slice().sort((a, b) => a._r - b._r).slice(0, 53);
        TL.to(leave, { color: "#5E6369", duration: 0.2, stagger: 0.002 }, V(47));
        TL.to(leave, { x: () => 620 + 0, y: 120, rotation: 25, opacity: 0, duration: 0.5, ease: "power2.in", stagger: { each: 0.006, from: "end" } }, V(48) - 0.05);

        // ═══ B6 «فاشتغلنا عليه.» bars ═══
        const OUT6 = V(49) - 0.18;
        const stay = people.filter(p => !leave.includes(p));
        TL.to([ringG, pctB, who.l, src, ...stay], { y: "+=160", opacity: 0, duration: 0.38, ease: "power2.in" }, OUT6);
        const fsh = el("div", "abs ar", dark, { right: "120px", top: "278px", fontSize: "190px", color: L }, "فاشتغلنا"); fit(fsh, 640);
        zoomOut(fsh, V(49) + 0.02, 2.4);
        const ali = el("div", "abs ar px", dark, { right: "120px", top: "548px", fontSize: "60px", color: G }, "عليه.");
        blurIn(ali, V(50));
        const BASE = 1300, MB = 230, BW = 200, XJ = 230, XV = 590;
        const axis = el("div", "abs", dark, { left: "170px", top: BASE + "px", width: "680px", height: "4px", background: "#3A3E43", transformOrigin: "100% 50%" });
        gsap.set(axis, { scaleX: 0 }); TL.to(axis, { scaleX: 1, duration: 0.4, ease: "expo.out" }, V(49) + 0.1);
        const bar = (x, h, col = "#4A4F55") => el("div", "abs", dark, { left: x + "px", top: (BASE - h) + "px", width: BW + "px", height: h + "px", background: col, borderRadius: "22px 22px 6px 6px", transformOrigin: "50% 100%" });
        const ghost = (x, h) => { const g = el("div", "abs", dark, { left: x + "px", top: (BASE - h) + "px", width: BW + "px", height: h + "px", border: "4px dashed #5E6369", borderRadius: "22px 22px 6px 6px" }); gsap.set(g, { opacity: 0 }); return g; };
        const ghJ = ghost(XJ, 2.2 * MB), ghV = ghost(XV, 2 * MB);
        const jLow = bar(XJ, 1.2 * MB), jTop = el("div", "abs", dark, { left: XJ + "px", top: (BASE - 2.2 * MB) + "px", width: BW + "px", height: MB + "px", background: "#4A4F55", borderRadius: "22px 22px 0 0", transformOrigin: "50% 100%", display: "flex", alignItems: "center", justifyContent: "center" });
        const chunkL = el("div", "ar", jTop, { fontSize: "62px", color: L }, "١ ميجا"); gsap.set(chunkL, { opacity: 0 });
        jLow.style.borderRadius = "0 0 6px 6px";
        const vBar = bar(XV, 2 * MB);
        const nameJ = el("div", "abs", dark, { left: XJ + "px", width: BW + "px", top: (BASE + 16) + "px", textAlign: "center", fontFamily: '"InterX"', fontWeight: "700", fontSize: "30px", color: GREY }, "JavaScript");
        const nameV = el("div", "abs ar px", dark, { left: (XV - 20) + "px", width: (BW + 40) + "px", top: (BASE + 10) + "px", textAlign: "center", fontSize: "34px", color: GREY }, "فيديو الخلفية");
        const valL = (x, h, s, col) => { const e = el("div", "abs ar", dark, { left: (x - 40) + "px", width: (BW + 80) + "px", top: (BASE - h - 116) + "px", textAlign: "center", fontSize: "80px", color: col }, s); return e; };
        const vJ0 = valL(XJ, 2.2 * MB, "٢٫٢ ميجا", L), vV0 = valL(XV, 2 * MB, "٢ ميجا", L);
        // bars grow from the baseline (the JS top chunk grows with its column)
        gsap.set([jLow, vBar], { scaleY: 0 }); gsap.set(jTop, { scaleY: 0, y: 1.2 * MB });
        TL.to(jLow, { scaleY: 1, duration: 0.5, ease: "expo.out" }, V(49) + 0.25);
        TL.to(jTop, { scaleY: 1, y: 0, duration: 0.6, ease: "expo.out" }, V(49) + 0.25);
        TL.to(vBar, { scaleY: 1, duration: 0.6, ease: "expo.out" }, V(49) + 0.37);
        blurIn(nameJ, V(49) + 0.3); blurIn(nameV, V(49) + 0.4);
        blurIn(vJ0, V(50) + 0.05, 0.3); blurIn(vV0, V(50) + 0.15, 0.3);
        TL.to(cur, { x: 980, y: 1100, duration: 0.5, ease: "power2.out" }, V(49));

        // ═══ «الجافاسكربت، شلنا منه ميجا كاملة.» cut line, the 1 MB chunk falls ═══
        exitUp([fsh, ali], V(51) - 0.28);
        const jsT = el("div", "abs ar px", dark, { right: "120px", top: "276px", fontSize: "58px", color: L }, "الجافاسكربت،");
        riseIn(jsT, V(51));
        const sel = el("div", "abs", dark, { left: (XJ - 14) + "px", top: (BASE - 2.2 * MB - 14) + "px", width: (BW + 28) + "px", height: (2.2 * MB + 28) + "px", border: "4px solid #00DB33", borderRadius: "30px" });
        [[-11, -11], [-11, null], [null, -11], [null, null]].forEach(([l, tp]) => el("div", "abs", sel, { width: "18px", height: "18px", background: G, borderRadius: "4px", left: l === null ? "auto" : l + "px", right: l === null ? "-11px" : "auto", top: tp === null ? "auto" : tp + "px", bottom: tp === null ? "-11px" : "auto" }));
        gsap.set(sel, { opacity: 0, scale: 1.06 }); TL.to(sel, { opacity: 1, scale: 1, duration: 0.3, ease: "expo.out" }, V(51) + 0.2);
        const CUTY = BASE - 1.2 * MB;
        const cut = el("div", "abs", dark, { left: (XJ - 40) + "px", top: (CUTY - 3) + "px", width: (BW + 80) + "px", height: "6px", backgroundImage: "repeating-linear-gradient(90deg,#00DB33 0 18px,transparent 18px 30px)", transformOrigin: "100% 50%" });
        gsap.set(cut, { scaleX: 0 }); TL.to(cut, { scaleX: 1, duration: 0.3, ease: "power3.out" }, V(51) + 0.5);
        const shl = el("div", "abs ar", dark, { right: "120px", top: "336px", fontSize: "200px", color: G }, "شلنا");
        slamIn(shl, V(52));
        const shlW = measure("شلنا", 200);
        const mnh = el("div", "abs ar px", dark, { right: (120 + shlW + 30) + "px", top: "448px", fontSize: "60px", color: L }, "منه");
        blurIn(mnh, V(53), 0.28);
        const mjk = el("div", "abs ar", dark, { right: "120px", top: "560px", fontSize: "104px", color: L }, "ميجا كاملة."); fit(mjk, 480);
        riseIn(mjk, V(54) - 0.04, 0.38);
        // the cursor slices along the cut line (RTL: right to left)
        TL.to(cur, { x: XJ + BW + 50, y: CUTY - 6, duration: 0.42, ease: "power3.inOut" }, V(52) - 0.45);
        TL.to(cur, { scale: 0.86, duration: 0.06 }, V(52) - 0.04);
        TL.to(cur, { x: XJ - 50, duration: 0.42, ease: "power2.inOut" }, V(52));
        TL.to(cur, { scale: 1, duration: 0.2 }, V(52) + 0.42);
        TL.to(cur, { x: 1000, y: 1200, duration: 0.5, ease: "power2.inOut" }, V(54) + 0.5);
        TL.to(chunkL, { opacity: 1, duration: 0.15 }, V(54) - 0.1);
        TL.to(sel, { opacity: 0, duration: 0.2 }, V(54));
        TL.to(ghJ, { opacity: 1, duration: 0.25 }, V(54) + 0.1);
        TL.to(jTop, { y: -16, rotation: -3, duration: 0.12, ease: "power2.out" }, V(54) + 0.04);
        TL.to(jTop, { motionPath: { path: [{ x: -110, y: 120 }, { x: -380, y: 1100 }], curviness: 1.2 }, rotation: -58, duration: 0.7, ease: "power2.in" }, V(54) + 0.16);
        TL.to(cut, { opacity: 0, duration: 0.2 }, V(54) + 0.2);
        TL.to(jLow, { backgroundColor: G, duration: 0.25 }, V(55));
        TL.to(jLow, { scaleY: 0.96, duration: 0.08 }, V(54) + 0.2); TL.to(jLow, { scaleY: 1, duration: 0.35, ease: "back.out(2)" }, V(54) + 0.28);
        // the label follows the bar down: ٢٫٢ -> ١٫٢ ميجا, the old value stays struck above the ghost
        const vJ1 = valL(XJ, 1.2 * MB, "", G); const vJ1n = el("span", "", vJ1, {}, "٢٫٢"); el("span", "", vJ1, {}, " ميجا");
        gsap.set(vJ1, { opacity: 0, y: -MB });
        TL.to(vJ0, { color: "#5E6369", scale: 0.7, duration: 0.3 }, V(54) + 0.2);
        const stJ = el("div", "abs", vJ0, { left: "60px", right: "60px", top: "54%", height: "6px", background: "#5E6369", transformOrigin: "100% 50%" }); gsap.set(stJ, { scaleX: 0 });
        TL.to(stJ, { scaleX: 1, duration: 0.2 }, V(54) + 0.4);
        TL.set(vJ1, { opacity: 1 }, V(54) + 0.2);
        TL.to(vJ1, { y: 0, duration: 0.5, ease: "expo.inOut" }, V(54) + 0.2);
        counter(vJ1n, 2.2, 1.2, V(54) + 0.2, V(55) + 0.3, one);

        // ═══ «والفيديو، صار ستميه وتلطعش كيلو.» the cursor presses the video bar down to 613 KB ═══
        exitUp([jsT, shl, mnh, mjk], V(56) - 0.3);
        const vid = inkLine(dark, [56, 57], { right: "120px", top: "276px", fontSize: "58px" });
        gsap.set(vid.l, { opacity: 0 }); TL.set(vid.l, { opacity: 1 }, V(56) - 0.05);
        const kB = el("div", "abs ar", dark, { right: "120px", top: "340px", display: "flex", alignItems: "baseline", gap: "24px" });
        const kN = el("div", "", kB, { fontSize: "220px", color: G, lineHeight: "1.2", transformOrigin: "50% 80%" }, "٠");
        const kU = el("div", "", kB, { fontSize: "120px", color: L, lineHeight: "1.2", transformOrigin: "100% 70%" }, "كيلو");
        gsap.set(kN, { opacity: 0 }); gsap.set(kU, { opacity: 0, scale: 2.2 });
        TL.set(kN, { opacity: 1 }, V(58));
        counter(kN, 0, 613, V(58), W(59), v => AR(Math.round(v)));
        TL.to(kU, { opacity: 1, scale: 1, duration: 0.22, ease: "power4.out" }, V(60));
        TL.fromTo(kN, { scaleX: 1.15, scaleY: 1.24 }, { scaleX: 1, scaleY: 1, duration: 0.55, ease: "elastic.out(1, 0.5)", immediateRender: false }, V(60) + 0.03);
        const VK = 0.613 * MB, VTOP = BASE - 2 * MB;
        TL.to(cur, { x: XV + BW / 2, y: VTOP - 4, duration: 0.45, ease: "power3.inOut" }, V(56));
        TL.to(cur, { scale: 0.84, duration: 0.08 }, V(57) - 0.06);
        TL.to(ghV, { opacity: 1, duration: 0.25 }, V(57));
        TL.to(vBar, { scaleY: VK / (2 * MB), backgroundColor: G, duration: 0.62, ease: "back.out(1.3)" }, V(57));
        TL.to(cur, { y: BASE - VK - 4, duration: 0.62, ease: "back.out(1.3)" }, V(57));
        TL.to(cur, { scale: 1, duration: 0.2 }, V(57) + 0.7);
        TL.to(cur, { x: 980, y: 1150, duration: 0.5, ease: "power2.inOut" }, V(58) + 0.4);
        TL.to(vV0, { color: "#5E6369", scale: 0.7, duration: 0.3 }, V(57) + 0.1);
        const stV = el("div", "abs", vV0, { left: "80px", right: "80px", top: "54%", height: "6px", background: "#5E6369", transformOrigin: "100% 50%" }); gsap.set(stV, { scaleX: 0 });
        TL.to(stV, { scaleX: 1, duration: 0.2 }, V(57) + 0.3);
        const vV1 = valL(XV, VK, "٦١٣ كيلو", G); gsap.set(vV1, { fontSize: "74px" }); blurIn(vV1, V(60) + 0.1, 0.3);

        // ═══ B7 «نفس الموقع، بس اخف بكثير.» the dark world is swiped away; the phone is light again ═══
        const GRAB = V(61) - 0.24, FLICK = V(61) - 0.12;
        TL.set(cam, { scale: 1, x: 0 }, GRAB - 0.3);
        TL.set([spin], { opacity: 0 }, GRAB - 0.3); TL.set(play, { opacity: 1 }, GRAB - 0.3);
        const lJ = mkFile(sink, 168, 452, "js", false), lV = mkFile(sink, 300, 452, "mp4", false);
        gsap.set([lJ, lV], { opacity: 0, scale: 0.62, transformOrigin: "50% 100%" }); TL.set([lJ, lV], { opacity: 1 }, GRAB - 0.3);
        gsap.set(lJ, { rotation: -6 }); gsap.set(lV, { rotation: 5 });
        TL.to(cur, { x: 930, y: 1000, duration: 0.3, ease: "power2.inOut" }, GRAB - 0.32);
        TL.to(cur, { scale: 0.8, duration: 0.06 }, GRAB);
        TL.set(darkWrap, { filter: "drop-shadow(0 40px 50px rgba(18,20,22,0.45))" }, GRAB);
        TL.set(dark, { clipPath: "inset(0px 0px 0px 0px round 0px)" }, GRAB);
        TL.to(dark, { clipPath: "inset(96px 60px 96px 60px round 70px)", scale: 0.95, duration: 0.2, ease: "power2.out", transformOrigin: "540px 960px" }, GRAB + 0.01);
        TL.to(dark, { x: -1500, y: 160, rotation: -17, duration: 0.42, ease: "power3.in" }, FLICK);
        TL.to(cur, { x: 430, y: 990, duration: 0.3, ease: "power3.in" }, FLICK);
        TL.to(cur, { scale: 1, duration: 0.2 }, FLICK + 0.22);
        TL.set(darkWrap, { opacity: 0 }, FLICK + 0.44);
        // lighter: the platform springs up, the needle swings back
        const UP = FLICK + 0.3;
        TL.to(sink, { y: -8, duration: 0.3, ease: "power2.out" }, UP); TL.to(sink, { y: 0, duration: 0.4, ease: "back.out(2)" }, UP + 0.3);
        TL.to(needle, { rotation: -52, duration: 0.7, ease: "back.out(1.6)" }, UP);
        TL.fromTo([lJ, lV], { y: 0 }, { y: -36, duration: 0.3, ease: "power2.out", yoyo: true, repeat: 1, immediateRender: false, stagger: 0.06 }, UP);
        // «نفس الموقع،» pill, «بس» then «اخف» like a feather, «بكثير.»
        const nfs = el("div", "pill px", world, { fontSize: "58px", background: L, color: K, padding: "2px 36px 10px", boxShadow: "inset 0 0 0 4px #121416" }, "نفس الموقع،");
        { const r = nfs.getBoundingClientRect(); nfs.style.left = (960 - r.width) + "px"; nfs.style.top = "500px"; }
        popIn(nfs, V(61) + 0.1, -3);
        const bs = el("div", "abs ar px", world, { right: "124px", top: "636px", fontSize: "58px", color: GREY }, "بس");
        blurIn(bs, V(63), 0.28);
        const akhf = el("div", "abs ar", world, { right: "120px", top: "690px", fontSize: "270px", color: G, transformOrigin: "100% 60%" }, "اخف"); fit(akhf, 440);
        gsap.set(akhf, { opacity: 0, y: 260, rotation: 8 }); TL.to(akhf, { opacity: 1, duration: 0.12 }, V(64) - 0.06);
        TL.to(akhf, { y: 0, rotation: 0, duration: 0.5, ease: "expo.out" }, V(64) - 0.06);
        TL.to(akhf, { y: -34, rotation: -3, duration: 1.1, ease: "sine.inOut" }, V(64) + 0.44);
        const bkth = el("div", "abs ar px", world, { right: "124px", top: "1060px", fontSize: "60px", color: K }, "بكثير.");
        blurIn(bkth, V(65), 0.3);
        // the progress bar RACES to 100 %, the page lands
        const RACE = V(63) - 0.04;
        TL.to(pfill, { scaleX: 1, duration: 0.42, ease: "power3.inOut" }, RACE);
        const p100 = el("div", "abs px", scr, { left: "0", width: "100%", bottom: "52px", textAlign: "center", fontSize: "26px", color: K, direction: "rtl" }, "١٠٠٪");
        gsap.set(p100, { opacity: 0 }); TL.to(p100, { opacity: 1, duration: 0.15 }, RACE + 0.36);
        TL.to(hero, { backgroundColor: K, duration: 0.2 }, RACE + 0.3);
        const play2 = el("div", "abs", hero, { left: "50%", top: "50%", width: "64px", height: "64px", margin: "-32px 0 0 -32px" }, `<svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="30" fill="#00DB33"/><path d="M26 20 L46 32 L26 44 Z" fill="#121416"/></svg>`);
        gsap.set(play2, { opacity: 0, scale: 0.6 }); TL.to(play2, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" }, RACE + 0.36);
        TL.to(lines, { backgroundColor: "#8B9096", duration: 0.15, stagger: 0.04 }, RACE + 0.38);
        TL.to(blocks[0], { backgroundColor: DG, duration: 0.15 }, RACE + 0.5); TL.to(blocks[1], { backgroundColor: K, duration: 0.15 }, RACE + 0.55);

        // ═══ B8 «تبي تعرف وش اللي مثقل موقعك؟» ═══
        exitUp([nfs, bs, akhf, bkth], V(66) - 0.3);
        const ask = inkLine(world, [66, 67, 68, 69], { right: "120px", top: "520px", fontSize: "56px" }, K);
        ask.ws.forEach(w => w.style.color = "#B4B9BE");
        gsap.set(ask.l, { opacity: 0 }); TL.set(ask.l, { opacity: 1 }, V(66) - 0.05);
        const mth = el("div", "abs ar", world, { right: "120px", top: "580px", fontSize: "230px", color: K }, "مثقل"); fit(mth, 430);
        zoomOut(mth, V(70) - 0.02, 2.4);
        const mwq = el("div", "abs ar", world, { right: "120px", top: "880px", fontSize: "170px", color: G }, "موقعك؟"); fit(mwq, 440);
        riseIn(mwq, V(71) - 0.04, 0.4);
        TL.to(needle, { rotation: 30, duration: 0.4, ease: "back.out(2)" }, V(70) + 0.05);
        TL.to(sink, { y: 12, duration: 0.25, ease: "power2.out" }, V(70) + 0.05);

        // ═══ «اكتب انطباع بالتعليقات.» the comment field ═══
        const OUT8 = V(72) - 0.24;
        exitUp([ask.l, mth, mwq], OUT8);
        TL.to(scaleG, { y: 700, rotation: -6, opacity: 0, duration: 0.4, ease: "power2.in" }, OUT8);
        const akt = el("div", "abs ar px", world, { left: "0", width: "1020px", textAlign: "center", top: "470px", fontSize: "62px", color: GREY }, "اكتب");
        riseIn(akt, V(72));
        const intb = el("div", "abs ar", world, { left: "0", width: "1020px", textAlign: "center", top: "520px", fontSize: "250px", color: G }, "انطباع");
        zoomOut(intb, V(73) - 0.02, 2.4);
        const cbar = el("div", "abs", world, { left: "90px", top: "940px", width: "840px", height: "136px", borderRadius: "68px", background: K, boxShadow: "0 24px 50px rgba(18,20,22,0.3)" });
        const av = el("div", "abs", cbar, { right: "22px", top: "22px", width: "92px", height: "92px", borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center" }, `<img src="assets/brand/mark.svg" style="width:54px;height:51px;filter:brightness(0)">`);
        const ph0 = el("div", "abs ar px", cbar, { right: "140px", top: "34px", fontSize: "44px", fontWeight: "500", color: "#5E6369" }, "أضف تعليقًا…");
        const typ = el("div", "abs ar px", cbar, { right: "140px", top: "26px", fontSize: "54px", color: L, display: "flex", alignItems: "center", gap: "6px" });
        const typT = el("span", "", typ, {}, ""); const caret = el("span", "", typ, { width: "5px", height: "56px", background: G, borderRadius: "3px", display: "inline-block" });
        const send = el("div", "abs", cbar, { left: "22px", top: "22px", width: "92px", height: "92px", borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center" },
          `<svg viewBox="0 0 48 48" width="46" height="46"><path d="M40 24 L8 8 L14 24 L8 40 Z" fill="#121416" transform="rotate(180 24 24)"/></svg>`);
        riseIn(cbar, V(72) + 0.02, 0.45);
        gsap.set(caret, { opacity: 0 });
        TL.set(ph0, { opacity: 0 }, V(73)); TL.set(caret, { opacity: 1 }, V(73));
        typeOn(typT, "انطباع", V(73), W(73) + 0.05);
        for (let t = W(73) + 0.2, k = 0; t < 28.6; t += 0.2, k++) TL.set(caret, { opacity: k % 2 ? 1 : 0 }, t);
        const bt = el("div", "abs ar px", world, { left: "0", width: "1020px", textAlign: "center", top: "1110px", fontSize: "56px", color: K }, "بالتعليقات.");
        blurIn(bt, V(74));
        const SEND = 28.38;
        TL.to(cur, { x: 160, y: 1010, duration: 0.5, ease: "power3.inOut" }, SEND - 0.55);
        press(SEND); ripple(158, 1008, SEND, K);
        TL.to(send, { scale: 0.88, duration: 0.06 }, SEND - 0.06); TL.to(send, { scale: 1, duration: 0.25, ease: "back.out(2)" }, SEND);

        // ═══ end panel: logo, CTA, contact ═══
        const end = el("div", "abs", stage, { left: "0", top: "0", width: "1080px", height: "1920px", background: K, zIndex: 41, borderRadius: "80px 80px 0 0", overflow: "hidden" });
        gsap.set(end, { y: 1920 });
        const ENDT = SEND + 0.2;
        TL.to(end, { y: 0, borderRadius: "0px 0px 0 0", duration: 0.5, ease: "expo.out" }, ENDT);
        TL.to(cur, { x: 1120, y: 1700, duration: 0.4, ease: "power2.in" }, ENDT);
        const endIn = el("div", "abs", end, { inset: "0" });
        const logo = el("img", "abs", endIn, { left: "290px", top: "430px", width: "440px" }); logo.src = "assets/brand/logo-white.svg";
        blurIn(logo, ENDT + 0.2, 0.4);
        const eL = el("div", "abs ar", endIn, { left: "0", width: "1020px", top: "700px", display: "flex", justifyContent: "center", alignItems: "baseline", gap: "26px" });
        el("span", "px", eL, { fontSize: "64px", color: L }, "اكتب");
        el("span", "", eL, { fontSize: "150px", color: G }, "انطباع");
        el("span", "px", eL, { fontSize: "64px", color: L }, "بالتعليقات");
        blurIn(eL, ENDT + 0.35, 0.4);
        const foot = el("div", "abs px", endIn, { left: "0", width: "1020px", top: "1010px", textAlign: "center", fontSize: "48px", fontWeight: "600", color: L, direction: "ltr", lineHeight: "1.6" }, "www.fortunecode.org<br>+20 10 98066484");
        blurIn(foot, ENDT + 0.5, 0.4);
        TL.fromTo(endIn, { scale: 1 }, { scale: 1.03, duration: D - ENDT, ease: "sine.inOut", immediateRender: false }, ENDT);
