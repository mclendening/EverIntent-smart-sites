/**
 * @fileoverview Testimonials - Elegant quote cards
 * @module components/home/TestimonialsSection
 */

import { Star } from 'lucide-react';

const testimonials = [
  {
    id: '1',
    quote: "The phone hasn't stopped ringing since we launched. Best investment we've made.",
    name: 'Mike Rodriguez',
    title: 'Owner',
    company: 'Rodriguez Plumbing',
    rating: 5,
  },
  {
    id: '2',
    quote: "Finally, a website that looks as professional as the service we provide.",
    name: 'Sarah Chen',
    title: 'Director',
    company: 'Bright Path Dental',
    rating: 5,
  },
  {
    id: '3',
    quote: "They delivered exactly what they promised, on time. The results speak for themselves.",
    name: 'James Wilson',
    title: 'Partner',
    company: 'Wilson & Associates Law',
    rating: 5,
  },
];

/**
 * Three-column testimonial cards with refined styling.
 */
export function TestimonialsSection() {
  return (
    <section className="section bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Trusted by business owners <span className="italic text-gradient">like you</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="p-8 border border-border/20 bg-card/30"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="font-serif text-xl text-foreground mb-8 leading-relaxed italic">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Attribution */}
              <div>
                <div className="font-medium text-foreground text-sm">{testimonial.name}</div>
                <div className="text-muted-foreground text-xs">
                  {testimonial.title}, {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
