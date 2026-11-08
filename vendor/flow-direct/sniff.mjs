// Passive: record the f.req of every Flow generation/chat request on all Flow tabs (no pausing, no changes).
import fs from 'node:fs';
const out = process.argv[2] || 'sniff.jsonl'; const secs = Number(process.argv[3] || 600);
const tabs = (await (await fetch('http://127.0.0.1:9333/json')).json()).filter(t => t.type === 'page' && t.url.includes('flow.google.com'));
for (const t of tabs) {
  const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r, { once: true }));
  ws.send(JSON.stringify({ id: 1, method: 'Network.enable', params: {} }));
  let n = 100; const pend = new Map();
  const send = (method, params) => new Promise(r => { const i = ++n; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  ws.addEventListener('message', async e => { const m = JSON.parse(e.data);
    if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); return; }
    if (m.method === 'Network.requestWillBeSent' && /AiSandboxAngularFrontend\/data\//.test(m.params.request.url)) {
      let pd = m.params.request.postData;
      if (!pd && m.params.request.hasPostData) pd = (await send('Network.getRequestPostData', { requestId: m.params.requestId })).result?.postData;
      if (!pd) return;
      const p = new URLSearchParams(pd);
      const fr = (p.get('f.req') || '').replace(/[A-Za-z0-9_-]{300,}/g, '<TOKEN>');
      fs.appendFileSync(out, JSON.stringify({ tab: t.id.slice(0, 8), url: m.params.request.url.split('?')[0].split('/').pop() + ' ' + (m.params.request.url.match(/rpcids=([^&]+)/)?.[1] || ''), freq: fr.slice(0, 4000) }) + '\n');
    } });
}
setTimeout(() => process.exit(0), secs * 1000);
