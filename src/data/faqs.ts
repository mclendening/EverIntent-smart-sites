/**
 * @fileoverview Centralized FAQ Data — Single Source of Truth
 * @module data/faqs
 *
 * All FAQ content lives here. Update once → updates everywhere.
 * Pages consume via <FAQSection> component with filtering props.
 *
 * @see src/components/faq/FAQSection.tsx — Display component
 * @see docs/ALIGNMENT-IMPLEMENTATION-TASKS.md — Phase 2.5
 */

// ============================================
// TYPES
// ============================================

export type FAQCategory = 'smart-websites' | 'ai-employee' | 'pricing' | 'setup' | 'support' | 'warmy' | 'industry-automotive' | 'industry-health' | 'industry-home-services' | 'industry-professional';

export type FAQTag =
  | 'pricing' | 'product' | 'support' | 'objection' | 'technical'
  | 'billing' | 'setup' | 'ownership' | 'compliance' | 'integration'
  | 'voice-ai' | 'sms' | 'web-chat' | 'booking' | 'screening'
  | 'email' | 'deliverability';

export type ProductTag =
  | 'launch' | 'capture' | 'convert' | 'scale'
  | 'web-chat' | 'after-hours' | 'front-office' | 'full-ai'
  | 'all-websites' | 'all-ai' | 'warmy';

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  tags: FAQTag[];
  products?: ProductTag[];
  priority: number;
  isObjection?: boolean;
}

// ============================================
// FAQ DATA
// ============================================

