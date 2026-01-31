# BRD v35.3 vs Codebase Delta Report

**Generated:** 2026-01-31  
**BRD Version:** v35.3 (AI-First + Smart Lead + Warmy Full Spec + Nav Refinement)  
**Purpose:** Complete baseline comparison documenting EVERY difference between the BRD specification and the current codebase.

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Pricing Discrepancies](#2-pricing-discrepancies)
3. [Navigation & Routing Discrepancies](#3-navigation--routing-discrepancies)
4. [Branding & Copy Discrepancies](#4-branding--copy-discrepancies)
5. [Contact & Business Information Discrepancies](#5-contact--business-information-discrepancies)
6. [Footer Structure Discrepancies](#6-footer-structure-discrepancies)
7. [Header Structure Discrepancies](#7-header-structure-discrepancies)
8. [Edge Function & Backend Discrepancies](#8-edge-function--backend-discrepancies)
9. [JSDoc & Documentation Violations](#9-jsdoc--documentation-violations)
10. [Design System Discrepancies](#10-design-system-discrepancies)
11. [index.html & Meta Discrepancies](#11-indexhtml--meta-discrepancies)
12. [Page-by-Page Analysis](#12-page-by-page-analysis)
13. [Route Configuration Analysis](#13-route-configuration-analysis)
14. [GHL Integration Analysis](#14-ghl-integration-analysis)
15. [Component Architecture Analysis](#15-component-architecture-analysis)
16. [Compliance & Legal Discrepancies](#16-compliance--legal-discrepancies)
17. [Summary Statistics](#17-summary-statistics)

---

## 1. Executive Summary

This report documents **every observable difference** between the Business Requirements Document (BRD) v35.3 and the current codebase state. The purpose is to establish a complete baseline for reconciliation, not to prescribe fixes.

### Totals

| Category | Count |
|----------|-------|
| Critical Pricing Discrepancies | 12 |
| Navigation/Routing Discrepancies | 18 |
| Branding/Copy Discrepancies | 9 |
| Contact/Business Info Discrepancies | 6 |
| Footer Structure Discrepancies | 8 |
| Header Structure Discrepancies | 5 |
| Edge Function Discrepancies | 4 |
| JSDoc Violations | 4 |
| Design System Discrepancies | 7 |
| index.html Discrepancies | 4 |
| Page-Specific Discrepancies | 22 |
| **Total Discrepancies** | **99** |

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

**END OF REPORT**

*This document is auto-generated for baseline comparison purposes. It documents differences without prescribing solutions.*
