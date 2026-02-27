import { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DEFAULT_TAGS } from '../../lib/constants';

interface TagSelectorProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

export function TagSelector({ value, onChange }: TagSelectorProps) {
  const [custom, setCustom] = useState('');

  function toggle(tag: string) {
    onChange(value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag]);
  }

  function addCustom() {
    const t = custom.trim();
    if (t && !value.includes(t)) onChange([...value, t]);
    setCustom('');
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-slate-300">Tags</span>
      <div className="flex flex-wrap gap-1.5">
        {DEFAULT_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggle(tag)}
            className={cn(
              'px-2.5 py-1 rounded-full text-xs font-medium border cursor-pointer',
              value.includes(tag)
                ? 'bg-violet-600 text-white border-violet-600'
                : 'border-gray-200 dark:border-slate-600 text-gray-600 dark:text-slate-400 hover:border-violet-400',
            )}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustom())}
          placeholder="Add custom tag…"
          className="flex-1 px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
        <button
          type="button"
          onClick={addCustom}
          className="p-1.5 rounded-lg border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-gray-500 dark:text-slate-400" />
        </button>
      </div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {value.map((tag) => (
            <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded-full text-xs font-medium">
              {tag}
              <button type="button" onClick={() => toggle(tag)} className="cursor-pointer hover:text-red-500">
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
