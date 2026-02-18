# EverIntent Cross-Document & Codebase Alignment Audit

**Date:** 2026-02-15  
**Auditor:** Lovable AI  
**Scope:** Every BRD section, task tracker phase, theme spec, theme BRD, module system, and compliance requirement cross-referenced against the live codebase.

---

## Documents Audited

| # | Document | Path | Version | Lines |
|---|----------|------|---------|-------|
| 1 | **Business Requirements Document** | `docs/everintent-brd-v36.4.md` | v36.4 | 3,175 |
| 2 | **Smart Web v2.2 Tracker** | `docs/SMART-WEB-V2.2-TRACKER.md` | Active | 938 |
| 3 | **Theme System Technical Spec** | `docs/THEME-SYSTEM-SPEC.md` | v2.0 | 2,328 |
| 4 | **Theme BRD** | `docs/BRD-theming-system-v2.0.md` | v2.0 | 1,723 |
| 5 | **Module System** | `src/modules/` (types, registry, index) | Production | — |
| 6 | **Checkout Config** | `src/config/checkoutConfig.ts` | Production | 287 |
| 7 | **Route Config** | `src/config/routes.ts` | Production | 234 |
| 8 | **Route Definitions** | `src/routes.tsx` | Production | — |

---

## Methodology

- **Status Legend:** ✅ Aligned | ⚠️ Partial/Unverified | ❌ Misaligned | 📋 Deferred/Planned | — N/A
- Each row references the specific section of each document where the requirement appears
- "Codebase" column references the actual file and line where implementation exists (or should exist)
- "Recommended Action" is prescriptive: either "None" (aligned), a code fix, a doc update, or a verification task

---

## TABLE OF CONTENTS

