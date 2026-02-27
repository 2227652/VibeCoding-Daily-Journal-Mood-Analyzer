import type { JournalEntry } from '../../types/journal';
import { useJournalFilter } from '../../hooks/useJournalFilter';
import { SearchFilterBar } from '../journal/SearchFilterBar';
import { EntryCard } from '../journal/EntryCard';
import { EmptyState } from '../ui/EmptyState';

interface JournalViewProps {
  entries: JournalEntry[];
  onEdit: (entry: JournalEntry) => void;
  onDelete: (id: string, title: string) => void;
  onNew: () => void;
}

export function JournalView({ entries, onEdit, onDelete, onNew }: JournalViewProps) {
  const { filtered, search, setSearch, moodFilter, setMoodFilter } = useJournalFilter(entries);

  return (
    <div className="flex flex-col gap-4">
      <SearchFilterBar
        search={search}
        onSearchChange={setSearch}
        moodFilter={moodFilter}
        onMoodFilterChange={setMoodFilter}
      />

      {filtered.length === 0 ? (
        entries.length === 0 ? (
          <EmptyState onAction={onNew} />
        ) : (
          <EmptyState
            title="No entries match"
            description="Try a different search or clear the mood filter."
            actionLabel="Clear filters"
            onAction={() => { setSearch(''); setMoodFilter('all'); }}
          />
        )
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {filtered.map((entry) => (
            <EntryCard key={entry.id} entry={entry} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
