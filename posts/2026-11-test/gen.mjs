// usage: node gen.mjs <promptfile> <aspect> [refs=both|none]
import fs from 'node:fs'; import { execFileSync } from 'node:child_process';
const [pf, aspect, refs='both'] = process.argv.slice(2);
const bible = fs.readFileSync('E:/Library/01-Workspace/Fortune/fortune-reels/research/style-bible-2026-11/bible.txt','utf8').trim();
const subj = fs.readFileSync(pf,'utf8').trim();
const prompt = subj.startsWith('NOBIBLE') ? subj.slice(7).trim() : bible + '\n\nSUBJECT: ' + subj;
const args = { project_id:'12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36', kind:'image', prompt, aspect,
  reference_image_ids: refs==='none'?[]:refs==='B'?['d81ef7bc-266a-4727-b81e-ee98182ced40']:refs==='C'?['ac311031-e93c-49e4-943a-63c64772173a']:['d81ef7bc-266a-4727-b81e-ee98182ced40','ac311031-e93c-49e4-943a-63c64772173a'],
  download_dir:'E:/Library/01-Workspace/Fortune/fortune-reels/posts/2026-11-test/gen' };
const out = execFileSync('node',['E:/Library/01-Workspace/Fortune/fortune-reels/vendor/flow-call.mjs','flow_agent_generate',JSON.stringify(args)],{encoding:'utf8',maxBuffer:1e8});
console.log(out.slice(0,3000));
