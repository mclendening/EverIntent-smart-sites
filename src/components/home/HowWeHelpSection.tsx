/**
 * @fileoverview Problem & Solution Section
 * @module components/home/HowWeHelpSection
 * 
 * Simplified to 3 key outcomes with generous spacing.
 * Vertical list with line icons, no boxed icons.
 */

import { PhoneMissed, Moon, Filter, ArrowRight } from "lucide-react";

/**
 * Three core value propositions with minimal styling.
 */
const outcomes = [
  {
    icon: PhoneMissed,
    title: "Recover Missed Calls",
    description: "62% of calls to local businesses go unanswered. Our AI texts back every missed call in under 60 seconds, before they call your competitor.",
    link: "/let-ai-handle-it",
  },
  {
    icon: Moon,
    title: "Answer After Hours",
    description: "You close at 5pm. Your AI doesn't. Capture leads, answer questions, and book appointments while you sleep.",
    link: "/let-ai-handle-it",
  },
  {
    icon: Filter,
    title: "Screen Every Call",
    description: "Stop wasting time on tire-kickers. AI handles FAQs and only transfers real opportunities to your team.",
    link: "/let-ai-handle-it",
  },
];

/**
 * Problem/Solution section with three vertical cards.
 * Clean layout, generous spacing, simple line icons.
 * 
 * @component
 */
const HowWeHelpSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
            How we help
          </h2>
          <p className="text-lg text-muted-foreground">
            Every missed call costs you $200+ in potential revenue. We fix that.
          </p>
        </div>

        {/* Cards - Two column on desktop */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div
              key={outcome.title}
              className="group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon - Simple line style */}
              <outcome.icon className="w-8 h-8 text-accent mb-6" strokeWidth={1.5} />
              
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 tracking-tight">
                {outcome.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {outcome.description}
              </p>

              {/* Link */}
              <a
                href={outcome.link}
                className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300"
              >
                <span className="text-sm font-medium">Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeHelpSection;
