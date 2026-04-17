import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconRenderer } from '../lib/utils';
import { Habit } from '../types';
import { Check, Sparkle } from 'lucide-react';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  key?: React.Key;
}

export function HabitCard({ habit, onToggle }: HabitCardProps) {
  const [showReward, setShowReward] = useState(false);
  const prevCompletedRef = useRef(habit.completedToday);

  useEffect(() => {
    // Only show reward if it was toggled TO true (not from storage or initial load)
    if (habit.completedToday && !prevCompletedRef.current) {
      setShowReward(true);
      const timer = setTimeout(() => setShowReward(false), 2000);
      return () => clearTimeout(timer);
    }
    prevCompletedRef.current = habit.completedToday;
  }, [habit.completedToday]);

  return (
    <motion.div
      layout
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onToggle(habit.id)}
      className={`relative overflow-hidden rounded-2xl p-4 transition-all duration-300 habit-item-border cursor-pointer ${
        habit.completedToday 
          ? 'bg-primary/20 border-primary/50 ring-1 ring-primary/20' 
          : 'bg-card'
      }`}
    >
      {/* Reward Popup */}
      <AnimatePresence>
        {showReward && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.5 }}
            animate={{ opacity: 1, y: -40, scale: 1.1 }}
            exit={{ opacity: 0, scale: 0.8, y: -60 }}
            className="absolute left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-highlight text-background px-3 py-1.5 rounded-full shadow-[0_10px_20px_rgba(255,213,79,0.4)] flex flex-col items-center">
               <span className="text-[12px] font-black leading-none flex items-center gap-1">
                 <Sparkle className="w-2.5 h-2.5 fill-current" />
                 +{habit.points} pts
               </span>
               <span className="text-[9px] font-bold opacity-80 mt-0.5 whitespace-nowrap">Great job 🌱</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 relative z-10">
        <motion.div 
          animate={habit.completedToday ? { 
            scale: [1, 1.25, 1],
            rotate: [0, 8, -8, 0]
          } : {}}
          transition={{ duration: 0.5 }}
          className={`w-11 h-11 rounded-xl flex items-center justify-center shadow-inner transition-colors ${habit.completedToday ? 'bg-primary text-text-primary' : 'bg-accent/15 text-accent'}`}
        >
          <IconRenderer name={habit.icon} className="w-5 h-5" />
        </motion.div>
        
        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-[15px] truncate transition-colors ${habit.completedToday ? 'text-primary-light' : 'text-text-primary'}`}>
            {habit.title}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] font-bold text-highlight">+{habit.points} pts</span>
            <span className="text-white/10 text-[8px]">•</span>
            <p className="text-[11px] font-medium text-text-secondary">
              {habit.impactValue}kg CO₂ reduction
            </p>
          </div>
        </div>

        <motion.div 
          initial={false}
          animate={habit.completedToday ? { 
            scale: [1, 1.4, 1],
            backgroundColor: "#A5D6A7"
          } : {
            scale: 1,
            backgroundColor: "transparent"
          }}
          className={`flex items-center justify-center w-6 h-6 rounded-md transition-all border-2 ${
            habit.completedToday 
              ? 'border-accent text-background font-bold' 
              : 'border-accent/40'
          }`}
        >
          {habit.completedToday && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
               <Check className="w-4 h-4 stroke-[3px]" />
            </motion.div>
          )}
        </motion.div>
      </div>

      {habit.completedToday && (
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          className="absolute bottom-0 left-0 h-1 bg-primary/40"
        />
      )}
    </motion.div>
  );
}
