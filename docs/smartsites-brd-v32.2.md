# EverIntent SmartSites — Complete Business Requirements Document v32.10

**Last Updated:** December 17, 2025  
**Version:** 32.10 (Multi-Widget Chat Architecture)
**Status:** BUILD-READY
**Owner:** EverIntent LLC  
**GitHub Path:** /docs/BRD/SmartSites-BRD-v32.md

---

## Document Purpose

This is the **single source of truth** for EverIntentSmartSites.com. It governs:

1. What customers buy (T1-T4 tiers, pricing, features)
2. What customers experience (UX flows from ad to purchase to delivery to billing)
3. What the team does (low-LOE provisioning, delivery SOPs)
4. What Lovable builds (marketing site pages, admin portal)
5. What gets configured in GHL + Stripe (SaaS plans, snapshots, billing)
6. What gets built on WordPress (customer sites T1-T4)
7. Go-To-Market execution (channels, niches, ad copy, UTMs)

**Non-goals:** This document does not debate architecture. It specifies requirements and the simplest implementation that meets them.

---

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
22. [Technical Architecture](#22-technical-architecture)
23. [Operational SOPs](#23-operational-sops)
24. [Upgrade & Downgrade Flows](#24-upgrade--downgrade-flows)
25. [Support Model](#25-support-model)
26. [Build Order & Timeline](#26-build-order--timeline)
27. [Open Questions](#27-open-questions)
28. [Document History](#28-document-history)

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

EverIntent SmartSites delivers professional websites and automation to local service businesses at transparent, affordable prices. Four tiers from $249 one-time to $497/month recurring, with clear upgrade paths and guaranteed ROI.

**Target Market:** Local service businesses across 4 industry categories and 65+ verticals

**Value Proposition:** "A professional website that actually gets you customers. Starting at $249."

---

## 2.1 Industry Verticals (65+ Total)

SmartSites serves local businesses across four main categories:

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
**DBA:** EverIntent SmartSites  
**Formation:** California LLC  
**EIN:** [On file]

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

### 5.1 Beautiful Websites (Primary Service)

**Problem:** Business owners know they need a website but are overwhelmed by options, jargon, and pricing games.

**Solution:** Professional 5-page website built in 5 days. Mobile-first. SEO-ready. You own everything.

**Outcome:** A website you're proud to show customers. One that actually generates calls.

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
┌─────────────────────────────────────┐
│ EverIntentSmartSites.com            │
│                                     │
│ Ready to start?     Need help?      │
│  [Get Started]    [Book 30min Call] │
└─────────────────────────────────────┘
```

**Path A: Ready to Buy** → Checkout flow
**Path B: Need Help** → GHL calendar booking → 30-min consultation

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
  '/domains',
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

### Marketing Site (everintentsmartsites.com)

```
/                               # Homepage
├── /beautiful-websites/        # Hero service page
├── /pricing/                   # Tier comparison + CTAs
├── /checkout/
│   ├── /smart-site/            # T1 pre-checkout
│   ├── /smart-lead/            # T2 pre-checkout
│   ├── /smart-business/        # T3 pre-checkout
│   ├── /smart-growth/          # T4 pre-checkout
│   └── /success/               # Post-payment success
├── /services/                  # Services hub
│   ├── /get-found-online/
│   ├── /never-miss-a-lead/
│   ├── /book-more-jobs/
│   ├── /run-from-your-phone/
│   ├── /build-your-reputation/
│   └── /let-ai-handle-it/
├── /domains/                   # Domain search utility
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
├── /portfolio/                 # Live sites as proof
├── /about/                     # Company story
├── /contact/                   # Contact form + "Book a Call" destination
├── /localpros/                 # Partner program
│   ├── /apply/
│   └── /success-stories/
├── /legal/
│   ├── /privacy/
│   ├── /terms/
│   └── /data-request/          # DSAR
├── /upgrade/                   # T1 upsell page
└── /admin/                     # Admin portal (protected)
    ├── /login/
    ├── /submissions/
    ├── /portfolio/
    └── /testimonials/
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
[Logo] | Services ▼ | Industries ▼ | Pricing | Portfolio | About | [Get Started]
```

**Services Dropdown:**
1. Beautiful Websites (top position)
2. Get Found Online
3. Never Miss a Lead
4. Book More Jobs
5. Run From Your Phone
6. Build Your Reputation
7. Let AI Handle It
8. Domains (domain search utility)

**Industries Dropdown:**
1. Home Services
2. Professional Services
3. Health & Wellness
4. Automotive Services

### Mobile Navigation

```
[Logo]                    [☰]
                           │
                           ▼
┌─────────────────────────┐
│ Services               >│
│ Industries             >│
│ Pricing                 │
│ Portfolio               │
│ About                   │
│ ─────────────────────── │
│ [Get Started]           │
└─────────────────────────┘
```

### Footer Navigation

**4-Column Navigation Grid (Desktop) / 2-Column (Mobile):**

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

### Channel Strategy

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

### TCPA Consent Language

```
By providing your phone number and checking this box, you consent to 
receive calls, text messages, and emails from EverIntent SmartSites 
and its partners regarding your inquiry. Message and data rates may 
apply. You may opt out at any time by replying STOP.
```

### California Bot Disclosure (AI Calling)

```
"Hi [Name], this is [AI Name], an AI assistant from EverIntent. 
I'm an automated system calling to [purpose]. 
Is this a good time to chat for 2 minutes?"
```

### Privacy Policy Requirements

- What data we collect
- How we use it
- Who we share it with
- Call recording disclosure
- Lead sharing disclosure (LocalPros)
- Cookie policy
- Data retention periods
- DSAR process

---

## 22. Technical Architecture

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

## 23. Operational SOPs

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

## 24. Upgrade & Downgrade Flows

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

## 25. Support Model

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

## 26. Build Order & Timeline

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

## 27. Open Questions

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

### Still Open

1. **Checkout subdomain:** `checkout.smartsites.everintent.com` vs `checkout.everintentsmartsites.com`
2. **Wallet initial funding:** Start at $0 with auto-recharge prompt vs pre-fund at signup
3. **Looker Studio:** Build template later if requested (not MVP)

---

## 28. Document History

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
| **v32.8** | **Dec 14** | **Careers Feature Spec**: Added /careers and /careers/:slug routes; jobs table in Supabase with admin-configurable form fields (loom_required, portfolio_required, custom_questions); GHL v2 API integration via Edge Function (submit-job-application); Admin CRUD at /admin/careers; Full spec documented in docs/careers-spec.md |
| **v32.9** | **Dec 16** | **Domain Integration Simplified**: Removed Namecheap API integration; Domain purchase moved to manual process during onboarding via GHL or Namecheap dashboard; Simplified checkout flow (yes/no domain question); Domain preferences collected in post-payment GHL intake form; /domains page removed from scope; Namecheap environment variables removed; n8n workflow simplified to notification/task creation only |
| **v32.10** | **Dec 17** | **Multi-Widget Chat Architecture**: GHL chat widgets now support multiple bots per page type (Sales, Support, Demo); Route-based widget selection via `GHLChatWidget.tsx`; Three new env vars (`VITE_GHL_WIDGET_ID_SALES`, `VITE_GHL_WIDGET_ID_SUPPORT`, `VITE_GHL_WIDGET_ID_DEMO`); Launcher hiding via JS shadow DOM penetration (code-based approach retained); Section 17.5 rewritten with multi-widget architecture and route mapping logic |

### Related Specification Documents

| Document | Path | Description |
|----------|------|-------------|
| Careers Feature Spec | `docs/careers-spec.md` | Complete careers/jobs feature specification including GHL v2 API integration, database schema, admin configuration, and UX flow |

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

### F.1 Color Palette (HSL Tokens)

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--primary` | `210 73% 15%` (Deep Navy) | `208 65% 34%` | Trust & Authority |
| `--primary-light` | `208 65% 34%` | `208 60% 45%` | Hover states |
| `--accent` | `44 44% 62%` (Rich Gold) | Same | Prestige (10% usage) |
| `--accent-hover` | `43 89% 38%` | Same | Gold interactions |
| `--background` | `0 0% 100%` | `240 28% 9%` | Page background |
| `--foreground` | `240 28% 14%` | `0 0% 98%` | Body text |
| `--muted-foreground` | `215 19% 35%` | `215 19% 65%` | Secondary text |
| `--border` | `214 32% 91%` | `210 30% 20%` | Borders |

### F.2 Typography

```css
font-heading: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
font-body: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

text-hero: 3rem / 1.1 / 900
text-section: 2.5rem / 1.2 / 800  
text-subheading: 2rem / 1.3 / 700
text-lead: 1.125rem / 1.6 / 400
text-stat: 3rem / 1 / 900
```

### F.3 Gradients

```css
--gradient-hero: linear-gradient(135deg, hsl(210 73% 15%) 0%, hsl(208 65% 34%) 100%)
--gradient-innovation: linear-gradient(135deg, hsl(44 44% 62%) 0%, hsl(43 89% 38%) 100%)
--gradient-ai: linear-gradient(180deg, hsl(210 17% 98%) 0%, hsl(0 0% 100%) 100%)
```

### F.4 Shadows

```css
--shadow-elevated: 0 10px 30px -10px hsl(210 73% 15% / 0.15)
--shadow-button: 0 4px 15px hsl(44 44% 62% / 0.2)
--shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08)
--shadow-glow: 0 0 20px hsl(44 44% 62% / 0.2)
```

### F.5 Animations

```css
--transition-smooth: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)
--transition-bounce: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)
animate-fade-in, animate-fade-up, animate-scale-in, animate-pulse-glow
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

```tsx
// src/components/DesktopChatButton.tsx
import { Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DesktopChatButton() {
  const [hasConsent, setHasConsent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const checkConsent = () => {
      const consent = localStorage.getItem('cookie-consent');
      setHasConsent(!!consent);
    };
    checkConsent();
    window.addEventListener('cookie-consent-changed', checkConsent);
    window.addEventListener('storage', checkConsent);
    return () => {
      window.removeEventListener('cookie-consent-changed', checkConsent);
      window.removeEventListener('storage', checkConsent);
    };
  }, []);

  useEffect(() => {
    if (hasConsent) {
      const timer = setTimeout(() => setIsVisible(true), 300);
      return () => clearTimeout(timer);
    }
  }, [hasConsent]);

  const handleClick = () => {
    if (window.toggleGHLChat) window.toggleGHLChat();
  };

  if (!hasConsent) return null;

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden md:flex fixed right-6 z-40 items-center gap-3 px-5 py-3 bg-primary/95 backdrop-blur-sm border border-accent/30 rounded-lg shadow-lg transition-all duration-300 hover:bg-primary hover:border-accent hover:shadow-xl hover:shadow-accent/20 group"
      style={{ bottom: isVisible ? '24px' : '-80px' }}
      aria-label="Chat with our AI assistant"
    >
      <Sparkles className="w-5 h-5 text-accent" />
      <span className="text-primary-foreground font-medium">
        {isHovered ? 'Chat with us' : 'Need help?'}
      </span>
    </button>
  );
}
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

**END OF DOCUMENT**
