import type { Language } from '../i18n';
import { PROFILES_EN } from './profiles/en';
import { PROFILES_FR } from './profiles/fr';
import { PROFILES_AR } from './profiles/ar';
import type { TypeProfile, TypeProfiles } from './profiles/schema';

export * from './scoring';
export * from './items';
export * from './dimensions';
export * from './ui';
export type { TypeProfile, TypeProfiles };

const PROFILES: Record<Language, TypeProfiles> = {
  en: PROFILES_EN,
  fr: PROFILES_FR,
  ar: PROFILES_AR,
};

/** The written profile for a type in the chosen language (English as fallback). */
export function profileFor(type: string, language: Language): TypeProfile | undefined {
  return PROFILES[language]?.[type] ?? PROFILES.en[type];
}

export { PROFILES };
