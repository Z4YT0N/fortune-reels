// footer row + icons; call foot(left, top, width)
const GLOBE = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c3 3.2 3 16.8 0 20M12 2c-3 3.2-3 16.8 0 20"/></svg>';
const WA = '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.3 4.1c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4l-.5-.3-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.8 6.8 0 0 1-3.4-3c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-2c-.2-.5-.4-.5-.6-.5h-.5Z"/></svg>';
function foot(l, t, w) {
  const d = document.createElement('div'); d.className = 'foot';
  d.style.cssText = `left:${l}px; top:${t}px; width:${w}px; z-index:60`;
  d.innerHTML = `<span>${GLOBE}www.fortunecode.org</span><span>${WA}01030608763</span>`;
  document.body.appendChild(d);
}
// homography: map a w x h element onto quad [[x,y]*4] TL,TR,BR,BL
function quadTransform(w, h, q) {
  const src = [[0,0],[w,0],[w,h],[0,h]], A = [], B = [];
  for (let i = 0; i < 4; i++) { const [x,y] = src[i], [u,v] = q[i];
    A.push([x,y,1,0,0,0,-u*x,-u*y]); B.push(u); A.push([0,0,0,x,y,1,-v*x,-v*y]); B.push(v); }
  // gaussian elimination
  for (let c = 0; c < 8; c++) { let p = c; for (let r = c+1; r < 8; r++) if (Math.abs(A[r][c]) > Math.abs(A[p][c])) p = r;
    [A[c],A[p]] = [A[p],A[c]]; [B[c],B[p]] = [B[p],B[c]];
    for (let r = 0; r < 8; r++) if (r !== c) { const f = A[r][c]/A[c][c]; for (let k = c; k < 8; k++) A[r][k] -= f*A[c][k]; B[r] -= f*B[c]; } }
  const s = B.map((b,i) => b/A[i][i]);
  return `matrix3d(${s[0]},${s[3]},0,${s[6]},${s[1]},${s[4]},0,${s[7]},0,0,1,0,${s[2]},${s[5]},0,1)`;
}
function fitLines(sel, max) {
  for (const n of document.querySelectorAll(sel)) { const m = +(n.dataset.max || max); let fs = parseFloat(getComputedStyle(n).fontSize);
    while (n.getBoundingClientRect().width > m && fs > 16) { fs -= 1; n.style.fontSize = fs + 'px'; } }
}
