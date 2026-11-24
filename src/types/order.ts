import type { orderTotals } from '../../shared/pricing';

export interface Order {
  reference: string;
  createdAt: string;
  recipient: string;
  address: string;
  gift: boolean;
  voucher: string;
  status: string;
  paymentMethod: string;
  totals: ReturnType<typeof orderTotals>;
  lines: { productId: number; title: string; quantity: number; unitCents: number }[];
}
