import type { MoodConfig } from '../types/journal';

export const MOODS: MoodConfig[] = [
  {
    value: 'amazing',
    label: 'Amazing',
    emoji: '😄',
    score: 5,
    color: '#10b981',
    bgLight: 'bg-emerald-100',
    bgDark: 'dark:bg-emerald-900/30',
    textLight: 'text-emerald-700',
    textDark: 'dark:text-emerald-400',
  },
  {
    value: 'happy',
    label: 'Happy',
    emoji: '😊',
    score: 4,
    color: '#3b82f6',
    bgLight: 'bg-blue-100',
    bgDark: 'dark:bg-blue-900/30',
    textLight: 'text-blue-700',
    textDark: 'dark:text-blue-400',
  },
  {
    value: 'okay',
    label: 'Okay',
    emoji: '😐',
    score: 3,
    color: '#f59e0b',
    bgLight: 'bg-amber-100',
    bgDark: 'dark:bg-amber-900/30',
    textLight: 'text-amber-700',
    textDark: 'dark:text-amber-400',
  },
  {
    value: 'sad',
    label: 'Sad',
    emoji: '😔',
    score: 2,
    color: '#8b5cf6',
    bgLight: 'bg-violet-100',
    bgDark: 'dark:bg-violet-900/30',
    textLight: 'text-violet-700',
    textDark: 'dark:text-violet-400',
  },
  {
    value: 'awful',
    label: 'Awful',
    emoji: '😢',
    score: 1,
    color: '#ef4444',
    bgLight: 'bg-red-100',
    bgDark: 'dark:bg-red-900/30',
    textLight: 'text-red-700',
    textDark: 'dark:text-red-400',
  },
];

export const MOOD_MAP = Object.fromEntries(MOODS.map((m) => [m.value, m])) as Record<string, MoodConfig>;

export const DEFAULT_TAGS = [
  'Work', 'Personal', 'Health', 'Family', 'Travel', 'Gratitude', 'Goals', 'Reflection',
];

// Keyword lists for auto mood detection
export const MOOD_KEYWORDS: Record<string, string[]> = {
  amazing: ['amazing', 'fantastic', 'wonderful', 'excellent', 'excited', 'thrilled', 'ecstatic', 'best', 'great', 'brilliant', 'incredible', 'awesome', 'perfect'],
  happy: ['happy', 'good', 'glad', 'joyful', 'pleased', 'delighted', 'content', 'grateful', 'thankful', 'love', 'enjoy', 'smile', 'laugh', 'fun'],
  okay: ['okay', 'fine', 'alright', 'normal', 'average', 'neutral', 'usual', 'decent', 'moderate', 'so-so'],
  sad: ['sad', 'disappointed', 'miss', 'hard', 'tired', 'lonely', 'down', 'upset', 'worried', 'anxious', 'stressed', 'difficult', 'struggle'],
  awful: ['awful', 'terrible', 'horrible', 'worst', 'hate', 'angry', 'furious', 'depressed', 'miserable', 'devastated', 'failed', 'disaster'],
};

export const WRITING_PROMPTS = [
  "What made you smile today?",
  "What's one thing you're grateful for right now?",
  "Describe a challenge you faced and how you handled it.",
  "What did you learn today that surprised you?",
  "What would you like to improve about yourself this week?",
  "Describe your mood in three words and explain why.",
  "What's something you're looking forward to?",
  "Who made a positive impact on your day?",
  "What's weighing on your mind right now?",
  "Describe a small win from today.",
];
