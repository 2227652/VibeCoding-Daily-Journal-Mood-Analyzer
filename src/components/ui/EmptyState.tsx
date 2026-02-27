import { BookOpen } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = 'No entries yet',
  description = 'Start writing your first journal entry to track your mood and reflect on your day.',
  actionLabel = 'Write your first entry',
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-6">
      <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center mb-4">
        <BookOpen className="w-8 h-8 text-violet-600 dark:text-violet-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-slate-400 max-w-xs mb-6">{description}</p>
      {onAction && (
        <Button onClick={onAction} size="md">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
