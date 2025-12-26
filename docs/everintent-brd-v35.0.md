# EverIntent — Complete Business Requirements Document v35.0

**Last Updated:** December 26, 2025  
**Version:** 35.0 (AI Employee MVP + Platform Object Model)
**Status:** BUILD-READY
**Owner:** EverIntent LLC  
**Tagline:** Web Design AI & Automation
**GitHub Path:** /docs/everintent-brd-v35.0.md

---

## Document Purpose

This is the **single source of truth** for EverIntent.com. It governs:

1. What customers buy (AI Employee modes, Smart Websites tiers, pricing, features)
2. What customers experience (UX flows from ad to purchase to delivery to billing)
3. What the team does (low-LOE provisioning, delivery SOPs)
4. What Lovable builds (marketing site pages, admin portal)
5. What gets configured in GHL + Stripe (SaaS plans, AI agents, billing)
6. What gets built on WordPress (customer sites)
7. Go-To-Market execution (channels, niches, ad copy, UTMs)

**Non-goals:** This document does not debate architecture. It specifies requirements and the simplest implementation that meets them.

---

## Anchor Statement (v35.0)

> **The EverIntent AI Employee is a single execution engine — one Voice AI Agent per DID, one global Conversation AI, and per-DID Control Workflows — that produces three canonical proof artifacts (call, SMS, and chat transcripts) across five inbound channels, with behavior determined by rule-based modes rather than separate infrastructure builds.**

This statement governs all AI Employee architectural decisions. There is **one engine, many behaviors** — not multiple systems.

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

## ⚠️ BRAND PIVOT NOTICE (v34.0+)

**Master Brand:** EverIntent  
**Tagline:** "Web Design AI & Automation"

**Key Changes:**
- "SmartSites by EverIntent" → "EverIntent"
- "Beautiful Websites" service → "Smart Websites" service
- Use "smart website(s)" / "smart site" as **descriptive language** (lowercase in prose), not a capital-S brand
- All logos, headers, footers use **EverIntent** only

**Safe Usage Examples:**
- ✅ "EverIntent Smart Website Packages"
- ✅ "Our smart website tiers"
- ✅ "Get a smart site that..."
- ❌ "EverIntent SmartSites™"
- ❌ "SmartSites by EverIntent" (logo/brand)
- ❌ Bidding on "SmartSites" as a Google Ads keyword

---

## Table of Contents

