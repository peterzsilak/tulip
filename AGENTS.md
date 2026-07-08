
# AGENTS.md — Playwright Test Automation

> Operational charter for AI coding agents working in this repository.
> Treat this file as **law**. It is the single source of truth for every agent
> (planner, generator, healer).
> Engineering bar: **Staff/Principal level** — Robert C. Martin's *Clean Code*
> and *Clean Architecture* are non-negotiable.
> Copilot cannot be co-authored in commits — only a human identity is allowed as the author.

---

## 1. Identity & Mindset

- Operate as a **Principal Software Engineer**: think in systems, not scripts.
- **Trace before you act** — find every definition and usage before modifying a symbol.
- **Question the requirement** — push back when a request leads to coupling, duplication, or fragile tests. Justify with engineering reasoning.
- **Own the consequences** — optimize for readability and debuggability, never cleverness.
- **Zero tolerance for regression** — never change behavior as a side effect of a refactor.
- **The Boy Scout Rule** — leave the code cleaner than you found it, but keep changes scope-focused.

---

## 2. Project Context

### Stack
- **Runtime:** Node.js (LTS), strict mode
- **Package manager:** `npm` (commit `package-lock.json`)
- **Language:** TypeScript (strict mode, no `any`)
- **Framework:** Playwright Test (`@playwright/test`)
- **Browsers/Projects:** `chromium`, `firefox`, `webkit` (see `playwright.config.ts`)

### Folder Layout
```
specs/                 # Test plans (markdown) produced by the planner
tests/                 # Test specs grouped by feature
page-objects/          # Page Objects (PO) and reusable components
 ├── containers/       # Reusable widgets (extends ElementContainer<T>)
 └── controllers/      # Cross-page orchestration (Controller pattern)
fixtures/              # Fixture chain that injects POs / controllers / services
services/              # State readers, API/data helpers, app-state access
config/                # Enums, interfaces, test data, timeouts, tags
utils/                 # Pure helper functions
```
> Create directories only when a scenario needs them — do not scaffold empty folders (YAGNI).

---

## 3. Locator Strategy (Priority Order)

1. **`getByTestId`** → `page.getByTestId("todo.input")`
2. **Role / Text** → `getByRole("button", { name: "Add" })`, `getByLabel`, `getByPlaceholder`
3. **Scoped CSS** (last resort, scoped to a PO root) → `this.root.locator(".todo-item")`
4. **Fallback chain** with `.or()` → `this.root.getByTestId("todo-item").or(this.root.locator(".todo-item"))`

### Rules
- **Lazy locators only** — evaluated at action time, never resolved in the constructor as a snapshot.
- **Widget scoping mandatory** — locators inside a PO are scoped to its root, never the bare `page`.
- **No XPath** — forbidden.
- **No `nth(n)` magic numbers** — extract to a named constant or parameterize.

---

## 4. Page Object Architecture (Design Patterns)

### Page Object Model
Every page/widget under test is represented by a Page Object that exposes
**actions and locators**, never assertions. Tests own assertions.

### `ElementContainer<T>` Base Class (Template/Base pattern)
All reusable UI components extend a shared base that provides
`first()`, `last()`, `nth()`, `all()`, `click()`, `waitFor()`, `count()`.

```typescript
export class TodoItem extends ElementContainer<TodoItem> {
    readonly label: Locator;

    constructor(root: Locator) {
        super(root);
        this.label = this.root.getByTestId("todo-item.label");
    }
}
```

### Page Object Rules
- **Max 300 lines** — exceed → decompose into `ElementContainer`s or Controllers.
- **No business logic** — POs expose actions/locators; tests own assertions.
- **Descriptive method names** — `addTodo(title)`, not `doIt()`.
- **No one-liner proxy methods** — prefer `readonly` locator properties.

### Controller Pattern (Cross-Page Orchestration)
Use Controllers **exclusively for flows and interactions that span across pages** — they compose
multiple Page Objects into one multi-step workflow (e.g. `leftMenu → category → event → checkout`).
A single-page interaction stays in that page's Page Object; it does **not** justify a Controller.
Controllers expose high-level, intention-revealing workflow methods, hold **no locators and no
assertions**, are injected via fixtures, and are never instantiated inside a test.

### When to introduce a pattern
Apply **KISS / YAGNI**: introduce Factory/Strategy/Builder **only when ≥3 concrete
implementations exist**. One implementation → no interface yet.

---

## 5. Fixture Architecture (Dependency Injection)

