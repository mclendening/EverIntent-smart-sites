# EverIntent Business Requirements Document v35.0

**Document Version:** 35.0  
**Status:** PROPOSED  
**Last Updated:** 2025-12-26  
**Purpose:** Canonical reference for AI Employee MVP monetization and platform architecture

---

## Section 1: Core Business Truth

EverIntent sells **Managed AI Employee services** to small business owners who cannot afford dedicated staff but need 24/7 responsiveness.

**Revenue model:**
- One-time setup fee (covers configuration, training, integration)
- Monthly subscription (covers ongoing AI operation, maintenance, optimization)

**The product is not software licenses.** It is done-for-you AI receptionist services with measurable outcomes.

---

## Section 2: Anchor Statement

> **The EverIntent AI Employee is a single execution engine — one Voice AI Agent per DID, one global Conversation AI, and per-DID Control Workflows — that produces three canonical proof artifacts (call, SMS, and chat transcripts) across five inbound channels, with behavior determined by rule-based modes rather than separate infrastructure builds.**

This statement governs all architectural decisions. There is **one engine, many behaviors** — not multiple systems.

---

## Section 3: Product Methodology — Transcript-Validated Conversion (TVC)

The AI Employee proves its value through **real interaction transcripts**, not feature lists or demos.

### 3.1 Why Transcripts Win

| Traditional Approach | TVC Approach |
|---------------------|--------------|
| "Our AI can answer calls" | "Here's the transcript where AI recovered a $2,400 job at 11pm" |
| Feature specifications | Proof of value delivered |
| Trust required upfront | Evidence provided first |

### 3.2 Canonical Transcripts

Three transcript types anchor all marketing, demos, and proof:

| ID | Transcript Type | Trigger | AI Behavior | Proof Value |
|----|-----------------|---------|-------------|-------------|
| T1 | **Missed Call Recovery** | Call missed OR AI hangup <15s | SMS sent → Conversation AI engages | "We recovered this lead you would have lost" |
| T2 | **After-Hours Answering** | Call outside business hours | Voice AI answers, qualifies, books | "We handled this while you slept" |
| T3 | **Front-Line Screening** | Call during business hours | Voice AI answers → optional transfer | "We screened this so you didn't waste time" |

**Web Chat** feeds into the same outcomes (O1-O5), producing chat transcripts as a fourth proof artifact but not a separate canonical transcript type.

---

## Section 4: Buyer Personas

### 4.1 Assisted Buyer (Demo-Led)
- Wants to see it work before committing
- Needs human reassurance
- Path: View transcripts → Book demo → Sales call → Purchase

### 4.2 Self-Service Buyer (No-Talk)
- Ready to buy, doesn't want sales friction
- Path: View transcripts → Select mode → Checkout → Automated onboarding

**MVP must support both paths.** Self-service capability is non-negotiable.

---

## Section 5: AI Employee Product Definition

### 5.1 Single Execution Engine

The AI Employee is **NOT** multiple bots, templates, or systems. It is:

| Component | Count | Notes |
|-----------|-------|-------|
| Voice AI Agent | 1 per DID | Uses same base template |
| Conversation AI Agent | 1 global | Handles SMS + Web Chat |
| Control Workflow | 1 per DID | Routes based on mode rules |

### 5.2 Modes Are Rule Profiles (Not Builds)

Each mode is a **configuration of the same engine**, not separate infrastructure:

| Mode ID | Mode Name | Active Rules | Monthly Price |
|---------|-----------|--------------|---------------|
| M1 | After Hours | Voice AI answers outside hours | $149 |
| M2 | After Hours + Booking | M1 + booking link allowed | $197 |
| M3 | Missed Call Recovery | SMS sent on missed/hangup | $149 |
| M4 | Front Line Screening | Voice AI answers during hours, optional transfer | $297 |
| M5 | Full AI Employee | M1 + M2 + M3 + M4 | Bundled pricing |

**All modes share:**
- $1,497 flat setup fee (MVP)
- Same underlying Voice AI + Conversation AI infrastructure
- Same transcript generation capability

### 5.3 Web Chat (Standalone)

| Item | Value |
|------|-------|
| Setup Fee | $497 |
| Monthly | $79 |
| Use Case | Website-only engagement, no phone |

### 5.4 Multi-Mode Discount

**15% monthly discount** when purchasing 2+ modes together.

---

## Section 6: Platform Object Model (GHL)

### 6.1 AI Objects

| Object | Count | Notes |
|--------|-------|-------|
| Voice AI Agent | 1 per DID | Cloned from master template |
| Conversation AI Agent | 1 global | Handles all SMS + chat |

### 6.2 Automation Objects

