/**
 * @fileoverview Problem & Solution Section — 3 Buyer Types
 * @module components/home/HowWeHelpSection
 * 
 * Three cards addressing distinct buyer personas:
 * 1. Credibility buyer — needs professional presence
 * 2. Bleeding wound — losing money to missed calls  
 * 3. Burnout — overwhelmed, needs automation
 */

import { ArrowRight } from "lucide-react";

import credibilityImg from '@/assets/lifestyle/credibility-storefront.jpg';
import missedCallImg from '@/assets/lifestyle/missed-call-recovery.jpg';
import burnoutImg from '@/assets/lifestyle/burnout-overwhelmed.jpg';

/**
 * Three core value propositions targeting distinct buyer personas.
 */
const outcomes = [
  {
    image: credibilityImg,
    imageAlt: 'Professional business owner standing confidently in front of their modern storefront',
    title: "Look Like the Business You Are",
    description: "Referrals Google you before they call. A professional website with AI-powered chat captures leads 24/7, even while you're on a job.",
    link: "/smart-websites",
    linkText: "See Smart Websites",
  },
  {
    image: missedCallImg,
    imageAlt: 'Contractor checking phone at night seeing a missed call notification',
    title: "Recover Every Missed Call",
    description: "62% of calls to local businesses go unanswered. Our AI texts back in under 60 seconds, before they call your competitor.",
    link: "/let-ai-handle-it",
    linkText: "See How AI Recovers Calls",
  },
  {
    image: burnoutImg,
    imageAlt: 'Overwhelmed business owner stressed at desk surrounded by work',
    title: "Stop Being the Bottleneck",
    description: "AI screens calls, qualifies leads, books appointments, and follows up so you focus on the work that actually needs you.",
    link: "/let-ai-handle-it/full-ai-employee",
    linkText: "See Full AI Employee",
  },
];

/**
 * Problem/Solution section with three vertical cards for distinct buyer personas.
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
                  <span className="text-sm font-medium">{outcome.linkText}</span>
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
