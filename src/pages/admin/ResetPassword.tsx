import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock, ShieldCheck, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const passwordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [hasValidSession, setHasValidSession] = useState(false);
  const hasChecked = useRef(false);

  useEffect(() => {
    // Prevent double execution in React Strict Mode
    if (hasChecked.current) return;
    hasChecked.current = true;

    let isMounted = true;
    let subscription: { unsubscribe: () => void } | null = null;

    const checkSession = async () => {
      console.log('[ResetPassword] Starting session check...');
      console.log('[ResetPassword] Current URL hash:', window.location.hash);
      
      // Check if URL has recovery tokens
      const hash = window.location.hash;
      const hasRecoveryToken = hash.includes('type=recovery') || 
                               hash.includes('access_token') ||
                               hash.includes('token_hash');
      
      console.log('[ResetPassword] Has recovery token in URL:', hasRecoveryToken);

      // Set up auth state listener FIRST
      const authSubscription = supabase.auth.onAuthStateChange((event, session) => {
        console.log('[ResetPassword] Auth event:', event, 'Session:', !!session);
        
        if (!isMounted) return;
        
        if (event === 'PASSWORD_RECOVERY' || event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          if (session) {
            console.log('[ResetPassword] Valid session from auth event');
            setHasValidSession(true);
            setIsCheckingSession(false);
          }
        }
      });
      subscription = authSubscription.data.subscription;

      // Now call getSession - this triggers Supabase to process the URL hash
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        console.log('[ResetPassword] getSession result - Session:', !!session, 'Error:', sessionError?.message);
        
        if (sessionError) {
          console.error('[ResetPassword] Session error:', sessionError);
        }

        if (session && isMounted) {
          console.log('[ResetPassword] Found valid session');
          setHasValidSession(true);
          setIsCheckingSession(false);
          return;
        }

        // If we have tokens in URL but no session yet, the token might be in a different format
        // Supabase PKCE flow uses token_hash in URL params, not hash fragment
        if (hasRecoveryToken && !session) {
          console.log('[ResetPassword] Token in URL but no session - waiting for auth event...');
          
          // Give Supabase more time to process
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Check again
          const { data: { session: retrySession } } = await supabase.auth.getSession();
          console.log('[ResetPassword] Retry session check:', !!retrySession);
          
          if (retrySession && isMounted) {
            setHasValidSession(true);
            setIsCheckingSession(false);
            return;
          }
        }

        // Final timeout - give up after 5 seconds total
        setTimeout(() => {
          if (isMounted) {
            console.log('[ResetPassword] Timeout reached, no valid session found');
            setIsCheckingSession(false);
          }
        }, 3000);

      } catch (err) {
        console.error('[ResetPassword] Error during session check:', err);
        if (isMounted) {
          setIsCheckingSession(false);
        }
      }
    };

    checkSession();

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
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setSuccess(true);
      
      setTimeout(() => {
        navigate('/admin', { replace: true });
      }, 2000);
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verifying your session...</p>
        </div>
      </div>
    );
  }

  if (!hasValidSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <ShieldCheck className="h-6 w-6 text-destructive" />
            </div>
            <CardTitle className="text-2xl">Invalid or Expired Link</CardTitle>
            <CardDescription>
              This password reset link is invalid or has expired. Please request a new one.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full" 
              onClick={() => navigate('/admin/login', { replace: true })}
            >
              Back to Login
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Debug: Check browser console for session logs
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <CardTitle className="text-2xl">Password Updated!</CardTitle>
            <CardDescription>
              Your password has been successfully updated. Redirecting to admin...
            </CardDescription>
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below
          </CardDescription>
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
              <p className="text-xs text-muted-foreground">
                Must be at least 8 characters
              </p>
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
