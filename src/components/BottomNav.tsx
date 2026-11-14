import React, { useState } from 'react';
import { Home, BarChart2, User, Grid } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export type NavTab = 'home' | 'traits' | 'analytics' | 'profile';

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'traits', icon: Grid, label: 'Traits' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 px-6 py-4 flex justify-between items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id as NavTab)}
          className={cn(
            "flex flex-col items-center gap-1.5 transition-all relative",
            activeTab === tab.id ? "text-violet-600 scale-110" : "text-slate-400 opacity-60"
          )}
        >
          <div className={cn(
            "p-2 rounded-xl transition-all",
            activeTab === tab.id ? "bg-violet-100/50" : ""
          )}>
            <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 1.5} />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-[0.1em]">{tab.label}</span>
          {activeTab === tab.id && (
            <motion.div
              layoutId="nav-indicator"
              className="absolute -top-4 w-10 h-1 bg-violet-600 rounded-full shadow-[0_-2px_10px_rgba(124,58,237,0.3)]"
            />
          )}
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
