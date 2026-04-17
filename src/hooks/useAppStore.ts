import { useState, useEffect, useCallback } from 'react';
import { User, Habit, DailyImpact } from '../types';
import { HABIT_TEMPLATES, STORAGE_KEYS } from '../constants';

const INITIAL_USER: User = {
  name: 'Aisyah',
  focusArea: 'Eco Lifestyle',
  selectedHabitIds: [],
  totalPoints: 0,
  streakDays: 0,
  completedCount: 0,
  lastCompletedDate: null,
};

export const useAppStore = () => {
  const [user, setUser] = useState<User>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_DATA);
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.HABIT_HISTORY);
    if (!saved) return [];
    
    // Check if habits are for today
    const history = JSON.parse(saved);
    const today = new Date().toISOString().split('T')[0];
    
    if (history.date === today) {
      return history.habits;
    }
    
    // If different day, reset completion but keep selected habits
    return history.habits.map((h: Habit) => ({ ...h, completedToday: false }));
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USER_DATA, JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(STORAGE_KEYS.HABIT_HISTORY, JSON.stringify({
      date: today,
      habits: habits,
    }));
  }, [habits]);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser(prev => ({ ...prev, ...updates }));
  }, []);

  const selectHabits = useCallback((habitIds: string[]) => {
    const selectedHabits = HABIT_TEMPLATES.filter(h => habitIds.includes(h.id));
    setHabits(selectedHabits);
    updateUser({ selectedHabitIds: habitIds });
  }, [updateUser]);

  const toggleHabit = useCallback((id: string) => {
    setHabits(prev => {
      const newHabits = prev.map(h => {
        if (h.id === id) {
          const newState = !h.completedToday;
          
          // Update user points and streak if completed
          if (newState) {
            const today = new Date().toISOString().split('T')[0];
            const lastDate = user.lastCompletedDate;
            
            let newStreak = user.streakDays;
            if (lastDate === null) {
              newStreak = 1;
            } else {
              const yesterday = new Date();
              yesterday.setDate(yesterday.getDate() - 1);
              const yesterdayStr = yesterday.toISOString().split('T')[0];
              
              if (lastDate === yesterdayStr) {
                newStreak += 1;
              } else if (lastDate !== today) {
                newStreak = 1;
              }
            }
            
            updateUser({
              totalPoints: user.totalPoints + h.points,
              completedCount: user.completedCount + 1,
              streakDays: newStreak,
              lastCompletedDate: today,
            });
          } else {
            // Reverting points but not streak for safety
            updateUser({
              totalPoints: Math.max(0, user.totalPoints - h.points),
              completedCount: Math.max(0, user.completedCount - 1),
            });
          }
          
          return { ...h, completedToday: newState };
        }
        return h;
      });
      return newHabits;
    });
  }, [user, updateUser]);

  const getDailyImpact = useCallback((): DailyImpact[] => {
    // Mocking last 7 days for the chart
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date().getDay();
    const sortedDays = [...days.slice(today), ...days.slice(0, today)];
    
    // Random but progressive data for demo
    return sortedDays.map((day, i) => {
      const isToday = i === sortedDays.length - 1;
      const currentImpact = habits
        .filter(h => h.completedToday)
        .reduce((sum, h) => sum + h.impactValue, 0);
        
      return {
        day,
        co2: isToday ? currentImpact : (Math.random() * 2) + (i * 0.5),
      };
    });
  }, [habits]);

  return {
    user,
    habits,
    updateUser,
    selectHabits,
    toggleHabit,
    getDailyImpact,
  };
};
