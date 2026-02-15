/**
 * @fileoverview Cookie Policy page for EverIntent.
 * @module pages/legal/CookiePolicy
 */

import { SEO } from '@/components/SEO';
import { triggerCookiePreferences } from '@/components/CookieConsent';
import legalHeroImg from '@/assets/lifestyle/legal-documents-desk.jpg';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

/**
 * Cookie Policy page explaining cookie usage and categories.
 * 
 * Contains required sections:
 * - What cookies are (brief explanation)
 * - Cookie categories table (Necessary, Analytics, Marketing, Functional)
 * - Third-party cookies list (Google, Facebook, GHL)
 * - Managing cookies (browser settings + privacy settings link)
 * - Link to trigger cookie preferences modal
 * 
 * @component
 * @example
 * <CookiePolicy />
 */
export default function CookiePolicy() {
  const lastUpdated = 'December 22, 2025';

  return (
    <>
      <SEO
        title="Cookie Policy"
        description="EverIntent Cookie Policy: Learn about the cookies we use and how to manage your preferences."
        canonical="/legal/cookies"
      />

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="relative py-16 md:py-24 overflow-hidden" aria-label="Cookie Policy">
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
              Cookie Policy
            </h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="prose dark:prose-invert max-w-none space-y-8 text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">

              {/* Manage Preferences CTA */}
              <div className="bg-accent/10 border border-accent/30 rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">Manage Your Cookie Preferences</h3>
                  <p className="text-muted-foreground text-sm">
                    You can change your cookie settings at any time.
                  </p>
                </div>
                <Button
                  onClick={triggerCookiePreferences}
                  variant="outline"
                  className="shrink-0"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Cookie Settings
                </Button>
              </div>

              {/* Section 1: What Are Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  1. What Are Cookies?
                </h2>
                <p className="text-muted-foreground">
                  Cookies are small text files that are placed on your device when you visit a website. They help the website remember your preferences, understand how you use the site, and improve your experience.
                </p>
                <p className="text-muted-foreground">
                  We also use similar technologies such as:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Pixels/Web Beacons:</strong> Tiny images that track page views and conversions</li>
                  <li><strong>Local Storage:</strong> Browser storage that persists data across sessions</li>
                  <li><strong>Session Storage:</strong> Temporary storage cleared when you close your browser</li>
                </ul>
              </div>

              {/* Section 2: Cookie Categories */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  2. Cookie Categories
                </h2>
                <p className="text-muted-foreground">
                  We use the following categories of cookies:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-border rounded-lg overflow-hidden">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Category</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Purpose</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Examples</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Can Disable?</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">Strictly Necessary</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Essential site functionality and security</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Session cookies, CSRF tokens, authentication</td>
                        <td className="px-4 py-3 text-sm text-destructive font-medium">No</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">Analytics</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Track usage patterns to improve our site</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Google Analytics, page view tracking</td>
                        <td className="px-4 py-3 text-sm text-accent font-medium">Yes</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">Marketing</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Advertising, retargeting, conversion tracking</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Facebook Pixel, Google Ads</td>
                        <td className="px-4 py-3 text-sm text-accent font-medium">Yes</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">Functional</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Remember preferences, enable features</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Theme preference, chat widget, cookie consent</td>
                        <td className="px-4 py-3 text-sm text-accent font-medium">Yes</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 3: Strictly Necessary Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  3. Strictly Necessary Cookies
                </h2>
                <p className="text-muted-foreground">
                  These cookies are essential for the website to function and cannot be disabled. They include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>cookie-consent:</strong> Remembers your cookie preferences</li>
                  <li><strong>Session cookies:</strong> Maintain your session while browsing</li>
                  <li><strong>Security tokens:</strong> Protect against cross-site request forgery (CSRF)</li>
                </ul>
              </div>

              {/* Section 4: Analytics Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  4. Analytics Cookies
                </h2>
                <p className="text-muted-foreground">
                  We use analytics cookies to understand how visitors interact with our website. This helps us improve our content and user experience.
                </p>
                <div className="bg-muted rounded-lg p-4 border border-border">
                  <p className="text-foreground font-semibold">Google Analytics</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    We use Google Analytics to collect anonymous usage data including pages visited, time on site, and traffic sources. This data is aggregated and does not identify individual visitors.
                  </p>
                </div>
              </div>

              {/* Section 5: Marketing Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  5. Marketing Cookies
                </h2>
                <p className="text-muted-foreground">
                  Marketing cookies are used to track visitors across websites for advertising purposes.
                </p>
                <div className="space-y-3">
                  <div className="bg-muted rounded-lg p-4 border border-border">
                    <p className="text-foreground font-semibold">Facebook/Meta Pixel</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Tracks conversions from Facebook ads and enables retargeting to website visitors.
                    </p>
                  </div>
                  <div className="bg-muted rounded-lg p-4 border border-border">
                    <p className="text-foreground font-semibold">Google Ads</p>
                    <p className="text-muted-foreground text-sm mt-1">
                      Tracks conversions from Google advertising campaigns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 6: Functional Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  6. Functional Cookies
                </h2>
                <p className="text-muted-foreground">
                  Functional cookies enable enhanced features and personalization.
                </p>
                <div className="bg-muted rounded-lg p-4 border border-border">
                  <p className="text-foreground font-semibold">GoHighLevel Chat Widget</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Powers our live chat and AI assistant features. Stores conversation history and preferences to provide better support.
                  </p>
                </div>
              </div>

              {/* Section 7: Third-Party Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  7. Third-Party Cookies
                </h2>
                <p className="text-muted-foreground">
                  The following third parties may set cookies on our website:
                </p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-border rounded-lg overflow-hidden">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Provider</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Purpose</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Privacy Policy</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 text-sm text-foreground">Google</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Analytics, Ads</td>
                        <td className="px-4 py-3 text-sm">
                          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                            policies.google.com/privacy
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-foreground">Meta/Facebook</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Advertising, Pixel</td>
                        <td className="px-4 py-3 text-sm">
                          <a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                            facebook.com/privacy/policy
                          </a>
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm text-foreground">GoHighLevel</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Chat, CRM</td>
                        <td className="px-4 py-3 text-sm">
                          <a href="https://www.gohighlevel.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                            gohighlevel.com/privacy-policy
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 8: Managing Cookies */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  8. Managing Cookies
                </h2>
                <p className="text-muted-foreground">
                  You can control and manage cookies in several ways:
                </p>

                <h3 className="text-lg font-semibold text-foreground">On Our Website</h3>
                <p className="text-muted-foreground">
                  Use our <button onClick={triggerCookiePreferences} className="text-accent hover:underline">Cookie Settings</button> to accept or decline optional cookies.
                </p>

                <h3 className="text-lg font-semibold text-foreground">Browser Settings</h3>
                <p className="text-muted-foreground">
                  Most browsers allow you to refuse or accept cookies. Here are links to manage cookies in popular browsers:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Google Chrome
                    </a>
                  </li>
                  <li>
                    <a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Mozilla Firefox
                    </a>
                  </li>
                  <li>
                    <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Safari
                    </a>
                  </li>
                  <li>
                    <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                      Microsoft Edge
                    </a>
                  </li>
                </ul>

                <div className="bg-muted rounded-lg p-4 border border-border mt-4">
                  <p className="text-foreground font-semibold">Note</p>
                  <p className="text-muted-foreground text-sm mt-1">
                    Disabling certain cookies may affect website functionality. Strictly necessary cookies cannot be disabled and are required for basic site operation.
                  </p>
                </div>
              </div>

              {/* Section 9: Contact */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  9. Contact Us
                </h2>
                <p className="text-muted-foreground">
                  If you have questions about our use of cookies, please contact us:
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
              {/* Related Legal Documents */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  Related Legal Documents
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><a href="/legal/privacy" className="text-accent hover:underline">Privacy Policy</a></li>
                  <li><a href="/legal/terms" className="text-accent hover:underline">Terms of Service</a></li>
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
