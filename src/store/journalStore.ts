import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { JournalEntry, MoodType } from '../types/journal';
import { countWords, analyzeTextMood } from '../lib/utils';

interface JournalState {
  entries: JournalEntry[];
  addEntry: (data: { title: string; content: string; mood: MoodType; tags: string[] }) => void;
  updateEntry: (id: string, data: { title: string; content: string; mood: MoodType; tags: string[] }) => void;
  deleteEntry: (id: string) => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: [
        {
          id: nanoid(),
          title: 'First day with my new journal',
          content: 'Today I started using this journal app. I am excited to track my moods and reflect on my days. The interface looks clean and I love how easy it is to write entries.',
          mood: 'happy',
          autoMood: 'happy',
          tags: ['Personal', 'Reflection'],
          createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 6 * 86400000).toISOString(),
          wordCount: 42,
        },
        {
          id: nanoid(),
          title: 'Productive work session',
          content: 'Had an amazing day at work. Finished the big project on time and the team celebrated together. Feeling fantastic about what we accomplished. This is definitely one of the best days this month.',
          mood: 'amazing',
          autoMood: 'amazing',
          tags: ['Work', 'Goals'],
          createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 5 * 86400000).toISOString(),
          wordCount: 37,
        },
        {
          id: nanoid(),
          title: 'Rainy Wednesday',
          content: 'Just an okay day. Nothing special happened, went through the usual routine. The weather was a bit gloomy but that\'s fine. Feeling neutral about everything.',
          mood: 'okay',
          autoMood: 'okay',
          tags: ['Personal'],
          createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
          wordCount: 35,
        },
        {
          id: nanoid(),
          title: 'Missing home',
          content: 'Feeling a bit sad today. Miss my family and friends back home. It\'s been a tough week and I\'m tired from all the work. Sometimes it\'s hard being away. Need some rest.',
          mood: 'sad',
          autoMood: 'sad',
          tags: ['Personal', 'Family'],
          createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 3 * 86400000).toISOString(),
          wordCount: 36,
        },
        {
          id: nanoid(),
          title: 'Getting back on track',
          content: 'Feeling much better than yesterday. Went for a morning run and it helped lift my spirits. Grateful for good health and a new day to start fresh.',
          mood: 'happy',
          autoMood: 'happy',
          tags: ['Health', 'Gratitude'],
          createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
          wordCount: 32,
        },
        {
          id: nanoid(),
          title: 'Weekend plans ahead',
          content: 'Looking forward to the weekend. Planning to visit friends and enjoy some downtime. It\'s been a long week but the fun ahead makes it worthwhile. Feeling good!',
          mood: 'happy',
          autoMood: 'happy',
          tags: ['Personal', 'Goals'],
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
          wordCount: 31,
        },
        {
          id: nanoid(),
          title: 'Today\'s reflection',
          content: 'Started using this app seriously today. Wrote my morning pages and felt incredibly clear-headed afterwards. Amazing how journaling can shift your perspective entirely. Excited for tomorrow!',
          mood: 'amazing',
          autoMood: 'amazing',
          tags: ['Reflection', 'Gratitude'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          wordCount: 29,
        },
      ],

      addEntry: (data) =>
        set((state) => ({
          entries: [
            {
              id: nanoid(),
              ...data,
              autoMood: analyzeTextMood(data.content),
              wordCount: countWords(data.content),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            ...state.entries,
          ],
        })),

      updateEntry: (id, data) =>
        set((state) => ({
          entries: state.entries.map((e) =>
            e.id === id
              ? {
                  ...e,
                  ...data,
                  autoMood: analyzeTextMood(data.content),
                  wordCount: countWords(data.content),
                  updatedAt: new Date().toISOString(),
                }
              : e,
          ),
        })),

      deleteEntry: (id) =>
        set((state) => ({ entries: state.entries.filter((e) => e.id !== id) })),
    }),
    {
      name: 'journal-store',
      partialize: (state) => ({ entries: state.entries }),
    },
  ),
);

// Selectors
export const selectEntries = (s: JournalState) => s.entries;
export const selectTotalWords = (s: JournalState) =>
  s.entries.reduce((acc, e) => acc + e.wordCount, 0);
