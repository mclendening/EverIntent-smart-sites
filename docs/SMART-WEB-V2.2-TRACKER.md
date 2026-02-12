# Smart Websites v2.2 Implementation Tracker

**Created:** 2026-02-07  
**Last Updated:** 2026-02-08  
**Status:** Active  
**Owner:** EverIntent Development Team

---

## Overview

EverIntent v2.2 Smart Websites restructure:
- Rename tiers: Launch → Capture → Convert → Scale
- Introduce 6 add-on packs with cross-sell integration
- Maintain SSG compatibility (no URL redirects)
- Preserve Smart Websites / AI Employee product separation
- **Phase 6 Addition**: Dedicated checkout flow per Design Spec v5.0

---

## Phase 1 – Tier Renaming & Messaging ✅ COMPLETE

| ID | Task | Status | Verification | Notes |
|----|------|--------|--------------|-------|
| 1.1 | Rename "Smart Site" → "Launch" across all pages | `done` | Check headings, nav, meta tags; no 404s | Slug `/smart-websites/smart-site` unchanged |
| 1.2 | Rename "Smart Lead" → "Capture" across all pages | `done` | Check headings, nav, meta tags; no 404s | Slug `/smart-websites/smart-lead` unchanged |
| 1.3 | Rename "Smart Business" → "Convert" across all pages | `done` | Check headings, nav, meta tags; no 404s | Slug `/smart-websites/smart-business` unchanged |
| 1.4 | Rename "Smart Growth" → "Scale" across all pages | `done` | Check headings, nav, meta tags; no 404s | Slug `/smart-websites/smart-growth` unchanged |
| 1.5 | Rewrite tier descriptions (outcome-focused copy) | `done` | Launch="Get online fast", Capture="Never miss a lead", Convert="Turn visitors into customers", Scale="AI-powered growth engine" | Match dark/purple/yellow aesthetic |
| 1.6 | Update Smart Websites dropdown menu | `done` | Hover test all menu items on staging | List: Launch, Capture, Convert, Scale, Compare Plans, Add-On Packs |
| 1.7 | Update all internal links and breadcrumbs | `done` | Click-test all navigation paths | No new URLs; existing slugs only |
| 1.8 | Refresh SEO metadata (title, description, canonical) | `done` | Source inspection + SEO checker | One H1 per page; proper heading hierarchy |

---

## Phase 2 – Add-On Packs & Cross-Sell ✅ COMPLETE (Task 2.13 Replaced)

| ID | Task | Status | Verification | Notes |
|----|------|--------|--------------|-------|
| 2.1 | Create `/smart-websites/add-ons` hub page | `done` | Page builds; matches AI Employee aesthetic | 6 pack cards with headlines, bullets, price, CTA |
| 2.2 | Build Email Authority pack card ($49/mo) | `done` | Card renders; links work | Warmy deliverability + inbox warmup |
| 2.3 | Build Get Paid Now pack card ($49/mo) | `done` | Card renders; links work | Invoicing + payment collection |
| 2.4 | Build Social Autopilot pack card ($97/mo) | `done` | Card renders; links work | Social scheduling + content calendar |
| 2.5 | Build Omnichannel Inbox pack card ($99/mo) | `done` | Card renders; links work | Unified messaging across channels |
| 2.6 | Build AI Voice Chat pack card ($79/mo) | `done` | Card renders; links work | Website chat widget with voice |
| 2.7 | Build Unlimited AI pack card ($149/mo) | `done` | Card renders; links work | Unlimited AI usage for heavy users |
| 2.8 | Add detail sections/modals for each pack | `done` | "Learn More" opens correct detail | No client-side routing; use existing modal patterns |
| 2.9 | Add "Recommended Add-Ons" to Launch page | `done` | Section renders; max 2 packs | Email Authority |
| 2.10 | Add "Recommended Add-Ons" to Capture page | `done` | Section renders; max 2 packs | Get Paid Now, AI Voice Chat |
| 2.11 | Add "Recommended Add-Ons" to Convert page | `done` | Section renders; max 2 packs | Social Autopilot, Omnichannel Inbox |
| 2.12 | Add "Recommended Add-Ons" to Scale page | `done` | Section renders; max 2 packs | Omnichannel Inbox |
| 2.13 | ~~Extend checkout with add-on selection step~~ | `replaced` | ~~Test transactions with pack combos~~ | **REPLACED BY PHASE 6** – Contact form incorrectly modified; dedicated checkout required per Design Spec v5.0 |

---

## Phase 3 – Comparison & Upgrade Paths ✅ COMPLETE

| ID | Task | Status | Verification | Notes |
|----|------|--------|--------------|-------|
| 3.1 | Rebuild `/compare-websites` table with new tier names | `done` | Orb backgrounds, tooltips, bright checkmarks | Matches AI Employee styling |
| 3.2 | Add upgrade CTAs beneath each column | `done` | "Choose Launch/Capture/Convert/Scale" buttons | Links to tier detail pages |
| 3.3 | Add recommended add-ons below upgrade buttons | `done` | 1-2 packs per tier with icons and prices | Links to /smart-websites/add-ons |
| 3.4 | Add AI Employee upsell section on Scale page | `done` | Links to `/let-ai-handle-it/after-hours` | Included in comparison cards |

---

## Phase 4 – Analytics, SEO & Ongoing Optimisation ⏸️ DEFERRED

> **Note**: Phase 4 tasks are deferred until Phase 6 checkout is complete. Analytics instrumentation will be implemented as part of the checkout flow.

| ID | Task | Status | Verification | Notes |
|----|------|--------|--------------|-------|
| 4.1 | Instrument tier selection tracking | `deferred` | Test events appear in dashboard | Will integrate with Phase 6 checkout |
| 4.2 | Instrument add-on selection + attach rate tracking | `deferred` | Test events appear in dashboard | Will integrate with Phase 6 checkout |
| 4.3 | Instrument cross-sell click tracking | `deferred` | Test events appear in dashboard | Track recommended pack clicks |
| 4.4 | Instrument Scale → AI Employee upgrade tracking | `deferred` | Test events appear in dashboard | Track cross-line conversions |
| 4.5 | Post-launch SEO audit (Phase 1) | `deferred` | Document results in tracker | Meta tags, headings, internal links |
| 4.6 | Post-launch SEO audit (Phase 2) | `deferred` | Document results in tracker | Add-ons page, pack details |
| 4.7 | Post-launch SEO audit (Phase 3) | `deferred` | Document results in tracker | Comparison table, upgrade paths |

---

## Phase 5 – Communications & Training ⏸️ DEFERRED

> **Note**: Phase 5 tasks are external communications tasks that require checkout to be functional first.

| ID | Task | Status | Verification | Notes |
|----|------|--------|--------------|-------|
| 5.1 | Draft customer announcement email | `deferred` | Marketing + legal review | Pending Phase 6 completion |
| 5.2 | Send test batch to internal staff | `deferred` | Confirm formatting | Pending Phase 6 completion |
| 5.3 | Update knowledge base articles | `deferred` | Remove "Smart Lead", "Smart Growth" refs | Pending Phase 6 completion |
| 5.4 | Update sales sheets and FAQs | `deferred` | Remove outdated references | Pending Phase 6 completion |
| 5.5 | Conduct sales/support training session | `deferred` | Team can explain new structure | Pending Phase 6 completion |

---

## Phase 6 – Checkout Implementation 🚧 IN PROGRESS

> **Authority**: `docs/Detail-Checkout-design-v5.2.md` (Comprehensive End-to-End Spec)  
> **Supersedes**: v5.0, v5.1 specs

### Architecture Summary (v5.2)

```
    ┌─────────────────────┐
    │  User's Browser     │
    │ (everintent.com)    │
    └─────────────────────┘
              │ 1. Navigate to /checkout/[tier]
              ▼
    ┌─────────────────────┐
    │  React/SSG Frontend │
    │  3-Step Checkout    │
    │  (sessionStorage)   │
    └─────────────────────┘
              │ 2. POST to start-checkout
              ▼
    ┌─────────────────────┐
    │  Edge Function      │
    │  start-checkout     │
    │  • Save Supabase    │
    │  • Upsert GHL       │
    │  • Apply Tags       │
    │  • Return URL       │
    └─────────────────────┘
              │ 3. window.location.href redirect
              ▼
    ┌─────────────────────┐
    │  GHL SaaS Checkout  │
    │  (Stripe Payment)   │
    └─────────────────────┘
              │ 4. Payment + Provisioning
              ▼
    ┌─────────────────────┐
    │  GHL Workflows      │
    │  (Onboarding)       │
    └─────────────────────┘
```

### Existing Assets

| Asset | Path | Status | Notes |
|-------|------|--------|-------|
| `checkout_submissions` table | Supabase | ✅ Ready | Columns: name, email, phone, company, service_interest, tcpa_consent, ghl_* sync fields, UTM fields |
| `start-checkout` edge function | `supabase/functions/start-checkout/index.ts` | ⚠️ Needs Update | Currently saves + syncs but does NOT return GHL redirect URL |
| GHL Client library | `supabase/functions/_shared/ghlClient.ts` | ✅ Ready | Has `upsertContact`, `addTags`, `addNote`, `TIER_TAG_MAP` |
| GHL secrets | Supabase Secrets | ✅ Ready | `GHL_API_TOKEN`, `GHL_LOCATION_ID` configured |
| Contact page | `src/pages/Contact.tsx` | ✅ Separate | Will remain inquiry-only (no checkout logic) |
| Form components | `src/components/ui/form.tsx` | ✅ Ready | react-hook-form + zod integration |

### Design Principles (v5.2 Section 2)

1. **Clarity** – Progress indicator (●○○) shows current step; clear headings guide user
2. **Minimal Friction** – Only essential fields; optional message at end
3. **Instant Feedback** – Real-time pricing updates; inline validation errors
4. **Recoverability** – sessionStorage persists state; resume links for abandonment
5. **Consistency** – Dark/purple/yellow theme; no GHL UI mixing
6. **Separation of Concerns** – React components vs Edge Function vs GHL API
7. **Accessibility** – Semantic HTML, ARIA attributes, keyboard navigation
8. **Security** – No card details on our servers; Stripe via GHL only
9. **Observability** – Analytics instrumentation for conversion tracking
10. **Scalability** – Adding tiers/add-ons requires minimal code changes

