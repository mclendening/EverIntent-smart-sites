# EverIntent Sales Infrastructure & Feature Matrix v1.2

**Purpose:** Comprehensive breakdown of the unified sales infrastructure — covering checkout recovery, affiliate tracking, attribution, lifecycle automation, and GHL pipeline integration — for Phase 6.24+ implementation. Reframed from "e-commerce features" to "sales infrastructure" to reflect the system's true scope: capturing and attributing traffic from all sources (ads, organic, referrals, chat) into a single GHL-powered pipeline.

**Tech Stack:** React (Vite SSG) deployed to Vercel Pro · Supabase (Postgres + Edge Functions / Deno) · GoHighLevel (GHL) as system of record.

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| v1.0 | 2026-02-10 | Initial draft produced by ChatGPT from Lovable's original analysis. |
| v1.1 | 2026-02-10 | **Lovable revision:** Fixed all incorrect "Next.js" references → React (Vite SSG) + Supabase Edge Functions (Deno). Restored separate "GHL vs Site" owner column. Re-numbered features to original 1.x–5.x scheme. Restored dropped features (5.8–5.10). Corrected cookie-to-edge-function data flow (POST body, not middleware headers). Corrected P0 scope (removed premature promotions of C4/E1). Added this changelog. |
| v1.2 | 2026-02-10 | **Major update:** (1) Reframed document title from "E-Commerce & Affiliate Feature Matrix" to "Sales Infrastructure & Feature Matrix" to reflect unified sales pipeline scope. (2) Added GHL Audit section confirming all 29 `EI:` tags and 5-stage Checkout Pipeline exist in GHL. (3) Replaced flat P0–P3 priority matrix with phased implementation roadmap (Phase 0–5) with realistic effort estimates (8–12 hours total site-side, up from 4). (4) Added Phase 0 (manual GHL prep) as explicit prerequisite — tags/pipeline must exist before code fires. (5) Resequenced implementation: DB migration (Phase 1) before edge function updates (Phase 3) to respect data dependency. (6) Added `EI: Chat – Inquiry` tag for mid-funnel chat triggers and `EI: Checkout – Pending` lifecycle tag to feature matrix. (7) Added Section 6 "Chat & Top-of-Funnel Integration" describing how chat widget feeds into the same pipeline. (8) Added Section 7 "End-to-End Test Scenarios" with 3 acceptance flows. (9) Updated architecture diagram to include chat widget entry point. (10) Moved Promo Code (5.1) from P0 to P2 — not needed for initial launch. |
| v1.2.1 | 2026-02-10 | **GHL Implementation Taskbook:** (1) Added Section 10 "GHL Implementation Taskbook" with 30+ detailed GHL-side tasks across 7 categories (Workflows, Pipeline Automation, SaaS Checkout Pages, Affiliate Manager, Chat Automation, Communications Templates, Reporting). (2) Each task includes trigger conditions, action steps, tag references, and dependencies. (3) Identified critical gap: `ghlClient.ts` still uses legacy pre-v2.2 tag names (Smart Site, M1-M5) that don't match the 29 tags in GHL — requires reconciliation before Phase 3 edge function work. (4) Added GHL SaaS Checkout Page setup (8 pages, Stripe products, query param mapping) as prerequisite for end-to-end flow. (5) Expanded Phase 4 table to cross-reference Section 10 task IDs. (6) Added GHL-specific acceptance criteria to Phase 5 test scenarios. |

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

## GHL Audit (Verified 2026-02-10)

### Tags (29 total with `EI:` prefix)

All tags confirmed present in GoHighLevel Tags page:

**Tier Tags (8):**
| Tag | Purpose |
|-----|---------|
| `EI: Tier – Launch` | Smart Websites T1 attribution |
| `EI: Tier – Capture` | Smart Websites T2 attribution |
| `EI: Tier – Convert` | Smart Websites T3 attribution |
| `EI: Tier – Scale` | Smart Websites T4 attribution |
| `EI: Tier – After-Hours` | AI Employee T1 attribution |
| `EI: Tier – Front Office` | AI Employee T2 attribution |
| `EI: Tier – Full AI Employee` | AI Employee T3 attribution |
| `EI: Tier – Web Chat Only` | Standalone web chat attribution |

**Add-On Tags (6):**
| Tag | Purpose |
|-----|---------|
| `EI: AddOn – AI Voice Chat` | Voice AI add-on tracking |
| `EI: AddOn – Unlimited AI` | Unlimited AI features add-on |
| `EI: AddOn – Email Authority` | Email deliverability add-on |
| `EI: AddOn – Get Paid Now` | Payment processing add-on |
| `EI: AddOn – Social Autopilot` | Social media automation add-on |
| `EI: AddOn – Omnichannel Inbox` | Unified inbox add-on |

**Lifecycle Tags (verified):**
| Tag | Purpose | Fired By |
|-----|---------|----------|
| `EI: Checkout – Pending` | Triggers abandoned cart recovery workflow | `start-checkout` Edge Function |
| `EI: Checkout – [tier]` | Tier-specific checkout variants (after-hours, capture, convert, front office, full ai employee, launch, scale) | `start-checkout` Edge Function |
| `EI: Redirected` | Contact was sent to GHL SaaS checkout | `start-checkout` Edge Function |
| `EI: Paid` | Payment confirmed via Stripe webhook | GHL automation |
| `EI: Onboarding Complete` | Client onboarding finished | GHL automation |
| `EI: Active Customer` | Fully active, post-onboarding | GHL automation |
| `EI: Affiliate – [ID]` | Affiliate attribution (dynamic per partner) | Edge Functions (all 3) |
| `EI: Chat – Inquiry` | Mid-funnel chat trigger for pipeline placement | GHL Chat Widget |
| `EI: Checkout – Expired` | Cart abandoned >7 days, removed from recovery | GHL Workflow |

