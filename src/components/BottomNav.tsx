import React from 'react';
import { Home, Sparkles, BarChart3, User, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'tips', icon: Sparkles, label: 'Tips' },
  { id: 'stats', icon: BarChart3, label: 'Stats' },
  { id: 'profile', icon: User, label: 'Profile' },
];

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'tips', icon: Sparkles, label: 'Gemini' },
    { id: 'stats', icon: BarChart3, label: 'Impact' },
    { id: 'profile', icon: User, label: 'Hero' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-sm z-50">
      <div className="bg-card/90 backdrop-blur-xl border border-white/10 rounded-[28px] p-2 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => onTabChange(tab.id)}
              className="relative flex-1 flex flex-col items-center py-2 transition-colors group"
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabSlot"
                  className="absolute inset-0 bg-primary/20 rounded-2xl border border-primary/30"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <div className="relative flex flex-col items-center gap-1">
                <Icon className={`w-5 h-5 transition-all duration-300 ${isActive ? 'text-accent scale-110 drop-shadow-[0_0_8px_rgba(165,214,167,0.5)]' : 'text-text-secondary/50 group-hover:text-text-secondary'}`} />
                <span className={`text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${isActive ? 'text-accent opacity-100' : 'text-text-secondary/40 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'}`}>
                  {tab.label}
                </span>
              </div>

              {isActive && (
                 <motion.div 
                   layoutId="activeDotPill"
                   className="absolute -bottom-1 w-1 h-1 bg-accent rounded-full shadow-[0_0_10px_#A5D6A7]"
                 />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

