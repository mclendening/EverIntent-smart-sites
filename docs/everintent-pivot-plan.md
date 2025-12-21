# EverIntent Brand Pivot Plan

**Status:** Final — Ready for Implementation  
**Created:** 2025-01-20  
**Last Updated:** 2025-01-21

---

## Executive Summary

Pivot from "SmartSites by EverIntent" to **EverIntent** as the master brand, with "Smart Websites" as a product/offer descriptor. This reduces trademark risk, positions EverIntent as a tech company (not just a web agency), and creates room for AI/automation upsells and vertical products like Legal AI.

---

## 1. Brand Architecture

### Master Brand
**EverIntent**  
Tagline: **"Web Design & Automation"**

### Product Lines (Under EverIntent)

| Product | Description | Entry Point |
|---------|-------------|-------------|
| **Smart Websites** | T1–T4 website tiers ($249–$1,799) | Primary cash engine |
| **AI & Automation** | n8n workflows, AI receptionist, missed-call text-back | Upsell from websites |
| **Legal AI** | Specialized vertical at EverIntentLegalAI.com | Separate microsite |

### Naming Convention
- Use "smart website(s)" / "smart site" as **descriptive language** (lowercase in prose), not a capital-S brand
- Tier names remain: Smart Site, Smart Lead, Smart Business, Smart Growth, Smart Launch
- All logos, headers, footers use **EverIntent** only
- Never use "SmartSites" as a brand name or logo lockup

---

## 2. SmartSites Trademark Context

### Why This Matters
SmartSites is a large US digital marketing agency with strong market presence and brand protection. Their federal trademark was cancelled in 2020 for non-maintenance, but they retain common-law rights from long, nationwide use in web design/SEO services.

### How This Pivot Mitigates Risk
1. **EverIntent as master brand** — not a competing "SmartSites" brand
2. **"smart websites" as descriptive product language** — not a trademarked name
3. **No confusing visual identity** — avoid their yellow/black color scheme
4. **Sunsetting `everintentsmartsites.com`** — removes brand confusion vector

### Safe Usage Guidelines
- ✅ "EverIntent Smart Website Packages"
- ✅ "Our smart website tiers"
- ✅ "Get a smart site that..."
- ❌ "EverIntent SmartSites™"
- ❌ "SmartSites by EverIntent" (logo/brand)
- ❌ Bidding on "SmartSites" as a Google Ads keyword

---

## 3. Core Branding Changes

### 3.1 Logo Treatment

**Current:**
```
Smart Sites
by EverIntent
```

**New:**
```
EverIntent
Web Design & Automation
```

**Files to update:**
- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`

### 3.2 SEO Defaults

**File:** `src/components/SEO.tsx`

| Field | Current | New |
|-------|---------|-----|
| `SITE_NAME` | "EverIntent SmartSites" | "EverIntent" |
| `SITE_URL` | everintentsmartsites.com | "https://everintent.com" (at cutover) |
| `DEFAULT_DESCRIPTION` | (current copy) | "Smart websites and AI automation for local businesses. Built in 5 days. Starting at $249. You own everything." |

---

## 4. Navigation Restructure

### 4.1 Main Navigation Order

**Final nav structure:**
```
Smart Websites | AI & Automation | Industries | Solutions | Pricing | Our Work | About
```

### 4.2 Services Dropdown (Smart Websites)

**Current order:**
1. Beautiful Websites
2. Get Found Online (SEO)
3. Capture More Leads
4. Reputation Management
5. Social Media Management
6. Content Marketing
7. Let AI Handle It

**New order:**
1. **Smart Websites** ← renamed from "Beautiful Websites"
2. **Let AI Handle It** ← elevated to position 2
3. Get Found Online (SEO)
4. Capture More Leads
5. Reputation Management
6. Social Media Management
7. Content Marketing

**File:** `src/components/layout/Header.tsx`

### 4.3 Solutions Nav Item

**Route:** `/solutions`

Links to:
- For Law Firms → `everintentlegalai.com` (external)
- Future vertical packages
- InfoTrust and other products

### 4.4 Footer Structure

**Current columns:**
- Quick Links
- Services
- Industries
- Products

**New structure:**
- Quick Links
- Services
- Industries
- **Solutions** ← renamed from "Products"

**Solutions column content:**
- Smart Websites → `/pricing`
- AI & Automation → `/services/ai-automation`
- For Law Firms → `https://everintentlegalai.com` (external)

**Footer tagline:** "Web Design & Automation"

---

## 5. Homepage Messaging

### 5.1 Hero Section

**File:** `src/components/home/HeroSection.tsx`

