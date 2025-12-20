import { Star, Quote } from 'lucide-react';

// Placeholder testimonials - will be replaced with real data from Supabase
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
    quote: "They delivered exactly what they promised, on time, and the results speak for themselves. 10/10.",
    name: 'James Wilson',
    title: 'Partner',
    company: 'Wilson & Associates Law',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-20" />
      
      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            <span className="text-foreground">Trusted by </span>
            <span className="text-gradient">business owners like you</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Don't take our word for it. Here's what our clients have to say.
          </p>
        </div>
        
        {/* Testimonials grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="relative glass rounded-2xl p-6 md:p-8 border border-border/30"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-primary/30 mb-4" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Quote */}
              <blockquote className="text-foreground text-base md:text-lg mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">
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
