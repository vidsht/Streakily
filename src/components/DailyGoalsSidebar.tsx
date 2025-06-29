
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
    <>
      {/* Sidebar */}
      <div 
        className={`fixed left-0 top-0 h-full bg-black z-50 transition-transform duration-300 ease-in-out border-r border-gray-800 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '400px' }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6 text-yellow-400" />
              <h2 className="text-2xl font-bold text-white">Daily Goals</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="text-white hover:bg-gray-800"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Add Goal Input */}
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add a new daily goal..."
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-gray-900 border-gray-700 text-white placeholder:text-gray-400"
            />
            <Button 
              onClick={handleAddGoal}
              size="sm"
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Goals List */}
          <div className="space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
            {loading ? (
              <div className="text-white text-center py-8">Loading goals...</div>
            ) : goals.length === 0 ? (
              <div className="text-gray-400 text-center py-8">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No daily goals yet!</p>
                <p className="text-sm">Add your first goal above.</p>
              </div>
            ) : (
              goals.map((goal, index) => (
                <div
                  key={goal.id}
                  className="relative bg-yellow-200 p-4 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                  style={{
                    transform: `rotate(${(index % 2 === 0 ? 1 : -1) * (Math.random() * 3)}deg)`,
                  }}
                >
                  {/* Board Pin */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <Pin className="h-6 w-6 text-red-600 rotate-45" />
                  </div>

                  {/* Delete Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-1 right-1 h-6 w-6 p-0 hover:bg-red-500 hover:text-white"
                    onClick={() => deleteGoal(goal.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>

                  {/* Goal Content */}
                  <div 
                    className={`cursor-pointer mt-4 ${goal.completed ? 'line-through opacity-60' : ''}`}
                    onClick={() => toggleGoal(goal.id)}
                  >
                    <p className="text-sm font-medium text-yellow-900 pr-6 break-words">
                      {goal.text}
                    </p>
                  </div>

                  {/* Completed Badge */}
                  {goal.completed && (
                    <div className="mt-2 text-green-600 text-xs font-bold">
                      ✓ Completed!
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onToggle}
        />
      )}
    </>
  );
};
