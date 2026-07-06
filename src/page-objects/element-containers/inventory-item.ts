import { Locator } from '@playwright/test';

import { ElementContainer } from '@/page-objects/element-containers/element-container';

export class InventoryItem extends ElementContainer<InventoryItem> {
  readonly image: Locator;
  readonly name: Locator;
  readonly description: Locator;
  readonly price: Locator;
  readonly actionButton: Locator;

  constructor(root: Locator) {
    super(root);
    this.image = this.root.locator('[data-test$="-img"]');
    this.name = this.root.getByTestId('inventory-item-name');
    this.description = this.root.getByTestId('inventory-item-desc');
    this.price = this.root.getByTestId('inventory-item-price');
    this.actionButton = this.root.getByRole('button');
  }

  async addToCart(): Promise<void> {
    await this.actionButton.click();
  }

  async getName(): Promise<string> {
    return this.name.innerText();
  }

  async getPrice(): Promise<string> {
    return this.price.innerText();
  }

  async isInCart(): Promise<boolean> {
    return (await this.actionButton.getAttribute('id'))?.startsWith('remove') ?? false;
  }
}
