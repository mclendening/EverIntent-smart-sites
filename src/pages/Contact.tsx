/**
 * @fileoverview Contact page with form submitting to submit-form edge function.
 * @module pages/Contact
 * 
 * Contact form fields:
 * - Name (required)
 * - Email (required)
 * - Phone (optional)
 * - Company (optional)
 * - Product Interest dropdown (AI Employee tiers, Smart Website tiers)
 * - Add-On Packs checkboxes (optional)
 * - Message (required)
 * - TCPA consent checkbox (required)
 * 
 * Submits to the existing submit-form edge function with form_type='contact'.
 * Tier and add-on selections are sent as separate fields for GHL tagging.
 */

import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

/**
 * Product interest options - combines AI Employee and Smart Website tiers
 */
const productOptions = [
  { value: '', label: 'Select a product...' },
  // Smart Website Tiers
  { value: 'launch', label: 'Launch – $249 one-time website', group: 'Smart Websites' },
  { value: 'capture', label: 'Capture – $97/mo lead capture', group: 'Smart Websites' },
  { value: 'convert', label: 'Convert – $197/mo booking + reviews', group: 'Smart Websites' },
  { value: 'scale', label: 'Scale – $297/mo full AI power', group: 'Smart Websites' },
  // AI Employee Plans
  { value: 'after-hours', label: 'After-Hours AI – $197/mo', group: 'AI Employee' },
  { value: 'front-office', label: 'Front Office AI – $297/mo', group: 'AI Employee' },
  { value: 'full-ai', label: 'Full AI Employee – $597/mo', group: 'AI Employee' },
  // Other
  { value: 'general', label: 'General Inquiry', group: 'Other' },
  { value: 'partnership', label: 'Partnership Opportunity', group: 'Other' },
];

/**
 * Add-on pack options with pricing
 */
const addOnPacks = [
  { id: 'email-authority', name: 'Email Authority', price: 49 },
  { id: 'get-paid-now', name: 'Get Paid Now', price: 49 },
  { id: 'ai-voice-chat', name: 'AI Voice Chat', price: 79 },
  { id: 'social-autopilot', name: 'Social Autopilot', price: 97 },
  { id: 'omnichannel-inbox', name: 'Omnichannel Inbox', price: 99 },
  { id: 'unlimited-ai', name: 'Unlimited AI', price: 149 },
];

