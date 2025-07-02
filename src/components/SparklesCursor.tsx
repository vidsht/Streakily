import { useEffect, useState, useCallback, useRef } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
  type: 'star' | 'circle' | 'diamond' | 'plus';
  color: string;
  layer: number;
}

export const SparklesCursor = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const mouseTrailRef = useRef<Array<{ x: number; y: number; timestamp: number }>>([]);
  const movementTimerRef = useRef<NodeJS.Timeout>();
  const sparkleIdRef = useRef(0);

  // Theme-adaptive color palettes
  const lightThemeColors = [
    'text-purple-600',
    'text-purple-700',
    'text-indigo-600',
    'text-blue-600',
    'text-violet-600',
    'text-fuchsia-600',
    'text-pink-600',
    'text-gray-700'
  ];

  const darkThemeColors = [
    'text-yellow-300',
    'text-yellow-400',
    'text-amber-300',
    'text-orange-300',
    'text-pink-300',
    'text-purple-300',
    'text-blue-300',
    'text-white'
  ];

  const sparkleTypes = ['star', 'circle', 'diamond', 'plus'] as const;

  // Detect theme changes
  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };

    // Check initial theme
    checkTheme();

    // Create observer to watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const newPosition = { x: e.clientX, y: e.clientY };
    const currentTime = Date.now();
    
    // Update mouse position immediately
    setMousePosition(newPosition);
    
    // Update mouse trail using ref for better performance
    mouseTrailRef.current = [
      ...mouseTrailRef.current.slice(-7), // Keep only last 7 points
      { ...newPosition, timestamp: currentTime }
    ];
    
    // Set moving state
    if (!isMoving) {
      setIsMoving(true);
    }
    
    // Clear existing movement timer
    if (movementTimerRef.current) {
      clearTimeout(movementTimerRef.current);
    }
    
    // Set timer to detect when mouse stops moving
    movementTimerRef.current = setTimeout(() => {
      setIsMoving(false);
      mouseTrailRef.current = []; // Clear trail when stopped
    }, 150); // Increased timeout for smoother experience
      // Create sparkles with throttling
    if (Math.random() > 0.6) { // Reduced frequency to 40% for better performance
      const currentColors = isDarkMode ? darkThemeColors : lightThemeColors;
      const newSparkles: Sparkle[] = [];
      const numSparkles = Math.floor(Math.random() * 4) + 1; // Reduced to 1-4 sparkles
      
      for (let i = 0; i < numSparkles; i++) {
        const layer = Math.floor(Math.random() * 3);
        newSparkles.push({
          id: sparkleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 50, // Reduced spread for better performance
          y: e.clientY + (Math.random() - 0.5) * 50,
          size: Math.random() * 10 + 4, // Reduced size range
          opacity: Math.random() * 0.7 + 0.3,
          duration: Math.random() * 1000 + 600, // Shorter duration for better cleanup
          delay: Math.random() * 200,
          type: sparkleTypes[Math.floor(Math.random() * sparkleTypes.length)],
          color: currentColors[Math.floor(Math.random() * currentColors.length)],
          layer: layer,
        });
      }
      
      setSparkles(prev => [...prev, ...newSparkles]);
    }
  }, [isMoving]);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (movementTimerRef.current) {
        clearTimeout(movementTimerRef.current);
      }
    };
  }, [handleMouseMove]);
  useEffect(() => {
    // Clean up old sparkles more aggressively when not moving
    const cleanup = setInterval(() => {
      setSparkles(prev => {
        if (!isMoving) {
          // Clear all sparkles when not moving
          return [];
        }
        // Normal cleanup when moving
        return prev.filter(sparkle => {
          const age = Date.now() - sparkle.id * 10; // Approximate age
          return age < sparkle.duration + sparkle.delay + 1500; // Keep longer
        });
      });
    }, isMoving ? 150 : 50); // Clean up faster when not moving

    return () => clearInterval(cleanup);
  }, [isMoving]);

  const renderSparkle = (sparkle: Sparkle) => {
    const baseStyle = {
      left: sparkle.x - sparkle.size / 2,
      top: sparkle.y - sparkle.size / 2,
      width: sparkle.size,
      height: sparkle.size,
      animationDuration: `${sparkle.duration}ms`,
      animationDelay: `${sparkle.delay}ms`,
      animationFillMode: 'both',
      opacity: sparkle.opacity,
      zIndex: 50 - sparkle.layer, // Layered z-index
    };

    switch (sparkle.type) {
      case 'star':
        return (
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill="none"
            className={`${sparkle.color} drop-shadow-lg`}
          >
            <path
              d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"
              fill="currentColor"
              className="animate-pulse"
            />
          </svg>
        );
      case 'circle':
        return (
          <div 
            className={`${sparkle.color} bg-current rounded-full animate-pulse drop-shadow-lg`}
            style={{ width: '100%', height: '100%' }}
          />
        );
      case 'diamond':
        return (
          <div 
            className={`${sparkle.color} bg-current rotate-45 animate-pulse drop-shadow-lg`}
            style={{ width: '70%', height: '70%', margin: '15%' }}
          />
        );
      case 'plus':
        return (
          <svg
            width={sparkle.size}
            height={sparkle.size}
            viewBox="0 0 24 24"
            fill="none"
            className={`${sparkle.color} drop-shadow-lg`}
          >
            <path
              d="M12 2V22M2 12H22"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="animate-pulse"
            />
          </svg>
        );
      default:
        return null;
    }
  };  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Only show sparkles when moving */}
      {isMoving && sparkles.map(sparkle => {
        const baseStyle = {
          left: sparkle.x - sparkle.size / 2,
          top: sparkle.y - sparkle.size / 2,
          width: sparkle.size,
          height: sparkle.size,
          animationDuration: `${sparkle.duration}ms`,
          animationDelay: `${sparkle.delay}ms`,
          animationFillMode: 'both' as const,
          opacity: sparkle.opacity,
          zIndex: 50 - sparkle.layer,
        };

        return (
          <div
            key={sparkle.id}
            className="absolute animate-ping"
            style={baseStyle}
          >
            {renderSparkle(sparkle)}
          </div>
        );
      })}
        {/* Enhanced trailing sparkles with smooth movement - only when moving */}
      {isMoving && mouseTrailRef.current.length > 0 && (
        <>
          {/* Primary cursor trail */}
          <div
            className={`absolute w-3 h-3 rounded-full opacity-70 drop-shadow-lg ${
              isDarkMode 
                ? 'bg-yellow-300' 
                : 'bg-purple-500'
            }`}
            style={{
              left: mousePosition.x,
              top: mousePosition.y,
              transform: 'translate(-50%, -50%)',
              zIndex: 52,
              transition: 'none', // Remove transition for instant response
            }}
          />
          
          {/* Secondary trail with delay */}
          {mouseTrailRef.current.length > 1 && (
            <div
              className={`absolute w-2 h-2 rounded-full opacity-50 drop-shadow-md ${
                isDarkMode 
                  ? 'bg-yellow-400' 
                  : 'bg-purple-600'
              }`}
              style={{
                left: mouseTrailRef.current[mouseTrailRef.current.length - 2]?.x || mousePosition.x,
                top: mouseTrailRef.current[mouseTrailRef.current.length - 2]?.y || mousePosition.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 51,
                transition: 'all 0.05s ease-out',
              }}
            />
          )}
          
          {/* Tertiary trail with more delay */}
          {mouseTrailRef.current.length > 3 && (
            <div
              className={`absolute w-1 h-1 rounded-full opacity-30 ${
                isDarkMode 
                  ? 'bg-amber-300' 
                  : 'bg-indigo-500'
              }`}
              style={{
                left: mouseTrailRef.current[mouseTrailRef.current.length - 4]?.x || mousePosition.x,
                top: mouseTrailRef.current[mouseTrailRef.current.length - 4]?.y || mousePosition.y,
                transform: 'translate(-50%, -50%)',
                zIndex: 50,
                transition: 'all 0.1s ease-out',
              }}
            />
          )}
          
          {/* Additional smooth trail dots */}
          {mouseTrailRef.current.slice(-6).map((point, index) => {
            const age = mouseTrailRef.current.length - index;
            const opacity = Math.max(0.05, 0.3 - (age * 0.04));
            const size = Math.max(0.5, 3 - (age * 0.2));
            
            return (
              <div
                key={`trail-${index}-${point.timestamp}`}
                className={`absolute rounded-full ${
                  isDarkMode 
                    ? 'bg-yellow-200' 
                    : 'bg-purple-400'
                }`}
                style={{
                  left: point.x,
                  top: point.y,
                  width: size,
                  height: size,
                  opacity: opacity,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 49 - index,
                  transition: 'none', // Remove transitions for better performance
                }}
              />
            );
          })}
        </>
      )}
    </div>
  );
};
