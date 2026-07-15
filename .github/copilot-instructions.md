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

**Authoring pipeline** — coordinate the specialists through the **lead** in a gated flow
(plan → generate → heal → verify):

- `playwright-test-lead` — orchestrator; sequences the team and enforces the gates.
- `playwright-test-planner` — produces the plan file defined in `PROJECT.md`.
- `playwright-test-generator` — implements into test/page-object paths defined in `PROJECT.md`.
- `playwright-test-healer` — fixes failing tests without weakening assertions.

**Review & delivery** — end-of-dev review, git, and PR handling (all gated on your approval):

- `code-reviewer` — local end-of-dev review against `CODING_STANDARDS.md`; discusses **everything**
  (what to fix, what to leave) before any change. Never edits or commits.
- `git-workflow` — update base branch, rebase, resolve conflicts, Conventional-Commit, squash, push,
  open PR. Confirms before any action in your name.
- `pr-reviewer` — checks out your/others' PRs, reviews to standard, judges incoming comments,
  fixes valid ones (own PR only). Posts inline comments via `gh` **only after your explicit approval**.

**Planning intake** — connect a ticket tracker to the delivery flow:

- `jira-workflow` — reads tasks from tracked stories, plans via the planner, splits into sub-tasks
  when PR size requires, posts status comments, and moves items on the board (Open → In Progress →
  Code Review). **Never writes, comments, or transitions without your explicit approval.**
  MCP-first (Atlassian MCP), REST-fallback (env vars only).

Agents are loosely coupled: they hand off via **artifacts** (plan file, test files, diffs/PRs), and
work is Done only when the quality gates and test commands from `PROJECT.md` are green.

---

**Reminder:** This file is an index. The authoritative coding standards live in
[`CODING_STANDARDS.md`](../CODING_STANDARDS.md). Always consult it before producing code or plans.