> **Note:** 29 tags exist in GHL including some duplicate hyphen-style variants. The ~17 unique functional tags listed above cover all required automation triggers.

### Checkout Pipeline (Verified)

Single pipeline: **Checkout Pipeline** with 5 stages:

```
Pre-Checkout → Payment Pending → Paid – Onboarding → Snapshot Applied → Active Customer
```

- Currently empty (no opportunities) — structure is ready for automation.
- Maps to the v5.2 spec exactly.

### Sales Pipeline Context

The Checkout Pipeline is the **final stage** of a broader sales pipeline that encompasses:

```
┌─────────────────────────────────────────────────────────────┐
│                    SALES PIPELINE                           │
│                                                             │
│  Ads ──┐                                                    │
│         │                                                   │
│  SEO ──┤    ┌──────────┐    ┌───────────┐    ┌──────────┐  │
│         ├──▶│ Site /    │──▶│ Pre-      │──▶│ Checkout │  │
│  Chat ──┤    │ Landing   │    │ Checkout  │    │ Pipeline │  │
│         │    │ Pages     │    │ (GHL)     │    │ (5 stgs) │  │
│  Ref ───┘    └──────────┘    └───────────┘    └──────────┘  │
│                                                             │
│  All entry points feed into the SAME tag registry           │
│  and pipeline for consistent attribution & routing          │
└─────────────────────────────────────────────────────────────┘
```

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

### Category 5: E-Commerce Platform Features

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

### Category 6: Chat & Top-of-Funnel Integration

| # | Feature | Benefit | How We'd Implement | GHL vs Site | Complexity | Goals Served |
|---|---------|---------|-------------------|-------------|------------|--------------|
| 6.1 | **Chat Widget on All Marketing Pages** | Prospects can request help at any funnel stage | GHL Chat Widget already embedded site-wide via `GHLChatWidget.tsx` and `ghlLoader.ts` | ✅ Done | ✅ Done | G4, G5 |
| 6.2 | **Chat Attribution Context** | Chat agents see UTM source, affiliate ID, and current page | Pass UTM params and affiliate cookie to GHL chat widget via `ghlLoader.ts` custom data attributes | Site → GHL | 🟡 Medium | G5, G7 |
| 6.3 | **Chat Inquiry Tag** | Places chatting prospects into Pre-Checkout pipeline stage | GHL applies `EI: Chat – Inquiry` tag when a chat session opens; workflow moves contact to Pre-Checkout | GHL only | 🟢 Low (GHL config) | G4, G5 |
| 6.4 | **Chat-to-Sales Escalation** | Route high-intent chats to human sales | GHL Workflow: if chat duration > X min or contains pricing keywords → notify sales team | GHL only | 🟡 Medium (GHL config) | G1, G5 |
| 6.5 | **Chat Decision Support** | Agents can recommend tiers based on prospect context | GHL agent training docs + pre-built response templates referencing tag schema | GHL only (ops) | 🟢 Low | G4, G5 |

---

## Implementation Roadmap (Phased)

Replaces the flat P0–P3 priority matrix from v1.1 with a dependency-aware, phased approach. Total site-side effort: **8–12 hours** (revised from the underestimated 4 hours in v1.1).

### Phase 0: GHL Prep (Manual — No Code)

**Status: ✅ COMPLETE** (verified 2026-02-10)

| Task | Status | Notes |
|------|--------|-------|
| Create all 8 tier tags in GHL | ✅ Done | All `EI: Tier – *` tags confirmed |
| Create all 6 add-on tags in GHL | ✅ Done | All `EI: AddOn – *` tags confirmed |
| Create lifecycle tags (`Pending`, `Paid`, `Redirected`, `Expired`, etc.) | ✅ Done | All lifecycle tags confirmed |
| Create `EI: Affiliate – [ID]` tag pattern | ✅ Done | Dynamic tag; applied per affiliate |
| Create `EI: Chat – Inquiry` tag | ✅ Done | For mid-funnel chat triggers |
| Create Checkout Pipeline (5 stages) | ✅ Done | Pre-Checkout → Payment Pending → Paid – Onboarding → Snapshot Applied → Active Customer |
| Create GHL custom field: `Affiliate ID` | ⬜ Verify | Needed for affiliate passthrough |

**Why Phase 0 first:** Tags are the glue between the site, Supabase, and GHL. If `start-checkout` fires an `addTags()` call for a tag that doesn't exist in GHL, it will create orphan tags with inconsistent casing/naming. Manual creation ensures the canonical tag registry is locked in before code runs.

### Phase 1: Database Migration (Supabase)

**Prerequisite for Phase 3.** Must be approved and executed before edge function updates.

| Task | Feature ID | Est. Effort | Notes |
|------|-----------|-------------|-------|
| Add `affiliate_id TEXT` column to `checkout_submissions` | 2.4 | 15 min | Nullable, no FK — just audit |
| Add `affiliate_id TEXT` column to `form_submissions` | 2.4 | 15 min | Same pattern |
| Add `affiliate_id TEXT` column to `job_applications` | 2.4 | 15 min | Consistency across all submission tables |

