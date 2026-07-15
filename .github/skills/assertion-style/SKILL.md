---
name: assertion-style
description: Use when writing or reviewing test assertions. Applies the canonical web-first and assertion-context rules from CODING_STANDARDS.md.
---

# Assertion Style

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md) and use
`CODING_STANDARDS.md` for the exact assertion rules.

Use this skill when assertions need a quick reminder:
- assertions belong in tests, not Page Objects
- prefer web-first, auto-retrying assertions
- apply the assertion context requirement exactly as defined in `CODING_STANDARDS.md`
- use `expect.soft()` only for independent checks