### SSG Route Structure

Pre-generated static routes (no dynamic `[tier]` params):

| Route | Tier Pre-Selected | Product Line |
|-------|-------------------|--------------|
| `/checkout/launch` | Launch | Smart Websites |
| `/checkout/capture` | Capture | Smart Websites |
| `/checkout/convert` | Convert | Smart Websites |
| `/checkout/scale` | Scale | Smart Websites |
| `/checkout/after-hours` | After-Hours | AI Employee |
| `/checkout/front-office` | Front Office | AI Employee |
| `/checkout/full-ai` | Full AI Employee | AI Employee |
| `/checkout/web-chat-only` | Web Chat Only | AI Employee |

### 3-Step User Journey (v5.2 Section 4)

#### Step 1: Plan & Add-On Selection

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Progress: ●○○                                                          │
│  Step 1 of 3 – Choose Your Plan & Add-Ons                               │
├─────────────────────────────────────────────────────────────────────────┤
│  Plan Card:                                                             │
│   ┌───────────────────────────────────────────────┐                     │
│   │ Plan:  [Capture ▼]  ← Dropdown (resets addons)│                     │
│   │ Price: $97/mo                                 │                     │
│   │ Features: • Missed Call Text Back             │                     │
│   │           • Unlimited Forms & Calendars       │                     │
│   └───────────────────────────────────────────────┘                     │
│                                                                          │
│  Add-On Options: (grid of selectable cards)                             │
│   ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐           │
│   │ □ Email Authority│ │ ☑ Get Paid Now │ │ □ AI Voice Chat │           │
│   │   $49/mo         │ │   $49/mo        │ │   $79/mo        │           │
│   └─────────────────┘ └─────────────────┘ └─────────────────┘           │
│   ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐           │
│   │ □ Social Autopilot│ │ □ Omnichannel │ │ □ Unlimited AI  │           │
│   │   $79/mo          │ │   $99/mo       │ │   $149/mo       │           │
│   └─────────────────┘ └─────────────────┘ └─────────────────┘           │
│                                                                          │
│  Order Summary:                                                          │
│   Plan: Capture               $97/mo                                     │
│   + Get Paid Now              $49/mo                                     │
│   ────────────────────────────────────                                   │
│   Monthly Total              $146/mo                                     │
│                                                                          │
│  [Back to Plan Page] [Continue →]                                        │
└─────────────────────────────────────────────────────────────────────────┘
```

**Critical Behaviors:**
- **Tier Dropdown Change → RESET all selected add-ons** (per v5.2 Section 4.1.2)
- Add-on cards use accessible checkboxes with visual highlight on selection
- Order summary updates dynamically on every selection
- State persisted to sessionStorage on each change

#### Step 2: Contact Details Form

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Progress: ○●○                                                          │
│  Step 2 of 3 – Provide Your Details                                     │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────┬───────────────────┐                              │
│  │ First Name *      │ Last Name *       │                              │
│  │ [_______________] │ [_______________] │                              │
│  └───────────────────┴───────────────────┘                              │
│  ┌───────────────────┬───────────────────┐                              │
│  │ Email *           │ Phone *           │                              │
│  │ [_______________] │ [_______________] │                              │
│  └───────────────────┴───────────────────┘                              │
│  ┌─────────────────────────────────────────┐                            │
│  │ Business Name *                         │                            │
│  │ [_______________________________________]│                            │
│  └─────────────────────────────────────────┘                            │
│                                                                          │
│  Domain Question: (radio buttons)                                        │
│  ○ Yes, I have a domain  → [Domain input appears]                        │
│  ○ No, I need help getting one                                           │
│                                                                          │
│  ┌─────────────────────────────────────────┐                            │
│  │ Message (optional)          [123/500]   │ ← Character counter         │
│  │ [_______________________________________]│                            │
│  └─────────────────────────────────────────┘                            │
│                                                                          │
│  ☐ I agree to receive communications from EverIntent.                    │
│    View our Privacy Policy. *                                            │
│                                                                          │
│  [← Back]                        [Review Your Order →]                   │
└─────────────────────────────────────────────────────────────────────────┘
```

**Critical Behaviors:**
- **Domain Radio Pattern**: "Yes" reveals domain input; "No" hides it (v5.2 Section 4.2.1)
- **Message Field**: 500 character limit with visible counter (v5.2 Section 4.2.1)
- Inline validation with red borders + error messages on blur
- TCPA checkbox required before proceeding
- Back button preserves all Step 1 + Step 2 data

**Validation Rules (v5.2 Section 4.2.2):**
```javascript
// Email: must include @ and domain
/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/i

// Phone: 7-15 chars, digits/spaces/parentheses/plus/hyphens
/^[0-9()+\s-]{7,15}$/

// Domain (if hasDomain=true): must include dot and TLD
/^(?=.*\.)[^\s]+\.[a-zA-Z]{2,}$/i
```

#### Step 3: Review & Confirm

```
┌─────────────────────────────────────────────────────────────────────────┐
│  Progress: ○○●                                                          │
│  Step 3 of 3 – Review & Confirm                                         │
├─────────────────────────────────────────────────────────────────────────┤
│  ┌───────────────────────────┬───────────────────────────┐              │
│  │ Your Plan          [Edit] │ Your Details       [Edit] │              │
│  │ ────────────────────────  │ ────────────────────────  │              │
│  │ Capture            $97/mo │ Name: Jane Smith          │              │
│  │ + Get Paid Now     $49/mo │ Email: jane@company.com   │              │
│  │                           │ Phone: (555) 123-4567     │              │
│  │ Monthly: $146/mo          │ Business: Acme LLC        │              │
│  │                           │ Domain: (none)            │              │
│  │                           │ TCPA: ✓                   │              │
│  └───────────────────────────┴───────────────────────────┘              │
│                                                                          │
│  Legal Notice:                                                           │
│  "By clicking Complete Checkout you will be redirected to our secure    │
│   payment page. Your purchase is handled by EverIntent (powered by      │
│   Stripe) and subject to our Terms of Service."                         │
│                                                                          │
│  [← Back to Details]              [Complete Checkout →]                  │
└─────────────────────────────────────────────────────────────────────────┘
```

**Critical Behaviors:**
- **[Edit] links navigate directly to Step 1 or Step 2** with state preserved (v5.2 Section 4.3.2)
- **Client-side total verification** before calling edge function (v5.2 Section 8)
- "Complete Checkout" shows loading spinner + disables button during submission
- On success: `window.location.href = redirectUrl`
- On error: Toast message, button re-enabled, data preserved

### Session Persistence (v5.2 Section 4.4)

```typescript
interface CheckoutState {
  tier: string;                    // 'capture', 'convert', etc.
  addOns: string[];                // ['get-paid-now', 'ai-voice-chat']
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  hasDomain: boolean;
  domainName: string;
  message: string;
  tcpaConsent: boolean;
  currentStep: 1 | 2 | 3;
}

// Persist on every change
sessionStorage.setItem('checkout_state', JSON.stringify(state));

// Restore on page load (if tier matches URL)
const saved = sessionStorage.getItem('checkout_state');
```

### Abandonment & Recovery (v5.2 Section 4.4)

1. **sessionStorage** – Covers same-session tab close/refresh
2. **Supabase `status='pending'`** – Records saved before redirect
3. **Recovery Links** – `?resume=abc123` query param to restore from Supabase
4. **Follow-up Automation** – Scheduled function sends reminder after 30 min abandonment

### Tagging Schema (v5.2 Section 1.5)

```typescript
// Tier Tags
const TIER_TAGS = {
  'launch': 'EI: Tier – Launch',
  'capture': 'EI: Tier – Capture',
  'convert': 'EI: Tier – Convert',
  'scale': 'EI: Tier – Scale',
  'after-hours': 'EI: Tier – After-Hours',
  'front-office': 'EI: Tier – Front Office',
  'full-ai': 'EI: Tier – Full AI Employee',
  'web-chat-only': 'EI: Tier – Web Chat Only',
};

// Add-On Tags
const ADDON_TAGS = {
  'email-authority': 'EI: AddOn – Email Authority',
  'get-paid-now': 'EI: AddOn – Get Paid Now',
  'ai-voice-chat': 'EI: AddOn – AI Voice Chat',
  'social-autopilot': 'EI: AddOn – Social Autopilot',
  'omnichannel-inbox': 'EI: AddOn – Omnichannel Inbox',
  'unlimited-ai': 'EI: AddOn – Unlimited AI',
};

// Lifecycle Tags
const LIFECYCLE_TAGS = {
  'EI: Checkout – [tier]',  // Applied on checkout start
  'EI: Redirected',         // Applied after URL returned
  'EI: Paid',               // Applied by GHL on payment
  'EI: Onboarding Complete',
  'EI: Active Customer',
};
```

### GHL Redirect URL Format

```
https://go.everintent.com/[tier]
  ?first_name={firstName}
  &last_name={lastName}
  &email={email}
  &phone={phone}
  &company_name={businessName}
```

### Pipeline Stages (v5.2 Section 1.5)

1. **Pre-Checkout** – Contact started checkout, not yet redirected
2. **Payment Pending** – Redirected to GHL checkout, awaiting payment
3. **Paid – Onboarding** – Payment complete, snapshot provisioning starts
4. **Snapshot Applied** – Snapshot applied, onboarding forms/calls
5. **Active Customer** – Fully onboarded

### Scenario Categories (v5.2 Section 5.1)

| Code | Scenario | Description |
|------|----------|-------------|
| SC1 | Baseline | Single plan, no add-ons, completes purchase |
| SC2 | Add-Ons Selected | Plan + 1-6 add-ons, completes purchase |
| SC3 | Plan Change Mid-Flow | Changes tier in Step 1 dropdown (add-ons reset) |
| SC4 | Edit Details | Reviews order, clicks Edit, changes data, re-confirms |
| SC5 | Abandon & Return | Abandons at Step 2/3, returns via history or recovery email |
| SC6 | Multi Add-On Toggle | Toggles multiple add-ons to see pricing effects |
| SC7 | Ineligible Add-Ons | Tries to select unavailable add-on for tier |
| SC8 | AI Employee Plans | After-Hours, Front Office, Full AI Employee flows |
| SC9 | Full Bundle | Highest tier with all add-ons |