**Phase 1 total: ~45 min** (including migration file creation and verification)

### Phase 2: Affiliate Cookie Hook (React)

**No backend dependency — can run in parallel with Phase 1.**

| Task | Feature ID | Est. Effort | Notes |
|------|-----------|-------------|-------|
| Build `useAffiliateTracking` hook | 2.1 | 1 hour | Reads `?ref=` param, sets `ei_affiliate` first-party cookie (90-day expiry) |
| Integrate hook into `Layout.tsx` or `App.tsx` | 2.1 | 15 min | Runs on every page load |
| Add cookie reader utility for checkout/form submissions | 2.1 | 30 min | Client-side read → include in POST body |

**Phase 2 total: ~1.5–2 hours**

### Phase 3: Edge Function Updates (Supabase / Deno)

**Depends on Phase 1 (DB columns must exist) and Phase 2 (cookie reader utility).**

| Task | Feature ID | Est. Effort | Notes |
|------|-----------|-------------|-------|
| `start-checkout`: Add `EI: Checkout – Pending` tag | 1.1 | 30 min | Fire-and-forget tag at session start |
| `start-checkout`: Accept `affiliate_id` in POST body, save to DB, apply `EI: Affiliate – [ID]` tag | 2.2, 2.3 | 1 hour | Conditional — only when affiliate_id present |
| `submit-form`: Accept `affiliate_id`, save to DB, apply affiliate tag | 2.2, 2.3 | 1 hour | Mirror pattern from start-checkout |
| `submit-job-application`: Accept `affiliate_id`, save to DB, apply affiliate tag | 2.2, 2.3 | 45 min | Same pattern, slightly different payload |
| All edge functions: Add `EI: Chat – Inquiry` tag if `source === 'chat'` | 6.2 | 30 min | Optional — depends on chat attribution data |

**Phase 3 total: ~3.5–4 hours**

### Phase 4: GHL Workflow Configuration (No Code)

**Can begin as soon as Phase 0 is complete. Assign to GHL specialist.**
**See Section 10 "GHL Implementation Taskbook" for full detailed task breakdown.**

| Task | Feature ID | Section 10 Ref | Est. Effort | Notes |
|------|-----------|----------------|-------------|-------|
| Recovery Workflow (30m trigger) | 1.2 | GHL-W1 | 1 hour | Trigger on `EI: Checkout – Pending`, check for `EI: Paid`, send SMS/email with `?resume=[id]` |
| Completion Tag on Payment | 1.5 | GHL-W3 | 30 min | Stripe webhook → `EI: Paid` tag + remove `Pending` |
| Cart Expiry Workflow (7-day) | 1.6 | GHL-W2 | 30 min | Remove `Pending`, apply `EI: Checkout – Expired` |
| Opportunity creation on checkout start | — | GHL-W4 | 1 hour | Auto-create opportunity in Pre-Checkout stage |
| Opportunity stage progression | — | GHL-W5 | 1.5 hours | Auto-move through 5 pipeline stages on tag events |
| SaaS Checkout Pages (8 tiers) | — | GHL-C1–C4 | 3 hours | Create GHL checkout pages, Stripe products, query param mapping |
| Affiliate Dashboard setup | 2.7 | GHL-A1–A3 | 2 hours | GHL Affiliate Manager configuration |
| Deal Registration Form | 2.5 | GHL-A2 | 1 hour | GHL custom form for manual affiliate claims |
| Commission Rules | 2.8 | GHL-A3 | 2 hours | Per-product commission percentages |
| Chat Inquiry → Pre-Checkout placement | 6.3 | GHL-CH1 | 30 min | Workflow: on `EI: Chat – Inquiry` → create opportunity in Pre-Checkout |
| Chat-to-Sales escalation rule | 6.4 | GHL-CH2 | 1 hour | Keyword/duration trigger → notify sales |
| Communications templates (SMS + email) | 1.2, 1.4 | GHL-T1–T3 | 1.5 hours | Cart recovery SMS, email, and expiry notification |
| Reporting dashboards | 3.4, 3.5 | GHL-R1–R2 | 2 hours | Affiliate source + channel ROI reporting |

**Phase 4 total: ~17.5 hours** (GHL config, no site code — expanded from 8.5h with full taskbook scope)

### Phase 5: End-to-End Validation

