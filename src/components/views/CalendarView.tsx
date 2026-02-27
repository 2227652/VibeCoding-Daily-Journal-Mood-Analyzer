import type { JournalEntry } from '../../types/journal';
import { MoodCalendar } from '../dashboard/MoodCalendar';

interface CalendarViewProps {
  entries: JournalEntry[];
}

export function CalendarView({ entries }: CalendarViewProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-6">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-slate-100 mb-6">Mood Calendar (last 5 weeks)</h3>
      <MoodCalendar entries={entries} />
    </div>
  );
}
