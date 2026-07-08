import { expect } from '@playwright/test';

import { checkoutInfo } from '@/config/checkout-info';
import { testTags } from '@/config/test-tags';
import { test } from '@/fixture/authenticated.fixture';
import { produtcs } from "@/config/produtcs";

test.describe('A user can', () => {

  test(
    'add a few items to their cart and successfully purchase them',
    { tag: [testTags.regression, testTags.desktop, testTags.mobile] },
    async ({
      inventoryPage,
      headerPage,
      cartPage,
      checkoutPage,
      checkoutSummaryPage,
      checkoutCompletePage,
    }) => {
      // 1. Arrange
      const backpack = inventoryPage.getItemByName(produtcs.backpack.name);
      const bikeLight = inventoryPage.getItemByName(produtcs.bikeLight.name);
      const expectedSubtotal = await inventoryPage.getCombinedPriceOf([backpack, bikeLight]);

      // 2. Act - add items
      await backpack.addToCart();
      await bikeLight.addToCart();

      // Assert - badge reflects 2 items
      await expect( headerPage.cartBadge ).toHaveText('2');
      await headerPage.cartButton.click();

      await expect( cartPage.getItemByName(produtcs.backpack.name).locator ).toBeVisible();
      await expect( cartPage.getItemByName(produtcs.bikeLight.name).locator ).toBeVisible();
      await cartPage.checkout();

      await checkoutPage.fillInfo(checkoutInfo);
      await checkoutPage.continue();

      await checkoutSummaryPage.verifyOrderDetails({
        items: [produtcs.backpack.name, produtcs.bikeLight.name],
        paymentMethod: 'SauceCard #31337',
        shippingMethod: 'Free Pony Express Delivery!',
        expectedSubtotal,
      });
      await checkoutSummaryPage.finish();

      // 3. Assert
      await expect(checkoutCompletePage.header).toHaveText('Thank you for your order!');
      await checkoutCompletePage.backToProducts();
    },
  );
});
