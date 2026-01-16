/**
 * @fileoverview Supabase Client Configuration
 * @description SSG-safe Supabase client initialization with browser detection.
 *              Supports both Lovable preview (VITE_ env vars) and production (build-time injection).
 * 
 * @module integrations/supabase/client
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 13 - Supabase Integration
 * @brd-reference BRD v33.0 Section 17.2 - SSG Hydration Safety
 * 
 * @example
 * import { supabase } from "@/integrations/supabase/client";
 * 
 * const { data, error } = await supabase
 *   .from('table')
 *   .select('*');
 */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

/**
 * Build-time injected values (production via Vercel platform env)
 * These are replaced at build time via vite.config.ts define.
 */
declare const __SUPABASE_URL__: string;
declare const __SUPABASE_ANON_KEY__: string;

/**
 * Supabase project URL
 * Priority: Build-time injection (production) -> VITE_ env var (Lovable preview) -> hardcoded fallback
 * @constant {string}
 */
const SUPABASE_URL = 
  (typeof __SUPABASE_URL__ !== 'undefined' && __SUPABASE_URL__) || 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://nweklcxzoemcnwaoakvq.supabase.co';

/**
 * Supabase anon/public key
 * Priority: Build-time injection (production) -> VITE_ env var (Lovable preview) -> hardcoded fallback
 * @constant {string}
 */
const SUPABASE_PUBLISHABLE_KEY = 
  (typeof __SUPABASE_ANON_KEY__ !== 'undefined' && __SUPABASE_ANON_KEY__) || 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53ZWtsY3h6b2VtY253YW9ha3ZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NjkxNzMsImV4cCI6MjA4MTI0NTE3M30.drDwzaSoht-PWySZWdsAozqSiJfVfQrjUj0spEbq7mc';

/**
 * SSR-safe browser detection
 * localStorage doesn't exist during SSR, so we check for window
 * @constant {boolean}
 */
const isBrowser = typeof window !== 'undefined';

/**
 * Supabase client instance
 * 
 * Configured with SSG-safe auth settings:
 * - storage: localStorage only in browser (undefined during SSR)
 * - persistSession: only in browser
 * - autoRefreshToken: only in browser
 * - detectSessionInUrl: only in browser
 * 
 * @constant {SupabaseClient<Database>}
 */
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: isBrowser ? localStorage : undefined,
    persistSession: isBrowser,
    autoRefreshToken: isBrowser,
    detectSessionInUrl: isBrowser,
  }
});