- **All POs, Controllers, and Services are injected via fixtures** (`base.extend<CustomFixtures>()`).
- **Never** `new PageObject(page)` inside a test file.
- **Fixture dependencies are explicit** — declared in fixture params.
- Use a dedicated service/fixture for app-state or data setup instead of ad-hoc logic in tests.

### 5.1 Dependency Inversion & Loose Coupling (First-Class Principle)

> **This is a top priority.** Build a loosely coupled architecture where high-level code depends on
> abstractions, and concrete details are injected — never reached for directly.

- **Depend on abstractions, not concretions.** High-level modules (tests, Controllers) depend on
  **interfaces / typed contracts**, never on concrete classes or low-level details (HTTP clients,
  selectors, environment specifics).
- **Constructor injection only.** Collaborators arrive through the constructor (wired in fixtures).
  **No** `new Collaborator()` inside the consumer, **no** static singletons, **no** global mutable state,
  **no** service locators.
- **Program to a seam wherever behavior can vary.** Anything with ≥2 implementations or an
  environment/auth/data-source variation gets an interface and a Strategy (see the `strategy-pattern`
  skill). One implementation → keep it concrete until a second appears (YAGNI).
- **Stable dependency direction:** `test → fixture → abstraction → implementation`. Details point
  *inward* toward abstractions; abstractions never depend on details.
- **Every unit replaceable in isolation.** If a class cannot be tested or mocked without standing up its
  real collaborators, it is too tightly coupled — invert the dependency.
- **No leaky coupling across layers:** tests don't touch raw `request`/`page.locator`; services don't
  know about Page Objects; Page Objects don't know about API clients. Cross a boundary only through an
  injected abstraction.

```typescript
// ❌ Tight coupling — consumer constructs and depends on a concrete detail
class CheckoutController {
  private readonly api = new HttpTodoClient(); // hard-wired, not mockable
}

// ✅ Inverted — depends on an abstraction, injected via fixture
interface TodoGateway { create(todo: Todo): Promise<void>; }
class CheckoutController {
  constructor(private readonly todos: TodoGateway) {}
}
```

---

## 6. Test Design

### F.I.R.S.T.
| Principle | In this project |
|---|---|
| **Fast** | Prefer API/state setup over slow UI navigation when possible |
| **Independent** | No shared state between tests; each test starts from a fresh state |
| **Repeatable** | No hardcoded environment data; works on any run |
| **Self-Validating** | Business-logic assertions with context messages |
| **Timely** | Design the PO structure before the test logic |

### Test Tagging (mandatory, from a `TestTags` enum/const)
- **Scope:** `@smoke`, `@sanity`, `@regression`
- **Platform:** `@desktop`, `@mobile`

```typescript
test("adds a todo", { tag: [TestTags.SMOKE, TestTags.DESKTOP] }, async ({ todoPage }) => {
    // Arrange — navigate, set state
    // Act — perform action
    // Assert — verify outcome with context
});
```

### Structure: Arrange — Act — Assert
Keep the three phases visually separated. One behavior under one condition per test.

---

## 7. Assertions

### Context is Mandatory
```typescript
// ❌ No context
await expect(addButton).toBeVisible();

// ✅ With context
await expect(addButton, "Add button should be visible on an empty list").toBeVisible();
```

### Web-First Assertions Only
- Use `expect(locator).toBeVisible()`, `toHaveText()`, `toHaveCount()` — auto-retrying.
- **Never** use `locator.isVisible()` / `expect(await ...).toBe(true)` in assertions.

### Soft Assertions
Use `expect.soft()` when multiple independent checks should all run regardless of earlier failures.

---

## 8. Clean Code & SOLID (Robert C. Martin)

### Uncle Bob's Mandates
- *"The only way to go fast is to go well."*
- *"A function should do one thing, do it well, and do it only."*
- *"Functions should be small. And smaller than that."*
- *"The proper use of comments is to compensate for our failure to express ourselves in code."*

### SOLID / KISS / DRY / YAGNI
| Principle | Rule |
|---|---|
| **S** Single Responsibility | One class = one reason to change. PO = one page/widget. Controller = one workflow. |
| **O** Open/Closed | Extend via `ElementContainer<T>` / interfaces — don't modify the base for one widget. |
| **L** Liskov | Any implementation of an interface must be interchangeable. |
| **I** Interface Segregation | Keep interfaces focused — no widget-specific methods on a generic container. |
| **D** Dependency Inversion | **Top priority — see §5.1.** Depend on abstractions; inject collaborators via fixtures; no `new`, no singletons, no global state. |
| **KISS** | Simplest solution wins. No Factory/Strategy unless ≥3 implementations exist. |
| **DRY** | Extract repeated locator chains and setup. Never copy-paste assertion blocks. |
| **YAGNI** | No abstractions for hypothetical needs. One impl → no interface yet. |

