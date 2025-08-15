// k6 browser test: # VUs hitting Application
import { browser } from 'k6/browser';
import { sleep, check } from 'k6';

export const options = {
  scenarios: {
    ui: {
      executor: 'shared-iterations',
      vus: __ENV.VUS ? parseInt(__ENV.VUS) : 10,
      iterations: __ENV.ITERATIONS ? parseInt(__ENV.ITERATIONS) : 50,
      maxDuration: '10m',
      options: {
        browser: {
          type: 'chromium',
          headless: false,
          executablePath: '/path/to/Chromium.app/Contents/MacOS/Chromium'
        }
      }
    }
  },
  thresholds: {
    'browser_web_vital_lcp{page:home}': ['p(95)<3000']
  }
};

export default async function () {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://quickpizza.grafana.com/', { waitUntil: 'load' }); //Using the Demo Web site for example
  await page.waitForTimeout(2000); // waits 2 seconds
  const title = await page.title();
  check(title, { 'title contains QuickPizza': t => t.includes('QuickPizza') }); //Assertion
  await page.close();
  await context.close();
  sleep(1);
}