export const faqData: FAQItem[] = [
  // ──────────────────────────────────────────
  // PRICING & BILLING — Objections first
  // ──────────────────────────────────────────
  {
    id: 'objection-robot',
    question: "Will my customers hate talking to a robot?",
    answer: "The choice isn't AI vs. human. It's AI vs. voicemail. 85% of people who reach voicemail never call back — they call your competitor instead. Our AI answers in 2 seconds, knows your business, your hours, and your services. 94% of callers rate the experience 4+ stars. And most don't even realize they're talking to AI. Your competitor's voicemail isn't beating our AI.",
    category: 'pricing',
    tags: ['objection', 'pricing'],
    products: ['all-ai'],
    priority: 1,
    isObjection: true,
  },
  {
    id: 'objection-expensive',
    question: "Is $197/month expensive?",
    answer: "A full-time receptionist costs $40,000 a year. We cost $2,364. And we work nights, weekends, and holidays without calling in sick. The average service business loses $50,000-$120,000 a year to missed calls (CallBird, 2026). If we capture one $200 job you would have missed, we've paid for ourselves for six months. The expensive option is doing nothing.",
    category: 'pricing',
    tags: ['objection', 'pricing'],
    products: ['all-ai'],
    priority: 2,
    isObjection: true,
  },
  {
    id: 'objection-think',
    question: "I need to think about it.",
    answer: "How many calls did you miss this week? The data says 62% of calls to local businesses go unanswered. At $200+ per missed call, that's $1,000+ every week walking out the door. There are no contracts — you can cancel anytime. The only risk is waiting.",
    category: 'pricing',
    tags: ['objection', 'pricing'],
    products: ['all-ai', 'all-websites'],
    priority: 3,
    isObjection: true,
  },
  {
    id: 'pricing-contracts',
    question: "Are there contracts or cancellation fees?",
    answer: "No contracts. No cancellation fees. We earn your business every month. Stay because it works, not because you're locked in.",
    category: 'pricing',
    tags: ['billing', 'pricing'],
    products: ['all-websites', 'all-ai'],
    priority: 10,
  },
  {
    id: 'pricing-payment',
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards through our secure Stripe-powered checkout. Setup fees are charged upfront, and monthly subscriptions are billed automatically.",
    category: 'pricing',
    tags: ['billing'],
    products: ['all-websites', 'all-ai'],
    priority: 11,
  },
  {
    id: 'pricing-cancel',
    question: "What happens if I cancel?",
    answer: "Your service continues until the end of your current billing period. Your data is retained for 90 days, giving you time to export anything you need.",
    category: 'pricing',
    tags: ['billing'],
    products: ['all-websites', 'all-ai'],
    priority: 12,
  },
  {
    id: 'pricing-hidden-fees',
    question: "Are there any hidden fees?",
    answer: "No hidden fees. The price you see is the price you pay. SMS, AI minutes, and emails above your included allocation are billed transparently as usage overages.",
    category: 'pricing',
    tags: ['billing', 'pricing'],
    products: ['all-websites', 'all-ai'],
    priority: 13,
  },
  {
    id: 'pricing-domain',
    question: "Is domain registration included?",
    answer: "Yes. Domain registration is included with all tiers as a value-add. We handle the purchase and DNS configuration during your 5-day build window.",
    category: 'pricing',
    tags: ['pricing', 'setup'],
    products: ['all-websites'],
    priority: 14,
  },
  {
    id: 'pricing-launch-included',
    question: "What's included in the one-time $249 price?",
    answer: "Launch includes a professional 5-page website, mobile responsive design, SSL certificate, basic SEO setup, contact form, and Google Maps integration. You own the website forever. After the first year, hosting is just $149/year.",
    category: 'pricing',
    tags: ['pricing', 'product'],
    products: ['launch'],
    priority: 15,
  },
  {
    id: 'pricing-upgrade-launch',
    question: "Can I upgrade from Launch to Capture later?",
    answer: "Yes! You can upgrade to any higher tier at any time. We'll migrate everything seamlessly and prorate your billing. No rebuilds required. Every tier is upgrade-ready from day one.",
    category: 'pricing',
    tags: ['pricing', 'product'],
    products: ['launch', 'capture', 'convert', 'scale'],
    priority: 16,
  },
  {
    id: 'pricing-ai-setup',
    question: "What's the setup process for AI Employee?",
    answer: "Setup includes custom AI training for your business, integration with your existing systems (calendar, CRM, phone), workflow configuration, and 30-day optimization. Most setups are live within 5-7 business days.",
    category: 'pricing',
    tags: ['setup', 'product'],
    products: ['all-ai'],
    priority: 17,
  },
  {
    id: 'pricing-missed-call-all',
    question: "Do all AI Employee plans include missed call text-back?",
    answer: "Yes! All AI Employee plans include missed call text-back recovery. When you can't answer, AI texts the caller within 60 seconds to keep the lead warm.",
    category: 'pricing',
    tags: ['product', 'pricing'],
    products: ['all-ai'],
    priority: 18,
  },
  {
    id: 'pricing-refunds',
    question: "Do you offer refunds?",
    answer: "Yes. We offer a 30-day money-back guarantee. If you're not happy with your site within 30 days of launch, we'll refund your setup fee. No questions asked.",
    category: 'pricing',
    tags: ['billing'],
    products: ['all-websites'],
    priority: 19,
  },
  {
    id: 'pricing-running-ads',
    question: "What if I'm running ads?",
    answer: "Capture ($97/mo) is specifically designed for businesses running paid traffic. It includes missed-call text-back, AI chat widget, and CRM so you don't lose leads you paid for.",
    category: 'pricing',
    tags: ['product', 'pricing'],
    products: ['capture'],
    priority: 20,
  },

  // ──────────────────────────────────────────
  // SMART WEBSITES
  // ──────────────────────────────────────────
  {
    id: 'sw-what',
    question: "What is a Smart Website?",
    answer: "A professional 5-page website built in 5 days. Mobile-first, SEO-ready, and you own everything. Every site ships upgrade-ready with automation and AI under the hood.",
    category: 'smart-websites',
    tags: ['product'],
    products: ['all-websites'],
    priority: 1,
  },
  {
    id: 'sw-tiers',
    question: "What are the Smart Website tiers?",
    answer: "We offer four tiers: Launch ($249 one-time) for getting online fast, Capture ($97/mo) for lead capture and follow-up, Convert ($197/mo) for turning visitors into customers, and Scale ($297/mo) as an AI-powered growth engine.",
    category: 'smart-websites',
    tags: ['product', 'pricing'],
    products: ['all-websites'],
    priority: 2,
  },
  {
    id: 'sw-own',
    question: "Do I own my website?",
    answer: "Yes. Your website, your data, your customers. No hostage situations, no hidden fees. Leave anytime and take it all with you.",
    category: 'smart-websites',
    tags: ['ownership'],
    products: ['all-websites'],
    priority: 3,
  },
  {
    id: 'sw-timeline',
    question: "How long does it take to build my site?",
    answer: "5 business days from kickoff to launch. Day 1 is setup, Days 2-3 are build, Day 4 is your review, and Day 5 is launch. We've streamlined our process so you're not waiting months.",
    category: 'smart-websites',
    tags: ['setup'],
    products: ['all-websites'],
    priority: 4,
  },
  {
    id: 'sw-upgrade',
    question: "Can I upgrade my tier later?",
    answer: "Absolutely. Every tier is upgrade-ready. Move from Launch to Capture, Convert, or Scale at any time. We handle the transition seamlessly.",
    category: 'smart-websites',
    tags: ['product'],
    products: ['all-websites'],
    priority: 5,
  },
  {
    id: 'sw-after-year1',
    question: "What happens after the first year with Launch?",
    answer: "Launch includes 1 year of hosting free. After Year 1, hosting renews at $149/year. This covers hosting, SSL, security updates, and basic maintenance. You can cancel anytime.",
    category: 'smart-websites',
    tags: ['pricing', 'billing'],
    products: ['launch'],
    priority: 6,
  },
  {
    id: 'sw-platform',
    question: "What platform are websites built on?",
    answer: "Built on modern, fast infrastructure with Cloudflare for performance and security. Every site is mobile-first, SEO-optimized, and built to load fast.",
    category: 'smart-websites',
    tags: ['technical'],
    products: ['all-websites'],
    priority: 7,
  },

  // Smart Website Tier-Specific FAQs
  {
    id: 'sw-capture-popular',
    question: "Why is Capture the most popular?",
    answer: "Because most businesses running ads or any paid traffic need lead capture. Without missed-call text-back and AI chat, you're paying for leads and losing them.",
    category: 'smart-websites',
    tags: ['product'],
    products: ['capture'],
    priority: 10,
  },
  {
    id: 'sw-capture-vs-launch',
    question: "What's the difference from Launch?",
    answer: "Launch is a basic website. Capture adds the tools that actually capture leads: AI chat, missed-call text-back, CRM, and automation.",
    category: 'smart-websites',
    tags: ['product'],
    products: ['capture'],
    priority: 11,
  },
  {
    id: 'sw-capture-speed',
    question: "How fast can I get started with Capture?",
    answer: "5 business days from kickoff to launch. Your lead capture system goes live the same day as your website.",
    category: 'smart-websites',
    tags: ['setup'],
    products: ['capture'],
    priority: 12,
  },
  {
    id: 'sw-convert-vs-capture',
    question: "What's the difference from Capture?",
    answer: "Convert adds online booking and review automation. If customers need to schedule with you, or if Google reviews matter to your business, this is the tier.",
    category: 'smart-websites',
    tags: ['product'],
    products: ['convert'],
    priority: 13,
  },
  {
    id: 'sw-convert-booking',
    question: "How does the booking system work?",
    answer: "Customers pick a time on your calendar, and it syncs with your schedule. You get notified, they get reminders. No back-and-forth phone tag.",
    category: 'smart-websites',
    tags: ['product'],
    products: ['convert'],
    priority: 14,
  },
  {
    id: 'sw-convert-reviews',
    question: "Will review automation seem spammy?",
    answer: "No. We send a simple, professional request after each job. Happy customers leave reviews. Unhappy ones reach you privately first.",
    category: 'smart-websites',
    tags: ['product'],
    products: ['convert'],
    priority: 15,
  },
  {
    id: 'sw-convert-upgrade',
    question: "Can I upgrade from Capture to Convert?",
    answer: "Yes. If you're on Capture and want booking + reviews, we migrate you seamlessly. Pay the difference in setup, new monthly rate kicks in.",
    category: 'smart-websites',
    tags: ['product', 'pricing'],
    products: ['convert'],
    priority: 16,
  },
  {
    id: 'sw-scale-worth',
    question: "What makes Scale worth the extra cost?",
    answer: "AI Voice Agent alone replaces a $3k+/month front desk hire. Add unified inbox and advanced automations, and you're running a business that scales without hiring.",
    category: 'smart-websites',
    tags: ['product', 'pricing'],
    products: ['scale'],
    priority: 17,
  },
  {
    id: 'sw-scale-voice',
    question: "How does the AI Voice Agent work?",
    answer: "When someone calls, AI answers professionally, asks qualifying questions, and books appointments on your calendar. You only talk to qualified leads.",
    category: 'smart-websites',
    tags: ['product', 'voice-ai'],
    products: ['scale'],
    priority: 18,
  },
  {
    id: 'sw-scale-strategy',
    question: "What are the quarterly strategy calls?",
    answer: "Every 3 months, we review your analytics, automation performance, and lead flow. We optimize and suggest improvements to keep your system running at peak.",
    category: 'smart-websites',
    tags: ['product', 'support'],
    products: ['scale'],
    priority: 19,
  },
  {
    id: 'sw-scale-beyond',
    question: "Is there an AI Employee option beyond this?",
    answer: "Yes. If you want full AI automation of calls, chat, and scheduling without a website, check out our AI Employee plans starting at $197/mo.",
    category: 'smart-websites',
    tags: ['product'],
    products: ['scale'],
    priority: 20,
  },

  // ──────────────────────────────────────────
  // AI EMPLOYEE
  // ──────────────────────────────────────────
  {
    id: 'ai-what',
    question: "What is the AI Employee?",
    answer: "A managed AI receptionist service that handles voice calls, SMS, and web chat for your business. It answers calls, qualifies leads, books appointments, and recovers missed opportunities, 24/7.",
    category: 'ai-employee',
    tags: ['product'],
    products: ['all-ai'],
    priority: 1,
  },
  {
    id: 'ai-modes',
    question: "What are the AI Employee modes?",
    answer: "Three plans: After-Hours ($197/mo) covers calls outside business hours with booking and missed call recovery, Front Office ($297/mo) screens calls during business hours with optional transfer, and Full AI Employee ($597/mo) combines everything.",
    category: 'ai-employee',
    tags: ['product', 'pricing'],
    products: ['all-ai'],
    priority: 2,
  },
  {
    id: 'ai-setup-time',
    question: "How quickly can the AI Employee be set up?",
    answer: "Setup takes about 48 hours. Day 1 is configuration and provisioning, Day 2 is testing and your walkthrough call, and Day 3 is go-live.",
    category: 'ai-employee',
    tags: ['setup'],
    products: ['all-ai'],
    priority: 3,
  },
  {
    id: 'ai-disclosure',
    question: "Will callers know they're talking to an AI?",
    answer: "Yes. We comply with California Bot Disclosure Law (§17940). The AI identifies itself clearly at the start of every call, which actually builds trust with callers.",
    category: 'ai-employee',
    tags: ['compliance'],
    products: ['all-ai'],
    priority: 4,
  },
  {
    id: 'ai-webchat',
    question: "What is Web Chat Only?",
    answer: "Website-only engagement without phone features. $497 setup + $79/mo. Perfect for businesses that want AI-powered chat on their site without voice capabilities.",
    category: 'ai-employee',
    tags: ['product', 'pricing'],
    products: ['web-chat'],
    priority: 5,
  },

  // After-Hours specific
  {
    id: 'ai-ah-what',
    question: "What does the After-Hours AI Employee do?",
    answer: "It answers calls, books appointments, and sends missed-call text-backs while your business is closed. You wake up to booked jobs instead of voicemails.",
    category: 'ai-employee',
    tags: ['product'],
    products: ['after-hours'],
    priority: 10,
  },
  {
    id: 'ai-ah-speed',
    question: "How fast does AI respond to missed calls?",
    answer: "The AI sends an SMS text-back within 60 seconds of a missed call, opening a two-way conversation to capture the lead and book an appointment.",
    category: 'ai-employee',
    tags: ['product', 'sms'],
    products: ['after-hours'],
    priority: 11,
  },
  {
    id: 'ai-ah-minutes',
    question: "How many voice minutes are included with After-Hours?",
    answer: "500 voice minutes per month are included. Additional minutes are $0.06 per minute. Most small businesses never exceed this allowance.",
    category: 'ai-employee',
    tags: ['pricing', 'voice-ai'],
    products: ['after-hours'],
    priority: 12,
  },
  {
    id: 'ai-ah-cost',
    question: "How much does After-Hours AI cost?",
    answer: "$197 per month plus a one-time $997 setup fee. This includes unlimited SMS, missed-call text-back, CRM integration, and 500 voice minutes.",
    category: 'ai-employee',
    tags: ['pricing'],
    products: ['after-hours'],
    priority: 13,
  },

  // Front Office specific
  {
    id: 'ai-fo-screen',
    question: "How does Front Office AI screen calls?",
    answer: "AI answers every call instantly, asks your custom qualifying questions (service needed, timeline, budget), scores the lead, and either transfers hot prospects live or politely ends non-fit calls.",
    category: 'ai-employee',
    tags: ['product', 'screening'],
    products: ['front-office'],
    priority: 14,
  },
  {
    id: 'ai-fo-spam',
    question: "What happens to spam and solicitor calls?",
    answer: "AI identifies spam, robocalls, and solicitors within seconds and politely ends the call. You never see or waste time on junk calls.",
    category: 'ai-employee',
    tags: ['product', 'screening'],
    products: ['front-office'],
    priority: 15,
  },
  {
    id: 'ai-fo-transfer',
    question: "How fast are qualified leads transferred?",
    answer: "Hot leads are warm-transferred to you in under 10 seconds with a whisper summary of their needs, budget, and timeline so you can close faster.",
    category: 'ai-employee',
    tags: ['product', 'screening'],
    products: ['front-office'],
    priority: 16,
  },
  {
    id: 'ai-fo-cost',
    question: "How much does Front Office AI cost?",
    answer: "$297 per month plus a one-time $1,497 setup fee. Includes 1,000 voice minutes, unlimited SMS, lead qualification, and live call transfers.",
    category: 'ai-employee',
    tags: ['pricing'],
    products: ['front-office'],
    priority: 17,
  },

  // Full AI Employee specific
  {
    id: 'ai-full-what',
    question: "What does the Full AI Employee include?",
    answer: "Voice AI call answering, SMS automation, web chat, appointment booking, call screening, live transfers, and CRM integration across all channels. One flat monthly price with no per-message fees.",
    category: 'ai-employee',
    tags: ['product'],
    products: ['full-ai'],
    priority: 18,
  },
  {
    id: 'ai-full-vs-individual',
    question: "How is Full AI Employee different from individual modes?",
    answer: "Instead of paying separately for After-Hours and Front Office modes, the Full AI Employee bundles everything into one unified system with priority support, white-glove onboarding, and 2,500 voice minutes.",
    category: 'ai-employee',
    tags: ['product', 'pricing'],
    products: ['full-ai'],
    priority: 19,
  },
  {
    id: 'ai-full-minutes',
    question: "How many voice minutes are included with Full AI?",
    answer: "2,500 voice minutes per month. Additional minutes are $0.06 each. Most businesses never exceed this allowance.",
    category: 'ai-employee',
    tags: ['pricing', 'voice-ai'],
    products: ['full-ai'],
    priority: 20,
  },
  {
    id: 'ai-full-cost',
    question: "How much does the Full AI Employee cost?",
    answer: "$597 per month plus a one-time $2,500 setup fee that includes white-glove onboarding, AI training on your business, and full system configuration.",
    category: 'ai-employee',
    tags: ['pricing'],
    products: ['full-ai'],
    priority: 21,
  },

  // ──────────────────────────────────────────
  // SETUP & DELIVERY
  // ──────────────────────────────────────────
  {
    id: 'setup-what-needed',
    question: "What do I need to provide to get started?",
    answer: "Your logo, brand colors, business information, and content for your pages. After checkout, we send an intake form to collect everything we need.",
    category: 'setup',
    tags: ['setup'],
    products: ['all-websites'],
    priority: 1,
  },
  {
    id: 'setup-domain',
    question: "Do I need a domain name?",
    answer: "Not necessarily. During checkout, you can indicate if you already have a domain or need help getting one. We handle domain purchase and setup either way.",
    category: 'setup',
    tags: ['setup'],
    products: ['all-websites'],
    priority: 2,
  },
  {
    id: 'setup-revisions',
    question: "How many revision rounds do I get?",
    answer: "One round of revisions is included on Day 4 of the build process. We review your feedback and implement changes before launch on Day 5.",
    category: 'setup',
    tags: ['setup'],
    products: ['all-websites'],
    priority: 3,
  },

  // ──────────────────────────────────────────
  // SUPPORT
  // ──────────────────────────────────────────
  {
    id: 'support-channels',
    question: "How do I get support?",
    answer: "Support channels depend on your tier. All tiers get email support. Capture and above get live chat. Scale customers also get phone support and quarterly strategy calls.",
    category: 'support',
    tags: ['support'],
    products: ['all-websites', 'all-ai'],
    priority: 1,
  },
  {
    id: 'support-response',
    question: "What are your response times?",
    answer: "If your site goes down, we're on it within an hour. Everything else within 24 hours. Scale customers get priority routing.",
    category: 'support',
    tags: ['support'],
    products: ['all-websites', 'all-ai'],
    priority: 2,
  },
  {
    id: 'support-phone',
    question: "Do you offer phone support?",
    answer: "Phone support is available for Scale ($297/mo) customers, along with quarterly strategy calls. All other tiers can reach us via email and chat.",
    category: 'support',
    tags: ['support'],
    products: ['all-websites', 'all-ai'],
    priority: 3,
  },
  {
    id: 'support-ticket',
    question: "How do I submit a support ticket?",
    answer: "Email support@everintent.com or use the contact form at everintent.com/contact. Include your business name and a description of the issue for fastest resolution.",
    category: 'support',
    tags: ['support'],
    products: ['all-websites', 'all-ai'],
    priority: 4,
  },

  // ──────────────────────────────────────────
  // HELP PAGE
  // ──────────────────────────────────────────
  {
    id: 'help-get-started',
    question: "How do I get started with EverIntent?",
    answer: "Choose a Smart Website plan starting at $249, complete checkout, and our team builds your site in 5 business days. You can add AI Employee or other services at any time.",
    category: 'support',
    tags: ['setup', 'product'],
    products: ['all-websites'],
    priority: 10,
  },
  {
    id: 'help-contact',
    question: "How do I contact EverIntent support?",
    answer: "Email support@everintent.com or call (562) 685-9500. All plans include email support with 24-hour response times. Scale plan customers get phone and strategy call access.",
    category: 'support',
    tags: ['support'],
    products: ['all-websites', 'all-ai'],
    priority: 11,
  },
  {
    id: 'help-upgrade',
    question: "Can I upgrade my plan later?",
    answer: "Yes. Every Smart Website is built upgrade-ready. You can add AI Employee, review automation, or any add-on service at any time with no rebuilds required.",
    category: 'support',
    tags: ['product'],
    products: ['all-websites'],
    priority: 12,
  },

  // ──────────────────────────────────────────
  // WARMY EMAIL DELIVERABILITY
  // ──────────────────────────────────────────
  {
    id: 'warmy-warmup-time',
    question: "How long does email warm-up take?",
    answer: "Most domains reach optimal deliverability within 2-4 weeks. New domains may take longer. Our AI adjusts the pace based on your domain reputation, ensuring safe and effective warm-up.",
    category: 'warmy',
    tags: ['email', 'deliverability'],
    products: ['warmy'],
    priority: 1,
  },
  {
    id: 'warmy-volume',
    question: "How many emails can I send with Warmy?",
    answer: "Warmy handles warm-up emails automatically. Your regular sending limits depend on your email provider. We optimize delivery and reputation, not volume limits.",
    category: 'warmy',
    tags: ['email', 'deliverability'],
    products: ['warmy'],
    priority: 2,
  },
  {
    id: 'warmy-ghl',
    question: "Does Warmy work with GoHighLevel?",
    answer: "Yes! Warmy integrates seamlessly with GoHighLevel (GHL) and any SMTP-compatible email system including Gmail, Outlook, and custom SMTP servers.",
    category: 'warmy',
    tags: ['email', 'integration'],
    products: ['warmy'],
    priority: 3,
  },
  {
    id: 'warmy-existing-issues',
    question: "What if I already have email deliverability issues?",
    answer: "Warmy can help recover damaged sender reputation. The warm-up process gradually rebuilds trust with email providers while our monitoring prevents future issues.",
    category: 'warmy',
    tags: ['email', 'deliverability'],
    products: ['warmy'],
    priority: 4,
  },
  {
    id: 'warmy-included',
    question: "Is Warmy included with any Smart Websites plan?",
    answer: "Yes! Warmy Email Deliverability is included free with our Smart Websites: Scale plan ($297/month). Standalone pricing is $49/month for businesses on other plans or with existing websites.",
    category: 'warmy',
    tags: ['email', 'pricing'],
    products: ['warmy', 'scale'],
    priority: 5,
  },
  {
    id: 'warmy-inbox-testing',
    question: "What email providers does inbox testing cover?",
    answer: "Our inbox placement testing covers 35+ email providers including Gmail, Outlook, Yahoo, AOL, iCloud, and major corporate email systems.",
    category: 'warmy',
    tags: ['email', 'deliverability'],
    products: ['warmy'],
    priority: 6,
  },

  // ──────────────────────────────────────────
  // INDUSTRY — AUTOMOTIVE
  // ──────────────────────────────────────────
  {
    id: 'ind-auto-insurance',
    question: "Can the AI handle insurance and warranty questions?",
    answer: "The AI is trained to gather insurance information and explain your warranty policies. For claims processing or complex warranty issues, it captures details and schedules a callback from your service advisor.",
    category: 'industry-automotive',
    tags: ['product', 'integration'],
    products: ['capture', 'after-hours', 'front-office'],
    priority: 1,
  },
  {
    id: 'ind-auto-software',
    question: "Does it integrate with my shop management software?",
    answer: "We integrate with Mitchell, ShopWare, Tekmetric, and most popular auto repair shop management systems. Appointments sync directly to your schedule.",
    category: 'industry-automotive',
    tags: ['integration'],
    products: ['capture', 'after-hours'],
    priority: 2,
  },
  {
    id: 'ind-auto-quotes',
    question: "Can it quote labor rates and parts?",
    answer: "Yes. We configure the AI with your labor rates and common repair pricing. It provides accurate estimates for standard services like oil changes, brakes, and diagnostics.",
    category: 'industry-automotive',
    tags: ['product'],
    products: ['capture', 'after-hours'],
    priority: 3,
  },
  {
    id: 'ind-auto-fleet',
    question: "What about fleet and commercial accounts?",
    answer: "The AI recognizes fleet customers and routes them appropriately. It can also handle basic fleet scheduling and capture vehicle information for your team.",
    category: 'industry-automotive',
    tags: ['product'],
    products: ['capture', 'front-office'],
    priority: 4,
  },
  {
    id: 'ind-auto-updates',
    question: "How do customers get updates on their vehicle?",
    answer: "The AI can send automated status updates via text: when the diagnostic is complete, when the car is ready, and follow-up satisfaction checks.",
    category: 'industry-automotive',
    tags: ['product', 'sms'],
    products: ['capture', 'after-hours'],
    priority: 5,
  },

  // ──────────────────────────────────────────
  // INDUSTRY — HEALTH & WELLNESS
  // ──────────────────────────────────────────
  {
    id: 'ind-health-hipaa',
    question: "Is the AI HIPAA compliant?",
    answer: "Yes. Our platform is built with HIPAA compliance in mind. The AI doesn't access patient records. It only handles scheduling and general inquiries. All call logs are encrypted and access-controlled.",
    category: 'industry-health',
    tags: ['compliance'],
    products: ['convert', 'after-hours', 'front-office'],
    priority: 1,
  },
  {
    id: 'ind-health-emr',
    question: "Can it integrate with my EMR/practice management system?",
    answer: "We integrate with most major healthcare practice management systems including Jane App, Mindbody, Vagaro, and aesthetic platforms like Aesthetic Record and Boulevard.",
    category: 'industry-health',
    tags: ['integration'],
    products: ['convert', 'after-hours'],
    priority: 2,
  },
  {
    id: 'ind-health-medical',
    question: "How does it handle medical questions?",
    answer: "The AI is trained to recognize medical questions and appropriately redirect to qualified staff. It never provides medical advice, only scheduling assistance and general service information that you approve.",
    category: 'industry-health',
    tags: ['compliance', 'product'],
    products: ['convert', 'after-hours'],
    priority: 3,
  },
  {
    id: 'ind-health-providers',
    question: "Can patients book specific providers?",
    answer: "Absolutely. The AI knows your staff schedule and can book with specific providers based on patient preference, availability, or service type requirements.",
    category: 'industry-health',
    tags: ['booking', 'product'],
    products: ['convert', 'after-hours'],
    priority: 4,
  },
  {
    id: 'ind-health-membership',
    question: "What about membership and package sales?",
    answer: "The AI can explain membership options and packages you offer. For purchases, it captures interest and books a consultation, or routes to your team for immediate follow-up.",
    category: 'industry-health',
    tags: ['product'],
    products: ['convert', 'front-office'],
    priority: 5,
  },

  // ──────────────────────────────────────────
  // INDUSTRY — HOME SERVICES
  // ──────────────────────────────────────────
  {
    id: 'ind-home-scheduling',
    question: "Does the AI integrate with my scheduling software?",
    answer: "Yes! We integrate with ServiceTitan, Housecall Pro, Jobber, and most popular field service management platforms. The AI can book directly into your calendar and sync customer data automatically.",
    category: 'industry-home-services',
    tags: ['integration'],
    products: ['capture', 'after-hours', 'front-office'],
    priority: 1,
  },
  {
    id: 'ind-home-complex',
    question: "What happens if a customer has a complex issue?",
    answer: "The AI is trained to recognize when to escalate. For complex technical questions or high-value commercial jobs, it captures details and schedules a callback from your team. You get full transcripts of every call.",
    category: 'industry-home-services',
    tags: ['product'],
    products: ['capture', 'after-hours'],
    priority: 2,
  },
  {
    id: 'ind-home-quotes',
    question: "Can the AI give pricing quotes?",
    answer: "Absolutely. We configure the AI with your pricing structure: diagnostic fees, common repairs, flat-rate services. It provides accurate ballpark quotes while being transparent about on-site evaluation needs.",
    category: 'industry-home-services',
    tags: ['product'],
    products: ['capture', 'after-hours'],
    priority: 3,
  },
  {
    id: 'ind-home-speed',
    question: "How quickly can I get started?",
    answer: "Capture websites launch in 5 business days. AI Employee setup takes an additional 3-5 days for voice training and integration. Most contractors are fully live within 2 weeks.",
    category: 'industry-home-services',
    tags: ['setup'],
    products: ['capture', 'after-hours'],
    priority: 4,
  },
  {
    id: 'ind-home-own',
    question: "Do I own my website and customer data?",
    answer: "100%. You own everything: the website design, content, and all customer data. We provide full exports on request, and there are no lock-in contracts.",
    category: 'industry-home-services',
    tags: ['ownership'],
    products: ['capture'],
    priority: 5,
  },

  // ──────────────────────────────────────────
  // INDUSTRY — PROFESSIONAL SERVICES
  // ──────────────────────────────────────────
  {
    id: 'ind-prof-privilege',
    question: "Is the AI compliant with attorney-client privilege?",
    answer: "The AI is designed for intake and scheduling only. It doesn't provide legal advice or access confidential case information. All calls are logged for your records, and the system is HIPAA-ready for firms handling sensitive matters.",
    category: 'industry-professional',
    tags: ['compliance'],
    products: ['convert', 'front-office'],
    priority: 1,
  },
  {
    id: 'ind-prof-conflicts',
    question: "Can the AI screen for conflicts of interest?",
    answer: "Yes. We can configure the AI to ask key screening questions (opposing parties, case types, etc.) and flag potential conflicts before booking. Your team reviews flagged intakes before consultations proceed.",
    category: 'industry-professional',
    tags: ['screening', 'compliance'],
    products: ['convert', 'front-office'],
    priority: 2,
  },
  {
    id: 'ind-prof-routing',
    question: "How does it handle different practice areas?",
    answer: "The AI routes callers to the appropriate attorney or department based on their needs. Whether it's family law, business litigation, or estate planning, it asks the right questions and schedules with the right person.",
    category: 'industry-professional',
    tags: ['product', 'screening'],
    products: ['convert', 'front-office'],
    priority: 3,
  },
  {
    id: 'ind-prof-software',
    question: "Does it integrate with my practice management software?",
    answer: "We integrate with Clio, MyCase, PracticePanther, Lawmatics, and most major legal practice management platforms. Client data syncs automatically.",
    category: 'industry-professional',
    tags: ['integration'],
    products: ['convert', 'front-office'],
    priority: 4,
  },
  {
    id: 'ind-prof-existing-site',
    question: "What about my existing website?",
    answer: "You can use our AI phone system with any website, or we can build you a new conversion-focused site. Convert tier includes a premium 8-page website designed specifically for professional services.",
    category: 'industry-professional',
    tags: ['product'],
    products: ['convert'],
    priority: 5,
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Filter FAQ items by category, tags (OR logic), and/or products.
 */
export function filterFAQs(options?: {
  category?: FAQCategory | FAQCategory[];
  tags?: FAQTag[];
  products?: ProductTag[];
  maxItems?: number;
  objectionsFirst?: boolean;
}): FAQItem[] {
  let items = [...faqData];

  if (options?.category) {
    const cats = Array.isArray(options.category) ? options.category : [options.category];
    items = items.filter(item => cats.includes(item.category));
  }

  if (options?.tags && options.tags.length > 0) {
    items = items.filter(item =>
      options.tags!.some(tag => item.tags.includes(tag))
    );
  }

  if (options?.products && options.products.length > 0) {
    items = items.filter(item => {
      if (!item.products) return false;
      return options.products!.some(p =>
        item.products!.includes(p) ||
        (p === 'all-websites' && item.products!.includes('all-websites')) ||
        (p === 'all-ai' && item.products!.includes('all-ai'))
      );
    });
  }

  // Sort: objections first if flagged, then by priority
  if (options?.objectionsFirst !== false) {
    items.sort((a, b) => {
      if (a.isObjection && !b.isObjection) return -1;
      if (!a.isObjection && b.isObjection) return 1;
      return a.priority - b.priority;
    });
  } else {
    items.sort((a, b) => a.priority - b.priority);
  }

  if (options?.maxItems) {
    items = items.slice(0, options.maxItems);
  }

  return items;
}

/**
 * Get FAQ items grouped by category (for /faq page).
 */
export function getFAQsByCategory(): { category: FAQCategory; title: string; items: FAQItem[] }[] {
  const categoryMeta: { category: FAQCategory; title: string }[] = [
    { category: 'smart-websites', title: 'Smart Websites' },
    { category: 'ai-employee', title: 'AI Employee' },
    { category: 'pricing', title: 'Pricing & Billing' },
    { category: 'setup', title: 'Setup & Delivery' },
    { category: 'support', title: 'Support' },
  ];

  return categoryMeta.map(meta => ({
    ...meta,
    items: filterFAQs({ category: meta.category }),
  }));
}

/**
 * Generate FAQPage JSON-LD schema from FAQ items.
 */
export function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org' as const,
    '@type': 'FAQPage' as const,
    mainEntity: items.map(item => ({
      '@type': 'Question' as const,
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: item.answer,
      },
    })),
  };
}