### Tasks

> **Batch Legend:** B1 = Done · B2 = UI Steps · B3 = Schema + Backend · B4 = Integration · B5 = CTA Routing · B6 = Polish · B7 = QA

| ID | Task | Status | Batch | Verification | Notes |
|----|------|--------|-------|--------------|-------|
| 6.1 | Create SSG checkout routes | `done` | B1 | Routes exist: `/checkout/launch`, `/checkout/capture`, etc. | 8 static routes (4 Smart Websites + 4 AI Employee) |
| 6.2 | Build CheckoutPage component | `done` | B1 | Page renders with 3-step progress indicator | Shared component, tier passed as prop |
| 6.3 | Build Step 1: Plan & Add-On Selection | `done` | B1 | Tier selector resets add-ons; cards toggle; summary updates | Per v5.2 §4.1 wireframe; confirmation card + Change button with filtered two-tab selector |
| 6.6 | Build OrderSummary component | `done` | B1 | Dynamic pricing: tier + add-ons = monthly + setup totals | Reusable across steps; sticky sidebar desktop, top on mobile |
| 6.16 | Expand admin theme editor with e-commerce color selectors | `deferred` | B7 | Admin CRUD UI gains additional color slots (e-commerce gold, CTA variants, pricing highlights, etc.) stored in `site_themes` schema and published via the existing GitHub pipeline | **NOT a CSS fix.** The current `--gold` bypass was wiped out by the Feb 10 theme republish — **correctly**, because the admin CRUD publish pipeline is the single source of truth for all production CSS. **CRITICAL RULE: No color or styling changes may be made directly in code (index.css, themes.ts, or components). All color channels must flow exclusively through the admin theme editor → `site_themes` DB → `sync-theme-to-github` Edge Function → production CSS.** The Feb 9 incident proved that any hand-coded CSS bypasses (e.g., `--gold` variable, inline color overrides) will be overwritten on the next theme publish, causing regressions. This task must: (1) Add dedicated gold/e-commerce color fields to the `site_themes` schema, (2) Add corresponding UI controls in the admin theme editor, (3) Update the publish pipeline to emit the new variables into `index.css` and `themes.ts`, (4) Only then update checkout components to consume the new design tokens. Depends on the admin theme CRUD editor being functional first. Deferred until all functional tasks are complete; requires manual design intervention — AI is not authorized to make aesthetic color decisions. |
| 6.4 | Build Step 2: Contact Details Form | `done` | B2 | First/last name, email, phone, business name, domain radio (Yes→domain input / No→hide), 500-char message counter, TCPA consent checkbox with privacy link, inline validation (red border + error msg + scroll-to-first), "Back" returns to Step 1, "Review Your Order" validates and advances | Per v5.2 §4.2 wireframe. Validation patterns: email regex, phone 7-15 digits, domain must include dot+TLD. Toggle domain radio preserves value in state but omits from payload if hasDomain=false. |
| 6.5 | Build Step 3: Review & Confirm | `done` | B2 | Two-column summary (Plan & Add-Ons / Contact Details); [Edit Plan & Add-Ons] → Step 1; [Edit Details] → Step 2; state preserved on edit navigation; legal notice text per v5.2 §4.3.1; "Complete Checkout" button with disabled+spinner state during submission; "Back to Details" returns to Step 2; error toast on failure with retry | Per v5.2 §4.3 wireframe. Legal text: "By clicking Complete Checkout you will be redirected to our secure payment page. Your purchase is handled by EverIntent (powered by Stripe) and subject to our Terms of Service." |
| 6.7 | Implement sessionStorage persistence | `done` | B2 | All fields (tier, addons, firstName, lastName, email, phone, businessName, hasDomain, domainName, message, tcpaConsent) survive: back/forward nav, tab refresh, Step 1↔2↔3 transitions | Per v5.2 §4.2.3 & §4.4. Use `checkout_state` key. Load on mount via useEffect, save on every field change. |
| 6.18 | Add-on eligibility matrix | `done` | B2 | Add-ons included in a tier show "Included" badge instead of checkbox; unavailable add-ons are disabled with explanation | Per v5.2 SC7. E.g., Full AI Employee includes Unlimited AI and AI Voice Chat — these show as "Included" not selectable. Scale includes Unlimited AI. Eligibility map lives in `checkoutConfig.ts`. |
| 6.19 | Step 1 "Back" button routes to plan's marketing page | `done` | B2 | Clicking "Back" on Step 1 navigates to the tier's detail page (e.g., `/checkout/capture` → `/smart-websites/smart-lead`) | Per v5.2 §4.1 wireframe: grey "Back" button returns to the plan's marketing page. Mapping defined in `checkoutConfig.ts`. Uses native `<a>` tag. |
| 6.20 | Supabase schema migration for checkout v5.2 | `done` | B3 | `checkout_submissions` table has: `first_name`, `last_name` (split from `name`), `has_domain` (boolean), `domain_name` (text), `addons` (jsonb), `tier` (text), `redirect_url` (text), `utm` (jsonb), `status` (text: pending/redirected/paid/failed) | Per v5.2 §1.3. Current table uses single `name` field and is missing domain, addons, tier, redirect_url, and utm columns. **Must run migration before backend tasks.** |
| 6.8 | Update start-checkout edge function | `done` | B3 | Accepts full v5.2 payload; validates all required fields server-side; saves to Supabase with `status='pending'`; upserts GHL contact via ghlClient; applies tier + add-on tags; creates GHL note with order summary; constructs redirect URL (`https://go.everintent.com/[tier]?first_name=...&last_name=...&email=...&phone=...&company=...`); returns `{ success, id, redirect_url }` | Per v5.2 §1.4, §3.3, §4.3.2. Must handle: missing fields → 400, GHL API failure → log to `ghl_error` + return user-friendly error, timeout → generic error. Redirect URL format per GHL SaaS checkout query params. |
| 6.9 | Update ghlClient.ts with v2.2 tags + note creation | `done` | B3 | TIER_TAGS map (8 tiers with en-dash), ADDON_TAGS map (6 add-ons with en-dash), `createNote()` function that writes order summary to contact | Per v5.2 §1.5. Tag format: `EI: Tier – [Name]`, `EI: AddOn – [Name]`. Note must include: tier, add-ons list, monthly total, setup fee, domain info, message. |
| 6.10 | Implement client-side total verification | `done` | B4 | Before calling start-checkout, front-end recalculates monthly + setup totals from checkoutConfig and compares to displayed values; abort with error if mismatch | Per v5.2 §8. Prevents data integrity issues from stale state or config drift. |
| 6.11 | Implement redirect after submission | `done` | B4 | On success: set button to loading → call start-checkout → receive redirect_url → `window.location.href = redirect_url`. On failure: re-enable button, show error toast, preserve all data | Per v5.2 §4.3.2. Loading state: button disabled + spinner + "Processing..." text. |
| 6.21 | UTM capture and propagation | `done` | B4 | On checkout page load, capture `utm_source`, `utm_medium`, `utm_campaign` from URL query params; store in sessionStorage alongside checkout_state; include in start-checkout payload; save to Supabase `utm` jsonb field | Per v5.2 §9. UTM params must survive the full Step 1→2→3 flow and be present in the final submission. |
| 6.17 | Full-site CTA & UX flow audit | `done` | B5 | Every purchase-intent CTA routes to `/checkout/[tier]`. Zero circular flows. Zero orphan CTAs to `/contact` for buying intent. `/contact` remains inquiry-only. | **10 page groups to audit:** (1) Smart Website tier pages (`/smart-websites/smart-site`, `/smart-lead`, `/smart-business`, `/smart-growth`); (2) AI Employee tier pages (`/let-ai-handle-it/after-hours`, `/front-office`, `/full-ai-employee`); (3) `/compare-websites` – all "Choose [Tier]" buttons; (4) `/compare-ai-employee` – all "Choose [Plan]" buttons; (5) `/pricing` – both tabs, all tier card CTAs; (6) `/smart-websites/add-ons` hub – all "Add to Plan" buttons; (7) Recommended Add-Ons sections on tier pages; (8) `/industries/*` showcase CTAs; (9) Homepage: hero, PricingTeaser, FinalCTA; (10) Scale→After-Hours upsell. **Supersedes 6.12 and 6.13.** |
| 6.12 | ~~Update tier page CTAs to checkout~~ | `replaced` | — | — | **Replaced by 6.17** (full-site CTA audit). |
| 6.13 | ~~Update comparison page CTAs~~ | `replaced` | — | — | **Replaced by 6.17** (full-site CTA audit). |
| 6.22 | Accessibility audit for checkout flow | `done` | B6 | ARIA labels, aria-required, aria-invalid, aria-describedby, aria-busy, role attributes, focus-visible rings, autoComplete, sr-only labels, fieldset/legend, semantic main/aside | All 3 steps + OrderSummary + CheckoutProgress updated. |
| 6.14 | Implement resume link handling | `done` | B6 | `?resume=[id]` fetches pending record from Supabase, pre-populates all fields, jumps to Step 3; expired/missing records show toast and start fresh | Loading spinner during fetch. Graceful error handling. |
| 6.23 | Analytics & conversion event instrumentation | `done` | B6 | checkout_started, plan_changed, addon_toggled, details_completed, checkout_submitted, checkout_redirected fired to window.dataLayer | src/lib/checkoutAnalytics.ts helper module. |
| 6.24 | **Sales Infrastructure (Matrix v1.3)** | `todo` | B6 | Abandoned cart, affiliate tracking, chat pipeline integration | Expanded into sub-tasks 6.24.1–6.24.7 below. Authority: `docs/e-commerce-feature-matrix-v1.2.md` (now v1.3) |
| 6.24.1 | GHL prep: verify tags, pipeline, Affiliate ID custom field | `done` | B6 | All 29 `EI:` tags confirmed; 5-stage Checkout Pipeline confirmed; `EI: Chat – Inquiry` present | **Phase 0.** Verified 2026-02-10 via ChatGPT GHL audit. **Remaining:** (1) Verify/create GHL custom field `Affiliate ID` → capture field ID as `GHL_AFFILIATE_FIELD_ID` secret. (2) Create `EI: Chat – High Intent` tag in GHL (needed for GHL-CH2 escalation). (3) Confirm at least 1 SaaS checkout page exists at `go.everintent.com/[tier]` with query param pre-fill (GHL-C1/C4). |
| 6.24.2 | DB migration: add `affiliate_id` TEXT to 3 tables | `todo` | B6 | `checkout_submissions`, `form_submissions`, `job_applications` each get nullable `affiliate_id` column | **Phase 1.** Must be approved + executed before 6.24.5. ~45 min. |
| 6.24.3 | Build `useAffiliateTracking` hook + cookie utility | `todo` | B6 | React hook reads `?ref=` param → sets `ei_affiliate` first-party cookie (90-day expiry); cookie reader utility for POST body inclusion | **Phase 2.** No backend dependency — can run in parallel with 6.24.2. Integrate into `Layout.tsx`. ~1.5–2 hours. |
| 6.24.4 | `start-checkout`: add `EI: Checkout – Pending` tag | `todo` | B6 | Fire-and-forget tag applied at session start; enables GHL recovery workflow | **Phase 3a.** Matrix feature 1.1. ~30 min. |
| 6.24.5 | All 3 edge functions: affiliate `affiliate_id` passthrough + `EI: Affiliate – [ID]` tag + reconcile ghlClient.ts legacy tags | `todo` | B6 | `start-checkout`, `submit-form`, `submit-job-application` accept `affiliate_id` in POST body → save to DB column → apply GHL tag. **Prerequisite:** ghlClient.ts must be updated to v2.2 en-dash tag names first (see matrix Section 10 "Critical Gap"). | **Phase 3b.** Depends on 6.24.2 (DB columns) + 6.24.3 (cookie reader). Matrix features 2.2, 2.3. ~3.5 hours. |
| 6.24.6 | GHL workflows: recovery (30m), expiry (7d), affiliate dashboard, commission rules | `todo` | B6 | GHL-only config: trigger on `Pending` tag → send SMS/email with `?resume=[id]`; 7-day expiry removes `Pending` + applies `Expired`; Affiliate Manager setup | **Phase 4.** No site code — assign to GHL specialist. Can begin after 6.24.1. Matrix features 1.2, 1.5, 1.6, 2.5, 2.7, 2.8. ~8.5 hours GHL config. |
| 6.24.7 | End-to-end validation: 5 scenarios (abandon/recover, affiliate, chat→pipeline, cart expiry, Stripe→onboarding) | `todo` | B7 | SC1: anon→checkout→abandon→recover→pay. SC2: `?ref=PARTNER123`→form→affiliate tag+commission. SC3: chat→`EI: Chat – Inquiry`→Pre-Checkout→checkout→affiliate preserved. SC4: 7-day expiry→`EI: Checkout – Expired`. SC5: Stripe payment→`EI: Paid`→onboarding. | **Phase 5.** Matrix Section 7 test scenarios (expanded to 5 per ChatGPT review). Run on everintent.com production. |
| 6.15 | QA: All 9 scenario categories | `todo` | B7 | Test SC1 (baseline), SC2 (add-ons), SC3 (plan change mid-flow), SC4 (edit details from review), SC5 (abandon & return), SC6 (multi add-on toggle), SC7 (ineligible add-ons), SC8 (AI Employee plans), SC9 (full bundle) | Cross-browser (Chrome, Firefox, Safari, mobile). Verify: sessionStorage persistence, gold styling, GHL redirect URL format, tag application, Supabase record creation, UTM propagation. |

