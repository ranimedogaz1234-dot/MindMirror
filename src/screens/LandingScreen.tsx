import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowRight,
  BarChart3,
  Brain,
  Compass,
  Heart,
  LayoutDashboard,
  ShieldCheck,
  Smile,
  Sparkles,
  Sun,
} from 'lucide-react';
import { useAuth } from '../providers/AuthProvider';
import { TRAITS } from '../constants';
import { QUESTIONS } from '../questions';
import TraitCard from '../components/TraitCard';
import Logo from '../components/Logo';
import type { Intent } from '../lib/navigation';

interface LandingScreenProps {
  /** Starts a test or opens a private page; signed-out visitors are asked to sign in first. */
  onAction: (intent: Intent) => void;
  onLogin: () => void;
  onSignup: () => void;
}

const MBTI_QUESTION_COUNT = 20;
const MOOD_QUESTION_COUNT = 6;

const FEATURES = [
  {
    icon: Brain,
    title: 'Personality tests',
    text: 'A 4-letter personality type plus ten focused trait quizzes, from Openness to Empathy.',
    tone: 'bg-violet-50 text-violet-600',
  },
  {
    icon: Smile,
    title: 'Daily mood check-ins',
    text: 'Six quick questions turn how you feel today into a mood you can look back on.',
    tone: 'bg-blue-50 text-blue-600',
  },
  {
    icon: BarChart3,
    title: 'Clear analytics',
    text: 'Trait balance, score history and mood patterns, charted as your results add up.',
    tone: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: ShieldCheck,
    title: 'Private by design',
    text: 'Your results are tied to your account. Nobody else can read them — not even other members.',
    tone: 'bg-amber-50 text-amber-600',
  },
];

