import React, { useState } from 'react';
import { TraitId, Question } from '../types';
import { QUESTIONS } from '../questions';
import { TRAITS } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, CheckCircle2 } from 'lucide-react';
import { db } from '../lib/firebase';
import { addDoc, collection, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

interface QuizScreenProps {
  traitId: TraitId;
  onClose: () => void;
}

const QuizScreen: React.FC<QuizScreenProps> = ({ traitId, onClose }) => {
  const { user, profile } = useAuth();
  const trait = TRAITS.find(t => t.id === traitId)!;
  const questions = QUESTIONS[traitId];
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [complete, setComplete] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);
    
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      finishQuiz(newScores);
    }
  };

  const finishQuiz = async (finalScores: number[]) => {
    setComplete(true);
    if (!user) return;

    setSaving(true);
    const average = finalScores.reduce((a, b) => a + b, 0) / finalScores.length;
    const percentage = Math.round(average);

    try {
      // Save result
      await addDoc(collection(db, 'results'), {
        userId: user.uid,
        traitId,
        score: average,
        percentage,
        timestamp: serverTimestamp()
      });

      // Update user profile
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        [`traitsProgress.${traitId}`]: percentage,
        lastActive: serverTimestamp()
      });
      
      toast.success('Reflection updated!');
    } catch (err) {
      console.error('Save Quiz Error:', err);
      toast.error('Could not save results');
    } finally {
      setSaving(false);
    }
  };

  const question = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  if (complete) {
    const finalPercentage = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
    return (
      <div className="fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center p-8 text-center space-y-8">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center text-violet-600"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Quiz Complete!</h2>
          <p className="text-gray-500">You scored {finalPercentage}% in {trait.name}</p>
        </div>

        <div className="w-full bg-violet-600 text-white rounded-2xl py-4 font-bold shadow-lg shadow-violet-200">
           {finalPercentage > 80 ? 'Master' : finalPercentage > 50 ? 'Strong' : 'Growing'}
        </div>

        <button 
          onClick={onClose}
          className="text-gray-500 font-bold uppercase tracking-widest text-sm"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-[60] flex flex-col p-6 overflow-hidden">
      <header className="flex justify-between items-center mb-12">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-400 hover:text-gray-900 transition-colors">
          <X size={24} />
        </button>
        <div className="flex-1 mx-8 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-violet-600" 
          />
        </div>
        <span className="text-xs font-bold text-gray-400 w-10 text-right">{currentIdx + 1}/{questions.length}</span>
      </header>

      <main className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <div className="space-y-4">
              <span className="text-violet-600 font-bold uppercase tracking-widest text-xs">{trait.name} Analysis</span>
              <h1 className="text-3xl font-bold text-gray-900 leading-tight">{question.text}</h1>
            </div>

            <div className="space-y-4">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.score)}
                  className="w-full p-6 text-left border border-gray-100 rounded-3xl hover:border-violet-600 hover:bg-violet-50 transition-all group relative overflow-hidden"
                >
                  <span className="relative z-10 font-medium text-gray-700 group-hover:text-violet-900">{opt.text}</span>
                  <ArrowRight size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-violet-600 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default QuizScreen;
