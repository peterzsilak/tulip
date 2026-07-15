---
name: fixture-wiring
description: Use when adding a new Page Object, Controller, or service so tests can inject it. Enforces Dependency Inversion and loose coupling — depend on abstractions, constructor-inject collaborators, no `new PageObject(page)` in tests, no singletons or global state.
---

# Fixture Wiring (Dependency Injection)

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md) and use
`CODING_STANDARDS.md` for the DI rules.

Every PO, Controller, and service reaches tests through the fixture chain only.

## Steps
1. Add the type to the `CustomFixtures` interface.
2. Create the concrete in `base.extend<CustomFixtures>({ ... })`.
3. Inject collaborators through constructors, not inside the consumer.
4. Introduce an interface only when the canonical abstraction threshold is satisfied.
5. Re-export the extended `test`/`expect` from the fixture entrypoint.
