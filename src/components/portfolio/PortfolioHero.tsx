/**
 * @fileoverview Portfolio hub hero section with animated stats
 * @module components/portfolio/PortfolioHero
 */

import { useEffect, useRef, useState } from 'react';
import { hubStats } from './portfolioData';

/**
 * Animated counter hook for scroll-triggered number animation
 */
const useCountUp = (end: number, duration: number = 2000, inView: boolean) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const isDecimal = !Number.isInteger(end);

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = end * easeOut;
      
      setCount(isDecimal ? Math.round(currentValue * 10) / 10 : Math.round(currentValue));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, inView]);

  return count;
};

/**
 * Individual stat display with count-up animation
 */
const AnimatedStat = ({ 
  value, 
  suffix, 
  prefix = '', 
  label, 
  inView 
}: { 
  value: number; 
  suffix: string; 
  prefix?: string; 
  label: string; 
  inView: boolean;
}) => {
  const count = useCountUp(value, 2000, inView);
  
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-accent mb-2">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm sm:text-base text-muted-foreground uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
};

/**
 * Portfolio hero section with headline and animated statistics
 */
export const PortfolioHero = () => {
  const [inView, setInView] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container relative z-10">
        {/* Headline */}
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            Beautiful Websites
            <span className="block text-gradient mt-2">That Drive Results</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Every project begins with understanding your business, your customers, and your goals.
          </p>
        </div>

        {/* Animated Stats */}
        <div 
          ref={statsRef}
          className="grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          {hubStats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              prefix={stat.prefix}
              label={stat.label}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioHero;
