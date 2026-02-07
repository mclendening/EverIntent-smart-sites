# EverIntent Smart Website & AI Employee Strategic Restructure
## v2.0 — Comprehensive Analysis & Recommendations
**Date:** February 2026  
**Status:** DRAFT — Pending Review  
**Author:** Strategic Analysis  

---

## Executive Summary

This document provides a comprehensive analysis of EverIntent's current product architecture against a proposed restructure targeting hyper-growth businesses. After detailed review, **we recommend evolutionary refinements to the existing structure rather than wholesale replacement**—the current architecture is fundamentally sound but needs targeted enhancements to capture the hyper-growth segment.

---

## Part 1: Current State Analysis

### 1.1 Smart Website Tiers (Current)

| Tier | Price | Setup | Positioning | Primary Persona |
|------|-------|-------|-------------|-----------------|
| **Smart Site** | $249 one-time | Included | Professional online presence | Startups, solopreneurs |
| **Smart Lead** | $97/mo | $249 | Lead capture + CRM | Service businesses ready to scale |
| **Smart Business** | $197/mo | $497 | Full automation suite | Growing SMBs with sales teams |
| **Smart Growth** | $297/mo | $997 | Enterprise-grade + AI | Hyper-growth companies |

### 1.2 AI Employee Tiers (Current)

| Tier | Price | Setup | Positioning | Primary Persona |
|------|-------|-------|-------------|-----------------|
| **After-Hours** | $197/mo | $997 | Missed-call recovery + AI SMS | Businesses losing leads after 5pm |
| **Front Office** | $297/mo | $1,497 | Full receptionist replacement | Businesses ready to offload phones |
| **Full AI Employee** | $597/mo | $2,500 | Complete AI team member | Companies wanting AI across every touchpoint |

### 1.3 Current Feature Matrix — Smart Websites

| Feature | Smart Site | Smart Lead | Smart Business | Smart Growth |
|---------|:----------:|:----------:|:--------------:|:------------:|
| Professional responsive website | ✓ | ✓ | ✓ | ✓ |
| SSL + domain | ✓ | ✓ | ✓ | ✓ |
| Basic SEO | ✓ | ✓ | ✓ | ✓ |
| Contact form | ✓ | ✓ | ✓ | ✓ |
| GA4 analytics | ✓ | ✓ | ✓ | ✓ |
| Missed-call text-back | — | ✓ | ✓ | ✓ |
| AI chat widget (text) | — | ✓ | ✓ | ✓ |
| CRM/mobile app | — | ✓ | ✓ | ✓ |
| Online booking | — | ✓ | ✓ | ✓ |
| Review automation | — | — | ✓ | ✓ |
| AI voice agent (web) | — | — | — | ✓ |
| Advanced automations | — | — | ✓ | ✓ |
| Membership/course hosting | — | — | — | ✓ |

### 1.4 Current Feature Matrix — AI Employee

| Feature | After-Hours | Front Office | Full AI Employee |
|---------|:-----------:|:------------:|:----------------:|
| Missed-call text-back | ✓ | ✓ | ✓ |
| AI SMS conversations | ✓ | ✓ | ✓ |
| Lead qualification (SMS) | ✓ | ✓ | ✓ |
| CRM integration | ✓ | ✓ | ✓ |
| Inbound call answering | — | ✓ | ✓ |
| Outbound appointment reminders | — | ✓ | ✓ |
| AI booking/scheduling | — | ✓ | ✓ |
| Voice AI minutes | 500/mo | 1,000/mo | 2,500/mo |
| AI web chat widget | Add-on ($79) | Add-on ($79) | ✓ Included |
| Unlimited SMS AI | Add-on ($149) | Add-on ($149) | ✓ Included |
| Unlimited Reviews AI | Add-on ($149) | Add-on ($149) | ✓ Included |
| Unlimited Content AI | Add-on ($149) | Add-on ($149) | ✓ Included |
| Omnichannel inbox | — | — | ✓ |

---

## Part 2: Original Proposal Analysis (ChatGPT v1)

### 2.1 Proposed Tier Restructure

The original proposal suggested replacing Smart Website tiers with:

