# Tulip

Playwright test automation framework for Sauce Demo, built with strict TypeScript, ESLint, and Page Object Model patterns.

## Installation

```bash
git clone <repository-url>
cd tulip
npm install
cp .env.example .env
```

Update `.env` with the test credentials:

```env
TEST_USERNAME=standard_user
TEST_PASSWORD=secret_sauce
```

## Usage

Run the static quality gates:

```bash
npm run check
```

Run the Playwright tests:

```bash
npm test
```

Run a single browser:

```bash
npx playwright test --project=desktop-chromium
```

Open the HTML report:

```bash
npm run show-report
```

## Architecture

The framework uses fixture-based dependency injection with Page Objects.
`page-init.fixture.ts` provides reusable page instances, while
`authenticated.fixture.ts` adds automatic login/logout for authenticated flows.
Tests stay focused on business assertions, and UI interaction details live in
Page Objects and reusable element containers.

```mermaid
classDiagram
  class PlaywrightTest {
    +spec files
  }

  class AuthenticatedFixture {
    +auto login/logout
  }

  class PageInitFixture {
    +loginPage
    +inventoryPage
    +cartPage
    +checkoutPage
    +checkoutSummaryPage
    +checkoutCompletePage
  }

  class PageObject {
    +actions()
    +locators
  }

  class ElementContainer {
    +filter()
    +count()
    +all()
  }

  PlaywrightTest --> AuthenticatedFixture : uses
  AuthenticatedFixture --> PageInitFixture : extends
  PageInitFixture --> PageObject : injects
  PageObject --> ElementContainer : composes
```

## Project structure

```text
src/
├── config/                  # Enums, credentials, env loader, shared config
├── fixture/                 # Playwright fixtures and dependency injection
├── services/                # API/state services for setup and assertions
├── page-objects/            # Page Objects and element containers
│   └── element-containers/  # Reusable widget containers
└── tests/                   # Playwright specs and setup tests
.github/                     # Workflows, instructions, and local agent assets
playwright.config.ts         # Playwright runner configuration
eslint.config.mjs            # ESLint flat config
tsconfig.json                # Strict TypeScript configuration
.env.example                 # Environment template
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run typecheck` | TypeScript strict type check |
| `npm run lint` | ESLint validation |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run check` | Typecheck + lint |
| `npm run pretest` | Enforce `check` before test execution |
| `npm run check:all` | Typecheck + lint + Playwright tests |
| `npm run ci` | Full local CI gate (`check:all`) |
| `npm test` | Run Playwright tests |
| `npm run show-report` | Open Playwright HTML report |

## Engineering governance docs

The repository uses a split single-source-of-truth model:

- `CODING_STANDARDS.md` — coding/test automation standards (TypeScript + Playwright)
- `AGENTS.md` — workflow/process/approval policy
- `PROJECT.md` — project-specific values (paths, commands, branch defaults)
- `.github/agents/AGENT_SHARED_CONTRACT.md` — shared agent contract and load order

## Agent system

Project agents are defined in `.github/agents/*.agent.md` and reusable skills in
`.github/skills/*/SKILL.md`.

- Agents orchestrate planning, generation, healing, review, git/PR flow, and tracker workflow.
- Skills provide focused implementation playbooks (locators, assertions, fixtures, POs, etc.).

## Playwright MCP (required for local diagnostics)

For MCP-required scenarios (defined in `AGENTS.md`), local agent runs should use Playwright MCP and
produce the MCP evidence template from `PROJECT.md`.

Install prerequisites:

```bash
npm install
npx playwright install
```

Playwright MCP server command:

```bash
npx @playwright/mcp@latest
```

Project-level MCP config (checked in):

- `.mcp.json` (single source of truth)

### VS Code setup

1. Use an MCP-capable Copilot/agent extension build.
2. Load/import the project-level `.mcp.json` in your MCP settings (workspace scope).
3. Reload VS Code and run an agent task that calls Playwright tools (for example snapshot/navigate).

### WebStorm setup

1. Open **Settings** → **Tools** → **AI Assistant / MCP** (name may vary by version).
2. Load/import the project-level `.mcp.json`.
3. Save, restart the IDE if needed, then run an agent task that uses Playwright tools.

### CI note

CI does not need to start an MCP server. For MCP-required scenarios, CI uses artifact-based
equivalent evidence (`test-results/junit.xml`, `playwright-report/`, retry traces), as defined in
`PROJECT.md`.

## Notes

- Use absolute imports with the `@/` alias.
- Store sensitive user data in `.env` and never commit it.
- Use `.env.example` as the template for required variables.
- Follow the repository coding standards in `CODING_STANDARDS.md`.
- Keep project-specific agent settings (paths, commands, branches) in `PROJECT.md`.
