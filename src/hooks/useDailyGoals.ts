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
  const { user, isLoaded } = useUser();
  const [goals, setGoals] = useState<DailyGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  // Local storage key based on user ID or fallback
  const getStorageKey = () => `daily_goals_${user?.id || 'guest'}`;

  // Load goals from local storage
  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(getStorageKey());
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return [];
    }
  };

  // Save goals to local storage
  const saveToLocalStorage = (goalsToSave: DailyGoal[]) => {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(goalsToSave));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        fetchGoals();
      } else {
        // If no user, set loading to false to prevent infinite loading
        setLoading(false);
      }
    }
  }, [user, isLoaded]);  const fetchGoals = async () => {
    if (!user?.id) {
      console.log('No user or user ID available');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching goals for user:', user.id);
      const { data, error } = await supabase
        .from('daily_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });      if (error) {
        console.error('Error fetching goals:', error);
          // Check if it's an RLS/permission error
        if (error.message.includes('RLS') || error.message.includes('permission') || error.message.includes('policy')) {
          console.log('RLS/Permission error detected, falling back to localStorage');
          setUseLocalStorage(true);
          const localGoals = loadFromLocalStorage();
          setGoals(localGoals);
          setLoading(false);
          return;
        }
        
        // For other errors, fall back to localStorage
        console.log('Database error, falling back to localStorage');
        setUseLocalStorage(true);
        const localGoals = loadFromLocalStorage();
        setGoals(localGoals);
        setLoading(false);
        return;
      }      console.log('Goals fetched successfully:', data);
      setGoals(data || []);
      setUseLocalStorage(false);
    } catch (error) {
      console.error('Unexpected error fetching goals:', error);
      // Fall back to localStorage
      console.log('Falling back to localStorage due to unexpected error');
      setUseLocalStorage(true);
      const localGoals = loadFromLocalStorage();
      setGoals(localGoals);
    } finally {
      setLoading(false);
    }
  };  const addGoal = async (text: string) => {
    if (!user || !text.trim()) return;

    // If using localStorage, add goal locally
    if (useLocalStorage) {
      const newGoal: DailyGoal = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
      };
      const updatedGoals = [...goals, newGoal];
      setGoals(updatedGoals);
      saveToLocalStorage(updatedGoals);
      toast({
        title: "Goal Added",
        description: "Your daily goal has been added successfully!",
      });
      return;
    }

    try {
      console.log('Adding goal for user:', user.id);
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
        
        // Check if it's an RLS/permission error - fall back to localStorage
        if (error.message.includes('RLS') || error.message.includes('permission') || error.message.includes('policy')) {
          console.log('RLS/Permission error detected, falling back to localStorage');
          setUseLocalStorage(true);
          
          // Add to localStorage instead
          const newGoal: DailyGoal = {
            id: Date.now().toString(),
            text: text.trim(),
            completed: false,
          };
          const updatedGoals = [...goals, newGoal];
          setGoals(updatedGoals);
          saveToLocalStorage(updatedGoals);
          
          toast({
            title: "Goal Added",
            description: "Your daily goal has been added successfully! (saved locally)",
          });
          return;
        }
        
        toast({
          title: "Error",
          description: "Failed to add goal",
          variant: "destructive",
        });
        return;
      }

      console.log('Goal added successfully:', data);
      setGoals([...goals, data]);
      toast({
        title: "Goal Added",
        description: "Your daily goal has been added successfully!",
      });
    } catch (error) {
      console.error('Error adding goal:', error);
      // Fall back to localStorage
      console.log('Falling back to localStorage for adding goal');
      setUseLocalStorage(true);
      
      const newGoal: DailyGoal = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false,
      };
      const updatedGoals = [...goals, newGoal];
      setGoals(updatedGoals);
      saveToLocalStorage(updatedGoals);
      
      toast({
        title: "Goal Added",
        description: "Your daily goal has been added successfully! (saved locally)",
      });
    }
  };
  const toggleGoal = async (id: string) => {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    // If using localStorage, update locally
    if (useLocalStorage) {
      const updatedGoals = goals.map(g => 
        g.id === id ? { ...g, completed: !g.completed } : g
      );
      setGoals(updatedGoals);
      saveToLocalStorage(updatedGoals);

      if (!goal.completed) {
        toast({
          title: "Goal Completed! 🎉",
          description: "Great job on completing your daily goal!",
        });
      }
      return;
    }

    try {
      console.log('Toggling goal:', id);
      const { error } = await supabase
        .from('daily_goals')
        .update({ completed: !goal.completed, updated_at: new Date().toISOString() })
        .eq('id', id);      if (error) {
        console.error('Error updating goal:', error);
        
        // Check if it's an RLS/permission error - fall back to localStorage
        if (error.message.includes('RLS') || error.message.includes('permission') || error.message.includes('policy')) {
          console.log('RLS/Permission error detected, falling back to localStorage');
          setUseLocalStorage(true);
          
          // Update in localStorage instead
          const updatedGoals = goals.map(g => 
            g.id === id ? { ...g, completed: !g.completed } : g
          );
          setGoals(updatedGoals);
          saveToLocalStorage(updatedGoals);

          if (!goal.completed) {
            toast({
              title: "Goal Completed! 🎉",
              description: "Great job on completing your daily goal!",
            });
          }
          return;
        }
        
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
      }    } catch (error) {
      console.error('Error updating goal:', error);
      // Fall back to localStorage
      console.log('Falling back to localStorage for updating goal');
      setUseLocalStorage(true);
      
      const updatedGoals = goals.map(g => 
        g.id === id ? { ...g, completed: !g.completed } : g
      );
      setGoals(updatedGoals);
      saveToLocalStorage(updatedGoals);

      if (!goal.completed) {
        toast({
          title: "Goal Completed! 🎉",
          description: "Great job on completing your daily goal!",
        });
      }
    }
  };
  const deleteGoal = async (id: string) => {
    // If using localStorage, delete locally
    if (useLocalStorage) {
      const updatedGoals = goals.filter(g => g.id !== id);
      setGoals(updatedGoals);
      saveToLocalStorage(updatedGoals);
      toast({
        title: "Goal Deleted",
        description: "Your daily goal has been removed.",
      });
      return;
    }

    try {
      console.log('Deleting goal:', id);
      const { error } = await supabase
        .from('daily_goals')
        .delete()
        .eq('id', id);      if (error) {
        console.error('Error deleting goal:', error);
        
        // Check if it's an RLS/permission error - fall back to localStorage
        if (error.message.includes('RLS') || error.message.includes('permission') || error.message.includes('policy')) {
          console.log('RLS/Permission error detected, falling back to localStorage');
          setUseLocalStorage(true);
          
          // Delete from localStorage instead
          const updatedGoals = goals.filter(g => g.id !== id);
          setGoals(updatedGoals);
          saveToLocalStorage(updatedGoals);
          
          toast({
            title: "Goal Deleted",
            description: "Your daily goal has been removed.",
          });
          return;
        }
        
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
      });    } catch (error) {
      console.error('Error deleting goal:', error);
      // Fall back to localStorage
      console.log('Falling back to localStorage for deleting goal');
      setUseLocalStorage(true);
      
      const updatedGoals = goals.filter(g => g.id !== id);
      setGoals(updatedGoals);
      saveToLocalStorage(updatedGoals);
      
      toast({
        title: "Goal Deleted",
        description: "Your daily goal has been removed.",
      });
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
