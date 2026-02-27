import type { JournalEntry } from '../../types/journal';
import { MOOD_MAP } from '../../lib/constants';
import { getISODate } from '../../lib/utils';
import { cn } from '../../lib/utils';

interface MoodCalendarProps {
  entries: JournalEntry[];
}

export function MoodCalendar({ entries }: MoodCalendarProps) {
  // Build a map: dateStr -> latest mood
  const moodByDate = new Map<string, string>();
  for (const e of entries) {
    const d = e.createdAt.split('T')[0];
    if (!moodByDate.has(d)) moodByDate.set(d, e.mood);
  }

  // Generate last 35 days (5 weeks)
  const days: { date: string; label: number; isToday: boolean }[] = [];
  const today = new Date();
  for (let i = 34; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push({
      date: getISODate(d),
      label: d.getDate(),
      isToday: i === 0,
    });
  }

  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((d, i) => (
          <div key={i} className="text-center text-xs text-gray-400 dark:text-slate-500 font-medium py-1">{d}</div>
        ))}
        {/* Pad to start on correct weekday */}
        {Array.from({ length: new Date(days[0].date).getDay() }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}
        {days.map(({ date, label, isToday }) => {
          const mood = moodByDate.get(date);
          const cfg = mood ? MOOD_MAP[mood] : null;
          return (
            <div
              key={date}
              title={cfg ? `${cfg.emoji} ${cfg.label}` : date}
              className={cn(
                'aspect-square rounded-lg flex items-center justify-center text-xs font-medium cursor-default',
                isToday && 'ring-2 ring-violet-500',
                cfg
                  ? `${cfg.bgLight} ${cfg.bgDark} ${cfg.textLight} ${cfg.textDark}`
                  : 'bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-600',
              )}
            >
              {cfg ? <span className="text-sm">{cfg.emoji}</span> : label}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 pt-1 justify-center">
        {Object.values(MOOD_MAP).map((m) => (
          <span key={m.value} className="flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
            <span>{m.emoji}</span> {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
