---
name: test-id-proposal
description: Use when an element lacks a stable locator hook. Proposes a dot-separated, lowercase `component.element` data-testid without modifying production logic, styles, or templates beyond the attribute.
---

# data-testid Proposal

Follow [`AGENTS.md`](../../../AGENTS.md) §3. When no `getByTestId`/role locator is reliable, propose a
`data-testid` instead of resorting to brittle CSS/XPath.

## Rules
- Format: **`"component.element"`** — dot-separated, lowercase (e.g. `"todo.input"`,
  `"todo-item.label"`).
- Place it on the **outermost element** of the component.
- **Do not modify production logic, styles, or templates** beyond adding the attribute.
- **Never override** an existing `data-testid` or break CSS/SCSS selectors.
- Present the change as a **suggestion/diff** for the app team if you cannot edit the app safely.

## Example
```html
<!-- before -->
<input class="new-todo" placeholder="What needs to be done?" />

<!-- after: only the attribute is added -->
<input class="new-todo" placeholder="What needs to be done?" data-testid="todo.input" />
```

## Checklist
- [ ] Dot-separated lowercase `component.element`
- [ ] On the outermost element; no existing data-testid overridden
- [ ] Only the attribute added — no other production-code change
