"""LinkedIn statics (English, 1080x1350): Nov 8 gallery proof, Nov 11 scope-in-contract point of view.
One visual metaphor each, image-led, type that lives in the picture."""
import os
import numpy as np
os.chdir(os.path.dirname(os.path.abspath(__file__)))

HEAD = '''<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><style>
@font-face{font-family:Plex;font-weight:400;src:url(assets/IBMPlexSansArabic-Regular.ttf)}
@font-face{font-family:Plex;font-weight:500;src:url(assets/IBMPlexSansArabic-Medium.ttf)}
@font-face{font-family:Plex;font-weight:600;src:url(assets/IBMPlexSansArabic-SemiBold.ttf)}
@font-face{font-family:Plex;font-weight:700;src:url(assets/IBMPlexSansArabic-Bold.ttf)}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;background:#121416;overflow:hidden;font-family:Plex;color:#F0F1F2;position:relative}
.a{position:absolute}
.bg{position:absolute;inset:0;background-size:cover;background-position:center}
.g{color:#00DB33}
.logo{position:absolute;top:56px;left:80px;height:36px;opacity:.95}
.foot{position:absolute;bottom:46px;left:80px;right:80px;display:flex;justify-content:space-between;font-weight:500;font-size:23px;color:rgba(240,241,242,.6)}
.grain{position:absolute;inset:0;opacity:.16;mix-blend-mode:overlay;background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='.9'/></svg>")}
.tag{position:absolute;font-weight:700;padding:4px 20px 10px;box-shadow:0 14px 34px rgba(0,0,0,.6);white-space:nowrap}
</style></head><body>'''
END = '''<img class="logo" src="assets/logo.svg"><div class="foot"><span>www.fortunecode.org</span><span>+20 10 98066484</span></div><div class="grain"></div></body></html>'''

# Nov 8: heavy iron vs a feather. Same photos, same quality, only the weight changed.
li1108 = HEAD + '''
<div class="bg" style="background-image:url(img/weight-feather.png);background-position:50% 100%"></div>
<div class="a" style="left:80px;right:80px;top:150px;font-weight:700;font-size:100px;line-height:1.08;letter-spacing:-1px">
A 34 MB gallery<br>now loads as<br><span class="g" style="text-shadow:0 0 50px rgba(0,219,51,.35)">140 KB.</span></div>
<div class="tag" style="left:150px;top:560px;font-size:46px;background:#F0F1F2;color:#121416;transform:rotate(-4deg)">34 MB</div>
<svg class="a" style="left:230px;top:628px" width="60" height="70"><path d="M10 4 C 30 20, 40 40, 36 64" fill="none" stroke="#F0F1F2" stroke-width="4" stroke-linecap="round"/></svg>
<div class="tag" style="left:700px;top:720px;font-size:46px;background:#00DB33;color:#121416;transform:rotate(3deg);box-shadow:0 0 40px rgba(0,219,51,.45)">140 KB</div>
<svg class="a" style="left:770px;top:786px" width="60" height="60"><path d="M30 4 C 26 22, 30 36, 22 54" fill="none" stroke="#00DB33" stroke-width="4" stroke-linecap="round"/></svg>
<div class="a" style="left:80px;right:80px;top:1105px;font-weight:600;font-size:42px;line-height:1.3;text-shadow:0 4px 18px rgba(0,0,0,.7)">Same photos. Same quality.<br><span class="g">Only the weight changed.</span></div>
''' + END


def matrix3d(w, h, quad):
    """CSS matrix3d that maps a w x h box (origin top-left) onto quad = [TL, TR, BL, BR] in page px."""
    src = [(0, 0), (w, 0), (0, h), (w, h)]
    A, B = [], []
    for (x, y), (u, v) in zip(src, quad):
        A += [[x, y, 1, 0, 0, 0, -u * x, -u * y], [0, 0, 0, x, y, 1, -v * x, -v * y]]
        B += [u, v]
    a, b, c, d, e, f, g, hh = np.linalg.solve(np.array(A, float), np.array(B, float))
    m = [a, d, 0, g, b, e, 0, hh, 0, 0, 1, 0, c, f, 0, 1]
    return 'matrix3d(' + ','.join(f'{v:.8f}' for v in m) + ')'


