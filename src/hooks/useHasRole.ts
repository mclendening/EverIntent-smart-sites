/**
 * @fileoverview useHasRole hook — checks if the current user has a specific app role.
 *
 * Queries the `user_roles` table via the `has_role()` Supabase RPC function
 * and caches the result via TanStack Query for the session lifetime.
 *
 * ## Data Contract
 * - Calls `supabase.rpc('has_role', { _user_id, _role })` which is a
 *   `SECURITY DEFINER` function that reads `public.user_roles` without
 *   triggering recursive RLS checks.
 * - Result is cached under query key `['user-role', userId, role]`.
 * - Returns `false` when user is not authenticated or on error.
 *
 * ## Usage
 * ```ts
 * const { hasRole, isLoading } = useHasRole('admin');
 * const { hasRole: isMod } = useHasRole('moderator');
 * ```
 *
 * ## Portability
 * - Depends on: `@supabase/supabase-js`, `@tanstack/react-query`,
 *   `has_role()` DB function, `user_roles` table, `app_role` enum.
 */

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAdminAuth } from './useAdminAuth';
import type { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

/**
 * Hook that checks if the current authenticated user has a specific role.
 *
 * @param role - The role to check (admin, moderator, user)
 * @returns `{ hasRole: boolean, isLoading: boolean }`
 */
export function useHasRole(role: AppRole) {
  const { user } = useAdminAuth();

  const { data: hasRole = false, isLoading } = useQuery({
    queryKey: ['user-role', user?.id, role],
    queryFn: async () => {
      if (!user?.id) return false;
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: role,
      });
      if (error) {
        console.error(`useHasRole(${role}) error:`, error);
        return false;
      }
      return data === true;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  return { hasRole, isLoading };
}
