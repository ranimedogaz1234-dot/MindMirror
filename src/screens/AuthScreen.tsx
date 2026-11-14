import React from 'react';
import { useAuth } from '../providers/AuthProvider';
import { motion } from 'motion/react';
import { LogIn, Sparkles } from 'lucide-react';

const AuthScreen: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <div className="h-screen flex flex-col items-center justify-between py-20 px-8 bg-white overflow-hidden relative">
      {/* Background blobs */}
      <div className="absolute top-[-10%] right-[-20%] w-80 h-80 bg-violet-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-[10%] left-[-20%] w-60 h-60 bg-indigo-50 rounded-full blur-3xl opacity-50" />

      <div className="flex flex-col items-center text-center gap-8 z-10">
        <div className="w-20 h-20 bg-violet-600 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-violet-200">
          <Sparkles size={40} />
        </div>
        <div className="space-y-3">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900">MindMirror</h1>
          <p className="text-slate-500 text-lg font-medium max-w-[300px]">Reflect, Understand, and Grow your deeper self.</p>
        </div>
      </div>

      <div className="w-full max-w-sm space-y-6 z-10 px-4">
        <button
          onClick={signInWithGoogle}
          className="w-full h-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center gap-4 font-black text-slate-700 shadow-lg shadow-slate-100 hover:bg-slate-50 transition-all active:scale-[0.97]"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-6 h-6" />
          <span className="uppercase tracking-widest text-xs">Continue with Google</span>
        </button>
        
        <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] px-8 py-4">
          Built for modern minds • Est 2026
        </p>
      </div>
    </div>
  );
};

export default AuthScreen;
