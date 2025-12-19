# SmartSites Menu Structure Proposal

**Date:** December 19, 2025  
**Reference:** Legal AI site structure, docs/research-alignment.md

---

## Core Principle: Everything is a Product

Legal AI treats every offering as a **PRODUCT in a CATEGORY**, not as "add-ons" or "extras" to a base tier.

| Legal AI Structure | What It Means |
|-------------------|---------------|
| Client Intake & CRM | Standalone product with own page, own pricing |
| Marketing & Nurture | Standalone product with own page, own pricing |
| InfoTrust AI Workspace | Standalone premium product |
| Complete Bundles | Pre-configured combinations of products at package price |

**The mental model:**
- Products are standalone offerings that solve specific problems
- Bundles/Packages combine multiple products at discounted pricing
- A customer can buy ONE product, or buy a bundle that includes several

---

## SmartSites Product Categories

| Category | Products | Each is Standalone |
|----------|----------|-------------------|
| **Websites** | SmartSite Starter, SmartSite Pro, Custom Design | Yes |
| **SEO & Search** | Local SEO, SEO Sprint (3-month), Ongoing SEO | Yes |
| **AI Solutions** | AI Chat, AI Voice, AI Automation Suite | Yes |
| **Marketing** | Google Ads Management, Social Media, Content Marketing | Yes |
| **Reputation** | Review Automation, Reputation Management | Yes |
| **Packages** | T1, T2, T3, T4, Smart Launch, Custom | Yes (bundles) |

---

## Proposed Menu Structure

```
Logo                                                        [Book Demo]

Products ▼        Industries ▼        Resources ▼        Company ▼
```

### Products Dropdown

```
Products ▼
│
├── Websites
│   ├── SmartSite Starter ($249)
│   ├── SmartSite Pro ($497/mo)
│   └── Custom Design ($5,000+)
│
├── SEO & Search
│   ├── Local SEO Setup
│   ├── SEO Sprint (3-month)
│   └── Ongoing SEO
│
├── AI Solutions
│   ├── AI Chat
│   ├── AI Voice
│   └── AI Automation Suite
│
├── Marketing
│   ├── Google Ads Management
│   ├── Social Media
│   └── Content Marketing
│
├── Reputation
│   ├── Review Automation
│   └── Reputation Management
│
├── ─────────────────────────
│
└── All-In-One Packages
    ├── T1: SmartSite ($249)
    ├── T2: Lead Booster ($97/mo)
    ├── T3: Booking & Reputation ($297/mo)
    ├── T4: AI Growth ($497/mo)
    ├── Smart Launch ($2,500-4,500 + ongoing)
    └── Custom ($5,000+)
```

### Industries Dropdown

```
Industries ▼
│
├── Home Services
│   ├── Plumbers
│   ├── Electricians
│   ├── HVAC
│   ├── Landscaping
│   └── Cleaning Services
│
├── Professional Services
│   ├── Attorneys
│   ├── Accountants
│   └── Consultants
│
├── Health & Wellness
│   ├── Dentists
│   ├── Chiropractors
│   └── Med Spas
│
├── Automotive
│   ├── Auto Repair
│   └── Detailing
│
└── View All Industries
```

### Resources Dropdown

```
Resources ▼
│
├── Getting Started
│   ├── How It Works
│   ├── Pricing Guide
│   └── FAQs
│
├── Learn
│   ├── Blog
│   ├── Case Studies
│   └── Guides
│
└── Support
    ├── Help Center
    ├── Contact
    └── Client Login
```

### Company Dropdown

```
Company ▼
├── About Us
├── Careers
├── Contact
└── Partner Program
```

---

## Product Page Structure

Each product gets its own landing page following Legal AI's pattern:

### Example: `/products/seo/local-seo`

```
┌─────────────────────────────────────────────────────┐
│ Local SEO                                           │
│                                                     │
│ Get found when customers search for your services.  │
│                                                     │
│ [Pricing]                                           │
│ • One-time setup: $XXX                              │
│ • Ongoing management: $XXX/mo                       │
│                                                     │
│ [What's Included]                                   │
│ • Google Business Profile optimization              │
│ • Citation building                                 │
│ • Local keyword targeting                           │
│ • Monthly reporting                                 │
│                                                     │
│ ─────────────────────────────────────────────────── │
│                                                     │
│ Also included in these packages:                    │
│ • T3: Booking & Reputation ($297/mo)                │
│ • T4: AI Growth ($497/mo)                           │
│ • Smart Launch (from $2,500)                        │
│                                                     │
│ [Get Started]  [Compare Packages]                   │
└─────────────────────────────────────────────────────┘
```

### Example: `/products/packages/t3-booking-reputation`

```
┌─────────────────────────────────────────────────────┐
│ T3: Booking & Reputation                            │
│ $297/mo                                             │
│                                                     │
│ Complete system for service businesses who          │
│ schedule jobs and build reviews.                    │
│                                                     │
│ [Products Included]                                 │
│ ✓ Website (SmartSite Starter value)                 │
│ ✓ Local SEO Setup                                   │
│ ✓ AI Chat (50 minutes/mo)                           │
│ ✓ Review Automation                                 │
│ ✓ Online Booking                                    │
│ ✓ CRM & Pipeline                                    │
│                                                     │
│ [Get Started]                                       │
└─────────────────────────────────────────────────────┘
```

---

## URL Structure

```
/products
├── /products/websites
│   ├── /products/websites/smartsite-starter
│   ├── /products/websites/smartsite-pro
│   └── /products/websites/custom-design
│
├── /products/seo
│   ├── /products/seo/local-seo
│   ├── /products/seo/seo-sprint
│   └── /products/seo/ongoing-seo
│
├── /products/ai
│   ├── /products/ai/chat
│   ├── /products/ai/voice
│   └── /products/ai/automation
│
├── /products/marketing
│   ├── /products/marketing/google-ads
│   ├── /products/marketing/social-media
│   └── /products/marketing/content
│
├── /products/reputation
│   ├── /products/reputation/review-automation
│   └── /products/reputation/management
│
└── /products/packages
    ├── /products/packages/t1-smartsite
    ├── /products/packages/t2-lead-booster
    ├── /products/packages/t3-booking-reputation
    ├── /products/packages/t4-ai-growth
    ├── /products/packages/smart-launch
    ├── /products/packages/custom
    └── /products/packages/compare (pricing comparison)
```

---

## Strategy Session

The Strategy Session is also a PRODUCT (not a "sales call"):

**SmartStart Strategy Session** - `/products/strategy-session`
- $500-750 paid engagement
- Discovery + audit + recommendations
- Credit toward any product/package purchase

This belongs in "Getting Started" under Resources, OR as a standalone product in the Products dropdown.

---

## Key Differences from Previous Proposal

| Previous Approach (Wrong) | Current Approach (Correct) |
|--------------------------|---------------------------|
| Called services "add-ons" | Each service is a standalone product |
| Tiers are primary; services attach to tiers | Products are primary; packages bundle products |
| "SEO Sprint add-on" | SEO Sprint is a product in SEO category |
| "Additional AI Minutes" | AI Voice is a product; usage is billing |
| Tier-first thinking | Product-first thinking |

---

## Next Steps

1. Confirm this product-centric structure
2. Define pricing for each standalone product
3. Create product category pages
4. Create individual product pages
5. Create package pages that reference included products
6. Update Header navigation component
7. Update routes.tsx

---

## Questions

1. Does this product-category structure match your intent?
2. Where should Strategy Session live - Products or Resources?
3. Any products missing from the categories above?
4. Pricing: do you have standalone pricing for individual products, or only bundle pricing?