| Scenario | What to Verify (Site) | What to Verify (GHL) |
|----------|----------------------|---------------------|
| **SC1: Anonymous → Abandon → Recover → Pay** | Visit site → start checkout → abandon → verify Supabase record `status='pending'` | GHL: `EI: Checkout – Pending` tag applied → opportunity created in Pre-Checkout → recovery SMS/email sent after 30m with `?resume=[id]` → user clicks resume link → completes payment → `EI: Paid` tag applied → `Pending` tag removed → opportunity moves to Paid – Onboarding → recovery workflow stops |
| **SC2: Referred Visitor → Form Submit → Affiliate Tracked** | Visit `?ref=PARTNER123` → verify `ei_affiliate` cookie set (90d) → submit contact form → verify `affiliate_id` in `form_submissions` table | GHL: `EI: Affiliate – PARTNER123` tag on contact → Affiliate ID custom field populated → Affiliate Manager shows referral → on conversion, commission tracked |
| **SC3: Chat Prospect → Pipeline → Checkout → Affiliate** | Open chat on landing page → proceed to checkout → verify affiliate tracking still works if `?ref=` was present | GHL: `EI: Chat – Inquiry` tag applied → opportunity created in Pre-Checkout → if chat > X min, sales notified → on checkout start, `Pending` tag added alongside inquiry → full pipeline progression through to Active Customer |
| **SC4: Cart Expiry (7-day)** | Verify no site-side action needed | GHL: After 7 days with no `EI: Paid`, `Pending` tag removed → `EI: Checkout – Expired` tag applied → opportunity closed/archived |
| **SC5: Stripe Payment → Onboarding** | N/A (GHL-only) | GHL: Stripe webhook fires → `EI: Paid` tag applied → snapshot provisioning triggered → intake form sent → welcome email sequence starts → `EI: Onboarding Complete` tag applied after intake → opportunity moves to Snapshot Applied → Active Customer |

---

## Post-MVP Features (P2/P3)

Features deferred from the initial implementation, ordered by business value:

### P2 — Polish (After Core Launch)

| Feature | ID | Owner | Est. Effort | Notes |
|---------|-----|-------|-------------|-------|
| Multi-Touch Recovery (escalation) | 1.4 | GHL | 2 hours | 24h email + 72h final touch |
| First/Last Touch Attribution | 3.2 | Site + GHL | 3 hours | Dual cookie strategy |
| Cookie Lifetime Upgrade Policy | 2.6 | Site + GHL | 2 hours | 90d → lifetime on conversion |
| Promo Code Support | 5.1 | Site + GHL | 1 hour | Pass `coupon` param in redirect URL |
| Exit-Intent Popup | 5.7 | Site | 3 hours | `mouseleave` → modal with chat trigger |
| Social Proof Nudges | 5.6 | Site | 3 hours | Live signup count from Supabase |

### P3 — Lifecycle (Post-MVP per BRD §21)

| Feature | ID | Owner | Est. Effort | Notes |
|---------|-----|-------|-------------|-------|
| Onboarding Automation | 4.1 | GHL | 3 hours | `EI: Paid` → snapshot → intake form |
| Upsell Triggers (30/60/90d) | 4.2 | GHL | 3 hours | Usage-based upgrade nudges |
| Churn Prevention Sequence | 4.5 | GHL | 3 hours | Cancel event → win-back series |
| Review Request Post-Launch | 4.3 | GHL | 1 hour | 7-day delay after `EI: Setup Complete` |
| Renewal Reminders | 4.4 | GHL | 1 hour | 30-day pre-renewal email |
| Referral Landing Pages | 5.10 | Site | 2 hours | SSG pages with pre-filled `?ref=` |
| Chat Attribution Context | 6.2 | Site | 2 hours | Pass UTM/affiliate to chat widget |

---

## Architecture Summary

```
┌────────────────────────────────────────────────────────────────────┐
│                     ENTRY POINTS                                   │
│   Ads · SEO · Referrals (?ref=) · Chat Widget · Direct Traffic    │
└───────────────────────────┬────────────────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────┐
│  everintent.com (Site)             │
│  React (Vite SSG) · Vercel Pro    │
│                                    │
│  • useAffiliateTracking() hook     │
│    → Reads ?ref= → ei_affiliate   │
│    cookie (90-day)                 │
│  • UTM capture (sessionStorage)   │
│  • Checkout UI (3-step)           │
│  • GHL Chat Widget (all pages)    │
│  • GTM dataLayer events           │
│  • Cookie read → POST body        │
└─────────────┬──────────────────────┘
              │ POST (fire-and-forget)
              ▼
┌────────────────────────────────────┐
│  Supabase Edge Functions (Deno)    │
│                                    │
│  • start-checkout                  │
│  • submit-form                     │
│  • submit-job-application          │
│                                    │
│  Each function:                    │
│  ① Save to Supabase (audit)       │
│     → affiliate_id column          │
│  ② Upsert GHL contact             │
│  ③ Apply tier + addon tags         │
│  ④ Apply EI: Checkout – Pending   │
│  ⑤ Apply EI: Affiliate – [ID]    │
│  ⑥ Write detailed sales note      │
│  ⑦ Return redirect URL            │
└─────────────┬──────────────────────┘
              │
     ┌────────┴────────┐
     ▼                 ▼
┌──────────┐   ┌──────────────────┐
│ Supabase │   │     GHL (SoR)    │
│ Postgres │   │                  │
│ (Audit)  │   │ • Contacts       │
│          │   │ • Tags (29)      │
│ Low data │   │ • Notes          │
│ footprint│   │ • Pipeline (5)   │
│          │   │ • Workflows      │
│ Tables:  │   │ • Affiliate Mgr  │
│ checkout_│   │ • Chat Widget    │
│ submissions│ │ • Comms (all)    │
│ form_    │   │ • Billing/Stripe │
│ submissions│ │ • Automations    │
│ job_     │   └──────────────────┘
│ applications│
└──────────┘
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
  → Applies EI: Checkout – Pending tag (abandoned cart trigger)
  → Writes affiliate info into sales note body
  → Returns GHL redirect URL
       │
       ▼
GHL takes over
  → Contact has affiliate tag for commission workflows
  → Affiliate Manager tracks conversion + payout
  → Recovery workflow fires if no EI: Paid within 30m
```

