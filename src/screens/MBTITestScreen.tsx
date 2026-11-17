import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Check, Sparkles, X } from 'lucide-react';
import { db } from '../lib/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useAuth } from '../providers/AuthProvider';
import toast from 'react-hot-toast';
import ModalShell from '../components/ModalShell';
import { LANGUAGES, useLanguage, type Language } from '../i18n';
import {
  MBTI_ITEMS,
  RESPONSE_LABELS,
  UI,
  scoreAnswers,
  type MbtiResult,
  type ResponseIndex,
} from '../mbti';
import MBTIResult from './MBTIResultScreen';

/** Compact language switcher used on the gate, during the test and on results. */
export const LanguagePicker: React.FC<{
  value: Language;
  onChange: (lang: Language) => void;
  size?: 'sm' | 'lg';
}> = ({ value, onChange, size = 'sm' }) => (
  <div
    role="group"
    aria-label="Language"
    className={size === 'lg' ? 'grid gap-3 w-full' : 'flex items-center gap-1.5'}
  >
    {LANGUAGES.map((lang) => {
      const active = lang.code === value;
      return (
        <button
          key={lang.code}
          type="button"
          onClick={() => onChange(lang.code)}
          aria-pressed={active}
          lang={lang.code}
          dir={lang.dir}
          className={
            size === 'lg'
              ? `w-full flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-start transition-all ${
                  active
                    ? 'border-violet-500 bg-violet-50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-violet-200 hover:bg-violet-50/40'
                }`
              : `px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  active ? 'bg-violet-100 text-violet-700' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`
          }
        >
          <span className={size === 'lg' ? 'text-2xl' : 'text-sm'} aria-hidden>
            {lang.flag}
          </span>
          <span className={size === 'lg' ? 'flex-1 text-lg font-bold text-slate-800' : ''}>{lang.label}</span>
          {size === 'lg' && active && <Check size={20} className="text-violet-600 shrink-0" />}
        </button>
      );
    })}
  </div>
);

type Stage = 'language' | 'test' | 'result';

const MBTITestScreen: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, profile } = useAuth();
  const { language, setLanguage, dir, rtl } = useLanguage();

  // Someone who has already chosen a language before skips straight past the gate.
  const [stage, setStage] = useState<Stage>('language');
  const [currentIdx, setCurrentIdx] = useState(0);
  /** Answers keyed by item id, so switching language never disturbs them. */
  const [answers, setAnswers] = useState<Record<string, ResponseIndex>>({});
  const [result, setResult] = useState<MbtiResult | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const t = UI[language];
  const labels = RESPONSE_LABELS[language];
  const total = MBTI_ITEMS.length;
  const item = MBTI_ITEMS[currentIdx];
  const progress = ((currentIdx + (answers[item?.id ?? ''] !== undefined ? 1 : 0)) / total) * 100;

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  const persist = async (scored: MbtiResult) => {
    if (!user) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        mbtiType: scored.type,
        mbtiScores: scored.percentages,
        language,
        lastActive: serverTimestamp(),
      });
      setSaved(true);
      toast.success(`${t.saved}: ${scored.type}`);
    } catch (err) {
      console.error('Save MBTI result error:', err);
      toast.error(t.saveResult);
    } finally {
      setSaving(false);
    }
  };

  const handleAnswer = (response: ResponseIndex) => {
    const next = { ...answers, [item.id]: response };
    setAnswers(next);

    if (currentIdx < total - 1) {
      setCurrentIdx(currentIdx + 1);
      return;
    }

    const scored = scoreAnswers(MBTI_ITEMS, next);
    setResult(scored);
    setStage('result');
    void persist(scored);
  };

  const restart = () => {
    setAnswers({});
    setCurrentIdx(0);
    setResult(null);
    setSaved(false);
    setStage('test');
  };

  // ── Language gate ──
  if (stage === 'language') {
    return (
      <ModalShell onClose={onClose}>
        <div dir={dir} lang={language} className="flex-1 flex flex-col p-8 sm:p-10">
          <header className="flex items-center justify-between mb-8">
            <span className="w-12 h-12 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
              <Sparkles size={24} />
            </span>
            <button
              onClick={onClose}
              aria-label={t.close}
              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700"
            >
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 flex flex-col justify-center">
            <h2 className="font-display text-3xl sm:text-4xl font-medium tracking-tight text-slate-900">
              {t.chooseLanguage}
            </h2>
            <p className="mt-3 text-slate-500 font-medium leading-relaxed">{t.chooseLanguageHint}</p>

            <div className="mt-8">
              <LanguagePicker value={language} onChange={setLanguage} size="lg" />
            </div>

            <p className="mt-6 text-xs font-medium text-slate-400">{t.changeLanguageAnytime}</p>
          </div>

          <button
            onClick={() => setStage('test')}
            className="mt-8 w-full h-14 bg-violet-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all active:scale-[0.98]"
          >
            {t.beginTest}
          </button>
        </div>
      </ModalShell>
    );
  }

  // ── Results ──
  if (stage === 'result' && result) {
    return (
      <MBTIResult
        result={result}
        onClose={onClose}
        onRetake={restart}
        onSave={() => persist(result)}
        saving={saving}
        saved={saved || profile?.mbtiType === result.type}
        canSave={!!user}
      />
    );
  }

  // ── Questionnaire ──
  return (
    <ModalShell onClose={onClose}>
      <div dir={dir} lang={language} className="flex-1 flex flex-col p-6 sm:p-10">
        <header className="space-y-4 mb-8">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => (currentIdx === 0 ? setStage('language') : setCurrentIdx(currentIdx - 1))}
              aria-label={t.back}
              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 shrink-0"
            >
              <ArrowLeft size={20} className={rtl ? 'rotate-180' : undefined} />
            </button>

            <LanguagePicker value={language} onChange={setLanguage} />

            <button
              onClick={onClose}
              aria-label={t.close}
              className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-700 shrink-0"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest text-slate-400">
              <span>{t.questionOf(currentIdx + 1, total)}</span>
              <span>{Math.round((answeredCount / total) * 100)}%</span>
            </div>
            <div
              className="h-1.5 bg-slate-100 rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={Math.round(progress)}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={t.progress}
            >
              <motion.div
                initial={false}
                animate={{ width: `${((currentIdx + 1) / total) * 100}%` }}
                className="h-full bg-violet-600"
              />
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${item.id}-${language}`}
              initial={{ opacity: 0, x: rtl ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: rtl ? 20 : -20 }}
              transition={{ duration: 0.22 }}
              className="space-y-8"
            >
              <h2 className="font-display text-2xl sm:text-3xl font-medium text-slate-900 leading-snug">
                {item.text[language]}
              </h2>

              <div className="space-y-3">
                {labels.map((label, i) => {
                  const selected = answers[item.id] === i;
                  return (
                    <button
                      key={label}
                      onClick={() => handleAnswer(i as ResponseIndex)}
                      className={`w-full p-5 text-start border-2 rounded-2xl font-bold transition-all active:scale-[0.99] flex items-center justify-between gap-3 ${
                        selected
                          ? 'border-violet-500 bg-violet-50 text-violet-900'
                          : 'border-slate-100 text-slate-700 hover:border-violet-200 hover:bg-violet-50/40'
                      }`}
                    >
                      <span>{label}</span>
                      {selected && <Check size={18} className="text-violet-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </ModalShell>
  );
};

export default MBTITestScreen;
