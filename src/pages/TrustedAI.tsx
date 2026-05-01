/**
 * @fileoverview Trusted AI Upgrade — Dedicated landing page
 * @module pages/TrustedAI
 */

import { SEO } from '@/components/SEO';
import { FAQSection } from '@/components/faq/FAQSection';
import { TrustedAIUpgradeCard } from '@/components/ai-employee/TrustedAIUpgradeCard';
import { Shield, CheckCircle2, AlertTriangle, GitBranch, Eye, ShieldCheck } from 'lucide-react';
import { trackTrustedAIPageCtaClicked } from '@/lib/checkoutAnalytics';

const productSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'Product' as const,
  name: 'Trusted AI Upgrade',
  description:
    'Trusted AI is built on a visual canvas, tested in staging, and approved by you before it ever talks to a customer.',
  brand: { '@type': 'Brand' as const, name: 'EverIntent' },
  offers: [
    {
      '@type': 'Offer' as const,
      price: '147',
      priceCurrency: 'USD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification' as const,
        price: '147',
        priceCurrency: 'USD',
        unitCode: 'MON',
        billingDuration: 'P1M',
      },
      availability: 'https://schema.org/InStock',
    },
    {
      '@type': 'Offer' as const,
      price: '497',
      priceCurrency: 'USD',
      description: 'AI Training & Implementation (one-time)',
      availability: 'https://schema.org/InStock',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org' as const,
  '@type': 'BreadcrumbList' as const,
  itemListElement: [
    { '@type': 'ListItem' as const, position: 1, name: 'Home', item: 'https://everintent.com/' },
    { '@type': 'ListItem' as const, position: 2, name: 'AI Employee', item: 'https://everintent.com/let-ai-handle-it' },
    { '@type': 'ListItem' as const, position: 3, name: 'Trusted AI', item: 'https://everintent.com/trusted-ai' },
  ],
};

const buyerChips = [
  { label: 'Credibility', text: 'Your name is on the door. The AI must not embarrass it.' },
  { label: 'Bleeding wound', text: 'One wrong quote, one wrong booking, costs more than the plan.' },
  { label: 'Burnout', text: 'You cannot babysit a chatbot. Approve it once, ship it, move on.' },
];

const failures = [
  {
    title: 'It quotes the wrong price',
    body: 'Customer asks what an oil change costs. Standard AI guesses $89. You charge $389. Now you either eat the difference or argue with a customer who is already screenshotting the chat.',
  },
  {
    title: 'It invents your hours',
    body: 'Customer asks if you are open Saturday. Standard AI says yes because most businesses in your category are open Saturday. You are not. The customer drives over to a closed door.',
  },
  {
    title: 'It invents a service',
    body: 'Customer asks if you offer mobile service. Standard AI says yes because it sounds plausible. You do not. Now you are explaining a service you never offered to a customer who already booked.',
  },
];

const howItWorks = [
  { step: 'Build', body: 'Your conversation flow is laid out on a visual canvas. Every prompt, every branch, every fallback is visible.' },
  { step: 'Stage', body: 'We run the flow in staging against real test cases. You see exactly what the AI will say.' },
  { step: 'Approve', body: 'You sign off on the version. Nothing ships otherwise. Diffs are visible on every change.' },
  { step: 'Ship', body: 'Trusted AI goes live. Updates follow the same Build → Stage → Approve loop. One-click rollback.' },
];

const comparison = [
  { row: 'Where outputs come from', standard: 'Generative model guess', trusted: 'Approved deterministic script' },
  { row: 'Drift risk', standard: 'High (model updates can change behavior)', trusted: 'None (frozen until you approve a new version)' },
  { row: 'Hallucination possible', standard: 'Yes', trusted: 'No (AI says it does not know and routes to you)' },
  { row: 'Operator control', standard: 'Prompt-level', trusted: 'Version-level, with sign-off' },
  { row: 'Update workflow', standard: 'Live, anytime', trusted: 'Build, stage, approve, ship' },
  { row: 'Compliance posture', standard: 'You wear what it says', trusted: 'You approved every word it can say' },
  { row: 'Testing before launch', standard: 'None', trusted: 'Required' },
  { row: 'Version control', standard: 'No', trusted: 'Yes, with rollback' },
];

