# No-Drift AI Upgrade — Site Audit & Integration Analysis

**Status:** Analysis only. No code changes proposed yet.
**Product:** No-Drift AI Upgrade — $147/mo + $497 AI Training & Implementation
**Positioning:** Universal upsell across every AI Employee tier (and the Scale Smart Website tier, which bundles AI Chat). Version-controlled, staged, operator-approved AI on a visual decision canvas. Cannot generate responses outside what was built and approved.

---

## 1. Checkout Config Audit

**File:** `src/config/checkoutConfig.ts`

### Current product structure

- Two product lines via `productLine: 'smart-websites' | 'ai-employee'` on every `TierConfig` (lines 30, 35–169).
- Tier IDs live in the `TierSlug` union (lines 13–21): `launch`, `capture`, `convert`, `scale`, `after-hours`, `front-office`, `full-ai`, `web-chat`.
- Each tier carries: `displayName`, `tagline`, `monthlyPrice`, `setupFee`, `isOneTime`, `productLine`, `ghlCheckoutPath`, `features[]`.
- AI Employee tiers and pricing (lines 105–168):
  - `web-chat` — $79/mo + $497 setup
  - `after-hours` — $197/mo + $997 setup
  - `front-office` — $297/mo + $1,497 setup
  - `full-ai` — $597/mo + $2,500 setup

### Add-on structure

- `AddonSlug` union (lines 175–181) and `AddonConfig` record (lines 193–239).
- Each add-on has `slug`, `displayName`, `description`, `monthlyPrice`, `ghlTag`, optional `includedInTiers`.
- GHL tag pattern: `ei: addon - {slug-words}` (matches the GHL Tag Registry memory).
- `includedInTiers` is the existing mechanism for "this is bundled in tier X" — used today for `email-authority` (in Scale), `ai-voice-chat` (in Full AI), `unlimited-ai` (in Full AI).
- Pricing model is **monthly only** for add-ons. There is **no field for a setup fee on add-ons today.** The No-Drift product is the first add-on to introduce a one-time training fee ($497).

### Where No-Drift slots in

1. Extend `AddonSlug` union with `'no-drift-ai'`.
2. Extend `AddonConfig` interface with an optional `setupFee?: number` (default 0). This is a breaking-but-additive schema change — every add-on consumer (`OrderSummary`, `CheckoutStep1Selection`, `CheckoutStep3Review`) needs to read it and add to `setupTotal`.
3. New entry:
   ```ts
   'no-drift-ai': {
     slug: 'no-drift-ai',
     displayName: 'No-Drift AI Upgrade',
     description: 'Version-controlled AI on a visual canvas. Operator approves every word before it goes live. Can\'t hallucinate, can\'t drift.',
     monthlyPrice: 147,
     setupFee: 497,
     ghlTag: 'ei: addon - no-drift ai',
   }
   ```
4. **Do not** put it in `includedInTiers` for any tier — it is a true universal upsell, never bundled.
5. The `monthlyTotal` calculation in `CheckoutPage.tsx:255-258` already iterates add-ons. The `setupTotal` calculation at line 259 currently reads only from the tier — this needs to become `tierConfig.setupFee + sum(addon setupFees)`.

### Naming convention compliance

- Slug `no-drift-ai` (kebab-case) ✓
- Display name `No-Drift AI Upgrade` (matches "Upgrade" framing) ✓
- GHL tag `ei: addon - no-drift ai` follows registry standard from memory `mem://integrations/ghl-tag-registry-and-pipeline-standard`.

---

## 2. Pricing Page Audit

**File:** `src/pages/Pricing.tsx`

### Where AI Employee tiers are listed

- `aiPlans` array (lines 71–121) drives the AI tab cards: After-Hours, Front Office, Full AI Employee (`featured: true`), Web Chat Only.
- AI plan cards render in a horizontal stacked row layout matching the Smart Websites layout (same component pattern as `AIEmployee.tsx` lines 220–275).
- The "Cost of Doing Nothing" band (lines 213–234) sits above both tabs and frames every plan as a missed-call recovery decision.

### Visual hierarchy today

- Tab switcher → Cost-of-inaction band → toggle (Smart Websites only) → 4 stacked plan cards → comparison table (Smart Websites desktop only) → recommended add-ons section is **absent on this page** (it lives only on Smart Website tier landing pages, see §3).
- Add-ons are not surfaced anywhere on `/pricing`. The first time a buyer sees add-ons is inside the checkout flow at Step 1.

