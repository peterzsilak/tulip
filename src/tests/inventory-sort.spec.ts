import { ProductSort } from '@/config/product-sort';
import { testTags } from '@/config/test-tags';
import { expect, test } from '@/fixture/authenticated.fixture';

interface SortCase {
  readonly title: string;
  readonly sort: ProductSort;
  readonly type: 'name' | 'price';
  readonly assertionMessage: string;
}

const sortCases: readonly SortCase[] = [
  {
    title: 'sort items A to Z',
    sort: ProductSort.NAME_ASC,
    type: 'name',
    assertionMessage: 'Items should be sorted alphabetically A to Z',
  },
  {
    title: 'sort items Z to A',
    sort: ProductSort.NAME_DESC,
    type: 'name',
    assertionMessage: 'Items should be sorted alphabetically Z to A',
  },
  {
    title: 'sort items by price low to high',
    sort: ProductSort.PRICE_ASC,
    type: 'price',
    assertionMessage: 'Items should be sorted by price low to high',
  },
  {
    title: 'sort items by price high to low',
    sort: ProductSort.PRICE_DESC,
    type: 'price',
    assertionMessage: 'Items should be sorted by price high to low',
  },
];

test.describe(
  'A user can sort inventory items',
  { tag: [testTags.regression, testTags.desktop, testTags.mobile] },
  () => {
    for (const sortCase of sortCases) {
      test(sortCase.title, async ({ inventoryPage, headerPage }) => {
        await headerPage.sortProducts(sortCase.sort);

        if (sortCase.type === 'name') {
          const names = await inventoryPage.getItemNames();
          const sortedNames = [...names].sort((a, b) =>
            sortCase.sort === ProductSort.NAME_ASC ? a.localeCompare(b) : b.localeCompare(a),
          );
          expect(names, sortCase.assertionMessage).toEqual(sortedNames);
          return;
        }

        const prices = await inventoryPage.getItemPrices();
        const sortedPrices = [...prices].sort((a, b) =>
          sortCase.sort === ProductSort.PRICE_ASC ? a - b : b - a,
        );
        expect(prices, sortCase.assertionMessage).toEqual(sortedPrices);
      });
    }
  },
);
