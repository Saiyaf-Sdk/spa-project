import { DatabaseSync } from 'node:sqlite';
import { mkdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { unitCents } from '../shared/pricing.ts';

export function transaction(db, callback) {
  db.exec('BEGIN IMMEDIATE');
  try {
    const value = callback();
    db.exec('COMMIT');
    return value;
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
  }
}

export function openDatabase(filename = process.env.DATABASE_PATH || 'data/lumen.sqlite') {
  if (filename !== ':memory:') mkdirSync(dirname(resolve(filename)), { recursive: true });
  const db = new DatabaseSync(filename);
  db.exec(`
    PRAGMA foreign_keys = ON;
    PRAGMA busy_timeout = 5000;
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY, details TEXT NOT NULL, cents INTEGER NOT NULL,
      stock INTEGER NOT NULL CHECK(stock >= 0)
    );
    CREATE TABLE IF NOT EXISTS shoppers (
      id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT COLLATE NOCASE UNIQUE,
      firstName TEXT, passwordHash TEXT
    );
    CREATE TABLE IF NOT EXISTS sessions (
      digest TEXT PRIMARY KEY, shopper INTEGER NOT NULL REFERENCES shoppers ON DELETE CASCADE,
      expires INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cart (
      shopper INTEGER REFERENCES shoppers ON DELETE CASCADE, product INTEGER REFERENCES products,
      quantity INTEGER NOT NULL CHECK(quantity > 0), PRIMARY KEY(shopper,product)
    );
    CREATE TABLE IF NOT EXISTS wishlist (
      shopper INTEGER REFERENCES shoppers ON DELETE CASCADE, product INTEGER REFERENCES products,
      PRIMARY KEY(shopper,product)
    );
    CREATE TABLE IF NOT EXISTS orders (
      reference TEXT PRIMARY KEY, shopper INTEGER NOT NULL REFERENCES shoppers,
      requestKey TEXT NOT NULL, receipt TEXT NOT NULL, UNIQUE(shopper,requestKey)
    );
    CREATE TABLE IF NOT EXISTS imports (id TEXT PRIMARY KEY);
    CREATE TABLE IF NOT EXISTS subscribers (email TEXT PRIMARY KEY COLLATE NOCASE);
  `);
  transaction(db, () => {
    if (db.prepare('PRAGMA user_version').get().user_version >= 1) return;
    const catalog = JSON.parse(readFileSync(new URL('./catalog.json', import.meta.url), 'utf8'));
    if (!catalog.length || catalog.some((product) => product.category !== 'fragrances')) {
      throw new Error('Nebo requires a perfume-only catalog.');
    }
    // Old receipts hold independent line snapshots. Keep them while retiring discontinued stock.
    const ids = JSON.stringify(catalog.map((product) => product.id));
    const retired = 'NOT IN (SELECT value FROM json_each(?))';
    db.prepare('DELETE FROM cart WHERE product ' + retired).run(ids);
    db.prepare('DELETE FROM wishlist WHERE product ' + retired).run(ids);
    db.prepare('DELETE FROM products WHERE id ' + retired).run(ids);
    const insert = db.prepare(`INSERT INTO products VALUES (?, ?, ?, ?)
      ON CONFLICT(id) DO UPDATE SET details=excluded.details, cents=excluded.cents`);
    for (const { stock, ...product } of catalog) {
      insert.run(
        product.id,
        JSON.stringify(product),
        unitCents(product.price, product.discountPercentage),
        stock
      );
    }
    db.exec('PRAGMA user_version = 1');
  });
  return db;
}

export function productView(row) {
  return {
    ...JSON.parse(row.details),
    stock: row.stock,
    availabilityStatus: row.stock ? 'In Stock' : 'Out of Stock'
  };
}

export function shoppingState(db, id) {
  const user =
    db
      .prepare('SELECT id, username, firstName FROM shoppers WHERE id = ? AND username IS NOT NULL')
      .get(id) || null;
  const cart = db
    .prepare(
      `SELECT p.*, c.quantity FROM cart c JOIN products p ON p.id = c.product
    WHERE c.shopper = ? ORDER BY c.rowid`
    )
    .all(id)
    .map((row) => {
      const { title, thumbnail, category } = JSON.parse(row.details);
      return {
        productId: row.id,
        title,
        thumbnail,
        category,
        price: row.cents / 100,
        maxStock: row.stock,
        quantity: row.quantity
      };
    });
  const wishlist = db
    .prepare(
      `SELECT p.* FROM wishlist w JOIN products p ON p.id = w.product
    WHERE w.shopper = ? ORDER BY w.rowid`
    )
    .all(id)
    .map(productView);
  return { shopper: id, user, cart, wishlist };
}
