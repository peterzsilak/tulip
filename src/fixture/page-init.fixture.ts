import { test as base } from '@playwright/test';

import { CartPage } from '@/page-objects/cart-page';
import { CheckoutCompletePage } from '@/page-objects/checkout-complete-page';
import { CheckoutPage } from '@/page-objects/chekout-page';
import { CheckoutSummaryPage } from '@/page-objects/checkout-summary-page';
import { FooterPage } from '@/page-objects/footer-page';
import { HeaderPage } from '@/page-objects/header-page';
import { InventoryPage } from '@/page-objects/inventory-page';
import { LeftMenuPage } from '@/page-objects/left-menu-page';
import { LoginPage } from '@/page-objects/login-page';

interface CustomFixtures {
  loginPage: LoginPage;
  headerPage: HeaderPage;
  leftMenuPage: LeftMenuPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  checkoutSummaryPage: CheckoutSummaryPage;
  checkoutCompletePage: CheckoutCompletePage;
  footerPage: FooterPage;
}

export const test = base.extend<CustomFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },
  leftMenuPage: async ({ page }, use) => {
    await use(new LeftMenuPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  checkoutSummaryPage: async ({ page }, use) => {
    await use(new CheckoutSummaryPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  footerPage: async ({ page }, use) => {
    await use(new FooterPage(page));
  },
});
