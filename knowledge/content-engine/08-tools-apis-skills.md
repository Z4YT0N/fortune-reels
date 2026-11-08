# 08. Tools, APIs, skills and sources

## Model and API status (checked 2026-11-06)
| Service | Status | Notes |
|---|---|---|
| Gemini image (`gemini-3-pro-image-preview`, also `gemini-3-pro-image`, `gemini-3.1-flash-image`, `gemini-2.5-flash-image`) | Works | Through the global `gemini-image` skill (`~/.claude/skills/gemini-image/scripts/gen.mjs`, `--ref`, `--aspect 9:16`, `--size 2K`). The owner raised the spend cap after the 429 on 2026-11-03 |
| Gemini Veo (`veo-3.1-generate-preview`, `veo-3.1-fast-generate-preview`, `veo-3.0-*`) | NOT available | Every ID returns "Model is not found". The owner must enable Veo / billing on the Google project behind `~/.claude/secrets/gemini.key` |
| ElevenLabs TTS (`eleven_v3`) | Works | Key in `reel-studio/.env`. Shared voices by ID |
| ElevenLabs STT (`scribe_v1`) | Works | Arabic dialects + English, word timestamps |
| ElevenLabs similar voices (`POST /v1/similar-voices`) | Works | Finds library voices that sound like a sample |
| Kling / Higgsfield (MCP) | Connected, no credit | Kling 0, Higgsfield 0.07 (2026-11-05). Needed for characters that really move |
| vidIQ (MCP) | Works | YouTube search + transcripts (used by the research agent) |
| yt-dlp (`python -m yt_dlp`) | Works | Public Instagram reels. Some need a login (ref 23): use `--cookies-from-browser` |
| Supermetrics | No licence | `LICENSE_NOT_FOUND`; not needed (we publish in-system) |

## Claude skills on GitHub worth learning from (read, not installed)
| Repo | Stars | What it gives | Our use |
|---|---|---|---|
| howseen-ai/claude-motion-design (MIT) | 778 | seek(t) HTML engine, Playwright render, subframe motion blur, springs, masked word rise (55 ms stagger), floods, beat map, SFX by peak, critique loop scoring /10, anti-"AI motion" rules, remake mode | Principles. We render with HyperFrames. Its SKILL.md is in `research/refs-2026-11/skill-docs/howseen-skill.md` |
| iart-ai/kinetic-typography-skills | 23 | Reveal recipes: mask rise, blur-in, clip-path wipe, SplitText, variable font, stroke draw-on | `skill-docs/iart-recipes.md`. Its 14-pack hub (tiktok, ad, explainer, motion-design…) is worth a look later |
| haidrrrry/claude-remotion-skill | 855 | Remotion video skill | Reference only |
| Liamrjohnston/remotion-motion-graphics-skill | 155 | Remotion motion graphics | Reference only |
| Hype-yolo/claude-motion-skill | 82 | 47 open-source animation cases, editable scenes | Probably "claude motion" from ref 13. Unconfirmed |
| Vincentwei1021/video-shotcraft, video-talkcraft, mg-styles-15 | 17k / 2k / 3k | Remotion promos, VO-driven motion, 15 motion styles | Seen in search; not read yet |
| GSAP `splitArabicText` helper | n/a | Splits Arabic letters with zero-width joiners so the joins survive | Test before use: https://gsap.com/docs/v3/HelperFunctions/helpers/splitArabicText |
Vet any repo before running it (global rule: hooks, postinstall, tasks.json, obfuscation).

## Key ideas from the howseen skill to carry into our engine
- A director's brief before code: duration, format, a NAMED reference style (never "premium modern"),
  timed states, layer list, sound plan. Then 4 stills approved, then the full render.
- Anti-AI-motion rules: one accent colour; one thing moves at a time; one shape system from start to end
  (transform, do not cut); springs with damping ≥ 0.72; no rainbow gradients, particles, chrome, emoji, gratuitous 3D flips.
- Silent one-sentence test: someone watches it muted; if they can sum it up in one sentence, it works.
- Critique loop: contact sheet + 12-frame strips around fast moves + phone-width sheet. Score hook,
  readability, motion, variety, composition, accuracy and sound /10. Fix everything ≤ 7 and repeat until 8+.
  The judge is a separate read-only agent.
- Motion blur by subframes (180° shutter), never across a hard cut. Adaptive subframe count.
- Cut seams: cut at peak velocity, with direction and speed matching on both sides.
- Honesty: illustrative data labelled "Example data". Captions stay true.

