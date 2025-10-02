import { Page } from '@playwright/test';
import { SearchBy } from './search-criteria';
import config, { User } from '../../configuration/testrun-config';

export function substitutePlaceholders(selectorTemplate: string, { ...searchBy }: SearchBy): string {
  for (const [key, value] of Object.entries(searchBy))
    selectorTemplate = selectorTemplate.replace(`{${key}}`, value.toString());

  return selectorTemplate;
}

export async function mockStaticRecourses(page: Page) {
  await page.route('**/*.{ico,png,jpg,mp3,woff,woff2}', (route) => route.abort());
}

export function getCookiesFor(user: User) {
  const url = config.testEnv.sutBaseUrl ?? throwError('The base url isn\'t set');
  const domain = new URL(url).hostname;
  const cookieLifetime = (config.playwright.timeout === undefined ? 60 : config.playwright.timeout / 1000);
  const expirationDate = Date.now() / 1000 + cookieLifetime;
  return {
    name: 'session-username',
    value: user.name,
    url: config.testEnv.sutBaseUrl,
    // domain: '.' + domain,
    // path: '/',
    expires: expirationDate,
  };
}

export async function waitUntilAsync(getResult: () => Promise<boolean>, timeout: number | null = null, timeStep: number = 500) {
  let startDate = Date.now();
  let stopDate = Date.now() + (timeout ?? config.playwright.use?.actionTimeout ?? 2) * 1000;
  let result = false;
  do {
    try {
      result = await getResult();
    }
    catch { }
    if (!result) await sleep(timeStep);
  } while (!result && Date.now() < stopDate);
  return result;
}

export function waitUntil(getResult: () => boolean, timeout: number = 10, timeStep: number = 500) {
  let startDate = Date.now();
  let stopDate = Date.now() + timeout * 1000;
  let result = false;
  do {
    try {
      result = getResult();
    }
    catch { }
    if (!result) (async () => await sleep(timeStep ?? 500))();
  } while (!result && Date.now() < stopDate);
  return result;
}

async function sleep(timeout: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export function throwError(errorMessage: string): never {
  throw new Error(errorMessage);
}