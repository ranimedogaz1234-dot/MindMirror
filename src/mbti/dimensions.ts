import type { Language } from '../i18n';
import type { DimensionId, Pole } from './scoring';

/**
 * What each letter means, in our own words, following the four preference
 * pairs described by the Myers & Briggs Foundation:
 * https://www.myersbriggs.org/my-mbti-personality-type/the-mbti-preferences/
 *
 * Each pole has a one-word name and a short, plain explanation. These describe
 * where someone prefers to direct attention, take in information, decide, and
 * organise life — not ability, and not a diagnosis.
 */
export interface PoleInfo {
  /** e.g. "Introversion" */
  name: Record<Language, string>;
  /** One short sentence a first-time reader can follow. */
  blurb: Record<Language, string>;
}

export const POLE_INFO: Record<Pole, PoleInfo> = {
  E: {
    name: { en: 'Extraversion', fr: 'Extraversion', ar: 'الانبساط' },
    blurb: {
      en: 'Draws energy from the outer world of people and activity, and often thinks by talking things through.',
      fr: "Puise son énergie dans le monde extérieur, les gens et l'action, et réfléchit souvent en parlant.",
      ar: 'يستمدّ طاقته من العالم الخارجي، من الناس والنشاط، وغالبًا ما يفكّر عبر الحديث.',
    },
  },
  I: {
    name: { en: 'Introversion', fr: 'Introversion', ar: 'الانطواء' },
    blurb: {
      en: 'Draws energy from the inner world of thought and reflection, and usually thinks before speaking.',
      fr: "Puise son énergie dans le monde intérieur de la pensée et de la réflexion, et réfléchit avant de parler.",
      ar: 'يستمدّ طاقته من عالمه الداخلي من الأفكار والتأمّل، وعادةً يفكّر قبل أن يتكلّم.',
    },
  },
  S: {
    name: { en: 'Sensing', fr: 'Sensation', ar: 'الحسّ' },
    blurb: {
      en: 'Takes in information through the senses: concrete facts, details and what has actually been observed.',
      fr: 'Recueille l’information par les sens : faits concrets, détails et observations réelles.',
      ar: 'يستقبل المعلومات عبر الحواس: الحقائق الملموسة والتفاصيل وما جرت ملاحظته فعلًا.',
    },
  },
  N: {
    name: { en: 'Intuition', fr: 'Intuition', ar: 'الحدس' },
    blurb: {
      en: 'Takes in information by looking for patterns, meanings and possibilities beyond the immediate facts.',
      fr: 'Recueille l’information en cherchant des schémas, des significations et des possibilités au-delà des faits immédiats.',
      ar: 'يستقبل المعلومات عبر البحث عن الأنماط والمعاني والاحتمالات خلف الوقائع المباشرة.',
    },
  },
  T: {
    name: { en: 'Thinking', fr: 'Pensée', ar: 'التفكير' },
    blurb: {
      en: 'Decides by stepping back and weighing consistent logic, principles and cause and effect.',
      fr: 'Décide en prenant du recul et en pesant la logique, les principes et les causes et effets.',
      ar: 'يقرّر بالتراجع خطوة وتقييم المنطق المتّسق والمبادئ والعلاقة بين السبب والنتيجة.',
    },
  },
  F: {
    name: { en: 'Feeling', fr: 'Sentiment', ar: 'الوجدان' },
    blurb: {
      en: 'Decides by stepping in and weighing values, harmony and the effect a choice has on people.',
      fr: 'Décide en se mettant à la place des autres et en pesant les valeurs, l’harmonie et l’impact humain.',
      ar: 'يقرّر بالانخراط في الموقف وتقييم القيم والانسجام وأثر الخيار على الناس.',
    },
  },
  J: {
    name: { en: 'Judging', fr: 'Jugement', ar: 'الحسم' },
    blurb: {
      en: 'Prefers life planned and settled: decisions made, structure in place, matters closed.',
      fr: 'Préfère une vie planifiée et arrêtée : décisions prises, cadre établi, dossiers clos.',
      ar: 'يفضّل حياة مخطَّطة ومستقرّة: قرارات محسومة وبنية واضحة وأمور منتهية.',
    },
  },
  P: {
    name: { en: 'Perceiving', fr: 'Perception', ar: 'الاستكشاف' },
    blurb: {
      en: 'Prefers life flexible and open: options kept available, plans able to change as things develop.',
      fr: 'Préfère une vie souple et ouverte : options maintenues, plans pouvant évoluer.',
      ar: 'يفضّل حياة مرنة ومفتوحة: خيارات متاحة وخطط قابلة للتغيّر مع تطوّر الأمور.',
    },
  },
};

/** Heading for each dimension chart, e.g. "Energy" / "Introversion vs. Extraversion". */
export const DIMENSION_LABELS: Record<DimensionId, Record<Language, string>> = {
  EI: { en: 'Where you direct energy', fr: 'Où vous dirigez votre énergie', ar: 'أين توجّه طاقتك' },
  SN: { en: 'How you take in information', fr: "Comment vous recueillez l'information", ar: 'كيف تستقبل المعلومات' },
  TF: { en: 'How you reach decisions', fr: 'Comment vous prenez vos décisions', ar: 'كيف تصل إلى قراراتك' },
  JP: { en: 'How you deal with the outer world', fr: 'Comment vous abordez le monde extérieur', ar: 'كيف تتعامل مع العالم الخارجي' },
};
