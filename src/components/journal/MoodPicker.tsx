import { cn } from '../../lib/utils';
import { MOODS } from '../../lib/constants';
import type { MoodType } from '../../types/journal';

interface MoodPickerProps {
  value: MoodType | '';
  onChange: (mood: MoodType) => void;
  error?: string;
}

export function MoodPicker({ value, onChange, error }: MoodPickerProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-slate-300">How are you feeling?</span>
      <div className="flex gap-2 flex-wrap">
        {MOODS.map((m) => (
          <button
            key={m.value}
            type="button"
            onClick={() => onChange(m.value)}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-2 rounded-xl border-2 cursor-pointer transition-all',
              value === m.value
                ? 'border-violet-500 bg-violet-50 dark:bg-violet-900/30 scale-105 shadow-md'
                : 'border-gray-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600',
            )}
          >
            <span className="text-2xl leading-none">{m.emoji}</span>
            <span className={cn(
              'text-xs font-medium',
              value === m.value
                ? 'text-violet-700 dark:text-violet-300'
                : 'text-gray-500 dark:text-slate-400',
            )}>
              {m.label}
            </span>
          </button>
        ))}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
