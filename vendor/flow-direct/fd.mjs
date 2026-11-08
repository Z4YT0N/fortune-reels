// flow-direct: drive Google Flow by RPC from inside ONE signed-in Flow tab (CDP 9333). No clicks, no pickers,
// no uploads through the UI, many jobs in parallel. Generation carries a reCAPTCHA token minted by the page's
// own grecaptcha client (owner OK 2026-11-08). The tab URL carries ?fd=1, so the Flow MCP never uses it.
//
//   node fd.mjs gen  jobs.json [--par 4]   run jobs (see below) in parallel, download results, print a JSON summary
//   node fd.mjs chat "<text>" [--att id,id] [--approve]          one agent message (debug)
//   node fd.mjs rpc  <rpcId> '<json payload>'                     one read-only RPC (debug)
//
// jobs.json: [{ "name": "K0", "prompt": "...", "att": ["<mediaId>", ...], "out": "C:/abs/dir", "maxCredits": 16 }, ...]
//   att = media ids attached in order (for frames-to-video: first frame, last frame). Prompt says what to make;
//   the Flow agent picks the tool. Jobs needing credits are approved only when the quote <= maxCredits (default 0).
import fs from 'node:fs'; import path from 'node:path';
const CDP = 'http://127.0.0.1:9333';
const PROJECT = process.env.FLOW_PROJECT || '12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36';
const MARK = 'fd=1';

async function tab() {
  const ts = await (await fetch(`${CDP}/json`)).json();
  let t = ts.find(x => x.type === 'page' && x.url.includes('flow.google.com') && x.url.includes(MARK));
  if (!t) { t = await (await fetch(`${CDP}/json/new?https://flow.google.com/project/${PROJECT}?${MARK}`, { method: 'PUT' })).json(); await new Promise(r => setTimeout(r, 9000)); }
  const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r, { once: true }));
  let id = 0; const pend = new Map();
  ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id && pend.has(m.id)) { pend.get(m.id)(m); pend.delete(m.id); } });
  const send = (method, params = {}) => new Promise(r => { const i = ++id; pend.set(i, r); ws.send(JSON.stringify({ id: i, method, params })); });
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', { expression: `(${PAGE_JS})(), ${expr}`, awaitPromise: true, returnByValue: true });
    if (r.result.exceptionDetails) throw new Error(r.result.exceptionDetails.exception?.description || 'eval error');
    return r.result.result.value;
  };
  // Human-like pointer activity in the tab before a generation (reCAPTCHA is score based; video needs a higher score).
  const wiggle = async () => { let x = 300 + Math.random() * 400, y = 300 + Math.random() * 300;
    for (let i = 0; i < 25; i++) { x += (Math.random() - 0.5) * 60; y += (Math.random() - 0.5) * 40;
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }); await new Promise(r => setTimeout(r, 40 + Math.random() * 80)); }
    await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x, y, deltaX: 0, deltaY: 120 }); };
  return { ev, wiggle, close: () => ws.close() };
}

