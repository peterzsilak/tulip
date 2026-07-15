---
name: fixture-wiring
description: Use when adding a new Page Object, Controller, or service so tests can inject it. Enforces Dependency Inversion and loose coupling — depend on abstractions, constructor-inject collaborators, no `new PageObject(page)` in tests, no singletons or global state.
---

# Fixture Wiring (Dependency Injection)

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `CODING_STANDARDS.md` for DI rules and `PROJECT.md` for fixture path conventions.
Every PO/Controller/service reaches tests **only** through the fixture chain, and consumers depend on
**abstractions**, not concrete classes.

## Steps
1. Add the type to the `CustomFixtures` interface (camelCase fixture name, typed — no `any`).
2. Implement the fixture in `base.extend<CustomFixtures>({ ... })`. The fixture is the **only** place
   that constructs concretes; consumers receive them already built.
3. If the new object depends on another collaborator, **declare that dependency in the fixture params**
   and have the class accept it via its **constructor** — never `new` it inside, never use a singleton
   or global.
4. Where behavior can vary (env/auth/data source), inject an **interface**, not a concrete class, so the
   implementation can be swapped or mocked (see the `strategy-pattern` skill).
5. Export the extended `test`/`expect` and re-use it in specs. Tests receive everything via params.

## Loose-coupling rules
- Consumers depend on a **typed contract/interface**, not a concrete implementation.
- **No** `new Collaborator()` in a consumer, **no** static singletons, **no** global mutable state.
- Each unit must be **mockable/replaceable in isolation** — if it isn't, invert the dependency.
- Don't cross layers directly: tests don't touch raw `request`/`page.locator`; services don't import POs.

## Example
```ts
interface TodoGateway { create(todo: Todo): Promise<void>; }

type CustomFixtures = {
  todoPage: TodoPage;
  checkout: CheckoutController;
};

export const test = base.extend<CustomFixtures>({
  todoPage: async ({ page }, use) => { await use(new TodoPage(page)); },
  // CheckoutController depends on the TodoGateway abstraction, injected here:
  checkout: async ({ todoGateway }, use) => { await use(new CheckoutController(todoGateway)); },
});
```

## Checklist
- [ ] Consumer depends on an abstraction/interface, not a concrete class
- [ ] Collaborators constructor-injected; only the fixture constructs concretes
- [ ] No `new PageObject(page)` in specs; no singletons/global state
- [ ] Unit is mockable in isolation; fixture typed (no `any`)
