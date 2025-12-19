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

## Full Tier Structure (From Research)

Per docs/research-alignment.md, the current and proposed tiers are:

| Tier | Price | Model | Role |
|------|-------|-------|------|
| **T1 Smart Site** | $249 one-time | Loss-leader | Entry point, hooks customers |
| **T2** | $97/mo | MRR | Basic subscription |
| **T3** | ~$197-297/mo | MRR | Growth tier |
| **T4** | $497/mo | MRR | Full-featured |
| **Smart Launch** (NEW) | $2,500-4,500 + $297/mo | Hybrid | Bridge between T4 and Custom |
| **Custom** | $5,000+ | Project | Bespoke agency work |

**Add-Ons** (à la carte, any tier):
- SEO Sprint (3-month): $1,500 one-time
- Google Ads Management: $500/mo + ad spend
- Content Package: $400/mo
- Additional AI Voice Minutes: $0.15/min (T4 only)
- Additional Locations: $97/mo each

**Discovery Offering**:
- SmartStart Strategy Session: $500-750 (credit toward package)

---

## Proposed Options

### Option A: Product-Centric (Recommended)
*Mirrors Legal AI structure - leads with purchasable packages*

```
Products ▼                    Industries ▼           Company ▼       [Get Started]
├─ Smart Site (T1)           ├─ Home Services        ├─ About
│   $249 one-time            ├─ Professional Svcs    ├─ Portfolio
├─ Growth Plans              ├─ Health & Wellness    ├─ Careers
│   ├─ Starter (T2) $97/mo   └─ Automotive           └─ Contact
│   ├─ Pro (T3) $297/mo
│   └─ Premium (T4) $497/mo
├─ Smart Launch
│   $2,500-4,500 + ongoing
├─ Custom Design
│   From $5,000
├─ Add-On Services
│   SEO, Ads, Content, AI
└─ Compare All Plans
```

**Pros**:
- Shows full product ladder from T1 → Custom
- Loss-leader T1 visible as entry point
- Growth Plans grouped logically
- Smart Launch bridge tier prominent
- Add-ons visible for expansion revenue

**Cons**:
- Nested dropdown (Growth Plans) may need submenu UI
- Requires 6+ landing pages

---

### Option B: Hybrid - Products + Solutions
*Keep outcome messaging but add product clarity*

```
Products ▼                    Solutions ▼            Industries ▼    Pricing    [Get Started]
├─ Smart Site ($249)         ├─ Websites             ├─ Home Services
├─ Monthly Plans ►           ├─ Local SEO            ├─ Professional
│   T2/T3/T4                 ├─ Lead Capture         ├─ Health & Wellness
├─ Smart Launch              ├─ Booking & CRM        └─ Automotive
├─ Custom Design             ├─ Reviews & Reputation
└─ Add-Ons                   └─ AI Automation
```

**Pros**:
- Entry-point T1 visible immediately
- Solutions pages for SEO traffic
- Clear upgrade path visible

**Cons**:
- Two dropdowns covering related content
- May confuse: "Do I need Products or Solutions?"

---

### Option C: Solutions-First with Embedded Tiers
*Keep current structure but surface packages better*

```
Solutions ▼                   Industries ▼           Pricing    About    [Get Started]
├─ All Packages ──────────►  T1 / T2 / T3 / T4 / Smart Launch / Custom comparison
├─ Beautiful Websites
├─ Get Found Online (SEO)
├─ Lead Capture & Follow-up
├─ Online Booking
├─ Reviews & Reputation
└─ AI Automation
```

**Pros**:
- Minimal change from current
- "All Packages" at top for buyers ready to purchase
- Keeps benefit-focused navigation

**Cons**:
- Full tier structure only visible on Pricing page
- T1 loss-leader not prominent in nav

---

## Product/Package Landing Pages Needed

Full page structure reflecting all tiers and research recommendations:

