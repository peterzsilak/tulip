---
name: assertion-style
description: Use when writing or reviewing test assertions. Enforces web-first auto-retrying assertions with a mandatory context message; bans locator.isVisible() and expect(await ...).
---

# Assertion Style

Follow [`AGENTS.md`](../../../AGENTS.md) §7. Assertions live in **tests**, never in Page Objects.

## Rules
- **Web-first, auto-retrying only:** `expect(locator).toBeVisible()`, `toHaveText()`, `toHaveCount()`.
- **Context message is mandatory** — explain the expected business outcome.
- **Never** `locator.isVisible()` or `expect(await locator.isVisible()).toBe(true)` (no auto-retry).
- Use `expect.soft()` when several independent checks should all run regardless of earlier failures.

## Examples
```ts
// ❌ No context, no auto-retry
expect(await addButton.isVisible()).toBe(true);

// ✅ Web-first + context
await expect(addButton, 'Add button should be visible on an empty list').toBeVisible();
await expect(todoPage.items, 'List should contain exactly one todo after adding').toHaveCount(1);
```

## Checklist
- [ ] Every assertion is web-first and has a context message
- [ ] No `isVisible()`/`expect(await ...)` patterns
- [ ] Assertion is in the test, not the Page Object
