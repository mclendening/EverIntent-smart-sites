/**
 * @fileoverview Health & Wellness Industry Hub Page.
 * @module pages/industries/HealthWellness
 * 
 * Category hub for 15 health and wellness verticals including dental,
 * chiropractic, medspa, salons, and fitness. Uses industry-specific
 * token words (patients, appointments, bookings) to boost conversion.
 */

import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  ArrowRight, 
  Phone,
  Clock,
  DollarSign,
  Star,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * All 15 health & wellness verticals.
 */
const verticals = [
  { name: 'Dental', slug: 'dental', popular: true },
  { name: 'Chiropractic', slug: 'chiropractic', popular: true },
  { name: 'Medspa', slug: 'medspa', popular: true },
  { name: 'Physical Therapy', slug: 'physical-therapy', popular: true },
  { name: 'Massage', slug: 'massage', popular: true },
  { name: 'Acupuncture', slug: 'acupuncture' },
  { name: 'Optometry', slug: 'optometry' },
  { name: 'Veterinary', slug: 'veterinary' },
  { name: 'Mental Health', slug: 'mental-health' },
  { name: 'Personal Training', slug: 'personal-training' },
  { name: 'Yoga', slug: 'yoga' },
  { name: 'Martial Arts', slug: 'martial-arts' },
  { name: 'Salon', slug: 'salon' },
  { name: 'Barbershop', slug: 'barbershop' },
  { name: 'Spa', slug: 'spa' },
];

/**
 * Key pain points for health & wellness businesses.
 */
const painPoints = [
  {
    problem: 'No-shows cost you $125+ per empty slot',
    solution: 'Automated reminders reduce no-shows by 50%',
    stat: '$125 avg revenue lost per no-show',
  },
  {
    problem: 'Phone rings during treatments',
    solution: 'AI answers every call, books patients automatically',
    stat: '35% of calls go unanswered during busy hours',
  },
  {
    problem: 'New patient inquiries need fast response',
    solution: 'Instant follow-up converts more leads to patients',
    stat: 'Speed-to-lead increases booking rate 5x',
  },
  {
    problem: 'Reviews stuck at 4.3 stars',
    solution: 'Automated review requests after every visit',
    stat: 'Practices with 4.8+ stars get 2x more calls',
  },
];

/**
 * Token words specific to health & wellness.
 */
const tokenWords = [
  'patients', 'appointments', 'bookings', 'treatments',
  'consultations', 'sessions', 'visits', 'procedures'
];

/**
 * Health & Wellness Industry Hub Component.
 */
export default function HealthWellness() {
  return (
    <>
      <SEO 
        title="Health & Wellness"
        description="Smart websites and AI automation for dental, chiropractic, medspa, salons, fitness, and 10 more health & wellness verticals."
        canonical="/industries/health-wellness"
      />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/industries" className="hover:text-foreground transition-colors">Industries</Link>
              <ArrowRight className="w-3 h-3" />
              <span className="text-foreground">Health & Wellness</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-4">
              <Heart className="w-4 h-4" />
              15 Verticals
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Fill your </span>
              <span className="text-gradient">appointment book</span>
              <span className="text-foreground"> 24/7</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              From new <strong className="text-foreground">patients</strong> to returning{' '}
              <strong className="text-foreground">bookings</strong>, capture every{' '}
              <strong className="text-foreground">appointment</strong> with AI that answers, schedules, and reminds.
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
                <Link to="/pricing">View Plans for Practices</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/let-ai-handle-it">See AI Employee Demo</Link>
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
              <span className="text-gradient">practice</span>
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
              15 Health & Wellness Verticals
            </h2>
            <p className="text-muted-foreground">
              Every practice type. Every specialty. One platform that fills your schedule.
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
                Recommended for Health & Wellness
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Convert</h2>
              <p className="text-muted-foreground mb-6">
                Built for patient-focused practices. Online booking, automated reminders, 
                review management, and HIPAA-aware forms — all for{' '}
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
                  <Link to="/pricing">Get Convert</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Talk to Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
