
import { StreakCalendar } from '@/components/StreakCalendar';
import { triggerConfetti } from '@/lib/confetti';
import { Streak } from '@/types/streak';

interface StreakCalendarWithConfettiProps {
  streak: Streak;
  onToggleCompletion: (streakId: string, date: string) => void;
  horizontal?: boolean;
}

export const StreakCalendarWithConfetti = ({ 
  streak, 
  onToggleCompletion, 
  horizontal = false 
}: StreakCalendarWithConfettiProps) => {
  const handleToggleCompletion = (streakId: string, date: string) => {
    const wasCompleted = streak.completions.includes(date);
    
    // Call the original toggle function
    onToggleCompletion(streakId, date);
    
    // If we're marking it as complete (it wasn't completed before), trigger confetti
    if (!wasCompleted) {
      setTimeout(() => {
        triggerConfetti();
      }, 100); // Small delay to let the UI update first
    }
  };

  return (
    <StreakCalendar
      streak={streak}
      onToggleCompletion={handleToggleCompletion}
      horizontal={horizontal}
    />
  );
};
