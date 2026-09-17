// Approximate USD → LKR exchange rate (update as needed)
export const USD_TO_LKR = 298.50;

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2
  }).format(value);
}

export function formatCurrencyLKR(usdValue: number): string {
  const lkrValue = usdValue * USD_TO_LKR;
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    maximumFractionDigits: 2
  }).format(lkrValue);
}

export function formatCategoryLabel(category: string): string {
  return category
    .split('-')
    .map((token) => `${token.charAt(0).toUpperCase()}${token.slice(1)}`)
    .join(' ');
}

export function discountedPrice(price: number, discountPercentage: number): number {
  const discount = (price * discountPercentage) / 100;
  return Math.max(price - discount, 0);
}

