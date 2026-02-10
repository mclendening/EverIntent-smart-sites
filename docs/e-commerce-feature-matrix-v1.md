# EverIntent E-Commerce & Affiliate Feature Matrix — Enhanced BRD Analysis

**Purpose**: Provide a comprehensive, BRD-aligned feature matrix that integrates the EverIntent tech stack (Supabase + Next.js on Vercel Pro + GoHighLevel) and clearly ties each feature to the business goals defined in BRD v35.3.

## Business Goals Recap

1. **Revenue at Every Step** – every interaction must be monetized; free offerings only when they lead to larger revenue.
2. **Asset Ownership** – EverIntent owns domains, phone numbers, traffic, and analytics; customers can churn without jeopardizing core assets.
3. **Single Stack, Multiple Revenue Paths** – unify the tech stack to support multiple revenue models (smart websites, AI employees, add‑ons).
4. **Relationship → Trust → MRR** – nurture leads through trust‑building interactions to drive recurring revenue.
5. **Self‑Serve Conversion > 30 %** – minimize required sales calls.
6. **Mode Upgrade Rate > 20 % in 90 days** – upsell existing customers.
7. **Partner Program** – incentivize third parties (agencies, consultants) to refer customers via commissions.
8. **Lean Data Footprint** – Supabase for capture/audit; GoHighLevel (GHL) as system of record.
9. **All Comms Via GHL** – no direct marketing from the site or Supabase; GHL manages all outbound.
10. **Scalable Market Coverage** – 65+ verticals across four industries require automation and reuse.

## Feature Matrix

### Cart & Checkout Recovery

| ID | Feature | Description & Implementation | Tech Alignment | Complexity | Goals |
|---|---|---|---|---|---|
| **C1** | **Pending Tag on Start** | When a user begins checkout, the edge function (`start-checkout`) writes to Supabase and calls GHL’s API to tag the contact as `EI: Checkout – Pending` and stores a session ID (resume link). | **Next.js/Vercel Pro** runs the edge function; **Supabase** stores audit; **GHL** holds the contact and tag. | 🟢 Low | G1, G5, G8, G9 |
| **C2** | **Automated Recovery Workflow** | In GHL, create a workflow triggered by `EI: Checkout – Pending`: wait 30 min; if no `EI: Paid` tag, send SMS/email with resume link. For multi‑stage recovery, add further waits at 24 h and 72 h. | **GHL** only; leverages built‑in automations. | 🟢 Low for single reminder; 🟡 Medium if multi‑stage. | G1, G4 |
| **C3** | **Resume Deep Link** | Already implemented; includes a `?resume=[uuid]` param in the GHL sales note so the recovery message can link directly back to the user’s cart state. | Implemented in **Next.js** and **Supabase**; GHL uses it in recovery emails. | ✅ Done. | G5 |
| **C4** | **Completion Tagging** | On Stripe payment webhook, call GHL’s API to add `EI: Checkout – Paid` tag and remove `Pending` tag. | **Next.js** (payment webhook endpoint), **GHL** API. | 🟢 Low. | G8 |
| **C5** | **Session Expiration Logic** | Periodically, GHL workflow removes the `Pending` tag and assigns `EI: Checkout – Expired` if no payment after 7 days. | **GHL** only. | 🟢 Low. | G8 |

### Affiliate & Referral Tracking

| ID | Feature | Description & Implementation | Tech Alignment | Complexity | Goals |
|---|---|---|---|---|---|
| **A1** | **Affiliate Cookie Hook** | Build a React `useAffiliateTracking` hook that reads `?ref=AFFILIATE_ID` from the URL, stores it in a first‑party cookie with 90‑day expiry (or lifetime for explicit referrals), and exposes it to edge functions via headers. | **Next.js** on **Vercel Pro** stores the cookie; `middleware.ts` reads it at the edge. | 🟢 Low | G7, G1 |
| **A2** | **Affiliate ID Passthrough** | In all edge functions (`start-checkout`, `submit-form`, etc.), read the `affiliate_id` cookie and include it in the payload to GHL as a custom field and tag (`EI: Affiliate – [ID]`). | **Vercel Pro** functions make GHL API calls and write to **Supabase**; **GHL** stores the ID/tag. | 🟡 Medium | G7, G8 |
| **A3** | **Affiliate Audit Column** | Add an `affiliate_id` column in `checkout_submissions` and `form_submissions` tables in Supabase. All submissions include this value for internal analytics. | **Supabase** migration; update insertion logic. | 🟢 Low | G8, G7 |
| **A4** | **Affiliate Cookie Duration Policy** | For organic traffic, the cookie uses a 90‑day expiry; for direct referrals (deal registration), set type to `referral` and remove expiry. When a customer converts, permanently associate their GHL contact with the affiliate. | **Next.js** cookie utility; **GHL** custom fields persist affiliation. | 🟡 Medium | G7, G4 |
| **A5** | **Manual Deal Registration** | Provide an affiliate portal (GHL form or custom portal) where a partner can claim a lead if the cookie was missing. It creates or updates the contact with the affiliate ID. | **GHL Affiliate Manager** or custom GHL form. | 🟡 Medium | G7 |
| **A6** | **Affiliate Dashboard & Commissions** | Configure the GHL Affiliate Manager module so partners can view leads, conversion status, and commissions. Set commission rules per plan. | **GHL** configuration. | 🟡 Medium | G7, G1 |

### Attribution & Analytics

