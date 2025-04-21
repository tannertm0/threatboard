import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';
import type { SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

/**
 * Creates a Supabase client with error handling for cookie parsing issues
 * @returns A Supabase client instance
 */
export function createSupabaseClient() {
  if (supabaseClient) return supabaseClient;

  try {
    // Use default options without any customization for simplicity
    supabaseClient = createClientComponentClient();
    return supabaseClient;
  } catch (error) {
    console.error('Error creating Supabase client:', error);
    toast('Authentication error. Please try refreshing the page.');
    return null;
  }
}

/**
 * Handles Supabase authentication errors
 * @param error The error object
 * @param fallbackMessage A fallback message to display if the error is not recognized
 */
export function handleAuthError(error: any, fallbackMessage = 'Authentication error') {
  // Log the error for debugging, handle case where error might be empty
  if (!error || (typeof error === 'object' && Object.keys(error).length === 0)) {
    console.error('Empty Supabase auth error received');
    toast(fallbackMessage);
    return;
  }
  
  console.error('Supabase auth error:', error);
  
  // Extract error message if it exists
  const errorMessage = error.message || (error.error?.message) || JSON.stringify(error);
  
  if (errorMessage.includes('Auth session missing')) {
    toast('Please sign in to continue');
    // Redirect to sign in page
    window.location.href = '/auth/signin';
    return;
  }
  
  // Check for cookie parsing errors
  if (errorMessage.includes('Failed to parse cookie string')) {
    toast('Session expired. Please sign in again.');
    // Redirect to sign in page
    window.location.href = '/auth/signin';
    return;
  }
  
  // Handle other auth errors
  toast(fallbackMessage);
}
