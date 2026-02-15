/**
 * @fileoverview Automotive Services Industry Hub Page.
 * @module pages/industries/Automotive
 * 
 * Category hub for 10 automotive service verticals including auto repair,
 * detailing, tire shops, body shops, and towing. Uses industry-specific
 * token words (repairs, services, estimates) to boost conversion.
 */

import { SEO } from '@/components/SEO';
import { 
  Car, 
  ArrowRight, 
  Phone,
  Clock,
  DollarSign,
  Star,
  CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * All 10 automotive services verticals.
 */
const verticals = [
  { name: 'Auto Repair', slug: 'auto-repair', popular: true },
  { name: 'Auto Detailing', slug: 'auto-detailing', popular: true },
  { name: 'Tire Shop', slug: 'tire-shop', popular: true },
  { name: 'Oil Change', slug: 'oil-change', popular: true },
  { name: 'Auto Body', slug: 'auto-body', popular: true },
  { name: 'Transmission', slug: 'transmission' },
  { name: 'Towing', slug: 'towing' },
  { name: 'Mobile Car Wash', slug: 'mobile-car-wash' },
  { name: 'Window Tinting', slug: 'window-tinting' },
  { name: 'Audio Installation', slug: 'audio-installation' },
];

/**
 * Key pain points for automotive businesses.
 */
const painPoints = [
  {
    problem: 'Calls missed while under the hood',
    solution: 'AI answers every call while your techs work',
    stat: '$175 avg revenue lost per missed estimate',
  },
  {
    problem: 'Customers price-shopping multiple shops',
    solution: 'Instant response wins the job before competitors',
    stat: 'First shop to respond wins 78% of the time',
  },
  {
    problem: 'No-shows waste bay time',
    solution: 'Automated reminders reduce no-shows by 60%',
    stat: '$200+ lost per empty bay hour',
  },
  {
    problem: 'Customers don\'t come back for maintenance',
    solution: 'Automated service reminders drive repeat visits',
    stat: 'Service reminders increase retention 40%',
  },
];

/**
 * Token words specific to automotive services.
 */
const tokenWords = [
  'repairs', 'services', 'estimates', 'appointments',
  'diagnostics', 'inspections', 'maintenance', 'quotes'
];

/**
 * Automotive Services Industry Hub Component.
 */
export default function Automotive() {
  return (
    <>
      <SEO 
        title="Automotive Services"
        description="Smart websites and AI automation for auto repair, detailing, tire shops, body shops, towing, and 5 more automotive service verticals."
        canonical="/industries/automotive-services"
      />
      
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-background to-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <a href="/industries" className="hover:text-foreground transition-colors">Industries</a>
              <ArrowRight className="w-3 h-3" />
              <span className="text-foreground">Automotive</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium mb-4">
              <Car className="w-4 h-4" />
              10 Verticals
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              <span className="text-foreground">Capture every </span>
              <span className="text-gradient">repair opportunity</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              From emergency <strong className="text-foreground">repairs</strong> to scheduled{' '}
              <strong className="text-foreground">services</strong>, capture every{' '}
              <strong className="text-foreground">estimate</strong> with AI that answers, qualifies, and books.
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
                <a href="/pricing">View Plans for Shops</a>
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
              <span className="text-gradient">shop</span>
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
              10 Automotive Service Verticals
            </h2>
            <p className="text-muted-foreground">
              Every shop type. Every specialty. One platform that fills your bays.
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
                Recommended for Automotive
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">Capture</h2>
              <p className="text-muted-foreground mb-6">
                Built for busy shops. Conversion-focused website, appointment booking, 
                automated reminders, and review requests — all for{' '}
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
