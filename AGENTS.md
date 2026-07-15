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

### 4.1 MCP usage policy

Playwright MCP is required for:

- flaky/intermittent test triage;
- locator ambiguity or unstable selector behavior;
- new flow discovery before finalizing a plan;
- network/state mismatch between expected and observed behavior.

The stage output includes the MCP evidence block from `PROJECT.md`, and decisions trace to that
evidence. Local agent runs use MCP; CI uses the artifact-equivalent evidence from `PROJECT.md`.
MCP does not replace quality, review, or approval gates.

### 4.2 Artifact handoffs

Agents communicate through artifacts, not assumed chat memory. The canonical plan, implementation,
diagnostic evidence, review findings, and branch/PR are located using `PROJECT.md`.

- A stage must state its input artifact and exit gate.
- A failed gate returns ownership to the agent responsible for that stage.
- Review findings are persisted in the agent-artifacts path from `PROJECT.md`.
- Source code and durable project documentation never depend on files under the agent-artifacts path.

### 4.3 Failure and escalation policy

- Reproduce before changing behavior.
- Retry an agent stage only after changing the diagnostic hypothesis or implementation approach.
- Use the stage-attempt limit from `PROJECT.md`; do not loop indefinitely.
- If the limit is reached, preserve evidence, stop, and ask the user to choose among clearly described
  options.
- Never hide a failure with retries, relaxed gates, skipped tests, or success-shaped fallbacks.

### 4.4 Parallel and competing-solution work

Independent scenarios may run in parallel up to the limit in `PROJECT.md`.

- Each writing agent uses a separate git worktree and branch.
- Each candidate owns separate plan, report, trace, and agent-artifact paths.
- Test data, credentials, ports, and mutable external state must be isolated.
- Work that edits the same artifact or depends on another candidate stays sequential.
- Competing fixes run the same reproduction, affected tests, stability run, and quality gates.
- The lead compares correctness, stability, scope, and maintainability; it never combines candidates
  automatically or selects only because one finished first.

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
- Local history rewriting and destructive commands require explicit per-action confirmation.
- For force push, require separate approval and use `--force-with-lease`.
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
- Lead: stage orchestration, artifact verification, failure escalation, and parallel candidate
  reconciliation

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
- Use the human author identity defined in `PROJECT.md`; do not attribute authorship to tools or
  automation.

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
