# EverIntent.com Site Fix Prompts for Lovable

**Purpose:** Align the current everintent.com site with BRD v35.0 specifications  
**Target:** Existing Lovable project (not new project)  
**Scope:** Pricing alignment, comparison tables, AI demos, dashboard mockups  
**Date:** February 2026

-----

## Pre-Flight Checklist

Before running these prompts:

- [ ] Open the existing EverIntent Lovable project
- [ ] Ensure you're on the main branch
- [ ] Have BRD v35.0 open for reference
- [ ] Budget ~500-800 credits for full implementation

-----

## PROMPT 1: Pricing Page Overhaul (P0 Priority)

```
CRITICAL FIX: Replace the entire /pricing page with BRD-accurate pricing.

## EXACT PRICING FROM BRD v35.0:

### Smart Websites (4 tiers):
| Tier | Price | Billing |
|------|-------|---------|
| Smart Site (T1) | $249 | One-time |
| Smart Lead (T2) | $97 | Monthly |
| Smart Business (T3) | $197 | Monthly |
| Smart Growth (T4) | $497 | Monthly |

T1 Renewal: $149/year after first year

### AI Employee Modes:
| Mode | Monthly | Setup |
|------|---------|-------|
| After Hours | $149 | $1,497 |
| After Hours + Booking | $197 | $1,497 |
| Missed Call Recovery | $149 | $1,497 |
| Front Line Screening | $297 | $1,497 |
| Full AI Employee | 15% bundle discount | $1,497 |
| Web Chat Only | $79 | $497 |

### Usage Inclusions by Tier:
- T2: 400 SMS/month, 30 AI minutes/month
- T3: 600 SMS/month, 50 AI minutes/month  
- T4: 1000 SMS/month, 100 AI minutes/month

## BUILD THIS:

### Section 1: Hero
- Headline: "Simple, Transparent Pricing"
- Subhead: "Professional websites from $249. AI automation from $149/month."
- Two tabs: [Smart Websites] [AI Employee]

### Section 2: Smart Websites Comparison Table

Create a 4-column comparison table with these EXACT features:

| Feature | T1 Smart Site | T2 Smart Lead | T3 Smart Business | T4 Smart Growth |
|---------|:-------------:|:-------------:|:-----------------:|:---------------:|
| **Price** | $249 | $97/mo | $197/mo | $497/mo |
| **Billing** | One-time | Monthly | Monthly | Monthly |
| Professional Website | ✓ | ✓ | ✓ | ✓ |
| Mobile Responsive | ✓ | ✓ | ✓ | ✓ |
| SSL Certificate | ✓ | ✓ | ✓ | ✓ |
| Basic SEO | ✓ | ✓ | ✓ | ✓ |
| Contact Form | ✓ | ✓ | ✓ | ✓ |
| Google Maps | ✓ | ✓ | ✓ | ✓ |
| GA4 Dashboard | View | Full | Full | Full |
| Missed Call Text-Back | — | ✓ | ✓ | ✓ |
| AI Chat Widget | — | ✓ | ✓ | ✓ |
| CRM / Contacts | — | ✓ | ✓ | ✓ |
| SMS/Email | — | 400/mo | 600/mo | 1000/mo |
| Mobile App | — | ✓ | ✓ | ✓ |
| Online Booking | — | — | ✓ | ✓ |
| Pipeline Management | — | — | ✓ | ✓ |
| Review Automation | — | — | ✓ | ✓ |
| AI Voice Agent | — | — | — | ✓ |
| Advanced Automations | — | — | — | ✓ |
| Unified Inbox | — | — | — | ✓ |
| Strategy Calls | — | — | — | Quarterly |

**Design Requirements:**
- Dark cards with subtle borders
- T2 gets "Most Popular" badge (amber, glassmorphic)
- Hover state: card lifts with amber glow
- Checkmarks: amber color, animated on scroll
- Dashes: muted gray
- Price: large, bold, amber accent on hover
- Sticky header row on scroll

**CTA Buttons:**
- T1: "Get Started — $249" (secondary style)
- T2: "Start Free Trial" (primary amber, pulse animation)
- T3: "Start Free Trial" (primary style)
- T4: "Book a Demo" (secondary style)

### Section 3: AI Employee Comparison (Tab 2)

When "AI Employee" tab is active, show this table:

| Mode | Best For | Monthly | Setup |
|------|----------|---------|-------|
| After Hours | Answer calls when you're closed | $149 | $1,497 |
| After Hours + Booking | + Let AI book appointments | $197 | $1,497 |
| Missed Call Recovery | Text back every missed call in <60s | $149 | $1,497 |
| Front Line Screening | AI answers, screens, transfers | $297 | $1,497 |
| Full AI Employee | Everything above | 15% off | $1,497 |
| Web Chat Only | Website chat without phone | $79 | $497 |

**Design:**
- Horizontal cards, not vertical columns
- Each card shows mode icon, description, pricing
- "Full AI Employee" card spans full width with bundle savings highlighted
- CTA: "See AI in Action" → links to /let-ai-handle-it

### Section 4: FAQ Accordion

Include these questions:
1. "What's included in the one-time $249 price?"
2. "Can I upgrade from Smart Site to Smart Lead later?"
3. "What happens if I exceed my SMS limit?"
4. "Do I own my website?"
5. "Is there a contract?"
6. "What's the setup process for AI Employee?"

### Section 5: Final CTA
- "Not sure which plan? Book a free 15-minute call."
- [Book a Call] button → /contact
```

