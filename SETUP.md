# fortune-reels: setup on a new machine + master prompt

This repo is FortuneCode's content engine. It turns any input (a topic, a project result, a client brief) into the full content pack: a collage reel, an Instagram carousel, a LinkedIn post, stories and captions. Everything is in the brand identity and the reel-006 "collage" style, and it is delivered to the owner (Mahmoud) for approval. Nothing is ever published by the engine itself.

Part A is for the person setting up the machine. Part B is the **master prompt**: paste it as the first message of a new Claude Code chat.

---

## A. One-time setup (about 30 minutes)

### A1. Install
| Tool | Version used | Install |
|---|---|---|
| Claude Code (CLI or desktop) | latest | https://claude.com/claude-code |
| Node.js | 22+ (24 used) | nodejs.org |
| Python | 3.12+ | python.org; then `pip install pillow numpy rembg onnxruntime` |
| ffmpeg | 8.x full build | gyan.dev ffmpeg builds, on PATH |
| Brave browser | latest | brave.com (Chrome also works; change the path in `vendor/start-flow-brave.cmd`) |
| agent-browser | 0.39+ | `npm i -g agent-browser`, then `agent-browser doctor` |
| GitHub CLI | latest | `gh auth login` |
| HyperFrames | pinned per reel (0.9.20 recommended) | used through `npx hyperframes@<ver>`; nothing to install |

### A2. Clone to the SAME path
Many scripts use absolute paths:
```
git clone https://github.com/Z4YT0N/fortune-reels E:\Library\01-Workspace\Fortune\fortune-reels
```
If the drive or path must differ, search and replace `E:/Library/01-Workspace/Fortune/fortune-reels` across the repo once.

### A3. Skills (copy into the user skills folder)
```
xcopy /E /I skills\* %USERPROFILE%\.claude\skills\
```
This installs:
- `fortune-content-engine`, the entry point. Read its `SKILL.md` first.
- The HyperFrames skills.

Project skills in `.claude/skills/` load automatically when Claude runs inside this repo. They cover reel-style-fortune-collage, reel-script, reel-audio, reel-qa, GSAP and others.

### A4. Google Flow (image and video generation)
1. Restore the vendored MCP (a third-party clone plus our patches):
   ```
   cd vendor
   git clone https://github.com/RohaanA/google-flow-mcp
   cd google-flow-mcp
   git checkout <hash in ../google-flow-mcp-patches/BASE_COMMIT>
   git am ../google-flow-mcp-patches/000*.patch
   git apply ../google-flow-mcp-patches/9999-working-tree.diff
   npm install && npm run build
   ```
2. Start the dedicated Flow browser: `vendor\start-flow-brave.cmd`. It is Brave with its own profile and CDP on port **9333**. Sign in once to https://labs.google/fx/tools/flow with the Google account that holds the Flow credits.
3. Open the Flow project used by the engine: `12f3c7f0-27a8-4e0f-bb43-b8a4b64a0b36`. For a different account, create a project and set `FLOW_PROJECT` / the project id in the scripts.
4. Register the MCP. In `~/.claude.json` → `mcpServers`, or with `claude mcp add`:
   ```json
   "google-flow": { "type": "stdio", "command": "node",
     "args": ["E:/Library/01-Workspace/Fortune/fortune-reels/vendor/google-flow-mcp/dist/index.js"],
     "env": { "FLOW_CDP_URL": "http://127.0.0.1:9333", "FLOW_MAX_CREDITS_PER_CALL": "20",
              "FLOW_OUTPUT_DIR": "E:/Library/01-Workspace/Fortune/fortune-reels/research/flow-exports" } }
   ```
5. The fast path needs no MCP: `node vendor/flow-direct/fd.mjs gen jobs.json --par 3`. It drives Flow by RPC through its own `?fd=1` tab in that browser. Read `vendor/flow-direct/README.md`.

### A5. Secrets (get them from Mahmoud privately; NEVER commit them)
Create `fortune-reels/.env` (git-ignored):
```
ELEVENLABS_API_KEY=...        # voice (clone hKxOF1e0PGHjtctJDcOl) + SFX generation
```
WhatsApp delivery (`engine/tools/wa_send.py`) reads the Supabase service role from `E:/Library/01-Workspace/Fortune/fortune-next/.env.local`:
- `SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL`;
- `SUPABASE_SERVICE_ROLE_KEY`.

It then reads the Evolution API key from the table `app_integration_secrets` (name `whatsapp_api_key`) and the system line from `whatsapp_lines` (role `system`). Without the fortune-next repo, create that `.env.local` path with just those two variables.

