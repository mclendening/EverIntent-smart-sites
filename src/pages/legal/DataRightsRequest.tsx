/**
 * @fileoverview Data Rights Request (DSAR) page for CCPA compliance.
 * @module pages/legal/DataRightsRequest
 * @description Allows users to exercise their CCPA privacy rights.
 * Submissions are stored in form_submissions and synced to GHL with DSAR tag.
 * @brdref BRD v34.0 Section 21.1.4 (Data Rights Request)
 */

import { useState } from 'react';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, Shield, Clock, CheckCircle2 } from 'lucide-react';

/**
 * Request types available for data rights submissions.
 * Maps to CCPA rights categories.
 * @brdref BRD v34.0 Section 21.1.4
 */
const REQUEST_TYPES = [
  { value: 'know', label: 'Know what data we have about me' },
  { value: 'delete', label: 'Delete my personal data' },
  { value: 'correct', label: 'Correct inaccurate data' },
  { value: 'opt-out', label: 'Opt-out of marketing communications' },
  { value: 'other', label: 'Other request' },
] as const;

/**
 * Data Rights Request page for CCPA/DSAR submissions.
 * 
 * Allows California residents and other users to exercise their privacy rights:
 * - Right to know what personal information is collected
 * - Right to delete personal information
 * - Right to correct inaccurate information
 * - Right to opt-out of marketing
 * 
 * Form submissions are:
 * 1. Stored in form_submissions table (form_type: 'data_rights_request')
 * 2. Synced to GHL with 'DSAR: Data Rights Request' tag
 * 3. Include urgent note requiring 45-day response
 * 
 * @component
 * @example
 * <DataRightsRequest />
 */
export default function DataRightsRequest() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    requestType: '',
    details: '',
    verification: false,
  });

  /**
   * Handles form submission via edge function.
   * Validates required fields and submits to submit-form edge function
   * which handles both database storage and GHL sync.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.requestType) {
      toast({
        title: 'Missing required fields',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.verification) {
      toast({
        title: 'Verification required',
        description: 'Please acknowledge the verification statement.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Find the request type label for the message
      const requestTypeLabel = REQUEST_TYPES.find(t => t.value === formData.requestType)?.label || formData.requestType;
      
      // Submit via edge function for GHL sync
      const { data, error } = await supabase.functions.invoke('submit-form', {
        body: {
          form_type: 'data_rights_request',
          name: formData.name,
          email: formData.email,
          message: `Request Type: ${requestTypeLabel}\n\nDetails: ${formData.details || 'No additional details provided.'}`,
          tcpa_consent: false, // Not applicable for data rights
          source_page: '/legal/data-request',
        },
      });

      if (error) throw error;
      if (!data?.success) throw new Error(data?.error || 'Submission failed');

      setIsSubmitted(true);
      toast({
        title: 'Request submitted',
        description: 'We will respond within 45 days as required by law.',
      });
    } catch (error) {
      console.error('Error submitting data rights request:', error);
      toast({
        title: 'Submission failed',
        description: 'Please try again or email privacy@everintent.com directly.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Data Rights Request | EverIntent"
        description="Submit a data rights request to EverIntent. Exercise your CCPA rights to know, delete, or correct your personal data."
      />

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <section className="relative py-16 md:py-24 bg-card">
          <div className="absolute inset-0 bg-mesh opacity-30 pointer-events-none" />
          <div className="container relative">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-10 h-10 text-accent" />
              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground">
                Data Rights Request
              </h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Exercise your privacy rights under the California Consumer Privacy Act (CCPA) and other applicable laws.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl">
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Form Section */}
              <div className="lg:col-span-2">
                {isSubmitted ? (
                  // Success State
                  <div className="bg-card rounded-xl border border-border p-8 text-center">
                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-accent" />
                    </div>
                    <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                      Request Received
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Thank you for submitting your data rights request. We will verify your identity and respond within 45 days as required by CCPA.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      A confirmation email has been sent to <span className="text-foreground font-medium">{formData.email}</span>
                    </p>
                  </div>
                ) : (
                  // Form
                  <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 md:p-8 space-y-6">
                    <div className="space-y-2">
                      <h2 className="text-xl font-display font-bold text-foreground">
                        Submit Your Request
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Complete this form to exercise your privacy rights. All fields marked with * are required.
                      </p>
                    </div>

                    {/* Name Field */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your full legal name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        Use the email address associated with your account or inquiry.
                      </p>
                    </div>

                    {/* Request Type */}
                    <div className="space-y-2">
                      <Label htmlFor="requestType">Request Type *</Label>
                      <Select
                        value={formData.requestType}
                        onValueChange={(value) => setFormData({ ...formData, requestType: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select your request type" />
                        </SelectTrigger>
                        <SelectContent>
                          {REQUEST_TYPES.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Additional Details */}
                    <div className="space-y-2">
                      <Label htmlFor="details">Additional Details</Label>
                      <Textarea
                        id="details"
                        placeholder="Provide any additional information that may help us process your request..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        rows={4}
                      />
                    </div>

                    {/* Verification Checkbox */}
                    <div className="flex items-start space-x-3 bg-muted/50 rounded-lg p-4 border border-border">
                      <Checkbox
                        id="verification"
                        checked={formData.verification}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, verification: checked === true })
                        }
                        className="mt-0.5"
                      />
                      <Label htmlFor="verification" className="text-sm text-muted-foreground leading-relaxed cursor-pointer">
                        I understand that EverIntent will need to verify my identity before processing this request. I certify that the information provided is accurate and that I am authorized to make this request.
                      </Label>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-spin mr-2">◌</span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Submit Request
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Response Time */}
                <div className="bg-card rounded-xl border border-border p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <h3 className="font-semibold text-foreground">Response Time</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    We will respond to all verified requests within <span className="text-foreground font-medium">45 days</span> as required by CCPA. Complex requests may take up to 90 days with notification.
                  </p>
                </div>

                {/* Your Rights */}
                <div className="bg-card rounded-xl border border-border p-5">
                  <h3 className="font-semibold text-foreground mb-3">Your Rights</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span><strong>Right to Know:</strong> Learn what personal data we collect and how we use it</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span><strong>Right to Delete:</strong> Request deletion of your personal information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span><strong>Right to Correct:</strong> Fix inaccurate personal data</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span><strong>Right to Opt-Out:</strong> Stop receiving marketing communications</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent mt-1">•</span>
                      <span><strong>Non-Discrimination:</strong> We will not penalize you for exercising your rights</span>
                    </li>
                  </ul>
                </div>

                {/* Alternative Contact */}
                <div className="bg-muted/50 rounded-xl border border-border p-5">
                  <h3 className="font-semibold text-foreground mb-2">Prefer Email?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    You can also submit requests directly to:
                  </p>
                  <a 
                    href="mailto:privacy@everintent.com" 
                    className="text-accent hover:underline font-medium text-sm"
                  >
                    privacy@everintent.com
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
    </>
  );
}
