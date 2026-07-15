import { checkoutInfo } from '@/config/checkout-info';
import { products } from '@/config/products';
import { testTags } from '@/config/test-tags';
import { expect, test } from '@/fixture/authenticated.fixture';

test.describe('A user can', () => {
  test(
    'add a few items to their cart and successfully purchase them',
    { tag: [testTags.regression, testTags.desktop, testTags.mobile] },
    async ({
      inventoryPage,
      headerPage,
      cartPage,
      checkoutInfoPage,
      checkoutSummaryPage,
      checkoutCompletePage,
    }) => {
      const backpack = inventoryPage.getItemByName(products.backpack.name);
      const bikeLight = inventoryPage.getItemByName(products.bikeLight.name);
      const expectedSubtotal = await inventoryPage.getCombinedPriceOf([backpack, bikeLight]);

      await backpack.addToCart();
      await bikeLight.addToCart();

      await expect(
        headerPage.cartBadge,
        'Cart badge should reflect both selected products',
      ).toHaveText('2');
      await headerPage.cartButton.click();

      await expect(
        cartPage.getItemByName(products.backpack.name).root,
        'Backpack should appear exactly once in the cart',
      ).toHaveCount(1);
      await expect(
        cartPage.getItemByName(products.bikeLight.name).root,
        'Bike Light should appear exactly once in the cart',
      ).toHaveCount(1);
      await cartPage.checkout();

      await checkoutInfoPage.fillInfo(checkoutInfo);
      await checkoutInfoPage.continue();

      await expect(
        checkoutSummaryPage.getItemByName(products.backpack.name).root,
        'Backpack should appear exactly once in the order summary',
      ).toHaveCount(1);
      await expect(
        checkoutSummaryPage.getItemByName(products.bikeLight.name).root,
        'Bike Light should appear exactly once in the order summary',
      ).toHaveCount(1);
      await expect(
        checkoutSummaryPage.paymentInfoValue,
        'Payment information should match the checkout details',
      ).toHaveText('SauceCard #31337');
      await expect(
        checkoutSummaryPage.shippingInfoValue,
        'Shipping information should match the checkout details',
      ).toHaveText('Free Pony Express Delivery!');
      await expect(
        checkoutSummaryPage.subtotalLabel,
        'Order subtotal should match the sum of the purchased items',
      ).toHaveText(`Item total: $${expectedSubtotal.toFixed(2)}`);
      await checkoutSummaryPage.finish();

      await expect(
        checkoutCompletePage.header,
        'Order completion header should confirm the purchase',
      ).toHaveText('Thank you for your order!');
      await checkoutCompletePage.backToProducts();
    },
  );
});