| Object | Count | Notes |
|--------|-------|-------|
| Control Workflow | 1 per DID | SMS sender = DID |
| Web Chat Router | 1 global | Assigns ownership |
| Lead Forwarding | 1 global | Sends leads off-platform |
| Dedupe Workflow | 1 global | Noise control |

### 6.3 Data Objects

| Object | Required |
|--------|----------|
| Custom Fields | ~5 (mode, setup status, DID, etc.) |
| Tags | ~10 (see Tag Schema below) |

### 6.4 GHL Tag Schema

```
EI: AI - Missed Call Recovery
EI: AI - After Hours
EI: AI - After Hours + Booking
EI: AI - Front Line Screening
EI: AI - Full Employee
EI: Web Chat Only
EI: Smart Website - Starter
EI: Smart Website - Professional
EI: Smart Website - Premium
EI: Setup Complete
EI: Setup Pending
```

---

## Section 7: MVP Canonical Scope

### 7.1 MVP Inputs (Channels)

| ID | Channel | Required | Notes |
|----|---------|----------|-------|
| C1 | Phone – Human DID | ✅ | Client's existing number |
| C2 | Phone – AI DID | ✅ | Dedicated AI line |
| C3 | SMS | ✅ | Two-way via DID |
| C4 | Web Chat Widget | ✅ | Embedded on client site |
| C5 | Email (notifications) | ✅ | Owner alerts only |

### 7.2 MVP Outputs (Outcomes)

| ID | Outcome | Required | Proof |
|----|---------|----------|-------|
| O1 | Missed call → SMS recovery | ✅ | SMS transcript |
| O2 | After-hours call answered | ✅ | Call transcript |
| O3 | Booking link delivered | ✅ | Booking confirmation |
| O4 | Human transfer with context | ✅ | Transfer log |
| O5 | Owner notified | ✅ | Notification log |

### 7.3 MVP Proof Artifacts

| Artifact | Source | Required |
|----------|--------|----------|
| Call transcript | Voice AI | ✅ |
| SMS transcript | Conversation AI | ✅ |
| Chat transcript | Web Chat | ✅ |

**MVP is complete when all channels produce all applicable outcomes with captured transcripts.**

---

## Section 8: Smart Websites

Smart Websites are **loss-leader entry points** that introduce clients to EverIntent's ecosystem.

### 8.1 MVP Pricing

| Tier | One-Time Price | Includes |
|------|----------------|----------|
| Starter | $249 | 5-page site, mobile-optimized, basic SEO |

### 8.2 Deferred Tiers (Post-MVP)

| Tier | Price | Additional Features |
|------|-------|---------------------|
| Professional | $749 | 10 pages, CRO, advanced SEO |
| Premium | $1,497 | 20 pages, custom features, priority support |

### 8.3 Relationship to AI Employee

- Smart Websites are **standalone products**
- AI Employee modes are **add-ons** to any website tier
- Future: Bundled packages combining website + AI modes

---

## Section 9: Delivery Scope

### 9.1 Setup Fee Includes

| Item | Included |
|------|----------|
| Initial Voice AI configuration | ✅ |
| Conversation AI training | ✅ |
| Control Workflow setup | ✅ |
| DID provisioning | ✅ |
| Web Chat widget installation | ✅ |
| Calendar integration | ✅ |
| First 30 days optimization | ✅ |

### 9.2 Monthly Subscription Includes

| Item | Included |
|------|----------|
| AI operation (24/7) | ✅ |
| Transcript storage | ✅ |
| Performance monitoring | ✅ |
| Minor prompt adjustments | ✅ |
| Owner dashboard access | ✅ |

### 9.3 Excluded (Additional Cost)

| Item | Notes |
|------|-------|
| Additional DIDs | $25/mo each |
| Major retraining | Quoted per scope |
| Custom integrations | Quoted per scope |
| Multi-location setup | Per-location fees apply |

---

## Section 10: Website Structure (MVP Pages)

### 10.1 Required Pages

| Route | Page | Purpose |
|-------|------|---------|
| `/` | Homepage | Hero with Missed Call Recovery transcript, trust bar, CTA |
| `/let-ai-handle-it` | AI Employee | Full AI Employee product page with all modes |
| `/smart-websites` | Smart Websites | Website service offering |
| `/pricing` | Pricing | Decision-oriented pricing with checkout CTAs |
| `/about` | About | Company story, trust signals |
| `/contact` | Contact | Form + chat widget |

### 10.2 Existing Pages (Keep)

