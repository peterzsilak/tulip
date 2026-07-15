# PROJECT.md — Project-Specific Profile

This file contains **project-dependent values** used by agent instructions.
When starting a new project, update this file first.

## Identity

- Project name: `tulip`
- Repository root: `.`

## Paths

- Plan file: `test-plan.md`
- Tests directory: `src/tests/`
- Page Objects directory: `src/page-objects/`
- Element containers directory: `src/page-objects/element-containers/`
- Controllers directory: `src/page-objects/controllers/`
- Fixtures directory: `src/fixture/`
- Services directory: `src/services/`
- API clients directory: `src/services/clients/`
- Config directory: `src/config/`
- Test data directory: `src/config/test-data/`
- Utils directory: `src/utils/`
- Agent artifacts directory: `.agent-artifacts/` (local, ignored, never a source dependency)

## Locator/Test ID Source of Truth

- Canonical test-id attribute source of truth: `playwright.config.ts` → `use.testIdAttribute`
- Current configured attribute: `data-test`

## Quality and Test Commands

- Typecheck command: `npm run typecheck`
- Lint command: `npm run lint`
- Quality gates command: `npm run check`
- Test command: `npm test`
- Full local CI command: `npm run ci`

## Git / PR Defaults

- Default base branch: `master`
- Feature branch naming:
  - `test/<feature-kebab>`
  - `test/<ticket-id>-<feature-kebab>`
- PR base branch: `master`
- Rebase target branch: `origin/master`

## Runtime / CI

- Workflow file: `.github/workflows/playwright.yml`
- CI runs static gates + Playwright tests.
- Application URL environment variable: `BASE_URL`
- Default application URL: `https://www.saucedemo.com/`
- Local Playwright workers: `6`
- CI Playwright workers: `2`
- Maximum parallel writing agents: `3`
- Maximum healer attempts per hypothesis: `3`
- Flaky-test stability repetitions: `20`

## MCP Runtime Setup (Local)

- MCP server package: `@playwright/mcp`
- Runtime command: `npm run mcp:playwright`
- MCP-required scenarios are defined in `AGENTS.md`.

### Tracker integration

- Preferred provider: host-managed Atlassian tools (`atlassian/*`) when available.
- Optional provider: an organization-approved Jira MCP server configured by the host.
- Fallback provider: Jira REST API using the tracker environment variables below.
- Do not install an unmaintained or vulnerable tracker MCP package to make the fallback work.

## MCP Evidence Contract

Use this concrete template when `AGENTS.md` marks MCP usage as required:

```md
### MCP Evidence

1. Reproduction steps
- <exact steps, environment, and project>

2. Locator/accessibility snapshot findings
- <snapshot path or copied ARIA findings>

3. Relevant network/console observations
- <request/response IDs, status, console errors or "none">

4. Decision/fix derived from the evidence
- <what changed and why this evidence justifies it>
```

## CI Evidence Equivalence (No MCP Server Required)

In CI, accept artifact-based evidence for MCP-required scenarios:

- JUnit results: `test-results/junit.xml`
- Playwright HTML report: `playwright-report/`
- Retry trace files captured by Playwright (`trace: on-first-retry`)

## Required Environment Variables

- Test credentials:
  - `TEST_USERNAME`
  - `TEST_PASSWORD`
- Tracker REST fallback:
  - `TRACKER_BASE_URL`
  - `TRACKER_EMAIL`
  - `TRACKER_API_TOKEN`

## Agent runtime compatibility

- Models in `.github/agents/*.agent.md` are preferred defaults, not project policy.
- If a named model or logical tool is unavailable, use the closest host-supported equivalent without
  weakening role boundaries or gates.
- Logical tools such as `search`, `edit`, `runCommands`, `playwright-test/*`, and `atlassian/*` map to
  the capabilities provided by the current host.

## Git identity

- Required human author email: `peter.zsilak@gmail.com`
- Automation and AI tools are not authors or co-authors.
