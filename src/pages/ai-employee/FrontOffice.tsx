/**
 * @fileoverview Front Office Mode Page — Award-Winning Design
 * @module pages/ai-employee/FrontOffice
 *
 * Features:
 * - Animated call screening flow
 * - Live transfer visualization
 * - Interactive feature grid
 * - Dashboard preview with qualifier stats
 */

import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import { ClientOnly } from '@/components/ClientOnly';
import { 
  AnimatedFlowDiagram, 
  DashboardPreview, 
  TranscriptCard, 
  ExpandableFeatureGrid 
} from '@/components/ai-employee';
import { frontOfficeFeatures } from '@/data/features';
import { 
  ArrowRight, 
  Filter, 
  UserCheck, 
  XCircle, 
  Phone,
  ShieldCheck,
  Clock,
  TrendingUp
} from 'lucide-react';

const qualifyingQuestions = [
  { question: '"What service are you looking for?"', purpose: 'Identifies service need' },
  { question: '"What\'s your timeline for this project?"', purpose: 'Gauges urgency' },
  { question: '"Do you have a budget in mind?"', purpose: 'Qualifies spend' },
  { question: '"What\'s the best way to reach you?"', purpose: 'Captures contact' },
];

const stats = [
  { icon: ShieldCheck, value: '100%', label: 'Calls Screened' },
  { icon: Filter, value: '73%', label: 'Tire-Kickers Filtered' },
  { icon: Clock, value: '<10s', label: 'Transfer Time' },
  { icon: TrendingUp, value: '3x', label: 'Close Rate Increase' },
];

const transcriptProofs = [
  {
    title: 'Spam caller blocked → 5 min saved',
    preview: "I'm calling about your car's extended warranty...",
    result: 'AI detected spam, ended call politely, you never knew it happened.',
    timestamp: 'This morning',
    fullTranscript: [
      'AI: Thanks for calling Rodriguez Plumbing! How can I help you today?',
      'Customer: Hi, I\'m calling about your car\'s extended warranty...',
      'AI: I appreciate the call, but we\'re a plumbing company. Have a great day!',
    ],
  },
  {
    title: '$8,000 kitchen remodel transferred live',
    preview: "We need a complete kitchen replumb for our renovation.",
    result: 'Hot lead transferred in 8 seconds. Contract signed same day.',
    timestamp: 'Yesterday',
    revenue: '+$8,000',
    fullTranscript: [
      'AI: Thanks for calling Rodriguez Plumbing! How can I help you today?',
      'Customer: We need a complete kitchen replumb for our renovation.',
      'AI: That\'s great! We specialize in kitchen remodels. What\'s your timeline?',
      'Customer: We start demo next week.',
      'AI: Perfect timing. Let me transfer you to Mike who handles all our remodel projects. One moment please.',
      'Customer: Thank you!',
    ],
  },
];

// ============================================
// COMPONENT
// ============================================

