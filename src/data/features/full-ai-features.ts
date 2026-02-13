/**
 * @fileoverview Rich feature data for the Full AI Employee plan ($597/mo).
 * @module data/features/full-ai-features
 *
 * Comprehensive feature set combining After-Hours + Front Office + Web Chat.
 * Technical detail accurate to GHL + Vapi stack.
 */

import {
  Phone,
  MessageSquare,
  Globe,
  Calendar,
  ShieldCheck,
  Zap,
  Users,
  Star,
  Mic,
  FileText,
} from 'lucide-react';
import type { ExpandableFeature } from '@/components/ai-employee/ExpandableFeatureCard';

export const fullAiFeatures: ExpandableFeature[] = [
  {
    icon: Phone,
    title: 'Voice AI for Phone Calls 24/7',
    shortDesc: 'AI answers every call, day and night.',
    detail: 'Vapi voice AI handles all incoming calls around the clock. During business hours it screens and qualifies; after hours it takes messages and books appointments. Seamless handoff between modes with no configuration changes needed.',
    benefit: 'Complete phone coverage without hiring a receptionist ($3K+/month savings).',
    searchTerms: ['24/7 AI phone answering', 'AI receptionist 24 hours', 'round the clock call answering', 'AI virtual receptionist', 'always-on phone answering service'],
  },
  {
    icon: MessageSquare,
    title: 'SMS Follow-Up and Conversations',
    shortDesc: 'Unlimited AI-powered text conversations.',
    detail: 'GoHighLevel powers two-way SMS conversations. AI follows up with leads, answers questions, sends appointment reminders, and re-engages cold leads—all automatically. No per-message fees.',
    benefit: 'Engage leads on their preferred channel. 98% of texts are read within 3 minutes.',
    searchTerms: ['AI text messaging for business', 'automated SMS follow up', 'business text messaging service', 'AI SMS conversations', 'two-way business texting'],
  },
  {
    icon: Globe,
    title: 'AI Web Chat Widget',
    shortDesc: '24/7 intelligent chat on your website.',
    detail: 'A branded chat widget embedded on your website captures visitors 24/7. AI answers product questions, collects contact info, and books appointments. All conversations sync to your CRM.',
    benefit: 'Convert website visitors who won\'t pick up the phone. Capture leads at 2am.',
    searchTerms: ['AI chat widget for website', 'website chatbot for business', '24/7 live chat AI', 'web chat lead capture', 'AI website chat'],
  },
  {
    icon: Calendar,
    title: 'Appointment Booking Integration',
    shortDesc: 'Books across voice, SMS, and web chat.',
    detail: 'Connected to your GoHighLevel calendar, customers can book via any channel. AI checks real-time availability, offers slots, confirms bookings, and sends reminders. Syncs with Google Calendar.',
    benefit: 'Eliminate phone tag. Customers book themselves, you show up to do the work.',
    searchTerms: ['AI appointment booking', 'automated scheduling', 'online booking system small business', 'multi-channel appointment booking'],
  },
  {
    icon: ShieldCheck,
    title: 'Call Screening and Qualification',
    shortDesc: 'Every caller pre-qualified before reaching you.',
    detail: 'AI asks your custom qualifying questions, scores leads as hot/warm/cold, and routes accordingly. Hot leads transfer live. Warm leads get callbacks. Spam gets filtered silently.',
    benefit: 'Only spend time on qualified opportunities. 3x your close rate.',
    searchTerms: ['AI lead qualification', 'call screening AI', 'lead scoring phone calls', 'qualify callers automatically'],
  },
  {
    icon: Zap,
    title: 'Live Transfer of Hot Leads',
    shortDesc: 'Qualified callers transferred to you instantly.',
    detail: 'When AI identifies a high-value lead during business hours, it warm-transfers the call with a whisper briefing. You know the caller\'s name, need, budget, and timeline before you say hello.',
    benefit: 'Close deals faster with pre-qualified, warm-transferred leads.',
    searchTerms: ['live call transfer', 'warm transfer service', 'AI call routing', 'qualified lead transfer'],
  },
  {
    icon: Users,
    title: 'Multi-Channel Lead Management',
    shortDesc: 'Voice, SMS, chat, and email in one inbox.',
    detail: 'GoHighLevel\'s unified inbox aggregates conversations from phone, text, web chat, email, and social—all in one view. See the complete customer journey across channels.',
    benefit: 'Never lose context. See every interaction in one place.',
    searchTerms: ['unified inbox for business', 'multi-channel CRM', 'omnichannel lead management', 'business communication hub'],
  },
  {
    icon: Mic,
    title: '2,500 Voice Minutes Included',
    shortDesc: 'High-volume calling with $0.06/min overage.',
    detail: '2,500 Vapi voice minutes per month covers most businesses. That\'s approximately 40+ hours of AI phone conversations. Overage is billed at $0.06/min with no surprise fees.',
    benefit: 'Most businesses never exceed this. Predictable costs with transparent overage.',
    searchTerms: ['AI voice minutes pricing', 'voice AI cost per minute', 'affordable AI phone service'],
  },
  {
    icon: Star,
    title: 'Priority Support and Onboarding',
    shortDesc: 'White-glove setup with dedicated support.',
    detail: 'Includes a dedicated onboarding specialist who trains the AI on your business, configures all integrations, tests call flows, and optimizes for 30 days. Priority support queue for ongoing issues.',
    benefit: 'Expert setup. No DIY configuration. Launch confidently in days.',
    searchTerms: ['white glove onboarding', 'dedicated AI setup', 'priority business support'],
  },
  {
    icon: FileText,
    title: 'Complete Analytics Dashboard',
    shortDesc: 'Full visibility into every conversation and outcome.',
    detail: 'Your GoHighLevel dashboard shows call volume, lead scores, booking rates, response times, and revenue attributed to AI. Track ROI in real time.',
    benefit: 'Know exactly how much revenue your AI Employee generates.',
    searchTerms: ['AI analytics dashboard', 'call analytics for business', 'AI ROI tracking', 'business phone analytics'],
  },
];
