import sys, numpy as np
from PIL import Image
a = np.asarray(Image.open(sys.argv[1]).convert('RGB')).astype(int)
r,g,b = a[...,0],a[...,1],a[...,2]
m = (abs(r-128)<22)&(abs(g-128)<22)&(abs(b-128)<22)&(abs(r-g)<10)&(abs(g-b)<10)
ys,xs = np.nonzero(m)
s = xs+ys; d = xs-ys
print('TL',xs[s.argmin()],ys[s.argmin()],'BR',xs[s.argmax()],ys[s.argmax()],'TR',xs[d.argmax()],ys[d.argmax()],'BL',xs[d.argmin()],ys[d.argmin()], 'count', m.sum(), a.shape)
