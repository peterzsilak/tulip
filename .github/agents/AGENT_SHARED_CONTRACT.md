# AGENT_SHARED_CONTRACT.md — Common Agent Contract

Use this contract to keep every specialist thin, portable, and aligned to the same policy.

## Mandatory load order

1. [`CODING_STANDARDS.md`](../../CODING_STANDARDS.md) — coding and test-automation rules.
2. [`PROJECT.md`](../../PROJECT.md) — project-specific paths, commands, limits, and integrations.
3. [`AGENTS.md`](../../AGENTS.md) — workflow, approvals, delivery, and escalation.

## Source-of-truth boundary

- Do not duplicate or reinterpret coding rules outside `CODING_STANDARDS.md`.
- Do not duplicate or reinterpret workflow policy outside `AGENTS.md`.
- Do not hardcode project values outside `PROJECT.md`.
- Agent and skill files contain only role-specific workflow or execution guidance.
- Resolve conflicts by domain: coding → `CODING_STANDARDS.md`; project value → `PROJECT.md`;
  process/approval → `AGENTS.md`.
- If a conflict crosses domains or remains ambiguous, stop and ask the user.

## Preflight

- Confirm task scope, input/output artifacts, paths, commands, and limits from `PROJECT.md`.
- Trace existing definitions and usages before changing a symbol.
- Check the working tree and preserve unrelated user changes.
- Identify the required skill(s) and MCP evidence requirement.
- Confirm the approval boundary before any remote or tracker action.

## Exit gate

- Verify the role-specific output artifact exists and is complete.
- Run the project commands required for the changed scope.
- Persist handoff evidence in the project-defined artifact path when another agent needs it.
- Include MCP or CI-equivalent evidence for scenarios required by `AGENTS.md`.
- Report unresolved risks plainly; never claim success for a failed or skipped gate.
- Perform no outbound action without the approval required by `AGENTS.md`.
