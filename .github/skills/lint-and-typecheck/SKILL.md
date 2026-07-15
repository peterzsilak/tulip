---
name: lint-and-typecheck
description: Use after writing or changing any test code to enforce the static quality gates — TypeScript strict type-check and ESLint must both pass with zero errors before the work is done.
---

# Lint & Type-check Gates

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md) and use
`PROJECT.md` for the command values.

These gates are mandatory.

## Commands
- Typecheck, lint, aggregate quality gate, and optional auto-fix commands come from `PROJECT.md`.

## Workflow
1. Run the project-defined quality gates after source changes.
2. Fix the code, not the rule.
3. Re-run until both gates are green.
