
import { TypingAnimation } from '@/components/TypingAnimation';

export const WelcomeSection = () => {  return (
    <div className="text-center py-8">
      <h2 className="text-5xl font-bold mb-4 font-mono tracking-wider leading-tight text-[rgb(145,50,231)] dark:text-white">
        <TypingAnimation 
          text="Transform Your Life, One Habit at a Time" 
          speed={80}
          loop={true}
          pauseDuration={2000}
          className="inline-block font-mono"
        />
      </h2><p className="text-xl text-black dark:text-gray-300 max-w-3xl mx-auto font-sans leading-relaxed">
        Every small step counts. Track your habits, celebrate your wins, and watch as consistency becomes your superpower.
      </p>
      <div className="mt-6 flex items-center justify-center gap-2 text-purple-600 dark:text-red-400 font-medium">
        <span className="text-2xl">✨</span>
        <span>You're exactly where you need to be</span>
        <span className="text-2xl">✨</span>
      </div>
    </div>
  );
};
