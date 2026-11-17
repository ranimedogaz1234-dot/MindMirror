import type { Language } from '../i18n';
import type { ClarityBand } from './scoring';

/** Every piece of interface text used by the personality test and its results. */
export interface UiStrings {
  // Language gate
  chooseLanguage: string;
  chooseLanguageHint: string;
  beginTest: string;
  changeLanguageAnytime: string;

  // Test
  questionOf: (current: number, total: number) => string;
  progress: string;
  back: string;
  close: string;
  saving: string;

  // Results header
  yourType: string;
  retake: string;
  saveResult: string;
  saved: string;
  savedAlready: string;
  signInToSave: string;

  // Sections
  lettersTitle: string;
  lettersIntro: string;
  preferencesTitle: string;
  preferencesIntro: string;
  strengthsTitle: string;
  weaknessesTitle: string;
  growthTitle: string;
  communicationTitle: string;
  decisionsTitle: string;
  socialTitle: string;
  workTitle: string;
  overviewTitle: string;

  // Scores
  clarity: Record<ClarityBand, string>;
  clarityLabel: string;
  tiedNote: string;
  pointsOutOf: (points: number, total: number) => string;

  // Methodology & sources
  methodologyTitle: string;
  methodologyBody: string[];
  disclaimerTitle: string;
  disclaimerBody: string;
  sourcesTitle: string;
  sourcesOfficial: string;
  sourcesResearch: string;
  sourcesNote: string;
}

const clarityEn: Record<ClarityBand, string> = {
  slight: 'slight preference',
  moderate: 'moderate preference',
  clear: 'clear preference',
  veryClear: 'very clear preference',
};

const clarityFr: Record<ClarityBand, string> = {
  slight: 'préférence légère',
  moderate: 'préférence modérée',
  clear: 'préférence nette',
  veryClear: 'préférence très nette',
};

const clarityAr: Record<ClarityBand, string> = {
  slight: 'ميل طفيف',
  moderate: 'ميل متوسّط',
  clear: 'ميل واضح',
  veryClear: 'ميل واضح جدًّا',
};

