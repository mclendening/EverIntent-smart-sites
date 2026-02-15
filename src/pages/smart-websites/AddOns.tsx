/**
 * @fileoverview Add-On Packs Hub Page
 * @module pages/smart-websites/AddOns
 * 
 * Showcases 6 modular add-on packs that can be added to any Smart Website tier.
 * Follows the luxury dark aesthetic with gold accents.
 * Includes detail modals for each pack with expanded descriptions.
 * 
 * @brd-reference Smart Websites v2.2 - Phase 2
 */

import { useState } from 'react';

import { 
  ArrowRight, 
  Mail, 
  CreditCard, 
  Share2, 
  MessageSquare, 
  Mic, 
  Sparkles,
  Check,
  X,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  Users,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { SEO } from '@/components/SEO';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

/**
 * Add-on pack data structure with expanded details
 */
interface AddOnPack {
  id: string;
  name: string;
  tagline: string;
  price: number;
  icon: React.ElementType;
  features: string[];
  recommended?: string[];
  // Expanded detail modal content
  details: {
    headline: string;
    description: string;
    benefits: { icon: React.ElementType; title: string; text: string }[];
    idealFor: string[];
    faq: { q: string; a: string }[];
  };
}

/**
 * Six modular add-on packs with expanded details
 */
const addOnPacks: AddOnPack[] = [
  {
    id: 'email-authority',
    name: 'Email Authority',
    tagline: 'Never land in spam again',
    price: 49,
    icon: Mail,
    features: [
      'Warmy email deliverability',
      'Inbox warmup automation',
      'Domain health monitoring',
      'Reputation scoring',
    ],
    recommended: ['launch'],
    details: {
      headline: 'Stop losing leads to the spam folder',
      description: 'Your emails are useless if they never get seen. Email Authority uses Warmy\'s AI-powered warmup technology to build your sender reputation, monitor domain health, and ensure your messages land in the inbox—not spam.',
      benefits: [
        { icon: Shield, title: 'Protected Reputation', text: 'Gradual warmup builds trust with email providers so your domain stays off blacklists.' },
        { icon: TrendingUp, title: 'Higher Open Rates', text: 'Inbox placement means more eyes on your emails—and more responses.' },
        { icon: Clock, title: 'Set It & Forget It', text: 'Automated warmup runs in the background. No manual work required.' },
      ],
      idealFor: ['Businesses starting email outreach', 'Anyone recovering from spam issues', 'Teams sending cold emails or newsletters'],
      faq: [
        { q: 'How long does warmup take?', a: 'Most accounts see significant improvement within 2-4 weeks. Full warmup typically takes 6-8 weeks.' },
        { q: 'Will this work with my email provider?', a: 'Yes—Email Authority works with Gmail, Outlook, and most major email services.' },
      ],
    },
  },
  {
    id: 'get-paid-now',
    name: 'Get Paid Now',
    tagline: 'Invoice and collect faster',
    price: 49,
    icon: CreditCard,
    features: [
      'Professional invoicing',
      'Payment collection',
      'Automated reminders',
      'Payment tracking dashboard',
    ],
    recommended: ['capture'],
    details: {
      headline: 'Stop chasing payments. Start collecting.',
      description: 'Late payments kill cash flow. Get Paid Now lets you send professional invoices, accept payments online, and automate follow-ups—so you spend less time chasing and more time growing.',
      benefits: [
        { icon: Zap, title: 'Instant Invoicing', text: 'Create and send branded invoices in seconds. Clients pay with one click.' },
        { icon: Clock, title: 'Automated Reminders', text: 'Gentle nudges go out automatically. No awkward follow-up emails from you.' },
        { icon: TrendingUp, title: 'Real-Time Tracking', text: 'See who\'s paid, who\'s pending, and who needs a nudge—all in one dashboard.' },
      ],
      idealFor: ['Service providers with recurring clients', 'Contractors and freelancers', 'Businesses tired of late payments'],
      faq: [
        { q: 'What payment methods are supported?', a: 'Credit cards, debit cards, and ACH bank transfers. We integrate with Stripe for secure processing.' },
        { q: 'Are there transaction fees?', a: 'Standard payment processing fees apply (typically 2.9% + $0.30). No additional fees from us.' },
      ],
    },
  },
  {
    id: 'social-autopilot',
    name: 'Social Autopilot',
    tagline: 'Stay visible without the work',
    price: 97,
    icon: Share2,
    features: [
      'Social media scheduling',
      'Content calendar',
      'Multi-platform posting',
      'Engagement analytics',
    ],
    recommended: ['convert'],
    details: {
      headline: 'Your social presence on autopilot',
      description: 'Consistency wins on social media, but who has the time? Social Autopilot lets you schedule posts across platforms, plan your content calendar, and track engagement—without spending hours online.',
      benefits: [
        { icon: Clock, title: 'Schedule Ahead', text: 'Batch your content and schedule weeks in advance. Post at optimal times automatically.' },
        { icon: Globe, title: 'Multi-Platform', text: 'Facebook, Instagram, LinkedIn, and more—all from one dashboard.' },
        { icon: TrendingUp, title: 'Track What Works', text: 'See which posts drive engagement. Double down on winners.' },
      ],
      idealFor: ['Businesses without a social media manager', 'Teams that want consistent posting', 'Anyone who hates daily social updates'],
      faq: [
        { q: 'Which platforms are supported?', a: 'Facebook, Instagram, LinkedIn, Twitter/X, and Google Business Profile.' },
        { q: 'Can I preview posts before they go live?', a: 'Absolutely. Preview exactly how your posts will appear on each platform.' },
      ],
    },
  },
  {
    id: 'omnichannel-inbox',
    name: 'Omnichannel Inbox',
    tagline: 'One inbox for every channel',
    price: 99,
    icon: MessageSquare,
    features: [
      'Unified messaging hub',
      'SMS, email, social DMs',
      'Conversation history',
      'Team collaboration',
    ],
    recommended: ['convert', 'scale'],
    details: {
      headline: 'Every conversation. One place.',
      description: 'Your customers reach out everywhere—SMS, email, Facebook, Instagram. Omnichannel Inbox pulls it all into one unified view so you never miss a message, and your team can respond faster.',
      benefits: [
        { icon: MessageSquare, title: 'Unified View', text: 'See SMS, email, and social DMs in one timeline. No more app-switching.' },
        { icon: Users, title: 'Team Collaboration', text: 'Assign conversations, add internal notes, and tag team members.' },
        { icon: Clock, title: 'Complete History', text: 'Every interaction with a contact in one place. Know the full context before you reply.' },
      ],
      idealFor: ['Businesses with multiple contact channels', 'Teams that share customer communication', 'Anyone tired of switching between apps'],
      faq: [
        { q: 'Which channels are included?', a: 'SMS, email, Facebook Messenger, Instagram DMs, and Google Business Messages.' },
        { q: 'Can multiple team members access the inbox?', a: 'Yes—assign conversations, see who\'s responding, and collaborate in real-time.' },
      ],
    },
  },
  {
    id: 'ai-voice-chat',
    name: 'AI Voice Chat',
    tagline: 'Let AI answer your website',
    price: 79,
    icon: Mic,
    features: [
      'AI-powered web chat',
      'Voice interaction support',
      '24/7 lead qualification',
      'Smart handoff to you',
    ],
    recommended: ['capture'],
    details: {
      headline: 'Your 24/7 AI receptionist—on your website',
      description: 'When visitors land on your site, AI Voice Chat engages them instantly. It answers questions, qualifies leads, and hands off warm prospects to you—even while you sleep.',
      benefits: [
        { icon: Clock, title: '24/7 Coverage', text: 'Never miss a lead. AI Chat works nights, weekends, and holidays.' },
        { icon: Mic, title: 'Voice Enabled', text: 'Visitors can speak to your AI. Natural conversations, not rigid scripts.' },
        { icon: Zap, title: 'Smart Handoff', text: 'AI qualifies leads and routes hot prospects directly to you or your team.' },
      ],
      idealFor: ['Businesses that get after-hours traffic', 'Anyone who wants instant lead response', 'Teams without dedicated chat staff'],
      faq: [
        { q: 'How does the AI know what to say?', a: 'We train it on your business, services, and FAQs. You approve the knowledge base before it goes live.' },
        { q: 'Can I intervene in a live chat?', a: 'Yes—take over any conversation with one click when you want to jump in.' },
      ],
    },
  },
  {
    id: 'unlimited-ai',
    name: 'Unlimited AI',
    tagline: 'AI power without limits',
    price: 149,
    icon: Sparkles,
    features: [
      'Unlimited AI SMS',
      'Unlimited review responses',
      'Unlimited content generation',
      'Priority AI processing',
    ],
    recommended: [],
    details: {
      headline: 'Unlimited AI for heavy users',
      description: 'If you\'re sending high volumes of AI-powered SMS, responding to dozens of reviews, or generating content daily—Unlimited AI removes all caps. Use as much as you need with priority processing.',
      benefits: [
        { icon: Zap, title: 'No Caps', text: 'Unlimited AI SMS conversations, review responses, and content generation.' },
        { icon: TrendingUp, title: 'Priority Queue', text: 'Your AI tasks jump to the front of the line. Faster responses, faster results.' },
        { icon: Shield, title: 'Predictable Pricing', text: 'One flat monthly fee. No surprises based on usage.' },
      ],
      idealFor: ['High-volume businesses', 'Multi-location operators', 'Anyone who\'s hit usage limits before'],
      faq: [
        { q: 'What counts as "AI usage"?', a: 'AI-powered SMS conversations, automated review responses, and AI-generated marketing content.' },
        { q: 'Is Voice AI included?', a: 'Voice AI minutes remain usage-based ($0.06/min). Unlimited AI covers text-based AI features.' },
      ],
    },
  },
];

/**
 * Detail modal component for add-on packs
 */
function PackDetailModal({ 
  pack, 
  isOpen, 
  onClose 
}: { 
  pack: AddOnPack; 
  isOpen: boolean; 
  onClose: () => void;
}) {
  const IconComponent = pack.icon;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader className="pb-4 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
              <IconComponent className="h-6 w-6 text-accent" />
            </div>
            <div>
              <DialogTitle className="text-2xl text-foreground">{pack.name}</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {pack.tagline}
              </DialogDescription>
            </div>
            <div className="ml-auto text-right">
              <span className="text-2xl font-bold text-accent">${pack.price}</span>
              <span className="text-sm text-muted-foreground">/mo</span>
            </div>
          </div>
        </DialogHeader>

        <div className="py-6 space-y-8">
          {/* Headline & Description */}
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">
              {pack.details.headline}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {pack.details.description}
            </p>
          </div>

          {/* Benefits */}
          <div>
            <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Key Benefits
            </h4>
            <div className="space-y-4">
              {pack.details.benefits.map((benefit, index) => {
                const BenefitIcon = benefit.icon;
                return (
                  <div key={index} className="flex gap-4">
                    <div className="p-2 rounded-lg bg-accent/10 h-fit">
                      <BenefitIcon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <h5 className="font-medium text-foreground">{benefit.title}</h5>
                      <p className="text-sm text-muted-foreground">{benefit.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features List */}
          <div>
            <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              What's Included
            </h4>
            <ul className="grid grid-cols-2 gap-2">
              {pack.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="h-4 w-4 text-accent shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal For */}
          <div>
            <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Ideal For
            </h4>
            <ul className="space-y-2">
              {pack.details.idealFor.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div>
            <h4 className="text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Common Questions
            </h4>
            <div className="space-y-4">
              {pack.details.faq.map((item, index) => (
                <div key={index}>
                  <p className="font-medium text-foreground text-sm">{item.q}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row gap-3">
          <Button asChild variant="gold" className="flex-1 btn-glow">
            <a href="/contact">
              Add to Plan
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
          <DialogClose asChild>
            <Button variant="outline" className="flex-1">
              Close
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/**
 * Individual pack card component with Learn More button
 */
function PackCard({ pack, onLearnMore }: { pack: AddOnPack; onLearnMore: () => void }) {
  const IconComponent = pack.icon;
  
  return (
    <Card className="border-border/50 bg-card/50 hover:border-accent/50 transition-colors flex flex-col h-full">
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <div className="p-3 rounded-xl bg-accent/10 border border-accent/20">
            <IconComponent className="h-6 w-6 text-accent" />
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-accent">${pack.price}</span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
        </div>
        <CardTitle className="text-xl text-foreground">{pack.name}</CardTitle>
        <CardDescription className="text-muted-foreground">{pack.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-2">
          {pack.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="h-4 w-4 text-accent mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full text-accent hover:text-accent hover:bg-accent/10"
          onClick={onLearnMore}
        >
          Learn More
        </Button>
        <Button asChild variant="outline" className="w-full">
          <a href="/contact">
            Add to Plan
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * Add-Ons hub page component
 */
export default function AddOns() {
  const [selectedPack, setSelectedPack] = useState<AddOnPack | null>(null);

  return (
    <>
      <SEO 
        title="Add-On Packs: Expand Your Smart Website"
        description="Boost your Smart Website with modular add-on packs. Email deliverability, invoicing, social media, unified inbox, AI chat, and unlimited AI features starting at $49/mo."
        canonical="/smart-websites/add-ons"
      />

      {/* Detail Modal */}
      {selectedPack && (
        <PackDetailModal 
          pack={selectedPack} 
          isOpen={!!selectedPack} 
          onClose={() => setSelectedPack(null)} 
        />
      )}

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-background pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
        
        <div className="relative z-10 container mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href="/" className="text-muted-foreground hover:text-accent">Home</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <a href="/smart-websites" className="text-muted-foreground hover:text-accent">Smart Websites</a>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-foreground">Add-On Packs</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6">
              Modular • Mix & Match • Cancel Anytime
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              <span className="text-gradient">Add-On Packs</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl">
              Expand your Smart Website with powerful tools. Pick the features you need, skip what you don't.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" variant="outline">
                <a href="/smart-websites">View Website Plans</a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="/compare-websites">Compare All Options</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Packs Grid */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              6 Powerful Packs
            </h2>
            <p className="text-lg text-muted-foreground">
              Each pack adds specific capabilities to any Smart Website tier. Stack them to build your perfect solution.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {addOnPacks.map((pack) => (
              <PackCard 
                key={pack.id} 
                pack={pack} 
                onLearnMore={() => setSelectedPack(pack)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
              How Add-Ons Work
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-accent">1</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Choose Your Plan</h3>
                <p className="text-muted-foreground text-sm">Start with any Smart Website tier: Launch, Capture, Convert, or Scale.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-accent">2</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Add What You Need</h3>
                <p className="text-muted-foreground text-sm">Select add-on packs that match your business goals. No minimums.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-accent">3</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Adjust Anytime</h3>
                <p className="text-muted-foreground text-sm">Add, remove, or swap packs monthly. Your needs change—we flex with you.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-card/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Customize Your Website?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Tell us what you're trying to achieve. We'll recommend the right combination of plan and add-ons.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="gold" className="btn-glow">
              <a href="/contact">
                Get a Custom Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="/pricing">See All Pricing</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
