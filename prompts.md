# Prompts Log — Daily Journal & Mood Analyzer

> Documents all prompts used across hackathon missions, the Claude Code features leveraged,
> and full Plugins / Hooks / Skills documentation.

---

## Mission 1: Camp Setup & Compass Calibration

### Prompt 1 — Session Initialization
**Type:** ICEC (Intent · Context · Examples · Constraints)

```
Intent: Load the project brief and establish project memory for this session.
Context: We are building a Daily Journal & Mood Analyzer web app. The brief is in
  projectbrief.md. This is a hackathon project scored on features, prompt engineering,
  plugins/hooks/skills, and creativity.
Examples: Similar to building a CRUD dashboard but focused on journaling and mood tracking.
Constraints: Use React 18 + TypeScript + Vite. Tailwind CSS v4 (NOT v3). Zustand for state.
  All data in localStorage — no backend. Output a CLAUDE.md with project memory.
```

**Feature used:** `/init` equivalent — bootstrapped CLAUDE.md from scratch

---

## Mission 2: Cartographer's Recon (Plan Mode)

### Prompt 2 — Requirements Analysis
**Type:** ICEC

```
Intent: Analyse projectbrief.md and extract all functional and non-functional requirements
  into a structured requirements.md file.
Context: The brief mentions journal entries, mood selection, and data visualization. I need
  to translate these into precise, testable requirements.
Examples: FR-1 should cover full CRUD. FR-2 should cover mood picker + auto-detection.
  FR-3 should cover all chart types required.
Constraints: Read-only mode — explore and propose, don't edit source files yet.
  Document out-of-scope items to manage expectations.
```

**Feature used:** Plan Mode (read-only exploration before any file changes)

### Prompt 3 — Architecture Design
**Type:** ICEC

```
Intent: Design the full component tree and data flow for the app before writing any code.
Context: Stack: React 18 + TypeScript + Vite + Tailwind v4 + Zustand v5 + Zod v4 +
  Recharts + Lucide React. Must support dark mode, responsive layout, and 3 views:
  Journal, Analytics, Calendar.
Examples: Similar structure to a previous CRUD Dashboard project:
  types → lib → store → hooks → components → views → App
Constraints: No backend. Charts lazy-loaded. Modals bottom-sheet on mobile.
  Auto-mood via local keyword matching (no external API).
```

---

## Mission 3: Quartermaster's Runbook (Plan.md)

### Prompt 4 — Build Plan Creation
**Type:** ICEC

```
Intent: Create Plan.md with 6 phased build tasks, each with explicit "done means" checks.
Context: The plan must cover: environment setup, data layer, UI components, dashboard,
  app assembly, and hackathon artifacts.
Examples: Phase 1 "done means": TypeScript compiles, store persists to localStorage.
  Phase 4 "done means": npm run build → 0 type errors.
Constraints: Each phase must be independently verifiable. Include creative enhancements
  (Mission 5) as a phase. Include /compact checkpoint before Mission 4.
```

**Feature used:** `/compact` — context compressed before the large build phase

---

## Mission 4: The Forge — Agentic Build

### Prompt 5 — Full Application Build
**Type:** ICEC

```
Intent: Build the complete Daily Journal & Mood Analyzer app across 25+ source files.
Context: Following Plan.md phases 0–4. Stack confirmed in CLAUDE.md. Seed data needed:
  7 journal entries spanning the last 7 days with varied moods.
Examples: Mood line chart should show 14-day trend. Calendar heatmap = 5-week emoji grid.
  EntryForm should have a writing prompt Lightbulb button.
Constraints: Zero TypeScript errors in production build. Zod v4 API (error: not errorMap).
  Tailwind v4 (@import "tailwindcss" not @tailwind directives).
  Charts lazy-loaded with React.lazy + Suspense.
```

**Features used:**
- **Subagents (Task tool):** Explore agent for codebase search, Bash agent for parallel builds
- **Agentic execution:** Multiple files written per turn in parallel
- **Checkpointing:** `Esc Esc` used to rewind when type errors appeared

### Prompt 6 — Type Error Fix
**Type:** Direct debugging

```
Fix the 3 TypeScript build errors:
1. MoodDistribution.tsx — unused MOOD_MAP import
2. EntryForm.tsx — Zod resolver type mismatch with React Hook Form (cast to any)
3. EntryForm.tsx — SubmitHandler generic type inference failure
```

---

## Mission 5: The Wizard's Encore (Creative Enhancements)

