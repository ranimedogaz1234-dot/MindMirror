import type { Language } from '../i18n';
import type { Pole, ScorableItem } from './scoring';

/**
 * The questionnaire: 20 original statements, 5 per dimension.
 *
 * Wording is written for MindMirror. These are not items from the published
 * MBTI® instrument, which is copyrighted — they are our own statements aimed
 * at the same four preference pairs described in Jungian type theory.
 *
 * `keyed` is the pole that *agreement* points toward. Scoring lives in
 * ./scoring.ts, and is identical whichever language is on screen: the language
 * only changes the text, never the weights.
 */
export interface MbtiItem extends ScorableItem {
  id: string;
  keyed: Pole;
  text: Record<Language, string>;
}

export const MBTI_ITEMS: MbtiItem[] = [
  // ── Extraversion / Introversion ──
  {
    id: 'ei1',
    keyed: 'E',
    text: {
      en: 'Meeting new people usually leaves me energised rather than drained.',
      fr: "Rencontrer de nouvelles personnes me donne de l'énergie plutôt que de m'épuiser.",
      ar: 'لقاء أشخاص جدد يمنحني طاقة بدل أن يستنزفني.',
    },
  },
  {
    id: 'ei2',
    keyed: 'E',
    text: {
      en: 'I think best when I talk an idea through out loud with someone.',
      fr: "Je réfléchis mieux lorsque j'expose une idée à voix haute avec quelqu'un.",
      ar: 'أفكّر بشكل أفضل حين أناقش الفكرة بصوت مسموع مع شخص آخر.',
    },
  },
  {
    id: 'ei3',
    keyed: 'E',
    text: {
      en: 'In a lively group, I join the conversation quickly rather than hanging back.',
      fr: 'Dans un groupe animé, je me joins vite à la conversation plutôt que de rester en retrait.',
      ar: 'في مجموعة نشِطة، أنضمّ إلى الحديث بسرعة بدل أن أبقى متحفّظًا.',
    },
  },
  {
    id: 'ei4',
    keyed: 'E',
    text: {
      en: 'I would rather spend a free evening out with people than quietly on my own.',
      fr: 'Je préfère passer une soirée libre avec des gens plutôt que tranquillement seul(e).',
      ar: 'أفضّل قضاء أمسية حرّة مع الناس على قضائها وحدي بهدوء.',
    },
  },
  {
    id: 'ei5',
    keyed: 'E',
    text: {
      en: 'I tend to act first and reflect afterwards.',
      fr: "J'ai tendance à agir d'abord et à réfléchir ensuite.",
      ar: 'أميل إلى التصرّف أولًا ثم التفكير لاحقًا.',
    },
  },

  // ── Sensing / Intuition ──
  {
    id: 'sn1',
    keyed: 'S',
    text: {
      en: 'I trust concrete facts and first-hand experience more than theories.',
      fr: "Je fais davantage confiance aux faits concrets et à l'expérience directe qu'aux théories.",
      ar: 'أثق بالحقائق الملموسة والتجربة المباشرة أكثر من النظريات.',
    },
  },
  {
    id: 'sn2',
    keyed: 'S',
    text: {
      en: 'I notice practical details that other people overlook.',
      fr: 'Je remarque des détails pratiques qui échappent aux autres.',
      ar: 'ألاحظ تفاصيل عملية تغيب عن انتباه الآخرين.',
    },
  },
  {
    id: 'sn3',
    keyed: 'S',
    text: {
      en: 'I prefer instructions that are specific and step by step.',
      fr: 'Je préfère des consignes précises, étape par étape.',
      ar: 'أفضّل التعليمات المحدّدة خطوة بخطوة.',
    },
  },
  {
    id: 'sn4',
    keyed: 'S',
    text: {
      en: 'I focus on what is actually in front of me rather than on what might be possible.',
      fr: 'Je me concentre sur ce qui est réellement devant moi plutôt que sur ce qui pourrait être possible.',
      ar: 'أركّز على ما هو أمامي فعلًا أكثر من التفكير فيما قد يكون ممكنًا.',
    },
  },
  {
    id: 'sn5',
    keyed: 'S',
    text: {
      en: 'I would rather improve something proven than invent something untested.',
      fr: "Je préfère améliorer quelque chose d'éprouvé plutôt qu'inventer quelque chose de non testé.",
      ar: 'أفضّل تحسين شيء مُجرَّب على ابتكار شيء غير مُختبَر.',
    },
  },

  // ── Thinking / Feeling ──
  {
    id: 'tf1',
    keyed: 'T',
    text: {
      en: 'When deciding, I put consistent logic ahead of how people will feel.',
      fr: "Pour décider, je privilégie une logique cohérente sur l'effet que cela aura sur les émotions des gens.",
      ar: 'عند اتخاذ القرار، أقدّم المنطق المتّسق على ما سيشعر به الآخرون.',
    },
  },
  {
    id: 'tf2',
    keyed: 'T',
    text: {
      en: 'I find it easy to give honest critical feedback when it is warranted.',
      fr: "Il m'est facile de formuler une critique honnête lorsqu'elle est justifiée.",
      ar: 'يسهل عليّ تقديم نقد صريح عندما يكون مُبرَّرًا.',
    },
  },
  {
    id: 'tf3',
    keyed: 'T',
    text: {
      en: 'I judge an argument by whether it holds together, not by who is making it.',
      fr: 'Je juge un argument sur sa cohérence, et non sur la personne qui le présente.',
      ar: 'أحكم على الحجّة بمدى تماسكها، لا بمن يقدّمها.',
    },
  },
  {
    id: 'tf4',
    keyed: 'T',
    text: {
      en: 'I would rather be told the blunt truth than have my feelings spared.',
      fr: "Je préfère qu'on me dise la vérité sans détour plutôt qu'on ménage mes sentiments.",
      ar: 'أفضّل أن تُقال لي الحقيقة بصراحة على أن تُراعى مشاعري.',
    },
  },
  {
    id: 'tf5',
    keyed: 'T',
    text: {
      en: 'I tend to spot the flaw in a plan before I notice its merits.',
      fr: "J'ai tendance à repérer la faille d'un plan avant d'en voir les mérites.",
      ar: 'أميل إلى ملاحظة الخلل في الخطة قبل أن أرى مزاياها.',
    },
  },

  // ── Judging / Perceiving ──
  {
    id: 'jp1',
    keyed: 'J',
    text: {
      en: 'I feel settled once a decision is made and the plan is fixed.',
      fr: 'Je me sens tranquille une fois la décision prise et le plan arrêté.',
      ar: 'أشعر بالاستقرار بمجرّد اتخاذ القرار وتثبيت الخطة.',
    },
  },
  {
    id: 'jp2',
    keyed: 'J',
    text: {
      en: 'I like to finish work well before the deadline rather than close to it.',
      fr: "J'aime terminer un travail bien avant l'échéance plutôt qu'au dernier moment.",
      ar: 'أحبّ إنهاء العمل قبل الموعد النهائي بوقت كافٍ لا في اللحظة الأخيرة.',
    },
  },
  {
    id: 'jp3',
    keyed: 'J',
    text: {
      en: 'I keep lists and schedules to organise my day.',
      fr: 'Je tiens des listes et un agenda pour organiser ma journée.',
      ar: 'أعتمد على القوائم والجداول لتنظيم يومي.',
    },
  },
  {
    id: 'jp4',
    keyed: 'J',
    text: {
      en: 'Unexpected changes to my plans unsettle me more than they excite me.',
      fr: 'Les changements imprévus dans mes plans me déstabilisent plus qu’ils ne m’enthousiasment.',
      ar: 'التغييرات المفاجئة في خططي تربكني أكثر مما تحمّسني.',
    },
  },
  {
    id: 'jp5',
    keyed: 'J',
    text: {
      en: 'I prefer knowing what to expect over keeping my options open.',
      fr: 'Je préfère savoir à quoi m’attendre plutôt que de garder mes options ouvertes.',
      ar: 'أفضّل معرفة ما سيحدث على إبقاء خياراتي مفتوحة.',
    },
  },
];

/** Labels for the four answer choices, in the order defined by RESPONSES. */
export const RESPONSE_LABELS: Record<Language, string[]> = {
  en: ['Strongly agree', 'Somewhat agree', 'Somewhat disagree', 'Strongly disagree'],
  fr: ["Tout à fait d'accord", "Plutôt d'accord", "Plutôt pas d'accord", "Pas du tout d'accord"],
  ar: ['أوافق بشدة', 'أوافق نوعًا ما', 'لا أوافق نوعًا ما', 'لا أوافق إطلاقًا'],
};
