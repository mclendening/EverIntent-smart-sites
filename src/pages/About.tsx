/**
 * @fileoverview About page showcasing company story and differentiators.
 * @module pages/About
 * 
 * Sections:
 * 1. Hero with company positioning
 * 2. Story section - Contact center roots and why local businesses
 * 3. What Makes Us Different - Four key differentiators
 * 4. CTA section
 * 
 * Emphasizes operator experience over vendor relationship,
 * customer ownership, and 60-90 day results timeline.
 */

import { ArrowRight, Users, Shield, Clock, Heart } from 'lucide-react';

import { SEO } from '@/components/SEO';

/**
 * Company differentiators for the "What Makes Us Different" section.
 */
const differentiators = [
  {
    icon: Users,
    title: 'Operators, Not Vendors',
    description: "We've built and run contact centers handling millions of calls. We understand your phone is your lifeline — because we've lived it.",
  },
  {
    icon: Shield,
    title: 'You Own Everything',
    description: "Your website, your data, your customers. No hostage situations, no hidden fees. Leave anytime and take it all with you.",
  },
  {
    icon: Clock,
    title: '60-90 Day Results',
    description: "We measure success in leads captured and calls answered — not vanity metrics. You'll see ROI in the first 90 days or less.",
  },
  {
    icon: Heart,
    title: 'No Contracts',
    description: "We earn your business every month. No long-term commitments, no cancellation fees. Stay because it works, not because you're locked in.",
  },
];

/**
 * About page component.
 * 
 * @component
 * @example
 * <About />
 */
const About = () => {
  return (
    <>
      <SEO
        title="About Us"
        description="25+ years of enterprise automation, now serving local businesses in Long Beach, LA & OC. Systems that pay for themselves."
        canonical="/about"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            <span className="text-foreground">We Build Systems That </span>
            <span className="text-gradient">Pay for Themselves</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            25+ years of enterprise automation experience, now serving local businesses.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              Our Story
            </h2>
            
            <div className="prose prose-lg prose-invert mx-auto space-y-6 text-muted-foreground">
              <p>
                We started in enterprise contact centers — the kind that handle millions of calls for Fortune 500 companies. We built AI systems, designed automation workflows, and learned exactly what it takes to never miss a lead.
              </p>
              <p>
                Then we noticed something: local businesses were drowning. Plumbers missing calls while on jobs. Dentists losing patients to voicemail. Contractors watching competitors scoop up leads they couldn't answer fast enough.
              </p>
              <p>
                These businesses didn't need enterprise-grade complexity. They needed <span className="text-foreground font-medium">enterprise-grade results</span> — packaged simply, priced fairly, and delivered fast.
              </p>
              <p>
                That's why we built EverIntent. We took everything we learned from the enterprise world and made it accessible to the businesses that need it most: the local service providers who are too busy doing great work to answer every call.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
              What Makes Us Different
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {differentiators.map((item) => (
              <div
                key={item.title}
                className="relative rounded-2xl p-8 border border-border/30 bg-card/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4">
            See What We Build
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            AI Employee answers calls 24/7. Smart Websites convert visitors into leads. See how it works.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/let-ai-handle-it"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all duration-300"
            >
              See AI Employee
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="/smart-websites"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground font-semibold rounded-xl hover:bg-secondary/80 transition-all duration-300"
            >
              See Smart Websites
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
