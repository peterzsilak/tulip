---
name: network-mocking
description: Use when a test must stub, intercept, or assert network traffic. Provides page.route() patterns for deterministic responses and request assertions, scoped per test.
---

# Network Mocking

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md) and use
`CODING_STANDARDS.md` for the exact waiting and repeatability rules.

Use real API seeding for safe, owned preconditions. Mock external, unsafe, unavailable, or
environment-prohibited dependencies. Environment selection belongs in `strategy-pattern`.

## Rules
- Keep routes scoped to the test.
- Mock only what the test needs.
- Prefer real seeding only for safe, owned state.
- Use MCP evidence when network behavior and assumptions diverge.
