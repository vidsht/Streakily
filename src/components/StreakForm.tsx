
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Streak } from '@/types/streak';

interface StreakFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (streak: Omit<Streak, 'id' | 'createdAt' | 'completions'>) => void;
  initialData?: Streak;
}

export const StreakForm = ({ open, onClose, onSubmit, initialData }: StreakFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    category: initialData?.category || 'Health',
    frequency: initialData?.frequency || 'daily',
    goalDuration: initialData?.goalDuration || 21,
    color: initialData?.color || '#3b82f6',
    timerDuration: initialData?.timerDuration || undefined,
    reminderTime: initialData?.reminderTime || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as any);
    onClose();
    if (!initialData) {
      setFormData({
        name: '',
        description: '',
        category: 'Health',
        frequency: 'daily',
        goalDuration: 21,
        color: '#3b82f6',
        timerDuration: undefined,
        reminderTime: ''
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Streak' : 'Create New Streak'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Streak Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Morning Exercise"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="What does this streak involve?"
              rows={2}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  category: value as any 
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
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
              <Label htmlFor="frequency">Frequency</Label>
              <Select
                value={formData.frequency}
                onValueChange={(value) => setFormData(prev => ({ 
                  ...prev, 
                  frequency: value as any 
                }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="goalDuration">Goal (days)</Label>
              <Input
                id="goalDuration"
                type="number"
                value={formData.goalDuration}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  goalDuration: parseInt(e.target.value) || 21 
                }))}
                min="1"
              />
            </div>
            
            <div>
              <Label htmlFor="timerDuration">Timer (minutes)</Label>
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
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {initialData ? 'Update' : 'Create'} Streak
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
