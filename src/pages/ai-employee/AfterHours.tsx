/**
 * @fileoverview After-Hours Answering Mode Page
 * @module pages/ai-employee/AfterHours
 * 
 * Dedicated product page for AI Employee Mode 1: After-Hours Answering.
 * AI answers calls outside business hours, takes messages, and sends SMS summaries.
 */

import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  Phone,
  FileText,
  Moon
} from 'lucide-react';

const features = [
  'Natural voice AI answers calls after hours',
  'Takes detailed messages from callers',
  'Sends SMS summaries to your phone',
  'Full call transcripts available',
  'Custom greeting with your business name',
  'Handles FAQs about hours and location',
];

const useCases = [
  { title: 'Weekend Coverage', description: 'Never miss a Saturday lead while you\'re with family' },
  { title: 'Holiday Answering', description: 'Stay available during holidays without working' },
  { title: 'Evening Calls', description: 'Capture leads calling after 5pm' },
];

export default function AfterHours() {
  return (
    <>
      <SEO 
        title="After-Hours Answering — AI Employee | EverIntent"
        description="AI answers your calls after business hours, takes messages, and sends SMS summaries. Never miss an after-hours lead again. $149/mo."
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
                <span className="text-accent">After-Hours</span>
              </div>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <Moon className="w-4 h-4" />
                <span>After-Hours Answering</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-foreground">Never Miss an</span>{' '}
                <span className="text-gradient">After-Hours Lead</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Your AI receptionist answers calls when you're closed, takes messages, and texts you the details. Wake up to leads, not voicemails.
              </p>
              
              {/* Pricing */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">$149</span>
                <span className="text-muted-foreground">/mo</span>
                <span className="text-sm text-muted-foreground ml-2">+ $1,497 setup</span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <CTAButton 
                  to="/pricing?tab=ai" 
                  defaultText="Get Started"
                  hoverText="Start Tonight"
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
        
        {/* How It Works */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="text-foreground">How It</span>{' '}
              <span className="text-gradient">Works</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Customer Calls</h3>
                <p className="text-sm text-muted-foreground">After hours, AI answers with your custom greeting</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. AI Takes Message</h3>
                <p className="text-sm text-muted-foreground">Captures name, number, and reason for calling</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. You Get a Text</h3>
                <p className="text-sm text-muted-foreground">Instant SMS summary + full transcript in dashboard</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                <span className="text-foreground">What's</span>{' '}
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
        
        {/* Use Cases */}
        <section className="py-16 md:py-24 bg-card">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              <span className="text-foreground">Perfect</span>{' '}
              <span className="text-gradient">For</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {useCases.map((useCase, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-background border border-border/50">
                  <Clock className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-sm text-muted-foreground">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why This Mode */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-foreground">Why</span>{' '}
                <span className="text-gradient">After-Hours?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Perfect for businesses with set hours who want to capture leads when closed.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-5 rounded-xl bg-card border border-border/50">
                  <h3 className="font-semibold text-foreground mb-2">Best For</h3>
                  <p className="text-sm text-muted-foreground">Businesses with set hours (9-5, weekdays only)</p>
                </div>
                <div className="p-5 rounded-xl bg-card border border-border/50">
                  <h3 className="font-semibold text-foreground mb-2">Key Benefit</h3>
                  <p className="text-sm text-muted-foreground">Never miss an evening or weekend lead again</p>
                </div>
                <div className="p-5 rounded-xl bg-accent/5 border border-accent/30">
                  <h3 className="font-semibold text-accent mb-2">Want Booking Too?</h3>
                  <p className="text-sm text-muted-foreground">Upgrade to After Hours + Booking for $197/mo</p>
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
                <span className="text-foreground">Ready to Capture</span>{' '}
                <span className="text-gradient">After-Hours Leads?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Stop losing customers to voicemail. Start tonight.
              </p>
              <CTAButton 
                to="/pricing?tab=ai" 
                defaultText="Get After-Hours Answering"
                hoverText="$149/mo + $1,497 setup"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
