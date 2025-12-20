# SmartSites Menu & Product Structure — Proposed Changes

**Date:** December 20, 2025  
**Status:** READY FOR REVIEW  
**Source of Truth:** BRD v32.10 + Market Research + Persona Spec

---

## Executive Summary

This proposal aligns menu structure and product packaging with:
1. **How buyers actually search and buy** (persona-spec: Business Owner searches for outcomes)
2. **Product-category framing** (products are primary, packages bundle them — like Legal AI site)
3. **BRD-defined navigation** (Services dropdown, Industries dropdown, existing routes)
4. **Research findings** (missing middle gap, service-specific pages, hybrid revenue model)

---

## Part 1: Navigation Changes

### 1.1 Header Changes

**Current:**
```
Logo    Services ▼    Industries ▼    Pricing    Portfolio    [Get Started]
```

**Proposed:**
```
Logo    Services ▼    Industries ▼    Pricing    Our Work    [Get Started]
```

**Only change:** "Portfolio" → "Our Work"

All other header elements remain per BRD Section 17 (Primary Navigation).

### 1.2 Footer Changes

**Current Footer (from BRD Section 17):**

| Services | Industries | Resources | Company |
|----------|------------|-----------|---------|
| Beautiful Websites | Home Services | Help | About |
| Get Found Online | Professional Services | FAQ | Contact |
| Never Miss a Lead | Health & Wellness | Support | Portfolio |
| Book More Jobs | Automotive Services | | |
| Run From Your Phone | | | |
| Build Your Reputation | | | |
| Let AI Handle It | | | |
| Pricing | | | |

**Proposed Footer:**

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

**Changes:**
- "Portfolio" → "Our Work" in Company column
- Add "Careers" to Company column
- Add "LocalPros Network" to Resources column (was in BRD, missing from current implementation)

### 1.3 Files to Modify

| File | Change |
|------|--------|
| `src/components/layout/Header.tsx` | Rename "Portfolio" label to "Our Work" (desktop + mobile) |
| `src/components/layout/Footer.tsx` | Rename "Portfolio" → "Our Work", add "Careers" link |
| `src/config/routes.ts` | Add `/careers` and `/careers/:slug` routes (per BRD) |

---

## Part 2: Product & Package Structure

### 2.1 Core Principle: Products Are Primary, Packages Are Bundles

Following the Legal AI site model:
- **Products** = standalone services that exist independently with their own value proposition
- **Packages** = bundles that combine products at package pricing

This is NOT an "add-on" model. Each service is a legitimate product category that buyers search for.

### 2.2 Product Categories

Based on how the target personas (persona-spec) actually search and buy:

| Product | URL | Buyer Search Intent | Standalone Pricing |
|---------|-----|---------------------|-------------------|
| **Web Design** | `/beautiful-websites` | "I need a website" | $249-$5,000+ |
| **Local SEO** | `/get-found-online` | "I need to rank on Google" | $500/mo or $1,500 sprint |
| **Lead Capture** | `/never-miss-a-lead` | "I'm missing calls" | $97/mo base |
| **Online Booking** | `/book-more-jobs` | "I need online scheduling" | $100/mo standalone |
| **Reputation Management** | `/build-your-reputation` | "I need more reviews" | $100/mo standalone |
| **AI Automation** | `/let-ai-handle-it` | "I want AI to help" | $200-$500/mo |
| **Mobile Access** | `/run-from-your-phone` | "I need to work from my phone" | Included in T2+ |

Each product page should:
- Explain what the product does (outcome-focused)
- Show standalone pricing
- Show which packages include this product
- Have its own conversion path

### 2.3 Packages (Bundles of Products)

Packages are how most buyers will purchase, but they're framed as bundles of the above products:

| Package | Price | Products Included |
|---------|-------|-------------------|
| **Smart Site** (T1) | $249 one-time + $149/yr | Web Design (template) |
| **Smart Lead** (T2) | $97/mo | Web Design + Lead Capture + Mobile Access |
| **Smart Business** (T3) | $197/mo | Web Design + Lead Capture + Online Booking + Reputation + Mobile Access |
| **Smart Growth** (T4) | $497/mo | All products including AI Automation |
| **Custom** | $5,000+ | Custom web design + selected products |

### 2.4 The Missing Middle: Smart Launch

**Gap identified:** Between T4 ($497/mo) and Custom ($5k+), there's no clear option for buyers who need more than a template but don't need full custom.

**Smart Launch Package: $2,500-$4,500 one-time + $297/mo ongoing**

Products included:
- Custom 10-page website (not template)
- Brand photography consultation
- Google Business Profile optimization
- 90-day SEO + Marketing sprint
- Ongoing: Smart Business (T3) tier features

**Target persona:** Business Owner who says "T4 isn't enough but $5k custom seems like overkill"

### 2.5 Standalone Product Purchases

Buyers can purchase individual products outside of packages:

| Product | Price | Who Buys This |
|---------|-------|---------------|
| SEO Sprint (3-month) | $1,500 | Business with existing site |
| Google Ads Setup + Management | $500/mo + spend | Business wanting paid traffic |
| Content Package (4 posts/mo) | $400/mo | Business needing content |
| AI Voice Agent Minutes | $0.15/min | T4 customer needing more |
| Additional Location | $97/mo | Multi-location business |

**Important:** These are standalone products, not "add-ons." A business owner searching for "SEO services" can purchase SEO without buying a package.

