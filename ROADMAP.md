# Wellnest Roadmap

Wellnest helps users turn scattered thoughts into a clear plan and work through tasks one at a time. This document tracks the big picture and the rough order of work. Individual tickets live in GitHub Issues.

## Current focus

**M1 — AI Brain Dump Parsing.** Replacing the regex parser in `BrainDump.jsx` with a Supabase Edge Function that calls Claude Haiku to extract, decompose, and prioritize tasks. Echo function works locally; Claude call works locally; deployment + frontend wiring still to do.

## Milestones

### M1 — AI Brain Dump Parsing (in progress)
Deploy the Edge Function to Supabase cloud, wire `BrainDump.jsx` to call it, update `createActionPlan` to persist the richer task fields (priority, estimated_minutes, parent_task_id, sort_order), and harden the error paths.

### M1.5 — Design system + styling pass
Define a small foundation before adding more UI in M2-M4: design tokens (color, spacing, typography), a handful of reusable primitives (Card, Heading, Button refinements), and apply to the three main pages (BrainDump, TaskList, Focus). Tightly scoped — if it expands beyond "tokens + primitives + 3 pages," pause and reassess. Reference images / target design should be locked in *before* starting code changes.

### M2 — Richer Task UI
`TaskList.jsx` and `Focus.jsx` need to display priority, subtasks (via `parent_task_id`), and estimated minutes. The database has these columns; no UI reads them yet.

### M3 — Focus mode v2
Use `estimated_minutes` to support "I have 15 minutes" filtering. Decide how parent and child tasks behave in focus mode (e.g., should a parent task be selectable, or only its leaf children?).

### M4 — Due dates
Add a `due_date` column. The AI already knows today's date (added in M1) so it can compute deadlines from phrases like "by Friday." UI needs to display dates and let users sort or filter by them.

### M5 — Ship readiness
Re-enable the auth redirect in `BrainDump.jsx` (currently commented out). Lock CORS in the Edge Function to the real frontend domain. Add per-user rate limiting in the function so an abusive user can't burn through API budget. Surface AI errors gracefully in the UI. Set a spend cap on the Anthropic API key.

### M6 — Interactive brain dump refinement
When a task is vague (e.g., "work on dissertation"), the AI should ask clarifying questions instead of guessing at decomposition. Edge Function returns tasks plus optional `clarifying_questions` array. UI renders the questions inline, collects answers, makes a second call with original input + answers to produce refined tasks. Optionally persist the conversation alongside the action plan. Could meaningfully differentiate wellnest from generic task apps if executed well.

## Open questions

These are decisions deferred rather than ignored. Revisit each when relevant.

- **Timezone handling.** Server uses UTC for "today's date." Acceptable now; will need the frontend to send `userDate` when users in non-UTC timezones start using the app.
- **AI cost ceiling.** What's the monthly spend threshold where this stops being affordable, and what's the fallback? (Tighter rate limits, queueing, regex fallback for free tier.)
- **Parent task time accounting.** AI returns `estimated_minutes` on parents AND children. UI should not naively sum or it'll double-count. Decide whether parent value is authoritative or derived from children.
- **Category column.** Deliberately not added in M1. Revisit when sorting/filtering tasks by category becomes a felt need rather than a theoretical one.
- **Design system scope.** M1.5 is intentionally narrow. Decide before starting: raw Tailwind with tokens, or a component library (shadcn/ui, Radix)? Pick once and commit; don't oscillate mid-refactor.

## Done

(Move milestone summaries here as each completes.)
