-- Migration to add streaks and achievements tables for multi-user deployment
-- Migration already applied on 2025-07-02, keep for history.

-- Create streaks table
CREATE TABLE public.streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL, -- Using TEXT to match Clerk user IDs
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('Health', 'Learning', 'Productivity', 'Mindfulness', 'Creative', 'Personal')),
  frequency TEXT NOT NULL CHECK (frequency IN ('daily', 'weekly')),
  goal_duration INTEGER NOT NULL,
  color TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completions JSONB NOT NULL DEFAULT '[]', -- Array of ISO date strings
  reminder_time TEXT,
  timer_duration INTEGER -- in minutes
);

-- Create achievements table
CREATE TABLE public.achievements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL, -- Using TEXT to match Clerk user IDs
  streak_id UUID REFERENCES public.streaks(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('goal_completion', 'milestone', 'consistency')),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  badge TEXT NOT NULL, -- emoji or icon identifier
  unlocked_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  goal_days INTEGER NOT NULL,
  category TEXT NOT NULL,
  shareable BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_streaks_user_id ON public.streaks(user_id);
CREATE INDEX idx_streaks_created_at ON public.streaks(created_at);
CREATE INDEX idx_achievements_user_id ON public.achievements(user_id);
CREATE INDEX idx_achievements_streak_id ON public.achievements(streak_id);
CREATE INDEX idx_achievements_unlocked_at ON public.achievements(unlocked_at);

-- Add RLS policies (currently disabled but ready for production)
-- ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;

-- Policies for when RLS is enabled:
-- CREATE POLICY "Users can view their own streaks" ON public.streaks FOR SELECT USING (user_id = current_setting('app.current_user_id', true));
-- CREATE POLICY "Users can create their own streaks" ON public.streaks FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true));
-- CREATE POLICY "Users can update their own streaks" ON public.streaks FOR UPDATE USING (user_id = current_setting('app.current_user_id', true));
-- CREATE POLICY "Users can delete their own streaks" ON public.streaks FOR DELETE USING (user_id = current_setting('app.current_user_id', true));

-- CREATE POLICY "Users can view their own achievements" ON public.achievements FOR SELECT USING (user_id = current_setting('app.current_user_id', true));
-- CREATE POLICY "Users can create their own achievements" ON public.achievements FOR INSERT WITH CHECK (user_id = current_setting('app.current_user_id', true));
-- CREATE POLICY "Users can update their own achievements" ON public.achievements FOR UPDATE USING (user_id = current_setting('app.current_user_id', true));
-- CREATE POLICY "Users can delete their own achievements" ON public.achievements FOR DELETE USING (user_id = current_setting('app.current_user_id', true));

-- Add comments explaining the tables
COMMENT ON TABLE public.streaks IS 'User habit streaks with completion tracking';
COMMENT ON TABLE public.achievements IS 'User achievements earned from streak milestones';
COMMENT ON COLUMN public.streaks.user_id IS 'Clerk user ID as TEXT to match authentication system';
COMMENT ON COLUMN public.achievements.user_id IS 'Clerk user ID as TEXT to match authentication system';
COMMENT ON COLUMN public.streaks.completions IS 'JSONB array of ISO date strings representing completion dates';