-----

## PROMPT 2: AI Employee Page (/let-ai-handle-it) (P0 Priority)

```
CRITICAL FIX: Rebuild /let-ai-handle-it with BRD-accurate pricing and interactive demos.

## EXACT PRICING (from BRD v35.0 Section 5.8):

| Mode ID | Mode Name | Monthly | Setup Fee |
|---------|-----------|---------|-----------|
| M1 | After Hours | $149 | $1,497 |
| M2 | After Hours + Booking | $197 | $1,497 |
| M3 | Missed Call Recovery | $149 | $1,497 |
| M4 | Front Line Screening | $297 | $1,497 |
| M5 | Full AI Employee | 15% discount | $1,497 |
| — | Web Chat Only | $79 | $497 |

## BUILD THIS:

### Section 1: Full-Viewport Hero
- Background: Dark gradient with subtle mesh
- Headline: "Let AI Handle It"
- Subhead: "Your phone answered 24/7. Missed calls recovered. Appointments booked automatically."
- Stats row: "62% of calls missed → $200+ lost per call → AI fixes this"
- CTA: [See Pricing] [Watch Demo]

### Section 2: Simulated SMS Demo (CRITICAL)

Create an interactive phone mockup showing this conversation:

┌─────────────────────────────────────┐
│ ◀ Messages    AI Assistant    ⓘ    │
├─────────────────────────────────────┤
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 📞 Missed call from (555) 123-4567 │
│ │ Today 11:47 PM                  │ │
│ └─────────────────────────────────┘ │
│                                     │
│     ┌───────────────────────────┐   │
│     │ Hi! Sorry we missed your  │   │
│     │ call. I'm Mike's AI       │   │
│     │ assistant at Rodriguez    │   │
│     │ Plumbing. How can I help? │   │
│     │                  11:47 PM │   │
│     └───────────────────────────┘   │
│                                     │
│ ┌───────────────────────────┐       │
│ │ I have a water heater     │       │
│ │ emergency! It's leaking   │       │
│ │ everywhere                │       │
│ │ 11:48 PM ✓✓               │       │
│ └───────────────────────────┘       │
│                                     │
│     ┌───────────────────────────┐   │
│     │ I'm so sorry to hear     │   │
│     │ that! We offer 24/7      │   │
│     │ emergency service. I can │   │
│     │ have someone there first │   │
│     │ thing at 7am. Would that │   │
│     │ work?                    │   │
│     │                  11:48 PM │   │
│     └───────────────────────────┘   │
│                                     │
│ ┌───────────────────────────┐       │
│ │ Yes please!               │       │
│ │ 11:48 PM ✓✓               │       │
│ └───────────────────────────┘       │
│                                     │
│     ┌───────────────────────────┐   │
│     │ ✅ You're confirmed for   │   │
│     │ tomorrow at 7:00 AM.     │   │
│     │                          │   │
│     │ 📍 What's your address?  │   │
│     │                  11:49 PM │   │
│     └───────────────────────────┘   │
│                                     │
│ [Message…]              [Send]    │
└─────────────────────────────────────┘

**Animation Requirements:**
- Messages appear one by one with typing indicator
- 1.5 second delay between messages
- Typing indicator (three dots) before AI responses
- Checkmarks animate: gray → blue (delivered → read)
- Phone has realistic iOS styling
- Subtle shadow and tilt on the phone mockup

### Section 3: Mode Cards

Create 5 horizontal cards:

**Card 1: After Hours Mode**
- Icon: Moon + phone
- Headline: "After Hours"
- Description: "You close at 5pm. Your AI doesn't. Answer calls, take messages, qualify leads."
- Price: "$149/month"
- Best for: "Businesses with set hours"

**Card 2: After Hours + Booking**
- Icon: Moon + calendar
- Headline: "After Hours + Booking"
- Description: "Everything in After Hours, plus AI can send booking links and confirm appointments."
- Price: "$197/month"
- Best for: "Service businesses that book appointments"

**Card 3: Missed Call Recovery**
- Icon: Phone with arrow
- Headline: "Missed Call Recovery"
- Description: "Every missed call gets a text within 60 seconds. AI starts the conversation before they call your competitor."
- Price: "$149/month"
- Best for: "Busy owners who can't always answer"

**Card 4: Front Line Screening**
- Icon: Funnel
- Headline: "Front Line Screening"
- Description: "AI answers during business hours. Handles FAQs, qualifies leads, transfers hot opportunities to you live."
- Price: "$297/month"
- Best for: "Teams drowning in calls"

**Card 5: Full AI Employee (FEATURED)**
- Icon: Robot + star
- Headline: "Full AI Employee"
- Description: "All modes combined. Your complete AI-powered front office."
- Price: "15% off when bundled"
- Badge: "MOST COMPLETE"
- CTA: "Calculate Your Bundle"

### Section 4: Setup Fee Callout
- Design: Bordered box, amber accent
- Content: "One-time $1,497 setup includes: Business training, system integration, testing, 30-day optimization"
- Smaller: "Web Chat Only: $497 setup + $79/month"

### Section 5: Transcript Proof
- Headline: "Real results from real businesses"
- Show 3 transcript cards:
  1. "11pm emergency call → $2,400 job booked"
  2. "Missed call recovered → New client signed"
  3. "FAQ handled → Owner saved 20 min"
- Each card shows partial transcript with "Read full transcript" link

### Section 6: How It Works
4-step flow diagram:
1. "Customer calls or texts" (phone icon)
2. "AI responds instantly" (robot icon)
3. "Qualifies and books" (calendar icon)
4. "You get notified" (bell icon)

### Section 7: CTA Section
- Headline: "Ready to never miss a lead?"
- Two buttons: [See Pricing] [Book a Demo]
```

