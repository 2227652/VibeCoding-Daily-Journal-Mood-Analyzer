import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import type { JournalEntry } from '../../types/journal';
import { MOOD_MAP } from '../../lib/constants';
import { formatDateShort } from '../../lib/utils';

interface MoodLineChartProps {
  entries: JournalEntry[];
  isDark: boolean;
}

export function MoodLineChart({ entries, isDark }: MoodLineChartProps) {
  const data = [...entries]
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    .slice(-14)
    .map((e) => ({
      date: formatDateShort(e.createdAt),
      score: MOOD_MAP[e.mood]?.score ?? 3,
      mood: MOOD_MAP[e.mood]?.label ?? 'Okay',
      emoji: MOOD_MAP[e.mood]?.emoji ?? '😐',
    }));

  const gridColor = isDark ? '#334155' : '#f1f5f9';
  const axisColor = isDark ? '#94a3b8' : '#9ca3af';

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: { payload: typeof data[0] }[] }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg px-3 py-2 shadow-lg text-sm">
        <p className="font-medium text-gray-900 dark:text-slate-100">{d.date}</p>
        <p className="text-violet-600 dark:text-violet-400">{d.emoji} {d.mood}</p>
      </div>
    );
  };

  if (!data.length) return <p className="text-center text-gray-400 py-10">No data yet</p>;

  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis dataKey="date" tick={{ fill: axisColor, fontSize: 11 }} tickLine={false} />
        <YAxis domain={[0.5, 5.5]} ticks={[1, 2, 3, 4, 5]} tick={{ fill: axisColor, fontSize: 11 }} tickLine={false}
          tickFormatter={(v) => ['', '😢', '😔', '😐', '😊', '😄'][v] ?? ''} />
        <Tooltip content={<CustomTooltip />} />
        <ReferenceLine y={3} stroke={gridColor} strokeDasharray="4 4" />
        <Line
          type="monotone"
          dataKey="score"
          stroke="#8b5cf6"
          strokeWidth={2.5}
          dot={{ fill: '#8b5cf6', r: 4, strokeWidth: 0 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
