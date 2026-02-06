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
import { Link } from 'react-router-dom';
import { 
  SMSDemo, 
  AnimatedFlowDiagram, 
  DashboardPreview, 
  TranscriptCard, 
  FeatureGrid 
} from '@/components/ai-employee';
import { ArrowRight, Clock, DollarSign, TrendingUp, Zap } from 'lucide-react';

// ============================================
// DATA
// ============================================

const features = [
  'Natural voice AI answers calls after hours',
  'Takes detailed messages from callers',
  'Books appointments directly into your calendar',
  'Missed call text-back in under 60 seconds',
  'Sends SMS summaries to your phone',
  'Full call transcripts available',
  'Custom greeting with your business name',
  'Handles FAQs about hours and location',
];

const unlimitedFeatures = [
  { name: 'SMS/Text conversations', description: 'Unlimited AI-powered texting' },
  { name: 'Missed call text-back', description: 'Instant response, no per-message fees' },
  { name: 'AI review responses', description: 'Automated reputation management' },
  { name: 'CRM integration', description: 'All leads sync automatically' },
  { name: 'Custom AI training', description: 'Trained on your business' },
];

const includedMinutes = {
  voice: '500 voice minutes/mo',
  overage: '$0.06/min after'
};

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
        title="After-Hours AI — Complete Night Coverage | EverIntent"
        description="AI answers calls, books appointments, and texts back missed calls while you're closed. Wake up to booked jobs. $197/mo."
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
                <Link to="/let-ai-handle-it" className="hover:text-accent transition-colors">AI Employee</Link>
                <span>/</span>
                <span className="text-accent">After-Hours</span>
              </div>
              
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  <span className="text-foreground">Complete</span>{' '}
                  <span className="text-gradient">After-Hours Coverage</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  AI answers calls, books appointments, and texts back missed calls—all while you're closed. Wake up to leads and booked jobs, not voicemails.
                </p>
                
                {/* Pricing */}
                <div className="mb-10">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">$197</span>
                  <span className="text-xl text-muted-foreground">/mo</span>
                  <p className="text-sm text-muted-foreground mt-2">+ $1,497 one-time setup</p>
                </div>
                
                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <CTAButton 
                    to="/pricing?tab=ai" 
                    defaultText="Start Tonight"
                    hoverText="Get After-Hours Mode"
                  />
                  <Link 
                    to="/compare-ai-employee" 
                    className="group inline-flex items-center gap-2 px-6 py-3 text-foreground hover:text-accent transition-colors"
                  >
                    <span>Compare All Modes</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
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

        {/* What's Unlimited Section */}
        <section className="py-20 md:py-32 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-medium mb-6">
                  <span>∞</span>
                  <span>Powered by GHL AI Employee</span>
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="text-foreground">What's</span>{' '}
                  <span className="text-gradient">Unlimited</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  No per-message fees. No hidden costs. Just results.
                </p>
              </div>

              {/* Unlimited Features Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                {unlimitedFeatures.map((feature, index) => (
                  <div key={index} className="p-5 rounded-xl bg-green-500/5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-green-500 font-bold">∞</span>
                      <h3 className="font-semibold text-foreground">{feature.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                ))}
              </div>

              {/* Voice Minutes Callout */}
              <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">Voice AI Minutes</h3>
                <p className="text-2xl font-bold text-accent mb-1">{includedMinutes.voice}</p>
                <p className="text-sm text-muted-foreground">{includedMinutes.overage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="text-foreground">All</span>{' '}
                  <span className="text-gradient">Features</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Everything you need for complete after-hours coverage.
                </p>
              </div>

              <ClientOnly>
                <FeatureGrid features={features} columns={2} />
              </ClientOnly>
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
                  to="/pricing?tab=ai" 
                  defaultText="Get After-Hours Mode"
                  hoverText="$197/mo + $1,497 setup"
                />
                <Link 
                  to="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 text-foreground hover:text-accent transition-colors"
                >
                  <span>Book a Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
