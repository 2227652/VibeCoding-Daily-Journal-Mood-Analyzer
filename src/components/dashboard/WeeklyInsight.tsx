import { TrendingUp, TrendingDown, Minus, Flame, BookOpen, BarChart2 } from 'lucide-react';
import type { JournalEntry } from '../../types/journal';
import { MOOD_MAP } from '../../lib/constants';
import { calcStreak } from '../../lib/utils';

interface WeeklyInsightProps {
  entries: JournalEntry[];
}

export function WeeklyInsight({ entries }: WeeklyInsightProps) {
  const now = Date.now();
  const week = entries.filter((e) => now - new Date(e.createdAt).getTime() < 7 * 86400000);
  const prevWeek = entries.filter((e) => {
    const age = now - new Date(e.createdAt).getTime();
    return age >= 7 * 86400000 && age < 14 * 86400000;
  });

  const avgScore = (arr: JournalEntry[]) =>
    arr.length ? arr.reduce((s, e) => s + (MOOD_MAP[e.mood]?.score ?? 3), 0) / arr.length : 0;

  const thisAvg = avgScore(week);
  const prevAvg = avgScore(prevWeek);
  const delta = thisAvg - prevAvg;

  const streak = calcStreak(entries.map((e) => e.createdAt));
  const totalWords = entries.reduce((s, e) => s + e.wordCount, 0);
  const topMood = (() => {
    const counts: Record<string, number> = {};
    for (const e of week) counts[e.mood] = (counts[e.mood] ?? 0) + 1;
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return top ? MOOD_MAP[top[0]] : null;
  })();

  const TrendIcon = delta > 0.3 ? TrendingUp : delta < -0.3 ? TrendingDown : Minus;
  const trendColor = delta > 0.3 ? 'text-emerald-500' : delta < -0.3 ? 'text-red-500' : 'text-gray-400 dark:text-slate-500';

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-3 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
          <Flame className="w-3.5 h-3.5 text-orange-500" /> Writing Streak
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{streak}<span className="text-sm font-normal text-gray-400 ml-1">days</span></p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-3 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
          <TrendIcon className={`w-3.5 h-3.5 ${trendColor}`} /> Mood Trend
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
          {thisAvg ? thisAvg.toFixed(1) : '—'}
          <span className="text-sm font-normal text-gray-400 ml-1">/ 5</span>
        </p>
        {prevAvg > 0 && (
          <p className={`text-xs ${trendColor}`}>
            {delta > 0 ? '+' : ''}{delta.toFixed(1)} vs last week
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-3 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
          <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Total Words
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">{totalWords.toLocaleString()}</p>
        <p className="text-xs text-gray-400 dark:text-slate-500">{entries.length} entries</p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-3 flex flex-col gap-1">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400">
          <BarChart2 className="w-3.5 h-3.5 text-violet-500" /> Top Mood (week)
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-slate-100">
          {topMood ? topMood.emoji : '—'}
        </p>
        <p className="text-xs text-gray-400 dark:text-slate-500">{topMood?.label ?? 'No entries'}</p>
      </div>
    </div>
  );
}
