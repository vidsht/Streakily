import { Achievement } from '@/types/achievement';
import { Button } from '@/components/ui/button';
import { Share2, X, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AchievementNotificationProps {
  achievement: Achievement;
  onClose: () => void;
  onShare: (achievement: Achievement) => void;
  autoClose?: boolean;
  duration?: number;
}

export const AchievementNotification = ({ 
  achievement, 
  onClose, 
  onShare,
  autoClose = true,
  duration = 5000
}: AchievementNotificationProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto close
    if (autoClose) {
      const closeTimer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => {
        clearTimeout(timer);
        clearTimeout(closeTimer);
      };
    }
    
    return () => clearTimeout(timer);
  }, [autoClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for animation to complete
  };

  const handleShare = () => {
    onShare(achievement);
    handleClose();
  };

  return (
    <div className={`
      fixed top-4 right-4 z-50 max-w-sm
      transform transition-all duration-300 ease-out
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
    `}>
      <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl border-2 border-yellow-300 p-4 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300/20 to-orange-400/20"></div>
        
        {/* Celebration sparkles */}
        <div className="absolute top-2 left-2">
          <div className="animate-pulse text-yellow-200">✨</div>
        </div>
        <div className="absolute top-4 right-8">
          <div className="animate-ping text-yellow-200">⭐</div>
        </div>
        <div className="absolute bottom-2 left-8">
          <div className="animate-bounce text-yellow-200">🎉</div>
        </div>

        {/* Close button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClose}
          className="absolute top-2 right-2 w-6 h-6 p-0 text-yellow-800 hover:text-yellow-900 hover:bg-yellow-200/50 rounded-full"
        >
          <X className="h-3 w-3" />
        </Button>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-2xl">{achievement.badge}</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-800" />
                <span className="font-bold text-yellow-900 text-sm">Achievement Unlocked!</span>
              </div>
              <h3 className="font-bold text-yellow-900 text-lg leading-tight">
                {achievement.title}
              </h3>
            </div>
          </div>

          {/* Description */}
          <p className="text-yellow-800 text-sm mb-4 leading-tight">
            {achievement.description}
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              onClick={handleShare}
              size="sm"
              className="flex-1 bg-white/20 hover:bg-white/30 text-yellow-900 border border-yellow-600/30 backdrop-blur-sm"
            >
              <Share2 className="h-3 w-3 mr-1" />
              Share
            </Button>
            <Button
              onClick={handleClose}
              size="sm"
              variant="ghost"
              className="text-yellow-800 hover:bg-white/20"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
