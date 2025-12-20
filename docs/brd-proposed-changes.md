# SmartSites BRD v32.10 — Proposed Changes

**Date:** December 20, 2025  
**Status:** PROPOSED (requires approval before implementation)  
**Source:** Menu Structure Proposal + Research Alignment

---

## Summary of Changes

Based on market research and persona analysis, the following BRD sections require updates to align with product-first positioning and capture missing revenue opportunities.

---

## Section 6: Tier Definitions

### Current State
Four tiers: T1-T4 with fixed feature bundling.

### Proposed Changes

**6.1 Add Smart Launch Package**

Insert after T4 and before Custom:

```markdown
### Smart Launch ($2,500-$4,500 one-time + $297/month)

**Who it's for:** Businesses that need more than a template but aren't ready for full custom.

**Includes:**
- Custom 10-page website (not template)
- Brand photography consultation
- Google Business Profile optimization
- 90-day marketing sprint (SEO + Google Ads setup)
- All T3 (Booking & Reputation) features ongoing

**Target:** Business owners who say "T4 isn't enough but $5k custom is overkill"
```

**6.2 Consider Updated Tier Naming**

| Current | Consideration | Rationale |
|---------|---------------|-----------|
| Smart Site (T1) | Starter Site | Clear entry point |
| Smart Lead (T2) | Lead Booster | Outcome-focused |
| Smart Business (T3) | Booking & Reputation | Features named |
| Smart Growth (T4) | AI Growth | AI differentiation |

**Decision required:** Keep current names or adopt outcome-oriented names.

---

## Section 7: Complete Feature Matrix

### Proposed Change

Add Smart Launch column:

| Feature | T1 | T2 | T3 | T4 | Smart Launch |
|---------|:--:|:--:|:--:|:--:|:--:|
| Professional Website | ✓ | ✓ | ✓ | ✓ | Custom 10-page |
| Mobile Responsive | ✓ | ✓ | ✓ | ✓ | ✓ |
| SSL Certificate | ✓ | ✓ | ✓ | ✓ | ✓ |
| Basic SEO | ✓ | ✓ | ✓ | ✓ | 90-day sprint |
| ... | ... | ... | ... | ... | ... |
| Monthly Price | — | $97 | $197 | $497 | $297 |
| One-time Price | $249 | — | — | — | $2,500-$4,500 |

---

## Section 9: Customer Journey

### Proposed Change

Add discovery/strategy session path:

```markdown
### Entry Points (Updated)

┌─────────────────────────────────────┐
│ EverIntentSmartSites.com            │
│                                     │
│ Ready to start?     Not sure yet?   │
│  [Get Started]    [Strategy Session]│
└─────────────────────────────────────┘

**Path A: Ready to Buy** → Checkout flow (existing)
**Path B: Need Help** → GHL calendar booking (existing)
**Path C: Want Clarity** → SmartStart Strategy Session ($500-$750)
```

**Add SmartStart Strategy Session specification:**

```markdown
### SmartStart Strategy Session ($500-$750)

**Route:** `/strategy-session` or `/book-strategy`
**Booking:** GHL calendar (60-min slot)

**Deliverables:**
1. 60-minute consultation call
2. Website/marketing audit
3. Competitive analysis
4. Custom recommendation report
5. Full credit toward any package purchase

**Post-session flow:**
- If they buy: Credit applied to package
- If they don't: They keep the report (value delivered)

**Why this exists:**
- Filters serious buyers from tire-kickers
- Generates revenue from sales process
- Provides natural upsell opportunity
```

---

## Section 10: Checkout & Billing Architecture

### Proposed Changes

**10.1 Add Standalone Product Checkout**

```markdown
### Standalone Product Purchases

Customers can purchase individual products without a package subscription:

| Product | Price | Checkout Route |
|---------|-------|----------------|
| SEO Sprint (3-month) | $1,500 | `/checkout/seo-sprint` |
| Google Ads Management | $500/mo + spend | `/checkout/ads-management` |
| Content Package | $400/mo | `/checkout/content-package` |

**GHL Configuration:**
- Create separate products in Stripe
- Create checkout pages in GHL for each
- Tag contacts with purchased products
```

**10.2 Add Smart Launch Checkout**

```markdown
### Smart Launch Checkout

**Route:** `/checkout/smart-launch`
**Pricing:** $2,500-$4,500 one-time + $297/mo

**Checkout structure:**
1. Pre-checkout form (marketing site)
2. Deposit payment ($1,500) via GHL
3. Discovery call scheduled
4. Balance due before build starts
5. Monthly subscription ($297) starts at launch

**Stripe products:**
- smart-launch-deposit: $1,500 one-time
- smart-launch-balance: $1,000-$3,000 one-time (variable)
- smart-launch-monthly: $297/mo recurring
```

---

## Section 16: Sitemap

### Proposed Changes

