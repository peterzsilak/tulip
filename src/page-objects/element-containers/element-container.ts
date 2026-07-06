import { Locator } from '@playwright/test';

export interface FilterOptions {
  has?: Locator;
  hasNot?: Locator;
  hasText?: string | RegExp;
  hasNotText?: string | RegExp;
}

export class ElementContainer<T extends ElementContainer<T>> {
  readonly root: Locator;

  constructor(locator: Locator) {
    this.root = locator;
  }

  first(): T {
    return new (this.constructor as new (locator: Locator) => T)(this.root.first());
  }

  last(): T {
    return new (this.constructor as new (locator: Locator) => T)(this.root.last());
  }

  nth(index: number): T {
    return new (this.constructor as new (locator: Locator) => T)(this.root.nth(index));
  }

  filter(options: FilterOptions): T {
    return new (this.constructor as new (locator: Locator) => T)(this.root.filter(options));
  }

  async all(): Promise<T[]> {
    const elements = await this.root.all();
    return elements.map((el) => new (this.constructor as new (locator: Locator) => T)(el));
  }

  async click(): Promise<void> {
    await this.root.click();
  }

  async waitFor(): Promise<void> {
    await this.root.waitFor();
  }

  async count(): Promise<number> {
    return this.root.count();
  }
}