export const UI: Record<Language, UiStrings> = {
  en: {
    chooseLanguage: 'Choose your language',
    chooseLanguageHint: 'The questions, your result and every explanation will appear in the language you pick.',
    beginTest: 'Begin the test',
    changeLanguageAnytime: 'You can switch language at any point — your answers are kept.',

    questionOf: (c, t) => `Question ${c} of ${t}`,
    progress: 'Progress',
    back: 'Back',
    close: 'Close',
    saving: 'Saving…',

    yourType: 'Your type',
    retake: 'Retake test',
    saveResult: 'Save result',
    saved: 'Result saved',
    savedAlready: 'Saved to your profile',
    signInToSave: 'Sign in to save this result',

    lettersTitle: 'What your four letters mean',
    lettersIntro: 'Each letter describes a preference — a way of doing something you lean toward, not an ability you have or lack.',
    preferencesTitle: 'Your preference scores',
    preferencesIntro: 'How consistently your answers pointed in each direction. Both sides of a pair always add up to 100%.',
    strengthsTitle: 'Characteristic strengths',
    weaknessesTitle: 'Potential blind spots',
    growthTitle: 'Ideas for growth',
    communicationTitle: 'Communication style',
    decisionsTitle: 'Making decisions',
    socialTitle: 'Social preferences',
    workTitle: 'Work and learning',
    overviewTitle: 'Overview',

    clarity: clarityEn,
    clarityLabel: 'Preference clarity',
    tiedNote: 'Your answers split evenly here, so this letter is the least certain part of your result.',
    pointsOutOf: (p, t) => `${p} of ${t} points`,

    methodologyTitle: 'How these scores are calculated',
    methodologyBody: [
      'The questionnaire has 20 statements — five for each of the four pairs. Every statement leans toward one side of its pair.',
      'Every answer splits a fixed 3 points between the two sides of its pair: 3–0 for a strong answer, 2–1 for a milder one. Each pair therefore shares out exactly 15 points.',
      'Your percentage for a side is simply its share of those 15 points, which is why the two numbers always total 100%. Because 15 is an odd number, a completed pair never lands on an exact 50/50 split. The scoring is identical in all three languages — only the wording changes.',
      'These are questionnaire-based preference scores: they show how consistently you answered in one direction. They are not measured proportions of your personality, and a result near 50% simply means your answers did not lean clearly either way.',
    ],
    disclaimerTitle: 'An honest note about type',
    disclaimerBody:
      'Four-letter types are a tool for self-reflection and conversation, not a clinical diagnosis or a complete scientific description of a person. Independent research has questioned how stable type categories are over time and how well they predict job performance, and many researchers prefer trait models that use continuous scales. Read your result as a prompt to think about yourself, not as a verdict.',
    sourcesTitle: 'Sources & methodology',
    sourcesOfficial: 'Type theory (official)',
    sourcesResearch: 'Independent peer-reviewed research',
    sourcesNote:
      'MindMirror is not affiliated with, endorsed by, or certified by The Myers-Briggs Company or the Myers & Briggs Foundation. MBTI and Myers-Briggs Type Indicator are trademarks of their respective owners. Our questions and descriptions are written originally for MindMirror.',
  },

  fr: {
    chooseLanguage: 'Choisissez votre langue',
    chooseLanguageHint: 'Les questions, votre résultat et toutes les explications apparaîtront dans la langue choisie.',
    beginTest: 'Commencer le test',
    changeLanguageAnytime: 'Vous pouvez changer de langue à tout moment — vos réponses sont conservées.',

    questionOf: (c, t) => `Question ${c} sur ${t}`,
    progress: 'Progression',
    back: 'Retour',
    close: 'Fermer',
    saving: 'Enregistrement…',

    yourType: 'Votre type',
    retake: 'Refaire le test',
    saveResult: 'Enregistrer le résultat',
    saved: 'Résultat enregistré',
    savedAlready: 'Enregistré dans votre profil',
    signInToSave: 'Connectez-vous pour enregistrer ce résultat',

    lettersTitle: 'Ce que signifient vos quatre lettres',
    lettersIntro: "Chaque lettre décrit une préférence — une manière de faire vers laquelle vous penchez, et non une aptitude que vous auriez ou non.",
    preferencesTitle: 'Vos scores de préférence',
    preferencesIntro: 'À quel point vos réponses ont penché dans chaque direction. Les deux côtés d’une paire totalisent toujours 100 %.',
    strengthsTitle: 'Forces caractéristiques',
    weaknessesTitle: 'Angles morts possibles',
    growthTitle: 'Pistes de progression',
    communicationTitle: 'Style de communication',
    decisionsTitle: 'Prise de décision',
    socialTitle: 'Préférences sociales',
    workTitle: 'Travail et apprentissage',
    overviewTitle: 'Vue d’ensemble',

    clarity: clarityFr,
    clarityLabel: 'Netteté de la préférence',
    tiedNote: 'Vos réponses se partagent à parts égales ici : cette lettre est la partie la moins certaine de votre résultat.',
    pointsOutOf: (p, t) => `${p} points sur ${t}`,

    methodologyTitle: 'Comment ces scores sont calculés',
    methodologyBody: [
      'Le questionnaire comporte 20 affirmations — cinq pour chacune des quatre paires. Chaque affirmation penche vers un côté de sa paire.',
      'Chaque réponse répartit 3 points fixes entre les deux côtés de sa paire : 3–0 pour une réponse marquée, 2–1 pour une réponse nuancée. Chaque paire distribue donc exactement 15 points.',
      'Votre pourcentage pour un côté est sa part de ces 15 points, ce qui explique que les deux chiffres totalisent toujours 100 %. Comme 15 est impair, une paire complétée ne tombe jamais sur une égalité parfaite. Le calcul est identique dans les trois langues : seule la formulation change.',
      'Ce sont des scores de préférence issus d’un questionnaire : ils indiquent à quel point vous avez répondu de façon constante dans une direction. Ce ne sont pas des proportions mesurées de votre personnalité, et un résultat proche de 50 % signifie simplement que vos réponses n’ont penché nettement d’aucun côté.',
    ],
    disclaimerTitle: 'Une remarque honnête sur les types',
    disclaimerBody:
      "Les types à quatre lettres sont un outil de réflexion et de discussion, non un diagnostic clinique ni une description scientifique complète d'une personne. Des recherches indépendantes ont mis en question la stabilité des catégories dans le temps et leur capacité à prédire la performance professionnelle ; de nombreux chercheurs préfèrent des modèles de traits à échelles continues. Lisez votre résultat comme une invitation à réfléchir, non comme un verdict.",
    sourcesTitle: 'Sources et méthodologie',
    sourcesOfficial: 'Théorie des types (sources officielles)',
    sourcesResearch: 'Recherche indépendante évaluée par les pairs',
    sourcesNote:
      "MindMirror n'est ni affilié, ni approuvé, ni certifié par The Myers-Briggs Company ou la Myers & Briggs Foundation. MBTI et Myers-Briggs Type Indicator sont des marques de leurs titulaires respectifs. Nos questions et descriptions sont rédigées originalement pour MindMirror.",
  },

  ar: {
    chooseLanguage: 'اختر لغتك',
    chooseLanguageHint: 'ستظهر الأسئلة ونتيجتك وكل الشروح باللغة التي تختارها.',
    beginTest: 'ابدأ الاختبار',
    changeLanguageAnytime: 'يمكنك تغيير اللغة في أي لحظة — وتبقى إجاباتك محفوظة.',

    questionOf: (c, t) => `السؤال ${c} من ${t}`,
    progress: 'التقدّم',
    back: 'رجوع',
    close: 'إغلاق',
    saving: 'جارٍ الحفظ…',

    yourType: 'نمطك',
    retake: 'إعادة الاختبار',
    saveResult: 'حفظ النتيجة',
    saved: 'تم حفظ النتيجة',
    savedAlready: 'محفوظة في ملفّك',
    signInToSave: 'سجّل الدخول لحفظ هذه النتيجة',

    lettersTitle: 'ماذا تعني حروفك الأربعة',
    lettersIntro: 'كل حرف يصف ميلًا — طريقةً تميل إليها في فعل شيء ما، لا قدرةً تملكها أو تفتقدها.',
    preferencesTitle: 'درجات ميولك',
    preferencesIntro: 'إلى أي مدى اتّجهت إجاباتك في كل ناحية. ومجموع طرفَي كل ثنائية يساوي دائمًا ١٠٠٪.',
    strengthsTitle: 'نقاط قوّة مميِّزة',
    weaknessesTitle: 'نقاط عمياء محتملة',
    growthTitle: 'أفكار للتطوّر',
    communicationTitle: 'أسلوب التواصل',
    decisionsTitle: 'اتخاذ القرار',
    socialTitle: 'التفضيلات الاجتماعية',
    workTitle: 'العمل والتعلّم',
    overviewTitle: 'نظرة عامة',

    clarity: clarityAr,
    clarityLabel: 'وضوح الميل',
    tiedNote: 'انقسمت إجاباتك بالتساوي هنا، لذا فهذا الحرف أقلّ أجزاء نتيجتك يقينًا.',
    pointsOutOf: (p, t) => `${p} من ${t} نقاط`,

    methodologyTitle: 'كيف تُحتسب هذه الدرجات',
    methodologyBody: [
      'يتكوّن الاستبيان من ٢٠ عبارة — خمس لكل ثنائية من الأربع. وكل عبارة تميل إلى أحد طرفَي ثنائيّتها.',
      'كل إجابة توزّع ٣ نقاط ثابتة بين طرفَي ثنائيّتها: ٣–٠ للإجابة القويّة، و٢–١ للإجابة الأخفّ. وهكذا توزّع كل ثنائية ١٥ نقطة بالضبط.',
      'نسبتك لطرفٍ ما هي حصّته من تلك النقاط الخمس عشرة، ولذلك يكون مجموع الرقمين ١٠٠٪ دائمًا. ولأن ١٥ عدد فردي، لا تقع الثنائية المكتملة على تعادل تامّ أبدًا. والحساب واحد في اللغات الثلاث؛ الصياغة وحدها تتغيّر.',
      'هذه درجات ميل مبنيّة على استبيان: تُظهر مدى اتّساق إجاباتك في اتجاه واحد. وهي ليست نسبًا مقيسة من شخصيتك، والنتيجة القريبة من ٥٠٪ تعني ببساطة أن إجاباتك لم تمل بوضوح إلى أيّ جهة.',
    ],
    disclaimerTitle: 'ملاحظة صادقة عن الأنماط',
    disclaimerBody:
      'الأنماط الرباعية أداة للتأمّل الذاتي والحوار، لا تشخيصًا سريريًّا ولا وصفًا علميًّا كاملًا للشخص. وقد شكّكت أبحاث مستقلّة في مدى ثبات فئات الأنماط عبر الزمن وفي قدرتها على التنبّؤ بالأداء الوظيفي، ويفضّل كثير من الباحثين نماذج السمات ذات المقاييس المتّصلة. اقرأ نتيجتك بوصفها دعوة للتفكير في نفسك، لا حكمًا نهائيًّا.',
    sourcesTitle: 'المصادر والمنهجية',
    sourcesOfficial: 'نظرية الأنماط (مصادر رسمية)',
    sourcesResearch: 'أبحاث مستقلّة محكَّمة',
    sourcesNote:
      'MindMirror غير تابع لشركة Myers-Briggs أو مؤسسة Myers & Briggs ولا معتمد منهما. وMBTI وMyers-Briggs Type Indicator علامتان تجاريتان لأصحابهما. وأسئلتنا وأوصافنا مكتوبة أصلًا لـ MindMirror.',
  },
};

