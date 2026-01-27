/**
 * @fileoverview Industries Section - Elegant grid
 * @module components/home/IndustriesSection
 */

import { Home, Briefcase, Heart, Car, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const industries = [
  {
    icon: Home,
    name: 'Home Services',
    description: 'HVAC, plumbing, electrical, roofing & more',
    verticals: '31 verticals',
    href: '/industries/home-services',
  },
  {
    icon: Briefcase,
    name: 'Professional Services',
    description: 'Legal, real estate, accounting & consulting',
    verticals: '15 verticals',
    href: '/industries/professional-services',
  },
  {
    icon: Heart,
    name: 'Health & Wellness',
    description: 'Dental, chiropractic, medspa & salons',
    verticals: '15 verticals',
    href: '/industries/health-wellness',
  },
  {
    icon: Car,
    name: 'Automotive',
    description: 'Auto repair, detailing, tire shops & towing',
    verticals: '10 verticals',
    href: '/industries/automotive-services',
  },
];

/**
 * Four-column industries grid with refined styling.
 */
export function IndustriesSection() {
  return (
    <section className="section-tight bg-card/30 border-t border-border/10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
            Industries
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Built for <span className="italic text-gradient">your industry</span>
          </h2>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {industries.map((industry) => (
            <Link
              key={industry.name}
              to={industry.href}
              className="group p-6 border border-border/20 bg-card/50 hover:border-accent/30 transition-all duration-500"
            >
              <industry.icon className="w-6 h-6 text-accent mb-4" strokeWidth={1.5} />
              
              <h3 className="font-serif text-lg text-foreground mb-2 flex items-center gap-2">
                {industry.name}
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </h3>
              
              <p className="text-sm text-muted-foreground mb-4">{industry.description}</p>
              
              <span className="text-xs text-accent">{industry.verticals}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