-----

## PROMPT 3: Homepage Enhancements (P1 Priority)

```
ENHANCE the homepage with pricing preview, AI demo, and platform diagram.

Do NOT replace the existing hero or testimonials. ADD these new sections:

## NEW SECTION: Quick Pricing Preview (after "How we help" section)

Add a horizontal scroll section showing 4 cards:

| Smart Site | Smart Lead | Smart Business | Smart Growth |
|------------|------------|----------------|--------------|
| $249 | $97/mo | $197/mo | $497/mo |
| Professional website | + Lead capture | + Booking & reviews | + AI voice agent |
| [Learn more] | [Learn more] | [Learn more] | [Learn more] |

**Design:**
- Cards scroll horizontally on mobile
- Amber border on hover
- Links go to /pricing with anchor to that tier

## NEW SECTION: AI In Action (after pricing preview)

Split screen layout:

**Left side (60%):**
- Animated phone mockup showing the missed call → AI text sequence
- Same animation as the /let-ai-handle-it page but smaller
- Loops continuously

**Right side (40%):**
- Headline: "Never miss another lead"
- Stats:
  - "62% of calls go unanswered"
  - "<60 second response time"
  - "24/7 availability"
- CTA: [See AI Employee →]

## NEW SECTION: Platform Flow Diagram

Create an animated SVG diagram:

┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│ Missed  │ →  │   AI    │ →  │  Leads  │ →  │ Booking │ →  │   You   │
│  Call   │    │  Texts  │    │ Qualify │    │Confirmed│    │Notified │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘

**Animation:**
- Icons pulse left to right in sequence
- Connection lines animate (dash pattern moving)
- 4-second loop
- Pause on hover

## NEW SECTION: Dashboard Preview

Show a dark-mode dashboard mockup:

┌─────────────────────────────────────────────────────────────┐
│  ≡  EverIntent Dashboard            🔔 3    👤 Mike        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │   147    │  │    23    │  │    12    │  │   <45s   │    │
│  │  Calls   │  │  Leads   │  │ Bookings │  │ Avg Resp │    │
│  │ This Week│  │ Captured │  │   Made   │  │   Time   │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                                                             │
│  RECENT CONVERSATIONS                                       │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ 📞 Emergency plumber call    11:47 PM    → Booked   │   │
│  │ 💬 Website inquiry           10:23 AM    → Qualified│   │
│  │ 📞 Pricing question           9:15 AM    → Answered │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘

**Design:**
- Realistic dashboard styling (Warmy.io inspired)
- Dark mode with amber accents
- Numbers animate up on scroll
- Subtle hover states on conversation rows
```

