// builds a fake company-site gallery page (w x h) and returns the element
function galleryUI(w, h, opt = {}) {
  const n = opt.n || (w < 600 ? 8 : 6); const photos = opt.photos || Array.from({length:n}, (_, i) => i % 2 ? 'gen/p6_photo_b.png' : 'gen/p5_photo_a.png');
  const pos = ['50% 40%','30% 50%','80% 70%','90% 30%','20% 80%','60% 90%'];
  const zoom = ['cover','cover','260%','230%','240%','250%'];
  const d = document.createElement('div');
  d.className = 'abs gui';
  d.style.cssText = `left:0; top:0; width:${w}px; height:${h}px; background:#F4F5F6; overflow:hidden; direction:rtl; transform-origin:0 0;`;
  const cols = opt.cols || 3, gap = 18, pad = 40, top = 150;
  const cw = (w - pad*2 - gap*(cols-1)) / cols, ch = cw * (opt.ratio || (w < 600 ? 1.0 : 0.68));
  let cells = '';
  photos.forEach((p, i) => {
    const r = Math.floor(i/cols), c = i % cols;
    cells += `<div class="abs" style="right:${pad + c*(cw+gap)}px; top:${top + r*(ch+gap)}px; width:${cw}px; height:${ch}px; border-radius:10px; background:url(${p}) ${pos[i%6]}/${w < 600 ? zoom[i%6].replace('100%','cover') : zoom[i%6]} no-repeat; ${opt.cellStyle ? opt.cellStyle(i) : ''}"></div>`;
  });
  d.innerHTML = `
    <div class="abs" style="left:0; right:0; top:0; height:64px; background:#fff; border-bottom:1px solid #e3e5e8"></div>
    <div class="abs" style="right:40px; top:20px; width:120px; height:24px; border-radius:6px; background:#121416"></div>
    ${(w < 600 ? [0] : [0,1,2,3]).map(i => `<div class="abs" style="left:${40 + i*90}px; top:27px; width:66px; height:10px; border-radius:5px; background:#c9ccd0"></div>`).join('')}
    <div class="abs" style="right:40px; top:84px; font-family:Plex; font-size:40px; color:#121416; line-height:1.2">معرض الصور</div>
    ${w < 600 ? "" : `<div class="abs" style="left:40px; top:98px; width:150px; height:30px; border-radius:15px; background:#121416"></div>`}
    ${cells}`;
  return d;
}
