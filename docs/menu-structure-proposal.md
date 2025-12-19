# SmartSites Menu Structure — Proposed Changes

**Date:** December 19, 2025  
**Status:** READY FOR IMPLEMENTATION  
**Source of Truth:** BRD v32.10 Section 17 (Navigation Structure)

---

## Current Implementation Status

### Header (`src/components/layout/Header.tsx`)
```
Logo    Services ▼    Industries ▼    Pricing    Portfolio    [Get Started]
```
✅ Services dropdown (7 items) - matches BRD  
✅ Industries dropdown (4 hubs) - matches BRD  
✅ Pricing link - matches BRD  
⚠️ "Portfolio" → rename to "Our Work"  
✅ Get Started CTA

### Footer (`src/components/layout/Footer.tsx`)
| Services ✅ | Industries ✅ | Resources ⚠️ | Company ⚠️ |
|-------------|---------------|---------------|-------------|
| Beautiful Websites | Home Services | LocalPros Network ✅ | About ✅ |
| Get Found Online | Professional Services | Help ❌ dead link | Contact ✅ |
| Never Miss a Lead | Health & Wellness | FAQ ❌ dead link | Portfolio → Our Work |
| Book More Jobs | Automotive Services | Support ❌ dead link | — |
| Run From Your Phone | | | |
| Build Your Reputation | | | |
| Let AI Handle It | | | |
| Pricing | | | |

**Legal Links:** ✅ Privacy | ✅ Cookies | ✅ Terms of Service | ✅ Data Rights  
**Contact Info:** ✅ Email, Phone, Address, Social Icons

### Routes (`src/config/routes.ts`)
✅ All 100+ routes defined per BRD

---

## Required Changes

### 1. Rename "Portfolio" → "Our Work"

**Files:**
- `src/components/layout/Header.tsx` line ~117
- `src/components/layout/Footer.tsx` line ~38

**URL:** Keep `/portfolio` (no URL change needed, avoids breaking links)

---

### 2. Fix Dead Footer Links (Resources Column)

**Current broken links:**
| Link | Current Path | Issue |
|------|--------------|-------|
| Help | `/help` | Page doesn't exist |
| FAQ | `/faq` | Page doesn't exist |
| Support | `/support` | Page doesn't exist |

**Resolution:** Remove these links until pages are built. Keep "LocalPros Network" only.

**Updated Resources column:**
```
Resources
└── LocalPros Network → /localpros
```

---

### 3. Add Careers Link (Company Column)

**Per BRD Section 16:** Careers page is specified in sitemap.

**Add to Company column:**
```
Company
├── About → /about
├── Careers → /careers
├── Our Work → /portfolio
└── Contact → /contact
```

**Route to add in `src/config/routes.ts`:**
```typescript
careers: '/careers',
```

---

## Final Proposed Structure

### Header Navigation
```
Logo    Services ▼    Industries ▼    Pricing    Our Work    [Get Started]
```

### Footer Structure
| Services | Industries | Resources | Company |
|----------|------------|-----------|---------|
| Beautiful Websites | Home Services | LocalPros Network | About |
| Get Found Online | Professional Services | | Careers |
| Never Miss a Lead | Health & Wellness | | Our Work |
| Book More Jobs | Automotive Services | | Contact |
| Run From Your Phone | | | |
| Build Your Reputation | | | |
| Let AI Handle It | | | |
| Pricing | | | |

**Legal:** Privacy | Terms of Service | Data Rights | Cookies  
**Contact:** hello@everintentsmartsites.com | (555) 123-4567 | Social icons

---

## Implementation Checklist

### Immediate Code Changes
- [ ] Header.tsx: "Portfolio" → "Our Work"
- [ ] Footer.tsx: "Portfolio" → "Our Work" in Company column
- [ ] Footer.tsx: Remove Help, FAQ, Support links from Resources
- [ ] Footer.tsx: Add "Careers" link to Company column
- [ ] routes.ts: Add `/careers` route

### Pages to Build (Future)
- [ ] `/careers` — Careers/jobs page
- [ ] `/our-work` — Portfolio page showing LocalPros sites (can use existing `/portfolio` route)

---

## Not Included (Explicitly Excluded)

- ❌ Blog — Not in GTM, not a priority
- ❌ Testimonials page — Testimonials shown inline on pages, no dedicated page needed
- ❌ FAQ page — Not in MVP scope
- ❌ Help/Support pages — Use Contact page instead