### 2.6 Paid Discovery: SmartStart Strategy Session

**$500-$750**

- 60-min consultation
- Website/marketing audit
- Competitive analysis
- Custom recommendation report
- Credit toward any package purchase

**Why this matters (from research):**
- Filters serious buyers from tire-kickers
- Generates revenue from the sales process
- Creates natural upsell opportunity
- Traditional agencies use this model successfully

---

## Part 3: Services Menu Options

### Current Implementation (BRD Section 17)

```
Services ▼
├── Beautiful Websites
├── Get Found Online
├── Never Miss a Lead
├── Book More Jobs
├── Run From Your Phone
├── Build Your Reputation
└── Let AI Handle It
```

This uses **outcome/benefit framing** which is correct for the target personas. The BRD explicitly defines these as the Services dropdown items.

### Option A: Keep Current (Recommended)

Keep the current Services dropdown structure. The benefit-oriented names align with how buyers search:
- "I need a website" → Beautiful Websites
- "I need SEO" → Get Found Online
- "I'm missing leads" → Never Miss a Lead

This matches persona-spec buyer behavior where they buy outcomes, not features.

### Option B: Hybrid with Product Categories

If we want to add product-category clarity while keeping benefit orientation:

```
Services ▼
├── Websites → /beautiful-websites
├── SEO & Local Search → /get-found-online
├── Lead Capture → /never-miss-a-lead
├── Booking & Scheduling → /book-more-jobs
├── Mobile App → /run-from-your-phone
├── Reputation → /build-your-reputation
├── AI Automation → /let-ai-handle-it
└── View Packages → /pricing
```

**Trade-off:** More explicit product naming, but loses some of the benefit framing.

### Recommendation

**Keep Option A** (current BRD structure). The benefit names work well for the target personas. Instead of changing the menu, create product-category landing pages (`/services/seo`, `/services/web-design`) that can be linked from footer, blog content, and ad campaigns — but don't clutter the main nav.

---

## Part 4: Footer Structure (Complete Specification)

### Desktop Layout (4 columns)

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Services        │ Industries      │ Resources       │ Company         │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Beautiful Webs. │ Home Services   │ LocalPros       │ About           │
│ Get Found Online│ Professional    │ Help            │ Contact         │
│ Never Miss Lead │ Health/Wellness │ FAQ             │ Our Work        │
│ Book More Jobs  │ Automotive      │ Support         │ Careers         │
│ Run From Phone  │                 │                 │                 │
│ Build Reputation│                 │                 │                 │
│ Let AI Handle It│                 │                 │                 │
│ Pricing         │                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘

Legal: Privacy Policy • Cookie Preferences • Terms of Service • Data Rights
© 2025 SmartSites by EverIntent LLC. All rights reserved.
```

### Changes from Current

| Item | Current | Proposed |
|------|---------|----------|
| Company → Portfolio | "Portfolio" | "Our Work" |
| Company → New | — | "Careers" |
| Resources → LocalPros | Missing | Add "LocalPros Network" |

---

## Part 5: Implementation Priority

### Immediate (Navigation Only)

- [ ] Rename Portfolio → Our Work (Header.tsx + Footer.tsx)
- [ ] Add Careers link (Footer.tsx)
- [ ] Add LocalPros link to Resources (Footer.tsx)
- [ ] Add /careers route (routes.ts)

### Near-Term (Product Pages)

- [ ] Create product-category landing pages (/services/seo, /services/web-design, /services/reputation)
- [ ] These pages explain standalone pricing + which packages include the product
- [ ] Update pricing page with "Most Popular" badge on T3

### Medium-Term (New Packages)

- [ ] Add Smart Launch package to pricing page
- [ ] Add SmartStart Strategy Session to pricing page
- [ ] Build standalone product checkout capability

### Longer-Term

- [ ] Usage-based billing for AI minutes beyond included
- [ ] Multi-location pricing calculator

---

## Part 6: NOT Changing

These items remain as-is per BRD:

- ❌ Services dropdown structure — already correct (7 items per BRD Section 17)
- ❌ Industries dropdown structure — already correct (4 hubs)
- ❌ Legal links — already defined in BRD
- ❌ Help, FAQ, Support links — placeholders for future content, not broken links
- ❌ Get Started CTA → /pricing — per BRD Section 17

---

## Part 7: Persona Alignment

From persona-spec, key buyer behaviors:

### Anonymous Visitor → Prospect Journey

1. **Entry:** Marketing site via ad/organic
2. **Browse:** Services pages (outcome-focused), Industries pages (validation), Pricing (comparison)
3. **Consideration:** Our Work (social proof), Testimonials
4. **Action:** Get Started → /pricing → /checkout/{tier}

The proposed menu changes support this journey:
- "Our Work" is more inviting than "Portfolio" (action vs. gallery)
- Careers shows the company is growing (trust signal)
- LocalPros shows additional revenue path (for partners browsing)

### LocalPros Partner Journey

1. **Entry:** /localpros or /localpros/apply
2. **Browse:** Learn about lead-buying model
3. **Action:** Apply to become partner

Footer link to LocalPros Network supports this discovery path.

---

## Sources

- BRD v32.10 (Navigation Section 17, Sitemap Section 16)
- Persona Spec (External personas 1-12)
- Legal AI site structure (everintentlegalai.com)
- Research alignment document (missing middle, service pages, hybrid model)
- SmartSites.com competitor analysis
