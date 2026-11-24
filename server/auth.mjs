import { createHash, randomBytes, scrypt as deriveKey, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(deriveKey);
const lifetime = 30 * 86400 * 1000;
const digest = (value) => createHash('sha256').update(value).digest('hex');

export function fail(status, message) {
  throw Object.assign(new Error(message), { status });
}

export async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, 64);
  return salt + '.' + hash.toString('hex');
}

export async function matches(password, stored) {
  const [salt, hash] = (stored || 'unused.' + '00'.repeat(64)).split('.');
  const actual = await scrypt(password, salt, 64);
  return timingSafeEqual(Buffer.from(hash, 'hex'), actual);
}

export function currentSession(db, req) {
  const token = /(?:^|; *)lumen_session=([0-9a-f]{64})(?:;|$)/.exec(req.headers.cookie || '')?.[1];
  if (token)
    return db
      .prepare('SELECT * FROM sessions WHERE digest=? AND expires>?')
      .get(digest(token), Date.now());
}

export function startSession(db, res, shopper) {
  const token = randomBytes(32).toString('hex');
  db.prepare('INSERT INTO sessions VALUES (?, ?, ?)').run(
    digest(token),
    shopper,
    Date.now() + lifetime
  );
  res.cookie('lumen_session', token, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.COOKIE_SECURE === 'true',
    maxAge: lifetime
  });
}

export function guest(db) {
  return Number(db.prepare('INSERT INTO shoppers DEFAULT VALUES').run().lastInsertRowid);
}

export function mergeGuest(db, from, to) {
  db.prepare(
    `INSERT INTO cart SELECT ?, c.product, MIN(c.quantity,p.stock) FROM cart c
    JOIN products p ON p.id=c.product WHERE c.shopper=? AND p.stock>0
    ON CONFLICT(shopper,product) DO UPDATE SET quantity=MIN(cart.quantity+excluded.quantity,
      (SELECT stock FROM products WHERE id=excluded.product))`
  ).run(to, from);
  db.prepare('INSERT OR IGNORE INTO wishlist SELECT ?, product FROM wishlist WHERE shopper=?').run(
    to,
    from
  );
  db.prepare('DELETE FROM shoppers WHERE id=? AND username IS NULL').run(from);
}