| ID | Feature | Description & Implementation | Tech Alignment | Complexity | Goals |
|---|---|---|---|---|---|
| **AT1** | **Persistent UTM Tracking** | Capture UTMs from landing pages into sessionStorage, forward to edge functions, and store in Supabase and GHL note bodies. | Implemented in **Next.js** and **Supabase**; **GHL** displays UTMs in sales notes. | ✅ Done. | G5 |
| **AT2** | **First‑ vs. Last‑Touch Attribution** | Persist first‑touch UTM + affiliate info (90‑day cookie); store last‑touch UTM in session storage. Include both in the submission payload to differentiate initial awareness from conversion channel. | **Next.js** + **Supabase** + **GHL** custom fields. | 🟡 Medium | G5, G7 |
| **AT3** | **GA4/GTM dataLayer Events** | Already implemented: the front‑end pushes `begin_checkout`, `add_to_cart`, and `purchase_redirect` events into `window.dataLayer` so you can set up GA4/Tag Manager conversions. | **Next.js** only; analytics snippet. | ✅ Done. | G5 |
| **AT4** | **Channel & Affiliate ROI Reporting** | Use GHL reports to group revenue by UTM source and by affiliate tag. Supplement with internal Supabase dashboards (e.g. Metabase) to cross‑report. | **GHL** + **Supabase**; no code changes. | 🟢 Low | G7, G1 |

### Post‑Purchase & Lifecycle Automation (GHL‑Only)

| ID | Feature | Description | Complexity | Goals |
|---|---|---|---|---|
| **L1** | **Onboarding Sequence** | On `EI: Paid` tag, automatically provision the client’s sub‑account (via GHL snapshot) and send intake forms and welcome emails. | 🟡 Medium | G4 |
| **L2** | **Upsell Campaign** | At 30/60/90‑day intervals, GHL checks the client’s tier and sends upgrade offers (e.g. from Capture to Convert). | 🟡 Medium | G6, G1 |
| **L3** | **Review Request** | After site launch (signaled by `EI: Setup Complete` tag), send a review request email or text seven days later. | 🟢 Low | G4 |
| **L4** | **Renewal Reminders** | 30 days before annual renewal, send an email reminding clients of the upcoming renewal and upgrade opportunities. | 🟢 Low | G1, G6 |
| **L5** | **Churn Prevention** | On subscription cancel, initiate a win‑back sequence with tailored offers. | 🟡 Medium | G4, G1 |

### E‑Commerce Best‑Practices Enhancements

| ID | Feature | Description | Tech Alignment | Complexity | Goals |
|---|---|---|---|---|---|
| **E1** | **Promo/Coupon Codes** | Add an optional “Promo Code” field in Step 2; pass the code as a param to GHL SaaS checkout. GHL handles discounts; the code can also be logged in Supabase. | **Next.js** + **GHL**; adjust checkout UI and edge functions. | 🟢 Low | G1, G7 |
| **E2** | **Exit‑Intent Pop‑up** | Detect when the user’s cursor leaves the checkout viewport (on desktop) or after an idle timeout (on mobile); display a modal offering a chat with sales or a small discount. | **Next.js** front‑end only; no data persistence. | 🟡 Medium | G1, G5 |
| **E3** | **Social Proof Nudges** | Display dynamic counters (“12 businesses signed up this week”) pulled from Supabase `checkout_submissions` count. | **Next.js** reads the count from an API route; styling in front‑end. | 🟡 Medium | G5 |
| **E4** | **Wishlist / Save For Later** | Persist the selected tier/add‑ons in sessionStorage so users can return later; optionally offer a “remind me” email for leads not ready to buy. | **Next.js** only; optional integration with GHL. | 🟢 Low | G5 |

## Implementation Priority

- **P0 (Sprint 1 – Site‑Side)**: implement features **C1–C4**, **A1–A3**, **E1**, update Supabase schema, and push the cookie hook and affiliate passthrough. Estimated time: 4–6 hours for site code, plus a migration.
- **P0 (Sprint 1 – GHL‑Side)**: configure GHL workflows for recovery (**C2**, **C5**), tags, affiliate dashboard, commission rules, and initial upsell triggers (**L1–L3**). Estimated time: 6–8 hours of GHL configuration.
- **P1 (Sprint 2)**: implement first/last touch attribution (**AT2**), cookie duration policy (**A4**), promo codes (**E1** if deferred), social proof (**E3**), exit pop‑up (**E2**), and manual deal registration (**A5**).  
- **P2 (Later)**: build churn prevention and renewal reminders (**L4–L5**), referral landing pages, multi‑touch recovery escalations, and advanced analytics/dashboards.

## Architecture Diagram (Text)

```
┌────────────────────────────┐
│   everintent.com (Site)    │
│                            │
│  • Affiliate cookie (R/W)  │
│  • UTM capture             │
│  • Checkout UI (3-step)    │
│  • sessionStorage state    │
│  • GTM dataLayer events    │
└─────────────┬──────────────┘
              │ POST (fire-and-forget)
              ▼
┌────────────────────────────┐
│  start-checkout Edge Fn    │
│                            │
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
│ (Audit)  │   │ (SoR)        │
│          │   │              │
│ Low data │   │ • Contacts   │
│ footprint│   │ • Tags       │
│          │   │ • Notes      │
│ Tables:  │   │ • Pipelines  │
│ checkout_│   │ • Workflows  │
│ submissions│ │ • Affiliates │
│ form_    │   │ • Comms      │
│ submissions│ │ • Billing    │
└──────────┘   └──────────────┘
```

**Key Principle:** Supabase stores the minimum needed for audit, recovery links, and internal reporting. GoHighLevel owns the customer lifecycle, communications, affiliate management, and all outbound messaging.
