// usage: node gen.mjs <promptfile> [aspect=3:4] [refs=yes|no]
import fs from 'node:fs'; import { execFileSync } from 'node:child_process';
const [pf, aspect='3:4', refs='yes'] = process.argv.slice(2);
const args = { project_id:'12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36', kind:'image', prompt: fs.readFileSync(pf,'utf8').trim(), aspect,
  reference_image_ids: refs==='yes' ? ['52406d06-67d7-477d-bdc9-77bc2b68a91e','918537eb-dd1d-4800-86e5-ff392e201102'] : [],
  download_dir:'E:/Library/01-Workspace/Fortune/fortune-reels/posts/2026-11-test/v2/gen' };
const out = execFileSync('node',['E:/Library/01-Workspace/Fortune/fortune-reels/vendor/flow-call.mjs','flow_agent_generate',JSON.stringify(args)],{encoding:'utf8',maxBuffer:1e8});
console.log(out.slice(0,2000));
