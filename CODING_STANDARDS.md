# CODING_STANDARDS.md

## Purpose and Scope

This document defines the project's TypeScript + Playwright automation standards at a Senior Automation Engineer quality bar.  
All new or modified test code must follow these rules.

## Core Principles

- **Readability first:** code should be easy to understand on first read.
- **Reliability over speed:** stable, deterministic tests matter more than short runtime.
- **Single responsibility:** each class and method should do one job.
- **Test behavior, not implementation:** validate business behavior, not internal technical details.
- **No flaky tolerance:** unstable tests are not considered done.

## TypeScript Standards

### Mandatory Compiler Safety

- `strict: true` is required.
- `noImplicitAny`, `strictNullChecks`, `noUncheckedIndexedAccess`, and `exactOptionalPropertyTypes` are required.
- No `any`; use precise types, interfaces, or generics instead.

### Type and API Design

- Public boundaries (POs, services, fixtures) must always use explicit input/output types.
- Prefer `type`/`interface` contracts over implicit "shape by usage."
- Use `readonly` for fields that should not change after construction (for example locators and config values).
- Use enums or `as const` patterns for fixed string literal sets.

### Code Structure and Cleanliness

- Method size: generally max 20 lines.
- Parameter count: max 4; use an options object above that.
- Avoid flag arguments (`doX(true)`); prefer separate intention-revealing methods.
- Avoid duplicated logic; extract shared helpers/services.
- Comments are allowed only when they explain **why** (not what).

### Error Handling

- Do not swallow errors silently.
- No broad, empty `catch` blocks.
- Re-throw errors with context so failures are diagnosable.

## Playwright Standards

### Locator Strategy (Priority Order)

1. `getByTestId`
2. `getByRole`, `getByLabel`, `getByPlaceholder`, stable text
3. Narrowly scoped CSS locator (last resort)

Forbidden:

- XPath
- Magic index-based `nth()` usage without strong justification
- Raw locator usage in spec files when it belongs in a Page Object

### Page Object Model

- Keep all UI interactions inside Page Object(s).
- Spec files should express business intent, not low-level click sequences.
- Page Objects **must not** contain assertions; assertions belong in tests.
- Use the Controller pattern for cross-page workflows.

### Fixture-based Dependency Injection

- Tests must not instantiate Page Objects directly (`new ...` in specs is forbidden).
- Inject Page Objects/services through the fixture chain.
- Keep dependencies explicit and declared.

### Assertion Standards

- Web-first assertions are mandatory (`toBeVisible`, `toHaveText`, `toHaveURL`, `toHaveCount`, etc.).
- Avoid patterns like `expect(await locator.isVisible()).toBe(true)`.
- Every important assertion should include a short, business-context message.
- Use `expect.soft` deliberately for independent checks.

### Waiting and Timing

- `page.waitForTimeout()` is forbidden.
- Use state-based waiting (`expect`/`waitFor`) instead of fixed sleeps.
- Keep timeouts in centralized config (enum/constant), never magic numbers.
- Avoid `networkidle`-based waiting.

### Test Design Principles

- Use AAA structure (Arrange–Act–Assert) in every test.
- One test should validate one business behavior.
- Tests must be independent and order-agnostic.
- Prefer API/state seeding for setup over slow UI-only setup flows.
- Mandatory tagging: scope (smoke/sanity/regression) + platform (desktop/mobile).

### Network and Test Data

- Prefer controlled mocking/stubbing for external dependencies.
- Use builder patterns or dedicated factories for test data.
- Avoid hardcoded environment-specific values in spec files.

## Quality Gates (Mandatory)

- `npm run typecheck` passes with zero errors.
- `npm run lint` passes with zero errors.
- `npm run check` (typecheck + lint) is green.
- Run Playwright tests at least for the affected area, then full suite as needed.

### Hard Enforcement

- `npm test` is protected by `pretest`, so static gates (`npm run check`) must pass before test execution.
- `npm run ci` runs the full enforcement chain (`check:all` = `check` + `test`).
- CI executes static quality gates in a dedicated job before Playwright tests and blocks on any failure.

## Flaky Test Handling

- Do not accept "retry-only" fixes for flaky tests.
- Root cause analysis is mandatory: race conditions, unstable locators, state pollution, premature assertions.
- Re-run to confirm stability after the fix.

## Naming Conventions

- File names: `kebab-case`
- Classes/types: `PascalCase`
- Functions/variables: `camelCase`
- Tests: `feature-name.spec.ts`
- Page Objects: `feature-name.po.ts`
- Controllers: `feature-name.controller.ts`

## Security and Compliance

- Read secrets/credentials from environment variables only (`.env`), never hardcode them.
- Do not commit tokens, passwords, or personal data to the repository.
- Test reports and logs must not expose sensitive data.

## Code Review Minimum Checklist

- The change is clear, focused, and readable.
- No unnecessary abstraction and no duplication.
- Locators are stable and maintainable.
- Assertions validate business value, not implementation details.
- Quality gates are fully satisfied.
