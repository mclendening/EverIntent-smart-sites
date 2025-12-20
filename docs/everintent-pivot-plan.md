# EverIntent Brand Pivot Plan

**Status:** Draft — Workshop before implementing  
**Created:** 2025-01-20  
**Last Updated:** 2025-01-20

---

## Executive Summary

Pivot from "SmartSites by EverIntent" to **EverIntent** as the master brand, with "Smart Websites" as a product/offer descriptor. This reduces trademark risk, positions EverIntent as a tech company (not just a web agency), and creates room for AI/automation upsells and vertical products like Legal AI.

---

## 1. Brand Architecture

### Master Brand
**EverIntent**  
"Smart websites and AI automation for service businesses."

### Product Lines (Under EverIntent)

| Product | Description | Entry Point |
|---------|-------------|-------------|
| **Smart Websites** | T1–T4 website tiers ($249–$1,799) | Primary cash engine |
| **AI & Automation** | n8n workflows, AI receptionist, missed-call text-back | Upsell from websites |
| **Legal AI** | Specialized vertical at EverIntentLegalAI.com | Separate microsite |

### Naming Convention
- Use "smart website(s)" / "smart site" as **descriptive language**, not a capital-S brand
- Tier names remain: Smart Site, Smart Lead, Smart Business, Smart Growth, Smart Launch
- All logos, headers, footers use **EverIntent** only

---

## 2. Core Branding Changes

### 2.1 Logo Treatment

**Current:**
```
Smart Sites
by EverIntent
```

**New:**
```
Ever Intent
Digital Growth
```
*Or without tagline — just "EverIntent"*

**Files to update:**
- `src/components/layout/Header.tsx` (lines 74-79)
- `src/components/layout/Footer.tsx` (lines 170-175)

### 2.2 SEO Defaults

**File:** `src/components/SEO.tsx`

| Field | Current | New |
|-------|---------|-----|
| `SITE_NAME` | "EverIntent SmartSites" | "EverIntent" |
| `SITE_URL` | (check current) | "https://everintent.com" |
| `DEFAULT_DESCRIPTION` | (current copy) | "Smart websites and AI automation for local businesses. Built in 5 days. Starting at $249. You own everything." |

---

## 3. Navigation Restructure

### 3.1 Services Dropdown Reorder

**Current order:**
1. Beautiful Websites
2. Get Found Online (SEO)
3. Capture More Leads
4. Reputation Management
5. Social Media Management
6. Content Marketing
7. Let AI Handle It ← move this up

**New order:**
1. Smart Websites (rename from "Beautiful Websites")
2. Let AI Handle It ← elevated
3. Get Found Online (SEO)
4. Capture More Leads
5. Reputation Management
6. Social Media Management
7. Content Marketing

**File:** `src/components/layout/Header.tsx` (lines 9-17)

### 3.2 Add Solutions Nav Item

After Industries dropdown, add **"Solutions"** link pointing to `/solutions`.

This becomes the hub for:
- Legal AI (links to EverIntentLegalAI.com)
- Future industry-specific packages
- InfoTrust and other products

### 3.3 Footer Updates

**Current columns:**
- Quick Links
- Services
- Industries
- Products

**Proposed changes:**
- Rename "Products" to "What We Build" or "Solutions"
- Add "For Law Firms" link → EverIntentLegalAI.com
- Update tagline: "Smart websites. AI automation. Digital growth."

---

## 4. Homepage Messaging

### 4.1 Hero Section

**File:** `src/components/home/HeroSection.tsx`

**Current headline:** "Built to Win Customers" *(keep as-is — it's strong)*

**Current subheadline:**
> "Professional websites built for local businesses. Look amazing. Get found online. Turn visitors into paying customers."

**Proposed subheadline:**
> "Professional websites with automation built in. Look amazing. Get found. Never miss another lead."

*Rationale: Subtly weaves in AI/automation story without burying the website value prop.*

### 4.2 How We Help Section

**File:** `src/components/home/HowWeHelpSection.tsx`

**Current cards:**
1. Look Professional Online
2. Get Found by Customers
3. Never Miss a Lead

**Proposed refinement (optional):**
- Card 3 title: "Let AI Close Leads" or "AI-Powered Follow-Up"
- Description can stay the same (already mentions automation)

---

## 5. Sitemap Additions

### New Routes

| Route | Purpose |
|-------|---------|
| `/solutions` | Hub page for verticals and products |
| `/solutions/legal` | Bridge page linking to EverIntentLegalAI.com |

**File:** `src/config/routes.ts`

### Future Pages (Phase 2+)
- `/about` — Pull credibility from: n8n expertise, GHL mastery, InfoTrust, Legal AI
- `/smart-websites` — Dedicated T1–T4 breakdown page (if not already `/pricing`)

---

## 6. Domain Hygiene

### 6.1 Redirects
Set up 301 redirects:
- `everintentsmartsites.com/*` → `everintent.com/smart-websites/*`
- All old URLs map to corresponding new pages

### 6.2 What NOT to Do
- Don't bid on "SmartSites" as a Google Ads keyword
- Don't use `smartsites` in any new domains
- Don't create a separate "SmartSites" logo lockup
- Don't use yellow/black color scheme (SmartSites agency brand)

---

## 7. What Stays Unchanged

| Element | Status |
|---------|--------|
| $249 starting price | Keep |
| "5 days" turnaround | Keep |
| "You own everything" | Keep |
| Package tier names (Smart Site, Smart Lead, etc.) | Keep |
| Dark theme + gold accent | Keep |
| All industry vertical pages | Keep |
| Existing service page content | Keep |

---

## 8. Implementation Phases

### Phase 1: Core Branding (Immediate)
- [ ] Update Header logo to "EverIntent"
- [ ] Update Footer logo and tagline
- [ ] Update SEO.tsx defaults
- [ ] Update routes.ts descriptions

### Phase 2: Navigation Refinement
- [ ] Reorder services dropdown (AI to position 2)
- [ ] Rename "Beautiful Websites" to "Smart Websites"
- [ ] Add "Solutions" nav item

### Phase 3: Homepage Messaging
- [ ] Update hero subheadline
- [ ] Optionally refine HowWeHelpSection card 3

### Phase 4: New Pages & Routes
- [ ] Create `/solutions` hub page
- [ ] Create `/solutions/legal` bridge page
- [ ] Build About page with credibility story

### Phase 5: Domain & Analytics
- [ ] Set up 301 redirects from everintentsmartsites.com
- [ ] Update Search Console / Analytics properties
- [ ] Verify all links work

---

## 9. Open Questions for Workshop

1. **Tagline preference:** "Digital Growth" vs "Web + AI" vs no tagline?
2. **Services dropdown:** Rename "Beautiful Websites" to "Smart Websites" or keep as-is?
3. **Solutions page:** Build as hub page or just dropdown menu initially?
4. **About page:** Priority level? Pull content from Legal AI site's credibility elements?
5. **Footer columns:** Add "Solutions" column or keep existing structure?

---

## 10. References

- ChatGPT brand analysis (conversation context)
- EverIntent Legal AI: https://everintentlegalai.com
- SmartSites agency (competitor to avoid confusion with): https://smartsites.com
- Existing BRD: `docs/smartsites-brd-v33.0.md`
- Task Tracker: `docs/TASK-TRACKER.md`

---

## Changelog

| Date | Change |
|------|--------|
| 2025-01-20 | Initial draft created from conversation recommendations |