-----

## PROMPT 4: Smart Websites Hub Page (P1 Priority)

```
CREATE /smart-websites hub page (if it doesn't exist) or REPLACE if it does.

## Page Structure:

### Section 1: Hero
- Headline: "Smart Websites That Pay for Themselves"
- Subhead: "Professional sites built in 5 days. Upgrade-ready for AI when you are."
- Trust badges: "5-Day Delivery • You Own Everything • No Contracts"
- CTA: [See Pricing] [View Portfolio]

### Section 2: Tier Overview Cards

4 cards in a row (stack on mobile):

**Smart Site - $249**
- "Perfect for getting started"
- 5-page professional website
- Mobile responsive
- Basic SEO
- [Get Started]

**Smart Lead - $97/mo** (Most Popular badge)
- "Capture every lead"
- Everything in Smart Site, plus:
- Missed call text-back
- AI chat widget
- CRM & mobile app
- [Start Free Trial]

**Smart Business - $197/mo**
- "Streamline operations"
- Everything in Smart Lead, plus:
- Online booking
- Review automation
- Pipeline management
- [Start Free Trial]

**Smart Growth - $497/mo**
- "Full AI automation"
- Everything in Smart Business, plus:
- AI voice agent
- Advanced automations
- Quarterly strategy calls
- [Book a Demo]

### Section 3: What Every Site Includes

Icon grid (2x4 on desktop, 1x8 on mobile):
- ✓ Mobile-responsive design
- ✓ SSL certificate included
- ✓ Basic SEO setup
- ✓ Contact form
- ✓ Google Maps integration
- ✓ 5-day delivery
- ✓ You own everything
- ✓ No contracts ever

### Section 4: Upgrade Path Visualization

Show progression diagram:

┌─────────────┐      ┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│  Smart Site │  →   │ Smart Lead  │  →   │Smart Business│ →   │ Smart Growth│
│    $249     │      │   $97/mo    │      │   $197/mo   │      │   $497/mo   │
│             │      │             │      │             │      │             │
│ Get online  │      │ Capture     │      │ Automate    │      │ Scale with  │
│             │      │ leads       │      │ operations  │      │ AI          │
└─────────────┘      └─────────────┘      └─────────────┘      └─────────────┘

- Arrow animation connecting each tier
- "Upgrade anytime" badge

### Section 5: Industry Examples

Show 4 portfolio thumbnails with hover overlays:
- "Rodriguez Plumbing — T3 Smart Business"
- "Bright Path Dental — T4 Smart Growth"
- "Wilson & Associates — T2 Smart Lead"
- "Summit HVAC — T3 Smart Business"

CTA: [View Full Portfolio]

### Section 6: Final CTA
- "Not sure which tier? Let's talk."
- [Book a Free Call] → /contact
```

