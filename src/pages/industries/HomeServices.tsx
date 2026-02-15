/**
 * @fileoverview Home Services Industry Hub Page.
 * @module pages/industries/HomeServices
 * 
 * Category hub for 31 home service verticals including HVAC, plumbing,
 * electrical, roofing, landscaping, and more. Uses industry-specific
 * token words (installs, repairs, service calls) to boost conversion.
 */

import { SEO } from '@/components/SEO';
import { 
  Home, 
  ArrowRight, 
  Phone,
  Clock,
  DollarSign,
  Star,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * All 31 home services verticals with status indicators.
 */
const verticals = [
  { name: 'HVAC', slug: 'hvac', popular: true },
  { name: 'Plumbing', slug: 'plumbing', popular: true },
  { name: 'Electrical', slug: 'electrical', popular: true },
  { name: 'Roofing', slug: 'roofing', popular: true },
  { name: 'Landscaping', slug: 'landscaping', popular: true },
  { name: 'House Cleaning', slug: 'cleaning' },
  { name: 'Painting', slug: 'painting' },
  { name: 'Flooring', slug: 'flooring' },
  { name: 'Remodeling', slug: 'remodeling' },
  { name: 'Pest Control', slug: 'pest-control' },
  { name: 'Pool Service', slug: 'pool-service' },
  { name: 'Garage Doors', slug: 'garage-doors' },
  { name: 'Fencing', slug: 'fencing' },
  { name: 'Tree Service', slug: 'tree-service' },
  { name: 'Handyman', slug: 'handyman' },
  { name: 'Locksmith', slug: 'locksmith' },
  { name: 'Appliance Repair', slug: 'appliance-repair' },
  { name: 'Carpet Cleaning', slug: 'carpet-cleaning' },
  { name: 'Pressure Washing', slug: 'pressure-washing' },
  { name: 'Window Cleaning', slug: 'window-cleaning' },
  { name: 'Gutter Cleaning', slug: 'gutter-cleaning' },
  { name: 'Junk Removal', slug: 'junk-removal' },
  { name: 'Moving', slug: 'moving' },
  { name: 'Glass Repair', slug: 'glass-repair' },
  { name: 'Concrete & Driveways', slug: 'concrete-driveways' },
  { name: 'Deck Building', slug: 'deck-building' },
  { name: 'Home Inspection', slug: 'home-inspection' },
  { name: 'Waterproofing', slug: 'waterproofing' },
  { name: 'Insulation', slug: 'insulation' },
  { name: 'Solar Installation', slug: 'solar-installation' },
  { name: 'Security Systems', slug: 'security-systems' },
];

/**
 * Key pain points and solutions for home services.
 */
const painPoints = [
  {
    problem: 'Missed calls = lost jobs',
    solution: 'AI answers every call 24/7, qualifies leads, books estimates',
    stat: '$150 avg cost per missed service call',
  },
  {
    problem: 'Evenings & weekends are peak call times',
    solution: 'After-hours AI handling so you can rest',
    stat: '67% of home service calls happen outside 9-5',
  },
  {
    problem: 'No time to follow up on quotes',
    solution: 'Automated follow-up sequences close more jobs',
    stat: '80% of sales require 5+ touchpoints',
  },
  {
    problem: 'Reputation stuck at 4.2 stars',
    solution: 'Automated review requests after every job',
    stat: '5-star contractors win 3x more bids',
  },
];

/**
 * Token words specific to home services industry.
 */
const tokenWords = [
  'installs', 'repairs', 'service calls', 'emergency jobs', 
  'estimates', 'tune-ups', 'replacements', 'inspections'
];

/**
 * Home Services Industry Hub Component.
 */
export default function HomeServices() {
  return (
    <>
      <SEO 
        title="Home Services: AI Automation for Contractors"
        description="Smart websites and AI automation for HVAC, plumbing, electrical, roofing, landscaping, and 26 more home service verticals."
        canonical="/industries/home-services"
      />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <a href="/industries" className="hover:text-foreground transition-colors">Industries</a>
              <ArrowRight className="w-3 h-3" />
              <span className="text-foreground">Home Services</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-4">
              <Home className="w-4 h-4" />
              31 Verticals
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Never miss another </span>
              <span className="text-gradient">service call</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              From emergency <strong className="text-foreground">repairs</strong> to scheduled{' '}
              <strong className="text-foreground">installs</strong>, capture every lead with AI that 
              answers calls, books <strong className="text-foreground">estimates</strong>, and follows up automatically.
            </p>

            {/* Token Words */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {tokenWords.map((word) => (
                <span 
                  key={word}
                  className="px-3 py-1 text-sm rounded-lg bg-accent/50 text-accent-foreground"
                >
                  {word}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="/pricing">View Plans for Contractors</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/let-ai-handle-it">See AI Employee Demo</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="text-foreground">The problems every </span>
              <span className="text-gradient">contractor</span>
              <span className="text-foreground"> faces</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {painPoints.map((item, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl p-6 border border-border/30"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-destructive/10">
                    <Phone className="w-5 h-5 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground mb-1">{item.problem}</p>
                    <p className="text-sm text-muted-foreground mb-3">{item.solution}</p>
                    <p className="text-xs text-primary font-medium">{item.stat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Verticals Grid */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              31 Home Service Verticals
            </h2>
            <p className="text-muted-foreground">
              Every trade. Every specialty. One platform that understands your business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {verticals.map((vertical) => (
              <div
                key={vertical.slug}
                className="flex items-center gap-2 px-4 py-3 bg-background rounded-lg border border-border/30"
              >
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{vertical.name}</span>
                {vertical.popular && (
                  <Star className="w-3 h-3 text-amber-500 ml-auto" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Tier */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-card rounded-2xl p-8 border border-primary/30">
            <div className="text-center">
              <span className="inline-block px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-4">
                Recommended for Home Services
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Capture</h2>
              <p className="text-muted-foreground mb-6">
                The perfect starting point for contractors. Get a conversion-focused website, 
                lead capture forms, and automated follow-up, all for{' '}
                <strong className="text-foreground">$97/month</strong>.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-background rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">$249 setup</p>
                  <p className="text-xs text-muted-foreground">One-time</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <Clock className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">5-day delivery</p>
                  <p className="text-xs text-muted-foreground">Ready to launch</p>
                </div>
                <div className="p-4 bg-background rounded-lg">
                  <Star className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">AI-ready</p>
                  <p className="text-xs text-muted-foreground">Upgrade anytime</p>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg">
                  <a href="/pricing">Get Capture</a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="/contact">Talk to Sales</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
