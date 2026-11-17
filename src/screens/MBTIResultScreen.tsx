import React from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Check,
  ExternalLink,
  Info,
  Lightbulb,
  Loader2,
  MessageCircle,
  RotateCcw,
  Scale,
  ShieldAlert,
  Sparkles,
  Users,
  X,
  Zap,
} from 'lucide-react';
import ModalShell from '../components/ModalShell';
import { useLanguage } from '../i18n';
import {
  DIMENSION_LABELS,
  OFFICIAL_SOURCES,
  POINTS_PER_DIMENSION,
  POLE_INFO,
  RESEARCH_SOURCES,
  UI,
  profileFor,
  type MbtiResult,
  type ScoredDimension,
} from '../mbti';
import { LanguagePicker } from './MBTITestScreen';

interface MBTIResultProps {
  result: MbtiResult;
  onClose: () => void;
  onRetake: () => void;
  onSave: () => void;
  saving: boolean;
  saved: boolean;
  canSave: boolean;
}

/** One dimension: a labelled bar split between the two poles. */
const PreferenceBar: React.FC<{ dimension: ScoredDimension }> = ({ dimension }) => {
  const { language } = useLanguage();
  const t = UI[language];
  const winner = POLE_INFO[dimension.winner].name[language];
  const loser = POLE_INFO[dimension.loser].name[language];

  return (
    <div className="space-y-2.5">
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <span className="font-bold text-slate-900">
          {dimension.winner} · {winner}
        </span>
        <span className="font-medium text-slate-400">
          {loser} · {dimension.loser}
        </span>
      </div>

      <div className="h-3 rounded-full bg-slate-100 overflow-hidden flex">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${dimension.winnerPercent}%` }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full"
        />
      </div>

      <div className="flex items-baseline justify-between gap-3">
        <span className="text-lg font-black text-violet-700 tabular-nums">{dimension.winnerPercent}%</span>
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
          {dimension.tied ? t.clarity.slight : t.clarity[dimension.clarity]}
        </span>
        <span className="text-lg font-black text-slate-300 tabular-nums">{dimension.loserPercent}%</span>
      </div>

      <p className="text-[11px] font-medium text-slate-400">
        {t.pointsOutOf(dimension.winnerPoints, POINTS_PER_DIMENSION)}
        {dimension.tied ? ` · ${t.tiedNote}` : ''}
      </p>
    </div>
  );
};

const Section: React.FC<{
  icon: React.ElementType;
  title: string;
  tone?: string;
  children: React.ReactNode;
}> = ({ icon: Icon, title, tone = 'bg-violet-50 text-violet-600', children }) => (
  <section className="bg-white rounded-[1.75rem] p-6 border border-slate-100 shadow-sm space-y-4">
    <div className="flex items-center gap-3">
      <span className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${tone}`}>
        <Icon size={18} />
      </span>
      <h3 className="font-bold text-slate-900 tracking-tight">{title}</h3>
    </div>
    {children}
  </section>
);

const Bullets: React.FC<{ items: string[]; dotClass: string }> = ({ items, dotClass }) => (
  <ul className="space-y-2.5">
    {items.map((text) => (
      <li key={text} className="flex gap-3 text-sm text-slate-600 leading-relaxed">
        <span className={`mt-[0.45rem] w-1.5 h-1.5 rounded-full shrink-0 ${dotClass}`} />
        <span>{text}</span>
      </li>
    ))}
  </ul>
);

