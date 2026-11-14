import React, { useState } from 'react';
import BottomNav, { NavTab } from './BottomNav';
import HomeScreen from '../screens/HomeScreen';
import TraitsScreen from '../screens/TraitsScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import QuizScreen from '../screens/QuizScreen';
import MBTITestScreen from '../screens/MBTITestScreen';
import MoodQuizScreen from '../screens/MoodQuizScreen';
import { AnimatePresence, motion } from 'motion/react';
import { TraitId } from '../types';

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [activeQuiz, setActiveQuiz] = useState<TraitId | null>(null);
  const [showMBTITest, setShowMBTITest] = useState(false);
  const [showMoodQuiz, setShowMoodQuiz] = useState(false);

  const renderScreen = () => {
    switch (activeTab) {
      case 'home': return <HomeScreen 
                            onStartQuiz={setActiveQuiz} 
                            onStartMBTITest={() => setShowMBTITest(true)} 
                            onStartMoodQuiz={() => setShowMoodQuiz(true)}
                          />;
      case 'traits': return <TraitsScreen onStartQuiz={setActiveQuiz} />;
      case 'analytics': return <AnalyticsScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <HomeScreen onStartQuiz={setActiveQuiz} onStartMBTITest={() => setShowMBTITest(true)} />;
    }
  };

  return (
    <div className="pb-20">
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

      <AnimatePresence>
        {activeQuiz && (
          <QuizScreen 
            traitId={activeQuiz} 
            onClose={() => setActiveQuiz(null)} 
          />
        )}
        {showMBTITest && (
          <MBTITestScreen onClose={() => setShowMBTITest(false)} />
        )}
        {showMoodQuiz && (
          <MoodQuizScreen onClose={() => setShowMoodQuiz(false)} />
        )}
      </AnimatePresence>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default MainLayout;
