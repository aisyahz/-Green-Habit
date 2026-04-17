import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw, MessageSquarePlus, Trees } from 'lucide-react';
import { generateEcoTip } from '../services/geminiService';
import { Habit } from '../types';

interface AIQuoteCardProps {
  completedHabits: Habit[];
}

export function AIQuoteCard({ completedHabits }: AIQuoteCardProps) {
  const [tip, setTip] = useState<string>("Analyzing your green deeds...");
  const [loading, setLoading] = useState(false);

  const fetchTip = async () => {
    setLoading(true);
    const completedTitles = completedHabits
      .filter(h => h.completedToday)
      .map(h => h.title);
    
    try {
      const newTip = await generateEcoTip(completedTitles);
      setTip(newTip || "Continue your green journey! Every small action counts towards a sustainable future.");
    } catch (e) {
      setTip("Keep up the great work! Your habits are making a real difference.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTip();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="gemini-glow ai-tip-gradient rounded-[24px] p-6 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5"
    >
      <div className="absolute top-0 right-6">
        <div className="bg-highlight text-background text-[9px] font-black px-4 py-1.5 rounded-b-xl uppercase tracking-[0.2em] shadow-lg flex items-center gap-1.5">
          <Sparkles className="w-2.5 h-2.5" />
          Powered by Gemini
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <p className="text-[11px] font-black text-accent uppercase tracking-[0.1em]">
          Smart Eco Analysis
        </p>
        <button 
          onClick={fetchTip}
          disabled={loading}
          className={`p-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors ${loading ? 'animate-spin' : ''}`}
        >
          <RefreshCw className="w-3 h-3 text-accent" />
        </button>
      </div>

      <AnimatePresence mode="wait">
        {!loading ? (
          <motion.div
            key="tip"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-[16px] font-medium leading-[1.6] text-text-primary">
              "{tip}"
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3 py-2"
          >
            <div className="h-4 bg-white/5 rounded-full w-full animate-pulse opacity-20" />
            <div className="h-4 bg-white/5 rounded-full w-3/4 animate-pulse opacity-20" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative Blur */}
      <div className="absolute -bottom-12 -left-12 w-24 h-24 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
    </motion.div>
  );
}