const MBTIResult: React.FC<MBTIResultProps> = ({ result, onClose, onRetake, onSave, saving, saved, canSave }) => {
  const { language, setLanguage, dir, rtl } = useLanguage();
  const t = UI[language];
  const profile = profileFor(result.type, language);

  if (!profile) return null;

  return (
    <ModalShell onClose={onClose} className="sm:max-w-5xl">
      <div dir={dir} lang={language} className="flex-1 bg-[#FAF9FF]">
        {/* ── Header ── */}
        <header className="sticky top-0 z-10 bg-[#FAF9FF]/90 backdrop-blur-lg border-b border-violet-100/70 px-6 sm:px-10 py-4 flex items-center justify-between gap-3">
          <LanguagePicker value={language} onChange={setLanguage} />
          <button
            onClick={onClose}
            aria-label={t.close}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 shrink-0"
          >
            <X size={20} />
          </button>
        </header>

        <div className="px-6 sm:px-10 py-8 space-y-6">
          {/* ── Type headline + letters (two columns on desktop) ── */}
          <div className="grid gap-6 lg:grid-cols-5 items-start">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 relative overflow-hidden rounded-[2rem] p-8 text-white shadow-xl shadow-violet-200"
              style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' }}
            >
              <div className="absolute top-[-25%] end-[-15%] w-56 h-56 bg-white/10 rounded-full blur-3xl" />
              <div className="relative space-y-3">
                <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  <Sparkles size={12} /> {t.yourType}
                </span>
                <p className="font-display text-6xl sm:text-7xl font-medium tracking-tight leading-none">{result.type}</p>
                <p className="text-xl font-bold text-indigo-50">{profile.nickname}</p>
                <p className="text-indigo-100/90 leading-relaxed">{profile.tagline}</p>
              </div>
            </motion.div>

            <div className="lg:col-span-3 bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm space-y-5">
              <div>
                <h3 className="font-bold text-slate-900 tracking-tight">{t.lettersTitle}</h3>
                <p className="mt-1.5 text-xs text-slate-500 font-medium leading-relaxed">{t.lettersIntro}</p>
              </div>

              <div className="space-y-3">
                {result.type.split('').map((letter) => {
                  const info = POLE_INFO[letter as keyof typeof POLE_INFO];
                  return (
                    <div key={letter} className="flex gap-4 items-start">
                      <span className="w-11 h-11 shrink-0 rounded-xl bg-violet-100 text-violet-700 font-display text-2xl font-medium flex items-center justify-center">
                        {letter}
                      </span>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-900 text-sm">{info.name[language]}</p>
                        <p className="text-xs text-slate-500 leading-relaxed mt-0.5">{info.blurb[language]}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Preference scores ── */}
          <section className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            <div>
              <h3 className="font-display text-2xl font-medium text-slate-900 tracking-tight">{t.preferencesTitle}</h3>
              <p className="mt-1.5 text-sm text-slate-500 font-medium leading-relaxed">{t.preferencesIntro}</p>
            </div>

            <div className="grid gap-7 sm:grid-cols-2">
              {result.dimensions.map((dimension) => (
                <div key={dimension.id} className="space-y-3">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    {DIMENSION_LABELS[dimension.id][language]}
                  </p>
                  <PreferenceBar dimension={dimension} />
                </div>
              ))}
            </div>
          </section>

          {/* ── Overview ── */}
          <Section icon={Info} title={t.overviewTitle}>
            <p className="text-sm text-slate-600 leading-relaxed">{profile.overview}</p>
          </Section>

          {/* ── Strengths / weaknesses ── */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Section icon={Zap} title={t.strengthsTitle} tone="bg-emerald-50 text-emerald-600">
              <Bullets items={profile.strengths} dotClass="bg-emerald-400" />
            </Section>
            <Section icon={ShieldAlert} title={t.weaknessesTitle} tone="bg-amber-50 text-amber-600">
              <Bullets items={profile.weaknesses} dotClass="bg-amber-400" />
            </Section>
          </div>

          {/* ── Style sections ── */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Section icon={MessageCircle} title={t.communicationTitle} tone="bg-blue-50 text-blue-600">
              <p className="text-sm text-slate-600 leading-relaxed">{profile.communication}</p>
            </Section>
            <Section icon={Scale} title={t.decisionsTitle} tone="bg-indigo-50 text-indigo-600">
              <p className="text-sm text-slate-600 leading-relaxed">{profile.decisions}</p>
            </Section>
            <Section icon={Users} title={t.socialTitle} tone="bg-rose-50 text-rose-600">
              <p className="text-sm text-slate-600 leading-relaxed">{profile.social}</p>
            </Section>
            <Section icon={BookOpen} title={t.workTitle} tone="bg-slate-100 text-slate-600">
              <p className="text-sm text-slate-600 leading-relaxed">{profile.work}</p>
            </Section>
          </div>

          {/* ── Growth ── */}
          <Section icon={Lightbulb} title={t.growthTitle} tone="bg-violet-50 text-violet-600">
            <Bullets items={profile.growth} dotClass="bg-violet-400" />
          </Section>

          {/* ── Methodology, disclaimer and sources ── */}
          <section className="bg-white rounded-[2rem] p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-display text-2xl font-medium text-slate-900 tracking-tight">{t.sourcesTitle}</h3>

            <div className="space-y-2.5">
              <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{t.methodologyTitle}</p>
              {t.methodologyBody.map((paragraph) => (
                <p key={paragraph} className="text-sm text-slate-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="bg-amber-50/70 border border-amber-200/70 rounded-2xl p-5 space-y-2">
              <p className="text-[11px] font-black uppercase tracking-widest text-amber-700">{t.disclaimerTitle}</p>
              <p className="text-sm text-amber-900 leading-relaxed">{t.disclaimerBody}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {[
                { title: t.sourcesOfficial, links: OFFICIAL_SOURCES },
                { title: t.sourcesResearch, links: RESEARCH_SOURCES },
              ].map(({ title, links }) => (
                <div key={title} className="space-y-3">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{title}</p>
                  <ul className="space-y-3">
                    {links.map((source) => (
                      <li key={source.url}>
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-start gap-1.5 text-sm font-bold text-violet-700 hover:text-violet-900"
                        >
                          <span className="underline decoration-violet-200 underline-offset-4">{source.label}</span>
                          <ExternalLink size={13} className="mt-1 shrink-0 opacity-60" />
                        </a>
                        <p className="mt-1 text-xs text-slate-500 leading-relaxed">{source.note[language]}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed border-t border-slate-100 pt-4">{t.sourcesNote}</p>
          </section>

          {/* ── Actions ── */}
          <div className="flex flex-col sm:flex-row gap-3 pb-2">
            <button
              onClick={onSave}
              disabled={!canSave || saving || saved}
              className="flex-1 h-14 rounded-2xl bg-violet-600 text-white font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 shadow-lg shadow-violet-200 hover:bg-violet-700 transition-all active:scale-[0.98] disabled:opacity-60 disabled:active:scale-100"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              {saved && <Check size={16} />}
              {!canSave ? t.signInToSave : saving ? t.saving : saved ? t.savedAlready : t.saveResult}
            </button>
            <button
              onClick={onRetake}
              className="flex-1 h-14 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2.5 hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              <RotateCcw size={16} className={rtl ? 'scale-x-[-1]' : undefined} />
              {t.retake}
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
  );
};

export default MBTIResult;
