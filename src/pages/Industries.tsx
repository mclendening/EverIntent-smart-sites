/**
 * @fileoverview Industries Landing Page - Hub for 4 industry categories.
 * @module pages/Industries
 * 
 * Entry point showcasing 4 industry categories with tailored solutions.
 * Each category card uses industry-specific "token words" to improve
 * conversion and SEO relevance for high-value local service niches.
 */

import { SEO } from '@/components/SEO';

import { 
  Home, 
  Briefcase, 
  Heart, 
  Car, 
  ArrowRight, 
  Phone,
  Calendar,
  MessageSquare,
  TrendingUp,
  LucideIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * SVG gradient definitions for consistent icon styling.
 */
const GradientDefs = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <linearGradient id="gradient-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(var(--accent))" />
        <stop offset="50%" stopColor="hsl(var(--intent-blue))" />
        <stop offset="100%" stopColor="hsl(var(--secondary-accent))" />
      </linearGradient>
    </defs>
  </svg>
);

/**
 * Gradient icon wrapper for consistent styling.
 */
const GradientIcon = ({ icon: Icon, className = "" }: { icon: LucideIcon; className?: string }) => (
  <Icon 
    className={className}
    style={{ stroke: 'url(#gradient-ocean)' }}
  />
);

/**
 * Industry category data with token words for conversion optimization.
 * Token words are industry-specific terms that resonate with each niche.
 */
const industryCategories = [
  {
    icon: Home,
    name: 'Home Services',
    slug: 'home-services',
    tagline: 'Never miss another service call',
    description: 'HVAC, plumbing, electrical, roofing, landscaping, and 26 more verticals.',
    tokenWords: ['installs', 'repairs', 'service calls', 'emergency jobs'],
    verticalCount: 31,
    stats: {
      avgLeadValue: '$35-70',
      missedCallCost: '$150/missed call',
    },
    recommendedTier: 'Capture',
    topVerticals: ['HVAC', 'Plumbing', 'Electrical', 'Roofing', 'Landscaping'],
  },
  {
    icon: Briefcase,
    name: 'Professional Services',
    slug: 'professional-services',
    tagline: 'Convert consultations into clients',
    description: 'Legal, real estate, accounting, insurance, consulting, and 10 more verticals.',
    tokenWords: ['consultations', 'clients', 'cases', 'closings'],
    verticalCount: 15,
    stats: {
      avgLeadValue: '$100-500',
      missedCallCost: '$300/missed inquiry',
    },
    recommendedTier: 'Convert',
    topVerticals: ['Legal', 'Real Estate', 'Accounting', 'Insurance', 'Financial Advisor'],
  },
  {
    icon: Heart,
    name: 'Health & Wellness',
    slug: 'health-wellness',
    tagline: 'Fill your appointment book 24/7',
    description: 'Dental, chiropractic, medspa, salons, fitness, and 10 more verticals.',
    tokenWords: ['patients', 'appointments', 'bookings', 'treatments'],
    verticalCount: 15,
    stats: {
      avgLeadValue: '$75-200',
      missedCallCost: '$125/missed booking',
    },
    recommendedTier: 'Convert',
    topVerticals: ['Dental', 'Chiropractic', 'Medspa', 'Salon', 'Personal Training'],
  },
  {
    icon: Car,
    name: 'Automotive',
    slug: 'automotive-services',
    tagline: 'Capture every repair opportunity',
    description: 'Auto repair, detailing, tire shops, body shops, towing, and 5 more verticals.',
    tokenWords: ['repairs', 'services', 'appointments', 'estimates'],
    verticalCount: 10,
    stats: {
      avgLeadValue: '$80-250',
      missedCallCost: '$175/missed estimate',
    },
    recommendedTier: 'Capture',
    topVerticals: ['Auto Repair', 'Detailing', 'Tire Shop', 'Body Shop', 'Towing'],
  },
];

/**
 * Value props shown across all industries.
 */
const universalBenefits = [
  {
    icon: Phone,
    title: 'Never Miss a Call',
    description: 'AI answers 24/7, qualifies leads, and books appointments while you work.',
  },
  {
    icon: Calendar,
    title: 'Book More Jobs',
    description: 'Online scheduling synced with your calendar. Customers book when ready.',
  },
  {
    icon: MessageSquare,
    title: 'Instant Follow-Up',
    description: 'Automated SMS follow-up within 60 seconds of every missed call.',
  },
  {
    icon: TrendingUp,
    title: 'Grow Your Reputation',
    description: 'Automated review requests turn happy customers into 5-star reviews.',
  },
];

/**
 * Industries Landing Page Component.
 * Displays all 4 industry categories with token words and recommended tiers.
 */
export default function Industries() {
  return (
    <>
      <SEO 
        title="Industries We Serve"
        description="AI automation and websites for 65+ local business verticals. HVAC, plumbing, dental, legal, automotive, and more."
        canonical="/industries"
      />
      
      <GradientDefs />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Built for </span>
              <span className="text-gradient">your industry</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              We understand local businesses. That's why we serve <strong className="text-foreground">4 industry categories</strong> with 
              tailored solutions that speak your language.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="/pricing">View Pricing</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/contact">Get a Free Consultation</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Categories Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {industryCategories.map((category) => (
              <a
                key={category.slug}
                href={`/industries/${category.slug}`}
                className="group relative bg-card rounded-2xl p-6 md:p-8 border border-border/30 hover:border-primary/50 transition-all duration-300 hover-lift"
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <GradientIcon icon={category.icon} className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      {category.name}
                      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                    </h2>
                    <p className="text-sm text-primary font-medium">{category.tagline}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-4">{category.description}</p>

                {/* Token Words */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {category.tokenWords.map((word) => (
                    <span 
                      key={word}
                      className="px-2 py-1 text-xs rounded-lg bg-accent/50 text-accent-foreground"
                    >
                      {word}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-border/30">
                  <div>
                    <p className="text-xs text-muted-foreground">Avg Lead Value</p>
                    <p className="text-sm font-semibold text-foreground">{category.stats.avgLeadValue}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Missed Call Cost</p>
                    <p className="text-sm font-semibold text-destructive">{category.stats.missedCallCost}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border/30">
                  <span className="text-sm text-muted-foreground">
                    {category.verticalCount} verticals
                  </span>
                  <span className="text-sm text-primary font-medium">
                    Recommended: {category.recommendedTier}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Universal Benefits */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="text-foreground">What every </span>
              <span className="text-gradient">local business</span>
              <span className="text-foreground"> needs</span>
            </h2>
            <p className="text-muted-foreground">
              Whether you're a plumber, dentist, attorney, or auto shop — these fundamentals drive growth.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {universalBenefits.map((benefit) => (
              <div 
                key={benefit.title}
                className="bg-background rounded-xl p-6 border border-border/30"
              >
                <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                  <benefit.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Ready to grow your business?
            </h2>
            <p className="text-muted-foreground mb-8">
              Get a smart website that actually generates leads — built in 5 days, starting at $249.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="/pricing">See All Plans</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/let-ai-handle-it">Explore AI Employee</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
