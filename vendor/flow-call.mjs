// Minimal stdio MCP client for the vendored google-flow-mcp.
// Usage: node flow-call.mjs list | node flow-call.mjs <tool> '<json args>'
import { Client } from './google-flow-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { StdioClientTransport } from './google-flow-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import path from 'node:path'; import url from 'node:url';
const here = path.dirname(url.fileURLToPath(import.meta.url));
const transport = new StdioClientTransport({ command: 'node', args: [path.join(here, 'google-flow-mcp/dist/index.js')],
  env: { ...process.env, FLOW_CDP_URL: process.env.FLOW_CDP_URL || 'http://127.0.0.1:9333',
         FLOW_MAX_CREDITS_PER_CALL: process.env.FLOW_MAX_CREDITS_PER_CALL || '20',
         FLOW_OUTPUT_DIR: process.env.FLOW_OUTPUT_DIR || path.join(here, '..', 'research', 'flow-exports') } });
const client = new Client({ name: 'fortune-reels', version: '0.1.0' });
await client.connect(transport);
const [cmd, argJson] = process.argv.slice(2);
if (cmd === 'list') {
  const { tools } = await client.listTools();
  for (const t of tools) console.log(t.name, '::', (t.description || '').slice(0, 160).replace(/\n/g, ' '));
} else {
  const res = await client.callTool({ name: cmd, arguments: argJson ? JSON.parse(argJson) : {} }, undefined, { timeout: 900000 });
  console.log(JSON.stringify(res, null, 1).slice(0, 6000));
}
await client.close();
