# SmartSites Menu Structure — Proposed Changes

**Date:** December 19, 2025  
**Status:** READY FOR IMPLEMENTATION  
**Source of Truth:** BRD v32.10 Section 17 (Navigation Structure)

---

## Current Implementation (Preserve This)

### Header (`src/components/layout/Header.tsx`)
```
Logo    Services ▼    Industries ▼    Pricing    Portfolio    [Get Started]
```
- ✅ Services dropdown (7 items) — matches BRD
- ✅ Industries dropdown (4 hubs) — matches BRD  
- ✅ Pricing link — matches BRD
- ✅ Get Started CTA
- ⚠️ **Only change:** "Portfolio" → "Our Work"

### Footer (`src/components/layout/Footer.tsx`)

| Services ✅ | Industries ✅ | Resources ✅ | Company ⚠️ |
|-------------|---------------|---------------|-------------|
| Beautiful Websites | Home Services | LocalPros Network | About |
| Get Found Online | Professional Services | Help *(placeholder)* | Contact |
| Never Miss a Lead | Health & Wellness | FAQ *(placeholder)* | Portfolio → **Our Work** |
| Book More Jobs | Automotive Services | Support *(placeholder)* | + **Careers** |
| Run From Your Phone | | | |
| Build Your Reputation | | | |
| Let AI Handle It | | | |
| Pricing | | | |

**Legal Links:** ✅ Privacy | Cookies | Terms of Service | Data Rights  
**Contact Info:** ✅ Email, Phone, Address, Social Icons

### Routes (`src/config/routes.ts`)
✅ All 100+ routes defined per BRD — no changes needed

---

## Required Changes (Minimal)

### 1. Rename "Portfolio" → "Our Work"

| File | Line | Change |
|------|------|--------|
| `Header.tsx` | ~117 | `Portfolio` → `Our Work` |
| `Header.tsx` | ~214 | `Portfolio` → `Our Work` (mobile) |
| `Footer.tsx` | ~38 | `Portfolio` → `Our Work` |

**URL stays `/portfolio`** — no URL change, avoids breaking any existing links

---

### 2. Add "Careers" to Company Column

**Footer.tsx line ~35-39:**
```typescript
const companyLinks = [
  { title: 'About', path: '/about' },
  { title: 'Careers', path: '/careers' },  // ADD
  { title: 'Contact', path: '/contact' },
  { title: 'Our Work', path: '/portfolio' },  // RENAMED
];
```

**routes.ts** — add if not present:
```typescript
careers: '/careers',
```

---

## Final Structure After Changes

### Header
```
Logo    Services ▼    Industries ▼    Pricing    Our Work    [Get Started]
```

### Footer
| Services | Industries | Resources | Company |
|----------|------------|-----------|---------|
| Beautiful Websites | Home Services | LocalPros Network | About |
| Get Found Online | Professional Services | Help | Careers |
| Never Miss a Lead | Health & Wellness | FAQ | Contact |
| Book More Jobs | Automotive Services | Support | Our Work |
| Run From Your Phone | | | |
| Build Your Reputation | | | |
| Let AI Handle It | | | |
| Pricing | | | |

---

## Implementation Checklist

- [ ] Header.tsx: "Portfolio" → "Our Work" (desktop + mobile)
- [ ] Footer.tsx: "Portfolio" → "Our Work" in companyLinks
- [ ] Footer.tsx: Add "Careers" link to companyLinks
- [ ] routes.ts: Add `/careers` route

---

## NOT Changing

- ❌ Help, FAQ, Support links — these are **placeholders** for future content pages
- ❌ Services structure — already correct per BRD
- ❌ Industries structure — already correct per BRD  
- ❌ Legal links — already correct
- ❌ Contact info — already correct