-----

## PROMPT 5: Verification & Polish (P2 Priority)

```
VERIFY and POLISH all pages for consistency.

## Verification Checklist:

### Pricing Accuracy
- [ ] /pricing shows T1: $249, T2: $97/mo, T3: $197/mo, T4: $497/mo
- [ ] /pricing shows AI modes: $149, $197, $149, $297 monthly + $1,497 setup
- [ ] /pricing shows Web Chat Only: $79/mo + $497 setup
- [ ] All CTAs link to correct checkout URLs

### Navigation Consistency
- [ ] Header nav: AI Employee, Smart Websites, Industries, Portfolio, Pricing, Contact
- [ ] Footer links match BRD sitemap
- [ ] Mobile nav works correctly

### Design Consistency
- [ ] All pages use same color palette (dark base, amber accent)
- [ ] Font: Space Grotesk for headlines, Inter for body
- [ ] Consistent button styles across all pages
- [ ] Hover states work on all interactive elements

### Demo Elements
- [ ] SMS demo animation plays correctly
- [ ] Phone mockup looks realistic
- [ ] Typing indicators animate
- [ ] Dashboard mockup shows realistic data

### Responsive
- [ ] All pages work on mobile (375px)
- [ ] Comparison tables scroll horizontally on mobile
- [ ] Cards stack correctly
- [ ] Touch targets are large enough (44px min)

### Performance
- [ ] No layout shift on page load
- [ ] Animations don't cause jank
- [ ] Images are optimized
- [ ] Fonts load without flash

## Polish Tasks:

1. Add subtle scroll animations to stat counters (count up on enter viewport)
2. Add hover lift effect to all cards (+4px translateY, shadow increase)
3. Ensure "Most Popular" badge has subtle pulse animation
4. Add smooth scroll to anchor links
5. Verify all external links open in new tab
6. Check that GHL chat widget loads correctly
7. Test form submissions work
```

-----

## Execution Order

|Order|Prompt                         |Est. Credits|Dependencies                   |
|-----|-------------------------------|------------|-------------------------------|
|1    |Prompt 1: Pricing Page         |150-200     |None                           |
|2    |Prompt 2: AI Employee Page     |200-250     |None                           |
|3    |Prompt 3: Homepage Enhancements|100-150     |Prompts 1-2 (reuses components)|
|4    |Prompt 4: Smart Websites Hub   |100-150     |Prompt 1 (reuses tier cards)   |
|5    |Prompt 5: Verification         |50-100      |All above                      |

**Total Estimated Credits:** 600-850

-----

## Critical Reminders for Lovable

1. **DO NOT change the color scheme** — Keep existing dark/amber palette
1. **DO NOT touch the Portfolio page** — It's already perfect
1. **Use existing components** where possible — Reuse buttons, cards, layout patterns
1. **Follow SSG patterns** — ClientOnly for interactive demos
1. **Test mobile first** — Most traffic is mobile

-----

## Success Criteria

After running all prompts:

- [ ] Pricing page matches BRD v35.0 exactly
- [ ] AI Employee page shows all 5 modes with correct pricing
- [ ] SMS demo animation works and looks realistic
- [ ] Dashboard mockups appear on homepage and relevant pages
- [ ] Comparison tables are clear and scannable
- [ ] All CTAs link to correct destinations
- [ ] Site passes Lighthouse mobile score >85
