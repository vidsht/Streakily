
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Trophy, Calendar } from 'lucide-react';

interface StatsSectionProps {
  totalStreaks: number;
  longestStreak: number;
  totalCompletions: number;
}

export const StatsSection = ({ totalStreaks, longestStreak, totalCompletions }: StatsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
      <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-purple-100 dark:border-red-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-black dark:text-gray-300 drop-shadow-sm">Total Streaks</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 dark:from-red-500 dark:to-red-700 rounded-full flex items-center justify-center">
            <Target className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">{totalStreaks}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-green-100 dark:border-red-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-black dark:text-gray-300 drop-shadow-sm">Longest Streak</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 dark:from-red-600 dark:to-red-800 rounded-full flex items-center justify-center">
            <Trophy className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-red-500 dark:to-red-700 bg-clip-text text-transparent">{longestStreak} days</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-orange-100 dark:border-red-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-black dark:text-gray-300 drop-shadow-sm">Total Completions</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 dark:from-red-700 dark:to-red-900 rounded-full flex items-center justify-center">
            <Calendar className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-red-400 dark:to-red-500 bg-clip-text text-transparent">{totalCompletions}</div>
        </CardContent>
      </Card>
    </div>
  );
};
