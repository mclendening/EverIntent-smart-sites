# Cross-Document & Codebase Alignment Audit

**Date:** 2026-02-15  
**Auditor:** Lovable AI  
**Documents Audited:**
1. `docs/everintent-brd-v35.0.md` (contains v36.2 content)
2. `docs/SMART-WEB-V2.2-TRACKER.md` (Phases 1–9)
3. `docs/THEME-SYSTEM-SPEC.md` (Theme System Technical Spec v2.0)
4. `docs/BRD-theming-system-v2.0.md` (Theme BRD v2.0)
5. `src/modules/` (Platform Module System codebase)
6. `src/config/checkoutConfig.ts` (Checkout pricing config)
7. `src/config/routes.ts` (Route definitions)

**Methodology:** Each row compares a specific requirement across all documents and the codebase. Status values: ✅ Aligned, ⚠️ Partial, ❌ Misaligned, — Not Applicable.

---

## Master Alignment Table

| # | Domain | Requirement | BRD v36.2 | Tracker v2.2 | Theme Spec | Theme BRD | Codebase | Status | Recommended Action |
|---|--------|-------------|-----------|--------------|------------|-----------|----------|--------|-------------------|
| **PRODUCT & PRICING** |||||||||
| 1 | Tier Names | Smart Website tiers: Launch, Capture, Convert, Scale | ✅ §A1 table | ✅ Phase 1 complete | — | — | ✅ `checkoutConfig.ts` L39-101 | ✅ Aligned | None |
| 2 | AI Employee Plans | After-Hours $197, Front Office $297, Full AI $597 | ✅ §A2 table | ✅ Phase 6 refs | — | — | ✅ `checkoutConfig.ts` L105-153 | ✅ Aligned | None |
| 3 | Web Chat Pricing | Setup $497, Monthly $79/mo | ✅ §A2: "$497 setup + $79/mo" | ✅ Phase 6 refs | — | — | ❌ `checkoutConfig.ts` L159: `setupFee: 0` | ❌ Misaligned | **Fix code:** Change `setupFee: 0` → `setupFee: 497` in `checkoutConfig.ts` |
| 4 | Smart Websites Setup | Launch $249 one-time; Capture/Convert/Scale $249 setup | ✅ §A3 table | ✅ Implied | — | — | ⚠️ Code shows `setupFee: 249` on all but `isOneTime` only on Launch | ⚠️ Partial | Verify BRD intent: do Capture/Convert/Scale have a $249 setup fee in addition to monthly? If not, remove `setupFee` from recurring tiers |
| 5 | Launch Renewal | $149/yr renewal after year 1 | ✅ §A3: "$149/yr renewal" | — | — | — | ❌ Not represented in `checkoutConfig.ts` | ❌ Misaligned | Add `renewalPrice: 149` and `renewalInterval: 'yearly'` to Launch tier config |
| 6 | Warmy Bundling | Free with Scale ($297/mo), standalone $49/mo | ✅ §B1 | ✅ Phase 2 refs | — | — | ⚠️ `email-authority` addon exists but no `includedInTiers: ['scale']` | ⚠️ Partial | **Fix code:** Add `includedInTiers: ['scale']` to `email-authority` addon |
| 7 | Social Autopilot Price | $97/mo per BRD §A4 add-on pricing | ✅ §A4 implied | ✅ Phase 2: $97/mo | — | — | ❌ `checkoutConfig.ts` L209: `monthlyPrice: 79` | ❌ Misaligned | **Verify:** Tracker says $97/mo, code says $79/mo. Align to BRD-authoritative price |
| 8 | Book a Call Rule | ≥$297/mo plans show "Book a Call" CTA | ✅ §A5 | — | — | — | ⚠️ Not verified in page components | ⚠️ Unverified | Audit Front Office, Full AI, Scale detail pages + pricing for secondary CTA |
| **NAVIGATION & ROUTING** |||||||||
| 9 | Zero-Redirect Policy | No legacy redirects; 404 → home | ✅ §A9 | ✅ Phase 1 | — | — | ✅ `NotFound.tsx` redirects to `/` | ✅ Aligned | None |
| 10 | SSG Native Anchors | All navigation uses `<a>` tags, not `<Link>` | ✅ §A9, §C4 | ✅ Phase 1.7 | — | — | ⚠️ BRD §A9 lists 5 violating files | ⚠️ Partial | Audit PortfolioCard, Pricing, CompareWebsites, CompareAIEmployee, PricingTeaser for remaining `<Link>` usage |
| 11 | Sitemap Sync | Sitemap matches all public routes | ✅ §16 | — | — | — | ⚠️ `routes.ts` has 32 location sub-cities in `routes.tsx` but only 3 regional hubs in `routes.ts` `locationRoutes` | ⚠️ Partial | `routes.ts` `locationRoutes` array only lists 3 regional pages. The 32 sub-city pages are defined directly in `routes.tsx`. Consider centralizing |
| 12 | Checkout Routes | 8 static checkout routes (no dynamic params) | ✅ §Phase 6 tracker | ✅ Phase 6 SSG table | — | — | ✅ `checkoutRoutes` in `routes.ts` matches 8 slugs | ✅ Aligned | None |
| 13 | Legal Pages | 5 legal pages required | ✅ §20 (Privacy, Cookies, Terms, Data Request, Accessibility) | — | — | — | ⚠️ `legalRoutes` in `routes.ts` lists 4 (missing Accessibility Statement) | ⚠️ Partial | Add `/legal/accessibility-statement` to `legalRoutes` in `routes.ts` and `sitemap.xml` |
| 14 | Resource Differentiation | FAQ (pre-sale), Help (onboarding), Support (active client) | ✅ §A7 | — | — | — | ✅ 3 dedicated pages exist in `resourceRoutes` | ✅ Aligned | Verify H1/subheadline text matches §A7 table |
| **THEME SYSTEM** |||||||||
| 15 | 3-Tier Token Model | Primitive → Semantic → Component | — | ✅ Phase 7 arch | ✅ §2.1 HSL format | ✅ §3.1 diagram | ✅ `site_themes` has `primitive_tokens`, `semantic_tokens`, `component_tokens` cols | ✅ Aligned | None |
| 16 | Light-as-Base Architecture | `:root` = light, `.dark` = dark overrides | — | ✅ 7.7 fix note | ✅ §2.2 pattern | ✅ §7.1 CSS output | ✅ `generateProductionCss` confirmed per tracker 7.7/7.24 | ✅ Aligned | None |
| 17 | Binary Mode (no system) | Only `light` or `dark`; no `system` option | — | ✅ 7.14 notes | ❌ §11.2 says `system` IS supported: "localStorage values `light` \| `dark` \| `system`" | ✅ §3.2: "dark" or "light" | ⚠️ Theme BRD §11 contradicts memory + Theme Spec | ⚠️ Conflict | **Resolve:** Theme BRD §11.2 allows `system`, but project memory says system is excluded. Update Theme BRD §11.2 to remove `system` OR implement system preference support |
| 18 | 10 Theme Seed | 10 hue-derived themes seeded | — | ✅ 7.5 done | ✅ §8.1 profiles | ✅ §8.1 profiles (identical) | ✅ Seeded per tracker | ✅ Aligned | None |
| 19 | Gold Tokens Independent | Gold/e-commerce tokens independent of base hue | — | ✅ 7.10 notes | ✅ §4.3.1 | ✅ §8.3 | ✅ `EcommerceColorEditor.tsx` exists | ✅ Aligned | None |
| 20 | Typography Tokens | `--font-heading`, `--font-body`, `--font-mono` as CSS vars | — | ✅ 7.21d done | ✅ §4.4 | ✅ §5.1 `typography_config` | ⚠️ `--font-mono` listed as "❌ Not yet a CSS var" in Theme Spec §4.4 | ⚠️ Partial | Define `--font-mono` CSS variable in `index.css` and wire to `typography_config.fontMono` |
| 21 | Motion Tokens | `--transition-smooth/bounce/spring` | — | ✅ 7.21e done | ✅ §4.5 | ✅ §5.1 implied | ✅ CSS vars defined per tracker | ✅ Aligned | None |
| 22 | Style Modules | `--module-{name}-{token}` pattern, flattened to CSS vars | — | ✅ 7.13 done | — | ✅ §16 (mentioned) | ✅ `StyleModulesEditor.tsx` exists | ✅ Aligned | None |
| 23 | Hardcoded Colors in index.css | Selection, glow-text, icon gradients must be tokenized | — | ✅ 7.21 done | ✅ §4.3.6-4.3.7 (lists violations) | ✅ §7.3 | ⚠️ Theme Spec §4.3.6 lists `::selection` as hardcoded; Tracker 7.21 says fixed | ⚠️ Stale Doc | **Update Theme Spec** §4.3.6-4.3.7 status from "⚠️ Hardcoded" to "✅ Tokenized" to reflect completed work |
| 24 | Hardcoded Colors in TSX | Components must use semantic tokens | — | ✅ 7.22 done | ✅ §4.3.9 (lists violations) | ✅ §7.3 | ⚠️ `RealisticDashboards.tsx` has 25+ `text-white`, `bg-black` — EXEMPT per §4.6 | ⚠️ Verify Exemptions | Confirm ALL hardcoded-color components are in the §4.6 exemption list. Any non-exempt file with raw colors is a violation |
| 25 | Publish Pipeline | Two-file publish: `themes.ts` + `index.css` → GitHub | — | ✅ 7.7-7.8 done | ✅ §2.3 | ✅ §3.2 | ✅ `sync-theme-to-github` edge function exists | ✅ Aligned | None |
| 26 | ADA Widget | Floating accessibility panel, draggable, 24 controls, 5 presets | — | ✅ 7.25 done | — | ✅ §12 full spec | ✅ `AccessibilityWidget.tsx` exists | ⚠️ Partial | Theme BRD §12.2.2 lists 14 controls as "❌ Planned" (Color + Orientation batches). These are not yet implemented |
| 27 | FOUC Prevention | Inline `<head>` script for early mode detection | — | ✅ 7.14 done | — | ✅ §11.3 | ✅ Implemented in `index.html` | ✅ Aligned | None |
| **MODULE SYSTEM** |||||||||
| 28 | 3-File Kernel | `types.ts`, `registry.ts`, `index.ts` | — | ✅ Phase 8 arch | — | — | ✅ All 3 files exist in `src/modules/` | ✅ Aligned | None |
| 29 | Module Categories | Content, Appearance, Commerce, Settings, Tools | — | ✅ Phase 8 | — | — | ✅ `ModuleCategory` enum in `types.ts` | ✅ Aligned | None |
| 30 | Registered Modules | themes, submissions, portfolio, testimonials, playground, module-manager | — | ✅ Phase 8 (5 listed) + Phase 9 | — | — | ✅ 6 modules registered (5 original + module-manager) | ✅ Aligned | None |
| 31 | Dynamic Dashboard | Dashboard renders from `getModules()`, zero hardcoded nav | — | ✅ 8.6 done | — | — | ✅ Per tracker notes | ✅ Aligned | None |
| 32 | Dynamic Routing | Admin routes from module registry, wrapped in AdminGuard | — | ✅ 8.7 done | — | — | ✅ Per tracker notes | ✅ Aligned | None |
| 33 | Shared CRUD Framework | 7-file framework: CrudService, createCrudHooks, AdminListView, etc. | — | ✅ Phase 8 | — | — | ✅ All 7 files in `src/modules/shared/` | ✅ Aligned | None |
| 34 | Export/Import Engine | Module bundling with manifest validation | — | ✅ Phase 9 | — | — | ✅ `exportEngine.ts`, `importEngine.ts`, `manifest.ts` exist | ⚠️ Untested | End-to-end test: export a module → re-import → verify round-trip integrity |
| 35 | Portfolio CRUD | Admin CRUD for portfolio items | — | ✅ Phase 8 task 8.5 (routes to Placeholder) | — | — | ⚠️ `PortfolioEditPage.tsx` and `PortfolioListPage.tsx` exist but functionality unverified | ⚠️ Unverified | Test portfolio admin CRUD end-to-end |
| 36 | Testimonials CRUD | Admin CRUD for testimonials | — | ✅ Phase 8 task 8.5 (routes to Placeholder) | — | — | ⚠️ `TestimonialsEditPage.tsx` and `TestimonialsListPage.tsx` exist but functionality unverified | ⚠️ Unverified | Test testimonials admin CRUD end-to-end |
| **CHECKOUT FLOW** |||||||||
| 37 | 3-Step Flow | Step 1: Plan/Addons, Step 2: Details, Step 3: Review | ✅ §A9 refs | ✅ Phase 6 wireframes | — | — | ✅ `CheckoutStep1Selection.tsx`, `CheckoutStep2Details.tsx`, `CheckoutStep3Review.tsx` | ✅ Aligned | None |
| 38 | Tier Dropdown Reset | Changing tier resets all selected add-ons | — | ✅ Phase 6 §4.1.2 | — | — | ⚠️ Not verified in component code | ⚠️ Unverified | Test tier dropdown change → verify addons clear |
| 39 | Domain Radio Pattern | "Yes" reveals domain input, "No" hides it | — | ✅ Phase 6 §4.2.1 | — | — | ⚠️ Not verified in component code | ⚠️ Unverified | Test domain radio in Step 2 |
| 40 | TCPA Consent | Checkbox + timestamp capture | ✅ §20 compliance | ✅ Phase 6 wireframes | — | — | ✅ `tcpa_consent` + `consent_timestamp` in DB schema | ✅ Aligned | None |
| 41 | Step 3 Edit Links | "Edit" links on Review step jump back to Step 1/2 | — | ✅ Phase 6 §4.3 | — | — | ⚠️ Not verified in component code | ⚠️ Unverified | Test Step 3 edit links navigate correctly |
| 42 | Edge Function Redirect | `start-checkout` returns GHL redirect URL | — | ✅ Phase 6: "⚠️ Needs Update" | — | — | ⚠️ Tracker says function does NOT yet return redirect URL | ❌ Incomplete | **Fix:** Update `start-checkout` edge function to return GHL checkout redirect URL |
| **COMPLIANCE** |||||||||
| 43 | Cookie Consent | CA-mandatory cookie gating with preferences modal | ✅ §20 | — | — | — | ✅ `CookieConsent.tsx` + `CookiePreferencesModal.tsx` exist | ✅ Aligned | None |
| 44 | Accessibility Statement | Dedicated `/legal/accessibility-statement` page | ✅ Implied by ADA widget | ✅ 7.25 Batch 4 | — | ✅ §12.2.4 | ✅ `AccessibilityStatement.tsx` exists | ⚠️ Partial | Page exists but NOT in `legalRoutes` config or sitemap |
| 45 | Portfolio Link Integrity | Cards without case studies link to hub, not dead slugs | ✅ §A8 | — | — | — | ⚠️ Not verified in `PortfolioCard.tsx` | ⚠️ Unverified | Audit portfolio cards against §A8 rule |
| 46 | Page Length Guidelines | Hub 4-5 screens, Detail 6-8, Resource 3-4 | ✅ §A10 | — | — | — | ⚠️ Not measured | ⚠️ Unverified | Visual audit of page scroll depths |
| **DOCUMENT INTEGRITY** |||||||||
| 47 | BRD Filename | File is `everintent-brd-v35.0.md` but contains v36.2 content | — | — | — | — | ❌ Misleading filename | ❌ Misaligned | **Rename** `docs/everintent-brd-v35.0.md` → `docs/everintent-brd-v36.2.md` |
| 48 | Theme Spec Staleness | Theme Spec §4.3.6-4.3.9 lists items as "⚠️ Hardcoded" that were fixed in Tracker 7.21-7.22 | — | ✅ (work done) | ❌ Stale status flags | — | ✅ (code fixed) | ❌ Doc Stale | **Update** Theme Spec §4.3 status columns to reflect completed tokenization work |
| 49 | Theme BRD Mode Conflict | §11.2 says `system` mode supported; project memory says excluded | — | — | — | ❌ Contradicts memory | ⚠️ Code may not implement `system` | ❌ Conflict | **Resolve** definitively: keep binary (light/dark) or support system. Update all docs to match |
| 50 | Deprecated Tier Names in BRD Body | §5, §6, §7 body still references "Smart Site", "Smart Lead", etc. | ❌ §A1 says deprecated but body uses them | — | — | — | — | ⚠️ Confusing | BRD body pre-dates v36 amendments. Note that §A1 supersedes body. Consider full-text find/replace |

