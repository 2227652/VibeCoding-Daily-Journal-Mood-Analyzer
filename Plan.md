# Project Apex: Daily Journal & Mood Analyzer — Build Plan

## Phase 0: Environment Setup ✅
- [x] Clone repo from Cognizant-Learning org
- [x] Read projectbrief.md — confirmed requirements
- [x] Scaffold Vite + React + TypeScript project
- [x] Install: tailwindcss @tailwindcss/vite zustand zod @hookform/resolvers react-hook-form recharts lucide-react nanoid clsx tailwind-merge
- [x] Configure vite.config.ts with Tailwind v4 plugin
- [x] Set up index.css with @import "tailwindcss", dark mode variant, Inter font, global transitions

**Done means:** `npm install` succeeds, vite.config.ts uses @tailwindcss/vite plugin, index.css has dark mode @custom-variant

---

## Phase 1: Core Data Layer ✅
- [x] `src/types/journal.ts` — MoodType, JournalEntry, ViewType, ModalState, ConfirmState
- [x] `src/lib/constants.ts` — MOODS array (5 moods with score/color/emoji), MOOD_MAP, DEFAULT_TAGS, MOOD_KEYWORDS, WRITING_PROMPTS
- [x] `src/lib/utils.ts` — cn(), formatDate(), formatDateShort(), formatRelativeTime(), countWords(), analyzeTextMood(), calcStreak(), getISODate()
- [x] `src/lib/schemas.ts` — Zod entrySchema with entrySchema type export
- [x] `src/store/journalStore.ts` — Zustand + persist; 7 seed entries; addEntry/updateEntry/deleteEntry
- [x] `src/hooks/useTheme.ts` — dark mode toggle + localStorage
- [x] `src/hooks/useJournalFilter.ts` — search + mood filter

**Done means:** TypeScript types compile, store persists to localStorage key "journal-store", analyzeTextMood() returns correct mood for test strings

---

## Phase 2: UI Components ✅
- [x] `Button.tsx` — 4 variants: primary (violet), secondary, ghost, danger
- [x] `Input.tsx`, `Textarea.tsx` — with label, error, dark mode styles
- [x] `EmptyState.tsx` — BookOpen icon, optional action button
- [x] `MoodPicker.tsx` — 5 emoji buttons with selection ring + scale animation
- [x] `TagSelector.tsx` — preset tags + custom tag input with Enter support
- [x] `EntryForm.tsx` — Create/edit modal; writing prompt button (Lightbulb); auto-mood indicator; word count
- [x] `EntryCard.tsx` — Mood badge, content preview, tags, hover edit/delete, auto-mood hint
- [x] `SearchFilterBar.tsx` — Search input + mood filter chips
- [x] `ConfirmDialog.tsx` — Slide-up modal with cancel/delete

**Done means:** All components render, dark mode classes applied, MoodPicker emits selected mood value correctly

---

## Phase 3: Dashboard & Analytics ✅
- [x] `StatCard.tsx` — Colored left-border accent card
- [x] `MoodLineChart.tsx` — 14-day mood trend, emoji Y-axis labels, recharts LineChart
- [x] `MoodDistribution.tsx` — Donut chart (lazy-loaded), mood color mapping
- [x] `MoodCalendar.tsx` — 5-week emoji grid heatmap
- [x] `WeeklyInsight.tsx` — Streak, avg mood trend, total words, top mood of week
- [x] `AnalyticsView.tsx` — Lazy-loaded charts grid
- [x] `CalendarView.tsx` — Calendar wrapper

**Done means:** Charts render with seed data, dark mode color props passed correctly

---

## Phase 4: App Assembly ✅
- [x] `Header.tsx` — Logo, nav tabs (Journal/Analytics/Calendar), dark toggle, New Entry button
- [x] `JournalView.tsx` — Entry grid + filter + empty state
- [x] `App.tsx` — State management, modal orchestration, view routing
- [x] Remove default Vite CSS / boilerplate from App.tsx

**Done means:** `npm run build` → 0 TypeScript errors, complete production bundle

---

## Phase 5: Hackathon Artifacts ✅
- [x] `CLAUDE.md` — Project memory: architecture, conventions, gotchas
- [x] `Plan.md` — This file: phased tasks + "done means" checks
- [x] `prompts.md` — ICEC prompt structure, features used, hooks/skills docs

---

## Phase 6: Plugins, Hooks & Skills ✅
- [x] `.claude/settings.json` — PostToolUse hook (logs all file writes to CHANGELOG.md)
- [x] `.claude/commands/generate-mood-tests.md` — Skill: generate Vitest test suite for mood analysis
- [x] `.claude/commands/audit-journal-schema.md` — Skill: audit Zod schema + store consistency

---

## Creative Enhancements (Mission 5)
- [x] Auto mood detection from text via keyword analysis (no API needed, instant, private)
- [x] Writing prompt button (Lightbulb) — random prompts from 10 curated suggestions
- [x] Mood calendar heatmap — visual 5-week grid with emoji per day
- [x] Weekly insight panel — streak counter, mood trend delta vs last week, total word count
- [x] Mood auto-hint on cards — shows when AI detection differs from manual selection

---

## Verification Checklist
- [ ] `npm run build` — 0 errors
- [ ] Dark mode toggle → smooth 200ms transitions on all surfaces
- [ ] Reload → theme restored from localStorage
- [ ] Add entry → appears at top of list, word count shown
- [ ] Auto-mood hint appears when text keywords detected
- [ ] Writing prompt button generates random prompt each click
- [ ] Analytics view → line chart + donut chart render with seed data
- [ ] Calendar view → emoji heatmap shows 5 weeks
- [ ] Weekly insight → streak, trend, total words all computed
- [ ] Mobile (375px) → modals slide up from bottom, cards stack
- [ ] Delete → confirm dialog, entry removed
