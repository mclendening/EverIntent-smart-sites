# EverIntent Alignment Implementation Task List

**Version:** 1.8  
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
| 2.2 | Conditional setup fee relabeling | Multiple files (see line refs below) | Label says "setup" on all tiers | **$0 tiers** (Capture/Convert/Scale): "No setup fee" or remove line. **$249 Launch**: leave as-is (product price, not a fee). **$497+ AI Employee**: "$X AI Training & Implementation" (full) / "$X AI Training" (compact 375px). | No "setup" label on $0 tiers. Launch unchanged. AI Employee tiers say "AI Training & Implementation." `checkoutConfig.ts` field stays `setupFee` (data model unchanged). | [A§2, A#3] |
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

### Task 2.2 Conditional Setup Fee Relabeling Rules

| Fee Amount | Current Label | New Label |
|---|---|---|
| $0 (Capture, Convert, Scale websites) | "$0 setup" | "No setup fee" — or remove the setup line entirely |
| $249 (Launch website) | "$249" | Leave as-is. Product price, not a fee. Do NOT add "AI Training & Implementation." |
| $497+ (AI Employee tiers) | "$X setup" | "$X AI Training & Implementation" (full) / "$X AI Training" (compact 375px) |

**Data model note:** `checkoutConfig.ts` field remains `setupFee` — this is presentation-layer only.

| File | Lines | Context | Action |
|------|-------|---------|--------|
| `src/pages/Pricing.tsx` | 83-121, 421 | SW cards show `setup` for $0 tiers; AI tab shows `setup` for AI tiers | Remove setup display for $0 tiers; relabel AI tier setup |
| `src/pages/AIEmployee.tsx` | 44, 55, 66, 78, 266, 292 | AI tier cards + setup callout section | Relabel to "AI Training & Implementation" |
| `src/pages/CompareAIEmployee.tsx` | 96, 106, 116, 280, 492 | Comparison table + mobile cards | Relabel to "AI Training & Implementation" |
| `src/pages/SmartWebsites.tsx` | 33, 58, 83, 108, 347, 411 | SW tier cards + desktop table | Remove/hide setup for $0 tiers; leave Launch as-is |

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
- [x] 3 objection FAQs appear on `/faq` and `/pricing` — confirmed 2026-04-11
- [x] No "setup" label remains on any buyer-facing page — confirmed 2026-04-11
- [x] Trust strip visible at `/checkout/launch` on desktop and 375px mobile — confirmed 2026-04-11
- [x] Every tier CTA uses outcome text (spot-check 5 pages) — confirmed 2026-04-11
- [x] "Want to talk first?" link on Convert, Scale, After-Hours cards — confirmed 2026-04-11
- [x] "Choose Your Mode" replaced with "How Much Do You Want AI to Handle?" — confirmed 2026-04-11

> **Phase 2 Status: ✅ COMPLETE** — All 6 tasks verified on mobile 2026-04-11

---

## Phase 2.5: FAQ Architecture Audit (Dependency Resolution)

> **Estimated effort:** Research only, no code. 30-60 min.  
> **Blocks:** Task 3.3 (pricing page content section), Task 4.3 (FAQ rewrite — to be added), Task 6.4 (compare page scenario cards)  
> **Does NOT block:** Tasks 3.1, 3.2, 3.4, 3.5 (homepage and pricing hero changes)

### Task 2.5.1 — Audit Results: Existing FAQ Architecture

**Finding: No centralized FAQ system exists.** FAQ content is hardcoded inline across 20+ files with complete duplication and voice drift risk.

| Location | Pattern | Content |
|----------|---------|---------|
| `src/pages/FAQ.tsx` lines 35-171 | `faqCategories[]` array, 5 categories, ~25 questions | Main FAQ page. Inline data. FAQPage JSON-LD auto-generated from same array. |
| `src/pages/Pricing.tsx` lines 131-168 | `faqItems[]` array, 6 questions | Pricing-specific FAQ section. Duplicate of some FAQ.tsx content. Independent FAQPage JSON-LD. |
| `src/pages/SmartWebsites.tsx` lines 158-224 | `faqItems[]` array, 8 questions | Smart Websites FAQ. Fully independent. Own FAQPage JSON-LD. |
| `src/pages/smart-websites/SmartSite.tsx` | `faqs[]` array + inline FAQPage schema | Tier-specific FAQ, hardcoded. |
| `src/pages/smart-websites/SmartLead.tsx` | `faqs[]` array + inline FAQPage schema | Tier-specific FAQ, hardcoded. |
| `src/pages/smart-websites/SmartBusiness.tsx` | `faqs[]` array + inline FAQPage schema | Tier-specific FAQ, hardcoded. |
| `src/pages/smart-websites/SmartGrowth.tsx` | `faqs[]` array + inline FAQPage schema | Tier-specific FAQ, hardcoded. |
| `src/pages/AIEmployee.tsx` lines 119-130 | Inline FAQPage JSON-LD in `structuredData` prop | No visible FAQ section — schema-only for SEO. |
| `src/pages/ai-employee/AfterHours.tsx` | Inline FAQPage JSON-LD | Schema-only. |
| `src/pages/ai-employee/FrontOffice.tsx` | Inline FAQPage JSON-LD | Schema-only. |
| `src/pages/ai-employee/FullAIEmployee.tsx` | Inline FAQPage JSON-LD | Schema-only. |
| `src/pages/Help.tsx` lines 69-78 | Inline FAQPage JSON-LD | Schema-only, 3 questions. |
| `src/pages/Support.tsx` lines 73-76 | Inline FAQPage JSON-LD | Schema-only. |
| `src/pages/industries/*Showcase.tsx` (×4) | `faqItems[]` passed to `IndustryShowcaseTemplate` | Industry-specific FAQs via shared template component. |
| `src/components/industries/IndustryShowcaseTemplate.tsx` | `FAQAccordion` component + `FAQItem` interface | Reusable display component — but data still comes hardcoded from each showcase page. |

**Key risks:**
- Same question appears with different answers across pages (voice drift already present)
- Price/product changes require touching 10+ files
- FAQPage JSON-LD is manually constructed per-page — schema drift guaranteed
- No way for a non-technical operator to update FAQ content

### Task 2.5.2 — Supabase Check: No FAQ Data Model Exists

- **No `faqs` table** in any migration file
- **No FAQ-related edge functions**
- **No admin UI** for FAQ content management
- **No content table** that could serve FAQ data
- The only Supabase mention of "FAQ" is a comment in `supabase/functions/ghl-config/index.ts` line 48 about future widget routing

### Task 2.5.3 — Recommended Centralized FAQ Architecture

#### Data Structure

```typescript
// src/data/faqs.ts — Single source of truth
interface FAQItem {
  id: string;                    // Unique identifier
  question: string;
  answer: string;
  category: FAQCategory;        // 'smart-websites' | 'ai-employee' | 'pricing' | 'setup' | 'support'
  tags: FAQTag[];               // Multi-tag for contextual filtering
  products?: ProductTag[];       // Which products this FAQ relates to
  priority: number;              // Sort order within category (lower = first)
  isObjection?: boolean;         // Flag for conviction-first ordering
}

type FAQCategory = 'smart-websites' | 'ai-employee' | 'pricing' | 'setup' | 'support';

type FAQTag = 
  | 'pricing' | 'product' | 'support' | 'objection' | 'technical'
  | 'billing' | 'setup' | 'ownership' | 'compliance' | 'integration';

type ProductTag = 
  | 'launch' | 'capture' | 'convert' | 'scale'
  | 'web-chat' | 'after-hours' | 'front-office' | 'full-ai'
  | 'all-websites' | 'all-ai';
```

#### Where the Data Lives: **Repo file (`src/data/faqs.ts`)**

**Rationale:** SSG requires build-time data. A Supabase table would require a build-time fetch step + fallback, adding complexity for no gain at current scale (~50 FAQs). The repo file approach:
- ✅ SSG-compatible (imported at build time, zero client fetch)
- ✅ Type-safe (TypeScript interfaces)
- ✅ Version-controlled (git history for every change)
- ✅ Single file to update (non-technical operator edits one file, not 20)
- ✅ No migration needed from current hardcoded content

**Future upgrade path:** When FAQ count exceeds ~200 or a non-technical CMS is needed, migrate to Supabase `faqs` table + build-time fetch via `vite-react-ssg` data loading. The component layer stays identical — only the data source changes.

#### How Pages Consume It

```typescript
// src/components/faq/FAQSection.tsx — Shared display component
// Replaces all inline FAQ rendering across 20+ files

interface FAQSectionProps {
  category?: FAQCategory;           // Filter by category
  tags?: FAQTag[];                  // Filter by tags (OR logic)
  products?: ProductTag[];          // Filter by product
  maxItems?: number;                // Limit display count
  showSchema?: boolean;             // Include FAQPage JSON-LD (default: true)
  className?: string;
}

// Usage examples:
// /faq page:          <FAQSection />  (shows all, grouped by category)
// /pricing:           <FAQSection category="pricing" />
// /smart-websites:    <FAQSection products={['all-websites']} />
// /let-ai-handle-it:  <FAQSection products={['all-ai']} />
// Industry showcase:  <FAQSection products={['capture']} tags={['integration']} />
```

#### How SEO Schema Gets Generated

The `FAQSection` component auto-generates `FAQPage` JSON-LD from the filtered FAQ items it displays:

```typescript
// Inside FAQSection, when showSchema={true}:
const schema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: filteredItems.map(item => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: { '@type': 'Answer', text: item.answer }
  }))
};
// Injected via <SEO structuredData={schema} /> or inline <script>
```

No more manual JSON-LD construction per page. Schema always matches displayed content.

#### How an Operator Updates It

1. Open `src/data/faqs.ts`
2. Add/edit/remove an entry in the array
3. Set `category`, `tags`, and `products` for filtering
4. Set `priority` for ordering (lower = appears first)
5. Commit — SSG rebuilds, every page consuming that FAQ auto-updates

#### Migration Path

1. **Create `src/data/faqs.ts`** with all current FAQ content consolidated from 20+ files
2. **Create `src/components/faq/FAQSection.tsx`** shared display component
3. **Create `src/components/faq/FAQCategoryGroup.tsx`** for the /faq page (grouped view)
4. **Migrate pages one-by-one:** Replace inline `faqItems[]` arrays + manual JSON-LD with `<FAQSection>` component calls
5. **Delete orphaned inline FAQ data** from each migrated page
6. **Verify:** FAQPage JSON-LD output matches pre-migration content on every page

### Task 2.5.4 — Downstream Task Updates

Architecture approved 2026-04-11. Downstream updates applied:

- **Phase 2.5 implementation complete:** `src/data/faqs.ts` + `src/components/faq/FAQSection.tsx` built. `FAQ.tsx`, `Pricing.tsx`, `SmartWebsites.tsx` migrated to centralized system.
- **Phase 2.5B added:** FAQ Migration Completion — migrates remaining 12+ files to centralized system.
- **Task 4.3 added:** FAQ content scrub — targets `src/data/faqs.ts` (single file). BLOCKED by 2.5B.
- **Task 3.3 updated:** Uses centralized FAQ system. Now unblocked and COMPLETE.
- **Task 6.4:** Compare page scenario cards can pull from FAQ data via tags if applicable.

> **Phase 2.5 Status: ✅ COMPLETE** — Architecture approved, core system built, initial migrations done. Remaining migrations tracked in Phase 2.5B.

---

## Phase 2.5B: FAQ Migration Completion ✅ COMPLETE

> **Estimated effort:** 1-2 hours  
> **Blocks:** Phase 4 Task 4.3 (FAQ content scrub)  
> **Parallelism:** All page migrations are independent — can run in parallel.  
> **Status:** ✅ COMPLETE — All migrations verified 2026-04-11

| # | Task | File(s) | Status |
|---|------|---------|--------|
| 2.5B.1 | Migrate Smart Website tier pages to FAQSection | `SmartSite.tsx`, `SmartLead.tsx`, `SmartBusiness.tsx`, `SmartGrowth.tsx` | ✅ |
| 2.5B.2 | Migrate AI Employee pages to FAQSection | `AIEmployee.tsx`, `AfterHours.tsx`, `FrontOffice.tsx`, `FullAIEmployee.tsx` | ✅ |
| 2.5B.3 | Migrate Help and Support pages to FAQSection | `Help.tsx`, `Support.tsx` | ✅ |
| 2.5B.4 | Migrate Industry Showcase pages to FAQSection | All `industries/*Showcase.tsx` + `IndustryShowcaseTemplate.tsx` | ✅ |
| 2.5B.5 | Verify zero hardcoded FAQ arrays remain | Full `src/` search | ✅ |
| 2.5B.6 | Resolve duplicate questions with conflicting answers | `src/data/faqs.ts` | ✅ No conflicts found |
| 2.5B.7 | Migrate Services.tsx to FAQSection | `Services.tsx` | ✅ Added `services` category to faqs.ts with 6 entries |
| 2.5B.8 | Migrate WarmyEmailDeliverability.tsx to FAQSection | `WarmyEmailDeliverability.tsx` | ✅ Already in faqs.ts as `warmy` category |
| 2.5B.9 | Remove dead `faqItems` prop from IndustryShowcaseTemplate | `IndustryShowcaseTemplate.tsx` | ✅ Removed prop, FAQItem type, and FAQAccordion component |

### Phase 2.5B Verification Checklist
- [x] `SmartSite.tsx` — no inline FAQ array, no manual JSON-LD
- [x] `SmartLead.tsx` — same
- [x] `SmartBusiness.tsx` — same
- [x] `SmartGrowth.tsx` — same
- [x] `AIEmployee.tsx` — no manual FAQ JSON-LD
- [x] `AfterHours.tsx` — same
- [x] `FrontOffice.tsx` — same
- [x] `FullAIEmployee.tsx` — same
- [x] `Help.tsx` — same
- [x] `Support.tsx` — same
- [x] All `*Showcase.tsx` — same
- [x] `Services.tsx` — same
- [x] `WarmyEmailDeliverability.tsx` — same
- [x] `IndustryShowcaseTemplate.tsx` — dead `faqItems` prop removed
- [x] `grep` confirms zero hardcoded FAQ arrays in `src/`
- [x] All duplicate questions resolved with Voice Calibration Standard

---

## Phase 3: Homepage & Pricing Page Alignment

> **Estimated effort:** 2-3 hours  
> **Parallelism:** 3.1 + 3.2 + 3.5 (homepage) can run parallel with 3.4 (pricing hero). 3.3 BLOCKED by Phase 2.5.

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
- [x] Hero subheadline starts with "Your phone answered 24/7" — confirmed 2026-04-11
- [x] HowWeHelp shows 3 distinct cards for credibility/bleeding/burnout — confirmed 2026-04-11
- [x] Cost-of-inaction section visible on `/pricing` above tier cards — confirmed 2026-04-11
- [x] Pricing hero says "Stop Losing Money. Pick Your Plan." — confirmed 2026-04-11
- [x] Industries hero is pain-led — confirmed 2026-04-11
- [x] All changes render correctly at 375px — confirmed 2026-04-11

> **Phase 3 Status: ✅ COMPLETE** — All 5 tasks verified on mobile 2026-04-11

---

## Phase 4: Copy Voice Cleanup ✅ COMPLETE

> **Estimated effort:** 1-2 hours  
> **Parallelism:** 4.1 patterns can be searched/fixed in parallel. 4.2 pages are independent.  
> **Status:** ✅ COMPLETE — All tasks verified 2026-04-11

| # | Task | File(s) | Current State | Target State | Success Criteria | Analysis Ref |
|---|------|---------|--------------|--------------|-----------------|-------------|
| 4.1a | ✅ Remove company-first intros | All non-legal `src/` files | "EverIntent provides..." | Lead with outcome | Only match in `TermsOfService.tsx` (legal, exempt). Zero matches in buyer-facing pages. | [A§11] |
| 4.1b | ✅ Remove soft hedging language | Only found in `AccessibilityStatement.tsx` | "We strive to" / "we aim to" | N/A — **legal page, DO NOT CHANGE** | No action needed. Legal pages are exempt. | [A§11] |
| 4.1c | ✅ Remove WordPress/Elementor/OVH/Plesk from FAQ | `src/data/faqs.ts` | Previously in FAQ pages | Zero matches in faqs.ts | Verified clean — no CMS/hosting stack in buyer-facing FAQ. | [A§9, A§11] |
| 4.1d | ✅ Pricing tier descriptions outcome-first | `Pricing.tsx` websiteTiers descriptions | Feature-first descriptions | Outcome-first: "Look professional online in 5 days..." / "Every lead gets captured..." / "Customers book themselves..." / "AI runs your website..." | All 4 tier descriptions lead with outcomes. | [A§2, A§3] |
| 4.1e | ✅ Fix FAQ response time language | `src/data/faqs.ts` | No SLA jargon found | Already clean | Verified — no "Urgent/High priority/Normal/SLA" in faqs.ts. | [A§9] |
| 4.2 | ✅ Smart Website page heroes — outcome-first | `SmartSite.tsx`, `SmartLead.tsx`, `SmartBusiness.tsx`, `SmartGrowth.tsx` | Single-word tier name heroes | Outcome headlines per spec | All 4 pages updated with conviction-first headlines. | [A§3] |
| 4.3 | ✅ Scrub faqs.ts for feature-first language | `src/data/faqs.ts` | 10 instances of "setup fee," "5-page," "SSL," "mobile responsive" | All rewritten to Voice Calibration Standard. "AI Training & Implementation" for $497+ fees. Zero "5-page," zero "setup fee." | 10 answers rewritten and approved. Zero feature-first language remaining. | [A§9, A§11] |

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

### Task 4.3 Search Patterns

> Run these against `src/data/faqs.ts` after 2.5B migration is complete:

- `"5-page"` / `"5 page"`
- `"setup fee"` / `"setup cost"` / `"$249 setup"` / `"$0 setup"`
- `"mobile responsive"` as a selling point
- `"SSL"` as a selling point
- `"WordPress"` / `"Elementor"` / `"OVH"` / `"Plesk"`
- `"we strive to"` / `"we aim to"` / `"our goal is"`
- Any answer where the first sentence is a definition rather than a conviction statement

### Phase 4 Verification Checklist
- [x] Zero "EverIntent provides/offers" in non-legal pages ✅
- [x] No CMS/hosting tech stack in FAQ ✅
- [x] No SLA jargon in FAQ response time answer ✅
- [x] Pricing tier descriptions are outcome-first ✅
- [x] Each SW tier page hero is outcome-first (all 4 verified) ✅
- [x] Zero feature-first language in `faqs.ts` (10 rewrites committed) ✅
- [x] Zero "5-page," "setup fee," "WordPress," "we strive to" in `faqs.ts` ✅

> **Phase 4 Status: ✅ COMPLETE** — All tasks verified by independent testing 2026-04-11

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
- [x] Animated demo on Capture, Convert, Scale pages ✅
- [x] All wrapped in `ClientOnly` ✅
- [x] `prefers-reduced-motion` respected ✅
- [x] Mobile layout (375px) — stacked, no horizontal overflow ✅
- [x] MultiChannelDemo summary card visible 3+ seconds before loop reset ✅

> **Phase 5 Status: ✅ COMPLETE** — All 3 demos verified by independent testing 2026-04-11

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
- [x] Annual toggle works on `/pricing` ✅
- [x] Annual prices calculate correctly (monthly × 10 for annual) ✅
- [x] Voice AI Chat Widget in comparison table ✅
- [x] "Included free with Scale" badges visible on add-ons page ✅
- [x] Scenario cards on both compare pages ✅

> **Phase 6 Status: ✅ COMPLETE** — All 4 tasks verified by independent testing 2026-04-11

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
- [ ] `public/404.html` (created in Phase 7.4 — do not delete)
- [ ] Legal pages (except tech stack FAQ removal in 4.1c)
- [ ] Nav structure
- [ ] `checkoutConfig.ts` product structures (except `annualPrice` field in 6.1)
- [ ] Pricing amounts (only labels and framing)

---

## Parallel Execution Map

```
Phase 1 (all 5 tasks in parallel) ✅ COMPLETE
  ├── 1.1 FinalCTASection price ✅
  ├── 1.2 CompareWebsites Email Authority price ✅
  ├── 1.3 AIEmployee Web Chat link ✅
  ├── 1.4 SmartWebsites + SmartLead Capture setup fee ✅
  └── 1.5 Pricing SMS/Email quota removal ✅

Phase 2 (4 parallel streams) ✅ COMPLETE
  ├── Stream A: 2.1 FAQ objection answers ✅
  ├── Stream B: 2.2 Setup fee relabeling + 2.6 "Choose Your Mode" ✅
  ├── Stream C: 2.3 Checkout trust strip ✅
  └── Stream D: 2.4 + 2.5 CTA text + Book a Call links ✅

Phase 2.5 — FAQ Architecture ✅ COMPLETE
  ├── 2.5.1 Audit existing FAQ architecture ✅
  ├── 2.5.2 Check Supabase for FAQ data model ✅
  ├── 2.5.3 Propose centralized FAQ architecture ✅
  └── 2.5.4 Build core system + initial migrations ✅

Phase 2.5B — FAQ Migration Completion ✅ COMPLETE
  ├── 2.5B.1-9 All files migrated ✅

Phase 3 (3 streams) ✅ COMPLETE
  ├── Stream A: 3.1 + 3.2 + 3.5 (homepage + industries hero) ✅
  ├── Stream B: 3.4 (pricing hero) ✅
  └── Stream C: 3.3 (pricing cost section) ✅

Phase 4 (parallel pattern fixes) ✅ COMPLETE
  ├── 4.1a-e Copy patterns ✅
  ├── 4.2 SW tier page heroes ✅
  └── 4.3 FAQ content scrub (10 rewrites) ✅

Phase 5 (3 parallel components) ✅ COMPLETE
  ├── 5.1 LeadCaptureDemo on Capture page ✅
  ├── 5.2 NoShowSaveDemo on Convert page ✅
  └── 5.3 MultiChannelDemo on Scale page ✅

Phase 6 (4 parallel tasks) ✅ COMPLETE
  ├── 6.1 Annual pricing toggle ✅
  ├── 6.2 Voice AI Chat Widget mentions ✅
  ├── 6.3 "Included free with Scale" badges ✅
  └── 6.4 Compare page scenario cards ✅

Phase 7 (6 parallel tasks) 🔄 IN PROGRESS
  ├── 7.1 Sitemap changefreq + priority
  ├── 7.2 Industry pages structured data (8 files)
  ├── 7.3 Add-ons page structured data
  ├── 7.4 Create public/404.html
  ├── 7.5 Fix duplicate FAQPage schema on tier pages
  └── 7.6 Auto-generate sitemap at build time
```

---

## Phase 7: SEO Infrastructure Fixes

> **Estimated effort:** 2-3 hours  
> **Parallelism:** All 6 tasks are independent — can run in parallel.  
> **Source:** Full SEO infrastructure audit (Questions 1-4) conducted 2026-04-11.

| # | Task | File(s) | Current State | Target State | Success Criteria |
|---|------|---------|--------------|--------------|-----------------|
| 7.1 | Update sitemap.xml — add changefreq, priority per BRD hierarchy, update lastmod | `public/sitemap.xml` | 75 URLs, no changefreq/priority, stale uniform lastmod (2026-02-15) | All entries have changefreq + priority per BRD hierarchy (1.0 core → 0.2 legal). lastmod updated to today for changed pages. | `grep -c "priority" public/sitemap.xml` > 0. Priority values match BRD spec. |
| 7.2 | Add structured data to 8 industry pages (4 hubs + 4 showcases) | `HomeServices.tsx`, `ProfessionalServices.tsx`, `HealthWellness.tsx`, `Automotive.tsx`, `HomeServicesShowcase.tsx`, `ProfessionalShowcase.tsx`, `HealthWellnessShowcase.tsx`, `AutomotiveShowcase.tsx` | No `structuredData` prop on SEO component | Service schema with name, description, provider, areaServed | Each page has `structuredData` with `@type: Service`. Valid JSON-LD in SSG output. |
| 7.3 | Add structured data to add-ons page | `src/pages/smart-websites/AddOns.tsx` | No `structuredData` prop on SEO component | ItemList schema listing all 6 add-on packs with prices | `structuredData` present. ItemList has 6 items. |
| 7.4 | Create public/404.html static file | `public/404.html` | File does not exist | Static HTML 404 page per SSG-BEST-PRACTICES | `ls public/404.html` succeeds. Page has basic HTML with redirect or message. |
| 7.5 | Verify/fix duplicate FAQPage JSON-LD on Smart Website tier pages | `SmartSite.tsx`, `SmartLead.tsx`, `SmartBusiness.tsx`, `SmartGrowth.tsx` | FAQSection renders with `showSchema={true}` (default) AND SEO prop may also pass FAQ schema | Single FAQPage schema per page — no duplicates | Each tier page has exactly ONE `application/ld+json` block with `@type: FAQPage`. |
| 7.6 | Auto-generate sitemap.xml at build time from prerenderRoutes | New: `scripts/generate-sitemap.ts`, update `package.json` build script | Hand-maintained `public/sitemap.xml` that drifts | Build-time generation from same route list SSG uses | `npm run build` produces sitemap.xml with all prerenderRoutes. Adding a route to prerenderRoutes automatically adds it to sitemap. |

### Phase 7 Dependencies
- None. All tasks are independent of each other and of Phases 1-6.
- Task 7.6 supersedes Task 7.1 (once auto-generated, manual sitemap metadata is managed in the generator script).

### Phase 7 Verification Checklist
- [ ] Sitemap has changefreq + priority values
- [ ] 8 industry pages have Service JSON-LD
- [ ] Add-ons page has ItemList JSON-LD
- [ ] `public/404.html` exists
- [ ] No duplicate FAQPage schema on tier pages
- [ ] Sitemap auto-generated at build time from prerenderRoutes

> **Phase 7 Status: 🔄 IN PROGRESS**

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
| 2026-04-11 | 1.3 | **Phase 2.5 — FAQ Architecture Audit** added as dependency resolution before Phase 3. Audited 20+ files — found zero centralized FAQ system. All content hardcoded inline per-page with voice drift. No Supabase FAQ table exists. Proposed repo-file + shared component architecture. Updated Phase 3 to show Stream C blocked by 2.5. Updated parallel execution map. Task 4.3 and 6.4 flagged as blocked. |
| 2026-04-11 | 1.4 | **Phase 2.5B — FAQ Migration Completion** added with 6 tasks covering remaining 12+ file migrations. **Task 4.3** added to Phase 4 — FAQ content scrub with search patterns, blocked by 2.5B. Marked Phases 1, 2, 2.5, 3 as ✅ COMPLETE with verification dates. Updated parallel execution map to show 2.5B as next action. Task 6.4 blocker updated from 2.5 → 2.5B. |
| 2026-04-11 | 1.5 | **Phase 2.5B ✅ COMPLETE.** All 16 files migrated to centralized FAQ system. Added tasks 2.5B.7 (Services.tsx), 2.5B.8 (WarmyEmailDeliverability.tsx), 2.5B.9 (removed dead `faqItems` prop + `FAQAccordion` from IndustryShowcaseTemplate). Added `services` category to `faqs.ts` with 6 new entries. `grep` verification: zero hardcoded FAQ arrays in `src/`. Task 4.3 now unblocked. |
| 2026-04-11 | 1.6 | **Phase 4 ✅ COMPLETE.** 4.1a: zero company-first intros in non-legal pages. 4.1c: zero WordPress/OVH. 4.1d: all 4 pricing tier descriptions rewritten outcome-first. 4.1e: no SLA jargon found. 4.2: all 4 SW tier page heroes updated with conviction-first headlines. 4.3: 10 FAQ answers rewritten — "setup fee" → "AI Training & Implementation fee" for $497+ tiers, "5-page" eliminated, SSL/mobile-responsive removed as selling points. All verified and approved. |
| 2026-04-11 | 1.7 | **Phase 5 — Animated Proof Sections built.** 3 new components: `LeadCaptureDemo.tsx` (chat widget lead capture), `NoShowSaveDemo.tsx` (SMS reminder/reschedule), `MultiChannelDemo.tsx` (voice+SMS+chat activity feed). All in `src/components/smart-websites/`. Integrated into SmartLead, SmartBusiness, SmartGrowth pages. All wrapped in `ClientOnly`. All respect `prefers-reduced-motion`. Design tokens only — zero hardcoded colors. Pending iPhone verification. |
| 2026-04-11 | 1.8 | **ALL PHASES COMPLETE.** Phase 5 verified — MultiChannelDemo timing fix (8s loop delay). Phase 6 verified — annual pricing toggle, Voice AI Chat Widget branding, "Included with Scale" badges, scenario cards on both compare pages. All 8 phases (1, 2, 2.5, 2.5B, 3, 4, 5, 6) confirmed by independent testing. 6 deferred items tracked for next sprint. |
| 2026-04-11 | 1.9 | **Phase 7 — SEO Infrastructure Fixes** added. 6 tasks from full SEO audit: sitemap metadata, industry page schema (8 files), add-ons schema, 404.html, duplicate FAQ schema fix, auto-generated sitemap. All independent — parallel execution. |
| 2026-04-30 | 2.0 | **Trusted AI Upgrade Implementation** task list appended below. Awaiting approval before execution. |
| 2026-05-01 | 2.1 | **Trusted AI Upgrade — frontend execution complete (ND-F5 summary).** Schema + addon registry (ND-1), checkout arithmetic + edge function setup-fee passthrough (ND-3), Step 1 upsell card with auto-select via `?addon=trusted-ai` (ND-4), `/trusted-ai` 10-section landing page with JSON-LD (ND-5), `TrustedAIUpgradeCard` shared component (banner + inline variants) (ND-6), Pricing page AI-tab banner integration (ND-7), inline cards on After-Hours / Front Office / Full AI Employee tier pages (ND-7b), 8 reliability FAQs with Air Canada anchor (ND-8), industry callouts on all 4 industry pages (ND-9), Footer "AI Employee" column link + sitemap.xml entry @ priority 0.8 (ND-10), `/trusted-ai` route registered + prerendered (ND-11), analytics events `trusted_ai_upsell_shown / decision / cta_clicked` wired into checkoutAnalytics (ND-12). **ND-F3 forbidden-phrase grep PASSED:** zero `No-Drift / no-drift / NoDrift` matches in `src/`, `public/`, `scripts/`, `supabase/`. Em dashes in new Trusted AI surfaces appear only in code comments — zero in rendered output (verified per file). **Operator-owned (BLOCKING promotion to production):** ND-2 (GHL custom field, tag, pipeline, workflow configuration) + ND-F1 (operator GHL verification checklist). |

---

# Trusted AI Upgrade Implementation

**Status:** AWAITING APPROVAL — do not execute until explicitly confirmed.
**Spec source:** Claude implementation spec (in-thread, 2026-04-30) + `docs/TRUSTED-AI-ANALYSIS.md`.
**Product:** Trusted AI Upgrade — universal add-on, $147/mo recurring + $497 one-time AI Training & Implementation.
**Slug:** `trusted-ai`. **GHL tag:** `ei: addon - trusted ai`.
**Eligibility:** AI Employee tiers (`web-chat`, `after-hours`, `front-office`, `full-ai`) + Smart Websites `scale`. NOT offered with `launch`, `capture`, `convert`.

## Hard Rules (apply to every task below)

- No "EverIntent provides / offers / helps" phrasing in new copy.
- No em dashes (`—`) in new copy.
- No "won't make mistakes" / "always accurate" / "never wrong" claims.
- Outcome-first, owner-operator vernacular.
- Native `<a>` tags for all internal links to `/trusted-ai` (per SSG routing standard).
- Do NOT modify the load-bearing accuracy FAQs at `src/data/faqs.ts:693, 724, 791` in this build (post-launch copy review).
- Do NOT build a Web Chat Only landing page in this build (separate effort, flagged in analysis).
- HSL design tokens only. No hardcoded colors in any new component.

## Dependency Map (must be respected)

```
ND-1 (schema)  ──▶  ND-3 (checkout arithmetic + edge fn)  ──▶  ND-4 (Step 1 upsell card)
      │                       │
      │                       └──▶  ND-12 (analytics events)
      │
      ├──▶  ND-8 (FAQ content; needs FAQTag + ProductTag enums)
      │
      └──▶  ND-6 (TrustedAIUpgradeCard shared component)  ──▶  ND-7 (Pricing page integration)
                                                       └──▶  AI tier page integration (ND-6 placement)

ND-5 (/trusted-ai page) depends on ND-8 (FAQ filter populates from faqs.ts) and ND-6 (uses TrustedAIUpgradeCard variants).
ND-9 (industry callouts), ND-10 (nav/footer/sitemap), ND-11 (route registration) depend only on ND-5 existing.

ND-2 (GHL configuration) is an EXTERNAL OPERATOR GATE. It does not block frontend work,
but it BLOCKS production promotion. Frontend can complete without it; checkout submission
will fail end-to-end without it.
```

## Tasks

### ND-1 — Schema changes (BLOCKER for ND-3, ND-4, ND-6, ND-8)
**Files:** `src/config/checkoutConfig.ts`, `src/data/faqs.ts`
**Acceptance:**
- `AddonConfig` type gains optional `setupFee?: number` and `setupFeeLabel?: string` fields.
- `AddonSlug` union includes `'trusted-ai'`.
- `ADDON_CONFIG['trusted-ai']` registered with: `monthlyPrice: 147`, `setupFee: 497`, `setupFeeLabel: 'AI Training & Implementation'`, `ghlTag: 'ei: addon - trusted ai'`, `eligibleTiers: ['web-chat','after-hours','front-office','full-ai','scale']`, `recommended: true`, never auto-included.
- `AddonConfig` extended with optional `eligibleTiers?: TierSlug[]` and `recommended?: boolean` (used by ND-4 to gate rendering).
- `FAQTag` union extended with `'trusted-ai'` and `'reliability'`.
- `ProductTag` union extended with `'trusted-ai'`.
- Type-checks pass; no other call sites broken.
**Dependencies:** None. **Must complete first.**

### ND-2 — GHL configuration confirmation (EXTERNAL OPERATOR GATE)
**Owner:** Operator (NOT Lovable). This is a real external dependency, not a Lovable checkbox.
**Acceptance (operator must confirm in writing before production promotion):**
- GHL contact tag `ei: addon - trusted ai` exists.
- $147/mo recurring product line exists in GHL and is mapped to the Trusted AI add-on.
- $497 one-time "AI Training & Implementation" product line exists in GHL.
- Checkout end-to-end test succeeds against staging GHL with Trusted AI selected.
**Gates:** Promotion to production. Frontend build can complete and ship to preview without this; live checkout will fail without it.

### ND-3 — Checkout arithmetic + edge function payload
**Depends on:** ND-1.
**Files:** `src/pages/checkout/CheckoutPage.tsx`, `src/components/checkout/OrderSummary.tsx`, `src/components/checkout/CheckoutStep3Review.tsx`, `supabase/functions/start-checkout/index.ts`
**Acceptance:**
- `setupTotal` includes `tier.setupFee + sum(selectedAddons.filter(a => a.setupFee).map(a => a.setupFee))`.
- `OrderSummary` renders an itemized one-time line for each addon with a setupFee, labeled with `setupFeeLabel` (e.g. "Trusted AI Training & Implementation — $497").
- Step 3 Review breaks out the Trusted AI recurring ($147/mo) and one-time ($497) line items separately, both included in their respective totals.
- Edge function payload extended: each addon entry now includes `setupFee` (when present) and `setupFeeLabel`. `setup_total` arithmetic mirrors the client.
- GHL receives both the recurring tag/product and the one-time line item.
- Verified at 375px viewport.

### ND-4 — Trusted AI checkout upsell card (Step 1)
**Depends on:** ND-1, ND-3, ND-12.
**File:** `src/components/checkout/CheckoutStep1Selection.tsx` (new card component may live alongside)
**Acceptance:**
- Renders ABOVE the standard add-ons grid, only when `selectedTier ∈ {web-chat, after-hours, front-office, full-ai, scale}`.
- Card content matches spec exactly: eyebrow "Recommended Upgrade", headline "Add Trusted AI: the AI that does exactly what you approved" (spec source uses an em dash; rewritten with a colon to comply with the no-em-dash rule), sub "Standard AI is confident but not always correct. Trusted AI is built on a visual canvas, staged, and approved by you before it talks to a customer.", pricing line "+ $147/mo · + $497 one-time AI Training & Implementation", primary CTA "Add to my plan", secondary CTA "Skip, I'll risk it" (spec source uses an em dash; rewritten with a comma), trust micro-copy "You can add this later. Every conversation before then is one you can't take back.", "Learn more" link to `/trusted-ai` (new tab, native `<a>`).
- Visual: distinct from standard add-on grid (gold border, shield icon, "Recommended" badge). HSL tokens only.
- State: not rendered if Trusted AI already in cart; not re-rendered after session decline.
- Fires `trusted_ai_upsell_shown` on first render and `trusted_ai_upsell_decision` on accept/decline (see ND-12).
- Verified at 375px viewport.

### ND-5 — Dedicated `/trusted-ai` page
**Depends on:** ND-6 (uses shared upgrade card), ND-8 (FAQ content), ND-11 (route registration).
**Files:** `src/pages/TrustedAI.tsx`, `src/components/SEO.tsx` (no edit; just consumed)
**Acceptance:** Renders all 10 sections per spec:
1. Hero — Headline "The AI was confident. The AI was wrong. Yours won't be." Sub "Trusted AI does exactly what you approved. Nothing else." Three buyer-type chips (Credibility / Bleeding wound / Burnout per spec verbatim). Primary CTA "Add Trusted AI to my plan".
2. Why standard AI breaks trust — Air Canada lead-in: "A Canadian court ruled an airline was legally liable for the policy its chatbot invented. The legal precedent is clear: your AI's lies are your lies." Then three trust-failure scenarios verbatim from spec ($89/$389 quote, Saturday hours, invented service).
3. How Trusted AI works — Build → Stage → Approve → Ship.
4. Standard AI vs Trusted AI comparison table — columns "Standard AI | Trusted AI". Rows: Where outputs come from, Drift risk, Hallucination possible, Operator control, Update workflow, Compliance posture, Testing before launch, Version control.
5. What you control.
6. What happens when the AI doesn't know.
7. Industries where this matters most.
8. Pricing band — $147/mo + $497 one-time. CTA "Add Trusted AI to my plan".
9. FAQ via `<FAQSection products={['trusted-ai']} objectionsFirst />`.
10. Final CTA.

SEO: title "Trusted AI: The AI That Does Exactly What You Approved | EverIntent", meta description "Standard AI is confident but not always correct. Trusted AI is built on a visual canvas, tested in staging, and approved by you before it ever talks to a customer. $147/mo + $497 setup.", canonical `/trusted-ai`, OG image reusing space template with overlay "AI you can trust.", JSON-LD Product (two Offers: $147 recurring + $497 one-time) + BreadcrumbList. Hero CTA links to `/checkout/full-ai?addon=trusted-ai` via native `<a>`. Verified at 375px.

### ND-6 — Shared `<TrustedAIUpgradeCard />` component
**Depends on:** ND-1.
**File:** `src/components/ai-employee/TrustedAIUpgradeCard.tsx`
**Acceptance:** Single source of truth for the Trusted AI pitch. Props: `tierContext?: TierSlug`, `variant: 'inline' | 'banner'`. Used by ND-7 and AI tier page integration. Contains 3-4 sentence pitch + "Add Trusted AI to my plan" CTA (deep-links to checkout with `?addon=trusted-ai`) + "Learn more" → `/trusted-ai`.

### ND-7 — Pricing page integration
**Depends on:** ND-6.
**File:** `src/pages/Pricing.tsx`
**Acceptance:** On the AI tab, full-width `<TrustedAIUpgradeCard variant="banner" />` rendered BELOW the 4 plan cards. Each AI plan card gains an inline note "+ Add Trusted AI Upgrade · $147/mo" linking to `/trusted-ai`. Card count remains 4 (no 5th card). Verified at 375px.

### ND-7b — AI tier page integration
**Depends on:** ND-6.
**Files:** `src/pages/ai-employee/AfterHours.tsx`, `src/pages/ai-employee/FrontOffice.tsx`, `src/pages/ai-employee/FullAIEmployee.tsx`
**Acceptance:** `<TrustedAIUpgradeCard variant="inline" tierContext={...} />` placed near bottom of each page, before the final CTA section. Web Chat Only tier page intentionally skipped (no landing page exists; flagged in analysis as separate effort). Verified at 375px.

### ND-8 — FAQ content
**Depends on:** ND-1 (FAQTag/ProductTag enums).
**File:** `src/data/faqs.ts`
**Acceptance:** 8 new FAQ entries added per spec verbatim (FAQs 1–8). All carry `category: 'ai-employee'`, `products: ['trusted-ai', ...relevant tier slugs]`, `tags: ['trusted-ai', 'reliability', ...]`. FAQs 1 and 2 marked `isObjection: true, priority: 'high'`. Auto-surfaces on `/trusted-ai` via `<FAQSection products={['trusted-ai']} objectionsFirst />` and on tier pages whose slugs are in `products`.

### ND-9 — Industry showcase callouts
**Depends on:** ND-5 (target route must exist).
**Files:**
- `src/pages/industries/HealthWellness.tsx` + `HealthWellnessShowcase.tsx`
- `src/pages/industries/ProfessionalServices.tsx` + `ProfessionalShowcase.tsx`
- `src/pages/industries/Automotive.tsx` + `AutomotiveShowcase.tsx`
- `src/pages/industries/HomeServices.tsx` + `HomeServicesShowcase.tsx`
**Acceptance:** Each page (full + showcase) gains a "Why Trusted AI matters in [industry]" callout per spec copy. Showcase pages use the condensed variant. All link to `/trusted-ai` via native `<a>`. Home Services uses the lighter dispatch-info framing. Existing accuracy FAQs at `faqs.ts:693,724,791` left untouched. Verified at 375px.

### ND-10 — Navigation, footer, sitemap
**Depends on:** ND-5.
**Files:** `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `scripts/generate-sitemap.ts`, `public/sitemap.xml`
**Acceptance:**
- "Trusted AI" added as the LAST item inside the "Let AI Handle It" header dropdown, with a small "Upgrade" badge. NOT added to the primary nav.
- Footer: "Trusted AI Upgrade" link added under the AI Employee column.
- Sitemap: `/trusted-ai` listed at priority `0.8`, changefreq `monthly`. Confirmed NOT in `EXCLUDED_PREFIXES`.

### ND-11 — Route registration
**Depends on:** ND-5 page exists.
**File:** `src/routes.tsx`
**Acceptance:** `/trusted-ai` registered as a top-level route. SSG prerender verified (HTML contains hero headline + JSON-LD). All internal links to it use native `<a>`, not React Router `<Link>`.

### ND-12 — Analytics events
**Depends on:** ND-1 (slug must exist).
**File:** `src/lib/checkoutAnalytics.ts`
**Acceptance:** Three new exported functions:
- `trackTrustedAIUpsellShown(tier: string)` → `event: 'trusted_ai_upsell_shown'`
- `trackTrustedAIUpsellDecision(tier: string, decision: 'accepted' | 'declined')` → `event: 'trusted_ai_upsell_decision'`
- `trackTrustedAIPageCtaClicked(sourceSection: string)` → `event: 'trusted_ai_page_cta_clicked'`
Wired into ND-4 (shown + decision) and ND-5 page CTAs (page CTA clicked).

## Required Final Tasks (from spec — must appear and be checked off)

### ND-F1 — GHL operator gate confirmed
Operator confirms in writing: `ei: addon - trusted ai` tag exists, $147/mo recurring product configured, $497 one-time product configured. **This gates promotion to production.** Frontend build may ship to preview without it.

### ND-F2 — 375px viewport verification
Every new or modified page (`/trusted-ai`, Pricing, all 3 AI tier pages, all 8 industry pages, checkout Step 1 + Step 3) validated at 375px iPhone viewport before its task is marked complete.

### ND-F3 — Forbidden-phrase grep
Run across all files touched in this build:
- `EverIntent provides`
- `EverIntent offers`
- `EverIntent helps`
- ` — ` (em dash with surrounding spaces) AND bare `—` in any new copy strings
- `won't make mistakes`
- `never wrong`
- `always accurate`
- `No-Drift`, `no-drift`, `NoDrift` (case-insensitive) — straggling references from the prior product name. **Zero matches required across the entire codebase**, not just newly added copy.
**Acceptance:** Zero matches in newly added copy.

### ND-F4 — Reachability audit
Confirm `/trusted-ai` is reachable from: header "Let AI Handle It" dropdown, footer, Pricing page (banner + per-card inline note), all 3 AI tier landing pages (After-Hours, Front Office, Full AI), and all 8 industry pages (4 full + 4 showcase). Sitemap entry present. FAQ count on `/trusted-ai` ≥ 8.

### ND-F5 — Final implementation summary
Produce a summary listing: every file touched, new routes registered, new FAQs by ID, new add-on slug + tag registered, new analytics events. Append to this section as version 2.1.

## Open Risks / Notes

- **Spec copy contains em dashes** in two CTA strings (ND-4). Rewrites noted in the task. Flagging here so reviewers know we are intentionally diverging from the spec text to honor the no-em-dash rule.
- **Web Chat Only tier page** does not exist. ND-7b skips it intentionally. Pricing card and checkout upsell still cover the `web-chat` slug.
- **GHL gate (ND-2 / ND-F1)** is the only thing that can block production. Plan accordingly.
- **Product renamed from "No-Drift AI Upgrade" to "Trusted AI Upgrade"** before execution. All slugs, routes, components, files, analytics events, GHL tag, copy, headlines, FAQs, industry callouts, and SEO metadata in this document reflect the new name. Forbidden-phrase grep (ND-F3) hardened to fail on any straggling "No-Drift" reference. Analysis doc renamed `docs/NO-DRIFT-ANALYSIS.md` → `docs/TRUSTED-AI-ANALYSIS.md`.

