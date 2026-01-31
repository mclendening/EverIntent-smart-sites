/**
 * @fileoverview AI Employee Product Page
 * @module pages/AIEmployee
 * 
 * The primary product page for the AI Employee™ — a 24/7 AI receptionist system.
 * Per BRD v35.0, this is the hero product with 5 operating modes (M1-M5).
 * 
 * Page Structure:
 * - Hero: "Your AI Receptionist" value prop
 * - Problem: Missed call revenue loss ($200+ per missed call)
 * - Solution: AI Employee capabilities
 * - Modes: 5 operating modes with pricing
 * - Social Proof: Transcript examples
 * - CTA: Route to checkout
 */

import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import { 
  Phone, 
  Clock, 
  Calendar, 
  MessageSquare, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  PhoneOff,
  DollarSign,
  Bot,
  Zap
} from 'lucide-react';

/**
 * AI Employee operating modes per BRD v35.0.
 * Each mode represents a different level of AI automation.
 */
const aiModes = [
  {
    id: 'M1',
    name: 'After-Hours Answering',
    description: 'AI answers calls outside business hours, takes messages, and sends SMS summaries.',
    price: '$497/mo',
    setupFee: '$997',
    features: ['Voice answering', 'Message taking', 'SMS summaries', 'Call transcripts'],
    icon: Clock,
    path: '/let-ai-handle-it/after-hours',
  },
  {
    id: 'M2',
    name: 'After-Hours + Booking',
    description: 'Everything in M1, plus AI books appointments directly into your calendar.',
    price: '$497/mo',
    setupFee: '$997',
    features: ['All M1 features', 'Calendar integration', 'Appointment booking', 'Confirmation SMS'],
    icon: Calendar,
    popular: true,
    path: '/let-ai-handle-it/booking',
  },
  {
    id: 'M3',
    name: 'Missed Call Recovery',
    description: 'AI follows up on missed calls with SMS, re-engages leads, and books appointments.',
    price: '$497/mo',
    setupFee: '$997',
    features: ['Missed call detection', 'Automated SMS follow-up', 'Lead re-engagement', 'Booking links'],
    icon: PhoneOff,
    path: '/let-ai-handle-it/missed-call',
  },
  {
    id: 'M4',
    name: 'Front Line Screener',
    description: 'AI screens all incoming calls, qualifies leads, and transfers hot prospects to you.',
    price: '$547/mo',
    setupFee: '$1,497',
    features: ['Live call screening', 'Lead qualification', 'Priority routing', 'Human transfer'],
    icon: ShieldCheck,
    path: '/let-ai-handle-it/screening',
  },
  {
    id: 'M5',
    name: 'Full AI Employee',
    description: 'Complete AI receptionist: voice, SMS, web chat, booking, screening, and transfers.',
    price: '$597/mo',
    setupFee: '$2,500',
    features: ['All M1-M4 features', 'Web chat integration', 'Multi-channel support', 'Priority support'],
    icon: Bot,
    path: '/let-ai-handle-it/full-takeover',
  },
];

/**
 * Problem statistics to emphasize revenue loss from missed calls.
 */
const problemStats = [
  { value: '62%', label: 'of calls to small businesses go unanswered' },
  { value: '$200+', label: 'average value of a missed call' },
  { value: '$2,400', label: 'monthly revenue lost to 12 missed calls' },
];

/**
 * AI Employee capabilities for the solution section.
 */
const capabilities = [
  { icon: Phone, title: 'Voice Answering', description: 'Natural voice AI answers calls like a real receptionist' },
  { icon: MessageSquare, title: 'SMS Follow-up', description: 'Automated text messages to recover missed leads' },
  { icon: Calendar, title: 'Instant Booking', description: 'Books appointments directly into your calendar' },
  { icon: ShieldCheck, title: 'Call Screening', description: 'Qualifies leads and filters spam calls' },
  { icon: Zap, title: 'Human Transfer', description: 'Hot leads transferred to you in real-time' },
  { icon: Bot, title: 'Web Chat', description: 'AI chat widget for your website visitors' },
];

