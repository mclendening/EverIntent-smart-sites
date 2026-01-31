/**
 * @fileoverview Missed Call Recovery Mode Page
 * @module pages/ai-employee/MissedCallRecovery
 * 
 * Dedicated product page for AI Employee Mode 3: Missed Call Recovery.
 * AI follows up on missed calls with SMS, re-engages leads, and books appointments.
 */

import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import { Link } from 'react-router-dom';
import { 
  PhoneOff, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare,
  RefreshCw,
  DollarSign
} from 'lucide-react';

const features = [
  'Instant detection of missed calls',
  'Automated SMS follow-up within seconds',
  'Personalized message with your business name',
  'Includes booking link or callback request',
  'Tracks which leads respond',
  'Dashboard shows recovery rate metrics',
];

const stats = [
  { value: '78%', label: 'of leads text back within 5 minutes' },
  { value: '$200+', label: 'average value of a recovered call' },
  { value: '3-5x', label: 'ROI compared to monthly cost' },
];

export default function MissedCallRecovery() {
  return (
    <>
      <SEO 
        title="Missed Call Recovery — AI Employee | EverIntent"
        description="Automatically text customers who couldn't reach you. Recover lost leads with instant SMS follow-up. $497/mo."
      />
      
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
          
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                <Link to="/let-ai-handle-it" className="hover:text-accent transition-colors">AI Employee</Link>
                <span>/</span>
                <span className="text-accent">Missed Call Recovery</span>
              </div>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <PhoneOff className="w-4 h-4" />
                <span>Missed Call Recovery</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-foreground">Turn Missed Calls Into</span>{' '}
                <span className="text-gradient">Booked Jobs</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Every missed call gets an instant text: "Sorry we missed you! Click here to book or we'll call you back." Recover leads that would have gone to competitors.
              </p>
              
              {/* Pricing */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">$497</span>
                <span className="text-muted-foreground">/mo</span>
                <span className="text-sm text-muted-foreground ml-2">+ $997 setup</span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <CTAButton 
                  to="/pricing#missed-call" 
                  defaultText="Get Started"
                  hoverText="Recover Lost Leads"
                />
                <Link 
                  to="/let-ai-handle-it" 
                  className="group inline-flex items-center gap-2 px-6 py-3 text-foreground hover:text-accent transition-colors"
                >
                  <span>Compare All Modes</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 rounded-2xl bg-background border border-border/50">
                  <div className="flex items-center justify-center mb-4">
                    <DollarSign className="w-8 h-8 text-accent" />
                  </div>
                  <div className="text-4xl font-bold text-foreground mb-2">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="text-foreground">How It</span>{' '}
              <span className="text-gradient">Works</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <PhoneOff className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Call Goes Unanswered</h3>
                <p className="text-sm text-muted-foreground">You're on the job, on another call, or closed</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. Instant SMS Sent</h3>
                <p className="text-sm text-muted-foreground">Within seconds, they get your follow-up text</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Lead Re-Engaged</h3>
                <p className="text-sm text-muted-foreground">They book online or request a callback</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                <span className="text-foreground">What's</span>{' '}
                <span className="text-gradient">Included</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Stop Losing</span>{' '}
                <span className="text-gradient">$200+ Per Missed Call</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Every missed call is a customer choosing your competitor. Fix it today.
              </p>
              <CTAButton 
                to="/pricing#missed-call" 
                defaultText="Get Missed Call Recovery"
                hoverText="$497/mo + $997 setup"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
