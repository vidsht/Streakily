import { useState, useEffect } from 'react';
import { Achievement, ACHIEVEMENT_TEMPLATES } from '@/types/achievement';
import { Streak } from '@/types/streak';

const ACHIEVEMENTS_STORAGE_KEY = 'streakily_achievements';

export const useAchievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);

  // Load achievements from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
      if (stored) {
        setAchievements(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading achievements:', error);
    }
  }, []);

  // Save achievements to localStorage
  const saveAchievements = (newAchievements: Achievement[]) => {
    try {
      localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(newAchievements));
      setAchievements(newAchievements);
    } catch (error) {
      console.error('Error saving achievements:', error);
    }
  };

  // Check if an achievement should be unlocked
  const checkForNewAchievements = (streak: Streak) => {
    const currentStreak = calculateCurrentStreak(streak);
    const existingAchievements = achievements.filter(a => a.streakId === streak.id);
    
    // Check for goal completion achievement
    if (currentStreak >= streak.goalDuration) {
      const hasGoalAchievement = existingAchievements.some(a => a.type === 'goal_completion');
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
        saveAchievements(updatedAchievements);
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
            shareable: true
          };
          
          const updatedAchievements = [...achievements, newAch];
          saveAchievements(updatedAchievements);
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
