/**
 * @fileoverview Pricing page with tabs for Smart Websites and AI Employee.
 * @module pages/Pricing
 * 
 * Consolidated AI Employee Modes:
 * - After-Hours: $197/mo + $1,497 setup (includes booking + missed call recovery)
 * - Front Office: $297/mo + $1,497 setup (includes missed call recovery)
 * - Full AI Employee: $597/mo + $2,500 setup
 * - Web Chat Only: $79/mo + $497 setup
 * 
 * Smart Websites:
 * - Smart Site (T1): $249 one-time, $149/yr after Y1
 * - Smart Lead (T2): $97/mo, 400 SMS, 30 AI min
 * - Smart Business (T3): $197/mo, 600 SMS, 50 AI min
 * - Smart Growth (T4): $497/mo, 1000 SMS, 100 AI min
 */

import { useState, useEffect } from 'react';
import { Check, Minus, ArrowRight, Moon, ShieldCheck, Bot, MessageSquare } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// ============================================
// DATA - Smart Websites
// ============================================

const websiteFeatures = [
  { name: 'Price', t1: '$249', t2: '$97/mo', t3: '$197/mo', t4: '$497/mo' },
  { name: 'Billing', t1: 'One-time', t2: 'Monthly', t3: 'Monthly', t4: 'Monthly' },
  { name: 'Professional Website', t1: true, t2: true, t3: true, t4: true },
  { name: 'Mobile Responsive', t1: true, t2: true, t3: true, t4: true },
  { name: 'SSL Certificate', t1: true, t2: true, t3: true, t4: true },
  { name: 'Basic SEO', t1: true, t2: true, t3: true, t4: true },
  { name: 'Contact Form', t1: true, t2: true, t3: true, t4: true },
  { name: 'Google Maps', t1: true, t2: true, t3: true, t4: true },
  { name: 'GA4 Dashboard', t1: 'View', t2: 'Full', t3: 'Full', t4: 'Full' },
  { name: 'Missed Call Text-Back', t1: false, t2: true, t3: true, t4: true },
  { name: 'AI Chat Widget', t1: false, t2: true, t3: true, t4: true },
  { name: 'CRM / Contacts', t1: false, t2: true, t3: true, t4: true },
  { name: 'SMS/Email', t1: false, t2: '400/mo', t3: '600/mo', t4: '1000/mo' },
  { name: 'Mobile App', t1: false, t2: true, t3: true, t4: true },
  { name: 'Online Booking', t1: false, t2: false, t3: true, t4: true },
  { name: 'Pipeline Management', t1: false, t2: false, t3: true, t4: true },
  { name: 'Review Automation', t1: false, t2: false, t3: true, t4: true },
  { name: 'Advanced Automations', t1: false, t2: false, t3: false, t4: true },
  { name: 'Unified Inbox', t1: false, t2: false, t3: false, t4: true },
  { name: 'Strategy Calls', t1: false, t2: false, t3: false, t4: 'Quarterly' },
];

const websiteTiers = [
  { id: 'smart-site', name: 'Smart Site', key: 't1', cta: 'Get Started', ctaStyle: 'secondary', href: '/smart-websites/smart-site' },
  { id: 'smart-lead', name: 'Smart Lead', key: 't2', cta: 'Get Started', ctaStyle: 'primary', href: '/smart-websites/smart-lead' },
  { id: 'smart-business', name: 'Smart Business', key: 't3', cta: 'Get Started', ctaStyle: 'primary', href: '/smart-websites/smart-business' },
  { id: 'smart-growth', name: 'Smart Growth', key: 't4', cta: 'Get Started', ctaStyle: 'secondary', href: '/smart-websites/smart-growth' },
];

// ============================================
// DATA - AI Employee Modes (Consolidated)
// ============================================

const aiModes = [
  {
    id: 'after-hours',
    name: 'After-Hours',
    icon: Moon,
    bestFor: 'Complete after-hours coverage',
    price: '$197',
    setup: '$1,497',
    description: 'AI answers after hours, books appointments, and texts back missed calls. Never lose a lead when you\'re closed.',
    href: '/let-ai-handle-it/after-hours',
  },
  {
    id: 'front-office',
    name: 'Front Office',
    icon: ShieldCheck,
    bestFor: 'Screen, qualify, and transfer',
    price: '$297',
    setup: '$1,497',
    description: 'AI screens all calls, qualifies leads, recovers missed calls, and transfers hot opportunities live.',
    href: '/let-ai-handle-it/front-office',
  },
  {
    id: 'full',
    name: 'Full AI Employee',
    icon: Bot,
    bestFor: 'Everything included',
    price: '$597',
    setup: '$2,500',
    description: 'All modes combined. Your complete AI-powered front office—voice, SMS, booking, screening, web chat.',
    featured: true,
    href: '/let-ai-handle-it/full-takeover',
  },
  {
    id: 'web-chat',
    name: 'Web Chat Only',
    icon: MessageSquare,
    bestFor: 'Website chat without phone',
    price: '$79',
    setup: '$497',
    description: 'AI chat widget for your website. Capture leads 24/7 without voice AI.',
    href: '/contact',
  },
];

