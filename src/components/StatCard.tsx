import React from 'react';
import { motion } from 'motion/react';
import { IconRenderer } from '../lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
}

export function StatCard({ label, value, icon, color, trend }: StatCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-4 stat-card-border flex flex-col gap-1 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-[0.05em]">{label}</p>
        <div className="opacity-60">
           <IconRenderer name={icon} className="w-3.5 h-3.5" style={{ color }} />
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-highlight leading-none">{value}</p>
        {trend && (
          <span className="text-[8px] font-black text-accent/80 uppercase tracking-tighter">
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
}
