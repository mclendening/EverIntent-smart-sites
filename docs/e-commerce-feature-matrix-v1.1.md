# EverIntent E-Commerce & Affiliate Feature Matrix — BRD Analysis v1.1

**Purpose:** Detailed breakdown of e-commerce, affiliate, and lifecycle features for Task 6.24+, aligned with BRD v35.3 business goals and the v5.2 checkout spec.

**Tech Stack:** React (Vite SSG) deployed to Vercel Pro · Supabase (Postgres + Edge Functions / Deno) · GoHighLevel (GHL) as system of record.

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-02-10 | Initial draft produced by ChatGPT from Lovable's original analysis. |
| v1.1 | 2026-02-10 | **Lovable revision:** Fixed all incorrect "Next.js" references → React (Vite SSG) + Supabase Edge Functions (Deno). Restored separate "GHL vs Site" owner column. Re-numbered features to original 1.x–5.x scheme. Restored dropped features (5.8–5.10). Corrected cookie-to-edge-function data flow (POST body, not middleware headers). Corrected P0 scope (removed premature promotions of C4/E1). Added this changelog. |

---

## Business Goals (Extracted from BRD v35.3)

| # | Goal | BRD Section |
|---|------|-------------|
| G1 | **Revenue at Every Step** — Nothing is free unless it strategically leads to bigger revenue | §4 Core Revenue Principles |
| G2 | **Asset Ownership** — We own domains, phone numbers, rankings, traffic. Assets stay. | §4 |
| G3 | **One Tech Stack, Multiple Revenue Paths** — Same build, different monetization | §4 |
| G4 | **Relationship → Trust → MRR** — Every interaction builds toward recurring revenue | §4 |
| G5 | **Self-service purchase rate >30%** — Minimize sales calls | §19.4 Success Metrics |
| G6 | **Mode upgrade rate >20% within 90 days** — Upsell existing customers | §19.4 |
| G7 | **Partner Program** — Referral commissions for agencies, consultants, web designers | §21 Partner Program |
| G8 | **Low data footprint** — Supabase for intent capture/audit; GHL as system of record | Architecture Decision |
| G9 | **All comms via GHL** — No direct messaging from everintent.com or Supabase | Communication Policy |
| G10 | **65+ verticals across 4 industries** — Massive addressable market needing scalable acquisition | §2.4 |

---

## Feature Matrix

### Category 1: Cart & Checkout Recovery

| # | Feature | Benefit | How We'd Implement | GHL vs Site | Complexity | Goals Served |
|---|---------|---------|-------------------|-------------|------------|--------------|
| 1.1 | **Abandoned Cart Tag** | Enables GHL to trigger recovery workflows without write-back | `start-checkout` Supabase Edge Function applies `EI: Checkout – Pending` tag at session start | Site → GHL (fire-and-forget) | 🟢 Low | G1, G5, G8, G9 |
| 1.2 | **Timed Recovery Workflow** | 30-min delay, check for completion tag, send reminder if missing | GHL Workflow: trigger on `Pending` tag, wait 30m, conditional check, SMS/email with `?resume=[id]` link | GHL only | 🟢 Low (GHL config) | G1, G4, G9 |
| 1.3 | **Resume Link in Sales Note** | Recovery message can deep-link back to exact checkout state | Already implemented — `start-checkout` writes `?resume=[id]` into GHL note body | ✅ Done | ✅ Done | G5 |
| 1.4 | **Multi-Touch Recovery Sequence** | Escalating reminders (30m SMS → 24h email → 72h final) | GHL Workflow with multiple wait steps and conditional branches | GHL only | 🟡 Medium (GHL config) | G1, G4 |
| 1.5 | **Checkout Completion Tag** | Removes contact from recovery sequence when payment succeeds | GHL applies `EI: Paid` tag on Stripe webhook → workflow stops | GHL only | 🟢 Low (GHL config) | G8 |
| 1.6 | **Cart Expiry / Session TTL** | Prevent stale carts from clogging pipelines | GHL Workflow: if no `Paid` tag after 7 days, remove `Pending` tag, apply `EI: Checkout – Expired` | GHL only | 🟢 Low | G8 |

### Category 2: Affiliate & Referral Tracking

