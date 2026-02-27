import { Suspense, lazy } from 'react';
import type { JournalEntry } from '../../types/journal';
import { WeeklyInsight } from '../dashboard/WeeklyInsight';

const MoodLineChart = lazy(() =>
  import('../dashboard/MoodLineChart').then((m) => ({ default: m.MoodLineChart })),
);
const MoodDistribution = lazy(() =>
  import('../dashboard/MoodDistribution').then((m) => ({ default: m.MoodDistribution })),
);

interface AnalyticsViewProps {
  entries: JournalEntry[];
  isDark: boolean;
}

export function AnalyticsView({ entries, isDark }: AnalyticsViewProps) {
  return (
    <div className="flex flex-col gap-6">
      <WeeklyInsight entries={entries} />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-4">Mood Over Time (last 14 days)</h3>
          <Suspense fallback={<div className="h-48 flex items-center justify-center text-gray-400">Loading…</div>}>
            <MoodLineChart entries={entries} isDark={isDark} />
          </Suspense>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-4">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-4">Mood Distribution</h3>
          <Suspense fallback={<div className="h-48 flex items-center justify-center text-gray-400">Loading…</div>}>
            <MoodDistribution entries={entries} isDark={isDark} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
