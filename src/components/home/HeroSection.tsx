/**
 * @fileoverview Luxury Hero Section
 * @module components/home/HeroSection
 * 
 * Clean, editorial design with single powerful headline.
 * Human element focus with subtle animation.
 */

import { ArrowRight } from 'lucide-react';

/**
 * Luxury Hero Section - Clean dark background, single powerful headline.
 * Features one primary CTA and one secondary text link.
 * 
 * @component
 */
export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] md:min-h-[90vh] flex items-center justify-center overflow-hidden bg-background" aria-label="Hero: AI Employee and Smart Websites for local businesses">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />
      
      {/* Very subtle gold accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Headline - Single powerful statement */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 md:mb-8 animate-fade-in tracking-tight">
            <span className="text-foreground">Never miss</span>
            <br />
            <span className="text-foreground">another </span>
            <span className="text-gradient">lead.</span>
          </h1>
          
          {/* Subheadline - Clear value prop */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '150ms' }}>
            EverIntent provides AI Employee automation and websites for local businesses. 
            Your phone answered 24/7. Appointments booked automatically. Leads captured while you sleep.
          </p>
          
          {/* CTAs - Primary filled, secondary text link */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <a 
              href="/let-ai-handle-it" 
              className="btn-gold btn-glow w-full sm:w-auto"
            >
              See AI Employee
            </a>
            <a 
              href="/smart-websites" 
              className="group inline-flex items-center gap-2 px-4 py-3 text-foreground hover:text-accent transition-colors duration-300"
            >
              <span className="story-link">See Smart Websites</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Trust strip - Simple elegant line with gold accents */}
          <div className="animate-fade-in" style={{ animationDelay: '450ms' }}>
            <div className="inline-flex items-center gap-6 md:gap-8 text-sm border-t border-accent/30 pt-8">
              <span className="flex items-center gap-1.5">
                <span className="text-accent">★</span>
                <span className="text-muted-foreground">4.9 Rating</span>
              </span>
              <span className="w-px h-4 bg-accent/30" />
              <span className="flex items-center gap-1.5">
                <span className="text-accent">⚡</span>
                <span className="text-muted-foreground">5-Day Delivery</span>
              </span>
              <span className="w-px h-4 bg-accent/30" />
              <span className="flex items-center gap-1.5">
                <span className="text-accent">✓</span>
                <span className="text-muted-foreground">No Contracts</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card/50 to-transparent" />
    </section>
  );
}
