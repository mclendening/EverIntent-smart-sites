/**
 * @fileoverview Pricing page with tabs for Smart Websites and AI Employee.
 * @module pages/Pricing
 * 
 * Consolidated AI Employee Plans:
 * - After-Hours: $197/mo + $997 setup (includes booking + missed call recovery)
 * - Front Office: $297/mo + $1,497 setup (includes missed call recovery)
 * - Full AI Employee: $597/mo + $2,500 setup
 * - Web Chat Only: $79/mo + $497 setup
 * 
 * Smart Websites:
 * - Smart Site (T1): $249 one-time, $149/yr after Y1
 * - Smart Lead (T2): $97/mo
 * - Smart Business (T3): $197/mo
 * - Smart Growth (T4): $297/mo
 */

import { useState, useEffect } from 'react';
import { Check, Minus, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { SEO } from '@/components/SEO';

import afterHoursImg from '@/assets/lifestyle/after-hours-call.jpg';
import frontOfficeImg from '@/assets/lifestyle/front-office-desk.jpg';
import fullAiImg from '@/assets/lifestyle/full-ai-command.jpg';
import webChatImg from '@/assets/lifestyle/web-chat-widget.jpg';
import smartWebsiteHvacImg from '@/assets/lifestyle/smart-website-hvac.jpg';
import missedCallImg from '@/assets/lifestyle/missed-call-recovery.jpg';
import resultsDashboardImg from '@/assets/lifestyle/results-dashboard.jpg';
import revenueGrowthImg from '@/assets/lifestyle/revenue-growth.jpg';
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
  { name: 'Price', t1: '$249', t2: '$97/mo', t3: '$197/mo', t4: '$297/mo' },
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
  { id: 'launch', name: 'Launch', key: 't1', cta: 'Get Started', ctaStyle: 'secondary' as const, href: '/smart-websites/launch', checkoutHref: '/checkout/launch', image: smartWebsiteHvacImg, imageAlt: 'Professional business website displayed on laptop screen', description: 'Get online fast with a professional 5-page website. Mobile responsive, SEO-ready, delivered in 5 days.' },
  { id: 'capture', name: 'Capture', key: 't2', cta: 'Get Started', ctaStyle: 'primary' as const, href: '/smart-websites/capture', checkoutHref: '/checkout/capture', image: missedCallImg, imageAlt: 'Smartphone showing missed call text-back notification from AI', description: 'Never miss a lead. AI chat widget, missed call text-back, CRM, and Google Business Profile sync.' },
  { id: 'convert', name: 'Convert', key: 't3', cta: 'Get Started', ctaStyle: 'primary' as const, href: '/smart-websites/convert', checkoutHref: '/checkout/convert', image: resultsDashboardImg, imageAlt: 'Business dashboard showing booking and review automation metrics', description: 'Turn visitors into customers with online booking, review automation, CRM pipelines, and SMS campaigns.' },
  { id: 'scale', name: 'Scale', key: 't4', cta: 'Get Started', ctaStyle: 'secondary' as const, href: '/smart-websites/scale', checkoutHref: '/checkout/scale', image: revenueGrowthImg, imageAlt: 'Revenue growth chart showing business scaling results', description: 'AI-powered growth engine with advanced automations, unified inbox, strategy calls, and full CRM.' },
];

// ============================================
// DATA - AI Employee Plans (Consolidated)
// ============================================

const aiPlans = [
  {
    id: 'after-hours',
    name: 'After-Hours',
    image: afterHoursImg,
    imageAlt: 'Contractor checking phone at night for new appointment booking',
    bestFor: 'Complete after-hours coverage',
    price: '$197',
    setup: '$997',
    description: 'AI answers after hours, books appointments, and texts back missed calls. Never lose a lead when you\'re closed.',
    href: '/let-ai-handle-it/after-hours',
    checkoutHref: '/checkout/after-hours',
  },
  {
    id: 'front-office',
    name: 'Front Office',
    image: frontOfficeImg,
    imageAlt: 'Busy front desk receptionist answering phones',
    bestFor: 'Screen, qualify, and transfer',
    price: '$297',
    setup: '$1,497',
    description: 'AI screens all calls, qualifies leads, recovers missed calls, and transfers hot opportunities live.',
    href: '/let-ai-handle-it/front-office',
    checkoutHref: '/checkout/front-office',
  },
  {
    id: 'full',
    name: 'Full AI Employee',
    image: fullAiImg,
    imageAlt: 'Business command center with multiple AI dashboard screens',
    bestFor: 'Complete AI-powered front office',
    price: '$597',
    setup: '$2,500',
    description: 'All features included. Your complete AI-powered front office: voice, SMS, booking, screening, web chat, and Unlimited AI.',
    featured: true,
    href: '/let-ai-handle-it/full-ai-employee',
    checkoutHref: '/checkout/full-ai',
  },
  {
    id: 'web-chat',
    name: 'Web Chat Only',
    image: webChatImg,
    imageAlt: 'Laptop showing AI chat widget conversation',
    bestFor: 'Website chat without phone',
    price: '$79',
    setup: '$497',
    description: 'AI chat widget for your website. Capture leads 24/7 without voice AI.',
    href: '/contact',
    checkoutHref: '/checkout/web-chat',
  },
];

// ============================================
// DATA - FAQ
// ============================================

