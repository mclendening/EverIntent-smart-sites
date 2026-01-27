/**
 * @fileoverview Portfolio Preview - Elegant grid
 * @module components/home/PortfolioPreview
 */

import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const portfolioItems = [
  {
    id: '1',
    title: 'Elite HVAC Services',
    industry: 'Home Services',
    description: 'Complete website redesign with lead capture automation',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop',
  },
  {
    id: '2',
    title: 'Bright Smile Dental',
    industry: 'Health & Wellness',
    description: 'Modern dental practice website with online booking',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop',
  },
  {
    id: '3',
    title: 'Martinez Law Group',
    industry: 'Professional Services',
    description: 'Professional legal website with client portal',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&h=400&fit=crop',
  },
];

/**
 * Three-column portfolio grid with elegant styling.
 */
export function PortfolioPreview() {
  return (
    <section className="section bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
              Portfolio
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              Websites we've <span className="italic text-gradient">built</span>
            </h2>
          </div>
          <Link 
            to="/our-work" 
            className="inline-flex items-center gap-2 text-accent text-sm font-medium group shrink-0"
          >
            View all work
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div 
              key={item.id}
              className="group relative overflow-hidden border border-border/20 hover:border-accent/30 transition-all duration-500"
            >
              <div className="aspect-[3/2] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <div className="text-accent text-xs font-medium tracking-wide uppercase mb-2">
                  {item.industry}
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