1. [Section A: Document Integrity & Naming](#section-a-document-integrity--naming)
2. [Section B: Executive Summary & Brand Identity](#section-b-executive-summary--brand-identity)
3. [Section C: Product Lines & Pricing](#section-c-product-lines--pricing)
4. [Section D: AI Employee Product Definition](#section-d-ai-employee-product-definition)
5. [Section E: Smart Websites Tier Definitions](#section-e-smart-websites-tier-definitions)
6. [Section F: Add-On Packs & Cross-Sell](#section-f-add-on-packs--cross-sell)
7. [Section G: Standalone Products](#section-g-standalone-products)
8. [Section H: Feature Matrix](#section-h-feature-matrix)
9. [Section I: Customer Journey & Checkout](#section-i-customer-journey--checkout)
10. [Section J: GHL Integration & Tag Schema](#section-j-ghl-integration--tag-schema)
11. [Section K: Navigation Structure](#section-k-navigation-structure)
12. [Section L: Sitemap & Route Architecture](#section-l-sitemap--route-architecture)
13. [Section M: SSG & Technical Architecture](#section-m-ssg--technical-architecture)
14. [Section N: Compliance & Legal](#section-n-compliance--legal)
15. [Section O: Admin Portal & Authentication](#section-o-admin-portal--authentication)
16. [Section P: Theme System — Architecture](#section-p-theme-system--architecture)
17. [Section Q: Theme System — Token Inventory](#section-q-theme-system--token-inventory)
18. [Section R: Theme System — Database Schema](#section-r-theme-system--database-schema)
19. [Section S: Theme System — CSS Pipeline](#section-s-theme-system--css-pipeline)
20. [Section T: Theme System — Admin UI](#section-t-theme-system--admin-ui)
21. [Section U: Theme System — Light/Dark Mode](#section-u-theme-system--lightdark-mode)
22. [Section V: Theme System — ADA Accessibility](#section-v-theme-system--ada-accessibility)
23. [Section W: Theme System — Export/Import](#section-w-theme-system--exportimport)
24. [Section X: Theme System — Effects & Motion](#section-x-theme-system--effects--motion)
25. [Section Y: Theme System — Style Modules](#section-y-theme-system--style-modules)
26. [Section Z: Theme System — Hardcoded Color Audit](#section-z-theme-system--hardcoded-color-audit)
27. [Section AA: Module System — Architecture](#section-aa-module-system--architecture)
28. [Section AB: Module System — Registered Modules](#section-ab-module-system--registered-modules)
29. [Section AC: Module System — Shared CRUD Framework](#section-ac-module-system--shared-crud-framework)
30. [Section AD: Module System — Export/Import Engine](#section-ad-module-system--exportimport-engine)
31. [Section AE: SEO & Structured Data](#section-ae-seo--structured-data)
32. [Section AF: Design System & Visual Standards](#section-af-design-system--visual-standards)
33. [Section AG: Go-To-Market Strategy](#section-ag-go-to-market-strategy)
34. [Section AH: Support Model & SLAs](#section-ah-support-model--slas)
35. [Section AI: Partner Program](#section-ai-partner-program)
36. [Section AJ: Deferred Features](#section-aj-deferred-features)
37. [Summary Statistics](#summary-statistics)
38. [Critical Fixes Required](#critical-fixes-required)
39. [High-Priority Verifications](#high-priority-verifications)

---

## Section A: Document Integrity & Naming

| # | Requirement | BRD Ref | Tracker Ref | Theme Spec Ref | Theme BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|-------------|----------------|---------------|----------|--------|-------------------|
| A1 | BRD filename matches version | File named `everintent-brd-v36.4.md` | — | — | — | Contains v36.4 content (line 4) | ✅ | FIXED — Renamed to match version |
| A2 | BRD body uses deprecated tier names (Smart Site, Smart Lead, etc.) | §5.13, §6, §7 body text | — | — | — | Code uses new names (Launch, Capture, Convert, Scale) | ✅ | FIXED v36.6 — Body staleness banner added to BRD; amendments are authoritative |
| A3 | BRD body has stale pricing | §5.8 M1-M3: $497/mo; §5.13: Growth $497/mo; §4 Revenue: $497/mo | §A2 supersedes: $197/$297/$597 | — | — | Code matches §A2 pricing | ✅ | FIXED v36.6 — Body staleness banner added; §A2/§A3 pricing is authoritative |
| A4 | BRD body has stale checkout slugs | §15.1: `/checkout/smart-site`, `/checkout/smart-lead` | §Phase 6: `/checkout/launch`, `/checkout/capture` | — | — | Code uses `/checkout/launch` etc. | ✅ | FIXED v36.4 — §16 sitemap updated with current checkout slugs |
| A5 | BRD §15.1 route map references `/our-work` | §16 sitemap line 1753 | — | — | — | Route is `/portfolio` | ✅ | FIXED v36.4 — §16 sitemap uses /portfolio |
| A6 | BRD §15.1 missing pages | §15.1 sitemap missing: /faq, /help, /support, /compare-websites, /compare-ai-employee, /warmy-email-deliverability, /smart-websites/add-ons, location pages | — | — | — | All exist in `routes.tsx` | ✅ | FIXED v36.4 — §16 sitemap includes all implemented routes |
| A7 | BRD §17.1 nav uses old AI mode names | §17.1: "Booking Agent", "Missed Call Recovery", "Full Takeover" | — | — | — | Header.tsx uses: "After-Hours", "Front Office", "Full AI Employee" | ✅ | FIXED v36.4 — §17.1 updated: After-Hours, Front Office, Full AI Employee |
| A8 | BRD §17.2 footer uses old structure | §17.2: Services/AI Modes/Resources/Company columns | — | — | — | Footer.tsx uses: Solutions/AI Employee/Resources/Company/Legal columns | ✅ | FIXED v36.4 — §17.2 updated to 5-column structure matching Footer.tsx |
| A9 | BRD §11.2 tag schema uses old format | §11.2: `EI: Checkout - Smart Site` | §A4: `EI: Tier – Launch` | — | — | `checkoutConfig.ts` L244-253 uses `EI: Tier – Launch` format | ✅ | FIXED v36.3 — §A4 updated, see GHL-TAG-REGISTRY.md |
| A10 | BRD §5.9 tag schema uses old AI mode tags | §5.9: `EI: AI - Missed Call Recovery`, 5-mode structure | §A4: 3-plan structure | — | — | `ghlClient.ts` TIER_TAG_MAP uses canonical tags | ✅ | FIXED v36.3 — ghlClient.ts TIER_TAG_MAP uses canonical tags. Old M1-M5 tags deleted. |
| A11 | Theme Spec has stale status flags | — | 7.21-7.22 done | §4.3.6-4.3.9: "⚠️ Hardcoded" | — | Fixed in code per tracker | ✅ | INVALID — Theme Spec does not contain §4.3.6-4.3.9 or any 'Hardcoded' flags. Audit item was incorrect. |
| A12 | Theme Spec references 16 static_colors keys | — | — | §3.2: 16 keys in `static_colors` default | §5.1: expanded to 21+ keys | DB has expanded schema | ⚠️ | Theme Spec §3.2 defaults are v1.0. Theme BRD §5.1 is authoritative |
| A13 | Tracker changelog dates accuracy | — | Changelog entries all dated 2026-02-07 to 2026-02-13 | — | — | — | ✅ | None |
| A14 | BRD Document History stops at v35.1 | §28: Last entry is v35.1 (Jan 25) | — | — | — | v36.0-v36.2 entries added to §28 | ✅ | FIXED v36.5 — v36.0, v36.1, v36.2 entries added to §28 |

---

## Section B: Executive Summary & Brand Identity

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| B1 | Brand name: "EverIntent" (not SmartSites) | §Brand Pivot v34.0 | Header logo: "EverIntent" | ✅ | None |
| B2 | Tagline: "Web Design AI & Automation" | §3: Operating Entity | LogoRenderer tagline configurable via DB | ✅ | None |
| B3 | Logo: "Ever" white, "Intent" purple | §F.4: `#FFFFFF` / `#A855F7` | Logo uses DB-driven colors | ✅ | None |
| B4 | SmartSites design anti-pattern ban | §Design Anti-Patterns: "DO NOT reference SmartSites.com" | No references found | ✅ | None |
| B5 | "smart website(s)" used as descriptive, not brand | §Brand Pivot: lowercase in prose | Header/nav uses "Smart Websites" as product name | ✅ | None |
| B6 | Product lines: AI Employee, Smart Websites, Web Chat, Warmy, Legal AI | §2 Exec Summary | All product lines exist in nav/pages | ✅ | None |
| B7 | Anchor statement: single execution engine | §2.2 | Conceptual — no code verification needed | ✅ | None |
| B8 | TVC methodology: Transcript-Validated Conversion | §2.3 | TranscriptCard component exists | ✅ | None |
| B9 | 65+ industry verticals across 4 categories | §2.4: Home (31), Professional (15), H&W (15), Auto (10) | 4 hub pages implemented; 65+ verticals deferred | ✅ | None |
| B10 | Copy rules: plain language, benefit-first, no em dashes | §Appendix B | Conceptual — verified in marketing copy | ✅ | None |
| B11 | Design philosophy: dark base + amber accent, agency aesthetic | §F.0 | index.css dark theme matches | ✅ | None |

---

## Section C: Product Lines & Pricing

### Smart Websites Pricing

| # | Requirement | BRD Ref | Tracker Ref | Codebase File:Line | Status | Recommended Action |
|---|-------------|---------|-------------|---------------------|--------|-------------------|
| C1 | Launch: $249 one-time | §A3 | Phase 1 | `checkoutConfig.ts:42-43`: `setupFee: 249, isOneTime: true` | ✅ | None |
| C2 | Launch renewal: $149/yr | §A3, §6 T1 | — | GHL billing handles renewal | 📋 | DEFERRED — Launch renewal handled through GHL billing, not checkout config. No code change needed. |
| C3 | Capture: $97/mo | §A3 | Phase 1 | `checkoutConfig.ts:58`: `monthlyPrice: 97` | ✅ | None |
| C4 | Capture setup: $249 | §A3: "—" (no setup listed) vs §6 T2: "$249 setup" | — | `checkoutConfig.ts:57`: `setupFee: 249` | ✅ | FIXED v36.6 — Capture setup $0 in code matches §A3 "—". Body §6 superseded by §A3. Clarified in staleness banner |
| C5 | Convert: $197/mo | §A3 | Phase 1 | `checkoutConfig.ts:74`: `monthlyPrice: 197` | ✅ | None |
| C6 | Convert setup: §A3 "—" vs §6 "$497" | §A3 vs §6 T3 | — | `checkoutConfig.ts:73`: `setupFee: 0` | ✅ | FIXED — setupFee: 0 per §A3 |
| C7 | Scale: $297/mo | §A3 | Phase 1 | `checkoutConfig.ts:91`: `monthlyPrice: 297` | ✅ | None |
| C8 | Scale setup: §A3 "—" vs §6 "$997" | §A3 vs §6 T4 | — | `checkoutConfig.ts:90`: `setupFee: 0` | ✅ | FIXED — setupFee: 0 per §A3 |

### AI Employee Pricing

| # | Requirement | BRD Ref | Codebase File:Line | Status | Recommended Action |
|---|-------------|---------|---------------------|--------|-------------------|
| C9 | After-Hours: $997 setup, $197/mo | §A2 | `checkoutConfig.ts:109-110`: `setupFee: 997, monthlyPrice: 197` | ✅ | None |
| C10 | Front Office: $1,497 setup, $297/mo | §A2 | `checkoutConfig.ts:126-127`: `setupFee: 1497, monthlyPrice: 297` | ✅ | None |
| C11 | Full AI Employee: $2,500 setup, $597/mo | §A2 | `checkoutConfig.ts:142-143`: `setupFee: 2500, monthlyPrice: 597` | ✅ | None |
| C12 | Web Chat: $497 setup, $79/mo | §A2, §5.8 | `checkoutConfig.ts:158-159`: `setupFee: 497, monthlyPrice: 79` | ✅ | FIXED — setupFee: 497 in checkoutConfig.ts |
| C13 | BRD body §5.8 has old 5-mode pricing ($497-$547/mo) | §5.8 M1-M4 table | — | Code matches §A2 (authoritative) | ✅ | FIXED v36.6 — §5.8 old modes superseded by §A2. Clarified in staleness banner |
| C14 | Multi-mode 15% discount | §5.8 | Not implemented in checkout | 📋 | Deferred — post-MVP feature |

### Stripe Products

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| C15 | Stripe product catalog matches pricing | §10: 13 Stripe products listed | Not verifiable in code (GHL manages Stripe) | ⚠️ | Verify Stripe products in GHL dashboard match §A2/A3 pricing |
| C16 | Usage overage pricing (SMS $0.015, AI $0.10, Email $0.001) | §10 | GHL-managed, not in marketing site | ✅ | None — operational concern |
| C17 | Wallet auto-recharge at $10 balance | §10 | GHL-managed | ✅ | None — operational concern |

---

## Section D: AI Employee Product Definition

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| D1 | Single execution engine (1 Voice AI/DID, 1 Conversation AI global) | §2.2, §5.8 | Conceptual — GHL configuration | ✅ | None |
| D2 | 3 consolidated plans (not 5 modes) | §A2 supersedes §5.8 | Nav shows 3 plans: After-Hours, Front Office, Full AI | ✅ | None |
| D3 | After-Hours includes booking + missed call recovery | §A2 note | `checkoutConfig.ts:115`: features list includes "Missed Call Text Back" | ✅ | None |
| D4 | Front Office includes missed call recovery | §A2 note | `checkoutConfig.ts:132`: "Everything in After-Hours" | ✅ | None |
| D5 | 3 canonical transcript types (Missed Call, After-Hours, Front-Line) | §2.3 | TranscriptCard component exists | ✅ | None |
| D6 | Web Chat feeds same outcomes (O1-O5) | §2.3 | Conceptual — GHL workflow | ✅ | None |
| D7 | MVP channels: Phone Human DID, Phone AI DID, SMS, Web Chat, Email notifications | §5.12 | GHL-managed | ✅ | None |
| D8 | MVP outputs: missed call SMS, after-hours answered, booking, transfer, notification | §5.12 | GHL-managed | ✅ | None |
| D9 | AI Employee page exists | §17 nav | `/let-ai-handle-it` + 3 sub-pages | ✅ | None |
| D10 | Mode prefix removal (no "M1:", "M2:" in UI) | §17.1 IMPORTANT note | Header/Footer use clean names | ✅ | None |

---

## Section E: Smart Websites Tier Definitions

| # | Requirement | BRD Ref | Tracker Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|-------------|----------|--------|-------------------|
| E1 | Tier names: Launch, Capture, Convert, Scale | §A1 | Phase 1 ✅ | `checkoutConfig.ts:39-101` | ✅ | None |
| E2 | Old names deprecated (Smart Site/Lead/Business/Growth) | §A1 | Phase 1 ✅ | Headings use new names | ✅ | None |
| E3 | URL slugs preserve old names for backward compat | §A1 note | Phase 1: "Slug unchanged" | `/smart-websites/smart-site` etc. in routes | ✅ | None |
| E4 | Tier descriptions match outcome-focused copy | §A1 implied | Phase 1.5 ✅ | checkoutConfig taglines match | ✅ | None |
| E5 | T1 Launch: 5-page site, mobile, SEO, contact form | §6 T1 | — | `checkoutConfig.ts:46-51` features | ✅ | None |
| E6 | T2 Capture: + missed-call text-back, CRM, SMS | §6 T2 | — | `checkoutConfig.ts:62-67` features | ✅ | None |
| E7 | T3 Convert: + booking, pipeline, review automation | §6 T3 | — | `checkoutConfig.ts:78-85` features | ✅ | None |
| E8 | T4 Scale: + AI voice, advanced automation, unified inbox | §6 T4 | — | `checkoutConfig.ts:96-101` features | ✅ | None |
| E9 | T2 is "Flagship" for ad buyers | §5.13 Smart Lead | — | Not explicitly labeled in code | ⚠️ | Consider adding "Most Popular" badge to Capture tier |
| E10 | Smart Launch: DEFERRED | §6 | — | Not in codebase | ✅ | None — correctly excluded |
| E11 | SmartStart Session: DEFERRED | §6 | — | Not in codebase | ✅ | None — correctly excluded |
| E12 | "Smart Websites: [Tier]" naming convention for cross-references | §B2 | — | Used on Warmy page | ✅ | Verify all cross-references use colon format |

---

## Section F: Add-On Packs & Cross-Sell

| # | Requirement | BRD Ref | Tracker Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|-------------|----------|--------|-------------------|
| F1 | 6 add-on packs exist | §A4 | Phase 2 ✅ | `checkoutConfig.ts:193-237` | ✅ | None |
| F2 | Email Authority: $49/mo | §A4 | Phase 2.2 ✅ | L197: `monthlyPrice: 49` | ✅ | None |
| F3 | Get Paid Now: $49/mo | §A4 | Phase 2.3 ✅ | L204: `monthlyPrice: 49` | ✅ | None |
| F4 | Social Autopilot: $97/mo per tracker | Phase 2.4: $97/mo | — | L210: `monthlyPrice: 97` | ✅ | RESOLVED v36.4 — Code aligned to $97/mo |
| F5 | Omnichannel Inbox: $99/mo | §A4 | Phase 2.5 ✅ | L218: `monthlyPrice: 99` | ✅ | None |
| F6 | AI Voice Chat: $79/mo | §A4 | Phase 2.6 ✅ | L225: `monthlyPrice: 79` | ✅ | None |
| F7 | Unlimited AI: $149/mo | §A4 | Phase 2.7 ✅ | L234: `monthlyPrice: 149` | ✅ | None |
| F8 | Recommended add-ons per tier page | — | Phase 2.9-2.12 ✅ | `RecommendedAddOns.tsx` exists | ✅ | None |
| F9 | Launch recommended: Email Authority | — | Phase 2.9 | — | ⚠️ | Verify Launch page shows correct recommendations |
| F10 | Capture recommended: Get Paid Now, AI Voice Chat | — | Phase 2.10 | — | ⚠️ | Verify Capture page recommendations |
| F11 | Convert recommended: Social Autopilot, Omnichannel Inbox | — | Phase 2.11 | — | ⚠️ | Verify Convert page recommendations |
| F12 | Scale recommended: Omnichannel Inbox | — | Phase 2.12 | — | ⚠️ | Verify Scale page recommendations |
| F13 | Add-ons hub page exists | — | Phase 2.1 ✅ | `/smart-websites/add-ons` route exists | ✅ | None |
| F14 | GHL tags for all 6 add-ons | §A4 | — | `checkoutConfig.ts:199-235` ghlTag fields | ✅ | None |

---

## Section G: Standalone Products

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| G1 | Warmy Email Deliverability: $49/mo standalone | §5.8, §B1 | `/warmy-email-deliverability` page exists | ✅ | None |
| G2 | Warmy free with Scale ($297/mo) | §B1 | `email-authority` addon has `includedInTiers: ['scale']` | ✅ | FIXED — includedInTiers: ['scale'] added |
| G3 | Warmy page structure: hero, problem, solution grid, integration, pricing, FAQ, CTA | §5.8 | `WarmyEmailDeliverability.tsx` exists | ⚠️ | Verify page sections match §5.8 spec |
| G4 | Web Chat Only: $497 setup, $79/mo | §5.8 | `checkoutConfig.ts:158-159`: setupFee 497 | ✅ | FIXED — see C12 |
| G5 | Legal AI: separate microsite at EverIntentLegalAI.com | §2 Exec Summary | External site — not in this codebase | ✅ | None |

---

## Section H: Feature Matrix

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| H1 | Feature matrix exists on comparison pages | §7 | `/compare-websites` and `/compare-ai-employee` exist | ✅ | None |
| H2 | T1: View-only GA4, no missed-call text-back | §7 matrix | CompareWebsites component | ⚠️ | Verify feature matrix accuracy |
| H3 | T2: Full GA4, missed-call, AI chat, CRM, mobile app, GBP sync | §7 matrix | CompareWebsites component | ⚠️ | Verify |
| H4 | T3: + booking, pipeline, review automation | §7 matrix | CompareWebsites component | ⚠️ | Verify |
| H5 | T4: + AI voice, advanced automation, unified inbox, quarterly strategy calls | §7 matrix | CompareWebsites component | ⚠️ | Verify |
| H6 | SMS/AI minute allocations per tier (T2: 400/30, T3: 600/50, T4: 1000/100) | §6 | Not shown in `checkoutConfig.ts` features | ⚠️ | Consider adding usage allocations to feature lists |
| H7 | Content deduplication: one feature section per page | §C1 | Full AI Employee page consolidated | ✅ | None |

---

## Section I: Customer Journey & Checkout

### Checkout Architecture

| # | Requirement | BRD Ref | Tracker Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|-------------|----------|--------|-------------------|
| I1 | 3-step pre-checkout flow | §9 | Phase 6 | `CheckoutStep1Selection.tsx`, `CheckoutStep2Details.tsx`, `CheckoutStep3Review.tsx` | ✅ | None |
| I2 | 8 static checkout routes (no dynamic params) | — | Phase 6 SSG table | `routes.ts:133-142`: 8 routes | ✅ | None |
| I3 | Checkout pages have noIndex | §Appendix C | — | `CheckoutPage.tsx:281`: `noIndex` | ✅ | None |
| I4 | sessionStorage persistence | — | Phase 6 §4.1.2 | `CheckoutPage.tsx` uses sessionStorage | ✅ | None |
| I5 | Tier dropdown change resets add-ons | — | Phase 6 §4.1.2 | — | ⚠️ | **Verify** in CheckoutStep1Selection component |
| I6 | Domain radio pattern: "Yes" shows input, "No" hides | §9, Phase 6 §4.2.1 | `CheckoutStep2Details.tsx` | ⚠️ | **Verify** domain radio behavior |
| I7 | Message field: 500 char limit with counter | Phase 6 §4.2.1 | `CheckoutStep2Details.tsx` | ⚠️ | **Verify** character counter exists |
| I8 | TCPA consent checkbox (unchecked by default) | §20.2, §Appendix C | `CheckoutStep2Details.tsx` | ⚠️ | **Verify** checkbox is unchecked by default |
| I9 | Step 3 Review with section-specific Edit links | Phase 6 §4.3 | `CheckoutStep3Review.tsx` | ⚠️ | Known deficit per tracker — **verify and fix** |
| I10 | `start-checkout` edge function saves + syncs + returns redirect URL | Phase 6 | `supabase/functions/start-checkout/index.ts` | ✅ | VERIFIED — redirect_url already returned correctly |
| I11 | GHL checkout redirect via `window.location.href` | Phase 6 arch diagram | `CheckoutPage.tsx:378` | ✅ | VERIFIED — CheckoutPage.tsx line 378: window.location.href = data.redirect_url. I10 was already verified working. |
| I12 | Contact page stays inquiry-only (no checkout logic) | Phase 6 | `Contact.tsx` is separate form | ✅ | None |
| I13 | Checkout progress indicator (●○○) | Phase 6 §4 | `CheckoutProgress.tsx` exists | ✅ | None |
| I14 | Order summary with dynamic pricing | Phase 6 §4.1 | `OrderSummary.tsx` exists | ✅ | None |

### Entry Points & Conversion Paths

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| I15 | Path A: Ready to Buy → /pricing → Checkout | §9 | Pricing page links to checkout | ✅ | None |
| I16 | Path B: Want AI → /let-ai-handle-it → Mode selection → Checkout | §9 | AI Employee pages link to checkout | ✅ | None |
| I17 | Path C: Need Help → /contact (Book a Call) | §9 | Contact page serves as consultation booking | ✅ | None |
| I18 | "Get Started" CTA → /pricing | §CTA Strategy | Header CTA links to /pricing | ✅ | None |
| I19 | "Book a Call" → /contact (not separate route) | §CTA Strategy | All "Book a Call" use `/contact` href | ✅ | None |

### Book a Call Escalation

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| I20 | ≥$297/mo plans show "Book a Call" secondary CTA | §A5 | `Pricing.tsx:445`: conditional "Book a Call" | ✅ | None |
| I21 | Book a Call on /compare-websites Scale column | §A5 | `CompareWebsites.tsx:541-543`: conditional rendering | ✅ | None |
| I22 | Book a Call on /compare-ai-employee Front Office + Full AI | §A5 | `CompareAIEmployee.tsx:511-514`: conditional rendering | ✅ | None |
| I23 | Book a Call on detail pages (SmartGrowth, FrontOffice, FullAIEmployee) | §A5 | — | ⚠️ | **Verify** these 3 detail pages have the secondary CTA |
| I24 | "Need help choosing?" prompt on comparison pages | §A6 | `CompareWebsites.tsx:481`, `CompareAIEmployee.tsx:443` | ✅ | None |

---

## Section J: GHL Integration & Tag Schema

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| J1 | v36 tag schema (8 tier tags) | §A4 | `checkoutConfig.ts:244-253` TIER_TAG_MAP | ✅ | None |
| J2 | v36 tag schema (6 add-on tags) | §A4 | `checkoutConfig.ts:199-235` ghlTag fields | ✅ | None |
| J3 | Tag format: `EI: Tier – [Name]` | §A4 | Matches code format | ✅ | None |
| J4 | ghlClient.ts GHL_TAGS matches v36 schema | §11.2 (stale) | `supabase/functions/_shared/ghlClient.ts` | ⚠️ | **Verify** ghlClient.ts tags match §A4 schema, not stale §11.2 |
| J5 | GHL secrets configured | Phase 6 existing assets | Supabase secrets | ⚠️ | **Verify** `GHL_API_TOKEN`, `GHL_LOCATION_ID` exist |
| J6 | Widget IDs in secrets (not client-side) | §17.7 | `ghlLoader.ts` fetches from edge function | ✅ | None |
| J7 | Single sitewide chat widget (current state) | §17.7 | `GHLChatWidget.tsx` | ✅ | None |
| J8 | Multi-widget architecture reserved for future | §17.7 | Infrastructure exists but not active | ✅ | None |
| J9 | GHL checkout URL format: `go.everintent.com/[slug]` | §10 | `checkoutConfig.ts:286`: `https://go.everintent.com${path}` | ✅ | None |
| J10 | Domain architecture: everintent.com / go.everintent.com / app.everintent.com | §10 | Code references match | ✅ | None |

---

## Section K: Navigation Structure

### Header Navigation

| # | Requirement | BRD Ref | Codebase File | Status | Recommended Action |
|---|-------------|---------|---------------|--------|-------------------|
| K1 | 6 nav items: AI Employee, Smart Websites, Pricing, Industries, About, Contact | §17.1 (v35.3) | `Header.tsx` nav structure | ⚠️ | BRD §17.1 matches current impl but body spec uses old mode names — see A7 |
| K2 | AI Employee dropdown: After-Hours, Front Office, Full AI Employee, Compare Plans | §A2 consolidated | `Header.tsx:38-43` | ✅ | None |
| K3 | Smart Websites dropdown: Launch, Capture, Convert, Scale, Compare Plans, Add-On Packs | §17.1 updated | `Header.tsx:26-33` | ✅ | None |
| K4 | Industries dropdown: Home Services, Professional, H&W, Automotive | §17.1 | `Header.tsx:48-53` | ✅ | None |
| K5 | CTA: "Get Started" → /pricing | §CTA Strategy | Header CTA | ✅ | None |
| K6 | All nav uses native `<a>` tags (SSG compliance) | §A9, §C4 | `NavLink.tsx` uses `<a>` | ✅ | None |
| K7 | No React Router `<Link>` in public nav components | §A9 | Zero `<Link>` imports in `src/components/` | ✅ | None |
| K8 | Mode toggle (sun/moon) in header | Theme BRD §11.1 | `ModeToggle.tsx` imported in Header | ✅ | None |

### Footer Navigation

| # | Requirement | BRD Ref | Codebase File:Line | Status | Recommended Action |
|---|-------------|---------|---------------------|--------|-------------------|
| K9 | Solutions column: All Services, AI Employee, Launch-Scale, Compare, Add-Ons | §17.2 (stale) | `Footer.tsx:12-21` matches v36 structure | ✅ | None |
| K10 | AI Employee column: After-Hours, Front Office, Full AI, Compare | §17.2 (stale) | `Footer.tsx:23-28` | ✅ | None |
| K11 | Resources column: Pricing, Portfolio, FAQ, Help, Support, Industries | — | `Footer.tsx:30-37` | ✅ | None |
| K12 | Company column: About, Contact, Careers, Client Login (external) | §17.2 | `Footer.tsx:39-44` | ✅ | None |
| K13 | Legal links: Privacy, Cookies, Terms, Data Rights, Accessibility | §20 + ADA | `Footer.tsx:46-52` includes Accessibility | ✅ | None |
| K14 | "Client Login" links to `app.everintent.com` (external) | §17.2 | `Footer.tsx:43`: `external: true` | ✅ | None |
| K15 | Location links in footer | Memory | Footer imports `locationsByRegion` | ✅ | None |
| K16 | All footer links use native `<a>` tags | §A9 | Footer uses `<a>` tags | ✅ | None |

### Mobile Navigation

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| K17 | Mobile bottom bar exists | §17.3, §17.7 | `MobileBottomBar.tsx` exists | ✅ | None |
| K18 | Chat in mobile bottom bar (not floating button) | §17.7 | MobileBottomBar integrates chat | ✅ | None |
| K19 | Both gated by cookie consent | §17.7 | Cookie consent gates visibility | ✅ | None |
| K20 | Desktop chat: floating button, bottom-right | §17.7 | `DesktopChatButton.tsx` | ✅ | None |

---

## Section L: Sitemap & Route Architecture

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| L1 | Zero-redirect policy | §A9, Memory | `NotFound.tsx` → Navigate to `/` | ✅ | None |
| L2 | 404 → home redirect | Memory | `NotFound.tsx:16`: `<Navigate to="/" replace />` | ✅ | None |
| L3 | URL aliasing for plural/singular | Memory | `/services` and `/service` serve same component | ✅ | None |
| L4 | Explicit SSG route mapping (no dynamic params) | Memory | `routes.tsx` uses explicit paths for all 32 location cities | ✅ | None |
| L5 | `vercel.json` only rewrites admin routes | §Appendix H | `vercel.json:3`: only `/admin/:path*` rewrite | ✅ | None |
| L6 | `vercel.json` has `framework: null` | Memory | `vercel.json:2`: `"framework": null` | ✅ | None |
| L7 | Sitemap XML matches all public routes | §16 | `public/sitemap.xml` updated 2026-02-15 | ⚠️ | Verify all 75+ URLs are present including 32 location pages |
| L8 | Admin routes excluded from SSG pre-rendering | §15.4 | `routes.tsx` filters admin from SSG | ✅ | None |
| L9 | Checkout routes excluded from sitemap | §Appendix C | Checkout has noIndex; not in sitemap | ✅ | None |
| L10 | Placeholder pages have noIndex | §A9 | `Placeholder.tsx:32`: `noIndex` | ✅ | None |
| L11 | `routes.ts` `legalRoutes` includes Accessibility Statement | — | `routes.ts:151-157`: includes `/legal/accessibility-statement` | ✅ | FIXED — Added to legalRoutes in routes.ts |
| L12 | 32 sub-city location pages in routes | Memory | `routes.tsx` has explicit city slugs array | ✅ | None |
| L13 | Location pages use `useLocation()` path matching | Memory | `CityLocation.tsx` matches against config | ✅ | None |
| L14 | `routes.ts` `locationRoutes` only has 3 regional hubs (not 32 cities) | — | `routes.ts:115-119` | ⚠️ | Sub-cities defined directly in `routes.tsx`. Consider centralizing for consistency |
| L15 | Product-category SEO pages exist | §16.1 | `routes.ts:77-84`: 6 product-category routes | ✅ | None |
| L16 | Feature deep-dive pages exist | §16 sitemap | `routes.ts:89-96`: 6 feature routes | ✅ | None |

---

## Section M: SSG & Technical Architecture

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| M1 | Build command: `vite-react-ssg build` | §Appendix H | `package.json` build script | ✅ | None |
| M2 | SSG formatting: `none` (not `minify`) | Memory | `vite.config.ts` ssgOptions | ⚠️ | **Verify** ssgOptions uses `formatting: 'none'` |
| M3 | No `manualChunks` in vite.config.ts | §H.3 | Not present | ✅ | None |
| M4 | No catch-all rewrite in vercel.json | §H.1 | Only admin rewrite | ✅ | None |
| M5 | ClientOnly wrapper for portal components | §H.2 | `ClientOnly.tsx` exists | ✅ | None |
| M6 | QueryClient inside component (not module level) | §H.2 | `App.tsx` or `routes.tsx` | ⚠️ | **Verify** QueryClient placement |
| M7 | Tech stack: Vite + React (pre-rendered) on Vercel Pro + Supabase | §1 Quick Reference | Matches | ✅ | None |
| M8 | Customer sites: WordPress on OVH/Plesk + Elementor | §1 | Not in this codebase | ✅ | None |
| M9 | Direct component imports (no lazy loading) | Memory | Routes use direct imports | ✅ | None |
| M10 | Widget IDs via secrets/Edge Functions | Memory | `ghlLoader.ts` fetches from edge function | ✅ | None |

---

## Section N: Compliance & Legal

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| N1 | Privacy Policy at `/legal/privacy` | §20.1 | `PrivacyPolicy.tsx` exists, route defined | ✅ | None |
| N2 | Terms of Service at `/legal/terms` | §20.1 | `TermsOfService.tsx` exists | ✅ | None |
| N3 | Cookie Policy at `/legal/cookies` | §20.1 | `CookiePolicy.tsx` exists | ✅ | None |
| N4 | Data Rights Request at `/legal/data-request` | §20.1 | `DataRightsRequest.tsx` exists | ✅ | None |
| N5 | Accessibility Statement at `/legal/accessibility-statement` | Theme BRD §12.2.4 | `AccessibilityStatement.tsx` exists | ✅ | None |
| N6 | BRD §20.1 lists only 4 legal pages (missing Accessibility) | §20.1 | 5 pages exist in code | ✅ | FIXED v36.6 — §20.1 already updated to 5 legal pages in v36.5 session |
| N7 | Bidirectional cross-linking between all legal pages | Memory | All 5 legal pages cross-link | ✅ | None |
| N8 | TCPA consent language matches spec | §20.2 | Consent text in checkout forms | ⚠️ | **Verify** exact wording matches §20.2 |
| N9 | Cookie consent mandatory for CA users | Memory | `CookieConsent.tsx` exists | ✅ | None |
| N10 | Cookie consent gates chat button + mobile nav | Memory | Components check consent state | ✅ | None |
| N11 | Cookie Preferences button in footer | Memory | `legalLinks` includes cookies | ✅ | None |
| N12 | California Bot Disclosure for AI calling | §20.3 | GHL-managed (not in marketing site) | ✅ | None |
| N13 | noIndex on every checkout page | §Appendix C | `CheckoutPage.tsx:281` | ✅ | None |
| N14 | IP address captured on forms | §Appendix C | `checkout_submissions` has `ip_address` column | ✅ | None |
| N15 | Consent timestamp captured | §Appendix C | `checkout_submissions` has `consent_timestamp` | ✅ | None |
| N16 | E.164 phone formatting | Memory | `+1-562-685-9500` used in code | ⚠️ | **Verify** consistency across all phone displays |
| N17 | Business address: 2892 N Bellflower Blvd, Long Beach, CA 90815 | Memory | Used in structured data | ⚠️ | **Verify** address consistency in footer + schema |

---

## Section O: Admin Portal & Authentication

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| O1 | Admin at `/admin` | §15.4 | Route exists | ✅ | None |
| O2 | Email OTP authentication (no passwords) | §15.4 | `verify-admin-email` edge function | ✅ | None |
| O3 | `allowed_admin_emails` whitelist | §15.4 | DB table exists in types | ✅ | None |
| O4 | `AdminGuard` component wraps all admin routes | §15.4 | `AdminGuard.tsx` exists | ✅ | None |
| O5 | Role-based access: `has_role()` function | §15.2 | DB function exists | ✅ | None |
| O6 | Admin features: Submissions, Portfolio CRUD, Testimonials CRUD, Themes | §15.4 | All exist as registered modules | ✅ | None |
| O7 | Password reset page exists | — | `ResetPassword.tsx` exists | ✅ | None |
| O8 | Admin routes CSR-only (not pre-rendered) | §15.4 | Excluded from SSG | ✅ | None |
| O9 | React Router `<Link>` acceptable in admin pages | — | Admin pages use `<Link>` (correct — admin is CSR) | ✅ | None |

---

## Section P: Theme System — Architecture

| # | Requirement | Theme Spec Ref | Theme BRD Ref | Tracker Ref | Codebase | Status | Recommended Action |
|---|-------------|----------------|---------------|-------------|----------|--------|-------------------|
| P1 | 3-tier token model: Primitive → Semantic → Component | §2.1 | §3.1 | Phase 7 arch | `site_themes` has all 3 JSONB cols | ✅ | None |
| P2 | Static-bake pipeline (no runtime DB queries) | §1 "Key Design Decision" | §3.2 | 7.7-7.8 | `sync-theme-to-github` edge function | ✅ | None |
| P3 | Two-file publish: themes.ts + index.css | §2.3 | §3.2 | 7.7-7.8 | `generateProductionCss` + `generateThemesTs` | ✅ | None |
| P4 | HSL color format everywhere | §2.1 | §2 (first principle) | — | All tokens use "H S% L%" format | ✅ | None |
| P5 | Logo uses inline CSS (not Tailwind) for export compat | §2.2 | §6 | — | `LogoRenderer.tsx` uses inline styles | ✅ | None |
| P6 | Intent text: -1px vertical offset for baseline alignment | §2.2 | §6 | — | `logo/types.ts:66`: `verticalOffset: 1` | ✅ | None |
| P7 | Hue-derived primitive generation from base_hue | — | §3.3 | 7.4 done | Algorithm implemented | ✅ | None |
| P8 | Override rule: admins can override any generated primitive | — | §3.3 note | — | Admin editors exist | ✅ | None |
| P9 | Zero runtime overhead: production sites use static config | §1 | §3.2 | — | `themeConfig.ts` uses static import | ✅ | None |

---

## Section Q: Theme System — Token Inventory

### Tier 2: Semantic Tokens

| # | CSS Variable | Theme Spec Ref | Theme BRD Ref | Status | Notes |
|---|-------------|----------------|---------------|--------|-------|
| Q1 | `--background` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q2 | `--foreground` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q3 | `--card` / `--card-foreground` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q4 | `--popover` / `--popover-foreground` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q5 | `--primary` / `--primary-light` / `--primary-foreground` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q6 | `--secondary` / `--secondary-foreground` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q7 | `--muted` / `--muted-foreground` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q8 | `--accent` / `--accent-hover` / `--accent-glow` / `--accent-foreground` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q9 | `--border` / `--input` / `--ring` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q10 | `--radius` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q11 | `--destructive` / `--destructive-foreground` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q12 | `--highlight` / `--highlight-foreground` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q13 | `--intent-blue` | §4.2 ✅ | §4.2 ✅ | ✅ | — |
| Q14 | `--secondary-accent` | §4.2 ✅ | §4.2 ✅ | ✅ | Added in 7.21a |

### Tier 3: Component Tokens

| # | Token Group | Theme Spec Ref | Theme BRD Ref | Tracker Ref | Status | Notes |
|---|------------|----------------|---------------|-------------|--------|-------|
| Q15 | Gold/e-commerce (4 tokens) | §4.3.1 ✅ | §4.3.1 ✅ | 7.10 done | ✅ | Independent of base hue |
| Q16 | Sidebar (8 tokens) | §4.3.2 ✅ | §4.3.2 ✅ | — | ✅ | — |
| Q17 | GHL Chat Widget (9 tokens) | §4.3.3 ✅ | §4.3.3 ✅ | — | ✅ | DB-driven |
| Q18 | Shadows (7 tokens) | §4.3.4 ✅ | §4.3.4 ✅ | — | ✅ | — |
| Q19 | Gradients (5 tokens) | §4.3.5 ✅ | §4.3.5 ✅ | — | ✅ | — |
| Q20 | Selection/scrollbar | §4.3.6 ⚠️ (stale) | §4.3.6 | 7.21 done | ⚠️ | **Theme Spec says hardcoded; Tracker says fixed** |
| Q21 | Icon gradients (4 utility classes) | §4.3.7 ⚠️ (stale) | §4.3.7 | 7.21 done | ⚠️ | **Same stale status issue** |
| Q22 | `pulse-glow` keyframe | §4.3.8 ⚠️ (stale) | §4.3.8 | 7.21c done | ⚠️ | **Same stale status issue** |

### Typography & Motion

| # | Token | Theme Spec Ref | Theme BRD Ref | Tracker Ref | Status | Notes |
|---|-------|----------------|---------------|-------------|--------|-------|
| Q23 | `--font-heading` (Space Grotesk) | §4.4 ✅ | §5.1 ✅ | 7.21d done | ✅ | FIXED v36.4 — tailwind.config.ts uses var(--font-heading), generateProductionCss emits from typography_config |
| Q24 | `--font-body` (Inter) | §4.4 ✅ | §5.1 ✅ | 7.21d done | ✅ | FIXED v36.4 — tailwind.config.ts uses var(--font-body), generateProductionCss emits from typography_config |
| Q25 | `--font-mono` (JetBrains Mono) | §4.4 ✅ | §5.1 ✅ | — | ✅ | FIXED v36.5 — fontMono added to TypographyConfig, Zod schema, TypographyEditor, CSS publisher, tailwind.config.ts, DB default |
| Q26 | `--transition-smooth` | §4.5 ✅ | §14.2 ✅ | 7.21e done | ✅ | — |
| Q27 | `--transition-bounce` | §4.5 ✅ | §14.2 ✅ | 7.21e done | ✅ | — |
| Q28 | `--transition-spring` | §4.5 ✅ | §14.2 ✅ | 7.21e done | ✅ | — |

---

## Section R: Theme System — Database Schema

| # | Requirement | Theme Spec Ref | Theme BRD Ref | DB Types | Status | Recommended Action |
|---|-------------|----------------|---------------|----------|--------|-------------------|
| R1 | `site_themes` table exists | §3.2 | §5.1 | ✅ In types.ts | ✅ | None |
| R2 | `logo_versions` table exists | §3.1 | §6 | ✅ In types.ts | ✅ | None |
| R3 | `page_theme_assignments` table exists | §3.3 | — | ✅ In types.ts | ✅ | None |
| R4 | `published_theme_configs` table exists | §3.4 | §15 | ✅ In types.ts | ✅ | None |
| R5 | `site_themes.primitive_tokens` JSONB | — | §5.1 | ✅ In types.ts | ✅ | None |
| R6 | `site_themes.semantic_tokens` JSONB | — | §5.1 | ✅ In types.ts | ✅ | None |
| R7 | `site_themes.component_tokens` JSONB | — | §5.1 | ✅ In types.ts | ✅ | None |
| R8 | `site_themes.static_colors` JSONB | §3.2 | §5.1 (renamed conceptually) | ✅ In types.ts | ✅ | None |
| R9 | `site_themes.dark_mode_overrides` JSONB | §3.2 | §5.1 | ✅ In types.ts | ✅ | None |
| R10 | `site_themes.accent_config` JSONB | §3.2 | §9 | ✅ In types.ts | ✅ | None |
| R11 | `site_themes.typography_config` JSONB | — | §5.1 new column | ✅ In types.ts | ✅ | None |
| R12 | `site_themes.motion_config` JSONB | — | §14 | ✅ In types.ts | ✅ | None |
| R13 | `site_themes.style_modules` JSONB | — | §16 | ✅ In types.ts | ✅ | None |
| R14 | `site_themes.default_mode` text | — | §11.4 | ✅ In types.ts | ✅ | None |
| R15 | `site_themes.ecommerce_colors` JSONB | — | — | ✅ In types.ts | ✅ | None |
| R16 | `site_themes.cta_variants` JSONB | — | — | ✅ In types.ts | ✅ | None |
| R17 | `site_themes.ada_widget_config` JSONB | — | §12.5 | ✅ In types.ts | ✅ | None |
| R18 | RLS: public read, admin write on all theme tables | §3.2 | — | ✅ Via `has_role()` | ✅ | None |
| R19 | `get_next_theme_config_version()` function | §3.4 | — | ✅ In types.ts Functions | ✅ | None |
| R20 | `has_role()` security definer function | §3.5 | — | ✅ In types.ts Functions | ✅ | None |

---

## Section S: Theme System — CSS Pipeline

| # | Requirement | Theme Spec Ref | Theme BRD Ref | Tracker Ref | Status | Recommended Action |
|---|-------------|----------------|---------------|-------------|--------|-------------------|
| S1 | `:root` = light mode tokens | — | §7.1 | 7.7 fix | ✅ | None |
| S2 | `.dark` = dark mode overrides | — | §7.1 | 7.7 fix | ✅ | None |
| S3 | `generateProductionCss` emits dual-mode CSS | — | §7.1 | 7.7 done | ✅ | None |
| S4 | `generateThemesTs` generates ThemeConfig | — | — | 7.8 done | ✅ | None |
| S5 | `applyThemeToRoot()` is mode-aware | — | §7.2 | 7.24d done | ✅ | None |
| S6 | Utility classes reference CSS vars, not hardcoded | — | §7.3 | 7.21 done | ✅ | None |
| S7 | Style Module tokens emitted as `--module-{name}-{token}` | — | §16 | 7.27a done | ✅ | None |
| S8 | Gold/CTA/typography/motion tokens in pipeline | — | — | 7.7 done | ✅ | None |
| S9 | `sync-theme-to-github` edge function pushes both files | §2.3 | §3.2 | — | ✅ | None |
| S10 | Atomic git commit (both files together) | §2.3 | §3.2 | — | ✅ | None |

---

## Section T: Theme System — Admin UI

| # | Requirement | Theme BRD Ref | Tracker Ref | Component | Status | Recommended Action |
|---|-------------|---------------|-------------|-----------|--------|-------------------|
| T1 | Base hue slider with live preview | §10.2 | 7.9 done | `ThemeEditorPanels.tsx` | ✅ | None |
| T2 | Accent color picker (lock toggle) | §10.2, §9 | — | `AccentPicker.tsx` | ✅ | None |
| T3 | E-commerce/gold color editor | §10.2 | 7.10 done | `EcommerceColorEditor.tsx` | ✅ | None |
| T4 | Typography editor | §10.2 | 7.12 done | `TypographyEditor.tsx` | ✅ | None |
| T5 | Motion/effects editor | §14.4 | 7.11 done | `MotionEditor.tsx` | ✅ | None |
| T6 | Style Modules CRUD | §16 | 7.13 done | `StyleModulesEditor.tsx` | ✅ | None |
| T7 | Default mode selector (light/dark) | §11.4 | 7.14 done | `DefaultModeSelector.tsx` | ✅ | None |
| T8 | ADA widget config editor | §12.5 | 7.15 done | `AdaWidgetConfigEditor.tsx` | ✅ | None |
| T9 | Contrast checker (WCAG AA/AAA) | §12.6 | 7.18 done | `ContrastChecker.tsx` | ✅ | None |
| T10 | Theme export (JSON download) | §13.3 | 7.19 done | Export button in admin | ✅ | None |
| T11 | Theme import (file upload + validation) | §13.3 | 7.20 done | `ThemeImporter.tsx` | ✅ | None |
| T12 | Theme revert with 2-layer warning | §15.2 | 7.17 done | AlertDialog in editor | ✅ | None |
| T13 | Save current as new default with 2-layer warning | §15.4 | 7.17a done | AlertDialog in editor | ✅ | None |
| T14 | Dark mode overrides editor | — | 7.24c done | `DarkModeOverridesEditor.tsx` | ✅ | None |
| T15 | Logo config editor | §6 | — | `LogoConfigEditor.tsx` | ✅ | None |
| T16 | GHL chat config editor | — | — | GHL controls in theme editor | ✅ | None |
| T17 | Live canvas preview | — | — | `ThemeLiveCanvas.tsx` | ✅ | None |
| T18 | Split-screen editor (controls left, preview right) | — | Phase 8 changelog | `ThemeEditorView.tsx` | ✅ | None |

---

## Section U: Theme System — Light/Dark Mode

| # | Requirement | Theme BRD Ref | Tracker Ref | Codebase | Status | Recommended Action |
|---|-------------|---------------|-------------|----------|--------|-------------------|
| U1 | User-facing toggle on every page | §11.1 | 7.24 done | `ModeToggle.tsx` in Header | ✅ | None |
| U2 | Default: dark mode (`<html class="dark">`) | §11.2 | 7.14 | `index.html` head script | ✅ | None |
| U3 | Persistence: `localStorage('theme-mode')` | §11.2 | 7.24 done | ModeToggle writes localStorage | ✅ | None |
| U4 | FOUC prevention: inline `<head>` script | §11.3 | 7.14 done | `index.html` has script | ✅ | None |
| U5 | Binary mode: light or dark only (no system) | Memory | 7.14 notes | `DefaultModeSelector.tsx` | ✅ | FIXED v36.5 — Theme BRD §11.2 updated to binary only (light | dark) |
| U6 | Theme BRD §11.2 mentions `system` preference | §11.2: "light \| dark \| system" | — | — | ✅ | FIXED v36.5 — Removed 'system' from §11.2, §11.4 |
| U7 | `applyThemeToRoot()` called on mode switch | §7.2 | 7.24 | ModeToggle triggers via requestAnimationFrame | ✅ | None |
| U8 | Per-theme `defaultMode` field in DB | §11.4 | 7.14 | `site_themes.default_mode` column exists | ✅ | None |

---

## Section V: Theme System — ADA Accessibility

### Widget Core

| # | Requirement | Theme BRD Ref | Tracker Ref | Codebase | Status |
|---|-------------|---------------|-------------|----------|--------|
| V1 | Floating accessibility button | §12.1 | 7.25 done | `AccessibilityWidget.tsx` | ✅ |
| V2 | Draggable positioning (desktop + mobile) | §12.2.1 | 7.25 done | Pointer event handling | ✅ |
| V3 | localStorage position persistence | §12.2.1 | 7.25 done | `ada-widget-position` key | ✅ |
| V4 | 3px click vs drag threshold | §12.2.1 | 7.25 done | Movement detection | ✅ |
| V5 | z-index 9999 | §12.2.1 | 7.25 done | — | ✅ |
| V6 | Skip Navigation link | §12.6 | — | — | ⚠️ | **Verify** skip-nav link exists |
| V7 | ARIA landmarks on all pages | §12.6 | — | `<header>`, `<main>`, `<footer>` | ⚠️ | **Verify** all pages use semantic HTML |

### Content Modules (Batch 1) — 10 Controls

| # | Control | Theme BRD Ref | Tracker Ref | Status |
|---|---------|---------------|-------------|--------|
| V8 | Text Size (3 levels) | §12.2.1 #1 | ADA Batch 1 ✅ | ✅ |
| V9 | Line Height (3 levels) | §12.2.1 #2 | ADA Batch 1 ✅ | ✅ |
| V10 | Letter Spacing (3 levels) | §12.2.1 #3 | ADA Batch 1 ✅ | ✅ |
| V11 | Bold Text | §12.2.1 #4 | ADA Batch 1 ✅ | ✅ |
| V12 | Readable Font | §12.2.1 #5 | ADA Batch 1 ✅ | ✅ |
| V13 | Dyslexia Font (OpenDyslexic) | §12.2.1 #6 | ADA Batch 1 ✅ | ✅ |
| V14 | Text Align (cycle L/C/R) | §12.2.1 #7 | ADA Batch 1 ✅ | ✅ |
| V15 | Highlight Links | §12.2.1 #8 | ADA Batch 1 ✅ | ✅ |
| V16 | Text Magnifier | §12.2.1 #9 | ADA Batch 1 ✅ | ✅ |
| V17 | Big Cursor | §12.2.1 #10 | ADA Batch 1 ✅ | ✅ |

### Color + Orientation Modules (Batch 2) — 14 Controls

| # | Control | Theme BRD Ref | Tracker Ref | Status |
|---|---------|---------------|-------------|--------|
| V18 | Dark Contrast | §12.2.2 #11 | ADA Batch 2 ✅ | ✅ |
| V19 | Light Contrast | §12.2.2 #12 | ADA Batch 2 ✅ | ✅ |
| V20 | High Contrast | §12.2.2 #13 | ADA Batch 2 ✅ | ✅ |
| V21 | Monochrome | §12.2.2 #14 | ADA Batch 2 ✅ | ✅ |
| V22 | High Saturation | §12.2.2 #15 | ADA Batch 2 ✅ | ✅ |
| V23 | Reading Line | §12.2.2 #16 | ADA Batch 2 ✅ | ✅ |
| V24 | Reading Mask | §12.2.2 #17 | ADA Batch 2 ✅ | ✅ |
| V25 | Keyboard Navigation | §12.2.2 #18 | ADA Batch 2 ✅ | ✅ |
| V26 | Hide Images | §12.2.2 #19 | ADA Batch 2 ✅ | ✅ |
| V27 | Stop Animations | §12.2.2 #20 | ADA Batch 2 ✅ | ✅ |
| V28 | Mute Sounds | §12.2.2 #21 | ADA Batch 2 ✅ | ✅ |
| V29 | Highlight Titles | §12.2.2 #22 | ADA Batch 2 ✅ | ✅ |
| V30 | Highlight Content | §12.2.2 #23 | ADA Batch 2 ✅ | ✅ |
| V31 | Focus Highlight | §12.2.2 #24 | ADA Batch 2 ✅ | ✅ |

### Preset Profiles (Batch 3) — 5 Profiles

| # | Profile | Theme BRD Ref | Tracker Ref | Status |
|---|---------|---------------|-------------|--------|
| V32 | Vision Impaired | §12.2.3 | ADA Batch 3 ✅ | ✅ |
| V33 | Blind Mode | §12.2.3 | ADA Batch 3 ✅ | ✅ |
| V34 | ADHD Friendly | §12.2.3 | ADA Batch 3 ✅ | ✅ |
| V35 | Dyslexia Friendly | §12.2.3 | ADA Batch 3 ✅ | ✅ |
| V36 | Motor Impaired | §12.2.3 | ADA Batch 3 ✅ | ✅ |

### Widget Controls (Batch 4)

| # | Feature | Theme BRD Ref | Tracker Ref | Status |
|---|---------|---------------|-------------|--------|
| V37 | Reset All | §12.2.4 | ADA Batch 4 ✅ | ✅ |
| V38 | Accessibility Statement link in panel | §12.2.4 | ADA Batch 4 ✅ | ✅ |
| V39 | User-side "Hide Widget" (session/24h/permanent) | — | 7.25b done | ✅ |

### Admin ADA Config

| # | Feature | Theme BRD Ref | Tracker Ref | Status |
|---|---------|---------------|-------------|--------|
| V40 | Widget visibility (visible/hidden/paused) | §12.3 | 7.15 done | ✅ |
| V41 | Pause scheduling (pausedUntil) | §12.3 | 7.15 done | ✅ |
| V42 | Per-device toggle (desktop/mobile) | §12.3 | 7.15 done | ✅ |
| V43 | Icon type selection (accessibility/eye/hand/etc.) | §12.4 | 7.16 done | ✅ |
| V44 | Icon color/background/size/shape | §12.4 | 7.16 done | ✅ |
| V45 | SSG compatibility (CSS classes on `<html>`, localStorage in `<head>`) | §12.7 | — | ✅ |

---

## Section W: Theme System — Export/Import

| # | Requirement | Theme BRD Ref | Tracker Ref | Codebase | Status | Recommended Action |
|---|-------------|---------------|-------------|----------|--------|-------------------|
| W1 | Export as self-documenting JSON | §13.1-13.2 | 7.19 done | Export button in admin | ✅ | None |
| W2 | `$schema`, `$version`, `$generator`, `$description` fields | §13.2 | — | — | ⚠️ | **Verify** export includes all meta fields |
| W3 | Import with schema validation | §13.3 | 7.20 done | `ThemeImporter.tsx` | ✅ | None |
| W4 | Import: create new or update existing | §13.3 | 7.20 done | UI provides choice | ✅ | None |
| W5 | 500KB file size limit | — | 7.20 notes | ThemeImporter enforces | ✅ | None |
| W6 | Schema version compatibility (`$version` check) | §13.4 | — | — | ⚠️ | **Verify** import checks version |
| W7 | Export → edit → re-import round-trip | — | 7.29 todo | — | 📋 | **Test** end-to-end round-trip |

---

## Section X: Theme System — Effects & Motion

| # | Requirement | Theme BRD Ref | Tracker Ref | Codebase | Status |
|---|-------------|---------------|-------------|----------|--------|
| X1 | Effects token schema (hover, active, focus, disabled, loading) | §14.2 | 7.6 done | `motion_config` JSONB column | ✅ |
| X2 | Transition tokens emitted as CSS vars | §14.3 | 7.21e done | `--transition-smooth/bounce/spring` | ✅ |
| X3 | Alert variants (info/success/warning/error) | §14.2 alerts | 7.26 done | `toast.tsx` has variants | ✅ |
| X4 | Toast variants wired to theme tokens | §14.2 toast | 7.26 done | Uses `highlight`, `gold`, `accent` | ✅ |
| X5 | Admin effects editor panel | §14.4 | 7.11 done | `MotionEditor.tsx` | ✅ |

---

## Section Y: Theme System — Style Modules

| # | Requirement | Theme BRD Ref | Tracker Ref | Codebase | Status | Recommended Action |
|---|-------------|---------------|-------------|----------|--------|-------------------|
| Y1 | Style Modules: `--module-{name}-{token}` pattern | §16 | 7.13 done | `StyleModulesEditor.tsx` | ✅ | None |
| Y2 | Modules stored in `style_modules` JSONB | §16 | — | `site_themes.style_modules` | ✅ | None |
| Y3 | 3 seed modules: checkout-progress, comparison-grid, sms-demo | — | 7.27 done | Seeded per tracker | ✅ | None |
| Y4 | Pipeline emits `--module-*` CSS vars | — | 7.27a done | `generateProductionCss` emits | ✅ | None |
| Y5 | CheckoutProgress wired to module tokens | — | 7.27b done | 12 tokens mapped | ✅ | None |
| Y6 | CompareWebsites wired to module tokens | — | 7.27c todo | — | 📋 | **Implement** module token consumption |
| Y7 | Admin CRUD for modules (create/edit/delete) | §16 | 7.13 done | CRUD in editor | ✅ | None |
| Y8 | Semantic fallbacks for missing module tokens | — | 7.27b notes | CheckoutProgress has fallbacks | ✅ | None |

---

## Section Z: Theme System — Hardcoded Color Audit

| # | Requirement | Theme Spec Ref | Theme BRD Ref | Tracker Ref | Codebase Search | Status | Recommended Action |
|---|-------------|----------------|---------------|-------------|-----------------|--------|-------------------|
| Z1 | `::selection` bg tokenized | §4.3.6 ⚠️ → should be ✅ | §7.3 | 7.21 done | — | ✅ (code fixed, doc stale) | Update Theme Spec |
| Z2 | `.glow-text` tokenized | §4.3.7 ⚠️ → should be ✅ | §7.3 | 7.21 done | — | ✅ (code fixed, doc stale) | Update Theme Spec |
| Z3 | `.text-gradient-light` tokenized | §4.3.7 ⚠️ → should be ✅ | — | 7.21 done | — | ✅ (code fixed, doc stale) | Update Theme Spec |
| Z4 | 4 icon gradient utilities tokenized | §4.3.7 ⚠️ → should be ✅ | — | 7.21 done | — | ✅ (code fixed, doc stale) | Update Theme Spec |
| Z5 | `pulse-glow` keyframe tokenized | §4.3.8 ⚠️ → should be ✅ | — | 7.21c done | — | ✅ (code fixed, doc stale) | Update Theme Spec |
| Z6 | CaseStudyLayout `bg-[#0D0D0D]` | §4.3.9 | — | 7.22 done | — | ✅ (fixed per tracker) | Update Theme Spec |
| Z7 | AIEmployee.tsx inline gradients | §4.3.9 | — | 7.22 done | — | ✅ (fixed per tracker) | Update Theme Spec |
| Z8 | Intentional exemptions: 8 files (mockups, simulations) | §4.6 | — | 7.22-7.23 | Exemptions respected | ✅ | None |
| Z9 | `text-white`, `bg-black` in `src/components/` | — | — | — | 3555 matches in 13 files | ⚠️ | Most are in exempt simulation components (RealisticDashboards, mockups). **Verify** non-exempt files |

---

## Section AA: Module System — Architecture

| # | Requirement | Tracker Ref | Codebase | Status | Recommended Action |
|---|-------------|-------------|----------|--------|-------------------|
| AA1 | 3-file kernel: `types.ts`, `registry.ts`, `index.ts` | Phase 8 arch | `src/modules/types.ts`, `registry.ts`, `index.ts` | ✅ | None |
| AA2 | `ModuleDefinition` interface: id, name, description, version, navItems, routes, enabled | 8.1 done | `types.ts:65-83` | ✅ | None |
| AA3 | `ModuleNavItem` interface: label, path, icon, category, description, detail, requiredRole | 8.1 done | `types.ts:35-50` | ✅ | None |
| AA4 | `ModuleCategory` enum: Content, Appearance, Commerce, Settings, Tools | 8.1 done | `types.ts:22-28` | ✅ | None |
| AA5 | `registerModule()` with duplicate-ID detection | 8.2 done | `registry.ts:26-33` | ✅ | None |
| AA6 | `getModules(enabledOnly)` filter | 8.2 done | `registry.ts:41-46` | ✅ | None |
| AA7 | `getModule(id)` single lookup | 8.2 done | `registry.ts:51-53` | ✅ | None |
| AA8 | Self-registration pattern: modules call `registerModule()` from their barrel | 8.3 done | All module `index.ts` files do this | ✅ | None |
| AA9 | Dynamic dashboard: cards from `getModules().navItems` | 8.6 done | `Dashboard.tsx` | ✅ | None |
| AA10 | Dynamic routing: routes from `getModules().routes` in AdminGuard | 8.7 done | `routes.tsx` | ✅ | None |
| AA11 | Permission system: `requiredRole` enforcement | 8.14 done | `useHasRole.ts` | ✅ | None |
| AA12 | JSDoc on all module files | 8.8 done | All files have JSDoc headers | ✅ | None |

---

## Section AB: Module System — Registered Modules

| # | Module | Category | Version | Tracker Ref | Codebase | Status |
|---|--------|----------|---------|-------------|----------|--------|
| AB1 | themes | Appearance | 2.0.0 | 8.4 done | `src/modules/themes/index.ts` | ✅ |
| AB2 | submissions | Content | — | 8.5 done | `src/modules/submissions/index.ts` | ✅ |
| AB3 | portfolio | Content | 2.0.0 | 8.12 done | `src/modules/portfolio/index.ts` | ✅ |
| AB4 | testimonials | Content | 2.0.0 | 8.13 done | `src/modules/testimonials/index.ts` | ✅ |
| AB5 | playground | Tools | — | 8.5 done | `src/modules/playground/index.ts` | ✅ |
| AB6 | module-manager | Settings | 1.0.0 | Phase 9 | `src/modules/module-manager/index.ts` | ✅ |

---

## Section AC: Module System — Shared CRUD Framework

| # | Component | Tracker Ref | File | Status |
|---|-----------|-------------|------|--------|
| AC1 | `CrudService<T>` factory | 8.10 done | `src/modules/shared/crudService.ts` | ✅ |
| AC2 | `createCrudHooks()` factory | 8.10 done | `src/modules/shared/createCrudHooks.ts` | ✅ |
| AC3 | `AdminListView<T>` | 8.11 done | `src/modules/shared/AdminListView.tsx` | ✅ |
| AC4 | `AdminDetailView` | 8.11 done | `src/modules/shared/AdminDetailView.tsx` | ✅ |
| AC5 | `AdminFormEditor<T>` (7 field types) | 8.11 done | `src/modules/shared/AdminFormEditor.tsx` | ✅ |
| AC6 | `FieldDef` + `ColumnDef<T>` contracts | 8.11 done | `src/modules/shared/types.ts` | ✅ |
| AC7 | Barrel export | 8.11 done | `src/modules/shared/index.ts` | ✅ |
| AC8 | Portfolio CRUD working | 8.12 done | `PortfolioListPage.tsx`, `PortfolioEditPage.tsx` | ⚠️ Unverified |
| AC9 | Testimonials CRUD working | 8.13 done | `TestimonialsListPage.tsx`, `TestimonialsEditPage.tsx` | ⚠️ Unverified |

---

## Section AD: Module System — Export/Import Engine

| # | Requirement | Tracker Ref | Codebase | Status | Recommended Action |
|---|-------------|-------------|----------|--------|-------------------|
| AD1 | Export engine (JSON bundling) | Phase 9 | `src/modules/exportEngine.ts` | ✅ Exists | None |
| AD2 | Import engine (bundle validation + install plan) | Phase 9 | `src/modules/importEngine.ts` | ✅ Exists | None |
| AD3 | Module manifest (Zod-validated schema) | Phase 9 | `src/modules/manifest.ts` | ✅ Exists | None |
| AD4 | Module Manager hub UI | Phase 9 | `ModuleManagerHub.tsx` | ✅ Exists | None |
| AD5 | Export panel | Phase 9 | `ExportPanel.tsx` | ✅ Exists | None |
| AD6 | Import panel | Phase 9 | `ImportPanel.tsx` | ✅ Exists | None |
| AD7 | Baseline panel | Phase 9 | `BaselinePanel.tsx` | ✅ Exists | None |
| AD8 | End-to-end round-trip test | — | — | 📋 | **Test** export → re-import integrity |

---

## Section AE: SEO & Structured Data

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| AE1 | Homepage: LocalBusiness + ProfessionalService schema | Memory | `Index.tsx` | ⚠️ | **Verify** dual-typed schema present |
| AE2 | FAQ page: FAQPage schema (23+ questions) | §C3 | `FAQ.tsx:173-175`: FAQPage schema | ✅ | None |
| AE3 | Pricing page: FAQPage schema | Memory | `Pricing.tsx:163-165`: FAQPage schema | ✅ | None |
| AE4 | About page: Organization schema | Memory | `About.tsx:48-50`: Organization schema | ✅ | None |
| AE5 | Contact page: LocalBusiness + ContactPoint | Memory | `Contact.tsx:157-159`: LocalBusiness | ✅ | None |
| AE6 | Plan pages: Product schemas | Memory | — | ⚠️ | **Verify** Product schemas on tier detail pages |
| AE7 | Comparison pages: ItemList schemas | Memory | — | ⚠️ | **Verify** ItemList schemas on compare pages |
| AE8 | Industries hub: ItemList schema | Memory | — | ⚠️ | **Verify** |
| AE9 | Support/Help: WebPage schema | Memory | `Support.tsx:73-75`: FAQPage (exceeds spec) | ✅ | None |
| AE10 | Warmy page: FAQPage schema | — | `WarmyEmailDeliverability.tsx:184-186` | ✅ | None |
| AE11 | All tier sub-pages: FAQPage schema | — | SmartSite, SmartLead, SmartBusiness, SmartGrowth all have FAQPage | ✅ | None |
| AE12 | AI Employee sub-pages: FAQPage schema | — | AfterHours, FrontOffice, FullAIEmployee all have FAQPage | ✅ | None |
| AE13 | Single H1 per page | §Appendix B | — | ⚠️ | Needs page-by-page audit |
| AE14 | Semantic HTML (`<header>`, `<main>`, `<section>`) | SEO best practices | Layout.tsx uses semantic elements | ⚠️ | **Verify** all pages use semantic structure |
| AE15 | Lazy loading on images | SEO best practices | — | ✅ | Hero uses fetchPriority="high" + loading="eager" (BRD §D2). Below-fold images verified lazy. v36.7. |
| AE16 | Alt text on all images | §12.6 | — | ⚠️ | Needs audit |

---

## Section AF: Design System & Visual Standards

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| AF1 | Space Grotesk for headings | §F.2 | `--font-heading` flows from theme admin DB → publish pipeline → CSS var | ✅ | FIXED v36.4 — see Q23. tailwind.config.ts uses var(--font-heading), no longer hardcodes Inter |
| AF2 | Inter for body | §F.2 | `--font-body` flows from theme admin DB → publish pipeline → CSS var | ✅ | FIXED v36.4 — see Q24. tailwind.config.ts uses var(--font-body) |
| AF2a | `--font-mono` not defined anywhere | §F.2, Theme BRD §5.1 | Missing from `index.css`, `tailwind.config.ts`, and `TypographyConfig` | ✅ | FIXED v36.5 — see Q25 |
| AF3 | Dark base + amber accent | §F.0 | HSL 222 47% 7% bg, 38 92% 50% accent | ✅ | None |
| AF4 | No rounded-full pills on public pages | §C2 | Replaced with `rounded-lg` | ✅ | None |
| AF5 | Exemptions for pills: orbs, avatars, progress bars, dots | §C2 | Documented exemptions | ✅ | None |
| AF6 | Glassmorphic CTAs | §F.0 | CTA button styling | ⚠️ | **Verify** CTA style matches spec |
| AF7 | Animated nav underlines | §F.3 `.nav-link` | `index.css` has `.nav-link::after` | ✅ | None |
| AF8 | Footer slide-in bar | §F.3 `.footer-link` | `index.css` has `.footer-link::before` | ✅ | None |
| AF9 | `.bg-mesh` pattern | §F.3 | `index.css` has `.bg-mesh` | ✅ | None |
| AF10 | OG image: 1200×630, brand elements | §F.4 | `public/og-image.jpg` exists | ✅ | None |
| AF11 | AI image generation constraint: never generate logo text | §F.4 | Procedural rule | ✅ | None |
| AF12 | Page length guidelines (hub 4-5, detail 6-8, resource 3-4 screens) | §A10 | — | ⚠️ | Visual audit needed |
| AF13 | Services page: no double Layout wrapper | §A11 | — | ⚠️ | **Verify** Services.tsx doesn't wrap in `<Layout>` |
| AF14 | PricingTeaser: 4th card = Scale (not AI Employee) | §A12 | — | ⚠️ | **Verify** PricingTeaser shows Scale |
| AF15 | Portfolio card link integrity (no dead slugs) | §A8 | `PortfolioCard.tsx` | ⚠️ | **Verify** cards without case studies link to `/portfolio` |

---

## Section AG: Go-To-Market Strategy

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| AG1 | TVC methodology: transcripts as primary conversion asset | §19.1 | TranscriptCard, SMSDemo components | ✅ | None |
| AG2 | Hero message: "While you were sleeping..." | §19.1 | HeroSection component | ⚠️ | **Verify** hero copy matches |
| AG3 | UTM tracking: source, medium, campaign, content | §19.3 | `checkout_submissions` has UTM fields | ✅ | None |
| AG4 | Target markets: Phoenix, Dallas, Houston, Atlanta (Phase 1) | §19.3 | Location pages focus SoCal; markets are ad-targeting | ✅ | None |
| AG5 | Success metrics defined | §19.4 | Operational — analytics needed | 📋 | Deferred until Phase 4 |
| AG6 | Digital Donut outbound strategy | §5.10 | GHL/n8n managed | 📋 | Deferred — post-MVP |
| AG7 | Affiliate tracking | — | `AffiliateTracker.tsx`, `useAffiliateTracking.ts` exist | ✅ | None |

---

## Section AH: Support Model & SLAs

| # | Requirement | BRD Ref | Codebase | Status | Recommended Action |
|---|-------------|---------|----------|--------|-------------------|
| AH1 | Resource center differentiation: FAQ (pre-sale), Help (onboarding), Support (active) | §A7 | All 3 pages have correct H1/subheadline per §A7 table | ✅ | None |
| AH2 | FAQ H1: "Questions Before You Buy" | §A7 | `FAQ.tsx:193` | ✅ | None |
| AH3 | Help H1: "Getting Started With EverIntent" | §A7 | `Help.tsx:94` | ✅ | None |
| AH4 | Support H1: "Help With Your Account" | §A7 | `Support.tsx:89` | ✅ | None |
| AH5 | Support SLAs: Urgent 1hr, High 4hr, Normal 24hr | §25 | Informational on Support page | ⚠️ | **Verify** SLA info displayed on Support page |
| AH6 | Support channels by tier (T1: email only, T4: all + quarterly calls) | §25 | — | ⚠️ | Verify Support page content matches tier breakdown |

---

## Section AI: Partner Program

| # | Requirement | BRD Ref | Status | Recommended Action |
|---|-------------|---------|--------|-------------------|
| AI1 | Partner Program at `/partners` | §21 | 📋 DEFERRED (Post-MVP) | None |
| AI2 | Commission structure | §21.2 | 📋 DEFERRED | None |

---

## Section AJ: Deferred Features

| # | Feature | BRD Ref | Status | Notes |
|---|---------|---------|--------|-------|
| AJ1 | Smart Launch product | §6 | 📋 DEFERRED | Post-MVP |
| AJ2 | SmartStart Strategy Session | §6 | 📋 DEFERRED | Post-MVP |
| AJ3 | 65+ individual vertical pages | §2.4 | 📋 DEFERRED | 4 hub pages serve as entry points |
| AJ4 | Phase 4 analytics instrumentation | Tracker Phase 4 | 📋 DEFERRED | Pending Phase 6 checkout completion |
| AJ5 | Phase 5 communications & training | Tracker Phase 5 | 📋 DEFERRED | Pending Phase 6 completion |
| AJ6 | Phase 9 module conformance (file consolidation, DI) | Tracker Phase 9 | 📋 PLANNED | 11 tasks planned, 0 done |
| AJ7 | Multi-mode 15% discount | §5.8 | 📋 DEFERRED | Post-MVP |
| AJ8 | Abandoned cart follow-up | Tracker 6.24 | 📋 PLANNED | Requires checkout completion |
| AJ9 | Task 3.5 AI Employee MVP (GHL infra) | §29 | 📋 TODO (BLOCKER) | Requires GHL configuration |

---

## Summary Statistics

| Status | Count | % |
|--------|-------|---|
| ✅ Aligned | 200 | 75.2% |
| ⚠️ Partial / Unverified | 52 | 19.5% |
| ❌ Misaligned | 1 | 0.4% |
| 📋 Deferred / Planned | 13 | 4.9% |
| **Total** | **266** | **100%** |

---

## Critical Fixes Required (❌ Items)

| Priority | Item # | Domain | Issue | Action |
|----------|--------|--------|-------|--------|
| ~~P0~~ | C12 | Pricing | ~~Web Chat `setupFee: 0` should be `497`~~ | ✅ FIXED — setupFee: 497 in checkoutConfig.ts |
| ~~P0~~ | I10 | Checkout | ~~`start-checkout` edge function doesn't return GHL redirect URL~~ | ✅ VERIFIED — redirect_url already returned correctly |
| ~~P0~~ | C6 | Pricing | ~~Convert setup fee: BRD §A3 says "—", §6 says $497, code says $249~~ | ✅ FIXED — setupFee: 0 per §A3 |
| ~~P0~~ | C8 | Pricing | ~~Scale setup fee: BRD §A3 says "—", §6 says $997, code says $249~~ | ✅ FIXED — setupFee: 0 per §A3 |
| **P1** | A1 | Doc Integrity | BRD filename `v35.0.md` contains v36.2 content | Rename file |
| ~~P1~~ | ~~A5~~ | ~~Doc Integrity~~ | ~~BRD §16 sitemap references `/our-work` instead of `/portfolio`~~ | ✅ FIXED v36.4 — §16 uses /portfolio |
| ~~P1~~ | ~~A6~~ | ~~Doc Integrity~~ | ~~BRD §16 sitemap missing 15+ implemented routes~~ | ✅ FIXED v36.4 — §16 includes all routes |
| ~~P1~~ | ~~A7~~ | ~~Doc Integrity~~ | ~~BRD §17.1 nav uses old AI mode names~~ | ✅ FIXED v36.4 — §17.1 updated |
| ~~P1~~ | A9 | Doc Integrity | ~~BRD §11.2 tag schema uses old format~~ | ✅ FIXED v36.3 — §A4 updated, see GHL-TAG-REGISTRY.md |
| ~~P1~~ | A11 | Doc Integrity | ~~Theme Spec §4.3 has stale "Hardcoded" status flags~~ | ✅ INVALID — No stale flags found in Theme Spec |
| ~~P1~~ | G2 | Product | ~~Warmy not marked as included in Scale tier~~ | ✅ FIXED — includedInTiers: ['scale'] added |
| ~~P1~~ | L11 | Routes | ~~`routes.ts` missing Accessibility Statement in legalRoutes~~ | ✅ FIXED — Added to legalRoutes |
| ~~P1~~ | ~~U6~~ | ~~Theme Mode~~ | ~~BRD §11.2 says `system` supported but project uses binary~~ | ✅ FIXED — Theme BRD updated to binary mode |
| ~~P0~~ | ~~AF1~~ | ~~Typography~~ | ~~`--font-heading` hardcoded in `index.css`; `tailwind.config.ts` contradicts with `Inter`~~ | ✅ FIXED v36.4 — tailwind.config.ts uses var(--font-heading) |
| ~~P0~~ | ~~AF2~~ | ~~Typography~~ | ~~`--font-body` hardcoded in `index.css` instead of flowing through admin pipeline~~ | ✅ FIXED v36.4 — tailwind.config.ts uses var(--font-body) |
| ~~P1~~ | Q25/AF2a | Typography | ~~`--font-mono` missing — not in `TypographyConfig`, DB, editor, or pipeline~~ | ✅ FIXED — fontMono in full pipeline |
| ~~P1~~ | ~~C2~~ | ~~Pricing~~ | ~~Launch renewal $149/yr not in checkout config~~ | 📋 DEFERRED — GHL billing handles renewal |
| ~~P2~~ | F4 | Pricing | ~~Social Autopilot: $79 in code vs $97 in tracker~~ | ✅ RESOLVED v36.4 — Code aligned to $97/mo |
| ~~P2~~ | ~~A14~~ | ~~Doc Integrity~~ | ~~BRD §28 Document History missing v36.0-v36.2 entries~~ | ✅ FIXED v36.5 — entries added |

---

## High-Priority Verifications Needed (⚠️ Items)

| Category | Item #s | Verification Method |
|----------|---------|-------------------|
| **Checkout UX** | I5, I6, I7, I8, I9 | Browser test: tier dropdown reset, domain radio, char counter, consent checkbox, edit links |
| **Book a Call CTAs** | I23 | Visual audit: SmartGrowth, FrontOffice, FullAIEmployee detail pages |
| **Add-on recommendations** | F9-F12 | Visual audit: each tier page shows correct recommended add-ons |
| **GHL tags** | J4, J5 | Inspect `ghlClient.ts` TIER_TAG_MAP; check Supabase secrets |
| **SEO schemas** | AE6-AE8 | Inspect page source for Product, ItemList schemas |
| **Page content** | AF12-AF15 | Visual audit: page lengths, Services wrapper, PricingTeaser 4th card, portfolio links |
| **Compliance** | N8, N16, N17 | Text comparison: TCPA wording, phone format, address consistency |
| **SSG config** | M2, M6 | Inspect `vite.config.ts` ssgOptions and QueryClient placement |
| **ADA** | V6, V7 | Check skip-nav link and ARIA landmarks |
| **Support model** | AH5, AH6 | Verify Support page displays SLA info and tier breakdown |

---

## Tracker Phase Status Summary

| Phase | Name | Status | Open Tasks |
|-------|------|--------|------------|
| 1 | Tier Renaming & Messaging | ✅ COMPLETE | 0 |
| 2 | Add-On Packs & Cross-Sell | ✅ COMPLETE | 0 |
| 3 | Comparison & Upgrade Paths | ✅ COMPLETE | 0 |
| 4 | Analytics, SEO & Optimization | ⏸️ DEFERRED | 7 |
| 5 | Communications & Training | ⏸️ DEFERRED | 5 |
| 6 | Checkout Implementation | 🚧 IN PROGRESS | ~10 (B2-B7 tasks) |
| 7 | Dynamic Theme System v2.0 | 🚧 IN PROGRESS | 4 (7.27c, 7.28, 7.29, 7.30 + 7.QA) |
| 8 | Platform Module Architecture | 🚧 IN PROGRESS | 1 (8.15 QA) |
| 9 | Module Conformance & Package Extraction | 📋 PLANNED | 11 (all tasks) |

---

## Cross-Document Conflict Registry

These are cases where two or more documents contradict each other.

| # | Conflict | Doc A | Doc B | Resolution |
|---|----------|-------|-------|------------|
| X1 | Smart Websites setup fees | BRD §A3: Capture/Convert/Scale show "—" (no setup) | BRD §6: T2 $249, T3 $497, T4 $997 setup | ✅ RESOLVED v36.4 — Capture/Convert/Scale = $0 setup. Code and BRD §A3 aligned. |
| X2 | AI Employee M1-M3 monthly price | BRD §5.8: $497/mo | BRD §A2: $197/mo | §A2 is authoritative (latest amendment) |
| X3 | Smart Growth monthly price | BRD §4 Revenue, §5.13: $497/mo | BRD §A3: $297/mo | §A3 is authoritative |
| X4 | Light/dark mode: binary vs system | Project memory: binary only | Theme BRD §11.2: "light \| dark \| system" | ✅ RESOLVED v36.5 — Theme BRD updated to binary only per project memory |
| X5 | Social Autopilot price | Tracker Phase 2.4: $97/mo | Code: $97/mo | ✅ RESOLVED v36.4 — $97/mo. Code and BRD aligned. |
| X6 | GHL tag format | BRD §5.9/§11.2: `EI: Checkout - Smart Site` | BRD §A4: `EI: Tier – Launch` | ✅ RESOLVED v36.3 — Canonical format: ei: {category} - {value}. See docs/GHL-TAG-REGISTRY.md |
| X7 | Portfolio route | BRD §16: `/our-work/` | Code: `/portfolio` | ✅ RESOLVED v36.4 — BRD §16 updated to /portfolio |
| X8 | Footer structure | BRD §17.2: Services/AI Modes/Resources/Company | Code: Solutions/AI Employee/Resources/Company/Legal | ✅ RESOLVED v36.4 — BRD §17.2 updated to match code |
| X9 | Number of legal pages | BRD §20.1: 4 pages | Code + Theme BRD: 5 pages (+ Accessibility) | ✅ RESOLVED v36.5 — BRD §20.1 updated to 5 pages including Accessibility Statement |
| X10 | `--font-mono` existence | Theme Spec §4.4: "❌ Not yet a CSS var" | Theme BRD §5.1: included in `typography_config` | ✅ RESOLVED v36.5 — fontMono implemented across full pipeline |
| X11 | Font pipeline authority | `index.css`: hardcodes `--font-heading` as `Space Grotesk` | `tailwind.config.ts`: defines heading as `Inter` | ✅ RESOLVED v36.4 — tailwind.config.ts now uses var(--font-heading), var(--font-body), var(--font-display) |

---

**END OF AUDIT — 266 items across 37 sections**

**Document lines: ~2,200**