### Recommended placement for No-Drift

**Recommendation: A dedicated full-width "Upgrade" band that sits between the AI plan cards and the FAQ, plus a small "+ No-Drift available" inline note inside each AI plan card.**

Rationale by option:

| Option | Verdict |
|---|---|
| Separate add-on row at bottom of AI tab | ✅ Required. This is the "real upsell" surface — full headline, value prop, CTA. |
| Stacked option below each tier | ❌ Clutters cards, makes monthly price feel inflated, easy to scan past. |
| "Recommended" callout on Full AI Employee only | ❌ Wrong product positioning — it's universal, not premium-only. |
| Its own card mixed in with the 4 tiers | ❌ Confuses the tier mental model. It's not a tier. |
| Inline "+ Add No-Drift for $147/mo" line in each card | ✅ Pair with #1. Plants the seed before the buyer scrolls. |

The dedicated band should fire below the 4 AI cards, above any FAQ block, with its own visual treatment (border, the "shield" icon family from `lucide-react`, and a CTA that goes to `/no-drift-ai` if a dedicated page is built — see §7).

---

## 3. AI Employee Tier Pages Audit

### Inventory

| Tier | Landing page file | Has dedicated landing page? |
|---|---|---|
| After-Hours | `src/pages/ai-employee/AfterHours.tsx` | ✅ |
| Front Office | `src/pages/ai-employee/FrontOffice.tsx` | ✅ |
| Full AI Employee | `src/pages/ai-employee/FullAIEmployee.tsx` | ✅ |
| Web Chat Only | **none** — referenced in `aiPlans` but `href` for it points to `/contact` on the AI Employee hub (`AIEmployee.tsx:80`) and `/checkout/web-chat` from Pricing | ❌ **Gap.** |

The AI Employee hub (`src/pages/AIEmployee.tsx`) is the umbrella page; tier landing pages live under `/let-ai-handle-it/{tier}`.

### Where the "drift problem" lands naturally on each

- **AfterHours.tsx** — pain point belongs near the "11pm emergency" transcript proof. Frame: "Your AI shouldn't invent prices at 11pm. No-Drift means the only quotes it gives are ones you approved."
- **FrontOffice.tsx** — pain point belongs near call screening / qualification copy. Frame: "Your AI is the front door. If it screens wrong or quotes wrong, you look amateur. No-Drift puts every script under your control."
- **FullAIEmployee.tsx** — strongest fit. Frame the upsell as the natural completion: "You bought the full AI front office. Now make it operator-controlled so it never goes off-script."
- **(Future) Web Chat Only page** — strongest cost-of-error fit. Web chat hallucinations get screenshotted. Position as the **default** companion product for any chat-only buyer.

### Recommended placement on every tier page

1. A short "AI without guardrails is a liability" pain section between the existing "How it works" and "Pricing/CTA" sections.
2. A `<NoDriftUpsellCard>` component that renders the same content the Pricing page uses (single source of truth via a shared component in `src/components/ai-employee/`).
3. The CTA on the upsell card should go to a `/no-drift-ai` deep-dive page (see §7) rather than directly to checkout — this lets us close the buyer who isn't yet sold on the parent tier.

---

## 4. Checkout Flow Audit

**File:** `src/pages/checkout/CheckoutPage.tsx` and `src/components/checkout/*`

### Current flow

1. **Entry:** `/checkout/{tier}` — tier extracted from URL path (line 68). Default fallback is `capture`.
2. **Step 1 — Selection** (`CheckoutStep1Selection.tsx`):
   - Confirms pre-selected tier (lines 72–138).
   - "Change" button reveals product-line tabs (lines 139–198).
   - **Add-ons grid renders here** (lines 200–271). Every add-on from `ADDON_CONFIG` is shown as a checkbox card. Included-in-tier add-ons render disabled with "Included" pill.
   - "Continue" button → Step 2.
3. **Step 2 — Details:** name, email, phone, business, domain, TCPA consent.
4. **Step 3 — Review:** summary + Submit → calls `start-checkout` edge function → redirects to `go.everintent.com/{ghlCheckoutPath}` (Stripe via GHL).
5. **Order Summary sidebar** (`OrderSummary.tsx`) is sticky on desktop and shows on top on mobile. It already itemizes add-ons (lines 49–66) and the one-time setup (lines 77–82). Today only the tier setup feeds `setupTotal`; add-on setups are not modeled.

