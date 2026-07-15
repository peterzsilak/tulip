---
name: error-handling
description: Use when adding or reviewing failure handling in tests, services, fixtures, or agent workflows.
---

# Error Handling

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md). Use the exact error rules
from `CODING_STANDARDS.md` and escalation policy from `AGENTS.md`.

## Workflow
1. Preserve the original failure and add only actionable context.
2. Catch only errors that can be handled at the current boundary.
3. Keep cleanup deterministic and allow the test runner to report the failure.
4. Never return a success-shaped fallback or silently abandon invalid input.
5. Persist evidence and escalate at the configured attempt limit.
