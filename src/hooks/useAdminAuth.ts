/**
 * @fileoverview useAdminAuth Hook - Admin Authentication State Management
 * @description Manages admin authentication state, role verification, and auth actions.
 *              Uses Supabase Auth with custom has_role() RPC for admin verification.
 * 
 * @module hooks/useAdminAuth
 * @see {@link https://docs.lovable.dev} Lovable Documentation
 * 
 * @brd-reference BRD v33.0 Section 20 - Admin Authentication
 * @brd-reference BRD v33.0 Section 20.1 - Role-Based Access Control
 */

import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

/**
 * Admin authentication state interface
 * @interface AdminAuthState
 */
interface AdminAuthState {
  /** Current authenticated user (null if not logged in) */
  user: User | null;
  /** Current auth session */
  session: Session | null;
  /** Whether user has admin role (verified via has_role RPC) */
  isAdmin: boolean;
  /** Whether auth state is still being determined */
  isLoading: boolean;
}

/**
 * useAdminAuth - Admin authentication hook
 * 
 * Features per BRD v33.0 Section 20:
 * - Supabase Auth state management
 * - Admin role verification via has_role() RPC
 * - Sign out functionality
 * - OTP verification for passwordless admin login
 * 
 * Auth flow:
 * 1. Check existing session on mount
 * 2. Listen for auth state changes
 * 3. Verify admin role via Supabase RPC
 * 4. Update state with isAdmin boolean
 * 
 * @hook
 * @example
 * const { user, isAdmin, isLoading, signOut, verifyOtp } = useAdminAuth();
 * 
 * if (isLoading) return <Spinner />;
 * if (!isAdmin) return <Navigate to="/admin/login" />;
 * 
 * return <AdminDashboard />;
 * 
 * @returns {AdminAuthState & { signOut: () => Promise<void>, verifyOtp: (email: string, token: string) => Promise<{data, error}> }}
 */
export function useAdminAuth() {
  const [state, setState] = useState<AdminAuthState>({
    user: null,
    session: null,
    isAdmin: false,
    isLoading: true,
  });

  /**
   * Check if user has admin role via Supabase RPC
   * Uses has_role() function defined in database
   * 
   * @param {string} userId - User UUID to check
   * @returns {Promise<boolean>} True if user has admin role
   */
  const checkAdminRole = useCallback(async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin',
      });
      
      if (error) {
        console.error('Error checking admin role:', error);
        return false;
      }
      
      return data === true;
    } catch (error) {
      console.error('Error in checkAdminRole:', error);
      return false;
    }
  }, []);

  /**
   * Set up auth state listener and check existing session
   */
  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setState(prev => ({
          ...prev,
          session,
          user: session?.user ?? null,
        }));

        // Defer admin role check to avoid deadlock
        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(session.user.id).then(isAdmin => {
              setState(prev => ({
                ...prev,
                isAdmin,
                isLoading: false,
              }));
            });
          }, 0);
        } else {
          setState(prev => ({
            ...prev,
            isAdmin: false,
            isLoading: false,
          }));
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setState(prev => ({
        ...prev,
        session,
        user: session?.user ?? null,
      }));

      if (session?.user) {
        checkAdminRole(session.user.id).then(isAdmin => {
          setState(prev => ({
            ...prev,
            isAdmin,
            isLoading: false,
          }));
        });
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
        }));
      }
    });

    return () => subscription.unsubscribe();
  }, [checkAdminRole]);

  /**
   * Sign out current user
   * Clears session and resets auth state
   * 
   * @returns {Promise<void>}
   */
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setState({
      user: null,
      session: null,
      isAdmin: false,
      isLoading: false,
    });
  }, []);

  /**
   * Verify OTP for passwordless admin login
   * 
   * @param {string} email - Admin email address
   * @param {string} token - OTP token from email
   * @returns {Promise<{data, error}>} Supabase auth response
   */
  const verifyOtp = useCallback(async (email: string, token: string) => {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email',
    });
    return { data, error };
  }, []);

  return {
    ...state,
    signOut,
    verifyOtp,
  };
}
