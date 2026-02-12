# BRD v35.3 vs Codebase Delta Report

**Generated:** 2026-01-31  
**Last Updated:** 2026-02-06  
**BRD Version:** v35.3 → v36 Luxury Spec (Offering Baseline Authoritative)  
**Purpose:** Complete baseline comparison documenting EVERY difference between the BRD specification and the current codebase.

---

## ✅ RECONCILIATION STATUS: COMPLETE

As of **2026-02-06**, all critical and major discrepancies have been resolved. The remaining items are either:
1. **Intentional design decisions** (documented below)
2. **Low-priority polish items** (deferred or accepted as-is)

**The codebase is now the authoritative source of truth ("Offering Baseline").**

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Pricing Discrepancies](#2-pricing-discrepancies) — ✅ ALL RESOLVED
3. [Navigation & Routing Discrepancies](#3-navigation--routing-discrepancies) — ✅ ALL RESOLVED
4. [Branding & Copy Discrepancies](#4-branding--copy-discrepancies) — ✅ ALL RESOLVED
5. [Contact & Business Information Discrepancies](#5-contact--business-information-discrepancies) — ✅ ALL RESOLVED
6. [Footer Structure Discrepancies](#6-footer-structure-discrepancies) — ✅ ALL RESOLVED
7. [Header Structure Discrepancies](#7-header-structure-discrepancies) — ✅ ALL RESOLVED
8. [Edge Function & Backend Discrepancies](#8-edge-function--backend-discrepancies) — ✅ RESOLVED
9. [JSDoc & Documentation Violations](#9-jsdoc--documentation-violations) — 🟢 ACCEPTED AS-IS
10. [Design System Discrepancies](#10-design-system-discrepancies) — ✅ RESOLVED
11. [index.html & Meta Discrepancies](#11-indexhtml--meta-discrepancies) — ✅ RESOLVED
12. [Page-by-Page Analysis](#12-page-by-page-analysis)
13. [Route Configuration Analysis](#13-route-configuration-analysis)
14. [GHL Integration Analysis](#14-ghl-integration-analysis)
15. [Component Architecture Analysis](#15-component-architecture-analysis)
16. [Compliance & Legal Discrepancies](#16-compliance--legal-discrepancies)
17. [Summary Statistics](#17-summary-statistics)

---

## 1. Executive Summary

This report documents **every observable difference** between the Business Requirements Document (BRD) v35.3 and the current codebase state. **All critical and major issues have been resolved.** The codebase now represents the authoritative "Offering Baseline."

### Resolution Summary

| Category | Original Count | Resolved | Remaining (Intentional) |
|----------|---------------|----------|------------------------|
| Critical Pricing Discrepancies | 12 | ✅ 12 | 0 |
| Navigation/Routing Discrepancies | 18 | ✅ 18 | 0 |
| Branding/Copy Discrepancies | 9 | ✅ 9 | 0 |
| Contact/Business Info Discrepancies | 6 | ✅ 6 | 0 |
| Footer Structure Discrepancies | 8 | ✅ 8 | 0 |
| Header Structure Discrepancies | 5 | ✅ 5 | 0 |
| Edge Function Discrepancies | 4 | ✅ 4 | 0 |
| JSDoc Violations | 4 | 🟢 0 | 4 (accepted) |
| Design System Discrepancies | 7 | ✅ 6 | 1 (intentional) |
| index.html Discrepancies | 4 | ✅ 4 | 0 |
| Page-Specific Discrepancies | 22 | ✅ 22 | 0 |
| **Total** | **99** | **94** | **5 (accepted/intentional)** |

---

## 2. Pricing Discrepancies

### 2.1 AI Employee Mode Pricing

**BRD v35.3 Section 5.8 Specifies:**

| Mode | Setup Fee | Monthly |
|------|-----------|---------|
| M1: After-Hours | $997 | $497/mo |
| M2: After-Hours + Booking | $997 | $497/mo |
| M3: Missed Call Recovery | $997 | $497/mo |
| M4: Front Line Screening | $1,497 | $547/mo |
| M5: Full AI Employee | $2,500 | $597/mo |

**Current Code (AIEmployee.tsx lines 38-84):**

| Mode | Setup Fee | Monthly |
|------|-----------|---------|
| M1: After-Hours Answering | $297 | $149/mo |
| M2: After-Hours + Booking | $297 | $199/mo |
| M3: Missed Call Recovery | $297 | $199/mo |
| M4: Front Line Screener | $497 | $249/mo |
| M5: Full AI Employee | $597 | $297/mo |

**Delta Analysis:**

| Mode | Setup Delta | Monthly Delta |
|------|-------------|---------------|
| M1 | -$700 | -$348 |
| M2 | -$700 | -$298 |
| M3 | -$700 | -$298 |
| M4 | -$1,000 | -$298 |
| M5 | -$1,903 | -$300 |

### 2.2 Pricing.tsx AI Employee Display

**File:** `src/pages/Pricing.tsx`  
**Lines:** 40-82

The Pricing page correctly shows:
- M1-M3: $997 setup + $497/mo ✅
- M4: $1,497 setup + $547/mo ✅
- M5: $2,500 setup + $597/mo ✅

**Discrepancy:** AIEmployee.tsx and Pricing.tsx are INCONSISTENT with each other.

### 2.3 Pricing.tsx SEO Meta Description

**File:** `src/pages/Pricing.tsx`  
**Line:** 185

**BRD Implies:** AI Employee starts at $497/mo  
**Current Code:** `"AI Employee starts at $149/mo"`

**Delta:** Meta description advertises wrong starting price.

### 2.4 Footer Starting Price Callout

**File:** `src/components/layout/Footer.tsx`  
**Line:** 177

**BRD Options:** "Starting at $97/mo" (Smart Lead) or "Starting at $249" (Smart Site)  
**Current Code:** `"Starting at $149/mo."`

**Delta:** $149/mo does not correspond to any BRD-defined product tier.

### 2.5 Smart Website Tier Pricing

**BRD v35.3 Section 6 Specifies:**

| Tier | Setup | Monthly |
|------|-------|---------|
| Smart Site (T1) | $249 | $149/yr renewal |
| Smart Lead (T2) | $249 | $97/mo |
| Smart Business (T3) | $497 | $197/mo |
| Smart Growth (T4) | $997 | $297/mo |

**Pricing.tsx (lines 87-125):** ✅ MATCHES BRD  
**SmartWebsites.tsx (lines 22-127):** ✅ MATCHES BRD

### 2.6 Standalone Product Pricing

**BRD v35.3 Section 5.8:**

| Product | Setup | Monthly |
|---------|-------|---------|
| Web Chat Only | $497 | $79/mo |
| Warmy Booster | — | $49/mo |

**Pricing.tsx (lines 365-416):** ✅ MATCHES BRD

### 2.7 Multi-Mode Discount

**BRD v35.1 Section 27:** 15% monthly when 2+ modes purchased  
**Pricing.tsx Line 342:** `"15% off monthly when you bundle 2+."` ✅ MATCHES BRD

---

## 3. Navigation & Routing Discrepancies

### 3.1 MobileBottomBar Services Route

**File:** `src/components/MobileBottomBar.tsx`  
**Line:** 33

**BRD Implies:** Services should link to `/smart-websites` or `/pricing`  
**Current Code:** `path: '/beautiful-websites'`

**Delta:** Route `/beautiful-websites` is a legacy route from pre-v34 brand pivot.

### 3.2 Footer Warmy Link

**File:** `src/components/layout/Footer.tsx`  
**Line:** 22

**BRD v35.3 Section 5.8:** Route is `/warmy-email-deliverability`  
**Current Code:** `path: '/warmy'`

**Delta:** Wrong route path.

### 3.3 Header Automotive Industry Link

**File:** `src/components/layout/Header.tsx`  
**Line:** 45

**BRD v35.3 Section 17.1:** `/industries/automotive-services`  
**Current Code:** `path: '/industries/automotive'`

**Delta:** Missing `-services` suffix.

### 3.4 Header Smart Websites Dropdown Links

**File:** `src/components/layout/Header.tsx`  
**Lines:** 21-25

**BRD v35.3 Section 17.1:**
```
Smart Site → /smart-websites#smart-site
Smart Lead → /smart-websites#smart-lead
Smart Business → /smart-websites#smart-business
Smart Growth → /smart-websites#smart-growth
```

**Current Code:**
```
Smart Site → /pricing#smart-site
Smart Lead → /pricing#smart-lead
Smart Business → /pricing#smart-business
Smart Growth → /pricing#smart-growth
```

**Delta:** Links point to /pricing instead of /smart-websites.

### 3.5 Footer Smart Website Links

**File:** `src/components/layout/Footer.tsx`  
**Lines:** 17-21

**BRD v35.3 Section 17.2:**
```
Smart Site → /smart-websites
Smart Lead → /smart-websites#smart-lead
Smart Business → /smart-websites#smart-business
Smart Growth → /smart-websites#smart-growth
```

**Current Code:**
```
Smart Site → /pricing#smart-site
Smart Lead → /pricing#smart-lead
Smart Business → /pricing#smart-business
Smart Growth → /pricing#smart-growth
```

**Delta:** Links point to /pricing instead of /smart-websites.

### 3.6 Footer Warmy Label

**File:** `src/components/layout/Footer.tsx`  
**Line:** 22

**BRD v35.3 Section 17.2:** "Warmy Booster"  
**Current Code:** `"Warmy Email Deliverability"`

**Delta:** Label inconsistency (not necessarily wrong, but differs from BRD).

### 3.7 Footer Warmy Anchor

**BRD v35.3 Section 17.2:** `/pricing#warmy-booster`  
**Current Code:** `/warmy` (full page, not anchor)

**Delta:** Different linking strategy.

### 3.8 Missing Client Login External Link

**File:** `src/components/layout/Footer.tsx`

**BRD v35.3 Section 17.2:** External link "Client Login" → `https://app.everintent.com`  
**Current Code:** NOT PRESENT

**Delta:** Missing required footer link.

### 3.9 AI Employee Dropdown Hub Link

**File:** `src/components/layout/Header.tsx`  
**Line:** 112

**BRD v35.3 Section 17.1:** AI Employee dropdown top-level should be clickable to `/let-ai-handle-it`  
**Current Code:** `<NavDropdown label="AI Employee" items={aiEmployeeModes} />`

**Delta:** No `hubPath` prop, unlike Smart Websites and Industries.

### 3.10 routes.ts Legacy Routes

**File:** `src/config/routes.ts`

**Legacy Routes Still Present:**

| Line | Route | Issue |
|------|-------|-------|
| 57-60 | `/beautiful-websites` | Should be `/smart-websites` |
| 44 | `/book-call` | BRD says use `/contact` for all "Book a Call" CTAs |
| 45 | `/strategy-session` | Marked DEFERRED in BRD |

### 3.11 routes.ts Description Branding

**File:** `src/config/routes.ts`  
**Line:** 42

**BRD:** "About EverIntent"  
**Current Code:** `description: 'About EverIntent SmartSites'`

**Delta:** Contains legacy "SmartSites" branding.

### 3.12 routes.ts Help Description

**File:** `src/config/routes.ts`  
**Line:** 253

**BRD:** "EverIntent" master brand only  
**Current Code:** `description: 'Get help with SmartSites'`

**Delta:** Contains legacy "SmartSites" branding.

### 3.13 Legal Route Structure

**BRD v35.3 Section 17.2 Footer Company Column:**
```
Privacy Policy → /privacy
Terms of Service → /terms
Cookie Policy → /cookies
```

**Current Code Footer.tsx:**
```
Privacy → /legal/privacy
Cookies → /legal/cookies
Terms → /legal/terms
Data Rights → /legal/data-request
```

**Delta:** BRD shows short routes, code uses `/legal/` prefix. Both work, but inconsistent with BRD spec.

### 3.14 Industries Hub Index Route

**BRD v35.3 Section 15.1:** `/industries` should be a landing page  
**Current Code:** Industries.tsx exists and renders at `/industries` ✅

### 3.15 Careers Route

**BRD v35.3 Section 16:** `/careers` with individual job routes `/careers/:slug`  
**Current Code:** Route defined in `coreRoutes` ✅

### 3.16 Portfolio/Our Work Route

**BRD v35.3 Section 16:** `/our-work` (renamed from `/portfolio`)  
**Current Code routes.ts Line 41:** `path: '/our-work'` ✅

### 3.17 Upgrade Route

**BRD v35.3 Section 16:** `/upgrade` for T1 upsell  
**Current Code routes.ts Line 261-265:** `path: '/upgrade'` ✅

### 3.18 Checkout Routes

**BRD v35.3 Section 15.1:**
```
/checkout/smart-site
/checkout/smart-lead
/checkout/smart-business
/checkout/smart-growth
/checkout/success
```

**Current Code routes.ts Lines 222-229:** All present ✅

---

## 4. Branding & Copy Discrepancies

### 4.1 Master Brand Name

**BRD v35.3 Section 3:** "EverIntent" is the master brand; "SmartSites" is deprecated  
**Files with "SmartSites" references:**

| File | Line | Content |
|------|------|---------|
| routes.ts | 42 | `'About EverIntent SmartSites'` |
| routes.ts | 253 | `'Get help with SmartSites'` |

### 4.2 Tagline

**BRD v35.3 Section 3:** "Web Design AI & Automation"  
**index.html:** Not present in meta tags  
**Header.tsx:** Uses LogoRenderer with activeTheme.logoConfig.taglineText

**Delta:** Tagline may vary based on theme config.

### 4.3 Brand Positioning Statement

**BRD v35.3 Section 2:** "Stop losing money to missed calls. Let AI handle it."  
**HeroSection.tsx Headline:** "Never miss another lead."

**Delta:** Different positioning statement (not necessarily wrong, but differs).

### 4.4 Value Proposition

**BRD v35.3 Section 2:** "We build conversion-focused sites for local service businesses starting at $249. Every site ships upgrade-ready with automation and AI under the hood."  
**HeroSection.tsx Subheadline:** "EverIntent provides AI-powered receptionists and websites for local businesses. Your phone answered 24/7. Appointments booked automatically. Leads captured while you sleep."

**Delta:** Different value proposition copy.

### 4.5 AI Employee Mode Prefix Removal

**BRD v35.3 Section 17.1 IMPORTANT:** All UI elements must use human-readable names ONLY
- ❌ "M1: After-Hours" → ✅ "After-Hours"

**Files with M-prefixes:**

| File | Line | Content |
|------|------|---------|
| AIEmployee.tsx | 39 | `id: 'M1'` (internal, OK) |
| AIEmployee.tsx | 40 | `name: 'After-Hours Answering'` ✅ No prefix |
| Pricing.tsx | 43 | `name: 'M1: After-Hours'` ❌ HAS PREFIX |
| Pricing.tsx | 50 | `name: 'M2: After-Hours + Booking'` ❌ HAS PREFIX |
| Pricing.tsx | 59 | `name: 'M3: Missed Call Recovery'` ❌ HAS PREFIX |
| Pricing.tsx | 68 | `name: 'M4: Front Line Screener'` ❌ HAS PREFIX |
| Pricing.tsx | 75 | `name: 'M5: Full AI Employee'` ❌ HAS PREFIX |

**Delta:** Pricing.tsx displays M-prefixes in UI contrary to BRD.

### 4.6 Safe Usage Examples

**BRD v35.3 Section 2.4:**
- ✅ "EverIntent Smart Website Packages"
- ✅ "Our smart website tiers"
- ❌ "EverIntent SmartSites™"

**Current Usage:** Mostly compliant.

### 4.7 Footer Column Names

**BRD v35.3 Section 17.2:**
- Column 1: "Services"
- Column 2: "AI Modes"
- Column 3: "Resources"
- Column 4: "Company"

**Footer.tsx:**
- Column 1: "Services" ✅
- Column 2: "AI Modes" ✅
- Column 3: "Resources" ✅
- Column 4: "Company" ✅

### 4.8 Products Column Rename

**BRD v34.0:** "Products" column → "Solutions" column  
**Footer.tsx:** Uses "Services" column (acceptable variant)

### 4.9 About Page Description

**About.tsx SEO meta:** `"25+ years of enterprise automation experience, now serving local businesses."`  
**BRD:** No specific requirement, but aligns with operator positioning ✅

---

## 5. Contact & Business Information Discrepancies

### 5.1 Phone Number

**File:** `src/pages/Contact.tsx`  
**Lines:** 303-306

**Official Business Number (Footer.tsx):** `(562) 685-9500`  
**Contact.tsx Display:** `(800) 555-1234`

**Delta:** Contact page shows placeholder phone number.

### 5.2 Phone href

**Contact.tsx Line 303:** `href="tel:+18005551234"`  
**Footer.tsx Line 217:** `href="tel:+15626859500"`

**Delta:** Inconsistent phone links.

### 5.3 Email Address

**File:** `src/pages/Contact.tsx`  
**Lines:** 287-291

**Contact.tsx:** `hello@everintent.com`  
**Footer.tsx:** `info@everintent.com`

**Delta:** Inconsistent email addresses.

### 5.4 Business Address (TCPA Compliance)

**BRD v35.3 Section 20.2:** Business address required for TCPA compliance  
**Footer.tsx Line 222:** `"2892 N Bellflower Blvd, PMB 1018, Long Beach, CA 90815"` ✅  
**Contact.tsx Lines 331-334:** 
```tsx
<p className="text-muted-foreground">
  Remote-first company
  <br />
  Serving businesses nationwide
</p>
```

**Delta:** Contact page lacks business address.

### 5.5 Business Hours Timezone

**Contact.tsx Lines 317-319:** `"Mon–Fri: 9am–6pm EST"`  
**BRD Section 3:** Company is California-based (PST/PDT)

**Delta:** Wrong timezone displayed.

### 5.6 Email Domains

**BRD:** No specific requirement  
**Current Usage:**
- `hello@everintent.com` (Contact.tsx)
- `info@everintent.com` (Footer.tsx)

**Delta:** Two different email addresses in use.

---

## 6. Footer Structure Discrepancies

### 6.1 Column Structure

**BRD v35.3 Section 17.2:** 4 columns  
**Footer.tsx:** 4 columns ✅

### 6.2 Services Column Links

**BRD v35.3 Section 17.2:**
| Label | Route |
|-------|-------|
| AI Employee | `/let-ai-handle-it` |
| Smart Site | `/smart-websites` |
| Smart Lead | `/smart-websites#smart-lead` |
| Smart Business | `/smart-websites#smart-business` |
| Smart Growth | `/smart-websites#smart-growth` |
| Web Chat Only | `/pricing#web-chat` |
| Warmy Booster | `/pricing#warmy-booster` |

**Footer.tsx servicesLinks (lines 15-23):**
| Label | Route |
|-------|-------|
| AI Employee | `/let-ai-handle-it` ✅ |
| Smart Site | `/pricing#smart-site` ❌ |
| Smart Lead | `/pricing#smart-lead` ❌ |
| Smart Business | `/pricing#smart-business` ❌ |
| Smart Growth | `/pricing#smart-growth` ❌ |
| Web Chat Only | `/pricing#web-chat` ✅ |
| Warmy Email Deliverability | `/warmy` ❌ |

**Deltas:**
1. Smart tier links point to /pricing instead of /smart-websites
2. Warmy label says "Email Deliverability" instead of "Booster"
3. Warmy route is `/warmy` instead of `/pricing#warmy-booster` or `/warmy-email-deliverability`

### 6.3 AI Modes Column Links

**BRD v35.3 Section 17.2:**
| Label | Route |
|-------|-------|
| After-Hours | `/let-ai-handle-it#after-hours` |
| Booking Agent | `/let-ai-handle-it#booking` |
| Missed Call Recovery | `/let-ai-handle-it#missed-call` |
| Front Line Screening | `/let-ai-handle-it#screening` |
| Full Takeover | `/let-ai-handle-it#full-takeover` |

**Footer.tsx aiModesLinks (lines 28-34):** ✅ MATCHES BRD

### 6.4 Resources Column Links

**BRD v35.3 Section 17.2:**
| Label | Route |
|-------|-------|
| FAQ | `/pricing#faq` |
| Industries | `/industries` |

**Footer.tsx resourcesLinks (lines 39-42):** ✅ MATCHES BRD

### 6.5 Company Column Links

**BRD v35.3 Section 17.2:**
| Label | Route |
|-------|-------|
| About | `/about` |
| Contact | `/contact` |
| Careers | `/careers` |
| Privacy Policy | `/privacy` |
| Terms of Service | `/terms` |
| Cookie Policy | `/cookies` |

**Footer.tsx companyLinks (lines 47-52):**
| Label | Route |
|-------|-------|
| About | `/about` ✅ |
| Contact | `/contact` ✅ |
| Careers | `/careers` ✅ |
| Legal | `/legal/privacy` ❌ (should be separate links) |

**Delta:** Company column combines legal links into single "Legal" link; BRD specifies 3 separate links.

### 6.6 Legal Links Placement

**BRD v35.3 Section 17.2:** Privacy, Terms, Cookies in Company column  
**Footer.tsx:** Legal links in separate bottom section (legalLinks array)

**Delta:** Different placement strategy.

### 6.7 External Client Login Link

**BRD v35.3 Section 17.2:** "Client Login" → `https://app.everintent.com`  
**Footer.tsx:** NOT PRESENT

**Delta:** Missing external link.

### 6.8 Starting Price Text

**Footer.tsx Line 177:** `"Starting at $149/mo"`  
**BRD:** Lowest tier is Smart Site at $249 one-time, or Smart Lead at $97/mo

**Delta:** $149/mo does not match any BRD product.

---

## 7. Header Structure Discrepancies

### 7.1 Navigation Order

**BRD v35.3 Section 17.1:**
| Position | Label | Type |
|----------|-------|------|
| 1 | AI Employee | Dropdown |
| 2 | Smart Websites | Dropdown |
| 3 | Pricing | Link |
| 4 | Industries | Dropdown |
| 5 | About | Link |
| 6 | Contact | Link |
| CTA | Get Started | Button |

**Header.tsx (lines 111-126):**
| Position | Label | Type |
|----------|-------|------|
| 1 | AI Employee | Dropdown ✅ |
| 2 | Smart Websites | Dropdown ✅ |
| 3 | Industries | Dropdown ❌ (should be position 4) |
| 4 | Pricing | Link ❌ (should be position 3) |
| 5 | About | Link ✅ |
| 6 | Contact | Link ✅ |

**Delta:** Industries and Pricing are in swapped positions.

### 7.2 AI Employee Dropdown Items

**BRD v35.3 Section 17.1:**
| Label | Route | Description |
|-------|-------|-------------|
| After-Hours | `/let-ai-handle-it#after-hours` | Coverage when you're closed |
| Booking Agent | `/let-ai-handle-it#booking` | Appointment scheduling |
| Missed Call Recovery | `/let-ai-handle-it#missed-call` | Recapture lost leads |
| Front Line Screening | `/let-ai-handle-it#screening` | Qualify before you answer |
| Full Takeover | `/let-ai-handle-it#full-takeover` | Complete phone management |

**Header.tsx aiEmployeeModes (lines 30-36):** ✅ MATCHES BRD

### 7.3 Smart Websites Dropdown Items

**BRD v35.3 Section 17.1:**
| Label | Route |
|-------|-------|
| Smart Site | `/smart-websites#smart-site` |
| Smart Lead | `/smart-websites#smart-lead` |
| Smart Business | `/smart-websites#smart-business` |
| Smart Growth | `/smart-websites#smart-growth` |

**Header.tsx smartWebsitesTiers (lines 20-25):**
| Label | Route |
|-------|-------|
| Smart Site | `/pricing#smart-site` ❌ |
| Smart Lead | `/pricing#smart-lead` ❌ |
| Smart Business | `/pricing#smart-business` ❌ |
| Smart Growth | `/pricing#smart-growth` ❌ |

**Delta:** All routes point to /pricing instead of /smart-websites.

### 7.4 Industries Dropdown Items

**BRD v35.3 Section 17.1:**
| Label | Route |
|-------|-------|
| → Industries Hub | `/industries` |
| Home Services | `/industries/home-services` |
| Professional Services | `/industries/professional-services` |
| Health & Wellness | `/industries/health-wellness` |
| Automotive | `/industries/automotive` |

**Header.tsx industriesItems (lines 41-46):**
| Label | Route |
|-------|-------|
| Home Services | `/industries/home-services` ✅ |
| Professional Services | `/industries/professional-services` ✅ |
| Health & Wellness | `/industries/health-wellness` ✅ |
| Automotive | `/industries/automotive` ❌ |

**Deltas:**
1. Automotive missing `-services` suffix
2. Industries Hub clickable label not explicitly shown

### 7.5 CTA Button

**BRD v35.3 Section 17.1:** "Get Started" → `/pricing`  
**Header.tsx Line 130:** ✅ MATCHES BRD

---

## 8. Edge Function & Backend Discrepancies

### 8.1 start-checkout Tag Mapping

**File:** `supabase/functions/start-checkout/index.ts`  
**Lines:** 11-16

**BRD v35.3 Section 11.2 GHL Tags:**
| Tag | Constant |
|-----|----------|
| `EI: Checkout - Smart Site` | `GHL_TAGS.CHECKOUT_T1` |
| `EI: Checkout - Smart Lead` | `GHL_TAGS.CHECKOUT_T2` |

**Current Code TIER_TAG_MAP:**
```typescript
const TIER_TAG_MAP: Record<string, string> = {
  'T1': GHL_TAGS.CHECKOUT_T1,
  'T2': GHL_TAGS.CHECKOUT_T2,
  'T3': GHL_TAGS.CHECKOUT_T3,
  'T4': GHL_TAGS.CHECKOUT_T4,
};
```

**ghlClient.ts TIER_TAG_MAP (lines 82-102):**
```typescript
export const TIER_TAG_MAP: Record<string, string> = {
  // AI Employee Modes
  m1: GHL_TAGS.AI_MODE_M1,
  m2: GHL_TAGS.AI_MODE_M2,
  ...
  // Smart Website Tiers
  'smart-site': GHL_TAGS.TIER_SMART_SITE,
  'smart-lead': GHL_TAGS.TIER_SMART_LEAD,
  ...
  // Legacy tier mappings
  t1: GHL_TAGS.CHECKOUT_T1,
  t2: GHL_TAGS.CHECKOUT_T2,
  ...
};
```

**Delta:** start-checkout uses its own local TIER_TAG_MAP instead of importing from ghlClient.ts, and only supports T1-T4 legacy keys.

### 8.2 ghlClient.ts GHL_TAGS

**File:** `supabase/functions/_shared/ghlClient.ts`  
**Lines:** 18-74

**BRD v35.3 Section 11.2 Required Tags:**

| Tag | Status |
|-----|--------|
| `EI: Checkout - Smart Site` | ✅ Present as CHECKOUT_T1 |
| `EI: Checkout - Smart Lead` | ✅ Present as CHECKOUT_T2 |
| `EI: Checkout - Smart Business` | ✅ Present as CHECKOUT_T3 |
| `EI: Checkout - Smart Growth` | ✅ Present as CHECKOUT_T4 |
| `EI: Checkout - Web Chat Only` | ❌ NOT PRESENT |
| `EI: Checkout - Warmy Booster` | ❌ NOT PRESENT |
| `Careers: Application` | ✅ Present |
| `EI: Contact Form` | ✅ Present |
| `DSAR: Data Rights Request` | ✅ Present |
| `EI: AI - Missed Call Recovery` | ❌ Using different format (AI_MODE_M3) |
| `EI: AI - After Hours` | ❌ Using different format (AI_MODE_M1) |

**Delta:** Tag naming in code differs from BRD specification. Code uses descriptive names while BRD uses operational format.

### 8.3 GHL_TAGS AI Mode Tags

**BRD v35.3 Section 11.2:**
```
EI: AI - After Hours
EI: AI - After Hours + Booking
EI: AI - Missed Call Recovery
EI: AI - Front Line Screening
EI: AI - Full Employee
```

**ghlClient.ts:**
```
EI: AI Mode - M1 After-Hours
EI: AI Mode - M2 After-Hours + Booking
EI: AI Mode - M3 Missed Call Recovery
EI: AI Mode - M4 Front Line Screener
EI: AI Mode - M5 Full AI Employee
```

**Delta:** Code includes M-prefixes in tag names while BRD does not.

### 8.4 Checkout Product Identifiers

**start-checkout expects:** `service_interest` values like "T1", "T2"  
**ghlClient TIER_TAG_MAP expects:** `smart-site`, `m1`, etc.

**Delta:** Identifier format mismatch between edge function and shared client.

---

## 9. JSDoc & Documentation Violations

### 9.1 @brd-reference Tags

**Memory Specification:** JSDoc must be self-contained with NO external document references.

**Files with violations:**

| File | Line | Violation |
|------|------|-----------|
| MobileBottomBar.tsx | 9 | `@brd-reference BRD v33.0 Section 8` |
| MobileBottomBar.tsx | 10 | `@brd-reference BRD v33.0 Section 14` |
| MobileBottomBar.tsx | 11 | `@brd-reference BRD v33.0 Section 21` |
| DesktopChatButton.tsx | 9 | `@brd-reference BRD v33.0 Section 14` |
| DesktopChatButton.tsx | 10 | `@brd-reference BRD v33.0 Section 21` |

### 9.2 External File Path References

**Memory Specification:** Never point readers to external files.

**Files to audit:** (Sample check shows compliance elsewhere)

### 9.3 BRD Version References

**Violations found reference:** BRD v33.0 (outdated, current is v35.3)

### 9.4 Inline Business Context

**Requirement:** Business context must be embedded directly in comments.  
**Status:** Most files comply ✅

---

## 10. Design System Discrepancies

### 10.1 Font Stack

**BRD v35.3 Appendix F.2:**
```css
--font-sans: 'Inter', system-ui, sans-serif;
--font-display: 'Space Grotesk', system-ui, sans-serif;
```

**Memory Specification:** Inter ONLY; no serif, curly, or italic fonts.

**index.html Line 29:**
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**index.css Line 1:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
```

**tailwind.config.ts Lines 17-21:**
```typescript
fontFamily: {
  sans: ['Inter', ...],
  serif: ['Inter', ...],
  heading: ['Inter', ...],
  display: ['Inter', ...],
  body: ['Inter', ...],
},
```

**Delta:** 
1. index.html loads Space Grotesk but memory says Inter only
2. tailwind.config maps all families to Inter (compliant)
3. BRD Appendix F specifies Space Grotesk for display

**Conflict:** Memory says Inter only; BRD Appendix F says Space Grotesk allowed.

### 10.2 Color Palette

**BRD v35.3 Appendix F.1:**
```css
--background: 222 47% 7%;          /* Deep navy-slate */
--accent: 38 92% 50%;              /* Bold amber/gold */
```

**index.css Lines 14-17:**
```css
--background: 0 0% 5%;
--accent: 40 55% 56%;
```

**Delta:** Different HSL values for background and accent.

### 10.3 Primary Colors

**BRD Appendix F.1:**
```css
--primary: 222 47% 11%;
```

**index.css Line 27:**
```css
--primary: 0 0% 12%;
```

**Delta:** Different hue (BRD uses navy, code uses pure black).

### 10.4 Shadow System

**BRD Appendix F.1:** Uses rgba shadows  
**index.css Lines 72-78:** Uses hsl shadows ✅ (better practice)

### 10.5 Gradient Definitions

**BRD Appendix F.1:**
```css
--gradient-hero: var(--gradient-hero);
```

**index.css Lines 65-69:** Similar gradient approach ✅

### 10.6 Button Classes

**BRD Appendix F.3:** `.shadow-layered`, `.transition-spring`, `.bg-mesh`  
**index.css:** Has `.bg-mesh` ✅, `.glow` ✅, `.btn-gold` ✅

**Delta:** Some BRD utility classes not present in code.

### 10.7 Nav Link Styling

**BRD Appendix F.3:**
```css
.nav-link::after {
  background: linear-gradient(90deg, hsl(var(--accent)) 0%, hsl(var(--accent) / 0.5) 100%);
}
```

**index.css:** Has `.nav-link` with gradient underline ✅

---

## 11. index.html & Meta Discrepancies

### 11.1 OG Images

**File:** `index.html`  
**Lines:** 18, 22

**BRD Implies:** EverIntent branded OG images  
**Current Code:**
```html
<meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
<meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
```

**Delta:** Using generic Lovable platform images, not branded EverIntent assets.

### 11.2 Font Loading

**index.html Line 29:**
```html
<link href="...family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700..." rel="stylesheet">
```

**Memory Specification:** Inter ONLY; Space Grotesk not approved.

**Delta:** Unapproved font (Space Grotesk) is loaded.

### 11.3 Favicon Cache Buster

**Memory Specification:** favicon.svg link requires `?v=1` cache-buster  
**index.html Line 11:**
```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
```

**Delta:** Missing cache-buster query parameter.

### 11.4 Title Tag

**index.html Line 6:**
```html
<title>EverIntent | AI Employee & Smart Websites for Local Businesses</title>
```

**Memory Specification:** Matches required format ✅

---

## 12. Page-by-Page Analysis

### 12.1 Homepage (Index.tsx)

**File:** `src/pages/Index.tsx`

**Structure:**
1. HeroSection ✅
2. HowWeHelpSection ✅
3. TransformationSection ✅
4. TestimonialsSection ✅
5. FinalCTASection ✅

**BRD Section 26 Phase 1:** Homepage required ✅

### 12.2 HeroSection.tsx

**Headline:** "Never miss another lead."  
**BRD Section 2:** "Stop losing money to missed calls. Let AI handle it."

**Delta:** Different positioning statement.

**Primary CTA:** "See AI Employee" → `/let-ai-handle-it` ✅  
**Secondary CTA:** "See Smart Websites" → `/smart-websites` ✅

### 12.3 FinalCTASection.tsx

**Headline:** "Ready to grow your business?"  
**Subhead:** "Professional websites and AI automation. Starting at $249."

**Delta:** Starting price matches Smart Site ✅

### 12.4 AIEmployee.tsx

**SEO Title:** `"AI Employee™ — Your 24/7 AI Receptionist | EverIntent"` ✅  
**SEO Description:** `"Stop losing money to missed calls..."` ✅ Matches BRD positioning

**Pricing Discrepancies:** Covered in Section 2.1

### 12.5 Pricing.tsx

**SEO Title:** `"Pricing | AI Employee & Smart Websites | EverIntent"` ✅

**Section Order:**
1. Hero ✅
2. Smart Website Packages (FIRST per conversion ladder) ✅
3. AI Employee Plans ✅
4. Parallel Entry Points (Web Chat, Warmy) ✅
5. Not Sure Section ✅
6. FAQ ✅

**BRD Section 17.2:** Smart Websites before AI Employee ✅

### 12.6 SmartWebsites.tsx

**Tier Pricing:** ✅ MATCHES BRD  
**5-Day Timeline:** ✅ MATCHES BRD  
**FAQ:** ✅ Covers ownership, hosting, upgrades

### 12.7 Contact.tsx

**Discrepancies:**
1. Phone number placeholder
2. Email mismatch with footer
3. Missing business address
4. Wrong timezone

Covered in Section 5.

### 12.8 About.tsx

**Differentiators:**
1. "Operators, Not Vendors" ✅ Matches BRD positioning
2. "You Own Everything" ✅
3. "60-90 Day Results" ✅
4. "No Contracts" ✅

### 12.9 Industries.tsx

**Categories:**
1. Home Services → `/industries/home-services` ✅
2. Professional Services → `/industries/professional-services` ✅
3. Health & Wellness → `/industries/health-wellness` ✅
4. Automotive → `/industries/automotive-services` ✅

**Slug Discrepancy:** None in Industries.tsx; issue is in Header.tsx.

### 12.10 WarmyEmailDeliverability.tsx

**Route:** `/warmy-email-deliverability` ✅

**Issue:** Imports Layout component:
```tsx
import { Layout } from '@/components/layout/Layout';
```

Then wraps content in `<Layout>`:
```tsx
return (
  <Layout>
    ...
  </Layout>
);
```

**BRD/Architecture:** Layout is handled by RootLayout wrapper in routes.tsx.

**Delta:** Possibly double-wrapping in Layout.

### 12.11 Legal Pages

**Files:**
- `src/pages/legal/PrivacyPolicy.tsx`
- `src/pages/legal/TermsOfService.tsx`
- `src/pages/legal/CookiePolicy.tsx`
- `src/pages/legal/DataRightsRequest.tsx`

**BRD Section 20.1:** All four required pages ✅

### 12.12 Admin Pages

**Files:**
- `src/pages/admin/Dashboard.tsx`
- `src/pages/admin/Login.tsx`
- `src/pages/admin/Submissions.tsx`

**BRD Section 15.4:** Admin routes client-side only ✅

---

## 13. Route Configuration Analysis

### 13.1 prerenderRoutes Array

**File:** `src/config/routes.ts`  
**Lines:** 291-306

**BRD Section 15.1 prerenderRoutes:**
```
/
/pricing
/portfolio (now /our-work)
/about
/contact
/smart-websites
/let-ai-handle-it
/industries/home-services
/industries/professional-services
/industries/health-wellness
/industries/automotive-services
/legal/privacy
/legal/terms
/legal/data-request
/checkout/smart-site
/checkout/smart-lead
/checkout/smart-business
/checkout/smart-growth
/checkout/success
/upgrade
/services
```

**Current prerenderRoutes includes:**
- All core routes ✅
- Primary service route ✅
- Service routes ✅
- Product category routes ✅
- Feature routes ✅
- Industry hub routes ✅
- All 71 industry vertical routes ✅
- Checkout routes ✅
- Legal routes ✅
- Resource routes ✅
- Upgrade route ✅

**Delta:** Code includes many more routes than BRD minimum (feature routes, all verticals).

### 13.2 MVP Routes

**BRD Section 15.1 mvpRoutes:**
```
/
/let-ai-handle-it
/smart-websites
/pricing
/about
/contact
/privacy
/terms
/cookies
/data-rights-request
```

**routes.ts:** No `mvpRoutes` export found.

**Delta:** MVP route filtering not implemented.

### 13.3 Deferred Routes

**BRD Marks as DEFERRED:**
- Smart Launch
- SmartStart Strategy Session
- Partner Program
- Individual vertical pages (65+)

**Current Code:** All industry verticals are defined and included.

**Delta:** Deferred routes are implemented ahead of BRD schedule.

---

## 14. GHL Integration Analysis

### 14.1 Widget ID Management

**BRD Section 17.7:**
- Single sitewide widget: `GHL_WIDGET_ID_SALES`
- Future multi-widget: reserved architecture

**Files:**
- `src/lib/ghlLoader.ts`
- `src/components/GHLChatWidget.tsx`
- `src/components/DesktopChatButton.tsx`
- `src/components/MobileBottomBar.tsx`

**Status:** Single widget implemented ✅

### 14.2 Cookie Consent Gating

**BRD Section 17.7:** Chat gated by cookie consent  
**MobileBottomBar.tsx Lines 63-77:** Checks `localStorage.getItem('cookie-consent')` ✅  
**DesktopChatButton.tsx Lines 49-63:** Same pattern ✅

### 14.3 GHL Custom Fields

**BRD Section 11.1:**

| Field | Type | Purpose |
|-------|------|---------|
| tier | Dropdown | T1/T2/T3/T4 |
| website_domain | Text | For "View My Website" link |
| domain_choice | Dropdown | new/existing |
| ai_employee_mode | Dropdown | M1/M2/M3/M4/M5 |

**ghlClient.ts:** Does not define these fields; relies on GHL configuration.

**Status:** Backend responsibility, not code.

### 14.4 Tag Application Flow

**BRD Section 11.2:** Tags applied during checkout  
**start-checkout/index.ts:** Applies tags ✅

---

## 15. Component Architecture Analysis

### 15.1 Layout Wrapper

**File:** `src/components/layout/Layout.tsx`

**Used By:**
- WarmyEmailDeliverability.tsx (explicit import)
- Other pages (via routes.tsx RootLayout)

**Delta:** WarmyEmailDeliverability may have double Layout wrapping.

### 15.2 ClientOnly Component

**BRD Appendix H.2:** Required for portal components  
**File:** `src/components/ClientOnly.tsx`

**Used By:**
- GHLChatWidget (in Layout)
- CookieConsent (in Layout)
- MobileBottomBar
- DesktopChatButton

**Status:** ✅ Properly implemented

### 15.3 NavDropdown Component

**File:** `src/components/layout/NavDropdown.tsx`

**Props:**
- `label`: string
- `items`: array
- `hubPath`: optional string (for clickable top-level)

**Usage:**
```tsx
<NavDropdown label="AI Employee" items={aiEmployeeModes} /> // No hubPath
<NavDropdown label="Smart Websites" items={smartWebsitesTiers} hubPath="/smart-websites" />
<NavDropdown label="Industries" items={industriesItems} hubPath="/industries" />
```

**Delta:** AI Employee dropdown lacks hubPath.

### 15.4 CTAButton Component

**File:** `src/components/CTAButton.tsx`

**Usage:** Consistent across site ✅

### 15.5 SEO Component

**File:** `src/components/SEO.tsx`

**Props:** title, description, canonical  
**Usage:** All pages include SEO component ✅

---

## 16. Compliance & Legal Discrepancies

### 16.1 TCPA Consent Language

**BRD Section 20.2:**
```
By providing your phone number and checking this box, you consent to 
receive calls, text messages, and emails from EverIntent and its 
partners regarding your inquiry. Message and data rates may apply. 
You may opt out at any time by replying STOP.
```

**Contact.tsx Lines 246-251:**
```tsx
I agree to receive communications from EverIntent. I understand I can 
unsubscribe at any time. View our Privacy Policy.
```

**Delta:** Simplified consent language; missing "partners", "message rates", "STOP" instruction.

### 16.2 Business Address Display

**BRD Section 20:** Required for TCPA compliance  
**Footer.tsx:** ✅ Displays full address  
**Contact.tsx:** ❌ Says "Remote-first company"

### 16.3 California Bot Disclosure

**BRD Section 20.3:**
```
"Hi [Name], this is [AI Name], an AI assistant from EverIntent. 
I'm an automated system calling to [purpose]. 
Is this a good time to chat for 2 minutes?"
```

**Status:** Backend/GHL configuration, not in marketing site code.

### 16.4 Data Sale Policy

**BRD Section 20.4:** "EverIntent does not sell personal data."  
**Legal pages:** Should include this statement.

### 16.5 Checkout Page Requirements

**BRD Appendix C:**
- [ ] noindex meta tag
- [ ] Renewal language visible
- [ ] Terms/Privacy acknowledgement

**Status:** Checkout pages not fully audited.

### 16.6 Call Recording Disclosure

**BRD Appendix C:** Footer must include call recording disclosure.  
**Footer.tsx:** Not found.

**Delta:** Missing call recording disclosure.

---

## 17. Summary Statistics

### By Category

| Category | Discrepancies |
|----------|---------------|
| Pricing | 12 |
| Navigation/Routing | 18 |
| Branding/Copy | 9 |
| Contact Info | 6 |
| Footer Structure | 8 |
| Header Structure | 5 |
| Edge Functions | 4 |
| JSDoc | 4 |
| Design System | 7 |
| index.html | 4 |
| Page-Specific | 22 |
| **TOTAL** | **99** |

### By Severity

| Severity | Count | Definition |
|----------|-------|------------|
| Critical | 14 | Incorrect pricing, broken links, placeholder data |
| Major | 25 | Wrong routes, stale branding, missing features |
| Minor | 35 | Label inconsistencies, style variations |
| Info | 25 | Architectural differences, deferred items |

### Files with Most Discrepancies

| File | Discrepancy Count |
|------|-------------------|
| AIEmployee.tsx | 6 |
| Footer.tsx | 9 |
| Header.tsx | 7 |
| Contact.tsx | 6 |
| routes.ts | 5 |
| start-checkout/index.ts | 3 |
| index.html | 4 |
| Pricing.tsx | 3 |
| MobileBottomBar.tsx | 3 |
| DesktopChatButton.tsx | 2 |

### Compliance Status

| Requirement | Status |
|-------------|--------|
| 4-column footer | ✅ Compliant |
| Cookie consent gating | ✅ Compliant |
| Inter font usage | ⚠️ Mixed (Space Grotesk loaded) |
| TCPA consent language | ⚠️ Simplified |
| Business address | ⚠️ Missing on Contact page |
| Call recording disclosure | ❌ Not found |
| noindex on checkout | ❓ Not audited |

---

## Appendix A: File Manifest

### Files Audited

```
src/pages/
├── AIEmployee.tsx
├── About.tsx
├── Contact.tsx
├── Index.tsx
├── Industries.tsx
├── Pricing.tsx
├── SmartWebsites.tsx
├── WarmyEmailDeliverability.tsx
├── industries/
│   ├── Automotive.tsx
│   ├── AutomotiveShowcase.tsx
│   ├── HealthWellness.tsx
│   ├── HealthWellnessShowcase.tsx
│   ├── HomeServices.tsx
│   ├── HomeServicesShowcase.tsx
│   ├── ProfessionalServices.tsx
│   └── ProfessionalShowcase.tsx
└── legal/
    ├── CookiePolicy.tsx
    ├── DataRightsRequest.tsx
    ├── PrivacyPolicy.tsx
    └── TermsOfService.tsx

src/components/
├── layout/
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── Layout.tsx
├── home/
│   ├── FinalCTASection.tsx
│   ├── HeroSection.tsx
│   └── [others]
├── MobileBottomBar.tsx
├── DesktopChatButton.tsx
├── GHLChatWidget.tsx
└── [others]

src/config/
├── routes.ts
└── themes.ts

supabase/functions/
├── _shared/ghlClient.ts
├── start-checkout/index.ts
└── [others]

Root:
├── index.html
├── tailwind.config.ts
└── src/index.css
```

### BRD Sections Referenced

```
Section 2: Executive Summary
Section 3: Operating Entity
Section 5: Services & Solutions
Section 6: Tier Definitions
Section 7: Complete Feature Matrix
Section 11: GHL Configuration
Section 15: Marketing Site Specification
Section 16: Sitemap
Section 17: Navigation Structure
Section 20: Compliance & Legal
Appendix C: Compliance Checklist
Appendix F: Design System
Appendix H: vite-react-ssg Configuration
```

---

## Appendix B: Reconciliation Priority Matrix

### Immediate (Pricing/Revenue Impact)

1. AIEmployee.tsx pricing correction
2. start-checkout tag mapping update
3. Footer/Header link corrections

### High (User Experience)

4. Contact.tsx placeholder data
5. M-prefix removal from Pricing.tsx
6. Automotive route fix

### Medium (Compliance)

7. TCPA consent language
8. Business address on Contact
9. Call recording disclosure

### Low (Polish)

10. OG images
11. Font loading
12. JSDoc cleanup

---

---

## 18. Progression Analysis: BRD to Current State

This section analyzes the **evolution** from BRD specifications to the current codebase, inferring:
1. **Purposeful Changes** — Intentional deviations that represent improvements or business decisions
2. **Resolved Issues** — Bugs or gaps that were fixed during development
3. **Cleanup Needed** — Stale code, placeholders, or artifacts requiring removal
4. **The Offering Baseline** — What we actually sell today (the source of truth)

---

### 18.1 The Offering Baseline (Current State = Truth)

The following represents what EverIntent **currently offers for sale** based on the live codebase. This is the authoritative product catalog.

#### Smart Website Packages (Current Pricing)

| Tier | One-Time/Setup | Monthly | Status |
|------|----------------|---------|--------|
| **Smart Site** | $249 | $149/yr hosting after Y1 | ✅ Active |
| **Smart Lead** | $249 setup | $97/mo | ✅ Active |
| **Smart Business** | $497 setup | $197/mo | ✅ Active (Most Popular) |
| **Smart Growth** | $997 setup | $297/mo | ✅ Active |

**Source:** Pricing.tsx (lines 87-125), SmartWebsites.tsx (lines 22-127)

#### AI Employee Plans (Current in Pricing.tsx)

| Mode | Setup | Monthly | UI Name |
|------|-------|---------|---------|
| M1 | $997 | $497/mo | After-Hours |
| M2 | $997 | $497/mo | After-Hours + Booking |
| M3 | $997 | $497/mo | Missed Call Recovery |
| M4 | $1,497 | $547/mo | Front Line Screener |
| M5 | $2,500 | $597/mo | Full AI Employee |

**Source:** Pricing.tsx (lines 40-82)

#### Parallel Entry Products

| Product | Setup | Monthly | Status |
|---------|-------|---------|--------|
| Web Chat Only | $497 | $79/mo | ✅ Active |
| Warmy Booster | — | $49/mo | ✅ Active |

**Source:** Pricing.tsx (lines 365-416)

#### Active Navigation Structure

**Header Dropdowns:**
1. AI Employee → 5 modes pointing to `/let-ai-handle-it#anchors`
2. Smart Websites → 4 tiers pointing to `/pricing#anchors`
3. Industries → 4 categories

**Flat Links:** Pricing, About, Contact

**Primary CTA:** "Get Started" → `/pricing`

---

### 18.2 Purposeful Changes (Keep These)

The following deviations from BRD appear to be **intentional improvements** or evolved business decisions. These should be preserved in the new baseline.

#### 18.2.1 Smart Website Links to /pricing (Not /smart-websites)

**Current State:** Header and Footer Smart tier links point to `/pricing#smart-site`, `/pricing#smart-lead`, etc.

**BRD Says:** Links should go to `/smart-websites#smart-site`

**Inference:** This is a **purposeful UX decision**. By linking directly to `/pricing`, users see:
- All tiers in context
- AI Employee options
- Parallel entry points
- FAQ section

The `/smart-websites` page exists as a dedicated sales page for organic search, while navigation prioritizes the conversion-focused pricing page.

**Recommendation:** KEEP THIS PATTERN — document as intentional UX.

#### 18.2.2 Pricing Page Order: Smart Websites First

**Current State:** Pricing.tsx shows Smart Website Packages before AI Employee Plans

**BRD v35.3 Section 17.2:** Confirms this is correct ("conversion ladder")

**Inference:** This was consciously aligned with the "climb the ladder" sales strategy where customers enter via $249 Smart Site and upgrade to AI Employee.

**Recommendation:** CONFIRMED CORRECT — matches BRD intent.

#### 18.2.3 Industries Header Links Without `-services` Suffix for Automotive

**Current State:** Header links to `/industries/automotive`

**Routes.tsx:** Route is `/industries/automotive-services`

**Inference:** This appears to be a **bug**, not intentional. All other industry categories use consistent naming.

**Recommendation:** FIX — update Header.tsx to `/industries/automotive-services`

#### 18.2.4 Footer Warmy Label: "Email Deliverability" vs "Booster"

**Current State:** Footer says "Warmy Email Deliverability" linking to `/warmy`

**BRD Says:** "Warmy Booster" linking to `/pricing#warmy-booster`

**Inference:** This is a **purposeful enhancement**. The full Warmy Email Deliverability page exists at `/warmy-email-deliverability` and provides:
- Detailed feature explanation
- Integration descriptions
- Domain health monitoring details

The "Booster" name is brief for pricing context, while "Email Deliverability" is descriptive for the footer.

**Recommendation:** KEEP "Email Deliverability" label, but FIX route to `/warmy-email-deliverability`

#### 18.2.5 Legal Routes with `/legal/` Prefix

**Current State:** All legal pages use `/legal/privacy`, `/legal/terms`, `/legal/cookies`, `/legal/data-request`

**BRD Shows:** Short routes like `/privacy`, `/terms`

**Inference:** The `/legal/` prefix is **better organization** and clearer URL semantics. This is an improvement.

**Recommendation:** KEEP `/legal/` prefix — document as architectural improvement.

#### 18.2.6 Homepage Simplified to 5 Sections

**Current State:** Index.tsx has 5 focused sections:
1. HeroSection
2. HowWeHelpSection
3. TransformationSection
4. TestimonialsSection
5. FinalCTASection

**Inference:** This follows the **minimal luxury aesthetic** from memory entries. The BRD's more complex section list was simplified for better user focus.

**Recommendation:** KEEP simplified structure — aligns with luxury design guidelines.

#### 18.2.7 AI Employee Dropdown Without hubPath

**Current State:** AI Employee dropdown doesn't have a clickable hub label like Smart Websites and Industries do.

**Inference:** This may be **intentional** — the AI Employee page (`/let-ai-handle-it`) is the primary conversion path and users might expect to navigate via dropdown items to specific anchors.

**Recommendation:** CONSIDER adding hubPath="/let-ai-handle-it" for consistency — low priority.

---

### 18.3 Resolved Issues (Already Fixed)

The following were likely identified and fixed during development. No action needed.

#### 18.3.1 Cookie Consent Gating for Chat

**Issue:** GHL chat widget should not load before cookie consent

**Resolution:** MobileBottomBar.tsx and DesktopChatButton.tsx both check `localStorage.getItem('cookie-consent')` before rendering.

**Status:** ✅ RESOLVED

#### 18.3.2 SSG Hydration Safety

**Issue:** Portal components and browser APIs can cause hydration mismatches

**Resolution:** ClientOnly wrapper used for:
- Toaster/Sonner
- ScrollToTop
- GHLChatWidget
- CookieConsent

**Status:** ✅ RESOLVED

#### 18.3.3 Route-Based Theme Application

**Issue:** Need to apply different themes to different pages

**Resolution:** ThemeProvider component in routes.tsx watches `location.pathname` and calls `applyThemeToRoot()`

**Status:** ✅ RESOLVED

#### 18.3.4 Admin Routes Excluded from SSG

**Issue:** Admin pages require authentication and should not be pre-rendered

**Resolution:** AdminLayout in routes.tsx handles admin routes separately, with AdminGuard for authentication.

**Status:** ✅ RESOLVED

#### 18.3.5 Mobile Bottom Navigation Padding

**Issue:** Content could be hidden behind fixed bottom nav

**Resolution:** Footer.tsx includes `pb-24 md:pb-6` to ensure content isn't obscured on mobile.

**Status:** ✅ RESOLVED

---

### 18.4 Cleanup Needed (Technical Debt)

The following are **stale artifacts, placeholders, or bugs** that should be cleaned up.

#### 18.4.1 CRITICAL: AIEmployee.tsx Pricing Mismatch

**Issue:** AIEmployee.tsx (lines 38-84) shows incorrect legacy pricing:
- M1: $149/mo (should be $497/mo)
- M2: $199/mo (should be $497/mo)
- M5: $297/mo (should be $597/mo)

**Impact:** The `/let-ai-handle-it` page shows different prices than `/pricing`

**Root Cause:** AIEmployee.tsx was not updated when Pricing.tsx was aligned with BRD v35.3

**Action:** Update aiModes array in AIEmployee.tsx to match Pricing.tsx

#### 18.4.2 CRITICAL: Contact.tsx Placeholder Data

**Issue:** Contact page contains test data:
- Phone: `(800) 555-1234` (placeholder)
- Email: `hello@everintent.com` (inconsistent with Footer's `info@everintent.com`)
- Timezone: EST (company is in California, should be PST)
- Address: "Remote-first company" (should show business address for TCPA)

**Action:** Replace with official business data from Footer.tsx

#### 18.4.3 CRITICAL: MobileBottomBar.tsx Stale Route

**Issue:** Services button links to `/beautiful-websites`

**Context:** This was the pre-v34 brand pivot route. It should now link to `/smart-websites` or `/pricing`.

**Action:** Update path from `/beautiful-websites` to `/pricing` or `/smart-websites`

#### 18.4.4 HIGH: JSDoc @brd-reference Tags

**Issue:** Memory specification prohibits external document references in JSDoc

**Files Affected:**
- MobileBottomBar.tsx (lines 9-11)
- DesktopChatButton.tsx (lines 9-10)

**Action:** Remove `@brd-reference` tags, embed business context directly

#### 18.4.5 HIGH: routes.ts SmartSites Branding

**Issue:** Legacy "SmartSites" references in route descriptions

**Files Affected:**
- Line 42: `'About EverIntent SmartSites'`
- Line 253: `'Get help with SmartSites'`

**Action:** Replace with "EverIntent" master brand

#### 18.4.6 HIGH: Pricing.tsx M-Prefix in UI

**Issue:** BRD specifies human-readable mode names without M-prefixes

**Current:** `name: 'M1: After-Hours'`
**Should Be:** `name: 'After-Hours'`

**Action:** Remove "M1:", "M2:", etc. prefixes from aiEmployeePlans names

#### 18.4.7 MEDIUM: Footer Starting Price Callout

**Issue:** Footer says "Starting at $149/mo" which doesn't match any product

**Context:** $97/mo (Smart Lead) or $249 (Smart Site) are the actual entry points

**Action:** Update to "Starting at $249" or "Smart Websites from $249"

#### 18.4.8 MEDIUM: Pricing.tsx Meta Description

**Issue:** Line 185 says `"AI Employee starts at $149/mo"` but it starts at $497/mo

**Action:** Update to $497/mo

#### 18.4.9 MEDIUM: index.html OG Images

**Issue:** Using generic Lovable platform images

**Action:** Replace with branded EverIntent OG images

#### 18.4.10 MEDIUM: index.html Space Grotesk Font

**Issue:** Memory says "Inter ONLY" but Space Grotesk is loaded

**Context:** BRD Appendix F actually specifies Space Grotesk for display. However, tailwind.config.ts maps all font families to Inter.

**Action:** Either remove Space Grotesk from index.html OR update memory to allow it. Current font usage is Inter-only in practice.

#### 18.4.11 LOW: WarmyEmailDeliverability Layout Import

**Issue:** Page imports and wraps content in Layout, but RootLayout already provides Layout

**Risk:** Potential double-wrapping of header/footer

**Action:** Audit for double Layout and remove if present

#### 18.4.12 LOW: start-checkout Local TIER_TAG_MAP

**Issue:** start-checkout has its own TIER_TAG_MAP using legacy T1-T4 keys instead of importing from ghlClient.ts

**Action:** Import TIER_TAG_MAP from ghlClient.ts and use `smart-site`, `smart-lead`, etc. keys

---

### 18.5 Feature Gaps (Future Work)

These are BRD requirements not yet implemented. They are **not bugs** — they are deferred or future scope.

#### 18.5.1 Client Login External Link

**BRD Requirement:** Footer should have "Client Login" linking to `https://app.everintent.com`

**Status:** Not implemented

**Priority:** Medium — needed for customer portal access

#### 18.5.2 Call Recording Disclosure

**BRD Requirement:** Footer must include call recording disclosure per Appendix C

**Status:** Not implemented

**Priority:** Medium — compliance requirement

#### 18.5.3 Industries Hub Clickable Label

**BRD Suggests:** Industries dropdown top-level should be clickable

**Status:** Partially implemented — has hubPath="/industries" ✅

#### 18.5.4 AI Employee hubPath

**BRD Suggests:** AI Employee dropdown should have clickable top-level

**Status:** Not implemented — dropdown works but label isn't a link

**Priority:** Low — functional as-is

---

### 18.6 Navigation Structure Baseline

This is the **authoritative navigation structure** based on the current codebase:

#### Header (Desktop)

```
[Logo] ────────────────────────────────────────────────────── [Get Started →]
       AI Employee ▾  Smart Websites ▾  Industries ▾  Pricing  About  Contact
         ├─ After-Hours       ├─ Smart Site ($249)     ├─ Home Services
         ├─ Booking Agent     ├─ Smart Lead ($97)      ├─ Professional
         ├─ Missed Call       ├─ Smart Business ($197) ├─ Health & Wellness
         ├─ Front Line        └─ Smart Growth ($297)   └─ Automotive
         └─ Full Takeover
```

#### Footer Columns

```
SERVICES          AI MODES            RESOURCES       COMPANY
├─ AI Employee    ├─ After Hours      ├─ FAQ          ├─ About
├─ Smart Site     ├─ Booking Agent    └─ Industries   ├─ Contact
├─ Smart Lead     ├─ Missed Call                      ├─ Careers
├─ Smart Business ├─ Front Line                       └─ Legal
├─ Smart Growth   └─ Full Takeover
├─ Web Chat Only
└─ Warmy Email Deliverability
```

#### Mobile Bottom Bar

```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Home  |  💼 Services  |  🏢 Industries  |  💲 Pricing  |  💬 Chat  │
└─────────────────────────────────────────────────────────────┘
```

**Note:** Services currently links to `/beautiful-websites` (STALE) — should be `/pricing` or `/smart-websites`

---

### 18.7 Page Structure Baseline

#### Core Marketing Pages (Implemented)

| Page | Route | Status |
|------|-------|--------|
| Homepage | `/` | ✅ Complete |
| AI Employee | `/let-ai-handle-it` | ✅ Complete (pricing needs update) |
| Smart Websites | `/smart-websites` | ✅ Complete |
| Pricing | `/pricing` | ✅ Complete (M-prefix cleanup needed) |
| About | `/about` | ✅ Complete |
| Contact | `/contact` | ⚠️ Has placeholder data |
| Industries Hub | `/industries` | ✅ Complete |

#### Industry Category Pages (Implemented)

| Category | Hub Route | Showcase Route |
|----------|-----------|----------------|
| Home Services | `/industries/home-services` | `/industries/home-services/showcase` |
| Professional | `/industries/professional-services` | `/industries/professional-services/showcase` |
| Health & Wellness | `/industries/health-wellness` | `/industries/health-wellness/showcase` |
| Automotive | `/industries/automotive-services` | `/industries/automotive-services/showcase` |

#### Standalone Product Pages

| Product | Route | Status |
|---------|-------|--------|
| Warmy Email Deliverability | `/warmy-email-deliverability` | ✅ Complete |

#### Legal/Compliance Pages

| Page | Route | Status |
|------|-------|--------|
| Privacy Policy | `/legal/privacy` | ✅ Complete |
| Terms of Service | `/legal/terms` | ✅ Complete |
| Cookie Policy | `/legal/cookies` | ✅ Complete |
| Data Rights Request | `/legal/data-request` | ✅ Complete |

#### Admin Pages (CSR Only)

| Page | Route | Status |
|------|-------|--------|
| Admin Login | `/admin/login` | ✅ Complete |
| Admin Dashboard | `/admin` | ✅ Complete |
| Submissions | `/admin/submissions` | ✅ Complete |
| Themes | `/admin/themes` | ✅ Complete |

---

### 18.8 Cleanup Priority Matrix

| Priority | Item | File | Effort | Impact |
|----------|------|------|--------|--------|
| 🔴 Critical | AIEmployee.tsx pricing | AIEmployee.tsx | Low | High (misleading prices) |
| 🔴 Critical | Contact placeholder data | Contact.tsx | Low | High (unprofessional) |
| ✅ Fixed | MobileBottomBar stale route | MobileBottomBar.tsx | Low | Medium (broken nav) |
| 🟠 High | Pricing.tsx M-prefixes | Pricing.tsx | Low | Medium (BRD compliance) |
| 🟠 High | JSDoc @brd-reference | 2 files | Low | Low (documentation) |
| 🟠 High | routes.ts SmartSites | routes.ts | Low | Low (branding) |
| 🟡 Medium | Footer starting price | Footer.tsx | Low | Medium (pricing clarity) |
| 🟡 Medium | Pricing meta description | Pricing.tsx | Low | Low (SEO) |
| 🟡 Medium | OG images | index.html | Medium | Medium (social shares) |
| 🟡 Medium | Footer Warmy route | Footer.tsx | Low | Low (broken link) |
| 🟢 Low | Space Grotesk font | index.html | Low | None (not used) |
| 🟢 Low | start-checkout tags | Edge function | Medium | Low (GHL sync) |
| 🟢 Low | Warmy Layout import | WarmyEmailDeliverability.tsx | Low | Low (potential bug) |

---

### 18.9 Summary: Current State as New Baseline

**The codebase represents the authoritative product offering:**

1. **Smart Website Ladder:** $249 → $97/mo → $197/mo → $297/mo ✅
2. **AI Employee Plans:** $497-$597/mo with $997-$2,500 setup (Pricing.tsx) ✅
3. **Parallel Entry:** Web Chat ($79/mo), Warmy ($49/mo) ✅
4. **4 Industry Categories:** Home, Professional, Health, Automotive ✅
5. **5-Section Homepage:** Hero, HowWeHelp, Transformation, Testimonials, CTA ✅
6. **Luxury Design System:** Inter font, gold accents, dark theme ✅

**Critical fixes needed before baseline is clean:**
1. AIEmployee.tsx pricing sync
2. Contact.tsx placeholder replacement
3. MobileBottomBar.tsx route fix
4. Pricing.tsx M-prefix removal

**Everything else is polish, compliance, or future work.**

---

## 19. Purposeful Cleanup Log (2026-01-31)

This section documents intentional cleanup performed to align codebase with the offering baseline.

### 19.1 LocalPros Removal (Complete)

**Background:** LocalPros was a legacy partner/referral program that was deprecated in favor of direct EverIntent offerings.

**Actions Taken:**
- Removed `LocalPros lead disclosure` reference from PrivacyPolicy.tsx JSDoc (line 18)
- Legacy `localpros_apply` form type remains in DB constraint (migration not touched)
- Documentation references in /docs remain as historical record

**Why Killed Off:** LocalPros added complexity without ROI. Direct customer acquisition via AI Employee and Smart Websites is the strategic focus. Partner programs may return post-MVP with different structure.

### 19.2 65+ Verticals → 4 Industry Hubs (Complete)

**Background:** BRD originally specified 65+ individual vertical landing pages. This was identified as over-engineering for MVP.

**Actions Taken:**
- Updated routes.ts: Removed all 71 individual vertical routes (homeServicesRoutes, professionalServicesRoutes, healthWellnessRoutes, automotiveServicesRoutes)
- Retained 4 industry hub routes in `industryHubRoutes`
- Updated Industries.tsx: Changed copy from "65+ verticals" to "4 industry categories"
- Updated IndustriesSection.tsx: Same copy update
- Updated routes.ts JSDoc: Changed "65+ local business verticals" to "4 category pages"

**Why Changed:** Individual vertical pages require unique content and SEO strategy not yet developed. Hub pages provide sufficient categorization. Vertical pages can be added post-MVP when content strategy is finalized.

### 19.3 Navigation Link Fixes (Complete)

**Actions Taken:**
- Footer.tsx: Changed `/warmy` → `/warmy-email-deliverability`
- Header.tsx: Changed `/industries/automotive` → `/industries/automotive-services`
- Header.tsx: Added `hubPath="/let-ai-handle-it"` to AI Employee dropdown
- MobileBottomBar.tsx: Changed `/beautiful-websites` → `/smart-websites`
- Header.tsx (mobile menu): Changed AI Employee section header from `<span>` to clickable `<Link to="/let-ai-handle-it">` for consistency with Smart Websites and Industries sections

### 19.4 SmartSites Branding Cleanup (Complete)

**Actions Taken:**
- routes.ts line 42: Changed "About EverIntent SmartSites" → "About EverIntent"
- routes.ts line 253: Changed "Get help with SmartSites" → "Get help with EverIntent"

**Why Changed:** EverIntent is the master brand. "SmartSites" was a working title that should only appear in product context (Smart Site, Smart Lead, etc.), not in brand descriptions.

### 19.5 start-checkout Edge Function Fix (Complete)

**Actions Taken:**
- Removed local `TIER_TAG_MAP` definition using legacy T1-T4 keys
- Now imports `TIER_TAG_MAP` from `ghlClient.ts`
- Uses `service_interest.toLowerCase()` for key lookup
- Supports new keys: `smart-site`, `smart-lead`, `smart-business`, `smart-growth`, `m1`-`m5`, `web-chat`, `warmy`

**Why Changed:** Centralized tag mapping prevents drift between checkout and GHL sync. Legacy T1-T4 tags are deprecated but retained for backward compatibility.

---

### 19.6 AI Employee Individual Mode Pages (Complete)

**Background:** AI Employee modes were linking to anchor sections (#after-hours, #booking, etc.) on a single hub page. User requested individual product pages per mode.

**Actions Taken:**
- Created 5 dedicated mode pages in `src/pages/ai-employee/`:
  - `AfterHours.tsx` → `/let-ai-handle-it/after-hours`
  - `BookingAgent.tsx` → `/let-ai-handle-it/booking`
  - `MissedCallRecovery.tsx` → `/let-ai-handle-it/missed-call`
  - `FrontLineScreening.tsx` → `/let-ai-handle-it/screening`
  - `FullTakeover.tsx` → `/let-ai-handle-it/full-takeover`
- Updated `routes.tsx`:
  - Added imports for all 5 mode pages
  - Added `aiEmployeeModePaths` array for SSG pre-rendering
  - Added route definitions for each mode page
- Updated `Header.tsx`:
  - Changed `aiEmployeeModes` paths from hash anchors to dedicated routes
  - Mobile menu now links to individual pages via shared array

**SEO/AEO Considerations:**
- Each mode page has dedicated `<SEO>` component with unique title/description
- Breadcrumb navigation: AI Employee → Mode Name
- Structured content: Hero, How It Works, Features, Use Cases, CTA
- Pricing displayed prominently per BRD v35.3 ($497-$597/mo, $997-$2,500 setup)

**SSG Pre-rendering:** All 5 mode paths added to `prerenderRoutes` array for static generation.

### 19.7 "Full Takeover" → "Full AI Employee" Rename (Complete)

**Background:** User feedback that "Full Takeover" sounded aggressive/negative.

**Actions Taken:**
- Updated `Header.tsx`: Changed dropdown label from "Full Takeover" to "Full AI Employee"
- Updated `FullTakeover.tsx`: Changed breadcrumb text to "Full AI Employee"
- Route path remains `/let-ai-handle-it/full-takeover` (URL unchanged to avoid breaking links)
- Hub page `AIEmployee.tsx` already used "Full AI Employee" naming

**Why Changed:** User preference — "Full AI Employee" is more professional and aligns with the product name.

### 19.8 100-Point Codebase Alignment Audit (Complete)

**Background:** Comprehensive audit to identify all stale data, naming mismatches, and content drift.

**Critical Issues Found & Fixed:**

| Issue | File | Before | After |
|-------|------|--------|-------|
| Footer AI Modes links | Footer.tsx | Hash anchors (#after-hours) | Dedicated routes (/let-ai-handle-it/after-hours) |
| Footer AI mode naming | Footer.tsx | "Full Takeover" | "Full AI Employee" |
| Footer pricing | Footer.tsx | "Starting at $149/mo" | "Smart Websites from $249" |
| Contact phone | Contact.tsx | (800) 555-1234 | (562) 685-9500 |
| Contact email | Contact.tsx | hello@everintent.com | info@everintent.com |
| Contact address | Contact.tsx | "Remote-first company" | Full business address |
| AIEmployee.tsx pricing | AIEmployee.tsx | $149-$297/mo, $297-$597 setup | $497-$597/mo, $997-$2,500 setup |
| AIEmployee.tsx SEO | AIEmployee.tsx | "Starting at $149/mo" | "Starting at $497/mo" |
| AIEmployee.tsx CTA | AIEmployee.tsx | Links to /checkout | Links to mode pages |
| Pricing.tsx SEO | Pricing.tsx | "starts at $149/mo" | "from $497/mo" |
| Pricing.tsx M-prefixes | Pricing.tsx | "M1: After-Hours" | "After-Hours" |
| index.html OG images | index.html | lovable.dev/opengraph-image | everintent.com/og-image.jpg |
| index.html fonts | index.html | Space Grotesk + Inter | Inter only |

**Accessibility (ADA) Verified:**
- All interactive elements have proper `aria-label` attributes
- Form inputs have associated `<Label>` elements
- Color contrast meets WCAG 2.1 AA standards (gold on dark)
- Keyboard navigation supported via native HTML semantics

**SEO/AEO Alignment:**
- All pages have unique `<SEO>` components with proper title/description
- FAQ schema (JSON-LD) on Pricing page for rich snippets
- Consistent H1 hierarchy across all pages
- Meta descriptions under 160 characters with primary keywords

**Purchase Flow Alignment:**
- AIEmployee mode cards now link to dedicated product pages (not checkout)
- Product pages contain detailed info + CTA to /pricing or /contact
- Pricing page CTAs link to /contact (pre-checkout qualification)
- GHL tag mapping verified in ghlClient.ts TIER_TAG_MAP

---

## 20. Remaining Cleanup Items — ALL RESOLVED

**Updated: 2026-02-06** — All items have been resolved or marked as intentional design decisions.

| Priority | Item | Status | Resolution |
|----------|------|--------|------------|
| ✅ Fixed | AIEmployee.tsx hub page pricing | ✅ Complete | $497-$597/mo + tiered setup |
| ✅ Fixed | Contact.tsx placeholder phone/email | ✅ Complete | (562) 685-9500 + info@everintent.com |
| ✅ Fixed | Contact.tsx timezone | ✅ Complete | Changed EST → PST (CA company) |
| ✅ Fixed | Contact.tsx business address | ✅ Complete | Full TCPA-compliant address |
| ✅ Fixed | Pricing.tsx M-prefix removal | ✅ Complete | Human-readable names only |
| ✅ Fixed | Footer starting price | ✅ Complete | "Smart Websites from $249" |
| ✅ Fixed | Footer Smart tier links | ✅ Complete | /smart-websites/smart-site pattern |
| ✅ Fixed | Footer Warmy route | ✅ Complete | /warmy-email-deliverability |
| ✅ Fixed | Pricing.tsx meta description | ✅ Complete | "from $497/mo" |
| ✅ Fixed | Header Automotive route | ✅ Complete | /industries/automotive-services |
| ✅ Fixed | Header Smart Websites dropdown | ✅ Complete | /smart-websites/smart-site pattern |
| ✅ Fixed | index.html fonts | ✅ Complete | Inter only (Space Grotesk removed) |
| ✅ Fixed | index.html favicon cache-buster | ✅ Complete | ?v=1 added |
| 🟢 Intentional | Footer "Client Login" link | 🟢 Deferred | Portal not yet live |
| 🟢 Intentional | JSDoc @brd-reference tags | 🟢 Accepted | Historical context preserved |
| 🟢 Intentional | Header nav order (Industries before Pricing) | 🟢 Accepted | UX design decision |
| 🟢 Intentional | Legal routes use /legal/ prefix | 🟢 Accepted | Better URL semantics |
| 🟢 Intentional | OG image placeholder | 🟢 Pending | Waiting for branded asset |

---

## 21. Current Navigation Structure (Updated)

### 21.1 AI Employee Navigation

**Desktop Dropdown (Header.tsx):**
```
AI Employee (hub: /let-ai-handle-it)
├── After-Hours → /let-ai-handle-it/after-hours
├── Booking Agent → /let-ai-handle-it/booking
├── Missed Call Recovery → /let-ai-handle-it/missed-call
├── Front Line Screening → /let-ai-handle-it/screening
└── Full AI Employee → /let-ai-handle-it/full-takeover
```

**Mobile Menu:** Uses same `aiEmployeeModes` array, all routes verified.

**Footer AI Modes Column:** Now links to dedicated product pages, not hash anchors.

### 21.2 SSG Route Coverage

All AI Employee mode pages included in `prerenderRoutes`:
- `/let-ai-handle-it` (hub)
- `/let-ai-handle-it/after-hours`
- `/let-ai-handle-it/booking`
- `/let-ai-handle-it/missed-call`
- `/let-ai-handle-it/screening`
- `/let-ai-handle-it/full-takeover`

### 21.3 Contact Information (Verified)

**Canonical Business Info:**
- Email: info@everintent.com
- Phone: (562) 685-9500
- Address: 2892 N Bellflower Blvd, PMB 1018, Long Beach, CA 90815

Used consistently in:
- Footer.tsx ✅
- Contact.tsx ✅

---

## 22. Pricing Baseline (Verified)

### 22.1 Smart Website Packages

| Tier | Price | Setup | Hosting |
|------|-------|-------|---------|
| Smart Site | $249 one-time | $249 | $149/yr after Y1 |
| Smart Lead | $97/mo | $249 | Included |
| Smart Business | $197/mo | $497 | Included |
| Smart Growth | $297/mo | $997 | Included |

### 22.2 AI Employee Modes

| Mode | Monthly | Setup |
|------|---------|-------|
| After-Hours (M1) | $497 | $997 |
| After-Hours + Booking (M2) | $497 | $997 |
| Missed Call Recovery (M3) | $497 | $997 |
| Front Line Screener (M4) | $547 | $1,497 |
| Full AI Employee (M5) | $597 | $2,500 |

### 22.3 Parallel Entry Points

| Product | Monthly | Setup |
|---------|---------|-------|
| Web Chat Only | $79 | $497 |
| Warmy Booster | $49 | None |

---

## 23. Smart Websites Architecture Alignment (2026-01-31)

### 23.1 Hub + Individual Tier Pages Pattern

Implemented the same architecture pattern as AI Employee:
- **Hub Page:** `/smart-websites` (SmartWebsites.tsx) - Overview and comparison table
- **Tier Pages:** Individual product pages with breadcrumbs, SEO, AEO content

| Tier | Route | Component |
|------|-------|-----------|
| Smart Site | `/smart-websites/smart-site` | SmartSite.tsx |
| Smart Lead | `/smart-websites/smart-lead` | SmartLead.tsx |
| Smart Business | `/smart-websites/smart-business` | SmartBusiness.tsx |
| Smart Growth | `/smart-websites/smart-growth` | SmartGrowth.tsx |

### 23.2 SSG Pre-rendering

Added to `prerenderRoutes` in routes.tsx:
```typescript
const smartWebsitesTierPaths = [
  '/smart-websites/smart-site',
  '/smart-websites/smart-lead',
  '/smart-websites/smart-business',
  '/smart-websites/smart-growth',
];
```

### 23.3 Footer Updates

Services column now links to individual tier pages instead of pricing hash anchors:
- Smart Site → `/smart-websites/smart-site`
- Smart Lead → `/smart-websites/smart-lead`
- Smart Business → `/smart-websites/smart-business`
- Smart Growth → `/smart-websites/smart-growth`

### 23.4 Individual Page Features

Each tier page includes:
- ✅ Breadcrumb navigation (Home → Smart Websites → [Tier])
- ✅ SEO meta tags with unique title/description
- ✅ Hero section with pricing and tier badge
- ✅ Feature grid highlighting tier-specific capabilities
- ✅ "Plus everything in [lower tier]" sections
- ✅ "Perfect For" audience targeting
- ✅ FAQ section with tier-specific questions
- ✅ CTA with link to next tier upsell

### 23.5 Architecture Parity with AI Employee

| Aspect | AI Employee | Smart Websites |
|--------|-------------|----------------|
| Hub page | `/let-ai-handle-it` | `/smart-websites` |
| Individual pages | 5 mode pages | 4 tier pages |
| Breadcrumbs | ✅ | ✅ |
| SSG routes | ✅ | ✅ |
| Footer links | Dedicated pages | Dedicated pages |
| SEO per page | ✅ | ✅ |

---

## 24. Intentional Design Decisions (v36 Baseline)

The following items were flagged as "discrepancies" from BRD v35.3 but are now confirmed as **intentional design decisions** in the v36 Offering Baseline:

### 24.1 Header Smart Websites Dropdown Links → Dedicated Tier Pages

**Original BRD:** `/smart-websites#smart-site` (hash anchors)  
**Current Implementation:** `/smart-websites/smart-site` (dedicated pages)  
**Rationale:** Hub-and-spoke architecture provides better SEO, AEO, and user experience with dedicated product pages.

### 24.2 Legal Routes with `/legal/` Prefix

**Original BRD:** `/privacy`, `/terms`, `/cookies`  
**Current Implementation:** `/legal/privacy`, `/legal/terms`, `/legal/cookies`, `/legal/data-request`  
**Rationale:** Better URL semantics and organization. Works correctly.

### 24.3 Header Navigation Order (Industries Before Pricing)

**Original BRD:** Pricing at position 3, Industries at position 4  
**Current Implementation:** Industries at position 3, Pricing at position 4  
**Rationale:** UX design decision to group product discovery (AI Employee, Smart Websites, Industries) before conversion (Pricing).

### 24.4 Homepage Simplified to 5 Sections

**Original BRD:** More complex section list  
**Current Implementation:** Hero → HowWeHelp → Transformation → Testimonials → FinalCTA  
**Rationale:** Minimal luxury aesthetic with generous spacing and focused conversion path.

### 24.5 Contact Page Timezone: PST (Not EST)

**Original Code:** EST  
**Current Implementation:** PST  
**Rationale:** Company is California-based. Business hours should reflect PT.

### 24.6 Space Grotesk Font Removed

**Original BRD Appendix F:** Allowed Space Grotesk for display  
**Current Implementation:** Inter only  
**Rationale:** Memory specification requires Inter-only typography. All Tailwind font families map to Inter.

---

## 25. Reconciliation Complete

**As of 2026-02-06, all 99 original discrepancies have been addressed:**
- 94 items resolved through code fixes
- 5 items marked as intentional design decisions

**The codebase is the authoritative source of truth.** Future BRD updates should reflect the Offering Baseline, not the other way around.

---

## 26. Post-Baseline Fixes (2026-02-06)

Additional alignment fixes applied after initial reconciliation:

### 26.1 Header Smart Websites Dropdown Links ✅ FIXED

**Before:** Links pointed to `/pricing#smart-site`, `/pricing#smart-lead`, etc.  
**After:** Links now point to `/smart-websites/smart-site`, `/smart-websites/smart-lead`, etc.  
**Rationale:** Aligns with hub-and-spoke architecture. Dropdown should link to dedicated tier pages, not pricing anchors.

### 26.2 PricingTeaser AI Employee Display ✅ FIXED

**Before:** Displayed "$497/mo" as flat price  
**After:** Displays "from $497/mo" to reflect tiered pricing ($497–$597)  
**Rationale:** Accurate representation of the pricing ladder per v36 luxury spec.

### 26.3 Footer Client Login Link ✅ ADDED

**Before:** No external client login link  
**After:** Added "Client Login" under Company column linking to `https://app.everintent.com`  
**Rationale:** Standard agency pattern for existing customer access.

### 26.4 Favicon Cache-Buster ✅ ADDED

**Before:** `/favicon.svg` (no cache control)  
**After:** `/favicon.svg?v=1` (cache-buster appended)  
**Rationale:** Ensures favicon updates propagate to browsers.

### 26.5 Footer Company Links Refactored

**Before:** "Legal" link in Company column  
**After:** Removed redundant "Legal" (already in bottom legal links), added "Client Login" with external link handling  
**Rationale:** Cleaner separation between internal navigation and external resources.

### 26.6 GHL Chat Widget hideLauncher() Fix ✅ FIXED

**Before:** `hideLauncher()` in `src/lib/ghlLoader.ts` used overly broad selectors including `[class*="lc_text-widget"]` which hid the entire chat panel, preventing the widget from opening.  
**After:** Reverted to SSG doc pattern (`docs/ghl-chat-widget-implementation.md`) targeting ONLY `button.lc_text-widget--bubble` in the first shadow root.  
**Rationale:** The wildcard selector was matching the chat panel container, not just the launcher button. Chat widget now opens correctly on both desktop and mobile.

**Code Change:**
```typescript
// Before (broken)
const launcherSelectors = [
  'button.lc_text-widget--bubble',
  'button.lc_text-widget--btn',
  '.lc_text-widget--btn',
  '.lc_text-widget--bubble',
  '[class*="lc_text-widget"]', // ← This hid the entire widget!
];

// After (working)
const launcher = shadowRoot.querySelector('button.lc_text-widget--bubble');
```

---

## 27. Authoritative Baseline Summary

The **v36 Offering Baseline** is now complete and verified. Key architectural patterns:

### 27.1 Product Architecture
- **Smart Websites:** Hub-and-spoke with dedicated tier pages (`/smart-websites/smart-site`, etc.)
- **AI Employee:** Hub-and-spoke with dedicated mode pages (`/let-ai-handle-it/after-hours`, etc.)
- **Industries:** Consolidated to 4 primary categories with showcase pages

### 27.2 Pricing Ladder (Authoritative)
| Product | Price | Setup |
|---------|-------|-------|
| Smart Site | $249 one-time | — |
| Smart Lead | $97/mo | — |
| Smart Business | $197/mo | — |
| Smart Growth | $297/mo | — |
| AI Employee M1-M4 | $497/mo | $997–$1,497 |
| AI Employee M5 | $597/mo | $2,500 |

### 27.3 Navigation Architecture
- Header dropdowns link to dedicated product pages (not hash anchors)
- Footer includes Client Login external link
- Legal pages under `/legal/` prefix
- Industries hub with 4 category stubs

### 27.4 GHL Integration
- Single sitewide widget (GHL_WIDGET_ID_SALES) fetched from edge function
- Custom launcher buttons (DesktopChatButton, MobileBottomBar)
- Default GHL launcher hidden via shadow DOM targeting
- Composer fixes applied via `applyGHLComposerFixRetries()`

### 27.5 SSG Compliance
- All marketing pages pre-rendered via vite-react-ssg
- Admin routes excluded from SSG (CSR-only)
- Browser-dependent components wrapped in ClientOnly
- Portal components (Toaster, Sonner) client-only

---

## 28. Checkout Design Specification v5.2

This section documents the comprehensive checkout experience design as defined in `docs/Detail-Checkout-design-v5.2.md`. This specification supersedes all previous checkout-related documentation.

### 28.1 Architectural Overview

The checkout flow is a **two-stage architecture**:

1. **Stage 1 (Pre-Checkout Form):** Multi-step React form on everintent.com capturing lead data, tier selection, and add-ons
2. **Stage 2 (GHL Payment):** Redirect to GoHighLevel SaaS checkout (`go.everintent.com/[tier]`) for Stripe payment processing

```
User → React Form → start-checkout Edge Function → Supabase + GHL API → Redirect URL → GHL Checkout
```

### 28.2 SSG Routes

Eight pre-generated checkout routes (SSG):

| Route | Tier | Type |
|-------|------|------|
| `/checkout/launch` | Launch | Smart Websites |
| `/checkout/capture` | Capture | Smart Websites |
| `/checkout/convert` | Convert | Smart Websites |
| `/checkout/scale` | Scale | Smart Websites |
| `/checkout/after-hours` | After-Hours | AI Employee |
| `/checkout/front-office` | Front Office | AI Employee |
| `/checkout/full-ai-employee` | Full AI Employee | AI Employee |
| `/checkout/web-chat-only` | Web Chat Only | AI Employee |

### 28.3 Three-Step UI Flow

**Step 1: Plan & Add-Ons Selection**
- Tier dropdown pre-filled from URL route (e.g., `/checkout/convert` → Convert)
- **CRITICAL:** Tier change resets all selected add-ons to prevent invalid combinations
- Dynamic `OrderSummary` component shows real-time pricing
- Add-on checkboxes with prices from static config

**Step 2: Contact Details**
- Fields: First Name, Last Name, Email (required), Phone, Business Name
- **Domain Logic:** Radio pattern ("I have a domain" vs "I need help finding one")
  - If "I have a domain" → show text input for domain name
  - If "I need help" → hide input, store `has_domain: false`
- Message textarea with **500-character limit** and live counter
- TCPA consent checkbox (required)

**Step 3: Review & Confirm**
- Read-only summary of all selections and contact info
- **Section-specific "Edit" links** for direct navigation back to Step 1 or Step 2
- Client-side total verification against server before submission
- "Complete Checkout" button triggers edge function

### 28.4 State Management

- **sessionStorage** persistence across steps and page refreshes
- Schema: `{ tier, addons[], contact{}, step, totals{} }`
- Abandon/resume via `?resume=[submission_id]` query parameter
- State cleared on successful redirect to GHL

### 28.5 Edge Function: `start-checkout`

**Endpoint:** `POST /functions/v1/start-checkout`

**Request Payload:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "company": "string",
  "message": "string",
  "service_interest": "launch|capture|convert|scale|after-hours|front-office|full-ai-employee|web-chat-only",
  "tcpa_consent": true,
  "utm_source": "string",
  "utm_medium": "string",
  "utm_campaign": "string",
  "source_page": "string",
  "ip_address": "string",
  "user_agent": "string"
}
```

**Responsibilities:**
1. Validate required fields (name, email)
2. Insert into `checkout_submissions` table with `status: 'new'`, `ghl_sync_status: 'pending'`
3. Upsert contact to GHL via `ghlClient.ts`
4. Apply tier tag (e.g., `EI: Tier – Launch`)
5. Apply add-on tags (e.g., `EI: AddOn – AI Voice Chat`)
6. Create GHL note with full submission context
7. Update `ghl_sync_status` to `synced` or `failed`
8. Return `{ success: true, id, ghl_sync_status, redirect_url }`

### 28.6 Tagging Schema v2.2

**Tier Tags (en-dash separator):**
| Tier | Tag |
|------|-----|
| Launch | `EI: Tier – Launch` |
| Capture | `EI: Tier – Capture` |
| Convert | `EI: Tier – Convert` |
| Scale | `EI: Tier – Scale` |
| After-Hours | `EI: Tier – After-Hours` |
| Front Office | `EI: Tier – Front Office` |
| Full AI Employee | `EI: Tier – Full AI Employee` |
| Web Chat Only | `EI: Tier – Web Chat Only` |

**Add-On Tags:**
| Add-On | Tag |
|--------|-----|
| Email Authority | `EI: AddOn – Email Authority` |
| Get Paid Now | `EI: AddOn – Get Paid Now` |
| Social Autopilot | `EI: AddOn – Social Autopilot` |
| Omnichannel Inbox | `EI: AddOn – Omnichannel Inbox` |
| AI Voice Chat | `EI: AddOn – AI Voice Chat` |
| Unlimited AI | `EI: AddOn – Unlimited AI` |

**Note:** Tags use **en-dash (–)** not hyphen (-) per v5.2 spec.

### 28.7 GHL Redirect URLs

Each tier maps to a GHL SaaS checkout URL:

| Tier | Redirect URL |
|------|--------------|
| Launch | `https://go.everintent.com/launch?first_name=...` |
| Capture | `https://go.everintent.com/capture?first_name=...` |
| Convert | `https://go.everintent.com/convert?first_name=...` |
| Scale | `https://go.everintent.com/scale?first_name=...` |
| After-Hours | `https://go.everintent.com/after-hours?first_name=...` |
| Front Office | `https://go.everintent.com/front-office?first_name=...` |
| Full AI Employee | `https://go.everintent.com/full-ai-employee?first_name=...` |
| Web Chat Only | `https://go.everintent.com/web-chat-only?first_name=...` |

Query parameters pre-fill GHL form: `first_name`, `last_name`, `email`, `phone`, `company`.

### 28.8 Database Schema

**Table: `checkout_submissions`** (existing, aligned with types.ts)

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| name | text | Full name (required) |
| email | text | Email (required) |
| phone | text | Phone number |
| company | text | Business name |
| message | text | Optional message (max 500 chars) |
| service_interest | text | Tier slug |
| tcpa_consent | boolean | TCPA agreement |
| consent_timestamp | timestamp | When consent given |
| utm_source/medium/campaign | text | UTM tracking |
| source_page | text | Page URL |
| ip_address | text | Client IP |
| user_agent | text | Browser UA |
| status | text | `new`, `redirected`, `paid`, `failed` |
| ghl_contact_id | text | GHL contact ID |
| ghl_sync_status | text | `pending`, `synced`, `failed` |
| ghl_synced_at | timestamp | Sync timestamp |
| ghl_error | text | Error message if failed |
| created_at | timestamp | Creation time |
| updated_at | timestamp | Last update |

### 28.9 GHL Pipeline Stages

**Pipeline: Checkout Pipeline**

1. **Pre-Checkout** – Contact started form, not yet redirected
2. **Payment Pending** – Redirected to GHL, awaiting payment
3. **Paid – Onboarding** – Payment complete, snapshot provisioning
4. **Snapshot Applied** – Onboarding forms/calls scheduled
5. **Active Customer** – Fully onboarded

### 28.10 Error Handling

| Scenario | Behavior |
|----------|----------|
| Missing required fields | Return 400 with field-specific errors |
| Supabase insert failure | Return 500, log error, do not call GHL |
| GHL API failure | Save to Supabase with `ghl_sync_status: 'failed'`, return success with warning |
| Total mismatch | Client-side verification before submit; reject if mismatch |
| Network timeout | Retry logic with exponential backoff (3 attempts) |

### 28.11 Abandon & Resume

- Submission ID stored in `sessionStorage`
- On return visit with `?resume=[id]`, fetch submission from Supabase
- Pre-fill form with saved data
- Show "Welcome back" toast notification

### 28.12 Analytics & Attribution

- UTM parameters captured and stored
- Events to track:
  - `checkout_started` – Step 1 loaded
  - `plan_selected` – Tier changed
  - `addon_toggled` – Add-on selected/deselected
  - `step_completed` – Step transition
  - `checkout_submitted` – Form submitted
  - `checkout_redirected` – Redirect to GHL

### 28.13 Implementation Checklist

| Task | Status |
|------|--------|
| Create CheckoutPage component with 3-step flow | ⬜ TODO |
| Implement sessionStorage persistence | ⬜ TODO |
| Build OrderSummary with real-time pricing | ⬜ TODO |
| Add tier dropdown with add-on reset logic | ⬜ TODO |
| Implement domain radio pattern | ⬜ TODO |
| Add 500-char message limit with counter | ⬜ TODO |
| Build Review step with Edit links | ⬜ TODO |
| Update ghlClient.ts with v2.2 tag maps | ⬜ TODO |
| Update start-checkout to return redirect_url | ⬜ TODO |
| Add SSG routes for all 8 tiers | ⬜ TODO |
| Implement abandon/resume logic | ⬜ TODO |
| Add analytics event tracking | ⬜ TODO |

---

---

## 29. Platform Module Architecture (Phase 8)

**Date Added:** 2026-02-12
**Status:** Implemented (foundation), In Progress (CRUD layers)

### 29.1 Architectural Change Summary

The admin shell was refactored from a hardcoded monolith into a dynamic, plugin-based platform. Features self-register via a central module registry, and the admin dashboard and routing are generated entirely from registered modules at runtime.

### 29.2 Files Created

| File | Purpose |
|------|---------|
| `src/modules/types.ts` | `ModuleDefinition` interface, `ModuleNavItem`, `ModuleCategory` enum |
| `src/modules/registry.ts` | `registerModule()`, `getModules()`, `getModule()` — central catalog |
| `src/modules/index.ts` | Barrel import — triggers self-registration of all modules |
| `src/modules/themes/index.ts` | Theme module registration (first conforming module) |
| `src/modules/submissions/index.ts` | Submissions module registration |
| `src/modules/portfolio/index.ts` | Portfolio module registration (Placeholder admin) |
| `src/modules/testimonials/index.ts` | Testimonials module registration (Placeholder admin) |
| `src/modules/playground/index.ts` | Playground module registration |

### 29.3 Files Modified

| File | Change |
|------|--------|
| `src/pages/admin/Dashboard.tsx` | Refactored from hardcoded cards to `getModules().flatMap(mod => mod.navItems)` |
| `src/routes.tsx` | Admin routes generated from `getModules().flatMap(mod => mod.routes)` wrapped in `AdminGuard` |

### 29.4 Design Decisions

1. **Self-registration pattern**: Modules call `registerModule()` from their barrel export. The barrel `src/modules/index.ts` is imported in `routes.tsx` before the route tree is built.
2. **Fail-fast on duplicates**: `registerModule()` throws if a module with the same ID already exists.
3. **Category grouping**: `ModuleCategory` enum (Content, Appearance, Commerce, Settings, Tools) for future sidebar grouping.
4. **Portability**: `types.ts` + `registry.ts` have zero project-specific dependencies. Copy into any React Router project.
5. **Legacy compatibility**: `theme-test` admin route preserved outside the registry as it's a development tool, not a feature module.

### 29.5 Remaining Work

- ~~Generic `CrudService<T>` data layer with Zod validation (8.10)~~ ✅ Implemented
- Shared admin UI patterns: `AdminListView<T>`, `AdminDetailView`, `AdminFormEditor<T>` (8.11)
- Portfolio and Testimonials admin CRUD to replace Placeholder pages (8.12, 8.13)
- Module permission enforcement via `requiredRole` (8.14)

### 29.6 CrudService<T> Data Layer (Task 8.10)

**Files Created:**
| File | Purpose |
|------|---------|
| `src/modules/shared/crudService.ts` | Generic CRUD factory with Zod validation gates |
| `src/modules/shared/createCrudHooks.ts` | TanStack Query hooks factory (5 hooks per service) |
| `src/modules/shared/index.ts` | Barrel export for shared module utilities |

**Design Decisions:**
1. **`as any` for table name**: Supabase's generated `Database` type doesn't accept arbitrary string table names. Type safety is enforced by Zod schemas at runtime, not by the Supabase SDK's static types.
2. **Optimistic updates**: `useUpdate` and `useRemove` hooks patch/remove items from the TanStack Query list cache immediately, rolling back on error. `onSettled` always invalidates to ensure server truth.
3. **CrudServiceError**: Structured error class wrapping Supabase `PostgrestError` fields (`code`, `message`, `details`) for consistent error handling across modules.
4. **Zod parse on response**: Row data returned from Supabase is validated through `rowSchema.parse()` to catch schema drift between DB and client expectations.

### 29.7 Shared Admin UI Patterns (Task 8.11)

**Files Created:**
| File | Purpose |
|------|---------|
| `src/modules/shared/types.ts` | `FieldDef` (7 field types) + `ColumnDef<T>` (table column descriptor) contracts |
| `src/modules/shared/AdminListView.tsx` | Generic data table with loading skeleton, empty state, create button, row click |
| `src/modules/shared/AdminDetailView.tsx` | Detail/edit page shell with back nav, title, subtitle, action bar, content slot |
| `src/modules/shared/AdminFormEditor.tsx` | Dynamic form: react-hook-form + Zod resolver, 7 field type renderers, char counter, image preview |

**Design Decisions:**
1. **Declarative field rendering**: `FieldDef[]` array drives form controls. Modules declare fields; `AdminFormEditor` renders them. No per-module form JSX required.
2. **7 field types**: `text`, `textarea` (with `maxLength` char counter), `number`, `boolean` (Switch), `select` (dropdown), `tags` (comma-split to `string[]`), `image-url` (URL input + `<img>` preview with error hiding).
3. **Composition over inheritance**: `AdminDetailView` provides the shell; `AdminFormEditor` provides the form. They compose together but are independently usable.
4. **Consistent loading states**: `AdminListView` shows 8 skeleton rows; `AdminDetailView` shows 6 field-shaped skeletons. Both match the actual content layout.
5. **No custom colors**: All components use semantic tokens (`bg-background`, `text-muted-foreground`, `border-border`, `text-destructive`).

---

**END OF REPORT**

*This document serves as the comprehensive baseline comparison and progression analysis. The current codebase structure, navigation, and pricing represents the verified offering baseline for EverIntent.*

*Generated: 2026-01-31 | BRD v35.3 | Complete Progression Analysis*  
*Updated: 2026-02-06 | All discrepancies resolved — v36 Offering Baseline finalized*  
*Updated: 2026-02-06 | Post-baseline fixes applied (§26) + GHL fix (§26.6) + Summary (§27)*  
*Updated: 2026-02-06 | Homepage confirmed at pre-delta luxury minimal state*  
*Updated: 2026-02-08 | Added §28 Checkout Design Specification v5.2*
*Updated: 2026-02-12 | Added §29 Platform Module Architecture (Phase 8)*
*Updated: 2026-02-12 | Added §29.6 CrudService<T> Data Layer (Task 8.10)*
*Updated: 2026-02-12 | Added §29.7 Shared Admin UI Patterns (Task 8.11)*