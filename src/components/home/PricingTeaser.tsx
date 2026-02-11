/**
 * @fileoverview Homepage pricing preview per BRD v35.1.
 * @module components/home/PricingTeaser
 * 
 * Displays 4 pricing cards:
 * 1. Smart Site ($249 one-time)
 * 2. Smart Lead ($97/mo)
 * 3. Smart Business ($197/mo) - Most Popular
 * 4. AI Employee ($197/mo starting)
 */

import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Pricing tier data for homepage preview per BRD v35.1.
 */
const tiers = [
  {
    name: 'Launch',
    price: '$249',
    period: 'one-time',
    description: 'Get online fast. You own it.',
    features: ['5-page website', 'Mobile responsive', 'SEO-ready', 'Ready in 5 days'],
    href: '/smart-websites/launch',
  },
  {
    name: 'Capture',
    price: '$97',
    period: '/month',
    description: 'Never miss a lead.',
    features: ['Missed call text-back', 'AI chat widget', 'GBP sync', 'Lead management'],
    href: '/smart-websites/capture',
  },
  {
    name: 'Convert',
    price: '$197',
    period: '/month',
    description: 'Turn visitors into customers.',
    features: ['Online booking', 'Review automation', 'CRM pipelines', 'SMS campaigns'],
    href: '/smart-websites/convert',
  },
  {
    name: 'AI Employee',
    price: 'from $197',
    period: '/month',
    description: 'Voice AI that answers your phone.',
    features: ['24/7 call handling', 'Books appointments', 'Qualifies leads', 'Custom training'],
    href: '/let-ai-handle-it/after-hours',
  },
];

/**
 * Four-column pricing preview with AI Employee modes and Smart Site.
 * Highlights "Most Popular" tier (After Hours + Booking) with accent styling.
 * 
 * @component
 * @example
 * <PricingTeaser />
 */
export function PricingTeaser() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-20" />
      
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Smart Websites from </span>
            <span className="text-gradient">$249</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Professional websites with AI-powered lead capture. Upgrade as you grow.
          </p>
        </div>
        
        {/* Pricing cards - 4 column grid on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className="relative rounded-2xl p-6 md:p-8 border transition-all duration-300 hover-lift bg-card/50 border-border/30 hover:border-primary/30"
            >
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-1">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>
              
              <div className="mb-5">
                <span className="text-3xl md:text-4xl font-bold text-foreground">{tier.price}</span>
                <span className="text-muted-foreground text-sm">{tier.period}</span>
              </div>
              
              <ul className="space-y-2.5 mb-6">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <a
                href={tier.href}
                className="block w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
        
        {/* See all plans link */}
        <div className="text-center">
          <Link 
            to="/compare-websites" 
            className="inline-flex items-center gap-2 text-primary font-medium group"
          >
            <span className="story-link">Compare all plans</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