/**
 * Contact page component with form and business info.
 */
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productInterest: '',
    selectedAddOns: [] as string[],
    message: '',
    tcpaConsent: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOnToggle = (addOnId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedAddOns: prev.selectedAddOns.includes(addOnId)
        ? prev.selectedAddOns.filter((id) => id !== addOnId)
        : [...prev.selectedAddOns, addOnId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tcpaConsent) {
      toast.error('Please agree to the terms to submit.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke('submit-form', {
        body: {
          form_type: 'contact',
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          company: formData.company || null,
          product_interest: formData.productInterest || null,
          selected_addons: formData.selectedAddOns.length > 0 ? formData.selectedAddOns : null,
          message: formData.message,
          tcpa_consent: formData.tcpaConsent,
          source_page: '/contact',
        },
      });

      if (error) throw error;

      toast.success('Message sent! We\'ll respond within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        productInterest: '',
        selectedAddOns: [],
        message: '',
        tcpaConsent: false,
      });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show add-ons section only when a product tier is selected (not general inquiries)
  const showAddOns = formData.productInterest && 
    !['general', 'partnership'].includes(formData.productInterest);

  return (
    <>
      <SEO
        title="Contact Us"
        description="Get in touch about AI Employee or Smart Websites. We respond within 24 hours. Long Beach, LA & Orange County."
        canonical="/contact"
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-20" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Let's Talk
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Questions about AI Employee or Smart Websites? We respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email side by side on desktop */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Your name"
                      className="bg-card/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="you@company.com"
                      className="bg-card/50"
                    />
                  </div>
                </div>

                {/* Phone & Company side by side */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                      className="bg-card/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                      className="bg-card/50"
                    />
                  </div>
                </div>

                {/* Product Interest */}
                <div className="space-y-2">
                  <Label htmlFor="productInterest">What are you interested in?</Label>
                  <Select
                    value={formData.productInterest}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, productInterest: value, selectedAddOns: [] }))
                    }
                  >
                    <SelectTrigger className="bg-card/50">
                      <SelectValue placeholder="Select a product or service" />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-border">
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      <div className="px-2 py-1.5 text-xs font-semibold text-accent">Smart Websites</div>
                      <SelectItem value="launch">Launch – $249 one-time website</SelectItem>
                      <SelectItem value="capture">Capture – $97/mo lead capture</SelectItem>
                      <SelectItem value="convert">Convert – $197/mo booking + reviews</SelectItem>
                      <SelectItem value="scale">Scale – $297/mo full AI power</SelectItem>
                      <div className="px-2 py-1.5 text-xs font-semibold text-accent">AI Employee</div>
                      <SelectItem value="after-hours">After-Hours AI – $197/mo</SelectItem>
                      <SelectItem value="front-office">Front Office AI – $297/mo</SelectItem>
                      <SelectItem value="full-ai">Full AI Employee – $597/mo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Add-On Packs (conditional) */}
                {showAddOns && (
                  <div className="space-y-3">
                    <Label>Add-On Packs (optional)</Label>
                    <p className="text-sm text-muted-foreground">
                      Enhance your plan with these optional add-ons
                    </p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {addOnPacks.map((pack) => (
                        <div
                          key={pack.id}
                          onClick={() => handleAddOnToggle(pack.id)}
                          className={`
                            flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors
                            ${formData.selectedAddOns.includes(pack.id)
                              ? 'border-accent bg-accent/10'
                              : 'border-border/50 bg-card/30 hover:border-border'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`
                              w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                              ${formData.selectedAddOns.includes(pack.id)
                                ? 'border-accent bg-accent'
                                : 'border-muted-foreground/30'
                              }
                            `}>
                              {formData.selectedAddOns.includes(pack.id) && (
                                <Check className="w-3 h-3 text-accent-foreground" />
                              )}
                            </div>
                            <span className="text-sm text-foreground">{pack.name}</span>
                          </div>
                          <span className="text-sm text-muted-foreground">${pack.price}/mo</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about your business and what you're looking for..."
                    rows={4}
                    className="bg-card/50"
                  />
                </div>

                {/* TCPA Consent */}
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="tcpaConsent"
                    checked={formData.tcpaConsent}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, tcpaConsent: checked === true }))
                    }
                  />
                  <Label htmlFor="tcpaConsent" className="text-sm text-muted-foreground leading-relaxed">
                    I agree to receive communications from EverIntent. I understand I can unsubscribe at any time. View our{' '}
                    <a href="/legal/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                    .
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="gold"
                  className="w-full py-6 text-base font-semibold btn-glow"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="order-1 lg:order-2">
              <div className="bg-card/50 rounded-2xl border border-border/30 p-8 space-y-8">
                <h2 className="text-xl font-semibold text-foreground mb-6">
                  Contact Information
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Email</p>
                      <a
                        href="mailto:info@everintent.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        info@everintent.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Phone</p>
                      <a
                        href="tel:+15626859500"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        (562) 685-9500
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Hours</p>
                      <p className="text-muted-foreground">
                        Mon–Fri: 9am–6pm PST
                        <br />
                        <span className="text-sm">(AI Employee answers 24/7)</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Location</p>
                      <p className="text-muted-foreground">
                        2892 N Bellflower Blvd
                        <br />
                        PMB 1018, Long Beach, CA 90815
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-border/30">
                  <p className="text-sm text-muted-foreground">
                    Need immediate help? Our AI Employee can answer common questions 24/7. Just call or use the chat widget.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
