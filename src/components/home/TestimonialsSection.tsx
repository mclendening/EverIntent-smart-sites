/**
 * @fileoverview Testimonials Section
 * @module components/home/TestimonialsSection
 * 
 * Clean testimonial cards with client quotes.
 * Simple layout with pull quotes style.
 */

import { Star } from 'lucide-react';

/**
 * Client testimonials data.
 */
const testimonials = [
  {
    id: '1',
    quote: "The phone hasn't stopped ringing since we launched. Best investment we've made for the business.",
    name: 'Mike Rodriguez',
    title: 'Owner',
    company: 'Rodriguez Plumbing',
    rating: 5,
  },
  {
    id: '2',
    quote: "Finally, a website that looks as professional as the service we provide. Our customers love it.",
    name: 'Sarah Chen',
    title: 'Director',
    company: 'Bright Path Dental',
    rating: 5,
  },
  {
    id: '3',
    quote: "They delivered exactly what they promised, on time, and the results speak for themselves.",
    name: 'James Wilson',
    title: 'Partner',
    company: 'Wilson & Associates Law',
    rating: 5,
  },
];

/**
 * Testimonials section with three quote cards.
 * Minimal styling with emphasis on the quote itself.
 * 
 * @component
 */
export function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">
            Trusted by business owners
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't take our word for it.
          </p>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="relative"
            >
              {/* Quote mark */}
              <div className="text-6xl font-bold text-accent/20 leading-none mb-4">"</div>
              
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-foreground text-lg md:text-xl leading-relaxed mb-8">
                {testimonial.quote}
              </blockquote>
              
              {/* Attribution */}
              <div className="border-t border-border/30 pt-4">
                <div className="font-medium text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
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
