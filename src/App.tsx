import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useJournalStore } from './store/journalStore';
import type { JournalEntry, ModalState, ConfirmState, ViewType } from './types/journal';
import type { EntryFormData } from './lib/schemas';
import { Header } from './components/layout/Header';
import { JournalView } from './components/views/JournalView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { CalendarView } from './components/views/CalendarView';
import { EntryForm } from './components/journal/EntryForm';
import { ConfirmDialog } from './components/journal/ConfirmDialog';

export default function App() {
  const { isDark, toggleTheme } = useTheme();
  const { entries, addEntry, updateEntry, deleteEntry } = useJournalStore();

  const [activeView, setActiveView] = useState<ViewType>('journal');
  const [modal, setModal] = useState<ModalState>({ isOpen: false, entry: null });
  const [confirm, setConfirm] = useState<ConfirmState>({ isOpen: false, entryId: null, title: '' });

  function openNew() { setModal({ isOpen: true, entry: null }); }
  function openEdit(entry: JournalEntry) { setModal({ isOpen: true, entry }); }
  function closeModal() { setModal({ isOpen: false, entry: null }); }

  function handleSave(data: EntryFormData) {
    if (modal.entry) {
      updateEntry(modal.entry.id, data);
    } else {
      addEntry(data);
    }
    closeModal();
  }

  function openDelete(id: string, title: string) {
    setConfirm({ isOpen: true, entryId: id, title });
  }

  function handleConfirmDelete() {
    if (confirm.entryId) deleteEntry(confirm.entryId);
    setConfirm({ isOpen: false, entryId: null, title: '' });
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        activeView={activeView}
        onViewChange={setActiveView}
        onNewEntry={openNew}
      />

      <main className="max-w-5xl mx-auto px-4 py-6">
        {activeView === 'journal' && (
          <JournalView entries={entries} onEdit={openEdit} onDelete={openDelete} onNew={openNew} />
        )}
        {activeView === 'analytics' && (
          <AnalyticsView entries={entries} isDark={isDark} />
        )}
        {activeView === 'calendar' && (
          <CalendarView entries={entries} />
        )}
      </main>

      {modal.isOpen && (
        <EntryForm entry={modal.entry} onSave={handleSave} onClose={closeModal} />
      )}
      {confirm.isOpen && (
        <ConfirmDialog
          title={confirm.title}
          onConfirm={handleConfirmDelete}
          onCancel={() => setConfirm({ isOpen: false, entryId: null, title: '' })}
        />
      )}
    </div>
  );
}
