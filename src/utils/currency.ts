export const parseCurrencyAmount = (value: string, label: string): number => {
  const [, amountText] = value.split('$');
  if (amountText === undefined) {
    throw new Error(`${label} should contain a dollar amount.`);
  }
  return Number.parseFloat(amountText);
};

