"""Instagram Stories Nov 7-16 (1080x1920). One set per day, weekly rhythm from the November plan.
Safe zones: top 250 and bottom 340 carry no key content. Sticker areas are drawn as labelled placeholders."""
import os
os.chdir(os.path.dirname(os.path.abspath(__file__)))

HEAD = '''<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
@font-face{font-family:Plex;font-weight:400;src:url(assets/IBMPlexSansArabic-Regular.ttf)}
@font-face{font-family:Plex;font-weight:500;src:url(assets/IBMPlexSansArabic-Medium.ttf)}
@font-face{font-family:Plex;font-weight:600;src:url(assets/IBMPlexSansArabic-SemiBold.ttf)}
@font-face{font-family:Plex;font-weight:700;src:url(assets/IBMPlexSansArabic-Bold.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1920px;background:#121416;overflow:hidden;font-family:Plex;color:#F0F1F2;position:relative}
.a{position:absolute}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.g{color:#00DB33}
.m{color:rgba(240,241,242,.68)}
.c{left:80px;right:80px;text-align:center}
.h{font-weight:700;line-height:1.12}
.logo{position:absolute;top:262px;left:50%;transform:translateX(-50%);height:38px;opacity:.95}
.foot{position:absolute;top:1522px;left:80px;right:80px;text-align:center;direction:ltr;font-weight:500;font-size:25px;color:rgba(240,241,242,.55);letter-spacing:.3px}
.glow{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(0,219,51,.42),rgba(0,219,51,.12) 55%,rgba(0,219,51,0));filter:blur(30px)}
.shade{position:absolute;left:0;right:0}
.stk{position:absolute;left:150px;right:150px;border:4px dashed #00DB33;border-radius:34px;background:rgba(18,20,22,.72);text-align:center;padding:22px 30px 26px}
.stk .l{font-weight:600;font-size:27px;color:#00DB33}
.stk .q{font-weight:700;font-size:42px;margin-top:8px;line-height:1.25}
.stk .o{display:flex;gap:18px;justify-content:center;margin-top:16px}
.stk .o span{flex:1;border:2px solid rgba(240,241,242,.35);border-radius:999px;padding:6px 10px 10px;font-weight:600;font-size:32px}
.strike{text-decoration:line-through;text-decoration-color:#00DB33;text-decoration-thickness:6px}
.pill{display:inline-block;background:#00DB33;color:#121416;border-radius:14px;padding:2px 18px 8px;font-weight:700}
.grain{position:absolute;inset:0;opacity:.14;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.9'/></svg>")}
</style></head><body>'''
END = '''<img class="logo" src="assets/logo.svg"><div class="foot">www.fortunecode.org &nbsp;·&nbsp; +20 10 98066484</div><div class="grain"></div></body></html>'''


def stk(top, label, q, opts=None, extra=''):
    o = ''
    if opts:
        o = '<div class="o">' + ''.join(f'<span>{x}</span>' for x in opts) + '</div>'
    return f'<div class="stk" style="top:{top}px;{extra}"><div class="l">مكان ستيكر: {label}</div><div class="q">{q}</div>{o}</div>'


def device(img, k, left, top, box, inner, radius=6):
    """Place a device photo at scale k and overlay `inner` HTML on its blank screen box (x0,y0,x1,y1 in source px)."""
    x0, y0, x1, y1 = box
    sx, sy, sw, sh = left + x0 * k, top + y0 * k, (x1 - x0) * k, (y1 - y0) * k
    return (f'<img class="a" src="img/{img}" style="left:{left}px;top:{top}px;width:{896*k:.0f}px;-webkit-mask-image:linear-gradient(transparent,#000 22%,#000 80%,transparent)">'
            f'<div class="a" style="left:{sx:.0f}px;top:{sy:.0f}px;width:{sw:.0f}px;height:{sh:.0f}px;overflow:hidden;border-radius:{radius}px">{inner}</div>')


