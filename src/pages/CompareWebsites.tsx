/**
 * @fileoverview Smart Websites Comparison Page
 * @module pages/CompareWebsites
 * 
 * Award-winning comparison with:
 * - Mobile: Expandable tier cards with inline features (no horizontal scroll)
 * - Desktop: Clean 5-column feature comparison grid with AI Employee styling
 * - Recommended add-ons section per tier
 */

import { useState } from 'react';
import { 
  Check, 
  X,
  Globe, 
  MessageSquare, 
  Zap, 
  TrendingUp, 
  ArrowRight, 
  ChevronDown,
  HelpCircle,
  Mail,
  CreditCard,
  Mic,
  Share2,
  Inbox,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * Animated floating orb background for cards
 */
function CardBackground({ variant }: { variant: 'launch' | 'capture' | 'convert' | 'scale' }) {
  const configs = {
    'launch': {
      orbs: [
        { size: 'w-40 h-40', position: 'top-0 left-0', color: 'bg-accent/15', blur: 'blur-3xl', animation: 'animate-drift-slow', delay: '0s' },
        { size: 'w-32 h-32', position: 'bottom-0 right-0', color: 'bg-accent/10', blur: 'blur-3xl', animation: 'animate-drift-slow-reverse', delay: '2s' },
      ]
    },
    'capture': {
      orbs: [
        { size: 'w-44 h-44', position: 'top-0 right-0', color: 'bg-accent/15', blur: 'blur-3xl', animation: 'animate-drift-slow-reverse', delay: '1s' },
        { size: 'w-36 h-36', position: 'bottom-0 left-0', color: 'bg-accent/10', blur: 'blur-3xl', animation: 'animate-drift-slow', delay: '3s' },
      ]
    },
    'convert': {
      orbs: [
        { size: 'w-48 h-48', position: 'top-0 left-0', color: 'bg-accent/20', blur: 'blur-3xl', animation: 'animate-drift-slow', delay: '0s' },
        { size: 'w-40 h-40', position: 'bottom-0 right-0', color: 'bg-accent/15', blur: 'blur-3xl', animation: 'animate-drift-slow-reverse', delay: '2s' },
      ]
    },
    'scale': {
      orbs: [
        { size: 'w-52 h-52', position: 'top-0 left-0', color: 'bg-accent/25', blur: 'blur-3xl', animation: 'animate-drift-slow', delay: '0s' },
        { size: 'w-44 h-44', position: 'bottom-0 right-0', color: 'bg-accent/20', blur: 'blur-3xl', animation: 'animate-drift-slow-reverse', delay: '2s' },
        { size: 'w-28 h-28', position: 'top-1/2 right-0', color: 'bg-accent/15', blur: 'blur-3xl', animation: 'animate-breathe', delay: '4s' },
      ]
    }
  };

  const config = configs[variant];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {config.orbs.map((orb, idx) => (
        <div
          key={idx}
          className={cn(
            "absolute rounded-full",
            orb.size,
            orb.position,
            orb.color,
            orb.blur,
            orb.animation
          )}
          style={{ 
            animationDelay: orb.delay,
            animationFillMode: 'both'
          }}
        />
      ))}
    </div>
  );
}