export default function TrustedAI() {
  return (
    <>
      <SEO
        title="Trusted AI: The AI That Does Exactly What You Approved | EverIntent"
        description="Standard AI is confident but not always correct. Trusted AI is built on a visual canvas, tested in staging, and approved by you before it ever talks to a customer. $147/mo + $497 setup."
        canonical="/trusted-ai"
        structuredData={[productSchema, breadcrumbSchema]}
      />

      <main className="bg-background pt-20">
        {/* 1. Hero */}
        <section className="relative overflow-hidden border-b border-border/30">
          <div className="container max-w-5xl mx-auto px-4 py-16 md:py-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-gold/10 border border-gold/30 mb-6">
              <Shield className="w-4 h-4 text-gold" aria-hidden="true" />
              <span className="text-xs font-semibold uppercase tracking-wider text-gold">Trusted AI Upgrade</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-foreground mb-6">
              The AI was confident. The AI was wrong. Yours won&apos;t be.
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mb-8">
              Trusted AI does exactly what you approved. Nothing else.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              {buyerChips.map((chip) => (
                <div key={chip.label} className="px-4 py-3 rounded-lg border border-border/40 bg-card max-w-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-gold mb-1">{chip.label}</p>
                  <p className="text-sm text-muted-foreground">{chip.text}</p>
                </div>
              ))}
            </div>
            <a
              href="/checkout/full-ai?addon=trusted-ai"
              onClick={() => trackTrustedAIPageCtaClicked('hero')}
              className="btn-gold inline-flex items-center justify-center min-h-[48px] rounded-lg px-6 text-base font-semibold"
            >
              Add Trusted AI to my plan
            </a>
          </div>
        </section>

        {/* 2. Why standard AI breaks trust */}
        <section className="py-16 md:py-20 border-b border-border/30">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why standard AI breaks trust</h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
              A Canadian court ruled an airline was legally liable for the policy its chatbot invented.
              The legal precedent is clear: your AI&apos;s lies are your lies.
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {failures.map((f) => (
                <div key={f.title} className="p-6 rounded-xl border border-border/40 bg-card">
                  <AlertTriangle className="w-6 h-6 text-gold mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-foreground mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. How Trusted AI works */}
        <section className="py-16 md:py-20 border-b border-border/30 bg-card/30">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">How Trusted AI works</h2>
            <div className="grid md:grid-cols-4 gap-5">
              {howItWorks.map((step, i) => (
                <div key={step.step} className="p-6 rounded-xl border border-border/40 bg-background">
                  <div className="text-4xl font-bold text-gold/40 mb-2">{i + 1}</div>
                  <h3 className="font-bold text-foreground mb-2">{step.step}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Comparison table */}
        <section className="py-16 md:py-20 border-b border-border/30">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-10">Standard AI vs Trusted AI</h2>
            <div className="overflow-x-auto rounded-xl border border-border/40">
              <table className="w-full text-sm">
                <thead className="bg-card">
                  <tr>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Capability</th>
                    <th className="text-left p-4 font-semibold text-muted-foreground">Standard AI</th>
                    <th className="text-left p-4 font-semibold text-gold">Trusted AI</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row) => (
                    <tr key={row.row} className="border-t border-border/30">
                      <td className="p-4 font-medium text-foreground">{row.row}</td>
                      <td className="p-4 text-muted-foreground">{row.standard}</td>
                      <td className="p-4 text-foreground">{row.trusted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 5. What you control */}
        <section className="py-16 md:py-20 border-b border-border/30 bg-card/30">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What you control</h2>
            <ul className="space-y-3 max-w-3xl">
              {[
                'Every line the AI is allowed to say.',
                'Every fallback when the AI does not know.',
                'Every routing rule that hands the conversation back to a human.',
                'Every version that ships, with diff visible on every change.',
                'One-click rollback to any previous approved version.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 6. What happens when AI does not know */}
        <section className="py-16 md:py-20 border-b border-border/30">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What happens when the AI doesn&apos;t know</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl border border-border/40 bg-card">
                <Eye className="w-6 h-6 text-gold mb-3" aria-hidden="true" />
                <h3 className="font-bold mb-2">It tells the truth</h3>
                <p className="text-sm text-muted-foreground">The AI says it does not have that answer instead of guessing.</p>
              </div>
              <div className="p-5 rounded-xl border border-border/40 bg-card">
                <GitBranch className="w-6 h-6 text-gold mb-3" aria-hidden="true" />
                <h3 className="font-bold mb-2">It routes to you</h3>
                <p className="text-sm text-muted-foreground">The conversation hands off to text, email, or a call. You answer once.</p>
              </div>
              <div className="p-5 rounded-xl border border-border/40 bg-card">
                <ShieldCheck className="w-6 h-6 text-gold mb-3" aria-hidden="true" />
                <h3 className="font-bold mb-2">It learns the right way</h3>
                <p className="text-sm text-muted-foreground">Your answer becomes a new approved script entry. Drift becomes impossible.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Industries */}
        <section className="py-16 md:py-20 border-b border-border/30 bg-card/30">
          <div className="container max-w-5xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Industries where this matters most</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {[
                { name: 'Health & Wellness', body: 'Wrong dosage info, wrong appointment type, wrong intake instructions create real harm.' },
                { name: 'Legal & Professional', body: 'A guessed answer about a deadline or a fee creates real liability.' },
                { name: 'Automotive', body: 'A wrong quote on a repair starts every customer relationship in the hole.' },
                { name: 'Home Services', body: 'A wrong dispatch window or service area sends a tech to the wrong job.' },
              ].map((ind) => (
                <div key={ind.name} className="p-5 rounded-xl border border-border/40 bg-background">
                  <h3 className="font-bold text-foreground mb-2">{ind.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{ind.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. Pricing band */}
        <section className="py-16 md:py-20 border-b border-border/30">
          <div className="container max-w-5xl mx-auto px-4">
            <TrustedAIUpgradeCard variant="banner" />
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="py-16 md:py-20 border-b border-border/30 bg-card/30">
          <div className="container max-w-3xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Questions about Trusted AI</h2>
            <FAQSection products={['trusted-ai']} objectionsFirst />
          </div>
        </section>

        {/* 10. Final CTA */}
        <section className="py-20 md:py-28">
          <div className="container max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ship the AI that does exactly what you approved.
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              $147 a month plus a one-time $497 AI Training &amp; Implementation. Cancel anytime.
            </p>
            <a
              href="/checkout/full-ai?addon=trusted-ai"
              onClick={() => trackTrustedAIPageCtaClicked('final')}
              className="btn-gold inline-flex items-center justify-center min-h-[48px] rounded-lg px-6 text-base font-semibold"
            >
              Add Trusted AI to my plan
            </a>
          </div>
        </section>
      </main>
    </>
  );
}