const STEPS = [
  { title: 'Pick a test', text: 'Browse everything freely. No account is needed to look around.' },
  { title: 'Answer honestly', text: 'Short, single-tap questions. Most tests take about two minutes.' },
  { title: 'See your reflection', text: 'Results are saved to your private dashboard so you can track how you change.' },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

const inView = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const LandingScreen: React.FC<LandingScreenProps> = ({ onAction, onLogin, onSignup }) => {
  const { user, profile } = useAuth();
  const openDashboard = () => onAction({ kind: 'tab', tab: 'home' });

  return (
    <div className="min-h-screen bg-white text-slate-800">
      {/* ───────────── Navigation ───────────── */}
      <header className="sticky top-0 z-50 bg-[#faf9ff]/80 backdrop-blur-lg border-b border-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 h-[72px] flex items-center justify-between gap-3">
          <Logo onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

          <nav className="hidden md:flex items-center gap-8 text-[15px] font-medium text-slate-600">
            <button onClick={() => scrollToSection('tests')} className="hover:text-slate-900 transition-colors">Tests</button>
            <button onClick={() => scrollToSection('features')} className="hover:text-slate-900 transition-colors">Features</button>
            <button onClick={() => scrollToSection('how-it-works')} className="hover:text-slate-900 transition-colors">How It Works</button>
          </nav>

          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={openDashboard}
                className="h-11 px-4 sm:px-6 rounded-full bg-slate-900 text-white text-sm font-semibold flex items-center gap-2 shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-colors active:scale-95"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </button>
              <button
                onClick={() => onAction({ kind: 'tab', tab: 'profile' })}
                aria-label="Your profile"
                className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-violet-200 bg-violet-50 shrink-0"
              >
                <img
                  src={profile?.photoURL || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1 sm:gap-3">
              <button
                onClick={onLogin}
                className="h-11 px-3 sm:px-4 rounded-full text-sm sm:text-[15px] font-medium text-slate-700 hover:text-slate-900 transition-colors whitespace-nowrap"
              >
                Log In
              </button>
              <button
                onClick={onSignup}
                className="h-11 px-4 sm:px-6 rounded-full bg-slate-900 text-white text-sm sm:text-[15px] font-semibold shadow-lg shadow-slate-900/10 hover:bg-slate-800 transition-colors active:scale-95 whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </header>

      {/* ───────────── Hero ───────────── */}
      <section className="relative overflow-hidden mm-wash">
        <div className="absolute inset-0 mm-grid opacity-70 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-14 sm:pt-20 lg:pt-24">
          <div className="relative mx-auto max-w-3xl text-center">
            {/* Floating accents */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex absolute -right-16 xl:-right-24 -top-4 w-16 h-16 rounded-full bg-white shadow-xl shadow-violet-200/60 items-center justify-center"
            >
              <span className="w-11 h-11 rounded-full bg-violet-400 flex items-center justify-center text-white">
                <Heart size={18} fill="currentColor" />
              </span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="hidden lg:flex absolute -left-14 xl:-left-20 bottom-10 w-14 h-14 rounded-full bg-white shadow-xl shadow-amber-200/60 items-center justify-center"
            >
              <span className="w-10 h-10 rounded-full bg-amber-300 flex items-center justify-center text-white">
                <Sun size={18} />
              </span>
            </motion.div>

            <motion.span
              {...fadeUp}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full text-xs font-bold text-violet-700 uppercase tracking-widest shadow-sm border border-violet-100"
            >
              <Sparkles size={14} /> Personality · Mood · Growth
            </motion.span>

            <motion.h1
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-6 font-display font-medium tracking-tight text-slate-900 text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl"
            >
              Understand yourself, one reflection at a time
            </motion.h1>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-6 mx-auto max-w-xl text-lg sm:text-xl text-slate-600 leading-relaxed"
            >
              Take thoughtful personality tests, check in with your mood, and watch your patterns emerge — all in one calm, private space.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <button
                onClick={() => onAction({ kind: 'mbti' })}
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-slate-900 text-white text-base font-semibold flex items-center justify-center gap-2.5 shadow-xl shadow-slate-900/15 hover:bg-slate-800 transition-colors active:scale-95"
              >
                Start Here
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollToSection('tests')}
                className="w-full sm:w-auto h-14 px-8 rounded-full bg-white/80 backdrop-blur text-slate-900 text-base font-semibold border border-white shadow-sm hover:bg-white transition-colors active:scale-95"
              >
                Explore Tests
              </button>
            </motion.div>
          </div>

          {/* Fanned preview cards */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="relative mx-auto mt-14 sm:mt-20 h-[220px] sm:h-[280px] w-full max-w-[860px]"
          >
            {/* Mascot peeking from behind the cards */}
            <div className="absolute left-[4%] sm:left-[9%] -top-9 sm:-top-12 w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-violet-300" aria-hidden>
              <div className="absolute top-[34%] left-[30%] flex gap-1.5">
                <span className="w-4 h-5 sm:w-5 sm:h-6 rounded-full bg-white flex items-end justify-center"><span className="w-2 h-2.5 sm:w-2.5 sm:h-3 rounded-full bg-slate-800 mb-0.5" /></span>
                <span className="w-4 h-5 sm:w-5 sm:h-6 rounded-full bg-white flex items-end justify-center"><span className="w-2 h-2.5 sm:w-2.5 sm:h-3 rounded-full bg-slate-800 mb-0.5" /></span>
              </div>
            </div>

            <button
              onClick={() => onAction({ kind: 'quiz', traitId: 'openness' })}
              className="absolute left-0 sm:left-[4%] top-8 sm:top-10 w-[44%] sm:w-[36%] h-[340px] -rotate-[7deg] rounded-[2rem] overflow-hidden bg-white/95 border border-white shadow-xl shadow-violet-200/50 p-5 sm:p-8 flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-transform duration-300"
            >
              <span className="w-12 h-12 rounded-full bg-violet-50 text-violet-600 flex items-center justify-center shrink-0">
                <Compass size={22} />
              </span>
              <span className="font-display text-lg sm:text-2xl leading-snug text-slate-900">How open are you to new experiences?</span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400">{QUESTIONS.openness.length} questions</span>
            </button>

            <button
              onClick={() => onAction({ kind: 'mood' })}
              className="absolute right-0 sm:right-[4%] top-8 sm:top-10 w-[44%] sm:w-[36%] h-[340px] rotate-[7deg] rounded-[2rem] overflow-hidden bg-white/95 border border-white shadow-xl shadow-amber-200/50 p-5 sm:p-8 flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-transform duration-300"
            >
              <span className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-2xl shrink-0">😌</span>
              <span className="font-display text-lg sm:text-2xl leading-snug text-slate-900">How are you feeling today?</span>
              <span className="text-[11px] sm:text-xs font-medium text-slate-400">{MOOD_QUESTION_COUNT} questions</span>
            </button>

            <button
              onClick={() => onAction({ kind: 'mbti' })}
              className="absolute left-1/2 -translate-x-1/2 top-0 z-10 w-[50%] sm:w-[40%] h-[340px] rounded-[2rem] overflow-hidden bg-[#EEEAFE] border-4 border-white shadow-2xl shadow-violet-300/50 p-5 sm:p-8 flex flex-col items-center text-center gap-4 hover:-translate-y-2 transition-transform duration-300"
            >
              <span className="w-12 h-12 rounded-full bg-white text-violet-600 flex items-center justify-center shadow-sm shrink-0">
                <Sparkles size={22} />
              </span>
              <span className="font-display text-xl sm:text-[1.7rem] leading-snug text-slate-900">What is your 4-letter personality type?</span>
              <span className="flex items-center gap-2 text-[11px] sm:text-xs font-medium text-slate-500">
                {MBTI_QUESTION_COUNT} questions <span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> 16 types
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ───────────── Tests ───────────── */}
      <section id="tests" className="scroll-mt-20 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <motion.div {...inView} className="max-w-2xl">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-widest">Tests</p>
          <h2 className="mt-3 font-display font-medium tracking-tight text-slate-900 text-4xl sm:text-5xl">Find the test that fits today</h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Explore everything without an account. You will only be asked to sign in when you start a test, so your results have somewhere safe to live.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <motion.button
            {...inView}
            whileHover={{ y: -6 }}
            onClick={() => onAction({ kind: 'mbti' })}
            className="relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 text-left text-white shadow-xl shadow-violet-200 group"
            style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' }}
          >
            <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
            <div className="relative z-10 space-y-6">
              <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Primary Analysis</span>
              <h3 className="font-display font-medium text-4xl sm:text-5xl leading-tight tracking-tight">Global Personality Test</h3>
              <p className="text-indigo-100 text-lg max-w-md leading-relaxed">Discover your 4-letter type and professional potential.</p>
              <span className="inline-flex items-center gap-3 bg-white text-violet-600 px-7 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg">
                {profile?.mbtiType ? 'Re-take Test' : 'Start Journey'}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </motion.button>

          <motion.button
            {...inView}
            whileHover={{ y: -6 }}
            onClick={() => onAction({ kind: 'mood' })}
            className="relative overflow-hidden rounded-[2.5rem] p-8 sm:p-10 text-left text-white shadow-xl shadow-blue-200 group"
            style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%)' }}
          >
            <div className="absolute top-[-20%] right-[-10%] w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="relative z-10 flex items-start justify-between gap-6">
              <div className="space-y-6">
                <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Daily Check-in</span>
                <h3 className="font-display font-medium text-4xl sm:text-5xl leading-tight tracking-tight">How are you feeling today?</h3>
                <p className="text-blue-100 text-lg max-w-md leading-relaxed">A quick emotional check-in that builds your mood history over time.</p>
                <span className="inline-flex items-center gap-3 bg-white text-blue-600 px-7 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg">
                  Start Mood Test
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
              <div className="hidden sm:flex w-24 h-24 shrink-0 bg-white/10 rounded-[2rem] items-center justify-center text-5xl shadow-inner border border-white/20">😌</div>
            </div>
          </motion.button>
        </div>

        <motion.div {...inView} className="mt-16 flex items-end justify-between gap-4">
          <div>
            <h3 className="font-display font-medium text-3xl text-slate-900 tracking-tight">Personality traits</h3>
            <p className="mt-2 text-slate-500">Ten focused quizzes. Pick the trait you are curious about.</p>
          </div>
        </motion.div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {TRAITS.map((trait, idx) => (
            <motion.div
              key={trait.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: (idx % 5) * 0.05 }}
              className="flex"
            >
              <TraitCard
                name={trait.name}
                description={trait.description}
                iconName={trait.iconName}
                percentage={user ? profile?.traitsProgress?.[trait.id] : undefined}
                onClick={() => onAction({ kind: 'quiz', traitId: trait.id })}
                className="w-full border-slate-100"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────── Features ───────────── */}
      <section id="features" className="scroll-mt-20 bg-[#F5F7FF]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
          <motion.div {...inView} className="max-w-2xl">
            <p className="text-xs font-bold text-violet-600 uppercase tracking-widest">Features</p>
            <h2 className="mt-3 font-display font-medium tracking-tight text-slate-900 text-4xl sm:text-5xl">Everything you need to know yourself better</h2>
          </motion.div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm space-y-5"
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${feature.tone}`}>
                  <feature.icon size={26} />
                </div>
                <h3 className="font-display font-medium text-2xl text-slate-900 tracking-tight">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── How it works ───────────── */}
      <section id="how-it-works" className="scroll-mt-20 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 lg:py-28">
        <motion.div {...inView} className="max-w-2xl">
          <p className="text-xs font-bold text-violet-600 uppercase tracking-widest">How it works</p>
          <h2 className="mt-3 font-display font-medium tracking-tight text-slate-900 text-4xl sm:text-5xl">Three steps to a clearer picture</h2>
        </motion.div>

        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {STEPS.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="space-y-4"
            >
              <span className="font-display text-6xl text-violet-300">{String(idx + 1).padStart(2, '0')}</span>
              <h3 className="font-display font-medium text-2xl text-slate-900 tracking-tight">{step.title}</h3>
              <p className="text-slate-600 leading-relaxed max-w-sm">{step.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing call to action */}
        <motion.div
          {...inView}
          className="mt-20 bg-slate-900 rounded-[2.5rem] p-10 sm:p-14 text-white relative overflow-hidden shadow-2xl shadow-slate-200 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-violet-600/30 to-transparent pointer-events-none" />
          <div className="relative z-10 max-w-xl space-y-3">
            <h2 className="font-display font-medium text-4xl sm:text-5xl tracking-tight">Ready to meet yourself?</h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              {user ? 'Your dashboard is waiting with your latest results.' : 'Create a free account and take your first test in about two minutes.'}
            </p>
          </div>
          <button
            onClick={user ? openDashboard : onSignup}
            className="relative z-10 w-full sm:w-auto h-14 px-8 rounded-full bg-white text-slate-900 text-base font-semibold flex items-center justify-center gap-2.5 shadow-lg hover:bg-violet-50 transition-colors active:scale-95 shrink-0"
          >
            {user ? 'Open Dashboard' : 'Create Free Account'}
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>

      {/* ───────────── Footer ───────────── */}
      <footer className="border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Logo />
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-center">Built for modern minds • Est 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingScreen;
