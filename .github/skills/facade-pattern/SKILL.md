---
name: facade-pattern
description: Use when several API clients (or low-level services) should be exposed to tests through one simple, high-level entry point. Hides subsystem complexity behind intention-revealing methods; injected via fixtures.
---

# Facade Pattern (API / Service Facade)

Follow [`AGENTS.md`](../../../AGENTS.md) §2 (`api/`, `services/`), §5, §8. A Facade gives tests a single,
simple surface over a complex subsystem of API clients.

> Related: the **Controller pattern** is the Facade over *UI Page Objects*; this skill is the Facade
> over *API clients / services*. Use this when test setup needs to talk to several backend resources.

## When to use
- ≥2–3 API clients are needed to arrange one logical precondition (e.g. create a user **and** seed its
  todos **and** set a feature flag).
- You want tests to call `api.seedUserWithTodos(...)` instead of orchestrating raw clients.

## Steps
1. Put low-level HTTP clients in `api/<resource>.client.ts` (one client = one resource, SRP).
2. Create the facade in `services/api-facade.ts` (or a domain-named facade). Its constructor receives
   the clients it composes (injected, not constructed inside).
3. Expose **high-level, intention-revealing** methods that read like business steps; each delegates to
   the underlying clients (single level of abstraction, ≤ 20 lines, ≤ 4 params).
4. **No locators, no assertions** in the facade — it orchestrates API calls only.
5. Inject the facade via a fixture (see `fixture-wiring`); tests never touch raw clients.
6. Credentials/tokens from **environment variables** only.

## Example
```ts
// api/user.client.ts and api/todo.client.ts each wrap one resource.

export class ApiFacade {
  constructor(
    private readonly users: UserClient,
    private readonly todos: TodoClient,
  ) {}

  async seedUserWithTodos(name: string, titles: string[]): Promise<void> {
    const user = await this.users.create({ name });
    for (const title of titles) {
      await this.todos.create(user.id, aTodo().withTitle(title).build());
    }
  }
}
```

## Checklist
- [ ] One client per resource (SRP); facade composes them
- [ ] Clients injected, not constructed inside the facade
- [ ] High-level methods only; no locators/assertions; no `any`
- [ ] Exposed to tests via a fixture; credentials from env vars
