/**
 * @fileoverview Professional Services Industry Hub Page.
 * @module pages/industries/ProfessionalServices
 * 
 * Category hub for 15 professional service verticals including legal,
 * real estate, accounting, insurance, and consulting. Uses industry-specific
 * token words (consultations, clients, cases) to boost conversion.
 */

import { SEO } from '@/components/SEO';
import { 
  Briefcase, 
  ArrowRight, 
  Phone,
  Clock,
  DollarSign,
  Star,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * All 15 professional services verticals.
 */
const verticals = [
  { name: 'Legal', slug: 'legal', popular: true },
  { name: 'Real Estate', slug: 'real-estate', popular: true },
  { name: 'Accounting', slug: 'accounting', popular: true },
  { name: 'Insurance', slug: 'insurance', popular: true },
  { name: 'Financial Advisor', slug: 'financial-advisor', popular: true },
  { name: 'Mortgage', slug: 'mortgage' },
  { name: 'Photography', slug: 'photography' },
  { name: 'Videography', slug: 'videography' },
  { name: 'Marketing', slug: 'marketing' },
  { name: 'Consulting', slug: 'consulting' },
  { name: 'IT Services', slug: 'it-services' },
  { name: 'Web Design', slug: 'web-design' },
  { name: 'Event Planning', slug: 'event-planning' },
  { name: 'Interior Design', slug: 'interior-design' },
  { name: 'Property Management', slug: 'property-management' },
];

/**
 * Key pain points for professional services.
 */
const painPoints = [
  {
    problem: 'Missed inquiries during client meetings',
    solution: 'AI answers calls professionally while you focus on clients',
    stat: '$300 avg value per missed consultation',
  },
  {
    problem: 'Complex intake process loses leads',
    solution: 'AI qualifies prospects and gathers intake information',
    stat: '40% of leads abandon long forms',
  },
  {
    problem: 'No time for business development',
    solution: 'Automated nurture sequences keep prospects warm',
    stat: 'Top firms spend 20% of time on BD',
  },
  {
    problem: 'Referrals not converting',
    solution: 'Instant follow-up on every referral inquiry',
    stat: 'Speed-to-lead increases close rate 7x',
  },
];

/**
 * Token words specific to professional services.
 */
const tokenWords = [
  'consultations', 'clients', 'cases', 'closings',
  'engagements', 'retainers', 'referrals', 'inquiries'
];

/**
 * Professional Services Industry Hub Component.
 */
export default function ProfessionalServices() {
  return (
    <>
      <SEO 
        title="Professional Services: AI for Firms"
        description="Smart websites and AI automation for legal, real estate, accounting, insurance, and 10 more professional service verticals."
        canonical="/industries/professional-services"
      />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-card/50" aria-label="Professional services AI solutions">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <a href="/industries" className="hover:text-foreground transition-colors">Industries</a>
              <ArrowRight className="w-3 h-3" />
              <span className="text-foreground">Professional Services</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-4">
              <Briefcase className="w-4 h-4" />
              15 Verticals
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Convert </span>
              <span className="text-gradient">consultations</span>
              <span className="text-foreground"> into clients</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              From initial <strong className="text-foreground">inquiries</strong> to scheduled{' '}
              <strong className="text-foreground">consultations</strong>, capture every prospective{' '}
              <strong className="text-foreground">client</strong> with AI that qualifies, books, and follows up.
            </p>

            {/* Token Words - inline italic typography */}
            <p className="text-muted-foreground italic mb-8">
              {tokenWords.join(' · ')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg">
                <a href="/pricing">View Plans for Professionals</a>
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
              <span className="text-foreground">The challenges every </span>
              <span className="text-gradient">professional</span>
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
              15 Professional Service Verticals
            </h2>
            <p className="text-muted-foreground">
              Every profession. Every specialty. One platform built for client acquisition.
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
                Recommended for Professional Services
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Convert</h2>
              <p className="text-muted-foreground mb-6">
                Built for client-focused professionals. Premium website, CRM integration, 
                appointment scheduling, and reputation management, all for{' '}
                <strong className="text-foreground">$197/month</strong>.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-background rounded-lg">
                  <DollarSign className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">$497 setup</p>
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
                  <a href="/pricing">Get Convert</a>
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
