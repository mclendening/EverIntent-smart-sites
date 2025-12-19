# SmartSites Menu & Product Alignment — Proposed Changes

**Date:** December 19, 2025  
**Status:** READY FOR REVIEW  
**Source of Truth:** BRD v32.10 + Market Research

---

## Part 1: Navigation Changes (Minimal)

### Header (`src/components/layout/Header.tsx`)
```
Logo    Services ▼    Industries ▼    Pricing    Portfolio    [Get Started]
```
- ✅ Services dropdown (7 items) — matches BRD
- ✅ Industries dropdown (4 hubs) — matches BRD  
- ✅ Pricing link — matches BRD
- ✅ Get Started CTA
- ⚠️ **Only change:** "Portfolio" → "Our Work"

### Footer (`src/components/layout/Footer.tsx`)

| Services ✅ | Industries ✅ | Resources ✅ | Company ⚠️ |
|-------------|---------------|---------------|-------------|
| Beautiful Websites | Home Services | LocalPros Network | About |
| Get Found Online | Professional Services | Help *(placeholder)* | Contact |
| Never Miss a Lead | Health & Wellness | FAQ *(placeholder)* | Portfolio → **Our Work** |
| Book More Jobs | Automotive Services | Support *(placeholder)* | + **Careers** |
| Run From Your Phone | | | |
| Build Your Reputation | | | |
| Let AI Handle It | | | |
| Pricing | | | |

### Navigation Changes Checklist
- [ ] Header.tsx: "Portfolio" → "Our Work" (desktop + mobile)
- [ ] Footer.tsx: "Portfolio" → "Our Work" in companyLinks
- [ ] Footer.tsx: Add "Careers" link to companyLinks
- [ ] routes.ts: Add `/careers` route

---

## Part 2: Product & Service Structure

### Core Principle: Products Are Primary, Packages Are Bundles

Like the Legal AI site structure:
- **Products/Services** = standalone offerings that exist independently
- **Packages/Tiers** = bundles that combine products at package pricing

This is NOT an "add-on" model. Each service is a full product category.

---

### Product Categories (Each Has Its Own Landing Page)

| Category | URL | Description | Pricing Model |
|----------|-----|-------------|---------------|
| **Web Design** | `/services/web-design` | Custom websites, templates, redesigns | One-time or monthly |
| **SEO** | `/services/seo` | Local SEO, on-page, technical, content | Monthly or sprint |
| **Reputation Management** | `/services/reputation` | Review generation, monitoring, response | Monthly |
| **AI Automation** | `/services/ai-automation` | Chat, voice, scheduling, lead routing | Monthly + usage |
| **Google Ads** | `/services/ads` | PPC setup, management, optimization | Monthly + spend |
| **Content Marketing** | `/services/content` | Blog posts, social, email campaigns | Monthly |

Each page:
- Explains what the service does
- Shows standalone pricing
- Shows which packages include it
- Has its own conversion path

---

### Packages (Bundles of Products)

Packages bundle products together at package pricing:

| Package | Products Included | Price |
|---------|-------------------|-------|
| **Starter Site** (T1) | Web Design (template) | $299 one-time + $149/yr |
| **Lead Booster** (T2) | Web Design + Basic SEO + AI Chat | $199/mo |
| **Booking & Reputation** (T3) | Web Design + SEO + Reputation + Booking | $299/mo |
| **AI Growth** (T4) | All products + AI Voice + Automation | $499/mo |
| **Custom Design** | Custom web design + selected products | $5,000+ or $799/mo |

---

### The Missing Middle: "Smart Launch" Package

**Problem:** Gap between T4 ($499/mo) and Custom ($5k+)

**Smart Launch: $2,500-$4,500 one-time + $297/mo ongoing**

Products included:
- Custom 10-page website (not template)
- Brand photography consultation
- Google Business Profile optimization
- 90-day SEO + Ads sprint
- Ongoing: Booking & Reputation tier features

