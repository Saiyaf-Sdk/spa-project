# Nebo Parfumerie

Nebo is a full-stack luxury perfume boutique. The Vue 3 and TypeScript storefront, Express API, and SQLite database run together. Product photographs, fonts, and the homepage campaign image are served locally.

## Run on Windows

Use Node.js 24 or newer. In PowerShell, open the folder containing `package.json`. For the original workspace:

```powershell
cd "D:\Projects\spa-project"
npm.cmd ci
npm.cmd run dev
```

Open [the development storefront](http://127.0.0.1:5173). Keep the terminal open while using the site. Press **Ctrl+C** to stop. On later runs, start it with `npm.cmd run dev`. For a downloaded ZIP, extract it first and use the extracted folder instead of the workspace path. On macOS or Linux use `npm` in place of `npm.cmd`.

## Production build

```powershell
npm.cmd run build
npm.cmd start
```

Open [the built storefront](http://127.0.0.1:3000). Run these commands from the same project directory. The server serves both the built pages and the API.

## Try the boutique

- Open **Perfumes** to search by house, perfume, scent family, or note. Sort by price or name, open quick view, or open a bottle’s detail page.
- Follow **Scent guide** to browse perfumes in a family. Use the heart on a perfume to add it to your wishlist.
- Add a perfume to your bag. Sign in or register at checkout to keep your selections. Enter a delivery address and optionally select gift packaging.
- Apply **VIP15** for 15% off merchandise or **CONCIERGE** for complimentary delivery. The server computes the order in integer US cents. Sample tax is 8% of discounted merchandise. Delivery is $8.99 below a $150 merchandise subtotal.
- Place an order and open **My orders** for the receipt. The store records pay-on-delivery orders in USD. LKR amounts use the project’s fixed estimate of 298.50 LKR per USD.
- Newsletter signups are saved in SQLite. Payment collection, dispatch, and newsletter campaigns are manual.

## Tests

```powershell
npm.cmd test
npm.cmd run build
npx.cmd playwright install chromium
npm.cmd run test:e2e
```

On a machine with Google Chrome installed, you can set `$env:E2E_BROWSER_CHANNEL="chrome"` and skip the Chromium download. By default the browser suite tests the production build. Set `$env:E2E_DEV="1"` to run it against Vite in development mode. Browser tests use a separate local server on port 4276 and an in-memory database. Override its port with `E2E_PORT`.

Backend tests cover pricing, shopping sessions, registration, stock conflicts, order retries, restart persistence, and migration from the earlier mixed catalog. Browser tests exercise the desktop and mobile layouts, navigation, searches, shopping flows, order history, newsletter subscription, accessibility labels, and recovery pages.

## Storage and maintenance

The first launch loads `server/catalog.json` into SQLite. The default file remains `data/lumen.sqlite` for compatibility with existing installations. On upgrade, a transaction removes discontinued merchandise from inventory, bags and wishlists, refreshes the five retained perfume records, and preserves their current stock, user accounts and order receipts. Back up an installation by stopping the server and copying the whole `data` directory.

| Setting | Purpose |
| --- | --- |
| `DATABASE_PATH` | SQLite file on persistent storage |
| `HOST` | Listen address, defaults to loopback |
| `PORT` | Application port |
| `COOKIE_SECURE=true` | Secure session cookies when serving over HTTPS |

## Project map

| Location | Responsibility |
| --- | --- |
| `src/views/` | Homepage, collection, scent guide, product details, wishlist, bag and checkout, login and registration, order history, and 404 page |
| `src/components/` | Shared navigation, footer, product cards and quick view |
| `src/stores/`, `src/lib/session.ts` | Server-backed account, bag and wishlist state |
| `server/` | Express routes, authentication, catalog migration, SQLite storage, and transactional checkout |
| `shared/pricing.ts` | Pricing rules shared by browser and server |
| `tests/` | Playwright browser tests |

## Fragrances and creative references

Nebo is an independent project with fixed demonstration prices and inventory. Each perfume links to its fragrance house for the composition and edition. Product photographs come from the previous project’s DummyJSON fragrance collection.

- [Calvin Klein CK One](https://www.calvinklein.us/en/ck-one/10740.html)
- [Chanel Coco Noir](https://www.chanel.com/us/fragrance/p/113660/coco-noir-eau-de-parfum-spray/)
- [Dior J’adore](https://www.dior.com/en_us/beauty/products/j%E2%80%99adore-eau-de-parfum-C099800245.html)
- [Dolce & Gabbana Dolce Shine](https://www.dolcegabbana.com/en-us/beauty/perfumes-for-her/dolce/dolce-shine-edp-50ml---158057971180035.html)
- [Gucci Bloom](https://www.gucci.com/us/en/pr/beauty/fragrances/fragrances-for-women/gucci-bloom-100ml-eau-de-parfum-p-488830999990099)

The editorial direction drew on the note-led storytelling on the [Diptyque Orphéon fragrance page](https://diptyqueparis.com/en-eu/products/eau-de-parfum-orpheon-orphp75c). The original Nebo campaign photograph is in `public/editorial/hero.jpg`. Its built-in ImageGen brief called for an amber cut-crystal flacon with a legible NEBO label and fluted cap, travertine, oxblood silk, and directional afternoon light. It illustrates the boutique identity. The five listed house perfumes make up the shoppable collection.
