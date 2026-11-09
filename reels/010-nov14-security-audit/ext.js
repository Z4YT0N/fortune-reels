        // ═════════════ 010 extension: words 20..66 ═════════════
        // B4 the scan line splits open into the light report: «الفحص؟» slam, one category card at a time on curves (conveyor) |
        // B5 «أمثلة» rubber stamp | B6 the report folds into the 14-flag board, flags flip green one by one, «صلحنا» kashida |
        // B7 the board folds into the locked button, shackle springs, «انفتح» smear slam, click, green wipe | B8 end: comment field.

        // ═══ B4 «وش يشمل الفحص؟» the last scan line opens the light report ═══
        const SPLIT = V(20) - 0.32, SL_Y = 930;
        const sLine = el("div", "abs", stage, { left: "0", width: "1080px", top: SL_Y + "px", height: "6px", background: G, zIndex: 15, boxShadow: "0 0 22px rgba(0,219,51,0.8)", transformOrigin: "100% 50%" });
        gsap.set(sLine, { scaleX: 0 });
        TL.to(sLine, { scaleX: 1, duration: 0.26, ease: "expo.out" }, SPLIT);
        const panel = el("div", "", stage, { position: "absolute", inset: "0", background: L, zIndex: 14, overflow: "hidden", clipPath: `inset(${SL_Y}px 0px ${1920 - SL_Y}px 0px round 0px)`, color: K });
        const OPEN = SPLIT + 0.22;
        TL.to(panel, { clipPath: clip(0, 0, 0, 0, 0), duration: 0.46, ease: "expo.inOut" }, OPEN);
        TL.to(sLine, { opacity: 0, duration: 0.2 }, OPEN + 0.2);
        TL.set([win, cnt, lock1.lk, hang, qbl, nfh], { autoAlpha: 0 }, OPEN + 0.5);
        const labP = labels(panel, GREY);
        const cline = (html, top, css) => el("div", "abs ar", panel, Object.assign({ left: "0", width: "1080px", top: top + "px", textAlign: "center" }, css), html);
        const h1 = cline("وش يشمل", 286, { fontFamily: PF, fontWeight: "600", fontSize: "60px", color: GREY });
        const h2fs = Math.min(210, 210 * 800 / measure("الفحص؟", 210));
        const h2 = cline("الفحص؟", 330 + (210 - h2fs) * 0.6, { fontSize: h2fs + "px", color: K });
        blurIn(h1, V(20)); slamIn(h2, V(22));
        const sub = cline("أمثلة مما يغطيه الفحص", 596, { fontFamily: PF, fontWeight: "600", fontSize: "36px", color: GREY });
        blurIn(sub, V(23) - 0.3);
        const dots = [0, 1, 2, 3, 4, 5].map(k => { const d = el("div", "abs", panel, { left: (540 + 85 - k * 34 - 9) + "px", top: "664px", width: "18px", height: "18px", borderRadius: "50%", background: "#D3D6D9" }); return d; });
        gsap.set(dots, { opacity: 0 }); TL.to(dots, { opacity: 1, duration: 0.2, stagger: 0.03 }, V(23) - 0.3);
        const ICS = [
          '<circle cx="40" cy="30" r="15"/><path d="M14 82 Q14 54 40 54 Q56 54 62 64"/><rect x="58" y="66" width="30" height="22" rx="5"/><path d="M64 66 V60 A9 9 0 0 1 82 60 V66"/>',
          '<rect x="8" y="30" width="84" height="40" rx="12"/><path d="M28 40 V60"/>',
          '<path d="M50 10 L84 22 V48 Q84 76 50 90 Q16 76 16 48 V22 Z"/><path d="M36 50 L46 60 L64 40"/>',
          '<circle cx="30" cy="50" r="16"/><path d="M46 50 H88 M74 50 V64 M86 50 V60"/>',
          '<path d="M50 12 L86 30 V70 L50 88 L14 70 V30 Z M14 30 L50 48 L86 30 M50 48 V88"/>',
          '<path d="M14 18 H86 V66 H44 L26 82 V66 H14 Z"/><path d="M50 30 V46 M50 55 V57"/>'];
        const RW = [[23, 24, 24], [25, 26, 26], [27, 28, 28], [29, 30, 30], [31, 32, 32], [33, 38, 35]];
        const ACT = 960, STEP = 216;
        const clean = (i, first) => { let w = WORDS[i][0].replace(/[،.؟]/g, ""); if (first && w.startsWith("و") && i !== 23) w = w.slice(1); return w; };
        const rows = RW.map(([a, b, key], n) => {
          const tall = n === 5, h = tall ? 250 : 200, top = ACT - (tall ? 25 : 0);
          const c = el("div", "abs", panel, { left: "120px", top: top + "px", width: "840px", height: h + "px", borderRadius: "48px", background: K, display: "flex", alignItems: "center", gap: "30px", padding: "0 34px 0 40px", direction: "rtl", zIndex: 3, boxShadow: "0 26px 50px rgba(18,20,22,0.35)" });
          const ic = el("div", "", c, { width: "140px", height: "140px", flex: "0 0 140px", borderRadius: "36px", background: G, display: "flex", alignItems: "center", justifyContent: "center" },
            `<svg viewBox="0 0 100 100" width="88" height="88" fill="none" stroke="#121416" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">${ICS[n]}</svg>`);
          const txt = el("div", "ar", c, { flex: "1", display: "flex", flexWrap: tall ? "wrap" : "nowrap", whiteSpace: tall ? "normal" : "nowrap", columnGap: "18px", rowGap: "0px", fontFamily: PF, fontWeight: "600", fontSize: tall ? "54px" : "64px", lineHeight: "1.3", color: DIM, alignItems: "center" });
          const ws = []; for (let i = a; i <= b; i++) ws.push(el("span", "", txt, { display: "inline-block", borderRadius: "18px", padding: "0 12px 8px", margin: "0 -12px" }, clean(i, i === a)));
          if (!tall) fit(txt, 600);
          const kr = ws[key - a].getBoundingClientRect();
          c._kx = kr.left + kr.width * 0.5; c._ky = kr.top + kr.height * 0.85; c._ws = ws; c._a = a; c._key = key; c._ic = ic;
          gsap.set(c, { x: 1250, y: 520, rotation: 22 });
          return c;
        });
        rows.forEach((c, n) => {
          const t0 = V(c._a) - 0.42;
          TL.to(c, { motionPath: { path: [{ x: 520, y: -90 }, { x: 0, y: 0 }], curviness: 1.4 }, rotation: 0, duration: 0.5, ease: "power3.out" }, t0);
          TL.fromTo(c._ic, { rotation: -40, scale: 0.6 }, { rotation: 0, scale: 1, duration: 0.5, ease: "back.out(2.6)", immediateRender: false }, t0 + 0.26);
          TL.to(dots[n], { backgroundColor: G, scale: 1.3, duration: 0.2 }, t0 + 0.3);
          c._ws.forEach((w, k) => TL.to(w, { color: L, duration: 0.12 }, V(c._a + k)));
          hl(c._ws[c._key - c._a], V(c._key) + 0.06);
          // conveyor: the previous card steps up and dims, the one before leaves
          if (n > 0) TL.to(rows[n - 1], { y: -STEP, scale: 0.9, opacity: 0.5, duration: 0.46, ease: "expo.inOut" }, t0);
          if (n > 1) TL.to(rows[n - 2], { y: -2 * STEP, scale: 0.8, opacity: 0, duration: 0.46, ease: "expo.inOut" }, t0);
          TL.to(cur, { x: c._kx, y: c._ky, duration: 0.35, ease: "power3.inOut" }, V(c._key) - 0.3);
          press(V(c._key) + 0.04);
        });

        // ═══ B5 «هذي أمثلة من اللي نراجعه.» rubber stamp on the report ═══
        const stamp = el("div", "pill", panel, { fontSize: "150px", color: G, border: "10px solid #00DB33", borderRadius: "40px", padding: "0 50px 16px", background: "rgba(240,241,242,0.88)", zIndex: 8 }, "أمثلة");
        ctr(stamp, 560, 1040);
        gsap.set(stamp, { opacity: 0, scale: 3, rotation: -2 });
        TL.set(stamp, { opacity: 1 }, V(40) - 0.08); TL.to(stamp, { scale: 1, rotation: -9, duration: 0.24, ease: "expo.out" }, V(40) - 0.08);
        TL.to(panel, { y: 10, duration: 0.06, ease: "power2.out" }, V(40) + 0.12); TL.to(panel, { y: 0, duration: 0.3, ease: "back.out(3)" }, V(40) + 0.18);
        const rv = cline("", 1236, { fontFamily: PF, fontWeight: "600", fontSize: "54px", display: "flex", justifyContent: "center", gap: "16px" });
        const rvW = [41, 42, 43].map(i => { const s = el("span", "", rv, { color: "#C2C6CA", display: "inline-block" }, clean(i)); s._on = K; return s; });
        gsap.set(rv, { opacity: 0 }); TL.set(rv, { opacity: 1 }, V(41) - 0.05); ink(rvW, 41);
        TL.to(cur, { x: 1100, y: 1500, duration: 0.45, ease: "power2.in" }, V(40));

        // ═══ B6 «صلحنا الاربعتعش، وحدة وحدة.» the report folds into the 14-flag board ═══
        const FOLD = V(44) - 0.3;
        exitUp([h1, h2, sub, ...dots, rows[4], rows[5], stamp, rv, labP], FOLD - 0.12);
        const GB = { l: 120, t: 780, r: 960, b: 1250 };
        TL.to(panel, { clipPath: clip(GB.t, 1080 - GB.r, 1920 - GB.b, GB.l, 48), duration: 0.46, ease: "expo.inOut" }, FOLD);
        const toks = [];
        for (let k = 0; k < 14; k++) {
          const c = k % 7, r = Math.floor(k / 7), x = 840 - c * 116, y = 850 + r * 130;
          const tk = el("div", "abs", panel, { left: x + "px", top: y + "px", width: "96px", height: "96px", borderRadius: "26px", background: K, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 4 });
          const bang = el("div", "abs", tk, { inset: "0", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: '"InterX", sans-serif', fontWeight: "800", fontSize: "54px", color: L }, "!");
          const chk = el("div", "abs", tk, { inset: "0", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0 }, CHECK);
          tk._cx = x + 48; tk._cy = y + 48; tk._bang = bang; tk._chk = chk; toks.push(tk);
          popIn(tk, FOLD + 0.2 + k * 0.018, (k % 2 ? 1 : -1) * 3);
        }
        const track = el("div", "abs", panel, { left: "160px", width: "760px", top: "1150px", height: "16px", borderRadius: "8px", background: "#D3D6D9", overflow: "hidden" });
        const tfill = el("div", "abs", track, { right: "0", top: "0", bottom: "0", width: "100%", background: G, borderRadius: "8px", transformOrigin: "100% 50%" });
        gsap.set(tfill, { scaleX: 0 }); gsap.set(track, { opacity: 0 }); TL.to(track, { opacity: 1, duration: 0.2 }, FOLD + 0.4);
        const slh = el("div", "abs ar", world, { right: "120px", top: "296px", fontSize: "190px", color: L, zIndex: 5 }, "صلحنا");
        const und = el("div", "abs", world, { right: "120px", top: "560px", width: "0px", height: "12px", borderRadius: "6px", background: G, zIndex: 5 });
        const w1 = measure("صلحنا", 190), kw = (measure("صلح" + "ـ".repeat(20) + "نا", 190) - measure("صلحـنا", 190)) / 19;
        const NK = Math.max(3, Math.floor((500 - w1) / Math.max(kw, 1)));
        slamIn(slh, V(44));
        const cnt2 = el("div", "abs ar", world, { left: "120px", top: "290px", fontSize: "220px", color: G, direction: "ltr", zIndex: 5, transformOrigin: "30% 70%" }, "٠");
        const cnt2L = el("div", "abs ar", world, { left: "126px", top: "548px", fontFamily: PF, fontWeight: "600", fontSize: "44px", color: GREY, zIndex: 5 }, "من ١٤");
        zoomOut(cnt2, V(45) - 0.1, 2.2); blurIn(cnt2L, V(45));
        const F0 = V(45) + 0.05, FS = (W(47) - 0.05 - F0) / 14;
        TL.to(cur, { x: toks[0]._cx + 30, y: toks[0]._cy + 40, duration: 0.4, ease: "power3.out" }, F0 - 0.42);
        toks.forEach((tk, k) => {
          const t = F0 + k * FS;
          TL.to(tk, { scaleX: 0, duration: 0.06, ease: "power2.in" }, t);
          TL.set(tk, { backgroundColor: G }, t + 0.06); TL.set(tk._bang, { opacity: 0 }, t + 0.06); TL.set(tk._chk, { opacity: 1 }, t + 0.06);
          TL.to(tk, { scaleX: 1, duration: 0.14, ease: "back.out(3)" }, t + 0.06);
          TL.to(tfill, { scaleX: (k + 1) / 14, duration: 0.1, ease: "power2.out" }, t + 0.06);
          TL.set(cnt2, { textContent: AR(k + 1) }, t + 0.06);
          if (k) TL.to(cur, { x: tk._cx + 30, y: tk._cy + 40, duration: Math.min(0.12, FS * 0.9), ease: "power2.out" }, t - Math.min(0.12, FS * 0.9));
        });
        TL.fromTo(cnt2, { scaleX: 1.2, scaleY: 1.3 }, { scaleX: 1, scaleY: 1, duration: 0.55, ease: "elastic.out(1, 0.45)", immediateRender: false }, F0 + 13 * FS + 0.08);
        let lk = -1;
        frames(F0, W(47), t => {
          const p = ramp(t, F0, W(47)), n = Math.round(NK * p);
          if (n !== lk) { TL.set(slh, { textContent: n ? "صلح" + "ـ".repeat(n) + "نا" : "صلحنا" }, at(t)); lk = n; }
          TL.set(und, { width: ((w1 + n * kw) * p) + "px" }, at(t));
        });
        const pw1 = el("div", "pill", world, { background: L, color: K, fontFamily: PF, fontWeight: "600", fontSize: "48px", padding: "4px 34px 12px", zIndex: 6 }, "وحدة");
        const pw2 = el("div", "pill", world, { background: G, color: K, fontFamily: PF, fontWeight: "600", fontSize: "48px", padding: "4px 34px 12px", zIndex: 6 }, "وحدة");
        ctr(pw1, 800, 690); ctr(pw2, 610, 700);
        popIn(pw1, V(46), -4); popIn(pw2, V(47), 4);

        // ═══ B7 «وبعدها بس، انفتح زر الإطلاق.» the board folds into the locked button ═══
        const B7 = V(48) - 0.12, BR = { l: 330, t: 1110, r: 750, b: 1230 }, BCX = 540, BCY = 1170;
        exitUp([slh, und, cnt2, cnt2L, pw1, pw2], B7);
        TL.to(track, { opacity: 0, duration: 0.12 }, B7);
        toks.forEach((tk, k) => { TL.to(tk, { x: BCX - tk._cx, y: BCY - tk._cy, scale: 0.3, rotation: 30, duration: 0.34, ease: "power3.in" }, B7 + 0.02 + k * 0.014); TL.set(tk, { autoAlpha: 0 }, B7 + 0.36 + k * 0.014); });
        TL.to(panel, { clipPath: clip(BR.t, 1080 - BR.r, 1920 - BR.b, BR.l, 60), backgroundColor: "#2E3237", duration: 0.46, ease: "expo.inOut" }, B7 + 0.1);
        const lock2 = mkLock(stage, 17);
        popIn(lock2.lk, B7 + 0.42, -6);
        TL.to(lock2.lk, { y: 10, duration: 0.07 }, B7 + 0.62); TL.to(lock2.lk, { y: 0, duration: 0.3, ease: "back.out(3)" }, B7 + 0.69);
        const kick = el("div", "abs ar", world, { left: "0", width: "1080px", top: "400px", textAlign: "center", fontFamily: PF, fontWeight: "600", fontSize: "60px", color: GREY, zIndex: 5 }, "وبعدها بس،");
        blurIn(kick, V(48) + 0.05);
        const opn = el("div", "abs ar", world, { left: "0", width: "1080px", top: "466px", textAlign: "center", fontSize: "250px", color: L, zIndex: 5 }, "انفتح");
        slamIn(opn, V(50));
        const UN = V(50);
        TL.to(lock2.sh, { y: -50, duration: 0.12, ease: "power2.out" }, UN);
        TL.to(lock2.sh, { rotation: 32, duration: 0.3, ease: "back.out(2)" }, UN + 0.1);
        TL.to(lock2.lk, { motionPath: { path: [{ x: -90, y: -80 }, { x: -300, y: 900 }], curviness: 1.3 }, rotation: -42, duration: 0.62, ease: "power2.in" }, UN + 0.32);
        TL.to(panel, { backgroundColor: G, duration: 0.2 }, UN + 0.3);
        for (let k = 0; k < 3; k++) {
          const rg = el("div", "abs", stage, { left: BR.l + "px", top: BR.t + "px", width: (BR.r - BR.l) + "px", height: (BR.b - BR.t) + "px", borderRadius: "60px", border: "4px solid #00DB33", zIndex: 13, opacity: 0 });
          TL.fromTo(rg, { opacity: 0.9, scaleX: 1, scaleY: 1 }, { opacity: 0, scaleX: 1.16 + k * 0.08, scaleY: 1.5 + k * 0.2, duration: 0.6, ease: "expo.out", immediateRender: false }, UN + 0.32 + k * 0.08);
        }
        const bt2 = el("div", "abs", panel, { left: BR.l + "px", top: BR.t + "px", width: (BR.r - BR.l) + "px", height: (BR.b - BR.t) + "px", display: "flex", alignItems: "center", justifyContent: "center", gap: "18px", direction: "rtl" });
        const bt2T = el("div", "ar", bt2, { fontFamily: PF, fontWeight: "600", fontSize: "56px", color: K, lineHeight: "1.2" }, "إطلاق");
        const bt2A = el("div", "", bt2, {}, `<svg viewBox="0 0 40 40" width="46" height="46"><path d="M30 20 H10 M18 11 L9 20 L18 29" fill="none" stroke="#121416" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
        popIn(bt2T, UN + 0.38); popIn(bt2A, UN + 0.44);
        const CL2 = V(52) + 0.05;
        TL.to(cur, { x: BCX + 50, y: BCY + 10, duration: 0.42, ease: "power3.inOut" }, CL2 - 0.46);
        press(CL2); ripple(BCX + 50, BCY + 10, CL2, L);
        TL.to(panel, { scale: 0.96, duration: 0.06, transformOrigin: "540px 1170px" }, CL2 - 0.06); TL.to(panel, { scale: 1, duration: 0.2, ease: "back.out(3)" }, CL2);
        const wipe = el("div", "abs", stage, { inset: "0", background: G, zIndex: 40, clipPath: `circle(0px at ${BCX}px ${BCY}px)` });
        TL.to(wipe, { clipPath: `circle(2300px at ${BCX}px ${BCY}px)`, duration: 0.42, ease: "expo.in" }, CL2 + 0.06);

        // ═══ B8 end: «عندك موقع قريب ينطلق؟ اكتب انطباع بالتعليقات، ونرسل لك انطباع أول عن موقعك مجانا.» ═══
        const end = el("div", "abs", stage, { left: "0", top: "0", width: "1080px", height: "1920px", background: K, zIndex: 41, borderRadius: "80px 80px 0 0", overflow: "hidden" });
        gsap.set(end, { y: 1920 });
        const ENDT = CL2 + 0.36;
        TL.to(end, { y: 0, borderRadius: "0px 0px 0 0", duration: 0.5, ease: "expo.out" }, ENDT);
        TL.to(cur, { x: 1000, y: 1500, duration: 0.4, ease: "power2.inOut" }, ENDT);
        const logo = el("img", "abs", end, { left: "350px", top: "262px", width: "380px" }); logo.src = "assets/brand/logo-white.svg";
        blurIn(logo, ENDT + 0.2, 0.4);
        const zl = (ids, top, gid = []) => {
          const l = el("div", "abs ar", end, { left: "0", width: "1080px", top: top + "px", display: "flex", justifyContent: "center", gap: "28px", fontSize: "150px", color: L });
          const ss = ids.map(i => el("span", "", l, { display: "inline-block", color: gid.includes(i) ? G : L }, WORDS[i][0])); fit(l, 840);
          ss.forEach((s, k) => blurIn(s, V(ids[k]))); return ss;
        };
        zl([53, 54], 380); zl([55, 56], 560, [56]);
        const cta = el("div", "abs ar", end, { left: "0", width: "1080px", top: "796px", display: "flex", justifyContent: "center", gap: "20px", fontFamily: PF, fontWeight: "600", fontSize: "60px" });
        const ctaW = [57, 58, 59].map(i => { const s = el("span", "", cta, { display: "inline-block", color: "#3A3E43", borderRadius: "18px", padding: "0 14px 8px", margin: "0 -14px" }, clean(i)); return s; });
        gsap.set(cta, { opacity: 0 }); TL.set(cta, { opacity: 1 }, V(57) - 0.05); ink(ctaW, 57); hl(ctaW[1], V(58) + 0.3);
        // the comment field carries the keyword
        const fld = el("div", "abs", end, { left: "120px", top: "906px", width: "840px", height: "120px", borderRadius: "60px", background: "#1E2124", boxShadow: "inset 0 0 0 3px #3A3E43" });
        el("div", "abs", fld, { right: "22px", top: "22px", width: "76px", height: "76px", borderRadius: "50%", background: "#3A3E43" });
        const ph = el("div", "abs ar", fld, { right: "124px", top: "26px", fontFamily: PF, fontWeight: "500", fontSize: "40px", color: DIM, lineHeight: "68px" }, "أضف تعليقًا");
        const typ = el("div", "abs ar", fld, { right: "124px", top: "22px", fontFamily: PF, fontWeight: "600", fontSize: "50px", color: L, lineHeight: "76px" }, "");
        const caret = el("div", "abs", fld, { right: "116px", top: "30px", width: "5px", height: "60px", background: G, borderRadius: "3px" });
        const send = el("div", "abs", fld, { left: "22px", top: "22px", width: "76px", height: "76px", borderRadius: "50%", background: "#3A3E43", display: "flex", alignItems: "center", justifyContent: "center" },
          `<svg viewBox="0 0 40 40" width="40" height="40"><path d="M30 20 H10 M18 11 L9 20 L18 29" fill="none" stroke="#F0F1F2" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`);
        gsap.set(fld, { y: 500, rotation: 5, opacity: 0 }); TL.set(fld, { opacity: 1 }, V(57) - 0.35);
        TL.to(fld, { motionPath: { path: [{ x: 60, y: 160 }, { x: 0, y: 0 }], curviness: 1.2 }, rotation: 0, duration: 0.45, ease: "power3.out" }, V(57) - 0.35);
        gsap.set(caret, { opacity: 0 });
        for (let t = V(57), k = 0; t < V(59) + 0.25; t += 0.2, k++) TL.set(caret, { opacity: k % 2 ? 0 : 1 }, t);
        TL.set(ph, { opacity: 0 }, V(58));
        const KW = "انطباع"; let lt = null;
        frames(V(58), V(58) + 0.42, t => { const n = Math.max(1, Math.round(KW.length * ramp(t, V(58), V(58) + 0.4))); const s = KW.slice(0, n); if (s !== lt) { TL.set(typ, { textContent: s }, at(t)); lt = s; } });
        TL.set(caret, { opacity: 0 }, V(59) + 0.25);
        TL.to(send, { backgroundColor: G, duration: 0.15 }, V(58) + 0.42);
        const CL3 = V(59) + 0.2, SX = 120 + 22 + 38, SY = 906 + 60;
        TL.to(cur, { x: SX + 12, y: SY + 14, duration: 0.45, ease: "power3.inOut" }, CL3 - 0.5);
        press(CL3); ripple(SX + 12, SY + 14, CL3);
        TL.to(send, { scale: 0.85, duration: 0.06 }, CL3 - 0.06); TL.to(send, { scale: 1, duration: 0.25, ease: "back.out(3)" }, CL3);
        // the reply bubble from Fortune Code
        const bub = el("div", "abs", end, { left: "120px", top: "1066px", width: "840px", height: "196px", borderRadius: "48px 48px 48px 14px", background: G });
        const av = el("div", "abs", bub, { right: "24px", top: "46px", width: "104px", height: "104px", borderRadius: "50%", background: K, display: "flex", alignItems: "center", justifyContent: "center" },
          `<img src="assets/brand/mark.svg" style="width:64px;height:61px">`);
        const bt = el("div", "abs", bub, { right: "152px", top: "22px", width: "640px", fontFamily: PF, fontWeight: "600", fontSize: "52px", color: K, direction: "rtl", lineHeight: "1.45", display: "flex", flexWrap: "wrap", columnGap: "16px" });
        const bW = [60, 61, 62, 63, 64, 65, 66].map((i, k) => { const s = el("span", "", bt, { display: "inline-block", color: "rgba(18,20,22,0.32)", borderRadius: "16px", padding: "0 12px 6px", margin: "0 -12px" }, clean(i, k === 0)); s._on = K; return s; });
        gsap.set(bub, { y: 700, rotation: -6, opacity: 0 }); TL.set(bub, { opacity: 1 }, CL3 + 0.08);
        TL.to(bub, { motionPath: { path: [{ x: -60, y: 200 }, { x: 0, y: 0 }], curviness: 1.2 }, rotation: 0, duration: 0.5, ease: "power3.out" }, CL3 + 0.08);
        TL.fromTo(av, { scale: 0.4, rotation: -40 }, { scale: 1, rotation: 0, duration: 0.5, ease: "back.out(2.4)", immediateRender: false }, CL3 + 0.3);
        ink(bW, 60); hl(bW[6], V(66) + 0.12, K, G);
        TL.to(cur, { x: 1120, y: 1700, duration: 0.5, ease: "power2.in" }, CL3 + 0.35);
        const foot = el("div", "abs", end, { left: "0", width: "1080px", top: "1310px", display: "flex", justifyContent: "center", gap: "60px", fontFamily: PF, fontWeight: "500", fontSize: "40px", color: GREY, direction: "ltr" },
          "<span>www.fortunecode.org</span><span>+20 10 98066484</span>");
        blurIn(foot, V(62), 0.4);
        TL.to([logo, fld, bub], { scale: 1.02, duration: D - V(66), ease: "sine.inOut" }, V(66));