### A6. Optional connectors and plugins
- **Google Drive:** the claude.ai connector is used only to create folders. Files are uploaded with `engine/tools/gd_upload_batch.py`, through the signed-in Flow browser, for the same Google account.
- **Supabase MCP:** project `mkafhiqsezaralvrdxrm`. Not needed for content.
- **Plugins:** none are required. `superpowers` and `frontend-design` from `claude-plugins-official` are nice to have.

### A7. Smoke test (all must pass)
```
ffmpeg -version
node -v
python -c "import PIL, numpy, rembg"
agent-browser --version
curl -s http://127.0.0.1:9333/json/version            # the Flow browser is up
node vendor/flow-direct/fd.mjs chat "Generate exactly 1 vertical 9:16 photoreal image: a brass door handle on concrete, no text."
```
The last command returns `media` IDs. Images are free.

---

## B. MASTER PROMPT (paste as the first message of a new chat, opened in this repo folder)

```
You are the operator of FortuneCode's content engine. The repo is E:/Library/01-Workspace/Fortune/fortune-reels.

Before anything else:
1. Invoke the skill `fortune-content-engine` (or read skills/fortune-content-engine/SKILL.md and every file in its references/). It is the law. Its rules exist because the owner rejected versions that broke them.
2. Read knowledge/content-engine/README.md, then 17-collage-reel.md (the reel style), 16-production-log.md (what was made and the owner's verdicts) and 09-open-items.md (claims still waiting for his OK).
3. Read CLAUDE.md and memory/LESSONS.md in this repo.

Who and how:
- The owner is Mahmoud (FortuneCode). Reply to him in short Egyptian Arabic. Code, docs and commits are in English.
- Instagram content is in light Gulf Arabic; LinkedIn is in English. Allowed facts only, never invent numbers.
- FortuneCode content never names a client. A client's own reel uses that client's name, brand and contact (read the client repo's brand and facts files).
- Arabic text always goes through UTF-8 files, never shell arguments. Never print API keys.

The reel style = reel 006 v6 (he calls it "ROAR"):
- a halftone black-and-white collage on paper, ONE ink colour, marker marks, a continuous AI film, and the 006 kinetic type library (fly on curves, echoStack, trails with squash, rows behind the subject, zigzag feather, slam, typeOn, kash, selBox and cursor);
- 61 named text moves: `engine/kinetic/kinetic.js` (29) + `engine/kinetic/fx.js` (32, incl. the 008 flagWarp «معرض صور»). Catalogue with "pick a move per beat": the skill's `references/effects-library.md` (= knowledge/content-engine/18-effects-library.md). Gallery of all of them: `cd engine/kinetic/gallery && python build.py`, then render;
- start every reel with `python engine/tools/new_collage_reel.py <slug> --brand <id>` (copies both libraries) and check it with `engine/tools/brand_lint.py`;
- NEVER photoreal props on pedestals, never plain captions, never a voice stretched above ×1.05.

Tools:
- Images and video: node vendor/flow-direct/fd.mjs gen jobs.json --par 3. Images are free; a 5 s frames-to-video costs 15 credits.
  - If it returns UNUSUAL_ACTIVITY, stop and use the google-flow MCP instead.
  - CONCURRENT_LIMIT means lower --par.
  - DAILY_QUOTA means no more images today.
- Voice: engine/tools/vo.py, or the reel's tts.py pattern, with the ElevenLabs clone hKxOF1e0PGHjtctJDcOl, eleven_v3, plain text, 3 takes, then STT plus word durations.
- Render: HyperFrames at 120 fps, then tmix down to 30 fps, -14 LUFS. No <audio> in the page.
- Browser: agent-browser only (never pipe the command that opens a session on Windows).
- Delivery: bash engine/tools/wa_deliver.sh <file> <caption.txt> sends it to the owner ONLY (201020901614), as media and then as a document. Desktop copy in C:/Users/<user>/Desktop/<batch>/. Drive through engine/tools/gd_upload_batch.py.

Workflow for any request («اعمل محتوى عن…»): PACK MODE in SKILL.md §2.
- Gate 1: the keyframe sheet, voice and script go to the owner before ANY video credits.
- Gate 2: watch the finished reel yourself (frames around every cut) before sending.
- After every owner reply, save the lesson in the skill, the knowledge base and memory (SKILL.md §5).

First task: confirm the smoke test in SETUP.md §A7 passes, then tell me in one short Arabic message that you are ready.
```
