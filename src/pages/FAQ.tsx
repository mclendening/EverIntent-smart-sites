/**
 * @fileoverview FAQ page with accordion-style Q&A sections.
 * @module pages/FAQ
 * 
 * Content derived from BRD v35.0 — covers Smart Websites, AI Employee,
 * pricing/billing, setup/delivery, and support topics.
 * 
 * Sections:
 * 1. Hero with search-friendly heading
 * 2. Category accordions (Smart Websites, AI Employee, Pricing, Setup, Support)
 * 3. CTA to contact
 */

import { SEO } from '@/components/SEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Globe, Bot, CreditCard, Rocket, Headphones } from 'lucide-react';

/** FAQ category with questions */
interface FAQCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  questions: { q: string; a: string }[];
}

/**
 * FAQ categories sourced from BRD v35.0 business model,
 * tier definitions, support model, and operational SOPs.
 */
const faqCategories: FAQCategory[] = [
  {
    id: 'smart-websites',
    title: 'Smart Websites',
    icon: Globe,
    questions: [
      {
        q: 'What is a Smart Website?',
        a: 'A professional 5-page website built in 5 days. Mobile-first, SEO-ready, and you own everything. Every site ships upgrade-ready with automation and AI under the hood.',
      },
      {
        q: 'What are the Smart Website tiers?',
        a: 'We offer four tiers: Launch ($249 one-time) for getting online fast, Capture ($97/mo) for lead capture and follow-up, Convert ($197/mo) for turning visitors into customers, and Scale ($497/mo) as an AI-powered growth engine.',
      },
      {
        q: 'Do I own my website?',
        a: 'Yes — your website, your data, your customers. No hostage situations, no hidden fees. Leave anytime and take it all with you.',
      },
      {
        q: 'How long does it take to build my site?',
        a: 'We build and launch your website in 5 business days. Day 1 is setup, Days 2-3 are build, Day 4 is your review, and Day 5 is launch.',
      },
      {
        q: 'Can I upgrade my tier later?',
        a: 'Absolutely. Every tier is upgrade-ready. Move from Launch to Capture, Convert, or Scale at any time — we handle the transition seamlessly.',
      },
    ],
  },
  {
    id: 'ai-employee',
    title: 'AI Employee',
    icon: Bot,
    questions: [
      {
        q: 'What is the AI Employee?',
        a: 'A managed AI receptionist service that handles voice calls, SMS, and web chat for your business. It answers calls, qualifies leads, books appointments, and recovers missed opportunities — 24/7.',
      },
      {
        q: 'What are the AI Employee modes?',
        a: 'Three modes: After-Hours ($497/mo) covers calls outside business hours, Front Office ($547/mo) screens calls during business hours with optional transfer, and Full AI Employee ($597/mo) combines everything.',
      },
      {
        q: 'How quickly can the AI Employee be set up?',
        a: 'Setup takes about 48 hours. Day 1 is configuration and provisioning, Day 2 is testing and your walkthrough call, and Day 3 is go-live.',
      },
      {
        q: 'Will callers know they\'re talking to an AI?',
        a: 'Yes — we comply with California Bot Disclosure Law (§17940). The AI identifies itself clearly at the start of every call, which actually builds trust with callers.',
      },
      {
        q: 'What is Web Chat Only?',
        a: 'Website-only engagement without phone features. $497 setup + $79/mo. Perfect for businesses that want AI-powered chat on their site without voice capabilities.',
      },
    ],
  },
  {
    id: 'pricing',
    title: 'Pricing & Billing',
    icon: CreditCard,
    questions: [
      {
        q: 'Are there contracts or cancellation fees?',
        a: 'No contracts. No cancellation fees. We earn your business every month. Stay because it works, not because you\'re locked in.',
      },
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards through our secure Stripe-powered checkout. Setup fees are charged upfront, and monthly subscriptions are billed automatically.',
      },
      {
        q: 'What happens if I cancel?',
        a: 'Your service continues until the end of your current billing period. Your data is retained for 90 days, giving you time to export anything you need.',
      },
      {
        q: 'Are there any hidden fees?',
        a: 'No hidden fees. The price you see is the price you pay. SMS, AI minutes, and emails above your included allocation are billed transparently as usage overages.',
      },
      {
        q: 'Is domain registration included?',
        a: 'Yes — domain registration is included with all tiers as a value-add. We handle the purchase and DNS configuration during your 5-day build window.',
      },
    ],
  },
  {
    id: 'setup',
    title: 'Setup & Delivery',
    icon: Rocket,
    questions: [
      {
        q: 'What do I need to provide to get started?',
        a: 'Your logo, brand colors, business information, and content for your pages. After checkout, we send an intake form to collect everything we need.',
      },
      {
        q: 'Do I need a domain name?',
        a: 'Not necessarily. During checkout, you can indicate if you already have a domain or need help getting one. We handle domain purchase and setup either way.',
      },
      {
        q: 'How many revision rounds do I get?',
        a: 'One round of revisions is included on Day 4 of the build process. We review your feedback and implement changes before launch on Day 5.',
      },
      {
        q: 'What platform are websites built on?',
        a: 'Websites are built on WordPress with Elementor, hosted on OVH/Plesk infrastructure with Cloudflare for performance and security.',
      },
    ],
  },
  {
    id: 'support',
    title: 'Support',
    icon: Headphones,
    questions: [
      {
        q: 'How do I get support?',
        a: 'Support channels depend on your tier. All tiers get email support. Capture and above get live chat. Scale customers also get phone support and quarterly strategy calls.',
      },
      {
        q: 'What are your response times?',
        a: 'Urgent issues (site down): 1-hour first response, 4-hour resolution. High priority: 4-hour response, 24-hour resolution. Normal requests: 24-hour response, 3 business days resolution.',
      },
      {
        q: 'Do you offer phone support?',
        a: 'Phone support is available for Scale ($497/mo) customers, along with quarterly strategy calls. All other tiers can reach us via email and chat.',
      },
    ],
  },
];

/**
 * FAQ page component with categorized accordion Q&A.
 * 
 * @component
 */
const FAQ = () => {
  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Common questions about EverIntent Smart Websites, AI Employee, pricing, setup, and support. Get answers fast."
        canonical="/faq"
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about our smart websites and AI automation services.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-3xl space-y-10">
          {faqCategories.map((category) => (
            <div key={category.id}>
              <div className="flex items-center gap-3 mb-4">
                <category.icon className="h-5 w-5 text-accent shrink-0" />
                <h2 className="text-xl font-semibold text-foreground">
                  {category.title}
                </h2>
              </div>
              <Accordion type="single" collapsible className="space-y-2">
                {category.questions.map((item, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`${category.id}-${idx}`}
                    className="border border-border/40 rounded-lg px-4 bg-card"
                  >
                    <AccordionTrigger className="text-left text-foreground hover:text-accent transition-colors">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-card border-t border-border/20">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Still have questions?
          </h2>
          <p className="text-muted-foreground mb-8">
            Our team is here to help. Get in touch and we'll get back to you within 24 hours.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-8 py-3 text-sm font-medium shadow hover:bg-primary/90 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>
    </>
  );
};

export default FAQ;
