// Upload local files into a Google Drive folder through the signed-in Flow browser (CDP 9333), by CDP drag-and-drop.
// usage: node gd_upload.mjs <folderId> <C:\abs\file1> [file2 ...]   Opens its own Drive tab if none is open; close it after with: agent-browser --cdp 9333 --session gd tab close
const [folderId, ...files] = process.argv.slice(2);
const targets = await (await fetch('http://127.0.0.1:9333/json')).json();
let tab = targets.find(t => t.type === 'page' && t.url.includes('drive.google.com'));
if (!tab) tab = await (await fetch('http://127.0.0.1:9333/json/new?https://drive.google.com/drive/my-drive', { method: 'PUT' })).json();  // new tab, never a Flow tab
const ws = new WebSocket(tab.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pending = new Map(); const listeners = [];
ws.addEventListener('message', e => {
  const m = JSON.parse(e.data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  else if (m.method) listeners.forEach(l => l(m));
});
const send = (method, params = {}) => new Promise(r => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const sleep = ms => new Promise(r => setTimeout(r, ms));
const evalJs = async expr => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.result?.value;

await send('Page.enable'); await send('Page.bringToFront');
await send('Page.navigate', { url: `https://drive.google.com/drive/folders/${folderId}` });
await sleep(6000);
await send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
await send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Escape', code: 'Escape', windowsVirtualKeyCode: 27 });
const vp = await evalJs('({w:innerWidth,h:innerHeight})');
const x = vp.w * 0.6, y = vp.h * 0.6;
const data = { items: [], files, dragOperationsMask: 1 };
for (const type of ['dragEnter', 'dragOver', 'drop']) {
  const r = await send('Input.dispatchDragEvent', { type, x, y, data });
  console.log(type, JSON.stringify(r.error || 'ok'));
  await sleep(400);
}
// wait for Drive's upload panel to settle
for (let i = 0; i < 180; i++) {
  await sleep(5000);
  const t = await evalJs(`(document.querySelector('[aria-live]')?.innerText||'')+' || '+[...document.querySelectorAll('div')].map(d=>d.innerText).find(s=>/uploads? complete|uploading/i.test(s)&&s.length<80)`);
  if (/complete/i.test(t || '')) { console.log('done:', t); break; }
  if (i % 6 === 0) console.log('...', (t || '').slice(0, 100));
}
ws.close();
