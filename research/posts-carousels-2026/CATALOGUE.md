# Instagram post and carousel formats, 2025-2026: a visual catalogue for FortuneCode

Studied 2026-11-07 for the owner's request: «explore and learn from the internet and YouTube more formats and styles for posts and carousels».
Every format below was seen as real designs (video frames or public ad images), not only read about.
- **Look first:** `overview.jpg` has one example per format; `boards/NN-*.jpg` hold 3-4 real examples each.
- **Internal study only:** these are third-party designs. Learn the mechanics and never copy them.

## What was looked at
- **YouTube:** 18 videos downloaded (`videos/`). A 60-frame contact sheet of each is in `sheets/`, and the frames used are in `frames/` and `frames_hd/`. The useful ones:

| id | title (views at study time) | what it showed |
|---|---|---|
| t7UDk-ItjrQ | 8 GENIUS Instagram Carousel Ideas (299k) | meme, split, swipe-to-reveal, grid-math panorama |
| ulebPxBw8Uw | 8 NEW Instagram Carousel Ideas (42k) | stop-motion, hidden-object, photo dump, art + quote |
| mV2nSkB-9-g | 8 VIRAL Carousel Ideas (18k) | quote cards, AI photo carousels |
| uhbeDrdmCoI | You're Making Carousels Wrong (83k) | editorial covers, 5-beat structure, colour/type system |
| wZuUHnfvV08 | Instagram's Algorithm LOVES This New Carousel Strategy (45k) | "triple hook", dark data-chart carousel |
| kzu-QSaskK4 | everything I know about viral carousels (69k) | "information vs revelation" carousels, results |
| 9mPrZRmfbR0 | Stop Designing Boring Carousels: 5-step formula (39k) | seamless red panorama, Hook / Promise / Pull / Payoff / Ask |
| I385irc9uIY | The Secret to Engaging Carousel Posts (148k) | seamless product panorama |
| YjPoFyoBr_g | Seamless Instagram carousel in Canva (556k) | editorial seamless strip |
| wzem_7KbCNE | Digital scrapbook carousel (255k) | photo-dump scrapbook panorama |
| IIXupZAGvDk | Nano Banana trending carousels (65k) | tweet-on-billboard, news-headline cover, engraving quote |
| NBd3m6SwcN4 | Twitter screenshot graphics for Instagram (29k) | tweet card on photo |
| jFAH0txMwiI | Claude Code Instagram carousels (70k) | Hook-Pain-Steps-Result-Join, before/after, design-system poster |
| LfGEBqV6K28 | Before & After: Small Business Websites Redesigned (341k) | website before/after, annotated teardown, metrics |
| qjZospdjnS0 | Improve Your Instagram Design: critiques (234k) | real agency carousels: listicle, Eisenhower matrix, big type |
| l9BuYkZFPyg | Best Carousel Content Ideas 2026 (5k) | myth vs reality card, text-on-photo BTS |
| OcOQQlfDVsI | 2026 Graphic Design Trends (675k) | blueprint, trinket/index grid, type collage |
| -EcZKxwdAyU | Carousel posts in Figma (135k) | Figma slicing workflow (no new formats) |

- **Web:** a public ad library (runneth.com, formerly motionapp.com, "Motion": 113 named static/video formats with live Meta ads) supplied the Notes-app, tweet mockup, before/after, us-vs-them, case-study, statistic, feature-pointout and review examples in `web/`.
- **Most trend articles were blocked or thin.** Socialinsider, Sked Social and Oktopost refused automated fetching. Numbers below come from search-result summaries of them.

## Evidence on carousels (read with care)
- **Socialinsider 2026 benchmarks (35M posts, per-follower engagement):**
  - carousels 0.55% in 2025, flat year on year;
  - Reels 0.52%;
  - images 0.37%;
  - Q1 2026: 0.52 / 0.50 / 0.35.

  Carousels hold the top spot. Reels win on reach. *Vendor (analytics SaaS), but the most consistent benchmark.*
- **Buffer, State of Social Media Engagement 2026 (52M+ posts), seen only through secondary summaries:**
  - Instagram carousels have a 6.9% median engagement by reach, against 3.3% for Reels.
  - Reels get about 36% more reach. Carousels get about 12% more engagement.
  - LinkedIn document carousels are the top LinkedIn format, at about 21.8% median engagement, against 7.35% for video and 6.5% for images. *Vendor.*
