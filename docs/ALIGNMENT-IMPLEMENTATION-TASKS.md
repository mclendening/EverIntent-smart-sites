# EverIntent Alignment Implementation Task List

**Version:** 1.2  
**Created:** 2026-04-11  
**Source:** Claude Implementation Spec + Codebase Audit + Analysis Cross-Reference  
**Reference:** `docs/ALIGNMENT-ANALYSIS-v1.md`  
**Launch:** This weekend

---

## Analysis Cross-Reference Key

> Each task now references the specific Analysis section it originates from.  
> Format: `[A§N]` = Analysis v1.0 Section N | `[A#R]` = Analysis Priority Recommendation #R  
> Pre-written copy from the analysis is included inline where available to save implementation time.

---

## Phase 1: Critical Data Fixes

> **Estimated effort:** 30 min  
> **Parallelism:** All 5 tasks are independent — can be done simultaneously.

| # | Task | File(s) | Current State | Target State | Success Criteria | Analysis Ref |
|---|------|---------|--------------|--------------|-----------------|-------------|
| 1.1 | Fix FinalCTASection price error | `src/components/home/FinalCTASection.tsx` line 31 | Shows "$149/month" | "$197/month" | Price matches cheapest AI Employee tier ($197/mo After-Hours) | [A§5, A#1] |
| 1.2 | Fix Email Authority price in CompareWebsites | `src/pages/CompareWebsites.tsx` line 111 | Shows `$79/mo` for Email Authority addon | `$49/mo` | Matches `checkoutConfig.ts` line 196 (`monthlyPrice: 49`) and AddOns.tsx | [A§8, A#8] |
| 1.3 | Fix Web Chat Only CTA link | `src/pages/AIEmployee.tsx` line 79 | `href: '/contact'` | `href: '/checkout/web-chat'` | Web Chat links to checkout page (checkout is confirmed working — redirects to `go.everintent.com`) | [A§10] |
| 1.4 | Fix Capture setup fee inconsistency | `src/pages/SmartWebsites.tsx` line 58, `src/pages/smart-websites/SmartLead.tsx` line 256 | Shows `setup: "$249"` for Capture; SmartLead says "Setup is $249" | `setup: "$0"` or remove setup display | Matches `checkoutConfig.ts` line 58 (`setupFee: 0`). Both files aligned. | [A§3, Appendix] |
| 1.5 | Remove SMS/Email quotas from Pricing comparison | `src/pages/Pricing.tsx` line 55 | `SMS/Email` row with `400/600/1000` values | Remove this row from `websiteFeatures` array | No SMS/Email quota row in pricing table. Keep in `CompareWebsites.tsx` (detail view) with footnote. | [A§2, Appendix] |

### Phase 1 Verification Checklist
- [x] `$197/month` in FinalCTASection — confirmed 2026-04-11
- [x] `$49/mo` for Email Authority in CompareWebsites — confirmed 2026-04-11
- [x] Web Chat CTA links to `/checkout/web-chat` — confirmed 2026-04-11
- [x] Capture setup fee = $0 across SmartWebsites.tsx AND SmartLead.tsx — confirmed 2026-04-11
- [x] SMS/Email quota row removed from Pricing.tsx — confirmed 2026-04-11

> **Phase 1 Status: ✅ COMPLETE** — All 5 data fixes verified on mobile (375px) 2026-04-11

---

## Phase 2: Conversion-Critical Additions

> **Estimated effort:** 2-3 hours  
> **Parallelism:** 2.1, 2.2, 2.3, and 2.4/2.5 are independent work streams.

| # | Task | File(s) | Current State | Target State | Success Criteria | Analysis Ref |
|---|------|---------|--------------|--------------|-----------------|-------------|
| 2.1 | Add 3 killer objection FAQs | `src/pages/FAQ.tsx` (pricing category), `src/pages/Pricing.tsx` (faqItems array) | Missing: "robot objection", "expensive objection", "think about it" | Add 3 Q&As (pre-written copy below) | FAQs appear in both `/faq` page and `/pricing` FAQ section. | [A§9, A#2] |
| 2.2 | Reframe "setup" → "AI Training & Implementation" | Multiple files (see line refs below) | Label says "setup" | "AI Training & Implementation" (full) / "AI Training" (compact cards at 375px) | All setup fee labels use new framing. No remaining "setup" labels on buyer-facing pricing. | [A§2, A#3] |
| 2.3 | Add trust signals to checkout flow | `src/pages/checkout/CheckoutPage.tsx` | No trust strip above form | Horizontal strip: `✓ No contracts  ✓ Cancel anytime  ✓ 30-day optimization  ✓ Secure checkout` | Trust strip visible on all `/checkout/*` routes. Desktop: single row. Mobile (375px): 2×2 grid. Uses `bg-muted` + `text-muted-foreground`. | [A§10, A#9] |
| 2.4 | Replace generic "Get Started" CTAs with outcome text | Multiple files (see CTA mapping below) | Generic "Get Started" on most tier CTAs | Outcome-specific CTA text per tier | Every tier's primary CTA uses its designated outcome text. | [A§2, A§4, A#5] |
| 2.5 | Add "Book a Call" secondary CTA on plans ≥$197/mo | `src/pages/Pricing.tsx`, individual tier pages | Missing for Convert ($197) and Scale ($297). Already exists for Front Office and Full AI on Pricing.tsx lines 440-447. | Text link: "Want to talk first?" → `/contact` | Secondary CTA visible on Convert, Scale, After-Hours cards. Does NOT compete visually with primary CTA. | [A§10] |
| 2.6 | Fix "Choose Your Mode" jargon | `src/pages/AIEmployee.tsx` line 219 | "Choose Your Mode" | "How Much Do You Want AI to Handle?" | No internal jargon. Speaks to buyer's decision. | [A§4] — **NEW** |

### Task 2.1 Pre-Written FAQ Copy

> Pulled from Analysis v1.0 §9 with market data enrichment. Ready to paste.

**Q: "Will my customers hate talking to a robot?"**

> A: The choice isn't AI vs. human. It's AI vs. voicemail. 85% of people who reach voicemail never call back — they call your competitor instead. Our AI answers in 2 seconds, knows your business, your hours, and your services. 94% of callers rate the experience 4+ stars. And most don't even realize they're talking to AI. Your competitor's voicemail isn't beating our AI.

**Q: "Is $197/month expensive?"**

> A: A full-time receptionist costs $40,000 a year. We cost $2,364. And we work nights, weekends, and holidays without calling in sick. The average service business loses $50,000-$120,000 a year to missed calls (CallBird, 2026). If we capture one $200 job you would have missed, we've paid for ourselves for six months. The expensive option is doing nothing.

**Q: "I need to think about it."**

> A: How many calls did you miss this week? The data says 62% of calls to local businesses go unanswered. At $200+ per missed call, that's $1,000+ every week walking out the door. There are no contracts — you can cancel anytime. The only risk is waiting.

### Task 2.2 File Locations for "Setup" → "AI Training & Implementation"

| File | Lines | Context |
|------|-------|---------|
| `src/pages/Pricing.tsx` | 84, 96, 108, 121, 422 | Pricing cards + AI tab |
| `src/pages/AIEmployee.tsx` | 44, 55, 66, 78, 266 | AI tier cards + setup callout section |
| `src/pages/CompareAIEmployee.tsx` | 96, 106, 116 | Comparison table |
| `src/pages/SmartWebsites.tsx` | 33, 58, 83, 108, 411 | SW tier cards + setup callout |

**Note from Analysis §4 line 185:** The AI Employee page ALREADY frames setup correctly in the callout section ("Business-specific AI training, System integration, Testing & QA, 30-day optimization"). Match this existing pattern for the label change — don't reinvent.

### Task 2.4 CTA Mapping

| Tier | Current CTA | New CTA | Files to Update |
|------|-------------|---------|-----------------|
| Launch | "Get Started" | "Build My Website" | `Pricing.tsx` line 66, `SmartWebsites.tsx` line 51, `SmartSite.tsx` line 127 |
| Capture | "Get Started" / "Start Capturing Leads" | "Start Capturing Leads" | `Pricing.tsx` line 67 (currently "Get Started"), `SmartWebsites.tsx` line 76 (already correct!) |
| Convert | "Get Started" / "Grow Your Business" | "Automate My Business" | `Pricing.tsx` line 68, `SmartWebsites.tsx` line 101 |
| Scale | "Get Started" / "Unlock Full AI" | "Unlock Full AI" | `Pricing.tsx` line 69 (currently "Get Started"), `SmartWebsites.tsx` line 130 (already correct!) |
| Web Chat | N/A (links to /contact) | "Add AI Chat" | `AIEmployee.tsx` line 79 (after 1.3 link fix) |
| After-Hours | "Learn More" | "Answer After Hours" | `AIEmployee.tsx` line 276 (mode card CTA) |
| Front Office | "Learn More" | "Screen My Calls" | `AIEmployee.tsx` line 276 |
| Full AI | "Learn More" | "Hire My AI Employee" | `AIEmployee.tsx` line 276 |
| AI tab on Pricing | "Get Started" | Same outcome verbs | `Pricing.tsx` line 432 |
| Compare AI | "Get Started" | Same outcome verbs | `CompareAIEmployee.tsx` lines 295, 505 |
| Header | "Get Started" | **DO NOT CHANGE** | `Header.tsx` — generic entry point, keep as-is |

### Phase 2 Verification Checklist
- [ ] 3 objection FAQs appear on `/faq` and `/pricing`
- [ ] No "setup" label remains on any buyer-facing page
- [ ] Trust strip visible at `/checkout/launch` on desktop and 375px mobile
- [ ] Every tier CTA uses outcome text (spot-check 5 pages)
- [ ] "Want to talk first?" link on Convert, Scale, After-Hours cards
- [ ] "Choose Your Mode" replaced with "How Much Do You Want AI to Handle?"

---

## Phase 3: Homepage & Pricing Page Alignment

> **Estimated effort:** 2-3 hours  
> **Parallelism:** 3.1 + 3.2 (homepage) can run parallel with 3.3 + 3.4 (pricing page).

| # | Task | File(s) | Current State | Target State | Success Criteria | Analysis Ref |
|---|------|---------|--------------|--------------|-----------------|-------------|
| 3.1 | Fix hero subheadline | `src/components/home/HeroSection.tsx` line 51 | "EverIntent provides AI Employee automation and websites for local businesses." | "Your phone answered 24/7. Appointments booked automatically. Leads captured while you sleep." | No company name in subheadline. Copy leads with outcomes. | [A§5, A§11, A#10] |
| 3.2 | Rewrite HowWeHelp to cover 3 buyer types | `src/components/home/HowWeHelpSection.tsx` | All 3 cards address "bleeding wound" (missed calls) | Card 1: Credibility, Card 2: Bleeding, Card 3: Burnout (details below) | 3 distinct buyer personas addressed. Each card links to appropriate product. | [A§5, A#4] |
| 3.3 | Add "Cost of Doing Nothing" section to Pricing | `src/pages/Pricing.tsx` | No cost-of-inaction section | 3-column stat row above tier cards (validated data below) | Section renders between hero and first tier card. Uses `bg-muted` + `text-accent` stats. | [A§12, A#6] |
| 3.4 | Fix pricing page hero headline | `src/pages/Pricing.tsx` line 206 | "Simple, Transparent Pricing" | "Stop Losing Money. Pick Your Plan." | Hero headline leads with pain, not platitude. | [A§11, A§2] |
| 3.5 | Fix Industries hero | `src/pages/Industries.tsx` | "Built for your industry" | "Your Industry Loses $X/Month to Missed Calls. We Fix That." | Hero leads with industry-specific pain, not generic claim. | [A§6] — **NEW** |

### Task 3.2 HowWeHelp Card Content

| Card | Buyer Type | Headline | Body | CTA | Link |
|------|-----------|----------|------|-----|------|
| 1 | Credibility | "Look Like the Business You Are" | "Referrals Google you before they call. A professional website with AI-powered chat captures leads 24/7 — even while you're on a job." | "See Smart Websites" | `/smart-websites` |
| 2 | Bleeding Wound | "Recover Every Missed Call" | "62% of calls to local businesses go unanswered. Our AI texts back in under 60 seconds, before they call your competitor." | "See How AI Recovers Calls" | `/let-ai-handle-it` |
| 3 | Burnout | "Stop Being the Bottleneck" | "AI screens calls, qualifies leads, books appointments, and follows up — so you focus on the work that actually needs you." | "See Full AI Employee" | `/let-ai-handle-it/full-ai-employee` |

**Image assets needed:** Card 1 + Card 3 need new images (generate via imagegen). Card 2 can reuse existing missed-call visual.

### Task 3.3 "Cost of Doing Nothing" — Validated Market Data

> All stats sourced from Analysis v1.0 §Market Research with citations.

| Stat | Label | Source |
|------|-------|--------|
| 62% | of calls go unanswered | BIA/Kelsey, Numa (2026) |
| $200+ | lost per missed call | PathOpt — range is $125-$350 for service businesses; $200+ is conservative |
| $48,000 | average annual loss | Derived: 5 missed calls/week × $200 × 48 weeks. Conservative vs. industry range of $45K-$200K (multiple sources). Contractors specifically: $50K-$120K/year (CallBird, 2026) |

**Below stats:** "Our most popular plan costs $197/month. Your missed calls cost more."

### Phase 3 Verification Checklist
- [ ] Hero subheadline starts with "Your phone answered 24/7"
- [ ] HowWeHelp shows 3 distinct cards for credibility/bleeding/burnout
- [ ] Cost-of-inaction section visible on `/pricing` above tier cards
- [ ] Pricing hero says "Stop Losing Money. Pick Your Plan."
- [ ] Industries hero is pain-led
- [ ] All changes render correctly at 375px

---

## Phase 4: Copy Voice Cleanup

> **Estimated effort:** 1-2 hours  
> **Parallelism:** 4.1 patterns can be searched/fixed in parallel. 4.2 pages are independent.

| # | Task | File(s) | Current State | Target State | Success Criteria | Analysis Ref |
|---|------|---------|--------------|--------------|-----------------|-------------|
| 4.1a | Remove company-first intros | `HeroSection.tsx` line 51, `Services.tsx` lines 195-196 | "EverIntent provides..." | Lead with outcome | Zero "EverIntent provides/offers/helps" in buyer-facing copy. **Exception:** Legal pages — keep as-is. | [A§11] |
| 4.1b | Remove soft hedging language | Only found in `AccessibilityStatement.tsx` | "We strive to" / "we aim to" | N/A — **legal page, DO NOT CHANGE** | No action needed. Legal pages are exempt. | [A§11] |
| 4.1c | Remove WordPress/Elementor/OVH/Plesk from FAQ | `src/pages/FAQ.tsx` line 136 | "WordPress with Elementor, hosted on OVH/Plesk infrastructure with Cloudflare" | "Built on modern, fast infrastructure with Cloudflare for performance and security." | No CMS/hosting stack details in buyer-facing FAQ. | [A§9, A§11] |
| 4.1d | Remove feature-first descriptions where they lead | `Pricing.tsx` websiteTiers descriptions | "Get online fast with a professional 5-page website..." | Outcome-first: "Look professional online. Capture leads from day one. Built and launched in 5 days." | Tier descriptions lead with outcomes. Feature details stay in comparison tables. | [A§2, A§3] |
| 4.1e | Fix FAQ response time language | `src/pages/FAQ.tsx` | Internal SLA jargon ("Urgent, High priority, Normal") | Plain language: "If your site goes down, we're on it within an hour. Everything else within 24 hours." | No internal SLA terminology in buyer-facing FAQ. | [A§9] — **NEW** |
| 4.2 | Smart Website page heroes — outcome-first | `SmartSite.tsx`, `SmartLead.tsx`, `SmartBusiness.tsx`, `SmartGrowth.tsx` | Likely feature-first heroes | See hero copy below | Each SW tier page hero leads with outcome statement. | [A§3] |

### Task 4.2 Smart Website Hero Copy

| Page | File | New Hero Headline | Analysis Source |
|------|------|-------------------|----------------|
| Launch | `SmartSite.tsx` | "Look Professional. Get Found. Get Called." | [A§3] — credibility buyer |
| Capture | `SmartLead.tsx` | "Every Lead That Touches Your Site Gets Captured" | [A§3] — bleeding wound |
| Convert | `SmartBusiness.tsx` | "Turn Visitors Into Booked Appointments" | [A§3] — time-back |
| Scale | `SmartGrowth.tsx` | "AI Runs Your Website While You Run Your Business" | [A§3] — burnout |

**Analysis §3 also suggests tier tagline rewrites:**
- Launch: "Look professional when they Google you" (vs current "Get Online Fast")
- Capture: "Stop losing the leads you're paying for" (vs current "Never Miss a Lead" — current is already good)
- Convert: "Turn every call into a booked job"
- Scale: "AI handles it while you take a day off"

### Phase 4 Verification Checklist
- [ ] Zero "EverIntent provides/offers" in non-legal pages
- [ ] No CMS/hosting tech stack in FAQ
- [ ] No SLA jargon in FAQ response time answer
- [ ] Pricing tier descriptions are outcome-first
- [ ] Each SW tier page hero is outcome-first (spot-check all 4)

---

## Phase 5: Animated Proof Sections

> **Estimated effort:** 6-8 hours (revised from spec's 3-4)  
> **Parallelism:** All 3 demos are independent components; can be built in parallel.

| # | Task | File(s) | Current State | Target State | Success Criteria | Analysis Ref |
|---|------|---------|--------------|--------------|-----------------|-------------|
| 5.1 | "Watch a Lead Get Captured" — Capture page | New component + `SmartLead.tsx` | No animated proof section | Animated message thread: visitor lands → AI chat → lead captured → owner notified | Animation renders. Wrapped in `ClientOnly`. Respects `prefers-reduced-motion`. Mobile-first. Uses framer-motion. | Spec Phase 5 |
| 5.2 | "Watch a No-Show Get Saved" — Convert page | New component + `SmartBusiness.tsx` | No animated proof section | SMS mockup: reminder → reschedule → confirmed | Same standards as 5.1. | Spec Phase 5 |
| 5.3 | "Watch AI Run the Front Office" — Scale page | New component + `SmartGrowth.tsx` | No animated proof section | Split-screen: voice + SMS + chat → 3 appointments booked | Same standards. Most complex — multi-channel. | Spec Phase 5 |

### Phase 5 Dependencies
- Reuse `SMSDemo.tsx` component architecture (framer-motion + timed reveals)
- New components in `src/components/smart-websites/`
- **Decision resolved:** Use framer-motion (matches existing pattern)

### Phase 5 Verification Checklist
- [ ] Animated demo on Capture, Convert, Scale pages
- [ ] All wrapped in `ClientOnly`
- [ ] `prefers-reduced-motion` respected
- [ ] Mobile layout (375px) — stacked, no horizontal overflow

---

## Phase 6: Lower Priority / High Impact

> **Estimated effort:** 2-3 hours  
> **Parallelism:** 6.1 and 6.2 are independent.

| # | Task | File(s) | Current State | Target State | Success Criteria | Analysis Ref |
|---|------|---------|--------------|--------------|-----------------|-------------|
| 6.1 | Add annual pricing toggle | `Pricing.tsx`, `checkoutConfig.ts` | Monthly-only | Monthly/Annual toggle. Annual = 2 months free (17% savings) | Toggle works. Annual shows monthly equivalent + "billed annually". Note: needs corresponding GHL pages for annual billing. | [A§2, A§12, A#7] |
| 6.2 | Add Voice AI Chat Widget mention | `CompareAIEmployee.tsx`, `FullAIEmployee.tsx` | Not mentioned anywhere | Included in Full AI Employee; $79/mo add-on for others | Feature in comparison table + Full AI detail page. No standalone page yet. | [A§4, A§12] |
| 6.3 | Add "Included free with Scale" badges on add-ons | `src/pages/smart-websites/AddOns.tsx` | No tier-inclusion indicators | Badges on add-ons included in Scale (e.g. Email Authority) | Buyers on Scale see what's already included. | [A§8] — **NEW** |
| 6.4 | Add "Not sure which plan?" scenario cards to Compare pages | `CompareWebsites.tsx`, `CompareAIEmployee.tsx` | Feature grid first, no guidance | 3 scenario cards at top: "I just need to look professional" → Launch, etc. | Buyers self-select by problem, not budget. | [A§7] — **NEW** |

### Phase 6 Verification Checklist
- [ ] Annual toggle works on `/pricing`
- [ ] Annual prices calculate correctly (monthly × 10 for annual)
- [ ] Voice AI Chat Widget in comparison table
- [ ] "Included free with Scale" badges visible on add-ons page
- [ ] Scenario cards on both compare pages

---

## ✅ Checkout Status: Working (GHL Redirect Live)

**Status:** Checkout IS wired to GHL. The 3-step form collects user data, then redirects offsite to `go.everintent.com` with query params (first_name, last_name, email, phone, company_name). GHL handles billing from there.

**Example redirect:** `https://go.everintent.com/home-8608?first_name=Michael&last_name=Clendening&email=michael%40clendening.com&phone=5623743778&company_name=dddddd`

**Spec references:** `docs/Detail-Checkout-design-v5.2.md` (lines 75, 109, 207, 508), `docs/everintent-brd-v36.4.md` (lines 1173-1199, 2602), `docs/e-commerce-feature-matrix-v1.3.md` (lines 572-587)

### Implications for Alignment Tasks
- **All CTAs can safely point to `/checkout/*`** — the flow works end-to-end ✅
- **Task 1.3** (Web Chat CTA link): Can link directly to `/checkout/web-chat` ✅
- **Task 2.3** (Trust strip): Will be seen by real buyers before GHL handoff ✅
- **Task 6.1** (Annual pricing toggle): Will need corresponding GHL pages/products for annual billing variants

---

## Cross-Phase Constraints

### Design Token Compliance (verify after EVERY phase)
- [ ] No raw color values (`text-white`, `bg-black`, `bg-[#hex]`)
- [ ] All colors use semantic tokens (`text-foreground`, `bg-accent`, `text-muted-foreground`)
- [ ] No hardcoded z-index values
- [ ] No `style={{ }}` for colors/shadows/spacing
- [ ] **Note:** Spec references `bg-surface-dark` and `text-on-dark` — these tokens DO NOT EXIST in `index.css`. Use `bg-muted` / `bg-card` / `text-foreground` / `text-muted-foreground` instead.

### SSG Compliance (verify after EVERY phase)
- [ ] New interactive elements wrapped in `ClientOnly`
- [ ] No browser APIs during build
- [ ] No `React.lazy()` for new page components

### Mobile-First (verify after EVERY phase)
- [ ] Every new/modified layout works at 375px
- [ ] No horizontal overflow
- [ ] Touch targets ≥ 44×44px

### Voice Calibration Standard (verify after EVERY copy change)
All copy changes must match the outcome-first framing of the portfolio detail pages (e.g., Desert Cool Air, Clearview Dentistry). Portfolio pages lead with specific outcome metrics ("+247% Qualified Leads," "62 Avg. Leads/Month," "100% Calls Answered"), use real pain language in testimonials, and tie CTAs to results ("Ready for Results Like These?"). Product pages and pricing descriptions must meet this same standard. **If the new copy sounds like a feature list or a generic marketing statement, it hasn't met the bar.**

### DO NOT TOUCH
- [ ] Portfolio embed system / portfolio site assets
- [ ] `public/404.html`
- [ ] Legal pages (except tech stack FAQ removal in 4.1c)
- [ ] Nav structure
- [ ] `checkoutConfig.ts` product structures (except `annualPrice` field in 6.1)
- [ ] Pricing amounts (only labels and framing)

---

## Parallel Execution Map

```
Phase 1 (all 5 tasks in parallel)
  ├── 1.1 FinalCTASection price
  ├── 1.2 CompareWebsites Email Authority price  
  ├── 1.3 AIEmployee Web Chat link
  ├── 1.4 SmartWebsites + SmartLead Capture setup fee
  └── 1.5 Pricing SMS/Email quota removal

Phase 2 (4 parallel streams)
  ├── Stream A: 2.1 FAQ objection answers (copy is pre-written above)
  ├── Stream B: 2.2 Setup fee relabeling (multi-file) + 2.6 "Choose Your Mode"
  ├── Stream C: 2.3 Checkout trust strip
  └── Stream D: 2.4 + 2.5 CTA text + Book a Call links

Phase 3 (2 parallel streams)
  ├── Stream A: 3.1 + 3.2 Homepage (hero + HowWeHelp) + 3.5 Industries hero
  └── Stream B: 3.3 + 3.4 Pricing page (cost section + hero)

Phase 4 (parallel pattern fixes)
  ├── 4.1a-e Copy patterns (independent file edits)
  └── 4.2 SW tier page heroes (4 independent pages)

Phase 5 (3 parallel components)
  ├── 5.1 Capture animated demo
  ├── 5.2 Convert animated demo
  └── 5.3 Scale animated demo

Phase 6 (4 parallel tasks)
  ├── 6.1 Annual pricing toggle
  ├── 6.2 Voice AI Chat Widget mentions
  ├── 6.3 "Included free with Scale" badges
  └── 6.4 Compare page scenario cards
```

---

## Open Decisions

| # | Question | Impact | Recommendation |
|---|----------|--------|----------------|
| D1 | Remove SMS/Email quotas from CompareWebsites.tsx too, or only from Pricing.tsx? | Consistency vs. detail for comparison shoppers | Remove from Pricing (summary view). Keep in CompareWebsites (detail view) but add footnote: "Usage-based billing above included allocation." |
| D2 | Capture setup fee: set to $0 (match checkoutConfig) or set checkoutConfig to $249 (match SmartWebsites page)? | Revenue + messaging | Set to $0 everywhere. checkoutConfig is source of truth. |
| D3 | SmartLead.tsx line 256 says "Setup is $249" — should this also become $0? | Consistency with D2 | Yes. Same decision as D2. |
| D4 | Phase 5 animations: CSS-only (spec) or framer-motion (existing pattern)? | Consistency + quality | **Resolved:** framer-motion. Matches existing SMSDemo. |
| D5 | HowWeHelp Card 1 + Card 3 need new lifestyle images. Generate or placeholder? | Visual quality | Generate via imagegen tool. Two images: (1) professional website on devices, (2) business owner relaxed with phone showing booked calendar. |
| D6 | "AI Training & Implementation" is long for mobile cards. Allow "AI Training" abbreviation? | Mobile layout at 375px | Yes. Full label in detail/checkout views, abbreviated in compact card contexts. |

### Deferred Items (Post-Launch)

> These items from the Analysis are valuable but too large for launch weekend. Track for v2.

| Item | Analysis Ref | Why Deferred |
|------|-------------|-------------|
| ROI Calculator on pricing page | [A§12, A#6] | Medium effort, needs design + interactivity |
| Self-assessment quiz ("Which plan?") | [A§12] | Medium effort, needs UX design |
| TransformationSection → specific client outcomes | [A§5] | Needs real client data we may not have yet |
| "Your website powers your AI" connection narrative | [A§4] | Strategic copy change, needs product team alignment |
| Industry-specific ROI stories per card | [A§6] | Needs real per-industry data |
| Add-on recommendations by tier ("Recommended for you") | [A§8] | Requires knowing which tier the user came from |

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-04-11 | 1.0 | Initial task list created from Claude implementation spec + codebase audit |
| 2026-04-11 | 1.1 | Added checkout status section. Checkout confirmed working (GHL redirect live). Removed D7/D8. |
| 2026-04-11 | 1.2 | **Analysis cross-reference pass:** Added `[A§N]` refs to every task. Pulled pre-written FAQ copy from Analysis §9 into Task 2.1. Enriched Task 3.3 with validated market data + citations. Added 4 new tasks from analysis gaps: 2.6 (Choose Your Mode), 3.5 (Industries hero), 4.1e (FAQ response time), 6.3 (Scale badges), 6.4 (Compare scenario cards). Added Deferred Items table for post-launch. Added spec doc references to Checkout Status section. |
