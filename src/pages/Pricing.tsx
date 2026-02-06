/**
 * @fileoverview Pricing page with tabs for Smart Websites and AI Employee.
 * @module pages/Pricing
 * 
 * BRD v35.0 Pricing (from GAP-FIX-PROMPT-CHAIN.md Prompt 1):
 * 
 * Smart Websites:
 * - Smart Site (T1): $249 one-time, $149/yr after Y1
 * - Smart Lead (T2): $97/mo, 400 SMS, 30 AI min
 * - Smart Business (T3): $197/mo, 600 SMS, 50 AI min
 * - Smart Growth (T4): $497/mo, 1000 SMS, 100 AI min
 * 
 * AI Employee Modes:
 * - After Hours: $149/mo + $1,497 setup
 * - After Hours + Booking: $197/mo + $1,497 setup
 * - Missed Call Recovery: $149/mo + $1,497 setup
 * - Front Line Screening: $297/mo + $1,497 setup
 * - Full AI Employee: 15% bundle discount + $1,497 setup
 * - Web Chat Only: $79/mo + $497 setup
 */

import { useState } from 'react';
import { Check, Minus, ArrowRight, Phone, Moon, Calendar, PhoneForwarded, Filter, Bot, MessageSquare, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
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
  { id: 'smart-site', name: 'Smart Site', key: 't1', cta: 'Get Started — $249', ctaStyle: 'secondary' },
  { id: 'smart-lead', name: 'Smart Lead', key: 't2', cta: 'Start Free Trial', ctaStyle: 'primary', popular: true },
  { id: 'smart-business', name: 'Smart Business', key: 't3', cta: 'Start Free Trial', ctaStyle: 'primary' },
  { id: 'smart-growth', name: 'Smart Growth', key: 't4', cta: 'Book a Demo', ctaStyle: 'secondary' },
];

// ============================================
// DATA - AI Employee Modes
// ============================================

const aiModes = [
  {
    id: 'after-hours',
    name: 'After Hours',
    icon: Moon,
    bestFor: 'Answer calls when you are closed',
    price: '$149',
    setup: '$1,497',
    description: 'You close at 5pm. Your AI does not. Answer calls, take messages, qualify leads.',
  },
  {
    id: 'booking',
    name: 'After Hours + Booking',
    icon: Calendar,
    bestFor: 'Let AI book appointments',
    price: '$197',
    setup: '$1,497',
    description: 'Everything in After Hours, plus AI can send booking links and confirm appointments.',
  },
  {
    id: 'missed-call',
    name: 'Missed Call Recovery',
    icon: PhoneForwarded,
    bestFor: 'Text back every missed call in under 60s',
    price: '$149',
    setup: '$1,497',
    description: 'Every missed call gets a text within 60 seconds. AI starts the conversation before they call your competitor.',
  },
  {
    id: 'screening',
    name: 'Front Line Screening',
    icon: Filter,
    bestFor: 'AI answers, screens, transfers',
    price: '$297',
    setup: '$1,497',
    description: 'AI answers during business hours. Handles FAQs, qualifies leads, transfers hot opportunities to you live.',
  },
  {
    id: 'full',
    name: 'Full AI Employee',
    icon: Bot,
    bestFor: 'Everything above',
    price: '15% off',
    setup: '$1,497',
    description: 'All modes combined. Your complete AI-powered front office.',
    featured: true,
  },
  {
    id: 'web-chat',
    name: 'Web Chat Only',
    icon: MessageSquare,
    bestFor: 'Website chat without phone',
    price: '$79',
    setup: '$497',
    description: 'AI chat widget for your website. Capture leads 24/7 without voice AI.',
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
    answer: "The $1,497 setup includes custom AI training for your business, integration with your existing systems (calendar, CRM, phone), workflow configuration, and 30-day optimization. Most setups are live within 5-7 business days.",
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
  const [activeTab, setActiveTab] = useState<'websites' | 'ai'>('websites');

  return (
    <>
      <SEO
        title="Pricing | Smart Websites & AI Employee | EverIntent"
        description="Professional websites from $249. AI automation from $149/month. Simple pricing with no contracts. See all plans and choose the right fit for your business."
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
            Professional websites from $249. AI automation from $149/month.
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
              to={activeTab === 'websites' ? '/compare-websites' : '/let-ai-handle-it'}
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
                          {tier.popular && (
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent/20 text-accent text-xs font-medium rounded-full border border-accent/30 backdrop-blur-sm">
                              Most Popular
                            </span>
                          )}
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
                    className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                      tier.popular
                        ? 'bg-accent/5 border-accent/50 shadow-lg shadow-accent/10'
                        : 'bg-card/50 border-border/30'
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
                        Most Popular
                      </div>
                    )}
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
                      {websiteFeatures.slice(2).map((feature) => {
                        const value = feature[tier.key as keyof typeof feature];
                        if (value === false) return null;
                        return (
                          <li key={feature.name} className="flex items-center gap-2 text-sm">
                            <Check className="w-4 h-4 text-accent shrink-0" />
                            <span className="text-muted-foreground">
                              {feature.name}
                              {typeof value === 'string' && value !== 'View' && value !== 'Full' && ` (${value})`}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
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
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{mode.name}</h3>
                            {mode.featured && (
                              <span className="px-2 py-0.5 bg-accent text-accent-foreground text-xs font-medium rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3" />
                                Most Complete
                              </span>
                            )}
                          </div>
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
                          {mode.price !== '15% off' && <span className="text-muted-foreground text-sm">/mo</span>}
                          <p className="text-xs text-muted-foreground">{mode.setup} setup</p>
                        </div>
                        <Link
                          to={mode.featured ? '/let-ai-handle-it' : '/contact'}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                            mode.featured
                              ? 'bg-accent text-accent-foreground hover:bg-accent-hover'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {mode.featured ? 'Calculate Bundle' : 'Get Started'}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* See AI in Action CTA */}
            <div className="text-center mt-12">
              <Link
                to="/let-ai-handle-it"
                className="inline-flex items-center gap-2 text-accent font-medium group"
              >
                <span className="story-link">See AI in Action</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-border/30 bg-card/50 px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-left text-foreground hover:text-accent py-4">
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

      {/* Final CTA */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            Not sure which plan?
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Book a free 15-minute call. We'll help you find the right fit.
          </p>
          <Link
            to="/contact"
            className="btn-gold btn-glow"
          >
            Book a Call
          </Link>
        </div>
      </section>
    </>
  );
};

export default Pricing;
