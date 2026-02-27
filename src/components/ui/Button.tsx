import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  primary: 'bg-violet-600 hover:bg-violet-500 dark:bg-violet-600 dark:hover:bg-violet-500 text-white shadow-sm focus:ring-violet-500 dark:focus:ring-offset-slate-900',
  secondary: 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700 focus:ring-violet-400',
  ghost: 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 focus:ring-violet-400',
  danger: 'bg-red-600 hover:bg-red-500 text-white shadow-sm focus:ring-red-500 dark:focus:ring-offset-slate-900',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  ),
);
Button.displayName = 'Button';