- **Metricool:** carousels earn about 9x more saves than single images. *Vendor, secondary.*
- **Ordinal (a dissent):** per impression, single images can beat carousels. The ranking depends on the metric.
- **Platform facts we design for:**
  - 4:5 portrait, 1080x1350;
  - one aspect ratio across all slides;
  - up to 20 slides since 2024;
  - music can be added to carousels.
- **Creator claims (unverified but repeated in several videos):**
  1. Instagram re-shows an un-swiped carousel starting from slide 2, so slides 1, 2 and 3 must each work as a hook. This is the "triple hook" from wZuUHnfvV08.
  2. Saves and shares come from "save this" utility slides and a last-slide comment keyword.
  3. The audio choice matters for carousels.

## The catalogue (19 formats + 1 accent layer)
- **"Identity" means our frame:**
  - dark #121416 base, green #00DB33 used as glow/rim light;
  - logo top centre;
  - thin rounded outline panel;
  - footer row: globe icon + www.fortunecode.org, WhatsApp icon + number;
  - Zain mob-long for Arabic display type, white text with KEY WORDS in green.
- **The stack:** HTML/CSS pages rendered by `agent-browser` at 1080x1350 (or N x 1080 wide and sliced). See `posts/2026-11-test/render.sh` and `slice.py`.

### 01 Seamless panorama carousel (`boards/01-seamless-panorama.jpg`)
- **Looks like:** one wide canvas (N x 1080 by 1350) cut into slides. Photos, product cut-outs, ribbons or a sauce swirl cross the cut lines, so every slide edge "leaks" into the next. Each slide is numbered (01-05) with its own headline.
- **Best for:** brand/service overview, portfolio tour, a process told left to right.
- **Why it works:**
  - the cut object begs to be completed, so people swipe;
  - in the profile grid, 3 posts in a row can form one banner (we already did this).
- **Make it:**
  - one HTML page at 5400x1350 with real device shots (laptops in our green-lit room), a green glow trail or "thread" that crosses each seam, and an Arabic headline per panel;
  - slice with `slice.py`;
  - keep the logo/footer on panel 1 and the last panel only, or as a continuous footer band.
- **RTL note:** Instagram always reveals the next slide from the right. Keep the story flowing left-to-right spatially and use a crossing object (not an arrow) as the swipe cue.

### 02 Tweet / X-post screenshot (`boards/02-tweet-x-post.jpg`)
- **Looks like:** a white or dark post card with avatar, name, blue tick and 1-3 lines of opinion, alone on a plain field. Variants put the card on a photo, or mock it onto a billboard/building with Nano Banana.
- **Best for:** hot takes, founder POV, one-line lessons ("Before you had to pay a developer for this. Now…").
- **Why it works:** the native UI reads as a person talking, not an ad. It is fast to read and easy to share/quote. The ad library shows finance/wellness brands (SoFi, BURGA) running it at scale.
- **Make it:**
  - an HTML card styled like X in dark mode, with Mahmoud's or FortuneCode's avatar, Arabic text in Zain, and the key words in green;
  - inside our frame (logo top, footer);
  - optional Nano Banana scene: the card printed on a Riyadh billboard at night with green spill.
- **Do not:** fake real people's tweets or engagement numbers.

