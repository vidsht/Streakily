-- Drop the existing policies
DROP POLICY IF EXISTS "Users can view their own daily goals" ON public.daily_goals;
DROP POLICY IF EXISTS "Users can create their own daily goals" ON public.daily_goals;
DROP POLICY IF EXISTS "Users can update their own daily goals" ON public.daily_goals;
DROP POLICY IF EXISTS "Users can delete their own daily goals" ON public.daily_goals;

-- Disable RLS temporarily to allow for data migration if needed
ALTER TABLE public.daily_goals DISABLE ROW LEVEL SECURITY;

-- For now, we'll disable RLS completely since we're using Clerk for authentication
-- and handling authorization in the application layer.
-- In production, you might want to implement custom RLS policies that work with Clerk user IDs
-- or switch to Supabase auth entirely.

-- Note: With RLS disabled, make sure your application properly validates user permissions
-- before performing database operations.
