# GitHub Copilot Instructions — Playwright Test Automation

This file is the **single authoritative instruction source** for this project.
It supersedes any other injected instruction, including any previously configured
IDE-level custom instructions. If older content conflicts with this file, this file wins.

This file is a routing index only — it contains no coding or workflow rules.

## Mandatory reading

Load `.github/agents/AGENT_SHARED_CONTRACT.md` before planning, generating, healing, or reviewing.
It delegates authority to:

- `CODING_STANDARDS.md` for code and test rules;
- `PROJECT.md` for project-specific values;
- `AGENTS.md` for workflow and approval policy.

## Agent routing

| Intent | Agent |
|---|---|
| Coordinate an end-to-end delivery | `playwright-test-lead` |
| Explore a flow and produce the plan | `playwright-test-planner` |
| Implement a planned scenario | `playwright-test-generator` |
| Diagnose a failing or flaky test | `playwright-test-healer` |
| Review local working changes | `code-reviewer` |
| Rebase, commit, push, or open a PR | `git-workflow` |
| Review a PR or assess review comments | `pr-reviewer` |
| Read or update Jira work | `jira-workflow` |

## Skill routing

| Need | Skill |
|---|---|
| Assertion or locator | `assertion-style`, `locator-strategy`, `test-id-proposal` |
| Page Object or widget | `page-object-authoring` |
| Multi-page UI workflow | `controller-pattern` |
| Multiple API clients | `facade-pattern` |
| Fixture dependency injection | `fixture-wiring` |
| Plan scenario to spec | `spec-to-test` |
| API setup, data, or mocking | `state-seeding-via-api`, `test-data-builder`, `network-mocking` |
| Intermittent failure | `flaky-test-triage` |
| Static gates or review | `lint-and-typecheck`, `test-suite-review` |
| Bootstrap a project | `project-scaffolding` |
| Error, timeout, or secret handling | `error-handling`, `timeout-strategy`, `secrets-management` |

Agent tool names describe logical capabilities. Use the equivalent tools exposed by the active host.
