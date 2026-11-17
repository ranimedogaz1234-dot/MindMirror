import React from 'react';
import { Home, BarChart2, User, Grid } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import type { NavTab } from '../lib/navigation';
import { useAuth } from '../providers/AuthProvider';
import Logo from './Logo';

export type { NavTab };

interface NavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export const NAV_TABS: { id: NavTab; icon: typeof Home; label: string }[] = [
  { id: 'home', icon: Home, label: 'Dashboard' },
  { id: 'traits', icon: Grid, label: 'Traits' },
  { id: 'analytics', icon: BarChart2, label: 'Analytics' },
  { id: 'profile', icon: User, label: 'Profile' },
];

/** Phone / tablet navigation: bar pinned to the bottom of the viewport. */
const BottomNav: React.FC<NavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white/80 backdrop-blur-lg border-t border-slate-200 px-6 sm:px-16 py-4 flex justify-between items-center z-50">
      {NAV_TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex flex-col items-center gap-1.5 transition-all relative',
            activeTab === tab.id ? 'text-violet-600 scale-110' : 'text-slate-400 opacity-60'
          )}
        >
          <div className={cn('p-2 rounded-xl transition-all', activeTab === tab.id ? 'bg-violet-100/50' : '')}>
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

/** Laptop / desktop navigation: fixed sidebar. */
export const SideNav: React.FC<NavProps & { onHome: () => void }> = ({ activeTab, onTabChange, onHome }) => {
  const { profile, user } = useAuth();

  return (
    <aside className="hidden lg:flex fixed inset-y-0 left-0 w-64 flex-col bg-white/80 backdrop-blur-lg border-r border-slate-200 px-5 py-8 z-40">
      <Logo onClick={onHome} className="px-2" />

      <nav className="mt-10 flex-1 space-y-1.5">
        {NAV_TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                'relative w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl text-sm font-bold transition-colors',
                active ? 'text-violet-700' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              )}
            >
              {active && (
                <motion.span layoutId="side-nav-indicator" className="absolute inset-0 bg-violet-100/60 rounded-2xl" />
              )}
              <tab.icon size={20} strokeWidth={active ? 2.5 : 1.75} className="relative" />
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 px-2 pt-6 border-t border-slate-100">
        <img
          src={profile?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
          alt=""
          className="w-10 h-10 rounded-xl object-cover ring-2 ring-violet-100 bg-violet-50"
        />
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 truncate">{profile?.displayName || 'Welcome'}</p>
          <p className="text-[11px] text-slate-400 font-medium truncate">{profile?.email || user?.email}</p>
        </div>
      </div>
    </aside>
  );
};

export default BottomNav;
