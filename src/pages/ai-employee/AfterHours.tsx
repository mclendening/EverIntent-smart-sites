/**
 * @fileoverview After-Hours Mode Page — Award-Winning Design
 * @module pages/ai-employee/AfterHours
 * 
 * Features:
 * - Interactive SMS demo with typing animations
 * - Animated platform flow diagram
 * - Dashboard mockup preview
 * - Staggered feature animations
 * - Rich visual sections with negative space
 */

import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import { ClientOnly } from '@/components/ClientOnly';
import { 
  SMSDemo, 
  AnimatedFlowDiagram, 
  DashboardPreview, 
  TranscriptCard, 
  ExpandableFeatureGrid 
} from '@/components/ai-employee';
import { afterHoursFeatures } from '@/data/features';
import { ArrowRight, Clock, DollarSign, TrendingUp, Zap } from 'lucide-react';

const stats = [
  { icon: Clock, value: '24/7', label: 'Coverage' },
  { icon: Zap, value: '<60s', label: 'Response Time' },
  { icon: DollarSign, value: '$200+', label: 'Saved Per Call' },
  { icon: TrendingUp, value: '62%', label: 'Missed Calls Recovered' },
];

const transcriptProofs = [
  {
    title: '11pm emergency → $2,400 job booked',
    preview: "I have a water heater emergency! It's leaking everywhere!",
    result: 'Plumber arrived at 7am, $2,400 invoice paid same day.',
    timestamp: 'Last night',
    revenue: '+$2,400',
    fullTranscript: [
      'AI: Hi! Sorry we missed your call. I\'m the AI assistant at Rodriguez Plumbing. How can I help?',
      'Customer: I have a water heater emergency! It\'s leaking everywhere!',
      'AI: I\'m so sorry to hear that! We offer 24/7 emergency service. I can have someone there first thing at 7am. Would that work?',
      'Customer: Yes please!',
      'AI: ✅ You\'re confirmed for tomorrow at 7:00 AM. What\'s your address?',
      'Customer: 1234 Oak Street',
      'AI: Perfect. Mike will be there at 7am. He\'ll call when he\'s on the way. Is there anything else I can help with?',
    ],
  },
  {
    title: 'Weekend call → New customer acquired',
    preview: "Do you do AC repairs? My unit just died.",
    result: 'Saturday appointment booked, became recurring maintenance customer.',
    timestamp: 'Last Saturday',
    revenue: '+$4,800/yr',
    fullTranscript: [
      'AI: Thanks for calling Desert Cool Air! This is our AI assistant. How can I help you today?',
      'Customer: Do you do AC repairs? My unit just died.',
      'AI: Absolutely! We service all major brands. I can get you scheduled for tomorrow. What\'s your availability?',
      'Customer: Morning works best.',
      'AI: I\'ve got 9am available. Sound good?',
      'Customer: Perfect.',
      'AI: You\'re all set for 9am tomorrow. We\'ll send a confirmation text shortly!',
    ],
  },
];

// ============================================
// COMPONENT
// ============================================

