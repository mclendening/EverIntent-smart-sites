/**
 * @fileoverview Homepage section showcasing three AI Employee value propositions.
 * @module components/home/HowWeHelpSection
 * 
 * Displays three cards highlighting how AI Employee solves missed call revenue loss:
 * 1. Recover Missed Calls - SMS text-back in under 60 seconds
 * 2. Answer After Hours - 24/7 coverage while business is closed
 * 3. Screen Every Call - AI handles FAQs, transfers only qualified leads
 */

import { Link } from "react-router-dom";
import { PhoneMissed, Moon, Filter, ArrowRight } from "lucide-react";

/**
 * AI Employee value proposition cards.
 * Focuses on revenue recovery and lead capture benefits.
 */
const outcomes = [
  {
    icon: PhoneMissed,
    title: "Recover Missed Calls",
    description: "62% of calls go unanswered. Our AI texts back every missed call in under 60 seconds — before they call your competitor.",
    link: "/let-ai-handle-it",
    linkText: "See AI Employee",
  },
  {
    icon: Moon,
    title: "Answer After Hours",
    description: "You close at 5pm. Your AI doesn't. Capture leads, answer questions, and book appointments while you sleep.",
    link: "/let-ai-handle-it",
    linkText: "See AI Employee",
  },
  {
    icon: Filter,
    title: "Screen Every Call",
    description: "Stop wasting time on tire-kickers. AI handles FAQs and only transfers real opportunities to your team.",
    link: "/let-ai-handle-it",
    linkText: "See AI Employee",
  },
];

/**
 * Three-column section highlighting core service outcomes for local businesses.
 * Cards feature gradient icons, descriptions, and links to service pages.
 * 
 * @component
 * @example
 * <HowWeHelpSection />
 */
const HowWeHelpSection = () => {
  return (
    <section className="relative py-20 md:py-28 bg-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-accent font-semibold text-sm uppercase tracking-wider mb-3">
            How We Help
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Three Ways AI Employee Keeps Your Phone Ringing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Stop losing $200+ per missed call. Let AI capture every lead.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div
              key={outcome.title}
              className="group relative bg-card rounded-2xl p-8 border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/5"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Icon & Title Row */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <outcome.icon 
                    className="w-5 h-5" 
                    style={{
                      stroke: 'url(#icon-gradient)',
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground">
                  {outcome.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed mb-6">
                {outcome.description}
              </p>

              {/* Link */}
              <Link
                to={outcome.link}
                className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgb(245, 159, 10) 0%, rgb(248, 198, 48) 50%, rgb(245, 159, 10) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {outcome.linkText}
                <ArrowRight className="w-4 h-4" style={{ color: 'rgb(245, 159, 10)' }} />
              </Link>
            </div>
          ))}
        </div>

        {/* SVG Gradient Definition */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(245, 159, 10)" />
              <stop offset="50%" stopColor="rgb(248, 198, 48)" />
              <stop offset="100%" stopColor="rgb(245, 159, 10)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default HowWeHelpSection;
