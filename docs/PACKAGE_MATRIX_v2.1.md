# EVERINTENT PACKAGE MATRIX v2.1

**Document Type:** Product Catalog + Internal Build Reference  
**Version:** 2.1 (April 2026)  
**Source of Truth:** everintent.com + `src/config/checkoutConfig.ts`  
**Purpose:** Defines what we sell, what each product includes, what the Trifecta chain builds for each, and how to close.

---

## TWO PRODUCT LINES

Sold separately or together. Every combination is valid.

### Smart Websites

| Tier | Price | Billing | What They Get |
|------|-------|---------|---------------|
| **Launch** | $249 | One-time | 5-page professional website, mobile responsive, SSL, basic SEO, contact form, Google Maps, GA4 view |
| **Capture** | $97/mo | Monthly | Everything in Launch + missed call text-back, unlimited forms & calendars, CRM integration, basic automations |
| **Convert** | $197/mo | Monthly | Everything in Capture + advanced automations, online payments, booking system, review management |
| **Scale** | $297/mo | Monthly | Everything in Convert + AI chat widget, unlimited AI features, priority support, Email Authority included |

**Hosting:** Launch includes first year. $149/year after. Client owns everything.  
**Setup fees:** $0 for Capture, Convert, and Scale.

### AI Employee

| Mode | Monthly | Setup | What They Get |
|------|---------|-------|---------------|
| **Web Chat Only** | $79/mo | $497 | AI chat widget on website, KB-trained, lead capture, appointment booking |
| **After-Hours** | $197/mo | $997 | Voice AI answers when closed, books appointments, texts back missed calls, after-hours coverage |
| **Front Office** | $297/mo | $1,497 | Voice AI during business hours, screens callers, qualifies leads, transfers hot opportunities, missed call recovery |
| **Full AI Employee** | $597/mo | $2,500 | All modes combined — voice, SMS, web chat, booking, screening, 24/7 coverage, unlimited AI usage |

**All AI Employee modes include:** Missed call text-back, business-specific AI training, system integration, testing & QA, 30-day optimization.

---

## ADD-ON HUB

Modular service packs sold on top of any tier. Some are included in specific tiers.

| Add-On | Monthly | Included In | What They Get |
|--------|---------|-------------|---------------|
| **Email Authority** | $49/mo | Scale | Email warm-up, deliverability monitoring, inbox placement (Warmy-powered) |
| **Get Paid Now** | $49/mo | — | Text-to-Pay, proposals & invoicing in 60 seconds |
| **Social Autopilot** | $97/mo | — | Automated social posting & content calendar |
| **Omnichannel Inbox** | $99/mo | — | WhatsApp, Facebook, Instagram & Google Business chat in one inbox |
| **AI Voice Chat** | $79/mo | Full AI Employee | Voice-enabled AI chat for website |
| **Unlimited AI** | $149/mo | Full AI Employee | Unlimited AI usage across all features |

---

## WHAT THE MARKET BUYS (Demand Priority)

| Rank | What They Want | Their Pain | Best EverIntent Product | Market Price Range |
|------|---------------|-----------|------------------------|-------------------|
| 1 | Stop losing leads | 62% of calls go unanswered | After-Hours ($197/mo) | $79-$299/mo |
| 2 | Answer every call 24/7 | Can't hire a receptionist | Front Office ($297/mo) or Full ($597/mo) | $199-$600/mo |
| 3 | Professional website | Current site looks amateur or doesn't exist | Launch ($249) + Capture ($97/mo) | $200-$500 one-time |
| 4 | Book appointments automatically | Phone tag, no-shows, manual scheduling | Convert ($197/mo) + any AI Employee | $100-$300/mo |
| 5 | Full automation | Owner wants time back | Scale ($297/mo) + Full AI Employee ($597/mo) | $500-$1,500/mo |

**The #1 door-opener is missed calls.** Lead with "how many calls did you miss this week?" Every path starts there.

---

