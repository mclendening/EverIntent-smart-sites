/**
 * @fileoverview Testimonials section - Luxury editorial design
 * @module components/home/TestimonialsSection
 */

import { Star } from 'lucide-react';

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
 * Three-column testimonials with luxury editorial styling
 */
export function TestimonialsSection() {
  return (
    <section className="relative py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">
            Trusted by business owners
          </h2>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.id}
              className="relative animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="font-serif text-xl md:text-2xl text-foreground leading-relaxed mb-8 italic">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20">
                  <span className="text-accent font-medium">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.title}, {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
