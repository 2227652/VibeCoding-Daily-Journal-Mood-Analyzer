import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { JournalEntry } from '../../types/journal';
import { MOODS } from '../../lib/constants';

interface MoodDistributionProps {
  entries: JournalEntry[];
  isDark: boolean;
}

export function MoodDistribution({ entries, isDark }: MoodDistributionProps) {
  const data = MOODS.map((m) => ({
    name: `${m.emoji} ${m.label}`,
    value: entries.filter((e) => e.mood === m.value).length,
    color: m.color,
  })).filter((d) => d.value > 0);

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { name: string; value: number }[] }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm">
        <p className="font-medium text-gray-900 dark:text-slate-100">{payload[0].name}</p>
        <p className="text-violet-600 dark:text-violet-400">{payload[0].value} entries</p>
      </div>
    );
  };

  if (!data.length) return <p className="text-center text-gray-400 py-10">No data yet</p>;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
          {data.map((d, i) => <Cell key={i} fill={d.color} />)}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          iconType="circle"
          iconSize={8}
          formatter={(value) => <span style={{ color: isDark ? '#94a3b8' : '#6b7280', fontSize: 12 }}>{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
