import { useState, useEffect } from 'react';

interface TypingAnimationProps {
  text: string;
  speed?: number;
  className?: string;
  loop?: boolean;
  pauseDuration?: number;
}

export const TypingAnimation = ({ 
  text, 
  speed = 100, 
  className = "", 
  loop = false, 
  pauseDuration = 2000 
}: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (isTyping && currentIndex < text.length) {
      // Typing phase
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (isTyping && currentIndex >= text.length && loop) {
      // Pause before deleting
      const timeout = setTimeout(() => {
        setIsTyping(false);
      }, pauseDuration);

      return () => clearTimeout(timeout);
    } else if (!isTyping && currentIndex > 0 && loop) {
      // Deleting phase
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
        setCurrentIndex(prev => prev - 1);
      }, speed / 2);

      return () => clearTimeout(timeout);
    } else if (!isTyping && currentIndex === 0 && loop) {
      // Pause before typing again
      const timeout = setTimeout(() => {
        setIsTyping(true);
      }, pauseDuration / 2);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, isTyping, loop, pauseDuration]);

  useEffect(() => {
    // Reset animation when text changes
    setDisplayText('');
    setCurrentIndex(0);
    setIsTyping(true);
  }, [text]);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>|</span>
    </span>
  );
};
