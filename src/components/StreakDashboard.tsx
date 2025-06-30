
import { StreakForm } from '@/components/StreakForm';
import { StreakCalendarWithConfetti } from '@/components/StreakCalendarWithConfetti';
import { DailyGoalsSidebar } from '@/components/DailyGoalsSidebar';
import { UserMenu } from '@/components/UserMenu';
import { WelcomeSection } from '@/components/WelcomeSection';
import { AchievementStats } from '@/components/AchievementStats';
import { AchievementNotification } from '@/components/AchievementNotification';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '@/components/ui/alert-dialog';
import { useStreaks } from '@/hooks/useStreaks';
import { useAchievements } from '@/hooks/useAchievements';
import { Plus, Target, Zap, Trash2, Edit } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState, useEffect } from 'react';

export const StreakDashboard = () => {
  const { streaks, loading, addStreak, toggleCompletion, deleteStreak, updateStreak } = useStreaks();
  const { newAchievement, checkForNewAchievements, clearNewAchievement, generateShareText } = useAchievements();
  const [showForm, setShowForm] = useState(false);
  const [selectedStreak, setSelectedStreak] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [streakToDelete, setStreakToDelete] = useState(null);

  // Check for achievements when streaks change
  useEffect(() => {
    streaks.forEach(streak => {
      checkForNewAchievements(streak);
    });
  }, [streaks, checkForNewAchievements]);

  const handleToggleCompletion = (id: string, date?: string) => {
    toggleCompletion(id, date);
    // Check for new achievements after a slight delay to ensure state is updated
    setTimeout(() => {
      const streak = streaks.find(s => s.id === id);
      if (streak) {
        checkForNewAchievements(streak);
      }
    }, 100);
  };

  const handleDeleteClick = (streak: any) => {
    setStreakToDelete(streak);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    if (streakToDelete) {
      deleteStreak(streakToDelete.id);
      setStreakToDelete(null);
      setShowDeleteDialog(false);
    }
  };

  const handleEditClick = (streak: any) => {
    setSelectedStreak(streak);
    setShowForm(true);
  };

  const handleShareAchievement = (achievement: any) => {
    const shareText = generateShareText(achievement);
    if (navigator.share) {
      navigator.share({
        title: achievement.title,
        text: shareText,
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Achievement copied to clipboard!');
      }).catch(() => {
        // Final fallback: show text in alert
        alert(shareText);
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 dark:from-gray-900 dark:via-red-900 dark:to-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white dark:border-red-500 mx-auto mb-4"></div>
          <p className="text-white text-lg font-medium">Loading your streaks...</p>
        </div>
      </div>
    );  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-gray-900 relative overflow-x-hidden crisscross-pattern">
      {/* Modern layered background */}
      <div className="fixed inset-0 opacity-40 dark:opacity-30">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `
                 radial-gradient(circle at 20% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%),
                 radial-gradient(circle at 40% 60%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                 linear-gradient(45deg, rgba(147, 51, 234, 0.05) 25%, transparent 25%),
                 linear-gradient(-45deg, rgba(59, 130, 246, 0.05) 25%, transparent 25%)
               `,
               backgroundSize: '500px 500px, 400px 400px, 300px 300px, 60px 60px, 60px 60px'
             }}>
        </div>
      </div>
      
      {/* Additional texture layer */}
      <div className="fixed inset-0 opacity-20 dark:opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full" 
             style={{
               backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), 
                                radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)`
             }}>
        </div>
      </div>

      {/* Daily Goals Sidebar */}
      <DailyGoalsSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

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
            </div>            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-2 text-purple-600 dark:text-red-400 hover:text-purple-800 dark:hover:text-red-300"
              >
                <Target className="h-4 w-4" />
                Manage Daily Goals
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => window.location.href = '/about'}
                className="flex items-center gap-2 text-purple-600 dark:text-red-400 hover:text-purple-800 dark:hover:text-red-300"
              >
                About
              </Button>
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 relative z-10">        {/* Welcome Section */}
        <WelcomeSection />

        {/* Achievement Stats Section */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-[rgb(145,50,231)] dark:text-white font-mono tracking-wider text-center">
            🏆 Achievement Unlocked
          </h3>
          <AchievementStats />
        </div>        {/* Streaks with Inline Calendars */}
        <div className="space-y-8">
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
                  <StreakCalendarWithConfetti
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
        )        }      </main>

      {/* Achievement Notification */}
      {newAchievement && (
        <AchievementNotification
          achievement={newAchievement}
          onClose={clearNewAchievement}
          onShare={() => handleShareAchievement(newAchievement)}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <Trash2 className="h-5 w-5" />
              Delete Streak
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Are you sure you want to delete <strong>"{streakToDelete?.name}"</strong>?</p>
              <p className="text-red-600 dark:text-red-400 font-medium">
                This action cannot be undone. All your progress and achievements for this streak will be permanently lost.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
            >
              Delete Streak
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
