---
name: network-mocking
description: Use when a test must stub, intercept, or assert network traffic. Provides page.route() patterns for deterministic responses and request assertions, scoped per test.
---

# Network Mocking

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `CODING_STANDARDS.md` for repeatability/waiting constraints and `PROJECT.md` for command context.
Use mocking to make tests deterministic when the real backend is slow, unstable, or hard to seed —
but prefer real API seeding (`state-seeding-via-api`) when feasible. Apply YAGNI: mock only what the
test needs.

## MCP evidence (for network mismatch)
When observed network behavior differs from test assumptions, capture MCP network/console evidence
using the block from `PROJECT.md`, then adjust mock/seed/assertion intentionally.

## Patterns
- **Stub a response** for determinism:
  ```ts
  await page.route('**/api/todos', route =>
    route.fulfill({ json: [aTodo().withTitle('Mocked').build()] }));
  ```
- **Fail/edge-case simulation** (error handling tests):
  ```ts
  await page.route('**/api/todos', route => route.fulfill({ status: 500 }));
  ```
- **Assert an outgoing request** without changing behavior:
  ```ts
  const request = page.waitForRequest('**/api/todos');
  await todoPage.addTodo('Buy milk');
  expect((await request).method(), 'Adding a todo should POST').toBe('POST');
  ```
- **Pass through / modify** with `route.continue()` when you only need to tweak headers/body.

## Rules
- Register routes in **Arrange**, scoped to the test (Playwright auto-unroutes at test end) — no global
  leakage between tests.
- Build mock payloads with the `test-data-builder` skill — no hardcoded literal blobs.
- Never mock away the very behavior under test; keep mocks minimal and intention-revealing.
- No secrets in mock payloads.

## Checklist
- [ ] Mock is the simplest needed; real seeding considered first
- [ ] Routes scoped per test, set up in Arrange
- [ ] Payloads built via builder; assertions keep context messages