**Current headline:** "Built to Win Customers" *(keep as-is — it's strong)*

**Current subheadline:**
> "Professional websites built for local businesses. Look amazing. Get found online. Turn visitors into paying customers."

**Recommended subheadline (ChatGPT Option A):**
> "Smart websites that pay for themselves — and are ready for AI when you are. We build conversion-focused sites for local service businesses starting at $249. Every site ships upgrade-ready with automation and AI under the hood."

**Alternative (lighter touch):**
> "Professional websites with automation built in. Look amazing. Get found. Never miss another lead."

### 5.2 How We Help Section

**File:** `src/components/home/HowWeHelpSection.tsx`

**Current cards:**
1. Look Professional Online
2. Get Found by Customers
3. Never Miss a Lead

**Optional refinement:**
- Card 3 title: "Let AI Close Leads" or "AI-Powered Follow-Up"
- Description can stay the same (already mentions automation)

---

## 6. About Page Strategy

### Content Sources
Blend credibility elements from:
1. **EverIntent** — AI/automation positioning, n8n expertise, GHL mastery
2. **EverIntent Legal AI** — established vertical credibility, tech leadership
3. **This project** — design excellence, SMB focus, speed-to-market

### Key Messages
- "We build the systems, not just the websites"
- "From your first site to full AI automation — one team"
- n8n and GHL expertise as differentiators
- Legal AI as proof of vertical depth

**Route:** `/about`

---

## 7. Sitemap Additions

### New Routes

| Route | Purpose |
|-------|---------|
| `/solutions` | Hub page for verticals and products |
| `/solutions/legal` | Bridge page linking to EverIntentLegalAI.com |
| `/about` | Credibility page blending EverIntent + Legal AI story |

**File:** `src/config/routes.ts`

### Future Pages (Phase 2+)
- `/smart-websites` — Dedicated T1–T4 breakdown page (if not already `/pricing`)

---

## 8. Domain & Deployment Strategy

### 8.1 Staging Domain
**Current production URL:** `https://everintentsmartsites.com/`

This site will remain public at the legacy URL until content is finalized. At cutover:
- Update Vercel domain settings
- Rename Supabase project
- Rename GitHub repository
- Update all code references from `everintentsmartsites.com` → `everintent.com`

### 8.2 Naming Convention (Immediate)
All code, components, SEO defaults, and branding should use **EverIntent** naming now. Only the production domain remains `everintentsmartsites.com` until final cutover.

### 8.3 Redirects (Post-Cutover)
Set up 301 redirects:
- `everintentsmartsites.com/*` → `everintent.com/*`
- All old URLs map to corresponding new pages

### 8.4 What NOT to Do
- Don't bid on "SmartSites" as a Google Ads keyword
- Don't use `smartsites` in any new domains
- Don't create a separate "SmartSites" logo lockup
- Don't use yellow/black color scheme (SmartSites agency brand)

---

## 9. What Stays Unchanged

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

## 10. Implementation Phases

### Phase 1: Core Branding (Immediate)
- [ ] Update Header logo to "EverIntent" with tagline "Web Design & Automation"
- [ ] Update Footer logo and tagline
- [ ] Update SEO.tsx defaults
- [ ] Update routes.ts descriptions

### Phase 2: Navigation Refinement
- [ ] Rename "Beautiful Websites" → "Smart Websites"
- [ ] Reorder services dropdown (AI to position 2)
- [ ] Add "Solutions" nav item
- [ ] Rename footer "Products" → "Solutions"

### Phase 3: Homepage Messaging
- [ ] Update hero subheadline
- [ ] Optionally refine HowWeHelpSection card 3

### Phase 4: New Pages & Routes
- [ ] Create `/solutions` hub page
- [ ] Create `/solutions/legal` bridge page
- [ ] Build `/about` page with credibility story

### Phase 5: Domain Cutover (Final Step)
- [ ] Update Vercel domain from everintentsmartsites.com → everintent.com
- [ ] Rename Supabase project to EverIntent
- [ ] Rename GitHub repository to everintent
- [ ] Update SITE_URL in code to everintent.com
- [ ] Set up 301 redirects from everintentsmartsites.com
- [ ] Update Search Console / Analytics properties
- [ ] Verify all links work

---

## 11. Workshop Decisions (Closed)

| # | Question | Decision |
|---|----------|----------|
| 1 | Tagline preference | **"Web Design & Automation"** |
| 2 | Services dropdown rename | **"Smart Websites"** (from "Beautiful Websites") |
| 3 | Solutions page | **Nav link to `/solutions`**, hub page in Phase 4 |
| 4 | About page | **Blend EverIntent + Legal AI credibility**, route `/about` |
| 5 | Footer columns | **"Products" → "Solutions"**, add "For Law Firms" link |

---

## 12. References

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
| 2025-01-21 | Tagline decision finalized: "Web Design & Automation" |
| 2025-01-21 | Added staging domain strategy: stay on everintentsmartsites.com until content ready, use EverIntent naming in code now |
| 2025-01-21 | All workshop decisions closed; added SmartSites trademark context, finalized nav/footer structure, added About page strategy, hero messaging options |