/**
 * Tier card data with recommended add-ons
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
    bgVariant: 'launch' as const,
    recommendedAddons: [
      { id: 'email-authority', name: 'Email Authority', price: '$79/mo', icon: Mail }
    ],
  },
  {
    name: 'Capture',
    tagline: 'Never miss a lead',
    price: '$97',
    period: '/mo',
    description: 'Turn every visitor into a potential customer with AI-powered engagement.',
    icon: MessageSquare,
    href: '/smart-websites/smart-lead',
    bgVariant: 'capture' as const,
    recommendedAddons: [
      { id: 'get-paid-now', name: 'Get Paid Now', price: '$49/mo', icon: CreditCard },
      { id: 'ai-voice-chat', name: 'AI Voice Chat', price: '$149/mo', icon: Mic }
    ],
  },
  {
    name: 'Convert',
    tagline: 'Turn visitors into customers',
    price: '$197',
    period: '/mo',
    description: 'Full CRM and booking automation for growing service businesses.',
    icon: Zap,
    href: '/smart-websites/smart-business',
    bgVariant: 'convert' as const,
    recommendedAddons: [
      { id: 'social-autopilot', name: 'Social Autopilot', price: '$97/mo', icon: Share2 },
      { id: 'omnichannel-inbox', name: 'Omnichannel Inbox', price: '$99/mo', icon: Inbox }
    ],
  },
  {
    name: 'Scale',
    tagline: 'AI-powered growth engine',
    price: '$297',
    period: '/mo',
    description: 'Complete business automation from first visit to booked appointment.',
    icon: TrendingUp,
    href: '/smart-websites/smart-growth',
    bgVariant: 'scale' as const,
    recommendedAddons: [
      { id: 'omnichannel-inbox', name: 'Omnichannel Inbox', price: '$99/mo', icon: Inbox },
      { id: 'unlimited-ai', name: 'Unlimited AI', price: '$149/mo', icon: Sparkles }
    ],
    aiEmployeeUpsell: true,
  },
];

/**
 * Feature comparison data organized by category
 */
