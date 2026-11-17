import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'fr' | 'ar';

export const LANGUAGES: { code: Language; label: string; english: string; flag: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'English', english: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'fr', label: 'Français', english: 'French', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ar', label: 'العربية', english: 'Arabic', flag: '🇹🇳', dir: 'rtl' },
];

export const isRtl = (lang: Language) => lang === 'ar';
export const dirOf = (lang: Language): 'ltr' | 'rtl' => (isRtl(lang) ? 'rtl' : 'ltr');

const STORAGE_KEY = 'mindmirror.language';

function readStored(): Language | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'en' || value === 'fr' || value === 'ar' ? value : null;
  } catch {
    // Private windows and blocked site data make storage throw; fall back silently.
    return null;
  }
}

function detectFromBrowser(): Language {
  try {
    for (const tag of navigator.languages ?? [navigator.language]) {
      const base = tag?.slice(0, 2).toLowerCase();
      if (base === 'fr' || base === 'ar' || base === 'en') return base;
    }
  } catch {
    /* ignore */
  }
  return 'en';
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  dir: 'ltr' | 'rtl';
  rtl: boolean;
  /** True until a stored/remote preference has been applied, so nothing flashes. */
  ready: boolean;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => readStored() ?? detectFromBrowser());
  const [ready] = useState(true);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* preference simply is not remembered */
    }
  }, []);

  // Keep <html lang> accurate for screen readers and hyphenation. The document
  // direction stays LTR: only the translated surfaces opt into RTL, so the rest
  // of the (English) interface keeps its layout.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({ language, setLanguage, dir: dirOf(language), rtl: isRtl(language), ready }),
    [language, setLanguage, ready]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};

/** Picks the entry for the active language from a per-language record. */
export function pick<T>(record: Record<Language, T>, language: Language): T {
  return record[language] ?? record.en;
}