# Nov 11: the scope thread unravels; the signed page holds.
# blank paper corners measured on img/contract.png (896x1200); the photo is drawn at width 1080 from top T
K, T = 1080 / 896, 120
PAPER = [(358, 322), (740, 216), (646, 812), (1076, 649)]
quad = [(x * K, y * K + T) for x, y in PAPER]
PW, PH = 700, 990

bubbles = [
    ("one more page?", 70, 400, -5, 1),
    ("same price, right?", 50, 505, 5, .9),
    ("also a client login \U0001F64F", 90, 615, -10, .75),
    ("launch next week?", 40, 730, 13, .58),
    ("small change…", 110, 845, -20, .4),
    ("and an app?", 60, 950, 28, .24),
]
bub = ''.join(f'<div class="a" style="left:{x}px;top:{y}px;transform:rotate({r}deg);opacity:{o};background:#2a2f33;color:#F0F1F2;border-radius:26px 26px 26px 6px;padding:10px 24px 16px;font-weight:500;font-size:29px;white-space:nowrap;box-shadow:0 10px 26px rgba(0,0,0,.55)">{t}</div>'
              for t, x, y, r, o in bubbles)
rows = ''.join(f'<div style="display:flex;align-items:center;gap:22px;margin-top:34px"><span style="width:58px;height:58px;border-radius:50%;background:#00A82A;color:#fff;display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:700">✓</span><span style="font-weight:700;font-size:58px;color:#121416">{t}</span><span style="flex:1;border-bottom:4px dotted #9aa0a6;margin-top:30px"></span><span style="font-weight:600;font-size:36px;color:#3b4045">fixed</span></div>'
               for t in ('Scope', 'Price', 'Timeline'))
page = (f'<div class="a" style="left:0;top:0;width:{PW}px;height:{PH}px;transform-origin:0 0;transform:{matrix3d(PW, PH, quad)};padding:70px;color:#121416;mix-blend-mode:multiply;opacity:.9">'
        '<div style="font-weight:700;font-size:64px;letter-spacing:6px">CONTRACT</div>'
        '<div style="height:5px;background:#121416;margin:18px 0 10px"></div>' + rows +
        '<svg width="330" height="120" viewBox="0 0 330 120" style="margin-top:22px;display:block"><path d="M8 80 C 40 20, 60 20, 62 70 S 100 110, 120 50 S 160 10, 170 70 C 180 100, 210 40, 240 60 S 300 70, 322 40" fill="none" stroke="#1d3fa8" stroke-width="6" stroke-linecap="round"/></svg>'
        '<div style="height:3px;background:#3b4045;width:380px"></div>'
        '</div>')

li1111 = HEAD + f'''
<img class="a" src="img/contract.png" style="left:0;top:{T}px;width:1080px;-webkit-mask-image:linear-gradient(transparent,#000 12%)">
{page}
<div class="a" style="left:80px;right:80px;top:150px;font-weight:700;font-size:68px;line-height:1.1;letter-spacing:-.5px">
Drift starts when scope<br>lives in a <span class="g">chat thread.</span></div>
{bub}
<div class="a" style="left:80px;right:80px;top:1105px;font-weight:600;font-size:38px;line-height:1.3;text-shadow:0 4px 18px rgba(0,0,0,.7)">Scope, price and timeline go in the contract.<br><span class="g">“Done” is what both sides signed.</span></div>
''' + END

open('li-1108-gallery.html', 'w', encoding='utf-8').write(li1108)
open('li-1111-scope.html', 'w', encoding='utf-8').write(li1111)
print('ok')
