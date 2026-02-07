# Smart Websites v2.2 Implementation Tracker

**Created:** 2026-02-07  
**Status:** Active  
**Owner:** EverIntent Development Team

---

## Overview

EverIntent v2.2 Smart Websites restructure:
- Rename tiers: Launch → Capture → Convert → Scale
- Introduce 6 add-on packs with cross-sell integration
- Maintain SSG compatibility (no URL redirects)
- Preserve Smart Websites / AI Employee product separation

---

## Phase 1 – Tier Renaming & Messaging (Week 1–2)

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

## Phase 2 – Add-On Packs & Cross-Sell (Week 3–4)

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
| 2.13 | Extend checkout with add-on selection step | `todo` | Test transactions with pack combos | SSG-compatible form handling |

---

## Phase 3 – Comparison & Upgrade Paths (Week 5–6)

| ID | Task | Status | Verification | Notes |
|----|------|--------|--------------|-------|
| 3.1 | Rebuild `/compare-websites` table with new tier names | `todo` | Matches v2.2 feature matrix; responsive | Reuse AI Employee comparison styling |
| 3.2 | Add upgrade CTAs beneath each column | `todo` | Each CTA links to correct tier page | "Upgrade to Capture", etc. |
| 3.3 | Add recommended add-ons below upgrade buttons | `todo` | 1-2 packs per tier | Cross-reference Phase 2 assignments |
| 3.4 | Add AI Employee upsell section on Scale page | `todo` | Links to `/let-ai-handle-it/after-hours` | Only cross-line upsell on site |

---

## Phase 4 – Analytics, SEO & Ongoing Optimisation

| ID | Task | Status | Verification | Notes |
|----|------|--------|--------------|-------|
| 4.1 | Instrument tier selection tracking | `todo` | Test events appear in dashboard | Use existing analytics framework |
| 4.2 | Instrument add-on selection + attach rate tracking | `todo` | Test events appear in dashboard | Track pack selections |
| 4.3 | Instrument cross-sell click tracking | `todo` | Test events appear in dashboard | Track recommended pack clicks |
| 4.4 | Instrument Scale → AI Employee upgrade tracking | `todo` | Test events appear in dashboard | Track cross-line conversions |
| 4.5 | Post-launch SEO audit (Phase 1) | `todo` | Document results in tracker | Meta tags, headings, internal links |
| 4.6 | Post-launch SEO audit (Phase 2) | `todo` | Document results in tracker | Add-ons page, pack details |
| 4.7 | Post-launch SEO audit (Phase 3) | `todo` | Document results in tracker | Comparison table, upgrade paths |

---

## Phase 5 – Communications & Training

| ID | Task | Status | Verification | Notes |
|----|------|--------|--------------|-------|
| 5.1 | Draft customer announcement email | `todo` | Marketing + legal review | Explain new names; URLs unchanged |
| 5.2 | Send test batch to internal staff | `todo` | Confirm formatting | Pre-send verification |
| 5.3 | Update knowledge base articles | `todo` | Remove "Smart Lead", "Smart Growth" refs | Use new tier names |
| 5.4 | Update sales sheets and FAQs | `todo` | Remove outdated references | Include add-on pack descriptions |
| 5.5 | Conduct sales/support training session | `todo` | Team can explain new structure | Focus on positioning packs |

---

## Guardrails

| Rule | Description |
|------|-------------|
| **No Redirects** | SSG site; keep existing slugs, update displayed names only |
| **Consistent Styling** | Dark/purple/yellow color scheme; existing typography |
| **SEO/AEO Adherence** | Updated meta tags, meaningful alt text, proper headings, accessible tables |
| **Verification Required** | Every task includes verification step; only mark complete after staging test |
| **Product Separation** | Smart Websites and AI Employee remain distinct product lines |

---

## Changelog

| Date | Change | Author |
|------|--------|--------|
| 2026-02-07 | Tracker created per ChatGPT v2.2 spec | Lovable |
| 2026-02-07 | Phase 1 (1.1-1.8) complete: Renamed all tiers to Launch/Capture/Convert/Scale, updated nav dropdown with Add-On Packs link, refreshed SEO metadata | Lovable |