LAPTOP = (176, 476, 719, 884)   # blank screen of p1_laptop.png (inset 3px)
PHONE = (346, 366, 549, 818)    # blank screen of p2_phone.png


def bars(rows, title):
    """A DevTools-style transfer panel, LTR, sized for the ~700px laptop screen."""
    r = ''
    for name, before, after, frac in rows:
        r += f'''<div style="margin-top:26px"><div style="font-size:26px;font-weight:600;color:#F0F1F2">{name}</div>
<div style="display:flex;align-items:center;gap:14px;margin-top:10px"><span style="width:76px;font-size:20px;color:#9aa0a6">Before</span><div style="height:28px;width:400px;background:#5b6066;border-radius:6px"></div><span style="font-size:26px;font-weight:700;color:#F0F1F2;white-space:nowrap">{before}</span></div>
<div style="display:flex;align-items:center;gap:14px;margin-top:8px"><span style="width:76px;font-size:20px;color:#9aa0a6">After</span><div style="height:28px;width:{max(5,int(400*frac))}px;background:#00DB33;border-radius:6px;box-shadow:0 0 18px rgba(0,219,51,.6)"></div><span style="font-size:26px;font-weight:700;color:#00DB33;white-space:nowrap">{after}</span></div></div>'''
    return f'''<div style="direction:ltr;text-align:left;width:100%;height:100%;background:#16191c;padding:22px 30px;font-family:Plex">
<div style="display:flex;gap:9px;align-items:center"><i style="width:13px;height:13px;border-radius:50%;background:#ff5f57"></i><i style="width:13px;height:13px;border-radius:50%;background:#febc2e"></i><i style="width:13px;height:13px;border-radius:50%;background:#28c840"></i>
<span style="margin-left:14px;font-size:20px;color:#9aa0a6">{title}</span></div>{r}</div>'''


F = {}

# ---- Week 1: gallery 34 MB -> 140 KB ----
F['1107-sat-1'] = HEAD + '''
<div class="glow" style="left:140px;top:560px;width:800px;height:800px"></div>
<div class="a c h" style="top:330px;font-size:64px"><span class="strike m">٣٤ ميجا</span> صارت</div>
<div class="a c h g" style="top:410px;font-size:120px;text-shadow:0 0 50px rgba(0,219,51,.35)">١٤٠ كيلو</div>
<img class="a" src="img/reel26.jpg" style="left:330px;top:600px;width:420px;border-radius:30px;transform:rotate(-4deg);box-shadow:0 30px 80px rgba(0,0,0,.7),0 0 0 3px rgba(240,241,242,.18)">
<div class="a" style="left:330px;top:600px;width:420px;height:747px;transform:rotate(-4deg);display:flex;align-items:center;justify-content:center"><div style="width:120px;height:120px;border-radius:50%;background:rgba(18,20,22,.6);border:3px solid #F0F1F2;display:flex;align-items:center;justify-content:center"><div style="width:0;height:0;border-left:40px solid #F0F1F2;border-top:25px solid transparent;border-bottom:25px solid transparent;margin-left:10px"></div></div></div>
''' + stk(1270, 'إيموجي سلايدر 🔥', 'قد إيش تفرق معك سرعة الموقع؟') + '''
<div class="a c" style="top:1462px;font-weight:600;font-size:32px">أرسلها لزميلك اللي موقعه ثقيل</div>
''' + END

F['1108-sun-1'] = HEAD + '''
<div class="bg" style="background-image:url(img/sleep.png);background-position:50% 0%"></div>
<div class="shade" style="top:0;height:820px;background:linear-gradient(#121416 30%,rgba(18,20,22,0))"></div>
<div class="shade" style="top:1050px;height:870px;background:linear-gradient(rgba(18,20,22,0),rgba(18,20,22,.9) 35%)"></div>
<div class="a c h" style="top:340px;font-size:76px">موقع يحمّل <span class="g">٥ ثواني</span>…</div>
<div class="a c" style="top:450px;font-weight:500;font-size:40px;color:rgba(240,241,242,.75)">وأنت على الجوال</div>
''' + stk(1180, 'تصويت', 'تنتظر ولا تطلع؟', ['أنتظر', 'أطلع']) + END

