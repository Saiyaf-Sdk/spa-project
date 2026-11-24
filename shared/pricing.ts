export function unitCents(price: number, discountPercent: number): number {
  return Math.round((Math.round(price * 100) * (100 - discountPercent)) / 100);
}

export function orderTotals(subtotal: number, voucher: string) {
  const discount = voucher === 'VIP15' ? Math.round(subtotal * 0.15) : 0;
  const shipping = !subtotal || subtotal >= 15000 || voucher === 'CONCIERGE' ? 0 : 899;
  const tax = Math.round((subtotal - discount) * 0.08);
  return { subtotal, discount, shipping, tax, total: subtotal - discount + shipping + tax };
}
