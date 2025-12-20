import { Link } from "react-router-dom";
import { Globe, TrendingUp, MessageSquare, ArrowRight } from "lucide-react";

const outcomes = [
  {
    icon: Globe,
    title: "Get Found Online",
    description: "Show up when customers search for your services with SEO-optimized websites that rank.",
    link: "/services/web-design",
    linkText: "Web Design & SEO",
    step: "01",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    icon: TrendingUp,
    title: "Fill Your Pipeline",
    description: "Convert visitors into leads with targeted campaigns that drive real business results.",
    link: "/services/lead-generation",
    linkText: "Lead Generation",
    step: "02",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    title: "Never Miss a Lead",
    description: "Respond instantly 24/7 with AI-powered chat and automated follow-ups that close deals.",
    link: "/services/ai-automation",
    linkText: "AI Automation",
    step: "03",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
];

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
            Your Path to Growth
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three proven ways we help local businesses dominate their market
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
                <div className={`w-10 h-10 rounded-lg ${outcome.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <outcome.icon className={`w-5 h-5 ${outcome.color}`} />
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
                className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all duration-300"
              >
                {outcome.linkText}
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
