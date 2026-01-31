/**
 * @fileoverview Contact page with form submitting to submit-form edge function.
 * @module pages/Contact
 * 
 * Contact form fields:
 * - Name (required)
 * - Email (required)
 * - Phone (optional)
 * - Company (optional)
 * - Inquiry type dropdown (AI Employee, Smart Website, Pricing, Partnership, Other)
 * - Message (required)
 * - TCPA consent checkbox (required)
 * 
 * Submits to the existing submit-form edge function with form_type='contact'.
 * Displays business contact info below the form.
 */

import { useState } from 'react';
import { Send, Mail, Phone, MapPin, Clock } from 'lucide-react';
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
 * Inquiry type options for the dropdown.
 */
const inquiryTypes = [
  { value: 'ai-employee', label: 'AI Employee' },
  { value: 'smart-website', label: 'Smart Website' },
  { value: 'pricing', label: 'Pricing Question' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'other', label: 'Other' },
];

/**
 * Contact page component with form and business info.
 * 
 * @component
 * @example
 * <Contact />
 */
const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    inquiryType: '',
    message: '',
    tcpaConsent: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          message: `[${formData.inquiryType || 'General'}] ${formData.message}`,
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
        inquiryType: '',
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

  return (
    <>
      <SEO
        title="Contact | EverIntent"
        description="Questions about AI Employee or Smart Websites? We respond within 24 hours. Get in touch with our team."
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
                {/* Name */}
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

                {/* Email */}
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

                {/* Phone */}
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

                {/* Company */}
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

                {/* Inquiry Type */}
                <div className="space-y-2">
                  <Label htmlFor="inquiryType">What can we help with?</Label>
                  <Select
                    value={formData.inquiryType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, inquiryType: value }))
                    }
                  >
                    <SelectTrigger className="bg-card/50">
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
                    rows={5}
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
                  className="w-full py-6 text-base font-semibold"
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
                        Mon–Fri: 9am–6pm EST
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
