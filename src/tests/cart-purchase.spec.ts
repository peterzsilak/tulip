import { expect } from '@playwright/test';

import { loadCredential } from '@/config/env-loader';
import { test } from '@/fixture/page-init.fixture';

const CHECKOUT_INFO = { firstName: 'John', lastName: 'Doe', postalCode: '12345' };

test.describe('A user can', () => {
  test.beforeEach(async ({ page, loginPage }) => {
    await page.goto('/');
    await loginPage.authenticate(loadCredential());
  });

  test('add a few items to their cart and successfully purchase them', async ({
    inventoryPage,
    headerPage,
    cartPage,
    checkoutPage,
    checkoutSummaryPage,
    checkoutCompletePage,
  }) => {
    // Arrange
    const backpack = inventoryPage.getItemByName('Sauce Labs Backpack');
    const bikeLight = inventoryPage.getItemByName('Sauce Labs Bike Light');

    // Act - add items
    await backpack.addToCart();
    await bikeLight.addToCart();

    // Assert - badge reflects 2 items
    await expect(headerPage.cartBadge, 'Cart badge should show 2 items').toHaveText('2');

    // Act - checkout flow
    await headerPage.cartButton.click();
    await cartPage.checkout();
    await checkoutPage.fillInfo(CHECKOUT_INFO);
    await checkoutPage.continue();
    await checkoutSummaryPage.finish();

    // Assert
    await expect(
      checkoutCompletePage.header,
      'Order confirmation header should be visible',
    ).toHaveText('Thank you for your order!');
  });
});
