---
name: controller-pattern
description: Use for flows and interactions that span across pages — composing several Page Objects into one multi-step workflow. Injected via fixtures (never instantiated in a test). Single-page interactions stay in the Page Object.
---

# Controller Pattern

Apply [`AGENT_SHARED_CONTRACT.md`](../../agents/AGENT_SHARED_CONTRACT.md) and use
`CODING_STANDARDS.md` for the controller rules.

Use a Controller only for flows that span multiple pages; one page still belongs in its Page Object.

> The Controller is the **Facade over UI Page Objects**. For a Facade over **API clients/services**,
> use the `facade-pattern` skill instead.

## Steps
1. Create the controller under the page-object controller path from `PROJECT.md`.
2. Inject the Page Objects it orchestrates through the constructor.
3. Expose one method per business workflow.
4. Keep locators and assertions out of the controller.
5. Register it in the fixture chain; never instantiate it in a test.
