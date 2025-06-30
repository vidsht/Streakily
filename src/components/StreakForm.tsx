
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Streak } from '@/types/streak';

interface StreakFormProps {
  streak?: Streak | null;
  onSubmit: (data: Omit<Streak, 'id' | 'createdAt' | 'completions'>) => void;
  onCancel: () => void;
}

export const StreakForm = ({ streak, onSubmit, onCancel }: StreakFormProps) => {
  const [formData, setFormData] = useState({
    name: streak?.name || '',
    description: streak?.description || '',
    category: streak?.category || 'Health',
    frequency: streak?.frequency || 'daily',
    goalDuration: streak?.goalDuration || 21,
    color: streak?.color || '#3b82f6',
    timerDuration: streak?.timerDuration || undefined,
    reminderTime: streak?.reminderTime || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as any);
  };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 dark:bg-black/95 backdrop-blur-md rounded-2xl p-8 w-full max-w-lg mx-4 shadow-2xl border border-purple-200/50 dark:border-red-500/20">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-red-400 dark:to-red-600 bg-clip-text text-transparent">
            {streak ? 'Edit Streak' : 'Create New Streak'}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {streak ? 'Update your habit details' : 'Start building a new healthy habit'}
          </p>
        </div>
          <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Streak Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Morning Exercise"
              required
              className="mt-1 rounded-xl border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-red-500 focus:ring-purple-500/20 dark:focus:ring-red-500/20"
            />
          </div>
          
          <div>
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="What does this streak involve?"
              rows={3}
              className="mt-1 rounded-xl border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-red-500 focus:ring-purple-500/20 dark:focus:ring-red-500/20"
            />
          </div>
            <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  category: value as any 
                }))}
              >
                <SelectTrigger className="mt-1 rounded-xl border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="Health">Health</SelectItem>
                  <SelectItem value="Learning">Learning</SelectItem>
                  <SelectItem value="Productivity">Productivity</SelectItem>
                  <SelectItem value="Mindfulness">Mindfulness</SelectItem>
                  <SelectItem value="Creative">Creative</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="frequency" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  frequency: value as any 
                }))}
              >
                <SelectTrigger className="mt-1 rounded-xl border-gray-300 dark:border-gray-600">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goalDuration" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Goal (days)</Label>
              <Input
                id="goalDuration"
                type="number"
                value={formData.goalDuration}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  goalDuration: parseInt(e.target.value) || 21 
                }))}
                min="1"
                className="mt-1 rounded-xl border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-red-500 focus:ring-purple-500/20 dark:focus:ring-red-500/20"
              />
            </div>
            
            <div>
              <Label htmlFor="timerDuration" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Timer (minutes)</Label>
              <Input
                id="timerDuration"
                type="number"
                value={formData.timerDuration || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  timerDuration: e.target.value ? parseInt(e.target.value) : undefined
                }))}
                placeholder="Optional"
                min="1"
                className="mt-1 rounded-xl border-gray-300 dark:border-gray-600 focus:border-purple-500 dark:focus:border-red-500 focus:ring-purple-500/20 dark:focus:ring-red-500/20"
              />
            </div>
          </div>
          
          <div className="flex gap-4 pt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel} 
              className="flex-1 rounded-xl border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 dark:from-red-600 dark:to-red-800 hover:from-purple-600 hover:to-pink-600 dark:hover:from-red-700 dark:hover:to-red-900 text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {streak ? 'Update' : 'Create'} Streak
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
