/**
 * @fileoverview Privacy Policy page for EverIntent.
 * @module pages/legal/PrivacyPolicy
 */

import { SEO } from '@/components/SEO';

/**
 * Privacy Policy page compliant with CCPA/California privacy requirements.
 * 
 * Contains required sections:
 * - Data collection (contact info, usage data, cookies)
 * - Data usage purposes (service delivery, communication, analytics)
 * - Data sharing (service providers only, never sold)
 * - Call/SMS recording disclosure
 * - Data retention periods (7 years customer, 3 years leads, 26 months analytics)
 * - California/CCPA rights (know, delete, opt-out, non-discrimination)
 * 
 * @component
 * @example
 * <PrivacyPolicy />
 */
export default function PrivacyPolicy() {
  const lastUpdated = 'December 22, 2025';

  return (
    <>
      <SEO
        title="Privacy Policy"
        description="EverIntent Privacy Policy: Learn how we collect, use, and protect your data. We never sell personal information."
      />

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="relative py-16 md:py-24 bg-card">
          <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
          <div className="container relative">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
              
              {/* Introduction */}
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  EverIntent LLC ("EverIntent," "we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                </p>
              </div>

              {/* Section 1: Data We Collect */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  1. Data We Collect
                </h2>
                
                <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                <p className="text-muted-foreground">
                  When you fill out forms, make purchases, or contact us, we may collect:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Name and business name</li>
                  <li>Email address</li>
                  <li>Phone number</li>
                  <li>Mailing address</li>
                  <li>Payment information (processed securely via Stripe)</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground">Usage Data</h3>
                <p className="text-muted-foreground">
                  We automatically collect certain information when you visit our website:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>IP address and location data</li>
                  <li>Browser type and version</li>
                  <li>Pages visited and time spent</li>
                  <li>Referring website</li>
                  <li>Device information</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground">Cookies & Tracking</h3>
                <p className="text-muted-foreground">
                  We use cookies, pixels, and similar technologies to analyze site usage and improve your experience. See our <a href="/legal/cookies" className="text-accent hover:underline">Cookie Policy</a> for details.
                </p>
              </div>

              {/* Section 2: How We Use Your Data */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  2. How We Use Your Data
                </h2>
                <p className="text-muted-foreground">We use your information to:</p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Deliver Services:</strong> Build your website, provide support, and fulfill your orders</li>
                  <li><strong>Communicate:</strong> Send project updates, respond to inquiries, and provide customer service</li>
                  <li><strong>Marketing:</strong> Send promotional emails (with your consent, you may opt out anytime)</li>
                  <li><strong>Analytics:</strong> Understand how visitors use our site to improve our services</li>
                  <li><strong>Fraud Prevention:</strong> Protect against unauthorized transactions and abuse</li>
                  <li><strong>Legal Compliance:</strong> Meet legal and regulatory requirements</li>
                </ul>
              </div>

              {/* Section 3: Who We Share Data With */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  3. Who We Share Data With
                </h2>
                <p className="text-muted-foreground">
                  We may share your information with:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Service Providers:</strong> GoHighLevel (CRM), Stripe (payments), Vercel (hosting), Supabase (database)</li>
                  <li><strong>Legal Requirements:</strong> When required by law, subpoena, or to protect our rights</li>
                  <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets</li>
                </ul>

                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-4">
                  <p className="text-foreground font-semibold">
                    We never sell your personal data.
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Your information is not sold to advertisers, data brokers, or any third parties.
                  </p>
                </div>
              </div>

              {/* Section 4: Call & SMS Recording */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  4. Call & SMS Recording Disclosure
                </h2>
                <p className="text-muted-foreground">
                  Calls and text messages to or from EverIntent may be recorded for quality assurance and training purposes. By communicating with us via phone or SMS, you consent to such recording. We use AI-powered systems for some communications, which will identify themselves at the start of the call.
                </p>
              </div>

              {/* Section 5: Data Retention */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  5. Data Retention
                </h2>
                <p className="text-muted-foreground">We retain your data for the following periods:</p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-border rounded-lg overflow-hidden">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Data Type</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Retention Period</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Customer Data</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Duration of relationship + 7 years</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Lead Information</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">3 years from last contact</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Analytics Data</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">26 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 6: Your Rights (CCPA) */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  6. Your Rights (California/CCPA)
                </h2>
                <p className="text-muted-foreground">
                  If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA):
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Right to Know:</strong> Request what personal information we have collected about you</li>
                  <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
                  <li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (we do not sell your data)</li>
                  <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising your rights</li>
                </ul>
                <p className="text-muted-foreground mt-4">
                  To exercise these rights, submit a request via our <a href="/legal/data-request" className="text-accent hover:underline">Data Rights Request</a> page or email <a href="mailto:privacy@everintent.com" className="text-accent hover:underline">privacy@everintent.com</a>.
                </p>
              </div>

              {/* Section 7: Data Sharing Disclosure */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  7. Data Sharing Disclosure
                </h2>
                <div className="bg-muted rounded-lg p-4 border border-border">
                  <p className="text-muted-foreground">
                    Information you submit through our website may be shared with EverIntent LLC service partners solely for the purpose of fulfilling your service requests. We do not sell your data to third parties.
                  </p>
                </div>
              </div>

              {/* Section 8: Security */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  8. Security
                </h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures including encryption, secure data storage, and access controls. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </div>

              {/* Section 9: Children's Privacy */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  9. Children's Privacy
                </h2>
                <p className="text-muted-foreground">
                  Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we learn we have collected such information, we will delete it promptly.
                </p>
              </div>

              {/* Section 10: Changes */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  10. Changes to This Policy
                </h2>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date. Continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
              </div>

              {/* Section 11: Contact */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  11. Contact Us
                </h2>
                <p className="text-muted-foreground">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-card rounded-lg p-4 border border-border space-y-2">
                  <p className="text-foreground font-semibold">EverIntent LLC</p>
                  <p className="text-muted-foreground">2892 N Bellflower Blvd, PMB 1018</p>
                  <p className="text-muted-foreground">Long Beach, CA 90815</p>
                  <p className="text-muted-foreground">
                    Email: <a href="mailto:privacy@everintent.com" className="text-accent hover:underline">privacy@everintent.com</a>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
