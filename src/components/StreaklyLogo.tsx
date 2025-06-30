import React from 'react';

interface StreaklyLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const StreaklyLogo: React.FC<StreaklyLogoProps> = ({ size = 'md', className = '' }) => {
  const dimensions = {
    sm: { width: 20, height: 20 },
    md: { width: 32, height: 32 },
    lg: { width: 64, height: 64 }
  };

  const { width, height } = dimensions[size];

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id={`flameGradient-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor: '#ff6b35', stopOpacity: 1}} />
          <stop offset="50%" style={{stopColor: '#f7931e', stopOpacity: 1}} />
          <stop offset="100%" style={{stopColor: '#ffd700', stopOpacity: 1}} />
        </linearGradient>
      </defs>
      
      {/* Flame/Streak Icon */}
      <path 
        d="M16 4C14 6 12 8 12 12C12 16 14.5 18.5 16 20C17.5 18.5 20 16 20 12C20 8 18 6 16 4Z" 
        fill={`url(#flameGradient-${size})`}
      />
      
      {/* Smaller flame details */}
      <path 
        d="M16 6C15 7.5 14 9 14 11.5C14 14 15.5 15.5 16 16.5C16.5 15.5 18 14 18 11.5C18 9 17 7.5 16 6Z" 
        fill="#ffaa00"
      />
      
      {/* Core */}
      <circle cx="16" cy="14" r="2" fill="#fff200"/>
      
      {/* Calendar grid representing habit tracking */}
      <rect x="6" y="22" width="20" height="8" rx="2" fill="currentColor" opacity="0.3"/>
      <rect x="8" y="24" width="2" height="2" rx="0.5" fill="#10b981"/>
      <rect x="11" y="24" width="2" height="2" rx="0.5" fill="#10b981"/>
      <rect x="14" y="24" width="2" height="2" rx="0.5" fill="#10b981"/>
      <rect x="17" y="24" width="2" height="2" rx="0.5" fill="#6b7280"/>
      <rect x="20" y="24" width="2" height="2" rx="0.5" fill="#6b7280"/>
      <rect x="23" y="24" width="2" height="2" rx="0.5" fill="#6b7280"/>
      
      <rect x="8" y="27" width="2" height="2" rx="0.5" fill="#10b981"/>
      <rect x="11" y="27" width="2" height="2" rx="0.5" fill="#10b981"/>
      <rect x="14" y="27" width="2" height="2" rx="0.5" fill="#6b7280"/>
      <rect x="17" y="27" width="2" height="2" rx="0.5" fill="#6b7280"/>
      <rect x="20" y="27" width="2" height="2" rx="0.5" fill="#6b7280"/>
      <rect x="23" y="27" width="2" height="2" rx="0.5" fill="#6b7280"/>
    </svg>
  );
};
