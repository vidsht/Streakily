import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xztmcayunzpeborushwd.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6dG1jYXl1bnpwZWJvcnVzaHdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA5NTg0NTQsImV4cCI6MjA2NjUzNDQ1NH0.ch4xIc6INWbOXp9uWAvnp5BvnTKw_GnHrwYQ6B4IhJE";

// Create the supabase client with custom configuration
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    // Disable automatic session refresh since we're using Clerk
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false
  }
});

// Helper function to set the Supabase auth token from Clerk
export const setSupabaseToken = async (token: string) => {
  supabase.auth.setSession({
    access_token: token,
    refresh_token: '',
    expires_in: 3600,
    token_type: 'bearer',
    user: null
  });
};
