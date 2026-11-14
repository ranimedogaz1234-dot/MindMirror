export type TraitId = 
  | 'openness' 
  | 'growth-mindset' 
  | 'natural-leader' 
  | 'creativity' 
  | 'discipline' 
  | 'emotional-intelligence' 
  | 'confidence' 
  | 'social-energy' 
  | 'resilience' 
  | 'empathy';

export interface Trait {
  id: TraitId;
  name: string;
  description: string;
  iconName: string;
}

export interface Question {
  id: string;
  text: string;
  options: {
    text: string;
    score: number;
  }[];
}

export interface Quiz {
  id: string;
  traitId: TraitId;
  questions: Question[];
}

export interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  streak: number;
  lastActive: any;
  traitsProgress: Record<TraitId, number>;
  mbtiType?: string;
}

export interface QuizResult {
  id: string;
  userId: string;
  traitId: TraitId;
  score: number;
  percentage: number;
  timestamp: any;
}

export interface MBTIType {
  code: string;
  name: string;
  description: string;
  careers: string[];
  strengths: string[];
  weaknesses: string[];
}

export interface MoodEntry {
  id: string;
  userId: string;
  moodType: string;
  moodPercentage: number;
  moodEmoji: string;
  answers: Record<string, number>;
  timestamp: any;
}