// ============================================
// DATA - FAQ
// ============================================

const faqItems = [
  {
    question: "What's included in the one-time $249 price?",
    answer: "Smart Site includes a professional 5-page website, mobile responsive design, SSL certificate, basic SEO setup, contact form, and Google Maps integration. You own the website forever. After the first year, hosting is just $149/year.",
  },
  {
    question: "Can I upgrade from Smart Site to Smart Lead later?",
    answer: "Yes! You can upgrade to any higher tier at any time. We'll migrate everything seamlessly and prorate your billing. No rebuilds required — every tier is upgrade-ready from day one.",
  },
  {
    question: "What happens if I exceed my SMS limit?",
    answer: "We'll notify you when you're approaching your limit. Additional SMS are billed at $0.015 each. You can also upgrade to a higher tier for more included messages.",
  },
  {
    question: "Do I own my website?",
    answer: "Yes, you own everything. Smart Site customers get the source code delivered. Higher tiers include hosting, but you can export and self-host anytime. No lock-in.",
  },
  {
    question: "Is there a contract?",
    answer: "No contracts. All monthly plans are month-to-month. Cancel anytime with no penalties. We believe in earning your business every month.",
  },
  {
    question: "What's the setup process for AI Employee?",
    answer: "Setup includes custom AI training for your business, integration with your existing systems (calendar, CRM, phone), workflow configuration, and 30-day optimization. Most setups are live within 5-7 business days.",
  },
  {
    question: "Do all AI modes include missed call text-back?",
    answer: "Yes! All AI Employee modes include missed call text-back recovery. When you can't answer, AI texts the caller within 60 seconds to keep the lead warm.",
  },
];

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