F['1108-sun-2'] = HEAD + device('p2_phone.png', 1.3, -41, 330, PHONE, '''<div style="width:100%;height:100%;background:#f0f1f2;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px">
<div style="width:120px;height:120px;border-radius:50%;border:12px solid #d5d8db;border-top-color:#00DB33;transform:rotate(40deg)"></div>
<div style="font-weight:700;font-size:44px;color:#121416;direction:ltr">0:03</div></div>''', 18) + '''
<div class="shade" style="top:1300px;height:620px;background:linear-gradient(rgba(18,20,22,0),rgba(18,20,22,.92) 30%)"></div>
<div class="a c h g" style="top:290px;font-size:190px;line-height:1;text-shadow:0 0 60px rgba(0,219,51,.35)">٥٣٪</div>
<div class="a c h" style="top:500px;font-size:50px;text-shadow:0 4px 20px rgba(0,0,0,.8)">من زوار الجوال يطلعون<br>إذا الصفحة تأخرت أكثر من ٣ ثواني</div>
<div class="a c" style="top:1400px;font-weight:600;font-size:34px">تبي تعرف وش يبطّئ موقعك؟ <span class="g">راسلنا</span></div>
<div class="a c m" style="top:1466px;font-size:22px;direction:ltr">Source: Google / DoubleClick, The Need for Mobile Speed (2016)</div>
''' + END

F['1109-mon-1'] = HEAD + device('p1_laptop.png', 1.3, -42, 150, LAPTOP, bars([('Gallery page · images transferred', '34 MB', '140 KB', 0.004)], 'Network')) + '''
<div class="a c h" style="top:330px;font-size:84px">نفس الصور،<br><span class="g">بس أخف.</span></div>
<div class="a c" style="top:550px;font-weight:500;font-size:34px;color:rgba(240,241,242,.8)">من ورا الشاشة: معرض صور نزل من ٣٤ ميجا لـ١٤٠ كيلو</div>
''' + stk(1320, 'سؤال', 'اسألنا عن سرعة موقعك') + END

F['1110-tue-1'] = HEAD + '''
<div class="bg" style="background-image:url(img/scale.png);background-position:50% 100%"></div><div class="shade" style="top:1450px;height:470px;background:linear-gradient(rgba(18,20,22,0),rgba(18,20,22,.9) 40%)"></div>
<div class="a c h" style="top:330px;font-size:70px">معرض صور كان <span class="g">٣٤ ميجا</span>.</div>
<div class="a c h" style="top:430px;font-size:110px">كم صار؟</div>
''' + stk(640, 'اختبار (الجواب الصح: ١٤٠ كيلو)', 'خمّن الحجم الجديد', ['١٤ ميجا', '٣ ميجا', '١٤٠ كيلو']) + END

F['1110-tue-2'] = HEAD + '''
<div class="bg" style="background-image:url(img/feather.png);background-position:50% 100%"></div>
<div class="shade" style="top:0;height:900px;background:linear-gradient(#121416 35%,rgba(18,20,22,0))"></div>
<div class="a c h" style="top:320px;font-size:46px;color:rgba(240,241,242,.8)">الجواب:</div>
<div class="a c h g" style="top:380px;font-size:190px;line-height:1.05;text-shadow:0 0 60px rgba(0,219,51,.35)">١٤٠ كيلو</div>
<div class="a c h" style="top:610px;font-size:56px">نفس الصور. نفس الجودة.</div>
<div class="shade" style="top:1380px;height:540px;background:linear-gradient(rgba(18,20,22,0),rgba(18,20,22,.85) 40%)"></div>
<div class="a c" style="top:1440px;font-weight:600;font-size:34px">جاوبت صح؟ قل لنا بالرد</div>
''' + END

