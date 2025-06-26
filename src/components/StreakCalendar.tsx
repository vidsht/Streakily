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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {months.map((monthDate, monthIndex) => {
              const days = generateDaysForMonth(monthDate);
              const monthName = monthNames[monthDate.getMonth()];
              const year = monthDate.getFullYear();
              
              return (
                <div key={monthIndex} className="flex-1">
                  <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 text-center">
                    {monthName} {year}
                  </h4>
                  <div className="grid grid-cols-7 gap-2 max-w-none">
                    {days.map((date, dayIndex) => {
                      const completed = isCompleted(date);
                      const todayDate = isToday(date);
                      const isClickable = todayDate;
                      
                      return (
                        <button
                          key={dayIndex}
                          onClick={() => handleDateClick(date)}
                          className={`
                            w-10 h-10 rounded-full text-sm font-semibold transition-all duration-300 
                            flex items-center justify-center border-2 transform hover:scale-110
                            ${completed 
                              ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-400 shadow-lg shadow-green-200' 
                              : todayDate
                                ? 'border-purple-400 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 hover:from-purple-100 hover:to-pink-100 shadow-md'
                                : 'border-gray-200 text-gray-500 bg-white hover:bg-gray-50'
                            }
                            ${isClickable ? 'cursor-pointer' : 'cursor-default'}
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
          <div className="flex items-center justify-center gap-8 text-sm text-gray-600 mt-8 pt-6 border-t border-purple-100">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-sm"></div>
              <span className="font-medium">Completed ({streak.completions.length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-purple-400 rounded-full bg-gradient-to-r from-purple-50 to-pink-50"></div>
              <span className="font-medium">Today (clickable)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-gray-200 rounded-full bg-white"></div>
              <span className="font-medium">Past days</span>
            </div>
          </div>
        </div>

        {/* Confirmation Dialog */}
        <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
          <AlertDialogContent className="bg-white/95 backdrop-blur-sm border-purple-200">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Confirm Action
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-600 text-base">
                {getConfirmationMessage()}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel 
                onClick={handleCancelToggle}
                className="border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction 
                onClick={handleConfirmToggle}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                Confirm
              </AlertDialogAction>
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
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={goToPreviousMonth}
              disabled={month === new Date().getMonth() && year === new Date().getFullYear() - 1}
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-semibold">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={goToNextMonth}
              disabled={isNextMonthDisabled()}
              className="p-1 rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-gray-500 text-xs">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((date, index) => {
              const completed = isCompleted(date);
              const isCurrent = isCurrentMonth(date);
              const isPast = isPastDate(date);
              const todayDateCheck = isToday(date);

              return (
                <div
                  key={index}
                  className={`
                    flex items-center justify-center h-8 w-8 rounded-full
                    ${isCurrent ? 'text-gray-800' : 'text-gray-400'}
                    ${completed ? 'bg-green-200 text-green-800' : ''}
                    ${todayDateCheck ? 'font-bold border-2 border-blue-500' : ''}
                    ${isPast && !todayDateCheck ? 'opacity-50' : ''}
                  `}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>

          {/* Compact Legend */}
          <div className="flex items-center justify-around mt-4 text-gray-600 text-xs">
            <div>
              <span className="inline-block w-3 h-3 rounded-full bg-green-200 align-middle mr-1"></span>
              Completed
            </div>
            <div>
              <span className="inline-block w-3 h-3 rounded-full border-2 border-blue-500 align-middle mr-1"></span>
              Today
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
