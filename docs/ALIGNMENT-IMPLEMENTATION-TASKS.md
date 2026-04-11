# EverIntent Alignment Implementation Task List

**Version:** 1.0  
**Created:** 2026-04-11  
**Source:** Claude Implementation Spec + Codebase Audit  
**Reference:** `docs/ALIGNMENT-ANALYSIS-v1.md`

---

## Phase 1: Critical Data Fixes

> **Estimated effort:** 30 min  
> **Parallelism:** All 5 tasks are independent — can be done simultaneously.

| # | Task | File(s) | Current State | Target State | Success Criteria |
|---|------|---------|--------------|--------------|-----------------|
| 1.1 | Fix FinalCTASection price error | `src/components/home/FinalCTASection.tsx` line 31 | Shows "$149/month" | "$197/month" | Price matches cheapest AI Employee tier ($197/mo After-Hours) |
| 1.2 | Fix Email Authority price in CompareWebsites | `src/pages/CompareWebsites.tsx` line 111 | Shows `$79/mo` for Email Authority addon | `$49/mo` | Matches `checkoutConfig.ts` line 196 (`monthlyPrice: 49`) and AddOns.tsx |
| 1.3 | Fix Web Chat Only CTA link | `src/pages/AIEmployee.tsx` line 79 | `href: '/contact'` | `href: '/let-ai-handle-it/web-chat'` or `/checkout/web-chat` | Web Chat links to detail or checkout page, not generic contact. Note: `/checkout/web-chat` route exists in `checkoutConfig.ts` (slug: `web-chat`) |
| 1.4 | Fix Capture setup fee inconsistency | `src/pages/SmartWebsites.tsx` line 58 | Shows `setup: "$249"` for Capture | `setup: "$0"` or remove setup display | Matches `checkoutConfig.ts` line 58 (`setupFee: 0`). Also check `SmartLead.tsx` line 256 which says "Setup is $249" |
| 1.5 | Remove SMS/Email quotas from Pricing comparison | `src/pages/Pricing.tsx` line 55 | `SMS/Email` row with `400/600/1000` values | Remove this row from `websiteFeatures` array | No SMS/Email quota row in pricing table. Quotas exist in `CompareWebsites.tsx` line 186-187 — decide if those stay (compare page = detail, pricing = summary). **Decision needed: also remove from CompareWebsites?** |

### Phase 1 Verification Checklist
- [ ] `$197/month` in FinalCTASection
- [ ] `$49/mo` for Email Authority in CompareWebsites  
- [ ] Web Chat CTA links to checkout or detail page
- [ ] Capture setup fee = $0 across all pages
- [ ] SMS/Email quota row removed from Pricing.tsx

---

## Phase 2: Conversion-Critical Additions

> **Estimated effort:** 2-3 hours  
> **Parallelism:** 2.1, 2.2, 2.3, and 2.4/2.5 are independent work streams.

