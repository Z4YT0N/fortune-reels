import sys, numpy as np
from PIL import Image, ImageFilter
src, out = sys.argv[1], sys.argv[2]
rng = np.random.default_rng(7)
im = Image.open(src).convert('RGB').resize((1080,1920), Image.LANCZOS)
a = np.asarray(im).astype(np.float32)/255
# matte grade: lift blacks, soften highlights, slight desaturation, warm paper tint
a = 0.04 + a*0.92
g = a.mean(2, keepdims=True); a = g + (a-g)*0.86
a = a*np.array([1.0,0.985,0.96])
# paper fibre texture: low-freq blotches + fine fibres
h,w = a.shape[:2]
low = Image.fromarray((rng.random((h//24,w//24))*255).astype(np.uint8)).resize((w,h), Image.BICUBIC)
low = np.asarray(low.filter(ImageFilter.GaussianBlur(6))).astype(np.float32)/255
a *= (0.97 + 0.05*low)[...,None]
# film grain, luminance-weighted (stronger in mids)
grain = rng.normal(0,1,(h,w)).astype(np.float32)
grain = np.asarray(Image.fromarray(((grain*40)+128).clip(0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.6))).astype(np.float32)/255-0.5
lum = a.mean(2)
amp = 0.09*(1-np.abs(lum-0.5)*1.2)
a += (grain*amp)[...,None]
# vignette
yy,xx = np.mgrid[0:h,0:w]; r = np.sqrt(((xx-w/2)/(w/2))**2+((yy-h/2)/(h/2))**2)
a *= (1-0.16*np.clip(r-0.55,0,1)**1.6)[...,None]
Image.fromarray((a.clip(0,1)*255).astype(np.uint8)).save(out, quality=94)