## Sites and courses
- Motion inspiration: raivcoo.com (filter by style, colour, software), kinetics.colorion.co,
  text-effects.colorion.co, 21st.dev, Magic UI, Aceternity (ideas to port, not run live).
- Real footage: destockd.com, archival-footage.com, pexels.com, Mixkit (music + SFX, free licence).
- 3D icons: 3dicons.co (CC0).
- Reading: Khajavi, "Kinetic Behaviors", *Arabic Script in Motion* (Palgrave 2019); Adrian Roselli,
  "Just don't split words into letters" (2026); GSAP SplitText RTL forum threads.
- Courses: no dedicated kinetic-typography course worth paying for was found. Free: School of Motion,
  "Text Animators in After Effects" (30 Days of AE). Skillshare and Udemy kinetic typography crash courses are generic.
- YouTube craft videos (ref 27): see 05.

## Commands that worked (Windows, Git Bash)
- Contact sheet: `ffmpeg -i in.mp4 -vf "fps=24/<dur>,scale=240:-1,tile=6x4" -frames:v 1 sheet.jpg`
- 12 fps strip: `ffmpeg -ss <t> -t 2 -i in.mp4 -vf "fps=12,scale=180:-1,tile=8x3" -frames:v 1 strip.jpg`
- STT: `curl -X POST https://api.elevenlabs.io/v1/speech-to-text -H "xi-api-key: $K" -F model_id=scribe_v1 -F file=@a.mp3`
- Drive zip: `curl -L "https://drive.google.com/uc?export=download&id=<ID>"`. It came as a direct zip.
- Gemini models list: `GET https://generativelanguage.googleapis.com/v1beta/models?pageSize=100&key=…`

