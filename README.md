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
npx playwright test --project=chromium
```

Open the HTML report:

```bash
npx playwright show-report
```

## Project structure

```text
src/
├── config/                # Enums, credentials, env loader, shared config
├── fixture/               # Playwright fixtures and dependency injection
├── page-objects/          # Page Objects and element containers
│   └── element-containers/# Reusable widget containers
└── tests/                 # Playwright specs and setup tests
.github/                   # Workflows, instructions, and local agent assets
playwright.config.ts       # Playwright runner configuration
eslint.config.mjs          # ESLint flat config
tsconfig.json              # Strict TypeScript configuration
.env.example               # Environment template
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run typecheck` | TypeScript strict type check |
| `npm run lint` | ESLint validation |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run check` | Typecheck + lint |
| `npm test` | Run Playwright tests |

## Notes

- Use absolute imports with the `@/` alias.
- Store sensitive user data in `.env` and never commit it.
- Use `.env.example` as the template for required variables.
- Follow the repository coding standards in `CODING_STANDARDS.md`.