/**
 * Sources shown on the results page.
 *
 * Every DOI below was checked against Crossref and every link was confirmed to
 * resolve. Findings are summarised from the publications themselves — no
 * statistic here is invented.
 */
export interface SourceLink {
  label: string;
  url: string;
  note: Record<Language, string>;
}

export const OFFICIAL_SOURCES: SourceLink[] = [
  {
    label: 'The Myers & Briggs Foundation — The MBTI® preferences',
    url: 'https://www.myersbriggs.org/my-mbti-personality-type/the-mbti-preferences/',
    note: {
      en: 'The four preference pairs our questions are built around.',
      fr: 'Les quatre paires de préférences sur lesquelles nos questions sont construites.',
      ar: 'ثنائيات الميل الأربع التي بُنيت عليها أسئلتنا.',
    },
  },
  {
    label: 'The Myers & Briggs Foundation — The 16 personality types',
    url: 'https://www.myersbriggs.org/my-mbti-personality-type/the-16-mbti-personality-types/',
    note: {
      en: 'The official overview of the 16 type combinations.',
      fr: 'Présentation officielle des 16 combinaisons de types.',
      ar: 'العرض الرسمي لتوليفات الأنماط الستة عشر.',
    },
  },
  {
    label: 'The Myers-Briggs Company — MBTI facts',
    url: 'https://www.themyersbriggs.com/en-us/support/mbti-facts',
    note: {
      en: 'The publisher’s own account of what the instrument does and does not claim.',
      fr: "Le point de vue de l'éditeur sur ce que l'instrument prétend — et ne prétend pas — mesurer.",
      ar: 'بيان الناشر نفسه عمّا تدّعيه الأداة وما لا تدّعيه.',
    },
  },
];