### Where the universal upsell prompt should appear

**Recommendation: Make No-Drift a first-class element of Step 1, NOT a separate interstitial step.**

Two reasons:
- v5.2 spec is a 3-step flow. Adding a step adds friction and breaks the tracker, the GTM events, and the Storage schema.
- The post-tier-select / pre-payment moment IS Step 1. The buyer is already there to confirm tier and pick add-ons.

Concretely:

- Render a **dedicated, visually elevated "No-Drift Upgrade" card ABOVE the standard add-ons grid** in `CheckoutStep1Selection.tsx`. Treat it like a featured upsell, not a peer of Email Authority and Get Paid Now.
- Only render this card when the selected tier is in the AI Employee product line OR is `scale` (which bundles AI Chat). For Smart Websites Launch/Capture/Convert, it's not relevant — they don't have AI to drift.
- Mark it visually distinct (gold border, "Recommended" badge, shield icon).

### Upsell card spec

- **Eyebrow:** "Recommended Upgrade"
- **Headline:** "Add No-Drift AI — the AI that can't go off-script"
- **Sub (1–2 lines):** "Standard AI chatbots drift, hallucinate, and quote prices that don't exist. No-Drift is version-controlled, staged, and approved by you before it ever talks to a customer."
- **Pricing line:** "+ $147/mo · + $497 one-time AI Training & Implementation"
- **Buttons:** Primary "Add to my plan" (toggles selection in state.addons), Secondary "Skip — I'll risk it" (textual decline that closes the card for the session). Decline should fire `addon_toggled` with `selected: false` so we can measure decline rates.
- **Trust micro-copy below buttons:** "You can add this later — but every conversation before then is one you can't take back."
- **Schema event:** `no_drift_upsell_shown` and `no_drift_upsell_decision` (accept/decline) — extend `src/lib/checkoutAnalytics.ts`.

### What changes downstream when this add-on is selected

- `OrderSummary.tsx` — already lists add-ons by name and monthly price. Needs to also include the add-on `setupFee` in the one-time setup line.
- `CheckoutPage.tsx:259` — `setupTotal` calc must include selected add-on setup fees.
- `CheckoutStep3Review.tsx` — review must show the No-Drift line item with its monthly + one-time components broken out.
- `start-checkout` edge function — already receives `addons` with `slug`, `name`, `monthlyPrice`, `ghlTag` (`CheckoutPage.tsx:350-355`). Add `setupFee` to that payload and into `setup_total` arithmetic.
- GHL: tag `ei: addon - no-drift ai` and a separate one-time product line for the $497 must be configured on the GHL side.

---

## 5. FAQ System Audit

**File:** `src/data/faqs.ts`

### Schema relevant to No-Drift

- `FAQCategory` (line 16) — No new category needed. Use existing `'ai-employee'` and `'pricing'`.
- `FAQTag` (lines 18–22) — Recommend **adding** two new tags: `'no-drift'`, `'reliability'`. Both are additive and won't break existing filters.
- `ProductTag` (lines 24–27) — Recommend **adding** `'no-drift-ai'` so FAQs can be filtered to just No-Drift contexts.
- `priority` and `isObjection` are already supported — use `isObjection: true` for the cost and "isn't this just better Conversation AI" questions so they sort to the top via the existing `objectionsFirst` flag in `FAQSection`.

### Recommended 6–8 No-Drift FAQs

1. **Cost objection** (`isObjection: true`) — "Is $147/mo extra worth it just to stop hallucinations?" — Frame against one wrong-price job (e.g., AI quoted $89 when it should have been $389 = full year of No-Drift).
2. **"Isn't this just better Conversation AI?"** (`isObjection: true`) — Distinguish: standard AI = generative, infers, can invent; No-Drift = decision canvas with explicit branches, only says what's been built and approved.
3. **What happens when the AI doesn't know something?** — It hands off (text the owner, book a callback, escalate to human chat). It does not guess. Frame as the feature, not the limitation.
4. **Can I update it later?** — Yes. Operator edits in staging, tests, ships. Versioned. Old version stays live until new version is approved.
5. **Do I have to retrain the AI from scratch?** — No. Edits are surgical: change one branch, change one script line, ship. The $497 covers initial build and the staging environment.
6. **Complexity / "do I need to be technical?"** — No. We build it with you. You approve the conversation flow in plain English. We handle the canvas.
7. **What about voice AI hallucinations specifically?** — Same engine. Voice agent uses the same approved decision tree, so it can't quote a price you didn't set or invent business hours.
8. **Can I A/B test scripts?** — Yes. Stage a new version, route a percentage of traffic, promote the winner. (Optional — only include if this is actually on the roadmap.)

