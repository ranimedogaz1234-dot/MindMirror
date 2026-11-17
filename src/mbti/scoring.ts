/**
 * Scoring for the MindMirror personality questionnaire.
 *
 * Design notes (these are the claims the results page is allowed to make):
 *
 * - 20 statements, 5 for each of the four dimensions.
 * - Every statement is *keyed* to one pole (for example "E"). Agreeing moves
 *   the score toward that pole, disagreeing moves it toward the opposite pole.
 * - Every answer splits a fixed 3 points between the two poles: 3-0 for a
 *   strong answer, 2-1 for a milder one. So each dimension always distributes
 *   exactly 15 points (5 statements x 3 points), whatever is answered.
 * - A preference percentage is simply that pole's share of its dimension's
 *   15 points. The two percentages of a dimension always add up to 100.
 * - Because 15 is odd, a fully answered dimension can never land on an exact
 *   50/50 tie: there is always a definite preferred side.
 *
 * The result is deterministic: the same answers always produce the same type
 * and the same percentages, in any language. Nothing here is random, and
 * nothing is hard-coded per type.
 *
 * These are questionnaire-based preference scores — how consistently someone
 * answered in one direction — not measured proportions of a personality.
 */

export type Pole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';
export type DimensionId = 'EI' | 'SN' | 'TF' | 'JP';

export const DIMENSIONS: { id: DimensionId; poles: [Pole, Pole] }[] = [
  { id: 'EI', poles: ['E', 'I'] },
  { id: 'SN', poles: ['S', 'N'] },
  { id: 'TF', poles: ['T', 'F'] },
  { id: 'JP', poles: ['J', 'P'] },
];

/** Opposite pole of the same dimension. */
export const OPPOSITE: Record<Pole, Pole> = {
  E: 'I', I: 'E',
  S: 'N', N: 'S',
  T: 'F', F: 'T',
  J: 'P', P: 'J',
};

export const DIMENSION_OF: Record<Pole, DimensionId> = {
  E: 'EI', I: 'EI',
  S: 'SN', N: 'SN',
  T: 'TF', F: 'TF',
  J: 'JP', P: 'JP',
};

/**
 * The four answer choices, in display order. Each one splits the item's
 * 3 points between the keyed pole and its opposite, so the totals never drift.
 */
export const RESPONSES = [
  { id: 'stronglyAgree', keyed: 3, opposite: 0 },
  { id: 'agree', keyed: 2, opposite: 1 },
  { id: 'disagree', keyed: 1, opposite: 2 },
  { id: 'stronglyDisagree', keyed: 0, opposite: 3 },
] as const;

export type ResponseIndex = 0 | 1 | 2 | 3;

/** Points every answered statement shares out between the two poles. */
export const POINTS_PER_ITEM = 3;

/** Points available to each dimension: 5 statements x 3 points. */
export const POINTS_PER_DIMENSION = 15;

export interface ScoredDimension {
  id: DimensionId;
  /** The pole this person leaned toward. */
  winner: Pole;
  /** The other pole. */
  loser: Pole;
  /** Percentage for `winner`, 50-100. `loser` holds the remainder. */
  winnerPercent: number;
  loserPercent: number;
  /** Raw points, for transparency. Always sums to POINTS_PER_DIMENSION. */
  winnerPoints: number;
  loserPoints: number;
  /** How consistently the answers pointed one way. */
  clarity: ClarityBand;
  /** True when the dimension came out an exact 50/50 split. */
  tied: boolean;
}

export type ClarityBand = 'slight' | 'moderate' | 'clear' | 'veryClear';

export function clarityOf(percent: number): ClarityBand {
  if (percent >= 90) return 'veryClear';
  if (percent >= 75) return 'clear';
  if (percent >= 60) return 'moderate';
  return 'slight';
}

export interface MbtiResult {
  /** The four-letter type, e.g. "ISTP". */
  type: string;
  dimensions: ScoredDimension[];
  /** Flat percentage per pole, convenient for storage: { E: 28, I: 72, ... } */
  percentages: Record<Pole, number>;
}

export interface ScorableItem {
  id: string;
  /** The pole that agreement with this statement points to. */
  keyed: Pole;
}

/**
 * When a dimension lands on an exact 50/50 split we have no evidence either
 * way, so we report a fixed second-pole letter rather than letting an
 * arbitrary ordering decide. The results page labels these as a tie.
 */
const TIE_BREAK: Record<DimensionId, Pole> = { EI: 'I', SN: 'N', TF: 'F', JP: 'P' };

/**
 * Turns answers into a type and a set of preference percentages.
 *
 * @param items   the questionnaire items, in any order
 * @param answers answer index (0-3) per item id; unanswered items are ignored
 */
export function scoreAnswers(items: ScorableItem[], answers: Record<string, ResponseIndex>): MbtiResult {
  const points = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 } as Record<Pole, number>;

  for (const item of items) {
    const answer = answers[item.id];
    if (answer === undefined) continue;
    const response = RESPONSES[answer];
    if (!response) continue;
    points[item.keyed] += response.keyed;
    points[OPPOSITE[item.keyed]] += response.opposite;
  }

  const percentages = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 } as Record<Pole, number>;

  const dimensions: ScoredDimension[] = DIMENSIONS.map(({ id, poles }) => {
    const [a, b] = poles;
    const total = points[a] + points[b];

    // An unanswered dimension is reported as an even split rather than NaN.
    const aPercent = total === 0 ? 50 : Math.round((points[a] / total) * 100);
    const bPercent = 100 - aPercent;

    percentages[a] = aPercent;
    percentages[b] = bPercent;

    const tied = aPercent === bPercent;
    const winner: Pole = tied ? TIE_BREAK[id] : aPercent > bPercent ? a : b;
    const loser = OPPOSITE[winner];

    return {
      id,
      winner,
      loser,
      winnerPercent: percentages[winner],
      loserPercent: percentages[loser],
      winnerPoints: points[winner],
      loserPoints: points[loser],
      clarity: clarityOf(percentages[winner]),
      tied,
    };
  });

  return {
    type: dimensions.map((d) => d.winner).join(''),
    dimensions,
    percentages,
  };
}

/** All 16 four-letter combinations, in the conventional order. */
export const ALL_TYPES: string[] = (() => {
  const out: string[] = [];
  for (const ei of ['I', 'E'] as const)
    for (const sn of ['S', 'N'] as const)
      for (const tf of ['T', 'F'] as const)
        for (const jp of ['J', 'P'] as const) out.push(`${ei}${sn}${tf}${jp}`);
  return out;
})();
