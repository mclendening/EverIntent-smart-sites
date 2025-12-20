import { Star, Zap, Shield, Clock } from 'lucide-react';

const stats = [
  { icon: Zap, value: '65+', label: 'Industries', color: 'text-primary' },
  { icon: Star, value: '4.9', label: 'Rating', color: 'text-accent' },
  { icon: Clock, value: '5-Day', label: 'Delivery', color: 'text-highlight' },
  { icon: Shield, value: '100%', label: 'Satisfaction', color: 'text-primary' },
];

export function SocialProofBar() {
  // Duplicate stats for seamless loop
  const duplicatedStats = [...stats, ...stats, ...stats, ...stats];

  return (
    <div className="relative py-4 overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10">
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
            <stat.icon className={`w-5 h-5 ${stat.color}`} />
            <span className={`font-bold text-lg ${stat.color}`}>{stat.value}</span>
            <span className="text-muted-foreground font-medium">{stat.label}</span>
            <span className="text-border/50 mx-4">•</span>
          </div>
        ))}
      </div>
    </div>
  );
}