export default function FrontOffice() {
  return (
    <>
      <SEO 
        title="Front Office AI: Screen, Qualify and Transfer Calls"
        description="AI screens every call, qualifies leads, and transfers hot prospects for Long Beach, Orange County, and LA businesses. $297/mo."
        canonical="/let-ai-handle-it/front-office"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Front Office AI Employee',
            description: 'AI screens every call, qualifies leads, and only transfers hot prospects.',
            brand: { '@type': 'Brand', name: 'EverIntent' },
            offers: {
              '@type': 'Offer',
              price: '297',
              priceCurrency: 'USD',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: '297', priceCurrency: 'USD', billingDuration: 'P1M' },
              availability: 'https://schema.org/InStock',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'How does Front Office AI screen calls?', acceptedAnswer: { '@type': 'Answer', text: 'AI answers every call instantly, asks your custom qualifying questions (service needed, timeline, budget), scores the lead, and either transfers hot prospects live or politely ends non-fit calls.' } },
              { '@type': 'Question', name: 'What happens to spam and solicitor calls?', acceptedAnswer: { '@type': 'Answer', text: 'AI identifies spam, robocalls, and solicitors within seconds and politely ends the call. You never see or waste time on junk calls.' } },
              { '@type': 'Question', name: 'How fast are qualified leads transferred?', acceptedAnswer: { '@type': 'Answer', text: 'Hot leads are warm-transferred to you in under 10 seconds with a whisper summary of their needs, budget, and timeline so you can close faster.' } },
              { '@type': 'Question', name: 'How much does Front Office AI cost?', acceptedAnswer: { '@type': 'Answer', text: '$297 per month plus a one-time $1,497 setup fee. Includes 1,000 voice minutes, unlimited SMS, lead qualification, and live call transfers.' } },
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
                <span className="text-accent">Front Office</span>
              </div>
              
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  <span className="text-foreground">Only Talk to</span>{' '}
                  <span className="text-gradient">Qualified Leads</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Your AI front office screens every caller, asks qualifying questions, and only transfers the hot prospects. Spam and tire-kickers never reach you.
                </p>
                
                {/* Pricing */}
                <div className="mb-10">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">$297</span>
                  <span className="text-xl text-muted-foreground">/mo</span>
                  <p className="text-sm text-muted-foreground mt-2">+ $1,497 one-time setup</p>
                </div>
                
                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <CTAButton 
                    to="/checkout/front-office" 
                    defaultText="Get Started"
                    hoverText="Screen Every Call"
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

        {/* Screening Flow Visualization */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-foreground">How It</span>{' '}
                <span className="text-gradient">Works</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every call is screened. Only hot leads get through.
              </p>
            </div>

            <ClientOnly>
              <AnimatedFlowDiagram variant="front-office" />
            </ClientOnly>

            {/* Call Flow Outcomes */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
              <div className="p-6 rounded-2xl bg-highlight/10 border border-highlight/30 text-center">
                <UserCheck className="w-10 h-10 text-highlight mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Hot Lead</h3>
                <p className="text-sm text-muted-foreground">Transferred live to you in under 10 seconds</p>
              </div>
              <div className="p-6 rounded-2xl bg-accent/10 border border-accent/30 text-center">
                <Phone className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Warm Lead</h3>
                <p className="text-sm text-muted-foreground">Message taken, callback scheduled</p>
              </div>
              <div className="p-6 rounded-2xl bg-muted border border-border/30 text-center">
                <XCircle className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">Not a Fit</h3>
                <p className="text-sm text-muted-foreground">Politely ended, you never bothered</p>
              </div>
            </div>
          </div>
        </section>

        {/* Qualifying Questions */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="text-foreground">AI Asks</span>{' '}
                  <span className="text-gradient">Your Questions</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  You define what makes a qualified lead. AI handles the rest.
                </p>
              </div>

              <div className="space-y-4">
                {qualifyingQuestions.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border/50"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-foreground font-medium italic">{item.question}</p>
                      <p className="text-sm text-muted-foreground">{item.purpose}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
                  Unlimited SMS, missed-call text-back, lead qualification, CRM sync, and AI training. No per-message fees.
                </p>
              </div>

              <ExpandableFeatureGrid features={frontOfficeFeatures} columns={2} />

              {/* Voice Minutes Callout */}
              <div className="mt-8 p-6 rounded-2xl bg-accent/5 border border-accent/20 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">Voice AI Minutes</h3>
                <p className="text-2xl font-bold text-accent mb-1">1,000 voice minutes/mo</p>
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
                <span className="text-foreground">Real Screening in</span>{' '}
                <span className="text-gradient">Action</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                See how AI filters the noise and surfaces the opportunities.
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
                <span className="text-foreground">See Every Call</span>{' '}
                <span className="text-gradient">Qualified</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Full visibility into every conversation and outcome.
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
                <span className="text-foreground">Ready to Stop</span>{' '}
                <span className="text-gradient">Wasting Time?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Let AI handle the tire-kickers. You focus on closing deals.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <CTAButton 
                  to="/checkout/front-office" 
                  defaultText="Get Front Office Mode"
                  hoverText="$297/mo + $1,497 setup"
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
