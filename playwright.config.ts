import { PlaywrightTestConfig, devices, } from '@playwright/test';

import { testConfig } from './testconfig';

const ENV = process.env.npm_config_ENV;
const DEFAULT_ENV = 'qaWeb';


const config: PlaywrightTestConfig = {
  projects: [
    {
      name: `Chrome`,
      use: {
        browserName: `chromium`,
        channel: `chrome`,
        baseURL: testConfig[ENV || DEFAULT_ENV] as string | undefined,
        headless: false,

        viewport: { width: 1400, height: 710 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },

    },


    {
      name: `Edge`,
      use: {
        browserName: `chromium`,
        channel: `msedge`,
        baseURL: testConfig[ENV || DEFAULT_ENV] as string | undefined,
        headless: false,
        viewport: { width: 1400, height: 710 },
        ignoreHTTPSErrors: true,
        acceptDownloads: true,
        screenshot: `only-on-failure`,
        video: `retain-on-failure`,
        trace: `retain-on-failure`,
        launchOptions: {
          slowMo: 0
        }
      },
    },
    // {
    //   name: `firefox`,
    //   use: {

    //     browserName: 'firefox',
    //     channel: 'firefox',
    //     baseURL: testConfig[ENV || DEFAULT_ENV] as string | undefined,
    //     headless: false,
    //     viewport: { width: 1400, height: 710 },
    //     ignoreHTTPSErrors: true,
    //     acceptDownloads: true,
    //     screenshot: `only-on-failure`,
    //     video: `retain-on-failure`,
    //     trace: `retain-on-failure`,
    //     launchOptions: {
    //       slowMo: 50
    //     },
    //   },
    // },
  ],
  reporter: "allure-playwright",
  timeout: 5 * 60 * 1000,
};

export default config;




