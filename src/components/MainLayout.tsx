import React, { useState } from 'react';
import BottomNav, { SideNav } from './BottomNav';
import Logo from './Logo';
import HomeScreen from '../screens/HomeScreen';
import TraitsScreen from '../screens/TraitsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { AnimatePresence, motion } from 'motion/react';
import { useAuth } from '../providers/AuthProvider';
import { MailWarning } from 'lucide-react';
import type { Intent, NavTab } from '../lib/navigation';

const VerifyEmailBanner: React.FC = () => {
  const { user, resendVerificationEmail } = useAuth();
  const [sending, setSending] = useState(false);

  const isEmailPasswordAccount = user?.providerData.some((p) => p.providerId === 'password');
  if (!user || user.emailVerified || !isEmailPasswordAccount) return null;

  const handleResend = async () => {
    if (sending) return;
    setSending(true);
    try {
      await resendVerificationEmail();
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="mx-6 lg:mx-10 mt-4 lg:mt-8 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3 flex items-center gap-3">
      <MailWarning size={18} className="text-amber-600 shrink-0" />
      <p className="flex-1 text-xs font-medium text-amber-800">Please verify your email address to save your results.</p>
      <button
        onClick={handleResend}
        disabled={sending}
        className="text-[10px] font-black text-amber-700 uppercase tracking-widest hover:text-amber-900 disabled:opacity-60 shrink-0"
      >
        {sending ? 'Sending…' : 'Resend'}
      </button>
    </div>
  );
};

interface MainLayoutProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  /** Starts a test (quiz / MBTI / mood). */
  onAction: (intent: Intent) => void;
  /** Goes to the public homepage. */
  onHome: () => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ activeTab, onTabChange, onAction, onHome }) => {
  const startQuiz = (traitId: any) => onAction({ kind: 'quiz', traitId });

  const renderScreen = () => {
    switch (activeTab) {
      case 'traits':
        return <TraitsScreen onStartQuiz={startQuiz} />;
      case 'analytics':
        return <AnalyticsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'home':
      default:
        return (
          <HomeScreen
            onStartQuiz={startQuiz}
            onStartMBTITest={() => onAction({ kind: 'mbti' })}
            onStartMoodQuiz={() => onAction({ kind: 'mood' })}
            onViewAllTraits={() => onTabChange('traits')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FF]">
      <SideNav activeTab={activeTab} onTabChange={onTabChange} onHome={onHome} />

      {/* Compact top bar on phones / tablets (the sidebar carries the logo on desktop). */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#F5F7FF]/85 backdrop-blur-lg px-6 py-3 border-b border-slate-200/60">
        <Logo onClick={onHome} />
      </header>

      <main className="lg:pl-64 pb-28 lg:pb-12">
        <div className="mx-auto w-full max-w-6xl">
          <VerifyEmailBanner />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
};

export default MainLayout;
