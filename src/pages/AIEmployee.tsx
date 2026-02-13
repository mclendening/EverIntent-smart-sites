/**
 * @fileoverview AI Employee Product Page
 * @module pages/AIEmployee
 * 
 * Consolidated pricing:
 * - After-Hours: $197/mo + $997 setup (includes booking + missed call recovery)
 * - Front Office: $297/mo + $1,497 setup (includes missed call recovery)
 * - Full AI Employee: $597/mo + $2,500 setup (everything)
 * - Web Chat Only: $79/mo + $497 setup
 */

import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';
import { SMSDemo } from '@/components/ai-employee/SMSDemo';
import { ClientOnly } from '@/components/ClientOnly';
import { 
  Moon, 
  ShieldCheck, 
  Bot, 
  MessageSquare,
  ArrowRight,
  Phone,
  Bell,
  CheckCircle2,
  FileText,
  Calendar
} from 'lucide-react';

// ============================================
// DATA - Consolidated to 3 modes + web chat
// ============================================

const aiModes = [
  {
    id: 'after-hours',
    name: 'After-Hours',
    icon: Moon,
    description: 'AI answers calls when you\'re closed, books appointments, and texts back missed calls. Complete after-hours coverage.',
    bestFor: 'Businesses with set hours',
    price: '$197',
    setup: '$997',
    href: '/let-ai-handle-it/after-hours',
  },
  {
    id: 'front-office',
    name: 'Front Office',
    icon: ShieldCheck,
    description: 'AI answers during business hours. Screens callers, qualifies leads, recovers missed calls, transfers hot opportunities live.',
    bestFor: 'Teams drowning in calls',
    price: '$297',
    setup: '$1,497',
    href: '/let-ai-handle-it/front-office',
  },
  {
    id: 'full',
    name: 'Full AI Employee',
    icon: Bot,
    description: 'All modes combined. Your complete AI-powered front office—voice, SMS, booking, screening, web chat.',
    bestFor: 'Maximum automation',
    price: '$597',
    setup: '$2,500',
    featured: true,
    href: '/let-ai-handle-it/full-ai-employee',
  },
  {
    id: 'web-chat',
    name: 'Web Chat Only',
    icon: MessageSquare,
    description: 'AI chat widget for your website. Capture leads 24/7 without voice AI.',
    bestFor: 'Website chat without phone',
    price: '$79',
    setup: '$497',
    href: '/contact',
  },
];

const transcriptProofs = [
  {
    title: '11pm emergency call → $2,400 job booked',
    preview: '"I have a water heater emergency!" AI responded in 12 seconds, booked a 7am appointment.',
    result: 'Plumber arrived, fixed leak, $2,400 invoice paid same day.',
  },
  {
    title: 'Missed call recovered → New client signed',
    preview: 'Customer called during lunch rush. AI texted back in 47 seconds.',
    result: 'Booked consultation, signed $4,800 annual contract.',
  },
  {
    title: 'FAQ handled → Owner saved 20 min',
    preview: '"What are your hours? Do you do weekends?" AI answered instantly.',
    result: 'Customer booked Saturday appointment without owner involvement.',
  },
];

const howItWorksSteps = [
  { icon: Phone, label: 'Customer calls or texts', color: 'text-intent-blue' },
  { icon: Bot, label: 'AI responds instantly', color: 'text-accent' },
  { icon: Calendar, label: 'Qualifies and books', color: 'text-highlight' },
  { icon: Bell, label: 'You get notified', color: 'text-accent' },
];

// ============================================
// COMPONENT
// ============================================

