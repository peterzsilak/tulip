---
name: controller-pattern
description: Use for flows and interactions that span across pages — composing several Page Objects into one multi-step workflow. Injected via fixtures (never instantiated in a test). Single-page interactions stay in the Page Object.
---

# Controller Pattern

Follow [`AGENTS.md`](../../../AGENTS.md) §4–§5. Use a Controller **only for flows/interactions that span
across pages** (KISS/YAGNI). An interaction confined to one page belongs in that page's Page Object —
it does **not** justify a Controller.

> The Controller is the **Facade over UI Page Objects**. For a Facade over **API clients/services**,
> use the `facade-pattern` skill instead.

## Steps
1. Create `page-objects/controllers/<workflow>.controller.ts` (kebab-case).
2. The constructor receives the Page Objects it orchestrates (injected, not constructed).
3. Expose **one method per business workflow** with an intention-revealing name; each method is a
   high-level narrative that delegates to PO actions (Stepdown Rule, single level of abstraction).
4. **No assertions and no locators** in a Controller — it only orchestrates PO actions.
5. Register the Controller in the fixture chain (see the `fixture-wiring` skill). Never
   `new SomeController(...)` inside a test.

## Example shape
```ts
export class CheckoutController {
  constructor(
    private readonly cart: CartPage,
    private readonly shipping: ShippingPage,
    private readonly payment: PaymentPage,
  ) {}

  async placeOrder(item: string): Promise<void> {
    await this.cart.add(item);
    await this.shipping.useDefaultAddress();
    await this.payment.payWithSavedCard();
  }
}
```

## Checklist
- [ ] Composes ≥2 Page Objects for a real workflow (else use a PO)
- [ ] POs injected, not constructed; no locators/assertions inside
- [ ] Registered as a fixture; never instantiated in a test
