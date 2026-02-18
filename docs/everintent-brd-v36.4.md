# EverIntent — Complete Business Requirements Document v36.0

**Last Updated:** February 18, 2026  
**Version:** 36.7 (Core Web Vitals & PageSpeed optimization)
**Status:** BUILD-READY
**Owner:** EverIntent LLC  
**Tagline:** Web Design AI & Automation
**GitHub Path:** /docs/everintent-brd-v36.4.md

---

## v36.7 Amendment — Core Web Vitals & PageSpeed Optimization

> This section documents changes from v36.6 → v36.7. Based on PageSpeed Insights audit (Feb 18, 2026): Performance 64, Accessibility 96→100, Best Practices 100, SEO 92→100.

### D1. Font Loading Strategy (Non-Render-Blocking)

Google Fonts must be loaded asynchronously to prevent render-blocking. The `<link rel="stylesheet">` pattern in `index.html` is replaced with `<link rel="preload" as="style">` with async onload fallback and `<noscript>` fallback for no-JS.

**Rule:** Font loading in `index.html` MUST use the preload pattern. Direct `rel="stylesheet"` for external fonts is prohibited.

**Note:** This is an infrastructure-level optimization in `index.html`, not a theme pipeline violation. The Theme Typography Pipeline (DB → Publisher → CSS variables) governs *which* fonts are used; `index.html` governs *how* they are loaded. Both layers coexist.

**Font Weight Subsetting (v36.10):** Space Grotesk is loaded at weight 700 only. All heading elements use `font-bold` (weight 700) via `src/index.css`. Inter retains weights 400, 500, 600, 700 (all used across public pages). If a future design requires Space Grotesk at other weights, the Google Fonts URL in `index.html` must be updated to include them.

### D2. LCP Image Optimization Requirements

The Largest Contentful Paint (LCP) element (hero background image) must include:
- `fetchPriority="high"` attribute
- `loading="eager"` (already present)
- `decoding="async"` for non-blocking decode

**Rule:** Any hero/above-the-fold image identified as the LCP element MUST have `fetchPriority="high"`. Below-fold images MUST have `loading="lazy"`.

### D3. Descriptive Link Text (SEO)

Generic link text ("Learn more", "Click here", "Read more") is prohibited on all public-facing pages. Links must describe their destination.

**Rule:** All `<a>` elements must have descriptive text that communicates the link's purpose without surrounding context. Example: "See how AI recovers missed calls" instead of "Learn more".

### D4. Minimum Touch Target Size (Accessibility)

Interactive elements (links, buttons) must meet a minimum touch target of 44x44px per WCAG 2.1 Success Criterion 2.5.5.

**Rule:** Inline interactive elements (text links within paragraphs, inline buttons) must include `min-h-[44px] min-w-[44px] inline-flex items-center` to meet touch target requirements.

### D5. JS Bundle Size — Route-Level Code Splitting (OPEN)

PageSpeed flagged 409KB of unused JavaScript in a single 569KB bundle (`app-cxxjllB4.js`). This is the primary remaining performance bottleneck.

**Status:** OPEN — requires architectural evaluation. `vite-react-ssg` does not natively support `React.lazy()` code splitting. Options under investigation:
1. **Manual route grouping** via Vite `manualChunks` (previously failed — see Appendix H)
2. **Dynamic imports** for heavy page components (portfolio case studies, admin)
3. **Migration** from `vite-react-ssg` to `vite-plugin-html-prerender` (already installed but unused)
4. **Tree-shaking audit** to identify unused library imports

**Constraint:** Any solution must NOT break SSG pre-rendering or cause hydration mismatches.

**P0 Dead Code Removal (v36.8 — repo cleanup, not bundle reduction):** Removed 5 unused shadcn/ui wrapper components (chart, command, drawer, calendar, carousel) and uninstalled 5 orphaned dependencies (recharts, cmdk, vaul, react-day-picker, embla-carousel-react). date-fns was kept — used by admin/Submissions.tsx. **Bundle impact: 0KB** — Vite's tree-shaking already excluded these unreachable files from the production build. The 569KB monolithic bundle remains unchanged. This was a repository hygiene fix, not a performance fix.

**D5 Reassessment (v36.8):** The bundle is monolithic because `routes.tsx` eagerly imports all 90+ page components and `vite-react-ssg` requires synchronous imports for pre-rendering. Tree-shaking is already effective — no unused library code reaches the bundle. The remaining 569KB IS the application. Reduction requires either (A) dynamic imports for admin/heavy pages behind ClientOnly guards, (B) SSG strategy migration to enable standard Vite code splitting, or (C) accepting the current score and optimizing images (D6) instead. This is an architectural decision, not a quick fix.

**D5 P2: Admin Route Lazy Loading (v36.11):** All admin page components converted from eager `import` to `React.lazy()` dynamic imports. This includes 4 direct admin page imports in `routes.tsx` and 6 module page component imports across `src/modules/*/index.ts`. Admin routes are CSR-only (excluded from `prerenderRoutes`), so `React.lazy` is safe — no SSG hydration conflict. A `<Suspense>` fallback (centered spinner) was added to `AdminLayout` in `routes.tsx`. This defers framer-motion (~80-100KB, used only in 3 Playground pages), react-hook-form, admin CRUD UI, and all module page components from the public-facing bundle. Public visitors download only marketing page code.

### D6. Image Format Optimization (PARTIAL)

Hero background image (187KB JPG) should be converted to WebP/AVIF for ~50% size reduction. Other lifestyle images are appropriately sized but could benefit from responsive `srcset` attributes.

**Status:** PARTIAL — Hero and 3 largest lifestyle images converted to WebP at quality 40, resized to 1280w (v36.9). Total savings: 1,199KB → 240KB (80% reduction). Remaining lifestyle images under 50KB, low priority.

### D7. Favicon Update

The site favicon (`public/favicon.svg`) was simplified from a multi-path SVG sparkle icon (stroke-based, `hsl(240, 70%, 60%)`) to a single Unicode ✦ character rendered as text (`fill="#3B82F6"`, serif font). This reduces SVG complexity and renders crisply at 32x32.

**Rule:** Favicon must remain an inline SVG (no external image dependency). Brand color must match the `--primary` design token or be documented as an intentional override.

---

## v36.2 Amendment — P0 Site-Wide Audit Fixes

> This section documents changes from v36.1 → v36.2.

### C1. Full AI Employee Content Deduplication

The Full AI Employee page (`/let-ai-handle-it/full-ai-employee`) previously had **three redundant feature sections**: (1) Channels Grid, (2) "What's Unlimited" grid, and (3) ExpandableFeatureGrid. These have been consolidated into a **single "What's Included" section** using the ExpandableFeatureGrid component. A standalone Voice Minutes callout remains as a separate section. This pattern is now the standard: **one feature section per product page, no duplicated content blocks.**

### C2. No-Pill Styling Enforcement (rounded-full Purge)

All `rounded-full` badge/tag/pill violations on public-facing pages have been replaced with `rounded-lg`. **Affected pages:** Industries hub, all 4 industry sub-pages (Home Services, Professional Services, Health & Wellness, Automotive), IndustryShowcaseTemplate, Services hero, Warmy Email Deliverability, and Full AI Employee comparison section. **Exemptions:** Decorative background orbs (blur-3xl), avatar circles, progress bar fills, and tiny indicator dots (w-1.5 h-1.5) remain `rounded-full` as they are not badge/tag UI elements.

### C3. FAQPage JSON-LD on /faq

The FAQ page now includes `FAQPage` structured data covering all 23 questions across 5 categories. This enables rich snippet eligibility in Google SERPs and AEO visibility.

### C4. SSG Navigation Compliance (Link → Native Anchor)

React Router `<Link>` components have been replaced with native `<a>` tags on the AI Employee hub, Industries hub, and About page. This enforces the SSG native anchor standard for proper static site behavior, SEO crawling, and mobile browser URL updates.

---

## v36.1 Amendment — Warmy Tier Reassignment + Naming Convention

> This section documents changes from v36.0 → v36.1.

### B1. Warmy Bundling Change (Supersedes all prior Warmy bundling references)

Warmy Email Deliverability is now bundled **free with Smart Websites: Scale** ($297/mo), not Capture. Standalone pricing remains $49/mo.

### B2. Cross-Reference Naming Convention

When referencing Smart Website tiers **outside their own product pages** (e.g., on Warmy page, industry pages, add-on cards), use the colon format: **"Smart Websites: [Tier]"** (e.g., "Smart Websites: Scale", "Smart Websites: Capture"). This ensures tiers are never orphaned without product context.

---

## v36.0 Amendment — GTM Trust & Revenue Fixes

> This section documents changes from v35.3 → v36.0. All sections below are **authoritative** and override any conflicting content in the body of this document.

### A1. Tier Naming Sync (Supersedes §6 "Tier Naming — RESOLVED")

All customer-facing UI, marketing copy, and internal documentation must use the v2.2 tier names:

| Internal ID | v35.3 Name | v36.0 Name (Authoritative) |
|-------------|------------|---------------------------|
| T1 | Smart Site | **Launch** |
| T2 | Smart Lead | **Capture** |
| T3 | Smart Business | **Convert** |
| T4 | Smart Growth | **Scale** |

The old names (Smart Site, Smart Lead, Smart Business, Smart Growth) are deprecated. They may appear in URL slugs (e.g., `/smart-websites/smart-lead`) for backward compatibility but must NEVER appear in headings, CTAs, cards, FAQs, or marketing copy.

### A2. AI Employee Pricing (Supersedes §5.8 Mode Pricing Table)

Consolidated plans with current pricing:

| Plan | Setup Fee | Monthly |
|------|-----------|---------|
| After-Hours | $997 | **$197/mo** |
| Front Office | $1,497 | **$297/mo** |
| Full AI Employee | $2,500 | **$597/mo** |
| Web Chat Only | $497 | $79/mo |

