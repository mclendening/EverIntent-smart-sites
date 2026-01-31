/**
 * @fileoverview Pricing page with AI Employee plans and Smart Website packages.
 * @module pages/Pricing
 * 
 * BRD v35.1 Pricing Matrix:
 * 
 * AI Employee Modes (M1-M5):
 * - M1-M3: $997 setup + $497/mo
 * - M4: $1,497 setup + $547/mo
 * - M5: $2,500 setup + $597/mo
 * 
 * Smart Website Tiers:
 * - Smart Site: $249 one-time + $149/yr hosting after Y1
 * - Smart Lead: $249 setup + $97/mo
 * - Smart Business: $497 setup + $197/mo
 * - Smart Growth: $997 setup + $297/mo
 * 
 * Standalone Products:
 * - Web Chat Only: $497 setup + $79/mo
 * - Warmy Booster: $49/mo
 */

import { Check, ArrowRight, Phone, MessageSquare, HelpCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// ============================================
// DATA
// ============================================

/**
 * AI Employee pricing plans (M1-M5) per BRD v35.1.
 */
const aiEmployeePlans = [
  {
    id: 'm1',
    name: 'After-Hours',
    price: '$497',
    setup: '$997',
    bestFor: 'Capture leads while closed',
    features: ['Voice AI after hours', 'Transcripts & recordings', 'Owner notifications', 'Lead summaries'],
  },
  {
    id: 'm2',
    name: 'After-Hours + Booking',
    price: '$497',
    setup: '$997',
    bestFor: 'Self-service scheduling',
    features: ['Everything in M1', 'Booking link delivery', 'Self-service scheduling', 'Calendar sync'],
    popular: true,
  },
  {
    id: 'm3',
    name: 'Missed Call Recovery',
    price: '$497',
    setup: '$997',
    bestFor: 'Recover busy-hour leads',
    features: ['SMS text-back in 60 seconds', 'AI qualification via SMS', 'Booking links', 'Lead capture'],
  },
  {
    id: 'm4',
    name: 'Front Line Screener',
    price: '$547',
    setup: '$1,497',
    bestFor: 'High call volume',
    features: ['Voice AI all hours', 'FAQ handling', 'Live transfer to team', 'Priority routing'],
  },
  {
    id: 'm5',
    name: 'Full AI Employee',
    price: '$597',
    setup: '$2,500',
    bestFor: 'Complete automation',
    features: ['All M1-M4 features', 'Outbound calls', 'Custom integrations', 'Dedicated support'],
  },
];

/**
 * Smart Website package tiers per BRD v35.1.
 */
const websitePackages = [
  {
    id: 'smart-site',
    name: 'Smart Site',
    price: '$249',
    period: 'one-time',
    setupNote: '$149/yr hosting after Y1',
    pages: '5',
    features: ['Mobile optimized', 'Basic SEO', 'Contact form', 'You own it forever'],
  },
  {
    id: 'smart-lead',
    name: 'Smart Lead',
    price: '$97',
    period: '/month',
    setupNote: '$249 setup',
    pages: '5',
    features: ['+ Missed call text-back', 'AI chat widget', 'Lead management', 'GBP sync'],
  },
  {
    id: 'smart-business',
    name: 'Smart Business',
    price: '$197',
    period: '/month',
    setupNote: '$497 setup',
    pages: '10',
    features: ['+ Online booking', 'Review automation', 'CRM pipelines', 'SMS campaigns'],
    popular: true,
  },
  {
    id: 'smart-growth',
    name: 'Smart Growth',
    price: '$297',
    period: '/month',
    setupNote: '$997 setup',
    pages: '10+',
    features: ['+ AI voice agent', 'Advanced automation', 'Strategy calls', 'Priority support'],
  },
];

/**
 * FAQ items for the accordion.
 */
const faqItems = [
  {
    question: "What's the setup fee cover?",
    answer: "The one-time setup fee covers custom AI training for your specific business, integration with your existing systems (calendar, CRM, phone), workflow configuration, and testing. We train the AI on your FAQs, pricing, services, and business rules so it sounds like your best employee from day one.",
  },
  {
    question: "Can I change modes later?",
    answer: "Yes! You can upgrade, downgrade, or switch modes at any time. If you start with M1 and want to upgrade to M4, we'll adjust your plan and prorate the billing. No contracts, no penalties.",
  },
  {
    question: "Do I need a website to use AI Employee?",
    answer: "No. AI Employee works with any website — even if you don't have one yet. The AI answers your phone and texts, which are completely independent of your website. Many customers start with AI Employee and add a Smart Site later.",
  },
  {
    question: "How long until I'm live?",
    answer: "Most AI Employee setups are live within 5-7 business days. Smart Sites are delivered in 5 business days. Complex integrations or custom workflows may take slightly longer — we'll give you a timeline during onboarding.",
  },
  {
    question: "What's the $149/year hosting fee?",
    answer: "Smart Site includes free hosting for the first year. After that, it's just $149/year to keep your site live, secure, and updated. You own the site forever — the hosting fee just covers server costs and maintenance.",
  },
];

/**
 * JSON-LD FAQ schema for SEO.
 */
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqItems.map(item => ({
    "@type": "Question",
    "name": item.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.answer,
    },
  })),
};

// ============================================
// COMPONENT
// ============================================