## Google Flow: the method that worked (2026-11-06, reel 004)
- Subscription: FortuneCode Google account (Pro). 1,050 credits per cycle, reset Nov 19. **Omni 1.1 Flash, 9:16, 10 s, 720p, x1 = 15 credits.** Flow also offers Veo 3.1 Lite / Fast / Quality, which cost more.
- **Vendored MCP:** `vendor/google-flow-mcp` (RohaanA, MIT, commit a357dc3, `npm install --ignore-scripts && npm run build`) plus the client `vendor/flow-call.mjs` (`node flow-call.mjs list` / `<tool> '<json>'`).
  - It could NOT attach to the owner's Brave. Brave's new remote debugging (chrome://inspect toggle) exposes only `ws://127.0.0.1:9222/devtools/browser/<id>`. The id is in `%LOCALAPPDATA%/BraveSoftware/Brave-Browser/User Data/DevToolsActivePort`, and EVERY new client needs a click on "Allow".
  - For unattended use: start a dedicated browser with the classic flag (`--remote-debugging-port=9333 --user-data-dir=<dedicated>`), sign in once, and set `FLOW_CDP_URL=http://127.0.0.1:9333`.
- **What worked: agent-browser on the already-approved Brave session** (`agent-browser --auto-connect`, Flow tab `t1`):
  1. In Flow's agent panel, Settings → video default model Omni 1.1 Flash, 9:16, x1 → Save.
  2. `fill` the "What do you want to create?" box with a full shot prompt that starts "Generate ONE video now with Omni 1.1 Flash, 9:16 vertical, 10 seconds, 720p, x1. Do not generate images." Click "Start generation".
  3. Flow's agent replies with a quote ("costing 15 credits?"). Click the radio "Approve". You can queue several clips one after another.
  4. Each result has "Open video in editor" → "Download media" → "720p Original size". The 1080p upscale may cost credits.
     Brave saves the file as `C:/Users/Mahmoud/Downloads/<uuid>.tmp` at full size, and it stays .tmp. Copy it and rename it .mp4 (it plays fine).
- Grade the clips before use: `ffmpeg -i in.mp4 -an -vf "eq=contrast=0.94:brightness=0.01:saturation=0.82,curves=all='0/0.04 1/0.96',scale=720:1280" -c:v libx264 -crf 18 -r 24 out.mp4`.
- In HyperFrames, a `<video data-start data-media-start>` must not have a timed ancestor. Put it inside an UNTIMED wrapper div at the root (the polaroid frame) and animate the wrapper.

## WhatsApp delivery of a video to the owner (2026-11-06)
- `supabase/functions/send-whatsapp` only sends `mediatype: "image"`. For video, `engine/tools/wa_send.py <mp4> <caption.txt> <number>`:
  - reads the service role from `fortune-next/.env.local`;
  - gets `whatsapp_api_key` (app_integration_secrets) and the system instance (whatsapp_lines role=system → fc-system);
  - posts base64 media to `https://cs.fortunecode.org/api/message/sendMedia/<instance>` with mediatype video.
- **Needs a User-Agent header**: Cloudflare returns 403 "error code 1010" for Python's default UA.
- Keep the file under about 16 MB: re-encode crf 25 + maxrate 3M (31.9 s → 9.1 MB). Owner/staff only; never clients.

## Google Flow MCP: the working setup (2026-11-06)
- **Server:** `vendor/google-flow-mcp` (RohaanA, MIT, vetted). Registered in Claude Code user scope as `google-flow` with `FLOW_CDP_URL=http://127.0.0.1:9333`, `FLOW_MAX_CREDITS_PER_CALL=20`, `FLOW_OUTPUT_DIR=research/flow-exports`. The tools appear in new sessions. In a session that predates the registration, use `node vendor/flow-call.mjs <tool> '<json>'` (`list` shows the 23 tools).
- **Browser:** a dedicated Brave profile at `C:\Users\Mahmoud\.google-flow-mcp\brave-flow`, signed in to fortunecodec@gmail.com by the owner on 2026-11-06. Start it with `vendor/start-flow-brave.cmd`, which adds `--remote-debugging-port=9333`.
  - A non-default profile with the classic port flag needs NO approval click.
  - The owner's main Brave (port 9222) asks for an Allow click on every connection, so never use it for automation.
- **Traps:**
  - Google refuses sign-in inside a Playwright-launched window ("browser not secure"). The owner must sign in to a normally launched Brave, which is then closed and relaunched with the port.
  - If the profile is already open without the port, a new launch only adds a tab. Close every brave.exe whose command line has `brave-flow`, then relaunch.
  - Test: `flow_status` returned ok, recaptcha true, credits 1005.

## Flow as the image fallback (Nano Banana Pro), 2026-11-07
- **When:** the Gemini API key hit its monthly spend cap (429) during the style lab. The owner pointed out that Flow can make images too.
- **What works:** the agent panel in the dedicated Flow Brave (CDP 9333), driven with `agent-browser --session fl --cdp 9333`.
  1. Fill the "What do you want to create?" box with `Generate ONE image now with Nano Banana Pro, 9:16 vertical, x1. Do not generate video. Image: <prompt>`.
  2. Click "Start generation".
  3. Images generated WITHOUT a credit-approval step; the balance stayed at 963.
- **Fetch the result:**
  - `flow_get_project` → the newest `generations[]` entry → `flow_download_media(media_id, out_dir)`.
  - Output is 768x1376 PNG, so upscale or use it as a plate/reference.
  - Attach references as ingredients (Upload media + hook, see 11-fortune-style.md) for consistency.
- **What fails:**
  - The MCP tool `flow_generate_image` times out: the composer's "Settings trigger" button is hidden in the current Flow UI.
  - `vendor/flow-call.mjs` defaults to CDP 9222; set `FLOW_CDP_URL=http://127.0.0.1:9333` when you use it.

## Flow MCP patched (2026-11-07): use these two tools, nothing else
- `flow_upload_images(project_id, paths[])` uploads local files (real file chooser) and returns `{path, mediaId}`.
- `flow_agent_generate(project_id, kind, prompt, aspect, count, reference_image_ids?, start_image_id?, end_image_id?, duration_sec?, resolution?, max_credits, wait, download_dir)`:
  - one call: the agent message, auto-approve only when the quote ≤ max_credits, wait, download, local paths returned;
  - image = Nano Banana Pro (tested OK, no credits);
  - video = Omni 1.2 Flash; frames-to-video when start and end ids are given (not yet live-tested; costs about 12-15 credits).
- In a session that predates the patch, call the tools through `node vendor/flow-call.mjs <tool> '<json>'` (CDP now defaults to 9333). New sessions get the tools natively.
- Code lives in the vendored repo `vendor/google-flow-mcp` (commit "Add flow_upload_images and flow_agent_generate…").
- **Fixed:** agent-mode detection (the hidden Settings trigger) and a fallback that reads the quote from the page when the stream body can't be read.
- **Still broken:** the old manual-composer tools `flow_generate_image` / `flow_generate_video` (Flow hid the settings trigger).