---

## GHL Tag Registry (Quick Reference)

Common tag registry for both chat widget agents and checkout automation:

| Category | Tags | Count |
|----------|------|-------|
| Tier | `EI: Tier – Launch`, `Capture`, `Convert`, `Scale`, `After-Hours`, `Front Office`, `Full AI Employee`, `Web Chat Only` | 8 |
| Add-On | `EI: AddOn – AI Voice Chat`, `Unlimited AI`, `Email Authority`, `Get Paid Now`, `Social Autopilot`, `Omnichannel Inbox` | 6 |
| Lifecycle | `EI: Checkout – Pending`, `EI: Redirected`, `EI: Paid`, `EI: Onboarding Complete`, `EI: Active Customer`, `EI: Checkout – Expired` | 6 |
| Attribution | `EI: Affiliate – [ID]` (dynamic), `EI: Chat – Inquiry` | 2 |
| **Total unique** | | **~22** |

> Chat agents should be trained on this registry so they can see a visitor's current state, affiliate source, and UTMs when providing decision support.

---

## Section 10: GHL Implementation Taskbook

> **Audience:** GHL specialist / ChatGPT agent configuring GoHighLevel.
> **No site code changes.** Everything in this section is GHL-native configuration.
> **Prerequisite:** Phase 0 (tags + pipeline) is ✅ COMPLETE.

### Critical Gap: Tag Name Reconciliation

⚠️ **Before any Phase 3 (edge function) work begins**, the shared GHL client library (`ghlClient.ts`) must be updated. It currently uses **legacy pre-v2.2 tag names**:

| Current in Code | Should Be (matches GHL) |
|----------------|------------------------|
| `EI: AI Mode - M1 After-Hours` | `EI: Tier – After-Hours` |
| `EI: AI Mode - M2 After-Hours + Booking` | *(deprecated — no v2.2 equivalent)* |
| `EI: AI Mode - M3 Missed Call Recovery` | *(deprecated — no v2.2 equivalent)* |
| `EI: AI Mode - M4 Front Line Screener` | `EI: Tier – Front Office` |
| `EI: AI Mode - M5 Full AI Employee` | `EI: Tier – Full AI Employee` |
| `EI: Tier - Smart Site` | `EI: Tier – Launch` |
| `EI: Tier - Smart Lead` | `EI: Tier – Capture` |
| `EI: Tier - Smart Business` | `EI: Tier – Convert` |
| `EI: Tier - Smart Growth` | `EI: Tier – Scale` |
| `EI: Product - Web Chat Only` | `EI: Tier – Web Chat Only` |
| `EI: Checkout Started - T1/T2/T3/T4` | *(deprecated legacy tags)* |

**Action required (Site-side, Task 6.24.5 prerequisite):** Update `ghlClient.ts` `GHL_TAGS` and `TIER_TAG_MAP` to use the v2.2 en-dash tag names that match what exists in GHL. The `start-checkout` edge function already has its own correct `TIER_TAG_MAP` — these must be consolidated.

---

### GHL-W: Workflow Configuration

#### GHL-W1: Abandoned Cart Recovery Workflow

**Feature refs:** 1.2, 1.4
**Trigger:** Tag added → `EI: Checkout – Pending`
**Priority:** P0 (critical for revenue recovery)

| Step | Action | Details |
|------|--------|---------|
| 1 | **Trigger** | Tag Added: `EI: Checkout – Pending` |
| 2 | **Wait** | 30 minutes |
| 3 | **Condition** | Contact does NOT have tag `EI: Paid` |
| 4a | *(If no Paid tag)* **Send SMS** | Template GHL-T1: "Hi {first_name}, you started setting up your {tier} plan but didn't finish. Pick up where you left off: {resume_link}" |
| 4b | *(If no Paid tag)* **Send Email** | Template GHL-T2: Branded email with resume link, plan summary, and "Complete Your Setup" CTA |
| 5 | **Wait** | 24 hours *(P2: Multi-Touch)* |
| 6 | **Condition** | Contact still does NOT have tag `EI: Paid` |
| 7 | *(If no Paid tag)* **Send Email** | Follow-up with social proof / urgency: "X businesses signed up this week" |
| 8 | **Wait** | 48 hours (72h total from start) *(P2: Multi-Touch)* |
| 9 | **Condition** | Contact still does NOT have tag `EI: Paid` |
| 10 | *(If no Paid tag)* **Send Email** | Final touch: "We're holding your spot — here's a direct line to our team if you have questions" |

**Resume link source:** The `?resume=[id]` URL is written into the GHL contact note by the `start-checkout` edge function. The SMS/email templates should reference this from the contact's notes or a custom field.

**Implementation note:** Steps 5–10 are P2 (Multi-Touch Recovery, feature 1.4). For P0 launch, implement steps 1–4 only.

---

#### GHL-W2: Cart Expiry Workflow (7-Day TTL)

**Feature ref:** 1.6
**Trigger:** Tag added → `EI: Checkout – Pending`
**Priority:** P1

