/**
 * @fileoverview Luxury Hero Section - Editorial Design
 * @module components/home/HeroSection
 * 
 * Premium agency aesthetic with serif typography, gold accents,
 * generous negative space, and cinematic simplicity.
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

/**
 * Luxury Hero Section for the homepage.
 * Clean dark background, powerful headline, editorial typography.
 * 
 * @component
 */
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Pure dark background */}
      <div className="absolute inset-0 bg-background" />
      
      {/* Subtle gold accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow - minimal */}
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-8 animate-fade-in">
            AI-Powered Business Solutions
          </p>
          
          {/* Headline - Serif, Editorial */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium leading-[1.05] mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <span className="text-foreground">Never miss</span>
            <br />
            <span className="text-foreground">another </span>
            <span className="text-gradient italic">lead.</span>
          </h1>
          
          {/* Subheadline - Clean, benefit-focused */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
            AI receptionists and smart websites that capture every opportunity, 
            book appointments, and grow your business — 24/7.
          </p>
          
          {/* CTAs - Primary gold, Secondary outline */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Button asChild className="bg-accent hover:bg-accent-hover text-accent-foreground px-8 py-6 text-base font-medium transition-all duration-400 hover:shadow-glow">
              <Link to="/let-ai-handle-it">
                See AI Employee
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="border-border/50 hover:border-accent/50 text-foreground hover:text-accent px-8 py-6 text-base transition-all duration-400">
              <Link to="/smart-websites">
                Smart Websites
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
          
          {/* Trust strip - elegant, minimal */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-muted-foreground/70 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              24/7 Coverage
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              5-Day Delivery
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              No Contracts
            </span>
          </div>
        </div>
      </div>
      
      {/* Subtle bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
