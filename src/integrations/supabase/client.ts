/**
 * @fileoverview Supabase Client Configuration
 * @description SSG-safe Supabase client initialization with browser detection.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = 'https://nweklcxzoemcnwaoakvq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZWtsY3h6b2VtY253YW9ha3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NjkxNzMsImV4cCI6MjA4MTI0NTE3M30.drDwzaSoht-PWySZWdsAozqSiJfVfQrjUj0spEbq7mc';

const isBrowser = typeof window !== 'undefined';

// Create client with browser-aware settings
// detectSessionInUrl MUST be true in browser to process recovery tokens
export const supabase: SupabaseClient<Database> = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_ANON_KEY, 
  {
    auth: {
      storage: isBrowser ? localStorage : undefined,
      persistSession: isBrowser,
      autoRefreshToken: isBrowser,
      detectSessionInUrl: true, // Always true - SSR doesn't have URL hash anyway
      flowType: 'pkce',
    }
  }
);

/**
 * Manually process recovery tokens from URL hash.
 * Call this on pages that handle password recovery.
 */
export async function processRecoveryTokens(): Promise<boolean> {
  if (!isBrowser) return false;
  
  const hash = window.location.hash;
  if (!hash) return false;
  
  const params = new URLSearchParams(hash.substring(1));
  const accessToken = params.get('access_token');
  const refreshToken = params.get('refresh_token');
  const type = params.get('type');
  
  if (type === 'recovery' && accessToken && refreshToken) {
    try {
      const { data, error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });
      
      if (!error && data.session) {
        // Clear hash from URL
        window.history.replaceState(null, '', window.location.pathname);
        return true;
      }
    } catch (e) {
      console.error('Failed to set session from recovery tokens:', e);
    }
  }
  
  return false;
}
