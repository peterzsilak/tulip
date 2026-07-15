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
- Fixtures directory: `src/fixture/`
- Config directory: `src/config/`
- Utils directory: `src/utils/`

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

## MCP Runtime Setup (Local)

- MCP server package: `@playwright/mcp`
- Recommended command: `npx @playwright/mcp@latest`
- MCP-required scenarios are defined in `AGENTS.md`.

## MCP Evidence Contract

Use this evidence block format when `AGENTS.md` marks MCP usage as required:

- Reproduction steps
- Locator/accessibility snapshot findings
- Relevant network/console observations
- Decision/fix derived from the evidence

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
