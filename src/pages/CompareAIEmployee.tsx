/**
 * @fileoverview AI Employee Comparison Page
 * @module pages/CompareAIEmployee
 * 
 * Award-winning comparison with:
 * - Mobile: Expandable mode cards with inline features (no horizontal scroll)
 * - Desktop: Horizontal mode cards with feature highlights
 * 
 * Consolidated modes:
 * - After-Hours: $197/mo (includes booking + missed call recovery)
 * - Front Office: $297/mo (includes missed call recovery)
 * - Full AI Employee: $597/mo (all features)
 */

import { useState } from 'react';
import { 
  Check, 
  X,
  Moon, 
  ShieldCheck, 
  Bot, 
  ArrowRight, 
  ChevronDown,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

/**
 * AI Employee mode data - Consolidated to 3 modes
 */
const modes = [
  {
    name: 'After-Hours',
    tagline: 'Complete after-hours coverage',
    price: '$197',
    period: '/mo',
    setup: '$997 setup',
    description: 'AI answers after hours, books appointments, texts back missed calls. Never lose a lead when you\'re closed.',
    icon: Moon,
    href: '/let-ai-handle-it/after-hours',
  },
  {
    name: 'Front Office',
    tagline: 'Qualify before you answer',
    price: '$297',
    period: '/mo',
    setup: '$1,497 setup',
    description: 'AI screens all calls, qualifies leads, recovers missed calls, and transfers hot opportunities live.',
    icon: ShieldCheck,
    href: '/let-ai-handle-it/front-office',
  },
  {
    name: 'Full AI Employee',
    tagline: 'Complete phone automation',
    price: '$597',
    period: '/mo',
    setup: '$2,500 setup',
    description: 'Everything included. Voice, SMS, booking, screening, web chat—your complete AI front office.',
    icon: Bot,
    href: '/let-ai-handle-it/full-ai-employee',
    highlight: true,
  },
];

/**
 * Feature comparison data organized by category
 * Unlimited AI is ONLY included in Full AI Employee, or available as $149/mo add-on
 */
const featureCategories = [
  {
    name: 'Unlimited AI',
    description: 'Included with Full AI Employee, or add to any plan for $149/mo',
    features: [
      { name: 'Conversation AI (SMS/chat)', tooltip: 'Automated text responses across all channels', values: ['+$149', '+$149', true], badge: 'addon' },
      { name: 'Reviews AI', tooltip: 'Auto-respond to Google & Facebook reviews', values: ['+$149', '+$149', true], badge: 'addon' },
      { name: 'Content AI', tooltip: 'Generate marketing copy, emails, and social posts', values: ['+$149', '+$149', true], badge: 'addon' },
      { name: 'Funnel & Website AI', tooltip: 'AI-assisted landing page and funnel builder', values: ['+$149', '+$149', true], badge: 'addon' },
    ],
  },
  {
    name: 'Voice AI',
    description: 'Inbound call handling with included minutes',
    features: [
      { name: 'AI voice answering', tooltip: 'AI answers calls and handles conversations', values: [true, true, true] },
      { name: 'After-hours coverage', tooltip: 'Answer calls outside business hours', values: [true, true, true] },
      { name: 'Custom greeting script', tooltip: 'Personalized call scripts for your brand', values: [true, true, true] },
      { name: 'Business hours coverage', tooltip: 'AI handles calls during the day too', values: [false, true, true] },
      { name: 'Live call transfer', tooltip: 'Transfer hot leads to your team in real-time', values: [false, true, true] },
      { name: 'Voice minutes included', tooltip: 'Monthly voice AI minutes allocation', values: ['500/mo', '1,000/mo', '2,500/mo'] },
    ],
  },
  {
    name: 'Core Features',
    features: [
      { name: 'Missed call text-back', tooltip: 'Automatically text leads who didn\'t connect', values: [true, true, true] },
      { name: 'CRM integration', tooltip: 'Sync all interactions to your CRM', values: [true, true, true] },
      { name: 'Custom AI training', tooltip: 'Train AI on your business specifics', values: [true, true, true] },
      { name: 'Contact info capture', tooltip: 'Collect caller name, email, and details', values: [true, true, true] },
      { name: 'Full call transcripts', tooltip: 'Complete transcription of every call', values: [true, true, true] },
    ],
  },
  {
    name: 'Lead Qualification',
    features: [
      { name: 'Lead qualification', tooltip: 'AI qualifies leads before transfer', values: [false, true, true] },
      { name: 'Lead scoring', tooltip: 'Prioritize leads based on intent signals', values: [false, true, true] },
    ],
  },
  {
    name: 'Booking & Scheduling',
    features: [
      { name: 'Appointment booking', tooltip: 'AI books appointments on your calendar', values: [true, false, true] },
      { name: 'Calendar integration', tooltip: 'Syncs with Google, Outlook, and more', values: [true, false, true] },
      { name: 'Confirmation SMS', tooltip: 'Automated appointment reminders', values: [true, true, true] },
      { name: 'Rescheduling support', tooltip: 'AI handles reschedule requests', values: [true, false, true] },
    ],
  },
  {
    name: 'Premium Features',
    features: [
      { name: 'Web chat widget', tooltip: 'AI chatbot for your website', values: [false, false, true] },
      { name: 'Dedicated onboarding', tooltip: 'White-glove setup assistance', values: [false, true, true] },
      { name: 'Priority support', tooltip: 'Fast-track support response', values: [false, false, true] },
      { name: 'Monthly optimization', tooltip: 'Ongoing AI tuning and improvements', values: [false, false, true] },
    ],
  },
];

/**
 * Get all features for a specific mode index
 */
function getModeFeatures(modeIndex: number) {
  const included: string[] = [];
  const addons: string[] = [];
  const notIncluded: string[] = [];
  
  featureCategories.forEach(category => {
    category.features.forEach(feature => {
      const value = feature.values[modeIndex];
      if (value === true) {
        included.push(feature.name);
      } else if (typeof value === 'string' && value.startsWith('+$')) {
        addons.push(`${feature.name} (${value})`);
      } else if (typeof value === 'string') {
        included.push(`${feature.name}: ${value}`);
      } else {
        notIncluded.push(feature.name);
      }
    });
  });
  
  return { included, addons, notIncluded };
}

/**
 * Renders a feature value cell for desktop - styled like reference
 */
function FeatureValue({ value, badge }: { value: boolean | string; badge?: string }) {
  // Handle add-on pricing display (e.g., "+$149")
  if (typeof value === 'string' && value.startsWith('+$')) {
    return (
      <span className="text-xs font-medium text-muted-foreground">{value}</span>
    );
  }
  // Handle other string values (e.g., "500/mo")
  if (typeof value === 'string') {
    return (
      <span className="text-sm font-medium text-foreground">{value}</span>
    );
  }
  // Handle boolean true - checkmark in circle
  if (value === true) {
    return (
      <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center">
        <Check className="w-4 h-4 text-accent" />
      </div>
    );
  }
  // Handle boolean false - subtle X
  return (
    <div className="w-7 h-7 rounded-full bg-muted/30 flex items-center justify-center">
      <X className="w-3.5 h-3.5 text-muted-foreground/40" />
    </div>
  );
}

/**
 * Mobile mode card with expandable features
 */
function MobileModeCard({ mode, modeIndex }: { mode: typeof modes[0]; modeIndex: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = mode.icon;
  const { included, addons, notIncluded } = getModeFeatures(modeIndex);
  
  return (
    <div className={cn(
      "border rounded-2xl overflow-hidden",
      mode.highlight 
        ? "border-accent/40 bg-accent/5" 
        : "border-border/30 bg-card/30"
    )}>
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
            mode.highlight ? "bg-accent/20" : "bg-accent/10"
          )}>
            <Icon className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-lg font-semibold text-foreground">{mode.name}</h3>
              <div className="text-right shrink-0">
                <span className="text-xl font-bold text-foreground">{mode.price}</span>
                <span className="text-sm text-muted-foreground">{mode.period}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">{mode.setup}</p>
            <p className="text-sm text-muted-foreground mt-2">{mode.description}</p>
          </div>
        </div>
        
        {/* CTA Button */}
        <Link
          to={mode.href}
          className={cn(
            "mt-4 w-full py-3 px-4 rounded-xl text-center text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2",
            mode.highlight 
              ? "bg-accent text-accent-foreground hover:bg-accent/90"
              : "bg-accent/10 text-accent hover:bg-accent/20"
          )}
        >
          Learn More
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      {/* Expand/Collapse Toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-3 px-5 flex items-center justify-between border-t border-border/20 bg-card/50 hover:bg-card/80 transition-colors"
      >
        <span className="text-sm text-muted-foreground">
          {expanded ? 'Hide features' : `View ${included.length} features`}
        </span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-300",
            expanded && "rotate-180"
          )} 
        />
      </button>
      
      {/* Expandable Feature List */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          expanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="p-5 pt-0 space-y-4">
          {included.length > 0 && (
            <div>
              <p className="text-xs text-accent uppercase tracking-wider font-medium mb-3">Included</p>
              <ul className="space-y-2">
                {included.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {addons.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Available Add-ons</p>
              <ul className="space-y-2">
                {addons.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="text-xs text-accent shrink-0 mt-0.5">+</span>
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {notIncluded.length > 0 && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium mb-3">Not included</p>
              <ul className="space-y-2">
                {notIncluded.slice(0, 4).map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground/60">{feature}</span>
                  </li>
                ))}
                {notIncluded.length > 4 && (
                  <li className="text-xs text-muted-foreground/50 pl-6">
                    +{notIncluded.length - 4} more
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * CompareAIEmployee - Award-winning AI Employee comparison page
 */
export default function CompareAIEmployee() {
  return (
    <>
      <SEO
        title="Compare AI Employee Modes | EverIntent"
        description="Compare AI Employee modes side-by-side. After-Hours at $197/mo, Front Office at $297/mo, or full automation at $597/mo. Find the perfect AI solution."
        canonical="/compare-ai-employee"
      />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative pt-24 pb-8 md:pt-32 md:pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-mesh opacity-30" />
          
          <div className="relative container mx-auto px-4 text-center">
            <p className="text-sm font-medium text-accent tracking-wide uppercase mb-4">
              AI Employee Modes
            </p>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="text-foreground">Choose Your </span>
              <span className="text-gradient">AI Employee</span>
            </h1>
            
            <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
              From after-hours coverage to complete phone automation. All modes include missed call text-back.
            </p>
          </div>
        </section>
        
        {/* Mobile: Stacked Expandable Cards */}
        <section className="pb-16 lg:hidden">
          <div className="container mx-auto px-4">
            <div className="space-y-4 max-w-lg mx-auto">
              {modes.map((mode, idx) => (
                <MobileModeCard key={mode.name} mode={mode} modeIndex={idx} />
              ))}
            </div>
            
            {/* Bundle Note */}
            <div className="mt-8 max-w-lg mx-auto p-4 rounded-xl bg-accent/5 border border-accent/20">
              <p className="text-sm text-center text-muted-foreground">
                <span className="text-accent font-medium">All modes include</span> missed call text-back recovery.
              </p>
            </div>
          </div>
        </section>
        
        {/* Desktop: Mode Cards */}
        <section className="pb-12 hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {modes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <div
                    key={mode.name}
                    className={cn(
                      "rounded-2xl p-6 border transition-all duration-300",
                      mode.highlight 
                        ? "border-accent/40 bg-accent/5" 
                        : "border-border/30 bg-card/30 hover:border-accent/30"
                    )}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex items-center justify-center mb-4",
                        mode.highlight ? "bg-accent/20" : "bg-accent/10"
                      )}>
                        <Icon className="w-7 h-7 text-accent" />
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground">{mode.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{mode.tagline}</p>
                      
                      <div className="mb-2">
                        <span className="text-3xl font-bold text-foreground">{mode.price}</span>
                        <span className="text-muted-foreground text-sm">{mode.period}</span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-5">{mode.setup}</p>
                      
                      <p className="text-sm text-muted-foreground mb-5">{mode.description}</p>
                      
                      <Link
                        to={mode.href}
                        className={cn(
                          "w-full py-2.5 px-4 rounded-lg text-center text-sm font-medium flex items-center justify-center gap-2",
                          mode.highlight 
                            ? "btn-gold"
                            : "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                        )}
                      >
                        Learn More
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Bundle Note */}
            <div className="mt-8 max-w-md mx-auto p-4 rounded-xl bg-accent/5 border border-accent/20 text-center">
              <p className="text-sm text-muted-foreground">
                <span className="text-accent font-medium">All modes include</span> missed call text-back recovery.
              </p>
            </div>
          </div>
        </section>
        
        {/* Desktop: Feature Comparison Table */}
        <section className="pb-24 hidden lg:block">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              {/* Column Headers */}
              <div className="grid grid-cols-4 gap-3 py-4 px-4 mb-6 border-b border-border/30">
                <div className="col-span-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Feature</span>
                </div>
                {modes.map((mode) => (
                  <div key={mode.name} className="col-span-1 text-center">
                    <span className="text-sm font-semibold text-foreground">{mode.name}</span>
                    <p className="text-xs text-muted-foreground">{mode.price}{mode.period}</p>
                  </div>
                ))}
              </div>
              
              {/* Feature Categories */}
              {featureCategories.map((category) => (
                <div 
                  key={category.name} 
                  className="mb-8 rounded-xl bg-card/40 border border-border/20 overflow-hidden"
                >
                  {/* Category Header */}
                  <div className="px-5 py-3 border-b border-border/10">
                    <h3 className="text-sm font-semibold text-accent uppercase tracking-wider">
                      {category.name}
                    </h3>
                    {category.description && (
                      <p className="text-xs text-foreground/50 mt-1">{category.description}</p>
                    )}
                  </div>
                  
                  {/* Feature Rows */}
                  <TooltipProvider delayDuration={200}>
                    <div>
                      {category.features.map((feature, featureIdx) => (
                        <div
                          key={feature.name}
                          className={cn(
                            "grid grid-cols-4 gap-3 py-3.5 px-5 transition-colors",
                            "hover:bg-accent/8",
                            featureIdx % 2 === 0 ? "bg-white/[0.02]" : "bg-white/[0.04]"
                          )}
                        >
                          {/* Feature name with tooltip */}
                          <div className="col-span-1 flex items-center gap-2">
                            <span className="text-sm text-foreground/90">{feature.name}</span>
                            {feature.tooltip && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <HelpCircle className="w-3.5 h-3.5 text-foreground/30 cursor-help hover:text-accent/60 transition-colors" />
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs">
                                  <p className="text-xs">{feature.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                          {/* Values */}
                          {feature.values.map((value, idx) => (
                            <div key={idx} className="col-span-1 flex items-center justify-center">
                              <FeatureValue value={value} badge={feature.badge} />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </TooltipProvider>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Bottom CTA */}
        <section className="pb-20 md:pb-28">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-xl mx-auto p-6 md:p-8 rounded-2xl bg-card/30 border border-border/30">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                Not sure which mode is right?
              </h2>
              <p className="text-muted-foreground text-sm md:text-base mb-5">
                Book a call and we'll help you choose the perfect AI setup.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/contact"
                  className="px-5 py-2.5 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors text-sm"
                >
                  Ask a question
                </Link>
                <Link
                  to="/let-ai-handle-it/full-ai-employee"
                  className="btn-gold flex items-center justify-center gap-2"
                >
                  Get Full AI Employee
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
