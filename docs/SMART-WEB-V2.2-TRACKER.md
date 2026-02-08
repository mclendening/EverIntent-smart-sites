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

> **Authority**: `docs/Detail-Checkout-design.md` (Site Implementation Tasks 1-10)  
> **Spec**: `docs/Tasks-Checkout-Design-Spec-v5.0.md`

### Architecture Summary

```
┌─────────────────────────────────────────────────────────────────┐
│                    everintent.com                                │
│  /checkout/[tier]                                                │
│  ┌─────────────┐   ┌─────────────┐   ┌─────────────┐            │
│  │  Step 1     │ → │  Step 2     │ → │  Step 3     │            │
│  │  Plan +     │   │  Contact    │   │  Review     │            │
│  │  Add-Ons    │   │  Details    │   │  & Confirm  │            │
│  └─────────────┘   └─────────────┘   └──────┬──────┘            │
│                                              │                   │
│         ┌────────────────────────────────────┘                   │
│         ▼                                                        │
│  ┌─────────────────────────────────────┐                         │
│  │ start-checkout Edge Function        │                         │
│  │ • Save to checkout_submissions      │                         │
│  │ • Upsert GHL contact + tags         │                         │
│  │ • Return redirect URL               │                         │
│  └──────────────┬──────────────────────┘                         │
└─────────────────│───────────────────────────────────────────────┘
                  │
                  ▼  window.location.href redirect
┌─────────────────────────────────────────────────────────────────┐
│               go.everintent.com/[tier]                           │
│               GHL SaaS Checkout                                  │
│  • Pre-filled: firstName, email, phone, business_name           │
│  • Stripe payment processing                                     │
│  • Sub-account provisioning                                      │
│  • Webhook → n8n → onboarding                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Existing Assets (Site-Level Knowledge)

| Asset | Path | Status | Notes |
|-------|------|--------|-------|
| `checkout_submissions` table | Supabase | ✅ Ready | Has all required columns: name, email, phone, company, service_interest, tcpa_consent, ghl_* sync fields, UTM fields |
| `start-checkout` edge function | `supabase/functions/start-checkout/index.ts` | ⚠️ Needs Update | Currently saves + syncs but does NOT return GHL redirect URL |
| GHL Client library | `supabase/functions/_shared/ghlClient.ts` | ✅ Ready | Has `upsertContact`, `addTags`, `addNote`, `TIER_TAG_MAP` |
| GHL secrets | Supabase Secrets | ✅ Ready | `GHL_API_TOKEN`, `GHL_LOCATION_ID` configured |
| Contact page | `src/pages/Contact.tsx` | ✅ Separate | Will remain a simple inquiry form (no checkout logic) |
| Form components | `src/components/ui/form.tsx` | ✅ Ready | react-hook-form integration available |
| Add-on data | `src/pages/Contact.tsx` lines 59-66 | ✅ Reference | Pack IDs, names, prices defined |

### Tasks

| ID | Task | Status | Verification | Notes |
|----|------|--------|--------------|-------|
| 6.1 | Create checkout route structure | `todo` | Routes exist: `/checkout/launch`, `/checkout/capture`, etc. | Dynamic `[tier]` param or separate pages; SSG compatible |
| 6.2 | Build CheckoutPage component | `todo` | Page renders with 3-step progress indicator | Multi-step form with session persistence |
| 6.3 | Build Step 1: Plan & Add-On Selection | `todo` | Tier pre-selected from URL param; add-ons toggleable | Show tier card with price; add-on cards with checkboxes |
| 6.4 | Build Step 2: Contact Details Form | `todo` | Name, Email, Phone, Business Name, Domain question, TCPA | Inline validation; side-by-side fields on desktop |
| 6.5 | Build Step 3: Review & Confirm | `todo` | OrderSummary component shows all selections | Editable: "Change Plan" / "Edit Details" links back to steps |
| 6.6 | Build OrderSummary component | `todo` | Dynamic pricing: setup + monthly + add-ons = total | Reusable across checkout pages |
| 6.7 | Implement back navigation | `todo` | User can click back to previous step without losing data | Use React state + sessionStorage persistence |
| 6.8 | Update start-checkout to return redirect URL | `todo` | Function returns `{ success, id, redirect_url }` | Build URL: `go.everintent.com/[tier]?firstName=...&email=...` |
| 6.9 | Implement redirect after form submission | `todo` | `window.location.href = redirect_url` on success | Show loading state during submission |
| 6.10 | Update tier page CTAs to `/checkout/[tier]` | `todo` | All "Get Started" buttons link to checkout | Launch, Capture, Convert, Scale pages |
| 6.11 | Update comparison page CTAs | `todo` | "Choose [Tier]" buttons link to checkout | `/compare-websites` table buttons |
| 6.12 | Add AI Employee checkout routes | `todo` | `/checkout/after-hours`, `/checkout/front-office`, `/checkout/full-ai` | Same pattern; different tier config |
| 6.13 | QA: Test all checkout flows | `todo` | Submit test checkouts; verify Supabase + GHL sync + redirect | Cross-browser, mobile testing |

### UX Specification

#### Step 1: Plan & Add-On Selection

```
┌────────────────────────────────────────────────────────────────┐
│  [●]───────○───────○   Step 1 of 3: Customize Your Plan        │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────┐                        │
│  │  ✓ Capture Plan                     │  ← Pre-selected        │
│  │  $97/month · Never miss a lead      │                        │
│  │  [Change Plan ▼]                    │  ← Dropdown to switch  │
│  └─────────────────────────────────────┘                        │
│                                                                 │
│  Add Optional Packs:                                            │
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐│
│  │ □ Email Authority│ │ ☑ Get Paid Now  │ │ □ AI Voice Chat  ││
│  │    $49/mo        │ │    $49/mo       │ │    $79/mo        ││
│  └──────────────────┘ └──────────────────┘ └──────────────────┘│
│  ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐│
│  │ □ Social Autopilot│ │ □ Omnichannel   │ │ □ Unlimited AI   ││
│  │    $97/mo        │ │    $99/mo       │ │    $149/mo       ││
│  └──────────────────┘ └──────────────────┘ └──────────────────┘│
│                                                                 │
│  ┌─────────────────────────────────────┐                        │
│  │  Order Summary                      │                        │
│  │  Capture Plan         $97/mo        │                        │
│  │  Get Paid Now         $49/mo        │                        │
│  │  ──────────────────────────         │                        │
│  │  Monthly Total       $146/mo        │                        │
│  └─────────────────────────────────────┘                        │
│                                                                 │
│                              [Continue to Details →]            │
└────────────────────────────────────────────────────────────────┘
```

**Behavior:**
- Tier pre-selected based on URL (`/checkout/capture` → Capture selected)
- User can change tier via dropdown (state updates, add-ons reset)
- Add-on cards toggle on click (checkbox + card highlight)
- OrderSummary updates dynamically
- "Continue" validates at least one plan selected

#### Step 2: Contact Details

```
┌────────────────────────────────────────────────────────────────┐
│  ○───────[●]───────○   Step 2 of 3: Your Details               │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐ ┌──────────────────────┐              │
│  │ First Name *         │ │ Last Name *          │              │
│  │ [________________]   │ │ [________________]   │              │
│  └──────────────────────┘ └──────────────────────┘              │
│                                                                 │
│  ┌──────────────────────┐ ┌──────────────────────┐              │
│  │ Email *              │ │ Phone *              │              │
│  │ [________________]   │ │ [________________]   │              │
│  └──────────────────────┘ └──────────────────────┘              │
│                                                                 │
│  ┌─────────────────────────────────────────────────┐            │
│  │ Business Name *                                 │            │
│  │ [________________________________________________]           │
│  └─────────────────────────────────────────────────┘            │
│                                                                 │
│  Do you have a domain for your website?                         │
│  ○ Yes, I have a domain                                         │
│  ○ No, I need help getting one                                  │
│                                                                 │
│  ┌─────────────────────────────────────────────────┐            │
│  │ Message (optional)                              │            │
│  │ [________________________________________________]           │
│  └─────────────────────────────────────────────────┘            │
│                                                                 │
│  ☑ I agree to receive communications from EverIntent.           │
│    View our Privacy Policy. *                                   │
│                                                                 │
│  [← Back]                        [Review Your Order →]          │
└────────────────────────────────────────────────────────────────┘
```

**Behavior:**
- All fields except Message are required
- Inline validation (red border + error message on blur)
- Domain question: radio buttons (stored as `has_domain: boolean`)
- TCPA checkbox required before proceeding
- "Back" returns to Step 1 with data preserved
- "Review" validates all fields, advances to Step 3

#### Step 3: Review & Confirm

```
┌────────────────────────────────────────────────────────────────┐
│  ○───────○───────[●]   Step 3 of 3: Review & Confirm           │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────┐                        │
│  │  Your Plan                   [Edit] │                        │
│  │  ─────────────────────────────────  │                        │
│  │  Capture Plan         $97/mo        │                        │
│  │  Get Paid Now         $49/mo        │                        │
│  │  ═══════════════════════════════    │                        │
│  │  Monthly Total       $146/mo        │                        │
│  └─────────────────────────────────────┘                        │
│                                                                 │
│  ┌─────────────────────────────────────┐                        │
│  │  Your Details                [Edit] │                        │
│  │  ─────────────────────────────────  │                        │
│  │  Jane Smith                         │                        │
│  │  jane@company.com                   │                        │
│  │  (555) 123-4567                     │                        │
│  │  Acme Services LLC                  │                        │
│  │  Domain: I need help getting one    │                        │
│  └─────────────────────────────────────┘                        │
│                                                                 │
│  [← Back]              [Complete Checkout →]                    │
│                                                                 │
│  By clicking "Complete Checkout" you will be redirected to      │
│  our secure payment page to finalize your order.                │
└────────────────────────────────────────────────────────────────┘
```

**Behavior:**
- "[Edit]" links return to respective step with data preserved
- "Complete Checkout" button:
  1. Show loading spinner + "Processing..."
  2. POST to `start-checkout` edge function
  3. On success: `window.location.href = redirect_url`
  4. On error: Show toast error, remain on page
- Button disabled during submission

#### Session Persistence

```typescript
// On each step change, persist to sessionStorage
sessionStorage.setItem('checkout_state', JSON.stringify({
  tier: 'capture',
  addOns: ['get-paid-now'],
  details: {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@company.com',
    phone: '5551234567',
    businessName: 'Acme Services LLC',
    hasDomain: false,
    message: ''
  },
  currentStep: 2,
  tcpaConsent: true
}));

