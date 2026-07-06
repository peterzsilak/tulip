import { expect } from '@playwright/test';

import { loadCredential } from '@/config/env-loader';
import { ProductSort } from '@/config/product-sort';
import { test } from '@/fixture/page-init.fixture';

test.describe('A user can sort inventory items', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.authenticate(loadCredential());
  });

  test('sort items A to Z', async ({ inventoryPage, headerPage }) => {
    await headerPage.sortProducts(ProductSort.NAME_ASC);

    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort((a, b) => a.localeCompare(b));

    expect(names, 'Items should be sorted alphabetically A to Z').toEqual(sorted);
  });

  test('sort items Z to A', async ({ inventoryPage, headerPage }) => {
    await headerPage.sortProducts(ProductSort.NAME_DESC);

    const names = await inventoryPage.getItemNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));

    expect(names, 'Items should be sorted alphabetically Z to A').toEqual(sorted);
  });

  test('sort items by price low to high', async ({ inventoryPage, headerPage }) => {
    await headerPage.sortProducts(ProductSort.PRICE_ASC);

    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices, 'Items should be sorted by price low to high').toEqual(sorted);
  });

  test('sort items by price high to low', async ({ inventoryPage, headerPage }) => {
    await headerPage.sortProducts(ProductSort.PRICE_DESC);

    const prices = await inventoryPage.getItemPrices();
    const sorted = [...prices].sort((a, b) => b - a);

    expect(prices, 'Items should be sorted by price high to low').toEqual(sorted);
  });
});
