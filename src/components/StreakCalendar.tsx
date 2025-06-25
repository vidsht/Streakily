import { Card, CardContent } from '@/components/ui/card';
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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Streak } from '@/types/streak';
import { useState, useEffect } from 'react';

interface StreakCalendarProps {
  streak: Streak;
  onToggleCompletion: (id: string, date?: string) => void;
  onBack?: () => void;
  horizontal?: boolean;
}

export const StreakCalendar = ({ streak, onToggleCompletion, horizontal = false }: StreakCalendarProps) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  // Force re-render when streak completions change
  const [, forceUpdate] = useState({});
  
  useEffect(() => {
    forceUpdate({});
  }, [streak.completions]);
  
  const today = new Date();
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate past 3 months including current month
  const generatePast3Months = () => {
    const months = [];
    const currentDate = new Date(today);
    
    // Generate 3 months (current + 2 previous)
    for (let i = 2; i >= 0; i--) {
      const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      months.push(monthDate);
    }
    
    return months;
  };

  const generateDaysForMonth = (monthDate: Date) => {
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    
    const startOfMonth = new Date(year, month, 1);
    const endOfMonth = new Date(year, month + 1, 0);
    const days = [];
    
    // Generate all days in the month up to today
    for (let day = 1; day <= endOfMonth.getDate(); day++) {
      const currentDay = new Date(year, month, day);
      
      // Only include days that are today or in the past
      if (currentDay <= today) {
        days.push(currentDay);
      }
    }
    
    return days;
  };

  const isCompleted = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return streak.completions.includes(dateStr);
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const handleDateClick = (date: Date) => {
    // Only allow clicking on today's date
    if (!isToday(date)) {
      return;
    }
    
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

  const months = generatePast3Months();

  if (horizontal) {
    return (
      <>
        <div className="w-full">
          <div className="flex gap-8 overflow-x-auto pb-4">
            {months.map((monthDate, monthIndex) => {
              const days = generateDaysForMonth(monthDate);
              const monthName = monthNames[monthDate.getMonth()];
              const year = monthDate.getFullYear();
              
              return (
                <div key={monthIndex} className="flex-shrink-0">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
                    {monthName} {year}
                  </h4>
                  <div className="flex flex-wrap gap-2 max-w-[200px]">
                    {days.map((date, dayIndex) => {
                      const completed = isCompleted(date);
                      const todayDate = isToday(date);
                      const isClickable = todayDate;
                      
                      return (
                        <button
                          key={dayIndex}
                          onClick={() => handleDateClick(date)}
                          className={`
                            w-8 h-8 rounded-full text-xs font-medium transition-all duration-200 
                            flex items-center justify-center border-2
                            ${completed 
                              ? 'bg-green-500 text-white border-green-500 shadow-md' 
                              : todayDate
                                ? 'border-blue-500 bg-blue-50 text-blue-700 hover:bg-blue-100'
                                : 'border-gray-200 text-gray-600 bg-white'
                            }
                            ${isClickable ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
                          `}
                          disabled={!isClickable}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-600 dark:text-gray-400 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Completed ({streak.completions.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-500 rounded-full bg-blue-50"></div>
              <span>Today (clickable)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-200 rounded-full bg-white"></div>
              <span>Past days</span>
            </div>
          </div>
        </div>

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
  }

  const [currentDate, setCurrentDate] = useState(new Date());
  const todayDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
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
    if (currentDay <= todayDate) {
      days.push(currentDay);
    }
    
    currentDatePointer.setDate(currentDatePointer.getDate() + 1);
    
    // Stop if we've passed today
    if (currentDatePointer > todayDate) {
      break;
    }
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === month && date.getFullYear() === year;
  };

  const isPastDate = (date: Date) => {
    const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const todayWithoutTime = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
    return dateWithoutTime < todayWithoutTime;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    // Don't allow going to future months beyond current month
    const nextMonth = new Date(year, month + 1, 1);
    if (nextMonth.getMonth() <= todayDate.getMonth() && nextMonth.getFullYear() <= todayDate.getFullYear()) {
      setCurrentDate(nextMonth);
    }
  };

  // Check if next month button should be disabled
  const isNextMonthDisabled = () => {
    const nextMonth = new Date(year, month + 1, 1);
    return nextMonth.getMonth() > todayDate.getMonth() || nextMonth.getFullYear() > todayDate.getFullYear();
  };

  return (
    <>
      <Card className="max-w-md mx-auto">
        <CardContent className="px-4 pb-4">
          {/* Month Navigation */}
          
          {/* Day Headers */}
          

          {/* Calendar Grid */}
          

          {/* Compact Legend */}
          
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      
    </>
  );
};
