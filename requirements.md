# Requirements — Daily Journal & Mood Analyzer

> Extracted from `projectbrief.md` and refined for implementation.

---

## Functional Requirements

### FR-1: Journal Entry Management (CRUD)
- **FR-1.1** Users can create a new journal entry with a title and free-text content
- **FR-1.2** Users can edit any existing journal entry
- **FR-1.3** Users can delete a journal entry (with confirmation dialog)
- **FR-1.4** Entries are persisted to localStorage and survive page reload
- **FR-1.5** Each entry records creation and last-updated timestamps
- **FR-1.6** Word count is automatically calculated and displayed per entry

### FR-2: Mood Tracking
- **FR-2.1** Users select a mood for each entry from 5 predefined options:
  Amazing 😄 · Happy 😊 · Okay 😐 · Sad 😔 · Awful 😢
- **FR-2.2** Mood is displayed prominently on each entry card with colour-coded badge
- **FR-2.3** Auto-mood detection analyses entry text via keyword matching and suggests a mood
- **FR-2.4** When auto-detected mood differs from manually selected, a hint is shown on the card
- **FR-2.5** Entries can be filtered by mood in the journal view

### FR-3: Data Visualization
- **FR-3.1** Line chart shows mood score trend over the last 14 days
- **FR-3.2** Donut chart shows distribution of moods across all entries
- **FR-3.3** Mood calendar heatmap displays the last 5 weeks as an emoji grid
- **FR-3.4** Weekly insight panel shows: writing streak (days), average mood score, total word count, top mood of the week

### FR-4: Search & Filter
- **FR-4.1** Full-text search across title, content, and tags
- **FR-4.2** Filter entries by mood (chips bar)
- **FR-4.3** Entries filtered in real time without page reload

### FR-5: Tagging
- **FR-5.1** Users can assign one or more tags to each entry from a preset list
- **FR-5.2** Users can add custom tags
- **FR-5.3** Tag display on entry cards

### FR-6: Writing Assistance
- **FR-6.1** A writing prompt button provides a random curated prompt from 10 options
- **FR-6.2** Prompt can be inserted into the entry content with a single click

---

## Non-Functional Requirements

### NFR-1: Privacy & Security
- **NFR-1.1** All data stored exclusively in browser localStorage — no external server
- **NFR-1.2** No analytics, tracking, or external API calls with user data

### NFR-2: Performance
- **NFR-2.1** Chart components are lazy-loaded (React.lazy + Suspense) to keep initial bundle small
- **NFR-2.2** Filter/sort operations run in useMemo to avoid re-renders

### NFR-3: Accessibility & UX
- **NFR-3.1** Dark mode toggle with smooth 200ms transitions on all surfaces
- **NFR-3.2** Theme preference persisted in localStorage and restored on reload
- **NFR-3.3** Responsive layout — works on mobile (375px) through desktop (1280px+)
- **NFR-3.4** Modals slide up from bottom on mobile (bottom-sheet UX)
- **NFR-3.5** All interactive elements have visible focus states
- **NFR-3.6** ARIA labels on icon-only buttons

### NFR-4: Code Quality
- **NFR-4.1** TypeScript strict mode — zero type errors in production build
- **NFR-4.2** Zod v4 schema validation on all form inputs
- **NFR-4.3** Component-level separation of concerns

---

## Out of Scope
- User authentication / multi-user support
- Cloud sync or backend database
- Export to PDF/CSV (potential future enhancement)
- Push notifications or reminders