### Error Handling (v5.2 Section 8)

| Scenario | Handling |
|----------|----------|
| Missing required field | Red border + inline error; scroll to first error; prevent navigation |
| Invalid email/phone/domain | Regex validation; descriptive error message |
| Network failure on submit | Toast error; button re-enabled; data preserved |
| Mismatched totals | Client verifies totals before submission; abort if mismatch |
| GHL API failure | Log to Supabase `ghl_error`; return user-friendly error |
| Timeout | "Something went wrong. Please try again or contact support." |

---

## GHL Tag Updates Required

The `ghlClient.ts` TIER_TAG_MAP needs these additions for v2.2:

```typescript
// v2.2 tier names (using en-dash per v5.2)
'launch': 'EI: Tier – Launch',
'capture': 'EI: Tier – Capture',
'convert': 'EI: Tier – Convert',
'scale': 'EI: Tier – Scale',
'after-hours': 'EI: Tier – After-Hours',
'front-office': 'EI: Tier – Front Office',
'full-ai': 'EI: Tier – Full AI Employee',
'web-chat-only': 'EI: Tier – Web Chat Only',

// Add-on pack tags
'email-authority': 'EI: AddOn – Email Authority',
'get-paid-now': 'EI: AddOn – Get Paid Now',
'ai-voice-chat': 'EI: AddOn – AI Voice Chat',
'social-autopilot': 'EI: AddOn – Social Autopilot',
'omnichannel-inbox': 'EI: AddOn – Omnichannel Inbox',
'unlimited-ai': 'EI: AddOn – Unlimited AI',
```

---

## Guardrails

| Rule | Description |
|------|-------------|
| **No Redirects** | SSG site; keep existing slugs, update displayed names only |
| **Consistent Styling** | Dark/purple/yellow color scheme; existing typography |
| **SEO/AEO Adherence** | Updated meta tags, meaningful alt text, proper headings |
| **Verification Required** | Every task includes verification step; only mark complete after staging test |
| **Product Separation** | Smart Websites and AI Employee remain distinct product lines |
| **Contact Page Separation** | `/contact` remains inquiry-only; checkout is `/checkout/[tier]` |
| **Session Persistence** | User can navigate back without losing data |
| **GHL-Exclusive** | Checkout uses GHL for payment; n8n excluded from checkout flow |
| **Native Anchor Tags** | SSG requires `<a>` tags for all navigation, not React Router `<Link>` |

---

## Phase 7 – Dynamic Theme System v2.0 🚧 IN PROGRESS

> **Authority**: `docs/BRD-theming-system-v2.0.md` (v2.0)  
> **Depends On**: Phase 6 completion (gold token system, checkout styling)  
> **Scope**: Fully database-driven theming with admin CRUD, 10 themes, light/dark mode, ADA accessibility, Style Modules, export/import

### Architecture Summary

Three-tier design token model (Primitive → Semantic → Component) with static-bake pipeline:
```
Admin DB → sync-theme-to-github Edge Function → Git commit → Vercel build → Static CSS
```

### Task Breakdown

#### Batch 1: Schema & Seed (7.1–7.6) ✅ COMPLETE

| ID | Task | Status | Deps | Notes |
|----|------|--------|------|-------|
| 7.1 | Add `component_tokens`, `typography_config`, `effects_config`, `default_mode` columns to `site_themes` | `done` | — | JSONB columns added; see BRD §5.1 for schema |
| 7.2 | Add `original_seed` column or `theme_seeds` table for revert system | `done` | — | Immutable snapshots for revert-to-original (§15) |
| 7.3 | Populate Indigo Night `dark_mode_overrides` with full dark token set | `done` | 7.1 | Complete set, not just overrides (§5.1) |
| 7.4 | Build hue-derived primitive generation function (SQL or Edge) | `done` | — | Algorithmic token generation from base hue (§3.3) |
| 7.5 | Seed 9 additional themes using primitive generator + store original seeds | `done` | 7.1, 7.2, 7.4 | 10 themes total (§8.1); store seeds for revert |
| 7.6 | Seed effects_config + ADA widget config defaults for all 10 themes | `done` | 7.5 | Transitions, hover, alerts, ADA visibility/icon (§14, §12) |

#### Batch 2: Pipeline Update (7.7–7.8) ✅ COMPLETE

| ID | Task | Status | Deps | Notes |
|----|------|--------|------|-------|
| 7.7 | Update `sync-theme-to-github` to emit dual-mode CSS + effects + ADA + Style Modules | `done` | 7.1 | `:root{}` light + `.dark{}` dark; flatten modules (§19.1). CSS generation in `generateProductionCss` now emits gold, CTA, typography, motion, and style module tokens. **FIX 2026-02-11**: Restructured to BRD §7.1 — `:root` now emits light-mode tokens, `.dark` emits dark-mode overrides. Previous version had `:root` = dark and `.dark` empty, causing light mode toggle to do nothing. Also tokenized `glow-text`, `::selection`, `font-family`, `transition-*` utilities. |
| 7.8 | Update `themes.ts` generation for new token structure + defaultMode | `done` | 7.7 | `ThemeConfig` interface includes `ecommerceColors`, `ctaVariants`, `typographyConfig`, `motionConfig`, `styleModules`, `defaultMode`. `applyThemeToRoot` consumes all new fields. |

#### Batch 3: Admin Core UI (7.9–7.14) ✅ COMPLETE

| ID | Task | Status | Deps | Notes |
|----|------|--------|------|-------|
| 7.9 | Admin: Base hue slider with live preview | `done` | 7.1 | Slider + number input + up/down buttons in Themes.tsx |
| 7.10 | Admin: Component token editors (sidebar, gold, shadows) | `done` | 7.1 | `EcommerceColorEditor.tsx` — gold, goldHover, goldGlow, goldForeground, pricingHighlight, CTA variants |
| 7.11 | Admin: Effects editor panel (transitions, hover, alerts, toasts) | `done` | 7.6 | `MotionEditor.tsx` — transitionSmooth, transitionBounce, transitionSpring |
| 7.12 | Admin: Typography config editor | `done` | 7.1 | `TypographyEditor.tsx` — fontHeading, fontBody, fontDisplay |
| 7.13 | Admin: Style Modules CRUD (create/edit/delete modules + tokens) | `done` | 7.1 | `StyleModulesEditor.tsx` — generic module/token CRUD flattened to `--module-{name}-{token}` |
| 7.14 | Admin: Default light/dark mode selector per theme | `done` | 7.1 | `DefaultModeSelector.tsx` — dark/light/system dropdown + FOUC prevention script in index.html |