**16.1 Add Product-Category Landing Pages**

Insert into sitemap:

```markdown
├── /services/                  # Services hub (existing)
│   ├── /web-design/            # NEW: Product category page
│   ├── /seo/                   # NEW: Product category page
│   ├── /reputation/            # NEW: Product category page
│   ├── /ai-automation/         # NEW: Product category page
│   └── /booking/               # NEW: Product category page
```

**Note:** These are optional SEO pages for buyers who search "SEO services" directly. Main Services dropdown continues to use benefit-oriented routes (`/get-found-online`, etc.).

**16.2 Add Strategy Session Route**

```markdown
├── /strategy-session/          # NEW: SmartStart booking
```

**16.3 Add Careers Routes**

```markdown
├── /careers/                   # Careers listing
│   └── /:slug/                 # Individual job posting
```

---

## Section 17: Navigation Structure

### Proposed Changes

**17.1 Header Navigation**

```markdown
### Primary Navigation (Desktop)

[Logo] | Services ▼ | Industries ▼ | Pricing | Our Work | About | [Get Started]
```

**Change:** "Portfolio" → "Our Work"

**17.2 Footer Navigation**

```markdown
### Footer Navigation

| Services | Industries | Resources | Company |
|----------|------------|-----------|---------|
| Beautiful Websites | Home Services | LocalPros Network | About |
| Get Found Online | Professional Services | Help | Contact |
| Never Miss a Lead | Health & Wellness | FAQ | **Our Work** |
| Book More Jobs | Automotive Services | Support | **Careers** |
| Run From Your Phone | | | |
| Build Your Reputation | | | |
| Let AI Handle It | | | |
| Pricing | | | |
```

**Changes:**
- "Portfolio" → "Our Work"
- Add "Careers" to Company column
- Add "LocalPros Network" to Resources column

---

## Section 19: Go-To-Market Strategy

### Proposed Changes

**19.1 Add Smart Launch Positioning**

```markdown
### Product Positioning by Segment

| Segment | Pain Point | Product | Entry Price |
|---------|------------|---------|-------------|
| Budget-conscious | "I just need a website" | Starter Site (T1) | $249 |
| Lead-focused | "I'm missing calls" | Lead Booster (T2) | $97/mo |
| Operations-focused | "My schedule is chaos" | Booking & Reputation (T3) | $197/mo |
| Growth-focused | "I want AI to help" | AI Growth (T4) | $497/mo |
| **Premium DIY** | "I need more than template" | **Smart Launch** | **$2,500+** |
| Bespoke | "I want fully custom" | Custom Design | $5,000+ |
```

**19.2 Add Standalone Product Campaigns**

```markdown
### Campaign Matrix (Updated)

| Campaign | Product | Target | Entry Point |
|----------|---------|--------|-------------|
| "Get Found" | SEO Sprint | Existing site owners | `/services/seo` |
| "More Reviews" | Reputation Management | T1 customers | `/services/reputation` |
| "AI Reception" | AI Automation | T3 customers | `/services/ai-automation` |
```

---

## Implementation Priority

### Phase 1: Navigation (Immediate)
- [ ] Update Header: Portfolio → Our Work
- [ ] Update Footer: Portfolio → Our Work, add Careers, add LocalPros
- [ ] Add /careers route

### Phase 2: Content (Near-term)
- [ ] Create product-category landing pages
- [ ] Update pricing page with Smart Launch
- [ ] Add SmartStart Strategy Session page

### Phase 3: Checkout (Medium-term)
- [ ] Build standalone product checkout flows
- [ ] Build Smart Launch checkout flow
- [ ] Build Strategy Session booking flow

### Phase 4: Billing (Longer-term)
- [ ] Configure Stripe products for standalone offerings
- [ ] Configure GHL checkouts for new products
- [ ] Set up usage-based billing for AI overages

---

## Decision Points

Before implementing, the following decisions are needed:

1. **Tier naming:** Keep "Smart Site/Lead/Business/Growth" or adopt "Starter Site/Lead Booster/Booking & Reputation/AI Growth"?

2. **Smart Launch pricing:** Fixed price ($3,000) or range ($2,500-$4,500 based on scope)?

3. **SmartStart credit:** Full credit toward any package, or partial credit?

4. **Standalone product availability:** Available to anyone, or only existing customers?

5. **Product-category pages:** Build now (SEO benefit) or defer until content is ready?

---

## Files Affected

| File | Change Type |
|------|-------------|
| `src/components/layout/Header.tsx` | Rename Portfolio → Our Work |
| `src/components/layout/Footer.tsx` | Rename + add links |
| `src/config/routes.ts` | Add new routes |
| `src/pages/Careers.tsx` | New page |
| `src/pages/StrategySession.tsx` | New page |
| `src/pages/services/*.tsx` | New product-category pages |
| `docs/smartsites-brd-v32.2.md` | Update per above |
