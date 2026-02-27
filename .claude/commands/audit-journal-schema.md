# Skill: Audit Journal Schema Consistency

Perform a cross-file schema consistency audit across the app's data layer.

## Instructions

Read ALL of these files in sequence:
1. `src/types/journal.ts` — TypeScript type definitions
2. `src/lib/schemas.ts` — Zod validation schema
3. `src/lib/constants.ts` — MOODS array and MOOD_MAP
4. `src/store/journalStore.ts` — Zustand store and JournalEntry construction

## Checks to Perform

### Check 1: Field Completeness
- List all fields in the `JournalEntry` interface
- Verify each field is present in `entrySchema` (or correctly excluded as computed)
- Fields that should be in schema: title, content, mood, tags
- Fields that should NOT be in schema (computed/auto): id, wordCount, autoMood, createdAt, updatedAt

### Check 2: Type Alignment
- For each schema field, verify the TypeScript type matches the Zod type:
  - `title`: string ↔ z.string()
  - `content`: string ↔ z.string()
  - `mood`: MoodType ↔ z.enum([...MOODS])
  - `tags`: string[] ↔ z.array(z.string())

### Check 3: Mood Enum Consistency
- List all values in `MoodType` union type
- List all values in `z.enum()` in entrySchema
- List all `value` fields in `MOODS` array in constants.ts
- All three lists must be identical

### Check 4: Store Action Correctness
- `addEntry` must set: id (nanoid), autoMood (analyzeTextMood), wordCount (countWords), createdAt, updatedAt
- `updateEntry` must update: autoMood, wordCount, updatedAt (NOT createdAt)
- `deleteEntry` must filter by id only

### Check 5: Default Values
- `tags` defaults to `[]` in both schema and store

## Output Format
Produce a report:
```
## Schema Audit Report — [date]

### ✅ Passing Checks
- [list]

### ⚠️ Issues Found
- [field]: [issue description] → [suggested fix]

### 📋 Summary
[overall health status]
```

If issues are found, offer to fix them automatically.