Captures: "T4 isn't enough but $5k custom seems like overkill" segment.

---

### Standalone Product Pricing

Customers can purchase products individually without a package:

| Product | Standalone Price | Notes |
|---------|------------------|-------|
| SEO Sprint (3-month) | $1,500 one-time | Any customer |
| Google Ads Management | $500/mo + ad spend | Any customer |
| Content Package (4 posts/mo) | $400/mo | Any customer |
| AI Voice Minutes | $0.15/min | Package customers |
| Additional Locations | $97/mo each | Package customers |

This is not "add-on" pricing — these are standalone products that happen to also be included in packages.

---

### Updated Tier Naming

Outcome-oriented names:

| Current | Proposed | Why |
|---------|----------|-----|
| T1 Smart Site | **Starter Site** | Clear entry point |
| T2 Smart Lead | **Lead Booster** | Describes outcome |
| T3 Smart Business | **Booking & Reputation** | Lists key features |
| T4 Smart Growth | **AI Growth** | Emphasizes AI differentiation |

---

### Paid Discovery: SmartStart Strategy Session

**$500-$750**

- 60-min consultation
- Website/marketing audit
- Competitive analysis
- Custom recommendation report
- Credit toward any package purchase

Creates paid qualification step, filters serious buyers, generates revenue from sales process.

---

## Part 3: Services Menu Structure (Header)

Current Services dropdown uses capability/benefit names. Proposed structure adds product-category clarity:

### Option A: Keep Current (Benefit Names)
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

### Option B: Product Categories (Like Legal AI)
```
Services ▼
├── Web Design
├── SEO & Local Search
├── AI Chat & Voice
├── Booking & Scheduling
├── Reputation Management
├── Google Ads
└── All Services →
```

### Option C: Hybrid (Benefit → Product)
```
Services ▼
├── Websites → /services/web-design
├── SEO → /services/seo
├── Lead Capture → /services/ai-automation
├── Booking → /services/booking
├── Reputation → /services/reputation
├── Advertising → /services/ads
└── View All Packages →
```

**Recommendation:** Option C hybrid — short benefit-oriented labels that link to product-category pages.

---

## Part 4: Footer Structure (Complete)

```
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│ Services        │ Industries      │ Resources       │ Company         │
├─────────────────┼─────────────────┼─────────────────┼─────────────────┤
│ Web Design      │ Home Services   │ LocalPros       │ About           │
│ SEO             │ Professional    │ Help            │ Contact         │
│ Reputation      │ Health          │ FAQ             │ Our Work        │
│ AI Automation   │ Automotive      │ Support         │ Careers         │
│ Google Ads      │                 │ Client Login    │ Testimonials    │
│ Pricing         │                 │                 │                 │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘

Legal: Privacy Policy • Cookie Settings • Terms of Service • Data Rights
```

---

## Part 5: Implementation Priority

### Immediate (Nav Only)
- [ ] Rename Portfolio → Our Work (Header + Footer)
- [ ] Add Careers link (Footer)

### Near-Term (Content)
- [ ] Create product-category landing pages (/services/seo, etc.)
- [ ] Update pricing page with benefit-oriented copy
- [ ] Add "Most Popular" badge to Booking & Reputation tier

### Medium-Term (Product)
- [ ] Add Smart Launch package to pricing
- [ ] Build standalone product checkout
- [ ] Update tier names (requires decision)

### Longer-Term
- [ ] SmartStart Strategy Session booking
- [ ] Usage-based billing for AI minutes

---

## NOT Changing

- ❌ Help, FAQ, Support links — placeholders for future content
- ❌ Industries dropdown structure — already correct
- ❌ Legal links — already correct
- ❌ Contact info — already correct
- ❌ Blog — not in GTM, not a priority

---

## Sources

- Legal AI site structure (everintentlegalai.com)
- SmartSites.com service page architecture
- Forrester "State of Business Buying 2024"
- AgencyAnalytics Agency Pricing Report 2025
- BRD v32.10 GTM section
