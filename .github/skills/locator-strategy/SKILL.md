---
name: locator-strategy
description: Use when choosing or fixing a locator. Enforces the getByTestId → role/label/placeholder (+filter) → scoped CSS priority, lazy + PO-scoped locators, no XPath, and no nth(n) magic numbers.
---

# Locator Strategy

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md) and use
`CODING_STANDARDS.md` for the exact locator rules.

## MCP evidence (when ambiguous)
If locator behavior is ambiguous/unstable, use MCP snapshot/accessibility data and document the
evidence block from `PROJECT.md` before choosing the final locator.

Use this skill when the final locator choice is unclear:
- prefer `getByTestId`
- fall back to role/label/placeholder
- use scoped CSS only as a last resort
- if nothing stable exists, propose a test-id instead of a brittle selector
