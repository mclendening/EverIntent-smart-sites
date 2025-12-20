import { Star, Zap, Shield, Clock, LucideIcon } from 'lucide-react';

// SVG Gradient definition for icons
const GradientDefs = () => (
  <svg width="0" height="0" className="absolute">
    <defs>
      <linearGradient id="marquee-gradient-ocean" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(210, 100%, 40%)" />
        <stop offset="50%" stopColor="hsl(200, 100%, 50%)" />
        <stop offset="100%" stopColor="hsl(185, 100%, 45%)" />
      </linearGradient>
    </defs>
  </svg>
);

const GradientIcon = ({ icon: Icon, className = "" }: { icon: LucideIcon; className?: string }) => (
  <Icon 
    className={className}
    style={{ stroke: 'url(#marquee-gradient-ocean)' }}
  />
);

const stats = [
  { icon: Zap, value: '65+', label: 'Industries' },
  { icon: Star, value: '4.9', label: 'Rating' },
  { icon: Clock, value: '5-Day', label: 'Delivery' },
  { icon: Shield, value: '100%', label: 'Satisfaction' },
];

export function SocialProofBar() {
  // Duplicate stats for seamless loop
  const duplicatedStats = [...stats, ...stats, ...stats, ...stats];

  return (
    <div className="relative py-3 -mt-[100px] overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
      {/* Hidden SVG gradient definition */}
      <GradientDefs />
      
      {/* Gradient overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
      
      {/* Marquee track */}
      <div className="flex animate-marquee">
        {duplicatedStats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-2 px-8 whitespace-nowrap"
          >
            <GradientIcon icon={stat.icon} className="w-5 h-5" />
            <span className="font-bold text-lg text-foreground">{stat.value}</span>
            <span className="text-muted-foreground font-medium">{stat.label}</span>
            <span className="text-border/50 mx-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
