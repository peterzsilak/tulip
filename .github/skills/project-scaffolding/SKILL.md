---
name: project-scaffolding
description: Use once to bootstrap the test architecture from PROJECT.md paths, with the ElementContainer<T> base class and TestTags/TimeConfig enums referenced across the rules.
---

# Project Scaffolding

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `PROJECT.md` as the source for path scaffolding and `CODING_STANDARDS.md` for design constraints.
Create directories **only when used** (YAGNI) — this skill creates foundational ones.

## Steps
1. Create folders from `PROJECT.md` path definitions (tests, page-objects, fixtures, services, config, utils).
2. Add the `ElementContainer<T>` base class, `TestTags`, and `TimeConfig` (templates below).
3. Add an index file under the fixture path from `PROJECT.md` that re-exports extended `test`/`expect`
   (see the `fixture-wiring` skill).
4. Keep everything `strict`, no `any`.

## `<page-objects-path-from-PROJECT.md>/element-containers/element-container.ts`
```ts
import { Locator } from '@playwright/test';

export abstract class ElementContainer<T> {
  protected readonly root: Locator;
  constructor(root: Locator) { this.root = root; }

  first(): Locator { return this.root.first(); }
  last(): Locator { return this.root.last(); }
  nth(index: number): Locator { return this.root.nth(index); }
  all(): Promise<Locator[]> { return this.root.all(); }
  count(): Promise<number> { return this.root.count(); }
  click(): Promise<void> { return this.root.first().click(); }
  waitFor(): Promise<void> { return this.root.first().waitFor(); }
}
```

## `config/test-tags.ts`
```ts
export const TestTags = {
  SMOKE: '@smoke', SANITY: '@sanity', REGRESSION: '@regression',
  DESKTOP: '@desktop', MOBILE: '@mobile',
} as const;
export type TestTag = (typeof TestTags)[keyof typeof TestTags];
```

## `config/time-config.ts`
```ts
export enum TimeConfig {
  TinyTimeout = 1_000,
  DefaultTimeout = 5_000,
  LongTimeout = 15_000,
}
```

## Checklist
- [ ] Folder skeleton created (only foundational dirs)
- [ ] `ElementContainer<T>`, `TestTags`, `TimeConfig` in place, strict-typed
- [ ] fixture index file exports extended `test`/`expect`
