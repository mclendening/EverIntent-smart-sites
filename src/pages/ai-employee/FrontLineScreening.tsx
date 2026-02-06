/**
 * @fileoverview Front Office Mode Page
 * @module pages/ai-employee/FrontLineScreening
 * 
 * Dedicated product page for AI Employee: Front Office Mode.
 * AI screens all incoming calls, qualifies leads, and transfers hot prospects.
 * Includes missed call text-back recovery.
 */

import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Phone,
  Filter,
  UserCheck,
  PhoneForwarded
} from 'lucide-react';

const features = [
  'AI answers every incoming call',
  'Asks qualifying questions you define',
  'Scores leads based on your criteria',
  'Hot leads transferred to you in real-time',
  'Missed call text-back in under 60 seconds',
  'Spam and solicitors filtered automatically',
  'Only talk to leads worth your time',
];

const qualifyingQuestions = [
  '"What service are you looking for?"',
  '"What\'s your timeline for this project?"',
  '"Do you have a budget in mind?"',
  '"What\'s the best way to reach you?"',
];

export default function FrontLineScreening() {
  return (
    <>
      <SEO 
        title="Front Office AI — Screen, Qualify & Transfer Calls | EverIntent"
        description="AI screens every call, qualifies leads, texts back missed calls, and only transfers hot prospects. Stop wasting time on tire-kickers. $297/mo."
      />
      
      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent" />
          
          <div className="container relative">
            <div className="max-w-4xl mx-auto text-center">
              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
                <Link to="/let-ai-handle-it" className="hover:text-accent transition-colors">AI Employee</Link>
                <span>/</span>
                <span className="text-accent">Front Office</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-foreground">Only Talk to</span>{' '}
                <span className="text-gradient">Qualified Leads</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Your AI front office screens every caller, asks qualifying questions, recovers missed calls, and only transfers the hot prospects. Spam callers and tire-kickers never reach you.
              </p>
              
              {/* Pricing */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">$297</span>
                <span className="text-muted-foreground">/mo</span>
                <span className="text-sm text-muted-foreground ml-2">+ $1,497 setup</span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <CTAButton 
                  to="/pricing?tab=ai" 
                  defaultText="Get Started"
                  hoverText="Screen Every Call"
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
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="text-foreground">How It</span>{' '}
              <span className="text-gradient">Works</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. AI Answers</h3>
                <p className="text-sm text-muted-foreground">Every call goes to your AI first</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. Qualifies Lead</h3>
                <p className="text-sm text-muted-foreground">Asks your screening questions</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Hot Transfer</h3>
                <p className="text-sm text-muted-foreground">Qualified leads transferred live to you</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <PhoneForwarded className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">4. Missed Call Recovery</h3>
                <p className="text-sm text-muted-foreground">Text-back in under 60 seconds</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Qualifying Questions */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">AI Asks</span>{' '}
                <span className="text-gradient">Your Questions</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                You define what makes a qualified lead. AI handles the rest.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {qualifyingQuestions.map((question, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-card border border-border/50 text-left">
                    <p className="text-foreground italic">{question}</p>
                  </div>
                ))}
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

        {/* Why This Mode */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Why</span>{' '}
                <span className="text-gradient">Front Office?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Perfect for teams drowning in calls who need to filter out tire-kickers.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="p-5 rounded-xl bg-card border border-border/50">
                  <h3 className="font-semibold text-foreground mb-2">Best For</h3>
                  <p className="text-sm text-muted-foreground">High-volume businesses, sales teams, busy offices</p>
                </div>
                <div className="p-5 rounded-xl bg-card border border-border/50">
                  <h3 className="font-semibold text-foreground mb-2">Key Benefit</h3>
                  <p className="text-sm text-muted-foreground">Only talk to qualified leads—AI handles the rest</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Ready to Stop</span>{' '}
                <span className="text-gradient">Wasting Time?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let AI handle the tire-kickers. You focus on closing deals.
              </p>
              <CTAButton 
                to="/pricing?tab=ai" 
                defaultText="Get Front Office Mode"
                hoverText="$297/mo + $1,497 setup"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
