---
name: flaky-test-triage
description: Use when a test fails intermittently. A systematic recipe to find the root cause (timing, state pollution, races) and fix it with targeted waits — never blanket timeouts or retries that hide the bug.
---

# Flaky Test Triage

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md).
Use `CODING_STANDARDS.md` for anti-flakiness rules and `PROJECT.md` for commands.
**Never suppress flakiness** — diagnose the root cause.

## Diagnosis order
1. **Reproduce** — run the single test repeatedly (e.g. `--repeat-each=20`) and with `--retries=0` to
   confirm the flake and read the trace.
2. **Classify the cause:**
   - **Timing/race** — assertion runs before the app settles (lazy load, animation, async update).
   - **State pollution** — a previous test or shared data leaked in (not Independent).
   - **Locator ambiguity** — selector matches 0 or >1 elements depending on timing.
   - **Environment/data** — order-dependent or data-dependent assumption.
3. **Fix at the root:**
   - Replace `page.waitForTimeout()` with a **web-first assertion** or `locator.waitFor()`.
   - Make the locator deterministic (`getByTestId`/role, scoped) — see `locator-strategy`.
   - Make the test **self-seed** fresh state — see `state-seeding-via-api`.
   - Never wait for `networkidle`; never add blanket retries to mask the issue.
4. **Verify** — rerun repeatedly until consistently green.
5. **Last resort:** if confident the test is correct but the app is genuinely broken/unstable, mark
   `test.fixme()` with a comment describing observed vs. expected, and flag the app-side root cause.

## Anti-patterns → fix
| ❌ | ✅ |
|---|---|
| `await page.waitForTimeout(2000)` | `await expect(el, '...').toBeVisible()` |
| add `retries: 3` to hide it | fix the timing/state root cause |
| `await page.waitForLoadState('networkidle')` | wait on a concrete element/state |

## Checklist
- [ ] Root cause identified (timing / state / locator / data)
- [ ] Fixed with targeted wait or deterministic locator, no blanket timeout
- [ ] Verified stable across repeated runs