#### Batch 4: Admin Advanced (7.15–7.20) ✅ COMPLETE

| ID | Task | Status | Deps | Notes |
|----|------|--------|------|-------|
| 7.15 | Admin: ADA widget config (visibility, pause/hide scheduling, device toggle) | `done` | 7.6 | Hide indefinitely, pause for duration, per-device (§12.3). Implemented in `AdaWidgetConfigEditor.tsx` |
| 7.16 | Admin: ADA icon customizer per theme (icon type, color, size, shape) | `done` | 7.15 | Configurable per base theme (§12.4). Integrated into `AdaWidgetConfigEditor.tsx` with live preview |
| 7.17 | Admin: Theme revert to original (2-layer warning + export escape hatch) | `done` | 7.2, 7.19 | 2-layer AlertDialog with "Export First" button. Reverts theme to `published_theme_configs` seed snapshot (`is_default = true`). If no default exists, prompts to use "Save as Default" first. |
| 7.17a | Admin: Write current theme as new default (2-layer warning + export seed) | `done` | 7.2, 7.19 | 2-layer AlertDialog with "Export First" button. Writes current config as new `published_theme_configs` row with `is_default = true`, `version = 0`. Deletes any previous default for the theme before inserting. |
| 7.18 | Admin: Real-time contrast checker for fg/bg token pairs | `done` | 7.10 | WCAG AA/AAA pass/fail badges with computed luminance ratios. Implemented in `ContrastChecker.tsx` — checks 10 fg/bg pairs with fail count badge on accordion header |
| 7.19 | Build theme export (JSON download — includes Style Modules) | `done` | 7.1 | Self-documenting schema v2.0 (§13). Export button in admin header downloads full theme JSON |
| 7.20 | Build theme import (file upload + validation + create/update) | `done` | 7.19 | Schema validation with error/warning display, create new or update existing mode, 500KB limit. Implemented in `ThemeImporter.tsx` |

#### Batch 5: Component Refactor & User-Facing (7.21–7.26) ✅ COMPLETE

| ID | Task | Status | Deps | Notes |
|----|------|--------|------|-------|
| 7.21 | Refactor `index.css` — replace all hardcoded HSL with tokens | `done` | 7.7 | `::selection` bg → `hsl(var(--accent) / 0.3)`, `.glow-text` → `hsl(var(--accent) / 0.5)`, `.text-gradient-light` first stop → `hsl(var(--foreground))`, 4× icon gradients (ocean/royal/sky/electric) → component tokens (BRD §4.3.6–4.3.7) |
| 7.21a | Define `--secondary-accent` CSS variable in `index.css` | `done` | 7.7 | Defined as `200 100% 50%` in `:root` |
| 7.21b | Define `--gold-foreground` CSS variable | `done` | 7.7 | Defined as `0 0% 100%` in `:root` |
| 7.21c | Tokenize `pulse-glow` keyframe in `tailwind.config.ts` | `done` | 7.21 | Now references `hsl(var(--gold) / ...)` |
| 7.21d | Convert typography to CSS variables (`--font-heading`, `--font-body`, `--font-mono`) | `done` | 7.12 | Body uses `var(--font-body)`, headings use `var(--font-heading)` |
| 7.21e | Convert motion transitions to CSS variables (`--transition-smooth`, `--transition-bounce`, `--transition-spring`) | `done` | 7.11 | Utility classes now reference `var(--transition-*)` CSS variables |
| 7.22 | Refactor `.tsx` components — replace hardcoded colors/transitions | `done` | 7.21 | Tokenized: `AIEmployee.tsx` icon colors → `text-intent-blue`/`text-highlight`/`text-accent`; `FrontOffice.tsx` green status → `highlight` tokens; `SocialProofBar.tsx` / `Industries.tsx` SVG gradients → `var(--accent)`/`var(--intent-blue)`/`var(--secondary-accent)`; `TranscriptCard.tsx` green → `text-highlight`; `IndustryShowcaseTemplate.tsx` active dot → `bg-highlight`. SmartLead/SmartBusiness/SmartGrowth already used `shadow-gold-glow` token. CaseStudyLayout already tokenized. **EXEMPT:** PortfolioCard, DashboardPreview, SMSDemo, browser chrome dots. |
| 7.23 | Migrate demo elements (SMSDemo, etc.) to theme tokens / Style Modules | `done` | 7.13, 7.22 | All non-exempt demo elements already tokenized. SMSDemo.tsx and RealisticDashboards.tsx remain exempt per BRD §4.6. |
| 7.24 | Implement user-facing light/dark mode toggle (header + mobile + `<head>` script) | `done` | 7.7 | `ModeToggle.tsx` component added to desktop header (compact pill) and mobile menu (expanded). FOUC script in `index.html` reads `localStorage('theme-mode')`. **FIX 2026-02-11**: Light mode was non-functional because `index.css` had dark values in `:root` with empty `.dark`. Restructured per BRD §7.1: `:root` = light tokens, `.dark` = dark overrides. Toggle now works correctly — removing `.dark` class reveals light-mode variables. `generateProductionCss` in Themes.tsx updated to emit same structure so GitHub publish preserves light mode. `ModeToggle.tsx` triggers `applyThemeToRoot()` via `requestAnimationFrame` on mode switch to keep inline styles in sync. |
| 7.24a | Seed light-mode palette from dark theme hue | `done` | 7.24 | DB migration seeded `static_colors` with professional light palette (white bg, dark navy text, refined indigo accents). `darkModeOverrides` populated with original dark values. `themes.ts` updated to reflect new schema. |
| 7.24b | Refine light theme aesthetics | `done` | 7.24a | Polished `index.css` light palette: warmer cool-gray bg (`220 20% 97%`), deeper primary (`222 47% 16%`), richer accent (`247 80% 56%`), navy-tinted shadows, cohesive gradients. |
| 7.24c | Add `DarkModeOverridesEditor` admin component | `done` | 7.24 | New `DarkModeOverridesEditor.tsx` admin panel for editing `dark_mode_overrides` JSONB column with HSL controls and "Copy from Base" utility. Wired into admin save/export/import flows. |
| 7.24d | Make `applyThemeToRoot()` mode-aware | `done` | 7.24 | `applyThemeToRoot` now checks `.dark` class on `<html>` and conditionally applies `staticColors` (light) or `darkModeOverrides` (dark). |
| 7.25 | Implement ADA accessibility widget (floating panel + pause/hide + icon + draggable) | `done` | 7.7, 7.15 | 5 controls: larger text, high contrast, reduced motion, link underlines, focus highlight (§12.2). Draggable on desktop + mobile with localStorage position persistence (§12.2.1) |
| 7.25a | Add ADA CSS override rules | `done` | 7.25 | **FIX 2026-02-11**: Widget was toggling CSS classes on `<html>` but NO CSS rules existed for them. Added all 5 rulesets: `ada-large-text` (125% font-size), `ada-high-contrast` (WCAG AAA black/white overrides), `ada-reduced-motion` (disable all animations), `ada-underlines` (force link underlines), `ada-focus-highlight` (3px yellow focus rings with glow). |
| 7.25b | Add user-side widget hiding (AccessiBe pattern) | `done` | 7.25 | "Hide for this session" (sessionStorage), "Hide for 24 hours" (localStorage timestamp), "Hide permanently" (localStorage). Expandable menu in widget footer. User must clear cache to restore after permanent hide. |
| 7.26 | Wire alert/toast/modal variants to effects tokens | `done` | 7.6, 7.22 | Added `success` (highlight), `warning` (gold), `info` (accent) variants to `toastVariants` in `toast.tsx`. Dialog/Sheet already fully tokenized. |

#### Batch 6: Seed & QA (7.27–7.30)

| ID | Task | Status | Deps | Notes |
|----|------|--------|------|-------|
| 7.27 | Seed initial Style Modules (checkout-progress, comparison-grid, sms-demo) | `done` | 7.5, 7.13 | Pre-built modules for key components (§16.2). Seeded all 10 themes with hue-adaptive tokens. |
| 7.27a | Pipeline emission: generateProductionCss + applyThemeToRoot emit --module-* vars | `done` | 7.27 | Already wired in Themes.tsx (lines 1018-1024) and themes.ts (lines 367-374). No changes needed. |
| 7.27b | Wire CheckoutProgress.tsx to consume --module-checkout-progress-* vars | `done` | 7.27a | All 12 tokens mapped: step-active/complete/inactive bg/fg/border, connector-active/inactive, label-active/inactive. Semantic fallbacks preserved. |
| 7.27c | Wire CompareWebsites.tsx to consume --module-comparison-grid-* vars | `todo` | 7.27a | Replace semantic tokens with module vars + fallbacks |
| 7.28 | Full QA: all 10 themes × both modes × ADA states × Style Modules | `todo` | 7.24, 7.25, 7.27c | Light + dark mode across all themes |
| 7.29 | Export → edit → re-import round-trip validation test | `todo` | 7.20 | JSON schema integrity check |
| 7.30 | Revert-to-original round-trip validation test | `todo` | 7.17 | Verify seed restored correctly |

#### Phase 7 Comprehensive Testing (7.QA)

| ID | Task | Status | Deps | Notes |
|----|------|--------|------|-------|
| 7.QA | **TEAM TESTING: Full Phase 7 Regression & Acceptance Testing** — The entire Phase 7 theme system (Batches 1–6: schema seeding, CSS pipeline, admin CRUD editors, contrast checker, theme import/export, revert-to-default, save-as-default, ADA widget with draggable positioning, Style Modules, light/dark mode toggle, component refactor, and full QA) must be thoroughly tested by the team before Phase 7 is marked complete. This includes: (1) verifying all 10 seeded themes render correctly in both light and dark modes, (2) testing every admin editor (hue slider, accent config, static colors, gradients, GHL chat config, e-commerce colors, CTA variants, typography, motion, Style Modules, ADA widget config, default mode selector), (3) confirming theme export downloads valid JSON and re-imports correctly, (4) testing revert-to-default with 2-layer warning flow and verifying seed snapshot restores, (5) testing save-as-default and confirming new snapshot overwrites old, (6) verifying contrast checker displays correct WCAG AA/AAA pass/fail badges, (7) testing ADA accessibility widget controls (font size, contrast, motion, dyslexia, underlines, focus) and draggable positioning with localStorage persistence, (8) confirming publish-to-production pipeline generates correct CSS and TypeScript config, (9) verifying no hardcoded colors remain in tokenized components. **Any failures during testing may result in reopening individual tasks from Batches 1–6 for remediation.** | `todo` | All Phase 7 tasks | This task exists because AI development sessions have limited memory context. The full list of features and expected behaviors is documented here so testers know exactly what to validate without relying on conversational history. |

