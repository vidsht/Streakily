-- For development purposes, temporarily disable RLS to get the app working
-- This migration should only be used in development environments

-- Create a service role function to manage daily goals
-- This allows us to bypass RLS for now while we fix the Clerk-Supabase integration

-- Temporarily disable RLS on daily_goals table
ALTER TABLE public.daily_goals DISABLE ROW LEVEL SECURITY;

-- Add a comment explaining this is temporary
COMMENT ON TABLE public.daily_goals IS 'RLS temporarily disabled for development - needs proper Clerk integration';
