import { Search, X } from 'lucide-react';
import type { MoodType } from '../../types/journal';
import { MOODS } from '../../lib/constants';
import { cn } from '../../lib/utils';

interface SearchFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  moodFilter: MoodType | 'all';
  onMoodFilterChange: (v: MoodType | 'all') => void;
}

export function SearchFilterBar({ search, onSearchChange, moodFilter, onMoodFilterChange }: SearchFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search entries…"
          className="w-full pl-9 pr-8 py-2 text-sm rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        {search && (
          <button onClick={() => onSearchChange('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer">
            <X className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Mood filter chips */}
      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => onMoodFilterChange('all')}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer',
            moodFilter === 'all'
              ? 'bg-violet-600 text-white border-violet-600'
              : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-violet-300',
          )}
        >
          All
        </button>
        {MOODS.map((m) => (
          <button
            key={m.value}
            onClick={() => onMoodFilterChange(moodFilter === m.value ? 'all' : m.value)}
            className={cn(
              'px-3 py-1.5 rounded-full text-xs font-medium border cursor-pointer',
              moodFilter === m.value
                ? 'bg-violet-600 text-white border-violet-600'
                : 'border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 hover:border-violet-300',
            )}
          >
            {m.emoji} {m.label}
          </button>
        ))}
      </div>
    </div>
  );
}