The old 5-mode structure (M1–M5) is collapsed to 3 plans + Web Chat. After-Hours includes booking + missed call recovery. Front Office includes missed call recovery.

### A3. Smart Websites Pricing (Supersedes §5.13 Conversion Ladder)

| Tier | Setup | Monthly |
|------|-------|---------|
| Launch | $249 (one-time) | $149/yr renewal |
| Capture | — | $97/mo |
| Convert | — | $197/mo |
| Scale | — | **$297/mo** |

### A4. GHL Tag Schema (v36.3 — Supersedes all prior tag references)

**Convention:** `ei: {category} - {value}` — all lowercase, standard hyphen (-), never en-dash (–).

**Categories:** tier, addon, checkout, form, lifecycle, affiliate, source

**Canonical Registry:** `docs/GHL-TAG-REGISTRY.md` is the single source of truth.  

**Code Constants:** `supabase/functions/_shared/ghlClient.ts` — all edge functions import from here.

### A5. Book a Call Escalation Rule

**Rule:** Any plan priced ≥$297/mo MUST display a secondary "Book a Call" CTA alongside the primary "Get Started" button. This applies to:
- Front Office ($297/mo)
- Full AI Employee ($597/mo)
- Scale ($297/mo)

**Implementation:** Outline-style button linking to `/contact`. Text: "Book a Call". Appears on:
- `/pricing` (both tabs)
- `/compare-websites` (Scale column)
- `/compare-ai-employee` (Front Office + Full AI columns)
- Detail pages: SmartGrowth, FrontOffice, FullAIEmployee

**Rationale:** High-ticket buyers need human reassurance. The chat widget handles instant questions; "Book a Call" provides scheduled consultation for complex decisions.

### A6. "Need Help Choosing?" Prompt

Both comparison pages (`/compare-websites` and `/compare-ai-employee`) must include a "Need help choosing?" prompt below the hero section, linking to `/contact`. This reduces decision paralysis for the non-technical ICP.

### A7. Resource Center Lifecycle Differentiation

| Route | Lifecycle Stage | H1 | Subheadline |
|-------|----------------|-----|-------------|
| `/faq` | Pre-sale | "Questions Before You Buy" | "Answers to help you choose the right plan for your business." |
| `/help` | Post-sale onboarding | "Getting Started With EverIntent" | "Set up your account, connect your tools, and start capturing leads." |
| `/support` | Active client issues | "Help With Your Account" | "Submit a ticket, check SLA response times, or contact us directly." |

### A8. Portfolio Link Integrity Rule

Portfolio cards MUST only link to routes with existing case study components. Cards without a dedicated case study page must either:
1. Link to the portfolio hub (`/portfolio`) instead of a dead slug, OR
2. Not render the "View Case Study" CTA

**Current case studies with routes:** Desert Cool Air, Clearview Dentistry Austin, Alexander Tree, Honest Wrench Auto.
**Cards without case studies:** Ashford Law, Summit Climate, Golden Gate Roofing, Harmony Wellness, Precision Auto — these must link to `/portfolio`.

### A9. SSG Anchor Compliance Expansion

Per the existing SSG native anchor standard, the following components were found to violate the `<a>` tag requirement and must be fixed:
- `PortfolioCard.tsx` — uses React Router `<Link>`
- `Pricing.tsx` — uses `<Link>` for "See Details" and compare links
- `CompareWebsites.tsx` — uses `<Link>` for add-on and upsell links
- `CompareAIEmployee.tsx` — uses `<Link>` for contact link
- `PricingTeaser.tsx` — uses `<Link>` for compare link

### A10. Page-Length Guidelines

| Page Type | Max Scroll Depth | Pattern |
|-----------|-----------------|---------|
| Hub pages (/services, /industries) | 4-5 screens | Card directory, no feature duplication |
| Detail pages (/smart-websites/capture) | 6-8 screens | Accordion sections for features beyond top 5 |
| Comparison pages | Unlimited | Full feature matrix is acceptable |
| Resource pages (/faq, /help, /support) | 3-4 screens | Accordions for Q&A; concise answers |

### A11. Services Page Layout Bug

`Services.tsx` wraps its content in `<Layout>`, creating a double Header/Footer since `RootLayout` already provides `<Layout>`. The inner `<Layout>` wrapper must be removed.

### A12. PricingTeaser Homepage Card Fix

The homepage `PricingTeaser` component shows "AI Employee" as the 4th card. This must be changed to "Scale" ($297/mo) to maintain consistency with the Smart Websites product line. AI Employee has its own dedicated section on the homepage.

---

## Document Purpose

