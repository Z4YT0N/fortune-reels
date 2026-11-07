        // ═══ B1 hook (0–2.2): a scrap on the starburst above the gold frame. «الموقع» is there on frame 1. ═══
        const s1 = scrap(540, 330, -2.5, [["الموقع", null, { size: 104 }], ["الفخم", 1, { size: 104, col: DG }]], { pad: "6px 40px 22px" });
        const s1b = scrap(560, 470, 2, [["لازم يكون", 2, { pl: 1, size: 50 }], ["بطيء؟", 4, { size: 100 }]], { pad: "4px 34px 20px", tape: false });
        gsap.set(s1, { opacity: 1, y: 0 }); TL.fromTo(s1, { scale: 1.06 }, { scale: 1, duration: 0.5, ease: "power2.out", immediateRender: false }, 0.001);
        TL.fromTo(s1._ws[0], { y: 18 }, { y: 0, duration: 0.3, ease: "power2.out", immediateRender: false }, 0.001);
        wordsIn(s1); dropIn(s1b, V(2) - 0.12, "right", 0.5); wordsIn(s1b);
        kash(s1b._ws[1], "بطـ", "يء؟", 7, V(4) + 0.05, E(4) + 0.12);
        // ═══ B2 «لا.»: 1-frame invert flash, a green stamp slams, the hook is blown off ═══
        const no = scrap(540, 860, -6, [["لا.", null, { size: 230, col: K, lh: 1.1 }]], { bg: G, pad: "0 70px 20px", tape: false, z: 20 });
        TL.set(all, { filter: "invert(1)" }, V(5)); TL.set(all, { filter: "none" }, V(5) + 2 * F);
        TL.set(no, { opacity: 1 }, V(5)); TL.fromTo(no, { scale: 2.1, rotation: 4 }, { scale: 1, rotation: -6, duration: 0.26, ease: "power4.out", immediateRender: false }, V(5));
        out(s1, V(5) + 0.02, -40, -60); out(s1b, V(5) + 0.04, 40, -40);
        out(no, V(5) + 0.9, 0, 40);

        // ═══ B3 the split (2.7–5.4): a speech note on the tear; each half gets its tag ═══
        const s3 = scrap(560, 330, 2, [["يقولون لك:", 6, { pl: 1, size: 46 }], ["لازم", 8, { pl: 1, size: 46 }], ["تختار", 9, { size: 104 }]], { pad: "6px 38px 22px" });
        dropIn(s3, V(6) - 0.15, "top"); wordsIn(s3);
        const tF = scrap(780, 505, 3, [["يا", 10, { pl: 1, size: 40 }], ["فخم", 11, { size: 96 }]], { pad: "0 30px 16px", tapeX: 30 });
        const tS = scrap(285, 520, -4, [["يا", 12, { pl: 1, size: 40 }], ["سريع", 13, { size: 96 }]], { bg: G, pad: "0 30px 16px", tapeX: -30 });
        dropIn(tF, V(10) - 0.12, "right", 0.5); wordsIn(tF);
        dropIn(tS, V(12) - 0.12, "left", 0.5); wordsIn(tS);
        out(s3, V(14) - 0.25, 0, -60); out(tF, V(14) + 0.25, -60, -20); out(tS, V(14) + 0.3, 60, -20);

        // ═══ B4 (5.5–7.7) camera on the frame: «بس الفخامة مو هي اللي تبطئ موقعك» ═══
        const s4 = scrap(540, 300, -1.5, [["بس", 14, { pl: 1, size: 48 }], ["الفخامة", 15, { size: 104, col: DG }]], { pad: "4px 40px 20px" });
        const s4b = scrap(540, 438, 1.5, [["مو هي", 16, { pl: 1, size: 48 }], ["اللي", 18, { pl: 1, size: 48 }], ["تبطئ", 19, { size: 92 }], ["موقعك", 20, { pl: 1, size: 48 }]], { pad: "2px 34px 18px", tape: false });
        dropIn(s4, V(14) - 0.15, "top"); wordsIn(s4); dropIn(s4b, V(16) - 0.15, "left", 0.5); wordsIn(s4b);
        out(s4, V(21) + 0.05, 0, -60); out(s4b, V(21) + 0.1, 0, -60);
        // the cause: a tag hanging between the weights
        const s5 = scrap(540, 1285, -3, [["اللي يبطئه:", 21, { pl: 1, size: 44 }], ["الشغل", 23, { size: 96, col: K }]], { pad: "4px 36px 18px" });
        const s5b = scrap(560, 1372, 2, [["اللي", 24, { pl: 1, size: 44 }], ["ما", 25, { pl: 1, size: 44 }], ["انضبط", 26, { size: 92, col: K }]], { bg: G, pad: "0 32px 16px", tape: false });
        dropIn(s5, V(21) - 0.12, "top", 0.55); wordsIn(s5); dropIn(s5b, V(24) - 0.3, "right", 0.5); wordsIn(s5b);
        // the weights yank everything down: the tags fall with them
        [[s5, 0, 9], [s5b, 0.05, -12]].forEach(([s, dl, r]) => TL.to(s, { y: 820, rotation: r, duration: 0.5, ease: "power2.in" }, V(27) + 0.05 + dl));
        TL.set([s5, s5b], { opacity: 0 }, V(27) + 0.7);

        // ═══ B5 dark world (9.8–14.5): Google's number above the waiting man ═══
        const chip = scrap(770, 262, 2, [["جوجل تقول:", 27, { pl: 1, size: 42 }]], { pad: "6px 28px 12px", tape: false, torn: false, z: 12 });
        chip.style.borderRadius = "12px";
        dropIn(chip, V(27) - 0.1, "right", 0.5); wordsIn(chip);
        const s6 = scrap(470, 420, -2, [["بعد", 29, { pl: 1, size: 50 }], ["١", 30, { size: 140, col: K }], ["ثواني", 31, { size: 100 }]], { pad: "0 44px 16px" });
        dropIn(s6, V(29) - 0.3, "top", 0.5); wordsIn(s6);
        { let ln = ""; frames(V(30), E(30) + 0.35, t => { const n = Math.min(3, 1 + Math.floor(ramp(t, V(30), E(30) + 0.3) * 3)); const s = AR(n); if (s !== ln) { TL.set(s6._ws[1], { textContent: s }, at(t)); ln = s; } }); }
        out(s6, V(32) - 0.12, -50, -30);
        const s7 = scrap(500, 410, 2, [["٠٪", null, { size: 170, col: DG }], ["من زوار الجوال", 35, { pl: 1, size: 44 }]], { pad: "0 44px 16px" });
        dropIn(s7, V(32) - 0.08, "left", 0.5);
        { let ln = ""; frames(V(32), E(34), t => { const n = Math.round(53 * expoOut(ramp(t, V(32), E(34) - 0.1))); const s = AR(n) + "٪"; if (s !== ln) { TL.set(s7._ws[0], { textContent: s }, at(t)); ln = s; } }); }
        wordsIn(s7);
        const src = el("div", "abs ar pl", stage, { left: "60px", top: "560px", fontSize: "28px", color: "#8B9096", fontWeight: 500 }, "المصدر: Google / DoubleClick، ٢٠١٦");
        gsap.set(src, { opacity: 0 }); TL.to(src, { opacity: 1, duration: 0.3 }, V(33));
        // he stands up: the note and the chip fly off, «يطلعون» leaves with him
        out(s7, 13.25, 0, -50); out(chip, 13.3, 40, -30); out(src, E(38) - 0.22, 0, -20);
        const s8 = scrap(300, 1335, -3, [["يطلعون", 38, { size: 96 }]], { pad: "0 34px 16px", tape: false });
        dropIn(s8, V(38) - 0.3, "left", 0.45); wordsIn(s8);
        TL.to(s8, { x: 1100, rotation: 8, filter: "blur(10px)", duration: 0.42, ease: "power3.in" }, E(38) + 0.25);

        // ═══ B6 the beam wipes to paper; a receipt prints the gallery's weight above the frame ═══
        const rc = el("div", "abs", stage, { left: "300px", top: "230px", width: "480px", zIndex: 15,
          filter: "drop-shadow(0 4px 4px rgba(18,20,22,0.25)) drop-shadow(0 10px 18px rgba(18,20,22,0.18))" });
        const zig = []; for (let k = 0; k <= 20; k++) zig.push(`${100 - k * 5}% ${k % 2 ? "100%" : "calc(100% - 14px)"}`);
        const rp = el("div", "", rc, { width: "480px", background: "#F7F8F8 url(assets/img/paper.jpg) center/cover", direction: "rtl",
          clipPath: `polygon(0 0, 100% 0, ${zig.join(", ")})`, padding: "10px 34px 26px" });
        // each row is a printed line: its wrapper opens from 0 height (the paper feeds out), old rows collapse away
        const row = (html, h) => { const w = el("div", "", rp, { height: "0px", overflow: "hidden" }); el("div", "", w, { height: h + "px", display: "flex", alignItems: "center", justifyContent: "space-between", whiteSpace: "nowrap", borderBottom: "2px dashed rgba(18,20,22,0.25)" }, html); w._h = h; return w; };
        const r0 = row('<span class="pl" style="font-size:38px">معرض صور</span><span class="pl" style="font-size:24px;color:#8B9096">الحجم</span>', 78);
        const r1 = row('<span class="pl" style="font-size:34px;color:#5E6369">قبل</span><span style="position:relative;font-size:84px;line-height:1"><b class="n1" style="font-weight:400">٤</b> ميجا<i class="st" style="position:absolute;left:-6px;right:-6px;top:54%;height:9px;background:#121416;border-radius:4px;transform:scaleX(0);transform-origin:100% 50%"></i></span>', 112);
        const r2 = row('<span class="pl" style="font-size:34px;color:#5E6369">بعد</span><span style="display:inline-block;font-size:84px;line-height:1;background:#00DB33;border-radius:10px;padding:0 16px 10px">١٤٠ كيلو</span>', 112);
        const r3 = row('<span class="pl" style="font-size:34px">نفس الفخامة</span><span class="pl" style="font-size:44px;color:#006A39">✓</span>', 84);
        const r4 = row('<span class="pl" style="font-size:34px">ونفس الجودة</span><span class="pl" style="font-size:44px;color:#006A39">✓</span>', 84);
        r4.firstChild.style.borderBottom = "none";
        const n1 = r1.querySelector(".n1"), st = r1.querySelector(".st"), b2 = r2.querySelector("span:last-child");
        gsap.set(rc, { opacity: 0 });
        const feed = (r, t) => TL.to(r, { height: r._h, duration: 0.35, ease: "power2.out" }, t);
        const fold = (r, t) => TL.to(r, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut" }, t);
        TL.set(rc, { opacity: 1 }, V(39)); feed(r0, V(39) + 0.02);
        feed(r1, V(42) - 0.06);
        { let ln = ""; frames(V(42), E(43), t => { const n = Math.round(lerp(4, 34, expoOut(ramp(t, V(43), E(43))))); const s = AR(t < V(43) ? 4 : n); if (s !== ln) { TL.set(n1, { textContent: s }, at(t)); ln = s; } }); }
        TL.fromTo(st, { scaleX: 0 }, { scaleX: 1, duration: 0.25, ease: "power2.out", immediateRender: false }, V(45));
        feed(r2, V(46) - 0.06);
        TL.fromTo(b2, { scale: 1.25 }, { scale: 1, duration: 0.4, ease: "back.out(1.2)", immediateRender: false }, V(46));
        fold(r0, V(49) - 0.1); feed(r3, V(49) - 0.06);
        fold(r1, V(51) - 0.1); feed(r4, V(51) - 0.06);
        // torn off: the receipt flies up out of frame
        TL.to(rc, { y: -700, rotation: -8, filter: "blur(8px)", duration: 0.42, ease: "power3.in" }, V(53) - 0.2);

        // ═══ B7 «ويفتح على طول» (kashida on «طول»), then «فخم» and «وسريع» come back together ═══
        const s9 = scrap(400, 330, -2, [["ويفتح", 53, { size: 100 }], ["على", 54, { pl: 1, size: 46 }], ["طول", 55, { size: 100, col: DG }]], { pad: "0 40px 18px" });
        TL.set(s9, { opacity: 1 }, V(53) - 0.04);
        TL.fromTo(s9, { x: 700, scaleX: 1.6, filter: "blur(10px)" }, { x: 0, scaleX: 1, filter: "blur(0px)", duration: 0.32, ease: "expo.out", immediateRender: false }, V(53) - 0.04);
        wordsIn(s9);
        kash(s9._ws[2], "طـ", "ول", 6, V(55), E(55) + 0.15);
        out(s9, E(55) - 0.05, -40, -60);
        const s10 = scrap(380, 300, 1.5, [["يعني", 56, { pl: 1, size: 46 }], ["تقدر تكون", 57, { pl: 1, size: 46 }]], { pad: "6px 34px 16px", tape: false });
        dropIn(s10, V(56) + 0.05, "top", 0.5); wordsIn(s10);
        const fF = scrap(330, 470, -4, [["فخم،", 59, { size: 110 }]], { pad: "0 36px 16px" });
        const fS = scrap(760, 470, 4, [["وسريع", 60, { size: 110 }]], { bg: G, pad: "0 36px 16px", tapeX: 20 });
        dropIn(fF, V(59) - 0.14, "left", 0.5); wordsIn(fF); dropIn(fS, V(60) - 0.14, "right", 0.5); wordsIn(fS);

        // ═══ B8 end card: a dark torn sheet rises from below and carries the CTA ═══
        const cw = document.createElement("div"); cw.id = "cardWrap"; document.getElementById("main").appendChild(cw);
        const card = el("div", "", cw); card.id = "card";
        card.style.clipPath = "polygon(0 2%, 7% 0.6%, 15% 1.8%, 24% 0.4%, 33% 1.6%, 44% 0.5%, 55% 1.9%, 66% 0.6%, 77% 1.7%, 88% 0.4%, 100% 1.5%, 100% 100%, 0 100%)";
        const T0 = V(61) - 0.3;
        gsap.set(card, { y: 1960 }); TL.to(card, { y: 0, duration: 0.5, ease: "power3.out" }, T0);
        const qa = el("div", "abs ar", card, { left: "0", width: "1080px", textAlign: "center", top: "250px", fontSize: "130px", color: L }, "موقعك");
        const qb = el("div", "abs ar", card, { left: "0", width: "1080px", textAlign: "center", top: "420px", fontSize: "130px", color: G }, "ثقيل؟");
        gsap.set([qa, qb], { opacity: 0 }); wIn(qa, V(61)); wIn(qb, V(62));
        // comment bar: «اكتب» + «انطباع» + «بالتعليقات»
        const bar = el("div", "abs", card, { left: "90px", width: "820px", top: "660px", height: "130px", borderRadius: "65px", background: L, display: "flex", alignItems: "center", justifyContent: "flex-start", direction: "rtl", padding: "0 44px", gap: "18px" });
        const bA = el("span", "pl", bar, { fontSize: "44px", color: "#5E6369" }, "اكتب");
        const bK = el("span", "", bar, { fontSize: "84px", color: K, background: G, borderRadius: "14px", padding: "0 18px 10px", lineHeight: "1.1", display: "inline-block" }, "انطباع");
        const bB = el("span", "pl", bar, { fontSize: "44px", color: "#5E6369" }, "بالتعليقات");
        gsap.set(bar, { opacity: 0, y: 40 }); gsap.set([bA, bK, bB], { opacity: 0 });
        TL.to(bar, { opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }, V(62) + 0.15);
        wIn(bA, V(63)); wIn(bK, V(64)); wIn(bB, V(65));
        const logo = el("img", "abs", card, { left: "340px", top: "930px", width: "400px" }); logo.src = "assets/brand/logo-white.svg"; logo.dataset.key = "logo";
        const web = el("div", "abs lat", card, { left: "0", width: "1080px", textAlign: "center", top: "1130px", fontSize: "50px", color: L }, "www.fortunecode.org");
        const tel = el("div", "abs lat", card, { left: "0", width: "1080px", textAlign: "center", top: "1215px", fontSize: "50px", color: G }, "+20 10 98066484");
        gsap.set([logo, web, tel], { opacity: 0, y: 30 });
        TL.to(logo, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, V(63));
        TL.to(web, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, V(64) + 0.1);
        TL.to(tel, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, V(65) + 0.1);
        // the end card keeps living: a slow push on the whole sheet
        TL.fromTo(card, { scale: 1 }, { scale: 1.035, duration: D - T0 - 0.5, ease: "none", immediateRender: false, transformOrigin: "540px 760px" }, T0 + 0.5);