---

## Phase 8 – Platform Module Architecture 📋 PLANNED

> **Authority**: This tracker section (sole source of truth)
> **Depends On**: Phase 7 Batch 6 completion (theme system is first conforming module)
> **Scope**: Modular, plugin-based admin architecture where features self-register via a central registry

### Design Intent

Transform the admin shell from a hardcoded monolith into a dynamic host that discovers features at runtime via a plugin registry. Each feature (Themes, Submissions, Portfolio, Testimonials, Playground) becomes a self-contained module with its own routes, navigation items, and data layer. The admin dashboard, sidebar, and routing are generated entirely from registered modules — adding a new feature requires zero changes to the host shell.

This architecture is designed for **portability**: the registry (`src/modules/registry.ts`) and type contract (`src/modules/types.ts`) can be copied into any React Router + Supabase project to bootstrap the same plugin system.

### Architecture Summary

```
src/modules/
├── types.ts              # ModuleDefinition interface + ModuleCategory enum
├── registry.ts           # registerModule() + getModules() + getModule()
├── index.ts              # Barrel — imports all modules to trigger self-registration
├── themes/index.ts       # Theme module (first conforming module)
├── submissions/index.ts  # Submissions module
├── portfolio/index.ts    # Portfolio module
├── testimonials/index.ts # Testimonials module
└── playground/index.ts   # Playground module
```

**Plugin Contract (`ModuleDefinition`):**
```typescript
interface ModuleDefinition {
  id: string;                    // Unique identifier (e.g., "themes")
  name: string;                  // Human-readable display name
  description: string;           // Purpose description
  version: string;               // Semantic version
  navItems: ModuleNavItem[];     // Admin navigation entries (label, path, icon, category)
  routes: RouteObject[];         // React Router routes (relative to /admin/)
  enabled?: boolean;             // Toggle module on/off
}
```

**Module Categories:** Content, Appearance, Commerce, Settings, Tools

**Admin Shell Consumption:**
- `Dashboard.tsx` calls `getModules()` and renders cards from `navItems`
- `routes.tsx` calls `getModules()` and flattens `routes` into admin route tree, wrapped in `AdminGuard`
- Adding a module: create `src/modules/<name>/index.ts` → call `registerModule()` → add import to `src/modules/index.ts`

### Feature Breakdown

| Feature | Description | Status |
|---------|-------------|--------|
| Plugin contract types | `ModuleDefinition`, `ModuleNavItem`, `ModuleCategory` enum | ✅ Implemented |
| Central registry | `registerModule()`, `getModules()`, `getModule()` with duplicate-ID detection | ✅ Implemented |
| Dynamic dashboard | Admin dashboard renders module cards from registry (no hardcoded nav) | ✅ Implemented |
| Dynamic routing | Admin routes generated from module registry, wrapped in AdminGuard | ✅ Implemented |
| Theme module migration | Theme system registered as first conforming module | ✅ Implemented |
| Submissions module | Registered with Content category, routes to existing Submissions page | ✅ Implemented |
| Portfolio module | Registered with Content category, routes to Placeholder (admin CRUD pending) | ✅ Implemented |
| Testimonials module | Registered with Content category, routes to Placeholder (admin CRUD pending) | ✅ Implemented |
| Playground module | Registered with Tools category, routes to existing Playground pages | ✅ Implemented |

### Task Breakdown

| ID | Task | Status | Deps | Notes |
|----|------|--------|------|-------|
| 8.1 | Define `ModuleDefinition` interface and `ModuleCategory` enum | `done` | — | `src/modules/types.ts`. Includes navItems with icon, category, description, detail. Routes use `RouteObject` from react-router-dom. |
| 8.2 | Build central registry with `registerModule()` / `getModules()` / `getModule()` | `done` | 8.1 | `src/modules/registry.ts`. Fail-fast on duplicate IDs. `getModules(enabledOnly)` filter. |
| 8.3 | Create barrel import for module self-registration | `done` | 8.1 | `src/modules/index.ts`. Re-exports registry utilities. |
| 8.4 | Migrate Theme system as first conforming module | `done` | 8.2 | `src/modules/themes/index.ts`. Category: Appearance. Routes to existing `AdminThemes`. |
| 8.5 | Register Submissions, Portfolio, Testimonials, Playground modules | `done` | 8.2 | Each in `src/modules/<name>/index.ts`. Portfolio + Testimonials route to Placeholder (admin CRUD not yet built). |
| 8.6 | Refactor Dashboard.tsx to consume registry | `done` | 8.3, 8.5 | Cards rendered via `getModules().flatMap(mod => mod.navItems)`. Zero hardcoded links. |
| 8.7 | Refactor routes.tsx to generate admin routes from registry | `done` | 8.3, 8.5 | `getModules().flatMap(mod => mod.routes)` wrapped in `AdminGuard`. Legacy `theme-test` route preserved outside registry. |
| 8.8 | JSDoc all module files per project discipline | `done` | 8.4, 8.5 | Self-contained docs: data contracts, business purpose, portability instructions. No BRD references. |
| 8.9 | Update BRD delta report with §29 Platform Architecture | `done` | 8.7 | Documents what changed, files affected, and architectural decisions. |
| 8.10 | Generic `CrudService<T>` data layer with Zod validation | `todo` | 8.7 | Modules use generic service instead of raw Supabase calls. |
| 8.11 | Shared admin UI patterns: `ListLayout<T>`, `DetailLayout`, `FormEditor<T>` | `todo` | 8.10 | Generic CRUD components all modules inherit. |
| 8.12 | Portfolio admin CRUD (replace Placeholder) | `todo` | 8.11 | DB: `portfolio` table. Full CRUD with image upload. |
| 8.13 | Testimonials admin CRUD (replace Placeholder) | `todo` | 8.11 | DB: `testimonials` table. Full CRUD with rating. |
| 8.14 | Module permission system (`requiredRole` enforcement) | `todo` | 8.7 | Currently declared in types but not enforced. Wire into AdminGuard. |
| 8.15 | Full QA: verify all 5 modules render, navigate, and save correctly | `todo` | 8.12, 8.13 | Cross-module test: dashboard cards → drill-down → CRUD operations. |

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-02-07 | Tracker created per ChatGPT v2.2 spec | Lovable |
| 2026-02-07 | Phase 1 (1.1-1.8) complete: Renamed all tiers | Lovable |
| 2026-02-08 | Task 2.13 marked `replaced` – dedicated checkout required | Lovable |
| 2026-02-08 | Phase 4-5 marked `deferred` pending Phase 6 | Lovable |
| 2026-02-08 | Phase 6 added – Checkout Implementation per v5.0 spec | Lovable |
| 2026-02-08 | **Phase 6 updated to v5.2 spec** – Complete end-to-end design including: SSG static routes, 3-step wireframes, domain radio pattern, message char counter, tier dropdown resets add-ons, Edit links on review step, session persistence, abandonment/resume, 9 scenario categories, pipeline stages, tagging schema, error handling | Lovable |
| 2026-02-09 | **Batch 1 complete**: Tasks 6.1, 6.2, 6.3, 6.6 marked `done` – SSG routes, CheckoutPage shell, Step 1 selection UI, and OrderSummary implemented | Lovable |
| 2026-02-09 | **Task 6.16 added**: Gold accent color decoupled from theme system – dedicated `--gold` CSS variable (HSL 39 95% 50%) with Tailwind utilities (`text-gold`, `bg-gold`, `border-gold`) to prevent runtime theme override flash on checkout pricing | Lovable |
| 2026-02-09 | **Phase 6 full spec reconciliation**: Line-by-line audit of v5.2 spec against tracker revealed 10 gaps. Added tasks: 6.18 (add-on eligibility matrix per SC7), 6.19 (Step 1 Back button routing per §4.1), 6.20 (Supabase schema migration per §1.3), 6.21 (UTM capture per §9), 6.22 (accessibility audit per §4.1.3), 6.23 (analytics events per §9), 6.24 (abandoned cart follow-up per §4.4). Expanded 6.8 scope to include GHL note creation and redirect URL construction. Expanded 6.9 to include createNote(). Marked 6.12 and 6.13 as `replaced` by 6.17. Reorganized all tasks into 7 sequential batches (B1–B7) with correct dependencies. | Lovable |
| 2026-02-10 | **ChatGPT review integration**: Updated 6.24 reference from Matrix v1.2 → v1.3. Expanded 6.24.1 remaining items (Affiliate ID field, Chat – High Intent tag, SaaS checkout page verification). Added ghlClient.ts tag reconciliation as explicit prerequisite in 6.24.5. Expanded 6.24.7 from 3 → 5 E2E scenarios (added cart expiry + Stripe→onboarding). | Lovable |
| 2026-02-10 | **Post-mortem: Feb 9 color regression.** Hand-coded `--gold` CSS variable and checkout color overrides were correctly wiped by admin theme republish. Updated 6.16 with critical rule: **all color/styling changes must flow through admin CRUD → DB → publish pipeline, never directly in code.** Gold accents must be re-added via admin theme system expansion (6.16), not CSS patches. | Lovable |
| 2026-02-10 | **Phase 7 added**: Dynamic Theme System v2.0 — 30 tasks across 6 batches per BRD v2.0. Covers: schema expansion, 10-theme seeding, dual-mode CSS pipeline, admin CRUD (hue slider, effects editor, Style Modules, ADA widget config, icon customizer, revert-to-original), user-facing light/dark toggle, ADA accessibility widget with pause/hide scheduling, theme export/import JSON, component refactor, demo element theming, and full QA. | Lovable |
| 2026-02-10 | **Task 7.17a added**: "Write current as new default" — overwrites theme seed snapshot with current config using same 2-layer warning + export pattern as revert (BRD §15.4). | Lovable |
| 2026-02-11 | **Full color token audit** — comprehensive codebase scan of every page/component. See §Color Token Audit below. | Lovable |

