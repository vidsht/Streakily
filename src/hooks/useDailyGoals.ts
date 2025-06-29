
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface DailyGoal {
  id: string;
  text: string;
  completed: boolean;
}

export const useDailyGoals = () => {
  const { user } = useUser();
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('daily_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching goals:', error);
        toast({
          title: "Error",
          description: "Failed to load daily goals",
          variant: "destructive",
        });
        return;
      }

      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (text: string) => {
    if (!user || !text.trim()) return;

    try {
      const { data, error } = await supabase
        .from('daily_goals')
        .insert([
          {
            user_id: user.id,
            text: text.trim(),
            completed: false,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error adding goal:', error);
        toast({
          title: "Error",
          description: "Failed to add goal",
          variant: "destructive",
        });
        return;
      }

      setGoals([...goals, data]);
      toast({
        title: "Goal Added",
        description: "Your daily goal has been added successfully!",
      });
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const toggleGoal = async (id: string) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    try {
      const { error } = await supabase
        .from('daily_goals')
        .update({ completed: !goal.completed, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) {
        console.error('Error updating goal:', error);
        toast({
          title: "Error",
          description: "Failed to update goal",
          variant: "destructive",
        });
        return;
      }

      setGoals(goals.map(g => 
        g.id === id ? { ...g, completed: !g.completed } : g
      ));

      if (!goal.completed) {
        toast({
          title: "Goal Completed! 🎉",
          description: "Great job on completing your daily goal!",
        });
      }
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const deleteGoal = async (id: string) => {
    try {
      const { error } = await supabase
        .from('daily_goals')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting goal:', error);
        toast({
          title: "Error",
          description: "Failed to delete goal",
          variant: "destructive",
        });
        return;
      }

      setGoals(goals.filter(g => g.id !== id));
      toast({
        title: "Goal Deleted",
        description: "Your daily goal has been removed.",
      });
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  return {
    goals,
    loading,
    addGoal,
    toggleGoal,
    deleteGoal,
  };
};
