/**
 * @fileoverview Terms of Service page for EverIntent.
 * @module pages/legal/TermsOfService
 */

import { SEO } from '@/components/SEO';
import legalHeroImg from '@/assets/lifestyle/legal-documents-desk.jpg';

/**
 * Terms of Service page for EverIntent web design and automation services.
 * 
 * Contains required sections:
 * - Agreement to terms
 * - Services description (T1-T4 website tiers)
 * - Payment terms (one-time + monthly subscriptions)
 * - Refund policy (before/after Work Commencement email)
 * - Chargeback policy with fraud deterrence language
 * - Portfolio/marketing rights (opt-in at checkout)
 * - Hosting SLA (99.5% uptime, 24hr support response)
 * - IP ownership (customer owns deliverable, EI retains templates)
 * - Limitation of liability (12-month cap)
 * - Dispute resolution (Orange County, CA)
 * - Termination and modification clauses
 * 
 * @component
 * @example
 * <TermsOfService />
 */
export default function TermsOfService() {
  const lastUpdated = 'December 22, 2025';

  return (
    <>
      <SEO
        title="Terms of Service"
        description="EverIntent Terms of Service: Service agreement, payment terms, refund policy, and legal terms for web design services."
        canonical="/legal/terms"
      />

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={legalHeroImg}
              alt="Legal documents and fountain pen on a professional desk in warm golden light"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              width={1920}
              height={1080}
            />
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          </div>
          <div className="container relative">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">

              {/* Section 1: Agreement */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  1. Agreement to Terms
                </h2>
                <p className="text-muted-foreground">
                  By accessing or using EverIntent's website and services, you agree to be bound by these Terms of Service and our <a href="/legal/privacy" className="text-accent hover:underline">Privacy Policy</a>. If you do not agree to these terms, do not use our services.
                </p>
                <p className="text-muted-foreground">
                  These terms constitute a legally binding agreement between you and EverIntent LLC ("EverIntent," "we," "us," or "our").
                </p>
              </div>

              {/* Section 2: Services */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  2. Services Description
                </h2>
                <p className="text-muted-foreground">
                  EverIntent provides web design, development, hosting, and automation services for local service businesses. Our services are offered in tiers:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Launch:</strong> One-time website build with essential features ($249)</li>
                  <li><strong>Capture:</strong> Website with lead capture and CRM integration ($97/mo)</li>
                  <li><strong>Convert:</strong> Full business management suite with automation ($197/mo)</li>
                  <li><strong>Scale:</strong> AI-powered growth engine with priority support ($297/mo)</li>
                </ul>
                <p className="text-muted-foreground">
                  Each tier includes specific features as described on our pricing page at the time of purchase.
                </p>
              </div>

              {/* Section 3: Payment Terms */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  3. Payment Terms
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>One-Time Fees:</strong> Setup fees are charged at checkout and due immediately</li>
                  <li><strong>Monthly Subscriptions:</strong> Recurring fees are billed on the same day each month</li>
                  <li><strong>Payment Processing:</strong> All payments are processed securely via Stripe</li>
                  <li><strong>Accepted Methods:</strong> Major credit cards (Visa, Mastercard, American Express, Discover)</li>
                  <li><strong>Taxes:</strong> Sales tax is calculated and collected where required by law</li>
                </ul>
              </div>

              {/* Section 4: Refund & Cancellation */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  4. Refund & Cancellation Policy
                </h2>
                
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Before Work Begins</h3>
                  <p className="text-muted-foreground">
                    A full refund is available if you cancel before receiving the "Work Commencement" email notification. Once you receive this email, your project is in active development and no refund is available.
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-4 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">After Work Begins</h3>
                  <p className="text-muted-foreground">
                    No refunds are available once work has commenced. You may cancel your subscription at any time; service continues through the end of your billing period.
                  </p>
                </div>

                <div className="bg-muted rounded-lg p-4 border border-border">
                  <h3 className="text-lg font-semibold text-foreground mb-2">Monthly Subscriptions</h3>
                  <p className="text-muted-foreground">
                    Cancel anytime via the customer portal or by contacting support. No partial-month refunds are provided.
                  </p>
                </div>

                <p className="text-sm text-muted-foreground italic">
                  Note: California Civil Code §1723 applies to retail goods, not services. Web design services are not subject to statutory cooling-off periods.
                </p>
              </div>

              {/* Section 5: Work Commencement */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  5. Work Commencement Notification
                </h2>
                <p className="text-muted-foreground">
                  Within 1-2 business days of payment, you will receive an email titled "Your Project Is Starting." This email includes:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Reminder of our refund policy</li>
                  <li>Expected project timeline</li>
                  <li>Intake form link (if not already completed)</li>
                  <li>Your dedicated project contact information</li>
                </ul>
                <p className="text-muted-foreground font-semibold">
                  This email triggers the closure of the refund window.
                </p>
              </div>

              {/* Section 6: Chargeback Policy */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  6. Chargeback Policy
                </h2>
                <p className="text-muted-foreground">
                  If you believe there is an error with your charge, please contact us at <a href="mailto:billing@everintent.com" className="text-accent hover:underline">billing@everintent.com</a> within 60 days. We will investigate and resolve legitimate disputes promptly.
                </p>
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                  <p className="text-foreground font-semibold">Important Notice</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Filing a chargeback after receiving services, or for a transaction you authorized, may be considered fraud. We maintain detailed records of all transactions, communications, and service delivery. We reserve the right to pursue fraudulent chargebacks through appropriate legal channels and report them to credit bureaus.
                  </p>
                </div>
              </div>

              {/* Section 7: Portfolio Rights */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  7. Portfolio & Marketing Rights
                </h2>
                <p className="text-muted-foreground">
                  During checkout, you may opt-in to allow us to feature your website in our portfolio with the checkbox: "You may feature my completed website in your portfolio."
                </p>
                <p className="text-muted-foreground">
                  If opted-in, we may:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Display screenshots of your website</li>
                  <li>Describe the project scope and results</li>
                  <li>Link to the live website in marketing materials</li>
                </ul>
                <p className="text-muted-foreground">
                  You may request removal from our portfolio at any time after launch by contacting support.
                </p>
              </div>

              {/* Section 8: Hosting SLA */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  8. Hosting & Service Level Agreement
                </h2>
                <p className="text-muted-foreground">
                  For subscription customers (T2-T4), we provide:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-border rounded-lg overflow-hidden">
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground bg-muted">Uptime Target</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">99.5% (excluding scheduled maintenance)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground bg-muted">Maintenance Window</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Sundays 2-6am PT (48-hour notice provided)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground bg-muted">Support Response</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Within 24 business hours</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground bg-muted">Backups</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Daily, retained 30 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 9: Intellectual Property */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  9. Intellectual Property
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Design Work:</strong> Customer owns the final deliverable upon full payment</li>
                  <li><strong>Templates & Code:</strong> Templates, frameworks, and code libraries remain the property of EverIntent</li>
                  <li><strong>Customer Content:</strong> Customer represents they have rights to all content provided for the website</li>
                </ul>
              </div>

              {/* Section 10: Limitation of Liability */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  10. Limitation of Liability
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Maximum Liability:</strong> Our total liability is limited to the amount you paid us in the 12 months prior to any claim</li>
                  <li><strong>Exclusions:</strong> We are not liable for indirect, consequential, or punitive damages; lost profits; or data loss</li>
                  <li><strong>Customer Responsibility:</strong> Customer is responsible for content accuracy, domain renewals (if self-managed), and third-party integrations</li>
                </ul>
              </div>

              {/* Section 11: Dispute Resolution */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  11. Dispute Resolution
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Informal Resolution:</strong> Contact <a href="mailto:support@everintent.com" className="text-accent hover:underline">support@everintent.com</a> first to resolve disputes</li>
                  <li><strong>Mediation:</strong> Disputes will be mediated in Orange County, California</li>
                  <li><strong>Governing Law:</strong> These terms are governed by the laws of the State of California</li>
                  <li><strong>Small Claims:</strong> Either party may pursue claims in appropriate small claims court</li>
                </ul>
              </div>

              {/* Section 12: Termination */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  12. Termination
                </h2>
                <p className="text-muted-foreground"><strong>We may terminate for:</strong></p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Non-payment (after 7-day grace period)</li>
                  <li>Violation of these Terms of Service</li>
                  <li>Abusive behavior toward our team</li>
                </ul>
                <p className="text-muted-foreground"><strong>Customer may terminate:</strong></p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-4">
                  <li>Anytime via the customer portal or by emailing support</li>
                </ul>
                <p className="text-muted-foreground"><strong>Post-termination:</strong></p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Data retained 30 days for export, then permanently deleted</li>
                </ul>
              </div>

              {/* Section 13: Modifications */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  13. Modifications
                </h2>
                <p className="text-muted-foreground">
                  We may update these Terms of Service with 30-day notice via email. Continued use of our services after the notice period constitutes acceptance of the updated terms.
                </p>
              </div>

              {/* Section 14: Contact */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  14. Contact Us
                </h2>
                <p className="text-muted-foreground">
                  Questions about these terms? Contact us:
                </p>
                <div className="bg-card rounded-lg p-4 border border-border space-y-2">
                  <p className="text-foreground font-semibold">EverIntent LLC</p>
                  <p className="text-muted-foreground">2892 N Bellflower Blvd, PMB 1018</p>
                  <p className="text-muted-foreground">Long Beach, CA 90815</p>
                  <p className="text-muted-foreground">
                    Email: <a href="mailto:legal@everintent.com" className="text-accent hover:underline">legal@everintent.com</a>
                  </p>
                </div>
              </div>
              {/* Related Legal Documents */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  Related Legal Documents
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><a href="/legal/privacy" className="text-accent hover:underline">Privacy Policy</a></li>
                  <li><a href="/legal/cookies" className="text-accent hover:underline">Cookie Policy</a></li>
                  <li><a href="/legal/data-request" className="text-accent hover:underline">Data Rights Request</a></li>
                  <li><a href="/legal/accessibility-statement" className="text-accent hover:underline">Accessibility Statement</a></li>
                </ul>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
