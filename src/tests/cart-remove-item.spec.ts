import { expect } from '@playwright/test';

import { test } from '@/fixture/authenticated.fixture';

test.describe('A user can', () => {
  test.beforeEach(async ({ inventoryPage }) => {
    await expect(
      inventoryPage.items.root,
      'Inventory should show items after login',
    ).not.toHaveCount(0);
  });

  test('add 3 items, remove one from the cart and the remaining items and count are correct', async ({
    inventoryPage,
    headerPage,
    cartPage,
  }) => {
    // Arrange - add 3 items
    const backpack = inventoryPage.getItemByName('Sauce Labs Backpack');
    const bikeLight = inventoryPage.getItemByName('Sauce Labs Bike Light');
    const jacket = inventoryPage.getItemByName('Sauce Labs Fleece Jacket');

    await backpack.addToCart();
    await bikeLight.addToCart();
    await jacket.addToCart();

    await expect(headerPage.cartBadge, 'Cart badge should show 3 items').toHaveText('3');

    // Act - navigate to cart and remove one item
    await headerPage.cartButton.click();
    await cartPage.getItemByName('Sauce Labs Backpack').remove();

    // Assert - remaining items and badge count
    await expect(headerPage.cartBadge, 'Cart badge should show 2 items after removal').toHaveText('2');
    await expect(
      cartPage.items.root,
      'Cart should contain exactly 2 items',
    ).toHaveCount(2);
    await expect(
      cartPage.items.filter({ hasText: 'Sauce Labs Bike Light' }).root,
      'Bike Light should still be in the cart',
    ).toBeVisible();
    await expect(
      cartPage.items.filter({ hasText: 'Sauce Labs Fleece Jacket' }).root,
      'Fleece Jacket should still be in the cart',
    ).toBeVisible();
  });
});
