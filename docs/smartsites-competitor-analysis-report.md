# SmartSites.com Competitor Analysis Report

**Date:** December 19, 2025  
**Analyzed Site:** https://www.smartsites.com  
**Purpose:** Identify structure patterns applicable to EverIntent SmartSites

---

## Executive Summary

SmartSites is a full-service digital marketing agency with a mature, well-structured site. While they're a different business model (agency vs. our SaaS + productized services), their information architecture provides valuable lessons for organizing our offerings.

**Key Insight:** They treat EVERY offering as a standalone product with its own landing page, case studies, and industry-specific variants.

---

## SmartSites Navigation Structure

### Top Navigation
```
Logo    Services ▼    Our Work    Company ▼    Contact    [Phone Number]
```

### Services Mega Menu
Their services page (https://www.smartsites.com/digital-marketing-services/) lists 5 major service categories:

| Service | Sub-Services |
|---------|-------------|
| **Web Design** | WordPress, Magento, Shopify, Custom Development, Site Maintenance |
| **Pay Per Click (PPC)** | Google Ads, Facebook Ads, Ecommerce Ads, Remarketing, Landing Pages |
| **SEO** | Local SEO, Ecommerce SEO, National SEO, Blogging, Technical SEO Audit, Franchise SEO |
| **Email & SMS** | Marketing Automation, Email Newsletters, Klaviyo Experts, Mailchimp Experts, SMS Marketing |
| **Social Media** | Facebook & IG, Twitter/X, LinkedIn, Video & TikTok, Influencer Marketing |

**Key Pattern:** Each sub-service has its own dedicated landing page with:
- Detailed description
- Results metrics
- Industry applications
- Case studies

### Our Work / Portfolio
URL: https://www.smartsites.com/work/

**Structure:**
- Filterable by SERVICE (PPC, SEO, Web Design, Email & SMS, Social Media)
- Filterable by INDUSTRY (from homepage: Home Services, Medical, Legal, Automotive, B2B, Retail, Industrial, Small Business)
- Each case study shows: Client name, thumbnail, key metrics (% increase in traffic, leads, etc.)

### Industries / Experts
URL: https://www.smartsites.com/experts/

**10 Industry Categories with 100+ sub-verticals:**

| Category | Example Verticals |
|----------|------------------|
| Small Business | Fitness, Martial Arts, Photography, Real Estate, Startups |
| Home Services | HVAC, Plumbing, Electrical, Roofing, Cleaning, Pest Control, Solar |
| Medical & Healthcare | Dental, MedSpa, Dermatology, Mental Health, Physical Therapy |
| Legal Services | Personal Injury, Corporate, Immigration, Bankruptcy |
| Automotive | Auto Repair, Car Dealerships (by brand), Auto Parts |
| Business to Business | Accountants, IT Services, SaaS, Fintech, Consulting |
| Retail | E-commerce, Fashion, Home Decor, Gifts |
| Industrial & Commercial | Manufacturing, Construction, Engineering, Distribution |
| Hospitality | Restaurants, Hotels, Tourism, Golf Courses |
| Nonprofit | Education, Government, Not-for-Profit |

**Key Pattern:** Each industry vertical has its own landing page positioned as "X Marketing Agency" (e.g., "HVAC Marketing Agency").

### Company Section
- About Us (team photos, company story, achievements)
- Meet The Team (dedicated team page)
- Awards/Press (Inc. 5000, Forbes, Bloomberg, BBB A+)
- Careers (implied)

### Contact
- Full contact form with service interest checkboxes
- Budget qualification ($1,500/mo - $100,000+/mo tiers)
- Physical address
- Phone number
- Email address
- Social media links

---

## What SmartSites Does RIGHT (That We Should Adopt)

### 1. Results-Driven Case Studies
Every portfolio piece shows METRICS:
- "532% increase in total site traffic"
- "375% increase in leads"
- "817% increase in organic search traffic"

**Application for Us:** Our 20 LocalPros sites should each have metrics-driven case studies when we launch portfolio.

### 2. Industry-Specific Landing Pages
They don't just say "we do marketing." They have dedicated pages for:
- HVAC Marketing
- Plumber Marketing
- Dental Marketing
- etc.

**Application for Us:** Our BRD defines 65+ industry pages. These MUST be built.

### 3. Service + Industry Matrix
They cross-reference services WITH industries. Example: "PPC for Home Services."

**Application for Us:** Consider intersection pages like "AI Chat for Plumbers" or "Websites for HVAC."

### 4. Trust Badges Everywhere
- Google Premier Partner
- Microsoft Advertising Partner
- Meta Business Partner
- BBB A+ Rating
- Inc. 5000

**Application for Us:** We need to build similar trust signals (GHL Partner, WordPress Partner, etc.)

### 5. Phone Number in Header
Prominent click-to-call number in nav bar.

**Application for Us:** We have this pattern in BRD. Must implement.

---

## What's MISSING from Our Menu Proposal

### ❌ FOOTER (Completely Missing)
The current menu proposal has NO footer specification. SmartSites footer includes:

**Column 1: Services**
- Web Design
- PPC
- SEO
- Email & SMS
- Social Media

**Column 2: Industries**
- Top 6-8 industries linked

**Column 3: Company**
- About
- Our Work
- Blog
- Careers
- Contact

**Column 4: Legal/Resources**
- Privacy Policy
- Terms of Service
- Sitemap
- Partner portal (for us: LocalPros)

**Column 5: Contact**
- Address
- Phone
- Email
- Social icons

**BRD Defines These Routes (not in proposal):**
- `/legal/privacy`
- `/legal/terms`
- `/legal/data-request`
- `/localpros` (BRD says: "Footer → Resources column")

### ❌ PORTFOLIO / OUR WORK
- BRD defines `/portfolio` route
- Menu proposal mentions it in URL structure but NOT in navigation
- SmartSites has prominent "Our Work" in top nav

**Required:**
- Add `/portfolio` to main navigation
- Show filterable case studies
- Include the 20 LocalPros sites as portfolio pieces

### ❌ LOCALPROS
- BRD Section 20 fully defines LocalPros program
- BRD specifies: "Footer → Resources column. Label: 'LocalPros Network' or 'Partner Program'"
- Menu proposal barely mentions it

**Required Footer Placement:**
```
Resources / Partners
├── LocalPros Network
├── Partner With Us
└── Success Stories
```

### ❌ CAREERS
- SmartSites has careers
- BRD mentions job postings table
- Menu proposal Company dropdown missing Careers

**Required:**
```
Company ▼
├── About Us
├── Our Work / Portfolio
├── Careers  ← MISSING
├── Blog  ← MISSING
└── Contact
```

### ❌ TESTIMONIALS / REVIEWS PAGE
- SmartSites has testimonials throughout
- BRD defines `testimonials` table
- No dedicated testimonials page in proposal

### ❌ BLOG
- SmartSites references blog in their content
- Common for agencies
- Not mentioned in proposal

### ❌ CLIENT LOGIN
- Resources dropdown should have "Client Login" (link to GHL portal)
- Common pattern for SaaS/agency sites

---

## Revised Menu Structure Recommendation

### Header Navigation
```
Logo    Services ▼    Industries ▼    Our Work    Company ▼    [Book Demo]    [Phone]
```

### Services Dropdown (Product-Centric)
```
Services ▼
│
├── Websites
│   ├── SmartSite Starter ($249)
│   ├── SmartSite Pro ($497/mo)
│   └── Custom Design
│
├── AI Solutions
│   ├── AI Chat
│   ├── AI Voice
│   └── AI Automation
│
├── SEO & Search
│   ├── Local SEO
│   ├── SEO Sprint (3-month)
│   └── Ongoing SEO
│
├── Reputation
│   ├── Review Automation
│   └── Reputation Management
│
├── ───────────────────
│
└── Packages (Compare All)
    ├── T1: SmartSite ($249)
    ├── T2: Lead Booster ($97/mo)
    ├── T3: Booking & Reputation ($297/mo)
    ├── T4: AI Growth ($497/mo)
    └── Smart Launch ($2,500+)
```

### Industries Dropdown
```
Industries ▼
│
├── Home Services
│   ├── HVAC
│   ├── Plumbing
│   ├── Electrical
│   ├── Landscaping
│   └── View All (30+)
│
├── Professional Services
│   ├── Legal
│   ├── Accounting
│   ├── Real Estate
│   └── View All
│
├── Health & Wellness
│   ├── Dental
│   ├── Chiropractic
│   ├── MedSpa
│   └── View All
│
├── Automotive
│   ├── Auto Repair
│   ├── Detailing
│   └── View All
│
└── All Industries (65+)
```

### Company Dropdown
```
Company ▼
├── About Us
├── Our Work / Portfolio
├── Testimonials
├── Blog
├── Careers
└── Contact
```

---

## FOOTER STRUCTURE (New Section)

```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│  [Logo]                                                              │
│  Professional websites and automation                                │
│  for local service businesses.                                       │
│                                                                      │
│  Services          Industries         Company         Resources      │
│  ─────────         ──────────         ───────         ─────────      │
│  Websites          Home Services      About Us        Help Center    │
│  AI Solutions      Professional       Portfolio       Client Login   │
│  SEO & Search      Health & Wellness  Testimonials    Contact Us     │
│  Reputation        Automotive         Careers         LocalPros      │
│  Packages          All Industries     Blog                           │
│                                                                       │
│  ──────────────────────────────────────────────────────────────────  │
│                                                                       │
│  [Phone]  [Email]  [Address]                                         │
│                                                                       │
│  [Facebook] [Instagram] [LinkedIn] [YouTube]                         │
│                                                                       │
│  © 2025 EverIntent LLC. All rights reserved.                         │
│  Privacy Policy  |  Terms of Service  |  Data Request                │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

---

## What SmartSites Does That DOESN'T Apply to Us

| SmartSites Feature | Why Not Applicable |
|-------------------|-------------------|
| PPC Management | We don't offer ad management (yet) |
| Social Media Management | Not in our service offering |
| Ecommerce (Magento/Shopify) | We focus on WordPress for service businesses |
| $1,500-$100,000+/mo budgets | Our tiers are $97-$497/mo |
| National/Enterprise SEO | We focus on local businesses |

---

## Action Items

### Immediate (Menu Proposal Update)
1. Add footer specification with all legal pages
2. Add Portfolio/Our Work to main nav
3. Add LocalPros to footer Resources column
4. Add Careers to Company dropdown
5. Add Client Login to Resources

### Near-Term (Site Build)
1. Create `/portfolio` page with the 20 LocalPros sites
2. Create `/testimonials` page
3. Create `/careers` page (even if no openings, shows growth)
4. Create footer component matching spec above
5. Create industry landing pages (start with top 10)

### Trust Building
1. Apply for GHL Partner badge
2. Get BBB accreditation
3. Collect and display Google reviews
4. Create "Featured In" section when we get press

---

## References

- SmartSites Homepage: https://www.smartsites.com/
- SmartSites Services: https://www.smartsites.com/digital-marketing-services/
- SmartSites Portfolio: https://www.smartsites.com/work/
- SmartSites Industries: https://www.smartsites.com/experts/
- SmartSites About: https://www.smartsites.com/about/
- SmartSites Contact: https://www.smartsites.com/contact/
- EverIntent BRD v32.2: /docs/smartsites-brd-v32.2.md
- Research Alignment: /docs/research-alignment.md