All eight should carry: `category: 'ai-employee'`, `tags: ['no-drift', 'reliability', ...]`, `products: ['no-drift-ai']` and the three relevant AI tier slugs so they auto-appear on those tier pages.

---

## 6. Industry Showcase Audit

### Files with AI mentions worth a No-Drift cross-reference

| File | High-stakes wrong-info risk? | Recommended treatment |
|---|---|---|
| `src/pages/industries/HealthWellness.tsx` | **Critical.** HIPAA exposure, medical info, scheduling. The existing FAQ at `faqs.ts:724` already says "the AI doesn't access patient records" — that's a *boundary* claim that No-Drift makes enforceable. | Add a "Why No-Drift matters in healthcare" callout. |
| `src/pages/industries/HealthWellnessShowcase.tsx` | Same as above. | Cross-link to `/no-drift-ai`. |
| `src/pages/industries/ProfessionalServices.tsx` | **Critical for legal/financial verticals** named on the page. Wrong policy, wrong fee, wrong availability all create real liability. | Add a "Compliance-grade AI" section. |
| `src/pages/industries/ProfessionalShowcase.tsx` | Same. | Cross-link. |
| `src/pages/industries/Automotive.tsx` | **High.** Pricing FAQ at `faqs.ts:693` and `faqs.ts:791` already promises "accurate estimates" and "accurate ballpark quotes" — those promises are the exact failure mode No-Drift fixes. | Update those answers to credit No-Drift, or add "How we keep estimates accurate" sidebar. |
| `src/pages/industries/AutomotiveShowcase.tsx` | High. | Cross-link. |
| `src/pages/industries/HomeServices.tsx` | Medium. Wrong dispatch info, wrong service area. | Light callout. |
| `src/pages/industries/HomeServicesShowcase.tsx` | Medium. | Light callout. |

**Real Estate** is mentioned in copy but not yet a dedicated industry page. When it's built, it needs the same treatment as legal/financial — wrong square footage, wrong price, wrong availability are all litigation-grade errors.

---

## 7. Dedicated Page Recommendation

**Recommendation: Build a dedicated `/no-drift-ai` page.**

Reasons:
1. **SEO surface.** Keywords like "AI hallucination," "deterministic AI agent," "AI drift" need a page to rank against. Cross-product upsell components don't get indexed as their own destinations.
2. **AEO bait.** Gemini/ChatGPT/Perplexity will cite a focused page when asked "how do I keep my AI from hallucinating" — they will not cite a checkout step.
3. **Sales tool.** A dedicated URL is shareable in DMs, GHL drip campaigns, and proposals.
4. **Comparison table needs space** — generative vs. deterministic side-by-side requires a real layout.

### Proposed section outline

1. **Hero** — "Your AI shouldn't invent prices, policies, or business hours." + the three problem framings (credibility / bleeding wound / burnout) condensed into 3 chips.
2. **The drift problem** — 2–3 short scenarios: AI quotes wrong price, AI invents a service you don't offer, AI gives wrong hours during a holiday. (Real or representative.)
3. **How No-Drift works** — visual canvas screenshot or animated diagram. Build → Stage → Approve → Ship.
4. **Generative AI vs No-Drift comparison table** — Drift risk, Hallucination, Operator control, Update workflow, Compliance posture, Where outputs come from.
5. **What you control** — explicit list: every script line, every price, every policy, every escalation rule.
6. **What happens when the AI doesn't know** — frame as feature.
7. **Industries where this matters most** — link to Health, Professional, Automotive industry pages.
8. **Pricing band** — $147/mo + $497 one-time. CTA: "Add No-Drift to my plan" → routes to `/checkout/{lastViewedTier or full-ai}` with the add-on pre-selected via query param (e.g. `?addon=no-drift-ai`).
9. **FAQ section** — uses `<FAQSection products={['no-drift-ai']} />` to pull the 6–8 FAQs from §5.
10. **Final CTA** — book a call OR add to plan.

