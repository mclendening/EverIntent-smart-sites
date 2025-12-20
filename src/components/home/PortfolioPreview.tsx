import { ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

// Placeholder portfolio items - will be replaced with real data from Supabase
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

export function PortfolioPreview() {
  return (
    <section className="relative py-16 md:py-24 bg-card/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 md:mb-14">
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
              <span className="text-foreground">Websites we've </span>
              <span className="text-gradient">built</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Real businesses. Real results. See what we can do for you.
            </p>
          </div>
          <Link 
            to="/our-work" 
            className="inline-flex items-center gap-2 text-primary font-medium group shrink-0"
          >
            <span className="story-link">View all work</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Portfolio grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {portfolioItems.map((item) => (
            <div 
              key={item.id}
              className="group relative bg-background rounded-2xl overflow-hidden border border-border/30 hover:border-primary/30 transition-all duration-500 hover-lift"
            >
              {/* Image */}
              <div className="relative aspect-[3/2] overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60" />
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-background/90 flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="text-xs text-primary font-medium mb-2">{item.industry}</div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
