/**
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { Builder, By, until } = require('selenium-webdriver');
const { expect } = require('chai');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');
const path = require('path');
const {
  install,
  Browser,
  resolveBuildId,
  detectBrowserPlatform,
  ChromeReleaseChannel,
} = require('@puppeteer/browsers');
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.cli(),
  transports: [new winston.transports.Console()],
});

describe('Selenium chromedriver', function () {
  let driver;

  before(async function () {
    // The chrome and chromedriver installation can take some time. Give 5
    // minutes to install everything.
    this.timeout(5 * 60 * 1000);
    /**
     * By default, the test uses the latest Chrome version. Replace with the
     * specific Chromium version if needed, e.g. "144.0.7553.0".
     */
    const BROWSER_VERSION = await resolveBuildId(
      Browser.CHROME,
      detectBrowserPlatform(),
      ChromeReleaseChannel.CANARY,
    );

    const cacheDir = path.resolve(__dirname, '.cache');

    logger.info(
      `Installing Chrome and ChromeDriver version ${BROWSER_VERSION}...`,
    );

    const chromeBuild = await install({
      browser: Browser.CHROME,
      buildId: BROWSER_VERSION,
      cacheDir: cacheDir,
    });

    const chromedriverBuild = await install({
      browser: Browser.CHROMEDRIVER,
      buildId: BROWSER_VERSION,
      cacheDir: cacheDir,
    });

    logger.info(`Chrome installed at: ${chromeBuild.executablePath}`);
    logger.info(
      `ChromeDriver installed at: ${chromedriverBuild.executablePath}`,
    );

    let options = new chrome.Options();
    options.addArguments('--headless');
    options.addArguments('--no-sandbox');
    options.setBinaryPath(chromeBuild.executablePath);

    let service = new chrome.ServiceBuilder(chromedriverBuild.executablePath)
      .loggingTo('chromedriver.log')
      .enableVerboseLogging();

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .setChromeService(service)
      .build();
  });

  after(async function () {
    await driver.quit();
  });

  /**
   * This test is intended to verify the setup is correct.
   */
  it('should be able to navigate to google.com', async function () {
    await driver.get('https://www.google.com');
    const title = await driver.getTitle();
    expect(title).to.equal('Google');
  });

  it('ISSUE REPRODUCTION', async function () {
    // Add test reproducing the issue here.
  });
});
