import React from 'react';
import { AuthProvider, useAuth } from './providers/AuthProvider';
import { DataProvider } from './providers/DataProvider';
import { Toaster } from 'react-hot-toast';
import MainLayout from './components/MainLayout';
import AuthScreen from './screens/AuthScreen';
import SplashScreen from './screens/SplashScreen';

const AppContent: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SplashScreen />;
  }

  if (!user) {
    return <AuthScreen />;
  }

  return <MainLayout />;
};

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <div className="min-h-screen bg-[#F5F7FF] font-sans text-slate-800 selection:bg-violet-100">
          <AppContent />
          <Toaster position="top-right" gutter={8} />
        </div>
      </DataProvider>
    </AuthProvider>
  );
}
