# 01. The engine and the owner's decisions

## What it is
A skill set that does Fortune Code's whole content job automatically, "like any professional":
it writes the monthly content plan, produces the reels, posts and carousels, schedules them, tests
reels as Instagram Trial Reels, and learns from the numbers. The owner started it on 2026-11-05.

**The quality bar** is the November 2026 plan an employee wrote
(`C:\Users\Mahmoud\Desktop\Fortune Code – November 2026 Content Plan.docx`, text in
`research/refs-2026-11/november-plan-extracted.txt`). It has 26 items: Instagram 13 (10 reels, 2
carousels, 1 static) and LinkedIn 13. Every item has date, time, format, pillar, persona, topic,
hook, outline, CTA, objective and KPI. Its numbers are real (Taj 34 MB → 140 KB, Ambatt 14 issues,
JS 2.2 → 1.2 MB). It is the bar, not something to criticise; the employee works with the engine.

**What the engine adds on top of that plan:** where ideas come from (customer questions, projects,
competitors, viral formats), learning (what to repeat or stop next month), a set mix of reach,
trust and sales, the production itself, and the viral reels that brought our past clients
(see `hormozi-diagnosis` and `sales-drop-root-cause` in project memory).

## Owner decisions (with dates)
| Date | Decision |
|---|---|
| 2026-11-05 | Build publishing and scheduling INSIDE our own system (no Supermetrics or other subscription) |
| 2026-11-05 | The employee keeps a role: works on the engine's plan (working assumption, option C) |
| 2026-11-06 | It runs as a routine/workflow every day, automatically |
| 2026-11-06 | It runs on the owner's PC (Windows Task Scheduler + headless Claude, like the weekly SEO job) |
| 2026-11-06 | Everything is a DRAFT sent to him on WhatsApp for approval, like the blog articles |
| 2026-11-06 | At the start of the month, all posts are produced and scheduled at once, then publish automatically |
| 2026-11-06 | Every reel gets 3 versions with 3 different hooks as Trial Reels; the winner goes to followers |
| 2026-11-06 | Goal for next month: the biggest possible growth of the account |
| 2026-11-06 | Gulf voice-over, varied across ElevenLabs Gulf voices, men AND women |
| 2026-11-06 | He raised the Gemini spending cap |
| 2026-11-06 | Pinterest references in `fortunecode-posts-v5` are rubbish («بضان»); do not use them |
| 2026-11-06 | Style: like ROAR exactly, with noise and grain, real and with soul, not AI slop |
| 2026-11-06 | Use Gemini Veo for video (blocked: not available on the key, see 08) |
| 2026-11-06 | Show a sample before building any pipeline |

## The 8 stages
| # | Stage | The engine does | Output | Human |
|---|---|---|---|---|
| 1 | Memory | Brand, services, projects, approved numbers, owner rules | Facts file: no number or name outside it | Owner once |
| 2 | Listening | WhatsApp customer questions, competitors, viral formats, our numbers | Idea list, each with its source | None |
| 3 | Plan | Same columns as the November plan + why each post | Month plan | Employee edits, owner approves |
| 4 | Writing | Several hooks, pick the strongest, script, caption, CTA | Text of every post | None |
| 5 | Production | HyperFrames motion, Gemini stills, ElevenLabs voice, SFX | Ready files | None |
| 6 | QA | Facts, numbers, brand, Arabic, safe zones, accent | Pass / redo report | Owner approves the batch |
| 7 | Publishing | Scheduling after approval | Published posts | None |
| 8 | Learning | Reads numbers, DMs, and every edit the owner or employee made | New rules for next month | None |

Stages 1 and 8 are what set it apart: 1 stops invented numbers, 8 makes it better every month.

## The monthly and daily rhythm (proposed, owner agreed on the shape)
| When | What |
|---|---|
| Day 25 | Plan for next month; employee edits; owner approves on WhatsApp |
| Days 26-30 | Daily routine produces a batch each day; drafts go to WhatsApp |
| Day 1 | Everything approved is scheduled |
| Every day | Trial-reels lab: publish trial variants, read results after 48-72 h, propose the winner |
| Every night | Read yesterday's numbers, log what worked |
| Weekly | Short report; update the engine's own rules |

## Safety rails decided
- Nothing is published without approval.
- A daily spend cap for ElevenLabs and Gemini, so a loop cannot burn credits unseen.
- Start small: one post end-to-end per day for a week, then add planning and learning.

## Content mix (proposed, not yet decided)
50 % reach, 30 % trust, 20 % sales, adjusted by the first two months of numbers. The November
plan is strong on trust (case studies) but light on reach.

## In-system publishing (built, blocked)
Branch `feat/social-publishing`, worktree `E:\Library\01-Workspace\Fortune\_wt-publish`, nothing
committed yet. It has a `/staff/content/publishing` page, mandatory approval (an edit after
approval returns the post to draft), a 5-minute publisher for Instagram, Facebook, TikTok and
LinkedIn (image, video, carousel, IG story), duplicate protection, reconnect buttons and LinkedIn OAuth.
Blocked by:
- The SQL `20261105_content_publishing.sql` was declined.
- The old `publish-post` edge function has no auth; lock it first.
- Instagram and Facebook must be re-connected.
- TikTok needs `video.publish` and app review (private posts until then).
- LinkedIn needs Community Management API approval.
- Storage: the Supabase free plan has 1 GB total and 50 MB per file.
