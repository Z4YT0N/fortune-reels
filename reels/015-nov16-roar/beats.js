        // ═══ B1 hook (K0, S1): paper scrap «موقع شركة / كبيرة،» is already dropping on frame 0 ═══
        const n1 = scrap(POS.n1[0], POS.n1[1], 470, 236, -3);
        const n1a = word(n1, "موقع شركة", { right: (1080 - POS.n1[0] - 470 + 34) + "px", top: (POS.n1[1] + 12) + "px", fontSize: "84px" });
        const n1b = word(n1, "كبيرة،", { right: (1080 - POS.n1[0] - 470 + 34) + "px", top: (POS.n1[1] + 112) + "px", fontSize: "92px", color: K });
        fit(n1a, 400);
        gsap.set(n1, { y: -40, rotation: -8 }); TL.to(n1, { y: 0, rotation: -3, duration: 0.5, ease: "back.out(1.4)" }, 0);
        gsap.set(n1b, { opacity: 0, filter: "blur(8px)", y: 14 }); TL.to(n1b, { opacity: 1, filter: "blur(0px)", y: 0, duration: 0.3, ease: "expo.out" }, V(2));
        const hlK = el("div", "abs", n1, { left: (POS.n1[0] + 470 - 34 - measure("كبيرة،", 92) - 10) + "px", top: (POS.n1[1] + 196) + "px", height: "14px", width: (measure("كبيرة،", 92) + 20) + "px", background: G, transformOrigin: "100% 50%" });
        gsap.set(hlK, { scaleX: 0 }); TL.to(hlK, { scaleX: 1, duration: 0.16, ease: "power2.out" }, V(2) + 0.22);
        live(n1, 0.55, V(6), 1.03);
        TL.to(n1, { x: 60, y: -40, rotation: 6, opacity: 0, filter: "blur(10px)", duration: 0.4, ease: "power2.in" }, V(7) - 0.3);

        // «جوالك»: a dark tag with an arrow drawn to the phone
        const tg = el("div", "pill plex", S, { left: POS.tagPh[0] + "px", top: POS.tagPh[1] + "px", fontSize: "40px", background: K, color: L, padding: "6px 30px 12px" }, '<span style="width:16px;height:16px;border-radius:50%;background:#00DB33;display:inline-block"></span>جوالك');
        gsap.set(tg, { scale: 0, rotation: 8, transformOrigin: "50% 50%" }); TL.to(tg, { scale: 1, rotation: 2, duration: 0.42, ease: "back.out(1.7)" }, V(6) - 0.06);
        const tgR = { x: POS.tagPh[0] + 60, y: POS.tagPh[1] + 70 };
        const ar1 = line(tgR.x, tgR.y, POS.phone0[0], POS.phone0[1], V(6) + 0.12);
        TL.to([tg, ar1], { opacity: 0, filter: "blur(8px)", duration: 0.35, ease: "power2.in" }, V(10) - 0.2);

        // «حمل ما تشوفه»: type above the load, «حمل» stretches its kashida as the load sinks
        const ld = el("div", "abs", S, { left: "0", top: POS.load[1] + "px", width: "1080px", height: "200px" });
        const ldA = word(ld, "حمل", { right: (1080 - POS.load[0]) + "px", top: "0", fontSize: "124px", color: K });
        const ldB = word(ld, "ما تشوفه.", { right: (1080 - POS.load[0] + measure("حمــــل", 124) + 22) + "px", top: "44px", fontSize: "72px", color: K });
        blurIn(ldA, V(7)); blurIn(ldB, V(8) + 0.02);
        kash(ldA, "حم", "ل", V(7) + 0.1, V(9) + 0.3, 4);
        TL.to(ld, { y: 26, duration: 0.6, ease: "sine.inOut" }, V(9));
        TL.to(ld, { opacity: 0, y: -40, filter: "blur(10px)", duration: 0.38, ease: "power2.in" }, V(10) - 0.15);

        // ═══ B2 (S1 end / S2): hanging tags on the crate and the film reel ═══
        const hang = (x, y, title, latin, rot) => {
          const g = el("div", "abs", S, { left: (x - 160) + "px", top: y + "px", width: "320px", height: "240px", transformOrigin: "160px -60px" });
          const str = el("div", "abs", g, { left: "158px", top: "-70px", width: "3px", height: "86px", background: "#5a4a38" });
          const c = el("div", "scrap", g, { left: "0", top: "0", width: "320px", height: "230px", borderRadius: "16px", clipPath: "polygon(12% 0,88% 0,100% 14%,100% 100%,0 100%,0 14%)" });
          el("div", "abs", g, { left: "150px", top: "18px", width: "20px", height: "20px", borderRadius: "50%", background: "#3a3d40" });
          const tl = el("div", "abs " + (latin ? "lat" : "ar plex"), g, { left: "0", width: "320px", textAlign: "center", top: "48px", fontSize: latin ? "38px" : "36px", color: GREY }, title);
          const num = el("div", "abs ar", g, { left: "0", width: "320px", textAlign: "center", top: "100px", fontSize: "84px", color: K }, "٠");
          gsap.set(g, { rotation: rot * 4, y: -1100 }); g._num = num; g._rot = rot; return g;
        };
        const tJS = hang(POS.tagJS[0], POS.tagJS[1], "JavaScript", true, -4);
        TL.to(tJS, { y: 0, duration: 0.5, ease: "back.out(1.3)" }, V(10) - 0.1);
        TL.to(tJS, { rotation: tJS._rot * -1.4, duration: 0.5, ease: "sine.inOut" }, V(10) + 0.4); TL.to(tJS, { rotation: tJS._rot, duration: 0.7, ease: "sine.inOut" }, V(10) + 0.9);
        { let l = ""; frames(V(13), W(15) - 0.1, t => { const v = (2.2 * expoOut(ramp(t, V(13), W(14)))).toFixed(1); const s = AR(v) + " ميجا"; if (s !== l) { TL.set(tJS._num, { textContent: s }, at(t)); l = s; } }); TL.set(tJS._num, { textContent: "٢٫٢ ميجا" }, W(15) - 0.08); }
        TL.fromTo(tJS._num, { scale: 1.35 }, { scale: 1, duration: 0.4, ease: "back.out(2.2)", immediateRender: false }, V(15));
        const tVid = hang(POS.tagVid[0], POS.tagVid[1], "فيديو الخلفية", false, 5);
        TL.to(tVid, { y: 0, duration: 0.5, ease: "back.out(1.3)" }, V(16) - 0.1);
        TL.to(tVid, { rotation: tVid._rot * -1.4, duration: 0.5, ease: "sine.inOut" }, V(16) + 0.4); TL.to(tVid, { rotation: tVid._rot, duration: 0.7, ease: "sine.inOut" }, V(16) + 0.9);
        TL.set(tVid._num, { textContent: "٢ ميجا" }, V(18) - 0.05);
        TL.fromTo(tVid._num, { scale: 1.35 }, { scale: 1, duration: 0.4, ease: "back.out(2.2)", immediateRender: false }, V(18));
        TL.to(tJS, { y: 60, rotation: -10, duration: 0.25, ease: "power2.in" }, V(20)); TL.to(tVid, { y: 60, rotation: 12, duration: 0.25, ease: "power2.in" }, V(20) + 0.04);
        TL.to([tJS, tVid], { y: 1500, duration: 0.55, ease: "power2.in" }, V(21) + 0.1); TL.set([tJS, tVid], { opacity: 0 }, V(21) + 0.7);

        // «وش يعني هذا؟»: smear slam + green highlight
        const q = el("div", "abs", S, { left: "0", top: POS.q[1] + "px", width: "1080px" });
        const qb = el("div", "abs", q, { right: (1080 - POS.q[0] - 8) + "px", top: "40px", height: "120px", width: (measure("وش", 140) + 30) + "px", background: G, transformOrigin: "100% 50%" });
        const qt = word(q, "وش يعني هذا؟", { right: (1080 - POS.q[0]) + "px", top: "0", fontSize: "140px", color: K }); fit(qt, 860); qb.style.width = (measure("وش", parseFloat(qt.style.fontSize)) + 30) + "px"; qb.style.height = (parseFloat(qt.style.fontSize) * 0.85) + "px";
        gsap.set(qb, { scaleX: 0 }); gsap.set(qt, { opacity: 0 });
        TL.set(qt, { opacity: 1 }, V(21) - 0.02);
        TL.fromTo(qt, { x: 240, scaleX: 1.4, skewX: -14, filter: "blur(9px)" }, { x: 0, scaleX: 1, skewX: 0, filter: "blur(0px)", duration: 0.3, ease: "expo.out", immediateRender: false }, V(21) - 0.02);
        TL.to(qb, { scaleX: 1, duration: 0.13, ease: "power2.out" }, V(21) + 0.3);
        live(q, V(21) + 0.3, V(24), 1.03);
        TL.to(q, { opacity: 0, y: -50, filter: "blur(10px)", duration: 0.38, ease: "power2.in" }, V(24) - 0.1);

        // ═══ B3 (S2 end / S3 start): the phone downloads 4.2 MB and the page does not move ═══
        const dl = el("div", "abs", S, { left: (POS.screen[0] - 230) + "px", top: (POS.screen[1] - 70) + "px", width: "460px", height: "140px", borderRadius: "34px", background: K, boxShadow: "0 20px 40px rgba(18,20,22,.35)" });
        const dlT = el("div", "abs ar plex", dl, { right: "34px", top: "18px", fontSize: "36px", color: L }, "ينزّل…");
        const dlN = el("div", "abs ar", dl, { left: "34px", top: "6px", fontSize: "58px", color: G }, "٤٫٢ ميجا");
        const dlBar = el("div", "abs", dl, { left: "34px", right: "34px", bottom: "26px", height: "12px", borderRadius: "6px", background: "#2F3337" });
        const dlFill = el("div", "abs", dlBar, { right: "0", top: "0", bottom: "0", width: "0%", borderRadius: "6px", background: G });
        gsap.set(dl, { scale: 0, y: 40 }); TL.to(dl, { scale: 1, y: 0, duration: 0.5, ease: "back.out(1.6)" }, V(26) - 0.1);
        TL.to(dlFill, { width: "6%", duration: 1.6, ease: "power2.out" }, V(26) + 0.3);
        // word «جوالك» rides in on a curve and parks above the pill
        const jw = word(S, "جوالك", { right: (1080 - POS.screen[0] - 230) + "px", top: (POS.screen[1] - 230) + "px", fontSize: "110px", color: K });
        gsap.set(jw, { opacity: 0 });
        TL.set(jw, { opacity: 1 }, V(24) - 0.05);
        TL.fromTo(jw, { x: 700, y: -260, rotation: 14 }, { motionPath: { path: [{ x: 300, y: -280 }, { x: 0, y: 0 }], curviness: 1.4 }, rotation: -2, duration: 0.55, ease: "power3.out", immediateRender: false }, V(24) - 0.05);
        TL.to(jw, { opacity: 0, filter: "blur(10px)", duration: 0.35, ease: "power2.in" }, V(29) - 0.2);
        // «قبل ما الصفحة تتحرك» on a paper strip dropping across the top
        const st = scrap(POS.strip[0], POS.strip[1], 820, 150, 2);
        const stT = word(st, "قبل ما الصفحة تتحرك.", { right: (1080 - POS.strip[0] - 820 + 40) + "px", top: (POS.strip[1] + 18) + "px", fontSize: "92px" });
        fit(stT, 740);
        drop(st, V(29) - 0.12, 2, -1500, 0.55);
        TL.fromTo(stT, { x: 0 }, { x: -6, duration: 0.06, repeat: 5, yoyo: true, ease: "none", immediateRender: false }, V(32) + 0.1);
        TL.to([st, dl], { opacity: 0, filter: "blur(10px)", duration: 0.38, ease: "power2.in" }, POS.cut3 - 0.2);

        // ═══ B4 dark (K3): Google, 3 s, 53 % ═══
        const gq = el("div", "abs ar plex", S, { right: "120px", top: POS.g[1] + "px", fontSize: "38px", color: "#AEB3B8" }, "قوقل تقول:");
        blurIn(gq, V(33));
        const sec = el("div", "abs ar", S, { right: "120px", top: (POS.g[1] + 50) + "px", fontSize: "170px", color: G, transformOrigin: "100% 60%" }, "+٣ ثواني");
        gsap.set(sec, { opacity: 0 }); TL.set(sec, { opacity: 1 }, V(40) - 0.02);
        TL.fromTo(sec, { scale: 3, filter: "blur(8px)" }, { scale: 1, filter: "blur(0px)", duration: 0.3, ease: "expo.out", immediateRender: false }, V(40) - 0.02);
        const onm = el("div", "abs ar plex", S, { right: "120px", top: (POS.g[1] + 280) + "px", fontSize: "38px", color: L }, "على الجوال");
        blurIn(onm, V(42));
        TL.to([gq, sec, onm], { y: -60, opacity: 0.0, filter: "blur(10px)", duration: 0.3, ease: "power2.in" }, V(44) - 0.35);
        const pct = el("div", "abs ar", S, { right: "120px", top: (POS.g[1] + 20) + "px", fontSize: "220px", color: L, transformOrigin: "100% 60%" }, "٥٣٪");
        const pctL = el("div", "abs ar plex", S, { right: "120px", top: (POS.g[1] + 300) + "px", fontSize: "44px", color: L }, "من الزوار <span style='color:#00DB33'>يطلعون</span>");
        const src = el("div", "abs ar plex", S, { right: "120px", top: (POS.g[1] + 380) + "px", fontSize: "28px", color: "#8B9096" }, "المصدر: Google / DoubleClick 2016");
        gsap.set(pct, { opacity: 0 });
        TL.set(pct, { opacity: 1 }, V(44) + 0.05);
        { let l = ""; frames(V(44), V(47), t => { const s = AR(Math.round(53 * expoOut(ramp(t, V(44), V(47))))) + "٪"; if (s !== l) { TL.set(pct, { textContent: s }, at(t)); l = s; } }); }
        blurIn(pctL, V(47)); blurIn(src, V(41));
        TL.to(pctL, { x: -40, duration: 0.5, ease: "power2.in" }, V(48));
        TL.to([pct, pctL, src], { opacity: 0, filter: "blur(10px)", duration: 0.3, ease: "power2.in" }, V(49) - 0.25);

        // ═══ invert flash on «فاشتغلنا» (the one flash of the reel) ═══
        TL.set(inv, { filter: "invert(1)" }, V(49)); TL.set(inv, { filter: "none" }, V(49) + 2 * F);
        const wk = word(S, "فاشتغلنا عليه.", { right: "120px", top: POS.wk[1] + "px", fontSize: "120px", color: K });
        fit(wk, 820);
        gsap.set(wk, { opacity: 0 }); TL.set(wk, { opacity: 1 }, V(49));
        TL.fromTo(wk, { x: -240, scaleX: 1.4, skewX: 14, filter: "blur(9px)" }, { x: 0, scaleX: 1, skewX: 0, filter: "blur(0px)", duration: 0.3, ease: "expo.out", immediateRender: false }, V(49));
        TL.to(wk, { opacity: 0, y: -50, filter: "blur(10px)", duration: 0.35, ease: "power2.in" }, V(51) - 0.2);

        // ═══ B5 (K4): the receipt prints the before/after ═══
        const RW = 520, RH = 610;
        const rc = el("div", "abs", S, { left: POS.rc[0] + "px", top: POS.rc[1] + "px", width: RW + "px", height: RH + "px", transformOrigin: "50% 0" });
        const paper = el("div", "abs", rc, { left: "0", top: "0", width: RW + "px", height: RH + "px", background: "#FBFBFA url('assets/img/paper.jpg') center/cover",
          clipPath: "polygon(0 0,100% 0,100% 97%,95% 100%,90% 97%,85% 100%,80% 97%,75% 100%,70% 97%,65% 100%,60% 97%,55% 100%,50% 97%,45% 100%,40% 97%,35% 100%,30% 97%,25% 100%,20% 97%,15% 100%,10% 97%,5% 100%,0 97%)",
          filter: "drop-shadow(0 8px 14px rgba(18,20,22,.3))" });
        const rl = (txt, y, size, css = {}) => el("div", "abs ar plex", rc, Object.assign({ right: "40px", top: y + "px", fontSize: size + "px", color: K }, css), txt);
        const rH = rl("الوزن قبل وبعد", 30, 34, { color: GREY });
        el("div", "abs", rc, { left: "40px", right: "40px", top: "92px", borderTop: "3px dashed #B9BDC1" });
        const r1a = el("div", "abs lat", rc, { right: "40px", top: "118px", fontSize: "38px", color: K }, "JavaScript");
        const r1o = rl("٢٫٢ ميجا", 176, 46, { color: GREY });
        const r1s = el("div", "abs", rc, { right: "36px", top: "214px", height: "5px", width: (measure("٢٫٢ ميجا", 46, "PlexA") + 10) + "px", background: K, transformOrigin: "100% 50%" });
        const r1n = el("div", "abs ar", rc, { left: "36px", top: "160px", fontSize: "80px", color: K }, "١٫٢ ميجا");
        el("div", "abs", rc, { left: "40px", right: "40px", top: "270px", borderTop: "3px dashed #B9BDC1" });
        const r2a = rl("فيديو الخلفية", 290, 38);
        const r2o = rl("٢ ميجا", 348, 46, { color: GREY });
        const r2s = el("div", "abs", rc, { right: "36px", top: "386px", height: "5px", width: (measure("٢ ميجا", 46, "PlexA") + 10) + "px", background: K, transformOrigin: "100% 50%" });
        const r2n = el("div", "abs ar", rc, { left: "36px", top: "332px", fontSize: "80px", color: K }, "٦١٣ كيلو");
        el("div", "abs", rc, { left: "40px", right: "40px", top: "448px", borderTop: "3px dashed #B9BDC1" });
        const stamp = el("div", "abs ar", rc, { left: "260px", top: "468px", fontSize: "54px", color: K, background: G, padding: "0 26px 8px", borderRadius: "12px" }, "أقل من الثلث");
        // printing: the paper grows downward out of the slot (clip), lines appear as the paper passes them
        gsap.set(rc, { clipPath: `inset(0 0 ${RH}px 0)` });
        const pr = (h, t, d) => TL.to(rc, { clipPath: `inset(0 0 ${RH - h}px 0)`, duration: d, ease: "steps(" + Math.max(3, Math.round(d * 14)) + ")" }, t);
        pr(250, V(51) - 0.1, 0.7); pr(430, V(56) - 0.1, 0.6); pr(RH, V(60) - 0.15, 0.4);
        [r1s, r2s].forEach(s => gsap.set(s, { scaleX: 0 })); [r1n, r2n].forEach(s => gsap.set(s, { opacity: 0 }));
        TL.to(r1s, { scaleX: 1, duration: 0.18, ease: "power2.out" }, V(52));
        TL.set(r1n, { opacity: 1 }, V(54) - 0.02); TL.fromTo(r1n, { scale: 1.6, filter: "blur(6px)" }, { scale: 1, filter: "blur(0px)", duration: 0.32, ease: "expo.out", immediateRender: false }, V(54) - 0.02);
        TL.to(r2s, { scaleX: 1, duration: 0.18, ease: "power2.out" }, V(57));
        TL.set(r2n, { opacity: 1 }, V(58) - 0.02); TL.fromTo(r2n, { scale: 1.6, filter: "blur(6px)" }, { scale: 1, filter: "blur(0px)", duration: 0.32, ease: "expo.out", immediateRender: false }, V(58) - 0.02);
        gsap.set(stamp, { opacity: 0, xPercent: -50, rotation: -4 }); TL.set(stamp, { opacity: 1 }, V(60)); TL.fromTo(stamp, { scale: 2.2 }, { scale: 1, duration: 0.3, ease: "back.out(1.6)", immediateRender: false }, V(60));
        live(rc, V(51) + 0.6, V(62), 1.025);
        // the receipt tears off and flies out with the camera pull-back
        TL.to(rc, { x: 900, y: -200, rotation: 24, filter: "blur(6px)", duration: 0.45, ease: "power3.in" }, V(62) - 0.15); TL.set(rc, { opacity: 0 }, V(62) + 0.35);

        // ═══ B6 (K5): «نفس الموقع، بس اخف» ═══
        const same = el("div", "abs ar plex", S, { left: "70px", top: POS.light[1] + "px", fontSize: "48px", color: K }, "نفس الموقع، بس");
        blurIn(same, V(62));
        const lite = word(S, "اخف", { left: "70px", top: (POS.light[1] + 50) + "px", fontSize: "160px", color: K });
        gsap.set(lite, { opacity: 0 }); TL.set(lite, { opacity: 1 }, V(65) - 0.04);
        TL.fromTo(lite, { y: 60, filter: "blur(8px)" }, { y: 0, filter: "blur(0px)", duration: 0.4, ease: "expo.out", immediateRender: false }, V(65) - 0.04);
        kash(lite, "اخـ", "ف", V(65) + 0.1, W(66), 3);
        TL.to(lite, { y: -30, rotation: -2, duration: 1.0, ease: "sine.inOut" }, V(65) + 0.4);
        const hlL = el("div", "abs", S, { left: "60px", top: (POS.light[1] + 240) + "px", height: "16px", width: "360px", background: G, transformOrigin: "0% 50%" });
        gsap.set(hlL, { scaleX: 0 }); TL.to(hlL, { scaleX: 1, duration: 0.3, ease: "power2.out" }, V(66));
        TL.to([same, lite, hlL], { opacity: 0, y: -60, filter: "blur(10px)", duration: 0.38, ease: "power2.in" }, V(67) - 0.15);

        // ═══ B7 question note + comment bar + end card ═══
        const qn = scrap(POS.qn[0], POS.qn[1], 360, 300, -4);
        const QR = (1080 - POS.qn[0] - 360 + 30) + "px";
        const qn1 = el("div", "abs ar plex", qn, { right: QR, top: (POS.qn[1] + 18) + "px", fontSize: "34px", color: GREY }, "تبي تعرف");
        const qn2 = word(qn, "وش اللي", { right: QR, top: (POS.qn[1] + 66) + "px", fontSize: "76px" });
        const qn3 = word(qn, "مثقل موقعك؟", { right: QR, top: (POS.qn[1] + 168) + "px", fontSize: "76px" });
        fit(qn2, 300); fit(qn3, 300);
        gsap.set([qn2, qn3], { opacity: 0 }); blurIn(qn2, V(69)); blurIn(qn3, V(71));
        drop(qn, V(67) - 0.15, -4, -800, 0.55);
        TL.to(qn, { y: 1600, rotation: -18, duration: 0.5, ease: "power2.in" }, 28.35); TL.set(qn, { opacity: 0 }, 28.9);
        // comment bar (Instagram-like) types «انطباع»
        const cb = el("div", "pill plex", S, { left: "100px", top: POS.cb[1] + "px", width: "860px", height: "120px", background: "#FFFFFF", boxShadow: "0 18px 40px rgba(18,20,22,.3)", padding: "0 34px", justifyContent: "space-between" });
        const cbT = el("div", "ar", cb, { fontSize: "46px", color: K, fontFamily: "PlexA" }, "اكتب");
        const cbS = el("div", "", cb, { width: "74px", height: "74px", borderRadius: "50%", background: G, display: "flex", alignItems: "center", justifyContent: "center" }, '<svg width="34" height="34" viewBox="0 0 24 24"><path d="M3 12 L21 4 L15 21 L11 13 Z" fill="#121416"/></svg>');
        gsap.set(cb, { y: 500, opacity: 0 });
        TL.to(cb, { y: 0, opacity: 1, duration: 0.45, ease: "back.out(1.4)" }, V(73) - 0.25);
        { const full = "اكتب انطباع"; let l = ""; frames(V(74), V(74) + 0.45, t => { const n = 5 + Math.round(6 * ramp(t, V(74), V(74) + 0.4)); const s = full.slice(0, n); if (s !== l) { TL.set(cbT, { innerHTML: s.replace("انطباع", "<span style='background:#00DB33;padding:0 8px 4px;border-radius:8px'>انطباع</span>") }, at(t)); l = s; } }); }
        TL.set(cbT, { innerHTML: "اكتب <span style='background:#00DB33;padding:0 8px 4px;border-radius:8px'>انطباع</span>" }, V(74) + 0.47);
        TL.to(cbS, { scale: 0.8, duration: 0.06 }, V(75) - 0.05); TL.to(cbS, { scale: 1, duration: 0.25, ease: "back.out(3)" }, V(75) + 0.01);
        // end card: the dark panel rises from the comment bar and fills the frame
        const ec = el("div", "abs", S, { left: "0", top: "0", width: "1080px", height: "1920px", background: K, clipPath: `inset(${POS.cb[1]}px 100px ${1920 - POS.cb[1] - 120}px 100px round 60px)` });
        gsap.set(ec, { opacity: 0 });
        const ET = V(75) + 0.25;
        TL.set(ec, { opacity: 1 }, ET);
        TL.to(ec, { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: 0.5, ease: "expo.inOut" }, ET);
        TL.set(cb, { opacity: 0 }, ET + 0.05);
        const logo = el("img", "abs", ec, { left: "290px", top: "560px", width: "500px" }); logo.src = "assets/brand/logo-white.svg";
        const cta = word(ec, "اكتب <span style='color:#00DB33'>انطباع</span> بالتعليقات", { right: "0", width: "1080px", textAlign: "center", top: "820px", fontSize: "100px", color: L });
        fit(cta, 840);
        const sub = el("div", "abs ar plex", ec, { left: "0", width: "1080px", textAlign: "center", top: "990px", fontSize: "34px", color: "#AEB3B8" }, "ونرسل لك انطباعنا الأول عن موقعك");
        const url = el("div", "abs lat", ec, { left: "0", width: "1080px", textAlign: "center", top: "1130px", fontSize: "46px", color: L }, "www.fortunecode.org");
        const tel = el("div", "abs lat", ec, { left: "0", width: "1080px", textAlign: "center", top: "1200px", fontSize: "46px", color: G }, "+20 10 98066484");
        [logo, cta, sub, url, tel].forEach((e, i) => blurIn(e, ET + 0.35 + i * 0.12, 0.36));
        live(ec, ET + 0.6, D, 1.02);
