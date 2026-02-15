/**
 * @fileoverview Support page with tier-based channel information.
 * @module pages/Support
 * 
 * Content derived from BRD v35.0 Section 25 — Support Model.
 * Shows support channels by tier and SLA response times.
 * 
 * Sections:
 * 1. Hero
 * 2. Support channels by tier (table)
 * 3. SLA response times
 * 4. CTA to contact
 */

import { SEO } from '@/components/SEO';
import { Mail, MessageSquare, Phone, Clock, CheckCircle, XCircle, Calendar } from 'lucide-react';

/** Support tier data from BRD §25 */
interface SupportTier {
  name: string;
  price: string;
  email: boolean;
  chat: boolean;
  phone: boolean;
  strategyCall: boolean;
}

const supportTiers: SupportTier[] = [
  { name: 'Launch', price: '$249', email: true, chat: false, phone: false, strategyCall: false },
  { name: 'Capture', price: '$97/mo', email: true, chat: true, phone: false, strategyCall: false },
  { name: 'Convert', price: '$197/mo', email: true, chat: true, phone: false, strategyCall: false },
  { name: 'Scale', price: '$297/mo', email: true, chat: true, phone: true, strategyCall: true },
];

/** SLA data from BRD §25 */
const slaItems = [
  { priority: 'Urgent', description: 'Site down', firstResponse: '1 hour', resolution: '4 hours' },
  { priority: 'High', description: 'Feature broken', firstResponse: '4 hours', resolution: '24 hours' },
  { priority: 'Normal', description: 'General request', firstResponse: '24 hours', resolution: '3 business days' },
  { priority: 'Low', description: 'Enhancement', firstResponse: '48 hours', resolution: 'Best effort' },
];

/**
 * Renders a check or X icon for support channel availability.
 */
const ChannelIcon = ({ available }: { available: boolean }) =>
  available ? (
    <CheckCircle className="h-5 w-5 text-accent mx-auto" aria-label="Available" />
  ) : (
    <XCircle className="h-5 w-5 text-muted-foreground/30 mx-auto" aria-label="Not available" />
  );

/**
 * Support page component with tier-based channels and SLAs.
 * 
 * @component
 */
const Support = () => {
  return (
    <>
      <SEO
        title="Support"
        description="EverIntent support channels, response times, and service level agreements. Get help when you need it."
        canonical="/support"
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'EverIntent Support',
            description: 'Support channels, SLA response times, and service level agreements for EverIntent customers.',
            url: 'https://everintent.com/support',
          },
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'What support channels does EverIntent offer?', acceptedAnswer: { '@type': 'Answer', text: 'All plans include email support. Capture and Convert plans add live chat. Scale plan customers get email, chat, phone support, and quarterly strategy calls.' } },
              { '@type': 'Question', name: 'What are EverIntent response times?', acceptedAnswer: { '@type': 'Answer', text: 'Urgent issues (site down): 1-hour first response, 4-hour resolution. High priority: 4-hour response, 24-hour resolution. Normal requests: 24-hour response, 3 business days resolution.' } },
              { '@type': 'Question', name: 'How do I submit a support ticket?', acceptedAnswer: { '@type': 'Answer', text: 'Email support@everintent.com or use the contact form at everintent.com/contact. Include your business name and a description of the issue for fastest resolution.' } },
            ],
          },
        ]}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-background" aria-label="Account support">
        <div className="container max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Help With Your Account
          </h1>
          <p className="text-lg text-muted-foreground">
            Submit a ticket, check SLA response times, or contact us directly.
          </p>
        </div>
      </section>

      {/* Support Channels by Tier */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
            Support Channels by Plan
          </h2>
          <div className="overflow-x-auto rounded-xl border border-border/40 bg-card">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/40">
                  <th className="text-left p-4 font-medium text-muted-foreground">Plan</th>
                  <th className="p-4 font-medium text-muted-foreground">
                    <Mail className="h-4 w-4 mx-auto mb-1" />
                    Email
                  </th>
                  <th className="p-4 font-medium text-muted-foreground">
                    <MessageSquare className="h-4 w-4 mx-auto mb-1" />
                    Chat
                  </th>
                  <th className="p-4 font-medium text-muted-foreground">
                    <Phone className="h-4 w-4 mx-auto mb-1" />
                    Phone
                  </th>
                  <th className="p-4 font-medium text-muted-foreground">
                    <Calendar className="h-4 w-4 mx-auto mb-1" />
                    Strategy
                  </th>
                </tr>
              </thead>
              <tbody>
                {supportTiers.map((tier) => (
                  <tr key={tier.name} className="border-b border-border/20 last:border-0">
                    <td className="p-4">
                      <span className="font-medium text-foreground">{tier.name}</span>
                      <span className="block text-xs text-muted-foreground">{tier.price}</span>
                    </td>
                    <td className="p-4"><ChannelIcon available={tier.email} /></td>
                    <td className="p-4"><ChannelIcon available={tier.chat} /></td>
                    <td className="p-4"><ChannelIcon available={tier.phone} /></td>
                    <td className="p-4"><ChannelIcon available={tier.strategyCall} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* SLA Response Times */}
      <section className="py-12 md:py-16 bg-card border-t border-border/20">
        <div className="container max-w-3xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-accent" />
            <h2 className="text-2xl font-bold text-foreground">
              Response Times
            </h2>
          </div>
          <div className="space-y-3">
            {slaItems.map((sla) => (
              <div
                key={sla.priority}
                className="flex items-center justify-between rounded-lg border border-border/40 bg-background p-4"
              >
                <div>
                  <span className="font-medium text-foreground">{sla.priority}</span>
                  <span className="text-xs text-muted-foreground ml-2">({sla.description})</span>
                </div>
                <div className="text-right text-sm">
                  <span className="text-foreground font-medium">{sla.firstResponse}</span>
                  <span className="text-muted-foreground"> → {sla.resolution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-2xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Need immediate help?
          </h2>
          <p className="text-muted-foreground mb-8">
            Reach out directly. We respond within 24 hours for all tiers.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-8 py-3 text-sm font-medium shadow hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="mailto:support@everintent.com"
              className="inline-flex items-center justify-center rounded-md border border-border bg-background text-foreground px-8 py-3 text-sm font-medium hover:bg-muted transition-colors"
            >
              <Mail className="h-4 w-4 mr-2" />
              support@everintent.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Support;
