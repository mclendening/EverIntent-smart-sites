/**
 * @fileoverview Full AI Employee Mode Page
 * @module pages/ai-employee/FullTakeover
 * 
 * Dedicated product page for AI Employee Mode 5: Full AI Employee.
 * Complete AI receptionist: voice, SMS, web chat, booking, screening, and transfers.
 */

import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  ArrowRight, 
  CheckCircle2, 
  Phone,
  MessageSquare,
  Calendar,
  ShieldCheck,
  Zap,
  Globe
} from 'lucide-react';

const features = [
  'Everything from all other modes included',
  'Voice AI for phone calls 24/7',
  'SMS follow-up and conversations',
  'Web chat widget for your website',
  'Appointment booking integration',
  'Call screening and qualification',
  'Live transfer of hot leads',
  'Multi-channel lead management',
  'Priority support and onboarding',
];

const capabilities = [
  { icon: Phone, title: 'Voice Calls', description: 'Answers and handles phone calls' },
  { icon: MessageSquare, title: 'SMS', description: 'Text conversations with leads' },
  { icon: Globe, title: 'Web Chat', description: 'Chat widget on your website' },
  { icon: Calendar, title: 'Booking', description: 'Books directly into calendar' },
  { icon: ShieldCheck, title: 'Screening', description: 'Qualifies every lead' },
  { icon: Zap, title: 'Live Transfer', description: 'Hot leads to you instantly' },
];

export default function FullTakeover() {
  return (
    <>
      <SEO 
        title="Full AI Employee — Complete Phone Management | EverIntent"
        description="Complete AI receptionist handling voice, SMS, web chat, booking, screening, and transfers. Your entire phone operation, automated. $597/mo."
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
                <span className="text-accent">Full AI Employee</span>
              </div>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <Bot className="w-4 h-4" />
                <span>Full AI Employee</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-foreground">Your Complete</span>{' '}
                <span className="text-gradient">AI Employee</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Every channel. Every hour. Every lead. Your Full AI Employee handles calls, texts, web chat, booking, and screening — so you can focus on the work that pays.
              </p>
              
              {/* Pricing */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">$597</span>
                <span className="text-muted-foreground">/mo</span>
                <span className="text-sm text-muted-foreground ml-2">+ $2,500 setup</span>
              </div>
              
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
          </div>
        </section>
        
        {/* Capabilities Grid */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="text-foreground">Every Channel,</span>{' '}
              <span className="text-gradient">Covered</span>
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {capabilities.map((cap, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-background border border-border/50 text-center">
                  <cap.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-1">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground">{cap.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                <span className="text-foreground">Everything</span>{' '}
                <span className="text-gradient">Included</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Comparison */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Why Full</span>{' '}
                <span className="text-gradient">AI Employee?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Instead of piecing together individual modes, get everything in one package with priority support.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-background border border-border/50 text-left">
                  <h3 className="text-lg font-semibold mb-4 text-muted-foreground">Individual Modes</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Pay for each mode separately</li>
                    <li>• Basic support</li>
                    <li>• Standard onboarding</li>
                    <li>• May need multiple setups</li>
                  </ul>
                </div>
                
                <div className="p-6 rounded-2xl bg-accent/5 border border-accent/30 text-left">
                  <h3 className="text-lg font-semibold mb-4 text-accent">Full AI Employee</h3>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• All modes included</li>
                    <li>• Priority support</li>
                    <li>• White-glove onboarding</li>
                    <li>• Single unified system</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Ready for the</span>{' '}
                <span className="text-gradient">Complete Solution?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let AI handle your entire phone operation. You focus on what matters.
              </p>
              <CTAButton 
                to="/pricing?tab=ai" 
                defaultText="Get Full AI Employee"
                hoverText="$597/mo + $2,500 setup"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
