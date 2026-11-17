/**
 * Shape of a personality type profile.
 *
 * Every one of the 16 types has its own fully written profile in each
 * language — nothing is templated or shared between types. Profiles describe
 * *tendencies* reported by people who share a set of preferences; they are
 * written in balanced, non-judgemental language, make no claim that one type
 * is better than another, and predict nothing about an individual's ability
 * or career.
 */
export interface TypeProfile {
  /** A descriptive nickname written for MindMirror. */
  nickname: string;
  /** One memorable line. */
  tagline: string;
  /** Two sentences on what this combination tends to look like. */
  overview: string;
  /** Four characteristic strengths. */
  strengths: string[];
  /** Four potential weaknesses or blind spots. */
  weaknesses: string[];
  /** Typical communication style. */
  communication: string;
  /** Typical decision-making tendencies. */
  decisions: string;
  /** Typical social preferences. */
  social: string;
  /** Work and learning preferences. */
  work: string;
  /** Three personal growth suggestions. */
  growth: string[];
}

export type TypeProfiles = Record<string, TypeProfile>;
