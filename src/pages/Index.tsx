
import { SignedIn, SignedOut, SignInButton } from '@clerk/clerk-react';
import { StreakForm } from '@/components/StreakForm';
import { StreakCalendar } from '@/components/StreakCalendar';
import { DailyGoals } from '@/components/DailyGoals';
import { UserMenu } from '@/components/UserMenu';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStreaks } from '@/hooks/useStreaks';
import { Plus, Target, Calendar, Zap, Trophy, CheckCircle, TrendingUp } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState } from 'react';

const Index = () => {
  return (
    <>
      <SignedOut>
        <LandingPage />
      </SignedOut>
      <SignedIn>
        <StreakDashboard />
      </SignedIn>
    </>
  );
};

const LandingPage = () => {
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
                Build Amazing Habits,
                <br />
                One Day at a Time! 
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

const StreakDashboard = () => {
  const { streaks, loading, addStreak, toggleCompletion, deleteStreak, updateStreak } = useStreaks();
  const [showForm, setShowForm] = useState(false);
  const [selectedStreak, setSelectedStreak] = useState(null);

  const scrollToGoals = () => {
    document.getElementById('daily-goals')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 dark:from-gray-900 dark:via-red-900 dark:to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white dark:border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading your streaks...</p>
        </div>
      </div>
    );
  }

  // Calculate overall stats
  const totalStreaks = streaks.length;
  const totalCompletions = streaks.reduce((sum, streak) => sum + streak.completions.length, 0);
  const longestStreak = streaks.reduce((max, streak) => {
    // Calculate current streak length
    const today = new Date();
    let currentStreak = 0;
    
    for (let i = 0; i >= 0; i--) {
      const checkDate = new Date(today);
      checkDate.setDate(today.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      if (streak.completions.includes(dateStr)) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    return Math.max(max, currentStreak);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-gray-900 dark:via-red-900 dark:to-black relative">
      {/* Background pattern for dark theme */}
      <div className="fixed inset-0 dark:dark-pattern"></div>
      
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-purple-400 dark:bg-red-500 rounded-full"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-pink-400 dark:bg-red-600 rounded-full"></div>
        <div className="absolute bottom-32 left-40 w-20 h-20 bg-orange-400 dark:bg-red-400 rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-purple-400 dark:bg-red-700 rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-400 dark:bg-red-500 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-36 h-36 bg-orange-400 dark:bg-red-600 rounded-full"></div>
      </div>

      {/* Header */}
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
              <Button 
                variant="ghost" 
                onClick={scrollToGoals}
                className="hidden sm:flex items-center gap-2 text-purple-600 dark:text-red-400 hover:text-purple-800 dark:hover:text-red-300"
              >
                <Target className="h-4 w-4" />
                Manage Daily Goals
              </Button>
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Button 
                onClick={() => setShowForm(true)} 
                className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 dark:from-red-600 dark:to-red-800 hover:from-purple-600 hover:to-pink-600 dark:hover:from-red-700 dark:hover:to-red-900 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Plus className="h-4 w-4" />
                New Streak
              </Button>
              <UserMenu />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 relative z-10">
        {/* Welcome Section */}
        <div className="text-center py-8">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent mb-4">
            Welcome to Your Success Journey! 🚀
          </h2>
          <p className="text-xl text-black dark:text-gray-300 max-w-3xl mx-auto">
            Build lasting habits with streaks and achieve your daily goals. Track your progress, stay motivated, and transform your life one day at a time!
          </p>
        </div>

        {/* Daily Goals Section */}
        <DailyGoals />

        {/* Streaks with Inline Calendars */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent mb-4">
              Your Habit Streaks 🔥
            </h2>
            <p className="text-lg text-black dark:text-gray-300 max-w-2xl mx-auto">
              Long-term habits that compound over time. Build consistency and watch your streaks grow!
            </p>
          </div>

          {streaks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-red-600 dark:to-red-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4 drop-shadow-sm">
                Ready to Start Your First Streak? 🌟
              </h3>
              <p className="text-black dark:text-gray-300 mb-8 text-lg max-w-md mx-auto drop-shadow-sm">
                Create your first habit streak and begin building the consistency that will transform your life!
              </p>
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-red-600 dark:to-red-800 hover:from-purple-600 hover:to-pink-600 dark:hover:from-red-700 dark:hover:to-red-900 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3 text-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Your First Streak
              </Button>
            </div>
          ) : (
            streaks.map((streak) => (
              <Card key={streak.id} className="w-full bg-white/70 dark:bg-black/40 backdrop-blur-sm border-purple-100 dark:border-red-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="space-y-3">
                    <CardTitle className="text-3xl text-center bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent drop-shadow-sm">{streak.name}</CardTitle>
                    <p className="text-black dark:text-gray-300 text-lg text-center drop-shadow-sm">{streak.description}</p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-red-900/40 dark:to-red-800/40 text-black dark:text-red-300 rounded-full font-medium">
                        <strong>Category:</strong> {streak.category}
                      </span>
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-red-800/40 dark:to-red-700/40 text-black dark:text-red-300 rounded-full font-medium">
                        <strong>Frequency:</strong> {streak.frequency}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <StreakCalendar
                    streak={streak}
                    onToggleCompletion={toggleCompletion}
                    horizontal={true}
                  />
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Streak Form Modal */}
        {showForm && (
          <div className="fixed inset-0 z-50">
            <StreakForm
              streak={selectedStreak}
              onSubmit={(data) => {
                if (selectedStreak) {
                  updateStreak(selectedStreak.id, data);
                } else {
                  addStreak(data);
                }
                setShowForm(false);
                setSelectedStreak(null);
              }}
              onCancel={() => {
                setShowForm(false);
                setSelectedStreak(null);
              }}
            />
          </div>
        )}

        {/* Stats Section - Moved to bottom */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-purple-100 dark:border-red-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black dark:text-gray-300 drop-shadow-sm">Total Streaks</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 dark:from-red-500 dark:to-red-700 rounded-full flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">{totalStreaks}</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-green-100 dark:border-red-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black dark:text-gray-300 drop-shadow-sm">Longest Streak</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 dark:from-red-600 dark:to-red-800 rounded-full flex items-center justify-center">
                <Trophy className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 dark:from-red-500 dark:to-red-700 bg-clip-text text-transparent">{longestStreak} days</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 dark:bg-black/40 backdrop-blur-sm border-orange-100 dark:border-red-500/20 shadow-lg hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-black dark:text-gray-300 drop-shadow-sm">Total Completions</CardTitle>
              <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 dark:from-red-700 dark:to-red-900 rounded-full flex items-center justify-center">
                <Calendar className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 dark:from-red-400 dark:to-red-500 bg-clip-text text-transparent">{totalCompletions}</div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-black/80 backdrop-blur-md border-t border-purple-100 dark:border-red-500/20 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-black dark:text-gray-300 text-lg drop-shadow-sm">
              Made with <span className="text-red-500 text-xl">❤️</span> by <span className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">Vidushi Tiwari</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
