/**
 * @fileoverview Full AI Employee Mode Page — Award-Winning Design
 * @module pages/ai-employee/FullTakeover
 * 
 * The premium tier: complete AI receptionist across all channels.
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
import { Link } from 'react-router-dom';
import { 
  SMSDemo,
  AnimatedFlowDiagram, 
  DashboardPreview, 
  FeatureGrid 
} from '@/components/ai-employee';
import { 
  ArrowRight, 
  Phone, 
  MessageSquare, 
  Globe, 
  Calendar, 
  ShieldCheck, 
  Zap,
  CheckCircle2,
  Star,
  Users,
  Clock
} from 'lucide-react';

// ============================================
// DATA
// ============================================

const channels = [
  { icon: Phone, name: 'Voice Calls', description: 'AI answers phone calls 24/7' },
  { icon: MessageSquare, name: 'SMS', description: 'Text conversations with leads' },
  { icon: Globe, name: 'Web Chat', description: 'Chat widget on your website' },
  { icon: Calendar, name: 'Booking', description: 'Books directly into calendar' },
  { icon: ShieldCheck, name: 'Screening', description: 'Qualifies every lead' },
  { icon: Zap, name: 'Live Transfer', description: 'Hot leads to you instantly' },
];

const features = [
  'Everything from After-Hours mode',
  'Everything from Front Office mode',
  'Voice AI for phone calls 24/7',
  'SMS follow-up and conversations',
  'Web chat widget for your website',
  'Appointment booking integration',
  'Call screening and qualification',
  'Live transfer of hot leads',
  'Multi-channel lead management',
  'Priority support and onboarding',
];

const unlimitedFeatures = [
  { name: 'SMS/Text conversations', description: 'Unlimited AI-powered texting' },
  { name: 'Missed call text-back', description: 'Instant response, no per-message fees' },
  { name: 'AI review responses', description: 'Automated reputation management' },
  { name: 'Web chat conversations', description: 'Unlimited website chat sessions' },
  { name: 'CRM integration', description: 'All leads sync automatically' },
  { name: 'Lead qualification AI', description: 'Smart scoring included' },
];

const includedMinutes = {
  voice: '2,500 voice minutes/mo',
  overage: '$0.06/min after',
  note: 'Most businesses never exceed this'
};

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

export default function FullTakeover() {
  return (
    <>
      <SEO 
        title="Full AI Employee — Complete Business Communication | EverIntent"
        description="Complete AI receptionist: voice, SMS, web chat, booking, screening, and live transfers. Your entire phone operation, automated. $597/mo."
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-background to-background" />
          <div className="absolute inset-0 bg-mesh opacity-30" />
          
          <div className="container relative">
            <div className="max-w-5xl mx-auto">
              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/let-ai-handle-it" className="hover:text-accent transition-colors">AI Employee</Link>
                <span>/</span>
                <span className="text-accent">Full AI Employee</span>
              </div>
              
              <div className="text-center mb-12">
                {/* Featured Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 text-accent text-sm font-medium mb-6">
                  <Star className="w-4 h-4" />
                  <span>Most Complete Solution</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                  <span className="text-foreground">Your Complete</span>{' '}
                  <span className="text-gradient">AI Employee</span>
                </h1>
                
                <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
                  Every channel. Every hour. Every lead. Your Full AI Employee handles calls, texts, web chat, booking, and screening — so you can focus on the work that pays.
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
                    to="/pricing?tab=ai" 
                    defaultText="Get Full AI Employee"
                    hoverText="Complete Solution"
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

        {/* Channels Grid */}
        <section className="py-20 md:py-32 bg-card">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                <span className="text-foreground">Every Channel,</span>{' '}
                <span className="text-gradient">Covered</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                One AI Employee handling all your customer communications.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {channels.map((channel, index) => {
                const Icon = channel.icon;
                return (
                  <div 
                    key={index}
                    className="p-6 rounded-2xl bg-background border border-border/50 text-center hover:border-accent/50 transition-colors group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <h3 className="text-lg font-semibold mb-1 text-foreground">{channel.name}</h3>
                    <p className="text-sm text-muted-foreground">{channel.description}</p>
                  </div>
                );
              })}
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
                  This happens across voice, SMS, and web chat—all handled by your Full AI Employee.
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

        {/* What's Unlimited Section */}
        <section className="py-20 md:py-32">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/30 text-green-500 text-sm font-medium mb-6">
                  <span>∞</span>
                  <span>Powered by GHL AI Employee Unlimited</span>
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
              <div className="p-6 rounded-2xl bg-accent/10 border border-accent/30 text-center">
                <h3 className="text-lg font-semibold text-foreground mb-2">Voice AI Minutes</h3>
                <p className="text-3xl font-bold text-accent mb-1">{includedMinutes.voice}</p>
                <p className="text-sm text-muted-foreground mb-2">{includedMinutes.overage}</p>
                <p className="text-xs text-accent">{includedMinutes.note}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 md:py-32 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  <span className="text-foreground">Everything</span>{' '}
                  <span className="text-gradient">Included</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  The complete AI front office for your business.
                </p>
              </div>

              <ClientOnly>
                <FeatureGrid features={features} columns={2} />
              </ClientOnly>
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
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                          <span className="text-xs">—</span>
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
                  to="/pricing?tab=ai" 
                  defaultText="Get Full AI Employee"
                  hoverText="$597/mo + $2,500 setup"
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
