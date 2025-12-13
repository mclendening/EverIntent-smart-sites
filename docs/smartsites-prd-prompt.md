# SmartSites PRD Builder Prompt

**Purpose:** Paste this into a new Claude/Lovable session to build EverIntent SmartSites marketing pages.

---

## PROJECT CONTEXT

You are building the marketing site for **EverIntent SmartSites** — a productized website and automation service for local businesses. The site sells 4 tiers of service to home service contractors, professional services, health/wellness businesses, and automotive shops.

**Live URL:** everintentsmartsites.com  
**Tech Stack:** Vite + React 18 + TypeScript, Tailwind CSS, shadcn/ui, react-router-dom v6, Vercel Pro, Supabase  
**Pre-rendering:** vite-plugin-prerender (static HTML at build time)  
**SEO:** react-helmet-async for meta tags

---

## BRAND VOICE & COPY RULES

1. **Plain language.** No jargon.
2. **Short sentences.** 15 words max.
3. **Benefit-first.** Lead with what they get.
4. **Specific proof.** "$249" not "affordable."
5. **No em dashes.** Use commas or periods.
6. **Active voice.** "We build" not "Websites are built."
7. **Second person.** "You" and "Your."

**Tone:** Confident but not arrogant. Direct but not cold. Expert but not condescending. Operators who built this for operators. Anti-vendor: We help, not sell.

---

## TIER DEFINITIONS (Reference for all pages)

| Tier | Name | Price | Who It's For |
|------|------|-------|--------------|
| T1 | Smart Site | $249 one-time | Just need a professional web presence |
| T2 | Smart Lead | $97/month | Ready to capture and convert more leads |
| T3 | Smart Business | $197/month | Need to streamline operations |
| T4 | Smart Growth | $497/month | Ready for full automation and growth |

**T1 Renewal:** $149/year after first year

---

## NAVIGATION STRUCTURE

```
[Logo] | Services ▼ | Industries ▼ | Pricing | Portfolio | About | [Get Started]
```

**Services Dropdown:**
1. Beautiful Websites (top/primary)
2. Get Found Online
3. Never Miss a Lead
4. Book More Jobs
5. Run From Your Phone
6. Build Your Reputation
7. Let AI Handle It
8. Domains

**Industries Mega Menu:**
- Home Services (31 verticals)
- Professional Services (15 verticals)
- Health & Wellness (15 verticals)
- Automotive Services (10 verticals)

---

## 7 CORE SERVICES (Build these pages)

Each service page follows this structure:

```
HERO SECTION
- H1: Benefit-focused headline
- Subhead: Problem → Solution in 1-2 sentences
- Primary CTA: [Get Started] → /pricing
- Secondary CTA: [See Pricing] → /pricing

PROBLEM SECTION
- "The Problem" or "Sound Familiar?"
- 3-4 pain points as short statements
- Empathetic, not salesy

SOLUTION SECTION
- "Here's How We Solve It"
- Feature blocks with icons
- Each feature: Icon + Title + 1-2 sentence benefit

WHAT'S INCLUDED
- Bulleted list of deliverables
- Tier badges showing which tiers include this

SOCIAL PROOF
- 1-2 testimonials relevant to this service
- Stats if available

CTA SECTION
- Benefit restatement
- [Get Started] + [Book a Call]
```

### Service 1: Beautiful Websites (/beautiful-websites)
**This is the PRIMARY service — hero entry point**

**H1:** "A Professional Website That Actually Gets You Customers"
**Subhead:** "Built in 5 days. Starting at $249. You own everything."

**Problem Points:**
- You know you need a website but the options are overwhelming
- DIY builders take forever and still look amateur
- Agencies quote $5,000+ and take months
- You're losing customers to competitors with better sites

**Solution Features:**
- **5-Page Professional Site** — Home, Services, About, Contact, plus one more
- **Mobile-First Design** — 70% of your customers search on their phone
- **Built in 5 Days** — Not 5 weeks. We move fast.
- **You Own Everything** — Your domain, your content, your site. No lock-in.
- **SEO-Ready** — Google can find you from day one

