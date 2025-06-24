
export interface Streak {
  id: string;
  name: string;
  description: string;
  category: 'Health' | 'Learning' | 'Productivity' | 'Mindfulness' | 'Creative' | 'Personal';
  frequency: 'daily' | 'weekly';
  goalDuration: number;
  color: string;
  createdAt: string;
  completions: string[]; // ISO date strings
  reminderTime?: string;
  timerDuration?: number; // in minutes
}

export interface StreakStats {
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  totalCompletions: number;
}