const featureCategories = [
  {
    name: 'Website Essentials',
    features: [
      { name: 'Custom designed pages', tooltip: 'Number of professionally designed pages included', values: ['5 pages', '5 pages', '7 pages', '10 pages'] },
      { name: 'Fully responsive design', tooltip: 'Looks great on all devices', values: [true, true, true, true] },
      { name: 'SEO optimization', tooltip: 'Built for Google rankings', values: [true, true, true, true] },
      { name: 'Fast CDN hosting', tooltip: 'Lightning-fast page loads worldwide', values: [true, true, true, true] },
      { name: 'SSL certificate', tooltip: 'Secure HTTPS connection', values: [true, true, true, true] },
      { name: 'Custom domain', tooltip: 'Use your own domain name', values: [true, true, true, true] },
      { name: 'Ready in 5 days', tooltip: 'Launch your site in under a week', values: [true, true, true, true] },
    ],
  },
  {
    name: 'Lead Capture',
    features: [
      { name: 'Contact forms', tooltip: 'Professional forms that capture leads', values: [true, true, true, true] },
      { name: 'AI chat widget', tooltip: 'Engage visitors with intelligent chat', values: [false, true, true, true] },
      { name: 'Missed call text-back', tooltip: 'Auto-text leads who call and miss you', values: [false, true, true, true] },
      { name: 'Lead notifications', tooltip: 'Instant alerts for new leads', values: [false, true, true, true] },
      { name: 'CRM integration', tooltip: 'All leads synced to your CRM', values: [false, false, true, true] },
      { name: 'SMS credits/month', tooltip: 'Monthly text message allocation', values: ['—', '400', '600', '1,000'] },
      { name: 'AI chat minutes/month', tooltip: 'Monthly AI conversation allocation', values: ['—', '30 min', '50 min', '100 min'] },
    ],
  },
  {
    name: 'Automation & CRM',
    features: [
      { name: 'Pipeline management', tooltip: 'Track leads through your sales process', values: [false, false, true, true] },
      { name: 'Appointment booking', tooltip: 'Let customers book directly', values: [false, false, true, true] },
      { name: 'Calendar sync', tooltip: 'Sync with Google, Outlook, and more', values: [false, false, true, true] },
      { name: 'Automated follow-ups', tooltip: 'Never forget to follow up', values: [false, false, true, true] },
      { name: 'Review requests', tooltip: 'Automatically request Google reviews', values: [false, false, true, true] },
      { name: 'Unified inbox', tooltip: 'All messages in one place', values: [false, false, false, true] },
      { name: 'Advanced automations', tooltip: 'Complex multi-step workflows', values: [false, false, false, true] },
    ],
  },
  {
    name: 'Support',
    features: [
      { name: 'Email support', tooltip: 'Get help via email', values: [true, true, true, true] },
      { name: 'Chat support', tooltip: 'Real-time chat assistance', values: [false, true, true, true] },
      { name: 'Priority support', tooltip: 'Jump to the front of the queue', values: [false, false, true, true] },
      { name: 'Dedicated success manager', tooltip: 'Your personal account manager', values: [false, false, false, true] },
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
 * Renders a feature value cell for desktop table - styled like AI Employee comparison
 */
function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === 'string' && value !== '—') {
    return (
      <span className="text-sm font-medium text-foreground/90">{value}</span>
    );
  }
  if (value === true) {
    return (
      <div className="w-7 h-7 rounded-full bg-accent/25 flex items-center justify-center mx-auto">
        <Check className="w-4 h-4 text-accent drop-shadow-[0_0_3px_hsl(var(--accent)/0.5)]" />
      </div>
    );
  }
  // false or '—'
  return (
    <div className="w-7 h-7 rounded-full bg-foreground/5 flex items-center justify-center mx-auto">
      <X className="w-3.5 h-3.5 text-foreground/20" />
    </div>
  );
}

/**
 * Mobile tier card with expandable features and recommended add-ons
 */
function MobileTierCard({ tier, tierIndex }: { tier: typeof tiers[0]; tierIndex: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = tier.icon;
  const { included, notIncluded } = getTierFeatures(tierIndex);
  
  return (
    <div 
      className="border rounded-2xl overflow-hidden relative border-border/30 bg-card/30"
    >
      {/* Animated background orbs */}
      <CardBackground variant={tier.bgVariant} />
      
      {/* Card Header */}
      <div className="p-5 relative">
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
          Choose {tier.name}
          <ArrowRight className="w-4 h-4" />
        </Link>
        
        {/* Recommended Add-ons */}
        {tier.recommendedAddons.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border/20">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Recommended Add-ons</p>
            <div className="flex flex-wrap gap-2">
                    {tier.recommendedAddons.map((addon) => {
                      const AddonIcon = addon.icon;
                      return (
                        <Link
                          key={addon.id}
                          to="/smart-websites/add-ons"
                          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors group"
                        >
                          <AddonIcon className="w-3 h-3 text-accent/70 group-hover:text-accent" />
                          <span className="underline underline-offset-2 decoration-border/50 group-hover:decoration-accent/50">{addon.name}</span>
                          <span className="text-foreground/40">{addon.price}</span>
                        </Link>
                      );
                    })}
            </div>
          </div>
        )}
        
        {/* AI Employee Upsell for Scale */}
        {tier.aiEmployeeUpsell && (
          <div className="mt-4 p-3 rounded-xl bg-accent/5 border border-accent/20">
            <p className="text-xs text-accent font-medium mb-1">Need AI Voice Handling?</p>
            <Link
              to="/let-ai-handle-it/after-hours"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              Explore AI Employee plans
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
      
      {/* Expand/Collapse Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-3 px-5 flex items-center justify-between border-t border-border/20 bg-card/50 hover:bg-card/80 transition-colors relative"
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
      {expanded && (
        <div className="p-5 pt-0 space-y-4 border-t border-border/10 relative">
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
          
          {notIncluded.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Not included</p>
              <ul className="space-y-2">
                {notIncluded.slice(0, 5).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" />
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
      )}
    </div>
  );
}

/**
 * CompareWebsites - Award-winning comparison page with AI Employee styling
 */
export default function CompareWebsites() {
  return (
    <TooltipProvider>
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
        
        {/* Gradient Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
        
        {/* Mobile: Stacked Expandable Cards */}
        <section className="py-12 lg:hidden">
          <div className="container mx-auto px-4">
            <div className="space-y-4 max-w-lg mx-auto">
              {tiers.map((tier, idx) => (
                <MobileTierCard key={tier.name} tier={tier} tierIndex={idx} />
              ))}
            </div>
          </div>
        </section>
        
        {/* Desktop: Summary Cards */}
        <section className="py-12 hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.name}
                    className="rounded-2xl p-6 border transition-all duration-300 relative overflow-hidden border-border/30 bg-card/30 hover:border-accent/30"
                  >
                    {/* Animated background orbs */}
                    <CardBackground variant={tier.bgVariant} />
                    
                    <div className="flex flex-col items-center text-center relative">
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
                      
                      {/* Upgrade CTA */}
                      <Link
                        to={tier.href}
                        className="w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                      >
                        Choose {tier.name}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                      
                      {/* Recommended Add-ons */}
                      {tier.recommendedAddons.length > 0 && (
                        <div className="w-full mt-5 pt-4 border-t border-border/20">
                          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Recommended</p>
                          <div className="space-y-2">
                            {tier.recommendedAddons.map((addon) => {
                              const AddonIcon = addon.icon;
                              return (
                                <Link
                                  key={addon.id}
                                  to="/smart-websites/add-ons"
                                  className="flex items-center gap-2 py-1.5 text-xs group"
                                >
                                  <AddonIcon className="w-3.5 h-3.5 text-accent/70 group-hover:text-accent transition-colors" />
                                  <span className="text-muted-foreground group-hover:text-foreground underline underline-offset-2 decoration-border/50 group-hover:decoration-accent/50 transition-colors">{addon.name}</span>
                                  <span className="ml-auto text-foreground/40">{addon.price}</span>
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      
                      {/* AI Employee Upsell for Scale */}
                      {tier.aiEmployeeUpsell && (
                        <div className="w-full mt-4 p-3 rounded-xl bg-accent/5 border border-accent/20 text-left">
                          <p className="text-xs text-accent font-medium mb-1">Need AI Voice Handling?</p>
                          <Link
                            to="/let-ai-handle-it/after-hours"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                          >
                            Explore AI Employee plans
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>
                      )}
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
              <div className="grid grid-cols-5 gap-4 py-4 px-4 mb-2 border-b border-border/30">
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
                <div key={category.name} className="mb-6">
                  <div className="flex items-center gap-2 mb-3 px-4 py-2 bg-card/30 rounded-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">
                      {category.name}
                    </h3>
                  </div>
                  
                  <div className="space-y-0">
                    {category.features.map((feature, featureIdx) => (
                      <div
                        key={feature.name}
                        className={cn(
                          "grid grid-cols-5 gap-4 py-3 px-4 hover:bg-accent/[0.06] transition-colors",
                          featureIdx !== category.features.length - 1 && "border-b border-border/10"
                        )}
                      >
                        <div className="col-span-1 flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{feature.name}</span>
                          {feature.tooltip && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="w-3.5 h-3.5 text-muted-foreground/50 cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent side="right" className="max-w-xs">
                                <p className="text-xs">{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
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
              
              {/* Bottom CTAs Row */}
              <div className="grid grid-cols-5 gap-4 py-6 px-4 mt-6 border-t border-border/30">
                <div className="col-span-1" />
                {tiers.map((tier) => (
                  <div key={tier.name} className="col-span-1 flex justify-center">
                    <Link
                      to={tier.href}
                      className="w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    >
                      Get {tier.name}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Add-Ons Callout */}
        <section className="pb-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-card/30 border border-border/30 text-center">
              <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                Customize with Add-On Packs
              </h2>
              <p className="text-muted-foreground text-sm mb-4">
                Extend any plan with powerful add-ons: Email Authority, Get Paid Now, Social Autopilot, and more.
              </p>
              <Link
                to="/smart-websites/add-ons"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
              >
                View All Add-Ons
                <ArrowRight className="w-4 h-4" />
              </Link>
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
                  Get started with Capture
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </TooltipProvider>
  );
}