/**
 * AI Employee product page component.
 * Primary conversion path for the AI-first business model.
 * 
 * @component
 * @returns {JSX.Element} Complete AI Employee product page
 */
export default function AIEmployee() {
  return (
    <>
      <SEO 
        title="AI Employee™ — Your 24/7 AI Receptionist | EverIntent"
        description="Stop losing money to missed calls. AI Employee answers 24/7, books appointments, screens calls, and recovers missed leads. Starting at $497/mo."
      />
      
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
          <div className="absolute inset-0 bg-mesh opacity-30" />
          
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <Bot className="w-4 h-4" />
                <span>AI Employee™</span>
              </div>
              
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-foreground">Your</span>{' '}
                <span className="text-gradient">24/7 AI Receptionist</span>
              </h1>
              
              {/* Subheadline */}
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Never miss another call. Never lose another lead. 
                AI Employee answers, books, and screens — so you can focus on the work that matters.
              </p>
              
              {/* CTA */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                <CTAButton 
                  to="/pricing" 
                  defaultText="See Pricing"
                  hoverText="Starting at $497/mo"
                />
                <a 
                  href="#modes" 
                  className="group inline-flex items-center gap-2 px-6 py-3 text-foreground hover:text-accent transition-colors"
                >
                  <span>Explore Modes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Problem Section */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Missed Calls Are</span>{' '}
                <span className="text-gradient">Killing Your Revenue</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Every unanswered call is a customer choosing your competitor instead.
              </p>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {problemStats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-background border border-border/50">
                  <div className="flex items-center justify-center mb-4">
                    <DollarSign className="w-8 h-8 text-destructive" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Solution Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">AI Employee</span>{' '}
                <span className="text-gradient">Has You Covered</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                A complete AI receptionist system that handles calls, messages, and bookings — 24 hours a day, 7 days a week.
              </p>
            </div>
            
            {/* Capabilities Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {capabilities.map((cap, index) => (
                <div key={index} className="p-6 rounded-2xl bg-card border border-border/50 hover:border-accent/30 transition-colors">
                  <cap.icon className="w-10 h-10 text-accent mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Modes Section */}
        <section id="modes" className="py-16 md:py-24 bg-card">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Choose Your</span>{' '}
                <span className="text-gradient">AI Mode</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Five operating modes to match your business needs. Start simple, scale as you grow.
              </p>
            </div>
            
            {/* Modes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {aiModes.map((mode) => (
                <div 
                  key={mode.id} 
                  className={`relative p-6 rounded-2xl bg-background border transition-all ${
                    mode.popular 
                      ? 'border-accent shadow-lg shadow-accent/10' 
                      : 'border-border/50 hover:border-accent/30'
                  }`}
                >
                  {mode.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-xl bg-accent/10">
                      <mode.icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">{mode.id}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-foreground mb-2">{mode.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{mode.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-foreground">{mode.price}</span>
                    <span className="text-sm text-muted-foreground ml-2">+ {mode.setupFee} setup</span>
                  </div>
                  
                  <ul className="space-y-2 mb-6">
                    {mode.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <CTAButton 
                    to={mode.path}
                    defaultText="Learn More"
                    hoverText="See Details"
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Final CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Ready to Stop</span>{' '}
                <span className="text-gradient">Losing Leads?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join hundreds of local businesses using AI Employee to capture every call and convert more leads.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <CTAButton 
                  to="/pricing" 
                  defaultText="See All Pricing"
                  hoverText="Let's Go!"
                />
                <a 
                  href="/contact" 
                  className="group inline-flex items-center gap-2 px-6 py-3 text-foreground hover:text-accent transition-colors"
                >
                  <span>Talk to a Human</span>
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
