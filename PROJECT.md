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

## Required Environment Variables

- Test credentials:
  - `TEST_USERNAME`
  - `TEST_PASSWORD`
- Tracker REST fallback:
  - `TRACKER_BASE_URL`
  - `TRACKER_EMAIL`
  - `TRACKER_API_TOKEN`
