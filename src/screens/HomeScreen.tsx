import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { useData } from '../providers/DataProvider';
import { TRAITS } from '../constants';
import { Search, Bell, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import TraitCard from '../components/TraitCard';

interface HomeScreenProps {
  onStartQuiz: (id: any) => void;
  onStartMBTITest: () => void;
  onStartMoodQuiz: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartQuiz, onStartMBTITest, onStartMoodQuiz }) => {
  const { profile } = useAuth();
  const { results } = useData();

  // Mock insights
  const dailyInsight = "Your empathy levels are high today. Perfect for deep conversations.";

  return (
    <div className="px-6 pt-12 space-y-8">
      {/* Header */}
      <header className="flex justify-between items-end">
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-400 tracking-widest uppercase">Hello, {profile?.displayName?.split(' ')[0] || 'Friend'}</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Your Reflection</h1>
          <p className="text-slate-500 font-medium text-sm">You're in your peak flow state today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="w-11 h-11 bg-white rounded-xl flex items-center justify-center border border-slate-200 shadow-sm text-slate-400 hover:text-violet-600 transition-colors">
            <Bell size={20} />
          </button>
          <div className="w-12 h-12 rounded-xl border-2 border-white shadow-md p-0.5 overflow-hidden ring-2 ring-violet-100">
            <img 
              src={profile?.photoURL || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"} 
              alt="Profile" 
              className="w-full h-full rounded-[10px] object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main MBTI Card */}
      <motion.div
        whileHover={{ y: -8, shadow: "0 25px 50px -12px rgba(124, 58, 237, 0.25)" }}
        className="relative overflow-hidden rounded-[2.5rem] p-10 text-white shadow-xl shadow-violet-200 group cursor-pointer"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' }}
      >
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute bottom-[-20%] left-[-10%] w-48 h-48 bg-indigo-400/20 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
        
        <div className="relative z-10 flex flex-col h-full space-y-8">
          <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest w-fit">Primary Analysis</span>
          <div className="space-y-4">
            <h2 className="text-5xl font-black leading-tight tracking-tighter">
              {profile?.mbtiType ? `${profile.mbtiType} - The Visionary` : <>Global<br />Personality Test</>}
            </h2>
            <p className="text-indigo-100 text-lg opacity-90 max-w-[280px] font-medium leading-relaxed">
              {profile?.mbtiType ? 'Your logical depth is your greatest asset.' : 'Discover your 4-letter type and professional potential.'}
            </p>
          </div>
          <button 
            onClick={onStartMBTITest}
            className="w-fit bg-white text-violet-600 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 group transition-all shadow-lg hover:shadow-white/20 active:scale-95"
          >
            {profile?.mbtiType ? 'Re-take Test' : 'Start Journey'}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>

      {/* Daily Emotion Check Card */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={onStartMoodQuiz}
        className="relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-lg cursor-pointer transition-all"
        style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)' }}
      >
        <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-2">
            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">New Session</span>
            <h3 className="text-2xl font-black tracking-tight">How are you feeling today?</h3>
            <p className="text-blue-100/80 text-sm font-medium">Take a quick emotional check-in</p>
            <div className="pt-4">
              <span className="bg-white text-blue-600 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 group shadow-lg">
                Start Mood Test
                <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
          <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center text-5xl shadow-inner border border-white/20">
            😌
          </div>
        </div>
      </motion.div>

      {/* Daily Insight */}
      <section className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex items-center gap-6">
        <div className="w-16 h-16 bg-violet-50 rounded-[1.5rem] flex items-center justify-center text-violet-600 shadow-inner">
          <Sparkles size={28} />
        </div>
        <div className="flex-1 space-y-1.5">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Daily Insight</h4>
          <p className="text-slate-700 font-medium leading-relaxed italic">"{dailyInsight}"</p>
        </div>
      </section>

      {/* Traits Section */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Personality Traits</h3>
          <button className="text-[11px] font-black text-violet-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">View All Details</button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {TRAITS.slice(0, 4).map((trait) => (
            <TraitCard
              key={trait.id}
              name={trait.name}
              description={trait.description}
              iconName={trait.iconName}
              percentage={profile?.traitsProgress[trait.id]}
              onClick={() => onStartQuiz(trait.id)}
            />
          ))}
        </div>
      </section>

      {/* Quick Stats */}
      <section className="pb-16">
        <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex justify-between items-center relative overflow-hidden shadow-2xl shadow-slate-200">
          <div className="z-10 space-y-2">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">Insights Streak</p>
            <div className="flex items-baseline gap-2">
              <span className="text-6xl font-black tracking-tighter">{profile?.streak || 1}</span>
              <span className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Solid Days</span>
            </div>
          </div>
          <div className="z-10 w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center shadow-inner">
            <div className="w-4 h-4 bg-violet-400 rounded-full animate-pulse shadow-[0_0_15px_rgba(167,139,250,0.8)]" />
          </div>
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-violet-600/30 to-transparent pointer-events-none" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
