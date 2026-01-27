/**
 * @fileoverview Problem/Solution section - Three value props
 * @module components/home/HowWeHelpSection
 * 
 * Luxury redesign:
 * - Clean vertical layout
 * - Line icons only (no boxes)
 * - Generous spacing
 * - Gold accent links
 */

import { Link } from "react-router-dom";
import { PhoneMissed, Moon, Filter, ArrowRight } from "lucide-react";

const outcomes = [
  {
    icon: PhoneMissed,
    title: "Recover Missed Calls",
    description: "62% of calls go unanswered. Our AI texts back every missed call in under 60 seconds.",
    link: "/let-ai-handle-it",
  },
  {
    icon: Moon,
    title: "Answer After Hours",
    description: "You close at 5pm. Your AI doesn't. Capture leads and book appointments while you sleep.",
    link: "/let-ai-handle-it",
  },
  {
    icon: Filter,
    title: "Screen Every Call",
    description: "Stop wasting time on tire-kickers. AI handles FAQs and transfers only real opportunities.",
    link: "/let-ai-handle-it",
  },
];

/**
 * Three-column value props with minimal luxury styling
 */
const HowWeHelpSection = () => {
  return (
    <section className="relative py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-accent text-sm font-medium tracking-widest uppercase mb-4">
            The Problem We Solve
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Stop losing leads
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Every missed call costs you $200+ in potential revenue. Let AI capture every opportunity.
          </p>
        </div>

        {/* Cards Grid - Minimal styling */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div
              key={outcome.title}
              className="group text-center md:text-left animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon - simple line icon */}
              <outcome.icon className="w-8 h-8 text-accent mx-auto md:mx-0 mb-6" strokeWidth={1.5} />
              
              {/* Title */}
              <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                {outcome.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {outcome.description}
              </p>

              {/* Link */}
              <Link
                to={outcome.link}
                className="inline-flex items-center gap-2 text-accent font-medium group-hover:gap-3 transition-all duration-300"
              >
                <span className="story-link">Learn more</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeHelpSection;
