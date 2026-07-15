---
name: lint-and-typecheck
description: Use after writing or changing any test code to enforce the static quality gates — TypeScript strict type-check and ESLint must both pass with zero errors before the work is done.
---

# Lint & Type-check Gates

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `CODING_STANDARDS.md` for gate expectations and `PROJECT.md` for command values.
These gates are **mandatory** — code is not done until both are green.

## Commands
- `npm run typecheck` — `tsc --noEmit` in strict mode (zero TS errors).
- `npm run lint` — ESLint flat config (type-checked rules + `eslint-plugin-playwright`), zero errors.
- `npm run check` — runs both in sequence.
- `npm run lint:fix` — auto-fix trivial/formatting issues, then review the diff.

## Workflow
1. After writing or changing code under project source paths from `PROJECT.md`, run the quality gates
   command from `PROJECT.md`.
2. **Fix the code**, not the rule. Resolve every TS and ESLint error.
3. Re-run until both gates report zero errors.
4. Only then consider the change complete (it also runs in CI as the `static-checks` job).

## What the gates enforce (highlights)
- **Types:** no `any`, no unused locals/params, no floating promises, no implicit returns.
- **Clean Code:** `max-params: 4`, `max-lines: 300`, `max-lines-per-function: 20` (non-spec files).
- **Playwright:** no `waitForTimeout`, no `networkidle`, no `force` option, web-first assertions
  required, every test has an assertion (`expect-expect`).

## Rules
- **Never** silence a real violation with `// eslint-disable` or `// @ts-ignore`. A suppression is
  acceptable only with a justification comment for a genuine, documented exception.
- Don't weaken `tsconfig.json` or `eslint.config.mjs` to make code pass — fix the code.

## Checklist
- [ ] `npm run typecheck` → 0 errors
- [ ] `npm run lint` → 0 errors
- [ ] No unjustified `eslint-disable` / `@ts-ignore`
