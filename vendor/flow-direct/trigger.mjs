// Types a prompt into the Flow composer of the given tab and presses Enter (used to make the UI emit one request).
const [targetId, text] = process.argv.slice(2);
const t = (await (await fetch('http://127.0.0.1:9333/json')).json()).find(x => x.id === targetId);
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pend = new Map();
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (e) => (await send('Runtime.evaluate', { expression: e, returnByValue: true })).result?.result?.value;
console.log('composer', await ev(`(()=>{const el=document.querySelector('div[role=textbox][contenteditable=true]');if(!el)return 'none';el.focus();return el.getAttribute('aria-label')})()`));
await send('Input.insertText', { text });
await new Promise(r => setTimeout(r, 800));
for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 });
console.log('sent'); ws.close();
