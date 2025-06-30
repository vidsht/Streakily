# Achievement System Documentation

## Overview
The Achievement System automatically rewards users when they reach significant milestones in their habit streaks. It provides visual feedback, sharing capabilities, and motivation to continue building good habits.

## How It Works

### Achievement Types
1. **Goal Completion**: Unlocked when users complete their set goal duration (e.g., 21 days, 30 days)
2. **Milestone**: Unlocked at predefined milestones (7, 14, 30, 50, 100 days)
3. **Consistency**: Special achievements for maintaining long-term consistency

### Achievement Components

#### 1. Achievement Badge
- Displays on the top-left corner of calendar views
- Shows the latest achievement for each streak
- Includes hover tooltip with details
- Share button for social sharing

#### 2. Achievement Notification
- Appears when a new achievement is unlocked
- Auto-dismisses after 5 seconds
- Includes sharing functionality
- Celebratory animation with sparkles

### Badge Categories
Each category has its own emoji badge:
- **Health**: 🏃‍♂️ 
- **Learning**: 🎓
- **Productivity**: 💼
- **Mindfulness**: 🧘‍♂️
- **Creative**: 🎨
- **Personal**: ⭐

### How to Trigger Achievements

1. **Create a Streak**: Set a goal duration (e.g., 21 days)
2. **Complete Days**: Mark days as completed in the calendar
3. **Reach Milestones**: 
   - Complete 7 days → Get milestone badge
   - Complete your goal duration → Get goal completion badge
   - Continue beyond goal → Get additional milestone badges

### Sharing Features
When sharing an achievement, the system generates text like:
```
🎉 Just unlocked: Health Champion! 🏆

Completed 21 days of "Morning Exercise" - Your dedication has paid off!

Building better habits with Streakily! 💪

#Streakily #HabitBuilding #Consistency
```

### Storage
- Achievements are stored in localStorage
- Persistent across browser sessions
- Each achievement includes timestamp and metadata

### Testing
To test achievements quickly:
1. Create a streak with a low goal (e.g., 3 days)
2. Mark days as completed
3. Watch for achievement notification
4. Check badge appears on calendar

## Technical Implementation

### Files Created/Modified
- `types/achievement.ts` - Achievement data structures
- `hooks/useAchievements.ts` - Achievement logic and state management
- `components/AchievementBadge.tsx` - Badge display component
- `components/AchievementNotification.tsx` - Notification popup
- `components/StreakCalendar.tsx` - Updated to show badges
- `components/StreakDashboard.tsx` - Integrated achievement system

### Key Features
- Automatic achievement detection
- Visual celebrations
- Social sharing capabilities
- Persistent storage
- Responsive design
- Dark/light theme support
