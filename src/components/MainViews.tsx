import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Leaf, Award, Flame, Search, Plus, Bell, ChevronRight, Share2, MoreHorizontal, Sparkles } from 'lucide-react';
import { User, Habit, DailyImpact } from '../types';
import { StatCard } from '../components/StatCard';
import { HabitCard } from '../components/HabitCard';
import { AIQuoteCard } from '../components/AIQuoteCard';
import { ImpactChart } from '../components/ImpactChart';
import { IconRenderer } from '../lib/utils';

interface MainViewsProps {
  view: string;
  user: User;
  habits: Habit[];
  onToggleHabit: (id: string) => void;
  dailyImpact: DailyImpact[];
  key?: React.Key;
}

export function HomeView({ user, habits, onToggleHabit }: Omit<MainViewsProps, 'view' | 'dailyImpact'>) {
  const completedCount = habits.filter(h => h.completedToday).length;
  const progressPercent = habits.length > 0 ? (completedCount / habits.length) * 100 : 0;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 px-4 pt-10 flex flex-col gap-6 max-w-md mx-auto"
    >
      <header className="flex items-center justify-between px-2">
        <div>
          <h1 className="text-xl font-black text-text-primary leading-tight tracking-tight">
            Keep at it, {user.name.split(' ')[0]}! 🌿
          </h1>
          <p className="text-text-secondary text-[12px] font-medium opacity-80">{today}</p>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent to-primary flex items-center justify-center font-black text-background shadow-[0_8px_20px_rgba(165,214,167,0.4)] text-lg">
          {user.name.charAt(0)}
        </div>
      </header>

      {/* Daily Progress Overview */}
      <section className="px-2">
        <div className="bg-card/50 rounded-3xl p-5 border border-white/5 shadow-xl">
          <div className="flex justify-between items-end mb-3">
             <div className="flex flex-col">
                <span className="text-[10px] font-black text-accent uppercase tracking-widest">Daily Progress</span>
                <span className="text-lg font-black text-text-primary">{completedCount} of {habits.length} Habits</span>
             </div>
             <span className="text-2xl font-black text-highlight">{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-2 w-full bg-background rounded-full overflow-hidden">
             <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-primary to-accent"
             />
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3 px-1">
        <StatCard 
          label="Total Impact" 
          value={user.totalPoints} 
          icon="Zap" 
          color="#FFD54F" 
          trend="Pts"
        />
        <StatCard 
          label="Current Streak" 
          value={user.streakDays} 
          icon="Flame" 
          color="#FF7043" 
          trend="Days"
        />
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🌿</span>
            <h2 className="text-[12px] font-black text-text-secondary uppercase tracking-[0.2em]">Today's Missions</h2>
          </div>
          <span className="text-[10px] font-bold text-accent bg-accent/10 px-2 py-1 rounded-lg">Eco-Friendly</span>
        </div>
        
        <div className="flex flex-col gap-3">
          {habits.map((habit) => (
            <HabitCard 
              key={habit.id} 
              habit={habit} 
              onToggle={onToggleHabit} 
            />
          ))}
          <button className="mt-2 py-4 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center gap-2 text-text-secondary text-[11px] font-bold uppercase tracking-widest hover:border-accent/40 hover:text-accent transition-all">
            <Plus className="w-3.5 h-3.5" /> Discovery Mode
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2 px-2">
          <Sparkles className="w-4 h-4 text-highlight" />
          <h2 className="text-[12px] font-black text-text-secondary uppercase tracking-[0.2em]">Eco Insights</h2>
        </div>
        <AIQuoteCard completedHabits={habits} />
      </section>
    </motion.div>
  );
}

export function StatsView({ dailyImpact, user }: Omit<MainViewsProps, 'view' | 'onToggleHabit' | 'habits'>) {
  const totalCo2Saved = dailyImpact.reduce((sum, d) => sum + d.co2, 0).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pb-32 px-4 pt-10 flex flex-col gap-8 max-w-md mx-auto"
    >
      <header className="px-2">
        <h1 className="text-3xl font-black text-text-primary tracking-tight">Environmental Impact</h1>
        <p className="text-text-secondary text-[12px] mt-1 font-medium opacity-70 italic">Every seed grows into a forest.</p>
      </header>
      
      <section className="ai-tip-gradient rounded-[32px] p-8 shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <h2 className="text-accent text-[10px] font-black uppercase tracking-[0.2em]">CO₂ Savings Analysis</h2>
            <p className="text-xs text-text-secondary/60 mt-0.5">Kilograms of carbon prevented</p>
          </div>
          <div className="flex gap-1.5 p-1 bg-background/50 rounded-xl">
            <span className="text-[9px] font-black px-3 py-1.5 rounded-lg bg-accent text-background shadow-lg">WEEK</span>
            <span className="text-[9px] font-black px-3 py-1.5 rounded-lg text-text-secondary/50">MONTH</span>
          </div>
        </div>
        <ImpactChart data={dailyImpact} />
        
        <div className="mt-8 flex items-end justify-between border-t border-white/5 pt-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <Leaf className="w-4 h-4 text-accent" />
               <span className="text-[10px] text-text-secondary uppercase tracking-widest font-black">Lifetime Impact</span>
            </div>
            <p className="text-5xl font-black text-highlight leading-none tracking-tighter">{totalCo2Saved}</p>
            <p className="text-[11px] text-text-secondary font-bold mt-2">kg CO₂ saved from the atmosphere</p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-4 bg-primary rounded-2xl text-white shadow-[0_10px_30px_rgba(27,94,32,0.4)]"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* Reward Cards Section */}
      <section className="flex flex-col gap-5">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">🏆</span>
            <h2 className="text-[12px] font-black text-text-secondary uppercase tracking-[0.2em]">Climate Milestones</h2>
          </div>
          <button className="text-[10px] font-black text-accent uppercase tracking-widest">View All</button>
        </div>

        <div className="flex flex-col gap-3">
          {[
            { id: '1', title: '7 Day Streak', sub: 'Consistency Master', icon: 'Flame', color: '#FF7043', progress: 100 },
            { id: '2', title: 'Carbon Neutralist', sub: 'Saved 10.0kg CO₂', icon: 'Leaf', color: '#4CAF50', progress: 85 },
            { id: '3', title: 'Eco Guardian', sub: 'Completed 50 Habits', icon: 'Award', color: '#FFD54F', progress: 40 },
          ].map(badge => (
            <motion.div 
              key={badge.id}
              whileHover={{ x: 5 }}
              className="bg-card/40 p-5 rounded-3xl habit-item-border flex items-center justify-between shadow-lg relative overflow-hidden group"
            >
              <div className="flex items-center gap-5 relative z-10">
                <div className="w-14 h-14 bg-background rounded-2xl flex items-center justify-center shadow-inner">
                    <IconRenderer name={badge.icon} className="w-7 h-7" style={{ color: badge.color }} />
                </div>
                <div>
                  <h4 className="text-[15px] font-black text-text-primary leading-tight tracking-tight">{badge.title}</h4>
                  <p className="text-[11px] text-text-secondary font-medium mt-0.5">{badge.sub}</p>
                  <div className="w-24 h-1 bg-background rounded-full mt-2.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${badge.progress}%` }}
                      className="h-full bg-accent/40"
                    />
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-text-secondary/30 group-hover:text-accent transition-colors" />
              
              {/* Decorative accent for completed */}
              {badge.progress === 100 && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-accent/10 rounded-bl-full pointer-events-none" />
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
