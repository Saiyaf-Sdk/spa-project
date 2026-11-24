import { defineConfig } from '@playwright/test';
const port = Number(process.env.E2E_PORT || 4276);
const baseURL = 'http://127.0.0.1:' + port;
export default defineConfig({
  testDir: './tests',
  use: { baseURL, channel: process.env.E2E_BROWSER_CHANNEL || undefined },
  webServer: {
    command: 'node server/index.mjs --port ' + port + (process.env.E2E_DEV ? ' --dev' : ''),
    url: baseURL + '/api/products',
    env: { DATABASE_PATH: ':memory:' },
    reuseExistingServer: false
  }
});
