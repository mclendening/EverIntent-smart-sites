import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock, ShieldCheck, CheckCircle, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const passwordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type PageState = 'loading' | 'has-session' | 'no-session' | 'success' | 'request-sent';

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageState, setPageState] = useState<PageState>('loading');
  const initialized = useRef(false);

  useEffect(() => {
    // Prevent double initialization in React strict mode
    if (initialized.current) return;
    initialized.current = true;

    let isMounted = true;
    let subscription: { unsubscribe: () => void } | null = null;

    const initialize = async () => {
      console.log('[ResetPassword] Initializing...');
      console.log('[ResetPassword] URL hash:', window.location.hash);
      console.log('[ResetPassword] Full URL:', window.location.href);

      // Check if we have recovery tokens in the URL
      const hash = window.location.hash;
      const hasTokens = hash.includes('access_token') || 
                        hash.includes('refresh_token') || 
                        hash.includes('type=recovery');

      console.log('[ResetPassword] Has tokens in URL:', hasTokens);

      // Set up auth listener FIRST
      const { data: authData } = supabase.auth.onAuthStateChange((event, session) => {
        console.log('[ResetPassword] Auth event:', event, 'Session:', !!session);
        
        if (!isMounted) return;
        
        if ((event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN') && session) {
          console.log('[ResetPassword] Got session from auth event, showing password form');
          setPageState('has-session');
        }
      });
      subscription = authData.subscription;

      // If we have tokens in URL, Supabase will process them when we call getSession
      // The hash fragment is processed by the Supabase client automatically
      try {
        // This call triggers Supabase to process the URL hash and exchange tokens
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        console.log('[ResetPassword] getSession result:', { 
          hasSession: !!session, 
          error: sessionError?.message,
          userId: session?.user?.id 
        });

        if (sessionError) {
          console.error('[ResetPassword] Session error:', sessionError);
        }

        if (session && isMounted) {
          console.log('[ResetPassword] Session found, showing password form');
          setPageState('has-session');
          return;
        }

        // If we had tokens but no session, wait a bit and try again
        // Supabase might still be processing
        if (hasTokens && !session) {
          console.log('[ResetPassword] Tokens in URL but no session, waiting...');
          
          // Wait and retry
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          const { data: { session: retrySession } } = await supabase.auth.getSession();
          console.log('[ResetPassword] Retry session:', !!retrySession);
          
          if (retrySession && isMounted) {
            setPageState('has-session');
            return;
          }
          
          // One more try
          await new Promise(resolve => setTimeout(resolve, 1500));
          const { data: { session: finalSession } } = await supabase.auth.getSession();
          console.log('[ResetPassword] Final session check:', !!finalSession);
          
          if (finalSession && isMounted) {
            setPageState('has-session');
            return;
          }
        }

        // No session found
        if (isMounted) {
          console.log('[ResetPassword] No session, showing email form');
          setPageState('no-session');
        }

      } catch (err) {
        console.error('[ResetPassword] Error:', err);
        if (isMounted) {
          setPageState('no-session');
        }
      }
    };

    initialize();

    return () => {
      isMounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const result = passwordSchema.safeParse({ password, confirmPassword });
    if (!result.success) {
      setError(result.error.errors[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setPageState('success');
      setTimeout(() => navigate('/admin', { replace: true }), 2000);
    } catch (err) {
      console.error('Update error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      const { error: resetError } = await supabase.functions.invoke('send-password-reset', {
        body: { email: email.toLowerCase() }
      });

      if (resetError) {
        setError(resetError.message || 'Failed to send reset link');
        return;
      }

      setPageState('request-sent');
    } catch (err) {
      console.error('Reset request error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (pageState === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying your session...</p>
        </div>
      </div>
    );
  }

  // Success state
  if (pageState === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Password Updated!</CardTitle>
            <CardDescription>Redirecting to admin...</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Request sent state
  if (pageState === 'request-sent') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a password reset link to your email. Click the link to reset your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              className="w-full" 
              variant="outline"
              onClick={() => navigate('/admin/login', { replace: true })}
            >
              Back to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // No session - show request form
  if (pageState === 'no-session') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-2xl">Reset Your Password</CardTitle>
            <CardDescription>
              Enter your email to receive a password reset link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleRequestReset} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
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
                    Sending...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
              <Button 
                type="button"
                variant="ghost" 
                className="w-full"
                onClick={() => navigate('/admin/login', { replace: true })}
              >
                Back to Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Has session - show password form
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Set New Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                  autoComplete="new-password"
                  autoFocus
                />
              </div>
              <p className="text-xs text-muted-foreground">Must be at least 8 characters</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                  autoComplete="new-password"
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Password'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