export default function AfterHours() {
  return (
    <>
      <SEO 
        title="After-Hours AI: Complete Night Coverage"
        description="AI receptionist answers calls, books appointments, and texts back missed calls while you're closed. Serving Long Beach, Orange County, and LA. $197/mo."
        canonical="/let-ai-handle-it/after-hours"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'After-Hours AI Employee',
            description: 'AI answers calls, books appointments, and texts back missed calls while you\'re closed.',
            brand: { '@type': 'Brand', name: 'EverIntent' },
            offers: {
              '@type': 'Offer',
              price: '197',
              priceCurrency: 'USD',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: '197', priceCurrency: 'USD', billingDuration: 'P1M' },
              availability: 'https://schema.org/InStock',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What does the After-Hours AI Employee do?', acceptedAnswer: { '@type': 'Answer', text: 'It answers calls, books appointments, and sends missed-call text-backs while your business is closed. You wake up to booked jobs instead of voicemails.' } },
              { '@type': 'Question', name: 'How fast does AI respond to missed calls?', acceptedAnswer: { '@type': 'Answer', text: 'The AI sends an SMS text-back within 60 seconds of a missed call, opening a two-way conversation to capture the lead and book an appointment.' } },
              { '@type': 'Question', name: 'How many voice minutes are included?', acceptedAnswer: { '@type': 'Answer', text: '500 voice minutes per month are included. Additional minutes are $0.06 per minute. Most small businesses never exceed this allowance.' } },
              { '@type': 'Question', name: 'How much does After-Hours AI cost?', acceptedAnswer: { '@type': 'Answer', text: '$197 per month plus a one-time $997 setup fee. This includes unlimited SMS, missed-call text-back, CRM integration, and 500 voice minutes.' } },
            ],
          },
        ]}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-background" />
          <div className="absolute inset-0 bg-mesh opacity-20" />
          
          <div className="container relative">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
                <a href="/let-ai-handle-it" className="hover:text-accent transition-colors">AI Employee</a>
                <span>/</span>
                <span className="text-accent">After-Hours</span>
              </div>
              
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  <span className="text-foreground">Complete</span>{' '}
                  <span className="text-gradient">After-Hours Coverage</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  AI answers calls, books appointments, and texts back missed calls, all while you're closed. Wake up to leads and booked jobs, not voicemails.
                </p>
                
                {/* Pricing */}
                <div className="mb-10">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">$197</span>
                  <span className="text-xl text-muted-foreground">/mo</span>
                  <p className="text-sm text-muted-foreground mt-2">+ $997 one-time setup</p>
                </div>
                
                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <CTAButton 
                    to="/checkout/after-hours" 
                    defaultText="Start Tonight"
                    hoverText="Get After-Hours Mode"
                  />
                  <a 
                    href="/compare-ai-employee" 
                    className="group inline-flex items-center gap-2 px-6 py-3 text-foreground hover:text-accent transition-colors"
                  >
                    <span>Compare All Modes</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center p-4 rounded-xl bg-card/50 border border-border/30">
                      <Icon className="w-6 h-6 text-accent mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
              {/* Phone Mockup */}
              <div className="order-2 lg:order-1">
                <ClientOnly>
                  <SMSDemo />
                </ClientOnly>
              </div>
              
              {/* Copy */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  <span className="text-foreground">Watch AI Recover a </span>
                  <span className="text-gradient">$2,400 Job</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  11:47pm. Customer has a water heater emergency. Your phone goes to voicemail.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  But AI Employee catches it. Texts back in under 60 seconds. Books the appointment. You wake up to a $2,400 job on your calendar.
                </p>
                <p className="text-lg text-foreground font-medium">
                  This happens every night for our customers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works — Animated Flow */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-foreground">How It</span>{' '}
                <span className="text-gradient">Works</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every missed call becomes a booked job while you sleep.
              </p>
            </div>

            <ClientOnly>
              <AnimatedFlowDiagram variant="after-hours" />
            </ClientOnly>
          </div>
        </section>

        {/* All Features — Single Comprehensive Section */}
        <section className="py-20 md:py-32 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="text-foreground">What's</span>{' '}
                  <span className="text-gradient">Included</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Unlimited SMS, missed-call text-back, CRM sync, and AI training. No per-message fees.
                </p>
              </div>

              <ExpandableFeatureGrid features={afterHoursFeatures} columns={2} />

              {/* Voice Minutes Callout */}
              <div className="mt-8 p-6 rounded-2xl bg-accent/5 border border-accent/20 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">Voice AI Minutes</h3>
                <p className="text-2xl font-bold text-accent mb-1">500 voice minutes/mo</p>
                <p className="text-sm text-muted-foreground">$0.06/min after</p>
              </div>
            </div>
          </div>
        </section>

        {/* Transcript Proofs */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-foreground">Real Results from</span>{' '}
                <span className="text-gradient">Real Businesses</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These conversations happened. This revenue was captured.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {transcriptProofs.map((proof, index) => (
                <TranscriptCard key={index} {...proof} />
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-foreground">Wake Up to</span>{' '}
                <span className="text-gradient">This Dashboard</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every call answered. Every lead captured. Every appointment booked.
              </p>
            </div>

            <ClientOnly>
              <DashboardPreview />
            </ClientOnly>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-foreground">Ready for Complete</span>{' '}
                <span className="text-gradient">After-Hours Coverage?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Stop losing customers to voicemail. Start tonight.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <CTAButton 
                  to="/checkout/after-hours" 
                  defaultText="Get After-Hours Mode"
                  hoverText="$197/mo + $997 setup"
                />
                <a 
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 text-foreground hover:text-accent transition-colors"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
