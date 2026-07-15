---
name: spec-to-test
description: Use when turning a plan scenario into a Playwright *.spec.ts. Enforces one test per file, AAA structure, tags, fixture-injected Page Objects, and web-first assertions.
---

# Spec → Test

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `CODING_STANDARDS.md` for test design/assertion rules and `PROJECT.md` for target paths.
Convert one plan scenario into one clean test file.

## Steps
1. Create `<tests-path-from-PROJECT.md>/<feature>/<scenario>.spec.ts` (fs-friendly, kebab-case).
   **One test per file.**
2. Wrap it in a `describe` matching the top-level plan item; the test title matches the scenario name.
3. Add **tags**: scope (`@smoke|@sanity|@regression`) + platform (`@desktop|@mobile`).
4. Inject Page Objects/Controllers via **fixtures** — never `new PageObject(page)`.
5. Write steps in **Arrange — Act — Assert** order, with a comment containing the step text before
   each step. Use the actions exposed by Page Objects (no raw `page.locator` in the spec).
6. Use **web-first assertions with context messages** (see the `assertion-style` skill).
7. Keep the test independent and idempotent (fresh state, no shared mutable state).

## Shape
```ts
// plan: <plan-path-from-PROJECT.md>
import { test, expect } from '<fixtures-entry-from-PROJECT.md>';
import { TestTags } from '<test-tags-path-from-PROJECT.md>';

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