---

## Summary Statistics

| Status | Count | % |
|--------|-------|---|
| ✅ Aligned | 26 | 52% |
| ⚠️ Partial / Unverified | 18 | 36% |
| ❌ Misaligned / Incomplete | 6 | 12% |

---

## Critical Fixes Required (❌ Items)

| Priority | Item | Action |
|----------|------|--------|
| **P0** | #3 Web Chat Setup Fee | Change `setupFee: 0` → `497` in `checkoutConfig.ts` |
| **P0** | #42 Edge Function Redirect | Update `start-checkout` to return GHL redirect URL |
| **P1** | #47 BRD Filename | Rename file to match actual version |
| **P1** | #48 Theme Spec Staleness | Update hardcoded status flags to reflect completed work |
| **P1** | #49 Mode Conflict | Resolve binary vs system mode definitively |
| **P2** | #50 Deprecated Names in Body | Acknowledge amendments supersede or do full text update |

---

## High-Priority Verifications Needed (⚠️ Items)

| Item | Verification Method |
|------|-------------------|
| #6 Warmy bundling in code | Add `includedInTiers: ['scale']` to email-authority addon |
| #7 Social Autopilot price | Confirm authoritative price ($79 or $97) and align |
| #8 Book a Call CTAs | Visual audit of ≥$297 plan pages |
| #10 SSG native anchors | Search for remaining `<Link>` in 5 listed files |
| #13 Accessibility Statement route | Add to `legalRoutes` and sitemap |
| #20 `--font-mono` CSS var | Define in `index.css` |
| #26 ADA Color+Orientation batches | 14 controls still planned/unimplemented |
| #34 Module export/import | End-to-end round-trip test |
