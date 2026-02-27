import { useMemo, useState } from 'react';
import type { JournalEntry, MoodType } from '../types/journal';

export function useJournalFilter(entries: JournalEntry[]) {
  const [search, setSearch] = useState('');
  const [moodFilter, setMoodFilter] = useState<MoodType | 'all'>('all');
  const [tagFilter, setTagFilter] = useState<string>('');

  const filtered = useMemo(() => {
    let result = [...entries];
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.content.toLowerCase().includes(q) ||
          e.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }
    if (moodFilter !== 'all') result = result.filter((e) => e.mood === moodFilter);
    if (tagFilter) result = result.filter((e) => e.tags.includes(tagFilter));
    return result;
  }, [entries, search, moodFilter, tagFilter]);

  return { filtered, search, setSearch, moodFilter, setMoodFilter, tagFilter, setTagFilter };
}
