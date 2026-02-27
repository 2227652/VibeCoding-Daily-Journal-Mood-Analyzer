export type MoodType = 'amazing' | 'happy' | 'okay' | 'sad' | 'awful';

export interface MoodConfig {
  value: MoodType;
  label: string;
  emoji: string;
  score: number;
  color: string;
  bgLight: string;
  bgDark: string;
  textLight: string;
  textDark: string;
}

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood: MoodType;
  autoMood?: MoodType;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  wordCount: number;
}

export type ViewType = 'journal' | 'analytics' | 'calendar';

export interface ModalState {
  isOpen: boolean;
  entry: JournalEntry | null;
}

export interface ConfirmState {
  isOpen: boolean;
  entryId: string | null;
  title: string;
}
