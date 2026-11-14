import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { LogOut, Settings, Shield, Bell, HelpCircle, ChevronRight, User, Mail, Calendar, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, formatDate } from '../lib/utils';

const ProfileScreen: React.FC = () => {
  const { profile, logout } = useAuth();
  const [view, setView] = useState<'menu' | 'details'>('menu');

  const menuItems = [
    { icon: User, label: 'Personal Information', color: 'text-blue-500', bg: 'bg-blue-50', action: () => setView('details') },
  ];

  if (view === 'details') {
    return (
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="px-6 pt-12 space-y-8 pb-10"
      >
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setView('menu')}
            className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Personal Information</h1>
            <p className="text-sm text-slate-500 font-medium">Your profile details</p>
          </div>
        </div>

        <div className="bg-white rounded-[2rem] p-8 border border-slate-50 shadow-sm space-y-6">
          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
              <User size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</p>
              <p className="font-bold text-slate-900">{profile?.displayName || 'N/A'}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
              <Mail size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</p>
              <p className="font-bold text-slate-900">{profile?.email || 'N/A'}</p>
            </div>
          </div>


          <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
            <div className="w-12 h-12 bg-violet-50 text-violet-500 rounded-xl flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Active</p>
              <p className="font-bold text-slate-900">{profile?.lastActive ? formatDate(profile.lastActive).toLocaleDateString() : 'N/A'}</p>
            </div>
          </div>
        </div>

        <div className="bg-violet-600 rounded-[2rem] p-6 text-white flex items-center justify-between shadow-xl shadow-violet-100">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
               <Settings size={20} />
             </div>
             <div>
               <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Streak</p>
               <p className="text-xl font-black">{profile?.streak || 0} Days</p>
             </div>
          </div>
          {profile?.mbtiType && (
            <div className="text-right">
              <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">MBTI</p>
              <p className="text-xl font-black">{profile.mbtiType}</p>
            </div>
          )}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="px-6 pt-12 space-y-8 pb-10">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Settings</h1>
        <p className="text-slate-500 font-medium">Manage your account and preferences</p>
      </div>

      <header className="flex flex-col items-center text-center space-y-4">
        <div className="relative">
          <div className="w-24 h-24 rounded-[32px] border-4 border-white shadow-xl overflow-hidden">
            <img 
              src={profile?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center text-white border-2 border-white">
             <Settings size={14} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{profile?.displayName || 'Adventurer'}</h2>
          <p className="text-sm text-gray-500">{profile?.email}</p>
        </div>
      </header>

      {/* Menu List */}
      <div className="space-y-3">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="w-full bg-white px-6 py-5 rounded-[1.5rem] border border-slate-50 flex items-center justify-between group active:scale-[0.98] transition-all shadow-sm"
          >
            <div className="flex items-center gap-5">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner", item.bg, item.color)}>
                <item.icon size={22} />
              </div>
              <span className="font-bold text-slate-700 tracking-tight">{item.label}</span>
            </div>
            <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-900 transition-colors" />
          </button>
        ))}
      </div>

      <button
        onClick={logout}
        className="w-full h-16 rounded-[1.5rem] border-2 border-red-50 text-red-500 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-red-50 transition-all active:scale-95 mb-4"
      >
        <LogOut size={22} strokeWidth={3} />
        Log Out Session
      </button>

      <p className="text-center text-[10px] text-gray-300 font-bold uppercase tracking-[0.2em]">MindMirror v1.0.0</p>
    </div>
  );
};

export default ProfileScreen;
