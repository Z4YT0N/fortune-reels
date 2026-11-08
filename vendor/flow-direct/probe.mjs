// Experiment (owner OK 2026-11-08): can a generation RPC be replayed from inside the signed-in Flow page
// with a fresh page-minted reCAPTCHA token, so generation needs no UI clicks?
// 1) attaches to the Flow tab whose targetId is given, 2) pauses the UI's own generation request,
// 3) cancels it and re-sends the same body from the page with a NEW token, 4) prints both outcomes.
// usage: node probe.mjs <targetId>
const [targetId] = process.argv.slice(2);
const t = (await (await fetch('http://127.0.0.1:9333/json')).json()).find(x => x.id === targetId);
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise(r => ws.addEventListener('open', r, { once: true }));
let id = 0; const pend = new Map(); const on = [];
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } else if (m.method) on.forEach(f => f(m)); });
const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
const ev = async (expression) => (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result;

await send('Fetch.enable', { patterns: [{ urlPattern: '*AiSandboxAngularFrontend/data/*', requestStage: 'Request' }] });
console.log('waiting for a generation request (trigger one in this tab)...');
let done = false;
const GEN = /rpcids=(MZZa6b|YhhmEf|eb1hJf|nprQif|jIps6|fZytfe|ogiZ0b)\b|(StreamChat)/;
on.push(async m => {
  if (m.method !== 'Fetch.requestPaused') return;
  const { requestId, request } = m.params;
  const hk = Object.keys(request.headers).find(k => k.toLowerCase() === 'x-fc-replay');
  if (hk) { const h = Object.entries(request.headers).filter(([k]) => k !== hk).map(([name, value]) => ({ name, value }));
    await send('Fetch.continueRequest', { requestId, headers: h }); return; }
  if (!GEN.test(request.url) || done) { await send('Fetch.continueRequest', { requestId }); return; }
  done = true;
  const mm = request.url.match(GEN); const rpc = mm[1] || mm[2];
  console.log('captured', rpc, 'body bytes', (request.postData || '').length);
  await send('Fetch.failRequest', { requestId, errorReason: 'Aborted' });  // UI request never reaches Google
  const res = await ev(`(async () => {
    const url = ${JSON.stringify(request.url)}; const body = ${JSON.stringify(request.postData || '')};
    const p = new URLSearchParams(body); const fr = p.get('f.req');
    const oldTok = (fr.match(/[A-Za-z0-9_-]{300,}/) || [null])[0];
    const key = [...document.scripts].map(s => s.src).find(s => s.includes('enterprise.js?')).match(/render=([^&]+)/)[1];
    const action = ${JSON.stringify(rpc === 'ogiZ0b' ? 'IMAGE_GENERATION' : rpc === 'StreamChat' ? 'CHAT_GENERATION' : 'VIDEO_GENERATION')};
    const tok = await grecaptcha.enterprise.execute(key, { action });
    p.set('f.req', fr.replace(oldTok, tok));
    const u = new URL(url, location.href); u.searchParams.set('_reqid', String(Math.floor(Math.random()*900000)+100000));
    const r = await fetch(u, { method: 'POST', credentials: 'include', headers: { ...${JSON.stringify(request.headers)}, 'x-fc-replay': '1' }, body: p.toString() });
    const txt = await r.text();
    return { status: r.status, hadOldToken: !!oldTok, key: !!key, body: txt.slice(0, 3000) };
  })()`);
  console.log('REPLAY', JSON.stringify(res.value || res, null, 1));
  ws.close(); process.exit(0);
});
setTimeout(() => { console.log('timeout'); process.exit(2); }, 600000);
