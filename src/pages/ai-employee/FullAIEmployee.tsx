/**
 * @fileoverview Full AI Employee Mode Page — Award-Winning Design
 * @module pages/ai-employee/FullAIEmployee
 *
 * The premium tier: complete AI phone automation across all channels.
 * Features:
 * - Multi-channel capability showcase
 * - Interactive SMS demo
 * - Animated platform flow
 * - Dashboard with all stats
 * - Comparison with individual modes
 */

import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import { ClientOnly } from '@/components/ClientOnly';
import { 
  SMSDemo,
  AnimatedFlowDiagram, 
  DashboardPreview, 
  ExpandableFeatureGrid 
} from '@/components/ai-employee';
import { fullAiFeatures } from '@/data/features';
import { 
  ArrowRight, 
  Phone, 
  CheckCircle2,
  Star,
  Users,
  Clock
} from 'lucide-react';

// ============================================
// DATA
// ============================================

// Channels and unlimited features consolidated into fullAiFeatures (ExpandableFeatureGrid)

const stats = [
  { icon: Phone, value: '24/7', label: 'Coverage' },
  { icon: Users, value: '5', label: 'Channels' },
  { icon: Clock, value: '<60s', label: 'Response Time' },
  { icon: Star, value: 'VIP', label: 'Support' },
];

const comparisonPoints = {
  individual: [
    'Pay for each mode separately',
    'Basic support',
    'Standard onboarding',
    'May need multiple setups',
  ],
  full: [
    'All modes included',
    'Priority support',
    'White-glove onboarding',
    'Single unified system',
  ],
};

// ============================================
// COMPONENT
// ============================================

