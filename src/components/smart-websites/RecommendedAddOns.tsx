/**
 * @fileoverview Recommended Add-Ons Component
 * @module components/smart-websites/RecommendedAddOns
 * 
 * Displays contextual add-on pack recommendations on tier pages.
 * Reuses add-on pack data and styling from AddOns.tsx.
 * 
 * @brd-reference Smart Websites v2.2 - Phase 2.9-2.12
 */

import { ArrowRight, Check, Mail, CreditCard, Share2, MessageSquare, Mic, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

/**
 * Add-on pack type definition
 */
interface AddOnPack {
  id: string;
  name: string;
  tagline: string;
  price: number;
  icon: React.ElementType;
  features: string[];
}

/**
 * Available add-on packs data (subset for cross-sell)
 */
const addOnPacksData: Record<string, AddOnPack> = {
  'email-authority': {
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
  },
  'get-paid-now': {
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
  },
  'social-autopilot': {
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
  },
  'omnichannel-inbox': {
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
  },
  'ai-voice-chat': {
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
  },
  'unlimited-ai': {
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
  },
};

/**
 * Tier-to-recommended-add-ons mapping per v2.2 spec
 */
const tierRecommendations: Record<string, string[]> = {
  launch: ['email-authority'],
  capture: ['get-paid-now', 'ai-voice-chat'],
  convert: ['social-autopilot', 'omnichannel-inbox'],
  scale: ['omnichannel-inbox'],
};

/**
 * Compact add-on card for cross-sell display
 */
function CompactAddOnCard({ pack }: { pack: AddOnPack }) {
  const IconComponent = pack.icon;
  
  return (
    <Card className="border-border/50 bg-card/50 hover:border-accent/50 transition-colors flex flex-col h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/20">
            <IconComponent className="h-5 w-5 text-accent" />
          </div>
          <div className="text-right">
            <span className="text-xl font-bold text-accent">${pack.price}</span>
            <span className="text-sm text-muted-foreground">/mo</span>
          </div>
        </div>
        <CardTitle className="text-lg text-foreground">{pack.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground">{pack.tagline}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        <ul className="space-y-1.5">
          {pack.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-0">
        <Button asChild variant="outline" size="sm" className="w-full">
          <a href="/smart-websites/add-ons">
            Learn More
            <ArrowRight className="ml-2 h-3.5 w-3.5" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

interface RecommendedAddOnsProps {
  tier: 'launch' | 'capture' | 'convert' | 'scale';
}

/**
 * Recommended Add-Ons section component
 * Displays contextual add-on recommendations based on the current tier
 */
export function RecommendedAddOns({ tier }: RecommendedAddOnsProps) {
  const recommendedIds = tierRecommendations[tier] || [];
  const packs = recommendedIds.map(id => addOnPacksData[id]).filter(Boolean);
  
  if (packs.length === 0) return null;
  
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-accent uppercase tracking-wider mb-3">
              Recommended Add-Ons
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Boost Your Results
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              These add-on packs pair perfectly with your plan. Add them anytime to unlock more capabilities.
            </p>
          </div>
          
          {/* Add-On Cards Grid */}
          <div className={`grid gap-6 ${packs.length === 1 ? 'max-w-sm mx-auto' : 'md:grid-cols-2 max-w-2xl mx-auto'}`}>
            {packs.map((pack) => (
              <CompactAddOnCard key={pack.id} pack={pack} />
            ))}
          </div>
          
          {/* View All Link */}
          <div className="text-center mt-8">
            <Button asChild variant="ghost" className="text-accent hover:text-accent hover:bg-accent/10">
              <a href="/smart-websites/add-ons">
                View All Add-On Packs
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