### Prompt 7 — Creative Features
**Type:** ICEC

```
Intent: Add standout creative enhancements that go beyond the spec requirements.
Context: The base app has CRUD + mood picker + charts. I want to add features that
  demonstrate AI-integrated thinking and better UX.
Examples:
  1. Auto-mood detection — analyse text for mood keywords, show hint on card when it
     differs from manual selection. No API needed, runs locally.
  2. Writing prompts — random curated prompts via Lightbulb button in EntryForm.
  3. Weekly insight panel — streak, mood trend delta vs previous week, total words.
  4. Mood calendar heatmap — 5-week emoji grid (like GitHub contribution graph).
Constraints: All features must work offline. No external API calls. Must not break
  existing functionality. Performance: keyword matching O(n×k) is acceptable.
```

---

## Mission 6: Plugins, Hooks & Skills

### Prompt 8 — Hackathon Artifacts
**Type:** ICEC

```
Intent: Create .claude/settings.json (hooks), .claude/commands/ (skills), and document
  any MCP plugin configuration for the hackathon submission.
Context: Need at least: 1 hook (PostToolUse), 2 skills (generate-mood-tests,
  audit-journal-schema). Document purpose and usage of each.
Constraints: Hooks must be valid JSON in .claude/settings.json. Skills must be markdown
  files in .claude/commands/. All must be documented in this prompts.md file.
```

---

## Plugins / Hooks / Skills Documentation

### Plugin: Sentiment Analysis (MCP-ready)

**What it does:** Configured as a conceptual MCP server endpoint for sentiment analysis.
In this project, sentiment analysis runs locally via `analyzeTextMood()` in `src/lib/utils.ts`
using keyword matching. An MCP server could replace this with a real NLP API (e.g., AWS
Comprehend, HuggingFace Inference API) by exposing a `analyze_sentiment` tool.

**Configuration:** `mcp_servers` block in `.claude/settings.json`:
```json
{
  "mcpServers": {
    "sentiment": {
      "command": "node",
      "args": ["./mcp-sentiment-server.js"],
      "description": "Local sentiment analysis server using keyword NLP"
    }
  }
}
```

**Why chosen:** Mood detection is the core creative feature. Externalising it to an MCP
server would allow hot-swapping between keyword matching and real ML models without
changing app code.

---

### Hook: PostToolUse — Auto-Changelog

**File:** `.claude/settings.json`

**What it does:** After every `Write` or `Edit` tool call by Claude, automatically appends
a changelog entry to `CHANGELOG.md` with the filename and timestamp. This creates an
automatic audit trail of all Claude-generated changes.

**Configuration:**
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"$(date '+%Y-%m-%d %H:%M:%S') | Modified: $CLAUDE_TOOL_INPUT_FILE_PATH\" >> CHANGELOG.md"
          }
        ]
      }
    ]
  }
}
```

**Why chosen:** In a hackathon, this creates a verifiable record of AI-driven development.
It demonstrates responsible AI usage by maintaining transparency about what Claude changed
and when — a best practice for AI-assisted development teams.

---

### Skill: generate-mood-tests

**File:** `.claude/commands/generate-mood-tests.md`

**Invocation:** `/generate-mood-tests`

**What it does:** Generates a complete Vitest test suite for:
- `analyzeTextMood()` function (all 5 mood keyword sets)
- `calcStreak()` function (streak counting edge cases)
- `countWords()` function
- Zod `entrySchema` validation (valid + invalid inputs)
- Zustand store actions (addEntry, updateEntry, deleteEntry)

**Why chosen:** Mood analysis is the core algorithmic feature and most likely to have
regressions when keywords are updated. Packaging this as a skill means any team member
can regenerate the test suite on demand in future sessions.

---

### Skill: audit-journal-schema

**File:** `.claude/commands/audit-journal-schema.md`

**Invocation:** `/audit-journal-schema`

**What it does:** Performs a cross-file schema consistency audit:
1. Reads `src/lib/schemas.ts` (Zod schema)
2. Reads `src/types/journal.ts` (TypeScript types)
3. Reads `src/store/journalStore.ts` (Zustand store actions)
4. Checks that all field names, types, and optionality match across all three
5. Reports any drift between the schema definition and how data is actually stored
6. Suggests fixes for any inconsistencies found

**Why chosen:** As the schema evolves (new fields, mood types added), drift between
the Zod schema, TypeScript types, and store is a common source of bugs. This skill
acts as a lightweight schema governance tool.
