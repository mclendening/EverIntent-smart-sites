/**
 * @fileoverview Rich feature data for the Convert (Smart Business) tier ($197/mo).
 * @module data/features/smart-business-features
 *
 * New features beyond Capture tier, accurate to GHL stack.
 */

import { Calendar, Star } from 'lucide-react';
import type { ExpandableFeature } from '@/components/ai-employee/ExpandableFeatureCard';

export const smartBusinessFeatures: ExpandableFeature[] = [
  {
    icon: Calendar,
    title: 'Online Booking System',
    shortDesc: 'Let customers book appointments 24/7 without calling.',
    detail: 'GoHighLevel calendar integration with a public booking page embedded on your website. Customers pick a date and time, receive instant confirmation via SMS and email, and get automated reminders before their appointment. Syncs with Google Calendar to prevent double-booking.',
    benefit: 'Eliminate phone tag. Customers book themselves—you just show up.',
    searchTerms: ['online booking system small business', 'appointment booking website', '24/7 appointment scheduling', 'online booking for contractors', 'automated appointment booking', 'self-service booking system'],
  },
  {
    icon: Star,
    title: 'Review Automation',
    shortDesc: 'Automatically request and manage Google reviews.',
    detail: 'After each completed job, GoHighLevel sends an automated SMS or email requesting a Google review with a direct link. Happy customers leave reviews. Unhappy ones are routed to a private feedback form so you can resolve issues before they go public.',
    benefit: 'Build your Google reputation on autopilot. More reviews = more customers.',
    searchTerms: ['Google review automation', 'automated review requests', 'reputation management for business', 'get more Google reviews', 'review request automation', 'online reputation management'],
  },
];
