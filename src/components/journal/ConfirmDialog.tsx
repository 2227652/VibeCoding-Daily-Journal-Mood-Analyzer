import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface ConfirmDialogProps {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ title, description, onConfirm, onCancel }: ConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full sm:max-w-sm bg-white dark:bg-slate-900 rounded-t-2xl sm:rounded-2xl shadow-2xl p-6 flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-slate-100">Delete "{title}"?</h3>
            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
              {description ?? 'This action cannot be undone.'}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
          <Button variant="danger" onClick={onConfirm} className="flex-1">Delete</Button>
        </div>
      </div>
    </div>
  );
}
