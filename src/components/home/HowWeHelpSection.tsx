import { Globe, Search, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const outcomes = [
  {
    icon: Globe,
    title: 'Look Professional',
    description: 'A stunning website that makes your business look as good as it really is. Mobile-ready, fast, and built to impress.',
    link: '/services/web-design',
    linkText: 'Web Design',
    step: 1,
  },
  {
    icon: Search,
    title: 'Get Found Online',
    description: 'Show up when local customers search for your services. SEO built-in, Google-ready from day one.',
    link: '/services/seo',
    linkText: 'Local SEO',
    step: 2,
  },
  {
    icon: MessageSquare,
    title: 'Convert Visitors',
    description: 'Turn every website visitor into a potential customer with smart lead capture and follow-up automation.',
    link: '/services/lead-capture',
    linkText: 'Lead Capture',
    step: 3,
  },
];

export function HowWeHelpSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      {/* Journey path SVG background */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        preserveAspectRatio="none"
        viewBox="0 0 1200 600"
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Winding path connecting the cards */}
        <path 
          d="M 100 300 Q 300 150, 500 300 T 900 300 T 1100 300" 
          fill="none" 
          stroke="url(#pathGradient)" 
          strokeWidth="3"
          strokeDasharray="10 5"
          filter="url(#glow)"
          className="hidden md:block"
        />
        {/* Journey nodes */}
        <circle cx="200" cy="280" r="8" fill="hsl(var(--primary))" opacity="0.5" className="hidden md:block" />
        <circle cx="600" cy="320" r="8" fill="hsl(var(--primary))" opacity="0.5" className="hidden md:block" />
        <circle cx="1000" cy="280" r="8" fill="hsl(var(--primary))" opacity="0.5" className="hidden md:block" />
      </svg>
      
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Everything you need to </span>
            <span className="text-gradient">grow your business</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            We handle the tech. You focus on what you do best.
          </p>
        </div>
        
        {/* Outcomes grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div 
              key={outcome.title}
              className="group relative rounded-2xl p-6 md:p-8 border border-primary/20 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-500 hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Step indicator */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30">
                {outcome.step}
              </div>
              
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Title with inline icon */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
                  <outcome.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                  {outcome.title}
                </h3>
              </div>
              
              {/* Description */}
              <p className="text-muted-foreground text-sm md:text-base mb-5 leading-relaxed">
                {outcome.description}
              </p>
              
              {/* Link */}
              <Link 
                to={outcome.link}
                className="inline-flex items-center gap-2 text-primary text-sm font-medium group/link"
              >
                <span className="story-link">{outcome.linkText}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
              
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-2xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
