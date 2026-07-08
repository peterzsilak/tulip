---
name: test-suite-review
description: Use when reviewing a Playwright test or PR. Audits the change against the AGENTS.md Definition of Done and the anti-pattern blocklist, surfacing only issues that genuinely matter.
---

# Test Suite Review

Follow [`AGENTS.md`](../../../AGENTS.md) §11–§12 as the review rubric. High signal-to-noise: flag real
problems (bugs, fragility, rule violations), not style nits a formatter would fix.

## Review checklist (Definition of Done)
- **Static gates:** `npm run typecheck` and `npm run lint` both pass with zero errors; no unjustified
  inline `eslint-disable`.
- **Architecture:** POs expose actions/locators only (no assertions/business logic); reusable widgets
  extend `ElementContainer<T>`; cross-page flows use a Controller; everything injected via fixtures
  (no `new PageObject(page)` in specs).
- **Dependency Inversion & loose coupling (top priority, §5.1):** consumers depend on abstractions/
  interfaces, not concrete classes; collaborators are constructor-injected; **no** `new` of collaborators
  inside consumers, **no** singletons/global mutable state, **no** service locators; each unit is
  mockable/replaceable in isolation; layers don't leak (tests don't touch raw `request`/`page.locator`,
  services don't import POs).
- **Locators:** `getByTestId`/role-first, scoped to a PO root; no raw `page.locator` in specs, no
  XPath, no `nth(n)` magic numbers.
- **Assertions:** web-first only, each with a context message; no `locator.isVisible()`/`expect(await…)`.
- **Tests:** scope + platform tags; AAA structure; independent & idempotent; no shared mutable state.
- **Timeouts:** no `page.waitForTimeout()`, no `networkidle`; named timeouts from `TimeConfig`.
- **Types:** no `any`; `readonly` locators; strict enums.
- **Size:** PO ≤ 300 lines; methods ≤ 20 lines; ≤ 4 params.
- **Safety:** no secrets/credentials committed; no production-code change beyond approved `data-testid`.
- **Scope:** refactor XOR feature — not both in one change.

## Output
For each finding: **file:line → the rule violated → the concrete fix.** Lead with the highest-impact
issues. If the change is clean, say so plainly instead of inventing nits.
