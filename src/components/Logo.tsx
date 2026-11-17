import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';

interface LogoProps {
  onClick?: () => void;
  className?: string;
}

/** MindMirror wordmark. Renders as a button when `onClick` is provided. */
const Logo: React.FC<LogoProps> = ({ onClick, className }) => {
  const content = (
    <>
      <span className="w-9 h-9 bg-violet-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-violet-200 shrink-0">
        <Sparkles size={18} />
      </span>
      <span className="font-display text-2xl font-medium tracking-tight text-slate-900">MindMirror</span>
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} aria-label="MindMirror home" className={cn('flex items-center gap-2.5', className)}>
        {content}
      </button>
    );
  }
  return <span className={cn('flex items-center gap-2.5', className)}>{content}</span>;
};

export default Logo;
