(() => [...document.querySelectorAll('.title, .card')].map(b=>{const r=b.getBoundingClientRect(); return [b.className, Math.round(r.left), Math.round(r.right)]}))()