| # | Task | File(s) | Current State | Target State | Success Criteria |
|---|------|---------|--------------|--------------|-----------------|
| 2.1 | Add 3 killer objection FAQs | `src/pages/FAQ.tsx` (pricing category), `src/pages/Pricing.tsx` (faqItems array) | Missing: "robot objection", "expensive objection", "think about it" | Add 3 Q&As with conviction-driven answers per spec | FAQs appear in both `/faq` page (pricing category) and `/pricing` FAQ section. Schema.org structured data includes new questions. |
| 2.2 | Reframe "setup" → "AI Training & Implementation" | `src/pages/Pricing.tsx` lines 84/96/108/121/422, `src/pages/AIEmployee.tsx` lines 44/55/66/78/266, `src/pages/CompareAIEmployee.tsx` lines 96/106/116, `src/pages/SmartWebsites.tsx` lines 33/58/83/108/411 | Label says "setup" | Label says "AI Training & Implementation" (or "AI Training" for tight spaces on mobile) | All setup fee labels use new framing. No remaining "setup" labels on buyer-facing pricing. **Mobile check at 375px** — truncation risk on card layouts. |
| 2.3 | Add trust signals to checkout flow | `src/pages/checkout/CheckoutPage.tsx` | No trust strip above form | Horizontal strip: `✓ No contracts  ✓ Cancel anytime  ✓ 30-day optimization  ✓ Secure checkout` | Trust strip visible on all `/checkout/*` routes. Desktop: single row. Mobile (375px): 2×2 grid. Uses `bg-muted` + `text-muted-foreground` tokens (no `bg-surface-dark` — that token doesn't exist in index.css). |
| 2.4 | Replace generic "Get Started" CTAs with outcome text | Multiple files (see breakdown below) | Generic "Get Started" on most tier CTAs | Outcome-specific CTA text per tier | Every tier's primary CTA uses its designated outcome text. |
| 2.5 | Add "Book a Call" secondary CTA on plans ≥$197/mo | `src/pages/Pricing.tsx`, individual tier pages | Missing for Convert ($197) and Scale ($297) website tiers. Already exists for Front Office and Full AI on Pricing.tsx lines 440-447. | Text link: "Want to talk first?" → `/contact` below primary CTA | Secondary CTA visible on Convert, Scale, After-Hours tier cards on pricing page and detail pages. Does NOT compete visually with primary CTA. |

### Task 2.4 CTA Mapping (detailed breakdown)

| Tier | Current CTA | New CTA | Files to Update |
|------|-------------|---------|-----------------|
| Launch | "Get Started" | "Build My Website" | `Pricing.tsx` line 66, `SmartWebsites.tsx` line 51, `SmartSite.tsx` line 127 |
| Capture | "Get Started" / "Start Capturing Leads" | "Start Capturing Leads" | `Pricing.tsx` line 67 (currently "Get Started"), `SmartWebsites.tsx` line 76 (already correct!) |
| Convert | "Get Started" / "Grow Your Business" | "Automate My Business" | `Pricing.tsx` line 68, `SmartWebsites.tsx` line 101 |
| Scale | "Get Started" / "Unlock Full AI" | "Unlock Full AI" | `Pricing.tsx` line 69 (currently "Get Started"), `SmartWebsites.tsx` line 130 (already correct!) |
| Web Chat | N/A (links to /contact) | "Add AI Chat" | `AIEmployee.tsx` line 79 (once link is fixed in 1.3) |
| After-Hours | "Learn More" | "Answer After Hours" | `AIEmployee.tsx` line 276 (mode card CTA) |
| Front Office | "Learn More" | "Screen My Calls" | `AIEmployee.tsx` line 276 |
| Full AI | "Learn More" | "Hire My AI Employee" | `AIEmployee.tsx` line 276 |
| AI tab on Pricing | "Get Started" | Same outcome verbs | `Pricing.tsx` line 432 |
| Compare AI | "Get Started" | Same outcome verbs | `CompareAIEmployee.tsx` lines 295, 505 |
| Header | "Get Started" | Keep as-is (generic entry point) | `Header.tsx` — **DO NOT CHANGE** |

### Phase 2 Verification Checklist
- [ ] 3 objection FAQs appear on `/faq` and `/pricing`
- [ ] No "setup" label remains on any buyer-facing page
- [ ] Trust strip visible at `/checkout/launch` on desktop and 375px mobile
- [ ] Every tier CTA uses outcome text (spot-check 5 pages)
- [ ] "Want to talk first?" link on Convert, Scale, After-Hours cards

---

## Phase 3: Homepage & Pricing Page Alignment

> **Estimated effort:** 2-3 hours  
> **Parallelism:** 3.1 + 3.2 (homepage) can run parallel with 3.3 + 3.4 (pricing page).

| # | Task | File(s) | Current State | Target State | Success Criteria |
|---|------|---------|--------------|--------------|-----------------|
| 3.1 | Fix hero subheadline | `src/components/home/HeroSection.tsx` line 51 | "EverIntent provides AI Employee automation and websites for local businesses." | "Your phone answered 24/7. Appointments booked automatically. Leads captured while you sleep." | No company name in subheadline. Copy leads with outcomes. **Note:** Second sentence of current copy already says this — just remove the first sentence. |
| 3.2 | Rewrite HowWeHelp to cover 3 buyer types | `src/components/home/HowWeHelpSection.tsx` | All 3 cards address "bleeding wound" (missed calls) | Card 1: Credibility ("Look Like the Business You Are" → /smart-websites), Card 2: Bleeding ("Recover Every Missed Call" → /let-ai-handle-it), Card 3: Burnout ("Stop Being the Bottleneck" → /let-ai-handle-it/full-ai-employee) | 3 distinct buyer personas addressed. Each card links to appropriate product. **Image assets needed:** Card 1 and Card 3 need new lifestyle images (generate or source). Card 2 can reuse `missed-call-recovery.jpg`. |
| 3.3 | Add "Cost of Doing Nothing" section to Pricing | `src/pages/Pricing.tsx` | No cost-of-inaction section | 3-column stat row above tier cards: `62%` / `$200+` / `$48,000`. Below: "Our most popular plan costs $197/month. Your missed calls cost more." | Section renders between hero and first tier card. Uses `bg-muted` background for contrast break. Stats in `text-accent`. Labels in `text-muted-foreground`. Mobile: stacked vertically. |
| 3.4 | Fix pricing page hero headline | `src/pages/Pricing.tsx` line 206 | "Simple, Transparent Pricing" | "Stop Losing Money. Pick Your Plan." | Hero headline leads with pain, not platitude. Subheadline stays: "Professional websites from $249. AI automation from $197/month." |

### Phase 3 Verification Checklist
- [ ] Hero subheadline starts with "Your phone answered 24/7"
- [ ] HowWeHelp shows 3 distinct cards for credibility/bleeding/burnout
- [ ] Cost-of-inaction section visible on `/pricing` above tier cards
- [ ] Pricing hero says "Stop Losing Money. Pick Your Plan."
- [ ] All changes render correctly at 375px

---

## Phase 4: Copy Voice Cleanup

> **Estimated effort:** 1-2 hours  
> **Parallelism:** 4.1 patterns can be searched/fixed in parallel. 4.2 pages are independent.

| # | Task | File(s) | Current State | Target State | Success Criteria |
|---|------|---------|--------------|--------------|-----------------|
| 4.1a | Remove company-first intros | `HeroSection.tsx` line 51, `Services.tsx` lines 195-196 | "EverIntent provides..." | Lead with outcome | Zero "EverIntent provides/offers/helps" in buyer-facing copy. **Exception:** Legal pages (TermsOfService.tsx) — keep as-is. |
| 4.1b | Remove soft hedging language | Only found in `AccessibilityStatement.tsx` | "We strive to" / "we aim to" | N/A — **legal page, DO NOT CHANGE** | No action needed. Legal pages are exempt. |
| 4.1c | Remove WordPress/Elementor/OVH/Plesk from FAQ | `src/pages/FAQ.tsx` line 136 | "Websites are built on WordPress with Elementor, hosted on OVH/Plesk infrastructure with Cloudflare" | "Websites are built on modern, fast infrastructure with Cloudflare for performance and security." | No CMS/hosting stack details in buyer-facing FAQ. |
| 4.1d | Remove feature-first descriptions where they lead | `Pricing.tsx` websiteTiers descriptions (lines 66-69) | "Get online fast with a professional 5-page website. Mobile responsive, SEO-ready, delivered in 5 days." | Outcome-first: "Look professional online. Capture leads from day one. Built and launched in 5 days." | Tier descriptions on pricing page lead with outcomes. Feature details remain in comparison tables. |
| 4.2 | Smart Website page heroes — outcome-first | `SmartSite.tsx`, `SmartLead.tsx`, `SmartBusiness.tsx`, `SmartGrowth.tsx` | Likely feature-first heroes | Launch: "Look Professional. Get Found. Get Called." / Capture: "Every Lead That Touches Your Site Gets Captured" / Convert: "Turn Visitors Into Booked Appointments" / Scale: "AI Runs Your Website While You Run Your Business" | Each SW tier page hero leads with outcome statement. **Needs file read to confirm current state before editing.** |

### Phase 4 Verification Checklist
- [ ] Zero "EverIntent provides/offers" in non-legal pages
- [ ] No CMS/hosting tech stack in FAQ
- [ ] Pricing tier descriptions are outcome-first
- [ ] Each SW tier page hero is outcome-first (spot-check all 4)

---

## Phase 5: Animated Proof Sections

> **Estimated effort:** 6-8 hours (revised from spec's 3-4)  
> **Parallelism:** All 3 demos are independent components; can be built in parallel.

| # | Task | File(s) | Current State | Target State | Success Criteria |
|---|------|---------|--------------|--------------|-----------------|
| 5.1 | "Watch a Lead Get Captured" — Capture page | New component + `src/pages/smart-websites/SmartLead.tsx` | No animated proof section | Animated message thread showing: visitor lands → AI chat engages → lead captured → owner notified. Pattern: reuse `SMSDemo.tsx` component architecture. | Animation renders on Capture page. Wrapped in `ClientOnly`. Respects `prefers-reduced-motion`. Mobile-first layout (stacked). Uses framer-motion (matching existing SMSDemo pattern, not CSS-only). |
| 5.2 | "Watch a No-Show Get Saved" — Convert page | New component + `src/pages/smart-websites/SmartBusiness.tsx` | No animated proof section | SMS notification mockup: reminder → reschedule → confirmed. | Same rendering/accessibility standards as 5.1. |
| 5.3 | "Watch AI Run the Front Office" — Scale page | New component + `src/pages/smart-websites/SmartGrowth.tsx` | No animated proof section | Split-screen: voice + SMS + chat simultaneously → 3 appointments booked. | Same standards. Most complex of the three — multi-channel visualization. |

### Phase 5 Dependencies
- Requires understanding `SMSDemo.tsx` component architecture (already reviewed — uses framer-motion + timed reveals)
- New components should live in `src/components/smart-websites/` directory
- **Decision needed:** CSS-only (spec says) vs framer-motion (existing pattern). Recommendation: use framer-motion for consistency.

### Phase 5 Verification Checklist
- [ ] Animated demo on Capture tier page
- [ ] Animated demo on Convert tier page
- [ ] Animated demo on Scale tier page
- [ ] All wrapped in `ClientOnly`
- [ ] `prefers-reduced-motion` respected (test with DevTools)
- [ ] Mobile layout (375px) — stacked, no horizontal overflow

---

## Phase 6: Lower Priority / High Impact

> **Estimated effort:** 2-3 hours  
> **Parallelism:** 6.1 and 6.2 are independent.

| # | Task | File(s) | Current State | Target State | Success Criteria |
|---|------|---------|--------------|--------------|-----------------|
| 6.1 | Add annual pricing toggle | `src/pages/Pricing.tsx`, `src/config/checkoutConfig.ts` | Monthly-only pricing shown | Monthly/Annual toggle. Annual = 2 months free (save 17%). Toggle affects all displayed prices. | Toggle renders above tier cards. Annual prices show monthly equivalent + "billed annually" note. `checkoutConfig.ts` gets `annualPrice` field per tier (only structural change allowed to this file). |
| 6.2 | Add Voice AI Chat Widget mention | `src/pages/CompareAIEmployee.tsx`, `src/pages/ai-employee/FullAIEmployee.tsx` | Voice AI Chat Widget not mentioned anywhere | Listed as included feature in Full AI Employee, mentioned as $79/mo add-on for other tiers in comparison table. | Feature mentioned in comparison table and Full AI detail page. No standalone page needed yet. |

### Phase 6 Verification Checklist
- [ ] Annual toggle works on `/pricing`
- [ ] Annual prices calculate correctly (monthly × 10 for annual)
- [ ] Voice AI Chat Widget in comparison table
- [ ] No broken checkout flow from toggle

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
  ├── 1.4 SmartWebsites Capture setup fee
  └── 1.5 Pricing SMS/Email quota removal

Phase 2 (4 parallel streams)
  ├── Stream A: 2.1 FAQ objection answers
  ├── Stream B: 2.2 Setup fee relabeling (multi-file)
  ├── Stream C: 2.3 Checkout trust strip
  └── Stream D: 2.4 + 2.5 CTA text + Book a Call links

Phase 3 (2 parallel streams)
  ├── Stream A: 3.1 + 3.2 Homepage (hero + HowWeHelp)
  └── Stream B: 3.3 + 3.4 Pricing page (cost section + hero)

Phase 4 (parallel pattern fixes)
  ├── 4.1a-d Copy patterns (independent file edits)
  └── 4.2 SW tier page heroes (4 independent pages)

Phase 5 (3 parallel components)
  ├── 5.1 Capture animated demo
  ├── 5.2 Convert animated demo
  └── 5.3 Scale animated demo

Phase 6 (2 parallel tasks)
  ├── 6.1 Annual pricing toggle
  └── 6.2 Voice AI Chat Widget mentions
```

---

## Open Decisions

| # | Question | Impact | Recommendation |
|---|----------|--------|----------------|
| D1 | Remove SMS/Email quotas from CompareWebsites.tsx too, or only from Pricing.tsx? | Consistency vs. detail for comparison shoppers | Remove from Pricing (summary view). Keep in CompareWebsites (detail view) but add footnote: "Usage-based billing above included allocation." |
| D2 | Capture setup fee: set to $0 (match checkoutConfig) or set checkoutConfig to $249 (match SmartWebsites page)? | Revenue + messaging | Set to $0 everywhere. checkoutConfig is source of truth. $0 setup is a conversion advantage for the "most popular" tier. |
| D3 | SmartLead.tsx line 256 says "Setup is $249" — should this also become $0? | Consistency with D2 | Yes. Same decision as D2. |
| D4 | Phase 5 animations: CSS-only (spec) or framer-motion (existing pattern)? | Consistency + quality | framer-motion. The existing SMSDemo uses it. CSS-only would create inconsistency and limit animation quality. |
| D5 | HowWeHelp Card 1 + Card 3 need new lifestyle images. Generate or placeholder? | Visual quality | Generate via imagegen tool. Two images: (1) professional website on devices, (2) business owner relaxed with phone showing booked calendar. |
| D6 | "AI Training & Implementation" is long for mobile cards. Allow "AI Training" abbreviation? | Mobile layout at 375px | Yes. Use "AI Training & Implementation" in detail/checkout views, "AI Training" in compact card contexts. |

---

## Changelog

| Date | Version | Change |
|------|---------|--------|
| 2026-04-11 | 1.0 | Initial task list created from Claude implementation spec + codebase audit |