The cross-product upsell card (in `/pricing`, in tier pages, in checkout Step 1) all link to this page when the buyer wants to learn more.

---

## 8. Navigation, Footer, Sitemap

### Header (`src/components/layout/Header.tsx`)

- Primary nav today: Let AI Handle It, Smart Websites, Industries, (more), Pricing.
- **Recommendation:** Do **not** add No-Drift to primary nav. It's an upsell, not a tier. Adding it dilutes the existing tier mental model.
- Instead: add a "No-Drift AI" item inside the **"Let AI Handle It" dropdown** (`NavDropdown`) as the last item, with a small badge ("Upgrade" or "New"). This keeps it discoverable without confusing the buying journey.

### Footer (`src/components/layout/Footer.tsx`)

- Footer link group structure shown at lines 65–80 and 187–200.
- **Recommendation:** Add `No-Drift AI Upgrade → /no-drift-ai` under whichever footer column hosts AI Employee links. This is the right "directory" surface for crawlers and curious buyers.

### Sitemap (`scripts/generate-sitemap.ts` + `public/sitemap.xml`)

- Add `/no-drift-ai` at priority `0.8`, changefreq `monthly`. Higher than location pages, equal to top-tier landing pages.
- Ensure it's NOT in `EXCLUDED_PREFIXES`.

### Routes (`src/routes.tsx`)

- Register `/no-drift-ai` as a top-level route. Per the SSG routing memory, use a native `<a>` tag from anywhere it's linked, not React Router `<Link>`.

---

## 9. SEO Strategy

### Page metadata (for `/no-drift-ai`)

- **Title (under 60 chars):** `No-Drift AI: The AI Agent That Can't Hallucinate`
- **Meta description (under 160):** `Stop AI from quoting wrong prices, inventing policies, or making up business hours. No-Drift AI is version-controlled, staged, and approved by you before it talks to a customer. $147/mo.`
- **Canonical:** `/no-drift-ai`
- **OG image:** Reuse the EverIntent space-aesthetic OG template per `mem://marketing/og-image-management`. Headline overlay: "AI That Can't Drift."

### Schema markup

- `Product` schema with `offers` (Offer with `price: 147`, `priceCurrency: USD`, `priceSpecification` for the recurring billing, plus a separate Offer for the $497 setup).
- `FAQPage` schema auto-generated by `<FAQSection />` (already wired — see `src/components/faq/FAQSection.tsx:90-95`).
- `BreadcrumbList` per existing SEO component conventions.
- Consider `SoftwareApplication` `additionalType` since the canvas is a configurable system.

### Target keywords (high-intent / low-competition combo)

| Keyword | Intent | Why us |
|---|---|---|
| AI hallucination prevention | Defensive | We literally prevent it. |
| AI chatbot wrong information | Pain | Maps to bleeding-wound buyer. |
| Deterministic AI agent | Technical buyer | We are deterministic by design. |
| AI drift | Educational | Owns the term. |
| AI agent off-script | Pain | Direct match. |
| Controlled AI for small business | Buyer-side | Maps to credibility buyer. |
| Version-controlled AI workflow | Technical | Differentiator. |
| AI guardrails for service businesses | Vertical | Bridges to industry pages. |
| HIPAA-safe AI receptionist | Vertical | Connects to HealthWellness. |
| Compliance-grade AI for law firms | Vertical | Connects to ProfessionalServices. |

### Internal linking

- Every AI Employee tier page links into `/no-drift-ai` from the upsell card.
- `/no-drift-ai` links out to all four AI Employee tier pages.
- Industry pages (Health, Professional, Automotive) link in via the compliance/accuracy callouts.
- Pricing page links in from the upsell band.
- Checkout Step 1 upsell card has a "Learn more" link to `/no-drift-ai` (opens in new tab so as not to break the checkout session).

---

## 10. Copy Voice Audit

### Voice benchmarks observed

- Established voice (per `mem://style/voice-calibration-standard-portfolio-anchor`): declarative, outcome-driven, owner-operator vernacular, no hedging, no marketing fluff. Examples: "Stop Losing Money. Pick Your Plan." (`Pricing.tsx:170`), "Let AI Handle It" (`AIEmployee.tsx:132`), "Never miss a lead." (multiple).
- The No-Drift positioning **maps cleanly** to this voice. Sample direct-voice lines that already feel native:
  - "AI that can't drift."
  - "You approve every word."
  - "Build it once. Ship it. Walk away."
  - "Standard AI invents. No-Drift doesn't."

