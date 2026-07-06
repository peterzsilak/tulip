import { Locator, Page } from '@playwright/test';

import { InventoryItem } from '@/page-objects/element-containers/inventory-item';

export class InventoryPage {
  readonly items: InventoryItem;
  private readonly list: Locator;

  constructor(page: Page) {
    const container = page.getByTestId('inventory-container');
    this.list = container.getByTestId('inventory-list');
    this.items = new InventoryItem(this.list.getByTestId('inventory-item'));
  }

  getItemByName(name: string): InventoryItem {
    return this.items.filter({
      has: this.list.getByTestId('inventory-item-name').getByText(name, { exact: true }),
    });
  }

  async getItemNames(): Promise<string[]> {
    const all = await this.items.all();
    return Promise.all(all.map((item) => item.getName()));
  }

  async getItemPrices(): Promise<number[]> {
    const all = await this.items.all();
    const prices = await Promise.all(all.map((item) => item.getPrice()));
    return prices.map((price) => parseFloat(price.replace('$', '')));
  }
}
