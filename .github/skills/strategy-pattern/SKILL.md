---
name: strategy-pattern
description: Use when multiple interchangeable behaviors must be selected at runtime. Applies the canonical pattern threshold and DI rules from CODING_STANDARDS.md.
---

# Strategy Pattern

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `CODING_STANDARDS.md` for SOLID and pattern gatekeeping rules.

## Gatekeeper
Apply the pattern-introduction threshold from `CODING_STANDARDS.md`. Do not create a Strategy for a
single implementation or a hypothetical variation.

## How to apply
1. Define a focused interface in `config/` or the relevant domain folder (Interface Segregation,
   no `I` prefix).
2. Implement each concrete strategy in its own file (SRP). All implementations must be **interchangeable**
   (Liskov) — same contract, no caller-visible behavioral surprises.
3. Select the strategy in **one place** (a fixture or a small selector), driven by config/environment.
4. Tests/services depend on the **interface**, never on a concrete class (Dependency Inversion) — inject
   the chosen strategy via a fixture (see `fixture-wiring`).
5. No secrets in code — read credentials/tokens from environment variables.

## Example use case — Authentication
`AuthStrategy` with interchangeable implementations: `UiLoginStrategy`, `ApiLoginStrategy`,
`TokenInjectionStrategy`. Pick per suite/environment via a fixture; tests just receive an authenticated
context and never know which strategy ran.

```ts
export interface AuthStrategy { login(user: Credentials): Promise<void>; }
```

## Checklist
- [ ] Canonical pattern threshold is satisfied
- [ ] Focused interface; each strategy in its own file; Liskov-substitutable
- [ ] Selected in one place from config/environment; injected via fixture
- [ ] Callers depend on the interface, not a concrete class; credentials from env vars
