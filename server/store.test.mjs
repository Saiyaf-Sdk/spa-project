import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import express from 'express';
import { createApi } from './api.mjs';
import { openDatabase } from './database.mjs';
import { orderTotals, unitCents } from '../shared/pricing.ts';

async function serve(db) {
  const app = express();
  app.use('/api', createApi(db));
  const server = await new Promise((resolve) => {
    const listener = app.listen(0, '127.0.0.1', () => resolve(listener));
  });
  return {
    url: 'http://127.0.0.1:' + server.address().port + '/api',
    close: () => new Promise((resolve) => server.close(resolve))
  };
}

function client(store) {
  let cookie = '';
  let shopper;
  return async (path, body, status = 200) => {
    const response = await fetch(store.url + path, {
      method: body === undefined ? 'GET' : 'POST',
      headers: {
        Cookie: cookie,
        'X-Lumen-Request': '1',
        'X-Lumen-Shopper': String(shopper),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const nextCookie = response.headers.get('set-cookie');
    if (nextCookie) cookie = nextCookie.split(';')[0];
    const data = await response.json();
    assert.equal(response.status, status, path + ' ' + (data.message || ''));
    if (data.shopper) shopper = data.shopper;
    return data;
  };
}

const account = { username: 'collector', firstName: 'Test Collector', password: 'test-passphrase' };
const checkout = (state) => ({
  address: '15 Garden Street, Colombo',
  voucher: 'VIP15',
  gift: true,
  requestKey: randomUUID(),
  expected: state.cart.map((line) => ({
    productId: line.productId,
    unitCents: Math.round(line.price * 100),
    quantity: line.quantity
  }))
});

test('pricing rounds once per unit and applies the catalog shipping and voucher rules', () => {
  assert.equal(unitCents(9.99, 10.48), 894);
  assert.deepEqual(orderTotals(10000, 'VIP15'), {
    subtotal: 10000,
    discount: 1500,
    shipping: 899,
    tax: 680,
    total: 10079
  });
  assert.equal(orderTotals(14999, '').shipping, 899);
  assert.equal(orderTotals(15000, '').shipping, 0);
  assert.equal(orderTotals(100, 'CONCIERGE').shipping, 0);
});

test('guest bag, sign-in merge, saved items, checkout retries and private order history survive restart', async (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'lumen-test-'));
  const path = join(dir, 'shop.sqlite');
  let db = openDatabase(path);
  let store = await serve(db);
  t.after(async () => {
    await store.close();
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });
  const visit = client(store);
  const products = await visit('/products');
  const product = products.find((p) => p.stock >= 5);
  const id = product.id;
  await visit('/session');
  const imported = { key: randomUUID(), cart: [{ productId: id, quantity: 2 }], wishlist: [id] };
  await visit('/session/import', imported);
  const state = await visit('/session/import', imported);
  assert.equal(state.cart[0].quantity, 2);
  assert.equal(state.wishlist[0].id, id);
  await visit('/orders', checkout(state), 401);
  await visit('/auth/register', account, 201);
  await visit('/auth/logout', {});
  await visit('/orders', undefined, 401);
  await visit('/auth/register', account, 409);
  await visit('/auth/login', { ...account, password: 'incorrect' }, 401);
  await visit('/cart', { productId: id, delta: 1 });
  const merged = await visit('/auth/login', account);
  assert.equal(merged.cart[0].quantity, 3);
  assert.equal(merged.wishlist.length, 1);
  await visit('/cart', { productId: id, delta: product.stock }, 409);
  await visit('/wishlist', { productId: id, saved: false });
  await visit('/wishlist', { productId: id, saved: true });
  const fresh = await visit('/session');
  const body = checkout(fresh);
  await visit('/orders', { ...body, voucher: 'INVALID' }, 400);
  await visit('/orders', { ...body, expected: [] }, 409);
  const [first, retry] = await Promise.all([
    visit('/orders', body, 201),
    visit('/orders', body, 201)
  ]);
  assert.equal(first.order.reference, retry.order.reference);
  assert.equal(
    first.order.totals.subtotal,
    3 * unitCents(product.price, product.discountPercentage)
  );
  assert.equal(first.state.cart.length, 0);
  assert.equal((await visit('/products/' + id)).stock, product.stock - 3);
  const other = client(store);
  await other('/session');
  await other('/auth/register', { ...account, username: 'another' }, 201);
  assert.deepEqual(await other('/orders'), []);
  await other('/newsletter', { email: ' sample@example.com ' });
  await other('/newsletter', { email: 'Sample@example.com' });
  assert.equal(db.prepare('SELECT COUNT(*) AS n FROM subscribers').get().n, 1);
  assert.notEqual(
    db.prepare('SELECT passwordHash FROM shoppers WHERE username=?').get(account.username)
      .passwordHash,
    account.password
  );

  await store.close();
  db.close();
  db = openDatabase(path);
  store = await serve(db);
  const returning = client(store);
  await returning('/session');
  const restored = await returning('/auth/login', account);
  assert.equal(restored.wishlist[0].id, id);
  assert.equal((await returning('/orders'))[0].reference, first.order.reference);
  assert.equal((await returning('/products/' + id)).stock, product.stock - 3);
});

test('a stock conflict rolls back every line and keeps the bag available for correction', async (t) => {
  const db = openDatabase(':memory:');
  const store = await serve(db);
  t.after(async () => {
    await store.close();
    db.close();
  });
  const visit = client(store);
  await visit('/session');
  await visit('/auth/register', account, 201);
  const [first, last] = (await visit('/products')).filter((p) => p.stock > 0);
  await visit('/cart', { productId: first.id, delta: 1 });
  const state = await visit('/cart', { productId: last.id, delta: 1 });
  db.prepare('UPDATE products SET stock=0 WHERE id=?').run(last.id);
  await visit('/orders', checkout(state), 409);
  assert.equal((await visit('/products/' + first.id)).stock, first.stock);
  assert.equal((await visit('/session')).cart.length, 2);
  assert.deepEqual(await visit('/orders'), []);
});

test('upgrading a mixed catalog retires other merchandise while preserving perfume stock and receipts', async (t) => {
  const dir = mkdtempSync(join(tmpdir(), 'nebo-upgrade-'));
  const path = join(dir, 'shop.sqlite');
  let db = openDatabase(path);
  let store;
  t.after(async () => {
    if (store) await store.close();
    db.close();
    rmSync(dir, { recursive: true, force: true });
  });
  const keptId = 7,
    retiredId = 1;
  const shopper = Number(
    db
      .prepare('INSERT INTO shoppers(username,firstName) VALUES (?,?)')
      .run('existing-account', 'Existing Collector').lastInsertRowid
  );
  db.exec('PRAGMA user_version = 0');
  db.prepare('UPDATE products SET stock = 11 WHERE id=?').run(keptId);
  db.prepare('INSERT INTO products VALUES (?,?,?,?)').run(
    retiredId,
    JSON.stringify({ title: 'Old stock', category: 'beauty' }),
    999,
    9
  );
  for (const id of [keptId, retiredId]) {
    db.prepare('INSERT INTO cart VALUES (?,?,1)').run(shopper, id);
    db.prepare('INSERT INTO wishlist VALUES (?,?)').run(shopper, id);
  }
  const receipt = JSON.stringify({
    reference: 'historical',
    lines: [{ productId: retiredId, title: 'Old stock' }]
  });
  db.prepare('INSERT INTO orders VALUES (?,?,?,?)').run(
    'historical',
    shopper,
    'previous-checkout',
    receipt
  );
  db.close();
  db = openDatabase(path);
  assert.equal(db.prepare('SELECT stock FROM products WHERE id=?').get(keptId).stock, 11);
  assert.equal(
    db.prepare('SELECT receipt FROM orders WHERE reference=?').get('historical').receipt,
    receipt
  );
  for (const table of ['cart', 'wishlist']) {
    assert.deepEqual(
      db
        .prepare('SELECT product FROM ' + table + ' WHERE shopper=?')
        .all(shopper)
        .map((row) => row.product),
      [keptId]
    );
  }
  store = await serve(db);
  const visit = client(store);
  const products = await visit('/products');
  assert.equal(products.length, 5);
  assert.ok(
    products.every((p) => p.category === 'fragrances' && p.notes.length === 3 && p.sizeMl > 0)
  );
  await visit('/products/' + retiredId, undefined, 404);
  await visit('/session');
  await visit('/cart', { productId: retiredId, delta: 1 }, 404);
  await visit('/wishlist', { productId: retiredId, saved: true }, 404);
  const imported = await visit('/session/import', {
    key: randomUUID(),
    cart: [{ productId: retiredId, quantity: 1 }],
    wishlist: [retiredId]
  });
  assert.deepEqual(imported.cart, []);
  assert.deepEqual(imported.wishlist, []);
});
