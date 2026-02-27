# Project: Daily Journal & Mood Analyzer
> Claude Code project memory — loaded every session automatically.

## What This Is
A personal daily journal web app with automatic mood detection, analytics, and a mood calendar heatmap. Built with React 18 + TypeScript + Vite + Tailwind CSS v4 + Zustand + Recharts.

## Critical Tech Decisions

### Tailwind CSS v4 (NOT v3)
- Install: `@tailwindcss/vite` plugin — NOT postcss
- Config: `vite.config.ts` uses `tailwindcss()` from `@tailwindcss/vite`
- CSS entry: `@import "tailwindcss"` (NOT `@tailwind base/components/utilities`)
- Dark mode: `@custom-variant dark (&:where(.dark, .dark *))` in index.css
- Class toggle: `.dark` on `<html>` element via `useTheme` hook

### Zod v4 API
- Use `{ error: 'msg' }` NOT `{ invalid_type_error: 'msg' }` or `errorMap`
- `z.array(z.string()).default([] as string[])` for array defaults

### Zustand v5
- `persist` middleware with `partialize: (s) => ({ entries: s.entries })`
- Store key: `journal-store` in localStorage

### React Hook Form
- Resolver type conflict with Zod v4: cast as `any` — known issue
- Always use `Controller` for custom inputs (MoodPicker, TagSelector)

## Project Structure
```
src/
  types/journal.ts         # MoodType, JournalEntry, ViewType, modal states
  lib/
    constants.ts           # MOODS array, MOOD_MAP, DEFAULT_TAGS, MOOD_KEYWORDS, WRITING_PROMPTS
    utils.ts               # cn(), formatDate(), analyzeTextMood(), countWords(), calcStreak()
    schemas.ts             # Zod entrySchema + EntryFormData type
  store/journalStore.ts    # Zustand: entries[], addEntry, updateEntry, deleteEntry
  hooks/
    useTheme.ts            # Dark mode toggle, localStorage persistence
    useJournalFilter.ts    # Search + mood filter logic
  components/
    layout/Header.tsx      # Nav, dark toggle, New Entry button
    views/
      JournalView.tsx      # Entry list + filter bar
      AnalyticsView.tsx    # Lazy-loaded charts + insights
      CalendarView.tsx     # Mood calendar heatmap
    journal/
      EntryForm.tsx        # Create/edit modal with writing prompt button
      EntryCard.tsx        # Card with auto-mood hint, hover actions
      MoodPicker.tsx       # Emoji-based mood selector
      TagSelector.tsx      # Default tags + custom tag input
      SearchFilterBar.tsx  # Search + mood filter chips
      ConfirmDialog.tsx    # Delete confirmation
    dashboard/
      StatCard.tsx         # Stat tile with colored left border
      MoodLineChart.tsx    # 14-day mood trend line (Recharts)
      MoodDistribution.tsx # Donut chart (Recharts, lazy)
      MoodCalendar.tsx     # 5-week emoji calendar heatmap
      WeeklyInsight.tsx    # Streak, avg mood, word count, top mood
    ui/
      Button.tsx, Input.tsx, Textarea.tsx, EmptyState.tsx
```

## Mood System
- 5 moods: amazing(5) > happy(4) > okay(3) > sad(2) > awful(1)
- Auto-detection via keyword matching in `analyzeTextMood()` (src/lib/utils.ts)
- Shown as hint on EntryCard when auto != selected

## Key Conventions
- Price/numbers: plain integers
- All dates: ISO 8601 strings (`.toISOString()`)
- Tailwind dark: always pair `bg-X dark:bg-Y`, `text-X dark:text-Y`
- Charts lazy-loaded via `React.lazy()` + `Suspense`
- Mobile: modals slide up from bottom (`rounded-t-2xl sm:rounded-2xl`)

## Running
```bash
npm run dev      # Dev server
npm run build    # Production build (must pass 0 type errors)
npm run lint     # ESLint
```