**What's Included (All Tiers):**
- Custom 5-page website
- Mobile-responsive design
- Contact form with email notifications
- Google Maps integration
- Basic SEO setup (meta tags, schema)
- SSL certificate
- 1 year hosting (T1) / Ongoing hosting (T2-T4)
- GA4 analytics dashboard

---

### Service 2: Get Found Online (/get-found-online)

**H1:** "Show Up When Customers Search For What You Do"
**Subhead:** "SEO that actually works. No magic, just the fundamentals done right."

**Problem Points:**
- Customers search Google but you're nowhere to be found
- You paid for SEO before and saw zero results
- Your competitors show up. You don't.
- You don't have time to figure out SEO yourself

**Solution Features:**
- **Google Business Optimization** — Your listing, verified and complete
- **Local Search Setup** — City + service keywords that matter
- **Technical SEO** — Fast loading, mobile-friendly, crawlable
- **Schema Markup** — Rich results that stand out
- **Monthly Reporting** — See what's working

**What's Included:**
- Google Business Profile setup/optimization
- Local keyword targeting
- On-page SEO for all pages
- XML sitemap submission
- Google Search Console setup
- Monthly performance email

**Tiers:** All tiers include basic SEO. T3-T4 include advanced optimization.

---

### Service 3: Never Miss a Lead (/never-miss-a-lead)

**H1:** "Every Customer Inquiry Answered. Even When You Can't."
**Subhead:** "Missed calls cost you money. We make sure you never miss another one."

**Problem Points:**
- You're on a job and can't answer the phone
- 85% of callers won't leave a voicemail
- By the time you call back, they've hired someone else
- You're losing $500+ per missed call

**Solution Features:**
- **Missed Call Text-Back** — Automatic text within 60 seconds
- **AI Chat Widget** — 24/7 website chat that qualifies leads
- **Lead Capture Forms** — Smart forms that get you the info you need
- **Instant Notifications** — SMS + email the moment a lead comes in
- **Lead Dashboard** — All your leads in one place

**What's Included:**
- Missed call text-back automation
- AI-powered chat widget
- Lead capture form builder
- Real-time SMS/email notifications
- Contact management (CRM)
- Mobile app access

**Tiers:** T2, T3, T4 (Not included in T1)

---

### Service 4: Book More Jobs (/book-more-jobs)

**H1:** "Stop Playing Phone Tag. Let Customers Book Online."
**Subhead:** "Online scheduling that fills your calendar without the back-and-forth."

**Problem Points:**
- Scheduling takes 5 calls and 3 texts per job
- No-shows kill your productivity
- You double-book or forget appointments
- Customers want to book at 10pm — you're asleep

**Solution Features:**
- **Online Booking** — Customers pick a time that works
- **Automated Reminders** — SMS/email reminders reduce no-shows by 80%
- **Calendar Sync** — Connects to Google Calendar, Outlook
- **Buffer Time** — Automatic travel time between jobs
- **Service Menu** — Customers see what you offer and how long it takes

**What's Included:**
- Online booking calendar
- Automated appointment reminders
- Calendar sync (Google, Outlook, iCal)
- Service/duration configuration
- Customer self-rescheduling
- No-show protection

**Tiers:** T3, T4 (Not included in T1, T2)

---

### Service 5: Run From Your Phone (/run-from-your-phone)

**H1:** "Run Your Entire Business From Your Pocket"
**Subhead:** "Mobile app that keeps you connected to customers without being chained to a desk."

**Problem Points:**
- You're in the field 10 hours a day
- Leads come in and you can't respond
- Customer info is scattered across apps, texts, and sticky notes
- You miss opportunities because you're not at your computer

**Solution Features:**
- **Mobile App** — iOS and Android, always in your pocket
- **Unified Inbox** — Texts, emails, chats in one place
- **Quick Responses** — Reply to leads in seconds
- **Contact Access** — Full customer history on the go
- **Push Notifications** — Know instantly when leads come in

