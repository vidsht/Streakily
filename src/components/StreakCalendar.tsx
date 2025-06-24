
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Streak } from '@/types/streak';
import { useState, useEffect } from 'react';

interface StreakCalendarProps {
  streak: Streak;
  onToggleCompletion: (id: string, date?: string) => void;
  onBack: () => void;
}

export const StreakCalendar = ({ streak, onToggleCompletion, onBack }: StreakCalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Force re-render when streak completions change
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    forceUpdate({});
  }, [streak.completions]);
  
  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startDate.getDate() - startOfMonth.getDay());

  const days = [];
  const currentDatePointer = new Date(startDate);

  for (let i = 0; i < 42; i++) {
    days.push(new Date(currentDatePointer));
    currentDatePointer.setDate(currentDatePointer.getDate() + 1);
  }

  const isCompleted = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return streak.completions.includes(dateStr);
  };

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month && date.getFullYear() === year;
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const handleDateClick = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    console.log('Clicking date:', dateStr, 'Current completions:', streak.completions);
    onToggleCompletion(streak.id, dateStr);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
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
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-semibold">
            {monthNames[month]} {year}
          </h3>
          <Button variant="outline" size="sm" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((date, index) => {
            const completed = isCompleted(date);
            const currentMonth = isCurrentMonth(date);
            const todayDate = isToday(date);
            
            return (
              <button
                key={`${date.getTime()}-${completed}`} // Force re-render with completion state
                onClick={() => handleDateClick(date)}
                className={`
                  aspect-square rounded-lg text-sm font-medium transition-all duration-200
                  ${currentMonth ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}
                  ${todayDate ? 'ring-2 ring-blue-500' : ''}
                  ${completed 
                    ? 'bg-green-500 text-white hover:bg-green-600 scale-105' 
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105'
                  }
                  ${currentMonth ? 'cursor-pointer' : 'cursor-default'}
                `}
                disabled={!currentMonth}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 mt-6 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Completed ({streak.completions.length} total)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-blue-500 rounded"></div>
            <span>Today</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
