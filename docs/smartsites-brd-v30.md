# EverIntent SmartSites — Complete Business Requirements Document v30

**Last Updated:** December 13, 2025  
**Version:** 30.0 (Fully Reconciled from v26 + v27 + v28 Session Decisions)  
**Status:** BUILD-READY  
**Owner:** EverIntent LLC  
**GitHub Path:** /docs/BRD/SmartSites-BRD-v30.md

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
18. [Go-To-Market Strategy](#18-go-to-market-strategy)
19. [LocalPros Network](#19-localpros-network)
20. [Compliance & Legal](#20-compliance--legal)
21. [Technical Architecture](#21-technical-architecture)
22. [Operational SOPs](#22-operational-sops)
23. [Upgrade & Downgrade Flows](#23-upgrade--downgrade-flows)
24. [Support Model](#24-support-model)
25. [Build Order & Timeline](#25-build-order--timeline)
26. [Open Questions](#26-open-questions)
27. [Document History](#27-document-history)

---

## 1. Quick Reference

### Pricing at a Glance

| Tier | Name | Tagline | Setup | Monthly | Year 1 Total | Build Time |
|------|------|---------|------:|--------:|-------------:|------------|
| T1 | Smart Site | "Get found online" | $249 | $0 | $249 | 2 hrs |
| T2 | Smart Lead | "Never miss another lead" | $0 | $197 | $2,364 | 3-4 hrs |
| T3 | Smart Business | "Run your business from your phone" | $149 | $347 | $4,313 | 4-5 hrs |
| T4 | Smart Growth | "Let AI handle it" | $249 | $497 | $6,213 | 6-8 hrs |

### Critical Business Rules

| Rule | Specification |
|------|---------------|
| T1 Renewal | $149/year starting Year 2 (12 months after purchase) |
| T1 Portal Access | YES - Neutered dashboard with GA4 stats, invoices, site link, upgrade CTA |
| Checkout Host | GHL SaaS Checkout (auto-provisions sub-accounts) |
| Payment Processor | Stripe (connected to GHL) |
| Customer Websites | WordPress on OVH/Plesk + Elementor Pro |
| Automation Layer | GoHighLevel sub-accounts |
| GA4 Ownership | EverIntent via analytics@everintent.com |
| Marketing Site | Next.js on Vercel Pro + Supabase |

---

## 2. Executive Summary

EverIntentSmartSites.com is a web agency brand under EverIntent LLC targeting SMB service businesses with a tiered pricing model. The strategy combines:

- **Low-friction entry:** $249 one-time websites (compete with WebsiteBuildersAmerica)
- **High-value recurring:** $197-$497/month automation services (compete with Webjuice)
- **Instant upgrade path:** Every T1 customer sits on a GHL sub-account ready for feature activation

**The Secret:** The $249 customer is sitting on a GHL-powered sub-account that can be upgraded instantly. Features are disabled until they upgrade, but the infrastructure is already in place.

### Two Revenue Streams

1. **SmartSites Agency** — Selling websites + automation to SMB customers (T1-T4)
2. **LocalPros Network** — Lead generation through 20 portfolio sites EverIntent owns and operates

---

## 3. Operating Entity

```
EverIntent LLC
2892 N Bellflower Blvd PMB 1018
Long Beach, CA 90815-1125
United States

Phone: (562) 685-9500
Email: support@everintent.com
Website: everintent.com
SmartSites Brand: everintentsmartsites.com
```

### Business Registration

- California LLC
- EIN on file
- Stripe account: EverIntent LLC
- GHL Agency account: Agency Pro ($497/month)

---

## 4. Business Model

### Competitive Models Studied

**Model 1: WebsiteBuildersAmerica.com**
- $149 complete website package
- No deposits, pay after delivery
- One-time fee, no monthly recurring
- **Their weakness:** No recurring revenue. No automation. No upsell path.

**Model 2: Webjuice.io**
- Starter: $1,000 setup + $97/mo
- Growth: $2,000 setup + $297/mo
- Elite: $3,000 setup + $697/mo
- **Their weakness:** Higher friction entry.

### Our Hybrid Strategy

**Enter like WebsiteBuildersAmerica** — $249, low friction, fast delivery
**Monetize like Webjuice** — automation features, monthly recurring

### Unit Economics

| Tier | Price | Marginal Cost | Gross Margin |
|------|-------|---------------|--------------|
| T1 | $249 one-time | ~$24/yr | 84% |
| T2 | $197/mo | ~$12/mo | 94% |
| T3 | $347/mo | ~$17/mo | 95% |
| T4 | $497/mo | ~$27/mo | 95% |

---

## 5. Services & Solutions

We do **7 things** for SMB service businesses. Everything else is packaging.

### Service 1: Beautiful Website That Works

**Tagline:** "A stunning site that actually brings in business"

**Problem:** Your website looks like it's from 2012. Or you don't have one at all. Customers judge you before they call.

**Solution:** Professional, mobile-first website design + fast loading + conversion-focused layout + your brand, your colors, your story.

**Outcome:** A website you're proud to share. Customers trust you before they even call.

**Included in:** T1, T2, T3, T4

**What's Included:**
- Professional 5-7 page website
- Mobile-first responsive design
- Custom branding (your colors, logo, story)
- Contact form with TCPA consent
- Click-to-call functionality
- Click-to-email functionality
- Speed optimized (< 3 second load)
- SSL certificate included
- 1 year hosting included
- 1 revision round included

---

### Service 2: Get Found Online

**Tagline:** "Show up when customers search for what you do"

**Problem:** Your business is invisible. Customers search, find competitors, call them instead.

**Solution:** Google Business Profile setup + local SEO basics + submit to directories + proper schema markup.

**Outcome:** Customers find you when they search for what you do in your area.

**Included in:** T1, T2, T3, T4

**What's Included:**
- Google Business Profile setup/optimization
- Bing Places setup
- Apple Maps listing
- Rank Math SEO plugin configured
- LocalBusiness schema markup
- XML sitemap submitted to Google Search Console
- XML sitemap submitted to Bing Webmaster Tools
- NAP consistency audit
- 5 directory submissions (Yelp, Facebook, etc.)

---

### Service 3: Never Miss a Lead

**Tagline:** "Turn missed calls into booked jobs"

**Problem:** You're on a roof. Phone rings. Goes to voicemail. Customer calls the next guy. He answers. He gets the job.

**Solution:** Missed Call Text Back + 2-way SMS + AI chatbot answers questions 24/7.

**Outcome:** Every lead captured. Every call returned. Customers feel taken care of even when you can't answer.

**Included in:** T2, T3, T4

**What's Included:**
- Local phone number (your area code)
- Missed Call Text Back (auto-text within 60 seconds)
- Customizable text message templates
- 2-way SMS conversations
- AI chatbot on website
- Chat widget installation
- Lead notifications (SMS + email)
- GHL mobile app access
- ~400 SMS/month (T2), ~600 SMS/month (T3), ~1,000 SMS/month (T4)
- ~30 AI minutes/month (T2), ~50 AI minutes/month (T3), ~100 AI minutes/month (T4)

---

### Service 4: Book More Jobs

**Tagline:** "Let customers book themselves while you work"

**Problem:** Playing phone tag to schedule appointments. Double-booking. Forgetting to follow up.

**Solution:** Online booking calendar + automatic reminders + integration with your schedule.

**Outcome:** Customers book when they want. You show up prepared. No-shows drop.

**Included in:** T3, T4

**What's Included:**
- Online booking calendar
- Service menu with durations
- Automatic confirmation emails
- SMS appointment reminders (24hr + 1hr before)
- Rescheduling/cancellation handling
- Calendar sync (Google Calendar, Outlook)
- Buffer time between appointments
- Service area/zip code filtering

---

### Service 5: Run From Your Phone

**Tagline:** "Your entire business in your pocket"

**Problem:** Paperwork piles up. Leads slip through cracks. You can't remember who called when.

**Solution:** Visual pipeline/CRM + auto follow-up sequences + everything accessible from your phone.

**Outcome:** Every lead tracked. Every follow-up automated. Nothing falls through the cracks.

**Included in:** T3, T4

**What's Included:**
- Visual pipeline (Kanban board)
- Lead/opportunity tracking
- Contact management
- Auto follow-up sequences
- Email templates
- Task management
- Notes and activity log
- Mobile app (iOS + Android)
- Custom pipeline stages

---

### Service 6: Build Your Reputation

**Tagline:** "5-star reviews without asking twice"

**Problem:** Happy customers don't leave reviews. Unhappy ones do. Competitors have more stars. Customers pick them instead.

**Solution:** Automated review requests + review response templates + reputation dashboard.

**Outcome:** More reviews. Higher ratings. Better rankings. More trust.

**Included in:** T3, T4

**What's Included:**
- Automated review request sequences
- Multi-platform support (Google, Facebook, Yelp)
- Review response templates
- Negative review alerts
- Review widget for website
- Review analytics
- QR code for in-person requests

---

### Service 7: Let AI Handle It

**Tagline:** "AI answers calls while you're on the job"

**Problem:** You can't answer phones when you're under a sink or on a roof.

**Solution:** AI voice bot handles inbound calls + qualifies leads + books appointments + routes urgent calls.

**Outcome:** Every call answered professionally. Qualified leads booked. You focus on the work.

**Included in:** T4

**What's Included:**
- AI voice bot (inbound calls)
- Lead qualification scripts
- Appointment booking via voice
- Call routing rules (urgent vs routine)
- Call transcription
- Voicemail-to-text
- After-hours handling
- Holiday schedules
- ~100 AI minutes/month

---

## 6. Tier Definitions

### Tier 1: Smart Site — $249 one-time

**Tagline:** "Get found online"

**Target Customer:** "I just need a website" — New businesses, solopreneurs, trades businesses without an online presence.

**Services Included:**
- Service 1: Beautiful Website That Works
- Service 2: Get Found Online

**Pricing:**
- $249 one-time payment (full amount at checkout)
- $149/year renewal starting Year 2 (hosting + maintenance + analytics)
- **Year 1 Total:** $249

**Build Time:** 2 hours production, 5-day delivery window

**What's Included:**
- Professional WordPress website (5-7 pages)
- Domain assistance (bring your own or we help register)
- 1 year hosting on OVH/Plesk
- SSL certificate
- Google Business Profile setup
- Branded email forwarding (info@yourdomain.com → your inbox)
- Rank Math SEO + schema markup
- GA4 tracking setup
- Monthly performance email (GA4 scheduled report)
- **GHL sub-account created** (features disabled, upgrade-ready)
- **Portal access** (neutered dashboard: GA4 stats, invoices, site link, upgrade CTA)

**What's NOT Included:**
- Phone number
- SMS/texting
- Chat widget
- Mobile app
- Conversations inbox
- Calendar
- Pipeline/CRM
- Review automation
- AI features

---

### Tier 2: Smart Lead — $197/mo

**Tagline:** "Never miss another lead"

**Target Customer:** "I'm missing leads" — The roofer on a ladder, plumber under a sink who can't answer the phone.

**Services Included:**
- Service 1: Beautiful Website That Works
- Service 2: Get Found Online
- Service 3: Never Miss a Lead

**Pricing:**
- $0 setup fee
- $197/month
- **Year 1 Total:** $2,364

**Build Time:** 3-4 hours

**Everything in T1, plus:**
- Local phone number (your area code)
- Missed Call Text Back
- 2-way SMS messaging
- AI chatbot on website
- Chat widget
- GHL mobile app access
- Full conversations inbox
- ~400 SMS/month included
- ~30 AI minutes/month included
- Overage: Auto-recharge in $25 increments

**GHL Sub-Account Features Enabled:**
- Conversations / Inbox
- Phone system
- SMS
- Chat widget
- Mobile app

---

### Tier 3: Smart Business — $149 setup + $347/mo

**Tagline:** "Run your business from your phone"

**Target Customer:** "I'm drowning in admin" — Volume businesses (HVAC, plumbing) who need to systematize.

**Services Included:**
- Services 1-6 (Beautiful Website + Get Found + Never Miss + Book More + Run From Phone + Build Reputation)

**Pricing:**
- $149 setup fee
- $347/month
- **Year 1 Total:** $4,313

**Build Time:** 4-5 hours

**Everything in T2, plus:**
- Calendar booking system
- Auto follow-up sequences
- Visual pipeline/CRM
- Review request automation
- ~600 SMS/month included
- ~50 AI minutes/month included

**GHL Sub-Account Features Enabled:**
- Everything in T2
- Calendar
- Opportunities/Pipeline
- Automation/Workflows
- Reviews/Reputation (basic)

---

### Tier 4: Smart Growth — $249 setup + $497/mo

**Tagline:** "Let AI handle it"

**Target Customer:** "I want to dominate my market" — Established businesses ready to scale (med spas, gyms, restoration companies).

**Services Included:**
- All 7 Services

**Pricing:**
- $249 setup fee
- $497/month
- **Year 1 Total:** $6,213

**Build Time:** 6-8 hours

**Everything in T3, plus:**
- AI voice bot (inbound calls)
- Reputation management dashboard
- Unified inbox (all channels in one place)
- Advanced automation workflows
- Quarterly strategy calls (30 min)
- ~1,000 SMS/month included
- ~100 AI minutes/month included

**GHL Sub-Account Features Enabled:**
- Everything in T3
- AI Voice
- Advanced Reputation Dashboard
- Unified Inbox
- Advanced Workflows

---

## 7. Complete Feature Matrix

| Feature | T1 | T2 | T3 | T4 |
|---------|:--:|:--:|:--:|:--:|
| **WEBSITE & FOUNDATION** |
| Professional website | ✓ | ✓ | ✓ | ✓ |
| Mobile-first design | ✓ | ✓ | ✓ | ✓ |
| Domain assistance | ✓ | ✓ | ✓ | ✓ |
| Hosting (Year 1) | ✓ | ✓ | ✓ | ✓ |
| SSL certificate | ✓ | ✓ | ✓ | ✓ |
| Content written | ✓ | ✓ | ✓ | ✓ |
| Google Business Profile | ✓ | ✓ | ✓ | ✓ |
| Branded email forwarding | ✓ | ✓ | ✓ | ✓ |
| **SEO & TRACKING** |
| Rank Math SEO | ✓ | ✓ | ✓ | ✓ |
| Schema markup | ✓ | ✓ | ✓ | ✓ |
| Sitemap to GSC/Bing | ✓ | ✓ | ✓ | ✓ |
| Google Analytics 4 | ✓ | ✓ | ✓ | ✓ |
| Click-to-call tracking | ✓ | ✓ | ✓ | ✓ |
| Click-to-email tracking | ✓ | ✓ | ✓ | ✓ |
| Form submission tracking | ✓ | ✓ | ✓ | ✓ |
| Monthly performance email | ✓ | ✓ | ✓ | ✓ |
| **LEAD CAPTURE** |
| Local phone number | ✗ | ✓ | ✓ | ✓ |
| Missed Call Text Back | ✗ | ✓ | ✓ | ✓ |
| 2-way SMS | ✗ | ✓ | ✓ | ✓ |
| AI chatbot | ✗ | ✓ | ✓ | ✓ |
| Chat widget | ✗ | ✓ | ✓ | ✓ |
| GHL mobile app | ✗ | ✓ | ✓ | ✓ |
| **AUTOMATION & CRM** |
| Calendar booking | ✗ | ✗ | ✓ | ✓ |
| Auto follow-up sequences | ✗ | ✗ | ✓ | ✓ |
| Visual pipeline/CRM | ✗ | ✗ | ✓ | ✓ |
| Review automation | ✗ | ✗ | ✓ | ✓ |
| **AI & GROWTH** |
| AI voice bot (inbound) | ✗ | ✗ | ✗ | ✓ |
| Reputation dashboard | ✗ | ✗ | ✗ | ✓ |
| Unified inbox | ✗ | ✗ | ✗ | ✓ |
| Advanced workflows | ✗ | ✗ | ✗ | ✓ |
| Quarterly strategy calls | ✗ | ✗ | ✗ | ✓ |
| **PORTAL ACCESS** |
| GHL sub-account | ✓ | ✓ | ✓ | ✓ |
| Dashboard (GA4 widgets) | ✓ | ✓ | ✓ | ✓ |
| Company Billing | ✓ | ✓ | ✓ | ✓ |
| View My Website link | ✓ | ✓ | ✓ | ✓ |
| Upgrade CTA | ✓ | N/A | N/A | N/A |
| Conversations | ✗ | ✓ | ✓ | ✓ |
| **CONSUMABLES (Monthly)** |
| SMS included | 0 | 400 | 600 | 1,000 |
| AI minutes included | 0 | 30 | 50 | 100 |
| Email sends | 0 | 1,000 | 2,500 | 5,000 |

---

## 8. Competitive Analysis

### Year 1 Cost Comparison

| Offering | Setup | Monthly | Year 1 Total |
|----------|------:|--------:|-------------:|
| WebsiteBuildersAmerica | $149 | $0 | $149 |
| Webjuice Starter | $1,000 | $97 | $2,164 |
| Webjuice Growth | $2,000 | $297 | $5,564 |
| Webjuice Elite | $3,000 | $697 | $11,364 |
| **SmartSites T1** | $249 | $0 | $249 |
| **SmartSites T2** | $0 | $197 | $2,364 |
| **SmartSites T3** | $149 | $347 | $4,313 |
| **SmartSites T4** | $249 | $497 | $6,213 |

### Where We Win

- **T1:** $100 more than WebsiteBuildersAmerica but includes GBP setup, SEO basics, GA4 tracking, and a dormant GHL sub-account ready for instant upgrade.
- **T3:** $1,251 cheaper than Webjuice Growth with more features.
- **T4:** $5,151 cheaper than Webjuice Elite with comparable features.

---

## 9. Customer Journey

### Journey Map

```
WEBSITE → GET FOUND → CAPTURE → BOOK → MANAGE → GROW
    ↓         ↓          ↓        ↓       ↓        ↓
Service 1  Service 2  Service 3  Service 4  Service 5  Service 6+7
   T1+        T1+        T2+       T3+       T3+       T3/T4
```

### 9.1 Entry to Site (All Tiers)

**Traffic Sources:**
- Craigslist ads (high intent)
- Facebook ads (interrupt-based)
- Trade groups (authority building)
- Organic search
- Direct/referral

**Landing Experience:**
1. Customer lands on everintentsmartsites.com
2. Sees benefit-first messaging (not feature lists)
3. Pricing is visible and clear
4. Portfolio shows real examples (LocalPros sites)
5. CTA: "Get Started" on tier card

**UTM Tracking Required:**
- All paid traffic tagged with UTMs
- UTMs persist through session (localStorage)
- UTMs captured in pre-checkout form
- UTMs passed to GHL on provisioning

---

### 9.2 Pre-Checkout (Marketing Site)

**Pages:**
- `/checkout/smart-site`
- `/checkout/smart-lead`
- `/checkout/smart-business`
- `/checkout/smart-growth`

**What Customer Sees:**
- Tier summary (name, price, key features)
- Short form (one screen)
- "What happens next" timeline
- Trust elements

**Form Fields:**

| Field | Type | Required | Notes |
|-------|------|:--------:|-------|
| first_name | text | ✓ | Min 2 chars |
| last_name | text | ✓ | Min 2 chars |
| email | email | ✓ | Standard email validation |
| phone | tel | ✓ | US 10-digit, formatted |
| business_name | text | ✓ | |
| domain_choice | radio | ✓ | "I have a domain" / "I need a domain" |
| domain_name | text | conditional | If "I have a domain" |
| tcpa_consent | checkbox | ✓ | Must be checked |

**System Actions:**
1. Validate all fields (inline, real-time)
2. Save to Supabase `checkout_submissions` table
3. Capture UTMs from session
4. Redirect to GHL checkout URL with prefilled params

**Redirect URL Structure:**
```
https://checkout.smartsites.everintent.com/{tier-slug}
  ?first_name={first_name}
  &last_name={last_name}
  &email={email}
  &phone={phone}
```

---

### 9.3 Payment (GHL SaaS Checkout)

**Checkout Host:** GHL SaaS Checkout (not Stripe-hosted)

**Why GHL Checkout:**
- Auto-provisions sub-accounts on payment success
- No custom webhook code needed
- Built-in dunning and retry logic
- Handles upgrades/downgrades natively

**What Customer Sees:**
- Tier name and price
- Card entry form
- Terms/Privacy acknowledgement
- Due today amount
- Renewal language:
  - T1: "Includes first year. Renews at $149/year after 12 months."
  - T2-T4: "Billed monthly. Cancel anytime."

**On Payment Success:**
1. Stripe charge processed (via GHL)
2. GHL creates sub-account automatically
3. GHL applies tier snapshot
4. GHL sends welcome email with login credentials
5. GHL triggers onboarding workflow
6. Customer redirected to success page

---

### 9.4 Success Page (Marketing Site)

**URL:** `/checkout/success?tier={tier}&session_id={...}`

**Content:**
- Thank you message
- "Check your email for your portal login"
- "Next: Complete your intake form" (linked)
- Timeline: "What happens next"
  - Day 1: We start building
  - Day 3: First draft for review
  - Day 5: Final delivery

**CTA:** "Complete Intake Form" → Links to GHL intake form

---

### 9.5 Intake (GHL Form)

**Goal:** Collect everything needed to build without back-and-forth.

**Intake Form Fields:**

| Section | Field | Required |
|---------|-------|:--------:|
| **Brand** | Logo upload | ✓ |
| | Primary brand color | |
| | Secondary brand color | |
| **Contact** | Business phone (for website) | ✓ |
| | Business email (for website) | ✓ |
| **Services** | List of services offered | ✓ |
| | Service area (cities/zip codes) | ✓ |
| **Hours** | Business hours | |
| **Content** | About the business (paragraph) | |
| | Photos (upload) | |
| | Existing testimonials | |
| **Domain** | Registrar access (if existing domain) | |
| | DNS access status | |
| | For new domains: confirm selection | |

**Automation:**
- Intake email sent immediately after payment
- Reminder at 24h if incomplete
- Reminder at 48h if incomplete
- Internal task created when intake complete

---

### 9.6 Delivery & Go-Live

**Definition of "Live":**
- Site reachable on customer domain (preferred)
- OR staging URL if DNS pending (customer notified)

**Delivery Email Must Include:**
- Live site link
- Portal login link
- What's next (how to request edits, support)
- Upgrade CTA (T1 → T2)

**Delivery Timeline:**
- T1: 5 business days from intake completion
- T2-T4: 3-5 business days from intake completion

---

### 9.7 Ongoing Experience

**T1 Ongoing:**
- Monthly GA4 PDF emailed (scheduled report)
- Portal access for stats, invoices, upgrade
- Support: email only
- Renewal at 12 months: $149/year

**T2-T4 Ongoing:**
- Portal for daily operations (conversations, leads)
- Usage visible in Company Billing
- Wallet for consumables (auto-recharge)
- Support: chat + email
- T4: Quarterly strategy call

---

## 10. Checkout & Billing Architecture

### 10.1 System of Record

| Data | System | Notes |
|------|--------|-------|
| Payment processing | Stripe (via GHL) | Credit card charges, subscriptions |
| Subscription management | GHL SaaS Mode | Plans, renewals, dunning |
| Sub-account provisioning | GHL | Auto-creates on payment |
| Feature access | GHL Snapshots | Controls what customer sees |
| Usage tracking | GHL | SMS, phone, AI minutes |
| Usage rebilling | GHL → Stripe | Auto-charges overages |
| Lead capture (pre-checkout) | Supabase | Marketing site forms |

### 10.2 Checkout Host Decision: GHL

**Decision:** Use GHL SaaS Checkout, not Stripe-hosted checkout.

**Rationale:**
- GHL SaaS Mode auto-provisions sub-accounts on payment success
- No custom webhook code required
- Built-in dunning and retry logic
- Handles upgrades/downgrades natively
- Less engineering work = faster to market

**Trade-off:** Less control over checkout UI, but acceptable for MVP.

### 10.3 GHL SaaS Plans

| Plan Name | Setup Fee | Monthly | Trial | Snapshot |
|-----------|----------:|--------:|:-----:|----------|
| SmartSite-T1 | $249 | $0 | 365 days | ss-t1-snapshot |
| SmartLead-T2 | $0 | $197 | None | ss-t2-snapshot |
| SmartBusiness-T3 | $149 | $347 | None | ss-t3-snapshot |
| SmartGrowth-T4 | $249 | $497 | None | ss-t4-snapshot |

**T1 Plan Configuration (Special):**
- Setup fee: $249 (one-time, due at checkout)
- Monthly price: $0
- Trial period: 365 days
- Annual price: $149/year (kicks in after trial)

This configuration:
- Charges $249 upfront
- Creates sub-account (triggers provisioning)
- Does not charge monthly
- After 12 months, charges $149/year for renewal

### 10.4 Stripe Products (Created by GHL)

When you configure GHL SaaS plans with Stripe connected, GHL creates the Stripe products automatically. Manual Stripe product creation is not required.

### 10.5 Usage Rebilling (T2-T4)

**Markup Structure:**

| Usage Type | Wholesale | Rebill | Markup |
|------------|----------:|-------:|-------:|
| SMS (in/out) | $0.0079 | $0.015 | 1.9x |
| Phone (per min) | $0.013 | $0.026 | 2.0x |
| AI (per min) | $0.07 | $0.15 | 2.1x |
| Email (per 1K) | $1.00 | $2.50 | 2.5x |

**Overage Handling:**
- Alert at 80% allocation
- Auto-recharge wallet when depleted
- Default wallet: $0 initial, auto-recharge $25 when balance < $5
- Charges appear on customer's Stripe invoice

### 10.6 Professional Services Billing

For ad-hoc work (revisions, additions, custom work):

| Customer Type | Billing Method | Why |
|---------------|----------------|-----|
| T1-T4 (has GHL account) | GHL Invoice | Appears in Company Billing |
| Prospect (no account) | Stripe Invoice / Payment Link | No GHL sub-account exists |
| LocalPros partner | Stripe Invoice | External to SmartSites |

### 10.7 Invoice Visibility

| What | T1 | T2-T4 |
|------|:--:|:-----:|
| Initial purchase receipt | Stripe email | Stripe email |
| Monthly subscription | N/A | Stripe email |
| Wallet/overage charges | N/A | In Company Billing |
| Ad-hoc invoices | In Company Billing | In Company Billing |
| Annual renewal receipt | Stripe email | N/A |

---

## 11. GHL Configuration

### 11.1 Agency Settings

**Required Configuration:**
- SaaS Mode: ENABLED
- Stripe: CONNECTED (EverIntent LLC account)
- Rebilling: ENABLED (markup per usage table)
- Custom domain: checkout.smartsites.everintent.com

### 11.2 SaaS Plans (4 Total)

Create one plan per tier with settings from Section 10.3.

### 11.3 Snapshots (4 Total)

**ss-t1-snapshot (T1 Neutered):**

| Module | Visible | Notes |
|--------|:-------:|-------|
| Dashboard | ✓ | Custom with GA4 widgets |
| Contacts | ✗ | Hidden |
| Conversations | ✗ | Hidden |
| Calendar | ✗ | Hidden |
| Opportunities | ✗ | Hidden |
| Payments | ✗ | Hidden |
| Automation | ✗ | Hidden |
| Sites | ✗ | Hidden |
| Marketing | ✗ | Hidden |
| Reputation | ✗ | Hidden |
| Reporting | ✗ | Hidden |
| Settings | ✓ | Company Billing only |

**Custom Menu Items (T1):**
- "View My Website" → Opens customer site URL in new tab
- "Upgrade Your Plan" → Links to /pricing
- "Support" → Opens support email

**ss-t2-snapshot (T2 Enabled):**

| Module | Visible |
|--------|:-------:|
| Dashboard | ✓ |
| Contacts | ✓ |
| Conversations | ✓ |
| Calendar | ✗ |
| Opportunities | ✗ |
| Settings | ✓ |

**ss-t3-snapshot (T3 Enabled):**

| Module | Visible |
|--------|:-------:|
| Dashboard | ✓ |
| Contacts | ✓ |
| Conversations | ✓ |
| Calendar | ✓ |
| Opportunities | ✓ |
| Reputation | ✓ (basic) |
| Settings | ✓ |

**ss-t4-snapshot (T4 Full Access):**

| Module | Visible |
|--------|:-------:|
| Dashboard | ✓ |
| Contacts | ✓ |
| Conversations | ✓ |
| Calendar | ✓ |
| Opportunities | ✓ |
| Reputation | ✓ (full) |
| Reporting | ✓ |
| Settings | ✓ |

### 11.4 Welcome Email Template

```
Subject: Your SmartSites Portal is Ready!

Hi {first_name},

Welcome to SmartSites! Your portal is ready.

LOGIN TO YOUR PORTAL:
{portal_url}

Username: {email}
Password: {temp_password}

NEXT STEP: Complete your intake form
{intake_form_url}

We'll start building your website once you submit your info.

Timeline:
- Intake complete → We start within 1 business day
- First draft → Day 3
- Final delivery → Day 5

Questions? Reply to this email.

— The SmartSites Team
EverIntent LLC
```

### 11.5 Intake Form Workflow

**Trigger:** New sub-account created

**Actions:**
1. Wait 5 minutes
2. Send intake email
3. Create task: "Intake pending for {business_name}"
4. Wait 24 hours
5. If intake not complete → Send reminder 1
6. Wait 24 hours
7. If intake not complete → Send reminder 2
8. Wait 24 hours
9. If intake not complete → Alert team

**On Intake Complete:**
1. Update contact: intake_status = complete
2. Create task: "Build website for {business_name}"
3. Move to pipeline stage: "In Build"
4. Notify team via Slack/email

### 11.6 GHL Custom Fields

| Field | Type | Purpose |
|-------|------|---------|
| tier | Dropdown | T1/T2/T3/T4 |
| website_domain | Text | For "View My Website" link |
| ga4_property_id | Text | For dashboard connection |
| intake_status | Dropdown | pending/complete |
| site_status | Dropdown | building/review/live |
| delivery_date | Date | When site went live |
| renewal_date | Date | T1 annual renewal |

---

## 12. Customer Portal Architecture

### 12.1 T1 Dashboard (Neutered)

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
│  │ Never miss another lead with:               │           │
│  │ ✓ Missed Call Text Back                     │           │
│  │ ✓ 2-way SMS                                 │           │
│  │ ✓ AI chatbot                                │           │
│  │                                              │           │
│  │ [Upgrade to Smart Lead - $197/mo]           │           │
│  └─────────────────────────────────────────────┘           │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│ MENU:                                                       │
│ • Dashboard                                                 │
│ • View My Website →                                         │
│ • Company Billing                                           │
│ • Upgrade Your Plan →                                       │
│ • Support →                                                 │
└─────────────────────────────────────────────────────────────┘
```

### 12.2 T2-T4 Dashboard

Standard GHL dashboard with features enabled per snapshot. Progressively more modules visible as tier increases.

---

## 13. GA4 & Analytics

### 13.1 GA4 Account Structure

**Owner Account:** analytics@everintent.com

**Per Customer:**
- Create GA4 property under analytics@everintent.com
- Property name: "{Business Name} - SmartSites"
- Data stream: Web

### 13.2 GA4 Installation (WordPress)

1. Install Site Kit by Google plugin
2. Connect to analytics@everintent.com
3. Select/create GA4 property
4. Enable enhanced measurement

### 13.3 GA4 → GHL Connection

**Process (Manual, per customer):**
1. In GHL sub-account → Integrations → Google Analytics
2. OAuth with analytics@everintent.com
3. Select the customer's GA4 property
4. Save

**Note:** GA4 OAuth tokens can expire. Plan for quarterly spot-checks.

### 13.4 Proactive Reporting: GA4 Scheduled Emails

**Method:** Native GA4 scheduled email feature (no middleware)

**Setup per customer (2 minutes):**
1. Go to GA4 property (analytics@everintent.com)
2. Reports → Traffic Acquisition (or Engagement Overview)
3. Click Share → Schedule email
4. Recipient: customer's email
5. Frequency: Monthly (1st of month)
6. Format: PDF
7. Save

**Customer receives:** Branded PDF report in inbox monthly. Zero ongoing effort.

### 13.5 Customer-Owned GA4 (Optional)

**Scenario:** Customer wants their own GA4 tracking.

**Process:**
1. Customer creates their own GA4 property
2. Customer provides Measurement ID (G-XXXXXXXXX)
3. We add their tracking alongside ours in WordPress header:

```html
<!-- EverIntent tracking (DO NOT REMOVE) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-OURS123"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-OURS123');
  gtag('config', 'G-THEIRS456'); // Customer's property
</script>
```

**What stays the same:**
- Our GA4 property keeps working
- GHL dashboard keeps showing their stats
- Monthly email reports keep sending

**What they get:**
- Full access to their own GA4
- Can add their team members
- Independence without breaking our setup

---

## 14. WordPress Customer Sites

### 14.1 Hosting Infrastructure

| Component | Specification |
|-----------|---------------|
| Provider | OVH |
| Server | VPS |
| Control Panel | Plesk |
| Email | AWS SES (smart host) |
| CDN/Security | Cloudflare |
| SSL | Let's Encrypt (auto) |

### 14.2 WordPress Stack

| Component | Specification |
|-----------|---------------|
| Theme | Hello Elementor |
| Page Builder | Elementor Pro |
| SEO | Rank Math |
| Forms | WPForms or Elementor Forms |
| Caching | WP Super Cache |
| Security | Wordfence |
| Backup | UpdraftPlus |

### 14.3 Plugin Stack (Standard)

**Required for all sites:**
- Elementor Pro
- Hello Elementor theme
- Rank Math SEO
- Site Kit by Google
- WP Super Cache
- Wordfence Security
- UpdraftPlus
- WPCode Lite (for tracking codes)

### 14.4 Site Build Checklist

| Task | T1 | T2 | T3 | T4 |
|------|:--:|:--:|:--:|:--:|
| WordPress installed | ✓ | ✓ | ✓ | ✓ |
| Theme + plugins | ✓ | ✓ | ✓ | ✓ |
| Home page | ✓ | ✓ | ✓ | ✓ |
| Services page | ✓ | ✓ | ✓ | ✓ |
| About page | ✓ | ✓ | ✓ | ✓ |
| Contact page | ✓ | ✓ | ✓ | ✓ |
| Service area page | ✓ | ✓ | ✓ | ✓ |
| Privacy policy | ✓ | ✓ | ✓ | ✓ |
| Terms of service | ✓ | ✓ | ✓ | ✓ |
| GA4 installed | ✓ | ✓ | ✓ | ✓ |
| Rank Math configured | ✓ | ✓ | ✓ | ✓ |
| Schema markup | ✓ | ✓ | ✓ | ✓ |
| Mobile tested | ✓ | ✓ | ✓ | ✓ |
| Speed < 3s | ✓ | ✓ | ✓ | ✓ |
| GBP setup | ✓ | ✓ | ✓ | ✓ |
| Chat widget | ✗ | ✓ | ✓ | ✓ |
| Booking calendar | ✗ | ✗ | ✓ | ✓ |

### 14.5 Branded Email (T1)

**Requirement:** T1 customers get branded email forwarding.

**Example:** info@customerdomain.com → customer's Gmail

**Implementation:**
- Set up email forwarding in Plesk
- No mailbox storage (forward only)
- Customer can reply from their own email client

---

## 15. Marketing Site Specification

### 15.1 Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Hosting | Vercel Pro |
| Database | Supabase |
| Styling | Tailwind CSS |
| Forms | React Hook Form + Zod |
| Auth (admin) | Supabase Auth (email OTP) |
| Analytics | GA4 + GHL tracking |

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

**admins:**
```sql
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  email TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 15.3 RLS Policies

```sql
-- Portfolio: anon can read active items
CREATE POLICY "Portfolio public read" ON portfolio
  FOR SELECT USING (is_active = true);

-- Portfolio: admins can do everything
CREATE POLICY "Portfolio admin full" ON portfolio
  FOR ALL USING (auth.uid() IN (SELECT user_id FROM admins));

-- Similar policies for testimonials, checkout_submissions
```

### 15.4 Admin Portal

**URL:** /admin

**Protected by:** Supabase Auth (email OTP for admins)

**Features:**
- View checkout submissions
- Manage portfolio items
- Manage testimonials
- Export CSV

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
├── /features/                  # Feature deep-dives (SEO pages)
│   ├── /missed-call-text-back/
│   ├── /ai-chatbot/
│   ├── /calendar-booking/
│   ├── /review-automation/
│   ├── /ai-voice/
│   └── /unified-inbox/
├── /industries/                # Industry landing pages
│   ├── /hvac/
│   ├── /roofing/
│   ├── /plumbing/
│   ├── /landscaping/
│   ├── /cleaning/
│   └── /[more as needed]/
├── /portfolio/                 # Live sites as proof
├── /case-studies/              # Customer success stories
├── /about/                     # Company story
├── /contact/                   # Contact form
├── /book-call/                 # GHL calendar embed
├── /domains/                   # Domain search utility
├── /localpros/                 # Partner program
│   ├── /apply/
│   └── /success-stories/
├── /legal/
│   ├── /privacy-policy/
│   ├── /terms-of-service/
│   └── /data-request/          # DSAR
├── /upgrade/                   # T1 upsell page
└── /admin/                     # Admin portal (protected)
    ├── /login/
    ├── /checkouts/
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

---

## 17. Navigation Structure

### Primary Navigation (Desktop)

```
[Logo] | Beautiful Websites | Services ▼ | Pricing | Portfolio | About | [Get Started]
```

**Services Dropdown:**
- Get Found Online
- Never Miss a Lead
- Book More Jobs
- Run From Your Phone
- Build Your Reputation
- Let AI Handle It

### Secondary Navigation (Footer)

**Column 1: Services**
- Beautiful Websites
- Get Found Online
- Never Miss a Lead
- Book More Jobs
- Run From Your Phone
- Build Your Reputation
- Let AI Handle It

**Column 2: Tiers**
- Smart Site
- Smart Lead
- Smart Business
- Smart Growth

**Column 3: Company**
- About
- Portfolio
- Case Studies
- Contact
- Book a Call

**Column 4: Legal**
- Privacy Policy
- Terms of Service
- Data Request

**Footer Bottom:**
- © 2025 EverIntent LLC
- Address
- Phone
- "Solutions that pay for themselves in 60-90 days"

### Mobile Navigation

- Hamburger menu
- Same structure as desktop
- "Get Started" prominent CTA

---

## 18. Go-To-Market Strategy

### 18.1 Three-Prong Channel Approach

**Prong 1: Craigslist (The Sniper)**
- High-intent leads actively looking
- Best for: Trades (HVAC, Roofing, Plumbing, Landscaping, Cleaning)
- 3 ads/day per market
- Two ad types:
  - "Cheap Website" (T1 bait)
  - "Missed Call Text Back" (T2/T3 bait)
- Starting markets: Phoenix, Dallas, Houston, Tampa, Atlanta

**Prong 2: Facebook Ads (The Dragnet)**
- Interrupt-based, sell the outcome not the website
- Best for: Solar, Med Spa, Gyms, Auto Detailing
- Creative concept: Phone ringing → voicemail → text pops up automatically
- Targeting: Job titles (Owner, Founder) + Industry interests
- Launch after Craigslist validates messaging

**Prong 3: Trade Groups (The Infiltrator)**
- Authority building, high-ticket whale hunting
- Best for: HVAC, Restoration, Med Spa, Gyms
- Strategy: Give away SOPs and templates, sell implementation
- Never post "I sell websites" — post value, collect DMs

### 18.2 Channel-Niche Fit Matrix

| Niche | Tier Fit | Craigslist | Facebook | Groups |
|-------|:--------:|:----------:|:--------:|:------:|
| Painting | T1 | ✓ | ✓ | — |
| Pressure Washing | T1 | ✓ | ✓ | — |
| Mobile Detailing | T1 | ✓ | ✓ | — |
| Roofing | T2 | ✓ | ✓ | ✓ |
| Landscaping | T2 | ✓ | ✓ | — |
| Cleaning | T2 | ✓ | ✓ | — |
| Tree Service | T2 | ✓ | ✓ | — |
| Junk Removal | T2 | ✓ | ✓ | — |
| Pool Service | T2 | ✓ | ✓ | — |
| Garage Door | T2 | ✓ | ✓ | — |
| Fencing | T2 | ✓ | ✓ | — |
| Moving | T2 | ✓ | ✓ | — |
| HVAC | T3 | ✓ | ✓ | ✓ |
| Plumbing | T3 | ✓ | ✓ | — |
| Real Estate Investors | T3 | — | ✓ | ✓ |
| Event Rentals | T3 | — | ✓ | — |
| Solar | T3 | — | ✓ | — |
| Gyms/CrossFit | T4 | — | ✓ | ✓ |
| Restoration | T4 | — | — | ✓ |
| Med Spa | T4 | — | ✓ | ✓ |

### 18.3 Benefits Selling vs Feature Selling

**The Rule:** Lead with outcomes, not specs.

**BAD (Feature Selling):**
- "Includes GoHighLevel CRM"
- "2-way SMS messaging"
- "AI-powered chatbot"

**GOOD (Benefits Selling):**
- "Never miss another lead, even when you're on a roof"
- "Turn missed calls into booked jobs automatically"
- "Your website answers questions at 2am so you don't have to"

### 18.4 Benefit Statements by Tier

**T1 — Smart Site:**
- "Look professional online for less than your truck payment"
- "Get found on Google by customers in your area"
- "Know exactly how many people are trying to reach you"

**T2 — Smart Lead:**
- "Stop losing jobs because you couldn't answer the phone"
- "Every missed call becomes a text conversation automatically"
- "Respond to leads in seconds, not hours"
- "Your competitors are texting back in 30 seconds. How long does it take you?"

**T3 — Smart Business:**
- "Run your entire business from your phone"
- "Customers book themselves while you're on the job"
- "Every lead tracked, every follow-up automated"
- "5-star reviews without asking twice"

**T4 — Smart Growth:**
- "AI answers your calls while you're under the sink"
- "Never miss a call, even at 2am"
- "Your AI receptionist qualifies leads and books appointments"
- "Focus on the work. We'll handle the phones."

### 18.5 Ad Copy Examples

**Craigslist T1 Ad:**

```
$249 Professional Website for [Trade] Businesses

Tired of losing jobs to competitors with better websites?

Get a professional, mobile-friendly website that makes you 
look legit. Includes Google Business setup, so customers 
can actually find you.

- Done in 5 days
- You own it forever
- No monthly fees

Reply with your business name and we'll send examples.
```

**Craigslist T2/T3 Ad:**

```
Stop Losing Jobs to Missed Calls

You're on a roof. Phone rings. Goes to voicemail.
Customer calls the next guy. He answers. He gets the job.

What if your phone automatically texted them back?

"Sorry I missed your call! How can I help?"

Now you're in a conversation instead of losing a customer.

Works with your existing number. $197/month.
Reply "DEMO" and I'll show you how it works.
```

**Facebook Ad Hook (Video Script):**

```
[SCENE: Phone ringing on dashboard of work truck]
[TEXT ON SCREEN: "Another missed call..."]
[SCENE: Voicemail notification]
[TEXT ON SCREEN: "Another lost job?"]
[SCENE: Text message pops up automatically]
[TEXT ON SCREEN: "Not anymore."]
[VOICEOVER: "Missed Call Text Back. Your phone texts them 
back in 60 seconds. Even when you can't answer."]
[CTA: "See it work. Link in bio."]
```

### 18.6 UTM Structure

All campaigns use consistent UTM tracking:

```
utm_source = [craigslist | facebook | linkedin | groups | email]
utm_medium = [cpc | organic | social | referral]
utm_campaign = [tier]-[niche]-[month][year]
utm_content = [ad variant]
```

**Examples:**
- `utm_source=craigslist&utm_campaign=t1-hvac-dec2025`
- `utm_source=facebook&utm_campaign=t2-medspa-dec2025&utm_content=missedcall-video`

---

## 19. LocalPros Network

### 19.1 Overview

EverIntent LLC operates a lead generation network called **LocalPros**. We own and operate 20 portfolio sites that look like real local service businesses. These sites capture leads (calls, forms, SMS) and forward them to licensed partner providers in guaranteed zip code territories.

### 19.2 What We Own vs What Partners Do

**EverIntent LLC owns:**
- Domain and hosting
- Phone number and A2P registration
- Email list and all leads
- GHL sub-account and automation
- Traffic and SEO rankings

**Partners:**
- Perform the work
- Carry proper licensing and insurance
- Pay per qualified lead

### 19.3 Revenue Model (Triple Threat)

1. **Lead Sales (Primary)** — Per-lead fee to partners
2. **Sellable Property** — Sites with traffic become turnkey assets
3. **SmartSites Conversions** — Use as proof/live examples to sell T1-T4

### 19.4 LocalPros Sites (20 Total)

**Priority 5 ("Fab Five"):**
1. Phoenix HVAC
2. Dallas Roofing
3. Houston Plumbing
4. Phoenix Landscaping
5. Atlanta Cleaning

**Additional 15:**
- Tampa Pressure Washing
- Austin Garage Door
- Denver Fencing
- Miami Pool Service
- Las Vegas Junk Removal
- (10 more TBD based on market opportunity)

### 19.5 LocalPros Site Build Spec

Same as T1 WordPress build, plus:
- Phone number (local area code)
- Call tracking to GHL master account
- Lead form with TCPA consent
- Partner routing workflow
- Clear disclosures (EverIntent LLC operates this site)

### 19.6 LocalPros Lead Routing

```
Lead Arrives (Call or Form)
    ↓
GHL Master Account Receives
    ↓
AI Voice Bot Qualifies (if call)
    ↓
Lead Distributed to Partner(s)
    - SMS notification
    - Email notification
    - Accept/Decline within 5 minutes
    ↓
Partner Accepts → Lead assigned exclusively
Partner Declines → Route to backup partner
```

### 19.7 LocalPros Compliance

**Required Disclosures on Each Site:**

```
OPERATED BY EVERINTENT LLC

This website is owned and operated by EverIntent LLC. 
Services are performed by independent licensed contractors 
in your area. EverIntent LLC does not perform services 
and makes no guarantees about service quality.
```

**TCPA Consent (Lead Forms):**

```
□ By submitting this form, I consent to receive calls and 
  text messages from [Brand Name] (operated by EverIntent LLC) 
  and up to 3 licensed service providers in my area regarding 
  my service request. I understand that my information will 
  be shared with these providers. Consent is not a condition 
  of service. Message frequency varies. Message & data rates 
  may apply. Reply STOP to opt-out, HELP for help. 
  View Privacy Policy and Terms of Service.
```

---

## 20. Compliance & Legal

### 20.1 TCPA Consent Language

**SmartSites Customer Form (T1-T4):**

```
□ By checking this box, I consent to receive calls, text 
  messages, and emails from EverIntent LLC regarding my 
  SmartSites account, including service updates, billing 
  notifications, and promotional offers. I understand that 
  consent is not a condition of purchase. Message frequency 
  varies. Message & data rates may apply. Reply STOP to 
  opt-out, HELP for help. View Privacy Policy and Terms 
  of Service.
```

**Key Elements (Required):**
- "Consent is not a condition of purchase"
- "Message frequency varies"
- "Message & data rates may apply"
- STOP/HELP language
- Links to Privacy Policy and Terms

### 20.2 Call Recording Disclosure

**Inbound Calls (AI Voice Bot):**

```
"Thank you for calling [Brand Name]. This call may be 
recorded for quality assurance and training purposes. 
By continuing, you consent to recording. How can I help 
you today?"
```

**Two-Party Consent States:**
- California
- Connecticut
- Delaware
- Florida
- Illinois
- Maryland
- Massachusetts
- Michigan
- Montana
- Nevada
- New Hampshire
- Oregon
- Pennsylvania
- Vermont
- Washington

For calls to/from these states, recording disclosure MUST be given.

### 20.3 California Bot Disclosure Law (§17940)

**Requirement:** If using AI to communicate with California consumers, must disclose that they are talking to a bot.

**AI Calling Script Opening:**

```
"Hi [Name], this is [AI Name], an AI assistant calling 
on behalf of EverIntent SmartSites. I'm an automated 
system calling to [purpose]. Is this a good time to 
chat for 2 minutes?"
```

### 20.4 Privacy Policy Requirements

**Must Include:**
- What data we collect
- How we use it
- Who we share it with
- Call recording disclosure
- Lead sharing disclosure (LocalPros)
- Cookie policy
- Data retention periods
- DSAR process

### 20.5 Data Subject Access Request (DSAR)

**URL:** /legal/data-request/

**Process:**
1. Customer submits request via form
2. Identity verification (email confirmation)
3. 30-day response window
4. Provide: All data, deletion, or opt-out

---

## 21. Technical Architecture

### 21.1 Platform Diagram

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
│ Next.js       │   │ GHL SaaS Mode │   │ WordPress     │
│ Vercel Pro    │   │ Stripe        │   │ OVH/Plesk     │
│ Supabase      │   │               │   │ Elementor     │
│ Tailwind      │   │               │   │ Cloudflare    │
└───────────────┘   └───────────────┘   └───────────────┘
```

### 21.2 Phone Number Strategy

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

### 21.3 Email Infrastructure

| Use Case | Platform |
|----------|----------|
| Transactional (WordPress) | AWS SES |
| Marketing (GHL) | GHL native |
| Support | Google Workspace |

---

## 22. Operational SOPs

### 22.1 Website Build SOP (T1-T4)

**Day 0: Intake Complete**
1. Review intake form submission
2. Download logo, note colors
3. Research business online
4. Create ClickUp task

**Day 1: Setup**
1. Create WordPress site in Plesk
2. Install plugins (standard stack)
3. Configure theme settings
4. Set up GA4 property

**Day 2-3: Build**
1. Build homepage
2. Build services page
3. Build about page
4. Build contact page
5. Build service area page
6. Add privacy/terms pages

**Day 4: Optimize**
1. Configure Rank Math SEO
2. Add schema markup
3. Compress images
4. Test speed (target < 3s)
5. Mobile testing

**Day 5: Deliver**
1. Final QA checklist
2. Connect domain (or staging URL)
3. Send delivery email
4. Update GHL status

### 22.2 GA4 Setup SOP

1. Log into analytics@everintent.com
2. Create new GA4 property
3. Name: "{Business Name} - SmartSites"
4. Create web data stream
5. Copy Measurement ID
6. Install on WordPress via Site Kit
7. Verify data flowing
8. Schedule monthly email report
9. Connect to GHL dashboard (if T1 with portal)

### 22.3 GHL Sub-Account Checklist

**Auto-provisioned on payment:**
- [x] Sub-account created
- [x] Snapshot applied
- [x] Welcome email sent

**Manual configuration:**
- [ ] Add website_domain custom field
- [ ] Add ga4_property_id custom field
- [ ] Connect GA4 to dashboard (OAuth)
- [ ] Add "View My Website" menu item
- [ ] Test dashboard displays correctly

---

## 23. Upgrade & Downgrade Flows

### 23.1 T1 → T2 Upgrade

**Trigger:** Customer clicks "Upgrade" in portal or /upgrade page

**Flow:**
1. Customer redirected to T2 checkout (GHL)
2. Customer pays $197 (first month)
3. GHL automatically:
   - Updates subscription to T2 plan
   - Applies ss-t2-snapshot
   - Enables T2 features
4. Send upgrade confirmation email
5. Provision phone number (local area code)
6. Enable MCTB workflow

### 23.2 T2 → T3 Upgrade

**Flow:**
1. Customer selects upgrade in portal
2. GHL calculates prorated amount
3. Customer pays $149 setup + prorated difference
4. GHL applies ss-t3-snapshot
5. Enable T3 features (calendar, pipeline, reviews)
6. Send upgrade confirmation

### 23.3 T3 → T4 Upgrade

**Flow:**
1. Same as T2 → T3
2. $249 setup + prorated difference
3. Apply ss-t4-snapshot
4. Enable AI voice, unified inbox, reputation dashboard

### 23.4 Downgrade Flow

1. Customer requests downgrade via support
2. Support confirms new tier
3. Schedule downgrade for end of billing period
4. At period end:
   - Apply lower tier snapshot
   - Disable higher-tier features
5. Send downgrade confirmation

### 23.5 Cancellation Flow

1. Customer requests cancellation
2. Retention offer presented:
   - Pause for 30 days
   - Downgrade to lower tier
   - Proceed with cancel
3. If cancel confirmed:
   - Schedule for end of period
   - Tag: cancel_pending=true
4. At period end:
   - Subscription ends
   - Disable sub-account access
   - Add to win-back pipeline
5. Data retained 90 days, then purged

### 23.6 Dunning Sequence

**Payment Fails (Day 0):**
- Stripe Smart Retries enabled
- Email: "Payment failed - please update card"
- SMS: "Your SmartSites payment failed. Update: [link]"

**Day 3:**
- Email: "Second attempt failed - action needed"

**Day 5:**
- Email: "Account at risk - update payment now"
- SMS: "Urgent: SmartSites payment issue"

**Day 7:**
- Email: "Final notice - service interruption in 3 days"

**Day 10:**
- Email: "Service paused - reactivate anytime"
- GHL: Tag payment_status=past_due
- Disable sub-account features

**Day 60:**
- No reactivation → purge sub-account
- Archive contact for win-back campaigns

---

## 24. Support Model

### 24.1 Support Channels by Tier

| Tier | Email | Chat | Phone | Strategy Call |
|------|:-----:|:----:|:-----:|:-------------:|
| T1 | ✓ | ✗ | ✗ | ✗ |
| T2 | ✓ | ✓ | ✗ | ✗ |
| T3 | ✓ | ✓ | ✗ | ✗ |
| T4 | ✓ | ✓ | ✓ | Quarterly |

### 24.2 Support SLAs

| Priority | First Response | Resolution |
|----------|---------------:|------------|
| Urgent (site down) | 1 hour | 4 hours |
| High (feature broken) | 4 hours | 24 hours |
| Normal | 24 hours | 3 business days |
| Low (enhancement) | 48 hours | Best effort |

### 24.3 Revision Policy

**Included:**
- 1 revision round after first draft (scope-limited)

**Additional revisions:**
- Billed as professional services
- Quoted before work begins
- Invoiced via GHL

---

## 25. Build Order & Timeline

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

**Purpose:**
- Populate portfolio page
- Test build process
- Get testimonials

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

**Iterate:**
- [ ] Fix issues as they arise
- [ ] Build remaining LocalPros sites (15 more)
- [ ] Launch additional markets

---

## 26. Open Questions

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

### Still Open

1. **Checkout subdomain:** `checkout.smartsites.everintent.com` vs `checkout.everintentsmartsites.com`
2. **Wallet initial funding:** Start at $0 with auto-recharge prompt vs pre-fund at signup
3. **Looker Studio:** Build template later if requested (not MVP)

---

## 27. Document History

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
| **v30** | **Dec 13** | **Full reconciliation: GHL checkout (final), T1 portal YES, T1 $249 full, T1 renewal $149/yr, GA4 email reports, complete sitemap restored** |

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
20. domains.md
21. localpros/index.md
22. localpros/apply.md
23. legal/privacy-policy.md
24. legal/terms-of-service.md
25. legal/data-request.md
26. upgrade.md
27. admin/login.md
28. admin/checkouts.md
29. admin/portfolio.md

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

*Document compiled from EverIntentSmartSites BRD versions 1-29 and December 13, 2025 session decisions. This is the single source of truth for SmartSites build.*

---

**END OF DOCUMENT**
