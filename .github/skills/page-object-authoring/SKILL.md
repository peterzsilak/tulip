---
name: page-object-authoring
description: Use when creating or refactoring a Page Object or reusable widget. Enforces ElementContainer<T> base class, readonly lazy locators, no assertions in POs, methods ≤20 lines, file ≤300 lines.
---

# Page Object Authoring

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `CODING_STANDARDS.md` for page-object rules and `PROJECT.md` for path conventions.
This skill is the step-by-step recipe.

## Steps
1. Create the file in `<page-objects-path-from-PROJECT.md>/<feature>.po.ts` (kebab-case). Reusable widget →
   `<page-objects-path-from-PROJECT.md>/element-containers/<widget>-container.ts`.
2. A reusable widget **extends `ElementContainer<T>`**; a page-level PO receives `page` in its
   constructor.
3. Declare locators as **`readonly` lazy** properties scoped to the PO root, `getByTestId`-first.
4. Expose **actions** with intention-revealing names (`addTodo(title)`), not `goTo()`. **No assertions**
   inside the PO — tests own assertions.
5. Keep methods ≤ 20 lines, ≤ 4 params (use an options object if more). No one-liner proxy methods.
6. If the file exceeds 300 lines, decompose into Element Containers or a Controller.

## Template
See [page-object.template.ts](./page-object.template.ts).

## Checklist
- [ ] Extends `ElementContainer<T>` (if reusable widget)
- [ ] `readonly` lazy locators scoped to root, no raw `page.locator`
- [ ] No assertions, no business logic, no `any`
- [ ] ≤ 300 lines, methods ≤ 20 lines, ≤ 4 params
