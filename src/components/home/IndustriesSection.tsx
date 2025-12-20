import { Home, Briefcase, Heart, Car, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <industry.icon className="w-6 h-6 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2">
                {industry.name}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </h3>
              <p className="text-sm text-muted-foreground mb-2">{industry.description}</p>
              <span className="text-xs text-primary font-medium">{industry.verticals}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
