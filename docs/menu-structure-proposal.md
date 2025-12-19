# SmartSites Menu Structure Proposal

## Current State Analysis

### SmartSites Current Menu
```
Services ▼                    Industries ▼           Pricing    Portfolio
├─ Beautiful Websites         ├─ Home Services
├─ Get Found Online          ├─ Professional Services
├─ Never Miss a Lead         ├─ Health & Wellness
├─ Book More Jobs            └─ Automotive Services
├─ Run From Your Phone
├─ Build Your Reputation
└─ Let AI Handle It
```

**Problem**: Menu leads with *outcomes/benefits* rather than *what buyers purchase*. Research shows B2B buyers want to see products/packages first, then understand benefits within those pages.

---

### EverIntent Legal AI Menu (Reference)
```
Product ▼                     Practice Areas ▼       Resources ▼    Company ▼    AI Legal Guides ▼
├─ Client Intake & CRM        ├─ Family Law          ├─ Blog        ├─ About
├─ Marketing & Nurture        ├─ Personal Injury     ├─ Case Studies├─ Careers
├─ InfoTrust AI Workspace     ├─ Criminal Defense    ├─ Webinars    └─ Contact
└─ Complete Bundles           └─ Estate Planning     └─ Help Center
```

**Key Insight**: Legal AI leads with *products* (what you buy), then *verticals* (who it's for). Benefits are explained on product pages, not in nav.

---

## Proposed Options

### Option A: Product-Centric (Recommended)
*Mirrors Legal AI structure - leads with purchasable packages*

```
Products ▼                    Industries ▼           Company ▼       [Get Started]
├─ SmartSite Starter         ├─ Home Services        ├─ About
│   $297/mo                  ├─ Professional Svcs    ├─ Portfolio
├─ SmartSite Pro             ├─ Health & Wellness    ├─ Careers
│   $497/mo                  └─ Automotive           └─ Contact
├─ SmartSite Custom
│   $2,500-$4,500 + $297/mo
├─ Add-On Services
│   SEO, Ads, Content
└─ Compare Plans
```

**Pros**:
- Clear what buyer is purchasing
- Aligns with how SaaS/agencies sell
- Pricing visible in dropdown (conversion boost)
- Allows premium tier visibility

**Cons**:
- Loses benefit-focused messaging in nav
- Requires creating tier-specific landing pages

---

### Option B: Hybrid - Products + Solutions
*Keep outcome messaging but add product clarity*

```
Products ▼                    Solutions ▼            Industries ▼    Pricing    [Get Started]
├─ SmartSite Starter         ├─ Websites             ├─ Home Services
├─ SmartSite Pro             ├─ Local SEO            ├─ Professional
├─ SmartSite Custom          ├─ Lead Capture         ├─ Health & Wellness
└─ Add-Ons                   ├─ Booking & CRM        └─ Automotive
                             ├─ Reviews & Reputation
                             └─ AI Automation
```

**Pros**:
- Best of both worlds
- Outcome pages for SEO/content
- Product pages for conversions

**Cons**:
- Two dropdowns covering related content
- May confuse: "Do I need Products or Solutions?"

---

### Option C: Solutions-First with Embedded Tiers
*Keep current structure but surface packages better*

```
Solutions ▼                   Industries ▼           Pricing    About    [Get Started]
├─ Complete Packages ──────►  Starter / Pro / Custom comparison
├─ Beautiful Websites
├─ Get Found Online (SEO)
├─ Lead Capture & Follow-up
├─ Online Booking
├─ Reviews & Reputation
└─ AI Automation
```

**Pros**:
- Minimal change from current
- "Complete Packages" at top for buyers ready to purchase
- Keeps benefit-focused navigation

**Cons**:
- Packages buried under "Solutions" dropdown
- Not as clear as product-first approach

---

## Product/Package Landing Pages Needed

Regardless of menu choice, these pages should exist:

| Page | Path | Purpose |
|------|------|---------|
| SmartSite Starter | `/packages/starter` | Entry tier - $297/mo |
| SmartSite Pro | `/packages/pro` | Growth tier - $497/mo |
| SmartSite Custom | `/packages/custom` | Bridge tier - $2,500-4,500 + ongoing |
| Compare Plans | `/pricing` or `/compare` | Side-by-side comparison |
| Add-On Services | `/services/add-ons` | À la carte extras |

---

## Industry Page Consideration

Current: Generic industry pages without specific packages.

**Recommendation**: Each industry page should:
1. Show the most popular package for that industry
2. Include industry-specific case study/testimonial
3. List common integrations (e.g., ServiceTitan for Home Services)

Example: `/industries/home-services` → Highlights SmartSite Pro as "Most Popular for HVAC, Plumbing, Electrical"

---

## Mobile Menu Considerations

Mobile menu should:
1. Lead with **Products/Packages** (if Option A/B)
2. Show pricing hints inline (e.g., "SmartSite Pro - $497/mo")
3. Collapse Industries under secondary accordion
4. Prominent CTA: "Get Started" or "See Pricing"

---

## Recommendation Summary

| Criteria | Option A | Option B | Option C |
|----------|----------|----------|----------|
| Clarity for buyers | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| SEO content potential | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Implementation effort | Medium | High | Low |
| Aligns with Legal AI | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Conversion focus | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |

**Recommended**: **Option A (Product-Centric)** for high-converting site with clear purchase path.

**Alternative**: **Option B** if SEO/content marketing is a priority and you want outcome-focused pages for organic traffic.

---

## Next Steps

1. **Decide on menu structure** (A, B, or C)
2. **Create package landing pages** (`/packages/starter`, `/pro`, `/custom`)
3. **Update Header.tsx** with new navigation structure
4. **Update routes.tsx** with new page routes
5. **Build pricing comparison component** for `/pricing` page

---

## Questions to Answer

- [ ] Should "Pricing" be a separate nav item or fold into Products dropdown?
- [ ] Do we need a "Resources" or "Company" dropdown?
- [ ] Should industry pages show recommended tier inline?
- [ ] Add-ons: separate page or section within pricing?
