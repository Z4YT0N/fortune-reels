# 02. Trial Reels and growth

## What Trial Reels are
An Instagram feature: a reel is shown to NON-followers first. Graduation sends it to followers:
- `MANUAL`: we graduate it in the Instagram app.
- `SS_PERFORMANCE`: Instagram graduates it if it performs (threshold not published).
Publishing through the Graph API is reported to support trial reels. These are unofficial sources
and not yet tested on our account: Sume, CreatorOS, Flowgent, Postproxy, and two GitHub PRs
(socia-concierge #47, lucasarrial #407).

Constraints: Business or Creator account, public, eligible for recommendations (check
`fortunecodeorg`), publish permission approved, 100 API posts / 24 h. The "20 trials a day" figure
is not official. No known API tells us a reel graduated; we read that from the numbers or the app.

## The getripping method (reference 00, Ben Zogby, 2026-11-06)
"Claude can now post trial reels for you":
1. Claude posts about 10 trial reels a day, testing different ideas and topics, not only hooks.
2. It reads retention second by second and sees exactly where viewers skip.
3. It uses that analysis to write the next reels, so each day improves.
4. The winning reel is boosted with an ad of about $20 a day.
Caution: every chart in that reel is labelled «Values illustrative». Its numbers are not real results.
Its look is also worth noting: 3D tactile UI cards on beige, bar-chart races, day counter, timeline scrubber.

## Our design (proposed)
- Two lanes. **Main posts:** produced and scheduled at the start of the month. **Trial lab:** daily,
  because each batch learns from the one before.
- Test ideas AND hooks. Three hooks show the best opening of one video; growth also needs to know
  which topic pulls.
- Flow: script → 3 hooks (only the first 2-3 s differ, so it is cheap) → 3 trial reels → compare
  after 48-72 h on views, retention and completion → winner graduates (owner approves, `MANUAL`
  for the first 2 months) → optional boost → the losers teach.
- Start with 3 trials a day (one idea × 3 hooks) and raise it when quality holds. 10 a day with
  Gulf voice-over and local renders would drop quality and burn credits.
- Approval: the owner approves the idea and script once; the variants go out without coming back.
  (Proposed, not confirmed.)
- Per-second retention: available in the Instagram app. NOT confirmed in the API. If the API only
  gives average watch time, measure average watch time + completion rate.

## Why this matters
Our diagnosis (project memory `sales-drop-root-cause-2026-10`, `hormozi-diagnosis-2026-11`): the
big clients came in waves after viral reels (8 Dec: 294k views; 29 Jan: 578k IG + 397k TikTok).
Posting stopped after January 2026, and leads fell. Reach content is what brings new people. The
trial lab is how we find the next viral format on purpose instead of by luck.

## Corrections from the YouTube study (2026-11-06, research/youtube-learning/04-arabic-b2b-scripts-and-growth.md)
These override the sections above where they differ. Sources: Think Media / Brock Johnson, Metricool, Robert Benjamin, Modern Millie (75 trials in 15 days), Planoly relaying Mosseri.
- **Graduation:** flipping a trial does NOT show it to followers as a new post. To push a winner, post it AGAIN as a new feed reel (with a different cover and caption), then boost.
- **Order:** always trial first, then feed. Never trial a reel that is already on the feed; Instagram flags it as a duplicate.
- **What to judge on:** shares per reach first, then watch time, then likes. Compare trials only with other trials, never with feed reels.
- **Daily trial cap:** varies by account, 5-25. Read ours from the account; do not assume 10 or 20.
- **First 1.7 s:** a Meta figure relayed by Brock says viewers decide in about 1.7 s on average. The picture has to win before the words do.
- **Reach reels end with a share prompt** («أرسلها لصاحب مشروع…»), because shares bring in non-followers. **Lead reels** end with a qualifier + a comment keyword + the outcome.
- **Volume and reposts:** posting often beats follower count. Run series and challenges, and repost every reel 60-90 days later with a new cover.
- **The right metric:** leads per 1,000 reach, not follower growth.
- **Raw lane to test:** Brock says heavy editing can lower results and raw talking works in 2026. Add a raw lane to the trial lab (simple screen + voice, or a person talking) next to the produced ROAR-style reels, and let our numbers decide.
- Not adopted: "copy your reel link 5-6 times" (a hack), and "shares weigh 3-5× likes" (vendor blogs only, not Mosseri).

## Corrections from the queue study (2026-11-06, research/youtube-learning/05-queue-arabic-b2b-leads.md)
These override earlier lines.
- **Variants must be REALLY different.** Instagram now limits content that is merely similar. Three trials that differ only in the first 2-3 s are exactly what it catches (Build Your Tribe). Each variant needs its own angle, script opening AND visuals: for example a number-first scene, a pain-first scene and a contrarian scene, each with its own shots. No mirroring or speed shifts to dodge the filter.
- **Eligibility to check first:** trials reportedly need at least 1,000 followers and an account older than 30 days. Check `fortunecodeorg` before planning around trials.
- **Frequency:** ONE feed reel a day. Back-to-back posting cuts reach (Jade Beason). Extra volume goes to trials.
- **Distribution killers:** watermarks, muted videos, borders, paragraph-text reels.
- **Scoring:** shares per reach, plus follows per view. Ask every lead where they first saw us.
