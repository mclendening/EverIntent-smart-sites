/**
 * @fileoverview Pricing Preview - Elegant cards
 * @module components/home/PricingTeaser
 */

import { Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const tiers = [
  {
    name: 'Smart Site',
    price: '$249',
    period: 'one-time',
    description: 'Professional website. You own it.',
    features: ['5-page website', 'Mobile responsive', 'SEO-ready', 'Ready in 5 days'],
    popular: false,
    href: '/pricing#smart-site',
  },
  {
    name: 'Smart Lead',
    price: '$97',
    period: '/mo',
    description: 'For businesses who need lead capture.',
    features: ['Missed call text-back', 'AI chat widget', 'GBP sync', 'Lead management'],
    popular: false,
    href: '/pricing#smart-lead',
  },
  {
    name: 'Smart Business',
    price: '$197',
    period: '/mo',
    description: 'Full automation for growing teams.',
    features: ['Online booking', 'Review automation', 'CRM pipelines', 'SMS campaigns'],
    popular: true,
    href: '/pricing#smart-business',
  },
  {
    name: 'AI Employee',
    price: '$497',
    period: '/mo',
    description: 'Voice AI that answers your phone.',
    features: ['24/7 call handling', 'Books appointments', 'Qualifies leads', 'Custom training'],
    popular: false,
    href: '/pricing#ai-employee',
  },
];

/**
 * Four-column pricing with refined styling.
 */
export function PricingTeaser() {
  return (
    <section className="section bg-card/30 border-t border-border/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
            Pricing
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Smart Websites from <span className="text-gradient">$249</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Professional websites with AI-powered lead capture. Upgrade as you grow.
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
          {tiers.map((tier) => (
            <div 
              key={tier.name}
              className={`relative p-8 border transition-all duration-500 ${
                tier.popular 
                  ? 'border-accent/50 bg-card' 
                  : 'border-border/20 bg-card/50 hover:border-border/40'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-6 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium">
                  Most Popular
                </div>
              )}
              
              <h3 className="font-serif text-xl text-foreground mb-2">{tier.name}</h3>
              <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
              
              <div className="mb-6">
                <span className="font-serif text-4xl text-foreground">{tier.price}</span>
                <span className="text-muted-foreground text-sm">{tier.period}</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                to={tier.href}
                className={`block w-full py-3 px-4 text-center text-sm font-medium transition-all duration-400 ${
                  tier.popular
                    ? 'bg-accent text-accent-foreground hover:brightness-110'
                    : 'border border-border/50 text-foreground hover:border-accent/50 hover:text-accent'
                }`}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link 
            to="/pricing" 
            className="inline-flex items-center gap-2 text-accent text-sm font-medium group"
          >
            Compare all plans
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
