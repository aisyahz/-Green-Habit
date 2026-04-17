import { Habit } from './types';

export const HABIT_TEMPLATES: Habit[] = [
  // Waste Less
  { id: 'waste-1', title: 'Bring reusable bottle', category: 'Waste Less', points: 10, impactValue: 0.1, completedToday: false, icon: 'Bottle' },
  { id: 'waste-2', title: 'Recycle plastic & paper', category: 'Waste Less', points: 15, impactValue: 0.3, completedToday: false, icon: 'Recycle' },
  { id: 'waste-3', title: 'Say no to plastic straws', category: 'Waste Less', points: 5, impactValue: 0.05, completedToday: false, icon: 'Ban' },
  { id: 'waste-4', title: 'Zero-waste grocery shopping', category: 'Waste Less', points: 30, impactValue: 0.8, completedToday: false, icon: 'ShoppingBag' },
  
  // Save Energy
  { id: 'energy-1', title: 'Turn off idle lights', category: 'Save Energy', points: 10, impactValue: 0.2, completedToday: false, icon: 'Lightbulb' },
  { id: 'energy-2', title: 'Unplug chargers', category: 'Save Energy', points: 5, impactValue: 0.1, completedToday: false, icon: 'Plug' },
  { id: 'energy-3', title: 'Cold water wash', category: 'Save Energy', points: 20, impactValue: 0.5, completedToday: false, icon: 'Droplets' },
  { id: 'energy-4', title: 'Set AC to 25°C', category: 'Save Energy', points: 15, impactValue: 0.4, completedToday: false, icon: 'Wind' },
  
  // Eco Lifestyle
  { id: 'life-1', title: 'Meat-free day', category: 'Eco Lifestyle', points: 50, impactValue: 2.5, completedToday: false, icon: 'Leaf' },
  { id: 'life-2', title: 'Shop local', category: 'Eco Lifestyle', points: 20, impactValue: 0.6, completedToday: false, icon: 'Store' },
  { id: 'life-3', title: 'Plant a tree (or seedling)', category: 'Eco Lifestyle', points: 100, impactValue: 10.0, completedToday: false, icon: 'Sprout' },
  { id: 'life-4', title: 'Fix something instead of buying new', category: 'Eco Lifestyle', points: 40, impactValue: 1.5, completedToday: false, icon: 'Hammer' },
  
  // Transport
  { id: 'trans-1', title: 'Bike to work/store', category: 'Transport', points: 40, impactValue: 1.2, completedToday: false, icon: 'Bike' },
  { id: 'trans-2', title: 'Use public transport', category: 'Transport', points: 30, impactValue: 0.9, completedToday: false, icon: 'Bus' },
  { id: 'trans-3', title: 'Carpooling', category: 'Transport', points: 25, impactValue: 0.7, completedToday: false, icon: 'Users' },
  { id: 'trans-4', title: 'Walk for short distances', category: 'Transport', points: 20, impactValue: 0.5, completedToday: false, icon: 'Footprints' },
];

export const STORAGE_KEYS = {
  USER_DATA: 'green_habit_user',
  HABIT_HISTORY: 'green_habit_history',
};
