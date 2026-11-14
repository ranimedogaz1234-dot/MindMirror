import React from 'react';
import * as LucideIcons from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface TraitCardProps {
  name: string;
  description: string;
  iconName: string;
  percentage?: number;
  onClick: () => void;
  className?: string;
}

const TraitCard: React.FC<TraitCardProps> = ({ 
  name, 
  description, 
  iconName, 
  percentage, 
  onClick,
  className 
}) => {
  const Icon = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;

  return (
    <motion.button
      whileHover={{ y: -6, shadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={cn(
        "bg-white rounded-[1.5rem] p-6 text-left border border-slate-50 flex flex-col gap-4 shadow-sm transition-all",
        className
      )}
    >
      <div className="flex justify-between items-start">
        <div className="w-11 h-11 bg-slate-50 rounded-xl flex items-center justify-center text-violet-600 shadow-sm border border-white">
          <Icon size={22} />
        </div>
        {percentage !== undefined && (
          <div className="text-xs font-black text-violet-600 bg-violet-50 px-2.5 py-1 rounded-lg border border-violet-100/50">
            {percentage}%
          </div>
        )}
      </div>
      
      <div className="space-y-1.5">
        <h3 className="font-bold text-slate-900 tracking-tight">{name}</h3>
        <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed font-medium">{description}</p>
      </div>

      {percentage !== undefined && (
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            className="h-full bg-violet-500 rounded-full shadow-[0_0_8px_rgba(124,58,237,0.4)]"
          />
        </div>
      )}
    </motion.button>
  );
};

export default TraitCard;
