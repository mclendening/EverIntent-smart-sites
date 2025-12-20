import { Star, Users, Clock, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: '500+', label: 'Businesses Served' },
  { icon: Star, value: '4.9', label: 'Average Rating' },
  { icon: Clock, value: '5 Days', label: 'Average Delivery' },
  { icon: Award, value: '100%', label: 'Satisfaction' },
];

export function SocialProofBar() {
  return (
    <section className="relative py-8 md:py-12 border-y border-border/30">
      <div className="absolute inset-0 bg-card/30" />
      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 mb-3">
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
