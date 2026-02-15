/**
 * @fileoverview Rich feature data for the Front Office AI Employee plan ($297/mo).
 * @module data/features/front-office-features
 *
 * Each feature includes benefit-driven copy, technical detail accurate to the
 * GHL + Vapi stack, and targeted AEO search terms for crawler indexing.
 */

import {
  Phone,
  ShieldCheck,
  Filter,
  UserCheck,
  MessageSquare,
  XCircle,
  FileText,
  Zap,
} from 'lucide-react';
import type { ExpandableFeature } from '@/components/ai-employee/ExpandableFeatureCard';

export const frontOfficeFeatures: ExpandableFeature[] = [
  {
    icon: Phone,
    title: 'AI Answers Every Call Instantly',
    shortDesc: 'Zero rings to voicemail during business hours.',
    detail: 'Vapi voice AI picks up every incoming call on the first ring. While your team is on other calls or with customers, AI handles the overflow. No hold music, no missed opportunities.',
    benefit: 'Stop losing callers to hold times. Every call answered in under 3 seconds.',
    searchTerms: ['AI call answering during business hours', 'front office call answering', 'AI receptionist service', 'never miss a business call', 'instant call answering'],
  },
  {
    icon: ShieldCheck,
    title: 'Custom Qualifying Questions',
    shortDesc: 'AI asks your questions to every caller.',
    detail: 'You define 3–5 qualifying questions during setup. The AI asks every caller: "What service do you need?", "What\'s your timeline?", "Do you have a budget?" Answers are scored and stored in GoHighLevel CRM.',
    benefit: 'Only talk to leads worth your time. Know their needs before you pick up.',
    searchTerms: ['lead qualification AI', 'call screening service', 'AI lead scoring', 'qualify leads automatically', 'pre-screen phone calls'],
  },
  {
    icon: Filter,
    title: 'Lead Scoring',
    shortDesc: 'Every caller rated hot, warm, or cold.',
    detail: 'Based on their answers to qualifying questions, AI assigns a lead score. Hot leads (high budget, urgent timeline) get transferred immediately. Warm leads get a callback scheduled. Cold leads get a polite goodbye.',
    benefit: '3x close rate by only talking to pre-qualified prospects.',
    searchTerms: ['AI lead scoring', 'automatic lead qualification', 'phone lead scoring system', 'call lead prioritization'],
  },
  {
    icon: UserCheck,
    title: 'Live Transfer of Hot Leads',
    shortDesc: 'Qualified callers transferred to you in under 10 seconds.',
    detail: 'When AI identifies a hot lead, it warm-transfers the call to you or your team with a whisper: "Incoming qualified lead: kitchen remodel, $8K budget, starts next week." You pick up informed and ready to close.',
    benefit: 'Close deals faster. You already know what they need before saying hello.',
    searchTerms: ['live call transfer', 'warm transfer AI', 'qualified lead transfer', 'AI call routing', 'smart call forwarding'],
  },
  {
    icon: MessageSquare,
    title: 'Missed-Call Text-Back',
    shortDesc: 'Instant SMS recovery for any missed calls.',
    detail: 'If a call slips through (you\'re on another line), GoHighLevel fires an automatic SMS within 60 seconds. The AI continues the conversation via text, captures the lead, and books an appointment.',
    benefit: 'Recover leads even when live transfer isn\'t possible.',
    searchTerms: ['missed call text back', 'automatic text response missed call', 'SMS call recovery'],
  },
  {
    icon: XCircle,
    title: 'Spam and Solicitor Filtering',
    shortDesc: 'Junk calls blocked automatically.',
    detail: 'AI identifies spam, robocalls, and solicitors within the first few seconds of conversation. It politely ends the call and logs it as "filtered." You never see it, never waste time.',
    benefit: 'Save 30+ minutes per day. Only real customer calls reach you.',
    searchTerms: ['spam call blocker for business', 'filter solicitor calls', 'AI spam call filtering', 'block robocalls business phone'],
  },
  {
    icon: FileText,
    title: 'Full Transcripts and Recordings',
    shortDesc: 'Every call documented with searchable transcripts.',
    detail: 'Vapi records and transcribes every call. Transcripts sync to your GoHighLevel CRM contact record. Search by keyword, filter by lead score, or replay audio.',
    benefit: 'Complete documentation. Never rely on memory or sticky notes.',
    searchTerms: ['business call recording', 'call transcription service', 'searchable call transcripts', 'AI call documentation'],
  },
  {
    icon: Zap,
    title: 'Only Talk to Qualified Leads',
    shortDesc: 'Your phone only rings for real opportunities.',
    detail: 'The combined effect: AI screens, qualifies, filters spam, and only transfers hot leads. Warm leads get automated follow-up. You spend your time closing, not answering.',
    benefit: '73% of tire-kickers filtered. Focus on the calls that make you money.',
    searchTerms: ['AI call screening', 'only qualified calls', 'filter tire kickers', 'business call management AI'],
  },
];