---

| 2026-02-11 | **BRD §4 reconciliation**: Added 5 new sub-tasks to Batch 5: 7.21a (`--secondary-accent` definition), 7.21b (`--gold-foreground`), 7.21c (`pulse-glow` keyframe tokenization), 7.21d (typography CSS vars), 7.21e (motion CSS vars). Expanded 7.21 notes with specific file:line references from BRD §4.3.6–4.3.8. Expanded 7.22 notes with per-file fix list from BRD §4.3.9. Clarified 7.23 exemptions per BRD §4.6. | Lovable |
| 2026-02-11 | **Color token audit #2 (comprehensive)**: Expanded 7.22 notes with 6 newly discovered hardcoded files: `DashboardPreview.tsx` (status badges), `PortfolioCard.tsx` (industry badge colors), `IndustryShowcaseTemplate.tsx` (active dot + chrome), `SmartWebsites.tsx:318` (inline gold shadow), `WarmyEmailDeliverability.tsx` (full page hardcoded — recommend exempt as partner brand), `toast.tsx` (destructive red variants → 7.26). Added `MiniMockup.tsx`, `config/themes.ts` to exemptions. Expanded "Fully Tokenized" list with 12 additional confirmed-clean components. | Lovable |
| 2026-02-11 | **Page-vs-component boundary clarification**: `CaseStudyLayout.tsx` and `WarmyEmailDeliverability.tsx` page layouts are tokenized; only embedded mockup/product components are exempt. `PortfolioCard.tsx` industry badges exempt. | Lovable |
| 2026-02-11 | **Color token audit #3 (FINAL)**: Read every non-exempt page and component. Found 3 new inline gold shadow instances (`SmartLead.tsx:165`, `SmartBusiness.tsx:163`, `SmartGrowth.tsx:168`). Moved `DashboardPreview.tsx` to exemptions (dashboard simulation). Updated SmartWebsites sub-page confirmation. Resolved WarmyEmailDeliverability decision. Added Audit History table. All files now accounted for. | Lovable |
| 2026-02-11 | **Batches 1–3 COMPLETE**: Marked Phase 7 Batches 1 (Schema & Seed), 2 (Pipeline Update), and 3 (Admin Core UI) as ✅ COMPLETE. Admin components created: `EcommerceColorEditor`, `TypographyEditor`, `MotionEditor`, `StyleModulesEditor`, `DefaultModeSelector`. Pipeline updated: `generateProductionCss` now emits `--gold`, `--gold-hover`, `--gold-glow`, `--gold-foreground`, `--pricing-highlight`, `--cta-primary/hover`, `--cta-secondary/hover`, `--font-heading/body/display`, `--transition-smooth/bounce/spring`, and style module tokens (`--module-{name}-{token}`). `ThemeConfig` interface and `applyThemeToRoot` updated to consume all new fields. FOUC prevention script added to `index.html`. Phase 7 status changed from 📋 PLANNED → 🚧 IN PROGRESS. | Lovable |
| 2026-02-11 | **Batch 4 COMPLETE**: Tasks 7.17 (theme revert with 2-layer AlertDialog + "Export First" escape hatch) and 7.17a (save current as new default with 2-layer AlertDialog) implemented in `Themes.tsx`. Both use `published_theme_configs` table with `is_default = true` for seed snapshots. Added Phase 7 comprehensive testing task (7.QA) documenting all features to validate before Phase 7 sign-off. | Lovable |
| 2026-02-11 | **Batch 4 progress**: Tasks 7.15 (ADA widget config), 7.16 (ADA icon customizer), 7.19 (theme export JSON), 7.25 (ADA widget with draggable positioning) marked `done`. Tasks 7.18 (contrast checker) and 7.20 (theme import) implemented and marked `done`. Components created: `ContrastChecker.tsx` (WCAG AA/AAA luminance ratio badges for 10 fg/bg pairs), `ThemeImporter.tsx` (file upload + v2.0 schema validation + create/update mode + 500KB limit). Remaining in Batch 4: 7.17 (theme revert) and 7.17a (write current as new default). | Lovable |
| 2026-02-11 | **Light/dark mode full implementation**: (1) DB migration seeded `static_colors` (light) and `dark_mode_overrides` (dark) from Indigo Night hue. (2) Created `DarkModeOverridesEditor.tsx` for admin dark mode color editing. (3) `applyThemeToRoot()` made mode-aware (checks `.dark` class). (4) `ModeToggle.tsx` triggers `applyThemeToRoot` via `requestAnimationFrame` on switch. (5) Light theme palette refined in `index.css` (warmer grays, richer accent, cohesive shadows). (6) ADA widget CSS rules added (5 missing rulesets for `ada-large-text`, `ada-high-contrast`, `ada-reduced-motion`, `ada-underlines`, `ada-focus-highlight`). Added tasks 7.24a–7.24d, 7.25a. Batch 5 marked ✅ COMPLETE. | Lovable |
| 2026-02-11 | **ADA Batch 1 COMPLETE (10 Content Modules)**: Text Size (3 levels), Line Height (3 levels), Letter Spacing (3 levels), Bold Text, Readable Font, Dyslexia Font (OpenDyslexic CDN), Text Align (cycle), Highlight Links, Text Magnifier, Big Cursor. All tested and verified by user. | Lovable |
| 2026-02-11 | **ADA Batch 2 COMPLETE (5 Color + 9 Orientation Modules)**: Color: Dark Contrast, Light Contrast, High Contrast (WCAG AAA), Monochrome (grayscale filter), High Saturation (saturate filter). Orientation: Reading Line (JS cursor-following bar), Reading Mask (JS spotlight mask), Keyboard Navigation (enhanced tab focus), Hide Images, Stop Animations, Mute Sounds (JS audio muting), Highlight Titles, Highlight Content, Focus Highlight. Mutual exclusion implemented for conflicting modules. Widget now has 3 sections: Content, Color & Contrast, Orientation. | Lovable |
| 2026-02-11 | **ADA Batch 3 COMPLETE (5 Preset Profiles)**: Vision Impaired (text size 2 + bold + high contrast + highlight links/titles + line height), Blind Mode (max text + bold + high contrast + all highlights + keyboard nav + hide images), ADHD Friendly (reading mask + stop animations + mute sounds + highlight titles), Dyslexia Friendly (OpenDyslexic + wide spacing + reading line), Motor Impaired (big cursor + keyboard nav + focus highlight). Profiles activate/deactivate with one click. Manual module toggle clears active profile. State persisted in `ada-active-profile` localStorage key. | Lovable |
| 2026-02-12 | **Phase 8 added**: Platform Module Architecture — 15 tasks. Foundation implemented (8.1–8.9): ModuleDefinition contract, central registry, 5 module registrations, dynamic dashboard/routing, JSDoc discipline, BRD §29 delta entry. Remaining: CrudService<T> (8.10), shared UI patterns (8.11), Portfolio/Testimonials admin CRUD (8.12–8.13), permission enforcement (8.14), full QA (8.15). | Lovable |

## Color Token Audit (2026-02-11)

### 🔴 Critical: Missing CSS Variable Definitions

These tokens are referenced in `tailwind.config.ts` but **never defined** in `index.css`:

| Token | Tailwind Class | Impact |
|-------|---------------|--------|
| `--gold` | `text-gold`, `bg-gold`, `border-gold` | Checkout pricing renders transparent/invisible |
| `--gold-hover` | `gold-hover` | Gold hover states broken |
| `--gold-glow` | `gold-glow` | Gold glow effects broken |
| `--secondary-accent` | `text-secondary-accent`, `bg-secondary-accent` | Any usage renders invisible |

**Resolution**: Task 6.16 (admin CRUD for gold/e-commerce colors) must define these in the publish pipeline. Until then, they are non-functional placeholders.

### ⚠️ Hardcoded Colors Requiring Phase 7 Tokenization

| Location | Hardcoded Values | Phase 7 Task |
|----------|-----------------|--------------|
| `CaseStudyLayout.tsx` | `bg-[#0D0D0D]` (×2 sections) | 7.22 — replace with `bg-background` or new `--case-study-bg` token |
| `AIEmployee.tsx` | `text-blue-400`, `text-green-400`, `text-purple-400` (how-it-works icons) | 7.22 — replace with semantic icon color tokens |
| `FrontOffice.tsx` | `bg-green-500/10`, `text-green-500`, `border-green-500/30` (status cards) | 7.22 — replace with `--status-success` semantic token |
| `SocialProofBar.tsx` | SVG gradient `hsl(210, 100%, 40%)` / `hsl(200, 100%, 50%)` / `hsl(185, 100%, 45%)` | 7.22 — derive from icon-gradient Style Module |
| `Industries.tsx` | SVG gradient `hsl(210, 100%, 40%)` / `hsl(200, 100%, 50%)` / `hsl(185, 100%, 45%)` | 7.22 — same as SocialProofBar |
| ~~`DashboardPreview.tsx`~~ | ~~`text-blue-400`, etc.~~ | **EXEMPT** — Dashboard simulation (see Exemptions list below). Browser chrome + dark UI are intentional. |
| ~~`PortfolioCard.tsx`~~ | ~~`bg-orange-500/20`, etc.~~ | **EXEMPT** — Portfolio system industry badges (see Exemptions list below) |
| `IndustryShowcaseTemplate.tsx` | `bg-green-500 animate-pulse` (active status dot); `bg-yellow-500/50`, `bg-green-500/50` (browser chrome dots) | 7.22 — active dot → `--status-active`; browser chrome is simulation → exempt candidate |
| `TranscriptCard.tsx` | `text-green-500` (checkmark) | 7.22 — replace with `--status-success` token |
| `SmartWebsites.tsx:318` | `shadow-[0_0_30px_hsl(42_60%_50%/0.15)]` (highlighted tier card) | 7.22 — replace with `shadow-glow` or gold shadow token |
| `SmartLead.tsx:165` | `shadow-[0_0_20px_hsl(42_60%_50%/0.1)]` (feature cards) | 7.22 — same gold shadow token pattern |
| `SmartBusiness.tsx:163` | `shadow-[0_0_30px_hsl(42_60%_50%/0.1)]` (feature cards) | 7.22 — same gold shadow token pattern |
| `SmartGrowth.tsx:168` | `shadow-[0_0_30px_hsl(42_60%_50%/0.15)]` (feature cards) | 7.22 — same gold shadow token pattern |
| `index.css` | 4× icon gradients (ocean/royal/sky/electric) with hardcoded HSL | 7.21 — convert to Style Modules |
| `index.css` | `::selection` color `hsl(240 70% 60% / 0.3)` | 7.21 — replace with `hsl(var(--accent) / 0.3)` |
| `index.css` | `.glow-text` shadow `hsl(240 70% 60% / 0.5)` | 7.21 — replace with `hsl(var(--accent) / 0.5)` |
| `tailwind.config.ts` | `pulse-glow` keyframe `hsl(42 76% 55%)` | 7.21c — replace with gold token reference |
| `WarmyEmailDeliverability.tsx` (page layout only) | `bg-[#0a0a0a]`, `text-zinc-*`, section backgrounds, headings, CTAs | 7.22 — tokenize page-level layout; embedded Warmy product SVGs/components (`RealisticDashboards.tsx`, Warmy charts/badges) remain exempt |

