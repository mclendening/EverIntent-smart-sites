/**
 * @fileoverview Smart Websites Comparison Page
 * @module pages/CompareWebsites
 * 
 * Award-winning comparison with:
 * - Mobile: Expandable tier cards with inline features (no horizontal scroll)
 * - Desktop: Clean 5-column feature comparison grid
 */

import { useState } from 'react';
import { Check, Minus, Globe, MessageSquare, Zap, TrendingUp, ArrowRight, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { cn } from '@/lib/utils';

/**
 * Tier card data
 */
const tiers = [
  {
    name: 'Launch',
    tagline: 'Get online fast',
    price: '$249',
    period: ' one-time',
    description: 'A beautiful, fast website that establishes credibility and trust.',
    icon: Globe,
    href: '/smart-websites/smart-site',
  },
  {
    name: 'Capture',
    tagline: 'Never miss a lead',
    price: '$97',
    period: '/mo',
    description: 'Turn every visitor into a potential customer with AI-powered engagement.',
    icon: MessageSquare,
    href: '/smart-websites/smart-lead',
  },
  {
    name: 'Convert',
    tagline: 'Turn visitors into customers',
    price: '$197',
    period: '/mo',
    description: 'Full CRM and booking automation for growing service businesses.',
    icon: Zap,
    href: '/smart-websites/smart-business',
  },
  {
    name: 'Scale',
    tagline: 'AI-powered growth engine',
    price: '$297',
    period: '/mo',
    description: 'Complete business automation from first visit to booked appointment.',
    icon: TrendingUp,
    href: '/smart-websites/smart-growth',
  },
];

/**
 * Feature comparison data organized by category
 */
const featureCategories = [
  {
    name: 'Website Essentials',
    features: [
      { name: 'Custom designed pages', values: ['5 pages', '5 pages', '7 pages', '10 pages'] },
      { name: 'Fully responsive design', values: [true, true, true, true] },
      { name: 'SEO optimization', values: [true, true, true, true] },
      { name: 'Fast CDN hosting', values: [true, true, true, true] },
      { name: 'SSL certificate', values: [true, true, true, true] },
      { name: 'Custom domain', values: [true, true, true, true] },
      { name: 'Ready in 5 days', values: [true, true, true, true] },
    ],
  },
  {
    name: 'Lead Capture',
    features: [
      { name: 'Contact forms', values: [true, true, true, true] },
      { name: 'AI chat widget', values: [false, true, true, true] },
      { name: 'Missed call text-back', values: [false, true, true, true] },
      { name: 'Lead notifications', values: [false, true, true, true] },
      { name: 'CRM integration', values: [false, false, true, true] },
      { name: 'SMS credits/month', values: ['—', '400', '600', '1,000'] },
      { name: 'AI chat minutes/month', values: ['—', '30 min', '50 min', '100 min'] },
    ],
  },
  {
    name: 'Automation & CRM',
    features: [
      { name: 'Pipeline management', values: [false, false, true, true] },
      { name: 'Appointment booking', values: [false, false, true, true] },
      { name: 'Calendar sync', values: [false, false, true, true] },
      { name: 'Automated follow-ups', values: [false, false, true, true] },
      { name: 'Review requests', values: [false, false, true, true] },
      { name: 'Unified inbox', values: [false, false, false, true] },
      { name: 'Advanced automations', values: [false, false, false, true] },
    ],
  },
  {
    name: 'Support',
    features: [
      { name: 'Email support', values: [true, true, true, true] },
      { name: 'Chat support', values: [false, true, true, true] },
      { name: 'Priority support', values: [false, false, true, true] },
      { name: 'Dedicated success manager', values: [false, false, false, true] },
    ],
  },
];

/**
 * Get all features for a specific tier index
 */
function getTierFeatures(tierIndex: number) {
  const included: string[] = [];
  const notIncluded: string[] = [];
  
  featureCategories.forEach(category => {
    category.features.forEach(feature => {
      const value = feature.values[tierIndex];
      if (value === true) {
        included.push(feature.name);
      } else if (value === false) {
        notIncluded.push(feature.name);
      } else if (typeof value === 'string' && value !== '—') {
        included.push(`${feature.name}: ${value}`);
      }
    });
  });
  
  return { included, notIncluded };
}

/**
 * Renders a feature value cell for desktop table
 */
function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-accent mx-auto" />;
  }
  if (value === false) {
    return <Minus className="w-5 h-5 text-muted-foreground/30 mx-auto" />;
  }
  return <span className="text-sm text-foreground">{value}</span>;
}

/**
 * Mobile tier card with expandable features
 */
