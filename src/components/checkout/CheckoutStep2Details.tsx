/**
 * @fileoverview Checkout Step 2 - Contact Details Form
 * @description Contact info, domain question, and TCPA consent per v5.2 spec Section 4.2
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import type { CheckoutState } from '@/pages/checkout/CheckoutPage';

interface CheckoutStep2DetailsProps {
  state: CheckoutState;
  updateField: <K extends keyof CheckoutState>(field: K, value: CheckoutState[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

const MAX_MESSAGE_LENGTH = 500;

export function CheckoutStep2Details({
  state,
  updateField,
  onNext,
  onBack,
}: CheckoutStep2DetailsProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateEmail = (email: string) => {
    return /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/i.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9()+\s-]{7,15}$/.test(phone);
  };

  const validateDomain = (domain: string) => {
    if (!domain) return true;
    return /^(?=.*\.)[^\s]+\.[a-zA-Z]{2,}$/i.test(domain);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};

    if (!state.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!state.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!state.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(state.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!state.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(state.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!state.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    if (state.hasDomain && !validateDomain(state.domainName)) {
      newErrors.domainName = 'Please enter a valid domain (e.g., example.com)';
    }
    if (!state.tcpaConsent) {
      newErrors.tcpaConsent = 'You must agree to receive communications';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onNext();
    } else {
      const firstErrorField = Object.keys(newErrors)[0];
      document.getElementById(firstErrorField)?.focus();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate aria-label="Contact details form">
      {/* Step Header */}
      <div>
        <h1 className="text-2xl font-bold">Your Details</h1>
        <p className="text-muted-foreground mt-1">
          Tell us about yourself and your business
        </p>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={state.firstName}
                onChange={(e) => updateField('firstName', e.target.value)}
                placeholder="Jane"
                className={errors.firstName ? 'border-destructive' : ''}
                aria-required="true"
                aria-invalid={!!errors.firstName}
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                autoComplete="given-name"
              />
              {errors.firstName && (
                <p id="firstName-error" className="text-sm text-destructive" role="alert">{errors.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={state.lastName}
                onChange={(e) => updateField('lastName', e.target.value)}
                placeholder="Doe"
                className={errors.lastName ? 'border-destructive' : ''}
                aria-required="true"
                aria-invalid={!!errors.lastName}
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                autoComplete="family-name"
              />
              {errors.lastName && (
                <p id="lastName-error" className="text-sm text-destructive" role="alert">{errors.lastName}</p>
              )}
            </div>
          </div>

          {/* Contact Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={state.email}
                onChange={(e) => updateField('email', e.target.value)}
                placeholder="jane@example.com"
                className={errors.email ? 'border-destructive' : ''}
                aria-required="true"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                autoComplete="email"
              />
              {errors.email && (
                <p id="email-error" className="text-sm text-destructive" role="alert">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                type="tel"
                value={state.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="(555) 123-4567"
                className={errors.phone ? 'border-destructive' : ''}
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                autoComplete="tel"
              />
              {errors.phone && (
                <p id="phone-error" className="text-sm text-destructive" role="alert">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* Business Name */}
          <div className="space-y-2">
            <Label htmlFor="businessName">Business Name *</Label>
            <Input
              id="businessName"
              value={state.businessName}
              onChange={(e) => updateField('businessName', e.target.value)}
              placeholder="Acme Services LLC"
              className={errors.businessName ? 'border-destructive' : ''}
              aria-required="true"
              aria-invalid={!!errors.businessName}
              aria-describedby={errors.businessName ? 'businessName-error' : undefined}
              autoComplete="organization"
            />
            {errors.businessName && (
              <p id="businessName-error" className="text-sm text-destructive" role="alert">{errors.businessName}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Domain Question */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Domain</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup
            value={state.hasDomain ? 'yes' : 'no'}
            onValueChange={(value) => {
              updateField('hasDomain', value === 'yes');
              if (value === 'no') {
                updateField('domainName', '');
              }
            }}
            aria-label="Do you have a domain?"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="domain-yes" />
              <Label htmlFor="domain-yes">Yes, I have a domain</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="domain-no" />
              <Label htmlFor="domain-no">No, I need help getting one</Label>
            </div>
          </RadioGroup>

          {state.hasDomain && (
            <div className="space-y-2 pt-2">
              <Label htmlFor="domainName">Your Domain</Label>
              <Input
                id="domainName"
                value={state.domainName}
                onChange={(e) => updateField('domainName', e.target.value)}
                placeholder="example.com"
                className={errors.domainName ? 'border-destructive' : ''}
                aria-invalid={!!errors.domainName}
                aria-describedby={errors.domainName ? 'domainName-error' : undefined}
              />
              {errors.domainName && (
                <p id="domainName-error" className="text-sm text-destructive" role="alert">{errors.domainName}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Optional Message */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Additional Notes (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Textarea
              id="message"
              value={state.message}
              onChange={(e) => {
                if (e.target.value.length <= MAX_MESSAGE_LENGTH) {
                  updateField('message', e.target.value);
                }
              }}
              placeholder="Tell us anything else we should know..."
              rows={4}
              aria-label="Additional notes"
              aria-describedby="message-counter"
              maxLength={MAX_MESSAGE_LENGTH}
            />
            <p id="message-counter" className="text-xs text-muted-foreground text-right" aria-live="polite">
              {state.message.length}/{MAX_MESSAGE_LENGTH} characters
            </p>
          </div>
        </CardContent>
      </Card>

      {/* TCPA Consent */}
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="tcpaConsent"
            checked={state.tcpaConsent}
            onCheckedChange={(checked) => updateField('tcpaConsent', checked === true)}
            aria-required="true"
            aria-invalid={!!errors.tcpaConsent}
            aria-describedby={errors.tcpaConsent ? 'tcpaConsent-error' : undefined}
          />
          <Label htmlFor="tcpaConsent" className="text-sm leading-relaxed cursor-pointer">
            I agree to receive SMS, email, and phone communications from EverIntent 
            regarding my order and account. Message & data rates may apply. 
            Reply STOP to opt out.{' '}
            <a href="/legal/privacy" target="_blank" className="text-primary underline">
              Privacy Policy
            </a>
          </Label>
        </div>
        {errors.tcpaConsent && (
          <p id="tcpaConsent-error" className="text-sm text-destructive ml-7" role="alert">{errors.tcpaConsent}</p>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" size="lg">
          Review Your Order
        </Button>
      </div>
    </form>
  );
}
