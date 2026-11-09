// HTML screen contents composited onto the device photos (all Arabic, RTL)
function box(w, h, bg, inner, extra = '') {
  const d = document.createElement('div'); d.className = 'abs';
  d.style.cssText = `left:0; top:0; width:${w}px; height:${h}px; background:${bg}; overflow:hidden; direction:rtl; transform-origin:0 0; font-family:Plex; ${extra}`;
  d.innerHTML = inner; return d;
}
const A = (st, html = '') => `<div class="abs" style="${st}">${html}</div>`;

// 01 company website (1280 x 796)
function siteUI() {
  return box(1280, 796, '#0f1113', `
    ${A('left:0; right:0; top:0; height:78px; background:#0b0c0d; border-bottom:1px solid #222')}
    ${A('right:48px; top:20px; font-size:34px; color:#fff', 'شركتك')}
    ${['خدماتنا', 'أعمالنا', 'تواصل'].map((t, i) => A(`right:${290 + i * 200}px; top:26px; font-size:26px; color:#bbb`, t)).join('')}
    ${A('left:48px; top:18px; padding:4px 26px 0; height:42px; border-radius:21px; background:#00DB33; color:#000; font-size:26px', 'اطلب عرض سعر')}
    ${A('left:0; top:78px; width:600px; height:718px; background:url(gen/p5_photo_a.png) 50% 50%/cover')}
    ${A('left:0; top:78px; width:600px; height:718px; background:linear-gradient(270deg, #0f1113 0%, rgba(15,17,19,0) 40%)')}
    ${A('right:60px; top:190px; font-size:88px; line-height:1.15; color:#fff; white-space:nowrap', 'شركتك…<br><span style="color:#00DB33">أونلاين.</span>')}
    ${A('right:60px; top:420px; font-size:32px; line-height:1.4; color:#aaa; white-space:nowrap', 'واجهة تعرّف عملاءك فيك<br>من أول نظرة.')}
    ${A('right:60px; top:560px; padding:6px 40px 0; height:70px; border-radius:35px; background:#00DB33; color:#000; font-size:34px', 'تواصل معنا')}
    ${A('right:330px; top:560px; padding:6px 40px 0; height:70px; border-radius:35px; border:2px solid #555; color:#fff; font-size:34px', 'أعمالنا')}`);
}

// 02 store on a phone (430 x 940)
function storeUI() {
  const prods = [['#1d3b2a', '#00DB33'], ['#2a2d31', '#e8e8e8'], ['#2d2a1d', '#d9b45a'], ['#1d2a3b', '#6aa8ff']];
  return box(430, 940, '#f4f5f6', `
    ${A('left:0; right:0; top:0; height:120px; background:#121416')}
    ${A('right:26px; top:52px; font-size:34px; color:#fff', 'المتجر')}
    ${A('left:26px; top:56px; width:34px; height:30px; border:3px solid #00DB33; border-radius:4px 4px 10px 10px')}
    ${A('left:48px; top:46px; width:22px; height:22px; border-radius:50%; background:#00DB33; color:#000; font-size:16px; text-align:center; font-family:Plex; line-height:22px', '2')}
    ${A('right:22px; left:22px; top:140px; height:54px; border-radius:27px; background:#fff; border:1px solid #ddd; padding:8px 22px 0; font-size:24px; color:#999', 'ابحث عن منتج…')}
    ${prods.map(([bg, c], i) => {
      const r = Math.floor(i / 2), col = i % 2, x = 22 + col * 202, y = 214 + r * 350;
      return A(`right:${x}px; top:${y}px; width:184px; height:332px; border-radius:18px; background:#fff; box-shadow:0 4px 14px rgba(0,0,0,.08); overflow:hidden`,
        A(`left:0; right:0; top:0; height:190px; background:${bg}`, A(`left:62px; top:40px; width:60px; height:110px; border-radius:16px 16px 10px 10px; background:${c}; box-shadow:0 0 30px ${c}66`) + A(`left:78px; top:22px; width:28px; height:22px; border-radius:4px; background:${c}`)) +
        A('right:14px; top:200px; font-size:24px; color:#121416', 'منتج مميز') +
        A('right:14px; top:236px; font-size:24px; color:#00A82A', '١٢٠ ر.س') +
        A('left:12px; right:12px; bottom:12px; height:40px; border-radius:20px; background:#121416; color:#fff; font-size:20px; text-align:center; padding-top:6px', 'أضف للسلة'));
    }).join('')}`);
}

// 03 ERP dashboard on a tablet (1280 x 850)
function dashUI() {
  const bars = [40, 62, 48, 75, 58, 88, 70, 96];
  return box(1280, 832, '#0f1113', `
    ${A('right:0; top:0; bottom:0; width:230px; background:#16191c; border-left:1px solid #24282c')}
    ${A('right:34px; top:34px; font-size:36px; color:#fff', 'النظام')}
    ${['الرئيسية', 'المبيعات', 'المخزون', 'الفواتير', 'الموظفين', 'التقارير'].map((t, i) => A(`right:20px; top:${120 + i * 74}px; width:190px; height:56px; border-radius:12px; padding:8px 18px 0; font-size:28px; ${i === 0 ? 'background:#00DB33; color:#000' : 'color:#9aa0a6'}`, t)).join('')}
    ${A('right:270px; top:34px; font-size:44px; color:#fff', 'لوحة التحكم')}
    ${['المبيعات', 'الطلبات', 'المخزون'].map((t, i) => A(`right:${270 + i * 330}px; top:120px; width:300px; height:150px; border-radius:18px; background:#16191c; border:1px solid #24282c`,
      A('right:24px; top:20px; font-size:28px; color:#9aa0a6', t) + A(`right:24px; top:70px; width:${150 - i * 30}px; height:20px; border-radius:10px; background:${i === 0 ? '#00DB33' : '#3a3f44'}`) + A('right:24px; top:104px; width:110px; height:14px; border-radius:7px; background:#2a2e33'))).join('')}
    ${A('right:270px; top:300px; width:970px; height:500px; border-radius:18px; background:#16191c; border:1px solid #24282c',
      A('right:30px; top:24px; font-size:30px; color:#fff', 'المبيعات الشهرية') +
      bars.map((h, i) => A(`left:${60 + i * 110}px; bottom:40px; width:60px; height:${h * 3.6}px; border-radius:10px 10px 0 0; background:${i === bars.length - 1 ? '#00DB33' : '#2f6b40'}; ${i === bars.length - 1 ? 'box-shadow:0 0 30px rgba(0,219,51,.6)' : ''}`)).join(''))}`);
}

// 04 app on a hand-held phone (430 x 940), notch drawn on top
function appUI() {
  const steps = ['تم الطلب', 'قيد التجهيز', 'في الطريق', 'وصل'];
  return box(430, 940, '#121416', `
    ${A('left:50%; top:0; width:150px; height:34px; margin-left:-75px; background:#000; border-radius:0 0 22px 22px; z-index:3')}
    ${A('right:28px; top:70px; font-size:28px; color:#9aa0a6', 'أهلًا فيك')}
    ${A('right:28px; top:104px; font-size:44px; color:#fff', 'طلباتي')}
    ${A('left:22px; right:22px; top:190px; height:330px; border-radius:24px; background:#1b1f22; border:1px solid #2a2e33',
      A('right:24px; top:20px; font-size:30px; color:#00DB33', 'طلبك في الطريق') +
      A('right:24px; top:62px; font-size:22px; color:#9aa0a6', 'يوصلك اليوم') +
      steps.map((t, i) => A(`right:24px; top:${112 + i * 52}px; display:flex; align-items:center; gap:14px; font-size:24px; color:${i < 3 ? '#fff' : '#666'}`,
        `<span style="display:inline-block; width:22px; height:22px; border-radius:50%; ${i < 3 ? 'background:#00DB33; box-shadow:0 0 12px #00DB33' : 'border:2px solid #555'}"></span>${t}`)).join(''))}
    ${[0, 1].map(i => A(`right:${22 + i * 202}px; top:544px; width:184px; height:180px; border-radius:20px; background:#1b1f22; border:1px solid #2a2e33`,
      A('right:18px; top:18px; width:46px; height:46px; border-radius:14px; background:' + (i ? '#2a2e33' : '#00DB33')) + A('right:18px; top:90px; font-size:26px; color:#fff', i ? 'المحفظة' : 'اطلب مرة ثانية'))).join('')}
    ${A('left:0; right:0; bottom:0; height:110px; background:#0b0c0d; border-top:1px solid #222',
      [0, 1, 2, 3].map(i => A(`right:${48 + i * 96}px; top:30px; width:40px; height:40px; border-radius:12px; ${i === 0 ? 'background:#00DB33' : 'border:3px solid #555'}`)).join(''))}`);
}

// 05 AI customer-service chat (1280 x 800)
function aiUI() {
  const bub = (me, t, top) => A(`${me ? 'right' : 'left'}:60px; top:${top}px; max-width:760px; padding:16px 30px 8px; border-radius:30px; font-size:38px; line-height:1.4; white-space:nowrap; ${me ? 'background:#2a2e33; color:#fff; border-bottom-right-radius:8px' : 'background:#00DB33; color:#000; border-bottom-left-radius:8px; box-shadow:0 0 40px rgba(0,219,51,.35)'}`, t);
  return box(1280, 744, '#0f1113', `
    ${A('left:0; right:0; top:0; height:100px; background:#16191c; border-bottom:1px solid #24282c')}
    ${A('right:40px; top:22px; width:56px; height:56px; border-radius:50%; background:#121416; border:2px solid #00DB33; box-shadow:0 0 18px rgba(0,219,51,.5)', '<img src="assets/icon-green.svg" style="width:32px; margin:10px 0 0 10px">')}
    ${A('right:116px; top:16px; font-size:36px; color:#fff', 'موظف خدمة العملاء')}
    ${A('right:116px; top:58px; font-size:24px; color:#00DB33', 'متصل الحين')}
    ${bub(true, 'متى يوصل طلبي؟', 160)}
    ${bub(false, 'طلبك طلع من المستودع،', 290)}
    ${bub(false, 'ويوصلك اليوم إن شاء الله.', 380)}
    ${bub(true, 'ممتاز، مشكور!', 510)}
    ${A('left:40px; right:40px; bottom:30px; height:80px; border-radius:40px; background:#1b1f22; border:1px solid #2a2e33; padding:16px 34px 0; font-size:32px; color:#666', 'اكتب رسالتك…')}`);
}
