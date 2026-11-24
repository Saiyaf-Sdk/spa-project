import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import express from 'express';
import { openDatabase } from './database.mjs';
import { createApi } from './api.mjs';

const dev = process.argv.includes('--dev');
const portArg = process.argv.indexOf('--port');
const hostArg = process.argv.indexOf('--host');
const port = Number(
  portArg >= 0 ? process.argv[portArg + 1] : process.env.PORT || (dev ? 5173 : 3000)
);
const hostValue = process.argv[hostArg + 1];
const host =
  hostArg >= 0
    ? hostValue && !hostValue.startsWith('--')
      ? hostValue
      : '0.0.0.0'
    : process.env.HOST || '127.0.0.1';
const dist = resolve('dist');
if (!dev && !existsSync(resolve(dist, 'index.html')))
  throw new Error('Build the storefront with npm run build first.');

const db = openDatabase();
const app = express();
app.disable('x-powered-by');
app.use('/api', createApi(db));
const server = createServer(app);

if (dev) {
  const { createServer: createVite } = await import('vite');
  const vite = await createVite({
    server: {
      middlewareMode: true,
      watch: { ignored: ['**/data/**', '**/*.sqlite*'] },
      fs: {
        deny: [
          '.env',
          '.env.*',
          '**/*.{crt,pem,sqlite,sqlite-*,db,db-*}',
          '**/.git/**',
          '**/server/**',
          '**/data/**'
        ]
      },
      hmr: { server }
    }
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(dist));
  app.get('/{*path}', (req, res) => {
    if (req.accepts('html') && !req.path.split('/').pop().includes('.'))
      return res.sendFile(resolve(dist, 'index.html'));
    res.sendStatus(404);
  });
}
server.listen(port, host, () =>
  console.log('Nebo Parfumerie: http://' + host + ':' + server.address().port)
);
