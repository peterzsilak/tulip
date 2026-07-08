---
name: spec-to-test
description: Use when turning a plan scenario from specs/ into a Playwright *.spec.ts. Enforces one test per file, AAA structure, tags, fixture-injected Page Objects, and web-first assertions.
---

# Spec → Test

Follow [`AGENTS.md`](../../../AGENTS.md) §6–§7. Convert one plan scenario into one clean test file.

## Steps
1. Create `tests/<feature>/<scenario>.spec.ts` (fs-friendly, kebab-case). **One test per file.**
2. Wrap it in a `describe` matching the top-level plan item; the test title matches the scenario name.
3. Add **tags**: scope (`@smoke|@sanity|@regression`) + platform (`@desktop|@mobile`).
4. Inject Page Objects/Controllers via **fixtures** — never `new PageObject(page)`.
5. Write steps in **Arrange — Act — Assert** order, with a comment containing the step text before
   each step. Use the actions exposed by Page Objects (no raw `page.locator` in the spec).
6. Use **web-first assertions with context messages** (see the `assertion-style` skill).
7. Keep the test independent and idempotent (fresh state, no shared mutable state).

## Shape
```ts
// spec: specs/<plan>.md
import { test, expect } from '../../fixtures';
import { TestTags } from '../../config/test-tags';

test.describe('Adding New Todos', () => {
  test('Add Valid Todo', { tag: [TestTags.SMOKE, TestTags.DESKTOP] }, async ({ todoPage }) => {
    // Arrange — open a fresh list
    await todoPage.open();

    // Act — add a valid todo
    await todoPage.addTodo('Buy milk');

    // Assert — it appears in the list
    await expect(todoPage.items, 'Newly added todo should appear in the list').toHaveCount(1);
  });
});
```