export default function AIEmployee() {
  return (
    <>
      <SEO 
        title="AI Employee: 24/7 AI Phone Answering"
        description="AI receptionist for Long Beach, Orange County, and LA businesses. Answers calls 24/7, books appointments, recovers missed leads. From $197/mo."
        canonical="/let-ai-handle-it"
      />
      
      <main className="min-h-screen">
        {/* Hero Section - Full Viewport */}
        <section className="relative min-h-[90vh] flex items-center py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-background to-background" />
          <div className="absolute inset-0 bg-mesh opacity-30" />
          
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Let AI Handle It
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Your phone answered 24/7. Missed calls recovered. Appointments booked automatically.
              </p>
              
              {/* Stats Row */}
              <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-10 text-sm md:text-base">
                <div className="text-center">
                  <span className="text-destructive font-bold">62%</span>
                  <span className="text-muted-foreground ml-2">of calls missed</span>
                </div>
                <div className="text-muted-foreground">→</div>
                <div className="text-center">
                  <span className="text-destructive font-bold">$200+</span>
                  <span className="text-muted-foreground ml-2">lost per call</span>
                </div>
                <div className="text-muted-foreground">→</div>
                <div className="text-center">
                  <span className="text-accent font-bold">AI fixes this</span>
                </div>
              </div>
              
              {/* CTAs */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link 
                  to="/pricing?tab=ai"
                  className="btn-gold btn-glow"
                >
                  See Pricing
                </Link>
                <a 
                  href="#demo" 
                  className="group inline-flex items-center gap-2 px-6 py-3 text-foreground hover:text-accent transition-colors"
                >
                  <span>Watch Demo</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SMS Demo Section */}
        <section id="demo" className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              {/* Left: Phone Mockup */}
              <div className="order-2 lg:order-1">
                <ClientOnly>
                  <SMSDemo />
                </ClientOnly>
              </div>
              
              {/* Right: Copy */}
              <div className="order-1 lg:order-2 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
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

        {/* Mode Cards Section */}
        <section id="modes" className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Choose Your Mode
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Three ways to let AI handle your phones. All modes include missed call text-back.
              </p>
            </div>

            {/* Mode Cards */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {aiModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <div
                    key={mode.id}
                    className={`rounded-2xl p-6 border transition-all duration-300 hover-lift ${
                      mode.featured
                        ? 'bg-accent/10 border-accent/50 shadow-lg shadow-accent/10'
                        : 'bg-card/50 border-border/30 hover:border-accent/30'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      {/* Icon & Name */}
                      <div className="flex items-center gap-4 md:w-1/4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          mode.featured ? 'bg-accent/20' : 'bg-muted'
                        }`}>
                          <Icon className={`w-6 h-6 ${mode.featured ? 'text-accent' : 'text-muted-foreground'}`} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{mode.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">Best for: {mode.bestFor}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground md:flex-1">
                        {mode.description}
                      </p>

                      {/* Pricing */}
                      <div className="flex items-center gap-6 md:w-auto">
                        <div className="text-right">
                          <span className="text-2xl font-bold text-foreground">{mode.price}</span>
                          <span className="text-muted-foreground text-sm">/mo</span>
                          <p className="text-xs text-muted-foreground">{mode.setup} setup</p>
                        </div>
                        <Link
                          to={mode.href}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                            mode.featured
                              ? 'bg-accent text-accent-foreground hover:bg-accent-hover'
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                          }`}
                        >
                          Learn More
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Setup Fee Callout */}
        <section className="py-12 bg-muted/30">
          <div className="container">
            <div className="max-w-3xl mx-auto rounded-2xl border border-accent/30 bg-accent/5 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-2">One-Time Setup Includes:</h3>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      Business-specific AI training
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      System integration
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      Testing & QA
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      30-day optimization
                    </li>
                  </ul>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-sm text-muted-foreground">All modes include:</p>
                  <p className="text-lg font-bold text-accent">Missed call text-back</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Transcript Proof Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Real Results from Real Businesses
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These conversations happened. These jobs were booked. This revenue was captured.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {transcriptProofs.map((proof, index) => (
                <div 
                  key={index}
                  className="rounded-2xl border border-border/30 bg-card/50 p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <FileText className="w-5 h-5 text-accent" />
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">Real Result</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">{proof.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 italic">"{proof.preview}"</p>
                  <p className="text-sm text-accent font-medium">{proof.result}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How It Works
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 max-w-4xl mx-auto">
              {howItWorksSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-card border border-border/50 flex items-center justify-center mb-3">
                        <Icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      <p className="text-sm text-foreground font-medium max-w-[120px]">{step.label}</p>
                    </div>
                    {index < howItWorksSteps.length - 1 && (
                      <ArrowRight className="w-6 h-6 text-muted-foreground hidden md:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to never miss a lead?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join hundreds of local businesses using AI Employee to capture every call.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link 
                  to="/pricing?tab=ai"
                  className="btn-gold btn-glow"
                >
                  See Pricing
                </Link>
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
