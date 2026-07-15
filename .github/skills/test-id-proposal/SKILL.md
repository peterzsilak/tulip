---
name: test-id-proposal
description: Use when an element lacks a stable locator hook. Proposes a dot-separated, lowercase `component.element` test-id attribute value without modifying production logic, styles, or templates beyond the attribute.
---

# Test ID Attribute Proposal

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `CODING_STANDARDS.md` for locator policy and `PROJECT.md` for the configured test-id source.
When no semantic locator is reliable, propose the configured attribute instead of brittle CSS/XPath.

## Rules
- Format: **`"component.element"`** — dot-separated, lowercase (e.g. `"todo.input"`,
  `"todo-item.label"`).
- Place it on the **outermost element** of the component.
- **Do not modify production logic, styles, or templates** beyond adding the attribute.
- **Never override** an existing configured test-id attribute or break CSS/SCSS selectors.
- Present the change as a **suggestion/diff** for the app team if you cannot edit the app safely.

## Example
```html
<!-- before -->
<input class="new-todo" placeholder="What needs to be done?" />

<!-- after: only the attribute is added -->
<input class="new-todo" placeholder="What needs to be done?" {{TEST_ID_ATTRIBUTE}}="todo.input" />
```

## Checklist
- [ ] Dot-separated lowercase `component.element`
- [ ] On the outermost element; no existing configured test-id attribute overridden
- [ ] Only the attribute added — no other production-code change
