import { PlaywrightTestConfig } from "@playwright/test";
import pageUrls from "./page-urls.json";

const envConfig = {
    local: {
        sutBaseUrl: 'https://www.saucedemo.com',
    },
    dev: {
        sutBaseUrl: '',
    },
    staging: {
        sutBaseUrl: '',
    }
};

type EnvName = keyof typeof envConfig;
const envName: EnvName = (process.env.ENV || 'local') as EnvName;

const config: TestrunConfig = {
    testEnv: envConfig[envName],
    pageUrls: pageUrls,
    userAccounts: {
        standard: {
            name: "standard_user",
            password: "secret_sauce"
        },
        lockedOut: {
            name: "locked_out_user",
            password: "secret_sauce"
        },
        admin: {
            name: "locked_out_user",
            password: "secret_sauce"
        }
    },
    playwright: {
        timeout: 2 * 60 * 1000,
        use: {
            actionTimeout: 5000,
            launchOptions: {
                slowMo: 200,
                headless: true
            }
        }
    }
};

type TestrunConfig = {
    testEnv: typeof envConfig['local'],
    pageUrls: typeof pageUrls,
    userAccounts: UserAccounts,
    playwright: PlaywrightTestConfig
}

export type User = { name: string, password: string }
type UserAccounts = Record<string, User>

export default config;