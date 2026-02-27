import { Sun, Moon, BookHeart, Plus, BarChart2, Calendar, BookOpen } from 'lucide-react';
import type { ViewType } from '../../types/journal';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  activeView: ViewType;
  onViewChange: (v: ViewType) => void;
  onNewEntry: () => void;
}

const NAV: { view: ViewType; label: string; icon: React.ReactNode }[] = [
  { view: 'journal', label: 'Journal', icon: <BookOpen className="w-4 h-4" /> },
  { view: 'analytics', label: 'Analytics', icon: <BarChart2 className="w-4 h-4" /> },
  { view: 'calendar', label: 'Calendar', icon: <Calendar className="w-4 h-4" /> },
];

export function Header({ isDark, onToggleTheme, activeView, onViewChange, onNewEntry }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-gray-200 dark:border-slate-700">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-violet-600 flex items-center justify-center">
            <BookHeart className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-gray-900 dark:text-slate-100 hidden sm:block">MoodJournal</span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1 flex-1 justify-center">
          {NAV.map(({ view, label, icon }) => (
            <button
              key={view}
              onClick={() => onViewChange(view)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium cursor-pointer',
                activeView === view
                  ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300'
                  : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800',
              )}
            >
              {icon}
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800 cursor-pointer"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Button onClick={onNewEntry} size="sm">
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Entry</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