**What's Included:**
- iOS and Android mobile app
- Unified inbox (SMS, email, chat, calls)
- Customer contact management
- Push notifications for new leads
- Quick-reply templates
- Call/text directly from app

**Tiers:** T2, T3, T4 (Not included in T1)

---

### Service 6: Build Your Reputation (/build-your-reputation)

**H1:** "More 5-Star Reviews. Less Chasing Customers For Them."
**Subhead:** "Automated review requests that build your reputation while you work."

**Problem Points:**
- Happy customers forget to leave reviews
- You feel awkward asking for reviews
- One bad review tanks your rating
- Competitors have 200 reviews. You have 12.

**Solution Features:**
- **Automated Review Requests** — SMS/email after every job
- **Review Monitoring** — See new reviews as they post
- **Response Templates** — Reply to reviews in seconds
- **Review Widget** — Show off reviews on your website
- **Reputation Dashboard** — Track your rating over time

**What's Included:**
- Automated review request sequences
- Multi-platform monitoring (Google, Facebook, Yelp)
- Review response templates
- Website review widget
- Reputation score tracking
- Negative review alerts

**Tiers:** T3 (basic), T4 (full dashboard)

---

### Service 7: Let AI Handle It (/let-ai-handle-it)

**H1:** "Your 24/7 Receptionist. For Less Than Minimum Wage."
**Subhead:** "AI that answers calls, qualifies leads, and books jobs while you sleep."

**Problem Points:**
- You can't afford a full-time receptionist
- After-hours calls go to voicemail (and nowhere else)
- You spend hours on calls that go nowhere
- Competitors answer instantly. You don't.

**Solution Features:**
- **AI Voice Agent** — Answers calls in your voice, 24/7
- **Lead Qualification** — AI asks the right questions
- **Appointment Booking** — Books directly to your calendar
- **Call Summaries** — Know what happened without listening
- **Smart Routing** — Urgent calls go to your cell

**What's Included:**
- AI voice agent (inbound calls)
- Custom voice and script
- Lead qualification logic
- Calendar booking integration
- Call recording and transcription
- Intelligent call routing
- 100 AI minutes/month included

**Tiers:** T4 only

---

## ADDITIONAL PAGES TO BUILD

### /services (Hub Page)
Overview of all 7 services with cards linking to individual pages. Show which tiers include each service.

### /domains
Domain search utility page with:
- Search input + TLD dropdown
- Results showing available/taken
- "What's Included" section (domain registration, DNS, SSL)
- CTA to pricing

### /pricing
Tier comparison table with feature matrix. Four columns (T1-T4). Clear CTAs to checkout pages.

### /portfolio
Grid of completed sites. Pull from Supabase `portfolio` table. Filter by industry optional.

### /about
Company story. "Built by operators, for operators." Team/founder if applicable.

### /contact
Contact form + map + phone + email. Form submits to Supabase + GHL.

### /book-call
Embedded GHL calendar for 30-min consultation.

---

## INDUSTRY PAGES STRUCTURE

### Hub Pages (4 total)
- /industries/home-services
- /industries/professional-services
- /industries/health-wellness
- /industries/automotive-services

Each hub shows cards for all verticals in that category.

### Vertical Pages (65+ total)
URL pattern: `/industries/{category}/{vertical}`
Example: `/industries/home-services/hvac`

Each vertical page:
- H1: "Websites for {Vertical} Businesses"
- Industry-specific pain points
- How SmartSites solves them
- Testimonial from that industry (if available)
- CTA to pricing

---

## COMPONENT PATTERNS

**Hero Section:**
```jsx
<section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-6">{headline}</h1>
    <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">{subhead}</p>
    <div className="flex gap-4 justify-center">
      <Button size="lg">Get Started</Button>
      <Button size="lg" variant="outline">See Pricing</Button>
    </div>
  </div>
</section>
```