| Step | Action | Details |
|------|--------|---------|
| 1 | **Trigger** | Tag Added: `EI: Checkout – Pending` |
| 2 | **Wait** | 7 days |
| 3 | **Condition** | Contact does NOT have tag `EI: Paid` |
| 4a | *(If no Paid tag)* **Remove Tag** | Remove `EI: Checkout – Pending` |
| 4b | *(If no Paid tag)* **Add Tag** | Add `EI: Checkout – Expired` |
| 4c | *(If no Paid tag)* **Update Opportunity** | Move to "Lost" or archive in Checkout Pipeline |
| 5 | *(Optional)* **Internal Notification** | Notify sales: "Cart expired for {contact_name} — {tier} plan" (template GHL-T3) |

---

#### GHL-W3: Checkout Completion (Stripe Payment Success)

**Feature ref:** 1.5
**Trigger:** Stripe webhook → payment success event
**Priority:** P0

| Step | Action | Details |
|------|--------|---------|
| 1 | **Trigger** | Stripe Payment Success webhook (configure in GHL → Payments → Integrations) |
| 2 | **Add Tag** | `EI: Paid` |
| 3 | **Remove Tag** | `EI: Checkout – Pending` (stops recovery workflow GHL-W1) |
| 4 | **Update Opportunity** | Move from "Payment Pending" → "Paid – Onboarding" stage |
| 5 | **Add Tag** | `EI: Redirected` (if not already present — confirms full checkout loop) |

**Critical:** This workflow MUST fire before GHL-W1's 30-minute check. The `EI: Paid` tag is the kill switch for all recovery sequences.

---

#### GHL-W4: Opportunity Creation on Checkout Start

**Feature ref:** Pipeline automation
**Trigger:** Tag added → `EI: Checkout – Pending`
**Priority:** P0

