
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Streak } from '@/types/streak';
import { getCategoryColor } from '@/lib/streakUtils';

interface StreakCalendarProps {
  streak: Streak;
  onToggleCompletion: (id: string, date?: string) => void;
  onBack: () => void;
}

export const StreakCalendar = ({ streak, onToggleCompletion, onBack }: StreakCalendarProps) => {
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());

  const days = [];
  const currentDate = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const isCompleted = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return streak.completions.includes(dateStr);
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === today.getMonth();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    onToggleCompletion(streak.id, dateStr);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-lg">{streak.name} Calendar</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const completed = isCompleted(date);
            const currentMonth = isCurrentMonth(date);
            const today = isToday(date);
            
            return (
              <button
                key={index}
                onClick={() => handleDateClick(date)}
                className={`
                  aspect-square rounded-lg text-sm font-medium transition-colors
                  ${currentMonth ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}
                  ${today ? 'ring-2 ring-blue-500' : ''}
                  ${completed 
                    ? 'text-white' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
                style={{
                  backgroundColor: completed ? getCategoryColor(streak.category) : undefined
                }}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
