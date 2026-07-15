---
name: state-seeding-via-api
description: Use to Arrange test state through the API/service layer instead of slow UI clicks. Improves F.I.R.S.T. (Fast + Independent) and keeps tests focused on the behavior under test.
---

# State Seeding via API

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `CODING_STANDARDS.md` for F.I.R.S.T./DI constraints and `PROJECT.md` for path conventions.
Set up preconditions through the fastest reliable layer; reserve the UI for the behavior under test.

## Principle
- **Arrange via API/service**, **Act via UI**, **Assert via UI (or state)**. Don't click through five
  pages just to reach the state you want to verify.
- Each test seeds its **own** state and cleans up — no shared mutable state between tests.

## Steps
1. Put HTTP clients in an API client path defined by your project; expose them through services path
   conventions from `PROJECT.md`.
2. Inject the service via a fixture (see the `fixture-wiring` skill) — never call raw `request` in a spec.
3. Seed preconditions in the Arrange phase (or a `beforeEach`/worker fixture); tear down what you create.
4. Keep credentials/tokens in **environment variables**, never in code.

## Example
```ts
test('shows seeded todos', { tag: [TestTags.SANITY, TestTags.DESKTOP] },
  async ({ todoApi, todoPage }) => {
    // Arrange — seed via API (fast, reliable)
    await todoApi.create(aTodo().withTitle('Seeded').build());

    // Act + Assert — verify through the UI
    await todoPage.open();
    await expect(todoPage.items, 'Seeded todo should be rendered').toHaveCount(1);
  });
```

## Checklist
- [ ] Preconditions seeded via API/service, not UI navigation
- [ ] Service injected via fixture; no raw `request` in the spec
- [ ] Test self-seeds and cleans up; credentials from env vars
