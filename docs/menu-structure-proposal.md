# SmartSites Menu Structure - Current State & Gaps

**Date:** December 19, 2025  
**Status:** Audit of existing implementation vs. requirements

---

## What's Already Built

### Header Navigation (`src/components/layout/Header.tsx`)

```
Logo    Services ▼    Industries ▼    Pricing    Portfolio    [Get Started]
```

**Services Dropdown (7 items):**
- Beautiful Websites
- Get Found Online
- Never Miss a Lead
- Book More Jobs
- Run From Your Phone
- Build Your Reputation
- Let AI Handle It

**Industries Dropdown (4 hubs):**
- Home Services
- Professional Services
- Health & Wellness
- Automotive Services

### Footer (`src/components/layout/Footer.tsx`)

**4-Column Layout:**

| Services | Industries | Resources | Company |
|----------|------------|-----------|---------|
| Beautiful Websites | Home Services | LocalPros Network | About |
| Get Found Online | Professional Services | Help | Contact |
| Never Miss a Lead | Health & Wellness | FAQ | Portfolio |
| Book More Jobs | Automotive Services | Support | |
| Run From Your Phone | | | |
| Build Your Reputation | | | |
| Let AI Handle It | | | |
| Pricing | | | |

**Legal Links:** Privacy | Cookies | Terms of Service | Data Rights

**Contact Info:** Email, Phone, Address, Social Icons

### Routes (`src/config/routes.ts`)

All routes defined per BRD:
- ✅ 6 core pages (Home, Pricing, Portfolio, About, Contact, Book-Call)
- ✅ 7 services
- ✅ 6 features
- ✅ 4 industry hubs + 71 verticals
- ✅ 4 checkout routes
- ✅ 3 legal routes
- ✅ 2 LocalPros routes
- ✅ 5 admin routes

---

## Required Changes

### 1. Rename "Portfolio" → "Our Work"

**Why:** Matches SmartSites pattern, clearer intent

**Files to update:**
- `src/components/layout/Header.tsx` (line 117)
- `src/components/layout/Footer.tsx` (line 38)
- Consider renaming route `/portfolio` → `/our-work` (optional, URL redirect possible)

### 2. Add Missing Nav Items

**Header - Add to main nav:**
- None currently missing for MVP

**Footer - Resources column gaps:**
| Current | Should Be |
|---------|-----------|
| Help | Help Center (link to support) |
| FAQ | FAQ (needs page) |
| Support | Contact Support |

**Footer - Company column gaps:**
| Current | Missing |
|---------|---------|
| About | ✅ |
| Contact | ✅ |
| Portfolio → Our Work | ✅ (rename) |
| — | Careers (future) |
| — | Blog (future) |
| — | Testimonials (future) |

### 3. Footer Resources Links - Fix Dead Links

Current Resources links point to non-existent pages:
- `/help` - doesn't exist
- `/faq` - doesn't exist  
- `/support` - doesn't exist

**Options:**
A. Create these pages
B. Remove until pages exist
C. Point to `/contact` temporarily

---

## SmartSites.com Patterns Worth Adopting

### Their Top Nav
```
Services ▼    Our Work    Company ▼    Contact    [Phone Number]
```

### Key Differences from Ours
| SmartSites | Ours | Notes |
|------------|------|-------|
| "Our Work" | "Portfolio" | **Rename ours** |
| Phone in header | Not present | Consider adding |
| Company dropdown | Flat links in footer | Keep ours simpler |
| No Industries in nav | Industries dropdown | **Keep ours** - better for local SEO |

### Their Portfolio Structure
- Filterable by Service AND Industry
- Case studies with metrics (% increase)
- Client logos

**Apply to our `/portfolio` (→ `/our-work`):**
- Filter by industry
- Show the 20 LocalPros sites
- Add metrics when available

---

## Action Items

### Immediate (Code Changes)
1. [ ] Rename "Portfolio" → "Our Work" in Header
2. [ ] Rename "Portfolio" → "Our Work" in Footer
3. [ ] Fix or remove dead footer links (Help, FAQ, Support)

### Near-Term (Pages to Build)
1. [ ] `/our-work` - Portfolio page with LocalPros sites
2. [ ] `/faq` - FAQ page
3. [ ] `/careers` - Careers page (even placeholder)

### Future
1. [ ] `/blog` - Blog/resources
2. [ ] `/testimonials` - Dedicated testimonials page
3. [ ] Phone number in header

---

## Reference: SmartSites Competitor Analysis

**Source:** https://www.smartsites.com

**Their Service Categories:**
- Web Design (WordPress, Shopify, Magento, Custom, Maintenance)
- PPC (Google Ads, Facebook Ads, Remarketing, Landing Pages)
- SEO (Local, National, Ecommerce, Technical Audit, Blogging)
- Email & SMS (Automation, Newsletters, Klaviyo, Mailchimp)
- Social Media (FB/IG, Twitter, LinkedIn, TikTok, Influencer)

**Their Industry Categories (10):**
- Small Business
- Home Services
- Medical & Healthcare
- Legal Services
- Automotive
- B2B
- Retail
- Industrial & Commercial
- Hospitality
- Nonprofit

**What applies to us:** Industry-specific landing pages, metrics-driven case studies, trust badges

**What doesn't apply:** PPC/Social management, enterprise budgets, ecommerce platforms
