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
import { AchievementBadge } from '@/components/AchievementBadge';
import { useAchievements } from '@/hooks/useAchievements';
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
  const { getLatestStreakAchievement, generateShareText } = useAchievements();
  
  // Force re-render when streak completions change
  const [, forceUpdate] = useState({});
  
  const latestAchievement = getLatestStreakAchievement(streak.id);

  const handleShareAchievement = (achievement: any) => {
    const shareText = generateShareText(achievement);
    if (navigator.share) {
      navigator.share({
        title: achievement.title,
        text: shareText,
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Achievement copied to clipboard!');
      }).catch(() => {
        // Final fallback: show text in alert
        alert(shareText);
      });
    }
  };
  
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
      <>        <div className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {months.map((monthDate, monthIndex) => {
              const days = generateDaysForMonth(monthDate);
              const monthName = monthNames[monthDate.getMonth()];
              const year = monthDate.getFullYear();
              const isCurrentMonth = monthIndex === months.length - 1; // Last month is current month
              
              return (
                <div key={monthIndex} className="flex-1 relative">
                  {/* Achievement Badge - show on current month */}
                  {isCurrentMonth && latestAchievement && (
                    <div className="absolute -top-2 -left-2 z-10">
                      <AchievementBadge 
                        achievement={latestAchievement}
                        onShare={handleShareAchievement}
                        showShareButton={true}
                        size="md"
                      />
                    </div>
                  )}
                  
                  <h4 className="text-xl font-bold text-black dark:text-white mb-6 text-center drop-shadow-md">
                    {monthName} {year}
                  </h4>
                  <div className="grid grid-cols-7 gap-2 max-w-none">
                    {days.map((date, dayIndex) => {
                      const completed = isCompleted(date);
                      const todayDate = isToday(date);
                      const isClickable = todayDate;
                      
                      return (                        <button
                          key={dayIndex}
                          onClick={() => handleDateClick(date)}
                          className={`
                            w-12 h-12 rounded-xl text-sm font-bold transition-all duration-300 
                            flex items-center justify-center border-2 transform hover:scale-105 active:scale-95
                            backdrop-blur-sm shadow-lg hover:shadow-xl
                            ${completed 
                              ? 'bg-gradient-to-br from-green-400 to-emerald-600 dark:from-green-500 dark:to-emerald-700 text-white border-green-300 dark:border-green-500 shadow-green-200 dark:shadow-green-500/20' 
                              : todayDate
                                ? 'border-purple-400 dark:border-purple-500 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-900/50 dark:via-pink-900/50 dark:to-orange-900/50 text-purple-700 dark:text-purple-300 hover:from-purple-100 hover:via-pink-100 hover:to-orange-100 dark:hover:from-purple-800/60 dark:hover:via-pink-800/60 dark:hover:to-orange-800/60 shadow-purple-200 dark:shadow-purple-500/20'
                                : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 hover:bg-gray-50 dark:hover:bg-gray-700/80 shadow-gray-100 dark:shadow-gray-700/20'
                            }
                            ${isClickable ? 'cursor-pointer hover:border-purple-500 dark:hover:border-purple-400' : 'cursor-default opacity-60'}
                          `}
                          disabled={!isClickable}
                        >
                          {date.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>              );
            })}
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
      <Card className="max-w-md mx-auto bg-white/80 dark:bg-black/60 backdrop-blur-sm border-purple-100 dark:border-red-500/20 shadow-xl relative">
        {/* Achievement Badge */}
        {latestAchievement && (
          <div className="absolute -top-2 -left-2 z-10">
            <AchievementBadge 
              achievement={latestAchievement}
              onShare={handleShareAchievement}
              showShareButton={true}
              size="md"
            />
          </div>
        )}
        
        <CardContent className="px-6 pb-6">{/* Month Navigation */}
          <div className="flex items-center justify-between mb-6 pt-4">
            <button
              onClick={goToPreviousMonth}
              disabled={month === new Date().getMonth() && year === new Date().getFullYear() - 1}
              className="p-2 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/40 disabled:opacity-50 transition-all duration-200 border border-purple-200 dark:border-purple-700 shadow-sm"
            >
              <ChevronLeft className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </button>
            <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
              {monthNames[month]} {year}
            </h2>
            <button
              onClick={goToNextMonth}
              disabled={isNextMonthDisabled()}
              className="p-2 rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/40 disabled:opacity-50 transition-all duration-200 border border-purple-200 dark:border-purple-700 shadow-sm"
            >
              <ChevronRight className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </button>
          </div>
            {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-gray-600 dark:text-gray-400 text-sm font-semibold">
                {day}
              </div>
            ))}
          </div>          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((date, index) => {
              const completed = isCompleted(date);
              const isCurrent = isCurrentMonth(date);
              const isPast = isPastDate(date);
              const todayDateCheck = isToday(date);

              return (
                <div
                  key={index}
                  className={`
                    flex items-center justify-center h-10 w-10 rounded-xl font-bold text-sm
                    transition-all duration-300 transform hover:scale-105 shadow-sm
                    ${isCurrent ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-600'}
                    ${completed ? 'bg-gradient-to-br from-green-400 to-emerald-600 dark:from-green-500 dark:to-emerald-700 text-white shadow-green-200 dark:shadow-green-500/20' : ''}
                    ${todayDateCheck ? 'font-bold border-2 border-purple-500 dark:border-purple-400 bg-purple-50 dark:bg-purple-900/30' : ''}
                    ${!completed && !todayDateCheck ? 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700' : ''}
                    ${isPast && !todayDateCheck && !completed ? 'opacity-50' : ''}
                  `}
                >
                  {date.getDate()}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent className="bg-white/95 dark:bg-black/95 backdrop-blur-sm border-purple-200 dark:border-red-500/20">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
              Confirm Action
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400 text-base">
              {getConfirmationMessage()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={handleCancelToggle}
              className="border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleConfirmToggle}
              className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-red-600 dark:to-red-800 hover:from-purple-600 hover:to-pink-600 dark:hover:from-red-700 dark:hover:to-red-900 text-white"
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
