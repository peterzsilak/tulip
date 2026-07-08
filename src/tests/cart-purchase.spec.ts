import { expect } from '@playwright/test';

import { checkoutInfo } from '@/config/checkout-info';
import { testTags } from '@/config/test-tags';
import { test } from '@/fixture/authenticated.fixture';
import { parseCurrencyAmount } from '@/utils/currency';

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
      // Arrange
      const backpackName = 'Sauce Labs Backpack';
      const bikeLightName = 'Sauce Labs Bike Light';
      const backpack = inventoryPage.getItemByName(backpackName);
      const bikeLight = inventoryPage.getItemByName(bikeLightName);
      const backpackPrice = parseCurrencyAmount(
        await backpack.getPrice(),
        'Backpack price on inventory page',
      );
      const bikeLightPrice = parseCurrencyAmount(
        await bikeLight.getPrice(),
        'Bike light price on inventory page',
      );
      const expectedSubtotal = backpackPrice + bikeLightPrice;

      // Act - add items
      await backpack.addToCart();
      await bikeLight.addToCart();

      // Assert - badge reflects 2 items
      await expect(headerPage.cartBadge, 'Cart badge should show 2 items').toHaveText('2');

      // Act - checkout flow
      await headerPage.cartButton.click();

      expect(
        await cartPage.getItemByName(backpackName).count(),
        'Cart should contain exactly one backpack.',
      ).toBe(1);
      expect(
        await cartPage.getItemByName(bikeLightName).count(),
        'Cart should contain exactly one bike light.',
      ).toBe(1);
      await cartPage.checkout();
      await checkoutPage.fillInfo(checkoutInfo);
      await checkoutPage.continue();

      expect(
        await checkoutSummaryPage.getItemByName(backpackName).count(),
        'Summary should contain exactly one backpack.',
      ).toBe(1);
      expect(
        await checkoutSummaryPage.getItemByName(bikeLightName).count(),
        'Summary should contain exactly one bike light.',
      ).toBe(1);
      await expect(
        checkoutSummaryPage.paymentInfoValue,
        'Summary payment information should match the selected payment method.',
      ).toHaveText('SauceCard #31337');
      await expect(
        checkoutSummaryPage.shippingInfoValue,
        'Summary shipping information should show the expected delivery method.',
      ).toHaveText('Free Pony Express Delivery!');
      expect(
        parseCurrencyAmount(
          await checkoutSummaryPage.getItemByName(backpackName).getPrice(),
          'Backpack price on summary page',
        ),
        'Backpack price on summary page should match inventory price.',
      ).toBeCloseTo(backpackPrice, 2);
      expect(
        parseCurrencyAmount(
          await checkoutSummaryPage.getItemByName(bikeLightName).getPrice(),
          'Bike light price on summary page',
        ),
        'Bike light price on summary page should match inventory price.',
      ).toBeCloseTo(bikeLightPrice, 2);

      const subtotal = parseCurrencyAmount(
        await checkoutSummaryPage.getSubtotal(),
        'Summary subtotal label',
      );
      const tax = parseCurrencyAmount(await checkoutSummaryPage.getTax(), 'Summary tax label');
      const total = parseCurrencyAmount(await checkoutSummaryPage.getTotal(), 'Summary total label');

      expect(
        subtotal,
        'Summary subtotal should equal the calculated sum of selected item prices.',
      ).toBeCloseTo(expectedSubtotal, 2);
      expect(total, 'Summary total should equal subtotal plus tax.').toBeCloseTo(subtotal + tax, 2);
      await checkoutSummaryPage.finish();

      // Assert
      await expect(
        checkoutCompletePage.header,
        'Order confirmation header should be visible',
      ).toHaveText('Thank you for your order!');

      await checkoutCompletePage.backToProducts();
    },
  );
});