### Existing copy that becomes more honest with No-Drift (or oversold without it)

These are claims currently made on the site that are **load-bearing on AI accuracy** — they are honest if No-Drift exists, optimistic if it doesn't:

| File:Line | Existing copy | Risk |
|---|---|---|
| `src/data/faqs.ts:693` | "It provides accurate estimates for standard services like oil changes, brakes, and diagnostics." | Standard AI can invent prices. Needs No-Drift to be defensible. |
| `src/data/faqs.ts:724` | "The AI doesn't access patient records. It only handles scheduling and general inquiries." | This is a *boundary* claim. Standard AI can be prompt-injected to discuss anything. No-Drift makes the boundary structural, not aspirational. |
| `src/data/faqs.ts:791` | "It provides accurate ballpark quotes while being transparent about on-site evaluation needs." | Same as the auto pricing line — accuracy is a function of guardrails. |
| `src/data/features/after-hours-features.ts:34` | "AI captures caller details accurately." | Capture is one thing — it's the *response* side that drifts. Verify this line refers to data capture (low risk) and not response accuracy (high risk). |
| `src/pages/AIEmployee.tsx:51` (transcript proof: "AI responded in 12 seconds, booked a 7am appointment") | Implies the booking decision was correct. | With standard AI, the booked time slot could conflict with reality. No-Drift makes this claim safer. |
| FAQ `objection-robot` (`faqs.ts:50-51`) | "94% of callers rate the experience 4+ stars. And most don't even realize they're talking to AI." | If the AI hallucinates a price, that 4-star rating becomes a 1-star refund request. No-Drift protects this stat. |

**Recommendation:** Do not rewrite these now. After No-Drift launches, revisit and add either a No-Drift micro-credit or an explicit "with No-Drift Upgrade" qualifier where the claim is strongest. The honest version of every accuracy claim becomes "If you add No-Drift, this is structurally true. Without it, we work hard to keep it true."

There is **no current copy that promises "won't make mistakes" or "never wrong"** in the audited files. Verified via search for `won.t make`, `never wrong`, `always accurate`, `no mistake` — zero matches in marketing copy. That's a clean baseline. Don't introduce those claims now and then walk them back.

---

## Recommended Next Steps (for the implementation spec)

The implementation spec should cover, in this order:

1. **Schema changes** — `AddonConfig.setupFee` field; `'no-drift-ai'` in `AddonSlug`; `'no-drift'` and `'reliability'` in `FAQTag`; `'no-drift-ai'` in `ProductTag`; `addon-setup-fee` arithmetic in `CheckoutPage` + `OrderSummary` + `CheckoutStep3Review` + `start-checkout` edge function.
2. **GHL setup** — confirm tag `ei: addon - no-drift ai`, create $497 one-time line item, create $147/mo recurring line item, confirm tags flow on submit.
3. **No-Drift checkout upsell** — new `<NoDriftUpsellCard>` rendered above the standard add-ons grid in `CheckoutStep1Selection`, only for AI Employee tiers and Smart Websites Scale. Two new analytics events.
4. **Dedicated page** — `/no-drift-ai` with the 10-section outline from §7. Route registered, sitemap updated, internal links added.
5. **Tier landing page integration** — shared `<NoDriftUpsellCard>` placed in After-Hours, Front Office, Full AI Employee landing pages. Link to `/no-drift-ai` for deep-dive.
6. **Pricing page** — full-width upsell band on the AI tab below the 4 plan cards; small inline note inside each AI plan card.
7. **FAQ content** — write and add the 6–8 FAQs from §5 with proper category/tag/product wiring.
8. **Industry callouts** — Health, Professional Services, Automotive get a No-Drift compliance/accuracy callout linking to `/no-drift-ai`.
9. **Navigation** — add to "Let AI Handle It" dropdown with an "Upgrade" badge; add footer link.
10. **Web Chat Only landing page** — separate effort, but flagged by this audit as a missing tier page. When built, No-Drift is the default companion product for that tier.
11. **SEO** — title/meta/schema per §9; add target-keyword copy throughout the new page.
12. **Existing-copy review pass** — after launch, qualify the accuracy-bearing FAQ answers identified in §10 with No-Drift attribution where it strengthens the claim.

No code has been modified. This document is the input for the implementation spec.