import { Achievement } from '@/types/achievement';
import { Button } from '@/components/ui/button';
import { Share2, Trophy } from 'lucide-react';
import { useState } from 'react';

interface AchievementBadgeProps {
  achievement: Achievement;
  onShare?: (achievement: Achievement) => void;
  showShareButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AchievementBadge = ({ 
  achievement, 
  onShare, 
  showShareButton = false,
  size = 'md' 
}: AchievementBadgeProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8 text-lg',
    md: 'w-12 h-12 text-2xl',
    lg: 'w-16 h-16 text-3xl'
  };

  const badgeClass = sizeClasses[size];

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`
        ${badgeClass} 
        bg-gradient-to-br from-yellow-400 to-orange-500 
        rounded-full flex items-center justify-center 
        shadow-lg border-2 border-yellow-300 
        transform transition-all duration-300 
        hover:scale-110 hover:shadow-xl
        cursor-pointer relative overflow-hidden
      `}>
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700"></div>
        
        <span className="relative z-10">{achievement.badge}</span>
        
        {/* Achievement glow */}
        <div className="absolute inset-0 rounded-full bg-yellow-400/20 animate-pulse"></div>
      </div>

      {/* Tooltip */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50">
          <div className="bg-black/90 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl backdrop-blur-sm">
            <div className="font-semibold">{achievement.title}</div>
            <div className="text-gray-300 text-xs mt-1">{achievement.goalDays} days completed!</div>
            {/* Tooltip arrow */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/90"></div>
          </div>
        </div>
      )}

      {/* Share button */}
      {showShareButton && onShare && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onShare(achievement)}
          className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg"
        >
          <Share2 className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
};
