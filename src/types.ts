export type Category = 'Waste Less' | 'Save Energy' | 'Eco Lifestyle' | 'Transport';

export interface Habit {
  id: string;
  title: string;
  category: Category;
  points: number;
  impactValue: number; // CO2 reduction in kg
  completedToday: boolean;
  icon: string;
}

export interface User {
  name: string;
  focusArea: Category;
  selectedHabitIds: string[];
  totalPoints: number;
  streakDays: number;
  completedCount: number;
  lastCompletedDate: string | null;
}

export interface DailyImpact {
  day: string;
  co2: number;
}
