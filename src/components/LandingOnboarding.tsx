import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trees, ArrowRight, Leaf, Shield, Globe, Wind, LucideIcon } from 'lucide-react';
import { HABIT_TEMPLATES } from '../constants';
import { IconRenderer } from '../lib/utils';

interface LandingViewProps {
  onStart: () => void;
  key?: React.Key;
}

interface OnboardingViewProps {
  onComplete: (area: string, habits: string[]) => void;
  key?: React.Key;
}

export function LandingView({ onStart }: LandingViewProps) {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center px-8 text-center pb-20">
      {/* Dynamic Background Elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary/30 rounded-full blur-[100px] -z-10" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.15, 0.05],
          x: [0, -40, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[120px] -z-10" 
      />
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-12 relative"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-[32px] mx-auto flex items-center justify-center shadow-[0_20px_50px_rgba(27,94,32,0.4)] mb-8 relative">
           <div className="absolute inset-0 bg-white/20 rounded-[32px] blur-sm" />
           <Leaf className="w-12 h-12 text-white relative z-10 drop-shadow-lg" />
        </div>
        
        <h1 className="text-5xl font-black text-white tracking-tighter mb-4 leading-tight">
          GREEN<br />HABIT<br /><span className="text-accent underline decoration-primary/50 underline-offset-8">TRACKER</span>
        </h1>
        
        <p className="text-[14px] text-accent font-black uppercase tracking-[0.3em] mb-6">
          Nurture Your Planet
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-8 w-full max-w-xs"
      >
        <p className="text-text-primary/60 text-[15px] font-medium leading-relaxed">
          The gamified environmental tracker that turns small daily actions into massive climate impact.
        </p>

        <div className="flex flex-col gap-4">
           <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="bg-primary text-white px-10 py-5 rounded-[24px] font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_35px_rgba(27,94,32,0.5)] border border-primary-light/30 transition-shadow hover:shadow-[0_20px_50px_rgba(27,94,32,0.6)]"
          >
            BECOME AN ECO-HERO <ArrowRight className="w-6 h-6" />
          </motion.button>
          
          <p className="text-[10px] text-text-secondary/40 font-bold uppercase tracking-widest">
            Join 50,000+ Climate Avengers
          </p>
        </div>
      </motion.div>
    </div>
  );
}

const CATEGORIES = [
  { id: 'Waste Less', desc: 'Reduce, Reuse, Recycle', icon: Shield },
  { id: 'Save Energy', desc: 'Heat, Light & Utility', icon: Wind },
  { id: 'Eco Lifestyle', desc: 'Sustainable Diet & Care', icon: Trees },
  { id: 'Transport', desc: 'Commute Green', icon: Globe },
];

export function OnboardingView({ onComplete }: OnboardingViewProps) {
  const [step, setStep] = useState(1);
  const [area, setArea] = useState('');
  const [selectedHabits, setSelectedHabits] = useState<string[]>([]);

  const toggleHabit = (id: string) => {
    setSelectedHabits(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredHabits = HABIT_TEMPLATES.filter(h => h.category === area);

  return (
    <div className="min-h-screen bg-background p-10 flex flex-col max-w-md mx-auto">
      <div className="flex gap-2 mb-16 px-2">
        <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-primary shadow-[0_0_10px_rgba(165,214,167,0.5)]' : 'bg-white/5'}`} />
        <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 2 ? 'bg-primary shadow-[0_0_10px_rgba(165,214,167,0.5)]' : 'bg-white/5'}`} />
      </div>

      {step === 1 && (
        <motion.div
           initial={{ x: 20, opacity: 0 }}
           animate={{ x: 0, opacity: 1 }}
           className="flex-1 flex flex-col"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-black mb-4 tracking-tight leading-tight">CHOOSE YOUR MISSION.</h2>
            <p className="text-text-secondary font-medium text-[15px]">Focus on one area first to maximize your climate impact.</p>
          </div>
          
          <div className="flex flex-col gap-4 flex-1">
            {CATEGORIES.map(cat => (
              <motion.button
                key={cat.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setArea(cat.id)}
                className={`p-6 rounded-[32px] border-2 flex items-center gap-5 transition-all outline-none ${
                  area === cat.id ? 'bg-primary/20 border-accent shadow-xl' : 'bg-card border-white/5 hover:border-white/10'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${area === cat.id ? 'bg-primary text-white shadow-inner' : 'bg-background text-accent/50 group-hover:text-accent'}`}>
                  <cat.icon className="w-7 h-7" />
                </div>
                <div className="text-left">
                    <p className="font-black text-lg leading-none mb-1">{cat.id}</p>
                    <p className="text-[11px] font-bold text-text-secondary/50 uppercase tracking-wider">{cat.desc}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <button
            disabled={!area}
            onClick={() => setStep(2)}
            className="mt-10 bg-primary disabled:opacity-30 text-white py-6 rounded-[28px] font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(27,94,32,0.4)] transition-all hover:translate-y-[-2px]"
          >
            NEXT PHASE <ArrowRight className="w-6 h-6" />
          </button>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="flex-1 flex flex-col"
        >
          <div className="mb-10">
            <h2 className="text-4xl font-black mb-4 tracking-tight leading-tight">ACTIVE DEEDS.</h2>
            <p className="text-text-secondary font-medium text-[15px]">Commit to at least 3 habits to begin your eco-transformation.</p>
          </div>
          
          <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {filteredHabits.map(h => (
              <motion.button
                key={h.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleHabit(h.id)}
                className={`p-6 rounded-[24px] border-2 flex items-center justify-between transition-all text-left ${
                  selectedHabits.includes(h.id) ? 'bg-primary/20 border-accent shadow-lg' : 'bg-card border-white/5'
                }`}
              >
                <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedHabits.includes(h.id) ? 'bg-accent text-background' : 'bg-background text-accent/20'}`}>
                        <IconRenderer name={h.icon} className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="font-black text-[15px] leading-tight mb-0.5">{h.title}</p>
                        <p className="text-[11px] font-black text-highlight uppercase flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-highlight" />
                            +{h.points} Potential
                        </p>
                    </div>
                </div>
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${selectedHabits.includes(h.id) ? 'bg-accent border-accent text-background' : 'border-white/10'}`}>
                    {selectedHabits.includes(h.id) && <Leaf className="w-3 h-3 fill-current" />}
                </div>
              </motion.button>
            ))}
          </div>

          <button
            disabled={selectedHabits.length < 3}
            onClick={() => onComplete(area, selectedHabits)}
            className="mt-10 bg-primary disabled:opacity-30 text-white py-6 rounded-[28px] font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(27,94,32,0.4)] transition-all"
          >
            START TRACKING <Trees className="w-6 h-6" />
          </button>
          
          <p className="text-center mt-4 text-[10px] font-bold text-text-secondary/40 uppercase tracking-widest">
            {selectedHabits.length}/3 Habits Committed
          </p>
        </motion.div>
      )}
    </div>
  );
}

