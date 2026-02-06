/**
 * @fileoverview Smart Websites Comparison Page
 * @module pages/CompareWebsites
 * 
 * Full-page comparison of Smart Website tiers with:
 * - Tier summary cards at top
 * - Detailed feature-by-feature comparison table
 * - Category headers for organization
 * - Mobile horizontal scroll support
 */

import { Check, Minus, Globe, MessageSquare, Zap, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';

/**
 * Tier card data for the summary section
 */
const tiers = [
  {
    name: 'Smart Site',
    tagline: 'Professional presence',
    highlight: 'Look professional instantly',
    price: '$249',
    period: 'one-time',
    description: 'A beautiful, fast website that establishes credibility and trust.',
    icon: Globe,
    href: '/smart-websites/smart-site',
    recommended: false,
  },
  {
    name: 'Smart Lead',
    tagline: 'Capture & convert',
    highlight: '3x more leads captured',
    price: '$97',
    period: '/mo',
    description: 'Turn every visitor into a potential customer with AI-powered engagement.',
    icon: MessageSquare,
    href: '/smart-websites/smart-lead',
    recommended: true,
  },
  {
    name: 'Smart Business',
    tagline: 'Automate operations',
    highlight: 'Run on autopilot',
    price: '$197',
    period: '/mo',
    description: 'Full CRM and booking automation for growing service businesses.',
    icon: Zap,
    href: '/smart-websites/smart-business',
    recommended: false,
  },
  {
    name: 'Smart Growth',
    tagline: 'Full automation',
    highlight: 'Fully automated growth',
    price: '$297',
    period: '/mo',
    description: 'Complete business automation from first visit to booked appointment.',
    icon: TrendingUp,
    href: '/smart-websites/smart-growth',
    recommended: false,
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
      { name: 'SMS credits/month', values: [false, '400', '600', '1,000'] },
      { name: 'AI chat minutes/month', values: [false, '30 min', '50 min', '100 min'] },
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
 * Renders a feature value cell
 */
function FeatureValue({ value }: { value: boolean | string }) {
  if (value === true) {
    return <Check className="w-5 h-5 text-accent mx-auto" />;
  }
  if (value === false) {
    return <Minus className="w-5 h-5 text-muted-foreground/40 mx-auto" />;
  }
  return <span className="text-sm text-foreground">{value}</span>;
}

/**
 * CompareWebsites - Standalone comparison page for Smart Website tiers
 */
export default function CompareWebsites() {
  return (
    <>
      <SEO
        title="Compare Smart Websites | EverIntent"
        description="Compare Smart Website tiers side-by-side. From $249 one-time to full automation at $297/mo. Find the perfect plan for your business."
        canonical="/compare-websites"
      />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          
          <div className="relative container mx-auto px-4 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 mb-6">
              <Globe className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">Compare Websites</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Choose Your </span>
              <span className="text-gradient">Smart Website</span>
            </h1>
            
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From simple presence to full automation. Every website is designed to convert.
            </p>
          </div>
        </section>
        
        {/* Tier Cards */}
        <section className="pb-12 md:pb-16">
          <div className="container mx-auto px-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {tiers.map((tier) => {
                const Icon = tier.icon;
                return (
                  <div
                    key={tier.name}
                    className={`relative rounded-2xl p-6 border transition-all duration-300 ${
                      tier.recommended
                        ? 'bg-primary/5 border-primary/50 shadow-lg shadow-primary/10'
                        : 'bg-card/50 border-border/30 hover:border-primary/30'
                    }`}
                  >
                    {tier.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        RECOMMENDED
                      </div>
                    )}
                    
                    <div className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      
                      <h3 className="text-lg font-semibold text-foreground">{tier.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{tier.tagline}</p>
                      
                      <div className="flex items-center gap-1 text-sm text-accent mb-4">
                        <Sparkles className="w-3 h-3" />
                        <span>{tier.highlight}</span>
                      </div>
                      
                      <div className="mb-4">
                        <span className="text-3xl font-bold text-foreground">{tier.price}</span>
                        <span className="text-muted-foreground text-sm">{tier.period}</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-6">{tier.description}</p>
                      
                      <Link
                        to={tier.href}
                        className={`w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                          tier.recommended
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
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
        
        {/* Feature Comparison Table */}
        <section className="pb-24 md:pb-32">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Scrollable table wrapper for mobile */}
              <div className="overflow-x-auto -mx-4 px-4">
                <div className="min-w-[700px]">
                  {featureCategories.map((category) => (
                    <div key={category.name} className="mb-8">
                      {/* Category Header */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-accent" />
                        <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">
                          {category.name}
                        </h3>
                      </div>
                      
                      {/* Feature Rows */}
                      <div className="space-y-1">
                        {category.features.map((feature) => (
                          <div
                            key={feature.name}
                            className="grid grid-cols-5 gap-4 py-3 px-4 rounded-lg hover:bg-card/50 transition-colors"
                          >
                            {/* Feature Name */}
                            <div className="col-span-1 flex items-center">
                              <span className="text-sm text-muted-foreground">{feature.name}</span>
                            </div>
                            
                            {/* Feature Values */}
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
            </div>
          </div>
        </section>
        
        {/* Bottom CTA */}
        <section className="pb-24 md:pb-32">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-card/50 border border-border/30">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Ready to grow your business?
              </h2>
              <p className="text-muted-foreground mb-6">
                Get a website that works as hard as you do.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  Ask a question
                </Link>
                <Link
                  to="/smart-websites/smart-lead"
                  className="btn-gold px-6 py-3 rounded-lg flex items-center justify-center gap-2"
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
