import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

const MOOD_QUESTIONS = [
  { id: 'm1', text: 'Do you feel energetic today?', options: ['Never', 'A little', 'Sometimes', 'Very much'] },
  { id: 'm2', text: 'Are you feeling stressed?', options: ['Very much', 'Sometimes', 'A little', 'Never'] }, // Reversed for positive scoring
  { id: 'm3', text: 'Do you feel motivated to achieve your goals?', options: ['Never', 'A little', 'Sometimes', 'Very much'] },
  { id: 'm4', text: 'Do you feel calm and at peace?', options: ['Never', 'A little', 'Sometimes', 'Very much'] },
  { id: 'm5', text: 'Do you feel lonely or isolated?', options: ['Very much', 'Sometimes', 'A little', 'Never'] },
  { id: 'm6', text: 'Are you happy with your progress today?', options: ['Never', 'A little', 'Sometimes', 'Very much'] },
];

const MOOD_TYPES = [
  { type: 'Excited', emoji: '🤩', minScore: 90, message: "You're on fire! Channel this energy into your biggest project." },
  { type: 'Happy', emoji: '😊', minScore: 75, message: "Great vibes! Spread your positivity to someone today." },
  { type: 'Calm', emoji: '😌', minScore: 60, message: "You're in a peaceful state. A perfect time for reflection." },
  { type: 'Tired', emoji: '😴', minScore: 40, message: "You've worked hard. Don't forget to recharge your batteries." },
  { type: 'Stressed', emoji: '😣', minScore: 20, message: "Take a deep breath. You're doing better than you think." },
  { type: 'Sad', emoji: '😔', minScore: 0, message: "It's okay to not be okay. Tomorrow is a fresh start." },
];

interface MoodQuizScreenProps {
  onClose: () => void;
}

const MoodQuizScreen: React.FC<MoodQuizScreenProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<any>(null);

  const handleAnswer = (optionIdx: number) => {
    const question = MOOD_QUESTIONS[currentIdx];
    const score = (optionIdx / 3) * 100;
    
    const newAnswers = { ...answers, [question.id]: score };
    setAnswers(newAnswers);

    if (currentIdx < MOOD_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = async (finalAnswers: Record<string, number>) => {
    if (!user) return;

    const values = Object.values(finalAnswers);
    const average = values.reduce((a, b) => a + b, 0) / values.length;
    
    const moodMatch = MOOD_TYPES.find(m => average >= m.minScore) || MOOD_TYPES[MOOD_TYPES.length - 1];

    const moodData = {
      userId: user.uid,
      moodType: moodMatch.type,
      moodEmoji: moodMatch.emoji,
      moodPercentage: Math.round(average),
      answers: finalAnswers,
      timestamp: serverTimestamp()
    };

    try {
      await addDoc(collection(db, 'daily_moods'), moodData);
      setResult({ ...moodMatch, percentage: Math.round(average) });
      toast.success('Mood logged successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to save mood');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-white overflow-y-auto"
    >
      <div className="max-w-md mx-auto px-6 py-12 min-h-screen flex flex-col">
        <header className="flex justify-between items-center mb-12">
          <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
            <Sparkles size={20} />
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </header>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key={currentIdx}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-8">
                <p className="text-xs font-black text-violet-600 uppercase tracking-widest mb-2">Question {currentIdx + 1} of {MOOD_QUESTIONS.length}</p>
                <h2 className="text-3xl font-bold text-slate-900 leading-tight">
                  {MOOD_QUESTIONS[currentIdx].text}
                </h2>
              </div>

              <div className="space-y-4 flex-1">
                {MOOD_QUESTIONS[currentIdx].options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full bg-white border-2 border-slate-100 p-6 rounded-[2rem] text-left font-bold text-slate-700 hover:border-violet-200 hover:bg-violet-50/50 transition-all active:scale-[0.98]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="w-32 h-32 bg-violet-50 rounded-full flex items-center justify-center text-6xl shadow-inner border border-white">
                {result.emoji}
              </div>
              
              <div className="space-y-2">
                <h2 className="text-4xl font-black text-slate-900">Feeling {result.type}</h2>
                <div className="inline-flex items-center gap-2 bg-violet-600 text-white px-4 py-1.5 rounded-full text-sm font-bold">
                  {result.percentage}% Positivity Score
                </div>
              </div>

              <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-[280px]">
                "{result.message}"
              </p>

              <div className="w-full pt-12">
                <button
                  onClick={onClose}
                  className="w-full bg-slate-900 text-white py-5 rounded-[2rem] font-bold text-lg shadow-xl shadow-slate-200 flex items-center justify-center gap-3 active:scale-95 transition-transform"
                >
                  Back to Reflection
                  <ArrowRight size={20} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MoodQuizScreen;