## WHAT EACH PRODUCT REQUIRES FROM THE TRIFECTA CHAIN

### Smart Websites

| Tier | Discovery | KB | Bot Config | Workflows | Website Spec | Total Prompts |
|------|-----------|----|-----------|-----------|--------------|--------------| 
| Launch | Minimal (company info only) | No | No | No | PROMPT 8 | 1 |
| Capture | Light (STORY + GRIND) | PROMPT 3 | Partial PROMPT 5 (chat only) | PROMPT 6 (missed call only) | PROMPT 8 | 4 |
| Convert | Medium (STORY + JOURNEY + GRIND) | PROMPT 3 | Partial PROMPT 5 (chat only) | PROMPT 6 (booking + reminders + reviews) | PROMPT 8 | 5 |
| Scale | Full Five Threads | PROMPT 3 | Partial PROMPT 5 (chat only) | PROMPT 6 (full workflow set) | PROMPT 8 | 6 |

### AI Employee

| Mode | Discovery | KB | Bot Config | Workflows | Website Spec | Total Prompts |
|------|-----------|----|-----------|-----------|--------------|--------------| 
| Web Chat Only | Light (STORY + GRIND) | PROMPT 3 | Partial PROMPT 5 (chat only) | No | No | 3 |
| After-Hours | Medium (STORY + GRIND + BOUNDARIES) | PROMPT 3 | PROMPT 5 (voice after-hours + chat) | PROMPT 6 (after-hours + missed call) | No | 5 |
| Front Office | Full Five Threads | PROMPT 3 | PROMPT 5 (voice full + chat) | PROMPT 6 (full set minus reviews) | No | 6 |
| Full AI Employee | Full Five Threads | PROMPT 3 | PROMPT 5 (everything) | PROMPT 6 (full set) | No | 6 |

### Common Combos

| Combo | What Runs | Setup Time |
|-------|-----------|-----------|
| Launch only | PROMPT 8 | 30 min |
| Launch + After-Hours | Full chain minus Front Office qualification | 2 hours |
| Capture + Web Chat Only | PROMPTs 0-3, partial 5, partial 6, 8 | 90 min |
| Convert + Front Office | Full chain | 3 hours |
| Scale + Full AI Employee | Full chain, all features | 3-4 hours |

---

## CLOSING GUIDE

### Lead With Pain, Not Features

| They Say | You Sell | Product |
|----------|---------|---------|
| "We miss a lot of calls" | "AI answers every call. You wake up to booked appointments." | After-Hours ($197/mo) |
| "We're too busy to answer phones" | "AI screens and qualifies so your team only talks to real opportunities." | Front Office ($297/mo) |
| "Our website looks terrible" | "Professional site in 5 days, $249, you own it." | Launch ($249) |
| "We need more leads" | "Website + AI chat captures leads while you sleep." | Launch + Capture ($249 + $97/mo) |
| "I want my time back" | "Full AI employee. It answers calls, books jobs, follows up, requests reviews." | Full AI Employee ($597/mo) |
| "We get calls after hours" | "Your AI doesn't close at 5pm. It books the 11pm emergency plumbing call." | After-Hours ($197/mo) |

### The Upsell Ladder

```
Launch ($249) → "Now let's capture those visitors" → Capture ($97/mo)
    → "Now let's convert them" → Convert ($197/mo)
    → "Now let's automate everything" → Scale ($297/mo)

Web Chat ($79/mo) → "What about phone calls?" → After-Hours ($197/mo)
    → "What about during the day?" → Front Office ($297/mo)
    → "Let's go all in" → Full AI Employee ($597/mo)
```

### Objection Handling

**"That's expensive"**
→ "A full-time receptionist costs $40K/year. After-Hours is $2,364/year and works every night, every weekend, every holiday."

**"I need to think about it"**
→ "How many calls did you miss this week? Each one is a job going to someone else. Let's start with After-Hours and you'll see the ROI in the first week."

