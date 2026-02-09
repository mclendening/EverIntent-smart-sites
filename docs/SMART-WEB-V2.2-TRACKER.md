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

| ID | Task | Status | Verification | Notes |
|----|------|--------|--------------|-------|
| 6.1 | Create SSG checkout routes | `done` | Routes exist: `/checkout/launch`, `/checkout/capture`, etc. | 8 static routes (4 Smart Websites + 4 AI Employee) |
| 6.2 | Build CheckoutPage component | `done` | Page renders with 3-step progress indicator | Shared component, tier passed as prop |
| 6.3 | Build Step 1: Plan & Add-On Selection | `done` | Tier dropdown resets add-ons; cards toggle; summary updates | Per v5.2 Section 4.1 wireframe; uses confirmation card + Change button with filtered two-tab selector |
| 6.4 | Build Step 2: Contact Details Form | `todo` | Domain radio pattern; 500-char message counter; inline validation | Per v5.2 Section 4.2 wireframe |
| 6.5 | Build Step 3: Review & Confirm | `todo` | [Edit] links navigate to Step 1/2; legal notice; loading state | Per v5.2 Section 4.3 wireframe |
| 6.6 | Build OrderSummary component | `done` | Dynamic pricing: tier + add-ons = monthly total | Reusable across steps |
| 6.7 | Implement sessionStorage persistence | `todo` | Data survives back navigation, tab refresh | Per v5.2 Section 4.4 |
| 6.8 | Update start-checkout edge function | `todo` | Returns `{ success, id, redirect_url }` | Build URL per GHL format spec |
| 6.9 | Update ghlClient.ts with v2.2 tags | `todo` | TIER_TAGS + ADDON_TAGS maps complete | Per v5.2 Section 1.5 |
| 6.10 | Implement client-side total verification | `todo` | Calculated total matches before edge function call | Per v5.2 Section 8 |
| 6.11 | Implement redirect after submission | `todo` | `window.location.href = redirect_url` on success | Show loading; handle errors gracefully |
| 6.12 | Update tier page CTAs to checkout | `todo` | "Get Started" → `/checkout/[tier]` | Launch, Capture, Convert, Scale pages |
| 6.13 | Update comparison page CTAs | `todo` | "Choose [Tier]" → `/checkout/[tier]` | `/compare-websites` buttons |
| 6.14 | Implement resume link handling | `todo` | `?resume=abc123` restores state from Supabase | Per v5.2 Section 4.4 abandonment spec |
| 6.15 | QA: All 9 scenario categories | `todo` | Test SC1-SC9 per v5.2 Section 5.1 | Cross-browser, mobile, abandon/return |
| 6.16 | Decouple gold accent from theme system | `done` | Checkout pricing uses `--gold` (HSL 39 95% 50%) via `text-gold`/`bg-gold`/`border-gold`; logo retains purple `--accent` | Prevents runtime theme override flash; dedicated CSS variable + Tailwind utilities added to index.css and tailwind.config.ts |

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
