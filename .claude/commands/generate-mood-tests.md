# Skill: Generate Mood Analysis Test Suite

Generate a complete Vitest test suite for the Daily Journal & Mood Analyzer app.

## Instructions

Read the following files first:
- `src/lib/utils.ts` — analyzeTextMood, countWords, calcStreak, formatDate
- `src/lib/schemas.ts` — entrySchema Zod validation
- `src/store/journalStore.ts` — addEntry, updateEntry, deleteEntry actions
- `src/lib/constants.ts` — MOOD_KEYWORDS, MOODS

Then generate `src/__tests__/journal.test.ts` with the following test cases:

### 1. analyzeTextMood()
- Returns 'amazing' for text containing amazing-keywords ("fantastic", "excellent", "thrilled")
- Returns 'happy' for text with happy-keywords ("grateful", "smile", "good day")
- Returns 'okay' for neutral text ("normal day", "fine")
- Returns 'sad' for text with sad-keywords ("miss", "tired", "disappointed")
- Returns 'awful' for text with awful-keywords ("terrible", "horrible", "hate")
- Returns 'okay' when no keywords match (default)
- Handles mixed keywords by returning dominant mood
- Case-insensitive matching

### 2. countWords()
- Returns 0 for empty string
- Returns correct count for single word
- Returns correct count for multi-word string
- Handles multiple spaces between words
- Handles leading/trailing whitespace

### 3. calcStreak()
- Returns 0 for empty array
- Returns 1 for single entry today
- Returns correct streak for consecutive daily entries
- Resets streak when there's a gap of 2+ days
- Counts today and yesterday as consecutive

### 4. entrySchema validation
- Valid entry passes validation
- Title required — empty string fails
- Content required — empty string fails
- Mood must be one of 5 valid values
- Invalid mood fails
- Tags defaults to [] when not provided
- Title max 120 characters

### 5. Zustand store
- addEntry adds to front of entries array
- addEntry sets wordCount correctly
- addEntry sets autoMood via analyzeTextMood
- updateEntry changes the correct entry by id
- deleteEntry removes entry with matching id
- deleteEntry leaves other entries intact

## Output format
Use Vitest (`describe`, `it`, `expect`). Import from `'vitest'`.
Install vitest if needed: `npm install -D vitest`.
Add `"test": "vitest"` to package.json scripts.
