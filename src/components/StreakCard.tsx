
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Timer, Trash2, Edit } from 'lucide-react';
import { Streak } from '@/types/streak';
import { calculateStreakStats, isCompletedToday, getCategoryColor } from '@/lib/streakUtils';
import { useState } from 'react';

interface StreakCardProps {
  streak: Streak;
  onToggleCompletion: (id: string) => void;
  onEdit: (streak: Streak) => void;
  onDelete: (id: string) => void;
  onStartTimer: (streak: Streak) => void;
}

export const StreakCard = ({ 
  streak, 
  onToggleCompletion, 
  onEdit, 
  onDelete,
  onStartTimer 
}: StreakCardProps) => {
  const stats = calculateStreakStats(streak);
  const completed = isCompletedToday(streak);
  const categoryColor = getCategoryColor(streak.category);

  return (
    <Card className="relative group hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg flex items-center gap-2">
              {streak.name}
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: categoryColor }}
              />
            </CardTitle>
            <div className="flex gap-2">
              <Badge variant="secondary">{streak.category}</Badge>
              <Badge variant="outline">{streak.frequency}</Badge>
            </div>
          </div>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(streak)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(streak.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {streak.description}
        </p>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{stats.currentStreak}</div>
            <div className="text-xs text-gray-500">Current</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">{stats.longestStreak}</div>
            <div className="text-xs text-gray-500">Longest</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">{stats.completionRate}%</div>
            <div className="text-xs text-gray-500">Rate</div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button
            onClick={() => onToggleCompletion(streak.id)}
            variant={completed ? "default" : "outline"}
            className="flex-1"
          >
            {completed ? (
              <CheckCircle2 className="h-4 w-4 mr-2" />
            ) : (
              <Circle className="h-4 w-4 mr-2" />
            )}
            {completed ? 'Completed Today' : 'Mark Complete'}
          </Button>
          
          {streak.timerDuration && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => onStartTimer(streak)}
            >
              <Timer className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
