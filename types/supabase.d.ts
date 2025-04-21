// Type declarations for Supabase client utility functions
declare module '@/utils/supabase/client' {
  import { SupabaseClient } from '@supabase/supabase-js';
  
  /**
   * Creates a Supabase client with error handling for cookie parsing issues
   * @returns A Supabase client instance
   */
  export function createSupabaseClient(): SupabaseClient | null;
  
  /**
   * Handles Supabase authentication errors
   * @param error The error object
   * @param fallbackMessage A fallback message to display if the error is not recognized
   */
  export function handleAuthError(error: any, fallbackMessage?: string): void;
} 