const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: false,
    browserName: 'chromium',
    channel: 'chrome',
    screenshot: 'only-on-failure',
    // ✅ Custom property
    extraHTTPHeaders: {
      'Accept': 'application/json'
    }
  },
  // ✅ Define custom API base URL outside 'use'
  projects: [
    {
      name: 'chrome',
      use: {
        baseURL: 'https://www.saucedemo.com',
      },
    },
  ],
 
});
