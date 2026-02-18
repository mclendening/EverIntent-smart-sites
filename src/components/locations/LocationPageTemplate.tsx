/**
 * @fileoverview Reusable Location Landing Page Template
 * @module components/locations/LocationPageTemplate
 * 
 * SSG-safe template for location-specific landing pages.
 * Each location page provides LocalBusiness schema, geo-targeted copy,
 * industry highlights, and conversion CTAs for local SEO.
 * 
 * Architecture:
 * - Hero with location name + value prop
 * - Services grid (what we do here)
 * - Local stats/social proof
 * - Industries served
 * - Final CTA
 * 
 * @see Gap 8 in SEO/AEO audit report
 */

import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import {
  MapPin,
  Phone,
  Clock,
  Star,
  ArrowRight,
  CheckCircle2,
  Zap,
  Globe,
  MessageSquare,
  CalendarCheck,
} from 'lucide-react';
import localBusinessCityscape from '@/assets/lifestyle/local-business-cityscape.jpg';
import laSkyline from '@/assets/lifestyle/la-skyline-sunset.jpg';
import ocCoastline from '@/assets/lifestyle/oc-coastline-sunset.jpg';

/** Region-to-image map for hero backgrounds */
export const regionHeroImages: Record<string, { src: string; alt: string }> = {
  'long-beach': { src: localBusinessCityscape, alt: 'Southern California boulevard with palm trees and local storefronts at golden hour' },
  'los-angeles': { src: laSkyline, alt: 'Los Angeles skyline and palm trees at golden hour sunset' },
  'orange-county': { src: ocCoastline, alt: 'Orange County coastline with pier and ocean at sunset' },
};

/** Service highlight for the location page grid */
interface ServiceHighlight {
  /** Display title */
  title: string;
  /** Short benefit-oriented description */
  description: string;
  /** Lucide icon component */
  icon: React.ElementType;
  /** Link to service page */
  href: string;
}

/** Local testimonial for social proof */
interface LocalTestimonial {
  /** Client quote text */
  quote: string;
  /** Client name */
  name: string;
  /** Business name */
  company: string;
  /** Industry vertical */
  industry: string;
}

/** Industry served in the location */
interface IndustryServed {
  /** Industry name */
  name: string;
  /** Route path */
  href: string;
}

/**
 * Props for the LocationPageTemplate component
 * @interface LocationPageProps
 */
export interface LocationPageProps {
  /** City or area name (e.g., "Long Beach") */
  locationName: string;
  /** State abbreviation */
  state: string;
  /** Full region descriptor for copy (e.g., "Long Beach, CA") */
  regionLabel: string;
  /** SEO title (before "| EverIntent" suffix) */
  seoTitle: string;
  /** SEO meta description (max 160 chars) */
  seoDescription: string;
  /** Canonical URL path */
  canonical: string;
  /** Latitude for GeoCoordinates schema */
  latitude: number;
  /** Longitude for GeoCoordinates schema */
  longitude: number;
  /** Hero headline — the bold part after "Smart Websites and AI for" */
  heroHeadline: string;
  /** Hero subheadline — benefit-driven copy */
  heroSubheadline: string;
  /** Location-specific stat (e.g., "2,400+ service businesses") */
  localStat: string;
  /** Label for the stat */
  localStatLabel: string;
  /** Service highlights for the grid */
  services: ServiceHighlight[];
  /** Local testimonials */
  testimonials: LocalTestimonial[];
  /** Industries served */
  industries: IndustryServed[];
  /** Google Maps embed URL (optional) */
  mapEmbedUrl?: string;
  /** Nearby cities for "Also serving" section */
  nearbyCities: string[];
  /** Region key for hero image selection */
  region?: 'long-beach' | 'los-angeles' | 'orange-county';
}

/**
 * LocationPageTemplate — Reusable location landing page layout
 * 
 * Renders a complete location-specific landing page with:
 * - LocalBusiness JSON-LD schema with geo coordinates
 * - Hero section with location-specific headline
 * - Services grid showing what EverIntent does in this area
 * - Social proof with local testimonials
 * - Industries served
 * - Google Maps embed (if provided)
 * - Final CTA
 * 
 * @component
 * @param {LocationPageProps} props - Location-specific content
 */
