import { Home, Briefcase, Heart, Car, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const industries = [
  {
    icon: Home,
    name: 'Home Services',
    description: 'HVAC, plumbing, electrical, roofing, landscaping & more',
    verticals: '31 verticals',
    href: '/industries/home-services',
    gradientClass: 'icon-gradient-ocean',
  },
  {
    icon: Briefcase,
    name: 'Professional Services',
    description: 'Legal, real estate, accounting, insurance & consulting',
    verticals: '15 verticals',
    href: '/industries/professional-services',
    gradientClass: 'icon-gradient-royal',
  },
  {
    icon: Heart,
    name: 'Health & Wellness',
    description: 'Dental, chiropractic, medspa, salons & fitness',
    verticals: '15 verticals',
    href: '/industries/health-wellness',
    gradientClass: 'icon-gradient-sky',
  },
  {
    icon: Car,
    name: 'Automotive',
    description: 'Auto repair, detailing, tire shops, body shops & towing',
    verticals: '10 verticals',
    href: '/industries/automotive-services',
    gradientClass: 'icon-gradient-electric',
  },
];

export function IndustriesSection() {
  return (
    <section className="relative py-16 md:py-24 bg-card/50">
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
                <industry.icon className={`w-5 h-5 flex-shrink-0 ${industry.gradientClass}`} />
                <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                  {industry.name}
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-muted-foreground" />
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground mb-2 pl-8">{industry.description}</p>
              <span className="text-xs text-primary font-medium pl-8">{industry.verticals}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
