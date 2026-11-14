import React from 'react';
import { TRAITS } from '../constants';
import TraitCard from '../components/TraitCard';
import { useAuth } from '../providers/AuthProvider';
import { motion } from 'motion/react';
import { Search } from 'lucide-react';

interface TraitsScreenProps {
  onStartQuiz: (id: any) => void;
}

const TraitsScreen: React.FC<TraitsScreenProps> = ({ onStartQuiz }) => {
  const { profile } = useAuth();

  return (
    <div className="px-6 pt-12 space-y-8">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Explore Traits</h1>
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search personality traits..." 
            className="w-full h-12 pl-12 pr-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-sm transition-all"
          />
        </div>
      </header>

      <div className="grid grid-cols-2 gap-4 pb-10">
        {TRAITS.map((trait, idx) => (
          <motion.div
            key={trait.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <TraitCard
              name={trait.name}
              description={trait.description}
              iconName={trait.iconName}
              percentage={profile?.traitsProgress[trait.id]}
              onClick={() => onStartQuiz(trait.id)}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TraitsScreen;
