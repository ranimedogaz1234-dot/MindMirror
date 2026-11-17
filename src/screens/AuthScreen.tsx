import React, { useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BarChart3, Eye, EyeOff, Loader2, ShieldCheck, Sparkles } from 'lucide-react';
import { TRAITS } from '../constants';
import Logo from '../components/Logo';
import type { Intent } from '../lib/navigation';

type AuthMode = 'signin' | 'signup' | 'reset';

interface AuthScreenProps {
  initialMode?: AuthMode;
  /** What the visitor was trying to do; shown so they know they will be taken back to it. */
  intent?: Intent | null;
  /** Leaves the sign-in screen without signing in. */
  onClose?: () => void;
}

const inputClass =
  'w-full h-12 lg:h-[3.25rem] px-5 bg-white border border-violet-100 rounded-2xl shadow-sm shadow-violet-100/50 text-[15px] font-medium text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-violet-500/10 focus:border-violet-300 transition-all disabled:opacity-60';

const labelClass = 'block text-sm font-bold text-[#4C3D8F] mb-2';

const TITLES: Record<AuthMode, { title: string; subtitle: string; submit: string }> = {
  signin: { title: 'Sign In', subtitle: 'Welcome back. Your reflection is waiting.', submit: 'Log in' },
  signup: { title: 'Sign Up', subtitle: 'Create your free account in a few seconds.', submit: 'Create account' },
  reset: { title: 'Reset Password', subtitle: 'Enter your email and we will send you a reset link.', submit: 'Send reset link' },
};

function describeIntent(intent: Intent | null | undefined): string | null {
  if (!intent) return null;
  switch (intent.kind) {
    case 'quiz': {
      const trait = TRAITS.find((t) => t.id === intent.traitId);
      return `Sign in to start the ${trait?.name ?? 'trait'} test — we'll take you straight there.`;
    }
    case 'mbti':
      return "Sign in to start the Personality Test — we'll take you straight there.";
    case 'mood':
      return "Sign in to log today's mood — we'll take you straight there.";
    case 'tab':
      return intent.tab === 'home'
        ? 'Sign in to open your dashboard.'
        : `Sign in to open your ${intent.tab === 'traits' ? 'traits' : intent.tab}.`;
  }
}

/** Ribbon of fine lines, echoing the reference sign-in artwork. */
const WaveRibbon: React.FC<{ className?: string }> = ({ className }) => {
  const lines = Array.from({ length: 34 }, (_, i) => {
    const t = i / 33;
    const a = 70 + t * 62;
    const b = 150 - t * 96;
    const c = 40 + t * 88;
    const d = 118 - t * 52;
    return `M -20 ${a} C 70 ${a - 70}, 140 ${b + 40}, 230 ${b} S 380 ${c - 30}, 430 ${c} S 540 ${d + 30}, 640 ${d}`;
  });

  return (
    <svg viewBox="0 0 620 200" preserveAspectRatio="none" className={className} aria-hidden>
      <defs>
        <linearGradient id="mm-wave" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="35%" stopColor="#C084FC" />
          <stop offset="65%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#F0ABFC" />
        </linearGradient>
      </defs>
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="url(#mm-wave)" strokeWidth="1.1" opacity={0.75} />
      ))}
    </svg>
  );
};

