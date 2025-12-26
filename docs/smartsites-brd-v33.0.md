# EverIntent — Complete Business Requirements Document v34.0

**Last Updated:** December 21, 2025  
**Version:** 34.0 (Brand Pivot: EverIntent Master Brand)
**Status:** BUILD-READY
**Owner:** EverIntent LLC  
**Tagline:** Web Design AI & Automation
**GitHub Path:** /docs/BRD/EverIntent-BRD-v34.md

---

## Document Purpose

This is the **single source of truth** for EverIntent.com (currently staging at EverIntentSmartSites.com). It governs:

1. What customers buy (T1-T4 tiers, pricing, features)
2. What customers experience (UX flows from ad to purchase to delivery to billing)
3. What the team does (low-LOE provisioning, delivery SOPs)
4. What Lovable builds (marketing site pages, admin portal)
5. What gets configured in GHL + Stripe (SaaS plans, snapshots, billing)
6. What gets built on WordPress (customer sites T1-T4)
7. Go-To-Market execution (channels, niches, ad copy, UTMs)

**Non-goals:** This document does not debate architecture. It specifies requirements and the simplest implementation that meets them.

---

## ⛔ DESIGN ANTI-PATTERNS — DO NOT USE

**The following sites, styles, and patterns are EXPLICITLY BANNED as design references:**

1. **SmartSites.com (smartsites.com)** — DO NOT reference, copy, or draw inspiration from this site in any way. This includes:
   - Their scattered/floating browser window hero effect
   - Their color schemes (especially yellow/black)
   - Their layout patterns
   - Any visual elements whatsoever

**Why:** We are building our own unique brand identity under **EverIntent**. SmartSites is a large US digital marketing agency with strong common-law trademark rights. We use "smart website(s)" as descriptive product language, NOT as a brand name.

**If you are an AI or developer reading this:** Never suggest SmartSites.com as a reference. Never attempt to recreate their design patterns. Never use "SmartSites" as a brand name or logo lockup. This is a hard rule with no exceptions.

---

## ⚠️ BRAND PIVOT NOTICE (v34.0)

**Master Brand:** EverIntent  
**Tagline:** "Web Design AI & Automation"

**Key Changes:**
- "SmartSites by EverIntent" → "EverIntent"
- "Beautiful Websites" service → "Smart Websites" service
- Use "smart website(s)" / "smart site" as **descriptive language** (lowercase in prose), not a capital-S brand
- Tier names remain: Smart Site, Smart Lead, Smart Business, Smart Growth, Smart Launch
- All logos, headers, footers use **EverIntent** only
- Footer "Products" column → "Solutions" column
- Add "Solutions" nav item linking to verticals (Legal AI, future packages)
- About page blends EverIntent + EverIntent Legal AI credibility

**Safe Usage Examples:**
- ✅ "EverIntent Smart Website Packages"
- ✅ "Our smart website tiers"
- ✅ "Get a smart site that..."
- ❌ "EverIntent SmartSites™"
- ❌ "SmartSites by EverIntent" (logo/brand)
- ❌ Bidding on "SmartSites" as a Google Ads keyword

## Table of Contents

