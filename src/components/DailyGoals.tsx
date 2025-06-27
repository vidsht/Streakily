
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

interface Goal {
  id: string;
  text: string;
  completed: boolean;
}

export const DailyGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState('');

  const addGoal = () => {
    if (newGoal.trim()) {
      setGoals([...goals, {
        id: Date.now().toString(),
        text: newGoal.trim(),
        completed: false
      }]);
      setNewGoal('');
    }
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const toggleGoal = (id: string) => {
    setGoals(goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  return (
    <div id="daily-goals" className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent mb-4">
          Daily Goals 🎯
        </h2>
        <p className="text-lg text-black dark:text-gray-300 max-w-2xl mx-auto">
          Set and track your daily goals alongside your long-term streaks. Small daily wins lead to big achievements!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <Input
          placeholder="Add a new daily goal..."
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addGoal()}
          className="flex-1"
        />
        <Button 
          onClick={addGoal}
          className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-red-600 dark:to-red-800 hover:from-purple-600 hover:to-pink-600 dark:hover:from-red-700 dark:hover:to-red-900 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
        {goals.map((goal) => (
          <Card 
            key={goal.id} 
            className="bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/40 dark:to-yellow-800/40 border-yellow-300 dark:border-yellow-700 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            style={{
              transform: `rotate(${Math.random() * 4 - 2}deg)`,
            }}
          >
            <CardContent className="p-4 relative">
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-1 right-1 h-6 w-6 p-0 hover:bg-red-500 hover:text-white"
                onClick={() => deleteGoal(goal.id)}
              >
                <X className="h-3 w-3" />
              </Button>
              
              <div 
                className={`cursor-pointer ${goal.completed ? 'line-through opacity-60' : ''}`}
                onClick={() => toggleGoal(goal.id)}
              >
                <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100 pr-6">
                  {goal.text}
                </p>
              </div>
              
              {goal.completed && (
                <div className="mt-2 text-green-600 dark:text-green-400 text-xs font-bold">
                  ✓ Completed!
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {goals.length === 0 && (
        <div className="text-center py-8">
          <p className="text-black dark:text-gray-300 text-lg">
            No daily goals yet! Add your first goal above to get started. 📝
          </p>
        </div>
      )}
    </div>
  );
};
