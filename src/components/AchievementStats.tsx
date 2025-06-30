import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Medal, Star, Award } from 'lucide-react';
import { useAchievements } from '@/hooks/useAchievements';

export const AchievementStats = () => {
  const { achievements } = useAchievements();

  // Calculate achievement statistics
  const totalBadges = achievements.length;
  const milestoneAchievements = achievements.filter(a => a.type === 'milestone');
  const goalCompletionAchievements = achievements.filter(a => a.type === 'goal_completion');
  const consistencyAchievements = achievements.filter(a => a.type === 'consistency');
  
  // Find longest milestone achievement
  const longestMilestone = milestoneAchievements.reduce((max, achievement) => {
    return (achievement.goalDays || 0) > max ? (achievement.goalDays || 0) : max;
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
      <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-yellow-100 dark:border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-black dark:text-gray-300 drop-shadow-sm">Total Badges</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-yellow-700 rounded-full flex items-center justify-center">
            <Trophy className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-yellow-600 bg-clip-text text-transparent">{totalBadges}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-blue-100 dark:border-blue-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-black dark:text-gray-300 drop-shadow-sm">Milestone Badges</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700 rounded-full flex items-center justify-center">
            <Medal className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-600 bg-clip-text text-transparent">{milestoneAchievements.length}</div>
        </CardContent>
      </Card>
      
      <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-green-100 dark:border-green-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-black dark:text-gray-300 drop-shadow-sm">Goal Completions</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-600 dark:from-green-500 dark:to-green-700 rounded-full flex items-center justify-center">
            <Award className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 dark:from-green-400 dark:to-green-600 bg-clip-text text-transparent">{goalCompletionAchievements.length}</div>
        </CardContent>
      </Card>
        <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-purple-100 dark:border-purple-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-black dark:text-gray-300 drop-shadow-sm">Consistency Badges</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700 rounded-full flex items-center justify-center">
            <Star className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
            {consistencyAchievements.length}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