F['1111-wed-1'] = HEAD + '''
<div class="a" style="left:0;top:0;width:1080px;height:955px;background:url(img/scale.png) 0 -380px/1080px auto no-repeat"></div>
<div class="a" style="left:0;top:965px;width:1080px;height:955px;background:url(img/feather.png) 0 -700px/1080px auto no-repeat"></div>
<div class="shade" style="top:1330px;height:590px;background:linear-gradient(rgba(18,20,22,0),rgba(18,20,22,.88) 30%)"></div>
<div class="a" style="left:0;top:953px;width:1080px;height:14px;background:#121416"></div>
<div class="a c" style="top:285px"><span style="font-weight:600;font-size:40px;color:rgba(240,241,242,.8)">قبل</span> <span class="h" style="font-size:88px">٣٤ ميجا</span></div>
<div class="a c" style="top:1380px"><span style="font-weight:600;font-size:40px;color:rgba(240,241,242,.8)">بعد</span> <span class="h g" style="font-size:88px;text-shadow:0 0 50px rgba(0,219,51,.35)">١٤٠ كيلو</span></div>
''' + stk(850, 'هذا أو ذاك', 'أي معرض تبي لموقعك؟', ['قبل', 'بعد']) + END

F['1112-thu-1'] = HEAD + '''
<div class="bg" style="background-image:url(img/p4_keyboard.png);background-size:auto 1700px;background-position:50% 100%;background-repeat:no-repeat"></div>
<div class="shade" style="top:0;height:700px;background:linear-gradient(#121416 50%,rgba(18,20,22,0))"></div>
<div class="a c h" style="top:330px;font-size:130px">اسأل <span class="g">الفريق</span></div>
<div class="a c" style="top:500px;font-weight:600;font-size:42px">برمجة · ذكاء اصطناعي · تصميم</div>
''' + stk(650, 'صندوق أسئلة', 'وش سؤالك عن مشروعك؟') + '''
<div class="a c" style="top:1462px;font-weight:600;font-size:32px">ولا أرسل سؤالك <span class="g">خاص</span></div>
''' + END

grid = ''.join(f'<div style="background:url(img/t{i}.jpg) center/cover;border-radius:6px"></div>' for i in (1, 2, 3, 4, 5, 6, 7, 8))
F['1113-fri-1'] = HEAD + device('p2_phone.png', 1.21, -1, 360, PHONE, f'''<div style="width:100%;height:100%;background:#f0f1f2;padding:44px 10px 10px;position:relative">
<div style="position:absolute;top:10px;left:10px;right:10px;display:flex;justify-content:space-between;align-items:center"><span class="pill" style="font-size:15px;padding:0 8px 3px;border-radius:7px">١٤٠ كيلو</span><span style="font-weight:700;font-size:17px;color:#121416">معرض صور</span></div>
<div style="display:grid;grid-template-columns:1fr 1fr;grid-auto-rows:116px;gap:6px">{grid}</div></div>''', 20) + '''
<div class="a c h" style="top:320px;font-size:46px;color:rgba(240,241,242,.8)">خلاصة الأسبوع</div>
<div class="a c h" style="top:385px;font-size:84px">معرض <span class="strike m">٣٤ ميجا</span></div>
<div class="a c h g" style="top:485px;font-size:84px;text-shadow:0 0 40px rgba(0,219,51,.3)">صار ١٤٠ كيلو</div>
''' + stk(1368, 'رابط → fortunecode.org', 'شوف شغلنا واحجز جلسة') + END

# ---- Week 2: security audit 14 issues + JS 2.2 -> 1.2 MB ----
F['1114-sat-1'] = HEAD + '''
<div class="bg" style="background-image:url(img/padlock.png);background-position:50% 100%"></div>
<div class="shade" style="top:0;height:900px;background:linear-gradient(#121416 40%,rgba(18,20,22,0))"></div>
<div class="a c h" style="top:330px;font-size:60px">فحصنا موقع قبل إطلاقه</div>
<div class="a c h" style="top:420px;font-size:120px">لقينا <span class="g" style="text-shadow:0 0 50px rgba(0,219,51,.4)">١٤ مشكلة</span></div>
<div class="a c h" style="top:570px;font-size:70px">وصلحناها.</div>
''' + stk(1250, 'إيموجي سلايدر 🔒', 'قد إيش يهمك أمان موقعك؟') + '''
<div class="a c" style="top:1462px;font-weight:600;font-size:30px">أرسلها لأحد عنده موقع</div>
''' + END