export default function FullAIEmployee() {
  return (
    <>
      <SEO 
        title="Full AI Employee: Complete Business Automation"
        description="Complete AI Employee for Long Beach, Orange County, and LA: voice, SMS, web chat, booking, screening, live transfers. $597/mo."
        canonical="/let-ai-handle-it/full-ai-employee"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: 'Full AI Employee',
            description: 'Complete AI Employee: voice, SMS, web chat, booking, screening, and live transfers.',
            brand: { '@type': 'Brand', name: 'EverIntent' },
            offers: {
              '@type': 'Offer',
              price: '597',
              priceCurrency: 'USD',
              priceSpecification: { '@type': 'UnitPriceSpecification', price: '597', priceCurrency: 'USD', billingDuration: 'P1M' },
              availability: 'https://schema.org/InStock',
            },
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What does the Full AI Employee include?', acceptedAnswer: { '@type': 'Answer', text: 'Voice AI call answering, SMS automation, web chat, appointment booking, call screening, live transfers, and CRM integration across all channels. One flat monthly price with no per-message fees.' } },
              { '@type': 'Question', name: 'How is Full AI Employee different from individual modes?', acceptedAnswer: { '@type': 'Answer', text: 'Instead of paying separately for After-Hours and Front Office modes, the Full AI Employee bundles everything into one unified system with priority support, white-glove onboarding, and 2,500 voice minutes.' } },
              { '@type': 'Question', name: 'How many voice minutes are included?', acceptedAnswer: { '@type': 'Answer', text: '2,500 voice minutes per month. Additional minutes are $0.06 each. Most businesses never exceed this allowance.' } },
              { '@type': 'Question', name: 'How much does the Full AI Employee cost?', acceptedAnswer: { '@type': 'Answer', text: '$597 per month plus a one-time $2,500 setup fee that includes white-glove onboarding, AI training on your business, and full system configuration.' } },
            ],
          },
        ]}
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center py-20 overflow-hidden" aria-label="Full AI Employee overview">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-background to-background" />
          <div className="absolute inset-0 bg-mesh opacity-30" />
          
          <div className="container relative">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
                <a href="/let-ai-handle-it" className="hover:text-accent transition-colors">AI Employee</a>
                <span>/</span>
                <span className="text-accent">Full AI Employee</span>
              </div>
              
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  <span className="text-foreground">Your Complete</span>{' '}
                  <span className="text-gradient">AI Employee</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Every channel. Every hour. Every lead. Your Full AI Employee handles calls, texts, web chat, booking, and screening so you can focus on the work that pays.
                </p>
                
                {/* Pricing */}
                <div className="mb-10">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">$597</span>
                  <span className="text-xl text-muted-foreground">/mo</span>
                  <p className="text-sm text-muted-foreground mt-2">+ $2,500 one-time setup (includes white-glove onboarding)</p>
                </div>
                
                {/* CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <CTAButton 
                    to="/checkout/full-ai" 
                    defaultText="Get Full AI Employee"
                    hoverText="Complete Solution"
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
                    <div key={index} className="text-center p-4 rounded-xl bg-accent/10 border border-accent/30">
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

        {/* All Features - Single Comprehensive Section */}
        <section className="py-20 md:py-32 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="text-foreground">What's</span>{' '}
                  <span className="text-gradient">Included</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Every channel, every feature, one flat price. No per-message fees.
                </p>
              </div>

              <ExpandableFeatureGrid features={fullAiFeatures} columns={2} />
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="py-20 md:py-32">
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
                  <span className="text-foreground">See AI in</span>{' '}
                  <span className="text-gradient">Action</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Missed call at 11:47pm. Customer has an emergency. AI Employee responds in seconds, qualifies the lead, and books the job.
                </p>
                <p className="text-lg text-muted-foreground mb-6">
                  This happens across voice, SMS, and web chat, all handled by your Full AI Employee.
                </p>
                <p className="text-lg text-foreground font-medium">
                  Every channel. Every hour. Every lead captured.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 md:py-32 bg-muted/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-foreground">How It</span>{' '}
                <span className="text-gradient">Works</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                One unified system handling everything.
              </p>
            </div>

            <ClientOnly>
              <AnimatedFlowDiagram variant="full" />
            </ClientOnly>
          </div>
        </section>

        {/* Voice Minutes Callout */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-accent/10 border border-accent/30 text-center">
              <h3 className="text-lg font-semibold text-foreground mb-2">Voice AI Minutes</h3>
              <p className="text-3xl font-bold text-accent mb-1">2,500 voice minutes/mo</p>
              <p className="text-sm text-muted-foreground mb-2">$0.06/min after</p>
              <p className="text-xs text-accent">Most businesses never exceed this</p>
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20 md:py-32 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="text-foreground">Why Full</span>{' '}
                  <span className="text-gradient">AI Employee?</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Instead of piecing together individual modes, get everything in one package.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Individual Modes */}
                <div className="p-8 rounded-2xl bg-background border border-border/50">
                  <h3 className="text-xl font-semibold mb-6 text-muted-foreground">Individual Modes</h3>
                  <ul className="space-y-4">
                    {comparisonPoints.individual.map((point, index) => (
                      <li key={index} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-5 h-5 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-muted-foreground">×</span>
                        </div>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Full AI Employee */}
                <div className="p-8 rounded-2xl bg-accent/10 border-2 border-accent/50">
                  <div className="flex items-center gap-2 mb-6">
                    <h3 className="text-xl font-semibold text-accent">Full AI Employee</h3>
                    <Star className="w-5 h-5 text-accent" />
                  </div>
                  <ul className="space-y-4">
                    {comparisonPoints.full.map((point, index) => (
                      <li key={index} className="flex items-center gap-3 text-foreground">
                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-foreground">Your Command</span>{' '}
                <span className="text-gradient">Center</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every conversation, every channel, one dashboard.
              </p>
            </div>

            <ClientOnly>
              <DashboardPreview />
            </ClientOnly>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 md:py-32 bg-accent/5">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                <span className="text-foreground">Ready for the</span>{' '}
                <span className="text-gradient">Complete Solution?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-10">
                Let AI handle your entire front office. You focus on what matters.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <CTAButton 
                  to="/checkout/full-ai" 
                  defaultText="Get Full AI Employee"
                  hoverText="$597/mo + $2,500 setup"
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
