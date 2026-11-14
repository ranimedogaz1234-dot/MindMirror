import React from 'react';
import { motion } from 'motion/react';
import { Brain } from 'lucide-react';

const SplashScreen: React.FC = () => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <div className="w-20 h-20 bg-violet-100 rounded-3xl flex items-center justify-center text-violet-600">
          <Brain size={48} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">MindMirror</h1>
        <p className="text-sm text-gray-500 font-medium tracking-wide">REFLECTING YOUR INNER SELF</p>
      </motion.div>
    </div>
  );
};

export default SplashScreen;
