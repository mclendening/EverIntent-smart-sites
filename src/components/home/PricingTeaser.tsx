/**
 * @fileoverview Homepage pricing preview showing AI Employee modes and Smart Site.
 * @module components/home/PricingTeaser
 * 
 * Displays 4 pricing cards prioritizing AI Employee modes first:
 * 1. After Hours ($149/mo) - AI answers after business hours
 * 2. Missed Call Recovery ($149/mo) - SMS text-back for missed calls
 * 3. After Hours + Booking ($197/mo) - Most Popular - includes scheduling
 * 4. Smart Site ($249 one-time) - Entry-level website package
 * 
 * All AI Employee modes include $1,497 one-time setup fee.
 */

import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Pricing tier data for homepage preview.
 * AI Employee modes first, Smart Site last.
 */
const tiers = [
  {
    name: 'After Hours',
    price: '$149',
    period: '/month',
    description: 'AI answers when you can\'t.',
    features: ['AI answers after hours', 'Captures lead details', 'Sends owner summaries'],
    popular: false,
    href: '/pricing#ai-employee',
  },
  {
    name: 'Missed Call Recovery',
    price: '$149',
    period: '/month',
    description: 'Never lose a lead to voicemail.',
    features: ['Texts back missed calls', 'AI qualifies via SMS', 'Books appointments'],
    popular: false,
    href: '/pricing#ai-employee',
  },
  {
    name: 'After Hours + Booking',
    price: '$197',
    period: '/month',
    description: 'Full after-hours coverage with scheduling.',
    features: ['Everything in After Hours', 'Sends booking links', 'Self-service scheduling'],
    popular: true,
    href: '/pricing#ai-employee',
  },
  {
    name: 'Smart Site',
    price: '$249',
    period: 'one-time',
    description: 'Professional website. You own it.',
    features: ['5-page website', 'Mobile responsive', 'SEO-ready', 'Ready in 5 days'],
    popular: false,
    href: '/pricing#smart-websites',
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
        <div className="text-center max-w-2xl mx-auto mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">AI Employee starts at </span>
            <span className="text-gradient">$149/month</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            One setup. Choose your mode. Add a website when ready.
          </p>
        </div>
        
        {/* Setup fee note */}
        <p className="text-center text-sm text-muted-foreground mb-10">
          All AI Employee modes include $1,497 one-time setup
        </p>
        
        {/* Pricing cards - 4 column grid on desktop */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative rounded-2xl p-6 md:p-8 border transition-all duration-300 hover-lift ${
                tier.popular 
                  ? 'bg-primary/5 border-primary/50 shadow-lg shadow-primary/10' 
                  : 'bg-card/50 border-border/30 hover:border-primary/30'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  Most Popular
                </div>
              )}
              
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
              
              <Link
                to={tier.href}
                className={`block w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 ${
                  tier.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
        
        {/* See all plans link */}
        <div className="text-center">
          <Link 
            to="/pricing" 
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
