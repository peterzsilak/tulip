---
name: strategy-pattern
description: Use when interchangeable behaviors must be selected at runtime — e.g. authentication (UI/API/token) or environment-based data setup (TEST/QA use real API, ALPHA/PROD only mock). Apply only with ≥3 interchangeable implementations (KISS/YAGNI).
---

# Strategy Pattern

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `CODING_STANDARDS.md` for SOLID and pattern gatekeeping rules.

## Gatekeeper (read first)
Introduce a Strategy **only when interchangeable implementations behind one interface actually exist**
(≥3, or a concrete plan for them). One implementation → no interface yet (YAGNI). A Strategy that always
resolves to the same branch is over-engineering.

## How to apply
1. Define a focused interface in `config/` or the relevant domain folder (Interface Segregation,
   no `I` prefix).
2. Implement each concrete strategy in its own file (SRP). All implementations must be **interchangeable**
   (Liskov) — same contract, no caller-visible behavioral surprises.
3. Select the strategy in **one place** (a fixture or a small selector), driven by config/environment.
4. Tests/services depend on the **interface**, never on a concrete class (Dependency Inversion) — inject
   the chosen strategy via a fixture (see `fixture-wiring`).
5. No secrets in code — read credentials/tokens from environment variables.

## Use case A — Environment-based data setup
TEST/QA hit a real API (safe to write); ALPHA/PROD have a live backend, so we **only mock**.

```ts
export interface DataSetupStrategy {
  seedTodos(titles: string[]): Promise<void>;
}

// TEST + QA: real API writes
export class ApiDataSetupStrategy implements DataSetupStrategy {
  constructor(private readonly api: ApiFacade) {}
  async seedTodos(titles: string[]): Promise<void> {
    for (const t of titles) await this.api.createTodo(aTodo().withTitle(t).build());
  }
}

// ALPHA + PROD: never write to a live backend — mock the responses
export class MockDataSetupStrategy implements DataSetupStrategy {
  constructor(private readonly page: Page) {}
  async seedTodos(titles: string[]): Promise<void> {
    await this.page.route('**/api/todos', route =>
      route.fulfill({ json: titles.map(t => aTodo().withTitle(t).build()) }));
  }
}

// Selection (in a fixture), driven by the Environments enum:
const isWritableEnv = [Environments.Test, Environments.QA].includes(env);
const dataSetup: DataSetupStrategy = isWritableEnv
  ? new ApiDataSetupStrategy(apiFacade)
  : new MockDataSetupStrategy(page);
```

> Mock payloads come from the `test-data-builder` skill; route interception details in `network-mocking`.

## Use case B — Authentication
`AuthStrategy` with interchangeable implementations: `UiLoginStrategy`, `ApiLoginStrategy`,
`TokenInjectionStrategy`. Pick per suite/environment via a fixture; tests just receive an authenticated
context and never know which strategy ran.

```ts
export interface AuthStrategy { login(user: Credentials): Promise<void>; }
```

## Checklist
- [ ] ≥3 (or genuinely planned) interchangeable implementations — else don't add the interface
- [ ] Focused interface; each strategy in its own file; Liskov-substitutable
- [ ] Selected in one place from config/environment; injected via fixture
- [ ] Callers depend on the interface, not a concrete class; credentials from env vars
