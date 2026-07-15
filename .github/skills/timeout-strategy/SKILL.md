---
name: timeout-strategy
description: Use when a test needs synchronization or a timeout decision without introducing fixed sleeps.
---

# Timeout Strategy

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md). Use
`CODING_STANDARDS.md` for the canonical waiting rules and `PROJECT.md` for configured values.

## Decision order
1. Prefer a web-first assertion for observable business state.
2. Use `locator.waitFor()` for DOM readiness without an assertion.
3. Wait for a specific request/response only when network completion is the behavior boundary.
4. Use a named timeout only when the default cannot represent a documented system contract.
5. Never use fixed sleeps, `networkidle`, or a larger timeout to hide an unknown race.