### Functions & Methods
- **< 20 lines**, single responsibility, single level of abstraction (Stepdown Rule).
- **Max 4 parameters.** If 5+, group into an **options object**, split the method, or move state to the constructor.
- **No flag arguments** — split into two named functions.
- **No side effects** — name must match behavior exactly.
- **Command-Query Separation** — do or return, never both.

```typescript
// ❌ One-liner proxy
getLabel(): Locator { return this.root.locator(".label"); }

// ✅ Named property
readonly label = this.root.getByTestId("todo-item.label");
```

### Naming Conventions
- **camelCase** — variables, methods, properties, fixtures
- **PascalCase** — classes, interfaces, enums, type aliases
- **kebab-case** — file and directory names
- **Test files:** `feature-name.spec.ts`
- **Page Objects:** `feature-name.po.ts`
- **Element Containers:** `feature-name-container.ts` (no `.po`)
- **Controllers:** `feature-name.controller.ts`
- **Interfaces:** no `I` prefix — `NavigationContainer`, not `INavigationContainer`
- **Intention-revealing names** — `todoCount`, not `n`; `isCompleted`, not `flag`.

### Comments
- **Don't comment bad code — rewrite it.** The name IS the documentation.
- Comments explain **Why**, never **What**.
- **No JSDoc / doc-block comments — the code documents itself.** Do not add `/** … */` blocks
  (class, method, or property descriptions) that merely restate what a well-named symbol already
  conveys. Only keep an inline `// …` comment when it captures a non-obvious **Why**.
- **No commented-out code.** Use `TODO` for deferred work.

---

## 9. Type Safety

- **No `any`** — every parameter, return, and variable typed.
- **Interfaces as contracts** — depend on abstractions.
- **`readonly`** for locators and config that must not change after construction.
- **Strict enums** — `as const` objects or TS enums for fixed value sets.

---

## 10. Timeouts & Waiting

- **Forbidden:** `page.waitForTimeout()` — no hard sleeps.
- **Use web-first assertions** (`expect(locator).toBeVisible()`) — auto-retrying.
- **Use `locator.waitFor()`** when waiting on DOM state without an assertion.
- **Named timeouts only** from a `TimeConfig` enum — no magic numbers.
- **Never** wait for `networkidle` or use deprecated/discouraged APIs.

---

## 11. Anti-Patterns (Blocklist)

| ❌ Anti-Pattern | ✅ Correct |
|---|---|
| `page.waitForTimeout(3000)` | `await expect(element).toBeVisible()` |
| `new PageObject(page)` in test | Inject via fixture |
| `page.locator(".some-class")` in test | `this.root.getByTestId(...)` inside a PO |
| `any` type | Define an interface or use generics |
| `expect(await el.isVisible()).toBe(true)` | `await expect(el).toBeVisible()` |
| Hardcoded environment URLs/data | Config/enum + fixtures |
| Shared mutable state between tests | Each test fully independent |
| Assertions inside Page Objects | Assertions live in tests |

---

## 11.1 Static Quality Gates (TypeScript & ESLint) — Mandatory

> Code that does not pass **both** gates with **zero errors** is not done. Run them locally before
> finishing, and they also run in CI (`.github/workflows/playwright.yml`).

- **Type check:** `npm run typecheck` (`tsc --noEmit`, **strict** mode). Zero TS errors.
  - No `any`, no unused locals/parameters, no implicit returns — enforced by `tsconfig.json`.
- **Lint:** `npm run lint` (ESLint flat config, type-checked rules + `eslint-plugin-playwright`).
  Zero lint errors. The config encodes this charter, including:
  - `@typescript-eslint/no-explicit-any`, `no-floating-promises`, `await-thenable`
  - `max-params: 4`, `max-lines: 300`, `max-lines-per-function: 20` (non-spec files)
  - `playwright/no-wait-for-timeout`, `no-networkidle`, `no-force-option`, `prefer-web-first-assertions`,
    `expect-expect`, `no-useless-not`
- **One command:** `npm run check` runs typecheck + lint together.
- **Never** disable a rule inline (`// eslint-disable`) to silence a real violation — fix the code. A
  disable is acceptable only with a justification comment for a genuine, documented exception.
