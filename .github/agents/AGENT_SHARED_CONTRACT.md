# AGENT_SHARED_CONTRACT.md — Common Agent Contract

Use this file to avoid repeating identical source-of-truth, boundary, and checklist text across agent descriptions.

## Mandatory Reading (Source of Truth)

Before coding/review/planning work, load and apply this file.

## Source-of-Truth Boundary

1. **Coding and test-automation standards** live in [`CODING_STANDARDS.md`](../../CODING_STANDARDS.md).
2. **Process/workflow/approval policy** lives in [`AGENTS.md`](../../AGENTS.md).
3. **Project-specific values** (paths, commands, branches, env vars) live in [`PROJECT.md`](../../PROJECT.md).

## Required Load Order

1. Read `CODING_STANDARDS.md`
2. Read `PROJECT.md`
3. Read `AGENTS.md`

## Non-Negotiable Rules

- Do not duplicate or redefine coding rules outside `CODING_STANDARDS.md`.
- Do not hardcode project-specific values outside `PROJECT.md`.
- Do not redefine workflow policy outside `AGENTS.md`.
- If conflict appears, resolve by domain:
  - coding conflict → `CODING_STANDARDS.md` wins
  - project-value conflict → `PROJECT.md` wins
  - process/policy conflict → `AGENTS.md` wins

## Rule Application Boundary (Shared)

- **Coding decisions** come from `CODING_STANDARDS.md`.
- **Process/workflow/approval decisions** come from `AGENTS.md`.
- **Project-specific values** come from `PROJECT.md`.
- Do not invent local rule variants.

## Execution Checklists (Shared Baseline)

### Preflight (baseline)

- Load this contract and apply its source-of-truth split.
- Confirm scope and artifacts/commands/paths from `PROJECT.md`.
- Confirm approval boundary from `AGENTS.md` before any remote/tracker action.
- If the task matches MCP-required scenarios from `AGENTS.md`, prepare MCP evidence per `PROJECT.md`.

### Exit Gate (baseline)

- Keep decisions traceable to the correct source-of-truth file.
- Run/verify quality gates from `PROJECT.md` when code changes are made.
- Do not perform push/PR/comment/tracker-write action without explicit user approval.
- For MCP-required scenarios, include the MCP evidence block from `PROJECT.md` in the handoff/output.
- In CI contexts, use artifact-based equivalent evidence from `PROJECT.md` when MCP server access is
  unavailable.
