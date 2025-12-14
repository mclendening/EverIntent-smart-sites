# EverIntent SmartSites — Complete Business Requirements Document v32.6

**Last Updated:** December 14, 2025  
**Version:** 32.6 (LocalPros Specification Complete)  
**Status:** BUILD-READY  
**Owner:** EverIntent LLC  
**GitHub Path:** /docs/smartsites-brd-v32.6.md

---

## Document Purpose

This BRD is the single source of truth for EverIntent SmartSites. It governs:

- What customers buy
- What users experience
- What the team builds
- What gets deployed

**Non-goals:** Debating architecture, exploring alternatives.

---

## Table of Contents

1. [Quick Reference](#1-quick-reference)
2. [Executive Summary](#2-executive-summary)
3. [Core Principles](#3-core-principles)
4. [Industry Verticals](#4-industry-verticals)
5. [Business Model](#5-business-model)
6. [LocalPros Network](#6-localpros-network)
7. [Services & Solutions](#7-services--solutions)
8. [Tier Definitions](#8-tier-definitions)
9. [Customer Journey](#9-customer-journey)
10. [GHL Configuration](#10-ghl-configuration)
11. [Customer Portal Architecture](#11-customer-portal-architecture)
12. [WordPress Customer Sites](#12-wordpress-customer-sites)
13. [Marketing Site Specification](#13-marketing-site-specification)
14. [Navigation Structure](#14-navigation-structure)
15. [Cookie Consent & Compliance](#15-cookie-consent--compliance)
16. [Domain Integration](#16-domain-integration)
17. [Go-To-Market Strategy](#17-go-to-market-strategy)
18. [Technical Architecture](#18-technical-architecture)
19. [Operational SOPs](#19-operational-sops)
20. [Appendices](#20-appendices)

---

## 1. Quick Reference

| Component | Technology |
|-----------|------------|
| Marketing Site | Vite + React, Vercel Pro, Supabase |
| Customer Portal | GHL SaaS Mode |
| Checkout | GHL SaaS Mode |
| Customer Sites | WordPress on Plesk/OVH |
| LocalPros Sites | WordPress on Plesk/OVH (same build) |
| Domain Registrar | Namecheap API |
| Email | GHL + custom SMTP |
| Automation | GHL + n8n |

---

## 2. Executive Summary

EverIntent SmartSites provides professional websites and automation to local businesses. 

**Target Market:** Home services, professional services, health & wellness, automotive  
**Value Proposition:** Done-for-you web presence that generates leads  
**Pricing:** $97-$497/month recurring  

---

## 3. Core Principles

### Priority Order

#### 3.1 Revenue at Every Step
Nothing is free unless it strategically leads to bigger revenue. The sales process itself should make money.

#### 3.2 Asset Ownership
We own domains, phone numbers, rankings, traffic. Partners and customers come and go. Assets stay. This is the moat.

#### 3.3 One Tech Stack, Multiple Revenue Paths
Same WordPress build. Same GHL automations. Different monetization based on the relationship.

#### 3.4 Relationship → Trust → MRR
Every LocalPros interaction builds toward SmartSites conversion. The goal is always recurring revenue.

---

## 4. Industry Verticals

### Home Services
| Vertical | Est. Lead Value | Notes |
|----------|-----------------|-------|
| HVAC | $150-500 | High seasonality |
| Plumbing | $100-400 | Emergency premium |
| Roofing | $500-2000 | High ticket |
| Electrical | $100-300 | Steady demand |
| Landscaping | $75-200 | Seasonal |
| Pool Service | $50-150 | Recurring potential |

### Professional Services
| Vertical | Est. Lead Value | Notes |
|----------|-----------------|-------|
| Attorneys | $200-1000+ | Practice dependent |
| Accountants | $100-500 | Seasonal peaks |
| Real Estate | $100-300 | Volume play |
| Insurance | $50-200 | Recurring policies |

### Health & Wellness
| Vertical | Est. Lead Value | Notes |
|----------|-----------------|-------|
| Dentists | $150-500 | High LTV |
| Chiropractors | $75-200 | Recurring visits |
| Med Spas | $200-1000 | High ticket services |
| Therapists | $100-300 | Steady demand |

### Automotive Services
| Vertical | Est. Lead Value | Notes |
|----------|-----------------|-------|
| Auto Repair | $75-300 | Repeat customers |
| Body Shops | $500-2000 | Insurance work |
| Detailing | $50-150 | Upsell potential |
| Towing | $75-200 | Emergency calls |

---

## 5. Business Model

### 5.1 Revenue Streams

| Stream | Type | Source |
|--------|------|--------|
| SmartSites Builds | One-time | T1-T4 setup fees |
| SmartSites MRR | Recurring | T1-T4 monthly subscriptions |
| Annual Renewals | Recurring | Domain + hosting |
| Usage Overages | Variable | SMS, AI, calls |
| LocalPros Leads | Variable | Per-lead sales |
| LocalPros Rentals | Recurring | Site rental fees |
| LocalPros Sales | One-time | Site ownership transfers |

### 5.2 Unit Economics (SmartSites T1)

| Metric | Value |
|--------|-------|
| Monthly Revenue | $97 |
| Annual Revenue | $1,164 |
| Build Cost | ~$200 (time) |
| Hosting Cost | ~$10/mo |
| Gross Margin | ~80% |

### 5.3 LocalPros Economics

See [Section 6: LocalPros Network](#6-localpros-network) for detailed breakdown.

---

## 6. LocalPros Network

### 6.1 Overview

LocalPros is a lead generation network that serves three purposes:
1. **Revenue:** Sell leads from ranking WordPress sites
2. **Ice Breaker:** Build relationships that convert to SmartSites
3. **Asset Portfolio:** Own ranking domains/sites as permanent business assets

### 6.2 Core Concept

One ranking WordPress site. Three ways to make money:

```
Same WordPress build as SmartSites customers
Same GHL automations
Different monetization based on relationship
```

### 6.3 Three Revenue Paths

#### Path 1: Sell Leads
```
Site ranks → Calls/forms come in → GHL captures → We sell to partner

Revenue: $25-150 per lead
Effort: Near zero (site already built and ranking)
GHL: Leads in master account, distributed via automation
WordPress: No changes needed
```

#### Path 2: Sell or Rent the Site

**Option A: SELL ($2K-$10K one-time)**
- Transfer domain + hosting to buyer
- They own everything
- We're done (unless they want SmartSites services)

**Option B: RENT ($297-$497/month)**
- We keep ownership
- They get the leads + can rebrand
- Basically T2-T4 pricing for a site that ALREADY RANKS
- GHL: They get sub-account tied to that site
- WordPress: We maintain, they use

#### Path 3: Ice Breaker to SmartSites
```
Cold outreach → "Want leads from my ranking site?"
    ↓
Give away 3-5 leads (prove it works)
    ↓
"Want more? $X per lead" (Path 1)
    ↓
Relationship builds over 60-90 days
    ↓
"Ready for your own site that does this?"
    ↓
SmartSites T2-T4 sale ($197-$497/mo forever)
```

### 6.4 Lead Pricing Tiers

| Category | Lead Price | Rationale |
|----------|-----------|-----------|
| Home Services | $25-50 | High volume, lower job value |
| Automotive | $30-50 | Medium volume, medium value |
| Health & Wellness | $50-100 | Lower volume, higher job value |
| Professional Services | $75-150 | Low volume, high job value |

**Flexibility:** ±20% based on market/demand. Phoenix HVAC may be $40, NYC HVAC may be $60.

### 6.5 Partner Terms

**Territory:** Exclusive by default. One partner per site/market.

**Underperformance Clause:** If partner accepts <70% of leads, we warn, then open to second partner.

**Conversion Trigger:** 20 leads delivered OR 90 days active, whichever comes first.

**Conversion Script:**
> "You've gotten [X] leads from us. Closed about [$Y] in business. Ready to have your OWN site doing this? I can have it live in 5 days."

### 6.6 Conversion Incentive

**Credit model:** Last 30 days of lead spend applies to first month of SmartSites.

Example: Partner spent $400 on leads last month. They sign up for T3 ($347/mo). First month is covered, $53 credit toward month 2.

Psychology: "You're not starting over. You're upgrading."

### 6.7 Site Expansion Strategy

**Demand-driven only.** Don't build spec sites.

When we have a prospect in a niche/market we don't have, we build it. Lead already warm. Site pays for itself immediately.

**Exception:** If a vertical shows high search volume + high lead value (dental implants, personal injury), spec build may be worth it.

### 6.8 Decision Framework

| Scenario | What We Do | Why |
|----------|-----------|-----|
| Partner just wants leads | Path 1, keep site as LocalPros | Recurring lead revenue |
| Partner wants instant presence | Path 2B, rent the site | Monthly rent > lead sales |
| Partner wants to OWN it | Path 2A, sell outright | One-time cash, relationship continues |
| Partner wants THEIR OWN brand | Path 3, build new SmartSites | Keep LocalPros asset, gain MRR |
| Partner goes cold | Find new partner for leads | Asset never dies |

### 6.9 Easy Money Map

| Stage | Easy Money | GHL Action | WordPress Action |
|-------|-----------|------------|------------------|
| Site ranks, no partner yet | Bank leads, sell later | Leads in master pipeline | None |
| Partner prospect | Give 3-5 free leads | Tag in pipeline | None |
| Partner active | Sell leads $25-150 each | Distribute via automation | None |
| Partner wants more | Rent site $297-497/mo | Create sub-account | Rebrand if needed |
| Partner wants to own | Sell site $2K-10K | Transfer or close | Transfer hosting |
| Partner ready for SmartSites | Sell T2-T4 tier | New sub-account | Build new site |

**Every box makes money or leads to money.**

### 6.10 What Happens to LocalPros Site on Conversion

**Option A: New Site (Recommended)**
- We build them a NEW WordPress site
- They get a NEW GHL sub-account
- LocalPros site stays LocalPros (new partner takes over OR we bank leads)
- Two assets, two revenue streams

**Option B: Site Transfer**
- LocalPros site becomes THEIR site
- Domain transfers or rebrands
- GHL: Leads now go to their sub-account, not master
- We lose the LocalPros asset but gain SmartSites MRR

**Option C: Rent-to-Own**
- They "rent" the LocalPros site (Path 2B)
- After 12 months, option to buy outright
- GHL: Sub-account tied to that site
- Best of both: Monthly revenue now, potential asset sale later

---

## 7. Services & Solutions

### Beautiful Websites
**Problem:** DIY sites look amateur, drive customers away  
**Solution:** Professional WordPress sites in 5 days  
**Outcome:** Credibility that converts visitors to customers

### Get Found Online
**Problem:** Nobody can find you on Google  
**Solution:** Local SEO + Google Business optimization  
**Outcome:** Visibility when customers search

### Capture More Leads
**Problem:** Website visitors leave without contact  
**Solution:** Smart forms, chat, call tracking  
**Outcome:** Never miss a potential customer

### Book More Appointments
**Problem:** Phone tag and scheduling friction  
**Solution:** Online booking + automated reminders  
**Outcome:** Calendar fills without effort

### Manage From Your Phone
**Problem:** Can't respond fast when in the field  
**Solution:** Mobile app for leads and messages  
**Outcome:** Close deals between jobs

### Build Your Reputation
**Problem:** No reviews or buried by competitors  
**Solution:** Automated review requests + monitoring  
**Outcome:** 5-star presence that attracts customers

### AI That Works 24/7
**Problem:** Miss calls after hours, weekends  
**Solution:** AI voice + chat handles inquiries  
**Outcome:** Lead capture around the clock

---

## 8. Tier Definitions

### T1: Starter — $97/month
- Professional WordPress website
- Mobile-friendly design
- Contact form + click-to-call
- Basic SEO setup
- Monthly email report

**Target:** Solo operators, just need a web presence

### T2: Growth — $197/month
Everything in T1, plus:
- Google Business optimization
- Review request automation
- Call tracking number
- Mobile app access
- Live chat widget

**Target:** Established businesses wanting visibility

### T3: Professional — $347/month
Everything in T2, plus:
- Online appointment booking
- SMS automation
- CRM access
- Lead pipeline management
- Monthly strategy call

**Target:** Growing businesses ready for systems

### T4: Enterprise — $497/month
Everything in T3, plus:
- AI voice bot (after-hours)
- AI chat assistant
- Advanced automation
- Priority support
- Quarterly reviews

**Target:** Businesses wanting full automation

---

## 9. Customer Journey

### 9.1 SmartSites Customer Journey

```
Entry Point (Organic, Referral, LocalPros)
    ↓
Marketing Site (/pricing, /services/*)
    ↓
CTA → /contact OR /checkout/*
    ↓
Pre-checkout form (captures lead data)
    ↓
GHL SaaS Mode Checkout
    ↓
Webhook → n8n Provisioning
    ↓
Welcome Email + Portal Access
```

### 9.2 LocalPros Partner Journey

```
Cold Outreach (Email/Call)
    ↓
Landing Page (/localpros)
    ↓
Interest Form (/localpros/apply)
    ↓
GHL Master Account Pipeline
    ↓
3-5 Free Leads (Ice Breaker)
    ↓
Active Partner (Lead Sales)
    ↓
[20 leads OR 90 days]
    ↓
SmartSites Conversion Pitch
    ↓
SmartSites Customer Journey
```

### 9.3 LocalPros to SmartSites Conversion

| Touchpoint | Days | Action |
|------------|------|--------|
| First contact | 0 | Add to pipeline, qualify |
| Free leads | 1-7 | Deliver 3-5 free leads |
| Active status | 7-14 | Begin paid lead delivery |
| Check-in | 30 | "How are leads working?" |
| Upsell plant | 60 | "Ever thought about your own site?" |
| Conversion pitch | 90 | Full SmartSites presentation |

---

## 10. GHL Configuration

### 10.1 LocalPros Master Account

```
GHL Master Account
├── All LocalPros phone numbers
├── All LocalPros lead forms
├── AI voice bot (answers all calls)
├── Lead distribution automation
│   └── Partner gets SMS + email when lead comes in
├── Pipeline: LocalPros Leads
│   ├── New Lead
│   ├── Sent to Partner
│   ├── Accepted
│   ├── Declined → Route to backup
│   └── Converted (partner closed the job)
└── Pipeline: LocalPros Partners
    ├── Prospect
    ├── Active (buying leads)
    ├── Upsell Candidate
    └── Converted to SmartSites
```

### 10.2 SmartSites Sub-Accounts

```
GHL Sub-Account (per customer)
├── Their phone number
├── Their forms
├── Their automations (based on tier snapshot)
├── Their contacts/CRM
└── Their pipeline
```

### 10.3 Tier Snapshots

| Tier | Snapshot Features |
|------|-------------------|
| T1 | Basic website forms only |
| T2 | + Chat, reviews, call tracking |
| T3 | + Booking, SMS, CRM |
| T4 | + AI voice, AI chat, full automation |

---

## 11. Customer Portal Architecture

### T1 Portal (Neutered Dashboard)
- View-only access
- Monthly report display
- Upgrade CTA prominent
- No automation controls

### T2-T4 Portal (Full GHL Dashboard)
- Full CRM access
- Pipeline management
- Automation controls (tier-based)
- Reporting dashboard

---

## 12. WordPress Customer Sites

### Build Standards
- **Theme:** Starter theme (Elementor-ready)
- **Builder:** Elementor Pro
- **Hosting:** Plesk on OVH
- **SSL:** Let's Encrypt
- **CDN:** Cloudflare

### Standard Pages
1. Home
2. Services (or service-specific)
3. About
4. Contact
5. Privacy Policy
6. Terms of Service

### Plugin Stack
- Elementor Pro
- WPForms or GHL forms
- Yoast SEO
- WP Rocket (caching)
- Updraft Plus (backups)

---

## 13. Marketing Site Specification

### 13.1 Tech Stack
- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Vercel Pro
- **Backend:** Supabase (Lovable Cloud)
- **SSG:** vite-react-ssg

### 13.2 Database Tables

#### checkout_submissions
Captures pre-checkout form data for lead tracking.

#### portfolio
Admin-managed showcase of completed sites.

#### testimonials
Admin-managed customer quotes and reviews.

#### allowed_admin_emails
Whitelist for admin OTP authentication.

#### user_roles
Role assignments (admin, moderator, user).

### 13.3 Sitemap

#### Core Pages
| Route | Purpose |
|-------|---------|
| `/` | Homepage |
| `/pricing` | Tier comparison + CTAs |
| `/about` | Company story |
| `/contact` | Contact form + booking |
| `/portfolio` | Work showcase |

#### Service Pages
| Route | Purpose |
|-------|---------|
| `/services` | Services hub |
| `/services/websites` | Beautiful Websites |
| `/services/seo` | Get Found Online |
| `/services/leads` | Capture More Leads |
| `/services/booking` | Book Appointments |
| `/services/mobile` | Mobile Management |
| `/services/reputation` | Build Reputation |
| `/services/ai` | AI Automation |

#### Industry Pages
| Route | Purpose |
|-------|---------|
| `/industries` | Industry hub |
| `/industries/home-services` | Home services vertical |
| `/industries/professional-services` | Professional vertical |
| `/industries/health-wellness` | Health vertical |
| `/industries/automotive` | Automotive vertical |

#### LocalPros Pages
| Route | Purpose | Traffic Source |
|-------|---------|----------------|
| `/localpros` | Landing page for partners | Email/call outreach |
| `/localpros/apply` | Interest form submission | CTA from landing page |

#### Checkout Pages
| Route | Purpose |
|-------|---------|
| `/checkout` | Pre-checkout form |
| `/checkout/success` | Post-payment confirmation |

#### Legal Pages
| Route | Purpose |
|-------|---------|
| `/legal/privacy` | Privacy Policy |
| `/legal/terms` | Terms of Service |
| `/legal/data-request` | CCPA data request |
| `/legal/cookies` | Cookie preferences |

#### Admin Pages (Not Pre-rendered)
| Route | Purpose |
|-------|---------|
| `/admin/login` | OTP login |
| `/admin` | Dashboard |
| `/admin/submissions` | Lead management |
| `/admin/portfolio` | Portfolio CRUD |
| `/admin/testimonials` | Testimonials CRUD |

---

## 14. Navigation Structure

### 14.1 Header Navigation (Desktop)

```
Logo | Services ▼ | Industries ▼ | Pricing | About | [Get Started]

Services Dropdown:
├── Beautiful Websites (primary, first position)
├── Get Found Online
├── Capture More Leads
├── Book Appointments
├── Mobile Management
├── Build Reputation
└── AI Automation

Industries Dropdown:
├── Home Services
├── Professional Services
├── Health & Wellness
└── Automotive
```

### 14.2 Header Navigation (Mobile)

```
Logo | ☰ Menu

Mobile Menu:
├── Services (expandable)
├── Industries (expandable)
├── Pricing
├── About
├── Contact
└── [Get Started]
```

### 14.3 Footer Navigation

```
┌─────────────────────────────────────────────────────────────┐
│  Services    │  Industries   │  Resources    │  Company     │
│  ──────────  │  ───────────  │  ──────────   │  ─────────   │
│  Websites    │  Home Svc     │  Help/FAQ     │  About       │
│  SEO         │  Professional │  LocalPros    │  Contact     │
│  Leads       │  Health       │  Partner      │  Portfolio   │
│  Booking     │  Automotive   │  Program      │  Pricing     │
│  Mobile      │               │               │              │
│  Reputation  │               │               │              │
│  AI          │               │               │              │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  🌐 EverIntent Smart Sites                                  │
│                                                             │
│  [Book a Call]  [LinkedIn] [X] [Facebook]                   │
│                                                             │
│  hello@everintent.com  •  (555) 123-4567                    │
│  Phoenix, AZ                                                │
│                                                             │
│  ─────────────────────────────────────────────────────────  │
│                                                             │
│  Privacy | Cookies | Terms | Data Rights                    │
│                                                             │
│  © 2025 EverIntent LLC. All rights reserved.                │
│  Professional websites for local businesses.                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### 14.4 LocalPros in Navigation

**Placement:** Footer → Resources column

**Links:**
- "LocalPros Network" → `/localpros`
- "Partner Program" → `/localpros/apply`

**Rationale:** LocalPros targets a different audience (potential partners from outbound). Traffic comes from cold outreach, not organic site browsing. Footer placement provides discoverability without cluttering primary navigation.

### 14.5 Mobile Bottom Bar

```
┌─────────────────────────────────────────┐
│  🏠 Home  │  📞 Call  │  💬 Chat  │  ☰  │
└─────────────────────────────────────────┘
```

**Note:** Mobile bottom bar is gated behind cookie consent per California compliance requirements.

---

## 15. Cookie Consent & Compliance

### 15.1 Requirements

Cookie consent is **mandatory** for California users and must gate feature visibility:
- Desktop chat button: Hidden until consent
- Mobile bottom navbar: Hidden until consent

### 15.2 Implementation

```tsx
// Cookie consent stores acceptance in localStorage
// Dispatches 'cookie-consent-changed' event
// Components check consent before rendering
```

### 15.3 Footer Integration

"Cookie Preferences" link in footer legal section dispatches consent event, allowing users to modify settings after initial acceptance.

---

## 16. Domain Integration

### 16.1 Flow
1. Customer selects domain during checkout
2. Namecheap API checks availability
3. Domain purchased on successful checkout
4. DNS configured automatically
5. SSL provisioned via Let's Encrypt

### 16.2 Fallback
Manual domain setup if API fails. Support notified within 1 hour.

---

## 17. Go-To-Market Strategy

### 17.1 LocalPros Outreach

**Channel:** Cold email + cold call to local businesses

**Script Opening:**
> "I have a website ranking in [market] for [service]. Getting leads I can't use. Want them?"

**Target:** Businesses without strong web presence but capable of handling jobs.

### 17.2 SmartSites Direct

**Channels:**
- Google Ads (branded + service terms)
- Facebook/Instagram (local business targeting)
- Referral program (existing customer incentives)

### 17.3 LocalPros → SmartSites Funnel

```
Cold outreach (LocalPros leads)
    ↓
Relationship building (90 days)
    ↓
SmartSites pitch (conversion)
    ↓
MRR customer ($197-$497/mo)
```

---

## 18. Technical Architecture

### 18.1 Platform Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    EverIntent Platform                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Marketing Site (Vercel)     Customer Sites (OVH/Plesk)    │
│  ├── Vite + React            ├── WordPress                 │
│  ├── Supabase                ├── Elementor                 │
│  └── SSG (90+ pages)         └── GHL forms                 │
│                                                             │
│  LocalPros Sites (OVH/Plesk) GHL Master Account            │
│  ├── WordPress               ├── All LocalPros leads       │
│  ├── Elementor               ├── Partner pipelines         │
│  └── GHL forms               └── AI voice bot              │
│                                                             │
│  GHL Sub-Accounts            n8n Automation                │
│  ├── Per SmartSites customer ├── Provisioning              │
│  ├── Tier-based features     ├── Lead distribution         │
│  └── CRM + automations       └── Notifications             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 19. Operational SOPs

### 19.1 SmartSites Build SOP

| Step | Time | Owner |
|------|------|-------|
| Intake form review | 0.5h | Build team |
| Domain + hosting setup | 0.5h | Build team |
| Template selection | 0.25h | Build team |
| Content population | 2h | Build team |
| GHL sub-account | 0.5h | Build team |
| QA + launch | 1h | Build team |
| **Total** | **~5h** | |

### 19.2 LocalPros Partner Onboarding

| Step | Time | Owner |
|------|------|-------|
| Application review | 0.25h | Sales |
| Territory check | 0.25h | Sales |
| Free leads delivery | 0h (automated) | GHL |
| Activation call | 0.5h | Sales |
| **Total** | **~1h** | |

---

## 20. Appendices

### Appendix A: LocalPros Page Content

#### /localpros Landing Page

**H1:** Get Exclusive Leads From Ranking Local Websites

**Subhead:** We own websites that rank #1 for local services. Get the leads. Pay per lead. No contracts.

**Section 1: What We Have**
- "Ranking websites in [list verticals]"
- "Exclusive territories available"
- "Leads delivered in real-time"

**Section 2: How It Works**
1. Apply for your niche + market
2. Get 3-5 free leads to start
3. Pay only for leads you want
4. Scale up or get your own site

**Section 3: Proof**
- 3-4 screenshots of ranking sites
- Lead volume stats
- Partner testimonials (when available)

**CTA:** Apply for Exclusive Leads →

#### /localpros/apply Form

**Fields:**
- Business name
- Your name
- Email
- Phone
- Service type (dropdown)
- Primary market/city
- Current lead sources
- Monthly lead budget

**Submission:** Creates contact in GHL Master Account → LocalPros Partners pipeline → Prospect stage

### Appendix B: Design System

#### Color Palette (HSL)
```css
--background: 222 47% 11%;      /* Dark charcoal */
--foreground: 210 40% 98%;      /* Light gray */
--primary: 45 93% 47%;          /* Gold/amber */
--primary-foreground: 222 47% 11%;
--accent: 45 93% 47%;
--accent-foreground: 222 47% 11%;
--muted: 217 33% 17%;
--muted-foreground: 215 20% 65%;
--card: 222 47% 13%;
--card-foreground: 210 40% 98%;
--border: 217 33% 25%;
```

#### Typography
- **Display:** Outfit or similar modern sans
- **Body:** System font stack

#### Animations
- Smooth transitions: 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Fade-up for reveals
- Hover lifts on cards

### Appendix C: Brand Guidelines

**Brand Name:** EverIntent Smart Sites  
**Tagline:** Professional websites for local businesses.  
**Logo Icon:** Globe (lucide-react) in accent color  
**Copyright:** © 2025 EverIntent LLC. All rights reserved.

---

## Document History

| Version | Date | Changes |
|---------|------|---------|
| v32.2 | Dec 2025 | SSG Migration to vite-react-ssg |
| v32.5 | Dec 2025 | Header + Footer implementation complete |
| v32.6 | Dec 2025 | LocalPros Network specification complete |

---

**END OF DOCUMENT**
