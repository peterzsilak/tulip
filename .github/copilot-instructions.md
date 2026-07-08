# GitHub Copilot Instructions — Playwright Test Automation

> Quick-reference index. The authoritative rules live in [`AGENTS.md`](../AGENTS.md).
> Always load and apply `AGENTS.md` before generating, refactoring, or reviewing any test code.

---

## Mandatory Reading (Source of Truth)

Before producing any code or test plan, you **MUST** load and apply
[`AGENTS.md`](../AGENTS.md) — the operational charter covering locator strategy,
Page Object architecture, fixture chain (dependency injection), assertion
standards, Clean Code mandates, design-pattern guidance, the anti-pattern
blocklist, and the Definition of Done. If a rule elsewhere conflicts with
`AGENTS.md`, **`AGENTS.md` wins**.

---

## Engineering Bar

- Operate as a **Principal-level Software Engineer**: think in systems, not scripts.
- **Robert C. Martin's *Clean Code* and *Clean Architecture* are non-negotiable.**
- **Trace before you act** — find every definition and usage before modifying a symbol.
- **Zero tolerance for regression** — never change behavior as a side effect of a refactor.

---

## Hard Rules (full details in `AGENTS.md`)

### Locators
- Priority: **`getByTestId`** → role/text → scoped CSS → `.or()` fallback chain.
- Every locator scoped to a Page Object root, **never** raw `page.locator(...)` in tests.
- **No XPath. No `nth(n)` magic numbers.**

### Page Objects & Design Patterns
- Page Object Model for every page/widget; reusable widgets extend `ElementContainer<T>`.
- Cross-page workflows use the **Controller pattern**.
- **Max 300 lines per PO**; methods **≤ 20 lines**, **≤ 4 parameters**.
- No business logic and no assertions in POs — tests own assertions.
- Introduce Factory/Strategy/Builder only when **≥3 implementations** exist (KISS/YAGNI).

### Fixtures (Dependency Injection)
- All POs, Controllers, and Services injected via the fixture chain.
- **Never** `new PageObject(page)` in a test file.

### Tests
- Tags from `TestTags`: scope (`@smoke|@sanity|@regression`) + platform (`@desktop|@mobile`).
- Arrange–Act–Assert structure; one behavior per test; fully independent.
- Every assertion has a **context message**.
- Web-first assertions only; never `locator.isVisible()`.

### Timeouts
- **Forbidden:** `page.waitForTimeout()`. Named timeouts from a `TimeConfig` enum.
- Never wait for `networkidle` or use deprecated APIs.

### Type Safety
- **No `any`.** Use interfaces or generics. `readonly` locators. Strict enums.

### Static Quality Gates (mandatory)
- Code must pass **`npm run typecheck`** (strict `tsc --noEmit`) and **`npm run lint`** (ESLint flat
  config + `eslint-plugin-playwright`) with **zero errors**. `npm run check` runs both; CI enforces them.
- Fix the code, never disable a rule to silence a real violation.

### Secrets
- **Never** commit secrets. Read credentials from environment variables only.

## Agent Team (`.github/agents/`)

**Authoring pipeline** — coordinate the specialists through the **lead** in a gated flow
(plan → generate → heal → verify):

- `playwright-test-lead` — orchestrator; sequences the team and enforces the gates.
- `playwright-test-planner` — produces a plan under `specs/`.
- `playwright-test-generator` — implements the plan into `tests/`.
- `playwright-test-healer` — fixes failing tests without weakening assertions.

**Review & delivery** — end-of-dev review, git, and PR handling (all gated on your approval):

- `code-reviewer` — local end-of-dev review against `AGENTS.md`; discusses **everything**
  (what to fix, what to leave) before any change. Never edits or commits.
- `git-workflow` — update master, rebase, resolve conflicts, Conventional-Commit, squash, push,
  open PR. Confirms before any action in your name.
- `pr-reviewer` — checks out your/others' PRs, reviews to standard, judges incoming comments,
  fixes valid ones (own PR only). Posts inline comments via `gh` **only after your explicit approval**.

**Planning intake** — connect a ticket tracker to the delivery flow:

- `jira-workflow` — reads tasks from tracked stories, plans via the planner, splits into sub-tasks
  when PR size requires, posts status comments, and moves items on the board (Open → In Progress →
  Code Review). **Never writes, comments, or transitions without your explicit approval.**
  MCP-first (Atlassian MCP), REST-fallback (env vars only).

Agents are loosely coupled: they hand off via **artifacts** (plan file, test files, diffs/PRs), and
work is Done only when `npm run check` and the test run are green.

---

**Reminder:** This file is an index. The authoritative rules live in
[`AGENTS.md`](../AGENTS.md). Always consult it before producing code or plans.