**Feature Card:**
```jsx
<div className="p-6 bg-white rounded-lg shadow-sm border">
  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
    <Icon className="w-6 h-6 text-primary" />
  </div>
  <h3 className="text-lg font-semibold mb-2">{title}</h3>
  <p className="text-slate-600">{description}</p>
</div>
```

**Tier Badge:**
```jsx
<span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
  T2+
</span>
```

---

## SEO REQUIREMENTS

Every page needs:
- Unique `<title>` tag (60 chars max)
- Meta description (155 chars max)
- Open Graph tags (og:title, og:description, og:image)
- Canonical URL
- JSON-LD schema (LocalBusiness for main pages, Service for service pages)

Use the `<SEO>` component with react-helmet-async.

---

## FILE STRUCTURE

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── ui/ (shadcn components)
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ProblemSection.tsx
│   │   ├── SolutionSection.tsx
│   │   ├── TestimonialSection.tsx
│   │   └── CTASection.tsx
│   └── SEO.tsx
├── pages/
│   ├── Home.tsx
│   ├── Pricing.tsx
│   ├── services/
│   │   ├── BeautifulWebsites.tsx
│   │   ├── GetFoundOnline.tsx
│   │   ├── NeverMissALead.tsx
│   │   ├── BookMoreJobs.tsx
│   │   ├── RunFromYourPhone.tsx
│   │   ├── BuildYourReputation.tsx
│   │   └── LetAiHandleIt.tsx
│   ├── industries/
│   │   ├── HomeServices.tsx
│   │   ├── ProfessionalServices.tsx
│   │   └── [vertical].tsx
│   └── ...
├── config/
│   └── routes.ts
└── lib/
    └── supabase.ts
```

---

## BUILD ORDER

1. Layout (Header, Footer, navigation)
2. Home page
3. /beautiful-websites (primary service)
4. /pricing
5. Remaining 6 service pages
6. /services hub
7. /domains
8. /portfolio
9. /about
10. /contact
11. /book-call
12. Industry hub pages (4)
13. Industry vertical pages (start with top 10)
14. Checkout pre-forms (4)
15. Admin pages

---

## INSTRUCTIONS FOR BUILDER

1. **Start with the Layout** — Header with navigation, Footer with links
2. **Build mobile-first** — All pages must work on mobile
3. **Use shadcn/ui** — Don't reinvent components
4. **Keep copy SHORT** — Follow the copy rules strictly
5. **Pre-render all marketing pages** — Add to prerenderRoutes array
6. **Test SEO** — Check meta tags render correctly
7. **No placeholder content** — Use real copy from this document

When ready, say: "Ready to build. Which page should I start with?"

---

## REFERENCE: LOCALPROS 20 PORTFOLIO SITES

Use these as examples in portfolio and testimonials:

| Domain | Niche | Market |
|--------|-------|--------|
| desertcoolair.com | HVAC | Phoenix |
| dallasroofingteam.com | Roofing | Dallas |
| houstonplumbersco.com | Plumbing | Houston |
| sonoranlawncare.com | Landscaping | Phoenix |
| cleanhomesatlanta.com | Cleaning | Atlanta |
| austinpestpros.com | Pest Control | Austin |
| denverelectricco.com | Electrical | Denver |
| seattleroofers.com | Roofing | Seattle |
| tampabayac.com | HVAC | Tampa |
| phoenixpoolpros.com | Pool Service | Phoenix |
| miamimovingco.com | Moving | Miami |
| chicagopainters.com | Painting | Chicago |
| lasgaragedoors.com | Garage Doors | Los Angeles |
| sanantoniofencing.com | Fencing | San Antonio |
| orlandomaids.com | Cleaning | Orlando |
| nashvilletreeservice.com | Tree Service | Nashville |
| minneapolishandyman.com | Handyman | Minneapolis |
| portlandlocksmith.com | Locksmith | Portland |
| vegasappliancerepair.com | Appliance | Las Vegas |
| charlottecarpetclean.com | Carpet | Charlotte |

---

**END OF PRD PROMPT**

Paste this entire document into a new session. The builder will have everything needed to construct the SmartSites marketing pages.
