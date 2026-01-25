/**
 * @fileoverview AI-First Homepage Hero Section
 * @module components/home/HeroSection
 * 
 * AI Employee pivot messaging per BRD v35.0:
 * - Primary value prop: "Stop Losing Money to Missed Calls"
 * - AI Receptionist as the hero product
 * - Trust indicators: 24/7 coverage, instant booking, call screening
 */

import { ArrowRight, Phone, Clock, Calendar } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';
import heroBackground from '@/assets/hero-background.jpg';

/**
 * AI-First Hero Section for the homepage.
 * Emphasizes the AI Receptionist value proposition: recovering missed call revenue.
 * 
 * Layout:
 * - Background image with dark overlay for text readability
 * - Centered content with animated fade-in elements
 * - Primary CTA (See AI Employee) and secondary CTA (Smart Websites)
 * - Value prop badges: "24/7 Coverage", "Instant Booking", "Call Screening"
 * 
 * Messaging shift from v34.0:
 * - OLD: "A website that actually gets you customers"
 * - NEW: "Stop Losing Money to Missed Calls"
 * 
 * @component
 * @example
 * <HeroSection />
 */
export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Hero image background */}
      <div className="absolute inset-0">
        <img 
          src={heroBackground} 
          alt="" 
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-background/80" />
      </div>
      
      {/* Subtle mesh overlay */}
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6 animate-fade-in">
            <Phone className="w-4 h-4" />
            <span>AI Employee™ — Your 24/7 Receptionist</span>
          </div>
          
          {/* Headline - AI-First Messaging */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <span className="text-foreground">Stop Losing Money to</span>
            <br />
            <span className="text-gradient">Missed Calls.</span>
          </h1>
          
          {/* Subheadline - Problem agitation + Solution */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 px-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Every missed call costs you <span className="text-foreground font-semibold">$200+</span> in potential revenue. 
            Our AI Receptionist answers 24/7, books appointments, and screens calls — so you never lose another lead.
          </p>
          
          {/* CTAs - AI Employee primary, Smart Websites secondary */}
          <div className="flex flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CTAButton 
              to="/let-ai-handle-it" 
              defaultText="See AI Employee"
              hoverText="Meet Your AI"
            />
            <a 
              href="/smart-websites" 
              className="group inline-flex items-center gap-2 px-4 sm:px-6 py-3 text-foreground hover:text-primary transition-colors duration-300"
            >
              <span className="story-link whitespace-nowrap">Smart Websites</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Ladder tagline - explains the conversion journey */}
          <p className="text-xs sm:text-sm text-muted-foreground/80 mb-8 animate-fade-in" style={{ animationDelay: '350ms' }}>
            Start with a Smart Site. Upgrade to Smart Lead/Business/Growth. Let AI handle it when you're ready.
          </p>
          
          {/* Value props - AI-focused */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" />
              <span>24/7 Coverage</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent" />
              <span>Instant Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-accent" />
              <span>Call Screening</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-2 md:h-3 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
