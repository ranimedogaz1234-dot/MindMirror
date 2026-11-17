import React, { useState } from 'react';
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
  const [search, setSearch] = useState('');

  const term = search.trim().toLowerCase();
  const traits = term
    ? TRAITS.filter((t) => t.name.toLowerCase().includes(term) || t.description.toLowerCase().includes(term))
    : TRAITS;

  return (
    <div className="px-6 lg:px-10 pt-6 lg:pt-12 space-y-8">
      <header className="space-y-4 lg:flex lg:items-end lg:justify-between lg:space-y-0 lg:gap-8">
        <div className="space-y-1">
          <h1 className="font-display text-[1.75rem] sm:text-4xl lg:text-5xl font-medium tracking-tight text-gray-900">Explore Traits</h1>
          <p className="text-gray-500 font-medium text-sm lg:text-base">Pick a trait to start its quiz.</p>
        </div>
        <div className="relative lg:w-80">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search personality traits..."
            className="w-full h-12 pl-12 pr-4 bg-white border border-gray-100 rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-500/20 text-sm transition-all"
          />
        </div>
      </header>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 pb-10">
        {traits.map((trait, idx) => (
          <motion.div
            key={trait.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex"
          >
            <TraitCard
              name={trait.name}
              description={trait.description}
              iconName={trait.iconName}
              percentage={profile?.traitsProgress?.[trait.id]}
              onClick={() => onStartQuiz(trait.id)}
              className="w-full"
            />
          </motion.div>
        ))}
        {traits.length === 0 && (
          <p className="col-span-full text-center text-sm text-gray-400 py-10">No traits match "{search}".</p>
        )}
      </div>
    </div>
  );
};

export default TraitsScreen;
