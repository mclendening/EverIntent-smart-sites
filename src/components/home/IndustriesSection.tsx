import { Home, Briefcase, Heart, Car, ArrowRight, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

// SVG Gradient definitions for icons
const GradientDefs = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      {/* Option 1: Ocean Blue - Deep navy to bright cyan */}
      <linearGradient id="gradient-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(210, 100%, 40%)" />
        <stop offset="50%" stopColor="hsl(200, 100%, 50%)" />
        <stop offset="100%" stopColor="hsl(185, 100%, 45%)" />
      </linearGradient>
      
      {/* Option 2: Royal Blue - Indigo to azure */}
      <linearGradient id="gradient-royal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(235, 85%, 55%)" />
        <stop offset="50%" stopColor="hsl(220, 90%, 55%)" />
        <stop offset="100%" stopColor="hsl(200, 100%, 50%)" />
      </linearGradient>
      
      {/* Option 3: Sky Blue - Light cerulean to teal */}
      <linearGradient id="gradient-sky" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(195, 90%, 50%)" />
        <stop offset="50%" stopColor="hsl(185, 85%, 48%)" />
        <stop offset="100%" stopColor="hsl(175, 80%, 45%)" />
      </linearGradient>
      
      {/* Option 4: Electric Blue - Vivid cobalt to bright blue */}
      <linearGradient id="gradient-electric" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(225, 95%, 55%)" />
        <stop offset="50%" stopColor="hsl(210, 100%, 55%)" />
        <stop offset="100%" stopColor="hsl(195, 100%, 50%)" />
      </linearGradient>
    </defs>
  </svg>
);

// Gradient Icon wrapper component
const GradientIcon = ({ icon: Icon, gradientId, className = "" }: { icon: LucideIcon; gradientId: string; className?: string }) => (
  <Icon 
    className={className}
    style={{ stroke: `url(#${gradientId})` }}
  />
);

const industries = [
  {
    icon: Home,
    name: 'Home Services',
    description: 'HVAC, plumbing, electrical, roofing, landscaping & more',
    verticals: '31 verticals',
    href: '/industries/home-services',
  },
  {
    icon: Briefcase,
    name: 'Professional Services',
    description: 'Legal, real estate, accounting, insurance & consulting',
    verticals: '15 verticals',
    href: '/industries/professional-services',
  },
  {
    icon: Heart,
    name: 'Health & Wellness',
    description: 'Dental, chiropractic, medspa, salons & fitness',
    verticals: '15 verticals',
    href: '/industries/health-wellness',
  },
  {
    icon: Car,
    name: 'Automotive',
    description: 'Auto repair, detailing, tire shops, body shops & towing',
    verticals: '10 verticals',
    href: '/industries/automotive-services',
  },
];

export function IndustriesSection() {
  return (
    <section className="relative py-16 md:py-24 bg-card/50">
      {/* Hidden SVG gradient definitions */}
      <GradientDefs />
      
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Built for </span>
            <span className="text-gradient">your industry</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            We understand local businesses. That's why we serve 65+ verticals across 4 industries.
          </p>
        </div>
        
        {/* Industries grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {industries.map((industry) => (
            <Link
              key={industry.name}
              to={industry.href}
              className="group relative bg-background rounded-xl p-5 md:p-6 border border-border/30 hover:border-primary/50 transition-all duration-300 hover-lift"
            >
              {/* Title row with inline icon */}
              <div className="flex items-center gap-3 mb-2">
                <GradientIcon 
                  icon={industry.icon} 
                  gradientId="gradient-ocean"
                  className="w-5 h-5 flex-shrink-0"
                />
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2 whitespace-nowrap">
                  {industry.name}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-muted-foreground" />
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground mb-2 pl-8">{industry.description}</p>
              <span className="text-xs text-foreground font-medium pl-8 flex items-center gap-2">
                {industry.verticals}
                <span className="w-6 h-px bg-gradient-to-l from-accent to-transparent" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
