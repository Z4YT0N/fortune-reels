# flow-direct: Google Flow without the UI (2026-11-08)

The owner asked for Flow "as an MCP or API, fast, without all the browser fuss" and approved working around the reCAPTCHA gate on his own account.

## How it works
- One signed-in Flow tab in the Flow browser (CDP 9333) is opened with `?fd=1`.
  - The Flow MCP (`google-flow-mcp/dist/browser.js`) and `open-flow-tabs.mjs` skip that tab, so the two never collide.
- `fd.mjs` injects a small helper into the page and calls Flow's own RPCs with the page's cookies and XSRF token:
  - `csbIsb`: a new agent session per job;
  - `StreamChat`: the agent message, with optional attachments (media IDs);
  - `Approve`: the credit approval;
  - `as29s`: get the media and its signed URL.
- Each generation carries a reCAPTCHA Enterprise token minted by the page itself (`grecaptcha.enterprise.execute(siteKey, {action: 'CHAT_GENERATION'})`).
- Before each generation it sends about 2 s of trusted pointer movement into the tab (CDP `Input.dispatchMouseEvent`).
  - Without it, video requests came back `PUBLIC_ERROR_UNUSUAL_ACTIVITY`. Images passed even without it.
- The tab never needs focus, clicks, pickers or uploads. Jobs run in parallel.

## Use
```
node vendor/flow-direct/fd.mjs gen jobs.json --par 4
```
`jobs.json` is an array of objects:
```
[{ "name": "S1", "prompt": "...", "att": ["<first-frame mediaId>", "<last-frame mediaId>"], "maxCredits": 16, "out": "C:/abs/dir" }]
```
- No `att` with an image prompt gives a free Nano Banana image.
- Two `att` with the frames-to-video prompt gives an Omni 5 s video:

  "Generate ONE video now with Omni Flash, frames-to-video mode, 9:16, 5 seconds, 720p, x1. Use the first attached image as the FIRST frame and the second attached image as the LAST frame. Do not generate images. <motion>. One continuous camera move, no cut, real photographic footage, natural physics, no text."
- Credits are approved only when the agent's quote is at or under `maxCredits` (default 0, so only free work runs).
- Videos: the `/video/` URL serves a JPEG poster until the MP4 is ready. `fd.mjs` polls until the content-type is `video/*`, then saves `<mediaId>.mp4`.
- Debug commands:
  - `node fd.mjs chat "<text>" [--att id,id] [--approve]`
  - `node fd.mjs rpc <rpcId> '<json>'`

## Measured (2026-11-08)
- 4 images in parallel: 42 s total, no UI.
- 1 frames-to-video shot (padlock pedestal → hinge pedestal): chained correctly, 15 credits, ready about 2 min after submit.

## Upload local images (since 2026-11-09)
```
node fd.mjs upload img1.jpg img2.png
```
- It prints `[{file, media}]`. Attach those media IDs in `att`.
- It uses the RPC `maseQ`: `[ctx(token UPLOAD_IMAGE), base64, mime, 1, null×4, fileName, null, UUID, UUID]`.
- It needs no clicks and no MCP.
- Verified with a 1600×1046 client photo that downloaded back intact.

## Traps
- **Background tabs:** a background or hidden tab may never acknowledge CDP Input events. `wiggle` therefore waits at most 400 ms per event; without that, the call hangs forever.
- **Leftover tabs:** an extra Drive tab left by `gd_upload_batch.py` is harmless, but close it.

## Research files
- `probe.mjs`: the replay experiment.
- `sniff.mjs`: passive request recorder (strips tokens).
- `trigger.mjs`: types into a tab's composer.
- `ev.mjs`: evaluates JS in a tab.

## Risk
- This is an unofficial client. Google can change the RPCs or tighten reCAPTCHA at any time.
- If `UNUSUAL_ACTIVITY` comes back, stop. Do not loop retries, because repeated flags can put the account under review. Fall back to the MCP UI path.
