import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface ModalShellProps {
  children: React.ReactNode;
  className?: string;
  /** Closes the dialog. Wired to the Escape key and to clicks on the backdrop. */
  onClose?: () => void;
}

/**
 * Container for the quiz / test flows.
 * - Phones: a full-screen takeover (as the app has always behaved).
 * - Tablets and up: a centered dialog card over a dimmed backdrop, so the
 *   question layout keeps comfortable proportions on wide screens.
 */
const ModalShell: React.FC<ModalShellProps> = ({ children, className, onClose }) => {
  // Escape closes the dialog, and the page behind it does not scroll while open.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        // Only a click on the backdrop itself (desktop) closes the dialog.
        if (e.target === e.currentTarget) onClose?.();
      }}
      className="fixed inset-0 z-[70] flex sm:items-center sm:justify-center sm:p-6 bg-white sm:bg-slate-900/40 sm:backdrop-blur-sm"
    >
      <div
        className={cn(
          'relative flex flex-col w-full h-full overflow-y-auto bg-white',
          'sm:h-auto sm:min-h-[600px] sm:max-h-[calc(100vh-3rem)] sm:max-w-xl sm:rounded-[2.5rem] sm:shadow-2xl sm:shadow-slate-900/20',
          className
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default ModalShell;
