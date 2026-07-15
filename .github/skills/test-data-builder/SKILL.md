---
name: test-data-builder
description: Use when a test needs structured input data. Provides the Builder pattern for test data with sensible defaults, so tests stay readable and free of hardcoded literals (DRY).
---

# Test Data Builder

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `CODING_STANDARDS.md` for builder/pattern constraints and `PROJECT.md` for paths.
Build test data with the **Builder pattern** instead of scattering hardcoded literals across tests.
Apply the pattern-introduction threshold from `CODING_STANDARDS.md`.

## Steps
1. Create `<entity>.builder.ts` in the test-data path from `PROJECT.md`.
2. Define a typed model (`interface`, no `any`) and a builder with **sensible defaults** so a valid
   object can be produced with zero arguments.
3. Expose fluent `with<Field>(value)` methods returning `this`; finish with `build()`.
4. Keep methods tiny (≤ 20 lines), no side effects, Command-Query Separation.
5. Tests read like prose: `aTodo().withTitle('Buy milk').completed().build()`.
6. **No secrets** in defaults — read credentials from environment variables.

## Checklist
- [ ] Typed model + builder with valid defaults (no `any`)
- [ ] Fluent `with*` methods + `build()` returning a fresh copy
- [ ] Replaces hardcoded literals in tests; no secrets in defaults
