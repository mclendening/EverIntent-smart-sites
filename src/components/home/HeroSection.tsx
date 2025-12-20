import { ArrowRight } from 'lucide-react';
import { CTAButton } from '@/components/CTAButton';
import heroBackground from '@/assets/hero-background.jpg';

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
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 mb-6 md:mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs md:text-sm text-muted-foreground">
              Trusted by 500+ local businesses
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <span className="text-foreground">A website that</span>
            <br />
            <span className="text-gradient">actually gets you customers.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 px-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
            Professional websites built for local businesses. Look amazing. Get found online. Turn visitors into paying customers.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-10 md:mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <CTAButton 
              to="/pricing" 
              defaultText="Get Started — $249"
              hoverText="See All Plans"
              fullWidth
              className="sm:w-auto"
            />
            <a 
              href="/our-work" 
              className="group inline-flex items-center gap-2 px-6 py-3 text-foreground hover:text-primary transition-colors duration-300"
            >
              <span className="story-link">See Our Work</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Value props */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>Ready in 5 days</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>You own everything</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>No hidden fees</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
