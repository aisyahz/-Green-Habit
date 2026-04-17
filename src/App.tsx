import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useAppStore } from './hooks/useAppStore';
import { LandingView, OnboardingView } from './components/LandingOnboarding';
import { HomeView, StatsView } from './components/MainViews';
import { BottomNav } from './components/BottomNav';
import { ImpactChart } from './components/ImpactChart';
import { AIQuoteCard } from './components/AIQuoteCard';
import { Category } from './types';

export default function App() {
  const { user, habits, toggleHabit, selectHabits, updateUser, getDailyImpact } = useAppStore();
  const [view, setView] = useState<'landing' | 'onboarding' | 'home' | 'stats' | 'tips' | 'profile'>('landing');

  // Check if onboarding is needed
  useEffect(() => {
    if (user.selectedHabitIds.length > 0) {
      setView('home');
    }
  }, []);

  const handleStart = () => setView('onboarding');
  
  const handleOnboardingComplete = (area: string, selectedHabits: string[]) => {
    updateUser({ focusArea: area as Category, selectedHabitIds: selectedHabits });
    selectHabits(selectedHabits);
    setView('home');
  };

  const activeTab = view === 'home' || view === 'stats' || view === 'tips' || view === 'profile' ? view : 'home';

  const renderContent = () => (
    <AnimatePresence mode="wait">
      {view === 'landing' && (
        <LandingView key="landing" onStart={handleStart} />
      )}

      {view === 'onboarding' && (
        <OnboardingView key="onboarding" onComplete={handleOnboardingComplete} />
      )}

      {activeTab === 'home' && (
        <HomeView 
          key="home" 
          user={user} 
          habits={habits} 
          onToggleHabit={toggleHabit} 
        />
      )}

      {activeTab === 'stats' && (
        <StatsView 
          key="stats" 
          user={user} 
          dailyImpact={getDailyImpact()} 
        />
      )}
      
      {(activeTab === 'tips' || activeTab === 'profile') && (
          <motion.div 
              key="placeholder"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center p-12 text-center h-full gap-4"
          >
              <div className="bg-card w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                      <Trees className="w-8 h-8 text-primary" />
                  </motion.div>
              </div>
              <h2 className="text-xl font-bold">Coming Soon!</h2>
              <p className="text-text-secondary text-sm max-w-xs">We are growing new features for you.</p>
              <button 
                 onClick={() => setView('home')}
                 className="mt-4 px-5 py-2.5 bg-primary text-sm rounded-xl font-bold"
              >
                  Back Home
              </button>
          </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-background text-text-primary overflow-x-hidden selection:bg-primary/30 flex items-center justify-center p-4">
      <div className="hidden lg:grid lg:grid-cols-[400px_1fr] gap-16 w-full max-w-6xl items-center py-12">
        {/* Mobile Frame Container */}
        <div className="phone-frame w-[360px] h-[720px] mx-auto relative group">
          <div className="bg-background w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar pb-24">
            {renderContent()}
          </div>
          {(activeTab === 'home' || activeTab === 'stats' || activeTab === 'tips' || activeTab === 'profile') && (
            <BottomNav activeTab={activeTab} onTabChange={(tab) => setView(tab as any)} />
          )}
        </div>

        {/* Desktop Content Side */}
        <div className="flex flex-col gap-10">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-4"
          >
            <h1 className="text-6xl font-black hero-gradient-text leading-[1.1]">
              Small habits.<br />Big impact.
            </h1>
            <p className="text-xl text-text-secondary max-w-md">
              Join thousands of users building a sustainable future, one green choice at a time.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h2 className="text-sm font-bold text-accent uppercase tracking-widest">
                🌱 Active Progress
              </h2>
              <ImpactChart data={getDailyImpact()} />
            </div>
            
            <AIQuoteCard completedHabits={habits} />
          </div>
        </div>
      </div>

      {/* Actual Mobile Content (for real phones or tablets) */}
      <div className="lg:hidden w-full max-w-md mx-auto min-h-screen pb-32">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>

        {(view === 'home' || view === 'stats' || view === 'tips' || view === 'profile') && (
          <BottomNav activeTab={activeTab} onTabChange={(tab) => setView(tab as any)} />
        )}
      </div>
    </div>
  );
}

import { Trees } from 'lucide-react';

