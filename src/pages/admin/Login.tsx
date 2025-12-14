import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Mail, KeyRound, ShieldCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const emailSchema = z.string().email('Please enter a valid email address');
const otpSchema = z.string().length(6, 'Verification code must be 6 digits');

type Step = 'email' | 'otp';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, isLoading: authLoading, verifyOtp } = useAdminAuth();
  
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Get error from navigation state
  const stateError = location.state?.error as string | undefined;

  // Redirect if already authenticated as admin
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
    }
  }, [user, isAdmin, authLoading, navigate, location.state]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate email
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      // Call the verify-admin-email edge function
      const { data, error: fnError } = await supabase.functions.invoke('verify-admin-email', {
        body: { email: email.toLowerCase() },
      });

      if (fnError) {
        console.error('Edge function error:', fnError);
        setError('Failed to send verification code. Please try again.');
        return;
      }

      if (data?.error) {
        setError(data.error);
        return;
      }

      setSuccess('Verification code sent to your email');
      setStep('otp');
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate OTP
    const result = otpSchema.safeParse(otp);
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { error: verifyError } = await verifyOtp(email.toLowerCase(), otp);

      if (verifyError) {
        console.error('OTP verification error:', verifyError);
        setError('Invalid or expired verification code. Please try again.');
        return;
      }

      // Success - the auth state listener will handle the redirect
      setSuccess('Verification successful! Redirecting...');
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setStep('email');
    setOtp('');
    setError(null);
    setSuccess(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            {step === 'email' 
              ? 'Enter your admin email to receive a verification code'
              : 'Enter the verification code sent to your email'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(error || stateError) && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error || stateError}</AlertDescription>
            </Alert>
          )}
          
          {success && (
            <Alert className="mb-4 border-green-500 bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                    autoComplete="email"
                    autoFocus
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  'Send Verification Code'
                )}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp">Verification Code</Label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="otp"
                    type="text"
                    placeholder="000000"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="pl-10 text-center text-lg tracking-widest"
                    disabled={isLoading}
                    autoComplete="one-time-code"
                    autoFocus
                    maxLength={6}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Code sent to {email}
                </p>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify & Login'
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full"
                onClick={handleBackToEmail}
                disabled={isLoading}
              >
                Use a different email
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
