const GLOBE='<svg viewBox="0 0 24 24" fill="none" stroke="#F0F1F2" stroke-width="1.6"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2c3 3.2 3 16.8 0 20M12 2c-3 3.2-3 16.8 0 20"/></svg>';
const WA='<svg viewBox="0 0 24 24"><path fill="#F0F1F2" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.2 15.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 0 1 12 3.8Zm-3.3 4.1c-.2 0-.5 0-.7.3-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 2.4 1 2.9.8 3.4.7.5 0 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4l-.5-.3-1.8-.9c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.8 6.8 0 0 1-3.4-3c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-2c-.2-.5-.4-.5-.6-.5h-.5Z"/></svg>';
// pages: each .pg gets logo + footer + counter
function frame(n,{logo='center',counter=true}={}){
  document.querySelectorAll('.pg').forEach((p,i)=>{
    const l=document.createElement('img');l.className='logo';l.src='../_kit/logo.svg';
    if(logo==='center'){l.style.left='50%';l.style.transform='translateX(-50%)'}else{l.style[logo]='80px'}
    p.appendChild(l);
    const f=document.createElement('div');f.className='foot';f.style.left='80px';f.style.right='80px';
    f.innerHTML=`<span>${GLOBE}www.fortunecode.org</span><span>${WA}+20 10 98066484</span>`;p.appendChild(f);
    if(counter&&logo==='center'){const c=document.createElement('div');c.className='count';c.style.right='80px';c.textContent=`${i+1}/${n}`;p.appendChild(c)}
    const gr=document.createElement('div');gr.className='grain';p.appendChild(gr);
  });
}
function fit(sel,max){document.querySelectorAll(sel).forEach(n=>{let fs=parseFloat(getComputedStyle(n).fontSize);const m=+(n.dataset.max||max);while(n.scrollWidth>m&&fs>14){fs-=1;n.style.fontSize=fs+'px'}})}