const faqItems = [
  {
    question: "What's included in the one-time $249 price?",
    answer: "Launch includes a professional 5-page website, mobile responsive design, SSL certificate, basic SEO setup, contact form, and Google Maps integration. You own the website forever. After the first year, hosting is just $149/year.",
  },
  {
    question: "Can I upgrade from Launch to Capture later?",
    answer: "Yes! You can upgrade to any higher tier at any time. We'll migrate everything seamlessly and prorate your billing. No rebuilds required. Every tier is upgrade-ready from day one.",
  },
  {
    question: "What happens if I exceed my SMS limit?",
    answer: "We'll notify you when you're approaching your limit. Additional SMS are billed at $0.015 each. You can also upgrade to a higher tier for more included messages.",
  },
  {
    question: "Do I own my website?",
    answer: "Yes, you own everything. Launch customers get the source code delivered. Higher tiers include hosting, but you can export and self-host anytime. No lock-in.",
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
    question: "Do all AI Employee plans include missed call text-back?",
    answer: "Yes! All AI Employee plans include missed call text-back recovery. When you can't answer, AI texts the caller within 60 seconds to keep the lead warm.",
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
        title="Pricing"
        description="Websites from $249. AI automation from $197/mo. No contracts, no hidden fees. Serving Long Beach, LA & Orange County."
        canonical="/pricing"
        structuredData={faqSchema}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden" aria-label="Pricing overview">
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
            <a 
              href={activeTab === 'websites' ? '/compare-websites' : '/compare-ai-employee'}
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors text-sm font-medium"
            >
              <span className="story-link">Compare all {activeTab === 'websites' ? 'website' : 'AI'} plans</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Smart Websites Tab */}
      {activeTab === 'websites' && (
        <section id="smart-websites" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            {/* Plan Cards - matching AI Employee layout */}
            <div className="space-y-4 max-w-4xl mx-auto mb-16">
              {websiteTiers.map((tier) => {
                const priceFeature = websiteFeatures.find(f => f.name === 'Price');
                const billingFeature = websiteFeatures.find(f => f.name === 'Billing');
                return (
                  <div
                    key={tier.id}
                    id={tier.id}
                    className="rounded-2xl p-6 border transition-all duration-300 hover-lift bg-card/50 border-border/30 hover:border-accent/30"
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Image & Name */}
                      <div className="flex items-center gap-4 md:w-1/4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                          <img src={tier.image} alt={tier.imageAlt} className="w-full h-full object-cover" loading="lazy" width="48" height="48" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{tier.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {priceFeature?.[tier.key as keyof typeof priceFeature]} {billingFeature?.[tier.key as keyof typeof billingFeature]}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground md:flex-1">
                        {tier.description}
                      </p>

                      {/* Pricing & CTA */}
                      <div className="flex items-center gap-4 md:w-auto">
                        <a
                          href={tier.href}
                          className="text-sm text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
                        >
                          See Details →
                        </a>
                        <a
                          href={tier.checkoutHref}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                            tier.ctaStyle === 'primary'
                              ? 'bg-accent text-accent-foreground hover:bg-accent-hover'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          {tier.cta}
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

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
                          <a
                            href={tier.href}
                            className="inline-flex items-center justify-center gap-1.5 text-sm text-accent hover:text-accent/80 transition-colors"
                          >
                            See Details
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        <a
                            href={tier.checkoutHref}
                            className={`inline-block px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                              tier.ctaStyle === 'primary'
                                ? 'bg-accent text-accent-foreground hover:bg-accent-hover shadow-md'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                          >
                            {tier.cta}
                          </a>
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>


            {/* T1 Renewal Note */}
            <p className="text-center text-sm text-muted-foreground mt-8">
              Launch: $149/year hosting after first year. You own everything.
            </p>
          </div>
        </section>
      )}

      {/* AI Employee Tab */}
      {activeTab === 'ai' && (
        <section id="ai-employee" className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            {/* Plan Cards */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {aiPlans.map((plan) => (
                  <div
                    key={plan.id}
                    id={plan.id}
                    className={`rounded-2xl p-6 border transition-all duration-300 hover-lift ${
                      plan.featured
                        ? 'bg-accent/10 border-accent/50 shadow-lg shadow-accent/10'
                        : 'bg-card/50 border-border/30 hover:border-accent/30'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Image & Name */}
                      <div className="flex items-center gap-4 md:w-1/4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                          <img src={plan.image} alt={plan.imageAlt} className="w-full h-full object-cover" loading="lazy" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">{plan.bestFor}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground md:flex-1">
                        {plan.description}
                      </p>

                      {/* Pricing */}
                      <div className="flex items-center gap-6 md:w-auto">
                        <div className="text-right">
                          <span className="text-2xl font-bold text-foreground">{plan.price}</span>
                          <span className="text-muted-foreground text-sm">/mo</span>
                          <p className="text-xs text-muted-foreground">{plan.setup} setup</p>
                        </div>
                        <a
                          href={plan.checkoutHref}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                            plan.featured
                              ? 'bg-accent text-accent-foreground hover:bg-accent-hover'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          Get Started
                        </a>
                        <a
                          href={plan.href}
                          className="text-sm text-accent hover:text-accent/80 transition-colors whitespace-nowrap"
                        >
                          See Details →
                        </a>
                        {(plan.id === 'front-office' || plan.id === 'full') && (
                          <a
                            href="/contact"
                            className="px-4 py-2 rounded-lg text-sm font-medium border border-border hover:bg-muted transition-colors whitespace-nowrap"
                          >
                            Book a Call
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
              ))}


            </div>

            {/* Missed Call Note */}
            <div className="mt-8 max-w-md mx-auto p-4 rounded-xl bg-accent/5 border border-accent/20 text-center">
              <p className="text-sm text-muted-foreground">
                <span className="text-accent font-medium">All plans include</span> missed call text-back recovery.
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
              Book a free strategy call or get started with Launch today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/checkout/launch"
                className="btn-gold btn-glow"
              >
                Start with Launch: $249
              </a>
              <a
                href="/contact"
                className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors font-medium"
              >
                Book Strategy Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Pricing;
