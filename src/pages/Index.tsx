// Update this page (the content is just a fallback if you fail to update the page)

import { AuthGuard } from '@/components/AuthGuard';
import { StreakForm } from '@/components/StreakForm';
import { StreakCalendar } from '@/components/StreakCalendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStreaks } from '@/hooks/useStreaks';
import { Plus, Target, TrendingUp, Calendar } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const { streaks, loading, addStreak, toggleCompletion, deleteStreak, updateStreak } = useStreaks();
  const [showForm, setShowForm] = useState(false);
  const [selectedStreak, setSelectedStreak] = useState(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your streaks...</p>
        </div>
      </div>
    );
  }

  // Calculate overall stats
  const totalStreaks = streaks.length;
  const activeStreaks = streaks.filter(streak => {
    const today = new Date().toISOString().split('T')[0];
    return streak.completions.includes(today);
  }).length;
  
  const totalCompletions = streaks.reduce((sum, streak) => sum + streak.completions.length, 0);

  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const shouldUseAuth = !!PUBLISHABLE_KEY;

  const content = (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Streakily
              </h1>
            </div>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Streak
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Streaks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStreaks}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Streaks</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeStreaks}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Completions</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCompletions}</div>
            </CardContent>
          </Card>
        </div>

        {/* Streaks with Inline Calendars */}
        <div className="space-y-8">
          {streaks.length === 0 ? (
            <div className="text-center py-12">
              <Target className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No streaks yet
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Get started by creating your first streak!
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create Your First Streak
              </Button>
            </div>
          ) : (
            streaks.map((streak) => (
              <Card key={streak.id} className="w-full">
                <CardHeader className="pb-4">
                  <div className="space-y-3">
                    <CardTitle className="text-xl">{streak.name}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300">{streak.description}</p>
                    <div className="flex gap-3 text-sm text-gray-500">
                      <span><strong>Category:</strong> {streak.category}</span>
                      <span><strong>Frequency:</strong> {streak.frequency}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
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
      </main>
    </div>
  );

  // If we have Clerk configured, wrap with AuthGuard
  if (shouldUseAuth) {
    return <AuthGuard>{content}</AuthGuard>;
  }

  // Otherwise, show content directly
  return content;
};

export default Index;