### ✅ Intentionally Hardcoded (Exempt from Tokenization)

These components simulate third-party UIs, client websites, or resold partner products and **must** retain their exact brand colors. They are NOT part of the EverIntent theme system.

#### Portfolio "Website-Within-Website" Mockups
These are interactive React components that simulate real client websites inside macOS browser frames. Each uses the client's actual brand palette — tokenizing them would break the simulation.

| Component | Reason |
|-----------|--------|
| `AlexanderTreeMockup.tsx` | Client website simulation (green `#166534` brand) |
| `ClearviewDentistryAustinMockup.tsx` | Client website simulation (teal `#0D9488` brand) |
| `DesertCoolAirMockup.tsx` | Client website simulation (HVAC brand colors) |
| `HonestWrenchAutoMockup.tsx` | Client website simulation (navy `#1E3A5F` brand) — includes browser chrome dots |
| `RiverstoneInteractiveMockup.tsx` | Client website simulation (plumbing brand colors) |
| `MiniMockup.tsx` | Portfolio hub card — renders real hero images with simulated nav/branding overlay using per-project brand colors from `portfolioData.ts`. Browser chrome traffic lights are universal simulation chrome. |
| `PortfolioCard.tsx` (industry badges only) | Industry color-coding (`orange`/`teal`/`violet`/`cyan`) is portfolio-system visual identity, not site theme |
| `portfolioData.ts` | Client brand color metadata (`primaryColor`, `accentColor`) consumed by all mockups |

**Note:** Portfolio case study *pages* (e.g., `CaseStudyLayout.tsx` wrapper) ARE tokenized — only the mockup *components* inside them are exempt.

#### Warmy Product Components (Embedded in EverIntent Page)
The `WarmyEmailDeliverability.tsx` *page layout* (section backgrounds, headings, CTAs) IS tokenized as an EverIntent page. Only the embedded Warmy *product* SVGs and React components are exempt — they must match the actual Warmy.io product appearance.

| Component | Reason |
|-----------|--------|
| `RealisticDashboards.tsx` | Warmy.io SaaS dashboard simulation (`bg-[#0a0a0a]`, `bg-[#111111]`, SVG gradient colors) — represents actual product UI |

#### AI Employee Dashboard Simulation

| Component | Reason |
|-----------|--------|
| `DashboardPreview.tsx` | EverIntent dashboard simulation — uses dark chrome colors (`bg-[#0f0f10]`, `bg-[#1a1a1c]`, `bg-[#2a2a2c]`, `text-gray-400`, `text-white`) + status badges (`bg-green-500/20 text-green-400`, `bg-blue-500/20 text-blue-400`) + channel icons (`text-blue-400`, `text-green-400`, `text-purple-400`). This is a product UI simulation, not a themed EverIntent page. |

#### Other Simulations & Config Data

| Component | Reason |
|-----------|--------|
| `SMSDemo.tsx` | iOS Messages UI simulation (`#007AFF`, `#1c1c1e`, `#3a3a3c`, `#34C759`) |
| `LogoConfigEditor.tsx` | Admin color picker presets (functional, not themed) |
| `config/themes.ts` | Theme configuration data with hex brand colors — consumed by pipeline, not rendered directly |

### ✅ Admin Pages (Acceptable — Low Priority)

| Component | Colors | Notes |
|-----------|--------|-------|
| `Submissions.tsx` | `bg-green-600`, `text-red-600`, `bg-orange-600`, `text-orange-600` | Status indicators — admin-only, not public-facing |
| `Themes.tsx` | `bg-green-500/10`, `text-green-500`, preset hex colors | Success feedback + color picker — admin-only |
| `ResetPassword.tsx` | `bg-green-500/10`, `text-green-500` | Success state — admin-only |

**Admin pages can be tokenized in Phase 7 Batch 5 (7.22) but are lowest priority since they are not public-facing.**

### ⚠️ shadcn Components with Hardcoded Colors

| Component | Colors | Notes |
|-----------|--------|-------|
| `toast.tsx` | `text-red-300`, `text-red-50`, `ring-red-400`, `ring-red-600` | Destructive variant states — shadcn default pattern. Replace with `--destructive-*` tokens in 7.26 |

### ✅ Fully Tokenized (No Issues)

| Area | Status |
|------|--------|
| `src/components/home/*` (HeroSection, HowWeHelpSection, TransformationSection, TestimonialsSection, FinalCTASection) | ✅ Clean — all semantic tokens |
| `src/components/checkout/*` | ✅ Clean — all semantic tokens |
| `src/components/layout/*` (Header, Footer, Layout) | ✅ Clean — all semantic tokens |
| `src/pages/SmartWebsites.tsx` + sub-pages (SmartSite, SmartLead, SmartBusiness, SmartGrowth) | ✅ Clean (except inline gold shadows — tracked above) |
| `src/pages/Pricing.tsx` | ✅ Clean |
| `src/pages/Contact.tsx` | ✅ Clean |
| `src/pages/About.tsx` | ✅ Clean |
| `src/pages/Portfolio.tsx` | ✅ Clean |
| `src/pages/CompareWebsites.tsx` | ✅ Clean |
| `src/pages/CompareAIEmployee.tsx` | ✅ Clean |
| `src/pages/ai-employee/AfterHours.tsx` | ✅ Clean |
| `src/pages/ai-employee/FrontOffice.tsx` | ✅ Clean (except green status cards — tracked above) |
| `src/pages/ai-employee/FullAIEmployee.tsx` | ✅ Clean |
| `src/pages/legal/*` | ✅ Clean |
| `src/components/ui/*` (shadcn) | ✅ Clean — except `toast.tsx` destructive (tracked above) |
| `src/components/CookieConsent.tsx` | ✅ Clean |
| `src/components/GHLChatWidget.tsx` | ✅ Clean (uses `--ghl-*` tokens) |
| `src/components/MobileBottomBar.tsx` | ✅ Clean |
| `src/components/CTAButton.tsx` | ✅ Clean |
| `src/components/ai-employee/AnimatedFlowDiagram.tsx` | ✅ Clean |
| `src/components/ai-employee/FeatureGrid.tsx` | ✅ Clean |
| `src/components/portfolio/PortfolioHero.tsx` | ✅ Clean |
| `src/components/portfolio/PortfolioGrid.tsx` | ✅ Clean |
| `src/components/portfolio/PortfolioFilters.tsx` | ✅ Clean |
| `src/components/portfolio/case-study/CaseStudyLayout.tsx` | ✅ Clean (except `bg-[#0D0D0D]` — tracked above) |
| `src/components/NavLink.tsx` | ✅ Clean |
| `src/components/SEO.tsx` | ✅ Clean |
| `src/components/ScrollToTop.tsx` | ✅ Clean |

### ✅ Decision Resolved: WarmyEmailDeliverability.tsx

Per user directive (2026-02-11): The **page layout** (section backgrounds, headings, CTAs) WILL be tokenized in 7.22. Only the **embedded Warmy product SVGs/React components** (`RealisticDashboards.tsx`, Warmy-branded charts/badges) remain exempt.

---

### 📋 Audit History

| Audit | Date | Scope | New Findings |
|-------|------|-------|-------------|
| #1 | 2026-02-11 | Core marketing pages + shadcn | Initial flagging of 8 files |
| #2 | 2026-02-11 | All remaining pages + components | +6 files (DashboardPreview, PortfolioCard, IndustryShowcaseTemplate, SmartWebsites, WarmyEmailDeliverability, toast.tsx) |
| #3 | 2026-02-11 | **FINAL** — every non-exempt file verified | +3 inline gold shadows (SmartLead, SmartBusiness, SmartGrowth); `DashboardPreview.tsx` moved to exemptions (simulation); all other pages confirmed clean |
| #4 | 2026-02-11 | **Light/dark mode pipeline fix** | Root cause: `:root` had dark values, `.dark` was empty. Fixed `index.css` + `generateProductionCss()` to BRD §7.1 (`:root` = light, `.dark` = dark). Also tokenized: `glow-text` → `var(--accent-glow)`, `::selection` → `var(--accent)`, `font-family` → `var(--font-body/heading)`, `.transition-*` → `var(--transition-*)`, added `--shadow-gold-glow` + `--secondary-accent` to both modes. |
| 2026-02-12 | **ADA Batches 3&4 user-verified and closed**. Added 7.25b: user-side widget hiding (AccessiBe pattern — session/24h/permanent). Admin already normalized vs WPOneTap — no changes needed. | Lovable |
