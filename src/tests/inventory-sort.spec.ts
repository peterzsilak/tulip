import { expect } from '@playwright/test';

import { ProductSort } from '@/config/product-sort';
import { testTags } from '@/config/test-tags';
import { test } from '@/fixture/authenticated.fixture';

test.describe('A user can sort inventory items', () => {
  test(
    'sort items A to Z',
    { tag: [testTags.regression, testTags.desktop, testTags.mobile] },
    async ({ inventoryPage, headerPage }) => {
      await headerPage.sortProducts(ProductSort.NAME_ASC);

      const names = await inventoryPage.getItemNames();
      const sorted = [...names].sort((a, b) => a.localeCompare(b));

      expect(names, 'Items should be sorted alphabetically A to Z').toEqual(sorted);
    },
  );

  test(
    'sort items Z to A',
    { tag: [testTags.regression, testTags.desktop, testTags.mobile] },
    async ({ inventoryPage, headerPage }) => {
      await headerPage.sortProducts(ProductSort.NAME_DESC);

      const names = await inventoryPage.getItemNames();
      const sorted = [...names].sort((a, b) => b.localeCompare(a));

      expect(names, 'Items should be sorted alphabetically Z to A').toEqual(sorted);
    },
  );

  test(
    'sort items by price low to high',
    { tag: [testTags.regression, testTags.desktop, testTags.mobile] },
    async ({ inventoryPage, headerPage }) => {
      await headerPage.sortProducts(ProductSort.PRICE_ASC);

      const prices = await inventoryPage.getItemPrices();
      const sorted = [...prices].sort((a, b) => a - b);

      expect(prices, 'Items should be sorted by price low to high').toEqual(sorted);
    },
  );

  test(
    'sort items by price high to low',
    { tag: [testTags.regression, testTags.desktop, testTags.mobile] },
    async ({ inventoryPage, headerPage }) => {
      await headerPage.sortProducts(ProductSort.PRICE_DESC);

      const prices = await inventoryPage.getItemPrices();
      const sorted = [...prices].sort((a, b) => b - a);

      expect(prices, 'Items should be sorted by price high to low').toEqual(sorted);
    },
  );
});
