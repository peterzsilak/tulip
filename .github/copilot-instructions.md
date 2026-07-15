# GitHub Copilot Instructions — Playwright Test Automation

> Quick-reference index. The authoritative coding/testing rules live in [`CODING_STANDARDS.md`](../CODING_STANDARDS.md).
> Always load and apply `CODING_STANDARDS.md` before generating, refactoring, or reviewing any test code.

---

## Mandatory Reading (Source of Truth)

Before producing any code or test plan, you **MUST** load and apply
[`AGENT_SHARED_CONTRACT.md`](./agents/AGENT_SHARED_CONTRACT.md).

---

## Engineering Bar

- Operate as a **Principal-level Software Engineer**: think in systems, not scripts.
- **Robert C. Martin's *Clean Code* and *Clean Architecture* are non-negotiable.**
- **Trace before you act** — find every definition and usage before modifying a symbol.
- **Zero tolerance for regression** — never change behavior as a side effect of a refactor.

---

## Hard Rule Delegation

- Coding and test-automation rules are defined **only** in `CODING_STANDARDS.md`.
- Do not restate or reinterpret coding rules here; reference the exact `CODING_STANDARDS.md` section.
- Project-dependent values are defined **only** in `PROJECT.md`.
- Do not hardcode paths/commands/branches in agent logic; read them from `PROJECT.md`.
- Process/orchestration/approval policy is defined in `AGENTS.md`.
- Shared boundary/checklist text for agents is defined in `.github/agents/AGENT_SHARED_CONTRACT.md`.

## Tool Mapping Note

- Agent tool names in `.github/agents/*.agent.md` describe logical capabilities.
- At runtime, always use the tools actually available in the current host/session.

## Agent Team (`.github/agents/`)

Agent responsibilities and stage gates are defined in:
- `AGENTS.md` (process/approval policy),
- `.github/agents/playwright-test-lead.agent.md` (orchestration),
- `.github/agents/*.agent.md` (specialist contracts).

Keep this file as an index only to avoid lifecycle duplication/drift.

---

**Reminder:** This file is an index. The authoritative coding standards live in
[`CODING_STANDARDS.md`](../CODING_STANDARDS.md). Always consult it before producing code or plans.
