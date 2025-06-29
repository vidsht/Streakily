
import { SignInButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Plus, Target, Calendar, Zap, Trophy, CheckCircle, TrendingUp } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TypingAnimation } from '@/components/TypingAnimation';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 dark:from-gray-900 dark:via-red-900 dark:to-black relative overflow-hidden">
      {/* Background pattern for dark theme */}
      <div className="fixed inset-0 dark:dark-pattern"></div>
      
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-10 dark:opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white dark:bg-red-500 rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white dark:bg-red-600 rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-white dark:bg-red-400 rounded-full"></div>
        <div className="absolute bottom-40 right-10 w-24 h-24 bg-white dark:bg-red-700 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white dark:bg-red-500 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-14 h-14 bg-white dark:bg-red-600 rounded-full"></div>
      </div>

      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-8 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-red-500/30 max-w-4xl mx-4 p-8 relative z-10">
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-red-600 dark:to-red-800 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
                Streakily
              </h1>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white mb-4 drop-shadow-lg">
                <TypingAnimation 
                  text="Build Amazing Habits, One Day at a Time!" 
                  speed={80}
                  className="inline-block"
                />
              </h2>
              <p className="text-black dark:text-gray-300 text-lg md:text-xl leading-relaxed font-medium drop-shadow-md max-w-3xl mx-auto">
                Transform your life with Streakily! Track your daily habits, set meaningful goals, celebrate your wins, and watch your consistency grow into unstoppable momentum.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 dark:from-red-500 dark:to-red-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2 drop-shadow-sm">Track Daily Habits</h3>
                <p className="text-black dark:text-gray-300 text-sm drop-shadow-sm">Mark your habits complete each day with our beautiful calendar view and build lasting streaks</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 dark:from-red-600 dark:to-red-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2 drop-shadow-sm">Manage Daily Goals</h3>
                <p className="text-black dark:text-gray-300 text-sm drop-shadow-sm">Set and track your daily goals with sticky note-style reminders that keep you focused</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 dark:from-red-700 dark:to-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2 drop-shadow-sm">Build Momentum</h3>
                <p className="text-black dark:text-gray-300 text-sm drop-shadow-sm">Watch your streaks grow longer and your habits become second nature with visual progress tracking</p>
              </div>
            </div>
            
            <div className="space-y-4 pt-4">
              <SignInButton mode="modal">
                <Button size="lg" className="w-full max-w-md bg-gradient-to-r from-purple-500 to-pink-500 dark:from-red-600 dark:to-red-800 hover:from-purple-600 hover:to-pink-600 dark:hover:from-red-700 dark:hover:to-red-900 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-lg py-4">
                  <Plus className="h-5 w-5 mr-2" />
                  Start Building Your Streaks - Free! ✨
                </Button>
              </SignInButton>
              <p className="text-black dark:text-gray-300 text-sm drop-shadow-sm">
                Join thousands building better habits every day
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
