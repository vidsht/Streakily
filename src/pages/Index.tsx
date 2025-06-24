// Update this page (the content is just a fallback if you fail to update the page)

import { AuthGuard } from '@/components/AuthGuard';
import { StreakCard } from '@/components/StreakCard';
import { StreakForm } from '@/components/StreakForm';
import { StreakCalendar } from '@/components/StreakCalendar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStreaks } from '@/hooks/useStreaks';
import { calculateStreakStats, getCategoryColor } from '@/lib/streakUtils';
import { Plus, Target, TrendingUp, Calendar, BarChart3 } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const { streaks, loading, addStreak, toggleCompletion, deleteStreak, updateStreak } = useStreaks();
  const [showForm, setShowForm] = useState(false);
  const [selectedStreak, setSelectedStreak] = useState(null);
  const [activeTab, setActiveTab] = useState('streaks');

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
    const stats = calculateStreakStats(streak);
    return stats.currentStreak > 0;
  }).length;
  
  const totalCompletions = streaks.reduce((sum, streak) => sum + streak.completions.length, 0);
  const avgCompletionRate = streaks.length > 0 
    ? Math.round(streaks.reduce((sum, streak) => sum + calculateStreakStats(streak).completionRate, 0) / streaks.length)
    : 0;

  const handleStreakClick = (streak: any) => {
    setSelectedStreak(streak);
    setActiveTab('calendar'); // Auto-switch to calendar when clicking a streak
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // If switching to calendar and no streak selected, select the first one
    if (value === 'calendar' && !selectedStreak && streaks.length > 0) {
      setSelectedStreak(streaks[0]);
    }
  };

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Completion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgCompletionRate}%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="streaks">My Streaks</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="streaks" className="space-y-6">
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {streaks.map((streak) => (
                  <StreakCard
                    key={streak.id}
                    streak={streak}
                    onToggleCompletion={toggleCompletion}
                    onDelete={deleteStreak}
                    onEdit={(streak) => {
                      setSelectedStreak(streak);
                      setShowForm(true);
                    }}
                    onClick={() => handleStreakClick(streak)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="calendar">
            {streaks.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No streaks to display
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Create your first streak to see the calendar view
                </p>
                <Button onClick={() => setShowForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Streak
                </Button>
              </div>
            ) : selectedStreak ? (
              <div className="space-y-4">
                {/* Streak selector dropdown */}
                <div className="flex items-center gap-4 mb-6">
                  <label className="text-sm font-medium">Select Streak:</label>
                  <select 
                    value={selectedStreak.id} 
                    onChange={(e) => {
                      const streak = streaks.find(s => s.id === e.target.value);
                      setSelectedStreak(streak);
                    }}
                    className="px-3 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600"
                  >
                    {streaks.map((streak) => (
                      <option key={streak.id} value={streak.id}>
                        {streak.name}
                      </option>
                    ))}
                  </select>
                </div>
                <StreakCalendar
                  streak={selectedStreak}
                  onToggleCompletion={toggleCompletion}
                  onBack={() => setActiveTab('streaks')}
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Select a streak to view calendar
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Click on any streak card to see its calendar view
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Streak Form Modal */}
        {showForm && (
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
