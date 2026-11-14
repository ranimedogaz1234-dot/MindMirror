import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, Sparkles, BookOpen, Briefcase, Zap, ShieldAlert } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';

const MBTI_QUESTIONS = [
  // E vs I
  { text: "Do you enjoy being the center of attention?", options: [{text: "Yes", score: "E"}, {text: "No", score: "I"}] },
  { text: "Do you prefer small gatherings over big parties?", options: [{text: "Party", score: "E"}, {text: "Small", score: "I"}] },
  { text: "Do you start conversations with strangers?", options: [{text: "Yes", score: "E"}, {text: "No", score: "I"}] },
  { text: "Do you feel energized after social events?", options: [{text: "Energized", score: "E"}, {text: "Drained", score: "I"}] },
  { text: "Do you think out loud?", options: [{text: "Yes", score: "E"}, {text: "No", score: "I"}] },

  // S vs N
  { text: "Do you focus on the present moment?", options: [{text: "Present", score: "S"}, {text: "Future", score: "N"}] },
  { text: "Do you prefer practical information?", options: [{text: "Practical", score: "S"}, {text: "Theoretical", score: "N"}] },
  { text: "Are you a detail-oriented person?", options: [{text: "Details", score: "S"}, {text: "Big picture", score: "N"}] },
  { text: "Do you trust experience over inspiration?", options: [{text: "Experience", score: "S"}, {text: "Inspiration", score: "N"}] },
  { text: "Do you follow instructions literally?", options: [{text: "Literally", score: "S"}, {text: "Interpret", score: "N"}] },

  // T vs F
  { text: "Do you prioritize logic over feelings?", options: [{text: "Logic", score: "T"}, {text: "Feelings", score: "F"}] },
  { text: "Are you objective when making decisions?", options: [{text: "Objective", score: "T"}, {text: "Subjective", score: "F"}] },
  { text: "Do you value truth over tact?", options: [{text: "Truth", score: "T"}, {text: "Kindness", score: "F"}] },
  { text: "Do you enjoy a good debate?", options: [{text: "Yes", score: "T"}, {text: "No", score: "F"}] },
  { text: "Are you naturally critical?", options: [{text: "Analytical", score: "T"}, {text: "Appreciative", score: "F"}] },

  // J vs P
  { text: "Do you like having a settled schedule?", options: [{text: "Scheduled", score: "J"}, {text: "Spontaneous", score: "P"}] },
  { text: "Do you prefer cleaning up as you go?", options: [{text: "Clean", score: "J"}, {text: "Messy", score: "P"}] },
  { text: "Do you like to finish tasks early?", options: [{text: "Early", score: "J"}, {text: "Last minute", score: "P"}] },
  { text: "Do you make to-do lists frequently?", options: [{text: "Lists", score: "J"}, {text: "Mental notes", score: "P"}] },
  { text: "Do you like to have everything planned?", options: [{text: "Planned", score: "J"}, {text: "Open", score: "P"}] },
];

const MBTITestScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user } = useAuth();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const calculateType = (ans: string[]) => {
    const counts: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    ans.forEach(a => counts[a]++);
    
    const type = [
      counts.E >= counts.I ? 'E' : 'I',
      counts.S >= counts.N ? 'S' : 'N',
      counts.T >= counts.F ? 'T' : 'F',
      counts.J >= counts.P ? 'J' : 'P',
    ].join('');
    
    return type;
  };

  const handleAnswer = (val: string) => {
    const newAnswers = [...answers, val];
    setAnswers(newAnswers);
    if (currentIdx < MBTI_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      const type = calculateType(newAnswers);
      setResult(type);
      saveResult(type);
    }
  };

  const saveResult = async (type: string) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, 'users', user.uid), { 
        mbtiType: type,
        lastActive: serverTimestamp()
      });
      toast.success(`Personality Type: ${type}`);
    } catch (err) {
      console.error(err);
    }
  };

  if (result) {
    return (
      <div className="fixed inset-0 bg-white z-[70] p-8 flex flex-col space-y-8 overflow-y-auto">
        <header className="flex justify-between items-center">
           <h2 className="text-xl font-bold">Your Result</h2>
           <button onClick={onClose} className="p-2 bg-gray-50 rounded-full"><X size={20}/></button>
        </header>

        <div className="text-center space-y-2">
          <div className="text-6xl font-black text-violet-600 tracking-tighter">{result}</div>
          <p className="text-gray-500 font-medium">The Visionary / Architect</p>
        </div>

        <div className="space-y-6">
          <div className="bg-violet-50 rounded-3xl p-6 space-y-3">
             <div className="flex items-center gap-2 text-violet-700 font-bold uppercase text-xs tracking-widest">
               <BookOpen size={14} /> Description
             </div>
             <p className="text-sm text-violet-900 leading-relaxed">
               You are driven by logic and organization. You enjoy finding efficient ways to achieve long-term goals and are often described as a strategic thinker.
             </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-3xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-green-700 font-bold uppercase text-xs tracking-widest"><Zap size={14} /> Strengths</div>
              <ul className="text-xs text-green-800 space-y-1">
                <li>• Analytical</li>
                <li>• Determined</li>
                <li>• Strategic</li>
              </ul>
            </div>
            <div className="bg-red-50 rounded-3xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-red-700 font-bold uppercase text-xs tracking-widest"><ShieldAlert size={14} /> Weaknesses</div>
              <ul className="text-xs text-red-800 space-y-1">
                <li>• Impatient</li>
                <li>• Over-critical</li>
                <li>• Reserved</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-3xl p-6 space-y-3">
             <div className="flex items-center gap-2 text-blue-700 font-bold uppercase text-xs tracking-widest">
               <Briefcase size={14} /> Careers
             </div>
             <div className="flex flex-wrap gap-2">
               {['Software Arch', 'Scientist', 'Judge', 'Executive'].map(c => (
                 <span key={c} className="bg-white px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm">{c}</span>
               ))}
             </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full bg-gray-900 text-white rounded-2xl py-4 font-bold"
        >
          Finish
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-white z-[70] p-8 flex flex-col pt-20">
      <header className="absolute top-8 left-8 right-8 flex justify-between items-center">
        <button onClick={onClose}><X size={24} className="text-gray-400" /></button>
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Global Test {currentIdx+1}/{MBTI_QUESTIONS.length}</span>
      </header>

      <main className="flex-1 flex flex-col justify-center space-y-12">
         <div className="space-y-4">
           <div className="w-12 h-12 bg-violet-100 rounded-2xl flex items-center justify-center text-violet-600">
             <Sparkles size={24} />
           </div>
           <h2 className="text-3xl font-bold text-gray-900 leading-tight">
             {MBTI_QUESTIONS[currentIdx].text}
           </h2>
         </div>

         <div className="space-y-4">
           {MBTI_QUESTIONS[currentIdx].options.map((opt, i) => (
             <button
              key={i}
              onClick={() => handleAnswer(opt.score)}
              className="w-full p-6 text-left border border-gray-100 rounded-3xl hover:border-violet-600 hover:bg-violet-50 transition-all font-bold text-gray-700 hover:text-violet-900 flex justify-between items-center"
             >
               {opt.text}
               <ArrowRight size={18} className="text-gray-300" />
             </button>
           ))}
         </div>
      </main>
    </div>
  );
};

export default MBTITestScreen;
