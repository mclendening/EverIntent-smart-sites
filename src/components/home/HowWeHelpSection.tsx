import { Globe, Search, MessageSquare, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const outcomes = [
  {
    icon: Globe,
    title: 'Look Professional',
    description: 'A stunning website that makes your business look as good as it really is. Mobile-ready, fast, and built to impress.',
    link: '/services/web-design',
    linkText: 'Web Design',
  },
  {
    icon: Search,
    title: 'Get Found Online',
    description: 'Show up when local customers search for your services. SEO built-in, Google-ready from day one.',
    link: '/services/seo',
    linkText: 'Local SEO',
  },
  {
    icon: MessageSquare,
    title: 'Convert Visitors',
    description: 'Turn every website visitor into a potential customer with smart lead capture, instant responses, and follow-up automation.',
    link: '/services/lead-capture',
    linkText: 'Lead Capture',
  },
];

export function HowWeHelpSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30" />
      
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
              className="group relative glass rounded-2xl p-6 md:p-8 border border-border/30 hover:border-primary/50 transition-all duration-500 hover-lift"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                <outcome.icon className="w-6 h-6 md:w-7 md:h-7 text-primary" />
              </div>
              
              {/* Content */}
              <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                {outcome.title}
              </h3>
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
              
              {/* Subtle glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
