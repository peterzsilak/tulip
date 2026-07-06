import { Locator, Page } from '@playwright/test';

import { ProductSort } from '@/config/product-sort';

export class HeaderPage {
  private readonly headerContainer: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;
  private readonly productSortContainer: Locator;

  constructor(page: Page) {
    this.headerContainer = page.getByTestId('header-container');
    this.cartButton = this.headerContainer.getByTestId('shopping-cart-link');
    this.cartBadge = this.headerContainer.getByTestId('shopping-cart-badge');
    this.productSortContainer = page.getByTestId('product-sort-container');
  }

  async sortProducts(sort: ProductSort): Promise<void> {
    await this.productSortContainer.selectOption(sort);
  }
}