function MobileTierCard({ tier, tierIndex }: { tier: typeof tiers[0]; tierIndex: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = tier.icon;
  const { included, notIncluded } = getTierFeatures(tierIndex);
  
  return (
    <div className="border border-border/30 rounded-2xl bg-card/30 overflow-hidden">
      {/* Card Header - Always visible */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
              <div className="text-right shrink-0">
                <span className="text-xl font-bold text-foreground">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{tier.description}</p>
          </div>
        </div>
        
        {/* CTA Button */}
        <Link
          to={tier.href}
          className="mt-4 w-full py-3 px-4 rounded-xl text-center text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-accent/10 text-accent hover:bg-accent/20"
        >
          Learn More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Expand/Collapse Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-3 px-5 flex items-center justify-between border-t border-border/20 bg-card/50 hover:bg-card/80 transition-colors"
      >
        <span className="text-sm text-muted-foreground">
          {expanded ? 'Hide features' : `View ${included.length} features`}
        </span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-300",
            expanded && "rotate-180"
          )} 
        />
      </button>
      
      {/* Expandable Feature List */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          expanded ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-5 pt-0 space-y-4">
          {/* Included Features */}
          {included.length > 0 && (
            <div>
              <p className="text-xs text-accent uppercase tracking-wider font-medium mb-3">Included</p>
              <ul className="space-y-2">
                {included.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Not Included - Show a sample */}
          {notIncluded.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Not included</p>
              <ul className="space-y-2">
                {notIncluded.slice(0, 5).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Minus className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground/60">{feature}</span>
                  </li>
                ))}
                {notIncluded.length > 5 && (
                  <li className="text-xs text-muted-foreground/50 pl-6">
                    +{notIncluded.length - 5} more
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * CompareWebsites - Award-winning comparison page
 */
export default function CompareWebsites() {
  return (
    <>
      <SEO
        title="Compare Smart Websites"
        description="Compare Smart Website tiers side-by-side. From $249 one-time to full automation at $297/mo. Find the perfect plan for your business."
        canonical="/compare-websites"
      />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          
          <div className="relative container mx-auto px-4 text-center">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
              Smart Website Plans
            </p>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Choose Your </span>
              <span className="text-gradient">Smart Website</span>
            </h1>
            
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              From simple presence to full automation. Every website is designed to convert.
            </p>
          </div>
        </section>
        
        {/* Mobile: Stacked Expandable Cards */}
        <section className="pb-16 lg:hidden">
          <div className="container mx-auto px-4">
            <div className="space-y-4 max-w-lg mx-auto">
              {tiers.map((tier, idx) => (
                <MobileTierCard key={tier.name} tier={tier} tierIndex={idx} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Desktop: Summary Cards */}
        <section className="pb-12 hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.name}
                    className="rounded-2xl p-6 border border-border/30 bg-card/30 hover:border-accent/30 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{tier.tagline}</p>
                      
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                        <span className="text-muted-foreground text-sm">{tier.period}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-5">{tier.description}</p>
                      
                      <Link
                        to={tier.href}
                        className="w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      >
                        Choose Plan
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        
        {/* Desktop: Feature Comparison Table */}
        <section className="pb-24 hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Column Headers */}
              <div className="grid grid-cols-5 gap-4 py-4 px-4 mb-6 border-b border-border/30">
                <div className="col-span-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Feature</span>
                </div>
                {tiers.map((tier) => (
                  <div key={tier.name} className="col-span-1 text-center">
                    <span className="text-sm font-semibold text-foreground">{tier.name}</span>
                    <p className="text-xs text-muted-foreground">{tier.price}{tier.period}</p>
                  </div>
                ))}
              </div>
              
              {/* Feature Categories */}
              {featureCategories.map((category) => (
                <div key={category.name} className="mb-8">
                  <div className="flex items-center gap-2 mb-4 px-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">
                      {category.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-1">
                    {category.features.map((feature) => (
                      <div
                        key={feature.name}
                        className="grid grid-cols-5 gap-4 py-3 px-4 rounded-lg hover:bg-card/50 transition-colors"
                      >
                        <div className="col-span-1 flex items-center">
                          <span className="text-sm text-muted-foreground">{feature.name}</span>
                        </div>
                        {feature.values.map((value, idx) => (
                          <div key={idx} className="col-span-1 flex items-center justify-center">
                            <FeatureValue value={value} />
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Bottom CTA */}
        <section className="pb-20 md:pb-28">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-xl mx-auto p-6 md:p-8 rounded-2xl bg-card/30 border border-border/30">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Ready to grow your business?
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mb-5">
                Get a website that works as hard as you do.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
                >
                  Ask a question
                </Link>
                <Link
                  to="/smart-websites/smart-lead"
                  className="btn-gold px-5 py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm"
                >
                  Get started today
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
