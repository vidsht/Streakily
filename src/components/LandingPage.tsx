
import { SignInButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Plus, Target, Calendar, Zap, Trophy, CheckCircle, TrendingUp, Medal, Award, Star } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { TypingAnimation } from '@/components/TypingAnimation';

export const LandingPage = () => {
  return (    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 dark:from-gray-900 dark:via-red-900 dark:to-black relative overflow-hidden">
      {/* Background pattern for dark theme */}
      <div className="fixed inset-0 dark:dark-pattern"></div>
      
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent font-mono tracking-wider">
                Streakily
              </h1>
            </div>              <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg font-mono tracking-wider leading-tight text-[rgb(145,50,231)] dark:text-white">
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
            </div>              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 dark:from-red-500 dark:to-red-700 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2 drop-shadow-sm">Visual Streak Tracking</h3>
                <p className="text-black dark:text-gray-300 text-sm drop-shadow-sm">See your progress come to life with beautiful calendars that celebrate every completed day</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 dark:from-red-600 dark:to-red-800 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2 drop-shadow-sm">Smart Daily Goals</h3>
                <p className="text-black dark:text-gray-300 text-sm drop-shadow-sm">Stay focused with sticky note-style goals that adapt to your routine and keep you on track</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 dark:from-red-700 dark:to-red-900 rounded-full flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-black dark:text-white mb-2 drop-shadow-sm">Powerful Insights</h3>
                <p className="text-black dark:text-gray-300 text-sm drop-shadow-sm">Discover patterns in your habits and unlock the science of what keeps you motivated</p>
              </div>
            </div>

            {/* Achievement System Introduction */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-200/50 dark:border-yellow-700/30">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="h-8 w-8 text-yellow-500" />
                <h3 className="text-2xl font-bold text-black dark:text-white font-mono">Unlock Your Achievements</h3>
                <Medal className="h-8 w-8 text-yellow-500" />
              </div>
              <p className="text-black dark:text-gray-300 text-lg mb-6 leading-relaxed">
                Level up your habit journey with our gamified achievement system. Earn beautiful badges, celebrate milestones, and share your victories with the world.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-white/30 dark:bg-black/30 rounded-lg p-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white text-sm">Streak Milestones</h4>
                    <p className="text-xs text-black dark:text-gray-300">7, 30, 100+ day badges</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/30 dark:bg-black/30 rounded-lg p-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white text-sm">Goal Completion</h4>
                    <p className="text-xs text-black dark:text-gray-300">Daily goal achievements</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/30 dark:bg-black/30 rounded-lg p-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-black dark:text-white text-sm">Special Rewards</h4>
                    <p className="text-xs text-black dark:text-gray-300">Perfect weeks & more</p>
                  </div>
                </div>
              </div>
            </div>              <div className="space-y-4 pt-4">
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
