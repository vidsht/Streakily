
import { Streak, StreakStats } from '@/types/streak';

export const calculateStreakStats = (streak: Streak): StreakStats => {
  const completions = streak.completions.sort();
  const today = new Date().toISOString().split('T')[0];
  
  // Calculate current streak
  let currentStreak = 0;
  const currentDate = new Date();
  
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    if (completions.includes(dateStr)) {
      currentStreak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  // Calculate longest streak
  let longestStreak = 0;
  let tempStreak = 0;
  
  const allDates = new Set(completions);
  const startDate = new Date(streak.createdAt);
  const endDate = new Date();
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    if (allDates.has(dateStr)) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }
  
  // Calculate completion rate
  const daysSinceCreation = Math.floor((Date.now() - new Date(streak.createdAt).getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const completionRate = (completions.length / daysSinceCreation) * 100;
  
  return {
    currentStreak,
    longestStreak,
    completionRate: Math.round(completionRate),
    totalCompletions: completions.length
  };
};

export const isCompletedToday = (streak: Streak): boolean => {
  const today = new Date().toISOString().split('T')[0];
  return streak.completions.includes(today);
};

export const getCategoryColor = (category: string): string => {
  const colors = {
    Health: '#10b981',
    Learning: '#3b82f6', 
    Productivity: '#f59e0b',
    Mindfulness: '#8b5cf6',
    Creative: '#ec4899',
    Personal: '#06b6d4'
  };
  return colors[category as keyof typeof colors] || '#6b7280';
};
