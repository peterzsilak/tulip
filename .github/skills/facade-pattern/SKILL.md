---
name: facade-pattern
description: Use when several API clients (or low-level services) should be exposed to tests through one simple, high-level entry point. Hides subsystem complexity behind intention-revealing methods; injected via fixtures.
---

# Facade Pattern (API / Service Facade)

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md) and use
`CODING_STANDARDS.md` for the exact architecture rules.

A Facade gives tests a single, simple surface over multiple API clients or services.

> Related: the **Controller pattern** is the Facade over *UI Page Objects*; this skill is the Facade
> over *API clients / services*. Use this when test setup needs to talk to several backend resources.

## When to use
- ≥2–3 API clients are needed to arrange one logical precondition (e.g. create a user **and** seed its
  todos **and** set a feature flag).
- You want tests to call `api.seedUserWithTodos(...)` instead of orchestrating raw clients.

## Steps
1. Put one low-level client in one file per resource.
2. Create the facade in the services path from `PROJECT.md`.
3. Inject the composed clients through the constructor.
4. Expose high-level methods only.
5. Keep locators, assertions, and secrets out of the facade.
6. Expose it to tests via a fixture.
