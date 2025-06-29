
import { TypingAnimation } from '@/components/TypingAnimation';

export const WelcomeSection = () => {
  return (
    <div className="text-center py-8">
      <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent mb-4">
        <TypingAnimation 
          text="Transform Your Life, One Habit at a Time" 
          speed={80}
          className="inline-block"
        />
      </h2>
      <p className="text-xl text-black dark:text-gray-300 max-w-3xl mx-auto">
        Build lasting habits with streaks and achieve your daily goals. Track your progress, stay motivated, and transform your life one day at a time!
      </p>
    </div>
  );
};
