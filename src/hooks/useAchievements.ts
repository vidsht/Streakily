import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Achievement, ACHIEVEMENT_TEMPLATES } from '@/types/achievement';
import { Streak } from '@/types/streak';

export const useAchievements = () => {
  const { user, isLoaded } = useUser();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [useLocalStorage, setUseLocalStorage] = useState(false);

  // Local storage key based on user ID or fallback
  const getStorageKey = () => `streakily_achievements_${user?.id || 'guest'}`;

  // Load achievements from local storage
  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem(getStorageKey());
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading achievements from localStorage:', error);
      return [];
    }
  };

  // Save achievements to local storage
  const saveToLocalStorage = (achievementsToSave: Achievement[]) => {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(achievementsToSave));
    } catch (error) {
      console.error('Error saving achievements to localStorage:', error);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      if (user) {
        fetchAchievements();
      } else {
        setAchievements([]);
      }
    }
  }, [user, isLoaded]);

  const fetchAchievements = async () => {
    if (!user?.id) {
      console.log('No user or user ID available');
      return;
    }

    try {
      console.log('Fetching achievements for user:', user.id);
      const { data, error } = await supabase
        .from('achievements')
        .select('*')
        .eq('user_id', user.id)
        .order('unlocked_at', { ascending: false });

      if (error) {
        console.error('Error fetching achievements:', error);
        
        // Check if it's an RLS/permission error
        if (error.message.includes('RLS') || error.message.includes('permission') || error.message.includes('policy')) {
          console.log('RLS/Permission error detected, falling back to localStorage');
          setUseLocalStorage(true);
          const localAchievements = loadFromLocalStorage();
          setAchievements(localAchievements);
          return;
        }
        
        // For other errors, fall back to localStorage
        console.log('Database error, falling back to localStorage');
        setUseLocalStorage(true);
        const localAchievements = loadFromLocalStorage();
        setAchievements(localAchievements);
        return;
      }

      console.log('Achievements fetched successfully:', data);
      
      // Convert database format to app format
      const formattedAchievements: Achievement[] = data.map(dbAchievement => ({
        id: dbAchievement.id,
        streakId: dbAchievement.streak_id || '',
        type: dbAchievement.type as any,
        title: dbAchievement.title,
        description: dbAchievement.description,
        badge: dbAchievement.badge,
        unlockedAt: dbAchievement.unlocked_at,
        goalDays: dbAchievement.goal_days,
        category: dbAchievement.category,
        shareable: dbAchievement.shareable,
      }));

      setAchievements(formattedAchievements);
      setUseLocalStorage(false);
    } catch (error) {
      console.error('Unexpected error fetching achievements:', error);
      console.log('Falling back to localStorage due to unexpected error');
      setUseLocalStorage(true);
      const localAchievements = loadFromLocalStorage();
      setAchievements(localAchievements);
    }
  };

  // Check if an achievement should be unlocked
  const checkForNewAchievements = (streak: Streak) => {
    const currentStreak = calculateCurrentStreak(streak);
    const existingAchievements = achievements.filter(a => a.streakId === streak.id);
    
    // Check for goal completion achievement
    if (currentStreak >= streak.goalDuration) {      const hasGoalAchievement = existingAchievements.some(a => a.type === 'goal_completion');
      if (!hasGoalAchievement) {
        const template = ACHIEVEMENT_TEMPLATES.goal_completion;
        const newAch: Achievement = {
          id: `${streak.id}-goal-${Date.now()}`,
          streakId: streak.id,
          type: 'goal_completion',
          title: template.title(streak.name, streak.goalDuration, streak.category),
          description: template.description(streak.name, streak.goalDuration, streak.category),
          badge: template.badge(streak.category),
          unlockedAt: new Date().toISOString(),
          goalDays: streak.goalDuration,
          category: streak.category,
          shareable: true
        };
        
        const updatedAchievements = [...achievements, newAch];
        setAchievements(updatedAchievements);
        saveToLocalStorage(updatedAchievements);
        setNewAchievement(newAch);
        return newAch;
      }
    }

    // Check for milestone achievements (7, 14, 30, 50, 100 days)
    const milestones = [7, 14, 30, 50, 100];
    for (const milestone of milestones) {
      if (currentStreak >= milestone) {
        const hasMilestone = existingAchievements.some(
          a => a.type === 'milestone' && a.goalDays === milestone
        );
        if (!hasMilestone) {
          const template = ACHIEVEMENT_TEMPLATES.milestone;
          const newAch: Achievement = {
            id: `${streak.id}-milestone-${milestone}-${Date.now()}`,
            streakId: streak.id,
            type: 'milestone',
            title: template.title(streak.name, milestone, streak.category),
            description: template.description(streak.name, milestone, streak.category),
            badge: template.badge(streak.category),
            unlockedAt: new Date().toISOString(),
            goalDays: milestone,
            category: streak.category,
            shareable: true          };
          
          const updatedAchievements = [...achievements, newAch];
          setAchievements(updatedAchievements);
          saveToLocalStorage(updatedAchievements);
          setNewAchievement(newAch);
          return newAch;
        }
      }
    }

    return null;
  };

  // Calculate current streak length
  const calculateCurrentStreak = (streak: Streak): number => {
    if (streak.completions.length === 0) return 0;

    const today = new Date();
    const sortedCompletions = streak.completions.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    let currentStreak = 0;
    let checkDate = new Date(today);

    for (let i = 0; i < sortedCompletions.length; i++) {
      const completionDate = new Date(sortedCompletions[i]);
      const checkDateStr = checkDate.toISOString().split('T')[0];
      const completionDateStr = completionDate.toISOString().split('T')[0];

      if (checkDateStr === completionDateStr) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    return currentStreak;
  };

  // Get achievements for a specific streak
  const getStreakAchievements = (streakId: string) => {
    return achievements.filter(a => a.streakId === streakId);
  };

  // Get the latest achievement for a streak (for badge display)
  const getLatestStreakAchievement = (streakId: string) => {
    const streakAchievements = getStreakAchievements(streakId);
    return streakAchievements.sort((a, b) => 
      new Date(b.unlockedAt).getTime() - new Date(a.unlockedAt).getTime()
    )[0] || null;
  };

  // Clear new achievement notification
  const clearNewAchievement = () => {
    setNewAchievement(null);
  };

  // Generate share text
  const generateShareText = (achievement: Achievement) => {
    return `🎉 Just unlocked: ${achievement.title}\n\n${achievement.description}\n\nBuilding better habits with Streakily! 💪\n\n#Streakily #HabitBuilding #Consistency`;
  };

  return {
    achievements,
    newAchievement,
    checkForNewAchievements,
    getStreakAchievements,
    getLatestStreakAchievement,
    clearNewAchievement,
    generateShareText,
    calculateCurrentStreak
  };
};