const Pricing = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState<'websites' | 'ai'>('websites');
  
  // Read tab from URL param on mount
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'ai') {
      setActiveTab('ai');
    }
  }, [searchParams]);

  return (
    <>
      <SEO
        title="Pricing | Smart Websites & AI Employee | EverIntent"
        description="Professional websites from $249. AI automation from $197/month. Simple pricing with no contracts. See all plans and choose the right fit for your business."
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Professional websites from $249. AI automation from $197/month.
          </p>

          {/* Tab Switcher */}
          <div className="inline-flex rounded-xl bg-muted/50 p-1 border border-border/50">
            <button
              onClick={() => setActiveTab('websites')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'websites'
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Smart Websites
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === 'ai'
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              AI Employee
            </button>
          </div>
          
          {/* Compare Plans Link */}
          <div className="mt-6">
            <Link 
              to={activeTab === 'websites' ? '/compare-websites' : '/compare-ai-employee'}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
            >
              <span className="story-link">Compare all {activeTab === 'websites' ? 'website' : 'AI'} plans</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Smart Websites Tab */}
      {activeTab === 'websites' && (
        <section id="smart-websites" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            {/* Comparison Table - Desktop */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full max-w-6xl mx-auto">
                <thead className="sticky top-0 bg-background/95 backdrop-blur-sm z-10">
                  <tr>
                    <th className="text-left py-4 px-4 font-medium text-muted-foreground">Feature</th>
                    {websiteTiers.map((tier) => (
                      <th key={tier.id} className="py-4 px-4 text-center">
                        <div className="relative">
                          <span id={tier.id} className="text-lg font-semibold text-foreground">{tier.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {websiteFeatures.map((feature, idx) => (
                    <tr key={feature.name} className={idx < 2 ? 'bg-muted/20' : 'hover:bg-muted/10 transition-colors'}>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{feature.name}</td>
                      {(['t1', 't2', 't3', 't4'] as const).map((tier) => (
                        <td key={tier} className="py-3 px-4 text-center">
                          {typeof feature[tier] === 'boolean' ? (
                            feature[tier] ? (
                              <Check className="w-5 h-5 text-accent mx-auto" />
                            ) : (
                              <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />
                            )
                          ) : (
                            <span className={idx < 2 ? 'text-2xl font-bold text-foreground' : 'text-sm text-foreground'}>
                              {feature[tier]}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                  {/* CTA Row */}
                  <tr>
                    <td className="py-6 px-4"></td>
                    {websiteTiers.map((tier) => (
                      <td key={tier.id} className="py-6 px-4 text-center">
                        <div className="flex flex-col gap-2">
                          <Link
                            to={tier.href}
                            className="inline-flex items-center justify-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors"
                          >
                            See Details
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            to="/contact"
                            className={`inline-block px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                              tier.ctaStyle === 'primary'
                                ? 'bg-accent text-accent-foreground hover:bg-accent-hover shadow-md'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                          >
                            {tier.cta}
                          </Link>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden grid sm:grid-cols-2 gap-6">
              {websiteTiers.map((tier) => {
                const priceFeature = websiteFeatures.find(f => f.name === 'Price');
                const billingFeature = websiteFeatures.find(f => f.name === 'Billing');
                return (
                  <div
                    key={tier.id}
                    className="relative rounded-2xl p-6 border transition-all duration-300 bg-card/50 border-border/30"
                  >
                    <h3 id={tier.id} className="text-lg font-semibold text-foreground mb-2">{tier.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-foreground">
                        {priceFeature?.[tier.key as keyof typeof priceFeature]}
                      </span>
                      <span className="text-sm text-muted-foreground ml-2">
                        {billingFeature?.[tier.key as keyof typeof billingFeature]}
                      </span>
                    </div>
                    <ul className="space-y-2 mb-6">
                      {websiteFeatures.slice(2, 8).map((feature) => {
                        const value = feature[tier.key as keyof typeof feature];
                        if (value === false) return null;
                        return (
                          <li key={feature.name} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-accent shrink-0" />
                            <span className="text-muted-foreground">
                              {feature.name}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="space-y-2">
                      <Link
                        to={tier.href}
                        className="block w-full py-2 px-4 rounded-lg text-center text-sm font-medium text-accent border border-accent/30 hover:bg-accent/10 transition-colors"
                      >
                        See Full Details
                      </Link>
                      <Link
                        to="/contact"
                        className={`block w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
                          tier.ctaStyle === 'primary'
                            ? 'bg-accent text-accent-foreground hover:bg-accent-hover'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                      >
                        {tier.cta}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* T1 Renewal Note */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              Smart Site: $149/year hosting after first year. You own everything.
            </p>
          </div>
        </section>
      )}

      {/* AI Employee Tab */}
      {activeTab === 'ai' && (
        <section id="ai-employee" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            {/* Mode Cards */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {aiModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <div
                    key={mode.id}
                    id={mode.id}
                    className={`rounded-2xl p-6 border transition-all duration-300 hover-lift ${
                      mode.featured
                        ? 'bg-accent/10 border-accent/50 shadow-lg shadow-accent/10'
                        : 'bg-card/50 border-border/30 hover:border-accent/30'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Icon & Name */}
                      <div className="flex items-center gap-4 md:w-1/4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          mode.featured ? 'bg-accent/20' : 'bg-muted'
                        }`}>
                          <Icon className={`w-6 h-6 ${mode.featured ? 'text-accent' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{mode.name}</h3>
                          <p className="text-sm text-muted-foreground">{mode.bestFor}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground md:flex-1">
                        {mode.description}
                      </p>

                      {/* Pricing */}
                      <div className="flex items-center gap-6 md:w-auto">
                        <div className="text-right">
                          <span className="text-2xl font-bold text-foreground">{mode.price}</span>
                          <span className="text-muted-foreground text-sm">/mo</span>
                          <p className="text-xs text-muted-foreground">{mode.setup} setup</p>
                        </div>
                        <Link
                          to={mode.href}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                            mode.featured
                              ? 'bg-accent text-accent-foreground hover:bg-accent-hover'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Missed Call Note */}
            <div className="mt-8 max-w-md mx-auto p-4 rounded-xl bg-accent/5 border border-accent/20 text-center">
              <p className="text-sm text-muted-foreground">
                <span className="text-accent font-medium">All modes include</span> missed call text-back recovery.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Everything you need to know about pricing and plans.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-3">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border border-border/30 rounded-xl px-6 bg-card/30 data-[state=open]:bg-card/50"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground mb-8">
              Book a free strategy call or get started with Smart Site today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="btn-gold btn-glow"
              >
                Book Strategy Call
              </Link>
              <Link
                to="/smart-websites/smart-site"
                className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium"
              >
                Start with Smart Site — $249
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
