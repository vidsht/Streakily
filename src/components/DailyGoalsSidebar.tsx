
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, X, Pin, Target } from 'lucide-react';
import { useDailyGoals } from '@/hooks/useDailyGoals';

interface DailyGoalsSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const DailyGoalsSidebar = ({ isOpen, onToggle }: DailyGoalsSidebarProps) => {
  const { goals, loading, addGoal, toggleGoal, deleteGoal } = useDailyGoals();
  const [newGoal, setNewGoal] = useState('');

  const handleAddGoal = () => {
    if (newGoal.trim()) {
      addGoal(newGoal.trim());
      setNewGoal('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddGoal();
    }
  };

  return (
    <>      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full bg-black/95 dark:bg-black/98 z-50 transition-transform duration-300 ease-in-out border-r border-gray-800 dark:border-red-500/20 overflow-hidden backdrop-blur-md ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '400px' }}
      >
        <div className="p-6 w-full h-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Target className="h-5 w-5 text-black" />
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Daily Goals</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-white hover:bg-red-600/20 dark:hover:bg-red-500/20 transition-all duration-200 rounded-xl"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>          {/* Add Goal Input */}
          <div className="flex gap-3 mb-6 w-full">
            <Input
              placeholder="Add a new daily goal..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-gray-900/80 border-gray-700 text-white placeholder:text-gray-400 min-w-0 rounded-xl backdrop-blur-sm focus:border-yellow-500 focus:ring-yellow-500/20"
            />
            <Button 
              onClick={handleAddGoal}
              size="sm"
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black flex-shrink-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>{/* Goals List */}
          <div 
            className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto overflow-x-hidden pr-2 goals-scrollbar"
          >
            {loading ? (
              <div className="text-white text-center py-8">Loading goals...</div>            ) : goals.length === 0 ? (
              <div className="text-gray-400 text-center py-12">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-yellow-400/60" />
                </div>
                <p className="text-lg font-medium text-gray-300 mb-2">No daily goals yet!</p>
                <p className="text-sm text-gray-500">Add your first goal above to get started.</p>
              </div>
            ) : (              goals.map((goal, index) => (
                <div
                  key={goal.id}
                  className="relative bg-gradient-to-br from-yellow-200 via-yellow-100 to-orange-100 dark:from-yellow-300 dark:via-yellow-200 dark:to-orange-200 p-5 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl w-full box-border transform hover:scale-[1.02] backdrop-blur-sm border border-yellow-300/20"
                  style={{ maxWidth: '100%' }}
                >
                  {/* Board Pin */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Pin className="h-6 w-6 text-red-600 rotate-45 drop-shadow-sm" />
                  </div>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 h-7 w-7 p-0 hover:bg-red-500 hover:text-white flex-shrink-0 transition-all duration-200 rounded-full shadow-sm"
                    onClick={() => deleteGoal(goal.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>

                  {/* Goal Content */}
                  <div 
                    className={`cursor-pointer mt-4 ${goal.completed ? 'line-through opacity-60' : ''}`}
                    onClick={() => toggleGoal(goal.id)}
                  >
                    <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-950 pr-8 break-words overflow-wrap-anywhere leading-relaxed">
                      {goal.text}
                    </p>
                  </div>

                  {/* Completed Badge */}
                  {goal.completed && (
                    <div className="mt-3 text-green-700 text-xs font-bold bg-green-100 px-2 py-1 rounded-full inline-flex items-center gap-1">
                      <span className="text-green-600">✓</span> Completed!
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-all duration-300"
          onClick={onToggle}
        />
      )}
    </>
  );
};