| Step | Action | Details |
|------|--------|---------|
| 1 | **Trigger** | Tag Added: `EI: Checkout – Pending` |
| 2 | **Create Opportunity** | Pipeline: "Checkout Pipeline" → Stage: "Pre-Checkout" |
| 3 | **Set Opportunity Name** | `{contact_name} — {tier_tag}` (extract tier from contact's tier tag) |
| 4 | **Set Opportunity Value** | Monthly value from tier (e.g., $97 for Capture, $197 for Convert). Reference the tier tag to determine value. |
| 5 | **Assign Owner** | Default sales team member or round-robin |

**Value mapping for opportunity:**
| Tier Tag | Monthly Value | Setup Fee |
|----------|-------------|-----------|
| `EI: Tier – Launch` | $0 (one-time $249) | $249 |
| `EI: Tier – Capture` | $97 | $0 |
| `EI: Tier – Convert` | $197 | $0 |
| `EI: Tier – Scale` | $297 | $0 |
| `EI: Tier – After-Hours` | $197 | $997 |
| `EI: Tier – Front Office` | $297 | $1,497 |
| `EI: Tier – Full AI Employee` | $597 | $2,500 |
| `EI: Tier – Web Chat Only` | $79 | $0 |

---

#### GHL-W5: Opportunity Stage Progression

**Feature ref:** Pipeline automation
**Trigger:** Multiple tag events
**Priority:** P1

This can be a single workflow with multiple branches or separate mini-workflows:

| Tag Event | Pipeline Action |
|-----------|----------------|
| `EI: Checkout – Pending` added | → Pre-Checkout (handled by GHL-W4) |
| `EI: Redirected` added | → Move to "Payment Pending" |
| `EI: Paid` added | → Move to "Paid – Onboarding" (handled by GHL-W3) |
| `EI: Onboarding Complete` added | → Move to "Snapshot Applied" |
| `EI: Active Customer` added | → Move to "Active Customer" |
| `EI: Checkout – Expired` added | → Close opportunity as "Lost" |

---

### GHL-C: SaaS Checkout Pages

#### GHL-C1: Create 8 GHL SaaS Checkout Pages

**Priority:** P0 (required for redirect URL to work)

Each tier needs a GHL-hosted checkout page at `https://go.everintent.com/[tier]`:

| Tier Slug | Checkout URL | Stripe Product | Monthly Price | Setup Fee |
|-----------|-------------|---------------|--------------|-----------|
| `launch` | `go.everintent.com/launch` | Launch Website | $249 one-time | — |
| `capture` | `go.everintent.com/capture` | Capture Plan | $97/mo | — |
| `convert` | `go.everintent.com/convert` | Convert Plan | $197/mo | — |
| `scale` | `go.everintent.com/scale` | Scale Plan | $297/mo | — |
| `after-hours` | `go.everintent.com/after-hours` | After-Hours AI | $197/mo | $997 |
| `front-office` | `go.everintent.com/front-office` | Front Office AI | $297/mo | $1,497 |
| `full-ai` | `go.everintent.com/full-ai` | Full AI Employee | $597/mo | $2,500 |
| `web-chat` | `go.everintent.com/web-chat` | Web Chat Only | $79/mo | — |

**For each page:**
1. Create Stripe product + price in GHL Payments
2. Build GHL funnel/checkout page with branded design matching EverIntent aesthetic
3. Configure thank-you/confirmation page (GHL-C2)
4. Test payment flow end-to-end with Stripe test mode

#### GHL-C2: Configure Thank-You Pages

**Feature ref:** 5.2
**Priority:** P1

Each checkout page needs a branded thank-you page that:
- Confirms the purchase and plan name
- Sets expectations for next steps (onboarding timeline)
- Provides support contact info
- Can be a single shared page with dynamic plan name, or per-tier pages

#### GHL-C3: Configure Stripe Products & Prices

**Priority:** P0

For each of the 8 tiers:
1. Create a Stripe product in GHL → Payments → Products
2. Set the correct pricing (monthly recurring or one-time for Launch)
3. For tiers with setup fees (After-Hours, Front Office, Full AI), configure as either:
   - A separate one-time charge at checkout, OR
   - A combined first-month charge (setup + first month)
4. Enable Stripe test mode for validation before going live

#### GHL-C4: Query Parameter Pre-Fill Mapping

**Priority:** P0

The `start-checkout` edge function constructs redirect URLs with these query params:

```
https://go.everintent.com/[tier]
  ?first_name={firstName}
  &last_name={lastName}
  &email={email}
  &phone={phone}
  &company_name={businessName}
```

**GHL configuration required:**
1. Each checkout page must map these URL params to the correct form fields
2. Test that pre-filled values appear correctly in the checkout form
3. Ensure the email field is used for contact matching (so the GHL contact created by the edge function is linked to the payment)

---

### GHL-A: Affiliate Manager Configuration

#### GHL-A1: Configure Affiliate Manager

**Feature ref:** 2.7
**Priority:** P1

| Task | Details |
|------|---------|
| Enable Affiliate Manager in GHL | Settings → Integrations → Affiliate Manager |
| Create affiliate program | Name: "EverIntent Partner Program" |
| Set referral window | 90 days (matches cookie expiry) |
| Configure tracking method | Tag-based: `EI: Affiliate – [ID]` |
| Create affiliate portal page | URL: `partners.everintent.com` or GHL subdomain |

#### GHL-A2: Deal Registration Form

**Feature ref:** 2.5
**Priority:** P1

Build a GHL form or portal feature for affiliates to manually register deals:

| Field | Type | Required |
|-------|------|----------|
| Affiliate ID / Name | Text | Yes |
| Client Email | Email | Yes |
| Client Name | Text | Yes |
| Client Phone | Phone | No |
| Notes / Context | Textarea | No |

**Workflow on submission:** Create or update GHL contact → apply `EI: Affiliate – [ID]` tag → create opportunity in Pre-Checkout if none exists.

#### GHL-A3: Commission Rules

**Feature ref:** 2.8
**Priority:** P1

| Tier | Commission Type | Suggested Rate | Notes |
|------|----------------|---------------|-------|
| Launch ($249 one-time) | One-time | 15–20% ($37–$50) | Single payout |
| Capture ($97/mo) | Recurring | 10–15% ($10–$15/mo) | For X months or lifetime |
| Convert ($197/mo) | Recurring | 10–15% ($20–$30/mo) | Higher value = higher payout |
| Scale ($297/mo) | Recurring | 10–15% ($30–$45/mo) | Top tier website |
| After-Hours ($197/mo) | Recurring + Setup | 10% MRR + 10% setup | Dual commission |
| Front Office ($297/mo) | Recurring + Setup | 10% MRR + 10% setup | Dual commission |
| Full AI Employee ($597/mo) | Recurring + Setup | 10% MRR + 10% setup | Highest value product |
| Web Chat Only ($79/mo) | Recurring | 10% ($8/mo) | Entry-level |
| Add-Ons ($49–$149/mo) | Recurring | 10% | Commission on add-on MRR |

**Decision needed:** Recurring commission duration — lifetime, 12 months, or first 6 months?

---

### GHL-CF: Custom Fields

#### GHL-CF1: Create/Verify Custom Fields

**Priority:** P0 (required for affiliate passthrough)

| Field Name | Field Type | Object | Purpose |
|-----------|-----------|--------|---------|
| `Affiliate ID` | Single Line Text | Contact | Stores the `?ref=` value from cookie. Used by Affiliate Manager for attribution. |
| `Resume Link` | Single Line Text | Contact | *(Optional)* Store the `?resume=[id]` URL directly on the contact for easy access in recovery templates. Currently stored in notes only. |
| `Selected Tier` | Single Line Text | Contact | *(Optional)* Store the tier slug for segmentation and reporting. Currently derivable from tier tag. |
| `UTM Source` | Single Line Text | Contact | *(Optional)* First-touch UTM source for attribution. Currently stored in Supabase only. |
| `UTM Medium` | Single Line Text | Contact | *(Optional)* First-touch UTM medium. |
| `UTM Campaign` | Single Line Text | Contact | *(Optional)* First-touch UTM campaign. |

**Required for Phase 3:** At minimum, the `Affiliate ID` custom field must exist. The edge functions need its GHL field ID to populate it via the API (`customFields` array in the upsert payload).

**Action:** After creating the field in GHL, note down the field ID (visible in GHL custom fields settings) and add it as a Supabase secret (`GHL_AFFILIATE_FIELD_ID`) so edge functions can reference it.

---

### GHL-CH: Chat Automation

#### GHL-CH1: Chat Inquiry → Pipeline Placement

**Feature ref:** 6.3
**Trigger:** Chat widget session opens (or manual tag application)
**Priority:** P1

| Step | Action | Details |
|------|--------|---------|
| 1 | **Trigger** | Tag Added: `EI: Chat – Inquiry` (can be auto-applied by GHL chat widget bot, or manually by agent) |
| 2 | **Condition** | Contact does NOT have an existing opportunity in Checkout Pipeline |
| 3 | **Create Opportunity** | Pipeline: "Checkout Pipeline" → Stage: "Pre-Checkout" |
| 4 | **Set Opportunity Name** | `{contact_name} — Chat Inquiry` |
| 5 | *(Optional)* **Internal Notification** | Notify sales: "New chat inquiry from {contact_name} on {page_url}" |

**Chat widget configuration:**
- GHL Chat Widget → Bot Settings → When chat starts, apply tag `EI: Chat – Inquiry`
- Alternatively, configure the chat bot to ask qualifying questions and only apply the tag when a buying-intent keyword is detected

#### GHL-CH2: Chat-to-Sales Escalation

**Feature ref:** 6.4
**Trigger:** Chat session conditions
**Priority:** P2

| Condition | Action |
|-----------|--------|
| Chat duration > 5 minutes | Internal notification to sales team via Slack/email/SMS |
| Keywords detected: "pricing", "cost", "how much", "plan", "compare", "upgrade" | Apply tag `EI: Chat – High Intent` + notify sales |
| Agent manually escalates | Transfer to live sales rep |

---

### GHL-T: Communications Templates

#### GHL-T1: Cart Recovery SMS Template

**Feature ref:** 1.2
**Priority:** P0

```
Hi {first_name} 👋 You started setting up your {selected_tier} plan with EverIntent 
but didn't finish. No worries — your selections are saved!

Pick up where you left off: {resume_link}

Questions? Reply to this text and we'll help you out.

— The EverIntent Team
```

**Character count:** ~280 (within SMS limit with link shortening)
**Personalization fields:** `{first_name}`, `{selected_tier}` (from tier tag), `{resume_link}` (from contact notes or custom field)

#### GHL-T2: Cart Recovery Email Template

**Feature ref:** 1.2
**Priority:** P0

**Subject line options:**
- "You're almost there, {first_name} 🚀"
- "Your {selected_tier} plan is waiting"
- "Don't lose your spot — complete your setup"

**Body structure:**
1. Personal greeting referencing their selected plan
2. Summary of what they chose (tier + add-ons from contact notes)
3. Clear "Complete Your Setup" CTA button → `{resume_link}`
4. Social proof: "Join X businesses already using EverIntent"
5. Support contact info
6. TCPA-compliant unsubscribe link

#### GHL-T3: Cart Expiry Internal Notification

**Feature ref:** 1.6
**Priority:** P2

Internal-only notification sent to sales team when a cart expires:

```
⏰ Cart Expired: {contact_name}
Plan: {selected_tier}
Email: {email}
Phone: {phone}
Affiliate: {affiliate_id or "None"}
Originally started: {checkout_start_date}

Consider a manual follow-up if this was a high-value prospect.
```

---

### GHL-R: Reporting & Dashboards

#### GHL-R1: Affiliate Source Reporting

**Feature ref:** 3.4
**Priority:** P2

Build a GHL dashboard or report that shows:
- Number of referrals per affiliate (by `EI: Affiliate – [ID]` tag count)
- Conversion rate per affiliate (referrals with `EI: Paid` tag / total referrals)
- Revenue per affiliate (opportunity value for converted referrals)
- Commission owed per affiliate (based on GHL-A3 rules)

#### GHL-R2: Channel ROI Dashboard

**Feature ref:** 3.5
**Priority:** P2

Build a GHL dashboard that compares acquisition channels:
- Group contacts by UTM source (from custom fields or notes)
- Compare: organic, paid (Google/Facebook), referral (affiliate), chat, direct
- Track: leads generated, conversion rate, revenue, cost per acquisition

---

### GHL Task Summary

| Category | Task Count | P0 Tasks | P1 Tasks | P2 Tasks | Total Est. Effort |
|----------|-----------|----------|----------|----------|-------------------|
| GHL-W (Workflows) | 5 | W1, W3, W4 | W2, W5 | — | 4.5 hours |
| GHL-C (Checkout Pages) | 4 | C1, C3, C4 | C2 | — | 3 hours |
| GHL-A (Affiliate) | 3 | — | A1, A2, A3 | — | 5 hours |
| GHL-CF (Custom Fields) | 1 | CF1 | — | — | 30 min |
| GHL-CH (Chat) | 2 | — | CH1 | CH2 | 1.5 hours |
| GHL-T (Templates) | 3 | T1, T2 | — | T3 | 1.5 hours |
| GHL-R (Reporting) | 2 | — | — | R1, R2 | 2 hours |
| **Totals** | **20** | **7** | **7** | **6** | **~18 hours** |

### GHL Implementation Order

```
Phase 0 ✅ (Tags + Pipeline — DONE)
    │
    ▼
GHL-CF1 (Custom Fields — Affiliate ID)          ← NEXT
    │
    ├──▶ GHL-C1, C3, C4 (SaaS Checkout Pages)   ← Can parallel
    │
    ▼
GHL-W4 (Opportunity Creation)
GHL-W3 (Stripe Payment → Paid tag)
GHL-W1 (Cart Recovery — 30m, P0 steps only)
GHL-T1, T2 (Recovery SMS + Email templates)
    │
    ▼
GHL-W2 (Cart Expiry — 7 day)
GHL-W5 (Stage Progression)
GHL-C2 (Thank-You Pages)
GHL-CH1 (Chat → Pipeline)
GHL-A1, A2, A3 (Affiliate Manager)
    │
    ▼
GHL-CH2 (Chat Escalation)
GHL-T3 (Expiry Notification)
GHL-R1, R2 (Reporting)
```
