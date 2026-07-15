---
name: secrets-management
description: Use when tests, MCP, CI, or tracker integrations require credentials or sensitive data.
---

# Secrets Management

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md). Use
`CODING_STANDARDS.md` for security rules and `PROJECT.md` for variable names.

## Workflow
1. Keep values in environment variables or the host secret store.
2. Put names and safe placeholders only in `.env.example`.
3. Never print, persist, commit, or include secrets in reports, traces, fixtures, or MCP evidence.
4. Fail clearly when a required value is absent.
5. If exposure is suspected, stop propagation and recommend rotation without repeating the value.