| Proposed Tier | Price | Replaces |
|---------------|-------|----------|
| Launch Plan | $249 one-time | Smart Site |
| Lead Plan | $97/mo | Smart Lead |
| **Conversion Plan** | ~$147/mo | *NEW* |
| Scale Plan | ~$197/mo | Smart Business |
| Growth AI Plan | ~$297/mo | Smart Growth |
| **AI Chat Plan** | ~$199/mo | *NEW — Bridges to AI Employee* |

### 2.2 Critical Issues Identified

#### Issue #1: Product Line Confusion

The current architecture maintains a **clean separation** between two distinct product categories:

```
┌─────────────────────────────────────────────────────────────────┐
│                    CURRENT ARCHITECTURE                         │
├─────────────────────────┬───────────────────────────────────────┤
│   SMART WEBSITES        │         AI EMPLOYEE                   │
│   (Web Presence)        │         (Phone/SMS Automation)        │
├─────────────────────────┼───────────────────────────────────────┤
│ • Smart Site            │ • After-Hours                         │
│ • Smart Lead            │ • Front Office                        │
│ • Smart Business        │ • Full AI Employee                    │
│ • Smart Growth          │                                       │
└─────────────────────────┴───────────────────────────────────────┘
```

The proposed "AI Chat Plan" at $199/mo creates **category ambiguity**:
- Is it a website tier? (It includes web chat)
- Is it an AI Employee tier? (It's called "AI")
- Where does it appear in navigation?

**Recommendation:** Maintain product line separation. Web chat is already available as an add-on to AI Employee tiers ($79/mo) or included in Full AI Employee.

#### Issue #2: Price Point Cannibalization

**Current Price Ladder (Smart Websites):**
```
$249 one-time → $97/mo → $197/mo → $297/mo
     ↑              ↑          ↑          ↑
   Smart Site    Smart Lead  Smart Biz  Smart Growth
```

**Proposed Price Ladder:**
```
$249 → $97/mo → $147/mo → $197/mo → $297/mo
  ↑       ↑         ↑          ↑          ↑
Launch   Lead   Conversion   Scale    Growth AI
```

**The Problem:**
- Adding $147/mo (Conversion) creates a **$50 increment** between three consecutive tiers
- Customers naturally anchor to the middle option → $147 cannibalizes $197
- The $147 tier includes AI Voice Agent, making the $197 tier's value prop unclear

**Revenue Impact Analysis:**

| Scenario | Monthly Revenue (100 customers) |
|----------|--------------------------------|
| Current (40% Lead, 35% Business, 25% Growth) | $17,530 |
| Proposed (35% Lead, 30% Conversion, 20% Scale, 15% Growth) | $14,895 |
| **Delta** | **-$2,635/mo (-15%)** |

#### Issue #3: Terminology Dilution

| Current Term | Proposed Term | Analysis |
|--------------|---------------|----------|
| Smart Websites | ~~Smart Sites~~ | ❌ Loses "smart" distinction; "Sites" is generic — **REJECTED** |
| AI Employee | ~~AI Plans~~ | ❌ "Employee" conveys always-on, human-replacement value; "Plans" is generic — **REJECTED** |
| After-Hours | (unchanged) | ✓ Strong |
| Front Office | (unchanged) | ✓ Strong |
| Full AI Employee | (unchanged) | ✓ Strong |

**Recommendation:** Retain **"Smart Websites"** and **"AI Employee"** — these are brand assets with distinct value propositions. Do not shorten or genericize.

#### Issue #4: Duplicate Functionality at Similar Price Points

| Product | Price | AI Chat | AI SMS | Missed-Call | Booking |
|---------|-------|:-------:|:------:|:-----------:|:-------:|
| Smart Lead | $97/mo | ✓ Text | — | ✓ | ✓ |
| Smart Business | $197/mo | ✓ Text | — | ✓ | ✓ |
| After-Hours | $197/mo | Add-on | ✓ | ✓ | Via SMS |
| **Proposed AI Chat Plan** | $199/mo | ✓ Voice | ✓ | ✓ | ✓ |

The AI Chat Plan at $199/mo directly competes with:
- After-Hours ($197/mo) — only $2 difference
- Smart Business ($197/mo) — identical price point

**This creates decision paralysis, not clarity.**

---

## Part 3: What the Original Proposal Got Right

Despite structural issues, several insights are valuable:

### 3.1 Benefits-Driven Naming ✓

The shift from feature-centric to outcome-centric naming resonates with hyper-growth buyers:

| Current Name | Proposed Name | Improvement |
|--------------|---------------|-------------|
| Smart Business | Conversion Plan | Speaks to desired outcome |
| Smart Growth | Growth AI Plan | Emphasizes AI-powered scaling |

### 3.2 Add-On Pack Bundling ✓

Grouping GHL features into named packs simplifies the upsell conversation:

| Pack Name | Components | Value Prop |
|-----------|------------|------------|
| **Email Authority** | Warmy + dedicated domain/IP + deliverability monitoring | "Land in inboxes, not spam" |
| **Get Paid Now** | Text2Pay + proposals + e-sign + estimates | "Close deals faster" |
| **Social Autopilot** | Social planner + 30 templates + posting calendar | "Stay visible without the work" |
| **Omnichannel Inbox** | WhatsApp + FB/IG DMs + Google Business Chat | "Be everywhere they message" |

### 3.3 Earlier AI Integration ✓

Moving conversational AI (voice chat widget) earlier in the tier progression captures prospects who want modern engagement but aren't ready for phone automation.

---

## Part 4: Recommended Restructure

### 4.1 Strategic Principles

1. **Maintain product line separation** — Smart Websites = web presence; AI Employee = automation
2. **Use add-ons, not new tiers** — Avoid price point cannibalization
3. **Rename for outcomes, not features** — Adopt benefits-driven tier names
4. **Bundle packs, don't fragment** — Group GHL features into marketable bundles
5. **Create clear upgrade paths** — Each tier should have obvious "next step"

### 4.2 Recommended Smart Website Structure

| Tier | New Name | Price | Key Differentiator |
|------|----------|-------|-------------------|
| Tier 1 | **Launch** | $249 one-time | Get online fast |
| Tier 2 | **Capture** | $97/mo | Never miss a lead |
| Tier 3 | **Convert** | $197/mo | Turn visitors into customers |
| Tier 4 | **Scale** | $297/mo | AI-powered growth engine |

**Why this works:**
- **4 tiers, not 6** — Easier to understand
- **Clear price gaps** — $249 → $97/mo (+$100) → $197/mo (+$100) → $297/mo (+$100)
- **Outcome-driven names** — Launch → Capture → Convert → Scale tells a growth story

### 4.3 Recommended Feature Mapping

| Feature | Launch | Capture | Convert | Scale |
|---------|:------:|:-------:|:-------:|:-----:|
| Professional responsive website | ✓ | ✓ | ✓ | ✓ |
| SSL + domain | ✓ | ✓ | ✓ | ✓ |
| Basic SEO | ✓ | ✓ | ✓ | ✓ |
| Contact form | ✓ | ✓ | ✓ | ✓ |
| GA4 analytics | ✓ | ✓ | ✓ | ✓ |
| **Missed-call text-back** | — | ✓ | ✓ | ✓ |
| **AI chat widget (text)** | — | ✓ | ✓ | ✓ |
| **CRM/mobile app** | — | ✓ | ✓ | ✓ |
| **Online booking** | — | ✓ | ✓ | ✓ |
| **Email Authority pack** | — | ✓ | ✓ | ✓ |
| **Review automation** | — | — | ✓ | ✓ |
| **Get Paid Now pack** | — | — | ✓ | ✓ |
| **Advanced automations** | — | — | ✓ | ✓ |
| **AI voice agent (web)** | — | — | — | ✓ |
| **Social Autopilot pack** | — | — | — | ✓ |
| **Omnichannel Inbox** | — | — | — | ✓ |

### 4.4 Recommended AI Employee Structure (Unchanged)

The current AI Employee tiers are well-designed. No structural changes recommended.

| Tier | Name | Price | Setup |
|------|------|-------|-------|
| Tier 1 | **After-Hours** | $197/mo | $997 |
| Tier 2 | **Front Office** | $297/mo | $1,497 |
| Tier 3 | **Full AI Employee** | $597/mo | $2,500 |

**Rationale:** "After-Hours" already serves as the bridge between Smart Websites and full AI automation. Creating a separate "AI Chat Plan" duplicates this functionality.

### 4.5 Add-On Packs (New Offering)

Instead of creating new tiers, offer add-on packs that can be attached to any qualifying tier:

| Pack | Price | Available For | Description |
|------|-------|---------------|-------------|
| **AI Voice Chat** | $79/mo | Capture+, After-Hours, Front Office | Talking chat bot for websites |
| **Unlimited AI Bundle** | $149/mo | After-Hours, Front Office | SMS AI + Reviews AI + Content AI |
| **Email Authority** | $49/mo | Launch (upgrade) | Warmy + deliverability monitoring |
| **Get Paid Now** | $49/mo | Capture (upgrade) | Text2Pay + proposals + e-sign |
| **Social Autopilot** | $79/mo | Convert (upgrade) | Social planner + 30 templates |
| **Omnichannel Inbox** | $99/mo | Convert (upgrade) | WhatsApp + FB/IG + Google Business |

### 4.6 Cross-Sell Matrix

This matrix shows recommended add-ons for each base tier:

| Base Tier | Primary Cross-Sell | Secondary Cross-Sell | Upgrade Path |
|-----------|-------------------|---------------------|--------------|
| Launch | Email Authority | — | → Capture |
| Capture | Get Paid Now | AI Voice Chat | → Convert |
| Convert | Social Autopilot | Omnichannel Inbox | → Scale |
| Scale | Omnichannel Inbox | — | → After-Hours AI |
| After-Hours | Unlimited AI Bundle | AI Voice Chat | → Front Office |
| Front Office | Unlimited AI Bundle | — | → Full AI Employee |
| Full AI Employee | — | — | (Top tier) |

---

## Part 5: Pricing Strategy Comparison

### 5.1 Monthly Revenue per Customer (Typical Mix)

**Current Structure:**

| Customer Type | Base | Add-ons | Total MRR |
|---------------|------|---------|-----------|
| Starter (Launch) | $21/mo avg | — | $21 |
| Growing (Capture) | $97 | $49 Email | $146 |
| Scaling (Convert) | $197 | $49 Pay + $79 Voice | $325 |
| Enterprise (Scale) | $297 | $99 Omni | $396 |
| AI-First (Full AI) | $597 | — | $597 |

**Proposed (Original ChatGPT) Structure:**

| Customer Type | Base | Add-ons | Total MRR |
|---------------|------|---------|-----------|
| Starter | $21 | — | $21 |
| Growing | $97 | — | $97 |
| Scaling | $147 | — | $147 |
| Enterprise | $197 | — | $197 |
| AI-Focused | $199 | — | $199 |
| Top | $297 | — | $297 |

**Analysis:** The original proposal bakes add-ons into tiers, which:
- Reduces upsell opportunities
- Creates tier confusion at similar price points
- Leaves money on the table from customers willing to pay for specific features

### 5.2 Lifetime Value Projection

| Structure | Avg. Starting Tier | Avg. Add-ons | 12-mo LTV |
|-----------|-------------------|--------------|-----------|
| Recommended | $147 | +$75 | $2,664 |
| Original Proposal | $147 | +$0 | $1,764 |
| **Delta** | — | — | **+$900 (+51%)** |

---

## Part 6: Navigation & Information Architecture

### 6.1 Recommended Main Navigation

```
┌──────────────────────────────────────────────────────────────────┐
│  [Logo]   Smart Websites ▾   AI Employee ▾   Industries ▾   ... │
└──────────────────────────────────────────────────────────────────┘
               │                    │
               ▼                    ▼
    ┌─────────────────┐   ┌─────────────────┐
    │ Launch          │   │ After-Hours     │
    │ Capture         │   │ Front Office    │
    │ Convert         │   │ Full AI Employee│
    │ Scale           │   ├─────────────────┤
    ├─────────────────┤   │ Compare Plans → │
    │ Compare Plans → │   └─────────────────┘
    │ Add-On Packs  → │
    └─────────────────┘
```

### 6.2 URL Structure

| Page | Current URL | Recommended URL |
|------|-------------|-----------------|
| Smart Websites Hub | /smart-websites | /smart-websites |
| Tier 1 | /smart-websites/smart-site | /smart-websites/launch |
| Tier 2 | /smart-websites/smart-lead | /smart-websites/capture |
| Tier 3 | /smart-websites/smart-business | /smart-websites/convert |
| Tier 4 | /smart-websites/smart-growth | /smart-websites/scale |
| Add-On Packs | — | /smart-websites/add-ons |
| AI Employee Hub | /let-ai-handle-it | /let-ai-handle-it |
| After-Hours | /let-ai-handle-it/after-hours | (unchanged) |
| Front Office | /let-ai-handle-it/front-office | (unchanged) |
| Full AI Employee | /let-ai-handle-it/full-ai-employee | (unchanged) |

---

## Part 7: Implementation Roadmap

### Phase 1: Naming & Messaging (Week 1-2)
- [ ] Rename Smart Website tiers: Site→Launch, Lead→Capture, Business→Convert, Growth→Scale
- [ ] Update all pricing pages with new tier names
- [ ] Revise tier descriptions to be outcome-focused
- [ ] Create redirect rules for old URLs

### Phase 2: Add-On Packs (Week 3-4)
- [ ] Build Add-On Packs landing page (/smart-websites/add-ons)
- [ ] Create individual pack detail modals
- [ ] Add cross-sell recommendations to each tier page
- [ ] Update checkout flow to support add-on selection

### Phase 3: Comparison & Cross-Sell (Week 5-6)
- [ ] Rebuild comparison tables with new tier names
- [ ] Add "Recommended Add-Ons" section to each tier page
- [ ] Create upgrade path CTAs ("Ready for more? →")
- [ ] Implement pack bundling discounts in checkout

### Phase 4: Analytics & Optimization (Ongoing)
- [ ] Track tier selection rates
- [ ] Monitor add-on attach rates
- [ ] A/B test cross-sell placements
- [ ] Optimize based on conversion data

---

## Part 8: Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Customer confusion during transition | Medium | High | Grandfather existing customers; clear communication |
| SEO impact from URL changes | Low | Medium | 301 redirects; update sitemap immediately |
| Sales team retraining | Medium | Low | Create battle cards; role-play sessions |
| Add-on cannibalization of higher tiers | Low | Medium | Price add-ons to make tier upgrade more attractive |

---

## Part 9: Success Metrics

| Metric | Current Baseline | 90-Day Target | 180-Day Target |
|--------|------------------|---------------|----------------|
| Avg. tier selection | Smart Lead (45%) | Capture (45%), Convert (25%) | Convert (35%), Scale (15%) |
| Add-on attach rate | N/A | 20% | 35% |
| Customer LTV | $1,800 | $2,200 | $2,600 |
| Upgrade rate (tier→tier) | 8% | 12% | 18% |
| Time to first add-on | N/A | 45 days | 30 days |

---

## Appendix A: Feature-to-Pack Mapping

| GHL Feature | Pack Assignment | Rationale |
|-------------|-----------------|-----------|
| Warmy integration | Email Authority | Core deliverability |
| Dedicated domain/IP | Email Authority | Advanced deliverability |
| Deliverability monitoring | Email Authority | Reporting |
| Text2Pay | Get Paid Now | Payment collection |
| Proposals & e-sign | Get Paid Now | Sales enablement |
| Estimates builder | Get Paid Now | Quote generation |
| Social planner | Social Autopilot | Content scheduling |
| Post templates (30) | Social Autopilot | Content library |
| Posting calendar | Social Autopilot | Planning |
| WhatsApp integration | Omnichannel Inbox | Messaging expansion |
| FB/IG DMs | Omnichannel Inbox | Social messaging |
| Google Business Chat | Omnichannel Inbox | Local search messaging |
| AI SMS (unlimited) | Unlimited AI Bundle | Automation |
| AI Reviews (unlimited) | Unlimited AI Bundle | Reputation |
| AI Content (unlimited) | Unlimited AI Bundle | Marketing |

---

## Appendix B: Competitive Positioning

| Competitor | Closest Equivalent | Our Advantage |
|------------|-------------------|---------------|
| Wix/Squarespace | Launch | CRM + missed-call from Capture |
| HubSpot Starter | Capture | Lower price, SMS included |
| GoHighLevel SaaS | Convert | Done-for-you, no learning curve |
| Podium | Scale | Full website + AI voice included |
| Smith.ai | After-Hours | AI-first, lower cost per interaction |
| Ruby Receptionists | Front Office | 24/7 AI, no human scheduling issues |

---

## Document History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Feb 2026 | ChatGPT | Initial proposal |
| 2.0 | Feb 2026 | Strategic Analysis | Complete rewrite with critique, tables, and recommendations |

---

**END OF DOCUMENT**
