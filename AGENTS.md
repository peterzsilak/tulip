# AGENTS.md — Process & Workflow Policy

> Operational policy for AI coding agents in this repository.
> This file governs **process, approvals, git/PR, and delivery flow**.
> The **only** source of coding and test-automation standards is
> [`CODING_STANDARDS.md`](./CODING_STANDARDS.md).
> The **only** source of project-specific values is [`PROJECT.md`](./PROJECT.md).
> Do not duplicate or redefine coding rules in this file.

---

## 1. Identity & Mindset

- Operate as a **Principal Software Engineer**: think in systems, not scripts.
- **Trace before you act** — find definitions/usages before changing behavior.
- **Own outcomes** — optimize for readability, diagnosability, and reliability.
- **Zero regression tolerance** — no incidental behavior changes.
- Keep changes scope-focused (Boy Scout Rule applies, but no opportunistic rewrites).

---

## 2. Project Context

### Stack
- Runtime: Node.js (LTS)
- Package manager: `npm`
- Language: TypeScript
- Framework: Playwright Test (`@playwright/test`)

### Repository layout
See the canonical path definitions in `PROJECT.md`.

> Directory names and coding conventions are governed by `CODING_STANDARDS.md`.

---

## 3. Coding Rule Delegation (Single Source of Truth)

- All coding, architecture, locator, assertion, timeout, type-safety, and quality-gate rules live in
  [`CODING_STANDARDS.md`](./CODING_STANDARDS.md).
- If any wording in this repository conflicts with coding rules, **`CODING_STANDARDS.md` wins**.
- This file must not carry duplicate coding standards to avoid drift.

---

## 4. Delivery Lifecycle

1. Intake/scope clarification
2. Plan (path from `PROJECT.md`)
3. Generate implementation
4. Heal failures
5. Verify gates
6. Local review
7. Git/PR steps
8. Code review responses

> Stages are sequential; do not skip failed gates.

---

## 4.1 MCP Usage Policy (Process Rule)

Playwright MCP is a required diagnostic aid in the following cases:

- flaky/intermittent test triage
- locator ambiguity or unstable selector behavior
- new flow discovery before finalizing a plan
- network/state mismatch between expected and observed behavior

When MCP is required, the stage output must include an **MCP evidence block** (defined in
`PROJECT.md`) and decisions must trace back to that evidence.

Execution boundary:

- **Local agent runs:** MCP evidence is mandatory for MCP-required scenarios.
- **CI runs:** MCP server startup is not required. CI must provide artifact-based equivalent evidence
  (defined in `PROJECT.md`) for diagnosis.

MCP augments the workflow; it does not replace quality gates, review gates, or approval boundaries.

---

## 5. Approval Boundary (Non-negotiable)

The boundary is **local vs remote**:

- **No approval required (local):**
  - running checks/tests
  - local edits
  - staging
  - local commits
- **Explicit approval required (remote/outbound):**
  - `git push` / force-push
  - opening/updating/closing PRs
  - posting PR comments/reviews
  - writing to ticket trackers (comments, transitions, issue edits/creation)

No outbound action is allowed without explicit user approval for that specific action.

---

## 6. Safety Rules

- Never expose or commit secrets.
- Read credentials only from environment variables.
- If a secret leak is found, flag it and recommend rotation; do not propagate it.
- Prefer non-destructive operations.
- For destructive commands (e.g. force push), require explicit per-action confirmation and use
  safer variants (`--force-with-lease`).
- Never edit another author's PR branch/code directly.

---

## 7. Agent Responsibilities (High-level)

- Planner: produce the plan file defined in `PROJECT.md`
- Generator: implement tests/page objects in directories defined in `PROJECT.md`
- Healer: fix failures without weakening intent
- Reviewer: discuss findings first, no silent edits
- Git workflow: branch/rebase/commit/push/PR mechanics under approval gates
- PR reviewer: evaluate comments and propose/submit approved responses
- Jira workflow: tracker read/write flow with strict approval gates on writes

All agents must apply `CODING_STANDARDS.md` for code quality decisions.

---

## 8. Definition of Done

A change is done when:

- Coding and testing rules are satisfied per `CODING_STANDARDS.md`.
- Quality gates are green (as defined in `CODING_STANDARDS.md` and repository scripts/CI).
- Scope is complete and behavior-safe.
- Local review decisions are resolved.
- PR flow requirements are satisfied.

---

## 9. Git & PR Workflow Policy

### Commit format
- Use Conventional Commits (`type(scope): imperative summary`).
- Keep commits logically scoped and honest to the actual change.

### Branching
- Feature branches only (never direct work on the base branch defined in `PROJECT.md`).
- Preferred naming is defined in `PROJECT.md`.

### Rebase/PR
- Rebase onto the base branch defined in `PROJECT.md` (no merge commits from base into feature branch).
- Keep history clean (squash as needed).
- PR targets the base branch defined in `PROJECT.md` with clear what/why.
- Agents never merge PRs.

### Approval gates
- Local commits are allowed without approval.
- Push/PR/comment/tracker-write operations require explicit approval.
