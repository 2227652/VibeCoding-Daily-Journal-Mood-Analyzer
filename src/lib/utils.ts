import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { MoodType } from '../types/journal';
import { MOOD_KEYWORDS } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatRelativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return formatDateShort(iso);
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function analyzeTextMood(text: string): MoodType {
  const lower = text.toLowerCase();
  const scores: Record<MoodType, number> = { amazing: 0, happy: 0, okay: 0, sad: 0, awful: 0 };

  for (const [mood, keywords] of Object.entries(MOOD_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) scores[mood as MoodType]++;
    }
  }

  const best = (Object.entries(scores) as [MoodType, number][]).reduce(
    (a, b) => (b[1] > a[1] ? b : a),
    ['okay' as MoodType, 0],
  );

  return best[1] > 0 ? best[0] : 'okay';
}

export function getISODate(date: Date = new Date()): string {
  return date.toISOString().split('T')[0];
}

export function calcStreak(dates: string[]): number {
  if (!dates.length) return 0;
  const unique = [...new Set(dates.map((d) => d.split('T')[0]))].sort().reverse();
  let streak = 0;
  let current = new Date();
  current.setHours(0, 0, 0, 0);

  for (const d of unique) {
    const day = new Date(d);
    day.setHours(0, 0, 0, 0);
    const diff = Math.round((current.getTime() - day.getTime()) / 86400000);
    if (diff <= 1) { streak++; current = day; }
    else break;
  }
  return streak;
}
