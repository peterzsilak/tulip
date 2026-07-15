---
name: project-scaffolding
description: Use once to bootstrap or adopt the test architecture from PROJECT.md paths and the checked-in portable templates.
---

# Project Scaffolding

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md) and use
`PROJECT.md` for the paths.

Create directories only when used.

## Steps
1. Update every project-dependent value in `PROJECT.md` before generating source files.
2. Validate package, TypeScript, ESLint, Playwright, environment, and MCP prerequisites.
3. Create folders from `PROJECT.md` only when a real scenario needs them.
4. Materialize `element-container.template.ts`, `test-tags.template.ts`, and
   `fixture-entrypoint.template.ts`; replace the `Example*` symbols and locators with project types.
5. Re-export `test` and `expect` from the fixture entrypoint.
6. For Controllers, Facades, or services with multiple dependencies, expand the fixture from the
   `fixture-wiring` skill instead of treating the single-Page Object template as complete.
7. Run the quality-gates command and one focused browser project from `PROJECT.md`.

Existing projects keep their established paths: map them in `PROJECT.md` instead of moving source
code merely to match a template.