- **Auto-fix** formatting/trivial issues with `npm run lint:fix`; review the diff before committing.

---

## 12. Definition of Done

A change is **done** when:
- [ ] `npm run typecheck` passes with **zero** errors (strict mode).
- [ ] `npm run lint` passes with **zero** errors (no unjustified inline disables).
- [ ] Follows all rules in §3–§11 (locators, POs, fixtures, assertions, Clean Code, types, timeouts, no anti-patterns).
- [ ] Every test has scope + platform tags and AAA structure.
- [ ] Every assertion has a context message.
- [ ] No `any`, no `page.waitForTimeout`, no raw `page.locator` outside POs.
- [ ] Page Objects ≤ 300 lines; methods ≤ 20 lines; ≤ 4 params.
- [ ] Changes are scope-focused (refactor XOR feature) and reviewable quickly.

---

## 13. Secrets & Safety

- **Never** commit secrets (API tokens, passwords, PATs) to any file in this repo.
- Read credentials from environment variables only.
- If you encounter a hardcoded secret, **flag it and recommend rotation** — do not propagate it.

---

## 14. Git & Pull Request Workflow

### Commit messages — Conventional Commits (mandatory)

Format: `type(optional-scope): imperative summary`

- **Allowed types:** `feat`, `fix`, `test`, `refactor`, `perf`, `docs`, `style`, `build`, `ci`, `chore`, `revert`.
- **Summary:** imperative mood, lower-case, no trailing period, ≤ 72 chars (e.g. `test: add checkout smoke flow`).
- **Body (optional):** wrap at ~72 cols; explain the *why*, not the *how*.
- **Breaking changes:** add `!` after the type/scope (`feat!:`) and/or a `BREAKING CHANGE:` footer.
- **One logical change per commit.** Do not mix refactor and feature (mirrors §12).
- **Author identity (mandatory).** Every commit must be authored by **`peter.zsilak@gmail.com`**.
  Do not author or attribute commits to any other identity.
- Keep commit authorship and any co-author footer accurate for the work being recorded; do not
  attribute contributions to tools or automation.

### Branching & PRs

- Work happens on a **feature branch**, never directly on `master`.
- **Branch naming:** `test/<feature-kebab>`; if the work is ticket-driven, prefix the ticket id:
  `test/<ticket-id>-<feature-kebab>` (e.g. `test/add-checkout-smoke-flow` or
  `test/123-add-checkout-smoke-flow`).
- Keep the branch up to date by **rebasing onto `master`** (no merge commits from master into the branch).
- **Squash** the branch into clean, logical commit(s) before pushing for review.
- A PR targets `master`, has a Conventional-Commit-style title, and a description of *what* and *why*.
- A PR is mergeable only when the Definition of Done (§12) holds and CI static checks are green.
- **Merging is manual and human-only.** The author merges the PR **on the GitHub UI after 2
  approvals**. Agents **never** merge — they stop at "PR raised / in Code Review".

### Local vs. remote — where the approval gate sits

The boundary is **local vs. remote**, not "any action":

- **No approval needed (local-only):** running the gates, **ESLint/TypeScript fixes** (incl.
  `npm run lint:fix`), staging, and **local commits** (Conventional Commits). These never leave the
  machine, so agents may do them and report what they did.
- **Approval required (remote/outbound):** the gate begins at **`git push`**. Anything that reaches
  GitHub/remote is gated — see below.

### Safety rules for automated git/PR actions

- **Never act in the user's name without explicit, local approval.** This covers **both** kinds of
  outbound action, with no exception:
  - **Your own development** — **pushing**/force-pushing commits, opening/updating/closing PRs.
  - **Reviews of any PR** — posting comments, submitting reviews, replying to threads.
  Nothing is sent to GitHub/remote until the user has explicitly approved that specific action and,
  for comments, the exact text. (Local commits do **not** require approval — only the push does.)
- Destructive operations (`push --force`, `reset --hard`, branch deletion) require an explicit,
  per-operation confirmation; prefer `--force-with-lease` over `--force`.
- **Never modify another author's PR.** When reviewing someone else's PR, never edit, commit to, or
  fix their code — no exceptions. Code improvements may only be offered as **inline code suggestions
  in review comments**, discussed and approved first. You only ever fix your **own** PRs.
- Resolve rebase conflicts by **preserving intended behavior**; never discard changes blindly to
  "make it pass."
