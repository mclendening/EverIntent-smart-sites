/**
 * @fileoverview Accessibility Statement page for EverIntent.
 * @module pages/legal/AccessibilityStatement
 * 
 * ADA/WCAG 2.1 AA compliance statement for a California-based company.
 * Lists all 24 accessibility modules and 5 preset profiles available on the site.
 */

import { SEO } from '@/components/SEO';
import legalHeroImg from '@/assets/lifestyle/legal-documents-desk.jpg';

/**
 * Accessibility Statement page compliant with California Unruh Civil Rights Act
 * and ADA Title III requirements.
 * 
 * Contains:
 * - Commitment statement
 * - WCAG 2.1 AA conformance target
 * - 24 accessibility features listed by category
 * - 5 preset profiles
 * - Third-party content disclaimer
 * - Feedback and contact information
 * - California-specific legal references
 * 
 * @component
 */
export default function AccessibilityStatement() {
  const lastUpdated = 'February 11, 2026';

  return (
    <>
      <SEO
        title="Accessibility Statement"
        description="EverIntent Accessibility Statement: Our commitment to digital accessibility and WCAG 2.1 AA compliance for all users."
        canonical="/legal/accessibility-statement"
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
              Accessibility Statement
            </h1>
            <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="prose dark:prose-invert max-w-none space-y-8 text-foreground prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-li:text-muted-foreground">

              {/* Section 1: Our Commitment */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  1. Our Commitment
                </h2>
                <p className="text-muted-foreground">
                  EverIntent LLC ("EverIntent," "we," "us," or "our") is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards to ensure we provide equal access to all users.
                </p>
                <p className="text-muted-foreground">
                  We believe that every person deserves full and equal access to the digital world, regardless of ability. This commitment extends to our website, web applications, and all digital content we produce.
                </p>
              </div>

              {/* Section 2: Conformance Standard */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  2. Conformance Standard
                </h2>
                <p className="text-muted-foreground">
                  We aim to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong> as published by the World Wide Web Consortium (W3C). These guidelines define how to make web content more accessible to people with a wide range of disabilities, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Visual impairments (blindness, low vision, color blindness)</li>
                  <li>Hearing impairments (deafness, hard of hearing)</li>
                  <li>Motor impairments (limited fine motor control, paralysis)</li>
                  <li>Cognitive and neurological disabilities (dyslexia, ADHD, autism)</li>
                </ul>
                <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mt-4">
                  <p className="text-foreground font-semibold">
                    Target Conformance: WCAG 2.1 Level AA
                  </p>
                  <p className="text-muted-foreground text-sm mt-1">
                    While we strive for full conformance, we acknowledge this is an ongoing effort and we are continuously working to improve.
                  </p>
                </div>
              </div>

              {/* Section 3: Accessibility Features */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  3. Accessibility Features
                </h2>
                <p className="text-muted-foreground">
                  Our website includes a built-in accessibility widget (accessible via the <strong>☰ Accessibility</strong> icon on every page) that provides 24 customizable modules organized into three categories:
                </p>

                <h3 className="text-lg font-semibold text-foreground">Content Adjustments (10 modules)</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Text Size:</strong> Three levels of text enlargement</li>
                  <li><strong>Line Height:</strong> Adjustable line spacing for improved readability</li>
                  <li><strong>Letter Spacing:</strong> Increased character spacing</li>
                  <li><strong>Font Weight:</strong> Bold text toggle for enhanced visibility</li>
                  <li><strong>Readable Font:</strong> Switch to a clean, highly legible system font</li>
                  <li><strong>Dyslexia Font:</strong> OpenDyslexic font designed for readers with dyslexia</li>
                  <li><strong>Text Align:</strong> Cycle between left, center, and right alignment</li>
                  <li><strong>Highlight Links:</strong> Visual emphasis on all hyperlinks</li>
                  <li><strong>Text Magnifier:</strong> Enlarged text on hover</li>
                  <li><strong>Big Cursor:</strong> Larger, more visible mouse cursor</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground">Color & Contrast (5 modules)</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Dark Contrast:</strong> Dark background with light text</li>
                  <li><strong>Light Contrast:</strong> Light background with dark text</li>
                  <li><strong>High Contrast:</strong> Maximum contrast ratio for WCAG AAA compliance</li>
                  <li><strong>Monochrome:</strong> Grayscale mode removing all color</li>
                  <li><strong>High Saturation:</strong> Enhanced color vibrancy</li>
                </ul>

                <h3 className="text-lg font-semibold text-foreground">Orientation & Navigation (9 modules)</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><strong>Reading Line:</strong> Horizontal guide that follows the cursor</li>
                  <li><strong>Reading Mask:</strong> Spotlight effect isolating the area around the cursor</li>
                  <li><strong>Keyboard Navigation:</strong> Enhanced focus indicators for keyboard users</li>
                  <li><strong>Hide Images:</strong> Reduce visual clutter by dimming images</li>
                  <li><strong>Stop Animations:</strong> Pause all motion and transitions</li>
                  <li><strong>Mute Sounds:</strong> Mute all audio and video elements</li>
                  <li><strong>Highlight Titles:</strong> Visual emphasis on all headings</li>
                  <li><strong>Highlight Content:</strong> Visual emphasis on paragraph text</li>
                  <li><strong>Focus Highlight:</strong> Enhanced outline on the currently focused element</li>
                </ul>
              </div>

              {/* Section 4: Preset Profiles */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  4. Preset Accessibility Profiles
                </h2>
                <p className="text-muted-foreground">
                  For quick configuration, our accessibility widget offers five one-click preset profiles that combine multiple modules:
                </p>

                <div className="overflow-x-auto">
                  <table className="min-w-full border border-border rounded-lg overflow-hidden">
                    <thead className="bg-muted">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Profile</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">Vision Impaired</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Enlarged text, increased spacing, high contrast, and highlighted links</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">Blind Mode</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Maximum text size, high contrast, keyboard navigation, and screen reader optimizations</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">ADHD Friendly</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Reading mask, stopped animations, muted sounds, and reduced visual clutter</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">Dyslexia Friendly</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">OpenDyslexic font, increased spacing, reading line guide, and highlighted content</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-sm font-semibold text-foreground">Motor Impaired</td>
                        <td className="px-4 py-3 text-sm text-muted-foreground">Big cursor, keyboard navigation, enhanced focus indicators, and enlarged text</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Section 5: Technical Measures */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  5. Technical Measures
                </h2>
                <p className="text-muted-foreground">
                  In addition to our accessibility widget, we employ the following technical measures to support accessibility:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Semantic HTML markup (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;footer&gt;</code>)</li>
                  <li>ARIA landmarks and labels for screen reader navigation</li>
                  <li>Descriptive <code>alt</code> attributes on all meaningful images</li>
                  <li>Keyboard-navigable interactive elements with visible focus indicators</li>
                  <li>Sufficient color contrast ratios throughout the site</li>
                  <li>Responsive design that works across devices and screen sizes</li>
                  <li>Clear, consistent navigation structure</li>
                  <li>Form labels and error messages associated with input fields</li>
                </ul>
              </div>

              {/* Section 6: Third-Party Content */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  6. Third-Party Content
                </h2>
                <p className="text-muted-foreground">
                  Our website may include third-party content or link to external websites that are not under our control. While we encourage our partners and vendors to adopt accessible practices, we cannot guarantee the accessibility of third-party content. Third-party integrations on our site include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>GoHighLevel (chat widget and CRM)</li>
                  <li>Google Analytics (usage tracking)</li>
                  <li>Stripe (payment processing)</li>
                  <li>Social media embeds</li>
                </ul>
              </div>

              {/* Section 7: California Legal Compliance */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  7. California Legal Compliance
                </h2>
                <p className="text-muted-foreground">
                  As a California-based company, EverIntent is committed to compliance with applicable accessibility laws, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>Americans with Disabilities Act (ADA) Title III:</strong> We treat our website as a place of public accommodation and strive to ensure equal access to our digital services.</li>
                  <li><strong>California Unruh Civil Rights Act (Cal. Civ. Code § 51):</strong> We provide full and equal accommodations, advantages, facilities, privileges, and services to all persons regardless of disability.</li>
                  <li><strong>California Government Code § 7405 & 11135:</strong> While primarily applicable to government entities, we follow these standards as best practice guidelines for digital accessibility.</li>
                  <li><strong>Section 508 of the Rehabilitation Act:</strong> We reference Section 508 standards as a benchmark for our accessibility efforts.</li>
                </ul>
              </div>

              {/* Section 8: Known Limitations */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  8. Known Limitations
                </h2>
                <p className="text-muted-foreground">
                  Despite our best efforts, some areas of our website may not yet be fully accessible. Known limitations include:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li>Some older PDF documents may not be fully accessible to screen readers</li>
                  <li>Third-party chat widget functionality may have limited accessibility</li>
                  <li>Some interactive data visualizations may not convey all information to assistive technologies</li>
                </ul>
                <p className="text-muted-foreground">
                  We are actively working to address these limitations and welcome your feedback on areas that need improvement.
                </p>
              </div>

              {/* Section 9: Feedback & Assistance */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  9. Feedback & Assistance
                </h2>
                <p className="text-muted-foreground">
                  We welcome your feedback on the accessibility of our website. If you encounter any accessibility barriers or need assistance, please contact us:
                </p>
                <div className="bg-card rounded-lg p-4 border border-border space-y-2">
                  <p className="text-foreground font-semibold">EverIntent LLC</p>
                  <p className="text-muted-foreground">2892 N Bellflower Blvd, PMB 1018</p>
                  <p className="text-muted-foreground">Long Beach, CA 90815</p>
                  <p className="text-muted-foreground">
                    Phone: <a href="tel:+15626859500" className="text-accent hover:underline">(562) 685-9500</a>
                  </p>
                  <p className="text-muted-foreground">
                    Email: <a href="mailto:accessibility@everintent.com" className="text-accent hover:underline">accessibility@everintent.com</a>
                  </p>
                </div>
                <p className="text-muted-foreground">
                  We aim to respond to accessibility feedback within <strong>two (2) business days</strong> and to resolve reported issues within <strong>thirty (30) days</strong> where technically feasible.
                </p>
              </div>

              {/* Section 10: Formal Complaints */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  10. Formal Complaints
                </h2>
                <p className="text-muted-foreground">
                  If you are not satisfied with our response to your accessibility concern, you may file a complaint with:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li><strong>U.S. Department of Justice, Civil Rights Division:</strong> <a href="https://www.ada.gov/file-a-complaint/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">www.ada.gov/file-a-complaint</a></li>
                  <li><strong>California Department of Fair Employment & Housing (DFEH):</strong> <a href="https://calcivilrights.ca.gov/complaintprocess/" target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">calcivilrights.ca.gov</a></li>
                </ul>
              </div>

              {/* Related Legal Documents */}
              <div className="space-y-4">
                <h2 className="text-2xl font-display font-bold text-foreground border-b border-border pb-2">
                  Related Legal Documents
                </h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-1">
                  <li><a href="/legal/privacy" className="text-accent hover:underline">Privacy Policy</a></li>
                  <li><a href="/legal/terms" className="text-accent hover:underline">Terms of Service</a></li>
                  <li><a href="/legal/cookies" className="text-accent hover:underline">Cookie Policy</a></li>
                  <li><a href="/legal/data-request" className="text-accent hover:underline">Data Rights Request</a></li>
                </ul>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
