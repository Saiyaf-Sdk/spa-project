import express from 'express';
import {
  currentSession,
  fail,
  guest,
  hashPassword,
  matches,
  mergeGuest,
  startSession
} from './auth.mjs';
import { productView, shoppingState, transaction } from './database.mjs';
import { placeOrder } from './orders.mjs';

export function createApi(db) {
  const api = express.Router();
  const attempts = new Map();
  api.use(
    (req, res, next) => {
      res.set('Cache-Control', 'no-store');
      // Browsers require a successful CORS preflight to send this header across origins.
      if (!['GET', 'HEAD'].includes(req.method) && req.get('X-Lumen-Request') !== '1')
        fail(403, 'Use the storefront to submit this request.');
      next();
    },
    express.json({ limit: '32kb' })
  );

  api.get('/products', (_req, res) => {
    res.json(db.prepare('SELECT * FROM products ORDER BY id').all().map(productView));
  });
  api.get('/products/:id', (req, res) => {
    const row = db.prepare('SELECT * FROM products WHERE id=?').get(req.params.id);
    if (!row) fail(404, 'Product not found.');
    res.json(productView(row));
  });

  api.post('/newsletter', (req, res) => {
    const email = req.body?.email;
    if (
      typeof email !== 'string' ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    )
      fail(400, 'Enter a valid email address.');
    db.prepare('INSERT OR IGNORE INTO subscribers VALUES (?)').run(email.trim().toLowerCase());
    res.json({ subscribed: true });
  });

  api.get('/session', (req, res) => {
    let id = currentSession(db, req)?.shopper;
    if (!id) {
      id = transaction(db, () => {
        db.prepare('DELETE FROM sessions WHERE expires<=?').run(Date.now());
        db.exec(
          'DELETE FROM shoppers WHERE username IS NULL AND id NOT IN (SELECT shopper FROM sessions)'
        );
        const newId = guest(db);
        startSession(db, res, newId);
        return newId;
      });
    }
    res.json(shoppingState(db, id));
  });

  api.use((req, _res, next) => {
    const session = currentSession(db, req);
    if (!session || req.get('X-Lumen-Shopper') !== String(session.shopper))
      fail(401, 'Your session changed. Refresh the page and try again.');
    req.session = session;
    next();
  });

  api.post('/session/import', (req, res) => {
    const { key, cart, wishlist } = req.body || {};
    if (
      typeof key !== 'string' ||
      !/^[a-f0-9-]{36}$/i.test(key) ||
      !Array.isArray(cart) ||
      !Array.isArray(wishlist)
    )
      fail(400, 'Invalid saved bag.');
    const id = req.session.shopper;
    transaction(db, () => {
      if (!db.prepare('INSERT OR IGNORE INTO imports VALUES (?)').run(key).changes) return;
      for (const line of cart) {
        if (
          !Number.isSafeInteger(line?.productId) ||
          !Number.isSafeInteger(line.quantity) ||
          line.quantity < 1
        )
          continue;
        db.prepare(
          `INSERT INTO cart SELECT ?,id,MIN(stock,?) FROM products WHERE id=? AND stock>0
          ON CONFLICT(shopper,product) DO UPDATE SET quantity=MIN(cart.quantity+excluded.quantity,
          (SELECT stock FROM products WHERE id=excluded.product))`
        ).run(id, line.quantity, line.productId);
      }
      for (const product of wishlist) {
        if (Number.isSafeInteger(product))
          db.prepare('INSERT OR IGNORE INTO wishlist SELECT ?, id FROM products WHERE id=?').run(
            id,
            product
          );
      }
    });
    res.json(shoppingState(db, id));
  });

  api.post(['/auth/register', '/auth/login'], async (req, res) => {
    const { username, password, firstName } = req.body || {};
    const registering = req.path.endsWith('/register');
    if (
      typeof username !== 'string' ||
      !/^[a-z\d_.-]{3,40}$/i.test(username) ||
      typeof password !== 'string' ||
      !password ||
      password.length > 128
    )
      fail(
        400,
        'Use a username of 3–40 letters, numbers, dots, dashes or underscores and a password of up to 128 characters.'
      );
    if (
      registering &&
      (password.length < 8 ||
        typeof firstName !== 'string' ||
        !firstName.trim() ||
        firstName.length > 80)
    )
      fail(400, 'Enter your name and a password of at least 8 characters.');
    const now = Date.now();
    for (const [ip, window] of attempts) if (window.until <= now) attempts.delete(ip);
    const window = attempts.get(req.ip) || { count: 0, until: now + 15 * 60000 };
    attempts.set(req.ip, window);
    if (++window.count > 40) fail(429, 'Too many sign-in attempts. Try again in 15 minutes.');
    const account = db.prepare('SELECT * FROM shoppers WHERE username=?').get(username);
    if (registering && account) fail(409, 'That username is already taken.');
    if (!registering && !(await matches(password, account?.passwordHash)))
      fail(401, 'Incorrect username or password.');
    const encoded = registering ? await hashPassword(password) : null;
    const id = transaction(db, () => {
      const session = currentSession(db, req);
      if (!session || session.shopper !== req.session.shopper)
        fail(409, 'Your session changed. Refresh and try again.');
      if (db.prepare('SELECT username FROM shoppers WHERE id=?').get(session.shopper).username)
        fail(409, 'Sign out before switching accounts.');
      let id = session.shopper;
      if (registering) {
        if (db.prepare('SELECT id FROM shoppers WHERE username=?').get(username))
          fail(409, 'That username is already taken.');
        db.prepare('UPDATE shoppers SET username=?, firstName=?, passwordHash=? WHERE id=?').run(
          username,
          firstName.trim(),
          encoded,
          id
        );
      } else {
        id = account.id;
        mergeGuest(db, session.shopper, id);
      }
      db.prepare('DELETE FROM sessions WHERE digest=?').run(session.digest);
      startSession(db, res, id);
      return id;
    });
    res.status(registering ? 201 : 200).json(shoppingState(db, id));
  });

  api.post('/auth/logout', (req, res) => {
    const id = transaction(db, () => {
      db.prepare('DELETE FROM sessions WHERE digest=?').run(req.session.digest);
      const id = guest(db);
      startSession(db, res, id);
      return id;
    });
    res.json(shoppingState(db, id));
  });

  api.post('/cart', (req, res) => {
    const { productId, delta, remove, clear, allSaved } = req.body || {};
    const id = req.session.shopper;
    transaction(db, () => {
      if (clear === true) {
        db.prepare('DELETE FROM cart WHERE shopper=?').run(id);
        return;
      }
      const ids =
        allSaved === true
          ? db
              .prepare('SELECT product FROM wishlist WHERE shopper=?')
              .all(id)
              .map((row) => row.product)
          : [productId];
      for (const product of ids) {
        if (!Number.isSafeInteger(product)) fail(400, 'Invalid product.');
        const row = db.prepare('SELECT stock FROM products WHERE id=?').get(product);
        if (!row) fail(404, 'Product not found.');
        const step = allSaved === true ? 1 : delta;
        if (remove !== true && (!Number.isSafeInteger(step) || !step || step < -1 || step > 10000))
          fail(400, 'Invalid quantity.');
        const previous =
          db.prepare('SELECT quantity FROM cart WHERE shopper=? AND product=?').get(id, product)
            ?.quantity || 0;
        const quantity = remove === true ? 0 : previous + step;
        if (quantity > row.stock && step > 0)
          fail(409, 'The requested quantity exceeds available stock.');
        if (quantity <= 0)
          db.prepare('DELETE FROM cart WHERE shopper=? AND product=?').run(id, product);
        else
          db.prepare(
            'INSERT INTO cart VALUES (?,?,?) ON CONFLICT(shopper,product) DO UPDATE SET quantity=excluded.quantity'
          ).run(id, product, quantity);
      }
    });
    res.json(shoppingState(db, id));
  });

  api.post('/wishlist', (req, res) => {
    const { productId, saved, clear } = req.body || {};
    const id = req.session.shopper;
    if (clear === true) db.prepare('DELETE FROM wishlist WHERE shopper=?').run(id);
    else {
      if (!Number.isSafeInteger(productId) || typeof saved !== 'boolean')
        fail(400, 'Invalid wishlist item.');
      if (!db.prepare('SELECT id FROM products WHERE id=?').get(productId))
        fail(404, 'Product not found.');
      if (saved) db.prepare('INSERT OR IGNORE INTO wishlist VALUES (?,?)').run(id, productId);
      else db.prepare('DELETE FROM wishlist WHERE shopper=? AND product=?').run(id, productId);
    }
    res.json(shoppingState(db, id));
  });

  api.post('/orders', (req, res) =>
    res.status(201).json(placeOrder(db, req.session.shopper, req.body || {}))
  );
  api.get('/orders', (req, res) => {
    if (!db.prepare('SELECT username FROM shoppers WHERE id=?').get(req.session.shopper).username)
      fail(401, 'Sign in to see your orders.');
    res.json(
      db
        .prepare('SELECT receipt FROM orders WHERE shopper=? ORDER BY rowid DESC')
        .all(req.session.shopper)
        .map((row) => JSON.parse(row.receipt))
    );
  });
  api.use((_req, _res) => fail(404, 'API endpoint not found.'));
  api.use((error, _req, res, _next) => {
    if (!error.status || error.status >= 500) console.error(error);
    res
      .status(error.status || 500)
      .json({
        message: error.status ? error.message : 'The store could not complete this request.'
      });
  });
  return api;
}
