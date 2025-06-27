import { AuthGuard } from '@/components/AuthGuard';
import { StreakForm } from '@/components/StreakForm';
import { StreakCalendar } from '@/components/StreakCalendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStreaks } from '@/hooks/useStreaks';
import { Plus, Target, Calendar, Zap, Trophy } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { streaks, loading, addStreak, toggleCompletion, deleteStreak, updateStreak } = useStreaks();
  const [showForm, setShowForm] = useState(false);
  const [selectedStreak, setSelectedStreak] = useState(null);
  const navigate = useNavigate();

  const PUBLISHABLE_KEY = "pk_test_bW9kZXJuLW9yY2EtODQuY2xlcmsuYWNjb3VudHMuZGV2JA";
  const shouldUseAuth = !!PUBLISHABLE_KEY;

  // Redirect to introduction page if not authenticated and auth is enabled
  useEffect(() => {
    if (shouldUseAuth) {
      // This will be handled by AuthGuard component
    } else {
      // If no auth configured, redirect to intro page
      navigate('/intro');
    }
  }, [shouldUseAuth, navigate]);

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

  const content = (
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
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 relative z-10">
        {/* Streaks with Inline Calendars */}
        <div className="space-y-8">
          {streaks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-red-600 dark:to-red-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-12 w-12 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-4 drop-shadow-sm">
                Ready to Start Your Journey? 🌟
              </h3>
              <p className="text-black dark:text-gray-300 mb-8 text-lg max-w-md mx-auto drop-shadow-sm">
                Create your first streak and begin building the habits that will transform your life!
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

  // If we have Clerk configured, wrap with AuthGuard
  if (shouldUseAuth) {
    return <AuthGuard>{content}</AuthGuard>;
  }

  // Otherwise, redirect to introduction page
  return null;
};

export default Index;