| Route | Page |
|-------|------|
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/cookies` | Cookie Policy |
| `/data-rights-request` | Data Rights Request |

### 10.3 Total MVP Routes: 10

All other existing routes remain defined but hidden from navigation, rendering `PlaceholderPage` or redirecting to `/`.

---

## Section 11: Pricing Page Behavior

### 11.1 Structure

Each purchasable item shows:
1. **Setup fee** (one-time)
2. **Monthly price** (recurring)
3. **What's included** (bullet list)
4. **CTA button** → External checkout

### 11.2 CTA Destinations

| Product | CTA Text | Destination |
|---------|----------|-------------|
| AI Employee Mode | "Get Started" | `go.everintent.com/checkout/[mode-slug]` |
| Smart Website | "Get Started" | `go.everintent.com/checkout/smart-website` |
| Web Chat Only | "Get Started" | `go.everintent.com/checkout/web-chat` |

### 11.3 Multi-Mode Selection (Future)

Post-MVP: Allow selecting multiple modes with automatic 15% discount calculation.

---

## Section 12: Checkout Flow

```
┌─────────────────────────────────────────────────────────────────┐
│  MARKETING SITE          GHL CHECKOUT           GHL PORTAL      │
│  everintent.com    →    go.everintent.com  →  app.everintent.com│
│                                                                  │
│  Browse/Learn            Pay (Stripe)          Onboarding       │
│  Select Product          Complete Form         Intake Forms     │
│  Click CTA               Confirm               Dashboard        │
└─────────────────────────────────────────────────────────────────┘
```

### 12.1 Post-Payment Automation (GHL)

1. **Tag Applied:** `EI: [Product Purchased]`
2. **Confirmation Email:** Sent automatically
3. **Intake Form:** Triggered based on product tag
4. **Internal Task:** Created for provisioning team
5. **Portal Access:** Granted to `app.everintent.com`

---

## Section 13: Domain Architecture

| Domain | Purpose | Platform |
|--------|---------|----------|
| `everintent.com` | Marketing website | Vercel (React) |
| `go.everintent.com` | Checkout funnels | GHL |
| `app.everintent.com` | Customer portal | GHL |

---

## Section 14: Marketing & GTM

### 14.1 Hero Message (Homepage)

> "While you were sleeping, your AI Employee recovered a $2,400 job."

Immediately followed by the **Missed Call Recovery transcript** as proof.

### 14.2 Conversion Paths

| Visitor Intent | Path |
|----------------|------|
| "Show me proof" | View transcript → Browse modes |
| "Let me try" | Demo request → Sales follow-up |
| "I want to buy" | Pricing → Checkout |
| "I have questions" | Chat widget → Conversation AI |

### 14.3 Trust Signals

- Transcript embeds (real examples)
- Industry-specific social proof
- "Setup in 48 hours" promise
- Money-back guarantee (if offered)

---

## Section 15: Success Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Setup fee collection rate | >80% of starts complete payment | Stripe data |
| Time to first transcript | <48 hours from setup complete | GHL timestamp |
| Self-service purchase rate | >30% of sales | No sales call tag |
| Transcript demo engagement | >60% scroll depth on homepage | Analytics |
| Mode upgrade rate | >20% within 90 days | GHL pipeline |

---

## Section 16: Deferred Scope (Post-MVP)

### 16.1 Deferred Features

| Feature | Reason |
|---------|--------|
| Variable setup fees by complexity | Simplify MVP pricing |
| Foundation services (SEO, Reputation, GBP) | Focus on AI Employee first |
| Smart Website Professional/Premium tiers | Starter proves model |
| Multi-location pricing | Single location MVP |
| Custom integrations marketplace | Post-revenue feature |

### 16.2 Deferred Pages

| Category | Routes |
|----------|--------|
| Industries | `/industries/*` |
| Features | `/features/*` |
| Resources | `/blog`, `/case-studies`, `/faqs` |
| Careers | `/careers`, `/careers/*` |
| Portfolio | `/our-work`, `/our-work/*` |
| Services SEO | `/services/*` |

---

## Section 17: Navigation & Route Architecture

### 17.1 Header Navigation (MVP)

| Position | Label | Route | Type |
|----------|-------|-------|------|
| 1 | AI Employee | `/let-ai-handle-it` | Link |
| 2 | Smart Websites | `/smart-websites` | Link |
| 3 | Pricing | `/pricing` | Link |
| 4 | About | `/about` | Link |
| 5 | Contact | `/contact` | Link |
| CTA | Get Started | `/pricing` | Button |

**Removed from MVP:**
- All dropdown menus
- Industries section
- Solutions section
- Our Work
- Careers
- Resources

### 17.2 Footer Navigation (MVP)

**Column 1: Products**
| Label | Route |
|-------|-------|
| AI Employee | `/let-ai-handle-it` |
| Smart Websites | `/smart-websites` |
| Pricing | `/pricing` |

**Column 2: Company**
| Label | Route |
|-------|-------|
| About | `/about` |
| Contact | `/contact` |

**Column 3: Legal**
| Label | Route |
|-------|-------|
| Privacy Policy | `/privacy` |
| Terms of Service | `/terms` |
| Cookie Policy | `/cookies` |

**External Links (Footer)**
| Label | URL |
|-------|-----|
| Client Login | `https://app.everintent.com` |

### 17.3 Route Implementation

**Active MVP Routes (10):**
```typescript
export const mvpRoutes = [
  '/',
  '/let-ai-handle-it',
  '/smart-websites', 
  '/pricing',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/cookies',
  '/data-rights-request'
];
```

**Deferred Routes:** All other routes remain in `routes.tsx` but:
- Hidden from navigation
- Render `PlaceholderPage` with "Coming Soon" message
- OR redirect to `/`

### 17.4 Mobile Navigation

- Hamburger menu with same 5 links + CTA
- No nested menus
- Full-screen overlay

---

## Section 18: Task 3.5 Definition

### Task 3.5 — AI Employee MVP Monetization & Checkout Readiness

**Status:** TODO  
**Priority:** BLOCKER  
**Depends On:** Task 3.0 (Theme System)

### Definition of Done

#### Phase 1: Platform Foundation
- [ ] Custom fields created in GHL
- [ ] Tags created per schema
- [ ] Recording + transcription enabled
- [ ] Conversation AI agent created

#### Phase 2: AI Employee Engine
- [ ] Voice AI agent template created
- [ ] Per-DID Control Workflow template created
- [ ] Transcript Generated trigger validated
- [ ] SMS sender per workflow validated

#### Phase 3: Channel Paths
- [ ] Missed Call Recovery path configured
- [ ] After Hours path configured
- [ ] Front Line Screening path configured
- [ ] Web Chat routing configured

#### Phase 4: Delivery & Ops
- [ ] Lead forwarding workflow created
- [ ] Dedupe workflow created
- [ ] UAT scenarios defined
- [ ] Demo transcripts captured

#### Phase 5: Website & GTM
- [ ] Homepage locked to Missed Call Recovery hero
- [ ] Transcript demo embeds added
- [ ] Pricing page with checkout links
- [ ] Navigation simplified to MVP structure

### Acceptance Criteria

1. All three canonical transcripts can be generated on demand
2. Self-service checkout flow completes end-to-end
3. GHL automation applies correct tags and triggers onboarding
4. Homepage displays real transcript proof
5. Pricing page enables purchase without sales call

---

## Section 19: Implementation Notes

### 19.1 Code Changes Required

**Header.tsx:**
- Remove all `NavigationMenu` dropdown components
- Replace with 5 static `NavLink` components
- Keep mobile hamburger with simplified menu
- Rename "AI & Automation" to "AI Employee"

**Footer.tsx:**
- Reduce from 4 columns to 3
- Remove Packages column
- Remove Resources column
- Add external "Client Login" link

**routes.tsx:**
- Update `prerenderRoutes` to MVP-only list
- Add redirect logic for deferred routes

**routes.ts (config):**
- Export `mvpRoutes` array for navigation filtering

### 19.2 External Dependencies

| Dependency | Owner | Status |
|------------|-------|--------|
| GHL checkout funnels | EverIntent | TODO |
| Stripe integration | EverIntent | TODO |
| go.everintent.com subdomain | EverIntent | TODO |
| app.everintent.com subdomain | EverIntent | TODO |

---

## Appendix A: Glossary

| Term | Definition |
|------|------------|
| AI Employee | Single execution engine providing phone/SMS/chat AI services |
| Mode | Rule-based behavior configuration of the AI Employee |
| DID | Direct Inward Dial — a phone number |
| TVC | Transcript-Validated Conversion methodology |
| GHL | GoHighLevel platform |
| Control Workflow | Per-DID automation that routes based on mode rules |

---

## Appendix B: Version History

| Version | Date | Changes |
|---------|------|---------|
| 35.0 | 2025-12-26 | Complete rewrite incorporating platform object model, canonical scope tables, single engine architecture |
| 34.0 | — | Previous iteration (superseded) |
| 33.0 | — | Theme system focus (reference: smartsites-brd-v33.0.md) |

---

## Appendix C: Related Documents

- `docs/TASK-TRACKER.md` — Implementation task sequencing
- `docs/persona-spec.md` — Buyer persona details
- `docs/AI-Employee-Product-Spec.md` — Technical AI specifications
- `docs/ghl-chat-widget-implementation.md` — Widget integration guide

---

**END OF DOCUMENT**
