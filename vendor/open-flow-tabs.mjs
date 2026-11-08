// Make sure the Flow browser (CDP 9333) has N Flow tabs so FLOW_TAB_SLOT indices stay stable.
import { chromium } from './google-flow-mcp/node_modules/playwright-core/index.mjs';
const N = Number(process.argv[2] || 3);
const b = await chromium.connectOverCDP('http://127.0.0.1:9333');
const ctx = b.contexts()[0];
let tabs = ctx.pages().filter((p) => p.url().startsWith('https://flow.google.com') && !p.url().includes('fd=1'));
console.log('flow tabs before', tabs.length, tabs.map((p) => p.url().slice(0, 80)));
while (tabs.length < N) { const p = await ctx.newPage(); await p.goto(tabs[0]?.url() || 'https://flow.google.com/', { waitUntil: 'domcontentloaded' }); tabs.push(p); }
console.log('flow tabs now', ctx.pages().filter((p) => p.url().startsWith('https://flow.google.com')).length);
process.exit(0);