**"Just give me the cheap one"**
→ "Web Chat is $79/mo and covers your website. But your biggest leak is phone calls. For $197/mo we cover both. Which matters more — your website or your phone?"

**"We already have a website"**
→ "Great. Does it answer questions at 2am? Does it book appointments? Does it text back missed calls? That's what Capture adds for $97/mo."

---

## INTERNAL BUILD ECONOMICS

| Product | Setup Revenue | Monthly Revenue | Your Build Time | Effective Hourly |
|---------|--------------|----------------|----------------|-----------------|
| Launch | $249 | $0 (one-time) | 30 min | $498/hr |
| Capture | $0 | $97/mo | 45 min | — (recurring) |
| Convert | $0 | $197/mo | 60 min | — (recurring) |
| Scale | $0 | $297/mo | 90 min | — (recurring) |
| Web Chat Only | $497 | $79/mo | 45 min | $662/hr setup |
| After-Hours | $997 | $197/mo | 90 min | $664/hr setup |
| Front Office | $1,497 | $297/mo | 120 min | $748/hr setup |
| Full AI Employee | $2,500 | $597/mo | 180 min | $833/hr setup |

**The recurring math:**
- 10 After-Hours clients = $9,970 setup + $1,970/mo recurring = $33,610/yr
- 10 Full AI Employee clients = $25,000 setup + $5,970/mo recurring = $96,640/yr
- Mix of 20 clients across tiers = realistic $60-$100K ARR

**Push Full AI Employee when the pain is there. Start with After-Hours when they need convincing.**

---

## GHL COST BASIS PER CLIENT

| Component | Your GHL Cost | Included In |
|-----------|--------------|-------------|
| AI Employee Unlimited | $97/mo per sub-account | Covers Conversation AI, Reviews AI, Content AI |
| Voice AI (engine) | ~$0.06/min usage | Usage-based on top of $97/mo |
| Voice AI (LLM) | ~$0.15/1M tokens | Usage-based |
| SMS/Phone | LC Phone rates | Usage-based |
| Sub-account | Included in Agency Pro ($497/mo) | Unlimited sub-accounts |

**Margin example (After-Hours):**
- You charge: $197/mo
- Your cost: ~$97 (AI Employee) + ~$10-20 (usage) = ~$110-$120/mo
- Margin: ~$75-$85/mo per client (38-43%)

**Margin example (Full AI Employee):**
- You charge: $597/mo
- Your cost: ~$97 + ~$30-50 (heavier usage) = ~$130-$150/mo
- Margin: ~$450-$470/mo per client (75-78%)

---

## CHANGELOG

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 2026 | Original (Core/Speed/Complete at $2,500-$5,000) |
| 2.0 | Apr 2026 | Complete rewrite. Aligned to everintent.com products. Two product lines: Smart Websites (Launch/Capture/Convert/Scale) + AI Employee (Web Chat/After-Hours/Front Office/Full). Added market demand data, build time estimates, GHL cost basis, and Trifecta chain mapping. |
| **2.1** | **Apr 9, 2026** | **Aligned feature lists to `checkoutConfig.ts` source of truth. Key corrections: (1) Moved AI chat widget from Capture to Scale where it belongs. (2) Removed untracked SMS/email quotas (400/600/1000) from tier descriptions. (3) Fixed Capture features: added forms & calendars, basic automations; removed AI chat, mobile app. (4) Fixed Convert features: added online payments, advanced automations; removed pipeline management. (5) Fixed Scale features: removed unified inbox (separate $99/mo add-on) and strategy calls (not a product feature). (6) Added appointment booking to Web Chat Only. (7) Added "unlimited AI usage" to Full AI Employee. (8) Added complete Add-On Hub section with all 6 add-ons and tier inclusion mapping. (9) Noted Email Authority included in Scale. (10) Added $0 setup fee clarification for Capture/Convert/Scale. (11) Changed source of truth reference to include `checkoutConfig.ts`.** |

---

**END OF PACKAGE MATRIX v2.1**
