        // ═════════════ 009 extension: words 35..76 ═════════════
        // B5 camera follows the falling pan down into the dark world: «Google تقول» tag, stopwatch the cursor starts, ٥٣٪ counter, 100 visitor dots, 53 leave.
        // B6 a kettlebell weight «معرض صور ٣٤ ميجا» crashes in and knocks B5 out; the cursor clicks it, it morphs into a light green chip «١٤٠ كيلو» that floats up.
        // B7 video card on a curve, cursor plays it, readout «٢ ميجا» struck -> counter «٦١٣ كيلو».
        // B8 the cursor flicks the dark world away: the scale is back, now BALANCED; «نفس الفخامة، ونفس الجودة» , «على طول» smear slam + bolt zap.
        // B9 «موقعك ثقيل؟» drops heavy, comment bar types «انطباع», send -> end panel with logo + contact.
        const darkWrap = el("div", "", stage, { position: "absolute", inset: "0", zIndex: 10 });
        const dark = el("div", "", darkWrap, { position: "absolute", inset: "0", background: K, overflow: "hidden", borderRadius: "90px 90px 0 0" });
        gsap.set(dark, { y: 1920 });
        const labD = labels(dark, "#5E6369");
        // camera tilts down after the falling pan
        const CAM = PLUNGE + 0.12;
        TL.to(world, { y: -1920, duration: 0.62, ease: "expo.inOut" }, CAM);
        TL.to(dark, { y: 0, borderRadius: "0px 0px 0 0", duration: 0.62, ease: "expo.inOut" }, CAM);
        TL.to(cur, { y: 2100, duration: 0.5, ease: "power2.in" }, PLUNGE);
        // hidden reset of the light world while the dark covers it
        RESET = CAM + 0.9;
        TL.set(world, { y: 0 }, RESET);
        ev(RESET, -10, 13, "i");
        TL.set(lux, { x: 0, y: 0, opacity: 1, scale: 1 }, RESET);
        TL.set(scrib, { opacity: 0 }, RESET);

        // ═══ B5 «وجوجل تقول: بعد ثلاث ثواني، ثلاثه وخمسين بالميه من زوار الجوال يطلعون.» ═══
        const gRow = el("div", "abs ar", dark, { right: "120px", top: "262px", display: "flex", gap: "18px", alignItems: "center" });
        const gTag = el("div", "", gRow, { fontFamily: '"InterX", sans-serif', fontWeight: "700", fontSize: "46px", color: K, background: L, borderRadius: "999px", padding: "8px 30px 12px", direction: "ltr" }, "Google");
        const gSay = el("div", "px", gRow, { fontSize: "52px", color: L }, "تقول:");
        blurIn(gTag, V(35) + 0.12); blurIn(gSay, V(36));
        // stopwatch
        const SWc = [540, 720];
        const sw = el("div", "abs", dark, { left: (SWc[0] - 230) + "px", top: (SWc[1] - 230) + "px", width: "460px", height: "460px", transformOrigin: "50% 50%" });
        let ticks = ""; for (let k = 0; k < 12; k++) { const a = k * TAU / 12; ticks += `<line x1="${230 + Math.sin(a) * 178}" y1="${230 - Math.cos(a) * 178}" x2="${230 + Math.sin(a) * 196}" y2="${230 - Math.cos(a) * 196}" stroke="#5E6369" stroke-width="6" stroke-linecap="round"/>`; }
        sw.innerHTML = `<svg width="460" height="460" viewBox="0 0 460 460" overflow="visible"><rect x="196" y="-38" width="68" height="40" rx="12" fill="#F0F1F2"/><circle cx="230" cy="230" r="212" fill="#1E2124" stroke="#F0F1F2" stroke-width="14"/>${ticks}<circle id="arc" cx="230" cy="230" r="150" fill="none" stroke="#00DB33" stroke-width="22" stroke-linecap="round" transform="rotate(-90 230 230)"/></svg>`;
        const arc = sw.querySelector("#arc"), AL = TAU * 150;
        gsap.set(arc, { strokeDasharray: AL, strokeDashoffset: AL });
        const hand = el("div", "abs", sw, { left: "226px", top: "60px", width: "8px", height: "172px", borderRadius: "4px", background: L, transformOrigin: "50% 170px" });
        const swNum = el("div", "abs ar", sw, { left: "0", width: "460px", top: "96px", textAlign: "center", fontSize: "160px", color: L }, "٠");
        const swU = el("div", "abs ar px", sw, { left: "0", width: "460px", top: "290px", textAlign: "center", fontSize: "36px", color: GREY }, "ثواني");
        popIn(sw, V(37) - 0.15, -8);
        const SWT = V(38) - 0.02;
        curTo(560, 470, SWT - 0.5, 0.45); press(SWT); ripple(560, 470, SWT, L);
        TL.to(arc, { strokeDashoffset: 0, duration: W(39) - SWT, ease: "none" }, SWT);
        TL.to(hand, { rotation: 360, duration: W(39) - SWT, ease: "none" }, SWT);
        let ls = "٠"; frames(SWT, W(39), (t) => { const s = AR(Math.min(3, Math.floor(4 * ramp(t, SWT, W(39) + 0.02)))); if (s !== ls) { TL.set(swNum, { textContent: s }, at(t)); ls = s; } });
        TL.set(swNum, { textContent: "٣" }, W(39));
        // alarm: rings pulse, then the watch steps aside to the corner
        for (let k = 0; k < 2; k++) { const r = el("div", "abs", dark, { left: (SWc[0] - 230) + "px", top: (SWc[1] - 230) + "px", width: "460px", height: "460px", borderRadius: "50%", border: "6px solid #00DB33", opacity: 0 }); TL.fromTo(r, { opacity: 0.9, scale: 1 }, { opacity: 0, scale: 1.35 + k * 0.15, duration: 0.55, ease: "expo.out", immediateRender: false }, W(39) + k * 0.1); }
        TL.to(sw, { x: -310, y: -230, scale: 0.46, duration: 0.5, ease: "expo.inOut" }, W(39) + 0.02);
        TL.to(cur, { x: 1020, y: 1350, duration: 0.6, ease: "power2.inOut" }, W(39));
        // ٥٣٪ counter
        const pc = el("div", "abs ar", dark, { right: "120px", top: "520px", fontSize: "300px", color: G, transformOrigin: "100% 50%" }, "٠٪");
        zoomOut(pc, V(40) - 0.05, 2.2);
        let lp = ""; frames(V(40), W(42), (t) => { const n = Math.round(53 * expoOut(ramp(t, V(40), W(42)))); const s = AR(n) + "٪"; if (s !== lp) { TL.set(pc, { textContent: s }, at(t)); lp = s; } });
        TL.set(pc, { textContent: "٥٣٪" }, W(42));
        const src = el("div", "abs ar px", dark, { right: "120px", top: "1330px", fontSize: "28px", fontWeight: "500", color: GREY }, "المصدر: Google / DoubleClick، ٢٠١٦");
        blurIn(src, V(40) + 0.2);
        const zw = el("div", "abs ar px", dark, { right: "124px", top: "900px", fontSize: "54px", color: L, display: "flex", gap: "16px" });
        const zwW = [43, 44, 45].map(i => el("span", "", zw, { display: "inline-block" }, WORDS[i][0].replace(/[.،]/g, "")));
        zwW.forEach((w, k) => inkIn(w, V(43 + k) - 0.05, k === 2 ? G : L));
        // phone with 100 visitors
        const ph = el("div", "abs", dark, { left: "110px", top: "640px", width: "330px", height: "660px", borderRadius: "56px", background: "#1E2124", boxShadow: "inset 0 0 0 3px #3A3E43" });
        el("div", "abs", ph, { left: "115px", top: "18px", width: "100px", height: "26px", borderRadius: "13px", background: K });
        curveIn(ph, V(43) + 0.1, -700, 300, -18);
        const dots = [];
        for (let k = 0; k < 100; k++) {
          const c = k % 10, r = Math.floor(k / 10), d = el("div", "abs", ph, { left: (30 + c * 28) + "px", top: (110 + r * 50) + "px", width: "20px", height: "20px", borderRadius: "50%", background: L });
          gsap.set(d, { scale: 0 }); TL.to(d, { scale: 1, duration: 0.3, ease: "back.out(2)" }, V(44) + (c + r) * 0.018); dots.push(d);
        }
        // 53 of them leave (deterministic pick), on curves out of the top-left
        let sd2 = 11; const rnd2 = () => { sd2 = (sd2 * 9301 + 49297) % 233280; return sd2 / 233280; };
        const order = dots.map((d, k) => [rnd2(), k]).sort((a, b) => a[0] - b[0]).slice(0, 53).map(x => x[1]);
        order.forEach((k, j) => {
          const t = V(46) - 0.08 + j * 0.012, dx = -300 - rnd2() * 500, dy = -900 - rnd2() * 600;
          TL.to(dots[k], { backgroundColor: GREY, duration: 0.1 }, t);
          TL.to(dots[k], { motionPath: { path: [{ x: dx * 0.3, y: -120 }, { x: dx, y: dy }], curviness: 1.3 }, scale: 0.6, duration: 0.6, ease: "power2.in" }, t);
        });
        const ytl = el("div", "abs ar", dark, { right: "120px", top: "1010px", fontSize: "170px", color: L }, "يطلعون.");
        fit(ytl, 460); slamIn(ytl, V(46));

        // ═══ B6 «معرض صور كان اربعه وثلاثين ميجا، وصار ميه واربعين كيلو.» : the weight ═══
        const LAND = V(47) + 0.16;
        // B5 gets knocked out of frame by the falling weight
        [gRow, sw, pc, zw, ph, ytl, src].forEach((e, k) => TL.to(e, { y: "+=2300", rotation: (k % 2 ? 1 : -1) * (10 + k * 3), duration: 0.5, ease: "power2.in" }, LAND - 0.2 + k * 0.025));
        const wt = el("div", "abs", dark, { left: "0", top: "0", width: "1080px", height: "1920px" });
        const shadowW = el("div", "abs", wt, { left: "300px", top: "1140px", width: "480px", height: "50px", borderRadius: "50%", background: "rgba(0,0,0,0.55)", filter: "blur(10px)" });
        const handle = el("div", "abs", wt, { left: "400px", top: "560px", width: "280px", height: "200px", border: "44px solid #2E3237", borderBottom: "none", borderRadius: "140px 140px 0 0" });
        const body = el("div", "abs", wt, { left: "250px", top: "720px", width: "580px", height: "420px", borderRadius: "80px", background: "#2E3237", boxShadow: "inset 0 6px 0 rgba(255,255,255,0.08), 0 40px 80px rgba(0,0,0,0.5)", overflow: "hidden" });
        const wTitle = el("div", "abs ar px", body, { left: "0", width: "580px", top: "40px", textAlign: "center", fontSize: "46px", color: GREY }, "معرض صور");
        const oldR = el("div", "abs ar", body, { left: "0", width: "580px", top: "120px", display: "flex", justifyContent: "center", alignItems: "baseline", gap: "24px" });
        const oN = el("div", "", oldR, { fontSize: "220px", color: G, lineHeight: "1.05" }, "٤"), oU = el("div", "", oldR, { fontSize: "110px", color: L, lineHeight: "1.05" }, "ميجا");
        gsap.set([shadowW], { opacity: 0, scale: 0.3 }); gsap.set([handle, body], { y: -1500 }); gsap.set(oN, { opacity: 0 }); gsap.set(oU, { opacity: 0, scale: 2.2, transformOrigin: "100% 70%" });
        TL.to([handle, body], { y: 0, duration: 0.42, ease: "power3.in" }, LAND - 0.42);
        TL.to(shadowW, { opacity: 1, scale: 1, duration: 0.42, ease: "power3.in" }, LAND - 0.42);
        TL.to([handle, body], { scaleY: 0.92, duration: 0.07, ease: "power2.out", transformOrigin: "50% 100%" }, LAND);
        TL.to([handle, body], { scaleY: 1, duration: 0.4, ease: "back.out(2)" }, LAND + 0.07);
        TL.to(oN, { opacity: 1, duration: 0.05 }, V(50)); TL.fromTo(oN, { scale: 0.5 }, { scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, V(50));
        let lo = "٤"; frames(V(51), W(51), (t) => { const s = AR(Math.round(lerp(4, 34, expoOut(ramp(t, V(51), W(51)))))); if (s !== lo) { TL.set(oN, { textContent: s }, at(t)); lo = s; } });
        TL.set(oN, { textContent: "٣٤" }, W(51));
        TL.to(oU, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.out" }, V(52));
        TL.to([handle, body], { y: 26, duration: 0.09, ease: "power3.in" }, V(52) + 0.04); TL.to([handle, body], { y: 14, duration: 0.4, ease: "back.out(2)" }, V(52) + 0.13);
        TL.to(shadowW, { scaleX: 1.12, duration: 0.09 }, V(52) + 0.04);
        // «وصار» : the cursor clicks it, the weight becomes a light green chip
        const CK6 = V(53) + 0.02;
        TL.set(cur, { x: 1100, y: 1500 }, V(50)); curTo(700, 980, CK6 - 0.55, 0.5); press(CK6); ripple(700, 980, CK6);
        const strike6 = el("div", "abs", oldR, { left: "60px", right: "60px", top: "55%", height: "14px", borderRadius: "7px", background: L, transformOrigin: "100% 50%" });
        gsap.set(strike6, { scaleX: 0 });
        TL.to(strike6, { scaleX: 1, duration: 0.18, ease: "expo.out" }, CK6 + 0.02);
        TL.to(oldR, { y: 420, rotation: -8, opacity: 0, duration: 0.4, ease: "power2.in" }, CK6 + 0.18);
        TL.to(handle, { scale: 0, opacity: 0, y: 160, duration: 0.35, ease: "power2.in" }, CK6 + 0.05);
        TL.to(body, { left: 220, top: 760, width: 640, height: 300, borderRadius: 150, backgroundColor: G, duration: 0.5, ease: "expo.inOut" }, CK6 + 0.1);
        TL.to(wTitle, { color: K, width: 640, duration: 0.3 }, CK6 + 0.2);
        TL.to(shadowW, { opacity: 0.25, scaleX: 0.8, duration: 0.5 }, CK6 + 0.1);
        const newR = el("div", "abs ar", body, { left: "0", width: "640px", top: "88px", display: "flex", justifyContent: "center", alignItems: "baseline", gap: "22px" });
        const nN = el("div", "", newR, { fontSize: "170px", color: K, lineHeight: "1.05" }, "٠"), nU = el("div", "", newR, { fontSize: "92px", color: K, lineHeight: "1.05" }, "كيلو");
        gsap.set(nU, { opacity: 0, scale: 2, transformOrigin: "100% 70%" });
        zoomOut(nN, V(54) - 0.04, 2.4);
        let ln = "٠"; frames(V(54), W(55), (t) => { const p = t < V(55) ? 100 * expoOut(ramp(t, V(54), W(54))) : lerp(100, 140, expoOut(ramp(t, V(55), W(55)))); const s = AR(Math.round(p)); if (s !== ln) { TL.set(nN, { textContent: s }, at(t)); ln = s; } });
        TL.set(nN, { textContent: "١٤٠" }, W(55));
        TL.to(nU, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.out" }, V(56));
        // light now: it floats up and parks as a result tag
        TL.to(cur, { x: 1000, y: 1350, duration: 0.5, ease: "power2.inOut" }, CK6 + 0.3);
        TL.to(body, { y: -50, duration: 0.6, ease: "sine.inOut" }, V(56));
        TL.to(shadowW, { opacity: 0, duration: 0.4 }, V(56));
        gsap.set(body, { transformOrigin: "100% 0%" });
        TL.to(body, { x: 100, y: -488, scale: 0.42, transformOrigin: "100% 0%", duration: 0.55, ease: "expo.inOut" }, W(56) - 0.3);

        // ═══ B7 «وفيديو الخلفية من اثنين ميجا لستميه وتلطعش كيلو.» ═══
        const vc = el("div", "abs", dark, { left: "130px", top: "560px", width: "820px", height: "640px", borderRadius: "48px", background: "#1E2124", boxShadow: "inset 0 0 0 3px #3A3E43, 0 40px 80px rgba(0,0,0,0.5)", overflow: "hidden" });
        const vT = el("div", "abs ar px", vc, { right: "40px", top: "26px", fontSize: "46px", color: L, display: "flex", gap: "14px" });
        const vW1 = el("span", "", vT, {}, "فيديو"), vW2 = el("span", "", vT, { color: G }, "الخلفية");
        const thumb = el("div", "abs", vc, { left: "30px", top: "112px", width: "760px", height: "340px", borderRadius: "28px", overflow: "hidden" });
        const thImg = el("img", "", thumb, { width: "100%", height: "100%", objectFit: "cover", display: "block", transformOrigin: "60% 50%" }); thImg.src = "assets/img/t5.jpg";
        const play = el("div", "abs", thumb, { left: "315px", top: "105px", width: "130px", height: "130px", borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center" });
        const pTri = el("div", "abs", play, { left: "0", top: "0", width: "130px", height: "130px" }, `<svg width="130" height="130" viewBox="0 0 130 130"><path d="M52 38 L94 65 L52 92 Z" fill="#121416"/></svg>`);
        const pBars = el("div", "abs", play, { left: "0", top: "0", width: "130px", height: "130px" }, `<svg width="130" height="130" viewBox="0 0 130 130"><rect x="44" y="40" width="14" height="50" rx="4" fill="#121416"/><rect x="72" y="40" width="14" height="50" rx="4" fill="#121416"/></svg>`);
        gsap.set(pBars, { opacity: 0 });
        const track = el("div", "abs", vc, { left: "30px", top: "560px", width: "330px", height: "14px", borderRadius: "7px", background: "#3A3E43" });
        const tFill = el("div", "abs", track, { left: "0", top: "0", bottom: "0", width: "100%", borderRadius: "7px", background: G, transformOrigin: "0% 50%" });
        gsap.set(tFill, { scaleX: 0 });
        const rdO = el("div", "abs ar", vc, { right: "40px", top: "462px", display: "flex", alignItems: "baseline", gap: "18px" });
        const rN = el("div", "", rdO, { fontSize: "140px", color: G, lineHeight: "1.1" }, "٢"), rU = el("div", "", rdO, { fontSize: "80px", color: L, lineHeight: "1.1" }, "ميجا");
        const rdN = el("div", "abs ar", vc, { right: "40px", top: "462px", display: "flex", alignItems: "baseline", gap: "18px" });
        const r2N = el("div", "", rdN, { fontSize: "140px", color: G, lineHeight: "1.1" }, "٠"), r2U = el("div", "", rdN, { fontSize: "80px", color: L, lineHeight: "1.1" }, "كيلو");
        gsap.set([rN, rU], { opacity: 0, y: 40 }); gsap.set(r2U, { opacity: 0, scale: 2, transformOrigin: "100% 70%" });
        curveIn(vc, V(57) + 0.1, -1000, 400, -16);
        blurIn(vW1, V(57) + 0.05); inkIn(vW2, V(58), G);
        const CK7 = V(59);
        curTo(560, 790, CK7 - 0.5, 0.45); press(CK7); ripple(560, 790, CK7, L);
        TL.to(pTri, { opacity: 0, scale: 0.5, duration: 0.12 }, CK7); TL.to(pBars, { opacity: 1, duration: 0.12 }, CK7 + 0.06);
        TL.to(play, { scale: 0.7, opacity: 0.0, duration: 0.4, ease: "power2.in" }, CK7 + 0.5);
        TL.to(thImg, { scale: 1.22, x: -30, duration: 23.3 - CK7, ease: "none" }, CK7);
        TL.to(tFill, { scaleX: 1, duration: 23.3 - CK7, ease: "none" }, CK7);
        TL.to(cur, { x: 1000, y: 1360, duration: 0.6, ease: "power2.inOut" }, CK7 + 0.25);
        TL.to(rN, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, V(60));
        TL.to(rU, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, V(61));
        const strike7 = el("div", "abs", rdO, { left: "-10px", right: "-10px", top: "56%", height: "12px", borderRadius: "6px", background: L, transformOrigin: "100% 50%" });
        gsap.set(strike7, { scaleX: 0 });
        TL.to(strike7, { scaleX: 1, duration: 0.18, ease: "expo.out" }, V(62) - 0.08);
        TL.to(rdO, { y: 260, rotation: 10, opacity: 0, duration: 0.4, ease: "power2.in" }, V(62) + 0.08);
        zoomOut(r2N, V(62) + 0.1, 2.4);
        let lv = "٠"; frames(V(62) + 0.1, W(63), (t) => { const p = t < V(63) ? 600 * expoOut(ramp(t, V(62) + 0.1, W(62))) : lerp(600, 613, expoOut(ramp(t, V(63), W(63)))); const s = AR(Math.round(p)); if (s !== lv) { TL.set(r2N, { textContent: s }, at(t)); lv = s; } });
        TL.set(r2N, { textContent: "٦١٣" }, W(63));
        TL.to(r2U, { opacity: 1, scale: 1, duration: 0.3, ease: "power4.out" }, V(64));
        TL.fromTo(rdN, { scale: 1.12 }, { scale: 1, duration: 0.45, ease: "back.out(2)", immediateRender: false, transformOrigin: "100% 60%" }, V(64) + 0.03);
        TL.fromTo(body, { scale: 0.5 }, { scale: 0.42, duration: 0.4, ease: "back.out(2)", immediateRender: false }, V(64) + 0.1);

        // ═══ B8 the cursor flicks the dark world away: the same scale, now balanced ═══
        const GRAB = W(64) - 0.2, FLICK = W(64) - 0.1;
        TL.to(cur, { x: 920, y: 900, duration: 0.3, ease: "power2.inOut" }, GRAB - 0.32);
        TL.to(cur, { scale: 0.8, duration: 0.06 }, GRAB);
        TL.set(darkWrap, { filter: "drop-shadow(0 40px 50px rgba(18,20,22,0.45))" }, GRAB - 0.1);
        TL.to(dark, { clipPath: "inset(96px 60px 96px 60px round 70px)", scale: 0.95, duration: 0.22, ease: "power2.out", transformOrigin: "540px 960px" }, GRAB - 0.1);
        TL.to(dark, { x: -1500, y: 160, rotation: -17, duration: 0.42, ease: "power3.in" }, FLICK);
        TL.to(cur, { x: 520, y: 1000, duration: 0.3, ease: "power3.in" }, FLICK);
        TL.to(cur, { scale: 1, duration: 0.2 }, FLICK + 0.22);
        TL.set(darkWrap, { opacity: 0 }, FLICK + 0.44);
        ev(FLICK + 0.2, 0, 7);
        const ns = el("div", "abs ar px", world, { right: "120px", top: "262px", fontSize: "60px", color: GREY }, "نفس");
        const nfk = el("div", "abs ar", world, { right: "120px", top: "300px", fontSize: "200px", color: K }, "الفخامة،");
        blurIn(ns, V(65)); inkIn(nfk, V(66) - 0.06);
        lux.forEach((e, k) => TL.fromTo(e, { scale: 1.22 }, { scale: 1, duration: 0.45, ease: "back.out(2)", immediateRender: false }, V(66) + 0.1 + k * 0.08));
        const pj = el("div", "pill", world, { fontSize: "88px", background: G, color: K, padding: "0 44px 12px", zIndex: 8 }, "ونفس الجودة،"); ctr(pj, 520, 690);
        popIn(pj, V(67), -4);
        TL.fromTo(site, { scale: 1.12 }, { scale: 1, duration: 0.4, ease: "back.out(2)", immediateRender: false }, V(68));
        // «ويفتح على طول.»
        exitUp([ns, nfk, pj], V(69) - 0.3);
        const yf = el("div", "abs ar px", world, { right: "120px", top: "262px", fontSize: "60px", color: GREY }, "ويفتح");
        const atl = el("div", "abs ar", world, { right: "120px", top: "300px", fontSize: "210px", color: K }, "على طول.");
        fit(atl, 840);
        blurIn(yf, V(69) - 0.04); slamIn(atl, V(70));
        TL.fromTo(bolt, { scale: 1.35, backgroundColor: G }, { scale: 1, backgroundColor: K, duration: 0.5, ease: "back.out(2)", immediateRender: false }, V(70));
        const shine = el("div", "abs", site, { left: "-160px", top: "-20px", width: "90px", height: "240px", background: "rgba(240,241,242,0.55)", transform: "skewX(-18deg)" });
        TL.fromTo(shine, { x: 0 }, { x: 560, duration: 0.45, ease: "power2.inOut", immediateRender: false }, V(70) + 0.05);
        TL.to(world, { y: -18, duration: V(72) - V(65), ease: "sine.inOut" }, V(65));

        // ═══ B9 «موقعك ثقيل؟ اكتب انطباع بالتعليقات.» ═══
        exitUp([yf, atl], V(72) - 0.3);
        const mq = el("div", "abs ar", world, { right: "120px", top: "262px", fontSize: "190px", color: K }, "موقعك");
        const tq = el("div", "abs ar", world, { left: "110px", top: "478px", fontSize: "170px", color: K, transformOrigin: "50% 100%" }, "ثقيل؟");
        blurIn(mq, V(72) - 0.04);
        gsap.set(tq, { opacity: 0, y: -520 }); TL.set(tq, { opacity: 1 }, V(73) - 0.28);
        TL.to(tq, { y: 22, duration: 0.3, ease: "power3.in" }, V(73) - 0.28);
        TL.to(tq, { y: 0, scaleY: 1, duration: 0.4, ease: "back.out(2)" }, V(73) + 0.02);
        TL.fromTo(tq, { scaleY: 0.86 }, { scaleY: 1, duration: 0.35, ease: "back.out(2.5)", immediateRender: false }, V(73) + 0.02);
        ev(V(73) + 0.02, -9, 11); ev(V(74) + 0.3, 0, 8);
        // comment bar
        const hdr = el("div", "abs ar px", world, { left: "110px", width: "840px", top: "1086px", display: "flex", justifyContent: "space-between", fontSize: "52px", color: K, zIndex: 12 });
        const hA = el("span", "", hdr, {}, "اكتب"), hB = el("span", "", hdr, { color: GREY }, "بالتعليقات.");
        const cb = el("div", "abs", world, { left: "100px", top: "1176px", width: "880px", height: "150px", borderRadius: "75px", background: K, zIndex: 12, boxShadow: "0 30px 60px rgba(18,20,22,0.3)" });
        el("div", "abs", cb, { right: "24px", top: "24px", width: "102px", height: "102px", borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center" }, `<img src="assets/brand/mark.svg" style="width:60px;height:57px;filter:brightness(0)">`);
        const cIn = el("div", "abs", cb, { right: "150px", top: "28px", height: "94px", display: "flex", alignItems: "center", gap: "8px", direction: "rtl" });
        const cTx = el("div", "ar px", cIn, { fontSize: "64px", color: L, lineHeight: "94px" }, "");
        const caret = el("div", "", cIn, { width: "5px", height: "64px", background: G, borderRadius: "3px" });
        const send = el("div", "abs", cb, { left: "24px", top: "24px", width: "102px", height: "102px", borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center" }, `<svg viewBox="0 0 60 60" width="54" height="54"><path d="M46 30 L14 14 L20 30 L14 46 Z" fill="#121416" transform="rotate(180 30 30)"/></svg>`);
        gsap.set(cb, { y: 800, rotation: 4, opacity: 0 }); TL.set(cb, { opacity: 1 }, V(74) - 0.3); TL.to(cb, { y: 0, rotation: 0, duration: 0.55, ease: "expo.out" }, V(74) - 0.3);
        blurIn(hA, V(74)); blurIn(hB, V(76));
        let lc = null; const KW = "انطباع";
        frames(V(75), V(75) + 0.32, (t) => { const s = KW.slice(0, Math.max(1, Math.round(KW.length * ramp(t, V(75), V(75) + 0.3)))); if (s !== lc) { TL.set(cTx, { textContent: s }, at(t)); lc = s; } });
        TL.set(cTx, { textContent: KW }, V(75) + 0.33);
        TL.to(cTx, { color: G, duration: 0.15 }, V(75) + 0.36);
        gsap.set(caret, { opacity: 0 });
        for (let t = V(74), k = 0; t < W(76) + 0.1; t += 0.2, k++) TL.set(caret, { opacity: k % 2 ? 0 : 1 }, t);
        const SEND = W(76) + 0.02;
        curTo(230, 1265, SEND - 0.6, 0.5); press(SEND); ripple(230, 1251, SEND);
        TL.to(send, { scale: 0.86, duration: 0.06 }, SEND - 0.06); TL.to(send, { scale: 1, duration: 0.25, ease: "back.out(2)" }, SEND);
        // the comment flies up as posted, the end panel rises after it
        TL.to(cIn, { y: -420, x: -80, opacity: 0, duration: 0.45, ease: "power3.in" }, SEND + 0.06);
        const end = el("div", "abs", stage, { left: "0", top: "0", width: "1080px", height: "1920px", background: K, zIndex: 41, borderRadius: "90px 90px 0 0", overflow: "hidden" });
        gsap.set(end, { y: 1920 });
        const ENDT = SEND + 0.14;
        TL.to(end, { y: 0, borderRadius: "0px 0px 0 0", duration: 0.55, ease: "expo.out" }, ENDT);
        TL.to(cur, { x: 1120, y: 1800, duration: 0.4, ease: "power2.in" }, ENDT);
        const logo = el("img", "abs", end, { left: "320px", top: "430px", width: "440px" }); logo.src = "assets/brand/logo-white.svg";
        blurIn(logo, ENDT + 0.2, 0.5);
        const eL = el("div", "abs ar px", end, { left: "60px", width: "960px", top: "760px", display: "flex", justifyContent: "center", gap: "22px", fontSize: "80px", color: L });
        const eW = ["اكتب", "انطباع", "بالتعليقات"].map((s, k) => el("span", "", eL, { display: "inline-block", borderRadius: "20px", padding: "0 16px 8px", margin: "0 -16px" }, s));
        eW.forEach((w, k) => blurIn(w, ENDT + 0.3 + k * 0.06, 0.45));
        TL.to(eW[1], { backgroundColor: G, color: K, duration: 0.15 }, ENDT + 0.62);
        TL.fromTo(eW[1], { scale: 1.25 }, { scale: 1, duration: 0.45, ease: "back.out(2)", immediateRender: false }, ENDT + 0.62);
        const f1 = el("div", "abs px", end, { left: "60px", width: "960px", top: "1010px", textAlign: "center", fontSize: "52px", color: L, direction: "ltr" }, "www.fortunecode.org");
        const f2 = el("div", "abs px", end, { left: "60px", width: "960px", top: "1090px", textAlign: "center", fontSize: "52px", color: GREY, direction: "ltr" }, "+20 10 98066484");
        blurIn(f1, ENDT + 0.5, 0.45); blurIn(f2, ENDT + 0.58, 0.45);
        TL.to([logo, eL, f1, f2], { scale: 1.03, duration: D - ENDT - 0.6, ease: "sine.inOut" }, ENDT + 0.6);
