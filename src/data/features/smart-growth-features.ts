/**
 * @fileoverview Rich feature data for the Scale (Smart Growth) tier ($297/mo).
 * @module data/features/smart-growth-features
 *
 * New features beyond Convert tier, accurate to GHL + Vapi stack.
 */

import { Bot, Inbox, Settings, PhoneCall } from 'lucide-react';
import type { ExpandableFeature } from '@/components/ai-employee/ExpandableFeatureCard';

export const smartGrowthFeatures: ExpandableFeature[] = [
  {
    icon: Bot,
    title: 'AI Voice Agent',
    shortDesc: 'AI answers calls, qualifies leads, and books appointments.',
    detail: 'Powered by Vapi voice AI integrated with GoHighLevel. When someone calls, AI answers professionally, asks your qualifying questions, scores the lead, and books appointments directly into your calendar. Warm-transfers hot leads to you live during business hours.',
    benefit: 'Like having a full-time assistant for a fraction of the cost ($3K+/month savings).',
    searchTerms: ['AI voice agent for business', 'AI phone answering service', 'AI receptionist', 'voice AI for small business', 'automated phone answering', 'AI call answering service'],
  },
  {
    icon: Inbox,
    title: 'Unified Inbox',
    shortDesc: 'SMS, email, chat, and social messages in one place.',
    detail: 'GoHighLevel\'s unified inbox aggregates conversations from phone calls, SMS, email, website chat, Facebook Messenger, Instagram DMs, and Google Business messages. See every customer interaction in one view.',
    benefit: 'Never miss a message. Respond faster. See the full customer journey.',
    searchTerms: ['unified inbox for business', 'omnichannel inbox', 'business communication hub', 'multi-channel messaging', 'all messages one place'],
  },
  {
    icon: Settings,
    title: 'Advanced Automations',
    shortDesc: 'Custom workflows that run your business on autopilot.',
    detail: 'GoHighLevel workflow builder creates multi-step automations: lead comes in → AI qualifies → books appointment → sends confirmation → reminder 24h before → follow-up after service → review request. All customizable to your business.',
    benefit: 'Your business runs while you sleep. No manual follow-up required.',
    searchTerms: ['business automation', 'workflow automation small business', 'automated business processes', 'marketing automation', 'CRM automation'],
  },
  {
    icon: PhoneCall,
    title: 'Quarterly Strategy Calls',
    shortDesc: 'Regular check-ins to optimize your system and results.',
    detail: 'Every 3 months, a dedicated strategist reviews your analytics, automation performance, lead flow, and conversion rates. They optimize your AI training, update workflows, and suggest improvements to maximize ROI.',
    benefit: 'Continuous optimization. Your system gets better every quarter.',
    searchTerms: ['business strategy consulting', 'marketing optimization', 'quarterly business review', 'ongoing optimization service'],
  },
];
