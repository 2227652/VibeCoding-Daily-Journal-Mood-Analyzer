import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        id={id}
        className={cn(
          'w-full px-3 py-2 rounded-lg border text-sm resize-none',
          'bg-white dark:bg-slate-800 text-gray-900 dark:text-slate-100',
          'border-gray-300 dark:border-slate-600',
          'placeholder:text-gray-400 dark:placeholder:text-slate-500',
          'focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500',
          error && 'border-red-400 focus:ring-red-400',
          className,
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  ),
);
Textarea.displayName = 'Textarea';
