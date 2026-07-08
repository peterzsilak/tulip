---
name: locator-strategy
description: Use when choosing or fixing a locator. Enforces the getByTestId → role/label/placeholder (+filter) → scoped CSS priority, lazy + PO-scoped locators, no XPath, and no nth(n) magic numbers.
---

# Locator Strategy

Follow [`AGENTS.md`](../../../AGENTS.md) §3. Pick the **highest-priority** locator that works.

## Decision order
1. **`getByTestId`** — `page.getByTestId('todo.input')` (preferred, stable).
2. **Role / Label / Placeholder** — `getByRole('button', { name: 'Add' })`, `getByLabel`, `getByPlaceholder`.
3. **Refine with filters** — `locator.filter({ hasText: '...' })` or `locator.filter({ has: ... })`.
4. **Scoped CSS** (last resort) — `this.root.locator('.todo-item')`, always scoped to the PO root.

## Rules
- The repo standard attribute is **`data-testid`** (Playwright default). Keep using
  `getByTestId(...)` in tests/POs; if a different attribute is ever adopted, configure it once in
  Playwright and use it consistently.
- Locators are **lazy** (evaluated at action time) and **scoped to the PO root** — never the bare `page`
  inside a PO, never `page.locator(...)` in a test.
- Prefer semantic locators over raw text. Use `getByText(...)` only when role/label/placeholder cannot
  represent the element reliably.
- **No XPath.** **No `nth(n)` magic numbers** — extract to a named constant or parameterize.
- If no stable hook exists, do **not** reach for brittle CSS — use the `test-id-proposal` skill.

## Anti-patterns → fix
| ❌ | ✅ |
|---|---|
| `page.locator('.btn')` in a test | `this.root.getByTestId('feature.btn')` in a PO |
| `//div[@class='x']` (XPath) | role/data-testid locator |
| `.nth(3)` | named constant or `getByRole(..., { name })` |
