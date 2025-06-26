
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import { Zap, Target, TrendingUp, Trophy } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SignedOut>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 dark:from-gray-900 dark:via-red-900 dark:to-black relative overflow-hidden">
          {/* Background pattern for dark theme */}
          <div className="absolute inset-0 dark:dark-pattern"></div>
          
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10 dark:opacity-20">
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
          
          <div className="text-center space-y-8 p-8 bg-white/20 dark:bg-black/40 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 dark:border-red-500/30 max-w-md mx-4 relative z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-red-600 dark:to-red-800 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
                  Streakily
                </h1>
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">
                Welcome to Your Journey! 🚀
              </h2>
              <p className="text-white/90 text-lg leading-relaxed">
                Build amazing habits, track your progress, and celebrate every victory along the way!
              </p>
              
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/20 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Target className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-white/80 text-sm">Track</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/20 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-white/80 text-sm">Grow</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-white/20 dark:bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-white/80 text-sm">Achieve</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <SignInButton mode="modal">
                <Button size="lg" className="w-full bg-white text-purple-600 dark:bg-red-600 dark:text-white hover:bg-white/90 dark:hover:bg-red-700 font-semibold shadow-lg">
                  Get Started - It's Free! ✨
                </Button>
              </SignInButton>
              <p className="text-white/70 text-sm">
                Join thousands building better habits every day
              </p>
            </div>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-red-900 dark:to-black relative">
          {/* Background pattern for dark theme */}
          <div className="fixed inset-0 dark:dark-pattern"></div>
          
          {/* Subtle background pattern for authenticated users */}
          <div className="fixed inset-0 opacity-5 dark:opacity-10 pointer-events-none">
            <div className="absolute top-20 left-20 w-32 h-32 bg-purple-400 dark:bg-red-500 rounded-full"></div>
            <div className="absolute top-40 right-32 w-24 h-24 bg-pink-400 dark:bg-red-600 rounded-full"></div>
            <div className="absolute bottom-32 left-40 w-20 h-20 bg-orange-400 dark:bg-red-400 rounded-full"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400 dark:bg-red-700 rounded-full"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-400 dark:bg-red-500 rounded-full"></div>
            <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-orange-400 dark:bg-red-600 rounded-full"></div>
          </div>
          
          <header className="bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg border-b border-purple-100 dark:border-red-500/20 sticky top-0 z-40 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-red-600 dark:to-red-800 rounded-full flex items-center justify-center">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
                      Streakily
                    </h1>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <ThemeToggle />
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10 ring-2 ring-purple-200 dark:ring-red-500 hover:ring-purple-300 dark:hover:ring-red-400 transition-all",
                        userButtonPopoverCard: "shadow-xl border-purple-100 dark:border-red-500/20"
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </header>
          <main className="relative z-10">
            {children}
          </main>
        </div>
      </SignedIn>
    </>
  );
};
