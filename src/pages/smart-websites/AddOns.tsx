/**
 * @fileoverview Add-On Packs Hub Page
 * @module pages/smart-websites/AddOns
 * 
 * Showcases 6 modular add-on packs that can be added to any Smart Website tier.
 * Follows the luxury dark aesthetic with gold accents.
 * 
 * @brd-reference Smart Websites v2.2 - Phase 2
 */

import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail, 
  CreditCard, 
  Share2, 
  MessageSquare, 
  Mic, 
  Sparkles,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { SEO } from '@/components/SEO';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

/**
 * Add-on pack data structure
 */
interface AddOnPack {
  id: string;
  name: string;
  tagline: string;
  price: number;
  icon: React.ElementType;
  features: string[];
  recommended?: string[]; // Tier slugs this pack is recommended for
}

/**
 * Six modular add-on packs
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
    recommended: ['smart-site'],
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
    recommended: ['smart-lead'],
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
    recommended: ['smart-business'],
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
    recommended: ['smart-business', 'smart-growth'],
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
    recommended: ['smart-lead'],
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
  },
];

/**
 * Individual pack card component
 */
function PackCard({ pack }: { pack: AddOnPack }) {
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
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link to="/contact">
            Add to Plan
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

/**
 * Add-Ons hub page component
 */
export default function AddOns() {
  return (
    <>
      <SEO 
        title="Add-On Packs: Expand Your Smart Website"
        description="Boost your Smart Website with modular add-on packs. Email deliverability, invoicing, social media, unified inbox, AI chat, and unlimited AI features starting at $49/mo."
        canonical="/smart-websites/add-ons"
      />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center bg-background pt-24 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/30" />
        
        <div className="relative z-10 container mx-auto px-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="text-muted-foreground hover:text-accent">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/smart-websites" className="text-muted-foreground hover:text-accent">Smart Websites</Link>
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
                <Link to="/smart-websites">View Website Plans</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/compare-websites">Compare All Options</Link>
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
              <PackCard key={pack.id} pack={pack} />
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
              <Link to="/contact">
                Get a Custom Quote
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/pricing">See All Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
