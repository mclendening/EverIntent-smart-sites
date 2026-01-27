/**
 * @fileoverview Luxury Hero Section - Editorial Design
 * @module components/home/HeroSection
 * 
 * Premium agency aesthetic with:
 * - Single powerful headline with serif typography
 * - Minimal subheading, generous white space
 * - Gold accent CTAs
 * - Clean dark background
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * Premium Hero Section - Editorial luxury design
 * Clean, minimal, high-impact headline with generous spacing
 * 
 * @component
 */
export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background" />
      
      {/* Minimal gold accent glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Eyebrow - minimal */}
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-8 animate-fade-in">
            AI-Powered Business Solutions
          </p>
          
          {/* Main headline - serif, large, high contrast */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold text-foreground leading-[0.95] mb-8 animate-fade-in" style={{ animationDelay: '100ms' }}>
            Never miss
            <br />
            <span className="italic text-accent">another lead.</span>
          </h1>
          
          {/* Subheadline - concise, benefit-focused */}
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
            AI receptionist answers 24/7. Smart websites that convert. 
            <span className="text-foreground"> Built for local businesses.</span>
          </p>
          
          {/* CTAs - Primary gold, Secondary text link */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <Link 
              to="/let-ai-handle-it" 
              className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground font-medium transition-all duration-300 hover:bg-accent-hover hover:shadow-glow"
            >
              <span>See AI Employee</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            
            <Link 
              to="/smart-websites" 
              className="group inline-flex items-center gap-2 px-6 py-4 text-foreground font-medium transition-all duration-300"
            >
              <span className="story-link">Smart Websites</span>
              <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Trust strip - minimal */}
          <div className="mt-20 pt-12 border-t border-border/20 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>24/7 AI Coverage</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>5-Day Website Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                <span>No Contracts</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
