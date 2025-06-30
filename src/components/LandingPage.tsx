
import { SignInButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Plus, Target, Calendar, Zap, Trophy, CheckCircle, TrendingUp, Medal, Award, Star } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TypingAnimation } from '@/components/TypingAnimation';
import { StreaklyLogo } from '@/components/StreaklyLogo';

export const LandingPage = () => {
  return (    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 dark:from-gray-900 dark:via-red-900 dark:to-black relative overflow-hidden">
      {/* Background pattern for dark theme */}
      <div className="fixed inset-0 dark:dark-pattern"></div>
      
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-5 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-red-500/30 max-w-4xl mx-4 p-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center">
                <StreaklyLogo size="lg" className="w-16 h-16" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent font-mono tracking-wider">
                Streakily
              </h1>
            </div>              <div className="space-y-4">              <div className="relative min-h-[4rem] md:min-h-[6rem] flex items-center justify-center mb-4">
                {/* Invisible text to reserve space */}
                <span className="invisible text-3xl md:text-5xl font-bold font-mono tracking-wider leading-tight absolute">
                  Transform Your Life, One Habit at a Time
                </span>
                {/* Visible typing animation */}
                <h2 className="text-3xl md:text-5xl font-bold drop-shadow-lg font-mono tracking-wider leading-tight text-[rgb(145,50,231)] dark:text-white absolute">
                  <TypingAnimation 
                    text="Transform Your Life, One Habit at a Time" 
                    speed={80}
                    loop={true}
                    pauseDuration={2000}
                    className="inline-block font-mono"
                  />
                </h2>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-purple-600 dark:text-red-400 font-medium">
                <span className="text-2xl">✨</span>
                <span>You're exactly where you need to be</span>
                <span className="text-2xl">✨</span>
              </div>
            </div>            {/* Brief Description */}
            <div className="bg-white/10 dark:bg-black/20 backdrop-blur-sm rounded-xl p-5 border border-white/20 dark:border-red-500/20">
              <p className="text-black dark:text-gray-300 text-lg font-medium mb-3">
                Build lasting habits with the proven <span className="text-purple-600 dark:text-red-400 font-semibold">Seinfeld Strategy</span>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div className="flex items-center gap-2 bg-white/20 dark:bg-black/30 rounded-lg p-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-black dark:text-white">Visual Tracking</p>
                    <p className="text-xs text-black/70 dark:text-gray-400">Beautiful streak calendars</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/20 dark:bg-black/30 rounded-lg p-3">
                  <Target className="h-5 w-5 text-blue-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-black dark:text-white">Daily Goals</p>
                    <p className="text-xs text-black/70 dark:text-gray-400">Smart reminders & focus</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/20 dark:bg-black/30 rounded-lg p-3">
                  <Trophy className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-black dark:text-white">Achievements</p>
                    <p className="text-xs text-black/70 dark:text-gray-400">Unlock badges & rewards</p>
                  </div>
                </div>
              </div>
              

            </div>

            {/* Social Proof / Motivation */}
            <div className="bg-gradient-to-r from-yellow-50/20 to-orange-50/20 dark:from-yellow-900/10 dark:to-orange-900/10 backdrop-blur-sm rounded-lg p-4 border border-yellow-200/30 dark:border-yellow-700/20">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <p className="text-sm font-medium text-black dark:text-gray-300">
                  "Don't break the chain" - Jerry Seinfeld's secret to success
                </p>
                <Star className="h-4 w-4 text-yellow-500" />
              </div>
              <p className="text-xs text-center text-black/70 dark:text-gray-400">
                The same method that helped build one of the greatest comedy careers in history
              </p>            </div>

            {/* Quick Benefits */}
            <div className="flex flex-wrap justify-center gap-3 text-xs">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full font-medium">
                ✓ Build Consistency
              </span>
              <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full font-medium">
                ✓ Track Progress
              </span>
              <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full font-medium">
                ✓ Stay Motivated
              </span>
              <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-3 py-1 rounded-full font-medium">
                ✓ Achieve Goals
              </span>
            </div>

            <div className="space-y-3 pt-2">
              <SignInButton mode="modal">
                <Button size="lg" className="w-full max-w-md bg-gradient-to-r from-purple-500 to-pink-500 dark:from-red-600 dark:to-red-800 hover:from-purple-600 hover:to-pink-600 dark:hover:from-red-700 dark:hover:to-red-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-lg py-4">
                  <Plus className="h-5 w-5 mr-2" />
                  Begin Your Transformation Today 🚀
                </Button>
              </SignInButton>
              <p className="text-black dark:text-gray-300 text-sm drop-shadow-sm">
                Free forever • No credit card required • Start in 30 seconds
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
