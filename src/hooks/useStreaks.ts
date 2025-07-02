
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Streak } from '@/types/streak';

export const useStreaks = () => {
  const { user, isLoaded } = useUser();
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [loading, setLoading] = useState(true);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  // Local storage key based on user ID or fallback
  const getStorageKey = () => `streakily-streaks-${user?.id || 'guest'}`;

  // Load streaks from local storage
  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(getStorageKey());
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading streaks from localStorage:', error);
      return [];
    }
  };

  // Save streaks to local storage
  const saveToLocalStorage = (streaksToSave: Streak[]) => {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(streaksToSave));
    } catch (error) {
      console.error('Error saving streaks to localStorage:', error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        fetchStreaks();
      } else {
        setLoading(false);
      }
    }
  }, [user, isLoaded]);

  const fetchStreaks = async () => {
    if (!user?.id) {
      console.log('No user or user ID available');
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching streaks for user:', user.id);
      const { data, error } = await supabase
        .from('streaks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching streaks:', error);
        
        // Check if it's an RLS/permission error
        if (error.message.includes('RLS') || error.message.includes('permission') || error.message.includes('policy')) {
          console.log('RLS/Permission error detected, falling back to localStorage');
          setUseLocalStorage(true);
          const localStreaks = loadFromLocalStorage();
          setStreaks(localStreaks);
          setLoading(false);
          return;
        }
        
        // For other errors, fall back to localStorage
        console.log('Database error, falling back to localStorage');
        setUseLocalStorage(true);
        const localStreaks = loadFromLocalStorage();
        setStreaks(localStreaks);
        setLoading(false);
        return;
      }

      console.log('Streaks fetched successfully:', data);
      
      // Convert database format to app format
      const formattedStreaks: Streak[] = data.map(dbStreak => ({
        id: dbStreak.id,
        name: dbStreak.name,
        description: dbStreak.description || '',
        category: dbStreak.category as any,
        frequency: dbStreak.frequency as any,
        goalDuration: dbStreak.goal_duration,
        color: dbStreak.color,
        createdAt: dbStreak.created_at,
        completions: Array.isArray(dbStreak.completions) ? dbStreak.completions as string[] : [],
        reminderTime: dbStreak.reminder_time || undefined,
        timerDuration: dbStreak.timer_duration || undefined,
      }));

      setStreaks(formattedStreaks);
      setUseLocalStorage(false);
    } catch (error) {
      console.error('Unexpected error fetching streaks:', error);
      console.log('Falling back to localStorage due to unexpected error');
      setUseLocalStorage(true);
      const localStreaks = loadFromLocalStorage();
      setStreaks(localStreaks);
    } finally {
      setLoading(false);
    }
  };
  const addStreak = async (streak: Omit<Streak, 'id' | 'createdAt' | 'completions'>) => {
    if (!user) return;

    const newStreak: Streak = {
      id: Date.now().toString(),
      ...streak,
      createdAt: new Date().toISOString(),
      completions: [],
    };

    // If using localStorage, add streak locally
    if (useLocalStorage) {
      const updatedStreaks = [...streaks, newStreak];
      setStreaks(updatedStreaks);
      saveToLocalStorage(updatedStreaks);
      toast({
        title: "Streak Added",
        description: "Your new streak has been created successfully! (saved locally)",
      });
      return;
    }

    try {
      console.log('Adding streak for user:', user.id);
      const { data, error } = await supabase
        .from('streaks')
        .insert([
          {
            user_id: user.id,
            name: streak.name,
            description: streak.description,
            category: streak.category,
            frequency: streak.frequency,
            goal_duration: streak.goalDuration,
            color: streak.color,
            completions: [],
            reminder_time: streak.reminderTime,
            timer_duration: streak.timerDuration,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error adding streak:', error);
        
        // Check if it's an RLS/permission error - fall back to localStorage
        if (error.message.includes('RLS') || error.message.includes('permission') || error.message.includes('policy')) {
          console.log('RLS/Permission error detected, falling back to localStorage');
          setUseLocalStorage(true);
          
          const updatedStreaks = [...streaks, newStreak];
          setStreaks(updatedStreaks);
          saveToLocalStorage(updatedStreaks);
          
          toast({
            title: "Streak Added",
            description: "Your new streak has been created successfully! (saved locally)",
          });
          return;
        }
        
        toast({
          title: "Error",
          description: "Failed to create streak",
          variant: "destructive",
        });
        return;
      }

      console.log('Streak added successfully:', data);
      
      // Convert database format to app format
      const formattedStreak: Streak = {
        id: data.id,
        name: data.name,
        description: data.description || '',
        category: data.category as any,
        frequency: data.frequency as any,
        goalDuration: data.goal_duration,
        color: data.color,
        createdAt: data.created_at,
        completions: Array.isArray(data.completions) ? data.completions as string[] : [],
        reminderTime: data.reminder_time || undefined,
        timerDuration: data.timer_duration || undefined,
      };

      setStreaks([...streaks, formattedStreak]);
      toast({
        title: "Streak Added",
        description: "Your new streak has been created successfully!",
      });
    } catch (error) {
      console.error('Error adding streak:', error);
      console.log('Falling back to localStorage for adding streak');
      setUseLocalStorage(true);
      
      const updatedStreaks = [...streaks, newStreak];
      setStreaks(updatedStreaks);
      saveToLocalStorage(updatedStreaks);
      
      toast({
        title: "Streak Added",
        description: "Your new streak has been created successfully! (saved locally)",
      });
    }
  };
  const updateStreak = async (id: string, updates: Partial<Streak>) => {
    const streak = streaks.find(s => s.id === id);
    if (!streak) return;

    // If using localStorage, update locally
    if (useLocalStorage) {
      const updatedStreaks = streaks.map(s => 
        s.id === id ? { ...s, ...updates } : s
      );
      setStreaks(updatedStreaks);
      saveToLocalStorage(updatedStreaks);
      return;
    }

    try {
      console.log('Updating streak:', id);
      const { error } = await supabase
        .from('streaks')
        .update({
          name: updates.name,
          description: updates.description,
          category: updates.category,
          frequency: updates.frequency,
          goal_duration: updates.goalDuration,
          color: updates.color,
          completions: updates.completions,
          reminder_time: updates.reminderTime,
          timer_duration: updates.timerDuration,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id);

      if (error) {
        console.error('Error updating streak:', error);
        
        // Check if it's an RLS/permission error - fall back to localStorage
        if (error.message.includes('RLS') || error.message.includes('permission') || error.message.includes('policy')) {
          console.log('RLS/Permission error detected, falling back to localStorage');
          setUseLocalStorage(true);
          
          const updatedStreaks = streaks.map(s => 
            s.id === id ? { ...s, ...updates } : s
          );
          setStreaks(updatedStreaks);
          saveToLocalStorage(updatedStreaks);
          return;
        }
        
        toast({
          title: "Error",
          description: "Failed to update streak",
          variant: "destructive",
        });
        return;
      }

      setStreaks(streaks.map(s => 
        s.id === id ? { ...s, ...updates } : s
      ));
    } catch (error) {
      console.error('Error updating streak:', error);
      console.log('Falling back to localStorage for updating streak');
      setUseLocalStorage(true);
      
      const updatedStreaks = streaks.map(s => 
        s.id === id ? { ...s, ...updates } : s
      );
      setStreaks(updatedStreaks);
      saveToLocalStorage(updatedStreaks);
    }
  };

  const deleteStreak = async (id: string) => {
    // If using localStorage, delete locally
    if (useLocalStorage) {
      const updatedStreaks = streaks.filter(s => s.id !== id);
      setStreaks(updatedStreaks);
      saveToLocalStorage(updatedStreaks);
      toast({
        title: "Streak Deleted",
        description: "Your streak has been removed.",
      });
      return;
    }

    try {
      console.log('Deleting streak:', id);
      const { error } = await supabase
        .from('streaks')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting streak:', error);
        
        // Check if it's an RLS/permission error - fall back to localStorage
        if (error.message.includes('RLS') || error.message.includes('permission') || error.message.includes('policy')) {
          console.log('RLS/Permission error detected, falling back to localStorage');
          setUseLocalStorage(true);
          
          const updatedStreaks = streaks.filter(s => s.id !== id);
          setStreaks(updatedStreaks);
          saveToLocalStorage(updatedStreaks);
          
          toast({
            title: "Streak Deleted",
            description: "Your streak has been removed.",
          });
          return;
        }
        
        toast({
          title: "Error",
          description: "Failed to delete streak",
          variant: "destructive",
        });
        return;
      }

      setStreaks(streaks.filter(s => s.id !== id));
      toast({
        title: "Streak Deleted",
        description: "Your streak has been removed.",
      });
    } catch (error) {
      console.error('Error deleting streak:', error);
      console.log('Falling back to localStorage for deleting streak');
      setUseLocalStorage(true);
      
      const updatedStreaks = streaks.filter(s => s.id !== id);
      setStreaks(updatedStreaks);
      saveToLocalStorage(updatedStreaks);
      
      toast({
        title: "Streak Deleted",
        description: "Your streak has been removed.",
      });
    }
  };

  const toggleCompletion = (id: string, date?: string) => {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const streak = streaks.find(s => s.id === id);
    if (!streak) return;

    const completions = [...streak.completions];
    const index = completions.indexOf(targetDate);
    
    if (index > -1) {
      completions.splice(index, 1);
    } else {
      completions.push(targetDate);
    }

    updateStreak(id, { completions });
  };

  return {
    streaks,
    loading,
    addStreak,
    updateStreak,
    deleteStreak,
    toggleCompletion
  };
};