1. [Quick Reference](#1-quick-reference)
2. [Executive Summary](#2-executive-summary)
3. [Operating Entity](#3-operating-entity)
4. [Business Model](#4-business-model)
5. [Services & Solutions](#5-services--solutions)
6. [Tier Definitions](#6-tier-definitions)
7. [Complete Feature Matrix](#7-complete-feature-matrix)
8. [Competitive Analysis](#8-competitive-analysis)
9. [Customer Journey](#9-customer-journey)
10. [Checkout & Billing Architecture](#10-checkout--billing-architecture)
11. [GHL Configuration](#11-ghl-configuration)
12. [Customer Portal Architecture](#12-customer-portal-architecture)
13. [GA4 & Analytics](#13-ga4--analytics)
14. [WordPress Customer Sites](#14-wordpress-customer-sites)
15. [Marketing Site Specification](#15-marketing-site-specification)
16. [Sitemap](#16-sitemap)
17. [Navigation Structure](#17-navigation-structure)
18. [Domain Integration Architecture](#18-domain-integration-architecture)
19. [Go-To-Market Strategy](#19-go-to-market-strategy)
20. [LocalPros Network](#20-localpros-network)
21. [Compliance & Legal](#21-compliance--legal)
22. [Partner Program](#22-partner-program)
23. [Technical Architecture](#23-technical-architecture)
24. [Operational SOPs](#24-operational-sops)
25. [Upgrade & Downgrade Flows](#25-upgrade--downgrade-flows)
26. [Support Model](#26-support-model)
27. [Build Order & Timeline](#27-build-order--timeline)
28. [Open Questions](#28-open-questions)
29. [Document History](#29-document-history)

---

## 1. Quick Reference

| Component | Specification |
|-----------|---------------|
| Marketing Site | Vite + React (pre-rendered) on Vercel Pro + Supabase |
| Customer Portal | GoHighLevel SaaS Mode (white-labeled) |
| Checkout | GHL SaaS Checkout (Stripe-connected) |
| Customer Sites | WordPress on OVH/Plesk + Elementor |
| Domain Registrar | Manual purchase via GHL or Namecheap dashboard (during onboarding) |
| Email (transactional) | AWS SES |
| Email (marketing) | GHL native |
| Phone (outbound) | 5 SoCal area codes (562, 714, 949, 310, 626) |
| Phone (inbound) | Local numbers per market |

---

## 2. Executive Summary

**EverIntent** delivers smart websites and AI automation to local service businesses at transparent, affordable prices. Four tiers from $249 one-time to $497/month recurring, with clear upgrade paths and guaranteed ROI.

**Brand Positioning:** "Smart websites that pay for themselves — and are ready for AI when you are."

**Target Market:** Local service businesses across 4 industry categories and 65+ verticals

**Value Proposition:** "We build conversion-focused sites for local service businesses starting at $249. Every site ships upgrade-ready with automation and AI under the hood."

**Product Lines Under EverIntent:**
| Product | Description | Entry Point |
|---------|-------------|-------------|
| **Smart Websites** | T1–T4 website tiers ($249–$1,799) | Primary cash engine |
| **AI & Automation** | n8n workflows, AI receptionist, missed-call text-back | Upsell from websites |
| **Legal AI** | Specialized vertical at EverIntentLegalAI.com | Separate microsite |

---

## 2.1 Industry Verticals (65+ Total)

EverIntent serves local businesses across four main categories:

### Home Services (31 verticals)
The core market. High-intent local searches, clear service areas, repeat business potential.

| Vertical | Lead Value | Search Volume |
|----------|------------|---------------|
| HVAC | $25-50 | Very High |
| Plumbing | $30-60 | Very High |
| Electrical | $35-70 | High |
| Roofing | $50-100 | High |
| Landscaping | $15-30 | High |
| House Cleaning | $10-25 | Very High |
| Painting | $25-50 | Medium |
| Flooring | $30-60 | Medium |
| Remodeling | $40-80 | Medium |
| Pest Control | $20-40 | High |
| Pool Service | $20-40 | Medium |
| Garage Doors | $40-80 | Medium |
| Fencing | $30-60 | Medium |
| Tree Service | $50-100 | Medium |
| Handyman | $20-40 | High |
| Locksmith | $35-70 | Medium |
| Appliance Repair | $30-60 | Medium |
| Carpet Cleaning | $15-30 | Medium |
| Pressure Washing | $15-30 | Medium |
| Window Cleaning | $15-25 | Low |
| Gutter Cleaning | $15-25 | Low |
| Junk Removal | $25-50 | Medium |
| Moving | $30-60 | High |
| Glass Repair | $25-50 | Low |
| Concrete/Driveways | $40-80 | Low |
| Deck Building | $50-100 | Low |
| Home Inspection | $30-60 | Medium |
| Waterproofing | $40-80 | Low |
| Insulation | $35-70 | Low |
| Solar Installation | $75-150 | Medium |
| Security Systems | $40-80 | Low |

### Professional Services (15 verticals)
Higher ticket, relationship-based. Longer sales cycles but higher LTV.

| Vertical | Lead Value | Notes |
|----------|------------|-------|
| Legal (attorneys) | $75-200 | PI, family, criminal, estate |
| Real Estate | $50-100 | Agents, brokers |
| Accounting | $40-80 | CPAs, bookkeepers |
| Insurance | $25-75 | All lines |
| Financial Advisor | $75-150 | Wealth management |
| Mortgage | $50-125 | Lenders, brokers |
| Photography | $25-50 | Portrait, event, commercial |
| Videography | $40-80 | Wedding, commercial |
| Marketing Agencies | $50-100 | Local agencies |
| Consulting | $50-150 | Business, IT, HR |
| IT Services | $40-100 | MSPs, support |
| Web Design | $40-80 | Local shops |
| Event Planning | $30-60 | Wedding, corporate |
| Interior Design | $40-80 | Residential, commercial |
| Property Management | $40-100 | Residential, commercial |

### Health & Wellness (15 verticals)
Recurring revenue businesses. Strong review dependency.

| Vertical | Lead Value | Notes |
|----------|------------|-------|
| MedSpa | $50-150 | Botox, lasers, aesthetics |
| Dental | $40-100 | General, cosmetic, ortho |
| Chiropractic | $25-50 | Adjustment, rehab |
| Physical Therapy | $30-60 | PT clinics |
| Massage | $15-30 | LMTs, spas |
| Acupuncture | $25-50 | Alternative medicine |
| Optometry | $30-60 | Eye exams, glasses |
| Veterinary | $30-75 | Vets, pet clinics |
| Mental Health | $40-100 | Therapists, counselors |
| Personal Training | $20-50 | Trainers, gyms |
| Yoga Studios | $15-30 | Studios, instructors |
| Martial Arts | $20-40 | Dojos, MMA |
| Hair Salon | $15-30 | Stylists, salons |
| Barbershop | $10-25 | Barbers |
| Day Spa | $25-50 | Full-service spas |

### Automotive Services (10 verticals)
Essential services with strong repeat potential.

| Vertical | Lead Value | Notes |
|----------|------------|-------|
| Auto Repair | $30-60 | General mechanics |
| Auto Detailing | $20-40 | Mobile, shops |
| Tire Shop | $25-50 | Sales, service |
| Oil Change | $15-30 | Quick lube |
| Auto Body | $50-100 | Collision, paint |
| Transmission | $50-100 | Specialty repair |
| Towing | $30-60 | 24/7 service |
| Mobile Car Wash | $15-30 | On-site service |
| Window Tinting | $25-50 | Auto, residential |
| Audio Installation | $30-60 | Car audio, alarms |

---

## 3. Operating Entity

**Legal Name:** EverIntent LLC  
**DBA:** EverIntent (formerly "EverIntent SmartSites")  
**Formation:** California LLC  
**EIN:** [On file]
**Tagline:** Web Design AI & Automation

---

## 4. Business Model

### Core Revenue Principles

1. **Revenue at Every Step** - Nothing is free unless it strategically leads to bigger revenue. The sales process itself should make money.
2. **Asset Ownership** - We own domains, phone numbers, rankings, traffic. Partners and customers come and go. Assets stay. This is the moat.
3. **One Tech Stack, Multiple Revenue Paths** - Same WordPress build. Same GHL automations. Different monetization based on the relationship.
4. **Relationship → Trust → MRR** - Every LocalPros interaction builds toward SmartSites conversion. The goal is always recurring revenue.

### Revenue Streams

| Stream | Description |
|--------|-------------|
| One-time builds | T1 Smart Site ($249) |
| Monthly subscriptions | T2-T4 ($97-$497/month) |
| Annual renewals | T1 hosting/maintenance ($149/year) |
| Usage overages | SMS, AI minutes, emails above included |
| LocalPros leads | Lead sales $25-150 per lead by vertical |
| LocalPros site rental | Site rental $297-$497/month |
| LocalPros site sales | One-time site sales $2K-$10K |

### Three Revenue Paths from LocalPros Assets

One ranking WordPress site. Three ways to make money:

| Path | Model | Revenue | Effort | GHL Action |
|------|-------|---------|--------|------------|
| **Path 1: Sell Leads** | Site ranks → leads captured → sold to partner | $25-150 per lead | Near zero | Leads in master account, distributed via automation |
| **Path 2A: Sell Site** | Transfer domain + hosting to buyer | $2K-$10K one-time | Low | Close or transfer sub-account |
| **Path 2B: Rent Site** | We keep ownership, they get leads + rebrand | $297-$497/month | Low | Create sub-account tied to site |
| **Path 3: Ice Breaker** | Free leads → trust → SmartSites conversion | $2,364-$5,964/year MRR | Medium | Prospect → sub-account on conversion |

### Unit Economics (T1)

- Revenue: $249 + $149/year renewals
- COGS: ~$50 (domain, hosting, build labor)
- Gross margin: ~80%
- Payback: Immediate

---

## 5. Services & Solutions

### 5.1 Smart Websites (Primary Service)

**Problem:** Business owners know they need a website but are overwhelmed by options, jargon, and pricing games.

**Solution:** Professional 5-page website built in 5 days. Mobile-first. SEO-ready. You own everything. Every site ships upgrade-ready with automation and AI under the hood.

**Outcome:** A smart website that pays for itself — and is ready for AI when you are.

### 5.2 Get Found Online

**Problem:** Customers search Google. If you're not there, you don't exist.

**Solution:** SEO fundamentals baked into every site. Google Business optimization. Local search visibility.

**Outcome:** Show up when local customers search for your services.

### 5.3 Never Miss a Lead

**Problem:** Missed calls = missed revenue. 85% of callers won't leave a voicemail.

**Solution:** Missed call text-back. AI chat. 24/7 lead capture.

**Outcome:** Every inquiry gets a response. No lead falls through the cracks.

### 5.4 Book More Jobs

**Problem:** Phone tag wastes hours. No-shows kill your schedule.

**Solution:** Online booking. Automated reminders. Calendar integration.

**Outcome:** Customers book when convenient. You show up to confirmed jobs.

### 5.5 Run From Your Phone

**Problem:** You're in the field. You can't be tethered to a desktop.

**Solution:** Mobile app. Unified inbox. Manage everything from your phone.

**Outcome:** Run your business from anywhere. Respond instantly.

### 5.6 Build Your Reputation

**Problem:** Reviews drive decisions. 93% of customers check reviews first.

**Solution:** Automated review requests. Response templates. Reputation monitoring.

**Outcome:** More 5-star reviews. Handle negatives before they spread.

### 5.7 Let AI Handle It

**Problem:** Repetitive tasks drain your time. You should be doing the work, not the admin.

**Solution:** AI voice agent. Automated follow-ups. Smart routing.

**Outcome:** AI handles the routine. You focus on what pays.

---

## 6. Tier Definitions

### T1 - Smart Site ($249 one-time)

**Who it's for:** Businesses that just need a professional web presence.

**Includes:**
- 5-page professional website
- Mobile-responsive design
- Basic SEO setup
- Contact form
- Google Maps integration
- SSL certificate
- 1 year hosting included
- GA4 dashboard (view-only)

**Renewal:** $149/year (hosting + maintenance)

### T2 - Smart Lead ($97/month)

**Who it's for:** Businesses ready to capture and convert more leads.

**Includes everything in T1, plus:**
- Missed call text-back
- AI chat widget
- Lead capture forms
- Contact management (CRM)
- SMS/email communication
- Mobile app access
- 400 SMS/month included
- 30 AI minutes/month included

### T3 - Smart Business ($197/month)

**Who it's for:** Growing businesses that need to streamline operations.

**Includes everything in T2, plus:**
- Online booking/calendar
- Pipeline management
- Review automation
- Basic workflows
- 600 SMS/month included
- 50 AI minutes/month included

### T4 - Smart Growth ($497/month)

**Who it's for:** Businesses ready for full automation and growth.

**Includes everything in T3, plus:**
- AI voice agent
- Advanced automations
- Unified inbox
- Reporting dashboard
- Quarterly strategy calls
- 1000 SMS/month included
- 100 AI minutes/month included

### Smart Launch ($2,500-$4,500 one-time + $297/month)

**Who it's for:** Businesses that need more than a template but aren't ready for full custom.

**Includes:**
- Custom 10-page website (not template)
- Brand photography consultation
- Google Business Profile optimization
- 90-day marketing sprint (SEO + Google Ads setup)
- All T3 (Booking & Reputation) features ongoing

**Target segment:** Business owners who need more than T4 but find $5k+ custom "overkill"

**Revenue model:** Hybrid (one-time project + monthly retainer)

### SmartStart Strategy Session ($500-$750)

**Who it's for:** Prospects who need clarity before committing.

**Includes:**
- 60-minute strategy consultation
- Website/marketing audit
- Competitive analysis
- Custom recommendation report
- Full credit toward any package purchase

**Why this exists:**
- Generates revenue from sales process
- Filters serious buyers from tire-kickers
- Creates natural upsell opportunity
- Provides value even if they don't buy

### Tier Naming Consideration

Current tier names are internal-facing. Outcome-oriented alternatives under consideration:

| Current | Consideration | Rationale |
|---------|---------------|-----------|
| T1 Smart Site | Starter Site | Clear entry point |
| T2 Smart Lead | Lead Booster | Outcome-focused |
| T3 Smart Business | Booking & Reputation | Features named |
| T4 Smart Growth | AI Growth | AI differentiation |

**Decision status:** Pending approval

---

## 7. Complete Feature Matrix

| Feature | T1 | T2 | T3 | T4 |
|---------|:--:|:--:|:--:|:--:|
| Professional Website | ✓ | ✓ | ✓ | ✓ |
| Mobile Responsive | ✓ | ✓ | ✓ | ✓ |
| SSL Certificate | ✓ | ✓ | ✓ | ✓ |
| Basic SEO | ✓ | ✓ | ✓ | ✓ |
| Contact Form | ✓ | ✓ | ✓ | ✓ |
| Google Maps | ✓ | ✓ | ✓ | ✓ |
| GA4 Dashboard | View | Full | Full | Full |
| Missed Call Text-Back | — | ✓ | ✓ | ✓ |
| AI Chat Widget | — | ✓ | ✓ | ✓ |
| CRM / Contacts | — | ✓ | ✓ | ✓ |
| SMS/Email | — | ✓ | ✓ | ✓ |
| Mobile App | — | ✓ | ✓ | ✓ |
| Online Booking | — | — | ✓ | ✓ |
| Pipeline Management | — | — | ✓ | ✓ |
| Review Automation | — | — | ✓ | ✓ |
| AI Voice Agent | — | — | — | ✓ |
| Advanced Automations | — | — | — | ✓ |
| Unified Inbox | — | — | — | ✓ |
| Strategy Calls | — | — | — | Quarterly |

### 7.1 Smart Launch Feature Set

| Feature | Smart Launch |
|---------|:------------:|
| Custom Website (10+ pages) | ✓ |
| Mobile Responsive | ✓ |
| SSL Certificate | ✓ |
| 90-Day SEO Sprint | ✓ |
| Google Ads Setup | ✓ |
| Brand Photography Consult | ✓ |
| Google Business Profile Optimization | ✓ |
| Missed Call Text-Back | ✓ |
| AI Chat Widget | ✓ (50 min/mo) |
| CRM / Contacts | ✓ |
| SMS/Email | ✓ (600/mo) |
| Mobile App | ✓ |
| Online Booking | ✓ |
| Pipeline Management | ✓ |
| Review Automation | ✓ |
| **One-time Investment** | $2,500-$4,500 |
| **Monthly Ongoing** | $297 |

---

## 8. Competitive Analysis

| Competitor | Price | Build Time | Ownership | Automation |
|------------|-------|------------|-----------|------------|
| Wix | $16-159/mo | DIY | No | Limited |
| Squarespace | $16-49/mo | DIY | No | Limited |
| GoDaddy | $10-25/mo | DIY | No | None |
| Local agency | $2,000-10,000 | 4-8 weeks | Varies | Extra cost |
| **SmartSites T1** | **$249** | **5 days** | **Yes** | **Upgrade path** |

**Our advantage:** Professional build quality at DIY prices, with clear automation upgrade path.

---

## 9. Customer Journey

### Entry Points

```
┌─────────────────────────────────────────────────────────────┐
│ EverIntentSmartSites.com                                    │
│                                                             │
│ Ready to start?     Not sure yet?        Need help?         │
│  [Get Started]    [Strategy Session]    [Book 30min Call]   │
└─────────────────────────────────────────────────────────────┘
```

**Path A: Ready to Buy** → Checkout flow
**Path B: Want Clarity** → SmartStart Strategy Session ($500-$750) → Paid consultation with credit toward purchase
**Path C: Need Help** → GHL calendar booking → 30-min free consultation

### How Buyers Actually Find Us (Persona-Based)

Local service businesses don't search for "T2 package." They experience **trigger events**:

| Trigger Event | What They Say | What They Search |
|---------------|---------------|------------------|
| Lost deal to competitor | "Their website looked more professional" | "web design for [industry]" |
| Slow month | "I'm not getting enough calls" | "how to get more leads" |
| Bad review | "My Google rating dropped" | "reputation management" |
| Missed calls | "I can't answer my phone when I'm working" | "missed call text back" |
| Schedule chaos | "I'm double-booked again" | "online booking for [industry]" |

**Key insight:** They search for **products/solutions**, not tier comparisons. This is why product-category landing pages (Section 16.1) are important for SEO.

### Checkout Flow (All Tiers)

```
Step 1: Pre-Checkout Form
┌─────────────────────────────────────┐
│ Your Information                    │
│ [First Name] [Last Name]            │
│ [Email] [Phone] [Business Name]     │
│                                     │
│ Do you have a domain name?          │
│ ○ Yes → [___________.com]           │
│ ○ No, I need help getting one       │
│                                     │
│ □ I consent to receive SMS/calls    │
│   from EverIntent SmartSites...     │
│                                     │
│ [Continue to Payment]               │
└─────────────────────────────────────┘
→ Save to Supabase
→ Redirect to GHL Checkout with params

Step 2: GHL Checkout (Payment)
┌─────────────────────────────────────┐
│ Smart Site - $249                   │
│ ─────────────────────────────────── │
│ [Card Number]                       │
│ [Exp] [CVC]                         │
│                                     │
│ □ I agree to Terms & Privacy Policy │
│                                     │
│ [Complete Purchase - $249]          │
└─────────────────────────────────────┘
```

**Post-Payment: Intake Form (GHL)**

Domain details are collected in the GHL intake form after payment:

```
┌─────────────────────────────────────┐
│ DOMAIN SETUP                        │
│                                     │
│ [If customer has domain]            │
│ • Enter your domain: __________.com │
│ • Where is it registered?           │
│   ○ GoDaddy ○ Namecheap ○ Other    │
│ • Do you have DNS access? Yes/No    │
│                                     │
│ [If customer needs domain]          │
│ • Preferred domain name: __________│
│ • 2nd choice: _____________________│
│ • 3rd choice: _____________________│
│                                     │
│ We'll purchase and set up your      │
│ domain as part of your site build.  │
└─────────────────────────────────────┘
```

### Post-Payment: Provisioning Flow

```
Payment Success
    ↓
GHL Webhook Fires
    ↓
┌─────────────────────────────────────┐
│ n8n Automated Actions:              │
│                                     │
│ 1. Create GHL sub-account           │
│ 2. Apply tier-specific snapshot     │
│ 3. Create contact record            │
│ 4. Send welcome email with login    │
│ 5. Trigger intake form (collects    │
│    domain preferences)              │
│ 6. Add to onboarding pipeline       │
│ 7. Create ClickUp task for domain   │
│    setup if needed                  │
└─────────────────────────────────────┘
```

---

## 10. Checkout & Billing Architecture

### Platform Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    MARKETING SITE (Vite + React / Vercel Pro)           │
│                    EverIntentSmartSites.com                             │
│                                                                         │
│   - Pre-rendered pages, pricing display                                 │
│   - Pre-checkout form → Supabase                                        │
│   - CTAs redirect to GHL checkout                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼ (CTA redirects)
┌─────────────────────────────────────────────────────────────────────────┐
│                      GHL SaaS MODE CHECKOUT                             │
│                      (Hosted by GoHighLevel)                            │
│                                                                         │
│   URL: https://checkout.smartsites.everintent.com/[tier-slug]           │
│                                                                         │
│   - Stripe connected in GHL                                             │
│   - Handles subscription billing                                        │
│   - URL params carry: tier, contact info                                │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼ (webhook)
┌─────────────────────────────────────────────────────────────────────────┐
│                         n8n AUTOMATION                                  │
│                                                                         │
│   - Sub-account creation                                                │
│   - Intake form trigger (collects domain preferences)                   │
│   - Welcome sequence trigger                                            │
│   - Pipeline stage updates                                              │
└─────────────────────────────────────────────────────────────────────────┘
```

### Stripe Configuration

**Products (in Stripe, synced to GHL):**

| Product | Price | Billing |
|---------|-------|---------|
| Smart Site (T1) | $249 | One-time |
| Smart Lead (T2) | $97 | Monthly |
| Smart Business (T3) | $197 | Monthly |
| Smart Growth (T4) | $497 | Monthly |
| T1 Annual Renewal | $149 | Yearly (after Y1) |

### Usage Rebilling (T2-T4)

**Overage Pricing:**
- SMS: $0.015/message over included
- AI Minutes: $0.10/minute over included
- Emails: $0.001/email over included

**Wallet Model:**
- Auto-recharge when balance < $10
- Default recharge: $50
- Charges deducted from wallet first

---

## 11. GHL Configuration

### SaaS Mode Setup

**Agency Settings:**
- SaaS Mode: Enabled
- Stripe: Connected
- White-label: app.everintentsmartsites.com

### GHL Account Structure

```
GHL Master Account (LocalPros)
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

GHL Sub-Account (per SmartSites customer)
├── Their phone number
├── Their forms
├── Their automations (based on tier snapshot)
├── Their contacts/CRM
└── Their pipeline
```

### LocalPros → SmartSites Conversion Options

When LocalPros partner converts to SmartSites:

| Option | What Happens | Asset Outcome |
|--------|--------------|---------------|
| **Option A: New Site** | Build NEW WordPress site, NEW GHL sub-account | LocalPros site stays LocalPros (new partner or bank leads) |
| **Option B: Site Transfer** | LocalPros site becomes their site, domain transfers/rebrands | Leads go to their sub-account, lose LocalPros asset, gain MRR |
| **Option C: Rent-to-Own** | They "rent" LocalPros site ($297-$497/mo), option to buy after 12 months | Sub-account tied to site, monthly revenue now, potential sale later |

### Plans Configuration

| Plan | Price | Snapshot | Trial |
|------|-------|----------|-------|
| ss-t1-smart-site | $249 one-time | ss-t1-snapshot | None |
| ss-t2-smart-lead | $97/mo | ss-t2-snapshot | None |
| ss-t3-smart-business | $197/mo | ss-t3-snapshot | None |
| ss-t4-smart-growth | $497/mo | ss-t4-snapshot | None |

### Welcome Email Template

```
Subject: Welcome to SmartSites! Here's what happens next.

Hi {first_name},

Your SmartSites order is confirmed! Here's what to expect:

WHAT HAPPENS NEXT:
1. Check your inbox for an intake form (coming in 5 minutes)
2. Fill it out (takes 10 minutes)
3. We build your site in 5 business days
4. You review and we launch

ACCESS YOUR PORTAL:
{portal_login_link}

COMPLETE YOUR INTAKE FORM:
{intake_form_link}

Questions? Reply to this email.

— The SmartSites Team
EverIntent LLC
```

### GHL Custom Fields

| Field | Type | Purpose |
|-------|------|---------|
| tier | Dropdown | T1/T2/T3/T4 |
| website_domain | Text | For "View My Website" link |
| domain_choice | Dropdown | new/existing |
| domain_status | Dropdown | pending/registered/dns_pending/active |
| domain_registrar | Text | namecheap/customer_owned |
| ga4_property_id | Text | For dashboard connection |
| intake_status | Dropdown | pending/complete |
| site_status | Dropdown | building/review/live |
| delivery_date | Date | When site went live |
| renewal_date | Date | T1 annual renewal |

### 11.2 GHL Tags Strategy

All GHL tags are centralized in `supabase/functions/_shared/ghlClient.ts` → `GHL_TAGS` constant.
Tags are **not** user-editable in admin; they are code-managed for consistency.

| Tag | Constant | Applied When |
|-----|----------|--------------|
| `SS: Checkout Started - T1` | `GHL_TAGS.CHECKOUT_T1` | User starts T1 checkout |
| `SS: Checkout Started - T2` | `GHL_TAGS.CHECKOUT_T2` | User starts T2 checkout |
| `SS: Checkout Started - T3` | `GHL_TAGS.CHECKOUT_T3` | User starts T3 checkout |
| `SS: Checkout Started - T4` | `GHL_TAGS.CHECKOUT_T4` | User starts T4 checkout |
| `LP: Partner Apply` | `GHL_TAGS.LOCALPROS_APPLY` | LocalPros partner application |
| `Careers: Application` | `GHL_TAGS.CAREERS_APPLICATION` | Job application submitted |
| `SS: Contact Form` | `GHL_TAGS.CONTACT_FORM` | Contact form submission |
| `DSAR: Data Rights Request` | `GHL_TAGS.DATA_RIGHTS_REQUEST` | CCPA data rights request (45-day SLA) |

**Tag Naming Convention:** `{Category}: {Action/Status}`

---

## 12. Customer Portal Architecture

### T1 Dashboard (Neutered)

**What T1 Customers See:**

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] SmartSites              {user name} ▼                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  DASHBOARD                                                  │
│                                                             │
│  ┌─────────────────────┐  ┌─────────────────────┐          │
│  │ VISITORS THIS MONTH │  │ PAGE VIEWS          │          │
│  │        247          │  │        892          │          │
│  │     ↑ 12% vs last   │  │     ↑ 8% vs last    │          │
│  └─────────────────────┘  └─────────────────────┘          │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │ TOP PAGES                                    │           │
│  │ 1. / (Home) .......................... 312  │           │
│  │ 2. /services ......................... 198  │           │
│  │ 3. /contact .......................... 156  │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
│  ┌─────────────────────────────────────────────┐           │
│  │ 🚀 READY TO GROW?                            │           │
│  │                                              │           │
│  │ Upgrade to Smart Lead and never miss        │           │
│  │ another customer inquiry.                    │           │
│  │                                              │           │
│  │ [See What's Included →]                      │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
│  QUICK LINKS                                                │
│  • View My Website                                          │
│  • Upgrade Your Plan                                        │
│  • Contact Support                                          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### T2-T4 Dashboard

Full GHL dashboard with features enabled per tier snapshot.

---

## 13. GA4 & Analytics

### GA4 Setup Per Customer

1. Create GA4 property: "{Business Name} - SmartSites"
2. Add data stream (web)
3. Install tracking on WordPress site
4. Configure basic events (page_view, scroll, click)
5. Create dashboard with key metrics

### Reporting Delivery

**T1:** Scheduled email PDF from GA4 (monthly)
**T2-T4:** Full GA4 access in GHL dashboard

---

## 14. WordPress Customer Sites

### Build Standards

**Theme:** Starter template (Elementor-based)
**Page Builder:** Elementor Pro
**Hosting:** OVH/Plesk
**SSL:** Let's Encrypt (auto)
**CDN:** Cloudflare (free tier)

### Standard Pages (T1-T4)

1. **Home** - Hero, services overview, testimonials, CTA
2. **Services** - Service list with descriptions
3. **About** - Company story, team (optional)
4. **Contact** - Form, map, phone, hours
5. **Privacy Policy** - Legal page

### Plugin Stack

| Plugin | Purpose |
|--------|---------|
| Elementor Pro | Page building |
| Rank Math | SEO |
| WP-Optimize | Performance |
| Wordfence | Security |
| UpdraftPlus | Backups |
| LeadConnector | GHL integration |

---

## 15. Marketing Site Specification

### 15.1 Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Vite + React 18 + TypeScript |
| Static Site Generation | vite-react-ssg (generates static HTML at build time) |
| SEO Meta Tags | vite-react-ssg `<Head>` component (built-in, replaces react-helmet-async) |
| Hosting | Vercel Pro |
| Database | Supabase (PostgreSQL) |
| Styling | Tailwind CSS + shadcn/ui component library |
| Forms | React Hook Form + Zod validation |
| Auth (admin only) | Supabase Auth |
| Analytics | GA4 + GHL tracking pixels |
| Routing | react-router-dom v6 (data routes format for SSG) |
| Data Fetching | TanStack React Query |

#### SEO Implementation

| Concern | Solution |
|---------|----------|
| Search engine crawling | vite-react-ssg generates static HTML for all marketing pages at build time |
| Per-page meta tags | `<SEO>` component using vite-react-ssg's `<Head>` (title, description, og:image, canonical) |
| Route management | Central `src/routes.tsx` exports react-router-dom data routes for SSG |
| Admin route exclusion | `ssgOptions.includedRoutes` filter in vite.config.ts excludes `/admin/*` |
| Sitemap | Auto-generated sitemap.xml from routes config |
| Robots | robots.txt configured for production |
| Structured data | JSON-LD schemas (LocalBusiness, Organization, Product) |

**Build Command:** `vite-react-ssg build` (replaces standard `vite build`)

**Build Output:** Static HTML files + JS bundles. Vercel serves pre-rendered HTML instantly, then React hydrates for interactivity.

**Future Migration Path:** Codebase structured for clean conversion to Next.js App Router if SSR becomes required.

### 15.1.1 SSG Route Configuration

All marketing pages are pre-rendered at build time via vite-react-ssg. Admin routes are client-side only (excluded from SSG, no SEO needed). Routes are defined in `src/routes.tsx` using react-router-dom data routes format.

```typescript
// src/config/routes.ts
export const routes = {
  // Core pages (pre-rendered)
  home: '/',
  pricing: '/pricing',
  portfolio: '/portfolio',
  about: '/about',
  contact: '/contact',
  bookCall: '/book-call',

  // Services (pre-rendered) - Beautiful Websites is primary/first
  services: {
    hub: '/services',  // Services hub page
    beautifulWebsites: '/beautiful-websites',
    getFoundOnline: '/get-found-online',
    neverMissALead: '/never-miss-a-lead',
    bookMoreJobs: '/book-more-jobs',
    runFromYourPhone: '/run-from-your-phone',
    buildYourReputation: '/build-your-reputation',
    letAiHandleIt: '/let-ai-handle-it',
    domains: '/domains',
  },

  // Features (pre-rendered)
  features: {
    leadCapture: '/features/lead-capture',
    aiChat: '/features/ai-chat',
    reviewManagement: '/features/review-management',
    mobileApp: '/features/mobile-app',
    scheduling: '/features/scheduling',
    analytics: '/features/analytics',
  },

  // Industries (pre-rendered)
  industries: {
    // Hub pages
    homeServices: '/industries/home-services',
    professionalServices: '/industries/professional-services',
    healthWellness: '/industries/health-wellness',
    automotiveServices: '/industries/automotive-services',
    
    // Home Services (25+ verticals)
    hvac: '/industries/home-services/hvac',
    plumbing: '/industries/home-services/plumbing',
    electrical: '/industries/home-services/electrical',
    roofing: '/industries/home-services/roofing',
    landscaping: '/industries/home-services/landscaping',
    cleaning: '/industries/home-services/cleaning',
    painting: '/industries/home-services/painting',
    flooring: '/industries/home-services/flooring',
    remodeling: '/industries/home-services/remodeling',
    pestControl: '/industries/home-services/pest-control',
    poolService: '/industries/home-services/pool-service',
    garageDoors: '/industries/home-services/garage-doors',
    fencing: '/industries/home-services/fencing',
    treeService: '/industries/home-services/tree-service',
    handyman: '/industries/home-services/handyman',
    locksmith: '/industries/home-services/locksmith',
    applianceRepair: '/industries/home-services/appliance-repair',
    carpetCleaning: '/industries/home-services/carpet-cleaning',
    pressureWashing: '/industries/home-services/pressure-washing',
    windowCleaning: '/industries/home-services/window-cleaning',
    gutterCleaning: '/industries/home-services/gutter-cleaning',
    junkRemoval: '/industries/home-services/junk-removal',
    moving: '/industries/home-services/moving',
    glassRepair: '/industries/home-services/glass-repair',
    concreteDriveways: '/industries/home-services/concrete-driveways',
    deckBuilding: '/industries/home-services/deck-building',
    homeInspection: '/industries/home-services/home-inspection',
    waterproofing: '/industries/home-services/waterproofing',
    insulationServices: '/industries/home-services/insulation',
    solarInstallation: '/industries/home-services/solar-installation',
    securitySystems: '/industries/home-services/security-systems',
    
    // Professional Services (15+ verticals)
    legal: '/industries/professional-services/legal',
    realEstate: '/industries/professional-services/real-estate',
    accounting: '/industries/professional-services/accounting',
    insurance: '/industries/professional-services/insurance',
    financialAdvisor: '/industries/professional-services/financial-advisor',
    mortgage: '/industries/professional-services/mortgage',
    photography: '/industries/professional-services/photography',
    videography: '/industries/professional-services/videography',
    marketing: '/industries/professional-services/marketing',
    consulting: '/industries/professional-services/consulting',
    itServices: '/industries/professional-services/it-services',
    webDesign: '/industries/professional-services/web-design',
    eventPlanning: '/industries/professional-services/event-planning',
    interiorDesign: '/industries/professional-services/interior-design',
    propertyManagement: '/industries/professional-services/property-management',
    
    // Health & Wellness (15+ verticals)
    medspa: '/industries/health-wellness/medspa',
    dental: '/industries/health-wellness/dental',
    chiropractic: '/industries/health-wellness/chiropractic',
    physicalTherapy: '/industries/health-wellness/physical-therapy',
    massage: '/industries/health-wellness/massage',
    acupuncture: '/industries/health-wellness/acupuncture',
    optometry: '/industries/health-wellness/optometry',
    veterinary: '/industries/health-wellness/veterinary',
    mentalHealth: '/industries/health-wellness/mental-health',
    personalTraining: '/industries/health-wellness/personal-training',
    yoga: '/industries/health-wellness/yoga',
    martialArts: '/industries/health-wellness/martial-arts',
    salon: '/industries/health-wellness/salon',
    barbershop: '/industries/health-wellness/barbershop',
    spa: '/industries/health-wellness/spa',
    
    // Automotive Services (10+ verticals)
    autoRepair: '/industries/automotive-services/auto-repair',
    autoDetailing: '/industries/automotive-services/auto-detailing',
    tireShop: '/industries/automotive-services/tire-shop',
    oilChange: '/industries/automotive-services/oil-change',
    autoBody: '/industries/automotive-services/auto-body',
    transmission: '/industries/automotive-services/transmission',
    towing: '/industries/automotive-services/towing',
    mobileCarWash: '/industries/automotive-services/mobile-car-wash',
    windowTinting: '/industries/automotive-services/window-tinting',
    audioInstallation: '/industries/automotive-services/audio-installation',
  },

  // Legal (pre-rendered)
  legal: {
    privacy: '/legal/privacy',
    terms: '/legal/terms',
    dataRequest: '/legal/data-request',
  },

  // Pre-checkout (pre-rendered)
  checkout: {
    smartSite: '/checkout/smart-site',
    smartLead: '/checkout/smart-lead',
    smartBusiness: '/checkout/smart-business',
    smartGrowth: '/checkout/smart-growth',
    success: '/checkout/success',
  },

  // LocalPros (pre-rendered)
  localpros: {
    index: '/localpros',
    apply: '/localpros/apply',
  },

  // Upgrade (pre-rendered)
  upgrade: '/upgrade',

  // Admin (CLIENT-SIDE ONLY - not pre-rendered)
  admin: {
    login: '/admin/login',
    dashboard: '/admin',
    submissions: '/admin/submissions',
    portfolio: '/admin/portfolio',
    testimonials: '/admin/testimonials',
  },
  // NOTE: Admin routes are CLIENT-SIDE ONLY and excluded from prerenderRoutes
  // Authentication: Email OTP via Supabase Edge Function (verify-admin-email)
};

// Routes to pre-render (excludes admin)
export const prerenderRoutes = [
  '/',
  '/pricing',
  '/portfolio',
  '/about',
  '/contact',
  '/book-call',
  '/beautiful-websites',
  '/get-found-online',
  '/never-miss-a-lead',
  '/book-more-jobs',
  '/run-from-your-phone',
  '/build-your-reputation',
  '/let-ai-handle-it',
  '/features/lead-capture',
  '/features/ai-chat',
  '/features/review-management',
  '/features/mobile-app',
  '/features/scheduling',
  '/features/analytics',
  
  // Industry Hub Pages
  '/industries/home-services',
  '/industries/professional-services',
  '/industries/health-wellness',
  '/industries/automotive-services',
  
  // Home Services Industries
  '/industries/home-services/hvac',
  '/industries/home-services/plumbing',
  '/industries/home-services/electrical',
  '/industries/home-services/roofing',
  '/industries/home-services/landscaping',
  '/industries/home-services/cleaning',
  '/industries/home-services/painting',
  '/industries/home-services/flooring',
  '/industries/home-services/remodeling',
  '/industries/home-services/pest-control',
  '/industries/home-services/pool-service',
  '/industries/home-services/garage-doors',
  '/industries/home-services/fencing',
  '/industries/home-services/tree-service',
  '/industries/home-services/handyman',
  '/industries/home-services/locksmith',
  '/industries/home-services/appliance-repair',
  '/industries/home-services/carpet-cleaning',
  '/industries/home-services/pressure-washing',
  '/industries/home-services/window-cleaning',
  '/industries/home-services/gutter-cleaning',
  '/industries/home-services/junk-removal',
  '/industries/home-services/moving',
  '/industries/home-services/glass-repair',
  '/industries/home-services/concrete-driveways',
  '/industries/home-services/deck-building',
  '/industries/home-services/home-inspection',
  '/industries/home-services/waterproofing',
  '/industries/home-services/insulation',
  '/industries/home-services/solar-installation',
  '/industries/home-services/security-systems',
  
  // Professional Services Industries
  '/industries/professional-services/legal',
  '/industries/professional-services/real-estate',
  '/industries/professional-services/accounting',
  '/industries/professional-services/insurance',
  '/industries/professional-services/financial-advisor',
  '/industries/professional-services/mortgage',
  '/industries/professional-services/photography',
  '/industries/professional-services/videography',
  '/industries/professional-services/marketing',
  '/industries/professional-services/consulting',
  '/industries/professional-services/it-services',
  '/industries/professional-services/web-design',
  '/industries/professional-services/event-planning',
  '/industries/professional-services/interior-design',
  '/industries/professional-services/property-management',
  
  // Health & Wellness Industries
  '/industries/health-wellness/medspa',
  '/industries/health-wellness/dental',
  '/industries/health-wellness/chiropractic',
  '/industries/health-wellness/physical-therapy',
  '/industries/health-wellness/massage',
  '/industries/health-wellness/acupuncture',
  '/industries/health-wellness/optometry',
  '/industries/health-wellness/veterinary',
  '/industries/health-wellness/mental-health',
  '/industries/health-wellness/personal-training',
  '/industries/health-wellness/yoga',
  '/industries/health-wellness/martial-arts',
  '/industries/health-wellness/salon',
  '/industries/health-wellness/barbershop',
  '/industries/health-wellness/spa',
  
  // Automotive Services Industries
  '/industries/automotive-services/auto-repair',
  '/industries/automotive-services/auto-detailing',
  '/industries/automotive-services/tire-shop',
  '/industries/automotive-services/oil-change',
  '/industries/automotive-services/auto-body',
  '/industries/automotive-services/transmission',
  '/industries/automotive-services/towing',
  '/industries/automotive-services/mobile-car-wash',
  '/industries/automotive-services/window-tinting',
  '/industries/automotive-services/audio-installation',
  
  // Legal & Checkout
  '/legal/privacy',
  '/legal/terms',
  '/legal/data-request',
  '/checkout/smart-site',
  '/checkout/smart-lead',
  '/checkout/smart-business',
  '/checkout/smart-growth',
  '/checkout/success',

  // LocalPros
  '/localpros',
  '/localpros/apply',
  '/localpros/success-stories',

  // Upgrade
  '/upgrade',

  // Services hub
  '/services',
];
```

### 15.2 Database Tables (Supabase)

**checkout_submissions:**
```sql
CREATE TABLE checkout_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  tier TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_name TEXT NOT NULL,
  domain_choice TEXT NOT NULL,
  domain_name TEXT,
  domain_status TEXT DEFAULT 'pending',
  domain_registrar TEXT,
  domain_registered_at TIMESTAMP,
  tcpa_consent BOOLEAN NOT NULL,
  consent_timestamp TIMESTAMP NOT NULL,
  ip_address TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  ghl_checkout_redirected BOOLEAN DEFAULT FALSE,
  ghl_customer_id TEXT,
  status TEXT DEFAULT 'pending'
);
```

**portfolio:**
```sql
CREATE TABLE portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  business_name TEXT NOT NULL,
  industry TEXT NOT NULL,
  location TEXT NOT NULL,
  site_url TEXT NOT NULL,
  thumbnail_url TEXT,
  testimonial_quote TEXT,
  testimonial_name TEXT,
  display_order INTEGER,
  is_active BOOLEAN DEFAULT TRUE
);
```

**testimonials:**
```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP DEFAULT NOW(),
  name TEXT NOT NULL,
  business TEXT,
  quote TEXT NOT NULL,
  rating INTEGER,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT TRUE
);
```

**Role-based Admin Schema:**
```sql
-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- User roles junction table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Allowed admin emails (for OTP whitelist)
CREATE TABLE public.allowed_admin_emails (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id)
);

-- Security definer function (bypasses RLS safely)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$;
```

### 15.3 RLS Policies

```sql
-- Enable RLS on role tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.allowed_admin_emails ENABLE ROW LEVEL SECURITY;

-- user_roles: Only admins can view/modify
CREATE POLICY "Admins can manage roles" ON public.user_roles
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- allowed_admin_emails: Only admins can manage
CREATE POLICY "Admins can manage allowed emails" ON public.allowed_admin_emails
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Portfolio: public read, admin write
CREATE POLICY "Portfolio public read" ON portfolio
  FOR SELECT USING (is_active = true);

CREATE POLICY "Portfolio admin full" ON portfolio
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Testimonials: public read, admin write  
CREATE POLICY "Testimonials public read" ON testimonials
  FOR SELECT USING (is_active = true);

CREATE POLICY "Testimonials admin full" ON testimonials
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Checkout submissions: admin only
CREATE POLICY "Submissions admin only" ON checkout_submissions
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));
```

### 15.4 Admin Portal

**URL:** /admin

**Authentication Flow:**
1. Admin navigates to `/admin/login`
2. Enters email address
3. Supabase Edge Function `verify-admin-email` checks if email exists in `allowed_admin_emails`
4. If valid, triggers `signInWithOtp()` — magic link sent to email
5. Admin clicks link, redirected to `/admin` with active session
6. All admin routes wrapped in `<AdminGuard>` component that verifies `has_role(auth.uid(), 'admin')`

**Edge Function:** `supabase/functions/verify-admin-email/index.ts`

**Features:**
- `/admin` — Dashboard overview
- `/admin/submissions` — View/export checkout submissions
- `/admin/portfolio` — CRUD portfolio items
- `/admin/testimonials` — CRUD testimonials

**Security:**
- No password storage
- Email OTP only (phishing-resistant)
- Role checked server-side via `has_role()` function
- Admin emails whitelisted in `allowed_admin_emails` table

---

## 16. Sitemap

### 16.1 Product-Category Landing Pages (NEW in v33)

These pages exist for SEO — buyers search "SEO services" not "tier comparison":

| Product Category | URL | Buyer Search Intent |
|------------------|-----|---------------------|
| Web Design | `/services/web-design` | "web design for [industry]" |
| Local SEO | `/services/seo` | "SEO services", "local SEO" |
| Reputation Management | `/services/reputation` | "reputation management", "get more reviews" |
| AI Automation | `/services/ai-automation` | "AI for small business", "AI receptionist" |
| Online Booking | `/services/booking` | "online scheduling", "appointment booking" |

Each product page should:
- Explain what the product does (outcome-focused)
- Show standalone pricing
- Show which packages include this product
- Have its own conversion path

**Note:** Main Services dropdown continues to use benefit-oriented routes (`/get-found-online`, etc.). These product-category pages are additional SEO entry points.

### Marketing Site (everintentsmartsites.com)

```
/                               # Homepage
├── /beautiful-websites/        # Hero service page
├── /pricing/                   # Tier comparison + CTAs
├── /strategy-session/          # SmartStart Strategy Session booking (NEW)
├── /checkout/
│   ├── /smart-site/            # T1 pre-checkout
│   ├── /smart-lead/            # T2 pre-checkout
│   ├── /smart-business/        # T3 pre-checkout
│   ├── /smart-growth/          # T4 pre-checkout
│   ├── /smart-launch/          # Smart Launch pre-checkout (NEW)
│   └── /success/               # Post-payment success
├── /services/                  # Services hub
│   ├── /web-design/            # Product category page (NEW)
│   ├── /seo/                   # Product category page (NEW)
│   ├── /reputation/            # Product category page (NEW)
│   ├── /ai-automation/         # Product category page (NEW)
│   ├── /booking/               # Product category page (NEW)
│   ├── /get-found-online/      # Benefit page (existing)
│   ├── /never-miss-a-lead/
│   ├── /book-more-jobs/
│   ├── /run-from-your-phone/
│   ├── /build-your-reputation/
│   └── /let-ai-handle-it/
├── /features/                  # Feature deep-dives (SEO pages)
│   ├── /lead-capture/
│   ├── /ai-chat/
│   ├── /review-management/
│   ├── /mobile-app/
│   ├── /scheduling/
│   └── /analytics/
├── /industries/                # Industry landing pages
│   ├── /home-services/         # Hub: Home Services
│   │   ├── /hvac/
│   │   ├── /plumbing/
│   │   ├── /electrical/
│   │   ├── /roofing/
│   │   ├── /landscaping/
│   │   ├── /cleaning/
│   │   ├── /painting/
│   │   ├── /flooring/
│   │   ├── /remodeling/
│   │   ├── /pest-control/
│   │   ├── /pool-service/
│   │   ├── /garage-doors/
│   │   ├── /fencing/
│   │   ├── /tree-service/
│   │   ├── /handyman/
│   │   ├── /locksmith/
│   │   ├── /appliance-repair/
│   │   ├── /carpet-cleaning/
│   │   ├── /pressure-washing/
│   │   ├── /window-cleaning/
│   │   ├── /gutter-cleaning/
│   │   ├── /junk-removal/
│   │   ├── /moving/
│   │   ├── /glass-repair/
│   │   ├── /concrete-driveways/
│   │   ├── /deck-building/
│   │   ├── /home-inspection/
│   │   ├── /waterproofing/
│   │   ├── /insulation/
│   │   ├── /solar-installation/
│   │   └── /security-systems/
│   ├── /professional-services/ # Hub: Professional Services
│   │   ├── /legal/
│   │   ├── /real-estate/
│   │   ├── /accounting/
│   │   ├── /insurance/
│   │   ├── /financial-advisor/
│   │   ├── /mortgage/
│   │   ├── /photography/
│   │   ├── /videography/
│   │   ├── /marketing/
│   │   ├── /consulting/
│   │   ├── /it-services/
│   │   ├── /web-design/
│   │   ├── /event-planning/
│   │   ├── /interior-design/
│   │   └── /property-management/
│   ├── /health-wellness/       # Hub: Health & Wellness
│   │   ├── /medspa/
│   │   ├── /dental/
│   │   ├── /chiropractic/
│   │   ├── /physical-therapy/
│   │   ├── /massage/
│   │   ├── /acupuncture/
│   │   ├── /optometry/
│   │   ├── /veterinary/
│   │   ├── /mental-health/
│   │   ├── /personal-training/
│   │   ├── /yoga/
│   │   ├── /martial-arts/
│   │   ├── /salon/
│   │   ├── /barbershop/
│   │   └── /spa/
│   └── /automotive-services/   # Hub: Automotive Services
│       ├── /auto-repair/
│       ├── /auto-detailing/
│       ├── /tire-shop/
│       ├── /oil-change/
│       ├── /auto-body/
│       ├── /transmission/
│       ├── /towing/
│       ├── /mobile-car-wash/
│       ├── /window-tinting/
│       └── /audio-installation/
├── /our-work/                  # Live sites as proof (renamed from /portfolio/)
├── /about/                     # Company story
├── /contact/                   # Contact form + "Book a Call" destination
├── /careers/                   # Job listings (NEW)
│   └── /:slug/                 # Individual job posting
├── /localpros/                 # Partner program
│   ├── /apply/
│   └── /success-stories/
├── /legal/
│   ├── /privacy/
│   ├── /terms/
│   ├── /cookies/               # Cookie preferences page
│   └── /data-request/          # DSAR
├── /upgrade/                   # T1 upsell page
└── /admin/                     # Admin portal (protected)
    ├── /login/
    ├── /submissions/
    ├── /portfolio/
    ├── /testimonials/
    └── /careers/               # Jobs CRUD (NEW)
```

### Customer Portal (GHL)

```
app.everintentsmartsites.com/
├── /dashboard/
├── /contacts/                  # T2+
├── /conversations/             # T2+
├── /calendar/                  # T3+
├── /opportunities/             # T3+
├── /reputation/                # T3+ (basic), T4 (full)
├── /settings/
│   └── /company-billing/       # All tiers
└── /support/
```

### Primary Navigation (Desktop)

```
[EverIntent Logo + "Web Design AI & Automation"] | Smart Websites ▼ | AI & Automation | Industries ▼ | Solutions ▼ | Pricing | Our Work | About | [Get Started]
```

**Changes from v33.0 (Brand Pivot):**
- Logo: "EverIntent" with tagline "Web Design AI & Automation"
- "Services" renamed to "Smart Websites" (top nav item)
- "AI & Automation" added as second nav item
- "Solutions" nav item added (links to verticals like Legal AI)
- "Portfolio" renamed to "Our Work"

**Smart Websites Dropdown:**
1. **Smart Websites** ← renamed from "Beautiful Websites"
2. **Let AI Handle It** ← elevated to position 2
3. Get Found Online (SEO)
4. Capture More Leads
5. Reputation Management
6. Social Media Management
7. Content Marketing

**AI & Automation:** Single link to `/services/ai-automation`

**Industries Dropdown:**
1. Home Services
2. Professional Services
3. Health & Wellness
4. Automotive Services

**Solutions Dropdown:**
1. For Law Firms → `https://everintentlegalai.com` (external)
2. Future vertical packages
3. InfoTrust and other products

### Mobile Navigation

```
[EverIntent Logo]         [☰]
                           │
                           ▼
┌─────────────────────────┐
│ Smart Websites         >│
│ AI & Automation         │
│ Industries             >│
│ Solutions              >│
│ Pricing                 │
│ Our Work                │
│ About                   │
│ ─────────────────────── │
│ [Get Started]           │
└─────────────────────────┘
```

### Footer Navigation

**4-Column Navigation Grid (Desktop) / 2-Column (Mobile):**

| Solutions | Packages | Resources | Company |
|-----------|----------|-----------|---------|
| Smart Websites | Smart Site | LocalPros Network | About |
| AI & Automation | Smart Lead | Help | Contact |
| For Law Firms → | Smart Business | FAQ | **Our Work** |
| (external link) | Smart Growth | Support | **Careers** |
|  | Smart Launch | | |
|  | Strategy Session | | |

**Changes from v33.0 (Brand Pivot):**
- **"Products" column → "Solutions" column**
- "For Law Firms" links to `https://everintentlegalai.com` (external)
- Footer tagline: "Web Design AI & Automation"
- Copyright: "© 2025 EverIntent LLC. All rights reserved."

**Solutions Column Links:**
- Smart Websites → `/pricing`
- AI & Automation → `/services/ai-automation`
- For Law Firms → `https://everintentlegalai.com` (external, opens new tab)

**Package Links** → `/checkout/*` pages (direct conversion paths):
- Smart Site → `/checkout/smart-site`
- Smart Lead → `/checkout/smart-lead`
- Smart Business → `/checkout/smart-business`
- Smart Growth → `/checkout/smart-growth`
- Smart Launch → `/checkout/smart-launch`
- Strategy Session → `/strategy-session`

**Footer restructured in v34 per Brand Pivot:**
- Header uses "Smart Websites" dropdown for buyer journey
- Footer "Solutions" column provides product-focused paths
- Industries removed from footer (accessible via header dropdown and `/industries/*` pages)

**Branded Footer Section (below nav columns):**
- SmartSites logo
- "Book a Call" button → `/contact`
- Social icons (if applicable)
- Contact information: email, phone, address
- Horizontal divider
- Centered legal links row: Privacy (`/legal/privacy`) | Cookies (`/legal/cookies`) | Terms (`/legal/terms`) | Data Rights (`/legal/data-request`)
- Copyright: "© 2025 SmartSites by EverIntent LLC. All rights reserved."
- Tagline: "Professional websites for local businesses."
- Call recording disclosure

**Footer Legal Links Behavior:**
- Privacy, Terms, Data Rights → Navigate to respective pages
- "Cookie Preferences" button → Triggers consent banner modal via `window.dispatchEvent(new Event('cookie-consent-changed'))`

### CTA Strategy

- **"Get Started"**: Primary marketing CTA, used in header and key conversion points → `/pricing`
- **"Book a Call"**: General site-wide CTA for consultations → `/contact` (not a separate route)
- No `/book-call` route; all "Book a Call" CTAs point to `/contact`

---

## 17.4 NavHoverMenu Component Specification

Desktop navigation dropdowns use a custom `NavHoverMenu` component with icons and descriptions.

### Data Structure

```typescript
interface NavHoverItem {
  to: string;              // Route path
  title: string;           // Main text (e.g., "Beautiful Websites")
  description?: string;    // Sub-text line (e.g., "Professional 5-page site")
  icon?: LucideIcon;       // Lucide icon component
  nestedItems?: NavHoverItem[]; // For nested submenus (future)
}
```

### Icon Implementation

Icons are Lucide React components passed directly in the `icon` property:

```tsx
{item.icon && <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />}
```

- **Color**: `text-primary` (gold/accent color from design system)
- **Size**: `h-5 w-5` (20px)
- **Alignment**: `shrink-0 mt-0.5` (prevents squishing, aligns with first text line)

### Menu Item Layout

```tsx
<Link
  to={item.to}
  className="flex items-start gap-3 px-4 py-3 hover:bg-accent transition-colors"
>
  {item.icon && <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />}
  <div className="flex flex-col gap-0.5">
    <span className="font-medium text-foreground">{item.title}</span>
    {item.description && (
      <span className="text-xs text-muted-foreground">{item.description}</span>
    )}
  </div>
</Link>
```

- **`items-start`**: Aligns icon to top (important with multi-line text)
- **`gap-3`**: Space between icon and text column
- **`gap-0.5`**: 2px gap between title and description

### Dropdown Container

```tsx
<div className="absolute top-full left-0 w-80 bg-background border border-border rounded-lg shadow-lg z-50">
  {items.map(item => /* menu item */)}
</div>
```

- **Fixed width**: `w-80` (320px)
- **Background**: `bg-background` (solid, NOT transparent)
- **Z-index**: `z-50` (overlays content)
- **Shadow**: `shadow-lg` (depth)
- **Border**: `border border-border` (subtle outline)

### Design System Tokens Used

| Token | Purpose |
|-------|---------|
| `--primary` | Icon color (gold/accent) |
| `--foreground` | Title text color |
| `--muted-foreground` | Description text color |
| `--background` | Solid dropdown background |
| `--accent` | Hover state background |
| `--border` | Subtle dropdown border |

### Smart Websites Dropdown Items (Updated v34)

| Title | Description | Icon |
|-------|-------------|------|
| **Smart Websites** | Professional smart websites starting at $249 | `Globe` |
| **Let AI Handle It** | AI automation and voice agents | `Bot` |
| Get Found Online | SEO and local search visibility | `Search` |
| Capture More Leads | Lead capture and follow-up | `MessageSquare` |
| Reputation Management | Review automation | `Star` |
| Social Media Management | Social presence management | `Share2` |
| Content Marketing | Blog and content strategy | `FileText` |

---

## 17.5 Chat Widget & Support Bot

### Multi-Widget Architecture

SmartSites uses **multiple GHL chat widgets** with different training/personas based on page type. This showcases the AI chatbot capabilities available to customers.

| Widget Type | Env Variable | Pages | Purpose |
|-------------|--------------|-------|---------|
| Sales Bot | `VITE_GHL_WIDGET_ID_SALES` | `/pricing`, `/checkout/*` | Conversion-focused, handles pricing questions, upsells |
| Support Bot | `VITE_GHL_WIDGET_ID_SUPPORT` | `/contact`, `/legal/*`, `/help` | FAQ, support inquiries, data requests |
| Demo Bot | `VITE_GHL_WIDGET_ID_DEMO` | Homepage, services, industries | Feature showcase, capability demonstration |

### Desktop Chat Button
- Floating button, bottom-right corner
- Fade-up animation on page load (delayed after consent)
- Opens appropriate GHL chat widget based on current route
- Gated by cookie consent: button hidden until user accepts cookies
- Styled to match SmartSites design system (accent color, primary background)

### Mobile Chat Access
- Chat integrated into mobile bottom navbar (not floating button)
- Also gated by cookie consent
- Navbar visibility tied to consent state
- Same route-based widget selection as desktop

### GHL Integration Requirements
- `VITE_GHL_LOCATION_ID` - Shared location ID across all widgets
- `VITE_GHL_WIDGET_ID_SALES` - Sales bot widget ID
- `VITE_GHL_WIDGET_ID_SUPPORT` - Support bot widget ID  
- `VITE_GHL_WIDGET_ID_DEMO` - Demo bot widget ID
- All stored in Vercel environment variables
- Widget selection determined by current route in `GHLChatWidget.tsx`
- Chat widget loads after cookie consent accepted
- Launcher hiding via JS shadow DOM penetration (code-based approach)
- Reference implementation: https://everintentlegalai.com

### GHL Shadow DOM Styling Pattern

GHL chat widgets use nested shadow DOM components that encapsulate their styles. To override styling (e.g., invisible send button, missing textarea caret), inject CSS directly into the shadow root.

**Shadow DOM Structure:**
```
chat-widget (shadowRoot)
  └─ chat-pane (shadowRoot)
       └─ chat-input (shadowRoot)
            ├─ textarea.native-textarea.sc-ion-textarea-ios
            └─ button.live-chat-send-button
```

**Implementation Pattern (`src/lib/ghlLoader.ts`):**

1. **Traverse nested shadow roots** to reach the target elements:
```typescript
function getComposerShadowRoot(): ShadowRoot | null {
  const widget = document.querySelector('chat-widget');
  const root1 = widget?.shadowRoot;
  if (!root1) return null;
  
  const chatPane = root1.querySelector('chat-pane');
  const root2 = chatPane?.shadowRoot;
  if (!root2) return null;
  
  const chatInput = root2.querySelector('chat-input');
  return chatInput?.shadowRoot ?? null;
}
```

2. **Inject a `<style>` element** into the shadow root with `!important` overrides:
```typescript
function injectGHLComposerFix(): boolean {
  const shadowRoot = getComposerShadowRoot();
  if (!shadowRoot) return false;
  
  if (!shadowRoot.getElementById('custom-fix-styles')) {
    const style = document.createElement('style');
    style.id = 'custom-fix-styles';
    style.textContent = `
      textarea.native-textarea.sc-ion-textarea-ios {
        caret-color: rgba(255,255,255,0.95) !important;
        /* ... other overrides */
      }
      button.live-chat-send-button {
        background-color: rgba(99,102,241,0.95) !important;
        opacity: 1 !important;
      }
    `;
    shadowRoot.appendChild(style);
  }
  return true;
}
```

3. **Use timed retries** because GHL mounts shadow components lazily:
```typescript
function applyGHLComposerFixRetries(): void {
  injectGHLComposerFix();
  setTimeout(injectGHLComposerFix, 250);
  setTimeout(injectGHLComposerFix, 750);
  setTimeout(injectGHLComposerFix, 1500);
  setTimeout(injectGHLComposerFix, 2500);
}
```

4. **Add event guards** for UX issues (e.g., block right-click sending):
```typescript
shadowRoot.addEventListener('contextmenu', (e) => {
  if ((e.target as HTMLElement)?.closest?.('button.live-chat-send-button')) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);
```

5. **SSG Safety**: Always guard with `isBrowser()` check before DOM access:
```typescript
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
```

**Key Selectors (verified via DevTools):**
| Element | Selector |
|---------|----------|
| Textarea | `textarea.native-textarea.sc-ion-textarea-ios` |
| Send button | `button.live-chat-send-button` |
| Launcher bubble | `button.lc_text-widget--bubble` |

**Known Issues Fixed:**
- Send button `background-color: #524bae00` (fully transparent)
- Textarea missing `caret-color` (invisible cursor)
- No focus indication on textarea
- Right-click on send button triggers send

### GHL Chat Widget Theming Integration

GHL chat widget colors are now **theme-aware** and configurable via the admin Themes panel.

**CSS Custom Properties (set in `:root`):**
| Variable | Purpose |
|----------|---------|
| `--ghl-textarea-bg` | Textarea background color |
| `--ghl-textarea-text` | Textarea text and caret color |
| `--ghl-textarea-border` | Textarea border (unfocused) |
| `--ghl-textarea-focus-border` | Textarea border when focused |
| `--ghl-textarea-focus-glow` | Focus ring/glow effect |
| `--ghl-send-button-bg` | Send button background |
| `--ghl-send-button-border` | Send button border |
| `--ghl-send-button-icon` | Send button SVG icon stroke |
| `--ghl-selection-bg` | Text selection highlight |

**Admin Controls:**
- Located in Themes page → "GHL Chat Widget" accordion section
- Each color has: color picker, HSL string input, H/S/L sliders with increment buttons
- "Sync with Accent" button derives interactive colors from theme accent
- "Reset to Theme Defaults" derives all colors from base theme colors
- Live preview shows textarea + send button appearance

**Database Storage:**
- `site_themes.ghl_chat_config` (JSONB) stores all 9 color values
- Published to production via `themes.ts` and applied in `applyThemeToRoot()`

**Implementation Files:**
- `src/lib/ghlLoader.ts` - `getGHLThemeColors()` reads CSS vars, `injectGHLComposerFix()` applies them
- `src/index.css` - CSS variable definitions with fallbacks
- `src/pages/admin/Themes.tsx` - `GhlColorControl` component for admin UI
- `src/config/themes.ts` - `applyThemeToRoot()` sets CSS vars on document root

### Route-to-Widget Mapping Logic

```typescript
function getWidgetIdForRoute(pathname: string): string {
  // Sales bot for conversion pages
  if (pathname.startsWith('/pricing') || pathname.startsWith('/checkout')) {
    return import.meta.env.VITE_GHL_WIDGET_ID_SALES;
  }
  // Support bot for help/legal pages
  if (pathname.startsWith('/contact') || pathname.startsWith('/legal') || pathname.startsWith('/help')) {
    return import.meta.env.VITE_GHL_WIDGET_ID_SUPPORT;
  }
  // Demo bot for everything else (homepage, services, industries)
  return import.meta.env.VITE_GHL_WIDGET_ID_DEMO;
}
```

---

## 17.6 Legal Pages

### Route Structure
| Route | Page | Description |
|-------|------|-------------|
| `/legal/privacy` | Privacy Policy | Standard privacy policy |
| `/legal/terms` | Terms of Service | Service terms and conditions |
| `/legal/data-request` | Data Rights | CCPA data request form |
| `/legal/cookies` | Cookie Preferences | Interactive cookie management page |

### Cookie Preferences Page (`/legal/cookies`)
**Reference:** https://everintentlegalai.com/cookies

**Features:**
- Interactive toggle switches for cookie categories
- Categories: Essential (always on), Analytics, Marketing, Functional
- Save preferences button
- Clear explanation of each cookie type
- Preferences persisted to localStorage
- Triggers `cookie-consent-changed` event on save

### Cookie Consent Banner
- Appears on first visit (no consent stored)
- Can be re-triggered via footer "Cookie Preferences" button
- Options: Accept All, Reject All, Customize (opens `/legal/cookies`)
- Consent state gates chat widget and certain tracking

---

## 18. Domain Integration Architecture

### 18.1 Overview

Domain setup is handled manually during the onboarding process, not via API integration. This approach was chosen to reduce technical complexity, eliminate infrastructure costs (static IP requirements), and allow flexibility in domain sourcing.

**Key Decision (December 2024):** GHL does not have a public API for domain search/purchase. Namecheap API requires static IP whitelisting, adding infrastructure complexity. Moving domain selection to post-payment onboarding simplifies checkout while maintaining full service delivery.

### 18.2 GHL Domain Capabilities

| Capability | Available | Notes |
|------------|:---------:|-------|
| UI Domain Purchase | ✅ | Enable at Agency Level → Settings → Company → Domain Purchase |
| Domain API | ❌ | No public API for programmatic domain operations |
| DNS Management | ✅ | Managed in GHL after domain purchase |
| Rebilling | ✅ | Available on $497/mo plan |

### 18.3 Domain Flow (Manual Process)

```
┌─────────────────────────────────────────────────────────────────┐
│                    DOMAIN FLOW - MANUAL                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. PRE-CHECKOUT (Marketing Site)                                │
│  ┌─────────────────────────────────────┐                       │
│  │ Simple yes/no question:             │                       │
│  │ "Do you have a domain name?"        │                       │
│  │ ○ Yes → [enter domain]              │                       │
│  │ ○ No, I need help getting one       │                       │
│  └─────────────────────────────────────┘                       │
│                        │                                        │
│  2. POST-PAYMENT (GHL Intake Form)                              │
│  ┌─────────────────────────────────────┐                       │
│  │ If customer has domain:             │                       │
│  │ • Confirm domain name               │                       │
│  │ • Where is it registered?           │                       │
│  │ • Do you have DNS access?           │                       │
│  │                                     │                       │
│  │ If customer needs domain:           │                       │
│  │ • 1st choice: ________________      │                       │
│  │ • 2nd choice: ________________      │                       │
│  │ • 3rd choice: ________________      │                       │
│  └─────────────────────────────────────┘                       │
│                        │                                        │
│  3. TEAM PURCHASE (During 5-Day Build)                          │
│  ┌─────────────────────────────────────┐                       │
│  │ Options:                            │                       │
│  │ A) GHL Dashboard (if pricing good)  │                       │
│  │ B) Namecheap Dashboard (if better)  │                       │
│  │ C) Other registrar as needed        │                       │
│  │                                     │                       │
│  │ → Purchase takes ~1 minute          │                       │
│  │ → Configure DNS to Plesk            │                       │
│  │ → Update GHL contact custom field   │                       │
│  └─────────────────────────────────────┘                       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 18.4 Benefits of Manual Approach

| Benefit | Description |
|---------|-------------|
| **No API Integration** | No Namecheap API, no static IP costs, no maintenance |
| **Simpler Checkout** | Fewer steps, less friction, higher conversion |
| **Flexibility** | Team can shop best domain price (GHL vs Namecheap vs other) |
| **Lower Technical Risk** | No checkout failures due to domain API issues |
| **Faster MVP** | Ship without complex domain search UI |

### 18.5 n8n Workflow (Simplified)

```yaml
# Trigger: GHL Webhook (new customer payment)
workflow_name: "SmartSites - New Customer"

nodes:
  - name: "Webhook Trigger"
    type: "Webhook"
    parameters:
      httpMethod: "POST"
      path: "smartsites-payment"
    
  - name: "Check Domain Needed"
    type: "IF"
    parameters:
      conditions:
        - leftValue: "{{ $json.has_domain }}"
          operation: "equals"
          rightValue: "no"
    
  - name: "Create ClickUp Task (Domain Needed)"
    type: "HTTP Request"
    parameters:
      method: "POST"
      url: "https://api.clickup.com/api/v2/list/{{ $env.CLICKUP_LIST_ID }}/task"
      headers:
        Authorization: "{{ $env.CLICKUP_API_KEY }}"
      body:
        name: "Domain Setup: {{ $json.business_name }}"
        description: |
          Customer needs domain setup.
          
          Preferred names (from intake form):
          1. {{ $json.domain_pref_1 }}
          2. {{ $json.domain_pref_2 }}
          3. {{ $json.domain_pref_3 }}
          
          Purchase from GHL or Namecheap, whichever has better pricing.
          Configure DNS to Plesk after purchase.
        assignees: []
        tags: ["domain-setup", "{{ $json.tier }}"]
        priority: 2
```

### 18.6 Cost Analysis

| Approach | Domain Cost | Our Price | Complexity | Status |
|----------|-------------|-----------|------------|--------|
| Manual (GHL) | ~$12-15/yr | $0 (included) | Low | **Implemented** |
| Manual (Namecheap) | ~$9/yr | $0 (included) | Low | **Implemented** |
| API (Namecheap) | ~$9/yr | $0 (included) | Medium-High | **Deferred** |

**Decision:** Domain registration is included in all tiers as a value-add. Manual purchase allows flexibility and eliminates API complexity. The 1-minute purchase time per customer is negligible during the 5-day build window.

### 18.7 What Changed from Original BRD

| Section | Before | After |
|---------|--------|-------|
| Checkout Step 2 | Domain search/selection via Namecheap API | Simple yes/no + text field |
| Post-Payment | Auto-purchase via Namecheap API | Team purchases via GHL or Namecheap UI |
| Intake Form | Confirm domain selection | Collect domain preferences if needed |
| n8n Automation | Domain purchase trigger | Notification/task creation only |
| /domains Page | Domain search utility | **Removed from scope** |
| Environment Variables | Namecheap API credentials | Not required |

### 18.8 Future Considerations

If volume increases significantly (100+ domains/month), revisit API automation:
- Namecheap API requires $50 account balance or 20 domains to enable
- Static IP whitelisting adds Vercel Pro infrastructure cost
- Consider GHL becoming API-enabled in future updates

For MVP and near-term growth, manual process is the right choice.

## 19. Go-To-Market Strategy

### 19.1 Product-First Positioning (NEW in v33)

Products are primary, packages bundle them. Each segment has a primary product they search for:

| Segment | Pain Point | Primary Product | Package Entry | Price |
|---------|------------|-----------------|---------------|-------|
| Legitimacy-focused | "I need a professional website" | Web Design | Starter Site (T1) | $249 |
| Lead-focused | "I'm missing calls and leads" | Lead Capture | Lead Booster (T2) | $97/mo |
| Operations-focused | "My schedule is chaos" | Online Booking | Booking & Reputation (T3) | $197/mo |
| Growth-focused | "I want AI to help" | AI Automation | AI Growth (T4) | $497/mo |
| Premium DIY | "I need more than template" | Custom Web + Sprint | **Smart Launch** | $2,500+ |
| Bespoke | "I want fully custom" | Custom Design | Custom | $5,000+ |
| Uncertain | "Not sure what I need" | Discovery | **SmartStart Session** | $500-750 |

### 19.2 Standalone Product Campaigns

Buyers with existing sites can purchase products à la carte:

| Campaign | Product | Target | Entry Point | Price |
|----------|---------|--------|-------------|-------|
| "Get Found" | SEO Sprint (3-month) | Existing site owners | `/services/seo` | $1,500 |
| "More Reviews" | Reputation Management | T1/T2 customers | `/services/reputation` | $100/mo |
| "AI Reception" | AI Voice Agent | T3 customers | `/services/ai-automation` | $300/mo |
| "More Traffic" | Google Ads Management | Any business | `/services/ads` | $500/mo + spend |

### 19.3 Channel Strategy

**Primary Channels:**
1. **Craigslist** - "Services > Computer" in target markets
2. **Facebook** - Local business groups, marketplace
3. **Trade Groups** - Industry-specific forums and associations

### Target Markets (Phase 1)

1. Phoenix, AZ
2. Dallas, TX
3. Houston, TX
4. Atlanta, GA

### Ad Copy Framework

**Headline Pattern:** [Pain Point] + [Solution] + [Price]

**Example:**
```
Need a Website That Actually Gets You Calls?
Professional 5-page site. Built in 5 days. $249.
No monthly fees. You own everything.
→ everintentsmartsites.com
```

### UTM Structure

```
utm_source=craigslist|facebook|tradegroup
utm_medium=organic|paid|referral
utm_campaign=phoenix-hvac|dallas-roofing|etc
utm_content=ad-variant-a|ad-variant-b
```

---

## 20. LocalPros Network

### Overview

LocalPros is a portfolio of lead-generation websites in target markets. EverIntent builds and owns these sites, monetizing through lead sales, site rental, or as an ice-breaker to SmartSites conversion. **Same WordPress build as customer sites. Same GHL automations. Different monetization based on the relationship.**

### Core Tech Stack Reality

| Component | Technology | Notes |
|-----------|------------|-------|
| LocalPros Sites | WordPress on Plesk/OVH | Same build as SmartSites customer sites |
| Lead Capture | GHL Master Account | All LocalPros leads funnel here |
| Customer Sites | WordPress on Plesk/OVH | Same templates, same Elementor, same plugins |
| Customer Portal | GHL Sub-Account | One per SmartSites customer (T1-T4) |
| AI Voice/SMS | GHL Master Account | Voice bot, automations in master |

### Three Revenue Paths From One Asset

One ranking WordPress site. Three ways to make money:

#### Path 1: Sell Leads
```
Site ranks → Calls/forms come in → GHL captures → We sell to partner

Revenue: $25-150 per lead
Effort: Near zero (site already built and ranking)
GHL: Leads in master account, distributed via automation
WordPress: No changes needed
```
**Easy money:** Site exists, traffic exists, leads exist. Just find a buyer.

#### Path 2: Sell or Rent the Site
```
Option A: SELL ($2K-$10K one-time)
- Transfer domain + hosting to buyer
- They own everything
- We're done (unless they want SmartSites services)

Option B: RENT ($297-$497/month)
- We keep ownership
- They get the leads + can rebrand
- Basically T2-T4 pricing for a site that ALREADY RANKS
- GHL: They get sub-account tied to that site
- WordPress: We maintain, they use
```
**Easy money:** Someone wants instant presence without waiting for SEO. We have it. Premium price.

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
**Easy money:** The "free" leads cost us nothing (site already gets traffic). The conversion to SmartSites is worth $2,364-$5,964/year.

### Decision Framework: What Happens to the LocalPros Site?

| Scenario | What We Do | Why |
|----------|------------|-----|
| Partner just wants leads | Path 1, keep site as LocalPros | Recurring lead revenue |
| Partner wants instant presence | Path 2B, rent the site | Monthly rent > lead sales |
| Partner wants to OWN it | Path 2A, sell outright | One-time cash, relationship continues |
| Partner wants THEIR OWN brand | Path 3, build new SmartSites | Keep LocalPros asset, gain MRR |
| Partner goes cold | Find new partner for leads | Asset never dies |

### The "Easy Money" Map

| Stage | Easy Money | GHL Action | WordPress Action |
|-------|------------|------------|------------------|
| Site ranks, no partner yet | Bank leads, sell later | Leads in master pipeline | None |
| Partner prospect | Give 3-5 free leads | Tag in pipeline | None |
| Partner active | Sell leads $25-150 each | Distribute via automation | None |
| Partner wants more | Rent site $297-497/mo | Create sub-account | Rebrand if needed |
| Partner wants to own | Sell site $2K-10K | Transfer or close | Transfer hosting |
| Partner ready for SmartSites | Sell T2-T4 tier | New sub-account | Build new site |

**Every box makes money or leads to money.**

### Lead Pricing (Tiered by Vertical Value)

| Category | Lead Price | Rationale |
|----------|------------|-----------|
| Home Services | $25-50 | High volume, lower job value |
| Automotive | $30-50 | Medium volume, medium value |
| Health & Wellness | $50-100 | Lower volume, higher job value |
| Professional Services | $75-150 | Low volume, high job value |

**Flexibility:** ±20% based on market/demand. Phoenix HVAC may be $40, NYC HVAC may be $60.

### Territory Policy

**Exclusive by default.** One partner per site/market.

Why: It's the selling point. "You get ALL the leads from this site."

If partner underperforms (accepts <70% of leads), we warn, then open to second partner.

### Conversion Trigger

**20 leads delivered OR 90 days active, whichever comes first.**

System flags in GHL pipeline. Human makes the call. Script:

> "You've gotten [X] leads from us. Closed about [$Y] in business. Ready to have your OWN site doing this? I can have it live in 5 days."

### Site Expansion Policy

**Demand-driven only.**

Don't build spec. When we have a prospect in a niche/market we don't have, we build it. Lead already warm. Site pays for itself immediately.

Exception: If a vertical shows high search volume + high lead value (dental implants, personal injury), spec build may be worth it.

### Conversion Incentive

**Credit model.** Last 30 days of lead spend applies to first month of SmartSites.

Example: Partner spent $400 on leads last month. They sign up for T3 ($347/mo). First month is covered, $53 credit toward month 2.

Psychology: "You're not starting over. You're upgrading."

### Site Structure

- Domain: [city][service].com (e.g., phoenixhvacpros.com)
- Built on WordPress (same stack as customer sites)
- Lead capture → GHL Master Account → Lead routing via automation

### Partner Requirements

- Active business license
- Insurance (GL minimum $1M)
- Positive reviews (3.5+ stars)
- Response SLA (< 15 minutes)

### Pages Required on SmartSites.com

| Route | Purpose | Traffic Source |
|-------|---------|----------------|
| `/localpros` | Landing page for cold outreach recipients | Email/call links |
| `/localpros/apply` | Interest form | CTA from landing page |

**Not in main nav.** Different audience. Traffic comes from outbound, not organic browse.

### Landing Page Content Strategy

1. **Validate:** "Yes, we have ranking sites in [verticals]"
2. **Prove:** Show 3-4 live sites with screenshots
3. **Offer:** "Get exclusive leads. Pay per lead. No contracts."
4. **Capture:** Simple form (name, email, phone, niche, market)
5. **Bridge:** "When you're ready to own your presence, we build SmartSites."

### Navigation Placement

**Footer → Resources column.**

Label: "LocalPros Network" or "Partner Program"

---

## 21. Compliance & Legal

### 21.1 Legal Pages (Standard Language)

All EverIntent properties and LocalPros portfolio sites must include these four legal pages:

| Page | Route | Purpose |
|------|-------|---------|
| Privacy Policy | `/legal/privacy` | Data collection, usage, sharing, rights |
| Terms of Service | `/legal/terms` | Service agreement, payments, refunds, liability |
| Cookie Policy | `/legal/cookies` | Cookie usage, categories, opt-out |
| Data Rights Request | `/legal/data-request` | CCPA/DSAR submission form |

#### 21.1.1 Privacy Policy Requirements

**Required Sections:**
1. **Data We Collect** - Contact info (name, email, phone, company), usage data (IP, browser, pages visited), cookies and tracking pixels
2. **How We Use Your Data** - Service delivery, communication, marketing (with opt-out), analytics, fraud prevention
3. **Who We Share Data With** - Service providers (GHL, Stripe, hosting), legal requirements, business transfers; **We never sell personal data**
4. **Call & SMS Recording Disclosure** - "Calls and text messages may be recorded for quality assurance and training purposes"
5. **Data Retention** - Customer data: duration of relationship + 7 years; Leads: 3 years from last contact; Analytics: 26 months
6. **Your Rights (California/CCPA)** - Right to know, delete, opt-out of sale (we don't sell), non-discrimination
7. **Contact Information** - Email: privacy@everintent.com

**LocalPros-Specific Addition:**
> "This site is part of the LocalPros Network, operated by EverIntent LLC. Leads generated through this site may be shared with the business featured on this site and EverIntent for service fulfillment."

#### 21.1.2 Terms of Service Requirements

**Required Sections:**

1. **Agreement to Terms** - By using our services, you agree to these terms. If you disagree, do not use our services.

2. **Services Description** - Overview of web design, hosting, and automation services provided under each tier.

3. **Payment Terms**
   - One-time setup fees charged at checkout
   - Monthly subscriptions billed on the same day each month
   - All payments processed via Stripe; major credit cards accepted
   - Taxes calculated and collected where required

4. **Refund & Cancellation Policy**

   **California Law Note:** Civil Code §1723 applies to retail goods, not services. Web design services are not subject to statutory cooling-off periods. Our policy is standard for service businesses.

   > **Before Work Begins:** Full refund available if you cancel before receiving the "Work Commencement" email notification. Once you receive this email, your project is in active development and no refund is available.
   >
   > **After Work Begins:** No refunds once work has commenced. You may cancel your subscription at any time; service continues through the end of your billing period.
   >
   > **Monthly Subscriptions:** Cancel anytime via the customer portal or by contacting support. No partial-month refunds.

5. **Work Commencement Notification**
   - Customer receives email titled "Your Project Is Starting" within 1-2 business days of payment
   - Email includes: reminder of no-refund policy, expected timeline, intake form link (if not completed)
   - This email triggers the refund window closure

6. **Chargeback Policy**

   **Note:** Chargebacks are governed by federal law (Fair Credit Billing Act / Regulation Z) and card network rules, not California state law.

   > If you believe there is an error with your charge, contact us at billing@everintent.com within 60 days. We will investigate and resolve legitimate disputes.
   >
   > Filing a chargeback after receiving services, or for a transaction you authorized, may be considered fraud. We maintain detailed records of all transactions, communications, and service delivery. We reserve the right to pursue fraudulent chargebacks through appropriate legal channels and report them to credit bureaus.

7. **Portfolio & Marketing Rights**
   - **Opt-in at checkout:** "You may feature my completed website in your portfolio"
   - If opted-in: We may display screenshots, describe the project, and link to the live site in marketing materials
   - **LocalPros sites:** Hosted on our platform by default; portfolio rights included in standard agreement
   - Customer may request removal from portfolio at any time after launch

8. **Hosting & SLA (LocalPros/Subscription Sites)**
   - 99.5% uptime target (excluding scheduled maintenance)
   - Scheduled maintenance: Sundays 2-6am PT with 48-hour notice
   - Support response: Within 24 business hours
   - Backups: Daily, retained 30 days

9. **Intellectual Property**
   - Design work: Customer owns final deliverable upon full payment
   - Templates, frameworks, code libraries: Remain property of EverIntent
   - Customer content: Customer represents they have rights to all provided content

10. **Limitation of Liability**
    - Maximum liability: Amount paid in the 12 months prior to claim
    - No liability for: Indirect, consequential, or punitive damages; lost profits; data loss
    - Customer responsible for: Content accuracy, domain renewals (if self-managed), third-party integrations

11. **Dispute Resolution**
    - Informal resolution first: Contact support@everintent.com
    - Mediation: Orange County, California
    - Governing law: State of California
    - Small claims: Either party may pursue in appropriate small claims court

12. **Termination**
    - We may terminate for: Non-payment (after 7-day grace period), ToS violation, abusive behavior
    - Customer may terminate: Anytime via portal or support email
    - Post-termination: Data retained 30 days for export, then deleted

13. **Modifications**
    - We may update these terms with 30-day notice via email
    - Continued use after notice constitutes acceptance

#### 21.1.3 Cookie Policy Requirements

**Required Sections:**

1. **What Are Cookies** - Brief explanation of cookies and similar technologies (pixels, local storage)

2. **Cookie Categories**

   | Category | Purpose | Examples | Can Disable? |
   |----------|---------|----------|--------------|
   | Strictly Necessary | Site functionality, security | Session cookies, CSRF tokens | No |
   | Analytics | Usage tracking, improvements | Google Analytics, Hotjar | Yes |
   | Marketing | Ad targeting, retargeting | Facebook Pixel, Google Ads | Yes |
   | Functional | Preferences, chat widgets | Theme preference, GHL chat | Yes |

3. **Third-Party Cookies** - List of third parties that may set cookies (Google, Facebook, GHL)

4. **Managing Cookies** - How to disable via browser settings + link to privacy settings

5. **Consent** - Banner on first visit with Accept/Customize options

#### 21.1.4 Data Rights Request Page

**Route:** `/legal/data-request`
**Component:** `src/pages/legal/DataRightsRequest.tsx`

**Required Form Fields:**
- Full Name (required)
- Email Address (required)
- Request Type (dropdown): Know what data we have | Delete my data | Correct my data | Opt-out of marketing | Other
- Additional Details (textarea)
- Verification acknowledgment checkbox

**Response Commitment:**
> We will respond to all verified requests within 45 days as required by CCPA. Complex requests may take up to 90 days with notification.

**Backend Implementation:**
1. Form submissions stored in `form_submissions` table with `form_type: 'data_rights_request'`
2. Edge function `submit-form` handles submission and GHL sync
3. Contact upserted in GHL with tag `DSAR: Data Rights Request`
4. GHL note includes urgent header: "⚠️ DSAR REQUEST - 45-DAY RESPONSE REQUIRED"
5. Email notification routed to privacy@everintent.com via GHL workflow

**GHL Tag:** `DSAR: Data Rights Request` (defined in `ghlClient.ts` → `GHL_TAGS.DATA_RIGHTS_REQUEST`)

#### 21.1.5 Checkout Agreement Email

**Triggered:** After successful payment, before Work Commencement email

**Contains:**
- Full Terms of Service (inline or PDF attachment)
- Payment confirmation details
- Portfolio rights selection confirmation (if applicable)
- Hosting/SLA summary (for subscription tiers)
- Signature acknowledgment: "By completing checkout, you agreed to these terms on [timestamp]"

**Stored:** `checkout_submissions.agreement_sent_at`, PDF copy in Supabase storage

#### 21.1.6 LocalPros Portfolio Sites

All LocalPros portfolio sites include:
- All four legal pages (Privacy, Terms, Cookies, Data Rights)
- Simplified ToS referencing master EverIntent terms
- Lead disclosure in Privacy Policy (see 21.1.1)
- Footer links to all legal pages

### 21.2 TCPA Consent Language

```
By providing your phone number and checking this box, you consent to 
receive calls, text messages, and emails from EverIntent and its 
partners regarding your inquiry. Message and data rates may apply. 
You may opt out at any time by replying STOP.
```

### 21.3 California Bot Disclosure (AI Calling)

```
"Hi [Name], this is [AI Name], an AI assistant from EverIntent. 
I'm an automated system calling to [purpose]. 
Is this a good time to chat for 2 minutes?"
```

### 21.4 Data Sale Policy

**EverIntent does not sell personal data.** This applies to:
- Customer information collected during checkout or service delivery
- Lead information from marketing forms
- LocalPros visitor data
- Any other personal information we collect

This policy is disclosed in our Privacy Policy and honored in all CCPA requests.

---

## 22. Partner Program

The EverIntent Partner Program enables web designers, digital marketing agencies, and service professionals to earn commissions by referring clients to EverIntent services.

### 22.1 Program Overview

**Program Name:** EverIntent Partners  
**URL:** `/partners`  
**Target Audience:**
- Freelance web designers who don't offer ongoing maintenance
- Digital marketing agencies needing white-label website fulfillment
- Business consultants who recommend digital solutions
- IT service providers with SMB clients
- Accountants, bookkeepers, and business advisors

**Value Proposition:** "Refer clients to EverIntent. Earn commissions. Keep your clients happy."

### 22.2 Commission Structure

| Campaign | Products/Services | Commission | Attribution |
|----------|-------------------|------------|-------------|
| **EI: Smart Websites & AI** | T1-T4 tiers, AI add-ons, one-time purchases | 10% of first payment | 90-day cookie |
| **EI: Strategy Session** | $297 Strategy Session booking | $50 flat per completed session | 30-day cookie |
| **LP: Partner Signup** | LocalPros partner applications (B2B) | $25 per qualified application | 30-day cookie |
| **LP: Website Sales** | LocalPros-referred site purchases | 5% of sale | 60-day cookie |

**Payment Terms:**
- Minimum payout threshold: $50
- Payment frequency: Monthly (NET-30 after sale closes)
- Payment methods: PayPal, direct deposit, or account credit

### 22.3 Affiliate Link Format

**Structure:** `https://everintent.com?aff={AFFILIATE_ID}`

**Examples:**
- Homepage: `https://everintent.com?aff=PARTNER123`
- Pricing page: `https://everintent.com/pricing?aff=PARTNER123`
- Service page: `https://everintent.com/smart-websites?aff=PARTNER123`

**UTM Compatibility:** Affiliate links work alongside UTM parameters:
`https://everintent.com/pricing?aff=PARTNER123&utm_source=newsletter&utm_medium=email`

### 22.4 Technical Implementation

#### 22.4.1 Visitor Tracking Script (Global)

Add GHL Affiliate Manager script to all pages via `index.html`:

```html
<!-- GHL Affiliate Manager - Before </head> -->
<script src="https://everintent.com/affiliate/am.js"></script>
```

**Script Behavior:**
- Reads `aff` query parameter on page load
- Stores affiliate ID in first-party cookie (duration per campaign settings)
- Cookie persists across sessions until expiration or conversion

#### 22.4.2 Lead Tracking on Checkout Success

When a checkout completes, fire lead tracking on the success page:

```typescript
// src/pages/checkout/Success.tsx
useEffect(() => {
  if (typeof affiliateManager !== 'undefined' && customerEmail) {
    affiliateManager.trackLead({
      email: customerEmail,
      uid: submissionId // from checkout_submissions table
    });
  }
}, [customerEmail, submissionId]);
```

**Triggering Conditions:**
- Only fire if affiliate cookie exists (handled by `am.js`)
- Customer email passed via query param or session storage from checkout form
- `submissionId` is the `checkout_submissions.id` for attribution linking

#### 22.4.3 Sale Attribution (Automatic)

GHL handles sale attribution automatically via Stripe webhook integration:
1. Customer completes Stripe payment
2. Stripe webhook fires to GHL
3. GHL matches email to tracked lead
4. Commission calculated and attributed to affiliate

**No custom code required** for sale tracking—GHL's native Stripe integration handles this.

### 22.5 Partner Signup Page Specification

**Route:** `/partners`  
**H1:** "Earn Money Referring Clients to EverIntent"  
**Subhead:** "Join our partner program and earn commissions on every referral."

#### Page Sections

**1. Hero Section**
- Headline: "Earn Money Referring Clients to EverIntent"
- Subhead: "Get paid when your referrals become customers. No minimums. No complicated tracking."
- CTA: "Apply Now" (scrolls to form)

**2. How It Works (3 Steps)**
| Step | Title | Description | Icon |
|------|-------|-------------|------|
| 1 | **Apply** | Fill out our quick application form | `ClipboardList` |
| 2 | **Share** | Get your unique referral link | `Share2` |
| 3 | **Earn** | Receive commissions on successful referrals | `DollarSign` |

**3. Commission Overview**
Display the commission table from Section 22.2 in a styled card format.

**4. Who Should Apply**
- Freelance web designers
- Digital marketing agencies
- Business consultants
- IT service providers
- Anyone with connections to local businesses

**5. FAQ Accordion**

| Question | Answer |
|----------|--------|
| How do I get paid? | We pay monthly via PayPal or direct deposit for balances over $50. |
| How long do cookies last? | Attribution cookies last 30-90 days depending on the product. |
| Can I refer myself? | No, self-referrals are not eligible for commission. |
| Do I need to be a customer? | No, anyone can apply to become a partner. |
| How do I track my referrals? | You'll get access to a dashboard showing clicks, leads, and commissions. |

**6. Application Form**

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| Full Name | text | ✓ | 2-100 chars |
| Email | email | ✓ | Valid email format |
| Phone | tel | ✓ | Valid phone format |
| Company/Website | url | ○ | Optional, valid URL if provided |
| How will you refer clients? | textarea | ✓ | 10-500 chars |
| TCPA Consent | checkbox | ✓ | Must be checked |

**Form Submission:**
- Edge function: `submit-form`
- `form_type`: `partner_apply`
- GHL Tag: `EI: Partner Application`
- Success message: "Thanks for applying! We'll review your application and be in touch within 2 business days."

**7. Trust Elements**
- "No upfront costs"
- "90-day cookie window"
- "Real-time tracking dashboard"
- "Monthly payouts"

### 22.6 GHL Configuration (Manual)

**Prerequisites:**
1. GHL Affiliate Manager enabled on account
2. Stripe integration configured in GHL

**Campaign Setup:**

| Campaign Name | Trigger Product/Tag | Commission | Cookie Duration |
|---------------|---------------------|------------|-----------------|
| EI: Smart Websites & AI | Any T1-T4 purchase | 10% first payment | 90 days |
| EI: Strategy Session | Strategy Session product | $50 flat | 30 days |
| LP: Partner Signup | Tag `LocalPros: Application` | $25 flat | 30 days |
| LP: Website Sales | LocalPros site products | 5% of sale | 60 days |

**Affiliate Approval Workflow:**
1. Partner applies via `/partners` form
2. Form submission creates contact in GHL with tag `EI: Partner Application`
3. Admin reviews application in GHL
4. On approval: Add tag `EI: Approved Partner`, affiliate link generated
5. Partner receives approval email with affiliate link and dashboard access

### 22.7 Partner Dashboard (Future)

**Deferred to post-MVP.** Initial partners will receive:
- Affiliate link via email
- Monthly commission reports via email
- Support via partner@everintent.com

**Future Dashboard Features:**
- Real-time click and conversion tracking
- Commission history and payout status
- Marketing materials download
- Sub-affiliate management (Phase 2)

---

## 23. Technical Architecture

### Platform Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CUSTOMER JOURNEY                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Ad Click] → [Marketing Site] → [GHL Checkout] → [Portal]  │
│                                                             │
│  Craigslist     everintent-      checkout.smart    app.smart│
│  Facebook       smartsites.com   sites.everintent  sites... │
│                                  .com                       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ MARKETING     │   │ CHECKOUT &    │   │ FULFILLMENT   │
│ SITE          │   │ BILLING       │   │               │
├───────────────┤   ├───────────────┤   ├───────────────┤
│ Vite + React  │   │ GHL SaaS Mode │   │ WordPress     │
│ Pre-rendered  │   │ Stripe        │   │ OVH/Plesk     │
│ Vercel Pro    │   │ Namecheap API │   │ Elementor     │
│ Supabase      │   │               │   │ Cloudflare    │
└───────────────┘   └───────────────┘   └───────────────┘
```

### Phone Number Strategy

**Outbound Cold Calling (AI Calling Campaigns):**
- 5 California area codes only: 562, 714, 949, 310, 626
- Used for AI calling campaigns targeting SoCal businesses
- California Bot Disclosure Law (§17940) compliant
- DNC list checked before each dial

**Inbound/Service Numbers (All Markets):**
- Local numbers in every market we serve
- SmartSites T2-T4 customers get number matching their business area code
- LocalPros portfolio sites get numbers matching their market
- Numbers provisioned as we enter each market

### Email Infrastructure

| Use Case | Platform |
|----------|----------|
| Transactional (WordPress) | AWS SES |
| Marketing (GHL) | GHL native |
| Support | Google Workspace |

---

## 24. Operational SOPs

### Website Build SOP (T1-T4)

**Day 0: Intake Complete**
1. Review intake form submission
2. Download logo, note colors
3. Research business online
4. Create ClickUp task

**Day 1: Setup**
1. Create WordPress site in Plesk
2. Install theme and plugins
3. Configure basic settings
4. If new domain: Verify DNS propagation

**Day 2-3: Build**
1. Build homepage
2. Build inner pages
3. Add content from intake
4. Configure contact form
5. Install GA4

**Day 4: Review**
1. Internal QA
2. Send review link to customer
3. Collect feedback

**Day 5: Launch**
1. Make revisions (1 round)
2. Final QA
3. Go live
4. Send launch email
5. Trigger upsell sequence (T1)

---

## 25. Upgrade & Downgrade Flows

### Upgrade Flow (T1 → T2/T3/T4)

1. Customer clicks upgrade CTA in portal
2. Redirect to GHL checkout for new tier
3. On payment:
   - Cancel T1 renewal subscription
   - Apply new tier snapshot
   - Enable additional features
4. Send upgrade confirmation email

### Downgrade Flow

1. Customer requests downgrade via support
2. Support confirms new tier
3. Schedule downgrade for end of billing period
4. At period end:
   - Apply lower tier snapshot
   - Disable higher-tier features
5. Send downgrade confirmation

### Cancellation Flow

1. Customer requests cancellation
2. Retention offer presented
3. If cancel confirmed:
   - Schedule for end of period
   - Tag: cancel_pending=true
4. At period end:
   - Subscription ends
   - Disable sub-account access
   - Add to win-back pipeline
5. Data retained 90 days, then purged

---

## 26. Support Model

### Support Channels by Tier

| Tier | Email | Chat | Phone | Strategy Call |
|------|:-----:|:----:|:-----:|:-------------:|
| T1 | ✓ | ✗ | ✗ | ✗ |
| T2 | ✓ | ✓ | ✗ | ✗ |
| T3 | ✓ | ✓ | ✗ | ✗ |
| T4 | ✓ | ✓ | ✓ | Quarterly |

### Support SLAs

| Priority | First Response | Resolution |
|----------|---------------:|------------|
| Urgent (site down) | 1 hour | 4 hours |
| High (feature broken) | 4 hours | 24 hours |
| Normal | 24 hours | 3 business days |
| Low (enhancement) | 48 hours | Best effort |

---

## 27. Build Order & Timeline

### Phase 1: Foundation (Week 1)

**Marketing Site MVP:**
- [ ] Homepage
- [ ] Pricing page
- [ ] /checkout/smart-site (T1 only)
- [ ] /checkout/success
- [ ] Privacy policy
- [ ] Terms of service
- [ ] /domains (domain search utility)

**GHL Configuration:**
- [ ] Enable SaaS Mode
- [ ] Connect Stripe
- [ ] Create T1 plan + snapshot
- [ ] Configure checkout branding
- [ ] Create intake form
- [ ] Create welcome email template
- [ ] Create onboarding workflow

### Phase 2: Portfolio (Week 2)

**LocalPros Sites (First 5):**
- [ ] Phoenix HVAC
- [ ] Dallas Roofing
- [ ] Houston Plumbing
- [ ] Phoenix Landscaping
- [ ] Atlanta Cleaning

### Phase 3: Full Checkout (Week 3)

**Marketing Site:**
- [ ] /checkout/smart-lead
- [ ] /checkout/smart-business
- [ ] /checkout/smart-growth
- [ ] Portfolio page (with 5 sites)

**GHL:**
- [ ] T2, T3, T4 plans + snapshots
- [ ] Usage rebilling configured
- [ ] Upgrade workflows

### Phase 4: Go Live (Week 4)

**Ads:**
- [ ] Craigslist ads (Phoenix first)
- [ ] Test checkout flow end-to-end
- [ ] Monitor first 10 purchases

---

## 28. Open Questions

### Resolved in v30

| Question | Decision |
|----------|----------|
| Checkout host | GHL SaaS Checkout |
| T1 portal access | Yes, neutered dashboard |
| T1 payment model | $249 full payment (not deposit) |
| T1 renewal amount | $149/year (not $99) |
| GA4 reporting | Scheduled email PDFs from GA4 |
| Domain collection timing | Pre-checkout form (not intake) |
| Overage model | Auto-charge via wallet |

### Resolved in v31

| Question | Decision |
|----------|----------|
| Marketing site framework | Vite + React (pre-rendered) instead of Next.js |
| SEO approach | ~~vite-plugin-prerender~~ → **vite-react-ssg** (v32.2 migration due to ESM compatibility) |
| Navigation structure | Beautiful Websites moved into Services dropdown (top position) |

### Resolved in v32

| Question | Decision |
|----------|----------|
| Domain registrar | Manual purchase via GHL or Namecheap dashboard (API integration deferred) |
| Domain collection timing | Post-payment via GHL intake form |
| Domain purchase timing | Manual during 5-day build window |
| Industry structure | 4 hub categories: Home Services, Professional Services, Health & Wellness, Automotive |
| Industry count | 65+ verticals with nested URL structure (/industries/category/vertical) |
| LocalPros sites | Full 20-site table restored with domains, markets, area codes, lead values |

### Resolved in v32.1

| Question | Decision |
|----------|----------|
| Legal route paths | Changed to `/legal/*` pattern for consistency |
| Admin authentication | Email OTP via Supabase Edge Function, no passwords |
| Admin authorization | `has_role()` security definer function + `user_roles` table |
| Admin email whitelist | `allowed_admin_emails` table for OTP eligibility |
| Missing prerender routes | Added /checkout/success, /localpros/*, /upgrade, /services |
| Admin route naming | `/admin/submissions` (not /checkouts), `/admin/login` added |

### Resolved in v33

| Question | Decision |
|----------|----------|
| Product vs tier framing | Products are primary, packages bundle them |
| Navigation rename | Portfolio → Our Work |
| Footer additions | Careers link added to Company column |
| Missing middle gap | Smart Launch package ($2,500-$4,500 + $297/mo) |
| Paid discovery | SmartStart Strategy Session ($500-750) |
| Product-category pages | /services/seo, /services/web-design, etc. for SEO |
| Tier naming | Consideration documented; pending final decision |

### Resolved in v34 (Brand Pivot)

| Question | Decision |
|----------|----------|
| **Tagline preference** | **"Web Design AI & Automation"** |
| **Services dropdown rename** | **"Smart Websites"** (from "Beautiful Websites") |
| **Solutions page** | **Nav link to `/solutions`**, hub page links to Legal AI + future verticals |
| **About page** | **Blend EverIntent + Legal AI credibility**, route `/about` |
| **Footer columns** | **"Products" → "Solutions"**, add "For Law Firms" external link |
| **SmartSites trademark risk** | Use "smart website(s)" as lowercase descriptive language only; EverIntent as master brand |
| **Nav structure** | Smart Websites \| AI & Automation \| Industries \| Solutions \| Pricing \| Our Work \| About |
| **Hero messaging** | "Smart websites that pay for themselves — and are ready for AI when you are." |

### Still Open

1. **Checkout subdomain:** `checkout.everintent.com` vs `checkout.everintentsmartsites.com` (staging)
2. **Wallet initial funding:** Start at $0 with auto-recharge prompt vs pre-fund at signup
3. **Looker Studio:** Build template later if requested (not MVP)
4. **Tier naming decision:** Keep Smart Site/Lead/Business/Growth or adopt Starter Site/Lead Booster/Booking & Reputation/AI Growth?
5. **Smart Launch pricing:** Fixed price ($3,000) or range ($2,500-$4,500 based on scope)?
6. **SmartStart credit:** Full credit toward any package, or partial credit?
7. **Standalone product availability:** Available to anyone, or only existing customers?

---

## 29. Document History

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | — | Initial BRD |
| v19 | — | EverIntent LLC entity, full sales journey, HomePros model |
| v20 | — | Renamed HomePros → LocalPros Network, added Partner Program |
| v21 | — | TCPA consent, lead acceptance/dispute rules, call recording, partner insurance |
| v22 | — | Payment & Subscription Infrastructure (Stripe + GHL), checkout flows, dunning |
| v23 | — | Phone strategy clarification (SoCal outbound vs local inbound) |
| v24 | — | Services & Solutions section (7 services with Problem → Solution → Outcome) |
| v25 | — | Navigation structure, homepage structure, "What's Included" specs |
| v26 | Dec 11 | GTM strategy (channels, niches, ad copy, UTMs) |
| v27 | Dec 13 | Checkout architecture clarification (initially Stripe-first) |
| v28 | Dec 13 | Requirements doc format, UX/Ops/GHL specs |
| v29 | — | ChatGPT summary brief |
| v30 | Dec 13 | Full reconciliation: GHL checkout (final), T1 portal YES, T1 $249 full, T1 renewal $149/yr, GA4 email reports, complete sitemap restored |
| v31 | Dec 13 | Tech stack update: Vite + React (pre-rendered) replaces Next.js; SEO implementation via ~~vite-plugin-prerender~~ (see v32.2); Navigation updated (Beautiful Websites moved to Services dropdown top); Pre-render route configuration added |
| v32 | Dec 13 | Domain Integration Architecture (later simplified in v32.9); Industry Expansion: 4 industry hub categories (Home Services, Professional Services, Health & Wellness, Automotive); 65+ industry verticals with nested URL structure; Complete 20 LocalPros portfolio sites table restored from v26 with domains, markets, area codes, and lead values |
| v32.1 | Dec 13 | Route fixes: Added missing prerenderRoutes (checkout/success, localpros/*, upgrade, services); Fixed legal route paths (/legal/*); Admin schema security: Replaced insecure admins table with user_roles + allowed_admin_emails + has_role() function; Admin route consistency (/admin/login added, /admin/submissions naming) |
| v32.2 | Dec 14 | SSG Migration: Replaced vite-plugin-prerender with vite-react-ssg due to ESM compatibility issues; Updated SEO component to use vite-react-ssg's built-in `<Head>` instead of react-helmet-async; Routes moved to `src/routes.tsx` using react-router-dom data routes format; Build command changed to `vite-react-ssg build`; Admin routes excluded via `ssgOptions.includedRoutes` filter |
| v32.3 | Dec 14 | Updated footer structure (4-column nav + branded section), added chat widget requirements, added legal pages specification, cookie consent integration requirements |
| v32.4 | Dec 14 | Added design system appendix (Legal AI pattern), cookie consent component, desktop chat button, GHL loader utility, z-index strategy |
| v32.5 | Dec 14 | Header + Footer implementation complete |
| v32.6 | Dec 14 | LocalPros Business Model Complete: Core revenue principles; Three revenue paths (Sell Leads, Sell/Rent Site, Ice Breaker→SmartSites); GHL master vs sub-account structure; Decision framework; Easy Money Map; Tiered lead pricing ($25-150 by vertical); Territory/Conversion/Incentive policies; Routes reduced to /localpros and /localpros/apply only |
| v32.7 | Dec 14 | Navigation Cleanup: Removed About from desktop header navigation (remains in mobile menu and footer Company column); Route /about preserved |
| v32.8 | Dec 14 | **Careers Feature Spec**: Added /careers and /careers/:slug routes; jobs table in Supabase with admin-configurable form fields (loom_required, portfolio_required, custom_questions); GHL v2 API integration via Edge Function (submit-job-application); Admin CRUD at /admin/careers; Full spec documented in docs/careers-spec.md |
| v32.9 | Dec 16 | **Domain Integration Simplified**: Removed Namecheap API integration; Domain purchase moved to manual process during onboarding via GHL or Namecheap dashboard; Simplified checkout flow (yes/no domain question); Domain preferences collected in post-payment GHL intake form; /domains page removed from scope; Namecheap environment variables removed; n8n workflow simplified to notification/task creation only |
| v32.10 | Dec 17 | **Multi-Widget Chat Architecture**: GHL chat widgets now support multiple bots per page type (Sales, Support, Demo); Route-based widget selection via `GHLChatWidget.tsx`; Three new env vars (`VITE_GHL_WIDGET_ID_SALES`, `VITE_GHL_WIDGET_ID_SUPPORT`, `VITE_GHL_WIDGET_ID_DEMO`); Launcher hiding via JS shadow DOM penetration (code-based approach retained); Section 17.5 rewritten with multi-widget architecture and route mapping logic |
| v32.11 | Dec 18 | **SSG Configuration Pattern Documented**: Added Appendix H with complete `vite-react-ssg` configuration patterns; Documented critical anti-patterns (manualChunks, catch-all rewrites); Added ClientOnly and isMounted patterns for Radix UI components; Added QueryClient placement rules; Full SSG routes restored (was limited to 6 during debugging); This appendix is REQUIRED reading for any Lovable project using SSG |
| v33.0 | Dec 20 | **Product-First Restructure (Major)**: Complete restructuring of product/service model based on market research and persona analysis. Key changes: (1) Products are now primary, packages bundle them — eliminates "add-on" framing; (2) Smart Launch package added ($2,500-$4,500 + $297/mo) to capture "missing middle" between T4 and Custom; (3) SmartStart Strategy Session added ($500-750) for paid discovery/qualification; (4) Product-category landing pages added (/services/seo, /services/web-design, /services/reputation, /services/ai-automation, /services/booking) for SEO alignment with buyer search intent; (5) Navigation updates: Portfolio → Our Work, Careers added to footer; (6) GTM Section 19 updated with product-first positioning and standalone product campaigns; (7) Tier naming consideration documented (pending decision); (8) Persona buying behavior integrated into Section 9 Customer Journey. Sources: docs/menu-structure-proposal.md, docs/chatgpt-research-alignment.md, docs/research-alignment.md, docs/persona-spec.md |
| v33.1 | Dec 20 | **Footer Restructure**: Replaced Services + Industries footer columns with Products + Packages columns. Products column links to `/services/*` pages (web-design, seo, lead-capture, booking, reputation, ai-automation) for SEO value. Packages column links to `/checkout/*` pages for direct conversion paths. Header retains benefit-oriented Services dropdown for buyer journey. Industries moved to header-only access. |
| v33.2 | Dec 20 | **Design System Overhaul (Major)**: Complete visual redesign inspired by award-winning agency sites (SPINX Digital, Shape, VRRB). Key changes: (1) Color palette updated: Deep Navy → Rich Slate (`222 47% 7%`), Muted Gold → Electric Amber (`38 92% 50%`); (2) Typography updated: System fonts → Space Grotesk (display) + Inter (body) via Google Fonts; (3) CTA Button Pattern established: Dark glassmorphic buttons with backdrop-blur, amber border (`border-accent/30`), shadow-lg, hover glow (`hover:shadow-accent/20`), text change on hover ("Get Started" → "Let's Go!"), Sparkles icon + pulse dot; (4) CTAButton component created for consistent CTA usage across site; (5) Header polish: Animated nav underlines, glassmorphic dropdowns with gradient overlays, layered shadows, gradient border on scroll; (6) Footer polish: Mesh gradient backgrounds, section headers with accent gradient lines, footer-link hover animation (slide-in accent bar), enhanced social icons with glow, gradient border separators; (7) New CSS utilities: `.nav-link`, `.footer-link`, `.shadow-layered`, `.shadow-layered-lg`, `.transition-spring`, `.bg-mesh`, `.bg-noise`; (8) Business rationale documented in Appendix F.0 explaining why each design decision converts. Sources: SPINX Digital, Shape Agency, VRRB, Isadora Agency research. |
| **v34.0** | **Dec 21** | **Brand Pivot to EverIntent Master Brand (Major)**: Complete pivot from "SmartSites by EverIntent" to "EverIntent" as master brand with "smart websites" as descriptive product language. Key changes: (1) Master brand is now EverIntent with tagline "Web Design AI & Automation"; (2) "Beautiful Websites" renamed to "Smart Websites" throughout; (3) Use lowercase "smart website(s)" / "smart site" as descriptive language, NOT a brand name; (4) Navigation restructured: Smart Websites \| AI & Automation \| Industries \| Solutions \| Pricing \| Our Work \| About; (5) Solutions nav item added linking to Legal AI and future verticals; (6) Footer "Products" column renamed to "Solutions" with For Law Firms external link; (7) SmartSites trademark risk mitigated by EverIntent master brand positioning; (8) About page to blend EverIntent + Legal AI credibility; (9) Hero messaging updated: "Smart websites that pay for themselves — and are ready for AI when you are."; (10) All workshop decisions closed. Sources: docs/everintent-pivot-plan.md, ChatGPT brand analysis. |

### Related Specification Documents

| Document | Path | Description |
|----------|------|-------------|
| **Brand Pivot Plan** | `docs/everintent-pivot-plan.md` | Complete brand pivot specification: EverIntent master brand, SmartSites trademark context, navigation restructure, implementation phases |
| Careers Feature Spec | `docs/careers-spec.md` | Complete careers/jobs feature specification including GHL v2 API integration, database schema, admin configuration, and UX flow |
| Menu Structure Proposal | `docs/menu-structure-proposal.md` | Navigation changes (Portfolio→Our Work, add Careers) and product/package structure with product-first framing |
| Market Research Alignment | `docs/chatgpt-research-alignment.md` | Synthesized market research: persona buying behavior, missing middle gap, standalone products, paid discovery, hybrid revenue model |
| Independent Research | `docs/research-alignment.md` | Original research identifying 5 structural gaps ChatGPT missed |
| Persona Spec | `docs/persona-spec.md` | External and internal personas with system touchpoints |

---

## Appendix A: PRD Build Order

For Lovable/builder reference, generate PRDs in this order:

1. homepage.md
2. beautiful-websites.md
3. pricing.md
4. services-hub.md
5. services/get-found-online.md
6. services/never-miss-a-lead.md
7. services/book-more-jobs.md
8. services/run-from-your-phone.md
9. services/build-your-reputation.md
10. services/let-ai-handle-it.md
11. portfolio.md
12. about.md
13. contact.md
14. book-call.md
15. checkout/smart-site.md
16. checkout/smart-lead.md
17. checkout/smart-business.md
18. checkout/smart-growth.md
19. checkout/success.md
20. localpros/index.md
21. localpros/apply.md
22. legal/privacy-policy.md
23. legal/terms-of-service.md
24. legal/data-request.md
25. upgrade.md
26. admin/login.md
27. admin/checkouts.md
28. admin/portfolio.md

---

## Appendix B: Copy Rules

**For all page copy:**

1. Plain language. No jargon.
2. Short sentences. 15 words max.
3. Benefit-first. Lead with what they get.
4. Specific proof. "$249" not "affordable."
5. No em dashes. Use commas or periods.
6. Active voice. "We build" not "Websites are built."
7. Second person. "You" and "Your."

**Brand Voice:**
- Confident but not arrogant
- Direct but not cold
- Expert but not condescending
- Operators who built this for operators
- Anti-vendor: We help, not sell

---

## Appendix C: Compliance Checklist

**Every page with a form:**
- [ ] TCPA checkbox present
- [ ] Checkbox unchecked by default
- [ ] Links to Privacy Policy and Terms
- [ ] Consent timestamp captured
- [ ] IP address captured

**Every page with phone number:**
- [ ] Call recording disclosure in footer

**Every page mentioning AI:**
- [ ] Bot disclosure language present

**Every checkout page:**
- [ ] noindex meta tag
- [ ] Renewal language visible
- [ ] Terms/Privacy acknowledgement

---

## Appendix D: GHL Snapshot Configuration Reference

### ss-t1-snapshot

```yaml
dashboard: true
dashboard_widgets:
  - ga4_visitors
  - ga4_pageviews
  - ga4_top_pages
  - upgrade_cta

contacts: false
conversations: false
calendar: false
opportunities: false
payments: false
automation: false
sites: false
marketing: false
reputation: false
reporting: false

settings:
  company_billing: true
  profile: true

custom_menu_items:
  - label: "View My Website"
    url: "{{custom.website_domain}}"
    target: "_blank"
  - label: "Upgrade Your Plan"
    url: "https://everintentsmartsites.com/pricing"
    target: "_blank"
  - label: "Support"
    url: "mailto:support@everintent.com"
```

### ss-t2-snapshot

```yaml
dashboard: true
contacts: true
conversations: true
calendar: false
opportunities: false
automation: false (basic workflows allowed)
reputation: false
settings: true

phone: enabled
sms: enabled
chat_widget: enabled
mobile_app: enabled

consumables:
  sms_monthly: 400
  ai_minutes_monthly: 30
  email_monthly: 1000
```

### ss-t3-snapshot

```yaml
dashboard: true
contacts: true
conversations: true
calendar: true
opportunities: true
automation: true
reputation: true (basic)
settings: true

consumables:
  sms_monthly: 600
  ai_minutes_monthly: 50
  email_monthly: 2500
```

### ss-t4-snapshot

```yaml
dashboard: true
contacts: true
conversations: true
calendar: true
opportunities: true
automation: true (advanced)
reputation: true (full)
reporting: true
unified_inbox: true
ai_voice: enabled
settings: true

consumables:
  sms_monthly: 1000
  ai_minutes_monthly: 100
  email_monthly: 5000
```

---

## Appendix E: Environment Variables

### Marketing Site (Vercel)

```bash
# Supabase
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx

# GHL
VITE_GHL_LOCATION_ID=xxx

# Analytics
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### n8n Automation

```bash
# Supabase
SUPABASE_URL=xxx
SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_KEY=xxx

# GHL
GHL_API_KEY=xxx
GHL_LOCATION_ID=xxx

# ClickUp
CLICKUP_API_KEY=xxx
CLICKUP_LIST_ID=xxx
```

---

*Document compiled from EverIntentSmartSites BRD versions 1-32.9. Domain integration simplified in v32.9 (manual process). This is the single source of truth for SmartSites build.*

---

## Document History (Appendix Summary)

| Version | Date | Changes |
|---------|------|---------|
| v32.2 | 2025-12-13 | Migration from vite-plugin-prerender to vite-react-ssg for SSG |
| v32.3 | 2025-12-14 | Updated footer structure, chat widget requirements, legal pages, cookie consent |
| v32.4 | 2025-12-14 | Design system appendix (Legal AI pattern), component patterns |
| v32.5 | 2025-12-14 | Header + Footer implementation complete |
| v32.6 | 2025-12-14 | LocalPros Business Model Complete |
| v32.7 | 2025-12-14 | Navigation cleanup (About link removed from desktop header) |
| v32.8 | 2025-12-14 | Careers Feature Spec |
| **v32.9** | **2025-12-16** | **Domain Integration Simplified**: Manual domain purchase during onboarding; Namecheap API deferred; /domains page removed |

---

## Appendix F: Design System & Component Patterns

### F.0 Design Philosophy & Business Rationale

**Why Our Design Looks This Way:**

SmartSites' design is intentionally modeled after award-winning agency websites (SPINX Digital, Shape, Isadora Agency) that convert visitors into paying customers. The design decisions below are not arbitrary aesthetic choices—they're proven conversion patterns.

| Design Decision | Business Rationale | Research Source |
|-----------------|---------------------|-----------------|
| **Dark base with amber accent** | Premium positioning without alienating SMB buyers; dark conveys sophistication, amber signals action | SPINX Digital ($5-50K projects), in-house agency aesthetic |
| **Glassmorphic CTAs** | Creates depth and "floating" effect that draws eye to conversion points; higher click-through than flat buttons | Shape agency pattern; modern SaaS standard |
| **Animated underlines on nav** | Provides feedback without page reload; signals interactivity; reduces perceived friction | UX research on micro-interactions |
| **Mesh gradient backgrounds** | Adds visual interest without distraction; creates atmosphere that feels "designed" not "templated" | Isadora Agency; differentiates from DIY builders |
| **Text-on-hover CTA changes** | Creates delight and engagement; "Get Started" → "Let's Go!" builds momentum | Psychological continuity; reduces commitment anxiety |
| **Layered shadows** | Multi-level shadows create depth hierarchy; premium feel vs flat DIY site look | VRRB; enterprise SaaS standard |
| **Animated sparkle icons** | Associates brand with "smart" and "magic"; reinforces AI/automation messaging | Consistent with "SmartSites" brand promise |

**Target Aesthetic:** Premium but approachable. We sell to HVAC contractors and dentists, not Fortune 500. The design should say "these people know what they're doing" without saying "this is too expensive for me."

**Anti-Patterns Explicitly Avoided:**
- Generic purple gradients (screams "AI tool" and "template")
- Inter/Poppins system fonts (every AI builder uses these)
- Flat white backgrounds (looks like unfinished wireframe)
- Rounded-full buttons (too playful for B2B trust)
- Stock photography (instant credibility killer)

### F.1 Color Palette (HSL Tokens)

**Light Mode:**

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--background` | `0 0% 100%` | Page background |
| `--foreground` | `222 47% 11%` | Body text |
| `--primary` | `222 47% 11%` | Rich Slate - Sophisticated base |
| `--primary-light` | `215 25% 27%` | Hover states |
| `--primary-foreground` | `0 0% 100%` | Text on primary |
| `--accent` | `38 92% 50%` | Electric Amber - HIGH IMPACT (the money color) |
| `--accent-hover` | `32 95% 44%` | Darker amber for interactions |
| `--accent-foreground` | `222 47% 11%` | Text on accent |
| `--muted` | `60 5% 96%` | Subtle backgrounds |
| `--muted-foreground` | `215 16% 47%` | Secondary text |
| `--border` | `220 13% 91%` | Borders |

**Dark Mode:**

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `--background` | `222 47% 7%` | Deep slate page background |
| `--foreground` | `60 9% 98%` | Light text |
| `--primary` | `215 25% 27%` | Lighter slate for dark |
| `--primary-light` | `215 20% 40%` | Hover states |
| `--accent` | `38 92% 50%` | Electric Amber (same as light) |
| `--muted` | `222 47% 15%` | Muted backgrounds |
| `--muted-foreground` | `215 16% 65%` | Secondary text |
| `--card` | `222 47% 10%` | Card backgrounds |
| `--border` | `215 25% 20%` | Borders |

### F.2 Typography

```css
/* Font Families */
font-display: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif
font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif

/* Display Sizes (Headlines) */
display-2xl: 4.5rem / line-height 1 / letter-spacing -0.02em / weight 700
display-xl: 3.75rem / line-height 1 / letter-spacing -0.02em / weight 700
display-lg: 3rem / line-height 1.1 / letter-spacing -0.02em / weight 700
display-md: 2.25rem / line-height 1.2 / letter-spacing -0.01em / weight 700
display-sm: 1.875rem / line-height 1.2 / letter-spacing -0.01em / weight 600

/* Body Sizes */
body-xl: 1.25rem / line-height 1.6 / weight 400
body-lg: 1.125rem / line-height 1.6 / weight 400
body-md: 1rem / line-height 1.6 / weight 400
body-sm: 0.875rem / line-height 1.5 / weight 400
```

**Font Loading:** Google Fonts loaded in `index.html` with `display=swap` for performance.

### F.3 Gradients

```css
/* Hero gradient - diagonal sweep */
--gradient-hero: linear-gradient(135deg, hsl(222 47% 7%) 0%, hsl(222 47% 12%) 50%, hsl(222 47% 7%) 100%)

/* Text gradient - gold shimmer */
--gradient-text: linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(45 93% 58%) 50%, hsl(38 92% 50%) 100%)

/* CTA gradient - amber depth */
--gradient-cta: linear-gradient(135deg, hsl(38 92% 50%) 0%, hsl(32 95% 44%) 100%)

/* Glow gradient - radial amber */
--gradient-glow: radial-gradient(ellipse at center, hsl(38 92% 50% / 0.2) 0%, transparent 70%)

/* Mesh gradient - multi-point radial for backgrounds */
--gradient-mesh: radial-gradient(at 40% 20%, hsl(38 92% 50% / 0.12) 0px, transparent 50%), 
                 radial-gradient(at 80% 0%, hsl(215 25% 27% / 0.15) 0px, transparent 50%), 
                 radial-gradient(at 0% 50%, hsl(38 92% 50% / 0.08) 0px, transparent 50%)
```

### F.4 Shadows

```css
/* Layered shadows for depth */
--shadow-sm: 0 1px 2px 0 hsl(0 0% 0% / 0.3)
--shadow-md: 0 4px 6px -1px hsl(0 0% 0% / 0.4), 0 2px 4px -2px hsl(0 0% 0% / 0.3)
--shadow-lg: 0 10px 15px -3px hsl(0 0% 0% / 0.4), 0 4px 6px -4px hsl(0 0% 0% / 0.3)
--shadow-xl: 0 20px 25px -5px hsl(0 0% 0% / 0.4), 0 8px 10px -6px hsl(0 0% 0% / 0.3)

/* Accent glow shadows */
--shadow-glow: 0 0 40px hsl(38 92% 50% / 0.25)
--shadow-glow-lg: 0 0 60px hsl(38 92% 50% / 0.35)
--shadow-button: 0 4px 14px 0 hsl(38 92% 50% / 0.3)

/* Multi-layer depth shadows (CSS utility classes) */
.shadow-layered: 0 1px 2px hsl(0 0% 0% / 0.05), 0 4px 8px hsl(0 0% 0% / 0.05), 0 16px 32px hsl(0 0% 0% / 0.05)
.shadow-layered-lg: 0 2px 4px hsl(0 0% 0% / 0.03), 0 8px 16px hsl(0 0% 0% / 0.05), 0 24px 48px hsl(0 0% 0% / 0.08)
```

### F.5 Animations & Transitions

```css
/* Timing functions */
--transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
--transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)
--transition-spring: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)

/* Keyframe animations */
animate-fade-in: fade-in 0.5s ease-out
animate-fade-in-up: fade-in-up 0.6s ease-out
animate-pulse-glow: pulse-glow 2s ease-in-out infinite
animate-shimmer: shimmer 2s ease-in-out infinite
animate-float: float 3s ease-in-out infinite
```

### F.6 Z-Index Strategy

| Element | Z-Index | Notes |
|---------|---------|-------|
| Cookie Consent Banner | `z-[2147483647]` | Max int, always on top |
| GHL Chat Widget | `z-40` | Pushed behind via CSS `!important` |
| Desktop Chat Button | `z-40` | Matches widget level |

### F.7 Cookie Consent Component Pattern

```tsx
// src/components/CookieConsent.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) setIsVisible(true);
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true, analytics: true, marketing: true,
      timestamp: new Date().toISOString()
    }));
    window.dispatchEvent(new Event('cookie-consent-changed'));
    setIsVisible(false);
  };

  const rejectAll = () => {
    localStorage.setItem('cookie-consent', JSON.stringify({
      necessary: true, analytics: false, marketing: false,
      timestamp: new Date().toISOString()
    }));
    window.dispatchEvent(new Event('cookie-consent-changed'));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[2147483647] bg-card border-t border-border p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-foreground">We use cookies</h3>
          <p className="text-sm text-muted-foreground">
            We use cookies to enhance your experience.{' '}
            <Link to="/legal/privacy" className="underline">Privacy Policy</Link>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={rejectAll}>Reject All</Button>
          <Button onClick={acceptAll}>Accept All</Button>
        </div>
      </div>
    </div>
  );
}
```

### F.8 Desktop Chat Button Component Pattern

The Desktop Chat Button serves as the reference design for all CTA buttons. Its styling defines the "glow" button variant.

```tsx
// src/components/DesktopChatButton.tsx
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DesktopChatButton() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Consent checking logic...

  if (!hasConsent) return null;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden md:flex fixed right-6 z-40 items-center gap-3 px-5 py-3 
                 bg-primary/95 backdrop-blur-sm 
                 border border-accent/30 rounded-lg 
                 shadow-lg transition-all duration-300 ease-out 
                 hover:bg-primary hover:border-accent 
                 hover:shadow-xl hover:shadow-accent/20 group"
      style={{ bottom: isVisible ? '24px' : '-80px' }}
      aria-label="Chat with our AI assistant"
    >
      <Sparkles 
        className="text-accent transition-transform duration-300 
                   group-hover:scale-110 group-hover:rotate-12"
        size={18}
        strokeWidth={2}
      />
      <span className="text-primary-foreground font-medium text-sm tracking-wide whitespace-nowrap">
        {isHovered ? 'Chat with us' : 'Need help?'}
      </span>
      <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
    </button>
  );
}
```

**Key Design Elements (apply to all CTAs):**
| Element | Class | Purpose |
|---------|-------|---------|
| Background | `bg-primary/95 backdrop-blur-sm` | Dark with subtle transparency |
| Border | `border border-accent/30` | Subtle amber outline |
| Shadow | `shadow-lg` | Depth/lift |
| Hover border | `hover:border-accent` | Full amber on hover |
| Hover glow | `hover:shadow-xl hover:shadow-accent/20` | Amber glow effect |
| Icon | `text-accent group-hover:scale-110 group-hover:rotate-12` | Animated sparkle |
| Pulse dot | `w-2 h-2 rounded-full bg-accent animate-pulse` | Activity indicator |
| Text change | `isHovered ? 'Chat with us' : 'Need help?'` | Engagement pattern |

### F.8.1 CTAButton Reusable Component

For consistent CTAs across the site, use the CTAButton component:

```tsx
// src/components/CTAButton.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTAButtonProps {
  to: string;
  defaultText: string;
  hoverText: string;
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export function CTAButton({ 
  to, defaultText, hoverText, onClick, className = '', fullWidth = false
}: CTAButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button 
      variant="glow" 
      size="lg" 
      asChild 
      className={`group ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <Link 
        to={to} 
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center ${fullWidth ? 'justify-center' : ''} gap-2`}
      >
        <Sparkles 
          className="w-4 h-4 text-accent transition-transform duration-300 
                     group-hover:scale-110 group-hover:rotate-12" 
        />
        {/* Fixed width container to prevent layout shift */}
        <span className="relative">
          <span className="invisible whitespace-nowrap">
            {defaultText.length >= hoverText.length ? defaultText : hoverText}
          </span>
          <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap">
            {isHovered ? hoverText : defaultText}
          </span>
        </span>
        <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
      </Link>
    </Button>
  );
}
```

**Usage:**
```tsx
<CTAButton to="/pricing" defaultText="Get Started" hoverText="Let's Go!" />
<CTAButton to="/contact" defaultText="Book a Call" hoverText="Let's Talk" />
```

### F.8.2 Header Navigation Pattern

The Header uses these key design elements:

```tsx
// Scrolled state with gradient border
<header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
  scrolled 
    ? 'bg-background/95 backdrop-blur-xl border-b border-border/30 shadow-layered' 
    : 'bg-transparent'
}`}>
  {/* Gradient line on scroll */}
  {scrolled && (
    <div className="absolute bottom-0 left-0 right-0 h-px 
                    bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
  )}
```

**Nav Link with Animated Underline:**
```css
/* In index.css */
.nav-link {
  @apply relative;
}

.nav-link::after {
  content: '';
  @apply absolute bottom-0 left-0 w-full h-[2px] origin-left scale-x-0 transition-transform duration-300;
  background: linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.5) 100%);
}

.nav-link:hover::after {
  @apply scale-x-100;
}
```

**Glassmorphic Dropdown:**
```tsx
<div className="absolute top-full left-0 mt-3 w-80 
                bg-card/95 backdrop-blur-xl 
                border border-border/50 rounded-2xl 
                shadow-layered-lg overflow-hidden animate-fade-in">
  {/* Subtle gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent pointer-events-none" />
  
  {/* Content */}
  <div className="relative p-2">
    {items.map((item) => (
      <Link className="flex flex-col items-start px-4 py-3 rounded-xl 
                       hover:bg-accent/10 transition-all duration-200 group">
        <span className="font-semibold text-foreground group-hover:text-accent">{item.title}</span>
        <span className="text-xs text-muted-foreground">{item.description}</span>
      </Link>
    ))}
  </div>
</div>
```

### F.8.3 Footer Navigation Pattern

The Footer uses these key design elements:

```tsx
// Footer wrapper with mesh background
<footer className="relative bg-card overflow-hidden">
  {/* Background mesh gradient */}
  <div className="absolute inset-0 bg-mesh opacity-50 pointer-events-none" />
  
  {/* Gradient glow at top */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px 
                  bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-8 
                  bg-gradient-to-b from-accent/10 to-transparent blur-2xl" />
```

**Section Headers with Accent Line:**
```tsx
<h3 className="font-display font-bold text-foreground text-sm uppercase tracking-wider 
               flex items-center gap-2">
  <span className="w-6 h-px bg-gradient-to-r from-accent to-transparent" />
  Products
</h3>
```

**Footer Link with Slide-in Bar:**
```css
/* In index.css */
.footer-link {
  @apply relative text-muted-foreground transition-all duration-300;
}

.footer-link:hover {
  @apply text-foreground pl-1;
}

.footer-link::before {
  content: '';
  @apply absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0.5 bg-accent transition-all duration-300;
}

.footer-link:hover::before {
  @apply w-2;
}
```

**Social Icons with Glow:**
```tsx
<a className="relative p-2.5 rounded-xl 
              bg-muted/50 border border-border/50 text-muted-foreground 
              hover:text-foreground hover:border-accent/50 hover:bg-accent/10 
              transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 group">
  <social.icon className="w-4 h-4 relative z-10" />
  <div className="absolute inset-0 rounded-xl bg-accent/20 blur-lg 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
</a>
```

### F.9 GHL Loader Utility Pattern

```ts
// src/lib/ghlLoader.ts
const LOADER_SRC = 'https://beta.leadconnectorhq.com/loader.js';
const RESOURCES_URL = 'https://beta.leadconnectorhq.com/chat-widget/loader.js';
const GHL_WIDGET_DATA_ID = 'YOUR_WIDGET_ID'; // From GHL dashboard

export async function ensureGHLWidget(locationId?: string, timeout = 12000) {
  ensureLoaderScript();
  await waitForAPI(timeout);
  // Hide default launcher - we control via custom button
  setTimeout(() => window.leadConnector?.hideLauncher?.(), 300);
}

export function openViaAnyAPI(): boolean {
  return !!(window.leadConnector?.open?.() || window.LC_API?.open_chat_window?.());
}

export function closeViaAnyAPI(): boolean {
  return !!(window.leadConnector?.close?.() || window.LC_API?.close_chat_window?.());
}
```

### F.10 CSS: Force GHL Behind Cookie Banner

```css
/* src/index.css - Add to end of file */
#chat-widget,
.chat-widget,
[id*="chat"],
[class*="chat-widget"],
.leadconnector-chat {
  z-index: 40 !important;
}
```

### F.11 Required TypeScript Globals

```ts
// Add to src/vite-env.d.ts or separate globals.d.ts
declare global {
  interface Window {
    toggleGHLChat?: () => void;
    closeGHLChat?: () => void;
    leadConnector?: { open?: () => void; close?: () => void; hideLauncher?: () => void; };
    LC_API?: { open_chat_window?: () => void; close_chat_window?: () => void; };
  }
}
```

### F.12 App Integration Pattern

```tsx
// App.tsx - Add at end of BrowserRouter, before closing tag
import { CookieConsent } from "@/components/CookieConsent";
import { GHLChatWidget } from "@/components/GHLChatWidget";
import { DesktopChatButton } from "@/components/DesktopChatButton";

// Inside BrowserRouter:
<CookieConsent />
<GHLChatWidget />
<DesktopChatButton />
```

---

## Appendix G: Phased Implementation Plan

This appendix documents the staggered implementation approach for design system, cookie consent, and GHL integration. Phases are ordered to isolate external API complexity and enable incremental progress.

### G.1 Phase Overview

| Phase | Scope | Dependencies | Components |
|-------|-------|--------------|------------|
| **Phase 1** | Design System + Footer + Mobile Navbar | None (frontend only) | index.css, tailwind.config.ts, Footer, MobileBottomBar |
| **Phase 2** | Cookie Consent | Phase 1 complete | CookieConsent, App.tsx integration |
| **Phase 3** | GHL v2 Integration | Phase 2 complete + GHL specs locked | ghlLoader, GHLChatWidget, DesktopChatButton, env vars |

### G.2 Phase 1: Design System + Footer + Mobile Navbar

**Objective:** Update design tokens to Legal AI color system and build navigation components.

**Deliverables:**
1. `src/index.css` - Update with Legal AI HSL color tokens (Appendix F.1)
2. `tailwind.config.ts` - Update color references and add custom tokens
3. `src/components/layout/Footer.tsx` - Complete footer per BRD Section 17
4. `src/components/MobileBottomBar.tsx` - Mobile bottom navbar (hidden until cookie consent)

**Mobile Bottom Navbar Specification:**
- Visible only on mobile (`md:hidden`)
- Fixed to bottom of viewport (`fixed bottom-0`)
- Z-index 40 (below cookie consent banner)
- Gated by cookie consent (hidden until `localStorage.getItem('cookie-consent')` exists)
- Navigation items for SmartSites: Home, Services, Industries, Pricing, Chat (GHL trigger)
- Uses `window.toggleGHLChat()` for chat button

**Footer Structure (per BRD Section 17):**
- 4-column navigation: Services, Industries, Resources, Company
- Branded section: Globe icon (accent color) + "EverIntent Smart Sites", Book a Call button + social icons (LinkedIn, X, Facebook), contact info, divider, legal links, copyright, tagline
- Spacing: pt-4 above logo section, mt-8 between logo and button row on mobile, space-y-8 for content sections
- Desktop: logo left-aligned, button+socials right-aligned. Mobile: all centered, button row with gap-6

**Header Specification:**
- Sticky dark blue header (bg-primary) with full "EverIntent Smart Sites" name
- Globe icon in accent color beside brand name
- Hamburger menu icon styled with text-primary-foreground for visibility on dark background
- Get Started CTA button with bg-accent text-primary

**No external dependencies in Phase 1.**

### G.3 Phase 2: Cookie Consent

**Objective:** Implement California-compliant cookie consent banner that gates feature visibility.

**Deliverables:**
1. `src/components/CookieConsent.tsx` - Banner component (Appendix F.8)
2. App.tsx integration - Mount CookieConsent at app root
3. Wire Footer "Cookie Preferences" button to dispatch `cookie-consent-changed` event

**Gating Behavior:**
- Desktop chat button: Hidden until consent accepted
- Mobile bottom navbar: Hidden until consent accepted
- Cookie banner uses maximum z-index (`z-[2147483647]`)
- Other components at z-40

**Event System:**
```ts
// Accept/reject dispatches event
window.dispatchEvent(new Event('cookie-consent-changed'));

// Components listen for consent changes
window.addEventListener('cookie-consent-changed', checkConsent);
```

### G.4 Phase 3: GHL v2 Integration (Deferred)

**Objective:** Integrate GHL chat widget with proper API v2 patterns.

**Prerequisites (must be locked before implementation):**
1. GHL v2 API research complete
2. Environment variable strategy defined
3. Widget ID and Location ID obtained from GHL dashboard
4. Decision on Edge Function vs client-side injection approach

**Open Questions for GHL v2:**
- How to authenticate with GHL v2 API endpoints?
- Where to store credentials (Supabase secrets vs Vercel env vars)?
- Can Edge Functions be used for GHL API calls (vs client-side widget)?
- What objects are in scope for v2 writes (contacts, conversations, etc.)?
- What is the proper pattern for lazy-loading the widget?

**Deliverables (once specs locked):**
1. `src/lib/ghlLoader.ts` - Widget injection utilities
2. `src/components/GHLChatWidget.tsx` - Widget controller
3. `src/components/DesktopChatButton.tsx` - Desktop floating button
4. Environment variables: `VITE_GHL_LOCATION_ID`, `VITE_GHL_WIDGET_ID`
5. TypeScript globals for window extensions

**Reference Patterns:**
- See `docs/Component-Extraction-CookieConsent-GHL-MobileNav.md` for full code
- See Appendix F for condensed patterns

### G.5 Component Reference Table

| Component | File Path | Phase | Consent-Gated |
|-----------|-----------|-------|---------------|
| Footer | `src/components/layout/Footer.tsx` | 1 | No |
| MobileBottomBar | `src/components/MobileBottomBar.tsx` | 1 | Yes |
| CookieConsent | `src/components/CookieConsent.tsx` | 2 | N/A (controls gating) |
| DesktopChatButton | `src/components/DesktopChatButton.tsx` | 3 | Yes |
| GHLChatWidget | `src/components/GHLChatWidget.tsx` | 3 | No (but controlled via button) |
| ghlLoader | `src/lib/ghlLoader.ts` | 3 | N/A (utility) |

### G.6 Z-Index Hierarchy

```
Layer                    Z-Index         Visibility
───────────────────────────────────────────────────────────
Cookie Consent Banner    2147483647      Always visible until dismissed
Mobile Bottom Navbar     40              After cookie consent
Desktop Chat Button      40              After cookie consent (desktop only)
GHL Chat Widget         40              On-demand via button click
Standard Content        auto            Always
```

---

## Appendix H: vite-react-ssg Configuration Pattern

> **⚠️ REQUIRED READING**: This appendix documents critical SSG configuration patterns learned through debugging. Any Lovable project using `vite-react-ssg` MUST follow these patterns to avoid hydration errors and build failures.

### H.1 Critical Configuration Files

#### package.json Build Command

```json
{
  "scripts": {
    "build": "vite-react-ssg build"
  }
}
```

**⚠️ CRITICAL**: Build command MUST be `vite-react-ssg build`, NOT `vite build`. This is the most common mistake.

#### vite.config.ts

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssgOptions: {
    script: 'defer',
    formatting: 'minify',
    // Filter routes for pre-rendering - exclude admin routes only
    includedRoutes: (paths: string[]) => {
      return paths.filter(path => !path.startsWith('/admin'));
    },
  },
  // ⚠️ CRITICAL: NO manualChunks configuration
  // manualChunks conflicts with vite-react-ssg's external module handling
  // Error: "react cannot be included in manualChunks because it is resolved as external"
}));
```

#### vercel.json

```json
{
  "rewrites": [
    { "source": "/admin/:path*", "destination": "/index.html" }
  ]
}
```

**⚠️ NEVER use catch-all rewrite** like:
```json
{ "source": "/(.*)", "destination": "/index.html" }
```
This bypasses ALL pre-rendered static files and causes hydration errors #418/#423 in production.

### H.2 React Component Patterns

#### ClientOnly Wrapper (Required for Portal Components)

Radix UI components (Sheet, Dialog, DropdownMenu, Tooltip, etc.) create portals that cause hydration mismatches during SSG.

```typescript
// src/components/ClientOnly.tsx
import { useState, useEffect, type ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : <>{fallback}</>;
}
```

**Usage in routes.tsx:**
```typescript
import { ClientOnly } from '@/components/ClientOnly';

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Outlet />
      </Layout>

      {/* Portal-based components only render client-side */}
      <ClientOnly>
        <TooltipProvider>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </ClientOnly>
    </QueryClientProvider>
  );
}
```

#### isMounted Pattern (For Conditional UI)

For dropdowns, modals, and other conditionally rendered UI:

```typescript
const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

// In render - Radix components only after hydration
{isMounted && isOpen && (
  <DropdownMenu.Content>
    {/* ... */}
  </DropdownMenu.Content>
)}
```

#### QueryClient Placement (CRITICAL)

QueryClient MUST be created inside the component, not outside:

```typescript
// ✅ CORRECT - Inside component
function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  
  return (
    <QueryClientProvider client={queryClient}>
      {/* ... */}
    </QueryClientProvider>
  );
}

// ❌ WRONG - Outside component causes state persistence across SSR renders
const queryClient = new QueryClient();

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ... */}
    </QueryClientProvider>
  );
}
```

### H.3 Anti-Patterns to Avoid

| Anti-Pattern | Error | Solution |
|--------------|-------|----------|
| `manualChunks: { vendor: ['react'] }` | "react cannot be included in manualChunks because it is resolved as external" | Remove manualChunks entirely from vite.config.ts |
| Catch-all rewrite `/(.*) → /index.html` | Hydration errors #418/#423 | Use admin-only rewrite: `/admin/:path*` |
| Radix Sheet/DropdownMenu in SSG pages | Hydration mismatches | Use `isMounted` guard or `ClientOnly` wrapper |
| QueryClient outside component | State persistence errors | Create inside component with `useState` |
| Portal components without ClientOnly | Hydration mismatches | Wrap in `ClientOnly` |
| CSS-based GHL launcher hiding | Launcher still visible | Use GHL-side 1x1 pixel configuration |
| `React.lazy` for shared components (e.g., PlaceholderPage) | `_payload._result.toString is not a function` | Direct import for components used across many routes; lazy-load only single-use page components |

### H.4 Route Configuration Pattern

```typescript
// src/routes.tsx
import type { RouteRecord } from 'vite-react-ssg';

// All marketing routes for pre-rendering (excludes admin)
export const prerenderRoutes: string[] = [
  '/',
  '/pricing',
  '/about',
  // ... all other marketing routes
];

// Build routes array for vite-react-ssg
export const routes: RouteRecord[] = [
  // Marketing routes with Layout - will be pre-rendered
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      // ... all marketing child routes
    ],
  },
  // Admin routes - NOT pre-rendered, handled via SPA fallback
  {
    path: '/admin',
    Component: AdminLayout,
    children: [
      { path: 'login', Component: AdminLogin },
      // ... admin routes
    ],
  },
];
```

### H.5 Verification Checklist

Before deploying, verify:

1. ✅ Build completes with `vite-react-ssg build` (no errors)
2. ✅ `view-source:` on production shows pre-rendered HTML content (not empty SPA shell)
3. ✅ No console hydration errors (#418, #423, or "Text content does not match")
4. ✅ Admin routes still work (SPA fallback via vercel.json)
5. ✅ Portal-based components (toasts, tooltips) function correctly after hydration

### H.6 Debugging SSG Issues

**Symptom: "react cannot be included in manualChunks"**
- Cause: `manualChunks` in vite.config.ts
- Fix: Remove entire `build.rollupOptions.output.manualChunks` block

**Symptom: Hydration errors #418/#423 in production but not Lovable preview**
- Cause: Lovable preview doesn't run SSG build; production does
- Fix: Apply ClientOnly/isMounted patterns; check vercel.json for catch-all rewrites

**Symptom: Pre-rendered HTML is empty SPA shell**
- Cause: Catch-all rewrite bypassing static files
- Fix: Change vercel.json to only rewrite admin routes

**Symptom: Radix UI components cause hydration mismatch**
- Cause: Portals create different DOM during SSR vs client
- Fix: Wrap in ClientOnly or use isMounted pattern

---

**END OF DOCUMENT**
