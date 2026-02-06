/**
 * @fileoverview Booking Agent Mode Page
 * @module pages/ai-employee/BookingAgent
 * 
 * Dedicated product page for AI Employee Mode 2: After-Hours + Booking.
 * Everything in Mode 1, plus AI books appointments directly into your calendar.
 */

import { SEO } from '@/components/SEO';
import { CTAButton } from '@/components/CTAButton';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock,
  Users,
  Bell
} from 'lucide-react';

const features = [
  'All After-Hours Answering features',
  'Direct calendar integration (Google, Outlook)',
  'AI books appointments in real-time',
  'Sends confirmation SMS to customer',
  'Handles rescheduling requests',
  'Syncs with your existing booking system',
];

const useCases = [
  { title: 'Service Businesses', description: 'HVAC, plumbing, and contractors booking jobs 24/7' },
  { title: 'Medical Practices', description: 'Patients booking appointments after office hours' },
  { title: 'Salons & Spas', description: 'Clients scheduling without calling during hours' },
];

export default function BookingAgent() {
  return (
    <>
      <SEO 
        title="Booking Agent — AI Employee | EverIntent"
        description="AI answers calls and books appointments directly into your calendar 24/7. Wake up to a full schedule. $197/mo."
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
                <span className="text-accent">Booking Agent</span>
              </div>
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
                <Calendar className="w-4 h-4" />
                <span>Booking Agent</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                <span className="text-foreground">Wake Up to a</span>{' '}
                <span className="text-gradient">Full Calendar</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Your AI doesn't just answer calls — it books appointments directly into your calendar while you sleep. No back-and-forth. No missed opportunities.
              </p>
              
              {/* Pricing */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-foreground">$197</span>
                <span className="text-muted-foreground">/mo</span>
                <span className="text-sm text-muted-foreground ml-2">+ $1,497 setup</span>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <CTAButton 
                  to="/pricing?tab=ai" 
                  defaultText="Get Started"
                  hoverText="Book More Jobs"
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
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">1. Customer Calls</h3>
                <p className="text-sm text-muted-foreground">AI answers and understands they want to book</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">2. Checks Your Calendar</h3>
                <p className="text-sm text-muted-foreground">Finds available slots and offers options</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2">3. Books & Confirms</h3>
                <p className="text-sm text-muted-foreground">Appointment created, both parties get SMS</p>
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
                <span className="text-gradient">Booking Agent?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Perfect for appointment-based businesses that want 24/7 booking capability.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-5 rounded-xl bg-card border border-border/50">
                  <h3 className="font-semibold text-foreground mb-2">Best For</h3>
                  <p className="text-sm text-muted-foreground">Service businesses, medical practices, salons</p>
                </div>
                <div className="p-5 rounded-xl bg-card border border-border/50">
                  <h3 className="font-semibold text-foreground mb-2">Key Benefit</h3>
                  <p className="text-sm text-muted-foreground">Wake up to a full calendar without lifting a finger</p>
                </div>
                <div className="p-5 rounded-xl bg-accent/5 border border-accent/30">
                  <h3 className="font-semibold text-accent mb-2">Want Everything?</h3>
                  <p className="text-sm text-muted-foreground">Full AI Employee includes all modes for $597/mo</p>
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
                <span className="text-foreground">Ready to Fill Your</span>{' '}
                <span className="text-gradient">Calendar Automatically?</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Let AI book appointments while you focus on the work.
              </p>
              <CTAButton 
                to="/pricing?tab=ai" 
                defaultText="Get Booking Agent"
                hoverText="$197/mo + $1,497 setup"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
