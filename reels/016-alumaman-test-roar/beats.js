        // ═══ camera: one living push on the film per stretch, eased back at the hard cuts ═══
        const push = (t0, t1, s0, s1) => TL.fromTo(bgWrap, { scale: s0 }, { scale: s1, duration: t1 - t0, ease: "sine.inOut", immediateRender: false }, t0);
        push(0, 8.5, 1.0, 1.05); push(8.5, 8.9, 1.05, 1.0); push(8.9, 17.8, 1.0, 1.05); push(17.8, 18.1, 1.05, 1.0);
        push(18.1, 30.2, 1.0, 1.04); push(30.2, 30.5, 1.04, 1.0); push(30.5, D, 1.0, 1.06);
        const SANS = { fontFamily: "ThSans", fontWeight: 700 };
        const tag = (x, y, html, size = 40, bg = K, col = L) => el("div", "pill sans", S, { left: x + "px", top: y + "px", fontSize: size + "px", background: bg, color: col, padding: "4px 28px 12px" }, html);
        const dot = c => `<span style="width:14px;height:14px;border-radius:50%;background:${c};display:inline-block"></span>`;
        const popIn = (e, t, r = 2) => { gsap.set(e, { scale: 0, rotation: r * 4, transformOrigin: "50% 50%" }); TL.to(e, { scale: 1, rotation: r, duration: 0.5, ease: "back.out(1.2)" }, t); };
        const smear = (e, t, dir = 1) => { gsap.set(e, { opacity: 0 }); TL.set(e, { opacity: 1 }, t); TL.fromTo(e, { x: 240 * dir, scaleX: 1.4, skewX: -14 * dir, filter: "blur(9px)" }, { x: 0, scaleX: 1, skewX: 0, filter: "blur(0px)", duration: 0.3, ease: "expo.out", immediateRender: false }, t); };
        const out = (els, t, dy = -50) => TL.to(els, { opacity: 0, y: "+=" + dy, filter: "blur(10px)", duration: 0.38, ease: "power2.in" }, t);

        // ═══ B1 hook (K0 → S1): the paper scrap is already dropping on frame 0 ═══
        const h = scrap(470, 252, 490, 344, -3);
        const hR = (1080 - 470 - 490 + 34) + "px";
        const h1 = el("div", "abs ar sans", h, { right: hR, top: "270px", fontSize: "44px", color: GREY }, "شباكك يدخل عليك");
        const h2 = word(h, "حر", { right: hR, top: "318px", fontSize: "120px", color: K });
        const h3 = word(h, "الأحساء،", { right: (1080 - 470 - 490 + 34 + measure("حــــر", 120) + 24) + "px", top: "348px", fontSize: "84px", color: K });
        const h4 = word(h, "وغبارها؟", { right: hR, top: "464px", fontSize: "100px", color: DG });
        gsap.set(h, { y: -60, rotation: -9 }); TL.to(h, { y: 0, rotation: -3, duration: 0.55, ease: "back.out(1.2)" }, 0);
        gsap.set(h1, { opacity: 0.6, filter: "blur(3px)" }); TL.to(h1, { opacity: 1, filter: "blur(0px)", duration: 0.2, ease: "expo.out" }, 0.0);
        blurIn(h2, V(3) - 0.04); kash(h2, "حـ", "ر", V(3) + 0.05, V(4) + 0.3, 4);
        blurIn(h3, V(4)); blurIn(h4, V(5) - 0.02);
        const hl1 = el("div", "abs", h, { right: hR, top: "586px", height: "12px", width: (measure("وغبارها؟", 100) + 16) + "px", background: G, transformOrigin: "100% 50%" });
        gsap.set(hl1, { scaleX: 0 }); TL.to(hl1, { scaleX: 1, duration: 0.2, ease: "power2.out" }, V(5) + 0.35);
        live(h, 0.6, V(6), 1.03);
        TL.to(h, { x: -700, rotation: -14, filter: "blur(10px)", opacity: 0, duration: 0.42, ease: "power3.in" }, V(6) - 0.1);

        // ═══ B2 the usual story: a cheap fitter's note is yanked away; tags on the gap; the date slips ═══
        const n = scrap(110, 300, 560, 236, 3);
        const nR = (1080 - 110 - 560 + 36) + "px";
        const n1 = el("div", "abs ar sans", n, { right: nR, top: "316px", fontSize: "40px", color: GREY }, "تعرف السالفة:");
        const n2 = word(n, "فني رخيص،", { right: nR, top: "364px", fontSize: "100px", color: K }); fit(n2, 480);
        gsap.set(n2, { opacity: 0 });
        drop(n, V(6) + 0.02, 3, -900, 0.5); blurIn(n2, V(8) - 0.04);
        const n3 = el("div", "abs ar sans", S, { right: "130px", top: "560px", fontSize: "52px", color: K, background: "#F2F3F3", padding: "2px 22px 10px", boxShadow: "0 8px 20px rgba(0,0,0,.25)" }, "ركب… وراح.");
        gsap.set(n3, { opacity: 0 }); TL.set(n3, { opacity: 1 }, V(10) - 0.02); TL.fromTo(n3, { scale: 1.5, filter: "blur(6px)" }, { scale: 1, filter: "blur(0px)", duration: 0.25, ease: "expo.out", immediateRender: false }, V(10) - 0.02);
        TL.to([n, n3], { x: -1100, rotation: -10, filter: "blur(8px)", duration: 0.32, ease: "power3.in" }, V(11) + 0.05); TL.set([n, n3], { opacity: 0 }, V(11) + 0.4);
        // K1 macro: two tags drawn to the cracked seal
        const g1 = tag(560, 410, dot(SG) + "فتحة صغيرة", 46);
        popIn(g1, V(12) - 0.06, 2); const a1 = line(640, 500, 470, 900, V(12) + 0.12, G, 8);
        const g2 = tag(90, 640, dot(SG) + "سيليكون ما يصمد", 46);
        popIn(g2, V(14) - 0.06, -2); const a2 = line(300, 730, 430, 1040, V(14) + 0.14, G, 8);
        out([g1, g2, a1, a2], V(17) - 0.25);
        // the date: a calendar sheet drops into the dust and gets stamped «تأخر»
        const cal = scrap(280, 236, 520, 350, -4, 2);
        const calH = el("div", "abs", cal, { left: "280px", top: "236px", width: "520px", height: "84px", background: K });
        el("div", "abs ar sans", cal, { right: (1080 - 800 + 36) + "px", top: "242px", fontSize: "44px", color: L }, "موعد التركيب");
        const calQ = word(cal, "اللي وعدك فيه؟", { right: (1080 - 800 + 40) + "px", top: "322px", fontSize: "64px", color: K }); fit(calQ, 440);
        gsap.set(calQ, { opacity: 0 });
        drop(cal, V(17) - 0.08, -4, -1000, 0.5); blurIn(calQ, V(18));
        const late = el("div", "abs ar sans", cal, { left: "330px", top: "432px", fontSize: "70px", fontWeight: 900, color: K, border: "8px solid #1d1d1d", padding: "0 34px 14px", borderRadius: "14px" }, "تأخر");
        gsap.set(late, { opacity: 0, rotation: -12 }); TL.set(late, { opacity: 1 }, V(21) - 0.02);
        TL.fromTo(late, { scale: 2.4 }, { scale: 1, duration: 0.22, ease: "power3.out", immediateRender: false }, V(21) - 0.02);
        TL.fromTo(cal, { x: 0 }, { x: 10, duration: 0.05, repeat: 3, yoyo: true, ease: "none", immediateRender: false }, V(21) + 0.18);
        TL.to(cal, { x: 900, y: -260, rotation: 28, filter: "blur(10px)", duration: 0.4, ease: "power3.in" }, V(22) - 0.36); TL.set(cal, { opacity: 0 }, V(22) + 0.06);

        // ═══ B3 the turn: one invert flash, the brand slams in above the same man ═══
        TL.set(inv, { filter: "invert(1)" }, V(22)); TL.set(inv, { filter: "none" }, V(22) + 2 * F);
        const tb = el("div", "abs", S, { left: "0", top: "250px", width: "1080px", height: "360px" });
        const tIn = el("div", "abs ar sans", tb, { right: "600px", top: "-24px", fontSize: "40px", color: "#AEB4B6" }, "في");
        const tName = word(tb, "ألمنيوم", { right: "600px", top: "62px", fontSize: "104px", color: L });
        const tName2 = word(tb, "نظم <span style='color:#01b8c3'>أمان</span>", { right: "600px", top: "190px", fontSize: "104px", color: L });
        fit(tName, 420); fit(tName2, 420);
        const tBar = el("div", "abs", tb, { right: "600px", top: "344px", width: "300px", height: "10px", background: G, transformOrigin: "100% 50%" });
        blurIn(tIn, V(22)); smear(tName, V(23) - 0.04, 1); smear(tName2, V(24) - 0.04, 1);
        gsap.set(tBar, { scaleX: 0 }); TL.to(tBar, { scaleX: 1, duration: 0.3, ease: "power2.out" }, V(25));
        live(tb, V(23) + 0.3, V(26), 1.03);
        out(tb, V(26) - 0.2, -60);
        // «كل شي مكتوب بالعقد.»: the refrain word «مكتوب» stretches
        const kb = el("div", "abs", S, { left: "0", top: "262px", width: "1080px", height: "360px" });
        const k1 = el("div", "abs ar sans", kb, { right: "600px", top: "0", fontSize: "46px", color: "#AEB4B6" }, "كل شي");
        const k2 = word(kb, "مكتوب", { right: "600px", top: "50px", fontSize: "124px", color: L });
        const k3 = word(kb, "بالعقد.", { right: "600px", top: "196px", fontSize: "96px", color: SG });
        blurIn(k1, V(26)); blurIn(k2, V(28) - 0.04); kash(k2, "مكتـ", "وب", V(28) + 0.05, V(29) + 0.2, 3); blurIn(k3, V(29));
        out(kb, V(30) - 0.45, -60);

        // ═══ B4 schedule (K3): the real stamp presses, our teal imprint stays on the contract ═══
        const sc = el("div", "abs", S, { left: "0", top: "300px", width: "1080px", height: "260px" });
        const s1 = word(sc, "موعد التركيب،", { right: "120px", top: "0", fontSize: "104px", color: L }); fit(s1, 800);
        const s2 = el("div", "abs ar sans", sc, { right: "120px", top: "150px", fontSize: "50px", color: L }, "مكتوب، <span style='color:#01b8c3'>ونلتزم فيه.</span>");
        blurIn(s1, V(30) - 0.02); gsap.set(s2, { opacity: 0 }); blurIn(s2, V(32));
        const imp = el("div", "abs ar sans", S, { left: "150px", top: "1090px", fontSize: "40px", fontWeight: 900, color: G, border: "6px solid #0199a2", padding: "2px 22px 10px", borderRadius: "10px", opacity: 0 }, "مكتوب في العقد ✓");
        gsap.set(imp, { rotation: -7 }); TL.set(imp, { opacity: 0.92 }, 12.32);
        TL.fromTo(imp, { scale: 1.6, filter: "blur(4px)" }, { scale: 1, filter: "blur(0px)", duration: 0.18, ease: "power3.out", immediateRender: false }, 12.32);
        TL.to(imp, { x: -60, opacity: 0, filter: "blur(8px)", duration: 0.4, ease: "power2.in" }, 13.0);
        live(sc, V(30) + 0.3, 13.1, 1.03); out(sc, 13.05, -60);

        // ═══ B5 warranty (K4): the receipt rises out of the printer, line by line ═══
        const RW = 460, RH = 600, PY = 836;
        const rMask = el("div", "abs", S, { left: "0", top: "0", width: "1080px", height: PY + "px", overflow: "hidden" });
        const rc = el("div", "abs", rMask, { left: "0", top: (PY - RH) + "px", width: RW + "px", height: RH + "px" });
        el("div", "abs", rc, { left: "0", top: "0", width: RW + "px", height: RH + "px", background: "#FBFBFA url('assets/img/paper.jpg') center/cover",
          clipPath: "polygon(0 3%,5% 0,10% 3%,15% 0,20% 3%,25% 0,30% 3%,35% 0,40% 3%,45% 0,50% 3%,55% 0,60% 3%,65% 0,70% 3%,75% 0,80% 3%,85% 0,90% 3%,95% 0,100% 3%,100% 100%,0 100%)" });
        const rl = (txt, y, size, css = {}) => el("div", "abs ar sans", rc, Object.assign({ right: "34px", top: y + "px", fontSize: size + "px", color: K }, css), txt);
        const rH = el("div", "abs ar", rc, { left: "0", width: RW + "px", textAlign: "center", top: "30px", fontSize: "70px", color: K }, "ضمان مكتوب");
        el("div", "abs", rc, { left: "30px", right: "30px", top: "130px", borderTop: "3px dashed #B9BDC1" });
        const row = (y, num, unit, label, ns = 104) => { const n = el("div", "abs ar", rc, { left: "30px", top: (y - 18 + (104 - ns) * 0.6) + "px", fontSize: ns + "px", color: G }, num);
          if (unit) rl(unit, y + 4, 42, { color: K }); rl(label, unit ? y + 58 : y + 66, unit ? 36 : 32, { color: GREY }); el("div", "abs", rc, { left: "30px", right: "30px", top: (y + 130) + "px", borderTop: "3px dashed #B9BDC1" }); return n; };
        const r1 = row(160, "١٠", "سنوات", "على الألمنيوم"), r2 = row(306, "٥", "سنوات", "على الصبغ"), r3 = row(452, "سنتان", "", "على الإكسسوارات", 58);
        // the receipt follows the printer as the camera drifts (printer centre x ≈ 720 → 520)
        TL.fromTo(rc, { x: 720 - RW / 2 }, { x: 520 - RW / 2, duration: 2.6, ease: "sine.inOut", immediateRender: false }, 14.0);
        gsap.set(rc, { x: 720 - RW / 2, y: RH });
        const feed = (h, t, d) => TL.to(rc, { y: RH - h, duration: d, ease: "steps(" + Math.max(3, Math.round(d * 14)) + ")" }, t);
        feed(146, 13.95, 0.45); feed(292, V(37) - 0.15, 0.45); feed(438, V(41) - 0.15, 0.45); feed(RH, V(45) - 0.15, 0.45);
        [r1, r2, r3].forEach(e => gsap.set(e, { opacity: 0 }));
        [[r1, V(37)], [r2, V(41)], [r3, V(45)]].forEach(([e, t]) => { TL.set(e, { opacity: 1 }, t - 0.02); TL.fromTo(e, { scale: 1.7, filter: "blur(6px)" }, { scale: 1, filter: "blur(0px)", duration: 0.3, ease: "expo.out", immediateRender: false }, t - 0.02); });
        // the receipt is torn off and flies up as the camera rises to the window
        TL.to(rc, { y: -700, x: "+=160", rotation: 18, filter: "blur(6px)", duration: 0.42, ease: "power3.in" }, 17.62); TL.set(rc, { opacity: 0 }, 18.06);

        // ═══ B6 maintenance (K5): free for life, tags drawn to the hinge ═══
        const mb = el("div", "abs", S, { left: "0", top: "250px", width: "1080px", height: "300px" });
        const m1 = word(mb, "صيانة", { right: "120px", top: "0", fontSize: "116px", color: L });
        const m2 = word(mb, "مجانية", { right: (120 + measure("صيانة", 116) + 26) + "px", top: "0", fontSize: "116px", color: SG });
        const m3 = el("div", "abs ar sans", mb, { right: "120px", top: "168px", fontSize: "52px", color: L }, "مدى الحياة");
        blurIn(m1, V(48) - 0.04); blurIn(m2, V(49) - 0.04); kash(m2, "مجـ", "انية", V(49) + 0.05, V(50), 4); blurIn(m3, V(50));
        const t1 = tag(80, 880, dot(SG) + "المفصلات", 44), t2 = tag(80, 976, dot(SG) + "والسحابات", 44);
        popIn(t1, V(53) - 0.06, -2); popIn(t2, V(54) - 0.06, 2);
        const a3 = line(220, 870, 345, 640, V(53) + 0.12, G, 8);
        const free = el("div", "abs ar", S, { right: "120px", top: "530px", fontSize: "80px", color: L, background: G, padding: "0 34px 14px", borderRadius: "14px" }, "بدون تكلفة");
        gsap.set(free, { opacity: 0, rotation: -5 }); TL.set(free, { opacity: 1 }, V(55) - 0.02);
        TL.fromTo(free, { scale: 2.2 }, { scale: 1, duration: 0.3, ease: "power3.out", immediateRender: false }, V(55) - 0.02);
        live(mb, V(48) + 0.3, V(57), 1.03);
        out([t1, t2, a3], 21.95, 40); out([mb, free], V(57) - 0.3, -50);

        // ═══ B7 quality (K6): a teal starburst behind «جودة تستاهل», tags above each pedestal ═══
        const qg = el("div", "abs", S, { left: "0", top: "0", width: "1080px", height: "1920px", transformOrigin: "540px 900px" });
        const burst = document.createElementNS("http://www.w3.org/2000/svg", "svg"); burst.setAttribute("width", "640"); burst.setAttribute("height", "420"); burst.setAttribute("viewBox", "-320 -210 640 420");
        Object.assign(burst.style, { position: "absolute", left: "220px", top: "230px", overflow: "visible" });
        { const pts = []; const N = 18; for (let i = 0; i < N * 2; i++) { const a = i / (N * 2) * Math.PI * 2, r = i % 2 ? 150 : 300 + (i % 4 ? 0 : 18); pts.push((Math.cos(a) * r).toFixed(1) + "," + (Math.sin(a) * r * 0.62).toFixed(1)); }
          const p = document.createElementNS("http://www.w3.org/2000/svg", "polygon"); p.setAttribute("points", pts.join(" ")); p.setAttribute("fill", "#0199a2"); burst.appendChild(p); }
        qg.appendChild(burst);
        const q1 = el("div", "abs ar", qg, { left: "0", width: "1080px", textAlign: "center", top: "236px", fontSize: "112px", color: L }, "جودة");
        const q2 = el("div", "abs ar", qg, { left: "0", width: "1080px", textAlign: "center", top: "380px", fontSize: "94px", color: K }, "تستاهل");
        gsap.set(burst, { scale: 0, rotation: -30, transformOrigin: "50% 50%" });
        TL.to(burst, { scale: 1, rotation: 0, duration: 0.45, ease: "back.out(1.3)" }, V(57) - 0.04);
        TL.to(burst, { rotation: 8, duration: 3.6, ease: "none" }, V(57) + 0.45);
        blurIn(q1, V(57)); blurIn(q2, V(58) - 0.04); kash(q2, "تستـ", "اهل", V(58) + 0.05, V(58) + 0.55, 2);
        const lab = (x, y, w, big, small, t, ax, ay) => { const c = el("div", "abs", qg, { left: x + "px", top: y + "px", width: w + "px", padding: "10px 22px 14px", background: "rgba(20,22,22,.86)", borderTop: "6px solid #0199a2", borderRadius: "6px" });
          el("div", "ar", c, { fontSize: "52px", color: L, textAlign: "right", lineHeight: "1.25" }, big); el("div", "ar sans", c, { fontSize: "30px", color: SG, textAlign: "right", direction: "ltr" }, small);
          gsap.set(c, { y: -500, rotation: -6, opacity: 0 }); TL.set(c, { opacity: 1 }, t); TL.to(c, { y: 0, rotation: 0, duration: 0.45, ease: "back.out(1.2)" }, t);
          const a = line(x + w / 2, ay < y ? y - 10 : y + 150, ax, ay, t + 0.3, G, 6); qg.appendChild(a); return c; };
        lab(80, 620, 330, "زجاج مزدوج", "Guardian · 6 mm", V(59) - 0.08, 220, 870);
        const lS = lab(650, 600, 310, "سيليكون ألماني", "WACKER", V(61) - 0.08, 830, 900);
        lab(650, 1230, 310, "ربل EPDM", "يتحمل الحر والشمس", V(63) - 0.08, 900, 1150);
        TL.to(qg, { scale: 1.07, duration: 3.0, ease: "sine.inOut" }, V(59)); TL.to(lS, { opacity: 0, filter: "blur(8px)", duration: 0.3 }, V(63) - 0.12);
        TL.to(qg, { opacity: 0, scale: 1.25, filter: "blur(12px)", duration: 0.45, ease: "power2.in" }, 27.05);

        // ═══ B8 made in Al-Ahsa: real Alum Aman photos drop as prints over the glass push ═══
        const PH = [["assets/real/showroom.png", 660, 360, 198, 330, -4], ["assets/real/curtain-wall.jpg", 500, 500, 278, 310, 5], ["assets/real/doors.jpg", 640, 390, 208, 380, -3],
                    ["assets/real/win5.png", 400, 544, 328, 320, 4], ["assets/real/skylight.jpg", 640, 438, 208, 360, -5], ["assets/real/windows.jpg", 640, 418, 208, 400, 3]];
        const PT = [V(66) - 0.05, V(67) - 0.05, V(67) + 0.42, V(68) - 0.02, V(70) - 0.05, V(71) - 0.02];
        const prints = PH.map(([src, w, hgt, x, y, r], i) => { const p = el("div", "abs", S, { left: x + "px", top: y + "px", width: (w + 24) + "px", height: (hgt + 24) + "px", background: "#F4F5F5", padding: "12px", boxShadow: "0 18px 40px rgba(0,0,0,.45)" });
          const fr = el("div", "", p, { width: w + "px", height: hgt + "px", overflow: "hidden" }); fr.setAttribute("data-key", "photo" + i);
          const im = el("img", "", fr, { width: w + "px", height: hgt + "px", objectFit: "cover", display: "block" }); im.src = src;
          el("div", "tape", p, { left: ((w + 24) / 2 - 60) + "px", top: "-18px", transform: `rotate(${-r * 2}deg)` });
          gsap.set(p, { opacity: 0, rotation: r * 1.8, scale: 1.15, filter: "blur(8px)" });
          TL.set(p, { opacity: 1 }, PT[i]); TL.to(p, { rotation: r, scale: 1, filter: "blur(0px)", duration: 0.32, ease: "power3.out" }, PT[i]);
          TL.fromTo(im, { scale: 1.12 }, { scale: 1, duration: 1.4, ease: "sine.out", immediateRender: false }, PT[i]); return p; });
        const strip = el("div", "abs", S, { left: "70px", top: "1230px", width: "880px", height: "112px", background: K, borderRight: "12px solid #0199a2" });
        const st1 = el("div", "abs ar", strip, { right: "34px", top: "8px", fontSize: "72px", color: L }, "نصنع بالأحساء،");
        const st2 = el("div", "abs ar sans", strip, { left: "34px", top: "28px", fontSize: "44px", color: SG }, "ونركب في الشرقية");
        const st3 = el("div", "abs ar sans", S, { right: "130px", top: "1356px", fontSize: "34px", color: L, background: "rgba(20,22,22,.8)", padding: "2px 20px 8px" }, "الأحساء · الدمام · الخبر");
        gsap.set(strip, { scaleX: 0, transformOrigin: "100% 50%" }); TL.to(strip, { scaleX: 1, duration: 0.35, ease: "expo.out" }, V(66) - 0.1);
        gsap.set([st1, st2], { opacity: 0 }); blurIn(st1, V(66)); blurIn(st2, V(68)); gsap.set(st3, { opacity: 0 }); blurIn(st3, V(70) + 0.1);
        TL.to([...prints, strip, st3], { opacity: 0, scale: 0.92, y: "+=40", filter: "blur(12px)", duration: 0.3, ease: "power2.in", stagger: 0.015 }, V(71) + 0.25);
        TL.set([...prints, strip, st3], { opacity: 0 }, V(71) + 0.8);

        // ═══ B9 before / after: a torn sheet of the old window covers the new one, then rips off ═══
        const old = el("div", "abs", S, { left: "0", top: "0", width: "560px", height: "1920px", overflow: "hidden",
          clipPath: "polygon(0 0,100% 0,96% 6%,99% 12%,95% 19%,98% 26%,94% 33%,98% 40%,95% 47%,99% 54%,95% 61%,98% 68%,94% 75%,98% 82%,95% 89%,99% 95%,96% 100%,0 100%)", filter: "drop-shadow(8px 0 10px rgba(0,0,0,.5))" });
        const oldI = el("img", "", old, { position: "absolute", left: "0", top: "0", width: "1080px", height: "1920px", objectFit: "cover" }); oldI.src = "assets/img/K0.png";
        const bfr = tag(90, 1250, "قبل", 44, "#F2F3F3", K); old.appendChild(bfr);
        const aft = tag(90, 1100, dot(SG) + "مع أمان", 44);
        gsap.set(old, { xPercent: -100 }); TL.to(old, { xPercent: 0, duration: 0.3, ease: "power3.out" }, V(72) - 0.12);
        TL.to(old, { x: -700, rotation: -8, filter: "blur(6px)", duration: 0.32, ease: "power3.in" }, V(75) + 0.05); TL.set(old, { opacity: 0 }, V(75) + 0.4);
        popIn(aft, V(75) + 0.2, -2);
        const cq = el("div", "abs", S, { left: "0", top: "262px", width: "1080px", height: "220px" });
        const c1 = el("div", "abs ar sans", cq, { right: "120px", top: "0", fontSize: "50px", color: K }, "تبني بيتك");
        const c2 = word(cq, "او ترممه؟", { right: "120px", top: "56px", fontSize: "110px", color: K });
        blurIn(c1, V(72) - 0.02); blurIn(c2, V(74) - 0.04);
        // CTA pill rises; the end card grows out of it
        const cta = el("div", "pill", S, { left: "140px", top: "1290px", width: "800px", height: "128px", background: G, justifyContent: "center", color: "#FFFFFF", fontSize: "72px" }, "<span class='ar'>احجز معاينة مجانية</span>");
        gsap.set(cta, { y: 400, opacity: 0 }); TL.to(cta, { y: 0, opacity: 1, duration: 0.45, ease: "expo.out" }, V(76) - 0.15);
        TL.to(cta, { scale: 0.96, duration: 0.06 }, V(78) - 0.02); TL.to(cta, { scale: 1, duration: 0.2, ease: "power2.out" }, V(78) + 0.05);
        TL.to([cq, aft], { opacity: 0, filter: "blur(8px)", duration: 0.3 }, V(78) + 0.05);
        const ET = V(78) + 0.12;
        const ec = el("div", "abs", S, { left: "0", top: "0", width: "1080px", height: "1920px", background: "#1d1d1d url('assets/img/paper.jpg') center/cover", backgroundBlendMode: "multiply", clipPath: "inset(1290px 140px 502px 140px round 64px)" });
        gsap.set(ec, { opacity: 0 }); TL.set(ec, { opacity: 1 }, ET);
        TL.to(ec, { clipPath: "inset(0px 0px 0px 0px round 0px)", duration: 0.55, ease: "expo.inOut" }, ET); TL.set(cta, { opacity: 0 }, ET + 0.05);
        const logo = el("img", "abs", ec, { left: "250px", top: "430px", width: "580px" }); logo.src = "assets/brand/logo-white.png"; logo.setAttribute("data-key", "logo");
        const e1 = el("div", "abs ar", ec, { left: "0", width: "1080px", textAlign: "center", top: "720px", fontSize: "88px", color: L }, "احجز معاينة <span style='color:#01b8c3'>مجانية</span>");
        const e2 = el("div", "abs ar sans", ec, { left: "0", width: "1080px", textAlign: "center", top: "860px", fontSize: "36px", color: "#AEB4B6" }, "ضمان مكتوب حتى ١٠ سنوات");
        const e3 = el("div", "abs lat", ec, { left: "0", width: "1080px", textAlign: "center", top: "1000px", fontSize: "48px", color: L }, "alumaman.com");
        const e4 = el("div", "abs lat", ec, { left: "0", width: "1080px", textAlign: "center", top: "1080px", fontSize: "48px", color: SG }, "WhatsApp  +966 56 634 3386");
        const e5 = el("div", "abs lat", ec, { left: "0", width: "1080px", textAlign: "center", top: "1160px", fontSize: "44px", color: L }, "Instagram  @nozomaman");
        [logo, e1, e2, e3, e4, e5].forEach((e, i) => blurIn(e, ET + 0.35 + i * 0.12, 0.36));
        live(ec, ET + 0.6, D, 1.02);