// On page load, restore from sessionStorage if available
const savedState = sessionStorage.getItem('checkout_state');
if (savedState) {
  const parsed = JSON.parse(savedState);
  if (parsed.tier === tierFromUrl) {
    // Restore state
  }
}
```

#### GHL Redirect URL Format

```
https://go.everintent.com/[tier]
  ?first_name={firstName}
  &last_name={lastName}
  &email={email}
  &phone={phone}
  &company_name={businessName}
  &addons={comma-separated-addon-ids}
```

Example:
```
https://go.everintent.com/capture?first_name=Jane&last_name=Smith&email=jane%40company.com&phone=5551234567&company_name=Acme%20Services%20LLC&addons=get-paid-now
```

---

## GHL Tag Updates Required

The `ghlClient.ts` TIER_TAG_MAP needs these additions for v2.2:

```typescript
// NEW: v2.2 tier names (primary)
'launch': 'EI: Tier - Launch',
'capture': 'EI: Tier - Capture',
'convert': 'EI: Tier - Convert',
'scale': 'EI: Tier - Scale',

// NEW: Add-on pack tags
'email-authority': 'EI: AddOn - Email Authority',
'get-paid-now': 'EI: AddOn - Get Paid Now',
'ai-voice-chat': 'EI: AddOn - AI Voice Chat',
'social-autopilot': 'EI: AddOn - Social Autopilot',
'omnichannel-inbox': 'EI: AddOn - Omnichannel Inbox',
'unlimited-ai': 'EI: AddOn - Unlimited AI',
```

---

## Guardrails

| Rule | Description |
|------|-------------|
| **No Redirects** | SSG site; keep existing slugs, update displayed names only |
| **Consistent Styling** | Dark/purple/yellow color scheme; existing typography |
| **SEO/AEO Adherence** | Updated meta tags, meaningful alt text, proper headings, accessible tables |
| **Verification Required** | Every task includes verification step; only mark complete after staging test |
| **Product Separation** | Smart Websites and AI Employee remain distinct product lines |
| **Contact Page Separation** | `/contact` remains a simple inquiry form; checkout is `/checkout/[tier]` |
| **Session Persistence** | User can navigate back without losing data |

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-02-07 | Tracker created per ChatGPT v2.2 spec | Lovable |
| 2026-02-07 | Phase 1 (1.1-1.8) complete: Renamed all tiers to Launch/Capture/Convert/Scale, updated nav dropdown with Add-On Packs link, refreshed SEO metadata | Lovable |
| 2026-02-08 | Task 2.13 marked `replaced` – contact form incorrectly modified; dedicated checkout required | Lovable |
| 2026-02-08 | Phase 4-5 marked `deferred` pending Phase 6 completion | Lovable |
| 2026-02-08 | **Phase 6 added** – Checkout Implementation per `Detail-Checkout-design.md` and `Tasks-Checkout-Design-Spec-v5.0.md` | Lovable |
| 2026-02-08 | Added detailed UX specifications for 3-step checkout with wireframes | Lovable |
| 2026-02-08 | Documented existing assets (checkout_submissions, start-checkout, ghlClient) | Lovable |