F['1115-sun-1'] = HEAD + device('p1_laptop.png', 1.3, -42, 150, LAPTOP, '''<div style="width:100%;height:100%;background:#16191c;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:30px">
<svg width="110" height="130" viewBox="0 0 110 130"><rect x="10" y="55" width="90" height="70" rx="12" fill="#00DB33"/><path d="M28 55V38a27 27 0 0 1 54 0v17" fill="none" stroke="#00DB33" stroke-width="12"/><circle cx="55" cy="88" r="10" fill="#16191c"/></svg>
<div style="font-weight:700;font-size:46px;color:#121416;background:#00DB33;border-radius:16px;padding:6px 44px 14px;box-shadow:0 0 30px rgba(0,219,51,.5)">إطلاق الموقع</div></div>''') + '''
<div class="a c h" style="top:330px;font-size:84px">متى تفحص<br><span class="g">أمان موقعك؟</span></div>
''' + stk(1278, 'تصويت', 'تفحصه…', ['قبل الإطلاق', 'لما تصير مشكلة']) + END

items = ['صلاحيات الوصول', 'التحقق من مدخلات النماذج', 'ترويسات الأمان', 'مفاتيح أو إعدادات مكشوفة', 'تحديث المكتبات']
lst = ''.join(f'<div style="display:flex;align-items:center;gap:22px;background:rgba(240,241,242,.06);border:2px solid rgba(240,241,242,.14);border-radius:22px;padding:16px 28px 22px;margin-top:16px"><span style="width:44px;height:44px;border-radius:50%;background:#00DB33;color:#121416;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:700;flex:none">✓</span><span style="font-weight:600;font-size:38px">{t}</span></div>' for t in items)
F['1115-sun-2'] = HEAD + '''
<div class="glow" style="left:200px;top:240px;width:680px;height:420px"></div>
<div class="a c h" style="top:310px;font-size:56px">احنا نفحص قبل الإطلاق.</div>
<div class="a c h g" style="top:390px;font-size:170px;line-height:1.05;text-shadow:0 0 60px rgba(0,219,51,.35)">١٤ مشكلة</div>
<div class="a c h" style="top:580px;font-size:54px">لقيناها وصلحناها.</div>
<div class="a" style="top:720px;left:110px;right:110px"><div style="font-weight:600;font-size:32px;color:rgba(240,241,242,.75)">أمثلة على اللي تغطيه المراجعة:</div>''' + lst + '''</div>
<div class="a c m" style="top:1395px;font-size:26px">أمثلة عامة، مو قائمة المشاكل الـ١٤</div>
<div class="a c" style="top:1450px;font-weight:600;font-size:32px">تبي نراجع موقعك؟ <span class="g">راسلنا</span></div>
''' + END

F['1116-mon-1'] = HEAD + device('p1_laptop.png', 1.3, -42, 150, LAPTOP, bars([('JavaScript', '2.2 MB', '1.2 MB', 1.2/2.2), ('Background video', '2 MB', '613 KB', 0.613/2)], 'Network')) + '''
<div class="a c h" style="top:330px;font-size:84px">نفس الموقع،<br><span class="g">كود أخف.</span></div>
<div class="a c" style="top:550px;font-weight:500;font-size:34px;color:rgba(240,241,242,.8)">من ورا الشاشة: الجافاسكربت نزلت من ٢٫٢ لـ١٫٢ ميجا</div>
''' + stk(1320, 'سؤال', 'اسألنا: ليش موقعي ثقيل؟') + END

for k, v in F.items():
    open(f'{k}.html', 'w', encoding='utf-8').write(v)
print(' '.join(F))
