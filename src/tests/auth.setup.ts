import { expect } from '@playwright/test';

import { loadCredential } from '@/config/env-loader';
import { test } from '@/fixture/page-init.fixture';

test.describe('A user can', () => {
  test('authenticate', async ({ page, loginPage, inventoryPage }) => {
    await page.goto('/');
    await loginPage.authenticate(loadCredential());
    await expect(
      inventoryPage.items.root,
      'Inventory should show items after login',
    ).not.toHaveCount(0);
  });
});