| # | Feature | Benefit | How We'd Implement | GHL vs Site | Complexity | Goals Served |
|---|---------|---------|-------------------|-------------|------------|--------------|
| 2.1 | **Affiliate Cookie Capture** | Track `?ref=AFFILIATE_ID` across sessions | `useAffiliateTracking` React hook → first-party cookie, 90-day expiry (upgradable to lifetime for referred clients). Cookie value read client-side and passed in POST body to edge functions. | Site only | 🟢 Low | G7, G1 |
| 2.2 | **Affiliate ID Passthrough** | Every form/checkout submission includes affiliate attribution | All Supabase Edge Functions (`start-checkout`, `submit-form`, `submit-job-application`) receive `affiliate_id` in POST body, pass to GHL custom field + tag | Site → GHL | 🟡 Medium | G7, G8 |
| 2.3 | **Affiliate GHL Tag** | Enables GHL workflows to route commissions | Apply tag `EI: Affiliate – [ID]` on contact when affiliate cookie present | Site → GHL | 🟢 Low | G7 |
| 2.4 | **Affiliate Audit Column (Supabase)** | Internal reporting on which affiliates drive submissions | Add `affiliate_id` TEXT column to `checkout_submissions` and `form_submissions` | Site (DB migration) | 🟢 Low | G8, G7 |
| 2.5 | **Manual Deal Registration** | Affiliate can claim a lead GHL missed (cookie wasn't set) | GHL custom form or portal feature — affiliate submits client email + claim | GHL only | 🟡 Medium (GHL config) | G7 |
| 2.6 | **Cookie Lifetime Policy** | 90-day default; lifetime if client converts under affiliate | Cookie set on first `?ref=` visit (90d); on conversion, GHL permanently associates affiliate via custom field | Site + GHL | 🟡 Medium | G7, G4 |
| 2.7 | **Affiliate Dashboard** | Affiliates see their referrals, pipeline status, commission earned | GHL Affiliate Manager (native feature) or custom GHL portal page | GHL only | 🟡 Medium (GHL config) | G7 |
| 2.8 | **Commission Calculation** | Auto-calculate affiliate payouts based on converted referrals | GHL Affiliate Manager with commission rules per product | GHL only | 🟡 Medium (GHL config) | G7, G1 |

### Category 3: Attribution & Analytics

| # | Feature | Benefit | How We'd Implement | GHL vs Site | Complexity | Goals Served |
|---|---------|---------|-------------------|-------------|------------|--------------|
| 3.1 | **UTM Persistence** | Track marketing source across the full funnel | Already implemented — sessionStorage captures UTM on landing, all edge functions forward to GHL + Supabase | ✅ Done | ✅ Done | G5 |
| 3.2 | **First-Touch vs Last-Touch Attribution** | Understand which channel drove initial awareness vs final conversion | Store `first_touch_utm` (cookie, 90d) + `last_touch_utm` (sessionStorage) and pass both in POST body to Supabase Edge Functions | Site → GHL | 🟡 Medium | G5, G7 |
| 3.3 | **GTM dataLayer Events** | Enable GA4/GTM conversion tracking for checkout milestones | Already implemented — `checkoutAnalytics.ts` pushes `begin_checkout`, `add_to_cart`, `purchase_redirect` | ✅ Done | ✅ Done | G5 |
| 3.4 | **Affiliate Source Reporting** | Which affiliates drive the most revenue? | GHL reporting on `EI: Affiliate – [ID]` tag + opportunity value | GHL only | 🟢 Low (GHL config) | G7, G1 |
| 3.5 | **Channel ROI Dashboard** | Compare Craigslist vs Facebook vs Trade Groups vs Affiliates | GHL reporting by UTM source tag groupings | GHL only | 🟡 Medium (GHL config) | G5 |

### Category 4: Post-Purchase & Lifecycle

| # | Feature | Benefit | How We'd Implement | GHL vs Site | Complexity | Goals Served |
|---|---------|---------|-------------------|-------------|------------|--------------|
| 4.1 | **Onboarding Automation** | Auto-provision sub-account, send intake form, trigger welcome sequence | GHL Workflow: trigger on `EI: Paid` tag → snapshot apply → intake form → welcome email | GHL only | 🟡 Medium (GHL config) | G4 |
| 4.2 | **Upsell/Cross-Sell Triggers** | Suggest add-ons or tier upgrades based on usage | GHL Workflow: after 30/60/90 days, check usage → send upgrade nudge | GHL only | 🟡 Medium (GHL config) | G6, G1 |
| 4.3 | **Review Request Automation** | Ask happy customers for reviews after site launch | GHL Workflow: trigger on `EI: Setup Complete` tag → 7-day delay → review request | GHL only | 🟢 Low (GHL config) | G4 |
| 4.4 | **Renewal Reminder (T1)** | Prevent T1 annual renewal churn | GHL Workflow: 30 days before renewal date → email with upgrade CTA | GHL only | 🟢 Low (GHL config) | G1, G6 |
| 4.5 | **Churn Prevention Sequence** | Win-back at-risk customers | GHL Workflow: on subscription cancel event → 3-email win-back series | GHL only | 🟡 Medium (GHL config) | G4, G1 |

### Category 5: E-Commerce Platform Features (Commonly Found in Shopify, WooCommerce, etc.)

| # | Feature | Benefit | How We'd Implement | GHL vs Site | Complexity | Goals Served |
|---|---------|---------|-------------------|-------------|------------|--------------|
| 5.1 | **Promo/Coupon Codes** | Affiliates or campaigns can offer discounts | GHL SaaS checkout supports coupon codes natively; site passes `coupon` param in redirect URL | Site + GHL | 🟢 Low | G1, G7 |
| 5.2 | **Order Confirmation Page** | Reassure customer post-payment, set expectations | GHL thank-you page (already configurable per checkout) | GHL only | 🟢 Low | G4 |
| 5.3 | **Invoice/Receipt Generation** | Professional receipts for business customers | Stripe auto-generates receipts; GHL can send branded version | GHL + Stripe | 🟢 Low | G4 |
| 5.4 | **Subscription Management Portal** | Customers upgrade/downgrade/cancel self-serve | GHL customer portal at `app.everintent.com` with billing section | GHL only | 🟢 Low (exists) | G5, G6 |
| 5.5 | **Wishlist / Save for Later** | Let prospects bookmark plans before committing | sessionStorage with plan slug; low-priority — checkout is simple enough | Site only | 🟢 Low | G5 |
| 5.6 | **Social Proof Nudges** | "12 businesses signed up this week" | Direct Supabase client query on `checkout_submissions` count, rendered in React component | Site (Supabase query) | 🟡 Medium | G5 |
| 5.7 | **Exit-Intent Popup** | Catch users about to leave checkout | Client-side `mouseleave` detection → modal with incentive or GHL chat widget trigger | Site only | 🟡 Medium | G1, G5 |
| 5.8 | **Multi-Currency Support** | Serve international markets | **Not needed** — US-only target market per BRD §19 | N/A | N/A | — |
| 5.9 | **Bulk/Enterprise Pricing** | Multi-location service businesses | GHL custom deal via sales team; not self-serve checkout | GHL only | 🔴 High (manual) | G1 |
| 5.10 | **Referral Landing Pages** | Affiliate-specific landing pages with pre-filled `?ref=` | SSG pages or URL params on existing pages — minimal lift | Site only | 🟢 Low | G7 |

---

## Implementation Priority Matrix

### P0 — Immediate (Unblock Task 6.24 + Affiliate Foundation)

| Feature | ID | Owner | Est. Effort |
|---------|-----|-------|-------------|
| Abandoned Cart Pending Tag | 1.1 | Site (Supabase Edge Fn) | 30 min |
| Affiliate Cookie Hook | 2.1 | Site (React hook) | 1 hour |
| Affiliate Passthrough in Edge Functions | 2.2 | Site (Supabase Edge Fns) | 2 hours |
| Affiliate Audit Column | 2.4 | Site (Supabase migration) | 15 min |
| Affiliate GHL Tag | 2.3 | Site (Supabase Edge Fn) | 30 min |

**Total site-side P0: ~4 hours**

### P1 — Fast Follow (GHL Configuration)

| Feature | ID | Owner | Est. Effort |
|---------|-----|-------|-------------|
| Recovery Workflow (30m) | 1.2 | GHL | 1 hour |
| Completion Tag on Payment | 1.5 | GHL | 30 min |
| Cart Expiry Workflow | 1.6 | GHL | 30 min |
| Affiliate Dashboard | 2.7 | GHL | 2 hours |
| Deal Registration Form | 2.5 | GHL | 1 hour |
| Commission Rules | 2.8 | GHL | 2 hours |

### P2 — Polish (After Launch)

| Feature | ID | Owner | Est. Effort |
|---------|-----|-------|-------------|
| Multi-Touch Recovery (escalation) | 1.4 | GHL | 2 hours |
| First/Last Touch Attribution | 3.2 | Site + GHL | 3 hours |
| Cookie Lifetime Upgrade Policy | 2.6 | Site + GHL | 2 hours |
| Promo Code Support | 5.1 | Site + GHL | 1 hour |
| Exit-Intent Popup | 5.7 | Site | 3 hours |
| Social Proof Nudges | 5.6 | Site | 3 hours |

### P3 — Lifecycle (Post-MVP per BRD §21)

| Feature | ID | Owner | Est. Effort |
|---------|-----|-------|-------------|
| Upsell Triggers (30/60/90d) | 4.2 | GHL | 3 hours |
| Churn Prevention Sequence | 4.5 | GHL | 3 hours |
| Review Request Post-Launch | 4.3 | GHL | 1 hour |
| Renewal Reminders | 4.4 | GHL | 1 hour |
| Referral Landing Pages | 5.10 | Site | 2 hours |

---

## Architecture Summary

```
┌────────────────────────────┐
│  everintent.com (Site)     │
│  React (Vite SSG)          │
│  Deployed: Vercel Pro      │
│                            │
│  • Affiliate cookie (R/W)  │
│  • UTM capture             │
│  • Checkout UI (3-step)    │
│  • sessionStorage state    │
│  • GTM dataLayer events    │
│  • Cookie read → POST body │
└─────────────┬──────────────┘
              │ POST (fire-and-forget)
              ▼
┌────────────────────────────┐
│  Supabase Edge Functions   │
│  (Deno runtime)            │
│                            │
│  • start-checkout          │
│  • submit-form             │
│  • submit-job-application  │
│                            │
│  Each function:            │
│  • Save to Supabase (audit)│
│  • Upsert GHL contact      │
│  • Apply tier + addon tags │
│  • Apply Pending tag       │
│  • Apply Affiliate tag     │
│  • Write sales note        │
│  • Return redirect URL     │
└─────────────┬──────────────┘
              │
     ┌────────┴────────┐
     ▼                 ▼
┌──────────┐   ┌──────────────┐
│ Supabase │   │   GHL API    │
│ Postgres │   │ (SoR)        │
│ (Audit)  │   │              │
│          │   │ • Contacts   │
│ Low data │   │ • Tags       │
│ footprint│   │ • Notes      │
│          │   │ • Pipelines  │
│ Tables:  │   │ • Workflows  │
│ checkout_│   │ • Affiliates │
│ submissions│ │ • Comms      │
│ form_    │   │ • Billing    │
│ submissions│ │ • Stripe     │
└──────────┘   └──────────────┘
```

**Key Principle:** Supabase stores the minimum needed for audit, recovery links, and internal reporting. GHL owns the customer lifecycle, communications, affiliate management, and all outbound messaging. The site is a lean conversion tool — it captures intent and fires it to GHL, then gets out of the way.

---

## Data Flow: Affiliate Cookie → Edge Function → GHL

```
User lands on everintent.com/smart-websites?ref=PARTNER123
       │
       ▼
useAffiliateTracking() hook
  → Reads ?ref= param
  → Sets first-party cookie: ei_affiliate=PARTNER123 (90-day expiry)
       │
       ▼
User proceeds through checkout (3-step UI)
  → Step 3 Review: client-side JS reads ei_affiliate cookie
  → Includes affiliate_id: "PARTNER123" in POST body
       │
       ▼
start-checkout Edge Function (Supabase / Deno)
  → Saves affiliate_id to checkout_submissions (audit)
  → Calls GHL API: addTags(contactId, ["EI: Affiliate – PARTNER123"])
  → Writes affiliate info into sales note body
  → Returns GHL redirect URL
       │
       ▼
GHL takes over
  → Contact has affiliate tag for commission workflows
  → Affiliate Manager tracks conversion + payout
```
