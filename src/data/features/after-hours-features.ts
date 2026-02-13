/**
 * @fileoverview Rich feature data for the After-Hours AI Employee plan ($197/mo).
 * @module data/features/after-hours-features
 *
 * Each feature includes benefit-driven copy, technical detail accurate to the
 * GHL (GoHighLevel) + Vapi voice AI stack, and targeted AEO search terms.
 * Content is pre-rendered in the DOM via ExpandableFeatureGrid for crawler indexing.
 */

import {
  Phone,
  MessageSquare,
  Calendar,
  FileText,
  Bell,
  Clock,
  HelpCircle,
  Mic,
} from 'lucide-react';
import type { ExpandableFeature } from '@/components/ai-employee/ExpandableFeatureCard';

export const afterHoursFeatures: ExpandableFeature[] = [
  {
    icon: Mic,
    title: 'Natural Voice AI Answers Calls',
    shortDesc: 'AI picks up the phone when you can\'t.',
    detail: 'Powered by Vapi voice AI, your calls are answered with a natural-sounding voice agent trained on your business. It greets callers by your company name, understands context, and responds conversationally—not like a robotic phone tree.',
    benefit: 'Never send another customer to voicemail. Capture every after-hours opportunity.',
    searchTerms: ['AI call answering service', 'AI phone answering', 'virtual receptionist after hours', 'AI voice agent for small business', 'automated phone answering'],
  },
  {
    icon: FileText,
    title: 'Detailed Message Taking',
    shortDesc: 'AI captures caller details accurately.',
    detail: 'The voice agent asks relevant follow-up questions—name, callback number, nature of the request—and logs every detail into your GoHighLevel CRM contact record. Full call transcripts are stored and searchable.',
    benefit: 'Wake up to organized messages with full context, not garbled voicemails.',
    searchTerms: ['AI message taking service', 'call transcript service', 'voicemail alternative for business', 'automated call logging'],
  },
  {
    icon: Calendar,
    title: 'Appointment Booking',
    shortDesc: 'Books directly into your calendar.',
    detail: 'Connected to your GoHighLevel calendar, the AI checks real-time availability, offers open slots, and confirms bookings—all during the call. Customers receive automatic SMS confirmations and reminders.',
    benefit: 'Wake up to booked appointments, not a list of people to call back.',
    searchTerms: ['AI appointment booking', 'automated scheduling service', 'online booking after hours', '24/7 appointment scheduling', 'calendar booking automation'],
  },
  {
    icon: Phone,
    title: 'Missed-Call Text-Back',
    shortDesc: 'Texts back missed calls in under 60 seconds.',
    detail: 'When a call goes unanswered, GoHighLevel triggers an instant SMS within 60 seconds: "Sorry we missed your call! How can we help?" This opens a two-way AI-powered text conversation that captures the lead.',
    benefit: 'Recover $200+ per missed call. 62% of missed calls never call back—texting catches them.',
    searchTerms: ['missed call text back', 'missed call text-back service', 'automatic text back missed call', 'missed call recovery', 'text back service for business'],
  },
  {
    icon: MessageSquare,
    title: 'SMS Summaries to Your Phone',
    shortDesc: 'Get instant text summaries of every call.',
    detail: 'After each call, GoHighLevel sends you an SMS summary with the caller\'s name, request type, urgency level, and next steps. Urgent calls are flagged so you can prioritize.',
    benefit: 'Stay informed without listening to voicemails. Triage from bed or the job site.',
    searchTerms: ['call summary notifications', 'SMS call alerts', 'business call notifications', 'instant call summaries'],
  },
  {
    icon: Bell,
    title: 'Full Call Transcripts',
    shortDesc: 'Every word recorded and searchable.',
    detail: 'Vapi generates a complete transcript of every AI call and stores it in your CRM. Search by keyword, date, or customer name. Replay audio recordings for full context.',
    benefit: 'Never "he said, she said." Full documentation of every customer interaction.',
    searchTerms: ['call recording service', 'call transcription business', 'AI call transcript', 'phone call documentation'],
  },
  {
    icon: Clock,
    title: 'Custom Business Greeting',
    shortDesc: 'AI answers with your company name and personality.',
    detail: 'During setup, we train the AI on your business name, hours, services, and tone. Callers hear a professional, branded greeting—not a generic answering service.',
    benefit: 'Customers think they\'re talking to your team, not a third-party service.',
    searchTerms: ['custom business greeting', 'branded phone answering', 'professional call answering', 'personalized AI receptionist'],
  },
  {
    icon: HelpCircle,
    title: 'FAQ Handling',
    shortDesc: 'AI answers questions about hours, location, and services.',
    detail: 'Trained on your FAQ knowledge base, the AI handles common questions—"What are your hours?", "Do you serve my area?", "What do you charge?"—without bothering you.',
    benefit: 'Save 20+ minutes per day on repetitive questions. Free up your time for revenue work.',
    searchTerms: ['AI FAQ answering', 'automated customer questions', 'AI customer service', 'business FAQ automation', 'AI handles customer questions'],
  },
];