export const RESEARCH_SOURCES: SourceLink[] = [
  {
    label: 'McCrae & Costa (1989), Journal of Personality, 57(1), 17–40',
    url: 'https://doi.org/10.1111/j.1467-6494.1989.tb00759.x',
    note: {
      en: 'Found the four MBTI scales relate to four of the Big Five trait dimensions, and argued the data are better described as continuous traits than as either/or types.',
      fr: 'Montre que les quatre échelles du MBTI recoupent quatre des cinq grands traits, et soutient que les données se décrivent mieux comme des traits continus que comme des types binaires.',
      ar: 'وجدت أن مقاييس MBTI الأربعة ترتبط بأربعة من سمات «العوامل الخمسة»، ورأت أن البيانات تُوصف كسمات متّصلة أفضل من وصفها كأنماط ثنائية.',
    },
  },
  {
    label: 'Furnham (1996), Personality and Individual Differences, 21(2), 303–307',
    url: 'https://doi.org/10.1016/0191-8869(96)00033-5',
    note: {
      en: 'Reported correlations between MBTI scales and the NEO-PI five-factor model, with no relationship found between the MBTI and neuroticism.',
      fr: 'Rapporte des corrélations entre les échelles du MBTI et le modèle en cinq facteurs NEO-PI, sans lien entre le MBTI et le névrosisme.',
      ar: 'أوردت ارتباطات بين مقاييس MBTI ونموذج العوامل الخمسة NEO-PI، دون أي علاقة بين MBTI والعُصابية.',
    },
  },
  {
    label: 'Pittenger (2005), Consulting Psychology Journal, 57(3), 210–221',
    url: 'https://doi.org/10.1037/1065-9293.57.3.210',
    note: {
      en: 'A cautionary review urging care when type results are used for counselling or workplace decisions.',
      fr: 'Une revue critique appelant à la prudence lorsque les résultats de type servent au conseil ou aux décisions professionnelles.',
      ar: 'مراجعة تحذيرية تدعو إلى الحذر عند استخدام نتائج الأنماط في الإرشاد أو قرارات العمل.',
    },
  },
];
