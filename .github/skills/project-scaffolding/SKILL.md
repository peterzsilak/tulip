---
name: project-scaffolding
description: Use once to bootstrap the test architecture — page-objects/, fixtures/, services/, config/ with the ElementContainer<T> base class and TestTags/TimeConfig enums referenced across the rules.
---

# Project Scaffolding

Follow [`AGENTS.md`](../../../AGENTS.md) §2. Create the skeleton that the agents and other skills assume
exists, so generated tests import real building blocks. Create directories **only when used** (YAGNI) —
this skill creates the foundational ones.

## Steps
1. Create folders: `page-objects/`, `page-objects/containers/`, `page-objects/controllers/`,
   `fixtures/`, `services/`, `config/`, `utils/`.
2. Add the `ElementContainer<T>` base class, `TestTags`, and `TimeConfig` (templates below).
3. Add a `fixtures/index.ts` that re-exports an extended `test`/`expect` (see the `fixture-wiring` skill).
4. Keep everything `strict`, no `any`.

## `page-objects/containers/element-container.ts`
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
- [ ] `fixtures/index.ts` exports extended `test`/`expect`
