/**
 * @fileoverview Problem & Solution Section
 * @module components/home/HowWeHelpSection
 * 
 * Three key outcomes with lifestyle photography, replacing generic icons.
 */

import { ArrowRight } from "lucide-react";

import missedCallImg from '@/assets/lifestyle/missed-call-recovery.jpg';
import afterHoursImg from '@/assets/lifestyle/after-hours-coverage.jpg';
import callScreeningImg from '@/assets/lifestyle/call-screening.jpg';

/**
 * Three core value propositions with lifestyle photography.
 */
const outcomes = [
  {
    image: missedCallImg,
    imageAlt: 'Contractor checking phone at night seeing a missed call notification',
    title: "Recover Missed Calls",
    description: "62% of calls to local businesses go unanswered. Our AI texts back every missed call in under 60 seconds, before they call your competitor.",
    link: "/let-ai-handle-it",
  },
  {
    image: afterHoursImg,
    imageAlt: 'Business owner sleeping while AI handles booking confirmations on phone',
    title: "Answer After Hours",
    description: "You close at 5pm. Your AI doesn't. Capture leads, answer questions, and book appointments while you sleep.",
    link: "/let-ai-handle-it",
  },
  {
    image: callScreeningImg,
    imageAlt: 'Professional receptionist screening phone calls at a modern office desk',
    title: "Screen Every Call",
    description: "Stop wasting time on tire-kickers. AI handles FAQs and only transfers real opportunities to your team.",
    link: "/let-ai-handle-it",
  },
];

/**
 * Problem/Solution section with three vertical cards featuring lifestyle photography.
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

        {/* Cards with photography */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {outcomes.map((outcome, index) => (
            <div
              key={outcome.title}
              className="group rounded-2xl border border-border/30 bg-card/50 overflow-hidden hover:border-accent/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Lifestyle Photo */}
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={outcome.image}
                  alt={outcome.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 tracking-tight">
                  {outcome.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  {outcome.description}
                </p>

                <a
                  href={outcome.link}
                  className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all duration-300"
                >
                  <span className="text-sm font-medium">Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeHelpSection;