const AuthScreen: React.FC<AuthScreenProps> = ({ initialMode = 'signin', intent, onClose }) => {
  const { signInWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } = useAuth();

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setPassword('');
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (mode === 'signin') {
        await signInWithEmail(email.trim(), password);
      } else if (mode === 'signup') {
        // A successful sign-up also signs the visitor in; the app then
        // resumes whatever they were doing.
        await signUpWithEmail(email.trim(), password);
      } else {
        const ok = await resetPassword(email.trim());
        if (ok) switchMode('signin');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } finally {
      setSubmitting(false);
    }
  };

  const copy = TITLES[mode];
  const intentMessage = describeIntent(intent);

  return (
    <div className="relative min-h-screen mm-wash flex items-center justify-center sm:p-6 lg:p-10">
      <div className="absolute inset-0 mm-grid opacity-60 pointer-events-none" />

      <div className="relative w-full sm:max-w-md lg:max-w-5xl min-h-screen sm:min-h-0 sm:max-h-[calc(100vh-3rem)] lg:max-h-[calc(100vh-5rem)] bg-gradient-to-b from-[#F3ECFF] to-[#EFE9FF] sm:bg-none sm:bg-white/90 sm:backdrop-blur-xl sm:rounded-[2.5rem] sm:shadow-2xl sm:shadow-violet-200/60 sm:border sm:border-white overflow-hidden lg:grid lg:grid-cols-2">
        {/* ── Brand panel (desktop) ── */}
        <div className="hidden lg:flex relative flex-col justify-between p-10 xl:p-12 bg-gradient-to-br from-[#EDE7FF] via-[#F3ECFF] to-[#E6E9FF] overflow-hidden">
          <Logo onClick={onClose} />
          <WaveRibbon className="absolute inset-x-0 top-[20%] w-full h-44 xl:h-56" />
          <div className="relative space-y-5">
            <h2 className="font-display font-medium text-4xl xl:text-5xl leading-[1.08] tracking-tight text-slate-900">
              A calm place to understand yourself
            </h2>
            <ul className="space-y-3 text-[15px] font-medium text-slate-600">
              <li className="flex items-center gap-3"><Sparkles size={18} className="text-violet-500 shrink-0" /> Personality and trait tests</li>
              <li className="flex items-center gap-3"><BarChart3 size={18} className="text-violet-500 shrink-0" /> Mood history and analytics</li>
              <li className="flex items-center gap-3"><ShieldCheck size={18} className="text-violet-500 shrink-0" /> Results only you can see</li>
            </ul>
          </div>
        </div>

        {/* ── Form panel ── */}
        <div className="relative flex flex-col overflow-y-auto px-7 sm:px-10 lg:px-12 xl:px-14 pt-6 pb-10 lg:py-10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              aria-label="Back to MindMirror"
              className="w-11 h-11 -ml-2 rounded-full flex items-center justify-center text-slate-700 hover:bg-white/70 transition-colors"
            >
              <ArrowLeft size={22} />
            </button>
            <Logo className="lg:hidden [&>span:last-child]:text-xl" />
            <span className="w-9 lg:hidden" />
          </div>

          {/* Wave artwork (phones / tablets) */}
          <WaveRibbon className="lg:hidden -mx-7 sm:-mx-10 w-[calc(100%+3.5rem)] sm:w-[calc(100%+5rem)] h-32 sm:h-36 mt-2" />

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col justify-center lg:mt-2"
            >
              <div className="text-center lg:text-left">
                <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-[#4C3D8F]">{copy.title}</h1>
                <p className="mt-1.5 text-[15px] font-medium text-slate-500">{copy.subtitle}</p>
              </div>

              {intentMessage && mode !== 'reset' && (
                <p className="mt-4 bg-violet-100/70 border border-violet-200/70 text-violet-800 text-sm font-medium rounded-2xl px-4 py-3 text-center lg:text-left">
                  {intentMessage}
                </p>
              )}

              <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                <div>
                  <label htmlFor="auth-email" className={labelClass}>Email address</label>
                  <input
                    id="auth-email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={submitting}
                    className={inputClass}
                  />
                </div>

                {mode !== 'reset' && (
                  <div>
                    <label htmlFor="auth-password" className={labelClass}>Password</label>
                    <div className="relative">
                      <input
                        id="auth-password"
                        type={showPassword ? 'text' : 'password'}
                        required
                        minLength={6}
                        autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                        placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={submitting}
                        className={`${inputClass} pr-14`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-violet-400 hover:text-violet-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'signin' && (
                  <div className="flex justify-end -mt-1">
                    <button
                      type="button"
                      onClick={() => switchMode('reset')}
                      className="text-sm font-medium text-violet-500 hover:text-violet-700 transition-colors"
                    >
                      Forgot Password
                    </button>
                  </div>
                )}

                {mode === 'signup' && (
                  <p className="text-xs font-medium text-slate-400 -mt-1">
                    We will email you a link to verify your address.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 lg:h-[3.25rem] bg-[#7B61FF] text-white rounded-2xl flex items-center justify-center gap-2.5 text-lg font-bold shadow-[0_6px_0_0_rgba(123,97,255,0.25)] hover:bg-violet-600 transition-all active:translate-y-0.5 active:shadow-none disabled:opacity-70"
                >
                  {submitting && <Loader2 size={18} className="animate-spin" />}
                  {copy.submit}
                </button>
              </form>

              {mode === 'reset' ? (
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="mt-6 text-sm font-medium text-slate-500 hover:text-slate-700 text-center"
                >
                  Back to sign in
                </button>
              ) : (
                <>
                  <div className="flex items-center gap-4 my-5">
                    <div className="h-px flex-1 bg-violet-200/70" />
                    <span className="text-sm font-medium text-violet-400">or continue with</span>
                    <div className="h-px flex-1 bg-violet-200/70" />
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogle}
                    disabled={submitting}
                    className="w-full h-12 lg:h-[3.25rem] bg-white/70 border border-violet-200 rounded-full flex items-center justify-center gap-3 text-[15px] font-bold text-slate-700 hover:bg-white transition-all active:scale-[0.98] disabled:opacity-60"
                  >
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="" className="w-5 h-5" />
                    Continue with Google
                  </button>

                  <p className="mt-5 text-center text-sm font-medium text-slate-500">
                    {mode === 'signin' ? (
                      <>
                        Don't have an account?{' '}
                        <button type="button" onClick={() => switchMode('signup')} className="font-bold text-violet-600 hover:text-violet-700">
                          Sign up
                        </button>
                      </>
                    ) : (
                      <>
                        Already have an account?{' '}
                        <button type="button" onClick={() => switchMode('signin')} className="font-bold text-violet-600 hover:text-violet-700">
                          Log in
                        </button>
                      </>
                    )}
                  </p>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
