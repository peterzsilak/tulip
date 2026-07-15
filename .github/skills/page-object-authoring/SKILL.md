---
name: page-object-authoring
description: Use when creating or refactoring a Page Object or reusable widget. Applies the canonical Page Object, container, locator, and size rules from CODING_STANDARDS.md.
---

# Page Object Authoring

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md) and use
`CODING_STANDARDS.md` for the page-object rules.

This skill is the step-by-step recipe.

## Steps
1. Create the file under the page-objects path from `PROJECT.md`.
2. Use `ElementContainer<T>` for reusable widgets.
3. Keep locators `readonly`, lazy, and scoped to the PO root.
4. Expose actions only; no assertions or business logic in the PO.
5. Apply the size and parameter limits from `CODING_STANDARDS.md`.
6. Start from `page-object.template.ts`, replacing the `Example*` symbols and locators before writing
   source code.
