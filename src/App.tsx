import React, { useEffect, useRef, useState } from 'react';
import type { User } from 'firebase/auth';
import { AnimatePresence } from 'motion/react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './providers/AuthProvider';
import { LanguageProvider } from './i18n';
import { DataProvider } from './providers/DataProvider';
import MainLayout from './components/MainLayout';
import LandingScreen from './screens/LandingScreen';
import AuthScreen from './screens/AuthScreen';
import SplashScreen from './screens/SplashScreen';
import QuizScreen from './screens/QuizScreen';
import MBTITestScreen from './screens/MBTITestScreen';
import MoodQuizScreen from './screens/MoodQuizScreen';
import {
  Intent,
  OverlayIntent,
  Route,
  isAuthRoute,
  routeToTab,
  tabToRoute,
  useHashRoute,
} from './lib/navigation';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();
  const [route, navigate] = useHashRoute();

  // What a signed-out visitor asked to do; carried across the sign-in screen.
  const [pending, setPending] = useState<Intent | null>(null);
  // The test currently open (rendered above whichever page the user is on).
  const [overlay, setOverlay] = useState<OverlayIntent | null>(null);
  // Where the visitor was when the sign-in screen opened.
  const returnRoute = useRef<Route>('landing');
  const previousUser = useRef<User | null>(null);

  const onAuthRoute = isAuthRoute(route);
  const activeTab = routeToTab(route);

  const openAuth = (mode: 'login' | 'signup', intent: Intent | null) => {
    if (!onAuthRoute) returnRoute.current = route;
    setPending(intent);
    navigate(mode);
  };

  /** Runs an action, or asks the visitor to sign in first and remembers it. */
  const requestAction = (intent: Intent) => {
    if (!user) {
      openAuth('login', intent);
      return;
    }
    if (intent.kind === 'tab') navigate(tabToRoute(intent.tab));
    else setOverlay(intent);
  };

  // Signed in while on the sign-in screen: resume what the visitor wanted.
  useEffect(() => {
    if (loading || !user || !onAuthRoute) return;
    const back = returnRoute.current;
    if (pending?.kind === 'tab') {
      navigate(tabToRoute(pending.tab), true);
    } else if (pending) {
      // A test was requested: go back to the page it was started from and open it.
      navigate(isAuthRoute(back) ? 'landing' : back, true);
      setOverlay(pending);
    } else {
      // Plain "Log in" with nothing queued: take them to their dashboard.
      navigate(routeToTab(back) ? back : 'dashboard', true);
    }
    setPending(null);
  }, [user, loading, onAuthRoute]); // eslint-disable-line react-hooks/exhaustive-deps

  // Signed out: close anything private and leave protected pages.
  useEffect(() => {
    if (previousUser.current && !user) {
      setOverlay(null);
      setPending(null);
      if (activeTab) navigate('landing', true);
    }
    previousUser.current = user;
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) return <SplashScreen />;

  const closeAuth = () => {
    setPending(null);
    const back = returnRoute.current;
    navigate(onAuthRoute && !isAuthRoute(back) && !routeToTab(back) ? back : 'landing', true);
  };

  let screen: React.ReactNode;
  if (onAuthRoute && user) {
    // The effect above is redirecting.
    screen = <SplashScreen />;
  } else if (onAuthRoute || (activeTab && !user)) {
    // Sign-in page, or a private page opened while signed out (the page itself
    // appears as soon as the visitor signs in — no redirect needed).
    screen = (
      <AuthScreen
        key={route}
        initialMode={route === 'signup' ? 'signup' : 'signin'}
        intent={pending ?? (activeTab ? { kind: 'tab', tab: activeTab } : null)}
        onClose={closeAuth}
      />
    );
  } else if (activeTab) {
    screen = (
      <MainLayout
        activeTab={activeTab}
        onTabChange={(tab) => navigate(tabToRoute(tab))}
        onAction={requestAction}
        onHome={() => navigate('landing')}
      />
    );
  } else {
    screen = (
      <LandingScreen
        onAction={requestAction}
        onLogin={() => openAuth('login', null)}
        onSignup={() => openAuth('signup', null)}
      />
    );
  }

  return (
    <>
      {screen}
      <AnimatePresence>
        {user && overlay?.kind === 'quiz' && (
          <QuizScreen key={`quiz-${overlay.traitId}`} traitId={overlay.traitId} onClose={() => setOverlay(null)} />
        )}
        {user && overlay?.kind === 'mbti' && <MBTITestScreen key="mbti" onClose={() => setOverlay(null)} />}
        {user && overlay?.kind === 'mood' && <MoodQuizScreen key="mood" onClose={() => setOverlay(null)} />}
      </AnimatePresence>
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <DataProvider>
          <div className="min-h-screen bg-[#F5F7FF] font-sans text-slate-800 selection:bg-violet-100">
            <AppContent />
            <Toaster position="top-right" gutter={8} />
          </div>
        </DataProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}