// Installed in the page on every call (idempotent), so a page reload never breaks us.
const PAGE_JS = String.raw`() => {
  if (window.__fd && window.__fd.v === 3) return;
  const w = () => window.WIZ_global_data;
  const pid = () => location.pathname.split('/project/')[1].split(/[/?#]/)[0];
  const key = () => [...document.scripts].map(s => s.src).find(s => s.includes('enterprise.js?')).match(/render=([^&]+)/)[1];
  const qs = (extra) => new URLSearchParams({ ...extra, bl: w().cfb2h, 'f.sid': w().FdrFJe, hl: 'en', _reqid: String(Math.floor(Math.random() * 900000) + 100000), rt: 'c' });
  const frames = (txt) => { const out = []; for (const l of txt.split('\n')) { const t = l.trim(); if (t.startsWith('[')) try { out.push(...JSON.parse(t)); } catch (e) {} } return out; };
  const post = (url, freq) => fetch(url, { method: 'POST', credentials: 'include', headers: { 'content-type': 'application/x-www-form-urlencoded;charset=UTF-8', 'x-same-domain': '1' }, body: new URLSearchParams({ 'f.req': freq, at: w().SNlM0e }) + '&' });
  const rpc = async (id, payload) => {
    const r = await post('/_/AiSandboxAngularFrontend/data/batchexecute?' + qs({ rpcids: id, 'source-path': location.pathname }), JSON.stringify([[[id, JSON.stringify(payload), null, 'generic']]]));
    const f = frames(await r.text()).find(e => e[0] === 'wrb.fr' && e[1] === id);
    return f ? { data: f[2] ? JSON.parse(f[2]) : null, error: f[5] || null } : { error: 'no frame ' + r.status };
  };
  const chat = async (sessionId, text, att, mode) => {   // mode 1 = first message, 2 = follow-up, 'approve'
    const tok = await grecaptcha.enterprise.execute(key(), { action: 'CHAT_GENERATION' });
    const ctx = ['projects/' + pid(), null, [tok, 1], null, null, mode === 1 ? 1 : 2];
    const payload = mode === 'approve' ? [sessionId, [[[['Approve']]]], ctx, null, 1]
      : [sessionId, att && att.length ? [[[[text]]], att.map(a => [a])] : [[[[text]]]], ctx];
    const r = await post('/_/AiSandboxAngularFrontend/data/google.internal.labs.aisandbox.proto.flow.agent.v1.FlowCreationAgentService/StreamChat?' + qs({}), JSON.stringify([null, JSON.stringify(payload)]));
    const raw = (await r.text()).replace(/\\/g, '');
    const media = [...new Set([...raw.matchAll(/"media_id",\[null,null,"([0-9a-f-]{36})"/g)].map(m => m[1]))];
    const cost = (raw.match(/"total_cost",\[null,([0-9.]+)/) || [])[1];
    const said = [...raw.matchAll(/"text",\[null,null,"([^"]{2,400})"/g)].map(m => m[1]).filter(s => !s.startsWith('json')).slice(-2);
    return { status: r.status, permission: /ask_for_permission/.test(raw), cost: cost ? Number(cost) : null, unusual: /UNUSUAL_ACTIVITY|PUBLIC_ERROR_[A-Z_]+/.exec(raw)?.[0] || null, media, said };
  };
  const session = async () => JSON.stringify((await rpc('csbIsb', [pid(), null, crypto.randomUUID()])).data).match(/[0-9a-f-]{36}/)[0];
  const url = async (mediaId) => { const r = await rpc('as29s', [mediaId]); const s = JSON.stringify(r.data || ''); return { url: (s.match(/https:\/\/flow-content\.google\/video\/[^"]+/) || s.match(/https:\/\/flow-content\.google\/image\/[^"]+/) || [null])[0], error: r.error }; };
  window.__fd = { v: 3, rpc, chat, session, url };
}`;

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
async function runJob(t, job) {
  const sid = await t.ev('__fd.session()');
  await t.wiggle();
  let r = await t.ev(`__fd.chat(${JSON.stringify(sid)}, ${JSON.stringify(job.prompt)}, ${JSON.stringify(job.att || [])}, 1)`);
  const log = { name: job.name, sid, cost: r.cost, said: r.said };
  if (r.unusual) return { ...log, error: r.unusual };
  if (r.permission) {
    if ((r.cost ?? 999) > (job.maxCredits ?? 0)) return { ...log, error: `needs ${r.cost} credits > maxCredits ${job.maxCredits ?? 0}` };
    await t.wiggle();
    r = await t.ev(`__fd.chat(${JSON.stringify(sid)}, '', [], 'approve')`);
    if (r.unusual) return { ...log, error: r.unusual };
  }
  if (!r.media.length) return { ...log, error: 'no media in reply', said: r.said };
  const files = [];
  for (const m of r.media) {                       // videos render async: the /video/ URL serves a JPEG poster until the MP4 is ready
    let buf = null, u = null, ext = 'png';
    for (let i = 0; i < 120 && !buf; i++) {
      u = (await t.ev(`__fd.url(${JSON.stringify(m)})`)).url;
      if (u) { const res = await fetch(u); const ct = res.headers.get('content-type') || '';
        const wantVideo = /video/i.test(job.prompt);
        if ((u.includes('/video/') || wantVideo) && !ct.startsWith('video/')) { await res.arrayBuffer(); }
        else { buf = Buffer.from(await res.arrayBuffer()); ext = ct.startsWith('video/') ? 'mp4' : ct.includes('jpeg') ? 'jpg' : 'png'; } }
      if (!buf) await sleep(5000);
    }
    if (!buf) { files.push({ media: m, error: 'not ready after 10 min' }); continue; }
    if (job.out) { fs.mkdirSync(job.out, { recursive: true }); const f = path.join(job.out, `${m}.${ext}`); fs.writeFileSync(f, buf); files.push({ media: m, file: f }); }
    else files.push({ media: m, url: u });
  }
  return { ...log, files };
}

const argv = process.argv.slice(2); const [cmd, a1, a2] = argv;
const opt = (n, d) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : d; };
const t = await tab();
try {
  if (cmd === 'rpc') console.log(JSON.stringify(await t.ev(`__fd.rpc(${JSON.stringify(a1)}, ${a2})`)).slice(0, 4000));
  else if (cmd === 'chat') {
    const sid = opt('--session') || await t.ev('__fd.session()');
    const att = (opt('--att', '') || '').split(',').filter(Boolean);
    let r = await t.ev(`__fd.chat(${JSON.stringify(sid)}, ${JSON.stringify(a1)}, ${JSON.stringify(att)}, 1)`);
    console.log(JSON.stringify({ sid, ...r }));
    if (r.permission && argv.includes('--approve')) console.log(JSON.stringify(await t.ev(`__fd.chat(${JSON.stringify(sid)}, '', [], 'approve')`)));
  } else if (cmd === 'gen') {
    const jobs = JSON.parse(fs.readFileSync(a1, 'utf8')); const par = Number(opt('--par', 4)); const out = []; let k = 0;
    const t0 = Date.now();
    await Promise.all(Array.from({ length: Math.min(par, jobs.length) }, async () => {
      while (k < jobs.length) { const j = jobs[k++]; const s = Date.now();
        try { out.push({ ...(await runJob(t, j)), secs: Math.round((Date.now() - s) / 1000) }); } catch (e) { out.push({ name: j.name, error: String(e.message || e) }); }
        console.error(`done ${j.name} (${out.length}/${jobs.length})`); }
    }));
    console.log(JSON.stringify({ totalSecs: Math.round((Date.now() - t0) / 1000), results: out }, null, 1));
  } else console.log('usage: see header');
} finally { t.close(); }
