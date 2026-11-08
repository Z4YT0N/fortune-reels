# 15. Delivery and storage (WhatsApp, Desktop, Google Drive)

Mirror of `~/.claude/skills/fortune-content-engine/references/delivery.md`.


Owner, 2026-11-07: «لما تبعت حاجه ابعتها ميديا علشان اشوف ودوكيومنت علشان انزله».

## 1. WhatsApp (to the owner only, 201020901614, from fc-system)
- **One command per file:**
  ```
  bash E:/Library/01-Workspace/Fortune/fortune-reels/engine/tools/wa_deliver.sh <file> <caption.txt>
  ```
  - It sends the media first. A video over 15 MB gets a compressed CRF 27 preview.
  - It then sends the original as a document. A video over 40 MB goes as a CRF 21 copy with the same name, because Evolution drops uploads above about 45 MB.
- **Caption file (Arabic, UTF-8):** what the piece is, its date and platform, and the suggested post caption.
- **Carousel:**
  1. `wa_deliver.sh contact-sheet.jpg cap.txt`;
  2. `python engine/tools/wa_send.py slides.zip cap.txt 201020901614 document`.
- **Retries:**
  - Do not loop. Retries sent the same preview 3 times (reel 015).
  - If a send fails, check the status line before resending.
- **Pace:** do not send bulk bursts (more than about 7 messages fast). That logged the fc-system line out once (memory `wa-bulk-send-logout-2026-10`). Leave about 5 s between sends.
- **Never** send to clients or staff.

## 2. Desktop copy
- Put finals in `C:/Users/Mahmoud/Desktop/<batch>/`. The first batch is `first10/`, with one subfolder per carousel and `statics/`, `stories/`.
- Name files `<date>-<topic>[-roar].mp4`.

## 3. Google Drive (account fortunecodec@gmail.com)
- **First batch:** "FortuneCode content — Nov 7-16 (first 10 days)", https://drive.google.com/drive/folders/1o3iKpIWsJCsyVYqkS0DqbxC6IcDWzvtY
- **Folders:** create them with the Drive MCP `create_file` (`contentMimeType` = `application/vnd.google-apps.folder`, `parentId`).
- **Files:** the MCP takes base64 inline, so it is useless for videos. Upload through the signed-in Flow browser (CDP 9333) with CDP drag-and-drop:
  1. Open a NEW tab on `https://drive.google.com/drive/folders/<id>`. Never navigate a Flow tab.
  2. Run `Page.bringToFront`, then press Escape.
  3. Send `Input.dispatchDragEvent` dragEnter, dragOver, then drop, at about 60 % of the viewport, with `data: {items: [], files: [<Windows paths>], dragOperationsMask: 1}`.
  4. Poll the page text until it says "N uploads complete".
  5. Close the tab: `agent-browser --cdp 9333 --session gd tab close`.
  - **Script:** `E:/Library/01-Workspace/Fortune/fortune-reels/engine/tools/gd_upload.mjs <folderId> <file...>`.
  - **Batch driver:** `gd_upload_batch.py`, which builds the paths in Python (bash sed breaks on backslashes).
  - **What does NOT work:** "New > File upload". It never fires `Page.fileChooserOpened`, even with trusted clicks.
- **Verify:** list the folder with the Drive MCP `search_files` (`parentId = '<id>'`) and compare file sizes.
- The folder stays private. Do not share it unless he asks.

## 4. Report line (Egyptian Arabic, short)
- what was sent and where (WhatsApp, Desktop, Drive link);
- any lighter copy and why;
- duplicates, if any.