1. [Quick Reference](#1-quick-reference)
2. [Executive Summary](#2-executive-summary)
3. [Operating Entity](#3-operating-entity)
4. [Business Model](#4-business-model)
5. [AI Employee Product Definition](#5-ai-employee-product-definition)
6. [Platform Object Model (GHL)](#6-platform-object-model-ghl)
7. [MVP Canonical Scope](#7-mvp-canonical-scope)
8. [Smart Websites](#8-smart-websites)
9. [Complete Feature Matrix](#9-complete-feature-matrix)
10. [Competitive Analysis](#10-competitive-analysis)
11. [Customer Journey](#11-customer-journey)
12. [Checkout & Billing Architecture](#12-checkout--billing-architecture)
13. [GHL Configuration](#13-ghl-configuration)
14. [Customer Portal Architecture](#14-customer-portal-architecture)
15. [GA4 & Analytics](#15-ga4--analytics)
16. [WordPress Customer Sites](#16-wordpress-customer-sites)
17. [Marketing Site Specification](#17-marketing-site-specification)
18. [Sitemap](#18-sitemap)
19. [Navigation Structure (MVP)](#19-navigation-structure-mvp)
20. [Domain Integration Architecture](#20-domain-integration-architecture)
21. [Go-To-Market Strategy](#21-go-to-market-strategy)
22. [LocalPros Network](#22-localpros-network)
23. [Compliance & Legal](#23-compliance--legal)
24. [Partner Program](#24-partner-program)
25. [Technical Architecture](#25-technical-architecture)
26. [Operational SOPs](#26-operational-sops)
27. [Upgrade & Downgrade Flows](#27-upgrade--downgrade-flows)
28. [Support Model](#28-support-model)
29. [Build Order & Timeline](#29-build-order--timeline)
30. [Task 3.5 Definition](#30-task-35-definition)
31. [Open Questions](#31-open-questions)
32. [Document History](#32-document-history)

**Appendices:**
- [Appendix A: Industry Verticals](#appendix-a-industry-verticals)
- [Appendix B: LocalPros Site Portfolio](#appendix-b-localpros-site-portfolio)
- [Appendix C: Theming System](#appendix-c-theming-system)
- [Appendix D: Logo System](#appendix-d-logo-system)
- [Appendix E: Admin Portal](#appendix-e-admin-portal)
- [Appendix F: Component Patterns](#appendix-f-component-patterns)
- [Appendix G: Phased Implementation](#appendix-g-phased-implementation)
- [Appendix H: vite-react-ssg Configuration](#appendix-h-vite-react-ssg-configuration)
- [Appendix I: Glossary](#appendix-i-glossary)

---

## 1. Quick Reference

| Component | Specification |
|-----------|---------------|
| Marketing Site | Vite + React (pre-rendered) on Vercel Pro + Supabase |
| Customer Portal | GoHighLevel SaaS Mode (white-labeled) |
| Checkout | GHL SaaS Checkout (Stripe-connected) |
| Customer Sites | WordPress on OVH/Plesk + Elementor |
| Domain Registrar | Manual purchase via GHL or Namecheap dashboard |
| Email (transactional) | AWS SES |
| Email (marketing) | GHL native |
| Phone (outbound) | 5 SoCal area codes (562, 714, 949, 310, 626) |
| Phone (inbound) | Local numbers per market |

---

## 2. Executive Summary

**EverIntent** delivers AI Employee services and smart websites to local service businesses at transparent, affordable prices.

**Brand Positioning:** "While you were sleeping, your AI Employee recovered a $2,400 job."

**Target Market:** Local service businesses across 4 industry categories and 65+ verticals

**Value Proposition:** Managed AI receptionist services that prove value through real interaction transcripts.

### 2.1 Product Lines

| Product | Description | Entry Point |
|---------|-------------|-------------|
| **AI Employee** | Managed AI receptionist modes (Voice + SMS + Chat) | $149-$297/mo + $1,497 setup |
| **Smart Websites** | 5-page professional website | $249 one-time |
| **Web Chat Only** | Standalone chat widget | $79/mo + $497 setup |

### 2.2 Product Methodology — Transcript-Validated Conversion (TVC)

The AI Employee proves its value through **real interaction transcripts**, not feature lists or demos.

| Traditional Approach | TVC Approach |
|---------------------|--------------|
| "Our AI can answer calls" | "Here's the transcript where AI recovered a $2,400 job at 11pm" |
| Feature specifications | Proof of value delivered |
| Trust required upfront | Evidence provided first |

### 2.3 Canonical Transcripts

Three transcript types anchor all marketing, demos, and proof:

| ID | Transcript Type | Trigger | AI Behavior | Proof Value |
|----|-----------------|---------|-------------|-------------|
| T1 | **Missed Call Recovery** | Call missed OR AI hangup <15s | SMS sent → Conversation AI engages | "We recovered this lead you would have lost" |
| T2 | **After-Hours Answering** | Call outside business hours | Voice AI answers, qualifies, books | "We handled this while you slept" |
| T3 | **Front-Line Screening** | Call during business hours | Voice AI answers → optional transfer | "We screened this so you didn't waste time" |

**Web Chat** feeds into the same outcomes, producing chat transcripts as a fourth proof artifact but not a separate canonical transcript type.

---

## 3. Operating Entity

**Legal Name:** EverIntent LLC  
**DBA:** EverIntent  
**Formation:** California LLC  
**EIN:** [On file]
**Tagline:** Web Design AI & Automation

---

## 4. Business Model

### 4.1 Core Revenue Principles

1. **Revenue at Every Step** - Nothing is free unless it strategically leads to bigger revenue.
2. **Asset Ownership** - We own domains, phone numbers, rankings, traffic.
3. **One Tech Stack, Multiple Revenue Paths** - Same WordPress build. Same GHL automations. Different monetization.
4. **Relationship → Trust → MRR** - Every interaction builds toward recurring revenue.

### 4.2 Revenue Streams

| Stream | Description |
|--------|-------------|
| AI Employee setup fees | $1,497 one-time (per customer) |
| AI Employee subscriptions | $149-$297/month (per mode) |
| Web Chat Only | $497 setup + $79/month |
| Smart Website builds | $249 one-time |
| Smart Website renewals | $149/year hosting/maintenance |
| Usage overages | SMS, AI minutes, emails above included |
| LocalPros leads | Lead sales $25-150 per lead by vertical |

---

## 5. AI Employee Product Definition

### 5.1 Single Execution Engine

The AI Employee is **NOT** multiple bots, templates, or systems. It is a single execution engine:

| Component | Count | Notes |
|-----------|-------|-------|
| Voice AI Agent | 1 per DID | Cloned from master template |
| Conversation AI Agent | 1 global | Handles all SMS + Web Chat |
| Control Workflow | 1 per DID | Routes based on mode rules |

### 5.2 Modes Are Rule Profiles (Not Builds)

Each mode is a **configuration of the same engine**, not separate infrastructure:

| Mode ID | Mode Name | Active Rules | Monthly Price |
|---------|-----------|--------------|---------------|
| M1 | After Hours | Voice AI answers outside hours | $149 |
| M2 | After Hours + Booking | M1 + booking link allowed | $197 |
| M3 | Missed Call Recovery | SMS sent on missed/hangup | $149 |
| M4 | Front Line Screening | Voice AI answers during hours, optional transfer | $297 |
| M5 | Full AI Employee | M1 + M2 + M3 + M4 | Bundled pricing |

**All modes share:**
- $1,497 flat setup fee (MVP)
- Same underlying Voice AI + Conversation AI infrastructure
- Same transcript generation capability

### 5.3 Web Chat (Standalone)

| Item | Value |
|------|-------|
| Setup Fee | $497 |
| Monthly | $79 |
| Use Case | Website-only engagement, no phone |

### 5.4 Multi-Mode Discount

**15% monthly discount** when purchasing 2+ modes together.

### 5.5 Buyer Personas

#### Assisted Buyer (Demo-Led)
- Wants to see it work before committing
- Needs human reassurance
- Path: View transcripts → Book demo → Sales call → Purchase

#### Self-Service Buyer (No-Talk)
- Ready to buy, doesn't want sales friction
- Path: View transcripts → Select mode → Checkout → Automated onboarding

**MVP must support both paths.** Self-service capability is non-negotiable.

---

## 6. Platform Object Model (GHL)

### 6.1 AI Objects

| Object | Count | Notes |
|--------|-------|-------|
| Voice AI Agent | 1 per DID | Cloned from master template |
| Conversation AI Agent | 1 global | Handles all SMS + chat |

### 6.2 Automation Objects

| Object | Count | Notes |
|--------|-------|-------|
| Control Workflow | 1 per DID | SMS sender = DID |
| Web Chat Router | 1 global | Assigns ownership |
| Lead Forwarding | 1 global | Sends leads off-platform |
| Dedupe Workflow | 1 global | Noise control |

### 6.3 Data Objects

| Object | Required |
|--------|----------|
| Custom Fields | ~5 (mode, setup status, DID, etc.) |
| Tags | ~15 (see Tag Schema below) |

### 6.4 GHL Tag Schema

All tags use `EI:` prefix (EverIntent):

```
EI: AI - Missed Call Recovery
EI: AI - After Hours
EI: AI - After Hours + Booking
EI: AI - Front Line Screening
EI: AI - Full Employee
EI: Web Chat Only
EI: Smart Website - Starter
EI: Smart Website - Professional
EI: Smart Website - Premium
EI: Setup Complete
EI: Setup Pending
EI: Partner Application
EI: Contact Form
EI: Data Rights Request
```

---

## 7. MVP Canonical Scope

### 7.1 MVP Inputs (Channels)

| ID | Channel | Required | Notes |
|----|---------|----------|-------|
| C1 | Phone – Human DID | ✅ | Client's existing number |
| C2 | Phone – AI DID | ✅ | Dedicated AI line |
| C3 | SMS | ✅ | Two-way via DID |
| C4 | Web Chat Widget | ✅ | Embedded on client site |
| C5 | Email (notifications) | ✅ | Owner alerts only |

### 7.2 MVP Outputs (Outcomes)

| ID | Outcome | Required | Proof |
|----|---------|----------|-------|
| O1 | Missed call → SMS recovery | ✅ | SMS transcript |
| O2 | After-hours call answered | ✅ | Call transcript |
| O3 | Booking link delivered | ✅ | Booking confirmation |
| O4 | Human transfer with context | ✅ | Transfer log |
| O5 | Owner notified | ✅ | Notification log |

### 7.3 MVP Proof Artifacts

| Artifact | Source | Required |
|----------|--------|----------|
| Call transcript | Voice AI | ✅ |
| SMS transcript | Conversation AI | ✅ |
| Chat transcript | Web Chat | ✅ |

**MVP is complete when all channels produce all applicable outcomes with captured transcripts.**

---

## 8. Smart Websites

Smart Websites are **loss-leader entry points** that introduce clients to EverIntent's ecosystem.

### 8.1 MVP Tier

| Tier | One-Time Price | Includes |
|------|----------------|----------|
| Starter | $249 | 5-page site, mobile-optimized, basic SEO, 1 year hosting |

**Renewal:** $149/year (hosting + maintenance)

### 8.2 Deferred Tiers (Post-MVP)

| Tier | Price | Additional Features |
|------|-------|---------------------|
| Professional | $749 | 10 pages, CRO, advanced SEO |
| Premium | $1,497 | 20 pages, custom features, priority support |

### 8.3 Relationship to AI Employee

- Smart Websites are **standalone products**
- AI Employee modes are **add-ons** to any website
- Future: Bundled packages combining website + AI modes

---

## 9. Complete Feature Matrix

### 9.1 AI Employee Features by Mode

| Feature | M1: After Hours | M2: After Hours + Booking | M3: Missed Call | M4: Front Line |
|---------|:---------------:|:------------------------:|:---------------:|:--------------:|
| Voice AI answers | After hours only | After hours only | — | During hours |
| SMS follow-up | — | — | ✅ | Optional |
| Booking links | — | ✅ | ✅ | ✅ |
| Human transfer | — | — | — | ✅ |
| Call transcripts | ✅ | ✅ | — | ✅ |
| SMS transcripts | — | — | ✅ | — |
| Owner notifications | ✅ | ✅ | ✅ | ✅ |

### 9.2 Smart Website Features

| Feature | Starter ($249) |
|---------|:--------------:|
| Professional Website | ✓ |
| Mobile Responsive | ✓ |
| SSL Certificate | ✓ |
| Basic SEO | ✓ |
| Contact Form | ✓ |
| Google Maps | ✓ |
| 1 Year Hosting | ✓ |

---

## 10. Competitive Analysis

| Competitor | Price | AI Included | Setup Time | Ownership |
|------------|-------|-------------|------------|-----------|
| Wix | $16-159/mo | No | DIY | No |
| Squarespace | $16-49/mo | No | DIY | No |
| Local agency | $2,000-10,000 | Extra cost | 4-8 weeks | Varies |
| Call answering service | $200-500/mo | No | 1-2 weeks | No |
| **EverIntent AI Employee** | **$149-297/mo** | **Yes** | **48 hours** | **Yes** |

---

## 11. Customer Journey

### 11.1 Entry Points

```
┌─────────────────────────────────────────────────────────────┐
│ everintent.com                                              │
│                                                             │
│ Ready to start?     Not sure yet?        Need help?         │
│  [Get Started]    [Watch Demo]         [Book a Call]        │
└─────────────────────────────────────────────────────────────┘
```

**Path A: Self-Service** → View transcripts → Select mode → Checkout → Automated onboarding
**Path B: Demo-Led** → View transcripts → Book demo → Sales call → Purchase
**Path C: Need Help** → GHL calendar booking → 30-min free consultation

### 11.2 Checkout Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  MARKETING SITE          GHL CHECKOUT           GHL PORTAL      │
│  everintent.com    →    go.everintent.com  →  app.everintent.com│
│                                                                  │
│  Browse/Learn            Pay (Stripe)          Onboarding       │
│  Select Product          Complete Form         Intake Forms     │
│  Click CTA               Confirm               Dashboard        │
└─────────────────────────────────────────────────────────────────┘
```

### 11.3 Post-Payment Automation (GHL)

1. **Tag Applied:** `EI: [Product Purchased]`
2. **Confirmation Email:** Sent automatically
3. **Intake Form:** Triggered based on product tag
4. **Internal Task:** Created for provisioning team
5. **Portal Access:** Granted to `app.everintent.com`

---

## 12. Checkout & Billing Architecture

### 12.1 Platform Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    MARKETING SITE (Vite + React / Vercel Pro)           │
│                    everintent.com                                       │
│                                                                         │
│   - Pre-rendered pages, pricing display                                 │
│   - CTAs redirect to GHL checkout                                       │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼ (CTA redirects)
┌─────────────────────────────────────────────────────────────────────────┐
│                      GHL SaaS MODE CHECKOUT                             │
│                      go.everintent.com                                  │
│                                                                         │
│   - Stripe connected in GHL                                             │
│   - Handles subscription billing                                        │
│   - URL params carry: product, contact info                             │
└─────────────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼ (webhook)
┌─────────────────────────────────────────────────────────────────────────┐
│                         GHL AUTOMATION                                  │
│                                                                         │
│   - Contact tagging                                                     │
│   - Intake form trigger                                                 │
│   - Welcome sequence trigger                                            │
│   - Provisioning workflow                                               │
└─────────────────────────────────────────────────────────────────────────┘
```

### 12.2 Stripe Products

| Product | Price | Billing |
|---------|-------|---------|
| AI Employee - Missed Call Recovery | $1,497 + $149/mo | One-time + Monthly |
| AI Employee - After Hours | $1,497 + $149/mo | One-time + Monthly |
| AI Employee - After Hours + Booking | $1,497 + $197/mo | One-time + Monthly |
| AI Employee - Front Line Screening | $1,497 + $297/mo | One-time + Monthly |
| Web Chat Only | $497 + $79/mo | One-time + Monthly |
| Smart Website - Starter | $249 | One-time |
| Smart Website - Annual Renewal | $149 | Yearly |

---

## 13. GHL Configuration

### 13.1 Custom Fields

| Field | Type | Purpose |
|-------|------|---------|
| ai_mode | Dropdown | M1/M2/M3/M4/M5 |
| setup_status | Dropdown | pending/complete |
| primary_did | Text | Main AI phone number |
| business_hours | Text | JSON hours config |
| intake_status | Dropdown | pending/complete |

### 13.2 Required Tags

See Section 6.4 for complete tag schema.

### 13.3 Automation Workflows

| Workflow | Trigger | Actions |
|----------|---------|---------|
| New Customer Onboarding | Tag: `EI: AI - *` | Welcome email, intake form, provisioning task |
| Missed Call Recovery | Call missed | SMS via Conversation AI |
| After Hours Routing | Call outside hours | Voice AI answers |
| Front Line Screening | Call during hours | Voice AI answers, optional transfer |
| Lead Forwarding | New qualified lead | Notification to owner |
| Dedupe | New contact | Merge duplicates |

---

## 14. Customer Portal Architecture

### 14.1 Portal Access

**URL:** `app.everintent.com`

All AI Employee customers get:
- Dashboard with transcript history
- Lead/contact list
- Conversation inbox (SMS/chat)
- Settings (hours, preferences)
- Billing management

---

## 15. GA4 & Analytics

### 15.1 GA4 Setup Per Customer

1. Create GA4 property: "{Business Name} - EverIntent"
2. Add data stream (web)
3. Configure enhanced measurement
4. Share dashboard access

### 15.2 Conversion Events

| Event | Trigger |
|-------|---------|
| `lead_captured` | Form submission, call connected |
| `booking_made` | Calendar booking confirmed |
| `chat_started` | Web chat conversation initiated |

---

## 16. WordPress Customer Sites

### 16.1 Build Standards

- WordPress on OVH/Plesk
- Elementor page builder
- Mobile-responsive design
- Core Web Vitals optimized
- SSL via Let's Encrypt

### 16.2 Delivery Timeline

| Day | Activities |
|-----|------------|
| 0 | Intake complete, task created |
| 1 | WordPress setup, theme installed |
| 2-3 | Page builds, content added |
| 4 | Internal QA, customer review |
| 5 | Revisions, launch |

---

## 17. Marketing Site Specification

### 17.1 Hero Message (Homepage)

> "While you were sleeping, your AI Employee recovered a $2,400 job."

Immediately followed by the **Missed Call Recovery transcript** as proof.

### 17.2 Conversion Paths

| Visitor Intent | Path |
|----------------|------|
| "Show me proof" | View transcript → Browse modes |
| "Let me try" | Demo request → Sales follow-up |
| "I want to buy" | Pricing → Checkout |
| "I have questions" | Chat widget → Conversation AI |

### 17.3 Trust Signals

- Transcript embeds (real examples)
- Industry-specific social proof
- "Setup in 48 hours" promise
- Money-back guarantee (if offered)

---

## 18. Sitemap

### 18.1 MVP Pages (Required)

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Homepage | Hero with Missed Call Recovery transcript, trust bar, CTA |
| `/let-ai-handle-it` | AI Employee | Full AI Employee product page with all modes |
| `/smart-websites` | Smart Websites | Website service offering |
| `/pricing` | Pricing | Decision-oriented pricing with checkout CTAs |
| `/about` | About | Company story, trust signals |
| `/contact` | Contact | Form + chat widget |
| `/privacy` | Privacy Policy | Legal |
| `/terms` | Terms of Service | Legal |
| `/cookies` | Cookie Policy | Legal |
| `/data-rights-request` | Data Rights Request | CCPA compliance |

**Total MVP Routes: 10**

### 18.2 Deferred Pages (Post-MVP)

| Category | Routes |
|----------|--------|
| Industries | `/industries/*` |
| Features | `/features/*` |
| Resources | `/blog`, `/case-studies`, `/faqs` |
| Careers | `/careers`, `/careers/*` |
| Portfolio | `/our-work`, `/our-work/*` |
| Services SEO | `/services/*` |

All deferred routes remain defined but hidden from navigation, rendering `PlaceholderPage` or redirecting to `/`.

---

## 19. Navigation Structure (MVP)

### 19.1 Header Navigation

| Position | Label | Route | Type |
|----------|-------|-------|------|
| 1 | AI Employee | `/let-ai-handle-it` | Link |
| 2 | Smart Websites | `/smart-websites` | Link |
| 3 | Pricing | `/pricing` | Link |
| 4 | About | `/about` | Link |
| 5 | Contact | `/contact` | Link |
| CTA | Get Started | `/pricing` | Button |

**Removed from MVP:**
- All dropdown menus
- Industries section
- Solutions section
- Our Work
- Careers
- Resources

### 19.2 Footer Navigation

**Column 1: Products**
| Label | Route |
|-------|-------|
| AI Employee | `/let-ai-handle-it` |
| Smart Websites | `/smart-websites` |
| Pricing | `/pricing` |

**Column 2: Company**
| Label | Route |
|-------|-------|
| About | `/about` |
| Contact | `/contact` |

**Column 3: Legal**
| Label | Route |
|-------|-------|
| Privacy Policy | `/privacy` |
| Terms of Service | `/terms` |
| Cookie Policy | `/cookies` |

**External Links (Footer)**
| Label | URL |
|-------|-----|
| Client Login | `https://app.everintent.com` |

### 19.3 Mobile Navigation

- Hamburger menu with same 5 links + CTA
- No nested menus
- Full-screen overlay

### 19.4 Code Changes Required

**Header.tsx:**
- Remove all `NavigationMenu` dropdown components
- Replace with 5 static `NavLink` components
- Keep mobile hamburger with simplified menu

**Footer.tsx:**
- Reduce from 4 columns to 3
- Remove deferred sections
- Add external "Client Login" link

**routes.tsx:**
- Update `prerenderRoutes` to MVP-only list
- Add redirect logic for deferred routes

**routes.ts (config):**
- Export `mvpRoutes` array for navigation filtering

---

## 20. Domain Integration Architecture

| Domain | Purpose | Platform |
|--------|---------|----------|
| `everintent.com` | Marketing website | Vercel (React) |
| `go.everintent.com` | Checkout funnels | GHL |
| `app.everintent.com` | Customer portal | GHL |

---

## 21. Go-To-Market Strategy

### 21.1 Primary Channel: Transcript-Led Content

1. **Homepage hero:** Missed Call Recovery transcript
2. **Social proof:** Real transcripts from beta customers
3. **Video walkthroughs:** Loom demos showing AI in action
4. **Retargeting:** Transcript snippets in ads

### 21.2 Advertising Channels

| Channel | Audience | Content |
|---------|----------|---------|
| Facebook/Instagram | Local business owners | Video ads with transcript proof |
| Google Ads | "AI receptionist", "missed call" keywords | Search + Display |
| LinkedIn | Agency owners, consultants | B2B partnership messaging |
| Craigslist | Local services by market | Direct response |

### 21.3 Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Setup fee collection rate | >80% of starts complete payment | Stripe data |
| Time to first transcript | <48 hours from setup complete | GHL timestamp |
| Self-service purchase rate | >30% of sales | No sales call tag |
| Transcript demo engagement | >60% scroll depth on homepage | Analytics |
| Mode upgrade rate | >20% within 90 days | GHL pipeline |

---

## 22. LocalPros Network

LocalPros sites are ranking assets that generate leads for partner distribution or SmartSites conversion.

### 22.1 Revenue Paths

| Path | Model | Revenue |
|------|-------|---------|
| Sell Leads | Site ranks → leads sold | $25-150 per lead |
| Rent Site | We keep ownership, they get leads | $297-$497/month |
| Sell Site | Transfer domain + hosting | $2K-$10K one-time |
| Ice Breaker | Free leads → trust → conversion | MRR via SmartSites |

---

## 23. Compliance & Legal

### 23.1 TCPA Consent Language

```
By providing your phone number and checking this box, you consent to 
receive calls, text messages, and emails from EverIntent and its 
partners regarding your inquiry. Message and data rates may apply. 
You may opt out at any time by replying STOP.
```

### 23.2 California Bot Disclosure (AI Calling)

```
"Hi [Name], this is [AI Name], an AI assistant from EverIntent. 
I'm an automated system calling to [purpose]. 
Is this a good time to chat for 2 minutes?"
```

### 23.3 CCPA/Data Rights

- Data rights request form at `/data-rights-request`
- 45-day response SLA
- GHL tag: `EI: Data Rights Request`

---

## 24. Partner Program

### 24.1 Commission Structure

| Campaign | Products/Services | Commission | Attribution |
|----------|-------------------|------------|-------------|
| EI: AI & Websites | AI Employee modes, websites | 10% of first payment | 90-day cookie |
| EI: Strategy Session | $297 Strategy Session | $50 flat | 30-day cookie |

---

## 25. Technical Architecture

### 25.1 Platform Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    CUSTOMER JOURNEY                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  [Ad Click] → [Marketing Site] → [GHL Checkout] → [Portal]  │
│                                                             │
│               everintent.com    go.everintent    app.ever   │
│                                 .com             intent.com │
│                                                             │
└─────────────────────────────────────────────────────────────┘
        │                    │                    │
        ▼                    ▼                    ▼
┌───────────────┐   ┌───────────────┐   ┌───────────────┐
│ MARKETING     │   │ CHECKOUT &    │   │ FULFILLMENT   │
│ SITE          │   │ BILLING       │   │               │
├───────────────┤   ├───────────────┤   ├───────────────┤
│ Vite + React  │   │ GHL SaaS Mode │   │ WordPress     │
│ Pre-rendered  │   │ Stripe        │   │ GHL Workflows │
│ Vercel Pro    │   │               │   │               │
│ Supabase      │   │               │   │               │
└───────────────┘   └───────────────┘   └───────────────┘
```

---

## 26. Operational SOPs

### 26.1 AI Employee Setup SOP

| Day | Activities |
|-----|------------|
| 0 | Payment received, intake form sent |
| 1 | Intake reviewed, DID provisioned, Voice AI cloned |
| 2 | Control Workflow configured, Conversation AI linked |
| 3 | Testing, UAT with customer |
| 4 | Go-live, first transcript captured |

### 26.2 Smart Website Build SOP

| Day | Activities |
|-----|------------|
| 0 | Intake complete |
| 1 | WordPress setup |
| 2-3 | Page builds |
| 4 | Internal QA, customer review |
| 5 | Revisions, launch |

---

## 27. Upgrade & Downgrade Flows

### 27.1 Mode Addition

1. Customer purchases additional mode via checkout
2. Tag added: `EI: AI - [New Mode]`
3. Control Workflow updated with new rules
4. 15% multi-mode discount applied to next invoice

### 27.2 Cancellation

1. Customer requests cancellation
2. Retention offer presented
3. If confirmed: Schedule for end of period
4. At period end: Disable workflows, retain data 90 days

---

## 28. Support Model

### 28.1 Support Channels

| Product | Email | Chat | Phone |
|---------|:-----:|:----:|:-----:|
| AI Employee | ✓ | ✓ | ✓ |
| Smart Website | ✓ | ✓ | ✗ |

### 28.2 Support SLAs

| Priority | First Response | Resolution |
|----------|---------------:|------------|
| Urgent (AI down) | 1 hour | 4 hours |
| High (feature broken) | 4 hours | 24 hours |
| Normal | 24 hours | 3 business days |

---

## 29. Build Order & Timeline

### 29.1 Phase 1: Platform Foundation (BLOCKING)

- [ ] Create required custom fields in GHL
- [ ] Create required tags per schema
- [ ] Enable recording + transcription
- [ ] Create Conversation AI agent

### 29.2 Phase 2: AI Employee Engine

- [ ] Create Voice AI agent template
- [ ] Create per-DID Control Workflow template
- [ ] Validate Transcript Generated trigger
- [ ] Validate SMS sender per workflow

### 29.3 Phase 3: Channel Paths

- [ ] Configure Missed Call Recovery path
- [ ] Configure After Hours path
- [ ] Configure Front Line Screening path
- [ ] Configure Web Chat routing

### 29.4 Phase 4: Delivery & Ops

- [ ] Create lead forwarding workflow
- [ ] Create dedupe workflow
- [ ] Define UAT scenarios
- [ ] Capture demo transcripts

### 29.5 Phase 5: Website & GTM (NON-BLOCKING)

- [ ] Homepage locked to Missed Call Recovery hero
- [ ] Add transcript demo embeds
- [ ] Pricing page with checkout links
- [ ] Navigation simplified to MVP structure

---

## 30. Task 3.5 Definition

### Task 3.5 — AI Employee MVP Monetization & Checkout Readiness

**Status:** TODO  
**Priority:** BLOCKER  
**Depends On:** Task 3.0 (Theme System)

### Definition of Done

#### Phase 1: Platform Foundation
- [ ] Custom fields created in GHL
- [ ] Tags created per schema (Section 6.4)
- [ ] Recording + transcription enabled
- [ ] Conversation AI agent created

#### Phase 2: AI Employee Engine
- [ ] Voice AI agent template created
- [ ] Per-DID Control Workflow template created
- [ ] Transcript Generated trigger validated
- [ ] SMS sender per workflow validated

#### Phase 3: Channel Paths
- [ ] Missed Call Recovery path configured
- [ ] After Hours path configured
- [ ] Front Line Screening path configured
- [ ] Web Chat routing configured

#### Phase 4: Delivery & Ops
- [ ] Lead forwarding workflow created
- [ ] Dedupe workflow created
- [ ] UAT scenarios defined
- [ ] Demo transcripts captured

#### Phase 5: Website & GTM
- [ ] Homepage locked to Missed Call Recovery hero
- [ ] Transcript demo embeds added
- [ ] Pricing page with checkout links
- [ ] Navigation simplified to MVP structure (Section 19)

### Acceptance Criteria

1. All three canonical transcripts can be generated on demand
2. Self-service checkout flow completes end-to-end
3. GHL automation applies correct tags and triggers onboarding
4. Homepage displays real transcript proof
5. Pricing page enables purchase without sales call

### External Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| GHL checkout funnels | EverIntent | TODO |
| Stripe integration | EverIntent | TODO |
| go.everintent.com subdomain | EverIntent | TODO |
| app.everintent.com subdomain | EverIntent | TODO |

---

## 31. Open Questions

### 31.1 Resolved in v35.0

| Question | Decision |
|----------|----------|
| AI Employee architecture | Single execution engine (1 Voice AI/DID, 1 global Conversation AI) |
| Mode implementation | Rule profiles, not separate builds |
| Tag prefix | `EI:` (EverIntent) |
| Setup fee structure | Flat $1,497 for all AI modes (MVP) |
| MVP navigation | 5 static links, no dropdowns |

### 31.2 Open for Future

| Question | Status |
|----------|--------|
| Variable setup fees by complexity | Deferred post-MVP |
| Foundation services (SEO, Reputation, GBP) | Deferred post-MVP |
| Multi-location pricing | Deferred post-MVP |

---

## 32. Document History

| Version | Date | Changes |
|---------|------|---------|
| 35.0 | 2025-12-26 | AI Employee single engine architecture, platform object model, canonical scope tables, MVP navigation, Task 3.5 definition |
| 34.0 | 2025-12-21 | Brand pivot to EverIntent master brand |
| 33.0 | 2025-12 | Theme system, component patterns, SSG configuration |
| 32.x | 2025-12 | Industry verticals, LocalPros, checkout flows |

---

## Appendix A: Industry Verticals

EverIntent serves local businesses across four main categories (65+ verticals):

### Home Services (31 verticals)

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

## Appendix B: LocalPros Site Portfolio

See separate document: `docs/localpros-portfolio.md`

---

## Appendix C: Theming System

### C.1 Design System Tokens

All colors defined in HSL format in `src/index.css` and `tailwind.config.ts`.

**Core Tokens:**
- `--background` / `--foreground` — Base surface and text
- `--primary` / `--primary-foreground` — Brand primary (dark navy)
- `--accent` / `--accent-foreground` — Accent (gold/amber)
- `--muted` / `--muted-foreground` — Subdued surfaces and text
- `--card` / `--card-foreground` — Card surfaces
- `--border` — Border color

### C.2 Admin Theme Editor

Database-driven theming via `site_themes` table. Admin can:
- Adjust base hue
- Configure accent colors
- Set dark mode overrides
- Configure GHL chat widget colors

### C.3 Theme Application

`applyThemeToRoot()` in `src/config/themes.ts` applies CSS variables to `:root`.

---

## Appendix D: Logo System

### D.1 Logo Components

- `LogoRenderer` — SVG-based logo with configurable parts
- Database-driven via `logo_versions` table
- Supports: "Ever" text, "Intent" text, streak element, tagline

### D.2 Logo Variants

- Full logo (horizontal)
- Compact logo (stacked)
- Icon only

---

## Appendix E: Admin Portal

### E.1 Admin Routes

| Route | Page | Purpose |
|-------|------|---------|
| `/admin/login` | Login | Email OTP authentication |
| `/admin` | Dashboard | Overview metrics |
| `/admin/submissions` | Submissions | Form/checkout submissions |
| `/admin/themes` | Themes | Theme editor |

### E.2 Authentication

- Email OTP via Supabase Edge Function
- `allowed_admin_emails` table for whitelist
- `user_roles` table for authorization
- `has_role()` security definer function

---

## Appendix F: Component Patterns

### F.1 CTA Button

```tsx
<CTAButton 
  to="/pricing" 
  defaultText="Get Started" 
  hoverText="Let's Go!" 
/>
```

Uses `variant="glow"` with animated sparkle icon and pulse dot.

### F.2 NavLink

Active route detection with animated underline on hover.

### F.3 Cookie Consent

California-compliant banner at z-index max. Gates chat widget visibility.

### F.4 GHL Chat Widget

Route-based widget selection. Shadow DOM styling for theme integration.

---

## Appendix G: Phased Implementation

| Phase | Scope | Status |
|-------|-------|--------|
| Phase 1 | Design System + Footer + Mobile Navbar | Complete |
| Phase 2 | Cookie Consent | Complete |
| Phase 3 | GHL v2 Integration | Complete |
| Phase 4 | Theme System | Complete |
| Phase 5 | AI Employee MVP | TODO |

---

## Appendix H: vite-react-ssg Configuration

### H.1 Critical Rules

1. Build command: `vite-react-ssg build`
2. No `manualChunks` in vite.config.ts
3. Admin-only rewrite in vercel.json (no catch-all)
4. `ClientOnly` wrapper for Radix portal components
5. QueryClient inside component with `useState`

### H.2 Route Configuration

```typescript
export const prerenderRoutes: string[] = [
  '/',
  '/let-ai-handle-it',
  '/smart-websites',
  '/pricing',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/data-rights-request'
];
```

---

## Appendix I: Glossary

| Term | Definition |
|------|------------|
| AI Employee | Single execution engine providing phone/SMS/chat AI services |
| Mode | Rule-based behavior configuration of the AI Employee |
| DID | Direct Inward Dial — a phone number |
| TVC | Transcript-Validated Conversion methodology |
| GHL | GoHighLevel platform |
| Control Workflow | Per-DID automation that routes based on mode rules |
| Conversation AI | GHL's SMS/chat AI agent |
| Voice AI | GHL's voice agent for phone calls |

---

**END OF DOCUMENT**
