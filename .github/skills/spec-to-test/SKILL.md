---
name: spec-to-test
description: Use when turning a plan scenario into a Playwright *.spec.ts. Enforces AAA structure, tags, fixture-injected Page Objects, and web-first assertions; allows a cohesive file to hold multiple related tests when they share a real precondition.
---

# Spec → Test

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md) and use
`CODING_STANDARDS.md` for the exact test-design rules.

Convert one plan scenario, or a small cohesive group of related scenarios, into one clean spec file.

## Steps
1. Create the spec under the tests path from `PROJECT.md`.
2. Keep the spec focused and cohesive.
3. Add the required scope + platform tags.
4. Inject Page Objects and Controllers via fixtures only.
5. Apply the canonical AAA and assertion rules from `CODING_STANDARDS.md`.
6. Keep each test independent and idempotent.
