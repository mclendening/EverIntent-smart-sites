/**
 * @fileoverview How We Help - Elegant 3-column layout
 * @module components/home/HowWeHelpSection
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
    description: "Stop wasting time on tire-kickers. AI handles FAQs and only transfers real opportunities.",
    link: "/let-ai-handle-it",
  },
];

/**
 * Three-column section with elegant cards.
 * Minimal borders, generous spacing.
 */
const HowWeHelpSection = () => {
  return (
    <section className="section bg-background">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-accent text-sm tracking-[0.2em] uppercase font-medium mb-4">
            How We Help
          </p>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Three ways AI keeps your <span className="italic text-gradient">phone ringing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Stop losing $200+ per missed call. Let AI capture every lead.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div
              key={outcome.title}
              className="group relative p-8 border border-border/20 hover:border-accent/30 transition-all duration-500 bg-card/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <outcome.icon className="w-8 h-8 text-accent mb-6" strokeWidth={1.5} />

              {/* Title */}
              <h3 className="font-serif text-2xl text-foreground mb-4">
                {outcome.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                {outcome.description}
              </p>

              {/* Link */}
              <Link
                to={outcome.link}
                className="inline-flex items-center gap-2 text-accent text-sm font-medium group-hover:gap-3 transition-all duration-300"
              >
                Learn more
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
