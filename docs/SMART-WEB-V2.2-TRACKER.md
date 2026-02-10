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
| 6.16 | Decouple gold accent from theme system | `done` | B1 | Gold persists on checkout; homepage logo stays purple | Dedicated `--gold` CSS var immune to theme overrides. |
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
| 6.22 | Accessibility audit for checkout flow | `todo` | B6 | All form inputs have associated `<label>` elements; checkboxes use `aria-checked`; plan selector is keyboard-navigable; focus indicators visible; color is not sole state indicator; error messages linked via `aria-describedby` | Per v5.2 §4.1.3. Semantic HTML, WCAG AA contrast, Tab key navigation through all interactive elements. |
| 6.14 | Implement resume link handling | `todo` | B6 | `?resume=abc123` queries Supabase for pending record, pre-populates all checkout fields, user picks up where they left off | Per v5.2 §4.4 point 3. Requires a `start-checkout/resume` endpoint or direct Supabase query. Recovery links sent via GHL abandoned cart workflow. |
| 6.23 | Analytics & conversion event instrumentation | `todo` | B6 | Fire events at: checkout_started (Step 1 load), plan_changed, addon_toggled, details_completed (Step 2→3), checkout_submitted (Complete Checkout clicked), checkout_redirected (redirect success) | Per v5.2 §9. Events enable drop-off analysis between steps. Implementation: custom events or GTM dataLayer pushes. |
| 6.24 | Abandoned cart follow-up function | `todo` | B6 | Scheduled edge function or GHL workflow that finds `checkout_submissions` where `status='pending'` and `created_at` > 30min ago; sends reminder email/SMS via GHL with personalized resume link | Per v5.2 §4.4 point 4. **Coordinate with GHL team** — may be implemented as GHL workflow triggered by `EI: Checkout – [tier]` tag + time delay instead of edge function. |
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
