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

## Part 2: Product Packaging Alignment

### The Missing Middle Problem

Current structure has a revenue gap:

| Current | Price | Issue |
|---------|-------|-------|
| T1 Smart Site | $249 one-time | Loss-leader |
| T2-T4 | $97-$497/mo | MRR upsell |
| Custom | $5,000+ | Too big a jump |

**Gap:** No bridge between T4 ($497/mo) and Custom ($5k+). Customers who need more than T4 but less than full custom fall through.

### Proposed: "Smart Launch" Bridge Package

**$2,500-$4,500 one-time + $297/mo ongoing**

- 10-page custom-designed website (not template)
- Brand photography consultation
- Google Business Profile optimization
- 90-day marketing sprint (SEO + ads setup)
- Includes T3 features ongoing

This captures the "$5k seems too much but T4 isn't enough" segment.

---

### Service-Category Landing Pages

Current services are **capabilities**, not **service offerings**. When a business owner searches "I need SEO," they expect an SEO service page.

**Proposed additions:**

| Service Page | URL | Ties to |
|--------------|-----|---------|
| Web Design | `/services/web-design` | T1-T4 + Custom |
| SEO | `/services/seo` | T3+ |
| Reputation Management | `/services/reputation` | T3+ |
| AI Automation | `/services/ai-automation` | T4 |
| PPC/Ads Management | `/services/ads` | Add-on |

These pages funnel to tiers but match how buyers search.

---

### À la Carte Add-Ons

Create add-on services available to any tier (not just tier upgrades):

| Add-On | Price | Availability |
|--------|-------|--------------|
| SEO Sprint (3-month) | $1,500 one-time | Any tier |
| Google Ads Management | $500/mo + ad spend | T2+ |
| Content Package (4 posts/mo) | $400/mo | Any tier |
| Additional AI Voice Minutes | $0.15/min | T4 only |
| Additional Locations | $97/mo each | T2+ |

This increases revenue without forcing tier upgrades.

---

### Updated Tier Naming (ChatGPT Research)

Research suggests clearer benefit-oriented tier names:

| Current Name | Proposed Name | Price |
|--------------|---------------|-------|
| T1 Smart Site | **Starter Site** | $299 one-time + $149/yr |
| T2 Smart Lead | **Lead Booster** | $199/mo |
| T3 Smart Business | **Booking & Reputation** | $299/mo |
| T4 Smart Growth | **AI Growth** | $499/mo |
| Custom | **Custom Design** | $5,000+ or $799/mo (12mo) |

**Rationale:** Names describe the *outcome*, not just a tier number. "Lead Booster" tells you what it does; "Smart Lead" doesn't.

---

### Pricing Page Enhancements

1. **Benefit-oriented bullets** — Instead of "AI chat widget," say "Convert visitors into qualified leads with AI chat"
2. **"Most Popular" badge** — On Booking & Reputation tier (middle anchor)
3. **Upsell prompts** — "Need online booking? Upgrade to Booking & Reputation"
4. **Add-ons section** — Below tiers, show à la carte options
5. **Custom CTA** — "Need something unique? Custom builds start at $5k"

---

### Paid Discovery Offering

**"SmartStart Strategy Session": $500-$750**

- 60-min consultation
- Website/marketing audit  
- Competitive analysis
- Custom recommendation report
- Credit toward any package purchase

This creates a paid qualification step that:
- Filters serious buyers from tire-kickers
- Generates revenue from the sales process
- Provides natural upsell opportunity

---

## Part 3: What This Captures (vs. Current)

| Current Model | Revenue Events |
|---------------|----------------|
| T1 → T2 upgrade | 2 events |
| T1 → Custom | 2 events |

| Proposed Model | Revenue Events |
|----------------|----------------|
| Discovery → Smart Launch → T3 + Add-ons | 4+ events |
| T1 → Add-on services → Usage | 3+ events |

**Conservative estimate:** 30-50% increase in average customer LTV.

---

## Part 4: Implementation Priority

### Immediate (Nav Only)
- [ ] Rename Portfolio → Our Work (Header + Footer)
- [ ] Add Careers link (Footer)

### Near-Term (Content)
- [ ] Create service-specific landing pages
- [ ] Update pricing page with benefit-oriented copy
- [ ] Add "Most Popular" badge to T3

### Medium-Term (Product)
- [ ] Add Smart Launch bridge package to pricing
- [ ] Build add-on checkout flow
- [ ] Update tier names (requires BRD decision)

### Longer-Term
- [ ] SmartStart Strategy Session booking + credit system
- [ ] Usage-based billing for add-ons

---

## NOT Changing

- ❌ Help, FAQ, Support links — placeholders for future content
- ❌ Services dropdown structure — already correct
- ❌ Industries dropdown structure — already correct
- ❌ Legal links — already correct
- ❌ Contact info — already correct
- ❌ Blog — not in GTM, not a priority

---

## Sources

- Forrester "State of Business Buying 2024"
- AgencyAnalytics Agency Pricing Report 2025
- GoHighLevel SaaS Pricing Strategies
- WebFX Web Design Pricing Packages
- ChatGPT BRD Refinement Analysis
