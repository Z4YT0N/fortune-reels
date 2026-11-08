const [targetId, expr] = process.argv.slice(2);
const t = (await (await fetch('http://127.0.0.1:9333/json')).json()).find(x => x.id === targetId);
const ws = new WebSocket(t.webSocketDebuggerUrl); await new Promise(r => ws.addEventListener('open', r, { once: true }));
ws.addEventListener('message', e => { const m = JSON.parse(e.data); if (m.id === 1) { console.log(JSON.stringify(m.result.result?.value ?? m.result, null, 1)); ws.close(); } });
ws.send(JSON.stringify({ id: 1, method: 'Runtime.evaluate', params: { expression: expr, awaitPromise: true, returnByValue: true } }));
