
import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Play, Pause, Square, RotateCcw } from 'lucide-react';
import { Streak } from '@/types/streak';

interface TimerModalProps {
  open: boolean;
  onClose: () => void;
  streak: Streak | null;
}

export const TimerModal = ({ open, onClose, streak }: TimerModalProps) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (streak?.timerDuration) {
      setTimeLeft(streak.timerDuration * 60);
      setIsCompleted(false);
    }
  }, [streak]);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(streak?.timerDuration ? streak.timerDuration * 60 : 0);
    setIsCompleted(false);
  };
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(streak?.timerDuration ? streak.timerDuration * 60 : 0);
    setIsCompleted(false);
  };

  if (!streak) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{streak.name} Timer</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 text-center">
          <div className="text-6xl font-mono font-bold text-blue-600">
            {formatTime(timeLeft)}
          </div>
          
          {isCompleted && (
            <div className="text-green-600 font-semibold text-lg">
              🎉 Time's up! Great job!
            </div>
          )}
          
          <div className="flex justify-center gap-2">
            {!isRunning ? (
              <Button onClick={handleStart} disabled={timeLeft === 0}>
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : (
              <Button onClick={handlePause}>
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            )}
            
            <Button variant="outline" onClick={handleStop}>
              <Square className="h-4 w-4 mr-2" />
              Stop
            </Button>
            
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
