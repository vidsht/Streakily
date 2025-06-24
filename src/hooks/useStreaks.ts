
import { useState, useEffect } from 'react';
import { Streak } from '@/types/streak';

export const useStreaks = () => {
  const [streaks, setStreaks] = useState<Streak[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStreaks();
  }, []);

  const loadStreaks = () => {
    try {
      const stored = localStorage.getItem('streakily-streaks');
      if (stored) {
        setStreaks(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading streaks:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveStreaks = (newStreaks: Streak[]) => {
    try {
      localStorage.setItem('streakily-streaks', JSON.stringify(newStreaks));
      setStreaks(newStreaks);
    } catch (error) {
      console.error('Error saving streaks:', error);
    }
  };

  const addStreak = (streak: Omit<Streak, 'id' | 'createdAt' | 'completions'>) => {
    const newStreak: Streak = {
      ...streak,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      completions: []
    };
    saveStreaks([...streaks, newStreak]);
  };

  const updateStreak = (id: string, updates: Partial<Streak>) => {
    const updated = streaks.map(streak => 
      streak.id === id ? { ...streak, ...updates } : streak
    );
    saveStreaks(updated);
  };

  const deleteStreak = (id: string) => {
    saveStreaks(streaks.filter(streak => streak.id !== id));
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
