export interface Achievement {
  id: string;
  streakId: string;
  type: 'goal_completion' | 'milestone' | 'consistency';
  title: string;
  description: string;
  badge: string; // emoji or icon identifier
  unlockedAt: string; // ISO date string
  goalDays: number;
  category: string;
  shareable: boolean;
}

export interface AchievementTemplate {
  type: 'goal_completion' | 'milestone' | 'consistency';
  title: (streakName: string, days: number, category: string) => string;
  description: (streakName: string, days: number, category: string) => string;
  badge: (category: string) => string;
  shareable: boolean;
}

export const ACHIEVEMENT_TEMPLATES: Record<string, AchievementTemplate> = {
  goal_completion: {
    type: 'goal_completion',
    title: (streakName: string, days: number, category: string) => 
      `${category} Champion! 🏆`,
    description: (streakName: string, days: number, category: string) => 
      `Completed ${days} days of "${streakName}" - Your dedication has paid off!`,
    badge: (category: string) => {
      const badges: Record<string, string> = {
        Health: '🏃‍♂️',
        Learning: '🎓',
        Productivity: '💼',
        Mindfulness: '🧘‍♂️',
        Creative: '🎨',
        Personal: '⭐'
      };
      return badges[category] || '🏆';
    },
    shareable: true
  },
  milestone: {
    type: 'milestone',
    title: (streakName: string, days: number, category: string) => 
      `${days} Day Milestone! 🎯`,
    description: (streakName: string, days: number, category: string) => 
      `Reached ${days} consecutive days of "${streakName}" - You're unstoppable!`,
    badge: (category: string) => '🎯',
    shareable: true
  },
  consistency: {
    type: 'consistency',
    title: (streakName: string, days: number, category: string) => 
      `Consistency Master! 💪`,
    description: (streakName: string, days: number, category: string) => 
      `Maintained "${streakName}" for ${days} days straight - Consistency is your superpower!`,
    badge: (category: string) => '💪',
    shareable: true
  }
};