| Page | Path | Purpose |
|------|------|---------|
| Smart Site (T1) | `/packages/smart-site` | Loss-leader entry - $249 one-time |
| Starter (T2) | `/packages/starter` | Basic MRR - $97/mo |
| Pro (T3) | `/packages/pro` | Growth tier - $297/mo |
| Premium (T4) | `/packages/premium` | Full-featured - $497/mo |
| Smart Launch | `/packages/smart-launch` | Bridge tier - $2,500-4,500 + $297/mo |
| Custom Design | `/packages/custom` | Bespoke - $5,000+ |
| Compare All Plans | `/pricing` | Side-by-side comparison of all 6 tiers |
| Add-On Services | `/services/add-ons` | À la carte: SEO, Ads, Content, AI |
| Strategy Session | `/services/strategy` | SmartStart $500-750 discovery |

### Service-Specific Pages (for SEO)
Per research recommendation #2:

| Page | Path | Ties To |
|------|------|---------|
| SEO Services | `/services/seo` | T3+, SEO Sprint add-on |
| Web Design | `/services/web-design` | T1-T4 + Custom |
| Reputation Management | `/services/reputation` | T3+ |
| AI Automation | `/services/ai-automation` | T4 |

---

## Industry Page Consideration

Current: Generic industry pages without specific packages.

**Recommendation**: Each industry page should:
1. Show the most popular tier for that industry (e.g., T3 Pro for HVAC)
2. Include industry-specific case study/testimonial
3. List common integrations (e.g., ServiceTitan for Home Services)
4. Show relevant add-ons (e.g., Google Ads for competitive markets)

Example: `/industries/home-services` → Highlights Pro (T3) as "Most Popular for HVAC, Plumbing, Electrical" with SEO Sprint add-on recommendation

---

## Mobile Menu Considerations

Mobile menu should:
1. Lead with **Products/Packages** (if Option A/B)
2. Show T1 Smart Site prominently as entry point ($249)
3. Group T2-T4 as "Monthly Plans" with price hints
4. Show Smart Launch as premium bridge option
5. Collapse Industries under secondary accordion
6. Prominent CTA: "Get Started" or "See Pricing"

---

## Recommendation Summary

| Criteria | Option A | Option B | Option C |
|----------|----------|----------|----------|
| Shows full T1-T4 + Smart Launch + Custom | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| T1 loss-leader visibility | ⭐⭐⭐ | ⭐⭐⭐ | ⭐ |
| Add-on upsell visibility | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| SEO content potential | ⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| Implementation effort | High | Higher | Low |
| Aligns with Legal AI pattern | ⭐⭐⭐ | ⭐⭐ | ⭐ |
| Conversion focus | ⭐⭐⭐ | ⭐⭐ | ⭐⭐ |

**Recommended**: **Option A (Product-Centric)** for high-converting site with clear purchase path showing full tier ladder.

**Alternative**: **Option B** if SEO/content marketing is a priority and you want outcome-focused pages for organic traffic.

---

## Next Steps

1. **Decide on menu structure** (A, B, or C)
2. **Create all package landing pages**:
   - `/packages/smart-site` (T1 - $249)
   - `/packages/starter` (T2 - $97/mo)
   - `/packages/pro` (T3 - $297/mo)
   - `/packages/premium` (T4 - $497/mo)
   - `/packages/smart-launch` (Bridge - $2,500-4,500 + $297/mo)
   - `/packages/custom` ($5,000+)
3. **Create service pages**: `/services/add-ons`, `/services/strategy`
4. **Update Header.tsx** with new navigation structure
5. **Update routes.tsx** with new page routes
6. **Build pricing comparison component** showing all 6 tiers + add-ons

---

## Questions to Answer

- [ ] Should "Pricing" be a separate nav item or fold into Products dropdown?
- [ ] Do we need a "Resources" or "Company" dropdown?
- [ ] Should industry pages show recommended tier inline?
- [ ] Add-ons: separate page or section within pricing?
- [ ] Should T1 Smart Site have its own prominent nav position (loss-leader visibility)?
- [ ] Strategy Session: booking flow or simple inquiry form?
