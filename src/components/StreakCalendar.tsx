
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
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
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
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

  // Generate days but only include up to today
  for (let i = 0; i < 42; i++) {
    const currentDay = new Date(currentDatePointer);
    
    // Only add days that are today or in the past
    if (currentDay <= today) {
      days.push(currentDay);
    }
    
    currentDatePointer.setDate(currentDatePointer.getDate() + 1);
    
    // Stop if we've passed today
    if (currentDatePointer > today) {
      break;
    }
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

  const isPastDate = (date: Date) => {
    const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayWithoutTime = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dateWithoutTime < todayWithoutTime;
  };

  const handleDateClick = (date: Date) => {
    // Only allow clicking on current month dates
    if (!isCurrentMonth(date)) {
      return;
    }
    
    // Only allow clicking on today's date for completion toggle
    if (!isToday(date)) {
      return;
    }
    
    console.log('Clicking date:', date.toISOString().split('T')[0], 'Current completions:', streak.completions);
    
    // Show confirmation dialog
    setSelectedDate(date);
    setShowConfirmDialog(true);
  };

  const handleConfirmToggle = () => {
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      onToggleCompletion(streak.id, dateStr);
    }
    setShowConfirmDialog(false);
    setSelectedDate(null);
  };

  const handleCancelToggle = () => {
    setShowConfirmDialog(false);
    setSelectedDate(null);
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    // Don't allow going to future months beyond current month
    const nextMonth = new Date(year, month + 1, 1);
    if (nextMonth.getMonth() <= today.getMonth() && nextMonth.getFullYear() <= today.getFullYear()) {
      setCurrentDate(nextMonth);
    }
  };

  // Check if next month button should be disabled
  const isNextMonthDisabled = () => {
    const nextMonth = new Date(year, month + 1, 1);
    return nextMonth.getMonth() > today.getMonth() || nextMonth.getFullYear() > today.getFullYear();
  };

  const getConfirmationMessage = () => {
    if (!selectedDate) return '';
    
    const dateStr = selectedDate.toISOString().split('T')[0];
    const isCurrentlyCompleted = streak.completions.includes(dateStr);
    const formattedDate = selectedDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    
    if (isCurrentlyCompleted) {
      return `Are you sure you want to unmark "${streak.name}" as completed for ${formattedDate}?`;
    } else {
      return `Are you sure you want to mark "${streak.name}" as completed for ${formattedDate}?`;
    }
  };

  return (
    <>
      <Card className="max-w-md mx-auto">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack} className="p-1">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-lg truncate">{streak.name} Calendar</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="sm" onClick={goToPreviousMonth} className="p-2">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-base font-semibold">
              {monthNames[month]} {year}
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={goToNextMonth}
              disabled={isNextMonthDisabled()}
              className={`p-2 ${isNextMonthDisabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-3">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
              <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {days.map((date, index) => {
              const completed = isCompleted(date);
              const currentMonth = isCurrentMonth(date);
              const todayDate = isToday(date);
              const pastDate = isPastDate(date);
              const isClickable = currentMonth && todayDate; // Only today is clickable
              
              return (
                <button
                  key={`${date.getTime()}-${completed}`}
                  onClick={() => handleDateClick(date)}
                  className={`
                    h-8 w-8 rounded-md text-xs font-medium transition-all duration-200 
                    flex items-center justify-center
                    ${currentMonth ? 'text-gray-900 dark:text-gray-100' : 'text-gray-400'}
                    ${todayDate ? 'ring-1 ring-blue-500' : ''}
                    ${completed 
                      ? 'bg-green-500 text-white shadow-sm' 
                      : isClickable 
                        ? 'hover:bg-gray-100 dark:hover:bg-gray-700'
                        : ''
                    }
                    ${pastDate && currentMonth ? 'opacity-75' : ''}
                    ${isClickable ? 'cursor-pointer hover:bg-green-50' : 'cursor-default'}
                  `}
                  disabled={!isClickable}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Compact Legend */}
          <div className="flex items-center justify-center gap-4 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Done ({streak.completions.length})</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border border-blue-500 rounded"></div>
              <span>Today (clickable)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Action</AlertDialogTitle>
            <AlertDialogDescription>
              {getConfirmationMessage()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelToggle}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmToggle}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