### 03 Notes-app / iPhone Notes (`boards/03-notes-app.jpg`)
- **Looks like:** an iPhone Notes screenshot: "‹ Notes" in yellow, a bold title, a short list with emoji bullets, toolbar icons at the bottom. Sometimes a product or photo peeks in a corner.
- **Best for:** "things I wish I knew", a checklist of client mistakes, a candid founder note, an offer announced casually.
- **Why it works:** it feels unpolished and personal, so trust goes up and ad-blindness goes down. Motion's library counts hundreds of live ads in it: Reframe 393, Headway 216, Perplexity 175, Calm 173, Uber 149.
- **Make it:**
  - HTML replica of iOS Notes in DARK mode (black #000 sheet, yellow accents swapped to our green), with Zain text and a real status bar;
  - logo small at top, footer kept;
  - or place a real screenshot on a phone held in our green-lit desk shot.

### 04 Before / After split (`boards/04-before-after.jpg`)
- **Looks like:** two states side by side or on consecutive slides: a labelled "BEFORE 😐 / AFTER 😊" over two website screenshots, a vertical BEFORE…AFTER full-page compare with cyan boxes per section, or an illustrated "guessing vs building" split.
- **Best for:** website redesigns, ERP replacing Excel, old vs new app UI. This is our strongest proof format.
- **Why it works:** visible proof beats claims. The swipe to the "after" is a payoff, and readers compare the two halves by eye.
- **Make it:**
  - real screenshots (the client's old site from the Wayback Machine, our delivered build), each in a browser or laptop frame;
  - the left/top state desaturated, the right/bottom with green glow;
  - an Arabic label «قبل / بعد» plus 3 annotated changes;
  - slide 1 = the split, slides 2-4 = one change each, last = a metric + CTA.

### 05 Myth vs Fact (`boards/05-myth-vs-fact.jpg`)
- **Looks like:**
  - a pill label ("what social media tells you");
  - the myth in big italic serif inside quotes;
  - the "Reality:" paragraph below in smaller type.
  
  Or a "Misconception 1" title card, or a myth headline + a chart that disproves it.
- **Best for:** objections ("a website from a template is enough", "ERP is only for big companies", "AI will replace your team").
- **Why it works:** tension between the two lines, and the reader checks whether they believed the myth. It is shareable and comment-bait.
- **Make it:**
  - slide pair per myth: «يقولون: …» struck through in grey, then «الحقيقة: …» in white with the key fact in green;
  - a red-X / green-check icon pair;
  - 3-5 myths;
  - last slide CTA.

### 06 Step-by-step numbered tutorial (`boards/06-step-by-step.jpg`)
- **Looks like:** big numerals or a labelled spine across the carousel: HOOK / PAIN / STEPS / RESULT / JOIN as 5 alternating panels, a "Here's how:" numbered list, or a timed breathing sequence on flat yellow.
- **Best for:**
  - "how we build a store in 14 days";
  - "5 steps to prepare before you hire a developer";
  - ZATCA e-invoicing readiness.
- **Why it works:** the numbers promise progress, and incomplete steps pull the next swipe. A save-worthy reference.
- **Make it:**
  - one numeral per slide (huge green Zain numeral with a glow), a one-line step, and a real UI screenshot or device photo;
  - a progress bar at the bottom (1/7);
  - our frame on every slide.

### 07 Listicle (Top N) with comment CTA (`boards/07-listicle-top-n.jpg`)
- **Looks like:**
  - cover "5 REASONS WE BUY MORE THINGS THAN WE NEED!" with a giant red 5 and a flat illustration;
  - each slide "3. LACK OF CONTROL." + illustration;
  - last slide "WHAT'S YOUR…? COMMENT BELOW." + "SAVE ME FOR LATER" (Edge Agency).
- **Best for:**
  - "7 features every Saudi e-store needs";
  - "5 signs your company has outgrown Excel".
- **Why it works:** a known count sets expectations, and each item is a mini-hook. The last-slide comment prompt drives comments.
- **Make it:**
  - the cover number as a huge green glowing numeral;
  - items as numbered cards with green outlines (our existing service-card style);
  - last slide: «علّق بكلمة "متجر" ونرسل لك…» + save icon.

### 08 Case study with metrics (`boards/08-case-study-metrics.jpg`)
- **Looks like:**
  - a project title card (client, goal, URL) on a strong colour;
  - stacked big numbers (67,900 / 350 / 30) next to a site screenshot;
  - ads: "100% / 400K+ / 1 BILLION+" stacked stats (ButcherBox);
  - Upwork's "Your competitor just hired their AI expert. 12,000+ AI specialists".
- **Best for:** proof posts and the sales funnel (mid/bottom).
- **Why it works:** specific numbers resolve doubt. Motion lists SaaS and B2B as the best fits. Our own «800 دولار كندي» and «+300 M$» posts already use this.
- **Make it:**
  - slide 1 = result-first hook («عميل دفع 3,000$ / النتيجة:»);
  - slide 2 = client + problem;
  - slides 3-5 = real screens on devices;
  - slide 6 = 3 huge green numbers with labels;
  - slide 7 = client quote + CTA.
- **Numbers only from `memory/FACTS_BANK.md`.**

### 09 Quote / testimonial card (`boards/09-quote-testimonial.jpg`)
- **Looks like:**
  - a portrait photo with a white quote in the lower third;
  - a classical painting with a serif quote at top;
  - an engraving-style illustration with a "MASTERY is the ultimate status." masthead;
  - an ad library review card: a short quote + "— Lara" + a small photo.
- **Best for:** client testimonials, founder principles, and a short client WhatsApp message turned into a quote.
- **Why it works:** a third-party voice is more credible than brand copy. Quotes are fast to read and highly shareable.
- **Make it:**
  - the client's words in Zain with green quote marks;
  - the client logo + name + city;
  - background = their delivered product on a laptop in our green-lit room (Flow/Nano Banana or a real photo).
- **Only real quotes with permission.**

### 10 Data / chart infographic (`boards/10-data-chart.jpg`)
- **Looks like:**
  - dark slides with one line chart each (magenta line on black);
  - a hand-drawn yellow arrow and circle on the "drop";
  - one-line text "That's Why You Stay Stuck." and "Save for later" at the bottom (wZuUHnfvV08);
  - ads: a single giant stat ("5 hours saved every week") or a weight-vs-time scatter.
- **Best for:** market facts (Saudi e-commerce growth, page-speed vs conversion), our own analytics.
- **Why it works:** a number + an annotated chart is insight at a glance, and save-worthy. Dark charts look premium in our palette.
- **Make it:**
  - SVG/Chart in HTML on #121416 with the line in #00DB33 and a glow filter;
  - a hand-drawn annotation in white marker (our collage marker accent);
  - one insight per slide;
  - source line in small grey.
- **Facts verified first.**

### 11 Checklist / save-this cheat sheet (`boards/11-checklist-cheatsheet.jpg`)
- **Looks like:**
  - "IN A NUTSHELL:" with 5 bullets on white;
  - an Eisenhower 2x2 matrix in bold outlined boxes;
  - a poster-like "What is a design system" sheet with swatches, type, spacing and components.
- **Best for:** "launch checklist" (we have the 518-check Fortune checklist), "what to send your developer", "store-launch checklist".
- **Why it works:** pure utility, so it gets saved (saves are the strongest carousel signal) and shared to colleagues.
- **Make it:**
  - the last slide of an educational carousel = the full checklist on one dense but legible page;
  - green check boxes, Zain text, our frame, "احفظ المنشور" icon top-right.

### 12 Meme / relatable (`boards/12-meme-relatable.jpg`)
- **Looks like:**
  - a white tweet-like caption above a well-known meme still ("Me laughing at my own Reels before I post them");
  - a two-panel "Life when someone unfollows you / follows you";
  - "But I'm not smart enough" above "Richard Branson dropped out at 16".
- **Best for:** reach and shares among business owners ("client: I want it like Amazon / budget: 500 SAR").
- **Why it works:** recognition, tagged friends, DM shares. The cheapest format to make.
- **Make it:**
  - our own stills only (Clover mascot poses, staff photos, AI-generated scenes) to avoid rights issues;
  - a caption in our X-card style;
  - keep the frame light (logo small).
- **Saudi-appropriate humour, formal-light Gulf wording.**

### 13 Comparison table / Us vs Them (`boards/13-comparison-table.jpg`)
- **Looks like:**
  - "Reels vs carousels" two-column cards (cream vs black);
  - a perfume price table (ours vs designer);
  - "We invest in premium ingredients, not celebrities" photo split (Factor);
  - Wise's price-tag comparison;
  - "CLEAR PROTEIN vs OTHER PROTEIN".
- **Best for:**
  - custom site vs template;
  - FortuneCode vs freelancer vs big agency;
  - Salla/Zid store vs custom store;
  - ERP vs Excel.
- **Why it works:** it targets people already comparing and makes the winner obvious before they choose wrong.
- **Make it:**
  - an HTML table with 2-3 columns, the FortuneCode column lit with green glow and checkmarks, the others grey with X;
  - row labels in Zain.
- **Never name or attack a real competitor.**

### 14 "Mistakes you're making" / critique (`boards/14-mistakes.jpg`)
- **Looks like:**
  - a real website screenshot covered with purple sticky-note callouts ("The logo is better left-aligned…", "No real CTA…");
  - a "Lack of immediacy… also this is a button!" annotation with cyan connector lines;
  - a dark "None of it matters if the cover doesn't stop the scroll" statement.
- **Best for:** website audits of anonymised Saudi sites, "5 mistakes killing your store's sales".
- **Why it works:** loss aversion plus self-diagnosis. Viewers check their own site, then DM for an audit.
- **Make it:**
  - blurred/anonymised real screenshots in a laptop frame;
  - numbered red markers ①②③ and a short Arabic note each;
  - the following slide shows the fix with a green marker;
  - CTA «أرسل رابط موقعك ونراجعه مجاناً».

### 15 UI teardown with annotations (`boards/15-ui-teardown.jpg`)
- **Looks like:**
  - a cyan-boxed site with callout labels on a dark slate background;
  - numbered points ① to ④ beside a hero mockup;
  - Perplexity's dark UI ad with a crisp serif headline above product screens;
  - a "Blueprint design" trend: blue grid paper, white line drawings, labels and numbers.
- **Best for:** showing OUR delivered UIs (ERP dashboards, apps): what each screen does and why. It also fits the UI-feature launch.
- **Why it works:** it teaches as it sells, shows craft, and is saved by designers and founders.
- **Make it:**
  - a real screenshot of our product, tilted in a device on dark;
  - green hairline callouts with dots and Arabic labels;
  - optional blueprint grid lines in faint green on #121416 as the "technical" texture (fits our dark identity).

### 16 Editorial / magazine cover (`boards/16-editorial-cover.jpg`)
- **Looks like:**
  - a full-bleed surreal photo (a giant stone head in a red desert) under a masthead "steal my content system";
  - "steal my carousel system" with stacked book/doc mockups;
  - a "WARNING: DC'S SUPERMAN FOLLOW-UP IS NOT KID FRIENDLY" news-cover;
  - "How To Attract What You Truly Want?" on pink paper with highlighter bars.
- **Best for:** slide 1 of any big educational carousel, flagship guides, monthly "issue" series.
- **Why it works:**
  - a cover promises a premium package, so the swipe opens it;
  - surreal images are pattern interrupts;
  - the masthead builds a recognisable series.
- **Make it:**
  - a masthead «فورتشن كود | العدد 07» in Zain on top;
  - a Flow/Nano Banana surreal hero inside our dark green-lit world (e.g. a laptop half-buried in Riyadh dunes with green screen-light);
  - 1 headline + 2 cover lines;
  - logo/footer kept small.

### 17 One big statement (typographic) (`boards/17-big-statement.jpg`)
- **Looks like:**
  - flat yellow with "One thing you need to do to get out of emotional distress" in black, key words bold;
  - "WE DON'T BUY THINGS. WE BUY HOW THINGS MAKE US FEEL." in condensed caps, red emphasis;
  - a black slide "People don't follow one post. They follow the whole grid." with an italic red word.
- **Best for:** hooks, opinions, slide 1 covers, single-image posts between heavy posts.
- **Why it works:** it reads in under a second in the feed. Contrast and emphasis do the work, and it is easy to share as a belief.
- **Make it:**
  - #121416 field, 2-4 lines of huge Zain mob-long, ONE phrase in green with glow, nothing else but the frame;
  - optional a small 3D Clover in a corner.

### 18 Photo dump / behind the scenes (`boards/18-photo-dump-bts.jpg`)
- **Looks like:**
  - casual phone photos with little or no design;
  - scrapbook collage (polaroids, torn paper, doodles);
  - "Said yes to working for a garage door brand…" text over a camera-on-tripod BTS photo;
  - a desk shot with a big caption over it.
- **Best for:** team life, client meetings, office, a delivery day, the "how we work" humanity. It balances the polished posts.
- **Why it works:** authenticity, and faces get more engagement. Followers feel they know the team.
- **Make it:**
  - real photos from the team (meetings, screens, whiteboards) graded dark with green-lit monitors;
  - 1 line of Zain on slide 1;
  - the rest clean, with green tape/marker accents (allowed as ACCENTS per IDENTITY.md).
- **Never beige-paper as the base.**

### 19 Interactive swipe-to-reveal (`boards/19-swipe-to-reveal.jpg`)
- **Looks like:**
  - "hold down the dots & scroll right": an owl flip-book (each slide one frame, so swiping animates it);
  - "FIND THE HIDDEN OBJECT" in star-field/noise images;
  - a stop-motion fashion carousel;
  - the "Hook 1 / Hook 2 / Hook 3" slides.
- **Best for:** engagement spikes, product/UI reveals ("swipe to see the dashboard come alive"), puzzles.
- **Why it works:** it turns swiping into the reward, so swipe-through and dwell time rise. A game invites comments ("found it!").
- **Make it:**
  - render N frames of the same composition from HTML (a UI assembling piece by piece, or a site loading from wireframe to final);
  - each slide = one frame;
  - slide 1 says «اضغط على النقاط واسحب»;
  - also a "spot the bug in this UI" puzzle for devs.

### 20 (accent layer) 2026 graphic textures (`boards/20-trend-textures-2026.jpg`)
- **Seen in the trends video:**
  - Trinket design (cut-out objects in index grids);
  - type collage;
  - blueprint;
  - acid blur, Frutiger Aero, Kidcore, naive design.
- **For us:** use them only as ACCENTS inside the dark-green identity (e.g. an index grid of our device cut-outs, or blueprint lines behind a UI teardown). Never as a whole new look.

## Cross-format craft rules seen in the frames
- **Slide 1 = cover.** It needs a hook in big type plus a pattern-interrupt visual. Slides 2 and 3 must also stand alone (triple hook).
- **Structure:**
  - kzu-QSaskK4 sorts carousels into Information and Revelation;
  - 9mPrZRmfbR0 uses Hook, Promise, Pull, Payoff, Ask;
  - jFAH0txMwiI uses Hook, Pain, Steps, Result, Join.
- **One system per series** (uhbeDrdmCoI): 3 colours with fixed roles, 2 fonts with 2 roles, one template reused. Ours = #121416 / white / #00DB33 + Zain.
- **One idea per slide,** legible on a 6-inch phone. 7-10 slides is the common sweet spot. End with a save/comment CTA.
- **Profile-grid view counts:** people judge the whole grid before following, so alternate formats (dark statement, device proof, photo) to keep the grid varied.

## Top 6 for FortuneCode
1. **Before / After website or system (04) + case-study metrics (08)** as one 7-slide series. This is direct proof for a buyer-side problem (Hormozi diagnosis: no qualified clients = trust/offer). We own the screenshots.
2. **UI teardown with green annotations (15).** It shows our real ERP/app screens as craft, fits the dark identity perfectly, and is save-worthy for founders.
3. **"Mistakes killing your site/store" critique (14)** with a free-audit CTA. It is a lead magnet: the reader self-diagnoses, then sends a link on WhatsApp.
4. **Comparison table (13):** custom vs template vs freelancer, ERP vs Excel. It meets Saudi buyers at the comparing stage. A clean HTML build, no imagery needed.
5. **Tweet/X card and Notes-app (02 + 03)** for weekly founder hot takes. Cheapest to produce. They humanise the brand and break the polished grid. They feel native, and the ad libraries show big brands scaling them.
6. **Seamless panorama (01) with editorial cover (16)** for flagship guides (e.g. «كم تكلفة متجر إلكتروني في السعودية 2026»). It continues our existing 3-tile panorama habit and makes a recognisable "issue" series.

## Limits and gaps
- **Low resolution:** most YouTube examples are frames of designs shown inside creator videos (480p/360p, some later at 720p/1080p). Small text is soft. The boards are for layout study, not reuse.
- **Few Arabic or Gulf examples.** The "arabic social media design" search returned calligraphy/Ramadan tutorials, not carousel trends. No Saudi B2B agency carousels were collected. Gap: manually browse Saudi agencies' Instagram (logged-in Brave) next.
- **Notes-app, tweet-mockup, case-study, statistic, review and comparison examples come from an ad library (Meta ads), not organic posts.** Same visual formats, different intent.
- **Engagement numbers are secondary summaries from vendors** (Socialinsider, Buffer, Metricool). The originals could not be fetched. The metrics conflict (per follower vs per reach vs per impression). The "triple hook" and audio claims are creator claims.
- **No Behance/Dribbble/Pinterest scrape:** those need a login or block bots. LinkedIn carousels were covered only by search summaries, not visual examples.
- **Rights:** all third-party images are kept for internal study only. Do not post or trace them.
