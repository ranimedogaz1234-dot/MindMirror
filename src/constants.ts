import { Trait } from './types';

export const TRAITS: Trait[] = [
  {
    id: 'openness',
    name: 'Openness',
    description: 'Willingness to try new things and engage with new ideas.',
    iconName: 'Compass'
  },
  {
    id: 'growth-mindset',
    name: 'Growth Mindset',
    description: 'The belief that abilities can be developed through dedication.',
    iconName: 'TrendingUp'
  },
  {
    id: 'natural-leader',
    name: 'Natural Leader',
    description: 'Ability to guide and inspire others effectively.',
    iconName: 'Crown'
  },
  {
    id: 'creativity',
    name: 'Creativity',
    description: 'The use of imagination or original ideas to create something.',
    iconName: 'Palette'
  },
  {
    id: 'discipline',
    name: 'Discipline',
    description: 'Consistency and control in pursuing goals.',
    iconName: 'Target'
  },
  {
    id: 'emotional-intelligence',
    name: 'Emotional Intelligence',
    description: 'Understanding and managing emotions in yourself and others.',
    iconName: 'Brain'
  },
  {
    id: 'confidence',
    name: 'Confidence',
    description: 'Trust in your own abilities, qualities, and judgment.',
    iconName: 'Zap'
  },
  {
    id: 'social-energy',
    name: 'Social Energy',
    description: 'Your capacity and style of interacting with others.',
    iconName: 'Users'
  },
  {
    id: 'resilience',
    name: 'Resilience',
    description: 'The capacity to recover quickly from difficulties.',
    iconName: 'Shield'
  },
  {
    id: 'empathy',
    name: 'Empathy',
    description: 'The ability to understand and share the feelings of another.',
    iconName: 'Heart'
  }
];

export const APP_THEME = {
  primary: '#7C3AED', // Violet-600
  secondary: '#6366F1', // Indigo-500
  background: '#F5F7FF',
  card: '#FFFFFF',
  text: '#0F172A', // Slate-900
  textMuted: '#64748B', // Slate-500
  gradient: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 100%)' // Violet to Indigo
};
