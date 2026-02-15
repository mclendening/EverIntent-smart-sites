/**
 * @fileoverview Rich feature data for the Capture (Smart Lead) tier ($97/mo).
 * @module data/features/smart-lead-features
 *
 * Technical detail accurate to the GHL stack.
 */

import {
  Phone,
  MessageSquare,
  Users,
  BarChart3,
  Zap,
  Clock,
} from 'lucide-react';
import type { ExpandableFeature } from '@/components/ai-employee/ExpandableFeatureCard';

export const smartLeadFeatures: ExpandableFeature[] = [
  {
    icon: Phone,
    title: 'Missed-Call Text-Back',
    shortDesc: 'Automatically text leads when you miss their call.',
    detail: 'GoHighLevel detects a missed incoming call and fires an SMS within 60 seconds: "Sorry we missed your call! How can we help?" The AI then carries a full text conversation, captures the lead\'s info, and can book an appointment, all without you picking up the phone.',
    benefit: 'Recover $200+ per missed call. 62% of customers who go to voicemail never call back.',
    searchTerms: ['missed call text back service', 'automatic text back missed call', 'missed call recovery', 'text back service for business', 'never miss a lead'],
  },
  {
    icon: MessageSquare,
    title: 'AI Chat Widget',
    shortDesc: '24/7 intelligent chat captures leads while you sleep.',
    detail: 'A GoHighLevel-powered chat widget on your website answers visitor questions in real time using AI trained on your business. It collects name, email, phone, and service interest, then creates a CRM contact automatically.',
    benefit: 'Convert website visitors 24/7, even at 2am when you\'re asleep.',
    searchTerms: ['AI chat widget for website', 'website chatbot lead capture', '24/7 live chat for business', 'AI website chat', 'lead capture chatbot'],
  },
  {
    icon: Users,
    title: 'CRM and Mobile App',
    shortDesc: 'Manage all leads from your phone or desktop.',
    detail: 'GoHighLevel CRM stores every lead with full conversation history, contact details, and status. The mobile app gives you real-time notifications and the ability to respond from anywhere.',
    benefit: 'Know every lead\'s status. Respond from the job site. Never lose track.',
    searchTerms: ['CRM for small business', 'lead management app', 'mobile CRM', 'customer relationship management', 'business lead tracker'],
  },
  {
    icon: BarChart3,
    title: 'Full GA4 Analytics',
    shortDesc: 'Complete insights into your traffic and conversions.',
    detail: 'Enhanced GA4 setup with conversion tracking, event goals, and UTM parameter support. See which traffic sources generate leads and which pages convert best.',
    benefit: 'Know your ROI. See which ads and pages actually drive leads.',
    searchTerms: ['conversion tracking website', 'Google Analytics lead tracking', 'website ROI analytics', 'traffic analytics small business'],
  },
  {
    icon: Zap,
    title: 'Lead Notifications',
    shortDesc: 'Instant alerts when new leads come in.',
    detail: 'GoHighLevel sends push notifications, SMS alerts, and email notifications the moment a new lead is captured, whether from chat, form, or missed-call text-back.',
    benefit: 'Respond to leads within minutes, not hours. Speed-to-lead wins deals.',
    searchTerms: ['instant lead notifications', 'real-time lead alerts', 'new lead alert system', 'lead notification service'],
  },
  {
    icon: Clock,
    title: 'Response Automation',
    shortDesc: 'Automated follow-ups so no lead goes cold.',
    detail: 'GoHighLevel workflows send automated SMS and email sequences after lead capture. Drip campaigns, appointment reminders, and re-engagement sequences run on autopilot.',
    benefit: 'Leads that aren\'t followed up within 5 minutes are 10x less likely to convert.',
    searchTerms: ['automated lead follow up', 'lead nurture automation', 'SMS follow up automation', 'automated email sequences', 'lead response automation'],
  },
];
