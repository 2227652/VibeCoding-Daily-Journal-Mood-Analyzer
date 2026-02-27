import { Pencil, Trash2, Tag } from 'lucide-react';
import type { JournalEntry } from '../../types/journal';
import { MOOD_MAP } from '../../lib/constants';
import { cn, formatDate, formatRelativeTime } from '../../lib/utils';

interface EntryCardProps {
  entry: JournalEntry;
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string, title: string) => void;
}

export function EntryCard({ entry, onEdit, onDelete }: EntryCardProps) {
  const mood = MOOD_MAP[entry.mood];

  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-violet-300 dark:hover:border-violet-600 hover:shadow-md p-4 flex flex-col gap-3 transition-all">
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-slate-100 truncate">{entry.title}</h3>
          <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{formatDate(entry.createdAt)}</p>
        </div>
        <span className={cn(
          'shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
          mood.bgLight, mood.bgDark, mood.textLight, mood.textDark,
        )}>
          <span>{mood.emoji}</span>
          <span>{mood.label}</span>
        </span>
      </div>

      {/* Content preview */}
      <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
        {entry.content}
      </p>

      {/* Auto-detected mood hint */}
      {entry.autoMood && entry.autoMood !== entry.mood && (
        <p className="text-xs text-violet-500 dark:text-violet-400">
          ✨ Text suggests: {MOOD_MAP[entry.autoMood]?.emoji} {MOOD_MAP[entry.autoMood]?.label}
        </p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-slate-800">
        <div className="flex items-center gap-2 flex-wrap">
          {entry.tags.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 text-xs text-gray-500 dark:text-slate-400">
              <Tag className="w-2.5 h-2.5" />{tag}
            </span>
          ))}
          <span className="text-xs text-gray-400 dark:text-slate-500">{entry.wordCount}w</span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100">
          <button
            onClick={() => onEdit(entry)}
            className="p-1.5 rounded-lg hover:bg-violet-50 dark:hover:bg-violet-900/20 text-gray-400 dark:text-slate-500 hover:text-violet-600 dark:hover:text-violet-400 cursor-pointer"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(entry.id, entry.title)}
            className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 dark:text-slate-500 hover:text-red-500 cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-400 dark:text-slate-600">{formatRelativeTime(entry.updatedAt)}</p>
    </div>
  );
}
