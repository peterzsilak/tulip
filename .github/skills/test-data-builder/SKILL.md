---
name: test-data-builder
description: Use when a test needs structured input data. Provides the Builder pattern for test data with sensible defaults, so tests stay readable and free of hardcoded literals (DRY).
---

# Test Data Builder

Follow [`AGENTS.md`](../../../AGENTS.md) §6, §8. Build test data with the **Builder pattern** instead of
scattering hardcoded literals across tests. Apply KISS/YAGNI — add a builder only when the shape is
reused or has ≥3 meaningful fields.

## Steps
1. Create `config/test-data/<entity>.builder.ts` (kebab-case).
2. Define a typed model (`interface`, no `any`) and a builder with **sensible defaults** so a valid
   object can be produced with zero arguments.
3. Expose fluent `with<Field>(value)` methods returning `this`; finish with `build()`.
4. Keep methods tiny (≤ 20 lines), no side effects, Command-Query Separation.
5. Tests read like prose: `aTodo().withTitle('Buy milk').completed().build()`.
6. **No secrets** in defaults — read credentials from environment variables.

## Example
```ts
export interface Todo { title: string; completed: boolean; }

export class TodoBuilder {
  private todo: Todo = { title: 'Default todo', completed: false };

  withTitle(title: string): this { this.todo.title = title; return this; }
  completed(): this { this.todo.completed = true; return this; }
  build(): Todo { return { ...this.todo }; }
}

export const aTodo = (): TodoBuilder => new TodoBuilder();
```

## Checklist
- [ ] Typed model + builder with valid defaults (no `any`)
- [ ] Fluent `with*` methods + `build()` returning a fresh copy
- [ ] Replaces hardcoded literals in tests; no secrets in defaults