export function LocationPageTemplate({
  locationName,
  state,
  regionLabel,
  seoTitle,
  seoDescription,
  canonical,
  latitude,
  longitude,
  heroHeadline,
  heroSubheadline,
  localStat,
  localStatLabel,
  services,
  testimonials,
  industries,
  mapEmbedUrl,
  nearbyCities,
  region = 'long-beach',
}: LocationPageProps) {
  const heroImg = regionHeroImages[region] || regionHeroImages['long-beach'];
  /** LocalBusiness JSON-LD for this location */
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "name": `EverIntent — ${regionLabel}`,
    "url": `https://everintent.com${canonical}`,
    "logo": "https://everintent.com/favicon.svg",
    "description": seoDescription,
    "telephone": "+1-562-685-9500",
    "priceRange": "$249 - $597/mo",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "2892 N Bellflower Blvd, PMB 1018",
      "addressLocality": "Long Beach",
      "addressRegion": "CA",
      "postalCode": "90815",
      "addressCountry": "US",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": latitude,
      "longitude": longitude,
    },
    "areaServed": {
      "@type": locationName === "Orange County" ? "AdministrativeArea" : "City",
      "name": locationName,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "50",
      "bestRating": "5",
    },
  };

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        canonical={canonical}
        structuredData={localBusinessSchema}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-28 overflow-hidden">
        {/* Cinematic background image */}
        <div className="absolute inset-0">
          <img
            src={heroImg.src}
            alt={`${heroImg.alt}, representing ${locationName} local business community`}
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Location label */}
            <p className="text-sm font-medium uppercase tracking-widest text-primary mb-6 flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              {regionLabel}
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-foreground">Smart Websites and AI for </span>
              <span className="text-gradient">{heroHeadline}</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {heroSubheadline}
            </p>

            {/* Local stat */}
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border/30 mb-8">
              <span className="text-2xl font-bold text-accent">{localStat}</span>
              <span className="text-sm text-muted-foreground">{localStatLabel}</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="/pricing">See Plans for {locationName}</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/contact">
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  Talk to a Local Expert
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              What we do in {locationName}
            </h2>
            <p className="text-muted-foreground">
              Everything a {locationName} business needs to dominate online and never miss a lead.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {services.map((service) => (
              <a
                key={service.title}
                href={service.href}
                className="group bg-card rounded-xl p-6 border border-border/30 hover:border-accent/40 transition-all duration-300"
              >
                <service.icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs text-accent font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Trusted by {locationName} businesses
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((t, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-bold text-accent/20 leading-none mb-3">"</div>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <blockquote className="text-foreground text-lg leading-relaxed mb-6">
                  {t.quote}
                </blockquote>
                <div className="border-t border-border/30 pt-4">
                  <div className="font-medium text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.company}</div>
                  <div className="text-xs text-accent mt-1">{t.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Industries we serve in {locationName}
            </h2>
            <p className="text-muted-foreground">
              From contractors to clinics, we build smart websites for every local business type.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-5xl mx-auto">
            {industries.map((ind) => (
              <a
                key={ind.name}
                href={ind.href}
                className="flex items-center gap-2 px-4 py-3 bg-card rounded-lg border border-border/30 hover:border-accent/40 transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-sm text-foreground">{ind.name}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Map Embed + Nearby Cities */}
      <section className="py-16 md:py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Map */}
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-border/30 bg-muted">
                {mapEmbedUrl ? (
                  <iframe
                    src={mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`EverIntent serving ${locationName}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              {/* Nearby cities */}
              <div>
                <h3 className="text-xl font-bold mb-4">Also serving</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  {nearbyCities.join(' · ')}
                </p>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-accent" />
                    <span>Mon–Fri 8AM–6PM PST (AI available 24/7)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-accent" />
                    <a href="tel:+15626859500" className="hover:text-accent transition-colors">(562) 685-9500</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <span>2892 N Bellflower Blvd, PMB 1018, Long Beach, CA 90815</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-background">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/5 rounded-full blur-3xl" />
        <div className="relative container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Ready to grow your {locationName} business?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
              Professional websites from $249. AI automation from $149/month. Built for {locationName} businesses.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <a href="/checkout/launch" className="btn-gold btn-glow w-full sm:w-auto">
                Get Started: $249
              </a>
              <a
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-foreground hover:text-accent transition-all duration-300 w-full sm:w-auto"
              >
                <span className="story-link">Book a Free Call</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
            <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span>✓ No contracts</span>
              <span>✓ 5-day delivery</span>
              <span>✓ You own everything</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
