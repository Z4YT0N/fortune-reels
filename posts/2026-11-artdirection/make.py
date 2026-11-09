"""Three art-directed posts: one visual metaphor each, image-led, few words, type as part of the picture."""
import shutil, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
shutil.copy('../2026-11-test/v2/assets/logo-en-h-primary-white.svg', 'assets/logo.svg')

HEAD = '''<!DOCTYPE html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><style>
@font-face{font-family:Plex;font-weight:400;src:url(assets/IBMPlexSansArabic-Regular.ttf)}
@font-face{font-family:Plex;font-weight:500;src:url(assets/IBMPlexSansArabic-Medium.ttf)}
@font-face{font-family:Plex;font-weight:600;src:url(assets/IBMPlexSansArabic-SemiBold.ttf)}
@font-face{font-family:Plex;font-weight:700;src:url(assets/IBMPlexSansArabic-Bold.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;background:#0b0c0d;overflow:hidden;font-family:Plex;color:#F0F1F2}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.fg{position:absolute;inset:0;background-size:cover;background-position:center}
.logo{position:absolute;top:56px;left:50%;transform:translateX(-50%);height:34px;opacity:.92}
.foot{position:absolute;bottom:44px;left:80px;right:80px;display:flex;justify-content:space-between;font-weight:500;font-size:22px;color:rgba(240,241,242,.55);direction:ltr}
.g{color:#00DB33}
.grain{position:absolute;inset:0;opacity:.18;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.9'/></svg>")}
.vig{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%,rgba(0,0,0,0) 45%,rgba(0,0,0,.55) 100%)}
</style></head><body>'''
FOOT = '''<img class="logo" src="assets/logo.svg"><div class="foot"><span>www.fortunecode.org</span><span>01030608763</span></div><div class="grain"></div></body></html>'''

# 1 — the scale: the site is heavier than you think
p1 = HEAD + '''
<div class="bg" style="background-image:url(scale.png);background-position:50% 100%"></div><div class="vig"></div>
<div style="position:absolute;top:170px;right:80px;left:80px;text-align:right">
  <div style="font-weight:500;font-size:34px;color:rgba(240,241,242,.7);letter-spacing:0">معرض الصور في موقعك</div>
  <div style="font-weight:700;font-size:150px;line-height:1.05;margin-top:6px">أثقل <span class="g">من</span></div>
  <div style="font-weight:700;font-size:150px;line-height:1.05">جوال عميلك.</div>
</div>
<div style="position:absolute;top:640px;left:118px;font-weight:700;font-size:40px;color:#121416;background:#F0F1F2;padding:6px 18px 10px;transform:rotate(-4deg);box-shadow:0 10px 30px rgba(0,0,0,.6)">٣٤ ميجا</div>
''' + FOOT

# 2 — asleep waiting: «لسه يحمّل…» behind his head
p2 = HEAD + '''
<div class="bg" style="background-image:url(sleep.png)"></div>
<div style="position:absolute;top:150px;left:0;right:0;text-align:center;font-weight:700;font-size:250px;line-height:1;color:#00DB33;opacity:.95;text-shadow:0 0 60px rgba(0,219,51,.35)">يحمّل…</div>
<div class="fg" style="background-image:url(sleep_fg.png)"></div><div class="vig"></div>
<div style="position:absolute;top:118px;left:0;right:0;text-align:center;font-weight:600;font-size:38px;color:rgba(240,241,242,.85)">لسه</div>
<div style="position:absolute;bottom:120px;left:80px;right:80px;text-align:center">
  <div style="font-weight:700;font-size:64px;line-height:1.25">عميلك ما راح ينتظرك<span class="g">.</span></div>
  <div style="font-weight:500;font-size:28px;color:rgba(240,241,242,.6);margin-top:12px">٥٣٪ من زوار الجوال يطلعون بعد ٣ ثواني · Google</div>
</div>
''' + FOOT

# 3 — the feather: 140 KB
p3 = HEAD + '''
<div class="bg" style="background-image:url(feather.png);background-position:50% 80%"></div><div class="vig"></div>
<div style="position:absolute;top:150px;right:80px;left:80px;text-align:right">
  <div style="font-weight:700;font-size:210px;line-height:1;color:#00DB33;text-shadow:0 0 70px rgba(0,219,51,.3)">١٤٠ كيلو</div>
  <div style="font-weight:500;font-size:40px;margin-top:22px;color:rgba(240,241,242,.85)">كان المعرض <span style="text-decoration:line-through;text-decoration-color:#00DB33;text-decoration-thickness:5px">٣٤ ميجا</span>.</div>
  <div style="font-weight:700;font-size:56px;margin-top:6px">نفس الصور. نفس الجودة.</div>
</div>
<div style="position:absolute;bottom:120px;left:80px;right:80px;text-align:center;font-weight:600;font-size:32px">اكتب <span style="background:#00DB33;color:#121416;padding:2px 16px 8px;border-radius:10px">انطباع</span> ونقول لك وش مثقّل موقعك</div>
''' + FOOT

for n, html in (('p1', p1), ('p2', p2), ('p3', p3)):
    open(f'{n}.html', 'w', encoding='utf-8').write(html)
print('ok')
