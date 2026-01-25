/**
 * @fileoverview Smart Websites product page showcasing the $249 entry-level website offering.
 * @module pages/SmartWebsites
 */

import { ArrowRight, Clock, Smartphone, Shield, Search, CheckCircle, Zap, Globe, Lock, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';

/**
 * Smart Websites page component - Entry-level $249 website product.
 * 
 * Positions Smart Websites as an affordable, fast-turnaround website solution
 * for local businesses. Emphasizes 5-day delivery, ownership, and AI-ready upgrade path.
 * 
 * @component
 * @example
 * <SmartWebsites />
 */
const SmartWebsites = () => {
  /**
   * Pain points that resonate with local business owners frustrated
   * with website options (DIY, agencies, no site at all).
   */
  const problemPoints = [
    {
      icon: Clock,
      title: "DIY Builders Take Forever",
      description: "You've tried Wix, Squarespace, WordPress. Hours later, it still looks amateur."
    },
    {
      icon: Zap,
      title: "Agencies Quote $5,000+",
      description: "And they take months. You need customers now, not a 6-month project."
    },
    {
      icon: Smartphone,
      title: "Your Site Doesn't Work on Phones",
      description: "70% of your customers search on mobile. If your site isn't mobile-first, you're invisible."
    },
    {
      icon: Globe,
      title: "Competitors Are Getting Your Leads",
      description: "Every day without a professional site is another day customers choose someone else."
    }
  ];

  /**
   * Core benefits of Smart Websites that differentiate from DIY and agencies.
   */
  const solutionFeatures = [
    {
      icon: CheckCircle,
      title: "5-Page Professional Site",
      description: "Home, Services, About, Contact, plus one more. Everything you need to look legit."
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Built for phones first because that's how customers find you."
    },
    {
      icon: Clock,
      title: "Built in 5 Days",
      description: "Not 5 weeks. Not 5 months. Your site is live and working in 5 business days."
    },
    {
      icon: Lock,
      title: "You Own Everything",
      description: "Your domain, your content, your site. No lock-in. No hostage situations."
    },
    {
      icon: Search,
      title: "SEO-Ready",
      description: "Google can find you from day one. Proper structure, meta tags, and schema markup."
    }
  ];

  /**
   * Everything included in the $249 Smart Websites package.
   */
  const whatsIncluded = [
    "Custom 5-page website",
    "Mobile-responsive design",
    "Contact form with email notifications",
    "Google Maps integration",
    "Basic SEO setup (meta tags, schema)",
    "SSL certificate (HTTPS)",
    "1 year hosting included",
    "GA4 analytics dashboard",
    "Social media links",
    "Business hours display"
  ];

  return (
    <>
      <SEO 
        title="Smart Websites | Professional Websites Starting at $249"
        description="Get a professional 5-page website built in 5 days for just $249. Mobile-first design, SEO-ready, you own everything. No lock-in contracts."
        canonical="/smart-websites"
      />

      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1.5">
              Starting at $249 • Built in 5 Days
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Smart Websites That Pay For Themselves
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Built in 5 days. Starting at $249. Ready for AI when you are.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link to="/pricing">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link to="/contact">
                  Questions? Let's Talk
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Sound Familiar?
            </h2>
            <p className="text-lg text-muted-foreground">
              You know you need a website. But the options are overwhelming.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {problemPoints.map((problem, index) => (
              <Card key={index} className="border-destructive/20 bg-destructive/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-destructive/10">
                      <problem.icon className="h-5 w-5 text-destructive" />
                    </div>
                    <CardTitle className="text-lg">{problem.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{problem.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <Badge variant="default" className="mb-4">
              The Smart Websites Difference
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              A Professional Website Without the Headaches
            </h2>
            <p className="text-lg text-muted-foreground">
              We build it. You own it. Done in 5 days.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {solutionFeatures.map((feature, index) => (
              <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Everything Included
              </h2>
              <p className="text-lg text-muted-foreground">
                No hidden fees. No surprise charges. Just a complete website.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {whatsIncluded.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Card Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <Card className="border-2 border-primary shadow-xl">
              <CardHeader className="text-center pb-4 pt-8">
                <Badge variant="default" className="mb-4 mx-auto">
                  Most Popular
                </Badge>
                <CardTitle className="text-2xl md:text-3xl">Smart Website</CardTitle>
                <p className="text-muted-foreground mt-2">
                  Everything you need to look professional online
                </p>
              </CardHeader>
              <CardContent className="text-center pb-8">
                <div className="mb-6">
                  <span className="text-5xl md:text-6xl font-bold text-foreground">$249</span>
                  <span className="text-muted-foreground ml-2">one-time</span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-6">
                  Renews at $149/year for hosting. Cancel anytime.
                </p>

                <Button asChild size="lg" className="w-full text-lg py-6 mb-4">
                  <Link to="/pricing">
                    Get Your Website
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                <p className="text-sm text-muted-foreground">
                  No contracts • 30-day money-back guarantee
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Upgrade Teaser */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Ready When You Are
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Add AI When Your Business Grows
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your Smart Website is built AI-ready. When you're ready to stop missing calls 
              and automate bookings, adding an AI Employee is seamless.
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/let-ai-handle-it">
                Learn About AI Employee
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Stop Losing Customers?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Get a professional website in 5 days. Starting at $249.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link to="/pricing">
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/contact">
                  Talk to Us First
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SmartWebsites;