/**
 * Pricing page with dual-product sections and FAQ.
 * 
 * @component
 * @example
 * <Pricing />
 */
const Pricing = () => {
  return (
    <>
      <SEO
        title="Pricing | AI Employee & Smart Websites | EverIntent"
        description="AI Employee from $497/mo. Smart Websites from $249. Simple pricing with no contracts. See all plans and choose the right fit for your business."
      />
      
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">Simple Pricing. </span>
            <span className="text-gradient">No Contracts.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-6">
            Start with a Smart Site. Upgrade to Smart Lead, Business, or Growth. Let AI handle it when you're ready.
          </p>
          <p className="text-sm text-muted-foreground/80 max-w-xl mx-auto">
            Every tier is upgrade-ready. Move up the ladder as your business grows — no rebuilds, no migrations.
          </p>
        </div>
      </section>

      {/* Smart Website Packages Section - FIRST per conversion ladder */}
      <section id="smart-websites" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Smart Website Packages
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional websites built in 5 days. AI-ready from day one.
            </p>
          </div>

          {/* Website Packages Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {websitePackages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative rounded-2xl p-6 border transition-all duration-300 hover-lift ${
                  pkg.popular
                    ? 'bg-primary/5 border-primary/50 shadow-lg shadow-primary/10'
                    : 'bg-card/50 border-border/30 hover:border-primary/30'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-4">
                  <h3 id={pkg.id} className="text-lg font-semibold text-foreground mb-1">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground">{pkg.pages} pages</p>
                </div>

                <div className="mb-2">
                  <span className="text-3xl font-bold text-foreground">{pkg.price}</span>
                  <span className="text-muted-foreground text-sm">{pkg.period}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-5">{pkg.setupNote}</p>

                <ul className="space-y-2.5 mb-6">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`block w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
                    pkg.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Employee Plans Section - SECOND per conversion ladder */}
      <section id="ai-employee" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              AI Employee Plans
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              One setup. Choose your mode. Add more anytime.
            </p>
          </div>

          {/* AI Plans Grid - 5 modes */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-7xl mx-auto mb-8">
            {aiEmployeePlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-6 border transition-all duration-300 hover-lift ${
                  plan.popular
                    ? 'bg-primary/5 border-primary/50 shadow-lg shadow-primary/10'
                    : 'bg-card/50 border-border/30 hover:border-primary/30'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.bestFor}</p>
                </div>

                <div className="mb-2">
                  <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <p className="text-xs text-muted-foreground mb-5">{plan.setup} setup</p>

                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`block w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>

          {/* Bundle discount note */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Need multiple modes? <span className="text-foreground font-medium">15% off monthly</span> when you bundle 2+.
            </p>
            <p className="text-sm text-muted-foreground">
              Web Chat Only: <span className="text-foreground font-medium">$79/mo</span> + $497 setup
            </p>
          </div>
        </div>
      </section>

      {/* Parallel Entry Points Section */}
      <section id="entry-points" className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Just Need One Thing?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Not ready for a full package? Start with a single product.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Web Chat Only - Parallel Entry */}
            <div id="web-chat" className="rounded-2xl p-6 border border-primary/30 bg-primary/5 hover:border-primary/50 transition-all duration-300 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Web Chat Only</h3>
                  <p className="text-xs text-muted-foreground">Parallel entry to AI</p>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-foreground">$79</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">$497 setup</p>
              <p className="text-sm text-muted-foreground mb-5">
                AI chat widget for your website. Capture leads 24/7 without voice AI. Upgrade to full AI Employee anytime.
              </p>
              <Link
                to="/contact"
                className="block w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>

            {/* Warmy Booster */}
            <div id="warmy" className="rounded-2xl p-6 border border-border/30 bg-card/50 hover:border-primary/30 transition-all duration-300 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Warmy Booster</h3>
                  <p className="text-xs text-muted-foreground">Email deliverability</p>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-foreground">$49</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="text-xs text-muted-foreground mb-4">No setup fee • Free with Smart Lead</p>
              <p className="text-sm text-muted-foreground mb-5">
                Email warm-up service to boost deliverability and keep your emails out of spam.
              </p>
              <Link
                to="/contact"
                className="block w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Not Sure Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Not Sure Where to Start?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {/* AI Employee Card */}
            <Link
              to="/let-ai-handle-it"
              className="group relative rounded-2xl p-8 border border-border/30 bg-card/50 hover:border-primary/50 transition-all duration-300 hover-lift"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">I need to stop missing calls</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                AI Employee answers 24/7, books appointments, and captures every lead — even when you're busy or closed.
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                See AI Employee
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>

            {/* Smart Websites Card */}
            <Link
              to="/smart-websites"
              className="group relative rounded-2xl p-8 border border-border/30 bg-card/50 hover:border-primary/50 transition-all duration-300 hover-lift"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">I need a professional website</h3>
              </div>
              <p className="text-muted-foreground mb-4">
                Get a conversion-focused, mobile-optimized website in 5 days. You own it. AI-ready when you are.
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                See Smart Websites
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="w-6 h-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-border/30 rounded-xl px-6 bg-card/50"
                >
                  <AccordionTrigger className="text-left text-foreground font-medium hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Stop Losing Leads?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Get started in minutes. No contracts, no commitments.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
};

export default Pricing;
