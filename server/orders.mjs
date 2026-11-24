import { randomUUID } from 'node:crypto';
import { orderTotals } from '../shared/pricing.ts';
import { fail } from './auth.mjs';
import { shoppingState, transaction } from './database.mjs';

export function placeOrder(db, shopper, body) {
  return transaction(db, () => {
    const state = shoppingState(db, shopper);
    if (!state.user) fail(401, 'Sign in to place an order.');
    const { requestKey, voucher, gift, address, expected } = body;
    if (typeof requestKey !== 'string' || !/^[a-f0-9-]{36}$/i.test(requestKey))
      fail(400, 'Invalid checkout reference.');
    const previous = db
      .prepare('SELECT receipt FROM orders WHERE shopper=? AND requestKey=?')
      .get(shopper, requestKey);
    if (previous) return { order: JSON.parse(previous.receipt), state };
    if (!['', 'VIP15', 'CONCIERGE'].includes(voucher) || typeof gift !== 'boolean')
      fail(400, 'Invalid checkout options.');
    if (typeof address !== 'string' || address.trim().length < 10 || address.length > 500)
      fail(400, 'Enter a complete delivery address (10–500 characters).');
    if (!state.cart.length) fail(409, 'Your bag is empty.');
    const lines = state.cart.map(({ productId, title, price, quantity }) => ({
      productId,
      title,
      unitCents: Math.round(price * 100),
      quantity
    }));
    if (
      !Array.isArray(expected) ||
      lines.length !== expected.length ||
      lines.some(
        (line, i) =>
          line.productId !== expected[i]?.productId ||
          line.unitCents !== expected[i]?.unitCents ||
          line.quantity !== expected[i]?.quantity
      )
    ) {
      fail(409, 'Your bag changed. Review the updated quantities and total.');
    }
    const reserve = db.prepare('UPDATE products SET stock=stock-? WHERE id=? AND stock>=?');
    for (const line of lines) {
      if (!reserve.run(line.quantity, line.productId, line.quantity).changes)
        fail(409, 'Stock changed for ' + line.title + '. Update your bag and try again.');
    }
    const totals = orderTotals(
      lines.reduce((sum, line) => sum + line.unitCents * line.quantity, 0),
      voucher
    );
    const order = {
      reference: 'NEBO-' + randomUUID(),
      createdAt: new Date().toISOString(),
      lines,
      totals,
      address: address.trim(),
      recipient: state.user.firstName,
      gift,
      voucher,
      paymentMethod: 'Pay on delivery',
      status: 'Placed'
    };
    db.prepare('INSERT INTO orders VALUES (?,?,?,?)').run(
      order.reference,
      shopper,
      requestKey,
      JSON.stringify(order)
    );
    db.prepare('DELETE FROM cart WHERE shopper=?').run(shopper);
    return { order, state: shoppingState(db, shopper) };
  });
}