This is the **single source of truth** for EverIntent.com. It governs:

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
- Tier names updated in v36.0: Launch (was Smart Site), Capture (was Smart Lead), Convert (was Smart Business), Scale (was Smart Growth). Old names deprecated — see §A1.
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
20. [Compliance & Legal](#20-compliance--legal)
21. [Partner Program](#21-partner-program)
22. [Technical Architecture](#22-technical-architecture)
23. [Operational SOPs](#23-operational-sops)
24. [Upgrade & Downgrade Flows](#24-upgrade--downgrade-flows)
25. [Support Model](#25-support-model)
26. [Build Order & Timeline](#26-build-order--timeline)
27. [Open Questions](#27-open-questions)
28. [Document History](#28-document-history)
29. [Task 3.5 — AI Employee MVP Definition](#29-task-35--ai-employee-mvp-definition)

---

> **⚠️ BODY STALENESS NOTICE (v36.0+)**
>
> Sections §4 through §15 below predate the v36.0 amendments. Where body text conflicts with the amendments at the top of this document, **the amendments are authoritative**:
> - **Tier names:** §A1 renames Smart Site→Launch, Smart Lead→Capture, Smart Business→Convert, Smart Growth→Scale. Body still uses old names.
> - **AI Employee plans:** §A2 collapses 5 modes (M1–M5) to 3 plans (After-Hours, Front Office, Full AI Employee). Body §5.8 still shows old modes.
> - **Pricing:** §A2 and §A3 are the authoritative pricing tables. Body references ($497/mo modes, $249 Capture setup, etc.) are superseded.
> - **Legal pages:** §20.1 has been updated to 5 pages (including Accessibility Statement).

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

**EverIntent** delivers AI automation and smart websites to local service businesses at transparent, affordable prices. AI Employee modes from $497/month, Smart Website tiers from $249 one-time to $497/month recurring, with clear upgrade paths.

**Brand Positioning:** "Stop losing money to missed calls. Let AI handle it."

**Target Market:** Local service businesses across 4 industry categories and 65+ verticals

**Value Proposition:** "We build conversion-focused sites for local service businesses starting at $249. Every site ships upgrade-ready with automation and AI under the hood."

**Product Lines Under EverIntent (v35.1):**
| Product | Description | Entry Point |
|---------|-------------|-------------|
| **AI Employee** | Managed AI receptionist services (voice, SMS, chat) | Primary revenue driver |
| **Smart Websites** | 4-tier website ladder ($249–$497/mo) | Entry point to ecosystem |
| **Web Chat Only** | Chat automation without voice ($497 setup + $79/mo) | Parallel entry point |
| **Warmy Booster** | Email deliverability add-on ($49/mo) | Add-on; free with Smart Websites: Scale |
| **Legal AI** | Specialized vertical at EverIntentLegalAI.com | Separate microsite |

### 2.2 Anchor Statement (v35.0)

> **The EverIntent AI Employee is a single execution engine — one Voice AI Agent per DID, one global Conversation AI, and per-DID Control Workflows — that produces three canonical proof artifacts (call, SMS, and chat transcripts) across five inbound channels, with behavior determined by rule-based modes rather than separate infrastructure builds.**

This statement governs all architectural decisions. There is **one engine, many behaviors** — not multiple systems.

### 2.3 Product Methodology — Transcript-Validated Conversion (TVC)

The AI Employee proves its value through **real interaction transcripts**, not feature lists or demos.

#### Why Transcripts Win

| Traditional Approach | TVC Approach |
|---------------------|--------------|
| "Our AI can answer calls" | "Here's the transcript where AI recovered a $2,400 job at 11pm" |
| Feature specifications | Proof of value delivered |
| Trust required upfront | Evidence provided first |

#### Canonical Transcripts

Three transcript types anchor all marketing, demos, and proof:

| ID | Transcript Type | Trigger | AI Behavior | Proof Value |
|----|-----------------|---------|-------------|-------------|
| T1 | **Missed Call Recovery** | Call missed OR AI hangup <15s | SMS sent → Conversation AI engages | "We recovered this lead you would have lost" |
| T2 | **After-Hours Answering** | Call outside business hours | Voice AI answers, qualifies, books | "We handled this while you slept" |
| T3 | **Front-Line Screening** | Call during business hours | Voice AI answers → optional transfer | "We screened this so you didn't waste time" |

**Web Chat** feeds into the same outcomes (O1-O5), producing chat transcripts as a fourth proof artifact but not a separate canonical transcript type.

---

## 2.4 Industry Verticals (65+ Total)

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
2. **Asset Ownership** - We own domains, phone numbers, rankings, traffic. Customers come and go. Assets stay. This is the moat.
3. **One Tech Stack, Multiple Revenue Paths** - Same WordPress build. Same GHL automations. Different monetization based on the relationship.
4. **Relationship → Trust → MRR** - Every interaction builds toward recurring revenue. The goal is always MRR.

### Revenue Streams (v35.1)

| Stream | Description |
|--------|-------------|
| One-time builds | T1 Smart Site ($249) |
| Monthly subscriptions | Smart Lead ($97/mo), Smart Business ($197/mo), Smart Growth ($497/mo) |
| Annual renewals | T1 hosting/maintenance ($149/year) |
| Usage overages | SMS, AI minutes, emails above included |
| AI Employee modes | $497-$597/month per mode (+ $997-$2,500 setup) |
| Web Chat Only | $79/month (+ $497 setup) |
| Warmy Booster | $49/month add-on |

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

### 5.8 AI Employee Product Definition (v35.0)

#### Single Execution Engine

The AI Employee is **NOT** multiple bots, templates, or systems. It is:

| Component | Count | Notes |
|-----------|-------|-------|
| Voice AI Agent | 1 per DID | Uses same base template |
| Conversation AI Agent | 1 global | Handles SMS + Web Chat |
| Control Workflow | 1 per DID | Routes based on mode rules |

#### Modes Are Rule Profiles (Not Builds)

Each mode is a **configuration of the same engine**, not separate infrastructure:

| Mode ID | Mode Name | Active Rules | Setup Fee | Monthly |
|---------|-----------|--------------|-----------|---------|
| M1 | After Hours | Voice AI answers outside hours | $997 | $497 |
| M2 | After Hours + Booking | M1 + booking link allowed | $997 | $497 |
| M3 | Missed Call Recovery | SMS sent on missed/hangup | $997 | $497 |
| M4 | Front Line Screening | Voice AI answers during hours, optional transfer | $1,497 | $547 |
| M5 | Full AI Employee | M1 + M2 + M3 + M4 | $2,500 | $597 |

**All modes share:**
- Dedicated Voice AI + Conversation AI infrastructure
- Same transcript generation capability
- GHL sub-account provisioning

#### Web Chat Only (Standalone)

| Item | Value |
|------|-------|
| Setup Fee | $497 |
| Monthly | $79 |
| Use Case | Website-only engagement, no phone |

#### Warmy Email Deliverability (Full Service)

| Item | Value |
|------|-------|
| **Route** | `/warmy-email-deliverability` |
| **Setup Fee** | — |
| **Monthly** | $49 |
| **Bundling** | Free with Smart Websites: Scale ($297/mo), or $49/mo standalone |

**Core Features:**
- **AI-Powered Warm-Up**: Gradual sending volume increases with smart reply patterns
- **Inbox Placement Testing**: 35 seed email providers, real-time inbox/spam/missing reporting
- **Domain Health Monitoring**: SPF, DKIM, DMARC configuration validation with alerts
- **Deliverability Analytics**: Sender score tracking, blacklist monitoring, detailed reports
- **Auto-Recovery**: Automatic volume reduction when issues detected

**Why Warmy Matters:**
> "If your emails land in spam, your leads never see them. Warmy ensures 95%+ inbox placement for all your marketing and follow-up emails."

**Page Structure (warmy-email-deliverability):**
1. Hero: "Your Emails Deserve to Be Seen" + deliverability score visual
2. Problem Section: Spam folder statistics, cold email challenges
3. Solution Grid: 4-feature breakdown with icons
4. Integration Section: Works with GHL, any SMTP
5. Pricing Card: $49/mo standalone OR "Included with Smart Websites: Scale"
6. FAQ: 4-5 questions (setup time, email limits, compatibility)
7. CTA: "Boost Your Deliverability" → checkout

#### Multi-Mode Discount

**15% monthly discount** when purchasing 2+ modes together.

#### Buyer Personas

**Assisted Buyer (Demo-Led)**
- Wants to see it work before committing
- Needs human reassurance
- Path: View transcripts → Book demo → Sales call → Purchase

**Self-Service Buyer (No-Talk)**
- Ready to buy, doesn't want sales friction
- Path: View transcripts → Select mode → Checkout → Automated onboarding

**MVP must support both paths.** Self-service capability is non-negotiable.

### 5.9 Platform Object Model — GHL (v35.0)

#### AI Objects

| Object | Count | Notes |
|--------|-------|-------|
| Voice AI Agent | 1 per DID | Cloned from master template |
| Conversation AI Agent | 1 global | Handles all SMS + chat |

#### Automation Objects

| Object | Count | Notes |
|--------|-------|-------|
| Control Workflow | 1 per DID | SMS sender = DID |
| Web Chat Router | 1 global | Assigns ownership |
| Lead Forwarding | 1 global | Sends leads off-platform |
| Dedupe Workflow | 1 global | Noise control |

#### Data Objects

| Object | Required |
|--------|----------|
| Custom Fields | ~5 (mode, setup status, DID, etc.) |
| Tags | ~10 (see Tag Schema below) |

#### GHL Tag Schema (v35.1)

```
# AI Employee Modes
EI: AI - Missed Call Recovery
EI: AI - After Hours
EI: AI - After Hours + Booking
EI: AI - Front Line Screening
EI: AI - Full Employee

# Smart Website Tiers
EI: Smart Website - Starter
EI: Smart Website - Lead
EI: Smart Website - Business
EI: Smart Website - Growth

# Standalone Products
EI: Web Chat Only
EI: Warmy Booster

# Status Tags
EI: Setup Complete
EI: Setup Pending
```

### 5.10 Digital Donut Strategy (v35.1)

The "Digital Donut" is an outbound sales strategy using pre-built demo sites with trained bots.

#### Workflow Overview

```
1. n8n scrapes leads (local businesses without AI)
2. After-hours call test → proves missed call problem
3. Build mock site + trained bot for prospect
4. Generate unique donut_id
5. Update GHL contact with donut_id
6. Trigger automated demo email sequence
7. Dynamic HighLevel funnel page embeds personalized bot
```

#### GHL Custom Fields Required

| Field | Type | Purpose |
|-------|------|---------|
| `donut_id` | Text | Unique ID linking prospect to their demo |

#### Email Sequence Trigger

When `donut_id` is populated, GHL workflow triggers:
1. "We built this for you" email with demo link
2. Follow-up showing their exact after-hours gap
3. Call scheduling CTA

### 5.12 MVP Canonical Scope (v35.1)

#### MVP Inputs (Channels)

| ID | Channel | Required | Notes |
|----|---------|----------|-------|
| C1 | Phone – Human DID | ✅ | Client's existing number |
| C2 | Phone – AI DID | ✅ | Dedicated AI line |
| C3 | SMS | ✅ | Two-way via DID |
| C4 | Web Chat Widget | ✅ | Embedded on client site |
| C5 | Email (notifications) | ✅ | Owner alerts only |

#### MVP Outputs (Outcomes)

| ID | Outcome | Required | Proof |
|----|---------|----------|-------|
| O1 | Missed call → SMS recovery | ✅ | SMS transcript |
| O2 | After-hours call answered | ✅ | Call transcript |
| O3 | Booking link delivered | ✅ | Booking confirmation |
| O4 | Human transfer with context | ✅ | Transfer log |
| O5 | Owner notified | ✅ | Notification log |

#### MVP Proof Artifacts

| Artifact | Source | Required |
|----------|--------|----------|
| Call transcript | Voice AI | ✅ |
| SMS transcript | Conversation AI | ✅ |
| Chat transcript | Web Chat | ✅ |

**MVP is complete when all channels produce all applicable outcomes with captured transcripts.**

### 5.13 Smart Websites (Standalone Product)

Smart Websites are **loss-leader entry points** that introduce clients to EverIntent's ecosystem.

#### The Conversion Ladder (v35.1)

```
Smart Site ($249) → Smart Lead ($97/mo) → Smart Business ($197/mo) → Smart Growth ($497/mo) → AI Employee ($149-$297/mo)
```

#### Smart Website Tiers (v35.1)

| Tier | Setup | Monthly | Key Features | Target |
|------|-------|---------|--------------|--------|
| **Smart Site** | $249 | $149/yr renewal | 5-page site, mobile, SEO, contact form | New businesses needing web presence |
| **Smart Lead** | $249 | $97/mo | + Missed-call text-back, GBP sync, Warmy nurture, reputation, call tracking | **Ad-spend clients** (flagship) |
| **Smart Business** | $497 | $197/mo | + Booking, pipeline, review automation | Growing businesses scaling operations |
| **Smart Growth** | $997 | $297/mo | + AI voice, advanced automation, unified inbox | Businesses ready for full automation |

#### Smart Lead — Flagship for Ad Buyers (v35.1)

**Smart Lead** ($249 setup + $97/mo) is the flagship service for clients running paid ads:

| Feature | Description |
|---------|-------------|
| Missed-call text-back | Instant SMS within 60 seconds of missed call |
| GBP Sync | LeadConnector number as primary GBP number; existing number moved to secondary |
| Warmy Nurture | Warmy.io-powered email/SMS sequences with warm-up |
| Reputation Management | Automated review requests post-job |
| Call Tracking | Attribution for ad campaigns |

### 5.14 GBP Integration Routing (v35.1)

Google Business Profile integration ensures all inbound calls are tracked and attributed.

#### Routing Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  GOOGLE BUSINESS PROFILE                                    │
│                                                             │
│  Primary Number: LeadConnector (AI-enabled)                 │
│  Secondary Number: Client's existing business line          │
│                                                             │
│  All GBP calls → LeadConnector → AI handling + tracking     │
│  Client keeps existing number for direct/legacy calls       │
└─────────────────────────────────────────────────────────────┘
```

#### Benefits

| Benefit | Description |
|---------|-------------|
| **Call Attribution** | Every GBP call tracked to source (ads, organic, maps) |
| **AI Handling** | Missed calls trigger AI text-back within 60 seconds |
| **Recording** | All calls recorded for quality and training |
| **No Disruption** | Client's existing number remains active as secondary |

#### Implementation Steps

1. Provision LeadConnector DID in client's area code
2. Configure AI modes (M1-M5) on the DID
3. Update GBP listing: LeadConnector as **primary**, existing number as **secondary**
4. Test call routing and AI response
5. Enable call tracking dashboard in GHL

#### Included In

- **Smart Lead** and above tiers
- **All AI Employee modes** (M1-M5)

#### Standalone Products (v35.1)

| Product | Setup | Monthly | Use Case |
|---------|-------|---------|----------|
| **Web Chat Only** | $497 | $79/mo | Chat automation without voice AI |
| **Warmy Booster** | — | $49/mo | Email deliverability add-on (bundled with Smart Websites: Scale or à la carte) |

#### Relationship to AI Employee

- Smart Websites are **standalone products**
- AI Employee modes are **add-ons** to any website tier
- Smart Lead bridges the gap between static sites and full AI automation
- Web Chat Only is a parallel entry point for chat-only automation

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

### T2 - Smart Lead ($249 setup + $97/month) — FLAGSHIP

**Who it's for:** Businesses running paid ads who need lead capture and follow-up automation.

**Includes everything in T1, plus:**
- Missed call text-back (instant SMS within 60 seconds)
- AI chat widget
- Lead capture forms
- Contact management (CRM)
- SMS/email communication
- Mobile app access
- **GBP Sync** (LeadConnector as primary number)
- **Warmy-powered nurture sequences**
- **Reputation management** (automated review requests)
- **Call tracking & attribution**
- 400 SMS/month included
- 30 AI minutes/month included

### T3 - Smart Business ($497 setup + $197/month)

**Who it's for:** Growing businesses that need to streamline operations.

**Includes everything in T2, plus:**
- Online booking/calendar
- Pipeline management
- Review automation
- Basic workflows
- 600 SMS/month included
- 50 AI minutes/month included

### T4 - Smart Growth ($997 setup + $297/month)

**Who it's for:** Businesses ready for full automation and growth.

**Includes everything in T3, plus:**
- AI voice agent
- Advanced automations
- Unified inbox
- Reporting dashboard
- Quarterly strategy calls
- 1000 SMS/month included
- 100 AI minutes/month included

### Smart Launch — DEFERRED

> **Status:** DEFERRED (Post-MVP)  
> **Reason:** Requires custom build process and 90-day marketing sprint SOPs not yet defined.

**Concept:** $2,500-$4,500 one-time + $297/month for businesses needing custom 10-page sites with marketing sprint.

### SmartStart Strategy Session — DEFERRED

> **Status:** DEFERRED (Post-MVP)  
> **Reason:** Requires sales process and consultation framework not yet defined.

**Concept:** $500-$750 paid consultation with credit toward purchase.

### Tier Naming — RESOLVED (v35.1)

Tier names finalized as:
- **Smart Site** (T1)
- **Smart Lead** (T2) — Flagship for ad buyers
- **Smart Business** (T3)
- **Smart Growth** (T4)

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

### 7.1 Smart Launch Feature Set — DEFERRED

> **Status:** DEFERRED (Post-MVP)  
> **Reason:** Smart Launch product not in v35.1 scope.

**Concept:** $2,500-$4,500 one-time + $297/mo for custom 10-page sites with 90-day marketing sprint.

---

## 8. Competitive Analysis

| Competitor | Price | Build Time | Ownership | Automation |
|------------|-------|------------|-----------|------------|
| Wix | $16-159/mo | DIY | No | Limited |
| Squarespace | $16-49/mo | DIY | No | Limited |
| GoDaddy | $10-25/mo | DIY | No | None |
| Local agency | $2,000-10,000 | 4-8 weeks | Varies | Extra cost |
| **EverIntent Smart Site** | **$249** | **5 days** | **Yes** | **Upgrade path** |

**Our advantage:** Professional build quality at DIY prices, with clear automation upgrade path to Smart Lead, Smart Business, Smart Growth, and AI Employee.

---

## 9. Customer Journey

### Entry Points (v35.1)

```
┌─────────────────────────────────────────────────────────────┐
│ EverIntent.com                                              │
│                                                             │
│ Ready to start?        Need AI?           Need help?        │
│  [Get Started]     [See AI Employee]    [Book 30min Call]   │
└─────────────────────────────────────────────────────────────┘
```

**Path A: Ready to Buy** → /pricing → Checkout flow
**Path B: Want AI** → /let-ai-handle-it → Mode selection → Checkout
**Path C: Need Help** → GHL calendar booking → 30-min free consultation

> **Note:** SmartStart Strategy Session (paid consultation) is DEFERRED.

### How Buyers Actually Find Us (Persona-Based)

Local service businesses don't search for "T2 package." They experience **trigger events**:

| Trigger Event | What They Say | What They Search |
|---------------|---------------|------------------|
| Lost deal to competitor | "Their website looked more professional" | "web design for [industry]" |
| Slow month | "I'm not getting enough calls" | "how to get more leads" |
| Bad review | "My Google rating dropped" | "reputation management" |
| Missed calls | "I can't answer my phone when I'm working" | "missed call text back" |
| Schedule chaos | "I'm double-booked again" | "online booking for [industry]" |

**Key insight:** They search for **products/solutions**, not tier comparisons. This is why industry landing pages (4 category stubs) are planned for Phase 3E.

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
│   from EverIntent...                │
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
│                    everintent.com                                       │
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
│   URL: https://go.everintent.com/[tier-slug]                            │
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

### AI Employee Checkout Flow (v35.0)

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

#### Post-Payment Automation (GHL)

1. **Tag Applied:** `EI: [Product Purchased]`
2. **Confirmation Email:** Sent automatically
3. **Intake Form:** Triggered based on product tag
4. **Internal Task:** Created for provisioning team
5. **Portal Access:** Granted to `app.everintent.com`

### Domain Architecture

| Domain | Purpose | Platform |
|--------|---------|----------|
| `everintent.com` | Marketing website | Vercel (React) |
| `go.everintent.com` | Checkout funnels | GHL |
| `app.everintent.com` | Customer portal | GHL |

### Stripe Configuration

**Products (in Stripe, synced to GHL):**

| Product | Price | Billing |
|---------|-------|---------|
| Smart Site (T1) | $249 | One-time |
| Smart Lead (T2) | $97 | Monthly |
| Smart Business (T3) | $197 | Monthly |
| Smart Growth (T4) | $297 | Monthly |
| T1 Annual Renewal | $149 | Yearly (after Y1) |
| AI Employee - M1/M2/M3 (After Hours, +Booking, Missed Call) | $497 | Monthly |
| AI Employee - M4 (Front Line Screening) | $547 | Monthly |
| AI Employee - M5 (Full AI Employee) | $597 | Monthly |
| AI Employee - Setup Fee (M1-M3) | $997 | One-time |
| AI Employee - Setup Fee (M4) | $1,497 | One-time |
| AI Employee - Setup Fee (M5) | $2,500 | One-time |
| Web Chat Only | $79 | Monthly |
| Web Chat Only - Setup Fee | $497 | One-time |
| Warmy Booster | $49 | Monthly |

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
- White-label: app.everintent.com

### GHL Account Structure

```
GHL Master Account (EverIntent)
├── AI Employee infrastructure
│   ├── Voice AI Agent templates
│   ├── Conversation AI (global)
│   └── Control Workflows
├── Pipeline: AI Employee Leads
│   ├── New Lead
│   ├── Demo Scheduled
│   ├── Checkout Started
│   └── Setup Complete
└── Pipeline: Smart Websites
    ├── Checkout Started
    ├── Intake Complete
    ├── Build In Progress
    └── Live

GHL Sub-Account (per customer)
├── Their phone number
├── Their forms
├── Their automations (based on tier snapshot)
├── Their contacts/CRM
└── Their pipeline
```

### Plans Configuration

| Plan | Price | Snapshot | Trial |
|------|-------|----------|-------|
| ei-t1-smart-site | $249 one-time | ei-t1-snapshot | None |
| ei-t2-smart-lead | $97/mo | ei-t2-snapshot | None |
| ei-t3-smart-business | $197/mo | ei-t3-snapshot | None |
| ei-t4-smart-growth | $297/mo | ei-t4-snapshot | None |
| ei-web-chat-only | $79/mo | ei-webchat-snapshot | None |
| ei-warmy-booster | $49/mo | — | None |

### Welcome Email Template

```
Subject: Welcome to EverIntent! Here's what happens next.

Hi {first_name},

Your EverIntent order is confirmed! Here's what to expect:

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

— The EverIntent Team
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
| ai_employee_mode | Dropdown | M1/M2/M3/M4/M5 |
| ai_employee_status | Dropdown | setup_pending/active/paused |
| ai_did | Text | Dedicated AI phone number |

### 11.2 GHL Tags Strategy

All GHL tags are centralized in `supabase/functions/_shared/ghlClient.ts` → `GHL_TAGS` constant.
Tags are **not** user-editable in admin; they are code-managed for consistency.

| Tag | Constant | Applied When |
|-----|----------|--------------|
| `EI: Checkout - Smart Site` | `GHL_TAGS.CHECKOUT_T1` | User starts T1 checkout |
| `EI: Checkout - Smart Lead` | `GHL_TAGS.CHECKOUT_T2` | User starts T2 checkout |
| `EI: Checkout - Smart Business` | `GHL_TAGS.CHECKOUT_T3` | User starts T3 checkout |
| `EI: Checkout - Smart Growth` | `GHL_TAGS.CHECKOUT_T4` | User starts T4 checkout |
| `EI: Checkout - Web Chat Only` | `GHL_TAGS.CHECKOUT_WEB_CHAT` | User starts Web Chat Only checkout |
| `EI: Checkout - Warmy Booster` | `GHL_TAGS.CHECKOUT_WARMY` | User starts Warmy Booster checkout |
| `Careers: Application` | `GHL_TAGS.CAREERS_APPLICATION` | Job application submitted |
| `EI: Contact Form` | `GHL_TAGS.CONTACT_FORM` | Contact form submission |
| `DSAR: Data Rights Request` | `GHL_TAGS.DATA_RIGHTS_REQUEST` | CCPA data rights request (45-day SLA) |
| `EI: AI - Missed Call Recovery` | `GHL_TAGS.AI_MISSED_CALL` | AI Employee M3 purchased |
| `EI: AI - After Hours` | `GHL_TAGS.AI_AFTER_HOURS` | AI Employee M1 purchased |
| `EI: AI - After Hours + Booking` | `GHL_TAGS.AI_AFTER_HOURS_BOOKING` | AI Employee M2 purchased |
| `EI: AI - Front Line Screening` | `GHL_TAGS.AI_FRONT_LINE` | AI Employee M4 purchased |
| `EI: AI - Full Employee` | `GHL_TAGS.AI_FULL_EMPLOYEE` | AI Employee M5 purchased |
| `EI: Setup Complete` | `GHL_TAGS.SETUP_COMPLETE` | AI Employee setup finished |

**Tag Naming Convention:** `{Category}: {Action/Status}`

---

## 12. Customer Portal Architecture

### T1 Dashboard (Neutered)

**What T1 Customers See:**

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] EverIntent               {user name} ▼                │
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

1. Create GA4 property: "{Business Name} - EverIntent"
2. Add data stream (web)
3. Install tag via Google Tag Manager
4. Configure basic events (page_view, form_submit, click)
5. Set up monthly email reports

### T1 Analytics Access

T1 customers get view-only access via:
- Monthly PDF email reports (automated from GA4)
- Dashboard widget showing key metrics (visitors, pageviews, top pages)

### T2-T4 Analytics Access

Full GA4 access plus:
- Conversion tracking (form submissions, calls)
- Custom reports in GHL dashboard
- Integration with CRM data

---

## 14. WordPress Customer Sites

### Standard Build Specification

| Component | Specification |
|-----------|---------------|
| Theme | Starter theme (customized per brand) |
| Page Builder | Elementor Pro |
| Hosting | OVH/Plesk |
| CDN | Cloudflare |
| SSL | Let's Encrypt (via Cloudflare) |
| Performance | LiteSpeed Cache |
| SEO | Yoast SEO |
| Forms | WPForms / GHL embed |
| Analytics | GA4 + GTM |

### Standard Pages (5-Page Template)

1. **Home** - Hero, services overview, testimonials, CTA
2. **Services** - Service list with descriptions
3. **About** - Company story, team, credentials
4. **Contact** - Form, map, phone, hours
5. **Gallery/Portfolio** (or additional service page)

### Build Checklist

- [ ] Mobile responsive (test on 3+ device sizes)
- [ ] Page speed score > 80 (mobile)
- [ ] SSL active
- [ ] Forms connected to GHL
- [ ] GA4 installed
- [ ] Basic SEO setup (title, meta, schema)
- [ ] Favicon and social images
- [ ] Call recording disclosure in footer
- [ ] Privacy policy linked
- [ ] Terms of service linked

---

## 15. Marketing Site Specification

### 15.1 Route Map Configuration

The following TypeScript configuration defines the routes for the marketing site:

```typescript
// src/config/routes.ts
export const routes = {
  // Main pages (pre-rendered)
  home: '/',
  pricing: '/pricing',
  portfolio: '/our-work',
  about: '/about',
  contact: '/contact',
  bookCall: '/contact', // "Book a Call" CTAs link to /contact, not a separate route

  // Services (pre-rendered) - Benefit-oriented routes
  services: {
    index: '/services',
    beautifulWebsites: '/smart-websites',
    getFounded: '/get-found-online',
    neverMissLead: '/never-miss-a-lead',
    bookMoreJobs: '/book-more-jobs',
    runFromPhone: '/run-from-your-phone',
    buildReputation: '/build-your-reputation',
    letAiHandleIt: '/let-ai-handle-it',
  },

  // Features — DEFERRED (Post-MVP)
  // These individual feature pages are not in v35.1 scope
  // features: {
  //   leadCapture: '/features/lead-capture',
  //   aiChat: '/features/ai-chat',
  //   reviewManagement: '/features/review-management',
  //   mobileApp: '/features/mobile-app',
  //   scheduling: '/features/scheduling',
  //   analytics: '/features/analytics',
  // },

  // Industries — v35.1 Scope: 4 category hub pages only
  // Individual vertical pages (65+) are DEFERRED to post-MVP
  industries: {
    // MVP Hub pages (Phase 3E)
    index: '/industries',                           // Landing page
    homeServices: '/industries/home-services',      // Category stub
    professional: '/industries/professional',       // Category stub
    healthWellness: '/industries/health-wellness',  // Category stub
    automotive: '/industries/automotive',           // Category stub
    
    // Individual vertical pages — DEFERRED (Post-MVP)
    // 65+ vertical pages (hvac, plumbing, legal, dental, etc.)
    // to be added when SEO content strategy is finalized
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

// MVP Active Routes (v35.0)
export const mvpRoutes = [
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

// Routes to pre-render (excludes admin)
export const prerenderRoutes = [
  '/',
  '/pricing',
  '/portfolio',
  '/about',
  '/contact',
  '/smart-websites',
  '/let-ai-handle-it',
  
  // Industry Hub Pages
  '/industries/home-services',
  '/industries/professional-services',
  '/industries/health-wellness',
  '/industries/automotive-services',
  
  // ... all industry verticals ...
  
  // Legal & Checkout
  '/legal/privacy',
  '/legal/terms',
  '/legal/data-request',
  '/checkout/smart-site',
  '/checkout/smart-lead',
  '/checkout/smart-business',
  '/checkout/smart-growth',
  '/checkout/success',

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

### Marketing Site (everintent.com)

```
/                                   # Homepage
├── /smart-websites/                # Smart Websites hub
│   ├── /launch/                    # Launch tier detail
│   ├── /capture/                   # Capture tier detail
│   ├── /convert/                   # Convert tier detail
│   ├── /scale/                     # Scale tier detail
│   └── /add-ons/                   # Add-on packs page
├── /let-ai-handle-it/              # AI Employee hub
│   ├── /after-hours/               # After-Hours AI detail
│   ├── /front-office/              # Front Office AI detail
│   └── /full-ai-employee/          # Full AI Employee detail
├── /pricing/                       # Tier comparison + CTAs
├── /compare-websites/              # Smart Websites side-by-side
├── /compare-ai-employee/           # AI Employee side-by-side
├── /warmy-email-deliverability/    # Email Authority standalone page
├── /checkout/
│   ├── /launch/                    # Launch checkout
│   ├── /capture/                   # Capture checkout
│   ├── /convert/                   # Convert checkout
│   ├── /scale/                     # Scale checkout
│   ├── /after-hours/               # After-Hours checkout
│   ├── /front-office/              # Front Office checkout
│   ├── /full-ai/                   # Full AI Employee checkout
│   └── /web-chat/                  # Web Chat checkout
├── /services/                      # Services hub
│   ├── /web-design/                # Product category (SEO)
│   ├── /seo/                       # Product category (SEO)
│   ├── /lead-capture/              # Product category (SEO)
│   ├── /booking/                   # Product category (SEO)
│   ├── /reputation/                # Product category (SEO)
│   ├── /ai-automation/             # Product category (SEO)
│   ├── /get-found-online/          # Benefit page
│   ├── /never-miss-a-lead/         # Benefit page
│   ├── /book-more-jobs/            # Benefit page
│   ├── /run-from-your-phone/       # Benefit page
│   ├── /build-your-reputation/     # Benefit page
│   └── /let-ai-handle-it/         # Benefit page
├── /features/                      # Feature deep-dives (SEO)
│   ├── /lead-capture/
│   ├── /ai-chat/
│   ├── /review-management/
│   ├── /mobile-app/
│   ├── /scheduling/
│   └── /analytics/
├── /industries/                    # Industry landing pages
│   ├── /home-services/             # Hub + /showcase
│   ├── /professional-services/     # Hub + /showcase
│   ├── /health-wellness/           # Hub + /showcase
│   └── /automotive-services/       # Hub + /showcase
├── /locations/                     # Local landing pages
│   ├── /long-beach/
│   ├── /orange-county/
│   └── /los-angeles/
├── /portfolio/                     # Case studies & live sites
│   ├── /riverstone-plumbing/
│   ├── /desert-cool-air/
│   ├── /clearview-dentistry-austin/
│   ├── /alexander-tree/
│   └── /honest-wrench-auto/
├── /about/                         # Company story
├── /contact/                       # Contact form + Book a Call
├── /careers/                       # Job listings
├── /faq/                           # Frequently asked questions
├── /help/                          # Help center
├── /support/                       # Support contact
├── /upgrade/                       # Tier upsell page
├── /legal/
│   ├── /privacy/                   # Privacy Policy
│   ├── /terms/                     # Terms of Service
│   ├── /cookies/                   # Cookie Policy
│   ├── /data-request/              # DSAR form
│   └── /accessibility-statement/   # Accessibility Statement
└── /admin/                         # Admin portal (protected)
    ├── /login/
    ├── /reset-password/
    ├── /theme-test/
    ├── /submissions/
    ├── /portfolio/
    ├── /testimonials/
    └── /careers/
```

### Customer Portal (GHL)

```
app.everintent.com/
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

### 17.1 Header Navigation (v36.4)

Navigation uses dropdowns for AI Employee plans and Smart Websites tiers, plus Industries:

| Position | Label | Route | Type |
|----------|-------|-------|------|
| 1 | AI Employee | Dropdown | Dropdown Menu |
| 2 | Smart Websites | Dropdown | Dropdown Menu |
| 3 | Pricing | `/pricing` | Link |
| 4 | Industries | Dropdown (clickable) | Dropdown Menu |
| 5 | Services | `/services` | Link |
| 6 | Portfolio | `/portfolio` | Link |
| 7 | Contact | `/contact` | Link |
| CTA | Get Started | `/pricing` | Button |

**AI Employee Dropdown (3 plans):**
| Label | Route | Description |
|-------|-------|-------------|
| After-Hours | `/let-ai-handle-it/after-hours` | Calls, booking & missed call recovery |
| Front Office | `/let-ai-handle-it/front-office` | Screen, qualify & transfer |
| Full AI Employee | `/let-ai-handle-it/full-ai-employee` | Complete phone management |
| Compare Plans | `/compare-ai-employee` | Side-by-side comparison |

**Smart Websites Dropdown (4 tiers):**
| Label | Route | Description |
|-------|-------|-------------|
| Launch | `/smart-websites/launch` | $249 one-time |
| Capture | `/smart-websites/capture` | $97/mo |
| Convert | `/smart-websites/convert` | $197/mo |
| Scale | `/smart-websites/scale` | $297/mo |
| Compare Plans | `/compare-websites` | Side-by-side comparison |
| Add-On Packs | `/smart-websites/add-ons` | Extend your plan |

**Industries Dropdown (hub link clickable):**
| Label | Route | Description |
|-------|-------|-------------|
| → Industries Hub | `/industries` | (Clickable top-level) |
| Home Services | `/industries/home-services` | HVAC, Plumbing, Electrical |
| Professional Services | `/industries/professional-services` | Legal, Real Estate, Accounting |
| Health & Wellness | `/industries/health-wellness` | MedSpa, Dental, Chiropractic |
| Automotive | `/industries/automotive-services` | Auto Repair, Detailing, Body Shop |

### 17.2 Footer Navigation (v36.4)

**5-Column Structure:**

**Column 1: Services**
| Label | Route |
|-------|-------|
| All Services | `/services` |
| AI Employee | `/let-ai-handle-it` |
| Launch | `/smart-websites/launch` |
| Capture | `/smart-websites/capture` |
| Convert | `/smart-websites/convert` |
| Scale | `/smart-websites/scale` |
| Compare Plans | `/compare-websites` |
| Add-On Packs | `/smart-websites/add-ons` |

**Column 2: AI Employee**
| Label | Route |
|-------|-------|
| After-Hours | `/let-ai-handle-it/after-hours` |
| Front Office | `/let-ai-handle-it/front-office` |
| Full AI Employee | `/let-ai-handle-it/full-ai-employee` |
| Compare Modes | `/compare-ai-employee` |

**Column 3: Resources**
| Label | Route |
|-------|-------|
| Pricing | `/pricing` |
| Portfolio | `/portfolio` |
| FAQ | `/faq` |
| Help Center | `/help` |
| Support | `/support` |
| Industries | `/industries` |

**Column 4: Company**
| Label | Route |
|-------|-------|
| About | `/about` |
| Contact | `/contact` |
| Careers | `/careers` |
| Client Login | `https://app.everintent.com` (external) |

**Column 5: Legal**
| Label | Route |
|-------|-------|
| Privacy | `/legal/privacy` |
| Cookies | `/legal/cookies` |
| Terms | `/legal/terms` |
| Data Rights | `/legal/data-request` |
| Accessibility | `/legal/accessibility-statement` |
### 17.3 MVP Route Implementation

- Hamburger menu with same 5 links + CTA
- No nested menus
- Full-screen overlay

### 17.5 Full Navigation (Post-MVP)

**Primary Navigation (Desktop)**

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

### 17.6 NavHoverMenu Component Specification

Desktop navigation dropdowns use a custom `NavHoverMenu` component with icons and descriptions.

#### Data Structure

```typescript
interface NavHoverItem {
  to: string;              // Route path
  title: string;           // Main text (e.g., "Beautiful Websites")
  description?: string;    // Sub-text line (e.g., "Professional 5-page site")
  icon?: LucideIcon;       // Lucide icon component
  nestedItems?: NavHoverItem[]; // For nested submenus (future)
}
```

#### Icon Implementation

Icons are Lucide React components passed directly in the `icon` property:

```tsx
{item.icon && <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />}
```

- **Color**: `text-primary` (gold/accent color from design system)
- **Size**: `h-5 w-5` (20px)
- **Alignment**: `shrink-0 mt-0.5` (prevents squishing, aligns with first text line)

#### Smart Websites Dropdown Items (Updated v34)

| Title | Description | Icon |
|-------|-------------|------|
| **Smart Websites** | Professional smart websites starting at $249 | `Globe` |
| **Let AI Handle It** | AI automation and voice agents | `Bot` |
| Get Found Online | SEO and local search visibility | `Search` |
| Capture More Leads | Lead capture and follow-up | `MessageSquare` |
| Reputation Management | Review automation | `Star` |
| Social Media Management | Social presence management | `Share2` |
| Content Marketing | Blog and content strategy | `FileText` |

### 17.7 Chat Widget & Support Bot

#### Current State: Single Sitewide Widget

The site currently uses a **single GHL chat widget** (`GHL_WIDGET_ID_SALES`) across all routes. This provides a consistent chat experience sitewide and simplifies operations.

#### Future State: Multi-Widget Architecture (Reserved)

The codebase includes infrastructure for route-based widget switching. When multiple chat personas are needed, the following architecture can be activated:

| Widget Type | Secret Name | Route Prefixes | Purpose |
|-------------|-------------|----------------|---------|
| Sales Bot | `GHL_WIDGET_ID_SALES` | **Default (all routes)** | Sitewide conversion, pricing questions |
| Support Bot | `GHL_WIDGET_ID_SUPPORT` | `/support/*`, `/help/*` | FAQ, support inquiries, data requests |
| Demo Bot | `GHL_WIDGET_ID_DEMO` | `/demo/*` | Feature showcase, capability demonstration |

**Implementation Notes:**
- Widget IDs stored in Supabase secrets (not client-side env vars)
- Edge function `ghl-config` handles route-to-widget mapping
- Frontend `ghlLoader.ts` fetches widget ID from edge function
- Pattern supports adding new widget types without code changes

#### Desktop Chat Button
- Floating button, bottom-right corner
- Fade-up animation on page load (delayed after consent)
- Gated by cookie consent: button hidden until user accepts cookies
- Styled to match EverIntent design system (accent color, primary background)

#### Mobile Chat Access
- Chat integrated into mobile bottom navbar (not floating button)
- Also gated by cookie consent
- Navbar visibility tied to consent state

### 17.8 Legal Pages

#### Route Structure
| Route | Page | Description |
|-------|------|-------------|
| `/legal/privacy` | Privacy Policy | Standard privacy policy |
| `/legal/terms` | Terms of Service | Service terms and conditions |
| `/legal/data-request` | Data Rights | CCPA data request form |
| `/legal/cookies` | Cookie Preferences | Interactive cookie management page |

### CTA Strategy

- **"Get Started"**: Primary marketing CTA, used in header and key conversion points → `/pricing`
- **"Book a Call"**: General site-wide CTA for consultations → `/contact` (not a separate route)
- No `/book-call` route; all "Book a Call" CTAs point to `/contact`

---

## 18. Domain Integration Architecture

### 18.1 Architecture Decision: Manual Domain Purchase

Domain registration is handled **manually** during the onboarding process:

1. Pre-checkout: Customer indicates if they have a domain or need one
2. Post-payment: GHL intake form collects domain preferences
3. During build: Team purchases domain via GHL dashboard or Namecheap (whichever has better pricing)
4. Team configures DNS to point to Plesk hosting

### 18.2 Why Manual (Not API)

| Benefit | Description |
|---------|-------------|
| **No API Integration** | No Namecheap API, no static IP costs, no maintenance |
| **Simpler Checkout** | Fewer steps, less friction, higher conversion |
| **Flexibility** | Team can shop best domain price (GHL vs Namecheap vs other) |
| **Lower Technical Risk** | No checkout failures due to domain API issues |
| **Faster MVP** | Ship without complex domain search UI |

### 18.3 Domain Flow

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

**Decision:** Domain registration is included in all tiers as a value-add. Manual purchase allows flexibility and eliminates API complexity. The 1-minute purchase time per customer is negligible during the 5-day build window.

---

## 19. Go-To-Market Strategy

### 19.1 AI Employee GTM — Transcript-Validated Conversion (v35.0)

EverIntent's go-to-market strategy is anchored around a single, repeatable proof mechanism: **real transcripts generated by the AI Employee in live production scenarios**. These transcripts are not supporting material; they are the primary conversion asset across marketing, sales, demos, and checkout.

**The AI Employee is not sold as software. It is sold as evidence.**

Every part of the business — website copy, ads, outbound outreach, demos, pricing, and checkout — exists to move a prospect from recognizing a problem to seeing themselves inside one of these transcripts.

#### Hero Message (Homepage)

> "While you were sleeping, your AI Employee recovered a $2,400 job."

Immediately followed by the **Missed Call Recovery transcript** as proof.

#### Conversion Paths

| Visitor Intent | Path |
|----------------|------|
| "Show me proof" | View transcript → Browse modes |
| "Let me try" | Demo request → Sales follow-up |
| "I want to buy" | Pricing → Checkout |
| "I have questions" | Chat widget → Conversation AI |

#### Trust Signals

- Transcript embeds (real examples)
- Industry-specific social proof
- "Setup in 48 hours" promise
- Money-back guarantee (if offered)

### 19.2 Product-First Positioning

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
→ everintent.com
```

### UTM Structure

```
utm_source=craigslist|facebook|tradegroup
utm_medium=organic|paid|referral
utm_campaign=phoenix-hvac|dallas-roofing|etc
utm_content=ad-variant-a|ad-variant-b
```

### 19.4 Success Metrics (v35.0)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Setup fee collection rate | >80% of starts complete payment | Stripe data |
| Time to first transcript | <48 hours from setup complete | GHL timestamp |
| Self-service purchase rate | >30% of sales | No sales call tag |
| Transcript demo engagement | >60% scroll depth on homepage | Analytics |
| Mode upgrade rate | >20% within 90 days | GHL pipeline |

---

## 20. Compliance & Legal

### 20.1 Legal Pages (Standard Language)

All EverIntent properties must include these five legal pages:

| Page | Route | Purpose |
|------|-------|---------|
| Privacy Policy | `/legal/privacy` | Data collection, usage, sharing, rights |
| Terms of Service | `/legal/terms` | Service agreement, payments, refunds, liability |
| Cookie Policy | `/legal/cookies` | Cookie usage, categories, opt-out |
| Data Rights Request | `/legal/data-request` | CCPA/DSAR submission form |
| Accessibility Statement | `/legal/accessibility-statement` | ADA/WCAG compliance commitment |

### 20.2 TCPA Consent Language

```
By providing your phone number and checking this box, you consent to 
receive calls, text messages, and emails from EverIntent and its 
partners regarding your inquiry. Message and data rates may apply. 
You may opt out at any time by replying STOP.
```

### 20.3 California Bot Disclosure (AI Calling)

```
"Hi [Name], this is [AI Name], an AI assistant from EverIntent. 
I'm an automated system calling to [purpose]. 
Is this a good time to chat for 2 minutes?"
```

### 20.4 Data Sale Policy

**EverIntent does not sell personal data.** This applies to:
- Customer information collected during checkout or service delivery
- Lead information from marketing forms
- Any other personal information we collect

This policy is disclosed in our Privacy Policy and honored in all CCPA requests.

---

## 21. Partner Program

The EverIntent Partner Program enables web designers, digital marketing agencies, and service professionals to earn commissions by referring clients to EverIntent services.

### 21.1 Program Overview

**Program Name:** EverIntent Partners  
**URL:** `/partners`  
**Target Audience:**
- Freelance web designers who don't offer ongoing maintenance
- Digital marketing agencies needing white-label website fulfillment
- Business consultants who recommend digital solutions
- IT service providers with SMB clients
- Accountants, bookkeepers, and business advisors

**Value Proposition:** "Refer clients to EverIntent. Earn commissions. Keep your clients happy."

### 21.2 Commission Structure — DEFERRED

> **Status:** DEFERRED (Post-MVP)  
> **Reason:** Partner program not in v35.1 scope.

**Concept:** Referral commissions for agencies, consultants, and web designers.

**Payment Terms:**
- Minimum payout threshold: $50
- Payment frequency: Monthly (NET-30 after sale closes)
- Payment methods: PayPal, direct deposit, or account credit

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
│  Craigslist     everintent.com   go.everintent   app.ever   │
│  Facebook                        .com             intent.com│
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
│ Vercel Pro    │   │               │   │ Elementor     │
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
- Smart Website T2-T4 customers get number matching their business area code
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

### AI Employee Setup SOP (v35.0)

**Day 0: Payment Confirmed**
1. Tag applied in GHL
2. Intake form triggered
3. Provisioning task created

**Day 1: Configuration**
1. Clone Voice AI agent template
2. Configure per-DID Control Workflow
3. Provision AI DID
4. Set mode rules

**Day 2: Testing**
1. Test call routing
2. Test SMS recovery
3. Validate transcript capture
4. Owner walkthrough call

**Day 3: Go Live**
1. Activate production routing
2. Send go-live confirmation
3. Add to monitoring dashboard

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

**GHL Configuration:**
- [ ] Enable SaaS Mode
- [ ] Connect Stripe
- [ ] Create T1 plan + snapshot
- [ ] Configure checkout branding
- [ ] Create intake form
- [ ] Create welcome email template
- [ ] Create onboarding workflow

### Phase 2: AI Employee MVP (Week 2-3)

See Task 3.5 Definition (Section 28) for detailed phases.

### Phase 3: Full Checkout (Week 4)

**Marketing Site:**
- [ ] /checkout/smart-lead
- [ ] /checkout/smart-business
- [ ] /checkout/smart-growth
- [ ] Portfolio page

**GHL:**
- [ ] T2, T3, T4 plans + snapshots
- [ ] Usage rebilling configured
- [ ] Upgrade workflows

### Phase 4: Go Live (Week 5)

**Ads:**
- [ ] Craigslist ads (Phoenix first)
- [ ] Test checkout flow end-to-end
- [ ] Monitor first 10 purchases

---

## 27. Open Questions

### Resolved in v35.1

| Question | Decision |
|----------|----------|
| AI Employee architecture | Single execution engine with mode-based rule profiles |
| MVP navigation | Simplified to 5 links + CTA, no dropdowns |
| Checkout flow | Marketing site → go.everintent.com (GHL) → app.everintent.com (portal) |
| Setup fees | M1-M3: $997, M4: $1,497, M5: $2,500 |
| Multi-mode discount | 15% monthly when 2+ modes purchased |
| Tier naming | Smart Site, Smart Lead, Smart Business, Smart Growth (finalized v35.1) |
| LocalPros | KILLED — removed from scope entirely |

### Still Open

1. **Checkout subdomain:** `go.everintent.com` (preferred) vs staging subdomain
2. **Wallet initial funding:** Start at $0 with auto-recharge prompt vs pre-fund at signup

---

## 28. Document History

| Version | Date | Changes |
|---------|------|---------|
| v36.11 | 2026-02-18 | D5 P2: All admin page imports converted to React.lazy() in routes.tsx and 6 module index files. Suspense fallback added to AdminLayout. Admin code (framer-motion, CRUD UI, module pages) excluded from public bundle. |
| v36.10 | 2026-02-18 | D1 update: Space Grotesk font reduced from 4 weights to 700-only. ~60-90KB font download savings. Inter unchanged (4 weights all in use). |
| v36.9 | 2026-02-18 | D6: Converted 4 images JPG→WebP (q40, 1280w). hero-background 188KB→39KB, la-skyline-sunset 368KB→78KB, oc-coastline-sunset 351KB→68KB, local-business-cityscape 292KB→55KB. Total 80% reduction. |
| v36.8 | 2026-02-18 | D5 P0: Removed 5 dead UI component files and 5 unused npm deps. Repo cleanup only — 0KB bundle impact (Vite already tree-shook unreachable files). Performance score unchanged at 64. |
| v36.7 | 2026-02-18 | Core Web Vitals & PageSpeed optimization: Non-render-blocking font loading (D1), LCP fetchPriority (D2), descriptive link text enforcement (D3), 44px touch targets (D4). JS bundle splitting (D5) and image format optimization (D6) documented as OPEN. Favicon simplified (D7). Accessibility 96→100, SEO 92→100. Performance remains 64 pending D5/D6. |
| v36.6 | 2026-02-16 | Body staleness banner: §4-§15 formally marked as pre-v36.0. Brand Pivot Notice updated with v36.0 tier names. Audit items A2, A3, C4, C13, N6 resolved. |
| v36.5 | 2026-02-16 | Sitemap and navigation spec update: §16 sitemap reflects all current routes (checkout, locations, compare, add-ons, FAQ, help, support, accessibility). §17.1 header nav updated to v36 product names. §17.2 footer updated to 5-column structure with Legal column. |
| v36.4 | 2026-02-16 | Pricing alignment: Capture/Convert/Scale setup = $0 per §A3. Web Chat setup = $497 per §A2. Social Autopilot = $97/mo. Email Authority included in Scale tier. |
| v36.3 | 2026-02-16 | GHL Tag Registry consolidation. Canonical format: ei: {category} - {value}. Eliminated en-dash/hyphen split. Deprecated M1-M5 tags and old tier names. Added affiliate, form, lifecycle, source categories. See docs/GHL-TAG-REGISTRY.md. |
| v36.2 | 2026-02-15 | P0 site-wide audit fixes: Full AI Employee content deduplication, consolidated to single feature section per product page. |
| v36.1 | 2026-02-15 | Warmy tier reassignment: bundled free with Scale ($297/mo) instead of Capture. Standalone $49/mo. Naming convention standardized. |
| v36.0 | 2026-02-15 | GTM trust & revenue fixes: Tier naming sync (Smart Site→Launch, Smart Lead→Capture, Smart Business→Convert, Smart Growth→Scale). AI Employee consolidated from 5 modes to 3 plans. Setup fee and pricing amendments (§A1-§A4). |
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
| v31 | Dec 13 | Tech stack update: Vite + React (pre-rendered) replaces Next.js |
| v32 | Dec 13 | Domain Integration Architecture; Industry Expansion: 4 hubs, 65+ verticals |
| v32.1-v32.11 | Dec 13-18 | Various fixes and additions (see detailed changelog below) |
| v33.0 | Dec 20 | Product-First Restructure: Smart Launch, SmartStart Session, product-category pages |
| v33.1 | Dec 20 | Footer Restructure: Products + Packages columns |
| v33.2 | Dec 20 | Design System Overhaul: Award-winning agency patterns |
| **v34.0** | **Dec 21** | **Brand Pivot to EverIntent Master Brand** |
| **v35.0** | **Dec 26** | **AI Employee MVP Integration**: Anchor statement, product definition, platform object model, MVP canonical scope, simplified MVP navigation, Task 3.5 definition, TVC methodology |
| **v35.1** | **Jan 25** | **Smart Lead + Digital Donut**: Added Smart Lead flagship tier, Web Chat Only, Warmy Booster, Digital Donut outbound strategy, updated AI Employee pricing (M1-M3 $997/$497, M4 $1,497/$547, M5 $2,500/$597), **KILLED LocalPros**, renamed GHL tags from SS: to EI: prefix |

### Related Specification Documents

| Document | Path | Description |
|----------|------|-------------|
| **Brand Pivot Plan** | `docs/everintent-pivot-plan.md` | Complete brand pivot specification |
| **AI Employee Product Spec** | `docs/AI-Employee-Product-Spec.md` | Technical AI specifications |
| Careers Feature Spec | `docs/careers-spec.md` | Complete careers/jobs feature specification |
| Menu Structure Proposal | `docs/menu-structure-proposal.md` | Navigation changes and product structure |
| Market Research Alignment | `docs/chatgpt-research-alignment.md` | Synthesized market research |
| Persona Spec | `docs/persona-spec.md` | External and internal personas |

---

## 29. Task 3.5 — AI Employee MVP Definition

### Task 3.5 — AI Employee MVP Monetization & Checkout Readiness

**Status:** TODO  
**Priority:** BLOCKER  
**Depends On:** Task 3.0 (Theme System)

### Definition of Done

#### Phase 1: Platform Foundation
- [ ] Custom fields created in GHL
- [ ] Tags created per schema (Section 5.9)
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
- [ ] Navigation simplified to MVP structure (Section 17.1-17.4)

### Acceptance Criteria

1. All three canonical transcripts can be generated on demand
2. Self-service checkout flow completes end-to-end
3. GHL automation applies correct tags and triggers onboarding
4. Homepage displays real transcript proof
5. Pricing page enables purchase without sales call

### Implementation Notes

#### Code Changes Required

**Header.tsx:**
- Remove all `NavigationMenu` dropdown components
- Replace with 5 static `NavLink` components
- Keep mobile hamburger with simplified menu
- Rename "AI & Automation" to "AI Employee"

**Footer.tsx (v35.1 Update):**
- Restructure to 4 columns: Services, AI Modes, Resources, Company
- Services column: AI Employee, Smart Site, Smart Lead, Smart Business, Smart Growth, Web Chat Only, Warmy Booster
- AI Modes column: All 5 modes (M1-M5)
- Resources column: FAQ, Industries
- Company column: About, Contact, Careers, Privacy, Terms, Cookies
- Add external "Client Login" link

**routes.tsx:**
- Update `prerenderRoutes` to MVP-only list
- Add redirect logic for deferred routes

**routes.ts (config):**
- Export `mvpRoutes` array for navigation filtering

#### External Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| GHL checkout funnels | EverIntent | TODO |
| Stripe integration | EverIntent | TODO |
| go.everintent.com subdomain | EverIntent | TODO |
| app.everintent.com subdomain | EverIntent | TODO |

---

## Appendix A: PRD Build Order

For Lovable/builder reference, generate PRDs in this order:

1. homepage.md
2. smart-websites.md
3. pricing.md
4. let-ai-handle-it.md
5. about.md
6. contact.md
7. checkout/smart-site.md
8. checkout/smart-lead.md
9. checkout/smart-business.md
10. checkout/smart-growth.md
11. checkout/success.md
12. legal/privacy-policy.md
13. legal/terms-of-service.md
14. legal/data-request.md
15. admin/login.md
16. admin/submissions.md

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

### ei-t1-snapshot

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
    url: "https://everintent.com/pricing"
    target: "_blank"
  - label: "Support"
    url: "mailto:support@everintent.com"
```

### ei-t2-snapshot

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

### ei-t3-snapshot

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

### ei-t4-snapshot

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
settings: true

consumables:
  sms_monthly: 1000
  ai_minutes_monthly: 100
  email_monthly: 5000

# Note: AI Voice is NOT included in T4 ($297/mo)
# AI Voice requires AI Employee add-on (M1-M5)
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

## Appendix F: Design System & Component Patterns

### F.0 Design Philosophy & Business Rationale

**Why Our Design Looks This Way:**

EverIntent's design is intentionally modeled after award-winning agency websites (SPINX Digital, Shape, Isadora Agency) that convert visitors into paying customers. The design decisions below are not arbitrary aesthetic choices—they're proven conversion patterns.

| Design Decision | Business Rationale | Research Source |
|-----------------|---------------------|-----------------|
| **Dark base with amber accent** | Premium positioning without alienating SMB buyers; dark conveys sophistication, amber signals action | SPINX Digital ($5-50K projects), in-house agency aesthetic |
| **Glassmorphic CTAs** | Creates depth and "floating" effect that draws eye to conversion points; higher click-through than flat buttons | Shape agency pattern; modern SaaS standard |
| **Animated underlines on nav** | Provides feedback without page reload; signals interactivity; reduces perceived friction | UX research on micro-interactions |
| **Mesh gradient backgrounds** | Adds visual interest without distraction; creates atmosphere that feels "designed" not "templated" | Isadora Agency; differentiates from DIY builders |
| **Space Grotesk headings** | Geometric sans-serif reads as modern/tech-forward; differentiates from Inter/default fonts | Contemporary agency standard |
| **Layered shadows** | Creates depth hierarchy; premium feel over flat shadows; guides visual flow | Material Design 3 principles |
| **Amber glow on hover** | Reward for interaction; signals clickability; creates "living" interface | Conversion optimization research |

**The Core Principle:** Every visual choice either builds trust or drives action. If it doesn't do one of these, it shouldn't exist.

### F.1 HSL Color Palette (EverIntent Design System)

```css
:root {
  /* Base colors */
  --background: 222 47% 7%;          /* Deep navy-slate */
  --foreground: 210 40% 98%;         /* Near white */
  
  /* Component colors */
  --card: 222 47% 9%;                /* Slightly lighter than bg */
  --card-foreground: 210 40% 98%;
  
  --popover: 222 47% 9%;
  --popover-foreground: 210 40% 98%;
  
  /* Brand colors */
  --primary: 222 47% 11%;            /* Dark navy for buttons */
  --primary-foreground: 210 40% 98%;
  
  --secondary: 217 33% 17%;          /* Muted navy */
  --secondary-foreground: 210 40% 98%;
  
  --muted: 217 33% 17%;
  --muted-foreground: 215 20% 65%;
  
  /* Accent - Electric Amber */
  --accent: 38 92% 50%;              /* Bold amber/gold */
  --accent-foreground: 222 47% 7%;   /* Dark text on amber */
  
  /* Semantic colors */
  --destructive: 0 63% 31%;
  --destructive-foreground: 210 40% 98%;
  
  --border: 217 33% 17%;
  --input: 217 33% 17%;
  --ring: 38 92% 50%;                /* Amber focus ring */
}
```

### F.2 Font Configuration

```css
/* In index.html <head> */
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

/* In index.css */
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Space Grotesk', system-ui, sans-serif;
}

/* Usage */
.font-display { font-family: var(--font-display); }
body { font-family: var(--font-sans); }
```

### F.3 Custom Utilities (index.css)

```css
/* Layered shadows for premium depth */
.shadow-layered {
  box-shadow: 
    0 1px 2px rgba(0,0,0,0.07),
    0 2px 4px rgba(0,0,0,0.07),
    0 4px 8px rgba(0,0,0,0.07),
    0 8px 16px rgba(0,0,0,0.07);
}

.shadow-layered-lg {
  box-shadow: 
    0 2px 4px rgba(0,0,0,0.1),
    0 4px 8px rgba(0,0,0,0.1),
    0 8px 16px rgba(0,0,0,0.1),
    0 16px 32px rgba(0,0,0,0.15);
}

/* Spring-like transitions */
.transition-spring {
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Background patterns */
.bg-mesh {
  background: 
    radial-gradient(at 40% 20%, hsl(var(--accent) / 0.1) 0px, transparent 50%),
    radial-gradient(at 80% 0%, hsl(var(--primary) / 0.15) 0px, transparent 50%),
    radial-gradient(at 0% 50%, hsl(var(--accent) / 0.05) 0px, transparent 50%);
}

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  opacity: 0.03;
}

/* Nav link with animated underline */
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

/* Footer link with slide-in bar */
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

### F.4 Social Share & OG Image Specification

**Primary OG Image:** `public/og-image.jpg` (1200×630)

**Canonical Brand Elements:**
| Element | Value | Notes |
|---------|-------|-------|
| "Ever" | #FFFFFF (white) | Bold weight, left-positioned |
| "Intent" | #A855F7 (vibrant purple) | Bold weight, right of "Ever" |
| Streak | Gradient from #A855F7 → #7878DD | Tapered line below wordmark |
| Tagline | "Web Design & Practical AI" | White, regular weight |
| Background | Deep indigo/navy (#0f1219 → #151a2e) | Neural network visualization overlay |

**⚠️ CRITICAL: AI Image Generation Constraint**

AI image generators (DALL-E, Midjourney, Flux, etc.) **CANNOT reliably render precise brand text**. They will:
- Misspell words
- Use wrong fonts
- Break letter spacing
- Apply incorrect colors

**Correct Workflow for OG Images:**
1. **Never** generate the logo text with AI
2. **Start with** a user-provided logo asset (screenshot from LogoRenderer, Figma export, etc.)
3. **Use AI image editing** to enhance the background around the existing logo
4. The image edit tool preserves the original logo while adding context (neural networks, gradients, particles)

**Example prompt for enhancement (NOT generation):**
> "Place this logo in a stunning dark indigo background with subtle glowing neural network patterns, flowing data streams, and elegant abstract AI visualization. Keep the logo crisp and centered."

**Reference:** The production OG image was created by taking the database-rendered logo (via LogoRenderer) and using AI image editing to add a premium indigo AI-themed backdrop with neural network patterns and geometric crystals.

---

## Appendix G: Phased Implementation Plan

This appendix documents the staggered implementation approach for design system, cookie consent, and GHL integration. Phases are ordered to isolate external API complexity and enable incremental progress.

### G.1 Phase Overview

| Phase | Scope | Dependencies | Components |
|-------|-------|--------------|------------|
| **Phase 1** | Design System + Footer + Mobile Navbar | None (frontend only) | index.css, tailwind.config.ts, Footer, MobileBottomBar |
| **Phase 2** | Cookie Consent | Phase 1 complete | CookieConsent, App.tsx integration |
| **Phase 3** | GHL v2 Integration | Phase 2 complete + GHL specs locked | ghlLoader, GHLChatWidget, DesktopChatButton, env vars |

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

### H.4 Verification Checklist

Before deploying, verify:

1. ✅ Build completes with `vite-react-ssg build` (no errors)
2. ✅ `view-source:` on production shows pre-rendered HTML content (not empty SPA shell)
3. ✅ No console hydration errors (#418, #423, or "Text content does not match")
4. ✅ Admin routes still work (SPA fallback via vercel.json)
5. ✅ Portal-based components (toasts, tooltips) function correctly after hydration

---

## Appendix I: Glossary (v35.0)

| Term | Definition |
|------|------------|
| AI Employee | Single execution engine providing phone/SMS/chat AI services |
| Mode | Rule-based behavior configuration of the AI Employee |
| DID | Direct Inward Dial — a phone number |
| TVC | Transcript-Validated Conversion methodology |
| GHL | GoHighLevel platform |
| Control Workflow | Per-DID automation that routes based on mode rules |
| Canonical Transcript | One of three proof artifacts (Missed Call, After-Hours, Front-Line) |

---

**END OF DOCUMENT**
