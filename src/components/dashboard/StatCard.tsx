import { cn } from '../../lib/utils';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  accentColor: string;
}

export function StatCard({ label, value, subtext, icon, accentColor }: StatCardProps) {
  return (
    <div className={cn(
      'bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-slate-700 p-4 flex items-center gap-4 border-l-4',
      accentColor,
    )}>
      <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-800 shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-500 dark:text-slate-400 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-slate-100 leading-tight">{value}</p>
        {subtext && <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">{subtext}</p>}
      </div>
    </div>
  );
}
